/**
 * "A2'den başla" (seviye tanıma; PM-114 B, PM-084). Saf fonksiyonlar; ekran `screens/Seviye.tsx`, depo `services/seviye.ts`.
 *  - Başlangıç günü (`seviye:baslangic`): 1 = baştan; 57 = A2 (policy `seviye.a2_ilk_gun`); "A1'in N. haftasından" = 7(N−1)+1.
 *  - Atlanan gün: başlangıçtan önce olup kalıcı bitişi (`m1:gun:<g>`) olmayan gün. Bitiş YAZILMAZ ("tamam" değil "atlandı");
 *    gün kilidi ve yüklenecek hafta "geçilen" kümesine (biten ∪ atlanan) bakar.
 *  - Seviye tespiti (PM-115) `core/tespit.ts`; buradaki başlangıç ve "biliniyor" kart altyapısını kullanır.
 *  - Atlanan günlerin kartları "biliniyor" diye Bahçe'ye girer: tanıma yolunda seyrek tekrar; kanıt sayaçları sıfır (uydurma yok).
 */
import type { Drill, LearnerItem } from "@dw/shared";
import { emptyItem } from "./learner.ts";
import { biliniyorFsrs } from "./srs.ts";
import { haftaOf, yolGunleri } from "./gun.ts";
import POLICY from "../policy.json" with { type: "json" };

export const SEVIYE = POLICY.seviye;
/** Haftanın ilk günü */
export const haftaBasi = (hafta: number) => 7 * (hafta - 1) + 1;
/** Başlangıç haftasının günü pakette yoksa başlangıç uygulanmaz (A2 günleri henüz yoksa öğrenci boş yola ya da ileri bir
 *  haftaya düşmez; inceleme #245 P2-6) */
export const etkinBaslangic = (days: readonly number[], bas: number): number => (bas > 1 && yolGunleri([...days]).some((d) => d >= bas && haftaOf(d) === haftaOf(bas)) ? bas : 1);
/** A2 pakette var mı ("A2'den" seçeneği yalnız o zaman) */
export const a2Var = (days: readonly number[]) => etkinBaslangic(days, SEVIYE.a2_ilk_gun) === SEVIYE.a2_ilk_gun;

/** Atlanan günler: başlangıçtan önce, kalıcı bitişi olmayan paketteki günler */
export function atlananlar(days: readonly number[], bas: number, gunBitti: ReadonlySet<number>): Set<number> {
  const b = etkinBaslangic(days, bas);
  return new Set(yolGunleri([...days]).filter((d) => d < b && !gunBitti.has(d)));
}
/** Geçilen günler (gün kilidi, yüklenecek hafta): biten ∪ atlanan */
export const gecilenler = (gunBitti: ReadonlySet<number>, atlanan: ReadonlySet<number>) => new Set([...gunBitti, ...atlanan]);

/* ---------- Kelime Bahçesi: "biliniyor" kartlar ---------- */
/** Kimliğin kararlı küçük karması (yayılım: bütün kartlar aynı gün dönmesin) */
const karma = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; };
/**
 * Atlanan günün kartı: tanıma yolunda Review durumunda, ilk tekrarı `biliniyor_gun` + (0…yayilim_gun) gün sonra. Sayaçlar sıfır:
 * n/ok/durable/firstAt yazılmaz (Ben'deki noktalar ve günlük yeni kart sayısı uydurma dolmaz); `kaynak: "atlandi"` geri dönüşte
 * dokunulmamış kartı ayırır. Üretim yolu, ilk doğru tanımadan sonra Bahçe'nin olağan kuralıyla açılır.
 */
export function biliniyorKart(id: string, now = new Date()): LearnerItem {
  const it = emptyItem(id, "lexeme");
  const gun = SEVIYE.biliniyor_gun + (karma(id) % Math.max(1, SEVIYE.yayilim_gun));
  const fs = biliniyorFsrs(now, gun);
  it.passive = { ...it.passive, due: fs.due, fsrs: fs };
  it.kaynak = "atlandi";
  return it;
}
/** Yoklamada yanlış yapılan maddenin kartı hemen tekrara düşer (tanıma yolu şimdi vadeli; kanıt sayacı değişmez) */
export function hemenTekrar(it: LearnerItem, now = new Date()): LearnerItem {
  const fs = biliniyorFsrs(now, 0);
  return { ...it, passive: { ...it.passive, due: fs.due, fsrs: { ...(it.passive.fsrs ?? fs), due: fs.due } } };
}
/** Hiç dokunulmamış "biliniyor" kart (geri dönüşte Bahçe'den çıkar; A1 gününde yeniden tanıtılır) */
export const dokunulmamis = (it: LearnerItem) => it.kaynak === "atlandi" && it.passive.n === 0 && it.active.n === 0;

const sade = (s: string) => s.toLocaleLowerCase("de-DE").normalize("NFC");
const sozcukler = (s: string) => s.replace(/[.,!?;:„“"»«()…]/g, " ").split(/\s+/).filter(Boolean).map(sade);
/** Maddenin kelimeleri (ses + beklenen cevap); kart kimliğinin sözcüğüyle eşleşen kartlar (`lx:Termin#2` → termin) */
export function maddeKartlari(d: Drill, kartlar: readonly string[]): string[] {
  const o = d as Record<string, unknown>;
  const metin = [o.audio_de, o.prompt_de, o.from_de, o.de, Array.isArray(o.accepted) ? o.accepted[0] : null, Array.isArray(o.opts) && typeof o.ans === "number" ? o.opts[o.ans] : null]
    .filter((x): x is string => typeof x === "string").join(" ").replace(/___/g, " ");
  const s = new Set(sozcukler(metin));
  return kartlar.filter((k) => { const w = /^lx:([^#]+)/.exec(k)?.[1]; return !!w && sozcukler(w).length > 0 && sozcukler(w).every((x) => s.has(x)); });
}
