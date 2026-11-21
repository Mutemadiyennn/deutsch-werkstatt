"""
B12 3. parça: seçilmiş AÇIK fotoğrafların uygulama kaydı (content/v2/media/foto/acik.json).
Girdi: content/v2/media/foto/secim.json (main; İÇ/qa seçimi) + kaynak/foto dalındaki adaylar.json (atıf) ve varlik.json
(dosya → Releases sürümü). Çıktı yalnızca seçilen ve lisansı açık (CC0, kamu malı, CC BY, CC BY-SA) adayları içerir.
Kapalı (sinif: kapali) dosya burada yer almaz; onlar raftan gelir (D-112).
Ek (PM 7055725467 md. 4): `medya` dalının `foto/atif.json`'u da okunur (MEDYA'nın kart fotoğrafları; dosyalar dalda). Kayıtlar
`<kart>#kart` anahtarıyla, `src: "medya:foto/<dosya>"` olarak eklenir; derleme (content/tools/build.ts) dosyayı pakete alır.
Aynı anahtarda dal kazanır (PM-081 A2). atif.json okunamazsa betik durur: yoksa yeniden koşu dalın kayıtlarını silerdi.
Kullanım: python scripts/foto/acik.py ADAYLAR.json VARLIK.json [ATIF.json]
  (ADAYLAR ve VARLIK kaynak/foto dalından çıkarılmış dosyalar; ATIF verilmezse `git show origin/medya:foto/atif.json`)
"""
import json, os, re, subprocess, sys
KOK = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
ACIK = ("CC0", "PDM", "PUBLIC DOMAIN", "KAMU", "CC BY ", "CC BY-SA", "CC-BY")
DEPO = "https://github.com/Mutemadiyennn/deutsch-werkstatt/releases/download"

def temiz_yazar(y):
    # yazar: e-posta adresi çıkarılır, en çok 80 karakter (inceleme #121 P2)
    y = re.sub(r"\s*\S+@\S+\.\S+", "", (y or "")).strip(" ,;()") or None
    return y[:79].rstrip() + "…" if y and len(y) > 80 else y

def atif_oku(yol):
    if yol: return json.load(open(yol))
    # bayat ref okunmasın: önce dal güncellenir (inceleme #187 P2-4); ağ yoksa uyarıyla yereldekiyle sürer
    f = subprocess.run(["git", "-C", KOK, "fetch", "-q", "origin", "+refs/heads/medya:refs/remotes/origin/medya"], capture_output=True, text=True)
    if f.returncode: print("uyarı: medya dalı güncellenemedi; yereldeki origin/medya okunuyor", file=sys.stderr)
    r = subprocess.run(["git", "-C", KOK, "show", "origin/medya:foto/atif.json"], capture_output=True, text=True)
    if r.returncode: sys.exit("medya dalının foto/atif.json'u okunamadı (git fetch origin medya); kayıtlar silinmesin diye durdum")
    return json.loads(r.stdout)

def dal_kayitlari(atif):
    out = {}
    for a in atif.get("foto", []):
        d = a.get("dosya") or ""
        if not re.fullmatch(r"[\w-][\w.-]*\.(jpe?g|png|webp)", d, re.I) or not a.get("kart"): sys.exit(f"atif.json: geçersiz kayıt {a}")
        lis = (a.get("lisans") or "").upper() + " "
        if not any(lis.startswith(x) for x in ACIK): continue
        out[a["kart"] + "#kart"] = {"src": f"medya:foto/{d}", "sinif": "acik", "kaynak": a.get("kaynak"), "yazar": temiz_yazar(a.get("yazar")),
                                    "lisans": a["lisans"], "lisans_url": (a.get("lisans_url") or "").replace("http://", "https://", 1) or None,
                                    "sayfa": a.get("sayfa"), "baslik": a.get("baslik"), **({"dusuk_cozunurluk": True} if a.get("dusuk_cozunurluk") else {})}
    return out

def main(adaylar_yol: str, varlik_yol: str, atif_yol=None) -> None:
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
        yazar = temiz_yazar(a.get("yazar"))  # lisans bağlantısı https
        lurl = (a.get("lisans_url") or "").replace("http://", "https://", 1) or None
        out[yer] = {"src": f"{DEPO}/{surum}/{d}", "sinif": "acik", "kaynak": a["kaynak"], "yazar": yazar,
                    "lisans": a["lisans"], "lisans_url": lurl, "sayfa": a.get("sayfa"), "baslik": a.get("baslik")}
    dal = dal_kayitlari(atif_oku(atif_yol))
    hedef = os.path.join(KOK, "content/v2/media/foto/acik.json")
    onceki = set(json.load(open(hedef)).get("foto", {})) if os.path.exists(hedef) else set()
    ezilen = sorted(set(dal) & set(out))
    out.update(dal); out = dict(sorted(out.items()))
    json.dump({"surum": 1, "not": "Üretilir: scripts/foto/acik.py. Yalnızca açık lisanslı seçilmiş fotoğraflar; kapalı medya raftan (D-112).", "foto": out},
              open(os.path.join(KOK, "content/v2/media/foto/acik.json"), "w"), ensure_ascii=False, indent=1)
    dusen = sorted(onceki - set(out))
    if dusen: print(f"uyarı: önceki acik.json'da olup bu çıktıda olmayan {len(dusen)} kayıt: {dusen[:10]}", file=sys.stderr)
    print(f"{len(out)} fotoğraf (medya dalından {len(dal)}, dalın ezdiği {len(ezilen)}: {ezilen[:5]}); atlanan {len(atla)}: {atla[:5]}")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)
