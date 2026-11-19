#!/usr/bin/env python3
# dib.py goster KLIP            → klibin Almanca turları (numaralı). Yalnızca okumak için; depoya kopyalama.
# dib.py olc KLIP GUN BAS SON [H1,H2] → tahmini süre, bilinmeyen kelimeler, en sık 6'sı ön öğretilirse kalan oran
# dib.py ara KELIME             → Almanca turlarında kelime geçen klipler
import json,re,sys,collections
C={}
for l in open('/tmp/dib/katalog.jsonl',encoding='utf8'):
    c=json.loads(l); C[c['dosya'][:-4]]=c
T=lambda s:re.findall(r"[a-zäöüß]+",s.lower())
FW=set("aber auch also und oder ich du er sie es wir ihr mein meine meinen dein deine ein eine einen einem einer der die das den dem des in im an am auf aus bei mit von vom zu zum zur für nach vor um bis ab nicht ja nein so da dann wie was wer wo wann ist bin bist sind hat habe hast haben war sehr schon noch nur mal ganz gut denn weil dass wenn man mir mich dir dich uns ah aha hm hmh ähm äh okay".split())
NM=set("amerika austin texas lubbock kalifornien angeles long beach adan eva kunkel würzburg harald becker peter hess bayern bayerischen bayerns süddeutschland deutschlands deutschland berna jan münchen kiel schleswig holstein berlin colorado schweiz".split())
def stem(w):
    for s in ('en','er','em','es','st','et','e','n','s','t'):
        if w.endswith(s) and len(w)>len(s)+2: yield w[:-len(s)]
def de(c):
    t=c.get('turlar') or []; return [x['metin'] for x in t[:len(t)//2]]
a=sys.argv
if a[1]=='goster':
    c=C[a[2]]; print(c['baslik'],c['sure_sn'],'sn',c['mp4'])
    for i,x in enumerate(de(c),1): print(i,x)
elif a[1]=='ara':
    for f,c in C.items():
        n=[i for i,x in enumerate(de(c),1) if a[2].lower() in T(x)]
        if n: print(f,c['sure_sn'],'sn',n[:8])
else:
    c=C[a[2]]; g=int(a[3]); b,s=int(a[4]),int(a[5]); h=set(map(int,a[6].split(','))) if len(a)>6 and a[6] else set()
    D=[re.sub(r'^[^:]{1,25}:\s*','',x) for x in de(c)]; K=set(l.strip() for l in open(f'/home/claude/cm/work/bilinen/bilinen-gun-{g:02d}.txt',encoding='utf8'))|FW|NM
    keep=[i for i in range(b,s+1) if i not in h]; W=[x for i in keep for x in T(D[i-1])]; U=collections.Counter(x for x in W if x not in K and not any(z in K for z in stem(x)))
    tot=sum(len(T(x)) for x in D) or 1; rest=sum(U.values())-sum(v for _,v in U.most_common(6))
    print(f'sure~{round(len(W)*c["sure_sn"]/tot)}sn kelime {len(W)} bilinmeyen {round(sum(U.values())/max(1,len(W)),3)} on-ogretim-sonrasi {round(rest/max(1,len(W)),3)}',U.most_common(12))
