/**
 * İçerik paketini derler: web/public/content/<sürüm>/… ve web/public/content/current.json
 * Sürüm = içeriğin SHA-1 özetinin ilk 12 karakteri (içerik değişmedikçe aynı kalır; önbellek dostu).
 */
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { loadContent, checkRules, ROOT } from "./load.ts";
import type { ContentIndex } from "../../packages/shared/src/content.ts";

const c = checkRules(loadContent());
if (c.errors.length) { console.error(c.errors.join("\n")); process.exit(1); }

// PM-045 §3a: K1 pasif listesindeki kart yalnızca tanıma (tier passive) — içerikte işaretlenene kadar paket bunu uygular
// (Bahçe'de üretim sorusu ve yeni kart havuzu dışında; inceleme #59 P1-4)
if (c.k1) { const pas = new Set(c.k1.pasif); for (const l of c.lexemes) if (pas.has(l.id)) l.tier = "passive"; }

const payload = {
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
const index: ContentIndex = {
  version,
  builtAt: new Date().toISOString(),
  domains: c.domains,
  scenarios: c.scenarios.map(({ data: s }) => ({ id: s.id, domain: s.domain, order: s.order, level: s.level, title_tr: s.title_tr, title_de: s.title_de, review: s.review.status, format: s.format, ...(s.season ? { season: s.season } : {}) })),
  counts: { lexemes: c.lexemes.length, grammar: c.grammar.length, assess: c.assess.length, scenarios: c.scenarios.length },
  files: { lexemes: "lexemes.json", grammar: "grammar.json", assess: "assess.json", scenarios: scenFiles }
};
w("index.json", index);
writeFileSync(join(base, "current.json"), JSON.stringify({ version }));
console.log(`içerik paketi ${version} → web/public/content/${version}/ (${c.scenarios.length} senaryo, ${c.lexemes.length} kelime, ${c.assess.length} tespit maddesi)`);
