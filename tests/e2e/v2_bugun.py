"""
#58 A6 yeni Bugün + Pomodoro — sahte saatle:
  Bugün'de 100 dk halkası, "Sırada seans 1/4" → "Devam et" süreyi başlatır (öğrenme ekranı başlığında "Seans 1/4 · 25 dk")
  → 25 dk aktif çalışma → mola kartı öğrenme ekranını kaplar, zil + titreşim → telefon kilitli gibi 40 dk tick yok
  → açılınca mola bitmiş, odak 25 dk (kilit süresi sızmamış), "Sırada seans 2/4" → "Devam et" seans 2'yi başlatır
  python3 tests/e2e/v2_bugun.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
import datetime
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
import v2_medya

PORT = 4197
# navigator.vibrate iPhone Safari'de yok: çağrıları sayan sahte (kabukta Capacitor Haptics kullanılır)
VIB = "Object.defineProperty(navigator, 'vibrate', { configurable: true, value: (p) => { (window.__vib = window.__vib || []).push(p); return true; } });"

def durum(pg):
    pg.wait_for_selector("[data-test=seans-durum]")
    return pg.inner_text("[data-test=seans-durum]")

def main():
    v2_medya.install_media()
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); ctx.add_init_script(VIB); pg = new_page(ctx)
        # sabit saat (yarın 10:00): ileri sarma gece yarısını geçmesin (PM-013)
        pg.clock.install(time=datetime.datetime.combine(datetime.date.today() + datetime.timedelta(days=1), datetime.time(10, 0)))
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=next-activity][data-m1]")
        check(pg.locator("[data-test=gun-halkasi] svg.ring").count() == 1, "Bugün: 100 dakika halkası")
        check("0 / 100" in pg.inner_text("[data-test=today-min]"), "halka: 0 / 100 dk")
        d = durum(pg); check("Sırada seans 1/4" in d, f"seans x/4 ve süre ({d!r})")
        check(pg.locator("[data-test=focus-start]").count() == 0, "eski 'Sayacı başlat' satırı yok (süre 'Devam et' ile başlar)")
        no_overflow(pg, "bugün")
        if shots: shot(pg, "b01-bugun", full=False)

        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=garden], [data-test=garden-empty]")
        pg.wait_for_selector("[data-test=focus-chip]")
        chip = pg.inner_text("[data-test=focus-chip]")
        check("Seans 1/4" in chip and "25 dk" in chip, f"'Devam et' süreyi başlattı; başlıkta seans ve kalan dakika ({chip!r})")
        if shots: shot(pg, "b02-baslik-cipi", full=False)

        for _ in range(26):
            pg.dispatch_event("body", "pointerdown")
            pg.clock.run_for(60_000)
        pg.wait_for_selector(".breakov [data-test=break]")
        check(True, "Bahçe'de mola başlayınca mola kartı ekranı kapladı")
        check(pg.get_attribute("main", "inert") is not None, "mola sürerken alttaki öğrenme ekranı kullanılamaz (inert)")
        bt = pg.inner_text(".breakov [data-test=break]")
        check("dk" in bt and "zil" in bt and "titre" in bt, f"mola kartında kalan süre, zil ve titreşim ({bt[:90]!r})")
        vib = pg.evaluate("(window.__vib || []).length")
        check(vib >= 1, f"mola başında titreşim ({vib})")
        if shots: shot(pg, "b03-mola", full=False)

        pg.goto(base + "#/today")
        d = durum(pg); check(d.startswith("Mola"), f"Bugün: mola ve kalan süre ({d!r})")
        # kilit / arka plan: 40 dk boyunca tick yok, sonra tek tick
        pg.clock.fast_forward(40 * 60_000)
        pg.wait_for_function("document.querySelector('[data-test=seans-durum]')?.textContent.includes('Sırada seans 2/4')", timeout=10_000)
        check(True, "kilitten sonra mola bitmiş: sırada seans 2/4")
        tm = pg.inner_text("[data-test=today-min]")
        check(tm.startswith("25 /"), f"kilitli geçen süre odak süresine eklenmedi ({tm!r})")
        vib2 = pg.evaluate("(window.__vib || []).length")
        check(vib2 > vib, f"mola sonunda titreşim ({vib2})")
        check("1/4" in pg.inner_text("[data-test=sessions-done]"), "tamamlanan seans 1/4")

        pg.click("[data-test=m1-devam]")
        pg.wait_for_selector("[data-test=focus-chip]")
        chip = pg.inner_text("[data-test=focus-chip]")
        check("Seans 2/4" in chip, f"'Devam et' seans 2'yi başlattı ({chip!r})")
        # duraklatılmış seans: "Devam et" süreyi yeniden başlatır (inceleme #67 P1-2)
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=focus-running] button")
        pg.click("[data-test=focus-running] button")
        d = durum(pg); check("duraklatıldı" in d, f"Bugün: seans duraklatıldı ({d!r})")
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=focus-chip]")
        chip = pg.inner_text("[data-test=focus-chip]")
        check("Seans 2/4" in chip and "duraklatıldı" not in chip, f"'Devam et' duraklatılmış seansı sürdürdü ({chip!r})")
        # molada "Devam et": mola biter, sıradaki seans başlar
        for _ in range(26):
            pg.dispatch_event("body", "pointerdown")
            pg.clock.run_for(60_000)
        pg.wait_for_selector(".breakov [data-test=break]")
        pg.goto(base + "#/today"); d = durum(pg); check(d.startswith("Mola"), f"2. seanstan sonra mola ({d!r})")
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=focus-chip]")
        chip = pg.inner_text("[data-test=focus-chip]")
        check("Seans 3/4" in chip, f"molada 'Devam et' molayı bitirip seans 3'ü başlattı ({chip!r})")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
