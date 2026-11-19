/**
 * Şölen 2 / B11b (PM-065 madde 5–7): günlük görevler, sandık, seri dondurma, "geçen haftaki sen".
 * Saf mantık (test edilir); kayıt `services/gorev.ts`.
 *
 * Pedagoji önce (PM-065, LS-13.1): görev yalnızca öğrenme eylemini ödüllendirir — ipucusuz hatırlama, yüksek doğrulukla
 * tur, üst üste doğru, dikte, odaklı süre, XP. Boş tıklama, ekranda bekleme ödüllendirilmez. Satın alma, kalp/can, ceza yok.
 * Havuz ve eşikler burada; `policy.json` gelince oraya taşınır (D-111 ile aynı not).
 */
import { yerelGun, type XpKayit } from "./gun.ts";

/** Ölçülen öğrenme eylemleri (gün başına sayaç) */
export type Olcu = "xp" | "dakika" | "bahceIpucusuz" | "tur90" | "ustuste5" | "dikteUsta";
export interface Gorev { id: string; ad: string; olcu: Olcu; hedef: number }

/** Görev havuzu: her biri bir öğrenme eylemi. `xp` ve `dakika` "emek" görevi; ötekiler "beceri" görevi. */
export const GOREV_HAVUZU: Gorev[] = [
  { id: "xp50", ad: "50 XP topla", olcu: "xp", hedef: 50 },
  { id: "dk25", ad: "25 dakika odaklan", olcu: "dakika", hedef: 25 },
  { id: "bahce10", ad: "Bahçede 10 kelimeyi ipucusuz bil", olcu: "bahceIpucusuz", hedef: 10 },
  { id: "tur90", ad: "Bahçede 2 turu %90 üstü bitir", olcu: "tur90", hedef: 2 },
  { id: "ustuste5", ad: "3 kez 5 üst üste doğru yap", olcu: "ustuste5", hedef: 3 },
  { id: "dikte3", ad: "Dikte: duyduğun 3 cümleyi doğru yaz", olcu: "dikteUsta", hedef: 3 }
];
const EMEK: Olcu[] = ["xp", "dakika"];

/** Tarihten tekrarlanabilir küçük sayı üreteci (her gün aynı üçlü değil, aynı gün hep aynı üçlü) */
function tohum(gun: string): () => number {
  let h = 2166136261;
  for (const c of gun) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h ^= h << 13; h ^= h >>> 17; h ^= h << 5; return ((h >>> 0) % 10000) / 10000; };
}

/**
 * Günün 3 görevi: 1 emek görevi (XP ya da dakika) + 2 beceri görevi. `uygun`: bugün yapılabilecek ölçüler (ör. dikte
 * içeren adım yoksa `dikteUsta` çıkmaz). Dünle aynı üçlü gelmez (mümkünse).
 */
export function gunGorevleri(gun: string, uygun: Set<Olcu> = new Set(GOREV_HAVUZU.map((g) => g.olcu))): Gorev[] {
  const sec = (gn: string) => {
    const r = tohum(gn);
    const havuz = GOREV_HAVUZU.filter((g) => uygun.has(g.olcu));
    const emek = havuz.filter((g) => EMEK.includes(g.olcu));
    const beceri = havuz.filter((g) => !EMEK.includes(g.olcu));
    const out: Gorev[] = [];
    if (emek.length) out.push(emek[Math.floor(r() * emek.length)]!);
    const b = [...beceri];
    while (out.length < 3 && b.length) out.push(b.splice(Math.floor(r() * b.length), 1)[0]!);
    const kalan = havuz.filter((g) => !out.includes(g));
    while (out.length < 3 && kalan.length) out.push(kalan.splice(Math.floor(r() * kalan.length), 1)[0]!);
    return out;
  };
  const bugun = sec(gun);
  const d = new Date(`${gun}T12:00:00`); d.setDate(d.getDate() - 1);
  const dun = new Set(sec(yerelGun(d)).map((g) => g.id));
  if (bugun.every((g) => dun.has(g.id))) return sec(`${gun}#2`);
  return bugun;
}

export interface GunSayac { sayac: Partial<Record<Olcu, number>>; sandik?: { acildi: string; odul: Odul } }
/** Görevin ilerlemesi (0..hedef) — `xp` ve `dakika` dışarıdan (XP kaydı, odak motoru) gelir */
export const ilerleme = (g: Gorev, s: GunSayac, dis: { xp: number; dakika: number }) =>
  Math.min(g.hedef, g.olcu === "xp" ? dis.xp : g.olcu === "dakika" ? dis.dakika : s.sayac[g.olcu] ?? 0);

/* ---------- Sandık ve seri dondurma ---------- */
export interface Odul { xp: number; dondurma: number }
/** Görev sandığı: 10 XP + 1 seri dondurma hakkı (en çok 2 hak birikir). Basit ve dürüst: rastgele kumar yok. */
export const SANDIK_ODUL: Odul = { xp: 10, dondurma: 1 };
/** Yol sandığı (her 3 düğümde bir): 5 XP */
export const YOL_SANDIK_XP = 5;
export const DONDURMA_EN_COK = 2;
export const sandikOdulu = (hak: number): Odul => ({ xp: SANDIK_ODUL.xp, dondurma: hak >= DONDURMA_EN_COK ? 0 : SANDIK_ODUL.dondurma });

/**
 * Seri dondurma: dün hiç çalışılmadıysa, ondan önceki gün çalışıldıysa ve hak varsa dün "dondurulmuş" sayılır (seri
 * kırılmaz). Bir kerede yalnızca bir gün kurtarılır (iki gün boşluk seriyi bitirir). Değişiklik yoksa null.
 */
export function dondurmaUygula(x: XpKayit, hak: number, now = new Date()): { x: XpKayit; hak: number; gun: string } | null {
  if (hak <= 0) return null;
  const d1 = new Date(now); d1.setDate(d1.getDate() - 1);
  const d2 = new Date(now); d2.setDate(d2.getDate() - 2);
  const dun = yerelGun(d1), once = yerelGun(d2);
  const aktif = (g: string) => (x.gunler[g] ?? 0) > 0 || !!x.dondurulan?.includes(g);
  if (aktif(dun) || !aktif(once)) return null;
  return { x: { ...x, dondurulan: [...(x.dondurulan ?? []), dun] }, hak: hak - 1, gun: dun };
}

/* ---------- "Geçen haftaki sen" (madde 7) ---------- */
export interface HaftaOzet { xp: number; dakika: number; kelime: number }
/** Son 7 gün (bugün dahil) ve ondan önceki 7 gün */
export function haftaAraliklari(now = new Date()): { bu: string[]; gecen: string[] } {
  const gunler = (bas: number) => Array.from({ length: 7 }, (_, i) => { const d = new Date(now); d.setDate(d.getDate() - bas - i); return yerelGun(d); });
  return { bu: gunler(0), gecen: gunler(7) };
}
/** Kişisel rekor: bu haftanın XP'si önceki bütün 7 günlük pencerelerin hepsinden yüksek ve en az 1 */
export function xpRekor(x: XpKayit, now = new Date()): boolean {
  const { bu } = haftaAraliklari(now);
  const topla = (g: string[]) => g.reduce((t, k) => t + (x.gunler[k] ?? 0), 0);
  const buHafta = topla(bu);
  if (buHafta <= 0) return false;
  const ilk = Object.keys(x.gunler).sort()[0];
  if (!ilk) return false;
  for (let bas = 7; ; bas += 7) {
    const pencere = Array.from({ length: 7 }, (_, i) => { const d = new Date(now); d.setDate(d.getDate() - bas - i); return yerelGun(d); });
    if (pencere[0]! < ilk) break;          // pencerenin en yeni günü bile ilk kayıttan önce
    if (topla(pencere) >= buHafta) return false;
  }
  return true;
}
