import { describe, it, expect } from "vitest";
import { gunGorevleri, GOREV_HAVUZU, ilerleme, dondurmaUygula, sandikOdulu, DONDURMA_EN_COK, xpRekor, haftaAraliklari } from "./gorev.ts";
import { seri, yerelGun, type XpKayit } from "./gun.ts";

const gun = (fark: number, now = new Date("2026-11-19T12:00:00")) => { const d = new Date(now); d.setDate(d.getDate() + fark); return yerelGun(d); };

describe("günlük görevler (PM-065 madde 5, B11b)", () => {
  it("her gün 3 farklı görev: 1 emek (XP/dakika) + 2 beceri; aynı gün hep aynı, dünle aynı üçlü değil", () => {
    for (let i = 0; i < 60; i++) {
      const g = gun(i), y = gunGorevleri(g);
      expect(y).toHaveLength(3);
      expect(new Set(y.map((x) => x.id)).size).toBe(3);
      expect(y.filter((x) => x.olcu === "xp" || x.olcu === "dakika")).toHaveLength(1);
      expect(gunGorevleri(g).map((x) => x.id)).toEqual(y.map((x) => x.id));
      expect(y.map((x) => x.id).sort()).not.toEqual(gunGorevleri(gun(i - 1)).map((x) => x.id).sort());
    }
  });
  it("uygun olmayan ölçü (bugün dikte yok) seçilmez", () => {
    const uygun = new Set(GOREV_HAVUZU.map((g) => g.olcu).filter((o) => o !== "dikteUsta"));
    for (let i = 0; i < 30; i++) expect(gunGorevleri(gun(i), uygun).some((g) => g.olcu === "dikteUsta")).toBe(false);
  });
  it("ilerleme hedefte durur; XP ve dakika dışarıdan", () => {
    const g = GOREV_HAVUZU.find((x) => x.id === "bahce10")!;
    expect(ilerleme(g, { sayac: { bahceIpucusuz: 14 } }, { xp: 0, dakika: 0 })).toBe(10);
    expect(ilerleme(GOREV_HAVUZU.find((x) => x.id === "xp50")!, { sayac: {} }, { xp: 32, dakika: 0 })).toBe(32);
  });
});

describe("sandık ve seri dondurma (madde 6)", () => {
  const now = new Date("2026-11-19T12:00:00");
  it("dün boş, önceki gün dolu ve hak varsa dün dondurulur; seri kırılmaz ama artmaz", () => {
    const x: XpKayit = { toplam: 30, gunler: { [gun(-3, now)]: 10, [gun(-2, now)]: 20 } };
    expect(seri(x, now)).toBe(0);
    const r = dondurmaUygula(x, 1, now)!;
    expect(r.gun).toBe(gun(-1, now)); expect(r.hak).toBe(0);
    expect(seri(r.x, now)).toBe(2);
  });
  it("hak yoksa, dün zaten çalışıldıysa ya da iki gün boşluk varsa dokunmaz", () => {
    expect(dondurmaUygula({ toplam: 1, gunler: { [gun(-2, now)]: 1 } }, 0, now)).toBeNull();
    expect(dondurmaUygula({ toplam: 1, gunler: { [gun(-1, now)]: 1 } }, 1, now)).toBeNull();
    expect(dondurmaUygula({ toplam: 1, gunler: { [gun(-3, now)]: 1 } }, 1, now)).toBeNull();
  });
  it("sandık ödülü: 10 XP + 1 hak; hak en çok 2 birikir", () => {
    expect(sandikOdulu(0)).toEqual({ xp: 10, dondurma: 1 });
    expect(sandikOdulu(DONDURMA_EN_COK).dondurma).toBe(0);
  });
});

describe("geçen haftaki sen (madde 7)", () => {
  const now = new Date("2026-11-19T12:00:00");
  it("son 7 gün ve önceki 7 gün çakışmaz", () => {
    const { bu, gecen } = haftaAraliklari(now);
    expect(bu[0]).toBe(gun(0, now)); expect(gecen[0]).toBe(gun(-7, now));
    expect(bu.filter((g) => gecen.includes(g))).toHaveLength(0);
  });
  it("kişisel rekor: bu hafta önceki bütün haftalardan yüksekse", () => {
    const x: XpKayit = { toplam: 0, gunler: { [gun(-20, now)]: 30, [gun(-9, now)]: 40, [gun(-1, now)]: 50 } };
    expect(xpRekor(x, now)).toBe(true);
    expect(xpRekor({ ...x, gunler: { ...x.gunler, [gun(-10, now)]: 30 } }, now)).toBe(false);
    expect(xpRekor({ toplam: 0, gunler: {} }, now)).toBe(false);
  });
});
