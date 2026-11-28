"""[DENETİM-TASARIM] toplu sayfa: ekran görüntülerini altışarlı (3×2), etiketli sayfalara birleştirir.
Uzun (tam sayfa) görüntü 844 px'lik dilimlere bölünür; her dilim ayrı kare ("1/3").
  python3 toplu.py <düzen.json> <ham kök> <çıktı klasörü>
düzen.json: [{"ad": "01-kurulum", "baslik": "Giriş ve kurulum", "kareler": [["st/s-001-giris.png", "Giriş"], ["st/s-036-rota-yol.png", "Yol", [1, 2, 10]], ...]}, ...]
"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont

DUZEN, KOK, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
W = 480                      # kare genişliği (390 css px → 480)
VH = 844                     # css viewport yüksekliği
H = round(W * VH / 390)      # kare yüksekliği
ETIKET, BOSLUK, UST = 54, 18, 64
F = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
f_et, f_ust = ImageFont.truetype(F, 17), ImageFont.truetype(FB, 24)

def dilimler(yol):
    im = Image.open(yol).convert("RGB")
    olcek = im.width / 390
    dh = round(VH * olcek)
    n = max(1, -(-im.height // dh))
    if n > 1 and im.height - (n - 1) * dh < dh * 0.12: n -= 1  # artık şerit çok kısaysa son dilime katılır
    out = []
    for i in range(n):
        alt = im.height if i == n - 1 else (i + 1) * dh
        out.append(im.crop((0, i * dh, im.width, alt)))
    return out

def kaydet(sayfa_no, ad, baslik, kareler):
    cols, rows = 3, 2
    SW = cols * W + (cols + 1) * BOSLUK
    SH = UST + rows * (H + ETIKET) + (rows + 1) * BOSLUK
    s = Image.new("RGB", (SW, SH), (236, 236, 240))
    d = ImageDraw.Draw(s)
    d.text((BOSLUK, 18), f"T{sayfa_no:02d} · {baslik}", font=f_ust, fill=(20, 20, 30))
    for i, (im, et) in enumerate(kareler):
        c, r = i % cols, i // cols
        x = BOSLUK + c * (W + BOSLUK); y = UST + BOSLUK + r * (H + ETIKET + BOSLUK)
        d.rectangle((x, y, x + W, y + ETIKET), fill=(30, 34, 48))
        satirlar = [et[:44], et[44:88]] if len(et) > 44 else [et]
        for j, t in enumerate(satirlar): d.text((x + 8, y + 6 + j * 22), t, font=f_et, fill=(255, 255, 255))
        k = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
        s.paste(k, (x, y + ETIKET))
        d.rectangle((x, y + ETIKET, x + W, y + ETIKET + H), outline=(120, 120, 130))
    yol = os.path.join(OUT, f"T{sayfa_no:02d}-{ad}.jpg")
    s.save(yol, quality=86, optimize=True)
    return yol

def main():
    os.makedirs(OUT, exist_ok=True)
    duzen = json.load(open(DUZEN))
    no, dizin = 0, []
    for grup in duzen:
        kareler = []
        for kare in grup["kareler"]:
            dosya, et = kare[0], kare[1]
            sec = kare[2] if len(kare) > 2 else None   # isteğe bağlı: yalnız bu dilimler (1'den), uzun sayfalarda
            yol = os.path.join(KOK, dosya)
            if not os.path.exists(yol): print("yok:", yol); continue
            dl = dilimler(yol)
            for i, im in enumerate(dl):
                if sec and (i + 1) not in sec: continue
                kareler.append((im, et + (f" ({i + 1}/{len(dl)})" if len(dl) > 1 else "")))
        for i in range(0, len(kareler), 6):
            no += 1
            parca = kareler[i:i + 6]
            etk = [f"{no:02d}.{j + 1} {e}" for j, (_, e) in enumerate(parca)]
            yol = kaydet(no, grup["ad"], grup["baslik"] + (f" ({i // 6 + 1})" if len(kareler) > 6 else ""), [(im, e) for (im, _), e in zip(parca, etk)])
            dizin.append({"sayfa": f"T{no:02d}", "dosya": os.path.basename(yol), "baslik": grup["baslik"], "kareler": etk})
            print(yol)
    json.dump(dizin, open(os.path.join(OUT, "dizin.json"), "w"), ensure_ascii=False, indent=1)

if __name__ == "__main__":
    main()
