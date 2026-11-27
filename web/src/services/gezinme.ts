/** Gezinme kuralının (PM-133) uygulama tarafı: `core/donus.ts` durumunu oturum boyunca tutar (sayfa yenilenince sürer).
 *  `app.tsx` her adres değişiminde `gezinmeGecis` çağırır; X / geri / sekme bağlantıları hedefi buradan alır. */
import { BOS, donusHedefi, gecis, sekmeAdresi, type Gezinme, type Sinif } from "../core/donus.ts";
import { aile, KOKLER, parseHash, sekme } from "../state.ts";

const ANAHTAR = "dw:gezinme";
const EN_COK = 24;

export function sinif(hash: string): Sinif {
  const r = parseHash(hash).name;
  return { kok: KOKLER.has(r), aile: aile(r), sekme: sekme(r), ad: r };
}

function yukle(): Gezinme {
  try { const x = JSON.parse(sessionStorage.getItem(ANAHTAR) ?? "null") as Gezinme | null; if (x && Array.isArray(x.yigin) && x.sonKonum) return x; } catch { /* yok */ }
  return BOS;
}
let durum: Gezinme = yukle();

export function gezinmeGecis(eski: string | null, yeni: string): void {
  const d = gecis(durum, eski, yeni, sinif);
  durum = d.yigin.length > EN_COK ? { ...d, yigin: d.yigin.slice(-EN_COK) } : d;
  try { sessionStorage.setItem(ANAHTAR, JSON.stringify(durum)); } catch { /* yok: bellekte sürer */ }
}

/** X / geri okunun hedefi (giriş noktası; bilinmiyorsa ekranın kendi üst adresi) */
export const donus = (varsayilan: string): string => donusHedefi(durum, location.hash, varsayilan, sinif);

/** Hedef akıştan çıkış mı (X), yoksa aynı akışın bir üst adımı mı (‹)? Tam ekran akışta tek çıkış X'tir (PM-133 md. 4). */
export function cikisMi(hedef: string): boolean {
  const a = aile(parseHash(location.hash).name);
  return a !== null && aile(parseHash(hedef).name) !== a;
}

/** Bitiş ekranının "Sıradaki adım"ı: ekran akıştan (`#/akis/<gün>`) açıldıysa akışa döner (durak ilerler), değilse `varsayilan` */
export function akisaDonus(varsayilan: string): string {
  const h = donus(varsayilan);
  return parseHash(h).name === "akis" ? h : varsayilan;
}

/** Alt sekme bağlantısı: etkin sekme köküne, öbürü son konumuna */
export const sekmeHref = (k: string, kok: string, etkin: boolean): string => sekmeAdresi(durum, k, kok, etkin);

