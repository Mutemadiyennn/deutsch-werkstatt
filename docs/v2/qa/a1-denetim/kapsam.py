#!/usr/bin/env python3
"""[DENETİM-A1] kapsam ve öğrenci benzetimi (PM-147 md. 3.2 ve 3.4). Rapor aracı; içerik değiştirmez.

Kullanım (depo kökünden):  python3 docs/v2/qa/a1-denetim/kapsam.py [son_gun=54] > /tmp/kapsam.json

Her hedef ifade için üç ölçüm (1.–son_gun. gün, deneme sınavı günleri 55–56 hariç):
  kart    : ifadenin anahtar sözcüğü bir günün yeni_kartlar / halkalar[].kartlar listesinde mi; ilk gün
  goruldu : ifade (küçük harf, noktalamasız, sözcük sınırıyla) o güne kadar öğrenciye gösterilen herhangi bir Almanca metinde geçiyor mu
            (gün dosyasının bütün Almanca alanları + günün derslerinin r0/gr/dn metinleri); ilk gün
  uretim  : ifade öğrenciden üretim olarak istenen bir cevabın (accepted[0], gorev_cumleleri.de, prova uygun seçenek, yazma ornek_de,
            ses dikte/cevapla) içinde geçiyor mu; ilk gün ve kaç kez
"Öğretildi" = kart ya da görüldü; "üretildi" = uretim. Ölçüm sözlükseldir: ifade geçiyorsa öğretilmiş sayılır (iyimser sayım).
"""
import json, glob, re, sys, os

SON = int(sys.argv[1]) if len(sys.argv) > 1 else 54
KOK = os.getcwd()

def norm(s):
    s = s.lower().replace("ß", "ss")
    s = re.sub(r"[.,!?;:„“\"»«()…–—/]", " ", s)
    return " " + re.sub(r"\s+", " ", s).strip() + " "

DE_KEYS = {"de", "metin_de", "audio_de", "prompt_de", "from_de", "ornek_de", "bilgi_de"}
def de_metinleri(o, out):
    if isinstance(o, dict):
        for k, v in o.items():
            if k in DE_KEYS and isinstance(v, str): out.append(v)
            elif k in ("accepted", "banka") and isinstance(v, list): out.extend(x for x in v if isinstance(x, str))
            else: de_metinleri(v, out)
    elif isinstance(o, list):
        for x in o: de_metinleri(x, out)

def uretim_metinleri(g):
    out = []
    def acc(m):
        if isinstance(m, dict) and m.get("accepted"): out.append(m["accepted"][0])
    for h in g.get("halkalar", []) or []:
        for c in h.get("gorev_cumleleri", []): out.append(c["de"])
        for s in (h.get("sahne") or {}).get("satirlar", []):
            if s.get("r") == "ogrenci": out.append(s["de"])
    for m in g.get("sesler", []) or []:
        for b in m.get("bolumler", []):
            for d in b.get("dikte", []):
                if d.get("accepted"): out.append(d["accepted"][0])
                if d.get("ornek_de"): out.append(d["ornek_de"])
            acc(b.get("cevapla"))
    for n in (g.get("prova") or {}).get("dugumler", []):
        for s in n.get("secenekler", []):
            if s.get("uygun"): out.append(s["de"])
    oy = g.get("okuma_yazma") or {}
    for q in oy.get("sorular", []): acc(q)
    if oy.get("yazma"): out.append(oy["yazma"].get("ornek_de", ""))
    for m in (g.get("gun_sinavi") or {}).get("maddeler", []): acc(m)
    return out

# ders metinleri (r0, gr, dn)
ders = {}
for f in glob.glob("content/v2/temel/r0-*.json"):
    d = json.load(open(f)); t = []; de_metinleri(d, t); ders[d["id"]] = t
for gr in json.load(open("content/v2/registry/grammar.json")):
    t = []; de_metinleri(gr, t)
    for row in (gr.get("table") or {}).get("rows", []): t.extend(x for x in row if isinstance(x, str))
    t.extend(e.get("de", "") for e in gr.get("examples", []) if isinstance(e, dict))
    ders[gr["id"]] = t
for f in glob.glob("content/v2/m1/dn-*.json"):
    d = json.load(open(f))
    for x in (d if isinstance(d, list) else d.get("noktalar", d.get("items", [d]))):
        if isinstance(x, dict) and "id" in x:
            t = []; de_metinleri(x, t); ders[x["id"]] = t

gunler = sorted((json.load(open(f)) for f in glob.glob("content/v2/m1/gun-*.json")), key=lambda g: g["day"])
gunler = [g for g in gunler if g["day"] <= SON]
kart_gun, gor, uret = {}, [], []
for g in gunler:
    for k in g.get("yeni_kartlar", []) + [k for h in g.get("halkalar", []) or [] for k in h.get("kartlar", [])]:
        kart_gun.setdefault(k, g["day"])
    t = []; de_metinleri({k: v for k, v in g.items() if k not in ("review",)}, t)
    for did in g.get("dersler", []): t.extend(ders.get(did, []))
    gor.append((g["day"], norm(" ".join(t))))
    uret.append((g["day"], [norm(x) for x in uretim_metinleri(g)]))
for f in sorted(glob.glob("content/v2/m1/hafta-sonu-testi*.json")):
    d = json.load(open(f)); t = []; de_metinleri(d, t)

def olc(ifade, kart=None):
    n = norm(ifade)
    rx = re.compile(re.escape(n).replace("\\*", r"\S*"))  # * = sözcük sonu serbest
    g1 = next((d for d, s in gor if rx.search(s)), None)
    u = [(d, x) for d, xs in uret for x in xs if rx.search(x)]
    return {"ifade": ifade, "kart": kart, "kart_gun": kart_gun.get(kart) if kart else None,
            "goruldu_gun": g1, "uretim_gun": u[0][0] if u else None, "uretim_sayi": len(u),
            "ornek": u[0][1].strip() if u else None}

HEDEF = json.load(open(os.path.join(os.path.dirname(__file__), "hedefler.json")))
out = {}
for bolum, maddeler in HEDEF.items():
    if bolum.startswith("_"): continue
    out[bolum] = [olc(m[0], m[1] if len(m) > 1 else None) for m in maddeler]
print(json.dumps({"son_gun": SON, "kart_sayisi": len(kart_gun), "sonuc": out}, ensure_ascii=False, indent=1))
