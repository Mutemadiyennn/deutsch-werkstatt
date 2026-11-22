"""
DN-2 §4 (PM-030) — yükleme bütçesi:
  ilk açılış ≤ 2 sn · ekran geçişi ≤ 300 ms · hiçbir yükleme göstergesi 10 sn'den uzun kalmaz (takılırsa hata + "Tekrar dene").
  python3 tests/e2e/yukleme.py [--browser webkit] [--device "iPhone 15"]
CI makinesi gerçek iPhone değildir; sınırlar bu yüzden CI için de geçerli üst sınırdır (gerçek cihaz kontrol listesi ayrıca).
"""
import time
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish

PORT = 4188
SC = "sc:telefon:01-arzttermin"

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        # 1) ilk açılış (önbelleksiz yeni bağlam): ilk anlamlı ekran
        b, ctx = launch(p); pg = new_page(ctx)
        t0 = time.time(); pg.goto(base); pg.wait_for_selector("main h1, main h2, [data-tab]"); first = (time.time() - t0) * 1000
        check(first <= 2000, f"ilk açılış {first:.0f} ms (≤ 2000)")
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        # 2) ekran geçişi (sekmeler, içerik önbellekte)
        # her hedefin seçicisi yalnızca o ekranda var (önceki ekranda eşleşip sahte geçiş vermesin). Süre sayfanın içinde
        # ölçülür: dokunuştan hedef içeriğin DOM'a girişine (dom) ve çizildiği ilk kareye (kare) kadar; Playwright'ın
        # tıklama hazırlığı ve süreçler arası gecikme sayılmaz
        # Hedef 3 sekmeleri (PM-084 md. 3): Köy, Ben, Yol, Bugün. Yol'un haritası Bugün'de de (yalnız bugünle) çizilir; Yol'a özgü
        # işaret, başlığın hemen altındaki haritadır. Ayarlar artık sekme değil: Ben'deki "Ayarlar" düğmesinden açılır, aynı bütçeyle ölçülür.
        # her satır: (ad, dokunulan öğe, hedef ekranın işareti, ölçümden önce durulan sekme)
        TABS = [("koy", "[data-tab=koy]", "[data-test=koy]", "today"), ("ben", "[data-tab=ben]", "[data-test=panel-focus]", "today"),
                ("yol", "[data-tab=yol]", ".topbar + [data-test=yol]", "koy"), ("ayarlar", "[data-test=ayarlar-ac]", "[data-test=goal]", "ben"),
                ("today", "[data-tab=today]", "[data-test=next-activity]", "koy")]
        # Kapı (PM-044.7, D-096): her sekme için 5 geçiş; DOM'a giriş sert sınır (≤300 ms, her geçiş), ilk kare 5 geçişin
        # ORTANCASI ≤300 ms (paylaşılan CI koşucusunda tek en kötü ölçüm kapı olmaz; en kötü değer rapora yazılır)
        def measure(n=5, tabs=TABS):
            out = []
            for tab, dugme, sel, other in tabs:
                for _ in range(n):
                    pg.click(f"[data-tab={other}]"); pg.wait_for_selector(sel, state="detached"); pg.wait_for_selector(dugme); pg.wait_for_timeout(200)
                    dom, frame = pg.evaluate("""async ([dugme, sel]) => {
                      const t0 = performance.now(); let dom = 0;
                      const seen = new Promise((r) => { if (document.querySelector(sel)) { dom = performance.now() - t0; return r(); }
                        const mo = new MutationObserver(() => { if (document.querySelector(sel)) { dom = performance.now() - t0; mo.disconnect(); r(); } });
                        mo.observe(document.body, { childList: true, subtree: true }); });
                      document.querySelector(dugme).click();
                      await seen; await new Promise((r) => requestAnimationFrame(() => r()));
                      return [dom, performance.now() - t0]; }""", [dugme, sel])
                    out.append((tab, dom, frame))
            return out
        res = measure()
        # PM-060.1: 5 ölçümün en iyi 3'ünün ortancası (CI makinesindeki tek seferlik gecikme kapıyı düşürmesin; bütçe aynı 300 ms)
        med = lambda xs: sorted(xs)[:3][1] if len(xs) >= 3 else sorted(xs)[len(xs) // 2]
        per = {t[0]: [f for tt, _, f in res if tt == t[0]] for t in TABS}
        print("    geçişler (dom/kare ms):", ", ".join(f"{t} {d:.0f}/{f:.0f}" for t, d, f in res))
        print("    ortanca kare (ms):", ", ".join(f"{t} {med(v):.0f} (en kötü {max(v):.0f})" for t, v in per.items()))
        worst_dom = max(d for _, d, _ in res)
        worst_med = max(med(v) for v in per.values())
        gate_ok = worst_dom <= 300 and worst_med <= 300
        if not gate_ok:
            # tanı (yalnızca kapı kırmızıyken, günlük için): gölge kapalı ölçüm — yazılımla çizen WebKit'te bulanık gölge pahalı
            try:
                pg.add_style_tag(content="*{box-shadow:none!important;text-shadow:none!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}")
                d5 = measure(2); print("    tanı, gölge/bulanık cam kapalı:", ", ".join(f"{t} {d:.0f}/{f:.0f}" for t, d, f in d5))
            except Exception as e: print("    tanı koşmadı:", e)
        check(worst_dom <= 300, f"ekran geçişi DOM'a giriş en kötü {worst_dom:.0f} ms (≤ 300, her geçiş)")
        check(worst_med <= 300, f"ekran geçişi ilk kare (5 ölçümün en iyi 3'ünün ortancası) en kötü sekmede {worst_med:.0f} ms (≤ 300; PM-060.1)")
        b.close()
        # 3) içerik isteği takılırsa: ≤ 10 sn içinde hata + "Tekrar dene" (servis işçisi kapalı: önbellek olmayan ilk kullanım)
        b, ctx = launch(p, service_workers="block"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        # Bugün'ün içerik istekleri (plan, gün dosyaları, sözlük) bitmeden yeniden yükleme yapılmaz: WebKit iptal edilen
        # isteği "access control checks" sayfa hatası olarak bildirir (inceleme #66 P1-5; uygulama hatası değil)
        pg.wait_for_selector("[data-test=next-activity]"); pg.wait_for_load_state("networkidle")
        held = []
        pg.route("**/content/**/scenarios/**", lambda route: held.append(route))  # cevapsız bırak
        # boş sayfadan doğrudan yükle: hash değişimi + reload, uçuştaki istekleri iptal ettirip WebKit'te "access control
        # checks" sayfa hatası üretiyordu (inceleme #66 P1-C); ölçülen şey önbelleksiz ilk açılıştaki takılmadır
        pg.goto("about:blank"); t0 = time.time(); pg.goto(base + f"#/scenario/{SC}")
        try:
            pg.wait_for_selector("button:has-text('Tekrar dene')", timeout=10_500); dt = time.time() - t0
            check(dt <= 10.5, f"takılan içerik: {dt:.1f} sn'de hata + 'Tekrar dene'")
        except Exception:
            check(False, "takılan içerik: 10 sn içinde 'Tekrar dene' görünmedi (sonsuz yükleme)")
        pg.unroute("**/content/**/scenarios/**")
        # bekletilen isteği bırak (Chromium aynı adres için önbellek kilidi tutar; gerçek hayatta istek ya biter ya düşer)
        for r in held:
            try: r.continue_()
            except Exception: pass
        pg.wait_for_timeout(300)
        pg.click("button:has-text('Tekrar dene')")
        try: pg.wait_for_selector("[data-section]", timeout=10_000)
        except Exception: pass
        check(pg.locator("[data-section]").count() == 7, "'Tekrar dene' sonrası ekran yüklendi")
        b.close()
    srv.shutdown(); finish()

if __name__ == "__main__":
    main()
