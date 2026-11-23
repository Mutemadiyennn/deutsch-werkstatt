# lexicon-b1-01 (b1-01a + b1-01b): dilbilimci incelemesi

- Tarih: 2026-11-23 · İnceleyen: dilbilimci-ajan · Model: Fable 5.2 (`claude-fable-5-2`)
- **Karar: ONAY** (dil ve olgu yönünden). `review.status` yine de `draft` kaldı, sebebi B-1.
- Girdi: `content/v2/registry/lexicon/batch-b1-01a.json` (26 kart, 25. ve 26. hafta) · `batch-b1-01b.json` (24 kart, 27. ve 28. hafta)
- İncelenen kart: **50** (bütün alanlar; 276 örnek, 195 boşluk)
- Düzeltilen kart: **22** · alan düzeyinde düzeltme: **41** · hata oranı **22/50 kart (0,44)**
- Ağır sayılanlar (9 kart): doğru Almancayı yanlış gösteren hata notu (lx:Umfrage, lx:Meldung), öğretilmemiş öğeyi doğru cevap diye veren not (lx:Experte, lx:Ereignis), birinci tekil kişide sabit cinsiyet (lx:Zeuge, lx:Experte, lx:aufnehmen), tek doğru cevabı olmayan boşluk (lx:einnehmen, lx:nachfragen, lx:Ansicht).
- Düzeltmeler doğrudan iki dosyaya yazıldı. `npm run content:validate` → **0 hata, 146 uyarı** (uyarıların hiçbiri bu iki partiye ait değil).
- Dış kaynak açılmadı. Olgusal cümleler genel ve güvenli tutuldu; kaynak isteyen tek konu B-3'te.

## A. Düzeltildi

### Hata notları (`mistakes_tr`)

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Experte | Doğrusu **Facharzt** ya da **Fachärztin** → **Experte** bir konuyu çok iyi bilen kişidir, doktor unvanı değildir | Facharzt kartı 28. haftada, Experte 26. haftada. Öğretilmemiş öğeye gönderme kalktı, uyarının kendisi kaldı. |
| lx:Facharzt | (ek) Uzman doktor derken **Experte** denmez | Aynı uyarı, iki kartın da öğretilmiş olduğu yere taşındı. |
| lx:Ereignis | Olay şu derken ... Doğrusu **Die Sache ist die.** → Kötü ve beklenmedik olay için çoğu zaman **Vorfall** denir | Doğru cevap öğretilmemiş bir deyimdi. Yenisi aynı haftanın kartına bağlanıyor. |
| lx:diskutieren | ... **streiten** denir → **diskutieren** sakin bir fikir alışverişidir, kavga etmek anlamındaki tartışmak için kullanılmaz | **streiten** kartı yok. Türkçedeki iki anlamlı **tartışmak** uyarısı korundu. |
| lx:Umfrage | **nach der Umfrage** anketten sonra demektir → **laut eine Umfrage** yanlış, doğrusu **laut einer Umfrage** | **Nach einer Umfrage** Almancada **ankete göre** anlamında da doğrudur. Not doğru kullanımı yanlış gösteriyordu. |
| lx:Meldung | **Ich habe eine Meldung bekommen** doğal değil, doğrusu **Bescheid bekommen** → Arkadaştan gelen mesaj **Nachricht**, **Meldung** gazetedeki kısa haber | İlk cümle doğal Almancadır (telefon bildirimi). Asıl karışan çift Meldung ve Nachricht. |
| lx:Bericht | **einen Bericht machen** pek doğal değil → Doktordan alınan iş göremezlik raporu **Bericht** değildir, adı **Krankmeldung** | **einen Bericht machen** söylenir. Türkçe **rapor** kelimesinin asıl tuzağı hasta raporu. |
| lx:Untersuchung | **eine Untersuchung tun** yanlış → Muayenehane için **Untersuchung** denmez, **Praxis** denir | İlki Türkçe konuşanın yapacağı bir hata değil. Muayene ve muayenehane gerçekten karışır. |
| lx:Augenarzt | **Augedoktor** yanlış → **Ich rufe zum Augenarzt an** yanlış, doğrusu **beim Augenarzt** | İlki uydurma bir hataydı. Yenisi kartın kendi kalıbını pekiştiriyor. |
| lx:frühestens | **spätestens** ile karışmasın → **am frühesten im März** yanlış, doğrusu **frühestens im März** | Aynı fikir ipucunda zaten vardı, **spätestens** kartı da yok. Yenisi **en erken** kalıbından gelen gerçek hata. |
| lx:aktuell | (ek) İngilizcedeki actually ile karıştırma | D-060'ın izin verdiği kısa yanlış arkadaş uyarısı. Öğrenci zorlanınca İngilizceye kaçıyor. |

### Öğrencinin ağzında sabit cinsiyet (D-061)

| Kart | Alan | Önce → Sonra |
|---|---|---|
| lx:Zeuge | ö2, boşluk 2, patterns | **Ich war Zeuge** → **Mein Nachbar war Zeuge, er hat alles gesehen.** `also_ok: Zeugin` kalktı. `pt:ich-war` yerine `pt:es-gibt` (ö6). |
| lx:Experte | ö4, boşluk 4 | **Nee, ich bin kein Experte.** → **Nee, da ist mein Bruder der Experte.** |
| lx:aufnehmen | boşluk 4 | **Können Sie mich als neuen Patienten ___?** → **Können Sie meine Mutter als neue Patientin ___?** |

### Boşluklar: tek doğru cevap ve haksız ret

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:einnehmen | **Sie ___ die Tabletten ... ein.** → **Meine Mutter ___ ...** | Cümle başındaki **Sie** ile **nehmen** de doğruydu. |
| lx:nachfragen | **Sie ___ in der Apotheke nach.** → **Er ___ ...** | Aynı sorun: **fragen** de doğruydu. |
| lx:einnehmen | boşluk 1 ve 3'e `also_ok`: **nehmen**, **genommen** | Kartın kendi notu gündelikte **nehmen** dendiğini söylüyor. |
| lx:Ansicht | dört boşluğa `also_ok`: **Meinung**, **Meinungen** | **Meiner Meinung nach**, **der Meinung sein**, **anderer Meinung** aynı ölçüde doğru ve daha sık. |
| lx:Meldung | üç boşluğa `also_ok`: **Nachricht**, **Nachrichten** | **Gibt es neue Nachrichten?** en doğal cevap. |
| lx:nachsehen | **Haben Sie schon ___?** → **Haben Sie schon im Kalender ___?**; dört boşluğa `also_ok`: **schaue**, **schau**, **nachschauen**, **nachgeschaut**, **schaut** | İlk cümleye her fiil giriyordu. Güneyde **nachschauen** daha sık; Frau Huber'in WORLD'deki cümlesi de **ich schau mal**. |
| lx:Hinweis | **danke für den ___** boşluğuna `also_ok`: **Tipp** | Aynı kartın öbür boşluğunda kabul ediliyordu. |
| lx:Behandlung | **Nach drei ___ geht es mir besser.** → **Es gibt zwei verschiedene ___.** | Boşluğa **Tagen**, **Wochen** daha doğal giriyordu; Türkçesi de zorlamaydı. |

### Almanca, çeviri ve olgu

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:festnehmen | ö4 | **Was war denn da los?** → **Was ist denn da los?** | Soru geçmiş, cevap şimdiki zamandaydı. |
| lx:Augenarzt | ö4 | ... **Waren Sie schon einmal bei uns?** → ... **Haben Sie dort schon angerufen?** | Göz doktorunun sekreterine **beim Augenarzt** denmez. |
| lx:Facharzt | ö4 | **Brauche ich eine Überweisung ...? – Ja** → **Bekomme ich eine Überweisung ...? – Ja** | Sevkin her zaman şart olduğu izlenimi kalktı (B-3). |
| lx:Untersuchung | exp.ipucu | **hep die alır** → **neredeyse hep die alır** | **der Sprung** gibi istisnalar var. |
| lx:angeblich | ö2 tr, boşluk 2 tr | Tren güya yoldaymış → Tren güya çoktan yoldaymış | **schon** çevrilmemişti. |
| lx:sinnvoll | coll 3 tr | … mantıklı → … yapmak mantıklı | Kalıbın **zu** kısmı karşılıksızdı. |

## B. Karar gerekir

1. **`reviewed` yazılamadı.** Doğrulayıcı (`load.ts:282`) `reviewed` partide `okur: "passed"` istiyor; istenen biçim 2 hata veriyor. Okur sonucu uydurulmadı. İki dosyada şimdi `{"status":"draft","by":"dilbilimci-ajan","at":"2026-11-23","notes":"docs/v2/reviews/lexicon-b1-01.md"}` var. `reviewed` ile denendiğinde OD-9.2 hatası çıkmadı; okur geçince durum çevrilebilir.
2. **Eksik alanlar.** 50 kartın hiçbirinde `img` yok, 42 kartta `exp.ne_zaman_tr` yok. İncelenmiş 012 ve 013 partilerinde ikisi de her kartta var. Okur turundan önce lex tamamlasın mı?
3. **Sevk zorunluluğu.** İncelenmiş `lx:Überweisung` ö2 (batch-013) **Für den Facharzt brauchen Sie eine Überweisung** diyor. Yasal sigortalı için çoğu uzmanda sevk zorunlu değildir; bu turda kaynak açılmadı, `SOURCES.md` satırı da yok. O dosya görevde olmadığı için dokunulmadı.

## C. Küçük notlar

- lx:frühestens ipucu **spätestens** kelimesini veriyor; kartı yok ama anlamı yanında yazılı. lx:Einwohner (**Bevölkerung**) ve lx:streiken (**Streik**) notları da aynı durumda, bırakıldı.
- lx:einnehmen ö3 gündelik katmanda **einnehmen** kullanıyor, oysa kartın notu gündelikte **nehmen** dendiğini söylüyor. Almanca doğru, bırakıldı.
- Dört boşluğu da aynı cevabı isteyen kartlar var (lx:Hauptsache, lx:Überschrift, lx:angeblich, lx:frühestens). Doğru ama alıştırma değeri düşük.
- Bazı boşluklar yalnızca Türkçe çeviriyle tek cevaba iner (lx:frühestens ile **spätestens**, lx:Umfrage ile **Frage**). Çeviri ekranda olduğu sürece sorun değil.
- Örneklerde kartı olmayan kelimeler var (Thema, Ergebnis, Schmerzen, Prozent, Dieb, Lohn, Grippe, Zettel). 1544 kartlık kayıtla "A2 sonuna kadar öğretildi mi" sorusu kelime kelime doğrulanamadı; değiştirilmedi.
- **Facharzt** kelimesi batch-013 örneklerinde 28. haftadan önce geçiyor.
- `level`: lx:Brille ve lx:Medikament için B1 yüksek görünüyor. Seviyeler bir listeyle karşılaştırılmadı, değiştirilmedi. `tier` ve `freqRank` alanlarına dokunulmadı.
- **Nee** ve **nix** önceki partilerle tutarlı gündelik biçimler; Bairisch içerik yok. Kişisel bilgi, kurs ya da kitap adı, öğrenci adı yok. Karakterler WORLD ile uyumlu.

## Sonuç

**Dil incelemesi KAPANDI (ONAY).** Açık kalan üç madde B'de; `reviewed` için okur kapısı bekleniyor.
