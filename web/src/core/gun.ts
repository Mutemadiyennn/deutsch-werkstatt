/**
 * M1 ders yolu ve günlük plan (#58 A5b). Saf fonksiyonlar; ekranlar `screens/Yol.tsx` ve Bugün.
 * Her gün aynı iskelet (#58 "Öğrencinin bir günü"):
 *   Seans 1 Kelime Bahçesi (tekrar + günün yeni kartları) → Seans 2 günün temel dersi → Seans 3 video + sesler
 *   → Seans 4 konuşma provası + okuma/yazma (A7/A8 gelene kadar "hazırlanıyor"; günün bitişini engellemez).
 * Tamamlanan adım yeniden önerilmez; sıradaki adım her zaman tek ve açıktır. Seviye XP ile değil kanıtla atlanır.
 */
import type { Gun } from "@dw/shared";
import { medyalar } from "@dw/shared";

export type SeansNo = 1 | 2 | 3 | 4;
/** `alt`: medya adımında kayıt türü (video / ses) — yol düğümünün simgesi ayrışsın (#104 PM notu 4) */
/** Yol ve Bugün'deki adım başlıkları düz metindir: içerikteki **kalın** işareti ekrana yıldızla çıkmaz (D-092; KAPI 7059696028) */
const isaretsiz = (t: string) => t.replace(/\*\*(.+?)\*\*/g, "$1");

export interface Adim { seans: SeansNo; tur: "bahce" | "ders" | "medya" | "prova" | "okuma"; id: string; title_tr: string; href: string; bitti: boolean; hazir: boolean; alt?: "video" | "ses" }
export interface GunDurum { day: number; title_tr: string; adimlar: Adim[]; bitti: boolean }
/** Cihazda saklanan ilerlemeden okunanlar (meta anahtarları ekranda doldurulur) */
export interface Ilerleme {
  dersBitti: Set<string>; medyaBitti: Set<string>;
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

export function gunAdimlari(g: Gun, ilr: Ilerleme, temelBasliklari: Record<string, string> = {}): GunDurum {
  const a: Adim[] = [];
  const bahceBitti = ilr.bahceBitti.has(g.day);
  const kalan = bahceBitti ? 0 : g.yeni_kartlar.filter((id) => (!ilr.kartlar || ilr.kartlar.has(id)) && !ilr.tanitilan?.has(id)).length;
  a.push({ seans: 1, tur: "bahce", id: `bahce:${g.day}`, title_tr: kalan ? `${kalan} yeni kelime ve tekrar` : "Kelime tekrarı", href: `#/garden/${g.day}`, bitti: bahceBitti, hazir: true });
  for (const d of g.dersler) a.push({ seans: 2, tur: "ders", id: d, title_tr: temelBasliklari[d] ?? "Temel ders", href: `#/ders/${encodeURIComponent(d)}`, bitti: ilr.dersBitti.has(d), hazir: d in temelBasliklari });
  for (const m of medyalar(g)) if (m.kind !== "sahne") a.push({ seans: 3, tur: "medya", alt: m.kind === "video" ? "video" : "ses", id: m.id, title_tr: isaretsiz(m.title_tr), href: `#/m1/${g.day}/${encodeURIComponent(m.id)}`, bitti: ilr.medyaBitti.has(m.id), hazir: true });
  if (g.prova) a.push({ seans: 4, tur: "prova", id: `prova:${g.day}`, title_tr: isaretsiz(g.prova.title_tr), href: `#/prova/${g.day}`, bitti: !!ilr.provaBitti?.has(g.day), hazir: true });
  if (g.okuma_yazma) a.push({ seans: 4, tur: "okuma", id: `okuma:${g.day}`, title_tr: isaretsiz(g.okuma_yazma.title_tr), href: `#/okuma/${g.day}`, bitti: !!ilr.okumaBitti?.has(g.day), hazir: true });
  // gün, hazır olan bütün adımlar bitince biter (hazırlanmakta olan adım öğrenciyi bekletmez)
  const bitti = !!ilr.gunBitti?.has(g.day) || a.filter((x) => x.hazir).every((x) => x.bitti);
  return { day: g.day, title_tr: isaretsiz(g.title_tr), adimlar: a, bitti };
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

/** Sıradaki adım: şu anki günün ilk hazır ve bitmemiş adımı (seans sırasıyla) */
export function siradaki(g: GunDurum | null): Adim | null {
  return g?.adimlar.find((x) => x.hazir && !x.bitti) ?? null;
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
