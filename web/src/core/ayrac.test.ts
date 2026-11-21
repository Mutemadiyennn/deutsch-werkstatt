import { describe, it, expect } from "vitest";
import { AYRAC, ayrac, ayracBagla } from "./ayrac.ts";

describe("ayrac (yerleşim B5)", () => {
  it("parçaları bölünmez boşluklu ayraçla birleştirir, boşları atlar", () => {
    expect(ayrac("Beschwerden beschreiben", "A2")).toBe("Beschwerden beschreiben · A2");
    expect(ayrac("a", "", null, undefined, false, "b")).toBe(`a${AYRAC}b`);
    expect(ayrac("tek")).toBe("tek");
    expect(ayrac(3, "ders")).toBe(`3${AYRAC}ders`);
  });
  it("hazır metindeki ayraçları bağlar; ayraç dışındaki boşluklar kalır", () => {
    expect(ayracBagla("Ich möchte + istediğin şey · Ich möchte + …")).toBe("Ich möchte + istediğin şey · Ich möchte + …");
    expect(ayracBagla("a·b")).toBe("a·b");
    expect(ayracBagla("x  ·  y · z")).toBe(`x${AYRAC}y${AYRAC}z`);
    expect(/[ ]·|·[ ]/.test(ayracBagla("bir · iki · üç"))).toBe(false);
  });
});
