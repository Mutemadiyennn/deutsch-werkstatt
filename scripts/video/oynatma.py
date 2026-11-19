"""
#58 A9: GitHub Releases adresinden video WebKit'te (iPhone 15, 16 Pro Max) oynuyor mu?
Adres yönlendirmeli (github.com → objects.githubusercontent.com) ve içerik türü application/octet-stream olabilir;
oynamazsa M1 klipleri geçici olarak Pages'ten sunulur (#58 "Barındırma", DECISIONS'a yazılır).
Kullanım: python scripts/video/oynatma.py URL [URL ...]
"""
import json, sys
from playwright.sync_api import sync_playwright

def dene(p, cihaz, url):
    b = p.webkit.launch(); d = dict(p.devices[cihaz]); d.pop("default_browser_type", None)
    ctx = b.new_context(**d); pg = ctx.new_page()
    pg.set_content(f'<video id=v playsinline muted preload=auto src="{url}"></video>')
    r = pg.evaluate("""() => new Promise((res) => {
      const v = document.getElementById('v'); const t0 = Date.now();
      const bitir = (ok, neden) => res({ ok, neden, sure: v.duration || null, gecen: Date.now() - t0, an: v.currentTime, hata: v.error && v.error.code });
      v.addEventListener('error', () => bitir(false, 'error'));
      v.addEventListener('canplay', async () => {
        try { await v.play(); } catch (e) { return bitir(false, 'play: ' + e.name); }
        setTimeout(() => bitir(v.currentTime > 0.3, 'oynadı mı'), 1500);
      }, { once: true });
      setTimeout(() => bitir(false, 'zaman aşımı'), 30000);
    })""")
    b.close()
    return r

with sync_playwright() as p:
    sonuc = []
    for url in sys.argv[1:]:
        for cihaz in ["iPhone 15", "iPhone 16 Pro Max"]:
            r = dene(p, cihaz, url); r.update({"url": url, "cihaz": cihaz}); sonuc.append(r)
            print("OYNATMA " + json.dumps(r, ensure_ascii=False), flush=True)
    sys.exit(0 if all(x["ok"] for x in sonuc) else 1)
