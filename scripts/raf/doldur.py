"""
PM-061 / D-112 (#58 B12) 2. parça: kapalı medya rafını doldurma hattı. CI'da çalışır; anahtarlar yalnızca GitHub gizli
ayarlarında (PIXABAY_API_KEY, isteğe bağlı PEXELS_API_KEY; gizli depoya yazma MEDYA_DEPO_TOKEN ile iş akışında).

Girdi: açık hattın aday listesi (adaylar.json; kaynak/foto dalından) — adaysız ve 3'ten az adaylı sorgular, İÇ kısa
sorgusu varsa o. Çıktı (YALNIZCA gizli depoya, RAF_DIR):
  - foto/<sha16>.jpg (en uzun kenar 640 px), kayit.json (sorgu → aday: dosya, kaynak, sayfa, yazar, lisans, sinif: kapali),
    secim-kapali.html (B5 görsel denetimi: gizli deponun GitHub arayüzünde ya da yerel kopyasında açılır; Pages'teki raf
    yalnızca `Authorization: Bearer` kabul ettiği için tarayıcıda açılmaz — bilerek), saglik.txt (Profil "Rafı sına").
Pixabay kuralları (API belgesi): insan ölçeğinde istek, sistematik toplu indirme yok, sıcak bağlantı yok (dosya kendi
sunucuna indirilir), sonuçlar 24 saat önbellek. Bu yüzden: koşu başına en çok `--sinir` (varsayılan 40) sorgu, bir sorgu
30 günde en çok bir kez aranır (`arandi`), zamanlanmış tetikleyici yok, kalıcı hatada (400/401/403, art arda 5 hata)
koşu durur ve iş KIRMIZI biter (yarım kayıt yine yazılır).
Açık depo, Pages, CI yapıtı ve günlük: kapalı dosya ya da adı GİRMEZ; günlüğe yalnızca sayılar yazılır.
Kullanım: python scripts/raf/doldur.py ADAYLAR_JSON RAF_DIR [--sinir N]
"""
from __future__ import annotations
import hashlib, html, io, json, os, sys, time, urllib.error, urllib.parse, urllib.request

ADAY = 3
SINIR = 40                  # koşu başına en çok aranan sorgu (sistematik toplu indirme yok)
YENIDEN_GUN = 30            # az sonuçlu sorgu en erken bu kadar gün sonra yeniden aranır
ART_ARDA_HATA = 5           # art arda bu kadar arama hatasında koşu durur
UA = "deutsch-werkstatt-raf/1.0 (egitim amacli, kisisel kullanim)"
bekle = time.sleep          # testte sıfırlanır

class KaliciHata(Exception):
    """Anahtar geçersiz/izin yok (400, 401, 403): yeniden denemek anlamsız; koşu durur"""

def get(url: str, tekrar: int = 2) -> bytes:
    for k in range(tekrar):
        try:
            bekle(0.7)  # Pixabay: 60 saniyede 100 istek
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r: return r.read()
        except urllib.error.HTTPError as e:
            if e.code in (400, 401, 403): raise KaliciHata(str(e.code)) from None
            if e.code == 429 and k < tekrar - 1: bekle(61); continue
            raise
        except KaliciHata: raise
        except Exception:
            if k == tekrar - 1: raise
            bekle(3)
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

def main(argv: list[str] | None = None, simdi: float | None = None) -> int:
    argv = sys.argv[1:] if argv is None else argv
    adaylar_yol, raf = argv[0], argv[1]
    sinir = int(argv[argv.index("--sinir") + 1]) if "--sinir" in argv else SINIR
    anahtar = os.environ.get("PIXABAY_API_KEY", "")
    if not anahtar: print("::notice::PIXABAY_API_KEY yok; doldurma atlandı."); return 0
    simdi = time.time() if simdi is None else simdi
    os.makedirs(os.path.join(raf, "foto"), exist_ok=True)
    acik = json.load(open(adaylar_yol))["sorgular"]
    kayit_yol = os.path.join(raf, "kayit.json")
    kayit = json.load(open(kayit_yol))["sorgular"] if os.path.exists(kayit_yol) else {}
    def yakin_arandi(s: str) -> bool:
        t = kayit.get(s, {}).get("arandi")
        return bool(t) and simdi - time.mktime(time.strptime(t, "%Y-%m-%d")) < YENIDEN_GUN * 86400
    hedef = [s for s, v in acik.items() if len(v.get("adaylar", [])) < ADAY and len(kayit.get(s, {}).get("adaylar", [])) < ADAY and not yakin_arandi(s)][:sinir]
    bugun = time.strftime("%Y-%m-%d", time.gmtime(simdi))
    yeni, hata, art_arda, durdu = 0, 0, 0, ""
    for sorgu in hedef:
        aranan = acik[sorgu].get("kisa") or sorgu
        try: havuz = pixabay(anahtar, aranan); art_arda = 0
        except KaliciHata as e: durdu = f"Pixabay {e} (anahtar ya da izin)"; break
        except Exception:
            hata += 1; art_arda += 1
            if art_arda >= ART_ARDA_HATA: durdu = f"art arda {art_arda} arama hatası"; break
            continue
        ad_list = list(kayit.get(sorgu, {}).get("adaylar", []))
        for a in havuz:
            if len(ad_list) >= ADAY: break
            if any(x["sayfa"] == a["sayfa"] for x in ad_list): continue
            try: veri = kucult(get(a["url"]))
            except Exception: hata += 1; continue
            ad = f"{hashlib.sha256(veri).hexdigest()[:16]}.jpg"
            open(os.path.join(raf, "foto", ad), "wb").write(veri)
            ad_list.append({**{k: v for k, v in a.items() if k != "url"}, "dosya": ad, "bayt": len(veri)}); yeni += 1
        kayit[sorgu] = {"yerler": acik[sorgu].get("yerler", []), "adaylar": ad_list, "arandi": bugun}
    json.dump({"surum": 1, "not": "Kapalı raf (D-112): sinif kapali; açık depoya, Pages'e, CI yapıtına girmez.", "sorgular": kayit}, open(kayit_yol, "w"), ensure_ascii=False, indent=1)
    open(os.path.join(raf, "saglik.txt"), "w").write("ok\n")
    p = ["<!doctype html><meta charset=utf-8><title>Kapalı raf adayları</title><style>body{font:14px system-ui;margin:16px}section{border-top:1px solid #ccc;padding:8px 0}img{height:160px;margin:4px}</style><h1>Kapalı raf adayları (B5 seçimi)</h1>"]
    for s, v in kayit.items():
        p.append(f"<section><h3>{html.escape(s)}</h3>")
        for a in v["adaylar"]: p.append(f"<figure style='display:inline-block'><img loading=lazy src='foto/{a['dosya']}'><figcaption>{html.escape(a['yazar'])} · {a['dosya']}</figcaption></figure>")
        p.append("</section>")
    open(os.path.join(raf, "secim-kapali.html"), "w").write("".join(p))
    # günlüğe yalnızca sayılar (açık deponun CI günlüğü herkese açık)
    print(f"raf: {len(hedef)} sorgu hedef; {yeni} yeni dosya; {hata} hata; toplam adaylı sorgu {sum(1 for v in kayit.values() if v['adaylar'])}")
    if durdu: print(f"::error::raf doldurma durdu: {durdu}; o ana kadarki kayıt yazıldı."); return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())
