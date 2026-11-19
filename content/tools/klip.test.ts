import { describe, it, expect } from "vitest";
import { klipVideo } from "./klip.ts";

// sentetik klip (gerçek transkript depoya girmez): 3 tur, 3. tur hatta çıkarılmış (hizalı metinde yok)
const klip = {
  id: "m1:09:rv1", day: 9, durum: "hazir", konusmaci: "Ada", dosya: "klip-09.json",
  video_url: "https://example.org/v.mp4", transkript_url: "https://example.org/t", lisans: "CC BY 4.0", atif: "Örnek, CC BY 4.0.",
  turlar: [{ tur: 1, basi: "Wie heißt", tr: "Adın ne?" }, { tur: 2, basi: "Ich heiße", tr: "Adım Ada." }, { tur: 3, basi: "Ich wohne", tr: "Burada oturuyorum." }],
  bolum: {
    ana_fikir: { q_tr: "Ne anlatıyor?", opts: ["Adını", "Yemeği"], ans: 0 },
    ayrinti: [{ q_tr: "Adı ne?", opts: ["Ada", "Eva"], ans: 0, tur: 2 }, { q_tr: "Nerede?", opts: ["Burada", "Orada"], ans: 0, tur: 3 }],
    dikte: [{ id: "d1", tur: 1, seviye: "kolay", q_tr: "İlk kelime?", opts: ["Wie", "Wo"], ans: 0 }, { id: "d2", tur: 3, seviye: "usta", accepted: ["Ich wohne hier."] },
      { id: "d3", seviye: "gercek", gorev_tr: "Adını yaz.", ornek_de: "Ada.", zorunlu: ["Ada"] }],
    golge: [2, 3],
    cevapla: { id: "c1", soru_tur: 1, situation_tr: "Sana soruyorlar.", accepted: ["Ich heiße Can.", "Ich bin Can.", "Can."], why_tr: "Kısa cevap yeter." }
  }
};
const metin = { sure_sn: 6, cumleler: [{ id: "t1", tur: 1, speaker: "Soran", de: "Wie heißt du?", t0: 0.2, t1: 1 }, { id: "t2", tur: 2, speaker: "Ada", de: "Ich heiße Ada.", t0: 1.5, t1: 2.6 }] };

describe("A9 klip → günün videosu (PM-069 madde 4)", () => {
  it("hizalı cümleler Türkçe çeviriyle; çıkarılan tura bağlı soru, dikte ve gölge girmez", () => {
    const v = klipVideo(klip, metin, { kesit_kaynak_sn: [0.2, 6.2] })!;
    expect(v.gercek_insan).toBe(true);
    expect(v.cumleler.map((c) => [c.id, c.tr])).toEqual([["t1", "Adın ne?"], ["t2", "Adım Ada."]]);
    expect(v.medya).toEqual([{ src: "media/klip-09.mp4", type: "video/mp4" }]); expect(v.poster).toBe("media/klip-09.jpg");
    expect(v.kaynak).toMatchObject({ lisans: "CC BY 4.0", atif: "Örnek, CC BY 4.0.", bas_sn: 0.2, bit_sn: 6.2 });
    const b = v.bolumler[0]!;
    expect(b.ayrinti.map((q) => q.kanit)).toEqual([["t2"]]);
    expect(b.dikte.map((d) => d.id)).toEqual(["d1", "d3"]);
    expect(b.golge).toEqual(["t2"]);
    expect(b.cevapla).toMatchObject({ k: "guided_response", prompt_de: "Wie heißt du?" });
  });
  it("hazır olmayan, çok parçalı ya da metinsiz klip bağlanmaz", () => {
    expect(klipVideo({ ...klip, durum: "kisa" }, metin)).toBeNull();
    expect(klipVideo({ ...klip, kesitler: [{}] }, metin)).toBeNull();
    expect(klipVideo(klip, { sure_sn: 1, cumleler: [] })).toBeNull();
  });
});
