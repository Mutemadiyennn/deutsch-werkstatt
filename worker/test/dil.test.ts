/**
 * PM-112 A.1: çalışma anında dil güvencesi. `*_tr` alanı Türkçe değilse bir kez yeniden sorulur; yine tutmazsa kural tabanlı
 * Türkçe yedek ya da bad_output (istemci yapay zekâsız yola düşer). Hata enjeksiyonu: sahte model Almanca/İngilizce döndürür.
 */
import { describe, it, expect } from "vitest";
import { AiTasks, dilBozuk, dilHatasi, dilYedegi, trAlanlari, DIL_YEDEK, type AiTaskName } from "@dw/shared";
import type { Env, KV } from "../src/env.ts";
import { runTask, dilGuvencesi, TEMPLATES } from "../src/ai/tasks.ts";
import { ORNEKLER, OzSinamaCekirdek, ST, type Depo } from "../src/ai/selftest.ts";
import { HttpError } from "../src/http.ts";

function memKV(): KV {
  const data = new Map<string, string>();
  return { async get(k) { return data.get(k) ?? null; }, async put(k, v) { data.set(k, v); } };
}
function memDepo(): Depo {
  const data = new Map<string, unknown>();
  return { async get<T>(k: string) { return structuredClone(data.get(k)) as T | undefined; }, async put(k, v) { data.set(k, structuredClone(v)); }, async delete(k) { return data.delete(k); } };
}
const env = (AI: Env["AI"]): Env => ({ AI_PROVIDER: "workers-ai", FIREBASE_PROJECT_ID: "p", ALLOWED_ORIGINS: "", QUOTA: memKV(), CF_VERSION_METADATA: { id: "aaaaaaaa-1111" }, AI });
/** Sırayla cevap veren sahte model; her çağrının istemi kaydedilir */
function sahte(cevaplar: Array<unknown | Error | ((sys: string) => unknown)>) {
  const istem: string[] = []; let i = 0;
  const AI = { async run(_m: string, input: any) {
    const sys = input.messages[0].content as string; istem.push(sys);
    let c = cevaplar[Math.min(i++, cevaplar.length - 1)];
    if (typeof c === "function") c = (c as (s: string) => unknown)(sys);
    if (c instanceof Error) throw c;
    return { response: c, usage: { prompt_tokens: 40, completion_tokens: 10 } };
  } };
  return { AI, istem };
}

const FB_VARS = ORNEKLER.find((o) => o.gorev === "feedback_tr")!.vars;
const FB_IYI = { goals: [{ id: "g1", done: true }, { id: "g2", done: false }], strengths_tr: ["İsteğini açıkça söyledin."], fixes: [{ said: "Wie oft ich nehmen?", better: "Wie oft soll ich es nehmen?", why_tr: "Soruda fiil ikinci sırada gelir." }], english_fallbacks: 0, gaps_de: ["sollen"], summary_tr: "Bir hedefi yaptın, güzel bir başlangıç." };
/** 13:24 UTC canlı kusurun eşi: güçlü yan Almanca */
const FB_ALMANCA = { ...FB_IYI, strengths_tr: ["Du hast dein Anliegen klar und höflich gesagt.", "İsteğini açıkça söyledin."] };
const FB_HEPSI_ALMANCA = { ...FB_IYI, strengths_tr: ["Gut gemacht!"], fixes: [{ ...FB_IYI.fixes[0], why_tr: "Im Fragesatz steht das Verb an zweiter Stelle." }], summary_tr: "Du hast das Gespräch gut gemacht, aber die Frage war nicht richtig." };

describe("dil ölçüsü (öz-sınamayla aynı; PM-112 A.1)", () => {
  it("kısa Almanca övgü ve açıklama Türkçe alanda yakalanır", () => {
    expect(dilHatasi("Gut gemacht!", "tr")).toBe("de");
    expect(dilHatasi("Du hast dein Anliegen klar und höflich gesagt.", "tr")).toBe("de");
    expect(dilHatasi("Im Fragesatz steht das Verb an zweiter Stelle.", "tr")).toBe("de");
  });
  it("Almancası kalın ya da tırnaklı Türkçe açıklama geçer", () => {
    expect(dilHatasi("**Wie oft** sorusunda fiil ikinci sırada gelir.", "tr")).toBeNull();
    expect(dilHatasi("'Gut gemacht' demek güzel olur.", "tr")).toBeNull();
    expect(dilHatasi("Kibarca istedin.", "tr")).toBeNull();
  });
  it("trAlanlari yalnız Türkçe beklenen alanları verir (Almanca alanlar denetlenmez)", () => {
    expect(trAlanlari("feedback_tr", FB_ALMANCA).map(([y]) => y)).toEqual(["strengths_tr.0", "strengths_tr.1", "fixes.0.why_tr", "summary_tr"]);
    expect(trAlanlari("roleplay_turn", { reply_de: "Bu Türkçe bir cümle.", end: false })).toEqual([]);
    expect(dilBozuk("feedback_tr", FB_ALMANCA)).toEqual(["strengths_tr.0"]);
    expect(dilBozuk("feedback_tr", FB_IYI)).toEqual([]);
  });
});

describe("dilYedegi: kural tabanlı Türkçe, şemaya uyar", () => {
  it("feedback_tr: bozuk güçlü yan düşer, gerekçe ve özet Türkçe kurulur", () => {
    const y = dilYedegi("feedback_tr", FB_HEPSI_ALMANCA, dilBozuk("feedback_tr", FB_HEPSI_ALMANCA)) as typeof FB_IYI;
    expect(AiTasks.feedback_tr.output.safeParse(y).success).toBe(true);
    expect(y.strengths_tr).toEqual([]);
    expect(y.fixes[0]!.why_tr).toBe(DIL_YEDEK.why_tr);
    expect(y.fixes[0]!.better).toBe("Wie oft soll ich es nehmen?");
    expect(y.summary_tr).toBe("2 hedeften 1 tanesini yaptın; kalanı bir dahaki konuşmada dene.");
    expect(y.goals).toEqual(FB_HEPSI_ALMANCA.goals); // karar modelindir, yedek değiştirmez
    expect(dilBozuk("feedback_tr", y)).toEqual([]);
  });
  it("equiv_check: gerekçe karara göre; explain_tr: asıl karşılık bozuksa yedek yok (null); say_it_de: not düşer", () => {
    expect(dilYedegi("equiv_check", { ok: true, reason_tr: "Same meaning." }, ["reason_tr"])).toEqual({ ok: true, reason_tr: DIL_YEDEK.reason_ok });
    expect(dilYedegi("equiv_check", { ok: false, reason_tr: "Das Verb ist falsch." }, ["reason_tr"])).toEqual({ ok: false, reason_tr: DIL_YEDEK.reason_yanlis });
    expect(dilYedegi("explain_tr", { tr: "Feierabend ist das Ende der Arbeit.", note_tr: "x", examples: [] }, ["tr"])).toBeNull();
    const ex = dilYedegi("explain_tr", { tr: "mesai sonu", note_tr: "This is used after work.", examples: [{ de: "Endlich Feierabend!", tr: "Endlich frei!" }, { de: "Schönen Feierabend!", tr: "İyi akşamlar!" }] }, ["note_tr", "examples.0.tr"]);
    expect(ex).toEqual({ tr: "mesai sonu", note_tr: DIL_YEDEK.note_tr, examples: [{ de: "Schönen Feierabend!", tr: "İyi akşamlar!" }] });
    expect(dilYedegi("say_it_de", { de_simple: "Ich möchte mein Rezept abholen.", note_tr: "Das ist höflich und gut." }, ["note_tr"])).toEqual({ de_simple: "Ich möchte mein Rezept abholen." });
  });
});

describe("runTask: hata enjeksiyonu (PM-112 A.1)", () => {
  it("ilk çıktı Almanca → bir kez uyarılı yeniden soru → Türkçe çıktı (dil: yeniden)", async () => {
    const { AI, istem } = sahte([FB_ALMANCA, FB_IYI]);
    const r = await runTask(env(AI), "feedback_tr", FB_VARS);
    expect(r).toMatchObject({ dil: "yeniden", output: FB_IYI });
    expect(istem.length).toBe(2);
    expect(istem[1]).toContain("ACHTUNG"); expect(istem[1]).toContain("strengths_tr.0");
  });
  it("ikinci çıktı da Almanca → yedek (dil: yedek); yedek modele geçilmez, üçüncü çağrı yok", async () => {
    const { AI, istem } = sahte([FB_HEPSI_ALMANCA, FB_HEPSI_ALMANCA, FB_IYI]);
    const r = await runTask(env(AI), "feedback_tr", FB_VARS);
    expect(r.dil).toBe("yedek");
    expect(dilBozuk("feedback_tr", r.output)).toEqual([]);
    expect(istem.length).toBe(2);
  });
  it("yeniden soru düşerse (meşgul/zaman aşımı) ilk çıktı yedekle kurtarılır", async () => {
    const { AI } = sahte([FB_ALMANCA, new Error("down")]);
    const r = await runTask(env(AI), "feedback_tr", FB_VARS);
    expect(r.dil).toBe("yedek");
    expect((r.output as typeof FB_IYI).strengths_tr).toEqual(["İsteğini açıkça söyledin."]);
  });
  it("yeniden soru şemaya uymazsa ilk çıktı yedeklenir", async () => {
    const { AI } = sahte([FB_ALMANCA, "kein json"]);
    const r = await runTask(env(AI), "feedback_tr", FB_VARS);
    expect(r.dil).toBe("yedek"); expect(dilBozuk("feedback_tr", r.output)).toEqual([]);
  });
  it("explain_tr'nin asıl karşılığı iki kez Almanca → bad_output (istemci yapay zekâsız yola düşer); yedek model denenmez", async () => {
    const bozuk = { tr: "Das Ende des Arbeitstages, man hat frei.", note_tr: "Man sagt das nach der Arbeit.", examples: [] };
    const { AI, istem } = sahte([bozuk, bozuk, bozuk, bozuk]);
    await expect(runTask(env(AI), "explain_tr", { de: "Feierabend" })).rejects.toMatchObject({ code: "bad_output", detail: "dil" });
    expect(istem.length).toBe(2);
  });
  it("Türkçe çıktı dokunulmadan geçer, tek çağrı", async () => {
    const { AI, istem } = sahte([FB_IYI]);
    const r = await runTask(env(AI), "feedback_tr", FB_VARS);
    expect(r).toEqual({ output: FB_IYI, model: expect.any(String) }); expect(istem.length).toBe(1);
  });
  it("her görev: bütün Türkçe alanlar Almanca/İngilizce gelse de öğrenciye giden çıktıda bozuk Türkçe alan yok", async () => {
    const kotu: Record<AiTaskName, unknown> = {
      equiv_check: { ok: true, reason_tr: "Correct, same meaning as the expected answer." },
      explain_tr: { tr: "mesai sonu", note_tr: "Man sagt das nach der Arbeit, wenn man frei hat.", examples: [{ de: "Endlich Feierabend!", tr: "Endlich ist die Arbeit vorbei." }] },
      say_it_de: { de_simple: "Ich möchte mein Rezept abholen.", note_tr: "This is the polite way to say it." },
      roleplay_turn: { reply_de: "Guten Tag! Was darf es sein?", end: false },
      feedback_tr: FB_HEPSI_ALMANCA
    };
    for (const o of ORNEKLER) {
      const { AI } = sahte([kotu[o.gorev], kotu[o.gorev]]);
      const r = await runTask(env(AI), o.gorev, o.vars);
      expect(dilBozuk(o.gorev, r.output), o.gorev).toEqual([]);
      expect(AiTasks[o.gorev].output.safeParse(r.output).success, o.gorev).toBe(true);
    }
  });
});

describe("dilGuvencesi: bütçe", () => {
  it("kalan bütçe yetmezse yeniden sorulmaz, doğrudan yedek (öğrenci beklemez)", async () => {
    let cagri = 0;
    const r = await dilGuvencesi("feedback_tr", FB_ALMANCA, "m", () => 900, async () => { cagri++; return JSON.stringify(FB_IYI); }, AiTasks.feedback_tr.output);
    expect(cagri).toBe(0); expect(r.dil).toBe("yedek");
  });
  it("programlama hatası yutulmaz", async () => {
    await expect(dilGuvencesi("feedback_tr", FB_ALMANCA, "m", () => 5000, async () => { throw new TypeError("x"); }, AiTasks.feedback_tr.output)).rejects.toThrow(TypeError);
    await expect(dilGuvencesi("feedback_tr", FB_ALMANCA, "m", () => 5000, async () => { throw new HttpError("timeout"); }, AiTasks.feedback_tr.output)).resolves.toMatchObject({ dil: "yedek" });
  });
});

describe("istem sıkılaştı (PM-112 A.1)", () => {
  it("Türkçe alanı olan her görevin istemi Türkçe kuralını taşır; feedback_tr Türkçe örnek verir", () => {
    const v = { level: 1, partner_de: "x", scene_tr: "x", goals_de: [], stuck: 0 };
    for (const g of ["equiv_check", "explain_tr", "say_it_de", "feedback_tr"] as AiTaskName[]) expect(TEMPLATES[g].system(v), g).toContain("auf _tr endet, ist auf TÜRKISCH");
    expect(TEMPLATES.feedback_tr.system(v)).toContain("İsteğini açıkça söyledin.");
    expect(TEMPLATES.feedback_tr.version).toBe("feedback_tr.v2");
  });
});

describe("öz-sınama 20 ardışık koşu: feedback_tr dil hatası 0 (PM-112 A.1)", () => {
  it("model her koşuda ilk cevapta Almanca güçlü yan verse de 20 koşunun 20'si geçer; onarım sayılır", async () => {
    // her koşuda feedback_tr'nin ilk çağrısı Almanca, yeniden soru Türkçe; tek koşularda yeniden soru da Almanca (yedek)
    let fb = 0, kosu = 0;
    const IYI: Record<string, unknown> = {
      equiv_check: { ok: true, reason_tr: "Anlam aynı ve cümle doğru." },
      explain_tr: { tr: "mesai sonu", note_tr: "Akşam işten çıkınca kullanılır.", examples: [] },
      say_it_de: { de_simple: "Ich möchte mein Rezept abholen." },
      roleplay_turn: { reply_de: "Gern. Haben Sie Allergien?", end: false }
    };
    const gorevi = (sys: string) => sys.includes("faire Deutschlehrerin") ? "equiv_check" : sys.includes("erklärst") ? "explain_tr" : sys.includes("möchte etwas sagen") ? "say_it_de" : sys.includes("GENAU EINE Figur") ? "roleplay_turn" : "feedback_tr";
    const { AI } = sahte([(sys: string) => {
      const g = gorevi(sys);
      if (g !== "feedback_tr") return IYI[g];
      fb++;
      const yeniden = sys.includes("ACHTUNG");
      if (!yeniden) kosu++;
      return !yeniden ? FB_ALMANCA : kosu % 2 ? FB_HEPSI_ALMANCA : FB_IYI;
    }]);
    let t = Date.parse("2026-11-23T00:00:00Z");
    const c = new OzSinamaCekirdek(memDepo(), env(AI), () => t);
    let dilHatasiSay = 0, onarim = 0;
    for (let k = 0; k < 20; k++) {
      const j = await c.oku();
      expect(j.durum).toBe("kostu");
      const g = j.gorevler.find((x) => x.gorev === "feedback_tr")!;
      if (g.neden?.startsWith("dil:")) dilHatasiSay++;
      if (g.dil) onarim++;
      expect(g.gecti).toBe(true);
      t += ST.aralik_dk * 60_000 + 1;
    }
    expect(dilHatasiSay).toBe(0);
    expect(onarim).toBe(20);
    expect(fb).toBe(40);
  });
});
