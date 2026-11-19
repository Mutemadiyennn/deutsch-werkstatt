/**
 * Workers AI sağlayıcısı (PM 7022002310-5, "deneme"). Anahtar yok: Worker'ın `AI` bağlamı (hesap içi, ücretsiz pay).
 * Günlük nöron tavanı `policy.json`'da; sayaç KV'de hesap geneli (kullanıcı başına değil). Tavan dolunca istek gönderilmez,
 * istemci yapay zekâsız yola düşer. Nöron, modelin döndürdüğü token sayısından fiyat tablosuyla hesaplanır (üst tahmin).
 */
import { HttpError } from "../http.ts";
import type { Env } from "../env.ts";
import { dayKey } from "../quota.ts";
import policy from "../../policy.json";

export const WA = policy.workers_ai;
const nKey = (day: string) => `n:wa:${day}`;

export async function neuronUsage(env: Env, day = dayKey()) {
  return { day, used: Number((await env.QUOTA.get(nKey(day))) || 0), limit: WA.daily_neurons };
}

/** token → nöron (fiyat tablosu; bilinmeyen model en pahalı oranla) */
export function neurons(model: string, inTok: number, outTok: number): number {
  const t = (WA.neurons_per_million_tokens as Record<string, number[]>)[model] ?? [31876, 204805];
  return Math.ceil((inTok * t[0]! + outTok * t[1]!) / 1_000_000);
}

/** Tek çağrı: sistem + kullanıcı iletisi, JSON çıktı. Şema desteklenmezse bir kez şemasız dener. Döner: metin */
export async function generateWA(env: Env, model: string, system: string, user: string, timeoutMs: number, schema?: object): Promise<string> {
  if (!env.AI) throw new HttpError("not_configured", "AI binding");
  const u = await neuronUsage(env);
  if (u.used >= u.limit) throw new HttpError("quota_upstream", "neuron cap");
  const messages = [{ role: "system", content: system }, { role: "user", content: user }];
  const once = async (withSchema: boolean) => {
    let t: ReturnType<typeof setTimeout> | undefined;
    const sure = new Promise<never>((_, rej) => { t = setTimeout(() => rej(new HttpError("timeout")), timeoutMs); });
    try {
      return await Promise.race([
        env.AI!.run(model, { messages, max_tokens: WA.max_tokens, temperature: 0.4, ...(withSchema && schema ? { response_format: { type: "json_schema", json_schema: schema } } : {}) }),
        sure
      ]);
    } finally { clearTimeout(t); }
  };
  let r: { response?: unknown; usage?: { prompt_tokens?: number; completion_tokens?: number } };
  try {
    r = await once(!!schema);
  } catch (e) {
    if (e instanceof HttpError) throw e;
    if (!schema) throw new HttpError("upstream_busy", (e as Error).message);
    try { r = await once(false); } catch (e2) { throw e2 instanceof HttpError ? e2 : new HttpError("upstream_busy", (e2 as Error).message); }
  }
  const text = typeof r.response === "string" ? r.response : r.response != null ? JSON.stringify(r.response) : "";
  // sayaç: token yoksa karakterden tahmin (4 karakter ≈ 1 token)
  const inTok = r.usage?.prompt_tokens ?? Math.ceil((system.length + user.length) / 4);
  const outTok = r.usage?.completion_tokens ?? Math.ceil(text.length / 4);
  await env.QUOTA.put(nKey(u.day), String(u.used + neurons(model, inTok, outTok)), { expirationTtl: 3 * 86400 });
  if (!text) throw new HttpError("bad_output", "empty");
  return text;
}

/** Rol oyunu cevabı en çok N kelime: uzunsa cümle sınırında kısaltılır, tek cümle bile uzunsa kelimeden kesilir */
export function kisalt(s: string, n = WA.reply_max_words): string {
  const k = s.trim().split(/\s+/);
  if (k.length <= n) return s.trim();
  const cumleler = s.trim().match(/[^.!?]+[.!?]+["“”»«]?\s*/g) ?? [s];
  let out = "";
  for (const c of cumleler) { if ((out + c).trim().split(/\s+/).length > n) break; out += c; }
  return out.trim() || k.slice(0, n).join(" ");
}
