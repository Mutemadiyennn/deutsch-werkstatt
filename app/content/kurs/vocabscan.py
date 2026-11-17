"""Üretim (say/fix/order) maddelerinde öğretilmemiş kelime taraması → rapor."""
import json, re, glob
core = json.load(open('/home/claude/deutsch-werkstatt/data/core1500.json'))
items = core if isinstance(core, list) else core.get("items", core.get("words", []))
top = set()
for x in sorted(items, key=lambda x: x.get("r", 9999))[:400]:
    for t in re.findall(r"[A-Za-zÄÖÜäöüß]+", x.get("de","")): top.add(t.lower())
plan = json.load(open('plan.json'))["units"]
seen = set(top); rep = {}
def toks(s): return [t for t in re.findall(r"[A-Za-zÄÖÜäöüß]+", s or "")]
for m in plan:
    try: u = json.load(open(f"units/{m['id']}.json"))
    except Exception: continue
    intro = set()
    for w in u["words"]:
        for t in toks(w["de"]) + toks(w.get("pl","")): intro.add(t.lower())
    for t in u["teach"]:
        for e in t.get("ex", []): intro |= {x.lower() for x in toks(e["de"])}
        for row in (t.get("table") or {}).get("rows", []): 
            for c in row: intro |= {x.lower() for x in toks(c)}
    for l in u["dialog"]["lines"]: intro |= {x.lower() for x in toks(l["de"])}
    intro |= {x.lower() for x in toks(u["read"]["de"])}
    allowed = seen | intro
    bad = {}
    for d in u["drills"] + u["test"]:
        if d["k"] not in ("say", "fix", "order"): continue
        s = d.get("de") or d.get("right")
        nb = [t for t in toks(s) if t.lower() not in allowed and not t[0].isupper() or (t[0].isupper() and t.lower() not in allowed and t not in ("Sie","Ihr","Ihnen","Ihre","Ihren"))]
        nb = [t for t in nb if t.lower() not in allowed]
        if nb: bad[s] = nb
    rep[m["id"]] = bad
    seen |= allowed
    for d in u["drills"] + u["test"]:
        seen |= {x.lower() for x in toks(d.get("de") or d.get("right") or "")}
tot = sum(len(v) for v in rep.values())
print("toplam", tot)
for k, v in rep.items():
    if v: print(k, len(v), list(v.items())[:6])
json.dump(rep, open("/tmp/vocabscan.json", "w"), ensure_ascii=False, indent=1)
