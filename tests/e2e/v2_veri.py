"""
#58 A12 veri güvenliği ve hata sınırı:
  - kurulum bitince navigator.storage.persist() istenir; sonuç Profil'de öğrenciye söylenir
  - bir ekran hata verirse beyaz ekran yok: Türkçe açıklama + "Tekrar dene" + "Bugün'e dön"; sekme çubuğu çalışır
  - hata ayrıntısı yalnızca cihazda (meta lastError), dışarı istek gitmez
  python3 tests/e2e/v2_veri.py [--browser webkit] [--device "iPhone 15"]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, ERR, API_CALLS

PORT = 4194

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p)
        # persist çağrısını say (tarayıcı izni otomasyonda farklı davranabilir; çağrının yapılması sınanır)
        ctx.add_init_script("""(() => { window.__persist = 0; const s = navigator.storage; if (s && s.persist) { const o = s.persist.bind(s); s.persist = () => { window.__persist++; return o(); }; } })()""")
        pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.reload(); pg.wait_for_selector("[data-tab=today]"); pg.wait_for_timeout(500)
        st = pg.evaluate("""() => new Promise((ok) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const q = r.result.transaction('meta').objectStore('meta').get('storagePersist'); q.onsuccess = () => ok(q.result ? q.result.value : null); }; })""")
        check(st in ("persisted", "best-effort", "unsupported"), f"kalıcı depolama durumu kaydedildi ({st})")
        calls = pg.evaluate("window.__persist")
        check(st == "persisted" or st == "unsupported" or calls >= 1, f"kurulumdan sonra persist() istendi ({calls})")
        pg.goto(base + "#/profile"); pg.wait_for_selector("[data-test=persist]")
        check("İlerlemen bu cihazda" in pg.inner_text("[data-test=persist]"), "Profil: verinin nerede durduğu öğrenciye söyleniyor")
        # hata sınırı
        n_api = len(API_CALLS)
        ERR_BEFORE = len(ERR)
        pg.goto(base + "#/__crash"); pg.wait_for_selector("[data-test=error-boundary]")
        txt = pg.inner_text("[data-test=error-boundary]")
        check("sorun" in txt and "kaybolmadı" in txt, "hata sınırı: Türkçe açıklama, veri kaybolmadı")
        check(pg.locator("[data-tab=today]").count() == 1, "hata sınırında sekme çubuğu duruyor")
        del ERR[ERR_BEFORE:]  # bilerek üretilen hata (pageerror) sayılmaz
        last = pg.evaluate("""() => new Promise((ok) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const q = r.result.transaction('meta').objectStore('meta').get('lastError'); q.onsuccess = () => ok(q.result ? q.result.value : null); }; })""")
        check(bool(last) and "bilerek" in last.get("msg", ""), "hata ayrıntısı cihazda kaydedildi")
        check(not any("/v1/" in c["url"] and "error" in (c.get("body") or "") for c in API_CALLS[n_api:]), "hata dışarı gönderilmedi")
        pg.click("[data-test=eb-home]"); pg.wait_for_selector("[data-test=next-activity]")
        check(pg.locator("[data-test=error-boundary]").count() == 0, "'Bugün'e dön' çalışıyor, uygulama devam ediyor")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
