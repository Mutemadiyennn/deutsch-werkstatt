/**
 * A1 seviye tespiti madde havuzu (PM-115 md. 5; biçim belgesi `content/v2/assess/TESPIT_FORMAT.md`).
 * Dosya `content/v2/assess/a1-seviye-tespiti.json`. Havuz var olan maddelere kimlikle bağlanır (`ref`: görülmemiş durum,
 * hafta sonu testi, gün sınavı, deneme maddesi); var olan madde yetmezse `yeni` ile Drill biçiminde madde eklenir.
 * Çözme ve kurallar derleme tarafında (`content/tools/tespit.ts`); eşikler `policy.json` → `seviye_tespiti`.
 */
import { z } from "zod";
import { Drill, ReviewState } from "./content.ts";
import { DERS_ID } from "./m1.ts";

/** Ölçülen beceriler (PM-115 md. 1). `kelime` havuza yazılmaz: kelime örneği sözlükten kendiliğinden üretilir. */
export const TESPIT_BECERI = ["dinleme", "okuma", "yazma", "konusma", "dil", "kelime"] as const;
export type TespitBeceri = (typeof TESPIT_BECERI)[number];
export const HAVUZ_BECERI = ["dinleme", "okuma", "yazma", "konusma", "dil"] as const;
export const HavuzBeceri = z.enum(HAVUZ_BECERI);
export type HavuzBeceri = z.infer<typeof HavuzBeceri>;
/** Dört beceri çekirdeği: herkes çözer, haftadan bağımsız (deneme bölümleriyle aynı adlar) */
export const CEKIRDEK_BECERI = ["dinleme", "okuma", "yazma", "konusma"] as const;
/** `tarama` = aşama 1; `derin` = aşama 2 ve çıkış yoklaması (çıkış daha önce sorulmamış `derin` maddeyi seçer) */
export const TespitAsama = z.enum(["tarama", "derin"]);
export type TespitAsama = z.infer<typeof TespitAsama>;

/** "Yapabiliyorum" cümlesi: `cd:m1:NN` (NN = günün numarası; 01…99 iki hane, 100+ üç hane) */
export const CAN_DO_ID = /^cd:m1:(0[1-9]|[1-9]\d|[1-3]\d{2})$/;
/** Havuzun `yeni` madde kimliği */
export const TESPIT_YENI_ID = /^tespit:a1:m\d{3}$/;
/** cd:m1:29 → 29 (biçim dışı: null) */
export const canDoGun = (id: string): number | null => (CAN_DO_ID.test(id) ? Number(id.slice(6)) : null);

const Bag = {
  /** maddenin ölçtüğü A1 haftası (üst sınır policy `seviye_tespiti.a1_hafta`, doğrulayıcıda) */
  hafta: z.number().int().min(1),
  asama: TespitAsama,
  beceri: HavuzBeceri,
  can_do: z.array(z.string().regex(CAN_DO_ID, "can_do biçimi cd:m1:NN")).default([]),
  dil_noktasi: z.array(z.string().regex(DERS_ID, "dil noktası r0:/gr:/dn: kimliği")).default([])
};
export const TespitRef = z.strictObject({ ref: z.string().min(1), ...Bag });
export const TespitYeni = z.strictObject({ yeni: Drill.refine((d) => TESPIT_YENI_ID.test(d.id), "yeni madde kimliği tespit:a1:mNNN"), ...Bag });
export const TespitMadde = z.union([TespitRef, TespitYeni]);
export type TespitMadde = z.infer<typeof TespitMadde>;

export const TespitCekirdek = z.strictObject({
  /** deneme kimliği (assess:<ad>:<n>), maddeler o denemenin ilgili bölümünden */
  deneme: z.string().regex(/^assess:[a-z0-9]+(?:-[a-z0-9]+)*:\d+$/),
  dinleme: z.array(z.string().min(1)).min(1),
  okuma: z.array(z.string().min(1)).min(1),
  yazma: z.array(z.string().min(1)).min(1),
  konusma: z.array(z.string().min(1)).min(1)
});

export const TespitHavuzu = z.strictObject({
  schema: z.literal(1),
  id: z.literal("tespit:a1:1"),
  seviye: z.literal("A1"),
  review: ReviewState,
  note_tr: z.string().optional(),
  cekirdek: TespitCekirdek,
  /** üretim maddesiyle ölçülemeyen dil noktası (strateji vb.); kapsam kuralından düşer, gerekçe zorunlu */
  muaf_dil_noktasi: z.array(z.strictObject({ id: z.string().regex(DERS_ID), neden_tr: z.string().min(10) })).default([]),
  maddeler: z.array(TespitMadde).min(1)
});
export type TespitHavuzu = z.infer<typeof TespitHavuzu>;

/** Çözülmüş maddenin kaynağı */
export type TespitKaynak = "gorulmemis" | "hafta_testi" | "gun_sinavi" | "temel" | "deneme" | "yeni";
/** Çözülmüş madde (derleme paketi ve motor bunu okur): gövde kaynağın biçimindedir */
export interface TespitCozulen {
  id: string;
  kaynak: TespitKaynak;
  /** gövdenin türü: Drill `k`'si, görülmemiş durumda "durum", denemede `pick` / `form` / `mesaj` / konuşma türü */
  tur: string;
  hafta: number;
  /** çekirdek maddesi (dört beceri, haftadan bağımsız) pakette `cekirdek` aşamasıyla gelir */
  asama: TespitAsama | "cekirdek";
  beceri: HavuzBeceri;
  can_do: string[];
  dil_noktasi: string[];
  /** karar üretim maddesine bakar (PM-115 md. 1); seçmeli madde tek başına "biliyor" kanıtı değildir */
  uretim: boolean;
  madde: Record<string, unknown>;
}

/** Bir haftanın derin bakış hedefleri: haftanın günlerindeki can_do'lar (sınav günü hariç) ve o hafta ilk öğretilen dil noktaları */
export interface DerinHedef { can_do: readonly string[]; dil_noktasi: readonly string[] }
/** Hedef başına sorulacak üretim maddesi (policy `seviye_tespiti.derin`) */
export interface DerinKota { can_do_madde: number; dil_noktasi_madde: number }

/**
 * Derin bakış seçimi (PM-115 md. 1, aşama 2): zayıf bir haftanın her can_do'su için `can_do_madde`, her dil noktası için
 * `dil_noktasi_madde` üretim maddesi. Yalnız `derin` + üretim maddeleri adaydır; seçim belirlenimlidir (aynı havuz aynı
 * maddeleri verir): her adımda en çok açık hedefi karşılayan aday, eşitlikte havuzdaki sıra. Haftalar birbirinden bağımsız
 * seçilir (birden çok zayıf haftada seçimlerin birleşimi sorulur); bu yüzden doğrulayıcı "bütün haftalar zayıf" durumunda
 * çıkışa madde kaldığını sınayınca her alt küme için de kalır. Motor (PR 2) ve doğrulayıcı aynı işlevi kullanır.
 * Dönen `eksik`: kotası dolmayan hedefler (kalan sayıyla).
 */
export function derinSec(maddeler: readonly TespitCozulen[], hedef: DerinHedef, kota: DerinKota): { secilen: TespitCozulen[]; eksik: { id: string; kalan: number }[] } {
  const ihtiyac = new Map<string, number>();
  for (const c of hedef.can_do) ihtiyac.set(c, kota.can_do_madde);
  for (const d of hedef.dil_noktasi) ihtiyac.set(d, (ihtiyac.get(d) ?? 0) + kota.dil_noktasi_madde);
  const etiket = (m: TespitCozulen) => [...m.can_do, ...m.dil_noktasi];
  const adaylar = maddeler.filter((m) => m.asama === "derin" && m.uretim && etiket(m).some((t) => ihtiyac.has(t)));
  const secilen: TespitCozulen[] = [];
  const acik = (m: TespitCozulen) => etiket(m).filter((t) => (ihtiyac.get(t) ?? 0) > 0).length;
  for (;;) {
    let en: TespitCozulen | null = null, enN = 0;
    for (const m of adaylar) { if (secilen.includes(m)) continue; const n = acik(m); if (n > enN) { en = m; enN = n; } }
    if (!en) break;
    secilen.push(en);
    for (const t of etiket(en)) if ((ihtiyac.get(t) ?? 0) > 0) ihtiyac.set(t, ihtiyac.get(t)! - 1);
  }
  return { secilen, eksik: [...ihtiyac].filter(([, n]) => n > 0).map(([id, kalan]) => ({ id, kalan })) };
}

/**
 * Derleme paketi `tespit.json` (havuz dosyası varsa yazılır): çözülmüş maddeler havuz sırasıyla (`derinSec` doğrulayıcıyla aynı
 * sırayı görsün), çekirdek ve hafta → derin bakış hedefleri + kelime örneğinin kartları.
 */
export const TespitPaketHafta = z.object({
  hafta: z.number().int().min(1),
  can_do: z.array(z.object({ id: z.string(), tr: z.string(), gun: z.number().int() })),
  dil_noktasi: z.array(z.object({ id: z.string(), ad_tr: z.string() })),
  /** haftanın yeni kartları (gün dosyası varsa `yeni_kartlar`, yoksa kesin tablo) */
  kartlar: z.array(z.string())
});
export type TespitPaketHafta = z.infer<typeof TespitPaketHafta>;
const CozulenZ = z.object({
  id: z.string(), kaynak: z.enum(["gorulmemis", "hafta_testi", "gun_sinavi", "temel", "deneme", "yeni"]), tur: z.string(),
  hafta: z.number().int(), asama: z.enum(["tarama", "derin", "cekirdek"]), beceri: HavuzBeceri,
  can_do: z.array(z.string()), dil_noktasi: z.array(z.string()), uretim: z.boolean(), madde: z.record(z.string(), z.unknown())
});
export const TespitPaket = z.object({
  id: z.string(),
  maddeler: z.array(CozulenZ),
  cekirdek: z.array(CozulenZ),
  haftalar: z.array(TespitPaketHafta),
  /** muaf dil noktaları derin bakışa girmez */
  muaf_dil_noktasi: z.array(z.string()).default([])
});
export type TespitPaket = z.infer<typeof TespitPaket>;
