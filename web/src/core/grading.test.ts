import { describe, it, expect } from "vitest";
import { norm, core, judge, judgeWord, scoreHeard, numWord, numberWordHint } from "./grading.ts";
import { ttsClean, splitForSpeech } from "./ttsClean.ts";

describe("cevap değerlendirme (v1 kuJudge eşdeğeri)", () => {
  it("noktalama, büyük harf, ümlaut yazımı ve ß farkı yok sayılır", () => {
    expect(norm("Wie geht's Ihnen?")).toBe("wie gehts ihnen");
    expect(norm("Grüße")).toBe(norm("Gruesse"));
    expect(norm("Straße")).toBe(norm("Strasse"));
  });
  it("rakamlar yazıyla eşlenir", () => {
    expect(norm("um 9 Uhr")).toBe("um neun uhr");
    expect(numWord(21)).toBe("einundzwanzig");
  });
  it("baştaki ünlem cevabın özünü değiştirmez", () => {
    expect(core("Ach so, ich verstehe")).toBe(core("ich verstehe"));
    expect(judge(["Ich verstehe."], ["Oh, ich verstehe"]).ok).toBe(true);
  });
  it("alternatif doğru cevaplar kabul edilir", () => {
    expect(judge(["Wie geht es Ihnen?", "Wie geht's Ihnen?"], ["wie gehts ihnen"]).ok).toBe(true);
  });
  it("yanlış cevapta en yakın varyant kelime kelime işaretlenir", () => {
    const j = judge(["Ich habe Kopfschmerzen."], ["Ich hab Kopfschmerz"]);
    expect(j.ok).toBe(false);
    expect(j.words?.map((w) => w.st)).toEqual(["ok", "near", "near"]); // "hab"≈"habe", "Kopfschmerz"≈"Kopfschmerzen" (v1 toleransı)
  });
  it("konuşma tanımanın küçük hatası 'yakın' sayılır", () => {
    const s = scoreHeard("Könnten Sie das bitte wiederholen", "könnten sie das bitte wieder holen");
    expect(s.score).toBeGreaterThanOrEqual(0.8);
  });
  it("aktif kelimede artikel zorunlu ve Türkçe açıklama verir", () => {
    expect(judgeWord("der Termin", "Termin", "der").ok).toBe(true);
    expect(judgeWord("Termin", "Termin", "der").why_tr).toContain("artikel eksik");
    expect(judgeWord("die Termin", "Termin", "der").why_tr).toContain("artikel yanlış");
    expect(judgeWord("anrufen", "anrufen").ok).toBe(true);
    expect(judgeWord("anrufe", "anrufen").ok).toBe(false);
  });
});

describe("seslendirme filtresi (v1 + bitişik tire düzeltmesi)", () => {
  it("işaretler okunmaz", () => {
    expect(ttsClean("Ich arbeite - Ben çalışıyorum.")).toBe("Ich arbeite, Ben çalışıyorum.");
    expect(ttsClean("der/die/das")).toBe("der, die, das");
    expect(ttsClean("(siz) 'Sie' = you")).toBe("siz Sie you");
    expect(ttsClean("Wo? – Hier.")).toBe("Wo?, Hier.".replace("?,", "?"));
    expect(ttsClean("...")).toBe("");
    expect(ttsClean(" - ")).toBe("");
    expect(ttsClean("heißen → heiße")).toBe("heißen, heiße");
  });
  it("kelimeye bitişik tire okunmaz (v1'de okunuyordu)", () => {
    expect(ttsClean("-ebilmek")).toBe("ebilmek");
    expect(ttsClean("yönelme hâli -e eki")).toBe("yönelme hâli e eki");
    expect(ttsClean("Kinder- und Jugendarzt")).toBe("Kinder und Jugendarzt");
    expect(ttsClean("E-Mail")).toBe("E-Mail");
  });
  it("karışık Türkçe/Almanca satır bölünür", () => {
    expect(splitForSpeech("Ich arbeite - Ben çalışıyorum", "tr")).toEqual([
      { text: "Ich arbeite", lang: "de" },
      { text: "Ben çalışıyorum", lang: "tr" }
    ]);
  });
});

describe("strictNumberWords (PM-045 §4.2)", () => {
  it("rakam varsa kelimeyle yazma ipucu, yoksa null", () => {
    expect(numberWordHint("34")).toBe("Rakamla değil, kelimeyle yaz: vierunddreißig");
    expect(numberWordHint("Er ist 7 Jahre alt")).toBe("Rakamla değil, kelimeyle yaz: sieben");
    expect(numberWordHint("Es ist 1 Uhr")).toBe("Rakamla değil, kelimeyle yaz.");
    expect(numberWordHint("Am 3. Mai")).toBe("Rakamla değil, kelimeyle yaz.");
    expect(numberWordHint("um 14:30")).toBe("Rakamla değil, kelimeyle yaz.");
    expect(numberWordHint("vierunddreißig")).toBeNull();
  });
});
