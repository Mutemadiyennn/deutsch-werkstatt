/** İçerik kapısı: 0 hata olmadan derleme yapılmaz. Kullanım: npm run content:validate */
import { loadContent, checkRules } from "./load.ts";

const c = checkRules(loadContent(), { strictPatterns: process.argv.includes("--strict") });
for (const w of c.warnings) console.log("  uyarı:", w);
for (const e of c.errors) console.log("  HATA:", e);
console.log(
  `içerik v2: ${c.domains.length} alan · ${c.lexemes.length} kelime (${c.lexemes.filter((l) => l.tier === "K1").length} K1, ${c.lexemes.filter((l) => l.tier === "K2").length} K2; ${c.lexiconBatches.length} parti) · ${c.patterns.length} kalıp · ${c.grammar.length} dilbilgisi · ${c.scenarios.length} senaryo · ${c.assess.length} seviye tespiti maddesi → ${c.errors.length} hata, ${c.warnings.length} uyarı`
);
if (c.errors.length) process.exit(1);
