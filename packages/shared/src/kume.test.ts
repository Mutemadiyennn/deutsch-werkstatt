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
