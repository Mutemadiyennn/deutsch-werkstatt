import json
R='/home/claude/wt-m1/content/v2/m1/'
def load(n): return json.load(open(f'{R}gun-{n:02d}.json',encoding='utf8'))
def save(n,d): open(f'{R}gun-{n:02d}.json','w',encoding='utf8').write(json.dumps(d,ensure_ascii=False,indent=1)+'\n')
def add(lst,*xs):
    for x in xs:
        if x not in lst: lst.append(x)
def by(lst,i): return next(x for x in lst if x['id']==i)
REV={"status":"draft","by":"dilbilimci-ajan","at":"2026-11-19","notes":"Dil incelemesi: docs/v2/reviews/m1-gun03-04.md. Okur ve örneklem bekliyor."}

# ================= GÜN 3 =================
d=load(3); d['review']=REV
v=d['video']; b=v['bolumler'][0]
s7=by(v['sahneler'],'s7'); s7['de']="Nein, zwo! Zwo eins vier."; s7['tr']="Hayır, **zwo!** İki bir dört."
b['ana_fikir']['q_tr']="Videoda Derya ve Tobi ne yapıyor?"
b['ana_fikir']['opts']=["Muayenehaneden randevu alıyorlar","Yanlış anlaşılan numaraları düzeltiyorlar","Yeni bir ev arıyorlar"]
d2=by(b['dikte'],'d2'); d2['de']="Nein, zwo! Zwo ___ vier."; d2['accepted']=["eins","Eins","eins."]
d5=by(b['dikte'],'d5')
d5['gorev_tr']="Tobi'nin yerine iki kısa cümle yaz: kendi ev numarası ve muayenehane numarasının son üç rakamı. Sayıları kelimeyle yaz."
d5['zorunlu']=["siebzehn","eins vier"]
c=b['cevapla']
c['situation_tr']="Derya sana soruyor. Brunnengasse yedi numarada oturuyorsun. Ev numaranı da söyle."
add(c['accepted'],"Ich wohne Brunnengasse sieben.","Ja, ich wohne Brunnengasse sieben.","In der Brunnengasse sieben.","Ja, Nummer sieben.","Nummer sieben.","Ja, in Nummer sieben.","Ja, ich wohne in Nummer sieben.")

a1=by(d['sesler'],'m1:03:a1'); c=a1['bolumler'][0]['cevapla']
add(c['accepted'],"Nummer vierzehn, bitte.","Ich habe Nummer vierzehn.","Ich habe die Nummer vierzehn.","Die Nummer vierzehn.","Vierzehn, bitte.")

a2=by(d['sesler'],'m1:03:a2'); b=a2['bolumler'][0]
c1=by(a2['script'],'c1'); c1['de']="Guten Tag, hier ist Josef Pichler."; c1['tr']="İyi günler, ben Josef Pichler."
b['ayrinti'][1]['q_tr']="Numaranın son üç rakamı hangisi?"
by(b['dikte'],'d5')['gorev_tr']="Frau Brandl'a iki kısa cümle yaz: önce bunun yeni bir numara olduğunu söyle, sonra numarayı yaz. Sayıları kelimeyle yaz."
c=b['cevapla']
c['situation_tr']="Frau Brandl, Herr Pichler'in yeni numarasını soruyor. Numara: 089 99998 307. Rakam rakam söyle."
add(c['accepted'],"Die neue Nummer ist null acht neun, neun neun neun neun acht, drei null sieben.","Seine Nummer ist null acht neun, neun neun neun neun acht, drei null sieben.","Seine neue Nummer ist null acht neun, neun neun neun neun acht, drei null sieben.")
c['why_tr']="Uzun numarayı küçük gruplara ayırarak, rakam rakam söyle."

g=by(d['gorsel'],'m1:03:g3'); g['dogru_img']="football shirt with number 12 on the back"; g['celdirici_img']=["football shirt with number 2 on the back","football shirt with number 20 on the back","football shirt with number 11 on the back"]
g=by(d['gorsel'],'m1:03:g5'); g['dogru_img']="digital thermometer display showing 0 degrees"; g['celdirici_img']=["digital thermometer display showing 10 degrees","digital thermometer display showing 20 degrees","digital thermometer display showing 5 degrees"]

p=d['prova']; N=lambda i: by(p['dugumler'],i)
p['durum_tr']="Yeni bir telefon numaran var: 0171 39200 47. Bunu bildirmek için muayenehaneni arıyorsun. Adresin Brunnengasse 7, pazartesi günü de randevun var. Telefonu Frau Huber açıyor."
o=N('n1')['secenekler'][0]
o['de']="Guten Tag, hier ist {name}."; o['tr']="İyi günler, ben {name}."
o['accepted']=["Guten Tag, hier ist {name}.","Hallo, hier ist {name}.","Guten Tag, {name} hier.","Hier ist {name}.","Grüß Gott, hier ist {name}.","Guten Tag, hier spricht {name}.","Guten Tag, ich bin {name}.","Guten Tag, mein Name ist {name}.","Guten Morgen, hier ist {name}.","Grüß Gott, {name} hier.","Hallo, {name} hier."]
add(N('n2')['secenekler'][0]['accepted'],"Ich hab eine neue Nummer.","Ich habe eine neue Nummer, Frau Huber.","Ich habe jetzt eine neue Nummer.","Ich habe eine neue Nummer für Sie.")
N('n2')['secenekler'][1]['geri_bildirim_tr']="Bu, aramanın nedeni değil. Yeni numaran için **Ich habe eine neue Nummer.** (Yeni bir numaram var.) de."
o=N('n3')['secenekler'][0]
T="null eins sieben eins, drei neun {} null null, vier sieben."
add(o['accepted'],"Meine neue Nummer ist "+T.format('zwo'),"Die neue Nummer ist "+T.format('zwo'),("Null eins sieben eins, drei neun {} null null, vier sieben.").format('zwei'),"Meine Telefonnummer ist "+T.format('zwei'),"Die Nummer ist "+T.format('zwei'),"Meine neue Nummer ist "+T.format('zwei'),"Die neue Nummer ist "+T.format('zwei'))
add(N('n3')['secenekler'][1]['accepted'],"Wie bitte? Die Nummer?")
N('n3')['secenekler'][2]['geri_bildirim_tr']="**zwölf** (on iki) tek başına telefon numarası olmaz. Numaranı rakam rakam söyle."
o=N('n4')['secenekler'][0]
add(o['accepted'],"Nein, zwo.","Nein, zwei!","Nicht drei, zwei!","Nein, nicht drei, zwo.","Nein, drei neun zwei null null.","Nein, drei neun zwo null null, vier sieben.","Nein, zwo null null.")
N('n4')['secenekler'][1]['geri_bildirim_tr']="Frau Huber **drei** (üç) dedi. Böyle numaran yanlış yazılır. **Nein, zwo!** de."
o=N('n5')['secenekler'][0]
add(o['accepted'],"Ich wohne Brunnengasse sieben.","In der Brunnengasse sieben.","Ja, ich wohne in der Brunnengasse sieben.","Ja, Nummer sieben.","Die Nummer ist sieben.","Brunnengasse Nummer sieben.")
N('n5')['secenekler'][1]['geri_bildirim_tr']="Frau Huber şimdi kapı numaranı soruyor. **Brunnengasse sieben** (Brunnengasse yedi) de."
o=N('n6')['secenekler'][0]
add(o['accepted'],"Nein, nicht siebzehn, sieben.","Nicht siebzehn, sieben.","Sieben, nicht siebzehn.","Nein, Nummer sieben.","Nein, sieben, nicht siebzehn.","Nein, nur sieben.")
N('n6')['secenekler'][1]['geri_bildirim_tr']="Evin yedi numarada. **siebzehn** on yedi demek. **Nein, sieben.** (Hayır, yedi.) de."
o=N('n7')['secenekler'][0]
add(o['accepted'],"Vielen Dank, bis Montag!","Danke schön, bis Montag!","Danke, dann bis Montag!","Danke, bis Montag. Auf Wiederhören!","Ja, danke, bis Montag!")
o=N('n7')['secenekler'][1]
add(o['accepted'],"Auf Wiederhören, bis Montag!","Bis Montag, Frau Huber! Auf Wiederhören!","Tschüs, bis Montag!")
N('n7')['secenekler'][2]['geri_bildirim_tr']="**Hallo** selamlaşırken söylenir. Vedalaşırken **bis Montag** (pazartesi görüşürüz) de."

oy=d['okuma_yazma']
oy['metin_de']="Guten Tag! Ich habe eine neue Telefonnummer: null acht neun, neun neun neun neun acht, drei null sieben. Das Büro ist in Nummer eins. Am Samstag ist das Büro geschlossen. Am Montag ist das Büro von acht bis zwölf offen. Josef Pichler"
oy['metin_tr']="İyi günler! Yeni bir telefon numaram var: sıfır sekiz dokuz, dokuz dokuz dokuz dokuz sekiz, üç sıfır yedi. Büro bir numarada. Cumartesi büro kapalı. Pazartesi büro sekizden on ikiye kadar açık. Josef Pichler"
q=oy['sorular']
q[0]['kanit']=[1,3]
q[1].update({"q_tr":"Duyuruyu kim yazmış?","opts":["Frau Brandl","Dr. Weber","Herr Pichler"],"ans":2,"kanit":[5]})
q[2].update({"q_tr":"Büro hangi gün kapalı?","opts":["cumartesi","cuma","pazartesi"],"ans":0,"kanit":[3]})
q[3]['kanit']=[4]
q[4].update({"situation_tr":"Frau Brandl büronun kaç numarada olduğunu soruyor. Sayıyı söyle.","prompt_de":"Und das Büro? Wie ist die Nummer?",
 "accepted":["Nummer eins.","Eins.","Die Nummer ist eins.","Das Büro ist in Nummer eins.","In Nummer eins.","Die Nummer eins.","Das ist Nummer eins.","Das Büro ist Nummer eins."],
 "why_tr":"Kısa cevap yeter: **Nummer eins** (bir numara)."})
save(3,d)

# ================= GÜN 4 =================
d=load(4); d['review']=REV
v=d['video']; b=v['bolumler'][0]; S=lambda i: by(v['sahneler'],i)
S('s9').update({"de":"Hallo, Frau Brandl! Was kostet ein Kilo Äpfel hier?","tr":"Merhaba Frau Brandl! Burada bir kilo elma ne kadar?"})
S('s10').update({"sahne_tr":"Frau Brandl tezgâhtaki fiyat levhasını gösteriyor.","de":"Ein Kilo Äpfel kostet drei Euro fünfzig.","tr":"Bir kilo elma üç avro elli."})
S('s11')['sahne_tr']="Ioana başını sallıyor, sepetine elma koyuyor."
d5=by(b['dikte'],'d5')
d5['gorev_tr']="İki kısa cümle yaz: Ioana'nın fırında ödediği para ve Ioana'nın yaşı. Sayıları kelimeyle yaz."
d5['ornek_de']="Das macht vier Euro achtzig. Ioana ist vierunddreißig Jahre alt."
b['cevapla'].update({
 "situation_tr":"Frau Brandl bu kez Derya'ya soruyor. Derya otuz altı yaşında. Derya'nın yerine cevap ver.",
 "prompt_de":"Und Sie, Derya? Wie alt sind Sie?",
 "accepted":["Ich bin sechsunddreißig Jahre alt.","Ich bin sechsunddreißig.","Sechsunddreißig Jahre.","Sechsunddreißig.","Sechsunddreißig Jahre alt.","Ich bin sechsunddreißig Jahre."],
 "why_tr":"Otuz altı yaşındayım derken **Ich habe sechsunddreißig Jahre** yanlış. Doğrusu **Ich bin sechsunddreißig Jahre alt**."})

a1=by(d['sesler'],'m1:04:a1'); b=a1['bolumler'][0]
a1['ortam_tr']="Stadtplatz'ta tezgâhlar kurulmuş. Frau Stadler kendi tezgâhının arkasından gelip geçenlere sesleniyor."
by(a1['script'],'c4').update({"de":"Zwei Semmeln kosten nur neunzig Cent.","tr":"İki küçük ekmek yalnızca doksan sent."})
b['ayrinti'][0]['q_tr']="Bugün bir **Semmel** (küçük ekmek) kaç sent?"
b['ayrinti'][1].update({"q_tr":"İki küçük ekmek ne kadar?","opts":["elli sent","dört avro","doksan sent"],"ans":2,"kanit":["c4"]})
by(b['dikte'],'d3').update({"banka":["neunzig","Euro","Cent","Zwei","neunzehn","kosten","Semmeln","nur"],
 "accepted":["Zwei Semmeln kosten nur neunzig Cent.","zwei semmeln kosten nur neunzig cent","Zwei Semmeln kosten nur neunzig Cent"]})
by(b['dikte'],'d5').update({"ornek_de":"Eine Semmel kostet fünfzig Cent. Zwei Semmeln kosten neunzig Cent.","zorunlu":["fünfzig Cent","neunzig Cent"]})
c=b['cevapla']
c['situation_tr']="Arkadaşın bir **Semmel** (küçük ekmek) kaç para diye soruyor. Duyduğun fiyatı söyle."
add(c['accepted'],"Eine Semmel kostet nur fünfzig Cent.","Nur fünfzig Cent.","Heute kostet eine Semmel fünfzig Cent.","Heute kostet eine Semmel nur fünfzig Cent.","Heute fünfzig Cent.","Die kostet fünfzig Cent.","Eine Semmel kostet heute fünfzig Cent.","Eine Semmel kostet heute nur fünfzig Cent.")
a1['eylem'].update({"q_tr":"İki **Semmel** (küçük ekmek) almak istiyorsun. Ne yapmalısın?",
 "opts":["Elli sent hazırla.","Doksan sent hazırla.","Dört avro hazırla."],"ans":1,
 "why_tr":"Bugün iki küçük ekmek birlikte doksan sent tutuyor.","kanit":["c4"]})

a2=by(d['sesler'],'m1:04:a2'); b=a2['bolumler'][0]
a2['ortam_tr']="Cuma günü kuaförde randevun var. Kuaförün Luka'ya fiyatı sormuştun. Luka telefonuna mesaj bırakmış."
by(a2['script'],'c1').update({"de":"Hallo, hier ist Luka vom Salon Haarwerk.","tr":"Merhaba, ben Salon Haarwerk'ten Luka."})
by(b['dikte'],'d5')['gorev_tr']="Arkadaşına iki kısa cümle yaz: randevunun günü ve ücret. Sayıyı kelimeyle yaz."
b['cevapla'].update({
 "situation_tr":"Fırında kasadasın. Frau Stadler nasıl ödeyeceğini soruyor. Nakit ödeyeceksin.",
 "prompt_de":"Mit Karte oder bar?",
 "accepted":["Bar, bitte.","Bar.","Ich zahle bar.","Ich zahle bar, danke.","Bar, danke.","Ich zahle in bar.","In bar, bitte.","In bar."],
 "why_tr":"Kısa cevap yeter: **Bar, bitte.** (Nakit, lütfen.) Tam cümlesi **Ich zahle bar.**"})
a2['eylem']['why_tr']="Luka kartla ödenemediğini söylüyor."

g=by(d['gorsel'],'m1:04:g5'); g['celdirici_img']=["five euro banknote","ten euro banknote","five hundred euro banknote"]

p=d['prova']; N=lambda i: by(p['dugumler'],i)
o=N('n1')['secenekler'][0]
add(o['accepted'],"Guten Tag! Was kostet das, bitte?","Hallo, Frau Brandl! Was kostet das?","Guten Tag, Frau Brandl! Was kostet das, bitte?","Grüß Gott, Frau Brandl! Was kostet das?","Guten Tag! Wie viel kostet das?","Guten Tag, Frau Brandl! Wie viel kostet das?")
o=N('n1')['secenekler'][1]
add(o['accepted'],"Was kostet die Lampe?","Was kostet die Lampe, bitte?","Was macht das?","Wie teuer ist das?","Was kostet das, Frau Brandl?")
o['geri_bildirim_tr']="Doğru. **Was kostet das?** (Bu ne kadar?) fiyat sormanın en kısa yolu."
o=N('n2')['secenekler'][0]
add(o['accepted'],"Dreizehn Euro? Gut.","Dreizehn Euro? Das ist gut.","Das passt.","Dreizehn Euro, passt.","Das ist nicht teuer.","Dreizehn Euro? Das ist nicht teuer.","Gut, dreizehn Euro.","Dreizehn Euro, gut.")
o=N('n2')['secenekler'][1]
add(o['accepted'],"Geht zwölf?","Gehen zwölf Euro?","Geht auch zwölf Euro?","Gehen auch zwölf Euro?")
N('n2')['secenekler'][2]['geri_bildirim_tr']="Frau Brandl **dreizehn** (on üç) dedi. **dreißig** otuz demek."
o=N('n2b')['secenekler'][0]
add(o['accepted'],"Ach, dreizehn!","Ach, dreizehn! Gut.","Dreizehn? Das geht.","Ach, dreizehn Euro! Das geht.","Dreizehn! Das geht.")
N('n2b')['secenekler'][1]['geri_bildirim_tr']="Frau Brandl yine **dreizehn** dedi. Bu on üç demek, otuz değil."
o=N('n3')['secenekler'][0]
add(o['accepted'],"Gut, ich zahle bar.","Ja, ich zahle in bar.","Ich zahle in bar.","Ja, bar geht.","Bar geht.","Ja, das geht.","Ja, gern.")
N('n3')['secenekler'][1]['geri_bildirim_tr']="Frau Brandl kart kabul etmiyor. **Ich zahle bar.** (Nakit ödüyorum.) de."
n4=N('n4')
n4['de']="Danke! Das ist alt. Und ich bin alt!"; n4['tr']="Teşekkürler! Bu eski. Ben de yaşlıyım!"
n4['secenekler']=[
 {"de":"Wie alt sind Sie?","tr":"Kaç yaşındasınız?","accepted":["Wie alt sind Sie?","Wie alt sind Sie, Frau Brandl?","Und wie alt sind Sie?","Wie alt sind Sie denn?","Wie alt?"],"sonraki":"n5","uygun":True,"geri_bildirim_tr":"Doğru. Frau Brandl'a **Sie** (siz) ile kibarca sordun."},
 {"de":"Wie alt bist du?","tr":"Kaç yaşındasın?","accepted":["Wie alt bist du?","Und wie alt bist du?","Wie alt bist du denn?"],"sonraki":"n4","uygun":False,"geri_bildirim_tr":"Frau Brandl'a **du** (sen) denmez. **Wie alt sind Sie?** (Kaç yaşındasınız?) de."}]
n5=N('n5'); n5['de']="Ich bin neunundsiebzig!"; n5['tr']="Yetmiş dokuz yaşındayım!"
o=n5['secenekler'][0]
add(o['accepted'],"Neunundsiebzig?","Neunundsiebzig Jahre? Super!","Super, neunundsiebzig!")
o['geri_bildirim_tr']="Frau Brandl çok seviniyor. Sayıyı tekrar etmek, doğru duyduğunu gösterir."
n5['secenekler'][1]['geri_bildirim_tr']="**neunundsiebzig** yetmiş dokuz demek. Almancada önce küçük sayı söylenir: **neun** (dokuz), sonra **siebzig** (yetmiş)."
p['kapanis_tr']="Fiyat sordun, parayı ödedin ve Frau Brandl'ın yaşını kibarca sordun. Fiyatı yarın fırında da sorabilirsin."

oy=d['okuma_yazma']; y=oy['yazma']
y['gorev_tr']="Derya çarşıdaki fiyatları yazmış ve senin oradaki fiyatları soruyor. Derya'ya benzer bir mesaj yaz: iki fiyat söyle, sonra pahalı olup olmadığını yaz. Sayıları rakamla değil, kelimeyle yaz."
y['ornek_de']="Hallo Derya, hier ist {name}. Ein Brot kostet fünf Euro. Ein Kilo Äpfel kostet vier Euro. Das ist zu teuer!"
y['zorunlu']=["kostet","teuer"]
y['accepted_kaliplar']=["Hallo ___, hier ist ___.","Hallo ___!","Hallo ___,","Ein Brot kostet ___ Euro.","Ein Brot kostet ___ Euro ___.","Ein Kilo ___ kostet ___ Euro.","Ein Kilo ___ kostet ___ Euro ___.","Ein Apfel kostet ___ Cent.","Eine Semmel kostet ___ Cent.","Eine Semmel kostet ___ Euro.","Zwei Semmeln kosten ___ Cent.","Zwei Semmeln kosten ___ Euro.","Ein Brot mit Käse kostet ___ Euro.","Das kostet ___ Euro.","Das kostet ___ Cent.","Das macht ___ Euro.","Das ist teuer.","Das ist zu teuer!","Das ist nicht teuer!","Das ist nicht zu teuer.","Und du?"]
y['kontrol_tr']=["İki fiyatı **kostet** (tutuyor) ile yazdın mı?","Sayıları kelimeyle yazdın mı?","Pahalı olup olmadığını **teuer** (pahalı) ile yazdın mı?"]
save(4,d)
print('ok')
