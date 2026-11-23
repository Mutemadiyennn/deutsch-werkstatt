import { describe, it, expect, vi } from "vitest";
import { ERROR_TR } from "@dw/shared";
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
    // metin istemcinin öğrenci dilindeki karşılığından (sunucu metni değil; PM finali #218)
    await expect(api.ai("explain_tr", { de: "x" })).rejects.toMatchObject({ code: "quota_user", message_tr: ERROR_TR.quota_user.message_tr });
    const eski = createApi({ base: "https://api.test", token: async () => "t", fetch: (async () => ok({ error: { code: "internal", message_tr: "Sunucuda beklenmeyen bir hata oldu.", retryable: true } }, 500)) as any });
    const ie = await eski.ai("explain_tr", { de: "x" }).catch((x) => x);
    expect(ie.message_tr).toBe("Şu an cevap alamadım."); expect(ie.retryable).toBe(true);
    const api2 = createApi({ base: "https://api.test", token: async () => "t", fetch: (async () => { throw new TypeError("Failed to fetch"); }) as any });
    const e = await api2.usage().catch((x) => x);
    expect(e).toBeInstanceOf(ApiError);
    expect(e.message_tr).toContain("İnternet");
  });
  it("öğrenciye görünen hata metinlerinde teknik söz yok (sunucu, hata kodu, geçersiz istek; PM finali #218)", () => {
    for (const [k, v] of Object.entries(ERROR_TR)) expect(v.message_tr, k).not.toMatch(/sunucu|hata kodu|geçersiz|istek|beklenmeyen/i);
  });
  it("200 ama gövde JSON değilse bad_output (bozuk yanıt öğrenciye gitmez; PM-087 A.4)", async () => {
    for (const govde of ["<html>hata</html>", '{"output": {"ok": tr', ""]) {
      const api = createApi({ base: "https://api.test", token: async () => "t", fetch: (async () => new Response(govde, { status: 200 })) as any });
      await expect(api.ai("equiv_check", { prompt_tr: "x", expected: ["a"], answer: "b" })).rejects.toMatchObject({ code: "bad_output", retryable: true });
    }
  });
  it("giriş yoksa istek gönderilmez", async () => {
    const f = vi.fn();
    const api = createApi({ base: "https://api.test", token: async () => null, fetch: f as any });
    await expect(api.usage()).rejects.toMatchObject({ code: "unauthenticated" });
    expect(f).not.toHaveBeenCalled();
  });
});
