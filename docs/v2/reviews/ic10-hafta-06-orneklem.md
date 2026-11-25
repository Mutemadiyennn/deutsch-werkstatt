# İÇ-10 · 6. hafta örneklem kontrolü (36.–42. gün)

Tarih: 2026-11-23 · inceleyen: qa-ajan (örneklem) · sıra: yazar → dilbilimci → okur → **örneklem** · taş: M1
Dayanak: `docs/v2/LEARNER.md`, `content/v2/m1/FORMAT.md`, dilbilimci raporu `docs/v2/reviews/ic5-hafta-06.md`, `docs/v2/OGRETIM_DONGUSU.md` OD-9.
İçerik dosyalarına dokunulmadı. Yöntem 5. haftanın örneklemiyle (`ic5-hafta-05-orneklem.md`) aynı.

## Kapsam ve seçim
Kapsam: `content/v2/m1/gun-36.json` … `gun-42.json`, `hafta-sonu-testi-06.json`, `gorulmemis-06.json`. Bunlara ek olarak `dn-06.json` (4 dil noktası; 30 öğeye girmez, hepsi OD-9 açısından okundu).

Havuzlar (dilbilimci, okur ve `5529bdd` hafta kapısı düzeltmelerinden sonraki hâl):

| Havuz | Öğe |
|---|---|
| halka görev cümlesi + kabulleri | 120 |
| prova seçeneği + kabulleri | 90 |
| sınav maddesi (`gun_sinavi` 77 + hafta sonu testi 12) | 89 |
| dikte (sahne ve seslerin bütün basamakları) | 105 |
| okuma sorusu | 28 |
| görülmemiş durum | 7 |
| **toplam** | **439** |

Seçim: Python `random.seed(6)`. Havuzlar yukarıdaki sırayla ele alındı, her birinden `random.sample(havuz, 5)` çekildi. Toplam 30 öğe, havuzun %6,8'i.
Betik aynı havuz tanımıyla 5. hafta dosyalarında `seed(6)` ile çalıştırıldı ve 5. haftanın 2. çekilişindeki 30 öğeyi birebir yeniden üretti. Yani havuzlar ve sıra 5. haftayla aynı.
Betik ve ham çıktı: `/tmp/claude-0/sp/orneklem_h.py` (kullanım: `orneklem_h.py <kök> 36 42 06 <tohum>`), `/tmp/claude-0/sp/orneklem_h6.out`, `/tmp/claude-0/sp/orneklem_h66.out`.

Her öğe altı ölçütle kontrol edildi: (1) Almanca doğru ve doğal mı, (2) Türkçe karşılık birebir mi, (3) kabullerin hepsi doğru ve aynı anlamda mı (dikte için yalnız harf ve noktalama farkı), (4) anlama sorusunun cevabı kanıt cümlesinden çıkıyor mu, tek doğru şık var mı, (5) açıklama doğru mu, (6) öğrenci adı yalnız `{name}` ile mi yazılmış, ses metninde yer tutucu var mı. Prova seçenekleri düğümün bağlamıyla (karşı tarafın repliği, `durum_tr`, geri bildirim), dikte maddeleri kaynak cümleleriyle, halka ve sınav maddeleri günün hikâyesiyle birlikte okundu. Düğüm `tr` alanındaki ünlem kalıntıları ayrı bölümde sayıldı, seçenek öğesine hata olarak yazılmadı (5. haftadaki "Pasta daha bitmez" notuyla aynı yöntem).

## 1. çekiliş (seed 6)

| # | Öğe | Yer | Sonuç | Not |
|---|---|---|---|---|
| 1 | görev: **Ich muss dringend zum Hausarzt!** | gun-41 · m1:41:h1 · gorev_cumleleri[5] | TAMAM | **zu meinem Hausarzt** aynı anlam. **Hausarzt** 40. günde öğretiliyor. |
| 2 | görev: **2008 war die Schule noch neu.** | gun-39 · m1:39:h2 · gorev_cumleleri[1] | **HATA** | Aşağıda 1. hata. |
| 3 | görev: **Tobi, ein Versprechen ist ein Versprechen!** | gun-41 · m1:41:h2 · gorev_cumleleri[1] | TAMAM | "Söz sözdür" birebir ve doğal. Biçim dilbilimcinin kararıyla kaldı. |
| 4 | görev: **Ich habe am Freitag einen Film gesehen.** | gun-36 · m1:36:h1 · gorev_cumleleri[10] | TAMAM | **Freitag** edatsız biçimi konuşmada doğal. |
| 5 | görev: **Am Sonntag war die Heizung kaputt.** | gun-39 · m1:39:h1 · gorev_cumleleri[0] | TAMAM | Sahneyle (pazar günü oda soğuk) tutarlı. |
| 6 | prova: **Ja, aber ich bin falsch abgebogen!** | gun-38 · prova n4 · secenekler[0] | TAMAM | Geri bildirim (**Ich bin abgebogen**) doğru. Sonraki düğüm n5'in `tr`'si ünlem bölümünde. |
| 7 | prova: **Nur ein Stück, und du?** | gun-36 · prova n2 · secenekler[1] | TAMAM | **Wie viel Kuchen** sorusuna uygun. |
| 8 | prova: **Am Samstag war ich bei Derya. Die Party war toll.** | gun-36 · prova n1 · secenekler[0] | TAMAM | Kabuller aynı anlamda. Düğüm n1'in `tr`'si ("Eee,") ünlem bölümünde. |
| 9 | prova: **Bis drei Uhr. Dann habe ich ferngesehen.** | gun-37 · prova n3 · secenekler[0] | TAMAM | **Wie lange hast du gearbeitet?** sorusuna doğru cevap. Geri bildirim doğru. |
| 10 | prova: **Guten Morgen, Herr Wimmer!** | gun-42 · prova n5 · secenekler[0] | TAMAM | Pazartesi sabah molası, **Sie** hitabı tutarlı. |
| 11 | sınav (sesli): **Wie bist du zu Derya gefahren?** | gun-42 · gun_sinavi · m1:42:s10 | TAMAM | Beş kabul durumla (otobüs) uyumlu. `sesli` listesinde. |
| 12 | sınav (`tr_de`): "İki gün önce doktordaydım." | gun-41 · gun_sinavi · m1:41:s6 | TAMAM | **beim Doktor** ve **beim Arzt** doğru. `why_tr` doğru. |
| 13 | sınav (dikte): **Ich habe die Nachricht nicht gelesen.** | gun-40 · gun_sinavi · m1:40:s4 | TAMAM | `dikte` listesinde. Kabuller yalnız harf ve noktalama farkı. |
| 14 | sınav (`tr_de`): "1999'da okul yeniydi." | gun-39 · gun_sinavi · m1:39:s8 | **HATA** | 1. hatayla aynı kök. Aşağıda. |
| 15 | sınav (dikte): **Möchten Sie ein Stück Kuchen?** | gun-36 · gun_sinavi · m1:36:s3 | TAMAM | `dikte` listesinde. |
| 16 | dikte (gerçek): **Derya ist zu ihren Eltern gefahren. Sie ist mit der Straßenbahn gefahren.** | gun-38 · m1:38:v1 · b1 · d5 | TAMAM | Yanlış değil. Ama dilbilimcinin bulgu 6'sından sonra s4 **mit dem Bus und mit der Straßenbahn** diyor. Örnek yalnız tramvayı anıyor. İsteğe bağlı: **Sie ist mit dem Bus und mit der Straßenbahn gefahren.** |
| 17 | dikte (zor): **Das Wetter am Wochenende: Es regnet!** | gun-40 · m1:40:v1 · b1 · d3 | TAMAM | Banka cevabın kelimeleri artı iki çeldirici (**Wasser**, **heute**). |
| 18 | dikte (zor): **Wir haben Kaffee getrunken und Kuchen gegessen.** | gun-42 · m1:42:a2 · b1 · d3 | TAMAM | Çeldiriciler **sind**, **Tee**. |
| 19 | dikte (kolay): "Hangi sayıyı duydun?" (**zwei**) | gun-37 · m1:37:a2 · b1 · d1 | TAMAM | c4'te yalnız **zwei** geçiyor. **drei** ve **zwölf** geçmiyor. |
| 20 | dikte (usta): **Wie bei mir! Und dann?** | gun-42 · m1:42:v1 · b1 · d4 | TAMAM | Kabuller doğru. İki cümleli satır dilbilimcinin açık noktası 4. Sahnedeki "Benim gibi!" yerine "Bende de öyle oldu!" daha doğal (isteğe bağlı). |
| 21 | okuma (`guided_response`): **Wie sind meine Haare?** | gun-42 · okuma · m1:42:o4 | TAMAM | Metin **Meine Haare sind jetzt kurz!** diyor. Beş kabul uygun iltifat. |
| 22 | okuma: "Kalorifer şimdi nasıl?" | gun-39 · okuma · m1:39:o2 | TAMAM | Kanıt 2 = **Jetzt funktioniert sie wieder.** "Pazartesi tamir edilecek" çamaşır makinesinin teknisyeniyle karışıyor ama yanlış şık. Tek doğru şık var. |
| 23 | okuma: "Randevu saat kaçta?" | gun-40 · okuma · m1:40:o2 | TAMAM | Kanıt 0 = **Ihr Termin ist am Freitag um 15 Uhr.** Sahneyle (cuma, aile hekimi) tutarlı. |
| 24 | okuma: "Rapor kaç günlük?" | gun-41 · okuma · m1:41:o2 | TAMAM | Kanıt 2 = **… eine Krankschreibung für drei Tage.** |
| 25 | okuma (`guided_response`): **Danke für den Samstag!** | gun-36 · okuma · m1:36:o4 | TAMAM | Kabuller doğru. **Danke auch** konuşma dilinde yerinde. |
| 26 | görülmemiş: **Was haben Sie gestern gegessen und getrunken?** | gorulmemis-06 · m1:h06:g2 | TAMAM | Frau Huber muayenehane sekreteri. Girişte kısa soru sorması inandırıcı. Beş kabul doğru. |
| 27 | görülmemiş: **Regnet es noch draußen?** | gorulmemis-06 · m1:h06:g5 | TAMAM | Kabuller doğru. `why_tr` "hava cümlesi **es** ile kurulur" diyor. Gramer kaydı artık "çoğu zaman" diyor (dilbilimci bulgu 29). İsteğe bağlı uyum. |
| 28 | görülmemiş: **Und Ioana? Was war los?** | gorulmemis-06 · m1:h06:g6 | TAMAM | Kabuller doğru. `why_tr` (**ich** → **sie**/**Ioana**) doğru. |
| 29 | görülmemiş: **Bist du mit dem Auto gekommen?** | gorulmemis-06 · m1:h06:g3 | TAMAM | Basti'ye **du**. **Fahrrad** 40. günde var. `why_tr` "Gelmekte **bin** gelir" anlaşılır ama kuru. İsteğe bağlı: "**kommen** geçmişte **bin** ister." |
| 30 | görülmemiş: **Wie war Ihre Woche?** | gorulmemis-06 · m1:h06:g4 | TAMAM | **Sie** hitabı doğru. Kabuller durumla tutarlı. |

**Sonuç: 30 öğede 2 hata, oran %6,7 (eşik %5).** İki hata aynı kök nedenden çıkıyor.

### Hatalar

#### 1. `content/v2/m1/gun-39.json` · `halkalar[1]` (m1:39:h2) · `gorev_cumleleri[1]`
- **Şu an:** `de` = **2008 war die Schule noch neu.** · `tr` = "2008'de okul daha yeniydi." · kart `lx:Schule`.
- **Sorun (ölçüt 1 ve 2, iç tutarlılık):** Aynı halkada Frau Brandl'ın hikâyesi şöyle: **Und früher war hier eine Schule.** (halka sahnesi), hemen önceki görev cümlesi **Im Jahr 1960 war hier eine Schule.**, prova kapanışı n5 **Da war eine kleine Schule. Heute ist da ein Parkplatz.** Okul 1960'ta vardı, bugün yerinde otopark var. Aynı okulun 2008'de "hâlâ yeni" olması imkânsız. Öğrenci iki görev cümlesini art arda görüyor (gorev_cumleleri[0] ve [1]). Ayrıca "daha yeniydi" Türkçede önce "daha yeni" (karşılaştırma) diye okunur. Dilbilimci aynı haftada **noch** için "saçlarım daha uzundu" → "hâlâ uzundu" düzeltmesini yaptı (bulgu 23). Burada aynı sorun kalmış.
- **Önerilen düzeltme (dilbilimci seçer):**
  - (a) Yılı hikâyeye çek: **1965 war die Schule noch neu.** · "1965'te okul henüz yeniydi." · kabuller **1965 war die Schule noch neu.** / **Im Jahr 1965 war die Schule noch neu.** / **Die Schule war 1965 noch neu.**
  - (b) Yılları (2000 sonrası okunuşu) korumak gerekiyorsa okulu ayır: **2008 war meine Schule noch neu.** · "2008'de okulum henüz yeniydi." (kabuller aynı düzende).
  - Her iki durumda da `tr` içinde "daha" yerine "henüz".

#### 2. `content/v2/m1/gun-39.json` · `gun_sinavi.maddeler[7]` (m1:39:s8)
- **Şu an:** `tr` = "1999'da okul yeniydi." · kabuller **1999 war die Schule neu.** / **Im Jahr 1999 war die Schule neu.** / **Die Schule war 1999 neu.** · `why_tr` "Yılın önüne tek başına **in** gelmez …"
- **Sorun:** 1. hatayla aynı. Günün tek okulu Frau Brandl'ın 1960'taki okulu. O okul 1999'da yeni olamaz. Dilbilimci bu maddedeki **Zimmer** cümlesini doğallık için değiştirdi (bulgu 12), çelişki kaldı.
- **Önerilen düzeltme:** (a) **1960 war die Schule neu.** · "1960'ta okul yeniydi." (kabuller ve `why_tr` örneği aynı yılla). Ya da (b) **1999 war meine Schule neu.** · "1999'da okulum yeniydi." `why_tr` kuralı değişmez.

Örneklem dışında aynı kök (sayıma girmez): `content/v2/m1/hafta-sonu-testi-06.json` · `maddeler[7]` (m1:42:t08) **Im Jahr 1985 war die Schule neu.** · "1985 yılında okul yeniydi." Hafta sonu testi 39. günü sınıyor. Aynı çelişki. Öneri: **Im Jahr 1965 war die Schule neu.** (parçalar `neu / Im Jahr 1965 / die Schule / war`), Türkçesi "1965 yılında okul yeniydi."

### 1. çekiliş kararı
Hata oranı %6,7, eşik %5'in üstünde. Yönerge gereği 2. çekiliş yapıldı.

## 2. çekiliş (seed 66)
Aynı betik ve havuzlar. `random.seed(66)` ile her havuzdan `random.sample(havuz, 5)`. Ham çıktı: `/tmp/claude-0/sp/orneklem_h66.out`. İki çekilişte ortak çıkan öğeler: m1:42:v1 d4, m1:39:o2, g2, g5, g6. Bunlar yeniden kontrol edildi. Öğeler düzeltmeden önceki hâliyle okundu (içerik değişmedi).

| # | Öğe | Yer | Sonuç | Not |
|---|---|---|---|---|
| 1 | görev: **Möchtest du noch ein Stück Kuchen?** | gun-36 · m1:36:h1 · gorev_cumleleri[9] | TAMAM | "Bir dilim pasta daha" **noch** karşılığı doğru. |
| 2 | görev: **Kannst du mir die Adresse schicken?** | gun-37 · m1:37:h2 · gorev_cumleleri[7] | TAMAM | **Schickst du mir …?** aynı istek. |
| 3 | görev: **Muss ich umsteigen?** | gun-38 · m1:38:h2 · gorev_cumleleri[5] | TAMAM | **da**, **hier** yalnız yer ekliyor. |
| 4 | görev: **Auf Wiedersehen, Herr Wimmer, bis Montag!** | gun-42 · m1:42:h1 · gorev_cumleleri[6] | TAMAM | "Hoşça kalın" **Sie** hitabına uygun. |
| 5 | görev: **Einen Kaffee, schwarz, bitte.** | gun-37 · m1:37:h1 · gorev_cumleleri[9] | TAMAM | "sade" kahvede yerleşik karşılık. **Einen schwarzen Kaffee** doğru. |
| 6 | prova: **Gut, danke! Bis um drei.** | gun-40 · prova n4 · secenekler[0] | TAMAM | Randevu saat üçte (`durum_tr`, okuma). Frau Huber'le telefon kapanışı doğal. |
| 7 | prova: **Es war laut. Die Nachbarn hatten eine Party.** | gun-39 · prova n1 · secenekler[1] | TAMAM | n3 (**Die Party! …**) bununla tutarlı. Düğüm n1, n3 `tr` ünlemleri ayrı bölümde. |
| 8 | prova (uygunsuz): **Ja, ich habe zu Hause geblieben.** | gun-38 · prova n3 · secenekler[2] | TAMAM | Bilerek yanlış. Düğüm kendine dönüyor, geri bildirim **bin** ile doğrusunu veriyor. |
| 9 | prova (uygunsuz): **Nein, er ist nicht krank.** | gun-41 · prova n4 · secenekler[2] | TAMAM | Geri bildirim mesaja gönderme yapıyor. Düğüm n4 `tr`'si ("Onu arayayım mı?") ayrı bölümde. |
| 10 | prova: **Ich habe einen Pullover gekauft.** | gun-37 · prova n1 · secenekler[0] | TAMAM | Ioana'nın **Was hast du gekauft?** sorusuna doğru. **Ich hab** kabulü konuşma biçimi. |
| 11 | sınav (sesli): **Wollen wir uns duzen?** | gun-41 · gun_sinavi · m1:41:s9 | TAMAM | `sesli` listesinde. **uns** soruda duyuluyor. Kabuller arasında **Ja, gern!** var, öğrenciden **uns** istenmiyor. |
| 12 | sınav (dikte): **Mein Onkel ist mit dem Auto gekommen.** | gun-38 · gun_sinavi · m1:38:s2 | TAMAM | Kabuller yalnız harf ve noktalama farkı. |
| 13 | sınav (`tr_de`): "Altı haftadır Wendlfing'de oturuyorum." | gun-41 · gun_sinavi · m1:41:s5 | TAMAM | Altıncı haftayla tutarlı. `why_tr` (**seit** ile şimdiki biçim) doğru. |
| 14 | sınav (dikte): **Die Party am Freitag war lustig.** | gun-42 · gun_sinavi · m1:42:s1 | TAMAM | Kabuller doğru. |
| 15 | sınav (`tr_de`): "Kartla ödedim." | gun-37 · gun_sinavi · m1:37:s6 | TAMAM | `why_tr` (**bezahlt**, ge yok) doğru. |
| 16 | dikte (kolay): **getrunken** | gun-42 · m1:42:a2 · b1 · d1 | TAMAM | c3'te geçiyor, çeldiriciler geçmiyor. |
| 17 | dikte (orta): **Am Sonntag war ich zu Hause, ein bisschen ___.** | gun-42 · m1:42:v1 · b1 · d2 | TAMAM | **erkältet**, s7. |
| 18 | dikte (usta): **Kannst du mich heute noch anrufen?** | gun-36 · m1:36:a1 · b1 · d4 | TAMAM | c5'in Türkçesi dilbilimcinin düzeltmesiyle ("bugün içinde") doğru. |
| 19 | dikte (orta): **Das hat aber lange ___!** | gun-39 · m1:39:v1 · b1 · d2 | TAMAM | **gedauert**, s2. |
| 20 | dikte (usta): **Wie bei mir! Und dann?** | gun-42 · m1:42:v1 · b1 · d4 | TAMAM | 1. çekilişte de vardı. |
| 21 | okuma: "Siyah kazak nasıl?" | gun-37 · okuma · m1:37:o2 | TAMAM | Kanıt 3 = **Der schwarze Pullover ist schön und billig.** Tek doğru şık. |
| 22 | okuma: "Kalorifer şimdi nasıl?" | gun-39 · okuma · m1:39:o2 | TAMAM | 1. çekilişte de vardı. |
| 23 | okuma (`guided_response`): **Kommt Tobi morgen?** | gun-41 · okuma · m1:41:o4 | TAMAM | Beş kabul mesajla (**Am Donnerstag kommt er wieder.**) tutarlı. |
| 24 | okuma: "Tobi ne zaman geri geliyor?" | gun-41 · okuma · m1:41:o3 | TAMAM | Kanıt 3 doğru. |
| 25 | okuma: "Teknisyen ne zaman geliyor?" | gun-39 · okuma · m1:39:o3 | TAMAM | Kanıt 4 = **Am Montag um zehn Uhr kommt ein Techniker.** |
| 26 | görülmemiş: **Und Ioana? Was war los?** | gorulmemis-06 · m1:h06:g6 | TAMAM | 1. çekilişte de vardı. |
| 27 | görülmemiş: **Regnet es noch draußen?** | gorulmemis-06 · m1:h06:g5 | TAMAM | 1. çekilişte de vardı. |
| 28 | görülmemiş: **Und, was haben Sie am Wochenende gemacht?** | gorulmemis-06 · m1:h06:g1 | TAMAM | Kuaförde Luka'ya **Sie**. Beş kabul aynı anlamda. `why_tr` doğru. |
| 29 | görülmemiş: **Und dein Wochenende?** | gorulmemis-06 · m1:h06:g7 | TAMAM | Basti'ye **du**. Kabuller durumla (otobüs, ceket, evde kalmak) tutarlı. `why_tr` doğru. |
| 30 | görülmemiş: **Was haben Sie gestern gegessen und getrunken?** | gorulmemis-06 · m1:h06:g2 | TAMAM | 1. çekilişte de vardı. |

**Sonuç: 30 öğede 0 hata, oran %0.** İki çekiliş birlikte (60 öğe, 5 ortak) 2 hata, %3,3. İki hata da tek bir kök nedenden (39. gün okul yılları) geliyor.

## `5529bdd` ünlem kalıntıları (örneklemden ayrı)
`5529bdd` karşı taraf repliklerinden **Na**, **Ach**, **okay** sözcüklerini çıkardı. Değişen 21 alanın hepsi okundu. Ünlem, düğümlerin `tr` alanında 9 yerde kalmış. Almanca satırda karşılığı olmayan Türkçe ünlem birebir çeviri kuralına (OD-9) uymuyor: öğrenci duymadığı bir sözcüğün çevirisini okuyor.

| # | Dosya · yol | Almanca (şimdi) | `tr` (şimdi) | Önerilen `tr` |
|---|---|---|---|---|
| Ü1 | gun-36 · `prova.dugumler[0]` (n1) | **Hallo! Was hast du am Wochenende gemacht?** | "Merhaba! Eee, hafta sonu ne yaptın?" | "Merhaba! Hafta sonu ne yaptın?" |
| Ü2 | gun-36 · `prova.dugumler[3]` (n4) | **Und jetzt ist wieder Montag.** | "Ve şimdi yine pazartesi. Neyse!" | "Ve şimdi yine pazartesi." |
| Ü3 | gun-38 · `prova.dugumler[4]` (n5) | **Das passiert!** | "Eh, olur öyle!" | "Olur öyle!" |
| Ü4 | gun-38 · `prova.dugumler[5]` (n6) | **Dann war dein Wochenende ja gut!** | "Eh, hafta sonun iyi geçmiş o zaman!" | "O zaman hafta sonun iyi geçmiş!" |
| Ü5 | gun-39 · `prova.dugumler[0]` (n1) | **Hallo! Wie war Ihr Wochenende?** | "Merhaba! Eee, hafta sonunuz nasıldı?" | "Merhaba! Hafta sonunuz nasıldı?" |
| Ü6 | gun-39 · `prova.dugumler[2]` (n3) | **Die Party! Das war sehr laut. Wie lange hat sie gedauert?** | "Ah, o parti! Çok gürültülüydü. Ne kadar sürdü?" | "O parti! Çok gürültülüydü. Ne kadar sürdü?" |
| Ü7 | gun-39 · `prova.dugumler[3]` (n4) | **Im Jahr 1970 war die Straße nicht so laut.** | "Ah evet. 1970'te sokak bu kadar gürültülü değildi." | "1970'te sokak bu kadar gürültülü değildi." |
| Ü8 | gun-41 · `prova.dugumler[1]` (n2) | **War er schon beim Doktor?** | "Yok artık! Doktora gitti mi?" | "Doktora gitti mi?" |
| Ü9 | gun-42 · `prova.dugumler[0]` (n1) | **Wie war dein Wochenende?** | "Eee, hafta sonun nasıldı?" | "Hafta sonun nasıldı?" |

Aynı committe ünlem dışı küçük kayma (öneri, ünlem sayısına girmez):
- gun-41 · `prova.dugumler[3]` (n4): **Danke! Soll ich Tobi anrufen?** · "Teşekkürler! Onu arayayım mı?" → "Teşekkürler! Tobi'yi arayayım mı?"
- gun-41 · `prova.dugumler[4]` (n5): **Gut, dann rufe ich Tobi heute Abend an!** · "Tamam, o zaman bu akşam onu ararım!" → "Tamam, o zaman bu akşam Tobi'yi ararım!"

Temiz çıkanlar (12 alan): gun-37 n4 (**Nur Deutsch, ja?** · "tamam mı?" **ja?** sorusuna uyuyor); `tr`'si olmayan `prompt_de` alanları (gun-36 s9, gun-37 a1 c1, gun-39 v1 c1 ve s11, gun-42 o4, gorulmemis g4 ve g7; hiçbir `situation_tr`/`durum_tr`'de ünlem yok); gun-38 halka cümlesi **Der Hund ist auch zum Bahnhof gekommen.** · "Köpek de gara geldi."; gun-40 **Die Nachricht ist von Dr. Weber.** · "Mesaj Dr. Weber'den."; gun-40 **Das Foto ist von 2008. Es war sehr heiß.** · "Fotoğraf 2008'den. Çok sıcaktı." (kabul **Das Foto ist aus 2008.** konuşma dilinde duyulur, kalabilir).
Haftanın bütün `tr` alanları da tarandı. Kalan ünlemlerin (36 halka "Eee?" ← **Und?**, 36 sahne "Aa" ← **Oh**, 38 sahne "Eh" ← **Na ja**, 40 sahne "Ah Tobi!" ← **Ach, Tobi!**, 41 sahne "Eh işte" ← **Na ja, es geht**, 42 n2 "Eh" ← **Na ja**, 36 n4 seçeneği "Neyse." ← **Na ja.**) hepsinin Almancada karşılığı var.

## `dn-06.json` (OD-9; 30'a ek)
Dört dil noktası okundu. Sembol, tırnak ve terim yok. Cümleler 14 kelimenin altında. Örnek cümleler ve Türkçeleri doğru.

| Dil noktası | Sonuç | Not |
|---|---|---|
| `dn:sesli-kurma` | TAMAM | Adımlar tek fikirli, tablo ile örnekler aynı. |
| `dn:kaydet-dinle` | TAMAM | Sesletim notları doğru (**ge** vurgusuz, **ie** uzun i). İsteğe bağlı: "**Hause** içinde a ve u birlikte okunur" öğrenciye iki ayrı ses gibi gelebilir. "**au** tek hece, Türkçedeki av sesine yakın" daha açık. |
| `dn:kelime-ailesi-1` | **EKSİK** | Tabloda ilk parçası fiil olan iki satır var: **fahren** + **die Karte** → **die Fahrkarte**, **waschen** + **die Maschine** → **die Waschmaschine**. Metin yalnız "araya bazen küçük bir harf girer" diyor. Fiilin sonundaki **en**'in düştüğünü söylemiyor. Öğrenci kuralı uygularsa **Fahrenkarte** kurar. Öneri: `tr` içine bir cümle: "Birinci parça fiilse sonundaki **en** düşer: **fahren**, **Fahrkarte**." İsteğe bağlı: "**Bahn** tren ya da hat" içindeki "hat", Almanca **hat** ile karışabilir. "tren ya da raylı yol" daha güvenli. |
| `dn:yeniden-anlatma` | **EKSİK** | Metin **ich** → **er/sie**, **bin** → **ist**, **habe** → **hat** dönüşümünü anlatıyor. Tablonun son satırı (**Wir sind zu Hause geblieben.** → **Sie sind zu Hause geblieben.**) metinde olmayan bir kural gösteriyor: **wir** → **sie**, **sind** aynı kalır. Cümle başındaki büyük **Sie** de kibar **Sie** ile karışıyor (OD-9.2 md. 4: açıklama ekrandaki ifadeyi anlatır). Öneri: `tr` içine "**wir** yerine **sie** dersin, **sind** aynı kalır." ya da satırı **Tobi und Derya sind zu Hause geblieben.** yap. |

## Örneklem dışında görülenler (sayıma girmez, bilgi)
- `hafta-sonu-testi-06.json` · m1:42:t08: okul çelişkisinin üçüncü yeri (yukarıda, 2. hatanın altında).
- **noch** için "daha" çevirisi aynı haftada iki yerde daha var: gun-40 `halkalar[1].gorev_cumleleri[1]` "O zaman Wendlfing daha küçüktü." (karşılaştırma gibi okunur, öneri "henüz küçüktü"), gun-39 sahne s5 "O daha genç!" (bağlamda anlaşılıyor). Dilbilimcinin bulgu 23'üyle uyum için bakılabilir.
- gun-38 · v1 d5 `ornek_de` yalnız tramvayı anıyor (1. çekiliş #16).
- 40. gün sahnesi s1: `sahne_tr` "Radyo çalıyor" diyor ama satırın konuşmacısı Tobi (`ch:lechner`). Tobi radyoyu tekrarlıyor diye okunabilir. Çizimde radyoyu konuşan gibi göstermek daha açık olur.

## Makine denetimi
Komut h6 ağacının kökünden çalıştırıldı: `A1K=content/v2/curriculum/a1-kesin.json node --experimental-strip-types docs/v2/reviews/ic5/araclar/kdenet.ts 29 42`. Ağaçta `node_modules` yoktu. Koşu süresince `/home/claude/bt/node_modules`'e geçici bir sembolik bağ verildi (`node_modules` `.gitignore`'da), koşudan sonra silindi. Ham çıktı: `/tmp/claude-0/sp/kdenet_h6.out`.

36–42 satırları:
```
content/v2/m1/gun-36.json: görev cümlesi 23, bilinmeyenli 0; kart 11; halka 2
content/v2/m1/gun-37.json: görev cümlesi 23, bilinmeyenli 0; kart 10; halka 2
content/v2/m1/gun-38.json: görev cümlesi 23, bilinmeyenli 0; kart 10; halka 2
content/v2/m1/gun-39.json: görev cümlesi 23, bilinmeyenli 0; kart 9; halka 2
  content/v2/m1/gun-40.json [sahne] gösterim 2: ?waschen, ?maschine :: Und Waschmaschine? Waschen und Maschine!
content/v2/m1/gun-40.json: görev cümlesi 23, bilinmeyenli 0; kart 8; halka 2
content/v2/m1/gun-41.json: görev cümlesi 23, bilinmeyenli 0; kart 8; halka 2
content/v2/m1/gun-42.json: görev cümlesi 29, bilinmeyenli 0; kart 4; halka 1
halka uyarı: content/v2/m1/gun-40.json: 1 sahne satırında 1 bilinmeyen sözcük (işaretli gösterilir, sorulmaz)
```
Bunlara ek olarak her gün için bilinen KESİN UYUŞMAZ satırları var (PM izinli dağılım). Çıktı dilbilimci raporuyla aynı: 36–42 için HALKA HATA, "görev:", TEKRAR ve KALIP ÖRNEKSİZ satırı yok, bilinmeyenli görev cümlesi 0, yalnız bilinen **Waschen und Maschine** gösterim uyarısı. (29–35 için çıkan HALKA HATA ve "görev:" satırları bu ağaçta `batch-015.json` olmamasından kaynaklanıyor; araç README'sinin 2. adımı. 6. haftayla ilgisi yok.)

Ek tarama (bir kez, 10 dosyanın tamamı, `dn-06` dahil): `audio_de`, `prompt_de`, ses `script`, sahne ve halka satırları ve prova düğümlerinde yer tutucu 0. `{name}` dışında yer tutucu 0. `{name}` yalnız öğrencinin söylediği 10 alanda.

## Karar
- 1. çekiliş: 30'da 2 hata, %6,7 → eşiğin (%5) üstünde.
- 2. çekiliş (seed 66): 30'da 0 hata, %0.
- **ÖRNEKLEM GEÇTİ** (2. çekilişle). `gun-36` … `gun-42`, `hafta-sonu-testi-06.json`, `gorulmemis-06.json` örneklem aşamasından geçti.

Geçiş koşulsuz değil. Yayından önce dilbilimcinin hedefli düzeltme yapması önerilir:
1. 39. gün okul yılları: m1:39:h2 [1], m1:39:s8 ve hafta sonu testi m1:42:t08 (tek kök, üç yer).
2. Ünlem kalıntıları Ü1–Ü9 (9 `tr` alanı) ve gun-41 n4, n5'te "onu" → "Tobi'yi".
3. `dn-06`: `dn:kelime-ailesi-1` (**en** düşmesi) ve `dn:yeniden-anlatma` (**wir** → **sie** satırı).
Düzeltmeler dar ve mekanik. Örneklemin yeniden çekilmesi gerekmez; düzeltmeden sonra yalnız değişen alanların fark kontrolü yeterli.
