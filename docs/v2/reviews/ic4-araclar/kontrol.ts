// İÇ-4 yerel kontrol (repo dosyalarını değiştirmez). Şema 8.+ günü henüz kabul etmediği için (PM-092 md. 3, hat D)
// gün dosyaları gevşetilmiş şemayla (day ≤ 364, dersler r0|gr|dn) burada okunur; K(t) için dosyası olmayan günler a1-kesin.json'dan.
// Kullanım: node --experimental-strip-types kontrol.ts <a1-kesin.json> [15 16 ...]   (gün verilmezse 15–28)
import { loadContent, ROOT } from "/home/claude/deutsch-werkstatt/content/tools/load.ts";
import { halkaDenetle, gunCumleleri } from "/home/claude/deutsch-werkstatt/content/tools/halka.ts";
import { checkGun } from "/home/claude/deutsch-werkstatt/content/tools/m1check.ts";
import { Gun } from "/home/claude/deutsch-werkstatt/packages/shared/src/m1.ts";
import { textIssues } from "/home/claude/deutsch-werkstatt/packages/shared/src/explain.ts";
import { genelAdlarAyikla, kumeDizini, bilinmeyenler, bilinmeyenYazi, kalipSecenekleri } from "/home/claude/deutsch-werkstatt/packages/shared/src/index.ts";
import { z } from "/home/claude/deutsch-werkstatt/node_modules/zod/index.js";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
const [kesinYol, ...arg] = process.argv.slice(2);
const secili = arg.length ? arg.map(Number) : Array.from({ length: 14 }, (_, i) => 15 + i);
const kesin = JSON.parse(readFileSync(kesinYol!, "utf8"));
const ogr: Record<string, string[]> = kesin.ogretilmis_sayilan?.gunler ?? {};
const tablo = new Map<number, string[]>(kesin.gunler.map((g: any) => [g.day, g.kartlar]));
const c = loadContent();
const grammarIds = new Set(c.grammar.map((g: any) => g.id));
const ga = join(ROOT, "docs/v2/reviews/genel-adlar.md");
const d = kumeDizini(c.lexemes, c.temel.map((t) => t.data), c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : []);
const Gevsek = (Gun as any).extend({ day: z.number().int().min(1).max(364), dersler: z.array(z.string().regex(/^(r0:\d{2}-[a-z0-9-]+|gr:a\d-\d{2}:t\d+|dn:[a-z0-9-]+)$/)).default([]), id: z.string().regex(/^m1:gun:\d{2,3}$/) });
const mdir = join(ROOT, "content/v2/m1");
const ham = new Map<number, { file: string; data: any }>();
for (const f of readdirSync(mdir).filter((f) => /^gun-\d{2,3}\.json$/.test(f))) {
  const raw = JSON.parse(readFileSync(join(mdir, f), "utf8"));
  const p = Gevsek.safeParse(raw);
  if (!p.success) { if (raw.day >= 8) for (const i of p.error.issues.slice(0, 15)) console.log(`ŞEMA ${f}: ${i.path.join(".")}: ${i.message}`); continue; }
  const g = p.data; if (g.day <= 7 && !g.halkalar && ogr[String(g.day)]) g.yeni_kartlar = ogr[String(g.day)];
  ham.set(g.day, { file: `content/v2/m1/${f}`, data: g });
}
for (const [g, k] of tablo) if (!ham.has(g)) ham.set(g, { file: `tablo-${g}`, data: { day: g, dersler: [], yeni_kartlar: k, sesler: [], gorsel: [] } });
const gunler = [...ham.values()].sort((a, b) => a.data.day - b.data.day);
const temel = new Map(c.temel.map((t) => [t.data.id, t.data]));
const h = halkaDenetle(gunler as any, temel, d);
const benim = (s: string) => secili.some((n) => s.includes(`gun-${n}.json`));
let hata = 0;
for (const e of h.errors.filter(benim)) { console.log("HALKA", e); hata++; }
for (const w of h.warnings.filter(benim)) console.log("uyarı", w);
const temelIds = new Set([...c.temel.map((t) => t.data.id), ...grammarIds]);
const lx = new Set(c.lexemes.map((l) => l.id));
const once = new Set<string>(); const onceD = new Set<string>();
for (const { file, data: g } of gunler) {
  const ders = (g.dersler ?? []) as string[];
  if (secili.includes(g.day) && !file.startsWith("tablo")) {
    const t = tablo.get(g.day) ?? [];
    const yk = new Set(g.yeni_kartlar); const eks = t.filter((x) => !yk.has(x)), faz = g.yeni_kartlar.filter((x: string) => !t.includes(x));
    if (eks.length || faz.length) { console.log(`TABLO gün ${g.day}: eksik ${eks.join(",") || "-"} fazla ${faz.join(",") || "-"}`); hata++; }
    const r = checkGun(g, { lexicon: lx, temel: temelIds });
    for (const e of r.errors) { console.log(`M1 ${file}: ${e}`); hata++; }
    for (const w of r.warnings) if (!/gerçek insan videosu/.test(w)) console.log(`m1-uyarı ${file}: ${w}`);
    const k = { kart: new Set([...once, ...g.yeni_kartlar]), biten: new Set([...onceD, ...ders]), kaliplar: (g.halkalar ?? []).flatMap((x: any) => (x.kaliplar ?? []).flatMap((kp: any) => kalipSecenekleri(kp.de))) };
    for (const cm of gunCumleleri(g, temel)) { const u = bilinmeyenler(d, cm.de, k); if (u.length) console.log(`  K ${g.day} ${cm.yer}/${cm.tur}: [${bilinmeyenYazi(u).join(", ")}] ${cm.de}`); }
    // OD-9: öğrenciye görünen kısa Türkçe alanlar
    const gez = (v: any, p: string) => { if (Array.isArray(v)) v.forEach((x, i) => gez(x, `${p}[${i}]`)); else if (v && typeof v === "object") for (const [kk, vv] of Object.entries(v)) { if (typeof vv === "string" && /(why_tr|geri_bildirim_tr|ipucu_tr)$/.test(kk)) { const iss = textIssues(vv); if (iss.length) console.log(`  OD9 ${g.day} ${p}.${kk}: ${iss.join(" | ")}`); } else gez(vv, `${p}.${kk}`); } };
    gez(g, "");
  }
  for (const x of g.yeni_kartlar ?? []) once.add(x); for (const x of ders) onceD.add(x);
}
console.log(`kontrol bitti: ${hata} hata (halka + tablo + m1check)`);
