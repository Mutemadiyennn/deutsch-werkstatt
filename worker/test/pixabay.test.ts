import { afterEach, describe, expect, it, vi } from "vitest";
import { handle } from "../src/index.ts";
import { aracJetonu, PIXABAY_GUNLUK } from "../src/pixabay.ts";
import type { Env, KV } from "../src/env.ts";

const JETON = "j".repeat(40), ANAHTAR = "pixabay-gizli-anahtar";
function memKV(): KV & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return { data, async get(k) { return data.get(k) ?? null; }, async put(k, v) { data.set(k, v); } };
}
const env = (o: Partial<Env> = {}): Env => ({ FIREBASE_PROJECT_ID: "p", ALLOWED_ORIGINS: "", QUOTA: memKV(), PIXABAY_KEY: ANAHTAR, RAF_ARAC_JETONU: JETON, ...o });
const istek = (q: string, jeton?: string) => new Request(`https://api.test/v1/pixabay?q=${encodeURIComponent(q)}&n=2`, { headers: jeton ? { Authorization: `Bearer ${jeton}` } : {} });
const HIT = { id: 7, pageURL: "https://pixabay.com/photos/x-7/", webformatURL: "https://pixabay.com/get/w.jpg", largeImageURL: "https://pixabay.com/get/l.jpg", user: "u", tags: "brot", userImageURL: "gizli değil ama gereksiz", imageWidth: 1 };
function sahte(status = 200) {
  const f = vi.fn(async (_u: string) => new Response(JSON.stringify({ hits: [HIT, { ...HIT, id: 8 }, { ...HIT, id: 9 }] }), { status }));
  vi.stubGlobal("fetch", f); return f;
}
afterEach(() => vi.unstubAllGlobals());

describe("Pixabay aracı (PM 7055725467 md. 2)", () => {
  it("doğru jetonla yalnız altı alan; anahtar yanıtta yok; n uygulanır", async () => {
    const f = sahte(); const r = await handle(istek("Brot", JETON), env());
    expect(r.status).toBe(200);
    const b = await r.text();
    expect(b).not.toContain(ANAHTAR);
    const j = JSON.parse(b) as { hits: Record<string, unknown>[] };
    expect(j.hits).toHaveLength(2);
    expect(Object.keys(j.hits[0]!).sort()).toEqual(["id", "largeImageURL", "pageURL", "tags", "user", "webformatURL"]);
    expect(String(f.mock.calls[0]![0])).toContain(`key=${ANAHTAR}`);
  });
  it("yanlış ya da eksik jeton: sabit gecikme + 404, Pixabay'e gidilmez", async () => {
    const f = sahte(); const bekle = vi.fn(async () => {});
    expect(await aracJetonu(istek("Brot", "yanlis"), env(), bekle)).toBe(false);
    expect(bekle).toHaveBeenCalledWith(1200);
    vi.useFakeTimers();
    const p = handle(istek("Brot"), env()); await vi.advanceTimersByTimeAsync(1200); const r = await p;
    vi.useRealTimers();
    expect(r.status).toBe(404); expect(f).not.toHaveBeenCalled();
  });
  it("jeton tanımsız ya da 32 karakterden kısa, ya da anahtar yok: hizmet kapalı (503)", async () => {
    sahte();
    expect((await handle(istek("Brot", "kisa"), env({ RAF_ARAC_JETONU: "kisa" }))).status).toBe(503);
    expect((await handle(istek("Brot", JETON), env({ RAF_ARAC_JETONU: undefined }))).status).toBe(503);
    expect((await handle(istek("Brot", JETON), env({ PIXABAY_KEY: undefined }))).status).toBe(503);
  });
  it("24 saat önbellek: aynı sorgu ikinci kez Pixabay'e gitmez ve sayaca yazılmaz", async () => {
    const f = sahte(); const e = env();
    await handle(istek("Brot", JETON), e); await handle(istek(" brot ", JETON), e);
    expect(f).toHaveBeenCalledTimes(1);
    const kv = e.QUOTA as ReturnType<typeof memKV>;
    expect([...kv.data.keys()].some((k) => k.includes(ANAHTAR))).toBe(false);
    expect([...kv.data.entries()].find(([k]) => k.startsWith("q:pxb:"))![1]).toBe("1");
  });
  it("günlük tavan: 300 istekten sonra Pixabay'e gidilmez (429)", async () => {
    const f = sahte(); const e = env();
    await e.QUOTA.put(`q:pxb:${new Date().toISOString().slice(0, 10)}`, String(PIXABAY_GUNLUK));
    const r = await handle(istek("Käse", JETON), e);
    expect(r.status).toBe(429); expect(f).not.toHaveBeenCalled();
  });
  it("sağlık yanıtı yalnız yapılandırma durumunu söyler", async () => {
    const r = await handle(new Request("https://api.test/v1/health"), env());
    const b = await r.text(); expect(JSON.parse(b).configured.pixabay).toBe(true); expect(b).not.toContain(ANAHTAR); expect(b).not.toContain(JETON);
  });
  it("yanlış jetonun 404 gövdesi var olmayan yolunkiyle aynı", async () => {
    sahte(); vi.useFakeTimers();
    const p = handle(istek("Brot", "yanlis"), env()); await vi.advanceTimersByTimeAsync(1200); const a = await (await p).text();
    vi.useRealTimers();
    expect(a).toBe(await (await handle(new Request("https://api.test/v1/yok"), env())).text());
  });
  it("istek: safesearch, foto, dil küçük harf, n kenarları; önbellek 24 saat", async () => {
    const f = sahte(); const puts: [string, number | undefined][] = []; const e = env();
    const kv = e.QUOTA; e.QUOTA = { get: (k) => kv.get(k), put: async (k, v, o) => { puts.push([k, o?.expirationTtl]); await kv.put(k, v); } };
    const r = await handle(new Request("https://api.test/v1/pixabay?q=Brot&n=0&lang=DE", { headers: { Authorization: `Bearer ${JETON}` } }), e);
    const u = new URL(String(f.mock.calls[0]![0]));
    expect([u.searchParams.get("safesearch"), u.searchParams.get("image_type"), u.searchParams.get("lang")]).toEqual(["true", "photo", "de"]);
    expect(((await r.json()) as { hits: unknown[] }).hits).toHaveLength(1);
    expect(puts.find(([k]) => k.startsWith("pxb:"))![1]).toBe(86400);
  });
  it("hata eşlemesi: 429 → 429, 400 (anahtar) → 503, 500 → 503 meşgul", async () => {
    for (const [up, want] of [[429, 429], [400, 503], [500, 503]] as const) { sahte(up); expect((await handle(istek("Brot" + up, JETON), env())).status).toBe(want); }
  });
});
