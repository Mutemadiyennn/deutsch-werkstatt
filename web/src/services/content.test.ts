import { describe, it, expect, vi } from "vitest";
import { within } from "./content.ts";

// DN-2 §4 / inceleme #43: istek zinciri (current → index → dosya) toplamda sınırı aşmaz
describe("içerik yükleme üst sınırı", () => {
  it("zincir sınırı aşınca Türkçe hata", async () => {
    vi.useFakeTimers();
    const never = new Promise<number>(() => {});
    const p = within(never, 8000);
    vi.advanceTimersByTime(8001);
    await expect(p).rejects.toThrow(/zamanında yüklenemedi/);
    vi.useRealTimers();
  });
  it("zamanında biten yükleme değerini döndürür", async () => {
    await expect(within(Promise.resolve(7), 100)).resolves.toBe(7);
  });
});
