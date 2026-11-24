import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { DwDB, getMeta, useDb } from "../data/db.ts";
import { rafKartSuz, rafKayit, rafKayitCek, rafTemizle, rafYaz, rafYol } from "./raf.ts";
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
  it("kart kaydında atıf yoksa aynı dosyanın `sorgular` adayından alınır (doldurma hattı biçimi; inceleme #204 P1-1)", () => {
    const k = rafKartSuz({ kart: { "lx:Tüte#kart": { dosya: "foto/cccc.jpg" }, "lx:Karte#kart": { dosya: "dddd.jpg" }, "lx:Yok#kart": { dosya: "foto/eeee.jpg" } },
      sorgular: { "paper bag": { adaylar: [{ dosya: "cccc.jpg", yazar: "Aday Yazar", lisans: "Pixabay Content License", sayfa: "https://pixabay.ornek/c", sinif: "kapali" }] },
        "ticket": { adaylar: [{ dosya: "dddd.jpg", yazar: "D", lisans: "Pixabay Content License" }, { dosya: "eeee.jpg", yazar: "E" }] } } });
    expect(Object.keys(k).sort()).toEqual(["lx:Karte#kart", "lx:Tüte#kart"]);
    expect(k["lx:Tüte#kart"]).toEqual({ dosya: "foto/cccc.jpg", yazar: "Aday Yazar", lisans: "Pixabay Content License", lisans_url: null, sayfa: "https://pixabay.ornek/c" });
  });
  it("raf kapalı: kayıt boş, harita açık haritanın aynısı, hiçbir istek gitmez (bugünkü davranış)", async () => {
    expect(await rafKayit()).toEqual({ kart: {}, gecici: false });
    const h = fotoBirlestir({ "lx:Montag#kart": ACIK }, (await rafKayit()).kart);
    expect(h).toEqual({ "lx:Montag#kart": ACIK });
    expect(await ilkFoto(h, ["lx:Montag#kart"])).toEqual({ src: ACIK.src, atif: ACIK });
    expect(cagri).toEqual([]);
  });
  it("Profil'de sına: kayıt çekilir, kelime fotoğrafı sayısı döner; sonra kayıt önbellekten, beklemeden", async () => {
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    expect(await rafKayitCek()).toBe(2);
    const r = await rafKayit();
    expect(r.gecici).toBe(false);
    expect(Object.keys(r.kart)).toHaveLength(2);
  });
  it("raf açık: raf kaydı öne geçer (atıf rafın), açık fotoğraf yedekte; rafa yalnız raf kaydı olan kartlar da girer", async () => {
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR }); await rafKayitCek();
    const h = fotoBirlestir({ "lx:Montag#kart": ACIK, "lx:Winter#kart": { ...ACIK, src: "https://upload.ornek/w.jpg" } }, (await rafKayit()).kart);
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
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR }); await rafKayitCek();
    const h = fotoBirlestir({ "lx:Montag#kart": ACIK }, (await rafKayit()).kart);
    dosyalar["/foto/aaaa.jpg"] = 404; dosyalar["/foto/bbbb.jpg"] = 404;
    expect(await fotoAdresi(h["lx:Montag#kart"])).toEqual({ src: ACIK.src, atif: ACIK });
    expect(await fotoAdresi(h["lx:Semmel#kart"])).toBeNull();
    expect(await ilkFoto(h, ["lx:Semmel#ornek0", "lx:Semmel#kart", "lx:Montag#kart"])).toEqual({ src: ACIK.src, atif: ACIK });
  });
  it("çevrimdışı: kayit.json ve bir kez görülen fotoğraf kapalı önbellekten gelir", async () => {
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR }); await rafKayitCek();
    const h1 = fotoBirlestir({}, (await rafKayit()).kart);
    expect((await fotoAdresi(h1["lx:Montag#kart"]))?.src).toMatch(/^blob:/);
    expect(await getMeta(`raf:depo:${ADRES}/kayit.json`)).toMatchObject({ ham: KAYIT });
    expect((await getMeta<{ veri: ArrayBuffer }>(`raf:depo:${ADRES}/foto/aaaa.jpg`))?.veri.byteLength).toBe(4);
    ag = false;
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    const r = await rafKayit();
    expect(r.gecici).toBe(false);
    expect(Object.keys(r.kart).sort()).toEqual(["lx:Montag#kart", "lx:Semmel#kart"]);
    expect((await fotoAdresi(r.kart["lx:Montag#kart"] && fotoBirlestir({}, r.kart)["lx:Montag#kart"]))?.src).toMatch(/^blob:/);
  });
  it("Cache Storage olmayan tarayıcıda da (WebKit yeniden yükleme, KAPI-İŞ 7123119259) kayıt ve görülen fotoğraf çevrimdışı gelir", async () => {
    vi.stubGlobal("caches", undefined);
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR }); await rafKayitCek();
    expect((await fotoAdresi(fotoBirlestir({}, (await rafKayit()).kart)["lx:Montag#kart"]))?.src).toMatch(/^blob:/);
    ag = false;
    // yeni sayfa gibi: bellekteki söz ve yerel adresler yok, yalnız cihazdaki kayıt
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    const r = await rafKayit();
    expect(r.gecici).toBe(false);
    expect((await fotoAdresi(fotoBirlestir({ "lx:Montag#kart": ACIK }, r.kart)["lx:Montag#kart"]))?.src).toMatch(/^blob:/);
    expect(cagri.filter((u) => u.endsWith("/foto/aaaa.jpg"))).toHaveLength(1);
  });
  it("önbellek boş: ekran beklemez (boş + geçici); kayıt arkada çekilir, ağ hatası oturum boyunca saklanmaz (inceleme #204 P2-2)", async () => {
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR });
    ag = false;
    expect(await rafKayit()).toEqual({ kart: {}, gecici: true });
    await new Promise((r) => setTimeout(r, 10));
    ag = true;
    expect((await rafKayit()).gecici).toBe(true);        // yeniden denendi (hata saklanmadı); bu kez arkada başarıyla çekiliyor
    await new Promise((r) => setTimeout(r, 10));
    const r = await rafKayit();
    expect(r.gecici).toBe(false);
    expect(Object.keys(r.kart)).toHaveLength(2);
  });
  it("ayar değişince kayıt yeniden çözülür", async () => {
    expect((await rafKayit()).kart).toEqual({});
    await rafYaz({ adres: ADRES, anahtar: ANAHTAR }); await rafKayitCek();
    expect(Object.keys((await rafKayit()).kart)).toHaveLength(2);
    await rafYaz(null);
    expect((await rafKayit()).kart).toEqual({});
  });
});
