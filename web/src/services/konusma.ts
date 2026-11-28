/** PM-148 karar 4: konuşma kaydı (cihazda, `meta` tablosu). Bkz. core/konusma.ts */
import { getMeta, setMeta } from "../data/db.ts";
import POLICY from "../policy.json" with { type: "json" };
import { konusmaAnahtar, konusmaEkle, konusmaSay, type KonusmaKaydi } from "../core/konusma.ts";

export async function konusmaYaz(adim: { id: string; gun: number; sesli: boolean }, ms = Date.now()): Promise<void> {
  const a = konusmaAnahtar(ms);
  await setMeta(a, konusmaEkle(await getMeta<KonusmaKaydi>(a), ms, adim));
}
export async function bugunKonusma(ms = Date.now()): Promise<{ sesli: number; yazili: number }> {
  return konusmaSay(await getMeta<KonusmaKaydi>(konusmaAnahtar(ms)), ms);
}

/** Serbest konuşma bayrağı (`policy.serbest_konus.acik`; PM-135 ek 14). Yalnız e2e paketinde `sessionStorage["e2e-serbest-konus"]`
 *  ("1" / "0") geçersiz kılar: yürüyüş bayrak açık ve kapalı iki kez koşar; üretimde okunmaz */
export function serbestKonusAcik(): boolean {
  if (import.meta.env.MODE === "e2e") { try { const x = sessionStorage.getItem("e2e-serbest-konus"); if (x === "1" || x === "0") return x === "1"; } catch { /* policy */ } }
  return POLICY.serbest_konus.acik === true;
}
