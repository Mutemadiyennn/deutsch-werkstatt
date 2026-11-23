import { describe, expect, it } from "vitest";
import { sikTablo, tabloBol } from "./tablo.ts";

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

describe("sık dil noktası tablosu (inceleme #231 P1-1)", () => {
  it("5+ sütun sık; 3 sütun değil; 4 sütunda uzun sözcükler toplamı ≥ 40 ise sık", () => {
    expect(sikTablo(["a", "b", "c", "d", "e"], [], [0, 1, 2, 3, 4])).toBe(true);
    expect(sikTablo(["Komparativ", "x"], [["Heizkostenxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", "y"]], [0, 1])).toBe(false);
    expect(sikTablo(["je + Komparativ …", "… fiil (sonda),", "desto + Komparativ", "+ fiil + özne …"], [["Je mehr Leute", "mitmachen,", "desto besser", "sind die Heizkosten."]], [0, 1, 2, 3])).toBe(true);
    expect(sikTablo(["kim", "sein", "haben", "werden"], [["ich", "bin", "habe", "werde"]], [0, 1, 2, 3])).toBe(false);
  });
});
