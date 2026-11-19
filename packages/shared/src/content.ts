/**
 * İçerik sözleşmesi (v2). Tek doğruluk kaynağı: buradaki zod şemaları.
 * - İçerik dosyaları (content/v2/**) bu şemalarla doğrulanır (content/tools/validate.ts).
 * - Web istemcisi içerik paketini yüklerken aynı şemaları kullanır.
 * Kimlikler: lx:<lemma>[#n] · ch:<alan>:<slug> · pt:<slug> · sc:<alan>:<nn>-<slug> · gr:<v1-ünite>:<tN>
 */
import { z } from "zod";
import { Explanation } from "./explain.ts";

export const Level = z.enum(["A1", "A2", "B1"]);
export type Level = z.infer<typeof Level>;
export const Speed = z.enum(["slow", "normal", "natural", "fast"]);
export type Speed = z.infer<typeof Speed>;
export const LayerKey = z.enum(["hd", "alltag", "bair"]);
export const Register = z.enum(["neutral", "formal", "informal"]);

const id = (prefix: string) => z.string().regex(new RegExp(`^${prefix}:[^\\s]+$`), `kimlik '${prefix}:' ile başlamalı`);
export const LexemeId = id("lx");
export const ChunkId = id("ch");
export const PatternId = id("pt");
export const ScenarioId = id("sc");

/** 13 gerçek hayat alanı */
export const Domain = z.object({
  id: z.string().regex(/^[a-z]+$/),
  order: z.number().int(),
  title_tr: z.string().min(2),
  title_de: z.string().min(2),
  desc_tr: z.string().min(5),
  /** v1 ünitelerinden bu alanla ilgili olanlar (B1 yolu ve başlangıç malzemesi) */
  legacyUnits: z.array(z.string().regex(/^[ab][12]-\d\d$/)).default([])
});
export type Domain = z.infer<typeof Domain>;

/** İçerik evrenine bağlılık (PM-040.3, PM-042 A.2–A.3, OD-1, AH-4): yer, ünite, karakterler, "bunu yapabilirim" hedefleri, kol, önkoşullar */
export const Anchors = {
  /** WORLD.md yer kimliği (ör. place:praxis-weber) */
  place: z.string().optional(),
  /** ünite kimliği (ör. u:a2-03) */
  unit: z.string().optional(),
  /** WORLD.md karakter kimlikleri */
  characters: z.array(z.string()).default([]),
  /** can_do kimlikleri (ör. cd:a2:telefon-randevu) */
  can_do: z.array(z.string()).default([]),
  /** AHTAPOT kolu (ör. arm:konusma) */
  arm: z.string().optional(),
  /** önce öğretilmiş olması gereken öğeler (lx:, ch:, pt:, gr:, sc:, r0:) — OD-1 */
  requires: z.array(z.string()).default([])
};
/** Senaryoda `requires` senaryo kimlikleridir (OD-1/OD-7, teach.ts); öteki alanlar ortak */
const { requires: _anyRequires, ...AnchorsNoRequires } = Anchors;
void _anyRequires;
/** Hazır ses (D-085): dosya + kim okudu + lisans; yoksa cihaz sesi */
export const Audio = z.object({ src: z.string().min(1), speaker: z.string().optional(), license: z.string().optional(), source: z.string().optional() });
/** Güney Almanya kullanımı (gell, daheim, Semmel…): Bairisch DEĞİL, bölgesel gündelik dil (PM-042 A.6) */
const Sued = z.boolean().optional();

/** passive: yalnızca tanıma için (üretim ve alıştırma havuzuna girmez; PM-045 §3a) */
export const Tier = z.enum(["K1", "K2", "K3", "passive"]);
export const Example = z.object({
  id: z.string(),
  de: z.string().min(1),
  tr: z.string().min(1),
  img: z.string().optional(),
  layer: z.enum(["hd", "alltag"]).default("hd"),
  /** Diyalog içinden örnek ("– … – …" biçiminde iki konuşmacı) */
  dialog: z.boolean().optional(),
  audio: Audio.optional(),
  sued: Sued
});

export const Lexeme = z.object({
  id: LexemeId,
  de: z.string().min(1),
  tr: z.string().min(1),
  pos: z.enum(["noun", "verb", "adj", "adv", "prep", "conj", "pron", "det", "num", "particle", "phrase", "other"]),
  art: z.enum(["der", "die", "das"]).optional(),
  pl: z.string().optional(),
  verb: z
    .object({
      praesens3: z.string().optional(),
      praeteritum: z.string().optional(),
      perfekt: z.string().optional(),
      aux: z.enum(["haben", "sein", "haben/sein"]).optional(),
      separable: z.string().optional(),
      reflexive: z.boolean().optional(),
      case: z.array(z.enum(["akk", "dat", "gen"])).optional(),
      prep: z.array(z.string()).optional()
    })
    .optional(),
  ipa: z.string().optional(),
  img: z.string().optional(),
  collocations: z.array(z.object({ de: z.string(), tr: z.string() })).default([]),
  patterns: z.array(PatternId).default([]),
  register: Register.default("neutral"),
  related: z.array(LexemeId).default([]),
  mistakes_tr: z.array(z.string()).default([]),
  examples: z.array(Example).default([]),
  level: Level.optional(),
  /** Katman: K1 derin kart, K2 hafif kart, K3 kişisel */
  tier: Tier.optional(),
  /** Altyazı sıklık sırası (lemma), FrequencyWords/OpenSubtitles */
  freqRank: z.number().int().positive().optional(),
  domains: z.array(z.string()).default([]),
  /** v1 kaynakları: ünite + kurs motorundaki kelime anahtarı (kuWKey = "<ünite>:w:<de>"); ilerleme taşıma için */
  legacy: z.array(z.object({ unit: z.string(), key: z.string() })).default([]),
  /** OD-9.1 yapılandırılmış açıklama (PM-040.3) */
  exp: Explanation.optional(),
  /** PM-047 §2: kartın başlığı kullanılacak ifadedir ("einen Termin machen"); kelime bilgisi kartın içinde küçük */
  head: z.object({ de: z.string().min(1), tr: z.string().min(1) }).optional(),
  /** PM-047 §2: false → öğrenciye ayrı kart olarak gösterilmez (işlev kelimeleri); ifadelerin içinde öğretilir */
  card: z.boolean().optional(),
  /** PM-049 (d, h): boşluk doldurma biçimleri — "Ich habe ___ Termin." → einen; ayrılabilir fiilde iki boşluk "sage … ab" */
  /** Boşluk biçimleri. `hint_tr`: yanlış cevaptan sonraki açıklama (soru sırasında yalnızca dokunuşla açılır; PM 7004537514-2).
   *  `also_ok`: boşluğa giren eş anlamlı başka doğru cevaplar (kriegen/bekommen; İÇ 7003635425-2) */
  forms: z.array(z.object({ de: z.string().includes("___"), answer: z.string().min(1), also_ok: z.array(z.string().min(1)).optional(), tr: z.string().optional(), hint_tr: z.string().optional() })).default([]),
  audio: Audio.optional(),
  sued: Sued,
  ...Anchors
});
export type Lexeme = z.infer<typeof Lexeme>;
/** PM-047 §2: işlev kelimeleri ayrı kart olarak sorulmaz; ifadelerin içinde öğretilir. `card: false` içerikte işaretlenene
 *  kadar sözcük türünden de anlaşılır (tanımlık, zamir, bağlaç, edat, ilgeç, sayı — sayılar R0'da öğretilir). */
const ISLEV_TURU = new Set(["det", "pron", "conj", "prep", "particle", "num"]);
export const kartMi = (l: Pick<Lexeme, "card" | "pos">) => l.card !== false && !ISLEV_TURU.has(l.pos);

export const ReviewState = z.object({
  status: z.enum(["draft", "reviewed"]), by: z.string().optional(), at: z.string().optional(), notes: z.string().optional(),
  /** OD-9.3 okur kontrolü (PM-017): "reviewed" ancak okur her açıklamayı geçirdiyse */
  okur: z.enum(["passed", "returned"]).optional(), okur_at: z.string().optional()
});
/** Sözlük partisi dosyası: content/v2/registry/lexicon/batch-NNN.json */
export const LexiconBatch = z.object({ batch: z.string(), review: ReviewState, items: z.array(Lexeme).min(1) });

export const BairLayer = z.object({
  text: z.string().min(1),
  status: z.enum(["verified", "uncertain"]),
  source: z.string().optional(),
  note_tr: z.string().optional()
});

/** Yutulan sesler: duyulan biçim → tam biçim (ör. "haste" → "hast du") */
export const Reduction = z.object({ heard: z.string(), full: z.string() });

export const Chunk = z.object({
  id: ChunkId,
  tr: z.string().min(1),
  lexemes: z.array(LexemeId).default([]),
  pattern: PatternId.optional(),
  register: Register.default("neutral"),
  layers: z.object({ hd: z.string().min(1), alltag: z.string().optional(), bair: BairLayer.optional() }),
  /** İşlev: ne zaman, hangi tonla — ESKİ serbest metin; OD-9'a göre `exp` ile değiştirilir (PM-017) */
  use_tr: z.string().optional(),
  /** OD-9.1 yapılandırılmış açıklama (Hochdeutsch ifade için) */
  exp: Explanation.optional(),
  /** OD-9.1 gündelik (Alltag) biçimin açıklaması: panelde çipli gösterilir (TARGET2) */
  alltag_exp: Explanation.optional(),
  /** OD: bu ifadenin açıklamasının varsaydığı önceden öğretilmiş öğeler (ör. gr:dativ) */
  requires: z.array(z.string()).default([]),
  mistakes_tr: z.array(z.string()).default([]),
  audio: Audio.optional(),
  sued: Sued
});
export type Chunk = z.infer<typeof Chunk>;

export const Pattern = z.object({
  id: PatternId,
  frame: z.string().min(1),
  level: Level.default("A1"),
  core: z.boolean().default(false),
  /** 2–4 satır Türkçe not — öğretmen/yazar notu; öğrenciye GÖSTERİLMEZ (OD-9: öğrenciye görünen kurallar `kurallar_tr`) */
  grammar_tr: z.string().min(5),
  /** OD-9: öğrenciye görünen kurallar, her biri tek fikir (≤14 kelime); Gramer Atölyesi ve kur ekranı bunları tek tek gösterir */
  kurallar_tr: z.array(z.string()).default([]),
  /** OD-9: öğrenciye görünen çerçeve, terimsiz (ör. "**Ich habe** + bir şey"); yoksa çerçeve gösterilmez */
  frame_tr: z.string().optional(),
  slots: z.array(z.object({ name: z.string(), fills: z.array(z.string()) })).default([]),
  examples: z.array(z.object({ de: z.string(), tr: z.string(), layer: z.enum(["hd", "alltag"]).default("hd") })).min(1),
  transforms: z
    .object({ question: z.string(), negative: z.string(), polite: z.string(), perfekt: z.string(), weil: z.string(), dass: z.string(), wenn: z.string() })
    .partial()
    .default({}),
  mistakes_tr: z.array(z.string()).default([]),
  grammarRef: z.string().optional(),
  review: ReviewState.optional(),
  ...Anchors
});
export type Pattern = z.infer<typeof Pattern>;

/** v1'deki 202 `teach` bloğu: Türkçe dilbilgisi açıklaması */
export const GrammarNote = z.object({
  id: z.string().regex(/^gr:[ab][12]-\d\d:t\d+$/),
  unit: z.string(),
  h_tr: z.string(),
  tr: z.string(),
  table: z.object({ head: z.array(z.string()), rows: z.array(z.array(z.string())) }).optional(),
  ex: z.array(z.object({ de: z.string(), tr: z.string() })).default([])
});
export type GrammarNote = z.infer<typeof GrammarNote>;

/** Üretim maddesi: accepted[0] kanonik cevap; diğerleri kabul edilen varyantlar (kelime sırası alternatifleri dahil) */
const Accepted = z.array(z.string().min(1)).min(1);

export const DialogueLine = z.object({
  r: z.enum(["A", "B"]),
  de: z.string().min(1),
  tr: z.string().min(1),
  starter: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  hint_tr: z.string().optional(),
  accepted: z.array(z.string()).optional(),
  speed: Speed.optional(),
  /** WORLD.md karakter kimliği: bu satırı kim söylüyor (PM-042 A.6) */
  speaker: z.string().optional(),
  audio: Audio.optional(),
  sued: Sued
});
export const Dialogue = z.object({
  id: z.string(),
  title_tr: z.string(),
  roles: z.object({ A: z.string(), B: z.string() }),
  lines: z.array(DialogueLine).min(4)
});

/** Madde seçenekleri (PM-045 §4.2): strictNumberWords → sayı kelimeyle yazılmalı, rakam kabul edilmez */
const DrillOpts = { strictNumberWords: z.boolean().optional() };
const ListenQ = z.object({ kind: z.enum(["gist", "detail"]), q_tr: z.string(), opts: z.array(z.string()).min(2), ans: z.number().int().min(0) });
export const Drill = z.discriminatedUnion("k", [
  z.object({ id: z.string(), k: z.literal("gap"), de: z.string().includes("___"), tr: z.string(), accepted: Accepted, opts: z.array(z.string()).optional(), why_tr: z.string().optional(), ...DrillOpts }),
  z.object({ id: z.string(), k: z.literal("order"), de: z.string(), tr: z.string(), accepted: Accepted, why_tr: z.string().optional(), ...DrillOpts }),
  z.object({ id: z.string(), k: z.literal("pick"), q_tr: z.string(), opts: z.array(z.string()).min(2), ans: z.number().int().min(0), why_tr: z.string().optional(), ...DrillOpts }),
  z.object({ id: z.string(), k: z.literal("transform"), instr_tr: z.string(), from_de: z.string(), accepted: Accepted, why_tr: z.string().optional(), ...DrillOpts }),
  z.object({ id: z.string(), k: z.literal("guided_response"), situation_tr: z.string(), prompt_de: z.string(), accepted: Accepted, why_tr: z.string().optional(), ...DrillOpts }),
  z.object({ id: z.string(), k: z.literal("listen_and_respond"), audio_de: z.string(), speed: Speed, situation_tr: z.string().optional(), accepted: Accepted, why_tr: z.string().optional(), ...DrillOpts }),
  z.object({ id: z.string(), k: z.literal("tr_de"), tr: z.string(), accepted: Accepted, why_tr: z.string().optional(), ...DrillOpts })
]);
export type Drill = z.infer<typeof Drill>;
/** Üretim türleri (accepted ≥ 3 kuralı bunlara uygulanır; gap ve order tek kelime/tek dizilim olabildiği için ≥1) */
export const PRODUCTION_DRILLS = ["gap", "order", "transform", "guided_response", "listen_and_respond", "tr_de"] as const;

export const Scenario = z.object({
  id: ScenarioId,
  domain: z.string(),
  order: z.number().int(),
  level: Level,
  title_tr: z.string(),
  title_de: z.string(),
  goal_tr: z.string(),
  /** İnceleme durumu: "draft" içerik arayüzde "inceleme bekliyor" etiketiyle gösterilir */
  review: ReviewState,
  /** LS-17.0: "mini" = mevsim/küçük kapsamlı senaryo (azaltılmış asgari sayılar, aynı oynatıcı) */
  format: z.enum(["full", "mini"]).default("full"),
  /** Gerçek takvim (WORLD.md §6): bu tarihler arasında Bugün'de öne çıkar; AA-GG */
  season: z.object({ id: z.string(), from: z.string().regex(/^\d\d-\d\d$/), to: z.string().regex(/^\d\d-\d\d$/), title_tr: z.string() }).optional(),
  essentials: z.object({ lexemes: z.array(LexemeId), chunks: z.array(ChunkId), patterns: z.array(PatternId) }),
  /** OD-1/OD-7: bu senaryodan önce öğretilmiş olması gereken senaryolar (onların temel öğeleri "öğretilmiş" sayılır) */
  requires: z.array(ScenarioId).default([]),
  extras: z.object({ lexemes: z.array(LexemeId).default([]), chunks: z.array(ChunkId).default([]) }).default({ lexemes: [], chunks: [] }),
  chunks: z.array(Chunk).default([]),
  otherSide: z.array(z.object({ id: z.string(), de: z.string(), tr: z.string(), layer: LayerKey, speed: Speed, reductions: z.array(Reduction).optional() })).default([]),
  responses: z
    .array(z.object({ to: z.string(), options: z.array(z.object({ de: z.string(), tr: z.string(), register: Register.default("neutral") })).min(1) }))
    .default([]),
  /** Aşama 3: cümle kurma */
  build: z.array(z.object({ id: z.string(), prompt_tr: z.string(), accepted: Accepted, pattern: PatternId.optional(), chunk: ChunkId.optional(), ...DrillOpts })).default([]),
  /** Aşama 4: kontrollü alıştırma */
  drills: z.array(Drill).default([]),
  /** Aşama 5: en az 3 diyalog çeşidi (karşı taraf farklı tepki verir) */
  dialogues: z.array(Dialogue).default([]),
  /** Aşama 6: rol oyunu. Ölçülen: görevin başarılması (goals), hedef cümle eşleşmesi değil */
  roleplay: z.object({
    scene_tr: z.string(),
    partner_de: z.string(),
    opener_de: z.string(),
    goals: z.array(z.object({ id: z.string(), tr: z.string(), de: z.string() })).min(1),
    targets: z.array(z.string()).default([]),
    levels: z.array(z.object({ level: z.number().int().min(1).max(3), style_de: z.string(), speed: Speed })).default([]),
    surprises: z.array(z.object({ de: z.string(), tr: z.string() })).default([])
  }),
  listening: z
    .array(z.object({
      id: z.string(), title_tr: z.string(), speed: Speed, layer: LayerKey,
      /** D-065: hazır ses gelene kadar cihaz sesinin sunulacağı hızlar (en az 1); speed = başlangıç */
      speeds: z.array(Speed).min(1),
      script: z.array(z.object({ r: z.string(), de: z.string(), tr: z.string().optional(), reductions: z.array(Reduction).optional() })).min(1),
          qs: z.array(ListenQ).min(1)
    }))
    .default([]),
  speaking: z.array(z.object({ task_tr: z.string(), model_de: z.string(), hints_de: z.array(z.string()).default([]) })).default([]),
  missions: z.array(z.object({ id: z.string(), task_tr: z.string(), prep: z.array(ChunkId).default([]), escape_de: z.array(z.string()).default([]) })).default([]),
  mistakes_tr: z.array(z.string()).default([]),
  source: z.object({ legacyUnit: z.string().optional(), notes: z.string().optional() }).default({}),
  ...AnchorsNoRequires
});
export type Scenario = z.infer<typeof Scenario>;

/**
 * R0 temel paket dersi (PM-042 B.1, PM-045 §4.1): her şeyden önce gelen kısa dersler
 * (günler, aylar, sayılar, saat, tarih, soru kelimeleri, sein/haben, modal fiiller, harf harf söyleme).
 * Dosya: content/v2/temel/r0-NN-*.json. Biçim İçerik Motoru'nun r0-01-tage.json dosyasından.
 */
export const TemelDers = z.object({
  schema: z.literal(1),
  /** r0:NN-slug (dosya adı r0-NN-slug.json ile birebir) */
  id: z.string().regex(/^r0:\d{2}-[a-z0-9-]+$/),
  order: z.number().int().min(1),
  level: Level,
  format: z.literal("temel"),
  title_tr: z.string(), title_de: z.string(), goal_tr: z.string(),
  can_do: z.object({ id: z.string(), tr: z.string() }),
  unit: z.string(), arm: z.string(), place: z.string().optional(),
  characters: z.array(z.string()).default([]),
  /** OD-1 önkoşulları (türlerine göre) */
  requires: z.object({
    kelimeler: z.array(z.string()).default([]), kaliplar: z.array(z.string()).default([]), gramer: z.array(z.string()).default([]),
    tur: z.array(z.string()).default([]), baglayicilar: z.array(z.string()).default([]), akicilik: z.array(z.string()).default([])
  }),
  review: ReviewState,
  /** öğretim öğeleri: kart ön yüzü (de + tr + exp); lexeme varsa sözlük kartına bağlı */
  teach: z.array(z.object({ id: z.string(), de: z.string(), art: z.enum(["der", "die", "das"]).optional(), tr: z.string(), lexeme: z.string().optional(), exp: Explanation.optional(), audio: Audio.optional() })).min(1),
  table: z.object({ baslik_tr: z.string(), sutunlar: z.array(z.string()).min(1), satirlar: z.array(z.array(z.string())).min(1) }).optional(),
  drills: z.array(Drill).default([]),
  dialogue: z.object({ title_tr: z.string(), lines: z.array(DialogueLine).min(1) }).optional(),
  listening: z.array(z.object({
    id: z.string(), title_tr: z.string(), speed: Speed, speeds: z.array(Speed).min(1),
    script: z.array(z.object({ r: z.string(), de: z.string(), tr: z.string().optional(), speaker: z.string().optional() })).min(1),
    qs: z.array(ListenQ).min(1)
  })).default([]),
  /** seviye tespiti için ders başına maddeler (Drill biçiminde) */
  placement: z.array(Drill).default([]),
  mission: z.object({ task_tr: z.string() }).optional()
});
export type TemelDers = z.infer<typeof TemelDers>;

/** Senaryodaki üretim maddesi sayısı (≥80 kuralı) */
export function productionCount(s: Scenario): number {
  const drills = s.drills.filter((d) => (PRODUCTION_DRILLS as readonly string[]).includes(d.k)).length;
  const lines = s.dialogues.reduce((n, d) => n + d.lines.filter((l) => l.r === "B").length, 0);
  return s.build.length + drills + lines + s.speaking.length;
}

/* ---------- Seviye tespiti bankası ---------- */
const AssessBase = { id: z.string(), level: Level, source: z.string() };
export const AssessItem = z.discriminatedUnion("skill", [
  /** Almanca kelime → Türkçe anlamı seç (pasif kelime) */
  z.object({ ...AssessBase, skill: z.literal("vocab_passive"), de: z.string(), opts_tr: z.array(z.string()).length(4), ans: z.number().int().min(0).max(3) }),
  /** Türkçe → Almancasını yaz (aktif kelime). İsimlerde artikel istenir. */
  z.object({ ...AssessBase, skill: z.literal("vocab_active"), tr: z.string(), answers: z.array(z.string()).min(1), art: z.enum(["der", "die", "das"]).optional() }),
  /** Dinle → anlamını seç (hız: slow/normal/fast, cihaz sesiyle) */
  z.object({ ...AssessBase, skill: z.literal("listening"), de: z.string(), opts_tr: z.array(z.string()).min(2), ans: z.number().int() }),
  /** Kelimeleri sıraya koy (cümle kurma) */
  z.object({ ...AssessBase, skill: z.literal("building"), tr: z.string(), de: z.string(), alt: z.array(z.string()).default([]) }),
  /** Türkçesini gör → Almancasını söyle (konuşma tanıma) ya da yaz */
  z.object({ ...AssessBase, skill: z.literal("speaking"), tr: z.string(), de: z.string(), alt: z.array(z.string()).default([]) })
]);
export type AssessItem = z.infer<typeof AssessItem>;
export const AssessSkill = z.enum(["vocab_passive", "vocab_active", "listening", "building", "speaking"]);
export type AssessSkill = z.infer<typeof AssessSkill>;

/** Derlenmiş içerik paketinin indeksi (site/content/<ver>/index.json) */
/** H4 §2–§3: dünya (kurgusal şehir, kalıcı karakterler, 26 haftalık hikâye, gerçek takvim) — content/v2/world/world.json */
export const CharacterId = z.string().regex(/^ch:[a-z0-9-]+$/);
export const World = z.object({
  town: z.object({ id: z.string(), name: z.string(), kind: z.string(), desc_tr: z.string(), neighbourhood: z.string(), places: z.array(z.object({ id: z.string(), name: z.string(), domain: z.string(), tr: z.string() })).min(5) }),
  characters: z.array(z.object({
    id: CharacterId, name: z.string(), age: z.number().int(), role_tr: z.string(), rel_tr: z.string(), personality_tr: z.string(),
    mix: z.object({ hd: z.number(), alltag: z.number(), bair: z.number() }), speed: Speed, phrases: z.array(z.string()).min(2), bair_note: z.string().optional(), domains: z.array(z.string()).min(1)
  })).min(10).max(12),
  story: z.array(z.object({ week: z.number().int(), from: z.string(), title_de: z.string(), title_tr: z.string(), plot_tr: z.string(), characters: z.array(CharacterId).min(1), domains: z.array(z.string()).min(1), real_task_tr: z.string(), calendar: z.string().nullable() })).length(26),
  reserves: z.array(z.object({ id: z.string(), title_de: z.string(), title_tr: z.string(), plot_tr: z.string(), characters: z.array(CharacterId), domains: z.array(z.string()) })).default([]),
  calendar: z.array(z.object({ id: z.string(), when: z.string(), tr: z.string(), content: z.array(z.string()), source: z.string() })).min(1),
  review: ReviewState
});
export type World = z.infer<typeof World>;

export const ContentIndex = z.object({
  version: z.string(),
  builtAt: z.string(),
  domains: z.array(Domain),
  scenarios: z.array(z.object({ id: ScenarioId, domain: z.string(), order: z.number(), level: Level, title_tr: z.string(), title_de: z.string(), review: z.string(), format: z.enum(["full", "mini"]).default("full"), season: z.object({ id: z.string(), from: z.string(), to: z.string(), title_tr: z.string() }).optional() })),
  /** M1 İlk Hafta günleri (#58 A4): gün → başlık ve medya listesi (oynatıcı dosyayı `files.m1`'den yükler) */
  m1: z.array(z.object({ day: z.number().int(), id: z.string(), title_tr: z.string(), review: z.string(),
    /** günün yeni kartlarından Bahçe'ye kart olarak girenler (Bugün'deki "N yeni kelime"; plan sözlüğü yüklemez) */
    kartlar: z.array(z.string()).default([]),
    medya: z.array(z.object({ id: z.string(), kind: z.enum(["video", "sahne", "ses"]), title_tr: z.string() })) })).default([]),
  /** R0 temel dersler (#58 A5, Seans 2): sıra, başlık, inceleme durumu */
  temel: z.array(z.object({ id: z.string(), order: z.number().int(), title_tr: z.string(), title_de: z.string(), review: z.string() })).default([]),
  counts: z.object({ lexemes: z.number(), grammar: z.number(), assess: z.number(), scenarios: z.number() }),
  files: z.object({ lexemes: z.string(), grammar: z.string(), assess: z.string(), scenarios: z.record(z.string(), z.string()), m1: z.record(z.string(), z.string()).default({}), temel: z.record(z.string(), z.string()).default({}),
    /** paketteki medya dosyaları (servis işçisi ayrı önbelleğe alır; A12) */
    medya: z.array(z.string()).default([]) })
});
export type ContentIndex = z.infer<typeof ContentIndex>;
