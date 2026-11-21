/**
 * AKIS.md AK-4: günün dizilişi — "Halka" planlayıcısı (AK-10 2. adım). Saf: ekran, depolama, saat yok (simdi girdi).
 * Gün → seans (4 × ≈25 dk, K1) → durak (5–9 dk) → adım. Kart, cümle, ders, klip ve FSRS aynen kalır; yalnız dizen katman.
 *
 * Değişmez kurallar (AK-2, AK-3, K3–K5, K8; özellik testleri akis.test.ts):
 *  1. art arda en çok `tanitim_art_arda` tanıtım (kelime ya da kalıp), hemen ardından kullanım;
 *  2. her kelime gün içinde ≥ 3 kullanım türünde ve ≥ 2 cümlede; en az 2 kullanımı kendi halkasında, üçüncüsü sonraki durakta;
 *  3. halka içinde aynı tür art arda gelmez; aynı kip art arda en çok `kip_art_arda` (gevşetme sırası: önce kip, sonra tür — K4);
 *  4. görev cümlesinde K(t) dışında sözcük `gorev_bilinmeyen_max` (0) — hiç gevşemez; gösterim satırında ≤ `gosterim_bilinmeyen_max`.
 *     Kapı, adımın PLANDAKİ YERİNDE (o ana kadar tanıtılanlarla) sınanır: halka, dil durağı ve gün sonu aynı kapıdan geçer;
 *  5. üretim adımında çerçeve sözcüğü daha önce en az `cerceve_uretim_min` adımda görülmüş olmalı (K5), yoksa yapboz olur;
 *  6. K8: tek sözcüklü `teach` kartın halkadaki tanıtımıdır; çok sözcüklü `teach` kalıptır (halka kalıbı kapsıyorsa onunla
 *     birleşir, kapsamıyorsa parçaları bilinir olduğu ilk halkada); dil durağında tanıtım yok; dil durağının yeri K(t)'den hesaplanır.
 * Gevşemeler son dizi üzerinden bir kez, adım kimliğiyle `gevseme`ye yazılır; plan hiçbir zaman boş olmaz (BY-12).
 * Halkasız gün akış günü değildir: `planGun` null döner, çağıran eski düzene düşer (AK-5).
 */
import POLICY from "../policy.json" with { type: "json" };
import { bilinmeyenler, kalipOrtu, kartsizMi, kalipSecenekleri, toks, YUVA, type Bilinen, type Drill, type Gun, type Halka, type KumeDizini, type LearnerItem, type Lexeme, type TemelDers } from "@dw/shared";

export type Kip = "gor" | "duy" | "kur" | "soyle";
export type AdimTuru =
  | "tanit" | "kalip" | "listen_meaning" | "resimden_sec" | "dikte" | "article" | "colloc" | "eslestir"
  | "gap" | "order" | "tr_de" | "soyle" | "sahne" | "tekrar" | "ders_madde" | "tablo" | "hatirlat";
export const KIP: Record<AdimTuru, Kip> = {
  tanit: "gor", kalip: "gor", article: "gor", colloc: "gor", eslestir: "gor", tablo: "gor", hatirlat: "gor",
  listen_meaning: "duy", resimden_sec: "duy", dikte: "duy", sahne: "duy", tekrar: "duy",
  gap: "kur", order: "kur", tr_de: "kur", ders_madde: "kur", soyle: "soyle"
};
export const ADIM_TURLERI = Object.keys(KIP) as AdimTuru[];
/** Gösterim adımı: öğrenci üretmez (satır başına K(t) dışında ≤ 1 sözcük, işaretli); öteki her cümleli adım görev adımıdır */
export const GOSTERIM = new Set<AdimTuru>(["tanit", "kalip", "sahne", "listen_meaning", "resimden_sec", "eslestir", "article", "colloc", "tablo", "hatirlat"]);
const URETIM = new Set<AdimTuru>(["tr_de", "dikte", "soyle"]);
const TANITIM = new Set<AdimTuru>(["tanit", "kalip"]);
/** K3'te "kullanım türü" sayılmayanlar */
const KULLANIM_DISI = new Set<AdimTuru>(["tanit", "kalip", "eslestir", "sahne", "hatirlat", "tablo"]);

export interface Adim {
  id: string; tur: AdimTuru; kip: Kip; kartlar: string[]; cumle?: string;
  /** gösterim satırları (sahne, diyalog, dinleme, soru metni): her biri ayrı ayrı gösterim kapısından geçmiştir */
  satirlar?: string[];
  kaynak: "halka" | "ders" | "bahce" | "klip"; sn: number; neden: string;
  /** dersin öğesi (K8): kelime/kalıp `teach` ya da `drills` maddesi; birleşen kalıpta bütün `teach` kimlikleri `ogeler`de */
  ders?: { id: string; oge: string; ogeler?: string[] };
}
/** gün sonu "kendini dene" maddeleri dersin değil günün sınavından gelir (`Adim.ders.id`) */
export const GUN_SINAVI = "gun_sinavi";
export type DurakTuru = "isinma" | "ses" | "halka" | "dil" | "video" | "prova" | "okuma" | "gunsonu";
export interface Durak {
  id: string; tur: DurakTuru; seans: number; title_tr: string; tahmini_dk: number; adimlar: Adim[];
  eski_anahtar?: string; neden: string; parca?: 1 | 2;
  /** tahmini süre `durak_dk` üst sınırını aşıyor (yalnız rapor; K1 cihaz ölçümüne kadar) */
  asim?: true;
}
export type GevsemeKurali =
  | "kip" | "tur" | "tanitim" | "kullanim" | "gosterim" | "cumle" | "yapboz"
  | "kalip_sira" | "kalip_yer" | "kalip_kullanim" | "kart_tur" | "kart_cumle" | "hata";
export interface Gevseme { kural: GevsemeKurali; yer: string; kart?: string; adim?: string; not?: string }
export interface GunPlani { gun: number; surum: 1; tohum: string; duraklar: Durak[]; toplam_dk: number; neden: string[]; gevseme: Gevseme[] }

export interface AkisPolitikasi {
  seans_dk: [number, number]; durak_dk: [number, number]; gun_dk: [number, number]; halka_kart: [number, number];
  tanitim_art_arda: number; kelime_tur_min: number; kelime_cumle_min: number; kip_art_arda: number; isinma_dk: number;
  halka_tekrar: [number, number]; gosterim_bilinmeyen_max: number; gorev_bilinmeyen_max: number; cerceve_uretim_min: number;
  /** sıralayıcının baktığı aday sayısı (girdi sırasından) */
  pencere: number;
  /** halka başına dersten en çok kaç alıştırma (K8.3) */
  halka_ders_madde: number;
  /** yapboz (order) için en az sözcük */
  yapboz_min_sozcuk: number;
  adim_sn: Record<AdimTuru, number>;
  sabit_dk: { ses: number; prova: number; okuma: number; gunsonu_ek: number };
  video: { kat: number; min_dk: number; max_dk: number };
}
const ikili = (a: readonly number[]): [number, number] => [a[0] ?? NaN, a[1] ?? NaN];
const PA = POLICY.akis;
export const POLITIKA: AkisPolitikasi = {
  ...PA, seans_dk: ikili(PA.seans_dk), durak_dk: ikili(PA.durak_dk), gun_dk: ikili(PA.gun_dk), halka_kart: ikili(PA.halka_kart), halka_tekrar: ikili(PA.halka_tekrar)
};

/** Politika girişte doğrulanır (bozuk eşik sonsuz döngü ya da boş plan üretmesin; BY-12) */
export function politikaHatalari(p: AkisPolitikasi): string[] {
  const h: string[] = [];
  const tam = (ad: string, v: unknown, min: number) => { if (typeof v !== "number" || !Number.isInteger(v) || v < min) h.push(`${ad} ≥ ${min} tam sayı olmalı (${String(v)})`); };
  const aralik = (ad: string, v: unknown) => { if (!Array.isArray(v) || v.length !== 2 || !v.every((x) => typeof x === "number" && x >= 0) || v[0] > v[1]) h.push(`${ad} [en az, en çok] olmalı (${JSON.stringify(v)})`); };
  tam("tanitim_art_arda", p.tanitim_art_arda, 1); tam("kip_art_arda", p.kip_art_arda, 1); tam("pencere", p.pencere, 1);
  tam("kelime_tur_min", p.kelime_tur_min, 0); tam("kelime_cumle_min", p.kelime_cumle_min, 0); tam("cerceve_uretim_min", p.cerceve_uretim_min, 0);
  tam("gosterim_bilinmeyen_max", p.gosterim_bilinmeyen_max, 0); tam("gorev_bilinmeyen_max", p.gorev_bilinmeyen_max, 0);
  tam("halka_ders_madde", p.halka_ders_madde, 0); tam("yapboz_min_sozcuk", p.yapboz_min_sozcuk, 2);
  for (const k of ["seans_dk", "durak_dk", "gun_dk", "halka_kart", "halka_tekrar"] as const) aralik(k, p[k]);
  if (!(p.isinma_dk >= 0)) h.push("isinma_dk ≥ 0 olmalı");
  for (const t of ADIM_TURLERI) if (!(p.adim_sn?.[t]! > 0)) h.push(`adim_sn.${t} > 0 olmalı`);
  for (const k of ["ses", "prova", "okuma", "gunsonu_ek"] as const) if (!(p.sabit_dk?.[k] >= 0)) h.push(`sabit_dk.${k} ≥ 0 olmalı`);
  if (!(p.video?.kat > 0) || !(p.video.min_dk <= p.video.max_dk)) h.push("video {kat > 0, min_dk ≤ max_dk} olmalı");
  return h;
}

export interface PlanGirdi {
  gun: Gun;
  dersler: ReadonlyMap<string, TemelDers>;
  dizin: KumeDizini;
  items: ReadonlyMap<string, LearnerItem>;
  /** önceki günlerde tanıtılmış kartlar ve biten dersler (bugünkü dersler hariç) */
  oncekiKartlar: ReadonlySet<string>;
  bitenDersler: ReadonlySet<string>;
  tohum: string;
  simdi: Date;
  politika?: AkisPolitikasi;
}

/** Akış günü mü (AK-5): `halkalar` boş değilse. Değilse planGun null döner ve çağıran eski düzene düşer. */
export const akisGunu = (gun: Gun): gun is Gun & { halkalar: Halka[] } => Array.isArray(gun.halkalar) && gun.halkalar.length > 0;

export function planGun(g: PlanGirdi): GunPlani | null {
  if (!akisGunu(g.gun)) return null;
  const pol = g.politika ?? POLITIKA;
  const hata = politikaHatalari(pol);
  if (hata.length) throw new Error(`akis politikası geçersiz: ${hata.join("; ")}`);
  return new Planlayici(g, g.gun.halkalar, pol).plan();
}

/** Tohumlu, deterministik sayı üreteci (mulberry32); aynı girdi aynı planı verir (BY-2) */
function rng(tohum: string): () => number {
  let h = 1779033703 ^ tohum.length;
  for (let i = 0; i < tohum.length; i++) { h = Math.imul(h ^ tohum.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => { a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

/** Aday adım: yerine konunca kapıdan geçer (`hazir`), etkin biçimi alınır (K5) ve `Adim` olur */
interface Aday {
  tur: AdimTuru; kartlar: string[]; cumle?: string; satirlar?: string[]; kaynak: Adim["kaynak"]; neden: string;
  ders?: Adim["ders"];
  /** tanıtım: yerinde gösterim kapısından geçen ilk cümle seçilir */
  cumleler?: string[];
  /** boşluğun cevabı (sözlükte ayrı biçim olabilir): kapıda sayılmaz */
  haric?: string[];
  /** kalıp: seçenekleri (yerleşince K(t)'ye girer) */
  kalip?: string[][];
  /** kalıp: tanıtılmasını beklediği kartlar (halka kalıbı yalnız kendi halkasınınkileri; sonraki halkanın kartını kalıp bütün olarak öğretir, PM-080 §4) */
  bekle?: ReadonlySet<string>;
  /** dersin görevi gibi ek koşul */
  kosul?: () => boolean;
}

interface DilOgesi { a: Aday; ders: string; drill: boolean }
interface DersKalip { ders: string; oge: string; de: string; yerlesti: boolean }

class Planlayici {
  private readonly lex: KumeDizini["kartlar"];
  private readonly r: () => number;
  private readonly yeni: Set<string>;
  private readonly tanitilan: Set<string>;
  private readonly ogretilenKalip: string[][] = [];
  private readonly cerceveGorulen = new Map<string, number>();
  private readonly gevseme: Gevseme[] = [];
  private readonly neden: string[] = [];
  private readonly kartTur = new Map<string, Set<AdimTuru>>();
  private readonly kartCumle = new Map<string, Set<string>>();
  private adimNo = 0;
  // K8 sınıflaması
  private readonly teachKart = new Map<string, { ders: string; oge: string }>();
  private readonly dersKalip: DersKalip[] = [];
  private readonly dersMadde: (DilOgesi & { kullanildi: boolean })[] = [];
  /** halka kalıbına bağlanan ders kalıpları: halka kimliği + kalıp sırası → teach kimlikleri */
  private readonly kalipBag = new Map<string, { ders: string; ogeler: string[] }>();
  /** plana konmuş (yalnız havuza alınmış değil) ders kalıplarının teach kimlikleri */
  private readonly kalipYerlesti = new Set<string>();
  private vadeli: string[] = [];
  private vadeSira = 0;

  constructor(private readonly g: PlanGirdi, private readonly H: Halka[], private readonly pol: AkisPolitikasi) {
    this.lex = g.dizin.kartlar;
    this.r = rng(g.tohum);
    this.yeni = new Set(g.gun.yeni_kartlar.filter((c) => this.lex.has(c)));
    this.tanitilan = new Set(g.oncekiKartlar);
  }

  // ---------- kapı ----------
  private K(ek: string[][] = []): Bilinen { return { kart: this.tanitilan, biten: this.g.bitenDersler, kaliplar: [...this.ogretilenKalip, ...ek] }; }
  private bilinmeyen(de: string, haric: string[] = [], ek: string[][] = []): number { return bilinmeyenler(this.g.dizin, de, this.K(ek), haric).length; }

  /**
   * Gün sonu "kendini dene" (PM 7059008858 md. 4): günün sınav maddelerinden en çok 4'ü, önce her türden biri (duy, Türkçeden
   * Almancaya, cevap ver). Madde gün sonundaki K(t) kapısından geçmelidir (öğretilmeyen istenmez); geçen yoksa durak boş kalır.
   */
  private kendiniDene(gun: { day: number; gun_sinavi?: { maddeler: Drill[] } }): Adim[] {
    const metin = (m: Drill) => (m.k === "listen_and_respond" ? m.audio_de : "accepted" in m ? m.accepted[0] : undefined) ?? "";
    const uygun = (gun.gun_sinavi?.maddeler ?? []).filter((m) => (m.k === "listen_and_respond" || m.k === "tr_de" || m.k === "guided_response") && metin(m) && this.bilinmeyen(metin(m)) === 0);
    const sec: Drill[] = [];
    for (const k of ["listen_and_respond", "tr_de", "guided_response"]) { const m = uygun.find((x) => x.k === k); if (m) sec.push(m); }
    for (const m of uygun) { if (sec.length >= 4) break; if (!sec.includes(m)) sec.push(m); }
    return sec.slice(0, 4).map((m) => ({ id: `gunsonu:${gun.day}:${m.id}`, tur: "ders_madde" as AdimTuru, kip: KIP.ders_madde, kartlar: [], kaynak: "ders" as const, sn: 45,
      neden: "kendini dene: bugün öğrendiklerinle", ders: { id: GUN_SINAVI, oge: m.id } }));
  }
  private gorevGecer(de: string, haric: string[] = []): boolean { return this.bilinmeyen(de, haric) <= this.pol.gorev_bilinmeyen_max; }
  private gosterimGecer(de: string, ek: string[][] = []): boolean { return this.bilinmeyen(de, [], ek) <= this.pol.gosterim_bilinmeyen_max; }
  private cerceveMi(t: string): boolean { return kartsizMi(this.g.dizin, t); }
  private uretimeHazir(de: string): boolean { return toks(de).every((t) => !this.cerceveMi(t) || (this.cerceveGorulen.get(t) ?? 0) >= this.pol.cerceve_uretim_min); }
  /** cümlede kartın kendi sözcüğü (artikel hariç) geçiyor mu */
  private kendiSozcugu(c: string, de: string): boolean {
    const l = this.lex.get(c); if (!l) return false;
    const art = new Set(toks(l.art));
    const y = [...(this.g.dizin.yuzey.get(c) ?? [])].filter((x) => !art.has(x));
    return toks(de).some((t) => y.includes(t));
  }
  /**
   * cümlede bugünün henüz tanıtılmamış kartı geçiyor mu (gösterimde de: kullanım tanıtımdan önce gelmez).
   * Öğretilmiş bir kalıbın kapsadığı sözcük sayılmaz: "… geht nicht." kalıbı "geht"i bütün olarak öğretir (PM-080 §4).
   */
  private bugunKartiBekler(de: string, kart: ReadonlySet<string>, kaliplar: readonly (readonly string[])[]): boolean {
    const tt = toks(de);
    const ortu = new Set(kaliplar.flatMap((kp) => kalipOrtu(tt, kp)));
    const acik = tt.filter((_, i) => !ortu.has(i));
    for (const c of this.yeni) {
      if (kart.has(c)) continue;
      const art = new Set(toks(this.lex.get(c)?.art));
      const y = this.g.dizin.yuzey.get(c);
      if (y && acik.some((t) => y.has(t) && !art.has(t))) return true;
    }
    return false;
  }
  /** kalıbın kartsız sabit sözcükleri (ist, war, geht nicht…): kalıp yerleşmeden onları kullanan adım gelmez (P1-3) */
  private kalipSabit(kp: string[][]): Set<string> { return new Set(kp.flat().filter((t) => t !== YUVA && this.cerceveMi(t))); }
  /** kalıbın kartlı sözcükleri bugünün kartıysa önce tanıtılmış olmalı (K8.2: "parçaları bilinir olduğu anda") */
  private kalipParcaBilinir(kp: string[][], bekle: ReadonlySet<string> = this.yeni): boolean {
    return kp.flat().every((t) => t === YUVA || this.cerceveMi(t) || ![...(this.g.dizin.idx.get(t) ?? [])].some((i) => bekle.has(i) && !this.tanitilan.has(i)));
  }

  /** adım yerinde konabilir mi: kartları tanıtılmış, cümlesi kapıdan geçer, bekleyen kalıbın sözcüğünü kullanmıyor */
  private hazir(a: Aday, bekleyenKalip: Set<string>): boolean {
    if (a.kosul && !a.kosul()) return false;
    if (a.tur === "tanit") return true;
    if (a.tur === "kalip") return this.kalipParcaBilinir(a.kalip!, a.bekle) && this.gosterimGecer(a.cumle!, a.kalip!);
    if (a.kartlar.some((c) => this.yeni.has(c) && !this.tanitilan.has(c))) return false;
    // cümlesinde bugünün tanıtılmamış kartı geçen adım (ders maddesi, sahne gibi kartsız adımlar dahil) bekler
    const metin = [a.cumle, ...(a.satirlar ?? [])].filter((x): x is string => !!x);
    if (metin.some((de) => this.bugunKartiBekler(de, this.tanitilan, this.ogretilenKalip))) return false;
    if (bekleyenKalip.size && metin.some((de) => toks(de).some((t) => bekleyenKalip.has(t)))) return false;
    if ((a.satirlar ?? []).some((s) => !this.gosterimGecer(s))) return false;
    if (!a.cumle) return true;
    return GOSTERIM.has(a.tur) ? this.gosterimGecer(a.cumle) : this.gorevGecer(a.cumle, a.haric);
  }
  /** K5: üretim cümlesinin çerçeve sözcükleri az görüldüyse yapboz olur */
  private etkin(a: Aday): Aday {
    if (!a.cumle || !URETIM.has(a.tur) || this.uretimeHazir(a.cumle)) return a;
    return { ...a, tur: "order", neden: `${a.neden} (çerçeve sözcükleri henüz az görüldü: yapboz)` };
  }
  /** adımı plana koy: K(t), K5 ve K3 sayaçları yerinde güncellenir */
  private cik(a0: Aday, yer: string): Adim {
    const a = this.etkin(a0);
    let cumle = a.cumle;
    if (a.tur === "tanit") {
      for (const c of a.kartlar) this.tanitilan.add(c);
      cumle = (a.cumleler ?? []).find((de) => this.gosterimGecer(de));
      if (!cumle) this.gevseme.push({ kural: "gosterim", kart: a.kartlar[0], yer, not: "tanıtım cümlesi kapıdan geçmedi: cümlesiz tanıtım" });
    }
    if (a.tur === "kalip") { this.ogretilenKalip.push(...a.kalip!); for (const o of a.ders?.ogeler ?? (a.ders ? [a.ders.oge] : [])) this.kalipYerlesti.add(o); }
    const id = `${yer}:a${++this.adimNo}`;
    if (a !== a0) this.gevseme.push({ kural: "yapboz", kart: a.kartlar[0], yer, adim: id });
    for (const de of [cumle, ...(a.satirlar ?? [])]) for (const t of new Set(toks(de))) if (this.cerceveMi(t)) this.cerceveGorulen.set(t, (this.cerceveGorulen.get(t) ?? 0) + 1);
    const out: Adim = { id, tur: a.tur, kip: KIP[a.tur], kartlar: a.kartlar, kaynak: a.kaynak, sn: this.pol.adim_sn[a.tur], neden: a.neden };
    if (cumle) out.cumle = cumle;
    if (a.satirlar?.length) out.satirlar = a.satirlar;
    if (a.ders) out.ders = a.ders;
    this.say(out);
    return out;
  }
  private say(a: Adim): void {
    for (const c of a.kartlar) {
      if (!this.yeni.has(c)) continue;
      if (!KULLANIM_DISI.has(a.tur)) (this.kartTur.get(c) ?? this.kartTur.set(c, new Set()).get(c)!).add(a.tur);
      // sahne: kartın geçtiği her satır ayrı cümle (P2-1)
      for (const de of a.satirlar?.length ? a.satirlar.filter((s) => this.kendiSozcugu(c, s)) : a.cumle ? [a.cumle] : [])
        (this.kartCumle.get(c) ?? this.kartCumle.set(c, new Set()).get(c)!).add(de);
    }
  }

  /**
   * Sıralayıcı: girdi sırasındaki ilk `pencere` hazır aday arasından kısıtları bozmayanın en yükseği.
   * Puan aday başına bir kez hesaplanır (karşılaştırıcı içinde rastgele yok; V8 ve JavaScriptCore aynı planı verir, BY-2).
   * Gevşemeler burada değil, son dizi üzerinden `denetle` ile yazılır (P1-4).
   */
  private yerlestir(havuz: Aday[], yer: string, onceki: Adim[] = []): Adim[] {
    const out: Adim[] = [];
    const kalan = havuz.slice();
    const tanitimMi = (t: AdimTuru) => TANITIM.has(t);
    while (kalan.length) {
      const dizi = [...onceki, ...out];
      const son = dizi[dizi.length - 1];
      const bekleyen = this.kalipSabit(kalan.filter((a) => a.tur === "kalip").flatMap((a) => a.kalip!));
      let hazirlar = kalan.map((a, i) => ({ a, i })).filter(({ a }) => this.hazir(a, a.tur === "kalip" ? new Set() : bekleyen));
      if (!hazirlar.length) {
        // bekleyen kalıp hiç yerleşemiyorsa sıra kısıtı gevşer (kapı gevşemez)
        hazirlar = kalan.map((a, i) => ({ a, i })).filter(({ a }) => this.hazir(a, new Set()));
        if (hazirlar.length) this.gevseme.push({ kural: "kalip_sira", kart: hazirlar[0]!.a.kartlar[0], yer });
      }
      if (!hazirlar.length) {
        // kalanlar bu durakta kapıdan geçemiyor: adım düşer, rapora yazılır (İÇ cümleyi bu rapordan yazar, K4)
        for (const a of kalan) this.gevseme.push({ kural: GOSTERIM.has(a.tur) ? "gosterim" : a.tur === "kalip" ? "kalip_yer" : "cumle", kart: a.kartlar[0], yer, not: a.cumle ?? a.ders?.oge ?? a.tur });
        break;
      }
      const pencere = hazirlar.slice(0, this.pol.pencere).map((x) => ({ ...x, e: this.etkin(x.a) }));
      // son tanıtım dizisi (hemen ardından kullanım; P2-2)
      const tanitDizisi: Adim[] = [];
      for (let k = dizi.length - 1; k >= 0 && tanitimMi(dizi[k]!.tur); k--) tanitDizisi.push(dizi[k]!);
      const kullanir = (a: Aday) => tanitDizisi.some((t) => (t.tur === "tanit" ? a.kartlar.some((c) => t.kartlar.includes(c)) || (!!a.cumle && t.kartlar.some((c) => this.kendiSozcugu(c, a.cumle!))) : !!a.cumle && kalipSecenekleri(t.cumle).some((kp) => kalipOrtu(toks(a.cumle), kp).length > 0)));
      const kipSirasi: Kip[] = ["gor", "duy", "kur", "soyle"];
      const kipSon = (k: Kip) => { let n = 0; for (let j = dizi.length - 1; j >= 0 && dizi[j]!.kip === k; j--) n++; return n; };
      const tanitSon = (() => { let n = 0; for (let j = dizi.length - 1; j >= 0 && tanitimMi(dizi[j]!.tur); j--) n++; return n; })();
      const puanli = pencere.map((x) => {
        const k = KIP[x.e.tur];
        let p = -x.i * 0.05;
        if (son && kipSirasi.indexOf(k) === (kipSirasi.indexOf(son.kip) + 1) % 4) p += 1;
        if (!tanitimMi(x.e.tur) && kullanir(x.e)) p += 2;
        if (dizi.slice(-2).some((d) => x.e.kartlar.some((c) => d.kartlar.includes(c)) && !tanitimMi(d.tur))) p -= 0.5;
        for (const c of x.e.kartlar) if (this.yeni.has(c)) p += 0.25 * Math.max(0, this.pol.kelime_tur_min - (this.kartTur.get(c)?.size ?? 0)) / this.pol.kelime_tur_min;
        p += this.r() * 0.3; // tohum: yakın puanlı adaylar arasında seçim (planlar tohumla değişir)
        return { ...x, p, kip: k };
      });
      const tanitSinir = (x: (typeof puanli)[number]) => tanitimMi(x.e.tur) && tanitSon >= this.pol.tanitim_art_arda;
      const turAyni = (x: (typeof puanli)[number]) => !!son && son.tur === x.e.tur;
      const kipAsar = (x: (typeof puanli)[number]) => kipSon(x.kip) >= this.pol.kip_art_arda;
      const en = (f: (x: (typeof puanli)[number]) => boolean) => puanli.filter(f).reduce<(typeof puanli)[number] | undefined>((b, x) => (!b || x.p > b.p ? x : b), undefined);
      const sec = en((x) => !tanitSinir(x) && !turAyni(x) && !kipAsar(x)) ?? en((x) => !tanitSinir(x) && !turAyni(x)) ?? en((x) => !tanitSinir(x)) ?? puanli[0]!;
      out.push(this.cik(sec.a, yer));
      kalan.splice(sec.i, 1);
    }
    return out;
  }

  /** Son dizide kural ihlali → adım kimliğiyle gevşeme kaydı (K4). Halka durakları için. */
  private denetle(d: Adim[], yer: string): void {
    let kip = 0, tan = 0;
    d.forEach((a, i) => {
      const o = d[i - 1];
      if (o && o.tur === a.tur) this.gevseme.push({ kural: "tur", kart: a.kartlar[0], yer, adim: a.id });
      kip = o && o.kip === a.kip ? kip + 1 : 1;
      if (kip > this.pol.kip_art_arda) this.gevseme.push({ kural: "kip", kart: a.kartlar[0], yer, adim: a.id });
      tan = TANITIM.has(a.tur) ? tan + 1 : 0;
      if (tan > this.pol.tanitim_art_arda) this.gevseme.push({ kural: "tanitim", kart: a.kartlar[0], yer, adim: a.id });
      if (o && TANITIM.has(o.tur) && !TANITIM.has(a.tur) && a.tur !== "sahne" && !this.kullanir(d, i)) this.gevseme.push({ kural: "kullanim", kart: o.kartlar[0], yer, adim: a.id });
    });
  }
  /** tanıtım dizisinden sonraki adım o dizinin bir kartını ya da kalıbını kullanıyor mu */
  private kullanir(d: Adim[], i: number): boolean {
    const a = d[i]!;
    for (let k = i - 1; k >= 0 && TANITIM.has(d[k]!.tur); k--) {
      const t = d[k]!;
      if (t.tur === "tanit" && (a.kartlar.some((c) => t.kartlar.includes(c)) || (!!a.cumle && t.kartlar.some((c) => this.kendiSozcugu(c, a.cumle!))))) return true;
      if (t.tur === "kalip" && a.cumle && kalipSecenekleri(t.cumle).some((kp) => kalipOrtu(toks(a.cumle), kp).length > 0)) return true;
    }
    return false;
  }

  // ---------- K8: günün derslerini sınıfla ----------
  private sinifla(): void {
    for (const id of this.g.gun.dersler) {
      const d = this.g.dersler.get(id);
      if (!d) { this.gevseme.push({ kural: "hata", yer: `ders:${id}`, not: "ders içerikte yok: dil durağı ve eski anahtar kurulamadı" }); this.neden.push(`${id}: ders bulunamadı`); continue; }
      for (const t of d.teach) {
        if (toks(t.de).length > 1) { this.dersKalip.push({ ders: id, oge: t.id, de: t.de, yerlesti: false }); continue; }
        if (t.lexeme && this.yeni.has(t.lexeme) && !this.teachKart.has(t.lexeme)) { this.teachKart.set(t.lexeme, { ders: id, oge: t.id }); continue; }
        this.gevseme.push({ kural: "hata", kart: t.lexeme, yer: `ders:${id}`, not: `teach ${t.id} sınıflanamadı (günün kartı değil ya da ikinci tanıtım)` });
      }
      for (const m of d.drills) { const a = drillAday(id, m); if (a) this.dersMadde.push({ a, ders: id, drill: true, kullanildi: false }); }
    }
    // ders kalıbını tamamen kapsayan ilk halka kalıbına bağla (K8: bir kalıp günde bir kez tanıtılır)
    for (const k of this.dersKalip) {
      const tt = toks(k.de);
      for (const h of this.H) {
        const j = (h.kaliplar ?? []).findIndex((kp) => kalipSecenekleri(kp.de).some((s) => tamEsles(tt, s)));
        if (j < 0) continue;
        const b = this.kalipBag.get(`${h.id}#${j}`) ?? { ders: k.ders, ogeler: [] };
        b.ogeler.push(k.oge); this.kalipBag.set(`${h.id}#${j}`, b); k.yerlesti = true;
        break;
      }
    }
  }

  // ---------- tekrar (AK-2.6: FSRS vadesine göre, en gecikmiş önce) ----------
  private vadeHazirla(): void {
    const vade = (it: LearnerItem) => Math.min(...[it.passive.fsrs?.due, it.active.fsrs?.due].filter((d): d is string => !!d).map((d) => +new Date(d)));
    this.vadeli = [...this.g.items.values()]
      .filter((it) => it.kind === "lexeme" && this.g.oncekiKartlar.has(it.itemId) && vade(it) <= +this.g.simdi)
      .sort((a, b) => vade(a) - vade(b) || (a.itemId < b.itemId ? -1 : a.itemId > b.itemId ? 1 : 0)).map((it) => it.itemId);
  }
  private tekrar(yer: string): Aday | null {
    if (this.vadeSira >= this.vadeli.length) return null;
    const c = this.vadeli[this.vadeSira++]!;
    return { tur: "tekrar", kartlar: [c], kaynak: "bahce", neden: `${this.lex.get(c)?.de ?? c}: tekrar zamanı geldi (${yer})` };
  }

  // ---------- halka ----------
  private kartCumleleri(h: Halka, c: string): string[] {
    const l = this.lex.get(c);
    const gc = h.gorev_cumleleri.filter((x) => x.kart === c).map((x) => x.de);
    const ex = (l?.examples ?? []).slice().sort((a, b) => Number(!!b.ilk) - Number(!!a.ilk)).map((e) => e.de);
    return [...gc, ...ex].filter((de, i, a) => a.indexOf(de) === i && this.kendiSozcugu(c, de));
  }
  /** tohumla döndürülmüş kopya (aynı tohum aynı sıra) */
  private dondur<T>(a: T[]): T[] { if (a.length < 2) return a.slice(); const k = Math.floor(this.r() * a.length); return [...a.slice(k), ...a.slice(0, k)]; }

  private halkaHavuzu(h: Halka, hi: number, tasinan: Aday[]): { havuz: Aday[]; son: Aday[]; ertelenen: Aday[] } {
    const pol = this.pol;
    const kartlar = h.kartlar.filter((c) => {
      if (this.lex.has(c)) return true;
      this.gevseme.push({ kural: "hata", kart: c, yer: h.id, not: "kart sözlükte yok: halkadan düştü" });
      return false;
    });
    // kurulabilirlik tahmini: halkanın sonundaki K(t) (yerinde yeniden sınanır)
    const simK: Bilinen = { kart: new Set([...this.tanitilan, ...kartlar]), biten: this.g.bitenDersler, kaliplar: [...this.ogretilenKalip, ...(h.kaliplar ?? []).flatMap((k) => kalipSecenekleri(k.de))] };
    const bekler = (de: string) => this.bugunKartiBekler(de, simK.kart, simK.kaliplar!);
    const gecerSim = (de: string, haric: string[] = []) => !bekler(de) && bilinmeyenler(this.g.dizin, de, simK, haric).length <= pol.gorev_bilinmeyen_max;
    const gosterSim = (de: string) => !bekler(de) && bilinmeyenler(this.g.dizin, de, simK).length <= pol.gosterim_bilinmeyen_max;
    const birim: { tanit: Aday; kullan: Aday[] }[] = [];
    const ertelenen: Aday[] = [];
    const kullanilan = new Set<string>(), yapbozCumle = new Set<string>();
    kartlar.forEach((c, ci) => {
      const l = this.lex.get(c)!;
      const cs = this.kartCumleleri(h, c);
      const ilk = cs.find(gosterSim);
      const t = this.teachKart.get(c);
      const tanit: Aday = { tur: "tanit", kartlar: [c], cumleler: ilk ? [ilk, ...cs.filter((x) => x !== ilk)] : cs, kaynak: t ? "ders" : "halka", neden: `${l.de}: yeni kelime, hemen cümle içinde`, ...(t ? { ders: { id: t.ders, oge: t.oge } } : {}) };
      const gorev = this.dondur(cs.filter((de) => de !== ilk && gecerSim(de)));
      const secenek: Aday[] = [];
      const form = (l.forms ?? []).find((f) => gecerSim(f.de.replace(/___/g, " "), toks(f.answer.replace(/…/g, " "))));
      if (form) secenek.push({ tur: "gap", kartlar: [c], cumle: form.de.replace(/___/g, form.answer), haric: toks(form.answer.replace(/…/g, " ")), kaynak: "halka", neden: `${l.de}: cümlede boşluk` });
      const orderC = gorev.find((de) => toks(de).length >= pol.yapboz_min_sozcuk);
      if (orderC) secenek.push({ tur: "order", kartlar: [c], cumle: orderC, kaynak: "halka", neden: `${l.de}: cümleyi kur` });
      for (const t2 of turleri(l)) secenek.push({ tur: t2, kartlar: [c], kaynak: "halka", neden: `${l.de}: ${TUR_NEDEN[t2]}` });
      // üretim cümleleri: tanıtım ve yapboz cümlesinden farklı (P2-5); söyle de aday (P1-5)
      const uretim = gorev.filter((de) => de !== orderC);
      if (uretim[0]) secenek.push({ tur: "dikte", kartlar: [c], cumle: uretim[0], kaynak: "halka", neden: `${l.de}: duyduğunu yaz` });
      const soyleC = uretim[1] ?? uretim[0];
      if (soyleC) secenek.push({ tur: "soyle", kartlar: [c], cumle: soyleC, kaynak: "halka", neden: `${l.de}: sesli söyle` });
      // halka içinde 2 kullanım (biri cümleli, ikincisi başka kipte ve tanıma), üçüncüsü ertelenir (K3)
      const cumleli = secenek.filter((s) => s.cumle && s.tur !== "dikte" && s.tur !== "soyle");
      const k1 = cumleli[0] ?? secenek[0]!;
      const k2 = secenek.find((s) => s !== k1 && s.tur !== k1.tur && KIP[s.tur] !== KIP[k1.tur] && !URETIM.has(s.tur)) ?? secenek.find((s) => s !== k1 && s.tur !== k1.tur);
      const kullan = [k1, ...(k2 ? [k2] : [])];
      for (const k of kullan) if (k.cumle) { kullanilan.add(k.cumle); if (k.tur === "order") yapbozCumle.add(k.cumle); }
      const kalanTur = secenek.filter((s) => !kullan.includes(s) && !kullan.some((k) => k.tur === s.tur));
      const tercih = kalanTur.filter((s) => URETIM.has(s.tur));
      const havuz3 = tercih.length ? tercih : kalanTur;
      const k3 = havuz3.length ? havuz3[(ci + Math.floor(this.r() * havuz3.length)) % havuz3.length] : undefined;
      if (k3) ertelenen.push({ ...k3, neden: `${k3.neden} (aralıklı hatırlama: sonraki durakta)` });
      birim.push({ tanit, kullan });
    });
    // kalıp birimleri: halkanın kalıpları (TARGET3c) + bu halkada parçaları bilinir olan ders kalıpları (K8.2)
    const kalipBirim: { tanit: Aday; kullan: Aday[] }[] = [];
    const tumCumle = [...h.gorev_cumleleri.map((x) => x.de), ...kartlar.flatMap((c) => this.kartCumleleri(h, c))].filter((de, i, a) => a.indexOf(de) === i);
    const kalipKullanim = (kp: string[][], tr: string): Aday[] => {
      const dm = this.dersMadde.find((m) => !m.kullanildi && !GOSTERIM.has(m.a.tur) && m.a.cumle && kp.some((s) => tamEsles(toks(m.a.cumle), s)) && gecerSim(m.a.cumle));
      if (dm) { dm.kullanildi = true; return [{ ...dm.a, neden: `${dm.a.neden} (yeni kalıpla)` }]; }
      const uyar = (x: string) => toks(x).length >= pol.yapboz_min_sozcuk && kp.some((s) => kalipOrtu(toks(x), s).length > 0) && bilinmeyenler(this.g.dizin, x, { ...simK, kaliplar: [...simK.kaliplar!, ...kp] }).length <= pol.gorev_bilinmeyen_max;
      const de = tumCumle.find((x) => !kullanilan.has(x) && uyar(x)) ?? tumCumle.find((x) => !yapbozCumle.has(x) && uyar(x));
      if (!de) {
        if (![...kullanilan].some((x) => kp.some((s) => kalipOrtu(toks(x), s).length > 0))) this.gevseme.push({ kural: "kalip_kullanim", yer: h.id, not: tr });
        return [];
      }
      kullanilan.add(de); yapbozCumle.add(de);
      return [{ tur: "order", kartlar: kartlar.filter((c) => this.kendiSozcugu(c, de)), cumle: de, kaynak: "halka", neden: `kalıbı kullan: ${tr}` }];
    };
    (h.kaliplar ?? []).forEach((kp, j) => {
      const s = kalipSecenekleri(kp.de);
      const bag = this.kalipBag.get(`${h.id}#${j}`);
      kalipBirim.push({ tanit: { tur: "kalip", kartlar: [], cumle: kp.de, kalip: s, bekle: new Set(kartlar), kaynak: "halka", neden: `yeni kalıp: ${kp.tr}`, ...(bag ? { ders: { id: bag.ders, oge: bag.ogeler[0]!, ogeler: bag.ogeler } } : {}) }, kullan: kalipKullanim(s, kp.tr) });
    });
    for (const k of this.dersKalip.filter((x) => !x.yerlesti)) {
      const s = kalipSecenekleri(k.de);
      const parca = s.flat().every((t) => t === YUVA || this.cerceveMi(t) || ![...(this.g.dizin.idx.get(t) ?? [])].some((i) => this.yeni.has(i) && !simK.kart.has(i)));
      if (!parca || bilinmeyenler(this.g.dizin, k.de, simK).length > pol.gosterim_bilinmeyen_max + s.flat().filter((t) => t !== YUVA && this.cerceveMi(t)).length) continue;
      k.yerlesti = true;
      kalipBirim.push({ tanit: { tur: "kalip", kartlar: [], cumle: k.de, kalip: s, kaynak: "ders", ders: { id: k.ders, oge: k.oge }, neden: "kalıp: parçalarını artık biliyorsun" }, kullan: kalipKullanim(s, k.de) });
    }
    // birim sırası: her `tanitim_art_arda` kartlık öbekten sonra bir kalıp (kalıp da tanıtımdır, kural 1)
    const sira: { tanit: Aday; kullan: Aday[] }[] = [];
    for (let i = 0; i < birim.length; i += pol.tanitim_art_arda) { sira.push(...birim.slice(i, i + pol.tanitim_art_arda)); if (kalipBirim.length) sira.push(kalipBirim.shift()!); }
    sira.push(...kalipBirim);
    // havuz: birimler; önceki halkadan taşınan üçüncü kullanımlar ve vadeli tekrarlar birimlerin arasına (K3, AK-2.6)
    const kalanHalka = this.H.length - hi;
    const tekrarSay = this.vadeli.length - this.vadeSira >= kalanHalka * pol.halka_tekrar[1] ? pol.halka_tekrar[1] : Math.min(pol.halka_tekrar[0], this.vadeli.length - this.vadeSira);
    const tekrarlar: Aday[] = []; for (let i = 0; i < tekrarSay; i++) { const t = this.tekrar(h.id); if (t) tekrarlar.push(t); }
    const ara = [...tasinan, ...tekrarlar];
    const havuz: Aday[] = [];
    if (ara.length && tasinan.length) havuz.push(ara.shift()!); // önceki halkadan bir kullanım ısındırır
    const pay = Math.ceil(ara.length / Math.max(1, sira.length));
    for (const b of sira) havuz.push(b.tanit, ...b.kullan, ...ara.splice(0, pay));
    havuz.push(...ara);
    // dersin alıştırmaları (K8.3): sözcükleri bu halkada K(t) içinde olanlar; önce konuşma (P1-5)
    const dm = this.dersMadde.filter((m) => !m.kullanildi && (!m.a.cumle || gecerSim(m.a.cumle)) && (m.a.satirlar ?? []).every(gosterSim))
      .sort((a, b) => Number(b.a.tur === "soyle") - Number(a.a.tur === "soyle")).slice(0, pol.halka_ders_madde);
    for (const m of dm) { m.kullanildi = true; havuz.push({ ...m.a, neden: `${m.a.neden}: bildiğin sözcüklerle` }); }
    // halka sonu: eşleştir sondan bir önce, mini sahne en son (AK-2 kural 4–5; K6 önce ses)
    const son: Aday[] = [];
    if (kartlar.length >= pol.halka_kart[0]) son.push({ tur: "eslestir", kartlar: kartlar.slice(0, pol.halka_kart[1]), kaynak: "halka", neden: "halkanın kelimelerini anlamlarıyla eşleştir" });
    if (h.sahne) son.push({ tur: "sahne", kartlar: kartlar.filter((c) => h.sahne!.satirlar.some((s) => this.kendiSozcugu(c, s.de))), cumle: h.sahne.satirlar.map((s) => s.de).join(" "), satirlar: h.sahne.satirlar.map((s) => s.de), kaynak: "halka", neden: "kelimeler bir sahnede: önce dinle" });
    return { havuz, son, ertelenen };
  }

  private halka(h: Halka, hi: number, tasinan: Aday[]): { durak: Durak; ertelenen: Aday[] } {
    const { havuz, son, ertelenen } = this.halkaHavuzu(h, hi, tasinan);
    const adimlar = this.yerlestir(havuz, h.id);
    for (const a of son) {
      if (this.hazir(a, new Set())) adimlar.push(this.cik(a, h.id));
      else this.gevseme.push({ kural: a.tur === "sahne" ? "gosterim" : "cumle", yer: h.id, not: `${a.tur}: kapıdan geçmedi` });
    }
    this.denetle(adimlar, h.id);
    return { durak: { id: h.id, tur: "halka", seans: 0, title_tr: h.title_tr, tahmini_dk: dk(adimlar), adimlar, neden: `${hi + 1}. halka: ${h.kartlar.length} yeni kelime, kullanım ve sahne` }, ertelenen };
  }

  // ---------- dil durağı (K8): tablo + kalan alıştırmalar + diyalog + dinleme + görev; yeri K(t)'den ----------
  private dilOgeleri(id: string, d: TemelDers): DilOgesi[] {
    const o: DilOgesi[] = [];
    if (d.table) {
      const s = Math.max(0, d.table.sutunlar.findIndex((x) => /almanca|deutsch/i.test(x)));
      o.push({ ders: id, drill: false, a: { tur: "tablo", kartlar: [], satirlar: [d.table.satirlar.map((r) => r[s] ?? "").filter(Boolean).join(", ")], kaynak: "ders", ders: { id, oge: "tablo" }, neden: "tablo: kuralı bir bakışta gör" } });
    }
    o.push(...this.dersMadde.filter((m) => m.ders === id && !m.kullanildi).map((m) => { m.kullanildi = true; return { ders: id, drill: true, a: m.a }; }));
    if (d.dialogue) o.push({ ders: id, drill: false, a: { tur: "sahne", kartlar: [], cumle: d.dialogue.lines.map((l) => l.de).join(" "), satirlar: d.dialogue.lines.map((l) => l.de), kaynak: "ders", ders: { id, oge: "diyalog" }, neden: "diyalog: önce dinle" } });
    d.listening.forEach((x, i) => o.push({ ders: id, drill: false, a: { tur: "listen_meaning", kartlar: [], satirlar: x.script.map((s) => s.de), kaynak: "ders", ders: { id, oge: `dinleme:${i}` }, neden: `dinleme: ${x.title_tr}` } }));
    if (d.mission) {
      // görev ancak dersin bütün kelimeleri ve kalıpları tanıtılınca (gerçek hayatta öğretilmeyen istenmez)
      const kosul = () => d.teach.every((t) => (toks(t.de).length > 1 ? this.kalipYerlesti.has(t.id) : !t.lexeme || !this.yeni.has(t.lexeme) || this.tanitilan.has(t.lexeme)));
      o.push({ ders: id, drill: false, a: { tur: "soyle", kartlar: [], kaynak: "ders", ders: { id, oge: "gorev" }, neden: "görev: gerçek hayatta", kosul } });
    }
    return o;
  }

  private dilDuragi(id: string, parca: 0 | 1 | 2, ogeler: DilOgesi[]): Durak {
    const yer = parca ? `dil:${id}:${parca}` : `dil:${id}`;
    const adimlar: Adim[] = [];
    if (parca === 2) adimlar.push(this.cik({ tur: "hatirlat", kartlar: [], kaynak: "ders", ders: { id, oge: "hatirlatma" }, neden: "tek satırlık hatırlatma: ilk parçada ne gördün" }, yer));
    for (const o of ogeler) adimlar.push(this.cik(o.a, yer));
    const d: Durak = { id: yer, tur: "dil", seans: 0, title_tr: parca === 2 ? "Dil noktası (devam)" : "Dil noktası", tahmini_dk: dk(adimlar), adimlar, neden: parca === 1 ? "yapı: tablo ve ilk kullanım" : parca === 2 ? "yapı: kısa hatırlatma ve kullanım" : "yapı: bugünün kalıpları" };
    if (parca !== 1) d.eski_anahtar = `ders:${id}`;
    if (parca) d.parca = parca;
    return d;
  }

  // ---------- gün ----------
  plan(): GunPlani {
    const pol = this.pol, gun = this.g.gun;
    this.sinifla();
    this.vadeHazirla();
    // ısınma önce: en gecikmiş tekrarlar (AK-2.6)
    const isinmaHavuz: Aday[] = [];
    const halkaPayi = this.H.length * pol.halka_tekrar[0];
    while (this.vadeli.length - this.vadeSira > halkaPayi && (isinmaHavuz.length + 1) * pol.adim_sn.tekrar <= pol.isinma_dk * 60) isinmaHavuz.push(this.tekrar("ısınma")!);
    const isinma = isinmaHavuz.map((a) => this.cik(a, "isinma"));

    // dil öğeleri derse göre (halkalar alıştırma çektikçe azalır)
    const dilDurum = new Map<string, { parca1?: number; bitti: boolean }>();
    for (const id of gun.dersler) if (this.g.dersler.has(id)) dilDurum.set(id, { bitti: false });
    const sonra = new Map<number, Durak[]>(); // halka sırasından sonra konacak dil durakları
    const halkalar: Durak[] = [];
    let tasinan: Aday[] = [];
    this.H.forEach((h, hi) => {
      const r = this.halka(h, hi, tasinan);
      tasinan = r.ertelenen;
      halkalar.push(r.durak);
      const sonHalka = hi === this.H.length - 1;
      for (const [id, dd] of dilDurum) {
        if (dd.bitti) continue;
        const ogeler = this.dilOgeleri(id, this.g.dersler.get(id)!);
        // dilOgeleri alıştırmaları "kullanıldı" işaretler; konmayanlar geri bırakılır
        const birak = (x: DilOgesi[]) => { for (const o of x) { const m = this.dersMadde.find((y) => y.a === o.a); if (m) m.kullanildi = false; } };
        const hazir = ogeler.filter((o) => this.hazir(o.a, new Set()));
        const sure = (x: DilOgesi[]) => dk(x.map((o) => ({ sn: pol.adim_sn[o.a.tur] }) as Adim));
        const ekle = (d: Durak) => (sonra.get(hi) ?? sonra.set(hi, []).get(hi)!).push(d);
        const tumu = hazir.length === ogeler.length;
        if (dd.parca1 !== undefined) {
          // 2. parça: aralarında en az bir halka (AK-1)
          if (tumu || sonHalka) { this.dilDus(id, ogeler.filter((o) => !hazir.includes(o))); ekle(this.dilDuragi(id, 2, hazir)); dd.bitti = true; }
          else birak(ogeler);
          continue;
        }
        if (tumu && (sure(ogeler) <= pol.durak_dk[1] || sonHalka)) { ekle(this.dilDuragi(id, 0, ogeler)); dd.bitti = true; continue; }
        if (sonHalka) { this.dilDus(id, ogeler.filter((o) => !hazir.includes(o))); if (hazir.length) ekle(this.dilDuragi(id, 0, hazir)); dd.bitti = true; continue; }
        // 1. parça: hazır olanlardan, tablo + en az bir kullanımla biter; süresi yarı ya da durak üst sınırı
        const hedef = Math.min(pol.durak_dk[1], tumu ? sure(ogeler) / 2 : pol.durak_dk[1]);
        const p1: DilOgesi[] = [];
        for (const o of hazir) { if (o.a.kosul || (!o.drill && o.a.tur !== "tablo")) continue; if (p1.length && sure([...p1, o]) > hedef) break; p1.push(o); }
        while (p1.length && !p1[p1.length - 1]!.drill) p1.pop();
        if (p1.some((o) => o.drill) && sure(p1) >= pol.durak_dk[0] && hi >= 0) {
          ekle(this.dilDuragi(id, 1, p1));
          dd.parca1 = hi;
          birak(ogeler.filter((o) => !p1.includes(o)));
        } else birak(ogeler);
      }
    });
    const gunSonuEk = tasinan;

    // duraklar (K1 örnek dizi): ① ısınma · ses · h1 · (dil) ② h2 · video · h3 · (dil) ③ h4 · prova ④ h5 · okuma · gün sonu
    const sabit = (tur: DurakTuru, id: string, title: string, dkk: number, eski: string | undefined, n: string): Durak => ({ id, tur, seans: 0, title_tr: title, tahmini_dk: dkk, adimlar: [], ...(eski ? { eski_anahtar: eski } : {}), neden: n });
    const duraklar: Durak[] = [];
    if (isinma.length) duraklar.push({ ...sabit("isinma", `m1:${gun.day}:isinma`, "Isınma", dk(isinma), undefined, "dünden kalanlar: kısa tekrar"), adimlar: isinma });
    if (gun.sesler.length) duraklar.push(sabit("ses", `m1:${gun.day}:ses`, "Sesler", pol.sabit_dk.ses, undefined, "önce duy: kelimelerden önce sesleri ayırt et"));
    const v = pol.video;
    const ara: Record<number, Durak[]> = {
      1: gun.video ? [sabit("video", `video:${gun.video.id}`, "Video", Math.max(v.min_dk, Math.min(v.max_dk, Math.round((gun.video.sure_sn * v.kat) / 60))), `m1:medya:${gun.video.id}`, "gerçek insanlar konuşuyor")] : [],
      3: gun.prova ? [sabit("prova", `prova:${gun.day}`, "Konuşma provası", pol.sabit_dk.prova, `m1:prova:${gun.day}`, "bugünkü kelimelerle konuş")] : [],
      4: gun.okuma_yazma ? [sabit("okuma", `okuma:${gun.day}`, "Okuma ve yazma", pol.sabit_dk.okuma, `m1:okuma:${gun.day}`, "oku, sonra kısa yaz")] : []
    };
    const bekleyen: Durak[] = [];
    halkalar.forEach((h, hi) => {
      duraklar.push(h, ...(sonra.get(hi) ?? []));
      bekleyen.push(...(ara[hi] ?? []));
      // sabit duraklar halkadan sonra; az halkalı günde sona kalır
      if (hi < halkalar.length - 1) duraklar.push(...bekleyen.splice(0));
    });
    duraklar.push(...bekleyen.splice(0), ...Object.entries(ara).filter(([k]) => +k >= halkalar.length).flatMap(([, d]) => d));
    const gs = [...this.yerlestir(gunSonuEk, "gunsonu", halkalar.at(-1)?.adimlar ?? []), ...this.kendiniDene(gun)];
    duraklar.push({ ...sabit("gunsonu", `gunsonu:${gun.day}`, "Gün sonu", Math.max(pol.sabit_dk.gunsonu_ek, dk(gs) + pol.sabit_dk.gunsonu_ek), `m1:gun:${gun.day}`, "bugün neyi yapabiliyorsun: 4 kısa madde"), adimlar: gs });
    // son halka eski Bahçe anahtarını yazar (AK-6)
    const sonHalka = [...duraklar].reverse().find((d) => d.tur === "halka");
    if (sonHalka) sonHalka.eski_anahtar = `m1:bahce:${gun.day}`;
    for (const d of duraklar) if ((d.tur === "halka" || d.tur === "dil") && d.tahmini_dk > pol.durak_dk[1]) d.asim = true;

    // seanslar (K1): sırayla, dengeli dörde; boş seans numarası atlanmaz
    const toplam = duraklar.reduce((a, d) => a + d.tahmini_dk, 0);
    let birikim = 0;
    for (const d of duraklar) { d.seans = Math.min(4, Math.floor((birikim + d.tahmini_dk / 2) / (toplam / 4)) + 1); birikim += d.tahmini_dk; }
    const numara = [...new Set(duraklar.map((d) => d.seans))];
    for (const d of duraklar) d.seans = numara.indexOf(d.seans) + 1;

    // K3 denetimi: eksik kalan kart → neden kaydı
    for (const c of this.yeni) {
      if ((this.kartTur.get(c)?.size ?? 0) < pol.kelime_tur_min) this.gevseme.push({ kural: "kart_tur", kart: c, yer: "gün" });
      if ((this.kartCumle.get(c)?.size ?? 0) < pol.kelime_cumle_min) this.gevseme.push({ kural: "kart_cumle", kart: c, yer: "gün" });
    }
    for (const k of this.dersKalip) if (!k.yerlesti) this.gevseme.push({ kural: "kalip_yer", yer: `ders:${k.ders}`, not: `${k.oge}: hiçbir halkada parçaları bilinir olmadı` });
    this.neden.unshift(`${gun.day}. gün: ${halkalar.length} halka, ${duraklar.length} durak, ≈ ${Math.round(toplam)} dk`);
    return { gun: gun.day, surum: 1, tohum: this.g.tohum, duraklar, toplam_dk: Math.round(toplam), neden: this.neden, gevseme: this.gevseme };
  }
  private dilDus(id: string, x: DilOgesi[]): void {
    for (const o of x) this.gevseme.push({ kural: o.a.kosul ? "cumle" : GOSTERIM.has(o.a.tur) ? "gosterim" : "cumle", yer: `dil:${id}`, not: `${o.a.ders?.oge ?? o.a.tur}: gün içinde kapıdan geçmedi, düştü` });
  }
}

const TUR_NEDEN: Partial<Record<AdimTuru, string>> = {
  listen_meaning: "duy, anlamını seç", resimden_sec: "duy, resmini seç", article: "artikeli", colloc: "birlikte geldiği sözcük", tr_de: "Almancasını kur"
};
function turleri(l: Lexeme): AdimTuru[] {
  const t: AdimTuru[] = ["listen_meaning"];
  if (l.img) t.push("resimden_sec");
  if (l.pos === "noun" && l.art) t.push("article");
  if (l.collocations?.length) t.push("colloc");
  t.push("tr_de");
  return t;
}
/** Dersin alıştırması → aday (K8.3). Öğrencinin ürettiği cümle `cumle` (görev kapısı), gösterilen Almanca `satirlar` */
function drillAday(id: string, m: Drill): Aday | null {
  const ders = { id, oge: m.id };
  const kalin = (s: string) => [...s.matchAll(/\*\*([^*]+)\*\*/g)].map((x) => x[1]!);
  switch (m.k) {
    case "gap": return { tur: "gap", kartlar: [], cumle: m.de.replace(/___/g, m.accepted[0] ?? " "), kaynak: "ders", ders, neden: "dersin alıştırması: boşluğu doldur" };
    case "order": return { tur: "order", kartlar: [], cumle: m.accepted[0] ?? m.de, kaynak: "ders", ders, neden: "dersin alıştırması: cümleyi kur" };
    case "tr_de": return { tur: "tr_de", kartlar: [], cumle: m.accepted[0], kaynak: "ders", ders, neden: "dersin alıştırması: Almancasını kur" };
    case "listen_and_respond": return { tur: "soyle", kartlar: [], cumle: m.accepted[0], satirlar: [m.audio_de], kaynak: "ders", ders, neden: "dersin alıştırması: duy ve cevap ver" };
    case "guided_response": return { tur: "soyle", kartlar: [], cumle: m.accepted[0], satirlar: [m.prompt_de], kaynak: "ders", ders, neden: "dersin alıştırması: durumda cevap ver" };
    case "transform": return { tur: "ders_madde", kartlar: [], cumle: m.accepted[0], satirlar: [m.from_de], kaynak: "ders", ders, neden: "dersin alıştırması: cümleyi dönüştür" };
    case "pick": { const de = kalin(m.q_tr); return { tur: "ders_madde", kartlar: [], ...(de.length ? { satirlar: de } : {}), kaynak: "ders", ders, neden: "dersin alıştırması: doğru anlamı seç" }; }
    default: return null;
  }
}

/** cümle kalıp seçeneğiyle baştan sona eşleşiyor mu (yuva ≥ 1 sözcük) */
function tamEsles(tt: readonly string[], kp: readonly string[]): boolean {
  const es = (j: number, i: number): boolean => {
    if (i === kp.length) return j === tt.length;
    if (kp[i] === YUVA) { for (let n = 1; j + n <= tt.length; n++) if (es(j + n, i + 1)) return true; return false; }
    return j < tt.length && tt[j] === kp[i] && es(j + 1, i + 1);
  };
  return es(0, 0);
}
const dk = (a: Pick<Adim, "sn">[]) => Math.round((a.reduce((s, x) => s + x.sn, 0) / 60) * 10) / 10;
