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
  }
} as const;
export type AiTaskName = keyof typeof AiTasks;
export type AiInput<T extends AiTaskName> = z.infer<(typeof AiTasks)[T]["input"]>;
export type AiOutput<T extends AiTaskName> = z.infer<(typeof AiTasks)[T]["output"]>;

export const AiRunRequest = z.object({ task: z.string(), vars: z.unknown(), idempotencyKey: z.string().max(80).optional() });
export interface AiRunResponse<T extends AiTaskName = AiTaskName> { task: T; output: AiOutput<T>; model: string; ms: number }

export interface UsageResponse { day: string; ai: { used: number; limit: number } }
export interface HealthResponse { ok: true; version: string; time: string; configured: { gemini: boolean; allowlist: boolean } }
