/**
 * İstemci ↔ Worker API sözleşmesi (v1).
 * Bütün istekler: Authorization: Bearer <Firebase ID token>.
 * Prompt metinleri istemcide DEĞİL, Worker'da durur; istemci yalnızca görev adı + değişken gönderir.
 */
import { z } from "zod";

export const API_VERSION = "v1";

export const ErrorCode = z.enum([
  "unauthenticated",
  "forbidden",
  "quota_user",
  "quota_upstream",
  "upstream_busy",
  "timeout",
  "bad_output",
  "invalid_request",
  "not_configured",
  "internal"
]);
export type ErrorCode = z.infer<typeof ErrorCode>;

export const ApiError = z.object({ error: z.object({ code: ErrorCode, message_tr: z.string(), retryable: z.boolean() }) });
export type ApiError = z.infer<typeof ApiError>;

/** Hata kodlarının Türkçe karşılıkları (istemci ve Worker aynı metni kullanır) */
export const ERROR_TR: Record<ErrorCode, { message_tr: string; retryable: boolean; status: number }> = {
  unauthenticated: { message_tr: "Oturumun sona ermiş. Lütfen yeniden giriş yap.", retryable: false, status: 401 },
  forbidden: { message_tr: "Bu hesabın sunucuya erişim izni yok.", retryable: false, status: 403 },
  quota_user: { message_tr: "Bugünkü yapay zekâ hakkın doldu. Yapay zekâsız alıştırmalarla devam edebilirsin.", retryable: false, status: 429 },
  quota_upstream: { message_tr: "Google'ın ücretsiz kullanım sınırına ulaşıldı. Biraz sonra tekrar dene.", retryable: true, status: 429 },
  upstream_busy: { message_tr: "Google sunucusu şu an yoğun (senin sınırın değil). Birazdan tekrar dene.", retryable: true, status: 503 },
  timeout: { message_tr: "Yanıt çok uzun sürdü. Tekrar deneyebilirsin.", retryable: true, status: 504 },
  bad_output: { message_tr: "Yapay zekâ geçersiz bir yanıt verdi. Tekrar dene.", retryable: true, status: 502 },
  invalid_request: { message_tr: "İstek geçersiz.", retryable: false, status: 400 },
  not_configured: { message_tr: "Sunucu henüz yapılandırılmamış (anahtar eksik).", retryable: false, status: 503 },
  internal: { message_tr: "Sunucuda beklenmeyen bir hata oldu.", retryable: true, status: 500 }
};

/* ---------- Yapay zekâ görev kaydı ---------- */
export const AiTasks = {
  /** Kural tabanlı eşleşmeyen bir cevabın beklenen cevaplarla anlamca ve dilbilgisi açısından eşdeğer olup olmadığı */
  equiv_check: {
    input: z.object({
      prompt_tr: z.string().max(300),
      expected: z.array(z.string().max(300)).min(1).max(6),
      answer: z.string().min(1).max(300)
    }),
    output: z.object({ ok: z.boolean(), reason_tr: z.string().max(300) }),
    tier: "quick" as const
  },
  /** Bir Almanca kelime ya da ifadenin bağlam içinde Türkçe açıklaması */
  explain_tr: {
    input: z.object({ de: z.string().min(1).max(120), context: z.string().max(400).optional() }),
    output: z.object({
      tr: z.string().max(200),
      note_tr: z.string().max(400),
      examples: z.array(z.object({ de: z.string().max(200), tr: z.string().max(200) })).max(3)
    }),
    tier: "quick" as const
  },
  /** "Bunu Almanca nasıl derim?" (TR→DE). Önce istemcide yerel arama yapılır; bulunamazsa çağrılır. */
  say_it_de: {
    input: z.object({ tr: z.string().min(1).max(200), level: z.enum(["A1", "A2", "B1"]).default("A2"), context_de: z.string().max(300).optional() }),
    output: z.object({ de_simple: z.string().max(200), paraphrase_de: z.string().max(200).optional(), note_tr: z.string().max(300).optional() }),
    tier: "quick" as const
  },
  /** PARTNER: yalnızca karakter olarak konuşur; öğretmenlik yapmaz, cümle söyletmez; takılınca sadeleşir */
  roleplay_turn: {
    input: z.object({
      partner_de: z.string().max(1500),
      scene_tr: z.string().max(800),
      goals_de: z.array(z.string().max(200)).max(8),
      level: z.number().int().min(1).max(3),
      style_de: z.string().max(600).optional(),
      surprise_de: z.string().max(400).optional(),
      history: z.array(z.object({ r: z.enum(["partner", "learner"]), de: z.string().max(600) })).max(40),
      stuck: z.number().int().min(0).max(10).default(0)
    }),
    output: z.object({ reply_de: z.string().min(1).max(400), end: z.boolean() }),
    tier: "default" as const // kalite gerekir (DECISIONS D-RP1); 12 sn kuralı istemcide yumuşak uyarıdır, çağrı kesilmez
  },
  /** GÖZLEMCİ: konuşma bittikten sonra; görev başarısı, en önemli 3 hata (Türkçe), eksikler */
  feedback_tr: {
    input: z.object({
      scene_tr: z.string().max(800),
      goals: z.array(z.object({ id: z.string(), de: z.string().max(200) })).max(8),
      transcript: z.array(z.object({ r: z.enum(["partner", "learner"]), de: z.string().max(600) })).min(1).max(60)
    }),
    output: z.object({
      goals: z.array(z.object({ id: z.string(), done: z.boolean() })),
      strengths_tr: z.array(z.string().max(300)).max(3),
      fixes: z.array(z.object({ said: z.string().max(300), better: z.string().max(300), why_tr: z.string().max(300) })).max(3),
      english_fallbacks: z.number().int().min(0),
      gaps_de: z.array(z.string().max(100)).max(10),
      summary_tr: z.string().max(500)
    }),
    tier: "default" as const
  }
} as const;
export type AiTaskName = keyof typeof AiTasks;
export type AiInput<T extends AiTaskName> = z.infer<(typeof AiTasks)[T]["input"]>;
export type AiOutput<T extends AiTaskName> = z.infer<(typeof AiTasks)[T]["output"]>;

export const AiRunRequest = z.object({ task: z.string(), vars: z.unknown(), idempotencyKey: z.string().max(80).optional() });
export interface AiRunResponse<T extends AiTaskName = AiTaskName> { task: T; output: AiOutput<T>; model: string; ms: number }

export interface PhotoResult { id: number; src: string; w: number; h: number; alt: string; credit: string; url: string }
export interface UsageResponse { day: string; ai: { used: number; limit: number } }
export interface HealthResponse { ok: true; version: string; time: string; configured: { gemini: boolean; pexels?: boolean; allowlist: boolean } }
