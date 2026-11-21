import { describe, it, expect } from "vitest";
import { Lexeme } from "@dw/shared";
import { resimSecenekleri, eslestirKur, eslestirDokun, eslestirGoster, eslestirBitti, eslestirSonuc, karisir, duyulan, type EslestirDurum } from "./halkaTur.ts";

const L = (o: Record<string, unknown>) => Lexeme.parse({ tr: "x", pos: "noun", ...o });
const n = (de: string, tr: string, art = "der") => L({ id: `lx:${de}`, de, tr, art });
const winter = n("Winter", "kış"), sommer = n("Sommer", "yaz"), herbst = n("Herbst", "sonbahar"), fruehling = n("Frühling", "ilkbahar"),
  nacht = n("Nacht", "gece", "die"), kaese = n("Käse", "peynir"), apfel = n("Apfel", "elma"), kalt = L({ id: "lx:kalt", de: "kalt", tr: "soğuk", pos: "adj" }),
  winter2 = n("Winterzeit", "kış, kış mevsimi", "die"), hallo = L({ id: "lx:hallo", de: "Hallo", tr: "merhaba", pos: "other" }),
  morgen = n("Morgen", "sabah"), tag = n("Tag", "gün"), name = n("Name", "ad"), heissen = L({ id: "lx:heißen", de: "heißen", tr: "adı … olmak", pos: "verb" }),
  funktion = L({ id: "lx:und", de: "und", tr: "ve", pos: "conj", card: false });
const src = (id: string) => ({ src: `https://foto.example/${id.slice(3)}.jpg` });
const harita = Object.fromEntries([winter, sommer, herbst, fruehling, nacht, kaese, apfel, kalt, winter2].map((l) => [`${l.id}#kart`, src(l.id)]));
const hepsi = [winter, sommer, herbst, fruehling, nacht, kaese, apfel, kalt, winter2, hallo, funktion];

describe("resimden_sec (AK-10 3. adım)", () => {
  it("doğru + 3 fotoğraflı çeldirici; doğru dizin gerçekten kartın kendisi; aynı tohum aynı soru", () => {
    const s = resimSecenekleri(winter, hepsi, harita, "g1")!;
    expect(s.secenekler).toHaveLength(4);
    expect(s.secenekler[s.dogru]!.kart).toBe("lx:Winter");
    expect(s.secenekler[s.dogru]!.gorsel).toBe(harita["lx:Winter#kart"]!.src);
    expect(new Set(s.secenekler.map((x) => x.gorsel)).size).toBe(4);
    expect(resimSecenekleri(winter, hepsi, harita, "g1")).toEqual(s);
  });
  it("anlamı karışan kart (kış ↔ kış mevsimi) çeldirici olamaz; fotoğrafsız ve kartsız aday seçilmez", () => {
    for (let k = 0; k < 40; k++) {
      const s = resimSecenekleri(winter, hepsi, harita, `t${k}`)!;
      const ids = s.secenekler.map((x) => x.kart);
      expect(ids).not.toContain("lx:Winterzeit");
      expect(ids).not.toContain("lx:hallo");
      expect(ids).not.toContain("lx:und");
    }
  });
  it("önce aynı tür: yeterli isim varken sıfat (kalt) çeldirici olmaz", () => {
    for (let k = 0; k < 40; k++) expect(resimSecenekleri(winter, hepsi, harita, `t${k}`)!.secenekler.map((x) => x.kart)).not.toContain("lx:kalt");
  });
  it("kartın kendi fotoğrafı yoksa ya da 3 çeldirici yoksa tür uygun değil (null)", () => {
    expect(resimSecenekleri(hallo, hepsi, harita, "g1")).toBeNull();
    expect(resimSecenekleri(winter, [winter, sommer, herbst], harita, "g1")).toBeNull();
  });
  it("aynı fotoğraf iki kartta olsa bile soruda iki kez çıkmaz", () => {
    const h2 = { ...harita, "lx:Sommer#kart": harita["lx:Herbst#kart"]! };
    for (let k = 0; k < 30; k++) { const s = resimSecenekleri(winter, hepsi, h2, `t${k}`); if (s) expect(new Set(s.secenekler.map((x) => x.gorsel)).size).toBe(4); }
  });
  it("duyulan biçim isimde artikelli", () => {
    expect(duyulan(nacht)).toBe("die Nacht");
    expect(duyulan(hallo)).toBe("Hallo");
  });
});

describe("eslestir (AK-10 3. adım)", () => {
  const bes = [hallo, morgen, tag, heissen, name];
  it("4–6 kart; az ise null; fazlası kesilir; anlamı karışan ikinci kart atılır", () => {
    expect(eslestirKur([hallo, morgen, tag], "g")).toBeNull();
    expect(eslestirKur([...bes, winter, sommer, herbst], "g")!.sol).toHaveLength(6);
    const d = eslestirKur([winter, winter2, sommer, herbst, fruehling], "g")!;
    expect(d.sol).not.toContain("lx:Winterzeit");
    expect(karisir(winter, winter2)).toBe(true);
  });
  it("sağ sütun karışık: hiçbir satırda sol ile aynı kart yok (40 tohum)", () => {
    for (let k = 0; k < 40; k++) {
      const d = eslestirKur(bes, `t${k}`)!;
      expect([...d.sag].sort()).toEqual([...d.sol].sort());
      d.sag.forEach((x, i) => expect(x).not.toBe(d.sol[i]));
    }
  });
  it("doğru çift kilitlenir; yanlışta ceza yok, iki kart 'bir kez daha' listesine girer ve sallanma işareti tek dokunuşluk", () => {
    let d: EslestirDurum = eslestirKur(bes, "g")!;
    let r = eslestirDokun(d, "sol", "lx:hallo"); expect(r.olay).toBe("sec"); d = r.durum;
    r = eslestirDokun(d, "sag", "lx:Morgen"); expect(r.olay).toBe("yanlis"); d = r.durum;
    expect(d.yanlis.sort()).toEqual(["lx:Morgen", "lx:hallo"]);
    expect(d.salla).toEqual({ sol: "lx:hallo", sag: "lx:Morgen" });
    expect(d.secili).toBeNull();
    r = eslestirDokun(d, "sag", "lx:hallo"); expect(r.olay).toBe("sec"); d = r.durum;
    expect(d.salla).toBeNull();
    r = eslestirDokun(d, "sol", "lx:hallo"); expect(r.olay).toBe("dogru"); d = r.durum;
    expect(d.bitti).toEqual(["lx:hallo"]);
    expect(eslestirDokun(d, "sol", "lx:hallo").olay).toBe("yok");
  });
  it("aynı yanda ikinci dokunuş seçimi değiştirir, aynı hücre seçimi bırakır", () => {
    let d = eslestirKur(bes, "g")!;
    d = eslestirDokun(d, "sol", "lx:hallo").durum;
    d = eslestirDokun(d, "sol", "lx:Tag").durum; expect(d.secili).toEqual({ yan: "sol", kart: "lx:Tag" });
    const r = eslestirDokun(d, "sol", "lx:Tag"); expect(r.olay).toBe("birak"); expect(r.durum.secili).toBeNull();
  });
  it("hepsi doğru → sonuç hepsi doğru; 'göster' kalanları açar ve yanlış sayar", () => {
    let d = eslestirKur(bes, "g")!;
    for (const k of d.sol.slice(0, 3)) { d = eslestirDokun(d, "sag", k).durum; d = eslestirDokun(d, "sol", k).durum; }
    expect(eslestirBitti(d)).toBe(false);
    d = eslestirGoster(d);
    expect(eslestirBitti(d)).toBe(true);
    const s = eslestirSonuc(d);
    expect(s.filter((x) => x.dogru).map((x) => x.kart).sort()).toEqual(d.sol.slice(0, 3).sort());
    expect(d.gosterildi.sort()).toEqual(d.sol.slice(3).sort());
  });
});
