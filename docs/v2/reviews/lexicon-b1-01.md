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

## Okur düzeltmeleri (2026-11-23)

Okur raporu: `docs/v2/reviews/okur/lexicon-b1-01.md`, 28 GERİ (23 kart). Yalnızca geri dönen alanlar değişti. Eşdizimlerde `…` somut bir örnekle dolduruldu; gereken yerde Almancası da aynı biçime getirildi. `review.status` `draft` kaldı. `content:validate` 0 hata.

| Kimlik | Alan | Yeni metin |
|---|---|---|
| lx:Ansicht | collocations[1] | şu görüşte olmak |
| lx:sinnvoll | collocations[2] | Es ist sinnvoll, früh zu kommen. · Erken gelmek mantıklı. |
| lx:Hauptsache | collocations[3] | Die Hauptsache ist, dass es klappt. · Önemli olan işin olması. |
| lx:kritisieren | collocations[1] | Viele kritisieren, dass es zu teuer ist. · Birçok kişi fazla pahalı olmasını eleştiriyor. |
| lx:Bericht | collocations[2] | ein Bericht über das Wetter · hava durumu hakkında bir haber |
| lx:Überschrift | collocations[3] | başlığın altında |
| lx:aktuell | collocations[3] | Aktuell habe ich keine Zeit. · Şu an vaktim yok. |
| lx:Einwohner | collocations[2] | Wie viele Einwohner hat die Stadt? · Şehrin nüfusu ne kadar? |
| lx:stattfinden | collocations[2] | Wann findet der Kurs statt? · Kurs ne zaman yapılıyor? |
| lx:Studie | collocations[2] | Eine Studie zeigt, dass wir zu wenig schlafen. · Bir araştırma çok az uyuduğumuzu gösteriyor. |
| lx:insgesamt | collocations[1] | Das macht insgesamt 20 Euro. · Toplam 20 avro ediyor. |
| lx:Experte | collocations[0] | Experten sagen, dass die Preise steigen. · Uzmanlar fiyatların artacağını söylüyor. |
| lx:Experte | collocations[2] | ein Experte für Computer · bilgisayar uzmanı |
| lx:sinnvoll | mistakes_tr[1] | Mantıklı bir fikir derken **eine sinnvoll Idee** yanlış. Doğrusu **eine sinnvolle Idee.** **Idee** önünde sona **e** eklenir. |
| lx:Bericht | mistakes_tr[1] | **die Bericht** yanlış. Doğrusu **der Bericht.** |
| lx:Ereignis | mistakes_tr[1] | Birden çok olay için **die Ereignisse** denir, sonda iki **s** yazılır. |
| lx:Vorfall | mistakes_tr[1] | Birden çok olay için **die Vorfälle** denir, **a** harfi **ä** olur. |
| lx:Unwetter | mistakes_tr[1] | **die Unwetter** tek bir fırtına için yanlış. Doğrusu **das Unwetter**, tıpkı **das Wetter** gibi. |
| lx:aktuell | forms[0].hint_tr | **die Nachrichten** önünde **aktuellen** olur. |
| lx:Einwohner | forms[0].hint_tr | Nüfus derken **Einwohner** denir. Birden çok kişi için de **Einwohner** denir. |
| lx:aufnehmen | forms[3].hint_tr | **können** varsa **aufnehmen** sona bütün olarak gelir. |
| lx:nachsehen | forms[1].hint_tr | **können** varsa **nachsehen** sona bütün olarak gelir. |
| lx:ausstellen | forms[0].hint_tr | **können** varsa **ausstellen** sona bütün olarak gelir. |
| lx:abwarten | forms[1].hint_tr | **müssen** varsa **abwarten** sona bütün olarak gelir. |
| lx:angeblich | exp.ipucu_tr | Türkçedeki geliyormuş, gitmiş gibi sözlerle aynı işi görür. |
| lx:Wirkung | exp.ipucu_tr | İlaç etki ediyor derken **Das Medikament wirkt** denir. |
| lx:zurzeit | exp.ipucu_tr | **Zurzeit** başta olunca hemen arkasından **ist** ya da **habe** gelir. |
| lx:möglichst | exp.anlam_tr | Bir şeyin olabildiğince erken, hızlı ya da çok olmasını istediğini söyler. |
| lx:zurzeit | exp.ipucu_tr (okur 2. tur) | **Zurzeit** başta olunca **sind** gibi sözcükler arkasından gelir, örneğin **Zurzeit sind alle Leitungen besetzt.** |

## Dünya uyumu (2026-11-23)

WORLD.md'de Tobi 14. haftada taşınıyor; batch-b1-01a'daki 14 Tobi geçişi (7 cümle, örnek ve boşluk çiftleri) değişti: lx:Ansicht ö5 ve boşluk 3 → Derya · lx:diskutieren ö5 ve boşluk 3 → Ioana · lx:angeblich ö4 → Basti · lx:Experte ö2 ve boşluk 2 → Basti. Cinsiyete bağlı çekim gerektiren cümle yoktu; Türkçeler uyarlandı.

## Örneklem düzeltmeleri (2026-11-23)

Örneklem raporu: `docs/v2/reviews/ornek-lexicon-b1-01.md`. İki dosyadaki 195 boşluğun hepsi, Türkçe çevirisi yanındayken, başka doğru ve sık cevap var mı sorusuyla yeniden tarandı. **84 boşluk** değişti; hepsinde eksik cevap `also_ok`'a eklendi, cümle değiştirilmedi. Artikel ya da ek başka cevabı zaten dışlıyorsa (ör. **die ___** önünde **Grund**, **Krankenhaus**) dokunulmadı.

| Kimlik | Boşluk | Ne yapıldı |
|---|---|---|
| lx:sinnvoll | forms[0] Ich finde die neue Regel ___. | also_ok: **vernünftig**, **logisch** |
| lx:sinnvoll | forms[1] Es ist ___, früh einen Termin zu machen. | also_ok: **vernünftig** |
| lx:sinnvoll | forms[2] Früh anrufen ist eine ___ Idee. | also_ok: **vernünftige** |
| lx:sinnvoll | forms[3] Soll ich vorher anrufen? Ja, das ist ___. | also_ok: **vernünftig**, **logisch** |
| lx:diskutieren | forms[0] Wir haben lange über das Thema ___. | also_ok: **gesprochen**, **geredet**, **gestritten** |
| lx:diskutieren | forms[1] Im Team ___ wir jeden Montag die Pläne. | also_ok: **besprechen** |
| lx:diskutieren | forms[2] Derya ___ gern mit Ioana. | also_ok: **streitet** |
| lx:diskutieren | forms[3] Darüber kann man ___. | also_ok: **streiten**, **reden** |
| lx:Bericht | forms[1] Im Radio kam ein ___ über das Wetter. | also_ok: **Beitrag** |
| lx:Bericht | forms[3] Ich lese gern ___ über andere Länder. | also_ok: **Artikel**, **Reportagen** |
| lx:Überschrift | forms[0] Zuerst lese ich die ___. | also_ok: **Schlagzeile** |
| lx:Überschrift | forms[1] Die ___ sagt schon viel. | also_ok: **Schlagzeile** |
| lx:Überschrift | forms[2] Welche ___ passt? | also_ok: **Schlagzeile** |
| lx:Überschrift | forms[3] Ich lese morgens nur die ___. | also_ok: **Schlagzeilen**, **Titel** |
| lx:Ereignis | forms[0] Das Stadtfest ist das größte ___ im Sommer. | also_ok: **Event** |
| lx:Ereignis | forms[2] Die Hochzeit war ein schönes ___. | also_ok: **Event** |
| lx:Ereignis | forms[3] Was war das wichtigste ___ der Woche? | also_ok: **Event** |
| lx:Vorfall | forms[0] Nach dem ___ war die Straße zwei Stunden gesperrt. | also_ok: **Ereignis** |
| lx:Vorfall | forms[2] Hast du von dem ___ gehört? | also_ok: **Ereignis** |
| lx:Vorfall | forms[3] In letzter Zeit gab es mehrere ___. | also_ok: **Ereignisse** |
| lx:aktuell | forms[0] Hier finden Sie die ___ Nachrichten. | also_ok: **neuesten** |
| lx:aktuell | forms[1] Der Fahrplan ist nicht mehr ___. | also_ok: **gültig** |
| lx:aktuell | forms[2] Wie ist die ___ Lage auf der Autobahn? | also_ok: **momentane**, **derzeitige** |
| lx:aktuell | forms[3] Ist die Nummer noch ___? | also_ok: **gültig** |
| lx:sinken | forms[0] Die Preise für Strom sind ___. | also_ok: **gefallen**, **runtergegangen** |
| lx:sinken | forms[1] In der Nacht ___ die Temperatur unter null. | also_ok: **fällt** |
| lx:sinken | forms[2] Endlich ___ die Preise mal! | also_ok: **fallen** |
| lx:sinken | forms[3] Die Zahl der Unfälle ist um zehn Prozent ___. | also_ok: **gefallen**, **zurückgegangen** |
| lx:festnehmen | forms[0] Die Polizei hat zwei Männer ___. | also_ok: **verhaftet** |
| lx:festnehmen | forms[1] Der Dieb wurde am Bahnhof ___. | also_ok: **verhaftet**, **gefasst** |
| lx:festnehmen | forms[3] Sie hat ihn gestern ___. | also_ok: **verhaftet** |
| lx:Einwohner | forms[0] Die Stadt hat etwa 60.000 ___. | also_ok: **Bewohner** |
| lx:Einwohner | forms[1] Viele ___ sind gegen die neue Straße. | also_ok: **Bewohner**, **Anwohner** |
| lx:Einwohner | forms[2] Ein ___ hat die Polizei angerufen. | also_ok: **Bewohner**, **Anwohner** |
| lx:Einwohner | forms[3] Das ist eine Stadt mit 20.000 ___. | also_ok: **Bewohnern** |
| lx:Unwetter | forms[0] Nach dem ___ waren viele Straßen gesperrt. | also_ok: **Sturm**, **Gewitter** |
| lx:Unwetter | forms[1] Das Radio warnt für heute Abend vor ___. | also_ok: **Unwettern**, **Sturm** |
| lx:Unwetter | forms[2] Wegen des ___ fahren keine Züge. | also_ok: **Sturms**, **Gewitters** |
| lx:Unwetter | forms[3] Es kommt ein ___. | also_ok: **Sturm**, **Gewitter** |
| lx:Studie | forms[0] Laut einer ___ lesen junge Leute weniger Zeitung. | also_ok: **Untersuchung** |
| lx:Studie | forms[1] Eine neue ___ zeigt, dass viele Menschen zu wenig schlafen. | also_ok: **Untersuchung** |
| lx:Studie | forms[2] Es gibt viele ___ zu diesem Thema. | also_ok: **Untersuchungen** |
| lx:Studie | forms[3] Woher wissen Sie das? Aus einer ___. | also_ok: **Untersuchung** |
| lx:insgesamt | forms[0] Das macht ___ 23 Euro 50. | also_ok: **zusammen** |
| lx:insgesamt | forms[1] Wir waren ___ zehn Leute. | also_ok: **zusammen** |
| lx:insgesamt | forms[3] Was kostet das ___? | also_ok: **zusammen** |
| lx:Experte | forms[0] ___ sagen, dass die Preise weiter steigen. | also_ok: **Fachleute**, **Spezialisten** |
| lx:Experte | forms[1] Basti ist unser ___ für Computer. | also_ok: **Fachmann**, **Spezialist**, **Profi** |
| lx:Experte | forms[2] Wir brauchen einen ___ für die Heizung. | also_ok: **Fachmann**, **Spezialisten** |
| lx:Experte | forms[3] Nee, da ist mein Bruder der ___. | also_ok: **Fachmann**, **Spezialist**, **Profi** |
| lx:Behandlung | forms[0] Wie lange dauert die ___? | also_ok: **Therapie** |
| lx:Behandlung | forms[1] Die ___ beginnt nächste Woche. | also_ok: **Therapie** |
| lx:Behandlung | forms[3] Es gibt zwei verschiedene ___. | also_ok: **Therapien** |
| lx:Ursache | forms[3] Es kann viele ___ geben. | also_ok: **Gründe** |
| lx:harmlos | forms[0] Keine Sorge, das ist ___. | also_ok: **ungefährlich** |
| lx:harmlos | forms[1] Das ist nur eine ___ Erkältung. | also_ok: **leichte** |
| lx:harmlos | forms[2] Nein, das ist völlig ___. | also_ok: **ungefährlich** |
| lx:Medikament | forms[0] Wofür ist dieses ___? | also_ok: **Mittel** |
| lx:Medikament | forms[2] Nehmen Sie das ___ nach dem Essen. | also_ok: **Mittel** |
| lx:Medikament | forms[3] Hilft das ___? | also_ok: **Mittel** |
| lx:nachfragen | forms[0] Darf ich noch mal ___? | also_ok: **fragen** |
| lx:nachfragen | forms[1] Ich habe beim Arzt ___. | also_ok: **gefragt** |
| lx:Facharzt | forms[0] Dr. Weber schickt mich zum ___. | also_ok: **Spezialisten** |
| lx:Facharzt | forms[1] Ich brauche einen Termin beim ___. | also_ok: **Spezialisten** |
| lx:Facharzt | forms[2] Warst du schon beim ___? | also_ok: **Spezialisten** |
| lx:Facharzt | forms[3] Für Augen und Haut gibt es ___. | also_ok: **Spezialisten** |
| lx:kurzfristig | forms[0] Haben Sie ___ einen Termin frei? | also_ok: **bald**, **demnächst** |
| lx:kurzfristig | forms[2] Hm, das ist mir zu ___. | also_ok: **spontan** |
| lx:aufnehmen | forms[3] Können Sie meine Mutter als neue Patientin ___? | also_ok: **annehmen** |
| lx:nachsehen | forms[0] Moment, ich ___ mal im Kalender nach. | also_ok: **gucke**, **guck** |
| lx:nachsehen | forms[1] Können Sie bitte ___, ob noch ein Termin frei ist? | also_ok: **schauen**, **nachgucken** |
| lx:nachsehen | forms[2] Haben Sie schon im Kalender ___? | also_ok: **geschaut**, **nachgeguckt** |
| lx:nachsehen | forms[3] Frau Huber ___ im Computer nach. | also_ok: **guckt** |
| lx:zurzeit | forms[0] ___ sind alle Leitungen besetzt. | also_ok: **Jetzt**, **Aktuell** |
| lx:zurzeit | forms[1] Die Praxis ist ___ geschlossen. | also_ok: **jetzt**, **aktuell** |
| lx:zurzeit | forms[2] Nein, er ist ___ im Urlaub. | also_ok: **jetzt**, **aktuell** |
| lx:ausstellen | forms[0] Können Sie mir eine Überweisung zum Augenarzt ___? | also_ok: **schreiben**, **geben**, **ausschreiben** |
| lx:ausstellen | forms[1] Frau Huber ___ Ihnen das Rezept gleich aus. | also_ok: **schreibt** |
| lx:ausstellen | forms[2] Dr. Weber hat mir die Überweisung gestern ___. | also_ok: **geschrieben**, **gegeben**, **ausgeschrieben** |
| lx:ausstellen | forms[3] Ja, die ___ ich Ihnen gleich aus. | also_ok: **schreibe** |
| lx:abwarten | forms[1] Sie müssen noch ein paar Tage ___. | also_ok: **warten** |
| lx:abwarten | forms[3] Wir haben zwei Wochen ___. | also_ok: **gewartet** |
| lx:Klinik | forms[3] Die beiden ___ liegen nah beieinander. | also_ok: **Krankenhäuser** |
| lx:Hinweis | forms[3] Auf dem Zettel stehen alle ___ zum Termin. | also_ok: **Informationen**, **Infos** |

## Örneklem 2. tur ve kapanış (2026-11-23)

| Kimlik | Boşluk | Ne yapıldı |
|---|---|---|
| lx:diskutieren | forms[0], forms[2] | `also_ok`'tan **gestritten** ve **streitet** çıktı (kavga etmek; kartın hata notuyla çelişiyordu). forms[3] **streiten** kaldı: **Darüber kann man streiten** tartışılır anlamında yerleşik. |
| lx:Vorfall | forms[0], forms[2], forms[3] | `also_ok`'tan **Ereignis**, **Ereignisse** çıktı. İki kart tam bu ayrımı öğretiyor (kötü olay **Vorfall**, güzel olay **Ereignis**). |
| lx:Meldung | forms[1] | `also_ok`: **Nachricht** |
| lx:Wartezeit | forms[2] | `also_ok`: **warten** |

Makine taraması: her kartın `also_ok` sözcükleri aynı kartın `mistakes_tr` içindeki kalın sözcüklerle karşılaştırıldı. 7 eşleşme çıktı. lx:Vorfall (2) çıkarıldı. Kalan 5'i çelişki değil: lx:Meldung **Nachricht** (not yalnız arkadaştan gelen mesajı ayırıyor), lx:sinken **fallen** (fiyat için de doğru; not yere düşmeyi anlatıyor), lx:einnehmen **nehmen** ve lx:abwarten **warten** (notlarda doğru biçim olarak geçiyor).

Okur 3. turda geçti, örneklem bu düzeltmelerle kapandı. İki dosyada `review.status: reviewed`, `okur: passed`. **Sonuç: KAPANDI.** Baştaki B-1 böylece kapandı; B-2 (img, ne_zaman_tr) ve B-3 (sevk zorunluluğu kaynağı) açık duruyor.
