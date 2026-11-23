import { describe, it, expect, vi, beforeEach } from "vitest";
const onbellek = new Map<string, unknown>();
vi.mock("../data/db.ts", () => ({ cacheGet: async (k: string) => onbellek.get(k), cachePut: async (k: string, v: unknown) => { onbellek.set(k, v); } }));
import { ai, aiState, resetBreakerForTests } from "./ai.ts";
import { createApi } from "./api.ts";

const yanit = (output: unknown) => new Response(JSON.stringify({ task: "x", output, model: "m", ms: 1 }), { status: 200 });
const apiIle = (f: () => Promise<Response>) => createApi({ base: "https://api.test", token: async () => "t", fetch: f as any });
const EQ = { prompt_tr: "x", expected: ["a"], answer: "b" };

describe("yapay zekâ istemcisi: bozuk çıktı (PM-087 A.4)", () => {
  beforeEach(() => { onbellek.clear(); resetBreakerForTests(); });
  it("şemaya uymayan çıktı bad_output olur, ekrana ve önbelleğe girmez", async () => {
    for (const out of [{ ok: "evet" }, { reason_tr: "x" }, null, "metin"]) {
      await expect(ai(apiIle(async () => yanit(out)), "equiv_check", EQ)).rejects.toMatchObject({ code: "bad_output", retryable: true });
      resetBreakerForTests();
    }
    expect(onbellek.size).toBe(0);
  });
  it("rol oyununda boş cevap da bozuk sayılır", async () => {
    const v = { partner_de: "p", scene_tr: "s", goals_de: [], level: 1, history: [], stuck: 0 };
    await expect(ai(apiIle(async () => yanit({ reply_de: "", end: false })), "roleplay_turn", v as any)).rejects.toMatchObject({ code: "bad_output" });
  });
  it("geçerli çıktı döner ve önbelleğe girer; art arda 3 bozuk çıktı devre kesiciyi açar", async () => {
    const o = await ai(apiIle(async () => yanit({ ok: true, reason_tr: "Doğru." })), "equiv_check", EQ);
    expect(o).toEqual({ ok: true, reason_tr: "Doğru." }); expect(onbellek.size).toBe(1);
    const bozuk = apiIle(async () => yanit({ ok: 1 }));
    for (let i = 0; i < 3; i++) await ai(bozuk, "explain_tr", { de: `w${i}` }).catch(() => {});
    expect(aiState(bozuk).available).toBe(false);
  });
});
