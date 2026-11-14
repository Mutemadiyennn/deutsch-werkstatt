import json, os, shutil, glob, subprocess
def valid(f): return subprocess.run(['python3','validate.py',f],capture_output=True).returncode==0
plan=json.load(open("plan.json"))
REL=set(open("release.txt").read().split())
out=[]
for u in plan["units"]:
    f=f"units/{u['id']}.json"; ready=os.path.exists(f) and u['id'] in REL and valid(f)
    m={k:u[k] for k in ("id","lvl","lek","title_de","title_tr","goal_tr")}
    if ready:
        d=json.load(open(f)); m["title_de"]=d.get("title_de",m["title_de"]); m["title_tr"]=d.get("title_tr",m["title_tr"]); m["goal_tr"]=d.get("goal_tr",m["goal_tr"])
    m["ready"]=ready; out.append(m)
idx={"v":1,"units":out}
import glob as _g
for root in ("/home/claude/werkstatt/data/kurs","/home/claude/deutsch-werkstatt/data/kurs"):
    os.makedirs(root,exist_ok=True)
    json.dump(idx,open(root+"/index.json","w"),ensure_ascii=False,separators=(",",":"))
    for f in glob.glob("units/*.json"):
        if os.path.basename(f)[:-5] not in REL or not valid(f): continue
        d=json.load(open(f)); json.dump(d,open(root+"/"+os.path.basename(f),"w"),ensure_ascii=False,separators=(",",":"))
print(sum(x["ready"] for x in out),"ready of",len(out))
