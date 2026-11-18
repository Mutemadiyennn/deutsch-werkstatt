import { describe, expect, it } from "vitest";
import { expandTaught, ruleVerdict } from "./answer.ts";

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
