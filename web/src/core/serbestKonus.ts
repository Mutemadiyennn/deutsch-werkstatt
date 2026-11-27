/**
 * PM-148 [ANA-V] md. 1: serbest sesli konuşma (`serbest_konus`). Saf parçalar; ekran `ui/soru/SerbestKonus.tsx`.
 * Değerlendirme çevrimdışıdır: hedef başına kalıp eşleşmesi (döküm içinde, noktalamasız ses tanıma için) ve cümle sayısı.
 * Bu bir sınav değildir: "yanlış" yok; eksik hedef "bunu da söyleyebilirsin" olarak gösterilir. Çevrimiçiyse `feedback_tr` ek olur.
 */
import { PROFIL_YUVALARI, type ProfilYuvasi, type SerbestKonus } from "@dw/shared";
import { cumleler, kalipIcinde } from "./okuma.ts";

export interface HedefSonuc { id: string; tr: string; tamam: boolean }
export interface KonusSonuc { hedefler: HedefSonuc[]; cumle: number; /** en az cümle sayısına ulaştı mı */ yeter: boolean; tamam: number }

/** Dökümdeki cümle sayısı: noktalamadan ya da (noktalama yoksa) karşılanan hedef sayısından, hangisi büyükse */
export function degerlendir(k: SerbestKonus, metin: string): KonusSonuc {
  const t = metin.trim();
  const hedefler = k.hedefler.map((h) => ({ id: h.id, tr: h.tr, tamam: !!t && h.kaliplar.some((kp) => kalipIcinde(t, kp)) }));
  const tamam = hedefler.filter((h) => h.tamam).length;
  const cumle = t ? Math.max(cumleler(t).length, tamam) : 0;
  return { hedefler, cumle, yeter: cumle >= k.en_az_cumle, tamam };
}

export type ProfilDegerleri = Partial<Record<ProfilYuvasi | "name", string>>;
const YUVA_RE = new RegExp(`\\{(name|${PROFIL_YUVALARI.join("|")})\\}`, "g");
/** Örnek cevaptaki yuvalar profilden; boş alan "…" (değer depoda yok, yalnız cihazda) */
export function ornekCoz(ornek: string, p: ProfilDegerleri): string {
  // boş yuva "…": ardındaki nokta yutulur ("Ich heiße …." değil "Ich heiße …")
  return ornek.replace(YUVA_RE, (_, ad: ProfilYuvasi | "name") => p[ad]?.trim() || "…").replace(/…\./g, "…");
}
/** Görevin kullandığı ve profilde boş olan alanlar: görev cevaptan önce bunları isteğe bağlı sorar (karar 2) */
export function bosYuvalar(k: SerbestKonus, p: ProfilDegerleri): ProfilYuvasi[] {
  const ad = new Set<ProfilYuvasi>();
  for (const h of k.hedefler) if (h.yuva && h.yuva !== "name" && !p[h.yuva]?.trim()) ad.add(h.yuva);
  for (const m of k.ornek_de.matchAll(YUVA_RE)) { const y = m[1] as ProfilYuvasi | "name"; if (y !== "name" && !p[y]?.trim()) ad.add(y); }
  return [...ad];
}
/**
 * Yapay zekâya giden döküm (karar 2: yalnız gereken alan gider; burada hiçbiri gerekmez): profil değerleri ve ad "[…]" olur.
 * Uzun değer önce (ör. "Bad Tölz" içindeki "Bad" ayrı değer değilse de tam eşleşme önce).
 */
export function gizle(metin: string, p: ProfilDegerleri): string {
  const degerler = Object.values(p).map((v) => v?.trim()).filter((v): v is string => !!v && v.length >= 2).sort((a, b) => b.length - a.length);
  let out = metin;
  for (const v of degerler) {
    const kacis = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
    out = out.replace(new RegExp(`(?<![\\p{L}\\p{N}])${kacis}(?![\\p{L}\\p{N}])`, "giu"), "[…]");
  }
  return out;
}
