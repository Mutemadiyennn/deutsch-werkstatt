/**
 * #58 B2 kalıp kartı (saf mantık): öğrenciye görünen kalıp — kural (kurallar_tr), örnekler, slot doldurma, dönüşümler,
 * sık hata. `grammar_tr` yazar notudur, gösterilmez (OD-9).
 */
import type { Pattern } from "@dw/shared";

/** Dönüşüm etiketleri: terimsiz, öğrencinin diliyle (OD-9) */
export const DONUSUM_TR: Record<keyof Pattern["transforms"], string> = {
  question: "Soru olarak",
  negative: "Olumsuz",
  polite: "Kibarca",
  perfekt: "Geçmişte (yaptım, oldu)",
  weil: "Sebebiyle (…, weil …)",
  dass: "Aktarırken (…, dass …)",
  wenn: "Koşuluyla (Wenn …)"
};
export const DONUSUM_SIRA = Object.keys(DONUSUM_TR) as (keyof Pattern["transforms"])[];

/**
 * Slot doldurma: çerçevedeki boşluğa gelebilen öbekler dinlenebilir çipler olarak gösterilir. Cümle otomatik birleştirilmez:
 * içerikteki dolgular çerçeveye düz eklenecek biçimde yazılmamıştır ("Würden Sie bitte" + "mich zurückrufen" yanlış sıra
 * verir); yanlış Almanca göstermektense öbek tek başına ve örnek cümleler yanında gösterilir. Seçilen öbeği içeren örnekler
 * öne çıkar.
 */
export function ornekteGecer(ornek: string, dolgu: string): boolean {
  const n = (x: string) => x.toLowerCase().replace(/[„“"!?.,:;]/g, " ").replace(/\s+/g, " ").trim();
  return ` ${n(ornek)} `.includes(` ${n(dolgu)} `);
}

/** Liste sırası: önce temel kalıplar, sonra seviye (A1 → B1), sonra çerçeve */
export function kalipSirasi<T extends Pick<Pattern, "core" | "level" | "frame">>(ps: T[]): T[] {
  const sv = (l: string) => ["A1", "A2", "B1", "B2"].indexOf(l);
  return [...ps].sort((a, b) => Number(b.core) - Number(a.core) || sv(a.level) - sv(b.level) || a.frame.localeCompare(b.frame, "de"));
}
