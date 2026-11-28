// [DENETİM-A1] üretim sayımı (PM-147 md. 3.3). Rapor aracı; içerik ve kod değiştirmez.
// Planlayıcının kendi kodunu (web/src/core/akis.ts planGun) gerçek K(t) ile koşar; akışın sabit duraklarını (ses, prova, okuma/yazma)
// içerikten sayar. Kullanım (depo kökünden):
//   node --experimental-transform-types docs/v2/qa/a1-denetim/sayim.ts "$PWD" > /tmp/sayim.json
// Sınıflar (adım = öğrencinin bir eylemi):
//   konusma  : mikrofonla cevap için kurulan adım (halka "soyle", ses "golge" ve "cevapla", prova düğümü, okuma guided_response,
//              gün sonu maddesi gun_sinavi.sesli içindeyse, dersin "gorev"i). Hepsinde "yazarak cevapla" yolu açıktır.
//   yazma    : klavyeyle Almanca üretim (tr_de, dikte, gap, transform, ses dikte orta/usta/gercek, yazma görevi, gün sonu yazılı madde)
//   kurma    : dokunarak dizme (order, ses dikte "zor" kelime bankası)
//   tanima   : seçme/eşleştirme/dinle-seç (listen_meaning, resimden_sec, article, colloc, eslestir, pick, ses ana_fikir/ayrinti/kolay/eylem, okuma soruları)
//   gosterim : cevapsız (tanit, kalip, sahne, tablo, hatirlat, dil noktası)
// Ayrıca: "durumda" = öğrencinin bir duruma kendi seçtiği sözle cevap verdiği adım (accepted listesiyle denetlenir: prova, cevapla,
// guided_response); "serbest" = kalıp tekrarı ya da çeviri olmayan kendi cümlesi (yazma görevi, ses dikte "gercek", dersin "gorev"i).
import { join } from "node:path";
import { readFileSync } from "node:fs";
const KOK = process.argv[2]!;
const sh = await import(join(KOK, "packages/shared/src/index.ts"));
const { loadContent } = await import(join(KOK, "content/tools/load.ts"));
const { planGun } = await import(join(KOK, "web/src/core/akis.ts"));
const { kumeDizini, genelAdlarAyikla } = sh;
const c = loadContent();
const genel = genelAdlarAyikla(readFileSync(join(KOK, "docs/v2/reviews/genel-adlar.md"), "utf8"));
const temel = c.temel.map((t: any) => t.data);
// uygulamadaki gibi (Akis.tsx): dil noktaları (grammar.json + dn-HH.json) dizine ve plana girer
const dnNotlar = (c.dn ?? []).flatMap((x: any) => x.data);
const dilNoktalari = new Map<string, any>([...c.grammar.map((g: any) => [g.id, g]), ...dnNotlar.map((d: any) => [d.id, d])]);
const dizin = kumeDizini(c.lexemes, temel, c.world, genel, [...c.grammar, ...dnNotlar]);
const dersler = new Map<string, any>(temel.map((t: any) => [t.id, t]));
const gunler = c.m1.map((x: any) => x.data).sort((a: any, b: any) => a.day - b.day);

type Sinif = "konusma" | "yazma" | "kurma" | "tanima" | "gosterim";
const TUR_SINIF: Record<string, Sinif> = {
  soyle: "konusma", tr_de: "yazma", dikte: "yazma", gap: "yazma", order: "kurma",
  listen_meaning: "tanima", resimden_sec: "tanima", article: "tanima", colloc: "tanima", eslestir: "tanima", tekrar: "tanima",
  tanit: "gosterim", kalip: "gosterim", sahne: "gosterim", tablo: "gosterim", hatirlat: "gosterim", ders_madde: "yazma"
};
const dersDrill = (id: string, oge: string) => (dersler.get(id)?.drills ?? []).find((m: any) => m.id === oge);

const sonuc: any[] = [];
/** iki parçalı fiil boşluğu (forms "lege … auf") tek "___"lı olmayan cümleye iki kez yazılınca bozuk cümle çıkıyor */
const bozuk: string[] = [];
for (const g of gunler) {
  const s: Record<string, number> = { konusma: 0, yazma: 0, kurma: 0, tanima: 0, gosterim: 0, durumda: 0, serbest: 0, konusma_ceviri: 0, konusma_golge: 0 };
  const ek = (k: string, n = 1) => { s[k] = (s[k] ?? 0) + n; };
  let dk = 0;
  const durak: Record<string, number> = {};
  const gevs: Record<string, number> = {};
  if (Array.isArray(g.halkalar) && g.halkalar.length) {
    const onceK = new Set<string>(gunler.filter((x: any) => x.day < g.day).flatMap((x: any) => x.yeni_kartlar));
    const onceD = new Set<string>(gunler.filter((x: any) => x.day < g.day).flatMap((x: any) => x.dersler));
    const plan = planGun({ gun: g, dersler, dizin, items: new Map(), oncekiKartlar: onceK, bitenDersler: onceD, dilNoktalari, tohum: `akis:${g.day}`, simdi: new Date("2026-12-01T08:00:00Z") });
    dk = plan.toplam_dk;
    for (const v of plan.gevseme) gevs[v.kural] = (gevs[v.kural] ?? 0) + 1;
    const sesli = new Set<string>(g.gun_sinavi?.sesli ?? []);
    for (const d of plan.duraklar) {
      durak[d.tur] = (durak[d.tur] ?? 0) + 1;
      for (const a of d.adimlar) {
        let k: Sinif = TUR_SINIF[a.tur] ?? "gosterim";
        if (a.ders?.oge === "dil_noktasi") k = "gosterim";
        else if (a.ders?.id === "gun_sinavi") {
          const m = (g.gun_sinavi?.maddeler ?? []).find((x: any) => x.id === a.ders!.oge);
          k = sesli.has(a.ders.oge) ? "konusma" : m?.k === "pick" ? "tanima" : "yazma";
          if (k === "konusma" && m?.k === "guided_response") ek("durumda");
        } else if (a.ders && a.tur === "ders_madde") {
          const m = dersDrill(a.ders.id, a.ders.oge);
          k = m?.k === "pick" ? "tanima" : "yazma";
        } else if (a.ders?.oge === "gorev") { k = "konusma"; ek("serbest"); ek("serbest_konusma"); }
        else if (a.ders && a.tur === "soyle") { const m = dersDrill(a.ders.id, a.ders.oge); if (m?.k === "guided_response") ek("durumda"); }
        else if (a.tur === "soyle") ek("konusma_ceviri");
        if (a.tur === "gap" && a.cumle?.includes("…")) { ek("bozuk_bosluk"); bozuk.push(`${g.day} ${a.id}: ${a.cumle}`); }
        ek(k);
      }
    }
  }
  // ses durakları (ilk tur: dinle + anlama; ikinci tur: dikte, gölge, cevapla)
  for (const m of g.sesler ?? []) {
    for (const b of m.bolumler ?? []) {
      if (b.ana_fikir) ek("tanima");
      ek("tanima", (b.ayrinti ?? []).length);
      for (const d of b.dikte ?? []) {
        if (d.seviye === "kolay") ek("tanima");
        else if (d.seviye === "zor") ek("kurma");
        else { ek("yazma"); if (d.seviye === "gercek") ek("serbest"); }
      }
      ek("konusma", (b.golge ?? []).length); ek("konusma_golge", (b.golge ?? []).length);
      if (b.cevapla) { ek("konusma"); ek("durumda"); }
    }
    if (m.eylem) ek("tanima");
  }
  // prova: her cevaplı düğüm bir konuşma sırası
  const provaSira = (g.prova?.dugumler ?? []).filter((n: any) => (n.secenekler ?? []).length).length;
  ek("konusma", provaSira); ek("durumda", provaSira);
  // okuma / yazma
  const oy = g.okuma_yazma;
  if (oy) {
    for (const q of oy.sorular ?? []) {
      if (q.k === "guided_response" || q.k === "listen_and_respond") { ek("konusma"); ek("durumda"); }
      else if (q.k === "tr_de" || q.k === "gap" || q.k === "transform") ek("yazma");
      else ek("tanima");
    }
    if (oy.yazma) { ek("yazma"); ek("serbest"); }
  }
  const aktif = s.konusma + s.yazma + s.kurma + s.tanima;
  sonuc.push({ gun: g.day, hafta: Math.ceil(g.day / 7), title_tr: g.title_tr, dk, durak, ...s, aktif,
    konusma_payi: aktif ? Math.round((s.konusma / aktif) * 1000) / 10 : 0, prova_sira: provaSira, sinav: !!g.sinav, gevseme: gevs });
}
// haftalık toplam
const hafta: any[] = [];
for (let h = 1; h <= 8; h++) {
  const x = sonuc.filter((r) => r.hafta === h);
  const t: any = { hafta: h, gun: x.length };
  for (const k of ["dk", "konusma", "konusma_ceviri", "konusma_golge", "durumda", "serbest", "yazma", "kurma", "tanima", "gosterim", "aktif", "prova_sira", "bozuk_bosluk", "serbest_konusma"]) t[k] = x.reduce((a, r) => a + (r[k] ?? 0), 0);
  t.konusma_payi = t.aktif ? Math.round((t.konusma / t.aktif) * 1000) / 10 : 0;
  t.serbest_konusma_payi = t.aktif ? Math.round(((t.konusma - t.konusma_ceviri - t.konusma_golge) / t.aktif) * 1000) / 10 : 0;
  hafta.push(t);
}
console.log(JSON.stringify({ hafta, bozuk_bosluk: bozuk, gun: sonuc }, null, 1));
