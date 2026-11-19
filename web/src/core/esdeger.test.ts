import { describe, expect, it } from "vitest";
import { esNorm, harfler, heceEsit, rakamEsit, umlautTamamla, v2Sira, yazimNotu } from "./esdeger.ts";
import { ruleVerdict } from "./answer.ts";
import { drillVerdict } from "../ui/drill.tsx";
import { bilinenKelimeler, bilinenMi } from "./persona.ts";

describe("saat, tarih, sıra sayısı (esNorm)", () => {
  it("rakamlı ve yazılı saat aynı", () => {
    const h = esNorm("Es ist neun Uhr dreißig.");
    for (const x of ["Es ist 9:30.", "Es ist 9:30 Uhr.", "Es ist 09:30", "Es ist 9.30 Uhr", "Es ist halb zehn.", "Es ist 9 Uhr 30."]) expect(esNorm(x), x).toBe(h);
    expect(esNorm("Es ist 9:00.")).toBe(esNorm("Es ist neun Uhr."));
    expect(esNorm("Um Viertel nach neun.")).toBe(esNorm("Um 9:15."));
    expect(esNorm("Um Viertel vor zehn.")).toBe(esNorm("Um 9:45 Uhr."));
    expect(esNorm("Um zehn nach acht.")).toBe(esNorm("Um 8:10."));
    expect(esNorm("Um fünf vor zwölf.")).toBe(esNorm("Um 11:55."));
    expect(esNorm("Um halb eins.")).toBe(esNorm("Um 12:30."));
  });
  it("farklı saat farklı kalır", () => {
    expect(esNorm("Es ist halb zehn.")).not.toBe(esNorm("Es ist 10:30."));
    expect(esNorm("Um Viertel nach neun.")).not.toBe(esNorm("Um 9:45."));
  });
  it("tarih ve sıra sayısı", () => {
    const h = esNorm("Am dritten Mai.");
    for (const x of ["Am 3. Mai.", "Am 3.5.", "Am 03.05.", "am 3. mai"]) expect(esNorm(x), x).toBe(h);
    expect(esNorm("Heute ist der 1.")).toBe(esNorm("Heute ist der erste."));
    expect(esNorm("Im 2. Stock.")).toBe(esNorm("Im zweiten Stock."));
    expect(esNorm("Am 4. Mai.")).not.toBe(h);
    // sıradan sayı ve cümle sonu noktası sıra sayısı değildir
    expect(esNorm("Ich bin 30.")).toBe(esNorm("Ich bin dreißig."));
    // "9.30" tek başına saat sayılmaz (fiyat/tarih olabilir)
    expect(esNorm("9.30 Euro")).not.toBe(esNorm("neun Uhr dreißig Euro"));
    expect(esNorm("Zwo")).toBe(esNorm("zwei"));
  });
});

describe("rakam dizisi (telefon)", () => {
  const n = "Meine Nummer ist 0171 39200 47.";
  it("rakamla, tek tek ya da gruplu sayı kelimesiyle", () => {
    for (const x of ["Meine Nummer ist null eins sieben eins drei neun zwo null null vier sieben", "Meine Nummer ist 01713920047", "Meine Nummer ist null hunderteinundsiebzig, neununddreißig zweihundert, siebenundvierzig.", "meine nummer ist 0171 392 00 47"]) expect(rakamEsit(n, x), x).toBe(true);
  });
  it("tek rakam yanlışsa ya da kelime farklıysa değil", () => {
    expect(rakamEsit(n, "Meine Nummer ist 0171 39200 48")).toBe(false);
    expect(rakamEsit(n, "Seine Nummer ist 0171 39200 47")).toBe(false);
    expect(rakamEsit("Ich bin einundzwanzig.", "Ich bin zwei eins.")).toBe(false); // 5 rakamdan kısa: kural uygulanmaz
  });
  it("ruleVerdict: tek kabul biçimi yeter", () => {
    expect(ruleVerdict([n], "Meine Nummer ist null eins sieben eins, drei neun zwo null null, siebenundvierzig.").kind).toBe("correct");
  });
});

describe("harf harf söyleme yuvaları", () => {
  const k = ["M wie Martha, Ü wie Übermut, L wie Ludwig, L wie Ludwig, E wie Emil, R wie Richard", "M, Ü, L, L, E, R"];
  it("biçimler serbestçe karışır", () => {
    for (const x of ["M wie München, Umlaut Unna, Doppel-L, E wie Emil, R", "Martha, Übermut, Ludwig, Ludwig, Essen, Rostock", "em, ü, el, el, e, er", "M Ü Doppel L wie Leipzig E R", "m wie martha ü wie übermut l l e r"]) expect(heceEsit(k, x), x).toBe(true);
  });
  it("yanlış harf ya da yanlış kodlama sözcüğü kabul edilmez", () => {
    expect(heceEsit(k, "M, U, L, L, E, R")).toBe(false);
    expect(heceEsit(k, "M wie Berta, Ü, L, L, E, R")).toBe(false);
    expect(heceEsit(k, "M, Ü, L, E, R")).toBe(false);
    expect(heceEsit(k, "Müller")).toBe(false);
  });
  it("tabloda olmayan ama aynı harfle başlayan sözcük anlaşılır", () => {
    expect(heceEsit(["K, R, A, U, S"], "K wie Kaiser, R wie Rom, A, U, S")).toBe(true);
    expect(harfler("Sch wie Schule")).toEqual(["s", "c", "h"]);
  });
  it("harf yuvası olmayan maddede devre dışı", () => {
    expect(heceEsit(["Ich heiße Anna."], "A, N, N, A")).toBe(false);
  });
});

describe("kelime sırası (V2)", () => {
  const k = ["Ich gehe morgen ins Kino."];
  it("başa alınan öğe + fiil ikinci yerde → doğru", () => {
    for (const x of ["Morgen gehe ich ins Kino.", "Ins Kino gehe ich morgen."]) expect(v2Sira(k, x)?.kind, x).toBe("correct");
    expect(v2Sira(["Heute habe ich keine Zeit."], "Ich habe heute keine Zeit.")?.kind).toBe("correct");
    expect(v2Sira(["Ich komme aus der Türkei."], "Aus der Türkei komme ich.")?.kind).toBe("correct");
    expect(v2Sira(["Es ist neun Uhr."], "Neun Uhr ist es.")?.kind).toBe("correct");
  });
  it("fiil üçüncü yerde → açıklamalı yanlış", () => {
    expect(v2Sira(k, "Morgen ich gehe ins Kino.")?.kind).toBe("v3");
    const v = ruleVerdict(["Heute habe ich keine Zeit."], "Heute ich habe keine Zeit.");
    expect(v.kind).toBe("wrong");
    expect((v as { note?: string }).note).toMatch(/ikinci/);
  });
  it("öbek bölünmez, ayrılan ön ek başa gelmez, soru ve yan cümlede denenmez", () => {
    expect(v2Sira(k, "Kino gehe ich morgen ins.")?.kind).not.toBe("correct");
    expect(v2Sira(["Ich rufe morgen an."], "An rufe ich morgen.")?.kind).not.toBe("correct");
    expect(v2Sira(["Wie heißen Sie?"], "Sie heißen wie?")).toBeNull();
    expect(v2Sira(["Ich komme, wenn ich Zeit habe."], "Wenn ich Zeit habe, komme ich.")).toBeNull();
    expect(v2Sira(["Ich gehe nicht."], "Nicht gehe ich.")?.kind).not.toBe("correct");
    // fiil sanılan başka kelime yüzünden doğru cümle "fiil üçüncü yerde" sayılmaz
    expect(v2Sira(["Ich habe heute keine Zeit."], "Ich habe keine Zeit heute.")?.kind).not.toBe("v3");
  });
});

describe("yazım: kabul + düzeltme notu", () => {
  it("büyük harf ve ümlaut notu", () => {
    expect(yazimNotu("Ich habe einen Termin.", "ich habe einen termin")).toMatch(/Termin/);
    expect(yazimNotu("Mein Name ist Müller.", "Mein Name ist Mueller.")).toMatch(/Müller/);
    expect(yazimNotu("Ich habe Hunger.", "Ich habe Hunger.")).toBeUndefined();
  });
  it("ümlautsuz yazım yalnızca ümlautsuz hâli bilinen bir kelime değilse kabul", () => {
    bilinenKelimeler(["schon", "schön"]);
    expect(umlautTamamla("Das ist schön.", "Das ist schon.", bilinenMi)).toBe("Das ist schon.");
    // mochte (geçmiş zaman) ≠ möchte: sözlük yüklenmemiş olsa da ümlautsuz hâli kelime olan çiftler tamamlanmaz
    expect(umlautTamamla("Ich möchte zahlen.", "Ich mochte zahlen.", () => false)).toBe("Ich mochte zahlen.");
    expect(umlautTamamla("Ich bin müde.", "Ich bin mude.", bilinenMi)).toBe("Ich bin müde.");
    const v = ruleVerdict(["Ich bin müde."], "Ich bin mude.");
    expect(v).toMatchObject({ kind: "correct" });
    expect((v as { note?: string }).note).toMatch(/müde/);
    expect(ruleVerdict(["Ich möchte zahlen."], "Ich mochte zahlen.").kind).not.toBe("correct");
    expect(ruleVerdict(["Das ist schön."], "Das ist schon.").kind).not.toBe("correct");
  });
});

describe("drillVerdict entegrasyonu", () => {
  it("saat maddesi: halb zehn = 9:30 (rakam istemde yokken de istem rakamlı kabul biçimi varsa)", () => {
    const d = { id: "s", k: "tr_de" as const, tr: "Saat dokuz buçuk.", accepted: ["Es ist halb zehn.", "Es ist 9:30."] };
    expect(drillVerdict(d, "Es ist neun Uhr dreißig.").kind).toBe("correct");
    expect(drillVerdict(d, "Es ist 9 Uhr 30.").kind).toBe("correct");
    expect(drillVerdict(d, "Es ist halb elf.").kind).toBe("wrong");
  });
  it("tarih maddesi: 3. Mai = dritten Mai; 4. Mai yanlış", () => {
    const d = { id: "t", k: "tr_de" as const, tr: "3 Mayıs'ta.", accepted: ["Am dritten Mai."] };
    expect(drillVerdict(d, "Am 3. Mai.").kind).toBe("correct");
    expect(drillVerdict(d, "Am vierten Mai.").kind).toBe("wrong");
  });
  it("doğru cevapta yazım notu döner", () => {
    const d = { id: "y", k: "tr_de" as const, tr: "Randevum var.", accepted: ["Ich habe einen Termin."] };
    const v = drillVerdict(d, "ich habe einen termin");
    expect(v.kind).toBe("correct");
    expect(v.note).toMatch(/Termin/);
  });
  it("fiil üçüncü yerde: açıklamalı yanlış", () => {
    const d = { id: "v", k: "tr_de" as const, tr: "Bugün vaktim yok.", accepted: ["Heute habe ich keine Zeit.", "Ich habe heute keine Zeit."] };
    const v = drillVerdict(d, "Heute ich habe keine Zeit.");
    expect(v.kind).toBe("wrong");
    expect(v.note).toMatch(/ikinci/);
  });
});
