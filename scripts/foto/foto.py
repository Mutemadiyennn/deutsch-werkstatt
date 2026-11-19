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

Kullanım: python scripts/foto/foto.py OUT_DIR [--sinir N] [--yalniz-eksik] [--sure DAKIKA]
  Adaysız uzun sorgu için içerik kelimelerinden kısa yedek sorgular denenir (aday kaydında `sorgu`, B5 sayfasında işaretli).
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

SON: dict[str, float] = {}
ARALIK = {"upload.wikimedia.org": 1.5, "commons.wikimedia.org": 0.7, "api.openverse.org": 4.0}

def get(url: str, tekrar: int = 4) -> bytes:
    host = urllib.parse.urlparse(url).hostname or ""
    for k in range(tekrar):
        try:
            # ana makine başına aralık: Commons küçük resimleri ve anahtarsız Openverse hızlı istekte 429/403 verir
            bekle = SON.get(host, 0) + ARALIK.get(host, 0.7) - time.time()
            if bekle > 0: time.sleep(bekle)
            SON[host] = time.time()
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
                return r.read()
        except Exception as e:
            if k == tekrar - 1: raise RuntimeError(f"{url[:120]}: {e}") from e
            # 429: sunucunun istediği kadar (yoksa 30, 60, 90 sn) beklenir; ilk turda 24 sorgu bundan boş kaldı
            ra = getattr(e, "headers", None) and e.headers.get("Retry-After")
            time.sleep(min(int(ra), 120) if ra and ra.isdigit() else (30 * (k + 1) if getattr(e, "code", 0) == 429 else 3 * (k + 1)))
    raise RuntimeError("ulaşılamadı")

def temiz(s: str | None) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html.unescape(s or ""))).strip()

def lisans_uygun(ad: str) -> bool:
    return bool(ad) and bool(UYGUN.match(ad.strip())) and not YASAK.search(ad)

def commons(sorgu: str, n: int = 10) -> list[dict]:
    q = urllib.parse.urlencode({"action": "query", "format": "json", "generator": "search", "gsrsearch": f"{sorgu} filetype:bitmap",
                                "gsrnamespace": 6, "gsrlimit": n, "prop": "imageinfo", "iiprop": "url|extmetadata|size|mime", "iiurlwidth": 960})
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

DOLGU = {"a", "an", "the", "on", "in", "at", "with", "without", "of", "for", "into", "to", "from", "by", "and", "or", "his", "her",
         "their", "two", "three", "person", "people", "man", "woman", "someone", "smiling", "small", "big", "new", "empty"}

def kisalar(sorgu: str) -> list[str]:
    """Uzun sahne sorgusu Commons'ta tüm kelimeleri aradığından boş döner; içerik kelimelerinden kısa yedekler (#58 A10, 129 adaysız)"""
    w = [x for x in re.findall(r"[a-z]+", sorgu.lower()) if x not in DOLGU]
    aday = [w[-3:], w[:1] + w[-1:], w[-2:], w[:2]]
    out = []
    for a in aday:
        q = " ".join(a)
        if len(a) >= 2 and q != sorgu and q not in out: out.append(q)
    return out

def topla(sorgu: str, once_openverse: bool = False) -> tuple[list[dict], str | None]:
    """Commons + Openverse. Commons'ta daha önce aday çıkmayan sorguda Openverse önce (PM 19.11: adaysız sorgular önce)"""
    havuz, hata = [], None
    kaynaklar = [openverse, commons] if once_openverse else [commons, openverse]
    for f in kaynaklar:
        if len(havuz) >= ADAY: break
        try: havuz += f(sorgu)
        except Exception as e: hata = f"{f.__name__}: {e}"
    return havuz, hata

def kisa_sorgular() -> dict[str, str]:
    """İÇ'in elle yazdığı kısa İngilizce sorgular (PM 19.11 madde 2): content/v2/media/foto/kisa-sorgu.json = {"<sorgu>": "<2–3 kelime>"}"""
    try: return {k: v for k, v in json.load(open(os.path.join(KOK, "content/v2/media/foto/kisa-sorgu.json"))).items() if isinstance(v, str) and v.strip()}
    except Exception: return {}

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

# dosya → Releases sürümü (m1-foto 1000 varlık sınırında doldu; yeni dosyalar m1-foto-2)
VARLIK: dict[str, str] = {}

def yaz(out, kayit, satir, onceki):
    """adaylar.json ve secim.html (ara kayıt: zaman aşımında iş kaybolmaz; işlenmemiş sorgular önceki kayıttan)"""
    kayit = {**{k: v for k, v in onceki.items() if k not in kayit}, **kayit}
    hedef = os.path.join(KOK, "content/v2/media/foto")
    os.makedirs(hedef, exist_ok=True)
    json.dump({"surum": 1, "not": "Görseller GitHub Releases m1-foto varlığıdır; depoya girmez. Seçim #58 B5 görsel denetimiyle (secim.json).",
               "sorgular": kayit}, open(os.path.join(hedef, "adaylar.json"), "w"), ensure_ascii=False, indent=1)
    # görsel denetim sayfası (B5): sorgu başına 3 aday, atıf ve lisansla
    base = lambda d: f"https://github.com/Mutemadiyennn/deutsch-werkstatt/releases/download/{VARLIK.get(d, 'm1-foto-2')}/"
    parca = ["<!doctype html><meta charset=utf-8><title>M1 fotoğraf adayları</title><style>body{font:14px system-ui;margin:16px}"
             "section{border-top:1px solid #ccc;padding:8px 0}img{height:160px;margin:4px;border:1px solid #ddd}figure{display:inline-block;margin:0 8px;vertical-align:top;max-width:240px}"
             "figcaption{font-size:11px;color:#555}</style><h1>M1 fotoğraf adayları (#58 A10 → B5 seçim)</h1>"]
    for sorgu, yerler, adaylar in satir:
        k = kayit[sorgu].get("kisa")
        parca.append(f"<section><h3>{html.escape(sorgu)}</h3><div>{html.escape(', '.join(yerler))}</div>"
                     + (f"<div><i>Kısa sorguyla bulundu: {html.escape(k)} — sahneye uyuyor mu dikkat</i></div>" if k else ""))
        for a in adaylar:
            parca.append(f"<figure><img loading=lazy src='{base(a['dosya'])}{a['dosya']}'><figcaption>{html.escape(a['lisans'])} · {html.escape(a['yazar'])} · "
                         f"<a href='{html.escape(a['sayfa'] or '')}'>kaynak</a> · {a['dosya']}</figcaption></figure>")
        if not adaylar: parca.append("<p><b>Aday yok</b> (sahne çizimi ya da yeni sorgu)</p>")
        parca.append("</section>")
    open(os.path.join(out, "secim.html"), "w").write("".join(parca))

def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "out"
    sinir = int(sys.argv[sys.argv.index("--sinir") + 1]) if "--sinir" in sys.argv else 10_000
    os.makedirs(out, exist_ok=True)
    q = sorgular()
    print(f"sorgu: {len(q)}", flush=True)
    kayit, satir = {}, []
    # --yalniz-eksik: önceki adaylar.json'da 3 adayı olan sorgu yeniden aranmaz (görselleri Releases'te durur)
    onceki = {}
    if "--yalniz-eksik" in sys.argv:
        try: onceki = json.load(open(os.path.join(KOK, "content/v2/media/foto/adaylar.json")))["sorgular"]
        except Exception: onceki = {}
    # Releases'te bulunmayan aday dosyası (sürüm başına 1000 varlık sınırı, yarıda kalan yükleme) yok sayılır; sorgu yeniden aranır
    varlik_dosya = os.environ.get("VARLIK")
    if varlik_dosya and os.path.exists(varlik_dosya):
        satirlar = [x.split("\t") for x in open(varlik_dosya).read().splitlines() if "\t" in x]
        VARLIK.update({ad: tag for tag, ad in satirlar if ad not in VARLIK})
        var = set(VARLIK)
        if var:
            for k, v in onceki.items():
                v["adaylar"] = [a for a in v.get("adaylar", []) if a.get("dosya") in var]
    elle = kisa_sorgular()
    sure = float(sys.argv[sys.argv.index("--sure") + 1]) if "--sure" in sys.argv else 140.0
    basla = time.time()
    # sıra: adaysız sorgular, sonra eksikler, sonra yeniler (PM 19.11); süre dolunca kalanlar önceki kayıtla yazılır
    def oncelik(kv):
        e = onceki.get(kv[0])
        return 2 if e is None else (0 if not e["adaylar"] else 1)
    for n, (sorgu, yerler) in enumerate(sorted(list(q.items())[:sinir], key=oncelik)):
        eski = onceki.get(sorgu)
        if (time.time() - basla) / 60 > sure:
            if eski: kayit[sorgu] = {**eski, "yerler": yerler}; satir.append((sorgu, yerler, eski["adaylar"]))
            continue
        if eski and len(eski["adaylar"]) >= ADAY:
            kayit[sorgu] = {**eski, "yerler": yerler}; satir.append((sorgu, yerler, eski["adaylar"])); continue
        adaylar, hata, kisa = list((eski or {}).get("adaylar", [])), None, None
        try:
            bos_onceden = eski is not None and not eski["adaylar"]
            yedek = ([elle[sorgu]] if sorgu in elle else []) + [x for x in kisalar(sorgu) if x != elle.get(sorgu)]
            for i, sq in enumerate([sorgu] + yedek):
                if len(adaylar) >= ADAY: break
                havuz, h = topla(sq, once_openverse=bos_onceden); hata = h or hata
                once = len(adaylar)
                for a in havuz:
                    if len(adaylar) >= ADAY: break
                    if any(x.get("sayfa") == a.get("sayfa") for x in adaylar): continue
                    try:
                        veri = kucult(get(a["url"]))
                    except Exception as e:
                        hata = str(e)[:160]; continue
                    h = hashlib.sha256(veri).hexdigest()[:16]
                    ad = f"{h}.jpg"
                    if any(x["dosya"] == ad for x in adaylar): continue
                    open(os.path.join(out, ad), "wb").write(veri)
                    adaylar.append({**{k: v for k, v in a.items() if k != "url"}, "dosya": ad, "bayt": len(veri), **({"sorgu": sq} if i else {})})
                if i and len(adaylar) > once: kisa = sq
        except Exception as e:
            hata = str(e)[:200]
        kayit[sorgu] = {"yerler": yerler, "adaylar": adaylar, **({"kisa": kisa} if kisa else {}), **({"hata": hata} if hata and not adaylar else {})}
        satir.append((sorgu, yerler, adaylar))
        print("FOTO " + json.dumps({"sorgu": sorgu, "aday": len(adaylar), "kisa": kisa, "hata": hata}, ensure_ascii=False), flush=True)
        if n % 10 == 9: yaz(out, kayit, satir, onceki)
    yaz(out, kayit, satir, onceki)
    toplam = sum(len(a) for _, _, a in satir)
    print(f"bitti: {len(satir)} sorgu; {toplam} aday; adaysız {sum(1 for _, _, a in satir if not a)}; bayt {sum(x['bayt'] for _, _, a in satir for x in a)}", flush=True)

if __name__ == "__main__":
    main()
