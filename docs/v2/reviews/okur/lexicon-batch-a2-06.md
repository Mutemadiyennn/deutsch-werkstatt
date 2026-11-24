# Okur raporu: lexicon-batch-a2-06 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-06.json`, 21 kart (ortasına **zu** giren ayrılabilen sözler, banka, telefon bilgi hattı ve tuşlar). Dilbilimci turundan sonraki hâli okundu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **574 alan**. Hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar (geçen turların geri dönüş türleri):
  - aynı Türkçe sözün kart içinde farklı Almanca biçim vermesi;
  - kişi eşleşmesi;
  - terim;
  - üç nokta;
  - cümleyle örtüşmeyen ipucu;
  - kartın kelimesini içermeyen hata notu;
  - genel kural gibi okunup kartla çelişen ipucu;
  - yanlışla doğru arasında açıklanmayan ikinci fark;
  - 14 kelimeden uzun cümle.
- Tarama sonucu: hiçbir Türkçe alanda **=**, **;**, üç nokta, tırnak ya da dilbilgisi terimi yok. 14 kelimeyi aşan cümle yok (`lx:einzahlen.forms[4].hint_tr` tam 14 kelime).

## GERİ satırları

| öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| `lx:Kundenservice` | `mistakes_tr[0]` | Müşteri hizmetlerini aradım derken **Ich habe die Kundenservices angerufen** yanlış. Doğrusu **Ich habe beim Kundenservice angerufen**. | Müşteri hizmetlerini aradım derken **beim Kundenservice** derim. | GERİ | Yanlışla doğru arasında birden çok fark var. Sondaki **s** gitmiş, **die** yerine **beim** gelmiş. Kutu hangisinin hata olduğunu söylemiyor. Üstelik aynı partide `lx:Hotline` "yardım hattını aradım" için **Ich habe die Hotline angerufen** diyor; orada **die … angerufen** doğru. İkisinin farkını anlamadım. |
| `lx:anziehen` | `forms[4].hint_tr` | Kışın sık sık iki kazak giyerim derken **ziehe ich oft zwei Pullover an** denir. | Kışın iki kazak giyerim derken **anziehen** derim. | GERİ | Aynı kartın hata kutusu "mont giyiyor" için **anziehen** değil **tragen** diyor (mont zaten üstünde). İpucu kutusu da giysi üstünde dururken **tragen** diyor. "Kışın iki kazak giyerim" bana kazak üstümde duruyor gibi geldi, yani **tragen**. Burada ise **anziehen** çıkıyor; ikisini ayıramadım. |

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|
| `lx:ausmachen` | 28 | 0 | Işığı, telefonu ya da bir cihazı kapatmak. |
| `lx:aufmachen` | 28 | 0 | Kapıyı, pencereyi ya da şişeyi açmak. |
| `lx:zumachen` | 28 | 0 | Kapıyı, pencereyi ya da dükkânı kapatmak. |
| `lx:anziehen` | 28 | 1 | Bir giysiyi ya da ayakkabıyı üstüme geçirmek. |
| `lx:mitbringen` | 28 | 0 | Bir yere gelirken yanımda bir şey ya da birini getirmek. |
| `lx:rausbringen` | 28 | 0 | Bir şeyi, çoğunlukla çöpü, dışarı götürmek. |
| `lx:wegwerfen` | 28 | 0 | İşe yaramayan bir şeyi çöpe atmak. |
| `lx:Bank` | 26 | 0 | Hesap açtığım, para yatırıp çektiğim yer. |
| `lx:Schalter` | 26 | 0 | Bankada ya da postada görevlinin oturduğu gişe. |
| `lx:einzahlen` | 28 | 0 | Hesabıma para yatırmak. |
| `lx:Kontostand` | 28 | 0 | Hesabımda şu an ne kadar para olduğu. |
| `lx:Kontoauszug` | 28 | 0 | Hesabıma giren ve çıkan paranın listesi. |
| `lx:Dauerauftrag` | 28 | 0 | Bankanın her ay aynı parayı benim yerime göndermesi. |
| `lx:Auskunft` | 26 | 0 | Bir şey sorunca bana verilen bilgi. |
| `lx:Hotline` | 26 | 0 | Bir firmaya soru sormak için aradığım telefon hattı. |
| `lx:Kundenservice` | 28 | 1 | Firmada müşterilerin sorularına bakan bölüm. |
| `lx:Menü` | 26 | 0 | Telefonda ya da ekranda seçebileceğim şeylerin listesi. |
| `lx:eingeben` | 28 | 0 | Numarayı ya da şifreyi telefona veya makineye girmek. |
| `lx:Werktag` | 28 | 0 | Pazar ve resmî tatil olmayan her gün. |
| `lx:Raute` | 26 | 0 | Telefondaki kare tuşu. |
| `lx:Stern` | 26 | 0 | Yıldız; telefondaki yıldız tuşu da. |

Öteki alanların hepsini tek okumada anladım ve anladığım şey Almancasıyla örtüştü. Karar değiştirmeyen notlar:
- "**zu** kelimenin ortasına girer" ve "**ge** kelimenin ortasına girer" ipuçlarını kolayca anladım (**auszumachen**, **mitgebracht**). Her kartta aynı sözle tutarlı kullanılmış.
- `lx:aufmachen.mistakes_tr[0]` "**aufmachen** kapı ve pencere içindir" diyor. Aynı kartta şişe ve dükkân için de **aufmachen** var. Kartın ipucu "Dükkân açılınca **da**" diye ekliyor; kutu ışıkla karşılaştırma yaptığı için çelişki saymadım.
- `lx:Raute.mistakes_tr[1]` İngilizce **Hashtag** kelimesini anıyor. Yanlış arkadaş uyarısı (D-060), İngilizce bilmeden de anlaşılıyor.
- Türkçe olmayan, kapsam dışı bir gözlem: iki boşluklu cevaplarda üç nokta var (**Mach … aus**, **ziehst … an**, **bringen … mit**, **werfen … weg**, **zahle … ein**, **Gib … ein** gibi). Önceki partilerdeki notla aynı.

## Sayılar

- Toplam: 574
- GEÇTİ: 572
- GERİ: 2

GERİ kimlikleri: `lx:Kundenservice.mistakes_tr[0]`, `lx:anziehen.forms[4].hint_tr`

Dosyada GERİ olduğu için "reviewed" sayılamaz (OD-9.4).

---

## 2. tur (2026-11-23): düzeltilen alanlar

- Girdi: `content/v2/registry/lexicon/batch-a2-06.json`. 1. turla karşılaştırınca öğrenciye görünen alanlarda yalnız şunlar değişmiş:
  - `lx:Kundenservice.mistakes_tr[0]`;
  - `lx:anziehen.forms[4]` (cümle, `tr`, `hint_tr`).
- Her alan kendi kartıyla birlikte okundu. Baş geliştiricinin isteğiyle `lx:anziehen.examples[5]` de yeniden okundu.

| öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| `lx:Kundenservice` | `mistakes_tr[0]` | Müşteri hizmetlerini aradım derken **Ich habe beim Kundenservices angerufen** yanlış. Doğrusu **Ich habe beim Kundenservice angerufen**. Türkçede hizmetleri denir, Almancada sona **s** gelmez. | Türkçede "hizmetleri" desem de Almancada sonuna **s** koymam. | GEÇTİ | Yanlışla doğru arasında artık tek fark var ve kutu onu açıklıyor. Kartın eşdizimiyle (**beim Kundenservice anrufen**) ve `forms[2]` ile örtüşüyor. |
| `lx:anziehen` | `forms[4].tr` | Hava soğuk, bir kazak daha giyiyorum. | Üşüdüğüm için şimdi bir kazak daha üstüme geçiriyorum. | GEÇTİ | Cümle (**Es ist kalt, ich ___ noch einen Pullover ___.**) ile örtüşüyor. |
| `lx:anziehen` | `forms[4].hint_tr` | Bir kazak daha giyiyorum derken **ich ziehe noch einen Pullover an** denir. | Şimdi bir kazak daha üstüme geçirirken **anziehen** derim. | GEÇTİ | Kartın ipucuyla örtüşüyor: üstüne geçirirken **anziehen**. Hata kutusundaki "mont zaten üstünde" (**tragen**) ile çelişmiyor. "Hava soğuk" ve "bir kazak daha" sözleri şimdi giyildiğini açıkça gösteriyor. |
| `lx:anziehen` | `examples[5].tr` (yeniden okundu) | Kışın sık sık iki kazak giyerim. (**Im Winter ziehe ich oft zwei Pullover an.**) | Kışın çoğu zaman iki kazak üst üste giyerim. | GEÇTİ (not) | Kural vermeyen bir örnek çevirisi; Almancası doğal ve doğru. Bu eşlemeyi kural gibi sunan ipucu kalktığı için engel saymadım. Yine de ipucunu yeni okumuş bir öğrenci "giyerim" sözünü "üstünde duruyor" diye okuyup **tragen** bekleyebilir. Yazar isterse çeviriyi "giyinirim" ya da "üstüme geçiririm" yönüne çekebilir. Karar değiştirmeyen not. |

### 2. tur sayıları

- Yeniden okunan: 4 (3 düzeltilen alan ve 1 istenen yeniden okuma)
- GEÇTİ: 4
- GERİ: 0

### Parti durumu (bütün turlar)

- Toplam: 574
- GEÇTİ: 574
- GERİ: 0

Okur kapısı (OD-9.3) açısından batch-a2-06 "reviewed" olabilir.

---

## Fark turu (İÇ-K3, 2026-11-23): yeni ve değişen Türkçe satırlar

- Girdi: `content/v2/registry/lexicon/batch-a2-06.json` ve `batch-a2-05.json` içindeki `lx:Zentrum`.
- Yalnız baş geliştiricinin verdiği satırlar okundu. `lx:drücken` kartı yeni olduğu için bütün Türkçesi okundu. Her satır kendi kartıyla birlikte okundu.
- İçeriğe dokunulmadı. Öneriler yazar/dilbilimci içindir.

| öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|
| `lx:drücken` | `tr` | basmak (tuşa, düğmeye), bastırmak, itmek (kapıyı) | Tuşa ya da düğmeye basmak, bir yeri bastırmak, kapıyı itmek. | GEÇTİ | Kartın bütün örnekleriyle örtüşüyor. |
| `lx:drücken` | `collocations[0].tr` | bire basmak | Telefonda 1 tuşuna basmak. | GEÇTİ | **die Eins drücken** ile örtüşüyor. |
| `lx:drücken` | `collocations[1].tr` | ışık düğmesine basmak | Duvardaki ışık düğmesine basmak. | GEÇTİ | `lx:Schalter` kartındaki "(ışık) düğmesi" anlamıyla tutarlı. |
| `lx:drücken` | `collocations[2].tr` | zile basmak | Kapının zilini çalmak için basmak. | GEÇTİ | **auf die Klingel drücken** ile örtüşüyor. |
| `lx:drücken` | `mistakes_tr[0]` | Kapıda **Drücken** yazınca kapıyı çekmek yanlış. **Drücken** burada itmek demektir, çekmek **ziehen** olur. | Kapıda **Drücken** yazıyorsa kapıyı iterim, çekmem. Çekmek için **Ziehen** yazar. | GEÇTİ | Tek fikir (itmek ile çekmek). Cümleler 7'şer kelime. Almanya'daki kapı yazılarıyla örtüşüyor. |
| `lx:drücken` | `mistakes_tr[1]` | Bire basın derken **Drücken Sie der Eins** yanlış. Türkçede **bire** dersin, Almancada sayı **die Eins** olarak kalır. Doğrusu **Drücken Sie die Eins**. | Türkçede "bire" deriz ama Almancada sayı değişmez, **die Eins** der kalır. | GEÇTİ | Tek fikir. En uzun cümle 10 kelime. Örnek 1 ile örtüşüyor. |
| `lx:drücken` | `examples[0].tr` | Almanca için lütfen bire basın. | Almanca istiyorsan 1'e bas. | GEÇTİ | Almancasıyla örtüşüyor. |
| `lx:drücken` | `examples[1].tr` | Faturayla ilgili sorular için lütfen üçe basın. | Fatura sorusu varsa 3'e bas. | GEÇTİ | Almancasıyla örtüşüyor. |
| `lx:drücken` | `examples[2].tr` | Üç kere bire bastım ama hiçbir şey olmuyor. | 1'e üç kez bastım, bir şey çıkmadı. | GEÇTİ | **da kommt nix** doğal karşılanmış. |
| `lx:drücken` | `examples[3].tr` | – Hangi numaraya basmam gerekiyor? – İkiye, o zaman müşteri hizmetlerine bağlanırsın. | Hangi tuşa basayım? 2'ye bas, müşteri hizmetlerine geçersin. | GEÇTİ | Almancasıyla örtüşüyor. |
| `lx:drücken` | `examples[4].tr` | – Buraya bastırınca acıyor mu? – Evet, orası acıyor. | Doktor bir yere bastırıp acıyor mu diye soruyor, ben evet diyorum. | GEÇTİ | Doktordaki "bastırmak" anlamını iyi gösteriyor. |
| `lx:drücken` | `examples[5].tr` | Bire mi ikiye mi basmam gerektiğini biliyor musunuz? | 1'e mi 2'ye mi basayım, biliyor musunuz diye soruyorum. | GEÇTİ | Almancasıyla örtüşüyor. |
| `lx:drücken` | `exp.anlam_tr` | **drücken** bir tuşa ya da düğmeye basmak, bir yere bastırmaktır. | Tuşa, düğmeye ya da bir yere basmak. | GEÇTİ | Tek fikir (basmak). 9 kelime. |
| `lx:drücken` | `exp.ne_zaman_tr` | Telefonda bilgi hattını ararken, kapıda ve doktorda. | Telefon menüsünde, kapı açarken ve doktorda kullanılır. | GEÇTİ | Kartın örnekleriyle ve alanlarıyla örtüşüyor. |
| `lx:drücken` | `exp.ipucu_tr` | Telefonda **Drücken Sie die Zwei** duyarsan ikiye basarsın, sayının önünde hep **die** durur. | Telefonda bunu duyunca 2'ye basarım. Bir de sayının önüne hep **die** gelirmiş. | GERİ | İki fikir var. Birincisi "bunu duyunca ne yaparsın", ikincisi "sayının önünde hep **die** durur" kuralı. Virgülle tek cümleye bağlanmış. Yorgun okurken ikinci kural birinciyi gölgeliyor. Kural zaten `mistakes_tr[1]`de var. Öneri: tek fikir kalsın. Örneğin yalnız "Telefonda **Drücken Sie die Zwei** duyarsan ikiye basarsın." ya da yalnız sayının önündeki **die**. |
| `lx:drücken` | `forms[0].tr` | Almanca için lütfen bire basın. | Almanca için 1'e bas. | GEÇTİ | Cümleyle örtüşüyor. |
| `lx:drücken` | `forms[0].hint_tr` | Basın derken **drücken Sie** denir. | "Basın" demek için **drücken Sie** derim. | GEÇTİ | Kısa, tek fikir. |
| `lx:drücken` | `forms[1].tr` | Üç kere bire bastım. | 1'e üç kez bastım. | GEÇTİ | Cümleyle örtüşüyor. |
| `lx:drücken` | `forms[1].hint_tr` | Bastım derken **Ich habe gedrückt** denir. | "Bastım" demek için **Ich habe gedrückt** derim. | GEÇTİ | Kısa, tek fikir. Boşluktaki **gedrückt** biçimini veriyor. |
| `lx:drücken` | `forms[2].tr` | Hangi numaraya basmam gerekiyor? | Hangi tuşa basayım? | GEÇTİ | Cümleyle örtüşüyor. |
| `lx:drücken` | `forms[2].hint_tr` | **muss** ile sona **drücken** gelir. | Cümlede **muss** varsa sona **drücken** gelir, değişmeden. | GEÇTİ | 5 kelime, terim yok. **muss** A2'de bilinen bir kelime. Boşluğa gelecek biçimi açıkça söylüyor. |
| `lx:drücken` | `forms[3].tr` | Buraya bastırınca acıyor mu? | Buraya bastırırsam acır mı? | GEÇTİ | Cümleyle örtüşüyor. |
| `lx:drücken` | `forms[3].hint_tr` | **wenn** ile **drücke** en sona gider. | Cümlede **wenn** varsa **drücke** en sona gelir. | GEÇTİ | 6 kelime, terim yok. Biçimi (**drücke**) ve yerini söylüyor. `forms[2]` ile aynı kalıpta, tutarlı. |
| `lx:Kontostand` | `examples[4].tr` | – Bakiyem ne kadar? – Hesabınızda 820 avro kaldı. | Bakiyemi soruyorum, hesabımda 820 avro var diyorlar. | GEÇTİ | Almancasıyla örtüşüyor. |
| `lx:Kontostand` | `mistakes_tr[0]` | Türkçede **hesap** hem bankadaki hesap hem lokantada ödenen hesaptır. Hesabında ne kadar para var diye sorarken **Rechnung** deme, o ödeyeceğin hesaptır. Doğrusu **Wie ist mein Kontostand?** | Türkçede "hesap" iki şey demek. Bankadaki paramı sorarken **Rechnung** demem, o ödenecek hesap. | GEÇTİ | Tek fikir (iki "hesap" karışmasın). Cümleler 9 ve 12 kelime. Doğru söz kartın ipucuyla aynı. |
| `lx:unsicher` | `mistakes_tr[0]` | Telefonda kendimden emin değilim derken **Am Telefon bin ich von mir unsicher** yanlış. Türkçedeki **kendimden** Almancaya geçmez. Doğrusu **Am Telefon bin ich unsicher**. | "Kendimden" sözünü Almancaya çevirmem, yalnız **unsicher** derim. | GEÇTİ | Tek fikir. En uzun cümle 13 kelime. `forms[1]` ile örtüşüyor. |
| `lx:Zentrum` (a2-05) | `collocations[3].tr` | Wendlfing'in merkezi | Wendlfing şehrinin merkezi. | GEÇTİ | **das Zentrum von Wendlfing** ile örtüşüyor. |
| `lx:Hotline` | `forms[1].hint_tr` | Yardım hattının numarası derken **Die Nummer von der Hotline** denir. | Yardım hattının numarasını söylemek için **Die Nummer von der Hotline** derim. | GEÇTİ | 10 kelime, tek fikir. Cümleyle ve kartın eşdizimiyle örtüşüyor. |
| `lx:Öffnungszeiten` (a2-05) | `forms[3].hint_tr` | Vatandaş bürosunun çalışma saatleri derken **Die Öffnungszeiten vom Bürgerbüro** denir. | Vatandaş bürosunun saatlerini söylemek için **Die Öffnungszeiten vom Bürgerbüro** derim. | GEÇTİ | 10 kelime, tek fikir. Cümleyle örtüşüyor. |
| `lx:Öffnungszeiten` (a2-05) | `forms[4].hint_tr` | Postanenin çalışma saatleri derken **die Öffnungszeiten von der Post** denir. | Postanenin saatlerini söylemek için **die Öffnungszeiten von der Post** derim. | GEÇTİ | 10 kelime, tek fikir. Cümleyle örtüşüyor. |

### Fark turu sayıları

- Okunan satır: 30 (`lx:drücken` 23, `lx:Kontostand` 2, `lx:unsicher` 1, `lx:Zentrum` 1, `lx:Hotline` 1, `lx:Öffnungszeiten` 2)
- GEÇTİ: 29
- GERİ: 1

GERİ kimlikleri: `lx:drücken.exp.ipucu_tr`

Bu fark turunda GERİ olduğu için batch-a2-06 "reviewed" sayılamaz (OD-9.4). Düzeltmeden sonra yalnız bu alan yeniden okunur.

- Düzeltme okuması: `lx:drücken.exp.ipucu_tr` "Telefonda **Drücken Sie die Zwei** duyarsan ikiye basarsın." Kendi sözlerimle: telefonda bunu duyunca 2'ye basarım. GEÇTİ (8 kelime, tek fikir, ikinci kural çıkmış). Fark turunda GERİ kalmadı.
