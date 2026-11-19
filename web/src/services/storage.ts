/**
 * Veri güvenliği (#58 A12): tarayıcı yer darlığında site verisini silebilir. `navigator.storage.persist()` isteği,
 * öğrencinin ilerlemesinin (IndexedDB) kalıcı depolamada tutulmasını ister. Sonuç cihazda saklanır ve Profil'de gösterilir.
 */
import { getMeta, setMeta } from "../data/db.ts";

export type PersistState = "persisted" | "best-effort" | "unsupported";

export async function ensurePersist(): Promise<PersistState> {
  const s = typeof navigator !== "undefined" ? navigator.storage : undefined;
  if (!s?.persist || !s.persisted) { await setMeta("storagePersist", "unsupported").catch(() => {}); return "unsupported"; }
  try {
    let ok = await s.persisted();
    if (!ok) ok = await s.persist();
    const st: PersistState = ok ? "persisted" : "best-effort";
    await setMeta("storagePersist", st);
    return st;
  } catch { return "best-effort"; }
}
export const persistState = () => getMeta<PersistState>("storagePersist");
