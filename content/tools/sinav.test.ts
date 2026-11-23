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

describe("doğrulayıcı: sınav günü (geçici içerik kökü)", () => {
  const kok = mkdtempSync(join(tmpdir(), "dw-sinav-"));
  for (const f of ["registry", "temel", "world", "curriculum"]) cpSync(join(CDIR, f), join(kok, f), { recursive: true });
  mkdirSync(join(kok, "m1")); mkdirSync(join(kok, "assess"));
  writeFileSync(join(kok, "m1/gun-55.json"), JSON.stringify(sinavGunu()));
  writeFileSync(join(kok, "m1/gun-56.json"), JSON.stringify(sinavGunu({ id: "m1:gun:56", day: 56, sinav: "assess:yok:1" })));
  writeFileSync(join(kok, "assess/a1-deneme.json"), JSON.stringify({ schema: 1, id: "assess:a1-deneme:1" }));
  const c = checkRules(loadContent(kok));
  rmSync(kok, { recursive: true, force: true });
  it("sınav günleri hata vermez (şemada olmayan alan yok, 'dosya yok' sayılmaz)", () => {
    expect(c.m1.map((x) => x.data.day).sort()).toEqual([55, 56]);
    expect(c.errors.filter((e) => e.includes("gun-55") || e.includes("gun-56"))).toEqual([]);
  });
  it("bağlı deneme assess/ altında yoksa uyarı (hata değil: deneme dosyası ayrı PR)", () => {
    expect(c.warnings.filter((w) => w.includes("assess/ altında bulunamadı"))).toEqual([expect.stringContaining("gun-56.json: sinav assess:yok:1")]);
  });
});
