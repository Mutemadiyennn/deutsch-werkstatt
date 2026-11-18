import { describe, it, expect } from "vitest";
import { verdict } from "./answer.ts";

// İnceleme #43 P0-2: yapay zekâsız "kontrol edilmedi" sonucu başarı sayılmaz; öğrenci kendisi karar verir
describe("yapay zekâsız değerlendirme (D-097)", () => {
  const acc = ["Ich möchte einen Termin machen."];
  it("tam eşleşme yapay zekâsız da doğru", async () => {
    expect((await verdict(acc, "Ich möchte einen Termin machen", "randevu iste")).kind).toBe("correct");
  });
  it("kuralların tanımadığı yakın cevap 'unchecked' olur, 'correct' değil", async () => {
    for (const a of ["Ich möchte keinen Termin machen", "Ich haben Termin machen"]) {
      const v = await verdict(acc, a, "randevu iste");
      expect(v.kind).not.toBe("correct");
    }
  });
  it("yapay zekâ hata verirse de 'unchecked' (yanlış kabul yok)", async () => {
    const v = await verdict(acc, "Ich möchte keinen Termin machen", "randevu iste", async () => { throw { message_tr: "kota" }; });
    expect(["unchecked", "wrong"]).toContain(v.kind);
  });
});
