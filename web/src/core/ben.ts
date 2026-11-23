/**
 * Ben (Hedef 3, PM-084 md. 5; hedef design/TARGET3 "Ben"): "Ne kazandım". Saf hesaplar; ekran `screens/Ben.tsx`.
 * Yapabildiklerim: içinde bulunulan haftanın günlerinin `can_do` cümleleri; her birinde üç nokta (OGRETIM_DONGUSU OD-8):
 *   1. anlıyorum (K1–K2): günün kartlarının en az `nokta_oran`'ı iki ayrı günde tanınmış;
 *   2. söyleyebiliyorum (K3): aynı oran iki ayrı oturumda (≥ 3 sa arayla) doğru üretilmiş (`durable`);
 *   3. kendiliğimden kullanıyorum (K4–K5): serbest üretim kanıtı (karakter sohbeti, sesli günlük) cihazda henüz
 *      tutulmuyor; kanıt olmadan nokta dolmaz (elle doldurma yok).
 * Bu hafta: yolun bu haftasının gerçek sayıları; hepsi sıfırsa tek dürüst cümle.
 */
import type { LearnerItem } from "@dw/shared";
import POLICY from "../policy.json" with { type: "json" };

export const HAFTA_GUN = 7;
export const haftaNo = (gun: number) => Math.max(1, Math.ceil(gun / HAFTA_GUN));
/** Haftanın gün aralığı (1. hafta: 1–7) */
export const haftaGunleri = (hafta: number) => Array.from({ length: HAFTA_GUN }, (_, i) => (hafta - 1) * HAFTA_GUN + i + 1);

const yerelGun = (iso?: string) => (iso ? new Date(iso).toLocaleDateString("sv-SE") : null);
/** K1–K2: tanıma iki ayrı günde (ilk değerlendirme günü ≠ son doğru tanıma günü) ya da üretimde kalıcı */
export const tanidi = (it: LearnerItem | undefined) =>
  !!it && (it.durable || (it.passive.ok >= 2 && !!yerelGun(it.firstAt?.passive) && yerelGun(it.firstAt?.passive) !== yerelGun(it.passive.last)));
/** K3: iki ayrı oturumda doğru üretim (srs.ts `durable`, ≥ 3 sa arayla) */
export const soyledi = (it: LearnerItem | undefined) => !!it?.durable;

export type Noktalar = [boolean, boolean, boolean];
/** Günün kartlarından üç nokta; kart yoksa (öğretilecek kart tanımsız) hepsi boş */
export function noktalar(kartlar: readonly string[], items: ReadonlyMap<string, LearnerItem>, oran = POLICY.ben.nokta_oran): Noktalar {
  if (!kartlar.length) return [false, false, false];
  const pay = (f: (it: LearnerItem | undefined) => boolean) => kartlar.filter((k) => f(items.get(k))).length / kartlar.length >= oran;
  const s = pay(soyledi);
  return [s || pay(tanidi), s, false];
}

export interface HaftaSayi { kalici: number; gun: number; kayit: number }
/** "Bu hafta" kartı: yolun bu haftasındaki kalıcı kart, biten gün, dinlenen/izlenen kayıt */
export function haftaSayilari(v: { kartlar: readonly string[]; items: ReadonlyMap<string, LearnerItem>; bitenGun: number; medya: readonly string[]; medyaBitti: ReadonlySet<string> }): HaftaSayi {
  return { kalici: new Set(v.kartlar.filter((k) => soyledi(v.items.get(k)))).size, gun: v.bitenGun, kayit: v.medya.filter((m) => v.medyaBitti.has(m)).length };
}
/** Bu hafta cümlesi: yalnız sıfır olmayanlar; hiçbiri yoksa dürüst tek cümle (uydurma sayı, "0" yığını yok) */
export function haftaCumlesi(s: HaftaSayi): string {
  const p: string[] = [];
  if (s.kalici) p.push(`${s.kalici} kelime kalıcı oldu.`);
  if (s.gun) p.push(`${s.gun} günü bitirdin.`);
  if (s.kayit) p.push(`${s.kayit} kaydı dinledin.`);
  return p.length ? p.join(" ") : "İlk günün bitince burada göreceksin.";
}
/** Başlığın alt satırı: "A1 yolunun 1. haftasındasın." */
export const haftaSatiri = (seviye: string | null, hafta: number) => `${seviye ? `${seviye} yolunun` : "Yolun"} ${hafta}. haftasındasın.`;
/** Kelime haritam: tanınan kelime sayısı (en az bir doğru tanıma) */
export const taninanKelime = (items: Iterable<LearnerItem>) => [...items].filter((i) => i.kind === "lexeme" && i.passive.ok > 0).length;
