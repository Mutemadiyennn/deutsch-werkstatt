"""[DENETİM-TASARIM] Bugün'ün "yarıda" durumu (akışta birkaç adım, sonra X) + koyu temada dört ana ekran (yalnız karşılaştırma için).
  cd tests/e2e && python3 ../../docs/v2/qa/tasarim-1/arac/cekim_yarida.py <çıktı klasörü>
"""
import os, sys
OUTD = sys.argv[1]
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(HERE, "..", "..", "..", "..", "..", "tests", "e2e")))
sys.argv = [sys.argv[0], "--browser", "chromium"]
import common
common.AKIS_TABAN = "try { sessionStorage.setItem('e2e-akis-gunler', '\"hepsi\"'); } catch (e) {}"
common.GUN_KILIDI_TABAN = "try { sessionStorage.setItem('e2e-gun-kilidi', 'acik'); } catch (e) {}"
from common import serve, launch, new_page, login_onboard
from playwright.sync_api import sync_playwright
sys.path.insert(0, HERE)
from ortak import SAHTE_SES, Cekici

PORT = 4395
C = Cekici(OUTD, onek="y")

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            b, ctx = launch(p, color_scheme=tema); ctx.add_init_script(SAHTE_SES); pg = new_page(ctx)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.wait_for_timeout(1500)
            if tema == "light":
                # akışa gir, ses durağını geç, birkaç adım ilerle, X
                pg.click("[data-test=m1-devam]"); pg.wait_for_timeout(1500)
                for _ in range(6):
                    for s in ["text=Bu durağı şimdi geç", "[data-test=akis-devam]", ".actionbar .btn.primary:not([disabled])"]:
                        if pg.locator(s).count() and pg.locator(s).first.is_visible():
                            try: pg.locator(s).first.click(timeout=2000); break
                            except Exception: pass
                    pg.wait_for_timeout(700)
                C.cek(pg, "akis-yarida-adim")
                x = pg.locator("[data-test=akis-cik]")
                if x.count(): x.first.click(); pg.wait_for_timeout(1500)
                C.cek(pg, "bugun-yarida")
                C.cek(pg, "bugun-yarida-tam", tam=True)
            else:
                for h in ["#/today", "#/yol", "#/koy", "#/ben", "#/akis/1"]:
                    pg.goto(base + h); pg.wait_for_timeout(1500); C.cek(pg, "koyu-" + h[2:].replace("/", "-"))
            b.close()
    srv.shutdown(); C.yaz()

main()
