"""
Çok haftalı Yol (PR B-3; PR B 7087645415 md. 1–5, PM-108 B md. 2): e2e fikstürü 8. ve 9. günle (content/tools/fixtures/m1).
1.–7. gün bitmiş öğrenci (ogrenci_devam.tohumla) ile:
  - Yol: 2. hafta açık ("2. HAFTA · GÜN 8"), 1. hafta tek satır "tamam" (dokununca 7 gün), başlık "Yol"; çözülmemiş 1. hafta testi 2. haftanın başında (Yol + Bugün); 8. gün şimdi, 9. gün kilitli
  - yükleme: Yol açılışında yalnız 2. haftanın gün dosyaları istenir (1.–7. gün dosyası yüklenmez)
  - gün kilidi: 9. gün adresle (#/akis/9, #/garden/9, #/prova/9) açılmaz → "henüz kilitli" + "Bugüne dön"; 8. gün açılır
  - hafta sonu testi (1. hafta): Yol'dan açılır, maddeler sırayla, sonuç ekranı, `m1:hafta:1` yazılır, Yol satırında sonuç
  - #243 PM finali takip a: ilk çözüm %80'in altında → "geçtin" yok, zayıf "yapabiliyorum" cümleleri, tek dokunuş tekrar turu,
    "Testi yeniden çöz"; ikinci çözüm geçer, en iyi sonuç kalır. Takip b: üstte "Çöz" satırı dururken açık hafta satırında ikinci
    giriş yok. Takip c: 3. hafta (fikstür 15. gün) kilitli tek satır
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


def yanlis(pg):
    """yazılı maddeyi yanlış cevapla (seçme ve sıralama maddesi doğru çözülür)"""
    if pg.locator("[data-test=drill-pick]").count() or pg.locator("[data-test=drill-order]").count():
        return coz(pg) or False
    pg.fill("[data-test=answer]", "Quatsch quatsch."); pg.click("[data-test=submit]")
    pg.wait_for_selector("[data-test=next], [data-test=claim]")
    pg.locator("[data-test=next]").first.click()
    return True


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
        # 2. haftanın pakette olan günleri (8–14) yüklenir; 1. haftanınki (1–7) ve 3. haftanınki (15+) yüklenmez.
        # Fikstürde yalnız 8–9 var, gerçek 2. hafta gelince 8–14 (PM-127 md. 2.2: iki ağaçta da geçer).
        hafta2 = {f"gun-{g:02d}.json" for g in range(8, 15)}
        check("gun-08.json" in yuklenen and set(yuklenen) <= hafta2, f"Yol açılışında yalnız 2. haftanın gün dosyaları yüklendi ({yuklenen})")
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
        check(n == 7, f"1. hafta satırı dokununca 7 günü açtı ({n})")
        check(pg.locator("[data-test=hafta-1] [data-test=hafta-testi-1]").count() == 0 and pg.locator("[data-test=hafta-testi-1]").count() == 1,
              "üstte 'Çöz' satırı dururken açık hafta satırında aynı teste ikinci giriş yok (takip b)")
        check(pg.get_attribute("[data-test=hafta-testi-hazir] [data-test=hafta-testi-1]", "aria-label") == "İlk Hafta sonu testini çöz", "'Çöz' düğmesinin erişilebilir adı testi söyler")
        k3 = pg.evaluate("() => { const s = document.querySelector('[data-test=hafta-3]'); return s ? { d: s.dataset.durum, t: s.innerText } : null; }")
        check(bool(k3) and k3["d"] == "kilitli" and "önceki hafta bitince açılır" in k3["t"], f"3. hafta kilitli tek satır (takip c; {k3})")
        shot(pg, f"yol-hafta-1-acik-{sema}", full=False)

        # gün kilidi: 9. gün adresle açılmaz
        # GunKapisi her adreste yeniden kurulur (key = adres, önce yükleniyor): bekleme önceki adresin kapısını yakalamasın diye
        # eski kapının ayrılması beklenir (#231'deki WebKit yarışının aynısı; inceleme #243 fark turu)
        def git(adres):
            eski = pg.query_selector("[data-test=gun-kilitli]")
            pg.goto(base + adres)
            if eski: eski.wait_for_element_state("hidden", timeout=15000)
        for adres in ("#/akis/9", "#/garden/9", "#/prova/9", "#/okuma/9", "#/m1/9/x"):
            git(adres); pg.wait_for_selector("[data-test=gun-kilitli], [data-test=akis], [data-test=garden], [data-test=prova], [data-test=okuma], [data-test=medya]", timeout=15000)
            check(pg.locator("[data-test=gun-kilitli]").count() == 1 and pg.locator("[data-test=bugune-don]").count() == 1, f"{adres}: kilitli gün kapanır, 'Bugüne dön' var")
        shot(pg, f"gun-kilitli-{sema}", full=False)
        git("#/akis/8"); pg.wait_for_selector("[data-test=akis], [data-test=gun-kilitli]", timeout=20000)
        check(pg.locator("[data-test=akis]").count() == 1, "8. gün (şimdiki) adresle açılır")
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=next-activity]", timeout=15000)
        check(pg.locator("[data-test=hafta-testi-hazir]").count() == 1, "çözülmemiş 1. hafta testi Bugün'de de tek satır")

        # 2. haftanın testi kilitli; 1. haftanın testi baştan sona
        pg.goto(base + "#/hafta/2"); pg.wait_for_selector("[data-test=gun-kilitli], [data-test=hafta-testi]", timeout=15000)
        check(pg.locator("[data-test=gun-kilitli]").count() == 1, "2. hafta bitmeden 2. haftanın testi açılmaz")
        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=hafta-testi-hazir] [data-test=hafta-testi-1]")
        pg.click("[data-test=hafta-testi-hazir] [data-test=hafta-testi-1]")
        pg.wait_for_selector("[data-test=hafta-testi]", timeout=15000)
        shot(pg, f"hafta-testi-{sema}", full=False)

        # düşük sonuç yolu (takip a): ilk dört yazılı madde yanlış
        sayac = yanlisN = 0
        while pg.locator("[data-test=hafta-testi]").count() and sayac < 20:
            if yanlisN < 4:
                if yanlis(pg): yanlisN += 1
            else:
                coz(pg)
            sayac += 1; pg.wait_for_selector("[data-test=hafta-testi], [data-test=hafta-testi-sonuc]")
        d0 = pg.evaluate("""() => { const s = document.querySelector('[data-test=hafta-testi-sonuc]');
          return s ? { d: +s.dataset.dogru, t: +s.dataset.toplam, g: s.dataset.gecti, metin: s.innerText, z: [...s.querySelectorAll('[data-test^=zayif-]')].map((x) => x.dataset.test) } : null; }""")
        check(bool(d0) and d0["g"] == "0" and d0["d"] / d0["t"] < 0.8, f"ilk çözüm %80'in altında ({d0 and (d0['d'], d0['t'])})")
        check(bool(d0) and "kullanabiliyorsun" not in d0["metin"] and "zorlandın" in d0["metin"], "düşük sonuçta 'geçtin' denmez; zorlanılan cümleler söylenir")
        zgun = [x for x in (d0 or {}).get("z", []) if x[len("zayif-"):].isdigit()]
        check(len(zgun) >= 1 and pg.locator("[data-test=zayif-tekrar]").count() == 1, f"zayıf 'yapabiliyorum' cümleleri listelendi, tek düğme tekrar ({zgun})")
        no_overflow(pg, "hafta sonu testi düşük sonuç")
        shot(pg, f"hafta-testi-dusuk-{sema}", full=False)
        m0 = pg.evaluate(META, "m1:hafta:1")
        check(bool(m0) and m0.get("dogru") == d0["d"], f"düşük sonuç da kaydedilir, öğrenci kilitlenmez ({m0})")
        # son çözüm cihazda (P2-2): yeniden yüklense de zayıf liste gelir; Yol'daki düşük sonuç satırı sonuca gider
        pg.goto(base + "#/yol"); pg.reload(); pg.wait_for_selector("[data-test=hafta-1] .hafta-satir-btn", timeout=20000)
        pg.click("[data-test=hafta-1] .hafta-satir-btn")
        check(pg.get_attribute("[data-test=hafta-1] [data-test=hafta-testi-1]", "href") == "#/hafta/1/sonuc", "düşük sonuçta Yol'daki test satırı son sonuca gider")
        pg.click("[data-test=hafta-1] [data-test=hafta-testi-1]"); pg.wait_for_selector("[data-test=hafta-testi-sonuc]", timeout=15000)
        z2 = pg.evaluate("() => [...document.querySelectorAll('[data-test=zayif-liste] li')].map((x) => 'zayif-' + x.dataset.gun)")
        check(z2 == zgun, f"yeniden açılınca aynı zayıf cümleler ({z2})")
        ilk = zgun[0][len("zayif-"):]
        check(pg.get_attribute(f"[data-test=zayif-tekrar-{ilk}]", "href") == f"#/hafta/1/tekrar/{ilk}", "tek satır yalnız kendi gününün tekrarına gider")
        pg.click(f"[data-test=zayif-tekrar-{ilk}]"); pg.wait_for_selector("[data-test=hafta-tekrar]", timeout=15000)
        check(pg.get_attribute("[data-test=hafta-tekrar]", "data-gun") == ilk, "tek satırın tekrarı o günden")
        check(pg.locator("[data-test=hafta-tekrar] a[href='#/hafta/1/sonuc']").count() >= 1, "tekrarın geri oku sonuca döner, test baştan başlamaz (P2-1)")
        pg.goto(base + "#/hafta/1/sonuc")
        pg.wait_for_selector("[data-test=hafta-testi-sonuc]", timeout=15000)
        # adresle kilitli güne tekrar girilmez (P2-5)
        pg.goto(base + "#/hafta/2/tekrar/9"); pg.wait_for_selector("[data-test=hafta-tekrar-bos], [data-test=hafta-tekrar]", timeout=15000)
        check(pg.locator("[data-test=hafta-tekrar-bos]").count() == 1, "#/hafta/2/tekrar/9: kilitli günün tekrarı açılmaz")
        pg.goto(base + "#/hafta/1/sonuc"); pg.wait_for_selector("[data-test=zayif-tekrar]", timeout=15000)
        href = pg.get_attribute("[data-test=zayif-tekrar]", "href") or ""
        check(href == "#/hafta/1/tekrar/" + ",".join(x[len("zayif-"):] for x in zgun), f"tekrar düğmesi bütün zayıf günlere gider ({href})")
        pg.click("[data-test=zayif-tekrar]"); pg.wait_for_selector("[data-test=hafta-tekrar]", timeout=15000)
        gunler_ = set()
        shot(pg, f"hafta-tekrar-{sema}", full=False)
        t = cumlesiz = 0
        while pg.locator("[data-test=hafta-tekrar]").count() and t < 30:
            gunler_.add(pg.get_attribute("[data-test=hafta-tekrar]", "data-gun"))
            cumlesiz += pg.locator("[data-test=tekrar-cumle]").count() != 1
            coz(pg); t += 1; pg.wait_for_selector("[data-test=hafta-tekrar], [data-test=hafta-tekrar-sonuc]")
        check(pg.locator("[data-test=hafta-tekrar-sonuc]").count() == 1 and sorted(gunler_) == sorted(x[len("zayif-"):] for x in zgun) and 1 <= t <= 4 * len(zgun),
              f"tekrar turu zayıf günlerin gün sınavından ({t} madde, günler {sorted(gunler_)})")
        check(cumlesiz == 0, "her tekrar maddesinin üstünde günün 'yapabiliyorum' cümlesi")
        shot(pg, f"hafta-tekrar-sonuc-{sema}", full=False)
        pg.click("[data-test=hafta-tekrar-sonuc] [data-test=testi-yeniden]"); pg.wait_for_selector("[data-test=hafta-testi]", timeout=15000)
        sayac = 0
        while pg.locator("[data-test=hafta-testi]").count() and sayac < 20:
            coz(pg); sayac += 1; pg.wait_for_selector("[data-test=hafta-testi], [data-test=hafta-testi-sonuc]")
        r = pg.evaluate("() => { const s = document.querySelector('[data-test=hafta-testi-sonuc]'); return s ? { d: +s.dataset.dogru, t: +s.dataset.toplam } : null; }")
        check(bool(r) and r["t"] == sayac and r["d"] >= r["t"] - 2, f"1. hafta sonu testi bitti, sonuç ekranı ({r}, {sayac} madde)")
        check(pg.get_attribute("[data-test=hafta-testi-sonuc]", "data-gecti") == "1" and pg.locator("[data-test=zayif-liste]").count() == 0, "ikinci çözüm geçti: zayıf liste yok")
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
