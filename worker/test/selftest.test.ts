import { describe, it, expect } from "vitest";
import { handle } from "../src/index.ts";
import type { Env, KV } from "../src/env.ts";
import { ORNEKLER, dilHatasi, gorevSina, ozSinama, ozet, ST } from "../src/ai/selftest.ts";

function memKV(): KV & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, async get(k) { return data.get(k) ?? null; }, async put(k, v) { data.set(k, v); } };
}
/** Görev başına doğru biçimli, doğru dilli sahte cevap */
const IYI: Record<string, unknown> = {
  equiv_check: { ok: true, reason_tr: "Anlam aynı ve cümle doğru." },
  explain_tr: { tr: "iş günü bitti, mesai sonu", note_tr: "Akşam işten çıkınca kullanılır.", examples: [{ de: "Ich habe heute früh Feierabend.", tr: "Bugün işten erken çıkıyorum." }] },
  say_it_de: { de_simple: "Ich möchte mein Rezept abholen.", note_tr: "'abholen' almak, teslim almak demektir." },
  roleplay_turn: { reply_de: "Gern. Ich empfehle Ibuprofen. Haben Sie Allergien?", end: false },
  feedback_tr: { goals: [{ id: "g1", done: true }, { id: "g2", done: true }], strengths_tr: ["İsteğini açıkça söyledin."], fixes: [{ said: "Wie oft ich nehmen?", better: "Wie oft soll ich es nehmen?", why_tr: "Soruda fiil ikinci sırada gelir." }], english_fallbacks: 0, gaps_de: ["sollen"], summary_tr: "İki hedefi de yaptın, çok iyi." }
};
function sahteAI(cevap: (gorevSistem: string, i: number) => unknown) {
  let i = 0; const cagri: string[] = [];
  const AI = { async run(_m: string, input: any) { const sys = input.messages[0].content as string; cagri.push(sys); const c = cevap(sys, i++); if (c instanceof Error) throw c; return c; } };
  return { AI, cagri };
}
const gorevi = (sys: string) =>
  sys.includes("faire Deutschlehrerin") ? "equiv_check" : sys.includes("erklärst") ? "explain_tr" : sys.includes("möchte etwas sagen") ? "say_it_de" : sys.includes("GENAU EINE Figur") ? "roleplay_turn" : "feedback_tr";
const iyiAI = () => sahteAI((sys) => ({ response: IYI[gorevi(sys)], usage: { prompt_tokens: 500, completion_tokens: 80 } }));
const env = (over: Partial<Env> = {}): Env => ({ AI_PROVIDER: "workers-ai", FIREBASE_PROJECT_ID: "p", ALLOWED_ORIGINS: "", QUOTA: memKV(), ...over });
const kvVeri = (e: Env) => (e.QUOTA as unknown as { data: Map<string, string> }).data;

describe("dil denetimi", () => {
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
});

describe("GET /v1/ai/selftest (PM-087 A)", () => {
  it("kimliksiz; beş görev geçer; yalnız geçti/ms/model/neden döner, model çıktısı dönmez", async () => {
    const { AI, cagri } = iyiAI();
    const e = env({ AI });
    const r = await handle(new Request("https://api.test/v1/ai/selftest"), e);
    expect(r.status).toBe(200);
    const t = await r.text(); const j = JSON.parse(t);
    expect(j.durum).toBe("kostu"); expect(j.ok).toBe(true);
    expect(j.gorevler.map((g: any) => g.gorev)).toEqual(["equiv_check", "explain_tr", "say_it_de", "roleplay_turn", "feedback_tr"]);
    for (const g of j.gorevler) { expect(Object.keys(g).sort()).toEqual(["gecti", "gorev", "model", "ms", "neden"]); expect(g.model).toBe("@cf/mistralai/mistral-small-3.1-24b-instruct"); }
    expect(t).not.toContain("Ibuprofen"); expect(t).not.toContain("Rezept");
    expect(cagri.length).toBe(5);
    expect(j.bugun.kosu).toBe(1); expect(j.bugun.gorev.equiv_check).toMatchObject({ gecti: 1, toplam: 1 });
    expect(j.dun.kosu).toBe(0);
    // nöronlar ortak sayaçtan düştü
    expect(Number([...kvVeri(e).entries()].find(([k]) => k.startsWith("n:wa:"))![1])).toBeGreaterThan(0);
  });
  it(`${ST.aralik_dk} dk içinde ikinci istek modeli çağırmaz, son sonucu döner; süre dolunca yeniden koşar`, async () => {
    const { AI, cagri } = iyiAI(); const e = env({ AI });
    let t = Date.parse("2026-11-23T10:00:00Z");
    const a = await ozSinama(e, () => t);
    t += 10 * 60_000;
    const b = await ozSinama(e, () => t);
    expect(b.durum).toBe("onbellek"); expect(b.ok).toBe(true); expect(b.gorevler).toEqual(a.gorevler); expect(cagri.length).toBe(5);
    t += ST.aralik_dk * 60_000;
    const c = await ozSinama(e, () => t);
    expect(c.durum).toBe("kostu"); expect(cagri.length).toBe(10); expect(c.bugun.kosu).toBe(2);
  });
  it("öğrencinin payı korunur: nöron sayacı eşiği geçtiyse koşmaz", async () => {
    const { AI, cagri } = iyiAI(); const e = env({ AI });
    const t = Date.parse("2026-11-23T10:00:00Z");
    await e.QUOTA.put("n:wa:2026-11-23", String(3000 * ST.ogrenci_payi_orani));
    const j = await ozSinama(e, () => t);
    expect(j.durum).toBe("pay_korunuyor"); expect(cagri.length).toBe(0);
  });
  it("günlük tavan dolduysa koşmaz", async () => {
    const { AI, cagri } = iyiAI(); const e = env({ AI });
    await e.QUOTA.put("st:gun:2026-11-23", JSON.stringify(Array.from({ length: ST.gunluk_en_cok }, (_, i) => ({ t: String(i), g: [] }))));
    const j = await ozSinama(e, () => Date.parse("2026-11-23T10:00:00Z"));
    expect(j.durum).toBe("gunluk_tavan"); expect(cagri.length).toBe(0);
  });
  it("sağlayıcı kapalıysa kapali, KV'ye yazmaz", async () => {
    const e = env({ AI_PROVIDER: "none" });
    const j = await ozSinama(e);
    expect(j).toMatchObject({ durum: "kapali", ok: false }); expect(kvVeri(e).size).toBe(0);
  });
  it("bozuk çıktı → sema; İngilizce alan → dil; sağlayıcı hatası → kod; hata ayrıntısı sızmaz", async () => {
    const { AI } = sahteAI((sys) => {
      const g = gorevi(sys);
      if (g === "equiv_check") return { response: "kein json" };
      if (g === "explain_tr") return { response: { ...(IYI.explain_tr as object), note_tr: "This is used when you finish your work." } };
      if (g === "say_it_de") return new Error("upstream secret-detail 500");
      return { response: IYI[g] };
    });
    const e = env({ AI });
    const r = await handle(new Request("https://api.test/v1/ai/selftest"), e);
    const t = await r.text(); const j = JSON.parse(t);
    expect(j.ok).toBe(false);
    const n = Object.fromEntries(j.gorevler.map((g: any) => [g.gorev, g.neden]));
    expect(n.equiv_check).toBe("hata:sema");
    expect(n.explain_tr).toBe("dil:note_tr:en");
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
    expect(o.gorev.equiv_check).toEqual({ gecti: 2, toplam: 3, ortanca_ms: 200, en_uzun_ms: 300 });
  });
});
