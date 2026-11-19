"""
#58 B3 — gün sonu özeti ve yerel kullanım ölçümü:
  - adım yarıda bırakılınca Profil > Kullanımım'da "Yarıda: <adım> (nokta)" görünür; açılış sayılır
  - adım bitince Bugün'de gün sonu kartı: biten adım sayısı, bugün yeni anladığın kelimeler (çip), kendi kurduğun cümle
  - veriler yalnızca cihazda: ölçüm sırasında ağa istek yok (sahte sunucuya da)
python3 tests/e2e/v2_gunsonu.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
import v2_okuma

PORT = 4201

def bahce_tur(pg, bitir=True, adim=4):
    """Bahçe 1. gün: 'adim' soru cevaplar; bitir ise tur sonuna kadar (seçmeliler doğru, yazılılar yanlış)"""
    k = 0
    for _ in range(80):
        if pg.locator("[data-test=garden-done]").count(): return True
        if not bitir and k >= adim: return False
        if pg.locator("[data-test=garden-intro]").count(): pg.click("[data-test=next]"); pg.wait_for_selector("[data-test^=gq-]")
        if pg.locator("button.opt").count(): pg.locator("button.opt[data-right]").first.click()
        else:
            pg.fill("[data-test=answer]", "xyz falsch"); pg.click("[data-test=submit]")
            pg.wait_for_timeout(150)
            # "kendi cümleni kur": iki kelime kısa sayılır → üç kelimelik cümle (gün sonu özetine gider)
            if pg.locator("[data-test=own-short]").count():
                pg.fill("[data-test=answer]", "Ich trinke jeden Morgen Kaffee."); pg.click("[data-test=submit]"); pg.wait_for_selector("[data-test=gq-own-check]")
            if pg.locator("[data-test=gq-own-check]").count(): pg.click("[data-test=own-unsure]"); pg.wait_for_timeout(200); k += 1; continue
        pg.wait_for_selector("[data-test=next]")
        old = pg.inner_text("[data-test=garden] .pbar")
        pg.click("[data-test=next]"); k += 1
        pg.wait_for_function("(o) => document.querySelector('[data-test=garden-done]') || document.querySelector('[data-test=garden-again]') || (document.querySelector('[data-test=garden] .pbar')||{}).innerText !== o", arg=old)
        if pg.locator("[data-test=garden-again]").count(): pg.click("[data-test=garden-again]"); pg.wait_for_selector("[data-test=garden]")
    return pg.locator("[data-test=garden-done]").count() > 0

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        check(pg.locator("[data-test=gun-sonu]").count() == 0, "henüz adım bitmeden gün sonu kartı yok")
        # yarıda bırak: Bahçe'de birkaç soru, sonra Bugün'e dön
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden]")
        bahce_tur(pg, bitir=False, adim=3)
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today]")
        istek = []
        pg.on("request", lambda r: istek.append(r.url) if r.method != "GET" else None)
        pg.goto(base + "#/profile"); pg.wait_for_selector("[data-test=kullanim]")
        k = pg.inner_text("[data-test=kullanim]")
        check("Yarıda: Kelime Bahçesi (1. gün)" in k and "/" in k.split("Yarıda: Kelime Bahçesi (1. gün)")[1][:12], f"bırakma noktası kayıtlı ({k[-120:]!r})")
        check("açılış" in k, "açılış sayılıyor")
        no_overflow(pg, "Profil kullanım")
        # bitir: Bahçe turu, sonra okuma ve yazma (kendi cümlesi)
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden]")
        check(bahce_tur(pg, bitir=True), "Bahçe turu bitti")
        pg.goto(base + "#/okuma/1"); pg.wait_for_selector("[data-test=okuma-metin]")
        v2_okuma.walk(pg)
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=gun-sonu]", timeout=10000)
        g = pg.inner_text("[data-test=gun-sonu]")
        check("adım bitirdin" in g, f"gün sonu kartı: biten adım ({g[:80]!r})")
        check(pg.locator("[data-test=gun-sonu-kelimeler] .cip").count() >= 1, "bugün yeni anladığın kelimeler (çip)")
        check(pg.locator("[data-test=gun-sonu-cumle]").count() == 1 and pg.locator("[data-test=gun-sonu-cumle] [lang=de]").count() == 1, "bugün kendi kurduğun cümle (Bahçe ya da yazma görevi)")
        no_overflow(pg, "Bugün gün sonu")
        if shots: pg.locator("[data-test=gun-sonu]").scroll_into_view_if_needed(); shot(pg, "g01-gun-sonu", full=False)
        pg.goto(base + "#/profile"); pg.wait_for_selector("[data-test=kullanim]")
        k2 = pg.inner_text("[data-test=kullanim]")
        check("Yarıda: Kelime Bahçesi (1. gün)" not in k2, "biten adım artık 'yarıda' sayılmıyor")
        if shots: pg.locator("[data-test=kullanim]").scroll_into_view_if_needed(); shot(pg, "g02-kullanim", full=False)
        check(not [u for u in istek if "/api/" in u or "kullanim" in u], f"ölçüm ağa gitmiyor ({istek[:3]})")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
