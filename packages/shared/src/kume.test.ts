import { describe, expect, it } from "vitest";
import { Lexeme, type TemelDers } from "./content.ts";
import { bilinmeyenler, bilinmeyenYazi, kumeDizini, toks } from "./kume.ts";

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

describe("sesteş isim ve fiil (PM-117 A.3 ön sınama: lx:Frage ↔ lx:fragen)", () => {
  it("fiilin kendi çekimi, başlığı aynı yazılan ismin sayısına yenilmez; isim de başlığını korur", () => {
    const fragen = Lexeme.parse({ id: "lx:fragen", de: "fragen", tr: "sormak", pos: "verb", verb: { praesens3: "fragt" }, forms: [{ de: "Ich ___ dich.", answer: "frage", tr: "x" }] });
    const frage = Lexeme.parse({ id: "lx:Frage", de: "Frage", art: "die", pl: "Fragen", tr: "soru", pos: "noun", forms: [1, 2, 3].map((i) => ({ de: `Die ___ ${i}.`, answer: "Frage", tr: "x" })) });
    const d = kumeDizini([fragen, frage], [], null);
    expect([...d.yuzey.get("lx:fragen")!]).toContain("frage");
    expect([...d.yuzey.get("lx:Frage")!]).toContain("frage");
    expect([...d.idx.get("frage")!].sort()).toEqual(["lx:Frage", "lx:fragen"]);
    // cümle ortasında büyük harf isim, küçük harf fiil okunuşu (#261 P1-1: Türkçe açıklama doğru kartı göstersin)
    const bil = { kart: new Set<string>(), biten: new Set<string>() };
    expect(bilinmeyenler(d, "Das ist eine Frage.", bil).find((x) => x.sozcuk === "frage")?.adaylar).toEqual(["lx:Frage"]);
    expect(bilinmeyenler(d, "Dann frage ich.", bil).find((x) => x.sozcuk === "frage")?.adaylar).toEqual(["lx:fragen"]);
  });
  it("sahte aday sahibine yenilir: ayrılan ön ek, cümle içi cevap, isim türetmesi (#261 P1-1; sahip kendi biçimini daha çok verir)", () => {
    const V = (id: string, de: string, answer: string, pos = "verb") => Lexeme.parse({ id, de, tr: "x", pos, forms: [{ de: "x ___ x", answer, tr: "x" }] });
    const lex = [
      L({ id: "lx:nach", de: "nach", pos: "prep", forms: [1, 2].map(() => ({ de: "___ Hause", answer: "nach" })) }), V("lx:nachfragen", "nachfragen", "nach"),
      L({ id: "lx:wenn", de: "wenn", pos: "conj", forms: [1, 2].map(() => ({ de: "___ es geht", answer: "wenn" })) }), V("lx:schneien", "schneien", "wenn"),
      L({ id: "lx:melden", de: "melden", pos: "verb", forms: [1, 2].map(() => ({ de: "Wir ___ das.", answer: "melden" })) }), V("lx:Schimmel", "Schimmel", "melden", "noun"),
      L({ id: "lx:neu", de: "neu", pos: "adj", forms: [1, 2].map(() => ({ de: "Das ist ___.", answer: "neu" })) }), V("lx:Neuigkeit", "Neuigkeit", "neu", "noun")
    ];
    const d = kumeDizini(lex, [], null);
    expect([...d.idx.get("nach")!]).toEqual(["lx:nach"]);
    expect([...d.idx.get("wenn")!]).toEqual(["lx:wenn"]);
    expect([...d.idx.get("melden")!]).toEqual(["lx:melden"]);
    expect([...d.idx.get("neu")!]).toEqual(["lx:neu"]);
  });
});
