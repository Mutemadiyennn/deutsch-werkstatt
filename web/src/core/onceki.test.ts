import { describe, expect, it } from "vitest";
import { akisDersBitti, oncekiKume } from "./onceki.ts";

const kesin = new Map([
  [1, { kartlar: ["lx:a"], dersler: [] }], [2, { kartlar: ["lx:b"], dersler: ["r0:02-x"] }],
  [8, { kartlar: ["lx:c", "lx:d"], dersler: ["gr:a1-03:t5", "dn:kucuk"] }], [9, { kartlar: ["lx:e"], dersler: [] }], [29, { kartlar: ["lx:z"], dersler: [] }]
]);
const dosyali = [{ day: 1, kartlar: ["lx:a"] }, { day: 2, kartlar: ["lx:b", "lx:b2"] }, { day: 29, kartlar: ["lx:z"] }];

describe("önceki günlerin K(t)'si (PM-100 md. 2)", () => {
  it("dosya varken yalnız cihazda görülen kart; dosya yokken kesin tablodan kart ve ders", () => {
    const k = oncekiKume({ day: 29, dosyali, kesin, gorulmus: (c) => c === "lx:b", bitenDosyali: ["r0:02-x"] });
    expect([...k.kartlar].sort()).toEqual(["lx:b", "lx:c", "lx:d", "lx:e"]);
    expect([...k.dersler].sort()).toEqual(["dn:kucuk", "gr:a1-03:t5", "r0:02-x"]);
    expect(k.tablodan).toEqual([8, 9]);
  });
  it("bugün ve sonraki günler katılmaz; tabloda olmayan gün boş", () => {
    const k = oncekiKume({ day: 8, dosyali, kesin, gorulmus: () => true, bitenDosyali: [] });
    expect(k.kartlar.has("lx:c")).toBe(false); expect(k.kartlar.has("lx:z")).toBe(false);
    expect(k.tablodan).toEqual([]);
  });
  it("sınama kipi: dosyalı günlerin kartları görülmüş sayılır", () => {
    const k = oncekiKume({ day: 9, dosyali, kesin, gorulmus: () => false, bitenDosyali: [], hepsiOynandi: true });
    expect([...k.kartlar].sort()).toEqual(["lx:a", "lx:b", "lx:b2", "lx:c", "lx:d"]);
  });
});

describe("akış kaydından biten ders (inceleme #231 P2-1)", () => {
  it("tek parçalı ya da 2. parçası biten dil durağı; 1. parça ve bitmemiş durak sayılmaz", () => {
    expect(akisDersBitti({ biten: ["m1:8:h1", "dil:gr:a1-03:t5"] }, "gr:a1-03:t5")).toBe(true);
    expect(akisDersBitti({ biten: ["dil:r0:02-monate:1", "dil:r0:02-monate:2"] }, "r0:02-monate")).toBe(true);
    expect(akisDersBitti({ biten: ["dil:r0:02-monate:1"] }, "r0:02-monate")).toBe(false);
    expect(akisDersBitti({ biten: ["m1:8:h1"] }, "dn:kucuk")).toBe(false);
  });
});
