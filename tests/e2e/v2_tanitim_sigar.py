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
        # PM 7026866757: (1) örnek cümle tam genişlikte, hecelenmez; (2) "Başka cümle" ve "Daha fazla" aynı üslup;
        # (3) "Daha fazla" açılınca son satır görünür ve birincil düğmeyle kesişmez
        r = pg.evaluate("""() => { const p = document.querySelector('[data-test=intro-ex]'), k = p.closest('section.card'), cs = getComputedStyle(k);
          const ic = k.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
          return { gen: Math.round(p.getBoundingClientRect().width), ic: Math.round(ic), hy: getComputedStyle(p.querySelector('[lang=de]')).webkitHyphens || getComputedStyle(p.querySelector('[lang=de]')).hyphens }; }""")
        check(abs(r["gen"] - r["ic"]) <= 2 and r["hy"] == "manual", f"örnek cümle tam genişlikte ve hecelenmez ({r})")
        if pg.locator("[data-test=baska-cumle]").count() and pg.locator("[data-test=esdizim-daha]").count():
            u = pg.evaluate("""() => ['[data-test=baska-cumle]', '[data-test=esdizim-daha] > summary'].map((q) => { const c = getComputedStyle(document.querySelector(q)); return [c.textDecorationLine, c.fontWeight, c.color]; })""")
            check(u[0] == u[1], f"'Başka cümle' ve 'Daha fazla' aynı üslupta ({u})")
        if pg.locator("[data-test=esdizim-daha]").count():
            pg.click("[data-test=esdizim-daha] > summary"); pg.wait_for_timeout(900)
            k = pg.evaluate("""() => { const li = document.querySelector('[data-test=esdizim-daha] li:last-child').getBoundingClientRect();
              const ust = Math.min(...[...document.querySelectorAll('.actionbar button')].map((b) => b.getBoundingClientRect().top));
              return { alt: Math.round(li.bottom), ust: Math.round(ust), gor: li.top >= 0 && li.bottom <= innerHeight }; }""")
            check(k["gor"] and k["alt"] <= k["ust"], f"'Daha fazla' açıkken son eşdizim satırı görünür, düğmelerin üstünde ({k})")
            if shots: shot(pg, "t02-daha-fazla-acik", full=False)
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
