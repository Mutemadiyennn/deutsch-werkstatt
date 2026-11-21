/**
 * M1 İlk Hafta günlük içerik biçimi (#58 A1/A4, PM-050, PM-053, PM-055).
 * Dosya: content/v2/m1/gun-NN.json. Biçim tarifi İçerik Motoru'nun content/v2/m1/FORMAT.md dosyasında.
 *
 * PM-055 (video kararı): `video` yalnızca GERÇEK İNSANIN konuştuğu klip olabilir (`gercek_insan: true`, `kaynak` zorunlu).
 * Çizim + sentez ses sahneleri ayrı `sahne` alanındadır ("köy dizisi") ve günün videosunun yerine geçmez.
 */
import { z } from "zod";
import { Audio, Drill, Level, LexemeId, ReviewState, Speed } from "./content.ts";

/** Ortam cümlesi: transkript satırı. `t0`/`t1` (saniye) hizalamadan gelir (A9, sapma > 300 ms olan cümle yayına girmez). */
export const MedyaCumle = z.object({
  id: z.string().min(1),
  de: z.string().min(1),
  tr: z.string().min(1),
  speaker: z.string().optional(),
  t0: z.number().min(0).optional(),
  t1: z.number().min(0).optional(),
  audio: Audio.optional()
});
export type MedyaCumle = z.infer<typeof MedyaCumle>;

/** Cevabın dayandığı cümleler: medyada cümle kimlikleri, okumada 0'dan başlayan cümle sırası */
const Kanit = z.array(z.union([z.string().min(1), z.number().int().min(0)])).min(1);
export const AnlamaQ = z.object({
  id: z.string().optional(),
  kind: z.enum(["gist", "detail"]),
  q_tr: z.string().min(1),
  opts: z.array(z.string().min(1)).min(2),
  ans: z.number().int().min(0),
  kanit: Kanit
});
export type AnlamaQ = z.infer<typeof AnlamaQ>;

const DikteBase = { id: z.string().min(1) };
/** PM-053 §3 dikte merdiveni: kolay (seç) → orta (tek boşluk) → zor (bankadan sırala) → usta (baştan yaz) → gerçek (özet) */
export const Dikte = z.discriminatedUnion("seviye", [
  z.object({ ...DikteBase, seviye: z.literal("kolay"), cumle: z.string(), q_tr: z.string().min(1), opts: z.array(z.string().min(1)).min(2), ans: z.number().int().min(0) }),
  z.object({ ...DikteBase, seviye: z.literal("orta"), cumle: z.string(), de: z.string().includes("___"), accepted: z.array(z.string().min(1)).min(1) }),
  z.object({ ...DikteBase, seviye: z.literal("zor"), cumle: z.string(), banka: z.array(z.string().min(1)).min(3), accepted: z.array(z.string().min(1)).min(1) }),
  z.object({ ...DikteBase, seviye: z.literal("usta"), cumle: z.string(), accepted: z.array(z.string().min(1)).min(1) }),
  z.object({ ...DikteBase, seviye: z.literal("gercek"), gorev_tr: z.string().min(1), ornek_de: z.string().min(1), zorunlu: z.array(z.string().min(1)).default([]) })
]);
export type Dikte = z.infer<typeof Dikte>;
export const DIKTE_SIRA = ["kolay", "orta", "zor", "usta", "gercek"] as const;

/** PM-053 §2: bir bölüm 1–2 dakika; adımlar a–g */
export const Bolum = z.object({
  id: z.string().min(1),
  /** bu bölümün cümleleri, sırayla (medyanın `cumleler`/`script`/`sahneler` kimlikleri) */
  cumleler: z.array(z.string().min(1)).min(1),
  ana_fikir: AnlamaQ,
  ayrinti: z.array(AnlamaQ).default([]),
  dikte: z.array(Dikte).default([]),
  golge: z.array(z.string().min(1)).default([]),
  cevapla: Drill.optional()
});
export type Bolum = z.infer<typeof Bolum>;

export const Lisans = z.enum(["CC BY 4.0", "CC BY-SA 4.0", "CC0 1.0", "kendi"]);
/** Gerçek insan klibi (PM-055 A9). `medya`: paketlenmiş dosyalar (A9 hattı yazar); yoksa oynatıcı kaynağa bağlantı gösterir. */
export const Video = z.object({
  id: z.string().min(1),
  tur: z.enum(["sokak-roportaji", "bir-gunum", "nasil-yapilir", "bunu-nasil-soylersin", "roportaj", "diyalog"]),
  title_tr: z.string().min(1),
  sure_sn: z.number().positive(),
  gercek_insan: z.literal(true, { message: "video yalnızca gerçek insan klibi olabilir (PM-055); çizimli sahne `sahne` alanına" }),
  kaynak: z.object({
    /** kaynağın sayfa adresi (atıf için) */
    url: z.string().url(),
    lisans: Lisans,
    /** atıf satırı: yazar, eser, lisans (öğrenciye gösterilir) */
    atif: z.string().min(1),
    bas_sn: z.number().min(0),
    bit_sn: z.number().positive()
  }),
  /** paketlenmiş medya (göreli yol, içerik paketine göre) — tarayıcı ilk oynatabildiğini seçer */
  medya: z.array(z.object({ src: z.string().min(1), type: z.string().min(1) })).default([]),
  poster: z.string().optional(),
  /** kim, nerede, ne soruluyor (Türkçe, dinlemeden önce; FORMAT.md A9) */
  ortam_tr: z.string().min(1).optional(),
  /** klipte geçen, o güne kadar öğretilmemiş kelimeler: dinlemeden önce gösterilir (FORMAT.md A9; inceleme #159 P1-2) */
  on_ogretim: z.array(z.object({ de: z.string().min(1), tr: z.string().min(1) })).max(6).default([]),
  cumleler: z.array(MedyaCumle).min(1),
  bolumler: z.array(Bolum).min(1)
});
export type Video = z.infer<typeof Video>;

/** Köy dizisi: bizim çizim tarifli sahnelerimiz + cihaz sesi. "video" ya da "röportaj" adıyla sunulmaz (PM-055). */
export const Sahne = z.object({
  id: z.string().min(1),
  title_tr: z.string().min(1),
  sahneler: z.array(MedyaCumle.extend({ sahne_tr: z.string().min(1) })).min(1),
  bolumler: z.array(Bolum).default([])
});
export type Sahne = z.infer<typeof Sahne>;

/** Anons, sesli mesaj, radyo: kısa, tek bölüm (PM-053 §6) */
export const Ses = z.object({
  id: z.string().min(1),
  tur: z.enum(["anons", "sesli-mesaj", "radyo", "bekleme-anonsu"]),
  title_tr: z.string().min(1),
  ortam_tr: z.string().min(1),
  speaker: z.string().optional(),
  hizlar: z.array(Speed).min(1),
  script: z.array(MedyaCumle).min(1),
  bolumler: z.array(Bolum).min(1),
  /** "Ne yapmalısın?" (PM-050) */
  eylem: z.object({ id: z.string(), k: z.literal("pick"), q_tr: z.string(), opts: z.array(z.string()).min(2), ans: z.number().int().min(0), why_tr: z.string().optional(), kanit: Kanit }).optional()
});
export type Ses = z.infer<typeof Ses>;

/** Ses + 4 resim, çeviri yok (fotoğraf hattı A10 sorgudan getirir) */
export const Gorsel = z.object({ id: z.string(), de: z.string().min(1), dogru_img: z.string().min(1), celdirici_img: z.array(z.string().min(1)).min(2) });

/** Dallanan konuşma provası, yapay zekâsız (A7) */
export const Prova = z.object({
  id: z.string(), title_tr: z.string(), durum_tr: z.string(), karsi: z.string(), baslangic: z.string(),
  dugumler: z.array(z.object({
    id: z.string(), de: z.string(), tr: z.string(), son: z.boolean().optional(),
    secenekler: z.array(z.object({ de: z.string(), tr: z.string(), accepted: z.array(z.string()).default([]), sonraki: z.string(), uygun: z.boolean(), geri_bildirim_tr: z.string() })).default([])
  })).min(2),
  kapanis_tr: z.string()
});

export const OkumaYazma = z.object({
  tur: z.enum(["okuma", "yazma"]),
  title_tr: z.string(),
  metin_de: z.string().optional(),
  metin_tr: z.string().optional(),
  /** anlama soruları ve metne dayalı üretim maddeleri (ör. "Ioana'ya cevap ver") */
  sorular: z.array(z.union([AnlamaQ, Drill])).default([]),
  yazma: z.object({ gorev_tr: z.string(), ornek_de: z.string(), zorunlu: z.array(z.string()).default([]), accepted_kaliplar: z.array(z.string()).default([]), kontrol_tr: z.array(z.string()).min(1) }).optional()
});

/**
 * AKIS AK-5 (PM-078 B; PM #160): günün "halkaları" — İÇ'in grupladığı 4–6 yeni kart, kapıdan geçen görev cümleleri ve mini sahne.
 * Alan yoksa gün bugünkü düzenle çalışır. Halka kendi kalıplarını öğretir (`kaliplar`; "…" yuvadır) ve günün dersi VARSAYILMAZ
 * (#165 kuralı): `dersten_sonra: true` yalnız halka bilerek dersten sonra konduysa yazılır (planlayıcı sırayı K(t)'den hesaplar, K8).
 */
export const HalkaCumle = z.object({
  kart: LexemeId, de: z.string().min(1), tr: z.string().min(1),
  /** TR→DE ve söyle görevinde kabul edilen biçimler (üretimde ≥ 3, D-064) */
  accepted: z.array(z.string().min(1)).default([])
});
export const HalkaSahne = z.object({
  ortam_tr: z.string().min(1).optional(),
  satirlar: z.array(z.object({ r: z.string().min(1), de: z.string().min(1), tr: z.string().min(1) })).min(2).max(4),
  soru: z.object({ q_tr: z.string().min(1), opts: z.array(z.string().min(1)).min(2).max(4), ans: z.number().int().min(0) }).refine((q) => q.ans < q.opts.length, "cevap şıklarda yok")
});
export const Halka = z.object({
  id: z.string().regex(/^m1:\d{2}:h\d+$/),
  title_tr: z.string().min(1),
  kartlar: z.array(LexemeId).min(1).max(8),
  /** halkanın öğrettiği kalıplar: bütün olarak bilinir, parçaları tek tek bilinmez ("Guten Tag", "Für …") */
  kaliplar: z.array(z.object({ de: z.string().min(1), tr: z.string().min(1) })).default([]),
  dersten_sonra: z.boolean().optional(),
  gorev_cumleleri: z.array(HalkaCumle).default([]),
  sahne: HalkaSahne.optional()
});
export type Halka = z.infer<typeof Halka>;

export const Gun = z.object({
  schema: z.literal(1),
  /** m1:gun:NN (dosya adı gun-NN.json ile birebir) */
  id: z.string().regex(/^m1:gun:\d{2}$/),
  day: z.number().int().min(1).max(7),
  level: Level,
  format: z.literal("gun"),
  title_tr: z.string().min(1),
  goal_tr: z.string().min(1),
  can_do: z.object({ id: z.string(), tr: z.string() }),
  unit: z.string(), arm: z.string(), place: z.string().optional(),
  characters: z.array(z.string()).default([]),
  requires: z.object({
    kelimeler: z.array(z.string()).default([]), kaliplar: z.array(z.string()).default([]), gramer: z.array(z.string()).default([]),
    tur: z.array(z.string()).default([]), baglayicilar: z.array(z.string()).default([]), akicilik: z.array(z.string()).default([])
  }),
  review: ReviewState,
  dersler: z.array(z.string().regex(/^r0:\d{2}-[a-z0-9-]+$/)).default([]),
  yeni_kartlar: z.array(LexemeId).default([]),
  halkalar: z.array(Halka).optional(),
  video: Video.optional(),
  sahne: Sahne.optional(),
  sesler: z.array(Ses).default([]),
  gorsel: z.array(Gorsel).default([]),
  prova: Prova.optional(),
  okuma_yazma: OkumaYazma.optional(),
  /** PM-066 madde 3 (B16 "Günü sınavla geç"): 10–12 madde (4 dikte, 6 üretim — 2'si sesli —, 1 mini prova); mevcut Drill türleri */
  gun_sinavi: z.object({ id: z.string(), maddeler: z.array(Drill).min(10).max(12), sesli: z.array(z.string()).default([]),
    /** dikte maddeleri (İÇ #110 P1-1): sınav ekranı bunları `dikteDegerlendir` ile puanlar; sesli ile kesişmez, seçmeli olamaz */
    dikte: z.array(z.string()).default([]) }).optional()
});
export type Gun = z.infer<typeof Gun>;

/** Medya oynatıcısının tek arayüzü: video, köy dizisi sahnesi ve ses aynı akışı kullanır (PM-053 §6) */
export interface Medya {
  id: string;
  kind: "video" | "sahne" | "ses";
  title_tr: string;
  ortam_tr?: string;
  cumleler: MedyaCumle[];
  bolumler: Bolum[];
  hizlar: z.infer<typeof Speed>[];
  video?: Video;
  eylem?: Ses["eylem"];
}
export function medyalar(g: Gun): Medya[] {
  const out: Medya[] = [];
  if (g.video) out.push({ id: g.video.id, kind: "video", title_tr: g.video.title_tr, ortam_tr: g.video.ortam_tr, cumleler: g.video.cumleler, bolumler: g.video.bolumler, hizlar: ["normal"], video: g.video });
  for (const s of g.sesler) out.push({ id: s.id, kind: "ses", title_tr: s.title_tr, ortam_tr: s.ortam_tr, cumleler: s.script.map((c) => (c.speaker || !s.speaker ? c : { ...c, speaker: s.speaker })), bolumler: s.bolumler, hizlar: s.hizlar, eylem: s.eylem });
  if (g.sahne && g.sahne.bolumler.length) out.push({ id: g.sahne.id, kind: "sahne", title_tr: g.sahne.title_tr, cumleler: g.sahne.sahneler, bolumler: g.sahne.bolumler, hizlar: ["slow", "normal"] });
  return out;
}
