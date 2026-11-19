import json,re,sys
src,rep,out=sys.argv[1:4]
GERI={
 "lx:sein#2":[("exp.ne_zaman_tr","anlamadım: hangi kelimeler, sahip olan mı sahip olunan mı belli değil","das Kind gibi kelimelerde de... neyi?")],
 "lx:stehen":[("exp.ipucu_tr","yarım kalıyor: başka yerde ne dendiği kutuda yok","güneyde böyle de denirmiş, peki normali?")],
 "lx:Vater":[("mistakes_tr[0]","anlamadım: ne demek isterken yanlış olduğu yazmıyor, der neden die oldu","die Vaters olmaz, die Väter olur, neden?")],
 "lx:Mutter":[("mistakes_tr[0]","anlamadım: ne demek isterken yanlış olduğu yazmıyor","die Mutters olmaz, die Mütter olur, neden?")],
 "lx:richtig":[("exp.anlam_tr","anlamadım: çok öyle olmak ne demek, iki fikir var","doğru demek ya da... çok öyle?")],
 "lx:nett":[("mistakes_tr[1]","anlamadım: sorunun ne sorduğu yazmıyor","rica ederken kibar bir soru, anlamı ne?")],
}
OZET={
"lx:der":"bilinen şeyin önüne gelir, çevrilmez","lx:sein#2":"bir erkeğin olan şey, onun","lx:gehen":"yürüyerek gitmek, bir de olur mu",
"lx:dieser":"yakındaki şeyi gösterir, bu","lx:tun":"bir iş yapmak, acımak, üzgünüm","lx:Mal":"kaçıncı kez olduğunu söyler",
"lx:aus":"nereden geldiğin, ışık kapalı","lx:denken":"fikrini söylemek, birini düşünmek","lx:bei":"birinin yanında, bir yerde olmak",
"lx:wieder":"bir şey yeniden oluyor","lx:Mann":"yetişkin erkek ya da koca","lx:über":"üstünde ya da bir konu hakkında",
"lx:am":"hangi gün olduğunu söyler","lx:verstehen":"anladım ya da anlamadım demek","lx:Gott":"Tanrı, selamda ve şükürde geçer",
"lx:helfen":"birine yardım etmek","lx:erst":"beklenenden geç, ancak, önce bir","lx:stehen":"ayakta durmak, bir yerde yazmak",
"lx:Vater":"baba, seslenirken Papa","lx:morgen":"yarın, büyük harfle sabah","lx:richtig":"doğru, bir de epey",
"lx:Geld":"ödediğin ve kazandığın para","lx:Mutter":"anne, seslenirken Mama","lx:Paar":"iki kişi ya da bir çift eşya",
"lx:paar":"birkaç tane, küçük harfle","lx:sterben":"hayatın bitmesi, ölmek","lx:bekommen":"bir şey sana veriliyor, eline geçiyor",
"lx:schnell":"hızlı, çabuk","lx:beide":"ikisi birden","lx:Ordnung":"düzen, bir de tamam demek",
"lx:vergessen":"unutmak, bir de boş ver","lx:dafür":"bunun için, fikre varım demek","lx:welcher":"seçenekler arasından hangisi",
"lx:Angst":"korku, korkuyorum demek","lx:zusammen":"birlikte, hesapta toplam","lx:wenig":"az, biraz ile farkı var",
"lx:wann":"zamanı sormak, ne zaman","lx:ne":"cümle sonunda değil mi","lx:darüber":"az önceki konu hakkında",
"lx:daran":"az önce söylenene, unutma derken","lx:nett":"sıcak, kibar kişi",
}
def fields(c):
    f=[("tr",c["tr"])]; e=c.get("exp",{})
    for k in("anlam_tr","ne_zaman_tr"):
        if e.get(k): f.append(("exp."+k,e[k]))
    for i,p in enumerate(e.get("parcalar",[])): f.append((f"exp.parcalar[{i}].tr",p["tr"]))
    if e.get("ipucu_tr"): f.append(("exp.ipucu_tr",e["ipucu_tr"]))
    for i,m in enumerate(c.get("mistakes_tr",[])): f.append((f"mistakes_tr[{i}]",m))
    return f
cards=[json.loads(l) for l in open(src,encoding="utf-8") if l.strip()]
tot=0; mech=[]; rows=[]
for c in cards:
    fs=fields(c); tot+=len(fs)
    for n,t in fs:
        if re.search(r'[=;…]|["„“”«»]',t): mech.append((c["id"],n,"sembol",t))
        for s in re.split(r'(?<=[.!?])\s+(?=[A-ZÇĞİÖŞÜ*])',re.sub(r'\*\*','',t)):
            if len(s.split())>14: mech.append((c["id"],n,"uzun %d"%len(s.split()),s))
    g=GERI.get(c["id"],[])
    if not g: rows.append(f"| {c['id']} | hepsi | {OZET[c['id']]} | GEÇTİ | |")
    else:
        rows.append(f"| {c['id']} | diğer alanlar | {OZET[c['id']]} | GEÇTİ | |")
        for a,why,soz in g: rows.append(f"| {c['id']} | {a} | {soz} | GERİ | {why} |")
if mech:
    for m in mech: print("MEKANIK",m)
assert set(GERI)<=set(x["id"] for x in cards) and set(OZET)==set(x["id"] for x in cards)
ng=sum(len(v) for v in GERI.values())
md=["# Okur raporu: lexicon-batch-re1 (OD-9.3)","",
"Girdi: `batch-re1.view.jsonl`, 41 kart (001–003 partilerinden geri dönüp düzeltilenlerin yeniden okuması). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`.","",
"| kart | alan | kendi sözlerimle | karar | neden |","|---|---|---|---|---|"]+rows+["",
"## Sonuç","",f"- Toplam alan: {tot}",f"- GEÇTİ: {tot-ng}",f"- GERİ: {ng}",
"- GERİ kimlikleri: "+", ".join(GERI),"",
"En az bir GERİ olduğu için bu parti \"reviewed\" sayılamaz (OD-9.4).",""]
open(rep,"w",encoding="utf-8").write("\n".join(md))
json.dump({"geri":{k:[f"{a}: {w}" for a,w,_ in v] for k,v in GERI.items()},"toplam":tot,"gecti":tot-ng},open(out,"w",encoding="utf-8"),ensure_ascii=False,indent=1)
print(len(cards),tot,tot-ng,ng)
