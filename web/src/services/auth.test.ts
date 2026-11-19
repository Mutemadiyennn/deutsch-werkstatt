import { describe, expect, it } from "vitest";
import { authErrorTr } from "./auth.ts";

describe("giriş hata mesajları (PM 7017351856: sessiz başarısızlık yok)", () => {
  it("bilinen kodlar Türkçe neden verir", () => {
    expect(authErrorTr({ code: "auth/popup-blocked" })).toMatch(/engelledi/);
    expect(authErrorTr({ code: "auth/unauthorized-domain" })).toMatch(/yetkili değil/);
    expect(authErrorTr({ code: "auth/invalid-credential" })).toMatch(/yanlış/);
  });
  it("bilinmeyen hata gerçek kodu gösterir, uzunluk sınırlı", () => {
    expect(authErrorTr({ code: "auth/argument-error" })).toContain("(kod: auth/argument-error)");
    expect(authErrorTr(new Error("x".repeat(200))).length).toBeLessThan(110);
  });
});
