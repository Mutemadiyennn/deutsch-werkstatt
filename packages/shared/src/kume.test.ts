import { describe, expect, it } from "vitest";
import { Lexeme, type TemelDers } from "./content.ts";
import { bilinmeyenler, bilinmeyenYazi, cekimKarari, duzenliBicimler, kumeDizini, sunulanCekim, toks, toksAsil, type CekimSinifi } from "./kume.ts";

const L = (o: Record<string, unknown>) => Lexeme.parse({ tr: "x", pos: "other", ...o });
const LEX = [
  L({ id: "lx:hallo", de: "hallo", pos: "particle" }),
  L({ id: "lx:ja", de: "ja", pos: "particle" }),
  L({ id: "lx:ja#2", de: "ja", pos: "particle", card: false }),
  L({ id: "lx:hier", de: "hier", pos: "adv" }),
  L({ id: "lx:gehen", de: "gehen", pos: "verb", verb: { praesens3: "geht" }, forms: [{ de: "Ich ___ nach Hause.", answer: "gehe" }] }),
  L({ id: "lx:Montag", de: "Montag", pos: "noun", art: "der", pl: "Montage" }),
  L({ id: "lx:der", de: "der", pos: "det", card: false }),
  L({ id: "lx:sein", de: "sein", pos: "verb", forms: [{ de: "Das ___ gut.", answer: "ist" }] })
];
const DERS = [
  { id: "r0:01-tage", teach: [{ id: "t1", de: "Hallo, hier ist {name}.", tr: "x" }, { id: "t2", de: "gehe", tr: "x" }], table: { baslik_tr: "", sutunlar: ["de", "tr"], satirlar: [["ist", "-dır"]] } },
  { id: "r0:04-zahlen-21-100", teach: [{ id: "t1", de: "zwanzig", tr: "x" }] }
] as unknown as TemelDers[];
const W = { town: { name: "Neustadt", neighbourhood: "Altstadt", places: [{ id: "p1", name: "Café Huber", domain: "x", tr: "x" }] }, characters: [{ id: "ch:huber", name: "Sabine Huber" }] } as never;
const d = kumeDizini(LEX, DERS, W, ["Ioana"]);
const yaz = (s: string, kart: string[], biten: string[] = []) => bilinmeyenYazi(bilinmeyenler(d, s, { kart: new Set(kart), biten: new Set(biten) }));

describe("bilinen küme ve cümle kapısı (AKIS AK-3)", () => {
  it("yer tutucu ve rakam sayılmaz; adlar (karakter, yer, genel ad) bilinir", () => {
    expect(toks("Hallo, {name}! 3 Tage")).toEqual(["hallo", "3", "tage"]);
    expect(yaz("Hallo, Frau Huber! Ioana ist im Café Huber.", ["lx:hallo"], ["r0:01-tage"])).toEqual(["?frau", "?im", "?café"]);
  });
  it("kendi kartı olan sözcük yalnız kendi kartı tanıtıldıysa bilinir", () => {
    expect(yaz("Montag", [])).toEqual(["Montag".toLowerCase()]);
    expect(yaz("Montag, Montage", ["lx:Montag"])).toEqual([]);
  });
  it("tanıtılan kartın yalnız gösterilen biçimi bilinir; öteki çekim dersle gelir", () => {
    expect(yaz("gehe", ["lx:gehen"])).toEqual(["~gehe"]);
    expect(yaz("gehe", ["lx:gehen"], ["r0:01-tage"])).toEqual([]);
  });
  it("eşadlı çerçeve sözcüğü: aynı başlıklı gerçek kart tanıtılmadan bilinmez", () => {
    expect(yaz("ja", [])).toEqual(["ja"]);
    expect(yaz("ja", ["lx:ja"])).toEqual([]);
    expect(yaz("der Montag", ["lx:Montag"])).toEqual([]);
  });
  it("kalıp bütün olarak bilinir; kalıptaki kendi kartı öğretilmeyen sözcük tek başına bilinmez", () => {
    expect(yaz("Hallo, hier ist {name}.", ["lx:hallo"], ["r0:01-tage"])).toEqual([]);
    expect(yaz("Ist Ioana hier?", [], ["r0:01-tage"])).toEqual(["hier"]);
    // kartsız çerçeve sözcüğü (ist) ders bitince tek başına bilinir; kartlı sözcük (hier) yalnız kalıbın düz hâlinde
    expect(yaz("Ist Ioana da?", [], ["r0:01-tage"])).toEqual(["?da"]);
  });
  it("eşlenemeyen sözcük tahmin edilmez; bileşik sayı yalnız sayı dersinden sonra", () => {
    expect(bilinmeyenler(d, "Quatsch", { kart: new Set(), biten: new Set() })[0]).toEqual({ tur: "eslenemedi", sozcuk: "quatsch" });
    expect(yaz("einundzwanzig", [])).toEqual(["?einundzwanzig"]);
    expect(yaz("einundzwanzig", [], ["r0:04-zahlen-21-100"])).toEqual([]);
  });
  it("boşluğun cevabı sayılmaz (haric)", () => {
    expect(bilinmeyenYazi(bilinmeyenler(d, "Das ist gut.", { kart: new Set(), biten: new Set() }, ["ist"]))).toEqual(["?gut"]);
  });
});

describe("dil noktası tablo biçimleri (PM-092 md. 1; PR A)", () => {
  const DN = [{ id: "gr:a1-03:t1", table: { rows: [["ich", "gehe", "giderim"], ["er", "geht", "gider"], ["", "gehen", ""]] } }];
  const dz = kumeDizini(LEX, DERS, W, ["Ioana"], DN);
  const y = (s: string, kart: string[], biten: string[] = []) => bilinmeyenYazi(bilinmeyenler(dz, s, { kart: new Set(kart), biten: new Set(biten) }));
  it("sunulmadan önce tablo biçimi bilinmez; sunulunca kartı bilinen biçim bilinir", () => {
    expect(y("gehe", ["lx:gehen"])).toEqual(["~gehe"]);
    expect(y("gehe", ["lx:gehen"], ["gr:a1-03:t1"])).toEqual([]);
  });
  it("tablo kartın kendisini öğretmez: kart tanıtılmadan ne başlık ne biçim bilinir", () => {
    expect(y("gehen", [], ["gr:a1-03:t1"])).toEqual(["gehen"]);
    expect(y("gehe", [], ["gr:a1-03:t1"])).toEqual(["gehe"]);
  });
  it("sütun başlığı kartı söyler: dizinde olmayan çekim (seid) o kartla bilinir (#205 P1-1)", () => {
    const dz2 = kumeDizini(LEX, DERS, W, [], [{ id: "gr:a1-02:t2", table: { head: ["kişi", "sein", "gehen"], rows: [["ihr", "seid", "geht"], ["wir", "sind", "gehen"]] } }]);
    const y2 = (s: string, kart: string[], biten: string[] = []) => bilinmeyenYazi(bilinmeyenler(dz2, s, { kart: new Set(kart), biten: new Set(biten) }));
    expect(y2("seid", ["lx:sein"])).toEqual(["?seid"]);
    expect(y2("seid", ["lx:sein"], ["gr:a1-02:t2"])).toEqual([]);
    expect(y2("seid", [], ["gr:a1-02:t2"])).toEqual(["?seid"]);
    expect(dz2.dersler.get("gr:a1-02:t2")?.tablo?.has("ihr")).toBe(false);
  });
  it("çerçeve çekimi tablo sunulunca bilinir (ANA-D2 sıkılaştırmasına bekçi; #205 P2-6)", () => {
    const LX2 = [...LEX, L({ id: "lx:ich", de: "ich", pos: "pron", card: false, bicimler: ["mir", "mich"] })];
    const dz3 = kumeDizini(LX2, DERS, W, [], [{ id: "gr:a1-05:t1", table: { head: ["Nom.", "Dat."], rows: [["ich", "mir"]] } }]);
    expect(bilinmeyenYazi(bilinmeyenler(dz3, "mir", { kart: new Set(), biten: new Set(["gr:a1-05:t1"]) }))).toEqual([]);
  });
  it("dil noktası kart bağlamaz, kalıp taşımaz; temel ders aynı kalır", () => {
    expect(dz.dersler.get("gr:a1-03:t1")?.kart.size).toBe(0);
    expect(dz.dersler.get("gr:a1-03:t1")?.tablo?.has("gehe")).toBe(true);
    expect(dz.dersler.get("gr:a1-03:t1")?.tablo?.has("gehen")).toBe(false);
    expect([...(dz.dersler.get("r0:01-tage")?.bicim ?? [])].sort()).toEqual([...(d.dersler.get("r0:01-tage")?.bicim ?? [])].sort());
  });
});

describe("düzenli çekim (PM-097 md. 2)", () => {
  const CL = [
    L({ id: "lx:wohnen", de: "wohnen", pos: "verb" }),
    L({ id: "lx:arbeiten", de: "arbeiten", pos: "verb" }),
    L({ id: "lx:heißen", de: "heißen", pos: "verb" }),
    L({ id: "lx:schlafen", de: "schlafen", pos: "verb", verb: { praesens3: "schläft" } }),
    L({ id: "lx:rufen", de: "rufen", pos: "verb" }),
    L({ id: "lx:anrufen", de: "anrufen", pos: "verb", forms: [{ de: "Ich ___ dich an.", answer: "rufe" }] }),
    L({ id: "lx:kommen", de: "kommen", pos: "verb" }),
    L({ id: "lx:mitkommen", de: "mitkommen", pos: "verb" }),
    L({ id: "lx:fragen", de: "fragen", pos: "verb" }),
    L({ id: "lx:Frage", de: "Frage", pos: "noun", art: "die" }),
    L({ id: "lx:bestellen", de: "bestellen", pos: "verb" }),
    L({ id: "lx:feiern", de: "feiern", pos: "verb" }),
    L({ id: "lx:sammeln", de: "sammeln", pos: "verb" }),
    L({ id: "lx:kaufen", de: "kaufen", pos: "verb" }),
    L({ id: "lx:sein", de: "sein", pos: "verb" })
  ];
  const cd = kumeDizini(CL, [], null, []);
  const kart = new Set(CL.filter((l) => l.pos === "verb").map((l) => l.id));
  const karar = (cumle: string, w: string, sunulan: string[], adaylar: string[] = []) =>
    cekimKarari(cd, cumle, toksAsil(cumle).findIndex((x) => x.t === w), kart, new Set(sunulan as CekimSinifi[]), adaylar)?.karar ?? null;
  const HEPSI = ["1t", "2t", "3t", "1c", "2c", "3c", "p2"];
  it("düzenli biçimler: kök + ek, ara -e- (ünsüz + m/n; ch), s/ß sonrası 2t, -eln/-ern, p2; sein türetilmez", () => {
    const b = (m: string) => Object.fromEntries([...duzenliBicimler(m)].map(([k, v]) => [k, [...v].sort().join(",")]));
    expect(b("wohnen")).toEqual({ wohne: "1t", wohnst: "2t", wohnt: "2c,3t", gewohnt: "p2" });
    expect(b("arbeiten")).toMatchObject({ arbeite: "1t", arbeitest: "2t", arbeitet: "2c,3t", gearbeitet: "p2" });
    expect(b("meinen")).toMatchObject({ meinst: "2t", meint: "2c,3t" });
    expect(b("verdienen")).toMatchObject({ verdient: "2c,3t,p2" });
    expect(b("rechnen")).toMatchObject({ rechnest: "2t", rechnet: "2c,3t" });
    expect(b("öffnen")).toMatchObject({ öffnet: "2c,3t" });
    expect(b("atmen")).toMatchObject({ atmet: "2c,3t" });
    expect(b("heißen")).toMatchObject({ heißt: "2c,2t,3t" });
    expect(b("feiern")).toMatchObject({ feiere: "1t", feierst: "2t", feiert: "2c,3t" });
    expect(b("sammeln")).toMatchObject({ sammle: "1t", sammele: "1t" });
    expect(b("bestellen")).toMatchObject({ bestellt: "2c,3t,p2" });
    expect(b("gehen")).toMatchObject({ geht: "2c,3t", gegeht: "p2" });   // ge- önekli değil: geht ortaç sayılmaz
    expect(duzenliBicimler("sein").size).toBe(0);
    expect(duzenliBicimler("spielen").has("spile")).toBe(false);
  });
  it("tablonun sunduğu sınıflar: satır kişisi (er/sie/es → 3t; parantez atılır) ya da hücre içi zamir + biçim", () => {
    expect([...sunulanCekim(cd, [["ich", "wohne", "arbeite"], ["er/sie/es", "wohnt"]])].sort()).toEqual(["1t", "3t"]);
    expect([...sunulanCekim(cd, [["sie (o, kadın)", "wohnt"]])]).toEqual(["3t"]);
    expect([...sunulanCekim(cd, [["Du wohnst in Wien."]])]).toEqual(["2t"]);
    expect([...sunulanCekim(cd, [["Wie heißt ihr Sohn?"]])]).toEqual([]);   // ihr + büyük harfli ad: iyelik
    expect([...sunulanCekim(cd, [["Sie (siz)", "wohnen"]])]).toEqual([]);   // mastarla aynı biçim sınıf sunmaz
  });
  it("serbest: bilinen fiilin düzenli biçimi ve kişinin tablosu sunulmuş; önce öndeki zamir", () => {
    expect(karar("Ich arbeite heute.", "arbeite", ["1t"])).toBe("serbest");
    expect(karar("Ich arbeite heute.", "arbeite", [])).toBe("engel");            // tablo sunulmadı
    expect(karar("Ihr wohnt hier.", "wohnt", ["3t"])).toBe("engel");             // ihr (2c) sunulmadı
    expect(karar("Ihr kauft es morgen.", "kauft", ["3t"])).toBe("engel");        // öndeki ihr; arkadaki es nesne
    expect(karar("Wohnt ihr Mann hier?", "wohnt", ["3t"])).toBe("engel");        // karar tarafında iyelik ayrılmaz (sıkı yön, bilinçli)
    expect(karar("Kauft ihr Brot?", "kauft", ["3t"])).toBe("engel");             // özne ihr + ad: gevşemez
    expect(karar("Kommt sie Montag?", "kommt", ["2c"])).toBe("engel");
    expect(karar("Tobi arbeitet, ich wohne hier.", "arbeitet", ["3t"])).toBe("serbest");   // tümce sonundaki fiilde arkaya bakılmaz
    expect(karar("Tobi wohnt hier.", "wohnt", ["3t"])).toBe("serbest");          // zamir yok: biçimin herhangi bir kişisi yeter
    expect(karar("Ihr bestellt jetzt.", "bestellt", ["3t", "p2"])).toBe("engel"); // zamir varken p2 sayılmaz
    expect(karar("Ich habe bestellt.", "bestellt", ["p2"])).toBe("serbest");     // komşu zamir yok: ortaç
    expect(karar("Was hast du bestellt?", "bestellt", ["p2"])).toBe("serbest");  // ortaç yeri
    expect(karar("Hast du gewohnt?", "gewohnt", ["p2"])).toBe("serbest");        // tek anlamlı ortaç
    expect(karar("Ich habe es bestellt.", "bestellt", ["p2"])).toBe("serbest");   // ortaç yeri: tümce sonu + yardımcı fiil
    expect(karar("Hast du es bestellt?", "bestellt", ["p2"])).toBe("serbest");
    expect(karar("Ich sammle Briefmarken.", "sammle", ["1t"])).toBe("serbest");
  });
  it("engel: düzensiz biçim, ayrılan önek (taban fiil bilinse de); büyük harfli ad fiil sayılmaz", () => {
    expect(karar("Er schläft.", "schläft", HEPSI, ["lx:schlafen"])).toBe("engel");
    expect(karar("Ich rufe dich an.", "rufe", HEPSI)).toBe("engel");
    expect(karar("Ich rufe dich heute Abend an!", "rufe", HEPSI)).toBe("engel");
    expect(karar("Kommst du mit?", "kommst", HEPSI)).toBe("engel");
    expect(karar("Er kommt mit dem Bus.", "kommt", HEPSI)).toBe("serbest");
    expect(karar("Er kommt. Ich gehe mit.", "kommt", HEPSI)).toBe("serbest");    // fiil tümce sonunda: sonraki tümceye bakılmaz
    expect(karar("Kommst du mit, wenn ich gehe?", "kommst", HEPSI)).toBe("engel"); // virgül tümce sonu
    expect(karar("Ich rufe laut.", "rufe", HEPSI)).toBe("serbest");
    expect(karar("Die Frage ist gut.", "frage", HEPSI)).toBe(null);
    expect(karar("Frage ich ihn?", "frage", HEPSI)).toBe("serbest");               // cümle başında büyük harf ayırt edici değil
    expect(karar("Das ist gut.", "ist", ["3t"], [])).toBe(null);
describe("cümle başı, tek sözcüklü cümle (ANA-D2 devri takibi: 34. gün \"Arm\")", () => {
  const AL = [L({ id: "lx:Arm", de: "Arm", pos: "noun", art: "der", pl: "Arme" }), L({ id: "lx:arm", de: "arm", pos: "adj" }), L({ id: "lx:ist", de: "ist", pos: "verb", card: false }), L({ id: "lx:er", de: "er", pos: "pron", card: false })];
  const ad = kumeDizini(AL, [], null, []);
  const y = (s: string, kart: string[]) => bilinmeyenYazi(bilinmeyenler(ad, s, { kart: new Set(kart), biten: new Set() }));
  it("tek sözcük: iki okunuştan biri bilinirse bilinir", () => {
    expect(y("Arm", ["lx:Arm"])).toEqual([]);
    expect(y("Arm", ["lx:arm"])).toEqual([]);
    expect(y("Arm", [])).toEqual(["arm"]);
  });
  it("çok sözcüklü cümlede cümle başı küçük harfli okunuş öncelikli (değişmedi)", () => {
    expect(y("Arm ist er.", ["lx:Arm"])).toEqual(["~arm"]);
    expect(y("Arm ist er.", ["lx:arm"])).toEqual([]);
  });
});
