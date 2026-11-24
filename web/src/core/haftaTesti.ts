/**
 * Hafta sonu testinin düşük sonuç yolu (#243 PM finali takip a). Saf, yapay zekâsız.
 *  - `zayiflar`: yanlış maddesi olan "yapabiliyorum" cümleleri (gün sırasıyla), her biri kendi doğru/toplam sayısıyla.
 *  - `tekrarMaddeleri`: zayıf günün kendi gün sınavından kısa tekrar turu (her türden biri; gün sınavı haftanın içinde çözüldü,
 *    test maddesi tekrar edilmez: tekrar, testin aynısı değil o cümlenin günündeki alıştırmadır).
 * Test öğrenciyi kilitlemez; sonuç cümlesi yalnız policy `hafta_testi.gecme_orani` ile seçilir.
 */
import type { Drill } from "@dw/shared";

export interface BeceriBag { gun: number; id: string; tr: string; maddeler: string[] }
export interface Zayif { gun: number; id: string; tr: string; dogru: number; toplam: number }

export function zayiflar(beceriler: readonly BeceriBag[], yanlis: ReadonlySet<string>): Zayif[] {
  return beceriler
    .map((b) => ({ gun: b.gun, id: b.id, tr: b.tr, toplam: b.maddeler.length, dogru: b.maddeler.filter((m) => !yanlis.has(m)).length }))
    .filter((z) => z.dogru < z.toplam)
    .sort((a, b) => a.gun - b.gun);
}

/** Tekrar adresi: `#/hafta/<H>/tekrar/<g,g,…>` */
export const tekrarAdresi = (hafta: number, gunler: readonly number[]) => `#/hafta/${hafta}/tekrar/${gunler.join(",")}`;

/** Tekrar turunda bir günden en çok bu kadar madde (tur kısa kalsın: 3 zayıf gün ≈ 12 madde) */
export const GUN_BASI = 4;
const SIRA: Drill["k"][] = ["listen_and_respond", "tr_de", "guided_response"];

/**
 * Günün gün sınavından tekrar maddeleri: önce her türden birer madde (dinle, çevir, durum), sonra kalan yerler çevirmeyle dolar.
 * Her türün SONDAN seçilir (gün içindeki "Kendini dene" baştan seçer; aynı maddeyle karşılaşma azalır).
 */
export function tekrarMaddeleri(maddeler: readonly Drill[], n = GUN_BASI): Drill[] {
  const tur = (k: Drill["k"]) => maddeler.filter((m) => m.k === k).reverse();
  const out: Drill[] = [];
  for (const k of SIRA) { const m = tur(k)[0]; if (m) out.push(m); }
  for (const m of [...tur("tr_de"), ...maddeler.slice().reverse()]) { if (out.length >= n) break; if (!out.includes(m)) out.push(m); }
  return out.slice(0, n);
}
