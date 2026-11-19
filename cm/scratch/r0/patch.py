import json,glob,re,os
SRC='/home/claude/cm/scratch/temel-before-r0duzelt'; DST='/home/claude/wt-r0/content/v2/temel'
NUM="null eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf dreizehn vierzehn fünfzehn sechzehn siebzehn achtzehn neunzehn zwanzig".split()
TENS=["","","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig"]
def nw(n):
    if n<=20: return NUM[n]
    e,z=n%10,n//10
    return (("ein" if e==1 else NUM[e])+"und"+TENS[z]) if e else TENS[z]
W2N={nw(i):i for i in range(60)}; W2N['ein']=1; W2N['zwo']=2
def norm(s):
    s=s.lower(); s=re.sub(r"[’'`´]","",s)
    s=re.sub(r'(?<![\w])(\d{1,2})(?![\w])',lambda m:nw(int(m[1])),s)
    for a,b in (('ä','ae'),('ö','oe'),('ü','ue'),('ß','ss')): s=s.replace(a,b)
    s=re.sub(r'[^a-z0-9 ]+',' ',s); s=re.sub(r'\b(aeh|aehm|hm|ehm)\b',' ',s)
    return re.sub(r'\s+',' ',s).strip()
class L:
    def __init__(s,n):
        s.f=os.path.basename(glob.glob(f'{SRC}/r0-{n}-*.json')[0]); s.d=json.load(open(f'{SRC}/{s.f}',encoding='utf8'))
        s.by={x['id']:x for x in s.d['teach']+s.d['drills']+s.d['placement']}
    def add(s,i,items):
        x=s.by[i]; seen={norm(a) for a in x['accepted']}
        for a in items:
            k=norm(a)
            if k not in seen: x['accepted'].append(a); seen.add(k)
    def line(s,i,de=None,tr=None):
        l=s.d['dialogue']['lines'][i]
        if de is not None: l['de']=de
        if tr is not None: l['tr']=tr
    def h(s,i): return next(x for x in s.d['listening'] if x['id']==i)
    def dir(s):
        for t in s.d['teach']:
            for p in t['exp']['parcalar']:
                if p['tr']=='(-dir)': p['tr']='-dir'
    def dots(s):
        for h in s.d['listening']:
            for q in h['qs']: q['opts']=[re.sub(r'^(\d{1,2})\.(\d{2})$',r'\1:\2',o) for o in q['opts']]
    def clock(s,x):
        out=[]
        for a in x['accepted']:
            m=re.search(r'\b([A-Za-zÄÖÜäöüß]+) Uhr ([a-zäöüß]+)\b',a)
            if m and m[1].lower() in W2N and m[2] in W2N:
                t=f'{W2N[m[1].lower()]}:{W2N[m[2]]:02d}'
                out+=[a[:m.start()]+t+a[m.end():],a[:m.start()]+t+' Uhr'+a[m.end():]]; continue
            m=re.search(r'\b([A-Za-zÄÖÜäöüß]+) Uhr\b',a)
            if m and m[1].lower() in W2N: out.append(a[:m.start()]+f'{W2N[m[1].lower()]}:00 Uhr'+a[m.end():])
        s.add(x['id'],out)
    def save(s):
        r=s.d['review']; s.d['review']={'status':'draft','by':'dilbilimci-ajan','at':'2026-11-18','notes':'PR #51 inceleme düzeltmeleri işlendi. Denetim: docs/v2/reviews/temel-r0-denetim.txt. Kapanış: docs/v2/reviews/temel-r0-kapanis.md. Okur yeniden okuyacak.'}
        open(f'{DST}/{s.f}','w',encoding='utf8').write(json.dumps(s.d,ensure_ascii=False,indent=1)+'\n'); print('kaydedildi',s.f)
PROD={'tr_de','transform','guided_response','listen_and_respond'}

# ---------- 01
x=L('01'); d=x.d
i=[t['id'] for t in d['teach']].index('r0:01:a:tag')
d['teach'].insert(i+1,{"id":"r0:01:a:guten-tag","de":"Guten Tag, hier ist {name}.","tr":"İyi günler, ben {name}.","lexeme":"lx:Tag","exp":{"anlam_tr":"Telefonda selam verir ve kim olduğunu söyler.","ne_zaman_tr":"Telefonda karşı taraf açınca.","parcalar":[{"de":"Guten Tag","tr":"iyi günler"},{"de":"hier ist","tr":"ben"}]}})
x.add('r0:01:d20',["Geht am Freitag?","Passt am Freitag?"])
x.by['r0:01:d31']['situation_tr']="Ioana yarını soruyor. Bugün pazar."
d['drills'].append({"id":"r0:01:d35","k":"tr_de","tr":"İyi günler, ben {name}.","accepted":["Guten Tag, hier ist {name}.","Guten Tag, ich bin {name}.","Guten Tag, mein Name ist {name}.","Grüß Gott, hier ist {name}.","Hallo, hier ist {name}."]})
d['characters'].remove('ch:brandl')
x.line(3,"Heute ist Dienstag. Donnerstag ist übermorgen.","Bugün salı. Perşembe öbür gün.")
x.line(5,"Gestern war Montag.","Dün pazartesiydi.")
x.line(6,tr="Birlikte pratik yapalım mı? Çarşamba olur mu?")
x.h('r0:01:h2')['script'][3]['tr']="Doğru. Sonra hafta sonu geliyor."
x.dir(); x.save()

# ---------- 02
x=L('02'); d=x.d
x.by['r0:02:d29']['situation_tr']="Frau Huber doğum gününü soruyor. Doğum günün martta."
x.add('r0:02:d11',["Urlaub habe ich im August."])
d['characters'].remove('ch:brandl')
x.line(7,"Im Frühling, im Mai!","İlkbaharda, mayısta!")
h=x.h('r0:02:h2'); h['title_tr']="Molada Derya"
for r in h['script']: r['r']="Derya"
h['script'][0].update(de="Du bist neu in Wendlfing, oder?",tr="Wendlfing'de yenisin, değil mi?")
h['script'][1].update(de="Ende November beginnt der Weihnachtsmarkt auf dem Stadtplatz.",tr="Kasım sonunda meydanda Noel pazarı başlıyor.")
h['qs'][0]['q_tr']="Derya ne anlatıyor?"; h['qs'][0]['opts'][1]="Şirketin kurallarını"
h['qs'][1].update(q_tr="Noel pazarı ne zaman başlıyor?",opts=["ocak başında","aralık sonunda","kasım sonunda"],ans=2)
x.dir(); x.save()

# ---------- 03
x=L('03'); D={'null':'0','eins':'1','zwei':'2','zwo':'2','drei':'3','vier':'4','fünf':'5','sechs':'6','sieben':'7','acht':'8','neun':'9'}
P=re.compile(r'\b[Nn]ull(?: (?:null|eins|zwei|zwo|drei|vier|fünf|sechs|sieben|acht|neun))+')
for it in x.d['drills']+x.d['placement']:
    if it['k'] in PROD:
        o=[]
        for a in it['accepted']:
            m=P.search(a)
            if m: o.append(a[:m.start()]+''.join(D[w] for w in m[0].lower().split())+a[m.end():])
        x.add(it['id'],o)
x.add('r0:03:d12',["Null eins sieben ist meine Nummer."])
x.line(1,"Guten Tag! Ich wohne in der Brunnengasse 7.","İyi günler! Brunnengasse 7 numarada oturuyorum.")
x.line(3,"Nummer zwölf.","On iki numara.")
x.line(7,"Nummer vierzehn.","On dört numara.")
x.dir(); x.save()

# ---------- 04
x=L('04')
x.add('r0:04:d23',["100 Euro.","Das kostet 100 Euro.","Das macht 100 Euro.","Das sind 100 Euro."])
x.add('r0:04:d12',["Vierzig Jahre alt bin ich."]); x.add('r0:04:d14',["Fünfzig Euro macht das."])
x.line(1,"Ich bin {name}. Was kostet das hier?","Ben {name}. Burası ne kadar?")
x.line(5,"Neununddreißig. Das geht.","Otuz dokuz. Bu olur.")
x.line(7,"Achtzig? Das geht nicht!","Seksen mi? Bu olmaz!")
x.dir(); x.save()

# ---------- 05
x=L('05')
x.add('r0:05:d21',["Es ist zwei Uhr dreißig.","Zwei Uhr dreißig."])
x.add('r0:05:p02',["Es ist drei Uhr fünfundvierzig.","Drei Uhr fünfundvierzig."])
a=x.by['r0:05:d30']['accepted']; a.remove("Um zwanzig Uhr."); x.add('r0:05:d30',["Um zwanzig Uhr heute Abend."])
x.add('r0:05:d38',["Also zweiundzwanzig Uhr dreißig?","Zweiundzwanzig Uhr dreißig?","Also um zweiundzwanzig Uhr dreißig?","Um zweiundzwanzig Uhr dreißig?"])
x.add('r0:05:d17',["Halb zehn ist es."]); x.add('r0:05:d19',["Morgen um zehn Uhr früh."])
for it in x.d['drills']+x.d['placement']:
    if it['k'] in PROD: x.clock(it)
x.line(4,tr="Doğru, 9:30.")
x.line(5,"Das ist zu früh. Geht Viertel nach drei?","Bu çok erken. Üçü çeyrek geçe olur mu?")
x.line(6,"Viertel nach drei, ja, das geht.","Üçü çeyrek geçe, evet, olur.")
x.line(7,"Also fünfzehn Uhr fünfzehn?","Yani 15:15 mi?")
x.line(8,"Genau. Dann bis Donnerstag. Auf Wiederhören!","Doğru. O zaman perşembeye görüşürüz. Hoşça kalın!")
x.line(9,"Bis Donnerstag!","Perşembeye görüşürüz!")
x.dir(); x.save()

# ---------- 06
x=L('06')
x.add('r0:06:d11',["Der 24. November ist heute."]); x.add('r0:06:d13',["Um zehn am Dienstag"])
x.add('r0:06:d19',["Dienstag, der 1. Dezember.","Dienstag, der erste Dezember.","Dienstag, den 1. Dezember.","Dienstag, den ersten Dezember."])
x.add('r0:06:d24',["Siebter Achter neunzig.","Der siebte Achte neunzig.","7.8.90"])
x.clock(x.by['r0:06:d14'])
x.line(5,tr="Bu örnekte 7 Ağustos 1990.")
x.dots(); x.save()

# ---------- 07
x=L('07')
R=["Können Sie das wiederholen?","Können Sie das bitte wiederholen?","Könnten Sie das wiederholen?","Können Sie das noch einmal sagen?","Noch einmal, bitte.","Können Sie bitte langsamer sprechen?","Bitte langsamer."]
x.add('r0:07:d27',R); x.add('r0:07:p05',R)
x.dots(); x.save()

# ---------- 08
x=L('08')
x.add('r0:08:d13',["Ich bin morgen nicht da."])
x.add('r0:08:d14',["Ich habe am Dienstag Zeit.","Ich habe Zeit am Dienstag.","Zeit habe ich am Dienstag."])
x.add('r0:08:d18',["Ich habe einen Termin am Dienstag.","Ich hab einen Termin am Dienstag.","Dienstag habe ich einen Termin.","Dienstag hab ich einen Termin."])
x.add('r0:08:d33',["Freitag um drei.","Freitag um drei Uhr.","Am Freitag um fünfzehn Uhr.","Freitag um fünfzehn Uhr.","Ich habe am Freitag um fünfzehn Uhr Zeit.","Am Freitag um fünfzehn Uhr habe ich Zeit."])
x.clock(x.by['r0:08:d33'])
x.by['r0:08:a:habt-ihr']['exp']['anlam_tr']="Birkaç arkadaşa acıkıp acıkmadıklarını sorar."
x.d['characters'].append('ch:wimmer')
x.dots(); x.save()

# ---------- 09
x=L('09'); d=x.d
x.by['r0:09:a:sie-duerfen']['exp']['parcalar']=[{"de":"Sie dürfen nichts","tr":"size yasak: hiçbir şey"},{"de":"essen","tr":"yemek"}]
d['teach'].append({"id":"r0:09:b:essen","de":"Darf ich essen?","tr":"Yemek yiyebilir miyim?","lexeme":"lx:essen","exp":{"anlam_tr":"Yemek yemek için izin ister.","ne_zaman_tr":"Kan tahlilinden önce muayenehaneye sorarken.","parcalar":[{"de":"Darf","tr":"izin var mı"},{"de":"ich","tr":"ben"},{"de":"essen","tr":"yemek yemek"}]}})
x.add('r0:09:d13',["Morgen kann ich kommen."]); x.add('r0:09:d14',["Einen Termin möchte ich machen."]); x.add('r0:09:d16',["Heute muss ich arbeiten."])
x.add('r0:09:d18',["Dienstag kann ich nicht kommen.","Ich kann Dienstag nicht kommen.","Dienstag kann ich nicht.","Ich kann Dienstag nicht."])
x.add('r0:09:d34',["Ich komme am Montag.","Am Montag komme ich.","Ich komme Montag.","Montag, bitte.","Montag kann ich.","Ich kann Montag kommen."])
C=["ich möchte einen Termin machen","ich möchte einen Termin","ich möchte gern einen Termin machen","ich möchte gerne einen Termin machen","ich hätte gern einen Termin","ich hätte gerne einen Termin","ich brauche einen Termin"]
o=[]
for c in C:
    U=c[0].upper()+c[1:]
    o.append(f"Hier ist {{name}}. {U}.")
    for g in ("Guten Tag","Grüß Gott","Hallo"):
        o+=[f"{g}, {c}.",f"{g}, hier ist {{name}}. {U}.",f"{g}, mein Name ist {{name}}. {U}."]
x.add('r0:09:d29',o); x.add('r0:09:p05',o)
x.save()

# ---------- 10
x=L('10'); d=x.d
for i,l,p,c in (('r0:10:d22','K','Kaufmann','Köln'),('r0:10:d23','S','Samuel','Salzwedel'),('r0:10:p04','M','Martha','München')):
    it=x.by[i]; it['instr_tr']=f"**{l}** harfini **wie** ile bir adla söyle."; it['from_de']=l
    it['accepted']=[f"{l} wie {p}",p,f"{l} {p}",f"{l} wie {c}",c,f"{l} {c}"]
    it['why_tr']=f"Şehir adıyla **{l} wie {c}** de doğrudur."
k=[t['id'] for t in d['drills']].index('r0:10:d11')
d['drills'][k+1:k+1]=[
 {"id":"r0:10:d33","k":"pick","q_tr":"Telefonda **K wie Köln** duydun. Hangi harf?","opts":["K","G","C"],"ans":0,"why_tr":"**Köln** adı **K** ile başlar."},
 {"id":"r0:10:d34","k":"pick","q_tr":"Telefonda **S wie Salzwedel** duydun. Hangi harf?","opts":["Z","S","C"],"ans":1,"why_tr":"**Salzwedel** adı **S** ile başlar."},
 {"id":"r0:10:d35","k":"pick","q_tr":"Telefonda **M wie München** duydun. Hangi harf?","opts":["N","W","M"],"ans":2,"why_tr":"**München** adı **M** ile başlar."}]
pre=["","Meine Telefonnummer ist ","Meine Nummer ist ","Die Nummer ist "]
A="null eins sieben eins"; o=[]
nums=["0171 39200 47","0171 3920047","01713920047","0171 392 00 47"]
for b in ("drei neun zwei null null, vier sieben","drei neun zwo null null, vier sieben","drei neun zwei null null, siebenundvierzig","drei neun zwo null null, siebenundvierzig","neununddreißig zweihundert, siebenundvierzig","neununddreißig, zwei null null, siebenundvierzig","neununddreißig, zwo null null, siebenundvierzig","neununddreißig zwanzig null vier sieben"):
    nums.append(f"{A}, {b}")
for b in ("drei neun zwei null null, vier sieben","drei neun zwei null null, siebenundvierzig"): nums.append(f"null hunderteinundsiebzig, {b}")
for p in pre:
    for n in nums:
        s=p+n+'.'; o.append(s[0].upper()+s[1:])
x.add('r0:10:d20',o)
x.add('r0:10:d13',["Können Sie bitte das buchstabieren?"])
d['characters']+=['ch:brandl','ch:aksoy']
d['mission']['task_tr']="Kendi adını ve soyadını harf harf söyle. Tablodaki kişi adlarını kullan. İstersen şehir adlarıyla da dene. Sesini kaydet ve dinle."
x.save()
