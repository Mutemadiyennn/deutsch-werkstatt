import { describe, expect, it } from "vitest";
import { kalipIcinde, yerelAcikla } from "./sozluk.ts";

const L = (x: Record<string, unknown>) => ({ collocations: [], patterns: [], register: "neutral", related: [], mistakes_tr: [], examples: [], domains: [], legacy: [], ...x }) as never;
const LEX = [
  L({ id: "termin", de: "Termin", tr: "randevu", pos: "noun", art: "der", pl: "Termine", collocations: [{ de: "einen Termin machen", tr: "randevu almak" }], examples: [{ de: "Ich habe morgen einen Termin.", tr: "Yarın randevum var." }] }),
  L({ id: "haben", de: "haben", tr: "sahip olmak", pos: "verb", verb: { praesens3: "hat" } }),
  L({ id: "morgen", de: "morgen", tr: "yarın", pos: "adv" }),
  L({ id: "gott", de: "Gott", tr: "Tanrı", pos: "noun", art: "der", collocations: [{ de: "Grüß Gott!", tr: "Merhaba! (Bavyera'da selam)" }, { de: "auf … warten", tr: "beklemek" }] }),
  L({ id: "praxis", de: "Praxis", tr: "muayenehane", pos: "noun", art: "die" }),
  L({ id: "warten", de: "warten", tr: "beklemek", pos: "verb" }),
  L({ id: "aufauf", de: "auf, an", tr: "üstüne", pos: "prep" }),
  L({ id: "wiederholen", de: "wiederholen", tr: "tekrarlamak", pos: "verb", head: { de: "Können Sie das wiederholen?", tr: "Tekrar edebilir misiniz?" } })
];

describe("yerel sözlük (#58 A11)", () => {
  it("bütün ifade: eşdizim, örnek, başlık ifadesi", () => {
    expect(yerelAcikla("einen Termin machen", LEX)).toMatchObject({ kaynak: "ifade", tr: "randevu almak", kart: "Termin" });
    expect(yerelAcikla("„Ich habe morgen einen Termin.“", LEX)).toMatchObject({ kaynak: "ifade", tr: "Yarın randevum var." });
    expect(yerelAcikla("Können Sie das wiederholen", LEX)).toMatchObject({ kaynak: "ifade", tr: "Tekrar edebilir misiniz?" });
  });
  it("tek kelime: çekimli biçimden kart", () => {
    expect(yerelAcikla("Termine", LEX)).toMatchObject({ kaynak: "kelime", de: "Termin", art: "der", tr: "randevu" });
    expect(yerelAcikla("hat,", LEX)).toMatchObject({ kaynak: "kelime", de: "haben" });
    expect(yerelAcikla("Fahrrad", LEX)).toBeNull();
  });
  it("cümle: kelime kelime, aynı kart bir kez", () => {
    const a = yerelAcikla("Er hat morgen keinen Termin, er hat Zeit.", LEX)!;
    expect(a.kaynak).toBe("kelimeler");
    expect(a.kelimeler!.map((k) => k.de)).toEqual(["haben", "morgen", "Termin"]);
  });
  it("cümlede kalıp bütün açıklanır: 'grüß Gott' = Merhaba!, 'Gott' = Tanrı değil (PM finali #218)", () => {
    const a = yerelAcikla("Praxis Dr. Weber, Huber, grüß Gott?", LEX)!;
    expect(a.kaynak).toBe("kelimeler");
    expect(a.kelimeler!.map((k) => k.de)).toEqual(["Praxis", "Grüß Gott!"]);
    expect(a.kelimeler![1]).toMatchObject({ ifade: true, tr: "Merhaba! (Bavyera'da selam)", w: "grüß Gott" });
    expect(a.kelimeler!.some((k) => k.tr === "Tanrı")).toBe(false);
    // kalıp dışında "Gott" yine kelime
    expect(yerelAcikla("Gott ist groß", LEX)!.kelimeler!.map((k) => k.de)).toEqual(["Gott"]);
    // "…" yuvalı kalıp ve "a, b" biçimli kart cümlede kalıp sayılmaz
    expect(yerelAcikla("Ich muss auf warten", LEX)!.kelimeler!.some((k) => k.ifade)).toBe(false);
  });
  it("uzun basılan sözcük kalıbın parçasıysa kalıp açıklanır", () => {
    expect(kalipIcinde("Gott", "Praxis Dr. Weber, Huber, grüß Gott?", LEX)).toMatchObject({ kaynak: "ifade", de: "Grüß Gott!" });
    expect(kalipIcinde("Praxis", "Praxis Dr. Weber, Huber, grüß Gott?", LEX)).toBeNull();
  });
});
