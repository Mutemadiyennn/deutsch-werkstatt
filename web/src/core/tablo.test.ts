import { describe, expect, it } from "vitest";
import { tabloBol } from "./tablo.ts";

describe("dil noktası tablosu telefonda (PM 7059008858 md. 1)", () => {
  it("4 sütuna kadar bölünmez", () => {
    expect(tabloBol(["Kim", "Türkçe", "sein", "haben"])).toBeNull();
  });
  it("Präsens: Kim + Türkçe sabit, dört fiil seçicide", () => {
    expect(tabloBol(["Kim", "Türkçe", "heißen", "wohnen", "kommen", "gehen"])).toEqual({ sabit: [0, 1], secilebilir: [2, 3, 4, 5] });
  });
  it("Modalverben: Kim sabit, altı fiil seçicide", () => {
    expect(tabloBol(["Kim", "können", "müssen", "dürfen", "wollen", "sollen", "möchten"])).toEqual({ sabit: [0], secilebilir: [1, 2, 3, 4, 5, 6] });
  });
  it("tanım sütunu yoksa ilk sütun sabit", () => {
    expect(tabloBol(["A", "B", "C", "D", "E"])?.sabit).toEqual([0]);
  });
});
