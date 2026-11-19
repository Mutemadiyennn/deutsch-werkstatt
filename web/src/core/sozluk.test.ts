import { describe, expect, it } from "vitest";
import { yerelAcikla } from "./sozluk.ts";

const L = (x: Record<string, unknown>) => ({ collocations: [], patterns: [], register: "neutral", related: [], mistakes_tr: [], examples: [], domains: [], legacy: [], ...x }) as never;
const LEX = [
  L({ id: "termin", de: "Termin", tr: "randevu", pos: "noun", art: "der", pl: "Termine", collocations: [{ de: "einen Termin machen", tr: "randevu almak" }], examples: [{ de: "Ich habe morgen einen Termin.", tr: "Yarın randevum var." }] }),
  L({ id: "haben", de: "haben", tr: "sahip olmak", pos: "verb", verb: { praesens3: "hat" } }),
  L({ id: "morgen", de: "morgen", tr: "yarın", pos: "adv" }),
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
});
