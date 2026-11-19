import json,glob,collections
R='/home/claude/deutsch-werkstatt/'
deep={}; where={}
for f in sorted(glob.glob(R+'content/v2/registry/lexicon/batch-00[1-8].json')):
    for i in json.load(open(f))['items']: deep[i['id']]=i; where[i['id']]=f[-8:-5]
v1={i['id']:i for i in json.load(open(R+'content/v2/registry/lexemes.v1.json'))}
L=json.load(open(R+'content/v2/registry/frequency/lemmas.json')); L=next(v for v in L.values() if isinstance(v,list))
rank={x['lemma']:x['rank'] for x in L}
sc=collections.defaultdict(set)
for f in glob.glob(R+'content/v2/domains/*/scenarios/*.json'):
    s=json.load(open(f))
    for i in s['essentials']['lexemes']+s['extras']['lexemes']+[l for k in s['chunks'] for l in k['lexemes']]: sc[i].add(s['id'])
# Gündelik hayat dışı (film/şiddet/küfür): pasif katman; gerekçe grubu
PAS={'siddet':'töten umbringen erschießen schießen Waffe Mord Mörder Leiche kämpfen Kampf angreifen zerstören Soldat Gefängnis verhaften Opfer schlagen hauen schnappen verfolgen erwischen Wache',
'olum':'sterben tot Tod Seele Hölle Teufel heilig',
'kufur':'Scheiße verdammt Arsch Arschloch Idiot Mist Kerl Sex',
'film':'König Schiff Befehl Präsident Ehre retten schwören verraten Geheimnis beweisen Spur Meister Boss Kumpel wetten verstecken fürchten hassen lügen Schatz Liebling küssen Pferd schreien'}
pas={f'lx:{w}':k for k,v in PAS.items() for w in v.split()}
# R0 temel paket (PM-042 B.1)
R0={'gun':'Montag:der Dienstag:der Mittwoch:der Donnerstag:der Freitag:der Samstag:der Sonntag:der Wochenende:das',
'ay':'Januar:der Februar:der März:der April:der Mai:der Juni:der Juli:der August:der September:der Oktober:der November:der Dezember:der Frühling:der Sommer:der Herbst:der Winter:der',
'sayi':'null eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf dreizehn vierzehn fünfzehn sechzehn siebzehn achtzehn neunzehn zwanzig einundzwanzig dreißig vierzig fünfzig sechzig siebzig achtzig neunzig hundert',
'sira':'erster zweiter dritter vierter',
'saat':'Uhr:die Uhrzeit:die Stunde:die Minute:die Viertel:das halb vor nach um Vormittag:der Mittag:der Nachmittag:der Abend:der Nacht:die früh spät',
'tarih':'Datum:das Tag:der Woche:die Monat:der Jahr:das heute gestern morgen übermorgen vorgestern',
'soru':'wer was wo wohin woher wann warum wie welcher wie_viel',
'fiil':'sein haben können müssen dürfen wollen sollen möchten',
'heceleme':'Buchstabe:der buchstabieren Vorname:der Nachname:der Name:der Telefonnummer:die Adresse:die'}
# İhtiyaç listesi: A2 ünite planının alanları (PM-042 B.2, #46 P0-3 ve §4)
NEED={'arzt':'Patient:der Patientin:die Krankenkasse:die Versichertenkarte:die Sprechstunde:die Wartezimmer:das Überweisung:die Krankmeldung:die Krankschreibung:die Attest:das Blutdruck:der Allergie:die Impfung:die Zahnarzt:der Salbe:die Tropfen:die Nebenwirkung:die Notaufnahme:die Bereitschaftsdienst:der Krankenwagen:der Schmerzmittel:das Halsschmerzen:die Kopfschmerzen:die Bauchschmerzen:die Rückenschmerzen:die Schwindel:der Übelkeit:die Durchfall:der Erkältung:die',
'amt':'Ausländerbehörde:die Aufenthaltstitel:der Bürgerbüro:das Meldebescheinigung:die Antrag:der Unterlagen:die Nachweis:der Frist:die Bescheid:der Mahnung:die Behörde:die Staatsangehörigkeit:die Familienname:der Geburtsort:der Wartenummer:die Jobcenter:das Dolmetscher:der beantragen verlängern',
'wohnen':'Vermieter:der Nebenkosten:die Kaution:die Hausmeister:der Störung:die Schimmel:der Zähler:der Briefkasten:der Klingel:die Mietvertrag:der Nachbar:der Nachbarin:die Mülltonne:die Wasserhahn:der Steckdose:die',
'post':'Paket:das Päckchen:das Brief:der Packstation:die Sendung:die Absender:der Empfänger:der Lieferung:die Briefmarke:die abholen zustellen',
'arbeit':'Feierabend:der Vorgesetzte:der Gehalt:das Lohn:der Gehaltsabrechnung:die Schichtplan:der Arbeitsvertrag:der Arbeitsunfall:der Bewerbung:die Vorstellungsgespräch:das Probezeit:die krankmelden',
'einkaufen':'Kasse:die Pfand:das Kassenbon:der Quittung:die Angebot:das Umtausch:der Tüte:die Einkaufswagen:der umtauschen zurückgeben',
'telefon':'Anrufbeantworter:der Durchwahl:die Rückruf:der Warteschleife:die zurückrufen auflegen verbinden',
'verkehr':'Bahnsteig:der Fahrplan:der Abfahrt:die Ankunft:die Fahrschein:der Zugausfall:der Führerschein:der Tankstelle:die Parkplatz:der',
'bank':'IBAN:die Girokonto:das Versicherung:die Vertrag:der Kündigung:die kündigen',
'notfall':'Notruf:der Feuerwehr:die Unfall:der Rettungswagen:der Diebstahl:der Anzeige:die',
'friseur':'Haarschnitt:der Friseur:der Friseurin:die färben schneiden','sport':'Mitgliedschaft:die Geräte:die Umkleide:die'}
def idof(w): return 'lx:'+w
items={}
def add(i,tier,**k):
    if i in pas: return
    if i not in items: items[i]=dict(id=i,oncelik=tier,**k)
def src(i): return 'derin' if i in deep else 'v1' if i in v1 else 'yeni'
for g,s in R0.items():
    for t in s.split():
        w,_,a=t.partition(':'); add(idof(w),1,grup='r0:'+g,kaynak=src(idof(w)),**({'art':a} if a else {}))
for i,ss in sorted(sc.items()): add(i,2,grup='senaryo',kaynak=src(i))
for i,x in v1.items():
    if i not in deep and x.get('level') in('A1','A2'): add(i,3,grup='v1-'+x['level'],kaynak='v1')
for d,s in NEED.items():
    for t in s.split():
        w,_,a=t.partition(':'); add(idof(w),4,grup='ihtiyac:'+d,kaynak=src(idof(w)),**({'art':a} if a else {}))
for i,x in sorted(deep.items(),key=lambda kv:kv[1]['freqRank']):
    if x.get('level') in('A1','A2'): add(i,5,grup='siklik-'+x['level'],kaynak='derin')
for i,x in sorted(deep.items(),key=lambda kv:kv[1]['freqRank']):
    if x.get('level')=='B1': add(i,6,grup='siklik-B1',kaynak='derin')
for it in items.values():
    i=it['id']
    it['parti']=where.get(i); w=i[3:].split('#')[0]; it['rank']=(deep[i]['freqRank'] if i in deep else rank.get(w) or rank.get(w.lower()))
ordered=sorted(items.values(),key=lambda x:(x['oncelik'],x['rank'] or 99999))
for n,x in enumerate(ordered,1): x['sira']=n
pasif=[{'id':i,'neden':k,'parti':where.get(i)} for i,k in pas.items() if i in deep]
miss=[i for i in pas if i not in deep]
out={'schema':1,'review':{'status':'draft'},'note_tr':'K1 çekirdeği: ihtiyaç × sıklık (PM-042 B.2). sira küçükten büyüğe işlenir.','cekirdek':ordered,'pasif':pasif}
json.dump(out,open(R+'content/v2/curriculum/k1.json','w',encoding='utf8'),ensure_ascii=False,indent=0); open(R+'content/v2/curriculum/k1.json','a').write('\n')
c=collections.Counter(x['oncelik'] for x in ordered); s=collections.Counter(x['kaynak'] for x in ordered)
print('toplam',len(ordered),c,s,'pasif',len(pasif),'pasifte kartı olmayan',miss)
first=ordered[:800]; print('ilk 800',collections.Counter(x['kaynak'] for x in first),collections.Counter(x['oncelik'] for x in first))
print('001-003 çekirdekte',sum(1 for x in ordered if x['parti'] in('001','002','003')),'ilk 800 içinde',sum(1 for x in first if x['parti'] in('001','002','003')),'pasif',[p['id'][3:] for p in pasif if p['parti'] in('001','002','003')])
print('senaryoda ama pasif',[i for i in sc if i in pas])
print('yeni kart',sum(1 for x in ordered if x['kaynak']=='yeni'))
