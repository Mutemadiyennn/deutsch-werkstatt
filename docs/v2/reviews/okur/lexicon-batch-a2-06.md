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
