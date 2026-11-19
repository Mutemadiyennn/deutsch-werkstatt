import json,sys
# gunview.py AD 1 2 → okurun okuyacağı Türkçe alanlar
name,days=sys.argv[1],[int(x) for x in sys.argv[2:]]; out=[]
def walk(x,p,de=None):
    if isinstance(x,dict):
        d=x.get('de') or x.get('prompt_de') or x.get('from_de') or de
        for k,v in x.items():
            if k=='review': continue
            q=f'{p}.{k}'
            if isinstance(v,str) and (k.endswith('_tr') or k=='tr'): out.append((q,v,d))
            elif k=='opts' and isinstance(v,list) and 'q_tr' in x: out.append((q,' / '.join(map(str,v)),d))
            elif k=='kontrol_tr' and isinstance(v,list): out.append((q,' / '.join(v),d))
            else: walk(v,q,d)
    elif isinstance(x,list):
        for i,v in enumerate(x): walk(v,f"{p}[{v.get('id') if isinstance(v,dict) and v.get('id') else i}]",de)
for n in days:
    d=json.load(open(f'/home/claude/wt-m1/content/v2/m1/gun-{n:02d}.json',encoding='utf8')); walk(d,f'gun-{n:02d}')
with open(f'/home/claude/cm/work/{name}.txt','w',encoding='utf8') as o:
    for q,v,d in out: o.write(f"{q}\t{v}"+(f"\t[Almanca: {d}]" if d else '')+'\n')
print(name,len(out))
