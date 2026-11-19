import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { DwDB, useDb, getMeta } from "../data/db.ts";
import { rafAdres, rafYaz, rafOku, rafSina, rafDosya, rafTemizle } from "./raf.ts";

const ANAHTAR = "sahte-anahtar-0123456789abcdef-0123456789";
let n = 0;
/** basit önbellek (Cache Storage) taklidi */
function sahteOnbellek() {
  const depolar = new Map<string, Map<string, Response>>();
  return {
    depolar,
    open: async (ad: string) => {
      if (!depolar.has(ad)) depolar.set(ad, new Map());
      const d = depolar.get(ad)!;
      return { match: async (u: string) => d.get(u)?.clone(), put: async (u: string, r: Response) => { d.set(u, r); } };
    },
    delete: async (ad: string) => depolar.delete(ad)
  };
}

describe("kapalı medya rafı, uygulama tarafı (D-112, #58 B12)", () => {
  let cagri: { url: string; yetki: string | null }[];
  let onb: ReturnType<typeof sahteOnbellek>;
  beforeEach(async () => {
    useDb(new DwDB(`raf-${n++}`));
    cagri = []; onb = sahteOnbellek();
    vi.stubGlobal("caches", onb);
    vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
      const yetki = new Headers(init?.headers).get("Authorization");
      cagri.push({ url, yetki });
      const ok = yetki === `Bearer ${ANAHTAR}`;
      // gerçek koruma gibi: başarıda X-Raf işareti, yanlış parolada gecikmeli 404
      if (!ok) await new Promise((r) => setTimeout(r, 950));
      return new Response(ok ? "veri" : "Not found", { status: ok ? 200 : 404, headers: ok ? { "X-Raf": "1" } : {} });
    }));
    let i = 0;
    vi.spyOn(URL, "createObjectURL").mockImplementation(() => `blob:test/${i++}`);
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    await rafTemizle();
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it("adres: yalnızca https, uygulamanın kendi kökeni değil, şemasız ya da sorgulu adres reddedilir (inceleme #98 P1-1)", () => {
    expect(rafAdres("https://raf.ornek.dev/", "https://app.ornek")).toBe("https://raf.ornek.dev");
    expect(rafAdres("raf.ornek.dev", "https://app.ornek")).toBeNull();
    expect(rafAdres("http://raf.ornek.dev", "https://app.ornek")).toBeNull();
    expect(rafAdres("https://app.ornek/raf", "https://app.ornek")).toBeNull();
    expect(rafAdres("https://raf.ornek.dev/?k=1", "https://app.ornek")).toBeNull();
    expect(rafAdres("https://u:p@raf.ornek.dev", "https://app.ornek")).toBeNull();
    expect(rafAdres("javascript:alert(1)", "https://app.ornek")).toBeNull();
  });
  it("geçersiz adres kaydedilmez ve hiçbir istek gitmez", async () => {
    expect(await rafYaz({ adres: "raf.ornek.dev", anahtar: ANAHTAR })).toBe(false);
    expect(await getMeta("raf")).toBeUndefined();
    expect(await rafSina({ adres: "raf.ornek.dev", anahtar: ANAHTAR })).toBe("adres-gecersiz");
    expect(cagri).toEqual([]);
  });
  it("sına: doğru anahtar bağlandı, yanlış anahtar 'anahtar yanlış'; anahtar yalnızca rafa gider", async () => {
    await rafYaz({ adres: "https://raf.ornek.dev/", anahtar: ANAHTAR });
    expect(await rafOku()).toEqual({ adres: "https://raf.ornek.dev", anahtar: ANAHTAR });
    expect(await rafSina()).toBe("bagli");
    expect(await rafSina({ adres: "https://raf.ornek.dev", anahtar: "yanlis" })).toBe("anahtar-yanlis");
    expect(cagri.every((c) => c.url.startsWith("https://raf.ornek.dev/"))).toBe(true);
  });
  it("sına: üç durum ayrı (PM 7019082199): parola tanımsız (503), koruma yok (işaretsiz 200 ya da hızlı 404), ulaşılamıyor", async () => {
    const yanit = (r: Response) => vi.stubGlobal("fetch", vi.fn(async () => r));
    const a = { adres: "https://raf.ornek.dev", anahtar: ANAHTAR };
    yanit(new Response(null, { status: 503, headers: { "X-Raf": "anahtar-yok" } })); expect(await rafSina(a)).toBe("anahtar-tanimsiz");
    yanit(new Response("ok", { status: 200 })); expect(await rafSina(a)).toBe("koruma-yok");
    yanit(new Response("Not found", { status: 404 })); expect(await rafSina(a)).toBe("koruma-yok");
    yanit(new Response("Not found", { status: 404, headers: { "X-Raf": "1" } })); expect(await rafSina(a)).toBe("dosya-yok");
    vi.stubGlobal("fetch", vi.fn(async () => { throw new TypeError("Failed to fetch"); })); expect(await rafSina(a)).toBe("ulasilamiyor");
  });
  it("rafDosya: anahtarla çeker, önbelleğe koyar, aynı dosyada aynı yerel adresi verir; raf yoksa null", async () => {
    expect(await rafDosya("foto/a.jpg")).toBeNull();
    await rafYaz({ adres: "https://raf.ornek.dev", anahtar: ANAHTAR });
    const u = await rafDosya("foto/a.jpg");
    expect(u).toMatch(/^blob:/);
    expect(await rafDosya("/foto/a.jpg")).toBe(u);
    expect(cagri.filter((c) => c.url.endsWith("foto/a.jpg"))).toHaveLength(1);
    expect(onb.depolar.get("dw2-kapali")?.has("https://raf.ornek.dev/foto/a.jpg")).toBe(true);
  });
  it("Sil: ayar, kapalı önbellek ve yerel adresler gider", async () => {
    await rafYaz({ adres: "https://raf.ornek.dev", anahtar: ANAHTAR });
    await rafDosya("foto/a.jpg");
    await rafYaz(null);
    expect(await rafOku()).toBeNull();
    expect(onb.depolar.has("dw2-kapali")).toBe(false);
    expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:test/0");
    expect(await rafDosya("foto/a.jpg")).toBeNull();
  });
  it("yanlış anahtarla dosya: null (çağıran açık yedeği gösterir), önbelleğe girmez", async () => {
    await rafYaz({ adres: "https://raf.ornek.dev", anahtar: "yanlis-anahtar" });
    expect(await rafDosya("foto/b.jpg")).toBeNull();
    expect(onb.depolar.get("dw2-kapali")?.size ?? 0).toBe(0);
  });
});
