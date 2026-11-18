import { describe, expect, it } from "vitest";
import { expandTaught, isSameAsGiven, REGISTER_HINT, ruleVerdict } from "./answer.ts";

describe("PM-032 §4: doğru cevabın reddi 0", () => {
  const chunks = [{ layers: { hd: "In Ordnung, vielen Dank.", alltag: "In Ordnung, danke." } }, { layers: { hd: "Geht es auch früher?", alltag: "Geht's auch früher?" } }];
  it("öğretilmiş Hochdeutsch/Alltag eşdeğeri otomatik kabul", () => {
    const acc = expandTaught(["In Ordnung, danke."], chunks);
    expect(ruleVerdict(acc, "In Ordnung, vielen Dank.").kind).toBe("correct");
    expect(ruleVerdict(expandTaught(["Geht es auch früher?"], chunks), "Geht's auch früher?").kind).toBe("correct");
  });
  it("uzun ama doğru: beklenen cevap + nezaket kelimeleri", () => {
    expect(ruleVerdict(["Ja, passt."], "Ja, passt, vielen Dank.").kind).toBe("correct");
    expect(ruleVerdict(["Um halb zehn."], "Um halb zehn, bitte.").kind).toBe("correct");
  });
  it("yanlış cevap doğru sayılmaz (iki yönde doğruluk, PM-008 §9)", () => {
    expect(ruleVerdict(["Ja, passt."], "Nein, passt nicht.").kind).not.toBe("correct");
    expect(ruleVerdict(["Um halb zehn."], "Um halb elf, bitte.").kind).not.toBe("correct");
  });
});

describe("inceleme #49 P1-1: yanlış kabul açıkları", () => {
  const chunks = [{ layers: { hd: "In Ordnung, vielen Dank.", alltag: "Geht klar, danke." } }, { layers: { hd: "Auf Wiederhören", alltag: "Wiederhören" } }];
  it("genişletme kelime sınırına saygılı, anlamsız varyant üretmez", () => {
    const acc = expandTaught(["Auf Wiederhören!"], chunks);
    expect(acc.some((a) => /auf auf/i.test(a))).toBe(false);
  });
  it("anlamı kaydıran dolgu kabul edilmez", () => {
    expect(ruleVerdict(["Nein."], "Ja, nein.").kind).not.toBe("correct");
    expect(ruleVerdict(["Noch nicht."], "Noch nicht gut.").kind).not.toBe("correct");
    expect(ruleVerdict(["Es geht."], "Es geht gut.").kind).not.toBe("correct");
    expect(ruleVerdict(["Ja, passt."], "Ja, passt, vielen Dank.").kind).toBe("correct");
    expect(ruleVerdict(["Am Dienstag."], "Also, am Dienstag, bitte.").kind).toBe("correct");
  });
  it("dönüşümde verilen cümlenin tekrarı aynı sayılır (oynatıcı yanlış verir)", () => {
    expect(isSameAsGiven("In Ordnung, vielen Dank.", "in ordnung vielen dank")).toBe(true);
    expect(isSameAsGiven("In Ordnung, vielen Dank.", "Geht klar, danke.")).toBe(false);
  });
  it("kayıt ipucu tanınır", () => {
    for (const t of ["Gündelik biçimde söyle: Biraz daha yavaş.", "Gündelik (Alltag) biçimde söyle.", "(şefe, Sie ile) Teşekkürler"]) expect(REGISTER_HINT.test(t)).toBe(true);
    expect(REGISTER_HINT.test("Randevu iste.")).toBe(false);
  });
});

describe("inceleme #49 ikinci tur (P1-5): doğru cevap reddi yok", () => {
  it("'danke schön', 'Nein, noch nicht', 'Entschuldigung, wie bitte?' kabul", () => {
    expect(ruleVerdict(["Vielen Dank."], "Vielen Dank, danke schön.").kind).toBe("correct");
    expect(ruleVerdict(["Noch nicht."], "Nein, noch nicht.").kind).toBe("correct");
    expect(ruleVerdict(["Wie bitte?"], "Entschuldigung, wie bitte?").kind).toBe("correct");
  });
  it("kayıt ipucu yalnızca açık biçim isteğinde", () => {
    for (const t of ["Arkadaşına kibarca söyle.", "Lehçeyi anlamadığını söyle."]) expect(REGISTER_HINT.test(t)).toBe(false);
    expect(REGISTER_HINT.test("Gündelik biçimde söyle.")).toBe(true);
  });
});
