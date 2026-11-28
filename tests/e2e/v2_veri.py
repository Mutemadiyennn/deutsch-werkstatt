"""
#58 A12 veri güvenliği ve hata sınırı:
  - kurulum bitince navigator.storage.persist() istenir; sonuç Profil'de öğrenciye söylenir
  - bir ekran hata verirse beyaz ekran yok: Türkçe açıklama + "Tekrar dene" + "Bugün'e dön"; sekme çubuğu çalışır
  - hata ayrıntısı yalnızca cihazda (meta lastError), dışarı istek gitmez
  python3 tests/e2e/v2_veri.py [--browser webkit] [--device "iPhone 15"]
"""
from playwright.sync_api import sync_playwright
from common import sekme_kok, serve, launch, new_page, login_onboard, check, finish, shot, arg, ERR

PORT = 4194

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light")
        # persist çağrısını say (tarayıcı izni otomasyonda farklı davranabilir; çağrının yapılması sınanır)
        ctx.add_init_script("""(() => { window.__persist = 0; const s = navigator.storage; if (s && s.persist) { const o = s.persist.bind(s); s.persist = () => { window.__persist++; return o(); }; } })()""")
        pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.wait_for_timeout(500)
        # kurulumun bittiği İLK oturumda istenir (yeniden açmayı beklemez; inceleme #61 P1-2)
        # sonuç cihazda yazılıysa istek yapılmıştır (sayaç sarmalayıcısı ilk oturumdaki çağrıyı her tarayıcıda görmeyebilir; meta kesin kanıttır)
        first = pg.evaluate("""() => new Promise((ok) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const q = r.result.transaction('meta').objectStore('meta').get('storagePersist'); q.onsuccess = () => ok(q.result ? q.result.value : null); }; })""")
        check(first in ("persisted", "best-effort", "unsupported"), f"kurulum biter bitmez kalıcı depolama istendi ({first}, persist çağrısı {pg.evaluate('window.__persist')})")
        pg.reload(); pg.wait_for_selector("[data-tab=today]"); pg.wait_for_timeout(500)
        st = pg.evaluate("""() => new Promise((ok) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const q = r.result.transaction('meta').objectStore('meta').get('storagePersist'); q.onsuccess = () => ok(q.result ? q.result.value : null); }; })""")
        check(st in ("persisted", "best-effort", "unsupported"), f"kalıcı depolama durumu kaydedildi ({st})")
        pg.goto(base + "#/profile"); pg.wait_for_selector("[data-test=persist]")
        check("İlerlemen bu cihazda" in pg.inner_text("[data-test=persist]"), "Profil: verinin nerede durduğu öğrenciye söyleniyor")
        # hata sınırı
        dis = []
        pg.on("request", lambda r: dis.append(r.url) if not r.url.startswith(f"http://127.0.0.1:{PORT}") and not r.url.startswith("data:") and not r.url.startswith("blob:") else None)
        shots = arg("--shots")
        pg.goto(base + "#/__crash"); pg.wait_for_selector("[data-test=error-boundary]")
        txt = pg.inner_text("[data-test=error-boundary]")
        check("sorun" in txt and "kaybolmadı" in txt, "hata sınırı: Türkçe açıklama, veri kaybolmadı")
        check(pg.locator("[data-tab=today]").count() == 1, "hata sınırında sekme çubuğu duruyor")
        focused = pg.evaluate("document.activeElement && document.activeElement.tagName")
        check(focused == "H2", f"odak hata başlığına taşındı ({focused})")
        if shots: shot(pg, "v01-hata-siniri", full=False)
        last = pg.evaluate("""() => new Promise((ok) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const q = r.result.transaction('meta').objectStore('meta').get('lastError'); q.onsuccess = () => ok(q.result ? q.result.value : null); }; })""")
        check(bool(last) and "bilerek" in last.get("msg", ""), "hata ayrıntısı cihazda kaydedildi")
        # "Tekrar dene": hata sürerse ekran yeniden gelir, döngü yok
        pg.click("[data-test=eb-retry]"); pg.wait_for_selector("[data-test=error-boundary]"); pg.wait_for_timeout(500)
        check(pg.locator("[data-test=error-boundary]").count() == 1, "'Tekrar dene': hata sürüyorsa ekran yeniden geliyor (döngü yok)")
        # sekme çubuğuyla çıkış
        sekme_kok(pg, "ben"); pg.click("[data-test=ayarlar-ac]"); pg.wait_for_selector("[data-test=persist]")
        check(pg.locator("[data-test=error-boundary]").count() == 0, "sekme çubuğuyla başka ekrana geçiliyor")
        pg.goto(base + "#/__crash"); pg.wait_for_selector("[data-test=error-boundary]")
        pg.click("[data-test=eb-home]"); pg.wait_for_selector("[data-test=next-activity]")
        check(pg.locator("[data-test=error-boundary]").count() == 0, "'Bugün'e dön' çalışıyor, uygulama devam ediyor")
        check(not dis, f"hata sonrası cihaz dışına istek yok ({dis[:3]})")
        # bilerek üretilen sayfa hatası (yalnızca o) sayılmaz; diğer denetimlerin sonucu korunur (inceleme #61 P1-1)
        ERR[:] = [e for e in ERR if "bilerek" not in e]
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
