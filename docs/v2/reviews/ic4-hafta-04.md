# İÇ-4 · A1 4. hafta (22.–28. gün, ev ve komşu haftası): dil incelemesi

İnceleyen: dilbilimci-ajan · 2026-11-23 · tek tam tur (PM-089)

## Kapsam
- `content/v2/m1/gun-22.json` … `gun-28.json` (7 dosya)
- `content/v2/m1/hafta-sonu-testi-04.json`, `content/v2/m1/gorulmemis-04.json`
- İncelenen madde: yaklaşık **1004** (gün başına 124–157 satır, soru, dikte, prova seçeneği ve sınav maddesi; 12 test maddesi; 4 görülmemiş durum)
- 15.–21. gün dosyalarına ve `grammar.json` dosyasına dokunulmadı.

## Sonuç özeti
| Sınıf | Bulgu | Düzeltilen |
|---|---:|---:|
| P1 (yanlış ya da çalışmayan) | 7 | 7 |
| P2 (doğallık, çeviri, kabul listesi, tutarlılık) | 31 | 31 |
| P3 (biçim, küçük tutarlılık) | 15 | 15 |
| Toplam | 53 | 53 |

Hata oranı: 53 / 1004 = **%5,3**.

Denetimler (son durum):
- `kontrol.ts … 22–28`: yalnız beklenen 3 `TABLO` satırı (suchen 25→22, Gemüse 22→23). `K … /gorev` satırı yok, `OD9` satırı yok, `sahne satırında bilinmeyen` uyarısı yok.
- `dikis-kos.ts … --gun 22 … 28`: yalnız beklenen 4 (a) satırı. (b), (c), (d) = 0.
- `npm run content:validate`: yalnız hat D'nin beklenen şema hataları (`day ≤ 7`, `dersler` deseni). Başka hata yok.
- Okuma bölücüsü (`web/src/core/okuma.ts`) yedi günün metninde koşuldu: bütün `kanit` sıra numaraları doğru cümleye düşüyor (26. günün ilanları satır satır bölünüyor, kısaltmalar bölmüyor).

## P1 bulguları

### 1. Yarım satır yazdıran dikteler (6 gün, 13 madde)
Dikte `cumle` satırının tamamını çalar, puanlama `accepted[0]` ile karşılaştırır. Satır iki ya da üç cümleyken yalnız biri kabul ediliyordu. 3. haftadaki yol uygulandı: satır bölündü (`…b`), dikte ve gerekiyorsa `kanit` yeni kimliğe bağlandı.

| Gün | Madde | Önce | Sonra |
|---|---|---|---|
| 22 | sahne d3 | `s11` **Ja, das Rezept von Dr. Weber. Es ist für die Tabletten.** | `s11` + `s11b`, dikte `s11b` |
| 23 | sahne d3 | `s3` **Der Flur ist nicht groß. Das geht so nicht.** | `s3` + `s3b` |
| 25 | sahne d4 | `s10` **Gut, ich nehme diesen. Den für zehn Euro.** | `s10` + `s10b`, ayrıntı kanıtı `s10`, `s10b` |
| 25 | a2 d4 | `c4` iki cümle | `c4` + `c4b` |
| 26 | sahne d3 | `s11` **Im Brunnenviertel. Es ist klein, …** | `s11` + `s11b`, dikte `s11b` |
| 26 | sahne d4 | `s12` **Klein ist kein Problem. Hat es einen Balkon?** | `s12` + `s12b` |
| 26 | a2 d4 | `c4` **Und bei Frau Brandl? Ist es dort am schönsten?** | `c4` + `c4b`, dikte `c4b`, ana fikir kanıtına `c4b` |
| 27 | sahne d3 | `s7` **Nein, zwei Minuten. Zwischen dem Rathaus …** | `s7` + `s7b`, dikte `s7b` |
| 27 | sahne d4 | `s14` iki cümle (ayrıca madde 6) | `s14` + `s14b`, dikte `s14b` |
| 27 | a2 d4 | `c4` **Und welcher Stock? Der zweite, ja?** | `c4` + `c4b` |
| 28 | sahne d3 | `s3` **Das ist der Nachbar. Er spielt jeden Abend.** | `s3` + `s3b`, dikte `s3b` |
| 28 | sahne d4 | `s12` üç cümle | `s12` + `s12b`, dikte `s12b`, ayrıntı kanıtı `s12`, `s12b` |
| 28 | a2 d3 | `c4` **Hast du ein paar Tassen? Wir haben nur zehn.** | `c4` + `c4b`, dikte `c4b` |

Boşluklu (`orta`) maddeler ve iki cümleyi birlikte kabul eden 24. gün a1 d4 doğruydu; dokunulmadı.

### 2. 24. gün a1 d5: örnek cevap zorunlu kelimeyi içermiyordu
Zorunlu **zehn**, örnek **Ab zwölf ist alles gut.** diyordu.
- Sonra: `Im Haus ist eine Störung. Der Techniker kommt um zehn.`

### 3. 24. gün: 800 avroluk ev hangisi? (sahne, mesaj ve prova çelişiyordu; 26. günle de)
- Sahne: Brunnengasse'deki yer 800 avro, fazla pahalı. Tobi'nin mesajı: istasyonun oradaki yer **nicht teuer**.
- Prova (aynı gün): **das Haus am Bahnhof: 800 Euro**, mutfak küçük, depozito üç ay. Yani sahnedeki evin bilgileri istasyondaki eve yazılmıştı.
- 26. gün ilanları: Brunnengasse 650 avro, **am Bahnhof** 800 avro ve en pahalısı.

Prova ve 26. gün aynı şeyi söylediği için sahne ve mesaj onlara uyduruldu:
- Sahne `s6`: `Am Bahnhof ist etwas frei. Es ist sehr schön und hell.`
- Mesaj `c2`: `Du, das Haus am Bahnhof ist wirklich zu teuer.` · `c3`: `Aber in der Brunnengasse ist etwas frei: nicht teuer, nicht sehr groß.` · `c5`: `… Um zehn, in der Brunnengasse!`
- Bağlı ayrıntı soruları, d2, d4, d5, `cevapla` kabulleri, `eylem` seçenekleri ve gerekçesi güncellendi. Artık 24. ve 26. gün aynı iki evi aynı fiyatla anlatıyor.

### 4. 27. gün 2. halka sahnesi: öğrenci Brandl Hanım'a **du** ile sesleniyordu
- Önce: `Schau mal, das Kind hat sie in der Hand!` (çevirisi **Bakın**)
- Sonra: `Schauen Sie mal, das Kind hat sie in der Hand!` Halkanın kalıp satırına **Schauen Sie mal!** eklendi.

### 5. 28. gün sahne d5: görev ile örnek başka şeyler istiyordu
Görev **Pichler Bey'in kurallarını yaz**, örnek ve zorunlu kelimeler (**Nachbar**, **Sohn**) komşuyu ve misafiri anlatıyordu.
- Sonra: görev `Sahneyi Almanca iki kısa cümleyle özetle.` Örnek ve zorunlu kelimeler aynı kaldı.

### 6. 27. gün sahne: **Der Balkon ist hinter dem Haus**
Balkon evin arkasında durmaz; arkada olan bahçedir. Cümle hem yanlış anlam veriyor hem ustalık diktesiydi.
- Önce: `Ja, der Balkon ist hinter dem Haus. Dort spielen die Kinder.`
- Sonra: `Ja, mit Balkon.` + `Hinter dem Haus spielen die Kinder.` Dikte ikinci cümleye bağlandı.

### 7. 27. ve 28. gün provaları: Brandl Hanım öğrenciyi hiç tanımıyordu
Aynı hafta içinde Brandl Hanım öğrenciye fincan ödünç veriyor, sesli mesaj bırakıyor, pastaya çağırıyor (22. gün). 27. günde **Sie wohnen jetzt auch hier, ja? Wo denn?**, 28. günde **Wer sind Sie denn? Sind Sie neu hier?** diyordu.
- 27. gün: Brandl Hanım artık katı karıştırıyor. `n1`: `Grüß Gott! Sie wohnen im dritten Stock, ja?` Uygun cevaplar `Nein, im zweiten Stock.` ve `Nein! Im zweiten Stock, rechts.` oldu; yanlış seçenek `Nein, auf dem zweiten Stock.` Öğretilen nokta (**im zweiten Stock**) aynı. `n3`: `Wissen Sie schon, wo er ist?` (yerlisi yeni gelene yol sormaz, bilip bilmediğini sorar).
- 28. gün haftanın kapısıdır ve metni görevle sabit. Almancaya dokunulmadı; `durum_tr` sahneyi ilk günün yeniden oynanması olarak kuruyor: `İlk günü yeniden oynuyorsun. Brandl Hanım seni merdivende ilk kez görüyor. …` Gün sınavının s9 ve s11 durumları da aynı çerçeveyi alıyor. Kalıcı çözüm PM kararı (açık madde 1).

## P2 bulguları

### Almanca: doğallık ve doğruluk
| Gün | Önce | Sonra |
|---|---|---|
| 22 | Ich sage morgen ab, ich bin krank. (yarın mı iptal, yarını mı iptal belirsiz) | Ich sage für morgen ab, ich bin krank. |
| 23 | Guten Tag in Wendlfing! (radyo) | Guten Tag, Wendlfing! |
| 23 | Am Samstag sind Gemüse und Tomaten billig. (domates zaten sebze) | Am Samstag sind Tomaten und Bananen billig. Soru seçenekleri de değişti. |
| 23 | Kommst du am Samstag um vier? Bis Montag, Derya! | … Bis Samstag, Derya! |
| 25 | Nein, diese da. Natürlich! | Nein, natürlich diese da! |
| 25 | Ich habe zwei Jacken … Welche nehme ich? (henüz almamış) | Hier sind zwei Jacken … |
| 27 | Wo ist meine Tasse? Sie liegt nicht im Flur! (fincan yatmaz) | … Sie ist nicht im Flur! |
| görülmemiş g4 | Ihre Adresse, bitte. Und die Zimmer? Wie viel? | Ihre Adresse, bitte. Und wie viele Zimmer? |

### Kabul listeleri
- 22. gün: **Ich sage am Freitag den Termin ab.** anlamı değiştiriyordu (cuma günü iptal ediyorum) → **Ich sage den Termin für Freitag ab.**
- 22. gün: **Das Rezept ist weg, von Dr. Weber!** doğal değildi → **Mensch, das Rezept von Dr. Weber ist weg!**
- 22. gün: **Frau Brandl bäckt …** eklendi (**backt** ve **bäckt** ikisi de doğru; haksız ret riski).
- 22. gün s8: **Numarayı** için **Ich schreibe die Zahl auf.** kabul ediliyordu; **Zahl** sayı demek → **Ich schreibe jetzt die Nummer auf.**
- 23. gün s6: çeviri çoğul (**Muzları**), kabulde tekil **die Banane** vardı → **Wie findest du die Bananen hier?**
- 24. gün (halka ve s10): **Der Bahnhof ist immer geradeaus.** Almanca değil → **Zum Bahnhof? Hier immer geradeaus.** ve **Der Bahnhof? Immer geradeaus.**
- 25. gün: **Ein paar sind kaputt, diese Tassen.** → **Ein paar Tassen hier sind kaputt.**
- 26. gün prova `n2`: ilk cevap **Das am Bahnhof, 70 m².** Sesle söylenince **Quadratmeter** çıkar; iki sözlü biçim eklendi.
- 27. gün: **Wir schauen hinter das Sofa.** eklendi (yön anlamında doğru olan biçim; mevcut **hinter dem Sofa** da kaldı).
- 28. gün: **Mein Fahrrad hat noch zwei Jahre Garantie, gut!** → **Auf meinem Fahrrad sind noch zwei Jahre Garantie.**
- görülmemiş g4: **… Zwei Zimmer.** biçimli iki cevap eklendi; `kalip` ve gerekçe buna göre.

### Türkçe
- 22. gün: **weg** üç yerde **yok** diye çevrilmişti (**Dr. Weber'in reçetesi yok!**) → **kayıp** (aynı günün **Ehliyetim kayıp!** satırıyla aynı söz).
- 23. gün: **Muz artık eski.** → **Muz artık bayat.**
- 24. gün: **Pazartesiden itibaren arıza gidiyor.** → **… arıza yok.**
- 24. ve 26. gün: **Wie teuer ist es?** çevirisi **Ne kadar pahalı?** → **Fiyatı ne kadar?**
- 24. gün: **Peki senin küf?** → **Peki sendeki küf?**
- 25. gün: **holen** iki cümlede **almak** diye çevrilmişti; kart **getirmek, gidip almak** diyor → **gidip alıyorum**, **getirir misin**.
- 25. gün: **Luka hep çok anlatır.** → **… çok şey anlatır.** · **Orada ne anlatıyorsun?** (**da** burada yer bildirmez) → **Sen ne anlatıyorsun öyle?**
- 28. gün (halka, duyuru, okuma): **lütfen müzik yok** → **lütfen müzik olmasın**.

### Tutarlılık
- 23. gün a1: sahnede Brandl Hanım kanepenin komşuya ait olduğunu Pichler Bey'e söylüyor; hemen sonraki mesajda Pichler Bey **Ist es von Ihnen?** diye soruyordu. `ortam_tr`: mesaj sabah erkenden bırakılmış, Pichler Bey henüz bilmiyor.
- 27. gün a2 ve okuma: Ioana 22. günde öğrencinin evine uğruyor, 27. günün sahnesinde Brunnengasse 7'nin kapısında duruyor; mesajda ve notta **Wo ist dein Haus? Welcher Stock?** diye soruyordu. Konuşan kişi Derya oldu (eve hiç gelmemiş iş arkadaşı); a2 ve okuma/yazma içindeki bütün adlar, `speaker` ve `characters` güncellendi.
- 27. gün a1 ile 28. gün a1: teknisyen bir duyuruda cumartesi **um zehn**, ötekinde **um neun** geliyordu; aynı saatte Pichler Bey boş yeri gösteriyor. 27. gün `c4`: `Am Samstag um neun …`; d3 bankası ve cevabı güncellendi.
- 27. gün s10: süpermarketi Brandl Hanım soruyordu (sahnede yeri kendisi tarif ediyor) → soran **yeni komşu**.

## P3 bulguları
- **Bahnhof** 4. haftada **gar** diye çevrilmişti; 3. haftada ve WORLD'de **istasyon**. Beş dosyada yaklaşık 40 Türkçe dize düzeltildi (**Gardan uzak mı?** → **İstasyona uzak mı?**).
- Gölge satırı başkasının adını söyletiyordu (**hier ist Ioana / Rosa Brandl / Josef Pichler / Tobi / Luka / Derya**): 22 a1, a2 · 23 a1 · 24 a1, a2 · 25 a2 · 26 a1 · 27 a1 · 28 a2. Gölge başka satırlara alındı. (22 a1'de **Danke, bis morgen!** 1. haftayla çakıştığı için **c3**, **c4** seçildi.)
- 22. gün sahne: `sahne_tr` olayı **Ioana'nın mutfağına** koyuyordu; Brandl Hanım kapıdan başını uzatıyor, okuma notu ve `cevapla` ise öğrencinin evini anlatıyor. Yer **senin mutfağın** oldu. Aynı sahnede ehliyet tarifte fincanın **altında**, satırda ve soruda **yanında** idi; tarif düzeltildi.
- 22. gün: **Sie ist schön.** çevirisi **Çok güzel.** → **Güzel.**
- 23. gün sahne: **giriş katı** yazıyordu, Brandl Hanım'ın kapısı birinci katta → **birinci kat**.
- 23. gün sahne ana fikir: cevap yeni komşuyu da içeriyor, kanıtta `s6` yoktu; eklendi.
- 24. gün sahne `s11`: Almanca ve Türkçe satırda üç nokta vardı → `Zu klein, zu teuer! Nein, danke!`
- 24. gün 3. halka ortamı: Brandl Hanım **anlatıyor** değil **soruyor**.
- 24. gün `characters`: Brandl Hanım eksikti. 27. günde Derya eklendi.
- 25. gün: **Dieses Paar Schuhe** çevirisi **Bu ayakkabılar** → **Bu çift ayakkabı**.
- 26. gün prova `n4` yanlış seçeneğinde iki kabul vardı; üçüncüsü eklendi.
- 27. gün 2. halka sahnesi: **vor dem Haus** çevirisi **Kapının önünde** → **Evin önünde**.
- 28. gün prova `n1`: aynı cevap iki kez yazılmıştı; biri **Ich heiße {name}** biçimine çevrildi.
- 28. gün sahne `s7` tarifi Pichler Bey'in bisikletini koridora koyuyordu (kendi kuralına aykırı); tarif değişti.
- görülmemiş g2: **Ist er bei der Tasse?** bu durumda anlamsız (hangi fincan?) → **Ist er vielleicht im Büro?**

## Doğru bulunanlar
- Bina: öğrenci **im zweiten Stock**; Brandl Hanım ve Pichler Bey **im ersten Stock**, yan yana; boş yer ve müzik çalan komşu **im dritten Stock**. Yedi günde tutarlı (düzeltmelerden sonra).
- Şehir: süpermarket **hinter dem Bahnhof**, **zwischen dem Rathaus und der Apotheke**; öğrencinin evi **hinter dem Supermarkt**, **Brunnengasse sieben**. Tutarlı.
- Takvim: 22. günün şirket daveti (cuma) ile 28. günün **Freitag um sechs, im Büro** mesajı ve WORLD'ün 4. hafta bölümü (iş yeri kutlaması) örtüşüyor.
- Hausmeister duyuruları gerçekçi: **Im Flur bitte keine Schuhe!** · **Nach zehn Uhr am Abend bitte keine Musik.** · **Bitte bleiben Sie bis zehn zu Hause.** · **Das geht so nicht.** (WORLD'deki sık ifade).
- İlan dili: **2 Zi., Kü., Blk., 55 m², 650 € + NK 120 €** biçimi sadeleştirilmiş ama gerçek. Üç aylık depozito yasal üst sınırla uyumlu; iddia olarak yazılmıyor.
- **den Nachbarn**, **vom Nachbarn**, **teurer**, **am teuersten**, **größer**, **Welcher/Welche/Welches/Welchen**, **diesen**, **im dritten Stock**, **neben der Apotheke** çekimleri doğru.
- Bairisch yok. **Grüß Gott** güney standart Almancasıdır; kalıp satırında öyle açıklanıyor.
- Öğrenci adı yalnız `{name}`; `audio_de` ve ses metinlerinde yer tutucu yok. Kişisel bilgi, kurs ya da kitap adı, İngilizce köprü yok.
- Soruların tek doğru cevabı var; `kanit` (düzeltmelerden sonra) doğru. Üretim maddelerinde `accepted` ≥ 3.
- `hafta-sonu-testi-04.json`: 12 madde; 4 dinleme, 5 kurma, 3 konuşma; `order` parçaları ilk cevabın kelimeleri. Yalnız iki Türkçe dizede **gar** düzeltildi.

## Kalan şüpheler (AÇIK, engel değil)
1. **28. gün kapısı (PM kararı).** Kapı metni Brandl Hanım'la ilk tanışmayı istiyor, hafta ise Brandl Hanım'ı tanıdık gösteriyor. Şimdilik **ilk günü yeniden oynuyorsun** çerçevesiyle çözüldü. Seçenek: kapının karşı tarafı 23. günün yeni komşusu olsun (WORLD'e karakter gerekir).
2. **Haus** hafta boyunca daire yerine kullanılıyor (**Das Haus ist zu teuer**, 800 avro). **Wohnung** 47., **Zimmer** 38. günün kartı; tablo izin vermiyor. Öğrenci gerçek ilanda **Wohnung** görecek.
3. **Nebenkosten … am billigsten / nicht teuer**, **Wie viel sind die Nebenkosten?**, **Wie viel ist die Kaution?**: anlaşılır ama doğrusu **niedrig / hoch**, **Wie hoch …?** Kelimeler tabloda yok.
4. 26. gün 1. halka sahnesinde Ioana ilanı kısaltmalarla söylüyor (**Hier, 2 Zi., Kü., Blk.!**). Yazıda doğru; ses üretiminde kısaltma okunmaz. Ses hattı bu satırı **zwei Zimmer, Küche, Balkon** diye okumalı ya da satır sessiz gösterilmeli.
5. **Die Tasse ist von Frau Brandl / Sie ist von mir**: sahiplik için gündelik dilde geçer ama asıl anlamı **ondan geldi**. **gehören** tabloda yok.
6. WORLD'de olmayan kişiler ve olaylar: **Lena** (kızı ve erkek kardeşi), **Anna** (oğlu; Brandl Hanım'ın misafiri, akraba denmiyor), yeni komşu (işsiz, ocakta teknisyen, üç kardeş, her akşam çalıyor), Stadler Hanım'ın ikinci el tezgâhı, Tobi'nin küflü mutfağı ve ev araması (WORLD'de Tobi şubatta başka şehre taşınıyor). Hiçbiri kişisel bilgi değil; WORLD'e işlenmeli ya da adsız kişilere çevrilmeli (baş geliştirici).
7. görülmemiş g4: Bürgerbüro adres kaydında oda sayısı sormaz. Almancası düzeltildi; durumun kendisi gerçeklik testinden zayıf geçiyor. Soruda iki öğretilmemiş biçim var (**viele**, **Zimmer**; **Zi.** kısaltması 26. günde öğretildi).
8. 23. gün okuma: **Am Samstag habe ich Freizeit.** Doğalı **habe ich frei / Zeit**. Günün kartı **Freizeit** olduğu için bırakıldı.
9. 25. gün sahne: **Mein Geld ist alle!** gündelik ve doğru, ama **alle** burada **bitti** demek; öğrenci **herkes** anlamını biliyor. Soru bu satıra dayanmıyor.
10. Provalarda yanlış biçimler (**den Rezept**, **Welcher Tasse**, **auf dem zweiten Stock**) seçenek olarak gösteriliyor; 3. haftadaki gibi bilinçli tercih, okur turunda bakılmalı.
11. 22.–28. günlerde `sahne_tr` tariflerinde **Frau Brandl**, **Herr Pichler** yazıyor (birleşmiş `gun-01` de böyle); öteki Türkçe alanlarda **Brandl Hanım**. Kalıp dosyasıyla aynı olduğu için değiştirilmedi.

## KARAR: ONAY
Gerekçe: 53 bulgunun tamamı dosyalarda düzeltildi. İki denetimde yalnız PM'in serbest bıraktığı dağıtımdan gelen beklenen satırlar var (3 `TABLO`, 4 (a)); doğrulayıcıda yalnız hat D'nin beklenen şema hataları. Açık kalan on bir madde dil hatası değil: biri PM kararı (1), biri WORLD işi (6), üçü kelime tablosunun sınırı (2, 3, 5), biri ses hattı (4). Gün dosyalarının `review` alanı görev gereği `draft`; okur turu ve örneklem kontrolü sırada.

## Fark doğrulaması (23.11)
Kapsam: `git diff 1c84763 content/ic4-hafta-04` (gün 22–28, `hafta-sonu-testi-04`, `gorulmemis-04`). Yalnız turumdan sonraki değişikliklere bakıldı (PM-079 md. 3). Düzeltmeler çalışma ağacındaki dosyalarda yapıldı.

### Bulgular ve düzeltmeler (19)
1. **Almanca değişti, çeviri eski kaldı (7)**: **Ach** satırlardan çıkarılmış, Türkçede **Ah** durmuş.
   - 22. gün s12 **Da! Hier ist er!**: **Ah! İşte burada!** → **İşte! Burada!**
   - 22. gün s15 **Ja, klar!**: **Ah evet!** → **Evet, tabii!**
   - 23. gün s4 **Herr Pichler!**: **Ah, Pichler Bey.** → **Pichler Bey!**
   - 24. gün s2 **Ja, ich habe Schimmel …**: **Ah, …** → **Evet, …**
   - 27. gün n2 **Schön!**: **Ah, güzel!** → **Güzel!**
   - 28. gün s5 **Aber die Musik ist doch schön!**: **Ah, müzik güzel ama!** → **Ama müzik güzel!**
   - 28. gün s13 **Ja, ja, Herr Pichler!**: **Ah, Pichler Bey!** → **Tamam, tamam, Pichler Bey!**
2. **Bahnhof = istasyon (2)**: 22. gün **Das Amt? Es ist am Bahnhof.** çevirisi **Garın orada** → **İstasyonun orada**; 26. gün kalıbı **weit vom Bahnhof** çevirisi **gardan uzak** → **istasyondan uzak**.
3. **23. gün a1 cevapla** (haksız ret): kabul listesinde **vom Nachbarn** yerine **von dem Nachbarn** yazılmış. Gösterilen biçim için doğru, ama gündelik ve asıl doğal biçim **vom**; onu söyleyen reddedilirdi. Üç **vom** varyantı geri eklendi (**von dem** olanlar da duruyor).
4. **24. gün `goal_tr` ve `can_do.tr` (2)**: **çok pahalı, fazla küçük ya da büyük olmadığını** cümlesinde olumsuzluk üçüne de okunuyor. → **Bir şey için çok pahalı, fazla küçük ya da büyük değil derim.** (hedef satırı aynı kalıpla).
5. **25. gün v1 cevapla `why_tr`**: **Sie sind billiger** büyük harfle kibar **Sie** gibi okunuyor → **sie sind billiger**.
6. **27. gün `lx:zusammen`** (D-064): kabul listesinde aynı cümle iki kez (iki ayrı cevap kalmıştı). İkincisi **Gehen wir zusammen ins Rathaus?** oldu.
7. **gorulmemis-04 kabul listeleri (3)**:
   - g4: sayı yalnız rakamla (**500**) vardı; **fünfhundert** yazan reddedilirdi. Üç yazılı varyant ve kısa cevap **Das für 500 Euro.** / **Das für fünfhundert Euro.** eklendi.
   - g6: kalıbın kendisi **Er ist zu klein.** listede yoktu; o, **Nein, zu klein.** ve **Nein, der Schrank ist zu klein.** eklendi.
   - g7: yalın **Nein, nicht groß, aber hell.** ve iki yakını eklendi.
8. **Halka başlıkları (2)**: 25. gün h1 (karşılaştırma kalıpları ve **holen**, **laufen** buraya taşındı) → **Hangisi? Bu! Daha ucuz**; 26. gün h2 (**Mädchen**, **Freund** eklendi) → **Sorun var mı? Kız ve arkadaş**.

### Doğru bulunanlar
- Yeni görülmemiş durumlar g4–g7: istemler dilbilgisi olarak doğru, kalıplar ve gerekçeler doğru (**am billigsten**, **die Jacke → sie**, **der Schrank → er**, **zu klein**, **nicht groß, aber hell**, **im zweiten Stock**).
- Yeni kalıp satırları: **billiger als … – teurer als …**, **so … wie …**, **Ich hole … – Holst du …?**, **ein Paar Schuhe**, **ein paar …**, **Ach so! – Ach ja!** doğru.
- Değişen cümleler doğru: **Sie ist vielleicht in der Küche, auf dem Schrank.** (soru, kelime bankası, cevap tutarlı) · **die Jacke auf dem Sofa** · **Ein Paar Schuhe für zehn Euro? Schön!** · **In Ordnung, das dritte ist am billigsten.** · **Dieser Stuhl ist schöner als der da.** · **Wir holen den Stuhl.** · **Gehen wir zusammen zum Rathaus?**
- Terimsiz açıklamalar (**sıfat**, **çoğul**, **düzensiz** çıktı) anlamı koruyor; `hafta-sonu-testi-04` t02, t07, t08 gerekçeleri doğru.

### Takip notları (engel değil)
- 23. gün s2 **Es ist von dem Nachbarn.**: doğru ama ağır; doğal biçim **vom**. **vom** 26. günde gösterildiği için yazar açık biçimi seçmiş. Kabul listesi iki biçimi de alıyor.
- g7 istemi **Und wie ist es bei dir? Ist es groß?**: anlaşılır, ama **es** neyi gösterdiği belirsiz; doğalı **Und deine Wohnung? Ist sie groß?** **Wohnung** 1.–4. haftada kart değil, o yüzden bırakıldı.
- g6 **Ist er gut?** biraz yapay (**Passt er?** daha doğal); g5'te gerçek soru **Wie sieht sie aus?** olurdu. Kelime tablosu izin vermiyor.
- **ins** artık hiçbir günde kart ya da kalıp değil (26. günden çıktı, yerine kalıp konmadı). 27. günde yalnız kabul listesinde duruyor. Lex ya da yazar bir kalıp satırı eklemeli.
- 25. gün kalıbı **lieber = tercihen** (eski satır): doğru ama kitabi; **daha çok severim** anlamı ileride açıklanmalı.

Sınama (`sina.sh 4`): kalan HATA 0 · İhlal 0 · öğretilmeden istenen 0 · hafta sonu testi 12/12 · görülmemiş 7/7 · sınanmayan can_do yok.

## KARAR: ONAY
