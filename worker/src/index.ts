/**
 * Deutsch Werkstatt API (Cloudflare Worker).
 *   GET  /v1/health   — kimlik gerekmez; yalnızca yapılandırma durumu (gizli değer döndürmez)
 *   GET  /v1/usage    — günlük yapay zekâ kullanımı
 *   POST /v1/ai/run   — { task, vars } → { task, output, model, ms }
 *   GET  /v1/pixabay  — MEDYA aracı: yalnız RAF_ARAC_JETONU ile (pixabay.ts)
 */
import { AiRunRequest, type HealthResponse } from "@dw/shared";
import { authenticate } from "./auth.ts";
import { HttpError, corsHeaders, errorResponse, json } from "./http.ts";
import { aiUsage, takeAi } from "./quota.ts";
import { runTask } from "./ai/tasks.ts";
import { searchPhotos } from "./photos.ts";
import { aracJetonu, pixabayAra } from "./pixabay.ts";
import { VERSION, type Env } from "./env.ts";

export async function handle(req: Request, env: Env): Promise<Response> {
  const url = new URL(req.url);
  const cors = corsHeaders(req.headers.get("Origin"), env.ALLOWED_ORIGINS || "");
  if (req.method === "OPTIONS") return new Response(null, { status: Object.keys(cors).length ? 204 : 403, headers: cors });
  try {
    if (url.pathname === "/v1/health" && req.method === "GET") {
      const body: HealthResponse = { ok: true, version: VERSION, time: new Date().toISOString(), provider: (env.AI_PROVIDER || "none").trim(), configured: { gemini: !!env.GEMINI_KEY && (env.AI_PROVIDER || "").trim() === "gemini", workers_ai: !!env.AI && (env.AI_PROVIDER || "").trim() === "workers-ai", pexels: !!env.PEXELS_KEY, pixabay: !!env.PIXABAY_KEY && (env.RAF_ARAC_JETONU ?? "").trim().length >= 32, allowlist: !!(env.ALLOWED_UIDS || "").trim() } };
      return json(body, 200, cors);
    }
    if (url.pathname === "/v1/usage" && req.method === "GET") {
      const u = await authenticate(req, env);
      const a = await aiUsage(env, u.uid);
      return json({ day: a.day, ai: { used: a.used, limit: a.limit } }, 200, cors);
    }
    if (url.pathname === "/v1/photos" && req.method === "GET") {
      await authenticate(req, env);
      const photos = await searchPhotos(env, url.searchParams.get("q") || "", Math.min(8, Number(url.searchParams.get("n") || 8)));
      return json({ photos }, 200, { ...cors, "Cache-Control": "private, max-age=86400" });
    }
    if (url.pathname === "/v1/pixabay" && req.method === "GET") {
      // yanlış jeton: gövdesi genel "bulunamadı" ile aynı 404; sabit gecikme jeton denemeyi yavaşlatır (uç gizlenmez)
      if (!(await aracJetonu(req, env))) return json({ error: { code: "invalid_request", message_tr: "Bulunamadı.", retryable: false } }, 404, cors);
      const hits = await pixabayAra(env, url.searchParams.get("q") || "", Number(url.searchParams.get("n") || 20), url.searchParams.get("lang") || "en");
      return json({ hits }, 200, cors);
    }
    if (url.pathname === "/v1/ai/run" && req.method === "POST") {
      const u = await authenticate(req, env);
      const len = Number(req.headers.get("Content-Length") || 0);
      if (len > 16 * 1024) throw new HttpError("invalid_request", "too large");
      let body: unknown;
      try { body = await req.json(); } catch { throw new HttpError("invalid_request", "json"); }
      const p = AiRunRequest.safeParse(body);
      if (!p.success) throw new HttpError("invalid_request");
      // İnceleme #41 P1-3: sağlayıcı kapalıysa kota sayacına hiç yazılmaz
      const prov = (env.AI_PROVIDER || "none").trim();
      if (!(prov === "gemini" || (prov === "workers-ai" && env.AI))) throw new HttpError("not_configured", "ai_disabled");
      await takeAi(env, u.uid);
      const t0 = Date.now();
      const r = await runTask(env, p.data.task, p.data.vars);
      return json({ task: p.data.task, output: r.output, model: r.model, ms: Date.now() - t0 }, 200, cors);
    }
    return json({ error: { code: "invalid_request", message_tr: "Bulunamadı.", retryable: false } }, 404, cors);
  } catch (e) {
    if (e instanceof HttpError) return errorResponse(e.code, cors);
    return errorResponse("internal", cors);
  }
}

export default { fetch: (req: Request, env: Env) => handle(req, env) };
