"""
Akış sürekliliği (PM-148 [ANA-T] md. 2; DENETİM-1 P1-4, P1-5, P1-7, P1-13; #275 P2-6). 1. gün (akış günü):
  - D1-5: Bugün'de BAŞLA ilk durağın (Sesler) düğümünde; gün bandında "Bugünün akışı Sesler ile başlar"; BAŞLA akışı açar
  - akış → ses durağı → ses ekranında günün çubuğu "Bugün · durak 1/N" (P2-6)
  - ses ilk turu biter, akışa dönülür → X → Bugün: ses düğümlerinde ✓, BAŞLA Bahçe düğümünde, "Kaldığın yer: … · durak 2/N" (D1-4)
  - D1-7: son halka Bahçe anahtarını yazmış olsa da BAŞLA eski derse değil akışa gider
  - D1-13: Yol düğümünün adında "Seans N" yok
python3 tests/e2e/v2_sureklilik.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4272
META = """async ([k, v]) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  if (v === undefined) { const r = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get(k); t.onsuccess = () => ok(t.result && t.result.value); }); d.close(); return r; }
  await new Promise((ok) => { const t = d.transaction('meta', 'readwrite'); t.objectStore('meta').put({ key: k, value: v }); t.oncomplete = ok; }); d.close(); return true; }"""


def basla(pg):
    """Bugün'deki BAŞLA: düğümün türü, kimliği, adresi; gün bandının satırı"""
    pg.wait_for_selector("[data-test=m1-devam]", timeout=15000)
    return pg.evaluate("""() => { const a = document.querySelector('[data-test=m1-devam]'); const li = a.closest('[data-test=adim]');
      return { tur: li.dataset.tur, id: li.dataset.id, href: a.getAttribute('href'), konum: document.querySelector('[data-test=akis-konum]')?.textContent || '',
        adlar: [...document.querySelectorAll('[data-test=adim] .dugum')].map((x) => x.getAttribute('aria-label') || '') }; }""")


def main():
    serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        s = basla(pg)
        check(s["tur"] == "medya" and s["href"] == "#/akis/1", f"D1-5: BAŞLA ilk durağın (ses) düğümünde ve akışı açıyor ({s['tur']}, {s['href']})")
        check("Sesler" in s["konum"] and "başlar" in s["konum"], f"gün bandı: 'Bugünün akışı Sesler ile başlar' ({s['konum']!r})")
        check(not any("Seans " in x for x in s["adlar"]), "D1-13: düğüm adlarında 'Seans N' yok")
        no_overflow(pg, "Bugün"); pg.wait_for_timeout(3500); shot(pg, f"sureklilik-1-bugun-{sema}", full=False)
        pg.click("[data-test=m1-devam]"); pg.wait_for_selector("[data-test=akis-durak-gecis]", timeout=20000)
        check(pg.get_attribute("[data-test=akis]", "data-durak").endswith(":ses"), "BAŞLA'nın açtığı ilk durak Sesler (gösterilen yerle aynı)")
        pg.click("[data-test=akis-durak-basla]"); pg.wait_for_selector("[data-test=medya]", timeout=15000)
        iz = pg.inner_text("[data-test=gun-izi]") if pg.locator("[data-test=gun-izi]").count() else ""
        check(iz.startswith("Bugün · durak 1/"), f"P2-6: akıştan açılan ses ekranında günün çubuğu ({iz!r})")
        no_overflow(pg, "ses durağı"); shot(pg, f"sureklilik-2-ses-{sema}", full=False)
        # ses ilk turu biter (her kaydın ilk tur anahtarı); akışa dönülür, akış kendiliğinden ilerler
        kayit = pg.evaluate(META, ["akis:1"])
        n = len(kayit["plan"]["duraklar"])
        # ses kimlikleri durak geçişinin hedefinden ve Bugün'ün düğümlerinden
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=m1-devam]")
        ses_id = pg.evaluate("""() => [...document.querySelectorAll('[data-test=adim][data-tur=medya][data-alt=ses]')].map((x) => x.dataset.id)""")
        video_id = pg.evaluate("""() => [...document.querySelectorAll('[data-test=adim][data-tur=medya][data-alt=video]')].map((x) => x.dataset.id)""")
        for i in ses_id: pg.evaluate(META, [f"m1:medya:{i}:1", {"bitti": "2026-12-01T08:00:00Z", "ilkBitti": "2026-12-01T08:00:00Z"}])
        pg.goto(base + "#/akis/1"); pg.wait_for_selector("[data-test=akis]", timeout=20000)
        k2 = pg.evaluate(META, ["akis:1"])
        check(k2["durak"] >= 1, f"ses ilk turu bitince akış sıradaki durağa geçti (durak {k2['durak']})")
        pg.click("[data-test=akis-cik]"); pg.wait_for_selector("[data-test=m1-devam]", timeout=15000)
        s2 = basla(pg)
        tamam = pg.evaluate("""() => [...document.querySelectorAll('[data-test=adim][data-alt=ses]')].filter((x) => x.dataset.akisTamam === '1' && x.querySelector('.dugum-onay')).length""")
        check(len(ses_id) >= 1 and tamam == len(ses_id), f"D1-4: ses ilk turu bitince Bugün'de ses düğümlerinde ✓ ({tamam}/{len(ses_id)})")
        sira = pg.evaluate("""() => [...document.querySelectorAll('[data-test=gun-1] [data-test=adim]')].map((x) => x.dataset.tur)""")
        check(sira[:len(ses_id)] == ["medya"] * len(ses_id) and sira[len(ses_id)] == "bahce", f"düğümler akışın sırasıyla: önce sesler, sonra Bahçe ({sira})")
        check(s2["tur"] == "bahce" and s2["href"] == "#/akis/1", f"D1-4: BAŞLA bir sonraki durağın (Bahçe) düğümüne geçti, akışı açıyor ({s2['tur']}, {s2['href']})")
        check("Kaldığın yer" in s2["konum"] and f"durak {k2['durak'] + 1}/{n}" in s2["konum"], f"gün bandı: 'Kaldığın yer: … · durak k/N' ({s2['konum']!r})")
        no_overflow(pg, "Bugün (sonra)"); pg.wait_for_timeout(3500); shot(pg, f"sureklilik-3-bugun-sonra-{sema}", full=False)
        # D1-7: Bahçe anahtarı yazılmış (son halka bitmiş) — BAŞLA yine akış, eski ders değil
        pg.evaluate(META, ["m1:bahce:1", "2026-12-01T08:00:00Z"])
        pg.reload(); s3 = basla(pg)
        check(s3["href"] == "#/akis/1" and s3["tur"] != "ders", f"D1-7: Bahçe bittikten sonra BAŞLA eski derse değil akışa ({s3['tur']}, {s3['href']})")
        # #282 P1-2: gün sonu durağında BAŞLA yolun "Gün sonu" ucunda, akışı açar
        k3 = pg.evaluate(META, ["akis:1"])
        k3["durak"] = next(i for i, d in enumerate(k3["plan"]["duraklar"]) if d["tur"] == "gunsonu"); k3["adim"] = 0
        pg.evaluate(META, ["akis:1", k3]); pg.reload(); pg.wait_for_selector("[data-test=m1-devam]", timeout=15000)
        uc = pg.evaluate("""() => { const a = document.querySelector('[data-test=m1-devam]'); return { son: !!a.closest('li.son'), href: a.getAttribute('href'), konum: document.querySelector('[data-test=akis-konum]')?.textContent || '' }; }""")
        check(uc["son"] and uc["href"] == "#/akis/1" and "Gün sonu" in uc["konum"], f"gün sonu durağında BAŞLA yolun 'Gün sonu' ucunda ({uc})")
        # P2-7 (#275): Köy → günün kayıtları → kayıt (bitmiş) → "Sıradaki adım" günün kayıtlarına döner, Bugün sekmesine taşımaz
        sid = (video_id or ses_id)[0]
        pg.evaluate(META, [f"m1:medya:{sid}", {"b": 0, "s": 0, "k": 0, "dogru": 0, "toplam": 0, "bitti": True, "ilkBitti": True}])
        pg.goto(base + "#/koy"); pg.wait_for_selector("[data-tab=koy]")
        pg.goto(base + "#/m1/1"); pg.wait_for_selector(f'a[href^="#/m1/1/"]', timeout=15000)
        pg.click(f'a[href="#/m1/1/{sid.replace(":", "%3A")}"]'); pg.wait_for_selector("[data-test=medya-bitti]", timeout=15000)
        h = pg.get_attribute("[data-test=medya-sonraki]", "href")
        check(h == "#/m1/1" and pg.locator("[data-test=medya-geri]").count() == 0, f"P2-7: Köy'den açılan kaydın 'Sıradaki adım'ı günün kayıtlarına ({h}); 'Güne dön' tekrarlanmıyor")
        b.close()
    finish()


if __name__ == "__main__":
    main()
