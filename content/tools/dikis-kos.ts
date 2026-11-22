/**
 * Dikiş denetçisinin komut satırı (PM-090 md. 2.1). Kurallar ve ayrıntı: dikis.ts.
 *   node --experimental-strip-types content/tools/dikis-kos.ts [--tablo <yol>] [--gun N]... [--tum] [--json <çıktı>]
 * Çıkış: 0 ihlal yok · 1 ihlal var · 2 tablo/omurga yok ya da okunamadı.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { dikisDenetle, rapor, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";
import { CDIR, ROOT, loadContent } from "./load.ts";

const argv = process.argv.slice(2);
const deger = (ad: string) => { const i = argv.indexOf(ad); return i >= 0 ? argv[i + 1] : undefined; };
const tabloYol = deger("--tablo") ?? join(CDIR, "curriculum/a1-kesin.json");
const jsonYol = deger("--json");
const sadece = argv.flatMap((a, i) => (a === "--gun" ? [Number(argv[i + 1])] : [])).filter((x) => Number.isInteger(x));

const oku = <T>(yol: string, ad: string): T => {
  if (!existsSync(yol)) { console.error(`HATA: ${ad} yok: ${yol}${ad === "tablo" ? " (A1 kesin kelime tablosu; İÇ-K üretiyor. Dalından almak için --tablo <yol>)" : ""}`); process.exit(2); }
  try { return JSON.parse(readFileSync(yol, "utf8")) as T; } catch (e) { console.error(`HATA: ${ad} okunamadı: ${yol}: ${(e as Error).message}`); process.exit(2); }
};
const tablo = oku<KesinTablo>(tabloYol, "tablo");
if (!Array.isArray(tablo.gunler)) { console.error(`HATA: tablo okunamadı: ${tabloYol}: "gunler" dizisi yok`); process.exit(2); }
const omurga = oku<Omurga>(join(CDIR, "curriculum/omurga.json"), "omurga");

const mdir = join(CDIR, "m1");
const gunler = readdirSync(mdir).filter((f) => /^gun-\d{2,3}\.json$/.test(f)).sort()
  .map((f) => ({ file: `content/v2/m1/${f}`, data: oku<GunHam>(join(mdir, f), "gün dosyası") }));

const c = loadContent();
const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : []);

const r = dikisDenetle({ gunler, tablo, omurga, dizin, dersler: new Map(c.temel.map((t) => [t.data.id, t.data])), sadece, tum: argv.includes("--tum") });
console.log(`Dikiş denetçisi (PM-090 md. 2.1) · tablo ${tabloYol.replace(ROOT + "/", "")}`);
console.log(rapor(r));
if (jsonYol) writeFileSync(jsonYol, JSON.stringify(r, null, 2));
process.exit(r.toplam ? 1 : 0);
