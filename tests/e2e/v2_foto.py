"""
B12 3. parça: seçilmiş açık fotoğraf (content/v2/media/foto/acik.json → paket foto.json) kartta atıfla görünür.
  - foto.json yönlendirmeyle 1. günün ilk kartına ("der Montag") bir kayıt verir; görsel isteği sahte JPEG'le cevaplanır
  - tanıtım kartında fotoğraf `data-kaynak=secim`, altında yazar ve lisans (Pexels yazmaz)
  - kayıt yoksa (boş foto.json) fotoğraf alanı yok (sunucu yapılandırılmamış e2e'de arama da yok)
python3 tests/e2e/v2_foto.py [--browser webkit] [--device "iPhone 15"]
"""
import base64, json
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish

PORT = 4214
JPEG = base64.b64decode("/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/yQALCAABAAEBAREA/8wABgAQEAX/2gAIAQEAAD8A0s8g/9k=")
KAYIT = {"lx:Montag#kart": {"src": "https://foto.example/montag.jpg", "sinif": "acik", "yazar": "Örnek Yazar", "lisans": "CC BY 2.0", "lisans_url": "https://creativecommons.org/licenses/by/2.0", "sayfa": "https://commons.wikimedia.org/wiki/File:X.jpg"}}

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        for dolu in (True, False):
            b, ctx = launch(p); pg = new_page(ctx)
            pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": KAYIT if dolu else {}})))
            pg.route("https://foto.example/**", lambda r: r.fulfill(status=200, content_type="image/jpeg", body=JPEG))
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro]")
            if dolu:
                pg.wait_for_selector("[data-test=garden-intro] [data-test=foto]")
                f = pg.locator("[data-test=garden-intro] [data-test=foto]")
                cap = f.inner_text()
                check(f.get_attribute("data-kaynak") == "secim" and "Örnek Yazar" in cap and "CC BY 2.0" in cap and "Pexels" not in cap, f"seçilmiş açık fotoğraf atıfla ({cap!r})")
            else:
                pg.wait_for_timeout(800)
                check(pg.locator("[data-test=garden-intro] [data-test=foto]").count() == 0, "kayıt yoksa fotoğraf alanı yok")
            b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
