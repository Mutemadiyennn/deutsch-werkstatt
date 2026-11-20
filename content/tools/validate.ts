/** İçerik kapısı: 0 hata olmadan derleme yapılmaz. Kullanım: npm run content:validate */
import { loadContent, checkRules, ROOT } from "./load.ts";
import { ogretilmemisBosluklar } from "./bosluk.ts";
import { medyaDenetle } from "./medya.ts";
import { halkaDenetle } from "./halka.ts";
import { genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const c = checkRules(loadContent(), { strictPatterns: process.argv.includes("--strict"), strictTeach: process.argv.includes("--strict") });
// B12 3. parça / D-112: kapalı medya açık depoya giremez
c.errors.push(...medyaDenetle(ROOT));
// PM-069 P0 sayacı (uyarı; uygulama bu boşlukları sormaz, içerik düzeltilir)
const bos = ogretilmemisBosluklar(c.lexemes, c.m1.map((g) => g.data));
if (bos.length) {
  const gunluk = new Map<number, number>(); for (const b of bos) gunluk.set(b.gun, (gunluk.get(b.gun) ?? 0) + 1);
  c.warnings.push(`PM-069: cevabı o güne kadar gösterilmemiş boşluk ${bos.length} (${[...gunluk].map(([g, n]) => `${g}. gün ${n}`).join(", ")}); uygulama bunları sormaz, kartın kendi kelimesine düşer`);
}
// AKIS AK-10 1. adım: `halkalar` denetimi (hata) + cümle kapısı sayacı (uyarı); kurallar packages/shared/src/kume.ts
{
  const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
  const genel = existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : [];
  const d = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, genel);
  const h = halkaDenetle(c.m1, new Map(c.temel.map((t) => [t.data.id, t.data])), d);
  c.errors.push(...h.errors); c.warnings.push(...h.warnings);
}
for (const w of c.warnings) console.log("  uyarı:", w);
for (const e of c.errors) console.log("  HATA:", e);
console.log(
  `içerik v2: ${c.domains.length} alan · ${c.lexemes.length} kelime (${c.lexemes.filter((l) => l.tier === "K1").length} K1, ${c.lexemes.filter((l) => l.tier === "K2").length} K2; ${c.lexiconBatches.length} parti) · ${c.patterns.length} kalıp · ${c.grammar.length} dilbilgisi · ${c.scenarios.length} senaryo · ${c.assess.length} seviye tespiti maddesi → ${c.errors.length} hata, ${c.warnings.length} uyarı`
);
if (c.errors.length) process.exit(1);
