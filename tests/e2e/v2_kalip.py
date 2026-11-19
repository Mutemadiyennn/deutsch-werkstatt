"""
#58 B2 — kalıp kartı: kural, örnekler, slot doldurma, dönüşümler öğrenciye görünür.
  - Öğren → Kalıplar listesi (bütün kalıplar, önce temel olanlar)
  - kart: çerçeve, kurallar (kurallar_tr), örnekler (dinlenebilir), boşluğa gelebilenler (seçilen öbeği kullanan örnek öne çıkar),
    dönüşümler (soru, olumsuz, kibar, geçmiş, sebep, aktarma, koşul), sık hata; yazar notu (grammar_tr) görünmez
  - Sözlük kartından kelimenin kalıbına bağlantı; %130 yazıda taşma yok
python3 tests/e2e/v2_kalip.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import glob, json, os
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4204
KOK = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..")

def main():
    pts = json.load(open(os.path.join(KOK, "content/v2/registry/patterns.json")))
    pts = pts if isinstance(pts, list) else pts["patterns"]
    p0 = next(p for p in pts if p["id"] == "pt:ich-bin")
    # kalıbı olan bir kelime (Sözlük → kalıp bağlantısı)
    lx = next(l for f in sorted(glob.glob(os.path.join(KOK, "content/v2/registry/lexicon/batch-*.json"))) for l in json.load(open(f))["items"]
              if any(x in {p["id"] for p in pts} for x in l.get("patterns", [])) and l.get("card", True) is not False)
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            b, ctx = launch(p, color_scheme=tema); pg = new_page(ctx)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            pg.goto(base + "#/learn"); pg.click("[data-test=kalip-ac]"); pg.wait_for_selector("[data-test=kalip-liste]")
            n = pg.locator("[data-test=kalip-satir]").count()
            check(n == len(pts), f"[{tema}] listede bütün kalıplar ({n}/{len(pts)})")
            pg.goto(base + "#/kalip/pt:ich-bin"); pg.wait_for_selector("[data-test=kalip-karti]")
            check(pg.locator("[data-test=kalip-kurallar] li").count() == len(p0["kurallar_tr"]), f"[{tema}] kurallar tek tek görünür")
            check(pg.locator("[data-test=kalip-ornek]").count() == len(p0["examples"]) and pg.locator("[data-test=kalip-ornekler] [data-test=listen]").count() >= 1, f"[{tema}] örnekler dinlenebilir")
            check(pg.locator("[data-test=kalip-donusum]").count() == len([k for k in p0["transforms"] if p0["transforms"][k]]), f"[{tema}] dönüşümler Türkçe etiketle")
            check(pg.locator("[data-test=kalip-hatalar] li").count() == len(p0["mistakes_tr"]), f"[{tema}] sık hatalar")
            metin = pg.inner_text("[data-test=kalip-karti]")
            check(p0["grammar_tr"][:30] not in metin, f"[{tema}] yazar notu (grammar_tr) öğrenciye görünmüyor")
            # OD-9: yazar alanı boşluk adları (terim içerebilir) öğrenciye görünmez (inceleme #94 P1-1)
            check(all(sl["name"] not in metin for sl in p0["slots"]), f"[{tema}] boşluk adları (yazar alanı) görünmüyor")
            check(pg.get_attribute("[data-tab=learn]", "aria-current") == "page", f"[{tema}] sekme çubuğunda Öğren seçili (inceleme #94 P1-4)")
            # slot doldurma: ilk örnekte geçmeyen öbek ("fertig", 9. örnek) → örneği çiplerin hemen altında, ekranda (P1-2)
            pg.locator("[data-test=kalip-dolgu]", has_text="fertig").first.click()
            ornek = pg.locator("[data-test=kalip-secili-ornek]")
            check(ornek.count() == 1 and "fertig" in ornek.inner_text(), f"[{tema}] seçilen öbeği kullanan örnek çiplerin altında ({ornek.inner_text()[:40] if ornek.count() else ''!r})")
            pg.wait_for_function("() => { const r = document.querySelector('[data-test=kalip-secili-ornek]').getBoundingClientRect(); return r.bottom <= innerHeight && r.top >= 0; }", timeout=3000)
            kutu = ornek.bounding_box(); yuk = pg.evaluate("innerHeight")
            check(kutu is not None and kutu["y"] + kutu["height"] <= yuk and kutu["y"] >= 0, f"[{tema}] örnek ekranda görünüyor (y={kutu and round(kutu['y'])}, pencere {yuk})")
            check(pg.locator("[data-test=kalip-ornek][data-vurgu='1']").count() == 1, f"[{tema}] örnek listesinde de vurgulu")
            # örneği olmayan öbek: bunu söyler
            pg.locator("[data-test=kalip-dolgu]", has_text="zufrieden").first.click()
            check(pg.locator("[data-test=kalip-secili-yok]").count() == 1, f"[{tema}] örneği olmayan öbekte açıklama")
            no_overflow(pg, f"[{tema}] kalıp kartı")
            if shots: shot(pg, f"k01-kart-{tema}", full=True)
            pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')")
            no_overflow(pg, f"[{tema}] %130 yazı kalıp kartı")
            if tema == "light":
                # kişiselleştirme: ad ve hitap girilince yer tutucular çözülür ({Kunde|Kundin}, {name}) — P1-5
                pg.goto(base + "#/profile"); pg.wait_for_selector("#nm"); pg.fill("#nm", "Novak"); pg.click("[data-address=Frau]"); pg.wait_for_timeout(600)
                pg.goto(base + "#/kalip/pt:ich-bin"); pg.wait_for_selector("[data-test=kalip-karti]")
                km = pg.inner_text("[data-test=kalip-karti]")
                check("{" not in km and "Kundin bei Ihnen" in km and "Kunde/Kundin" not in km, "hitaba göre çözüldü (Frau → Kundin), ham yer tutucu yok")
                # alıştırmadan alt sayfa: ilerleme kaybolmaz (P1-3)
                pg.goto(base + "#/scenario/sc:telefon:01-arzttermin/build"); pg.wait_for_selector(".pbar h1")
                pg.wait_for_selector("[data-test=kalip-bag]", timeout=10000)
                if True:
                    once = pg.inner_text(".pbar")
                    pg.click("[data-test=kalip-bag]"); pg.wait_for_selector("[role=dialog][data-test=kalip-karti]")
                    check("#/scenario/" in pg.url, "kalıp kartı alıştırmanın üstünde açılır (sayfa değişmez)")
                    pg.click("[data-test=kalip-kapat]")
                    check(pg.locator("[data-test=kalip-karti]").count() == 0 and pg.inner_text(".pbar") == once, "kapatınca aynı maddede devam")
                pg.goto(base + f"#/sozluk/{lx['de']}/{lx['id']}"); pg.wait_for_selector("[data-test=sozluk-kart]")
                check(pg.locator("[data-test=sozluk-kaliplar] a").count() >= 1, f"Sözlük kartında kelimenin kalıbı ({lx['id']})")
                pg.locator("[data-test=sozluk-kaliplar] a").first.click(); pg.wait_for_selector("[data-test=kalip-karti]")
                check(pg.get_attribute("[data-test=kalip-karti]", "data-id") in lx["patterns"], "bağlantı kalıp kartını açar")
                pg.click(".pbar a[aria-label=Geri]"); pg.wait_for_selector("[data-test=sozluk-kart]")
                check(True, "kalıp kartından geri: Sözlük kartına döner")
            b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
