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
        TABS = [("learn", "[data-domain]"), ("progress", "[data-test=panel-focus]"), ("profile", "[data-test=goal]"), ("today", "[data-test=next-activity]")]
        def measure():
            out = []
            for tab, sel in TABS:
                other = "learn" if tab == "today" else "today"
                for _ in range(2):
                    pg.click(f"[data-tab={other}]"); pg.wait_for_selector(sel, state="detached"); pg.wait_for_timeout(200)
                    dom, frame = pg.evaluate("""async ([tab, sel]) => {
                      const t0 = performance.now(); let dom = 0;
                      const seen = new Promise((r) => { if (document.querySelector(sel)) { dom = performance.now() - t0; return r(); }
                        const mo = new MutationObserver(() => { if (document.querySelector(sel)) { dom = performance.now() - t0; mo.disconnect(); r(); } });
                        mo.observe(document.body, { childList: true, subtree: true }); });
                      document.querySelector(`[data-tab=${tab}]`).click();
                      await seen; await new Promise((r) => requestAnimationFrame(() => r()));
                      return [dom, performance.now() - t0]; }""", [tab, sel])
                    out.append((tab, dom, frame))
            return out
        res = measure()
        print("    geçişler (dom/kare ms):", ", ".join(f"{t} {d:.0f}/{f:.0f}" for t, d, f in res))
        worst = max(f for _, _, f in res)
        # tanı: bulanık cam (backdrop-filter) kapalıyken aynı ölçüm — yazılımla çizen CI WebKit'te maliyeti ayırmak için
        pg.add_style_tag(content="*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}")
        diag = measure()
        print("    tanı, bulanık cam kapalı (dom/kare ms):", ", ".join(f"{t} {d:.0f}/{f:.0f}" for t, d, f in diag))
        # tanı 2–3 (yalnızca günlük; kapıyı etkilemez): animasyonlar kapalı; Bugün'de yalnızca sıradaki ders kartı
        pg.add_style_tag(content="*,*::before,*::after{animation:none!important;transition:none!important}")
        d2 = measure(); print("    tanı, animasyon kapalı:", ", ".join(f"{t} {d:.0f}/{f:.0f}" for t, d, f in d2 if t == "today"))
        pg.add_style_tag(content=".today > *:not([data-test=next-activity]){display:none!important}")
        d3 = measure(); print("    tanı, Bugün yalnız ders kartı:", ", ".join(f"{t} {d:.0f}/{f:.0f}" for t, d, f in d3 if t == "today"))
        # tanı 4: dokunuştan sonraki ilk 800 ms'de ana iş parçacığının en uzun meşgul aralığı (JS mi, çizim mi?)
        for _ in range(2):
            pg.click("[data-tab=learn]"); pg.wait_for_selector("[data-test=next-activity]", state="detached"); pg.wait_for_timeout(200)
            gaps = pg.evaluate("""async () => {
              const ch = new MessageChannel(); let last = performance.now(), worst = 0, n = 0, t0 = last, frames = [];
              const tick = () => { const t = performance.now(); worst = Math.max(worst, t - last); last = t; n++; if (t - t0 < 800) ch.port2.postMessage(0); };
              ch.port1.onmessage = tick;
              const raf = (t) => { frames.push(Math.round(performance.now() - t0)); if (performance.now() - t0 < 800) requestAnimationFrame(raf); };
              requestAnimationFrame(raf);
              document.querySelector('[data-tab=today]').click(); ch.port2.postMessage(0);
              await new Promise((r) => setTimeout(r, 900));
              return { worstBusy: Math.round(worst), ticks: n, frames: frames.slice(0, 8) }; }""")
            print("    tanı, Bugün'e geçişte en uzun meşgul aralık (ms) ve kare zamanları:", gaps)
        print("    Bugün ekranının bölümleri:", pg.evaluate("() => [...document.querySelectorAll('.today > *')].map(e => (e.className||e.tagName) + ':' + e.querySelectorAll('*').length).join(' | ')"))
        check(worst <= 300, f"en yavaş ekran geçişi {worst:.0f} ms (≤ 300)")
        b.close()
        # 3) içerik isteği takılırsa: ≤ 10 sn içinde hata + "Tekrar dene" (servis işçisi kapalı: önbellek olmayan ilk kullanım)
        b, ctx = launch(p, service_workers="block"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        held = []
        pg.route("**/content/**/scenarios/**", lambda route: held.append(route))  # cevapsız bırak
        t0 = time.time(); pg.goto(base + f"#/scenario/{SC}"); pg.reload()
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
