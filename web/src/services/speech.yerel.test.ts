import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

/** Kabuk 1.5 (PM 7042267632): kabukta iPhone'un kendi seslendirmesi; perde oyunu yok, hız eklentinin gerçek hızı */
const cagri: { text: string; lang: string; rate: number; pitch: number; voice?: number }[] = [];
let durdu = 0;
const SESLER = [
  { name: "Anna", lang: "de-DE", voiceURI: "com.apple.voice.compact.de-DE.Anna" },
  { name: "Anna", lang: "de-DE", voiceURI: "com.apple.voice.premium.de-DE.Anna" },
  { name: "Markus", lang: "de-DE", voiceURI: "com.apple.voice.enhanced.de-DE.Markus" },
  { name: "Yelda", lang: "tr-TR", voiceURI: "com.apple.voice.compact.tr-TR.Yelda" }
];
beforeAll(() => {
  const tts = {
    getSupportedVoices: async () => ({ voices: SESLER.map((v) => ({ ...v, localService: true, default: false })) }),
    speak: async (o: any) => { cagri.push(o); await new Promise((r) => setTimeout(r, 20)); },
    stop: async () => { durdu++; }
  };
  vi.stubGlobal("Capacitor", { isNativePlatform: () => true, isPluginAvailable: (n: string) => n === "TextToSpeech", Plugins: { TextToSpeech: tts } });
  vi.stubGlobal("localStorage", { getItem: () => null, setItem: () => {}, removeItem: () => {} });
  if (typeof window === "undefined") vi.stubGlobal("window", {});
});
afterAll(() => { vi.unstubAllGlobals(); });

describe("Kabuk 1.5: yerel seslendirme", () => {
  it("yüklenince yol 'yerel'; sesler eklentiden, aynı ad tek (premium kalır)", async () => {
    const { sesYolu, yerelSesleriYukle, cihazSesleri } = await import("./speech.ts");
    const { havuzlar } = await import("../core/sesSec.ts");
    expect(await yerelSesleriYukle()).toBe(true);
    expect(sesYolu()).toBe("yerel");
    expect(cihazSesleri().map((v) => v.name)).toEqual(["Anna", "Anna", "Markus", "Yelda"]);
    expect(havuzlar(cihazSesleri()).kadin.map((v) => v.voiceURI)).toEqual(["com.apple.voice.premium.de-DE.Anna"]);
  });
  it("erkek karakter gerçek erkek sesiyle, perde 1; hız eklentiye gerçek değerle (yavaş 0,5)", async () => {
    const { speak, konusanAta, RATE } = await import("./speech.ts");
    const a = konusanAta(["Herr Wimmer"]).get("Herr Wimmer")!;
    expect(a.ses!.name).toBe("Markus"); expect(a.pitch).toBe(1);
    cagri.length = 0;
    await speak("Guten Morgen.", "de", "normal", true, a);
    await speak("Guten Morgen.", "de", "slow", true, a);
    expect(cagri.map((c) => [c.voice, c.pitch, c.rate, c.lang])).toEqual([[2, 1, RATE.normal, "de-DE"], [2, 1, RATE.slow, "de-DE"]]);
    // kadın karakter premium Anna (dizindeki yeri 1)
    cagri.length = 0;
    await speak("Hallo.", "de", "normal", true, konusanAta(["Frau Huber"]).get("Frau Huber"));
    expect(cagri[0]!.voice).toBe(1);
  });
  it("Türkçe bölüm Türkçe yerel sesle; durdurma eklentiye gider; ölçüm çağrıdan bitişe", async () => {
    const { speak, stopSpeaking, olcCal, cihazSesleri } = await import("./speech.ts");
    cagri.length = 0;
    await speak("Merhaba.", "tr");
    expect(cagri[0]).toMatchObject({ lang: "tr-TR", voice: 3, rate: 1 });
    stopSpeaking(); await new Promise((r) => setTimeout(r, 0));
    expect(durdu).toBeGreaterThan(0);
    const ms = await olcCal("Guten Morgen.", cihazSesleri()[2], 0.5);
    expect(ms).not.toBeNull(); expect(ms!).toBeGreaterThanOrEqual(15);
    expect(cagri.at(-1)).toMatchObject({ voice: 2, rate: 0.5 });
  });
});
