"""
B12 3. parça: seçilmiş açık fotoğraf (content/v2/media/foto/acik.json → paket foto.json) kartta atıfla görünür.
  - foto.json yönlendirmeyle 1. günün ilk kartına ("der Montag") bir kayıt verir; görsel isteği sahte JPEG'le cevaplanır
  - tanıtım kartında fotoğraf `data-kaynak=secim`, altında yazar ve lisans (Pexels yazmaz)
  - medya dalının fotoğrafı yerel yoldan (content/<sürüm>/media/<ad>) gelir (PM 7055725467 md. 4)
  - kayıt yoksa (boş foto.json) fotoğraf alanı yok (sunucu yapılandırılmamış e2e'de arama da yok)
python3 tests/e2e/v2_foto.py [--browser webkit] [--device "iPhone 15"]
"""
import base64, json, os
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, raf_bagla, RAF_PAROLA

PORT = 4214
JPEG = base64.b64decode("/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/yQALCAABAAEBAREA/8wABgAQEAX/2gAIAQEAAD8A0s8g/9k=")
KAYIT = {"lx:Montag#kart": {"src": "https://foto.example/montag.jpg", "sinif": "acik", "yazar": "Örnek Yazar, çok uzun bir yazar adı ki satıra sığmasın diye uzatıldı", "lisans": "CC BY 2.0", "lisans_url": "https://creativecommons.org/licenses/by/2.0", "sayfa": "https://commons.wikimedia.org/wiki/File:X.jpg"}}

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        for dolu in (True, False, "bozuk"):
            b, ctx = launch(p); pg = new_page(ctx)
            pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": KAYIT if dolu else {}})))
            pg.route("https://foto.example/**", (lambda r: r.fulfill(status=404, body="")) if dolu == "bozuk" else (lambda r: r.fulfill(status=200, content_type="image/jpeg", body=JPEG)))
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro]")
            if dolu == "bozuk":
                pg.wait_for_timeout(1200)
                check(pg.locator("[data-test=garden-intro] [data-test=foto]").count() == 0, "fotoğraf yüklenemezse alan kalkar (altyazı tek başına kalmaz)")
            elif dolu:
                pg.wait_for_selector("[data-test=garden-intro] [data-test=foto]")
                f = pg.locator("[data-test=garden-intro] [data-test=foto]")
                cap = f.inner_text()
                check(f.get_attribute("data-kaynak") == "secim" and "Örnek Yazar" in cap and "CC BY 2.0" in cap and "Pexels" not in cap, f"seçilmiş açık fotoğraf atıfla ({cap!r})")
                hrefs = f.locator("figcaption a").evaluate_all("(xs) => xs.map((x) => x.href)")
                check(any("commons.wikimedia.org" in h for h in hrefs) and any("creativecommons.org" in h for h in hrefs), f"atıfta kaynak sayfa ve lisans bağlantısı ({hrefs})")
                check(bool(f.locator("img").get_attribute("alt")), "fotoğrafta Türkçe alt metin")
                h = f.locator("[data-test=foto-atif]").evaluate("(e) => { const r = e.getBoundingClientRect(); return [Math.round(r.height), parseFloat(getComputedStyle(e).lineHeight) || 16]; }")
                check(h[0] <= h[1] * 1.3 and cap.startswith("Fotoğraf:"), f"atıf tek satır, 'Fotoğraf:' ({h}; PM 7022084920)")
            else:
                pg.wait_for_timeout(800)
                check(pg.locator("[data-test=garden-intro] [data-test=foto]").count() == 0, "kayıt yoksa fotoğraf alanı yok")
            b.close()
        # #137 P2-2: "Fotoğraftaki ne?" sorusunda seçilmiş fotoğraf görünür; P2-1: görsel yüklenemezse başlık fotoğrafsız biçime döner
        for bozuk in (False, True):
            b, ctx = launch(p); pg = new_page(ctx)
            pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": KAYIT})))
            pg.route("https://foto.example/**", (lambda r: r.fulfill(status=404, body="")) if bozuk else (lambda r: r.fulfill(status=200, content_type="image/jpeg", body=JPEG)))
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            pg.evaluate("() => { sessionStorage.setItem('e2e-kart', 'lx:Montag'); sessionStorage.setItem('e2e-tur', 'photo_say'); }")
            pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=gq-photo_say]")
            if bozuk:
                try: pg.wait_for_function("() => /^Almanca söyle ya da yaz$/.test(document.querySelector('[data-test=foto-soru-baslik]')?.textContent || '')", timeout=8000)
                except Exception: pass
                bas = pg.text_content("[data-test=foto-soru-baslik]")
                ipucu = pg.text_content("[data-test=gq-photo_say] .de-lg") if pg.locator("[data-test=gq-photo_say] .de-lg").count() else ""
                check(pg.locator("[data-test=gq-photo_say] [data-test=foto]").count() == 0 and bas == "Almanca söyle ya da yaz" and "(der, die ya da das ile)" in ipucu,
                      f"görsel yüklenemezse soru Türkçe → Almanca biçiminde ({bas!r}, {ipucu!r})")
            else:
                pg.wait_for_selector("[data-test=gq-photo_say] [data-test=foto]")
                f = pg.locator("[data-test=gq-photo_say] [data-test=foto]")
                bas = pg.text_content("[data-test=foto-soru-baslik]")
                check(f.get_attribute("data-kaynak") == "secim" and "Fotoğraftaki ne?" in bas, f"soruda seçilmiş fotoğraf, başlık 'Fotoğraftaki ne?' ({f.get_attribute('data-kaynak')}, {bas!r})")
            b.close()
        # PM 7055725467 md. 4: medya dalının fotoğrafı pakette, yerel yoldan (content/<sürüm>/media/<ad>); şema göreli yolu kabul eder
        b, ctx = launch(p); pg = new_page(ctx)
        yerel = {"lx:Montag#kart": {**KAYIT["lx:Montag#kart"], "src": "content/e2eyerel/media/montag.jpg"}}
        pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": yerel})))
        pg.route("**/content/e2eyerel/media/montag.jpg", lambda r: r.fulfill(status=200, content_type="image/jpeg", body=JPEG))
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro]")
        try: pg.wait_for_selector("[data-test=garden-intro] [data-test=foto] img", timeout=8000)
        except Exception: pass
        f = pg.locator("[data-test=garden-intro] [data-test=foto]")
        src = f.locator("img").get_attribute("src") if f.count() else None
        check(f.count() == 1 and f.get_attribute("data-kaynak") == "secim" and (src or "").endswith("content/e2eyerel/media/montag.jpg"), f"yerel yollu açık fotoğraf kartta ({src})")
        b.close()
        # PM 7088230583 md. 3: raf açıkken kartın fotoğrafı önce raftan (kayit.json → kart["lx:X#kart"].dosya; anahtarla, blob:),
        # atıf rafın; raf dosyası gelmezse açık fotoğraf; raf ulaşılamazsa (önbellek boş) açık fotoğraf, ekran beklemez
        for durum in ("raf", "dosya-yok", "raf-yok"):
            b, ctx = launch(p); pg = new_page(ctx)
            pg.route("**/foto.json", lambda r: r.fulfill(status=200, content_type="application/json", body=json.dumps({"surum": 1, "foto": KAYIT})))
            pg.route("https://foto.example/**", lambda r: r.fulfill(status=200, content_type="image/jpeg", body=JPEG))
            yetkiler = []
            def raf(r, _istek=None, durum=durum):   # Playwright işleyiciye (route, request) verir
                yetkiler.append(r.request.headers.get("authorization"))
                if durum == "raf-yok": return r.abort()
                if r.request.url.endswith("/saglik.txt"):
                    return r.fulfill(status=200, headers={"Access-Control-Allow-Origin": "*", "Access-Control-Expose-Headers": "X-Raf", "X-Raf": "1"}, body="ok")
                if r.request.url.endswith("/kayit.json"):
                    return r.fulfill(status=200, content_type="application/json", headers={"Access-Control-Allow-Origin": "*"}, body=json.dumps({"surum": 1, "kart": {"lx:Montag#kart": {"dosya": "foto/m.jpg", "yazar": "Raf Yazarı", "lisans": "Pixabay İçerik Lisansı", "sayfa": "https://raf-kaynak.example/1", "sinif": "kapali"}}}))
                if durum == "dosya-yok": return r.fulfill(status=404, headers={"Access-Control-Allow-Origin": "*"}, body="")
                return r.fulfill(status=200, content_type="image/jpeg", headers={"Access-Control-Allow-Origin": "*"}, body=JPEG)
            rafk = f"https://raf-{durum}.test"   # her durumun kendi adresi: önbellek anahtarları karışmasın
            pg.route(f"{rafk}/**", raf)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            d = raf_bagla(pg, base, rafk)
            satir = pg.inner_text("[data-test=raf-durum]")
            if durum == "raf-yok": check(d == "ulasilamiyor", f"raf-yok: Profil 'Ulaşılamıyor' ({d})")
            else: check(d == "bagli" and "Rafta 1 kelimenin fotoğrafı var." in satir, f"{durum}: Profil 'Bağlandı' + kelime fotoğrafı sayısı ({satir!r})")
            pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro]")
            try: pg.wait_for_selector("[data-test=garden-intro] [data-test=foto] img", timeout=8000)
            except Exception: pass
            f = pg.locator("[data-test=garden-intro] [data-test=foto]")
            src = f.locator("img").get_attribute("src") if f.count() else None
            cap = f.inner_text() if f.count() else ""
            if durum == "raf":
                check(f.get_attribute("data-kaynak") == "raf" and (src or "").startswith("blob:") and "Raf Yazarı" in cap and "Pixabay İçerik Lisansı" in cap and cap.startswith("Fotoğraf:"),
                      f"raf açık: kartın fotoğrafı raftan, atıf rafın ({f.get_attribute('data-kaynak') if f.count() else None}, {src}, {cap!r})")
                check(yetkiler and all(y == f"Bearer {RAF_PAROLA}" for y in yetkiler), f"raf istekleri parolayla ({len(yetkiler)})")
                # çevrimdışı: raf ulaşılamazken bir kez görülen fotoğraf ve kayıt kapalı önbellekten
                pg.unroute(f"{rafk}/**"); pg.route(f"{rafk}/**", lambda r: r.abort())
                pg.goto(base + "#/today"); pg.reload()
                pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro]")
                try: pg.wait_for_selector("[data-test=garden-intro] [data-test=foto] img", timeout=8000)
                except Exception: pass
                f = pg.locator("[data-test=garden-intro] [data-test=foto]")
                src = f.locator("img").get_attribute("src") if f.count() else None
                check(f.count() == 1 and f.get_attribute("data-kaynak") == "raf" and (src or "").startswith("blob:"), f"raf ulaşılamazken görülmüş fotoğraf önbellekten ({src})")
            else:
                check(f.count() == 1 and f.get_attribute("data-kaynak") == "secim" and (src or "").startswith("https://foto.example/") and "Örnek Yazar" in cap,
                      f"{durum}: açık fotoğrafa düştü, atıf açık kaydın ({src}, {cap[:40]!r})")
            b.close()
        # inceleme #150 P2: artikel sorusu başlığı büyük harfte "DIE" (Almanca kısım lang="de"; Türkçe yerelde "DİE" olmaz)
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.evaluate("() => { sessionStorage.setItem('e2e-kart', 'lx:Montag'); sessionStorage.setItem('e2e-tur', 'article'); }")
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=gq-article]")
        bas = pg.inner_text("[data-test=gq-article] .kicker")
        check("DIE" in bas and "DİE" not in bas, f"artikel sorusu başlığı büyük harfte 'DIE' ({bas!r})")
        b.close()
        # gerçek Releases fotoğrafı uygulamanın kökeninde (CSP dahil) çiziliyor mu (inceleme #121 P1-4); ağ yalnızca CI'da kesin
        b, ctx = launch(p); pg = new_page(ctx); login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        w = pg.evaluate("""async () => { const v = (await (await fetch('content/current.json')).json()).version;
          const f = (await (await fetch(`content/${v}/foto.json`)).json()).foto; const src = Object.values(f)[0].src;
          return await new Promise((ok) => { const i = new Image(); i.onload = () => ok(i.naturalWidth); i.onerror = () => ok(-1); i.src = src; setTimeout(() => ok(-2), 15000); }); }""")
        if os.environ.get("CI"): check(w > 0, f"gerçek Releases fotoğrafı çiziliyor (genişlik {w})")
        else: print(f"  (yerel: gerçek fotoğraf denemesi {w}; ağ kısıtlı olabilir, yalnızca CI'da denetlenir)")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
