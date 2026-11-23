import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { DwDB, useDb } from "../data/db.ts";
import { rafKartSuz, rafKayit, rafTemizle, rafYaz, rafYol } from "./raf.ts";
import { fotoAdresi, fotoBirlestir, ilkFoto, RAF_ONEK } from "./kartFoto.ts";
import type { FotoKayit } from "./content.ts";

const ANAHTAR = "sahte-anahtar-0123456789abcdef-0123456789";
const ADRES = "https://raf.ornek.dev";
let n = 0;
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
const ACIK: FotoKayit = { src: "https://upload.ornek/montag.jpg", sinif: "acik", yazar: "Açık Yazar", lisans: "CC BY 2.0", lisans_url: "https://creativecommons.org/licenses/by/2.0", sayfa: "https://commons.ornek/x" };
const KAYIT = { surum: 1, kart: {
  "lx:Montag#kart": { dosya: "foto/aaaa.jpg", yazar: "Raf Yazar", lisans: "Pixabay Content License", sayfa: "https://pixabay.ornek/1", sinif: "kapali" },
  "lx:Semmel#kart": { dosya: "bbbb.jpg", yazar: "B", lisans: "Pixabay Content License" },
  "lx:Kotu#kart": { dosya: "../gizli.txt", lisans: "x" },
  "lx:Lisanssiz#kart": { dosya: "foto/c.jpg" },
  "baska-anahtar": { dosya: "foto/d.jpg", lisans: "x" }
} };

describe("kelime fotoğrafı önce raftan (PM 7088230583 md. 3)", () => {
  let dosyalar: Record<string, number>;
  let cagri: string[];
  let onb: ReturnType<typeof sahteOnbellek>;
  let ag = true;
  beforeEach(async () => {
    useDb(new DwDB(`kartfoto-${n++}`));
    dosyalar = { "/kayit.json": 200, "/foto/aaaa.jpg": 200, "/foto/bbbb.jpg": 200 }; cagri = []; ag = true;
    onb = sahteOnbellek(); vi.stubGlobal("caches", onb);
    vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
      cagri.push(url);
      if (!ag) throw new TypeError("Failed to fetch");
      const yol = new URL(url).pathname;
      const ok = new Headers(init?.headers).get("Authorization") === `Bearer ${ANAHTAR}` && dosyalar[yol] === 200;
      if (!ok) return new Response("yok", { status: 404 });
      return yol === "/kayit.json" ? new Response(JSON.stringify(KAYIT), { headers: { "Content-Type": "application/json" } }) : new Response("JPEG");
    }));
    let i = 0;
    vi.spyOn(URL, "createObjectURL").mockImplementation(() => `blob:test/${i++}`);
    vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    await rafTemizle();
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

  it("rafYol: göreli, `..` yok; yalnız ad verilmişse foto/ altında", () => {
    expect(rafYol("foto/a.jpg")).toBe("foto/a.jpg");
    expect(rafYol("/foto/a.jpg")).toBe("foto/a.jpg");
    expect(rafYol("a.jpg")).toBe("foto/a.jpg");
    expect(rafYol("../a.jpg")).toBeNull();
    expect(rafYol("foto/./a.jpg")).toBeNull();
    expect(rafYol("https://kotu.ornek/a.jpg")).toBeNull();
    expect(rafYol(3)).toBeNull();
  });
  it("kayit.json süzülür: geçersiz yol, lisanssız kayıt ve kart dışı anahtar atlanır", () => {
    const k = rafKartSuz(KAYIT);
    expect(Object.keys(k).sort()).toEqual(["lx:Montag#kart", "lx:Semmel#kart"]);
    expect(k["lx:Semmel#kart"]!.dosya).toBe("foto/bbbb.jpg");
    expect(rafKartSuz(null)).toEqual({});
    expect(rafKartSuz({ sorgular: {} })).toEqual({});
  });
  it("raf kapalı: kayıt boş, harita açık haritanın aynısı, hiçbir istek gitmez (bugünkü davranış)", async () => {
    expect(await rafKayit()).toEqual({});
    const h = fotoBirlestir({ "lx:Montag#kart": ACIK }, await rafKayit());
    expect(h).toEqual({ "lx:Montag#kart": ACIK });
    expect(await ilkFoto(h, ["lx:Montag#kart"])).toEqual({ src: ACIK.src, atif: ACIK });
    expect(cagri).toEqual([]);
  });
  it("raf açık: raf kaydı öne geçer (atıf rafın), açık fotoğraf yedekte; rafa yalnız raf kaydı olan kartlar da girer", async () => {
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    const h = fotoBirlestir({ "lx:Montag#kart": ACIK, "lx:Winter#kart": { ...ACIK, src: "https://upload.ornek/w.jpg" } }, await rafKayit());
    expect(h["lx:Montag#kart"]!.src).toBe(`${RAF_ONEK}foto/aaaa.jpg`);
    expect(h["lx:Montag#kart"]!.acik).toEqual(ACIK);
    expect(h["lx:Semmel#kart"]!.sinif).toBe("kapali");
    expect(h["lx:Winter#kart"]!.sinif).toBe("acik");
    const r = await ilkFoto(h, ["lx:Montag#kart"]);
    expect(r?.src).toMatch(/^blob:/);
    expect(r?.atif.yazar).toBe("Raf Yazar");
    expect(r?.atif.lisans).toBe("Pixabay Content License");
  });
  it("raf dosyası gelmezse açık yedek; o da yoksa null (çağıran emojiye/aramaya düşer)", async () => {
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    const h = fotoBirlestir({ "lx:Montag#kart": ACIK }, await rafKayit());
    dosyalar["/foto/aaaa.jpg"] = 404; dosyalar["/foto/bbbb.jpg"] = 404;
    expect(await fotoAdresi(h["lx:Montag#kart"])).toEqual({ src: ACIK.src, atif: ACIK });
    expect(await fotoAdresi(h["lx:Semmel#kart"])).toBeNull();
    expect(await ilkFoto(h, ["lx:Semmel#ornek0", "lx:Semmel#kart", "lx:Montag#kart"])).toEqual({ src: ACIK.src, atif: ACIK });
  });
  it("çevrimdışı: kayit.json ve bir kez görülen fotoğraf kapalı önbellekten gelir", async () => {
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    const h1 = fotoBirlestir({}, await rafKayit());
    expect((await fotoAdresi(h1["lx:Montag#kart"]))?.src).toMatch(/^blob:/);
    expect(onb.depolar.get("dw2-kapali")?.has(`${ADRES}/kayit.json`)).toBe(true);
    // yeni oturum (yerel adresler gider, önbellek kalır), ağ yok
    ag = false;
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    expect(onb.depolar.get("dw2-kapali")?.has(`${ADRES}/foto/aaaa.jpg`)).toBe(true);
    const h2 = fotoBirlestir({}, await rafKayit());
    expect(Object.keys(h2).sort()).toEqual(["lx:Montag#kart", "lx:Semmel#kart"]);
    expect((await fotoAdresi(h2["lx:Montag#kart"]))?.src).toMatch(/^blob:/);
  });
  it("raf ulaşılamaz ve önbellek boş: kayıt boş, beklemeden açık haritaya düşer", async () => {
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    ag = false;
    expect(await rafKayit()).toEqual({});
  });
  it("ayar değişince kayıt yeniden çözülür", async () => {
    expect(await rafKayit()).toEqual({});
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    expect(Object.keys(await rafKayit())).toHaveLength(2);
    await rafYaz(null);
    expect(await rafKayit()).toEqual({});
  });
});
