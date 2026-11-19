/**
 * OD-9.4 tarama (PM-017): öğrenciye görünen serbest Türkçe açıklamaları listeler ve OD-9.2'ye aykırı olanları işaretler.
 *   node --experimental-strip-types content/tools/explain_audit.ts [--out docs/v2/reports/aciklama-tarama.md]
 */
import { writeFileSync } from "node:fs";
import { isAbsolute, join } from "node:path";
import { loadContent, explainTexts, patternExplainTexts, lexemeExplainTexts, ROOT } from "./load.ts";
import { textIssues } from "../../packages/shared/src/explain.ts";

const c = loadContent();
type Row = { file: string; where: string; text: string; issues: string[] };
const rows: Row[] = [];
for (const { file, data } of c.scenarios) for (const x of explainTexts(data)) rows.push({ file, ...x, issues: textIssues(x.text) });
for (const p of c.patterns) for (const x of patternExplainTexts(p)) rows.push({ file: "registry/patterns.json", ...x, issues: textIssues(x.text) });
// PM-035.10: sözlük karşılıkları ve seviye tespiti şıkları da öğrenciye görünür
{ const fileOf = new Map(c.lexiconBatches.flatMap((b) => b.ids.map((id) => [id, b.file] as const)));
  for (const l of c.lexemes) for (const x of lexemeExplainTexts(l)) rows.push({ file: fileOf.get(l.id) || "registry/lexemes.v1/v2", ...x, issues: textIssues(x.text) }); }
for (const a of c.assess) {
  const opts = ("opts_tr" in a ? a.opts_tr : []) as string[];
  opts.forEach((o, i) => rows.push({ file: "assess/bank.json", where: `${a.id}.opts_tr[${i}]`, text: o, issues: textIssues(o) }));
  if ("tr" in a && typeof a.tr === "string") rows.push({ file: "assess/bank.json", where: `${a.id}.tr`, text: a.tr, issues: textIssues(a.tr) });
}
const by = new Map<string, Row[]>();
for (const r of rows) (by.get(r.file) || by.set(r.file, []).get(r.file)!).push(r);
const bad = rows.filter((r) => r.issues.length);
const kinds = new Map<string, number>();
for (const r of bad) for (const i of r.issues) { const k = i.replace(/\d+/g, "N").replace(/: .*/, ""); kinds.set(k, (kinds.get(k) || 0) + 1); }
let md = `# Açıklama taraması (OD-9.4, PM-017)\n\nOtomatik kural taraması (OD-9.3 katman 1). Okur kontrolü (katman 2) ayrıca her açıklamayı okur.\n\n`;
md += `**Toplam ${rows.length} açıklama · kurala aykırı ${bad.length} (%${Math.round((bad.length / Math.max(1, rows.length)) * 100)})**\n\n| Dosya | Açıklama | Aykırı |\n|---|---|---|\n`;
for (const [f, rs] of by) md += `| ${f} | ${rs.length} | ${rs.filter((r) => r.issues.length).length} |\n`;
md += `\n## İhlal türleri\n| Tür | Sayı |\n|---|---|\n`;
for (const [k, n] of [...kinds].sort((a, b) => b[1] - a[1])) md += `| ${k} | ${n} |\n`;
md += `\n## Aykırı açıklamalar (çevrim sırası: bu liste önce)\n`;
for (const [f, rs] of by) { const b = rs.filter((r) => r.issues.length); if (!b.length) continue; md += `\n### ${f}\n| Yer | Metin | Sorun |\n|---|---|---|\n`; for (const r of b) md += `| ${r.where} | ${r.text.replace(/\|/g, "\\|").replace(/\n/g, " ")} | ${r.issues.join("; ")} |\n`; }
const outArg = process.argv.indexOf("--out");
const outRel = outArg > 0 ? process.argv[outArg + 1]! : "docs/v2/reports/aciklama-tarama.md";
const out = isAbsolute(outRel) ? outRel : join(ROOT, outRel);
writeFileSync(out, md);
console.log(`açıklama: ${rows.length} · aykırı: ${bad.length} → ${out}`);
