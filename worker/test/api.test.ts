import { describe, it, expect, beforeAll, beforeEach, vi, afterEach } from "vitest";
import { generateKeyPair, exportJWK, SignJWT, createLocalJWKSet } from "jose";
import { handle } from "../src/index.ts";
import { setJwksForTests } from "../src/auth.ts";
import { pickModels, resetModelCacheForTests, generateJSON } from "../src/ai/gemini.ts";
import type { Env, KV } from "../src/env.ts";

const PROJECT = "deutsch-sync";
let priv: CryptoKey;
let otherPriv: CryptoKey;

function memKV(): KV & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, async get(k) { return data.get(k) ?? null; }, async put(k, v) { data.set(k, v); } };
}
function env(over: Partial<Env> = {}): Env {
  return { GEMINI_KEY: "test-gemini-key", ALLOWED_UIDS: "uid-ok", FIREBASE_PROJECT_ID: PROJECT, ALLOWED_ORIGINS: "https://app.test", AI_DAILY_LIMIT: "300", QUOTA: memKV(), ...over };
}
async function token(o: { sub?: string; aud?: string; iss?: string; exp?: number; key?: CryptoKey } = {}) {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ auth_time: now - 10 })
    .setProtectedHeader({ alg: "RS256", kid: "k1" })
    .setSubject(o.sub ?? "uid-ok")
    .setAudience(o.aud ?? PROJECT)
    .setIssuer(o.iss ?? `https://securetoken.google.com/${PROJECT}`)
    .setIssuedAt(now - 10)
    .setExpirationTime(o.exp ?? now + 3600)
    .sign(o.key ?? priv);
}
const req = (path: string, init: RequestInit & { tok?: string } = {}) =>
  new Request(`https://api.test${path}`, { ...init, headers: { ...(init.tok ? { Authorization: `Bearer ${init.tok}` } : {}), "Content-Type": "application/json", Origin: "https://app.test", ...(init.headers as any) } });
const run = (tok: string, task: string, vars: unknown) => req("/v1/ai/run", { method: "POST", tok, body: JSON.stringify({ task, vars }) });
const EQ = { prompt_tr: "Randevu almak istiyorum.", expected: ["Ich möchte einen Termin machen."], answer: "Ich will einen Termin machen." };

/** Sahte Gemini: model listesi + sıralı generateContent yanıtları */
function mockGemini(responses: Array<{ status?: number; text?: string } | "hang">) {
  const calls: { url: string; headers: Headers; body?: any }[] = [];
  let i = 0;
  vi.stubGlobal("fetch", vi.fn(async (url: string, init: RequestInit = {}) => {
    calls.push({ url, headers: new Headers(init.headers), body: init.body ? JSON.parse(String(init.body)) : undefined });
    if (url.includes("/models?")) {
      return new Response(JSON.stringify({ models: ["gemini-2.5-flash", "gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.5-flash-preview-tts", "gemini-3.8-live", "text-embedding-004"].map((n) => ({ name: "models/" + n, supportedGenerationMethods: ["generateContent"] })) }));
    }
    const r = responses[i++] ?? { status: 500 };
    if (r === "hang") return new Promise((_, rej) => init.signal?.addEventListener("abort", () => { const e = new Error("aborted"); e.name = "AbortError"; rej(e); }));
    if (r.status && r.status !== 200) return new Response("{}", { status: r.status });
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: r.text }] } }] }));
  }));
  return calls;
}

beforeAll(async () => {
  const kp = await generateKeyPair("RS256", { extractable: true });
  priv = kp.privateKey as CryptoKey;
  const jwk = { ...(await exportJWK(kp.publicKey)), kid: "k1", alg: "RS256", use: "sig" };
  setJwksForTests(createLocalJWKSet({ keys: [jwk] }));
  otherPriv = (await generateKeyPair("RS256", { extractable: true })).privateKey as CryptoKey;
});
beforeEach(() => resetModelCacheForTests());
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("health ve CORS", () => {
  it("health kimlik istemez ve gizli değer döndürmez", async () => {
    const r = await handle(req("/v1/health"), env());
    expect(r.status).toBe(200);
    const t = await r.text();
    expect(JSON.parse(t).configured).toEqual({ gemini: true, allowlist: true });
    expect(t).not.toContain("test-gemini-key");
    expect(r.headers.get("Access-Control-Allow-Origin")).toBe("https://app.test");
  });
  it("izinsiz kaynağa CORS başlığı verilmez, OPTIONS reddedilir", async () => {
    const r = await handle(new Request("https://api.test/v1/health", { headers: { Origin: "https://evil.test" } }), env());
    expect(r.headers.get("Access-Control-Allow-Origin")).toBeNull();
    const o = await handle(new Request("https://api.test/v1/ai/run", { method: "OPTIONS", headers: { Origin: "https://evil.test" } }), env());
    expect(o.status).toBe(403);
  });
});

describe("kimlik doğrulama", () => {
  it("token yoksa 401", async () => {
    const r = await handle(req("/v1/usage"), env());
    expect(r.status).toBe(401);
    expect((await r.json()).error.code).toBe("unauthenticated");
  });
  it("süresi dolmuş, yanlış aud, yanlış iss, yanlış imza → 401", async () => {
    const now = Math.floor(Date.now() / 1000);
    for (const t of [await token({ exp: now - 120 }), await token({ aud: "other" }), await token({ iss: "https://securetoken.google.com/other" }), await token({ key: otherPriv })]) {
      const r = await handle(req("/v1/usage", { tok: t }), env());
      expect(r.status).toBe(401);
    }
  });
  it("izin listesinde olmayan uid → 403; izin listesi boşsa herkes reddedilir", async () => {
    expect((await handle(req("/v1/usage", { tok: await token({ sub: "uid-x" }) }), env())).status).toBe(403);
    expect((await handle(req("/v1/usage", { tok: await token() }), env({ ALLOWED_UIDS: "" }))).status).toBe(403);
  });
  it("geçerli token → kullanım bilgisi", async () => {
    const r = await handle(req("/v1/usage", { tok: await token() }), env());
    expect(r.status).toBe(200);
    expect((await r.json()).ai).toEqual({ used: 0, limit: 300 });
  });
});

describe("/v1/ai/run", () => {
  it("equiv_check: anahtar başlıkta gider (URL'de değil), hızlı görevde en yeni flash-lite seçilir", async () => {
    const calls = mockGemini([{ text: '{"ok": false, "reason_tr": "\'will\' kaba durur; kibar istek için \'möchte\'."}' }]);
    const r = await handle(run(await token(), "equiv_check", EQ), env());
    expect(r.status).toBe(200);
    const j = await r.json();
    expect(j.output.ok).toBe(false);
    expect(j.model).toBe("gemini-3.5-flash-lite");
    for (const c of calls) { expect(c.url).not.toContain("key="); expect(c.headers.get("x-goog-api-key")).toBe("test-gemini-key"); }
    expect(calls[1]!.body.generationConfig.responseMimeType).toBe("application/json");
    expect(JSON.stringify(calls[1]!.body)).toContain("Ich will einen Termin machen.");
  });
  it("bilinmeyen görev ve geçersiz girdi → 400", async () => {
    mockGemini([]);
    expect((await handle(run(await token(), "nope", {}), env())).status).toBe(400);
    expect((await handle(run(await token(), "equiv_check", { answer: "" }), env())).status).toBe(400);
  });
  it("anahtar yoksa not_configured", async () => {
    const r = await handle(run(await token(), "equiv_check", EQ), env({ GEMINI_KEY: undefined }));
    expect((await r.json()).error.code).toBe("not_configured");
  });
  it("ilk model 503 → yedek modele geçer", async () => {
    mockGemini([{ status: 503 }, { text: '{"ok": true, "reason_tr": "Doğru."}' }]);
    const j = await (await handle(run(await token(), "equiv_check", EQ), env())).json();
    expect(j.output.ok).toBe(true);
    expect(j.model).toBe("gemini-3.5-flash");
  });
  it("Google 429 → quota_upstream (429); iki model de 503 → upstream_busy (503)", async () => {
    mockGemini([{ status: 429 }, { status: 429 }]);
    const r1 = await handle(run(await token(), "equiv_check", EQ), env());
    expect(r1.status).toBe(429);
    expect((await r1.json()).error.code).toBe("quota_upstream");
    mockGemini([{ status: 503 }, { status: 503 }]);
    const r2 = await handle(run(await token(), "equiv_check", EQ), env());
    expect(r2.status).toBe(503);
    expect((await r2.json()).error.message_tr).toContain("senin sınırın değil");
  });
  it("geçersiz model çıktısı → yedek; ikisi de geçersizse bad_output (502)", async () => {
    mockGemini([{ text: "kein json" }, { text: '{"ok": "yes"}' }]);
    const r = await handle(run(await token(), "equiv_check", EQ), env());
    expect(r.status).toBe(502);
    expect((await r.json()).error.code).toBe("bad_output");
  });
  it("zaman bütçesi aşılınca timeout; iki model de takılırsa 504", async () => {
    mockGemini(["hang"]);
    await expect(generateJSON(env(), "m1", "s", "u", 40)).rejects.toMatchObject({ code: "timeout" });
  });
  it("günlük kota dolunca quota_user (429), sayaç KV'de", async () => {
    mockGemini([{ text: '{"ok":true,"reason_tr":"Doğru."}' }, { text: '{"ok":true,"reason_tr":"Doğru."}' }]);
    const e = env({ AI_DAILY_LIMIT: "2" });
    const t = await token();
    expect((await handle(run(t, "equiv_check", EQ), e)).status).toBe(200);
    expect((await handle(run(t, "equiv_check", EQ), e)).status).toBe(200);
    const r = await handle(run(t, "equiv_check", EQ), e);
    expect(r.status).toBe(429);
    expect((await r.json()).error.code).toBe("quota_user");
  });
  it("explain_tr çıktısı şemaya uyar", async () => {
    mockGemini([{ text: '{"tr":"(telefonda) hoşça kalın","note_tr":"Yalnızca telefonda kullanılır.","examples":[{"de":"Danke, auf Wiederhören!","tr":"Teşekkürler, hoşça kalın!"}]}' }]);
    const j = await (await handle(run(await token(), "explain_tr", { de: "Auf Wiederhören" }), env())).json();
    expect(j.output.examples).toHaveLength(1);
  });
});

describe("model seçimi (v1 kuralı)", () => {
  it("ses/canlı/gömme modellerini dışlar, en yeni sürümü ve önizleme olmayanı seçer", () => {
    const m = pickModels(["gemini-2.5-flash", "gemini-3.5-flash-preview-05", "gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.5-flash-preview-tts", "gemini-3.8-live", "gemini-2.0-flash-lite"]);
    expect(m.quick).toEqual(["gemini-3.5-flash-lite", "gemini-3.5-flash"]);
    expect(m.full).toEqual(["gemini-3.5-flash", "gemini-3.5-flash-lite"]);
  });
});
