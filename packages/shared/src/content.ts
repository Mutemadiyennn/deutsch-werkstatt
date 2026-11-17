/**
 * İçerik sözleşmesi (v2). Tek doğruluk kaynağı: buradaki zod şemaları.
 * - İçerik dosyaları (content/v2/**) bu şemalarla doğrulanır (content/tools/validate.ts).
 * - Web istemcisi içerik paketini yüklerken aynı şemaları kullanır.
 * Kimlikler: lx:<lemma>[#n] · ch:<alan>:<slug> · pt:<slug> · sc:<alan>:<nn>-<slug> · gr:<v1-ünite>:<tN>
 */
import { z } from "zod";

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

export const Tier = z.enum(["K1", "K2", "K3"]);
export const Example = z.object({
  id: z.string(),
  de: z.string().min(1),
  tr: z.string().min(1),
  img: z.string().optional(),
  layer: z.enum(["hd", "alltag"]).default("hd"),
  /** Diyalog içinden örnek ("– … – …" biçiminde iki konuşmacı) */
  dialog: z.boolean().optional()
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
  legacy: z.array(z.object({ unit: z.string(), key: z.string() })).default([])
});
export type Lexeme = z.infer<typeof Lexeme>;

export const ReviewState = z.object({ status: z.enum(["draft", "reviewed"]), by: z.string().optional(), at: z.string().optional(), notes: z.string().optional() });
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
  /** İşlev: ne zaman, hangi tonla (özellikle Alltag işaretleri için) */
  use_tr: z.string().optional(),
  mistakes_tr: z.array(z.string()).default([])
});
export type Chunk = z.infer<typeof Chunk>;

export const Pattern = z.object({
  id: PatternId,
  frame: z.string().min(1),
  level: Level.default("A1"),
  core: z.boolean().default(false),
  /** 2–4 satır Türkçe not */
  grammar_tr: z.string().min(5),
  slots: z.array(z.object({ name: z.string(), fills: z.array(z.string()) })).default([]),
  examples: z.array(z.object({ de: z.string(), tr: z.string(), layer: z.enum(["hd", "alltag"]).default("hd") })).min(1),
  transforms: z
    .object({ question: z.string(), negative: z.string(), polite: z.string(), perfekt: z.string(), weil: z.string(), dass: z.string(), wenn: z.string() })
    .partial()
    .default({}),
  mistakes_tr: z.array(z.string()).default([]),
  grammarRef: z.string().optional(),
  review: ReviewState.optional()
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
  speed: Speed.optional()
});
export const Dialogue = z.object({
  id: z.string(),
  title_tr: z.string(),
  roles: z.object({ A: z.string(), B: z.string() }),
  lines: z.array(DialogueLine).min(4)
});

export const Drill = z.discriminatedUnion("k", [
  z.object({ id: z.string(), k: z.literal("gap"), de: z.string().includes("___"), tr: z.string(), accepted: Accepted, opts: z.array(z.string()).optional(), why_tr: z.string().optional() }),
  z.object({ id: z.string(), k: z.literal("order"), de: z.string(), tr: z.string(), accepted: Accepted, why_tr: z.string().optional() }),
  z.object({ id: z.string(), k: z.literal("pick"), q_tr: z.string(), opts: z.array(z.string()).min(2), ans: z.number().int().min(0), why_tr: z.string().optional() }),
  z.object({ id: z.string(), k: z.literal("transform"), instr_tr: z.string(), from_de: z.string(), accepted: Accepted, why_tr: z.string().optional() }),
  z.object({ id: z.string(), k: z.literal("guided_response"), situation_tr: z.string(), prompt_de: z.string(), accepted: Accepted, why_tr: z.string().optional() }),
  z.object({ id: z.string(), k: z.literal("listen_and_respond"), audio_de: z.string(), speed: Speed, situation_tr: z.string().optional(), accepted: Accepted, why_tr: z.string().optional() }),
  z.object({ id: z.string(), k: z.literal("tr_de"), tr: z.string(), accepted: Accepted, why_tr: z.string().optional() })
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
  essentials: z.object({ lexemes: z.array(LexemeId), chunks: z.array(ChunkId), patterns: z.array(PatternId) }),
  extras: z.object({ lexemes: z.array(LexemeId).default([]), chunks: z.array(ChunkId).default([]) }).default({ lexemes: [], chunks: [] }),
  chunks: z.array(Chunk).default([]),
  otherSide: z.array(z.object({ id: z.string(), de: z.string(), tr: z.string(), layer: LayerKey, speed: Speed, reductions: z.array(Reduction).optional() })).default([]),
  responses: z
    .array(z.object({ to: z.string(), options: z.array(z.object({ de: z.string(), tr: z.string(), register: Register.default("neutral") })).min(1) }))
    .default([]),
  /** Aşama 3: cümle kurma */
  build: z.array(z.object({ id: z.string(), prompt_tr: z.string(), accepted: Accepted, pattern: PatternId.optional(), chunk: ChunkId.optional() })).default([]),
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
      qs: z.array(z.object({ kind: z.enum(["gist", "detail"]), q_tr: z.string(), opts: z.array(z.string()).min(2), ans: z.number().int().min(0) })).min(1)
    }))
    .default([]),
  speaking: z.array(z.object({ task_tr: z.string(), model_de: z.string(), hints_de: z.array(z.string()).default([]) })).default([]),
  missions: z.array(z.object({ id: z.string(), task_tr: z.string(), prep: z.array(ChunkId).default([]), escape_de: z.array(z.string()).default([]) })).default([]),
  mistakes_tr: z.array(z.string()).default([]),
  source: z.object({ legacyUnit: z.string().optional(), notes: z.string().optional() }).default({})
});
export type Scenario = z.infer<typeof Scenario>;

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
export const ContentIndex = z.object({
  version: z.string(),
  builtAt: z.string(),
  domains: z.array(Domain),
  scenarios: z.array(z.object({ id: ScenarioId, domain: z.string(), order: z.number(), level: Level, title_tr: z.string(), title_de: z.string(), review: z.string() })),
  counts: z.object({ lexemes: z.number(), grammar: z.number(), assess: z.number(), scenarios: z.number() }),
  files: z.object({ lexemes: z.string(), grammar: z.string(), assess: z.string(), scenarios: z.record(z.string(), z.string()) })
});
export type ContentIndex = z.infer<typeof ContentIndex>;
