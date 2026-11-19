import { beforeAll, describe, expect, it } from "vitest";

const rates: { text: string; rate: number }[] = [];
beforeAll(() => {
  class U { text: string; rate = 1; lang = ""; voice: unknown; onend: (() => void) | null = null; onerror: (() => void) | null = null; constructor(t: string) { this.text = t; } }
  const g = globalThis as Record<string, unknown>;
  g.window = g;
  g.SpeechSynthesisUtterance = U;
  g.speechSynthesis = { speaking: false, cancel() {}, getVoices: () => [], speak(u: U) { rates.push({ text: u.text, rate: u.rate }); u.onend?.(); } };
});

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
});
