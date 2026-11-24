import { describe, expect, it } from "vitest";
import type { Drill } from "@dw/shared";
import { tekrarAdresi, tekrarMaddeleri, zayiflar } from "./haftaTesti.ts";

const B = [
  { gun: 7, id: "cd:m1:07", tr: "Kendimi tanıtırım.", maddeler: ["t1", "t2", "t3"] },
  { gun: 5, id: "cd:m1:05", tr: "Saati sorarım.", maddeler: ["t4", "t5"] },
  { gun: 4, id: "cd:m1:04", tr: "Fiyat sorarım.", maddeler: ["t6"] }
];

describe("hafta sonu testi düşük sonuç yolu (#243 takip a)", () => {
  it("yalnız yanlış maddesi olan cümleler, gün sırasıyla, kendi sayısıyla", () => {
    expect(zayiflar(B, new Set(["t2", "t5", "t4"]))).toEqual([
      { gun: 5, id: "cd:m1:05", tr: "Saati sorarım.", dogru: 0, toplam: 2 },
      { gun: 7, id: "cd:m1:07", tr: "Kendimi tanıtırım.", dogru: 2, toplam: 3 }
    ]);
    expect(zayiflar(B, new Set())).toEqual([]);
    expect(zayiflar([], new Set(["t1"]))).toEqual([]);
  });
  it("tekrar adresi", () => { expect(tekrarAdresi(1, [5, 7])).toBe("#/hafta/1/tekrar/5,7"); });
  it("tekrar maddeleri: her türden biri sondan, kalan yer çevirmeyle; en çok 4", () => {
    const m = (id: string, k: string) => ({ id, k }) as unknown as Drill;
    const g = [m("l1", "listen_and_respond"), m("l2", "listen_and_respond"), m("c1", "tr_de"), m("c2", "tr_de"), m("c3", "tr_de"), m("d1", "guided_response"), m("d2", "guided_response")];
    expect(tekrarMaddeleri(g).map((x) => x.id)).toEqual(["l2", "c3", "d2", "c2"]);
    expect(tekrarMaddeleri([m("c1", "tr_de")]).map((x) => x.id)).toEqual(["c1"]);
    expect(tekrarMaddeleri([m("o1", "order"), m("o2", "order")], 2).map((x) => x.id)).toEqual(["o2", "o1"]);
  });
});
