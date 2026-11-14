#!/usr/bin/env python3
"""Deutsch-Werkstatt derleme: legacy.html + src/js/*.js + src/css/*.css → dist/index.html
Kullanım: python3 build.py [--ver 2026-11-13a] [--deploy]
 - İçerik: content/kurs/units/*.json doğrulanır, geçenler data/kurs/ altına kopyalanır.
 - --deploy: gh-pages çalışma kopyasına (../deutsch-werkstatt) kopyalar (commit/push ayrı adım)."""
import sys, os, re, glob, json, subprocess, shutil, datetime
ROOT = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]
ver = args[args.index("--ver")+1] if "--ver" in args else datetime.datetime.now().strftime("%Y-%m-%d%H%M")
html = open(os.path.join(ROOT, "legacy.html"), encoding="utf-8").read()
js = "\n".join(f"/* ---- src/js/{os.path.basename(f)} ---- */\n" + open(f, encoding="utf-8").read() for f in sorted(glob.glob(os.path.join(ROOT, "src/js/*.js"))))
css = "\n".join(open(f, encoding="utf-8").read() for f in sorted(glob.glob(os.path.join(ROOT, "src/css/*.css"))))
i = html.rindex("</script>"); html = html[:i] + "\n/* ===== MODULES (build.py) ===== */\n" + js + "\n" + html[i:]
i = html.rindex("</style>"); html = html[:i] + "\n/* ===== MODULE CSS ===== */\n" + css + "\n" + html[i:]
html, n = re.subn(r'const APP_VER = "[^"]*";', f'const APP_VER = "{ver}";', html); assert n == 1, "APP_VER bulunamadı"
dist = os.path.join(ROOT, "dist"); os.makedirs(dist, exist_ok=True)
open(os.path.join(dist, "index.html"), "w", encoding="utf-8").write(html)
# sözdizimi kontrolü
src = re.findall(r"<script(?![^>]*src)[^>]*>([\s\S]*?)</script>", html)
open("/tmp/_dw_check.js", "w").write("\n;\n".join(f"(function(){{{s}\n}})" for s in src))
r = subprocess.run(["node", "--check", "/tmp/_dw_check.js"], capture_output=True, text=True)
if r.returncode: print(r.stderr[:2000]); sys.exit("SÖZDİZİMİ HATASI")
# içerik
kdir = os.path.join(ROOT, "content/kurs")
sys.path.insert(0, kdir)
r = subprocess.run(["python3", "build_index.py"], cwd=kdir, capture_output=True, text=True); print(r.stdout.strip())
os.makedirs(os.path.join(dist, "data/kurs"), exist_ok=True)
for f in glob.glob("/home/claude/werkstatt/data/kurs/*.json"): shutil.copy(f, os.path.join(dist, "data/kurs"))
# yerel test sunucusunun kökü
shutil.copy(os.path.join(dist, "index.html"), "/home/claude/werkstatt/index.html")
print("build ok", ver, len(html)//1024, "KB")
if "--deploy" in args:
    shutil.copy(os.path.join(dist, "index.html"), "/home/claude/deutsch-werkstatt/index.html")
    print("deploy kopyası hazır → /home/claude/deutsch-werkstatt")
