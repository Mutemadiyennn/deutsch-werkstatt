"""
B12 3. parça: seçilmiş AÇIK fotoğrafların uygulama kaydı (content/v2/media/foto/acik.json).
Girdi: content/v2/media/foto/secim.json (main; İÇ/qa seçimi) + kaynak/foto dalındaki adaylar.json (atıf) ve varlik.json
(dosya → Releases sürümü). Çıktı yalnızca seçilen ve lisansı açık (CC0, kamu malı, CC BY, CC BY-SA) adayları içerir.
Kapalı (sinif: kapali) dosya burada yer almaz; onlar raftan gelir (D-112).
Kullanım: python scripts/foto/acik.py ADAYLAR.json VARLIK.json  (kaynak/foto dalından çıkarılmış dosyalar)
"""
import json, os, re, sys
KOK = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ACIK = ("CC0", "PDM", "PUBLIC DOMAIN", "KAMU", "CC BY ", "CC BY-SA", "CC-BY")
DEPO = "https://github.com/Mutemadiyennn/deutsch-werkstatt/releases/download"

def main(adaylar_yol: str, varlik_yol: str) -> None:
    secim = json.load(open(os.path.join(KOK, "content/v2/media/foto/secim.json")))
    adaylar = json.load(open(adaylar_yol))["sorgular"]
    varlik = json.load(open(varlik_yol))["varlik"]
    dosya = {a["dosya"]: a for s in adaylar.values() for a in s.get("adaylar", [])}
    out, atla = {}, []
    for yer, s in sorted(secim.items()):
        d = s.get("aday")
        if not d: continue
        a, surum = dosya.get(d), varlik.get(d)
        lis = (a or {}).get("lisans", "").upper() + " "
        if not a or not surum or not any(lis.startswith(x) for x in ACIK):
            atla.append(yer); continue
        # yazar: e-posta adresi çıkarılır, en çok 80 karakter (inceleme #121 P2); lisans bağlantısı https
        yazar = re.sub(r"\s*\S+@\S+\.\S+", "", (a.get("yazar") or "")).strip(" ,;()") or None
        if yazar and len(yazar) > 80: yazar = yazar[:79].rstrip() + "…"
        lurl = (a.get("lisans_url") or "").replace("http://", "https://", 1) or None
        out[yer] = {"src": f"{DEPO}/{surum}/{d}", "sinif": "acik", "kaynak": a["kaynak"], "yazar": yazar,
                    "lisans": a["lisans"], "lisans_url": lurl, "sayfa": a.get("sayfa"), "baslik": a.get("baslik")}
    json.dump({"surum": 1, "not": "Üretilir: scripts/foto/acik.py. Yalnızca açık lisanslı seçilmiş fotoğraflar; kapalı medya raftan (D-112).", "foto": out},
              open(os.path.join(KOK, "content/v2/media/foto/acik.json"), "w"), ensure_ascii=False, indent=1)
    print(f"{len(out)} fotoğraf; atlanan {len(atla)}: {atla[:5]}")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
