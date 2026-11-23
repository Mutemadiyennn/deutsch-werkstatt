import { describe, expect, it } from "vitest";
import { notoDosya, notoSvg } from "./emoji.ts";

describe("Noto Emoji katmanı (PM-081 B)", () => {
  it("haritanın kodu SVG'ye döner; tuş başlığı (0030_20e3) ve FE0F'siz biçim bulunur", () => {
    expect(notoSvg("1f382")).toMatch(/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" viewBox="0 0 128 128"/);
    expect(notoSvg("0030_20e3")).toContain("<svg");
    expect(notoSvg("2600")).toContain("<svg");
  });
  it("geçersiz ya da bilinmeyen kod null; dosya adı güvenli", () => {
    expect(notoSvg("../x")).toBeNull();
    expect(notoSvg("ffffff")).toBeNull();
    expect(notoDosya("0030_20E3")).toBe("noto-0030-20e3.svg");
  });
});
