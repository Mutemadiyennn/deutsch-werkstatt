/**
 * Düzey denemesi (PM-087 B.2; dosya `content/v2/assess/<ad>.json`, kimlik `assess:<ad>:<n>`): resmî A1/A2/B1 sınav düzeni,
 * dört bölüm (dinleme, okuma, yazma, konuşma), bölüm başına `puan` (25) ve ham puan. Sınav günü (`Gun.sinav`) bu denemeyi açar;
 * hangi gün hangi bölüm `Gun.sinav_bolumler` ile seçilir (PM-110: 55. gün dinleme + okuma, 56. gün yazma + konuşma).
 * Geçme (PM-087 ek): toplam ≥ `gecme.toplam` ve konuşma ≥ `gecme.konusma` (konuşmadaki eksik başka bölümle kapatılamaz).
 */
import { z } from "zod";
import { Level, Speed } from "./content.ts";

/** bölüm kimlikleri (PM-110): sınav günü bölüm eki ve denemenin bölümleri aynı listeden */
export const SINAV_BOLUM = ["dinleme", "okuma", "yazma", "konusma"] as const;
export const SinavBolum = z.enum(SINAV_BOLUM);
export type SinavBolum = z.infer<typeof SinavBolum>;

const Taban = { id: z.string().min(1), hafta: z.number().int().min(1).optional(), puan: z.number().positive() };
/** Dinleme ve okuma: seçmeli. Dinlemede `ses` (rol + Almanca satır; metin gösterilmez), okumada `metin_de` ya da ilanlar `secenekler_de` */
export const DenemeSec = z.object({
  ...Taban, k: z.literal("pick"),
  speed: Speed.optional(),
  ses: z.array(z.object({ r: z.string().min(1), de: z.string().min(1) })).min(1).optional(),
  grup: z.string().optional(),
  metin_de: z.string().min(1).optional(),
  secenekler_de: z.array(z.string().min(1)).min(2).optional(),
  q_tr: z.string().min(1),
  opts: z.array(z.string().min(1)).min(2),
  ans: z.number().int().min(0),
  kanit: z.array(z.number().int().min(0)).default([])
}).refine((m) => m.ans < m.opts.length, { message: "ans seçeneklerin dışında" });
/** Yazma 1: metindeki bilgiyle form doldurma; alan başına kabul listesi (otomatik puan) */
export const DenemeForm = z.object({
  ...Taban, k: z.literal("form"),
  bilgi_de: z.string().min(1),
  form_baslik_de: z.string().min(1),
  verilen: z.array(z.object({ etiket_de: z.string().min(1), deger: z.string() })).default([]),
  alanlar: z.array(z.object({ id: z.string().min(1), etiket_de: z.string().min(1), hafta: z.number().int().optional(), puan: z.number().positive(), accepted: z.array(z.string().min(1)).min(1) })).min(1)
});
/** Yazma 2: kısa mesaj; ölçütlerle öz-puan (`degerlendirme_tr`, her ölçüt "(N puan)" taşır) */
export const DenemeMesaj = z.object({
  ...Taban, k: z.literal("mesaj"),
  gorev_tr: z.string().min(1),
  noktalar_tr: z.array(z.string().min(1)).default([]),
  ornek_de: z.string().min(1),
  zorunlu: z.array(z.string().min(1)).default([]),
  degerlendirme_tr: z.array(z.string().min(1)).min(1)
});
/** Konuşma: hazırlıksız; kabul listesi yalnız örnektir (sınavdan önce gösterilmez) */
export const DenemeKonus = z.discriminatedUnion("k", [
  z.object({ ...Taban, k: z.literal("guided_response"), situation_tr: z.string().min(1), prompt_de: z.string().min(1), accepted: z.array(z.string().min(1)).min(1), why_tr: z.string().optional() }),
  z.object({ ...Taban, k: z.literal("listen_and_respond"), speed: Speed.default("normal"), audio_de: z.string().min(1), situation_tr: z.string().optional(), accepted: z.array(z.string().min(1)).min(1), why_tr: z.string().optional() })
]);
export const DenemeMadde = z.union([DenemeSec, DenemeForm, DenemeMesaj, DenemeKonus]);
export type DenemeMadde = z.infer<typeof DenemeMadde>;

export const DenemeKisim = z.object({
  id: z.string().min(1),
  yonerge_tr: z.string().min(1),
  /** kaydı kaç kez dinleyebilirsin (dinleme; resmî düzen 1 ya da 2) */
  dinleme_sayisi: z.number().int().min(1).max(3).optional(),
  degerlendirme_tr: z.array(z.string().min(1)).default([]),
  maddeler: z.array(DenemeMadde).min(1)
});
export type DenemeKisim = z.infer<typeof DenemeKisim>;
export const DenemeBolum = z.object({
  id: SinavBolum,
  title_tr: z.string().min(1),
  sure_dk: z.number().positive(),
  /** bölümün puanı (toplamda payı; A1: 25) */
  puan: z.number().positive(),
  /** maddelerin `puan` toplamı */
  ham_puan: z.number().positive(),
  hazirliksiz: z.boolean().optional(),
  kisimlar: z.array(DenemeKisim).min(1)
});
export type DenemeBolum = z.infer<typeof DenemeBolum>;
export const Deneme = z.object({
  schema: z.literal(1),
  id: z.string().regex(/^assess:[a-z0-9]+(?:-[a-z0-9]+)*:\d+$/),
  seviye: Level,
  review: z.object({ status: z.enum(["draft", "reviewed"]), by: z.string().optional(), at: z.string().optional() }),
  note_tr: z.string().optional(),
  gecme: z.object({ toplam: z.number().min(0).max(1), konusma: z.number().min(0).max(1) }),
  puanlama_tr: z.string().min(1),
  bolumler: z.array(DenemeBolum).min(1)
});
export type Deneme = z.infer<typeof Deneme>;

/** Madde kimlikleri ve ham puan tutarlılığı (doğrulayıcı ve birim testi) */
export function denemeSorunlari(d: Deneme): string[] {
  const out: string[] = [], ids = new Set<string>(), bol = new Set<string>();
  for (const b of d.bolumler) {
    if (bol.has(b.id)) out.push(`bölüm iki kez: ${b.id}`); bol.add(b.id);
    let ham = 0;
    for (const k of b.kisimlar) for (const m of k.maddeler) {
      if (ids.has(m.id)) out.push(`madde kimliği iki kez: ${m.id}`); ids.add(m.id);
      ham += m.k === "form" ? m.alanlar.reduce((s, a) => s + a.puan, 0) : m.puan;
      if (m.k === "form" && Math.abs(m.alanlar.reduce((s, a) => s + a.puan, 0) - m.puan) > 1e-9) out.push(`${m.id}: alan puanları toplamı ${m.alanlar.reduce((s, a) => s + a.puan, 0)} ≠ puan ${m.puan}`);
      if (m.k === "pick" && b.id === "dinleme" && !m.ses) out.push(`${m.id}: dinleme maddesinde ses yok`);
      if (m.k === "pick" && b.id === "okuma" && !m.metin_de && !m.secenekler_de) out.push(`${m.id}: okuma maddesinde metin yok`);
      if (m.k === "mesaj" && !mesajOlcutleri(m).length) out.push(`${m.id}: ölçüt puanı okunamadı ("(N puan)")`);
      if (m.k === "mesaj" && Math.abs(mesajOlcutleri(m).reduce((s, o) => s + o.puan, 0) - m.puan) > 1e-9) out.push(`${m.id}: ölçüt puanları toplamı ≠ puan ${m.puan}`);
    }
    if (Math.abs(ham - b.ham_puan) > 1e-9) out.push(`${b.id}: madde puanları toplamı ${ham} ≠ ham_puan ${b.ham_puan}`);
  }
  return out;
}

/** Mesaj ölçütleri: "Görev (6 puan): …" → { ad: "Görev", puan: 6, tr } (ölçüt metni öğrenciye aynen gösterilir) */
export function mesajOlcutleri(m: Pick<z.infer<typeof DenemeMesaj>, "degerlendirme_tr">): { ad: string; puan: number; tr: string }[] {
  const out: { ad: string; puan: number; tr: string }[] = [];
  for (const tr of m.degerlendirme_tr) {
    const x = /^\s*([^(:]+?)\s*\((\d+(?:[.,]\d+)?)\s*puan\)\s*:\s*(.*)$/s.exec(tr);
    if (x) out.push({ ad: x[1]!.trim(), puan: Number(x[2]!.replace(",", ".")), tr: x[3]!.trim() });
  }
  return out;
}
