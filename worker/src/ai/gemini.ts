/**
 * Gemini generateContent çağrısı. Anahtar URL'de değil başlıkta (x-goog-api-key) gider.
 * Model seçimi v1'deki gemModels mantığının sunucu sürümü: listeden en yeni "flash" / "flash-lite".
 */
import { HttpError } from "../http.ts";
import type { Env } from "../env.ts";

const BASE = "https://generativelanguage.googleapis.com/v1beta";

/** v1 (legacy.html gemModels) ile aynı kural: gemini + flash, görüntü/ses/canlı/gömme modelleri hariç; en yüksek sürüm, önizleme sona */
export function pickModels(names: string[]): { quick: string[]; full: string[] } {
  const ok = names.filter((n) => /gemini/i.test(n) && /flash/i.test(n) && !/image|tts|audio|live|embed|vision|8b|thinking/i.test(n));
  const ver = (n: string) => { const m = /gemini-(\d+(?:\.\d+)?)/.exec(n); return m ? parseFloat(m[1]!) : 0; };
  const sort = (a: string[]) =>
    a.slice().sort((x, y) => ver(y) - ver(x) || Number(/preview|exp/i.test(x)) - Number(/preview|exp/i.test(y)) || x.length - y.length);
  const lite = sort(ok.filter((n) => /lite/i.test(n)));
  const full = sort(ok.filter((n) => !/lite/i.test(n)));
  return { quick: [...lite.slice(0, 1), ...full.slice(0, 1)], full: [...full.slice(0, 1), ...lite.slice(0, 1)] };
}

let cache: { at: number; models: { quick: string[]; full: string[] } } | null = null;
export function resetModelCacheForTests() { cache = null; }

export async function models(env: Env): Promise<{ quick: string[]; full: string[] }> {
  if (env.GEMINI_MODELS) {
    const list = env.GEMINI_MODELS.split(",").map((s) => s.trim()).filter(Boolean);
    return { quick: list, full: list };
  }
  if (cache && Date.now() - cache.at < 6 * 3600 * 1000) return cache.models;
  const r = await fetch(`${BASE}/models?pageSize=200`, { headers: { "x-goog-api-key": env.GEMINI_KEY! } });
  if (!r.ok) throw mapStatus(r.status);
  const j = (await r.json()) as { models?: { name: string; supportedGenerationMethods?: string[] }[] };
  const names = (j.models || []).filter((m) => (m.supportedGenerationMethods || []).includes("generateContent")).map((m) => m.name.replace(/^models\//, ""));
  const picked = pickModels(names);
  if (!picked.quick.length) throw new HttpError("not_configured", "no flash model");
  cache = { at: Date.now(), models: picked };
  return picked;
}

export function mapStatus(status: number): HttpError {
  if (status === 429) return new HttpError("quota_upstream");
  if (status === 401 || status === 403) return new HttpError("not_configured", "gemini key rejected");
  if (status === 400) return new HttpError("invalid_request", "gemini 400");
  return new HttpError("upstream_busy", `gemini ${status}`);
}

/** Tek çağrı: JSON çıktı ister; metni döndürür */
export async function generateJSON(env: Env, model: string, system: string, user: string, timeoutMs: number, schema?: object): Promise<string> {
  try {
    return await generateOnce(env, model, system, user, timeoutMs, schema);
  } catch (e) {
    // Yapılandırılmış çıktı şeması bu modelde desteklenmiyorsa (400) bir kez şemasız dene
    if (schema && e instanceof HttpError && e.code === "invalid_request") return generateOnce(env, model, system, user, timeoutMs);
    throw e;
  }
}

async function generateOnce(env: Env, model: string, system: string, user: string, timeoutMs: number, schema?: object): Promise<string> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const r = await fetch(`${BASE}/models/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      signal: ac.signal,
      headers: { "Content-Type": "application/json", "x-goog-api-key": env.GEMINI_KEY! },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: user }] }],
        generationConfig: { responseMimeType: "application/json", ...(schema ? { responseJsonSchema: schema } : {}), temperature: 0.4, maxOutputTokens: 900 }
      })
    });
    if (!r.ok) throw mapStatus(r.status);
    const j = (await r.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = j.candidates?.[0]?.content?.parts?.map((p) => p.text || "").join("") || "";
    if (!text) throw new HttpError("bad_output", "empty");
    return text;
  } catch (e) {
    if (e instanceof HttpError) throw e;
    if ((e as Error).name === "AbortError") throw new HttpError("timeout");
    throw new HttpError("upstream_busy", (e as Error).message);
  } finally {
    clearTimeout(t);
  }
}
