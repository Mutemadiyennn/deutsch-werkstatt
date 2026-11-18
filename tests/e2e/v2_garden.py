"""
PM-049 Kelime Bahçesi — 10 kartlık bir tur baştan sona (kabul ölçütü).
  - Bugün → "Tekrar et" → tur: yeni kart tanıtımı → soru; doğru/yanlış geri bildirimi eylem çubuğunda
  - yanlış cevapta doğrusu öğrencinin cevabıyla yan yana; kart turun sonunda yeniden gelir (tur uzar)
  - tur sonu özeti → Bugün'e dönüş; ikinci tur yeni kartlar ve tanıtılmış kartlarla kurulur
  python3 tests/e2e/v2_garden.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg

PORT = 4191

def answer_current(pg, wrong=False):
    """Ekrandaki soruyu cevaplar; seçmelide doğru şık e2e derlemesinde data-right ile işaretli"""
    if pg.locator("[data-test=garden-intro]").count():
        pg.click("[data-test=next]"); pg.wait_for_selector("[data-test^=gq-]")
    if pg.locator("button.opt").count():
        sel = "button.opt:not([data-right])" if wrong else "button.opt[data-right]"
        pg.locator(sel).first.click()
    else:
        pg.fill("[data-test=answer]", "xyz falsch" if wrong else "Ich habe heute keine Zeit."); pg.click("[data-test=submit]")
        if pg.locator("[data-test=gq-own-check]").count():
            old = pg.inner_text("[data-test=garden] .pbar"); pg.click("[data-test=own-ok]")
            pg.wait_for_function("""(old) => document.querySelector('[data-test=garden-done]') || (document.querySelector('[data-test=garden] .pbar')||{}).innerText !== old""", arg=old); return
    pg.wait_for_selector("[data-test=next]")
    advance(pg)

def advance(pg):
    """Devam'a basar ve yeni soru (ya da tur sonu) ekrana gelene kadar bekler"""
    old = pg.inner_text("[data-test=garden] .pbar") if pg.locator("[data-test=garden] .pbar").count() else ""
    pg.click("[data-test=next]")
    pg.wait_for_function("""(old) => document.querySelector('[data-test=garden-done]') ||
      ((document.querySelector('[data-test=garden] .pbar')||{}).innerText !== old)""", arg=old)

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.wait_for_selector("[data-test=garden-start]")
        check(pg.locator("[data-test=garden-start]").count() == 1, "Bugün: 'Tekrar edilecekler' bölümünde tek ana eylem 'Tekrar et'")
        pg.click("[data-test=garden-start]"); pg.wait_for_selector("[data-test=garden]")
        sub = pg.inner_text("[data-test=garden] .pbar")
        total = int(sub.split("/")[-1].strip().split()[0]) if "/" in sub else 0
        check(8 <= total <= 12, f"tur 8–12 soru ({total})")
        if shots: shot(pg, "g01-tanitim", full=False)
        # 1. soru yanlış: doğrusu ve öğrencinin cevabı yan yana, tur bir soru uzar
        if pg.locator("[data-test=garden-intro]").count():
            pg.click("[data-test=next]"); pg.wait_for_selector("[data-test^=gq-]")
        if pg.locator("button.opt").count(): pg.locator("button.opt:not([data-right])").first.click()
        else: pg.fill("[data-test=answer]", "xyz falsch"); pg.click("[data-test=submit]")
        pg.wait_for_selector("[data-test=next]")
        band = pg.inner_text(".actionbar")
        check("Doğrusu" in band and "Senin cevabın" in band, "yanlışta doğrusu öğrencinin cevabıyla yan yana")
        if shots: shot(pg, "g02-yanlis", full=False)
        advance(pg)
        sub2 = pg.inner_text("[data-test=garden] .pbar")
        check(sub2.strip().endswith(str(total + 1)), f"yanlış kart turun sonuna eklendi ({sub2.strip()})")
        n = 1
        while not pg.locator("[data-test=garden-done]").count() and n < 20:
            answer_current(pg); n += 1
        check(pg.locator("[data-test=garden-done]").count() == 1, f"tur baştan sona bitti ({n} soru)")
        txt = pg.inner_text("[data-test=garden-done]")
        check("doğru" in txt and "undefined" not in txt, "tur sonu özeti")
        if shots: shot(pg, "g03-tur-sonu", full=False)
        pg.click("[data-test=garden-back]"); pg.wait_for_selector("[data-tab=today]")
        # ikinci tur: tanıtılmış kartlar artık modelde; tur yeniden kuruluyor, hata yok
        pg.click("[data-test=garden-start]"); pg.wait_for_selector("[data-test=garden], [data-test=garden-empty]")
        check(pg.locator(".card.err, [role=alert]").count() == 0, "ikinci tur hatasız açılıyor")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
