import { describe, expect, it } from "vitest";
import { esEsit, esNorm, harfler, heceEsit, rakamEsit, umlautEksik, v2Sira, yazimNotu } from "./esdeger.ts";
import { ruleVerdict } from "./answer.ts";
import { drillVerdict } from "../ui/drill.tsx";

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
  it("tarih ve sıra sayısı (bağlamda)", () => {
    for (const x of ["Am 3. Mai.", "Am 3.5.", "Am 03.05.", "am 3. mai"]) expect(esEsit("Am dritten Mai.", x), x).toBe(true);
    expect(esEsit("Heute ist der erste.", "Heute ist der 1.")).toBe(true);
    expect(esEsit("Im zweiten Stock.", "Im 2. Stock.")).toBe(true);
    expect(esEsit("Am dritten Mai.", "Am 4. Mai.")).toBe(false);
    expect(esEsit("Am 8. Mai.", "Am achten Mai.")).toBe(true);
    // sıra sayısı eki denetlenir (inceleme #76 P1-1)
    expect(esEsit("Heute ist der dritte Mai.", "Heute ist der dritten Mai.")).toBe(false);
    expect(esEsit("Im zweiten Stock.", "Im zweite Stock.")).toBe(false);
    // bağlamsız sayı ve fiil sıra sayısı değildir
    expect(esNorm("Ich bin 30.")).toBe(esNorm("Ich bin dreißig."));
    expect(esEsit("Ich arbeite bis 5.", "Ich arbeite bis fünf.")).toBe(true);
    expect(esNorm("Wir achten auf den Preis.")).toContain("achten");
    expect(esEsit("Das kostet 3.10.", "Das kostet dritten Oktober.")).toBe(false);
    expect(esNorm("9.30 Euro")).not.toBe(esNorm("neun Uhr dreißig Euro"));
    expect(esNorm("Zwo")).toBe(esNorm("zwei"));
  });
  it("saat: ein Uhr, fünf vor halb, dakika nach/vor", () => {
    expect(esEsit("Um halb zwei.", "Um ein Uhr dreißig.")).toBe(true);
    expect(esEsit("Um 8:25.", "Um fünf vor halb neun.")).toBe(true);
    expect(esEsit("Um 8:35.", "Um fünf nach halb neun.")).toBe(true);
    expect(esEsit("Um 8:03.", "Um drei nach acht.")).toBe(true);
    expect(esEsit("Um 8:25.", "Um fünfundzwanzig nach acht.")).toBe(true);
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
    expect(rakamEsit("Am 1.12.2026.", "Am 11.2.2026.")).toBe(false); // tarih ayraçları anlamlı (inceleme #76 P1-4)
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
  it("ue yazımı, zwei L, U Umlaut, scharfes S, giriş cümlesi; 've' W değildir", () => {
    for (const x of ["M, U, E, L, L, E, R", "M, Ü, zwei L, E, R", "M, U Umlaut, L, L, E, R", "Mein Name ist M, Ü, L, L, E, R."]) expect(heceEsit(k, x), x).toBe(true);
    expect(heceEsit(["G, R, O, ß"], "G, R, O, scharfes S")).toBe(true);
    expect(heceEsit(["W, E, B, E, R"], "ve e be e er")).toBe(false);
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
    expect(v2Sira(["Ich habe am Dienstag Zeit."], "Am Dienstag habe ich Zeit.")?.kind).toBe("correct");
    expect(v2Sira(["Morgen gehe ich ins Kino."], "Ins Kino gehe ich morgen.")?.kind).toBe("correct");
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
    // inceleme #76 P0: öznesi isim olan cümlede ve öbek olmayan parçada sıra serbest değil
    expect(v2Sira(["Das Kind sieht die Frau."], "Die Frau sieht das Kind.")).toBeNull();
    expect(v2Sira(["Ich habe am Dienstag Zeit."], "Am Dienstag Zeit habe ich.")?.kind).not.toBe("correct");
    expect(v2Sira(["Ich kann morgen kommen."], "Kommen ich morgen kann.")?.kind).not.toBe("correct");
    expect(v2Sira(["Meine Nummer ist null eins sieben."], "Meine Nummer eins null sieben ist.")).toBeNull();
    expect(v2Sira(["Ich komme ja."], "Ja komme ich.")?.kind).not.toBe("correct");
    expect(v2Sira(["Ich komme ja."], "Ja ich komme.")?.kind).not.toBe("v3");
    expect(v2Sira(["Ihr Termin ist morgen."], "Morgen ist Ihr Termin.")).toBeNull();
    // permütasyon taraması bulguları: sayı+isim öbeği, kip fiili + mastar, söylem kelimesi
    expect(v2Sira(["Ich habe die Nummer vierzehn."], "Die Nummer habe ich vierzehn.")?.kind).not.toBe("correct");
    expect(v2Sira(["Ich bin dreißig Jahre alt."], "Alt bin ich dreißig Jahre.")?.kind).not.toBe("correct");
    expect(v2Sira(["Ich möchte bitte einen Termin machen."], "Machen möchte ich bitte einen Termin.")?.kind).not.toBe("correct");
    expect(v2Sira(["Morgen kann ich nicht kommen."], "Ich kann nicht kommen morgen.")?.kind).not.toBe("correct");
    expect(v2Sira(["Kommen kann ich morgen nicht."], "Ich kann morgen nicht kommen.")?.kind).toBe("correct");
    expect(v2Sira(["Kommen kann ich morgen nicht."], "Morgen kann ich kommen nicht.")?.kind).not.toBe("correct");
    expect(v2Sira(["Bitte buchstabieren Sie das."], "Sie buchstabieren bitte das.")).toBeNull();
    expect(v2Sira(["Einen Termin möchte ich machen."], "Machen möchte ich einen Termin.")?.kind).not.toBe("correct");
    expect(v2Sira(["Am Montag kann ich kommen."], "Kommen kann ich am Montag.")?.kind).toBe("correct");
    // 2. tur K1: sıfat, derece kelimesi, dönüşlü zamir tek başına başa alınmaz; sie/es ile isim öbeği anlamı döndürmez
    for (const [k, c] of [["Ich habe starke Schmerzen.", "Starke habe ich Schmerzen."], ["Es tut genau hier weh.", "Genau tut es hier weh."], ["Es tut richtig weh.", "Richtig tut es weh."], ["Es ist etwas besser.", "Etwas ist es besser."], ["Es wird immer schlimmer.", "Schlimmer wird es immer."], ["Ich habe mich schon eingetragen.", "Mich habe ich schon eingetragen."], ["Ich habe zwei kleine Kinder.", "Kleine habe ich zwei Kinder."], ["Ich habe viel Arbeit.", "Viel habe ich Arbeit."], ["Ich bin so müde.", "So bin ich müde."], ["Ich habe gar keine Zeit.", "Gar habe ich keine Zeit."], ["Wir beide kommen morgen.", "Morgen beide wir kommen."], ["Sie liebt Peter.", "Peter liebt sie."], ["Peter liebt sie.", "Sie liebt Peter."], ["Es frisst das Kind.", "Das Kind frisst es."]] as const) expect(v2Sira([k], c)?.kind, c).not.toBe("correct");
    for (const [k, c] of [["Ich habe seit gestern Bauchschmerzen.", "Seit gestern Bauchschmerzen habe ich."], ["Es ist schlimmer geworden.", "Geworden ist es schlimmer."], ["Hier tut es mir weh.", "Es tut hier mir weh."], ["Bis Mittwoch sage ich Ihnen Bescheid.", "Bescheid sage ich bis Mittwoch Ihnen."]] as const) expect(v2Sira([k], c)?.kind, c).not.toBe("correct");
    for (const [k, c] of [["Ich habe nur Montag verstanden.", "Montag habe ich nur verstanden."], ["Seit Sonntag habe ich das.", "Ich habe seit Sonntag das."]] as const) expect(v2Sira([k], c)?.kind, c).not.toBe("correct");
    for (const [k, c] of [["Ich lerne noch Deutsch.", "Deutsch lerne ich noch."], ["Seit Sonntag habe ich das.", "Ich habe das seit Sonntag."]] as const) expect(v2Sira([k], c)?.kind, c).toBe("correct");
    for (const [k, c] of [["Hier tut es mir weh.", "Es tut mir hier weh."], ["Bis Mittwoch sage ich Ihnen Bescheid.", "Bescheid sage ich Ihnen bis Mittwoch."]] as const) expect(v2Sira([k], c)?.kind, c).toBe("correct");
    for (const [k, c] of [["Ich bin müde.", "Müde bin ich."], ["Es ist Donnerstag.", "Donnerstag ist es."], ["Ich habe heute Zeit.", "Zeit habe ich heute."], ["Ich habe Urlaub im Juli.", "Urlaub habe ich im Juli."], ["Morgen kommt sie.", "Sie kommt morgen."]] as const) expect(v2Sira([k], c)?.kind, c).toBe("correct");
    expect(v2Sira(["Heute geht es nicht. Montag geht es."], "Montag geht es nicht. Heute geht es.")).toBeNull();
    // fiil sanılan başka kelime yüzünden doğru cümle "fiil üçüncü yerde" sayılmaz
    expect(v2Sira(["Ich habe heute keine Zeit."], "Ich habe keine Zeit heute.")?.kind).not.toBe("v3");
  });
});

describe("yazım: kabul + düzeltme notu", () => {
  it("büyük harf (isim, kibar hitap ayrı) ve ae/oe/ue notu", () => {
    expect(yazimNotu("Ich habe einen Termin.", "ich habe einen termin")).toMatch(/İsimler.*Termin/);
    expect(yazimNotu("Hallo. Wie geht es Ihnen?", "hallo. wie geht es ihnen?")).toBe("Kibar hitap büyük harfle yazılır: Ihnen");
    expect(yazimNotu("Mein Name ist Müller.", "Mein Name ist Mueller.")).toMatch(/Müller/);
    expect(yazimNotu("Ich habe Hunger.", "Ich habe Hunger.")).toBeUndefined();
  });
  it("ümlautu unutulmuş cevap doğru sayılmaz, notu gösterilir (inceleme #76 P1-5)", () => {
    for (const [k, c] of [["Das ist schön.", "Das ist schon."], ["Er fährt nach Hause.", "Er fahrt nach Hause."], ["Sie ist älter.", "Sie ist alter."], ["Ich bin müde.", "Ich bin mude."], ["Das ist größer.", "Das ist groser."]]) {
      const v = ruleVerdict([k], c);
      expect(v.kind, c).toBe("wrong");
      expect((v as { note?: string }).note, c).toMatch(/Ümlaut/);
    }
    expect(umlautEksik("Ich bin müde.", "Ich bin mude.")).toMatch(/müde/);
    expect(umlautEksik("Ich bin müde.", "Ich bin krank.")).toBeUndefined();
    // Bahçe: artikelli isim (PM 7004537514-1: "yazım", kart geri atılmaz)
    expect(umlautEksik("die Ärztin", "die Arztin")).toMatch(/Ärztin/);
    expect(umlautEksik("die Ärztin", "die Aerztin")).toBeUndefined();
    expect(ruleVerdict(["Ich bin müde."], "Ich bin muede.").kind).toBe("correct");
  });
});

describe("fiil üçüncü yerde dolgu kuralından önce (2. tur K2)", () => {
  it("Gern ich möchte einen Termin. → açıklamalı yanlış", () => {
    const v = ruleVerdict(["Ich möchte gern einen Termin."], "Gern ich möchte einen Termin.");
    expect(v.kind).toBe("wrong");
    expect(ruleVerdict(["Ich möchte einen Termin."], "Bitte, ich möchte einen Termin.").kind).toBe("correct");
    // sondaki dolgu yalnızca nezaket ifadesi: "…Schmerzen sehr" doğru değil, "…, danke sehr" doğru
    expect(ruleVerdict(["Ich habe starke Schmerzen."], "Ich habe starke Schmerzen sehr.").kind).not.toBe("correct");
    expect(ruleVerdict(["In Ordnung."], "In Ordnung, danke sehr.").kind).toBe("correct");
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
