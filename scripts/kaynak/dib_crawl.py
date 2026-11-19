"""
Deutsch im Blick (COERLL, CC BY 4.0) klip kataloğu — #58 A9, İçerik Motoru'nun klip seçimi için (#12 yorum 6996802525).
Kaynak: bölüm başına RSS (rss.php?k=N&a=mp4): her klip için başlık, mp4 adresi, süre ve transkript (açıklama alanında).
Çıktı yalnızca workflow artifact'ı ve iş günlüğüdür (her satır "KATALOG {json}"); depoya girmez.
Nazik: robots.txt'ye uyar, istekler arasında 1 sn, yalnızca 10 RSS isteği.
"""
import html, json, os, re, sys, time, urllib.request, urllib.robotparser
import xml.etree.ElementTree as ET

BASE = "https://coerll.utexas.edu/dib/"
UA = "deutsch-werkstatt-katalog/1.0 (egitim; tek seferlik)"
OUT = sys.argv[1] if len(sys.argv) > 1 else "out"
os.makedirs(OUT, exist_ok=True)
rp = urllib.robotparser.RobotFileParser("https://coerll.utexas.edu/robots.txt")
try: rp.read()
except Exception: rp = None

def get(url):
    if rp and not rp.can_fetch(UA, url): raise RuntimeError(f"robots.txt izin vermiyor: {url}")
    time.sleep(1.0)
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30) as r:
        return r.read()

def fix(s):
    """UTF-8 baytları latin-1 olarak okunmuş metni onar (WÃ¼rzburg → Würzburg)"""
    if s and re.search("[ÃÂ]", s):
        try: return s.encode("latin-1").decode("utf-8")
        except Exception: return s
    return s

def secs(t):
    p = [int(x) for x in (t or "").split(":") if x.isdigit()]
    return p[0] * 60 + p[1] if len(p) == 2 else (p[0] * 3600 + p[1] * 60 + p[2] if len(p) == 3 else None)

def transcript(desc):
    d = fix(html.unescape(desc or ""))
    d = re.sub(r"<ul>.*?</ul>", "", d, flags=re.S)
    lines = [re.sub(r"<[^>]+>", "", x).strip() for x in re.split(r"<br\s*/?>", d)]
    return [x for x in lines if x]

out = []
for k in range(1, 11):
    url = f"{BASE}rss.php?k={k}&a=mp4"
    try: root = ET.fromstring(get(url))
    except Exception as e: print("atlandı", url, e); continue
    for it in root.iter("item"):
        title = fix(it.findtext("title") or "").strip()
        mp4 = it.findtext("link")
        dur = it.findtext("{http://www.itunes.com/dtds/podcast-1.0.dtd}duration")
        lines = transcript(it.findtext("description"))
        enc = it.find("enclosure")
        rec = {"kapitel": k, "baslik": title, "dosya": (mp4 or "").rsplit("/", 1)[-1], "mp4": mp4, "sure_sn": secs(dur),
               "boyut_bayt": int(enc.get("length")) if enc is not None and (enc.get("length") or "").isdigit() else None,
               "turlar": [{"no": i + 1, "metin": x} for i, x in enumerate(lines)]}
        out.append(rec)
        print("KATALOG " + json.dumps(rec, ensure_ascii=False))
json.dump(out, open(os.path.join(OUT, "katalog.json"), "w"), ensure_ascii=False, indent=1)
print(f"bitti: {len(out)} klip; transkriptli {sum(1 for x in out if x['turlar'])}; toplam süre {sum(x['sure_sn'] or 0 for x in out) // 60} dk")
