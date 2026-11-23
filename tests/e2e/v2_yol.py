"""
#58 A5b ders yolu — 1. günü Bugün ekranından baştan sona yürür (kabul koşusunun A13 iskeleti):
  Bugün "Sıradaki" → Seans 1 Bahçe (günün yeni kartları) → Bugün → Seans 2 temel ders → Bugün → Seans 3 video + sesler
  → gün biter, 2. gün (varsa) açılır; tamamlanan adım yeniden önerilmez; XP artar, seri 1; v1'e gönderme yok
  python3 tests/e2e/v2_yol.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
import v2_garden, v2_ders, v2_medya, v2_prova, v2_okuma

PORT = 4196

def next_card(pg, base):
    """Bugün kartının metni; karttaki seans numarası (günün adımı) `data-seans` ile "Seans N" olarak başa eklenir"""
    pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=next-activity][data-m1]")
    return f"Seans {pg.get_attribute('[data-test=next-activity]', 'data-seans')} · " + pg.inner_text("[data-test=next-activity]")

def main():
    v2_medya.install_media()
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); ctx.add_init_script("sessionStorage.setItem('e2e-akis-gunler', '[]')"); pg = new_page(ctx)  # eski düzen: 1. gün bayraksız (bayrak PR'ı)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        # gün dosyası gelmezse Bugün iskelette takılmaz: hata + "Tekrar dene" (inceleme #66 P1-4)
        engel = lambda r: r.abort()
        pg.route("**/m1/gun-01.json", engel)
        pg.reload(); pg.wait_for_selector(".card.err", timeout=20_000)
        check("planı yüklenemedi" in pg.inner_text(".card.err"), "gün dosyası yoksa Bugün hata ve 'Tekrar dene' gösteriyor")
        pg.unroute("**/m1/gun-01.json", engel)
        pg.click(".card.err button"); pg.wait_for_selector("[data-test=next-activity][data-m1]")
        check(True, "'Tekrar dene' ile plan yüklendi")
        na = next_card(pg, base)
        check("1. gün" in na and "Seans 1" in na and "Kelime Bahçesi" in na, f"Bugün: 1. gün · Seans 1 Kelime Bahçesi ({na[:80]!r})")
        check("Eski uygulama" not in pg.inner_text("main"), "Bugün'de eski uygulamaya gönderme yok")
        if shots: shot(pg, "y01-bugun", full=False)
        # Seans 1: günün kartlarının hepsi tanıtılana kadar tur ("Bir tur daha"); bitiş öğrencinin düğmesiyle (inceleme #66 P1-1, P1-3)
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=garden], [data-test=garden-empty]")
        k = 0; turlar = 1
        while k < 150:
            if pg.locator("[data-test=garden-again]").count():
                check("yeni kelime kaldı" in pg.inner_text("[data-test=garden-kalan]"), "tur sonu: kalan yeni kelime söyleniyor") if turlar == 1 else None
                pg.click("[data-test=garden-again]"); pg.wait_for_selector("[data-test=garden] .pbar"); turlar += 1; continue
            if pg.locator("[data-test=garden-back], [data-test=garden-empty]").count(): break
            v2_garden.answer_current(pg); k += 1
        check(pg.locator("[data-test=garden-back]").count() == 1 and k >= 1, f"Seans 1 bitti: günün kartları tanıtıldı ({k} soru, {turlar} tur)")
        pg.click("[data-test=garden-back]"); pg.wait_for_selector("[data-test=next-activity][data-m1]")
        if shots:
            pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=yol] [data-test=next-activity]"); shot(pg, "y03-yol-acik", full=False)
        # Seans 2
        na = next_card(pg, base)
        check("Seans 2" in na and "Temel ders" in na, f"Bugün: Seans 2 temel ders ({na[:80]!r})")
        check("Seans 1 ·" not in na and "Kelime Bahçesi" not in na, "biten Seans 1 yeniden önerilmiyor")
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=ders]")
        k = 0; bahce_not = ""; bahce_soru = 0
        while not pg.locator("[data-test=ders-bitti]").count() and k < 120:
            if pg.locator("[data-test=ders-bahce-not]").count(): bahce_not = pg.inner_text("[data-test=ders-bahce-not]")
            if pg.locator("[data-test=ders-bahce]").count(): bahce_soru += 1
            v2_ders.step(pg); k += 1
        # B5: aynı gün Bahçede görülen kelimeler derste yeniden tanıtılmaz; her biri en çok bir soru
        import re as _re
        atlanan = int((_re.search(r"(\d+) kelime", bahce_not) or [0, 0])[1])
        check(atlanan > 0 and 1 <= bahce_soru <= atlanan, f"B5: 1. gün Bahçede görülenler derste yeniden tanıtılmadı ({atlanan} kelime; Bahçe turu {bahce_soru} soru ≤ {atlanan})")
        check(pg.locator("[data-test=ders-bitti]").count() == 1, f"Seans 2 bitti ({k} adım)")
        # Seans 3: video + sesler
        n3 = 0
        while True:
            na = next_card(pg, base)
            if "Seans 3" not in na: break
            n3 += 1
            pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=medya]")
            k = 0
            while not pg.locator("[data-test=medya-bitti]").count() and k < 100:
                v2_medya.answer_step(pg); k += 1
            check(pg.locator("[data-test=medya-bitti]").count() == 1, f"Seans 3 · kayıt {n3} bitti ({k} adım)")
            if n3 == 1:
                # "Baştan çalış" biten adımı bitmemiş yapmaz (inceleme #66 P1-2)
                baslik = pg.inner_text("[data-test=medya] .pbar h1")
                pg.click("[data-test=medya-bastan]"); pg.wait_for_selector("[data-test=medya] [data-test=next], [data-test=medya] button")
                na2 = next_card(pg, base)
                check(baslik not in na2, f"baştan çalışılan kayıt yeniden önerilmiyor ({baslik!r})")
            if n3 > 5: break
        check(n3 >= 3, f"Seans 3: video + en az 2 ses ({n3})")
        # Seans 4: konuşma provası (A7), sonra okuma/yazma (A8)
        na = next_card(pg, base)
        check("Seans 4" in na, f"Bugün: Seans 4 konuşma provası ({na[:70]!r})")
        pg.click("[data-test=m1-devam]")
        t4 = v2_prova.walk(pg)
        check(pg.locator("[data-test=prova-rapor]").count() == 1, f"Seans 4 prova bitti ({t4} cevap)")
        na = next_card(pg, base)
        check("Seans 4" in na and "Okuma ve yazma" in na, f"Bugün: Seans 4 okuma/yazma ({na[:70]!r})")
        pg.click("[data-test=m1-devam]"); v2_okuma.walk(pg)
        check(True, "Seans 4 okuma/yazma bitti")
        # gün bitti
        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=yol]")
        check(pg.get_attribute("[data-test=gun-1]", "data-durum") == "bitti", "yol: 1. gün bitti")
        pg.reload(); pg.wait_for_selector("[data-test=yol]")
        check(pg.get_attribute("[data-test=gun-1]", "data-durum") == "bitti", "yeniden yüklemeden sonra da 1. gün bitti (kalıcı)")
        xp = int(pg.inner_text("[data-test=xp]"))
        check(xp > 30, f"XP kazanıldı ({xp})")
        check(pg.locator("[data-test=seri]").count() == 1 and pg.inner_text("[data-test=seri]") == "1", "seri: 1 gün")
        no_overflow(pg, "yol")
        if shots: shot(pg, "y02-yol", full=False)
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
