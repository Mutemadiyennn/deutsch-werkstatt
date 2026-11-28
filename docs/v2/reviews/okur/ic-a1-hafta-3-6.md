# Okur kontrolü: [İÇ-A1] 3.–6. hafta, kendini tanıtma eklemeleri (OD-9.3, PM-148)

Girdi: `git diff origin/main -- content/v2/m1/`, çalışma ağacı `wt-b`. Dosyalar: gun-16, 19, 22, 27, 31, 32, 33, 39, 40 ve hafta-sonu-testi-03…06.
Okuyan: Türkçe konuşan, Almancası A2, dilbilgisi terimi bilmeyen öğrenci. Akşam, telefondan, ilk kez okuyor.

Ölçü: OD-9.2. Bir alan bir fikir, cümle ≤ 14 kelime. `=`, `;`, `…` ve tırnak içinde Almanca yok. Öğretilmemiş terim yok. Açıklama ekrandaki ifadeyi anlatır.
Önceki turların düzeni: kalın Almanca sembol sayılmaz. Kalın Almancanın içindeki ve kalıp yuvasındaki `…` boşluk işaretidir, kabul edilir. Sözcük sayımında kalın Almanca sayılır, `…` sayılmaz.
Yuvalar ({meslek}, {hobi}, {aile}, {ulke}, {name}) öğrencinin kendi bilgisiyle dolu, Türkçede eksiz okundu. Boşsa "(mesleğin)" gibi görünür.

Görünürlük: `web/src/screens/Prova.tsx` incelendi. Provada uygun olmayan seçeneğin `tr` satırı ("… (yanlış)") öğrenciye hiç gösterilmiyor. Hazırlık listesi ve "Ne diyeyim?" ipucu yalnız uygun seçeneklerin Türkçesini gösteriyor. Bu yüzden 5 "(yanlış)" satırı sayılmadı. Onların geri bildirimleri görünür, okundu.

## Satırlar

| # | öğe kimliği | alan | açıklama | kendi sözlerimle | karar | neden |
|---|---|---|---|---|---|---|
| 1 | gun-16 · kalıp "Was arbeiten Sie? – Ich arbeite als … – Ich bin …" | `tr` | Ne iş yapıyorsunuz? – … olarak çalışıyorum – Mesleğim … | Birine işini sorarım. Cevapta "şu olarak çalışıyorum" ya da "mesleğim şu" derim. | GEÇTİ | Kalıp yuvası. Üç parça Almancayla birebir eşleşiyor. |
| 2 | gun-16 · görev `lx:Name` | `tr` | Adım {name}. {meslek} olarak çalışıyorum. | Adımı ve ne iş yaptığımı söylüyorum. | GEÇTİ | Kısa, açık. |
| 3 | gun-16 · `prova.durum_tr` | `durum_tr` | Huber Hanım adının ve adresinin yazılışını soruyor. Onu geri arıyorsun. Adresin Brunnengasse 7. Sonunda mesleğini de soruyor. | Huber Hanım'ı arıyorum. Adımın ve adresimin nasıl yazıldığını soruyor, en sonda da işimi soruyor. | GEÇTİ | Yeni cümle 4 kelime, açık. Eski kısımda "adının" ilk an Huber Hanım'ın adı gibi okunabiliyor, "Adresin" gelince çözülüyor (değişmemiş kısım). |
| 4 | gun-16 · n8 | `tr` | Tamam. Peki ne iş yapıyorsunuz? | Ne iş yaptığımı soruyor. | GEÇTİ | |
| 5 | gun-16 · n8 · seçenek 1 | `tr` | {meslek} olarak çalışıyorum. | İşimi söylüyorum. | GEÇTİ | |
| 6 | gun-16 · n8 · seçenek 1 | `geri_bildirim_tr` | Doğru. Mesleğini **als** ile söyledin. | İşimi **als** kelimesiyle söyledim, doğru. | GEÇTİ | |
| 7 | gun-16 · n8 · seçenek 2 | `tr` | Mesleğim {meslek}. | İşim şu. | GEÇTİ | |
| 8 | gun-16 · n8 · seçenek 2 | `geri_bildirim_tr` | Kısa ve doğru. **Ich bin** ve hemen arkasından meslek. | **Ich bin** dedim, sonra hemen işimi. Kısa ve doğru. | GEÇTİ | "hemen arkasından" araya başka söz girmediğini sezdiriyor. |
| 9 | gun-16 · n8 · seçenek 3 | `geri_bildirim_tr` | Meslekten önce **ein** gelmez. **Ich bin …** ya da **Ich arbeite als …** de. | İşimi söylerken **ein** koymam. Böyle derim. | GEÇTİ | İki kısa cümle (5 ve 7 kelime). Yanlışın nedeni ve doğrusu aynı fikir. |
| 10 | gun-19 · kalıp "Was arbeitest du? – Ich arbeite als …" | `tr` | Ne iş yapıyorsun? – … olarak çalışıyorum | Arkadaşa işini sorarım, ben de "şu olarak çalışıyorum" derim. | GEÇTİ | Kalıp yuvası. |
| 11 | gun-19 · `prova.durum_tr` | `durum_tr` | Kurs bitti. Ioana ile istasyonun önündesiniz. Ioana kimin nereye gittiğini, kimin hangi dili konuştuğunu soruyor. Sonra pratik için ne iş yaptığını soruyor. | Kurstan sonra Ioana'yla duraktayım. Kim nereye gidiyor, kim hangi dili konuşuyor diye soruyor. Sonra alıştırma olsun diye işimi soruyor. | GEÇTİ | Yeni cümle 7 kelime. "pratik için" kısa ama anlaşılıyor. |
| 12 | gun-19 · n7 | `tr` | İyi! O zaman biraz daha pratik yapalım. Ne iş yapıyorsun? | Biraz daha alıştırma yapalım, işin ne diyor. | GEÇTİ | |
| 13 | gun-19 · n7 · seçenek 1 | `tr` | Mesleğim {meslek}. | İşim şu. | GEÇTİ | |
| 14 | gun-19 · n7 · seçenek 1 | `geri_bildirim_tr` | Güzel. Meslekten önce **ein** koymadın. | İşimi söylerken **ein** demedim, iyi. | GEÇTİ | 16. günde öğretilen kurala dayanıyor. |
| 15 | gun-19 · n7 · seçenek 2 | `tr` | {meslek} olarak çalışıyorum. | İşimi söylüyorum. | GEÇTİ | |
| 16 | gun-19 · n7 · seçenek 2 | `geri_bildirim_tr` | Doğru. **ich** ile **arbeite**, sonra **als** ve mesleğin. | **ich arbeite** dedim, sonra **als** ve işim. Doğru. | GEÇTİ | Biraz telgraf gibi ama tek okumada çözüldü. |
| 17 | gun-19 · n7 · seçenek 3 | `geri_bildirim_tr` | **ich** ile **arbeite** dersin. **arbeitest** yalnızca **du** için. | Kendim için **arbeite** derim, **arbeitest** karşımdaki için. | GEÇTİ | |
| 18 | gun-22 · kalıp "Viele Grüße, …" | `tr` | Selamlar, … (notun ya da mesajın sonunda) | Not ya da mesajın sonuna "selamlar" yazıp adımı koyarım. | GEÇTİ | Ne zaman kullanılacağı parantezde, terim yok. |
| 19 | gun-22 · `yazma.gorev_tr` | `gorev_tr` | Ioana'ya kısa bir not yaz. Ehliyet dolapta, davetiye fincanın yanında, haplar ceketin içinde. **er** ve **sie** kullan. Sonunda **Viele Grüße** ve adını yaz. | Ioana'ya not bırakacağım: üç eşya nerede. **er**, **sie** kullanacağım. Sona **Viele Grüße** ve adımı yazacağım. | GEÇTİ | Yeni cümle 6 kelime. |
| 20 | gun-22 · `kontrol_tr[0]` | `kontrol_tr` | Ehliyet için **er**, davetiye için **sie** yazdın mı? | Ehliyete **er**, davetiyeye **sie** dedim mi? | GEÇTİ | İki eski madde birleşti, yine tek soru. |
| 21 | gun-22 · `kontrol_tr[1]` | `kontrol_tr` | Üç eşyanın da yerini yazdın mı? | Üç eşyanın yerini yazdım mı? | GEÇTİ | |
| 22 | gun-22 · `kontrol_tr[2]` | `kontrol_tr` | Notu **Viele Grüße** ve adınla bitirdin mi? | Sonda **Viele Grüße** ve adım var mı? | GEÇTİ | |
| 23 | gun-27 · kalıp "Liebe …, – Lieber …, – Viele Grüße, …" | `tr` | Sevgili … (kadına) – Sevgili … (erkeğe) – Selamlar, … | Kadına **Liebe**, erkeğe **Lieber** diye başlarım, **Viele Grüße** ile bitiririm. | GEÇTİ | Kadın/erkek farkı parantezle, terimsiz. Hangi Almanca kelimenin hangisi olduğu sıradan belli. |
| 24 | gun-27 · `yazma.gorev_tr` | `gorev_tr` | Derya'ya cevap yaz. **Liebe Derya,** ile başla, **Viele Grüße** ve adınla bitir. Evin Brunnengasse 7'de, istasyona uzak değil, süpermarketin arkasında. Sen ikinci kattasın. | Derya'ya yazacağım. **Liebe Derya,** ile başlayıp **Viele Grüße** ve adımla bitireceğim. Arada evimin yerini ve katımı anlatacağım. | GEÇTİ | Yeni cümle 9 kelime. Kalın içindeki virgül bir an "ile başla," virgülüyle yan yana geliyor, okumayı bozmadı. |
| 25 | gun-27 · `kontrol_tr[0]` | `kontrol_tr` | **Liebe Derya,** ile başlayıp **Viele Grüße** ve adınla bitirdin mi? | Başı ve sonu doğru mu? | GEÇTİ | Başlangıç ve bitiş tek soru: mektubun çerçevesi. 9 kelime. |
| 26 | gun-27 · `kontrol_tr[1]` | `kontrol_tr` | Sokağı, numarayı ve katı (**im zweiten Stock**) yazdın mı? | Sokak, numara, kat var mı? | GEÇTİ | |
| 27 | gun-31 · n4 · seçenek 1 | `tr` | Mesleğim {meslek}. | Gerçek işimi söylüyorum. | GEÇTİ | |
| 28 | gun-31 · n4 · seçenek 1 | `geri_bildirim_tr` | Güzel. **Ich bin … von Beruf** ile gerçek mesleğini söyledin. | Oyundaki değil, kendi işimi bu kalıpla söyledim. | GEÇTİ | |
| 29 | gun-31 · n4 · seçenek 2 | `tr` | {meslek} olarak çalışıyorum, Tobi ve Derya'yla. | Şu işte çalışıyorum, Tobi ve Derya'yla birlikte. | GEÇTİ | Not (karar değil): gerçek meslek ile hikâyedeki iş arkadaşları yan yana. Öğrencinin işi firmada değilse cümle biraz garip kaçabilir; anlamı yine açık. |
| 30 | gun-31 · n4 · seçenek 2 | `geri_bildirim_tr` | Doğru. **als** ile mesleğini, **mit** ile kimlerle çalıştığını söyledin. | **als** ile işimi, **mit** ile kiminle çalıştığımı söyledim. | GEÇTİ | Söylediğim cümleyi anlatıyor, tek fikir. |
| 31 | gun-31 · n4 · seçenek 3 | `geri_bildirim_tr` | Cümle eksik kaldı. Mesleğin araya gelir: **Ich bin … von Beruf.** | İşimi söylemeyi unuttum. İş **Ich bin** ile **von Beruf** arasına girer. | GEÇTİ | "araya" kalın örnekteki boşlukla hemen anlaşılıyor. |
| 32 | gun-32 · kalıp denn | `tr` | Daha çok … içerim, çünkü … – Burada yemeyi severim, çünkü … | **denn** "çünkü" demek. Bir şeyi söyleyip nedenini arkasından eklerim. | GEÇTİ | Terimsiz. **denn** ile "çünkü" aynı yerde, eşleşme tek okumada görülüyor. |
| 33 | gun-32 · görev `lx:nett` | `tr` | Burada yemeyi severim, çünkü iş arkadaşları iyi. | Burada yemek hoşuma gidiyor, çünkü iş arkadaşları iyi insanlar. | GEÇTİ | |
| 34 | gun-32 · görev `lx:egal` | `tr` | Bana fark etmez, çünkü her şeyi severek yerim. | Ne olsa olur, her şeyi severim. | GEÇTİ | |
| 35 | gun-32 · `prova.durum_tr` | `durum_tr` | Öğle arası. Tobi tepsisiyle yanına oturuyor ve ne sevdiğini soruyor. Sonunda hobini de soruyor. | Tobi yanıma oturuyor, neyi sevdiğimi, sonra da hobimi soruyor. | GEÇTİ | |
| 36 | gun-32 · n5 | `tr` | Rica ederim! Baksana: Ne yapmayı seversin? Bir hobin var mı? | Neyi yapmayı sevdiğimi, hobim olup olmadığını soruyor. | GEÇTİ | |
| 37 | gun-32 · n5 · seçenek 1 | `tr` | Evet! Hobim {hobi}. | Hobimi söylüyorum. | GEÇTİ | |
| 38 | gun-32 · n5 · seçenek 1 | `geri_bildirim_tr` | Güzel. **Mein Hobby ist …** ile hobini söyledin. | Hobimi bu kalıpla söyledim. | GEÇTİ | |
| 39 | gun-32 · n5 · seçenek 2 | `tr` | Hobim mi? {hobi}! Ya sen, Tobi? | Hobimi söyleyip Tobi'ye de soruyorum. | GEÇTİ | |
| 40 | gun-32 · n5 · seçenek 2 | `geri_bildirim_tr` | Çok iyi. Cevap verdin ve soruyu Tobi'ye geri sordun. | Hem cevap verdim hem Tobi'ye sordum. | GEÇTİ | |
| 41 | gun-32 · n5 · seçenek 3 | `geri_bildirim_tr` | **Ich bin** ile mesleğini söylersin. Hobi için **Mein Hobby ist …** dersin. | **Ich bin** işim içindir. Hobi için **Mein Hobby ist** derim. | GEÇTİ | İki kısa cümle, tek karşılaştırma. |
| 42 | gun-32 · n6 | `tr` | Gerçekten mi? Güzel! Benim hobim futbol. Birazdan görüşürüz! | Tobi'nin hobisi futbol, sonra vedalaşıyor. | GEÇTİ | |
| 43 | gun-32 · `prova.kapanis_tr` | `kapanis_tr` | Neyi sevdiğini, neyi daha çok sevdiğini söyledin, teşekkür ettin ve hobini anlattın. | Bu konuşmada neler yaptığımın özeti. | GEÇTİ | 12 kelime. |
| 44 | gun-33 · kalıp "Aus welchem Land kommst du? – Ich komme aus …" | `tr` | Hangi ülkedensin? – …'den geliyorum. | Birine hangi ülkeden geldiğini sorarım, ben de nereden geldiğimi söylerim. | GEÇTİ | Kalıp yuvası, ek yazımı tek okumada anlaşılıyor. |
| 45 | gun-33 · görev `lx:Land` | `tr` | Memleketim: {ulke}. Ya sen hangi ülkedensin? | Nereli olduğumu söyleyip karşımdakine soruyorum. | GEÇTİ | Not: yuva ülkenin Almanca hâliyle dolarsa ("der Türkei", dilbilimci raporu §Kalan şüpheler) Türkçe satırda "Memleketim: der Türkei." görünür. Yuvanın dolma biçimine bağlı, içerik sorunu değil. |
| 46 | gun-39 · kalıp "Sind Sie verheiratet oder ledig? – …" | `tr` | Evli misiniz, bekâr mı? – Evliyim. – Bekârım. | Evli mi bekâr mı diye sorulur, ben de evliyim ya da bekârım derim. | GEÇTİ | |
| 47 | gun-39 · `prova.durum_tr` | `durum_tr` | Merdivende Frau Brandl ile karşılaşıyorsun. Hafta sonunun nasıl geçtiğini anlat: ne vardı, ne yoktu. Frau Brandl çok meraklı: evli mi bekâr mı olduğunu ve hobini de soruyor. | Komşuya hafta sonumu anlatacağım. Bir de evli miyim bekâr mıyım ve hobim ne, onu soracak. | GEÇTİ | Yeni cümle 13 kelime, sınırda ama tek okumada anlaşıldı. |
| 48 | gun-39 · n6 | `tr` | Orada bir okul vardı. Bugün orada bir otopark var. Söyleyin bakalım: Evli misiniz, bekâr mı? | Eskiden okul varmış, şimdi otopark. Sonra evli miyim diye soruyor. | GEÇTİ | |
| 49 | gun-39 · n6 · seçenek 1 | `tr` | Evli ya da bekâr: {aile}. | Evli miyim bekâr mıyım, onu söyleyeceğim. | GEÇTİ | Soruldu: anlaşılıyor. Ne söyleyeceğim tek okumada belli. Not (karar değil): söylenecek cümleye değil, bir form satırına benziyor. "Ne diyeyim?" ipucunda bu düğümün tek satırı bu, "ben …-ım" diye söyleyeceğimi göstermiyor. Dolu hâli "Evli ya da bekâr: bekâr." biraz tuhaf okunuyor. Engel değil. |
| 50 | gun-39 · n6 · seçenek 1 | `geri_bildirim_tr` | Doğru. Evli ya da bekâr olduğunu **Ich bin …** ile söyledin. | Durumumu **Ich bin** ile söyledim, doğru. | GEÇTİ | |
| 51 | gun-39 · n6 · seçenek 2 | `geri_bildirim_tr` | Burada **Ich habe** değil, **Ich bin** dersin: **Ich bin ledig.** | Burada **Ich habe** demem, **Ich bin** derim. | GEÇTİ | Terim yok, örnek var. |
| 52 | gun-39 · n7 | `tr` | Öyle mi. Peki ne yapmayı seversiniz? Bir hobiniz var mı? | Hobimi soruyor. | GEÇTİ | |
| 53 | gun-39 · n7 · seçenek 1 | `tr` | Evet, {hobi}. Bu benim hobim. | Hobimi söylüyorum. | GEÇTİ | |
| 54 | gun-39 · n7 · seçenek 1 | `geri_bildirim_tr` | Güzel. Hobini söyledin. | Hobimi söyledim. | GEÇTİ | |
| 55 | gun-39 · n7 · seçenek 2 | `tr` | Boş zamanımda {hobi} severim. | Boş vaktimde şunu severim. | GEÇTİ | Eksiz yuva okundu. |
| 56 | gun-39 · n7 · seçenek 2 | `geri_bildirim_tr` | Çok iyi. **In der Freizeit** ile başladın, **mag ich** doğru sırada. | Cümleye **In der Freizeit** ile başladım, o yüzden **mag** öne geçti, doğru. | GEÇTİ | "ikinci yer" fikri 11., 14., 29. günlerde örnekle verildi. "doğru sırada" bunu terimsiz hatırlatıyor. |
| 57 | gun-39 · n7 · seçenek 3 | `geri_bildirim_tr` | **Ich bin** ile hobi söylenmez. **Mein Hobby ist …** dersin. | Hobi için **Ich bin** değil, **Mein Hobby ist** derim. | GEÇTİ | |
| 58 | gun-39 · n5 | `tr` | Ah, ne güzel! Kahve ister misiniz? | Kahve ikram ediyor. | GEÇTİ | |
| 59 | gun-39 · `prova.kapanis_tr` | `kapanis_tr` | Geçmişi anlattın: **war**, **hatte**, **gedauert** ve bir yıl. Evli ya da bekâr olduğunu ve hobini de söyledin. | Geçmişi anlattım, durumumu ve hobimi söyledim. | GEÇTİ | |
| 60 | gun-40 · `okuma_yazma.metin_tr` | `metin_tr` | İyi günler, randevunuz cuma günü saat 15'te. Lütfen sigorta kartınızı getirin. Vaktiniz yok mu? O zaman lütfen arayın. Saygılarımızla, Dr. Weber muayenehanesi | Muayenehane yazıyor: cuma 15'te randevum var, kartımı getireyim, gelemezsem arayayım. | GEÇTİ | Mektup gibi başlıyor ve bitiyor, doğal. |
| 61 | hafta-sonu-testi-03 · `m1:21:t09` | `situation_tr` | Sınav kartları: **Beruf?** (meslek) ve **Sprachen?** (diller). Sınavdaki partnerin soruyor. Ne iş yaptığını ve hangi dilleri konuştuğunu söyle. | Sınavda önüme meslek ve dil yazan kartlar geliyor. Karşımdaki soruyor. İşimi ve konuştuğum dilleri söyleyeceğim. | GEÇTİ | Soruldu: ne yapacağım son cümlede açık. Not: "sınav kartı" burada ilk kez geçiyor. Uygulamada "sınav" haftalık sınav da demek. Karttan gerçek sınavı anladım, ama bir an "bu testte partner mi var?" diye düşündüm. |
| 62 | hafta-sonu-testi-03 · `m1:21:t09` | `why_tr` | Meslek için **Ich bin …** ya da **Ich arbeite als …** dersin, araya **ein** girmez. Diller için **Ich spreche …**. | İş için şu iki kalıp, **ein** yok. Diller için **Ich spreche**. | GEÇTİ | 13 ve 5 kelime. Sembol yok. Not: her karta bir bilgi, kutuda üç bilgi var, ama iki kartlık cevabı anlattığı için tek okumada izlenebildi. |
| 63 | hafta-sonu-testi-04 · `m1:28:t08` | `situation_tr` | Sınav kartları: **Land?** (ülke) ve **Beruf?** (meslek). Sınavdaki partnerin soruyor. Nereli olduğunu ve ne iş yaptığını söyle. | Kartlarda ülke ve meslek yazıyor. Nereli olduğumu ve işimi söyleyeceğim. | GEÇTİ | Soruldu: "Land? (ülke) ve Beruf? (meslek)" açık. Ne yapacağım son cümlede. |
| 64 | hafta-sonu-testi-04 · `m1:28:t08` | `why_tr` | Ülke için **Ich komme aus …**. Meslek için **Ich bin …** ya da **Ich arbeite als …**; araya **ein** girmez. | Ülke için **Ich komme aus**, iş için **Ich bin** ya da **Ich arbeite als**, **ein** yok. | **GERİ** | Sembol: noktalı virgül (`;`). Anlamı tek okumada anladım. |
| 65 | hafta-sonu-testi-05 · `m1:35:t09` | `situation_tr` | Sınav kartları: **Beruf?** ve **Hobby?** Sınavdaki partnerin soruyor. Mesleğini ve hobini söyle. | İşimi ve hobimi söyleyeceğim. | GEÇTİ | İki kelime de önceki günlerde öğretildi, Türkçe karşılık gerekmiyor. |
| 66 | hafta-sonu-testi-05 · `m1:35:t09` | `why_tr` | Meslek için **Ich bin … von Beruf**; araya **ein** girmez. Hobi için **Mein Hobby ist …**. | İş için **Ich bin … von Beruf**, **ein** yok. Hobi için **Mein Hobby ist**. | **GERİ** | Sembol: noktalı virgül (`;`). Anlamı tek okumada anladım. |
| 67 | hafta-sonu-testi-06 · `m1:42:t12` | `situation_tr` | Sınav kartları: **Land** (ülke), **Wohnort** (oturduğun yer), **Beruf**, **Hobby**. Sınavdaki partnerin soruyor. Her karta bir kısa cümleyle kendini tanıt. | Dört kart var: ülke, oturduğum yer, iş, hobi. Her biri için bir cümle söyleyeceğim. | GEÇTİ | Not (karar değil): öbür üç testte kart adlarında soru işareti var, burada yok. Anlamı etkilemiyor. |
| 68 | hafta-sonu-testi-06 · `m1:42:t12` | `why_tr` | Her karta tam bir cümle: **Ich komme aus …**, **Ich wohne in …**, **Ich bin … von Beruf**, **Mein Hobby ist …**. | Her kart için tam bir cümle, şu dört kalıpla. | **GERİ** | Tek cümle 18 kelime, sınır 14 (kalın Almanca sayılır). Anlamı anladım, ama telefonda dört kalıp tek satırda uzun. |

## Sayılmayanlar (öğrenciye görünmüyor)
Uygun olmayan seçeneklerin `tr` satırları, "(yanlış)" ekli olanlar. `Prova.tsx` bunları hazırlıkta, ipucunda ya da balonda göstermiyor:
- gun-16 n8 seçenek 3, gun-19 n7 seçenek 3, gun-32 n5 seçenek 3, gun-39 n6 seçenek 2, gun-39 n7 seçenek 3.
`ornek_de`, `ornek_de_adsiz`, `accepted_kaliplar`, `prompt_de` Almanca, okur kapsamı dışında.

## Gözlemler (karar değil, değişmemiş metin)
1. gun-16 `prova.kapanis_tr` değişmedi: "Telefonda kendini tanıttın, adını ve sokağını harf harf doğruladın." Konuşmaya meslek sorusu eklendi, özette yok. gun-19 `kapanis_tr` için de aynı durum geçerli: meslek cevabı özette yok. Özet hâlâ doğru ama eksik.
2. Yuvaların Türkçe satırlarda hangi dille dolduğu ({aile} "ledig" mi "bekâr" mı, {ulke} "der Türkei" mi) okuru etkiliyor. Bkz. satır 45 ve 49.

## Sorulan üç nokta
- **Sınav kartı maddeleri:** dördünde de ne yapacağım son cümlede açık ("Nereli olduğunu ve ne iş yaptığını söyle"). "Land? (ülke) ve Beruf? (meslek)" parantezle anlaşılıyor. Tek takılma: ilk geçtiği HST-03'te "sınav" sözünün gerçek sınav mı bu test mi olduğu (satır 61, engel değil).
- **"Evli ya da bekâr: {aile}.":** anlaşılıyor (GEÇTİ). Söylenecek bir cümleden çok form satırına benziyor (satır 49 notu).
- **Mektup kalıpları ve denn:** terimsiz. "(kadına)", "(erkeğe)", "(notun ya da mesajın sonunda)" ve "çünkü" eşleşmesi yeterli (satır 18, 23, 32).

## Sonuç

| | |
|---|---|
| Okunan metin | 68 |
| GEÇTİ | 65 |
| GERİ | 3 |

GERİ olan kimlikler:
1. `hafta-sonu-testi-04.json` `m1:28:t08.why_tr`: noktalı virgül.
2. `hafta-sonu-testi-05.json` `m1:35:t09.why_tr`: noktalı virgül.
3. `hafta-sonu-testi-06.json` `m1:42:t12.why_tr`: cümle 18 kelime.

OD-9.4: `hafta-sonu-testi-04`, `-05`, `-06` bu turda "reviewed" sayılamaz. Öbür dosyalarda (gun-16, 19, 22, 27, 31, 32, 33, 39, 40, hafta-sonu-testi-03) okunan metinlerde GERİ yok.

## 2. tur (OD-9.3, PM-148)

Girdi: 1. turdaki 3 GERİ satırının şimdiki hâli ve `git diff 0325ce8c e3b2e3f6 -- content/v2/` içindeki değişen öğrenci metinleri. Metinler `e3b2e3f6` hâliyle okundu.
Yeni düzen: `tr` satırlarında öğrencinin kendi bilgisi `…` ile gösteriliyor. Üstteki Almanca satır kendi bilgimle dolu geldiği için `…` boşluğun yeri olarak okundu, sembol sayılmadı.
Görünürlük 1. turdaki gibi: uygun olmayan "(yanlış)" seçeneklerin `tr` satırı görünmüyor (`web/src/core/prova.ts`). Bu turda yine de okundu, "(görünmez)" diye işaretlendi.

### 1. turdaki GERİ satırları

| # | Öğe | Alan | Açıklama (şimdiki) | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|---|
| 2-1 | hafta-sonu-testi-04 · `m1:28:t08` | `why_tr` | Ülke için **Ich komme aus …**. Meslek için **Ich bin …** ya da **Ich arbeite als …**. Araya **ein** girmez. | Ülke için **Ich komme aus**, iş için **Ich bin** ya da **Ich arbeite als** derim. **ein** koymam. | GEÇTİ | `;` gitti. Üç kısa cümle (5, 9, 3 kelime). (1. tur #64) |
| 2-2 | hafta-sonu-testi-05 · `m1:35:t09` | `why_tr` | Meslek için **Ich bin … von Beruf**. Araya **ein** girmez. Hobi için **Mein Hobby ist …**. | İş için **Ich bin … von Beruf**, **ein** yok. Hobi için **Mein Hobby ist**. | GEÇTİ | `;` gitti. (1. tur #66) |
| 2-3 | hafta-sonu-testi-06 · `m1:42:t12` | `why_tr` | Her karta tam bir cümle kur. Ülke ve şehir: **Ich komme aus …**, **Ich wohne in …**. Meslek ve hobi: **Ich bin … von Beruf**, **Mein Hobby ist …**. | Her kart için bir cümle. Ülke ve şehir için iki kalıp, iş ve hobi için iki kalıp. | GEÇTİ | Cümleler 6, 9, 10 kelime. İkişer ikişer gruplanınca telefonda da izlenebiliyor. (1. tur #68) |

### 2.–3. turda değişen öteki metinler

| # | Öğe | Alan | Açıklama | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|---|
| 2-4 | gun-16 · görev `lx:Name` | `tr` | Adım {name}. … olarak çalışıyorum. | Adımı ve işimi söylüyorum. | GEÇTİ | |
| 2-5 | gun-16 · görev `lx:Name` | `tr_adsiz` | … olarak çalışıyorum. | İşimi söylüyorum. | GEÇTİ | |
| 2-6 | gun-16 · n8 · seçenek 1 | `tr` | … olarak çalışıyorum. | İşimi söylüyorum. | GEÇTİ | |
| 2-7 | gun-16 · n8 · seçenek 2 | `tr` | Mesleğim … | İşim şu. | GEÇTİ | |
| 2-8 | gun-16 · n8 · seçenek 3 (görünmez) | `tr` | Mesleğim … (yanlış) | Aynısı, ama yanlış. | GEÇTİ | |
| 2-9 | gun-19 · `prova.durum_tr` | `durum_tr` | Kurs bitti. Ioana ile istasyonun önündesiniz. Ioana kimin nereye gittiğini, kimin hangi dili konuştuğunu soruyor. Sonra ne iş yaptığını soruyor. | Kurstan sonra Ioana'yla istasyondayım. Kim nereye gidiyor, kim hangi dili konuşuyor diye soruyor. Sonra işimi soruyor. | GEÇTİ | En uzun cümle 9 kelime. "pratik için" gitti, daha düz. |
| 2-10 | gun-19 · n7 | `tr` | İyi! Peki sen ne iş yapıyorsun? | İşimi soruyor. | GEÇTİ | |
| 2-11 | gun-19 · n7 · seçenek 1 | `tr` | Mesleğim … | İşim şu. | GEÇTİ | |
| 2-12 | gun-19 · n7 · seçenek 2 | `tr` | … olarak çalışıyorum. | İşimi söylüyorum. | GEÇTİ | |
| 2-13 | gun-19 · n7 · seçenek 3 (görünmez) | `tr` | … olarak çalışıyorum. (yanlış) | Aynısı, ama yanlış. | GEÇTİ | |
| 2-14 | gun-31 · n4 · seçenek 1 | `tr` | Mesleğim … | Gerçek işimi söylüyorum. | GEÇTİ | |
| 2-15 | gun-31 · n4 · seçenek 2 | `tr` | … olarak çalışıyorum, Tobi ve Derya'yla. | Tobi ve Derya'yla şu işte çalışıyorum. | GEÇTİ | |
| 2-16 | gun-32 · n5 · seçenek 1 | `tr` | Evet! Hobim … | Hobimi söylüyorum. | GEÇTİ | |
| 2-17 | gun-32 · n5 · seçenek 2 | `tr` | Hobim mi? …! Ya sen, Tobi? | Hobimi söyleyip Tobi'ye soruyorum. | GEÇTİ | "…!" bir an göze takılıyor, ama üstteki dolu Almanca satırla anlaşılıyor. |
| 2-18 | gun-32 · n5 · seçenek 3 (görünmez) | `tr` | Evet, hobim … (yanlış) | Aynısı, ama yanlış. | GEÇTİ | |
| 2-19 | gun-32 · n6 | `tr` | Gerçekten mi? Güzel! Benim hobim yüzmek. Birazdan görüşürüz! | Tobi'nin hobisi yüzmek, sonra vedalaşıyor. | GEÇTİ | |
| 2-20 | gun-33 · görev `lx:Land` | `tr` | Memleketim: … Ya sen hangi ülkedensin? | Memleketimi söyleyip karşımdakine soruyorum. | GEÇTİ | 1. turdaki "der Türkei" notu (#45) bu düzenle kapandı. |
| 2-21 | gun-39 · n6 · seçenek 1 | `tr` | Evli ya da bekâr olduğumu söylüyorum: … | Evli miyim bekâr mıyım, onu söylüyorum. | GEÇTİ | Not (karar değil): cümlenin çevirisi değil, ne yaptığımın anlatımı. Yine de ne söyleyeceğim açık. |
| 2-22 | gun-39 · n6 · seçenek 2 (görünmez) | `tr` | Evli ya da bekâr olduğumu söylüyorum: … (yanlış) | Aynısı, ama yanlış. | GEÇTİ | |
| 2-23 | gun-39 · n7 · seçenek 1 | `tr` | Evet, … Bu benim hobim. | Hobimi söylüyorum. | GEÇTİ | |
| 2-24 | gun-39 · n7 · seçenek 2 | `tr` | Boş zamanımda … severim. | Boş vaktimde şunu severim. | GEÇTİ | |
| 2-25 | gun-39 · n7 · seçenek 3 (görünmez) | `tr` | Evet, hobim … (yanlış) | Aynısı, ama yanlış. | GEÇTİ | |
| 2-26 | gun-40 · kalıp "Guten Tag, … – Mit freundlichen Grüßen, …" | `tr` | İyi günler, … – Saygılarımla, … (resmî mesajın sonu) | Resmî mesaja "İyi günler" diye başlarım, "Saygılarımla" ve adımla bitiririm. | GEÇTİ | Ayraç yalnız ikinci parçaya ait. Tire ayırdığı için karışmadı. |
| 2-27 | gun-40 · `m1:40:o5` | `q_tr` | Mesajı kim yazdı? | Mesajı kimin gönderdiğini soruyor. | GEÇTİ | |
| 2-28 | gun-40 · `m1:40:o5` | `opts` | Dr. Weber muayenehanesi · Derya · Brandl Hanım | Üç seçenek: muayenehane, Derya, Brandl Hanım. | GEÇTİ | Doğru cevap metnin sonundaki imzadan çıkıyor. |

gun-27 `accepted_kaliplar`, hafta-sonu-testi-03/05/06 `accepted` eklemeleri ve HST-05 `can_do` öğrenciye Türkçe metin göstermiyor, okunmadı.

### 2. tur notları (karar değil)

1. gun-40'ta mektup metni (`metin_tr`) "Saygılarımızla" diyor, yeni kalıp "Saygılarımla". Almancası ikisinde de **Mit freundlichen Grüßen**. Gönderen muayenehane olduğu için doğal, karışmadı.

### 2. tur sayıları

- Okunan: 28 (1. tur GERİ düzeltmesi 3 + 25 değişen metin; bunlardan 5'i görünmeyen "(yanlış)" satırı)
- GEÇTİ: 28
- GERİ: 0

OD-9.4: 1. turdaki 3 GERİ kapandı, 2. turda yeni GERİ yok. gun-16, 19, 31, 32, 33, 39, 40 ve hafta-sonu-testi-03…06 okur açısından "reviewed" sayılabilir.
