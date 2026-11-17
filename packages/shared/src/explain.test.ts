import { describe, expect, it } from "vitest";
import { explanationIssues, textIssues } from "./explain.ts";

describe("OD-9 açıklama standardı (PM-017)", () => {
  it("proje sahibinin anlamadığı örnek reddedilir: =, ;, …, tırnak", () => {
    const bad = "Görüşmenin ilk cümlesi. 'gern' kibarlaştırır. Gündelikte 'Ich bräuchte mal …' çok sık; 'mal' isteği yumuşatır, 'nen' = einen.";
    const x = textIssues(bad);
    expect(x).toContain("'=' işareti");
    expect(x).toContain("';' işareti");
    expect(x).toContain("'…' işareti");
    expect(x.some((i) => i.startsWith("tırnak"))).toBe(true);
  });
  it("OD-9.1 örneğinin doğrusu geçer", () => {
    expect(explanationIssues({
      anlam_tr: "Bir randevu alabilir miyim?",
      ne_zaman_tr: "Telefonda, rahat konuşurken çok duyarsın.",
      parcalar: [{ de: "Ich", tr: "ben" }, { de: "bräuchte", tr: "ihtiyacım olurdu" }, { de: "mal", tr: "bir (isteği yumuşatır)" }, { de: "'nen", tr: "bir" }, { de: "Termin", tr: "randevu" }],
      ipucu_tr: "**Einen** konuşmada kısalıp **'nen** olur."
    })).toEqual([]);
  });
  it("uzunluk: cümle ≤14, ne zaman ≤12, parça ≤3 kelime, anlam tek cümle", () => {
    expect(textIssues("bir iki üç dört beş altı yedi sekiz dokuz on on bir on iki on üç").some((x) => x.includes("kelime"))).toBe(true);
    const e = explanationIssues({ anlam_tr: "Bir. İki.", ne_zaman_tr: "a b c d e f g h i j k l m", parcalar: [{ de: "eins zwei drei vier", tr: "x" }], ipucu_tr: undefined });
    expect(e.some((x) => x.startsWith("anlam_tr: tek cümle"))).toBe(true);
    expect(e.some((x) => x.startsWith("ne_zaman_tr: cümle 13"))).toBe(true);
    expect(e.some((x) => x.startsWith("parcalar[0].de 4 kelime"))).toBe(true);
  });
  it("öğretilmemiş terim hata; requires ile serbest", () => {
    expect(textIssues("Burada Dativ kullanılır.")).toContain("öğretilmemiş terim: dativ");
    expect(textIssues("Burada -e hâli (Dativ) kullanılır.", { requires: ["gr:dativ"] })).toEqual([]);
    expect(textIssues("Fiilin özne ile uyumu.")).toContain("öğretilmemiş terim: özne");
  });
  it("kesme işareti kelime içinde tırnak sayılmaz; Almanca kalın işaretle yazılır", () => {
    expect(textIssues("Almanya'da çok duyarsın.")).toEqual([]);
    expect(textIssues("Konuşmada **gibt's** derler.")).toEqual([]);
    expect(textIssues("Konuşmada 'nen derler.").some((x) => x.startsWith("tırnak"))).toBe(true);
  });
});
