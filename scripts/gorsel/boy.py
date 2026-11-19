"""
B14 BOYUT DENEMESİ (PM 7022002310-3): aynı 8 deneme sahnesi küçük boylarda yeniden üretilir; 1024 sürümleri elde
(Releases `m1-gorsel-deneme`). Galeri üç (ya da daha çok) boyu UYGULAMADAKİ GERÇEK GÖSTERİM BOYUNDA yan yana koyar:
Bahçe kartında görsel 3:2, kırpılarak (object-fit: cover); iPhone 15'te kart içi genişlik 323 CSS px (3x ekran → 969 px),
16 Pro Max'te 370 CSS px.

Adaylar (Workers AI fiyat tablosu, 512×512 karo başına):
  - flux-1-schnell : 4,8 nöron/karo + 9,6 nöron/adım × karo (PM formülü); boy parametresi belgelerde yok → önce yoklanır.
                     Dönen görsel istenen boyda değilse ya da istek hata verirse bu aday atlanır (ücret yok: Workers Free).
  - flux-2-klein-4b: çıkış karosu başına 26,05 nöron, sabit 4 adım; width/height destekli (multipart).
Bütçe: --butce kadar (gece payından); tahmin üstten (karo = her kenar 512'ye yukarı yuvarlanır).
Çıktı: OUT_DIR/boy-*.jpg (özgün boyda, yalnızca JPEG'e çevrilir) + OUT_DIR/galeri-boy-<koşu>.html → Releases `m1-gorsel`;
       OUT_DIR/secim.env: hattın bu gece 512'de süreceği model (schnell 512 çalışıyorsa o, yoksa klein-4b 512).
Kullanım: python scripts/gorsel/boy.py OUT_DIR [--butce NÖRON]
"""
from __future__ import annotations
import html, io, json, math, os, sys, time, urllib.error

KOK = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from hat import USLUP, SON, istek, SCHNELL, KLEIN  # noqa: E402  aynı üslup metni (cizim-v1) ve istek

SAHNELER = ["lx:Brot:2", "lx:Apfel:1", "lx:Käse:1", "lx:Semmel:4", "lx:Arzt:2", "lx:Termin:2", "lx:Uhr:3", "lx:warten:2"]
DENEME_URL = "https://github.com/Mutemadiyennn/deutsch-werkstatt/releases/download/m1-gorsel-deneme/"
BOYLAR = [(512, 512), (768, 576)]

def karo(en: int, boy: int) -> int:
    return math.ceil(en / 512) * math.ceil(boy / 512)

def maliyet(model: str, en: int, boy: int) -> int:
    k = karo(en, boy)
    return math.ceil(k * (4.8 + 4 * 9.6)) if model == SCHNELL else math.ceil(k * 26.05)

def jpeg(veri: bytes) -> tuple[bytes, tuple[int, int]]:
    from PIL import Image
    im = Image.open(io.BytesIO(veri)).convert("RGB")
    b = io.BytesIO(); im.save(b, "JPEG", quality=82, optimize=True, progressive=True)
    return b.getvalue(), im.size

def main(argv: list[str]) -> int:
    out = argv[1] if len(argv) > 1 else "out"
    butce = int(argv[argv.index("--butce") + 1]) if "--butce" in argv else 2500
    hesap, jeton = os.environ.get("CLOUDFLARE_ACCOUNT_ID", ""), os.environ.get("CF_AI_TOKEN", "")
    if not hesap or not jeton:
        print("::notice::anahtar yok; boy denemesi atlandı"); return 0
    os.makedirs(out, exist_ok=True)
    sahne = json.load(open(os.path.join(KOK, "content/v2/media/uretim/sahne-deneme.json")))
    kosu = time.strftime("%Y%m%d-%H%M", time.gmtime())
    harcanan, sonuc, notlar = 0, {}, []
    calisan = {}  # (model, en, boy) -> True/False (yoklama sonucu)
    adaylar = [(SCHNELL, *b) for b in BOYLAR] + [(KLEIN, *b) for b in BOYLAR]
    for k in SAHNELER:
        istem = USLUP + sahne[k]["sahne_en"] + SON
        for model, en, boy in adaylar:
            if calisan.get((model, en, boy)) is False:
                continue
            m = maliyet(model, en, boy)
            if harcanan + m > butce:
                notlar.append(f"bütçe doldu: {k} {model.split('/')[-1]} {en}×{boy} atlandı"); continue
            try:
                veri, gercek = jpeg(istek(hesap, jeton, model, istem, en, boy))
            except urllib.error.HTTPError as e:
                g = e.read().decode(errors="replace")[:200]
                print(f"HATA {k} {model} {en}x{boy}: HTTP {e.code} {g}", flush=True)
                if e.code in (401, 403, 429) or "neuron" in g.lower():
                    notlar.append(f"durdu: HTTP {e.code}"); break
                calisan[(model, en, boy)] = False; notlar.append(f"{model.split('/')[-1]} {en}×{boy}: HTTP {e.code} {g[:120]}"); continue
            except Exception as e:
                print(f"HATA {k} {model} {en}x{boy}: {e}", flush=True); calisan[(model, en, boy)] = False; continue
            harcanan += m
            if gercek != (en, boy):
                # model boyu yok saydı (ör. hep 1024 döndü): aday düşer, maliyet 1024 sayılır
                calisan[(model, en, boy)] = False
                notlar.append(f"{model.split('/')[-1]} {en}×{boy} istendi, {gercek[0]}×{gercek[1]} döndü → boy desteklenmiyor")
                harcanan += maliyet(model, *gercek) - m
                continue
            calisan[(model, en, boy)] = True
            ad = f"boy-{k.replace(':', '_').replace('lx_', '')}-{model.split('/')[-1]}-{en}x{boy}.jpg"
            open(os.path.join(out, ad), "wb").write(veri)
            sonuc.setdefault(k, []).append({"model": model, "en": en, "boy": boy, "dosya": ad, "bayt": len(veri), "noron": m})
            print("BOY " + json.dumps({"k": k, "model": model, "boy": f"{en}x{boy}", "bayt": len(veri)}, ensure_ascii=False), flush=True)
            time.sleep(0.5)
        else:
            continue
        break
    # hattın 512 seçimi: önce schnell (onaylı üslup), yoksa klein-4b
    secim = next(((m, 512, 512) for m in (SCHNELL, KLEIN) if calisan.get((m, 512, 512))), None)
    with open(os.path.join(out, "secim.env"), "w") as f:
        if secim:
            f.write(f"GORSEL_MODEL={secim[0]}\nGORSEL_EN=512\nGORSEL_BOY=512\nGORSEL_NORON={maliyet(*secim)}\n")
    # galeri: uygulamadaki gösterim boyu (kart içi 323 CSS px, 3:2, cover) ve 16 Pro Max (370 px)
    stil = ("body{font:14px system-ui;margin:16px;background:#f6f5f2}section{border-top:1px solid #ccc;padding:10px 0}"
            ".sira{display:flex;gap:14px;flex-wrap:wrap}.kart{background:#fff;border:1px solid #e3e0da;border-radius:16px;padding:18px}"
            ".kart img{display:block;width:323px;aspect-ratio:3/2;object-fit:cover;border-radius:12px}.genis img{width:370px}"
            "small{color:#555}b{display:block;margin-bottom:6px}")
    p = [f"<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'><title>B14 boy denemesi {kosu}</title><style>{stil}</style>"
         f"<h1>B14 boy denemesi · koşu {kosu}</h1><p>Her görsel Bahçe kartındaki gerçek gösterim boyunda: 323 CSS px genişlik (iPhone 15 kart içi), 3:2 kırpma. "
         f"Telefonda açarsan 3x ekranda gerçek görünümü verir. Alt satır 16 Pro Max genişliği (370 px). Tahmini harcama: {harcanan} nöron.</p>"
         f"<p><small>{'<br>'.join(html.escape(n) for n in notlar) or 'not yok'}</small></p>"]
    for k in SAHNELER:
        de = html.escape(sahne[k]["de"])
        hucre = [("flux-1-schnell 1024×1024 (deneme, elde)", DENEME_URL + k.replace("lx:", "").replace(":", "_") + "-cizim.jpg", "≈173 nöron")]
        hucre += [(f"{r['model'].split('/')[-1]} {r['en']}×{r['boy']}", r["dosya"], f"≈{r['noron']} nöron · {r['bayt'] // 1024} KB") for r in sonuc.get(k, [])]
        for sinif in ("", " genis"):
            p.append(f"<section class='{sinif.strip()}'><h3>{html.escape(k)} — {de}</h3><div class='sira'>" if not sinif else "<div class='sira genis'>")
            p += [f"<div class='kart{sinif}'><b>{html.escape(a)}</b><img src='{html.escape(s)}' alt='' loading=lazy><small>{html.escape(n)}</small></div>" for a, s, n in hucre]
            p.append("</div>" + ("</section>" if sinif else ""))
    open(os.path.join(out, f"galeri-boy-{kosu}.html"), "w").write("".join(p))
    json.dump({"kosu": kosu, "harcanan": harcanan, "notlar": notlar, "sonuc": sonuc, "secim": secim}, open(os.path.join(out, "boy-ozet.json"), "w"), ensure_ascii=False, indent=1)
    print(f"bitti: ~{harcanan} nöron; seçim {secim}; notlar {notlar}", flush=True)
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv))
