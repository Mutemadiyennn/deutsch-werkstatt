/**
 * İçerik paketini derler: web/public/content/<sürüm>/… ve web/public/content/current.json
 * Sürüm = içeriğin SHA-1 özetinin ilk 12 karakteri (içerik değişmedikçe aynı kalır; önbellek dostu).
 */
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { loadContent, checkRules, ROOT, parseFile } from "./load.ts";
import { Gun, medyalar } from "../../packages/shared/src/m1.ts";
import { readdirSync } from "node:fs";
import { kartMi, type ContentIndex } from "../../packages/shared/src/content.ts";

const c = checkRules(loadContent());
if (c.errors.length) { console.error(c.errors.join("\n")); process.exit(1); }

// PM-045 §3a: K1 pasif listesindeki kart yalnızca tanıma (tier passive) — içerikte işaretlenene kadar paket bunu uygular
// (Bahçe'de üretim sorusu ve yeni kart havuzu dışında; inceleme #59 P1-4)
if (c.k1) { const pas = new Set(c.k1.pasif); for (const l of c.lexemes) if (pas.has(l.id)) l.tier = "passive"; }

// M1 günleri: içerikte yoksa ve DW_E2E_FIXTURES=1 ise e2e için örnek gün (content/tools/fixtures/m1) — yayın paketine girmez
const days = [...c.m1];
if (process.env.DW_E2E_FIXTURES === "1") {
  const fx = join(ROOT, "content/tools/fixtures/m1");
  for (const f of readdirSync(fx).filter((x) => /^gun-\d{2}\.json$/.test(x))) {
    const g = parseFile(join(fx, f), Gun, c.errors);
    // e2e paketinde örnek gün aynı numaralı gerçek günün YERİNE geçer: oynatıcı testi içerik değişince kırılmaz (inceleme #60 P1-8)
    if (g) { const i = days.findIndex((d) => d.data.day === g.day); if (i >= 0) days.splice(i, 1); days.push({ file: `fixtures/m1/${f}`, data: g }); }
  }
  if (c.errors.length) { console.error(c.errors.join("\n")); process.exit(1); }
}
days.sort((a, b) => a.data.day - b.data.day);

const payload = {
  m1: days.map((d) => d.data),
  temel: c.temel.map((t) => t.data),
  lexemes: c.lexemes,
  grammar: c.grammar,
  assess: c.assess,
  patterns: c.patterns,
  scenarios: Object.fromEntries(c.scenarios.map((s) => [s.data.id, s.data]))
};
const version = createHash("sha1").update(JSON.stringify([c.domains, payload])).digest("hex").slice(0, 12);
const base = join(ROOT, "web/public/content");
if (existsSync(base)) rmSync(base, { recursive: true });
const dir = join(base, version);
mkdirSync(join(dir, "scenarios"), { recursive: true });
const w = (p: string, v: unknown) => writeFileSync(join(dir, p), JSON.stringify(v));
w("lexemes.json", { lexemes: c.lexemes, patterns: c.patterns });
w("grammar.json", c.grammar);
w("assess.json", c.assess);
const scenFiles: Record<string, string> = {};
for (const s of c.scenarios) {
  const f = `scenarios/${s.data.id.replace(/[^a-z0-9-]/gi, "_")}.json`;
  w(f, s.data);
  scenFiles[s.data.id] = f;
}
const lexById = new Map(c.lexemes.map((l) => [l.id, l]));
const m1Files: Record<string, string> = {};
if (days.length) mkdirSync(join(dir, "m1"), { recursive: true });
for (const d of days) { const f = `m1/gun-${String(d.data.day).padStart(2, "0")}.json`; w(f, d.data); m1Files[String(d.data.day)] = f; }
// R0 temel dersler (yalnızca incelenmiş olanlar öğrenciye gider; taslak ders pakete girmez)
const temelFiles: Record<string, string> = {};
const temel = c.temel.map((t) => t.data).filter((t) => t.review.status === "reviewed").sort((a, b) => a.order - b.order);
if (temel.length) mkdirSync(join(dir, "temel"), { recursive: true });
for (const t of temel) { const f = `temel/${t.id.replace(/[^a-z0-9-]/gi, "_")}.json`; w(f, t); temelFiles[t.id] = f; }
const index: ContentIndex = {
  version,
  builtAt: new Date().toISOString(),
  domains: c.domains,
  scenarios: c.scenarios.map(({ data: s }) => ({ id: s.id, domain: s.domain, order: s.order, level: s.level, title_tr: s.title_tr, title_de: s.title_de, review: s.review.status, format: s.format, ...(s.season ? { season: s.season } : {}) })),
  m1: days.map(({ data: g }) => ({ day: g.day, id: g.id, title_tr: g.title_tr, review: g.review.status,
    kartlar: g.yeni_kartlar.filter((id) => { const l = lexById.get(id); return !!l && kartMi(l); }), medya: medyalar(g).map((m) => ({ id: m.id, kind: m.kind, title_tr: m.title_tr })) })),
  temel: temel.map((t) => ({ id: t.id, order: t.order, title_tr: t.title_tr, title_de: t.title_de, review: t.review.status })),
  counts: { lexemes: c.lexemes.length, grammar: c.grammar.length, assess: c.assess.length, scenarios: c.scenarios.length },
  files: { lexemes: "lexemes.json", grammar: "grammar.json", assess: "assess.json", scenarios: scenFiles, m1: m1Files, temel: temelFiles }
};
w("index.json", index);
writeFileSync(join(base, "current.json"), JSON.stringify({ version }));
console.log(`içerik paketi ${version} → web/public/content/${version}/ (${c.scenarios.length} senaryo, ${c.lexemes.length} kelime, ${c.assess.length} tespit maddesi)`);
