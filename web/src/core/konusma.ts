/**
 * PM-148 karar 3–4: konuşma kaydı. Bir adım yalnız mikrofonla yapılınca "konuşuldu" sayılır; yazarak geçilen adım ayrı tutulur.
 * Kayıt günlüktür (`konusma:<YYYY-MM-DD>`, yerel tarih); aynı adım bir günde bir kez sayılır, son sonuç geçerlidir. Saf parçalar.
 */
import { localDate } from "./focus.ts";

export interface KonusmaKaydi { tarih: string; adimlar: { id: string; gun: number; sesli: boolean }[] }
export const konusmaAnahtar = (ms: number) => `konusma:${localDate(ms)}`;

export function konusmaEkle(k: KonusmaKaydi | undefined, ms: number, adim: { id: string; gun: number; sesli: boolean }): KonusmaKaydi {
  const tarih = localDate(ms);
  const once = k && k.tarih === tarih ? k.adimlar.filter((a) => a.id !== adim.id) : [];
  return { tarih, adimlar: [...once, adim] };
}
/** bugünün sayısı: sesli (konuşuldu) ve yazılı (konuşma sayılmaz) */
export function konusmaSay(k: KonusmaKaydi | undefined, ms: number): { sesli: number; yazili: number } {
  if (!k || k.tarih !== localDate(ms)) return { sesli: 0, yazili: 0 };
  const sesli = k.adimlar.filter((a) => a.sesli).length;
  return { sesli, yazili: k.adimlar.length - sesli };
}
