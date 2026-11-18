# Okur kontrolü — lexicon parti 002 (OD-9.3)

Girdi: `batch-002.view.jsonl` (100 kart, dilbilimci yaması uygulanmış). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi okundu, örneklem yok. `parcalar` yalnızca `lx:leid` kartında dolu (2 parça).

Mekanik tarama: `=`, `;`, `…`, tırnak içinde Almanca, dilbilgisi terimi ve 14 kelimeden uzun cümle bulunmadı. `ne_zaman_tr` alanlarının hepsi 12 kelimenin altında. `lx:neu` ipucundaki kesme işareti Almanca sözün kendi yazımı, sembol sayılmadı.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:zum | hepsi | bir yere ya da birine gitmek | GEÇTİ | |
| lx:leben | hepsi | hayatta olmak, bir yerde yaşamak | GEÇTİ | |
| lx:vielleicht | hepsi | olabilir ama kesin değil, belki | GEÇTİ | |
| lx:mögen | hepsi | birini ya da bir şeyi sevmek | GEÇTİ | |
| lx:mögen#2 | hepsi | bir şeyi kibarca istemek | GEÇTİ | |
| lx:brauchen | hepsi | bir şey bana lazım | GEÇTİ | |
| lx:über | mistakes_tr[1] | lamba masanın üstünde, dem doğru | GERİ | anlamadım: üstteki notta dem yanlış den doğruydu, burada tersi, nedeni yok |
| lx:über | diğer alanlar | bir şeyin üstünde ya da onun hakkında | GEÇTİ | |
| lx:okay | hepsi | kabul ettim, anladım, tamam | GEÇTİ | |
| lx:nehmen | hepsi | bir şeyi almak ya da seçmek | GEÇTİ | |
| lx:wirklich | hepsi | gerçekten öyle, şaşırınca da denir | GEÇTİ | |
| lx:nie | hepsi | hiçbir zaman olmadı, asla | GEÇTİ | |
| lx:Frau | hepsi | kadın, hanım, eş, soyadla hitap | GEÇTİ | |
| lx:einfach | hepsi | zor değil, kolay | GEÇTİ | |
| lx:weg | hepsi | artık burada yok, gitmiş | GEÇTİ | |
| lx:Weg | hepsi | bir yere giden yol | GEÇTİ | |
| lx:bringen | hepsi | bir şeyi ya da birini götürmek | GEÇTİ | |
| lx:am | mistakes_tr[1] | am besten diye bir söz var | GERİ | anlamadım: sözün Türkçesi yok, günle ilgisi de yok, ne demek bilemedim |
| lx:am | diğer alanlar | hangi gün ya da günün ne zamanı | GEÇTİ | |
| lx:reden | hepsi | biriyle rahatça konuşmak | GEÇTİ | |
| lx:verstehen | ipucu_tr | anlamayınca bir daha lütfen derim | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta geçmiyor |
| lx:verstehen | diğer alanlar | söyleneni anlamak ya da anlamamak | GEÇTİ | |
| lx:warten | hepsi | birini ya da bir şeyi beklemek | GEÇTİ | |
| lx:Zeit | hepsi | bir iş için vaktim var ya da yok | GEÇTİ | |
| lx:weil | hepsi | bir şeyin nedenini söylemek, çünkü | GEÇTİ | |
| lx:schön | hepsi | güzel, hoş, iyi dilekte de | GEÇTİ | |
| lx:jeder | hepsi | gruptaki herkes, her biri | GEÇTİ | |
| lx:bleiben | hepsi | bir yerde kalmak, gitmemek | GEÇTİ | |
| lx:heute | hepsi | bugün | GEÇTİ | |
| lx:fragen | hepsi | birine soru sormak | GEÇTİ | |
| lx:sicher | hepsi | eminim ya da burası güvenli | GEÇTİ | |
| lx:Tag | hepsi | gün, selamda da geçer | GEÇTİ | |
| lx:damit | hepsi | ne için ya da neyle yapıldığı | GEÇTİ | |
| lx:jemand | hepsi | kim olduğu bilinmeyen biri | GEÇTİ | |
| lx:kennen | hepsi | birini ya da bir yeri tanımak | GEÇTİ | |
| lx:Jahr | hepsi | yıl, yaş söylerken de | GEÇTİ | |
| lx:Haus | hepsi | içinde oturulan bina, ev | GEÇTİ | |
| lx:Gott | anlam_tr | Tanrı demek, başka sözlerde de geçer | GERİ | iki fikir var: kelimenin anlamı ve nerede geçtiği |
| lx:Gott | diğer alanlar | Tanrı, güneyde selamda da | GEÇTİ | |
| lx:nun | hepsi | şimdi, artık, daha çok yazıda | GEÇTİ | |
| lx:helfen | ipucu_tr | bir şey söylerken beim denir | GERİ | anlamadım: hangi konu belli değil, örnek cümlenin Türkçesi yok |
| lx:helfen | diğer alanlar | birine yardım etmek | GEÇTİ | |
| lx:lieben | hepsi | çok güçlü sevmek, sevgiliye, aileye | GEÇTİ | |
| lx:erst | anlam_tr | bir şey ya geç ya erken gelmiş | GERİ | anlamadım: ikinci yarı erken gelmek gibi okunuyor, geç ile çelişiyor |
| lx:erst | ipucu_tr | önce bir, gerisi yok | GERİ | anlamadım: Türkçe karşılık yarım kalmış, önce bir ne |
| lx:erst | diğer alanlar | beklenenden geç olan şey, ancak | GEÇTİ | |
| lx:bis | hepsi | bir şeyin bittiği yer ya da zaman | GEÇTİ | |
| lx:leid | hepsi | üzgünüm, özür dilerim | GEÇTİ | |
| lx:na | hepsi | arkadaşla söze başlarken, eee | GEÇTİ | |
| lx:klein | hepsi | boyu küçük olan şey | GEÇTİ | |
| lx:groß | hepsi | büyük şey ya da uzun boylu kişi | GEÇTİ | |
| lx:zurück | hepsi | geri dönmek, geri gelmek | GEÇTİ | |
| lx:stehen | ipucu_tr | güneyde böyle bir söz duyulur | GERİ | anlamadım: söz ne demek, neyin yerine söyleniyor yazmıyor |
| lx:stehen | diğer alanlar | ayakta durmak ya da bir yerde yazmak | GEÇTİ | |
| lx:hallo | hepsi | tanıdığa merhaba, telefonda alo | GEÇTİ | |
| lx:Kind | hepsi | küçük yaştaki kişi, çocuk | GEÇTİ | |
| lx:halten | hepsi | bir şeyi tutmak, aracın durması | GEÇTİ | |
| lx:sprechen | hepsi | konuşmak, bir dili bilmek | GEÇTİ | |
| lx:zwei | hepsi | iki sayısı | GEÇTİ | |
| lx:genau | hepsi | tam öyle, karşıdakini onaylarken | GEÇTİ | |
| lx:alt | hepsi | kaç yaşında ya da eski | GEÇTİ | |
| lx:Vater | ne_zaman_tr | bazen Vater bazen Papa denir | GERİ | anlamadım: anlatmak ile konuşmak arasındaki fark belli değil |
| lx:Vater | diğer alanlar | birinin babası | GEÇTİ | |
| lx:klar | hepsi | anlaşıldı ya da tabii ki | GEÇTİ | |
| lx:zur | hepsi | bir yere ya da birine gitmek | GEÇTİ | |
| lx:passieren | hepsi | bir olayın olması | GEÇTİ | |
| lx:versuchen | hepsi | bir şeyi yapmaya çalışmak | GEÇTİ | |
| lx:dürfen | hepsi | izin var mı yok mu | GEÇTİ | |
| lx:Morgen | hepsi | günün ilk bölümü, sabah | GEÇTİ | |
| lx:morgen | mistakes_tr[0] | biri yanlış biri doğru, aynı duruyor | GERİ | anlamadım: iki yazım aynı görünüyor, fark nerede söylenmiyor |
| lx:morgen | diğer alanlar | bugünden sonraki gün, yarın | GEÇTİ | |
| lx:richtig | mistakes_tr[0] | birine böyle denmez, öbürü denir | GERİ | anlamadım: ne demek isterken yanlış olduğu yazmıyor |
| lx:richtig | diğer alanlar | doğru ya da epey | GEÇTİ | |
| lx:neu | hepsi | yeni olan şey | GEÇTİ | |
| lx:Leute | hepsi | bir grup insan | GEÇTİ | |
| lx:spielen | hepsi | oyun oynamak, çalgı çalmak | GEÇTİ | |
| lx:jung | hepsi | yaşı küçük, genç | GEÇTİ | |
| lx:ab | hepsi | bir şeyin başladığı zaman | GEÇTİ | |
| lx:gerade | hepsi | tam şu an ya da az önce | GEÇTİ | |
| lx:wohl | hepsi | herhalde ya da kendini iyi hissetmek | GEÇTİ | |
| lx:Geld | mistakes_tr[1] | bankada öbür sözü söyle | GERİ | anlamadım: iki söz de ne demek yazmıyor |
| lx:Geld | diğer alanlar | ödediğim ve kazandığım para | GEÇTİ | |
| lx:gleich | hepsi | birazdan olacak ya da aynı | GEÇTİ | |
| lx:fahren | hepsi | araçla gitmek, araç sürmek | GEÇTİ | |
| lx:durch | hepsi | bir yerin içinden ya da bir şey sayesinde | GEÇTİ | |
| lx:Mutter | ne_zaman_tr | bazen Mutter bazen Mama denir | GERİ | anlamadım: anlatmak ile konuşmak arasındaki fark belli değil |
| lx:Mutter | diğer alanlar | birinin annesi | GEÇTİ | |
| lx:ob | hepsi | oldu mu olmadı mı merak etmek | GEÇTİ | |
| lx:raus | hepsi | içeriden dışarı çıkmak | GEÇTİ | |
| lx:Mensch | hepsi | bir insan, bir kişi | GEÇTİ | |
| lx:töten | hepsi | birinin canını almak, öldürmek | GEÇTİ | |
| lx:euer | hepsi | yakın olduğum kişilerin olan şey, sizin | GEÇTİ | |
| lx:Paar | mistakes_tr[0] | birkaç dakika derken biri yanlış | GERİ | anlamadım: iki yazım aynı görünüyor, fark nerede söylenmiyor |
| lx:Paar | diğer alanlar | birlikte iki kişi ya da iki eş parça | GEÇTİ | |
| lx:paar | mistakes_tr[1] | biri yanlış biri doğru, aynı duruyor | GERİ | anlamadım: iki yazım aynı görünüyor, fark nerede söylenmiyor |
| lx:paar | diğer alanlar | az sayıda şey, birkaç | GEÇTİ | |
| lx:wieso | hepsi | nedenini sormak, niye | GEÇTİ | |
| lx:lieb | hepsi | sevimli, iyi kalpli, yakınlara | GEÇTİ | |
| lx:kriegen | hepsi | bir şey bana verildi, rahat konuşmada | GEÇTİ | |
| lx:sterben | ipucu_tr | başsağlığı dilerken söylenen söz | GERİ | ifadenin kendisini değil başka şeyi anlatıyor: kartın kelimesi notta geçmiyor |
| lx:sterben | diğer alanlar | birinin hayatının bitmesi, ölmek | GEÇTİ | |
| lx:erzählen | hepsi | birine olay ya da hikâye anlatmak | GEÇTİ | |
| lx:selbst | hepsi | işi başkası değil kendisi yapıyor | GEÇTİ | |
| lx:arbeiten | hepsi | bir işte çalışmak | GEÇTİ | |
| lx:stimmen | hepsi | bir şey doğru, hesap da doğru | GEÇTİ | |
| lx:laufen | hepsi | yürümek, koşmak, işin gidişi | GEÇTİ | |
| lx:bekommen | mistakes_tr[0] | almak demek, gerisini çıkaramadım | GERİ | anlamadım: İngilizce bilmiyorum, hangi kelime belli değil, cümle dolaşık |
| lx:bekommen | diğer alanlar | bir şey bana verildi ya da geldi | GEÇTİ | |
| lx:ohne | hepsi | bir şey yok, onsuz | GEÇTİ | |
| lx:Recht | hepsi | hakkım olan şey ya da haklı olmak | GEÇTİ | |
| lx:suchen | hepsi | kayıp ya da gereken şeyi aramak | GEÇTİ | |
| lx:her | hepsi | bana doğru gelmek ya da geçen zaman | GEÇTİ | |
| lx:holen | hepsi | gidip bir şeyi almak | GEÇTİ | |
| lx:essen | hepsi | yemek yemek | GEÇTİ | |
| lx:Scheiße | hepsi | kızınca söylenen kaba söz | GEÇTİ | |
| lx:schnell | ipucu_tr | hemen bir, gerisi yok | GERİ | anlamadım: Türkçe karşılık yarım kalmış, hemen bir ne |
| lx:schnell | diğer alanlar | hızlı olan şey | GEÇTİ | |
| lx:Nacht | hepsi | güneş battıktan sonraki karanlık zaman | GEÇTİ | |

## Sonuç

- Toplam alan: 437
- GEÇTİ: 419
- GERİ: 18 (17 kart)

GERİ kimlikleri:

- `lx:über` — mistakes_tr[1]
- `lx:am` — mistakes_tr[1]
- `lx:verstehen` — ipucu_tr
- `lx:Gott` — anlam_tr
- `lx:helfen` — ipucu_tr
- `lx:erst` — anlam_tr, ipucu_tr
- `lx:stehen` — ipucu_tr
- `lx:Vater` — ne_zaman_tr
- `lx:morgen` — mistakes_tr[0]
- `lx:richtig` — mistakes_tr[0]
- `lx:Geld` — mistakes_tr[1]
- `lx:Mutter` — ne_zaman_tr
- `lx:Paar` — mistakes_tr[0]
- `lx:paar` — mistakes_tr[1]
- `lx:sterben` — ipucu_tr
- `lx:bekommen` — mistakes_tr[0]
- `lx:schnell` — ipucu_tr

Tek bir GERİ bile olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
