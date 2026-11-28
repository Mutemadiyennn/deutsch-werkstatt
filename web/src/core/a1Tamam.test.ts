/** PM-148 karar 1: "A1 tamam" kapısı (bayrak kapalı, açık + eksik, açık + hepsi indi) */
import { describe, expect, it } from "vitest";
import { A1_TAMAM, a1TamamAskida, a1TamamEksik, eksikMetni, type A1TamamPolitika } from "./a1Tamam.ts";

const pol = (acik: boolean, indi: Record<string, boolean>): A1TamamPolitika => ({
  acik, kosullar: Object.fromEntries(Object.entries(indi).map(([id, i]) => [id, { tr: `ad ${id}`, indi: i }])),
});

describe("a1 tamam kapısı", () => {
  it("politika: bayrak kapalı iner; altı koşul, hiçbiri inmedi", () => {
    expect(A1_TAMAM.acik).toBe(false);
    expect(Object.keys(A1_TAMAM.kosullar)).toEqual(["P0-1", "P0-2", "P1-2", "P1-3", "P1-4", "P1-5"]);
    for (const k of Object.values(A1_TAMAM.kosullar)) { expect(k.tr.length).toBeGreaterThan(3); expect(k.indi).toBe(false); }
    expect(a1TamamAskida()).toBe(false);
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
