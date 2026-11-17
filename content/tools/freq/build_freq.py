#!/usr/bin/env python3
"""
Sıklık hattı (PEDAGOGY.md §2): FrequencyWords (OpenSubtitles 2018, CC BY-SA 4.0) ilk 12.000 kelime biçimi
→ simplemma ile lemma → ~5.000 lemma, katman (K1 ≤2000, K2 ≤5000), isim adayları (german-nouns, Wiktionary, CC BY-SA 4.0).
Özel adlar (sözlükte olmayan biçimler), ünlemler ve sayılar ayrı listelenir.
Kullanım: python3 content/tools/freq/build_freq.py [de_50k.txt] [nouns.csv]   (verilmezse indirir)
Çıktı: content/v2/registry/frequency/{lemmas.json, excluded.json}
"""
import csv, json, os, re, sys, urllib.request
import simplemma

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
OUT = os.path.join(ROOT, "content/v2/registry/frequency")
FW = "https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/de/de_50k.txt"
GN = "https://raw.githubusercontent.com/gambolputty/german-nouns/main/german_nouns/nouns.csv"
TOP_FORMS, MAX_LEMMAS, K1, K2 = 12000, 5000, 2000, 5000

INTERJ = set("äh ähm hm hmm oh ah aha ach oje oh hey hallo okay ok wow uh huh mhm ja nein tschüss hi na hä pst autsch igitt juhu hurra bravo prost danke bitte".split())
KEEP_INTERJ = {"ja", "nein", "hallo", "tschüss", "danke", "bitte", "ach", "na", "okay", "prost"}  # gündelik ve öğretilecek

def fetch(url, path):
    if path and os.path.exists(path): return path
    p = os.path.join("/tmp", os.path.basename(url))
    if not os.path.exists(p): urllib.request.urlretrieve(url, p)
    return p

def main():
    fw = fetch(FW, sys.argv[1] if len(sys.argv) > 1 else None)
    gn = fetch(GN, sys.argv[2] if len(sys.argv) > 2 else None)
    nouns = {}
    with open(gn, encoding="utf-8") as f:
        for r in csv.DictReader(f):
            if "Substantiv" not in r["pos"] or r["lemma"].startswith("-"): continue
            g = {"m": "der", "f": "die", "n": "das"}.get(r.get("genus") or "")
            pl = r.get("nominativ plural") or r.get("nominativ plural 1") or ""
            if g and r["lemma"] not in nouns: nouns[r["lemma"]] = (g, pl or "-")
    lemmas, excluded = {}, {"numbers": [], "names_or_unknown": [], "interjections": []}
    with open(fw, encoding="utf-8") as f:
        for i, line in enumerate(f):
            if i >= TOP_FORMS: break
            form, cnt = line.split()
            cnt = int(cnt)
            if re.fullmatch(r"\d+", form): excluded["numbers"].append(form); continue
            if not re.fullmatch(r"[a-zäöüß]+(-[a-zäöüß]+)?", form) or (len(form) == 1 and form not in ("a", "o")):
                excluded["names_or_unknown"].append(form); continue
            if form in INTERJ and form not in KEEP_INTERJ: excluded["interjections"].append(form); continue
            if not (simplemma.is_known(form, lang="de") or simplemma.is_known(form.capitalize(), lang="de")):
                excluded["names_or_unknown"].append(form); continue
            lem = simplemma.lemmatize(form, lang="de")
            e = lemmas.setdefault(lem, {"lemma": lem, "count": 0, "forms": []})
            e["count"] += cnt
            if len(e["forms"]) < 6: e["forms"].append(form)
    ranked = sorted(lemmas.values(), key=lambda x: -x["count"])[:MAX_LEMMAS]
    v1 = {}
    for l in json.load(open(os.path.join(ROOT, "content/v2/registry/lexemes.v1.json"), encoding="utf-8")):
        v1.setdefault(l["de"], l["id"])
    out = []
    for r, e in enumerate(ranked, 1):
        lem = e["lemma"]
        rec = {"rank": r, "lemma": lem, "count": e["count"], "forms": e["forms"], "tier": "K1" if r <= K1 else "K2"}
        cap = lem[:1].upper() + lem[1:]
        if lem in nouns or cap in nouns:
            g, pl = nouns.get(lem) or nouns.get(cap)
            rec["noun"] = {"de": cap, "art": g, "pl": pl}
        if lem in v1: rec["v1"] = v1[lem]
        elif cap in v1: rec["v1"] = v1[cap]
        out.append(rec)
    os.makedirs(OUT, exist_ok=True)
    json.dump({"source": "FrequencyWords 2018 de (OpenSubtitles), H. Dave, CC BY-SA 4.0; lemmatizer simplemma; nouns: german-nouns (Wiktionary, CC BY-SA 4.0)",
               "topForms": TOP_FORMS, "lemmas": out}, open(os.path.join(OUT, "lemmas.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    json.dump({k: v[:400] for k, v in excluded.items()} | {"counts": {k: len(v) for k, v in excluded.items()}},
              open(os.path.join(OUT, "excluded.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    k1 = sum(1 for x in out if x["tier"] == "K1"); v1n = sum(1 for x in out if "v1" in x)
    print(f"{len(out)} lemma (K1 {k1}, K2 {len(out)-k1}); v1 ile ortak {v1n}; isim adayı {sum(1 for x in out if 'noun' in x)}; dışarıda: " + ", ".join(f"{k} {len(v)}" for k, v in excluded.items()))
    print("ilk 40:", " ".join(x["lemma"] for x in out[:40]))

if __name__ == "__main__":
    main()
