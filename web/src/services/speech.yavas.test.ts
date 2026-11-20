import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

/** PM 7042161522-1: "Yavaş" duyulur olsun; yavaşlamayan ses yedeğe ya da gruplu okumaya düşer */
const oku: { text: string; rate: number; ses: string | null }[] = [];
const V = [["Anna", "de-DE"], ["Helena (Erweitert)", "de-DE"], ["Markus", "de-DE"], ["Yelda", "tr-TR"]].map(([name, lang]) => ({ name, lang, voiceURI: name, localService: true, default: false }));
const depo = new Map<string, string>();
beforeAll(() => {
  class U {
    text: string; rate = 1; pitch = 1; lang = ""; voice: { name: string } | null = null;
    onstart: (() => void) | null = null; onend: (() => void) | null = null; onerror: (() => void) | null = null;
    constructor(t: string) { this.text = t; }
  }
  const synth = { speaking: false, cancel() {}, getVoices: () => V,
    speak(u: U) { oku.push({ text: u.text, rate: u.rate, ses: u.voice?.name ?? null }); u.onstart?.(); setTimeout(() => u.onend?.(), 25); } };
  vi.stubGlobal("SpeechSynthesisUtterance", U);
  vi.stubGlobal("speechSynthesis", synth);
  vi.stubGlobal("localStorage", { getItem: (k: string) => depo.get(k) ?? null, setItem: (k: string, v: string) => void depo.set(k, v), removeItem: (k: string) => void depo.delete(k) });
  if (typeof window === "undefined") vi.stubGlobal("window", { speechSynthesis: synth });
  else vi.stubGlobal("window", Object.assign(Object.create(window), { speechSynthesis: synth }));
});
beforeEach(() => { oku.length = 0; depo.clear(); });
afterAll(async () => { const { setYavasOran } = await import("./speech.ts"); setYavasOran(0.5); vi.unstubAllGlobals(); });

const ses = (ad: string) => ({ ses: V.find((v) => v.name === ad)!, pitch: 1 });

describe("Yavaş hızı (PM 7042161522-1)", () => {
  it("varsayılan 0,5; yalnız 0,6/0,5/0,4 kabul edilir", async () => {
    const { RATE, setYavasOran } = await import("./speech.ts");
    expect(RATE.slow).toBe(0.5);
    setYavasOran(0.4); expect(RATE.slow).toBe(0.4);
    setYavasOran(0.72); expect(RATE.slow).toBe(0.4);
    setYavasOran(undefined); expect(RATE.slow).toBe(0.4);
    setYavasOran(0.5);
    expect(RATE.slow / RATE.normal).toBeLessThanOrEqual(1 / 1.5 + 0.03); // hedef: normalin ≥ ~1,5 katı süre
  });
  it("ölçüm: onstart→onend süresi; kayıt ses adıyla saklanır, oran eşiği 1,25", async () => {
    const { olcCal, hizKaydet, yavasliyorMu, hizKaydi } = await import("./speech.ts");
    const ms = await olcCal("Guten Morgen.", V[0] as unknown as SpeechSynthesisVoice, 0.5);
    expect(ms).not.toBeNull(); expect(ms!).toBeGreaterThanOrEqual(15);
    expect(oku[0]).toMatchObject({ rate: 0.5, ses: "Anna" });
    expect(yavasliyorMu("Anna")).toBeUndefined();
    hizKaydet("Anna", { normalMs: 3000, yavasMs: 3100, rate: 0.5 });
    hizKaydet("Helena (Erweitert)", { normalMs: 3000, yavasMs: 4500, rate: 0.5 });
    expect(yavasliyorMu("Anna")).toBe(false);
    expect(yavasliyorMu("Helena (Erweitert)")).toBe(true);
    expect(Object.keys(hizKaydi())).toHaveLength(2);
  });
  it("ölçülmemiş ses: davranış değişmez (tek cümle, aynı ses, yavaş hız)", async () => {
    const { speak, RATE } = await import("./speech.ts");
    await speak("Ich hätte gern einen Termin.", "de", "slow", true, ses("Anna"));
    expect(oku).toEqual([{ text: "Ich hätte gern einen Termin.", rate: RATE.slow, ses: "Anna" }]);
  });
  it("yavaşlamayan ses: aynı cinsten yavaşlayan sese düşer; normal hızda ses değişmez", async () => {
    const { speak, hizKaydet } = await import("./speech.ts");
    hizKaydet("Anna", { normalMs: 3000, yavasMs: 3050, rate: 0.5 });
    hizKaydet("Helena (Erweitert)", { normalMs: 3000, yavasMs: 4600, rate: 0.5 });
    await speak("Guten Morgen.", "de", "slow", true, ses("Anna"));
    await speak("Guten Morgen.", "de", "normal", true, ses("Anna"));
    expect(oku.map((o) => o.ses)).toEqual(["Helena (Erweitert)", "Anna"]);
  });
  it("aynı cinsten yavaşlayan ses yoksa: kelime gruplarıyla, aynı sesle okunur (cinsiyet değişmez)", async () => {
    const { speak, hizKaydet } = await import("./speech.ts");
    hizKaydet("Markus", { normalMs: 3000, yavasMs: 3000, rate: 0.5 });
    hizKaydet("Helena (Erweitert)", { normalMs: 3000, yavasMs: 4600, rate: 0.5 });
    await speak("Guten Morgen! Ich hätte gern einen Termin am Montag.", "de", "slow", true, ses("Markus"));
    expect(oku.map((o) => o.text)).toEqual(["Guten Morgen!", "Ich hätte gern", "einen Termin am", "Montag."]);
    expect(new Set(oku.map((o) => o.ses))).toEqual(new Set(["Markus"]));
  });
  it("gruplu okuma stopSpeaking ile kesilir", async () => {
    const { speak, stopSpeaking, hizKaydet } = await import("./speech.ts");
    hizKaydet("Markus", { normalMs: 3000, yavasMs: 3000, rate: 0.5 });
    const p = speak("eins zwei drei vier fünf sechs sieben acht neun", "de", "slow", true, ses("Markus"));
    await new Promise((r) => setTimeout(r, 10)); stopSpeaking(); await p;
    expect(oku.length).toBe(1);
  });
  it("kelimeGruplari: noktalamada ve en çok 3 kelimede böler", async () => {
    const { kelimeGruplari } = await import("./speech.ts");
    expect(kelimeGruplari("Ja, bitte.")).toEqual(["Ja,", "bitte."]);
    expect(kelimeGruplari("Wann haben Sie Zeit?")).toEqual(["Wann haben Sie", "Zeit?"]);
  });
});
