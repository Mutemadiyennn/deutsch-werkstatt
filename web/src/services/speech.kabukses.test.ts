import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

/** PM-132 (sahne tek sesle okunuyordu), PM-137 (mikrofon hatası "diger"e düşüyordu), PM-142 md. 2.4 (tanılama) */
const cagri: { text: string; voice?: number }[] = [];
const sr: string[] = [];
let dinliyor = false;
let basHata: string | null = null;
const depo = new Map<string, string>();
const SESLER = [
  { name: "Anna", lang: "de-DE", voiceURI: "com.apple.voice.premium.de-DE.Anna" },
  { name: "Petra", lang: "de-DE", voiceURI: "com.apple.voice.premium.de-DE.Petra" },
  { name: "Markus", lang: "de-DE", voiceURI: "com.apple.voice.enhanced.de-DE.Markus" },
  { name: "Martin", lang: "de-DE", voiceURI: "com.apple.voice.enhanced.de-DE.Martin" }
];
beforeAll(() => {
  const tts = {
    getSupportedVoices: async () => ({ voices: SESLER.map((v) => ({ ...v, localService: true, default: false })) }),
    speak: async (o: any) => { cagri.push(o); },
    stop: async () => {}
  };
  const SpeechRecognition = {
    checkPermissions: async () => ({ speechRecognition: "granted" }),
    isListening: async () => { sr.push("isListening"); return { listening: dinliyor }; },
    stop: async () => { sr.push("stop"); dinliyor = false; },
    start: async () => { sr.push("start"); if (basHata) throw new Error(basHata); return { matches: ["Frau"] }; }
  };
  vi.stubGlobal("Capacitor", { isNativePlatform: () => true, isPluginAvailable: (n: string) => n === "TextToSpeech" || n === "SpeechRecognition", Plugins: { TextToSpeech: tts, SpeechRecognition } });
  vi.stubGlobal("localStorage", { getItem: (k: string) => depo.get(k) ?? null, setItem: (k: string, v: string) => void depo.set(k, v), removeItem: (k: string) => void depo.delete(k) });
  if (typeof window === "undefined") vi.stubGlobal("window", {});
});
afterAll(() => { vi.unstubAllGlobals(); });

describe("PM-132: sahnede her konuşan kendi sesiyle", () => {
  it("iki konuşanlı sahne: iki ayrı ses, satır sırası bildirilir, atama tanılamaya yazılır", async () => {
    const { yerelSesleriYukle, setKarakterler, setOgrenciHitap, speakDizi, taniOku, konusanAdi } = await import("./speech.ts");
    await yerelSesleriYukle();
    setKarakterler([{ id: "ch:popescu", name: "Ioana Popescu", ses: { cinsiyet: "kadin", sira: 0 } }]);
    setOgrenciHitap("Herr");
    cagri.length = 0;
    const satirlar: number[] = [];
    await speakDizi([{ de: "Hallo!", kim: "ch:popescu" }, { de: "Heute ist Dienstag.", kim: "ogrenci" }, { de: "Ach so!", kim: "ch:popescu" }], "normal", 0, undefined, (i) => satirlar.push(i));
    expect(satirlar).toEqual([0, 1, 2]);
    const sesler = cagri.map((c) => SESLER[c.voice!]!.name);
    expect(sesler[0]).toBe(sesler[2]);
    expect(sesler[0]).not.toBe(sesler[1]);
    expect(["Anna", "Petra"]).toContain(sesler[0]);
    expect(["Markus", "Martin"]).toContain(sesler[1]);
    expect(taniOku().sahne).toMatch(/ch:popescu → (Anna|Petra) 1 · ogrenci → (Markus|Martin) 1/);
    expect([konusanAdi("ch:popescu"), konusanAdi("ogrenci"), konusanAdi("karsi"), konusanAdi("Luka")]).toEqual(["Ioana Popescu", "Sen", "Karşındaki", "Luka"]);
  });
  it("konuşansız dizi tanılamada görünür (tek ses: PM-132'nin eski kusuru)", async () => {
    const { speakDizi, taniOku } = await import("./speech.ts");
    await speakDizi([{ de: "Eins." }, { de: "Zwei." }]);
    expect(taniOku().sahne).toBe("2 satır, konuşan yok (tek ses)");
  });
});

describe("PM-137: iOS eklentisinin hata metinleri sınıflanır", () => {
  it("Almanca (yerelleştirilmiş) ve sabit İngilizce metinler", async () => {
    const { sttHataTuru } = await import("./speech.ts");
    const t = (m: string) => sttHataTuru(new Error(m));
    expect(t("Keine Sprache erkannt")).toBe("sessiz");
    expect(t("No speech detected")).toBe("sessiz");
    expect(t("Recognition request was canceled")).toBe("sessiz");
    expect(t("Ongoing speech recognition")).toBe("mesgul");
    expect(t("Microphone is already in use by another application.")).toBe("mesgul");
    expect(t("Missing permission")).toBe("izin");
    expect(t("User denied access to microphone")).toBe("izin");
    expect(t("Siri und Diktierfunktion sind deaktiviert.")).toBe("hizmet");
    expect(t("Siri and Dictation are disabled")).toBe("hizmet");
    expect(t("service-not-allowed")).toBe("hizmet");
    expect(t("not-allowed")).toBe("izin");
    expect(t("Unknown error occured")).toBe("diger");
  });
  it("'diger'de ham metin öğrenciye görünür; menü adları Almanca", async () => {
    const { sttHataMetni, STT_HATA_TR } = await import("./speech.ts");
    expect(sttHataMetni(new Error("Unknown error occured"))).toBe(`${STT_HATA_TR.diger} (Kod: Unknown error occured)`);
    expect(sttHataMetni(new Error("Missing permission"))).toBe(STT_HATA_TR.izin);
    expect(STT_HATA_TR.izin).toContain("Einstellungen → Datenschutz & Sicherheit");
    expect(STT_HATA_TR.hizmet).toContain("Diktierfunktion");
  });
});

describe("PM-137: kabukta tanıma", () => {
  it("açık kalmış oturum önce kapatılır, sonra başlar", async () => {
    const { listenOnce } = await import("./speech.ts");
    dinliyor = true; sr.length = 0; basHata = null;
    expect(await listenOnce("de-DE", 5000).result).toEqual(["Frau"]);
    expect(sr).toEqual(["isListening", "stop", "start"]);
  });
  it("hata: ham metin tanılamaya yazılır", async () => {
    const { listenOnce, taniOku } = await import("./speech.ts");
    basHata = "Keine Sprache erkannt";
    await expect(listenOnce("de-DE", 5000).result).rejects.toThrow("Keine Sprache erkannt");
    expect(taniOku().hata).toMatch(/^\d\d-\d\dT\d\d:\d\d yerel: Keine Sprache erkannt$/);
    basHata = null;
  });
});
