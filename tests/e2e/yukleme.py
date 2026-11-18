"""
DN-2 §4 (PM-030) — yükleme bütçesi:
  ilk açılış ≤ 2 sn · ekran geçişi ≤ 300 ms · hiçbir yükleme göstergesi 10 sn'den uzun kalmaz (takılırsa hata + "Tekrar dene").
  python3 tests/e2e/yukleme.py [--browser webkit] [--device "iPhone 15"]
CI makinesi gerçek iPhone değildir; sınırlar bu yüzden CI için de geçerli üst sınırdır (gerçek cihaz kontrol listesi ayrıca).
"""
import time
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish

PORT = 4188
SC = "sc:telefon:01-arzttermin"

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        # 1) ilk açılış (önbelleksiz yeni bağlam): ilk anlamlı ekran
        b, ctx = launch(p); pg = new_page(ctx)
        t0 = time.time(); pg.goto(base); pg.wait_for_selector("main h1, main h2, [data-tab]"); first = (time.time() - t0) * 1000
        check(first <= 2000, f"ilk açılış {first:.0f} ms (≤ 2000)")
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        # 2) ekran geçişi (sekmeler, içerik önbellekte)
        worst = 0
        for tab, sel in [("learn", "main h1, main h2"), ("progress", "[data-test=panel-focus]"), ("profile", "main h1, main h2"), ("today", "[data-test=next-activity]")]:
            for _ in range(2):
                pg.click(f"[data-tab={tab}]"); t0 = time.time(); pg.wait_for_selector(sel); worst = max(worst, (time.time() - t0) * 1000)
                pg.click("[data-tab=today]" if tab != "today" else "[data-tab=learn]"); pg.wait_for_timeout(150)
        check(worst <= 300, f"en yavaş ekran geçişi {worst:.0f} ms (≤ 300)")
        b.close()
        # 3) içerik isteği takılırsa: ≤ 10 sn içinde hata + "Tekrar dene" (servis işçisi kapalı: önbellek olmayan ilk kullanım)
        b, ctx = launch(p, service_workers="block"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        held = []
        pg.route("**/content/**/scenarios/**", lambda route: held.append(route))  # cevapsız bırak
        t0 = time.time(); pg.goto(base + f"#/scenario/{SC}"); pg.reload()
        try:
            pg.wait_for_selector("button:has-text('Tekrar dene')", timeout=10_500); dt = time.time() - t0
            check(dt <= 10.5, f"takılan içerik: {dt:.1f} sn'de hata + 'Tekrar dene'")
        except Exception:
            check(False, "takılan içerik: 10 sn içinde 'Tekrar dene' görünmedi (sonsuz yükleme)")
        pg.unroute("**/content/**/scenarios/**")
        # bekletilen isteği bırak (Chromium aynı adres için önbellek kilidi tutar; gerçek hayatta istek ya biter ya düşer)
        for r in held:
            try: r.continue_()
            except Exception: pass
        pg.wait_for_timeout(300)
        pg.click("button:has-text('Tekrar dene')")
        try: pg.wait_for_selector("[data-section]", timeout=10_000)
        except Exception: pass
        check(pg.locator("[data-section]").count() == 7, "'Tekrar dene' sonrası ekran yüklendi")
        b.close()
    srv.shutdown(); finish()

if __name__ == "__main__":
    main()
