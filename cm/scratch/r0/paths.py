import json,glob,os,re
A='/home/claude/cm/scratch/temel-before-r0duzelt'; B='/home/claude/wt-r0/content/v2/temel'
def walk(x,p,out):
    if isinstance(x,dict):
        for k,v in x.items():
            if k=='review': continue
            q=f'{p}.{k}' if p else k
            if isinstance(v,str):
                if k=='tr' or k.endswith('_tr'): out[q]=v
            elif k=='opts' and '.qs[' in q:
                for i,o in enumerate(v): out[f'{q}[{i}]']=o
            else: walk(v,q,out)
    elif isinstance(x,list):
        for i,v in enumerate(x): walk(v,f'{p}[{v["id"] if isinstance(v,dict) and "id" in v else i}]',out)
res=[];cnt={}
def C(d):
    a=len(d['teach'])+len(d['drills'])+len(d['placement'])+len(d['dialogue']['lines'])+len(d['listening'])
    b=len(d['teach'])+len(d['table']['satirlar'])+len(d['drills'])+len(d['placement'])+len(d['dialogue']['lines'])+sum(len(h['script'])+len(h['qs']) for h in d['listening'])+1
    return a,b
rows=[]
for f in sorted(os.listdir(B)):
    if not f.endswith('.json'): continue
    o=json.load(open(f'{A}/{f}',encoding='utf8')); n=json.load(open(f'{B}/{f}',encoding='utf8'))
    a,b={}, {}; walk(o,'',a); walk(n,'',b)
    pre=f[:5]; ch=[k for k in b if a.get(k)!=b[k]]
    res+= [f'{pre}.{k}' for k in ch]
    gone=[k for k in a if k not in b]
    acc=lambda d:{x['id']:x['accepted'] for x in d['drills']+d['placement'] if 'accepted' in x}
    ao,an=acc(o),acc(n); items=[i for i in an if an[i]!=ao.get(i)]
    added=sum(len(set(an[i])-set(ao.get(i,[]))) for i in an); rem=sum(len(set(ao[i])-set(an.get(i,[]))) for i in ao)
    rows.append((f[3:5],C(o),C(n),len(ch),len(gone),len(items),added,rem,sum(1 for t in n['teach'] if t['exp']['parcalar']),len(n['teach']),len(n['drills'])))
    assert n['review']['status']=='draft' and 'okur' not in n['review'] and 'okur_at' not in n['review']
open('/home/claude/cm/work/r0re4.paths.txt','w',encoding='utf8').write('\n'.join(res)+'\n')
for r in rows: print(r)
S=lambda i,j,R=rows: sum(r[i][j] for r in R)
print('A önce 01-05',S(1,0,rows[:5]),'06-10',S(1,0,rows[5:]),'| B önce 01-05',S(1,1,rows[:5]),'06-10',S(1,1,rows[5:]))
print('A sonra',S(2,0,rows[:5]),S(2,0,rows[5:]),S(2,0),'| B sonra',S(2,1,rows[:5]),S(2,1,rows[5:]),S(2,1))
print('tr değişen',sum(r[3] for r in rows),'silinen',sum(r[4] for r in rows),'accepted madde',sum(r[5] for r in rows),'eklenen',sum(r[6] for r in rows),'çıkarılan',sum(r[7] for r in rows),'çipli',sum(r[8] for r in rows),'öğe',sum(r[9] for r in rows),'alıştırma',sum(r[10] for r in rows))
