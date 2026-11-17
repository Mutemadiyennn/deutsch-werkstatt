/**
 * Kullanıcı verisi sözleşmesi (v2). Kişisel ayrıntı içermez: yalnızca öğrenme durumu ve ayarlar.
 * Cihazda IndexedDB'de (web/src/data/db.ts) tutulur.
 */
import { z } from "zod";
import { AssessSkill, Level, Speed } from "./content.ts";

export const Activity = z.enum(["vocab", "chunks", "build", "drills", "listening", "pronunciation", "dialogue", "roleplay", "review", "assess", "other"]);
export type Activity = z.infer<typeof Activity>;

/** Pomodoro'nun önerilen 4 seansı (kullanıcı değiştirebilir) */
export const DEFAULT_SESSION_PLAN: Activity[][] = [
  ["vocab", "chunks"],
  ["build", "drills"],
  ["listening", "pronunciation"],
  ["dialogue", "roleplay", "review"]
];

/** 20 alan, PEDAGOGY.md §4 öncelik sırasıyla */
export const DOMAIN_IDS = ["strategie", "telefon", "arzt", "arbeit", "smalltalk", "einkaufen", "essen", "amt", "bank", "wohnen", "friseur", "sport", "verkehr", "post", "werkstatt", "notfall", "freizeit", "gefuehle", "medien", "bairisch"] as const;
/** Faz 3'teki 13 alanlık kimliklerden yenilerine geçiş (kayıtlı profiller için) */
export const DOMAIN_RENAMES: Record<string, string> = { einkauf: "einkaufen", nachbarn: "smalltalk" };
export function migrateDomainPriority(list: string[]): string[] {
  const mapped = list.map((d) => DOMAIN_RENAMES[d] || d).filter((d) => (DOMAIN_IDS as readonly string[]).includes(d));
  const seen = new Set<string>();
  const out = [...mapped, ...DOMAIN_IDS].filter((d) => (seen.has(d) ? false : (seen.add(d), true)));
  // strateji her zaman ilk sırada (PEDAGOGY §4)
  return ["strategie", ...out.filter((d) => d !== "strategie")];
}

export const Profile = z.object({
  id: z.literal("me"),
  schemaVersion: z.literal(1),
  createdAt: z.string(),
  onboardedAt: z.string().optional(),
  /** Yalnızca bu cihazda gösterilen isteğe bağlı hitap; eşitlenmez */
  displayName: z.string().max(40).optional(),
  ui: z.object({
    theme: z.enum(["auto", "light", "dark"]).default("auto"),
    sfx: z.boolean().default(true),
    celebrations: z.boolean().default(true),
    textScale: z.number().min(0.85).max(1.4).default(1)
  }),
  teaching: z.object({
    explainLang: z.literal("tr").default("tr"),
    englishBridge: z.literal(false).default(false),
    correction: z.object({ guided: z.literal("immediate"), independent: z.literal("after") }).default({ guided: "immediate", independent: "after" })
  }),
  focus: z.object({
    dailyGoalMin: z.number().int().min(15).max(240).default(100),
    workMin: z.number().int().min(10).max(60).default(25),
    breakMin: z.number().int().min(3).max(15).default(5),
    longBreakMin: z.number().int().min(10).max(45).default(20),
    sessionPlan: z.array(z.array(Activity)).length(4).default(DEFAULT_SESSION_PLAN),
    weekly: z.object({ days: z.number().int().min(1).max(7).default(5), minPerDay: z.number().int().min(15).max(240).default(100) }).default({ days: 5, minPerDay: 100 })
  }),
  domains: z.object({ priority: z.array(z.string()).min(1), paused: z.array(z.string()).default([]) }),
  listening: z.object({ startSpeed: z.enum(["slow", "normal"]).default("slow") }),
  goals: z.object({
    examB1: z.object({ enabled: z.boolean(), date: z.string().optional() }).default({ enabled: false }),
    vhs: z.object({ enabled: z.boolean() }).default({ enabled: false })
  }),
  /** Kendi beyanı: zor bulunan durumlar (planlayıcının alan önceliğini besler) */
  struggles: z.array(z.enum(["phone", "spontaneous", "fast", "work", "bavarian", "switch_english"])).default([])
});
export type Profile = z.infer<typeof Profile>;

export function defaultProfile(now = new Date()): Profile {
  return Profile.parse({
    id: "me",
    schemaVersion: 1,
    createdAt: now.toISOString(),
    ui: {},
    teaching: {},
    focus: {},
    domains: { priority: [...DOMAIN_IDS] },
    listening: {},
    goals: {}
  });
}

/* ---------- Odak (Pomodoro v2) ---------- */
export interface FocusSegment { activity: Activity; refId?: string; sec: number }
export type FocusStatus = "running" | "completed" | "interrupted" | "abandoned";
export interface FocusSession {
  id: string;
  n: number; // 1..4, 5+ = bonus
  plannedActivity: Activity;
  startedAt: string;
  endedAt?: string;
  focusSec: number;
  breakSecAfter: number;
  status: FocusStatus;
  interruptions: number;
  segments: FocusSegment[];
}
export interface FocusDay {
  date: string; // YYYY-MM-DD (yerel)
  goalMin: number;
  focusSec: number;
  breakSec: number;
  longBreakSec: number;
  sessions: FocusSession[];
  goalHitAt?: string;
  legacy?: boolean;
  u: number;
}

/* ---------- Öğrenci modeli ---------- */
/** FSRS kart durumu (ts-fsrs Card, tarihler ISO) */
export interface FsrsState { due: string; stability: number; difficulty: number; scheduled_days: number; reps: number; lapses: number; learning_steps: number; state: number; last_review?: string }
export interface Strength { s: number; n: number; ok: number; last?: string; due?: string; fsrs?: FsrsState }
export interface LearnerItem {
  itemId: string;
  kind: "lexeme" | "chunk" | "pattern";
  passive: Strength;
  active: Strength & { sessions: string[] };
  durable: boolean;
  gaps: { type: "passive" | "active" | "structure"; source: "drill" | "tap" | "convo" | "assess" | "sayit"; at: string; ctx?: string }[];
  inBank: boolean;
  u: number;
}

export interface ScenarioProgress {
  scenarioId: string;
  /** Tamamlanan bölümler: words, chunks, build, drills, listening, dialogue, roleplay */
  done: string[];
  support: 0 | 1 | 2 | 3;
  runs: { at: string; section: string; score: number; total: number; level?: number; goalsDone?: number; goalsTotal?: number; englishFallbacks?: number; mode?: "ai" | "offline"; ms?: number; msPerCard?: number; recallOk?: number; recallTotal?: number }[];
  completedIndependentAt?: string;
  u: number;
}
/** "Benim cevabım da doğru" kayıtları → içerik iyileştirme kuyruğu */
export interface AnswerClaim { id?: number; at: string; scenarioId?: string; itemId: string; prompt: string; answer: string; expected: string[] }
/** K3: öğrencinin dışarıda duyup eklediği kelime */
export interface PersonalWord { id: string; de: string; tr?: string; note?: string; at: string; source: "heard" | "tap" | "sayit" }

/* ---------- Seviye tespiti ---------- */
export interface AssessAnswer {
  itemId: string;
  skill: AssessSkill;
  level: Level;
  correct: boolean;
  /** listening için hız; speaking için "voice" | "typed" */
  mode?: Speed | "voice" | "typed";
  given?: string;
  ms: number;
  /** "Bilmiyorum" dendi mi */
  skipped?: boolean;
  /** Yapay zekâ eşdeğerlik kontrolüyle kabul edildi mi */
  aiAccepted?: boolean;
}
export interface SkillResult { skill: AssessSkill; correct: number; total: number; byLevel: Record<Level, { correct: number; total: number }>; estimate: Level | "below-A1"; confidence: "low" | "medium" | "high" }
export interface Assessment {
  id: string;
  type: "placement" | "monthly";
  startedAt: string;
  finishedAt?: string;
  answers: AssessAnswer[];
  results?: SkillResult[];
  listeningBySpeed?: Partial<Record<Speed, { correct: number; total: number }>>;
  overall?: Level | "below-A1";
  summaryTr?: string;
  u: number;
}
