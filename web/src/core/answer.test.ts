import { describe, expect, it } from "vitest";
import { esdegerBicim, expandTaught, hitapsiz, isSameAsGiven, REGISTER_HINT, ruleVerdict } from "./answer.ts";

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

describe("inceleme #49 3. tur: 'sie' tek başına dolgu değil", () => {
  it("'Entschuldigen Sie, wie bitte?' kabul; 'Sie ich habe Zeit' kabul değil", () => {
    expect(ruleVerdict(["Wie bitte?"], "Entschuldigen Sie, wie bitte?").kind).toBe("correct");
    expect(ruleVerdict(["Ich habe Zeit."], "Sie ich habe Zeit.").kind).not.toBe("correct");
  });
});

describe("PM-101 md. 6 (İÇ-6 7089902512): üç eşdeğerlik", () => {
  it("baştaki selam ve hitap dolgu", () => {
    expect(ruleVerdict(["Ich habe einen Termin."], "Guten Tag, Frau Brandl, ich habe einen Termin.").kind).toBe("correct");
    expect(ruleVerdict(["Ich habe einen Termin."], "Guten Tag Frau Brandl ich habe einen Termin").kind).toBe("correct");
    expect(ruleVerdict(["Ich habe einen Termin."], "Frau Brandl, ich habe einen Termin.").kind).toBe("correct");
    expect(ruleVerdict(["Ich habe einen Termin."], "Guten Morgen, ich habe einen Termin.").kind).toBe("correct");
    expect(ruleVerdict(["Hast du Zeit?"], "Hallo Tobi, hast du Zeit?").kind).toBe("correct");
    expect(ruleVerdict(["Ich habe einen Termin."], "Grüß Gott, Herr Dr. Weber, ich habe einen Termin.").kind).toBe("correct");
    // selam + nezaket dolgusu birlikte
    expect(ruleVerdict(["Ich brauche einen Termin."], "Guten Tag, Frau Brandl, ich brauche bitte einen Termin.").kind).not.toBe("correct");
    expect(ruleVerdict(["Ich brauche einen Termin."], "Guten Tag, Frau Brandl, ich brauche einen Termin, bitte.").kind).toBe("correct");
  });
  it("selam ve hitap anlamı taşımaz: yanlış içerik yine yanlış", () => {
    expect(ruleVerdict(["Ich habe einen Termin."], "Guten Tag, Frau Brandl, ich habe keinen Termin.").kind).not.toBe("correct");
    expect(ruleVerdict(["Ich habe einen Termin."], "Guten Tag, Frau Brandl.").kind).not.toBe("correct");
    // virgülsüz, selamsız "Frau X" cümlenin öznesidir, hitap değil
    expect(ruleVerdict(["Ist nicht da."], "Frau Brandl ist nicht da.").kind).not.toBe("correct");
    // selamın kendisi istenen cevapsa başka selam doğru olmaz
    expect(ruleVerdict(["Guten Abend."], "Guten Tag.").kind).not.toBe("correct");
  });
  it("'um drei' = 'um drei Uhr' (iki yönde, rakam ve dakika dahil)", () => {
    expect(ruleVerdict(["Um drei Uhr."], "Um drei.").kind).toBe("correct");
    expect(ruleVerdict(["Um drei."], "Um drei Uhr.").kind).toBe("correct");
    expect(ruleVerdict(["Ich komme um drei Uhr."], "Ich komme um 3.").kind).toBe("correct");
    expect(ruleVerdict(["Der Termin ist um 15.30 Uhr."], "Der Termin ist um 15.30.").kind).toBe("correct");
    expect(ruleVerdict(["Um acht Uhr dreißig."], "Um acht dreißig.").kind).toBe("correct");
    expect(ruleVerdict(["Um ein Uhr."], "Um eins.").kind).toBe("correct");
    expect(ruleVerdict(["Um drei Uhr."], "Um vier.").kind).not.toBe("correct");
    expect(ruleVerdict(["Um drei Uhr."], "Um vier Uhr.").kind).not.toBe("correct");
  });
  it("'Dr.' = 'Doktor'", () => {
    expect(ruleVerdict(["Ich möchte zu Dr. Weber."], "Ich möchte zu Doktor Weber.").kind).toBe("correct");
    expect(ruleVerdict(["Ich möchte zu Doktor Weber."], "Ich möchte zu Dr Weber.").kind).toBe("correct");
    expect(ruleVerdict(["Ich möchte zu Dr. Weber."], "Ich möchte zu Doktor Huber.").kind).not.toBe("correct");
  });
  it("doğru cevapta ekranda özgün kabul biçimi kalır", () => {
    const v = ruleVerdict(["Um drei Uhr bei Dr. Weber."], "um drei bei Doktor Weber");
    expect(v.kind).toBe("correct");
    expect(v.best).toBe("Um drei Uhr bei Dr. Weber.");
  });
  it("siki (dikte): eşdeğerlik uygulanmaz", () => {
    expect(ruleVerdict(["Um drei Uhr."], "Um drei.", { siki: true }).kind).not.toBe("correct");
    expect(ruleVerdict(["Ich habe einen Termin."], "Guten Tag, ich habe einen Termin.", { siki: true }).kind).not.toBe("correct");
  });
  it("esdegerBicim ve hitapsiz", () => {
    expect(esdegerBicim("um drei Uhr bei Dr. Weber")).toBe("um drei bei Doktor Weber");
    expect(esdegerBicim("Die Uhr ist kaputt.")).toBe("Die Uhr ist kaputt.");
    expect(esdegerBicim("drei Uhr")).toBe("drei Uhr");
    expect(hitapsiz("Guten Tag, Frau Brandl, ich komme.")).toEqual(["Frau Brandl, ich komme.", "ich komme."]);
    expect(hitapsiz("Frau Brandl ist da.")).toEqual([]);
    expect(hitapsiz("Hallo!")).toEqual([]);
  });
});
