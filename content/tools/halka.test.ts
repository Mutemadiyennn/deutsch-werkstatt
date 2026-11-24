import { describe, expect, it } from "vitest";
import { Lexeme, kumeDizini, type Gun, type TemelDers } from "../../packages/shared/src/index.ts";
import { HALKA_KART, halkaDenetle } from "./halka.ts";

const L = (id: string, de: string, ex: string[] = []) => Lexeme.parse({ id, de, tr: "x", pos: "noun", examples: ex.map((x, i) => ({ id: `${id}:${i}`, de: x, tr: "x" })) });
const LEX = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"].map((x) => L(`lx:${x}`, x, [`${x}!`, `${x}?`])).concat([L("lx:heute", "heute"), L("lx:ja", "ja")]);
const d = kumeDizini(LEX, [] as TemelDers[], null);
const gun = (halkalar: unknown, yeni = LEX.slice(0, 5).map((l) => l.id)) => [{ file: "gun-01.json", data: { day: 1, dersler: [], yeni_kartlar: yeni, sesler: [], halkalar } as unknown as Gun }];
const H = (o: Record<string, unknown> = {}) => ({ id: "m1:01:h1", title_tr: "Hafta", kartlar: LEX.slice(0, 5).map((l) => l.id), gorev_cumleleri: [], ...o });

describe("halkalar denetimi (AKIS AK-5, AK-10 1. adım)", () => {
  it("doğru halka: hata yok", () => {
    expect(halkaDenetle(gun([H()]), new Map(), d).errors).toEqual([]);
  });
  it("halka kartları yeni_kartlar ile aynı olmalı", () => {
    const e = halkaDenetle(gun([H({ kartlar: ["lx:Montag", "lx:Dienstag", "lx:Mittwoch"] })]), new Map(), d).errors;
    expect(e.some((x) => x.includes("yeni_kartlar ile aynı değil"))).toBe(true);
    expect(e.some((x) => x.includes("3 kart ("))).toBe(false);
  });
  it("halka sınırı [2, 6] (PM-098 md. 2): tek kartlık halka hata, 2 ve 3 kart geçer, 7 kart hata", () => {
    expect(HALKA_KART).toEqual([2, 6]);
    const L7 = [...LEX.slice(0, 5), L("lx:Samstag", "Samstag", ["Samstag!", "Samstag?"]), L("lx:Sonntag", "Sonntag", ["Sonntag!", "Sonntag?"])];
    const d7 = kumeDizini(L7, [] as TemelDers[], null);
    const id = (n: number) => L7.slice(0, n).map((l) => l.id);
    const halkalar = (...n: number[]) => { let i = 0; return n.map((k, j) => { const h = { id: `m1:01:h${j + 1}`, title_tr: "x", kartlar: id(7).slice(i, i + k), gorev_cumleleri: [] }; i += k; return h; }); };
    const sinir = (...n: number[]) => halkaDenetle(gun(halkalar(...n), id(n.reduce((a, b) => a + b, 0))), new Map(), d7).errors.filter((x) => / kart \(2–6\)/.test(x));
    expect(sinir(1, 4)).toEqual(["gun-01.json: m1:01:h1: 1 kart (2–6)"]);
    expect(sinir(2, 3)).toEqual([]);
    expect(sinir(4, 3)).toEqual([]);
    expect(sinir(6)).toEqual([]);
    expect(sinir(7)).toEqual(["gun-01.json: m1:01:h1: 7 kart (2–6)"]);
  });
  it("görev cümlesinde bilinmeyen 0 ve kartın kelimesi; sahnede en çok 1 bilinmeyen", () => {
    const e = halkaDenetle(gun([H({
      gorev_cumleleri: [{ kart: "lx:Montag", de: "Heute ist Montag.", tr: "x" }, { kart: "lx:Dienstag", de: "Mittwoch!", tr: "x" }],
      sahne: { satirlar: [{ r: "A", de: "Ja, heute Montag.", tr: "x" }, { r: "B", de: "Freitag.", tr: "x" }], soru: { q_tr: "?", opts: ["a", "b"], ans: 0 } }
    })]), new Map(), d).errors;
    expect(e.some((x) => x.includes("lx:Montag: görev cümlesinde bilinmeyen (heute, ?ist)"))).toBe(true);
    expect(e.some((x) => x.includes("lx:Dienstag: görev cümlesinde kartın kelimesi yok"))).toBe(true);
    expect(e.some((x) => x.includes("sahne satırında 2 bilinmeyen"))).toBe(true);
  });
  it("kapıdan geçen görev cümlesi en az 2", () => {
    const kisa = [L("lx:A", "Apfel", ["Apfel!"]), ...LEX.slice(1, 5)];
    const d2 = kumeDizini(kisa, [] as TemelDers[], null);
    const e = halkaDenetle(gun([H({ kartlar: kisa.map((l) => l.id) })], kisa.map((l) => l.id)), new Map(), d2).errors;
    expect(e).toEqual(["gun-01.json: m1:01:h1 lx:A: kapıdan geçen görev cümlesi 1 (en az 2)"]);
  });
});

/** İnceleme #168 1. tur P1-2, P1-9: dersten_sonra varsayılanı, halka kalıpları, halkalar arası sıra, kabul uyarısı, sayaç, #165 içeriği */
describe("halkalar: ders varsayılmaz, kalıplar, sıra, sayaç (inceleme #168)", () => {
  const LX = [L("lx:Montag", "Montag", ["Montag!", "Montag?"]), L("lx:Dienstag", "Dienstag", ["Dienstag!", "Dienstag?"]), L("lx:Mittwoch", "Mittwoch", ["Mittwoch!", "Mittwoch?"]),
    L("lx:Donnerstag", "Donnerstag", ["Donnerstag!", "Donnerstag?"]), L("lx:heute", "heute"), L("lx:Freitag", "Freitag", ["Freitag!", "Freitag?"]),
    L("lx:Samstag", "Samstag", ["Samstag!", "Samstag?"]), L("lx:Sonntag", "Sonntag", ["Sonntag!", "Sonntag?"]), L("lx:Woche", "Woche", ["Woche!", "Woche?"])];
  const DERS = [{ id: "r0:x", teach: [{ id: "t", de: "Heute ist Montag.", tr: "x", lexeme: "lx:Montag" }], drills: [] }] as unknown as TemelDers[];
  const d3 = kumeDizini(LX, DERS, null);
  const dersler = new Map(DERS.map((x) => [x.id, x]));
  const G = (h: unknown[], dersler_: string[] = ["r0:x"]) => [{ file: "gun-01.json", data: { day: 1, dersler: dersler_, yeni_kartlar: (h as { kartlar: string[] }[]).flatMap((x) => x.kartlar), sesler: [], halkalar: h } as unknown as Gun }];
  const h1 = (o: Record<string, unknown> = {}) => ({ id: "m1:01:h1", title_tr: "x", kartlar: ["lx:Montag", "lx:Dienstag", "lx:Mittwoch", "lx:Donnerstag", "lx:heute"], gorev_cumleleri: [{ kart: "lx:heute", de: "Heute ist Montag.", tr: "x", accepted: ["Heute ist Montag.", "Montag ist heute.", "Heute: Montag."] }], ...o });
  it("günün dersi varsayılmaz: dersin kalıbı (heute ist …) halkada bilinmez; dersten_sonra: true ile bilinir", () => {
    const e = halkaDenetle(G([h1()]), dersler, d3).errors;
    expect(e.some((x) => /bilinmeyen \(\??ist\)/.test(x))).toBe(true);
    expect(halkaDenetle(G([h1({ dersten_sonra: true })]), dersler, d3).errors.filter((x) => x.includes("bilinmeyen"))).toEqual([]);
  });
  it("halkanın kalıbı bütün olarak bilinir; ' – ' seçenekleri ayrı kalıptır", () => {
    const e = halkaDenetle(G([h1({ kaliplar: [{ de: "Heute ist … – Ist heute …?", tr: "x" }], gorev_cumleleri: [{ kart: "lx:heute", de: "Ist heute Montag?", tr: "x", accepted: ["a", "b", "c"] }] })]), dersler, d3).errors;
    expect(e.filter((x) => x.includes("bilinmeyen"))).toEqual([]);
  });
  it("sonraki halkanın kartı önceki halkada bilinmez (halkalar arası sıra); önceki halkanın kalıbı sonraki halkada bilinir", () => {
    const h2 = { id: "m1:01:h2", title_tr: "y", kartlar: ["lx:Freitag", "lx:Samstag", "lx:Sonntag", "lx:Woche"], gorev_cumleleri: [{ kart: "lx:Freitag", de: "Heute ist Freitag.", tr: "x", accepted: ["a", "b", "c"] }] };
    const once = h1({ kaliplar: [{ de: "Heute ist …", tr: "x" }], gorev_cumleleri: [{ kart: "lx:heute", de: "Heute ist Freitag.", tr: "x", accepted: ["a", "b", "c"] }] });
    const e = halkaDenetle(G([once, h2]), dersler, d3).errors;
    expect(e.some((x) => x.includes("m1:01:h1 lx:heute: görev cümlesinde bilinmeyen (freitag)"))).toBe(true);
    expect(e.some((x) => x.includes("m1:01:h2") && x.includes("bilinmeyen"))).toBe(false);
  });
  it("kabul listesi 3'ten kısa uyarı verir; sayaç günün görev cümlelerini sayar", () => {
    const r = halkaDenetle(G([h1({ dersten_sonra: true, gorev_cumleleri: [{ kart: "lx:heute", de: "Heute ist Montag.", tr: "x", accepted: ["Heute ist Montag."] }] })]), dersler, d3);
    expect(r.warnings.some((x) => x.includes("kabul listesi 3'ten kısa"))).toBe(true);
    expect(r.sayac).toHaveLength(1);
  });
});

describe("#165 içeriği (main: docs/v2/reviews/halka/gun-01-halkalar.json) şemaya uyar ve kapıdan geçer", () => {
  it("Halka şeması + halkaDenetle: 0 hata", async () => {
    const { readFileSync, existsSync } = await import("node:fs");
    const { join } = await import("node:path");
    const { loadContent, ROOT } = await import("./load.ts");
    const { Halka, genelAdlarAyikla } = await import("../../packages/shared/src/index.ts");
    const f = join(ROOT, "docs/v2/reviews/halka/gun-01-halkalar.json");
    expect(existsSync(f), "#165 içeriği yok").toBe(true);
    const c = loadContent();
    const dz = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8")));
    const h = (JSON.parse(readFileSync(f, "utf8")).halkalar as unknown[]).map((x) => Halka.parse(x));
    // yalnız 1. hafta (#165 1. günün halkası); sonraki haftalar bu testi etkilemez (PM-117 A.1)
    const gunler = c.m1.filter((x) => x.data.day <= 7).map((x) => ({ file: "gun", data: x.data.day === 1 ? { ...x.data, halkalar: h } : x.data }));
    expect(halkaDenetle(gunler as never, new Map(c.temel.map((t) => [t.data.id, t.data])), dz).errors).toEqual([]);
  });
});
