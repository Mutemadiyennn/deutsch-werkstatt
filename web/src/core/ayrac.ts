/**
 * Yerleşim B5 (PM-079 md. 4; PM 7049695521 D): "·" ayracı satır başında ya da sonunda yalnız kalmaz.
 * Ayraç iki yanındaki sözcüğe bölünmez boşlukla bağlanır; satır ayraçta değil sözcük aralarında kırılır. Görünüm aynı.
 */
export const AYRAC = " · ";
/** Parçaları ayraçla birleştirir; boş parça atlanır: ayrac("Şikâyet", "A2") → "Şikâyet · A2" */
export const ayrac = (...parca: (string | number | false | null | undefined)[]): string => parca.filter((x) => x !== false && x != null && x !== "").join(AYRAC);
/** Hazır metindeki " · " ayraçlarını bağlar (içerikten gelen kalıp metni gibi) */
export const ayracBagla = (s: string): string => s.replace(/[ \t]+·[ \t]+/g, AYRAC);
