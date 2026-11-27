/** PM-148 karar 2: profil yuvaları ({ulke}, {sehir}…) gösterimde, seslendirmede, kabulde ve yapay zekâ maskesinde */
import { afterEach, describe, expect, it } from "vitest";
import { expandAccepted, fillName, hakkimdaAyarla, personalizeDeep, profilDoldur, redact, showText, speakText, unredact } from "./persona.ts";
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
    // ad yuvasıyla birlikte: fillName ikisini de doldurur
    expect(fillName("Ich heiße {name} und komme aus {ulke}.", "Ich heiße Mila und komme aus Polen.")).toBe("Ich heiße Mila und komme aus Polen.");
  });
  it("yapay zekâ: profil değerleri [...] olur, ad [Name]; unredact adı geri koyar, maskeyi … yapar", () => {
    const p = { name: "Mila", profil: { ulke: "Türkei", sehir: "Bad Aibling" } };
    const r = redact("Ich heiße Mila, ich komme aus der Tuerkei und wohne in Bad Aibling.", p);
    expect(r).toBe("Ich heiße [Name], ich komme aus der […] und wohne in […].");
    expect(unredact("Gut, [Name]! Wie ist es in […]?", p)).toBe("Gut, Mila! Wie ist es in …?");
  });
  it("içerik denetiminde yuvalar sözcük sayılmaz (teach.ts)", () => {
    expect(tokens("Ich komme aus {ulke} und bin {meslek}.")).toEqual(["ich", "komme", "aus", "und", "bin"]);
  });
});
