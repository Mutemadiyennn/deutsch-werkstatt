# lexicon-batch-011: dilbilimci incelemesi

- Tarih: 2026-11-18 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-011.view.jsonl` (yazar yaması uygulanmış) · Yama: `cm/work/batch-011.dil.json`
- İncelenen kart: **100** (her kartın bütün alanları, 400 örnek)
- Değişen kart: **32** · alan düzeyinde değişiklik: **37** (36 düzeltme, 1 ekleme)
- Hata oranı: **31/100 kart** (0,31). lx:Note hata değil, ekleme olarak değişti.
- Ağır hata 13 kartta: kusurlu ya da eksik cümle (lx:aufwachsen, lx:ausgeben, lx:Kilo), eksik Perfekt bilgisi (lx:schwimmen), kartın örnekleriyle çelişen kural (lx:regnen), dünya ile çelişki (lx:umziehen), öğrenci kimliği (lx:Verkäufer), yanıltıcı çip (lx:aussteigen, lx:ausfallen, lx:einkaufen, lx:vorschlagen, lx:aufräumen, lx:vorhaben).
- `lintpatch.ts`: kart 32, sorunlu 0.
- `check.ts` (yama uygulanmış kopya): kart 100, sorunlu 0.
- `content:validate`: depo dosyasına yazılmadı. Yama geçici bir kopyaya uygulandı: **0 hata**, 96 uyarı. Depodaki parti dosyası değişmedi.
- `review.status` `draft` kalır; yama uygulanıp depoda doğrulayıcı 0 hata verince BM `reviewed` yapar.

## Hatalar

### Almanca, anlam ve dünya

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:schwimmen | verb.aux | sein → haben/sein | Duden, spor ve eğlence anlamı: Perfekt **ist** ya da **hat**; örnek **er hat/ist früher viel geschwommen**. Şema bu değeri kabul ediyor (lx:ziehen ile aynı). `perfekt` **ist geschwommen** kaldı, güneyde olağan biçim bu. |
| lx:umziehen | ö4 | Wohnen Sie noch in der Brunnengasse? → … in der Bahnhofstraße? | WORLD §1-2: öğrenci Brunnengasse 7'de oturuyor ve şehre yeni geldi. Cevap **ich bin umgezogen** öğrenciyle çelişiyordu. |
| lx:Kilo | ö3 | ich hab schon wieder zwei Kilo mehr → schon wieder zwei Kilo mehr auf der Waage | İlk cümle eksik kalıyor, konuşmada böyle söylenmez. Türkçesi de güncellendi. |
| lx:Trinkgeld | ö2 | im Preis dabei → im Preis enthalten | Örnek `hd` katmanında; **dabei** gündelik kalıyordu. |
| lx:aussteigen | ö3 | Achtung, wir steigen gleich aus, ne? → Pass auf, wir steigen gleich aus, ja? | **ne** kuzey ağırlıklı (009 ve 010 kararı). **Achtung** arkadaşa söylenen cümlede sert duruyordu. |
| lx:Prüfung | ö3 | …, ne? → …, oder? | Aynı karar. |
| lx:inklusive | ö3 | …, ne? → …, oder? | Aynı karar. |
| lx:Jugend | ö3 | Die Jugend von heute, ne? → Die Jugend von heute! | Aynı karar. **oder?** burada oturmuyor, ünlem doğal. Türkçesi de güncellendi. |

### `mistakes_tr`

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:aufwachsen | Doğrusu **Ich bin im Dorf aufgewachsen** → **Ich bin in einem Dorf aufgewachsen** | **im Dorf** belli bir köyü gösterir. Köyde büyüdüm için doğru biçim bu; kartın ö3'ü de **auf dem Dorf**. Öğrenciye kusurlu cümle "doğru" diye veriliyordu. |
| lx:ausgeben | **Ich gebe Zeit aus** → **Ich verbringe Zeit** yerine: **Ich gebe dafür viel Zeit aus** → **Ich verbringe viel Zeit damit** | **Ich verbringe Zeit** tek başına eksik bir cümle. |
| lx:Verkäufer | **Ich bin ein Verkäufer** → **Ich bin Verkäufer** yerine: **Mein Bruder ist ein Verkäufer** doğal değil → **Mein Bruder ist Verkäufer** | Öğrencinin ağzından cinsiyetli kelime sabit yazılmıştı (D-061). **ein** dilbilgisi hatası değil, doğal değil. |
| lx:Teppich | Halının üstünde derken **in dem Teppich** → Çocuklar halıda oynuyor derken **Die Kinder spielen in dem Teppich** | **üstünde** diyen kişi **in** kurmaz. Hatanın kaynağı Türkçedeki **halıda**. |
| lx:Studium | Doğrusu **Ich mache ein Studium** → **Ich bin im Studium** | Tek başına doğal olan biçim; ö4 ile aynı kalıp. |
| lx:Feiertag | Yaz tatili: Doğrusu **Urlaub** → **Sommerurlaub** | Not yaz tatilinden söz ediyor, karşılığı tam olmalı. |

### `exp.parcalar`

Ölçüt (010 kararı): çip kelimenin kendi anlamını verir ve soldan sağa okunuş anlamı bozmaz. Doğru çip okunuşu bozuyorsa alan boş kalır.

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:aussteigen | steigen: adım atmak → steigen: çıkmak | lx:steigen kartı **çıkmak**. **dışarı çıkmak** doğru okunuyor. |
| lx:umziehen | ziehen: gitmek → ziehen: taşınmak | lx:ziehen kartı **çekmek, taşınmak**. |
| lx:ausfallen | aus: programdan → aus: dışarı | **aus** programdan demek değil. Partideki lx:ausgeben ve lx:aussteigen ile aynı çip. |
| lx:Supermarkt | Super: üstün, markt: pazar → Super: süper, markt: market | **pazar** gün adıyla karışıyor (okur dersi). lx:Markt kartında **market** var. |
| lx:einkaufen | ein: ev için, kaufen: satın almak → boş | **ein** ev için demek değil. Yazarın sorduğu çip yanıltıyordu. |
| lx:vorschlagen | vor: öne, schlagen: sürmek → boş | lx:schlagen kartı **vurmak**. **öne vurmak** okunuşu bozar. |
| lx:aufräumen | auf: tamamen, räumen: yerleştirmek → boş | İki çip de kelimenin kendi anlamı değil. |
| lx:vorhaben | vor: önünde, haben: bulundurmak → boş | lx:haben kartı **sahip olmak**. Doğru çip okunuşu bozar. |

**Değişmeyen:** lx:einpacken **ein: içine, packen: koymak** okunuşu doğru, yanıltmıyor. lx:Werkstatt **Werk: iş, statt: yeri** doğru okunuyor.

### Açıklama

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:regnen | ipucu | Başına **es** gelir → Yanına **es** gelir | ö1 **regnet es**, ö3 **regnet's**, ö4 **Regnet es noch?**. Kural kartın kendi örnekleriyle çelişiyordu. |
| lx:reservieren | ne_zaman | Lokantayı ve oteli ararken → Lokantaya ve otele telefon ederken | **ararken** iki türlü okunuyordu: telefon etmek ve yer aramak. |
| lx:empfehlen | anlam | iyi bulduğun bir şeyi söylemeyi anlatır → iyi bulduğun bir şeyi önermeyi söyler | Önceki cümle kelimenin anlamını vermiyordu. |
| lx:Tunnel | anlam | Dağın altından → Yerin altından | Tünel yalnız dağda olmaz. |
| lx:Chefin | anlam | işyerini → iş yerini | Yazım. |
| lx:Note | ipucu | yok → Almanya okullarında en iyi not 1, en kötü not 6 olur. | **Ekleme.** Yazarın önerisi kaynakla doğrulandı (aşağıda). Öğrenci için yanıltıcı olabilecek bir fark. |

### Türkçe ve görsel

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Sprache | coll | ana dil → ana dili | Doğru söz **ana dili**. |
| lx:inklusive | coll, ö2 tr | kalorifer dahil → ısınma dahil | Kirada dahil olan ısınma gideridir, kalorifer değil. |
| lx:Ausstellung | ö2 tr | pazara kadar → pazar gününe kadar | **pazar** alışveriş yeri gibi okunuyordu. |
| lx:Supermarkt | ö2 tr | saat yirmiye kadar → akşam sekize kadar | Türkçede konuşma biçimi. |
| lx:Ei | ö4 tr | Evet, memnuniyetle → Evet, isterim | **gern** burada **memnuniyetle** kadar resmî değil. |
| lx:Durst | ö4 tr | Evet, memnuniyetle → Evet, lütfen | Aynı gerekçe. |
| lx:Apfel | ö1 tr | yöreden geliyor → bu yöreden geliyor | Hangi yöre olduğu belirsizdi. |
| lx:Heimat | ö2 görsel | hometown street view → woman with suitcase at train station | Eski sorgu cümlenin sahnesini getirmiyordu. |

## Yazarın notları: doğrulama

| Not | Sonuç |
|---|---|
| lx:Note, 1 en iyi not | Doğrulandı, ipucuna eklendi. Eurydice: 1 **sehr gut**, 6 **ungenügend**. |
| geradeaus adv, inklusive prep, Geschwister çoğul | Doğru. |
| lx:abnehmen, telefonu açmak | Doğru. Örnek ve hata notu yerinde. |
| lx:schwimmen, aux yalnızca sein | Eksik. Duden spor anlamında iki biçimi de veriyor. Düzeltildi. |
| **Brezen** | Doğru. Duden: die Breze, çoğulu **Brezen**, bayrisch, österreichisch. |
| **Der Tobi**, **Der Luka** | Kaldı. Kart bu kullanım hakkında bilgi vermiyor, cümleler `alltag` katmanında. Bulunan kaynak Bavyera'yı ayrıca anmıyor, yalnız ad önündeki artikelin daha çok kuzey ağızlarında kullanılmadığını söylüyor. |
| Serbest çipler | Beşi de yukarıdaki tabloda kapandı: dördü boşaltıldı, lx:ausfallen düzeltildi. |

**Bilerek değiştirilmeyenler:** lx:scharf ö4 **Mit scharf?** dönercide gerçekten duyulur. lx:eröffnen ö3 **hat eröffnet** konuşmada yaygın. lx:Mantel hata notu, **mont** ve **manto** benzerliği yüzünden gerçek bir hata. lx:Chefin örnekleri öğrencinin şefi Herr Wimmer'den söz etmiyor; konuşan kişi belirli değil.

## SOURCES.md için önerilen satır

SOURCES.md dilbilimcinin yazma yolunda değil, BM ekler:

| Bilgi | Kartlar | Kaynak |
|---|---|---|
| Almanya okul notları: 1 en iyi (sehr gut), 6 en kötü (ungenügend) | lx:Note | Eurydice, Almanya, ortaöğretim I değerlendirmesi: https://eurydice.eacea.ec.europa.eu/de/national-education-systems/germany/leistungsbeurteilung-der-allgemeinbildenden-sekundarstufe-i |

## Doğrulamada açılan diğer kaynaklar

- schwimmen, Perfekt: https://www.duden.de/rechtschreibung/schwimmen
- Breze, çoğul ve bölge: https://www.duden.de/rechtschreibung/Breze
- ana dili yazımı: https://www.haberturk.com/tdk-nasil-yazilir/ana-dili-kelimesi-dogru-yazilisi
- Ad önünde artikel: https://www.redalyc.org/journal/6645/664572092008/664572092008.pdf

## Kalan şüpheler

Dil açısından açık kart yok.

BM için iki iş kalıyor: yamayı uygulamak ve lx:Note için yukarıdaki SOURCES satırını eklemek.

## Sonuç

**KAPANDI.** Bulunan bütün hatalar yamada düzeltildi. `reviewed` işareti yama depoya uygulanıp `content:validate` 0 hata verdikten sonra konur.
