// K(t) ve kalıp çerçevesi örneği denetçisi (rapor aracı; İÇ-3, PM-084 hat C). Doğrulayıcının ve planlayıcının kendi kodunu kullanır.
// Kullanım (depo kökünden):
//   node --experimental-transform-types docs/v2/reviews/c-olcum/kt.ts "$PWD" cumle <gün> <halkaNo 1..> "cümle" ...   → her cümle için TAMAM ya da bilinmeyen sözcükler (doğrulayıcının halka kümesi)
//   node --experimental-transform-types docs/v2/reviews/c-olcum/kt.ts "$PWD" plan <gün> [adim]                      → günün planındaki yuvalı kalıp çerçeveleri ve o adımın K(t)'siyle kurulan örnek (yuvadaki tek sözcük dışarıda olabilir)
//   TAZE=1 ...  → hiçbir önceki gün bilinmiyor (e2e'nin boş profili); TAZE'siz → önceki günlerin kartları ve dersleri bilinir (gerçek K(t))
// Örnek seçimi Akis.tsx kalipOrnek kuralının sadeleştirilmiş eşidir; kesin sonuç e2e'dedir (v2_akis.py --kalip-sert).
import { readFileSync } from "node:fs";
import { join } from "node:path";
const KOK = process.argv[2]!;
const sh = await import(join(KOK, "packages/shared/src/index.ts"));
const { loadContent } = await import(join(KOK, "content/tools/load.ts"));
const { planGun } = await import(join(KOK, "web/src/core/akis.ts"));
const { bilinmeyenler, bilinmeyenYazi, kalipSecenekleri, kalipToks, kumeDizini, genelAdlarAyikla, toks, YUVA } = sh;
const c = loadContent();
const genel = genelAdlarAyikla(readFileSync(join(KOK, "docs/v2/reviews/genel-adlar.md"), "utf8"));
const temel = c.temel.map((t: any) => t.data);
const dizin = kumeDizini(c.lexemes, temel, c.world, genel);
const dersler = new Map(temel.map((t: any) => [t.id, t]));
const gunler = c.m1.map((x: any) => x.data).sort((a: any, b: any) => a.day - b.day);
const onceki = (day: number) => {
  const kart = new Set<string>(), ders = new Set<string>();
  for (const g of gunler) if (g.day < day) { g.yeni_kartlar.forEach((k: string) => kart.add(k)); g.dersler.forEach((id: string) => { ders.add(id); for (const k of dizin.dersler.get(id)?.kart ?? []) kart.add(k); }); }
  return { kart, ders };
};
const mod = process.argv[3], day = Number(process.argv[4]);
const g = gunler.find((x: any) => x.day === day);
if (mod === "cumle") {
  const hi = Number(process.argv[5]) - 1; const o = onceki(day); const kal: string[][] = []; const gor = new Set<string>();
  g.halkalar.forEach((h: any, i: number) => { if (i <= hi) { for (const kp of h.kaliplar ?? []) kal.push(...kalipSecenekleri(kp.de)); h.kartlar.forEach((k: string) => gor.add(k)); } });
  const k = { kart: new Set([...o.kart, ...gor]), biten: o.ders, kaliplar: kal };
  for (const s of process.argv.slice(6)) console.log(bilinmeyenYazi(bilinmeyenler(dizin, s, k)).join(", ") || "TAMAM", "←", s);
} else if (mod === "plan") {
  const o = onceki(day); if (process.env.TAZE) o.ders = new Set<string>();
  // uygulamadaki gibi: önceki günlerin yalnız yeni_kartlar'ı (idx.m1.kartlar) + biten dersler
  const oncekiK = process.env.TAZE ? new Set<string>() : new Set<string>(gunler.filter((x: any) => x.day < day).flatMap((x: any) => x.yeni_kartlar));
  const plan = planGun({ gun: g, dersler, dizin, items: new Map(), oncekiKartlar: oncekiK, bitenDersler: o.ders, tohum: `akis:${day}`, simdi: new Date("2026-12-01T08:00:00Z") });
  const sira = plan.duraklar.flatMap((d: any) => d.adimlar);
  const lexOrnek = c.lexemes.flatMap((l: any) => (l.examples ?? []).filter((e: any) => e.de && e.tr).map((e: any) => e.de));
  const dersIds = new Set(sira.map((a: any) => a.ders?.id).filter(Boolean));
  const dersCumle = temel.filter((t: any) => dersIds.has(t.id)).flatMap((t: any) => t.teach).filter((x: any) => x.de && x.tr).map((x: any) => x.de);
  const halkaC = g.halkalar.flatMap((h: any) => h.gorev_cumleleri.map((x: any) => x.de));
  const planC = sira.map((a: any) => a.cumle).filter(Boolean);
  const adK = c.world?.characters.find((x: any) => x.id === g.characters?.[0])?.name.split(" ")[0] ?? "";
  const adTok = new Set(adK ? toks(adK) : []);
  const havuz0: [string, string][] = [...halkaC.map((x: string) => ["halka", x]), ...planC.map((x: string) => ["plan", x]), ...dersCumle.map((x: string) => ["ders", x]), ...lexOrnek.map((x: string) => ["kart", x])] as any;
  const havuz: [string, string][] = havuz0.map(([k, de]) => [k, adK ? de.replace(/\{name\}/g, adK) : de]);
  const yuvaKp = (de: string, kp: string[]): string[] => {
    const w = de.split(/\s+/), n = w.map((x) => x.replace(/[.,!?;:„“"]/g, "").toLowerCase());
    const y = kp.indexOf(YUVA); if (y < 0) return [];
    const once = kp.slice(0, y), sonra = kp.slice(y + 1).filter((t) => t !== YUVA);
    for (let i = 0; i + once.length <= n.length; i++) {
      if (!once.every((t, k) => n[i + k] === t)) continue;
      const j = i + once.length; if (j >= w.length) continue;
      if (!sonra.length) return [w[j]!.replace(/^[„“"»«(]+|[.,!?;:„“"»«)]+$/g, "")];
      const son = n.indexOf(sonra[0]!, j + 1); if (son > j) return w.slice(j, son).map((x) => x.replace(/^[„“"»«(]+|[.,!?;:„“"»«)]+$/g, ""));
    }
    return [];
  };
  let eksik = 0, toplam = 0;
  sira.forEach((a: any, i: number) => {
    if (a.tur !== "kalip" || !a.cumle) return;
    const kart = new Set([...oncekiK, ...sira.slice(0, i + 1).filter((x: any) => x.tur === "tanit").flatMap((x: any) => x.kartlar)]);
    const kNow = { kart, biten: o.ders, kaliplar: sira.slice(0, i + 1).filter((x: any) => x.tur === "kalip" && x.cumle).flatMap((x: any) => kalipSecenekleri(x.cumle)) };
    const parcalar: string[][] = a.cumle.split(/\s[–—]\s/).map((x: string) => kalipToks(x));
    const sirali = (de: string, kp: string[]) => (kp.includes(YUVA) ? yuvaKp(de, kp).length > 0 : ` ${toks(de).join(" ")} `.includes(` ${kp.join(" ")} `));
    const kullanilan = new Set<string>();
    for (const kp of parcalar) {
      if (!kp.includes(YUVA)) continue;
      toplam++;
      const sb = kp.filter((x) => x !== YUVA);
      const ad = havuz.filter(([, de]) => !de.includes("{name}") && !de.includes("…") && !kullanilan.has(de) && sb.length > 0 && sb.every((t) => new Set(toks(de)).has(t)) && !(kp.every((t) => t !== YUVA) && toks(de).join(" ") === kp.join(" ")) && !(!sirali(de, kp) && parcalar.some((p2) => p2 !== kp && sirali(de, p2))))
        .map(([kay, de]) => { const yuva = yuvaKp(de, kp).map((x) => x.toLowerCase()); const bil = bilinmeyenler(dizin, de, kNow).filter((b: any) => !adTok.has(b.sozcuk.toLowerCase())); return { kay, de, bil, uygun: bil.length === 0 || (bil.length === 1 && yuva.includes(bil[0].sozcuk.toLowerCase())) }; })
        .filter((x) => x.uygun).sort((x, y) => Number(sirali(y.de, kp)) - Number(sirali(x.de, kp)) || x.bil.length - y.bil.length);
      if (!ad.length) eksik++; else kullanilan.add(ad[0]!.de);
      console.log(`${ad.length ? "var  " : "EKSİK"} [${a.id}] ${kp.map((t) => (t === YUVA ? "…" : t)).join(" ")}  ${ad.length ? `→ (${ad[0]!.kay}${ad[0]!.bil.length ? ", yuva dışı 1" : ""}) ${ad[0]!.de}  [+${ad.length - 1}]` : ""}`);
    }
  });
  console.log(`gün ${day}: çerçeve ${toplam}, eksik ${eksik}; durak ${plan.duraklar.length}, adım ${sira.length}, ${plan.toplam_dk} dk, gevşeme ${plan.gevseme.length}`);
  if (process.argv[5] === "adim") sira.forEach((a: any) => console.log(a.id, a.tur, a.kartlar?.join(","), a.cumle ?? "", a.ders ? `${a.ders.id}:${a.ders.oge}` : ""));
}
