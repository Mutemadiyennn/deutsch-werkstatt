"""
B14 ikinci kaynak ölçümü (PM 7042126990-3): aynı FLUX.1-schnell (Apache-2.0) GitHub'ın standart koşucusunda, ekran kartı olmadan,
nicemlenmiş (GGUF Q4_0) sürümle stable-diffusion.cpp üzerinden. Yalnız ölçüm: 8 deneme sahnesi, 768×576, 4 adım.
Her görsel için süre ve en yüksek bellek (/usr/bin/time -v) yazılır; galeri Cloudflare çıktısının yanına koyar.
Kullanım: python scripts/gorsel/cpu_olcum.py <sd ikilisi> <model klasörü> <çıktı klasörü> [--sinir-dk 50]
"""
from __future__ import annotations
import html, json, os, re, subprocess, sys, time, unicodedata
sys.path.insert(0, os.path.dirname(__file__))
from hat import USLUP, SON  # noqa: E402  aynı üslup metni (cizim-v1)
from boy import SAHNELER, DENEME_URL, KOK  # noqa: E402

EN, BOY, ADIM = 768, 576, 4

def ascii_ad(k: str) -> str:
    s = unicodedata.normalize("NFKD", k.replace("lx:", "").replace(":", "_"))
    return "".join(c for c in s if not unicodedata.combining(c))

def main(argv: list[str]) -> int:
    sd, mk, out = argv[1], argv[2], argv[3]
    sinir = float(argv[argv.index("--sinir-dk") + 1]) if "--sinir-dk" in argv else 50.0
    os.makedirs(out, exist_ok=True)
    sahne = json.load(open(os.path.join(KOK, "content/v2/media/uretim/sahne-deneme.json")))
    bas, sonuc = time.time(), []
    for k in SAHNELER:
        if (time.time() - bas) / 60 > sinir:
            sonuc.append({"sahne": k, "atlandi": f"süre sınırı ({sinir} dk)"}); continue
        png = os.path.join(out, f"cpu-{ascii_ad(k)}.png")
        kmt = ["/usr/bin/time", "-v", sd, "--diffusion-model", f"{mk}/flux1-schnell-Q4_0.gguf", "--vae", f"{mk}/ae.safetensors",
               "--clip_l", f"{mk}/clip_l.safetensors", "--t5xxl", f"{mk}/t5xxl-Q4_0.gguf", "-p", USLUP + sahne[k]["sahne_en"] + SON,
               "--cfg-scale", "1.0", "--sampling-method", "euler", "--steps", str(ADIM), "-W", str(EN), "-H", str(BOY),
               "--seed", "42", "-t", str(os.cpu_count() or 4), "-o", png]
        t0 = time.time()
        r = subprocess.run(kmt, capture_output=True, text=True)
        sure = time.time() - t0
        rss = re.search(r"Maximum resident set size \(kbytes\): (\d+)", r.stderr)
        k_ = {"sahne": k, "sn": round(sure, 1), "en_cok_bellek_mb": round(int(rss.group(1)) / 1024) if rss else None, "kod": r.returncode}
        if r.returncode == 0 and os.path.exists(png):
            from PIL import Image
            jpg = png[:-4] + ".jpg"; Image.open(png).convert("RGB").save(jpg, "JPEG", quality=85); os.remove(png)
            k_["dosya"] = os.path.basename(jpg)
        else:
            k_["hata"] = (r.stderr or r.stdout)[-400:]
        print(json.dumps(k_, ensure_ascii=False), flush=True)
        sonuc.append(k_)
    olculen = [s for s in sonuc if s.get("dosya")]
    ort = round(sum(s["sn"] for s in olculen) / len(olculen), 1) if olculen else None
    ozet = {"model": "FLUX.1-schnell GGUF Q4_0 (stable-diffusion.cpp, CPU)", "boy": f"{EN}x{BOY}", "adim": ADIM, "cpu": os.cpu_count(),
            "gorsel_basina_ort_sn": ort, "en_cok_bellek_mb": max((s["en_cok_bellek_mb"] or 0) for s in sonuc) if sonuc else None,
            "toplam_dk": round((time.time() - bas) / 60, 1), "sonuc": sonuc}
    json.dump(ozet, open(os.path.join(out, "cpu-ozet.json"), "w"), ensure_ascii=False, indent=1)
    stil = ("body{font:14px system-ui;margin:16px;background:#f6f5f2}section{border-top:1px solid #ccc;padding:10px 0}"
            ".sira{display:flex;gap:14px;flex-wrap:wrap}.kart{background:#fff;border:1px solid #e3e0da;border-radius:16px;padding:18px}"
            ".kart img{display:block;width:323px;aspect-ratio:3/2;object-fit:cover;border-radius:12px}small{color:#555}b{display:block;margin-bottom:6px}")
    p = [f"<!doctype html><meta charset=utf-8><meta name=viewport content='width=device-width'><title>B14 CPU ölçümü</title><style>{stil}</style>",
         f"<h1>B14 CPU ölçümü (yalnız ölçüm)</h1><p>Solda Cloudflare Workers AI (flux-1-schnell 1024×1024), sağda aynı model GitHub koşucusunda, ekran kartı yok "
         f"(GGUF Q4_0, {EN}×{BOY}, {ADIM} adım, {os.cpu_count()} çekirdek). Görsel başına ortalama {ort} sn; en yüksek bellek {ozet['en_cok_bellek_mb']} MB. "
         f"Gösterim boyu kart içi 323 CSS px, 3:2.</p>"]
    for s in sonuc:
        k = s["sahne"]; de = html.escape(sahne[k]["de"])
        sag = (f"<img src='{s['dosya']}' alt='' loading=lazy><small>{s['sn']} sn · {s['en_cok_bellek_mb']} MB</small>" if s.get("dosya")
               else f"<small>{html.escape(s.get('atlandi') or 'hata: ' + s.get('hata', '')[:160])}</small>")
        p.append(f"<section><h3>{html.escape(k)} — {de}</h3><div class='sira'>"
                 f"<div class='kart'><b>Cloudflare</b><img src='{DENEME_URL}{ascii_ad(k)}-cizim.jpg' alt='' loading=lazy></div>"
                 f"<div class='kart'><b>GitHub CPU</b>{sag}</div></div></section>")
    open(os.path.join(out, "galeri-cpu.html"), "w").write("".join(p))
    print(f"bitti: ortalama {ort} sn/görsel; en çok bellek {ozet['en_cok_bellek_mb']} MB; toplam {ozet['toplam_dk']} dk", flush=True)
    return 0

if __name__ == "__main__":
    sys.exit(main(sys.argv))
