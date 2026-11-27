/**
 * PM-148 [ANA-T] md. 2 (DENETİM-1 P1-4, P1-5, P1-7): akış gününde BAŞLA akıştaki yerin düğümünde durur ve akışı açar;
 * düğüm ✓'i akıştan. Girdi gerçek 1. gün + planlayıcının gerçek planı (uygulamanın tohumu).
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { genelAdlarAyikla, kumeDizini } from "@dw/shared";
import { loadContent, ROOT } from "../../../content/tools/load.ts";
import { planGun } from "./akis.ts";
import { yeniKayit, ilerle, simdiki, type AkisKaydi } from "./akisKayit.ts";
import { akisKonumu, durakDugumleri, gunAdimlari, gunSonuId, siradaki, type AkisOzet, type Ilerleme } from "./gun.ts";
import type { LearnerItem } from "@dw/shared";
import POLICY from "../policy.json" with { type: "json" };

const c = loadContent();
const genel = genelAdlarAyikla(readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8"));
const temel = c.temel.map((t) => t.data);
const dizin = kumeDizini(c.lexemes, temel, c.world, genel);
const dersler = new Map(temel.map((t) => [t.id, t]));
const g1 = c.m1.find((x) => x.data.day === 1)!.data;
const basliklar = Object.fromEntries(temel.map((t) => [t.id, t.title_tr]));
const plan = planGun({ gun: g1, dersler, dizin, items: new Map(), oncekiKartlar: new Set(), bitenDersler: new Set(), tohum: "akis:1", simdi: new Date("2026-12-01T08:00:00Z") })!;
const ozet = (k: AkisKaydi): AkisOzet => ({ durak: k.durak, biten: k.biten, duraklar: k.plan.duraklar.map((d) => ({ id: d.id, tur: d.tur, title_tr: d.title_tr, tahmini_dk: d.tahmini_dk, eski_anahtar: d.eski_anahtar, ses_turu: d.ses_turu })) });
const ilr = (k: AkisKaydi | null, ek: Partial<Ilerleme> = {}): Ilerleme => ({ dersBitti: new Set(), medyaBitti: new Set(), bahceBitti: new Set(), provaBitti: new Set(), okumaBitti: new Set(), akisBasladi: new Set(k ? [1] : []), ...(k ? { akisOzet: new Map([[1, ozet(k)]]) } : {}), ...ek });
const gun = (i: Ilerleme) => gunAdimlari(g1, i, basliklar, "hepsi");
/** kaydı, `tur` türündeki ilk durağın başına getirir (aradaki duraklar biter) */
const durakBasina = (k: AkisKaydi, kosul: (d: AkisKaydi["plan"]["duraklar"][number]) => boolean): AkisKaydi => {
  let x = k;
  for (let n = 0; n < 2000 && simdiki(x) && !kosul(simdiki(x)!.durak); n++) x = ilerle(x, []).kayit;
  return x;
};

describe("akış günü: BAŞLA ve düğümler (PM-148 [ANA-T] md. 2)", () => {
  it("1. gün akış günü; plan sesle başlar", () => {
    expect(g1.halkalar?.length).toBeGreaterThan(0);
    expect(plan.duraklar[0]!.tur).toBe("ses");
  });
  it("D1-5: akış başlamadıysa BAŞLA ilk durağın (Sesler) düğümünde ve akışı açar", () => {
    const d = gun(ilr(null));
    expect(d.akisKonum).toMatchObject({ baslandi: false, baslik: "Sesler" });
    const s = siradaki(d)!;
    expect(s.tur).toBe("medya"); expect(s.alt).toBe("ses");
    expect(s.href).toBe("#/akis/1");
  });
  it("her durak bir düğüme eşlenir (gün sonu hariç); dil durağı günün dersine", () => {
    const d = gun(ilr(null));
    for (const x of plan.duraklar) {
      const ids = durakDugumleri(1, x, d.adimlar);
      if (x.tur === "gunsonu") expect(ids).toEqual([]);
      else expect(ids.length, `${x.id} (${x.tur})`).toBeGreaterThan(0);
    }
  });
  it("D1-4 + D1-5: akış ilerledikçe BAŞLA şimdiki durağın düğümüne geçer; her zaman akışı açar; başlık durağın adı", () => {
    let k = yeniKayit(plan);
    const gorulen = new Set<string>();
    for (let n = 0; simdiki(k) && n < 400; n++) {
      const d = gun(ilr(k));
      const s = siradaki(d)!;
      expect(s.href, `adım ${n}`).toBe("#/akis/1");
      const dur = simdiki(k)!.durak;
      expect(d.akisKonum!.baslik).toBe(dur.title_tr);
      expect(d.akisKonum!.sira).toBe(k.durak + 1);
      if (dur.tur !== "gunsonu") expect(durakDugumleri(1, dur, d.adimlar)).toContain(s.id);
      gorulen.add(s.tur);
      k = ilerle(k, []).kayit;
    }
    expect([...gorulen]).toEqual(expect.arrayContaining(["medya", "bahce"]));
  });
  it("D1-4: ses ilk turu bitince ses düğümünde ✓ (ilk tur anahtarı); 'şimdi geç' ile atlanan ses ✓ almaz", () => {
    const k = ilerle(yeniKayit(plan), []).kayit; // ses durağı geçildi
    const sesler = g1.sesler.map((s) => s.id);
    const atlandi = gun(ilr(k));
    expect(atlandi.adimlar.filter((a) => a.alt === "ses").every((a) => !a.akisTamam)).toBe(true);
    const bitti = gun(ilr(k, { medyaBitti: new Set(sesler.map((id) => `${id}:1`)) }));
    expect(bitti.adimlar.filter((a) => a.alt === "ses").every((a) => a.akisTamam)).toBe(true);
    expect(siradaki(bitti)!.tur).toBe("bahce");
  });
  it("D1-7: son halka Bahçe anahtarını yazınca BAŞLA eski derse gitmez; dil durakları bitince ders düğümü ✓", () => {
    const k = durakBasina(yeniKayit(plan), (d) => d.tur === "ses" && d.ses_turu === "ikinci");
    const i = ilr(k, { bahceBitti: new Set([1]) });
    const d = gun(i);
    const s = siradaki(d)!;
    expect(s.href).toBe("#/akis/1");
    expect(s.tur).not.toBe("ders");
    const ders = d.adimlar.find((a) => a.tur === "ders")!;
    const dilVar = plan.duraklar.some((x) => x.tur === "dil" && durakDugumleri(1, x, d.adimlar).includes(ders.id));
    if (dilVar) expect(ders.akisTamam).toBe(true);
  });
  it("kayıt yoksa ve gün sessizse BAŞLA Bahçe'de", () => {
    const d = gunAdimlari({ ...g1, sesler: [] }, ilr(null), basliklar, "hepsi");
    expect(akisKonumu({ day: 1, sesler: [] }, d.adimlar, ilr(null)).adim).toBe("bahce:1");
  });
  it("#282 P1-2: gün sonu durağında BAŞLA yolun 'Gün sonu' ucunda ve akışı açar", () => {
    const k = durakBasina(yeniKayit(plan), (d) => d.tur === "gunsonu");
    const d = gun(ilr(k, { medyaBitti: new Set(g1.sesler.flatMap((s) => [`${s.id}:1`, `${s.id}:2`])) }));
    expect(d.akisKonum).toMatchObject({ adim: gunSonuId(1), baslik: "Gün sonu" });
    const s = siradaki(d)!;
    expect(s.id).toBe(gunSonuId(1)); expect(s.href).toBe("#/akis/1");
  });
  it("#282 P2-7: ikinci ses turu bitmeden ses düğümü ✓ almaz; o turda BAŞLA ses düğümünde", () => {
    const k = durakBasina(yeniKayit(plan), (d) => d.tur === "ses" && d.ses_turu === "ikinci");
    if (!k.plan.duraklar.some((x) => x.ses_turu === "ikinci")) return;
    const ilk = new Set(g1.sesler.map((s) => `${s.id}:1`));
    const d = gun(ilr(k, { medyaBitti: ilk, bahceBitti: new Set([1]) }));
    expect(d.adimlar.filter((a) => a.alt === "ses").some((a) => a.akisTamam)).toBe(false);
    expect(siradaki(d)!.alt).toBe("ses");
  });
  it("#282 P2-1: gün bitince de akıştan gelen ✓'ler kalır", () => {
    let k = yeniKayit(plan); for (let n = 0; simdiki(k) && n < 2000; n++) k = ilerle(k, []).kayit;
    const d = gun(ilr(k, { gunBitti: new Set([1]), medyaBitti: new Set(g1.sesler.flatMap((s) => [`${s.id}:1`, `${s.id}:2`])) }));
    expect(d.bitti).toBe(true);
    expect(d.adimlar.find((a) => a.tur === "bahce")!.akisTamam || d.adimlar.find((a) => a.tur === "bahce")!.bitti).toBe(true);
    expect(d.adimlar.filter((a) => a.alt === "ses").every((a) => a.akisTamam)).toBe(true);
  });
  it("#282 P1-1: kayıtsız günde ısınma bekleniyorsa BAŞLA Bahçe'de ('Isınma'); planlayıcının kuralıyla aynı eşik", () => {
    const d = gunAdimlari(g1, ilr(null, { isinmaOnce: new Set([1]) }), basliklar, "hepsi");
    expect(d.akisKonum).toMatchObject({ adim: "bahce:1", baslik: "Isınma", baslandi: false });
    expect(d.adimlar[0]!.tur).toBe("bahce");
    // eşik: 2. gün, 1. günün kartlarının hepsi vadeli → planlayıcı ısınmayla başlar ancak vadeli > halka × halka_tekrar[0] ise
    const g2 = c.m1.find((x) => x.data.day === 2)?.data;
    if (!g2?.halkalar?.length) return;
    const fsrs = { due: "2026-11-30T00:00:00Z", stability: 3, difficulty: 5, scheduled_days: 1, reps: 2, lapses: 0, learning_steps: 0, state: 2 };
    const vadeli = (n: number) => new Map(g1.yeni_kartlar.slice(0, n).map((id) => [id, { itemId: id, kind: "lexeme", passive: { s: 1, n: 2, ok: 2, fsrs }, active: { s: 1, n: 1, ok: 1, sessions: [], fsrs }, durable: false } as unknown as LearnerItem]));
    const esik = g2.halkalar.length * POLICY.akis.halka_tekrar[0]!;
    for (const n of [esik, esik + 1]) {
      if (n > g1.yeni_kartlar.length) continue;
      const p2 = planGun({ gun: g2, dersler, dizin, items: vadeli(n), oncekiKartlar: new Set(g1.yeni_kartlar), bitenDersler: new Set(g1.dersler), tohum: "akis:2", simdi: new Date("2026-12-01T08:00:00Z") })!;
      expect(p2.duraklar[0]!.tur === "isinma", `${n} vadeli kart, eşik ${esik}`).toBe(n > esik);
    }
  });
});
