import json, os
J='/home/claude/cm/work/m1re2.okur.json'
d=json.load(open(J))
g=d['geri']
M="Ne demek istediğim yazmıyor, Türkçesi yok."
g.update({
"lx:Nachname.mistakes_tr[0]":"Ne demek istediğim yazmıyor. İki yazım neredeyse aynı, fark söylenmiyor.",
"lx:Nachname.forms[3].hint_tr":"Aynı kartta aynı koşul bir yerde der, burada den veriyor.",
"lx:Adresse.mistakes_tr[0]":"İki Almanca sorunun Türkçesi yok. Ne sorduğum yazmıyor.",
"lx:Telefonnummer.forms[4].hint_tr":"Aynı kartta mit sonrası bir der, bir einer deniyor.",
"lx:Telefonnummer.forms[5].hint_tr":"Aynı kartta mit sonrası bir der, bir einer deniyor.",
"lx:Fieber.forms[4].hint_tr":"'Ateşle derken' ne demek belli değil. Cümle 'ateşin varsa' diyor.",
"lx:verstehen.mistakes_tr[0]":M,
"lx:sagen.mistakes_tr[0]":M,
"lx:sprechen.mistakes_tr[0]":M,
"lx:warten.mistakes_tr[0]":M,
"lx:arbeiten.mistakes_tr[0]":M,
"lx:arbeiten.mistakes_tr[1]":M,
"lx:Anfang.forms[2].tr":"'Başını' iki türlü okunuyor. Neyin başı belli değil.",
"lx:Nummer.forms[4].hint_tr":"Aynı kartta mit sonrası bir einer, bir der deniyor.",
"lx:Nummer.forms[5].hint_tr":"Aynı kartta mit sonrası bir einer, bir der deniyor.",
})
lines=[l for l in open('/home/claude/cm/work/m1re2.txt',encoding='utf-8').read().split('\n') if l.strip()]
txt={l.split('\t')[0]:l.split('\t')[1] for l in lines}
assert all(k in txt for k in g), [k for k in g if k not in txt]
d['toplam']=len(lines); d['gecti']=len(lines)-len(g)
json.dump(d,open(J,'w',encoding='utf-8'),ensure_ascii=False,indent=1)
own={
"gun-02.sesler[m1:02:a1].bolumler[b1].cevapla.situation_tr":"Arkadaşım pasta istiyor. Ona ağustosta bir şeyin olmadığını söyleyeceğim, ama neyin?",
"lx:um.tr":"Vaktinde demek mi, saat kaçta demek mi, emin değilim.",
"lx:nach.tr":"Bir yere doğru ya da bir şeyden sonra, sanırım.",
"lx:heißen.tr":"Birinin adı olmak. Bir de söylemek mi, anlamına gelmek mi?",
"lx:um.coll[1]":"Bir şey yapmak için, galiba.",
"lx:kommen.coll[1]":"Bir yerli olmak mı? Anlamadım.",
"lx:Fieber.forms[4].hint_tr":"Ateşle birlikte derken böyle denir, ama hangi ateş?",
"lx:Anfang.forms[2].tr":"Bir şeyin başını ya da birinin kafasını anlamadım.",
"lx:teuer.mistakes_tr[0]":"Daha pahalı derken biri yanlış biri doğru, ama ikisi aynı görünüyor.",
"lx:ja.mistakes_tr[0]":"Bir soruya Ja değil Doch denir. Hangi durumda, anlamadım.",
}
def o(k):
    if k in own: return own[k]
    if 'mistakes' in k: return "Biri yanlış, biri doğru. Ama ne demek istediğimi bilmiyorum."
    return "Bu kelimeden sonra şu gelir diyor, ama öbür ipucu başka şey diyor."
R='/home/claude/wt-m1/docs/v2/reviews/okur/m1-tekrar2.md'
os.makedirs(os.path.dirname(R),exist_ok=True)
with open(R,'w',encoding='utf-8') as f:
    f.write("# Okur raporu: M1 yeniden okuma 2 (m1re2)\n\nYalnızca GERİ satırları.\n\n| alan | açıklama | kendi sözlerimle | neden |\n|---|---|---|---|\n")
    for k,v in g.items():
        f.write(f"| `{k}` | {txt[k].replace('|','/')} | {o(k)} | {v} |\n")
    f.write(f"\nToplam: {d['toplam']} · GEÇTİ: {d['gecti']} · GERİ: {len(g)}\n\nGERİ kimlikleri:\n")
    for k in g: f.write(f"- `{k}`\n")
    f.write("\nNot: tek bir GERİ bile olduğu için dosya \"reviewed\" sayılamaz (OD-9.4).\n")
print(d['toplam'],d['gecti'],len(g)); print('\n'.join(g))
