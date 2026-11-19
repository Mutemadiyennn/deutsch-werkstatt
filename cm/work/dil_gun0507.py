import json,re,itertools
B='/home/claude/wt-m1/content/v2/m1/'
def load(n): return json.load(open(f'{B}gun-{n:02d}.json',encoding='utf8'))
def save(n,d): open(f'{B}gun-{n:02d}.json','w',encoding='utf8').write(json.dumps(d,ensure_ascii=False,indent=1)+'\n')
NUM={'drei':3,'vier':4,'acht':8,'neun':9,'zehn':10,'elf':11,'fünfzehn':15,'sechzehn':16,'einundzwanzig':21,'dreißig':30,'fünfundvierzig':45,'fünfzig':50}
RX=re.compile(r'\b('+'|'.join(NUM)+r') Uhr ('+'|'.join(NUM)+r')\b',re.I)
def uniq(xs):
    out=[]
    for x in xs:
        if x not in out: out.append(x)
    return out
def tv(xs):
    """saat cevabına rakamlı yazımı ekler (konuşma tanıma 10:30 Uhr yazar)"""
    out=list(xs)
    for x in xs:
        if RX.search(x):
            out.append(RX.sub(lambda m:f"{NUM[m.group(1).lower()]}:{NUM[m.group(2).lower()]:02d} Uhr",x))
            out.append(RX.sub(lambda m:f"{NUM[m.group(1).lower()]}:{NUM[m.group(2).lower()]:02d}",x))
    return uniq(out)
def cap(s): return s[0].upper()+s[1:]
def combo(*parts):
    return uniq([cap(''.join(p)) for p in itertools.product(*parts)])
def node(p,i): return next(n for n in p['dugumler'] if n['id']==i)
def opt(p,i,k): return node(p,i)['secenekler'][k]
def sp3(s): return [s, re.sub(r'[.,!?]','',s).lower(), re.sub(r'[.!?]$','',s)]
REV={"status":"draft","by":"dilbilimci-ajan","at":"2026-11-19"}
REPEAT=["Können Sie das wiederholen?","Können Sie das bitte wiederholen?","Könnten Sie das wiederholen?","Können Sie das noch einmal sagen?","Noch einmal, bitte.","Wie bitte?","Wie bitte? Können Sie das wiederholen?","Ich verstehe nicht. Können Sie das wiederholen?","Sprechen Sie bitte langsam!","Bitte langsam!","Bitte langsamer.","Können Sie bitte langsamer sprechen?","Können Sie bitte langsam sprechen?"]
REQ=["Ich möchte einen Termin machen.","Ich möchte einen Termin.","Ich brauche einen Termin.","Ich hätte gern einen Termin.","Ich hätte gerne einen Termin.","Ich möchte gern einen Termin machen.","Ich möchte gerne einen Termin machen."]

# ================= GÜN 5
d=load(5); d['review']=REV
v=d['video']; S={s['id']:s for s in v['sahneler']}
S['s1']['sahne_tr']="Derya bir kafede, elinde büyük bir duvar saatiyle kameraya el sallıyor."
S['s10'].update(de="Guten Tag, hier ist Ioana Popescu. Ist mein Termin um halb zehn?",tr="İyi günler, ben Ioana Popescu. Randevum dokuz buçukta mı?")
b=v['bolumler'][0]
b['ayrinti'][0]['q_tr']="Ioana başta randevunun saat kaçta olduğunu sanıyor?"
b['dikte'][4].update(gorev_tr="Ioana'nın randevu saatini Almanca iki kısa cümleyle yaz. Önce **halb** ile, sonra saat ve dakika ile yaz.")
b['cevapla']['accepted']=tv(b['cevapla']['accepted']+["Zehn Uhr dreißig, ja?","Also zehn Uhr dreißig, ja?","Um halb elf? Also zehn Uhr dreißig?"])
a=d['sesler'][0]
a['ortam_tr']="Akşam VilsFit salonundasın. Hoparlörden kapanış duyurusu geliyor."
C={c['id']:c for c in a['script']}
C['c4'].update(de="Morgen früh sind wir ab sechs Uhr wieder da.",tr="Yarın sabah saat altıdan itibaren yeniden buradayız.")
b=a['bolumler'][0]
b['dikte'][3]['accepted']=sp3("Morgen früh sind wir ab sechs Uhr wieder da.")
b['dikte'][4].update(gorev_tr="Salonun bugün ve yarın hangi saatte açık olduğunu Almanca iki kısa cümleyle yaz.",ornek_de="Heute ist es bis zehn Uhr offen. Morgen ist es ab sechs Uhr offen.",zorunlu=["bis zehn","ab sechs"])
b['cevapla']['accepted']=uniq(b['cevapla']['accepted']+["Es ist 9:45 Uhr.","Es ist 9:45.","9:45 Uhr.","9:45.","Es ist einundzwanzig Uhr fünfundvierzig.","Einundzwanzig Uhr fünfundvierzig.","Es ist 21:45 Uhr.","Es ist 21:45.","21:45 Uhr.","Es ist drei viertel zehn.","Es ist dreiviertel zehn.","Dreiviertel zehn.","Es ist jetzt Viertel vor zehn."])
a=d['sesler'][1]; C={c['id']:c for c in a['script']}
C['c3'].update(de="Der Arzt ist erst am Donnerstag wieder da.",tr="Doktor ancak perşembe günü yeniden burada.")
b=a['bolumler'][0]
b['ayrinti'][0]['q_tr']="Doktor hangi gün yeniden muayenehanede?"
b['dikte'][1]['de']="Der Arzt ist erst am ___ wieder da."
b['dikte'][4].update(gorev_tr="Randevunu Almanca iki kısa cümleyle yaz: doktorun geldiği gün ve randevu saati.",ornek_de="Der Arzt ist am Donnerstag da. Mein Termin ist um Viertel nach zehn.",zorunlu=["Donnerstag","zehn"])
b['cevapla']['accepted']=uniq(b['cevapla']['accepted']+["Ja, das ist gut.","Ist gut.","Ja, gut.","Ja, danke.","Ja, das passt. Danke!"])
d['gorsel'][3]['celdirici_img'][1]="analog wall clock showing 10:10"
p=d['prova']
o=opt(p,'n1',0)
o['accepted']=uniq([o['de']]+combo(["Guten Tag, ","Hallo, ","Hallo Luka, ","Grüß Gott, ",""],["hier ist {name}. ","mein Name ist {name}. "],["Um wie viel Uhr ist mein Termin?","Wann ist mein Termin?"]))
o['geri_bildirim_tr']="Güzel. Önce adını söyledin, sonra randevunu sordun."
o=opt(p,'n1',1)
o.update(uygun=False,sonraki='n1',geri_bildirim_tr="Soru doğru, ama Luka telefonda kimin aradığını bilmiyor. Önce adını söyle.")
o['accepted']=uniq(o['accepted']+["Hallo, um wie viel Uhr ist mein Termin?","Guten Tag, wann ist mein Termin?","Hallo, wann ist mein Termin?"])
opt(p,'n1',2)['geri_bildirim_tr']="Bu soru şu anki saati sorar. Randevun için **Um wie viel Uhr ist mein Termin?** (Randevum saat kaçta?) de."
o=opt(p,'n2',0); o['accepted']=tv(o['accepted']+["Fünfzehn Uhr dreißig, ja?","Halb vier, also fünfzehn Uhr dreißig?"])
o=opt(p,'n2',1); o['accepted']=uniq(o['accepted']+["Wie bitte? Wann?","Noch einmal, bitte."])
o=opt(p,'n2',2); o['accepted']=tv(o['accepted'])
n=node(p,'n2b'); n.update(de="Nein, nicht vier Uhr dreißig! Halb vier ist drei Uhr dreißig.")
o=opt(p,'n2b',0); o['accepted']=tv(o['accepted']+["Also drei Uhr dreißig?","Drei Uhr dreißig?","Also fünfzehn Uhr dreißig?","Ach so, fünfzehn Uhr dreißig.","Ach so, drei Uhr dreißig. Danke!"])
opt(p,'n2b',1)['geri_bildirim_tr']="Luka **drei Uhr dreißig** (üç otuz) dedi. Saati onun gibi tekrar et."
o=opt(p,'n3',0); o['accepted']=uniq(o['accepted']+["Ja, gut.","Ist gut.","Ja, das ist gut.","Ja, danke."])
o=opt(p,'n3',1)
o['accepted']=uniq([o['de']]+combo(["Das ist zu früh. ","Das ist leider zu früh. ","Das ist mir zu früh. ","Das ist mir leider zu früh. ","Leider zu früh. ",""],["Geht Viertel nach vier?","Geht es um Viertel nach vier?","Geht um Viertel nach vier?","Geht sechzehn Uhr fünfzehn?"]))
opt(p,'n3',2)['geri_bildirim_tr']="Bu çok sert duyulur. **Das ist zu früh.** (Bu çok erken.) de ve başka bir saat öner."
o=opt(p,'n4',0); o['accepted']=tv(o['accepted']+["Sechzehn Uhr fünfzehn, ja?","Viertel nach vier, also sechzehn Uhr fünfzehn?","Also sechzehn Uhr fünfzehn. Danke!","Also um sechzehn Uhr fünfzehn?"])
o=opt(p,'n4',1); o['accepted']=tv(o['accepted']); o['geri_bildirim_tr']="**fünfzig** elli demek. Çeyrek için **fünfzehn** (on beş) söylenir."
node(p,'n5').update(de="Ja, gut. Dann bis Freitag!",tr="Evet, tamam. O zaman cuma görüşürüz!")
o=opt(p,'n5',0); o['accepted']=uniq(o['accepted']+["Vielen Dank, bis Freitag!","Danke schön, bis Freitag!","Danke, auf Wiederhören!","Danke. Bis Freitag!"])
opt(p,'n5',2)['geri_bildirim_tr']="Randevu cuma günü. **Bis Freitag!** (Cuma görüşürüz!) de."
oy=d['okuma_yazma']
oy['title_tr']="Muayenehanenin çalışma saatleri"
oy['metin_de']="Praxis Dr. Weber: Von Montag bis Freitag ist die Praxis von acht bis zwölf Uhr offen. Am Dienstag und am Donnerstag ist sie am Nachmittag von fünfzehn bis achtzehn Uhr offen. Am Mittwoch ist die Praxis nur am Vormittag offen. Am Freitag ist sie nur bis zwölf Uhr offen. Am Samstag und am Sonntag ist die Praxis geschlossen."
oy['metin_tr']="Dr. Weber muayenehanesi: Pazartesiden cumaya kadar sekizden on ikiye kadar açık. Salı ve perşembe öğleden sonra on beşten on sekize kadar açık. Çarşamba yalnızca öğleden önce açık. Cuma yalnızca on ikiye kadar açık. Cumartesi ve pazar kapalı."
q=oy['sorular']
q[2].update(q_tr="Perşembe öğleden sonra hangi saatler arasında açık?",opts=["14 ile 18 arasında","10 ile 12 arasında","15 ile 18 arasında"],ans=2,kanit=[1])
q[3]['kanit']=[3]; q[4]['kanit']=[4]
save(5,d)

# ================= GÜN 6
d=load(6); d['review']=REV
v=d['video']; S={s['id']:s for s in v['sahneler']}
S['s12'].update(de="Zum Arzt. Ich habe um elf einen Termin.",tr="Doktora. Saat on birde randevum var.")
b=v['bolumler'][0]
b['ayrinti'][1]['opts']=["doktora","tren istasyonuna","kuaföre"]
b['dikte'][4].update(gorev_tr="Frau Stadler'in söylediği iki şeyi Almanca yaz: bugünün tarihi ve randevusunun saati.",zorunlu=["siebte","elf"])
b['cevapla']['accepted']=uniq(b['cevapla']['accepted']+["Heute ist der 3. Mai.","Der 3. Mai.","Heute haben wir den dritten Mai.","Heute haben wir den 3. Mai.","Heute ist der 3.5.","Der dritte Mai ist heute."])
a=d['sesler'][0]
a.update(title_tr="Muayenehanede kayıt masası",ortam_tr="Muayenehanede sıra bekliyorsun. Frau Huber önündeki yeni hastayla konuşuyor, sonra bekleyen birini çağırıyor.")
C={c['id']:c for c in a['script']}
C['c1'].update(de="Guten Morgen!",tr="Günaydın!")
b=a['bolumler'][0]
b['ana_fikir'].update(q_tr="Frau Huber yeni hastaya ne söylüyor?",opts=["Muayenehanenin kapandığını","Doktorun bugün gelmediğini","Kayıt için hangi bilgilerin gerektiğini"])
b['ayrinti'][1]['q_tr']="Yeni gelen biri hangi bilgileri vermeli?"
b['dikte'][4].update(gorev_tr="Frau Huber'in yeni hastadan istediği dört bilgiyi Almanca yaz.",ornek_de="Vorname, Nachname, Geburtsdatum und Telefonnummer.",zorunlu=["Vorname","Nachname","Geburtsdatum","Telefonnummer"])
b['cevapla'].update(situation_tr="Sıra sende. Frau Huber adını soruyor. Adını söyle.",prompt_de="Wie ist Ihr Name?",
  accepted=["Mein Name ist {name}.","{name}.","Ich heiße {name}.","Ich bin {name}.","Mein Name ist {name}, guten Morgen.","Guten Morgen, mein Name ist {name}.","Guten Morgen, ich heiße {name}.","Guten Morgen, ich bin {name}."],
  why_tr="Kısa cevap da olur: yalnızca adını söyle.")
a['eylem']['why_tr']="Frau Huber yeni gelenlerden bu bilgileri istiyor."
a=d['sesler'][1]; C={c['id']:c for c in a['script']}
C['c4'].update(de="Am Donnerstag brauche ich Ihre Adresse und Ihr Geburtsdatum.",tr="Perşembe günü adresiniz ve doğum tarihiniz gerekiyor.")
b=a['bolumler'][0]
b['ana_fikir']['opts'][1]="Randevu tarihini ve o gün gerekenleri söylemek için"
b['dikte'][1]['de']="Am Donnerstag brauche ich Ihre ___ und Ihr Geburtsdatum."
b['dikte'][4].update(gorev_tr="Randevunu Almanca iki kısa cümleyle yaz: tarih, saat ve gün.",ornek_de="Mein Termin ist am dritten Dezember um neun Uhr. Das ist ein Donnerstag.",zorunlu=["Dezember","neun"])
b['cevapla'].update(
  accepted=uniq(["Am dritten Dezember.","Mein Termin ist am dritten Dezember.","Der Termin ist am dritten Dezember.","Am dritten Dezember um neun Uhr.","Am dritten Dezember um neun.","Mein Termin ist am dritten Dezember um neun Uhr.","Am dritten Zwölften.","Am 3. Dezember.","Am 3. Dezember um neun Uhr.","Am 3.12.","Mein Termin ist am 3. Dezember."]),
  why_tr="Üç aralıkta derken **am drei Dezember** yanlış. Doğrusu **am dritten Dezember**.")
a['eylem'].update(q_tr="Perşembe günü randevuya giderken hangi bilgiler hazır olmalı?",why_tr="Frau Schneider perşembe günü bu iki bilgiyi istiyor.")
p=d['prova']
o=opt(p,'n1',0); o['accepted']=uniq(o['accepted']+["Wie ist Ihr Vorname, bitte?","Wie ist Ihr Name?","Wie heißen Sie, bitte?","Der Vorname, bitte?"])
opt(p,'n1',1)['geri_bildirim_tr']="Bu soru birini gösterip sorulur. Adı için **Wie ist Ihr Vorname?** (Adınız ne?) de."
o=opt(p,'n2',0); o['accepted']=["Danke. Wie ist Ihr Geburtsdatum?","Wie ist Ihr Geburtsdatum?","Ihr Geburtsdatum, bitte?","Und Ihr Geburtsdatum?","Danke. Und Ihr Geburtsdatum?","Danke. Ihr Geburtsdatum, bitte?","Und wie ist Ihr Geburtsdatum?","Wie ist Ihr Geburtsdatum, bitte?","Was ist Ihr Geburtsdatum?","Wann sind Sie geboren?","Danke. Wann sind Sie geboren?"]
o['geri_bildirim_tr']="Güzel. Kâğıtta sıradaki bilgi doğum tarihi."
o=opt(p,'n3',0); o['accepted']=uniq(o['accepted']+["Also der 24. November?","Der 24. November?","Also am 24. November?","Also der vierundzwanzigste Elfte?","Der vierundzwanzigste Elfte?","Der vierundzwanzigste November, ja?","Also der 24.11.?"])
o=opt(p,'n3',1); o['accepted']=uniq(o['accepted']+["Also der 4. November?","Der 4. November?","Also der vierte Elfte?"])
node(p,'n4').update(de="Ja, der vierundzwanzigste November. Was noch?",tr="Evet, yirmi dört kasım. Başka ne var?")
o=opt(p,'n4',0); o['accepted']=uniq(o['accepted']+["Was ist Ihre Telefonnummer?","Wie ist Ihre Telefonnummer, bitte?","Die Telefonnummer, bitte.","Und wie ist Ihre Telefonnummer?","Und Ihre Nummer?","Und wie ist Ihre Nummer?"])
opt(p,'n4',1)['geri_bildirim_tr']="Bu soru saati sorar. Kâğıt için **Wie ist Ihre Telefonnummer?** (Telefon numaranız ne?) de."
o=opt(p,'n5',0); o['accepted']=uniq(o['accepted']+["Vier eins fünf. Danke!","Vier eins fünf, richtig?","415, ja?","415?","Also 415?"]); o['geri_bildirim_tr']="Çok iyi. Son rakamları tekrar edip kontrol ettin."
o=opt(p,'n5',1); o['accepted']=uniq(o['accepted']+["Noch einmal, bitte.","Können Sie das wiederholen?","Können Sie das bitte wiederholen?","Bitte langsamer."])
o=opt(p,'n5',2); o['accepted']=uniq(o['accepted']+["514, ja?","514?"]); o['geri_bildirim_tr']="Rakamların sırası değişti. Frau Brandl **vier eins fünf** (dört bir beş) dedi."
o=opt(p,'n6',0); o['accepted']=tv(o['accepted']+["Montag um zehn Uhr dreißig.","Montag, halb elf.","Ihr Termin ist am Montag um zehn Uhr dreißig.","Der Termin ist am Montag um zehn Uhr dreißig.","Am Montag um halb elf, Frau Brandl.","Am Montag. Um halb elf."])
o=opt(p,'n6',1); o['accepted']=tv(o['accepted'])
oy=d['okuma_yazma']
oy['title_tr']="Derya'ya cevap yaz"
oy['metin_de']="Hallo {name}! Mein Geburtstag ist am siebten März. Wann hast du Geburtstag? Derya"
oy['metin_tr']="Merhaba {name}! Doğum günüm yedi martta. Senin doğum günün ne zaman? Derya"
y=oy['yazma']
y.update(gorev_tr="Derya'ya cevap yaz. Kendi doğum gününü söyle ve ona başka bir soru sor.",
 ornek_de="Hallo Derya! Mein Geburtstag ist am dritten Mai. Wie alt bist du?",
 accepted_kaliplar=["Hallo ___!","Hallo ___, hier ist ___.","Danke, ___!","Mein Geburtstag ist am ___.","Ich habe am ___ Geburtstag.","Am ___ habe ich Geburtstag.","Am ___.","Wie alt bist du?","Und wie alt bist du?","Wann hast du Urlaub?","Was machst du am ___?","Was machst du im ___?","Woher kommst du?","Wo wohnst du?","Und du?"],
 kontrol_tr=["Selam verdin mi?","Tarihi **am** ile yazdın mı?","Sonunda Derya'ya bir soru var mı?"])
save(6,d)

# ================= GÜN 7
d=load(7); d['review']=REV
d['characters']=["ch:aksoy","ch:popescu","ch:huber"]
v=d['video']
for s in v['sahneler']:
    if s['speaker']=='ch:lechner': s['speaker']='ch:popescu'
    s['sahne_tr']=s['sahne_tr'].replace("Tobi'ye","Ioana'ya").replace("Tobi","Ioana")
    s['de']=s['de'].replace("Tobias Lechner","Ioana Popescu").replace("Tobi","Ioana")
    s['tr']=s['tr'].replace("Tobias Lechner","Ioana Popescu").replace("Tobi","Ioana")
S={s['id']:s for s in v['sahneler']}
S['s1']['sahne_tr']="Derya bir kafede, elinde telefonla kameraya el sallıyor."
b=v['bolumler'][0]
b['ana_fikir']['q_tr']="Derya, Ioana'ya ne öğretiyor?"
b['ayrinti'][0]['q_tr']="Ioana'nın nesi var?"
b['ayrinti'][1]['q_tr']="Anlamayınca Ioana ne istiyor?"
b['dikte'][4].update(gorev_tr="Muayenehaneyi arayınca söyleyeceğin ilk iki cümleyi Almanca yaz: adın ve isteğin.",zorunlu=["ist","einen Termin"])
b['cevapla']['accepted']=uniq(b['cevapla']['accepted']+REPEAT)
b['cevapla']['why_tr']="Anlamamak sorun değil. **Können Sie das wiederholen?** (Bunu tekrar edebilir misiniz?) telefonda seni kurtarır."
a=d['sesler'][0]; b=a['bolumler'][0]
b['dikte'][4].update(gorev_tr="Ateşin var. Kayıttan öğrendiğini kendi ağzından Almanca iki kısa cümleyle yaz.",zorunlu=["Fieber","bis elf"])
b['cevapla'].update(prompt_de="Praxis Dr. Weber, Huber, guten Tag.",situation_tr="Bekledin, sonunda Frau Huber telefonu açtı. Adını ve ne istediğini söyle.",
  accepted=uniq(["Guten Tag, hier ist {name}. Ich möchte einen Termin machen."]+REQ+["Einen Termin, bitte.","Ich möchte bitte einen Termin machen.","Kann ich einen Termin machen?","Ich habe Fieber. Ich möchte einen Termin machen.","Ich bin krank. Ich möchte einen Termin machen.","Ich habe Fieber. Ich brauche einen Termin."]+combo(["Guten Tag, ","Hallo, ","Grüß Gott, ",""],["hier ist {name}. ","mein Name ist {name}. "],REQ)+combo(["Guten Tag, ","Grüß Gott, "],["ich möchte einen Termin machen.","ich brauche einen Termin.","ich hätte gern einen Termin.","ich möchte einen Termin."])),
  why_tr="Randevu isterken **Ich will** (istiyorum) sert duyulur. **Ich möchte** (rica ediyorum) daha kibardır.")
a=d['sesler'][1]; C={c['id']:c for c in a['script']}
C['c4'].update(de="Kannst du das bitte im Büro sagen?",tr="Bunu ofiste söyleyebilir misin lütfen?")
b=a['bolumler'][0]
b['ayrinti'][1]['opts']=["Ona ilaç getirmeni","Ofise haber vermeni","Onu aramanı"]
b['dikte'][3]['accepted']=sp3("Kannst du das bitte im Büro sagen?")
b['dikte'][4].update(gorev_tr="Ofiste Derya için ne söyleyeceğini Almanca iki kısa cümleyle yaz.")
b['cevapla'].update(situation_tr="Derya senden bir şey rica ediyor. Yapabilirsin, kabul et.",prompt_de="Kannst du das bitte im Büro sagen?",
  accepted=["Ja, das geht.","Ja, das kann ich.","Ja, kann ich.","Ja, gern.","Ja, das mache ich.","Ja, mache ich.","Ja, klar.","Ja, ich kann das im Büro sagen.","Ja, ich sage es im Büro.","Ja, ich sage das im Büro.","Ja, das kann ich sagen.","Ja, das geht. Gute Besserung!","Ja, gern. Gute Besserung!","Ja."],
  why_tr="Kısa cevap da olur: **Ja, das geht.** (Evet, olur.)")
a['eylem'].update(opts=["İş yerinde haber ver: Derya hasta, yarın gelmiyor.","Derya'nın evine git.","Pazartesiye kadar bekle."],why_tr="Derya bunu ofiste söylemeni rica ediyor.")

p=d['prova']
p['durum_tr']="Ateşin var. Aile hekimin Dr. Weber'in muayenehanesini ilk kez arıyorsun. Frau Huber açıyor. Adresin: Brunnengasse 7. Kendini tanıt ve randevu iste."
N={n['id']:n for n in p['dugumler']}
O=lambda de,tr,acc,nx,ok,fb: {"de":de,"tr":tr,"accepted":uniq([de]+acc),"sonraki":nx,"uygun":ok,"geri_bildirim_tr":fb}
old={k:[o for o in n.get('secenekler',[])] for k,n in N.items()}
# n1
a1=old['n1'][0]; a1['accepted']=uniq(a1['accepted']+["Grüß Gott, hier ist {name}.","Grüß Gott, mein Name ist {name}.","Hallo, mein Name ist {name}.","Guten Tag, Frau Huber, hier ist {name}.","Guten Tag, Frau Huber. Hier ist {name}."]); a1['geri_bildirim_tr']="Güzel. Telefonda önce adını söyledin."
b1=O("Guten Tag, hier ist {name}. Ich möchte einen Termin machen.","İyi günler, ben {name}. Randevu almak istiyorum.",combo(["Guten Tag, ","Hallo, ","Grüß Gott, ",""],["hier ist {name}. ","mein Name ist {name}. "],REQ),"n3",True,"Çok iyi. Adını ve isteğini tek seferde söyledin.")
N['n1']['secenekler']=[a1,b1,old['n1'][1]]
# n2
N['n2'].update(de="Guten Tag! Ja, bitte?",tr="İyi günler! Buyurun?")
a2=old['n2'][0]; a2['accepted']=uniq(a2['accepted']+REQ+["Ich möchte gerne einen Termin.","Einen Termin, bitte!","Kann ich bitte einen Termin machen?"]); a2['sonraki']='n3'; a2['geri_bildirim_tr']="Tam böyle. **Ich möchte** (rica ediyorum) kibar ve açık."
b2=old['n2'][1]; b2['accepted']=uniq([b2['de']]+combo(["Ich bin krank. ","Ich habe Fieber. ","Ich bin krank, ich habe Fieber. ","Ich bin krank und ich habe Fieber. "],REQ[:5])+["Ich bin krank und ich möchte einen Termin machen.","Ich habe Fieber und ich möchte einen Termin machen.","Ich bin krank und ich brauche einen Termin.","Ich habe Fieber und ich brauche einen Termin."]); b2['sonraki']='n4'
c2=old['n2'][2]; c2['geri_bildirim_tr']="Burası muayenehane. **Ich möchte einen Termin machen.** (Randevu almak istiyorum.) de."
N['n2']['secenekler']=[a2,b2,c2]
# n3: yakınma
f1=old['n4'][0]; f1['accepted']=uniq(f1['accepted']+["Ich hab Fieber.","Ich bin krank und ich habe Fieber.","Ich bin krank und habe Fieber.","Ich habe Fieber und ich bin krank.","Ich bin krank. Ich habe Fieber.","Fieber. Ich habe Fieber."]); f1['sonraki']='n4'
f2=old['n4'][1]; f2['sonraki']='n3'
n3={"id":"n3","de":"Gern. Was haben Sie denn?","tr":"Memnuniyetle. Neyiniz var?","secenekler":[f1,f2]}
# n4: adres
w1=old['n3'][0]; w1['accepted']=uniq(w1['accepted']+["Ich wohne Brunnengasse sieben.","Ja, ich bin neu. Ich wohne in der Brunnengasse sieben.","Ja. Ich wohne in der Brunnengasse sieben.","Ja, ich wohne in der Brunnengasse sieben.","Ja, in der Brunnengasse sieben.","Meine Adresse ist Brunnengasse sieben.","In Wendlfing, Brunnengasse sieben.","Ich wohne in der Brunnengasse sieben in Wendlfing."]); w1['sonraki']='n5'
w2=old['n3'][1]; w2['accepted']=uniq(w2['accepted']+["Ja, ich bin neu. Ich wohne in Wendlfing.","Ja, ich wohne in Wendlfing.","Ja. Ich wohne in Wendlfing."]); w2['sonraki']='n5'; w2['geri_bildirim_tr']="Doğru. Sokağı ve numarayı da söylersen Frau Huber seni daha çabuk kaydeder."
w3=old['n3'][2]; w3['sonraki']='n4'
n4={"id":"n4","de":"Sie sind neu hier, oder? Wo wohnen Sie?","tr":"Burada yenisiniz, değil mi? Nerede oturuyorsunuz?","secenekler":[w1,w2,w3]}
# n5
N['n5'].update(de="Gut. Können Sie morgen um halb neun kommen?",tr="Tamam. Yarın sekiz buçukta gelebilir misiniz?")
t1=old['n5'][0]; t1['accepted']=tv(t1['accepted']+["Also acht Uhr dreißig? Das passt.","Also acht Uhr dreißig? Ja, das passt.","Acht Uhr dreißig, ja, das geht.","Ja, das passt.","Das passt.","Das geht.","Ja, das kann ich.","Ja, ich kann um halb neun kommen.","Ja, halb neun passt.","Ja, morgen um halb neun geht.","Ja, ich kann morgen um acht Uhr dreißig kommen.","Ja, ich kann kommen.","Ja, gern."]); t1['geri_bildirim_tr']="Harika. Saati anladın ve kabul ettin."
t2=O("Um halb neun kann ich nicht. Geht es am Nachmittag?","Sekiz buçukta gelemem. Öğleden sonra olur mu?",
   ["Um halb neun kann ich leider nicht. Geht es am Nachmittag?","Das ist zu früh. Geht es am Nachmittag?","Das ist leider zu früh. Geht es am Nachmittag?","Das ist mir zu früh. Geht es am Nachmittag?","Das geht leider nicht. Geht es am Nachmittag?","Morgen früh kann ich nicht. Geht es am Nachmittag?","Ich kann morgen früh nicht. Geht es am Nachmittag?","Geht es am Nachmittag?","Geht es morgen Nachmittag?","Geht es auch am Nachmittag?","Um halb neun kann ich nicht.","Um halb neun kann ich leider nicht.","Um halb neun kann ich nicht kommen.","Um halb neun kann ich nicht. Ich muss arbeiten.","Um halb neun muss ich arbeiten.","Ich kann morgen früh nicht. Ich muss arbeiten.","Morgen früh muss ich arbeiten.","Das geht leider nicht. Ich muss arbeiten.","Leider nicht, ich muss arbeiten.","Das ist zu früh.","Das ist leider zu früh."],
   "n6",True,"Çok iyi. Bu saatin sana uymadığını kibarca söyledin.")
t3=old['n5'][2]; t3['accepted']=uniq(t3['accepted']+["Ja, um 9:00 Uhr.","Also neun Uhr?"])
N['n5']['secenekler']=[t1,t2,t3]
# n6
N['n6'].update(de="Dann morgen Nachmittag, um Viertel nach drei?",tr="O zaman yarın öğleden sonra, üçü çeyrek geçe?")
u1=old['n6'][0]; u1['accepted']=tv(u1['accepted']+["Also fünfzehn Uhr fünfzehn? Ja, das passt.","Also fünfzehn Uhr fünfzehn? Ja, das geht.","Also drei Uhr fünfzehn? Das passt.","Also drei Uhr fünfzehn?","Drei Uhr fünfzehn?","Ja, Viertel nach drei, das geht.","Ja, um Viertel nach drei, das passt.","Ja, um Viertel nach drei kann ich kommen.","Ja, das passt gut.","Passt.","Ja, passt.","Das geht.","Ja, am Nachmittag geht es.","Ja, gern."])
u2=old['n6'][1]; u2['accepted']=uniq(u2['accepted']+REPEAT); u2['geri_bildirim_tr']="Çok doğru. Anlamayınca tekrar ettirmek en güvenli yol."
u3=old['n6'][2]; u3['accepted']=tv(u3['accepted'])
N['n6']['secenekler']=[u1,u2,u3]
# n7, n8
N['n7'].update(de="Ja, gut. Dann bis morgen!",tr="Evet, tamam. O zaman yarın görüşürüz!")
k1=N['n7']['secenekler'][0]; k1['accepted']=uniq(k1['accepted']+["Vielen Dank, bis morgen!","Vielen Dank und bis morgen!","Vielen Dank und auf Wiederhören.","Danke. Wiederhören!","Auf Wiederhören!","Danke. Bis morgen!","Danke, bis morgen. Auf Wiederhören!"])
N['n7']['secenekler'][2]['geri_bildirim_tr']="Bu selamlaşma sözü. Vedalaşırken **bis morgen** (yarın görüşürüz) de."
N['n8'].update(de="Bis morgen! Gute Besserung!",tr="Yarın görüşürüz! Geçmiş olsun!")
p['dugumler']=[N['n1'],N['n2'],n3,n4,N['n5'],N['n6'],N['n7'],N['n8']]

T={t['id']:t for t in d['hafta_sonu_testi']}
t=T['m1:07:t01']; t['accepted']=tv(uniq(t['accepted']+["Ja, das kann ich.","Ja, ich kann.","Ja, ich kann kommen.","Ja, am Dienstag kann ich.","Ja, am Dienstag kann ich kommen.","Ja, Dienstag passt.","Ja, Dienstag geht.","Ja, am Dienstag geht es.","Das passt.","Passt.","Ja, passt.","Ja, das passt gut.","Ja, gern.","Ja, um halb neun, das geht.","Ja, halb neun passt.","Also acht Uhr dreißig? Ja, das geht.","Also acht Uhr dreißig? Das passt.","Ja, ich komme am Dienstag.","Ja, ich komme.","Ja, ich kann um halb neun kommen."]))
T['m1:07:t02']['why_tr']="**kann** ikinci sırada durur, **kommen** en sona gider."
t=T['m1:07:t03']; t['accepted']=uniq(t['accepted']+["Mein Name ist {name}.","Hallo, mein Name ist {name}.","Grüß Gott, hier ist {name}.","Grüß Gott, mein Name ist {name}.","Guten Tag, Frau Huber, hier ist {name}."])
t=T['m1:07:t04']; t['accepted']=tv(uniq(t['accepted']+["Zehn Uhr fünfundvierzig, ja?","Viertel vor elf, also zehn Uhr fünfundvierzig?","Um Viertel vor elf? Also zehn Uhr fünfundvierzig?"])); t['why_tr']="**Viertel vor elf** on bire çeyrek kala demek, yani 10:45."
t=T['m1:07:t07']; t['accepted']=uniq(t['accepted']+REPEAT)
t['why_tr']="Anlamayınca susma. **Können Sie das wiederholen?** (Bunu tekrar edebilir misiniz?) de."
T['m1:07:t08']['why_tr']="Bir şeyin saat kaçta olduğunu söylerken **um** kullanılır: **um neun Uhr** saat dokuzda demek."
t=T['m1:07:t10']; t['situation_tr']="Komşun sana soruyor: hasta mısın? Hastasın ve ateşin var."
t['accepted']=uniq(t['accepted']+["Ja, ich bin krank, ich habe Fieber.","Ja, ich habe Fieber, ich bin krank.","Ja, ich hab Fieber.","Ja, bin ich.","Ja, leider.","Ja, bin ich. Ich habe Fieber.","Ja, leider. Ich habe Fieber.","Ja, ich bin krank und habe Fieber.","Ich bin krank und ich habe Fieber.","Ja."])
t=T['m1:07:t11']; t['accepted']=uniq(t['accepted']+["Ich möchte gern einen Termin machen.","Ich möchte gerne einen Termin machen.","Ich möchte gerne einen Termin.","Ich möchte gern einen Termin."])
t=T['m1:07:t12']; t['accepted']=["Ich bin {name}.","Mein Name ist {name}.","{name}.","Ich heiße {name}.","Guten Tag, ich bin {name}.","Guten Tag, mein Name ist {name}.","Guten Tag, ich heiße {name}."]
save(7,d)
print('ok')
