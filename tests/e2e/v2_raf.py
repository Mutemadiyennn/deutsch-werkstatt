"""
PM-061 / D-112 (#58 B12) — kapalı medya rafı, uygulama tarafı (sahte raf sunucusuyla; gerçek adres ve anahtar yok):
  - Profil → Medya rafı: adres ve anahtar girilir; "Kaydet ve rafı sına" → bağlandı / anahtar yanlış / ulaşılamıyor
  - anahtar yalnızca cihazda: yedek dosyasına girmez; sahte raf yanlış anahtarda 404
  - Sil → açık kaynaklı medya kipi
python3 tests/e2e/v2_raf.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4207
RAF = "https://raf.test"          # sahte raf: Playwright yönlendirmesiyle (CSP: connect-src https:)
ANAHTAR = "sahte-test-anahtari-0123456789abcdef"

def raf(route):
    """D-112 Function'ının davranışı: OPTIONS → CORS; doğru Bearer ve saglik.txt → 200; aksi 404"""
    r = route.request
    h = {"Access-Control-Allow-Origin": f"http://127.0.0.1:{PORT}", "Access-Control-Allow-Headers": "Authorization", "Vary": "Origin"}
    if r.method == "OPTIONS": return route.fulfill(status=204, headers=h)
    ok = r.headers.get("authorization") == f"Bearer {ANAHTAR}" and r.url.endswith("/saglik.txt")
    route.fulfill(status=200 if ok else 404, headers={**h, "Content-Type": "text/plain"}, body="ok" if ok else "Not found")

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        pg.route(f"{RAF}/**", raf); pg.route("https://raf-yok.test/**", lambda r: r.abort())
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/profile"); pg.wait_for_selector("[data-test=medya-rafi]")
        def sina(adres, anahtar):
            pg.fill("[data-test=raf-adres]", adres); pg.fill("[data-test=raf-anahtar]", anahtar)
            pg.click("[data-test=raf-sina]"); pg.wait_for_selector("[data-test=raf-durum]", timeout=15000)
            return pg.get_attribute("[data-test=raf-durum]", "data-durum")
        check(sina(RAF, "yanlis-anahtar-0123456789abcdef") == "anahtar-yanlis", "yanlış anahtar: 'Anahtar yanlış' (raf 404)")
        check(sina("https://raf-yok.test", ANAHTAR) == "ulasilamiyor", "kapalı adres: 'Ulaşılamıyor'")
        check(sina(RAF + "/", ANAHTAR) == "bagli", "doğru anahtar: 'Bağlandı' (sondaki / sorun değil)")
        no_overflow(pg, "Profil medya rafı")
        if shots: pg.locator("[data-test=medya-rafi]").scroll_into_view_if_needed(); shot(pg, "r01-raf-bagli", full=False)
        # kalıcı ve yalnızca cihazda: yenileyince alanlar dolu; yedek dosyasında anahtar yok
        pg.reload(); pg.wait_for_selector("[data-test=medya-rafi]")
        pg.wait_for_function("() => document.querySelector('[data-test=raf-anahtar]').value.length > 0", timeout=5000)
        check(pg.input_value("[data-test=raf-adres]") == RAF, "adres cihazda kaldı (sondaki / temizlendi)")
        with pg.expect_download() as d:
            pg.click("text=Yedeği indir (JSON)")
        yedek = open(d.value.path(), encoding="utf-8").read()
        check(ANAHTAR not in yedek and "raf.test" not in yedek, "yedek dosyasında raf adresi ve anahtarı yok")
        pg.click("[data-test=raf-sil]"); pg.wait_for_timeout(300); pg.reload(); pg.wait_for_selector("[data-test=medya-rafi]"); pg.wait_for_timeout(500)
        check(pg.input_value("[data-test=raf-anahtar]") == "", "Sil: anahtar cihazdan kalktı (açık kaynak kipi)")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
