"""
#58 A8 okuma ve yazma:
  okuma (1. gün): metin, kelimeye dokununca kart, Türkçesi isteğe bağlı, sorular → bitti
  yazma (2. gün): gelen mesaj → sorular → kendi mesajın → eksik zorunlu kelime bildirilir → düzeltince tamam
  → örnek cevap → kontrol listesi → bitti; yol bu adımları bitti sayar
  python3 tests/e2e/v2_okuma.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4199

def sorular(pg):
    """Okuma sorularını doğru cevaplar (seçmelide data-right, üretimde data-cevap; e2e derlemesi); soru sayısını döner"""
    n = 0
    while pg.locator("[data-test=okuma][data-asama=soru]").count() and n < 20:
        kicker = pg.inner_text("[data-test^=drill-] .kicker")
        if pg.locator("button.opt[data-right]").count():
            pg.locator("button.opt[data-right]").first.click()
        else:
            cevap = pg.get_attribute("[data-cevap]", "data-cevap") or ""
            pg.fill("[data-test=answer]", cevap.replace("{name}", "Ayşe")); pg.click("[data-test=submit]")
        pg.wait_for_selector("[data-test=next]"); pg.click("[data-test=next]")
        pg.wait_for_function("""(k) => document.querySelector('[data-test=okuma]').dataset.asama !== 'soru' ||
          (document.querySelector('[data-test^=drill-] .kicker') || {}).innerText !== k""", arg=kicker)
        n += 1
    return n

def walk(pg):
    """Bugün'den açılan okuma/yazma adımını sonuna kadar götürür (yazmada e2e derlemesindeki örnek cevapla)"""
    pg.wait_for_selector("[data-test=okuma-metin]"); pg.click("[data-test=next]")
    sorular(pg)
    if pg.locator("[data-test=okuma-yaz]").count():
        pg.fill("[data-test=yazi]", (pg.get_attribute("[data-test=okuma-yaz]", "data-ornek") or "").replace("(adın)", "Ayşe"))
        pg.click("[data-test=yazi-kontrol-et]"); pg.click("[data-test=next]")
        pg.wait_for_selector("[data-test=okuma-ornek]"); pg.click("[data-test=next]")
        pg.wait_for_selector("[data-test=okuma-kontrol]")
        for i in range(pg.locator("[data-test=kontrol-madde]").count()): pg.locator("[data-test=kontrol-madde]").nth(i).check()
        pg.click("[data-test=okuma-bitir]")
    pg.wait_for_selector("[data-test=okuma-bitti]")

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")

        print("1) okuma")
        pg.goto(base + "#/okuma/1"); pg.wait_for_selector("[data-test=okuma-metin]")
        check(pg.locator("[data-test=metin-tr]").count() == 0, "Türkçesi önce kapalı (önce Almancayı anla)")
        pg.locator("[data-test=okuma-metin] [data-test=kelime]").first.click()
        pg.wait_for_selector("[data-test=kelime-kart]")
        check(True, "kelimeye dokununca kart açıldı")
        if shots: shot(pg, "o01-metin-kart", full=False)
        pg.click("[data-test=kelime-kart] button:has-text('Kapat')")
        no_overflow(pg, "okuma metin")
        pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=okuma][data-asama=soru]")
        n = sorular(pg)
        pg.wait_for_selector("[data-test=okuma-bitti]")
        check(n >= 3, f"okuma soruları ({n})")
        check("doğru" in pg.inner_text("[data-test=okuma-bitti]"), "bitiş özeti")

        print("2) yazma")
        pg.goto(base + "#/okuma/2"); pg.wait_for_selector("[data-test=okuma-metin]")
        pg.click("[data-test=next]")
        sorular(pg)
        pg.wait_for_selector("[data-test=okuma-yaz]")
        check(pg.is_disabled("[data-test=yazi-kontrol-et]"), "boş mesaj kontrol edilemez")
        pg.fill("[data-test=yazi]", "Hallo Derya, hier ist Ayşe. Bis morgen!")
        pg.click("[data-test=yazi-kontrol-et]"); pg.wait_for_selector("[data-test=yazi-kontrol]")
        k = pg.inner_text("[data-test=yazi-kontrol]")
        check("Eksik kelime" in k and "Urlaub" in k, f"eksik zorunlu kelime bildirildi ({k[:60]!r})")
        if shots: shot(pg, "o02-yazma-eksik", full=False)
        pg.fill("[data-test=yazi]", "Hallo Derya, hier ist Ayşe. Ich habe im August Urlaub. Mein Geburtstag ist im Mai. Bis morgen!")
        pg.click("[data-test=yazi-kontrol-et]"); pg.wait_for_selector("[data-test=yazi-kontrol]")
        k = pg.inner_text("[data-test=yazi-kontrol]")
        check("Gereken kelimeler tamam" in k, f"zorunlular ve kalıplar tamam ({k[:60]!r})")
        no_overflow(pg, "yazma")
        pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=okuma-ornek]")
        check("Urlaub" in pg.inner_text("[data-test=okuma-ornek]"), "örnek cevap ve öğrencinin mesajı yan yana")
        pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=okuma-kontrol]")
        m = pg.locator("[data-test=kontrol-madde]").count()
        check(1 <= m <= 3, f"kontrol listesi ({m} madde)")
        for i in range(m): pg.locator("[data-test=kontrol-madde]").nth(i).check()
        if shots: shot(pg, "o03-kontrol", full=False)
        pg.click("[data-test=okuma-bitir]"); pg.wait_for_selector("[data-test=okuma-bitti]")
        check(True, "yazma bitti")

        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=yol]")
        check(pg.get_attribute("[data-test=gun-1] [data-test=adim][data-tur=okuma]", "data-bitti") == "1", "yol: 1. günün okuması bitti olarak kaydedildi")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
