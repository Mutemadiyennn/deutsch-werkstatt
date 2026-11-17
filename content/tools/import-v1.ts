/**
 * v1 kurs içeriğini (app/content/kurs/units/*.json) v2 kayıtlarına aktarır. Deterministik ve tekrar çalıştırılabilir.
 *   → content/v2/registry/lexemes.v1.json   715 kelime (+ 2.860 örnek cümle)
 *   → content/v2/registry/grammar.json      202 dilbilgisi bloğu (Türkçe)
 *   → content/v2/assess/bank.json           seviye tespiti madde havuzu (v1'in onaylı alıştırmalarından)
 * v1 içeriği bağımsız dilbilimci incelemesinden geçmiştir (A1 a1-07…14 ve b1-14 örnek cümleleri hariç; bkz. docs/v2/AUDIT.md).
 * Kullanım: npm run content:import
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const SRC = join(ROOT, "app/content/kurs/units");
const OUT = join(ROOT, "content/v2");

type V1Word = { de: string; art: string; pl: string; tr: string; t: "n" | "v" | "a" | "x"; img?: string; ex?: { de: string; tr: string; img?: string }[] };
type V1Drill = Record<string, any> & { k: string };
type V1Unit = { id: string; lvl: string; teach: any[]; words: V1Word[]; drills: V1Drill[]; test: V1Drill[] };

/** Küçük, tohumlu rastgele sayı üreteci (mulberry32): her çalıştırmada aynı sonuç */
export function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const norm = (s: string) => s.toLowerCase().replace(/[.,;:!?()"'“”]/g, "").replace(/\s+/g, " ").trim();
/** Anlam parçaları: parantez içi atılır, virgül/noktalı virgülle bölünür ("telefonla aramak (ruft … an)" → ["telefonla aramak"]) */
const senses = (tr: string) => tr.toLowerCase().replace(/\([^)]*\)/g, "").split(/[,;]/).map((x) => x.trim()).filter(Boolean);
/** Aynı kelimenin iki v1 kaydı en az bir anlam parçasını paylaşıyorsa aynı kelimedir */
export const sameSense = (a: string, b: string) => { const A = new Set(senses(a)); return senses(b).some((x) => A.has(x)); };
/** Elle kontrol edildi: v1'de farklı yazılmış ama aynı anlamdaki kayıtlar */
const SAME_SENSE_MANUAL = new Set(["obwohl", "Studium"]);
const levelOf = (u: V1Unit) => u.id.slice(0, 2).toUpperCase() as "A1" | "A2" | "B1";
const POS = { n: "noun", v: "verb", a: "adj", x: "phrase" } as const;

export function importV1(units: V1Unit[]) {
  /* ---- kelimeler: aynı yazım + aynı anlam → tek kayıt; anlam farklıysa #2 ---- */
  const lex: any[] = [];
  const byDe = new Map<string, any[]>();
  for (const u of units) {
    u.words.forEach((w) => {
      const same = (byDe.get(w.de) || []).find((x) => SAME_SENSE_MANUAL.has(w.de) || sameSense(x.tr, w.tr));
      const key = `${u.id}:w:${w.de}`;
      const exs = (w.ex || []).map((e, j) => ({ id: `${u.id}:${w.de}:${j}`, de: e.de, tr: e.tr, ...(e.img ? { img: e.img } : {}), layer: "hd" }));
      if (same) {
        same.legacy.push({ unit: u.id, key });
        same.examples.push(...exs);
        return;
      }
      const list = byDe.get(w.de) || [];
      const id = `lx:${w.de.replace(/\s+/g, "_")}${list.length ? "#" + (list.length + 1) : ""}`;
      const rec: any = {
        id, de: w.de, tr: w.tr, pos: POS[w.t] || "other",
        ...(w.t === "n" && w.art ? { art: w.art } : {}),
        ...(w.t === "n" && w.pl ? { pl: w.pl } : {}),
        ...(w.img ? { img: w.img } : {}),
        collocations: [], patterns: [], register: "neutral", related: [], mistakes_tr: [],
        examples: exs, level: levelOf(u), legacy: [{ unit: u.id, key }]
      };
      list.push(rec); byDe.set(w.de, list); lex.push(rec);
    });
  }

  /* ---- dilbilgisi ---- */
  const grammar = units.flatMap((u) =>
    u.teach.map((t) => ({ id: `gr:${u.id}:${t.id}`, unit: u.id, h_tr: t.h_tr, tr: t.tr, ...(t.table ? { table: t.table } : {}), ex: t.ex || [] }))
  );

  /* ---- seviye tespiti havuzu ---- */
  const bank: any[] = [];
  const r = rng(20261117);
  for (const lvl of ["A1", "A2", "B1"] as const) {
    const pool = lex.filter((x) => x.level === lvl);
    for (const x of pool) {
      // pasif: aynı seviye ve aynı sözcük türünden 3 çeldirici; anlamları farklı olmalı
      const cands = pool.filter((y) => y !== x && y.pos === x.pos && norm(y.tr) !== norm(x.tr));
      const picked: any[] = [];
      while (picked.length < 3 && cands.length) picked.push(cands.splice(Math.floor(r() * cands.length), 1)[0]);
      if (picked.length === 3) {
        const ans = Math.floor(r() * 4);
        const opts = picked.map((p) => p.tr);
        opts.splice(ans, 0, x.tr);
        bank.push({ id: `as:vp:${x.id}`, skill: "vocab_passive", level: lvl, source: x.legacy[0].key, de: (x.art ? x.art + " " : "") + x.de, opts_tr: opts, ans });
      }
      // aktif: Türkçeden Almancaya (isimlerde artikel ile)
      bank.push({ id: `as:va:${x.id}`, skill: "vocab_active", level: lvl, source: x.legacy[0].key, tr: x.tr, answers: [x.de], ...(x.art ? { art: x.art } : {}) });
    }
  }
  for (const u of units) {
    const lvl = levelOf(u);
    [...u.drills, ...u.test].forEach((d, i) => {
      const src = `${u.id}:${i < u.drills.length ? "drills" : "test"}:${i < u.drills.length ? i : i - u.drills.length}`;
      if (d.k === "listen" && Array.isArray(d.opts_tr) && typeof d.ans === "number")
        bank.push({ id: `as:li:${src}`, skill: "listening", level: lvl, source: src, de: d.de, opts_tr: d.opts_tr, ans: d.ans });
      if (d.k === "order" && d.de && d.de.split(/\s+/).length >= 3 && d.de.split(/\s+/).length <= 10)
        bank.push({ id: `as:bu:${src}`, skill: "building", level: lvl, source: src, tr: d.tr, de: d.de, alt: d.alt || [] });
      if (d.k === "say" && d.de && d.tr && d.de.split(/\s+/).length <= 9)
        bank.push({ id: `as:sp:${src}`, skill: "speaking", level: lvl, source: src, tr: d.tr, de: d.de, alt: d.alt || [] });
    });
  }
  return { lexemes: lex, grammar, bank };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const units: V1Unit[] = readdirSync(SRC).filter((f) => f.endsWith(".json")).sort().map((f) => JSON.parse(readFileSync(join(SRC, f), "utf8")));
  const { lexemes, grammar, bank } = importV1(units);
  for (const d of ["registry", "assess"]) mkdirSync(join(OUT, d), { recursive: true });
  const w = (p: string, v: unknown) => writeFileSync(join(OUT, p), JSON.stringify(v, null, 1) + "\n");
  w("registry/lexemes.v1.json", lexemes);
  w("registry/grammar.json", grammar);
  w("assess/bank.json", bank);
  const by = (s: string) => bank.filter((b) => b.skill === s).length;
  console.log(`v1 → v2: ${units.length} ünite · ${lexemes.length} kelime (${lexemes.reduce((a, l) => a + l.examples.length, 0)} örnek cümle) · ${grammar.length} dilbilgisi · havuz ${bank.length} madde (pasif ${by("vocab_passive")}, aktif ${by("vocab_active")}, dinleme ${by("listening")}, cümle ${by("building")}, konuşma ${by("speaking")})`);
}
