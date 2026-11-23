import { describe, expect, it } from "vitest";
import { Lexeme, type TemelDers } from "./content.ts";
import { bilinmeyenler, bilinmeyenYazi, cekimKarari, duzenliBicimler, kumeDizini, sunulanCekim, toks, type CekimSinifi } from "./kume.ts";

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

describe("düzenli çekim (PM-097 md. 2)", () => {
  const CL = [
    L({ id: "lx:wohnen", de: "wohnen", pos: "verb" }),
    L({ id: "lx:arbeiten", de: "arbeiten", pos: "verb" }),
    L({ id: "lx:heißen", de: "heißen", pos: "verb" }),
    L({ id: "lx:schlafen", de: "schlafen", pos: "verb", verb: { praesens3: "schläft" } }),
    L({ id: "lx:anrufen", de: "anrufen", pos: "verb", forms: [{ de: "Ich ___ dich an.", answer: "rufe" }] }),
    L({ id: "lx:bestellen", de: "bestellen", pos: "verb" }),
    L({ id: "lx:feiern", de: "feiern", pos: "verb" }),
    L({ id: "lx:sein", de: "sein", pos: "verb" })
  ];
  const cd = kumeDizini(CL, [], null, []);
  const kart = new Set(CL.map((l) => l.id));
  const karar = (cumle: string, w: string, sunulan: string[], adaylar: string[] = []) => {
    const tt = toks(cumle); return cekimKarari(cd, tt, tt.indexOf(w), kart, new Set(sunulan as CekimSinifi[]), adaylar)?.karar ?? null;
  };
  it("düzenli biçimler: kök + ek, ara -e-, s/ß sonrası 2t, -ern, p2; sein türetilmez", () => {
    const b = (m: string) => Object.fromEntries([...duzenliBicimler(m)].map(([k, v]) => [k, [...v].sort().join(",")]));
    expect(b("wohnen")).toEqual({ wohne: "1t", wohnst: "2t", wohnt: "2c,3t", gewohnt: "p2" });
    expect(b("arbeiten")).toMatchObject({ arbeite: "1t", arbeitest: "2t", arbeitet: "2c,3t", gearbeitet: "p2" });
    expect(b("heißen")).toMatchObject({ heißt: "2c,2t,3t" });
    expect(b("feiern")).toMatchObject({ feiere: "1t", feierst: "2t", feiert: "2c,3t" });
    expect(b("bestellen")).toMatchObject({ bestellt: "2c,3t,p2" });
    expect(duzenliBicimler("sein").size).toBe(0);
  });
  it("tablonun sunduğu sınıflar: satır kişisi (er/sie/es → 3t) ya da hücre içi zamir + biçim", () => {
    expect([...sunulanCekim(cd, [["ich", "wohne", "arbeite"], ["er/sie/es", "wohnt"]])].sort()).toEqual(["1t", "3t"]);
    expect([...sunulanCekim(cd, [["Du wohnst in Wien."]])]).toEqual(["2t"]);
    expect([...sunulanCekim(cd, [["Sie (siz)", "wohnen"]])]).toEqual([]);   // mastarla aynı biçim sınıf sunmaz
  });
  it("serbest: bilinen fiilin düzenli biçimi ve kişinin tablosu sunulmuş; zamir varsa o kişi", () => {
    expect(karar("Ich arbeite heute.", "arbeite", ["1t"])).toBe("serbest");
    expect(karar("Ich arbeite heute.", "arbeite", [])).toBe("engel");            // tablo sunulmadı
    expect(karar("Ihr wohnt hier.", "wohnt", ["3t"])).toBe("engel");             // ihr (2c) sunulmadı
    expect(karar("Tobi wohnt hier.", "wohnt", ["3t"])).toBe("serbest");          // zamir yok: biçimin herhangi bir kişisi yeter
  });
  it("engel: düzensiz biçim (kök değişimi, ayrılan önek); fiil olmayan biçim karar dışı", () => {
    expect(karar("Er schläft.", "schläft", ["1t", "2t", "3t"], ["lx:schlafen"])).toBe("engel");
    expect(karar("Ich rufe dich an.", "rufe", ["1t"], ["lx:anrufen"])).toBe("engel");
    expect(karar("Das ist gut.", "ist", ["3t"], [])).toBe(null);
  });
});
