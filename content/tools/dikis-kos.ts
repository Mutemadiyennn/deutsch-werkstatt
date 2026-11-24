/**
 * Dikiş denetçisinin komut satırı (PM-090 md. 2.1). Kurallar ve ayrıntı: dikis.ts.
 *   node --experimental-strip-types content/tools/dikis-kos.ts [--tablo <yol>] [--gun N]... [--tum] [--yarim] [--json <çıktı>]
 *   --tablo yoksa curriculum/{a1,a2,b1}-kesin.json birleşimi (PM-117 A.3)
 *   --yarim: dosyası eksik haftada eksik kartları not say (yerel ara koşu); KAPI bu bayrakla koşmaz
 * Çıkış: 0 ihlal yok · 1 ihlal var · 2 tablo/omurga yok ya da okunamadı.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { genelAdlarAyikla, kumeDizini } from "../../packages/shared/src/index.ts";
import { dikisDenetle, dilNoktasiMetni, rapor, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";
import { kesinTabloBirlesik } from "./ktablo.ts";
import { CDIR, ROOT, loadContent } from "./load.ts";

const argv = process.argv.slice(2);
const deger = (ad: string) => { const i = argv.indexOf(ad); return i >= 0 ? argv[i + 1] : undefined; };
const tabloYol = deger("--tablo");
const jsonYol = deger("--json");
const sadece = argv.flatMap((a, i) => (a === "--gun" ? [Number(argv[i + 1])] : [])).filter((x) => Number.isInteger(x));

const tabloHata: string[] = [];
const oku = <T>(yol: string, ad: string): T => {
  if (!existsSync(yol)) { console.error(`HATA: ${ad} yok: ${yol}${ad === "tablo" ? " (A1 kesin kelime tablosu; İÇ-K üretiyor. Dalından almak için --tablo <yol>)" : ""}`); process.exit(2); }
  try { return JSON.parse(readFileSync(yol, "utf8")) as T; } catch (e) { console.error(`HATA: ${ad} okunamadı: ${yol}: ${(e as Error).message}`); process.exit(2); }
};
// --tablo yoksa curriculum/{a1,a2,b1}-kesin.json birleşimi (PM-117 A.3; ktablo.ts kesinTabloBirlesik)
const birlesik = tabloYol ? undefined : kesinTabloBirlesik(CDIR, tabloHata);
if (tabloHata.length) { for (const e of tabloHata) console.error(`HATA: ${e}`); process.exit(2); }
if (birlesik && !birlesik.dosyalar.length) { console.error(`HATA: tablo yok: ${join(CDIR, "curriculum")}/*-kesin.json`); process.exit(2); }
const tablo = birlesik ? (birlesik.tablo as KesinTablo) : oku<KesinTablo>(tabloYol!, "tablo");
const tabloAd = birlesik ? birlesik.dosyalar.join(" + ") : tabloYol!.replace(ROOT + "/", "");
if (!tablo || !Array.isArray(tablo.gunler)) { console.error(`HATA: tablo okunamadı: ${tabloAd}: "gunler" dizisi yok`); process.exit(2); }
const omurga = oku<Omurga>(join(CDIR, "curriculum/omurga.json"), "omurga");

const mdir = join(CDIR, "m1");
const gunler = readdirSync(mdir).filter((f) => /^gun-\d{2,3}\.json$/.test(f)).sort()
  .map((f) => ({ file: `content/v2/m1/${f}`, data: oku<GunHam>(join(mdir, f), "gün dosyası") }));

const c = loadContent();
const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : []);

// dil noktaları (çerçeve kuralı): gr: → registry/grammar.json, dn: → m1/dn-HH.json (grammar.json biçimi; dizi ya da {konular|topics: []})
const dilNoktalari = new Map<string, string[]>(c.grammar.map((n) => [n.id, dilNoktasiMetni(n)]));
for (const f of readdirSync(mdir).filter((x) => /^dn-\d{2}\.json$/.test(x)).sort()) {
  const ham = oku<unknown>(join(mdir, f), "dil noktası dosyası");
  const l = Array.isArray(ham) ? ham : Object.values((ham ?? {}) as Record<string, unknown>).find(Array.isArray) ?? [];
  for (const n of l as { id?: unknown }[]) if (typeof n?.id === "string") dilNoktalari.set(n.id, dilNoktasiMetni(n));
}

const r = dikisDenetle({ gunler, tablo, omurga, dizin, dersler: new Map(c.temel.map((t) => [t.data.id, t.data])), dilNoktalari, sadece, tum: argv.includes("--tum"), yarim: argv.includes("--yarim") });
console.log(`Dikiş denetçisi (PM-090 md. 2.1) · tablo ${tabloAd}`);
console.log(rapor(r));
if (jsonYol) writeFileSync(jsonYol, JSON.stringify(r, null, 2));
process.exit(r.toplam ? 1 : 0);
