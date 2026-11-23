"""
Sınav günü uçtan uca (PM-101 md. 5, PM-110, PM-112 B): e2e fikstürü 55. gün (dinleme + okuma) ve 56. gün (yazma + konuşma),
deneme `assess:e2e-deneme:1` (content/tools/fixtures/assess).
  - gün kilidi: önceki günler bitmeden #/sinav/56 açılmaz
  - Yol: 1.–54. gün bitmiş öğrencide 55. gün tek düğüm "Deneme sınavı" (#/sinav/55); Bahçe adımı yok
  - 55. gün: giriş (iki bölüm) → dinleme (metin yok, dinleme hakkı sayılır, doğru/yanlış gösterilmez) → okuma → bölüm puanı;
    gün bitişi `m1:gun:55` ve bölüm sonucu `m1:sinav:<deneme>:<bölüm>` yazılır; toplam sonuç yok ("Kalan bölümler")
  - 56. gün: form (otomatik) + mesaj (ölçütle öz-puan) → konuşma (hazırlıksız; örnek sonra; örnekle aynı cevaba tam puan önerisi,
    boş cevaba puan verilemez) → deneme sonucu: konuşma %60 altında → "geçmedi", zayıf bölümler, "Yeniden çöz" → geçti
  - yatay taşma yok; --shots ile ekran görüntüleri
python3 tests/e2e/v2_sinav.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4261
DENEME = "assess:e2e-deneme:1"
META = """async (k) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const v = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get(k); t.onsuccess = () => ok(t.result && t.result.value); }); d.close(); return v || null; }"""
BITIR = """async (n) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  await new Promise((ok, no) => { const t = d.transaction('meta', 'readwrite'); const s = t.objectStore('meta'); for (let g = 1; g <= n; g++) s.put({ key: 'm1:gun:' + g, value: new Date().toISOString() }); t.oncomplete = ok; t.onerror = no; }); d.close(); }"""


def sec(pg, dogru=True):
    """seçmeli madde: e2e derlemesinde doğru şık `data-dogru`"""
    pg.wait_for_selector("[data-test=sinav-sec]")
    d = int(pg.get_attribute("[data-test=sinav-sec]", "data-dogru"))
    n = pg.locator("[data-test=sinav-sec] button.opt").count()
    k = d if dogru else (d + 1) % n
    pg.click(f"[data-test=sinav-sec] button.opt[data-opt='{k}']")
    return pg.locator("[data-test=sinav-sec] .opt.right, [data-test=sinav-sec] .opt.wrong").count()


def konus(pg, dogru=True):
    pg.wait_for_selector("[data-test=sinav-konus]")
    if not dogru:
        pg.click("[data-test=gec]"); return
    cev = (pg.get_attribute("[data-test=sinav-konus]", "data-cevap") or "").replace("{name}", "Ayşe")
    pg.fill("[data-test=answer]", cev); pg.click("[data-test=submit]")


def sonraki_madde(pg, q):
    pg.wait_for_function("(q) => { const e = document.querySelector('[data-test=sinav-coz]'); return !e || e.dataset.q !== String(q); }", arg=q)


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.evaluate("() => sessionStorage.setItem('e2e-gun-kilidi', 'acik')")
        # kilit: önceki günler bitmeden sınav günü açılmaz
        pg.goto(base + "#/sinav/56"); pg.wait_for_selector("[data-test=gun-kilitli], [data-test=sinav-giris]", timeout=15000)
        check(pg.locator("[data-test=gun-kilitli]").count() == 1, "#/sinav/56: önceki günler bitmeden kilitli")

        # 1.–54. gün bitti: Yol'da 55. gün tek düğüm "Deneme sınavı"
        pg.evaluate(BITIR, 54)
        pg.goto(base + "#/yol"); pg.reload(); pg.wait_for_selector("[data-test=yol] [data-test=gun-55]", timeout=20000)
        y = pg.evaluate("""() => { const g = document.querySelector('[data-test=gun-55]');
          return { durum: g?.dataset.durum, turler: [...g.querySelectorAll('[data-test=adim]')].map((x) => x.dataset.tur),
            href: g.querySelector('[data-test=m1-devam]')?.getAttribute('href'), ad: g.querySelector('[data-test=m1-devam]')?.getAttribute('aria-label') }; }""")
        check(y["durum"] == "simdi" and y["turler"] == ["sinav"], f"55. gün şimdi, tek adım sınav (Bahçe yok) ({y})")
        check(y["href"] == "#/sinav/55" and "Deneme sınavı" in (y["ad"] or ""), f"düğüm denemeye gider ({y['href']}, {y['ad']})")
        shot(pg, f"sinav-yol-{sema}")

        # 55. gün: giriş
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=sinav-giris]", timeout=15000)
        bol = pg.evaluate("() => [...document.querySelectorAll('[data-test=sinav-bolumler] > li')].map((x) => x.dataset.test)")
        check(bol == ["bolum-dinleme", "bolum-okuma"], f"55. gün: dinleme + okuma ({bol})")
        no_overflow(pg, "sınav girişi"); shot(pg, f"sinav-giris-{sema}")
        pg.click("[data-test=bolum-basla]"); pg.wait_for_selector("[data-test=sinav-coz][data-bolum=dinleme]")
        check(pg.locator("[data-test=sinav-metin]").count() == 0, "dinlemede metin gösterilmez")
        kalan0 = pg.get_attribute("[data-test=sinav-dinle]", "data-kalan")
        pg.click("[data-test=dinle]"); pg.wait_for_function("() => document.querySelector('[data-test=sinav-dinle]')?.dataset.kalan === '1'", timeout=10000)
        check(kalan0 == "2", f"dinleme hakkı yönergedeki kadar (2), dinleyince azalır ({kalan0} → 1)")
        no_overflow(pg, "dinleme maddesi"); shot(pg, f"sinav-dinleme-{sema}")
        isaret = sec(pg, True)
        check(isaret == 0, "seçince doğru/yanlış gösterilmez")
        pg.click("[data-test=next]"); sonraki_madde(pg, 0)
        sec(pg, False); pg.click("[data-test=next]")
        pg.wait_for_selector("[data-test=sinav-bolum-sonuc][data-bolum=dinleme]")
        check(pg.get_attribute("[data-test=sinav-bolum-sonuc]", "data-puan") == "12.5", "dinleme 1/2 → 12,5/25")
        check(pg.locator("[data-test=bolum-zayif]").count() == 1, "geçme sınırının altında bölüm söylenir")
        pg.click("[data-test=sonraki-bolum]"); pg.wait_for_selector("[data-test=sinav-coz][data-bolum=okuma]")
        check(pg.locator("[data-test=sinav-metin]").count() >= 1, "okumada metin var")
        sec(pg, True); pg.click("[data-test=next]"); sonraki_madde(pg, 0)
        sec(pg, True); no_overflow(pg, "okuma ilanları"); pg.click("[data-test=next]")
        pg.wait_for_selector("[data-test=sinav-bolum-sonuc][data-bolum=okuma]")
        pg.click("[data-test=sinav-ozet]"); pg.wait_for_selector("[data-test=sinav-giris]")
        check(pg.locator("[data-test=sinav-kalan]").count() == 1 and pg.locator("[data-test=deneme-sonuc]").count() == 0, "55. gün sonunda toplam sonuç yok, kalan bölümler yazılı")
        g55 = pg.evaluate(META, "m1:gun:55"); sd = pg.evaluate(META, f"m1:sinav:{DENEME}:dinleme")
        check(bool(g55) and sd and sd.get("puan") == 12.5 and sd.get("ham") == 1, f"gün bitişi ve bölüm sonucu yazıldı ({bool(g55)}, {sd})")
        xp = pg.evaluate(META, "xp:adim:sinav:55")
        check(bool(xp), "adım XP'si bir kez (xp:adim:sinav:55)")

        # Yol: 56. gün şimdi
        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=gun-56]")
        d = pg.evaluate("() => [document.querySelector('[data-test=gun-55]')?.dataset.durum, document.querySelector('[data-test=gun-56]')?.dataset.durum]")
        check(d == ["bitti", "simdi"], f"55 bitti, 56 şimdi ({d})")

        # 56. gün: yazma
        pg.goto(base + "#/sinav/56"); pg.wait_for_selector("[data-test=sinav-giris]")
        pg.click("[data-test=bolum-basla]"); pg.wait_for_selector("[data-test=sinav-form]")
        import json
        ornek = json.loads(pg.get_attribute("[data-test=sinav-form]", "data-ornek"))
        for k, v in ornek.items(): pg.fill(f"[data-alan={k}]", v)
        no_overflow(pg, "form"); pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=sinav-mesaj]")
        pg.fill("[data-test=yazi]", (pg.get_attribute("[data-test=sinav-mesaj]", "data-ornek") or "").replace("{name}", "Ayşe"))
        pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=sinav-puanla][data-bolum=yazma]")
        check(pg.get_attribute("[data-test=puan-kaydet]", "disabled") is not None, "ölçütler seçilmeden puan kaydedilmez")
        pg.click("[data-test=sinav-puanla] [data-test=olcut-0-2]"); pg.click("[data-test=sinav-puanla] [data-test=olcut-1-2]")
        shot(pg, f"sinav-mesaj-puanla-{sema}")
        pg.click("[data-test=puan-kaydet]"); pg.wait_for_selector("[data-test=sinav-bolum-sonuc][data-bolum=yazma]")
        check(pg.get_attribute("[data-test=sinav-bolum-sonuc]", "data-puan") == "25", "yazma: form 2/2 + mesaj 4/4 → 25")
        # konuşma: 1. madde örnekle aynı, 2. madde geçilir
        pg.click("[data-test=sonraki-bolum]"); pg.wait_for_selector("[data-test=sinav-konus]")
        gizli = pg.locator("[data-test=sinav-konus] ul, [data-test=sinav-konus] [data-test=ornekle-ayni]").count()
        check(gizli == 0, "konuşmada örnek cevap cevaptan önce gösterilmez")
        no_overflow(pg, "konuşma maddesi"); shot(pg, f"sinav-konusma-{sema}")
        konus(pg, True); sonraki_madde(pg, 0); konus(pg, False)
        pg.wait_for_selector("[data-test=sinav-puanla][data-bolum=konusma]")
        o = pg.evaluate("""() => [...document.querySelectorAll('[data-test^=puanla-]')].map((x) => ({ id: x.dataset.test, oneri: x.dataset.oneri, ayni: !!x.querySelector('[data-test=ornekle-ayni]'),
          tamKapali: !!x.querySelector('[data-test=oz-1][disabled]') }))""")
        check(o[0]["oneri"] == "1" and o[0]["ayni"], f"örnekle aynı cevaba tam puan önerisi ({o[0]})")
        check(o[1]["tamKapali"], f"boş cevaba puan verilemez ({o[1]})")
        no_overflow(pg, "konuşma öz-puan"); shot(pg, f"sinav-konusma-puanla-{sema}")
        pg.click("[data-test=puan-kaydet]"); pg.wait_for_selector("[data-test=sinav-bolum-sonuc][data-bolum=konusma]")
        check(pg.get_attribute("[data-test=sinav-bolum-sonuc]", "data-puan") == "12.5", "konuşma 1/2 → 12,5")
        pg.click("[data-test=sinav-ozet]"); pg.wait_for_selector("[data-test=deneme-sonuc]")
        r = pg.evaluate("() => { const e = document.querySelector('[data-test=deneme-sonuc]'); return { g: e.dataset.gecti, t: e.dataset.toplam, z: [...e.querySelectorAll('[data-test^=zayif-yeniden-]')].map((x) => x.dataset.test) }; }")
        # 12,5 + 25 + 25 + 12,5 = 75 ≥ 60 ama konuşma 12,5 < 15: geçmedi (konuşmadaki eksik kapatılamaz)
        check(r["g"] == "0" and r["t"] == "75", f"toplam 75 ama konuşma %60 altında → geçmedi ({r})")
        check(r["z"] == ["zayif-yeniden-dinleme", "zayif-yeniden-konusma"], f"zayıf bölümler yeniden çözülebilir ({r['z']})")
        no_overflow(pg, "deneme sonucu"); shot(pg, f"sinav-sonuc-gecmedi-{sema}")
        check(bool(pg.evaluate(META, "m1:gun:56")), "56. gün bitti")
        # yeniden çöz: konuşma
        pg.click("[data-test=zayif-yeniden-konusma]"); pg.wait_for_selector("[data-test=sinav-konus]")
        konus(pg, True); sonraki_madde(pg, 0); konus(pg, True)
        pg.wait_for_selector("[data-test=sinav-puanla]")
        check(pg.get_attribute("[data-test=puan-kaydet]", "disabled") is None, "iki öneri: puan hemen kaydedilebilir")
        pg.click("[data-test=puan-kaydet]"); pg.wait_for_selector("[data-test=sinav-bolum-sonuc]")
        pg.click("[data-test=sinav-ozet]"); pg.wait_for_selector("[data-test=deneme-sonuc]")
        r = pg.evaluate("() => { const e = document.querySelector('[data-test=deneme-sonuc]'); return { g: e.dataset.gecti, t: e.dataset.toplam }; }")
        check(r == {"g": "1", "t": "87.5"}, f"yeniden çözümden sonra geçti (son çözüm sayılır) ({r})")
        shot(pg, f"sinav-sonuc-gecti-{sema}")
        # tek bölüm adresi doğrudan başlar
        pg.goto(base + "#/sinav/55/okuma"); pg.wait_for_selector("[data-test=sinav-coz][data-bolum=okuma]", timeout=15000)
        check(True, "#/sinav/55/okuma doğrudan okuma bölümünü açar")
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
