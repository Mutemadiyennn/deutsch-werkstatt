"""
v2 uçtan uca testleri için ortak yardımcılar.
Tarayıcı/cihaz seçimi: --browser chromium|webkit  --device "iPhone 15"  (cihaz verilmezse 390×844)
Sunucu (Worker) Playwright ile taklit edilir: https://api.e2e.test/v1/*
"""
import re
import json, os, sys, threading, functools, http.server, socketserver, time

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DIST = os.path.join(ROOT, "web", "dist-e2e")
ERR: list = []
API_CALLS: list = []
HELD: list = []   # "hold": yanıtı test kendisi sonra verir (geç yanıt senaryosu)

def arg(name, default=None):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default

BROWSER = arg("--browser", os.environ.get("E2E_BROWSER", "chromium"))
DEVICE = arg("--device", os.environ.get("E2E_DEVICE"))
SHOTS = arg("--shots")

def check(cond, msg):
    print(("  ✓ " if cond else "  ✗ ") + msg)
    if not cond: ERR.append(msg)

class RangeHandler(http.server.SimpleHTTPRequestHandler):
    """Video atlaması için Range (206) desteği — WebKit/Chromium medya isteklerinde bunu ister"""
    def send_head(self):
        rng = self.headers.get("Range")
        if not rng or not rng.startswith("bytes="):
            return super().send_head()
        path = self.translate_path(self.path)
        if os.path.isdir(path) or not os.path.exists(path):
            return super().send_head()
        size = os.path.getsize(path)
        a, _, b = rng[6:].partition("-")
        start = int(a) if a else max(0, size - int(b))
        end = int(b) if (a and b) else size - 1
        end = min(end, size - 1)
        if start > end:
            self.send_error(416); return None
        f = open(path, "rb"); f.seek(start)
        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()
        self._remain = end - start + 1
        return f
    def copyfile(self, src, dst):
        n = getattr(self, "_remain", None)
        if n is None: return super().copyfile(src, dst)
        while n > 0:
            buf = src.read(min(65536, n))
            if not buf: break
            dst.write(buf); n -= len(buf)
        self._remain = None

def serve(port):
    h = functools.partial(RangeHandler, directory=DIST)
    http.server.SimpleHTTPRequestHandler.log_message = lambda *a: None
    # çok iş parçacıklı: WebKit'in boş bekleyen (önceden açılmış) bağlantısı ya da yarıda kalan medya isteği tek iş parçacıklı
    # sunucuyu kilitleyip sayfanın "load" olayını geciktiriyordu (CI'da ara sıra Page.reload/inner_text 30 sn zaman aşımı)
    socketserver.ThreadingTCPServer.allow_reuse_address = True
    socketserver.ThreadingTCPServer.daemon_threads = True
    s = socketserver.ThreadingTCPServer(("127.0.0.1", port), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s

CORS = {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}

def make_api(ai_handler=None):
    """ai_handler(task, vars) → (status, body_dict) ; verilmezse varsayılan cevaplar"""
    def route(r):
        req = r.request
        API_CALLS.append({"url": req.url, "auth": req.headers.get("authorization"), "body": req.post_data, "t": time.time()})
        if req.method == "OPTIONS":
            return r.fulfill(status=204, headers={**CORS, "Access-Control-Allow-Headers": "Authorization, Content-Type", "Access-Control-Allow-Methods": "GET, POST"})
        if req.url.endswith("/v1/health"):
            return r.fulfill(status=200, headers=CORS, body=json.dumps({"ok": True, "version": "0.1.0", "time": "x", "configured": {"gemini": True, "allowlist": True}}))
        if req.url.endswith("/v1/usage"):
            return r.fulfill(status=200, headers=CORS, body=json.dumps({"day": "2026-11-17", "ai": {"used": 3, "limit": 300}}))
        if "/v1/photos" in req.url:
            return r.fulfill(status=200, headers=CORS, body=json.dumps({"q": "x", "photos": []}))
        if req.url.endswith("/v1/ai/run"):
            b = json.loads(req.post_data or "{}")
            st, out = (ai_handler or default_ai)(b.get("task"), b.get("vars", {}))
            if st == "abort":
                return r.abort("failed")
            if st == "hang":
                return  # yanıt yok → istemci zaman aşımı
            if st == "hold":
                HELD.append((r, b.get("task"), out)); return
            if st != 200:
                return r.fulfill(status=st, headers=CORS, body=json.dumps(out))
            return r.fulfill(status=200, headers=CORS, body=json.dumps({"task": b.get("task"), "output": out, "model": "m", "ms": 5}))
        return r.fulfill(status=404, headers=CORS, body="{}")
    return route

RP_STATE = {"n": 0}
def default_ai(task, v):
    if task == "equiv_check":
        return 200, {"ok": False, "reason_tr": "Fiil biçimi yanlış."}
    if task == "explain_tr":
        return 200, {"tr": "Tekrar eder misiniz?", "note_tr": "Kibar rica."}
    if task == "say_it_de":
        return 200, {"de_simple": "Ich brauche einen Termin.", "note_tr": "Basit ve doğal."}
    if task == "roleplay_turn":
        RP_STATE["n"] += 1
        replies = ["Praxis Dr. Berger, guten Tag. Was kann ich für Sie tun?", "Haben Sie Ihre Versichertenkarte dabei?", "Passt Ihnen Dienstag um neun?", "Gut, dann bis Dienstag. Auf Wiederhören!"]
        n = RP_STATE["n"]
        return 200, {"reply_de": replies[min(n, len(replies) - 1)], "end": n >= 4}
    if task == "feedback_tr":
        gs = v.get("goals", [])
        return 200, {"goals": [{"id": g["id"], "done": i < len(gs) - 1} for i, g in enumerate(gs)], "strengths_tr": ["Kibar başladın."], "fixes": [{"said": "Ich will Termin", "better": "Ich hätte gern einen Termin.", "why_tr": "Kibar istek."}], "english_fallbacks": 0, "gaps_de": ["der Vormittag"], "summary_tr": "Randevuyu aldın; saat kısmında kısa kaldın."}
    return 404, {"error": {"code": "bad_request"}}

def launch(p, color_scheme="light", viewport=None, service_workers="block"):
    # Servis işçisi varsayılan kapalı: WebKit'te page.route, SW denetimindeki sayfanın isteklerini görmez (inceleme #43 P0-1). Yalnızca ucak.py açar.
    bt = getattr(p, BROWSER)
    b = bt.launch()
    if DEVICE:
        d = dict(p.devices[DEVICE])
        d.pop("default_browser_type", None)
        if BROWSER != "webkit":  # Chromium'da isMobile desteklenir; userAgent iPhone kalır
            pass
        if viewport: d["viewport"] = viewport
        ctx = b.new_context(**d, locale="tr-TR", color_scheme=color_scheme, service_workers=service_workers)
    else:
        ctx = b.new_context(viewport=viewport or {"width": 390, "height": 844}, device_scale_factor=2, locale="tr-TR", color_scheme=color_scheme, has_touch=True, service_workers=service_workers)
    return b, ctx

IPTAL = []
def _sayfa_hatasi(page, e):
    """WebKit, test sayfayı yeniden yüklerken ya da gezinirken iptal ettiği içerik isteğini (yalnızca /content/ altındaki
    JSON ve sahte sunucunun /v1/health yoklaması) "due to access control checks" sayfa hatası olarak bildirir; uygulama hatası değildir (inceleme #66 3. tur).
    Bunlar ayrı sayılır ve raporlanır; başka her sayfa hatası testi kırar."""
    m = str(e)
    # sahte sunucunun sağlık yoklaması (GET /v1/health) da sayfa yeniden yüklenirken aynı biçimde iptal edilir (#152, #159 CI)
    if re.search(r"/content/\S+\.json due to access control checks", m) or re.search(r"/api\.e2e\.test/v1/health due to access control checks", m):
        IPTAL.append(m); print("   (iptal edilen içerik isteği, WebKit:", m[-90:], ")"); return
    ERR.append("sayfa hatası: " + m)

def new_page(ctx, ai_handler=None):
    page = ctx.new_page()
    page.on("pageerror", lambda e: _sayfa_hatasi(page, e))
    page.route("https://api.e2e.test/**", make_api(ai_handler))
    return page

def shot(page, name, full=True):
    if SHOTS:
        os.makedirs(SHOTS, exist_ok=True)
        page.wait_for_timeout(350)  # geçişler (≤200 ms) bitsin
        # hesap kimliği (UID) ekran görüntüsünde maskeli
        page.screenshot(path=os.path.join(SHOTS, name + ".png"), full_page=full, mask=[page.locator("[data-test=uid]")])

def no_overflow(page, where):
    sw, iw = page.evaluate("[document.documentElement.scrollWidth, window.innerWidth]")
    check(sw <= iw, f"{where}: yatay taşma yok (scrollWidth {sw} ≤ {iw})")

# B16 (PM-066): e2e botları cevabı anında verdiği için "Bunları biliyor gibisin" önerisi her testte çıkardı. Testler
# varsayılan olarak hızlı şeridi kapalı başlatır (öğrencinin "Normal akış" tercihi); hızlı şeridi sınayan test hizli_serit=None verir.
HIZLI_KAPAT = """async () => { const d = await new Promise((ok, no) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); q.onerror = no; });
  await new Promise((ok, no) => { const t = d.transaction('meta', 'readwrite'); t.objectStore('meta').put({ key: 'hizliSerit', value: false }); t.oncomplete = ok; t.onerror = no; }); d.close(); }"""

def login_onboard(page, port, assess=False, hizli_serit=False):
    page.goto(f"http://127.0.0.1:{port}/")
    page.wait_for_selector("text=Almancayı gerçek hayat için öğren")
    page.click("summary")
    page.fill("#em", "test@example.com"); page.fill("#pw", "e2e-pass")
    page.click("button[type=submit]")
    page.wait_for_selector("text=Hoş geldin")
    page.click("text=Başlayalım")
    # B7: ad boşsa bir kez nazikçe sorulur; testler adsız profille sürer
    page.wait_for_selector("[data-test=ad-tekrar], [data-struggle]")
    if page.locator("[data-test=ad-gec]").count(): page.click("[data-test=ad-gec]")
    page.click("[data-struggle=phone]")
    page.click("text=Devam"); page.wait_for_selector("text=Öncelik sırası")
    page.click("text=Devam"); page.click("text=Devam")
    if hizli_serit is False: page.evaluate(HIZLI_KAPAT)
    if assess: page.click("[data-test=start-assess]")
    else: page.click("text=Sonra yaparım")

def content_file(rel):
    base = os.path.join(DIST, "content")
    h = [d for d in os.listdir(base) if os.path.isdir(os.path.join(base, d))][0]
    with open(os.path.join(base, h, rel), encoding="utf-8") as f:
        return json.load(f)

def bekle_kosul(page, js, arg=None, timeout=5000, adim=150):
    """async koşul için yoklama: wait_for_function, async işlevin döndürdüğü Promise'i hemen 'doğru' sayar (inceleme #151 P1-2).
    `js` sayfada değerlendirilir (async olabilir); doğru dönerse True, süre dolarsa False."""
    import time
    son = time.time() + timeout / 1000
    while True:
        try:
            if page.evaluate(js, arg) if arg is not None else page.evaluate(js): return True
        except Exception: pass
        if time.time() > son: return False
        page.wait_for_timeout(adim)


def finish():
    print("HATALAR:", "yok" if not ERR else "\n  " + "\n  ".join(ERR))
    sys.exit(1 if ERR else 0)


def tanitim_gec(pg):
    """Bahçe tanıtım kartında "Tamam": ilk soru sonra gelir (PM-069 madde 3); sonraki ekran (başka tanıtım, soru ya da tur sonu) gelene kadar bekler"""
    eski = pg.inner_text("[data-test=garden-intro] .de-xl")
    pg.wait_for_timeout(400)  # ekran açıldıktan sonraki 350 ms'deki dokunuş sayılmaz (çift dokunuş koruması)
    pg.click("[data-test=garden-intro] [data-test=next]")
    pg.wait_for_function("(eski) => { const t = document.querySelector('[data-test=garden-intro] .de-xl'); return !t || t.innerText !== eski; }", arg=eski)
    pg.wait_for_selector("[data-test^=gq-], [data-test=garden-intro], [data-test=garden-done], [data-test=hizli-oneri]")
