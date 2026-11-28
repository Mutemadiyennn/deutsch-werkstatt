import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

/**
 * T-0 (K-00c md. 1–5, PM-153 md. 1 satır 2): sahne başında bir kez eşleme, sesler geç gelirse beklenir, "Sen" karşıdakinden
 * farklı ses (kutudan çıkmış iPhone: yalnız Anna + eğlence sesleri), konuşanı boş satır anlatıcının.
 */
const okunan: { text: string; ses: string | null; pitch: number }[] = [];
let sesler: { name: string; lang: string; voiceURI: string }[] = [];
const depo = new Map<string, string>();
const KUTU = ["Anna", "Eddy (Deutsch (Deutschland))", "Flo (Deutsch (Deutschland))", "Grandpa (Deutsch (Deutschland))", "Sandy (Deutsch (Deutschland))"]
  .map((name) => ({ name, lang: "de-DE", voiceURI: name }));
beforeAll(() => {
  class U { text: string; rate = 1; pitch = 1; voice: any = null; lang = ""; onend?: () => void; onstart?: () => void; onerror?: () => void; constructor(t: string) { this.text = t; } }
  const ss = { speaking: false, getVoices: () => sesler, cancel() {}, speak(u: U) { okunan.push({ text: u.text, ses: u.voice?.name ?? null, pitch: u.pitch }); setTimeout(() => u.onend?.(), 1); } };
  vi.stubGlobal("window", { speechSynthesis: ss });
  vi.stubGlobal("speechSynthesis", ss);
  vi.stubGlobal("SpeechSynthesisUtterance", U);
  vi.stubGlobal("localStorage", { getItem: (k: string) => depo.get(k) ?? null, setItem: (k: string, v: string) => void depo.set(k, v), removeItem: (k: string) => void depo.delete(k) });
});
afterAll(() => { vi.unstubAllGlobals(); });

describe("T-0: sahnede ses eşlemesi", () => {
  it("sesler geç gelirse sahne beklenir; bütün satırlar gelen seslerle ve aynı eşlemeyle", async () => {
    const { setKarakterler, setOgrenciHitap, speakDizi, taniOku } = await import("./speech.ts");
    setKarakterler([{ id: "ch:brandl", name: "Rosa Brandl", ses: { cinsiyet: "kadin", sira: 1 } }]);
    setOgrenciHitap("Frau");
    sesler = [];
    setTimeout(() => { sesler = KUTU; }, 250);
    okunan.length = 0;
    await speakDizi([{ de: "Hallo! Heute ist Montag, ja?", kim: "ch:brandl" }, { de: "Nein, Frau Brandl. Heute ist Dienstag.", kim: "ogrenci" }, { de: "Dienstag? Ach ja! Danke!", kim: "ch:brandl" }]);
    const [b1, sen, b2] = okunan;
    expect(b1!.ses).toBe("Anna");
    expect([b2!.ses, b2!.pitch]).toEqual([b1!.ses, b1!.pitch]);
    // "Sen" karşıdakinden farklı ses; tek gerçek kadın sesi doluysa kendi cinsinden eğlence sesi
    expect(sen!.ses).not.toBeNull();
    expect(sen!.ses).not.toBe(b1!.ses);
    expect(["Flo (Deutsch (Deutschland))", "Sandy (Deutsch (Deutschland))"]).toContain(sen!.ses);
    expect(taniOku().sahne).toMatch(/^ch:brandl → Anna 1 · ogrenci → (Flo|Sandy)/);
  });
  it("konuşanı boş satır anlatıcının: sabit, ötekilerden ayrı ses; ad 'Anlatıcı'", async () => {
    const { speakDizi, konusanAdi, konusanKimi, ANLATICI, sahneHazirla } = await import("./speech.ts");
    expect(konusanKimi(undefined)).toBe(ANLATICI);
    expect(konusanKimi("  ")).toBe(ANLATICI);
    expect(konusanKimi("ch:brandl")).toBe("ch:brandl");
    expect(konusanAdi(ANLATICI)).toBe("Anlatıcı");
    okunan.length = 0;
    await speakDizi([{ de: "Es ist Montag.", kim: undefined }, { de: "Hallo!", kim: "ch:brandl" }, { de: "Sie geht.", kim: undefined }]);
    const [a1, b, a2] = okunan;
    expect([a1!.ses, a1!.pitch]).toEqual([a2!.ses, a2!.pitch]);
    expect([a1!.ses, a1!.pitch]).not.toEqual([b!.ses, b!.pitch]);
    const m = await sahneHazirla([undefined, "ch:brandl"].map(konusanKimi));
    expect(m.get(ANLATICI)?.ses?.name).toBe(a1!.ses);
  });
  it("aynı sahne eşlemesi: tek satır düğmesi (konusanAta + sahne) diziyle aynı sesi verir", async () => {
    const { konusanAta, sahneHazirla } = await import("./speech.ts");
    const kimler = ["ch:brandl", "ogrenci", "ch:brandl"];
    const dizi = await sahneHazirla(kimler);
    const tek = konusanAta(kimler);
    for (const k of ["ch:brandl", "ogrenci"]) expect([tek.get(k)?.ses?.name, tek.get(k)?.pitch]).toEqual([dizi.get(k)?.ses?.name, dizi.get(k)?.pitch]);
    // karakterin tek başına sesi sahnedekiyle aynı (öğrenci en son atanır)
    expect(konusanAta(["ch:brandl"]).get("ch:brandl")?.ses?.name).toBe(dizi.get("ch:brandl")?.ses?.name);
  });
});
