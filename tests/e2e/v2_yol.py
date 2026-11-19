"""
#58 A5b ders yolu — 1. günü Bugün ekranından baştan sona yürür (kabul koşusunun A13 iskeleti):
  Bugün "Sıradaki" → Seans 1 Bahçe (günün yeni kartları) → Bugün → Seans 2 temel ders → Bugün → Seans 3 video + sesler
  → gün biter, 2. gün (varsa) açılır; tamamlanan adım yeniden önerilmez; XP artar, seri 1; v1'e gönderme yok
  python3 tests/e2e/v2_yol.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
import v2_garden, v2_ders, v2_medya

PORT = 4196

def next_card(pg, base):
    pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=next-activity][data-m1]")
    return pg.inner_text("[data-test=next-activity]")

def main():
    v2_medya.install_media()
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        na = next_card(pg, base)
        check("1. gün" in na and "Seans 1" in na and "Kelime Bahçesi" in na, f"Bugün: 1. gün · Seans 1 Kelime Bahçesi ({na[:80]!r})")
        check("Eski uygulama" not in pg.inner_text("main"), "Bugün'de eski uygulamaya gönderme yok")
        if shots: shot(pg, "y01-bugun", full=False)
        # Seans 1
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=garden], [data-test=garden-empty]")
        k = 0
        while pg.locator("[data-test=garden]").count() and not pg.locator("[data-test=garden-done]").count() and k < 40:
            v2_garden.answer_current(pg); k += 1
        check(pg.locator("[data-test=garden-done], [data-test=garden-empty]").count() == 1, f"Seans 1 bitti ({k} soru)")
        # Seans 2
        na = next_card(pg, base)
        check("Seans 2" in na and "Temel ders" in na, f"Bugün: Seans 2 temel ders ({na[:80]!r})")
        check("Seans 1: Kelime Bahçesi" not in na, "biten Seans 1 yeniden önerilmiyor")
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=ders-tanit]")
        k = 0
        while not pg.locator("[data-test=ders-bitti]").count() and k < 120:
            v2_ders.step(pg); k += 1
        check(pg.locator("[data-test=ders-bitti]").count() == 1, f"Seans 2 bitti ({k} adım)")
        # Seans 3: video + sesler
        n3 = 0
        while True:
            na = next_card(pg, base)
            if "Seans 3" not in na: break
            n3 += 1
            pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=medya]")
            k = 0
            while not pg.locator("[data-test=medya-bitti]").count() and k < 100:
                v2_medya.answer_step(pg); k += 1
            check(pg.locator("[data-test=medya-bitti]").count() == 1, f"Seans 3 · kayıt {n3} bitti ({k} adım)")
            if n3 > 5: break
        check(n3 >= 3, f"Seans 3: video + en az 2 ses ({n3})")
        # gün bitti
        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=yol]")
        check(pg.get_attribute("[data-test=gun-1]", "data-durum") == "bitti", "yol: 1. gün bitti")
        xp = int(pg.inner_text("[data-test=xp]"))
        check(xp > 30, f"XP kazanıldı ({xp})")
        check(pg.locator("[data-test=seri]").count() == 1 and pg.inner_text("[data-test=seri]") == "1", "seri: 1 gün")
        no_overflow(pg, "yol")
        if shots: shot(pg, "y02-yol", full=False)
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
