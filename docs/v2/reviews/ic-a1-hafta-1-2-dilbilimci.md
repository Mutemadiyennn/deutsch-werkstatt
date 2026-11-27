# [İÇ-A1] 1.–2. hafta kendini tanıtma eklemeleri: dilbilimci incelemesi (PM-148)

Tarih: 2026-11-27 · İnceleyen: dilbilimci-ajan · Kapsam: `git diff origin/main -- content/v2/` (gün 02, 06, 07, 12, 13, 14; `hafta-sonu-testi.json`, `hafta-sonu-testi-02.json`; `registry/lexicon/batch-018.json`, lx:Wohnort ve lx:Alter; `curriculum/a1-kesin.json` satırları; `registry/lexicon/SOURCES.md` satırı).

## İncelenen madde: 23
gün 02: kalıp 1, görev cümlesi 1, prova düğümü n3c (2 seçenek) · gün 06: görev cümlesi 2, prova n6b · gün 07: kalıp 1, görev cümlesi 2, prova n4b, sınav s12 · gün 12: kalıp 2, görev cümlesi 2 · gün 13: prova n3c, n3d · gün 14: sınav s12 · 1. hafta sonu t09 · 2. hafta sonu t10 · kart 2 · a1-kesin satırları 1. Kapanış metinleri düğümlerle birlikte okundu.

Yuva denetimi: her `accepted` ve öğrenci seçeneği `{ulke}` = "aus"tan sonraki öbek ("der Türkei", "Syrien", "dem Irak"), `{sehir}` = yer adı, `{yas}` = sayı, `{diller}` = dil listesi ile tek tek dolduruldu. Doğru seçeneklerin hepsi her dolguyla dilbilgisel. Çeldiriciler ("Ich komme in {ulke}.", "Ich wohne aus {ulke}.", "Ich spricht/sprechen {diller}.", "Mein Wohnort ist Brunnengasse sieben.") her dolguyla yanlış. "Mein Alter ist {yas}." dilbilgisel ama doğal değil (aşağıda P2-1). Karşı tarafın repliklerinde, `prompt_de` ve `audio_de` alanlarında yuva yok. Sabit kişisel bilgi yok: eski t09'daki sabit "aus der Türkei" kaldırılmıştı, doğru.

## Bulgular ve düzeltmeler

### P1
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| P1-1 | gün 12, lx:Alter görev cümlesi 2 | "Frau Brandl, Ihr Alter? Neunundsiebzig?" | "Alter: {yas}. Wohnort: {sehir}." · tr "Yaşım: {yas}. Oturduğum yer: {sehir}. (formu söylerken)" · accepted: "Alter {yas}, Wohnort {sehir}.", "Mein Alter: {yas}. Mein Wohnort: {sehir}.", "Alter: {yas} Jahre. Wohnort: {sehir}." | 79 yaşındaki komşu kadına yaşını sormak, üstüne bir de tahmin söylemek Almanya'da kaba kaçar. Öğrenciye bunu kurdurmak yanlış bir toplumsal kalıp öğretir. Yerine öğrencinin kendi bilgisini form satırı gibi söylediği cümle kondu (F bağlamı, PM-148'in amacına da uygun). |

### P2
| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| P2-1 | gün 13 n3c, çeldiricinin geri bildirimi | "Anlaşılır ama böyle denmez." | "Yanlış değil, ama konuşurken pek böyle denmez." | "Mein Alter ist …" dilbilgisel olarak doğru, yalnız doğal değil. Eski metin "yanlış" izlenimi veriyordu. Kart mistakes_tr'deki "pek denmez" ile de uyumlu oldu. |
| P2-2 | gün 07 n4b, çeldiricinin geri bildirimi | "**Wohnort** yalnızca şehirdir" | "**Wohnort** yalnızca şehrin ya da köyün adıdır" | Aynı düğümdeki doğru seçenek ve kart "şehir ya da köy" diyor. Wendlfing de küçük bir yer. |
| P2-3 | gün 06, lx:heißen görev cümlesi, accepted_adsiz | "Ich komme aus {ulke}, bitte." | "Ich bin aus {ulke}." | Bilgi verirken sona "bitte" eklenmez, doğal değil. Doğru ve yaygın bir varyantla değiştirildi. |
| P2-4 | gün 02 n3c, gün 06 n6b, gün 07 s12 (accepted ve accepted_adsiz), 1. hafta sonu t09 | "Ich bin aus …" hiç yoktu | eklendi: "Ich bin aus {ulke}.", "Ich heiße {name}. Ich bin aus {ulke}. Ich wohne in {sehir}.", "Ich bin aus {ulke}. Ich wohne in {sehir}.", "Ich bin aus {ulke} und wohne in {sehir}." | "Ich bin aus der Türkei" konuşmada en az "Ich komme aus" kadar yaygın. Bu biçimi söyleyen öğrenci haksız yere reddediliyordu. Doğrulayıcı yalnız accepted[0]'ı "öğretilmiş mi" diye denetliyor, ekleme öğretmeden isteme sayılmaz. |
| P2-5 | gün 06 n6b, Frau Brandl'ın repliği | "Danke! Und Sie? Sie kommen aus …?" · tr "Ya siz? Siz nereliydiniz?" | "Danke! Und Sie kommen aus …?" · tr "Peki siz nereliydiniz?" | "Und Sie?" ile hemen ardından gelen "Sie kommen aus …?" aynı soruyu iki kez soruyor. "Und Sie kommen aus …?" yarım soru olarak çok doğal. "nereliydiniz" (hatırlamaya çalışma) iyi bir çeviri, korundu. Bu replik yeni, ses dosyası yok. |
| P2-6 | gün 06, lx:woher görev cümlesi tr | "Ya siz nerelisiniz Luka?" | "Ya siz nerelisiniz, Luka?" | Hitaptan önce virgül. |
| P2-7 | gün 07, lx:Wohnort görev cümlesi 2 | tr "Oturduğum yer mi, adresim mi? (formda hangisi?)"; accepted "Wohnort oder Adresse, bitte?" | tr "Oturduğum yer mi, adres mi? (formda hangisini yazayım?)"; accepted "Den Wohnort oder die Adresse?" | Soru cümlesinin sonundaki "bitte?" doğal değil. Doğal uzun biçim "Den Wohnort oder die Adresse?" eklendi. Türkçe ayraç durumu daha açık anlatıyor. |
| P2-8 | gün 12, lx:Alter görev cümlesi 1, accepted | "Mein Alter? Ich bin {yas} Jahre." | "Mein Alter? {yas} Jahre alt." | "Ich bin 30 Jahre" (alt olmadan) ölçünlü değil ve öğretmenler bunu düzeltir. Kabul listesinde durmamalı. |
| P2-9 | gün 07 s12, 1. hafta sonu t09, situation_tr | "Sınav kartı: **… Woher? …**" | "Sınav kartı: **… Land? …** (**Land** = ülke)" | Start Deutsch 1 konuşma Teil 1 kartında "Woher?" yazmaz, "Land?" yazar (Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby; DENETİM-A1 §4). "Sınav kartı" deyip gerçekte olmayan bir sözcük göstermek yanıltır. lx:Land kartı 33. günde geliyor. Bu yüzden Türkçe karşılığı ayraçla verildi. Üretilen cümle değişmedi. |
| P2-10 | gün 02, lx:wohnen görev cümlesi, accepted | — | "Ich komme aus {ulke}, wohne aber in Wendlfing." eklendi | "aber wohne in" (öznesiz) kabul edilebilir ama zayıf. En doğal öznesiz biçim "wohne aber in" eksikti. |
| P2-11 | batch-018 lx:Alter `pl`; SOURCES.md satırı | "-" (çoğulu yok); adres https://www.duden.de/rechtschreibung/Alter, "çevrimdışı doğrulanamadı" | "Alter"; adres https://www.duden.de/rechtschreibung/Alter_Lebensabschnitt | Duden sayfası okundu: das Alter, Plural **die Alter**, "selten" notu yok. Depoda "-" "çoğulu yok" anlamına geliyor (Fleisch, Hunger), aynı biçimli çoğul ise açıkça yazılıyor (Lehrer, Zimmer). Duden'in adı olan Alter için sayfa adresi Alter_Lebensabschnitt (aramada çıkan öbür sayfa, Alter_Person, "der Alte"). |
| P2-12 | batch-018 lx:Alter mistakes_tr 1 | "Kaç yaşındasınız derken **Was ist Ihr Alter** pek denmez." | "Yaşınız kaç derken **Wie viel ist Ihr Alter** denmez." | "Was ist Ihr Alter" İngilizce "What is your age"in kopyası, Türkçe konuşana özgü bir hata değil. Türkçe "Yaşınız kaç?" sorusunun kelimesi kelimesine çevirisi asıl Türk hatasıdır. |

Hata sayısı: P0 0 · P1 1 · P2 12 → **13 hata / 23 madde (%57)**. Hataların çoğu küçük; tek P1 nezaketle ilgili.

## Doğru bulunanlar (dokunulmadı)
- "Ich komme aus {ulke}." / "Aus {ulke}, Frau Brandl." kısa cevaplar doğal. "Sie kommen aus …?" yarım sorusu ve "Aus …" ile tamamlama gerçek konuşmada çok yaygın.
- 1. hafta karşı soruları: "Und woher kommen Sie?" (gün 2; **woher** aynı günün halka kalıbında gösteriliyor, kartı 6. günde geliyor), "Und der Wohnort? Wendlfing?" (gün 7; Wohnort aynı günün kartı). Hafta kapısı "anlaşılmayan karşı soru: 0".
- "Und der Wohnort?" muayenehane sekreterinin form doldururken söyleyeceği bir soru. "Wie heißt Ihr Wohnort?" A1 ders kitabı Almancası ve doğal.
- Kart lx:Wohnort: der, Wohnorte (Duden: Ort → Orte), eşdizimler, örnekler, form cümleleri ve mistakes_tr doğru. "Mein Wohnort Wendlfing" (ist eksik) gerçekten Türkçe konuşana özgü bir hata.
- Kart lx:Alter: das, örnekler ("Mein Alter? Das sag ich nicht!" Alltag katmanında doğru), "Wie ___ sind Sie? → alt" ayrımı yararlı.
- Gün 13 "Ich spricht/sprechen" çeldiricisi ve geri bildirimi, gün 14 s12, 2. hafta sonu t10 (ad, yaş, yer): doğru, accepted ≥ 3, `_adsiz` düzeni {name} ile tutarlı.
- Karakter bilgileri WORLD.md ile örtüşüyor: Brandl 79, Pichler 66, Lechner 31, Ioana 34, Luka kuaför.

## Kalan şüpheler (düzeltilmedi; baş geliştiriciye)
1. **"Was sprechen Sie?"** (gün 12 kalıp, gün 13 n3d, gün 14 s12 prompt_de): anlaşılır ve konuşmada kullanılır, ama ölçünlü soru "Welche Sprachen sprechen Sie?". lx:Sprache 16. günde geliyor, `welcher` M1'de hiç yok. 16. günden sonraki ilk dil maddesinde ölçünlü soru gelmeli; tabloya `welche` eklenmesi önerilir.
2. **Gün 13 n3d:** Ioana'nın "wie im Kurs" diyerek Sie'ye geçmesi kurgulanmış bir an, ama açıklandığı için kabul edildi.
3. **WORLD ile eski çelişkiler (bu farkta değil):** WORLD'e göre Frau Brandl'ın doğum günü 2 Mayıs. Oysa gün 2 provası ("Heute ist mein Geburtstag", 1. hafta, Kasım) ve gün 6 n3 (24.11.1947) Kasım diyor. WORLD'e göre Luka'nın doğum günü 11 Kasım, oysa bir görev cümlesi "Luka, Ihr Geburtstag ist im Oktober, ja?" diyor. WORLD ya da içerik düzeltilmeli.
4. **Duden Wohnort sayfası** doğrudan açılamadı (izin isteği zaman aşımına uğradı). Maddebaşı ve cinsi (der) Duden arama sonuç listesinden, çoğulu Duden'in Ort sayfasından doğrulandı.
5. Türkçe gösterimde `{ulke}` yuvası "Memleketim {ulke}" kalıbıyla eksiz yazılmış. Uygulama yuvayı Almanca öbekle ("der Türkei") doldurursa Türkçe satır bozuk görünür. Gösterim kuralı kodda ayrıca doğrulanmalı.
6. `review` alanlarına (batch-018 "draft" dahil) brief gereği dokunulmadı.

## Denetimler (son çıktı)
- `npm run -s content:validate`: 0 hata, 291 uyarı
- `dikis-kos.ts`: İhlal: 0
- `hafta-kapisi-kos.ts --hepsi`: öğretilmeden istenen 0, anlaşılmayan karşı soru 0, hafta sonu testi %100 (12/12), görülmemiş durum 6/6
- `npx vitest run content/tools`: 230/230 geçti

## Sonuç: **KAPANDI** (dil yönünden; yukarıdaki kalan şüpheler kapsam dışı ya da öneri)

## 2. tur (okur OD-9.3 GERİ'leri, `docs/v2/reviews/okur/ic-a1-hafta-1-2.md`)
Bu turda yalnız okurun işaret ettiği Türkçe metinler düzeltildi. Almanca ve accepted[] değişmedi.
| # | Yer | Önce | Sonra |
|---|---|---|---|
| 1 | gün 07, lx:Wohnort görev cümlesi 2, tr | "Oturduğum yer mi, adres mi? (formda hangisini yazayım?)" | "Şehrin adı mı, adres mi?" |
| 2 | gün 07 m1:07:s12 ve hafta-sonu-testi m1:07:t09, situation_tr | "(**Land** = ülke)" | "(**Land**: ülke)" |
| 3 | gün 12, lx:Alter görev cümlesi 2, tr | "(formu söylerken)" | "(formdaki gibi kısa)" |
| 4 | gün 13 n3d, secenekler[1].tr | "(yanlış çekimle)" | "(kelimenin sonu yanlış)" |
| 6 | hafta-sonu-testi m1:07:t09, why_tr | "İki soru, iki cevap: **Woher** sorusuna …, **wo wohnen** sorusuna …" (15 sözcük, tek cümle) | "**Woher** sorusuna **Ich komme aus …** dersin. **Wo wohnen** sorusuna **Ich wohne in …** dersin." |
| ek | gün 14 m1:14:s12, situation_tr | "Sınav kartı: **Alter? Sprachen?** Görevli soruyor." | "Sınav kartı: **Alter? Sprachen?** (**Sprachen**: diller) Görevli soruyor." |

Koordinatörün talimatıyla `…` kuralına önceki m1 raporlarındaki gibi dokunulmadı.
Denetimler: validate 0 hata (291 uyarı) · dikiş İhlal: 0 · hafta kapısı öğretilmeden istenen 0, anlaşılmayan karşı soru 0 · vitest 230/230.
2. turun sonucu: **KAPANDI**.
