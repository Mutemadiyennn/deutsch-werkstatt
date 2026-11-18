"""
DN-2 §3 (PM-030) — her düğmeye basan gezgin.
Her ekranı açar, görünen her dokunulabilir öğeye (düğme, bağlantı, seçenek) TEK TEK basar (her basıştan önce ekran yeniden açılır)
ve şunlardan biri olursa kırmızı verir: sayfa hatası, boş ekran, 2 sn'den uzun cevapsızlık (aria-busy / iskelet), ekranda
"undefined"/"NaN"/"[object Object]", yatay taşma. Ekran ve basılan öğe sayısı raporlanır; önceki rapordan azsa uyarı.
  python3 tests/e2e/gezgin.py [--browser webkit] [--device "iPhone 15"] [--out /tmp/shots/gezgin.json] [--prev önceki.json]
"""
import json, os, re, sys, time
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, ERR, arg, check, finish, BROWSER, DEVICE

PORT = 4186
SC = "sc:telefon:01-arzttermin"
SCREENS = ["#/today", "#/learn", "#/learn/telefon", f"#/scenario/{SC}", f"#/scenario/{SC}/words", f"#/scenario/{SC}/chunks",
           f"#/scenario/{SC}/build", f"#/scenario/{SC}/drills", f"#/scenario/{SC}/listening", f"#/scenario/{SC}/dialogue",
           f"#/scenario/{SC}/roleplay", f"#/call/{SC}", "#/progress", "#/profile"]
TAP = "main button:not([disabled]), main a[href], main [role=button], .actionbar button:not([disabled]), .actionbar a[href], .tabbar a, .callscreen a, .callscreen button"
BAD_TEXT = re.compile(r"\bundefined\b|\bNaN\b|\[object Object\]")
# dışarı açan bağlantılar ve yıkıcı eylemler basılmaz (yalnızca sayılır)
SKIP = re.compile(r"Çıkış|Verileri sil|Hesabı sil|target=\"_blank\"|v1'de aç|Arşiv", re.I)

def settle(pg, where):
    t0 = time.time()
    while time.time() - t0 < 2.0:
        if pg.locator("[aria-busy=true], .skeleton").count() == 0: return True
        pg.wait_for_timeout(100)
    check(False, f"{where}: 2 sn'den uzun cevapsız (yükleniyor göstergesi)"); return False

def health(pg, where):
    # yalnızca hatalar yazılır (her basışta ✓ basmak raporu boğar)
    txt = pg.evaluate("document.body.innerText") or ""
    if len(txt.strip()) <= 20: check(False, f"{where}: boş ekran")
    m = BAD_TEXT.search(txt)
    if m: check(False, f"{where}: ekranda '{m.group(0)}'")
    sw = pg.evaluate("[document.documentElement.scrollWidth, innerWidth]")
    if sw[0] > sw[1] + 1: check(False, f"{where}: yatay taşma ({sw[0]} > {sw[1]})")

def main():
    out = arg("--out", "/tmp/shots/gezgin.json"); prev = arg("--prev")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    rep = {"browser": BROWSER, "device": DEVICE or "390x844", "screens": 0, "taps": 0, "skipped": 0, "per_screen": {}}
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        for scr in SCREENS:
            pg.goto(base + scr); pg.wait_for_timeout(400); settle(pg, scr); health(pg, scr)
            n = pg.locator(TAP).count(); rep["screens"] += 1; tapped = 0
            for i in range(min(n, 40)):
                pg.goto(base + scr); pg.wait_for_timeout(300); settle(pg, scr)
                loc = pg.locator(TAP)
                if i >= loc.count(): break
                el = loc.nth(i)
                try:
                    if not el.is_visible(): continue
                    html = el.evaluate("e => e.outerHTML.slice(0, 300)")
                    if SKIP.search(html): rep["skipped"] += 1; continue
                    label = (el.inner_text() or el.get_attribute("aria-label") or "").strip()[:30]
                    el.click(timeout=2000)
                except Exception as e:
                    check(False, f"{scr} öğe {i}: basılamadı ({str(e).splitlines()[0][:80]})"); continue
                pg.wait_for_timeout(250); where = f"{scr} → [{label}]"
                settle(pg, where); health(pg, where); tapped += 1
            rep["taps"] += tapped; rep["per_screen"][scr] = {"elements": n, "tapped": tapped}
        b.close()
    srv.shutdown()
    json.dump(rep, open(out, "w"), ensure_ascii=False, indent=1)
    print(f"gezgin: {rep['screens']} ekran, {rep['taps']} basış, {rep['skipped']} atlanan → {out}")
    if prev and os.path.exists(prev):
        old = json.load(open(prev))
        if rep["screens"] < old.get("screens", 0) or rep["taps"] < old.get("taps", 0) * 0.9: print(f"UYARI: kapsam azaldı (önce {old.get('screens')} ekran / {old.get('taps')} basış)")
    check(rep["screens"] == len(SCREENS) and rep["taps"] > 50, f"gezgin kapsamı: {rep['screens']} ekran, {rep['taps']} basış")
    finish()

if __name__ == "__main__":
    main()
