/** İçerik dosyalarını okur ve şemalarla doğrular. validate.ts, build.ts ve testler bunu kullanır. */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import { Domain, Lexeme, Pattern, GrammarNote, Scenario, AssessItem } from "../../packages/shared/src/content.ts";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const CDIR = join(ROOT, "content/v2");

export interface Loaded {
  domains: Domain[];
  lexemes: Lexeme[];
  patterns: Pattern[];
  grammar: GrammarNote[];
  scenarios: { file: string; data: Scenario }[];
  assess: AssessItem[];
  errors: string[];
  warnings: string[];
}

function parseFile<T>(file: string, schema: z.ZodType<T>, errors: string[]): T | null {
  let raw: unknown;
  try { raw = JSON.parse(readFileSync(file, "utf8")); } catch (e) { errors.push(`${rel(file)}: JSON okunamadı (${(e as Error).message})`); return null; }
  const r = schema.safeParse(raw);
  if (!r.success) {
    for (const i of r.error.issues.slice(0, 20)) errors.push(`${rel(file)}: ${i.path.join(".")} — ${i.message}`);
    return null;
  }
  return r.data;
}
const rel = (f: string) => relative(ROOT, f);

function walk(dir: string, out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith(".json")) out.push(p);
  }
  return out.sort();
}

export function loadContent(dir = CDIR): Loaded {
  const errors: string[] = [];
  const warnings: string[] = [];
  const domains = parseFile(join(dir, "domains.json"), z.array(Domain), errors) || [];
  const lexemes = [
    ...(parseFile(join(dir, "registry/lexemes.v1.json"), z.array(Lexeme), errors) || []),
    ...(parseFile(join(dir, "registry/lexemes.v2.json"), z.array(Lexeme), errors) || [])
  ];
  const patterns = parseFile(join(dir, "registry/patterns.json"), z.array(Pattern), errors) || [];
  const grammar = parseFile(join(dir, "registry/grammar.json"), z.array(GrammarNote), errors) || [];
  const assess = parseFile(join(dir, "assess/bank.json"), z.array(AssessItem), errors) || [];
  const scenarios = walk(join(dir, "domains"))
    .filter((f) => f.includes("/scenarios/"))
    .map((f) => ({ file: rel(f), data: parseFile(f, Scenario, errors) }))
    .filter((x): x is { file: string; data: Scenario } => !!x.data);
  return { domains, lexemes, patterns, grammar, scenarios, assess, errors, warnings };
}

/** Şemanın ötesindeki kurallar: tekillik, referanslar, Bavyera ağzı kaynağı, senaryo asgari koşulları */
export function checkRules(c: Loaded): Loaded {
  const { errors, warnings } = c;
  const dupes = (ids: string[], what: string) => {
    const seen = new Set<string>();
    for (const id of ids) { if (seen.has(id)) errors.push(`${what}: tekrar eden kimlik ${id}`); seen.add(id); }
    return seen;
  };
  const dom = dupes(c.domains.map((d) => d.id), "alan");
  const lx = dupes(c.lexemes.map((l) => l.id), "kelime");
  const pt = dupes(c.patterns.map((p) => p.id), "kalıp");
  dupes(c.grammar.map((g) => g.id), "dilbilgisi");
  dupes(c.assess.map((a) => a.id), "seviye tespiti");
  dupes(c.scenarios.map((s) => s.data.id), "senaryo");
  const units = new Set(c.grammar.map((g) => g.unit));
  for (const d of c.domains) for (const u of d.legacyUnits) if (!units.has(u)) errors.push(`alan ${d.id}: v1 ünitesi ${u} bulunamadı`);
  for (const l of c.lexemes) {
    for (const p of l.patterns) if (!pt.has(p)) errors.push(`${l.id}: kalıp ${p} yok`);
    for (const r of l.related) if (!lx.has(r)) errors.push(`${l.id}: ilgili kelime ${r} yok`);
  }
  for (const a of c.assess) {
    if ((a.skill === "vocab_passive" || a.skill === "listening") && (a.ans < 0 || a.ans >= a.opts_tr.length)) errors.push(`${a.id}: doğru şık dizinin dışında`);
  }
  for (const { file, data: s } of c.scenarios) {
    if (!dom.has(s.domain)) errors.push(`${file}: alan ${s.domain} yok`);
    if (!s.id.startsWith(`sc:${s.domain}:`)) errors.push(`${file}: kimlik alanla başlamalı (sc:${s.domain}:…)`);
    const ch = new Set(s.chunks.map((x) => x.id));
    for (const id of [...s.essentials.lexemes, ...s.extras.lexemes]) if (!lx.has(id)) errors.push(`${file}: kelime ${id} kayıtta yok`);
    for (const id of [...s.essentials.chunks, ...s.extras.chunks]) if (!ch.has(id)) errors.push(`${file}: ifade ${id} senaryoda tanımlı değil`);
    for (const id of s.essentials.patterns) if (!pt.has(id)) errors.push(`${file}: kalıp ${id} kayıtta yok`);
    for (const k of s.chunks) {
      if (!k.id.startsWith(`ch:${s.domain}:`)) errors.push(`${file}: ifade ${k.id} alan önekiyle başlamalı`);
      for (const l of k.lexemes) if (!lx.has(l)) errors.push(`${file}: ${k.id} → kelime ${l} yok`);
      if (k.pattern && !pt.has(k.pattern)) errors.push(`${file}: ${k.id} → kalıp ${k.pattern} yok`);
      if (k.layers.bair?.status === "verified" && !k.layers.bair.source) errors.push(`${file}: ${k.id} Bairisch 'verified' ama kaynak yok`);
    }
    const os = new Set(s.otherSide.map((o) => o.id));
    for (const r of s.responses) if (!os.has(r.to)) errors.push(`${file}: cevap ${r.to} karşı taraf sözlerinde yok`);
    if (s.otherSide.length < 8) errors.push(`${file}: karşı taraf sözü en az 8 olmalı (${s.otherSide.length})`);
    const bLines = s.dialogue.lines.filter((l) => l.r === "B");
    for (const l of bLines) if (!l.starter || !l.keywords?.length || !l.hint_tr) errors.push(`${file}: öğrenci satırında destek düzeyleri eksik: "${l.de}"`);
    if (s.review.status === "draft") warnings.push(`${file}: inceleme bekliyor (draft)`);
  }
  return c;
}
