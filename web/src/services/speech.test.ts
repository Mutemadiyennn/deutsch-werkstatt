import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

const rates: { text: string; rate: number }[] = [];
beforeAll(() => {
  class U { text: string; rate = 1; lang = ""; voice: unknown; onend: (() => void) | null = null; onerror: (() => void) | null = null; constructor(t: string) { this.text = t; } }
  // isolate: false — küresel değişiklikler öbür test dosyalarına sızmasın diye stubGlobal + afterAll'da geri alınır
  const synth = { speaking: false, cancel() {}, getVoices: () => [], speak(u: U) { rates.push({ text: u.text, rate: u.rate }); u.onend?.(); } };
  vi.stubGlobal("SpeechSynthesisUtterance", U);
  vi.stubGlobal("speechSynthesis", synth);
  if (typeof window === "undefined") vi.stubGlobal("window", { speechSynthesis: synth });
  else vi.stubGlobal("window", Object.assign(Object.create(window), { speechSynthesis: synth }));
});
afterAll(() => { vi.unstubAllGlobals(); });

describe("dinleme başlangıç hızı (#58 B7)", () => {
  it("Normal: hız değişmez", async () => {
    const { speak, setBaslangicHizi, RATE } = await import("./speech.ts");
    setBaslangicHizi("normal"); rates.length = 0;
    await speak("Guten Morgen.");
    expect(rates[0]!.rate).toBe(RATE.normal);
  });
  it("Yavaş: ilk çalma yavaş, tekrar normal; açık hız ve Türkçe değişmez", async () => {
    const { speak, setBaslangicHizi, RATE, ilkHiz } = await import("./speech.ts");
    setBaslangicHizi("slow"); rates.length = 0;
    await speak("Wie spät ist es?");
    await speak("Wie spät ist es?");
    await speak("Das ist natürlich.", "de", "natural");
    await speak("Merhaba.", "tr");
    expect(rates.map((r) => r.rate)).toEqual([RATE.slow, RATE.normal, RATE.natural, 1]);
    expect(ilkHiz("medya:x:c1")).toBe("slow");
    expect(ilkHiz("medya:x:c1")).toBe("normal");
  });
  it("kesin hız (seviye ölçümü) başlangıç kuralını atlar", async () => {
    const { speak, setBaslangicHizi, RATE } = await import("./speech.ts");
    setBaslangicHizi("slow"); rates.length = 0;
    await speak("Ölçüm cümlesi eins.", "de", "normal", true);
    expect(rates[0]!.rate).toBe(RATE.normal);
  });
  it("dizi: hız bütün dizi için bir kez; içerik hızı korunur", async () => {
    const { speak, speakDizi, setBaslangicHizi, RATE } = await import("./speech.ts");
    setBaslangicHizi("slow"); rates.length = 0;
    await speak("Satır A.");                       // tek başına duyulmuş satır
    rates.length = 0;
    await speakDizi([{ de: "Satır A." }, { de: "Satır B." }, { de: "Satır C.", speed: "natural" }]);
    expect(rates.map((r) => r.rate)).toEqual([RATE.slow, RATE.slow, RATE.natural]);
    rates.length = 0;
    await speakDizi([{ de: "Satır A." }, { de: "Satır B." }, { de: "Satır C.", speed: "natural" }]);
    expect(rates.map((r) => r.rate)).toEqual([RATE.normal, RATE.normal, RATE.natural]);
  });
  it("Normal'de dinlenen cümle 'çalındı' sayılmaz", async () => {
    const { speak, setBaslangicHizi, RATE } = await import("./speech.ts");
    setBaslangicHizi("normal"); rates.length = 0;
    await speak("Neuer Satz eins.");
    setBaslangicHizi("slow");
    await speak("Neuer Satz eins.");
    expect(rates.map((r) => r.rate)).toEqual([RATE.normal, RATE.slow]);
  });
});
