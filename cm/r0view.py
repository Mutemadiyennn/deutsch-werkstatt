import json,glob,sys
# r0view.py 01 05 ad → okurun okuyacağı Türkçe alanlar
a,b,name=int(sys.argv[1]),int(sys.argv[2]),sys.argv[3]
import os
R=os.environ.get('R0DIR','/home/claude/deutsch-werkstatt/content/v2/temel/')
SKIP={'lines','script'}
out=[]
def walk(x,p):
    if isinstance(x,dict):
        for k,v in x.items():
            if k in SKIP or k=='review': continue
            q=p+'.'+k
            if isinstance(v,str) and (k.endswith('_tr') or (k=='tr' and '.teach' in p) or k=='baslik_tr'): out.append((q,v,x.get('de') if k!='de' else None))
            else: walk(v,q)
    elif isinstance(x,list):
        for i,v in enumerate(x):
            walk(v,f"{p}[{v.get('id') if isinstance(v,dict) and v.get('id') else i}]")
for f in sorted(glob.glob(R+'r0-*.json')):
    n=int(f.split('/r0-')[1][:2])
    if a<=n<=b:
        d=json.load(open(f,encoding='utf8')); walk(d,f'r0-{n:02d}')
        t=d.get('table') or {}
        out.append((f'r0-{n:02d}.table.icerik',json.dumps({'sutunlar':t.get('sutunlar'),'satirlar':t.get('satirlar')},ensure_ascii=False),None))
with open(f'/home/claude/cm/work/{name}.txt','w',encoding='utf8') as o:
    for q,v,de in out: o.write(f"{q}\t{v}"+(f"\t[Almanca: {de}]" if de else '')+'\n')
print(name,len(out))
