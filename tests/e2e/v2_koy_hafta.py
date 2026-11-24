"""
Köy listeleri haftaya göre katlanır (PM-122 md. 2.1, KAPI-İŞ 7122131212; Yol #243 gibi). e2e fikstürü 8. ve 9. günle
(content/tools/fixtures/m1); 1.–7. gün bitmiş öğrenci (ogrenci_devam.tohumla), 8. gün şimdi, 9. gün kilitli:
  - Radyo ve Sinema: 2. hafta açık (8. gün kartı, "2. hafta" başlığı); 1. hafta tek satır ("İlk Hafta · 7 gün · N kayıt",
    aria-expanded=false, günleri çizilmez); dokununca 1.–7. gün kartları açılır, yeniden dokununca kapanır; 9. gün (kilitli) hiç yok
  - Kütüphane (okuma) ve Pazar meydanı (prova): aynı katlama kartın listesinde (plan önceki haftaların adımlarını taşımadığı
    için bugün yalnız içinde bulunulan hafta görünür; katlama koy.test.ts'te sınanır)
  - satırlar en az 44 px, yatay taşma yok; ekran başına dokunulabilir öğe gezgin sınırının (80) altında
  - taze öğrencide (yalnız 1. gün) satır ve başlık yok: ekran eskisi gibi
  52 hafta: web/src/core/koy.test.ts (fikstürle).
python3 tests/e2e/v2_koy_hafta.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow, content_file
from ogrenci_devam import tohumla

PORT = 4264
TAP = "main button:not([disabled]), main a[href], main [role=button], .actionbar button:not([disabled]), .actionbar a[href], .tabbar a"
GUNLER = "() => [...document.querySelectorAll('[data-test^=mekan-gun-]')].map((s) => +s.dataset.test.slice(10))"
KUCUK = "() => [...document.querySelectorAll('.koy-sayfa a, .koy-sayfa button')].filter((a) => !a.closest('.topbar')).map((a) => [a.dataset.test || a.getAttribute('href') || a.innerText.slice(0, 20), Math.round(a.getBoundingClientRect().height)]).filter(([, h]) => h < 44)"


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    idx = content_file("index.json")
    gun = {g["day"]: g for g in idx["m1"]}
    if not all(d in gun for d in range(1, 10)):
        print("  - e2e fikstürü (1.–9. gün) yok; DW_E2E_FIXTURES=1 ile derle"); srv.shutdown(); check(False, "fikstür günleri var"); finish(); return
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")

        print("taze öğrenci: tek hafta, satır ve başlık yok")
        pg.goto(base + "#/koy/radyo"); pg.wait_for_selector("[data-test=mekan-radyo] [data-test=kayit-ses]")
        check(pg.locator("[data-test^=kat-]").count() == 0 and pg.evaluate(GUNLER) == [1], "Radyo: yalnız 1. gün, hafta satırı ya da başlığı yok (ekran eskisi gibi)")

        tohumla(pg, 8, 0)
        for m, tur in (("radyo", lambda k: k == "ses"), ("sinema", lambda k: k != "ses")):
            print(f"{m}: 2. hafta açık, İlk Hafta tek satır")
            pg.goto(base + f"#/koy/{m}"); pg.reload(); pg.wait_for_selector(f"[data-test=mekan-{m}] [data-test=kat-1]", timeout=20000)
            hafta2 = [d for d in (8, 9) if d == 8 and any(tur(x["kind"]) for x in gun[d]["medya"])]
            hafta1 = [d for d in range(1, 8) if any(tur(x["kind"]) for x in gun[d]["medya"])]
            n1 = sum(1 for d in hafta1 for x in gun[d]["medya"] if tur(x["kind"]))
            satir = pg.locator("[data-test=kat-1]")
            check(pg.evaluate(GUNLER) == hafta2 and pg.locator("[data-test=kat-acik-2]").inner_text().strip() == "2. hafta",
                  f"{m}: açık hafta 2 ({pg.evaluate(GUNLER)}); 9. gün (kilitli) yok; başlık '2. hafta'")
            yazi = " ".join(satir.inner_text().split())
            check(satir.get_attribute("aria-expanded") == "false" and yazi == f"İlk Hafta · {len(hafta1)} gün · {n1} kayıt", f"{m}: 1. hafta tek satır, kapalı ({yazi!r})")
            n = pg.locator(TAP).count()
            check(n < 80, f"{m}: ekranda {n} dokunulabilir öğe (gezgin sınırı 80)")
            check(pg.evaluate(KUCUK) == [], f"{m}: satırlar en az 44 px ({pg.evaluate(KUCUK)[:3]})")
            no_overflow(pg, m)
            shot(pg, f"koy-{m}-hafta-{sema}", full=False)
            satir.click(); pg.wait_for_selector("[data-test=mekan-gun-1]")
            check(pg.evaluate(GUNLER) == hafta1 + hafta2 and satir.get_attribute("aria-expanded") == "true", f"{m}: satıra dokununca 1. haftanın günleri açıldı ({pg.evaluate(GUNLER)})")
            shot(pg, f"koy-{m}-hafta-acik-{sema}", full=False)
            satir.click(); pg.wait_for_timeout(150)
            check(pg.evaluate(GUNLER) == hafta2 and satir.get_attribute("aria-expanded") == "false", f"{m}: yeniden dokununca kapandı")

        for m, tur, sec in (("kutuphane", "okuma", "[data-test=temel-liste]"), ("pazar", "prova", "[data-domain]")):
            pg.goto(base + f"#/koy/{m}"); pg.reload(); pg.wait_for_selector(f"[data-test=mekan-{m}] {sec}", timeout=20000); pg.wait_for_timeout(400)
            gorunen = pg.evaluate(f"[...document.querySelectorAll('[data-test^={tur}-]:not([data-test={tur}-liste])')].map((a) => +a.dataset.test.split('-')[1])")
            if pg.locator(f"[data-test={tur}-liste] [data-test=kat-1]").count() == 0:
                # plan yalnız içinde bulunulan haftanın gün dosyalarını yükler (#243): önceki haftaların adımları planda yok
                check(all(d >= 8 for d in gorunen), f"{m}: önceki haftanın {tur} adımı planda yok; liste yalnız 2. hafta ({gorunen})"); shot(pg, f"koy-{m}-hafta-{sema}", full=True); continue
            check(gorunen and all(d >= 8 for d in gorunen), f"{m}: {tur} listesi 2. hafta açık, 1. hafta kapalı ({gorunen})")
            pg.click(f"[data-test={tur}-liste] [data-test=kat-1]"); pg.wait_for_timeout(150)
            acik = pg.evaluate(f"[...document.querySelectorAll('[data-test^={tur}-]:not([data-test={tur}-liste])')].map((a) => +a.dataset.test.split('-')[1])")
            check(any(d < 8 for d in acik) and all(d != 9 for d in acik), f"{m}: satıra dokununca 1. haftanın {tur}ları açıldı ({acik})")
            check(pg.evaluate(KUCUK) == [], f"{m}: satırlar en az 44 px")
            no_overflow(pg, m)
            shot(pg, f"koy-{m}-hafta-acik-{sema}", full=True)
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
