import json
W='/home/claude/cm/work/'
soz="""beide|iki şeyin ikisi de
Herr|erkeğe saygıyla, soyadıyla seslenme
natürlich|rahatça tabii ki demek
tot|artık yaşamıyor, ölü
lange|çok zaman sürmek
treffen|biriyle bir yerde buluşmak
stellen|bir şeyi dik koymak
ach|şaşırınca ya da anlayınca çıkan ses
gar|hiç demek, olumsuzu güçlendirir
spät|beklenenden sonra, geç
Sache|şey, iş ya da konu
rufen|seslenmek, yardım çağırmak
ins|bir yere doğru gidiş
dort|uzaktaki o yer, orada
weiter|iş ya da yol sürüyor
fallen|yere düşmek
niemand|bir kişi bile yok
seit|o zamandan beri sürüyor
Ordnung|düzen, tamam demek
vom|bir yerden geliş
Problem|çözülmesi gereken zorluk
vergessen|aklından çıkmak, unutmak
davon|az önceki şeyden, ondan
dafür|bunun için, buna evet
verdammt|kaba kızgınlık sözü, bir de çok
zeigen|birine bir şeyi göstermek
Mädchen|küçük ya da genç kız
wegen|bir şeyin sebebi, yüzünden
welcher|seçeneklerden hangisi diye sormak
Ding|adını bilmediğin şey
hin|buradan oraya doğru
sorgen|halletmek ya da kaygılanmak
meinen|demek istemek, düşünmek
Abend|günün akşam saatleri
rein|içeri, bir de saf
drei|üç tane
Freund|arkadaş ya da erkek sevgili
fühlen|kendini nasıl hissettiğin
Welt|yaşadığımız dünya
schaffen|zor işi başarmak, yetiştirmek
weit|uzak yol, bol giysi
Angst|korku duygusu
unter|bir şeyin altında
zusammen|birlikte, beraber
echt|sahte değil, gerçekten
schlafen|uyumak
Hand|bedenimizdeki el
liegen|yatık durmak, bir yerde bulunmak
heißen|adın ne, bu ne demek
lang|bir şeyin uzun olması
wahr|söylenen şey gerçek
ziehen|kendine çekmek, ev taşımak
Moment|çok kısa süre, bir saniye
genug|ihtiyaç kadar var, yeter
schauen|gözle bakmak
Familie|anne baba çocuklar, aile
gegen|karşı olmak, saat gibi
setzen|oturmak, bir şeyi koymak
sonst|başka bir şey, yoksa
Bruder|erkek kardeş
Musik|dinlenen ya da çalınan müzik
Arbeit|yaptığın iş, çalıştığın yer
wenig|miktar az
dabei|yanımda var, ben de varım
erinnern|hatırlamak, birine hatırlatmak
Sohn|erkek çocuk, oğul
Stunde|altmış dakikalık süre
sofort|beklemeden, hemen şimdi
nennen|birine bir adla seslenmek
nah|uzak değil, yakın
bevor|bir şeyi yapmadan önce
entschuldigen|özür dilemek, pardon diye seslenmek
toll|çok beğendim, harika
einmal|bir kez, bir tane
passen|bedene ya da saate uymak
Woche|yedi günlük süre
letzter|sondaki, bir önceki
wann|ne zaman diye sormak
Auge|gördüğümüz organ, göz
Minute|altmış saniyelik süre
fertig|iş bitti, hazır
halt|durum böyle, ne yapalım
allein|yanında kimse olmadan
beim|bir yerde, bir işi yaparken
einzig|başka yok, tek
schlecht|iyi değil, kötü
verschwinden|birden ortadan kaybolmak
Hilfe|yardım, imdat
ne|cümle sonunda değil mi
wichtig|çok değerli, önemli
gern|severek, memnuniyetle
darüber|az önceki konu hakkında
trinken|su gibi şeyleri içmek
dazu|az öncekine ek, yanında
daran|az önce söylenen şeye, ona
nett|sıcak, kibar insan
schreiben|yazı yazmak
Baby|çok küçük çocuk
Dank|teşekkür
hoch|yukarıda, miktarı fazla"""
soz={('lx:'+a):b for a,b in (x.split('|') for x in soz.splitlines())}
geri={
'lx:beide':[('ipucu_tr','iki ayrı şey için böyle denir','anlamadım: asıl kelime de iki şey için, aradaki fark belli değil')],
'lx:Ordnung':[('anlam_tr','düzen demek, başka bir söz de tamam','iki fikir var: kelimenin kendisi ve ondan kurulan başka bir söz')],
'lx:vergessen':[('mistakes_tr[0]','unuttum derken böyle denmez','anlamadım: doğru cümlede iki şey birden değişmiş, hangisi yanlıştı belli değil')],
'lx:dafür':[('anlam_tr','bir şey bunun için, ya da destek','anlamadım: tek okumada çıkmadı, neyin ne için olduğu belli değil')],
'lx:welcher':[('mistakes_tr[1]','otobüs sorarken sonu değişiyor','anlamadım: bir üst notta doğru denen söz burada yanlış, nedeni yok')],
'lx:Angst':[('anlam_tr','korku duygusu, bir kelimeyle söylenir','iki fikir var: anlam ve nasıl söylendiği; ikinci yarı ne demek anlamadım')],
'lx:zusammen':[('anlam_tr','başkalarıyla yapmak, sonrası belirsiz','anlamadım: ikinci yarı hepsini bir anda söylemek gibi okunuyor')],
'lx:wenig':[('mistakes_tr[1]','insanlar için sonuna harf gelir','anlamadım: yalnızca insanlar için mi, başka sayılan şeylerde ne denir belli değil')],
'lx:wann':[('mistakes_tr[0]','bir yerde bu kelime olmaz','anlamadım: cümle ne demek istiyor yazmıyor, hangi durumda yanlış bilemedim')],
'lx:ne':[('tr','değil mi, bir de yok','anlamadım: yok hangi anlamda, açıklamalarda da geçmiyor')],
'lx:darüber':[('mistakes_tr[1]','bir soru böyle soruluyormuş','anlamadım: hangi soru, Türkçesi ne belli değil')],
'lx:daran':[('mistakes_tr[1]','bir soru böyle soruluyormuş','anlamadım: hangi soru, Türkçesi ne belli değil')],
'lx:nett':[('mistakes_tr[0]','eşya için pek övgü değil galiba','anlamadım: tek okumada çıkmadı, cümle dolaşık')],
}
tot=0;rows=[];ids=[]
for l in open(W+'batch-003.view.jsonl'):
    c=json.loads(l);e=c.get('exp',{});i=c['id'];ids.append(i)
    tot+=1+sum(1 for k in('anlam_tr','ne_zaman_tr','ipucu_tr') if e.get(k))+len(e.get('parcalar',[]))+len(c.get('mistakes_tr',[]))
    if i in geri:
        for a,s,n in geri[i]: rows.append(f"| {i} | {a} | {s} | GERİ | {n} |")
        rows.append(f"| {i} | diğer alanlar | {soz[i]} | GEÇTİ | |")
    else: rows.append(f"| {i} | hepsi | {soz[i]} | GEÇTİ | |")
assert set(soz)==set(ids) and set(geri)<=set(ids)
ng=sum(len(v) for v in geri.values())
md=f"""# Okur kontrolü — lexicon parti 003 (OD-9.3)

Girdi: `batch-003.view.jsonl` (100 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok.

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca ve 14 kelimeden uzun cümle bulunmadı.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
"""+"\n".join(rows)+f"""

## Sonuç

- Toplam alan: {tot}
- GEÇTİ: {tot-ng}
- GERİ: {ng} alan, {len(geri)} kart
- GERİ kimlikleri: {', '.join(geri)}

Tek bir GERİ olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
"""
open('/home/claude/deutsch-werkstatt/docs/v2/reviews/okur/lexicon-batch-003.md','w').write(md)
json.dump({"geri":{k:[f"{a}: {n}" for a,s,n in v] for k,v in geri.items()},"toplam":tot,"gecti":tot-ng},open(W+'batch-003.okur.json','w'),ensure_ascii=False,indent=1)
print(tot,tot-ng,ng)
