"""
#58 A7 konuşma provası (yapay zekâsız) — 1. günün provası:
  hazırlık atlanamaz (bütün cümleler dinlenmeden "Provaya başla" kapalı) → dallanan konuşma: tanınmayan cevapta
  "Yazdığın: …" + "Tekrar yaz" + "Benimki de doğru"; uygun cevapta karşı taraf sonraki dala geçer → sonda Türkçe
  geri bildirim (1 iyi şey, en fazla 3 düzeltme) → Bugün/yol bu adımı yeniden önermez
  python3 tests/e2e/v2_prova.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4198

def walk(pg):
    """Hazırlıkta bütün cümleleri dinler, provayı uygun cevaplarla sonuna kadar götürür; cevap sayısını döner"""
    pg.wait_for_selector("[data-test=prova-hazirlik]")
    for i in range(pg.locator("[data-test=hazirlik-dinle]").count()):
        pg.locator("[data-test=hazirlik-dinle]").nth(i).click()
    pg.wait_for_function("() => !document.querySelector('[data-test=prova-basla]').disabled", timeout=60_000)
    pg.click("[data-test=prova-basla]"); pg.wait_for_selector("[data-test=prova-konusma]")
    return converse(pg)

def converse(pg):
    tur = 0
    while not pg.locator("[data-test=prova-rapor]").count() and tur < 20:
        if pg.locator("[data-test=prova-bitir]").count():
            pg.click("[data-test=prova-bitir]"); break
        pg.wait_for_selector("[data-test=answer]")
        cevap = (pg.locator("[data-test=beklenen]").text_content() or "").replace("{name}", "Ayşe").replace("(adın)", "Ayşe")
        once = pg.locator("[data-test=prova-chat] [data-kim]").count()
        pg.fill("[data-test=answer]", cevap); pg.click("[data-test=submit]")
        pg.wait_for_selector("[data-test=feedback]")
        pg.click("[data-test=next]" if pg.locator("[data-test=next]").count() else "[data-test=dogru-soyledim]")
        pg.wait_for_function("(n) => document.querySelectorAll('[data-test=prova-chat] [data-kim]').length > n || document.querySelector('[data-test=prova-rapor]')", arg=once)
        tur += 1
    pg.wait_for_selector("[data-test=prova-rapor]")
    return tur

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/prova/1"); pg.wait_for_selector("[data-test=prova-hazirlik]")
        n = pg.locator("[data-test=hazirlik-cumle]").count()
        check(n >= 2, f"hazırlık: provada gereken {n} cümle")
        check(pg.is_disabled("[data-test=prova-basla]"), "hazırlık atlanamaz: cümleler dinlenmeden 'Provaya başla' kapalı")
        if shots: shot(pg, "p01-hazirlik", full=False)
        for i in range(n):
            pg.locator("[data-test=hazirlik-dinle]").nth(i).click()
        pg.wait_for_function("() => !document.querySelector('[data-test=prova-basla]').disabled", timeout=60_000)
        check(True, "bütün cümleler dinlenince prova açıldı")
        pg.click("[data-test=prova-basla]"); pg.wait_for_selector("[data-test=prova-konusma]")
        check(pg.locator("[data-test=prova-chat] [data-kim=karsi]").count() == 1, "karşı taraf ilk sözü söyledi")

        # tanınmayan cevap: karar öğrencide değil, yeniden dene
        pg.fill("[data-test=answer]", "Katze Hund Baum"); pg.click("[data-test=submit]")
        pg.wait_for_selector("[data-test=feedback]")
        fb = pg.inner_text("[data-test=feedback]")
        check("Yazdığın: Katze Hund Baum" in fb and "Şöyle diyebilirsin" in fb, f"tanınmayan cevapta ne yazdığın ve doğrusu ({fb[:70]!r})")
        check(pg.locator("[data-test=tekrar]").count() == 1 and pg.locator("[data-test=dogru-soyledim]").count() == 1, "'Tekrar yaz' ve 'Benimki de doğru' var")
        pg.click("[data-test=tekrar]")
        no_overflow(pg, "prova konuşma")
        if shots: shot(pg, "p02-konusma", full=False)

        tur = converse(pg)
        pg.wait_for_selector("[data-test=prova-rapor]")
        check(tur >= 2, f"dallanan konuşma sonuna kadar gitti ({tur} cevap)")
        r = pg.inner_text("[data-test=prova-rapor]")
        check("İyi yaptığın" in r, "sonda Türkçe geri bildirim: 1 iyi şey")
        nd = pg.locator("[data-test=duzeltme]").count()
        check(1 <= nd <= 3, f"tanınmayan deneme düzeltmelerde; en fazla 3 düzeltme ({nd})")
        no_overflow(pg, "prova rapor")
        if shots: shot(pg, "p03-rapor", full=False)

        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=yol]")
        check(pg.get_attribute("[data-test=gun-1] [data-test=adim][data-tur=prova]", "data-bitti") == "1", "yol: 1. günün Seans 4 provası bitti olarak kaydedildi")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
