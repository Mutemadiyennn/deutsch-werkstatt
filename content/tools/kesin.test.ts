import { describe, expect, it } from "vitest";
import { kesinEkle, kesinPaketi } from "./kesin.ts";
import { ROOT } from "./load.ts";
import { join } from "node:path";

describe("kesin tablo → uygulama paketi (PM-100 md. 2)", () => {
  it("1.–7. gün ogretilmis_sayilan'dan (yalnız kart), sonrası gunler[]'den kart ve dersle", () => {
    const p = kesinEkle({}, { ogretilmis_sayilan: { gunler: { "1": ["lx:a"] } }, gunler: [{ day: 8, kartlar: ["lx:b"], dersler: ["gr:a1-03:t5"], fazla: 1 }] });
    expect(p).toEqual({ "1": { kartlar: ["lx:a"], dersler: [] }, "8": { kartlar: ["lx:b"], dersler: ["gr:a1-03:t5"] } });
  });
  it("bozuk biçim hata verir (paket boş tabloyla derlenmez)", () => {
    expect(() => kesinEkle({}, { gunler: [{ day: "8", kartlar: [] }] }, "x.json")).toThrow(/x.json/);
  });
  it("depodaki tablolar okunur (varsa); gün anahtarları 1…364", () => {
    const p = kesinPaketi(join(ROOT, "content/v2/curriculum"));
    for (const g of Object.keys(p)) expect(Number(g)).toBeGreaterThanOrEqual(1);
  });
});
