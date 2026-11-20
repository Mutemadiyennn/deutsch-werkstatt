# 3. gün halkaları: dilbilimci incelemesi (PM-078 B)

Dosya: `docs/v2/reviews/halka/gun-03-halkalar.json` · Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan (yazardan bağımsız, son metin bir kez, PM-057)

İncelenen: **79 madde** (50 görev cümlesi ve kabul listeleri, 16 sahne satırı, 5 soru, 8 kalıp).
Denetim (düzeltmelerden sonra): `halka_kontrol.py` → **0 hata, 0 not**; `kucuk_sozcuk.py` → **0 hata**. Yeni sözcük eklenmedi.

## Bulgular ve düzeltmeler

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | h3 `lx:zehn` görev cümlesi (de) | **Um zehn** özne olamaz; gösterilen cümlede tam biçim gerekir (1. gün bulgu 1, 2. gün bulgu 1–2 ile aynı). **es**'siz biçim kabul listesinde kaldı. | „Um zehn geht, Frau Huber.“ → „Um zehn geht es, Frau Huber.“ (kabul: + „Frau Huber, um zehn geht es.“, „Um zehn geht, Frau Huber.“) |
| 2 | h3 sahne, 1. satır | Mantık: Huber Hanım saat onu kendisi öneriyor, iki satır sonra onun olmadığını söylüyor. Öneriden çıkarıldı; onu artık öğrenci istiyor, Huber Hanım on biri öneriyor. Soru ve cevabı değişmedi. | „Morgen um acht? Oder um zehn?“ → „Morgen um acht?“ · tr „Yarın saat sekizde mi? Yoksa onda mı?“ → „Yarın saat sekizde mi?“ |
| 3 | h1 sahne sorusu | İki cevap savunulabiliyordu: yanlış duyulan rakam „iki“, ama Huber Hanım'ın duyduğu „üç“; „Üçü“ seçeneği de vardı. Soru daraltıldı. | „Huber Hanım hangi rakamı yanlış duydu?“ → „Senin söylediğin hangi rakamı Huber Hanım yanlış duydu?“ |
| 4 | h1 `lx:Nummer` kabul listesi, 3. öğe | **Und Ihre Nummer …?** „Ya sizin numaranız?“ demek; aynı dosyada **Und Ihre?** = „Ya sizinki?“ (h4). Türkçede („Numaranız ne Pichler Bey?“) bu anlam yok. | „Und Ihre Nummer, Herr Pichler?“ → „Ihre Nummer, Herr Pichler?“ |

Ağırlık: 1 dilbilgisi, 2 sahne mantığı, 3 sorunun tek cevabı, 4 kabul listesinde fazla anlam.

## Yazarın açık soruları: dil açısından görüş

- **„zwo“ (PM sorusu 1).** Gerçek ve bu gün için önemli: telefonda ve anonsta **zwei** ile **drei** karışmasın diye **zwo** denir; h1 sahnesindeki karışma tam bunun sebebi, günün sahnesi ve provası da buna dayanıyor. Dil açısından **zwo** ayrı bir sözcük değil, **zwei**'ın söyleniş biçimi: ayrı kart yerine `lx:zwei` kartının gösterilen biçimi olması doğru (sözlükte ipucu olarak zaten yazılı). Öğrenci için hedef önce **anlamak**: **zwo** karşı tarafın satırında gelsin (ör. Huber: „Zwo oder drei?“), öğrencinin **zwei** demesi her zaman doğru sayılsın, **zwo** yalnızca kabul listesinde olsun. **zwo** yalnız rakam okurken kullanılır: **zwo Wochen** denmez, o cümlelere eklenmemeli. Şu an betik reddediyor (`eslenemedi: zwo`), bu yüzden eklemedim.
- **„um …“ (PM sorusu 2).** 3. günde kalsın. **um acht**, **bis zwölf**, **von acht bis zwölf** konuşmada **Uhr**'suz en sık biçim; randevu telefonunda duyulan tam da bu. Tek kısıt: **Uhr**'suz biçim yalnızca tam saatlerde doğal; bu dosyada hep tam saat var. Türkçesi „saat …'de“ doğru; dosyada ilk geçişte „saat sekizde“, tekrarında „dokuzda“ deniyor, **um** her seferinde „-de/-da“ ile karşılanıyor, **um**'suz sayı (**Elf geht.**) eksiz kalıyor: ayrım tutarlı.
- **`wohnen` iki günde (PM sorusu 3).** Dil konusu değil. Yalnız bir not: kalıp „Ich wohne **in der** …“ yalnızca dişil sokak adlarıyla doğru (**-gasse, -straße**); **-weg** ve **-platz** ile **im/am** gelir. Dosyada yalnızca **Brunnengasse** var, hata yok; ileride başka adres gelirse kalıp genellenmemeli.
- **`sondern` h1'de yalnız kabul listesinde, h4'te kalıp.** Doğru sıra: öğrenci söylerse kabul edilir, öğretim h4'te.
- **„… habe ich …“** (2. günün sorusu) burada bir cümleyi etkiliyor (h4 „Ich habe vierzehn Tage Urlaub.“); görüş 2. gün raporunda.

## Bakılan, sorun bulunmayan noktalar

- **Telefon numaraları:** üçer rakam (**null eins eins**, **null eins zwei …**, **null eins acht**); gerçek abone numarası olamaz, acil numaralarla (110, 112) da çakışmıyor.
- **WORLD:** öğrenci Brunnengasse 7'de (h2 sahnesi, h4 cümlesi); Tobi Brunnengasse 17'de (gun-03 ile aynı); Bürgerbüro'da Schneider Hanım; Huber Hanım telefonda; Wimmer **Sie**, Ioana ve Tobi ön adla. Yeni olgu yok. Bairisch yok.
- **Sayım tutuyor:** pazartesi–perşembe dört gün, mayıs–eylül beş ay.
- **Sahne soruları:** beşi de tek cevaplı. h4 (`cikarim: true`) gerçekten çıkarım: metinde „on beş“ hiç geçmiyor, 14 ile 16 arasından bulunuyor; cevap tek („Bir numara: on beş“; seçenekteki açıklama 14'ün sayılıp sayılmayacağı kuşkusunu da kapatıyor).
- **OD-9:** aynı Türkçe iki Almancaya gitmiyor; **am** + gün olan her satırda „günü“ var. **Wie bitte?** = „Efendim?“ dosya boyunca tek karşılık.
- **Karışma çiftleri** (3/13, 6/16, 5/15, 8/18, 12/20) gerçek hayattaki çiftler; **Achtzehn – eins, acht** rakam rakam doğrulama da gerçekten yapılır.
- **Kimlik:** öğrencinin adı ve cinsiyeti hiçbir satırda yok.

## Kalan şüpheler (dil hatası değil)

1. **„Das neue Büro ist in Nummer achtzehn?“** (h5): doğru ve anlaşılır, ama oda için daha alışılmış olan **Zimmer achtzehn** ya da sınavdaki **hat die Nummer achtzehn**; ikisi de küme dışı biçim istiyor (**Zimmer**, **hat**). Kümeye girdiklerinde yenilenebilir.
2. **„Numaranız ne?“** (h1 kalıbı): doğru; telefonda „Numaranız kaç?“ da çok söylenir. Okur seçsin.
3. **„Bitte, ja.“** ve **„…, nicht?“** (kabul öğeleri): yanlış değil, seyrek; 1. günün onaylı dosyasındaki uygulamayla aynı olduğu için kaldı.
4. **„Zwanzig Tage Urlaub im Jahr?“**: soru olduğu için olgu iddiası taşımıyor; kaynak gerekmedi.

## Sonuç

Hata oranı: **4 bulgu / 79 madde ≈ %5,1** (dilbilgisi 1, sahne mantığı 1, soru 1, kabul listesi 1). Hepsi dosyada düzeltildi; iki betik 0 hata.

**KAPANDI** (dil açısından). **zwo** kararı (kart biçimi + betik) PM/lex'te; karar çıkınca h1 sahnesine bir satır eklenmesi yeterli. Dosyada `review` alanı yok (şema ANA'da). Sıradaki: okur (OD-9).

## Okur 1. tur sonrası

Kapsam: yalnızca değişen satırlar (yazarın tablosu). **22 madde**: 13 görev cümlesi ve kabul listeleri, 4 kalıp, 2 ortam, 1 sahne satırı, 2 yalnız kabul listesi değişen satır. Tarih: 2026-11-20.

**Bulgu: 1** (6 satırda aynı kök). Denetim (düzeltmeden sonra): `halka_kontrol.py` → 0 hata, 0 not; `kucuk_sozcuk.py` → 0 hata. Yeni sözcük eklenmedi.

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | „in Nummer …“ geçen altı görev cümlesinin kabul listesi | **in der Nummer …** doğru ve yaygın Almanca. Yazar bunu „dilbilimci notu“ diye çıkarmış; notum yalnızca sokak adlarının cinsiyeti içindi (**in der** her sokak adına gitmez), **Nummer** için değil. Öğrenci h2 kalıbından („Ich wohne in der …“) bu biçimi kurarsa doğru cevabı reddedilirdi. Gösterilen cümle ve kalıp **in Nummer …** olarak kaldı; **in der Nummer …** yalnızca kabul listesine eklendi. | h1/g10 + „Ist die Praxis in der Nummer drei?“ · h2/g4 + „Wohnen Sie in der Nummer vier?“ · h2/g6 + „In der Nummer fünf? Nein, in der Nummer sieben.“ · h2/g9 + „Ich wohne in der Nummer sieben.“ · h4/g9 + „Tobi wohnt in der Nummer siebzehn.“ · h5/g2 + „Das neue Büro ist in der Nummer achtzehn?“ |

Bakılan, sorun bulunmayanlar:

- **„ein Tag – vier Tage“** = „bir gün – dört gün“: doğru. Kalıp ayrıca **eins**'in adın önünde **ein** olduğunu sessizce gösteriyor; hiçbir görev cümlesi **ein Tag** istemiyor, çelişki yok. **Wochen** ve **Monate**'nin çıkarılması dil açısından yerinde (üç ayrı çoğul biçimi).
- **„Nummer drei – in Nummer drei“** = „üç numara – üç numarada“: doğru ve doğal; Türkçenin ters sırası ve „-da“nın karşılığı tek bakışta görünüyor. Kapı numarası için **in Nummer sieben** gündelik biçim.
- **„Ihre Nummer ist null zwei drei?“**: doğru; teyit sorusu Almancada tam böyle, düz cümle sırasıyla sorulur. **Ist Ihre Nummer …?** ve **Null zwei drei ist Ihre Nummer?** da doğru.
- **„Heute bis elf, Frau Huber?“**: doğru ve telefonda doğal. **Bis elf heute, …** konuşma sırası, yanlış değil.
- **„Die Praxis ist von acht bis zwölf offen, ja?“**, **„Zwei oder drei, Herr Pichler?“**, **„Ist die Praxis in Nummer drei?“**, **„Sechs Tage? Nein, vier Tage.“**, **„Wie bitte? Um zwölf?“**, **„Meine Nummer ist sechzehn. Wie ist Ihre Nummer?“**: doğru.
- **„Vierzehn Tage habe ich Urlaub.“** (kabul): doğru; süre başa alınınca **habe ich**.
- **„… in der Brunnengasse, in Nummer sieben / siebzehn“** (kabul): doğru.
- **Türkçe:** „(sokak adıyla)“ eki kalıbın sınırını doğru çiziyor. h3 sahnesinde „Saat sekizde olmuyor. Saat onda, lütfen.“ artık **um** ile eşleşiyor. Aynı Türkçe iki Almancaya gitmiyor.
- **Sahne soruları:** değişmedi; beşi de tek cevaplı.

**„Haben Sie …?“** (h5/g7): kalıbın 2. günden çıkması uygun; gerekçe 2. gün raporunda. Bu satırda üç kabul öğesi de doğru.

Kalan şüpheler (hata değil):

1. **h4/g8 „Wie ist Ihre Nummer?“** sıra numarası için anlaşılır; bekleme salonunda daha sık duyulan **Welche Nummer haben Sie?** küme dışı (**welche**).
2. Önceki rapordaki 1–4. şüpheler aynen duruyor. **zwo** kararı hâlâ PM/lex'te.

Hata oranı: **1 / 22 ≈ %4,5**. Düzeltildi. Sonuç: **KAPANDI** (dil açısından). Sıradaki: okur 2. tur.
