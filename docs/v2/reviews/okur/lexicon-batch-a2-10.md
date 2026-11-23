# Okur raporu: lexicon-batch-a2-10 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-10.json`, 19 kart (ek süre ve teslim, sonra/bir gün, umut ve devam, hava, dil öğrenme ve ilerleme, başarı ve kariyer). İlk okur turu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **451 alan**. Bütün satırlar betikle döküldü ve hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar (a2-08'in sık GERİ'leri): hata notunun sonunda açıklamasız ek, "bu kelime X ile gelir" gibi genel kural sanılan ipucu, Türkçe cümlede tırnak içinde Almanca, bir alanda iki fikir, yanlışla doğru arasında açıklanmayan ikinci fark. Ayrıca: aynı Türkçe sözün kartta farklı Almanca vermesi, ipucunun boşluktaki sözle örtüşmesi, 14 kelime.
- Tarama sonucu: **=**, **;**, üç nokta, tırnak içinde Almanca ve dilbilgisi terimi yok. En uzun cümle 13 kelime. Betiğin uyarıları yanlış alarm: kesme işareti yer adlarında ve **Gibt's** içinde, "hâlâ", "hâle", "ek" harf dizisi (ek süre, meslek, gerek…). "Virgül" noktalama adı, terim saymadım. Hata notunun sonunda açıklamasız ek bu partide hiç yok.

## GERİ satırları

| kart.alan | açıklama | kendi sözlerimle | karar | neden ve öneri |
|---|---|---|---|---|
| `lx:irgendwann.exp.ne_zaman_tr` | Bir planı ya da hayali tarih vermeden anlatırken. | İlk okuyuşta "hayali tarih", yani uydurma bir tarih diye anladım. İkinci okuyuşta "bir planı ya da bir hayali" olduğunu gördüm. | GERİ | "hayali" ile "tarih" yan yana gelince tek okumada yanlış bağlanıyor. Öneri: "Bir planını ya da hayalini, tarih vermeden anlatırken." |
| `lx:Wettervorhersage.mistakes_tr[0]` | Hava tahmini derken **das Wetter** gibi **das Wettervorhersage** yanlış. Son parça belirler, doğrusu **die Wettervorhersage**. | **das Wettervorhersage** değil **die Wettervorhersage**. **das Wetter** yanlış mı, doğru mu, anlamadım. "Son parça" neyi belirliyor, bilmiyorum. | GERİ | Bir alanda iki fikir var: hata ve kural. Kural da yarım: neyin neyi belirlediği söylenmiyor. "**das Wetter** gibi" sözü yanlışa mı doğruya mı bağlı, belli değil. Öneri: "Hava tahmini derken **das Wettervorhersage** yanlış. Doğrusu **die Wettervorhersage**." Kural gerekiyorsa ayrı alanda, açık sözle verilir. |
| `lx:Sonne.forms[3].hint_tr` | Olacak derken **werden wir** ve sonda **haben** gelir. | "Olacak" her yerde **werden wir … haben** mi? Türkçede "biz" yok, **wir** nereden çıktı? | GERİ | Genel kural gibi okunuyor ve yanlış genelliyor. Cümle Türkçede "bol güneş olacak", Almancada "bol güneşimiz olacak". Bu fark söylenmiyor. Öneri: "Bol güneşimiz olacak derken **werden wir** ve sonda **haben** gelir." |
| `lx:Temperatur.forms[1].hint_tr` | Ateşiniz var mı derken **Haben Sie seit gestern Temperatur** denir. | Ateşiniz var mı derken **seit gestern** de mi söylenir? Ama ipucunda **Haben Sie Temperatur?** yazıyordu. | GERİ | Kartla çelişiyor. Aynı Türkçe söz ("Ateşiniz var mı") `exp.ipucu_tr` içinde **Haben Sie Temperatur?**, burada **seit gestern** ile veriliyor. **seit gestern** Türkçe ipucunda yok. Öneri: "Dünden beri ateşiniz var mı derken **Haben Sie seit gestern Temperatur** denir." |
| `lx:sich_vornehmen.forms[1].hint_tr` | Kendime derken **mir** gelir: **Ich habe mir vorgenommen**. | Cümlede "kendime" yok, "karar verdim" var. Neyi **mir** ile söyleyeceğimi bağlayamadım. | GERİ | İpucunun Türkçe sözü ekrandaki cümlede (Her gün yürüyüşe çıkmaya karar verdim) geçmiyor. Ayrıca genel kural gibi okunuyor: "kendime" her zaman **mir** değildir. Öneri: "Karar verdim derken **Ich habe mir vorgenommen** denir." |
| `lx:Niveau.mistakes_tr[0]` | A2 seviyesindeyim derken **Ich bin in Niveau A2** yanlış. Doğrusu **Ich bin auf dem Niveau A2**. | **in** değil **auf** denir. Ama **dem** de eklenmiş. Aynı kartta **auf Niveau B1** de var, orada **dem** yok. | GERİ | Yanlışla doğru arasında açıklanmayan ikinci fark (**dem** eklenmiş). Kartta **auf Niveau B1** de geçtiği için okur **dem** gerekli mi diye soruyor. Öneri: tek fark kalsın, örneğin yanlış **in dem Niveau A2**, doğru **auf dem Niveau A2**. Ya da ikisi de **dem** olmadan. |
| `lx:beibringen.forms[3].hint_tr` | Söz verdi derken **versprochen** ve sonda **beizubringen** gelir. | "Söz verdi" **versprochen** demek. Sondaki **beizubringen** ne demek, ipucu söylemiyor. | GERİ | Boşluk **beizubringen**, yani "öğreteceğine". İpucu ise "söz verdi" sözüne bağlanmış. İpucu boşluktaki sözü anlatmıyor. Öneri: "Öğreteceğine söz verdi derken sonda **beizubringen** gelir." |
| `lx:Karriere.exp.ipucu_tr` | Kariyer yapmak derken araya bir şey koymadan **Karriere machen** dersin. | Neyin arasına? **Karriere** ile **machen** arasına mı? Ama kartta **Karriere zu machen** var. | GERİ | "Araya" belirsiz ve kartla çelişiyor gibi okunuyor: `forms[0].hint_tr` **Karriere zu machen** gösteriyor. Asıl bilgi, önüne **eine** gelmemesi, söylenmiyor. Öneri: "Kariyer yapmak **Karriere machen** diye söylenir, önüne **eine** gelmez." |
| `lx:Karriere.forms[2].hint_tr` | Kariyeri için derken **Für seine Karriere** denir. | "Kariyeri için" hep **Für seine Karriere** mı? | GERİ | Bir sonraki satırla birlikte okuru şaşırtıyor. "Kariyeri" ile "kariyerinin" Türkçede aynı kişi sözü, ama burada **seine**, `forms[3]` içinde **ihrer** veriliyor. Erkek/kadın farkı söylenmiyor (a2-08 **Ihre**/**meine** sorunu). Öneri: "Onun (erkek) kariyeri için derken **Für seine Karriere** denir." |
| `lx:Karriere.forms[3].hint_tr` | Kariyerinin başında derken **Am Anfang ihrer Karriere** denir. | "Kariyerinin" deyince **ihrer** mi, **seine** mi? Bir önceki satırda **seine** vardı. | GERİ | Yukarıdakiyle aynı neden: aynı Türkçe sözün kartta açıklamasız iki Almanca karşılığı var. Öneri: "Kadın için kariyerinin başında derken **Am Anfang ihrer Karriere** denir." |

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GEÇTİ | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|---|
| `lx:Verlängerung` | 25 | 25 | 0 | Bir işin süresini uzatmak, ek süre. |
| `lx:abgeben` | 25 | 25 | 0 | Bir şeyi alacak kişiye ya da yere teslim etmek. |
| `lx:wiederkommen` | 25 | 25 | 0 | Bir yere bir kez daha gelmek, geri dönmek. |
| `lx:irgendwann` | 25 | 24 | 1 | Zamanı belli olmayan bir gün, günün birinde. |
| `lx:nachher` | 23 | 23 | 0 | Biraz sonra, aynı gün içinde. |
| `lx:Hoffnung` | 23 | 23 | 0 | İyi bir şey olacağına inanmak, umut. |
| `lx:weitermachen` | 25 | 25 | 0 | Bırakmadan sürdürmek, devam etmek. |
| `lx:Wettervorhersage` | 24 | 23 | 1 | Önümüzdeki günlerde havanın nasıl olacağını söyleyen tahmin. |
| `lx:Sonne` | 22 | 21 | 1 | Gökyüzünde ısı ve ışık veren güneş. |
| `lx:Wolke` | 22 | 22 | 0 | Gökyüzündeki beyaz ya da gri bulut. |
| `lx:Temperatur` | 22 | 21 | 1 | Havanın ya da vücudun ne kadar sıcak olduğu. Doktorda ateş demek. |
| `lx:sich_vornehmen` | 26 | 25 | 1 | Bir şeyi yapmaya kendi kendime karar vermek, kafaya koymak. |
| `lx:verbessern` | 24 | 24 | 0 | Bir şeyi daha iyi yapmak ya da hatayı düzeltmek. |
| `lx:Niveau` | 23 | 22 | 1 | Bir şeyi ne kadar iyi bildiğimi gösteren seviye. |
| `lx:Fortschritt` | 24 | 24 | 0 | İşte ya da öğrenmede ileri gitmek, ilerleme. |
| `lx:beibringen` | 25 | 24 | 1 | Birine bir şeyi göstererek öğretmek. |
| `lx:Erfolg` | 23 | 23 | 0 | Bir işi istediğim gibi bitirmek, başarı. |
| `lx:Karriere` | 22 | 19 | 3 | Bir meslekte yıllar içinde yükselmek, kariyer. |
| `lx:Anfänger` | 23 | 23 | 0 | Bir işi ya da dili yeni öğrenmeye başlamış kişi. |

Karar değiştirmeyen notlar:
- `lx:beibringen.mistakes_tr[1]` (**Ich habe mich selbst gelernt** yerine **Ich habe es mir selbst beigebracht**) ve `lx:weitermachen.mistakes_tr[1]` (**zum** yerine **mit dem**) birden çok sözü değiştiriyor. Bu değişiklikler düzeltmeden kaçınılmaz olarak geliyor, ayrıca bir hata değil. GEÇTİ.
- `lx:Niveau.forms[1].hint_tr` "Seviyede derken **auf dem Niveau** denir." `forms[3]` içindeki **auf Niveau B1** ile yan yana okuyunca **dem** sorusu burada da doğuyor. GERİ'yi `mistakes_tr[0]` üzerinde verdim. O düzelirken bu satır da birlikte düşünülmeli.
- `lx:Temperatur.exp.ne_zaman_tr` "Hava tahmininde ve doktorda ateşten söz ederken.": "ateşten söz ederken" iki yere birden bağlanabiliyor. Ben doğru anladım, GEÇTİ. "Hava tahmininde ya da doktorda ateşten söz ederken" daha net olurdu.
- `lx:Niveau.exp.ne_zaman_tr` "dil bilginden": "dilbilgisi" gibi görünebiliyor, anlam yine "bildiğin dil" yönünde. GEÇTİ.
- `lx:Anfänger.mistakes_tr[0]` doğru olarak **Anfänger** ya da **Anfängerin** veriyor, farkı bu alanda söylemiyor. `exp.ipucu_tr` kadın için olduğunu açıklıyor. GEÇTİ.
- `lx:Anfänger.forms[3].hint_tr` "Gitmeyi düşünüyoruz derken sonda **zu machen** gelir." ve `lx:nachher.forms[3].hint_tr` "Sonra derken **Ich muss nachher noch einkaufen** denir.": Türkçe söz ile kalın parça tam örtüşmüyor. Yine de yanlış kural öğretmiyor, GEÇTİ.
- `lx:Wettervorhersage.forms[1].hint_tr` ve `lx:Wolke.forms[3].hint_tr` "Yağacak derken **wird es regnen** denir.": cümleler yağmurla ilgili, GEÇTİ.
- `lx:abgeben.exp.parcalar[0]` "uzağa, -den": iki anlam ve tire var, ama parça listesinde anlaşılır. GEÇTİ.
- `lx:Niveau.mistakes_tr[1]` "Türkçedeki nivo gibi okunur": "nivo" az bilinen bir söz, yine de okunuş için yeterli. GEÇTİ.

## Sayılar

- Toplam: 451
- GEÇTİ: 441
- GERİ: 10

GERİ kimlikleri: `lx:irgendwann.exp.ne_zaman_tr`, `lx:Wettervorhersage.mistakes_tr[0]`, `lx:Sonne.forms[3].hint_tr`, `lx:Temperatur.forms[1].hint_tr`, `lx:sich_vornehmen.forms[1].hint_tr`, `lx:Niveau.mistakes_tr[0]`, `lx:beibringen.forms[3].hint_tr`, `lx:Karriere.exp.ipucu_tr`, `lx:Karriere.forms[2].hint_tr`, `lx:Karriere.forms[3].hint_tr`

GERİ olduğu için batch-a2-10 "reviewed" sayılamaz (OD-9.4). Düzeltmeden sonra yalnız bu 10 alan yeniden okunur.

## Fark turu (2026-11-23): düzeltilen 10 alan

| kart.alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| `lx:irgendwann.exp.ne_zaman_tr` | Bir planını ya da hayalini, tarih vermeden anlatırken. | Bir planımı ya da hayalimi tarih söylemeden anlatırken. | GEÇTİ | "hayali tarih" bağlanması gitmiş. Virgül doğru yerde, tek okumada anlaşılıyor. |
| `lx:Wettervorhersage.mistakes_tr[0]` | Hava tahmini derken **das Wettervorhersage** yanlış. Doğrusu **die Wettervorhersage**. | Hava tahmini için **das** değil **die** denir. | GEÇTİ | Yarım kural ve **das Wetter** karışıklığı gitmiş. Tek fikir, tek fark. |
| `lx:Sonne.forms[3].hint_tr` | Bol güneşimiz olacak derken **werden wir** ve sonda **haben** gelir. | Almancada "bol güneşimiz olacak" denir, o yüzden **werden wir** ve sonda **haben**. | GEÇTİ | **wir** artık "güneşimiz" sözüyle açıklanıyor, genel kural gibi okunmuyor. Not: cümlenin `tr` alanında hâlâ "bol güneş olacak" yazıyor. Okur bunu bağlayabiliyor, karar değişmiyor. |
| `lx:Temperatur.forms[1].hint_tr` | Dünden beri ateşiniz var mı derken **Haben Sie seit gestern Temperatur** denir. | "Dünden beri ateşiniz var mı" için **Haben Sie seit gestern Temperatur** denir. | GEÇTİ | Türkçe söz cümleyle bire bir örtüşüyor. `exp.ipucu_tr` ile artık çelişmiyor. |
| `lx:sich_vornehmen.forms[1].hint_tr` | Karar verdim derken **Ich habe mir vorgenommen** denir. | "Karar verdim" için **Ich habe mir vorgenommen** derim. | GEÇTİ | Cümlede geçen söze bağlandı. "kendime" kuralı gitmiş. |
| `lx:Niveau.mistakes_tr[0]` | A2 seviyesindeyim derken **Ich bin in dem Niveau A2** yanlış. Doğrusu **Ich bin auf dem Niveau A2**. | Seviye için **in** değil **auf** denir. | GEÇTİ | Tek fark kaldı: **in** yerine **auf**. Not: `forms[1].hint_tr` (**auf dem Niveau**) ile `forms[3]` (**auf Niveau B1**) arasındaki **dem** sorusu ilk turdaki notta duruyor. Engel değil. |
| `lx:beibringen.forms[3].hint_tr` | Öğreteceğine söz verdi derken sonda **beizubringen** gelir. | "Öğreteceğine" sözü sonda **beizubringen** olur. | GEÇTİ | Artık boşluktaki sözü anlatıyor. |
| `lx:Karriere.exp.ipucu_tr` | Kariyer yapmak derken çoğu zaman **eine** olmadan **Karriere machen** dersin. | Kariyer yapmak için önüne **eine** koymadan **Karriere machen** derim. | GEÇTİ | Belirsiz "araya" gitmiş. **Karriere zu machen** ile çelişmiyor. 10 kelime. |
| `lx:Karriere.forms[2].hint_tr` | Onun (erkek) kariyeri için derken **Für seine Karriere** denir. | Bir erkeğin kariyeri için **seine** derim. | GEÇTİ | Erkek olduğu söyleniyor. `forms[3]` ile birlikte okununca **seine** / **ihrer** farkı anlaşılıyor. |
| `lx:Karriere.forms[3].hint_tr` | Kadın için kariyerinin başında derken **Am Anfang ihrer Karriere** denir. | Bir kadının kariyerinin başı için **ihrer** derim. | GEÇTİ | Kadın olduğu söyleniyor, kartla çelişki kalmadı. |

### Fark turu sayıları

- Okunan satır: 10
- GEÇTİ: 10
- GERİ: 0

Fark turunda GERİ kalmadı. Okur kapısı (OD-9.3) açısından batch-a2-10 "reviewed" olabilir (bütün turlar: 451 alan, açık GERİ yok).
