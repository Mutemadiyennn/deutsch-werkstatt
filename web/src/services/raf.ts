/**
 * PM-061 / D-112 (#58 B12) kapalı medya rafı — uygulama tarafı. Rafın adresi ve anahtarı YALNIZCA bu cihazda (`meta` →
 * `raf`); depoya, teste, yedek dosyasına (exportAll `meta` tablosunu almaz) ve hiçbir sunucuya gitmez. Kapalı dosyalar
 * anahtarla çekilir ve ayrı önbellekte (`dw2-kapali`) tutulur; servis işçisi bu isteklere dokunmaz. Raf yoksa ya da
 * ulaşılamazsa çağıran açık yedeği gösterir (hiçbir ekran boş kalmaz).
 */
import { delMeta, getMeta, setMeta } from "../data/db.ts";

export interface RafAyar { adres: string; anahtar: string }
export type RafDurum = "parola-kisa" | "dosya-yok" | "bagli" | "anahtar-yanlis" | "ulasilamiyor" | "ayar-yok" | "adres-gecersiz" | "eksik" | "anahtar-tanimsiz" | "koruma-yok";
export const RAF_DURUM_TR: Record<RafDurum, string> = {
  bagli: "Bağlandı: raf çalışıyor.",
  "parola-kisa": "Parola en az 32 karakter olmalı (rafa girilenle aynı). Kaydedilmedi; istek gönderilmedi.",
  "dosya-yok": "Parola doğru, raf boş: sınama dosyası henüz yüklenmemiş.",
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
  kayitSoz = null;
  return true;
}
/** rafın kabul ettiği en kısa parola (worker/src/raf.ts ANAHTAR_EN_AZ ile aynı) */
export const PAROLA_EN_AZ = 32;
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
  yerel.clear(); kayitSoz = null;
  try { if (typeof caches !== "undefined") await caches.delete(ONBELLEK); } catch { /* önbellek yoksa geç */ }
}

/** "Rafı sına" (PM 14:40 madde 1b): anahtarla tek dosya ister; sonucu öğrenci kendi görür */
export async function rafSina(a?: RafAyar | null): Promise<RafDurum> {
  const ayar = a ?? (await rafOku());
  if (!ayar) return "ayar-yok";
  if (!rafAdres(ayar.adres)) return "adres-gecersiz";
  try {
    let r = await istek(ayar, SAGLIK);
    let isaret = r.headers.get("X-Raf");
    if (r.ok) return isaret === "1" ? "bagli" : "koruma-yok";
    if (r.status === 503 && isaret === "anahtar-yok") return "anahtar-tanimsiz";
    if (r.status === 404 && isaret === "1") return "dosya-yok";
    if (r.status === 404) {
      // korumanın yanlış parolaya cevabı bilerek gecikmeli (1,2 sn). Süre ikinci (bağlantısı ısınmış) istekte ölçülür:
      // ilk istekte DNS/TLS/ön uçuş soğuk hücresel ağda hızlı 404'ü de geciktirebilir (inceleme #118 P1-2)
      const t0 = Date.now();
      r = await istek(ayar, SAGLIK); isaret = r.headers.get("X-Raf");
      if (r.status === 404 && isaret === "1") return "dosya-yok";
      return Date.now() - t0 >= 900 ? "anahtar-yanlis" : "koruma-yok";
    }
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

/** Rafın kelime fotoğrafı kaydı (`kayit.json` → `kart["lx:X#kart"]`): dosya yolu ve atıf. Açık kayıtla aynı alanlar. */
export interface RafKart { dosya: string; yazar?: string | null; lisans: string; lisans_url?: string | null; sayfa?: string | null }
export const RAF_KAYIT = "kayit.json";
/** Rafta güvenli dosya yolu: göreli, `..` yok; yalnız ad verilmişse `foto/` altında (doldurma hattı `foto/<sha16>.jpg`) */
export function rafYol(dosya: unknown): string | null {
  if (typeof dosya !== "string") return null;
  const y = dosya.trim().replace(/^\/+/, "");
  if (!y || !/^[\w./-]+$/.test(y) || y.split("/").some((p) => p === ".." || p === ".")) return null;
  return y.includes("/") ? y : `foto/${y}`;
}
const metin = (x: unknown) => (typeof x === "string" && x.trim() ? x.trim().slice(0, 200) : null);
type Atif = Omit<RafKart, "dosya">;
/** Doldurma hattının `sorgular[*].adaylar[]` kayıtları (dosya → yazar, lisans, sayfa): kart kaydında atıf yoksa buradan */
function adayAtiflari(ham: unknown): Map<string, Atif> {
  const m = new Map<string, Atif>();
  const sorgular = (ham as { sorgular?: unknown } | null)?.sorgular;
  if (!sorgular || typeof sorgular !== "object") return m;
  for (const v of Object.values(sorgular as Record<string, unknown>)) {
    const adaylar = (v as { adaylar?: unknown } | null)?.adaylar;
    if (!Array.isArray(adaylar)) continue;
    for (const a of adaylar as Record<string, unknown>[]) {
      const d = a && rafYol(a.dosya), lisans = a && metin(a.lisans);
      if (d && lisans && !m.has(d)) m.set(d, { lisans, yazar: metin(a.yazar), lisans_url: metin(a.lisans_url), sayfa: metin(a.sayfa) });
    }
  }
  return m;
}
/**
 * `kayit.json`'un `kart` bölümünü süzer. Atıf (yazar, lisans, sayfa) kart kaydında yoksa aynı dosyanın `sorgular` adayından
 * alınır (inceleme #204 P1-1). Geçersiz yol ya da hiçbir yerde lisansı olmayan kayıt atlanır (atıf kuralı: lisans ekranda).
 */
export function rafKartSuz(ham: unknown): Record<string, RafKart> {
  const kart = (ham as { kart?: unknown } | null)?.kart;
  const out: Record<string, RafKart> = {};
  if (!kart || typeof kart !== "object") return out;
  let aday: Map<string, Atif> | null = null;
  for (const [k, v] of Object.entries(kart as Record<string, unknown>)) {
    if (!/^lx:[^#\s]+#(kart|ornek\d+)$/.test(k) || !v || typeof v !== "object") continue;
    const x = v as Record<string, unknown>;
    const dosya = rafYol(x.dosya);
    if (!dosya) continue;
    const lisans = metin(x.lisans);
    const a: Atif | undefined = lisans ? { lisans, yazar: metin(x.yazar), lisans_url: metin(x.lisans_url), sayfa: metin(x.sayfa) } : (aday ??= adayAtiflari(ham)).get(dosya);
    if (!a) continue;
    out[k] = { dosya, ...a };
  }
  return out;
}
export interface RafKayit { kart: Record<string, RafKart>; /** önbellekte kayıt yoktu: ağdan arkada çekiliyor, sonuç sonraki istekte */ gecici: boolean }
let kayitSoz: Promise<RafKayit> | null = null;
/**
 * Rafın kart kaydı; raf yoksa boş. Önbellekte varsa beklemeden o (arkada tazelenir, sonraki açılışta yeni hâli).
 * Önbellek boşsa ekran beklemez (ilk açılış bütçesi, inceleme #204 P2-2): boş + `gecici` döner, kayıt arkada çekilir ve
 * önbelleğe girer; sonuç ne olursa olsun bir sonraki istek yeniden bakar (geçici ağ hatası oturum boyunca saklanmaz).
 * Profil'de "Kaydet ve rafı sına" kaydı önceden çeker (`rafKayitCek`).
 */
export function rafKayit(): Promise<RafKayit> {
  const soz = (kayitSoz ??= (async (): Promise<RafKayit> => {
    const ayar = await rafOku();
    if (!ayar) return { kart: {}, gecici: false };
    const c = await onbellek();
    try {
      const eski = c ? await c.match(`${ayar.adres}/${RAF_KAYIT}`) : undefined;
      if (eski) { void kayitCek(ayar, c).catch(() => null); return { kart: rafKartSuz(await eski.json()), gecici: false }; }
    } catch { /* bozuk önbellek: ağdan */ }
    void kayitCek(ayar, c).catch(() => null).finally(() => { if (kayitSoz === soz) kayitSoz = null; });
    return { kart: {}, gecici: true };
  })());
  return soz;
}
const onbellek = async (): Promise<Cache | null> => { try { return typeof caches !== "undefined" ? await caches.open(ONBELLEK) : null; } catch { return null; } };
async function kayitCek(ayar: RafAyar, c: Cache | null, zaman = 15_000): Promise<Record<string, RafKart> | null> {
  const y = await istek(ayar, RAF_KAYIT, zaman);
  if (!y.ok) return null;
  if (c) await c.put(`${ayar.adres}/${RAF_KAYIT}`, y.clone());
  return rafKartSuz(await y.json());
}
/** Profil → "Kaydet ve rafı sına": kaydı şimdi çeker ve önbelleğe koyar; kelime fotoğrafı sayısı (ulaşılamazsa null) */
export async function rafKayitCek(): Promise<number | null> {
  const ayar = await rafOku();
  if (!ayar) return null;
  try {
    const k = await kayitCek(ayar, await onbellek(), 10_000);
    kayitSoz = null;
    return k ? Object.keys(k).filter((x) => x.endsWith("#kart")).length : null;
  } catch { return null; }
}
