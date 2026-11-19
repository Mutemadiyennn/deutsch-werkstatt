#!/usr/bin/env python3
# Birleşik yamayı partilerine böler ve uygular: mergec.py patch.json
import json,sys,subprocess,glob,os
p=json.load(open(sys.argv[1],encoding='utf8')); w={}
for f in sorted(glob.glob('/home/claude/deutsch-werkstatt/content/v2/registry/lexicon/batch-[0-9]*.json')):
    for i in json.load(open(f,encoding='utf8'))['items']: w[i['id']]=f[-8:-5]
g={}
for k,v in p.items(): g.setdefault(w[k],{})[k]=v
for n,q in sorted(g.items()):
    t=f'/tmp/mc-{n}.json'; json.dump(q,open(t,'w',encoding='utf8'),ensure_ascii=False); subprocess.check_call(['python3','/home/claude/cm/merge.py',n,t]); subprocess.check_call(['python3','/home/claude/cm/extract.py',n])
