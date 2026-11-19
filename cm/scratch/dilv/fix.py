import json,re
P='/home/claude/wt-m1/content/v2/m1/video/gun-%02d.json'
def L(n): return json.load(open(P%n,encoding='utf8'))
def S(n,d):
    with open(P%n,'w',encoding='utf8') as f: json.dump(d,f,ensure_ascii=False,indent=1); f.write('\n')
def d5(d): return [x for x in d['bolum']['dikte'] if x['id']=='d5'][0]
def add(lst,*xs):
    for x in xs:
        if x not in lst: lst.append(x)
# 1
d=L(1); b=d['bolum']
d['ortam_tr']=d['ortam_tr'].replace('Kesit bir soruyla bitiyor.','Konuşma bir soruyla bitiyor.')
d['on_ogretim'][0]={'de':'ich heiße Eva, du heißt Eva','tr':'adım Eva, adın Eva'}
c=b['cevapla']; c['ornek_de']='Ich heiße {name}.'
c['accepted']=['Ich heiße {name}.','{name}.','Mein Name ist {name}.','Ich bin {name}.']
c['why_tr']='**Ich heiße** dedikten sonra adını söylersin. Eva gibi yalnızca adını da söyleyebilirsin.'
add(d5(d)['accepted'],'Eva wohnt jetzt in Würzburg.','Sie wohnt jetzt in Würzburg.')
S(1,d)
# 2
d=L(2); b=d['bolum']
b['ayrinti'][1]['why_tr']='Jan **im August** diyor. Bu, ağustosta demektir.'
add(d5(d)['accepted'],'Er ist im August angekommen.','Jan ist im August angekommen.')
b['golge']=[3,7]
b['cevapla']['why_tr']='**In Berlin.** Berlin\'de demektir. Kısa cevap yeter.'
S(2,d)
# 3
d=L(3); b=d['bolum']
d['on_ogretim'][0]={'de':'ich heiße Harald, du heißt Harald','tr':'adım Harald, adın Harald'}
b['ayrinti'].sort(key=lambda a:a['tur'])
add(d5(d)['accepted'],'So um die fünfzig.','Er ist fünfzig.')
add(b['cevapla']['accepted'],'Ich komme ursprünglich aus Istanbul.')
S(3,d)
# 4
d=L(4); b=d['bolum']
add(b['cevapla']['accepted'],'Das ist Blau.')
S(4,d)
# 5
d=L(5); b=d['bolum']
b['ayrinti'][3]['why_tr']='Jan **ja** diyor. Bu, evet demektir. Sonra bunun iyi olduğunu ekliyor.'
d5(d)['gorev_tr']='Jan sabah saat kaçta kalkıyor? Saati Jan\'ın söylediği gibi Almanca yaz.'
add(b['cevapla']['accepted'],'Ungefähr 8 Stunden.','Ich schlafe acht Stunden.','Ich schlafe ungefähr acht Stunden.','Ich schlafe jede Nacht acht Stunden.')
S(5,d)
# 6
d=L(6); b=d['bolum']
for o in d['on_ogretim']:
    if o['de']=='Freunde dabei': o['de']='du hattest, Freunde dabei'; o['tr']='sende vardı, yanında arkadaşlar'
add(d5(d)['accepted'],'Ihr Geburtstag ist im September.','Evas Geburtstag ist im September.')
add(b['cevapla']['accepted'],'Nein, mein Geburtstag ist im Mai.','Mein Geburtstag ist im Mai.')
S(6,d)
# 7
d=L(7); b=d['bolum']
b['ayrinti'][0]['why_tr']='Peter **aus der Schweiz** diyor. Bu, İsviçre\'den demektir.'
b['ayrinti'][2]['why_tr']='Peter tek kelimeyle **Rot** diyor. Bu, kırmızı demektir.'
add(d5(d)['accepted'],'Er kommt ursprünglich aus der Schweiz.','Ursprünglich aus der Schweiz.')
b['cevapla']['why_tr']='**Ich heiße** dedikten sonra adını söylersin. **Mein Name ist** ve **Ich bin** de aynı işi görür.'
S(7,d)
# lint
def walk(x,p=''):
    if isinstance(x,dict):
        for k,v in x.items(): yield from walk(v,p+'/'+k)
    elif isinstance(x,list):
        for i,v in enumerate(x): yield from walk(v,p+'/%d'%i)
    elif isinstance(x,str): yield p,x
for n in range(1,8):
    d=L(n)
    for p,s in walk(d):
        if not re.search(r'_tr$|opts|kanit|dikte_notu|/tr$',p): continue
        if re.search(r'[=;…"“”„]|\.\.\.',s): print(n,p,'ISARET',s)
        for c in re.split(r'(?<=[.?!])\s+',re.sub(r'\*\*[^*]+\*\*','X',s)):
            if len(c.split())>14: print(n,p,'UZUN',c)
        if re.search(r'\b(fiil|isim|sıfat|çoğul|tekil|hece|vurgu|zamir|edat)\b',s): print(n,p,'TERIM',s)
    b=d['bolum']; ts={t['tur'] for t in d['turlar']}; h={x['tur'] for x in d['haric']}
    refs=[a['tur'] for a in b['ayrinti']]+[x['tur'] for x in b['dikte'] if 'tur' in x]+b['golge']+[b['cevapla']['soru_tur']]
    bad=[r for r in refs if r not in ts or r in h]
    print(n,'refs ok' if not bad else bad, 'acc',len(d5(d)['accepted']),len(b['cevapla']['accepted']), d['review']['status'])
