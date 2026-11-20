/**
 * AKIS AK-9: planlayıcının özellik testleri. Girdi gerçek içerik (sözlük, temel dersler, dünya, M1 1. gün) + İÇ'in 1. gün
 * halka önerisi (fikstür; #165). 50 tohum × 4 öğrenci durumu; her planda AK-2 kuralları, AK-3 kapısı, K3, K5, K8 ve BY-12.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { Halka, bilinmeyenler, kumeDizini, toks, type LearnerItem } from "@dw/shared";
import { loadContent, ROOT } from "../../../content/tools/load.ts";
import { planGun, POLITIKA, KIP, type GunPlani } from "./akis.ts";

const c = loadContent();
const genel = readFileSync(join(ROOT, "docs/v2/reviews/genel-adlar.md"), "utf8").split("\n").filter((l) => l.startsWith("### ")).map((l) => l.slice(4));
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genel);
const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
const g1 = c.m1.find((x) => x.data.day === 1)!.data;
const halkalar = z.array(Halka).parse(JSON.parse(readFileSync(join(ROOT, "content/tools/fixtures/m1/halkalar-gun-01.json"), "utf8")).halkalar);
const gun = { ...g1, halkalar };

const fsrs = (due: string) => ({ due, stability: 3, difficulty: 5, scheduled_days: 1, reps: 2, lapses: 0, learning_steps: 0, state: 2 });
const item = (id: string, due: string): LearnerItem => ({ itemId: id, kind: "lexeme", passive: { s: 1, n: 2, ok: 2, fsrs: fsrs(due) }, active: { s: 1, n: 1, ok: 1, sessions: [], fsrs: fsrs(due) }, durable: false } as unknown as LearnerItem);
const simdi = new Date("2026-12-01T08:00:00Z");
/** 1. gün için "önceki" kart yok; tekrar durumunu sınamak için sözlükten başka kartlar önceki gün sayılır */
const onceki = c.lexemes.filter((l) => l.card !== false && !g1.yeni_kartlar.includes(l.id)).slice(0, 30).map((l) => l.id);
const DURUM: Record<string, { items: Map<string, LearnerItem>; onceki: Set<string> }> = {
  sifir: { items: new Map(), onceki: new Set() },
  kusursuz: { items: new Map(onceki.map((id) => [id, item(id, "2026-12-20T00:00:00Z")])), onceki: new Set(onceki) },
  yuzde30: { items: new Map(onceki.map((id, i) => [id, item(id, i % 3 === 0 ? "2026-11-30T00:00:00Z" : "2026-12-20T00:00:00Z")])), onceki: new Set(onceki) },
  ara: { items: new Map(onceki.map((id) => [id, item(id, "2026-11-20T00:00:00Z")])), onceki: new Set(onceki) }
};
const plan = (tohum: string, durum: keyof typeof DURUM): GunPlani =>
  planGun({ gun, dersler, dizin, items: DURUM[durum]!.items, oncekiKartlar: DURUM[durum]!.onceki, bitenDersler: new Set(), tohum, simdi });

const TOHUMLAR = Array.from({ length: 50 }, (_, i) => `1:t${i}`);
const DURUMLAR = Object.keys(DURUM) as (keyof typeof DURUM)[];

describe("Halka planlayıcısı (AKIS AK-2, AK-3, AK-9)", () => {
  it("aynı girdi aynı planı verir; plan boş değil (BY-2, BY-12)", () => {
    expect(JSON.stringify(plan("1:x", "sifir"))).toBe(JSON.stringify(plan("1:x", "sifir")));
    const p = plan("1:x", "sifir");
    expect(p.duraklar.filter((d) => d.tur === "halka")).toHaveLength(halkalar.length);
    for (const d of p.duraklar.filter((x) => x.tur === "halka")) expect(d.adimlar.length).toBeGreaterThan(0);
  });
  it("kural 1: kullanım tanıtımdan sonra; art arda en çok 2 tanıtım", () => {
    for (const durum of DURUMLAR) for (const t of TOHUMLAR) for (const d of plan(t, durum).duraklar.filter((x) => x.tur === "halka")) {
      const tanit = new Set<string>(); let artarda = 0;
      for (const a of d.adimlar) {
        if (a.tur === "tanit" || a.tur === "kalip") { artarda++; expect(artarda, `${t} ${d.id}`).toBeLessThanOrEqual(POLITIKA.tanitim_art_arda); a.kartlar.forEach((x) => tanit.add(x)); continue; }
        artarda = 0;
        for (const k of a.kartlar) if (gun.yeni_kartlar.includes(k) && d.adimlar.some((b) => b.tur === "tanit" && b.kartlar.includes(k))) expect(tanit.has(k), `${t} ${d.id} ${k} ${a.tur}`).toBe(true);
      }
    }
  });
  it("kural 3: halkada aynı tür art arda yok; aynı kip art arda en çok 2 (gevşetme kayıtlı)", () => {
    for (const durum of DURUMLAR) for (const t of TOHUMLAR) {
      const p = plan(t, durum);
      for (const d of p.duraklar.filter((x) => x.tur === "halka")) {
        d.adimlar.forEach((a, i) => { if (i > 0) expect(a.tur === d.adimlar[i - 1]!.tur && !p.gevseme.some((g) => g.kural === "tur" && g.yer === d.id), `${t} ${d.id} ${i} ${a.tur}`).toBe(false); });
        d.adimlar.forEach((a, i) => { if (i > 1 && a.kip === d.adimlar[i - 1]!.kip && a.kip === d.adimlar[i - 2]!.kip) expect(p.gevseme.some((g) => (g.kural === "kip" || g.kural === "tur") && g.yer === d.id), `${t} ${d.id} ${i}`).toBe(true); });
      }
    }
  });
  it("kural 2 (K3): her yeni kelime gün içinde ≥ 3 türde ve ≥ 2 cümlede; ≥ 2 kullanımı kendi halkasında", () => {
    for (const t of TOHUMLAR.slice(0, 10)) {
      const p = plan(t, "sifir");
      const tur = new Map<string, Set<string>>(), cumle = new Map<string, Set<string>>();
      for (const d of p.duraklar) for (const a of d.adimlar) for (const k of a.kartlar) { (tur.get(k) ?? tur.set(k, new Set()).get(k)!).add(a.tur); if (a.cumle) (cumle.get(k) ?? cumle.set(k, new Set()).get(k)!).add(a.cumle); }
      const eksik = gun.yeni_kartlar.filter((k) => (tur.get(k)?.size ?? 0) < POLITIKA.kelime_tur_min || (cumle.get(k)?.size ?? 0) < POLITIKA.kelime_cumle_min);
      // eksik kalan kart planın gevşetme kaydında olmalı (İÇ eksik cümleyi bu rapordan yazar, K4)
      for (const k of eksik) expect(p.gevseme.some((g) => g.kart === k), `${t} ${k}`).toBe(true);
      expect(eksik.length, `${t}: ${eksik.join(", ")}`).toBeLessThanOrEqual(3);
      for (const d of p.duraklar.filter((x) => x.tur === "halka")) {
        const h = halkalar.find((x) => x.id === d.id)!;
        for (const k of h.kartlar) expect(d.adimlar.filter((a) => a.tur !== "tanit" && a.tur !== "eslestir" && a.tur !== "sahne" && a.kartlar.includes(k)).length, `${t} ${d.id} ${k}`).toBeGreaterThanOrEqual(2);
      }
    }
  });
  it("AK-3: görev adımında K(t) dışında sözcük 0 (kapı hiç gevşemez)", () => {
    for (const durum of DURUMLAR) for (const t of TOHUMLAR.slice(0, 10)) {
      const p = plan(t, durum); const bil = new Set(DURUM[durum]!.onceki);
      for (const d of p.duraklar) for (const a of d.adimlar) {
        if (a.tur === "tanit") a.kartlar.forEach((k) => bil.add(k));
        if (!a.cumle || ["tanit", "kalip", "sahne", "eslestir", "listen_meaning", "resimden_sec"].includes(a.tur)) continue;
        expect(bilinmeyenler(dizin, a.cumle, { kart: bil, biten: new Set() }), `${t} ${d.id} ${a.tur}: ${a.cumle} ${JSON.stringify(bilinmeyenler(dizin, a.cumle, { kart: bil, biten: new Set() }))}`).toEqual([]);
      }
    }
  });
  it("K5: üretim adımında (TR→DE, dikte, söyle) çerçeve sözcükleri önce en az 2 adımda görülmüş", () => {
    for (const t of TOHUMLAR.slice(0, 10)) {
      const p = plan(t, "sifir"); const gor = new Map<string, number>();
      for (const d of p.duraklar) for (const a of d.adimlar) {
        if (a.cumle && ["dikte", "soyle", "tr_de"].includes(a.tur))
          for (const w of toks(a.cumle)) { const ids = dizin.idx.get(w); if (ids && [...ids].every((i) => dizin.cerceve.has(i))) expect(gor.get(w) ?? 0, `${t} ${a.tur} ${w}: ${a.cumle}`).toBeGreaterThanOrEqual(POLITIKA.cerceve_uretim_min); }
        for (const w of new Set(toks(a.cumle))) gor.set(w, (gor.get(w) ?? 0) + 1);
      }
    }
  });
  it("K8: dersin kelime tanıtımı halkada; dil durağında kelime tanıtımı yok; her kelime günde bir kez tanıtılır", () => {
    const p = plan("1:k8", "sifir");
    const tanit = p.duraklar.flatMap((d) => d.adimlar.filter((a) => a.tur === "tanit").flatMap((a) => a.kartlar));
    expect(new Set(tanit).size).toBe(tanit.length);
    expect(p.duraklar.filter((d) => d.tur === "dil").flatMap((d) => d.adimlar).some((a) => a.tur === "tanit")).toBe(false);
    const dersKelime = [...dersler.get(g1.dersler[0]!)!.teach].filter((x) => x.lexeme && g1.yeni_kartlar.includes(x.lexeme)).map((x) => x.lexeme);
    for (const k of dersKelime) expect(p.duraklar.some((d) => d.tur === "halka" && d.adimlar.some((a) => a.tur === "tanit" && a.kartlar.includes(k!) && a.ders))).toBe(true);
  });
  it("K1: 4 seans, sırayla; her adımın kipi türüyle uyumlu; eski anahtarlar (AK-6)", () => {
    const p = plan("1:k1", "sifir");
    const s = p.duraklar.map((d) => d.seans);
    expect(Math.min(...s)).toBe(1); expect(Math.max(...s)).toBeLessThanOrEqual(4);
    s.forEach((x, i) => { if (i) expect(x).toBeGreaterThanOrEqual(s[i - 1]!); });
    for (const d of p.duraklar) for (const a of d.adimlar) expect(a.kip).toBe(KIP[a.tur]);
    expect(p.duraklar.filter((d) => d.tur === "halka").at(-1)!.eski_anahtar).toBe("m1:bahce:1");
    expect(p.duraklar.at(-1)!.tur).toBe("gunsonu");
    // AK-2 kural 5: halka mini sahneyle biter
    for (const t of TOHUMLAR.slice(0, 10)) for (const d of plan(t, "yuzde30").duraklar.filter((x) => x.tur === "halka")) expect(d.adimlar.at(-1)!.tur, `${t} ${d.id}`).toBe("sahne");
  });
});
