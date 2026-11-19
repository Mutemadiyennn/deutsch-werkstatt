"""
PM-063 / B14 cümle görseli HATTI (PM 7020888298, 7020970126). Deneme (uret.py) bitti; üslup kararı: ÇİZİM (`cizim-v1`).

Girdi : content/v2/media/uretim/sahne-m1.json  (İÇ: `{ "<kart>:<örnek>": { de, sahne_en | null, neden? } }`)
Durum : content/v2/media/uretim/hat-kayit.json (dalda; her koşu günceller, kaldığı yerden sürer)
Çıktı : OUT_DIR/*.jpg (640 px, uygulamaya giden boy) + OUT_DIR/galeri-<koşu>.html → GitHub Releases `m1-gorsel`
        (depoya görsel girmez, D-103). Kayıt: kaynak: uretim, sinif: acik, model, uslup: cizim-v1, tarif, deneme.

Bütçe : günde en çok 7.000 nöron (policy.json); bir koşu `--butce` kadar harcar. Workers Free, ödeme yöntemi yok:
        kota dolarsa istek hata verir, ücret doğmaz; kota/yetki hatasında koşu durur, üretilenler yine kaydedilir.
Seçim : üretilen görsel `durum: "uretildi"`; qa ajanı galeriye bakıp `kabul` / `ret` (+ neden) yazar (ayrı adım).
        `ret` + düzeltilmiş tarif (`sahne_en_v2`) → en çok 2 yeniden üretim; sonra `null`.
Kullanım: python scripts/gorsel/hat.py OUT_DIR [--butce NÖRON] [--sinir N]
"""
from __future__ import annotations
import base64, html, io, json, os, sys, time, urllib.error, urllib.request, uuid

KOK = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SCHNELL, KLEIN = "@cf/black-forest-labs/flux-1-schnell", "@cf/black-forest-labs/flux-2-klein-4b"
# PM 7022002310-3: boy denemesi (boy.py) secim.env yazar; hat o gece onunla (512) sürer. Yoksa eski ayar (schnell, model boyu).
MODEL = os.environ.get("GORSEL_MODEL") or SCHNELL
EN_IST = int(os.environ.get("GORSEL_EN") or 0)     # 0: modelin varsayılan boyu (schnell 1024×1024)
BOY_IST = int(os.environ.get("GORSEL_BOY") or 0)
ADIM = 4
NORON = int(os.environ.get("GORSEL_NORON") or 175)  # 1024 schnell: 4 karo × (4,8 + 4 × 9,6) ≈ 173 (PM formülü; gözlenen ≈170)
BOY = 640           # uygulamaya giden kenar (PM 7020888298-1)
USLUP_SURUM = "cizim-v1"
USLUP = "Soft gentle illustration with warm muted colors, clean shapes, landscape 4:3 composition, simple uncluttered background, everyday life in southern Germany. "
SON = " Absolutely no text, letters, numbers, signs, logos, brand names, flags or uniforms anywhere in the image."
EN_COK_DENEME = 3   # ilk üretim + en çok 2 yeniden üretim
GIRDI = os.path.join(KOK, "content/v2/media/uretim/sahne-m1.json")
DURUM = os.path.join(KOK, "content/v2/media/uretim/hat-kayit.json")

def istek(hesap: str, jeton: str, model: str, istem: str, en: int = 0, boy: int = 0) -> bytes:
    """Workers AI görsel isteği. schnell: JSON (prompt, steps; "seed" kabul etmiyor); klein-4b: multipart (prompt, width, height)."""
    url = f"https://api.cloudflare.com/client/v4/accounts/{hesap}/ai/run/{model}"
    if model == KLEIN:
        sinir = uuid.uuid4().hex
        alan = [("prompt", istem)] + ([("width", en), ("height", boy)] if en and boy else [])
        govde = ("".join(f'--{sinir}\r\nContent-Disposition: form-data; name="{a}"\r\n\r\n{d}\r\n' for a, d in alan) + f"--{sinir}--\r\n").encode()
        tur = f"multipart/form-data; boundary={sinir}"
    else:
        govde = json.dumps({"prompt": istem, "steps": ADIM, **({"width": en, "height": boy} if en and boy else {})}).encode()
        tur = "application/json"
    r = urllib.request.urlopen(urllib.request.Request(url, data=govde, method="POST", headers={"Authorization": f"Bearer {jeton}", "Content-Type": tur}), timeout=120)
    ham = r.read()
    if r.headers.get("Content-Type", "").startswith("image/"):
        return ham
    d = json.loads(ham)
    img = (d.get("result") or {}).get("image")
    if not d.get("success", True) or not img:
        raise RuntimeError(f"yanıt: {json.dumps(d)[:300]}")
    return base64.b64decode(img)

def uret(hesap: str, jeton: str, istem: str) -> bytes:
    return istek(hesap, jeton, MODEL, istem, EN_IST, BOY_IST)

def jpeg(veri: bytes) -> bytes:
    from PIL import Image
    im = Image.open(io.BytesIO(veri)).convert("RGB")
    im.thumbnail((BOY, BOY))
    b = io.BytesIO(); im.save(b, "JPEG", quality=82, optimize=True, progressive=True)
    return b.getvalue()

def sira(sahneler: dict, durum: dict) -> list[tuple[str, str]]:
    """Üretilecekler: hiç denenmemiş sahneler, sonra `ret` + düzeltilmiş tarifli olanlar (deneme hakkı varsa)."""
    yeni, tekrar = [], []
    for k, s in sahneler.items():
        d = durum.get(k)
        if not s.get("sahne_en"):
            continue
        if d is None:
            yeni.append((k, s["sahne_en"]))
        elif d.get("durum") == "ret" and d.get("sahne_en_v2") and d.get("deneme", 1) < EN_COK_DENEME:
            tekrar.append((k, d["sahne_en_v2"]))
    return yeni + tekrar

def main(argv: list[str]) -> int:
    out = argv[1] if len(argv) > 1 else "out"
    butce = int(argv[argv.index("--butce") + 1]) if "--butce" in argv else 3500
    sinir = int(argv[argv.index("--sinir") + 1]) if "--sinir" in argv else 10_000
    hesap, jeton = os.environ.get("CLOUDFLARE_ACCOUNT_ID", ""), os.environ.get("CF_AI_TOKEN", "")
    if not hesap or not jeton:
        print("::notice::CLOUDFLARE_ACCOUNT_ID / CF_AI_TOKEN yok; üretim atlandı."); return 0
    os.makedirs(out, exist_ok=True)
    sahneler = json.load(open(GIRDI))
    kayit = json.load(open(DURUM)) if os.path.exists(DURUM) else {"surum": 1, "uslup": USLUP_SURUM, "model": MODEL, "kosular": [], "sahneler": {}}
    durum = kayit["sahneler"]
    # yokluk sahneleri (null) bir kez işaretlenir
    for k, s in sahneler.items():
        if not s.get("sahne_en") and k not in durum:
            durum[k] = {"de": s.get("de"), "durum": "null", "neden": s.get("neden") or "soyut: sahne yok"}
    kosu = time.strftime("%Y%m%d-%H%M", time.gmtime())
    harcanan, durdu, yeni = 0, None, []
    for k, tarif in sira(sahneler, durum)[:sinir]:
        if harcanan + NORON > butce:
            durdu = f"bütçe doldu ({harcanan}/{butce} nöron)"; break
        try:
            veri = jpeg(uret(hesap, jeton, USLUP + tarif + SON))
        except urllib.error.HTTPError as e:
            govde = e.read().decode(errors="replace")[:300]
            print(f"HATA {k}: HTTP {e.code} {govde}", flush=True)
            if e.code in (401, 403): durdu = f"yetki yok (HTTP {e.code})"; break
            if e.code == 429 or "neuron" in govde.lower(): durdu = f"kota (HTTP {e.code})"; break
            continue
        except Exception as e:
            print(f"HATA {k}: {e}", flush=True); continue
        harcanan += NORON
        onceki = durum.get(k) or {}
        deneme = onceki.get("deneme", 0) + 1
        ad = f"{k.replace(':', '_').replace('lx_', '')}-{USLUP_SURUM}-{deneme}.jpg"
        open(os.path.join(out, ad), "wb").write(veri)
        durum[k] = {"de": sahneler[k]["de"], "sahne_en": tarif, "durum": "uretildi", "dosya": ad, "deneme": deneme, "kosu": kosu,
                    "kaynak": "uretim", "sinif": "acik", "model": MODEL, "uslup": USLUP_SURUM, "adim": ADIM, **({"boyut": f"{EN_IST}x{BOY_IST}"} if EN_IST else {}), "bayt": len(veri),
                    **({"onceki_ret": onceki.get("neden")} if onceki.get("durum") == "ret" else {})}
        yeni.append(k)
        print("GORSEL " + json.dumps({"anahtar": k, "deneme": deneme, "bayt": len(veri)}, ensure_ascii=False), flush=True)
        time.sleep(0.5)
    kayit["kosular"].append({"kosu": kosu, "uretilen": len(yeni), "noron_tahmini": harcanan, "durdu": durdu})
    json.dump(kayit, open(DURUM, "w"), ensure_ascii=False, indent=1)
    # qa galerisi: bu koşunun görselleri, cümle ve tarifle
    p = [f"<!doctype html><meta charset=utf-8><title>B14 hat {kosu}</title><style>body{{font:14px system-ui;margin:16px}}section{{border-top:1px solid #ccc;padding:8px 0}}"
         f"img{{width:320px;border:1px solid #ddd}}small{{color:#555}}</style><h1>B14 cümle görselleri · {USLUP_SURUM} · koşu {kosu} · {len(yeni)} görsel</h1>"]
    for k in yeni:
        d = durum[k]
        p.append(f"<section id='{html.escape(k)}'><h3>{html.escape(k)} — {html.escape(d['de'] or '')}</h3><small>{html.escape(d['sahne_en'])}</small><div><img src='{d['dosya']}' alt=''></div></section>")
    open(os.path.join(out, f"galeri-{kosu}.html"), "w").write("".join(p))
    toplam = {s: sum(1 for d in durum.values() if d.get("durum") == s) for s in ("uretildi", "kabul", "ret", "null")}
    print(f"bitti: {len(yeni)} görsel; ~{harcanan} nöron; durdu: {durdu}; toplam {toplam}", flush=True)
    return 1 if durdu and durdu.startswith("yetki") else 0

if __name__ == "__main__":
    sys.exit(main(sys.argv))
