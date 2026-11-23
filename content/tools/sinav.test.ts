/**
 * Sınav günü (PM-101 md. 5, PM-102 md. 1 iş 3): `sinav: "assess:<ad>:<n>"` bağı olan, kartsız, `dersler: []` ve halkasız gün
 * şemadan ve doğrulayıcıdan geçer; kart, ders ya da halka taşırsa hata. Medya ve kart sayısı uyarısı sınav gününde yok.
 */
import { describe, expect, it } from "vitest";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Gun, SINAV_ID } from "../../packages/shared/src/m1.ts";
import { checkGun } from "./m1check.ts";
import { checkRules, loadContent, ROOT, unknownKeys } from "./load.ts";

const CDIR = join(ROOT, "content/v2");
const g1 = JSON.parse(readFileSync(join(CDIR, "m1/gun-01.json"), "utf8"));
/** 55. gün biçimi (İÇ-6 #222): başlık, amaç, can_do ve sınav bağı; kart, ders, halka, medya yok */
const sinavGunu = (o: Record<string, unknown> = {}) => ({
  schema: 1, id: "m1:gun:55", day: 55, level: "A1", format: "gun", title_tr: "A1 deneme sınavı", goal_tr: "Anlarsın.",
  can_do: { id: "cd:m1:55", tr: "Anlarım." }, unit: "u:m1:55", arm: "pazar", characters: [],
  requires: { kelimeler: [], kaliplar: [], gramer: [], tur: [], baglayicilar: [], akicilik: [] }, review: { status: "draft" },
  dersler: [], yeni_kartlar: [], sinav: "assess:a1-deneme:1", ...o
});
const ctx = { lexicon: new Set<string>(g1.yeni_kartlar), temel: new Set<string>(["r0:01-tage"]) };

describe("sınav günü şeması", () => {
  it("sinav kimliği: assess:<ad>:<n>", () => {
    for (const ok of ["assess:a1-deneme:1", "assess:a2-deneme:2", "assess:b1:10"]) expect(SINAV_ID.test(ok), ok).toBe(true);
    for (const no of ["assess:a1-deneme", "a1-deneme:1", "assess:A1:1", "assess::1", "assess:a1-:1", "lx:x"]) expect(SINAV_ID.test(no), no).toBe(false);
  });
  it("kartsız, dersiz, halkasız sınav günü şemadan geçer; alan atılmaz (bilinmeyen alan yok)", () => {
    const raw = sinavGunu(); const g = Gun.parse(raw);
    expect(g.sinav).toBe("assess:a1-deneme:1");
    expect(unknownKeys(raw, g)).toEqual([]);
    expect(Gun.safeParse(sinavGunu({ sinav: "a1-deneme" })).success).toBe(false);
  });
});

describe("sınav günü denetimi (checkGun)", () => {
  it("geçerli sınav günü: hata yok; medya ve 'sesler' uyarısı yok", () => {
    const r = checkGun(Gun.parse(sinavGunu()), ctx);
    expect(r.errors).toEqual([]);
    expect(r.warnings.filter((w) => /video|sesler/.test(w))).toEqual([]);
  });
  it("kart, ders ya da halka taşıyan sınav günü hata", () => {
    const e = checkGun(Gun.parse(sinavGunu({ yeni_kartlar: ["lx:Montag"], dersler: ["r0:01-tage"], halkalar: [{ id: "m1:55:h1", title_tr: "x", kartlar: ["lx:Montag"] }] })), ctx).errors;
    expect(e.filter((x) => x.startsWith("sinav:"))).toHaveLength(3);
  });
  it("sınavsız günde medya uyarısı sürer", () => {
    const { sinav: _, ...o } = sinavGunu();
    expect(checkGun(Gun.parse(o), ctx).warnings.some((w) => w.includes("sesler"))).toBe(true);
  });
});

const FX = JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/assess/e2e-deneme.json"), "utf8"));
/** geçici içerik kökü: gerçek kayıtlar + verilen günler ve denemeler */
function kok(gunler: Record<string, unknown>[], denemeler: Record<string, unknown>[] = [FX]) {
  const k = mkdtempSync(join(tmpdir(), "dw-sinav-"));
  for (const f of ["registry", "temel", "world", "curriculum"]) cpSync(join(CDIR, f), join(k, f), { recursive: true });
  mkdirSync(join(k, "m1")); mkdirSync(join(k, "assess"));
  for (const g of gunler) writeFileSync(join(k, `m1/gun-${String(g.day).padStart(2, "0")}.json`), JSON.stringify(g));
  denemeler.forEach((d, i) => writeFileSync(join(k, `assess/deneme-${i}.json`), JSON.stringify(d)));
  const c = checkRules(loadContent(k));
  rmSync(k, { recursive: true, force: true });
  return c;
}
const FXID = "assess:e2e-deneme:1";

describe("doğrulayıcı: sınav günü (geçici içerik kökü)", () => {
  const c = kok([sinavGunu({ sinav: FXID, sinav_bolumler: ["dinleme", "okuma"] }), sinavGunu({ id: "m1:gun:56", day: 56, sinav: "assess:yok:1" })]);
  it("sınav günleri hata vermez (şemada olmayan alan yok, 'dosya yok' sayılmaz); deneme şemadan geçer", () => {
    expect(c.m1.map((x) => x.data.day).sort()).toEqual([55, 56]);
    expect(c.deneme.map((x) => x.data.id)).toEqual([FXID]);
    expect(c.errors.filter((e) => e.includes("gun-55") || e.includes("gun-56") || e.includes("assess/"))).toEqual([]);
  });
  it("bağlı deneme assess/ altında yoksa uyarı (hata değil: deneme dosyası ayrı PR)", () => {
    expect(c.warnings.filter((w) => w.includes("assess/ altında bulunamadı"))).toEqual([expect.stringContaining("gun-56.json: sinav assess:yok:1")]);
  });
  it("bölümsüz sınav günü uyarılır (PM-110: bölümler günlere ayrılır)", () => {
    expect(c.warnings.some((w) => w.includes("gun-56") && w.includes("sinav_bolumler yok"))).toBe(true);
    expect(c.warnings.some((w) => w.includes("gun-55") && w.includes("sinav_bolumler yok"))).toBe(false);
  });
});

describe("sınav günü bölümleri (sinav_bolumler, PM-110)", () => {
  const iki = (b55: unknown, b56: unknown) => kok([sinavGunu({ sinav: FXID, sinav_bolumler: b55 }), sinavGunu({ id: "m1:gun:56", day: 56, sinav: FXID, sinav_bolumler: b56 })]);
  it("55 dinleme + okuma, 56 yazma + konuşma: hata yok", () => {
    const c = iki(["dinleme", "okuma"], ["yazma", "konusma"]);
    expect(c.errors.filter((e) => /gun-5[56]|e2e-deneme|sinav/.test(e))).toEqual([]);
  });
  it("iki günde aynı bölüm hata; açılmayan bölüm hata", () => {
    const c = iki(["dinleme", "okuma"], ["okuma", "konusma"]);
    expect(c.errors.filter((e) => e.includes("okuma 55. günde de açılıyor"))).toHaveLength(1);
    expect(c.errors.filter((e) => e.includes("yazma bölümü hiçbir sınav gününde açılmıyor"))).toHaveLength(1);
  });
  it("bilinmeyen bölüm şemada hata; denemede olmayan bölüm doğrulayıcıda hata", () => {
    expect(Gun.safeParse(sinavGunu({ sinav_bolumler: ["sozluk"] })).success).toBe(false);
    const eksik = { ...FX, bolumler: FX.bolumler.filter((b: { id: string }) => b.id !== "konusma") };
    const c = kok([sinavGunu({ sinav: FXID, sinav_bolumler: ["dinleme", "okuma"] }), sinavGunu({ id: "m1:gun:56", day: 56, sinav: FXID, sinav_bolumler: ["yazma", "konusma"] })], [eksik]);
    expect(c.errors.filter((e) => e.includes("konusma assess:e2e-deneme:1 denemesinde yok"))).toHaveLength(1);
  });
  it("checkGun: sınavsız günde sinav_bolumler, aynı bölüm iki kez ve sınav gününde medya/prova/gün sınavı hata", () => {
    const { sinav: _, ...o } = sinavGunu();
    expect(checkGun(Gun.parse({ ...o, sinav_bolumler: ["dinleme"] }), ctx).errors).toContain("sinav_bolumler: yalnız sınav gününde (sinav bağı yok)");
    expect(checkGun(Gun.parse(sinavGunu({ sinav_bolumler: ["okuma", "okuma"] })), ctx).errors.some((e) => e.includes("aynı bölüm iki kez"))).toBe(true);
    const fazla = checkGun(Gun.parse(sinavGunu({ sinav_bolumler: ["okuma"], prova: g1.prova, gun_sinavi: g1.gun_sinavi })), ctx).errors.filter((e) => e.includes("yalnız deneme açılır"));
    expect(fazla).toHaveLength(g1.prova || g1.gun_sinavi ? 1 : 0);
  });
  it("bozuk deneme (ham puan tutmuyor, madde iki kez) hata", () => {
    const bozuk = structuredClone(FX);
    bozuk.bolumler[0].ham_puan = 3;
    bozuk.bolumler[1].kisimlar[0].maddeler[0].id = bozuk.bolumler[0].kisimlar[0].maddeler[0].id;
    const c = kok([sinavGunu({ sinav: FXID, sinav_bolumler: ["dinleme", "okuma", "yazma", "konusma"] })], [bozuk]);
    expect(c.errors.some((e) => e.includes("dinleme: madde puanları toplamı 2 ≠ ham_puan 3"))).toBe(true);
    expect(c.errors.some((e) => e.includes("madde kimliği iki kez"))).toBe(true);
  });
});
