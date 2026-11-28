/** Akış kayıtlarının Bugün/Yol özeti (PM-148 [ANA-T] md. 2): `akis:<gün>` kaydından durakların kimliği, türü, adı ve süresi */
import type { Gun, LearnerItem } from "@dw/shared";
import { getMeta, itemsMap } from "../data/db.ts";
import type { AkisKaydi } from "../core/akisKayit.ts";
import type { AkisOzet } from "../core/gun.ts";
import POLICY from "../policy.json" with { type: "json" };

export const akisOzeti = (k: AkisKaydi): AkisOzet => ({
  durak: k.durak, biten: k.biten,
  duraklar: k.plan.duraklar.map((d) => ({ id: d.id, tur: d.tur, title_tr: d.title_tr, tahmini_dk: d.tahmini_dk, ...(d.eski_anahtar ? { eski_anahtar: d.eski_anahtar } : {}), ...(d.ses_turu ? { ses_turu: d.ses_turu } : {}) }))
});

export async function akisOzetleri(gunler: number[]): Promise<Map<number, AkisOzet>> {
  const k = await Promise.all(gunler.map((g) => getMeta<AkisKaydi>(`akis:${g}`)));
  return new Map(gunler.flatMap((g, i) => (k[i]?.plan?.duraklar ? [[g, akisOzeti(k[i]!)] as const] : [])));
}

/**
 * Kaydı olmayan akış günü ısınmayla mı başlayacak (inceleme #282 P1-1): planlayıcının kuralı (`akis.ts` ısınma) — önceki günlerin
 * kartlarından vadesi gelmişlerin sayısı halka payını (`halka sayısı × halka_tekrar[0]`) aşıyor. Önceki kartlar paket özetinden
 * (`index.m1[].kartlar`); sözlük yüklenmez. Planlayıcının K(t)'sine yakın bir sayım (aynı vadeli kart kümesi, cihazdaki kayıtlar).
 */
export async function isinmaVar(g: Pick<Gun, "day" | "halkalar">, ozet: readonly { day: number; kartlar: string[] }[], simdi = new Date()): Promise<boolean> {
  const halka = g.halkalar?.length ?? 0;
  if (!halka) return false;
  const ids = [...new Set(ozet.filter((x) => x.day < g.day).flatMap((x) => x.kartlar))];
  if (!ids.length) return false;
  const vade = (it: LearnerItem) => Math.min(...[it.passive?.fsrs?.due, it.active?.fsrs?.due].filter((d): d is string => !!d).map((d) => +new Date(d)));
  const vadeli = [...(await itemsMap(ids)).values()].filter((it) => it.kind === "lexeme" && vade(it) <= +simdi).length;
  return vadeli > halka * POLICY.akis.halka_tekrar[0]!;
}
