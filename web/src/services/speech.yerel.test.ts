import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

/** Kabuk 1.5 (PM 7042267632): kabukta iPhone'un kendi seslendirmesi; perde oyunu yok, hız eklentinin gerçek hızı */
const cagri: { text: string; lang: string; rate: number; pitch: number; voice?: number }[] = [];
let durdu = 0;
let asili = false;
const SESLER = [
  { name: "Anna", lang: "de-DE", voiceURI: "com.apple.voice.compact.de-DE.Anna" },
  { name: "Anna", lang: "de-DE", voiceURI: "com.apple.voice.premium.de-DE.Anna" },
  { name: "Markus", lang: "de-DE", voiceURI: "com.apple.voice.enhanced.de-DE.Markus" },
  { name: "Yelda", lang: "tr-TR", voiceURI: "com.apple.voice.compact.tr-TR.Yelda" }
];
let liste = () => SESLER;
beforeAll(() => {
  const tts = {
    getSupportedVoices: async () => ({ voices: liste().map((v) => ({ ...v, localService: true, default: false })) }),
    speak: async (o: any) => { cagri.push(o); if (asili) return new Promise<void>(() => {}); await new Promise((r) => setTimeout(r, 20)); },
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
  it("PM 7061337043: kabukta yavaş kademeyi duraklar ayırır (Biraz yavaş noktalamada, Yavaş ≤ 3 sözcük, Çok yavaş sözcük sözcük)", async () => {
    const { speak, setYavasOran, cihazSesleri, olcCal, yavasParcalar } = await import("./speech.ts");
    const T = "Guten Morgen! Ich hätte gern einen Termin am Montag.";
    expect(yavasParcalar(T, 0.6).parcalar).toEqual(["Guten Morgen!", "Ich hätte gern einen Termin am Montag."]);
    expect(yavasParcalar(T, 0.5).parcalar).toEqual(["Guten Morgen!", "Ich hätte gern", "einen Termin am", "Montag."]);
    expect(yavasParcalar(T, 0.4).parcalar).toHaveLength(9);
    expect(yavasParcalar(T, 0.95).parcalar).toEqual([T]);
    const a = { ses: cihazSesleri()[2]!, pitch: 1 };
    for (const [oran, n] of [[0.6, 2], [0.5, 4], [0.4, 9]] as const) {
      setYavasOran(oran); cagri.length = 0;
      await speak(T, "de", "slow", true, a);
      expect(cagri.map((c) => c.rate)).toEqual(Array(n).fill(oran));
      expect(new Set(cagri.map((c) => c.voice))).toEqual(new Set([2]));
    }
    // ölçüm uygulamadaki okumayı ölçer (aynı parçalar ve duraklar); normal tek parça
    setYavasOran(0.4); cagri.length = 0;
    const yavas = await olcCal(T, cihazSesleri()[2], 0.4);
    expect(cagri).toHaveLength(9); expect(yavas!).toBeGreaterThanOrEqual(8 * 300);
    cagri.length = 0; await olcCal(T, cihazSesleri()[2], 0.95); expect(cagri).toHaveLength(1);
    setYavasOran(0.5);
  }, 20_000);
  it("durdur + hemen yeni cümle: yeni cümle sürerken ses etkin sayılır (inceleme #164 P2)", async () => {
    const { speak, stopSpeaking, audioActive } = await import("./speech.ts");
    const p1 = speak("Eins zwei drei.", "de", "normal", true);
    stopSpeaking();
    await new Promise((r) => setTimeout(r, 12));
    const p2 = speak("Vier fünf sechs.", "de", "normal", true);
    await p1;   // eski çağrı (20 ms) yenisi (12 + 20 ms) sürerken biter
    expect(audioActive()).toBe(true);
    await p2;
    expect(audioActive()).toBe(false);
  });
  it("eklenti bitişi bildirmezse güvenlik zaman aşımıyla çözülür", async () => {
    const { speak, audioActive } = await import("./speech.ts");
    vi.useFakeTimers(); asili = true;
    try {
      const p = speak("Hallo.", "de", "normal", true);
      await vi.advanceTimersByTimeAsync(5000);
      await p;
      expect(audioActive()).toBe(false);
    } finally { asili = false; vi.useRealTimers(); }
  });
  it("ses listesi yeniden yüklenince dizin yeni listeden (inceleme #164 P1-1)", async () => {
    const { yerelSesleriYukle, speak, konusanAta } = await import("./speech.ts");
    liste = () => [{ name: "Martin", lang: "de-DE", voiceURI: "com.apple.voice.enhanced.de-DE.Martin" }, ...SESLER];
    await yerelSesleriYukle();
    cagri.length = 0;
    await speak("Guten Tag.", "de", "normal", true, konusanAta(["Herr Wimmer"]).get("Herr Wimmer"));
    const v = cagri[0]!.voice!;
    expect(["Martin", "Markus"]).toContain(liste()[v]!.name);
    liste = () => SESLER; await yerelSesleriYukle();
  });
});
