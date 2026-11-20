"""
PM-074 G2 ve md. 2–3: üst çubukta uzun başlık tek satır ("…"), taşma yok; medya dinleme adımında tek birincil düğme +
hız anahtarı; senaryo "Önce duy" ekranında birincil eylem dinlemek, altyazıya atlama küçük bağlantı.
python3 tests/e2e/v2_baslik.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg

PORT = 4217
EKRANLAR = ["#/prova/1", "#/m1/1/m1%3A01%3Aa1", "#/m1/1/m1%3A01%3Av1"]


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, viewport={"width": 430, "height": 932}); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        for h in EKRANLAR:
            pg.goto(base + h); pg.wait_for_selector(".pbar h1")
            r = pg.evaluate("""() => { const h = document.querySelector('.pbar h1'), b = h.getBoundingClientRect(), lh = parseFloat(getComputedStyle(h).lineHeight);
              return { top: b.top, h: b.height, lh, tasma: h.scrollWidth > h.clientWidth, t: h.innerText }; }""")
            check(r["top"] >= 0 and r["h"] <= r["lh"] * 1.2, f"{h}: başlık tek satır, ekranda ({r['t'][:30]!r}; üst {round(r['top'])}, yükseklik {round(r['h'])})")
            if shots: shot(pg, "b-" + h.split("/")[-1][:20].replace("%3A", "-"), full=False)
        # medya dinleme adımı: tek birincil düğme, hız anahtarı; "Önce dinle" yazan ikinci düğme yok
        pg.goto(base + "#/m1/1/m1%3A01%3Aa1"); pg.wait_for_selector("[data-test=adim-dinle]")
        n_prim = pg.locator("[data-test=adim-dinle] .btn.primary").count()
        check(n_prim == 1 and "Önce dinle" not in pg.inner_text("body"), f"medya: tek birincil düğme ({n_prim}), 'Önce dinle' yok")
        # senaryo "Önce duy": birincil eylem dinlemek
        pg.goto(base + "#/scenario/sc:telefon:01-arzttermin"); pg.wait_for_selector("[data-test=continue]")
        pg.click("[data-test=continue]"); pg.wait_for_selector("[data-test=stage-intro]")
        if True:
            prim = pg.locator(".actionbar .btn.primary").first.get_attribute("data-test")
            check(prim == "play-dialogue" and pg.locator(".actionbar .linkbtn[data-test=to-subtitles]").count() == 1, f"senaryo: birincil 'Diyaloğu dinle', altyazıya atlama bağlantı ({prim})")
            if shots: shot(pg, "b-senaryo-dinle", full=False)
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
