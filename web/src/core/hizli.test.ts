import { describe, it, expect } from "vitest";
import { hizliGecis, HIZLI_GUN, review } from "./srs.ts";
import { XP } from "./gun.ts";

describe("B16 hızlı geçiş (PM-066 madde 1, 5)", () => {
  const now = new Date("2026-11-19T10:00:00Z");
  it("aktif yol doğru üretimle başlar; pasif yolun ilk tekrarı HIZLI_GUN gün sonra (yüksek kararlılık)", () => {
    const it = hizliGecis(undefined, "lx:Montag", "garden@1", now);
    expect(it.active.ok).toBe(1); expect(it.active.fsrs).toBeTruthy();
    expect(it.passive.fsrs!.stability).toBe(HIZLI_GUN);
    expect(Date.parse(it.passive.fsrs!.due) - now.getTime()).toBe(HIZLI_GUN * 86400_000);
    expect(it.firstAt?.passive).toBe(now.toISOString());
  });
  it("kart yine takvimde: ilk tanıma tekrarında yanlışsa FSRS normal karta düşürür (kararlılık düşer, kısa aralık)", () => {
    const it = hizliGecis(undefined, "lx:Montag", "garden@1", now);
    const sonra = new Date(now.getTime() + HIZLI_GUN * 86400_000);
    const y = review(it, { itemId: "lx:Montag", path: "passive", outcome: "wrong", session: "garden@2" }, sonra);
    expect(y.passive.fsrs!.stability).toBeLessThan(HIZLI_GUN);
    expect(Date.parse(y.passive.fsrs!.due) - sonra.getTime()).toBeLessThan(86400_000);
    expect(y.inBank).toBe(true);
  });
  it("üretimle bilinen kart tanımadan fazla XP verir", () => { expect(XP.bilinen).toBeGreaterThan(XP.dogru); });
});
