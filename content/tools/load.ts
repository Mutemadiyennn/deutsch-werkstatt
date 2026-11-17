/**
 * İçerik dosyalarını okur, şemalarla doğrular ve PEDAGOGY.md kurallarını uygular.
 * validate.ts, build.ts ve testler bunu kullanır.
 *
 * Kelime kaynakları ve öncelik (aynı kimlik birden fazla yerdeyse):
 *   registry/lexicon/batch-*.json (LEX ajanı, derin/hafif kart)  >  registry/lexemes.v2.json (BM)  >  registry/lexemes.v1.json (v1 aktarımı)
 *   domains/<alan>/proposals.json (YAZAR önerisi) yalnızca kayıtta olmayan kimlikler için geçerlidir.
 * v1 kayıtlarının legacy anahtarları her zaman korunur (ilerleme taşıma).
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { Domain, Lexeme, LexiconBatch, Pattern, GrammarNote, Scenario, AssessItem, PRODUCTION_DRILLS, productionCount } from "../../packages/shared/src/content.ts";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const CDIR = join(ROOT, "content/v2");

export interface Loaded {
  domains: Domain[];
  lexemes: Lexeme[];
  lexiconBatches: { file: string; batch: string; status: string; count: number }[];
  patterns: Pattern[];
  grammar: GrammarNote[];
  scenarios: { file: string; data: Scenario }[];
  assess: AssessItem[];
  errors: string[];
  warnings: string[];
}

const rel = (f: string) => relative(ROOT, f);
function parseFile<T>(file: string, schema: z.ZodType<T>, errors: string[]): T | null {
  if (!existsSync(file)) return null;
  let raw: unknown;
  try { raw = JSON.parse(readFileSync(file, "utf8")); } catch (e) { errors.push(`${rel(file)}: JSON okunamadı (${(e as Error).message})`); return null; }
  const r = schema.safeParse(raw);
  if (!r.success) { for (const i of r.error.issues.slice(0, 25)) errors.push(`${rel(file)}: ${i.path.join(".")} — ${i.message}`); return null; }
  return r.data;
}
function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith(".json")) out.push(p);
  }
  return out.sort();
}

const Proposals = z.object({ lexemes: z.array(Lexeme).default([]), patterns: z.array(Pattern).default([]) });

export function loadContent(dir = CDIR): Loaded {
  const errors: string[] = [], warnings: string[] = [];
  const domains = parseFile(join(dir, "domains.json"), z.array(Domain), errors) || [];
  const v1 = parseFile(join(dir, "registry/lexemes.v1.json"), z.array(Lexeme), errors) || [];
  const v2 = parseFile(join(dir, "registry/lexemes.v2.json"), z.array(Lexeme), errors) || [];
  const lexiconBatches: Loaded["lexiconBatches"] = [];
  const deep: Lexeme[] = [];
  for (const f of walk(join(dir, "registry/lexicon"))) {
    const b = parseFile(f, LexiconBatch, errors);
    if (!b) continue;
    lexiconBatches.push({ file: rel(f), batch: b.batch, status: b.review.status, count: b.items.length });
    const seen = new Set(deep.map((x) => x.id));
    for (const it of b.items) { if (seen.has(it.id)) errors.push(`${rel(f)}: kelime ${it.id} başka bir partide de var`); deep.push(it); }
  }
  // birleştirme: üst kaynak kazanır, legacy anahtarları korunur
  const byId = new Map<string, Lexeme>();
  for (const src of [v1, v2, deep]) for (const l of src) {
    const prev = byId.get(l.id);
    const legacy = [...(prev?.legacy || []), ...l.legacy].filter((x, i, a) => a.findIndex((y) => y.key === x.key) === i);
    byId.set(l.id, { ...l, legacy });
  }
  const patterns = [...(parseFile(join(dir, "registry/patterns.json"), z.array(Pattern), errors) || [])];
  for (const f of walk(join(dir, "domains")).filter((f) => f.endsWith("/proposals.json"))) {
    const p = parseFile(f, Proposals, errors);
    if (!p) continue;
    for (const l of p.lexemes) { if (byId.has(l.id)) warnings.push(`${rel(f)}: ${l.id} kayıtta zaten var; öneri yok sayıldı`); else byId.set(l.id, l); }
    for (const pt of p.patterns) { if (patterns.some((x) => x.id === pt.id)) errors.push(`${rel(f)}: kalıp ${pt.id} kayıtta zaten var`); else patterns.push(pt); }
  }
  const grammar = parseFile(join(dir, "registry/grammar.json"), z.array(GrammarNote), errors) || [];
  const assess = parseFile(join(dir, "assess/bank.json"), z.array(AssessItem), errors) || [];
  const scenarios = walk(join(dir, "domains"))
    .filter((f) => f.includes("/scenarios/"))
    .map((f) => ({ file: rel(f), data: parseFile(f, Scenario, errors) }))
    .filter((x): x is { file: string; data: Scenario } => !!x.data);
  return { domains, lexemes: [...byId.values()], lexiconBatches, patterns, grammar, scenarios, assess, errors, warnings };
}

/** PEDAGOGY.md §2: derin (K1) ve hafif (K2) kart zorunlu alanları */
export function checkLexeme(l: Lexeme): string[] {
  const e: string[] = [];
  if (!l.tier) return e;
  const alltag = l.examples.filter((x) => x.layer === "alltag").length;
  if (l.pos === "noun" && (!l.art || !l.pl)) e.push("isimde artikel ve çoğul zorunlu (çoğulu yoksa '-')");
  if (!l.freqRank && !l.domains.length) e.push("freqRank ya da domains gerekli");
  if (l.tier === "K1") {
    if (l.pos === "verb" && !(l.verb?.praesens3 && l.verb?.perfekt && l.verb?.aux)) e.push("fiilde praesens3, perfekt ve aux zorunlu");
    if (l.collocations.length < 2) e.push("en az 2 collocation");
    if (l.patterns.length < 1) e.push("en az 1 kalıp bağlantısı");
    if (l.mistakes_tr.length < 1) e.push("en az 1 mistakes_tr");
    if (l.examples.length < 4) e.push("en az 4 örnek");
    if (alltag < 1) e.push("en az 1 alltag örnek");
    if (!l.examples.some((x) => x.dialog)) e.push("en az 1 diyalog içi örnek");
  }
  if (l.tier === "K2") {
    if (l.pos === "verb" && !l.verb?.perfekt) e.push("fiilde perfekt zorunlu");
    if (l.examples.length < 2 || alltag < 1) e.push("en az 2 örnek (1'i alltag)");
    if (l.collocations.length < 1) e.push("en az 1 collocation");
    if (!l.freqRank) e.push("freqRank zorunlu");
  }
  return e;
}

/** PEDAGOGY.md §3: temel kalıp kuralları */
export function checkPattern(p: Pattern): string[] {
  const e: string[] = [];
  if (!p.core) return e;
  if (!p.slots.length) e.push("en az 1 slot");
  for (const s of p.slots) if (s.fills.length < 8) e.push(`slot '${s.name}' için en az 8 doldurma (${s.fills.length})`);
  if (p.examples.length < 10) e.push(`en az 10 örnek (${p.examples.length})`);
  if (!p.examples.some((x) => x.layer === "alltag")) e.push("en az 1 alltag örnek");
  if (Object.keys(p.transforms).length < 4) e.push("en az 4 dönüşüm (soru, olumsuz, kibar, Perfekt, weil/dass/wenn)");
  if (p.mistakes_tr.length < 1) e.push("en az 1 mistakes_tr");
  const lines = p.grammar_tr.split(/(?<=[.!?])\s+/).filter(Boolean).length;
  if (lines > 6 || p.grammar_tr.length > 600) e.push("Türkçe not 2–4 satırı aşıyor");
  return e;
}

/** PEDAGOGY.md §5: senaryo standardı */
export function checkScenario(s: Scenario): string[] {
  const e: string[] = [];
  const n = (a: unknown[]) => a.length;
  const rng = (v: number, lo: number, hi: number, what: string) => { if (v < lo || v > hi) e.push(`${what}: ${v} (beklenen ${lo}–${hi})`); };
  rng(n(s.essentials.lexemes), 12, 20, "temel kelime");
  rng(n(s.essentials.chunks), 8, 15, "temel ifade");
  rng(n(s.essentials.patterns), 3, 6, "temel kalıp");
  if (n(s.build) < 25) e.push(`aşama 3 cümle kurma en az 25 (${n(s.build)})`);
  if (n(s.drills) < 35) e.push(`aşama 4 alıştırma en az 35 (${n(s.drills)})`);
  for (const k of ["gap", "order", "transform", "guided_response", "listen_and_respond", "tr_de"]) if (!s.drills.some((d) => d.k === k)) e.push(`alıştırma türü eksik: ${k}`);
  if (n(s.dialogues) < 3) e.push(`en az 3 diyalog çeşidi (${n(s.dialogues)})`);
  for (const d of s.dialogues) for (const l of d.lines.filter((x) => x.r === "B")) {
    if (!l.starter || !l.keywords?.length || !l.hint_tr) e.push(`${d.id}: öğrenci satırında 4 destek düzeyi eksik: "${l.de}"`);
    if ((l.accepted?.length || 0) < 3) e.push(`${d.id}: öğrenci satırında accepted ≥3 değil: "${l.de}"`);
  }
  if (s.roleplay.levels.length < 3) e.push("rol oyunu: 3 zorluk düzeyi");
  if (s.roleplay.surprises.length < 3) e.push("rol oyunu: en az 3 sürpriz");
  const os = s.otherSide;
  if (n(os) < 12) e.push(`otherSide en az 12 (${n(os)})`);
  if (os.filter((o) => o.layer === "alltag").length * 2 < n(os)) e.push(`otherSide'ın en az yarısı alltag (${os.filter((o) => o.layer === "alltag").length}/${n(os)})`);
  const qs = s.listening.reduce((a, l) => a + l.qs.length, 0);
  if (qs < 6) e.push(`dinleme sorusu en az 6 (${qs})`);
  for (const l of s.listening) { if (l.qs[0]?.kind !== "gist") e.push(`${l.id}: ilk soru ana fikir (gist) olmalı`); for (const q of l.qs) if (q.ans >= q.opts.length) e.push(`${l.id}: doğru şık dizinin dışında`); }
  if (n(s.speaking) < 3) e.push(`konuşma görevi en az 3 (${n(s.speaking)})`);
  if (n(s.missions) < 1) e.push("en az 1 dış görev (mission)");
  const prod = productionCount(s);
  if (prod < 80) e.push(`üretim maddesi en az 80 (${prod})`);
  for (const b of s.build) if (b.accepted.length < 3) e.push(`build ${b.id}: accepted ≥3 değil`);
  // D-064: üretim maddelerinde (build + tr_de, guided_response, transform, listen_and_respond) en az 3 kabul edilen cevap
  for (const d of s.drills) if (["tr_de", "guided_response", "transform", "listen_and_respond"].includes(d.k) && "accepted" in d && d.accepted.length < 3) e.push(`drill ${d.id} (${d.k}): accepted ≥3 değil (${d.accepted.length})`);
  // D-065: her dinleme parçası en az bir hızda
  for (const l of s.listening) if (!l.speeds.length) e.push(`${l.id}: speeds boş`);
  return e;
}

export function checkRules(c: Loaded, opts: { strictPatterns?: boolean } = {}): Loaded {
  const { errors, warnings } = c;
  const dupes = (ids: string[], what: string) => { const seen = new Set<string>(); for (const id of ids) { if (seen.has(id)) errors.push(`${what}: tekrar eden kimlik ${id}`); seen.add(id); } return seen; };
  const dom = dupes(c.domains.map((d) => d.id), "alan");
  const lx = new Set(c.lexemes.map((l) => l.id));
  const pt = dupes(c.patterns.map((p) => p.id), "kalıp");
  const ptById = new Map(c.patterns.map((p) => [p.id, p]));
  dupes(c.grammar.map((g) => g.id), "dilbilgisi");
  dupes(c.assess.map((a) => a.id), "seviye tespiti");
  dupes(c.scenarios.map((s) => s.data.id), "senaryo");
  const units = new Set(c.grammar.map((g) => g.unit));
  for (const d of c.domains) for (const u of d.legacyUnits) if (!units.has(u)) errors.push(`alan ${d.id}: v1 ünitesi ${u} bulunamadı`);
  for (const l of c.lexemes) {
    for (const p of l.patterns) if (!pt.has(p)) errors.push(`${l.id}: kalıp ${p} yok`);
    for (const r of l.related) if (!lx.has(r)) warnings.push(`${l.id}: ilgili kelime ${r} yok`);
    for (const x of checkLexeme(l)) errors.push(`${l.id} (${l.tier}): ${x}`);
  }
  for (const p of c.patterns) for (const x of checkPattern(p)) errors.push(`${p.id}: ${x}`);
  for (const a of c.assess) if ((a.skill === "vocab_passive" || a.skill === "listening") && (a.ans < 0 || a.ans >= a.opts_tr.length)) errors.push(`${a.id}: doğru şık dizinin dışında`);
  const patternDomains = new Map<string, Set<string>>();
  for (const { file, data: s } of c.scenarios) {
    if (!dom.has(s.domain)) errors.push(`${file}: alan ${s.domain} yok`);
    if (!s.id.startsWith(`sc:${s.domain}:`)) errors.push(`${file}: kimlik alanla başlamalı (sc:${s.domain}:…)`);
    const ch = new Set(s.chunks.map((x) => x.id));
    for (const id of [...s.essentials.lexemes, ...s.extras.lexemes]) if (!lx.has(id)) errors.push(`${file}: kelime ${id} kayıtta yok`);
    for (const id of [...s.essentials.chunks, ...s.extras.chunks]) if (!ch.has(id)) errors.push(`${file}: ifade ${id} senaryoda tanımlı değil`);
    for (const id of s.essentials.patterns) { if (!pt.has(id)) errors.push(`${file}: kalıp ${id} kayıtta yok`); (patternDomains.get(id) || patternDomains.set(id, new Set()).get(id)!).add(s.domain); }
    // D-063: kalıp kapısı — incelenmiş senaryonun bütün temel kalıpları incelenmiş olmalı; taslakta uyarı
    const unrev = s.essentials.patterns.filter((id) => ptById.get(id)?.review?.status !== "reviewed");
    if (unrev.length) (s.review.status === "reviewed" || opts.strictPatterns ? errors : warnings).push(`${file}: temel kalıplar incelenmemiş (${unrev.length}/${s.essentials.patterns.length}): ${unrev.join(", ")}`);
    for (const k of s.chunks) {
      if (!k.id.startsWith(`ch:${s.domain}:`)) errors.push(`${file}: ifade ${k.id} alan önekiyle başlamalı`);
      for (const l of k.lexemes) if (!lx.has(l)) errors.push(`${file}: ${k.id} → kelime ${l} yok`);
      if (k.pattern && !pt.has(k.pattern)) errors.push(`${file}: ${k.id} → kalıp ${k.pattern} yok`);
      if (k.layers.bair?.status === "verified" && !k.layers.bair.source) errors.push(`${file}: ${k.id} Bairisch 'verified' ama kaynak yok`);
    }
    for (const b of s.build) { if (b.pattern && !pt.has(b.pattern)) errors.push(`${file}: build ${b.id} → kalıp ${b.pattern} yok`); if (b.chunk && !ch.has(b.chunk)) errors.push(`${file}: build ${b.id} → ifade ${b.chunk} yok`); }
    for (const m of s.missions) for (const p of m.prep) if (!ch.has(p)) errors.push(`${file}: görev ${m.id} → ifade ${p} yok`);
    const os = new Set(s.otherSide.map((o) => o.id));
    for (const r of s.responses) if (!os.has(r.to)) errors.push(`${file}: cevap ${r.to} karşı taraf sözlerinde yok`);
    for (const d of s.drills) if (d.k === "pick" && d.ans >= d.opts.length) errors.push(`${file}: ${d.id} doğru şık dizinin dışında`);
    for (const x of checkScenario(s)) errors.push(`${file}: ${x}`);
    if (s.review.status === "draft") warnings.push(`${file}: inceleme bekliyor (draft)`);
  }
  // §3: her temel kalıp en az N farklı alanda (pilotta 2)
  for (const p of c.patterns.filter((p) => p.core)) {
    const n = patternDomains.get(p.id)?.size || 0;
    if (n < 2) (opts.strictPatterns ? errors : warnings).push(`kalıp ${p.id}: yalnızca ${n} alanda kullanılıyor (pilotta en az 2)`);
  }
  return c;
}
