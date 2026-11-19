import { describe, expect, it } from "vitest";
import { sozlukAra, kisiselAnahtar, tamVar } from "./sozlukAra.ts";

const L = (x: Record<string, unknown>) => ({ collocations: [], patterns: [], register: "neutral", related: [], mistakes_tr: [], examples: [], domains: [], legacy: [], ...x }) as never;
const LEX = [
  L({ id: "a", de: "Termin", tr: "randevu", pos: "noun", art: "der", pl: "Termine", tier: "K1", freqRank: 900 }),
  L({ id: "b", de: "Terminkalender", tr: "ajanda", pos: "noun", art: "der", freqRank: 9000 }),
  L({ id: "c", de: "gehen", tr: "gitmek", pos: "verb", verb: { praesens3: "geht", perfekt: "ist gegangen" }, freqRank: 50 }),
  L({ id: "d", de: "Schlüssel", tr: "anahtar", pos: "noun", art: "der" }),
  L({ id: "e", de: "müde", tr: "yorgun", pos: "adj" }),
  L({ id: "f", de: "Ärztin", tr: "kadın doktor, hekim", pos: "noun", art: "die" })
];

describe("sözlük araması (#58 B1)", () => {
  it("Almanca: tam eşleşme önce, artikelle, çoğulla, çekimli biçimle", () => {
    expect(sozlukAra("Termin", LEX).map((s) => s.l.de)).toEqual(["Termin", "Terminkalender"]);
    expect(sozlukAra("der Termin", LEX)[0]!.l.de).toBe("Termin");
    expect(sozlukAra("Termine", LEX)[0]!.l.de).toBe("Termin");
    expect(sozlukAra("geht", LEX)[0]!.l.de).toBe("gehen");
  });
  it("ümlautsuz ve ae/ue yazımı", () => {
    expect(sozlukAra("Schluessel", LEX)[0]!.l.de).toBe("Schlüssel");
    expect(sozlukAra("muede", LEX)[0]!.l.de).toBe("müde");
    expect(sozlukAra("Schlussel", LEX)[0]!.l.de).toBe("Schlüssel");
    expect(sozlukAra("mude", LEX)[0]!.l.de).toBe("müde");
    expect(sozlukAra("arztin", LEX)[0]!.l.de).toBe("Ärztin");
  });
  it("Türkçe anlamın içindeki parça Almanca eşleşmenin önüne geçmez; tam eşleşme yoksa ekleme önerilir", () => {
    const L2 = [...LEX, L({ id: "g", de: "Bargeld", tr: "nakit", pos: "noun", art: "das" }), L({ id: "h", de: "Herzlich willkommen", tr: "hoş geldiniz", pos: "phrase" })];
    expect(sozlukAra("geld", L2)[0]!.l.de).toBe("Bargeld");
    expect(tamVar(sozlukAra("Bahn", [...LEX, L({ id: "i", de: "Bahnhof", tr: "istasyon", pos: "noun", art: "der" })]))).toBe(false);
    expect(tamVar(sozlukAra("Termin", LEX))).toBe(true);
  });
  it("Türkçe: anlamın parçası, Türkçe klavyesiz", () => {
    expect(sozlukAra("randevu", LEX)[0]!.l.de).toBe("Termin");
    expect(sozlukAra("hekim", LEX)[0]!.l.de).toBe("Ärztin");
    expect(sozlukAra("kadin doktor", LEX)[0]!.l.de).toBe("Ärztin");
    expect(sozlukAra("YORGUN", LEX)[0]!.l.de).toBe("müde");
  });
  it("kısa ve bulunmayan sorgu", () => {
    expect(sozlukAra("t", LEX)).toEqual([]);
    expect(sozlukAra("Quatschkopf", LEX)).toEqual([]);
  });
  it("Bahçe anahtarı artikel ve yazım farkını yok sayar", () => {
    expect(kisiselAnahtar("der Schlüssel")).toBe(kisiselAnahtar("Schluessel"));
  });
});
