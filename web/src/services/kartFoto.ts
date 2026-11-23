/**
 * PM 7088230583 md. 3 (MEDYA 7088176731): kelime kartı ve "resimden seç" fotoğrafı önce raftan, yoksa açık fotoğraf,
 * yoksa çağıranın bugünkü yedeği (arama ya da emoji). Raf kaydı haritaya `raf:<yol>` adresiyle girer; dosya ancak
 * gösterileceği an anahtarla çekilir (`rafDosya`, kapalı önbellek: bir kez görülen fotoğraf çevrimdışı da gelir).
 * Raf kapalı ya da boşsa harita açık haritanın aynısıdır (bugünkü davranış).
 */
import type { FotoKayit } from "./content.ts";
import { rafDosya, type RafKart } from "./raf.ts";

export const RAF_ONEK = "raf:";

/** Açık harita + raf kaydı: aynı yerde ikisi de varsa raf öne geçer, açık fotoğraf `acik` alanında yedek kalır */
export function fotoBirlestir(acik: Readonly<Record<string, FotoKayit>>, raf: Readonly<Record<string, RafKart>>): Record<string, FotoKayit> {
  const out: Record<string, FotoKayit> = { ...acik };
  for (const [yer, r] of Object.entries(raf)) {
    const yedek = acik[yer];
    out[yer] = { src: RAF_ONEK + r.dosya, sinif: "kapali", yazar: r.yazar ?? null, lisans: r.lisans, lisans_url: r.lisans_url ?? null, sayfa: r.sayfa ?? null, ...(yedek ? { acik: yedek } : {}) };
  }
  return out;
}

/** Gösterilecek adres ve atfı; raf dosyası gelmezse açık yedek, o da yoksa null (çağıran bugünkü yedeğine düşer) */
export async function fotoAdresi(f: FotoKayit | undefined | null): Promise<{ src: string; atif: FotoKayit } | null> {
  if (!f) return null;
  if (!f.src.startsWith(RAF_ONEK)) return { src: f.src, atif: f };
  const u = await rafDosya(f.src.slice(RAF_ONEK.length)).catch(() => null);
  if (u) return { src: u, atif: f };
  return f.acik ? fotoAdresi(f.acik) : null;
}

/** Yer listesinde ilk gösterilebilir fotoğraf (sıra önemli: örnek cümlenin fotoğrafı, sonra kartın) */
export async function ilkFoto(harita: Readonly<Record<string, FotoKayit>>, yerler: readonly string[]): Promise<{ src: string; atif: FotoKayit } | null> {
  for (const y of yerler) {
    const r = await fotoAdresi(harita[y]);
    if (r) return r;
  }
  return null;
}
