/**
 * "A1 tamam" kapısı (PM-148 karar 1, [ANA-V] md. 4). Saf; politika `policy.a1_tamam`.
 *  - Deneme sınavını geçmek ve seviye tespitinin "A2'ye hazırsın" kararı, DENETİM-A1'in içerik koşullarının
 *    (P0-1, P0-2, P1-2…P1-5) hepsi inene kadar "A1 tamam" sayılmaz.
 *  - Bayrak (`acik`, PM-135 ek 14) kapalıyken kapı yoktur: ekranlar eskisi gibi.
 *  - Kayıtlı sonuç (deneme puanı, tespit raporu) değişmez; kapı ekranda uygulanır. Koşullar inince eski rapor da açılır.
 */
import POLICY from "../policy.json" with { type: "json" };

export interface A1Kosul { tr: string; indi: boolean }
export interface A1TamamPolitika { acik: boolean; kosullar: Record<string, A1Kosul> }

export const A1_TAMAM: A1TamamPolitika = POLICY.a1_tamam;

/** İnmemiş koşullar (politikadaki sırayla) */
export function a1TamamEksik(P: A1TamamPolitika = A1_TAMAM): { id: string; tr: string }[] {
  return Object.entries(P.kosullar).filter(([, k]) => !k.indi).map(([id, k]) => ({ id, tr: k.tr }));
}

/** Kapı uygulanıyor ve en az bir koşul inmemiş: "A1 tamam" ve "A2'ye hazırsın" askıda */
export function a1TamamAskida(P: A1TamamPolitika = A1_TAMAM, acik: boolean = P.acik): boolean {
  return acik && a1TamamEksik(P).length > 0;
}

/** Askıdaki A2 kararının adı (rapor başlığı ve "Raporu kopyala" metni; "A2'ye hazırsın" yerine) */
export const A2_ASKIDA = "A1'i iyi biliyorsun; A2 kararı şimdilik askıda.";
/** Seviye raporundaki açıklama */
export const a2AskidaSatir = (eksik: readonly { tr: string }[]) =>
  `A1 sınavının istediği bazı konular derslerde daha yok: ${eksikMetni(eksik)}. Bu konular derslere gelince karar açılır ve A2'ye buradan başlarsın. O zamana kadar A1 günlerinden devam edersin.`;
/** Deneme sonucundaki açıklama */
export const denemeAskidaSatir = (eksik: readonly { tr: string }[]) =>
  `Bu sonuçla A1'i bitirmiş sayılmıyorsun: sınavın istediği bazı konular derslerde daha yok (${eksikMetni(eksik)}). Bu konular derslere gelince denemeyi bir kez daha çöz.`;

/** Öğrenciye gösterilen eksik listesi: "kendini tanıtma (…), hazırlıksız serbest konuşma ve …" */
export function eksikMetni(eksik: readonly { tr: string }[]): string {
  const t = eksik.map((e) => e.tr);
  return t.length <= 1 ? (t[0] ?? "") : `${t.slice(0, -1).join(", ")} ve ${t[t.length - 1]}`;
}
