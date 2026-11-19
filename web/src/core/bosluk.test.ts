import { describe, expect, it } from "vitest";
import { cevapGosterildi, gorulenKelimeler, ogretilmisForm } from "./garden.ts";
import type { Lexeme } from "@dw/shared";

const kart = (o: Partial<Lexeme>): Lexeme => ({ id: "lx:Mittwoch", de: "Mittwoch", art: "der", pos: "noun", tr: "çarşamba", examples: [], collocations: [], forms: [], ...o } as unknown as Lexeme);

describe("PM-069 P0: öğretilmeden boşluk sorulmaz", () => {
  const l = kart({
    collocations: [{ de: "am Mittwoch", tr: "çarşamba günü" }],
    forms: [
      { de: "___ Mittwoch habe ich Urlaub.", answer: "Ab" },            // gösterilmedi
      { de: "Ich arbeite ___ Montag.", answer: "jeden" },              // gösterilmedi
      { de: "___ Mittwoch rufe ich an.", answer: "Am" },               // eşdizimde var
      { de: "Am ___ rufe ich an.", answer: "Mittwoch" }                // kartın kendi kelimesi
    ]
  });
  it("cevap kartın kelimesi, eşdizimi ya da tanıtılmış kartın kelimesiyse gösterilmiş sayılır", () => {
    expect(cevapGosterildi(l, "Mittwoch")).toBe(true);
    expect(cevapGosterildi(l, "Am")).toBe(true);
    expect(cevapGosterildi(l, "Ab")).toBe(false);
    expect(cevapGosterildi(l, "jeden", new Set(["jeden"]))).toBe(true);
  });
  it("sorulabilir ilk biçim seçilir; hiçbiri yoksa null (soru türü değişir)", () => {
    expect(ogretilmisForm(l, "gap", 0)).toBe(2);
    expect(ogretilmisForm(l, "gap", 3)).toBe(3);
    expect(ogretilmisForm(kart({ forms: [{ de: "___ Mittwoch", answer: "Ab" }] }), "gap", 0)).toBeNull();
  });
  it("görülen kelimeler: tanıtılmış kartların başlıkları (artikel dahil)", () => {
    const g = gorulenKelimeler(new Map([["lx:Woche", kart({ id: "lx:Woche", de: "Woche", art: "die" })]]), ["lx:Woche", "yok"]);
    expect([...g].sort()).toEqual(["die", "woche"]);
  });
});
