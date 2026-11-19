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
import { Domain, Lexeme, LexiconBatch, Pattern, GrammarNote, Scenario, AssessItem, World, TemelDers, PRODUCTION_DRILLS, productionCount } from "../../packages/shared/src/content.ts";
import { Gun } from "../../packages/shared/src/m1.ts";
import { checkGun } from "./m1check.ts";
import { explanationIssues, textIssues } from "../../packages/shared/src/explain.ts";
import { untaught } from "./teach.ts";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const CDIR = join(ROOT, "content/v2");

export interface Loaded {
  domains: Domain[];
  lexemes: Lexeme[];
  lexiconBatches: { file: string; batch: string; status: string; okur?: string; count: number; ids: string[] }[];
  patterns: Pattern[];
  grammar: GrammarNote[];
  scenarios: { file: string; data: Scenario }[];
  assess: AssessItem[];
  world?: World | null;
  /** R0 temel paket (content/v2/temel/r0-NN-*.json) */
  temel: { file: string; data: TemelDers }[];
  /** M1 İlk Hafta günleri (content/v2/m1/gun-NN.json; #58 A2/A4) */
  m1: { file: string; data: Gun }[];
  /** K1 seçim listesi (content/v2/curriculum/k1.json) */
  k1?: { cekirdek: string[]; pasif: string[] } | null;
  /** #58 B4 tabanı ve incelenmiş hassas konular (content/tools/b4-taban.json; yalnızca depo içeriği yüklenince) */
  b4Taban?: B4Taban;
  errors: string[];
  warnings: string[];
}

const rel = (f: string) => relative(ROOT, f);
export function parseFile<T>(file: string, schema: z.ZodType<T>, errors: string[]): T | null {
  if (!existsSync(file)) return null;
  let raw: unknown;
  try { raw = JSON.parse(readFileSync(file, "utf8")); } catch (e) { errors.push(`${rel(file)}: JSON okunamadı (${(e as Error).message})`); return null; }
  const r = schema.safeParse(raw);
  if (!r.success) { for (const i of r.error.issues.slice(0, 25)) errors.push(`${rel(file)}: ${i.path.join(".")} — ${i.message}`); return null; }
  // PM-042 A.3: şemada olmayan alan sessizce atılmaz → hata (İçerik Motoru şema isteğini #12'ye yazar)
  const unk = unknownKeys(raw, r.data);
  for (const k of unk.slice(0, 25)) errors.push(`${rel(file)}: ${k} — şemada olmayan alan`);
  if (unk.length > 25) errors.push(`${rel(file)}: … ve ${unk.length - 25} şemada olmayan alan daha`);
  return r.data;
}
/** Ham JSON'da olup ayrıştırılmış veride olmayan anahtarlar (zod bilinmeyen alanları atar) */
export function unknownKeys(raw: unknown, parsed: unknown, path = ""): string[] {
  if (Array.isArray(raw) && Array.isArray(parsed)) return raw.flatMap((x, i) => unknownKeys(x, parsed[i], `${path}[${i}]`));
  if (raw && typeof raw === "object" && parsed && typeof parsed === "object" && !Array.isArray(raw)) {
    const out: string[] = [];
    for (const [k, v] of Object.entries(raw)) {
      const p = path ? `${path}.${k}` : k;
      if (!(k in (parsed as Record<string, unknown>))) out.push(p);
      else out.push(...unknownKeys(v, (parsed as Record<string, unknown>)[k], p));
    }
    return out;
  }
  return [];
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

const ReviewStateLoose = z.object({ status: z.string() }).passthrough();
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
    lexiconBatches.push({ file: rel(f), batch: b.batch, status: b.review.status, okur: b.review.okur, count: b.items.length, ids: b.items.map((x) => x.id) });
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
  const worldFile = join(dir, "world/world.json");
  const world = existsSync(worldFile) ? parseFile(worldFile, World, errors) : undefined;
  const temel = walk(join(dir, "temel"))
    .filter((f) => /\/r0-\d{2}-[^/]+\.json$/.test(f))
    .map((f) => ({ file: rel(f), data: parseFile(f, TemelDers, errors) }))
    .filter((x): x is { file: string; data: TemelDers } => !!x.data);
  const m1 = walk(join(dir, "m1"))
    .filter((f) => /\/gun-\d{2}\.json$/.test(f))
    .map((f) => ({ file: rel(f), data: parseFile(f, Gun, errors) }))
    .filter((x): x is { file: string; data: Gun } => !!x.data);
  const k1File = join(dir, "curriculum/k1.json");
  const K1 = z.object({ schema: z.number(), review: ReviewStateLoose, note_tr: z.string().optional(), cekirdek: z.array(z.object({ id: z.string() }).passthrough()), pasif: z.array(z.object({ id: z.string() }).passthrough()).default([]) });
  const k1raw = existsSync(k1File) ? parseFile(k1File, K1, errors) : null;
  const k1 = k1raw ? { cekirdek: k1raw.cekirdek.map((x) => x.id), pasif: k1raw.pasif.map((x) => x.id) } : null;
  const tabanDosya = join(ROOT, "content/tools/b4-taban.json");
  const b4Taban = dir === CDIR && existsSync(tabanDosya) ? (JSON.parse(readFileSync(tabanDosya, "utf8")) as B4Taban) : undefined;
  return { domains, lexemes: [...byId.values()], lexiconBatches, patterns, grammar, scenarios, assess, world, temel, m1, k1, b4Taban, errors, warnings };
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
  // İÇ 7014566898: dolgu anlamları dolgularla aynı sırada ve uzunlukta (B2 kartı seçilen dolgunun anlamını buradan gösterir)
  for (const s of p.slots) if (s.fills_tr && s.fills_tr.length !== s.fills.length) e.push(`slot '${s.name}': fills_tr (${s.fills_tr.length}) fills (${s.fills.length}) ile aynı uzunlukta olmalı`);
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
  // LS-17.0: mini (mevsim) senaryoları azaltılmış asgari sayılarla; oynatıcının 7 bölümü yine dolu olmalı
  const M = s.format === "mini";
  rng(n(s.essentials.lexemes), M ? 6 : 12, M ? 12 : 20, "temel kelime");
  rng(n(s.essentials.chunks), M ? 5 : 8, M ? 10 : 15, "temel ifade");
  rng(n(s.essentials.patterns), M ? 2 : 3, M ? 4 : 6, "temel kalıp");
  if (n(s.build) < (M ? 10 : 25)) e.push(`aşama 3 cümle kurma en az ${M ? 10 : 25} (${n(s.build)})`);
  if (n(s.drills) < (M ? 12 : 35)) e.push(`aşama 4 alıştırma en az ${M ? 12 : 35} (${n(s.drills)})`);
  for (const k of M ? ["gap", "order", "guided_response", "tr_de"] : ["gap", "order", "transform", "guided_response", "listen_and_respond", "tr_de"]) if (!s.drills.some((d) => d.k === k)) e.push(`alıştırma türü eksik: ${k}`);
  if (n(s.dialogues) < (M ? 1 : 3)) e.push(`en az ${M ? 1 : 3} diyalog çeşidi (${n(s.dialogues)})`);
  for (const d of s.dialogues) for (const l of d.lines.filter((x) => x.r === "B")) {
    if (!l.starter || !l.keywords?.length || !l.hint_tr) e.push(`${d.id}: öğrenci satırında 4 destek düzeyi eksik: "${l.de}"`);
    if ((l.accepted?.length || 0) < 3) e.push(`${d.id}: öğrenci satırında accepted ≥3 değil: "${l.de}"`);
  }
  if (s.roleplay.levels.length < (M ? 1 : 3)) e.push(`rol oyunu: ${M ? 1 : 3} zorluk düzeyi`);
  if (s.roleplay.surprises.length < (M ? 1 : 3)) e.push(`rol oyunu: en az ${M ? 1 : 3} sürpriz`);
  const os = s.otherSide;
  if (n(os) < (M ? 6 : 12)) e.push(`otherSide en az ${M ? 6 : 12} (${n(os)})`);
  if (os.filter((o) => o.layer === "alltag").length * 2 < n(os)) e.push(`otherSide'ın en az yarısı alltag (${os.filter((o) => o.layer === "alltag").length}/${n(os)})`);
  const qs = s.listening.reduce((a, l) => a + l.qs.length, 0);
  if (qs < (M ? 2 : 6)) e.push(`dinleme sorusu en az ${M ? 2 : 6} (${qs})`);
  for (const l of s.listening) { if (l.qs[0]?.kind !== "gist") e.push(`${l.id}: ilk soru ana fikir (gist) olmalı`); for (const q of l.qs) if (q.ans >= q.opts.length) e.push(`${l.id}: doğru şık dizinin dışında`); }
  if (n(s.speaking) < (M ? 1 : 3)) e.push(`konuşma görevi en az ${M ? 1 : 3} (${n(s.speaking)})`);
  if (n(s.missions) < 1) e.push("en az 1 dış görev (mission)");
  const prod = productionCount(s);
  if (prod < (M ? 30 : 80)) e.push(`üretim maddesi en az ${M ? 30 : 80} (${prod})`);
  for (const b of s.build) if (b.accepted.length < 3) e.push(`build ${b.id}: accepted ≥3 değil`);
  // D-064: üretim maddelerinde (build + tr_de, guided_response, transform, listen_and_respond) en az 3 kabul edilen cevap
  for (const d of s.drills) if (["tr_de", "guided_response", "transform", "listen_and_respond"].includes(d.k) && "accepted" in d && d.accepted.length < 3) e.push(`drill ${d.id} (${d.k}): accepted ≥3 değil (${d.accepted.length})`);
  // D-065: her dinleme parçası en az bir hızda
  for (const l of s.listening) if (!l.speeds.length) e.push(`${l.id}: speeds boş`);
  return e;
}

/** OD-9 (PM-017): öğrenciye görünen serbest açıklama alanları. Yapılandırılmış `exp` alanları her zaman denetlenir (hata). */
export function explainTexts(s: Scenario): { where: string; text: string }[] {
  const out: { where: string; text: string }[] = [];
  const add = (where: string, t?: string) => { if (t && t.trim()) out.push({ where, text: t }); };
  for (const k of s.chunks) { add(`${k.id}.use_tr`, k.use_tr); k.mistakes_tr.forEach((m, i) => add(`${k.id}.mistakes_tr[${i}]`, m)); add(`${k.id}.bair.note_tr`, k.layers.bair?.note_tr); }
  // İnceleme #39 P1-2: ekranda görünen bütün Türkçe yönerge ve soru metinleri
  for (const d of s.drills) for (const f of ["why_tr", "hint_tr", "instr_tr", "situation_tr", "q_tr"] as const) add(`${d.id}.${f}`, (d as Record<string, unknown>)[f] as string | undefined);
  for (const b of s.build) add(`${b.id}.prompt_tr`, b.prompt_tr);
  s.dialogues.forEach((dl, i) => dl.lines.forEach((l, j) => add(`dialog${i}#${j}.hint_tr`, (l as { hint_tr?: string }).hint_tr)));
  s.listening.forEach((li, i) => li.qs.forEach((q, j) => add(`dinleme${i}.q${j}.q_tr`, q.q_tr)));
  s.mistakes_tr.forEach((m, i) => add(`mistakes_tr[${i}]`, m));
  return out;
}
/** Sözlük kartında öğrenciye görünen Türkçe: karşılık, hatalar (PM-035.10, PM-042 A.3) */
export function lexemeExplainTexts(l: Lexeme): { where: string; text: string }[] {
  const out: { where: string; text: string }[] = [{ where: `${l.id}.tr`, text: l.tr }];
  l.mistakes_tr.forEach((m, i) => out.push({ where: `${l.id}.mistakes_tr[${i}]`, text: m }));
  return out;
}
export function patternExplainTexts(p: Pattern): { where: string; text: string }[] {
  // grammar_tr öğretmen notudur, öğrenciye gösterilmez; öğrenciye görünenler kurallar_tr, frame_tr, mistakes_tr
  const out: { where: string; text: string }[] = p.kurallar_tr.map((k, i) => ({ where: `${p.id}.kurallar_tr[${i}]`, text: k }));
  if (p.frame_tr) out.push({ where: `${p.id}.frame_tr`, text: p.frame_tr });
  p.mistakes_tr.forEach((m, i) => out.push({ where: `${p.id}.mistakes_tr[${i}]`, text: m }));
  return out;
}

export function checkRules(c: Loaded, opts: { strictPatterns?: boolean; strictTeach?: boolean } = {}): Loaded {
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
  const artInDe: string[] = [];
  for (const l of c.lexemes) {
    for (const p of l.patterns) if (!pt.has(p)) errors.push(`${l.id}: kalıp ${p} yok`);
    for (const r of l.related) if (!lx.has(r)) warnings.push(`${l.id}: ilgili kelime ${r} yok`);
    for (const x of checkLexeme(l)) errors.push(`${l.id} (${l.tier}): ${x}`);
    // PM-042 B.9 (PM-035.3): artikel tek kaynak `art`; `de` artikelsiz isim, arayüz "der Termin" biçimini kendisi kurar
    if (l.pos === "noun" && !l.art) errors.push(`${l.id}: isimde art zorunlu`);
    // D-098: 218 kart #50'de çevrildi; artık hata (yalnızca isimler: lx:der gibi belirteç kartı etkilenmez)
    if (l.pos === "noun" && /^(der|die|das)\s/i.test(l.de)) artInDe.push(l.id);
    if (l.exp) for (const x of explanationIssues(l.exp)) errors.push(`${l.id}.exp.${x}`);
  }
  // #58 B4: içerik güvenliği, pasif kelime, isimde forms, K1'de 3+ eşdizim, somut kelimede örnek başına görsel
  { const g = icerikGuvenligi(c, c.b4Taban);
    errors.push(...g.hata); warnings.push(...g.uyari);
    const k = b4Uyarilar(c.lexemes, c.b4Taban);
    errors.push(...k.hata); warnings.push(...k.uyari);
  }
  // İÇ 7003635425-3 + inceleme #85: aynı boşluk cümlesi farklı kartlarda farklı cevap kümesiyle → uyarı
  warnings.push(...boslukCakismasi(c.lexemes));
  if (artInDe.length) errors.push(`de alanı artikelle başlayan ${artInDe.length} isim (artikel yalnızca art alanında, D-098): ${artInDe.slice(0, 5).join(", ")}${artInDe.length > 5 ? " …" : ""}`);
  // PM-040.3 / PM-042 A.3: sözlük partisi — "reviewed" ise okur zorunlu; tr ve mistakes_tr OD-9.2 (incelenmişte hata, taslakta sayı uyarısı)
  { const byId = new Map(c.lexemes.map((l) => [l.id, l]));
    for (const b of c.lexiconBatches) {
      if (b.status === "reviewed" && b.okur !== "passed") errors.push(`${b.file}: "reviewed" ama okur kontrolü geçmemiş (OD-9.4)`);
      const bad = b.ids.flatMap((id) => { const l = byId.get(id); return l ? lexemeExplainTexts(l).flatMap(({ where, text }) => textIssues(text).map((x) => `${where}: ${x}`)) : []; });
      if (!bad.length) continue;
      if (b.status === "reviewed") for (const x of bad) errors.push(`${b.file}: OD-9 ${x}`);
      else warnings.push(`${b.file}: OD-9 açıklama standardına uymayan ${bad.length} metin (ilk: ${bad[0]})`);
    } }
  for (const p of c.patterns) for (const x of checkPattern(p)) errors.push(`${p.id}: ${x}`);
  // OD-9.4 (PM-017): "reviewed" ancak okur kapısından geçtiyse; incelenmiş kalıbın açıklamaları OD-9.2'ye uymalı
  for (const p of c.patterns) {
    if (p.review?.status !== "reviewed") continue;
    if (p.review.okur !== "passed") errors.push(`${p.id}: "reviewed" ama okur kontrolü geçmemiş (OD-9.4)`);
    if (!p.kurallar_tr.length) errors.push(`${p.id}: "reviewed" ama öğrenciye görünen kural yok (kurallar_tr, OD-9)`);
    for (const { where, text } of patternExplainTexts(p)) for (const x of textIssues(text)) errors.push(`${where}: OD-9 ${x}`);
  }
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
    // OD-9: yapılandırılmış açıklamalar her zaman; serbest açıklamalar incelenmiş senaryoda hata, taslakta uyarı
    for (const k of s.chunks) for (const [f, e] of [["exp", k.exp], ["alltag_exp", k.alltag_exp]] as const) if (e) for (const x of explanationIssues(e, k.requires)) errors.push(`${file}: ${k.id}.${f}.${x}`);
    if (s.review.status === "reviewed" && s.review.okur !== "passed") errors.push(`${file}: "reviewed" ama okur kontrolü geçmemiş (OD-9.4)`);
    // İnceleme #39 P1-3: incelenmiş senaryoda her temel ifadenin yapılandırılmış açıklaması (exp) olmalı; taslakta uyarı
    { const noExp = s.essentials.chunks.filter((id) => !s.chunks.find((k) => k.id === id)?.exp);
      if (noExp.length) (s.review.status === "reviewed" ? errors : warnings).push(`${file}: temel ifadede exp yok (${noExp.length}): ${noExp.join(", ")}`); }
    // OD-0/OD-7 öğretmeden isteme (PM-032): incelenmiş senaryoda hata, taslakta uyarı (ilk 3 madde örnek)
    { const lxm = new Map(c.lexemes.map((l) => [l.id, l])); const u = untaught(s, lxm, c.scenarios.map((x) => x.data), ptById);
      if (u.length) { if (s.review.status === "reviewed" || opts.strictTeach) for (const x of u) errors.push(`${file}: öğretmeden isteme ${x.item}: ${x.words.join(", ")}`);
        else warnings.push(`${file}: öğretmeden isteme ${u.length} madde (ilk: ${u.slice(0, 3).map((x) => `${x.item}: ${x.words.join(", ")}`).join(" | ")})`); } }
    { const bad = explainTexts(s).flatMap(({ where, text }) => textIssues(text).map((x) => `${where}: ${x}`));
      if (bad.length) (s.review.status === "reviewed" ? errors : warnings).push(...(s.review.status === "reviewed" ? bad.map((b) => `${file}: OD-9 ${b}`) : [`${file}: OD-9 açıklama standardına uymayan ${bad.length} madde (ilk: ${bad[0]})`])); }
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
  // H4: dünya — karakter ve alan kimlikleri tutarlı, hafta sırası 1..26
  if (c.world) {
    const w = c.world, chars = new Set(w.characters.map((x) => x.id));
    dupes(w.characters.map((x) => x.id), "karakter");
    w.story.forEach((s, i) => { if (s.week !== i + 1) errors.push(`dünya: hafta sırası bozuk (${s.week})`); });
    for (const s of [...w.story, ...w.reserves]) { for (const ch of s.characters) if (!chars.has(ch)) errors.push(`dünya: ${s.title_de} → karakter ${ch} yok`); for (const d of s.domains) if (!dom.has(d)) errors.push(`dünya: ${s.title_de} → alan ${d} yok`); }
    for (const ch of w.characters) { for (const d of ch.domains) if (!dom.has(d)) errors.push(`dünya: ${ch.id} → alan ${d} yok`); const t = ch.mix.hd + ch.mix.alltag + ch.mix.bair; if (t !== 100) errors.push(`dünya: ${ch.id} katman yüzdeleri toplamı ${t}`); }
    for (const p of w.town.places) if (!dom.has(p.domain)) errors.push(`dünya: mekân ${p.id} → alan ${p.domain} yok`);
    if (w.review.status === "draft") warnings.push("dünya: inceleme bekliyor (Bairisch kaynak doğrulaması)");
  }
  // §3: her temel kalıp en az N farklı alanda (pilotta 2)
  for (const p of c.patterns.filter((p) => p.core)) {
    const n = patternDomains.get(p.id)?.size || 0;
    if (n < 2) (opts.strictPatterns ? errors : warnings).push(`kalıp ${p.id}: yalnızca ${n} alanda kullanılıyor (pilotta en az 2)`);
  }
  // PM-045 §3a / inceleme #55: pasif kart (yalnızca tanıma) üretim istenen yere temel öğe olarak giremez
  { const passive = new Set(c.lexemes.filter((l) => l.tier === "passive").map((l) => l.id));
    for (const { file, data: s } of c.scenarios) for (const id of s.essentials.lexemes) if (passive.has(id)) errors.push(`${file}: pasif kart ${id} temel öğe olamaz (yalnızca tanıma)`); }
  // R0 temel paket (PM-045 §4.1): sıra ve kimlik, incelenmiş ⇒ okur, OD-9 açıklamalar
  { const ids = new Set<string>(), orders = new Set<number>();
    for (const { file, data: t } of c.temel) {
      const stem = /r0-(\d{2}-[a-z0-9-]+)\.json$/.exec(file)?.[1];
      if (stem && t.id !== `r0:${stem}`) errors.push(`${file}: kimlik ${t.id} dosya adıyla uyuşmuyor (r0:${stem})`);
      if (ids.has(t.id)) errors.push(`${file}: tekrar eden temel ders ${t.id}`); ids.add(t.id);
      if (orders.has(t.order)) errors.push(`${file}: tekrar eden sıra ${t.order}`); orders.add(t.order);
      if (t.review.status === "reviewed" && t.review.okur !== "passed") errors.push(`${file}: "reviewed" ama okur kontrolü geçmemiş (OD-9.4)`);
      for (const x of t.teach) if (x.exp) for (const i of explanationIssues(x.exp)) (t.review.status === "reviewed" ? errors : warnings).push(`${file}: ${x.id}.exp.${i}`);
      for (const x of t.teach) if (x.lexeme && !lx.has(x.lexeme)) warnings.push(`${file}: ${x.id} sözlükte olmayan karta bağlı (${x.lexeme})`);
    } }
  // M1 günleri (#58 A4, PM-053, PM-055): kimlik/dosya, bölüm ve dikte bağları, gerçek video
  { const days = new Set<number>(), temelIds = new Set(c.temel.map((t) => t.data.id));
    const taught = baseTaught(c);
    for (const { file, data: g } of [...c.m1].sort((a, b) => a.data.day - b.data.day)) {
      addDayTaught(taught, g, c);
      const nn = /gun-(\d{2})\.json$/.exec(file)?.[1];
      if (nn && g.id !== `m1:gun:${nn}`) errors.push(`${file}: kimlik ${g.id} dosya adıyla uyuşmuyor (m1:gun:${nn})`);
      if (nn && g.day !== Number(nn)) errors.push(`${file}: day ${g.day} dosya adıyla uyuşmuyor`);
      if (days.has(g.day)) errors.push(`${file}: tekrar eden gün ${g.day}`); days.add(g.day);
      const r = checkGun(g, { lexicon: lx, temel: temelIds, taught });
      errors.push(...r.errors.map((e) => `${file}: ${e}`));
      (g.review.status === "reviewed" ? errors : warnings).push(...r.warnings.map((w) => `${file}: ${w}`));
    } }
  // K1 listesi (PM-045 §3a): pasif kart çekirdekte olamaz; pasif listedeki kartın tier'ı passive olmalı
  if (c.k1) {
    const core = new Set(c.k1.cekirdek);
    for (const id of c.k1.pasif) if (core.has(id)) errors.push(`curriculum/k1.json: ${id} hem pasif hem çekirdek`);
    const notPassive = c.k1.pasif.filter((id) => { const l = c.lexemes.find((x) => x.id === id); return l && l.tier !== "passive"; });
    if (notPassive.length) warnings.push(`curriculum/k1.json: pasif listede olup tier'ı passive olmayan ${notPassive.length} kart (ilk: ${notPassive.slice(0, 5).join(", ")})`);
  }
  return c;
}

/* ---------- M1 "öğretilmiş" kelime kümesi (#58 A2 kuralı, inceleme #60 P0-3) ---------- */
const FUNCTION_POS = new Set(["det", "pron", "conj", "prep", "particle", "num"]);
const toks = (s: string) => s.toLowerCase().replace(/[.,!?;:„“"'»«()–\-…/]/g, " ").split(/\s+/).filter(Boolean);
/** her günün başında bilinen: işlev kelimeleri (her biçim) ve karakter adları */
function baseTaught(c: Loaded): Set<string> {
  const t = new Set<string>();
  for (const l of c.lexemes) if (l.card === false || FUNCTION_POS.has(l.pos)) for (const w of toks(l.de)) t.add(w);
  for (const ch of c.world?.characters ?? []) for (const w of toks(ch.name)) t.add(w);
  return t;
}
/** gün d'nin öğrettikleri kümeye eklenir (kümülatif). Kartın örnek cümlesi öğretim sayılmaz (FORMAT: dikte örnek cümleden gelemez) */
function addDayTaught(t: Set<string>, g: Gun, c: Loaded) {
  const byId = new Map(c.lexemes.map((l) => [l.id, l]));
  for (const id of g.yeni_kartlar) {
    const l = byId.get(id); if (!l) continue;
    for (const s of [l.de, l.pl, l.verb?.praesens3, l.verb?.praeteritum, l.verb?.perfekt, ...l.forms.map((f) => f.answer), ...l.collocations.map((x) => x.de)]) if (s) for (const w of toks(s)) t.add(w);
  }
  for (const did of g.dersler) {
    const d = c.temel.find((x) => x.data.id === did)?.data; if (!d) continue;
    for (const x of d.teach) for (const w of toks(x.de)) t.add(w);
    for (const row of d.table?.satirlar ?? []) for (const cell of row) for (const w of toks(cell)) t.add(w);
    for (const dr of d.drills) if ("accepted" in dr) for (const a of dr.accepted) for (const w of toks(a)) t.add(w);
    for (const ln of d.dialogue?.lines ?? []) for (const w of toks(ln.de)) t.add(w);
  }
}

/**
 * #58 B4 içerik güvenliği süzgeci (#54 D16, PM-052 A.10). Öğrenciye görünen bütün metinler taranır: kelime kartları, kalıplar,
 * senaryolar, temel dersler, M1 günleri, dünya, seviye tespiti bankası, dilbilgisi notları, alanlar.
 *  - KABA (küfür, hakaret) ve ŞİDDET: aktif içerikte HATA. Yalnızca tanıma kartında (tier: passive) kalabilir: öğrenci duyduğunu
 *    anlasın, kendisi kullanmasın. Kartın Türkçe açıklamasında kullanım uyarısı ("kaba", "deme", "argo"…) varsa sessiz geçer;
 *    yoksa uyarı. Böyle kart üretim havuzuna giremez: M1 yeni_kartlar, senaryo essentials.lexemes, K1 çekirdek (HATA). Kelimenin
 *    kendisi kabul cevaplarına, alıştırmaya, provaya girerse aktif metin taramasıyla zaten HATA.
 *  - AŞIRICILIK (nazi selamı vb.): her yerde HATA.
 *  - HASSAS konu (siyaset, intihar, uyuşturucu): UYARI, insan incelemesi; incelenen kimlik `b4-taban.json` → `hassas_onay`.
 * Almanca kalıplar kelimenin içinde de aranır (birleşik kelime: Hundescheiße, Scheißkerl); Almanca kalıplar Türkçe açıklama
 * alanlarında (`*_tr`, `tr`) aranmaz: "Scheiße deme, So ein Mist de" gibi bir açıklama içerik değil, üst dildir. Türkçe kalıplar
 * her alanda ve Türkçe küçük harfe çevrilerek aranır (İbne → ibne).
 */
const DE_KABA = /\p{L}*(schei(ß|ss)|fick|fotze|wichser|hurens[oö]hn|arschl[oö]ch|nutte|missgeburt|verdammt|drecksau|mistst[üu]ck)\p{L}*/iu;
const DE_SIDDET = /(?<!\p{L})(t(ö|oe)ten|t(ö|oe)te|t(ö|oe)tet|get(ö|oe)tet|umbringen|umgebracht|bring(e|t|st|en)? (dich|di|ihn|sie|euch) um(?=\s*([.!?,;:]|$))|erschie(ß|ss)en|erschossen|ermorden|ermordet|mord|morde|mordes|m[öo]rder\p{L}*|leiche|leichen|erstechen|erstochen|vergewaltig\p{L}*|waffe|waffen|pistole\p{L}*|gewehr\p{L}*|bombe|bomben|sprengstoff\p{L}*)(?!\p{L})/iu;
/** kelime başında aranan kaba kökler (Marsch, Barsch, Warschau yakalanmaz) */
const DE_KABA_BAS = /(?<!\p{L})(arsch\p{L}*|kanake\p{L}*|fresse)(?!\p{L})/iu;
const DE_ASIRI = /(?<!\p{L})(heil hitler|sieg heil|hakenkreuz\p{L}*|nazi|nazis|hitler)(?!\p{L})/iu;
const DE_HASSAS = /(?<!\p{L})(selbstmord\p{L}*|suizid\p{L}*|kokain|heroin|crystal meth|drogen|afd|cdu|csu|spd|fdp|partei|parteien|wahlkampf|bundestagswahl|politik\p{L}*|politisch\p{L}*|holocaust|terror\p{L}*)(?!\p{L})/iu;
const TR_KABA = /(?<!\p{L})(siktir\p{L}*|hassiktir|göt|götü|götün|sikeyim|sikerim|sikim\p{L}*|amk|aq|amına|amcık\p{L}*|orospu\p{L}*|piç\p{L}*|yavşa[kğ]\p{L}*|şerefsiz\p{L}*|ibne\p{L}*|götveren\p{L}*|kahpe\p{L}*|pezevenk\p{L}*)(?!\p{L})/u;
const TR_SIDDET = /(?<!\p{L})(cinayet\p{L}*|katil|katiller\p{L}*|tecavüz\p{L}*|silah\p{L}*)(?!\p{L})/u; // "bomba gibi" deyimdir
const TR_HASSAS = /(?<!\p{L})(intihar\p{L}*|uyuşturucu\p{L}*|siyaset\p{L}*|siyasi|hükümet\p{L}*|terör\p{L}*|savaş|savaşı|savaşta)(?!\p{L})/u;
/** Kartta kullanım uyarısı (yalnızca tanıma kartı için): Türkçe açıklamada bu kelimelerden biri */
const KULLANIM_UYARISI = /(?<!\p{L})(kaba|deme|demez|demek yanlış|kullanma|argo|küfür\p{L}*|hakaret\p{L}*|kibar ortam\p{L}*|yalnızca (tanı|anla)\p{L}*)(?!\p{L})/iu;
/**
 * Savaş (hassas): yalnızca isim. "Krieg ich das Pfand zurück?" (kriegen = almak) yakalanmaz: büyük harfli ve cümle başında
 * olmayan Krieg/Kriege/Kriegs-… isimdir; cümle başındaki belirsiz biçim fiil sayılır.
 */
const DE_KRIEG = /(?<!\p{L})(Krieg(e|es|s)?|Kriegs(?!t(?!\p{L}))\p{L}+|Weltkrieg\p{L}*)(?!\p{L})/gu;
function kriegIsim(t: string): string | null {
  for (const m of t.matchAll(DE_KRIEG)) { const once = t.slice(0, m.index).trimEnd(); if (once && !/[.!?:„“"]$/.test(once)) return m[0]; if (/^Weltkrieg/.test(m[0])) return m[0]; }
  return null;
}
type Bulgu = { yol: string; t: string; tr: boolean };
function metinler(x: unknown, yol: string, out: Bulgu[], tr = false) {
  if (typeof x === "string") { out.push({ yol, t: x, tr }); return; }
  if (Array.isArray(x)) { x.forEach((v, i) => metinler(v, `${yol}[${i}]`, out, tr)); return; }
  if (x && typeof x === "object") for (const [k, v] of Object.entries(x)) {
    if (k === "id" || k === "source" || k === "license" || k === "url" || k === "img" || k === "file" || k === "lexId") continue;
    metinler(v, yol ? `${yol}.${k}` : k, out, tr || k === "tr" || /_tr$/.test(k) || k === "opts_tr" || k === "q_tr");
  }
}
export type GuvenlikTur = "kaba" | "siddet" | "asiri" | "hassas";
/** Tek metinde bulgu (dışa açık: test ve içerik araçları) */
export function guvenlikTara(t: string, trAlan: boolean): { tur: GuvenlikTur; k: string } | null {
  const lo = t.toLowerCase(), tl = t.toLocaleLowerCase("tr");
  const de = (re: RegExp, tur: GuvenlikTur) => { if (trAlan) return null; const m = re.exec(lo); return m ? { tur, k: m[0]! } : null; };
  const trr = (re: RegExp, tur: GuvenlikTur) => { const m = re.exec(tl); return m ? { tur, k: m[0]! } : null; };
  const krieg = trAlan ? null : kriegIsim(t);
  return de(DE_ASIRI, "asiri") ?? de(DE_KABA, "kaba") ?? de(DE_KABA_BAS, "kaba") ?? trr(TR_KABA, "kaba") ?? de(DE_SIDDET, "siddet") ?? trr(TR_SIDDET, "siddet")
    ?? de(DE_HASSAS, "hassas") ?? (krieg ? { tur: "hassas" as const, k: krieg } : null) ?? trr(TR_HASSAS, "hassas");
}
export type B4Taban = { uyari?: Record<string, number>; hassas_onay?: string[] };
export function icerikGuvenligi(c: Pick<Loaded, "lexemes" | "scenarios" | "temel" | "m1" | "patterns"> & Partial<Pick<Loaded, "world" | "assess" | "grammar" | "domains" | "k1">>, taban: B4Taban = {}): { hata: string[]; uyari: string[] } {
  const hata: string[] = [], uyari: string[] = [];
  const kaynaklar: [string, unknown][] = [
    ...c.lexemes.map((l) => [l.id, l] as [string, unknown]), ...c.patterns.map((p) => [p.id, p] as [string, unknown]),
    ...c.scenarios.map((s) => [s.file, s.data] as [string, unknown]), ...c.temel.map((t) => [t.file, t.data] as [string, unknown]), ...c.m1.map((g) => [g.file, g.data] as [string, unknown]),
    ...(c.world ? [["world/world.json", c.world] as [string, unknown]] : []),
    ...(c.assess ?? []).map((a) => [a.id, a] as [string, unknown]), ...(c.grammar ?? []).map((g) => [g.id, g] as [string, unknown]), ...(c.domains ?? []).map((d) => [`alan ${d.id}`, d] as [string, unknown])
  ];
  const pasif = new Set(c.lexemes.filter((l) => l.tier === "passive").map((l) => l.id));
  const onay = new Set(taban.hassas_onay ?? []);
  const kabaPasif = new Set<string>();
  for (const [ad, v] of kaynaklar) {
    const out: Bulgu[] = []; metinler(v, "", out);
    const b = out.map((m) => ({ m, g: guvenlikTara(m.t, m.tr) })).filter((x) => x.g) as { m: Bulgu; g: { tur: GuvenlikTur; k: string } }[];
    const ilk = (x: typeof b) => `${x[0]!.m.yol}: "${x[0]!.g.k}"`;
    const asiri = b.filter((x) => x.g.tur === "asiri"), kaba = b.filter((x) => x.g.tur === "kaba" || x.g.tur === "siddet"), hassas = b.filter((x) => x.g.tur === "hassas");
    if (asiri.length) hata.push(`${ad}: içerik güvenliği — aşırıcı ifade ${asiri.length} metinde (ilk ${ilk(asiri)}) (#54 D16)`);
    if (kaba.length) {
      if (pasif.has(ad)) {
        kabaPasif.add(ad);
        const uyarili = out.some((m) => m.tr && KULLANIM_UYARISI.test(m.t));
        if (!uyarili) uyari.push(`${ad}: kaba/şiddet kelimesi yalnızca tanıma kartında (ilk ${ilk(kaba)}) ama Türkçe açıklamada kullanım uyarısı yok (#54 D16)`);
      } else hata.push(`${ad}: içerik güvenliği — ${kaba[0]!.g.tur === "kaba" ? "kaba/hakaret" : "şiddet"} kelimesi ${kaba.length} metinde (ilk ${ilk(kaba)}); yalnızca tanıma kartında olabilir (#54 D16)`);
    }
    if (hassas.length && !onay.has(ad)) uyari.push(`${ad}: hassas konu "${hassas[0]!.g.k}" ${hassas.length} metinde — insan incelemesi; incelendiyse b4-taban.json hassas_onay (#54 D16)`);
  }
  // D16: pasif katman (yalnızca tanıma) kelimeleri üretim havuzuna giremez — bütün pasif kartlar, yalnızca süzgece takılanlar değil
  // (inceleme #88 2. tur). Senaryo temel öğesi kuralı checkRules'ta da var (PM-045 §3a); burada M1 ve K1 çekirdek.
  const neden = (id: string) => (kabaPasif.has(id) ? "kaba/şiddet içeren tanıma kartı" : "pasif (yalnızca tanıma) kart");
  for (const g of c.m1) for (const id of g.data.yeni_kartlar ?? []) if (pasif.has(id)) hata.push(`${g.file}: ${id} ${neden(id)}; günün yeni kartı olamaz (#54 D16)`);
  for (const s of c.scenarios) for (const id of s.data.essentials.lexemes) if (kabaPasif.has(id)) hata.push(`${s.file}: ${id} ${neden(id)}; temel öğe olamaz (#54 D16)`);
  for (const id of c.k1?.cekirdek ?? []) if (pasif.has(id)) hata.push(`curriculum/k1.json: ${id} ${neden(id)}; çekirdekte olamaz (#54 D16)`);
  return { hata, uyari };
}
/**
 * #58 B4 kart kuralları: isimde forms, K1'de 3+ eşdizim, somut kelimede örnek başına img. İçerik tamamlanana kadar sayılı
 * uyarıdır; `b4-taban.json` → `uyari` bugünkü sayıları taban olarak tutar ve sayı tabanı aşarsa HATA olur (gerileme durur).
 * Sayı düşünce taban elle düşürülür (uyarı söyler); taban 0 olunca kural kalıcı hatadır.
 */
/**
 * PM-062 anlam güvenliği: örnek cümle kartın kelimesini (gövde, çekim, çoğul, ayrılabilir fiilin gövdesi) içermeli; içermiyorsa
 * cümle başka kelimeyi ya da başka anlamı öğretiyor olabilir. Sezgisel (yanlış pozitif olabilir): tabanlı sayılı uyarı.
 */
export function ornekteKelime(l: Pick<Lexeme, "de" | "pos" | "pl" | "verb">, cumle: string): boolean {
  const tok = cumle.toLowerCase().replace(/[^\p{L}\s-]/gu, " ").split(/\s+/).flatMap((t) => [t, ...t.split("-")]).filter(Boolean);
  const bas0 = l.de.toLowerCase().replace(/\([^)]*\)/g, " ").split(/\s*[,/]\s*/).map((x) => x.trim()).find(Boolean) ?? l.de.toLowerCase();
  // "sich anmelden": dönüşlü zamir değil fiil aranır
  const bas = bas0.split(/\s+/).filter((w) => w !== "sich");
  const kok = (w: string) => { let k = w; if (l.pos === "verb") k = k.replace(/(eln|ern)$/, "").replace(/(en|n)$/, ""); else k = k.replace(/(e|en|er|es)$/, ""); return k.length >= 3 || (k.length >= 2 && w.length <= 4) ? k : w; };
  // tam başlık da aday (birleşik isimde: Einkaufswagen ⊃ wagen)
  const adaylar = new Set<string>([...bas.map(kok), ...bas.filter((w) => w.length >= 4)]);
  // ayrılabilir fiil: önek atılmış gövde (anfangen → fang-, "Fangen wir an?")
  if (l.pos === "verb") { const m = /^(zusammen|spazieren|zurecht|heraus|herein|hinaus|vorbei|bereit|zurück|herum|kennen|kaputt|wieder|weiter|durch|statt|unter|fest|fort|heim|fern|frei|teil|über|auf|aus|bei|ein|her|hin|los|mit|nach|vor|weg|weh|dar|ab|an|um|zu)(\p{L}{2,})$/u.exec(bas[0]!); if (m) adaylar.add(kok(m[2]!)); }
  for (const w of bas) for (const x of DUZENSIZ[w] ?? []) adaylar.add(x);
  // boşluk cevapları aday değil: artikel ve zamir ("der", "Ihnen") her cümleye uyardı (inceleme #92 P1-4)
  for (const x of [l.pl, l.verb?.praesens3?.split(/\s+/)[0], l.verb?.praeteritum?.split(/\s+/)[0], l.verb?.perfekt?.split(/\s+/).pop()]) if (x) { adaylar.add(kok(x.toLowerCase())); if (/t$/.test(x) && x.length >= 4) adaylar.add(x.toLowerCase().slice(0, -1)); }
  // umlaut ve gövde değişimi (fahren → fährt, nehmen → nimmt): ilk iki harf + son ünsüz grubu yerine en az 3 harflik ortak baş
  // birleşik isim (Lieblingsfach, Telefonnummer) ve önekli fiil (Fangen … an, nachzählen): gövde kelimenin içinde de olabilir
  const ic = l.pos === "noun" || l.pos === "verb";
  const benzer = (t: string, k: string) => t.startsWith(k) || (ic && k.length >= 4 && t.includes(k));
  return [...adaylar].some((k) => tok.some((t) => benzer(t, k) || t.normalize("NFD").replace(/\p{M}/gu, "").startsWith(k.normalize("NFD").replace(/\p{M}/gu, ""))));
}
/** Düzensiz çekim (örnekte başlık hiç geçmeyebilir): yalnızca sık kartlar */
const DUZENSIZ: Record<string, string[]> = {
  sein: ["bin", "bist", "ist", "sind", "seid", "war", "gewesen"], haben: ["hab", "hat", "hast", "hatte"], werden: ["wird", "wirst", "wurde", "geworden"],
  wer: ["wem", "wen", "wessen"], mögen: ["mag", "magst", "möcht"], können: ["kann", "konnt"], müssen: ["muss", "musst"], dürfen: ["darf", "durft"],
  wollen: ["will", "willst", "wollt"], wissen: ["weiß", "weißt", "wusst"], tun: ["tu", "tut", "getan"], gehen: ["ging", "gegangen"], ich: ["mir", "mich"],
  gut: ["besser", "best"], nah: ["näher", "nächst"], hoch: ["hoh", "höher", "höchst"], viel: ["mehr", "meist"], gern: ["lieber", "liebst"],
  du: ["dir", "dich"], wir: ["uns"], ihr: ["euch"], er: ["ihm", "ihn"], sie: ["ihr", "ihnen"],
};
/** Eşsesli kartlar (aynı başlık, farklı anlam kimliği) aynı örnek cümleyi paylaşamaz: soru başka anlamın cümlesini çekerdi (PM-062 madde 5) */
export function essesliOrnek(lexemes: Pick<Lexeme, "id" | "de" | "examples" | "forms">[]): { id: string; mesaj: string }[] {
  const out: { id: string; mesaj: string }[] = [];
  const bas = new Map<string, Pick<Lexeme, "id" | "de" | "examples" | "forms">[]>();
  for (const l of lexemes) { const k = l.de.trim(); bas.set(k, [...(bas.get(k) ?? []), l]); }
  for (const [de, ls] of bas) {
    if (ls.length < 2) continue;
    const gor = new Map<string, string>();
    // örnekler ve boşluk cümleleri: aynı cümle iki anlamın havuzunda olamaz (boşluk sorusu da havuzdan seçilir)
    for (const l of ls) for (const c of [...l.examples.map((e) => e.de), ...(l.forms ?? []).map((f) => f.de)]) { const n = c.trim().toLowerCase(); const o = gor.get(n); if (o && o !== l.id) out.push({ id: l.id, mesaj: `cümle "${c}" eşsesli ${o} kartında da var ("${de}")` }); else gor.set(n, l.id); }
  }
  return out;
}
export function b4Sayilar(lexemes: Lexeme[]): { anahtar: string; ad: string; ids: string[] }[] {
  const k1 = lexemes.filter((l) => l.tier === "K1" && l.card !== false);
  return [
    { anahtar: "k1_isim_formsuz", ad: "K1 isimde forms yok", ids: k1.filter((l) => l.pos === "noun" && !l.forms.length).map((l) => l.id) },
    { anahtar: "k1_az_esdizim", ad: "K1'de 3'ten az eşdizim", ids: k1.filter((l) => l.collocations.length < 3).map((l) => l.id) },
    { anahtar: "essesli_ortak_ornek", ad: "eşsesli kartlarda aynı örnek cümle; her anlamın cümlesi ayrı olmalı (PM-062)", ids: essesliOrnek(lexemes).map((x) => x.id) },
    { anahtar: "ornekte_kelime_yok", ad: "örnek cümlede kartın kelimesi görünmüyor (PM-062 anlam güvenliği)", ids: k1.filter((l) => l.examples.some((e) => !e.dialog && e.layer !== "alltag" && !ornekteKelime(l, e.de))).map((l) => l.id) },
    { anahtar: "gorselsiz_ornek", ad: "somut kelimede (img var) görselsiz örnek", ids: lexemes.filter((l) => l.img && l.examples.some((e) => !e.img)).map((l) => l.id) }
  ];
}
export function b4Uyarilar(lexemes: Lexeme[], taban: B4Taban = {}): { hata: string[]; uyari: string[] } {
  const hata: string[] = [], uyari: string[] = [];
  const ilk = (x: string[]) => x.slice(0, 5).join(", ") + (x.length > 5 ? " …" : "");
  for (const { anahtar, ad, ids } of b4Sayilar(lexemes)) {
    const t = taban.uyari?.[anahtar];
    if (t !== undefined && ids.length > t) hata.push(`${ad}: ${ids.length} kart, taban ${t} (b4-taban.json) — sayı arttı (ilk: ${ilk(ids)}) (#58 B4)`);
    else if (ids.length) uyari.push(`${ad}: ${ids.length} kart${t !== undefined ? ` (taban ${t}${ids.length < t ? "; taban düşürülebilir" : ""})` : ""} (ilk: ${ilk(ids)}) (#58 B4)`);
  }
  return { hata, uyari };
}
/**
 * Aynı boşluk cümlesi (ve aynı ya da eksik çeviri) farklı kartlarda farklı cevap kümesiyle geçiyorsa: öğrenci aynı soruyu
 * görür, bir kartta doğru sayılan öbüründe yanlış sayılır (also_ok bir kartta var, ötekinde yok dahil). Ayrıca also_ok cevabı tekrar ediyorsa.
 */
export function boslukCakismasi(lexemes: { id: string; forms: { de: string; answer: string; also_ok?: string[]; tr?: string }[] }[]): string[] {
  const out: string[] = [];
  const n = (x: string) => x.toLowerCase().replace(/[^\p{L}\p{N}_ ]+/gu, " ").replace(/\s+/g, " ").trim();
  const ayni = new Map<string, { id: string; tr: string; kume: string }[]>();
  for (const l of lexemes) for (const f of l.forms) {
    if ((f.also_ok ?? []).some((x) => n(x) === n(f.answer))) out.push(`${l.id}: forms also_ok cevabın kendisini tekrar ediyor (${f.answer})`);
    const v = ayni.get(n(f.de)) ?? [];
    v.push({ id: l.id, tr: n(f.tr ?? ""), kume: [...new Set([f.answer, ...(f.also_ok ?? [])].map(n))].sort().join("|") });
    ayni.set(n(f.de), v);
  }
  const cakisan = [...ayni.entries()].filter(([, v]) => v.length > 1 && v.some((x, i) => v.some((y, j) => j > i && x.kume !== y.kume && (x.tr === y.tr || !x.tr || !y.tr))));
  if (cakisan.length) out.push(`aynı boşluk cümlesi, farklı cevap: ${cakisan.length} küme (ilk: ${cakisan.slice(0, 3).map(([k, v]) => `"${k}" → ${v.map((x) => `${x.id}=${x.kume}`).join(" / ")}`).join("; ")}); also_ok ile birleştir ya da cümleyi ayır`);
  return out;
}
