"""
EK kontrol noktası: v1 ve v2 aynı ekranlar, 390×844, açık + koyu → yan yana görüntüler.
Önkoşul: v1 sitesi http://localhost:8765 (app/tests/srv.sh), v2 e2e paketi web/dist-e2e.
Çalıştırma: python3 tests/e2e/compare_v1_v2.py OUT_DIR
"""
import os, sys, json, datetime
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw, ImageFont
sys.argv += ["--shots", "/dev/null"] if "--shots" not in sys.argv else []
from common import serve, ERR

OUT = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("--") else "/tmp/compare"
os.makedirs(OUT, exist_ok=True)
PORT = 4182
SC = "sc:telefon:01-arzttermin"
GATE = "localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()})); setInterval(()=>document.querySelectorAll('.celebrate').forEach(x=>x.remove()), 50);"
SCREENS = ["bugun", "kelime", "alistirma", "diyalog", "roloyunu", "mola", "ilerlemem"]
VP = {"width": 390, "height": 844}

def v1(p, theme):
    b = p.chromium.launch()
    ctx = b.new_context(viewport=VP, device_scale_factor=2, is_mobile=True, has_touch=True, color_scheme=theme)
    pg = ctx.new_page(); pg.add_init_script(GATE)
    pg.goto("http://localhost:8765/index.html?eski=1"); pg.wait_for_timeout(1500)   # PM-116: kök /v2/ye yönlenir
    pg.evaluate(f"S.state.setupDone=true; S.state.theme='{theme}'; S.state.seenNew='2026-11-17a'; document.documentElement.setAttribute('data-theme','{theme}'); try{{applyTheme()}}catch(e){{}}; 0")
    def at(js, name, wait=1200):
        pg.evaluate(f"(async()=>{{ try{{ stopAll&&stopAll(); }}catch(e){{}} S.brk=null; {js} }})()"); pg.wait_for_timeout(wait)
        pg.screenshot(path=f"{OUT}/v1-{name}-{theme}.png")
    at("go('plan'); render();", "bugun")
    at("await kursIndex(); const id=kSt().cur; await kuStartNode(id,'w1');", "kelime")
    at("await kursIndex(); const id=kSt().cur; await kuStartNode(id,'g1');", "alistirma")
    at("await kursIndex(); const id=kSt().cur; await kuStartNode(id,'li');", "diyalog")
    at("await kursIndex(); const id=kSt().cur; await kuStartNode(id,'rp');", "roloyunu")
    at("go('lernen'); render(); startBreak();", "mola")
    at("go('seviye'); render();", "ilerlemem")
    b.close()

def v2(p, theme):
    from visual import v2_shots, PORT as VP2
    srv2 = serve(VP2)
    try: v2_shots(p, theme, OUT, viewport=VP)
    finally: srv2.shutdown()

def montage():
    try: font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 34)
    except Exception: font = ImageFont.load_default()
    for theme in ("light", "dark"):
        for s in SCREENS:
            a, c = f"{OUT}/v1-{s}-{theme}.png", f"{OUT}/v2-{s}-{theme}.png"
            if not (os.path.exists(a) and os.path.exists(c)): continue
            A, C = Image.open(a), Image.open(c)
            W = A.width + C.width + 40; H = max(A.height, C.height) + 70
            M = Image.new("RGB", (W, H), (30, 30, 30) if theme == "dark" else (235, 235, 235))
            M.paste(A, (0, 70)); M.paste(C, (A.width + 40, 70))
            d = ImageDraw.Draw(M); col = (240, 240, 240) if theme == "dark" else (20, 20, 20)
            d.text((20, 18), f"v1 · {s} · {theme}", fill=col, font=font); d.text((A.width + 60, 18), f"v2 · {s} · {theme}", fill=col, font=font)
            M.save(f"{OUT}/yanyana-{s}-{theme}.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        for th in ("light", "dark"):
            v1(p, th); v2(p, th)
    montage()
    print("hatalar:", ERR or "yok"); print("çıktı:", OUT)
