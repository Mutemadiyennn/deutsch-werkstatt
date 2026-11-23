/**
 * Hafta kapısı, içerik düzeyi (PM-087 B.1, 7087286882; PM-090 md. 2.2; PM-096 md. 1). Yapay zekâsız, saf, tekrarlanabilir.
 * Bilgi kısıtlı öğrenci haftayı sıfırdan yürür; önceki haftalar öğretilmiş sayılır (K(t) kaynağı dikişle aynı: `tabloGunleri`).
 *
 * Öğrencinin bildikleri (adım adım büyür):
 *  - kartlar: önceki haftaların tablo kartları; aynı haftanın önceki günleri (dosya varsa `yeni_kartlar`, yoksa tablo);
 *    o gün halkalar sırayla (halka yalnız kendi kartlarını tanıtır), halka dışı adımlar günün bütün kartlarından sonra;
 *  - dersler: önceki günlerin dersleri (dosya ya da omurga) + o günün dersleri (halkada yalnız `dersten_sonra`, halka dışında hep);
 *  - gösterilen biçimler (PM 7088563328 md. 1, PM-092 md. 1): halka kalıp satırları, r0 dersinin tanıtımı/tablosu, sunulmuş
 *    dil noktasının (`gr:` grammar.json, `dn:` dn-HH.json) tablosu. Öğretimde gösterilen sözcük (çekimli biçim dahil) bilinir
 *    (LS-16.3 öğrenci kuralı, ogrenci_akis.py "gösterilmiş: ogretim"); kartın tanıtım sırasını dikiş denetler;
 *  - çerçeve sözcüğü (tablonun `cerceve` listesi, bu ve sonraki haftalar): yalnız gösterilmiş biçimi bilinir.
 * Bir adım "cevaplanabilir": kabul listesinden EN AZ BİR seçenek bütünüyle bilinen sözcüklerden kurulabiliyorsa
 * (kume.ts `bilinmeyenler` boş + çerçeve şartı). Değilse "öğretilmeden istenen": kesin (kart ya da eşlenemeyen sözcük eksik) ya da
 * sınırda (kartı bilinen sözcüğün gösterilmemiş biçimi). Karşı tarafın sorusu cevabı engellemez (Türkçe durum metni var), ayrıca sayılır.
 *
 * Üç şart (hepsi gerekli):
 *  1. öğretilmeden istenen = 0 (kesin + sınırda);
 *  2. hafta sonu testi (`hafta-sonu-testi-HH.json`), haftanın sonundaki bilgiyle ≥ %80 (policy yoksa 0.8);
 *  3. görülmemiş durum (`gorulmemis-HH.json`, PM 7087286882): her durumda haftanın sonundaki bilgiyle kurulabilen ve haftanın
 *     içeriğinde aynen geçmeyen bir kabul cümlesi var; haftanın her `can_do`'su en az bir durumla sınanır.
 * Uygulamada oynanış (tarayıcı) ayrı katmandır: `tests/e2e/ogrenci_akis.py` haftaya genişletilince aynı sayıları ekrandan ölçer.
 */
import { bilinmeyenler, kalipOrtu, kalipSecenekleri, toks, toksAsil, YUVA_AD, type Bilinen, type KumeDizini } from "../../packages/shared/src/kume.ts";
import type { TemelDers } from "../../packages/shared/src/index.ts";
import { dilNoktasiMetni, gosterilenKaliplar, icOrtu, tabloCerceve, tabloGunleri, type GunHam, type KesinTablo, type Omurga } from "./dikis.ts";

export { dilNoktasiMetni };
const dizi = (x: unknown): unknown[] => (Array.isArray(x) ? x : []);
const yazilar = (x: unknown): string[] => dizi(x).filter((y): y is string => typeof y === "string" && !!y.trim());
const nesne = (x: unknown): Record<string, unknown> => (x && typeof x === "object" && !Array.isArray(x) ? (x as Record<string, unknown>) : {});
const yazi = (x: unknown): string | undefined => (typeof x === "string" && x.trim() ? x : undefined);
const sade = (s: string) => s.toLowerCase().replace(/[.,!?;:„“"'»«()–…-]/g, " ").replace(/\s+/g, " ").trim();

/** Öğrenciden istenen bir cevap: kurulabilecek seçenekler + (varsa) karşı tarafın sorusu. `anlama`: Türkçe soru ve şıklı anlama
 *  sorusu (q_tr); seçenek yerine kanıt cümleleri değerlendirilir, öğretilmeden isteneni etkilemez (metin ekranda Türkçesiyle durur) */
export interface Madde { yer: string; secenekler: string[]; soru?: string; anlama?: boolean }
const BOS = /_{3,}/;
const doldur = (de: string | undefined, x: string) => (de && BOS.test(de) && !BOS.test(x) && x.split(/\s+/).length <= 3 ? de.replace(BOS, x) : x);

/** Nesne ağacındaki bütün cevap maddeleri (biçimden bağımsız): `accepted` dizisi, `opts`+`ans` seçme, `seviye: gercek` yazma */
export function maddeler(kok: unknown, yer: string): Madde[] {
  const out: Madde[] = [];
  const gez = (x: unknown, at: string, metin: Map<string, string>, tumMetin: string) => {
    if (Array.isArray(x)) { x.forEach((y, i) => gez(y, `${at}[${String(nesne(y).id ?? i)}]`, metin, tumMetin)); return; }
    const o = nesne(x); if (!Object.keys(o).length || o.uygun === false) return;
    // medya kapsamı: script / sahneler satırları ve okuma metni (anlama sorusunun kanıtı için)
    const satirlar = [...dizi(o.script), ...dizi(o.sahneler)].map(nesne).filter((y) => typeof y.id === "string" && yazi(y.de));
    if (satirlar.length || yazi(o.metin_de)) { metin = new Map([...metin, ...satirlar.map((y) => [y.id as string, y.de as string] as const)]); tumMetin = yazi(o.metin_de) ?? tumMetin; }
    const de = yazi(o.de), soru = yazi(o.prompt_de) ?? yazi(o.audio_de);
    const acc = yazilar(o.accepted);
    if (yazi(o.q_tr) && !de && !yazi(o.prompt_de)) {
      const kanit = dizi(o.kanit).map((k) => (typeof k === "string" ? metin.get(k) : typeof k === "number" ? tumMetin : undefined)).filter((k): k is string => !!k);
      if (kanit.length) out.push({ yer: at, secenekler: [[...new Set(kanit)].join(" ")], anlama: true });
    } else if (acc.length) out.push({ yer: at, secenekler: acc.map((a) => doldur(de, a)), soru });
    else if (Array.isArray(o.opts) && typeof o.ans === "number" && yazi(o.opts[o.ans])) out.push({ yer: at, secenekler: [doldur(de, o.opts[o.ans] as string)], soru });
    else if (o.seviye === "gercek" && yazi(o.ornek_de)) out.push({ yer: at, secenekler: [o.ornek_de as string], soru });
    for (const [k, v] of Object.entries(o)) if (v && typeof v === "object" && !["accepted", "opts", "halkalar", "script", "sahneler", "kanit"].includes(k)) gez(v, `${at}/${k}`, metin, tumMetin);
  };
  gez(kok, yer, new Map(), "");
  return out;
}

/** Bir dosyanın öğrenciye gösterdiği bütün Almanca cümleler (görülmemiş durumun "derste aynen geçmez" şartı için) */
function almancaCumleler(kok: unknown, out: Set<string>) {
  const gez = (x: unknown) => {
    if (Array.isArray(x)) { x.forEach(gez); return; }
    const o = nesne(x);
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === "string" && /(^de$|_de$)/.test(k)) out.add(sade(v));
      else if (k === "accepted") for (const a of yazilar(v)) out.add(sade(a));
      else if (v && typeof v === "object") gez(v);
    }
  };
  gez(kok);
}

export interface Bilgi { kart: Set<string>; biten: Set<string>; kaliplar: string[][]; bicim: Set<string> }
export type Sonuc = "tamam" | "kesin" | "sinirda" | "anlama";
export interface AdimSatiri { gun: number; yer: string; sonuc: Sonuc; eksik: string[]; cumle: string; soruEksik: string[] }

export interface KapiGirdi {
  hafta: number;
  gunler: { file: string; data: GunHam }[];
  tablo: KesinTablo; omurga: Omurga; dizin: KumeDizini;
  dersler?: ReadonlyMap<string, TemelDers>;
  dilNoktalari?: ReadonlyMap<string, readonly string[]>;
  test?: unknown; gorulmemis?: unknown;
  esik?: number;
}
export interface KapiSonuc {
  hafta: number;
  adimlar: AdimSatiri[];
  ogretilmedenKesin: number; ogretilmedenSinirda: number; anlasilmayanSoru: number; anlamaEksik: number;
  test: { toplam: number; dogru: number; oran: number; maddeler: AdimSatiri[] } | null;
  gorulmemis: { toplam: number; kurulan: number; durumlar: (AdimSatiri & { can_do?: string })[]; kapsanmayanCanDo: string[] } | null;
  eksikGunler: number[];
  gecti: boolean; nedenler: string[];
}

export function haftaKapisi(g: KapiGirdi): KapiSonuc {
  const { hafta, dizin: d } = g;
  const ilk = (hafta - 1) * 7 + 1, son = hafta * 7;
  const tablo = tabloGunleri(g.tablo);
  const omurga = new Map(dizi(g.omurga.gunler).map(nesne).filter((x) => typeof x.day === "number").map((x) => [x.day as number, yazilar(x.dersler)] as const));
  const dosya = new Map(g.gunler.filter((x) => typeof x.data?.day === "number").map((x) => [x.data.day, x.data] as const));

  // çerçeve: kimlik → hafta (dikiş ile aynı çözüm, kısa)
  const cerceveHafta = new Map<string, number>();
  for (const [h, l] of [...tabloCerceve(g.tablo)].sort((a, b) => a[0] - b[0])) for (const x of l) {
    const ids = x.startsWith("lx:") ? [x] : [...(d.idx.get(x.toLowerCase()) ?? [])].filter((i) => d.cerceve.has(i));
    for (const id of ids.length ? ids : [`söz:${x.toLowerCase()}`]) if (!cerceveHafta.has(id)) cerceveHafta.set(id, h);
  }
  const cerceveEksik = (t: string, b: Bilgi): boolean => {
    if (b.bicim.has(t)) return false;
    const ok = [...[...(d.idx.get(t) ?? [])].filter((i) => d.cerceve.has(i)), ...(cerceveHafta.has(`söz:${t}`) ? [`söz:${t}`] : [])];
    if (!ok.length || !ok.every((i) => (cerceveHafta.get(i) ?? 0) >= hafta)) return false;
    return ![...(d.idx.get(t) ?? [])].some((i) => !d.cerceve.has(i) && b.kart.has(i) && d.gost.get(i)?.has(t));
  };

  const goster = (b: Bilgi, metin: string | undefined) => { for (const t of toks(metin)) b.bicim.add(t); };
  const dersEkle = (b: Bilgi, id: string) => {
    b.biten.add(id);
    const x = d.dersler.get(id); for (const k of x?.kart ?? []) b.kart.add(k);
    const t = g.dersler?.get(id);
    for (const s of t?.teach ?? []) goster(b, s.de);
    for (const row of t?.table?.satirlar ?? []) for (const c of row) goster(b, c);
    for (const m of g.dilNoktalari?.get(id) ?? []) goster(b, m);
  };
  const halkaKalip = (b: Bilgi, h: Record<string, unknown>) => {
    for (const kp of dizi(h.kaliplar)) { const de = yazi(nesne(kp).de); if (de) { goster(b, de); b.kaliplar.push(...kalipParca(de)); } }
  };
  const kopya = (b: Bilgi): Bilgi => ({ kart: new Set(b.kart), biten: new Set(b.biten), kaliplar: [...b.kaliplar], bicim: new Set(b.bicim) });

  // gösterilmiş kalıplar (kartın açık eşdizimleri, ders parçaları) yalnız BÜTÜN olarak ve KONUMA göre örter (dikişle aynı)
  const gosOnbellek = new WeakMap<Bilgi, { anahtar: string; kp: string[][] }>();
  const gosterilen = (b: Bilgi) => {
    const anahtar = `${b.kart.size}/${b.biten.size}`, o = gosOnbellek.get(b);
    if (o?.anahtar === anahtar) return o.kp;
    const kp = gosterilenKaliplar(d, b.kart, b.biten, g.dersler); gosOnbellek.set(b, { anahtar, kp }); return kp;
  };
  /** cümlenin eksikleri: [kesin, sınırda] */
  const eksikler = (cumle: string, b: Bilgi): { kesin: string[]; sinirda: string[] } => {
    const k: Bilinen = { kart: b.kart, biten: b.biten, kaliplar: b.kaliplar };
    const tt = toksAsil(cumle).map((x) => x.t), ic = icOrtu(d, tt, k), dis = new Set<number>();
    for (const kp of gosterilen(b)) for (const j of kalipOrtu(tt, kp)) dis.add(j);
    // öğretimde gösterilen sözcük bilinir (LS-16.3 öğrenci kuralı, ogrenci_akis.py "gösterilmiş: ogretim"); kartın tanıtım sırası dikişin işi
    const u0 = bilinmeyenler(d, cumle, k, b.bicim), say = new Map<string, number>();
    const u = u0.filter((x) => { const n = (say.get(x.sozcuk) ?? 0) + 1; say.set(x.sozcuk, n); return n <= tt.filter((t, j) => t === x.sozcuk && !ic.has(j) && !dis.has(j)).length; });
    const kesin = u.filter((x) => x.tur !== "bicim").map((x) => x.sozcuk), sinirda = u.filter((x) => x.tur === "bicim").map((x) => `~${x.sozcuk}`);
    const bildirilen = new Set<string>();
    tt.forEach((t, j) => { if (t !== YUVA_AD && !ic.has(j) && !dis.has(j) && !bildirilen.has(t) && cerceveEksik(t, b)) { bildirilen.add(t); kesin.push(`çerçeve:${t}`); } });
    return { kesin, sinirda };
  };
  const degerle = (gun: number, m: Madde, b: Bilgi, haric?: Set<string>): AdimSatiri => {
    let en: AdimSatiri | null = null;
    for (const s of m.secenekler) {
      if (haric?.has(sade(s))) continue;
      const e = eksikler(s, b);
      const sonuc: Sonuc = e.kesin.length || e.sinirda.length ? (m.anlama ? "anlama" : e.kesin.length ? "kesin" : "sinirda") : "tamam";
      const sat: AdimSatiri = { gun, yer: m.yer, sonuc, eksik: [...e.kesin, ...e.sinirda], cumle: s, soruEksik: [] };
      const puan = (x: AdimSatiri) => (x.sonuc === "tamam" ? 0 : x.sonuc === "kesin" ? 2 : 1) * 100 + x.eksik.length;
      if (!en || puan(sat) < puan(en)) en = sat;
      if (sonuc === "tamam") break;
    }
    en ??= { gun, yer: m.yer, sonuc: "kesin", eksik: ["(derste aynen geçmeyen kabul cümlesi yok)"], cumle: m.secenekler[0] ?? "", soruEksik: [] };
    if (m.soru) { const e = eksikler(m.soru, b); en.soruEksik = [...e.kesin, ...e.sinirda]; }
    return en;
  };

  // önceki haftalar öğretilmiş: tablo kartları, omurga dersleri, dosyası olan günlerin kalıpları
  const b: Bilgi = { kart: new Set(), biten: new Set(), kaliplar: [], bicim: new Set() };
  for (const [gn, ks] of tablo) if (gn < ilk) for (const k of ks) b.kart.add(k);
  for (let gn = 1; gn < ilk; gn++) {
    const f = dosya.get(gn);
    for (const x of f ? yazilar(f.dersler) : omurga.get(gn) ?? []) dersEkle(b, x);
    if (f) for (const h of dizi(f.halkalar)) halkaKalip(b, nesne(h));
  }

  const adimlar: AdimSatiri[] = [], eksikGunler: number[] = [];
  const haftaCumleleri = new Set<string>();
  const canDo = new Set<string>();
  for (let gn = ilk; gn <= son; gn++) {
    const f = dosya.get(gn);
    if (!f) { eksikGunler.push(gn); for (const k of tablo.get(gn) ?? []) b.kart.add(k); for (const x of omurga.get(gn) ?? []) dersEkle(b, x); continue; }
    almancaCumleler(f, haftaCumleleri);
    const cd = nesne(f.can_do).id; if (typeof cd === "string") canDo.add(cd);
    const yeni = new Set(yazilar(f.yeni_kartlar)), dersler = yazilar(f.dersler);
    const gunB = kopya(b);
    for (const h0 of dizi(f.halkalar)) {
      const h = nesne(h0);
      halkaKalip(gunB, h);
      for (const k of yazilar(h.kartlar)) if (yeni.has(k)) gunB.kart.add(k);
      const hb = kopya(gunB); if (h.dersten_sonra === true) for (const x of dersler) dersEkle(hb, x);
      for (const m of maddeler(h.gorev_cumleleri, `halka ${String(h.id ?? "?")}`)) adimlar.push(degerle(gn, m, hb));
    }
    for (const k of yeni) gunB.kart.add(k);
    for (const x of dersler) dersEkle(gunB, x);
    const disi = Object.fromEntries(Object.entries(f).filter(([k]) => !["halkalar", "yeni_kartlar", "dersler", "requires", "review", "can_do"].includes(k)));
    for (const m of maddeler(disi, "gün")) adimlar.push(degerle(gn, m, gunB));
    for (const k of [...gunB.kart]) b.kart.add(k); for (const x of gunB.biten) b.biten.add(x);
    for (const t of gunB.bicim) b.bicim.add(t); b.kaliplar = gunB.kaliplar;
  }

  const ogretilmedenKesin = adimlar.filter((a) => a.sonuc === "kesin").length, ogretilmedenSinirda = adimlar.filter((a) => a.sonuc === "sinirda").length;
  const anlasilmayanSoru = adimlar.filter((a) => a.soruEksik.length).length, anlamaEksik = adimlar.filter((a) => a.sonuc === "anlama").length;

  let test: KapiSonuc["test"] = null;
  if (g.test !== undefined) {
    const ms = maddeler(nesne(g.test).maddeler, "test").map((m) => degerle(son, m, b));
    const dogru = ms.filter((m) => m.sonuc === "tamam").length;
    test = { toplam: ms.length, dogru, oran: ms.length ? dogru / ms.length : 0, maddeler: ms };
  }
  let gorulmemis: KapiSonuc["gorulmemis"] = null;
  if (g.gorulmemis !== undefined) {
    const ds = dizi(nesne(g.gorulmemis).durumlar).map(nesne);
    const durumlar = ds.map((x) => ({ ...degerle(son, { yer: String(x.id ?? "?"), secenekler: yazilar(x.accepted), soru: yazi(x.prompt_de) }, b, haftaCumleleri), can_do: typeof x.can_do === "string" ? x.can_do : undefined }));
    const sinanan = new Set(durumlar.map((x) => x.can_do));
    gorulmemis = { toplam: durumlar.length, kurulan: durumlar.filter((x) => x.sonuc === "tamam").length, durumlar, kapsanmayanCanDo: [...canDo].filter((c) => !sinanan.has(c)).sort() };
  }

  const esik = g.esik ?? 0.8, nedenler: string[] = [];
  if (eksikGunler.length) nedenler.push(`gün dosyası yok: ${eksikGunler.join(", ")}`);
  if (ogretilmedenKesin + ogretilmedenSinirda) nedenler.push(`öğretilmeden istenen ${ogretilmedenKesin + ogretilmedenSinirda} (kesin ${ogretilmedenKesin}, sınırda ${ogretilmedenSinirda})`);
  if (!test) nedenler.push(`hafta sonu testi yok (hafta-sonu-testi-${String(hafta).padStart(2, "0")}.json)`);
  else if (test.oran < esik) nedenler.push(`hafta sonu testi %${Math.round(test.oran * 100)} < %${Math.round(esik * 100)}`);
  if (!gorulmemis) nedenler.push(`görülmemiş durum dosyası yok (gorulmemis-${String(hafta).padStart(2, "0")}.json)`);
  else {
    if (!gorulmemis.toplam) nedenler.push("görülmemiş durum yok");
    if (gorulmemis.kurulan < gorulmemis.toplam) nedenler.push(`görülmemiş durum ${gorulmemis.kurulan}/${gorulmemis.toplam} kurulabiliyor`);
    if (gorulmemis.kapsanmayanCanDo.length) nedenler.push(`görülmemiş durumla sınanmayan can_do: ${gorulmemis.kapsanmayanCanDo.join(", ")}`);
  }
  return { hafta, adimlar, ogretilmedenKesin, ogretilmedenSinirda, anlasilmayanSoru, anlamaEksik, test, gorulmemis, eksikGunler, gecti: !nedenler.length, nedenler };
}

/** kalıp metni → kalıp seçenekleri (" – " kume.ts'te, " / " burada ayrılır) */
const kalipParca = (de: string): string[][] => de.split(/\s\/\s/).flatMap((p) => kalipSecenekleri(p));

export function kapiRaporu(r: KapiSonuc): string {
  const yuzde = (x: number) => `%${Math.round(x * 100)}`;
  const L = [`## Hafta kapısı · ${r.hafta}. hafta (gün ${(r.hafta - 1) * 7 + 1}–${r.hafta * 7}) · ${r.gecti ? "GEÇTİ" : "KALDI"}`, ""];
  L.push("| gün | adım | tamam | öğretilmeden (kesin) | öğretilmeden (sınırda) | anlaşılmayan soru | anlama: kanıtta yeni |", "|---:|---:|---:|---:|---:|---:|---:|");
  for (const gn of [...new Set(r.adimlar.map((a) => a.gun))]) {
    const a = r.adimlar.filter((x) => x.gun === gn);
    L.push(`| ${gn} | ${a.length} | ${a.filter((x) => x.sonuc === "tamam").length} | ${a.filter((x) => x.sonuc === "kesin").length} | ${a.filter((x) => x.sonuc === "sinirda").length} | ${a.filter((x) => x.soruEksik.length).length} | ${a.filter((x) => x.sonuc === "anlama").length} |`);
  }
  L.push("", `Öğretilmeden istenen: **${r.ogretilmedenKesin + r.ogretilmedenSinirda}** (kesin ${r.ogretilmedenKesin}, sınırda ${r.ogretilmedenSinirda}) · anlaşılmayan karşı soru: ${r.anlasilmayanSoru} · anlama sorusunun kanıtında yeni sözcük (engel değil): ${r.anlamaEksik}`);
  if (r.test) L.push(`Hafta sonu testi: **${yuzde(r.test.oran)}** (${r.test.dogru}/${r.test.toplam})`);
  if (r.gorulmemis) L.push(`Görülmemiş durum: **${r.gorulmemis.kurulan}/${r.gorulmemis.toplam}** kurulabiliyor · sınanmayan can_do: ${r.gorulmemis.kapsanmayanCanDo.join(", ") || "yok"}`);
  if (r.nedenler.length) L.push("", "Kalma nedenleri:", ...r.nedenler.map((n) => `- ${n}`));
  const kotu = [...r.adimlar.filter((a) => a.sonuc !== "anlama"), ...(r.test?.maddeler ?? []), ...(r.gorulmemis?.durumlar ?? [])].filter((a) => a.sonuc !== "tamam");
  if (kotu.length) { L.push("", "Ayrıntı (en yakın kabul seçeneği ve eksik sözcükleri; ~ = gösterilmemiş biçim):"); for (const a of kotu) L.push(`- ${a.gun}. gün ${a.yer} [${a.sonuc}] ${a.eksik.join(", ")} · ${a.cumle}`); }
  return L.join("\n");
}
