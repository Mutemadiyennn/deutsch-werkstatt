"""
DN-2 §3 (PM-030) — her düğmeye basan gezgin. Sonunda dönüş hedefi savları (PM-133 b): giriş noktasından girip X / geri ile çıkış.
Her ekranı açar, görünen her dokunulabilir öğeye (düğme, bağlantı, seçenek) TEK TEK basar (her basıştan önce ekran yeniden açılır)
ve şunlardan biri olursa kırmızı verir: sayfa hatası, boş ekran, 2 sn'den uzun cevapsızlık (aria-busy / iskelet), ekranda
"undefined"/"NaN"/"[object Object]", yatay taşma. Ekran ve basılan öğe sayısı raporlanır; önceki rapordan azsa uyarı.
  python3 tests/e2e/gezgin.py [--browser webkit] [--device "iPhone 15"] [--out /tmp/shots/gezgin.json] [--prev önceki.json]
"""
import json, os, re, sys, time
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, ERR, arg, check, finish, BROWSER, DEVICE, content_file

PORT = 4186
SC = "sc:telefon:01-arzttermin"
SECTIONS = ["words", "chunks", "build", "drills", "listening", "dialogue", "roleplay"]
BASELINE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "gezgin-baseline.json")
CAP = 80  # ekran başına en çok basış; fazlası "over_cap" olarak sayılır ve raporlanır

def screens():
    """Dört sekme (Bugün, Yol, Köy, Ben) + ayarlar + seviye tespiti + Köy'ün beş mekân sayfası + her senaryonun ana sayfası + bir tam ve bir mini senaryonun bütün bölümleri"""
    idx = content_file("index.json")
    sc = [s["id"] for s in idx["scenarios"]]
    mini = next((s["id"] for s in idx["scenarios"] if s.get("format") == "mini"), None)
    doms = sorted({s["domain"] for s in idx["scenarios"]})
    out = ["#/today", "#/yol", "#/koy", "#/ben", "#/ben/duzen", "#/ben/ayarlar", "#/assess"] + [f"#/koy/{m}" for m in ("bahce", "sinema", "radyo", "kutuphane", "pazar")] + [f"#/learn/{d}" for d in doms] + [f"#/scenario/{s}" for s in sc]
    for s in [SC] + ([mini] if mini else []):
        out += [f"#/scenario/{s}/{x}" for x in SECTIONS]
    # Kalıplar listesi ve kalıp bağı olan bir sözlük kartı (yerleşim B5; inceleme #185 P1-3)
    out += ["#/kalip", "#/sozluk/wo/lx%3Awo"]
    # PM-114 B: kısa yoklama girişi ve sonucu (sonuç yoksa dürüst boş ekran)
    out += ["#/seviye", "#/seviye/rapor", "#/seviye/plan"]
    # AKIS AK-10 4a: akış günü (e2e paketinde 2. gün halkalı) ve halka adım türleri (yalnız e2e yolu)
    akis = ["#/akis/2"] if any(g.get("day") == 2 for g in idx.get("m1", [])) else []
    return out + [f"#/call/{SC}"] + akis + ["#/__halka-turleri"]
TAP = "main button:not([disabled]), main a[href], main [role=button], .actionbar button:not([disabled]), .actionbar a[href], .tabbar a, .callscreen a, .callscreen button"
BAD_TEXT = re.compile(r"\bundefined\b|\bNaN\b|\[object Object\]")
# dışarı açan bağlantılar ve yıkıcı eylemler basılmaz (yalnızca sayılır)
SKIP = re.compile(r"Çıkış|Verileri sil|Hesabı sil|target=\"_blank\"|v1'de aç|Arşiv|Eski uygulamaya dön", re.I)

def settle(pg, where):
    t0 = time.time()
    while time.time() - t0 < 2.0:
        if pg.locator("[aria-busy=true], .skeleton").count() == 0: return True
        pg.wait_for_timeout(100)
    check(False, f"{where}: 2 sn'den uzun cevapsız (yükleniyor göstergesi)"); return False

def health(pg, where):
    # yalnızca hatalar yazılır (her basışta ✓ basmak raporu boğar)
    # boş ekran: sekme çubuğu ve üst çubuk hariç, içerik alanının metni (inceleme #43)
    main = pg.evaluate("(() => { const m = document.querySelector('main, .callscreen'); if (!m) return ''; const c = m.cloneNode(true); c.querySelectorAll('.tabbar, nav').forEach(e => e.remove()); return c.innerText; })()") or ""
    if len(main.strip()) <= 20: check(False, f"{where}: boş ekran ({len(main.strip())} karakter)")
    txt = pg.evaluate("document.body.innerText") or ""
    m = BAD_TEXT.search(txt)
    if m: check(False, f"{where}: ekranda '{m.group(0)}'")
    sw = pg.evaluate("[document.documentElement.scrollWidth, innerWidth]")
    if sw[0] > sw[1] + 1: check(False, f"{where}: yatay taşma ({sw[0]} > {sw[1]})")

def git(pg, h):
    """bağlantıya dokunmakla aynı: aynı belgede adres değişir (hashchange), giriş noktası kaydedilir"""
    pg.evaluate("(h) => { location.hash = h; }", h); pg.wait_for_function("(h) => location.hash === h", arg=h); pg.wait_for_timeout(350)

def cikis(pg):
    """ekranın X / geri düğmesine dokun; döner: varılan adres"""
    el = pg.locator("[data-test=akis-cik], .pbar [data-test=kapat], .pbar [data-test=geri], .topbar [data-test=geri]").first
    el.wait_for(timeout=8000); once = pg.evaluate("location.hash"); el.click()
    pg.wait_for_function("(h) => location.hash !== h", arg=once, timeout=5000); pg.wait_for_timeout(300)
    return pg.evaluate("location.hash")

def donus_savlari(pg, base):
    """PM-133 (b): her giriş noktasından girip X / geri ile çıkınca aynı giriş noktasına dönülüyor mu; sekme son konumu (md. 1)"""
    idx = content_file("index.json")
    gunler = sorted(g["day"] for g in idx.get("m1", []))
    pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today][aria-current=page]")
    # 1) tam ekran akış: Bugün / Yol / Köy listesinden gir → X → giriş (alt sekme görünmez, md. 4)
    akis = 2 if 2 in gunler else gunler[0]
    for giris in ("#/today", "#/yol"):
        git(pg, giris); git(pg, f"#/akis/{akis}")
        check(pg.locator(".tabbar").count() == 0, f"dönüş: {akis}. günün akışında alt sekme yok")
        varis = cikis(pg); check(varis == giris, f"dönüş: {giris} → akış → X → {giris} ({varis})")
    git(pg, "#/yol"); git(pg, "#/hafta/1")
    if pg.locator(".pbar [data-test=kapat]").count():
        varis = cikis(pg); check(varis == "#/yol", f"dönüş: Yol → hafta sonu testi → X → Yol ({varis})")
    # 2) akıştan açılan durak ekranı akışa döner (PM-144 md. 1.2); X Bugün'e
    # gezginin dokunmadığı bir gün (2. günde "şimdi geç" basılmış olabilir); ilk durağı ses (adımsız durak)
    d2 = next((g for g in gunler if g != akis), akis)
    git(pg, "#/today"); git(pg, f"#/akis/{d2}")
    bas = pg.locator("[data-test=akis-durak-basla]")
    try: bas.wait_for(timeout=8000)
    except Exception: pass
    check(bas.count() == 1, f"dönüş: {d2}. günün akışı adımsız durakla açıldı (Başla)")
    if bas.count():
        hedef = bas.get_attribute("href"); bas.click(); pg.wait_for_function("(h) => location.hash === h", arg=hedef); pg.wait_for_timeout(400)
        check(pg.locator(".tabbar").count() == 0 and pg.locator(".pbar [data-test=kapat]").count() == 1, f"dönüş: akıştan açılan durak ({hedef}) tam ekran, tek çıkış X")
        varis = cikis(pg); check(varis == f"#/akis/{d2}", f"dönüş: akış → durak → X → akış ({varis})")
        varis = cikis(pg); check(varis == "#/today", f"dönüş: sonra akıştan X → Bugün ({varis})")
    # 3) Köy listesinden: mekân → günün kayıtları → kayıt; geri her adımda bir üst düzey, sekme değişmez
    git(pg, "#/koy"); git(pg, "#/koy/radyo"); git(pg, f"#/m1/{gunler[0]}")
    kayit = pg.locator("main a[href^='#/m1/']").first; kayit.wait_for(timeout=8000); kh = kayit.get_attribute("href"); kayit.click()
    pg.wait_for_function("(h) => location.hash === h", arg=kh); pg.wait_for_timeout(400)
    zincir = [cikis(pg), cikis(pg), cikis(pg)]
    check(zincir == [f"#/m1/{gunler[0]}", "#/koy/radyo", "#/koy"], f"dönüş: Köy → Radyo → gün → kayıt; geri geri geri ({zincir})")
    # 4) Rehber Yol'dan: geri Yol; sekme değiştiren bağlantı (Ben → Sözlük): geri Köy'ün içinde kalır (md. 2)
    git(pg, "#/yol"); git(pg, f"#/rehber/{gunler[0]}"); varis = cikis(pg); check(varis == "#/yol", f"dönüş: Yol → Rehber → geri → Yol ({varis})")
    git(pg, "#/ben"); git(pg, "#/sozluk"); varis = cikis(pg); check(varis == "#/koy/kutuphane", f"dönüş: Ben → Sözlük → geri Köy'ün içinde ({varis})")
    # 5) alt sekme o kökün son konumunu açar; etkin sekmeye ikinci dokunuş köke
    git(pg, "#/koy"); git(pg, "#/koy/radyo"); git(pg, "#/ben")
    pg.click("[data-tab=koy]"); pg.wait_for_timeout(350)
    check(pg.evaluate("location.hash") == "#/koy/radyo", f"sekme: Köy son konumunu açtı ({pg.evaluate('location.hash')})")
    pg.click("[data-tab=koy]"); pg.wait_for_timeout(350)
    check(pg.evaluate("location.hash") == "#/koy", f"sekme: etkin Köy'e ikinci dokunuş köke ({pg.evaluate('location.hash')})")

def main():
    out = arg("--out", "/tmp/shots/gezgin.json"); prev = arg("--prev", BASELINE)
    SCREENS = screens()
    os.makedirs(os.path.dirname(out), exist_ok=True)
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    rep = {"browser": BROWSER, "device": DEVICE or "390x844", "screens": 0, "taps": 0, "skipped": 0, "hidden": 0, "over_cap": 0, "per_screen": {}}
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        for scr in SCREENS:
            pg.goto(base + scr); pg.wait_for_timeout(400); settle(pg, scr); health(pg, scr)
            n = pg.locator(TAP).count(); rep["screens"] += 1; tapped = 0
            rep["over_cap"] += max(0, n - CAP)
            for i in range(min(n, CAP)):
                pg.goto(base + scr); pg.wait_for_timeout(300); settle(pg, scr)
                # önceki basışın bildirimi (toast, 2,6 sn) aynı belgede kalır ve sıradaki düğmenin üstüne düşer: bitmesi beklenir
                try: pg.wait_for_selector(".toast", state="detached", timeout=3500)
                except Exception: pass
                loc = pg.locator(TAP)
                if i >= loc.count(): break
                el = loc.nth(i)
                try:
                    if not el.is_visible(): rep["hidden"] += 1; continue
                    html = el.evaluate("e => e.outerHTML.slice(0, 300)")
                    if SKIP.search(html): rep["skipped"] += 1; continue
                    label = (el.inner_text() or el.get_attribute("aria-label") or "").strip()[:30]
                    el.click(timeout=2000)
                except Exception as e:
                    check(False, f"{scr} öğe {i}: basılamadı ({str(e).splitlines()[0][:80]})"); continue
                pg.wait_for_timeout(250); where = f"{scr} → [{label}]"
                settle(pg, where); health(pg, where); tapped += 1
            rep["taps"] += tapped; rep["per_screen"][scr] = {"elements": n, "tapped": tapped}
        donus_savlari(pg, base)
        b.close()
    srv.shutdown()
    json.dump(rep, open(out, "w"), ensure_ascii=False, indent=1)
    print(f"gezgin: {rep['screens']} ekran, {rep['taps']} basış, {rep['skipped']} atlanan (yıkıcı/dış), {rep['hidden']} görünmez, {rep['over_cap']} sınır üstü → {out}")
    check(rep["screens"] == len(SCREENS), f"gezgin: listedeki {len(SCREENS)} ekranın hepsi açıldı ({rep['screens']})")
    check(rep["over_cap"] == 0, f"gezgin: ekran başına {CAP} sınırını aşan öğe yok ({rep['over_cap']})")
    if prev and os.path.exists(prev):
        old = json.load(open(prev))
        # kapsam tabanı depoda (gezgin-baseline.json): ekran ya da basış %10'dan fazla düşerse kırmızı
        check(rep["screens"] >= old.get("screens", 0) and rep["taps"] >= old.get("taps", 0) * 0.9,
              f"gezgin kapsamı tabanın altında değil: {rep['screens']} ekran / {rep['taps']} basış (taban {old.get('screens')} / {old.get('taps')})")
    finish()

if __name__ == "__main__":
    main()
