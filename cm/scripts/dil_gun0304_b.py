import json
R='/home/claude/wt-m1/content/v2/m1/'
def load(n): return json.load(open(f'{R}gun-{n:02d}.json',encoding='utf8'))
def save(n,d): open(f'{R}gun-{n:02d}.json','w',encoding='utf8').write(json.dumps(d,ensure_ascii=False,indent=1)+'\n')
def by(lst,i): return next(x for x in lst if x['id']==i)
d=load(3)
by(d['video']['bolumler'][0]['dikte'],'d5')['gorev_tr']="Tobi'nin yerine iki kısa cümle yaz. Birinde ev numarası, ötekinde muayenehane numarasının son üç rakamı olsun. Sayıları kelimeyle yaz."
by(by(d['sesler'],'m1:03:a2')['bolumler'][0]['dikte'],'d5')['gorev_tr']="Frau Brandl'a iki kısa cümle yaz. Önce bunun yeni bir numara olduğunu söyle. Sonra numarayı yaz. Sayıları kelimeyle yaz."
d['okuma_yazma']['metin_tr']="İyi günler! Yeni telefon numaram: sıfır sekiz dokuz, dokuz dokuz dokuz dokuz sekiz, üç sıfır yedi. Büro bir numarada. Cumartesi büro kapalı. Pazartesi büro sekizden on ikiye kadar açık. Josef Pichler"
save(3,d)
d=load(4)
v=d['video']; S=lambda i: by(v['sahneler'],i)
S('s9').update({"de":"Hallo, Frau Brandl! Was kostet ein Apfel hier?","tr":"Merhaba Frau Brandl! Burada bir elma ne kadar?"})
S('s10').update({"sahne_tr":"Frau Brandl elindeki kırmızı elmayı havaya kaldırıyor.","de":"Ein Apfel kostet fünfzig Cent.","tr":"Bir elma elli sent."})
S('s11')['sahne_tr']="Ioana başını sallıyor, sepetine bir elma koyuyor."
d5=by(v['bolumler'][0]['dikte'],'d5')
d5['gorev_tr']="Ioana'nın yerine iki kısa cümle yaz: fırında duyduğu tutar ve kendi yaşı. Sayıları kelimeyle yaz."
d5['ornek_de']="Das macht vier Euro achtzig. Ich bin vierunddreißig Jahre alt."
save(4,d)
