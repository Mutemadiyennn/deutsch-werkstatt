"""
PM-061 / D-112 (#58 B12) — kapalı medya rafı, uygulama tarafı (sahte raf sunucusuyla; gerçek adres ve anahtar yok):
  - Profil → Medya rafı: adres ve anahtar girilir; "Kaydet ve rafı sına" → bağlandı / anahtar yanlış / ulaşılamıyor
  - anahtar yalnızca cihazda: yedek dosyasına girmez; sahte raf yanlış anahtarda 404
  - Sil → açık kaynaklı medya kipi
python3 tests/e2e/v2_raf.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import os, subprocess, time
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow, bekle_kosul

PORT = 4207
RAF_PORT = 4208
RAF = "https://raf.test"          # raf: Playwright yönlendirmesiyle gerçek Function'a (CSP: connect-src https:)
ANAHTAR = "sahte-test-anahtari-0123456789abcdef-0123456789"

def raf_baslat():
    """Gerçek D-112 Function'ı (worker/src/raf.ts) önünde Node sunucusu; CORS, 404 ve 1,2 sn gecikme onun"""
    yol = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raf_sunucu.mjs")
    p = subprocess.Popen(["node", "--experimental-strip-types", "--no-warnings", yol, str(RAF_PORT), ANAHTAR, f"http://127.0.0.1:{PORT}"], stdout=subprocess.PIPE, text=True)
    assert p.stdout.readline().strip() == "hazir", "raf sunucusu açılmadı"
    return p

def raf(route):
    """https://raf.test/... → yerel gerçek Function; yanıt (CORS başlıkları dahil) olduğu gibi tarayıcıya"""
    yol = route.request.url[len(RAF):]
    route.fulfill(response=route.fetch(url=f"http://127.0.0.1:{RAF_PORT}{yol}"))

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"; rafp = raf_baslat()
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        pg.route(f"{RAF}/**", raf); pg.route("https://raf-yok.test/**", lambda r: r.abort())
        giden = []   # yetki başlığı taşıyan her istek (anahtar yalnızca rafa gitmeli; inceleme #98 P1-1)
        pg.on("request", lambda r: giden.append(r.url) if "authorization" in {k.lower() for k in r.headers} else None)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/profile"); pg.wait_for_selector("[data-test=medya-rafi][data-hazir='1']")
        check(pg.locator("[data-test=raf-durum][role=status]").count() == 1, "durum satırı baştan canlı bölge (VoiceOver sonucu okur)")
        def sina(adres, anahtar):
            pg.fill("[data-test=raf-adres]", adres); pg.fill("[data-test=raf-anahtar]", anahtar)
            pg.click("[data-test=raf-sina]"); pg.wait_for_selector("[data-test=raf-durum][data-durum]", timeout=15000)
            pg.wait_for_selector("[data-test=raf-sina]:not([disabled])", timeout=15000)
            return pg.get_attribute("[data-test=raf-durum]", "data-durum")
        check(sina("raf.test", ANAHTAR) == "adres-gecersiz", "şemasız adres: kaydedilmedi, 'https:// ile başlamalı'")
        check(giden == [], f"şemasız adreste anahtar hiçbir yere gitmedi ({giden})")
        t0 = time.monotonic()
        check(sina(RAF, "kisa-parola") == "parola-kisa", "32 karakterden kısa parola girerken söylenir, istek gitmez (PM 7020257764)")
        check(sina(RAF, "yanlis-anahtar-0123456789abcdef-0123456789") == "anahtar-yanlis", "yanlış parola: 'Parola yanlış' (gerçek Function 404)")
        check(time.monotonic() - t0 >= 1.2, f"yanlış anahtarda sabit gecikme ({time.monotonic() - t0:.2f} sn ≥ 1,2)")
        check(sina("https://raf-yok.test", ANAHTAR) == "ulasilamiyor", "kapalı adres: 'Ulaşılamıyor'")
        check(sina(RAF + "/", ANAHTAR) == "bagli", "doğru anahtar: 'Bağlandı' (gerçek Function, CORS dahil; sondaki / sorun değil)")
        check(giden and all(u.startswith((RAF + "/", "https://raf-yok.test/")) for u in giden), f"anahtar yalnızca girilen raf adreslerine gitti, uygulama sunucusuna hiç ({len(giden)} istek)")
        foto = pg.evaluate("""async () => { const r = await fetch('https://raf.test/foto/deneme.jpg', { headers: { Authorization: 'Bearer """ + ANAHTAR + """' } });
          return [r.status, r.headers.get('cache-control'), await r.text()]; }""")
        check(foto[0] == 200 and (foto[1] or "").startswith("private") and foto[2] == "JPEG", f"kapalı dosya anahtarla geliyor, özel önbellek ({foto[:2]})")
        no_overflow(pg, "Profil medya rafı")
        if shots: pg.locator("[data-test=medya-rafi]").scroll_into_view_if_needed(); shot(pg, "r01-raf-bagli", full=False)
        # kalıcı ve yalnızca cihazda: yenileyince alanlar dolu; yedek dosyasında anahtar yok
        pg.reload(); pg.wait_for_selector("[data-test=medya-rafi][data-hazir='1']")
        pg.wait_for_function("() => document.querySelector('[data-test=raf-anahtar]').value.length > 0", timeout=5000)
        check(pg.input_value("[data-test=raf-adres]") == RAF, "adres cihazda kaldı (sondaki / temizlendi)")
        check("anahtar" not in pg.inner_text("[data-test=medya-rafi]").lower(), "öğrenci metninde geliştirici sözcüğü 'anahtar' yok (PM-035/8; 'parola')")
        # tek alan boşken "Kaydet ve rafı sına" kayıtlı ayarı silmez (inceleme #98 2. tur)
        pg.fill("[data-test=raf-adres]", ""); pg.click("[data-test=raf-sina]"); pg.wait_for_selector("[data-test=raf-durum][data-durum=eksik]")
        pg.reload(); pg.wait_for_selector("[data-test=medya-rafi][data-hazir='1']")
        check(pg.input_value("[data-test=raf-adres]") == RAF, "tek alan boşken kayıt silinmedi ('ikisi de gerekli')")
        with pg.expect_download() as d:
            pg.click("text=Yedeği indir (JSON)")
        yedek = open(d.value.path(), encoding="utf-8").read()
        check(ANAHTAR not in yedek and "raf.test" not in yedek, "yedek dosyasında raf adresi ve anahtarı yok")
        pg.click("[data-test=raf-sil]"); pg.wait_for_selector("[data-test=raf-sil]", state="detached")
        check(bekle_kosul(pg, """async () => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
          const v = await new Promise((ok) => { const g = d.transaction('meta').objectStore('meta').get('raf'); g.onsuccess = () => ok(g.result); }); d.close(); return v === undefined; }"""), "Sil: raf kaydı veritabanından kalktı")
        pg.reload(); pg.wait_for_selector("[data-test=medya-rafi][data-hazir='1']")
        check(pg.input_value("[data-test=raf-anahtar]") == "", "Sil: anahtar cihazdan kalktı (açık kaynak kipi)")
        b.close()
    srv.shutdown(); rafp.terminate()
    finish()

if __name__ == "__main__":
    main()
