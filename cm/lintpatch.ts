// Yama dosyasının OD-9 denetimi: tsx lintpatch.ts work/batch-001.lex.json
import { readFileSync } from "node:fs";
import { textIssues, explanationIssues, Explanation } from "/home/claude/deutsch-werkstatt/packages/shared/src/explain.ts";

const file = process.argv[2];
const patch = JSON.parse(readFileSync(file, "utf8")) as Record<string, any>;
let bad = 0;
for (const [id, c] of Object.entries(patch)) {
  const out: string[] = [];
  if (c.tr !== undefined) for (const x of textIssues(c.tr)) out.push(`tr: ${x}`);
  if (c.exp !== undefined) {
    const r = Explanation.safeParse(c.exp);
    if (!r.success) out.push("exp: şema hatası");
    else for (const x of explanationIssues(r.data)) out.push(`exp.${x}`);
  }
  (c.mistakes_tr || []).forEach((m: string, i: number) => {
    for (const x of textIssues(m)) out.push(`mistakes_tr[${i}]: ${x}`);
  });
  if (out.length) {
    bad++;
    console.log(`${id} → ${out.join(" | ")}`);
  }
}
console.log(`kart ${Object.keys(patch).length}, sorunlu ${bad}`);
process.exit(bad ? 1 : 0);
