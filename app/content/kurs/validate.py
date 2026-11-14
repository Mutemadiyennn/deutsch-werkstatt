import json, re, sys, glob
TYPES={"say","gap","pick","order","listen","fix"}
TRBAD=[r"\bfiir\b", r"\bses ses\b", r"\b[A-ZÇĞİÖŞÜ][a-zçğıöşüäöß]+'(lı|li|lu|lü)\b"]
def words(s): return re.findall(r"[A-Za-zÄÖÜäöüßİıçğşÇĞŞ]+", s)
def n(s): return re.sub(r"[^a-zäöüß ]","",s.lower().replace("ß","ss")).strip()
def dup(s):
    w=[x.lower() for x in words(s)]
    return any(w[i]==w[i+1] and w[i] not in ("die","das","der") for i in range(len(w)-1)) or re.search(r"\b(der|die|das) (der|die|das)\b", s, re.I) and not re.search(r"\bdas,? (das|die|der)\b", s)
def check(u, errs, warn):
    for k in ["id","lvl","title_de","title_tr","goal_tr","intro_tr","teach","words","dialog","drills","read","speak","test"]:
        if k not in u: errs.append("missing "+k)
    tid={t["id"] for t in u.get("teach",[])}
    if not 3<=len(u.get("teach",[]))<=6: warn.append(f"teach count {len(u['teach'])}")
    for t in u.get("teach",[]):
        if not 2<=len(t.get("ex",[]))<=6: warn.append(f"{t['id']} ex count")
    if not 8<=len(u.get("words",[]))<=20: warn.append("words count %d"%len(u["words"]))
    for w in u.get("words",[]):
        if w.get("art") not in ("der","die","das",""): errs.append("bad art "+w["de"])
        if w.get("t")=="n" and not w.get("art") and not w.get("pl")=="Pl": warn.append("noun w/o art "+w["de"])
        if re.match(r"^(der|die|das) ", w.get("pl","")) or re.match(r"^(der|die|das) ", w.get("de","")): errs.append("article in de/pl "+w["de"])
    seen=set(); allde=[]
    for e in [e for t in u["teach"] for e in t["ex"]]+u["dialog"]["lines"]: allde.append(n(e["de"]))
    def item(d, where):
        k=d.get("k")
        if k not in TYPES: errs.append(f"{where} bad type {k}"); return None
        if d.get("t") not in tid: errs.append(f"{where} bad teach id {d.get('t')}")
        if not d.get("why_tr"): warn.append(f"{where} no why")
        if k=="say":
            if not d.get("tr") or not d.get("de"): errs.append(f"{where} say fields")
            if n(d["de"]) and n(d["de"]) in n(d.get("tr","")): errs.append(f"{where} say leak")
            key=d["de"]
        elif k=="gap":
            de=d["de"]
            if de.count("___")!=1: errs.append(f"{where} gap blanks: {de}")
            if not d.get("ans") or d["ans"][0] not in d.get("opts",[]): errs.append(f"{where} gap ans not in opts")
            if len(set(d.get("opts",[])))!=len(d.get("opts",[])) or len(d.get("opts",[]))<3: errs.append(f"{where} gap opts")
            full=de.replace("___", d["ans"][0])
            if dup(full): errs.append(f"{where} duplicate word: {full}")
            if re.search(r"\b"+re.escape(d["ans"][0].lower())+r"\b", de.lower()): errs.append(f"{where} gap answer leaks: {de}")
            key=full
        elif k=="pick":
            if not (0<=d.get("ans",-1)<len(d.get("opts",[]))): errs.append(f"{where} pick ans")
            key=d["q_tr"]+"|"+d["opts"][d["ans"]]
        elif k=="listen":
            if not (0<=d.get("ans",-1)<len(d.get("opts_tr",[]))): errs.append(f"{where} listen ans")
            key=d["de"]
        elif k=="order":
            c=len(d["de"].split())
            if not 3<=c<=10: warn.append(f"{where} order len {c}")
            key=d["de"]
        elif k=="fix":
            if n(d["wrong"])==n(d["right"]): errs.append(f"{where} fix same")
            key=d["right"]
        for f in ("de","right","wrong"):
            if f in d and k!="fix" or f=="right":
                pass
        for f in ("de","right"):
            v=d.get(f)
            if v and k in("say","order","listen","fix") and dup(v): errs.append(f"{where} dup word: {v}")
            if v and not re.search(r"[.!?…]$", v.strip()): warn.append(f"{where} no end punct: {v}")
        for f in ("tr","why_tr","q_tr"):
            v=d.get(f,"")
            for b in TRBAD:
                if re.search(b, v): errs.append(f"{where} TR typo {b}: {v}")
        return key
    keys=[]
    for i,d in enumerate(u["drills"]):
        kk=item(d,"drill%d"%i); 
        if kk: 
            if (d["k"],kk) in keys: errs.append("dup drill "+kk)
            keys.append((d["k"],kk))
    if not 22<=len(u["drills"])<=34: warn.append("drills count %d"%len(u["drills"]))
    says=sum(1 for d in u["drills"] if d["k"]=="say")
    if says < 0.3*len(u["drills"]): warn.append(f"say share low {says}/{len(u['drills'])}")
    for i,d in enumerate(u["test"]):
        kk=item(d,"test%d"%i)
        if kk and (any(kk==x[1] for x in keys) or n(kk) in allde): errs.append("test reuses "+str(kk))
    if not 10<=len(u["test"])<=14: warn.append("test count")
    for q in u["read"]["qs"]:
        if not 0<=q["ans"]<len(q["opts"]): errs.append("read q ans")
    if len(u["dialog"]["lines"])<5: warn.append("dialog short")
    for l in u["dialog"]["lines"]:
        if l["r"] not in u["dialog"]["roles"]: errs.append("dialog role")
        if dup(l["de"]): errs.append("dialog dup "+l["de"])
    blob=json.dumps(u, ensure_ascii=False)
    for b in TRBAD:
        for m in re.finditer(b, blob): errs.append("TR typo in blob: "+blob[max(0,m.start()-30):m.end()+10])
files=sys.argv[1:] or sorted(glob.glob("units/*.json"))
bad=0
for f in files:
    try: u=json.load(open(f))
    except Exception as e: print(f,"JSON ERROR",e); bad+=1; continue
    errs=[];warn=[]
    try: check(u,errs,warn)
    except Exception as e: errs.append("EXC "+repr(e))
    print(f"{f}: {len(errs)} errors, {len(warn)} warnings")
    for e in errs: print("  E", e)
    for w in warn: print("  w", w)
    bad+=bool(errs)
sys.exit(1 if bad else 0)
