#!/usr/bin/env python3
"""[DENETİM-A1] deneme sınavında (content/v2/assess/a1-deneme.json) 1.–54. günlerde hiç görülmemiş sözcük biçimleri (PM-147 md. 3.4–3.5).
Kullanım (depo kökünden): python3 docs/v2/qa/a1-denetim/deneme_bilinmeyen.py
Ölçüm yüzey biçimidir (çekim ayrı sayılır: 'kauft' görülmüş, 'kaufte' görülmemiş olabilir); sayılar ve özel adlar ayrıca listelenmez,
büyük harfle başlayan ve hiç görülmemiş sözcükler de sayılır (ad olabilir: elle ayıklanmalı). Sonuç iyimser değil, kaba bir üst sınırdır."""
import json, glob, re, sys, os
sys.argv = ["x", "54"]
src = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "kapsam.py")).read().split("HEDEF =")[0]
exec(src)
gorulen = set()
for _, s in gor: gorulen.update(s.split())
d = json.load(open("content/v2/assess/a1-deneme.json"))
for b in d["bolumler"]:
    for k in b["kisimlar"]:
        t = []
        for m in k.get("maddeler", []):
            mm = {kk: vv for kk, vv in m.items() if kk not in ("accepted",)}  # cevap örnekleri ayrı: öğrencinin üretmesi beklenen
            de_metinleri(mm, t)
            for s in m.get("ses", []): t.append(s.get("de", ""))
        toks = [x for x in norm(" ".join(t)).split() if not re.fullmatch(r"[\d-]+", x)]
        bil = sorted({x for x in toks if x not in gorulen})
        print(f"{b['id']}/{k['id']}: {len(toks)} sözcük, görülmemiş {len([x for x in toks if x not in gorulen])} ({round(100*len([x for x in toks if x not in gorulen])/max(1,len(toks)),1)}%) → {', '.join(bil)}")
        acc = []
        for m in k.get("maddeler", []):
            if m.get("accepted"): acc.append(m["accepted"][0])
            if m.get("ornek_de"): acc.append(m["ornek_de"])
        at = [x for x in norm(" ".join(acc)).split() if not re.fullmatch(r"[\d-]+", x) and x not in ("{name}",)]
        ab = sorted({x for x in at if x not in gorulen})
        if acc: print(f"   örnek cevaplarda görülmemiş: {', '.join(ab) or '—'}")
