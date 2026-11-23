# Sözlük partisi a2-06 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 21 derin kart (A2 tablosu 20. hafta, 137.–140. gün) · dosya: `content/v2/registry/lexicon/batch-a2-06.json`

Okunan alanlar: kart verisi, 84 eşdizim, 126 örnek, 105 boşluk (`forms`), 42 hata notu, `exp`, `also_ok`, `patterns`, `related`.

## Sayılar
- Geçti (değişiklik yok): 7 kart (`lx:anziehen`, `lx:Bank`, `lx:einzahlen`, `lx:Kontoauszug`, `lx:Dauerauftrag`, `lx:Menü`, `lx:Stern`)
- Düzeltildi: 14 kart, **23 düzeltme** (8'i yalnızca `also_ok` eklemesi)
- Kaldı: 0
- Hata oranı: 14 kart / 21 = 0,67 (`also_ok` dışında içerik düzeltmesi olan kart: 10)
- `npm run content:validate`: 0 hata, 146 uyarı (taban 146; bu partiye ait uyarı yok). `content:explain-audit`: partide 63 açıklama, aykırı 0 (`docs/v2/reports/aciklama-tarama.md` eski hâline bırakıldı).
- `review`: `draft` (okur bekliyor).
- Ayrıca `content/v2/registry/lexicon/SOURCES.md` içinde 6 satır güncellendi (aşağıda; 23'e dâhil değil).

## Düzeltmeler (önce → sonra, gerekçe)

**Hata notları**
1. `lx:aufmachen` 1. hata notu: `Market yedide açılıyor derken **Der Supermarkt wird um sieben aufgemacht** pek denmez …` → `Işığı aç derken **Mach das Licht auf** yanlış. **aufmachen** kapı ve pencere içindir. Işık için **Mach das Licht an** dersin.` Eski not, öğrencinin henüz görmediği bir cümle kuruluşunu (**wird aufgemacht**) yanlış örnek diye gösteriyordu; öğrenci bu hatayı yapamaz. Türkçe konuşanın gerçek tuzağı ışık: Türkçede kapı da ışık da açılır. Aynı ayrım `lx:ausmachen` ve `lx:zumachen` kartlarında kapatmak için zaten var; **anmachen** `lx:Licht` kartında gösterilmiş.
2. `lx:zumachen` 2. hata notu: `Doğrusu tek kelime: **die Tür zuzumachen**.` → `Doğrusu bitişik yazılır: **die Tür zuzumachen**.` Kalın kısım üç kelime; "tek kelime" yanlış okunuyordu.
3. `lx:Hotline` 2. hata notu: `Yardım hattında çalışıyor derken **in der Hotline** yanlış …` → `Yardım hattına telefon ettim derken **Ich habe der Hotline angerufen** yanlış. Doğrusu **Ich habe die Hotline angerufen**.` **in der Hotline arbeiten** Almancada kullanılan bir biçim, yanlış denemez. Yenisi Türkçedeki "-e telefon etmek" kalıbından gelen gerçek hata (`lx:anrufen` kartındaki **Ich rufe dir an** notuyla aynı çizgi).
4. `lx:Werktag` 2. hata notu: `İş günlerinde derken **in Werktagen** yanlış.` → `Sadece iş günlerinde açık derken **nur in Werktagen offen** yanlış. Doğrusu **nur an Werktagen offen**.` Aynı kartta **in drei Werktagen** doğru biçim olarak geçiyor; eski not kural gibi okununca onunla çelişiyordu.

**Açıklamalar (`exp`) ve ipuçları**
5. `lx:ausmachen` ve `lx:zumachen`: iki kartta aynı Türkçe söz (`Kapatmayı unutma derken`) iki ayrı Almanca biçim veriyordu (**auszumachen**, **zuzumachen**). `lx:ausmachen` `ipucu_tr`, boşluk 1 ve 4 ipucu: `Işığı kapatmayı unutma derken …`, `Işığı kapatmayı unuttum derken de …`. `lx:zumachen` `ipucu_tr` ve boşluk 1 ipucu: `Kapıyı kapatmayı unutma derken …`.
6. `lx:Hotline` `anlam_tr`: `bir firmanın sorular için aradığın telefon hattıdır` → `bir firmaya soru sormak için aradığın telefon hattıdır`. Eski cümle ilk okumada dağılıyordu.
7. `lx:Hotline` `ipucu_tr`: `Telefonla aramak **anrufen**, kayıp bir şeyi aramak **suchen** demektir.` → `Yardım hattını aramak için **suchen** değil, **die Hotline anrufen** dersin.` İpucu kartın kelimesini anlatmıyordu (OD-9.2 md. 4).
8. `lx:Werktag` `ipucu_tr`: `Resmî dilde cumartesi de **Werktag** sayılır.` → `Cumartesi de **Werktag** sayılır, ama her yer cumartesi açık değildir.` Gerekçe aşağıda (lex sorusu 1).
9. `lx:Raute` `ne_zaman_tr`: `Telefon menüsü numara girdikten sonra isteyince.` → `Telefon menüsünde, numarayı girdikten sonra basman istenince.` Eski cümlede numarayı kimin girdiği ve neyin istendiği anlaşılmıyordu.

**Almanca ve WORLD**
10. `lx:mitbringen` ö6: `Frau Brandl bringt uns oft etwas zum Essen mit.` → `Meine Nachbarin bringt mir oft etwas zum Essen mit.` (`Komşum bana sık sık yiyecek bir şeyler getiriyor.`) **uns** öğrenciye WORLD'de olmayan bir ev halkı ekliyordu; WORLD'de Brandl Hanım'ın getirdiği şey kurabiye, "sık sık yemek" yeni ayrıntı. Kural gereği adsız kişi.
11. `lx:Werktag` ö5: `… Ja, eigentlich schon. Nur Sonntag und Feiertage nicht.` → `… Ja, eigentlich schon. Aber viele Büros sind am Samstag geschlossen.` (`Ama birçok ofis cumartesi kapalı.`) Tanım `anlam_tr` içinde zaten var; örnek artık öğrencinin dışarıda karşılaşacağı durumu söylüyor. Eski çevirideki "bayramlar" da gitti (**Feiertag** kartı "resmî tatil günü").
12. `lx:rausbringen` ö1, ö2, ö5, ö6: katman `hd` → `alltag`. Kelime Duden'de konuşma dili diye işaretli; kartın `register` alanı `informal`. Aynı türden kartlarda (`lx:gucken`, `lx:runter`, `lx:dran`, `lx:kapieren`) bütün örnekler `alltag`.
13. `lx:Kontostand` 4. eşdizim: `der Kontostand am Geldautomaten` (bankamatikteki bakiye) → `den Kontostand am Geldautomaten sehen` (bakiyeyi bankamatikte görmek). Eski öbek bir söz kalıbı değildi; yenisi ö1 ile aynı.

**Türkçe çeviri**
14. `lx:rausbringen` ö3 ve 4. eşdizim: `Çöpü hemen çıkarıyorum, birazdan dönerim.` → `Çöpü çabucak çıkarayım, hemen dönerim.`; `çöpü hemen çıkarmak` → `çöpü çabucak çıkarmak`. **schnell** burada çabucak, **gleich** hemen; eski çeviride ikisi yer değiştirmişti.
15. `lx:Schalter` ö6 ve boşluk 4: `Işığın düğmesi kapının hemen solunda.` → `Işığın düğmesi solda, kapının yanında.` Almancada "hemen" yok; **links neben der Tür**.

**`also_ok` eksikleri (haksız ret riski)**
16. `lx:ausmachen` boşluk 1, 4: + **auszuschalten**; boşluk 3: + **ausgeschaltet**.
17. `lx:aufmachen` boşluk 4: + **zu öffnen** (boşluk 1'de **öffnen** zaten kabul ediliyordu).
18. `lx:zumachen` boşluk 1: + **zu schließen**; boşluk 3: + **geschlossen**.
19. `lx:rausbringen` boşluk 1: + **hinauszubringen**, **runterzubringen**; boşluk 2, 4: + **hinausbringen**, **runterbringen**.
20. `lx:wegwerfen` boşluk 4: + **wegschmeißen**; boşluk 5: + **weggeschmissen**.
21. `lx:Auskunft` boşluk 1–4: + **Information** (dördünde de artikel ve çekim tutuyor).
22. `lx:Kundenservice` boşluk 1–5: + **Kundendienst** (aynı artikel, beşinde de doğru).
23. `lx:eingeben` boşluk 2: + **eingetippt**; boşluk 3: + **eintippen**; boşluk 4: + **einzutippen**.

## Görev sorularına cevap
1. **Ayrılabilen fiil biçimleri:** dokuz fiilin (`ausmachen`, `aufmachen`, `zumachen`, `anziehen`, `mitbringen`, `rausbringen`, `wegwerfen`, `einzahlen`, `eingeben`) **zu** biçimleri, Perfekt ve yardımcı fiilleri tek tek okundu, yanlış yok: **auszumachen**, **aufzumachen**, **zuzumachen**, **anzuziehen**, **mitzubringen**, **rauszubringen**, **wegzuwerfen**, **einzuzahlen**, **einzugeben**; **hat ausgemacht / aufgemacht / zugemacht / angezogen / mitgebracht / rausgebracht / weggeworfen / eingezahlt / eingegeben**. 105 boşluk cevabının hepsi doğru. `also_ok` eksikleri yukarıda (16–23).
2. **OD-9:** terim, üç nokta, yasak sembol yok (tarama 0). 105 ipucunun kalın kısmı doldurulmuş cümlede harfi harfine geçiyor (betikle sınandı, sapma 0). 42 hata notunun hepsi kartın kendi kelimesini içeriyor. Kart içinde aynı Türkçe sözün iki Almanca biçim verdiği yer yok; iki kart arasında bir çakışma vardı (düzeltme 5). Kural gibi okunup kartla çelişen bir not vardı (düzeltme 4). Türkçe kişi ile Almanca kişi her notta ve ipucunda eşleşiyor. Yazım: "avro" ve "Hanım" biçimleri doğru.
3. **Lex'in açık soruları:**
   - `lx:Werktag`: tanım yasadaki gibi kaldı (pazar ve resmî tatil olmayan gün; cumartesi dâhil). Öğrenciyi yanıltan taraf, **werktags** yazan bir yerin cumartesi açık olacağını sanmak. Bu yüzden ipucu ve ö5 "cumartesi sayılır, ama her yer cumartesi açık değildir" diyor (düzeltme 8, 11). "Çoğu telefon hattı cumartesi kapalı" gibi sayısal bir iddia yazılmadı; kaynağı yok.
   - `lx:rausbringen`: `register` `informal` kaldı, dört örneğin katmanı `alltag` oldu (düzeltme 12).
   - `SOURCES.md` (6 satır, 53–58): ağ vardı.
     - Duden sayfaları okundu: **Werktag**, **werktags**, **Raute**, **Rautenzeichen**, **Dauerauftrag**, **Menü**, **rausbringen**. Hepsi karttaki bilgiyle örtüşüyor.
     - Yanlış adres düzeltildi: `duden.de/rechtschreibung/Raute` yok; doğrusu `Raute_Parallelogramm` (2. anlam: Kurzform für Rautezeichen). `Rautenzeichen` sayfası eklendi (Gebrauch: EDV, Telefonie).
     - BUrlG § 3: `gesetze-im-internet.de` adresi bu oturumda açılamadı (izin isteği yanıtsız kaldı). Madde metni aynı sözlerle `lexmea.de/de/gesetz/burlg/3` üzerinden okundu; satırda ikisi de yazıyor.
     - ITU-T E.161: adres arama sonucunda doğrulandı, öneri metni okunmadı. Yıldızın 0'ın solunda, karenin sağında olduğu `en.wikipedia.org/wiki/Telephone_keypad` üzerinden okundu ve satıra eklendi.
     - **Bank** çoğulu satırı: `Bank_Sitzgelegenheit` ve `deklination/substantive/Bank_Geldinstitut` adresleri arama sonucunda doğrulandı, sayfa içeriği okunmadı. **Überweisung** adresi de yalnız arama sonucuyla doğrulandı.
     - 50. ve 51. satırlar (**Bank** iki anlam, **Nebenkosten**) başka partilerin; dokunulmadı, "çevrimdışı doğrulanamadı" notları duruyor.
4. **WORLD:** `lx:Bank` ö2 `Derya hat mir geholfen, ein Konto bei der Bank zu eröffnen` WORLD yedek bölüm r4 ile (Bankkonto; Derya yardım eder) birebir örtüşüyor, kaldı. Brandl Hanım satırı olay ekliyordu, adsız komşuya çevrildi (düzeltme 10). Tobi yok. Öğrencinin ağzında sabit ad ya da cinsiyet yok.
5. **Bairisch/sued:** yok. Katmanlar yalnızca `hd` ve `alltag`. **Nee**, **nix**, **'nen**, **'ner**, **halt**, **guck** gündelik konuşma; depoda yerleşik biçimler.
6. **İleri gönderme:** yok. `a2-kesin.json` içinde 141. gün ve sonrasına atanmış kartların hiçbiri (**Brief**, **abholen**, **Sendung**, **Lieferung**, **Paket**, **Päckchen**, **Packstation**, **Absender**, **Empfänger**, **Briefmarke**, **zustellen**) partide geçmiyor. **konnte** 99. günün konusu, **dass** 85. günün.

## Değişen Türkçe alanlar (okur için)
- `exp`: `lx:ausmachen` (`ipucu_tr`), `lx:zumachen` (`ipucu_tr`), `lx:Hotline` (`anlam_tr`, `ipucu_tr`), `lx:Werktag` (`ipucu_tr`), `lx:Raute` (`ne_zaman_tr`).
- `mistakes_tr`: `lx:aufmachen` (1.), `lx:zumachen` (2.), `lx:Hotline` (2.), `lx:Werktag` (2.).
- `hint_tr`: `lx:ausmachen` b1, b4; `lx:zumachen` b1.
- Örnek ve boşluk çevirileri: `lx:mitbringen` ö6; `lx:rausbringen` ö3; `lx:Schalter` ö6, b4; `lx:Werktag` ö5.
- Eşdizim çevirileri: `lx:rausbringen` (4.), `lx:Kontostand` (4.).

## Kalan şüpheler (düzeltilmedi)
- `lx:Dauerauftrag` **einrichten** ve `lx:Kontoauszug` eşdizimindeki **drucken** sözlükte kart değil. **einen Dauerauftrag einrichten** kelimenin asıl eşdizimi, kart onu ipucu ve hata notuyla öğretiyor; bırakıldı. **drucken** aynı haftada öğrenilen **drücken** ile karışabilir; bankadaki makinede yazan söz olduğu için bırakıldı, lex isterse **holen** ile değiştirebilir.
- `lx:Werktag` ö1, ö4 ve 3. eşdizim **in drei Werktagen** "üç iş günü içinde" diye çevrilmiş. Almancası tam olarak "üç iş günü sonra"; gündelik kullanımda ikisi aynı işi görüyor, bırakıldı.
- `lx:Schalter` ö1 **zum Schalter drei**: anonslarda **zu Schalter drei** de duyulur; ikisi de doğru.
- `lx:Menü`: Duden telefon menüsünü ayrı anlam saymıyor (2. anlam ekrandaki seçenek listesi). Telefon hatlarında **Menü** sözü gerçekten duyulur; kart doğru, kaynak dolaylı.
- `lx:Stern` 1. hata notu: doğru biçim olarak **ein Hotel mit vier Sternen** veriliyor; **ein Vier-Sterne-Hotel** de doğru ve yaygın. Not yanlış değil, bırakıldı.
- Doğrulanamayan adres: `https://www.gesetze-im-internet.de/burlg/__3.html` (yukarıda).

## Sonuç
Dil açısından bulunan bütün hatalar dosyada düzeltildi, doğrulayıcı 0 hata. Açık soru yok.

Sonuç: KAPALI — okur bekliyor

## Okur dönüşü (2026-11-23)

Okurun geri çevirdiği 2 alan düzeltildi: `lx:Kundenservice` 1. hata notu (yanlış ile doğru arasında tek fark kaldı: **beim Kundenservices** → **beim Kundenservice**, sondaki **s** açıklanıyor; `lx:Hotline` notuyla çelişmiyor) ve `lx:anziehen` boşluk 5 (`Es ist kalt, ich ___ noch einen Pullover ___.`, giyme eylemi açık; **tragen** ipucuyla çelişmiyor). Doğrulayıcı 0 hata. Sonuç: KAPALI — okur bekliyor
