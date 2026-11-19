"""
Deutsch im Blick (COERLL, CC BY 4.0) klip kataloğu — #58 A9, İçerik Motoru'nun klip seçimi için (12 #6996802525).
Çıktı yalnızca workflow artifact'ıdır; depoya girmez. Nazik tarama: robots.txt'ye uyar, istekler arasında 1 sn.
  - toc.php?k=1..10 sayfalarından klip sayfası bağlantıları
  - her klip sayfası: başlık, video adresi (mp4 / youtube), transkript metni (sezgisel), ham HTML
  - mp4 varsa ffprobe ile süre (yalnızca başlık okunur)
Çıktı: out/katalog.json, out/html/<n>.html
"""
import json, os, re, subprocess, sys, time, urllib.parse, urllib.request, urllib.robotparser
from html.parser import HTMLParser

BASE = "https://coerll.utexas.edu/dib/"
UA = "deutsch-werkstatt-katalog/1.0 (egitim; tek seferlik; iletisim: github.com/Mutemadiyennn/deutsch-werkstatt)"
OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
os.makedirs(os.path.join(OUT, "html"), exist_ok=True)
rp = urllib.robotparser.RobotFileParser("https://coerll.utexas.edu/robots.txt")
try: rp.read()
except Exception: rp = None

def get(url):
    if rp and not rp.can_fetch(UA, url): raise RuntimeError(f"robots.txt izin vermiyor: {url}")
    time.sleep(1.0)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode(r.headers.get_content_charset() or "utf-8", "replace")

class P(HTMLParser):
    def __init__(self):
        super().__init__(); self.links = []; self.media = []; self.title = ""; self._t = False
        self.stack = []; self.trans = []; self._cap = 0
    def handle_starttag(self, tag, a):
        a = dict(a)
        if tag == "a" and a.get("href"): self.links.append((a["href"], ""))
        if tag in ("source", "video", "iframe", "embed") and (a.get("src") or a.get("data-src")): self.media.append(a.get("src") or a.get("data-src"))
        if tag == "title": self._t = True
        key = " ".join([a.get("id", ""), a.get("class", "")]).lower()
        if self._cap or re.search(r"trans|script|caption|untertitel", key): self._cap += 1
        self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag == "title": self._t = False
        if self._cap: self._cap -= 1
        if self.stack: self.stack.pop()
    def handle_data(self, d):
        if self._t: self.title += d
        if self._cap and d.strip(): self.trans.append(d.strip())

def parse(html):
    p = P(); p.feed(html); return p

def duration(url):
    try:
        r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", "-user_agent", UA, url], capture_output=True, text=True, timeout=60)
        return round(float(r.stdout.strip()), 1)
    except Exception:
        return None

def main():
    pages = {}
    for k in range(1, 11):
        url = f"{BASE}toc.php?k={k}"
        try: html = get(url)
        except Exception as e: print("atlandı", url, e); continue
        open(os.path.join(OUT, "html", f"toc_{k}.html"), "w").write(html)
        pp = parse(html)
        if k == 1:
            print("toc_1 onclick:", re.findall(r'onclick="([^"]{0,200})"', html)[:40])
            print("toc_1 script src:", re.findall(r'<script[^>]*src="([^"]+)"', html))
            i = html.find("Wer bin ich"); print("toc_1 parça:", html[max(0, i - 1500):i + 2500])
            try: print("rss_1:", get(f"{BASE}rss.php?k=1&a=mp4")[:4000])
            except Exception as e: print("rss hata", e)
        for href, _ in pp.links:
            u = urllib.parse.urljoin(url, href)
            if u.startswith(BASE) and re.search(r"(video|clip|interview|sic|toc\.php\?k=\d+&)", u) and not u.endswith(".pdf"):
                pages.setdefault(u, k)
    print(f"{len(pages)} klip sayfası adayı")
    out = []
    for i, (u, k) in enumerate(sorted(pages.items())):
        try: html = get(u)
        except Exception as e: out.append({"kapitel": k, "sayfa": u, "hata": str(e)}); continue
        fn = f"{i:03d}.html"; open(os.path.join(OUT, "html", fn), "w").write(html)
        p = parse(html)
        media = [urllib.parse.urljoin(u, m) for m in p.media]
        mp4 = next((m for m in media if re.search(r"\.(mp4|m4v|webm|mov)(\?|$)", m)), None)
        yt = next((m for m in media if "youtube" in m or "youtu.be" in m), None)
        out.append({"kapitel": k, "sayfa": u, "baslik": p.title.strip(), "video": mp4, "youtube": yt,
                    "sure_sn": duration(mp4) if mp4 else None, "transkript": " ".join(p.trans)[:20000], "html": fn})
        print(i, u, bool(mp4), bool(yt), len(" ".join(p.trans)))
    json.dump(out, open(os.path.join(OUT, "katalog.json"), "w"), ensure_ascii=False, indent=1)
    print("bitti:", len(out), "kayıt;", sum(1 for x in out if x.get("transkript")), "transkriptli;", sum(1 for x in out if x.get("video")), "mp4")

main()
