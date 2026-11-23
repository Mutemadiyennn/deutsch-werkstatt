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

## Okur geri dönüşleri (2. tur, yalnız geri dönenler)

Kaynak: `docs/v2/reviews/okur/a2-hafta-10.md` (24 GERİ). Hepsi kapatıldı; ayrıca 1. turun B1'i kapandı.

**Gün dosyaları ve test (11)**
1. 70 sınav m[0] ve test t11 "Sonra normal cümle gelir." → "Ardından cümle değişmeden gelir: **am Freitag geht es**." / "… **das Wetter ist schön**."
2. 70 sınav m[7]: açıklamadaki sıra kabulde yoktu → "Am Dienstag von neun bis zwölf gibt es kein Wasser." kabule eklendi (doğru Almanca); açıklama "Su yok: **es gibt kein Wasser**. Ne zaman: **am Dienstag von neun bis zwölf**."
3. 65 sahne `cevapla.why_tr` → "Hayır de, sonra planını söyle: **Ich gehe nach Hause.**" (cevaptaki söz, tek fikir).
4. 66 prova n6 geri bildirim → "Nereye sorusunda **an der Wand** olmaz. Resmi kanepeye koy: **auf das Sofa**."
5. 69 sesler[1] `cevapla.situation_tr`: 22 sözcük, parantez, eylem sorusuyla çelişki → beş kısa cümle; "Önce adını söyle. Doğum tarihini sonra söylersin." (eylem sorusuyla aynı).
6. Test t01 → "Tobi'nin telefonunu masaya koydun."
7. 64 sınav m[2] (benim 1. turdaki "…" kusurum) → "**fängt** ve **an** birlikte başlıyor demek. **an** en sonda."
8. 67 sınav m[4], m[10] (üç fikir) → "**gelegt** en sonda durur." / "**gestellt** en sonda durur."
9. Test t07 "Onun için" → "Komşun için **ärgert sich** dersin."

**Okurun dilbilimciye notları**
- 70 m[8] `why_tr`: "Önce … Sonra …" yanlış sıra çağrıştırıyordu → "Ne zaman: … Ne oluyor: …".
- 66 m[10] "Günün provası" etiketi (provada musluk mutfakta, priz banyoda) kaldırıldı.
- 70 a2 "wegen meinem Termin": 1. turdaki karar geçerli (konuşma biçimi; yazı biçimi kabulde).
- 70 yazma denetimindeki **hat nicht gepasst** yalnız örnek metinde geçiyor; zorunlu değil, dokunulmadı (takip).

**Dil noktaları gr:a2-02:t1–t5 (13 alan)**
9. haftadaki a2-01 biçimi: `h_tr`, `tr`, `table.head` terimsiz, sembolsüz, her cümle ≤14 sözcük; örnekle anlatım (masada → auf dem Tisch, masaya → auf den Tisch). Tablo satırları ve örnekler aynı; yalnız t2'de iki satır etiketi "Wo? (Dativ)" → "Wo? Nerede?", "Wohin? (Akkusativ)" → "Wohin? Nereye?". Başlıklar: t1 "Nerede, nereye: auf dem Tisch, auf den Tisch", t2 "Kısa biçimler: im, ins, am, ans", t3 "Koymak ve durmak: stellen, stehen, legen, liegen", t4 "Koydum, astım: gestellt, gelegt, gehängt". t4'ten "gehangen" notu çıktı (bu hafta istenmiyor).

**B1 kapandı (havuz).** 67 radyosu "Wegen der Kälte … zu" → "Wegen der **Heizung** ist das Schwimmbad am Samstag und Sonntag **noch** zu." Böylece 65'teki "ab Samstag wieder offen" haberinin ertelendiği anlaşılıyor; sebep ocakta inandırıcı. Heizung 59–60'ta öğretilmiş. Birlikte güncellenenler: çeviri, orta dikte, ayrıntı sorusunun seçenekleri, cevap görevinin durumu, üç kabulü ve açıklaması, sınav m[2] sesi ("Wegen der Heizung bleibe ich heute zu Hause."), kabulleri ve açıklaması. Haftada "Kälte" kalmadı.

Denetimler (2. tur sonu): dikiş `İhlal: 0`; val.sh yalnız üç izinli sınıf (156 satır); content:validate yalnız iki şema sınıfı.

## Örneklem notları (3. küçük tur)

Kaynak: `docs/v2/reviews/orneklem/a2-hafta-10.md` (GEÇTİ, 1/30; öğretmeden isteme bulgusu).

**Stadion ve Karton (öğrencinin yazdığı ya da söylediği her yerden çıktı)**
- 65 görev: "Das Spiel ist am Samstag um drei im Stadion." → "Das Spiel vom Verein ist am Samstag um drei." (vom günün kısa biçimi). Usta dikte (sesler[1] d4) c3 yerine c5'e bağlandı: "Wir freuen uns auf ein schönes Wochenende!". Zor diktenin bankasında Stadion yoktu. Stadion yalnız dinleme metninde, bir kolay dikte çeldiricisinde ve yalnız Spiel'i soran orta diktenin gösterilen cümlesinde kaldı.
- 67 usta dikte (sahne d4) s6 yerine s4'e bağlandı: "Ihre Jacke habe ich an die Garderobe gehängt." Gerçek dikte iki cümleye indi (ceket ve anahtar; zorunlu Garderobe, Schublade). 68 sınav s4 → "Wer hat das Fahrrad in den Keller gestellt?". Karton yalnız 67 dinleme satırında ve 68 provasında (Hazırlık adımında gösteriliyor) kaldı.

**Örneklem notları 1–5**
1. 68 geri arama: açılış "Ah, hallo! Passt es Ihnen gegen fünf?", durum metnine "Adını söyledin." eklendi.
2. 69: kuaförü arayan kişi artık adsız müşteri ("Ah, guten Morgen!"; soru ve gerçek dikte "müşteri", örnek "Eine Frau kann am Dienstag nicht."). Frau Huber haftada yalnız muayenehane sekreteri. B5'in bu maddesi kapandı.
3. 66 gerçek dikte: "Herr Pichler'in anlattıklarını iki kısa cümleyle yaz."
4. Test t06: "Wir haben das Bild gestern an die Wand gehängt." kabule eklendi.
5. 70 s10: "Am Freitagvormittag passt es mir gut." kabule eklendi.

**Tarama: istenen yerlerde sözlükte olmayan sözcük**
Bakılan yerler: görev cümleleri, `accepted[0]`, orta/zor/usta dikte hedefi, gerçek dikte örneği ve zorunluları, sınav cevapları, yazma örneği, test ve görülmemiş. Ölçü: kart (o güne kadar), o kartın eşdizimi, günün dil noktası tablosu ve örnekleri, 9. haftada geçmiş olması.

Değiştirilenler (öğretilmiş sözcükle):
- 64 sınav diktesi "Der **Fisch** war gestern zu salzig." → "Das **Brot** war …".
- 65 görev "im **Gasthaus**" → "im Fernsehen"; "über die **Blumen**" → "über den Kuchen"; gerçek dikte örneği ve zorunlusu **Probetraining**, **Studio** → "Ioana ist neu im Fitnessstudio." (zorunlu Fitnessstudio).
- 67 görev "den **Tee**" → "den Kaffee".
- 69 görev "den **Zettel** an den **Kühlschrank** gehängt" → "die Nachricht an die Tür gehängt"; "per **SMS**" görev cümlesinden çıktı ("Könnten Sie mich bitte am Freitag an den Termin erinnern?").

Öğretilmiş sayılanlar (dokunulmadı): Papier (`lx:Drucker` eşdizimi), Salz (`lx:geben` eşdizimi), Garderobe (`lx:hängen` eşdizimi, günün dersi), Brille (t4 örneği), Ruhezeit (t5 tablosu), Hof, Tonne, Post, Fußball (9. haftada geçti), Wasserzähler (Wasser + günün kartı Zähler), Anruf (anrufen).

**Emin olamadıklarım (karar ve lex işi).** A1 gün dosyaları (8–56) bu ağaçta yok; A1'de geçip geçmediklerine bakamadım. Sözlükte kart ya da eşdizim olarak yoklar ve günün omurgası oldukları için değiştirmedim:
- **Suppe** (64: iki görev, usta dikte, gerçek dikte zorunlusu, cevap). Öneri: `lx:salzig` eşdizimine "die Suppe ist salzig".
- **Teller** (64 sınav s11 cevabı), **Tablett** (64 usta dikte ve gerçek dikte örneği). Öneri: `lx:Kantine` eşdizimi.
- **Schublade** (67: orta dikte, cevap, sınav s9, yazma, gerçek dikte zorunlusu). Öneri: `lx:Schlüssel` eşdizimine "in die Schublade legen" ya da t4'e örnek.
- **Stadtwerken** (65 usta dikte, ses satırının tamamı), **SMS** (69 usta dikte; Türkçede aynı sözcük).

Denetimler (3. tur sonu): dikiş `İhlal: 0`; val.sh yalnız üç izinli sınıf (154 satır; iki "bilinmeyen" azaldı); content:validate yalnız iki şema sınıfı. Aynı Almanca cümle iki kez geçmiyor (üç bilinçli eşleşme dışında); üretimde `accepted` ≥ 3.

**İÇ-8 kararı uygulandı (4. küçük tur):** Suppe, Fisch, Tablett, Teller, Schublade, Stadtwerken, SMS, Messern haftanın bütün Almanca metinlerinden çıktı (dinleme satırları dahil; dikte, soru, seçenek, çeviri ve kabuller birlikte güncellendi): 64'te yemek Fleisch ve Gemüse, Derya'nın isteği Kaffee, Tablett → Tasse, Teller → Tassen, Messern → Löffeln; 65 ve 67'de "von der Firma"; 67'de Schublade → Schrank (yazmada kahve "ins Regal"); 69'da "Ich schicke Ihnen am Mittwoch eine Nachricht." Dikiş `İhlal: 0`, val.sh üç sınıf, content:validate iki sınıf, aynı cümle yok. "Emin olamadıklarım" listesi böylece kapandı.

## Hafta kapısı (5. tur)

Kaynak: `docs/v2/reviews/a2-hafta-10-kapi.md` (`kapi10.sh` ile yeniden üretildi). **Sonuç: GEÇTİ.**

| Ölçüt | Önce | Sonra |
|---|---:|---:|
| Öğretilmeden istenen, kesin | 38 | 0 |
| Öğretilmeden istenen, sınırda | 19 | 0 |
| Anlaşılmayan karşı soru | 30 | 0 |
| Hafta sonu testi | %83 (10/12) | %100 (12/12) |
| Görülmemiş durum | 1/4 | 7/7 |
| Sınanmayan can_do | 64, 65, 67 | yok |

Denetimler: dikiş `İhlal: 0`; val.sh yalnız üç izinli sınıf; content:validate yalnız iki şema sınıfı; hafta içi tekrar eden cümle yok (üç bilinçli eşleşme dışında).

**Değişen cümleler (öğretilmemiş sözcük çıktı):**
- 64: "Das Salz steht auf dem Tisch, aber …" → "Das Gemüse ist gut, aber das Fleisch ist zu salzig."; "… neben den Löffeln" → "Die Gabeln sind im Regal neben der Tür."; sahne cevabı "Wo ist das Salz?" → "Wo ist das Brot?" (masada, kahvenin yanında); okuma "Brot steht auf jedem Tisch."
- 65: Papier → Schlüssel ("Der Schlüssel liegt im Schrank unter dem Drucker.", sınav s8 de); "Ich treffe Basti …" → "Ich bin am Abend mit Basti im Fitnessstudio."; "Tobi spielt … Fußball." → "Tobi ist am Mittwoch immer im Verein."; okuma cevabı "Mein Zähler ist im Bad."
- 66: "… neben den Büchern" → "… neben der Lampe"; "Ich hole ihn." → "Ich bringe ihn."
- 67: Garderobe → "in den Schrank gehängt" (görev, sahne satırı ve usta dikte, sınav s1, soru seçeneği "Dolapta"); Brille → Handy; Kellerschlüssel → "Schlüssel für den Keller"; sahne cevabında model "Sehr gut, danke! Vielen Dank für die Hilfe!" (fühle biçimleri kabulde).
- 68: "Angst vor dem Anruf" → "vor dem Telefon"; provada Kartons → Papier; "im Hof" → "hinter dem Haus" (prova, okuma, sınav s1 ve s11).
- 69: "Nein danke, ich schreibe es auf." → "Nein, danke. Ich habe den Termin im Handy."; yazma kapanışı "Viele Grüße" → "Vielen Dank!".
- 70: sınav s9 "… putzt eine Firma den Keller." → "… kommt eine Firma in den Keller."
- Test t02 "in den Hof" → "hinter das Haus". Görülmemiş g3: Tonnen ve Papiertonne → Mülltonnen, "Mülltonne für Papier".

**Karşı tarafın replikleri (öğretilmiş sözcüklerle; ünlemler çıktı):** 64 "Kannst du mir einen Kaffee bringen?", provada "Hallo! Ist der Platz hier noch frei?" ve "Jetzt habe ich keine Gabel."; 65 "Gehst du heute noch ins Schwimmbad?", "Der Zähler für Wasser ist im Bad." ("Hm" çıktı), "Wo ist denn Ihr Zähler für Wasser?"; 66 "Aha" çıktı, "Und jetzt die Klingel: …"; 67 "Und wie ist die Wohnung? Gut?", "Haben Sie eine Frage?", "… an die Wand neben der Tür gehängt."; 68 "Hallo! Passt es Ihnen gegen fünf?", "Und das Papier vor Ihrer Tür? Das muss auch weg.", "Das Papier kommt in die neue Mülltonne. Die steht ab Montag hinter dem Haus."; 69 "Guten Tag, hier ist Luka.", "Hm" çıktı; görülmemiş g1 "Praxis Dr. Winter, guten Tag?", g4 "hier ist Frau Sommer".

**Gösterilen biçimler (yeni kalıp satırları, 13):** 64 h1 "Hast du auch großen Hunger? – Ja, großen Hunger!"; 64 h2 "Was gibt es heute? – Heute gibt es …"; 65 h2 "Sie freut sich über …"; 65 h3 "Dann frage ich … – Ich frage sie." ve "… schicke es an Herrn …"; 66 h2 "Der Wasserhahn tropft."; 67 h1 "… – Ich sorge für …" ve "Leute aus der ganzen Welt"; 67 h3 "Wie fühlst du dich?"; 68 h2 "Papier kommt in die neue Mülltonne."; 69 h1 "Geht es an einem anderen Tag?"; 69 h2 "Ich setze mich ans Fenster. – Setz dich doch!"; 70 h1 "Das hat nicht gepasst." Dil noktası tablosuna satır eklenmedi.

**Yeni görülmemiş durumlar:** g5 (cd:m1:64, başka bir firmanın kantini, Herr Castillo kaşıkları soruyor), g6 (cd:m1:65, otobüste Frau Novak hafta sonunu soruyor), g7 (cd:m1:67, otelde Herr Demir, anahtarı nereye koyduğunu sor). Her birinde 5 kabul.

**Kalan sınırda: yok.**

**Bu turun getirdikleri (okur ve örneklem bu satırları görmedi):** 13 kalıp satırının Türkçesi, g5–g7'nin `durum_tr` ve `why_tr` metinleri, g1 ve g4'ün yeni adları, 64 ve 67 cevap görevlerinin yeni durum ve açıklama metinleri, yukarıdaki değişen cümlelerin çevirileri. On bir halkada kalıp sayısı 3'e çıktı (11 yeni satır, 2 genişletilmiş satır). 68 h2 kalıbı Papier sözcüğünü öğretiyor (sözlükte kart değil): kalıcı çözüm lex'te eşdizim.

## Sonuç

**ONAY.** Dil, okur ve örneklem geri dönüşleri kapandı. Baş geliştiricide kalan: B4 (dikte, kod ya da satır bölme), B3 (67 başlığı a2-kesin.json'da); B2, B6, B7 takip.
