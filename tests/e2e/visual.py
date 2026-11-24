"""
Görsel regresyon (EK2 §8, DESIGN §8): 10 ekran × açık/koyu, sabit saat ve sahte sunucuyla.
  python3 tests/e2e/visual.py --browser webkit --device "iPhone 15" --out OUT [--baseline DIR] [--update]
Taban (baseline) yalnızca CI'daki WebKit çıktısından alınır (yazı tipi işleme tarayıcıya/OS'a bağlıdır).
Taban yoksa ekran görüntüleri yapıt olarak yüklenir ve test geçer (uyarıyla); taban varsa piksel farkı > %0,6 ise başarısız.
"""
import os, sys, datetime
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, ERR, arg, DEVICE, BROWSER

PORT = 4183
SC = "sc:telefon:01-arzttermin"
SCREENS = ["bugun", "yol", "koy", "kelime", "alistirma", "diyalog", "roloyunu", "arama", "mola", "ben"]
FIXED = datetime.datetime(2026, 11, 17, 19, 0, 0)
THRESH = 0.006

def v2_shots(p, theme, out, viewport=None):
    b, ctx = launch(p, color_scheme=theme, viewport=viewport)
    pg = new_page(ctx)
    pg.clock.install(time=FIXED)
    login_onboard(pg, PORT)
    pg.wait_for_selector("[data-tab=today]")
    pg.add_style_tag(content="*{caret-color:transparent!important} .skeleton{animation:none!important}")
    def snap(name):
        pg.wait_for_timeout(400)
        pg.screenshot(path=os.path.join(out, f"v2-{name}-{theme}.png"))
    base = f"http://127.0.0.1:{PORT}/#"
    pg.goto(base + "/today"); pg.wait_for_selector("[data-test=next-activity]"); snap("bugun")
    # Hedef 3 sekmeleri (PM-084 md. 3): Yol ve Köy; Ben en sonda (günün çalışması biriktikten sonra)
    pg.goto(base + "/yol"); pg.wait_for_selector("[data-tab=yol][aria-current=page]"); pg.wait_for_selector("main .yol-harita, main .card"); snap("yol")
    pg.goto(base + "/koy"); pg.wait_for_selector("[data-test=koy] [data-mekan=pazar]"); snap("koy")
    pg.goto(base + f"/scenario/{SC}/chunks"); pg.wait_for_selector("[data-test=ifade-card]"); snap("kelime")
    pg.goto(base + f"/scenario/{SC}/drills"); pg.wait_for_selector("[data-test=answer], [data-chip], button.opt"); snap("alistirma")
    pg.goto(base + f"/scenario/{SC}/dialogue"); pg.wait_for_selector("[data-test=next]"); pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=your-turn]"); snap("diyalog")
    pg.goto(base + f"/scenario/{SC}/roleplay"); pg.wait_for_selector("[data-test=rp-start]"); pg.click("[data-test=rp-start]")
    pg.fill("[data-test=answer]", "Guten Tag, ich brauche einen Termin."); pg.click("[data-test=submit]")
    pg.locator("[data-test=rp-chat] .bubble.them").nth(1).wait_for(); snap("roloyunu")
    pg.goto(base + f"/call/{SC}"); pg.wait_for_selector("[data-test=call]"); snap("arama")
    pg.goto(base + f"/scenario/{SC}/words"); pg.reload(); pg.wait_for_selector("[data-test=stage-intro]")
    for _ in range(26):
        pg.dispatch_event("body", "pointerdown"); pg.clock.run_for(60_000)
    pg.goto(base + "/today"); pg.wait_for_selector("[data-test=break]"); pg.clock.pause_at(FIXED + datetime.timedelta(minutes=26, seconds=30)); snap("mola")
    pg.clock.resume()
    pg.goto(base + "/ben"); pg.wait_for_selector("[data-test=ben-bu-hafta]"); snap("ben")
    b.close()

def diff_ratio(a, b):
    from PIL import Image, ImageChops
    A, B = Image.open(a).convert("RGB"), Image.open(b).convert("RGB")
    if A.size != B.size: return 1.0, None
    d = ImageChops.difference(A, B).convert("L").point(lambda v: 255 if v > 24 else 0)
    n = sum(1 for v in d.getdata() if v)
    return n / (A.size[0] * A.size[1]), d

if __name__ == "__main__":
    out = arg("--out", "/tmp/visual"); base = arg("--baseline"); update = "--update" in sys.argv
    os.makedirs(out, exist_ok=True)
    srv = serve(PORT)
    with sync_playwright() as p:
        for th in ("light", "dark"):
            v2_shots(p, th, out)
    srv.shutdown()
    print(f"tarayıcı={BROWSER} cihaz={DEVICE or '390×844'} → {out}")
    if ERR: print("sayfa hataları:", ERR); sys.exit(1)
    if not base or not os.path.isdir(base) or update:
        print("UYARI: görsel taban yok (ya da --update). Ekran görüntüleri yapıt olarak yüklendi; taban olarak işlenmesi için depoya eklenmeli.")
        sys.exit(0)
    bad = []
    for f in sorted(os.listdir(out)):
        bf = os.path.join(base, f)
        if not f.endswith(".png") or f.startswith("diff-"): continue
        if not os.path.exists(bf): print(f"  yeni ekran (tabanda yok): {f}"); continue
        r, d = diff_ratio(os.path.join(out, f), bf)
        ok = r <= THRESH
        print(f"  {'✓' if ok else '✗'} {f}: fark %{r * 100:.2f}")
        if not ok:
            bad.append(f)
            if d is not None: d.save(os.path.join(out, "diff-" + f))
    if bad: print("GÖRSEL FARK:", bad); sys.exit(1)
    print("görsel regresyon: fark yok")
