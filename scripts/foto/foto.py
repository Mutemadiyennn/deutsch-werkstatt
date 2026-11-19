"""
M1 fotoğraf hattı (#58 A10). CI'da çalışır; anahtar yok, ücretli servis yok.

İçerik yalnızca arama sorgusu yazar (kartta `img`, örnek cümlede `examples[].img`). Bu adım her sorgu için 3 aday getirir:
  1. Wikimedia Commons API (anahtarsız): `filetype:bitmap` arama, `imageinfo` ile lisans ve yazar (extmetadata).
  2. Openverse API (anahtarsız, CC kataloğu): Commons 3 aday vermezse tamamlar.
Yalnızca yeniden dağıtıma açık lisanslar: CC0, Public Domain (PDM), CC BY, CC BY-SA (sürüm fark etmez). NC/ND, "fair use"
ve lisansı okunamayan görsel alınmaz. Kaynak sayfa, yazar ve lisans kayda geçer (atıf).

Çıktı:
  - GitHub Releases `m1-foto`: aday görseller (en uzun kenar 640 px JPEG) ve görsel denetim sayfası `secim.html`
    (#58 B5: denetçi her sorgu için birini seçer ya da hepsini reddeder; soyut kelimede sahne çizimi).
  - Depo: `content/v2/media/foto/adaylar.json` — sorgu → aday (dosya, kaynak sayfa, yazar, lisans, boyut). Görsel depoya girmez.

Kullanım: python scripts/foto/foto.py OUT_DIR [--sinir N]
"""
from __future__ import annotations
import glob, hashlib, html, io, json, os, re, sys, time, urllib.parse, urllib.request

KOK = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UA = "deutsch-werkstatt-foto/1.0 (egitim amacli; github.com/Mutemadiyennn/deutsch-werkstatt)"
COMMONS = "https://commons.wikimedia.org/w/api.php"
OPENVERSE = "https://api.openverse.org/v1/images/"
ADAY = 3
UYGUN = re.compile(r"^(cc0|cc[- ]?by(-sa)?([- ]\d(\.\d)?)?|public domain|pdm|cc[- ]?pdm)", re.I)
YASAK = re.compile(r"\b(nc|nd|noncommercial|noderivs|fair use|non-free)\b", re.I)

def get(url: str, tekrar: int = 3) -> bytes:
    for k in range(tekrar):
        try:
            time.sleep(0.5)
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
                return r.read()
        except Exception as e:
            if k == tekrar - 1: raise RuntimeError(f"{url[:120]}: {e}") from e
            time.sleep(3 * (k + 1))
    raise RuntimeError("ulaşılamadı")

def temiz(s: str | None) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html.unescape(s or ""))).strip()

def lisans_uygun(ad: str) -> bool:
    return bool(ad) and bool(UYGUN.match(ad.strip())) and not YASAK.search(ad)

def commons(sorgu: str, n: int = 10) -> list[dict]:
    q = urllib.parse.urlencode({"action": "query", "format": "json", "generator": "search", "gsrsearch": f"{sorgu} filetype:bitmap",
                                "gsrnamespace": 6, "gsrlimit": n, "prop": "imageinfo", "iiprop": "url|extmetadata|size|mime", "iiurlwidth": 640})
    d = json.loads(get(f"{COMMONS}?{q}"))
    out = []
    for p in sorted((d.get("query") or {}).get("pages", {}).values(), key=lambda x: x.get("index", 99)):
        ii = (p.get("imageinfo") or [{}])[0]; md = ii.get("extmetadata") or {}
        lis = temiz((md.get("LicenseShortName") or {}).get("value"))
        if not lisans_uygun(lis) or ii.get("mime") not in ("image/jpeg", "image/png", "image/webp"): continue
        out.append({"kaynak": "Wikimedia Commons", "sayfa": ii.get("descriptionurl"), "url": ii.get("thumburl") or ii.get("url"),
                    "yazar": temiz((md.get("Artist") or {}).get("value"))[:160] or "bilinmiyor", "lisans": lis,
                    "lisans_url": temiz((md.get("LicenseUrl") or {}).get("value")) or None, "baslik": p.get("title")})
    return out

def openverse(sorgu: str, n: int = 10) -> list[dict]:
    q = urllib.parse.urlencode({"q": sorgu, "license": "cc0,pdm,by,by-sa", "page_size": n, "mature": "false"})
    d = json.loads(get(f"{OPENVERSE}?{q}"))
    out = []
    for r in d.get("results", []):
        lis = f"{(r.get('license') or '').upper()} {r.get('license_version') or ''}".strip()
        lis = "CC0" if lis.startswith("CC0") else ("Public Domain" if lis.startswith("PDM") else f"CC {lis}")
        if not lisans_uygun(lis): continue
        out.append({"kaynak": f"Openverse ({r.get('source')})", "sayfa": r.get("foreign_landing_url"), "url": r.get("url"),
                    "yazar": (r.get("creator") or "bilinmiyor")[:160], "lisans": lis, "lisans_url": r.get("license_url"), "baslik": r.get("title")})
    return out

def kucult(veri: bytes) -> bytes:
    from PIL import Image
    im = Image.open(io.BytesIO(veri)).convert("RGB")
    im.thumbnail((640, 640))
    b = io.BytesIO(); im.save(b, "JPEG", quality=82, optimize=True, progressive=True)
    return b.getvalue()

def sorgular() -> dict[str, list[str]]:
    """M1 günlerinin kartları: kart sorgusu (`img`) ve örnek cümle sorguları → kullanan yerler"""
    lex = {}
    for f in glob.glob(os.path.join(KOK, "content/v2/registry/lexicon/batch-*.json")):
        for it in json.load(open(f))["items"]: lex[it["id"]] = it
    ids: list[str] = []
    for f in sorted(glob.glob(os.path.join(KOK, "content/v2/m1/gun-*.json"))):
        for i in json.load(open(f)).get("yeni_kartlar", []):
            if i not in ids: ids.append(i)
    q: dict[str, list[str]] = {}
    for i in ids:
        l = lex.get(i)
        if not l: continue
        if l.get("img"): q.setdefault(l["img"], []).append(f"{i}#kart")
        for k, e in enumerate(l.get("examples") or []):
            if e.get("img"): q.setdefault(e["img"], []).append(f"{i}#ornek{k}")
    return q

def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "out"
    sinir = int(sys.argv[sys.argv.index("--sinir") + 1]) if "--sinir" in sys.argv else 10_000
    os.makedirs(out, exist_ok=True)
    q = sorgular()
    print(f"sorgu: {len(q)}", flush=True)
    kayit, satir = {}, []
    for n, (sorgu, yerler) in enumerate(list(q.items())[:sinir]):
        adaylar, hata = [], None
        try:
            havuz = commons(sorgu)
            if len(havuz) < ADAY:
                try: havuz += openverse(sorgu)
                except Exception as e: hata = f"openverse: {e}"
            for a in havuz:
                if len(adaylar) >= ADAY: break
                try:
                    veri = kucult(get(a["url"]))
                except Exception as e:
                    hata = str(e)[:160]; continue
                h = hashlib.sha256(veri).hexdigest()[:16]
                ad = f"{h}.jpg"
                if any(x["dosya"] == ad for x in adaylar): continue
                open(os.path.join(out, ad), "wb").write(veri)
                adaylar.append({**{k: v for k, v in a.items() if k != "url"}, "dosya": ad, "bayt": len(veri)})
        except Exception as e:
            hata = str(e)[:200]
        kayit[sorgu] = {"yerler": yerler, "adaylar": adaylar, **({"hata": hata} if hata and not adaylar else {})}
        satir.append((sorgu, yerler, adaylar))
        print("FOTO " + json.dumps({"sorgu": sorgu, "aday": len(adaylar), "hata": hata}, ensure_ascii=False), flush=True)
    hedef = os.path.join(KOK, "content/v2/media/foto")
    os.makedirs(hedef, exist_ok=True)
    json.dump({"surum": 1, "not": "Görseller GitHub Releases m1-foto varlığıdır; depoya girmez. Seçim #58 B5 görsel denetimiyle (secim.json).",
               "sorgular": kayit}, open(os.path.join(hedef, "adaylar.json"), "w"), ensure_ascii=False, indent=1)
    # görsel denetim sayfası (B5): sorgu başına 3 aday, atıf ve lisansla
    base = "https://github.com/Mutemadiyennn/deutsch-werkstatt/releases/download/m1-foto/"
    parca = ["<!doctype html><meta charset=utf-8><title>M1 fotoğraf adayları</title><style>body{font:14px system-ui;margin:16px}"
             "section{border-top:1px solid #ccc;padding:8px 0}img{height:160px;margin:4px;border:1px solid #ddd}figure{display:inline-block;margin:0 8px;vertical-align:top;max-width:240px}"
             "figcaption{font-size:11px;color:#555}</style><h1>M1 fotoğraf adayları (#58 A10 → B5 seçim)</h1>"]
    for sorgu, yerler, adaylar in satir:
        parca.append(f"<section><h3>{html.escape(sorgu)}</h3><div>{html.escape(', '.join(yerler))}</div>")
        for a in adaylar:
            parca.append(f"<figure><img loading=lazy src='{a['dosya']}'><figcaption>{html.escape(a['lisans'])} · {html.escape(a['yazar'])} · "
                         f"<a href='{html.escape(a['sayfa'] or '')}'>kaynak</a> · {a['dosya']}</figcaption></figure>")
        if not adaylar: parca.append("<p><b>Aday yok</b> (sahne çizimi ya da yeni sorgu)</p>")
        parca.append("</section>")
    open(os.path.join(out, "secim.html"), "w").write("".join(parca))
    toplam = sum(len(a) for _, _, a in satir)
    print(f"bitti: {len(satir)} sorgu; {toplam} aday; adaysız {sum(1 for _, _, a in satir if not a)}; bayt {sum(x['bayt'] for _, _, a in satir for x in a)}", flush=True)

if __name__ == "__main__":
    main()
