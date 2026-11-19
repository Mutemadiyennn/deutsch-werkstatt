"""
PM-061 / D-112 (#58 B12) 2. parça: kapalı medya rafını doldurma hattı. CI'da çalışır; anahtarlar yalnızca GitHub gizli
ayarlarında (PIXABAY_API_KEY, isteğe bağlı PEXELS_API_KEY; gizli depoya yazma MEDYA_DEPO_TOKEN ile iş akışında).

Girdi: açık hattın aday listesi (adaylar.json; kaynak/foto dalından) — adaysız ve 3'ten az adaylı sorgular, İÇ kısa
sorgusu varsa o. Çıktı (YALNIZCA gizli depoya, RAF_DIR):
  - foto/<sha16>.jpg (en uzun kenar 640 px), kayit.json (sorgu → aday: dosya, kaynak, sayfa, yazar, lisans, sinif: kapali),
    secim-kapali.html (B5 görsel denetimi; raf anahtarının arkasında), saglik.txt (Profil "Rafı sına").
Açık depo, Pages, CI yapıtı ve günlük: kapalı dosya ya da adı GİRMEZ; günlüğe yalnızca sayılar yazılır.
Kullanım: python scripts/raf/doldur.py ADAYLAR_JSON RAF_DIR [--sinir N]
"""
from __future__ import annotations
import hashlib, html, io, json, os, sys, time, urllib.error, urllib.parse, urllib.request

ADAY = 3
UA = "deutsch-werkstatt-raf/1.0 (egitim amacli, kisisel kullanim)"

def get(url: str, tekrar: int = 3) -> bytes:
    for k in range(tekrar):
        try:
            time.sleep(0.7)  # Pixabay: dakikada 100 istek
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r: return r.read()
        except urllib.error.HTTPError as e:
            if e.code == 429 and k < tekrar - 1: time.sleep(30 * (k + 1)); continue
            raise
        except Exception:
            if k == tekrar - 1: raise
            time.sleep(3 * (k + 1))
    raise RuntimeError("ulaşılamadı")

def pixabay(anahtar: str, sorgu: str) -> list[dict]:
    q = urllib.parse.urlencode({"key": anahtar, "q": sorgu[:100], "image_type": "photo", "safesearch": "true", "per_page": 10, "orientation": "horizontal"})
    d = json.loads(get(f"https://pixabay.com/api/?{q}"))
    return [{"kaynak": "Pixabay", "sayfa": h.get("pageURL"), "url": h.get("webformatURL"), "yazar": (h.get("user") or "bilinmiyor")[:80],
             "lisans": "Pixabay Content License", "sinif": "kapali"} for h in d.get("hits", []) if h.get("webformatURL")]

def kucult(veri: bytes) -> bytes:
    from PIL import Image
    im = Image.open(io.BytesIO(veri)).convert("RGB"); im.thumbnail((640, 640))
    b = io.BytesIO(); im.save(b, "JPEG", quality=82, optimize=True, progressive=True); return b.getvalue()

def main():
    adaylar_yol, raf = sys.argv[1], sys.argv[2]
    sinir = int(sys.argv[sys.argv.index("--sinir") + 1]) if "--sinir" in sys.argv else 10_000
    anahtar = os.environ.get("PIXABAY_API_KEY", "")
    if not anahtar: print("::notice::PIXABAY_API_KEY yok; doldurma atlandı."); return
    os.makedirs(os.path.join(raf, "foto"), exist_ok=True)
    acik = json.load(open(adaylar_yol))["sorgular"]
    kayit_yol = os.path.join(raf, "kayit.json")
    kayit = json.load(open(kayit_yol))["sorgular"] if os.path.exists(kayit_yol) else {}
    hedef = [s for s, v in acik.items() if len(v.get("adaylar", [])) < ADAY and len(kayit.get(s, {}).get("adaylar", [])) < ADAY][:sinir]
    yeni, hata = 0, 0
    for sorgu in hedef:
        aranan = acik[sorgu].get("kisa") or sorgu
        try: havuz = pixabay(anahtar, aranan)
        except Exception: hata += 1; continue
        ad_list = list(kayit.get(sorgu, {}).get("adaylar", []))
        for a in havuz:
            if len(ad_list) >= ADAY: break
            if any(x["sayfa"] == a["sayfa"] for x in ad_list): continue
            try: veri = kucult(get(a["url"]))
            except Exception: hata += 1; continue
            ad = f"{hashlib.sha256(veri).hexdigest()[:16]}.jpg"
            open(os.path.join(raf, "foto", ad), "wb").write(veri)
            ad_list.append({**{k: v for k, v in a.items() if k != "url"}, "dosya": ad, "bayt": len(veri)}); yeni += 1
        kayit[sorgu] = {"yerler": acik[sorgu].get("yerler", []), "adaylar": ad_list}
    json.dump({"surum": 1, "not": "Kapalı raf (D-112): sinif kapali; açık depoya, Pages'e, CI yapıtına girmez.", "sorgular": kayit}, open(kayit_yol, "w"), ensure_ascii=False, indent=1)
    open(os.path.join(raf, "saglik.txt"), "w").write("ok\n")
    p = ["<!doctype html><meta charset=utf-8><title>Kapalı raf adayları</title><style>body{font:14px system-ui;margin:16px}section{border-top:1px solid #ccc;padding:8px 0}img{height:160px;margin:4px}</style><h1>Kapalı raf adayları (B5 seçimi)</h1>"]
    for s, v in kayit.items():
        p.append(f"<section><h3>{html.escape(s)}</h3>")
        for a in v["adaylar"]: p.append(f"<figure style='display:inline-block'><img loading=lazy src='foto/{a['dosya']}'><figcaption>{html.escape(a['yazar'])} · {a['dosya']}</figcaption></figure>")
        p.append("</section>")
    open(os.path.join(raf, "secim-kapali.html"), "w").write("".join(p))
    # günlüğe yalnızca sayılar (açık deponun CI günlüğü herkese açık)
    print(f"raf: {len(hedef)} sorgu denendi; {yeni} yeni dosya; {hata} hata; toplam adaylı sorgu {sum(1 for v in kayit.values() if v['adaylar'])}")

if __name__ == "__main__":
    main()
