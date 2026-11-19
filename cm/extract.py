#!/usr/bin/env python3
"""Sözlük partisini ajanların okuyacağı kısa görünüme çevirir: extract.py 001"""
import json,sys
R='/home/claude/deutsch-werkstatt/content/v2/registry/lexicon/batch-%s.json'
n=sys.argv[1]; b=json.load(open(R%n,encoding='utf8'))
out=open(f'/home/claude/cm/work/batch-{n}.view.jsonl','w',encoding='utf8')
for i in b['items']:
    v={k:i[k] for k in ['id','de','tr','pos','art','pl','verb','level','freqRank','register','domains','img','exp','forms','mistakes_tr'] if k in i and i[k] not in (None,[],{})}
    v['coll']=[f"{c['de']} | {c['tr']}" for c in i['collocations']]
    v['ex']=[{'id':x['id'].rsplit(':',1)[1],'de':x['de'],'tr':x['tr'],'l':x['layer'],**({'dlg':1} if x.get('dialog') else {}),**({'img':x['img']} if x.get('img') else {})} for x in i['examples']]
    out.write(json.dumps(v,ensure_ascii=False)+'\n')
print(out.name,len(b['items']))
