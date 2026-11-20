"""
PM 7024150313: Bahçe tanıtım kartı en uzun kartta da (en çok eşdizim, en uzun örnek cümle, görselli) 430×932'de düğmelere
değmeden sığar; kartta en çok 3 eşdizim açık, kalanı "Daha fazla (n)" ile açılır.
python3 tests/e2e/v2_tanitim_sigar.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, content_file

PORT = 4216
GORSEL = 250  # görsel alanı (≈250 px; PM): görsel yoksa aynı yükseklikte yer tutucu konur


def en_uzun():
    lex = content_file("lexemes.json")["lexemes"]
    kart = [l for l in lex if l.get("card", True) is not False and l.get("tier") != "passive" and l.get("examples")]
    return max(kart, key=lambda l: (len(l.get("collocations") or []), max(len(e["de"]) + len(e.get("tr", "")) for e in l["examples"][:1])))


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    l = en_uzun()
    with sync_playwright() as p:
        # PM ölçütü 430×932 (kabukta tam ekran); cihaz öykünmesinin Safari çubuklu görünümü değil
        b, ctx = launch(p, viewport={"width": 430, "height": 932}); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.evaluate("(k) => sessionStorage.setItem('e2e-kart', k)", l["id"])
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro]")
        n_acik = pg.locator("[data-test=intro-colloc] > ul.esdizim-liste > li").count()
        n_top = len(l.get("collocations") or [])
        check(n_acik == min(3, n_top), f"en çok 3 eşdizim açık ({n_acik}/{n_top}; {l['id']})")
        if n_top > 3:
            check(pg.inner_text("[data-test=esdizim-daha] > summary").strip() == f"Daha fazla ({n_top - 3})", "kalanı 'Daha fazla (n)'")
        # görselli en kötü durum: görsel yoksa aynı yerde 250 px yer tutucu
        if not pg.locator("[data-test=garden-intro] figure").count():
            pg.evaluate(f"""() => {{ const k = document.querySelector('[data-test=garden-intro] .kicker'); const d = document.createElement('div');
              d.style.height = '{GORSEL}px'; d.setAttribute('data-test', 'gorsel-yer'); k.after(d); }}""")
        pg.evaluate("window.scrollTo(0, 0)"); pg.wait_for_timeout(200)
        alt = pg.evaluate("() => document.querySelector('[data-test=garden-intro] section.card').getBoundingClientRect().bottom")
        ust = pg.evaluate("() => Math.min(...[...document.querySelectorAll('.actionbar button')].map((b) => b.getBoundingClientRect().top))")
        check(alt <= ust, f"tanıtım kartı düğmelere değmeden sığıyor (kart altı {round(alt)} px ≤ düğme üstü {round(ust)} px; görselli, {l['id']})")
        if shots: shot(pg, "t01-en-uzun-kart", full=False)
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
