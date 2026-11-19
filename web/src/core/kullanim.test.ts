import { describe, expect, it } from "vitest";
import { adimEtiketi, eskiMi, gununCumlesi, olayEkle, ozetle, rotaAdimi, KULLANIM_SINIR, type KullanimGun } from "./kullanim.ts";

const at = "2026-11-19T10:00:00Z";
const bos = (): KullanimGun => ({ gun: "2026-11-19", olaylar: [] });

describe("yerel kullanım ölçümü (#58 B3)", () => {
  it("açılış sayılır; biten ve bırakılan adımlar ayrılır; bırakma noktası son çıkıştır", () => {
    let g = bos();
    for (const o of [
      { t: "ac", at }, { t: "cik", adim: "bahce:1", nokta: "3/12", at }, { t: "cik", adim: "bahce:1", nokta: "7/12", at },
      { t: "ac", at }, { t: "bitti", adim: "bahce:1", at }, { t: "cik", adim: "bahce:1", nokta: "12/12", at },
      { t: "cik", adim: "ders:r0-01", nokta: "14/60", at }
    ] as const) g = olayEkle(g, o);
    const o = ozetle(g);
    expect(o.acilis).toBe(2);
    expect(o.bitenler).toEqual(["bahce:1"]);
    expect(o.birakilanlar).toEqual([{ adim: "ders:r0-01", nokta: "14/60", at }]);
    // aynı adımdan art arda çıkış tek kayıt (son nokta kalır)
    expect(g.olaylar.filter((x) => x.t === "cik" && x.adim === "bahce:1" && x.nokta === "3/12")).toHaveLength(0);
  });
  it("cümle: boşluk düzeltilir, aynı cümle iki kez yazılmaz; gün sonunda en uzunu gösterilir", () => {
    let g = bos();
    g = olayEkle(g, { t: "cumle", metin: "  Ich  trinke Kaffee. ", kaynak: "bahce", at });
    g = olayEkle(g, { t: "cumle", metin: "Ich trinke Kaffee.", kaynak: "bahce", at });
    g = olayEkle(g, { t: "cumle", metin: "Morgen gehe ich zum Arzt, weil ich krank bin.", kaynak: "yazma", at });
    const o = ozetle(g);
    expect(o.cumleler).toHaveLength(2);
    expect(gununCumlesi(o)?.kaynak).toBe("yazma");
    expect(gununCumlesi(ozetle(bos()))).toBeNull();
  });
  it("günlük sınır: en eski olaylar düşer", () => {
    let g = bos();
    for (let i = 0; i < KULLANIM_SINIR + 5; i++) g = olayEkle(g, { t: "ac", at });
    expect(g.olaylar).toHaveLength(KULLANIM_SINIR);
  });
  it("rota → adım kimliği (adımXpVer ile aynı) ve okunur etiket", () => {
    expect(rotaAdimi({ name: "garden", day: 2 })).toBe("bahce:2");
    expect(rotaAdimi({ name: "ders", id: "r0-01" })).toBe("ders:r0-01");
    expect(rotaAdimi({ name: "m1medya", day: 1, id: "m1-01-klip" })).toBe("medya:m1-01-klip");
    expect(rotaAdimi({ name: "today" })).toBeNull();
    expect(adimEtiketi("prova:3")).toBe("Konuşma provası (3. gün)");
    expect(adimEtiketi("ders:r0-01", { "r0-01": "Selamlaşma" })).toBe("Ders: Selamlaşma");
  });
  it("30 günden eski kayıt silinir", () => {
    const now = new Date(2026, 10, 19);
    expect(eskiMi("2026-10-01", now)).toBe(true);
    expect(eskiMi("2026-11-10", now)).toBe(false);
    expect(eskiMi("bozuk", now)).toBe(true);
  });
});
