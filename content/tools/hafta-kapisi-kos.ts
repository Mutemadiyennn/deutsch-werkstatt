/**
 * Hafta kapısının komut satırı (PM-087 B.1; ayrıntı hafta-kapisi.ts).
 *   node --experimental-transform-types content/tools/hafta-kapisi-kos.ts (--hafta N | --hepsi) [--tablo <yol>] [--esik 0.8] [--m1 <dizin>] [--json <çıktı>] [--md <çıktı>]
 *   --hepsi: gün dosyası olan her hafta (2. hafta ve sonrası; 1. hafta tablo öncesi/eski biçim); KAPI içerik adımı bununla koşar
 *   --konusma-zorunlu: konuşma payı eşiğini bayrak kapalıyken de kapı say (test ve bayrak açılış provası)
 *   --m1 <dizin>: gün dosyalarının dizini (varsayılan content/v2/m1; testler içerikten bağımsız fikstür dizini verir, PM-117 A.1)
 * Girdi: content/v2/m1/gun-NN.json (o haftanın 7 günü), hafta-sonu-testi-HH.json, gorulmemis-HH.json, dn-HH.json;
 * curriculum/{a1,a2,b1}-kesin.json birleşimi (ya da --tablo), curriculum/omurga.json, sözlük, temel dersler, grammar.json.
 * Çıkış: 0 geçti · 1 kaldı · 2 girdi yok ya da okunamadı.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { Gun, genelAdlarAyikla, kumeDizini, type DilNoktasi } from "../../packages/shared/src/index.ts";
import { haftaOf, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";
import { dilNoktasiMetni, haftaKapisi, kapiRaporu } from "./hafta-kapisi.ts";
import { kesinTabloBirlesik } from "./ktablo.ts";
import { konusmaPaylari, payRaporu } from "./konusma-payi.ts";
import { CDIR, ROOT, loadContent } from "./load.ts";

const argv = process.argv.slice(2);
const deger = (ad: string) => { const i = argv.indexOf(ad); return i >= 0 ? argv[i + 1] : undefined; };
const hepsi = argv.includes("--hepsi");
const tekHafta = Number(deger("--hafta"));
if (!hepsi && (!Number.isInteger(tekHafta) || tekHafta < 1)) { console.error("HATA: --hafta N ya da --hepsi gerekli (N ≥ 1)"); process.exit(2); }
const tabloYol = deger("--tablo");
const oku = <T>(yol: string, ad: string, zorunlu = true): T | undefined => {
  if (!existsSync(yol)) { if (!zorunlu) return undefined; console.error(`HATA: ${ad} yok: ${yol}`); process.exit(2); }
  try { return JSON.parse(readFileSync(yol, "utf8")) as T; } catch (e) { console.error(`HATA: ${ad} okunamadı: ${yol}: ${(e as Error).message}`); process.exit(2); }
};
// --tablo yoksa curriculum/{a1,a2,b1}-kesin.json birleşimi (PM-117 A.3; ktablo.ts kesinTabloBirlesik)
const tabloHata: string[] = [];
const birlesik = tabloYol ? undefined : kesinTabloBirlesik(CDIR, tabloHata);
if (tabloHata.length) { for (const e of tabloHata) console.error(`HATA: ${e}`); process.exit(2); }
if (birlesik && !birlesik.dosyalar.length) { console.error(`HATA: tablo yok: ${join(CDIR, "curriculum")}/*-kesin.json`); process.exit(2); }
const tablo = birlesik ? (birlesik.tablo as KesinTablo) : oku<KesinTablo>(tabloYol!, "tablo")!;
const omurga = oku<Omurga>(join(CDIR, "curriculum/omurga.json"), "omurga")!;
const mdir = deger("--m1") ?? join(CDIR, "m1");
if (!existsSync(mdir)) { console.error(`HATA: gün dizini yok: ${mdir}`); process.exit(2); }
const dosyalar = readdirSync(mdir);
const gunler = dosyalar.filter((f) => /^gun-\d{2,3}\.json$/.test(f)).sort().map((f) => ({ file: relative(ROOT, join(mdir, f)), data: oku<GunHam>(join(mdir, f), "gün dosyası")! }));

const c = loadContent();
const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
const dizin = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : []);
const dilNoktalari = new Map<string, string[]>(c.grammar.map((n) => [n.id, dilNoktasiMetni(n)]));
const dnHam: DilNoktasi[] = [];
for (const f of dosyalar.filter((x) => /^dn-\d{2}\.json$/.test(x)).sort()) {
  const ham = oku<unknown>(join(mdir, f), "dil noktası dosyası");
  const l = Array.isArray(ham) ? ham : Object.values((ham ?? {}) as Record<string, unknown>).find(Array.isArray) ?? [];
  for (const n of l as { id?: unknown }[]) if (typeof n?.id === "string") { dilNoktalari.set(n.id, dilNoktasiMetni(n)); dnHam.push(n as DilNoktasi); }
}
// konuşma payı (PM-148 karar 3): 1. hafta dahil gün dosyası olan her hafta; bayrak kapalıyken uyarı, açıkken (ya da --konusma-zorunlu) kapı
// şemadan geçmeyen gün paya girmez (doğrulayıcı onu ayrıca hata sayar); şema varsayılanları (sesler: []) planlayıcı için gerekli
const gunlerP = gunler.flatMap((x) => { const r = Gun.safeParse(x.data); return r.success ? [r.data] : []; });
const payHaftalar = hepsi ? [...new Set(gunlerP.map((x) => haftaOf(x.day)))].sort((a, b) => a - b) : [tekHafta];
const paylar = konusmaPaylari(c, gunlerP, dnHam, payHaftalar, argv.includes("--konusma-zorunlu") || undefined);
const payKaldi = paylar.some((p) => !p.gecti && p.zorunlu);
const esik = deger("--esik") ? Number(deger("--esik")) : undefined;
const haftalar = hepsi ? [...new Set(gunler.map((x) => x.data?.day).filter((n): n is number => typeof n === "number" && n >= 8).map(haftaOf))].sort((a, b) => a - b) : [tekHafta];
if (!haftalar.length) {
  console.log(["Hafta kapısı: 2. hafta ve sonrası için gün dosyası yok; denetlenecek hafta yok.", ...paylar.map(payRaporu)].join("\n"));
  process.exit(payKaldi ? 1 : 0);
}
const dersler = new Map(c.temel.map((t) => [t.data.id, t.data]));
// yalnız incelenmiş deneme (derleme de yalnız onu pakete alır; taslak denemeli sınav günü uygulamada bitmez)
const denemeler = new Map(c.deneme.filter((x) => x.data.review.status === "reviewed").map((x) => [x.data.id, x.data.bolumler.map((b) => b.id)] as const));
const sonuclar = haftalar.map((hafta) => {
  const HH = String(hafta).padStart(2, "0");
  const test = oku<unknown>(join(mdir, `hafta-sonu-testi-${HH}.json`), "hafta sonu testi", false);
  const gorulmemis = oku<unknown>(join(mdir, `gorulmemis-${HH}.json`), "görülmemiş durum", false);
  return haftaKapisi({ hafta, gunler, tablo, omurga, dizin, dersler, dilNoktalari, test, gorulmemis, denemeler, esik });
});
const payOf = (h: number) => paylar.find((p) => p.hafta === h);
const md = [...paylar.filter((p) => !haftalar.includes(p.hafta)).map(payRaporu), ...sonuclar.map((r) => [kapiRaporu(r), payOf(r.hafta) ? payRaporu(payOf(r.hafta)!) : ""].filter(Boolean).join("\n"))].join("\n\n");
console.log(md);
const json = sonuclar.map((r) => ({ ...r, konusma_payi: payOf(r.hafta) }));
if (deger("--json")) writeFileSync(deger("--json")!, JSON.stringify(hepsi ? json : json[0], null, 2));
if (deger("--md")) writeFileSync(deger("--md")!, md + "\n");
process.exit(sonuclar.every((r) => r.gecti) && !payKaldi ? 0 : 1);
