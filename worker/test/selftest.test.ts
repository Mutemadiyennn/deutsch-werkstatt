import { describe, it, expect } from "vitest";
import { handle } from "../src/index.ts";
import type { Env, KV } from "../src/env.ts";
import { ORNEKLER, dilHatasi, gorevSina, ozet, ST, OzSinamaCekirdek, OzSinamaDO, type Depo } from "../src/ai/selftest.ts";
import { WA } from "../src/ai/workersai.ts";

function memKV(): KV & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, async get(k) { return data.get(k) ?? null; }, async put(k, v) { data.set(k, v); } };
}
/** Durable Object deposunun bellek eşi (her işlem bir mikro görev bekler: gerçek eşzamanlılık sıralaması) */
function memDepo(): Depo & { data: Map<string, unknown> } {
  const data = new Map<string, unknown>();
  return {
    data,
    async get<T>(k: string) { await Promise.resolve(); return structuredClone(data.get(k)) as T | undefined; },
    async put(k, v) { await Promise.resolve(); data.set(k, structuredClone(v)); },
    async delete(k) { return data.delete(k); }
  };
}
/** Görev başına doğru biçimli, doğru dilli sahte cevap */
const IYI: Record<string, unknown> = {
  equiv_check: { ok: true, reason_tr: "Anlam aynı ve cümle doğru." },
  explain_tr: { tr: "iş günü bitti, mesai sonu", note_tr: "Akşam işten çıkınca kullanılır.", examples: [{ de: "Ich habe heute früh Feierabend.", tr: "Bugün işten erken çıkıyorum." }] },
  say_it_de: { de_simple: "Ich möchte mein Rezept abholen.", note_tr: "'abholen' almak, teslim almak demektir." },
  roleplay_turn: { reply_de: "Gern. Ich empfehle Ibuprofen. Haben Sie Allergien?", end: false },
  feedback_tr: { goals: [{ id: "g1", done: true }, { id: "g2", done: true }], strengths_tr: ["İsteğini açıkça söyledin."], fixes: [{ said: "Wie oft ich nehmen?", better: "Wie oft soll ich es nehmen?", why_tr: "Soruda fiil ikinci sırada gelir." }], english_fallbacks: 0, gaps_de: ["sollen"], summary_tr: "İki hedefi de yaptın, çok iyi." }
};
const gorevi = (sys: string) =>
  sys.includes("faire Deutschlehrerin") ? "equiv_check" : sys.includes("erklärst") ? "explain_tr" : sys.includes("möchte etwas sagen") ? "say_it_de" : sys.includes("GENAU EINE Figur") ? "roleplay_turn" : "feedback_tr";
function sahteAI(cevap: (sys: string) => unknown, gecikme = 0) {
  const cagri: string[] = [];
  const AI = { async run(_m: string, input: any) {
    const sys = input.messages[0].content as string; cagri.push(sys);
    if (gecikme) await new Promise((r) => setTimeout(r, gecikme));
    const c = cevap(sys); if (c instanceof Error) throw c; return c;
  } };
  return { AI, cagri };
}
const iyiAI = (gecikme = 0) => sahteAI((sys) => ({ response: IYI[gorevi(sys)], usage: { prompt_tokens: 500, completion_tokens: 80 } }), gecikme);
const env = (over: Partial<Env> = {}): Env => ({ AI_PROVIDER: "workers-ai", FIREBASE_PROJECT_ID: "p", ALLOWED_ORIGINS: "", QUOTA: memKV(), CF_VERSION_METADATA: { id: "aaaaaaaa-1111" }, ...over });
const kvVeri = (e: Env) => (e.QUOTA as unknown as { data: Map<string, string> }).data;
/** Tek örnekli DO ad alanı eşi: her idFromName aynı örneği verir */
function doBagla(e: Env) {
  const depo = memDepo();
  const ornek = new OzSinamaDO({ storage: depo }, e);
  e.OZ_SINAMA = { idFromName: () => "tek", get: () => ({ fetch: (r: Request) => ornek.fetch(r) }) };
  return depo;
}
const T0 = Date.parse("2026-11-23T10:00:00Z");

describe("dil denetimi (inceleme #209 P1-3)", () => {
  it("Almanca, Türkçe, İngilizce ayrılır; kısa belirsiz metin geçer", () => {
    expect(dilHatasi("Ich möchte mein Rezept abholen.", "de")).toBeNull();
    expect(dilHatasi("Anlam aynı ve cümle doğru.", "tr")).toBeNull();
    expect(dilHatasi("The answer is correct and you did well.", "tr")).toBe("en");
    expect(dilHatasi("Please take this medicine with water.", "de")).toBe("en");
    expect(dilHatasi("Die Antwort ist richtig und gut.", "tr")).toBe("de");
    expect(dilHatasi("Bu cümle çok doğru, iyi.", "de")).toBe("tr");
    expect(dilHatasi("Ibuprofen.", "de")).toBeNull();
    expect(dilHatasi("'Feierabend' iş gününün sonu demektir.", "tr")).toBeNull();
  });
  it("Almanca alıntılı Türkçe açıklama geçer", () => {
    expect(dilHatasi("'Ich möchte einen Termin machen' ile 'Ich hätte gern einen Termin' aynı anlama gelir.", "tr")).toBeNull();
    expect(dilHatasi('Cevap doğru: "Ich hätte gern einen Termin" kibar bir istektir.', "tr")).toBeNull();
    expect(dilHatasi("Doğrusu: Wie oft soll ich das nehmen?", "tr")).toBeNull();
    expect(dilHatasi("„Feierabend“ akşam işten çıkmak.", "tr")).toBeNull();
  });
  it("kısa İngilizce yakalanır", () => {
    expect(dilHatasi("Three times a day.", "de")).toBe("en");
    expect(dilHatasi("Take one tablet after meals.", "de")).toBe("en");
    expect(dilHatasi("Great job, well done!", "tr")).toBe("en");
    expect(dilHatasi("Correct. Same meaning.", "tr")).toBe("en");
    expect(dilHatasi("Dreimal am Tag nach dem Essen.", "de")).toBeNull();
    expect(dilHatasi("Günde en fazla on tablet alma.", "tr")).toBeNull();
  });
});

describe("GET /v1/ai/selftest (PM-087 A)", () => {
  it("kimliksiz; beş görev geçer; yalnız geçti/ms/model/neden döner, model çıktısı dönmez", async () => {
    const { AI, cagri } = iyiAI();
    const e = env({ AI }); doBagla(e);
    const r = await handle(new Request("https://api.test/v1/ai/selftest"), e);
    expect(r.status).toBe(200);
    const t = await r.text(); const j = JSON.parse(t);
    expect(j).toMatchObject({ durum: "kostu", ok: true, taze: true, surum: "aaaaaaaa" });
    expect(j.gorevler.map((g: any) => g.gorev)).toEqual(["equiv_check", "explain_tr", "say_it_de", "roleplay_turn", "feedback_tr"]);
    for (const g of j.gorevler) { expect(Object.keys(g).sort()).toEqual(["dil", "gecti", "gorev", "model", "ms", "neden"]); expect(g.model).toBe(WA.model); expect(g.dil).toBeNull(); }
    expect(t).not.toContain("Ibuprofen"); expect(t).not.toContain("Rezept");
    expect(cagri.length).toBe(5);
    expect(j.bugun.kosu).toBe(1); expect(j.bugun.gorev.equiv_check).toMatchObject({ gecti: 1, toplam: 1 });
    expect(j.dun.kosu).toBe(0);
    // nöronlar ortak sayaçtan düştü; kilit ve kayıt KV'de değil (KV yazma payı korunur)
    expect([...kvVeri(e).keys()].filter((k) => !k.startsWith("n:wa:"))).toEqual([]);
    expect(Number([...kvVeri(e).entries()].find(([k]) => k.startsWith("n:wa:"))![1])).toBeGreaterThan(0);
  });
  it("50 eşzamanlı istek tek koşu yapar (5 model çağrısı); hepsi aynı sonucu alır (P1-1)", async () => {
    const { AI, cagri } = iyiAI(5);
    const e = env({ AI }); const depo = doBagla(e);
    const yanit = await Promise.all(Array.from({ length: 50 }, () => handle(new Request("https://api.test/v1/ai/selftest"), e).then((r) => r.json())));
    expect(cagri.length).toBe(5);
    expect(new Set(yanit.map((j: any) => j.zaman)).size).toBe(1);
    expect(yanit.every((j: any) => j.ok && j.taze)).toBe(true);
    expect((depo.data.get(`gun:${new Date().toISOString().slice(0, 10)}`) as unknown[]).length).toBe(1);
  });
  it("depo okuması bir koşudan uzun sürse de ikinci koşu başlamaz (2. tur)", async () => {
    const { AI, cagri } = iyiAI(); const ic = memDepo(); let yavas = true;
    // ilk isteğin 'son' okuması, ikinci istek bütün koşuyu bitirene kadar bekletilir
    let birak!: () => void; const kapi = new Promise<void>((r) => (birak = r));
    const depo: Depo = { ...ic, async get<T>(k: string) { if (k === "son" && yavas) { yavas = false; await kapi; return undefined; } return ic.get<T>(k); } };
    const c = new OzSinamaCekirdek(depo, env({ AI }));
    const a = c.oku();
    await new Promise((r) => setTimeout(r, 0));
    const b = await c.oku(); // ikinci istek koşar ve biter
    birak();
    const j = await a;
    expect(cagri.length).toBe(5); expect(j.zaman).toBe(b.zaman); expect(j.durum).toBe("onbellek");
  });
  it("koşu yazarken depo düşerse sonraki istek sonlanır ve yeniden koşar (döngü yok)", async () => {
    const { AI, cagri } = iyiAI(); const ic = memDepo(); let bozuk = true; let okuma = 0;
    const depo: Depo = { ...ic, async get<T>(k: string) { okuma++; return ic.get<T>(k); }, async put(k, v) { if (bozuk) throw new Error("depo"); return ic.put(k, v); } };
    const c = new OzSinamaCekirdek(depo, env({ AI }));
    await expect(c.oku()).rejects.toThrow("depo");
    bozuk = false; okuma = 0;
    const j = await c.oku();
    expect(j).toMatchObject({ durum: "kostu", taze: true }); expect(cagri.length).toBe(10); expect(okuma).toBeLessThan(10);
  });
  it(`${ST.aralik_dk} dk içinde ikinci istek modeli çağırmaz; süre dolunca yeniden koşar`, async () => {
    const { AI, cagri } = iyiAI(); const e = env({ AI });
    let t = T0; const c = new OzSinamaCekirdek(memDepo(), e, () => t);
    const a = await c.oku();
    t += 10 * 60_000;
    const b = await c.oku();
    expect(b).toMatchObject({ durum: "onbellek", ok: true, taze: true }); expect(b.gorevler).toEqual(a.gorevler); expect(cagri.length).toBe(5);
    t += ST.aralik_dk * 60_000;
    const d = await c.oku();
    expect(d.durum).toBe("kostu"); expect(cagri.length).toBe(10); expect(d.bugun.kosu).toBe(2);
  });
  it("yeni dağıtım (sürüm) önbelleği geçersiz kılar: yeni sürüm hemen sınanır (P1-2)", async () => {
    const { AI, cagri } = iyiAI(); const depo = memDepo();
    let t = T0;
    await new OzSinamaCekirdek(depo, env({ AI }), () => t).oku();
    t += 5 * 60_000;
    const j = await new OzSinamaCekirdek(depo, env({ AI, CF_VERSION_METADATA: { id: "bbbbbbbb-2222" } }), () => t).oku();
    expect(j).toMatchObject({ durum: "kostu", surum: "bbbbbbbb", taze: true }); expect(cagri.length).toBe(10);
  });
  it("öğrencinin payı korunur: eşik geçildiyse koşmaz ve eski yeşil 'taze' sayılmaz (P1-2)", async () => {
    const { AI, cagri } = iyiAI(); const e = env({ AI }); const depo = memDepo();
    let t = T0;
    await new OzSinamaCekirdek(depo, e, () => t).oku();
    t += ST.aralik_dk * 60_000 + 1;
    await e.QUOTA.put("n:wa:2026-11-23", String(WA.daily_neurons * ST.ogrenci_payi_orani));
    const j = await new OzSinamaCekirdek(depo, e, () => t).oku();
    expect(j).toMatchObject({ durum: "pay_korunuyor", ok: true, taze: false }); expect(cagri.length).toBe(5);
  });
  it("günlük tavan dolduysa koşmaz", async () => {
    const { AI, cagri } = iyiAI(); const depo = memDepo();
    await depo.put("gun:2026-11-23", Array.from({ length: ST.gunluk_en_cok }, (_, i) => ({ t: String(i), g: [] })));
    const j = await new OzSinamaCekirdek(depo, env({ AI }), () => T0).oku();
    expect(j).toMatchObject({ durum: "gunluk_tavan", taze: false }); expect(cagri.length).toBe(0);
  });
  it("Workers AI dışında (kapalı ya da Gemini) koşmaz, yazmaz; DO bağlamı yoksa kapali", async () => {
    for (const over of [{ AI_PROVIDER: "none" }, { AI_PROVIDER: "gemini", GEMINI_KEY: "k" }, { AI: undefined }] as Partial<Env>[]) {
      const depo = memDepo(); const e = env({ AI: iyiAI().AI, ...over });
      const j = await new OzSinamaCekirdek(depo, e).oku();
      expect(j).toMatchObject({ durum: "kapali", ok: false, taze: false }); expect(depo.data.size).toBe(0); expect(kvVeri(e).size).toBe(0);
    }
    const j = await (await handle(new Request("https://api.test/v1/ai/selftest"), env({ AI: iyiAI().AI }))).json();
    expect(j).toMatchObject({ durum: "kapali", ok: false, taze: false });
  });
  it("bozuk çıktı → sema; İngilizce Türkçe alan → çalışma anı güvencesi onarır (dil: yedek); sağlayıcı hatası → kod; hata ayrıntısı sızmaz", async () => {
    const { AI } = sahteAI((sys) => {
      const g = gorevi(sys);
      if (g === "equiv_check") return { response: "kein json" };
      if (g === "explain_tr") return { response: { ...(IYI.explain_tr as object), note_tr: "This is used when you finish your work." } };
      if (g === "say_it_de") return new Error("upstream secret-detail 500");
      return { response: IYI[g] };
    });
    const e = env({ AI }); doBagla(e);
    const t = await (await handle(new Request("https://api.test/v1/ai/selftest"), e)).text(); const j = JSON.parse(t);
    expect(j).toMatchObject({ ok: false, taze: true });
    const n = Object.fromEntries(j.gorevler.map((g: any) => [g.gorev, g.neden]));
    expect(n.equiv_check).toBe("hata:sema");
    // PM-112 A.1: öğrenci İngilizce not görmez; öz-sınama geçer ama onarımı gösterir (sapma görünür kalır)
    expect(n.explain_tr).toBeNull();
    expect(j.gorevler.find((g: any) => g.gorev === "explain_tr").dil).toBe("yedek");
    expect(j.bugun.gorev.explain_tr).toMatchObject({ gecti: 1, dil_onarim: 1 });
    expect(n.say_it_de).toBe("hata:upstream_busy");
    expect(n.roleplay_turn).toBeNull();
    expect(t).not.toContain("secret-detail");
    expect(j.bugun.gorev.equiv_check).toMatchObject({ gecti: 0, toplam: 1 });
  });
  it("12 sn'yi geçen başarılı görev 'sure' ile kalır", async () => {
    const { AI } = iyiAI();
    let t = 0; const simdi = () => (t += ST.gecme_ms + 1); // her okuma 12 sn + 1 ms ilerler
    const g = await gorevSina(env({ AI }), ORNEKLER[0]!, simdi);
    expect(g).toMatchObject({ gecti: false, neden: "sure" });
  });
  it("özet: ortanca ve en uzun", () => {
    const o = ozet("2026-11-23", [{ t: "a", g: [["equiv_check", 1, 100]] }, { t: "b", g: [["equiv_check", 0, 300]] }, { t: "c", g: [["equiv_check", 1, 200]] }]);
    expect(o.gorev.equiv_check).toEqual({ gecti: 2, toplam: 3, ortanca_ms: 200, en_uzun_ms: 300, dil_onarim: 0 });
  });
});
