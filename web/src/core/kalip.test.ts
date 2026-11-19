import { describe, expect, it } from "vitest";
import { DONUSUM_SIRA, DONUSUM_TR, kalipSirasi, ornekteGecer } from "./kalip.ts";

describe("kalıp kartı (#58 B2)", () => {
  it("seçilen öbeği içeren örnek bulunur (noktalama ve büyük harf yok sayılır, kelime sınırıyla)", () => {
    expect(ornekteGecer("Ich bin heute sehr müde.", "müde")).toBe(true);
    expect(ornekteGecer("Ich habe einen Termin um zehn.", "einen Termin")).toBe(true);
    expect(ornekteGecer("Ich bin müder als gestern.", "müde")).toBe(false);
  });
  it("sıra: temel kalıplar önce, sonra seviye", () => {
    const s = kalipSirasi([{ core: false, level: "A1", frame: "b" }, { core: true, level: "A2", frame: "c" }, { core: true, level: "A1", frame: "z" }]);
    expect(s.map((x) => x.frame)).toEqual(["z", "c", "b"]);
  });
  it("dönüşüm etiketlerinin hepsi Türkçe ve sırada", () => {
    expect(DONUSUM_SIRA).toEqual(["question", "negative", "polite", "perfekt", "weil", "dass", "wenn"]);
    for (const k of DONUSUM_SIRA) expect(DONUSUM_TR[k]).toMatch(/\p{L}/u);
  });
});
