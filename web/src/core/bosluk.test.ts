import { describe, expect, it } from "vitest";
import { boslukSecimi, cevapGosterildi, gosterilenCogul, gorulenKelimeler, ogretilmisForm, tanitildi } from "./garden.ts";
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
  it("Perfekt ortacı ve Präteritum kartta gösterilmedikçe sorulmaz (inceleme #122 P0-1)", () => {
    const fiil = kart({ id: "lx:gehen", de: "gehen", art: undefined, pos: "verb" });
    expect(cevapGosterildi(fiil, "gegangen")).toBe(false);
    expect(cevapGosterildi(fiil, "ging")).toBe(false);
    expect(cevapGosterildi(fiil, "gehen")).toBe(true);
    // kendi kartın hâl biçimi (dişil isimde "der") gösterilmedi
    expect(cevapGosterildi(kart({ id: "lx:Woche", de: "Woche", art: "die" }), "der")).toBe(false);
  });
  it("çoğul yalnızca kartta gösteriliyorsa sayılır; '-' çoğul değildir (inceleme #122 2. tur)", () => {
    const tag = kart({ id: "lx:Tag", de: "Tag", pl: "Tage" });
    expect(gosterilenCogul(tag)).toBe("Tage");
    expect(cevapGosterildi(tag, "Tage")).toBe(true);
    expect(gosterilenCogul(kart({ pl: "-" }))).toBeUndefined();
    expect(cevapGosterildi(kart({ pl: "-" }), "-")).toBe(false);
  });
  it("boslukSecimi: sorulabilir biçim varsa o, yoksa Türkçeden Almancaya; sorulabilir sayısı", () => {
    expect(boslukSecimi(l, "gap", 0, new Set())).toEqual({ tip: "gap", fi: 2, sorulabilir: 2 });
    expect(boslukSecimi(kart({ forms: [{ de: "___ Mittwoch", answer: "Ab" }] }), "gap", 0, new Set()).tip).toBe("tr_de");
    expect(boslukSecimi(l, "listen_meaning", 3, new Set())).toEqual({ tip: "listen_meaning", fi: 3, sorulabilir: 0 });
  });
  it("tanıtılmış kart: Bahçe kaydı ya da doğru cevap; tespitte yalnızca yanlış görülen sayılmaz (P1-2)", () => {
    const bos = { n: 0, ok: 0, s: 0 };
    expect(tanitildi({ itemId: "x", passive: { ...bos, n: 1 }, active: { ...bos }, gaps: [] } as never)).toBe(false);
    expect(tanitildi({ itemId: "x", passive: { ...bos, n: 1, ok: 1 }, active: { ...bos }, gaps: [] } as never)).toBe(true);
    expect(tanitildi({ itemId: "x", passive: { ...bos, fsrs: { stability: 1 } }, active: { ...bos }, gaps: [] } as never)).toBe(true);
  });
  it("görülen kelimeler: tanıtılmış kartların başlıkları (artikel dahil)", () => {
    const g = gorulenKelimeler(new Map([["lx:Woche", kart({ id: "lx:Woche", de: "Woche", art: "die" })]]), ["lx:Woche", "yok"]);
    // başka kartın artikeli görülmüş sayılmaz (hâl boşluğu açılmaz; inceleme #122 P1-1)
    expect([...g].sort()).toEqual(["woche"]);
  });
});
