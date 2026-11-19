import { describe, it, expect } from "vitest";
import { verdict, countsAsCorrect } from "./answer.ts";

// İnceleme #43 P0-2 / D-097: yapay zekâsız "kontrol edilemedi" başarı sayılmaz; öğrenci kendisi karar verir
describe("yapay zekâsız değerlendirme (D-097)", () => {
  const acc = ["Ich möchte einen Termin machen."];
  it("tam eşleşme yapay zekâsız da doğru", async () => {
    expect((await verdict(acc, "Ich möchte einen Termin machen", "randevu iste")).kind).toBe("correct");
  });
  it("kuralların tanımadığı yakın cevap tam olarak 'unchecked' olur", async () => {
    expect((await verdict(acc, "Ich möchte einen neuen Termin machen", "randevu iste")).kind).toBe("unchecked");
  });
  it("yapay zekâ hata verirse de 'unchecked'", async () => {
    expect((await verdict(acc, "Ich möchte einen neuen Termin machen", "randevu iste", async () => { throw { message_tr: "kota" }; })).kind).toBe("unchecked");
  });
  it("'unchecked' kendiliğinden doğru sayılmaz; öğrenci 'aynı anlamda' derse sayılır", () => {
    expect(countsAsCorrect("unchecked", false)).toBe(false);
    expect(countsAsCorrect("unchecked", true)).toBe(true);
    expect(countsAsCorrect("wrong", false)).toBe(false);
    expect(countsAsCorrect("correct", false)).toBe(true);
  });
});
