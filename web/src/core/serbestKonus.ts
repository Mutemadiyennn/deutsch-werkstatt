/**
 * PM-148 [ANA-V] md. 1: serbest sesli konuşma (`serbest_konus`). Saf parçalar; ekran `ui/soru/SerbestKonus.tsx`.
 * Değerlendirme çevrimdışıdır: hedef başına kalıp eşleşmesi (döküm içinde, noktalamasız ses tanıma için) ve cümle sayısı.
 * Bu bir sınav değildir: "yanlış" yok; eksik hedef "bunu da söyleyebilirsin" olarak gösterilir. Çevrimiçiyse `feedback_tr` ek olur.
 */
import { PROFIL_YUVALARI, type ProfilYuvasi, type SerbestKonus } from "@dw/shared";
import { cumleler, kalipEslesmeleri, kalipSabitSayisi } from "./okuma.ts";
import { redact } from "./persona.ts";

export interface HedefSonuc { id: string; tr: string; tamam: boolean }
export interface KonusSonuc { hedefler: HedefSonuc[]; cumle: number; /** en az cümle sayısına ulaştı mı */ yeter: boolean; tamam: number }

/**
 * Bir parçada hedeflere yer ataması (inceleme #281 P1-2): aynı yeri iki kalıp tutarsa daha çok sabit sözcüklü olan kazanır
 * ("Ich bin aus Polen": "Ich bin aus ___" nereli; "Ich bin ___" ad SAYILMAZ). Dönen: atanan yerler (hedef kimliğiyle).
 */
function ata(k: SerbestKonus, parca: string): { hedef: string; bas: number; son: number }[] {
  const aday = k.hedefler.flatMap((h) => h.kaliplar.flatMap((kp) => kalipEslesmeleri(parca, kp, true).map((m) => ({ hedef: h.id, bas: m.bas, son: m.son, w: kalipSabitSayisi(kp) }))));
  aday.sort((a, b) => b.w - a.w || b.son - b.bas - (a.son - a.bas) || a.bas - b.bas);
  const secilen: { hedef: string; bas: number; son: number }[] = [];
  for (const a of aday) if (!secilen.some((s) => a.bas < s.son && s.bas < a.son)) secilen.push({ hedef: a.hedef, bas: a.bas, son: a.son });
  return secilen;
}

/**
 * Döküm parçaları (her mikrofon dokunuşu ya da yazılan her ekleme bir parça). Cümle sayısı parça başına: noktalamadan ya da
 * (noktalama yoksa) o parçada çakışmadan karşılanan hedef yerlerinden, hangisi büyükse; boş olmayan parça en az bir cümledir.
 */
export function degerlendir(k: SerbestKonus, parcalar: readonly string[]): KonusSonuc {
  const dolu = parcalar.map((p) => p.trim()).filter(Boolean);
  const tamamlar = new Set<string>();
  let cumle = 0;
  for (const p of dolu) {
    const yer = ata(k, p);
    for (const y of yer) tamamlar.add(y.hedef);
    cumle += Math.max(1, cumleler(p).length, yer.length);
  }
  const hedefler = k.hedefler.map((h) => ({ id: h.id, tr: h.tr, tamam: tamamlar.has(h.id) }));
  return { hedefler, cumle, yeter: cumle >= k.en_az_cumle, tamam: tamamlar.size };
}

export type ProfilDegerleri = Partial<Record<ProfilYuvasi | "name", string>>;
const YUVA_RE = new RegExp(`\\{(name|${PROFIL_YUVALARI.join("|")})\\}`, "g");
/** Örnek cevaptaki yuvalar profilden; boş alan "…" (değer depoda yok, yalnız cihazda) */
export function ornekCoz(ornek: string, p: ProfilDegerleri): string {
  // boş yuva "…"; ardındaki nokta kalır (cümle sınırı görünsün: "Ich wohne in … . Im Mai …")
  return ornek.replace(YUVA_RE, (_, ad: ProfilYuvasi | "name") => p[ad]?.trim() || "…").replace(/…([.!?])/g, "… $1");
}
/** Görevin kullandığı ve profilde boş olan alanlar: görev cevaptan önce bunları isteğe bağlı sorar (karar 2) */
export function bosYuvalar(k: SerbestKonus, p: ProfilDegerleri): ProfilYuvasi[] {
  const ad = new Set<ProfilYuvasi>();
  for (const h of k.hedefler) if (h.yuva && h.yuva !== "name" && !p[h.yuva]?.trim()) ad.add(h.yuva);
  for (const m of k.ornek_de.matchAll(YUVA_RE)) { const y = m[1] as ProfilYuvasi | "name"; if (y !== "name" && !p[y]?.trim()) ad.add(y); }
  return [...ad];
}

/** Gizlemede sözcük sayılmayanlar: maddenin kalıplarının sabit sözcükleri + birkaç bağlaç (sadeleştirilmiş yazım) */
const BAGLAC = ["und", "aber", "auch", "ja", "nein", "oder", "hallo", "danke", "bitte"];
/** yuvanın başındaki artikel ("aus der Ukraine") ne maskelenir ne yuvayı bitirir */
const ARTIKEL = new Set(["der", "die", "das", "dem", "den"]);
const sade = (s: string) => s.toLowerCase().replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/[.,!?;:„“"»«]/g, " ").split(/\s+/).filter(Boolean);
/**
 * Yapay zekâya giden döküm (karar 2, D-061): ad ve profil değerleri "[…]" olur; `yuva` taşıyan hedefin `___`ine düşen sözcükler de
 * (profil boşken söylenen ad, ülke, şehir). Eşleştirme `persona.redact` ile: ä/ae, ß/ss, İ/I, ş/s yazım farkları ve ad parçaları.
 */
export function gizle(metin: string, p: ProfilDegerleri, k?: SerbestKonus): string {
  let out = metin;
  const maske = (v: string) => { out = redact(out, { name: v }); };
  for (const v of Object.values(p)) if (v?.trim()) maske(v.trim());
  if (k) {
    const sabit = new Set([...BAGLAC, ...k.hedefler.flatMap((h) => h.kaliplar.flatMap((kp) => sade(kp.replace(/___/g, " "))))]);
    // yuva en uzun alınır (noktalamasız dökümde ad iki sözcük olabilir), ama kalıp sözcüğüne gelince durur: sonraki cümle maskelenmez
    for (const h of k.hedefler) if (h.yuva) for (const kp of h.kaliplar) for (const m of kalipEslesmeleri(metin, kp))
      for (const y of m.yuva) for (const w of y.split(/\s+/)) { if (ARTIKEL.has(w)) continue; if (sabit.has(w)) break; if (w.length >= 2 && !/^\d+$/.test(w)) maske(w); }
  }
  return out.replace(/\[Name\]/g, "[…]");
}
/** Yapay zekânın cevabındaki maske ekranda çıplak görünmez */
export const maskesiz = (s: string) => s.replace(/\s*\[…\]/g, " …").replace(/\[Name\]/g, "…");
