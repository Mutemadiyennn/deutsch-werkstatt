#!/usr/bin/env python3
"""Yama dosyasını partiye uygular: merge.py 001 patch.json
Yama: {"<id>": {"tr":..,"exp":{..},"mistakes_tr":[..],"img":"q"|null,"ex_img":{"1":"q"},"ex":{"2":{"de":..,"tr":..}},
                "de":..,"art":..,"pl":..,"verb":{..},"coll":["de | tr"],"level":..,"register":..,"domains":[..]}}"""
import json,sys
R='/home/claude/deutsch-werkstatt/content/v2/registry/lexicon/batch-%s.json'
n,pf=sys.argv[1:3]; p=R%n; b=json.load(open(p,encoding='utf8')); patch=json.load(open(pf,encoding='utf8'))
byid={i['id']:i for i in b['items']}; miss=[k for k in patch if k not in byid]
if miss: sys.exit(f'bilinmeyen kimlik: {miss[:10]}')
for k,c in patch.items():
    i=byid[k]
    for f in ['de','tr','pos','art','pl','level','register','domains','mistakes_tr','exp','verb','forms','card','tier','unit','can_do','arm','place','characters','requires']:
        if f in c: i[f]=c[f]
    if 'img' in c:
        if c['img']: i['img']=c['img']
        else: i.pop('img',None)
    if 'coll' in c: i['collocations']=[dict(zip(['de','tr'],[s.strip() for s in x.split(' | ',1)])) for x in c['coll']]
    ex={x['id'].rsplit(':',1)[1]:x for x in i['examples']}
    for e,q in c.get('ex_img',{}).items():
        if e not in ex: sys.exit(f'{k}: örnek {e} yok')
        if q: ex[e]['img']=q
        else: ex[e].pop('img',None)
    for e,v in c.get('ex',{}).items():
        if e not in ex: sys.exit(f'{k}: örnek {e} yok')
        ex[e].update(v)
json.dump(b,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=1); open(p,'a').write('\n')
print('uygulandı',len(patch))
