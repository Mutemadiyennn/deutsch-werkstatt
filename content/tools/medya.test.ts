import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { medyaDenetle } from "./medya.ts";

const kur = (dosyalar: Record<string, string>) => {
  const r = mkdtempSync(join(tmpdir(), "medya-"));
  for (const [ad, icerik] of Object.entries(dosyalar)) { const p = join(r, "content/v2/media", ad); mkdirSync(join(p, ".."), { recursive: true }); writeFileSync(p, icerik); }
  return r;
};
const iyi = { src: "https://github.com/o/d/releases/download/m1-foto/a.jpg", sinif: "acik", lisans: "CC BY 2.0", yazar: "X" };

describe("medya doğrulayıcısı (B12 3. parça, D-112)", () => {
  it("açık kayıt geçerli; kapalı dosya herkese açık adresle hata", () => {
    expect(medyaDenetle(kur({ "foto/acik.json": JSON.stringify({ foto: { "lx:A#kart": iyi } }) }))).toEqual([]);
    const h = medyaDenetle(kur({ "raf/x.json": JSON.stringify({ a: { sinif: "kapali", src: "https://ornek.dev/a.jpg" } }), "raf/y.json": JSON.stringify({ a: { sinif: "kapali", src: "foto/a.jpg" } }) }));
    expect(h).toHaveLength(1); expect(h[0]).toMatch(/kapalı medya/);
  });
  it("atlatma denemeleri yakalanır (inceleme #121 P1-2): yazım farkı, url alanı, iç içe, //, data:, işaretsiz Pixabay", () => {
    const h = medyaDenetle(kur({
      "a.json": JSON.stringify({ x: { sinif: "Kapalı ", url: "https://o.dev/a.jpg" }, y: { sinif: "kapali", parca: [{ src: "//o.dev/b.jpg" }] }, z: { sinif: "kapali", d: { src: "data:image/jpeg;base64,AA" } } }),
      "acik2.json": JSON.stringify({ k: { lisans: "Pixabay Content License", src: "https://cdn.pixabay.com/x.jpg" } }),
      "raf.json": JSON.stringify({ r: { sinif: "kapali", dosya: "foto/a.jpg" } })
    }));
    expect(h.filter((x) => x.includes("herkese açık adres"))).toHaveLength(3);
    expect(h.some((x) => x.includes("Pixabay"))).toBe(true);
    expect(h.some((x) => x.includes("raf.json"))).toBe(false);
  });
  it("açık kayıtta kapalı lisans, sınıf ya da atıf eksikliği hata; ikili dosya depoda hata", () => {
    const h = medyaDenetle(kur({ "foto/acik.json": JSON.stringify({ foto: { a: { ...iyi, lisans: "CC BY 4.0 NC" }, b: { ...iyi, sinif: "kapali" }, c: { ...iyi, yazar: null } } }), "foto/x.jpg": "ikili" }));
    expect(h.some((x) => x.includes("lisans açık değil"))).toBe(true);
    expect(h.some((x) => x.includes('sinif "acik"'))).toBe(true);
    expect(h.some((x) => x.includes("atıf"))).toBe(true);
    expect(h.some((x) => x.includes("ikili medya"))).toBe(true);
  });
});
