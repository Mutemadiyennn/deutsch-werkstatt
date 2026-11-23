/**
 * Dikiş denetçisi (PM-090 md. 2.1; PM kararı 7087835391 md. 2: "tablo haftayı sabitler, günü değil"). Yapay zekâsız, saf.
 * Kaynaklar: `content/v2/curriculum/a1-kesin.json` (1.–7. gün `ogretilmis_sayilan.gunler`, sonrası `gunler[]`),
 * `content/v2/curriculum/omurga.json` (gün → dersler), `content/v2/m1/gun-NN.json` (ŞEMASIZ okunur: şema 8. günü kabul etmese de koşar).
 *
 * Kurallar (her biri ayrı sayılır; toplam ihlal 0 olmalı):
 *  (a) HAFTA düzeyinde: haftanın gün dosyalarındaki `yeni_kartlar` birleşimi = tablodaki o haftanın kümesi (eksik yok, fazla yok,
 *      iki kez yok). Günlük adet tablodaki o günün adedinden en çok ±2 sapar (haftalık toplam küme eşitliğiyle sabit).
 *      Haftanın gün dosyalarından biri yoksa eksik kartlar ihlal sayılır (`yarim: true` ile yalnız not; yerel ara koşu için).
 *  (b) sorulan ya da cevabı olan her kart tanıtılmış: K(t) = tablodaki ÖNCEKİ haftaların kartları + aynı haftada o adıma kadar
 *      DOSYALARDA tanıtılanlar (önceki günlerin `yeni_kartlar`ı; dosyası olmayan önceki gün için tablodaki o günün kartları, notla;
 *      o gün: halkalar sırayla, halka yalnız `yeni_kartlar` içindeki kartlarını tanıtır; halka dışı adımlar günün bütün
 *      kartlarından sonra). Biten dersler: önceki haftaların omurga dersleri + aynı haftanın önceki günlerinin `dersler`i
 *      (+ o gün; halkada yalnız `dersten_sonra`). Yalnız KART eksikliği sayılır (kume.ts `tur: "kart"`).
 *      Gösterilmiş kalıp yalnız BÜTÜN olarak örter (parçası tek başına bilinmez): tanıtılmış kartın kartta açık duran eşdizimleri
 *      (garden.ts `esdizimler`, en çok 3) ve biten temel dersin çok sözcüklü `exp.parcalar`ı. Örtülen adım sayısı satırda yazılır.
 *  (c) günün `dersler` = omurganın o günkü dersleri (sıra önemsiz; boş bırakılamaz, PM-092 md. 5). `dersler` ya da
 *      `requires.gramer`daki hiçbir kimlik sonraki haftanın dersi olamaz; `requires.gramer`daki `r0:`/`gr:`/`dn:` kimliği omurgada olmalı.
 *  (d) haftalar arası aynı ÜRETİM cümlesi yok (öğrencinin yazdığı/söylediği; karşı tarafın sorusu sayılmaz; `sade`, ≥ 3 sözcük).
 *  (biçim) 8. gün ve sonrası halka biçiminde olmalı (`halkalar` boş olamaz); hiç gün denetlenmezse ihlal.
 * 1. haftanın halkasız (eski biçim) günleri "atlandı" görünür ve sayılmaz; `tum: true` ile denetlenir. Böyle bir gün varken
 * 1. haftanın küme eşitliği (a) kurulamaz (o günler tablo öncesi dağılımı taşır): satıra not düşülür; halkaya geçince sayılır.
 */
import { bilinmeyenler, kalipOrtu, kalipSecenekleri, toks, type Bilinen, type KumeDizini } from "../../packages/shared/src/kume.ts";
import type { Lexeme, TemelDers } from "../../packages/shared/src/index.ts";

export interface KesinTablo {
  ogretilmis_sayilan?: { gunler?: Record<string, string[]> };
  gunler: { day: number; hafta?: number; kartlar: string[]; dersler?: string[] }[];
}
export interface Omurga { gunler: { day: number; dersler?: string[] }[] }
export type GunHam = Record<string, unknown> & { day: number };

export type Kural = "a" | "b" | "c" | "d" | "bicim";
export const KURALLAR: Kural[] = ["a", "b", "c", "d", "bicim"];
export interface Ihlal { gun: number; kural: Kural; yer: string; mesaj: string }
export interface GunSatiri { gun: number; hafta: number; dosya: string; durum: "denetlendi" | "atlandı"; neden?: string; sayi: Record<Kural, number>; not: string[] }
export interface DikisSonuc { satirlar: GunSatiri[]; ihlaller: Ihlal[]; toplam: number }

export const haftaOf = (gun: number) => Math.ceil(gun / 7);
const haftaGunleri = (h: number) => Array.from({ length: 7 }, (_, i) => (h - 1) * 7 + i + 1);
/** Karşılaştırma için sade biçim (m1check.sade + üç nokta; ümlaut korunur) */
const sade = (s: string) => s.toLowerCase().replace(/[.,!?;:„“"'»«()–…-]/g, " ").replace(/\s+/g, " ").trim();
const dizi = (x: unknown): unknown[] => (Array.isArray(x) ? x : []);
const yazilar = (x: unknown): string[] => dizi(x).filter((y): y is string => typeof y === "string");
const nesne = (x: unknown): Record<string, unknown> => (x && typeof x === "object" && !Array.isArray(x) ? (x as Record<string, unknown>) : {});
const yazi = (x: unknown): string | undefined => (typeof x === "string" && x.trim() ? x : undefined);
const ilkKabul = (o: Record<string, unknown>) => yazi(dizi(o.accepted)[0]);

/** Tablo: gün → kesin kart listesi (1.–7. gün `ogretilmis_sayilan.gunler`, sonrası `gunler[]`) */
export function tabloGunleri(t: KesinTablo): Map<number, string[]> {
  const m = new Map<number, string[]>();
  for (const [k, v] of Object.entries(t.ogretilmis_sayilan?.gunler ?? {})) m.set(Number(k), yazilar(v));
  for (const g of dizi(t.gunler)) { const x = nesne(g); if (typeof x.day === "number") m.set(x.day, yazilar(x.kartlar)); }
  return m;
}

/** Öğrencinin ürettiği/seçtiği (uretim) ya da cevap için anlaması gereken (soru) Almanca */
export type Cumle = { yer: string; de: string; uretim: boolean };
export function halkaDisiGorevler(g: GunHam): Cumle[] {
  const r: Cumle[] = [];
  const ekle = (yer: string, de: unknown, uretim = true) => { const s = yazi(de); if (s) r.push({ yer, de: s, uretim }); };
  const bolumler = (at: string, kayit: Record<string, unknown>, satir: Map<string, string>) => {
    for (const b0 of dizi(kayit.bolumler)) {
      const b = nesne(b0); const bat = `${at}/${String(b.id ?? "?")}`;
      for (const d0 of dizi(b.dikte)) {
        const d = nesne(d0); const dat = `${bat}/dikte ${String(d.id ?? "?")}`;
        if (d.seviye === "kolay") { const o = dizi(d.opts); ekle(dat, typeof d.ans === "number" ? o[d.ans] : undefined); }
        else if (d.seviye === "gercek") { ekle(dat, d.ornek_de); for (const z of yazilar(d.zorunlu)) ekle(dat, z); }
        else ekle(dat, ilkKabul(d));   // orta: yalnız boşluğun cevabı (m1check ile aynı); zor/usta: cümle
      }
      for (const id of dizi(b.golge)) ekle(`${bat}/gölge ${String(id)}`, satir.get(String(id)));
      const c = nesne(b.cevapla);
      ekle(`${bat}/cevapla`, c.prompt_de, false); ekle(`${bat}/cevapla`, ilkKabul(c));
    }
  };
  const sahne = nesne(g.sahne);
  bolumler(`sahne ${String(sahne.id ?? "")}`, sahne, new Map(dizi(sahne.sahneler).map((s) => [String(nesne(s).id), String(nesne(s).de ?? "")])));
  for (const a0 of dizi(g.sesler)) { const a = nesne(a0); bolumler(`ses ${String(a.id ?? "")}`, a, new Map(dizi(a.script).map((s) => [String(nesne(s).id), String(nesne(s).de ?? "")]))); }
  for (const v0 of dizi(g.gorsel)) { const v = nesne(v0); ekle(`resimden seç ${String(v.id ?? "")}`, v.de); }
  for (const n0 of dizi(nesne(g.prova).dugumler)) for (const s0 of dizi(nesne(n0).secenekler)) {
    const s = nesne(s0); if (s.uygun === false) continue;
    const at = `prova ${String(nesne(n0).id ?? "")}`, k = ilkKabul(s);
    ekle(at, s.de); if (k && (typeof s.de !== "string" || sade(k) !== sade(s.de))) ekle(at, k);
  }
  const y = nesne(nesne(g.okuma_yazma).yazma);
  ekle("yazma", y.ornek_de); for (const z of yazilar(y.zorunlu)) ekle("yazma/zorunlu", z);
  for (const m0 of dizi(nesne(g.gun_sinavi).maddeler)) {
    const m = nesne(m0); const at = `gün sınavı ${String(m.id ?? "")}`;
    ekle(at, m.audio_de, false); ekle(at, m.prompt_de, false);
    ekle(at, typeof m.de === "string" && m.k !== "order" ? m.de.replace(/___/g, " ") : undefined, false); ekle(at, ilkKabul(m));
  }
  return r;
}
function halkaGorevleri(h: Record<string, unknown>): Cumle[] {
  const at = `halka ${String(h.id ?? "?")}`; const r: Cumle[] = [];
  for (const gc0 of dizi(h.gorev_cumleleri)) {
    const gc = nesne(gc0); const de = yazi(gc.de), yer = `${at} ${String(gc.kart ?? "")}`;
    if (de) r.push({ yer, de: de.replace(/___/g, " "), uretim: true });
    const k = ilkKabul(gc); if (k && (!de || sade(k) !== sade(de))) r.push({ yer, de: k, uretim: true });
  }
  return r;
}

/** garden.ts ESDIZIM_ACIK / esdizimler ile aynı sıra: boşluk cevabında geçen eşdizim önce, sonra içerikteki sıra; ilk 3 açık */
export function acikEsdizimler(l: Pick<Lexeme, "de" | "art" | "forms" | "collocations">): string[] {
  const tk = (x: string) => x.trim().replace(/[.,!?;:„“"»«()]/g, " ").split(/\s+/).filter(Boolean);   // garden.ts `tokens`
  const kendi = new Set(tk(`${l.art ?? ""} ${l.de}`.toLowerCase()));
  const cevap = new Set((l.forms ?? []).flatMap((f) => tk(f.answer.toLowerCase().replace(/\s*…\s*/g, " "))).filter((w) => !kendi.has(w)));
  return (l.collocations ?? []).map((c, k) => ({ c, k, p: tk(c.de.toLowerCase()).some((w) => cevap.has(w)) ? 1 : 0 }))
    .sort((a, b) => b.p - a.p || a.k - b.k).slice(0, 3).map((x) => x.c.de);
}
/** Gösterilmiş kalıplar: bilinen kartların açık eşdizimleri + biten temel derslerin çok sözcüklü `exp.parcalar`ı */
function gosterilenKaliplar(d: KumeDizini, kartlar: Iterable<string>, biten: Iterable<string>, dersler?: ReadonlyMap<string, TemelDers>): string[][] {
  const r: string[][] = [];
  for (const id of kartlar) { const l = d.kartlar.get(id); if (l) for (const c of acikEsdizimler(l)) r.push(...kalipSecenekleri(c).filter((x) => x.length > 1)); }
  for (const id of biten) for (const t of dersler?.get(id)?.teach ?? []) {
    for (const p of (t as unknown as { exp?: { parcalar?: { de?: string }[] } }).exp?.parcalar ?? []) r.push(...kalipSecenekleri(p.de).filter((x) => x.length > 1));
  }
  return r;
}

export interface DikisGirdi {
  gunler: { file: string; data: GunHam }[];
  tablo: KesinTablo;
  omurga: Omurga;
  dizin: KumeDizini;
  /** temel dersler (`exp.parcalar` kalıpları için) */
  dersler?: ReadonlyMap<string, TemelDers>;
  /** yalnız bu günler denetlenir (boşsa hepsi); (a) ve (d) için bütün günler yine okunur */
  sadece?: number[];
  /** 1. haftanın halkasız günlerini de denetle */
  tum?: boolean;
  /** eksik gün dosyası olan haftada (a)'nın eksik kartları ihlal değil, not */
  yarim?: boolean;
}

export function dikisDenetle(g: DikisGirdi): DikisSonuc {
  const tablo = tabloGunleri(g.tablo);
  const omurgaDers = new Map(dizi(g.omurga.gunler).map(nesne).filter((x) => typeof x.day === "number").map((x) => [x.day as number, yazilar(x.dersler)] as const));
  const dersIlk = new Map<string, number>();
  for (const [gun, ds] of [...omurgaDers].sort((a, b) => a[0] - b[0])) for (const x of ds) if (!dersIlk.has(x)) dersIlk.set(x, gun);
  const kartGunu = new Map<string, number>();
  for (const [gun, ks] of [...tablo].sort((a, b) => a[0] - b[0])) for (const k of ks) if (!kartGunu.has(k)) kartGunu.set(k, gun);
  const nerede = (k: string) => (kartGunu.has(k) ? `${haftaOf(kartGunu.get(k)!)}. hafta, ${kartGunu.get(k)}. gün` : "tabloda yok");

  const ihlaller: Ihlal[] = [], satirlar: GunSatiri[] = [];
  const sirali = [...g.gunler].filter((x) => typeof x.data?.day === "number").sort((a, b) => a.data.day - b.data.day);
  const dosyaGun = new Map(sirali.map((x) => [x.data.day, x.data] as const));
  const gorulen = new Map<string, { hafta: number; gun: number; yer: string }[]>();
  const satirOf = new Map<number, GunSatiri>();
  const ihlal = (s: GunSatiri, kural: Kural, yer: string, mesaj: string) => { ihlaller.push({ gun: s.gun, kural, yer, mesaj }); s.sayi[kural]++; };
  const bos = (): Record<Kural, number> => ({ a: 0, b: 0, c: 0, d: 0, bicim: 0 });

  for (const { file, data: gun } of sirali) {
    const n = gun.day, hafta = haftaOf(n);
    const halkalar = dizi(gun.halkalar).map(nesne);
    const satir: GunSatiri = { gun: n, hafta, dosya: file, durum: "denetlendi", sayi: bos(), not: [] };
    satirOf.set(n, satir);
    for (const c of [...halkalar.flatMap(halkaGorevleri), ...halkaDisiGorevler(gun)]) {
      if (!c.uretim) continue;
      const s = sade(c.de); if (s.split(" ").length < 3) continue;
      const l = gorulen.get(s) ?? []; l.push({ hafta, gun: n, yer: c.yer }); gorulen.set(s, l);
    }
    if (g.sadece?.length && !g.sadece.includes(n)) { satir.durum = "atlandı"; satir.neden = "seçilmedi"; satirlar.push(satir); continue; }
    if (!halkalar.length) {
      if (n <= 7 && !g.tum) { satir.durum = "atlandı"; satir.neden = "1. hafta, halkasız (eski biçim)"; satirlar.push(satir); continue; }
      if (n > 7) ihlal(satir, "bicim", "halkalar", "halka biçimi yok (8. günden sonra zorunlu)");
    }
    const yeni = yazilar(gun.yeni_kartlar);

    // (a) günlük adet ±2 (küme eşitliği hafta düzeyinde, aşağıda)
    const bekl = tablo.get(n);
    if (!bekl) ihlal(satir, "a", "yeni_kartlar", `tabloda ${n}. gün yok`);
    else if (Math.abs(yeni.length - bekl.length) > 2) ihlal(satir, "a", "yeni_kartlar", `${yeni.length} kart; tabloda ${bekl.length} (±2)`);

    // (c)
    const omDers = omurgaDers.get(n);
    const dersler = yazilar(gun.dersler), gramer = yazilar(nesne(gun.requires).gramer);
    if (omDers === undefined) ihlal(satir, "c", "dersler", `omurgada ${n}. gün yok`);
    else {
      for (const x of omDers) if (!dersler.includes(x)) ihlal(satir, "c", "dersler", `eksik ${x} (omurga ${n}. gün)`);
      for (const x of dersler) if (!omDers.includes(x)) ihlal(satir, "c", "dersler", `fazla ${x}${dersIlk.has(x) ? ` (omurgada ${dersIlk.get(x)}. gün)` : " (omurgada yok)"}`);
    }
    for (const x of gramer) if (/^(r0|gr|dn):/.test(x) && !dersIlk.has(x)) ihlal(satir, "c", "requires.gramer", `${x} omurgada yok`);
    for (const x of new Set([...dersler, ...gramer])) {
      const ilk = dersIlk.get(x);
      if (ilk !== undefined && haftaOf(ilk) > hafta) ihlal(satir, "c", dersler.includes(x) ? "dersler" : "requires.gramer", `${x} ${haftaOf(ilk)}. haftanın dersi (omurga ${ilk}. gün)`);
    }

    // (b) K(t)
    const ilkGun = (hafta - 1) * 7 + 1;
    const onceKart = new Set<string>(), onceDers = new Set<string>();
    for (const [gn, ks] of tablo) if (gn < ilkGun) for (const k of ks) onceKart.add(k);
    for (const [gn, ds] of omurgaDers) if (gn < ilkGun) for (const x of ds) onceDers.add(x);
    const tablodanAlinan: number[] = [];
    for (let gn = ilkGun; gn < n; gn++) {
      const f = dosyaGun.get(gn);
      if (f) { for (const k of yazilar(f.yeni_kartlar)) onceKart.add(k); for (const x of yazilar(f.dersler)) onceDers.add(x); }
      else { tablodanAlinan.push(gn); for (const k of tablo.get(gn) ?? []) onceKart.add(k); for (const x of omurgaDers.get(gn) ?? []) onceDers.add(x); }
    }
    if (tablodanAlinan.length) satir.not.push(`dosyası olmayan önceki gün tablodan: ${tablodanAlinan.join(", ")}`);
    const bugunDers = new Set(dersler);
    const bugunDersKart = [...bugunDers].flatMap((id) => [...(g.dizin.dersler.get(id)?.kart ?? [])]);
    let ortulen = 0;
    const denetle = (c: Cumle, k: Bilinen, gosterilen: string[][]) => {
      const tt = toks(c.de); const ort = new Set<string>();
      for (const kp of gosterilen) for (const j of kalipOrtu(tt, kp)) ort.add(tt[j]!);
      const u0 = bilinmeyenler(g.dizin, c.de, k).filter((u) => u.tur === "kart");
      const u = u0.filter((x) => !ort.has(x.sozcuk));
      if (u.length < u0.length) ortulen++;
      for (const x of u) ihlal(satir, "b", c.yer, `"${x.sozcuk}" tanıtılmadan soruluyor (${(x.adaylar ?? []).map((a) => `${a} → ${nerede(a)}`).join("; ")}): ${c.de}`);
    };
    const yeniSet = new Set(yeni), gorulenKart = new Set<string>(); const kaliplar: string[][] = [];
    for (const h of halkalar) {
      for (const kp of dizi(h.kaliplar)) kaliplar.push(...kalipSecenekleri(String(nesne(kp).de ?? "")));
      const kartlar = yazilar(h.kartlar).filter((x) => yeniSet.has(x));
      const sonra = h.dersten_sonra === true;
      const kart = new Set([...onceKart, ...gorulenKart, ...kartlar, ...(sonra ? bugunDersKart : [])]), biten = new Set([...onceDers, ...(sonra ? bugunDers : [])]);
      const gos = gosterilenKaliplar(g.dizin, kart, biten, g.dersler);
      for (const c of halkaGorevleri(h)) denetle(c, { kart, biten, kaliplar: [...kaliplar] }, gos);
      for (const x of kartlar) gorulenKart.add(x);
    }
    const kartG = new Set([...onceKart, ...yeni, ...bugunDersKart]), bitenG = new Set([...onceDers, ...bugunDers]);
    const gosG = gosterilenKaliplar(g.dizin, kartG, bitenG, g.dersler);
    for (const c of halkaDisiGorevler(gun)) denetle(c, { kart: kartG, biten: bitenG, kaliplar }, gosG);
    if (ortulen) satir.not.push(`${ortulen} adım gösterilmiş kalıpla (eşdizim/ders parçası) geçti`);
    satirlar.push(satir);
  }

  // (a) hafta düzeyinde küme eşitliği: denetlenen günü olan her hafta
  const haftalar = new Set(satirlar.filter((s) => s.durum === "denetlendi").map((s) => s.hafta));
  for (const h of haftalar) {
    const gunler = haftaGunleri(h);
    const ilkSatir = satirlar.find((s) => s.hafta === h && s.durum === "denetlendi")!;
    // 1. haftada eski biçim (atlanan) gün varken hafta kümesi kurulamaz: o günler tablodan önceki dağılımı taşır
    const eski = g.tum ? [] : gunler.filter((gn) => gn <= 7 && dosyaGun.has(gn) && !dizi(dosyaGun.get(gn)!.halkalar).length);
    if (eski.length) { ilkSatir.not.push(`${h}. hafta kümesi sayılmadı: eski biçim gün ${eski.join(", ")}`); continue; }
    const beklenen = gunler.flatMap((gn) => tablo.get(gn) ?? []);
    const yazilan = gunler.filter((gn) => dosyaGun.has(gn)).flatMap((gn) => yazilar(dosyaGun.get(gn)!.yeni_kartlar).map((k) => ({ k, gn })));
    const b = new Set(beklenen), y = new Set(yazilan.map((x) => x.k));
    const hedef = (gn: number) => (satirOf.get(gn)?.durum === "denetlendi" ? satirOf.get(gn)! : ilkSatir);
    for (const { k, gn } of yazilan) if (!b.has(k)) ihlal(hedef(gn), "a", `${h}. hafta`, `fazla ${k} (${nerede(k)})`);
    const goruldu = new Map<string, number>();
    for (const { k, gn } of yazilan) { if (goruldu.has(k)) ihlal(hedef(gn), "a", `${h}. hafta`, `iki kez ${k} (${goruldu.get(k)}. ve ${gn}. gün)`); else goruldu.set(k, gn); }
    const eksik = beklenen.filter((k) => !y.has(k));
    const yok = gunler.filter((gn) => !dosyaGun.has(gn));
    if (eksik.length && yok.length && g.yarim) ilkSatir.not.push(`${h}. hafta yarım (dosyası yok: ${yok.join(", ")}); eksik ${eksik.length} kart sayılmadı`);
    else for (const k of eksik) ihlal(ilkSatir, "a", `${h}. hafta`, `eksik ${k} (${nerede(k)})${yok.length ? ` · dosyası olmayan gün: ${yok.join(", ")}` : ""}`);
  }

  // (d) haftalar arası aynı üretim cümlesi
  for (const [s, yerler] of gorulen) {
    if (new Set(yerler.map((y) => y.hafta)).size < 2) continue;
    const ilk = yerler.reduce((a, b) => (b.gun < a.gun ? b : a));
    for (const y of yerler) {
      const satir = satirOf.get(y.gun);
      if (y.hafta === ilk.hafta || satir?.durum !== "denetlendi") continue;
      ihlal(satir, "d", y.yer, `aynı üretim cümlesi ${ilk.hafta}. haftada da var (${ilk.gun}. gün, ${ilk.yer}): ${s}`);
    }
  }
  if (!satirlar.some((s) => s.durum === "denetlendi")) ihlaller.push({ gun: 0, kural: "bicim", yer: "-", mesaj: "hiç gün denetlenmedi" });
  return { satirlar, ihlaller, toplam: ihlaller.length };
}

export function rapor(r: DikisSonuc): string {
  const L = ["| gün | hafta | durum | (a) kart | (b) sıra | (c) ders | (d) tekrar | biçim | not |", "|---:|---:|---|---:|---:|---:|---:|---:|---|"];
  for (const s of r.satirlar) {
    const say = (k: Kural) => (s.durum === "atlandı" ? "–" : String(s.sayi[k]));
    L.push(`| ${s.gun} | ${s.hafta} | ${s.durum === "atlandı" ? `atlandı: ${s.neden}` : "denetlendi"} | ${KURALLAR.map(say).join(" | ")} | ${s.not.join("; ")} |`);
  }
  L.push("", `İhlal: ${r.toplam}`);
  for (const i of r.ihlaller) L.push(`- ${i.gun}. gün (${i.kural}) ${i.yer}: ${i.mesaj}`);
  return L.join("\n");
}
