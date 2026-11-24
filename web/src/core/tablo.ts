/**
 * Dil noktası tablosu telefonda (PM 7059008858 md. 1): 4 sütundan genişse "sabit sütunlar + seçilen bir sütun" olarak gösterilir.
 * Sabit sütunlar baştaki tanım sütunlarıdır (Kim, Türkçe, Rakam, Harf, Tarih, Saat); yoksa ilk sütun. Öteki sütunlar seçicide.
 */
const TANIM = /^(kim|türkçe|rakam|harf|tarih|saat)$/i;
export const TABLO_EN_COK = 4;

export interface TabloBolum { sabit: number[]; secilebilir: number[] }

export function tabloBol(sutunlar: readonly string[]): TabloBolum | null {
  if (sutunlar.length <= TABLO_EN_COK) return null;
  const sabit: number[] = [];
  for (let i = 0; i < sutunlar.length && TANIM.test(sutunlar[i]!.trim()); i++) sabit.push(i);
  if (!sabit.length) sabit.push(0);
  const secilebilir = sutunlar.map((_, i) => i).filter((i) => !sabit.includes(i));
  return secilebilir.length ? { sabit, secilebilir } : null;
}

/** hücrenin dili: başlığı "Türkçe" olan sütun Türkçe, ötekiler Almanca (başlıklar Türkçe) */
export const hucreDili = (baslik: string) => (/^türkçe$/i.test(baslik.trim()) ? "tr" : "de");

/**
 * Dil noktası tablosu sık mı (inceleme #231 P1-1): 5+ sütun ya da 4 sütunda en uzun sözcüklerin toplamı ≥ 40 harf. Sık tablo daha küçük
 * yazı ve dar hücre boşluğuyla çizilir; böylece bölünmeden (sütun seçicisiz) 390 pt'ye sığar.
 */
export function sikTablo(sutunlar: readonly string[], satirlar: readonly (readonly string[])[], goster: readonly number[]): boolean {
  if (goster.length >= 5) return true;
  if (goster.length < 4) return false;
  const enUzun = (i: number) => Math.max(0, ...[sutunlar[i] ?? "", ...satirlar.map((r) => r[i] ?? "")].flatMap((c) => c.split(/\s+/)).map((w) => w.length));
  return goster.reduce((a, i) => a + enUzun(i), 0) >= 40;
}
