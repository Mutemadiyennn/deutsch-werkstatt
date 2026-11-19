/**
 * PM-061 / D-112 (#58 B12) kapalı medya rafı — uygulama tarafı. Rafın adresi ve anahtarı YALNIZCA bu cihazda (`meta` →
 * `raf`); depoya, teste, yedek dosyasına (exportAll `meta` tablosunu almaz) ve hiçbir sunucuya gitmez. Kapalı dosyalar
 * anahtarla çekilir ve ayrı önbellekte (`dw2-kapali`) tutulur; servis işçisi bu isteklere dokunmaz. Raf yoksa ya da
 * ulaşılamazsa çağıran açık yedeği gösterir (hiçbir ekran boş kalmaz).
 */
import { delMeta, getMeta, setMeta } from "../data/db.ts";

export interface RafAyar { adres: string; anahtar: string }
export type RafDurum = "bagli" | "anahtar-yanlis" | "ulasilamiyor" | "ayar-yok";
export const RAF_DURUM_TR: Record<RafDurum, string> = {
  bagli: "Bağlandı: raf çalışıyor.",
  "anahtar-yanlis": "Anahtar yanlış (ya da adres başka bir rafı gösteriyor).",
  ulasilamiyor: "Ulaşılamıyor: internet yok ya da adres yanlış.",
  "ayar-yok": "Adres ve anahtar girilmedi; açık kaynaklı medya gösteriliyor."
};
const ONBELLEK = "dw2-kapali";
/** Rafta her zaman bulunan küçük sınama dosyası (doldurma hattı yazar) */
export const SAGLIK = "saglik.txt";

export const rafOku = async (): Promise<RafAyar | null> => { const r = await getMeta<RafAyar>("raf"); return r?.adres && r?.anahtar ? r : null; };
export async function rafYaz(a: RafAyar | null) {
  if (!a || !a.adres.trim() || !a.anahtar.trim()) { await delMeta("raf"); return; }
  await setMeta("raf", { adres: a.adres.trim().replace(/\/+$/, ""), anahtar: a.anahtar.trim() });
}
const istek = (a: RafAyar, yol: string, zaman = 10_000) =>
  fetch(`${a.adres}/${yol.replace(/^\/+/, "")}`, { headers: { Authorization: `Bearer ${a.anahtar}` }, cache: "no-store", signal: AbortSignal.timeout?.(zaman) });

/** "Rafı sına" (PM 14:40 madde 1b): anahtarla tek dosya ister; sonucu öğrenci kendi görür */
export async function rafSina(a?: RafAyar | null): Promise<RafDurum> {
  const ayar = a ?? (await rafOku());
  if (!ayar) return "ayar-yok";
  try {
    const r = await istek(ayar, SAGLIK);
    return r.ok ? "bagli" : r.status === 404 || r.status === 401 || r.status === 403 ? "anahtar-yanlis" : "ulasilamiyor";
  } catch { return "ulasilamiyor"; }
}

/** Kapalı dosyanın yerel adresi (blob:) ya da null (raf yok/ulaşılamaz → çağıran açık yedeği gösterir) */
export async function rafDosya(yol: string): Promise<string | null> {
  const ayar = await rafOku();
  if (!ayar) return null;
  const anahtarUrl = `${ayar.adres}/${yol}`;
  try {
    const c = typeof caches !== "undefined" ? await caches.open(ONBELLEK) : null;
    let r = c ? await c.match(anahtarUrl) : undefined;
    if (!r) {
      const y = await istek(ayar, yol, 15_000);
      if (!y.ok) return null;
      r = y; if (c) await c.put(anahtarUrl, y.clone());
    }
    return URL.createObjectURL(await r.blob());
  } catch { return null; }
}
