"""
EK2 §5 ölçümleri: etkileşime hazır olma (ilk açılış / sonraki açılış), kaydırma sırasında fps, JS paket boyutu.
  python3 tests/e2e/perf.py [--browser webkit] [--device "iPhone 15"]
Not: yerel/CI makinesi gerçek iPhone değildir; değerler göreli karşılaştırma içindir. Gerçek cihaz değerleri kontrol listesinden gelir.
"""
import os, glob, gzip, json, time
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, DIST, BROWSER, DEVICE

PORT = 4184

def tti(pg, url, sel):
    t0 = time.time(); pg.goto(url); pg.wait_for_selector(sel); return round((time.time() - t0) * 1000)

def fps(pg, ms=2000):
    return pg.evaluate("""(ms) => new Promise(res => { let n = 0, t0 = performance.now(), worst = 0, last = t0;
      const step = (t) => { n++; worst = Math.max(worst, t - last); last = t; window.scrollBy(0, 6); if (t - t0 < ms) requestAnimationFrame(step); else res({ fps: Math.round(n * 1000 / (t - t0)), worstFrameMs: Math.round(worst) }); };
      requestAnimationFrame(step); })""", ms)

if __name__ == "__main__":
    js = sum(len(gzip.compress(open(f, "rb").read(), 9)) for f in glob.glob(os.path.join(DIST, "assets", "*.js")))
    srv = serve(PORT)
    out = {"browser": BROWSER, "device": DEVICE or "390x844", "js_gzip_kb": round(js / 1024)}
    with sync_playwright() as p:
        b, ctx = launch(p)
        pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        base = f"http://127.0.0.1:{PORT}/"
        # ilk açılış: önbelleksiz yeni bağlam
        b2, c2 = launch(p); p2 = new_page(c2)
        out["tti_first_ms"] = tti(p2, base, "text=Almancayı gerçek hayat için öğren"); b2.close()
        # sonraki açılış: aynı bağlam (önbellek + IndexedDB dolu)
        out["tti_next_ms"] = tti(pg, base + "#/today", "[data-test=next-activity]")
        pg.goto(base + "#/progress"); pg.wait_for_selector("[data-test=panel-focus]")
        out["scroll_progress"] = fps(pg)
        pg.goto(base + "#/scenario/sc:telefon:01-arzttermin/words"); pg.wait_for_selector("[data-test=stage-intro]")
        pg.click("[data-test=to-subtitles]"); pg.click("[data-test=to-scan]"); pg.wait_for_selector("[data-test=scan]")
        out["scroll_scan"] = fps(pg)
        b.close()
    srv.shutdown()
    print(json.dumps(out, ensure_ascii=False))
