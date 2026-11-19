"""
#58 A9: GitHub Releases adresinden video WebKit'te (iPhone 15, 16 Pro Max) oynuyor mu?
Adres yönlendirmeli (github.com → objects.githubusercontent.com) ve içerik türü application/octet-stream olabilir;
oynamazsa M1 klipleri geçici olarak Pages'ten sunulur (#58 "Barındırma", D-103).

Karşılaştırma (D-103 kanıtı): aynı dosya
  (A) Releases adresinden (başka kaynak, yönlendirmeli),
  (B) aynı kaynaktan, aralıklı istek (Range) destekleyen yerel sunucudan, `video/mp4` türüyle (Pages gibi).
(A) oynamayıp (B) oynuyorsa sorun barındırmadadır, kodlamada değil.
Kullanım: python scripts/video/oynatma.py URL [URL ...]
"""
import json, os, re, sys, tempfile, threading, urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from playwright.sync_api import sync_playwright

KOK = tempfile.mkdtemp(prefix="oynatma-")

class Aralikli(SimpleHTTPRequestHandler):
    """Range destekli statik sunucu (Safari/WebKit medya için 206 ister)"""
    def __init__(self, *a, **k): super().__init__(*a, directory=KOK, **k)
    def log_message(self, *a): pass
    def guess_type(self, path): return "video/mp4" if str(path).endswith(".mp4") else super().guess_type(path)
    def do_GET(self):
        yol = self.translate_path(self.path)
        m = re.match(r"bytes=(\d*)-(\d*)$", self.headers.get("Range", ""))
        if not os.path.isfile(yol) or not m or (not m.group(1) and not m.group(2)): return super().do_GET()
        boy = os.path.getsize(yol)
        bas = int(m.group(1)) if m.group(1) else max(0, boy - int(m.group(2)))
        son = min(int(m.group(2)), boy - 1) if m.group(1) and m.group(2) else boy - 1
        with open(yol, "rb") as f: f.seek(bas); veri = f.read(son - bas + 1)
        self.send_response(206); self.send_header("Content-Type", self.guess_type(yol)); self.send_header("Accept-Ranges", "bytes")
        self.send_header("Content-Range", f"bytes {bas}-{son}/{boy}"); self.send_header("Content-Length", str(len(veri))); self.end_headers()
        self.wfile.write(veri)

def dene(p, cihaz, sayfa, url):
    b = p.webkit.launch(); d = dict(p.devices[cihaz]); d.pop("default_browser_type", None)
    ctx = b.new_context(**d); pg = ctx.new_page()
    pg.goto(sayfa)
    r = pg.evaluate("""(url) => new Promise((res) => {
      const v = document.createElement('video'); v.playsInline = true; v.muted = true; v.preload = 'auto'; v.src = url; document.body.appendChild(v);
      const t0 = Date.now(); const olay = [];
      for (const k of ['loadedmetadata', 'loadeddata', 'canplay', 'stalled', 'waiting', 'suspend']) v.addEventListener(k, () => olay.push(k + '@' + (Date.now() - t0)));
      const bitir = (ok, neden) => res({ ok, neden, sure: v.duration || null, gecen: Date.now() - t0, an: v.currentTime, hata: v.error && v.error.code, rs: v.readyState, olay: olay.slice(0, 12) });
      v.addEventListener('error', () => bitir(false, 'error'));
      v.addEventListener('canplay', async () => {
        try { await v.play(); } catch (e) { return bitir(false, 'play: ' + e.name); }
        setTimeout(() => bitir(v.currentTime > 0.3, 'oynadı mı'), 1500);
      }, { once: true });
      setTimeout(() => bitir(false, 'zaman aşımı'), 30000);
    })""", url)
    b.close()
    return r

srv = ThreadingHTTPServer(("127.0.0.1", 0), Aralikli); threading.Thread(target=srv.serve_forever, daemon=True).start()
yer = f"http://127.0.0.1:{srv.server_address[1]}/"
open(os.path.join(KOK, "index.html"), "w").write("<!doctype html><title>oynatma</title><body></body>")
with sync_playwright() as p:
    sonuc = []
    for url in sys.argv[1:]:
        ad = url.rsplit("/", 1)[-1]
        with urllib.request.urlopen(url, timeout=120) as r, open(os.path.join(KOK, ad), "wb") as f: f.write(r.read())
        for cihaz in ["iPhone 15", "iPhone 16 Pro Max"]:
            for tur, src in [("releases", url), ("ayni-kaynak", yer + ad)]:
                r = dene(p, cihaz, yer, src); r.update({"tur": tur, "url": src, "cihaz": cihaz}); sonuc.append(r)
                print("OYNATMA " + json.dumps(r, ensure_ascii=False), flush=True)
    srv.shutdown()
    # karar: aynı kaynaktan oynuyorsa iş başarılı (Pages yolu, D-103); Releases sonucu bilgi olarak #12'ye yazılır
    sys.exit(0 if all(x["ok"] for x in sonuc if x["tur"] == "ayni-kaynak") else 1)
