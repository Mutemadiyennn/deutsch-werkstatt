"""
DN-2 §5 (PM-030, BY-12.1a) — uçak modu günü: ilk çevrimiçi açılıştan sonra ağ tamamen kapatılır ve bir gün yürünür.
İnternetsiz + mikrofonsuz (başsız tarayıcıda konuşma tanıma yok) + yapay zekâsız. Sayfa hatası, hata paneli, boş ekran → kırmızı.
  python3 tests/e2e/ucak.py [--browser webkit] [--device "iPhone 15"]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, ERR

PORT = 4189
SC = "sc:telefon:01-arzttermin"

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        # servis işçisi kuruldu ve içerik paketi önbellekte
        ok = pg.evaluate("""async () => { const r = await navigator.serviceWorker.ready; for (let i = 0; i < 60; i++) { const ks = await caches.keys(); let n = 0; for (const k of ks) n += (await (await caches.open(k)).keys()).length; if (navigator.serviceWorker.controller && n > 5) return n; await new Promise(r => setTimeout(r, 250)); } return 0; }""")
        check(ok > 5, f"servis işçisi + önbellek hazır ({ok} kayıt)")
        ctx.set_offline(True)
        pg.reload(); pg.wait_for_selector("[data-tab=today]", timeout=10_000)
        check(True, "uçak modunda yeniden açılış")
        walk = [("#/today", "[data-test=next-activity]"), ("#/learn", "main h1, main h2"), (f"#/scenario/{SC}", "[data-section]"),
                (f"#/scenario/{SC}/words", "[data-test=stage-intro]"), (f"#/scenario/{SC}/chunks", "[data-test=ifade-card], [data-test=say-q], [data-test=meaning-q], [data-test=section-done], .empty"),
                (f"#/scenario/{SC}/build", "[data-test=answer], [data-chip], [data-test=section-done]"), (f"#/scenario/{SC}/drills", "[data-test=answer], [data-chip], button.opt"),
                (f"#/scenario/{SC}/listening", "[data-test=to-questions], button.opt"), (f"#/scenario/{SC}/dialogue", "[data-test=next]"),
                (f"#/scenario/{SC}/roleplay", "[data-test=rp-start]"), (f"#/call/{SC}", "[data-test=call]"), ("#/progress", "[data-test=panel-focus]"), ("#/profile", "main h1, main h2")]
        for h, sel in walk:
            pg.goto(base + h)
            try: pg.wait_for_selector(sel, timeout=10_000); shown = True
            except Exception: shown = False
            check(shown and pg.locator(".card.err, [role=alert]").count() == 0, f"uçak modu: {h} açıldı, hata paneli yok")
        # yapay zekâsız üretim: yazılı cevap kural tabanlı değerlendirilir, uygulama takılmaz
        pg.goto(base + f"#/scenario/{SC}/drills"); pg.wait_for_selector("[data-test=answer], [data-chip], button.opt")
        if pg.locator("[data-test=answer]").count():
            pg.fill("[data-test=answer]", "Guten Tag"); pg.click("[data-test=submit]")
            pg.wait_for_selector("[data-test=verdict]", timeout=5000); check(True, "uçak modu: cevap internetsiz değerlendirildi")
        ctx.set_offline(False); b.close()
    srv.shutdown()
    check(not [e for e in ERR if e.startswith("sayfa hatası")], "sayfa hatası yok")
    finish()

if __name__ == "__main__":
    main()
