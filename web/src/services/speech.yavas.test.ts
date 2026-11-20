import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

/** PM 7042161522-1: "Yavaş" duyulur olsun; yavaşlamayan ses yedeğe ya da gruplu okumaya düşer */
const oku: { text: string; rate: number; ses: string | null }[] = [];
const V = [["Anna", "de-DE"], ["Helena (Erweitert)", "de-DE"], ["Markus", "de-DE"], ["Viktor", "de-DE"], ["Deutsch X", "de-DE"], ["Yelda", "tr-TR"]].map(([name, lang]) => ({ name, lang, voiceURI: name, localService: true, default: false }));
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
  it("0,3 sn altı süre ölçüm sayılmaz: kayıt yok, hüküm yok (PM 7043447488-1)", async () => {
    const { hizKaydet, yavasliyorMu, hizKaydi, gecerliOlcum } = await import("./speech.ts");
    hizKaydet("Anna", { normalMs: 0, yavasMs: 0, rate: 0.5 });
    hizKaydet("Markus", { normalMs: 2900, yavasMs: 120, rate: 0.5 });
    expect(hizKaydi()).toEqual({});
    expect(yavasliyorMu("Anna")).toBeUndefined();
    // eski sürümün yazdığı geçersiz kayıt da yok sayılır
    depo.set("dw2-ses-hiz", JSON.stringify({ Anna: { normalMs: 30, yavasMs: 30, rate: 0.5 } }));
    expect(yavasliyorMu("Anna")).toBeUndefined();
    expect(gecerliOlcum({ normalMs: 300, yavasMs: 450 })).toBe(true);
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
  it("gruplu okuma: duraklama içinde durdurulunca ya da yeni konuşma gelince sonraki grup okunmaz (inceleme #162 P1-1)", async () => {
    const { speak, stopSpeaking, hizKaydet, GRUP_ARA_MS } = await import("./speech.ts");
    hizKaydet("Markus", { normalMs: 3000, yavasMs: 3000, rate: 0.5 });
    // ilk grup ~25 ms çalar; durdurma duraklamanın ortasında
    const p = speak("eins zwei drei vier fünf sechs", "de", "slow", true, ses("Markus"));
    await new Promise((r) => setTimeout(r, 25 + GRUP_ARA_MS / 2)); stopSpeaking(); await p;
    expect(oku.map((o) => o.text)).toEqual(["eins zwei drei"]);
    oku.length = 0;
    const q = speak("eins zwei drei vier fünf sechs", "de", "slow", true, ses("Markus"));
    await new Promise((r) => setTimeout(r, 25 + GRUP_ARA_MS / 2));
    await speak("Hallo.", "de", "normal", true, ses("Anna")); await q;
    expect(oku.map((o) => o.text)).toEqual(["eins zwei drei", "Hallo."]);
  });
  it("yedek ses sahnedeki öteki konuşanın sesi olamaz; cinsi bilinmeyen ses öteki cinse düşmez (inceleme #162 P1-2)", async () => {
    const { speakDizi, hizKaydet, yavaslayanSes, cihazSesleri } = await import("./speech.ts");
    hizKaydet("Markus", { normalMs: 3000, yavasMs: 3000, rate: 0.5 });
    hizKaydet("Viktor", { normalMs: 3000, yavasMs: 4800, rate: 0.5 });
    const v = (ad: string) => cihazSesleri().find((x) => x.name === ad);
    expect(yavaslayanSes(v("Markus"))!.name).toBe("Viktor");
    expect(yavaslayanSes(v("Markus"), new Set(["Viktor"]))).toBeUndefined();
    // cinsi bilinmeyen ses yavaşlamıyorsa kadın/erkek sese düşmez
    hizKaydet("Anna", { normalMs: 3000, yavasMs: 4800, rate: 0.5 });
    hizKaydet("Deutsch X", { normalMs: 3000, yavasMs: 3000, rate: 0.5 });
    expect(yavaslayanSes(v("Deutsch X"))).toBeUndefined();
    // dizi: iki erkek konuşan Markus ve Viktor'da → Markus'un satırı Viktor'a düşmez (gruplu, Markus), Viktor'unki Viktor
    const { konusanAta } = await import("./speech.ts");
    const m = konusanAta(["Herr Lechner", "Herr Weber"]);
    const markusKim = [...m].find(([, a]) => a.ses?.name === "Markus")?.[0];
    const viktorKim = [...m].find(([, a]) => a.ses?.name === "Viktor")?.[0];
    expect(markusKim && viktorKim).toBeTruthy();
    oku.length = 0;
    await speakDizi([{ de: "Guten Morgen.", kim: markusKim }, { de: "Morgen.", kim: viktorKim }], "slow");
    expect(oku.map((o) => [o.text, o.ses])).toEqual([["Guten Morgen.", "Markus"], ["Morgen.", "Viktor"]]);
  });
  it("ölçüm durdurulursa geçersiz (null)", async () => {
    const { olcCal, stopSpeaking } = await import("./speech.ts");
    const p = olcCal("Guten Morgen.", V[0] as unknown as SpeechSynthesisVoice, 0.5);
    stopSpeaking();
    expect(await p).toBeNull();
  });
  it("kelimeGruplari: sıra sayısı ve kısaltma noktası grup sınırı değil", async () => {
    const { kelimeGruplari } = await import("./speech.ts");
    expect(kelimeGruplari("Der Termin ist am 3. Mai.")).toEqual(["Der Termin ist", "am 3. Mai."]);
    expect(kelimeGruplari("Dr. Weber kommt z. B. morgen.")).toEqual(["Dr. Weber kommt", "z. B. morgen."]);
  });
  it("kelimeGruplari: noktalamada ve en çok 3 kelimede böler", async () => {
    const { kelimeGruplari } = await import("./speech.ts");
    expect(kelimeGruplari("Ja, bitte.")).toEqual(["Ja,", "bitte."]);
    expect(kelimeGruplari("Wann haben Sie Zeit?")).toEqual(["Wann haben Sie", "Zeit?"]);
  });
});
