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
    # PM 7015070303-E: süre ve seans bilgisi Odak ekranında (durum çubuğundaki dakika halkası → #/odak)
    if "#/odak" not in pg.url: pg.goto(pg.url.split("#")[0] + "#/odak")
    pg.wait_for_selector("[data-test=seans-durum]")
    return pg.inner_text("[data-test=seans-durum]")

def devam(pg):
    """Bugün = yol: 'Devam et' yoldaki sıradaki düğüm."""
    if "#/today" not in pg.url: pg.goto(pg.url.split("#")[0] + "#/today")
    pg.wait_for_selector("[data-test=m1-devam]"); pg.click("[data-test=m1-devam]")

def main():
    v2_medya.install_media()
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); ctx.add_init_script(VIB); ctx.add_init_script("sessionStorage.setItem('e2e-akis-gunler', '[]')"); pg = new_page(ctx)  # eski düzen: 1. gün bayraksız (bayrak PR'ı)
        # sabit saat (yarın 10:00): ileri sarma gece yarısını geçmesin (PM-013)
        pg.clock.install(time=datetime.datetime.combine(datetime.date.today() + datetime.timedelta(days=1), datetime.time(10, 0)))
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=next-activity][data-m1]")
        check(pg.locator("[data-test=gun-halkasi], [data-test=seans-durum]").count() == 0, "Bugün = yol: süre kartı Bugün'de yok (PM 7015070303-E)")
        pg.click("[data-test=durum-dk]"); pg.wait_for_selector("[data-test=odak]")
        check(pg.locator("[data-test=gun-halkasi] svg.ring").count() == 1, "Odak: 100 dakika halkası (durum çubuğundaki dakikadan)")
        check("0 / 100" in pg.inner_text("[data-test=today-min]"), "halka: 0 / 100 dk")
        d = durum(pg); check("Sırada seans 1/4" in d, f"seans x/4 ve süre ({d!r})")
        check(pg.locator("[data-test=focus-start]").count() == 0, "eski 'Sayacı başlat' satırı yok (süre 'Devam et' ile başlar)")
        no_overflow(pg, "odak")
        if shots: shot(pg, "b01-odak", full=False)

        devam(pg); pg.wait_for_selector("[data-test=garden], [data-test=garden-empty]")
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

        pg.goto(base + "#/odak")
        d = durum(pg); check(d.startswith("Mola"), f"Odak: mola ve kalan süre ({d!r})")
        # kilit / arka plan: 40 dk boyunca tick yok, sonra tek tick
        pg.clock.fast_forward(40 * 60_000)
        pg.wait_for_function("() => document.querySelector('[data-test=seans-durum]')?.textContent.includes('Sırada seans 2/4')", timeout=10_000)
        check(True, "kilitten sonra mola bitmiş: sırada seans 2/4")
        tm = pg.inner_text("[data-test=today-min]")
        check(tm.startswith("25 /"), f"kilitli geçen süre odak süresine eklenmedi ({tm!r})")
        vib2 = pg.evaluate("(window.__vib || []).length")
        check(vib2 > vib, f"mola sonunda titreşim ({vib2})")
        check("1/4" in pg.inner_text("[data-test=sessions-done]"), "tamamlanan seans 1/4")

        devam(pg)
        pg.wait_for_selector("[data-test=focus-chip]")
        chip = pg.inner_text("[data-test=focus-chip]")
        check("Seans 2/4" in chip, f"'Devam et' seans 2'yi başlattı ({chip!r})")
        # duraklatılmış seans: "Devam et" süreyi yeniden başlatır (inceleme #67 P1-2)
        pg.goto(base + "#/odak"); pg.wait_for_selector("[data-test=focus-running] button")
        pg.click("[data-test=focus-running] button")
        d = durum(pg); check("duraklatıldı" in d, f"Odak: seans duraklatıldı ({d!r})")
        devam(pg); pg.wait_for_selector("[data-test=focus-chip]")
        chip = pg.inner_text("[data-test=focus-chip]")
        check("Seans 2/4" in chip and "duraklatıldı" not in chip, f"'Devam et' duraklatılmış seansı sürdürdü ({chip!r})")
        for _ in range(3):
            pg.dispatch_event("body", "pointerdown"); pg.clock.run_for(60_000)
        chip2 = pg.inner_text("[data-test=focus-chip]")
        check("22 dk" in chip2 or "23 dk" in chip2, f"sürdürülen seansta süre yeniden akıyor ({chip!r} → {chip2!r})")
        # molada "Devam et": mola biter, sıradaki seans başlar
        for _ in range(26):
            pg.dispatch_event("body", "pointerdown")
            pg.clock.run_for(60_000)
        pg.wait_for_selector(".breakov [data-test=break]")
        pg.goto(base + "#/odak"); d = durum(pg); check(d.startswith("Mola"), f"2. seanstan sonra mola ({d!r})")
        devam(pg); pg.wait_for_selector("[data-test=focus-chip]")
        chip = pg.inner_text("[data-test=focus-chip]")
        check("Seans 3/4" in chip, f"molada 'Devam et' molayı bitirip seans 3'ü başlattı ({chip!r})")
        # mola başlayınca çok cümleli ses bölümü susar (inceleme #67 2. tur): sahte konuşma sentezi okunan cümleleri sayar
        pg.add_init_script("""(() => { const ss = { speaking: false, pending: false, paused: false, getVoices: () => [], cancel() { (window.__iptal = (window.__iptal || 0) + 1); this._u && this._u.onerror && this._u.onerror(); this._u = null; },
          speak(u) { (window.__oku = window.__oku || []).push(u.text); this._u = u; setTimeout(() => { if (this._u === u) { this._u = null; u.onend && u.onend(); } }, 1500); }, addEventListener() {}, removeEventListener() {} };
          Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: ss }); })()""")
        pg.goto(base + "#/m1/1/m1%3A01%3Aa1"); pg.reload(); pg.wait_for_selector("[data-test=dinle-bolum]")
        pg.click("[data-test=dinle-bolum]")
        pg.wait_for_function("() => (window.__oku || []).length >= 1")
        pg.evaluate("window.dispatchEvent(new Event('dw:mola'))")
        pg.wait_for_timeout(200); n0 = pg.evaluate("(window.__oku || []).length")
        pg.clock.run_for(6000); pg.wait_for_timeout(300)
        n1 = pg.evaluate("(window.__oku || []).length")
        check(n1 == n0, f"mola başlayınca ses bölümünün sonraki cümleleri okunmadı ({n0} → {n1})")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
