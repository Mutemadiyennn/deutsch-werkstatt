import json,glob
D='/home/claude/wt-m1/content/v2/m1/'
A={}
def walk(x,p,de=None):
    if isinstance(x,dict):
        d=x.get('de') or x.get('prompt_de') or x.get('from_de') or x.get('audio_de') or x.get('ornek_de') or de
        for k,v in x.items():
            if k in('review','accepted','denenen','turlar','bilinmeyen'): continue
            q=f'{p}.{k}'
            if isinstance(v,str) and (k.endswith('_tr') or k=='tr'): A[q]=(v,d)
            elif k=='opts' and isinstance(v,list): A[q]=(' / '.join(map(str,v)),d)
            elif k=='kontrol_tr' and isinstance(v,list): A[q]=(' / '.join(v),d)
            else: walk(v,q,d)
    elif isinstance(x,list):
        for i,v in enumerate(x): walk(v,f"{p}[{v.get('id') if isinstance(v,dict) and v.get('id') else i}]",de)
for n in range(1,8): walk(json.load(open(D+f'gun-{n:02d}.json',encoding='utf8')),f'gun-{n:02d}')
walk(json.load(open(D+'hafta-sonu-testi.json',encoding='utf8')),'hafta-sonu-testi')
want=[l.strip() for l in open('work/m1duz.alanlar.txt',encoding='utf8') if l.strip() and not l.startswith('video/')]
out=[];seen=set()
def add(k,t,d):
    if t and k not in seen: seen.add(k); out.append(f"{k}\t{t}\t[Almanca: {d or ''}]")
miss=0
for k in want:
    if k in A: add(k,*A[k])
    else: miss+=1
for k,v in A.items():
    if k.startswith('hafta-sonu-testi'): add(k,*v)
A.clear()
for n in range(1,8):
    d=json.load(open(D+f'video/gun-{n:02d}.json',encoding='utf8'))
    if d.get('klip'): walk(d,f'video-{n:02d}')
for k,v in A.items():
    if '.neden' not in k: add(k,*v)
I={}
for f in glob.glob('/home/claude/deutsch-werkstatt/content/v2/registry/lexicon/batch-[0-9]*.json'):
    for x in json.load(open(f,encoding='utf8'))['items']: I[x['id']]=x
full=['neu','Büro','offen','wieder','da','brauchen','Herr','müde']
for a in full:
    x=I['lx:'+a]; i=x['id']; add(f'{i}.tr',x['tr'],x['de'])
    for k,v in (x.get('exp') or {}).items():
        if isinstance(v,str): add(f'{i}.exp.{k}',v,x['de'])
    for j,c in enumerate(x.get('collocations') or []): add(f'{i}.coll[{j}]',c.get('tr'),c['de'])
    for j,e in enumerate(x.get('examples') or []): add(f'{i}.ex[{j+1}]',e.get('tr'),e['de'])
for a in full+['haben','sollen','heißen','machen','vor','Stunde','Minute','Abend']:
    x=I['lx:'+a]; i=x['id']
    if a in('haben','sollen'): add(f'{i}.tr',x['tr'],x['de'])
    for j,m in enumerate(x.get('mistakes_tr') or []): add(f'{i}.mistakes_tr[{j}]',m,x['de'])
    if a in full or a=='Stunde':
        for j,f in enumerate(x.get('forms') or []):
            s=f['de'].replace('___','['+f['answer']+']')
            for k in('tr','hint_tr'): add(f'{i}.forms[{j}].{k}',f.get(k),s)
fx=json.load(open('work/m1fix7.json',encoding='utf8'))
for i,p in fx.items():
    x=I[i]
    for j,f in enumerate(p.get('forms') or []):
        s=x['forms'][j]['de'].replace('___','['+x['forms'][j]['answer']+']')
        if f.get('hint_tr'): add(f'{i}.forms[{j}].hint_tr',x['forms'][j].get('hint_tr'),s) if 'dedikten' in (x['forms'][j].get('hint_tr') or '') or 'Herhangi' in (x['forms'][j].get('hint_tr') or '') or 'Yeni bir' in (x['forms'][j].get('hint_tr') or '') else None
for l in open('work/m1p12.txt',encoding='utf8'):
    r=l.rstrip('\n').split('\t')
    if r[0] not in seen: seen.add(r[0]); out.append(l.rstrip('\n'))
open('work/m1re7.txt','w',encoding='utf8').write('\n'.join(out)+'\n'); print('satir',len(out),'bulunamayan yol',miss)
