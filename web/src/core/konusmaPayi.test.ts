/** PM-148 karar 3: konuşma payı (süreye göre), sınıflama DENETİM-A1 sayımıyla aynı; eşik policy'den */
import { describe, expect, it } from "vitest";
import POLICY from "../policy.json" with { type: "json" };
import type { Gun } from "@dw/shared";
import type { Adim, GunPlani } from "./akis.ts";
import { adimSinifi, gunPayi, haftaPayi } from "./konusmaPayi.ts";

const adim = (tur: string, sn: number, ek: Partial<Adim> = {}) => ({ id: `${tur}:${sn}`, tur, kip: "uretim", kartlar: [], kaynak: "halka", sn, neden: "", ...ek }) as unknown as Adim;
const plan = (adimlar: Adim[]) => ({ gun: 1, surum: 1, tohum: "t", duraklar: [{ id: "h1", tur: "halka", seans: 1, title_tr: "", tahmini_dk: 0, adimlar }], toplam_dk: 0, neden: [], gevseme: [] }) as unknown as GunPlani;
const gun = (ek: Record<string, unknown> = {}) => ({ day: 1, sesler: [], ...ek }) as unknown as Gun;
const yok = new Map();

describe("konuşma payı", () => {
  it("sınıflama: soyle/serbest_konus/gorev konuşma; gösterim paydada yok; gün sınavının sesli maddesi konuşma", () => {
    const g = gun({ gun_sinavi: { id: "gs", sesli: ["m2"], maddeler: [{ id: "m1", k: "pick" }, { id: "m2", k: "guided_response" }] } });
    expect(adimSinifi(adim("soyle", 25), g, yok)).toBe("konusma");
    expect(adimSinifi(adim("serbest_konus", 150), g, yok)).toBe("konusma");
    expect(adimSinifi(adim("ders_madde", 25, { ders: { id: "r0:x", oge: "gorev" } }), g, yok)).toBe("yazma");   // ders_madde önce: dersin drill'i
    expect(adimSinifi(adim("tanit", 30), g, yok)).toBe("gosterim");
    expect(adimSinifi(adim("ders_madde", 45, { ders: { id: "gun_sinavi", oge: "m2" } }), g, yok)).toBe("konusma");
    expect(adimSinifi(adim("ders_madde", 45, { ders: { id: "gun_sinavi", oge: "m1" } }), g, yok)).toBe("tanima");
    expect(adimSinifi(adim("tablo", 40, { ders: { id: "gr:x", oge: "dil_noktasi" } }), g, yok)).toBe("gosterim");
  });
  it("süreye göre: halka adımlarının saniyesi; gösterim sayılmaz", () => {
    const p = gunPayi(gun(), plan([adim("soyle", 25), adim("gap", 18), adim("tr_de", 22), adim("tanit", 30)]), yok);
    expect(p).toEqual({ konusma_sn: 25, aktif_sn: 65 });
  });
  it("akışsız gün: prova her sıra için bir 'söyle' süresi, kalanı dinleme; ses durağı içindeki adımlara göre bölünür", () => {
    const g = gun({ prova: { dugumler: [{ secenekler: [{}] }, { secenekler: [] }] }, sesler: [{ bolumler: [{ ana_fikir: {}, golge: [{}, {}], cevapla: {}, ayrinti: [{}] }] }] });
    const p = gunPayi(g, null, yok);
    const ses = POLICY.akis.sabit_dk.ses * 60, prova = POLICY.akis.sabit_dk.prova * 60;
    expect(p.aktif_sn).toBe(ses + prova);
    expect(p.konusma_sn).toBeCloseTo(POLICY.akis.adim_sn.soyle + ses * 3 / 5);
  });
  it("akış günü: ses durağı planın turuna göre (ilk tur yalnız dinleme), prova ve okuma planın süresiyle; video sayılmaz", () => {
    const g = gun({ prova: { dugumler: [{ secenekler: [{}] }, { secenekler: [{}] }] }, okuma_yazma: { sorular: [{ k: "guided_response" }, { q_tr: "?" }], yazma: {} },
      sesler: [{ bolumler: [{ ana_fikir: {}, golge: [{}], dikte: [{ seviye: "orta" }] }] }] });
    const d = (tur: string, dk: number, ek: Record<string, unknown> = {}) => ({ id: tur, tur, seans: 0, title_tr: "", tahmini_dk: dk, adimlar: [], ...ek });
    const pl = { gun: 1, surum: 1, tohum: "t", duraklar: [d("ses", 4, { ses_turu: "ilk" }), d("video", 6), d("ses", 4, { ses_turu: "ikinci" }), d("prova", 7), d("okuma", 6)], toplam_dk: 0, neden: [], gevseme: [] } as unknown as GunPlani;
    const p = gunPayi(g, pl, yok);
    expect(p.aktif_sn).toBe((4 + 4 + 7 + 6) * 60);
    expect(p.konusma_sn).toBeCloseTo(0 + 240 / 2 + 2 * POLICY.akis.adim_sn.soyle + 360 / 3);
  });
  it("eşik policy'den; hafta toplamı süre ağırlıklı", () => {
    const r = haftaPayi([{ konusma_sn: 30, aktif_sn: 100 }, { konusma_sn: 0, aktif_sn: 100 }]);
    expect(r).toEqual({ pay: 0.15, esik: POLICY.akis.konusma_payi_min, gecti: false });
    expect(haftaPayi([{ konusma_sn: 60, aktif_sn: 200 }]).gecti).toBe(0.3 >= POLICY.akis.konusma_payi_min);
  });
});
