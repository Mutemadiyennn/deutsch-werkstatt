"""[DENETİM-TASARIM] rol oyunu: normal, sunucu hatası (500), yanıt yok (12 sn sonrası) durumları.
  cd tests/e2e && python3 ../../docs/v2/qa/tasarim-1/arac/cekim_rol.py <çıktı klasörü>
"""
import os, sys
OUTD = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(HERE, "..", "..", "..", "..", "..", "tests", "e2e")))
sys.argv = [sys.argv[0], "--browser", "chromium"]
from common import serve, launch, new_page, login_onboard
from playwright.sync_api import sync_playwright
sys.path.insert(0, HERE)
from ortak import SAHTE_SES, Cekici

PORT = 4396
C = Cekici(OUTD, onek="r")
SC = "sc:telefon:01-arzttermin"

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        for ad, h in (("normal", None), ("hata500", lambda t, v: (500, {"error": {"code": "upstream"}})), ("yanitsiz", lambda t, v: ("hang", None))):
            b, ctx = launch(p); ctx.add_init_script(SAHTE_SES); pg = new_page(ctx, h)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.wait_for_timeout(3500)  # açılış bildirimi geçsin
            pg.goto(base + f"#/scenario/{SC}/roleplay"); pg.wait_for_timeout(1500)
            pg.locator("text=Konuşmayı başlat").first.click(); pg.wait_for_timeout(2500 if ad != "yanitsiz" else 13500)
            C.cek(pg, f"rol-{ad}-acilis")
            box = pg.locator("main textarea, main input[type=text], main input:not([type])")
            if box.count():
                box.first.fill("Guten Tag, ich brauche einen Termin.")
                g = pg.locator("main button:has-text('Gönder'), .actionbar button:has-text('Gönder')")
                if g.count(): g.first.click()
                else: pg.keyboard.press("Enter")
                pg.wait_for_timeout(2500 if ad != "yanitsiz" else 13500)
                C.cek(pg, f"rol-{ad}-cevap-sonrasi")
            b.close()
    srv.shutdown(); C.yaz()

main()
