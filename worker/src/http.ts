import { ERROR_TR, type ErrorCode } from "@dw/shared";

export class HttpError extends Error {
  constructor(public code: ErrorCode, public detail?: string) { super(code); }
}

export function corsHeaders(origin: string | null, allowed: string): Record<string, string> {
  const list = allowed.split(",").map((s) => s.trim()).filter(Boolean);
  if (!origin || !list.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin"
  };
}

export function json(body: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extra }
  });
}

export function errorResponse(code: ErrorCode, extra: Record<string, string> = {}): Response {
  const e = ERROR_TR[code];
  return json({ error: { code, message_tr: e.message_tr, retryable: e.retryable } }, e.status, extra);
}
