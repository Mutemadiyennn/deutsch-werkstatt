import json
W='/home/claude/cm/work/'
geri={
 'lx:neun':[('mistakes_tr[0]','sayıdan sonra kelime değişiyor galiba','terim var: "çoğul" ne demek bilmiyorum')],
 'lx:zwölf':[('mistakes_tr[0]','sayıdan sonra kelime değişiyor galiba','terim var: "çoğul" ne demek bilmiyorum')],
 'lx:fünfzehn':[('mistakes_tr[0]','sayıdan sonra kelime değişiyor galiba','terim var: "çoğul" ne demek bilmiyorum')],
 'lx:eins':[('ipucu_tr','bir insanın adından önce mi','terim var: "isim" burada kişi adı mı başka şey mi, anlamadım')],
 'lx:Telefonnummer':[('ipucu_tr','telefonda iki başka türlü söylenir','ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta geçmiyor')],
 'lx:Uhrzeit':[('mistakes_tr[0]','saati sorarken başka bir söz denir','ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta geçmiyor')],
 'lx:sechzehn':[('ipucu_tr','bir s harfi yazılmıyor','anlamadım: kelime zaten s ile başlıyor, hangi s yazılmıyor belli değil')],
}
soz={'Adresse':'birinin oturduğu yer, sokak ve numara','neun':'dokuz sayısı','Wochenende':'cumartesi ile pazar, hafta sonu','Nachmittag':'öğleden akşama kadarki zaman','Sommer':'en sıcak mevsim, yaz','Freitag':'hafta sonundan önceki gün, cuma','Sonntag':'haftanın son günü, pazar','zwölf':'on iki sayısı','Samstag':'hafta sonunun ilk günü','Montag':'haftanın ilk iş günü','dritter':'sırada üçüncü ya da ayın üçü','Winter':'en soğuk mevsim, kış','Mittag':'günün ortası, öğle','April':'dördüncü ay, nisan','elf':'on bir sayısı, tek kelime','Viertel':'on beş dakika ya da mahalle','hundert':'yüz sayısı','Dienstag':'haftanın ikinci günü, salı','Donnerstag':'haftanın dördüncü günü, perşembe','Mai':'beşinci ay, mayıs','August':'sekizinci ay, ağustos','Juli':'yedinci ay, temmuz','Mittwoch':'haftanın ortasındaki gün, çarşamba','September':'dokuzuncu ay, eylül','Juni':'altıncı ay, haziran','Telefonnummer':'birini aramak için numara','Oktober':'onuncu ay, ekim','Frühling':'kıştan sonraki mevsim, ilkbahar','Nachname':'ailenin ortak adı, soyadı','Vorname':'soyadından önceki ad','Datum':'gün, ay ve yıl birlikte','zwanzig':'yirmi sayısı','November':'on birinci ay, kasım','Dezember':'yılın son ayı, aralık','März':'üçüncü ay, mart','übermorgen':'yarından sonraki gün','Herbst':'yazdan sonraki mevsim, sonbahar','Buchstabe':'alfabedeki tek işaret, harf','Januar':'yılın ilk ayı, ocak','Februar':'ikinci ay, şubat','Uhrzeit':'bir şeyin saat kaçta olduğu','null':'sıfır sayısı','eins':'bir sayısı','dreizehn':'on üç sayısı','vierzehn':'on dört sayısı','fünfzehn':'on beş sayısı','sechzehn':'on altı sayısı','siebzehn':'on yedi sayısı','achtzehn':'on sekiz sayısı','neunzehn':'on dokuz sayısı','einundzwanzig':'yirmi bir, önce bir söylenir','dreißig':'otuz sayısı','vierzig':'kırk sayısı','fünfzig':'elli sayısı','sechzig':'altmış sayısı','siebzig':'yetmiş sayısı','achtzig':'seksen sayısı','neunzig':'doksan sayısı','erster':'sırada en baştaki ya da ayın biri','vierter':'sırada dördüncü ya da ayın dördü','Vormittag':'sabahtan öğlene kadarki zaman','vorgestern':'dünden önceki gün','wie_viel':'miktar ya da fiyat sormak','möchten':'bir şeyi kibarca istemek','buchstabieren':'kelimeyi harf harf söylemek'}
rows=[];tot=0;ng=0;n=0
for l in open(W+'batch-009.view.jsonl'):
    c=json.loads(l);e=c.get('exp',{});n+=1
    k=1+sum(1 for f in('anlam_tr','ne_zaman_tr','ipucu_tr') if e.get(f))+len(e.get('parcalar',[]))+len(c.get('mistakes_tr',[]))
    tot+=k;i=c['id'];s=soz[i[3:]]
    assert len(s.split())<=8,(i,s)
    if i in geri:
        for a,x,r in geri[i]:
            assert len(x.split())<=8
            rows.append(f'| {i} | {a} | {x} | GERİ | {r} |');ng+=1
        rows.append(f'| {i} | diğer alanlar | {s} | GEÇTİ | |')
    else: rows.append(f'| {i} | hepsi | {s} | GEÇTİ | |')
assert n==65 and len(soz)==65
ids=', '.join(geri)
md=f'''# Okur kontrolü — lexicon parti 009 (OD-9.3)

Girdi: `batch-009.view.jsonl` (65 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca ve 14 kelimeden uzun cümle bulunmadı.

`parcalar` soldan sağa okundu (13 kart): hepsinde çıkan Türkçe, kelimenin anlamını veriyor.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
'''+'\n'.join(rows)+f'''

## Sonuç

- Toplam alan: {tot}
- GEÇTİ: {tot-ng}
- GERİ: {ng} alan, {len(geri)} kart
- GERİ kimlikleri: {ids}

Tek bir GERİ olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
'''
open('/home/claude/deutsch-werkstatt/docs/v2/reviews/okur/lexicon-batch-009.md','w').write(md)
json.dump({'geri':{i:[f'{a}: {r}' for a,x,r in v] for i,v in geri.items()},'toplam':tot,'gecti':tot-ng},open(W+'batch-009.okur.json','w'),ensure_ascii=False,indent=1)
print(tot,tot-ng,ng)
