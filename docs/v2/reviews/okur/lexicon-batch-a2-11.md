# Okur raporu: lexicon-batch-a2-11 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-11.json`, 28 kart (hayaller ve boş zaman, doktorda nefes ve muayene, sabah ve telefon, bilmediğin kelimeyi anlatmak, yanlış anlaşılma ve çeviri, şekil). İlk okur turu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **620 alan**. Bütün satırlar betikle döküldü ve hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar (a2-08 ve a2-10'un sık GERİ'leri): hata notunda yanlışla doğru arasında açıklanmayan ikinci fark, genel kural sanılan ipucu, aynı Türkçe sözün kartta açıklamasız iki Almanca karşılığı, ipucunun boşluktaki sözle örtüşmesi, virgülle yanlış bağlanan durumlar, 14 kelime.
- Tarama sonucu: **=**, **;**, üç nokta, tırnak içinde Almanca ve dilbilgisi terimi yok. En uzun cümle 14 kelime (`lx:Wecker.mistakes_tr[0]`, sınırda, geçer). Betiğin uyarıları yanlış alarm: kesme işareti yer ve kişi adlarında (Jonas'tan, Bavyera'da, Türkiye'dekinden), terim aramasında "ek", "isim", "fiil" gibi harf dizileri başka sözlerin içinde (ekmek, istemek, vermek…). `parcalar` içindeki **-er**, **miss-** ve `collocations` içindeki "-e benzer", "-den farklı", "-in zıttı" tireleri a2-10'daki gibi parça gösterimi, anlaşılır.

## GERİ satırları

| kart.alan | açıklama | kendi sözlerimle | karar | neden ve öneri |
|---|---|---|---|---|
| `lx:einatmen.forms[0].hint_tr` | Yavaşça nefes alın derken **langsam einatmen** denir. | "Nefes alın" derken başta **einatmen** mi diyeceğim? Ama ipucu **Atmen Sie ein** dedi, **ein** sonda durur dedi. Hata notu da **Einatmen Sie** yanlış dedi. | GERİ | Kartla çelişiyor. Aynı Türkçe söz ("nefes alın") `exp.ipucu_tr` ve `mistakes_tr[0]` içinde **Atmen Sie ein**, burada **langsam einatmen**. Doktorun kısa komut biçimi hiç söylenmiyor, okur **ein**'ın yerini artık bilemiyor. Öneri: kartta bir yerde açıkça söylensin, örneğin "Doktor kısaca **langsam einatmen** de der, bu da yavaşça nefes alın demek." |
| `lx:ausatmen.forms[0].hint_tr` | Yavaşça nefes verin derken **langsam ausatmen** denir. | "Nefes verin" için hata notu **Atmen Sie aus** dedi. Burada **langsam ausatmen**. Hangisi? | GERİ | Aynı neden: `mistakes_tr[0]` "Nefes verin" için doğruyu **Atmen Sie aus** veriyor, burada aynı Türkçe söz başka biçimle geliyor, açıklama yok. Öneri: einatmen'deki gibi kısa komut biçimi bir kez açıkça söylensin ("Doktor kısaca **langsam ausatmen** de der"). |
| `lx:ausatmen.forms[3].hint_tr` | Tekrar verin derken **wieder ausatmen** denir. | "Verin" deyince **Atmen Sie aus** değil mi? Burada **ausatmen** tek başına. | GERİ | Yukarıdakiyle aynı: "verin" sözü kartta iki ayrı Almanca biçimle geliyor. Öneri: kısa komut biçimi kartta bir kez açıklandıktan sonra bu satır kalabilir. Ya da "Tekrar nefes verin derken doktor kısaca **wieder ausatmen** der." |
| `lx:beschreiben.exp.ne_zaman_tr` | Kelimeyi bilmediğinde, yolu ya da ağrıyı anlatırken. | İlk okuyuşta tek bir durum anladım: yolu ya da ağrıyı anlatırken kelimeyi bilmediğimde. İkinci okuyuşta üç ayrı durum olduğunu gördüm. | GERİ | Virgül iki zaman sözünü yan yana koyuyor, tek okumada biri ötekinin içine bağlanıyor (a2-10 `lx:irgendwann` ile aynı tür). Öneri: "Yol tarif ederken, ağrını anlatırken ya da kelimeyi bilmediğinde." |
| `lx:ungefähr.mistakes_tr[0]` | Saat yedi gibi derken **wie sieben Uhr** yanlış. Doğrusu **ungefähr sieben Uhr**. | "Saat yedi gibi" için **wie** değil **ungefähr** denir. Ama aynı kartta "saat yedi gibi" **ungefähr um sieben** diye geçiyor. **um** gerekli mi? | GERİ | Aynı Türkçe söz ("saat yedi gibi") `collocations[3]` ve `forms[2]` içinde **ungefähr um sieben**, burada "doğrusu" diye **ungefähr sieben Uhr** veriliyor. Okur **um** ve **Uhr** farkını sorar, açıklama yok (a2-10 `lx:Niveau` **dem** sorusu gibi). Öneri: tek fark kalsın ve kartla aynı olsun, örneğin "Saat yedi gibi derken **wie um sieben** yanlış. Doğrusu **ungefähr um sieben**." |
| `lx:Werkzeug.exp.ipucu_tr` | Adını bilmediğin aleti **Das ist ein Werkzeug, das man** diye anlatırsın. | Adını bilmediğim aleti "Bu bir alet, ki insan" diye anlatırım. Sonra ne diyeceğim? Cümle yarım kalıyor. | GERİ | Kalıp **das man** üzerinde kesiliyor. Ardından ne geleceği, sonda bir söz geleceği söylenmiyor. `ähnlich` ve `Form` ipuçlarında "bildiğin bir şeye benzetirsin" devamı anlatıyor, burada yok. Öneri: "Adını bilmediğin aleti **Das ist ein Werkzeug, das man zum Reparieren braucht** gibi anlatırsın." (14 kelime.) |

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GEÇTİ | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|---|
| `lx:Lotto` | 22 | 22 | 0 | Sayı seçip büyük para kazanmayı umduğum şans oyunu, loto. |
| `lx:Weltreise` | 23 | 23 | 0 | Birçok ülkeyi gezdiğim uzun yolculuk, dünya turu. |
| `lx:Haustier` | 23 | 23 | 0 | Evde beslenen köpek gibi hayvan. |
| `lx:Instrument` | 21 | 21 | 0 | Gitar, piyano gibi müzik çaldığım alet. |
| `lx:Konzert` | 21 | 21 | 0 | Müziği canlı dinlediğim gösteri. |
| `lx:Spaziergang` | 23 | 23 | 0 | Keyif için yaptığım kısa, sakin yürüyüş. |
| `lx:Rat` | 22 | 22 | 0 | Birine ne yapsa iyi olur diye söylediğim tavsiye. |
| `lx:einatmen` | 23 | 22 | 1 | Havayı içime çekmek, nefes almak. |
| `lx:ausatmen` | 23 | 21 | 2 | İçimdeki havayı dışarı vermek. |
| `lx:Oberkörper` | 23 | 23 | 0 | Vücudun belden yukarısı: göğüs, sırt, omuzlar. |
| `lx:Wecker` | 23 | 23 | 0 | Sabah beni uyandıran saat. |
| `lx:verschlafen` | 22 | 22 | 0 | Sabah fazla uyuyup geç kalmak. |
| `lx:Ladegerät` | 23 | 23 | 0 | Telefonu prize takıp şarj ettiğim alet. |
| `lx:leer` | 21 | 21 | 0 | Boş, telefon için şarjı bitmiş. |
| `lx:beschreiben` | 21 | 20 | 1 | Bir şeyin nasıl olduğunu sözle anlatmak. |
| `lx:ähnlich` | 22 | 22 | 0 | Başka bir şeye benzeyen. |
| `lx:ungefähr` | 22 | 21 | 1 | Tam değil, aşağı yukarı. |
| `lx:Werkzeug` | 23 | 22 | 1 | Bir şeyi yapmak ya da tamir etmek için kullandığım alet. |
| `lx:Material` | 21 | 21 | 0 | Bir şeyin yapıldığı madde, örneğin plastik. |
| `lx:Plastik` | 21 | 21 | 0 | Şişede, poşette, oyuncakta kullanılan hafif madde. |
| `lx:Gegenteil` | 23 | 23 | 0 | Bir şeyin tam tersi, sıcağın zıttı soğuk. |
| `lx:einfallen` | 24 | 24 | 0 | Bir şeyin birden aklıma gelmesi. |
| `lx:Thema` | 22 | 22 | 0 | Konuştuğum ya da yazdığım konu. |
| `lx:anders` | 22 | 22 | 0 | Bir şeyin başka türlü, farklı olması. |
| `lx:missverstehen` | 23 | 23 | 0 | Birinin söylediğini yanlış anlamak. |
| `lx:übersetzen` | 21 | 21 | 0 | Bir şeyi bir dilden başka dile çevirmek. |
| `lx:Form` | 21 | 21 | 0 | Bir şeyin dış şekli: yuvarlak, köşeli, uzun. |
| `lx:rund` | 21 | 21 | 0 | Top ya da tabak gibi yuvarlak. |

Karar değiştirmeyen notlar:
- `lx:Rat.exp.ne_zaman_tr` "Bir sorunda başkasının fikrini isterken ya da verirken.": harfiyen "başkasının fikrini vermek" diye de okunabiliyor. Ben tek okumada "tavsiye isterken ya da verirken" diye anladım, GEÇTİ. "Bir sorunda fikir isterken ya da verirken" daha net olurdu.
- `lx:ausatmen.forms[2].hint_tr` "Yavaşça nefes ver derken **langsam ausatmen** denir.": "ver" (sen) için kartta başka biçim yok, doğrudan çelişmiyor. GEÇTİ. Ama yukarıdaki kısa komut açıklaması eklenince bu satır da onunla birlikte okunur.
- `lx:ungefähr.collocations[3]` ve `forms[2].hint_tr` (**ungefähr um sieben**): kendi başlarına anlaşılır, GEÇTİ. GERİ'yi `mistakes_tr[0]` üzerinde verdim.
- `lx:Werkzeug.collocations[2]` "bodrumdaki aletler" → **Werkzeug im Keller**, `mistakes_tr[0]` ise "çok alet" için **Werkzeuge** istiyor. Türkçe sözler farklı, satır kendi başına doğru, GEÇTİ. Okur "aletler" deyince **-e** gerekmez mi diye sorabilir.
- `lx:Werkzeug.forms[0].hint_tr` "Tamir için gereken bir alet derken **ein Werkzeug** denir.": Türkçe söz kalın parçadan uzun. Boşluktaki sözü veriyor, yanlış kural öğretmiyor (a2-10 `lx:nachher` notu gibi), GEÇTİ.
- `lx:Plastik.mistakes_tr[0]` doğru olarak **Plastiktüte** veriyor, `collocations[1]` "plastik bir poşet" için **eine Tüte aus Plastik** diyor. Not ayrı yazmayı anlatıyor, "bitişik" sözü bunu açık ediyor. İkisi de doğru biçim, GEÇTİ.
- `lx:ähnlich.mistakes_tr[0]` (**mit einem** yerine **wie ein**) iki söz değiştiriyor. **einem** → **ein** değişikliği düzeltmeden kaçınılmaz geliyor (a2-10 `lx:weitermachen` notu gibi), GEÇTİ.
- `lx:einfallen.forms[0].hint_tr` "Aklıma geldi derken **ist es mir eingefallen**", `mistakes_tr` içinde aynı söz **Es ist mir eingefallen**. Sıra farkı cümlenin başındaki **Jetzt**'ten geliyor, ipucu ekrandaki cümleyle örtüşüyor. GEÇTİ.
- `lx:verschlafen.forms[0].hint_tr` **ich hab verschlafen**, `forms[3].hint_tr` **Ich habe verschlafen**: **hab** kısa konuşma biçimi, A2 okur tanır. GEÇTİ.
- `lx:rund.mistakes_tr[0]` (**ein runder Tisch**) ile `forms[2].hint_tr` (**einen runden Tisch**, "masaya"): Türkçe sözler farklı, her ipucu kendi cümlesiyle örtüşüyor. GEÇTİ.
- `lx:Haustier.collocations[1]` "evcil hayvan besleyememek" (**kein Haustier haben dürfen**): gerçek anlam "izin yok". Türkçede "besleyemiyoruz" bu anlamı da taşıyor, GEÇTİ.
- `lx:Spaziergang.exp.ipucu_tr` ve `lx:missverstehen.exp.ipucu_tr` "Aynı şeyi … ile de söylersin": "aynı şey" kartın kendisi, tek okumada anlaşılıyor. GEÇTİ.

## Sayılar

- Toplam: 620
- GEÇTİ: 614
- GERİ: 6

GERİ kimlikleri: `lx:einatmen.forms[0].hint_tr`, `lx:ausatmen.forms[0].hint_tr`, `lx:ausatmen.forms[3].hint_tr`, `lx:beschreiben.exp.ne_zaman_tr`, `lx:ungefähr.mistakes_tr[0]`, `lx:Werkzeug.exp.ipucu_tr`

GERİ olduğu için batch-a2-11 "reviewed" sayılamaz (OD-9.4). Düzeltmeden sonra yalnız bu 6 alan (ve einatmen/ausatmen'e eklenecek açıklama satırı) yeniden okunur.

## Fark turu (2026-11-23): düzeltilen 6 alan

| kart.alan | yeni açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| `lx:einatmen.forms[0].hint_tr` | Doktor kısaca **langsam einatmen** de der, bu da yavaşça nefes alın demek. | Doktor uzun biçim yerine kısaca **langsam einatmen** de diyebilir, anlamı "yavaşça nefes alın". | GEÇTİ | Kısa komut biçimi artık açıkça söyleniyor. `exp.ipucu_tr` (**Atmen Sie ein**) ve `mistakes_tr[0]` ile çelişki kalmadı. 12 kelime, tek fikir. |
| `lx:ausatmen.forms[0].hint_tr` | Doktor kısaca **langsam ausatmen** de der, bu da yavaşça nefes verin demek. | Doktor kısaca **langsam ausatmen** de der, anlamı "yavaşça nefes verin". | GEÇTİ | `mistakes_tr[0]` (**Atmen Sie aus**) ile artık çelişmiyor, ikinci biçimin kısa söyleyiş olduğu belli. |
| `lx:ausatmen.forms[3].hint_tr` | Tekrar nefes verin derken doktor kısaca **wieder ausatmen** der. | "Tekrar nefes verin" için doktor kısaca **wieder ausatmen** der. | GEÇTİ | "Kısaca" sözü ikinci biçimi açıklıyor. Cümlenin `tr` alanıyla örtüşüyor. |
| `lx:beschreiben.exp.ne_zaman_tr` | Yol tarif ederken, ağrını anlatırken ya da kelimeyi bilmediğinde. | Üç ayrı durum: yolu tarif ederken, ağrımı anlatırken, kelimeyi bilmediğimde. | GEÇTİ | Sıra değişince yanlış bağlanma kalmadı. Tek okumada üç durum olarak okunuyor. |
| `lx:ungefähr.mistakes_tr[0]` | Saat yedi gibi derken **wie um sieben** yanlış. Doğrusu **ungefähr um sieben**. | "Saat yedi gibi" için **wie** değil **ungefähr** denir, **um** ikisinde de var. | GEÇTİ | Tek fark kaldı. `collocations[3]` ve `forms[2]` ile aynı Almanca, **um** sorusu çözüldü. |
| `lx:Werkzeug.exp.ipucu_tr` | Adını bilmediğin aleti **Das ist ein Werkzeug, das man zum Reparieren braucht** gibi anlatırsın. | Adını bilmediğim aleti "tamir için gereken bir alet" gibi bir cümleyle anlatırım. | GEÇTİ | Kalıp artık tam bir cümle, yarım kalmıyor. 14 kelime, sınırda geçer. |

### Fark turu sayıları

- Okunan satır: 6
- GEÇTİ: 6
- GERİ: 0

Not: `lx:ausatmen.forms[2].hint_tr` ("Yavaşça nefes ver derken **langsam ausatmen** denir.") değişmedi. `forms[0]` kısa biçimi açıkladığı için artık sorun değil.

Fark turunda GERİ kalmadı. Okur kapısı (OD-9.3) açısından batch-a2-11 "reviewed" olabilir (bütün turlar: 620 alan, açık GERİ yok).
