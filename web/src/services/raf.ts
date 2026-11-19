/**
 * PM-061 / D-112 (#58 B12) kapalı medya rafı — uygulama tarafı. Rafın adresi ve anahtarı YALNIZCA bu cihazda (`meta` →
 * `raf`); depoya, teste, yedek dosyasına (exportAll `meta` tablosunu almaz) ve hiçbir sunucuya gitmez. Kapalı dosyalar
 * anahtarla çekilir ve ayrı önbellekte (`dw2-kapali`) tutulur; servis işçisi bu isteklere dokunmaz. Raf yoksa ya da
 * ulaşılamazsa çağıran açık yedeği gösterir (hiçbir ekran boş kalmaz).
 */
import { delMeta, getMeta, setMeta } from "../data/db.ts";

export interface RafAyar { adres: string; anahtar: string }
export type RafDurum = "bagli" | "anahtar-yanlis" | "ulasilamiyor" | "ayar-yok" | "adres-gecersiz" | "eksik" | "anahtar-tanimsiz" | "koruma-yok";
export const RAF_DURUM_TR: Record<RafDurum, string> = {
  bagli: "Bağlandı: raf çalışıyor.",
  "anahtar-yanlis": "Parola yanlış (ya da adres başka bir rafı gösteriyor).",
  "anahtar-tanimsiz": "Raf hazır değil: rafın parolası Pages ayarlarında tanımlı değil ya da tanımlandıktan sonra yeniden dağıtılmadı.",
  "koruma-yok": "Raf hazır değil: rafın koruması dağıtılmamış. Pages'te son dağıtımın en yeni sürümü içerdiğini kontrol et.",
  ulasilamiyor: "Ulaşılamıyor: internet yok ya da adres yanlış.",
  "ayar-yok": "Adres ve parola girilmedi; açık kaynaklı medya gösteriliyor.",
  "eksik": "Adres ve parolanın ikisi de gerekli. Bir şey değiştirilmedi.",
  "adres-gecersiz": "Adres https:// ile başlamalı ve rafın kendi adresi olmalı. Kaydedilmedi."
};
const ONBELLEK = "dw2-kapali";
/** Rafta her zaman bulunan küçük sınama dosyası (doldurma hattı yazar) */
export const SAGLIK = "saglik.txt";

/** Anahtar başka bir yere gitmesin (inceleme #98 P1-1): yalnızca https, uygulamanın kendi kökeni değil, sorgu/parça yok.
 *  Şemasız adres `fetch` için göreli yoldur ve anahtar uygulama sunucusuna giderdi. Geçerliyse temiz kök adres, değilse null. */
export function rafAdres(adres: string, kendi = typeof location !== "undefined" ? location.origin : ""): string | null {
  let u: URL;
  try { u = new URL(adres.trim()); } catch { return null; }
  if (u.protocol !== "https:" || !u.hostname || u.username || u.password || u.search || u.hash) return null;
  if (kendi && u.origin === kendi) return null;
  return (u.origin + u.pathname).replace(/\/+$/, "");
}

export const rafOku = async (): Promise<RafAyar | null> => {
  const r = await getMeta<RafAyar>("raf");
  const adres = r?.anahtar ? rafAdres(r.adres ?? "") : null;
  return adres && r ? { adres, anahtar: r.anahtar } : null;
};
/** Kaydeder; adres geçersizse hiçbir şey yazmaz ve false döner. Boş ayar = sil (önbellek ve yerel adresler de). */
export async function rafYaz(a: RafAyar | null): Promise<boolean> {
  if (!a || !a.adres.trim() || !a.anahtar.trim()) { await delMeta("raf"); await rafTemizle(); return true; }
  const adres = rafAdres(a.adres);
  if (!adres) return false;
  const eski = await rafOku();
  if (eski && (eski.adres !== adres || eski.anahtar !== a.anahtar.trim())) await rafTemizle();
  await setMeta("raf", { adres, anahtar: a.anahtar.trim() });
  return true;
}
const istek = (a: RafAyar, yol: string, zaman = 10_000) => {
  const adres = rafAdres(a.adres);
  if (!adres) return Promise.reject(new Error("raf adresi geçersiz"));
  return fetch(`${adres}/${yol.replace(/^\/+/, "")}`, { headers: { Authorization: `Bearer ${a.anahtar}` }, cache: "no-store", credentials: "omit", redirect: "error", signal: AbortSignal.timeout?.(zaman) });
};

/** Bu oturumda verilen yerel (blob:) adresler: aynı dosya ikinci kez istenince yenisi yaratılmaz; Sil hepsini bırakır */
const yerel = new Map<string, string>();
/** Sil ya da ayar değişince: kapalı önbellek ve yerel adresler gider (inceleme #98 P2) */
export async function rafTemizle() {
  for (const u of yerel.values()) URL.revokeObjectURL(u);
  yerel.clear();
  try { if (typeof caches !== "undefined") await caches.delete(ONBELLEK); } catch { /* önbellek yoksa geç */ }
}

/** "Rafı sına" (PM 14:40 madde 1b): anahtarla tek dosya ister; sonucu öğrenci kendi görür */
export async function rafSina(a?: RafAyar | null): Promise<RafDurum> {
  const ayar = a ?? (await rafOku());
  if (!ayar) return "ayar-yok";
  if (!rafAdres(ayar.adres)) return "adres-gecersiz";
  try {
    const t0 = Date.now();
    const r = await istek(ayar, SAGLIK);
    const isaret = r.headers.get("X-Raf");
    if (r.ok) return isaret === "1" ? "bagli" : "koruma-yok";
    if (r.status === 503 && isaret === "anahtar-yok") return "anahtar-tanimsiz";
    // korumanın yanlış parolaya cevabı bilerek gecikmeli (1,2 sn); hızlı 404 = koruma yok, dosya da yok
    if (r.status === 404) return Date.now() - t0 >= 900 ? "anahtar-yanlis" : "koruma-yok";
    return r.status === 401 || r.status === 403 ? "anahtar-yanlis" : "ulasilamiyor";
  } catch { return "ulasilamiyor"; }
}

/** Kapalı dosyanın yerel adresi (blob:) ya da null (raf yok/ulaşılamaz → çağıran açık yedeği gösterir) */
export async function rafDosya(yol: string): Promise<string | null> {
  const ayar = await rafOku();
  if (!ayar) return null;
  const anahtarUrl = `${ayar.adres}/${yol.replace(/^\/+/, "")}`;
  const hazir = yerel.get(anahtarUrl);
  if (hazir) return hazir;
  try {
    const c = typeof caches !== "undefined" ? await caches.open(ONBELLEK) : null;
    let r = c ? await c.match(anahtarUrl) : undefined;
    if (!r) {
      const y = await istek(ayar, yol, 15_000);
      if (!y.ok) return null;
      r = y; if (c) await c.put(anahtarUrl, y.clone());
    }
    const u = URL.createObjectURL(await r.blob());
    yerel.set(anahtarUrl, u);
    return u;
  } catch { return null; }
}
