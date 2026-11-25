"""
Günlük hatırlatma (PM-121 md. 3.3; v1 kapanınca akşam hatırlatmasını v2 devralır). Kabul listesi:
  1. iPhone kabuğunda (LocalNotifications) açılıştan kısa süre sonra 7 günlük pencere kurulur: günde tek, 19:30 (varsayılan);
     önce v1'in kimlikleri (7101–7107, 7200) silinir, iki hatırlatma birden gelmez
  2. Ben → Çalışma düzenim'de "Günlük hatırlatma" kartı: kapatınca yalnız silinir (kurulum yok), açıp saat seçince o saatte kurulur;
     ayar yeniden açılışta korunur; satır en az 44 pt (inceleme #263 P1-2)
  2b. v1'de "Kapalı" seçilmişse v2 kapalı başlar ve bildirim kurmaz; izin kapalıysa kartta tek satır (inceleme #263 P1-1, P2-2)
  3. uygulama arka plana geçince pencere yeniden kurulur
  4. tarayıcıda (kabuk yok) kart çizilmez, hata yok
  5. açık + koyu, 390 ve 430; taşma yok
Kabuk, sayfaya önceden yerleştirilen sahte bir LocalNotifications eklentisiyle taklit edilir (çağrılar kaydedilir).
  python3 tests/e2e/v2_hatirlatma.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, no_overflow

PORT = 4252
SAHTE = """window.__ln = []; window.Capacitor = { Plugins: { LocalNotifications: {
  cancel: async (o) => { window.__ln.push(['sil', o.notifications.map((n) => n.id)]); },
  checkPermissions: async () => ({ display: 'granted' }), requestPermissions: async () => ({ display: 'granted' }),
  schedule: async (o) => { window.__ln.push(['kur', o.notifications.map((n) => [n.id, new Date(n.schedule.at).getHours() + ':' + String(new Date(n.schedule.at).getMinutes()).padStart(2, '0')])]); } } } };"""

RED = SAHTE.replace("checkPermissions: async () => ({ display: 'granted' })", "checkPermissions: async () => ({ display: 'denied' })")
V1_KAPALI = "if (!localStorage.getItem('dw-werkstatt-v2')) localStorage.setItem('dw-werkstatt-v2', JSON.stringify({ words: [], state: { remind: 'off' } }));"

def kayit(pg): return pg.evaluate("window.__ln || []")
def bekle_kur(pg, n):
    pg.wait_for_function("(n) => (window.__ln || []).length >= n", arg=n, timeout=8000)

def duzen(pg, base):
    pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today][aria-current=page]")
    pg.click("[data-tab=ben]"); pg.wait_for_selector("[data-test=ben]")
    pg.goto(base + "#/ben/duzen"); pg.wait_for_selector("[data-test=panel-language]")

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        # 4. tarayıcı: kart yok
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        duzen(pg, base)
        check(pg.locator("[data-test=hatirlatma]").count() == 0, "tarayıcıda (kabuk yok) hatırlatma kartı çizilmez")
        b.close()

        # 2b. v1'de kapalı → v2 kapalı başlar; izin reddedilmiş → açınca uyarı satırı, kurulum yok
        b, ctx = launch(p); ctx.add_init_script(V1_KAPALI); ctx.add_init_script(RED); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]"); pg.wait_for_timeout(3000)
        check(not any(x[0] == "kur" for x in kayit(pg)), f"v1'de kapalıysa açılışta bildirim kurulmaz ({kayit(pg)})")
        duzen(pg, base); kart = pg.locator("[data-test=hatirlatma]"); kart.wait_for()
        check(not kart.locator("[data-test=hatirlatma-acik]").is_checked() and kart.locator("[data-test=hatirlatma-saat]").count() == 0, "v1'de 'Kapalı' seçilmişse v2'de kart kapalı başlar")
        kart.locator("[data-test=hatirlatma-acik]").click(); kart.locator("[data-test=hatirlatma-izin]").wait_for(timeout=5000)
        check(not any(x[0] == "kur" for x in kayit(pg)), "izin kapalıyken açınca kurulmaz, kartta izin satırı görünür")
        b.close()

        for sema in ("light", "dark"):
            for gen in (390, 430):
                b, ctx = launch(p, color_scheme=sema, viewport={"width": gen, "height": 932 if gen == 430 else 844}); ctx.add_init_script(SAHTE); pg = new_page(ctx)
                login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
                if sema == "light" and gen == 430:
                    # 1. açılışta kurulum
                    bekle_kur(pg, 2); k = kayit(pg)
                    sil = next((x[1] for x in k if x[0] == "sil"), []); kur = next((x[1] for x in k if x[0] == "kur"), [])
                    check(sil == [7101, 7102, 7103, 7104, 7105, 7106, 7107, 7200], f"açılışta önce v1 ve eski kimlikler silinir ({sil})")
                    check(6 <= len(kur) <= 7 and all(s == "19:30" for _, s in kur) and len({i for i, _ in kur}) == len(kur), f"7 günlük pencere, günde tek, 19:30 ({kur})")
                duzen(pg, base)
                kart = pg.locator("[data-test=hatirlatma]"); kart.wait_for()
                check(kart.locator("[data-test=hatirlatma-acik]").is_checked() and kart.locator("[data-test=hatirlatma-saat]").input_value() == "19:30", f"{sema} {gen}: kart açık, 19:30")
                kart.scroll_into_view_if_needed()
                if gen == 390:
                    sh = pg.evaluate("(() => { const r = document.querySelector('.hatirlatma-satir').getBoundingClientRect(); const k = document.querySelector('[data-test=hatirlatma-acik]').getBoundingClientRect(); return [r.height, k.width]; })()")
                    check(sh[0] >= 44 and sh[1] >= 22, f"{sema}: 'Her akşam hatırlat' satırı en az 44 pt, kutu ≥ 22 px ({sh})")
                no_overflow(pg, f"{sema} {gen} Çalışma düzenim")
                if gen == 430: pg.evaluate("window.scrollTo(0, document.body.scrollHeight)"); pg.wait_for_timeout(150); shot(pg, f"hatirlatma-{sema}", full=False)
                if sema == "light" and gen == 430:
                    # 2. kapat → yalnız sil
                    n = len(kayit(pg)); kart.locator("[data-test=hatirlatma-acik]").click(); bekle_kur(pg, n + 1); pg.wait_for_timeout(300)
                    yeni = kayit(pg)[n:]
                    check([x[0] for x in yeni] == ["sil"] and kart.locator("[data-test=hatirlatma-saat]").count() == 0, f"kapatınca yalnız silinir, saat seçimi gizlenir ({yeni})")
                    # aç + 21:00
                    kart.locator("[data-test=hatirlatma-acik]").click(); kart.locator("[data-test=hatirlatma-saat]").wait_for()
                    n = len(kayit(pg)); kart.locator("[data-test=hatirlatma-saat]").select_option("21:00"); bekle_kur(pg, n + 2)
                    kur = [x[1] for x in kayit(pg)[n:] if x[0] == "kur"]
                    check(bool(kur) and all(s == "21:00" for _, s in kur[-1]), f"saat seçilince o saatte kurulur ({kur[-1] if kur else None})")
                    # ayar korunur
                    pg.reload(); pg.wait_for_selector("[data-tab]"); duzen(pg, base); pg.locator("[data-test=hatirlatma]").wait_for()
                    check(pg.locator("[data-test=hatirlatma-saat]").input_value() == "21:00", "yeniden açılışta seçilen saat korunur")
                    # 3. arka plan
                    bekle_kur(pg, 2); pg.wait_for_timeout(2800); n = len(kayit(pg))
                    pg.evaluate("Object.defineProperty(document, 'visibilityState', { configurable: true, get: () => 'hidden' }); document.dispatchEvent(new Event('visibilitychange'))")
                    bekle_kur(pg, n + 2)
                    check([x[0] for x in kayit(pg)[n:n + 2]] == ["sil", "kur"], "arka plana geçince pencere yeniden kurulur")
                b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
