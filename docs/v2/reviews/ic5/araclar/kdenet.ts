/**
 * İÇ-5 yerel K(t) denetçisi (şema 8+. günü tanıyana kadar). Kullanım (depo kökünden):
 *   node --experimental-strip-types <bu dosya> 29 35
 * - 1–7. gün: depodaki dosyalar; 8..(ilk-1): a1-kesin.json'dan saplama gün (yalnız yeni_kartlar + omurga dersleri);
 *   ilk..son: content/v2/m1/gun-NN.json ham JSON (şema atlanır).
 * - gr:/dn: dersleri grammar.json'dan sözde temel ders olarak (ex → teach kalıbı, table.rows → tablo) K(t)'ye katılır.
 * - Çıktı: halka.ts hataları/uyarıları (resmî kurallar) + günün bütün görev cümlelerinde bilinmeyenler + hafta içi tekrar eden cümle
 *   + halka kalıbı örneksiz.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const R = process.cwd();
const { loadContent } = await import(join(R, "content/tools/load.ts"));
const { halkaDenetle, gunCumleleri } = await import(join(R, "content/tools/halka.ts"));
const S = await import(join(R, "packages/shared/src/index.ts"));
const { kumeDizini, genelAdlarAyikla, bilinmeyenler, bilinmeyenYazi, kalipSecenekleri, kalipOrtu, toks } = S;

const [ilk, son] = process.argv.slice(2).map(Number) as [number, number];
const c = loadContent();
const J = (p: string) => JSON.parse(readFileSync(join(R, p), "utf8"));
const gram = new Map<string, any>((J("content/v2/registry/grammar.json") as any[]).map((g) => [g.id, g]));
const om = J("content/v2/curriculum/omurga.json");
const omGun = new Map<number, any>(om.gunler.map((g: any) => [g.day, g]));
// a1-kesin.json: gün → kart kimlikleri (biçim tolerant)
function kesinKartlar(): Map<number, string[]> {
  const m = new Map<number, string[]>(); const p = process.env.A1K ?? join(R, "content/v2/curriculum/a1-kesin.json");
  if (!existsSync(p)) return m;
  const k = JSON.parse(readFileSync(p, "utf8")); for (const [d, v] of Object.entries(k.ogretilmis_sayilan?.gunler ?? {})) m.set(Number(d), v as string[]); const g = k.gunler ?? k.days ?? k;
  if (Array.isArray(g)) for (const x of g) m.set(Number(x.day ?? x.gun), x.kartlar ?? x.yeni_kartlar ?? x.ids ?? []);
  else for (const [d, v] of Object.entries(g)) if (/^\d+$/.test(d)) m.set(Number(d), Array.isArray(v) ? (v as string[]) : ((v as any).kartlar ?? (v as any).yeni_kartlar ?? []));
  return m;
}
const kesin = kesinKartlar();

const sozde = (id: string) => {
  const g = gram.get(id); if (!g) return null;
  return { id, teach: (g.ex ?? []).map((e: any, i: number) => ({ id: `${id}:x${i}`, de: e.de, tr: e.tr })), table: g.table ? { satirlar: g.table.rows } : undefined, drills: [] };
};
const gerekli = new Set<string>();
for (let d = 8; d <= son; d++) for (const x of omGun.get(d)?.dersler ?? []) gerekli.add(x);
const sozdeDersler = [...gerekli].map(sozde).filter(Boolean) as any[];
const temel = [...c.temel.map((t: any) => t.data), ...sozdeDersler];
const ga = join(R, "docs/v2/reviews/genel-adlar.md");
const d = kumeDizini(c.lexemes, temel, c.world, existsSync(ga) ? genelAdlarAyikla(readFileSync(ga, "utf8")) : []);
const dersMap = new Map(temel.map((t: any) => [t.id, t]));

const gunler: { file: string; data: any }[] = c.m1.filter((g: any) => g.data.day <= 7).map((g: any) => ({ file: g.file, data: { ...g.data, yeni_kartlar: kesin.get(g.data.day) ?? g.data.yeni_kartlar } }));
for (let n = 8; n < ilk; n++) gunler.push({ file: `saplama-${n}`, data: { day: n, dersler: omGun.get(n)?.dersler ?? [], yeni_kartlar: kesin.get(n) ?? [], sesler: [] } });
const benim: { file: string; data: any }[] = [];
for (let n = ilk; n <= son; n++) {
  const f = `content/v2/m1/gun-${String(n).padStart(2, "0")}.json`;
  if (!existsSync(join(R, f))) { gunler.push({ file: `saplama-${n}`, data: { day: n, dersler: omGun.get(n)?.dersler ?? [], yeni_kartlar: kesin.get(n) ?? [], sesler: [] } }); continue; }
  const raw = JSON.parse(readFileSync(join(R, f), "utf8"));
  const sp = S.Gun.omit({ day: true, dersler: true, id: true }).safeParse(raw);
  if (!sp.success) { for (const i of sp.error.issues.slice(0, 15)) console.log(`ŞEMA ${f}: ${i.path.join(".")}: ${i.message}`); continue; }
  if (raw.id !== `m1:gun:${String(n).padStart(2, "0")}` || raw.day !== n) console.log(`ŞEMA ${f}: id/day dosya adıyla uyuşmuyor`);
  for (const x of raw.dersler ?? []) if (!gram.has(x) && !om.dil_noktasi_onerileri.some((y: any) => y.id === x)) console.log(`ŞEMA ${f}: ders ${x} bilinmiyor`);
  const data = { ...sp.data, id: raw.id, day: raw.day, dersler: raw.dersler ?? [] }; gunler.push({ file: f, data }); benim.push({ file: f, data });
}
if (!kesin.size) console.log("UYARI: a1-kesin.json yok; 8+. gün saplamaları boş");
const h = halkaDenetle(gunler as any, dersMap as any, d);
for (const e of h.errors.filter((x: string) => benim.some((b) => x.startsWith(b.file)))) console.log("HALKA HATA:", e);
for (const w of h.warnings.filter((x: string) => benim.some((b) => x.startsWith(b.file)))) console.log("halka uyarı:", w);

// görev cümleleri ayrıntısı (İÇ "B" kipi: günün dersleri yapılmış, günün kartları tanıtılmış)
const onceKart = new Set<string>(), onceDers = new Set<string>();
const gorulen = new Map<string, string>();
const sade = (s: string) => s.toLowerCase().replace(/[.,!?;:„“"'»«()–-]/g, " ").replace(/\s+/g, " ").trim();
for (const { file, data: g } of [...gunler].sort((a, b) => a.data.day - b.data.day)) {
  const dersKart = (g.dersler ?? []).flatMap((id: string) => [...(d.dersler.get(id)?.kart ?? [])]);
  if (benim.some((b) => b.file === file)) {
    const kB = { kart: new Set([...onceKart, ...g.yeni_kartlar, ...dersKart]), biten: new Set([...onceDers, ...g.dersler]), kaliplar: (g.halkalar ?? []).flatMap((x: any) => (x.kaliplar ?? []).flatMap((kp: any) => kalipSecenekleri(kp.de))) };
    const cs = gunCumleleri(g, dersMap as any);
    let ihlal = 0;
    for (const x of cs) {
      const u = bilinmeyenler(d, x.de, kB);
      if (x.tur === "gorev" && u.length) { ihlal++; console.log(`  ${file} [${x.yer}] görev: ${bilinmeyenYazi(u).join(", ")} :: ${x.de}`); }
      if (x.tur === "gosterim" && u.length > 1) console.log(`  ${file} [${x.yer}] gösterim ${u.length}: ${bilinmeyenYazi(u).join(", ")} :: ${x.de.slice(0, 90)}`);
    }
    // halka görev cümleleri + prova seçenekleri + sınav: hafta içi tekrar
    const hepsi: string[] = [];
    for (const hk of g.halkalar ?? []) { for (const gc of hk.gorev_cumleleri) hepsi.push(gc.de); for (const s of hk.sahne?.satirlar ?? []) hepsi.push(s.de); }
    for (const x of cs) if (!x.yer.startsWith("ders")) hepsi.push(x.de);
    const bugun = new Set<string>();
    for (const s of hepsi) { const k = sade(s); if (k.split(" ").length < 3) continue; if (gorulen.has(k) && gorulen.get(k) !== file) console.log(`  TEKRAR (${gorulen.get(k)}): ${s}`); bugun.add(k); }
    for (const k of bugun) if (!gorulen.has(k)) gorulen.set(k, file);
    // halka kalıbı örneği
    for (const hk of g.halkalar ?? []) for (const kp of hk.kaliplar ?? []) {
      const ornek = [...hk.gorev_cumleleri.map((x: any) => x.de), ...(hk.sahne?.satirlar ?? []).map((x: any) => x.de)];
      const ok = kalipSecenekleri(kp.de).some((k: string[]) => ornek.some((o) => kalipOrtu(toks(o), k).length));
      if (!ok) console.log(`  KALIP ÖRNEKSİZ ${file} ${hk.id}: ${kp.de}`);
    }
    // yeni_kartlar = kesin
    const ks = kesin.get(g.day);
    if (ks) { const a = new Set(ks), b = new Set(g.yeni_kartlar); const eks = ks.filter((x) => !b.has(x)), faz = g.yeni_kartlar.filter((x: string) => !a.has(x)); if (eks.length || faz.length) console.log(`  KESİN UYUŞMAZ ${file}: eksik ${eks.join(",") || "-"} fazla ${faz.join(",") || "-"}`); }
    console.log(`${file}: görev cümlesi ${cs.filter((x: any) => x.tur === "gorev").length}, bilinmeyenli ${ihlal}; kart ${g.yeni_kartlar.length}; halka ${(g.halkalar ?? []).length}`);
  }
  for (const x of g.yeni_kartlar ?? []) onceKart.add(x);
  for (const x of dersKart) onceKart.add(x);
  for (const x of g.dersler ?? []) onceDers.add(x);
}
