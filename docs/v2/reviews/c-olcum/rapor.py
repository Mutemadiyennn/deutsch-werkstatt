#!/usr/bin/env python3
"""olcum.py çıktısından raporu ve sonuc.json'u üretir. Kullanım (depo kökünden):
python3 docs/v2/reviews/c-olcum/olcum.py . > /tmp/olcum.json && python3 docs/v2/reviews/c-olcum/rapor.py /tmp/olcum.json"""
import json, collections, sys
s = json.load(open(sys.argv[1], encoding='utf8'))
D = 'docs/v2/reviews'
K = s['kartlar']
out = {'aciklama': 'PM-078 C ölçümü. A/B/C/D biçimleri rapordaki gibi; *_bilinmeyen_B: B biçiminde bilinmeyen sözcükler; ? = forms dizinine eşlenemedi.',
       'kartlar': [], 'gun_cumleleri_ihlal': [], 'eslenemeyen': s['eslenemeyen']}
for k in K:
    out['kartlar'].append({'gun': k['gun'], 'kart': k['kart'], **{ad: {x: k[ad][x] for x in ('ornek_0', 'ornek_le1', 'bosluk_0')} for ad in 'ABCD'},
                           'ornek_bilinmeyen_B': k['B']['ornek_bilinmeyen'], 'bosluk_bilinmeyen_B': k['B']['bosluk_bilinmeyen']})
V = [{'gun': g['gun'], **x} for g in s['gunler'] for x in g['cumleler'] if x['ihlal']]
out['gun_cumleleri_ihlal'] = V
json.dump(out, open(f'{D}/c-olcum/sonuc.json', 'w', encoding='utf8'), ensure_ascii=False, indent=1)

def tab(ad):
    per = collections.defaultdict(lambda: [0] * 6)
    for k in K:
        x = k[ad]; p = per[k['gun']]; n = x['ornek_0'] + x['bosluk_0']
        p[0] += 1; p[1] += x['ornek_0'] > 0; p[2] += x['ornek_le1'] > 0; p[3] += x['bosluk_0'] > 0; p[4] += n == 0; p[5] += max(0, 2 - n)
    return per
tot = {ad: [sum(v[i] for v in tab(ad).values()) for i in range(6)] for ad in 'ABCD'}
B = tab('B'); gorev_ihlal = sum(1 for x in V if x['tur'] == 'gorev'); gost_ihlal = sum(1 for x in V if x['tur'] == 'gosterim')
L = ["# PM-078 C ölçümü: M1 1.–7. gün, cümle kapısı\n",
"Ölçüm: İÇ, 20.11. Betikler `c-olcum/olcum.py` (ölçüm) ve `c-olcum/rapor.py` (bu rapor ve `sonuc.json`); kod değil, rapor aracı, ANA'nın doğrulayıcı sayacına örnek. Halka önerilerinin denetimi `c-olcum/halka_kontrol.py` (aynı küme).\n",
"## Kural ve ekler\n",
"PM-078 C'deki küme uygulandı; betiğin eklediği ya da yorumladığı her şey aşağıda **ek** diye işaretli.\n",
"- **Bilinen küme(t):**\n  - o ana kadar tanıtılmış kartlar (`yeni_kartlar` sırası, gün içinde de sıra);\n  - biten temel derslerin `teach.de` biçimleri, tablo hücreleri ve `teach.lexeme` kartları;\n  - `card:false` çerçeve kartları;\n  - WORLD kişi adları;\n  - **ek:** WORLD yer adlarının özel ad bölümü (Stadler, Weber; kartı olan Bäckerei, Bürgerbüro, Rathaus ad sayılmaz) ve `genel-adlar.md` başlıklarındaki adlar;\n  - **ek:** rakamlar; r0-04 bitince bileşik sayılar, r0-06 bitince sıra sayıları.",
"- **Sözcük → kart:** kartın `de`, `pl`, `forms[].answer` ve `verb` alanları (`aux` hariç; artikel eşlenmez).",
"  - **ek (2. sürüm, inceleme #163):** kart tanıtılınca yalnızca tanıtımda **gösterilen** biçimler bilinir: başlık ve çoğul (`garden.ts` `cevapGosterildi` ile aynı). Öteki çekimler (gehe, gehst, gute) bir dersin öğrettiği biçimlerle açılır; raporda `~` ile.",
"  - **ek:** kapalı eşadlı listesi: \"ja\" (evet) lx:ja kartı tanıtılınca bilinir; çerçevedeki lx:ja#2 (ya, işte) başka anlam.",
"  - **ek:** dersin çok sözcüklü kalıbındaki sözcük, kendi kartı (fiil değil) o derste öğretilmiyorsa öğretilmiş sayılmaz (\"Guten Tag, hier ist {name}.\" \"hier\"i öğretmez). Ama kalıbın kendisi cümlede aynen geçerse sözcükleri bilinir (\"Guten Tag, hier ist {name}. Geht Samstag?\").",
"  - **ek:** cevaptaki sözcük yalnızca kartın başlığıyla akrabaysa (ilk 3 harfi başlıkta geçiyorsa) o karta eşlenir. Böylece lx:Dienstag'ın \"___ Dienstag\" boşluğundaki \"Letzten\" lx:Dienstag'a düşmez. Fiil kartlarında tek sözcüklü cevap akrabalık aranmadan eşlenir (ist, war, ging).",
"  - **ek:** birden çok kartın cevabında geçen sözcük en çok geçtiği karta eşlenir, eşitlikte hepsine (\"ist\" lx:sein'e gider, lx:passieren'e değil).",
"  - **ek:** birden çok karta eşlenen sözcük, bilinen adaylardan birinde gösterilen biçimse bilinir.",
"  - Eşlenemeyen sözcük tahmin edilmedi, ayrı listelendi (aşağıda `?` ile).",
"- **ek (kapalı liste, betikte açık):** `card:false` kartlarının `forms` dizininde olmayan artikel, zamir ve iyelik çekimleri (den, dem, mir, dir, ihn, ihnen, meinen …). Bunlar kartta yok; sayaç karttan okuyabilsin diye **şema isteği** aşağıda.",
"- **Biçimler:**\n  - **A:** günün dersi henüz yapılmamış (bugünkü düzen: Bahçe önce).\n  - **B:** günün dersi önce yapılmış (Halka'da dil noktası kelime halkasından önce gelirse).\n  - **C:** B + sein ve haben şimdiki zaman biçimleri 1. günden çerçeve (öneri, PM kararına).\n  - **D:** C + günün bütün kartları bilinir. Gün içi sıra en iyi kurulsa bile ulaşılabilecek **üst sınırdır**.\n",
"## 1. Kart cümleleri, tanıtıldığı anda\n",
"Sütunlar:\n- **örnek 0:** 6 örnekten en az biri bilinmeyensiz olan kart.\n- **örnek ≤1:** gösterim sınırı (en çok 1 bilinmeyen).\n- **boşluk 0:** boşluk cümlelerinden en az biri bilinmeyensiz (cevap hariç).\n- **hiç yok:** görev cümlesi (örnek ya da boşluk) bilinmeyensiz hiçbir cümlesi olmayan kart.\n- **eksik cümle:** her kartın en az 2 görev cümlesi olması için yazılması gereken cümle (Halka kural 2).\n"]
for ad in 'ABCD':
    per = tab(ad)
    L.append(f"**{ad}**\n\n| gün | kart | örnek 0 | örnek ≤1 | boşluk 0 | hiç yok | eksik cümle |\n|---|---|---|---|---|---|---|")
    for g in sorted(per): p = per[g]; L.append(f"| {g} | " + " | ".join(map(str, p)) + " |")
    L.append("| **top.** | " + " | ".join(map(str, tot[ad])) + " |\n")
ilk3 = sum(B[g][5] for g in (1, 2, 3))
L.append(f"**Okuma:**\n- Kart cümleleri gerçek hayattan yazıldı, kümeye göre değil. 1.–3. günde kartların çoğunun bilinmeyensiz tek bir örneği bile yok.\n- Sıra tek başına çözmüyor. D'de (sıra en iyi kurulsa) bile {tot['D'][5]} cümle gerekiyor.\n- **Sonuç:** 1.–5. günde **ilk karşılaşma cümlesi** yazılmalı. B'ye göre {tot['B'][5]} cümle (1.–3. günde {ilk3}), D'ye göre {tot['D'][5]}. 6. ve 7. gün neredeyse hazır.\n")
L.append("### Görev cümlesi hiç olmayan kartlar (B)\n")
hic = collections.defaultdict(list)
for k in K:
    if k['B']['ornek_0'] + k['B']['bosluk_0'] == 0: hic[k['gun']].append(k['kart'][3:])
for g in sorted(hic): L.append(f"- **{g}. gün ({len(hic[g])}):** {', '.join(hic[g])}")
blk = collections.Counter(); unm = collections.Counter(); bic = collections.Counter()
for k in K:
    for _, u in k['B']['ornek_bilinmeyen']:
        for t in set(u): (unm if t[0] == '?' else bic if t[0] == '~' else blk)[t.lstrip('?~')] += 1
L.append("\n### Kart örneklerini en çok tıkayan sözcükler (B)\n")
L.append("Kartı olan ama henüz tanıtılmamış sözcükler. Sayı, o sözcüğün tıkadığı örnek cümle sayısıdır:\n")
L.append(", ".join(f"{w} {n}" for w, n in blk.most_common(30)) + ".\n")
L.append("Kartı tanıtılmış ama bu biçimi henüz gösterilmemiş sözcükler (`~`; çekim dersi gelince açılır):\n")
L.append(", ".join(f"{w} {n}" for w, n in bic.most_common(30)) + ".\n")
L.append("Bunların çoğu sık kullanılan küçük sözcük: noch, schon, nur, da, erst, wieder, gleich, dann, gern, sehr, oft, leider, echt. Ayrıca wann, Uhr, Termin, sind ve bin. Önerim (PM kararı): bunların bir kısmı 1.–2. güne alınsın ya da çerçeveye girsin (dokununca Türkçe).\n")
L.append("## 2. Gün cümleleri (sahne, ses, prova, okuma, sınav, ders)\n")
L.append("Bilinen küme: günün bütün kartları ve günün dersi. Görevde sınır 0 bilinmeyen, gösterimde en çok 1. Görev: öğrencinin ürettiği cümle (kabul listesinin ilki, prova seçenekleri, diyalogda öğrenci satırı, boşluklu alıştırma cümlesi). Seçmeli soruların (`pick`) seçenekleri sayılmadı.\n")
L.append("| gün | görev ihlal | gösterim ihlal |\n|---|---|---|")
for g in range(1, 8):
    L.append(f"| {g} | {sum(1 for x in V if x['gun'] == g and x['tur'] == 'gorev')} | {sum(1 for x in V if x['gun'] == g and x['tur'] == 'gosterim')} |")
L.append(f"| **top.** | {gorev_ihlal} | {gost_ihlal} |\n\n**Görev ihlalleri (hepsi):**\n")
for x in V:
    if x['tur'] == 'gorev': L.append(f"- {x['gun']}. gün · {x['yer']} · \"{x['de']}\" → {', '.join(x['bilinmeyen'])}")
L.append("\n**Gösterim ihlallerinin çoğu kalıp:** Grüß Gott, Vielen Dank, Auf Wiederhören, Gute Besserung, Bis dann. Kalıp bir bütün olarak öğretiliyor ama kümede yok. **Öneri (PM kararı):** bilinen kümeye \"o güne kadar öğretilmiş kalıplar\" eklensin (`patterns.json` ya da dersin `teach` öğesi). Ayrıntılı liste `sonuc.json` → `gun_cumleleri_ihlal` içinde.\n")
L.append("## 3. Eşlenemeyen biçimler (tahmin edilmedi)\n")
L.append(f"Kart örneklerinde {len(unm)} ayrı sözcük hiçbir kartın `forms` dizinine eşlenmedi. En sık olanlar (cümle sayısı):\n")
L.append(", ".join(f"{w} {n}" for w, n in unm.most_common(40)) + ".\n")
L.append("Üç türlü:\n- **Konuşma kısaltması:** hab, komm, geh, glaub, grad, s (geht's), n, nen.\n- **Çekim ya da türetme:** abends, sonntags, Mittwochnachmittag, monats, schönes, gute, hohes.\n- **Sözlükte kartı olmayan kelime:** Euro, Cent, Stock, Post, Brille, Bäcker, Fußball, Schnee.\n\nBunlar bilinene dönmeden o cümle hiçbir gün açılmaz.\n")
L.append("## 4. İstekler ve sıradaki adım\n")
L.append("- **[İÇERİK] şema isteği (ANA):**\n  - (a) `card:false` kartlara kapalı `bicimler` listesi (artikel, zamir, iyelik çekimleri), sayaç karttan okusun.\n  - (b) Kart örneğine isteğe bağlı `ilk: true` (ilk karşılaşma cümlesi; 6 örnek sınırının dışında ya da içinde, ANA seçer).\n  - (c) Konuşma kısaltmaları için `forms` dışında bir eşleme (ör. kartta `kisaltma: [\"hab\"]`).")
L.append(f"- **PM kararı istenen:**\n  - (1) C biçimi: sein ve haben şimdiki zaman 1. günden çerçeve mi?\n  - (2) Kalıplar bilinen kümeye girsin mi?\n  - (3) Sık küçük sözcükler (noch, schon, nur, da, dann, gern …) erkene mi alınsın, çerçeveye mi girsin?\n  - Kararlar cümle sayısını {tot['B'][5]}'in altına çeker; karar beklenmeden 1. gün cümleleri en sıkı biçimle yazılıyor.")
L.append("- **İÇ sıradaki adım:** 1. gün `halkalar` önerisi (PM-078 B) ve 1. günün ilk karşılaşma cümleleri. Yazar → dilbilimci → okur.")
open(f'{D}/c-olcum-m1.md', 'w', encoding='utf8').write("\n".join(L) + "\n")
print('B', tot['B'], 'D', tot['D'], 'görev', gorev_ihlal, 'gösterim', gost_ihlal, 'eşlenemeyen', len(unm))
