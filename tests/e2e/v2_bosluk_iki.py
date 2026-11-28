"""
İki parçalı fiil boşluğu (DENETİM-A1 P1-1, PM-148 [ANA-T] md. 1): 10. günün akışında "Ich ___ um acht ___." (anfangen).
  - ekranda iki boşluk; cümlede "…" yok; "İki boşluk var" ipucu; iki kelime sırayla yazılınca doğru
  - tek kelime ("fange") doğru sayılmaz
  - cihazda kalmış eski plan (bozuk cümle "Ich fange … an um acht fange … an.") aynı doğru ekranı açar
python3 tests/e2e/v2_bosluk_iki.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
from ogrenci_devam import tohumla

PORT = 4271
GUN = 10
CUMLE = "Ich fange um acht an."
ESKI = "Ich fange … an um acht fange … an."
# kayıttaki planda adımı bulur, şimdiki konumu ona getirir; `bozuk` verilirse adımın cümlesini eski (hatalı) doldurmaya çevirir
KONUM = """async ([gun, cumle, bozuk]) => {
  const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const al = () => new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get('akis:' + gun); t.onsuccess = () => ok(t.result); });
  const r = await al(); if (!r) { d.close(); return null; }
  const m = r.value; let yer = null;
  m.plan.duraklar.forEach((x, i) => x.adimlar.forEach((a, j) => { if (!yer && a.tur === 'gap' && (a.cumle === cumle || a.cumle === bozuk)) yer = [i, j]; }));
  if (!yer) { d.close(); return { yok: m.plan.duraklar.flatMap((x) => x.adimlar).filter((a) => a.tur === 'gap').map((a) => a.cumle) }; }
  m.durak = yer[0]; m.adim = yer[1];
  if (bozuk) m.plan.duraklar[yer[0]].adimlar[yer[1]].cumle = bozuk;
  await new Promise((ok) => { const t = d.transaction('meta', 'readwrite'); t.objectStore('meta').put({ ...r, value: m }); t.oncomplete = ok; });
  d.close(); return { yer }; }"""


def ac(pg, base, bozuk=None):
    pg.goto(base + f"#/akis/{GUN}"); pg.wait_for_selector("[data-test=akis]", timeout=20000)
    r = None
    for _ in range(40):
        r = pg.evaluate(KONUM, [GUN, CUMLE, bozuk])
        if r: break
        pg.wait_for_timeout(250)
    check(r and "yer" in r, f"{GUN}. günün planında '{CUMLE}' boşluk adımı var ({r})")
    pg.reload(); pg.wait_for_selector("[data-test=akis-bosluk]", timeout=15000)


def ekran(pg, ne):
    bos = pg.locator("[data-test=akis-bosluk] .bosluk").count()
    gor = pg.inner_text("[data-test=akis-bosluk] .de-lg")
    check(bos == 2, f"{ne}: iki boşluk ({bos})")
    check("…" not in gor and gor.split() == "Ich ____ um acht ____.".split(), f"{ne}: cümle bozuk değil ({gor!r})")
    check(pg.locator("[data-test=bosluk-iki]").is_visible(), f"{ne}: 'iki kelimeyi sırayla yaz' ipucu görünür")
    no_overflow(pg, ne)


def cevapla(pg, deger):
    pg.locator("[data-test=akis-bosluk] [data-test=answer]").first.fill(deger)
    pg.locator("[data-test=akis-bosluk] [data-test=submit]").first.click()
    pg.wait_for_selector("[data-test=akis-sonuc]", timeout=5000)
    return pg.get_attribute("[data-test=akis-sonuc]", "data-dogru")


def main():
    serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        tohumla(pg, GUN, 0)
        ac(pg, base)
        ekran(pg, "yeni plan")
        shot(pg, f"bosluk-iki-{sema}", full=False)
        check(cevapla(pg, "fange an") == "1", "iki kelime sırayla ('fange an'): doğru")
        shot(pg, f"bosluk-iki-dogru-{sema}", full=False)
        ac(pg, base)
        check(cevapla(pg, "fange … an") == "1", "'fange … an' da doğru")
        ac(pg, base)
        check(cevapla(pg, "fange") == "0", "tek kelime ('fange') doğru sayılmaz")
        # cihazda kalmış eski plan: adımın cümlesi hatalı doldurmayla kayıtlı
        ac(pg, base, bozuk=ESKI)
        ekran(pg, "eski plan")
        check(cevapla(pg, "fange an") == "1", "eski planda da iki kelime doğru")
        b.close()
    finish()


if __name__ == "__main__":
    main()
