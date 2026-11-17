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

export const Example = z.object({
  id: z.string(),
  de: z.string().min(1),
  tr: z.string().min(1),
  img: z.string().optional(),
  layer: z.enum(["hd", "alltag"]).default("hd")
});

export const Lexeme = z.object({
  id: LexemeId,
  de: z.string().min(1),
  tr: z.string().min(1),
  pos: z.enum(["noun", "verb", "adj", "phrase", "other"]),
  art: z.enum(["der", "die", "das"]).optional(),
  pl: z.string().optional(),
  verb: z
    .object({
      praesens3: z.string().optional(),
      praeteritum: z.string().optional(),
      perfekt: z.string().optional(),
      aux: z.enum(["haben", "sein"]).optional(),
      separable: z.string().optional(),
      reflexive: z.boolean().optional(),
      case: z.array(z.enum(["akk", "dat"])).optional(),
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
  /** v1 kaynakları: ünite + kurs motorundaki kelime anahtarı (kuWKey = "<ünite>:w:<de>"); ilerleme taşıma için */
  legacy: z.array(z.object({ unit: z.string(), key: z.string() })).default([])
});
export type Lexeme = z.infer<typeof Lexeme>;

export const BairLayer = z.object({
  text: z.string().min(1),
  status: z.enum(["verified", "uncertain"]),
  source: z.string().optional(),
  note_tr: z.string().optional()
});

export const Chunk = z.object({
  id: ChunkId,
  tr: z.string().min(1),
  lexemes: z.array(LexemeId).default([]),
  pattern: PatternId.optional(),
  register: Register.default("neutral"),
  layers: z.object({ hd: z.string().min(1), alltag: z.string().optional(), bair: BairLayer.optional() }),
  mistakes_tr: z.array(z.string()).default([])
});
export type Chunk = z.infer<typeof Chunk>;

export const Pattern = z.object({
  id: PatternId,
  frame: z.string().min(1),
  grammar_tr: z.string().min(5),
  examples: z.array(z.object({ de: z.string(), tr: z.string() })).min(1),
  grammarRef: z.string().optional()
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

export const DialogueLine = z.object({
  r: z.enum(["A", "B"]),
  de: z.string().min(1),
  tr: z.string().min(1),
  starter: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  hint_tr: z.string().optional()
});

export const Scenario = z.object({
  id: ScenarioId,
  domain: z.string(),
  order: z.number().int(),
  level: Level,
  title_tr: z.string(),
  title_de: z.string(),
  goal_tr: z.string(),
  /** İnceleme durumu: "draft" içerik arayüzde "inceleme bekliyor" etiketiyle gösterilir */
  review: z.object({ status: z.enum(["draft", "reviewed"]), by: z.string().optional(), at: z.string().optional() }),
  essentials: z.object({ lexemes: z.array(LexemeId), chunks: z.array(ChunkId), patterns: z.array(PatternId) }),
  extras: z.object({ lexemes: z.array(LexemeId).default([]), chunks: z.array(ChunkId).default([]) }).default({ lexemes: [], chunks: [] }),
  chunks: z.array(Chunk).default([]),
  otherSide: z.array(z.object({ id: z.string(), de: z.string(), tr: z.string(), layer: LayerKey.default("hd") })).default([]),
  responses: z
    .array(z.object({ to: z.string(), options: z.array(z.object({ de: z.string(), tr: z.string(), register: Register.default("neutral") })).min(1) }))
    .default([]),
  dialogue: z.object({
    title_tr: z.string(),
    roles: z.object({ A: z.string(), B: z.string() }),
    lines: z.array(DialogueLine).min(4)
  }),
  roleplay: z.object({
    scene_tr: z.string(),
    partner_de: z.string(),
    opener_de: z.string(),
    targets: z.array(z.string()).min(1)
  }),
  mistakes_tr: z.array(z.string()).default([]),
  source: z.object({ legacyUnit: z.string().optional() }).default({})
});
export type Scenario = z.infer<typeof Scenario>;

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
