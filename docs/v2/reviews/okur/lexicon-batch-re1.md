# Okur raporu: lexicon-batch-re1 (OD-9.3)

Girdi: `batch-re1.view.jsonl`, 41 kart (001–003 partilerinden geri dönüp düzeltilenlerin yeniden okuması). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:der | hepsi | bilinen şeyin önüne gelir, çevrilmez | GEÇTİ | |
| lx:sein#2 | diğer alanlar | bir erkeğin olan şey, onun | GEÇTİ | |
| lx:sein#2 | exp.ne_zaman_tr | das Kind gibi kelimelerde de... neyi? | GERİ | anlamadım: hangi kelimeler, sahip olan mı sahip olunan mı belli değil |
| lx:gehen | hepsi | yürüyerek gitmek, bir de olur mu | GEÇTİ | |
| lx:dieser | hepsi | yakındaki şeyi gösterir, bu | GEÇTİ | |
| lx:tun | hepsi | bir iş yapmak, acımak, üzgünüm | GEÇTİ | |
| lx:Mal | hepsi | kaçıncı kez olduğunu söyler | GEÇTİ | |
| lx:aus | hepsi | nereden geldiğin, ışık kapalı | GEÇTİ | |
| lx:denken | hepsi | fikrini söylemek, birini düşünmek | GEÇTİ | |
| lx:bei | hepsi | birinin yanında, bir yerde olmak | GEÇTİ | |
| lx:wieder | hepsi | bir şey yeniden oluyor | GEÇTİ | |
| lx:Mann | hepsi | yetişkin erkek ya da koca | GEÇTİ | |
| lx:über | hepsi | üstünde ya da bir konu hakkında | GEÇTİ | |
| lx:am | hepsi | hangi gün olduğunu söyler | GEÇTİ | |
| lx:verstehen | hepsi | anladım ya da anlamadım demek | GEÇTİ | |
| lx:Gott | hepsi | Tanrı, selamda ve şükürde geçer | GEÇTİ | |
| lx:helfen | hepsi | birine yardım etmek | GEÇTİ | |
| lx:erst | hepsi | beklenenden geç, ancak, önce bir | GEÇTİ | |
| lx:stehen | diğer alanlar | ayakta durmak, bir yerde yazmak | GEÇTİ | |
| lx:stehen | exp.ipucu_tr | güneyde böyle de denirmiş, peki normali? | GERİ | yarım kalıyor: başka yerde ne dendiği kutuda yok |
| lx:Vater | diğer alanlar | baba, seslenirken Papa | GEÇTİ | |
| lx:Vater | mistakes_tr[0] | die Vaters olmaz, die Väter olur, neden? | GERİ | anlamadım: ne demek isterken yanlış olduğu yazmıyor, der neden die oldu |
| lx:morgen | hepsi | yarın, büyük harfle sabah | GEÇTİ | |
| lx:richtig | diğer alanlar | doğru, bir de epey | GEÇTİ | |
| lx:richtig | exp.anlam_tr | doğru demek ya da... çok öyle? | GERİ | anlamadım: çok öyle olmak ne demek, iki fikir var |
| lx:Geld | hepsi | ödediğin ve kazandığın para | GEÇTİ | |
| lx:Mutter | diğer alanlar | anne, seslenirken Mama | GEÇTİ | |
| lx:Mutter | mistakes_tr[0] | die Mutters olmaz, die Mütter olur, neden? | GERİ | anlamadım: ne demek isterken yanlış olduğu yazmıyor |
| lx:Paar | hepsi | iki kişi ya da bir çift eşya | GEÇTİ | |
| lx:paar | hepsi | birkaç tane, küçük harfle | GEÇTİ | |
| lx:sterben | hepsi | hayatın bitmesi, ölmek | GEÇTİ | |
| lx:bekommen | hepsi | bir şey sana veriliyor, eline geçiyor | GEÇTİ | |
| lx:schnell | hepsi | hızlı, çabuk | GEÇTİ | |
| lx:beide | hepsi | ikisi birden | GEÇTİ | |
| lx:Ordnung | hepsi | düzen, bir de tamam demek | GEÇTİ | |
| lx:vergessen | hepsi | unutmak, bir de boş ver | GEÇTİ | |
| lx:dafür | hepsi | bunun için, fikre varım demek | GEÇTİ | |
| lx:welcher | hepsi | seçenekler arasından hangisi | GEÇTİ | |
| lx:Angst | hepsi | korku, korkuyorum demek | GEÇTİ | |
| lx:zusammen | hepsi | birlikte, hesapta toplam | GEÇTİ | |
| lx:wenig | hepsi | az, biraz ile farkı var | GEÇTİ | |
| lx:wann | hepsi | zamanı sormak, ne zaman | GEÇTİ | |
| lx:ne | hepsi | cümle sonunda değil mi | GEÇTİ | |
| lx:darüber | hepsi | az önceki konu hakkında | GEÇTİ | |
| lx:daran | hepsi | az önce söylenene, unutma derken | GEÇTİ | |
| lx:nett | diğer alanlar | sıcak, kibar kişi | GEÇTİ | |
| lx:nett | mistakes_tr[1] | rica ederken kibar bir soru, anlamı ne? | GERİ | anlamadım: sorunun ne sorduğu yazmıyor |

## Sonuç

- Toplam alan: 191
- GEÇTİ: 185
- GERİ: 6
- GERİ kimlikleri: lx:sein#2, lx:stehen, lx:Vater, lx:Mutter, lx:richtig, lx:nett

En az bir GERİ olduğu için bu parti "reviewed" sayılamaz (OD-9.4).
