# lexicon-batch-009: dilbilimci incelemesi

- Tarih: 2026-11-18 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-009.view.jsonl` (R0 kartları, yazar yaması uygulanmış) · Yama: `cm/work/batch-009.dil.json`
- İncelenen kart: **65** (her kartın bütün alanları, 265 örnek)
- Düzeltilen kart: **28** · alan düzeyinde düzeltme: **41**
- Hata oranı: **28/65 kart** (0,43). Ağır hata (yanlış ya da çelişkili Almanca, yanıltıcı çip, kimlik, kaynağı aşan olgu, kaynaksız kullanım notu) 8 kartta. Kalanı `mistakes_tr` kuralı, Türkçe doğallık ve tutarlılık.
- `lintpatch.ts`: kart 28, sorunlu 0. Yamadaki bütün kart ve örnek kimlikleri görünümle karşılaştırıldı, bilinmeyen kimlik yok.
- `npm run content:validate` çalıştırılmadı: parti dosyasına yazma yetkisi verilmedi, yama uygulanmadı. Yamadan sonra BM çalıştırmalı (`check.ts 009` ile birlikte).

## Hatalar

### Almanca, kimlik ve olgu

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:einundzwanzig | ö3 | Machen Sie einundzwanzig, stimmt so! → Machen Sie einundzwanzig, bitte. | İki bahşiş kalıbı birbirini dışlar. **Machen Sie einundzwanzig** para üstü bekler, **stimmt so** üstü kalsın demektir. |
| lx:buchstabieren | ö3 | Ich buchstabiere: K, A, Y, A. → Frau Kaya buchstabiert ihren Namen: K, A, Y, A. | Öğrencinin **ich** cümlesinde sabit ad (D-061). Yer tutucu harf harf yazılamadığı için cümle üçüncü kişiye çevrildi. **ich buchstabiere** kalıbı ö5'te duruyor. |
| lx:Dezember | ö3 | …, ne? → …, oder? | **ne** kuzey ağırlıklı soru eki. Dünya Bavyera'da geçiyor; **oder** her yerde söylenir. |
| lx:fünfzig | ö3 | …, ne? → …, oder? | Aynı gerekçe. |
| lx:Telefonnummer | exp.ipucu | çoğu kişi **zwo** der → bazen **zwo** denir | Kaynak "sometimes used" diyor; "çoğu kişi" kaynağı aşıyordu. |
| lx:Viertel | exp.ipucu | Güneyde **viertel zehn** → Bazı bölgelerde **viertel zehn** | Duden yalnızca "landschaftlich" diyor. `temel/SOURCES.md` bölgeyi güney ve doğu olarak veriyor; yalnızca "güney" kaynakla örtüşmüyor. |
| lx:Vorname | mistakes, coll | Formda **Name** yazıyorsa soyadını yaz → **Ich buchstabiere meinen Vorname** yanlış · Name und Vorname (soyad ve ad) → Vor- und Nachname | Yazarın kaynaksız notu. Kaynak aradım, bulamadım; iddia iki yerden de çıkarıldı. Ayrıca hata değil kullanım notuydu (PM kuralı). |
| lx:wie_viel | exp.parcalar | wie: nasıl, viel: çok → boş | Soldan sağa "nasıl çok" okunuyor, anlamı bozuyor. R0-05 ve R0-07 aynı ifadede çip kullanmıyor. |

### `exp.parcalar` (soldan sağa okuma)

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Nachmittag | Nach: sonra → Nach: -den sonra | "sonra öğle" ters okunuyordu; ek, bağı gösteriyor. |
| lx:Vormittag | Vor: önce → Vor: -den önce | Aynı. |
| lx:Nachname | Nach: sonra → Nach: sonraki | "sonraki ad" doğru okunur. |
| lx:Wochenende | Woche + Ende → Wochen + ende | Çipler kelimeyi vermeli; R0-01 ile aynı bölme. |

Değişmeyenler: **Mitt + woch** (orta, hafta) R0-01 ile aynı. **drei + zehn** ve **ein + und + zwanzig** ters sırayı bilerek gösteriyor, R0-03 ve R0-04 ile aynı.

### `mistakes_tr` (gerçek hata olmalı)

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Sommer | Bu yaz için **dieser Sommer** yanlış → **Dieser Sommer bleiben wir hier** yanlış | **dieser Sommer** tek başına yanlış değil (**Dieser Sommer ist heiß**). Hata cümle içinde gösterildi. |
| lx:Herbst | Geçen sonbahar için **letzter Herbst** yanlış → **Letzter Herbst war ich krank** yanlış | Aynı. |
| lx:Mittag | **um Mittag** yanlış → **im Mittag** yanlış. Doğrusu **am Mittag** ya da **mittags** | **um Mittag** kullanılıyor, yanlış denemez. |
| lx:vierzig | **Ich habe vierzig Jahre** → **Ich bin vierzig Jahre** yarım kalır | İlki Türkçeden gelmez (Türkçede "kırk yılım var" denmez). Türkçe konuşan "kırk yaşındayım" kalıbından **alt** kelimesini unutur. |
| lx:erster | **ein Mai** → **am eins Mai** | Türkçe "bir mayısta" kalıbından çıkan gerçek biçim bu. |
| lx:Juli | **Julı** yanlış yazım → Temmuz için **Juni** deme | Noktasız ı yazımı gerçek bir Almanca hatası değil. Asıl hata iki ayı karıştırmak. |
| lx:Juni | **Juni** ile **Juli** karışır → **Cuni** diye okuma, **J** burada **y** gibi | Karışıklık ipucuna taşındı (aşağıda). Yenisi gerçek bir okuma hatası. |
| lx:Dezember | **Desember** → **December** | **z** sesi ts olduğu için s ile yazma beklenmez; gerçek hata c ile yazmak. |
| lx:Dienstag, lx:vierzehn, lx:neunzehn, lx:achtzig | "X on dört, Y kırk. Sonunu net söyle." → "On dört için **vierzig** deme. **vierzig** kırk demektir." (dört kartta aynı kalıp) | Anlam notu biçimindeydi. Yanlış kelimeyi söyleme hatası olarak yazıldı. |

### Türkçe, OD-9 ve tutarlılık

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Juni | exp.ipucu | **der sechste Sechste** → Telefonda **Juli** ile karışmasın diye **Juno** diyenler olur | Yazarın isteği. Kaynak bulundu: Duden, Juni maddesi, "(verdeutlichende Sprechform) Juno". |
| lx:Februar | exp.ipucu | Türkçedeki gibi düz sayı olmaz → İki şubat derken **zwei** değil **zweite** dersin | "Düz sayı" anlaşılmıyordu. |
| lx:vierzehn | exp | ne_zaman: İki hafta demek için de kullanılır → ipucu: **vierzehn Tage** çoğu zaman iki hafta demektir | Bu bir "ne zaman, kime" bilgisi değil. |
| lx:neunzehn | exp.ipucu | Eski yıllar → Bin dokuz yüzlü yıllar | Belirsizdi. |
| lx:Uhrzeit | tr, exp.anlam | saat, vakit → saat · Günün belli bir anını söyler → Bir şeyin saat kaçta olduğunu söyler | **vakit** kelimenin karşılığı değil (**Zeit**). |
| lx:Nachname | tr, coll | soyadı, soyad → soyadı · ad ve soyad → ad ve soyadı | Aynı anlam iki kez. |
| lx:erster | tr | birinci, ayın biri → birinci, ilk, ayın biri | ö2 ve ö3 **ilk** anlamında. |
| lx:möchten | tr, coll | istemek, arzu etmek → istemek · Ich möchte gern (yarım) → Ich möchte gern einen Kaffee. | lx:mögen#2 ile aynı karşılık. Yarım eşdizim tamamlandı. |
| lx:dritter | ö3 tr | Bugün bu üçüncü kahvem bile. → Bugün bu üçüncü kahvem oldu bile. | Bozuk cümle. |
| lx:Dezember | ö2 tr | yıl sonu kutlaması → Noel kutlaması | **Weihnachtsfeier**; WORLD hafta 4 ile aynı. |
| lx:übermorgen | ö1 tr | doktordan randevum var → doktorda randevum var | Yanlış ek. |
| lx:Februar | ö3 tr | bir kayak yapmak istiyorum → bir ara kayağa gitmek istiyorum | Doğal değildi. |
| lx:buchstabieren | ö1 görsel | woman spelling name on phone at desk → person on phone writing down name | Cinsiyetsiz ve sahneye daha yakın. |

## Yazarın notlarının doğrulanması

- **Ay çoğulları:** Duden'de açıldı. Januare, Februare, Märze, Aprile, Maie, Junis, Julis, Auguste doğru; hepsi "Plural selten". Mittwoche de doğru. Değer değişmedi. Öneri: arayüz ay kartlarında çoğulu göstermeyebilir (kullanılmıyor), karar BM'de.
- **Büyük harf:** **am Ersten des Monats**, **Der Vierte**, **am Fünfzehnten**, **Der Wievielte** doğru (isimleşmiş sıra sayısı). R0-06 tablosundaki **der erste** sıfatın sözlük biçimi, aynı dersin **Am zwölften Ersten** cevabı da büyük harfli. Çelişki yok.
- **lx:August vurgusu:** Duden [aʊ̯ˈɡʊst], vurgu ikinci hecede. Doğru, kartta kaldı. Kaynak satırı aşağıda.
- **lx:Vorname form notu:** kaynak bulunamadı, çıkarıldı (yukarıda).
- **Juno, Julei:** **Juno** Duden'de doğrulandı ve lx:Juni ipucuna girdi. **Julei** Duden'de madde başı olarak var, ama tanımı açılamadı; karta konmadı.
- **lx:buchstabieren A1:** uygun; R0-10 dersinin çekirdek kelimesi.
- **lx:möchten ve lx:mögen#2:** içerik artık çelişmiyor (aynı `tr`, aynı fiil tablosu, aynı ipucu fikri). Ama iki kart aynı kelimeyi (`de: möchten`) taşıyor. Aşağıda açık madde.

## SOURCES.md bağlantıları (yeni 6 satır)

| Satır | Sonuç |
|---|---|
| **zwo** (en.wiktionary.com/wiki/zwo) | Açıldı. "sometimes used … especially over the telephone and in military parlance". Kart buna göre yumuşatıldı. |
| Kurgusal numaralar (Bundesnetzagentur, Drama Numbers) | Açıldı. (0)89 99998 000–999 ve (0)171 39200 00–99. Üç numara da aralıkta. |
| **K wie Köln** (en.wikipedia.org/wiki/DIN_5009) | Bu oturumdan açılamadı (erişim kısıtı). Aynı tablo wikiwand.com/en/DIN_5009 üzerinden açıldı: 1983 Kaufmann, 2022 Köln. Doğru. |
| **viertel zehn** (duden.de/rechtschreibung/viertel) | Açıldı. "(landschaftlich) … um viertel acht (um Viertel nach sieben)". Satırdaki "bölgesel" doğru; karttaki "güneyde" düzeltildi. |
| 6 Ocak ve 1 Mayıs (muenchen.de, Feiertage Bayern 2026 und 2027) | Açıldı. İki gün de listede. |
| Maibaum, Dult, Weihnachtsmarkt, Fasching (`WORLD.md` §6) | Bağlantı yok, depo içi gönderme. `cal:maibaum`, `cal:dult`, `cal:weihnachtsmarkt`, `cal:fasching` kayıtları kartlarla örtüşüyor. |

BM için önerilen ek satırlar (SOURCES.md dilbilimcinin yazma yolunda değil):

| Bilgi | Kartlar | Kaynak |
|---|---|---|
| **Juno**, **Juni** kelimesinin karışmasın diye söylenen biçimi | lx:Juni | Duden, Juni maddesi, eş anlamlılar: https://www.duden.de/rechtschreibung/Juni |
| **August** vurgusu ikinci hecede | lx:August | Duden: https://www.duden.de/rechtschreibung/August_Monat |
| Ay adlarının çoğulları (seyrek) | ay kartları | Duden, ilgili maddeler (ör. https://www.duden.de/rechtschreibung/Januar) |

## Kalan şüpheler

1. **Çift kart (BM kararı):** lx:möchten (009) ve lx:mögen#2 (002) aynı baş biçimi taşıyor. Öğrenci aynı kelimeyi iki kart olarak görür. Biri kaldırılmalı ya da birleştirilmeli; kimlik ve bağlantı etkisi olduğu için yamaya konmadı.
2. **lx:Juni ipucu, SOURCES satırı:** **Juno** bilgisi kaynaklı ama satır henüz SOURCES.md'de yok. Satır eklenene kadar olgu kuralı biçimsel olarak açık.
3. **lx:Nachname ö5** (**Aksoy, mit K und Y**): konuşan belirsiz, öğrenci satırı sayılmadı. Kalıcı karakterin soyadı olduğu için bırakıldı.
4. **lx:hundert hata maddesi** (**ein hundert**): yazım hatası olarak gerçek, ama Türkçeye özgü değil. Daha iyisi bulunamadı, bırakıldı.

## Sonuç

**AÇIK.** Dil hataları yamada kapandı. Açık kalan: 1 (çift kart, lx:möchten) ve 2 (lx:Juni için SOURCES satırı). İkisi de BM işi; kapanınca parti `reviewed` olabilir. Yama uygulanana ve `content:validate` 0 hata verene kadar `review.status` `draft` kalmalı.
