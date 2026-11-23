/**
 * M1 ders yolu ve günlük plan (#58 A5b). Saf fonksiyonlar; ekranlar `screens/Yol.tsx` ve Bugün.
 * Her gün aynı iskelet (#58 "Öğrencinin bir günü"):
 *   Seans 1 Kelime Bahçesi (tekrar + günün yeni kartları) → Seans 2 günün temel dersi → Seans 3 video + sesler
 *   → Seans 4 konuşma provası + okuma/yazma (A7/A8 gelene kadar "hazırlanıyor"; günün bitişini engellemez).
 * Tamamlanan adım yeniden önerilmez; sıradaki adım her zaman tek ve açıktır. Seviye XP ile değil kanıtla atlanır.
 */
import type { Gun } from "@dw/shared";
import { medyalar } from "@dw/shared";
import POLICY from "../policy.json" with { type: "json" };

export type SeansNo = 1 | 2 | 3 | 4;
/** `alt`: medya adımında kayıt türü (video / ses) — yol düğümünün simgesi ayrışsın (#104 PM notu 4) */
/** Yol ve Bugün'deki adım başlıkları düz metindir: içerikteki **kalın** işareti ekrana yıldızla çıkmaz (D-092; KAPI 7059696028) */
const isaretsiz = (t: string) => t.replace(/\*\*(.+?)\*\*/g, "$1");

export interface Adim { seans: SeansNo; tur: "bahce" | "ders" | "medya" | "prova" | "okuma"; id: string; title_tr: string; href: string; bitti: boolean; hazir: boolean; alt?: "video" | "ses" }
/** `akis`: bayraklı günde akış bitmeden "BAŞLA" bu adrese gider (akış durakları sırayla açar; öğrenci simülasyonu P1-1) */
export interface GunDurum { day: number; title_tr: string; adimlar: Adim[]; bitti: boolean; akis?: string }
/** Cihazda saklanan ilerlemeden okunanlar (meta anahtarları ekranda doldurulur) */
export interface Ilerleme {
  dersBitti: Set<string>; medyaBitti: Set<string>;
  /** akış (AKIS) kaydı olan günler (`akis:<gün>`; AK-6): bayraklı günde akış başladıysa gün akışla biter */
  akisBasladi?: Set<number>;
  /** Seans 4 konuşma provası bitti (m1:prova:<gün>, A7) */
  provaBitti?: Set<number>;
  /** Seans 4 okuma/yazma bitti (m1:okuma:<gün>, A8) */
  okumaBitti?: Set<number>;
  /** Seans 1 bitti: Bahçe, günün ve önceki günlerin bütün yeni kartları tanıtılınca yazar (tur sayısına değil kanıta bağlı) */
  bahceBitti: Set<number>;
  /** kalıcı gün bitişi: sonradan hazır olan adım (A7/A8) biten günü geriye dönük açmaz */
  gunBitti?: Set<number>;
  /** cihazda kaydı olan (tanıtılmış) kart kimlikleri — Seans 1 kartındaki "kalan yeni kelime" sayısı */
  tanitilan?: Set<string>;
  /** Bahçe'ye kart olarak giren kimlikler (sayı, parçacık, zamir kart değildir); verilmezse hepsi sayılır */
  kartlar?: Set<string>;
}

export const SEANS_TR: Record<SeansNo, string> = { 1: "Kelime Bahçesi", 2: "Temel ders", 3: "Video ve sesler", 4: "Konuşma provası" };
export const bahceAnahtari = (day: number) => `m1:bahce:${day}`;
/** Adımın etiketi: seansın adı; Seans 4'te okuma/yazma kendi adıyla */
export const adimAdi = (a: Pick<Adim, "seans" | "tur">) => (a.tur === "okuma" ? "Okuma ve yazma" : SEANS_TR[a.seans]);

/** Akış bayrağı: gün listesi ya da "hepsi" (halkası olan her gün; PM-090 md. 3 "akışın bütün günlere açılması") */
export type AkisGunleri = readonly number[] | "hepsi";
/** Politikadaki değer: dizi ya da "hepsi"; başka her şey kapalı sayılır (bozuk politika akışı açmaz) */
export const akisGunleriOku = (x: unknown): AkisGunleri | null =>
  x === "hepsi" ? "hepsi" : Array.isArray(x) && x.every((n) => Number.isInteger(n)) ? (x as number[]) : null;
/** Gün bayraklı mı */
export const bayrakli = (day: number, gunler: AkisGunleri = bayrakliGunler()): boolean => gunler === "hepsi" || gunler.includes(day);
/** Bayraklı günler (`policy.akis.gunler`). Yalnız e2e paketinde `sessionStorage["e2e-akis-gunler"]` (JSON: dizi ya da "hepsi") geçersiz kılar:
 *  testler bayrağın varsayılanına yaslanmaz (tests/e2e/common.py taban değeri yazar); üretimde okunmaz */
export function bayrakliGunler(): AkisGunleri {
  if (import.meta.env.MODE === "e2e") { try { const x = akisGunleriOku(JSON.parse(sessionStorage.getItem("e2e-akis-gunler") ?? "null")); if (x) return x; } catch { /* geçersiz: policy */ } }
  return akisGunleriOku(POLICY.akis.gunler) ?? [];
}
/** AKIS AK-6 pilot bayrağı (`policy.akis.gunler`): halkası olan bayraklı gün akışla açılır; eski düzenle başlanmış gün eski düzenle biter */
export function akisAcik(g: Gun, ilr: Ilerleme, gunler: AkisGunleri = bayrakliGunler()): boolean {
  if (!bayrakli(g.day, gunler) || !g.halkalar?.length) return false;
  if (ilr.akisBasladi?.has(g.day)) return true;
  return !ilr.bahceBitti.has(g.day) && !g.dersler.some((d) => ilr.dersBitti.has(d));
}

export function gunAdimlari(g: Gun, ilr: Ilerleme, temelBasliklari: Record<string, string> = {}, akisGunler: AkisGunleri = bayrakliGunler()): GunDurum {
  const a: Adim[] = [];
  const bahceBitti = ilr.bahceBitti.has(g.day);
  const kalan = bahceBitti ? 0 : g.yeni_kartlar.filter((id) => (!ilr.kartlar || ilr.kartlar.has(id)) && !ilr.tanitilan?.has(id)).length;
  a.push({ seans: 1, tur: "bahce", id: `bahce:${g.day}`, title_tr: kalan ? `${kalan} yeni kelime ve tekrar` : "Kelime tekrarı", href: `#/garden/${g.day}`, bitti: bahceBitti, hazir: true });
  const akisGunu = akisAcik(g, ilr, akisGunler);
  // dil noktası (gr:/dn:) ders ekranında açılmaz, akışın durağıdır (#231 takibi): akış günündeyse hazır ve akışa gider; değilse hazırlanıyor
  for (const d of g.dersler) a.push(/^(gr|dn):/.test(d)
    ? { seans: 2, tur: "ders", id: d, title_tr: "Dil noktası", href: `#/akis/${g.day}`, bitti: ilr.dersBitti.has(d), hazir: akisGunu }
    : { seans: 2, tur: "ders", id: d, title_tr: temelBasliklari[d] ?? "Temel ders", href: `#/ders/${encodeURIComponent(d)}`, bitti: ilr.dersBitti.has(d), hazir: d in temelBasliklari });
  for (const m of medyalar(g)) if (m.kind !== "sahne") a.push({ seans: 3, tur: "medya", alt: m.kind === "video" ? "video" : "ses", id: m.id, title_tr: isaretsiz(m.title_tr), href: `#/m1/${g.day}/${encodeURIComponent(m.id)}`, bitti: ilr.medyaBitti.has(m.id), hazir: true });
  if (g.prova) a.push({ seans: 4, tur: "prova", id: `prova:${g.day}`, title_tr: isaretsiz(g.prova.title_tr), href: `#/prova/${g.day}`, bitti: !!ilr.provaBitti?.has(g.day), hazir: true });
  if (g.okuma_yazma) a.push({ seans: 4, tur: "okuma", id: `okuma:${g.day}`, title_tr: isaretsiz(g.okuma_yazma.title_tr), href: `#/okuma/${g.day}`, bitti: !!ilr.okumaBitti?.has(g.day), hazir: true });
  // akış günü: Bahçe adımı akış ekranından; ders, prova, okuma ve medya kendi ekranlarında (inceleme #184 Y-3) (eski anahtarlar akış durak bitince yazılır; Yol ve Bugün aynen okur)
  // prova, okuma ve medya kendi ekranlarında kalır: akışta "şimdi geç" denen durağa Yol'dan yine ulaşılır (inceleme #184 P1-2)
  const akis = akisGunu;
  if (akis) for (const x of a) if (x.tur === "bahce") x.href = `#/akis/${g.day}`;
  // gün, hazır olan bütün adımlar bitince biter (hazırlanmakta olan adım öğrenciyi bekletmez)
  const bitti = !!ilr.gunBitti?.has(g.day) || a.filter((x) => x.hazir).every((x) => x.bitti);
  return { day: g.day, title_tr: isaretsiz(g.title_tr), adimlar: a, bitti, ...(akis && !bitti ? { akis: `#/akis/${g.day}` } : {}) };
}

/** Yol: günler sırayla; şu anki gün = ilk bitmemiş gün. Sonraki günler kilitli (bir önceki bitmeden açılmaz). */
export function yol(gunler: GunDurum[]): { gunler: (GunDurum & { durum: "bitti" | "simdi" | "kilitli" })[]; simdi: GunDurum | null } {
  const sirali = [...gunler].sort((a, b) => a.day - b.day);
  const i = sirali.findIndex((g) => !g.bitti);
  return {
    gunler: sirali.map((g, k) => ({ ...g, durum: i < 0 || k < i ? "bitti" : k === i ? "simdi" : "kilitli" })),
    simdi: i < 0 ? null : sirali[i]!
  };
}

/* ---------- çok haftalı yol (PR B-3; PR B 7087645415 md. 1–4) ---------- */
/** Gün sınırı (yıl): 364. günden sonrası paketten gelse de yola girmez */
export const GUN_SINIR = 364;
/** Hafta = ⌈gün / 7⌉ */
export const haftaOf = (day: number) => Math.ceil(day / 7);
/** Haftanın son günü (hafta sonu düğümü, kupa) */
export const haftaSonuMu = (day: number) => day % 7 === 0;
/** Yolda gösterilen günler: 1…364, sıralı, tekil */
export const yolGunleri = (days: number[]) => [...new Set(days.filter((d) => Number.isInteger(d) && d >= 1 && d <= GUN_SINIR))].sort((a, b) => a - b);
/**
 * Açılışta yüklenecek hafta: kalıcı gün bitişi (`m1:gun:<g>`) olmayan ilk günün haftası; hepsi bittiyse son hafta.
 * Önceki haftaların dosyaları yüklenmez (md. 3; yükleme bütçesi).
 */
export function yuklenecekHafta(days: number[], gunBitti: ReadonlySet<number>): number | null {
  const g = yolGunleri(days);
  if (!g.length) return null;
  const ilk = g.find((d) => !gunBitti.has(d));
  return haftaOf(ilk ?? g[g.length - 1]!);
}
/**
 * Gün kilidi (md. 4): gün, kendinden önceki bütün günler kalıcı olarak bitmişse açıktır (sıra; atlama yok). Pakette olmayan ya da
 * sınır dışındaki gün kilitli sayılmaz (ekran "henüz hazır değil" der). Adresle elle açılan kilitli gün bu kuralla kapanır.
 */
export function gunKilitli(day: number, days: number[], gunBitti: ReadonlySet<number>): boolean {
  const g = yolGunleri(days);
  if (!g.includes(day)) return false;
  return g.some((d) => d < day && !gunBitti.has(d));
}
/** Hafta sonu testi açık mı: haftanın paketteki bütün günleri kalıcı olarak bitmiş (en az bir gün) */
export function haftaBitti(hafta: number, days: number[], gunBitti: ReadonlySet<number>): boolean {
  const g = yolGunleri(days).filter((d) => haftaOf(d) === hafta);
  return g.length > 0 && g.every((d) => gunBitti.has(d));
}
/** Yolda yüklenmemiş günün yerine geçen özet (önceki hafta: bitti; sonraki hafta: kilitli). Adımı yoktur. */
export const gunOzeti = (day: number, title_tr: string, bitti: boolean): GunDurum => ({ day, title_tr: isaretsiz(title_tr), adimlar: [], bitti });
/** Haftalara böl: her haftanın günleri ve durumu (`simdi`: şimdiki günün haftası) */
export function haftalara<T extends { day: number; durum: "bitti" | "simdi" | "kilitli" }>(gunler: T[]): { hafta: number; gunler: T[]; durum: "bitti" | "simdi" | "kilitli" }[] {
  const m = new Map<number, T[]>();
  for (const g of gunler) { const h = haftaOf(g.day); m.set(h, [...(m.get(h) ?? []), g]); }
  return [...m.entries()].sort((a, b) => a[0] - b[0]).map(([hafta, gs]) => ({ hafta, gunler: gs,
    durum: gs.some((g) => g.durum === "simdi") ? "simdi" : gs.every((g) => g.durum === "bitti") ? "bitti" : "kilitli" }));
}

/** Sıradaki adım: şu anki günün ilk hazır ve bitmemiş adımı (seans sırasıyla) */
export function siradaki(g: GunDurum | null): Adim | null {
  const x = g?.adimlar.find((y) => y.hazir && !y.bitti) ?? null;
  // akış günü: Bahçe bitince BAŞLA eski derse değil akışa döner; akış ders, ses, video, prova ve okuma duraklarını kendisi açar
  // (öğrenci simülasyonu 1. gün P1-1). Yol düğümleri kendi ekranlarında kalır (inceleme #184 Y-3)
  return x && g?.akis ? { ...x, href: g.akis } : x;
}

/* ---------- XP ve seri (motivasyon; seviye kanıtla atlanır, XP ile değil) ---------- */
/** `dondurulan`: seri dondurma hakkıyla kurtarılan günler (B11b; XP yok ama seri kırılmaz) */
export interface XpKayit { toplam: number; gunler: Record<string, number>; dondurulan?: string[] }
export const XP_BOS: XpKayit = { toplam: 0, gunler: {} };
/** `bilinen`: "Biliyorum, sına beni" üretimle kanıtlanan yeni kart (tanımadan fazla; PM-066 madde 5) */
export const XP = { dogru: 2, bilinen: 4, adim: 10 } as const;
export const yerelGun = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export function xpEkle(x: XpKayit, n: number, now = new Date()): XpKayit {
  const g = yerelGun(now);
  return { toplam: x.toplam + n, gunler: { ...x.gunler, [g]: (x.gunler[g] ?? 0) + n } };
}
/** Seri: bugünden (bugün henüz çalışılmadıysa dünden) geriye kesintisiz çalışılan gün sayısı */
export function seri(x: XpKayit, now = new Date()): number {
  const aktif = (g: string) => (x.gunler[g] ?? 0) > 0 || !!x.dondurulan?.includes(g);
  const d = new Date(now);
  if (!aktif(yerelGun(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  // dondurulan gün seriyi taşır ama sayıyı artırmaz
  while (aktif(yerelGun(d))) { if ((x.gunler[yerelGun(d)] ?? 0) > 0) n++; d.setDate(d.getDate() - 1); }
  return n;
}
