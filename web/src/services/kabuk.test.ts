import { describe, expect, it } from "vitest";
import { kabukBilgisi, kabukSatiri, KABUK_EKLENTILERI } from "./kabuk.ts";

describe("kabuk görünürlüğü (PM-071 1. adım)", () => {
  it("tarayıcıda kabuk yok", async () => {
    expect(await kabukBilgisi(undefined)).toEqual({ kabukta: false });
    expect(await kabukBilgisi({ isNativePlatform: () => false })).toEqual({ kabukta: false });
    expect(kabukSatiri({ kabukta: false })).toBe("Kabuk: yok (tarayıcıda açık)");
  });
  it("kabukta: sürüm (yapı numarasıyla) ve bulunan/eksik eklentiler", async () => {
    const b = await kabukBilgisi({ isNativePlatform: () => true, isPluginAvailable: (a) => a !== "VoiceRecorder", Plugins: { App: { getInfo: async () => ({ version: "2026.11.20", build: "57" }) } } });
    expect(b).toMatchObject({ kabukta: true, surum: "2026.11.20 (57)", yok: ["ses kaydı"] });
    expect(kabukSatiri(b)).toBe(`Kabuk 2026.11.20 (57) · eklentiler: ${KABUK_EKLENTILERI.filter(([a]) => a !== "VoiceRecorder").map(([, t]) => t).join(", ")} · eksik: ses kaydı`);
  });
  it("isPluginAvailable yoksa Plugins'e bakılır; App yoksa sürüm bilinmez, hata atılmaz", async () => {
    const b = await kabukBilgisi({ isNativePlatform: () => true, Plugins: { SpeechRecognition: {}, Haptics: {} } });
    expect(b).toMatchObject({ kabukta: true, surum: null, var: ["konuşma tanıma", "titreşim"] });
    expect(kabukSatiri(b)).toMatch(/^Kabuk sürümü bilinmiyor · eklentiler: konuşma tanıma, titreşim · eksik: ses kaydı/);
  });
  it("getInfo hata verirse sürüm bilinmez", async () => {
    const b = await kabukBilgisi({ isNativePlatform: () => true, isPluginAvailable: () => true, Plugins: { App: { getInfo: async () => { throw new Error("x"); } } } });
    expect(b).toMatchObject({ surum: null, yok: [] });
  });
});
