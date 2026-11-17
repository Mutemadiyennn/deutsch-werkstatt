# İnceleme: world (docs/v2/WORLD.md + content/v2/world/world.json)
İnceleyen: dilbilimci-ajan · 2026-11-17 · Sonuç: **KAPANDI** (`review.status = reviewed`)

Kapsam: karakterlerin Almanca ifadeleri, Bairisch kaynak doğrulaması, takvim tarihleri ve gelenek açıklamaları, kimlik/kişisel bilgi denetimi. İki dosya aynı içerikle birlikte düzeltildi.

## Sayılar
- İncelenen madde: **108** (48 karakter ifadesi, 12 hikâye içi Almanca cümle, 26 hafta + 4 yedek bölüm metni, 12 takvim satırı, 6 Bairisch/güney Almancası ifade)
- Düzeltme: **15** (1 ifade değiştirildi, 5 Bairisch notu kaynaklandı, 9 takvim/hikâye düzeltmesi) → oran **%13,9**
- Doğrulayıcı: `npm run content:validate` → 0 hata; `content/tools` testleri 9/9.

## 1. Karakter ifadeleri (48)
47 ifade doğru ve karaktere uygun; 1 ifade değiştirildi (Pichler, aşağıda). Notlar:
- „Praxis Dr. Weber, Huber, grüß Gott?“: soru işareti yükselen tonlamayı gösteriyor; incelenmiş `telefon/01-arzttermin` senaryosuyla birebir aynı, dokunulmadı.
- „Machen Sie sich mal frei.“, „Passt's Ihnen am Dienstag?“, „Bist du hier noch dran?“, „Ich bräuchte noch Ihren Pass.“, „Der Biomüll kommt da rein.“: gerçek kullanım, doğru.
- „Ich verstehe nur Bahnhof.“ (Ioana, A2): deyim; kursta öğrenilmiş şaka olarak karaktere uyuyor.
- Hikâye içi cümleler („Etwas langsamer, bitte“, „Habe ich Sie richtig verstanden?“, „Wir bleiben in Kontakt!“, „Am Anfang haben Sie nur genickt!“, „Und, wie läuft's bei euch?“ vb.) doğru.

## 2. Bairisch / güney Almancası ifadeler
| İfade | Sonuç | Kaynak |
|---|---|---|
| Grüß Gott | kaynaklı (Bavyera selamı) | https://www.thelocal.de/20190927/bavarian-words-you-need-to-survive-down-south-language-bayerisch-bairisch-german-munich |
| …, gell? | kaynaklı (soru sonunda, "oder?/ne?" karşılığı) | aynı (The Local) |
| Servus | kaynaklı (samimi selam ve veda); dünyada henüz ifade listesinde yok, §5 tablosuna eklendi | aynı (The Local) |
| Ja mei | kaynaklı ("Ausdruck des Seufzens, oder (je nach Betonung) der Gleichgültigkeit") | https://www.muenchenwiki.de/wiki/Bairisch-Lexikon_J · https://muenchen.mitvergnuegen.com/2016/21-bayrische-redensarten-die-du-als-muenchner-kennen-solltest/ |
| Passt scho | kaynaklı; yazım „passt scho“ (FES Bayern), ağız yazımı „Basst scho“ = onay (Abendzeitung) | https://www.fes.de/fes-in-bayern/angebote-ausstellungen/ausstellung-passt-scho · https://www.abendzeitung-muenchen.de/bayern/gepflegtes-bairisch-vor-allem-fuer-zuagroaste-art-859070 |
| Kommen S' rein | kaynaklı, ama **Alltag katmanı** (Bairisch değil): 'Sie' tek sese inip fiile eklenir. Kaynak mekanizmayı ve „Hams des gsehgn?“ örneğini veriyor; „Kommen S' rein“ cümlesinin kendisi kaynakta geçmiyor, güney Almancası gündelik biçimi olarak (alan SOURCES.md dosyalarıyla tutarlı) Alltag'da kaldı | https://gfds.de/wp-content/uploads/2020/09/20-09-02-Duzen-und-Siezen-Passauer-Neue-Presse.pdf |
| Des geht so ned | **değiştirildi → „Das geht so nicht.“** Tam cümle için güvenilir kaynak bulunamadı. Yalnızca sözcükler kaynaklı: 'des' ve 'ned' („Des is gor koa Problem ned!“). Kaynaklı sözcüklerden yeni lehçe cümlesi türetmek kural gereği yapılmadı | sözcük düzeyi: https://www.dialekte.schule.bayern.de/fileadmin/user_upload/dialekte/Aufgaben/Wie_Sie_Bairisch_sprechen.pdf |

Kaynaklar `world.json` içinde ilgili karakterlerin `bair_note` alanına (Brandl, Lechner, Pichler; yeni: Huber, Stadler) ve WORLD.md §5 tablosuna yazıldı.

Erişilemeyen kaynaklar: Wiktionary sayfaları (ned, des) bu oturumda açılamadı; yerine yukarıdaki kaynaklar kullanıldı.

## 3. Takvim
Tarihler hesapla ve kaynakla doğrulandı (Paskalya 28.3.2027; resmî tatiller: https://www.muenchen.de/aktuell/feiertage-bayern-2026-und-2027):
1. Advent 29.11.2026 ✓ · Unsinniger Donnerstag 4.2.2027 ✓ · Rosenmontag 8.2. ✓ · Faschingsdienstag 9.2. ✓ · Aschermittwoch 10.2. ✓ · Karfreitag 26.3. ✓ · Ostern 28.3. ✓ · Ostermontag 29.3. ✓ · Pfingsten 16.5.2027 ✓ · Heilige Drei Könige 6.1. Bavyera'da resmî tatil ✓. Tarih hatası yok.

Düzeltmeler (önce → sonra):
1. `cal:fasching.tr`: "Unsinniger Donnerstag'da birçok iş yerinde kostümlü gelinir" → "bazı iş yerlerinde ve okullarda"; resmî tatil olmadığı ve Aschermittwoch'ta bittiği eklendi. Kaynaksız genelleme yumuşatıldı; `when` alanına Aschermittwoch eklendi; kaynak eklendi.
2. Hafta 11 `title_tr`: "Fasching başlıyor" → "Fasching'in en hareketli günleri". Fasching Unsinniger Donnerstag'da başlamaz; o gün son ve en yoğun günlerin başıdır.
3. `cal:starkbier.tr`: "Bavyera'nın 'beşinci mevsimi'" → "Münih'te 'beşinci mevsim' diye anılır". Kaynak bunu Münih için söylüyor. Açılmayan birinci URL (munich.travel/pois/…) kaldırıldı.
4. `cal:maibaum`: fidye "bira ile" → "çoğunlukla bira ve Brotzeit ile"; "her yerde her yıl değil" ve "kurallar yöreye göre değişir" eklendi; 1.5.2027'nin cumartesi ve resmî tatil olduğu eklendi. Hafta 22 takvim notu buna uyduruldu.
5. `cal:dult`: "Aşağı Bavyera'da yılda bir-iki kez" → somut ve kaynaklı örnekler (Landshut Frühjahrsdult / Bartlmädult, Passau Maidult / Herbstdult); ikinci kaynak eklendi.
6. Hafta 23: "Mayıs Dult'u" → "İlkbahar Dult'u (Maidult)"; takvim "Mayıs" → "Nisan sonu – Mayıs" (bölüm haftası 26.4.2027; Passau Maidult 2026: 30.4.–10.5.).
7. Hafta 5 takvim: "Weihnachten (24.–26.12.)" → Heiligabend'in resmî tatil olmadığı, 25.–26.12.'nin tatil olduğu ayrıldı.
8. `cal:dreikoenig`, `cal:ostern`, `cal:advent`, `cal:silvester`: "takvim/genel" yerine kaynak URL'si; Silvester'e Bleigießen yasağı (2018) ve Wachsgießen kaynağı eklendi (hafta 6 metnini destekler). "Guten Rutsch" açıklaması "yeni yıla iyi kayış" → "yeni yıla iyi geçiş dileği".
9. Yeni satır `cal:pfingsten` (hafta 26 buna dayanıyordu ama takvimde yoktu); hafta 26 takvimine Pfingstmontag 17.5. resmî tatil notu.
- Ayrıca hafta 4 `title_tr`: "İş yerinin yılbaşı partisi" → "İş yerinin Noel kutlaması" (Weihnachtsfeier yılbaşı değil; hafta 6 Silvester ile karışıyordu).

Kaynaksız ama yumuşak bırakılanlar: `cal:weihnachtsmarkt` ("genelde"), `cal:weihnachtsfeier`, `cal:biergarten`, `cal:bundesliga` (genel kültür, tarih iddiası yok). Fasching'de Krapfen için açılabilir bir kaynak sayfası bulunamadı (yaygın bilinen gelenek; metinde iddia genel).

## 4. Kimlik ve kişisel bilgi
- Öğrenciye ad ya da cinsiyet verilmemiş: bütün metinlerde "sen"; Almanca hitaplarda yalnızca "Sie/du". `{name}` hikâye metinlerinde yok (test bunu da denetliyor).
- Kurs, kitap, kurum adı yok: dil kursu adsız ("adı geçmez"); şirket, salon, eczane, muayenehane kurgusal. Sınav tarihi ya da kurum adı yok.

## 5. Düzeltilmedi, baş geliştiriciye bulgular (hikâye kurgusu; dil hatası değil)
1. **Süreklilik:** Tobi 14. haftada başka şehre taşınıyor, ama 19. hafta (Die Werkstatt) ve 23. hafta (Die Dult) karakter listesinde yine var. Ziyaret olarak gerekçelendirilmeli ya da karakter değiştirilmeli.
2. **Olgusal:** 10. hafta "Ummelden": taşınmadan sonra adres bildirimi iki hafta içinde yapılmalıdır (Bundesmeldegesetz §17). Şehre 1. haftada gelen biri için 10. hafta geç; bölüm öne alınmalı ya da konu başka bir Bürgerbüro işine çevrilmeli. Bu oturumda kaynakla doğrulanmadı; değiştirmeden önce kaynak eklenmeli.
3. Yedek bölüm r4 (Bankkonto) karakteri `ch:schneider` (Bürgerbüro memuru); banka hattında onun olması tutarsız.
4. Pichler'in katman oranı Bairisch %50, ama kaynaklı Bairisch ifadesi yalnızca „Grüß Gott“. Senaryo yazılmadan önce ya oran düşürülmeli ya da kaynaklı ifade dağarcığı genişletilmeli (aynı durum Brandl %50 ve Stadler %30 için de geçerli).

## Kalan şüpheler
Yok (yukarıdaki bulgular dil/kaynak incelemesinin dışında, kurgu kararıdır).
