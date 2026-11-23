# Örneklem kontrolü: İÇ-4 A1 4. hafta (22.–28. gün)

qa-ajanı · 2026-11-23 · hat: yazar → dilbilimci (`docs/v2/reviews/ic4-hafta-04.md`, ONAY) → okur (`docs/v2/reviews/okur/ic4-hafta-04.md`) → **örneklem**

## Kapsam ve dosya durumu
Çalışma ağacındaki izlenmeyen dosyalar (okur GERİ düzeltmeleri uygulanmış hâli; örnek: `g22` `goal_tr` artık 11 kelime). sha256 ilk 12 hane:

| Dosya | sha256 |
|---|---|
| `content/v2/m1/gun-22.json` | `18cd703d36bd` |
| `content/v2/m1/gun-23.json` | `775a61a1b2fc` |
| `content/v2/m1/gun-24.json` | `704b0c4f5e4a` |
| `content/v2/m1/gun-25.json` | `eb6cf623cd28` |
| `content/v2/m1/gun-26.json` | `750a84c7c6e6` |
| `content/v2/m1/gun-27.json` | `51043e11bac3` |
| `content/v2/m1/gun-28.json` | `1240c93a47ef` |
| `content/v2/m1/hafta-sonu-testi-04.json` | `ca67a92659b7` |
| `content/v2/m1/gorulmemis-04.json` | `1d761567c1d4` |

Dosyalar değişirse kimlikler aynı kalsa bile seçim yeniden üretilmeli.

## Yöntem (tekrarlanabilir)
- **Tohum: `20261123`** (Python `random.Random(20261123)`).
- Evren: dosyalardaki bütün maddeler, 20 katmana ayrıldı. Katmanlar dosya sırasıyla dolaşıldı (gün 22→28, sonra hafta testi, sonra görülmemiş). Gün içinde sıra: halkalar, sahne, sesler, görsel, prova, okuma/yazma, gün sınavı.
- Katman başına seçilen: `max(ceil(0,11 × N), min(N, 3))`. Her katmanda `rng.sample(range(N), k)`, katmanlar aşağıdaki sırayla ve aynı `rng` ile.
- Evren 991 madde, rastgele seçilen **129** (%13,0).
- **Zorunlu ek (5):** görevin istediği "ev ilanı" türü rastgele seçime düşmedi. 26. günün ilan metni ve 4 okuma sorusu elle eklendi. Oran iki biçimde de verildi.

| Katman | N | Seçilen |
|---|---:|---:|
| halka-gorev (görev cümlesi + `accepted`) | 168 | 19 |
| halka-kalip | 57 | 7 |
| halka-sahne-satir | 55 | 7 |
| halka-soru | 18 | 3 |
| sahne-satir (`de` + `tr` + `sahne_tr`) | 113 | 13 |
| soru-anafikir (+ `kanit`) | 21 | 3 |
| soru-ayrinti (+ `kanit`) | 42 | 5 |
| dikte (5 basamak) | 105 | 12 |
| cevapla | 21 | 3 |
| ses-satir | 74 | 9 |
| eylem (+ `kanit`) | 14 | 3 |
| gorsel | 42 | 5 |
| prova-dugum | 40 | 5 |
| prova-secenek (+ `geri_bildirim_tr`) | 91 | 11 |
| okuma-metin | 7 | 3 |
| okuma-soru (+ `kanit`) | 24 | 3 |
| yazma | 3 | 3 |
| gun-sinavi | 77 | 9 |
| hafta-testi | 12 | 3 |
| gorulmemis | 7 | 3 |
| **Toplam** | **991** | **129** |

<details><summary>Seçim betiği (birebir; çıktı aşağıdaki 129 kimlik)</summary>

```python
import json, math, random
from collections import OrderedDict
B='content/v2/m1/'; SEED=20261123; items=[]
def add(s,i,p): items.append((s,i,p))
for n in range(22,29):
    d=json.load(open(f'{B}gun-{n}.json'))
    for h in d['halkalar']:
        hid=h['id']
        for k,gc in enumerate(h['gorev_cumleleri']): add('halka-gorev',f'{hid}.gc{k}',gc)
        for k,kp in enumerate(h['kaliplar']): add('halka-kalip',f'{hid}.kalip{k}',kp)
        sh=h.get('sahne')
        if sh:
            for k,st in enumerate(sh['satirlar']): add('halka-sahne-satir',f'{hid}.sahne{k}',st)
            add('halka-soru',f'{hid}.soru',sh['soru'])
    for s in d['sahne']['sahneler']: add('sahne-satir',f"{d['sahne']['id']}.{s['id']}",s)
    def bolum(src,bl):
        for b in bl:
            pre=f"{src}.{b['id']}"
            if b.get('ana_fikir'): add('soru-anafikir',pre+'.ana',b['ana_fikir'])
            for k,a in enumerate(b.get('ayrinti',[])): add('soru-ayrinti',f'{pre}.ay{k}',a)
            for dk in b.get('dikte',[]): add('dikte',f"{pre}.{dk['id']}",dk)
            if b.get('cevapla'): add('cevapla',b['cevapla']['id'],b['cevapla'])
    bolum(d['sahne']['id'],d['sahne']['bolumler'])
    for a in d['sesler']:
        for c in a['script']: add('ses-satir',f"{a['id']}.{c['id']}",c)
        bolum(a['id'],a['bolumler'])
        if a.get('eylem'): add('eylem',a['eylem']['id'],a['eylem'])
    for gv in d['gorsel']: add('gorsel',gv['id'],gv)
    p=d['prova']
    for nd in p['dugumler']:
        add('prova-dugum',f"{p['id']}.{nd['id']}",nd)
        for k,sc in enumerate(nd.get('secenekler',[])): add('prova-secenek',f"{p['id']}.{nd['id']}.s{k}",sc)
    oy=d['okuma_yazma']
    add('okuma-metin',f'm1:{n}:okuma',oy)
    for q in oy.get('sorular',[]): add('okuma-soru',q['id'],q)
    if oy.get('yazma'): add('yazma',f'm1:{n}:yazma',oy['yazma'])
    for m in d['gun_sinavi']['maddeler']: add('gun-sinavi',m['id'],m)
for m in json.load(open(B+'hafta-sonu-testi-04.json'))['maddeler']: add('hafta-testi',m['id'],m)
for m in json.load(open(B+'gorulmemis-04.json'))['durumlar']: add('gorulmemis',m['id'],m)
rng=random.Random(SEED); strata=OrderedDict()
for it in items: strata.setdefault(it[0],[]).append(it)
sel=[]
for s,lst in strata.items():
    k=max(math.ceil(0.11*len(lst)), min(len(lst),3))
    sel+=[lst[i] for i in sorted(rng.sample(range(len(lst)),k))]
for s,i,_ in sel: print(s,i)
```
</details>

## Her maddeye bakılanlar
Almanca doğru ve doğal mı · Türkçe çeviri doğru mu · `accepted` ≥ 3 ve her cevap doğru, anlamca uygun mu · tek doğru cevap var mı, `kanit` cümlesi onu destekliyor mu · dikte merdiveni kuralları (FORMAT "Pilotun netleştirdikleri": `kolay` doğru şık cümlede, çeldiriciler değil; `orta` tek boşluk; `zor`/`usta` tek satır, `banka` cevap kelimeleri + ≥ 2 çeldirici; `accepted` aynı metnin ≥ 3 yazımı; sıra) · OD-9 (≤ 14 kelime, tek fikir, `=` `;` `…` tırnak yok, terim yok) · öğrenci adı yalnız `{name}`, `audio_de` içinde yer tutucu yok · Bairisch yok · kişisel bilgi yok · bina (öğrenci 2. kat; Brandl ve Pichler 1. kat, yan yana) ve şehir tutarlılığı.

OD-9 biçim denetimi örneklemdeki bütün açıklama alanlarında betikle de koşuldu (cümle başına kelime, yasak işaretler, `audio_de` yer tutucusu, Bairisch işaret kelimeleri): bulgu 0.

## Sonuçlar

### Rastgele örneklem (129)

| # | Kimlik | Tür | Karar | Neden |
|---:|---|---|---|---|
| 1 | `m1:22:h1.gc7` | halka-gorev | GEÇTİ | **Der Husten ist schlimm.** doğru; 3 kabul aynı anlam. |
| 2 | `m1:22:h2.gc3` | halka-gorev | GEÇTİ | **von Frau Brandl** sahiplik (dilbilimci açık 5); çeviri ve kabuller doğru. |
| 3 | `m1:22:h2.gc8` | halka-gorev | GEÇTİ | **Zahl** sayı anlamında doğru kullanılmış; kabuller doğru. |
| 4 | `m1:22:h3.gc2` | halka-gorev | GEÇTİ | **Ich gebe sie (morgen) Frau Brandl zurück**: zamir önce, sözdizimi doğru. |
| 5 | `m1:22:h3.gc5` | halka-gorev | GEÇTİ | **für morgen absagen** doğal; çeviri doğru. |
| 6 | `m1:22:h3.gc8` | halka-gorev | GEÇTİ | **geschlossen / zu** ikisi de doğru. |
| 7 | `m1:23:h1.gc2` | halka-gorev | GEÇTİ | **alt, aber (es ist) schön** doğru. |
| 8 | `m1:23:h1.gc6` | halka-gorev | GEÇTİ | Ad yalnız `{name}`; kabuller doğru. |
| 9 | `m1:23:h2.gc1` | halka-gorev | GEÇTİ | **das Gemüse** tekil; Türkçede **sebzeler** doğal karşılık. |
| 10 | `m1:23:h4.gc7` | halka-gorev | GEÇTİ | Doğru, kabuller anlamca aynı. |
| 11 | `m1:24:h1.gc2` | halka-gorev | GEÇTİ | **unser Hausmeister** doğru. |
| 12 | `m1:24:h3.gc7` | halka-gorev | GEÇTİ | Doğru. |
| 13 | `m1:25:h1.gc0` | halka-gorev | GEÇTİ | **ein Paar Schuhe** (büyük P) doğru; çeviri **bir çift**. |
| 14 | `m1:25:h1.gc9` | halka-gorev | GEÇTİ | Doğru. Not 2: **Busfahren** yazımı da kabul edilmeli. |
| 15 | `m1:26:h2.gc0` | halka-gorev | GEÇTİ | **das dritte ist am besten** doğru (26. gün ilanları). |
| 16 | `m1:27:h1.gc0` | halka-gorev | GEÇTİ | Şehir planıyla tutarlı (süpermarket belediye ile eczane arasında). |
| 17 | `m1:27:h1.gc5` | halka-gorev | GEÇTİ | **Hat … offen** güney gündelik dili, lehçe değil; kabul uygun. |
| 18 | `m1:27:h1.gc9` | halka-gorev | GEÇTİ | Doğru. |
| 19 | `m1:28:h1.gc7` | halka-gorev | GEÇTİ | **Annas Sohn** de doğru. Pichler kuralıyla çatışma bilerek kurulmuş (hikâye). |
| 20 | `m1:22:h2.kalip1` | halka-kalip | GEÇTİ | **die → sie** doğru. |
| 21 | `m1:22:h2.kalip2` | halka-kalip | GEÇTİ | **Es ist weg → Yok** kart anlamıyla (**gitmiş, yok**) uyumlu. Not 1: günün öbür satırları **kayıp** diyor. |
| 22 | `m1:25:h1.kalip6` | halka-kalip | GEÇTİ | Karşılaştırma biçimleri doğru; **lieber = tercihen** kitabi (dilbilimci takip notu). |
| 23 | `m1:25:h1.kalip7` | halka-kalip | GEÇTİ | **so … wie … = … kadar …** doğru. |
| 24 | `m1:26:h1.kalip3` | halka-kalip | GEÇTİ | Doğru. |
| 25 | `m1:27:h1.kalip5` | halka-kalip | GEÇTİ | Doğru. |
| 26 | `m1:28:h1.kalip1` | halka-kalip | GEÇTİ | **Auf Wiederhören** telefona özgü diye doğru açıklanmış. |
| 27 | `m1:22:h2.sahne0` | halka-sahne-satir | GEÇTİ | Doğru. |
| 28 | `m1:22:h4.sahne2` | halka-sahne-satir | GEÇTİ | Doğru. Not 5 (okuma notundaki pasta). |
| 29 | `m1:23:h1.sahne2` | halka-sahne-satir | GEÇTİ | Doğru; Pichler koridor konusunda tutarlı. |
| 30 | `m1:23:h2.sahne1` | halka-sahne-satir | GEÇTİ | **die Tomaten → sie sind** doğru. |
| 31 | `m1:24:h2.sahne2` | halka-sahne-satir | GEÇTİ | **Ab zehn ist alles wieder gut** doğal; çeviri doğru. |
| 32 | `m1:25:h1.sahne2` | halka-sahne-satir | GEÇTİ | **Ein paar Tassen hier sind kaputt** doğru (dilbilimci düzeltmesi). |
| 33 | `m1:27:h1.sahne2` | halka-sahne-satir | GEÇTİ | Doğru. |
| 34 | `m1:22:h4.soru` | halka-soru | GEÇTİ | Tek cevap: **in der Werkstatt → Tamirhanede**. |
| 35 | `m1:24:h3.soru` | halka-soru | GEÇTİ | **zu jung für mich → Onun için fazla gençler** tek cevap. |
| 36 | `m1:27:h1.soru` | halka-soru | GEÇTİ | İki satır birlikte tek cevabı veriyor. |
| 37 | `m1:22:v1.s7` | sahne-satir | GEÇTİ | Doğru. |
| 38 | `m1:25:v1.s1` | sahne-satir | GEÇTİ | Doğru; **Grüß Gott** standart güney selamı. |
| 39 | `m1:25:v1.s4` | sahne-satir | GEÇTİ | **teurer** doğru. |
| 40 | `m1:25:v1.s5` | sahne-satir | GEÇTİ | Doğru. |
| 41 | `m1:25:v1.s6` | sahne-satir | GEÇTİ | Doğru; çeviri doğal. |
| 42 | `m1:25:v1.s7` | sahne-satir | GEÇTİ | Doğru. |
| 43 | `m1:26:v1.s4` | sahne-satir | GEÇTİ | **Fiyatı ne kadar** doğru karşılık. |
| 44 | `m1:26:v1.s6` | sahne-satir | GEÇTİ | Doğru. |
| 45 | `m1:26:v1.s11b` | sahne-satir | GEÇTİ | **nicht weit vom Bahnhof** doğru. |
| 46 | `m1:27:v1.s4` | sahne-satir | GEÇTİ | **da → evde** bağlamda doğru. |
| 47 | `m1:27:v1.s12` | sahne-satir | GEÇTİ | Cumartesi 10 ve 3. kat; 24, 26, 27 ile saat tutarlı. |
| 48 | `m1:28:v1.s5` | sahne-satir | GEÇTİ | Doğru. |
| 49 | `m1:28:v1.s14` | sahne-satir | GEÇTİ | Doğru. |
| 50 | `m1:24:a2.b1.ana` | soru-anafikir | GEÇTİ | `c3` + `c5` cevabı veriyor; mesajda küf yok, çeldiriciler yanlış. |
| 51 | `m1:27:a1.b1.ana` | soru-anafikir | GEÇTİ | `c2`–`c4` kural ve teknisyen; tek cevap. |
| 52 | `m1:28:a2.b1.ana` | soru-anafikir | GEÇTİ | `c2` davet, `c4` fincan; tek cevap. |
| 53 | `m1:22:a1.b1.ay1` | soru-ayrinti | GEÇTİ | `c4` **auf dem Schrank**; **Dolapta** çeldiricisi ayırt edilebilir. |
| 54 | `m1:23:a1.b1.ay0` | soru-ayrinti | GEÇTİ | `c3` **in Ihrer Küche**; teknisyen soruda adıyla geçiyor. |
| 55 | `m1:25:v1.b1.ay1` | soru-ayrinti | GEÇTİ | `s6` **größer und neu**. |
| 56 | `m1:25:a1.b1.ay1` | soru-ayrinti | GEÇTİ | `c5` **bis vier Uhr**. |
| 57 | `m1:26:v1.b1.ay1` | soru-ayrinti | **HATA** | Çeldirici **Balkonu yok** gerçekte de doğru: aynı günün ilanında 2. ilan (am Bahnhof) balkonsuz, provada `n3` **Nein, Nummer zwei hat keinen Balkon** öğretiliyor. **Neden uymuyor?** sorusunun iki savunulabilir cevabı var. |
| 58 | `m1:22:v1.b1.d2` | dikte orta | GEÇTİ | Tek boşluk **er**; 3 yazım. |
| 59 | `m1:23:a2.b1.d4` | dikte usta | GEÇTİ | Tek satır (iki nokta üst üste ile tek cümle); 3 yazım; kart örneği değil. |
| 60 | `m1:24:v1.b1.d5` | dikte gerçek | GEÇTİ | Örnek iki zorunlu kelimeyi içeriyor; sahneyle tutarlı (istasyondaki ev 800, fazla pahalı). |
| 61 | `m1:25:a1.b1.d5` | dikte gerçek | GEÇTİ | Örnek anonsa uygun, zorunlular var. |
| 62 | `m1:25:a2.b1.d5` | dikte gerçek | GEÇTİ | Mesajla tutarlı (Stadler'in sandalyesi daha güzel, cuma saat dört). |
| 63 | `m1:26:v1.b1.d4` | dikte usta | GEÇTİ | `s12` tek cümle (dilbilimci bölmesi); 3 yazım. |
| 64 | `m1:26:v1.b1.d5` | dikte gerçek | GEÇTİ | 3. ilan en ucuz ve balkonlu; doğru. |
| 65 | `m1:27:a1.b1.d2` | dikte orta | GEÇTİ | **hinter**; 3 yazım. |
| 66 | `m1:27:a2.b1.d2` | dikte orta | GEÇTİ | **neben**; 3 yazım. |
| 67 | `m1:28:v1.b1.d1` | dikte kolay | GEÇTİ | **zehn** cümlede geçiyor, **elf** ve **acht** geçmiyor. |
| 68 | `m1:28:a2.b1.d2` | dikte orta | GEÇTİ | **Einladung**; 3 yazım. |
| 69 | `m1:28:a2.b1.d3` | dikte zor | GEÇTİ | `c4b` tek cümle; banka 4 cevap + 2 çeldirici. |
| 70 | `m1:23:a2:c1` | cevapla | GEÇTİ | 7 kabul, hepsi reklamla uyumlu; açıklama terimsiz. |
| 71 | `m1:25:v1:c1` | cevapla | GEÇTİ | **diesen** (eril, -i hâli) doğru; 7 kabul uygun. |
| 72 | `m1:27:a2:c1` | cevapla | GEÇTİ | Ev süpermarketin arkasında, 2. kat: şehir ve bina tutarlı. |
| 73 | `m1:22:a1.c5` | ses-satir | GEÇTİ | Doğru. |
| 74 | `m1:23:a2.c1` | ses-satir | GEÇTİ | **Guten Tag, Wendlfing!** (dilbilimci düzeltmesi) doğal radyo selamı. |
| 75 | `m1:23:a2.c2` | ses-satir | GEÇTİ | Doğru; çeviri doğru. |
| 76 | `m1:24:a1.c2` | ses-satir | GEÇTİ | Doğru. |
| 77 | `m1:24:a1.c5` | ses-satir | GEÇTİ | Doğru. |
| 78 | `m1:25:a1.c4` | ses-satir | GEÇTİ | Doğru. |
| 79 | `m1:27:a1.c1` | ses-satir | GEÇTİ | Doğru. |
| 80 | `m1:27:a2.c1` | ses-satir | GEÇTİ | Doğru. |
| 81 | `m1:27:a2.c4` | ses-satir | GEÇTİ | Doğru (`c4b` ayrı). |
| 82 | `m1:25:a1:e1` | eylem | GEÇTİ | `c2` + `c5` doğru şıkkı destekliyor. Not 3: ortam **meydandasın** diyor, şık **meydana git**. |
| 83 | `m1:26:a1:e1` | eylem | GEÇTİ | `c3` + `c5`; tek cevap. Not 6 (ev zinciri). |
| 84 | `m1:27:a2:e1` | eylem | GEÇTİ | `c3` + `c4` evin yeri ve katı soruluyor; tek cevap. |
| 85 | `m1:23:g5` | gorsel | GEÇTİ | Sorgu ve çeldiriciler ayrışıyor. |
| 86 | `m1:24:g4` | gorsel | GEÇTİ | Ayrışıyor. |
| 87 | `m1:25:g1` | gorsel | GEÇTİ | **ein Paar Schuhe** resmi, tek ayakkabı ve eldiven çeldiricilerinden ayrışıyor. |
| 88 | `m1:25:g4` | gorsel | GEÇTİ | **laufen = yürümek** (güney kullanımı) resimle uyumlu. |
| 89 | `m1:28:g5` | gorsel | **HATA** | `dogru_img` **second floor**: Amerikan İngilizcesinde bu, Almanca **erster Stock** demek. Çeldirici **top floor highlighted** zemin + 2 katlı binada tam **zweiter Stock**'un kendisi olur. Haftanın asıl öğrettiği nokta (kat sayımı) yanlış resimle öğretilebilir. |
| 90 | `m1:23:p1.n6` | prova-dugum | GEÇTİ | Doğru. |
| 91 | `m1:24:p1.n5` | prova-dugum | GEÇTİ | Doğru; seçenekler **zu teuer** ile uyumlu. |
| 92 | `m1:25:p1.n4` | prova-dugum | GEÇTİ | Doğru. |
| 93 | `m1:26:p1.n3` | prova-dugum | GEÇTİ | İlanla tutarlı (2. ilan balkonsuz). |
| 94 | `m1:28:p1.n1` | prova-dugum | GEÇTİ | Almanca doğru; ilk tanışma çerçevesi `durum_tr`'de kurulmuş (dilbilimci açık 1, PM kararı). |
| 95 | `m1:22:p1.n2.s0` | prova-secenek | GEÇTİ | **das Rezept → es**; 4 kabul; geri bildirim doğru. |
| 96 | `m1:22:p1.n3.s1` | prova-secenek | GEÇTİ | **die Einladung → sie / die**; doğru. |
| 97 | `m1:24:p1.n1.s2` | prova-secenek | GEÇTİ | Yanlış seçenek doğru işaretli; geri bildirim terimsiz. |
| 98 | `m1:24:p1.n2.s1` | prova-secenek | GEÇTİ | **sehr teuer** ile **zu teuer** farkı doğru gösteriliyor (okur notu). |
| 99 | `m1:25:p1.n1.s1` | prova-secenek | GEÇTİ | Almanca doğru. Not 4: `durum_tr` **bir fincan** diyor. |
| 100 | `m1:26:p1.n1.s1` | prova-secenek | GEÇTİ | İlan 3: 450 + 60; doğru. |
| 101 | `m1:26:p1.n2.s2` | prova-secenek | GEÇTİ | Yanlış seçenek; geri bildirim (30 m², en küçük) doğru. |
| 102 | `m1:27:p1.n3.s1` | prova-secenek | GEÇTİ | Şehir planıyla tutarlı. |
| 103 | `m1:28:p1.n2.s1` | prova-secenek | GEÇTİ | 2. kat, **im**; bina tutarlı. |
| 104 | `m1:28:p1.n4.s0` | prova-secenek | GEÇTİ | **lieb** doğal; kabuller uygun. |
| 105 | `m1:28:p1.n5.s0` | prova-secenek | GEÇTİ | **das Fahrrad → es**; **Garantie** doğru. |
| 106 | `m1:22:okuma` | okuma-metin (yazma notu) | GEÇTİ | Almanca ve çeviri doğru; `{name}` doğru yerde. Not 5. |
| 107 | `m1:25:okuma` | okuma-metin (yazma notu) | GEÇTİ | Karşılaştırmalar doğru; **Hier sind zwei Jacken** (dilbilimci düzeltmesi). |
| 108 | `m1:28:okuma` | okuma-metin | GEÇTİ | Pichler 1. katta, Brandl'ın yanında; bina tutarlı. |
| 109 | `m1:22:o2` | okuma-soru | GEÇTİ | Kanıt 3 **Ich gebe sie morgen zurück** (yazan Ioana); tek cevap. |
| 110 | `m1:23:o1` | okuma-soru | GEÇTİ | Kanıt 2 doğru cümleye düşüyor. |
| 111 | `m1:24:o1` | okuma-soru | GEÇTİ | Kanıt 2 **Für ihn ist der Schimmel nicht schlimm**. |
| 112 | `m1:22:yazma` | yazma | **HATA** | `gorev_tr` **er, sie, es kullan.** diyor, görevdeki üç eşya **der Führerschein**, **die Einladung**, **die Tabletten** (çoğul): **es** ile anlatılacak eşya yok. `kontrol_tr` de yalnız **er** ve **sie**'yi soruyor. Öğrenci olmayan bir şeyi kullanmaya zorlanıyor. |
| 113 | `m1:25:yazma` | yazma | GEÇTİ | Örnek her cümlede bir kalıba uyuyor; zorunlular var. |
| 114 | `m1:27:yazma` | yazma | GEÇTİ | Örnek kalıplara uyuyor; Derya'nın notuyla (**Bis Samstag**) tutarlı. Not 7. |
| 115 | `m1:24:s4` | gun-sinavi dikte | GEÇTİ | 3 yazım; v2 kart örneği farklı cümle. |
| 116 | `m1:24:s9` | gun-sinavi | GEÇTİ | Kabuller **çok kötü** anlamında; **nicht gut** hafif ama uygun. |
| 117 | `m1:24:s10` | gun-sinavi | GEÇTİ | **Der Bahnhof? Immer geradeaus.** (dilbilimci düzeltmesi); 6 kabul doğru. |
| 118 | `m1:25:s1` | gun-sinavi dikte | GEÇTİ | 3 yazım. |
| 119 | `m1:25:s10` | gun-sinavi | GEÇTİ | **diese / die da** (dişil) doğru. |
| 120 | `m1:26:s8` | gun-sinavi | GEÇTİ | 4 kabul doğru; açıklama doğru. |
| 121 | `m1:27:s5` | gun-sinavi | GEÇTİ | Şehir planıyla tutarlı; **liegt** de doğru. |
| 122 | `m1:27:s8` | gun-sinavi | GEÇTİ | **gidiyoruz** hem **gehen** hem **fahren**; kabul doğru. |
| 123 | `m1:28:s9` | gun-sinavi | **HATA** | `situation_tr` üç şey istiyor (ad, kat, **memnun olduğunu belirt**). Kabul 5 **Ich heiße {name}. Ich wohne im zweiten Stock.** memnuniyeti söylemiyor, eksik cevap tam puan alıyor (≥ %90 eşikli sınav). |
| 124 | `m1:28:t05` | hafta-testi | GEÇTİ | **zu groß / viel zu groß / mir zu groß** doğru. |
| 125 | `m1:28:t10` | hafta-testi | GEÇTİ | Tek boşluk **vor**; şıklar ayrışıyor. |
| 126 | `m1:28:t11` | hafta-testi | GEÇTİ | Kabuller sesle uyumlu; açıklama doğru. |
| 127 | `m1:h04:g1` | gorulmemis | GEÇTİ | Kalıp ve 6 kabul doğru. |
| 128 | `m1:h04:g3` | gorulmemis | GEÇTİ | **billiger / zu groß**; kabuller doğru. |
| 129 | `m1:h04:g6` | gorulmemis | GEÇTİ | **der Schrank → er, zu klein**; 9 kabul doğru. |

### Zorunlu ek: ev ilanı (5)

| # | Kimlik | Tür | Karar | Neden |
|---:|---|---|---|---|
| E1 | `m1:26:okuma` | okuma-metin (ilan) | GEÇTİ | **Zi., Kü., Blk., m², NK** gerçek ilan dili; satırlar ayrı cümle; çeviri doğru. |
| E2 | `m1:26:o1` | okuma-soru | GEÇTİ | 450 + 60 en ucuz; kanıt 0–2. |
| E3 | `m1:26:o2` | okuma-soru | GEÇTİ | Yalnız 2. ilanda **Blk.** yok; kanıt 1. |
| E4 | `m1:26:o3` | okuma-soru | GEÇTİ | 70 m² en büyük; kanıt 0–2. |
| E5 | `m1:26:o4` | okuma-soru (guided) | GEÇTİ | 6 kabul doğru; açıklama doğru. |

## Hata oranı
- Rastgele örneklem: **4 / 129 = %3,1**
- Ek ile: **4 / 134 = %3,0**
- Eşik %2. Karşılaştırma: dilbilimcinin ilk turdaki bulgu oranı %5,3 (53 / 1004).

## Hatalı maddeler ve önerilen düzeltme

| Kimlik | Neden | Önerilen düzeltme |
|---|---|---|
| `m1:26:v1.b1.ay1` | Çeldirici **Balkonu yok** aynı günün ilanına ve provasına göre doğru. | Çeldiriciyi ilanla açıkça yanlış olan bir şeye çevir: **Mutfağı yok** (2. ilanda **Kü.** var). |
| `m1:28:g5` | **second floor** ABD İngilizcesinde 1. kat; **top floor** çeldiricisi doğru cevap olabilir. | `dogru_img`: `apartment building, ground floor plus three upper floors, the floor two levels above the ground floor highlighted`. Çeldiriciler: `… the floor directly above the ground floor highlighted`, `… ground floor highlighted`, `single family house`. **top floor** çeldiricisi kalksın. |
| `m1:22:yazma` | **er, sie, es kullan** ama görevde **es** ile anlatılacak eşya yok. | `gorev_tr` sonu: `**er** ve **sie** kullan.` (kalın, okur notuyla birlikte). Ya da görev eşyalarına **das Rezept** eklensin ve `kontrol_tr`'ye **es** maddesi gelsin. |
| `m1:28:s9` | Kabul 5 istenen üç şeyden birini (**Freut mich**) içermiyor. | Kabul 5 → `Ich heiße {name}. Ich wohne im zweiten Stock. Freut mich!` Ya da `situation_tr`'den memnuniyet şartı çıkarılsın (`why_tr` zaten yalnız ad ve kat diyor). |

## Sayılmayan notlar (takip; dilbilimci ya da baş geliştirici)
1. `m1:22:h2.kalip2`: **Es ist weg → Yok.** kartla uyumlu, ama 22. günün öbür bütün **weg** satırları dilbilimci düzeltmesiyle **kayıp** oldu. Tutarlılık için **Kayıp.**
2. `m1:25:h1.gc9`: **Laufen ist schöner als Busfahren.** (adlaşmış mastar, bitişik) de kabul listesine girmeli; ikisi de kurala uygun, bitişik yazan reddediliyor. Türkçede **otobüse binmekten daha güzel** daha doğal.
3. `m1:25:a1:e1`: `ortam_tr` **Cumartesi sabahı şehir meydanındasın** diyor, doğru şık **Bugün saat dörtten önce meydana git.** Önerilen şık: **Bugün saat dörtten önce bir sandalye al.**
4. `m1:25:p1.n1.s1`: `durum_tr` **Bir fincan almak istiyorsun**, uygun seçenek **Ein paar Tassen, bitte.** Ardından Stadler tek fincan fiyatı veriyor. Küçük bir uyumsuzluk var.
5. 22. gün okuma notu: sahnede Ioana fincanı **gleich** geri veriyor (`s15`), notta **morgen**. Ayrıca 4. halkada pastayı Ioana yapıyor, notunda öğrenciye **Danke für den Kuchen!** diyor. Çelişki değil, ama okurken tökezletebilir.
6. Ev zinciri (24 → 26 → 27): 24. gün Tobi **Brunnengasse'de boş yer, cumartesi onda** diyor. 26. günde 1. ilan **Brunnengasse** (650), en iyisi seçilen 3. ilan **Brunnenviertel** (ocakta boş). Brandl'ın mesajı **bei uns im Haus ab Januar frei, cumartesi onda**. 27. günde Pichler Brunnengasse 7'de 3. katı gösteriyor. Öğrenci **Brunnengasse 7 Brunnenviertel'de** sonucunu kendisi çıkarmak zorunda. 26. gün eylemi **Tobi'ye haber ver** diyor, oysa Tobi 24. günde zaten cumartesi görmeye çağırıyor. WORLD'e ya da 3. ilanın sokağına işlenmeli (dilbilimci açık 6 ile birlikte).
7. 27. gün: Derya'nın notu **am Samstag … Bis Samstag**, sesli mesajı **Ich bin jetzt am Bahnhof … Bis gleich!**. Aynı gün, iki ayrı zaman. a2 `ortam_tr`'ye **Cumartesi.** eklenirse çözülür.

## Karar: **dilbilimciye geri**
Hata oranı %3,0–3,1, eşik %2'nin üstünde. Dört hata da küçük ve yerel. Dördü düzeltildikten sonra yalnız bu dört maddenin fark doğrulaması ve aynı tohumla yeni bir örneklem (dosya sha256'ları değişeceği için seçim yeniden üretilir) önerilir. Bulunan türler ayrıca taranmalı: (a) `gorsel` içinde kat ve sıra sayısı geçen bütün sorgular, (b) gün sınavında `situation_tr` birden çok şey isterken eksik kabul edilen cevaplar, (c) ayrıntı sorularında aynı günün başka bölümünde doğru olan çeldiriciler.

Bairisch yok; öğrenci adı yalnız `{name}`; `audio_de` içinde yer tutucu yok; kişisel bilgi, kurs ya da kitap adı yok; bina örneklemdeki bütün maddelerde tutarlı (öğrenci 2. kat, Brandl ve Pichler 1. kat yan yana, boş yer 3. kat).
