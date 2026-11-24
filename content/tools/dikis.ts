/**
 * Dikiş denetçisi (PM-090 md. 2.1; PM kararı 7087835391 md. 2: "tablo haftayı sabitler, günü değil"). Yapay zekâsız, saf.
 * Kaynaklar: `content/v2/curriculum/{a1,a2,b1}-kesin.json` birleşimi (ktablo.ts `kesinTabloBirlesik`; 1.–7. gün a1 `ogretilmis_sayilan.gunler`, sonrası `gunler[]`),
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
 *  (b, çerçeve) PM 7088230583 md. 1: tablonun `cerceve` listesindeki işlev sözcüğü (ich, du, nicht, mit …; sözlükte `card:false`)
 *      `yeni_kartlar`a yazılmaz ((a) "çerçeve sözcüğü") ve kullanılan her BİÇİMİ (PM 7088563328 md. 1: ayrı biçim, ayrı gösterim;
 *      ich gösterildi diye mir serbest değil) önce gösterilmiş olmalı: KALIP satırı (halkanın `kaliplar`ı), TANITIM (biten `r0:` dersinin
 *      `teach`'i ve tablosu) ya da sunulmuş DİL NOKTASININ TABLOSU (`gr:` grammar.json, `dn:` dn-HH.json; tablodaki bütün biçimler).
 *      Gösterilmiş kalıbın BÜTÜNÜ içinde geçen çerçeve sözcüğü kullanılmış sayılmaz. Kısıt o haftanın ve sonraki haftaların listesindedir;
 *      önceki haftaların çerçevesi bilinir (paralel hatta önceki haftanın dosyaları dalda olmayabilir; o haftayı kendi koşusu denetler). Tablo listeyi `haftalar[].cerceve` (`no` = hafta) ya da `gunler[].cerceve` ile verir.
 *  (biçim) 8. gün ve sonrası halka biçiminde olmalı (`halkalar` boş olamaz; sınav günü (`sinav` bağı) halkasızdır); hiç gün denetlenmezse ihlal. `day` tamsayı değilse ya da
 *      dosya adındaki gün (`gun-NN.json`) `day` ile tutmazsa ihlal (sessizce düşülmez; inceleme #199 2. tur takibi).
 * Kalıp örtüsü KONUMA göredir (inceleme #199 2. tur takibi): kalıbın kapsadığı geçiş örtülür, aynı sözcüğün kalıp dışındaki geçişi değil.
 * 1. haftanın halkasız (eski biçim) günleri "atlandı" görünür ve sayılmaz; `tum: true` ile denetlenir. Böyle bir gün varken
 * 1. haftanın küme eşitliği (a) kurulamaz (o günler tablo öncesi dağılımı taşır): satıra not düşülür; halkaya geçince sayılır.
 */
import { YUVA, YUVA_AD, bilinmeyenler, kalipOrtu, kalipSecenekleri, toks, toksAsil, type Bilinen, type KumeDizini } from "../../packages/shared/src/kume.ts";
import type { Lexeme, TemelDers } from "../../packages/shared/src/index.ts";

export interface KesinTablo {
  ogretilmis_sayilan?: { gunler?: Record<string, string[]> };
  haftalar?: { no: number; kartlar?: string[]; cerceve?: string[] }[];
  gunler: { day: number; hafta?: number; kartlar: string[]; cerceve?: string[]; dersler?: string[] }[];
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

/** Tablo: hafta → çerçeve sözcükleri (`haftalar[].cerceve` ∪ o haftanın `gunler[].cerceve`); kimlik (lx:…) ya da yalın sözcük */
export function tabloCerceve(t: KesinTablo): Map<number, string[]> {
  const m = new Map<number, string[]>();
  const ekle = (h: number, l: string[]) => { if (l.length) m.set(h, [...new Set([...(m.get(h) ?? []), ...l])]); };
  for (const h of dizi(t.haftalar)) { const x = nesne(h); if (typeof x.no === "number") ekle(x.no, yazilar(x.cerceve)); }
  for (const g of dizi(t.gunler)) { const x = nesne(g); if (typeof x.day === "number") ekle(haftaOf(x.day), yazilar(x.cerceve)); }
  return m;
}

/** Bir dil noktasının (grammar.json / dn-HH.json biçimi) GÖSTERDİĞİ biçimler: yalnız tablo hücreleri (PM 7088563328 md. 1: "sunulmuş dil
 *  noktasının tablosu"; örnek cümle ve açıklama gösterim sayılmaz) */
export function dilNoktasiMetni(n: unknown): string[] {
  return dizi(nesne(nesne(n).table).rows).flatMap((r) => yazilar(r));
}

/** bilinmeyenler()'in kendi içinde örttüğü konumlar (aynı kurallar: halkanın kalıpları, biten derslerin kalıpları, bilinen kartların çok sözcüklü başlıkları) */
export function icOrtu(d: KumeDizini, tt: readonly string[], k: Bilinen): Set<number> {
  const kart = new Set(k.kart); for (const id of k.biten) for (const x of d.dersler.get(id)?.kart ?? []) kart.add(x);
  const duz: (readonly string[])[] = [...(k.kaliplar ?? [])];
  for (const id of k.biten) duz.push(...(d.dersler.get(id)?.kaliplar ?? []));
  for (const id of kart) duz.push(...(d.coklu.get(id) ?? []));
  const o = new Set<number>(); for (const kp of duz) for (const j of kalipOrtu(tt, kp)) o.add(j);
  return o;
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
export function gosterilenKaliplar(d: KumeDizini, kartlar: Iterable<string>, biten: Iterable<string>, dersler?: ReadonlyMap<string, TemelDers>): string[][] {
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
  /** `gr:`/`dn:` dil noktası → gösterdiği Almanca metinler (dilNoktasiMetni); çerçeve kuralı için */
  dilNoktalari?: ReadonlyMap<string, readonly string[]>;
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
  // biçim: `day` tamsayı değilse gün düşülmez, kırmızı; dosya adı ile `day` tutmalı; aynı gün iki dosya olamaz
  const adUyumsuz = new Map<number, string[]>();
  const gecerli = g.gunler.filter((x) => {
    const day = (x.data as { day?: unknown } | null | undefined)?.day;
    if (typeof day !== "number" || !Number.isInteger(day) || day < 1) {
      ihlaller.push({ gun: 0, kural: "bicim", yer: x.file, mesaj: `"day" pozitif tamsayı değil (${JSON.stringify(day) ?? "yok"}); gün denetlenemedi` });
      return false;
    }
    const ad = /gun-(\d{2,3})\.json$/.exec(x.file)?.[1];
    if (ad !== undefined && Number(ad) !== day) adUyumsuz.set(day, [...(adUyumsuz.get(day) ?? []), `dosya adı ${Number(ad)}. gün, "day" ${day}`]);
    return true;
  });
  const sirali = [...gecerli].sort((a, b) => a.data.day - b.data.day);
  for (let i = 1; i < sirali.length; i++) if (sirali[i]!.data.day === sirali[i - 1]!.data.day) {
    const d = sirali[i]!.data.day; adUyumsuz.set(d, [...(adUyumsuz.get(d) ?? []), `aynı gün iki dosya: ${sirali[i - 1]!.file}, ${sirali[i]!.file} (ilki denetlendi)`]);
  }
  const tekil = sirali.filter((x, i) => i === 0 || x.data.day !== sirali[i - 1]!.data.day);
  const dosyaGun = new Map(tekil.map((x) => [x.data.day, x.data] as const));

  // çerçeve sözcükleri (PM 7088230583 md. 1): kimlik → tablodaki haftası
  const cerceveHafta = new Map<string, number>();
  const tabloSorun: string[] = [];
  const cerceveKimlik = (x: string): string[] => {
    if (x.startsWith("lx:")) {
      const l = g.dizin.kartlar.get(x);
      // sözlükte yoksa (İÇ-K2 `sozlukte_yok`) yalın başlık sözcüğüyle denetlenir; kart (card:false değil) ise tablo hatası
      if (!l) { const yalin = x.slice(3).replace(/#\d+$/, "").toLowerCase(); tabloSorun.push(`${x} sözlükte yok: "${yalin}" sözcüğüyle denetlendi`); return [`söz:${yalin}`]; }
      if (!g.dizin.cerceve.has(x)) ihlaller.push({ gun: 0, kural: "a", yer: "tablo cerceve", mesaj: `${x} sözlükte kart (card:false değil); çerçeve listesinde olamaz` });
      return [x];
    }
    const ids = [...(g.dizin.idx.get(x.toLowerCase()) ?? [])].filter((i) => g.dizin.cerceve.has(i));
    return ids.length ? ids : [`söz:${x.toLowerCase()}`];
  };
  for (const [h, l] of [...tabloCerceve(g.tablo)].sort((a, b) => a[0] - b[0])) for (const x of l) for (const id of cerceveKimlik(x)) if (!cerceveHafta.has(id)) cerceveHafta.set(id, h);
  /** sözcüğün çerçeve okunuşları: sözlükteki card:false girdileri + tablodaki yalın sözcük */
  const cerceveOkunus = (t: string): string[] => [...[...(g.dizin.idx.get(t) ?? [])].filter((i) => g.dizin.cerceve.has(i)), ...(cerceveHafta.has(`söz:${t}`) ? [`söz:${t}`] : [])];
  /** gösterilen BİÇİMLER (küçük harfli sözcük; PM 7088563328 md. 1) */
  const goster = (S: Set<string>, metin: string | undefined) => { for (const t of toks(metin)) S.add(t); };
  const metinsiz = new Set<string>();
  const dersGoster = (S: Set<string>, id: string) => {
    if (/^(gr|dn):/.test(id) && !g.dilNoktalari?.has(id)) metinsiz.add(id);
    const b = g.dizin.dersler.get(id);
    for (const s of b?.bicim ?? []) goster(S, s);
    for (const kp of b?.kaliplar ?? []) goster(S, kp.filter((x) => x !== YUVA).join(" "));
    const t = g.dersler?.get(id);
    for (const x of t?.teach ?? []) {
      goster(S, x.de);
      for (const p of (x as unknown as { exp?: { parcalar?: { de?: string }[] } }).exp?.parcalar ?? []) goster(S, p.de);
    }
    for (const row of t?.table?.satirlar ?? []) for (const cell of row) goster(S, cell);
    for (const m of g.dilNoktalari?.get(id) ?? []) goster(S, m);
  };
  const halkaGoster = (S: Set<string>, h: Record<string, unknown>) => { for (const kp of dizi(h.kaliplar)) goster(S, String(nesne(kp).de ?? "")); };
  const gorulen = new Map<string, { hafta: number; gun: number; yer: string }[]>();
  const satirOf = new Map<number, GunSatiri>();
  const ihlal = (s: GunSatiri, kural: Kural, yer: string, mesaj: string) => { ihlaller.push({ gun: s.gun, kural, yer, mesaj }); s.sayi[kural]++; };
  const bos = (): Record<Kural, number> => ({ a: 0, b: 0, c: 0, d: 0, bicim: 0 });

  for (const { file, data: gun } of tekil) {
    const n = gun.day, hafta = haftaOf(n);
    const halkalar = dizi(gun.halkalar).map(nesne);
    const satir: GunSatiri = { gun: n, hafta, dosya: file, durum: "denetlendi", sayi: bos(), not: [] };
    satirOf.set(n, satir);
    for (const c of [...halkalar.flatMap(halkaGorevleri), ...halkaDisiGorevler(gun)]) {
      if (!c.uretim) continue;
      const s = sade(c.de); if (s.split(" ").length < 3) continue;
      const l = gorulen.get(s) ?? []; l.push({ hafta, gun: n, yer: c.yer }); gorulen.set(s, l);
    }
    const atla = (neden: string) => { satir.durum = "atlandı"; satir.neden = neden; for (const m of adUyumsuz.get(n) ?? []) satir.not.push(`biçim (sayılmadı): ${m}`); satirlar.push(satir); };
    if (g.sadece?.length && !g.sadece.includes(n)) { atla("seçilmedi"); continue; }
    // sınav günü (PM-101 md. 5, PM-110): kartsız, dersiz, halkasız; o gün deneme açılır. Halka biçimi istenmez, kart/ders kuralları aynen
    // sayılır (tabloda o gün 0 kart, omurgada 0 ders olmalı; haftalık küme eşitliği sınav gününü boş sayar)
    const sinav = typeof gun.sinav === "string" ? gun.sinav : null;
    if (sinav) satir.not.push(`sınav günü (${sinav}${dizi(gun.sinav_bolumler).length ? `: ${yazilar(gun.sinav_bolumler).join(", ")}` : ""})`);
    if (!halkalar.length && !sinav) {
      if (n <= 7 && !g.tum) { atla("1. hafta, halkasız (eski biçim)"); continue; }
      if (n > 7) ihlal(satir, "bicim", "halkalar", "halka biçimi yok (8. günden sonra zorunlu)");
    }
    if (sinav && halkalar.length) ihlal(satir, "bicim", "halkalar", `sınav günü halkasızdır (${halkalar.length} halka)`);
    for (const m of adUyumsuz.get(n) ?? []) ihlal(satir, "bicim", file, m);
    const yeni = yazilar(gun.yeni_kartlar);

    // (a) günlük adet ±2 (küme eşitliği hafta düzeyinde, aşağıda)
    const bekl = tablo.get(n)?.filter((k) => !cerceveHafta.has(k));
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
    // çerçeve: bu adıma kadar gösterilenler (önceki günler: dosya varsa dersleri + halka kalıpları, yoksa omurganın dersleri)
    const cerceveVar = cerceveHafta.size > 0;
    const onceGoster = new Set<string>();
    if (cerceveVar) for (let gn = 1; gn < n; gn++) {
      const f = dosyaGun.get(gn);
      if (f) { for (const x of yazilar(f.dersler)) dersGoster(onceGoster, x); for (const h of dizi(f.halkalar)) halkaGoster(onceGoster, nesne(h)); }
      else for (const x of omurgaDers.get(gn) ?? []) dersGoster(onceGoster, x);
      if (gn === ilkGun - 1) metinsiz.clear();   // metinsiz notu yalnız bu haftanın dil noktaları için
    }
    let ortulen = 0, cerceve1 = 0;
    const denetle = (c: Cumle, k: Bilinen, gosterilen: string[][], S: ReadonlySet<string>) => {
      const tt = toksAsil(c.de).map((x) => x.t);
      const ic = icOrtu(g.dizin, tt, k), dis = new Set<number>();
      for (const kp of gosterilen) for (const j of kalipOrtu(tt, kp)) dis.add(j);
      // konuma göre: sözcüğün bilinmeyen geçiş sayısı, kalıp dışında kalan geçiş sayısını aşamaz (bilinmeyenler sırayla, konumsuz döner)
      const u0 = bilinmeyenler(g.dizin, c.de, k).filter((u) => u.tur === "kart");
      const sozler = new Map<string, typeof u0>();
      for (const x of u0) sozler.set(x.sozcuk, [...(sozler.get(x.sozcuk) ?? []), x]);
      const u = [...sozler].flatMap(([w, l]) => l.slice(0, Math.min(l.length, tt.filter((t, j) => t === w && !ic.has(j) && !dis.has(j)).length)));
      if (u.length < u0.length) ortulen++;
      for (const x of u) ihlal(satir, "b", c.yer, `"${x.sozcuk}" tanıtılmadan soruluyor (${(x.adaylar ?? []).map((a) => `${a} → ${nerede(a)}`).join("; ")}): ${c.de}`);
      if (!cerceveVar) return;
      const bildirilen = new Set<string>();
      tt.forEach((t, j) => {
        if (t === YUVA_AD || ic.has(j) || dis.has(j) || bildirilen.has(t)) return;
        const ok = cerceveOkunus(t); if (!ok.length) return;
        if (S.has(t)) return;
        const kisitli = (i: string) => cerceveHafta.has(i) && cerceveHafta.get(i)! >= hafta;
        // çok okunuşlu biçim (ihr: lx:ihr / lx:ihr#2): okunuşlardan biri serbestse (listede yok ya da önceki haftanın)
        // cümlede o okunuş olabilir; makine anlamı ayırt edemez, kırmızı yalnız bütün okunuşlar kısıtlıyken (bilinçli; yanlış kırmızıdan kaçınır)
        if (!ok.every(kisitli)) return;
        // sözcüğü başlık olarak gösteren, bilinen gerçek kart (tanıtılmış ya da biten dersin kartı) varsa kartın sözcüğüdür
        const bilinenKart = new Set(k.kart); for (const id of k.biten) for (const x of g.dizin.dersler.get(id)?.kart ?? []) bilinenKart.add(x);
        if ([...(g.dizin.idx.get(t) ?? [])].some((i) => !g.dizin.cerceve.has(i) && bilinenKart.has(i) && g.dizin.gost.get(i)?.has(t))) return;
        bildirilen.add(t);
        // 1. hafta tablodan öncedir (tablo 1.–7. güne atama yapmaz, `ogretilmis_sayilan`): bulgu sayılmaz, satıra not
        if (hafta === 1) { cerceve1++; return; }
        ihlal(satir, "b", c.yer, `"${t}" çerçeve sözcüğü (${ok.map((i) => `${i} → ${cerceveHafta.get(i)}. hafta`).join("; ")}) biçimi kalıpta, tanıtımda ya da dil noktası tablosunda gösterilmeden kullanılıyor: ${c.de}`);
      });
    };
    const yeniSet = new Set(yeni), gorulenKart = new Set<string>(); const kaliplar: string[][] = [];
    const gunGoster = new Set(onceGoster);
    for (const h of halkalar) {
      for (const kp of dizi(h.kaliplar)) kaliplar.push(...kalipSecenekleri(String(nesne(kp).de ?? "")));
      if (cerceveVar) halkaGoster(gunGoster, h);
      const kartlar = yazilar(h.kartlar).filter((x) => yeniSet.has(x));
      const sonra = h.dersten_sonra === true;
      const kart = new Set([...onceKart, ...gorulenKart, ...kartlar, ...(sonra ? bugunDersKart : [])]), biten = new Set([...onceDers, ...(sonra ? bugunDers : [])]);
      const gos = gosterilenKaliplar(g.dizin, kart, biten, g.dersler);
      const S = new Set(gunGoster); if (cerceveVar && sonra) for (const x of bugunDers) dersGoster(S, x);
      for (const c of halkaGorevleri(h)) denetle(c, { kart, biten, kaliplar: [...kaliplar] }, gos, S);
      for (const x of kartlar) gorulenKart.add(x);
    }
    const kartG = new Set([...onceKart, ...yeni, ...bugunDersKart]), bitenG = new Set([...onceDers, ...bugunDers]);
    const gosG = gosterilenKaliplar(g.dizin, kartG, bitenG, g.dersler);
    if (cerceveVar) for (const x of bugunDers) dersGoster(gunGoster, x);
    for (const c of halkaDisiGorevler(gun)) denetle(c, { kart: kartG, biten: bitenG, kaliplar }, gosG, gunGoster);
    if (ortulen) satir.not.push(`${ortulen} adım gösterilmiş kalıpla (eşdizim/ders parçası) geçti`);
    if (cerceve1) satir.not.push(`1. hafta (tablo öncesi, sayılmadı): ${cerceve1} çerçeve biçimi gösterilmeden kullanılıyor`);
    if (cerceveVar && metinsiz.size) { satir.not.push(`metni olmayan dil noktası (çerçeve için hiçbir şey göstermez): ${[...metinsiz].sort().join(", ")}`); metinsiz.clear(); }
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
    const beklenen = gunler.flatMap((gn) => tablo.get(gn) ?? []).filter((k) => !cerceveHafta.has(k));
    const yazilan = gunler.filter((gn) => dosyaGun.has(gn)).flatMap((gn) => yazilar(dosyaGun.get(gn)!.yeni_kartlar).map((k) => ({ k, gn })));
    const b = new Set(beklenen), y = new Set(yazilan.map((x) => x.k));
    const hedef = (gn: number) => (satirOf.get(gn)?.durum === "denetlendi" ? satirOf.get(gn)! : ilkSatir);
    for (const { k, gn } of yazilan) {
      if (cerceveHafta.has(k)) ihlal(hedef(gn), "a", `${h}. hafta`, `çerçeve sözcüğü ${k} yeni_kartlar'a yazılmaz (tabloda ${cerceveHafta.get(k)}. haftanın çerçevesi)`);
      else if (!b.has(k)) ihlal(hedef(gn), "a", `${h}. hafta`, `fazla ${k} (${nerede(k)})`);
    }
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
  if (tabloSorun.length) satirlar.find((s) => s.durum === "denetlendi")?.not.push(`tablo çerçevesi: ${tabloSorun.join("; ")}`);
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
