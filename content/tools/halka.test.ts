import { describe, expect, it } from "vitest";
import { Lexeme, kumeDizini, type Gun, type TemelDers } from "../../packages/shared/src/index.ts";
import { halkaDenetle } from "./halka.ts";

const L = (id: string, de: string, ex: string[] = []) => Lexeme.parse({ id, de, tr: "x", pos: "noun", examples: ex.map((x, i) => ({ id: `${id}:${i}`, de: x, tr: "x" })) });
const LEX = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"].map((x) => L(`lx:${x}`, x, [`${x}!`, `${x}?`])).concat([L("lx:heute", "heute"), L("lx:ja", "ja")]);
const d = kumeDizini(LEX, [] as TemelDers[], null);
const gun = (halkalar: unknown, yeni = LEX.slice(0, 5).map((l) => l.id)) => [{ file: "gun-01.json", data: { day: 1, dersler: [], yeni_kartlar: yeni, sesler: [], halkalar } as unknown as Gun }];
const H = (o: Record<string, unknown> = {}) => ({ id: "m1:01:h1", title_tr: "Hafta", kartlar: LEX.slice(0, 5).map((l) => l.id), gorev_cumleleri: [], ...o });

describe("halkalar denetimi (AKIS AK-5, AK-10 1. adım)", () => {
  it("doğru halka: hata yok", () => {
    expect(halkaDenetle(gun([H()]), new Map(), d).errors).toEqual([]);
  });
  it("halka kartları yeni_kartlar ile aynı olmalı; 4–6 kart", () => {
    const e = halkaDenetle(gun([H({ kartlar: ["lx:Montag", "lx:Dienstag", "lx:Mittwoch"] })]), new Map(), d).errors;
    expect(e.some((x) => x.includes("yeni_kartlar ile aynı değil"))).toBe(true);
    expect(e.some((x) => x.includes("3 kart (4–6)"))).toBe(true);
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
