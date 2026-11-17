import { describe, it, expect, vi } from "vitest";
import { createApi, ApiError } from "./api.ts";

const ok = (b: unknown, status = 200) => new Response(JSON.stringify(b), { status });

describe("Worker istemcisi", () => {
  it("token Authorization başlığında gider; sunucu adresi yoksa not_configured", async () => {
    const f = vi.fn(async (_u: any, _i: any) => ok({ output: { ok: true, reason_tr: "Doğru." } }));
    const api = createApi({ base: "https://api.test", token: async () => "tok", fetch: f as any });
    const out = await api.ai("equiv_check", { prompt_tr: "x", expected: ["a"], answer: "b" });
    expect(out.ok).toBe(true);
    const [url, init] = f.mock.calls[0]!;
    expect(url).toBe("https://api.test/v1/ai/run");
    expect(init.headers.Authorization).toBe("Bearer tok");
    expect(JSON.parse(init.body)).toEqual({ task: "equiv_check", vars: { prompt_tr: "x", expected: ["a"], answer: "b" } });
    const none = createApi({ base: "", token: async () => "tok" });
    await expect(none.usage()).rejects.toMatchObject({ code: "not_configured" });
  });
  it("401 gelirse token bir kez yenilenip tekrar denenir", async () => {
    const tokens: boolean[] = [];
    const f = vi.fn().mockResolvedValueOnce(ok({ error: { code: "unauthenticated", message_tr: "x", retryable: false } }, 401)).mockResolvedValueOnce(ok({ day: "d", ai: { used: 1, limit: 300 } }));
    const api = createApi({ base: "https://api.test", token: async (force) => { tokens.push(!!force); return "t"; }, fetch: f as any });
    expect((await api.usage()).ai.used).toBe(1);
    expect(tokens).toEqual([false, true]);
  });
  it("sunucu hatası Türkçe mesajla ApiError olur; ağ hatası anlaşılır mesaj verir", async () => {
    const f = vi.fn(async () => ok({ error: { code: "quota_user", message_tr: "Bugünkü yapay zekâ hakkın doldu.", retryable: false } }, 429));
    const api = createApi({ base: "https://api.test", token: async () => "t", fetch: f as any });
    await expect(api.ai("explain_tr", { de: "x" })).rejects.toMatchObject({ code: "quota_user", message_tr: "Bugünkü yapay zekâ hakkın doldu." });
    const api2 = createApi({ base: "https://api.test", token: async () => "t", fetch: (async () => { throw new TypeError("Failed to fetch"); }) as any });
    const e = await api2.usage().catch((x) => x);
    expect(e).toBeInstanceOf(ApiError);
    expect(e.message_tr).toContain("İnternet");
  });
  it("giriş yoksa istek gönderilmez", async () => {
    const f = vi.fn();
    const api = createApi({ base: "https://api.test", token: async () => null, fetch: f as any });
    await expect(api.usage()).rejects.toMatchObject({ code: "unauthenticated" });
    expect(f).not.toHaveBeenCalled();
  });
});
