import { describe, it, expect } from "vitest";
import { kisalt, cumleler } from "../src/ai/workersai.ts";

const k = (s: string) => s.split(/\s+/).length;
describe("rol oyunu cevabı ≤25 kelime (PM 7022002310-5; inceleme #125 P1-1)", () => {
  it("saat, tarih ve kısaltmada cümle bölünmez", () => {
    expect(cumleler("Wir haben um 9.30 Uhr frei. Dr. Weber ist am 14. März da. Bis dann!")).toEqual(["Wir haben um 9.30 Uhr frei.", "Dr. Weber ist am 14. März da.", "Bis dann!"]);
  });
  it("uzun cevap baştan bütün cümlelerle kısalır; kelimeden kesilmez", () => {
    const s = "Ja, gerne. Wir haben am Donnerstag um 9.30 Uhr noch einen Termin frei. Oder möchten Sie lieber am Freitag kommen, dann wäre es am Nachmittag ab drei Uhr möglich, wenn das passt?";
    expect(kisalt(s)).toBe("Ja, gerne. Wir haben am Donnerstag um 9.30 Uhr noch einen Termin frei.");
  });
  it("sığan soru düşmez", () => {
    const s = "Gut. Dann nehmen wir den Termin am Donnerstag früh um acht Uhr in unserer Praxis am Marktplatz gegenüber der Apotheke im ersten Stock. Passt das?";
    const r = kisalt(s); expect(k(r)).toBeLessThanOrEqual(25); expect(r.endsWith("Passt das?")).toBe(true);
  });
  it("bitişte (end: true) veda düşmez", () => {
    const s = "Gut, dann sehen wir uns am Donnerstag um zehn Uhr in der Praxis. Bitte bringen Sie Ihre Karte mit und kommen Sie pünktlich. Auf Wiedersehen!";
    const r = kisalt(s, 25, true); expect(k(r)).toBeLessThanOrEqual(25); expect(r.endsWith("Auf Wiedersehen!")).toBe(true);
  });
  it("tek uzun cümle kesilmez (istem sınırı asıl önlem)", () => {
    const s = "Das ist ein sehr langer einzelner Satz ohne jede Unterbrechung der wirklich viel zu lang ist für eine kurze Antwort im Rollenspiel und trotzdem bleibt er ganz";
    expect(kisalt(s)).toBe(s);
  });
});
