import { describe, it, expect } from "vitest";
import { rafYanit, RAF_KOKENLER, YANLIS_GECIKME_MS } from "../src/raf.ts";

const ANAHTAR = "dogru-anahtar-0123456789abcdef";
const env = { MEDYA_ANAHTARI: ANAHTAR };
const dosya = () => Promise.resolve(new Response("JPEG", { status: 200, headers: { "Content-Type": "image/jpeg", "Set-Cookie": "x=1" } }));
const istek = (o: { yontem?: string; anahtar?: string; koken?: string } = {}) => new Request("https://raf.example/foto/abc.jpg", {
  method: o.yontem ?? "GET", headers: { ...(o.anahtar ? { Authorization: `Bearer ${o.anahtar}` } : {}), ...(o.koken ? { Origin: o.koken } : {}) } });

describe("kapalı medya rafı Function'ı (D-112, #58 B12)", () => {
  it("doğru anahtar: dosya, özel önbellek, izinli kökene CORS, çerez yok", async () => {
    const r = await rafYanit(istek({ anahtar: ANAHTAR, koken: RAF_KOKENLER[0] }), env, dosya, async () => {});
    expect(r.status).toBe(200);
    expect(await r.text()).toBe("JPEG");
    expect(r.headers.get("Cache-Control")).toMatch(/^private/);
    expect(r.headers.get("Access-Control-Allow-Origin")).toBe(RAF_KOKENLER[0]);
    expect(r.headers.get("Set-Cookie")).toBeNull();
  });
  it("anahtar yok ya da yanlış: 404 ve sabit gecikme (parola taraması); dosyaya hiç bakılmaz", async () => {
    for (const a of [undefined, "yanlis-anahtar-0123456789abcdef", ANAHTAR + "x"]) {
      const bekledi: number[] = []; let okundu = false;
      const r = await rafYanit(istek({ anahtar: a }), env, () => { okundu = true; return dosya(); }, async (ms) => { bekledi.push(ms); });
      expect(r.status).toBe(404); expect(bekledi).toEqual([YANLIS_GECIKME_MS]); expect(okundu).toBe(false);
    }
  });
  it("rafta anahtar tanımsız ya da kısaysa her istek 404 (yanlış yapılandırma açık kalmaz)", async () => {
    for (const e of [{}, { MEDYA_ANAHTARI: "kisa" }]) expect((await rafYanit(istek({ anahtar: "kisa" }), e, dosya, async () => {})).status).toBe(404);
  });
  it("ön uçuş: izinli kökene CORS, başka kökene başlık yok; yalnızca GET/HEAD", async () => {
    const ok = await rafYanit(istek({ yontem: "OPTIONS", koken: RAF_KOKENLER[0] }), env, dosya);
    expect(ok.status).toBe(204); expect(ok.headers.get("Access-Control-Allow-Headers")).toBe("Authorization");
    const yabanci = await rafYanit(istek({ yontem: "OPTIONS", koken: "https://kotu.example" }), env, dosya);
    expect(yabanci.headers.get("Access-Control-Allow-Origin")).toBeNull();
    expect((await rafYanit(istek({ yontem: "POST", anahtar: ANAHTAR }), env, dosya, async () => {})).status).toBe(404);
  });
  it("dosya yoksa 404 (anahtar doğru olsa da içerik sızmaz)", async () => {
    const r = await rafYanit(istek({ anahtar: ANAHTAR }), env, () => Promise.resolve(new Response("x", { status: 404 })), async () => {});
    expect(r.status).toBe(404);
  });
});
