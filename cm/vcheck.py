import json,re,sys
C={}
for l in open('/tmp/dib/katalog.jsonl',encoding='utf8'):
    c=json.loads(l); C[c['dosya'][:-4]]=c
T=lambda s:re.findall(r"[a-zäöüß]+",s.lower())
S=lambda s:re.findall(r"[a-zäöüß]+|\d",s.lower())  # süre için: rakamlar tek tek okunur
NM=set("amerika austin texas lubbock kalifornien angeles long beach adan eva kunkel würzburg harald becker peter hess bayern bayerischen bayerns süddeutschland deutschlands deutschland berna jan münchen kiel schleswig holstein berlin colorado schweiz".split())
FW=set("ah aha hm hmh ähm äh okay".split())
def stem(w):
    for s in ('en','er','em','es','st','et','e','n','s','t'):
        if w.endswith(s) and len(w)>len(s)+2: yield w[:-len(s)]
yaz='--yaz' in sys.argv
for n in range(1,8):
    p=f'/home/claude/wt-m1/content/v2/m1/video/gun-{n:02d}.json'; d=json.load(open(p,encoding='utf8'))
    if not d.get('klip'): print(n,'klip yok'); continue
    c=C.get(d['klip'])
    if not c: print(n,'katalogda yok',d['klip']); continue
    t=c['turlar']; De=[re.sub(r'^[^:]{1,25}:\s*','',x['metin']) for x in t[:len(t)//2]]
    K=set(l.strip() for l in open(f'/home/claude/cm/work/bilinen/bilinen-gun-{n:02d}.txt',encoding='utf8'))|FW|NM
    for o in d.get('on_ogretim',[]): K|=set(T(o['de']))
    h={x['tur'] for x in d.get('haric',[])}; a,b=d['kesit']['bas_tur'],d['kesit']['son_tur']
    keep=[i for i in range(a,b+1) if i not in h and i<=len(De)]
    err=[]
    if b>len(De): err.append(f'son_tur {b}>{len(De)}')
    for r in d.get('turlar',[]):
        i=r['tur']; 
        if i>len(De): err.append(f'tur {i} yok'); continue
        bb=T(r.get('basi','')); g=T(De[i-1])
        if g[:len(bb)]!=bb: err.append(f'basi t{i}')
    for i in keep:
        if re.search(r'\d{4,}\s*\d|nummer',De[i-1].lower()): err.append(f'numara t{i}')
    W=[x for i in keep for x in T(De[i-1])]; U=[x for x in W if x not in K and not any(s in K for s in stem(x))]
    tot=sum(len(S(x)) for x in De) or 1; sn=round(sum(len(S(De[i-1])) for i in keep)*c['sure_sn']/tot); r=round(len(U)/max(1,len(W)),3)
    print(n,d['klip'],d['durum'],f'{sn}sn',f'kelime {len(W)} bil {r} (dosya {d.get("bilinmeyen",{}).get("oran")})',sorted(set(U))[:9],'HATA:' if err else 'tamam',err[:6])
    if yaz:
        d['bilinmeyen']={'oran':r,'kelimeler':sorted(set(U))}; d['kesit_sure_tahmin_sn']=sn; d['sure_kaynak_sn']=c['sure_sn']; d['durum']='kisa' if sn<30 else 'hazir'
        d['video_url']=c['mp4'].replace('http://','https://')
        json.dump(d,open(p,'w',encoding='utf8'),ensure_ascii=False,indent=1); open(p,'a').write('\n')
