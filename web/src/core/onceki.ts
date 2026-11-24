/**
 * Önceki günlerin bilinen kümesi K(t) (PM-092 md. 3.2, PM-100 md. 2). Saf: dosya ve depo okumaz.
 *  - Önceki günün dosyası pakette VARSA: ölçü öğrencinin gerçekten gördüğüdür — cihazda görülmüş kart (`gorulmus`) ve biten ders
 *    (`bitenDosyali`: `ders:<id>` kaydı ya da gün bitmişse o günün dersleri; çağıran hesaplar).
 *  - Dosya YOKSA (paralel yazım, sınama): o günün kartları ve dersleri kesin tablodan (doğrulayıcı ve hafta kapısıyla aynı kaynak).
 *  - `hepsiOynandi` (yalnız e2e sınaması): dosyalı günlerin kartları da görülmüş sayılır (29. gün baştan oynatılırken 1.–28. gün
 *    oynanmış öğrenci).
 */
export interface KesinGun { kartlar: readonly string[]; dersler: readonly string[] }
export interface OncekiGirdi {
  day: number;
  /** paketteki gün dosyaları (index.m1): gün ve kartları */
  dosyali: readonly { day: number; kartlar: readonly string[] }[];
  kesin: ReadonlyMap<number, KesinGun>;
  gorulmus: (kart: string) => boolean;
  /** dosyalı önceki günlerin cihazda biten dersleri */
  bitenDosyali: Iterable<string>;
  hepsiOynandi?: boolean;
  /** PM-114 B: başlangıçtan önceki atlanan günler — bilinen sayılır: dosyalı gün kartlarının hepsi, dersler kesin tablodan */
  atlanan?: ReadonlySet<number>;
}
export interface OncekiKume { kartlar: Set<string>; dersler: Set<string>; /** kesin tablodan tamamlanan günler (rapor ve test için) */ tablodan: number[] }

export function oncekiKume(g: OncekiGirdi): OncekiKume {
  const dosya = new Map(g.dosyali.filter((x) => x.day < g.day).map((x) => [x.day, x.kartlar] as const));
  const kartlar = new Set<string>(), dersler = new Set<string>(g.bitenDosyali), tablodan: number[] = [];
  for (const [d, k] of dosya) for (const c of k) if (g.hepsiOynandi || g.atlanan?.has(d) || g.gorulmus(c)) kartlar.add(c);
  for (let d = 1; d < g.day; d++) {
    if (dosya.has(d)) { if (g.atlanan?.has(d)) for (const x of g.kesin.get(d)?.dersler ?? []) dersler.add(x); continue; }
    const t = g.kesin.get(d); if (!t) continue;
    tablodan.push(d);
    for (const c of t.kartlar) kartlar.add(c);
    for (const x of t.dersler) dersler.add(x);
  }
  return { kartlar, dersler, tablodan };
}

/** akış kaydında dersin dil durağı bitmiş mi: tek parçalı durak ya da 2. parça (`dil:<id>`, `dil:<id>:2`) `biten` listesinde.
 *  1. parça yetmez (dersin kalanı henüz sunulmadı); yarıda kalan durak bitmiş sayılmaz. */
export const akisDersBitti = (k: { biten: readonly string[] }, id: string): boolean => k.biten.includes(`dil:${id}`) || k.biten.includes(`dil:${id}:2`);
