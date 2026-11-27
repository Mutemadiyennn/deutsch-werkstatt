/** PM-148 karar 2: profil yuvaları ({ulke}, {sehir}…) gösterimde, seslendirmede, kabulde ve yapay zekâ maskesinde */
import { afterEach, describe, expect, it } from "vitest";
import { expandAccepted, fillName, hakkimdaAyarla, personalizeDeep, profilDoldur, profilGeriAl, redact, showText, speakText, unredact } from "./persona.ts";
import { sesMetni } from "../services/speech.ts";
import { tokens } from "../../../content/tools/teach.ts";

afterEach(() => hakkimdaAyarla({}));
describe("profil yuvaları", () => {
  it("gösterim: değer varsa yerleşir, yoksa (ülken) gibi yer", () => {
    expect(showText("Ich komme aus {ulke}. Ich wohne in {sehir}.", { profil: { ulke: "Polen" } })).toBe("Ich komme aus Polen. Ich wohne in (şehrin).");
    expect(speakText("Ich bin {yas} Jahre alt.", { profil: {} })).toBe("Ich bin  Jahre alt.");
  });
  it("cihaz profili ekranlar ayrıca vermeden kullanılır", () => {
    hakkimdaAyarla({ meslek: "Koch" });
    expect(showText("Ich bin {meslek}.", {})).toBe("Ich bin Koch.");
    expect(personalizeDeep({ de: "Ich bin {meslek}.", accepted: ["Ich bin {meslek}.", "Ich arbeite als {meslek}."] }, {})).toEqual({ de: "Ich bin Koch.", accepted: ["Ich bin Koch.", "Ich arbeite als Koch."] });
  });
  it("kabul: değer yoksa yuva kalır, cevaptan 1–4 sözcükle dolar (sözlük sözcüğü de olabilir)", () => {
    expect(expandAccepted(["Ich bin {aile}."], {})).toEqual(["Ich bin {aile}."]);
    expect(profilDoldur("Ich bin {aile}.", "Ich bin verheiratet.")).toBe("Ich bin verheiratet.");
    expect(profilDoldur("Ich komme aus {ulke}.", "ich komme aus der Schweiz")).toBe("Ich komme aus der Schweiz.");
    expect(profilDoldur("Ich spreche {diller}.", "Ich spreche Türkisch und Deutsch.")).toBe("Ich spreche Türkisch und Deutsch.");
    expect(profilDoldur("Ich bin {yas} Jahre alt.", "Ich bin 34 Jahre alt.")).toBe("Ich bin 34 Jahre alt.");
    // uymazsa yuva gösterimdeki yeriyle kalır (doğru sayılmaz)
    expect(profilDoldur("Ich komme aus {ulke}.", "Ich wohne in Rosenheim.")).toBe("Ich komme aus (ülken).");
    // inceleme #286 P1-2: yuvaya giremeyenler
    expect(profilDoldur("Ich bin {aile}.", "Ich bin müde.")).toBe("Ich bin (medeni durumun).");
    expect(profilDoldur("Ich bin {aile}.", "Ich bin Lehrer.")).toBe("Ich bin (medeni durumun).");
    expect(profilDoldur("Ich bin {yas} Jahre alt.", "Ich bin sehr Jahre alt.")).toBe("Ich bin (yaşın) Jahre alt.");
    expect(profilDoldur("Ich komme aus {ulke}.", "Ich komme aus nicht.")).toBe("Ich komme aus (ülken).");
    expect(profilDoldur("Ich bin {meslek}.", "Ich bin Lehrer.")).toBe("Ich bin Lehrer.");
    // 2. tur R2-1: yazıyla yaş; R2-4: yalnız artikel
    for (const y of ["dreißig", "vierunddreißig", "achtzehn", "dreissig"]) expect(profilDoldur("Ich bin {yas} Jahre alt.", `Ich bin ${y} Jahre alt.`)).toBe(`Ich bin ${y} Jahre alt.`);
    expect(profilDoldur("Ich komme aus {ulke}.", "Ich komme aus der.")).toBe("Ich komme aus (ülken).");
    // ad yuvasıyla birlikte: fillName ikisini de doldurur
    expect(fillName("Ich heiße {name} und komme aus {ulke}.", "Ich heiße Mila und komme aus Polen.")).toBe("Ich heiße Mila und komme aus Polen.");
  });
  it("yapay zekâ: profil değerleri [...] olur, ad [Name]; unredact adı geri koyar, maskeyi … yapar", () => {
    const p = { name: "Mila", profil: { ulke: "Türkei", sehir: "Bad Aibling" } };
    const r = redact("Ich heiße Mila, ich komme aus der Tuerkei und wohne in Bad Aibling.", p, { profil: true });
    expect(r).toBe("Ich heiße [Name], ich komme aus der […] und wohne in […].");
    // inceleme #286 P1-5: içerik ve karşı tarafın satırı için profil maskesi yok (varsayılan); sayı hiç maskelenmez
    expect(redact("Wohnen Sie in Bad Aibling?", p)).toBe("Wohnen Sie in Bad Aibling?");
    expect(redact("um 7:30 Uhr", { profil: { yas: "30" } }, { profil: true })).toBe("um 7:30 Uhr");
    expect(unredact("Gut, [Name]! Wie ist es in […]?", p)).toBe("Gut, Mila! Wie ist es in …?");
  });
  it("inceleme #286 P1-3/P1-6: yer okunmaz; yedeğe giren metinde değer yuvasına döner", () => {
    expect(sesMetni("Ich komme aus (ülken). Ich bin (medeni durumun).")).toBe("Ich komme aus. Ich bin.");
    hakkimdaAyarla({ sehir: "Hamburg" });
    expect(profilGeriAl("Ich wohne in Hamburg.")).toBe("Ich wohne in {sehir}.");
    hakkimdaAyarla({ yas: "30" });
    expect(profilGeriAl("um 7:30 Uhr")).toBe("um 7:30 Uhr");
  });
  it("içerik denetiminde yuvalar sözcük sayılmaz (teach.ts)", () => {
    expect(tokens("Ich komme aus {ulke} und bin {meslek}.")).toEqual(["ich", "komme", "aus", "und", "bin"]);
  });
});
