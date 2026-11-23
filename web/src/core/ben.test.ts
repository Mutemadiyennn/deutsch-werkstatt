import { describe, it, expect } from "vitest";
import type { LearnerItem } from "@dw/shared";
import { haftaCumlesi, haftaGunleri, haftaNo, haftaSatiri, haftaSayilari, noktalar, soyledi, tanidi, taninanKelime } from "./ben.ts";

const oge = (id: string, p: Partial<LearnerItem> & { pOk?: number; pN?: number; ilk?: string; son?: string; uretim?: string[] } = {}): LearnerItem => ({
  itemId: id, kind: "lexeme", inBank: false, gaps: [], u: 0, durable: p.durable ?? false,
  passive: { s: 0, n: p.pN ?? p.pOk ?? 0, ok: p.pOk ?? 0, last: p.son },
  active: { s: 0, n: 0, ok: 0, sessions: (p.uretim ?? []).map((t, i) => `s${i}@${Date.parse(t)}`) },
  firstAt: p.ilk ? { passive: p.ilk } : undefined
});
const GUN1 = "2026-11-20T10:00:00", GUN2 = "2026-11-21T10:00:00";

describe("Ben: noktalar kanıttan (PM-084 md. 5.2, OD-4/OD-8)", () => {
  it("hafta: 1–7 → 1, 8 → 2; gün aralığı", () => {
    expect(haftaNo(1)).toBe(1); expect(haftaNo(7)).toBe(1); expect(haftaNo(8)).toBe(2);
    expect(haftaGunleri(2)).toEqual([8, 9, 10, 11, 12, 13, 14]);
  });
  it("tanıma: tek günde iki doğru yetmez (gün kuralı); iki ayrı günde dolar", () => {
    expect(tanidi(oge("a", { pOk: 3, ilk: GUN1, son: GUN1 }))).toBe(false);
    expect(tanidi(oge("a", { pOk: 1, ilk: GUN1, son: GUN2 }))).toBe(false);
    expect(tanidi(oge("a", { pOk: 2, ilk: GUN1, son: GUN2 }))).toBe(true);
    expect(tanidi(oge("a", { pOk: 2, pN: 10, ilk: GUN1, son: GUN2 }))).toBe(false);   // doğruluk %20 (OD-4: ≥ %90)
    expect(tanidi(oge("a", { uretim: [GUN1, GUN2] }))).toBe(true);
    expect(tanidi(undefined)).toBe(false);
  });
  it("söyleyebiliyorum yalnız iki ayrı GÜNDE doğru üretimle; aynı gün iki oturum (durable) yetmez", () => {
    expect(soyledi(oge("a", { pOk: 5, ilk: GUN1, son: GUN2 }))).toBe(false);
    expect(soyledi(oge("a", { durable: true, uretim: ["2026-11-20T08:00:00", "2026-11-20T15:00:00"] }))).toBe(false);
    expect(soyledi(oge("a", { uretim: [GUN1, GUN2] }))).toBe(true);
  });
  it("nokta, günün kartlarının oranı eşiği geçince dolar; üçüncü nokta kanıt yokken dolmaz; kart yoksa boş", () => {
    const m = new Map([
      ["k1", oge("k1", { pOk: 2, ilk: GUN1, son: GUN2 })], ["k2", oge("k2", { pOk: 2, ilk: GUN1, son: GUN2 })],
      ["k3", oge("k3", { pOk: 2, ilk: GUN1, son: GUN2 })], ["k4", oge("k4", { pOk: 2, ilk: GUN1, son: GUN2 })], ["k5", oge("k5", { pOk: 1, ilk: GUN1, son: GUN1 })]
    ]);
    expect(noktalar(["k1", "k2", "k3", "k4", "k5"], m, 0.8)).toEqual([true, false, false]);
    expect(noktalar(["k1", "k2", "k3", "k5", "yok"], m, 0.8)).toEqual([false, false, false]);
    const d = new Map([...m].map(([k, v]) => [k, { ...v, active: { ...v.active, sessions: [`a@${Date.parse(GUN1)}`, `b@${Date.parse(GUN2)}`] } }]));
    expect(noktalar(["k1", "k2", "k3", "k4", "k5"], d, 0.8)).toEqual([true, true, false]);
    expect(noktalar([], d, 0.8)).toEqual([false, false, false]);
  });
  it("bu hafta: yalnız sıfır olmayan sayılar; hepsi sıfırsa tek dürüst cümle", () => {
    const items = new Map([["k1", oge("k1", { uretim: [GUN1, GUN2] })], ["k2", oge("k2", { durable: true })]]);
    const s = haftaSayilari({ kartlar: ["k1", "k2", "k1"], items, bitenGun: 2, medya: ["m1", "m2"], medyaBitti: new Set(["m2", "baska"]) });
    expect(s).toEqual({ kalici: 1, gun: 2, kayit: 1 });
    expect(haftaCumlesi(s)).toBe("1 kelime kalıcı oldu. 2 günü bitirdin. 1 kaydı dinledin.");
    expect(haftaCumlesi({ kalici: 0, gun: 1, kayit: 0 })).toBe("1 günü bitirdin.");
    expect(haftaCumlesi({ kalici: 0, gun: 0, kayit: 0 })).toBe("İlk günün bitince burada göreceksin.");
    expect(haftaCumlesi({ kalici: 0, gun: 0, kayit: 0 })).not.toMatch(/\b0\b/);
    expect(haftaCumlesi({ kalici: 0, gun: 0, kayit: 0 }, 2)).toBe("Bu haftanın ilk günü bitince burada göreceksin.");
  });
  it("alt satır ve kelime haritası sayısı", () => {
    expect(haftaSatiri("A1", 1)).toBe("A1 yolunun 1. haftasındasın.");
    expect(haftaSatiri(null, 3)).toBe("Yolun 3. haftasındasın.");
    expect(taninanKelime([oge("a", { pOk: 1 }), oge("b"), { ...oge("c", { pOk: 2 }), kind: "pattern" }])).toBe(1);
  });
});
