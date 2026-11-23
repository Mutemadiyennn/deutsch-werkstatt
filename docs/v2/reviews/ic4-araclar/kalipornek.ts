// Her halka kalıp çerçevesi için K(t) içi örnek var mı (görev cümleleri; tablo K(t)). Kullanım: kalipornek.ts <a1-kesin.json> günler...
import { loadContent, ROOT } from "/home/claude/deutsch-werkstatt/content/tools/load.ts";
import { genelAdlarAyikla, kumeDizini, bilinmeyenler, kalipSecenekleri, kalipToks, toks, YUVA } from "/home/claude/deutsch-werkstatt/packages/shared/src/index.ts";
import { existsSync, readFileSync } from "node:fs"; import { join } from "node:path";
const [ky, ...g] = process.argv.slice(2); const kesin = JSON.parse(readFileSync(ky!, "utf8"));
const c = loadContent(); const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
const d = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : []);
const once = new Set<string>(); for (const l of Object.values<string[]>(kesin.ogretilmis_sayilan.gunler)) l.forEach((x) => once.add(x));
const r0 = c.temel.map((t) => t.data.id);
let eks = 0, top = 0;
for (const gg of kesin.gunler) {
  const day = gg.day; const f = join(ROOT, `content/v2/m1/gun-${String(day).padStart(2, "0")}.json`);
  if (!g.includes(String(day)) || !existsSync(f)) { gg.kartlar.forEach((x: string) => once.add(x)); continue; }
  const gun = JSON.parse(readFileSync(f, "utf8")); const gor = new Set<string>(); const kal: string[][] = [];
  for (const h of gun.halkalar) {
    h.kartlar.forEach((x: string) => gor.add(x)); for (const kp of h.kaliplar ?? []) kal.push(...kalipSecenekleri(kp.de));
    const k = { kart: new Set([...once, ...gor]), biten: new Set([...r0, ...(h.dersten_sonra ? gun.dersler : [])]), kaliplar: kal };
    const tum = (o: any): string[] => Array.isArray(o) ? o.flatMap(tum) : o && typeof o === "object" ? Object.entries(o).flatMap(([kk, v]) => (kk === "de" || kk === "audio_de" || kk === "prompt_de") && typeof v === "string" ? [v] : kk === "accepted" && Array.isArray(v) && typeof v[0] === "string" ? [v[0]] : tum(v)) : [];
    const cs = process.env.GENIS ? tum(gun) : gun.halkalar.flatMap((x: any) => x.gorev_cumleleri.map((y: any) => y.de));
    for (const kp of h.kaliplar ?? []) for (const sec of kp.de.split(/\s[–—]\s/)) {
      const sb = kalipToks(sec).filter((x) => x !== YUVA); if (!sb.length) continue; top++;
      const kx = process.env.KART ? c.lexemes.flatMap((l: any) => (l.examples ?? []).map((e: any) => e.de)) : [];
      const ok = [...cs, ...kx].some((de: string) => { const w = new Set(toks(de)); return sb.every((t) => w.has(t)) && !bilinmeyenler(d, de, k).length; });
      if (!ok) { eks++; console.log(`  ${day} ${h.id}: örneksiz çerçeve "${sec}"`); }
    }
  }
  gun.yeni_kartlar.forEach((x: string) => once.add(x));
}
console.log(`kalıp çerçevesi ${top}, örneksiz ${eks}`);
