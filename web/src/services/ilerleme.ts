/**
 * M1 ilerlemesi ve XP (#58 A5b): cihazdaki kayıtlardan okunur; dışarı gitmez.
 *  - ders:<id> (bitti zamanı), m1:medya:<id> (bitti), m1:bahce:<gün> (Bahçe turu bitti), xp (toplam + günlük)
 */
import { getMeta, metaPrefix, setMeta } from "../data/db.ts";
import { XP_BOS, xpEkle, type Ilerleme, type XpKayit } from "../core/gun.ts";

export async function ilerlemeOku(): Promise<Ilerleme> {
  const [d, m, b] = await Promise.all([metaPrefix<{ bitti?: unknown }>("ders:"), metaPrefix<{ bitti?: unknown }>("m1:medya:"), metaPrefix<unknown>("m1:bahce:")]);
  return {
    dersBitti: new Set(d.filter((x) => x.value?.bitti || (x.value as { ilkBitti?: unknown })?.ilkBitti).map((x) => x.key.slice("ders:".length))),
    medyaBitti: new Set(m.filter((x) => x.value?.bitti).map((x) => x.key.slice("m1:medya:".length))),
    bahceBitti: new Set(b.map((x) => Number(x.key.slice("m1:bahce:".length))).filter((n) => Number.isFinite(n)))
  };
}
let kuyruk: Promise<unknown> = Promise.resolve();
/** XP ekle (sırayla yazılır; aynı anda iki ekleme birbirini ezmez) */
export function xpVer(n: number): Promise<void> {
  const p = kuyruk.then(async () => { const x = (await getMeta<XpKayit>("xp")) ?? XP_BOS; await setMeta("xp", xpEkle(x, n)); });
  kuyruk = p.catch(() => {});
  return p;
}
export const xpOku = async () => (await getMeta<XpKayit>("xp")) ?? XP_BOS;
