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
  /** maddenin ölçtüğü A1 haftası (1–8) */
  hafta: z.number().int().min(1).max(8),
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
export type TespitKaynak = "gorulmemis" | "hafta_testi" | "gun_sinavi" | "deneme" | "yeni";
/** Çözülmüş madde (derleme paketi ve motor bunu okur): gövde kaynağın biçimindedir */
export interface TespitCozulen {
  id: string;
  kaynak: TespitKaynak;
  /** gövdenin türü: Drill `k`'si, görülmemiş durumda "durum", denemede `pick` / `form` / `mesaj` / konuşma türü */
  tur: string;
  hafta: number;
  asama: TespitAsama;
  beceri: HavuzBeceri;
  can_do: string[];
  dil_noktasi: string[];
  /** karar üretim maddesine bakar (PM-115 md. 1); seçmeli madde tek başına "biliyor" kanıtı değildir */
  uretim: boolean;
  madde: Record<string, unknown>;
}
