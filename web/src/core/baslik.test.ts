import { describe, expect, it } from "vitest";
import { ustBaslik } from "./baslik.ts";

describe("senaryo üst çubuk başlığı (B3, PM 7048763794)", () => {
  it("alan adı gösterilir, büyük harfe çevrilmez", () => expect(ustBaslik("Telefon ve randevu", "Doktordan telefonla randevu almak")).toBe("Telefon ve randevu"));
  it("alan adı yoksa başlık yok", () => { expect(ustBaslik(undefined, "X")).toBe(""); expect(ustBaslik("  ", "X")).toBe(""); });
  it("alan adı senaryo adıyla aynıysa başlık yok (harf büyüklüğü ve boşluk fark etmez)", () => expect(ustBaslik("İş yeri ", "iş yeri")).toBe(""));
});
