# A2 10. hafta (gün 64–70) — dilbilimci incelemesi

Tarih: 2026-11-23 · inceleyen: dilbilimci-ajan · tek tam tur.
Dosyalar: `content/v2/m1/gun-64…70.json`, `hafta-sonu-testi-10.json`, `gorulmemis-10.json`, `registry/grammar.json` içinde `gr:a2-02:t1…t5`.

- İncelenen madde: **862** (Almanca taşıyan alan ve bağımsız Türkçe alan; beş dilbilgisi konusu dahil).
- Bulunan ve düzeltilen hata: **97** → oran **%11,3** (97/862).
- Denetimler (son durum): dikiş denetçisi `İhlal: 0` (7 gün). Şema dalı doğrulayıcısında bu dosyalarda yalnız üç izinli sınıf var ("bilinmeyen", "N kart (4–6)", "kapıdan geçen görev cümlesi"); satır sayısı inceleme öncesiyle aynı (156). `npm run content:validate`: bu dosyalarda yalnız `day — Too big` (7) ve `dersler.0` (5). Mülltonne, Wasserhahn, Steckdose kaynaklı hata: **0**.
- Aynı Almanca cümle (alanın tamamı) hafta içinde iki kez geçmiyor. Kalan üç eşleşme bilinçli: 67 ve 69'da cevap sorusu sahnenin son satırını tekrar ediyor, 70'te Frau Schneider'in telefon açılışı.
- `review.status` değiştirilmedi ("draft").
- Öğrenciden istenen cümlelere öğretilmemiş sözcük ya da yapı eklenmedi; değişen her görev cümlesi dikiş denetiminden geçti.

## Ek işler

**(a) 68'in dil noktası 69'da iki görevle dönüyor.**
- h1, kart erinnern: "Die Praxis erinnert mich per SMS an den Termin am Montag." → **"Könnten Sie mich bitte per SMS an den Termin erinnern?"** ("erinnert mich" biçimi aynı halkanın üçüncü görevinde duruyor.)
- h2, kart sonst: "Ich rufe heute noch an, sonst ist der Termin weg." → **"Man muss heute noch anrufen, sonst ist der Termin weg."**
İkisi de yalnız öğretilmiş sözcüklerle; kalıplar değişmedi.

**(b) Yazarın kuşkuları.**
- "wegen dem Termin" (70): kabulde kaldı. Konuşmada olağan biçim bu, sözlük kaydı (`lx:wegen`) da böyle öğretiyor. Yazı biçimi reddedilmesin diye "wegen meines Termins" eklendi. Öğrenciye 67'de yalnız "wegen der …" çerçevesi verildi; eril adla model cevap bu yüzden konuşma biçiminde bırakıldı.
- legen biçimleri: sorun yok. Bu haftada öğrenciden istenen biçimler "lege" (66 kalıbı) ve "gelegt" (67 dersi ve kalıbı). 66 sınavına yalnız kabul olarak "Legen Sie sie bitte auf den Tisch." eklendi; istenmiyor, yazarsa reddedilmiyor.

## A — Düzeltilenler (önce → sonra, gerekçe)

### gün 64 (10)
1. Sahne başlığı "Kulak kapısı: kantinede öğle arası" → "Kantinde öğle arası" (iç söz).
2. "Kantinede / Kantinenin" (9 yer) → "Kantinde / Kantinin" (Türkçesi kantin).
3. Seçenek "Kantinine" → "Kantine".
4. `accepted`: "Es ist schon **halb ein Uhr**." (yanlış Almanca) → "zwölf Uhr dreißig".
5. "… nereye gidiyor?" (kalıp, görev, sahne, soru, gerekçe; 6 yer) → "nereye konuyor?" (kommen = konmak; 9. haftadaki kararla aynı).
6. s9 sahne notu: Herr Wimmer "yerden bir şey alıyor", ama "Es liegt unter dem Tisch" diyor → "eğilip masanın altına bakıyor".
7. a1 c3 çeviri "Siz kantine gidiyor musunuz?" → "Siz şimdiden kantine mi gidiyorsunuz?" (schon).
8. Tepsinin yeri: anons "Regal neben der Tür", kapıdaki not "Regal am Fenster" → not, seçenekler ve kabuller "neben der Tür".
9. s3 `why_tr` "**fängt** başta" (ikinci yerde) → "**fängt … an**: başlıyor. **an** en sona gider."
10. Orta dikte d2: `de` satırın ikinci cümlesini içermiyordu → eklendi.

### gün 65 (9)
1. `can_do.tr` 15 sözcük → 10.
2. Sahne başlığından "Kulak kapısı" çıkarıldı.
3. Kalıp çevirisi "Wir freuen uns." = "Biz de seviniyoruz." → "Seviniyoruz."; "Sen de bekliyor musun?" → "Sen de seviniyor musun?".
4. Sahne notu "akşam" iken Ioana "Am Abend sehe ich das Spiel" diyor → "iş çıkışı".
5. "Burada su nerede var?" → "Peki burada su nerede?".
6. s12 "Bis Mittwoch!" (çarşamba için söz yok; Basti o akşam kulüpte) → "Bis bald!".
7. Radyo c5 "Wir freuen uns auf …" = "dileriz" → "dört gözle bekliyoruz" (günün kalıbı).
8. Prova kapanışı yalnız bir yolu anlatıyordu (ikinci seçenekle cuma hiç sorulmuyor) → yoldan bağımsız metin.
9. İki `why_tr` ("**ins**: in das. Nereye." ve "**vom Flur** von dem Flur.") tek okumada anlaşılır hâle getirildi.

### gün 66 (12)
1. `can_do.tr` 21 sözcük → 8.
2. Sahne başlığından "Kulak kapısı" çıkarıldı.
3. "Posta kutusunda daha hiç ad yok." → "… henüz ad yazmıyor."
4. h3 "Saat yedi" (Ioana da yedide geliyor ve musluk o sırada hâlâ damlatıyor) → "Saat sekiz".
5. "Şuradaki pencerenin yanındaki lamba" → "Pencerenin yanındaki şu lamba".
6. Ana fikir seçeneği "Senin dairendeki işleri ve yarını" → "Dairendeki tamir işlerini ve yarını".
7. "Yine çalışıyor mu?" (2 yer) → "Düzeldi mi?" (wieder).
8. "sayaç adamı" (2 yer) → "sayaçlar için adam".
9. `why_tr` "Kısa cevap yeter … Kimin yaptığını da söyle." (çelişkili) → "Önce **Ja, er geht wieder** de. Sonra kimin tamir ettiğini söyle."
10. Eylem gerekçesi "Telefonun yanında olmalı." → "olmalısın."
11. Yazma denetimi "Geçmişi yazdın mı?" → "Tamir edildiğini yazdın mı?" (terim).
12. s9 `accepted`: "Legen Sie sie bitte auf den Tisch." eklendi (haksız ret).

### gün 67 (16)
1. `can_do.tr` 15 sözcük → 8.
2. Sahne başlığından "Kulak kapısı" çıkarıldı.
3. `accepted` "Am Freitag, wer sorgt für den Kaffee?" (bozuk dizim) → "Wer sorgt denn am Freitag für den Kaffee?".
4. `accepted` "… ein paar Dinge **kaufen**" (Türkçesi "yapmam gerek"; yanlış kabul) → "… ein paar Sachen machen".
5. "Kısa bir süre içeri gelebilir miyim?" → "Bir dakika içeri girebilir miyim?".
6. h2 sahnesinde öğrenci anahtarı soruyor; ana sahnede Frau Brandl anahtarın yerini zaten söylüyor → sorulan eşya **Brille** (aynı halkanın görev sözcüğü), soru "Gözlük nerede?".
7. h3 "Gece" (yaşlı komşu gece aranmaz; prova da "akşam") → "Akşam".
8. "ich fühle mich gut" = "iyiyim" → "kendimi iyi hissediyorum"; "die Bilder im Flur an die Wand" = "koridordaki resimleri" → "resimleri koridorda duvara".
9. a1: kabule "in die Schublade von deinem Tisch" eklendi; `why_tr` "Geçmişte koymak" → "Koydum demek için".
10. Prova n2 "Ist etwas nicht gut?" (Almancada söylenmez) → "Stimmt etwas nicht?".
11. Geri bildirim "dün öğrendiğin kalıp" (65'te öğretildi) → "önceki günlerden bildiğin kalıp".
12. Yazma: "Das Papier habe ich in den Schrank **gestellt**" ve "Kâğıt dik durur" (kâğıt yatar; legen) → eşya **Kaffee** ("Den Kaffee habe ich in den Schrank gestellt"); mesaj, görev, soru ve denetim uyarlandı. Kahve aynı günün hikâyesinden.
13. s5 `why_tr` "Geçmiş: …" → "Koydun: **hast gelegt**."
14. s6 `accepted` "…, schau!" dolgu varyantı → "Ich habe das Bild übers Sofa gehängt."
15. s7 `accepted`: "Komm herein, es ist kalt!" eklendi.
16. s11 "Günün provası" diyordu ama prova Frau Brandl'la telefon; ayrıca koliyi bodruma Herr Pichler koymuştu → etiket kalktı, soru bisiklet oldu ("Wohin haben Sie Ihr Fahrrad gestellt?").

### gün 68 (15)
1. `goal_tr` "Hausmeister'den" → "apartman görevlisinden".
2. `can_do.tr` 16 sözcük ve "…" → 10 sözcük.
3. Sahne başlığından "Kulak kapısı" çıkarıldı.
4. "Schaffen Sie das bis zwölf?" = "yetişir mi?" → "yetiştirebilir misiniz?".
5. `accepted` "In die neue Mülltonne muss man das Papier bringen." → "Man muss Papier in die neue Mülltonne bringen."
6. Çöp ve kâğıt için "gidecek / gidiyor / gittiğini" (5 yer) → "atılacak / atılıyor / atıldığını".
7. h3 görevi radyo satırıyla ve hafta testinin sesiyle aynı cümleydi ("Könnten Sie die Musik bitte nicht so laut machen?") → "Könnten Sie am Abend bitte nicht so laut sein? …".
8. "Bisiklet bodruma gitmeli" → "konmalı".
9. "Nein. Herr Pichler sagt dann …" = "Hayır. … o zaman şöyle der" → "Duramaz. Yoksa Herr Pichler şöyle der".
10. s1 "Mahlzeit!" = "Afiyet olsun!" → "İyi öğlenler!" (haftanın geri kalanıyla aynı); "yüzü biraz utangaç" → "biraz mahcup görünüyor".
11. s6 "Am **Mittwoch** war das Spiel" (65'te maç salı akşamı) → **Dienstag**.
12. a1 c5 "kısaca geri arayın" → "Lütfen beni bir arayın."
13. Okuma: ayakkabı yasağı yalnız cumartesi için yazılmıştı; halka sahnesi ve sınav genel kural diyor → "Bitte stellen Sie keine Schuhe mehr vor die Tür."; soru uyarlandı.
14. s6 `why_tr` "Fiil en sonda" → "**stellen** en sonda".
15. Derya'nın WORLD cümlesinin çevirisi "Almanca, sen bunu başarırsın." → "Almanca konuş, başarırsın."

### gün 69 (16)
1. `can_do.tr` 16 sözcük → 13.
2. Sahne başlığından "Kulak kapısı" çıkarıldı.
3. Ek iş (a): iki görev cümlesi değişti (yukarıda).
4. "Ich habe wenig Zeit!" = "Çok az vaktim var!" → "Vaktim az!".
5. Tobi "cumartesi öğlen" arıyor, ama "cumartesi sabahı" kuaförde buluşmanın kaydığı zaten biliniyor → arama "sabahı", kuaför "öğlene doğru".
6. "Meine Schwester hat Geburtstag." (WORLD'de Tobi'nin kız kardeşi yok; kural İÇ 7013446061) → "Ein Freund hat Geburtstag."
7. "Cumartesi başka bir randevunuz var mı?" (iki anlamlı) → "başka boş randevunuz".
8. "Başka olarak çarşamba … bir boşluğum var." → "Bunun dışında çarşamba saat dörtte boş yerim var."
9. s5 çeviride "halt" yoktu → "O zaman ne yapalım, perşembe beşte."
10. "Fasching'den önce" açıklamasızdı → "karnavaldan (Fasching) önce"; seçenek "karnavaldan önce".
11. s9 "Das ist halt so **im Februar**" (10. haftanın cumartesisi 30 Ocak) → "Das ist halt jedes Jahr so, ne?".
12. "ben Huber Hanım" → "ben Huber".
13. Geri bildirim "Luka seni tanımıyor gibi: önce …" → iki kısa cümle.
14. Prova n3 "Moment … Mittwoch" (sembol; seslendirmede sorun) → "Moment. Mittwoch …"; çeviri de.
15. Üç `why_tr`: sözlük biçimi "jemanden an etwas erinnern", "kibar oturun daveti", "Asmak geçmişte" → örnek cümle ve karşılığı.
16. s11 "Günün provası" etiketi (prova Luka'yla, soru Frau Huber'le) kaldırıldı.

### gün 70 (11)
1. Sahne başlığından "Kulak kapısı" çıkarıldı.
2. "Haftanın kapısı" (prova başlığı ve s11) → "Haftanın provası".
3. "Die Miete in Wendlfing ist nicht so hoch wie **in der Stadt**" (Wendlfing de şehir) → "wie in München".
4. s8 "Ich hoffe, das ist nicht so lange!" → "… das **dauert** nicht so lange!".
5. "heute noch" = "bugün" → "bugün içinde".
6. a2 c3 "Wir sprechen gleich mit Ihnen." (bekleme anonsunda söylenmez) → "Wir sind gleich für Sie da."; zor dikte bankası, kabuller ve çeviri uyarlandı.
7. a2 `accepted`: "Ich rufe wegen meines Termins an." eklendi.
8. Prova n3 "Moment … Donnerstag" → "Moment. Donnerstag …".
9. Yazma: Derya "Wann **warst** du im Rathaus?" diye soruyor, cevap randevunun cuma olacağını söylüyor → "Wann **bist** du im Rathaus?".
10. s7 `accepted`: "Ich hoffe, du bist bald wieder gesund." eklendi.
11. s8 `accepted` "Am Dienstag ist von neun bis zwölf kein Wasser." → "… gibt es von neun bis zwölf Uhr kein Wasser."

### hafta sonu testi 10 (6)
1. t02 `why_tr` "Fiil ikinci yerde" → "**stellen** ikinci yerde".
2. t05 ses "Am Mittwoch **ist** … kein Wasser im Haus." → "**gibt es** …"; bir kabul de.
3. t06 "Cümleyi geçmiş zamanla söyle." → "Bunu dün yaptınız. Cümleyi öyle söyle."; `why_tr`'den "Geçmişte" çıktı.
4. t08 "Çöp çöp bidonuna gidiyor." → "Çöp, çöp bidonuna atılır."
5. t10 `accepted` "Könnten Sie bitte mich …" (yanlış sıra) → "Könnten Sie mich an den Termin erinnern, bitte?".
6. t12 "Menü" → "Yemek listesi" (hafta boyunca kullanılan karşılık).

### görülmemiş 10 (1), grammar t1–t5 (1)
- g3 "kâğıt bidonuna gidiyor" → "atılıyor". Başka hata yok.
- t5 örnek çevirisi "çöp konteynerine" → "çöp bidonuna" (günlerle aynı karşılık). Beş konunun Almanca örnekleri, tabloları, hâlleri ve Türkçe karşılıkları doğru.

## Diğer ölçütler
- Öğrenci satırlarında sabit ad ya da cinsiyet yok; telefon açılışları `{name}` ile. Ses metinlerinde yer tutucu yok.
- Bairisch yok. "Grüß Gott" kaynaklı; "Brezen", "in der Arbeit", "Mahlzeit" güney standardı.
- Kişisel bilgi, kurs ya da kitap adı yok. İngilizce yalnız görsel istemlerinde (öğrenciye görünmez).
- Üretim maddelerinde `accepted` ≥ 3; yinelenen kabul yok.
- Gerçeklik: sayaç okuma (elektrik bodrumda, su dairede; evde olmayan haber verir), Hausordnung (gece sessizliği 22–6, merdivende bisiklet, bidonun yanına çöp), muayenehane ve kuaför randevusu, Rathaus saatleri (hafta içi 8–12, perşembe öğleden sonra) gerçeğe uygun.

## B — Kararı baş geliştiriciye

1. **67 radyosu: "Wegen der Kälte ist das Schwimmbad am Samstag und Sonntag zu."** Ocak sonunda bu bir kapalı havuz; soğuk yüzünden kapanması inandırıcı değil. 65 radyosu da "ab Samstag wieder offen" diyor. "wegen der Kälte" sınav diktesinde ve bir cevabın kabullerinde geçtiği için dokunmadım. Öneri: sebep değişsin ya da 65'teki açılış haberi çıksın.
2. **"ne?" Bavyera'da az duyulur** (yerlisi "oder?" ya da "gell?" der). Müfredat kararı (69'un çerçeve sözcüğü). Luka için uygun; Tobi'nin ağzında (69 s10) yapay duruyor.
3. **67 başlığı "Koymak ve asmak geçmişte: …"** terim taşıyor; başlık `a2-kesin.json`'dan geliyor, o dosya bende değil. Öneri: "Koydum, astım: gestellt, gelegt, gehängt".
4. **Dikte.** Usta düzeyde beş madde iki cümleli satıra bağlı, kabul yalnız bir cümle (66 v1 ve a1, 68 v1 ve a1, 69 v1). Satırın tamamını kabule eklemeyi denedim; şema dalı doğrulayıcısı "başka bir cümle" diye reddediyor, geri aldım. Zor düzeyde de dört madde böyle (64 v1 d3, 68 v1 d3, 70 a1 d3, 70 a2 d3). Çözüm kodda ya da satırları bölmekte.
5. **WORLD'de olmayan ayrıntılar** (akraba değil): Basti'nin kulüpte oynaması (65), Frau Huber'in Luka'nın müşterisi olması (69), yedek anahtarın Frau Brandl'da durması (65). Kalacaksa WORLD'e yazılmalı.
6. **69:** ana sahnede cumartesi kuafördesin, provada salıya saç randevun var ve onu cumartesiye alıyorsun. Çelişki değil ama iki randevu yan yana tuhaf.
7. **70 a1:** "Den Termin am Montag sagen wir ab." Muayenehane için alışılmış söz "streichen"; öğretilmiş sözcüklerle daha iyisini kuramadım, bıraktım.
8. **OD-9, grammar t1–t5:** metinler dilce doğru, ama uzun paragraf, tırnak içinde Almanca, ok işareti ve terim (Dativ, Akkusativ, Perfekt) içeriyor. Bütün dilbilgisi kaydı bu biçimde; okur turunun işi.

## Sonuç

**AÇIK.** Dil yönünden kapandı: bulunan 97 hatanın hepsi düzeltildi, üç denetim temiz. Açık kalan B1 (havuz) ve B4 (dikte) karar bekliyor; B2, B3 ve B5–B8 takip işi.
