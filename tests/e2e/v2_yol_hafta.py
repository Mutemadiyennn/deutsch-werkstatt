"""
Çok haftalı Yol (PR B-3; PR B 7087645415 md. 1–5, PM-108 B md. 2): e2e fikstürü 8. ve 9. günle (content/tools/fixtures/m1).
1.–7. gün bitmiş öğrenci (ogrenci_devam.tohumla) ile:
  - Yol: 2. hafta açık ("2. HAFTA · GÜN 8"), 1. hafta tek satır "tamam" (dokununca 7 gün), başlık "Yol"; çözülmemiş 1. hafta testi 2. haftanın başında (Yol + Bugün); 8. gün şimdi, 9. gün kilitli
  - yükleme: Yol açılışında yalnız 2. haftanın gün dosyaları istenir (1.–7. gün dosyası yüklenmez)
  - gün kilidi: 9. gün adresle (#/akis/9, #/garden/9, #/prova/9) açılmaz → "henüz kilitli" + "Bugüne dön"; 8. gün açılır
  - hafta sonu testi (1. hafta): Yol'dan açılır, maddeler sırayla, sonuç ekranı, `m1:hafta:1` yazılır, Yol satırında sonuç
  - 2. haftanın testi kilitli (hafta bitmedi)
  - Bugün sekmesi yalnız bugünün günü (8)
python3 tests/e2e/v2_yol_hafta.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
from ogrenci_devam import tohumla

PORT = 4253
META = """async (k) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const v = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get(k); t.onsuccess = () => ok(t.result && t.result.value); }); d.close(); return v || null; }"""


def coz(pg):
    """DrillView maddesini doğru cevapla (e2e derlemesinde data-right / data-cevap)"""
    if pg.locator("[data-test=drill-pick]").count():
        pg.locator("button.opt[data-right]").first.click()
    elif pg.locator("[data-test=drill-order]").count():
        cev = pg.get_attribute("[data-test=drill-order]", "data-cevap") or ""
        for w in [x.strip(".,!?;:„“\"") for x in cev.split()]:
            if w: pg.locator(f"[data-test=drill-order] .wchip[data-chip='{w}']:not([disabled])").first.click()
        pg.click("[data-test=submit]")
    else:
        cev = (pg.locator("[data-test^=drill-]").first.get_attribute("data-cevap") or "").replace("{name}", "Ayşe")
        pg.fill("[data-test=answer]", cev); pg.click("[data-test=submit]")
    pg.wait_for_selector("[data-test=next], [data-test=claim]")
    pg.locator("[data-test=next]").first.click()


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        tohumla(pg, 8, 0)
        pg.evaluate("() => { sessionStorage.setItem('e2e-gun-kilidi', 'acik'); sessionStorage.setItem('e2e-akis-gunler', '\"hepsi\"'); }")
        istek = []
        pg.on("request", lambda r: istek.append(r.url) if "/m1/gun-" in r.url else None)
        pg.goto(base + "#/yol"); pg.reload(); pg.wait_for_selector("[data-test=yol] [data-test=gun-8]", timeout=20000)
        yuklenen = sorted({u.rsplit("/", 1)[-1] for u in istek})
        check(yuklenen == ["gun-08.json", "gun-09.json"], f"Yol açılışında yalnız 2. haftanın gün dosyaları yüklendi ({yuklenen})")
        y = pg.evaluate("""() => { const q = (s) => document.querySelector(s);
          return { h1: q('[data-test=hafta-1]')?.dataset.durum, h1gun: document.querySelectorAll('[data-test=hafta-1] [data-test^=gun-]').length,
            g8: q('[data-test=gun-8]')?.dataset.durum, g9: q('[data-test=gun-9]')?.dataset.durum, bant: q('[data-test=gun-8] .gun-bant-ust')?.innerText,
            dugum1: !!q('section.yolgun[data-test=gun-1]'), baslik: q('.topbar h1, header h1, h1')?.innerText, hafta: q('[data-test=yol]')?.dataset.hafta }; }""")
        check(y["h1"] == "bitti" and y["h1gun"] == 0 and not y["dugum1"], f"1. hafta tek satır 'tamam', günleri kapalı ({y})")
        check(y["g8"] == "simdi" and y["g9"] == "kilitli" and (y["bant"] or "").upper().startswith("2. HAFTA · GÜN 8"), f"2. hafta açık: 8. gün şimdi, 9. gün kilitli, bant '2. HAFTA · GÜN 8' ({y['bant']})")
        check(y["hafta"] == "2" and (y["baslik"] or "") == "Yol", f"Yol başlığı 'Yol', hafta rengi 2. haftanın ({y['baslik']}, hafta {y['hafta']})")
        check(pg.locator("[data-test=hafta-testi-hazir] [data-test=hafta-testi-1]").count() == 1, "çözülmemiş 1. hafta testi 2. haftanın başında tek satır (Yol)")
        no_overflow(pg, "çok haftalı Yol")
        shot(pg, f"yol-hafta-2-{sema}", full=False)
        pg.click("[data-test=hafta-1] .hafta-satir-btn")
        n = pg.locator("[data-test=hafta-1-gunler] li").count()
        check(n == 7 and pg.locator("[data-test=hafta-1] [data-test=hafta-testi-1]").count() == 1, f"1. hafta satırı dokununca 7 günü ve testi açtı ({n})")
        shot(pg, f"yol-hafta-1-acik-{sema}", full=False)

        # gün kilidi: 9. gün adresle açılmaz
        for adres in ("#/akis/9", "#/garden/9", "#/prova/9", "#/okuma/9", "#/m1/9/x"):
            pg.goto(base + adres); pg.wait_for_selector("[data-test=gun-kilitli], [data-test=akis], [data-test=garden], [data-test=prova], [data-test=okuma], [data-test=medya]", timeout=15000)
            check(pg.locator("[data-test=gun-kilitli]").count() == 1 and pg.locator("[data-test=bugune-don]").count() == 1, f"{adres}: kilitli gün kapanır, 'Bugüne dön' var")
        shot(pg, f"gun-kilitli-{sema}", full=False)
        pg.goto(base + "#/akis/8"); pg.wait_for_selector("[data-test=akis], [data-test=gun-kilitli]", timeout=20000)
        check(pg.locator("[data-test=akis]").count() == 1, "8. gün (şimdiki) adresle açılır")
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=next-activity]", timeout=15000)
        check(pg.locator("[data-test=hafta-testi-hazir]").count() == 1, "çözülmemiş 1. hafta testi Bugün'de de tek satır")

        # 2. haftanın testi kilitli; 1. haftanın testi baştan sona
        pg.goto(base + "#/hafta/2"); pg.wait_for_selector("[data-test=gun-kilitli], [data-test=hafta-testi]", timeout=15000)
        check(pg.locator("[data-test=gun-kilitli]").count() == 1, "2. hafta bitmeden 2. haftanın testi açılmaz")
        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=hafta-1] .hafta-satir-btn")
        pg.click("[data-test=hafta-1] .hafta-satir-btn"); pg.click("[data-test=hafta-1] [data-test=hafta-testi-1]")
        pg.wait_for_selector("[data-test=hafta-testi]", timeout=15000)
        shot(pg, f"hafta-testi-{sema}", full=False)
        sayac = 0
        while pg.locator("[data-test=hafta-testi]").count() and sayac < 20:
            coz(pg); sayac += 1; pg.wait_for_selector("[data-test=hafta-testi], [data-test=hafta-testi-sonuc]")
        r = pg.evaluate("() => { const s = document.querySelector('[data-test=hafta-testi-sonuc]'); return s ? { d: +s.dataset.dogru, t: +s.dataset.toplam } : null; }")
        check(bool(r) and r["t"] == sayac and r["d"] >= r["t"] - 2, f"1. hafta sonu testi bitti, sonuç ekranı ({r}, {sayac} madde)")
        no_overflow(pg, "hafta sonu testi sonucu")
        shot(pg, f"hafta-testi-sonuc-{sema}", full=False)
        m = pg.evaluate(META, "m1:hafta:1")
        check(bool(m) and m.get("toplam") == sayac, f"sonuç kayda yazıldı (m1:hafta:1 {m})")
        pg.click("[data-test=bugune-don]"); pg.wait_for_selector("[data-test=next-activity]", timeout=15000)
        bugun = pg.evaluate("() => [...document.querySelectorAll('[data-test=yol] section.yolgun')].map((s) => s.dataset.test)")
        check(bugun == ["gun-8"], f"Bugün yalnız bugünün günü ({bugun})")
        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=hafta-1]")
        t = pg.inner_text("[data-test=hafta-1]")
        check(f"test {r['d']}/{r['t']}" in t, f"Yol'da 1. hafta satırı test sonucunu gösterir ({t!r})")
        check(pg.locator("[data-test=hafta-testi-hazir]").count() == 0, "çözülen testin satırı kalktı")
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
