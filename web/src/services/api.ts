/**
 * Worker istemcisi. Her istekte Firebase ID token gönderilir; anahtar ve prompt istemcide YOK.
 * Sunucu adresi derleme ayarıdır (VITE_API_BASE). Tanımlı değilse yapay zekâ özellikleri "sunucu bağlı değil" der
 * ve uygulama yapay zekâsız akışla devam eder.
 */
import { ApiError as ApiErrorSchema, ERROR_TR, type AiInput, type AiOutput, type AiTaskName, type ErrorCode, type HealthResponse, type PhotoResult, type UsageResponse } from "@dw/shared";

export class ApiError extends Error {
  constructor(public code: ErrorCode, public message_tr: string, public retryable: boolean) { super(code); }
}
const err = (code: ErrorCode) => new ApiError(code, ERROR_TR[code].message_tr, ERROR_TR[code].retryable);

export interface ApiDeps { base: string; token: (force?: boolean) => Promise<string | null>; fetch?: typeof fetch }

export function createApi(d: ApiDeps) {
  const f = d.fetch || ((...a: Parameters<typeof fetch>) => fetch(...a));
  async function call<T>(path: string, init: RequestInit & { auth?: boolean; timeoutMs?: number } = {}): Promise<T> {
    if (!d.base) throw err("not_configured");
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), init.timeoutMs ?? 20_000);
    try {
      const go = async (force: boolean) => {
        const headers: Record<string, string> = { "Content-Type": "application/json" };
        if (init.auth !== false) {
          const tok = await d.token(force);
          if (!tok) throw err("unauthenticated");
          headers.Authorization = `Bearer ${tok}`;
        }
        return f(d.base.replace(/\/$/, "") + path, { ...init, headers, signal: ac.signal });
      };
      let r = await go(false);
      if (r.status === 401 && init.auth !== false) r = await go(true); // süresi dolmuş token: bir kez yenile
      const body = await r.json().catch(() => null);
      if (!r.ok) {
        const p = ApiErrorSchema.safeParse(body);
        if (p.success) throw new ApiError(p.data.error.code, p.data.error.message_tr, p.data.error.retryable);
        throw err(r.status === 503 ? "upstream_busy" : r.status === 429 ? "quota_upstream" : r.status === 502 ? "bad_output" : r.status === 504 ? "timeout" : "internal");
      }
      return body as T;
    } catch (e) {
      if (e instanceof ApiError) throw e;
      if ((e as Error).name === "AbortError") throw err("timeout");
      throw new ApiError("upstream_busy", "Sunucuya ulaşılamadı. İnternet bağlantını kontrol et.", true);
    } finally {
      clearTimeout(t);
    }
  }
  return {
    configured: !!d.base,
    health: () => call<HealthResponse>("/v1/health", { auth: false, timeoutMs: 8000 }),
    usage: () => call<UsageResponse>("/v1/usage"),
    photos: async (q: string) => (await call<{ photos: PhotoResult[] }>(`/v1/photos?q=${encodeURIComponent(q)}&n=6`, { timeoutMs: 9000 })).photos,
    ai: async <T extends AiTaskName>(task: T, vars: AiInput<T>, timeoutMs = 15_000) =>
      (await call<{ output: AiOutput<T> }>("/v1/ai/run", { method: "POST", body: JSON.stringify({ task, vars }), timeoutMs })).output
  };
}
export type Api = ReturnType<typeof createApi>;
