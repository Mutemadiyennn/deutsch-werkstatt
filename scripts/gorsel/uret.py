"""
PM-063 (#58 B14) cümle görseli üretimi — DENEME (1. adım). Secret'lar 19.11 19:05 UTC girildi (PM 7019220480). CI'da çalışır; anahtar yalnızca GitHub şifreli secret'ında.

Cloudflare Workers AI REST: POST /accounts/{hesap}/ai/run/@cf/black-forest-labs/flux-1-schnell
  - Hesap Workers Free, ödeme yöntemi yok (PM 7009256371): kota aşılırsa istek hata verir, ücret doğmaz. Kota hatasında
    (429 ya da "neuron" iletisi) iş durur, üretilmiş olanlar yine yüklenir.
  - Bütçe: en çok `--butce` nöron (varsayılan 3.500; PM: görsel için günde en çok 7.000). schnell 4 adım ≈ 58 nöron/görsel.
Girdi: content/v2/media/uretim/sahne-deneme.json (İÇ: `{ "<kart>:<örnek>": { de, sahne_en } }`).
Her sahne iki üslupla (PM-063: fotoğraf gerçekçi / yumuşak illüstrasyon), sabit tohumla üretilir.
Çıktı (depoya görsel girmez, D-103):
  - OUT_DIR/*.jpg ve OUT_DIR/galeri.html → GitHub Releases `m1-gorsel-deneme`
  - content/v2/media/uretim/deneme-kayit.json: her görselin kaydı (kaynak: uretim, sinif: acik, model, tohum, üslup, tarif)
Kullanım: python scripts/gorsel/uret.py OUT_DIR [--sinir N] [--butce NÖRON]
"""
from __future__ import annotations
import base64, hashlib, html, io, json, os, sys, time, urllib.error, urllib.request

KOK = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MODEL = "@cf/black-forest-labs/flux-1-schnell"
ADIM = 4
NORON = 58  # 4 adım, 1024×1024 tahmini (PM-063 hesabı); bütçe için üst sınır
USLUP = {
    "foto": "Warm, natural-light photorealistic photograph, landscape 4:3 composition, simple uncluttered background, everyday life in southern Germany. ",
    "cizim": "Soft gentle illustration with warm muted colors, clean shapes, landscape 4:3 composition, simple uncluttered background, everyday life in southern Germany. ",
}
SON = " Absolutely no text, letters, numbers, signs, logos, brand names, flags or uniforms anywhere in the image."

def tohum(anahtar: str, uslup: str) -> int:
    return int(hashlib.sha256(f"{anahtar}|{uslup}".encode()).hexdigest()[:8], 16) % 2_000_000_000

def uret(hesap: str, jeton: str, istem: str, seed: int) -> bytes:
    url = f"https://api.cloudflare.com/client/v4/accounts/{hesap}/ai/run/{MODEL}"
    govde = json.dumps({"prompt": istem, "steps": ADIM, "seed": seed}).encode()
    istek = urllib.request.Request(url, data=govde, method="POST", headers={"Authorization": f"Bearer {jeton}", "Content-Type": "application/json"})
    with urllib.request.urlopen(istek, timeout=120) as r:
        d = json.loads(r.read())
    if not d.get("success", True) or not (d.get("result") or {}).get("image"):
        raise RuntimeError(f"yanıt: {json.dumps(d)[:300]}")
    return base64.b64decode(d["result"]["image"])

def jpeg(veri: bytes) -> bytes:
    from PIL import Image
    im = Image.open(io.BytesIO(veri)).convert("RGB")
    im.thumbnail((1024, 1024))
    b = io.BytesIO(); im.save(b, "JPEG", quality=85, optimize=True, progressive=True)
    return b.getvalue()

def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "out"
    sinir = int(sys.argv[sys.argv.index("--sinir") + 1]) if "--sinir" in sys.argv else 10_000
    butce = int(sys.argv[sys.argv.index("--butce") + 1]) if "--butce" in sys.argv else 3500
    hesap, jeton = os.environ.get("CLOUDFLARE_ACCOUNT_ID", ""), os.environ.get("CF_AI_TOKEN", "")
    if not hesap or not jeton:
        print("::notice::CLOUDFLARE_ACCOUNT_ID / CF_AI_TOKEN yok; üretim atlandı."); return
    os.makedirs(out, exist_ok=True)
    sahneler = json.load(open(os.path.join(KOK, "content/v2/media/uretim/sahne-deneme.json")))
    kayit, harcanan, durdu = {}, 0, None
    for anahtar, s in list(sahneler.items())[:sinir]:
        if not s.get("sahne_en"):
            kayit[anahtar] = {"de": s.get("de"), "gorsel": None, "neden": "soyut: sahne yok"}; continue
        kayit[anahtar] = {"de": s["de"], "sahne_en": s["sahne_en"], "gorseller": []}
        for uslup, on in USLUP.items():
            if durdu: break
            if harcanan + NORON > butce: durdu = f"bütçe doldu ({harcanan}/{butce} nöron)"; break
            seed = tohum(anahtar, uslup)
            try:
                veri = jpeg(uret(hesap, jeton, on + s["sahne_en"] + SON, seed))
            except urllib.error.HTTPError as e:
                govde = e.read().decode(errors="replace")[:300]
                print(f"HATA {anahtar} {uslup}: HTTP {e.code} {govde}", flush=True)
                if e.code in (401, 403): durdu = f"yetki yok (HTTP {e.code}): jetonun 'Workers AI' izni gerekir"
                elif e.code == 429 or "neuron" in govde.lower(): durdu = f"kota (HTTP {e.code})"
                continue
            except Exception as e:
                print(f"HATA {anahtar} {uslup}: {e}", flush=True); continue
            harcanan += NORON
            ad = f"{anahtar.replace(':', '_').replace('lx_', '')}-{uslup}.jpg"
            open(os.path.join(out, ad), "wb").write(veri)
            kayit[anahtar]["gorseller"].append({"dosya": ad, "uslup": uslup, "kaynak": "uretim", "sinif": "acik", "model": MODEL, "adim": ADIM, "tohum": seed, "bayt": len(veri)})
            print("GORSEL " + json.dumps({"anahtar": anahtar, "uslup": uslup, "bayt": len(veri)}, ensure_ascii=False), flush=True)
            time.sleep(1)
        if durdu: print(f"::warning::durdu: {durdu}", flush=True); break
    json.dump({"surum": 1, "not": "PM-063 deneme. Görseller GitHub Releases m1-gorsel-deneme varlığıdır; depoya girmez. PM gözle onaylamadan hat kurulmaz.",
               "model": MODEL, "harcanan_noron_tahmini": harcanan, "durdu": durdu, "kayit": kayit},
              open(os.path.join(KOK, "content/v2/media/uretim/deneme-kayit.json"), "w"), ensure_ascii=False, indent=1)
    # galeri: her sahne için iki üslup yan yana, cümle ve tarifle
    p = ["<!doctype html><meta charset=utf-8><title>PM-063 deneme</title><style>body{font:14px system-ui;margin:16px}section{border-top:1px solid #ccc;padding:8px 0}"
         "img{width:46%;margin:1%;border:1px solid #ddd}small{color:#555}</style><h1>PM-063 cümle görseli denemesi (fotoğraf gerçekçi | illüstrasyon)</h1>"]
    for anahtar, k in kayit.items():
        p.append(f"<section><h3>{html.escape(anahtar)} — {html.escape(k.get('de') or '')}</h3><small>{html.escape(k.get('sahne_en') or k.get('neden') or '')}</small><div>")
        for g in k.get("gorseller", []): p.append(f"<img src='{g['dosya']}' alt='{g['uslup']}'>")
        p.append("</div></section>")
    open(os.path.join(out, "galeri.html"), "w").write("".join(p))
    n = sum(len(k.get("gorseller", [])) for k in kayit.values())
    print(f"bitti: {n} görsel; ~{harcanan} nöron; durdu: {durdu}", flush=True)

if __name__ == "__main__":
    main()
