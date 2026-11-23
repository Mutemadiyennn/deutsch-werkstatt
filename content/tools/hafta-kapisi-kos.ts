/**
 * Hafta kapısının komut satırı (PM-087 B.1; ayrıntı hafta-kapisi.ts).
 *   node --experimental-strip-types content/tools/hafta-kapisi-kos.ts (--hafta N | --hepsi) [--tablo <yol>] [--esik 0.8] [--json <çıktı>] [--md <çıktı>]
 *   --hepsi: gün dosyası olan her hafta (2. hafta ve sonrası; 1. hafta tablo öncesi/eski biçim); KAPI içerik adımı bununla koşar
 * Girdi: content/v2/m1/gun-NN.json (o haftanın 7 günü), hafta-sonu-testi-HH.json, gorulmemis-HH.json, dn-HH.json;
 * curriculum/a1-kesin.json (ya da --tablo), curriculum/omurga.json, sözlük, temel dersler, grammar.json.
 * Çıkış: 0 geçti · 1 kaldı · 2 girdi yok ya da okunamadı.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { haftaOf, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";
import { dilNoktasiMetni, dilNoktasiSatirlari, haftaKapisi, kapiRaporu } from "./hafta-kapisi.ts";
import { CDIR, ROOT, loadContent } from "./load.ts";

const argv = process.argv.slice(2);
const deger = (ad: string) => { const i = argv.indexOf(ad); return i >= 0 ? argv[i + 1] : undefined; };
const hepsi = argv.includes("--hepsi");
const tekHafta = Number(deger("--hafta"));
if (!hepsi && (!Number.isInteger(tekHafta) || tekHafta < 1)) { console.error("HATA: --hafta N ya da --hepsi gerekli (N ≥ 1)"); process.exit(2); }
const tabloYol = deger("--tablo") ?? join(CDIR, "curriculum/a1-kesin.json");
const oku = <T>(yol: string, ad: string, zorunlu = true): T | undefined => {
  if (!existsSync(yol)) { if (!zorunlu) return undefined; console.error(`HATA: ${ad} yok: ${yol}`); process.exit(2); }
  try { return JSON.parse(readFileSync(yol, "utf8")) as T; } catch (e) { console.error(`HATA: ${ad} okunamadı: ${yol}: ${(e as Error).message}`); process.exit(2); }
};
const tablo = oku<KesinTablo>(tabloYol, "tablo")!;
const omurga = oku<Omurga>(join(CDIR, "curriculum/omurga.json"), "omurga")!;
const mdir = join(CDIR, "m1");
const dosyalar = readdirSync(mdir);
const gunler = dosyalar.filter((f) => /^gun-\d{2,3}\.json$/.test(f)).sort().map((f) => ({ file: `content/v2/m1/${f}`, data: oku<GunHam>(join(mdir, f), "gün dosyası")! }));

const c = loadContent();
const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : []);
const dilNoktalari = new Map<string, string[]>(c.grammar.map((n) => [n.id, dilNoktasiMetni(n)]));
const dilNoktasiSatirlari_ = new Map<string, string[][]>(c.grammar.map((n) => [n.id, dilNoktasiSatirlari(n)]));
for (const f of dosyalar.filter((x) => /^dn-\d{2}\.json$/.test(x)).sort()) {
  const ham = oku<unknown>(join(mdir, f), "dil noktası dosyası");
  const l = Array.isArray(ham) ? ham : Object.values((ham ?? {}) as Record<string, unknown>).find(Array.isArray) ?? [];
  for (const n of l as { id?: unknown }[]) if (typeof n?.id === "string") { dilNoktalari.set(n.id, dilNoktasiMetni(n)); dilNoktasiSatirlari_.set(n.id, dilNoktasiSatirlari(n)); }
}
const esik = deger("--esik") ? Number(deger("--esik")) : undefined;
const haftalar = hepsi ? [...new Set(gunler.map((x) => x.data?.day).filter((n): n is number => typeof n === "number" && n >= 8).map(haftaOf))].sort((a, b) => a - b) : [tekHafta];
if (!haftalar.length) { console.log("Hafta kapısı: 2. hafta ve sonrası için gün dosyası yok; denetlenecek hafta yok."); process.exit(0); }
const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
const sonuclar = haftalar.map((hafta) => {
  const HH = String(hafta).padStart(2, "0");
  const test = oku<unknown>(join(mdir, `hafta-sonu-testi-${HH}.json`), "hafta sonu testi", false);
  const gorulmemis = oku<unknown>(join(mdir, `gorulmemis-${HH}.json`), "görülmemiş durum", false);
  return haftaKapisi({ hafta, gunler, tablo, omurga, dizin, dersler, dilNoktalari, dilNoktasiSatirlari: dilNoktasiSatirlari_, test, gorulmemis, esik });
});
const md = sonuclar.map(kapiRaporu).join("\n\n");
console.log(md);
if (deger("--json")) writeFileSync(deger("--json")!, JSON.stringify(hepsi ? sonuclar : sonuclar[0], null, 2));
if (deger("--md")) writeFileSync(deger("--md")!, md + "\n");
process.exit(sonuclar.every((r) => r.gecti) ? 0 : 1);
