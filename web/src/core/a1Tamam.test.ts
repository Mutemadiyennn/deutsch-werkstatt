/** PM-148 karar 1: "A1 tamam" kapısı (bayrak kapalı, açık + eksik, açık + hepsi indi) */
import { describe, expect, it } from "vitest";
import { A1_TAMAM, A2_ASKIDA, a1TamamAskida, a1TamamEksik, a2AskidaSatir, denemeAskidaSatir, eksikMetni, type A1TamamPolitika } from "./a1Tamam.ts";
import { BECERILER, raporMetni, type Karar, type TespitRaporu } from "./tespit.ts";

const pol = (acik: boolean, indi: Record<string, boolean>): A1TamamPolitika => ({
  acik, kosullar: Object.fromEntries(Object.entries(indi).map(([id, i]) => [id, { tr: `ad ${id}`, indi: i }])),
});

describe("a1 tamam kapısı", () => {
  it("politika: bayrak kapalı iner; altı koşul (DENETİM-A1 §7), her birinin Türkçe adı ve `indi` alanı var", () => {
    expect(A1_TAMAM.acik).toBe(false);
    expect(Object.keys(A1_TAMAM.kosullar)).toEqual(["P0-1", "P0-2", "P1-2", "P1-3", "P1-4", "P1-5"]);
    for (const k of Object.values(A1_TAMAM.kosullar)) { expect(k.tr.length).toBeGreaterThan(3); expect(typeof k.indi).toBe("boolean"); }
    expect(a1TamamAskida()).toBe(false);
  });
  it("askıdaki rapor metni (\"Raporu kopyala\") 'A2'ye hazırsın' demez", () => {
    const o = { dogru: 1, toplam: 1, oran: 1 };
    const r: TespitRaporu = { beceri: Object.fromEntries(BECERILER.map((b) => [b, o])) as TespitRaporu["beceri"], hafta: [], genel: 1, zayifCanDo: [], zayifDilNoktasi: [], bilinmeyenKelime: [], sorulan: [], bitti: true, karar: "a2", nedenler: [] };
    const karar: Record<Karar, string> = { a2: "A2'ye hazırsın.", tamamla: "t", bastan: "b" };
    const beceri = Object.fromEntries(BECERILER.map((b) => [b, b])) as Record<(typeof BECERILER)[number], string>;
    expect(raporMetni(r, { beceri, karar })).toContain("A2'ye hazırsın");
    const t = raporMetni(r, { beceri, karar: { ...karar, a2: A2_ASKIDA } }) + "\n" + a2AskidaSatir([{ tr: "x" }]);
    expect(t).not.toContain("hazırsın");
    expect(t).toContain("askıda");
    expect(denemeAskidaSatir([{ tr: "x" }, { tr: "y" }])).toContain("(x ve y)");
  });
  it("bayrak kapalı: koşul eksik olsa da askıda değil", () => {
    expect(a1TamamAskida(pol(false, { a: false, b: false }))).toBe(false);
  });
  it("bayrak açık + eksik: askıda, eksikler politikadaki sırayla", () => {
    const p = pol(true, { a: true, b: false, c: false });
    expect(a1TamamAskida(p)).toBe(true);
    expect(a1TamamEksik(p).map((e) => e.id)).toEqual(["b", "c"]);
  });
  it("bayrak açık + hepsi indi: askıda değil", () => {
    expect(a1TamamAskida(pol(true, { a: true, b: true }))).toBe(false);
    expect(a1TamamEksik(pol(true, { a: true }))).toEqual([]);
  });
  it("bayrak geçersiz kılınabilir (e2e yolu)", () => {
    expect(a1TamamAskida(pol(false, { a: false }), true)).toBe(true);
    expect(a1TamamAskida(pol(true, { a: false }), false)).toBe(false);
  });
  it("eksik metni Türkçe sıralama", () => {
    expect(eksikMetni([])).toBe("");
    expect(eksikMetni([{ tr: "x" }])).toBe("x");
    expect(eksikMetni([{ tr: "x" }, { tr: "y" }, { tr: "z" }])).toBe("x, y ve z");
  });
});
