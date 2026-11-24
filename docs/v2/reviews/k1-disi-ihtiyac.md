# K1 dışı kart ihtiyaç listesi: A2 "yapabiliyorum" aileleri

> Görev: PM 7053121964 İÇ 3; PM 7049695521 F3. Yazar (içerik motoru), 2026-11-21. Durum: **taslak**. Yalnız liste ve gerekçe; kart yazılmadı (kart yazımı PM talimatından sonra). Makine listesi: `docs/v2/reviews/k1-disi-ihtiyac.json`.

## 1. Kapsam ve yöntem

- **Okunanlar:** `docs/v2/LEARNER.md`; `docs/v2/AHTAPOT.md` AH-1 ve AH-2; `docs/v2/KAYNAKLAR.md`; `docs/v2/WORLD.md` (mekânlar, karakter sözleri, 26 hafta, takvim, §5 Bairisch tablosu); sözlük `content/v2/registry/lexicon/batch-001…015.json` (1268 kart: 1207 K1, 61 pasif); sıklık `content/v2/registry/frequency/lemmas.json` (5000 lemma; rank ≤2000 = K1 katmanı, sonrası K2). `content/v2/curriculum/omurga.json` bu dalda yok; yok sayıldı. K1 tanımı için yalnız `content/v2/curriculum/k1.json` çekirdek kimlikleri sayıldı (1249 id).
- **Eleme:** (a) sözlükte kartı olan (her tier) lemma alınmadı; (b) K1 çekirdeğinde olup kartı henüz yazılmamış 45 lemma da alınmadı (Ek A); onlar K1 hattının işidir. Bu yüzden listede sıklığı K1 katmanında olan ama K1 çekirdeğine seçilmemiş sözcükler de var (ör. Anruf, Medikament, Richtung); bunlar "K1 katmanında, çekirdekte yok" notuyla işaretli.
- **Durumlar:** AH-1'deki her ailenin A2 hedefi WORLD'deki gerçek sahnelere açıldı (bölüm başlarında). Her sözcük için tek soru: "Bunu yarın gerçekten duyar/söyler mi?"
- **Sıklık tek ölçüt değil.** Sıklığı düşük ya da sıklık listesinde olmayan ama durumu kritik sözcükler **Kritik** sütununda "evet" ile işaretli (toplam 37). PM'in örneklerinden Versichertenkarte, Überweisung (havale + sevk; iki anlam örneklerde var) ve Krankmeldung kartları **zaten var**; bu yüzden listede değiller.
- **Sıklık sütunu:** "rank (katman)". "~" işareti: lemmatizer hatası yüzünden sözcük başka bir lemmanın biçimi olarak sayılmış (ör. Post → 'posten', Garten → 'garen', Bahn → 'bahnen'); bu sayı yaklaşık ve büyük olasılıkla karışıktır (Ek C).
- **Telif:** Goethe/telc kelime listeleri kopyalanmadı ve karşılaştırılmadı; yalnız genel referans: listedeki P1/P2 sözcüklerinin büyük kısmı "A2 düzeyinde beklenir" türündendir. Kaynak sınıfları KAYNAKLAR §1–§4'e uygun: sıklık (B, yalnız sıra), Bairisch yalnız WORLD §5'teki kaynaklı kayıtlar.
- **Öncelik:** P1 = M1 sonrası ilk 8 hafta (hikâye hafta 2–9: Advent, telefon/doktor, Weihnachtsfeier, Stille Tage, Silvester, kalorifer, eczane, spor salonu) içinde lazım; P2 = A2 sonuna kadar; P3 = tanıma yeter. **Kullanım:** ü = üretim (söyler/yazar), t = tanıma (duyar/okur). P1 içinde de yalnız tanıma gereken sözcükler var (ör. anons, sekreterin sözü).
- **Kişisel bilgi yok:** öğrencinin işi, ailesi, ilacı varsayılmadı; gerekçelerde yalnız WORLD karakterleri ve genel durumlar var. Hukuki/olgusal ayrıntı içeren sözcüklerde (Wohnungsgeberbestätigung, Rundfunkbeitrag, Gelber Sack) "kart yazımında kaynakla" notu var.

## 2. Özet: aile × öncelik

| # | Aile | A2 hedefi (AH-1) | P1 | P2 | P3 | Toplam | Kritik |
|---|---|---|---|---|---|---|---|
| 1 | Telefon | Randevu alırım ve kaydırırım | 11 | 18 | 6 | 35 | 3 |
| 2 | Sağlık | Şikâyetimi anlatırım | 19 | 26 | 10 | 55 | 8 |
| 3 | Resmî işler ve mektuplar | Bir mektubun ne istediğini anlarım | 9 | 23 | 8 | 40 | 8 |
| 4 | İş | Molada küçük sohbet ederim | 10 | 21 | 4 | 35 | 2 |
| 5 | Gündelik hizmetler (market, kuaför, spor salonu, banka, ev, ustalar) | İstediğimi söylerim | 22 | 29 | 9 | 60 | 5 |
| 6 | İnsanlarla bağ (komşu, dernek, arkadaş) | Kendimi ve hafta sonumu anlatırım | 12 | 17 | 5 | 34 | 3 |
| 7 | Kulak (hızlı, gürültülü, aksanlı, Bairisch) | Anonsu ve sesli mesajı anlarım | 7 | 14 | 7 | 28 | 4 |
| 8 | Okuma ve yazma (haber, ilan, form, mesaj, e-posta) | Bildirim, ilan, kısa mesaj | 12 | 19 | 4 | 35 | 4 |
| | **Toplam** | | **102** | **167** | **53** | **322** | **37** |

Kullanım dağılımı: üretim 134, tanıma 188. Ayrıca: Bairisch "kaynak gerekli" adayları 14 (sayıma girmez, §4.7.2); K1 planında kartsız 45 (sayıma girmez, Ek A).

## 3. M1 sonrası ilk parti: önerilen 40 kart

Seçim ölçütü: (1) hikâye hafta 2–9 sahnelerinde ve gerçek görevlerinde geçmesi, (2) telefon korkusu ve doktor ipliğini (hafta 3, 7, 8) taşıması, (3) var olan kartları kullanılır kılması (ör. täglich → Tablette/Tropfen; messen → Blutdruck), (4) her gün duyulması. Sıra öneridir; dağılım: Sağlık 10, Telefon 9, Gündelik hizmetler 8, Bağ 5, İş 5, Okuma 2, Kulak 1 (Signalton telefon ipliğiyle birlikte); 40'ın tamamı P1.

| # | Lemma | Aile | Kullanım | Sıklık | Gerekçe |
|---|---|---|---|---|---|
| 1 | Anruf | Telefon | ü | 951 (K1) | Telefon ipliğinin (hafta 3, 7) her konuşmasında; sıklık K1 katmanında ama çekirdeğe girmemiş. |
| 2 | verschieben | Telefon | ü | 2488 (K2) | AH-1 Telefon A2 hedefinin fiili; hafta 15 gerçek görevi (randevu ertele). |
| 3 | vereinbaren | Telefon | ü | 4630 (K2) | Randevu aramasının ilk cümlesi; seyrek ama hafta 3 senaryosunda kaçınılmaz. |
| 4 | Wiederhören | Telefon | ü | 3724 (K2) | Her telefonun kapanışı; öğrenci hafta 3'te söyler. |
| 5 | eintragen | Telefon | t | listede yok | Frau Huber'in onay sözü; randevunun alındığını anlamak. |
| 6 | Mailbox | Telefon | t | listede yok | Telefon korkusunun ilk engeli: aranan açmaz. |
| 7 | hinterlassen | Telefon | ü | 1104 (K1) | Sesli mesaj bırakmak (AH-1 Kulak A2: sesli mesaj). |
| 8 | Signalton | Kulak | t | listede yok | Sesli mesajda ne zaman konuşacağını söyler (Piepton aynı kart). |
| 9 | leise | Telefon | ü | 950 (K1) | Hat sorununu düzeltmenin en kısa yolu; apartman kuralında da. |
| 10 | akut | Telefon | t | listede yok | Sekreterin karar sorusu; aynı gün randevu buna bağlı. |
| 11 | Grippe | Sağlık | ü | 4832 (K2) | Aralık–Ocak; hafta 3 hastalık senaryosu. |
| 12 | Medikament | Sağlık | ü | 1658 (K1) | Muayene ve eczanenin temel sorusu; K1 katmanında ama çekirdeğe girmemiş. |
| 13 | einnehmen | Sağlık | t | 2422 (K2) | İlaç talimatının fiili (hafta 8). |
| 14 | täglich | Sağlık | t | 2218 (K2) | Dozaj ("dreimal täglich"); Tropfen ve Tablette kartlarını kullanılır kılar. |
| 15 | Zuzahlung | Sağlık | t | listede yok | WORLD hafta 8 sahnesinin sözü; sıklık listesinde yok. |
| 16 | rezeptfrei | Sağlık | ü | listede yok | Eczanede reçetesiz ilaç istemek (hafta 8). |
| 17 | Hustensaft | Sağlık | ü | listede yok | Hafta 3 ve 8'in en gerçekçi eczane isteği. |
| 18 | messen | Sağlık | ü | 2455 (K2) | "Haben Sie Fieber gemessen?" telefondaki ilk sorulardan; Blutdruck kartının fiili. |
| 19 | frei machen | Sağlık | t | listede yok | Dr. Weber'in WORLD'deki sık sözü; kelime kelime anlaşılmaz. |
| 20 | Notdienst | Sağlık | t | listede yok | 6.1. ve Noel tatillerinde açık eczaneyi bulmak (hafta 5–7). |
| 21 | Öffnungszeiten | Okuma ve yazma | ü | listede yok | Hafta 3 ve 5 gerçek görevleri; sıklık listesinde yok. |
| 22 | Betriebsferien | Okuma ve yazma | t | listede yok | Hafta 5 "tatil açılış saatini oku" görevi. |
| 23 | alkoholfrei | Gündelik hizmetler | ü | listede yok | Weihnachtsmarkt ve Weihnachtsfeier (hafta 2, 4). |
| 24 | Richtung | Gündelik hizmetler | ü | 863 (K1) | Otobüs/trende yön sormak ve anonsu anlamak; K1 katmanında ama çekirdekte yok. |
| 25 | mitbringen | İnsanlarla bağ | ü | 2777 (K2) | Weihnachtsfeier/Wichteln (hafta 4): "Was soll ich mitbringen?" |
| 26 | vorbeikommen | İnsanlarla bağ | ü | 2341 (K2) | Frau Brandl'ın daveti (hafta 5); komşuluk ipliği. |
| 27 | Heiligabend | İnsanlarla bağ | t | listede yok | Hafta 5 sahnesi; dükkânların erken kapandığı gün. |
| 28 | Rutsch | İnsanlarla bağ | ü | listede yok | Hafta 6 gerçek görevi "Guten Rutsch!". |
| 29 | unternehmen | İnsanlarla bağ | t | 1134 (K1) | Pazartesi molasının sorusu; AH-1 Bağ A2 hedefinin girişi. |
| 30 | Mahlzeit | İş | ü | 3214 (K2) | İş yerinde her öğlen; WORLD'de Tobi'nin sözü. |
| 31 | Schnee | İş | ü | 2113 (K2) | Aralık–Şubat mola sohbetinin konusu. |
| 32 | glatt | İş | t | 3263 (K2) | Kış sabahı uyarısı; mola ve radyo. |
| 33 | tauschen | İş | ü | 1944 (K1) | Vardiya takası; iş ailesinin en sık ricası. |
| 34 | freinehmen | İş | ü | listede yok | Randevu için izin istemek (doktor, Bürgerbüro). |
| 35 | Handwerker | Gündelik hizmetler | t | listede yok | Hafta 7 kalorifer arızası. |
| 36 | Heizkörper | Gündelik hizmetler | ü | listede yok | Hafta 7: arızayı somut söylemek. |
| 37 | Biomüll | Gündelik hizmetler | t | listede yok | Pichler'in WORLD sözü; çöp ayırma her hafta. |
| 38 | Mitglied | Gündelik hizmetler | t | 1475 (K1) | Hafta 9 spor salonu kaydının ilk sorusu. |
| 39 | Breze | Gündelik hizmetler | ü | listede yok | Bäckerei Stadler'de her sabah (hafta 1–3); WORLD'de geçer. |
| 40 | ungefähr | Gündelik hizmetler | ü | 1118 (K1) | "Was kostet das ungefähr?" her hizmet durumunda; K1 katmanında ama çekirdekte yok. |

## 4. Aile listeleri

### 4.1 Telefon

A2 hedefi (AH-1): **Randevu alırım ve kaydırırım**. Durumlar:
- **T1** Randevu alma, kaydırma, iptal (Frau Huber; hafta 3, 15)
- **T2** Kurum hattı, santral, sıra bekleme
- **T3** Sesli mesaj bırakma ve geri aranma
- **T4** Yanlış anlaşılmayı ve hat sorununu düzeltme
- **T5** Gelen arama (iş, ev, kurye; hafta 7, 17, 25)

| Lemma | Artikel, çoğul / tür | Durum | Gerekçe | Sıklık | Öncelik | Kullanım | Kritik | Not |
|---|---|---|---|---|---|---|---|---|
| Wiederhören | das (Auf Wiederhören!) | T1 | Telefonun kapanış sözü; Frau Huber her aramayı bununla bitirir, öğrenci de söyler. | 3724 (K2) | P1 | ü |  | ilk parti · Wiedersehen kartından ayrı: yalnız telefonda |
| verschieben | fiil (verschob, hat verschoben) | T1 | AH-1 Telefon A2 hedefinin ("randevumu kaydırırım") ana fiili: "Kann ich den Termin verschieben?" | 2488 (K2) | P1 | ü |  | ilk parti |
| vereinbaren | fiil (hat vereinbart) | T1 | "Ich möchte einen Termin vereinbaren" muayenehane, Bürgerbüro ve tamirhane aramalarının ilk cümlesidir. | 4630 (K2) | P1 | ü | evet | ilk parti · sıklık düşük, durum kritik |
| bestätigen | fiil (hat bestätigt) | T1 | "Ich bestätige Ihnen den Termin" ve SMS onayı randevu konuşmasının sonunda duyulur. | 1258 (K1) | P1 | t |  |  |
| eintragen | fiil, ayrılan (trägt ein, hat eingetragen) | T1 | Frau Huber "Ich trag Sie für Dienstag ein" der; öğrenci randevunun alındığını bu sözden anlar. | listede yok | P1 | t |  | ilk parti |
| akut | sıfat | T1 | Sekreter "Ist es akut?" diye sorar; cevaba göre aynı gün ya da haftalar sonra randevu verilir. | listede yok | P1 | t | evet | ilk parti |
| besetzt | sıfat | T2 | Hat meşgulken duyulur ve tuvalet/koltuk için de kullanılır ("Ist hier besetzt?"). | ~2731 (K2; 'besetzen' altında) | P1 | t |  |  |
| Mailbox | die Mailbox, -en | T3 | Aranan açmazsa "Sie sind mit der Mailbox von … verbunden" duyulur; telefon korkusunun ilk engeli. | listede yok | P1 | t |  | ilk parti |
| hinterlassen | fiil (hinterließ, hat hinterlassen) | T3 | "Bitte hinterlassen Sie eine Nachricht" sözünü anlamak ve "Ich habe eine Nachricht hinterlassen" demek. | 1104 (K1) | P1 | ü |  | ilk parti |
| leise | sıfat | T4 | "Sie sind sehr leise, ich verstehe Sie schlecht" hat sorununu düzeltmenin en kısa yoludur; apartman sessizlik kuralında da geçer. | 950 (K1) | P1 | ü |  | ilk parti |
| Anruf | der Anruf, -e | T5 | "Danke für Ihren Anruf" ve "Ich hatte einen Anruf von…" her telefon gününde duyulur ve söylenir. | 951 (K1) | P1 | ü |  | ilk parti |
| Wartezeit | die Wartezeit, -en | T1 | "Die Wartezeit beträgt etwa drei Wochen" uzman randevusunda duyulur. | listede yok | P2 | t |  |  |
| kurzfristig | sıfat/zarf | T1 | "Kurzfristig ist leider nichts frei" ve "kurzfristig absagen" randevu dilinin sabit parçasıdır. | listede yok | P2 | t |  |  |
| Bestätigung | die Bestätigung, -en | T1 | Randevu sonrası gelen SMS/e-posta "Terminbestätigung" başlığını taşır. | 4349 (K2) | P2 | t |  |  |
| Taste | die Taste, -n | T2 | Kurum hatlarında "Drücken Sie die Taste 1" anonsu olmadan menü geçilemez. | listede yok | P2 | t |  |  |
| Anliegen | das Anliegen, - | T2 | Kurum ve hotline "Worum geht es? Was ist Ihr Anliegen?" diye sorar; sıklığı düşük, resmî aramada kaçınılmaz. | listede yok | P2 | t | evet |  |
| Kundennummer | die Kundennummer, -n | T2 | Banka, sigorta, telefon şirketi önce "Ihre Kundennummer, bitte?" der. | listede yok | P2 | t |  |  |
| durchstellen | fiil, ayrılan (hat durchgestellt) | T2 | "Ich stell Sie durch" sözü aktarılacağını, kapatmaması gerektiğini söyler. | listede yok | P2 | t |  |  |
| erreichbar | sıfat | T3 | Sesli mesajda "Ich bin ab 17 Uhr erreichbar" demek geri aranmanın şartıdır. | listede yok | P2 | ü |  |  |
| Sprachnachricht | die Sprachnachricht, -en | T3 | Mesaj gruplarında sesli mesaj (hafta 26 Tobi) gönderip anlatmak için. | listede yok | P2 | ü |  |  |
| zurzeit | zarf | T3 | "Wir sind zurzeit nicht erreichbar" kayıtlı anonslarda kalıptır. | 3045 (K2) | P2 | t |  |  |
| deutlich | sıfat | T4 | "Können Sie bitte etwas deutlicher sprechen?" hızlı konuşan sekretere karşı ikinci kurtarma cümlesidir. | 1698 (K1) | P2 | ü |  |  |
| Missverständnis | das Missverständnis, -se | T4 | "Das war ein Missverständnis" yanlış anlaşılmayı kibarca kapatır; AH-1 Telefon hedefinin parçası. | 2956 (K2) | P2 | ü |  |  |
| verwechseln | fiil (hat verwechselt) | T4 | "Da haben Sie mich verwechselt" / "Ich habe die Tage verwechselt" randevu karışıklığında duyulur. | 3508 (K2) | P2 | t |  |  |
| verwählen | fiil, dönüşlü (sich verwählen) | T4 | Yanlış numarayı arayınca "Entschuldigung, ich habe mich verwählt" demek paniği önler. | listede yok | P2 | ü |  |  |
| Akku | der Akku, -s | T4 | "Mein Akku ist gleich leer" konuşmayı kibarca kısaltmanın gerçek gerekçesidir. | listede yok | P2 | ü |  |  |
| ausrichten | fiil, ayrılan (hat ausgerichtet) | T5 | Aranan yoksa "Soll ich ihm etwas ausrichten?" diye sorulur; iş yerinde ve muayenehanede gerçek. | 3091 (K2) | P2 | t |  |  |
| klingeln | fiil (hat geklingelt) | T5 | Telefon ve kapı zili için: "Das Handy klingelt", "Der Paketbote hat geklingelt". | 938 (K1) | P2 | ü |  |  |
| rangehen | fiil, ayrılan, gündelik (ist rangegangen) | T5 | "Warum gehst du nicht ran?" iş arkadaşları arasında sık; Alltag katmanı. | 4068 (K2) | P2 | t |  |  |
| stornieren | fiil (hat storniert) | T1 | Online randevu ve sipariş iptalinde yazılı olarak görülür. | listede yok | P3 | t |  |  |
| Vorwahl | die Vorwahl, -en | T2 | Numara söylerken "die Vorwahl ist …" diye ayrıca söylenir. | listede yok | P3 | t |  |  |
| Festnetz | das Festnetz | T2 | Formlarda ve telefonda "Festnetz oder Handy?" sorusu. | listede yok | P3 | t |  |  |
| Rufnummer | die Rufnummer, -n | T2 | "Die gewählte Rufnummer ist nicht vergeben" kayıtlı anonsunu anlamak için. | listede yok | P3 | t |  |  |
| Empfang | der Empfang | T4 | "Ich habe hier schlechten Empfang" trende ve bodrumda duyulur; ayrıca resepsiyon anlamı. | ~1147 (K1; 'empfangen' altında) | P3 | t |  |  |
| Apparat | der Apparat, -e | T5 | "Huber am Apparat" eski ama hâlâ duyulan telefon açılış biçimidir. | 3178 (K2) | P3 | t |  |  |

### 4.2 Sağlık

A2 hedefi (AH-1): **Şikâyetimi anlatırım**. Durumlar:
- **S1** Şikâyeti anlatma (belirti, beden)
- **S2** Muayene talimatları ve tahlil (Dr. Weber)
- **S3** İlaç ve eczane (hafta 8)
- **S4** Sigorta kartı, sevk, uzman
- **S5** Acil, nöbetçi eczane, ev ziyareti

| Lemma | Artikel, çoğul / tür | Durum | Gerekçe | Sıklık | Öncelik | Kullanım | Kritik | Not |
|---|---|---|---|---|---|---|---|---|
| Grippe | die Grippe, -n | S1 | Aralık–Ocak'ta muayenehanede ve iş yerinde her gün geçer ("Die Grippe geht um"). | 4832 (K2) | P1 | ü |  | ilk parti |
| Zahn | der Zahn, ¨-e | S1 | "Mir tut ein Zahn weh" Zahnarzt kartının kullanılabilmesi için gerekli. | ~3411 (K2; 'zahnen' altında) | P1 | ü |  |  |
| Knie | das Knie, - | S1 | Düşme (hafta 8 Frau Brandl) ve spor salonu (hafta 9) şikâyetlerinin en sık beden sözü. | ~1337 (K1; 'knien' altında) | P1 | ü |  |  |
| Magen | der Magen, ¨ | S1 | "Mir ist schlecht, ich hab's mit dem Magen" mide şikâyetinin ana sözüdür. | 2276 (K2) | P1 | ü |  |  |
| Gesundheit | die Gesundheit | S1 | "Gesundheit!" hapşırana her gün söylenir; ayrıca dilek ve sigorta sözlerinde geçer. | 2211 (K2) | P1 | ü |  |  |
| untersuchen | fiil (hat untersucht) | S2 | Dr. Weber "Ich untersuche Sie mal kurz" der; muayenenin başladığını anlatır. | 1223 (K1) | P1 | t |  |  |
| einatmen | fiil, ayrılan (hat eingeatmet) | S2 | Dinleme sırasında "Tief einatmen … und ausatmen" talimatı anlaşılmazsa muayene aksar. | 4894 (K2) | P1 | t | evet | ausatmen aynı kartta |
| hinlegen | fiil, ayrılan, dönüşlü (sich hinlegen) | S2 | "Legen Sie sich bitte hier hin" muayene talimatıdır; ayrıca "Ich leg mich kurz hin". | 2534 (K2) | P1 | t |  |  |
| frei machen | fiil, dönüşlü (sich frei machen) | S2 | Dr. Weber'in sık sözü "Machen Sie sich mal frei" (üstünü çıkar) WORLD'de tanımlı; kelime kelime çevrilirse anlaşılmaz. | listede yok | P1 | t | evet | ilk parti |
| messen | fiil (misst, hat gemessen) | S2 | "Haben Sie Fieber gemessen?" sekreterin ilk sorularındandır; Blutdruck kartıyla birlikte kullanılır. | 2455 (K2) | P1 | ü |  | ilk parti |
| rauchen | fiil (hat geraucht) | S2 | Doktorun rutin sorusu "Rauchen Sie?"; molada "Ich geh kurz rauchen" de çok duyulur. | 855 (K1) | P1 | ü |  |  |
| Medikament | das Medikament, -e | S3 | "Nehmen Sie regelmäßig Medikamente?" muayenenin ve eczanenin temel sorusu. | 1658 (K1) | P1 | ü |  | ilk parti · sıklık K1 katmanında ama K1 çekirdeğinde yok |
| einnehmen | fiil, ayrılan (nimmt ein, hat eingenommen) | S3 | "Zweimal täglich nach dem Essen einnehmen" ilaç talimatının fiilidir. | 2422 (K2) | P1 | t |  | ilk parti |
| täglich | sıfat/zarf | S3 | Dozaj talimatı "dreimal täglich" olmadan ilacın nasıl alınacağı anlaşılmaz. | 2218 (K2) | P1 | t |  | ilk parti |
| Zuzahlung | die Zuzahlung, -en | S3 | Hafta 8 (WORLD): eczanede reçeteli ilaçta katkı payı sorusu; sıklık listesinde yok, durumda kaçınılmaz. | listede yok | P1 | t | evet | ilk parti |
| rezeptfrei | sıfat | S3 | "Gibt es das auch rezeptfrei?" eczanede reçetesiz ilaç istemenin anahtarıdır (hafta 8). | listede yok | P1 | ü | evet | ilk parti |
| Hustensaft | der Hustensaft, ¨-e | S3 | Hafta 3 boğaz/öksürük ve hafta 8 eczane için en gerçekçi istek. | listede yok | P1 | ü |  | ilk parti |
| stürzen | fiil (ist gestürzt) | S5 | Hafta 8: "Frau Brandl ist gestürzt" — komşunun durumunu anlamak ve aktarmak için. | 1537 (K1) | P1 | t |  |  |
| Notdienst | der Notdienst, -e | S5 | Bayram ve tatil günlerinde (6.1., Noel) açık eczane "Notdienst" yazısıyla bulunur. | listede yok | P1 | t | evet | ilk parti |
| Brust | die Brust, ¨-e | S1 | "Ich habe Schmerzen in der Brust" acil kararını değiştiren cümledir. | 1847 (K1) | P2 | ü |  |  |
| Schulter | die Schulter, -n | S1 | İş ve spor ağrısında sık: "Meine Schulter tut weh". | ~1629 (K1; 'schultern' altında) | P2 | ü |  |  |
| Haut | die Haut, ¨-e | S1 | Kaşıntı ve döküntü anlatırken ve eczanede krem isterken gerekli. | ~645 (K1; 'hauen' altında) | P2 | ü |  |  |
| Temperatur | die Temperatur, -en | S1 | "Ich habe erhöhte Temperatur" ateşin yumuşak söylenişi; hava durumunda da geçer. | 3798 (K2) | P2 | ü |  |  |
| allergisch | sıfat | S1 | "Ich bin allergisch gegen Penizillin" ilaç vermeden önce sorulan sorunun cevabıdır. | 4553 (K2) | P2 | ü |  | Allergie kartı var, sıfat yok |
| Verletzung | die Verletzung, -en | S1 | İş kazası ve sporda "eine Verletzung am Knie" anlatmak için; fiil kartı var, isim yok. | 2192 (K2) | P2 | ü |  |  |
| Ausschlag | der Ausschlag, ¨-e | S1 | Cilt şikâyetini tek sözle anlatır. | listede yok | P2 | ü |  |  |
| jucken | fiil (hat gejuckt) | S1 | "Es juckt" kaşıntının tek doğal söylenişi. | 4914 (K2) | P2 | ü |  |  |
| brennen | fiil (brannte, hat gebrannt) | S1 | "Es brennt beim Schlucken" boğaz şikâyetinin doğal anlatımı; ateş/yangın anlamı da var. | 1189 (K1) | P2 | ü |  |  |
| geschwollen | sıfat | S1 | "Der Knöchel ist geschwollen" düşme ve burkulmada anahtar söz. | listede yok | P2 | ü |  |  |
| übergeben | fiil, dönüşlü (sich übergeben) | S1 | "Ich habe mich übergeben" kusmanın kibar söylenişi; doktor ve işe hasta bildiriminde gerekir. | 1776 (K1) | P2 | ü |  |  |
| Untersuchung | die Untersuchung, -en | S2 | Randevu türü ve sevk kâğıdında yazılı: "zur Untersuchung". | 1522 (K1) | P2 | t |  |  |
| Oberkörper | der Oberkörper, - | S2 | "Machen Sie bitte den Oberkörper frei" talimatının nesnesi. | listede yok | P2 | t |  |  |
| Spritze | die Spritze, -n | S2 | Aşı ve tedavide "Sie bekommen eine Spritze" duyulur. | ~2683 (K2; 'spritzen' altında) | P2 | t |  |  |
| Blutabnahme | die Blutabnahme, -n | S2 | Kan tahlili randevusu "zur Blutabnahme kommen, nüchtern" diye verilir. | listede yok | P2 | t |  |  |
| Ergebnis | das Ergebnis, -se | S2 | "Die Ergebnisse sind da" tahlil sonucu için arandığında duyulur; işte de geçer. | 1601 (K1) | P2 | t |  |  |
| Entzündung | die Entzündung, -en | S2 | Doktorun en sık teşhis sözlerinden: "Das ist eine Entzündung". | listede yok | P2 | t |  |  |
| Bettruhe | die Bettruhe | S2 | Doktorun reçetesiz tavsiyesi "Halten Sie zwei Tage Bettruhe". | listede yok | P2 | t |  |  |
| schwanger | sıfat | S3 | Eczane ve muayenede ilaç öncesi sorulan rutin soru: "Sind Sie schwanger?" | 1082 (K1) | P2 | t |  |  |
| rezeptpflichtig | sıfat | S3 | "Das ist leider rezeptpflichtig" cevabını anlamak için. | listede yok | P2 | t | evet |  |
| Packung | die Packung, -en | S3 | "Eine kleine Packung, bitte" eczane ve markette kullanılır. | listede yok | P2 | ü |  |  |
| Nasenspray | das Nasenspray, -s | S3 | Kış nezlesinde eczanede en sık istenen ürünlerden. | listede yok | P2 | ü |  |  |
| Pflaster | das Pflaster, - | S3 | Küçük yaralanmada eczanede ve iş yerinde ilk yardım kutusunda istenir. | listede yok | P2 | ü |  |  |
| Facharzt | der Facharzt, ¨-e / die Fachärztin, -nen | S4 | Aile hekimi "Sie brauchen einen Facharzt" der; sevk konuşmasının merkezi. | listede yok | P2 | t |  |  |
| Quartal | das Quartal, -e | S4 | Sekreter "Waren Sie dieses Quartal schon bei uns?" diye sorar; kart okutma buna bağlıdır. | listede yok | P2 | t | evet |  |
| Gesundheitskarte | die Gesundheitskarte, -n | S4 | Versichertenkarte'nin resmî adı; mektupta ve formda bu biçimle karşılaşılır. | listede yok | P2 | t | evet |  |
| Kreislauf | der Kreislauf | S1 | "Ich hab Kreislaufprobleme" günlük dilde baş dönmesi/halsizlik için çok duyulur. | listede yok | P3 | t |  |  |
| nüchtern | sıfat | S2 | "Bitte nüchtern kommen" talimatı anlaşılmazsa tahlil tekrarlanır. | 3785 (K2) | P3 | t |  |  |
| Röntgen | das Röntgen / röntgen | S2 | Sevk ve tahlil konuşmasında geçer. | listede yok | P3 | t |  |  |
| Creme | die Creme, -s | S3 | Eczanede "eine Creme gegen…" tavsiyesini anlamak için; Salbe kartının yanında. | listede yok | P3 | t |  |  |
| Packungsbeilage | die Packungsbeilage, -n | S3 | "Lesen Sie die Packungsbeilage" uyarısı; günlük dilde Beipackzettel de denir. | listede yok | P3 | t |  |  |
| Befund | der Befund, -e | S4 | Uzman raporunu aile hekimine götürürken "den Befund mitbringen" denir. | listede yok | P3 | t |  |  |
| Augenarzt | der Augenarzt, ¨-e / die Augenärztin, -nen | S4 | Uzman türlerinden en sık randevu alınanlardan; bileşik okuma alıştırması. | listede yok | P3 | t |  |  |
| Frauenarzt | der Frauenarzt, ¨-e / die Frauenärztin, -nen | S4 | Uzman türü; günlük dilde Gynäkologe yerine bu söz kullanılır. | listede yok | P3 | t |  |  |
| Orthopäde | der Orthopäde, -n / die Orthopädin, -nen | S4 | Sırt ve diz ağrısında aile hekiminin sevk ettiği uzman. | listede yok | P3 | t |  |  |
| Hausbesuch | der Hausbesuch, -e | S5 | Yaşlı komşu için (hafta 8) "Macht Dr. Weber Hausbesuche?" sorusu. | listede yok | P3 | t |  |  |

### 4.3 Resmî işler ve mektuplar

A2 hedefi (AH-1): **Bir mektubun ne istediğini anlarım**. Durumlar:
- **R1** Mektubun ne istediğini anlama (hafta 20)
- **R2** Bürgerbüro: numara, belge, form (hafta 10)
- **R3** Adres kaydı ve adres değişikliği
- **R4** Posta ve paket (hafta 17)
- **R5** Vergi, sigorta ve katkı mektupları

| Lemma | Artikel, çoğul / tür | Durum | Gerekçe | Sıklık | Öncelik | Kullanım | Kritik | Not |
|---|---|---|---|---|---|---|---|---|
| Betreff | der Betreff, -e | R1 | Her resmî mektup ve e-postanın ilk satırı; mektubun ne istediğini anlamanın (AH-1 Resmî A2) ilk adımı. | listede yok | P1 | t | evet |  |
| geehrt | sıfat (Sehr geehrte …) | R1 | "Sehr geehrte Damen und Herren" her resmî mektubun hitabıdır; yazarken de gerekir. | ~574 (K1; 'ehren' altında) | P1 | t |  |  |
| Gruß | der Gruß, ¨-e | R1 | "Mit freundlichen Grüßen" / "Viele Grüße" mektup ve mesaj kapanışı; her gün yazılır. | listede yok | P1 | ü |  |  |
| spätestens | zarf | R1 | Mektupta "spätestens bis zum 15.03." son tarihi verir; Frist kartıyla birlikte okunur. | listede yok | P1 | t |  |  |
| innerhalb | edat | R1 | "innerhalb von 14 Tagen" resmî süre ifadesidir. | 1702 (K1) | P1 | t |  |  |
| zuständig | sıfat | R2 | "Wer ist dafür zuständig?" / "Dafür sind wir nicht zuständig" dairede yolu kısaltan sözdür (Frau Schneider). | 3299 (K2) | P1 | ü | evet |  |
| Kopie | die Kopie, -n | R2 | "Brauchen Sie das Original oder eine Kopie?" Bürgerbüro'da (hafta 10) ve işte sorulur. | 2063 (K2) | P1 | ü |  |  |
| gültig | sıfat | R2 | "Ihr Pass ist nicht mehr gültig" belge eksik sahnesinin anahtar sözü. | listede yok | P1 | t |  |  |
| Post | die Post | R4 | "Ich habe Post vom Amt bekommen" (hafta 20) ve postane; her hafta söylenir. | ~1179 (K1; 'posten' altında) | P1 | ü |  | sıklık listesinde 'posten' altında, belirsiz |
| Aktenzeichen | das Aktenzeichen, - | R1 | Daireyi ararken "Haben Sie ein Aktenzeichen?" sorulur; mektupta sağ üstte yazar. | listede yok | P2 | t | evet |  |
| fällig | sıfat | R1 | Faturada ve Mahnung'da "fällig am" ödemenin son gününü gösterir. | 4764 (K2) | P2 | t |  |  |
| Betrag | der Betrag, ¨-e | R1 | Fatura ve resmî mektupta ödenecek tutar "Betrag" diye yazılır. | ~2064 (K2; 'betragen' altında) | P2 | t |  |  |
| einreichen | fiil, ayrılan (hat eingereicht) | R1 | "Bitte reichen Sie folgende Unterlagen ein" belge isteyen mektubun fiili. | 4154 (K2) | P2 | t |  |  |
| Sachbearbeiter | der Sachbearbeiter, - / die Sachbearbeiterin, -nen | R1 | Mektubun altındaki ve telefondaki muhatap; "Ihre Sachbearbeiterin" diye geçer. | listede yok | P2 | t |  |  |
| vorlegen | fiil, ayrılan (hat vorgelegt) | R2 | "Bitte legen Sie Ihren Ausweis vor" resmî istek kalıbıdır. | listede yok | P2 | t |  |  |
| nachreichen | fiil, ayrılan (hat nachgereicht) | R2 | Eksik belgede "Sie können das nachreichen" cevabı (hafta 10) rahatlatır. | listede yok | P2 | t | evet |  |
| Original | das Original, -e | R2 | Kopya/asıl ayrımı her belge teslimde sorulur. | 2616 (K2) | P2 | t |  |  |
| Bescheinigung | die Bescheinigung, -en | R2 | Meldebescheinigung ve iş yerinden istenen belgelerin genel adı. | listede yok | P2 | t |  |  |
| Passfoto | das Passfoto, -s | R2 | Kimlik ve izin başvurusunda istenir: "Bringen Sie ein biometrisches Passfoto mit". | listede yok | P2 | ü |  |  |
| Personalausweis | der Personalausweis, -e | R2 | Formlarda "Personalausweis oder Reisepass" diye yazar; Ausweis kartının resmî tam adı. | listede yok | P2 | t |  |  |
| ablaufen | fiil, ayrılan (läuft ab, ist abgelaufen) | R2 | "Ihr Aufenthaltstitel läuft bald ab" mektupta ve dairede duyulur. | 2824 (K2) | P2 | t |  |  |
| Schalter | der Schalter, - | R2 | "Gehen Sie bitte zu Schalter 3" — sıra numarası ekranı ve postanede. | 4166 (K2) | P2 | t |  |  |
| aufrufen | fiil, ayrılan (hat aufgerufen) | R2 | "Warten Sie, bis Ihre Nummer aufgerufen wird" Wartenummer kartının devamı. | listede yok | P2 | t |  |  |
| Stock | der Stock (Etage) | R2 | "im zweiten Stock" bina içinde yol sormanın ve adres vermenin parçası (Herr Wimmer ikinci katta oturur). | ~1619 (K1; 'stocken' altında) | P2 | ü |  | sıklık listesinde 'stocken' altında |
| Erdgeschoss | das Erdgeschoss, -e | R2 | Bürgerbüro ve muayenehane yönlendirmesinde "im Erdgeschoss" duyulur. | listede yok | P2 | t |  |  |
| ummelden | fiil, ayrılan, dönüşlü (sich ummelden) | R3 | Adres değişikliğini bildirmek: "Ich möchte mich ummelden"; Anmeldung kartının devamı. | listede yok | P2 | ü |  |  |
| Wohnungsgeberbestätigung | die Wohnungsgeberbestätigung, -en | R3 | Adres kaydında istenen belgenin adı olarak dairede duyulur; kart yazımında resmî kaynakla doğrulanmalı. | listede yok | P2 | t | evet | hukuki ayrıntı yalnız kaynakla |
| einziehen | fiil, ayrılan (ist eingezogen) | R3 | Formda "Einzugsdatum" ve sohbette "Ich bin im November eingezogen" (hafta 1 taşınma). | 2572 (K2) | P2 | ü |  |  |
| Benachrichtigung | die Benachrichtigung, -en | R4 | Posta kutusundaki "Benachrichtigungskarte" paketin nerede olduğunu söyler (hafta 17). | listede yok | P2 | t | evet |  |
| Abholstation | die Abholstation, -en | R4 | WORLD hafta 17 sözü: paket teslim noktası; kuryeyle telefonda geçer. | listede yok | P2 | t |  | Packstation K1 planında |
| Filiale | die Filiale, -n | R4 | "Das Paket liegt in der Filiale" ve banka şubesi için. | listede yok | P2 | t |  |  |
| Steuer | die Steuer, -n | R5 | Maaş bordrosu ve resmî mektupta; "Steuer-ID" sorusu işe başlarken gelir. | ~1614 (K1; 'steuern' altında) | P2 | t |  |  |
| Widerspruch | der Widerspruch, ¨-e | R1 | Her resmî kararın sonunda itiraz hakkı yazılıdır; A2'de yalnız tanıma (itiraz B1 hedefi). | listede yok | P3 | t |  |  |
| Übersetzung | die Übersetzung, -en | R2 | Yabancı belgede "beglaubigte Übersetzung" istenir. | 1609 (K1) | P3 | t |  |  |
| beglaubigt | sıfat | R2 | "beglaubigte Kopie" — kopyanın onaylı olması gerektiğini anlamak için. | listede yok | P3 | t |  |  |
| Umschlag | der Umschlag, ¨-e | R4 | Mektup göndermek ve "im Umschlag beiliegend" ifadesi için. | ~3835 (K2; 'umschlagen' altında) | P3 | t |  |  |
| Einschreiben | das Einschreiben, - | R4 | Önemli resmî mektuplar ve fesihler taahhütlü gelir; imza istenir. | listede yok | P3 | t |  |  |
| Steuer-ID | die Steuer-ID (Steueridentifikationsnummer) | R5 | İşveren ve bankanın istediği numara; kendisi kısa, resmî adı uzun. | listede yok | P3 | t | evet |  |
| Rundfunkbeitrag | der Rundfunkbeitrag | R5 | Yeni adrese gelen mektuplardan biri olabilir; ne istediğini anlamak AH-1 Resmî hedefidir. Olgu kart yazımında kaynakla. | listede yok | P3 | t | evet |  |
| Sozialversicherungsnummer | die Sozialversicherungsnummer, -n | R5 | İşe başlarken ve sigorta mektubunda istenir. | listede yok | P3 | t |  |  |

### 4.4 İş

A2 hedefi (AH-1): **Molada küçük sohbet ederim**. Durumlar:
- **I1** Molada küçük sohbet (hava, futbol, mevsim, Fasching)
- **I2** Vardiya ve çalışma planı
- **I3** İzin isteme
- **I4** Hastalık bildirme (hafta 15)
- **I5** Toplantı, görev, yeni işe alışma (hafta 13)

| Lemma | Artikel, çoğul / tür | Durum | Gerekçe | Sıklık | Öncelik | Kullanım | Kritik | Not |
|---|---|---|---|---|---|---|---|---|
| Mahlzeit | die Mahlzeit, -en | I1 | İş yerinde öğle selamı "Mahlzeit!" (Tobi'nin sık sözü, WORLD); film korpusunda seyrek, iş yerinde her gün. | 3214 (K2) | P1 | ü | evet | ilk parti · Alltag, Bairisch değil |
| Stress | der Stress | I1 | "Heute ist viel Stress" / "stressig" molada en sık söylenen durum sözüdür. | ~1834 (K1; 'stressen' altında) | P1 | ü |  | sıfat stressig aynı kartta |
| Schnee | der Schnee | I1 | Aralık–Şubat mola sohbetinin konusu: "Hast du den Schnee gesehen?" | 2113 (K2) | P1 | ü |  | ilk parti |
| schneien | fiil (hat geschneit) | I1 | "Es schneit!" kışın her sabah söylenir; regnen kartının eşi. | listede yok | P1 | ü |  |  |
| glatt | sıfat | I1 | "Pass auf, es ist glatt draußen" kış sabahı uyarısı; trafik haberinde Glätte olarak da geçer. | 3263 (K2) | P1 | t |  | ilk parti |
| Grad | der Grad, -e | I1 | "Heute sind minus zehn Grad" hava sohbetinin sayısal çekirdeği. | 1260 (K1) | P1 | ü |  | sıklık K1 katmanında, çekirdekte yok |
| Frühschicht | die Frühschicht, -en | I2 | "Ich hab diese Woche Frühschicht" vardiya konuşmasının temel sözü. | listede yok | P1 | ü |  | Schicht kartının bileşiği |
| Spätschicht | die Spätschicht, -en | I2 | Vardiya takası ve randevu saati seçerken söylenir. | listede yok | P1 | ü |  |  |
| tauschen | fiil (hat getauscht) | I2 | "Kannst du mit mir die Schicht tauschen?" vardiyada en sık rica. | 1944 (K1) | P1 | ü |  | ilk parti · sıklık K1 katmanında, çekirdekte yok |
| freinehmen | fiil, ayrılan, dönüşlü (sich freinehmen) | I3 | "Ich möchte mir am Freitag freinehmen" izin istemenin doğal cümlesi (randevu, Bürgerbüro). | listede yok | P1 | ü |  | ilk parti |
| anstrengend | sıfat | I1 | "Die Woche war anstrengend" mola ve Feierabend sohbetinin kalıbı. | 3681 (K2) | P2 | ü |  |  |
| frieren | fiil (fror, hat gefroren) | I1 | "Ich friere" / "Es friert" kışın gündelik söz. | listede yok | P2 | ü |  |  |
| Skifahren | das Skifahren / Ski fahren | I1 | Bavyera'da kış hafta sonu sohbetinin (Tobi: dağ) sık konusu. | listede yok | P2 | ü |  |  |
| Tor | das Tor, -e | I1 | Pazartesi molası futbol sohbeti (cal:bundesliga): "Hast du das Tor gesehen?" | 1233 (K1) | P2 | ü |  |  |
| Krapfen | der Krapfen, - | I1 | Hafta 11: Derya ofise Krapfen getirir; güney Almanyası sözü (kuzeyde Berliner). | listede yok | P2 | ü |  | Alltag katmanı, bölgesel |
| Kostüm | das Kostüm, -e | I1 | Hafta 11 Fasching sabahı: "Was für ein Kostüm hast du?" | 2483 (K2) | P2 | ü |  |  |
| verkleiden | fiil, dönüşlü (sich verkleiden) | I1 | "Verkleidest du dich an Fasching?" hafta 11'in gerçek sorusu. | listede yok | P2 | ü |  |  |
| Brotzeit | die Brotzeit, -en | I1 | Bavyera'da ara öğün/mola sözü; iş yerinde ve Maibaum geleneğinde (WORLD) duyulur. | listede yok | P2 | t |  | güney Almancası; dilbilimci katmanı doğrular |
| Nachtschicht | die Nachtschicht, -en | I2 | Vardiyalı işte ve doktora saat söylerken geçer. | listede yok | P2 | ü |  |  |
| einspringen | fiil, ayrılan (ist eingesprungen) | I2 | Şef "Können Sie am Samstag einspringen?" diye sorar; cevap vermek gerekir. | listede yok | P2 | t |  |  |
| Arbeitszeit | die Arbeitszeit, -en | I2 | Randevu ayarlarken "nach meiner Arbeitszeit" demek için. | listede yok | P2 | ü |  |  |
| Abrechnung | die Abrechnung, -en | I2 | Maaş bordrosu ve yan gider hesabı mektuplarının adı. | listede yok | P2 | t |  | Gehaltsabrechnung K1 planında |
| Urlaubsantrag | der Urlaubsantrag, ¨-e | I3 | İzin resmî olarak bu formla istenir: "Hast du deinen Urlaubsantrag schon abgegeben?" | listede yok | P2 | ü |  |  |
| vertreten | fiil (vertritt, hat vertreten) | I4 | Hasta bildiriminde "Wer vertritt Sie?" sorulur; muayenehanede "Vertretung" de geçer. | 2212 (K2) | P2 | t |  |  |
| Mitarbeiter | der Mitarbeiter, - / die Mitarbeiterin, -nen | I5 | İş yerinde ve kayıtlı anonslarda ("der nächste freie Mitarbeiter") duyulur. | 2379 (K2) | P2 | t |  |  |
| Abteilung | die Abteilung, -en | I5 | "In welcher Abteilung arbeiten Sie?" kendini anlatma ve iş yerinde yol bulma. | 1982 (K1) | P2 | t |  |  |
| Präsentation | die Präsentation, -en | I5 | Hafta 13: Herr Wimmer kısa durum özeti ister. | listede yok | P2 | ü |  |  |
| Projekt | das Projekt, -e | I5 | "An welchem Projekt arbeitest du?" mola ve toplantıda sık. | 1575 (K1) | P2 | ü |  |  |
| Meeting | das Meeting, -s | I5 | Gündelik iş dilinde Besprechung'un yanında sık; Alltag katmanı. | 2675 (K2) | P2 | t |  |  |
| Kalender | der Kalender, - | I5 | "Ich schau mal in meinen Kalender" randevu ve iş planlamasının cümlesi. | 4733 (K2) | P2 | ü |  |  |
| einarbeiten | fiil, ayrılan (hat eingearbeitet) | I5 | Yeni işte "Derya arbeitet Sie ein" (r3) — kimin öğreteceğini anlamak için. | listede yok | P2 | t |  |  |
| Gleitzeit | die Gleitzeit | I2 | Esnek çalışma saati düzeni iş yerinde sık duyulur. | listede yok | P3 | t |  |  |
| Zuschlag | der Zuschlag, ¨-e | I2 | Gece/tatil vardiyası ücret farkı bordroda yazar. | listede yok | P3 | t |  |  |
| Brückentag | der Brückentag, -e | I3 | Bavyera'daki tatil günleri arasında izin planlarken iş yerinde duyulur. | listede yok | P3 | t |  |  |
| Arbeitsunfähigkeitsbescheinigung | die Arbeitsunfähigkeitsbescheinigung, -en (AU) | I4 | İşte "Hast du die AU schon geschickt?" kısaltmasıyla duyulur; Krankschreibung kartının resmî adı. | listede yok | P3 | t | evet |  |

### 4.5 Gündelik hizmetler (market, kuaför, spor salonu, banka, ev, ustalar)

A2 hedefi (AH-1): **İstediğimi söylerim**. Durumlar:
- **H1** Market, fırın, tezgâh (Bäckerei Stadler)
- **H2** Kuaför (hafta 12)
- **H3** Spor salonu (hafta 9)
- **H4** Ev: arıza, çöp, apartman, ustalar (hafta 7, Pichler)
- **H5** Tamirhane (hafta 19)
- **H6** Banka (r4)
- **H7** Ulaşım: bilet, yön, otobüs/tren

| Lemma | Artikel, çoğul / tür | Durum | Gerekçe | Sıklık | Öncelik | Kullanım | Kritik | Not |
|---|---|---|---|---|---|---|---|---|
| Breze | die Breze, -n | H1 | Hafta 1–3 Bäckerei Stadler'de her sabah istenir (WORLD: Gerti Breze ikram eder); güney biçimi. | listede yok | P1 | ü | evet | ilk parti · Bairisch 'Brezn' ayrı, kaynak gerekli |
| Wurst | die Wurst, ¨-e | H1 | Market tezgâhında ve fırında "Eine Semmel mit Wurst" en sık siparişlerden. | listede yok | P1 | ü |  |  |
| Gramm | das Gramm, - | H1 | "200 Gramm Käse, bitte" tezgâhta miktar söylemenin yolu. | 4941 (K2) | P1 | ü |  |  |
| Getränk | das Getränk, -e | H1 | "Was möchten Sie trinken?" yerine "Getränke?" sorusu ve davette içecek getirmek. | 3390 (K2) | P1 | ü |  |  |
| Obst | das Obst | H1 | Market listesinin ana sözü; Banane/Apfel kartlarının üst kavramı. | ~4599 (K2; 'obsen' altında) | P1 | ü |  |  |
| alkoholfrei | sıfat | H1 | Weihnachtsmarkt'ta (hafta 2) ve Weihnachtsfeier'de (hafta 4) alkolsüz istemenin tek sözü. | listede yok | P1 | ü | evet | ilk parti |
| waschen | fiil (wäscht, hat gewaschen) | H2 | "Waschen und schneiden?" kuaförde, "Wäsche waschen" evde; her hafta söylenir. | 2054 (K2) | P1 | ü |  |  |
| Sport | der Sport | H3 | "Ich mache gern Sport" kendini anlatma ve spor salonu (hafta 9) için temel. | 2393 (K2) | P1 | ü |  |  |
| Mitglied | das Mitglied, -er | H3 | VilsFit'te "Sind Sie schon Mitglied?" ilk sorudur (hafta 9); dernekte de geçer. | 1475 (K1) | P1 | t |  | ilk parti · Mitgliedschaft K1 planında |
| Satz | der Satz, ¨-e | H3 | Basti'nin sözü "Wie viele Sätze noch?" (WORLD) set anlamında; ayrıca "cümle". | 2262 (K2) | P1 | t |  | iki anlam: set / cümle |
| trainieren | fiil (hat trainiert) | H3 | "Ich trainiere dreimal pro Woche" spor salonu sohbeti; Training kartı var, fiil yok. | 1909 (K1) | P1 | ü |  |  |
| Handwerker | der Handwerker, - / die Handwerkerin, -nen | H4 | Hafta 7 kalorifer: "Wann kommt der Handwerker?" ev arızasının kilit sözü. | listede yok | P1 | t | evet | ilk parti |
| Heizkörper | der Heizkörper, - | H4 | Hafta 7: "Der Heizkörper wird nicht warm" — Heizung kartının somut parçası. | listede yok | P1 | ü | evet | ilk parti |
| Strom | der Strom | H4 | "Wir haben keinen Strom" arıza ve fatura için; Stadtwerke mektubu. | 1941 (K1) | P1 | ü |  | sıklık K1 katmanında, çekirdekte yok |
| Biomüll | der Biomüll | H4 | Pichler'in sözü "Der Biomüll kommt da rein" (WORLD); çöp ayırma her hafta. | listede yok | P1 | t | evet | ilk parti |
| trennen | fiil (hat getrennt) | H4 | "Hier wird der Müll getrennt" — sich trennen kartı yalnız ilişki anlamını öğretir. | 964 (K1) | P1 | ü |  | anlam ayrımı: geçişli trennen · lx:sich_trennen yalnız ilişki anlamı; geçişli trennen (Müll) kartsız |
| putzen | fiil (hat geputzt) | H4 | Merdiven temizliği sırası (Pichler) ve hafta sonu işleri: "Ich muss putzen". | 2017 (K2) | P1 | ü |  |  |
| ungefähr | zarf | H5 | "Was kostet das ungefähr?" ve "ungefähr eine Stunde" WORLD hafta 19 cümlesi; her durumda gerekir. | 1118 (K1) | P1 | ü |  | ilk parti · sıklık K1 katmanında, çekirdekte yok |
| Bank | die Bank, -en | H6 | Konto, Geldautomat kartları var ama bankanın kendisi yok; r4 ve maaş için. | 887 (K1) | P1 | ü |  | sıklık K1 katmanında, çekirdekte yok |
| Bahn | die Bahn, -en | H7 | "Ich fahre mit der Bahn" ve "die Bahn hat Verspätung" her gün söylenir. | ~3418 (K2; 'bahnen' altında) | P1 | ü |  | sıklık listesinde 'bahnen' altında |
| einsteigen | fiil, ayrılan (ist eingestiegen) | H7 | aussteigen ve umsteigen kartları var, eşleri yok: "Wo muss ich einsteigen?" | 3027 (K2) | P1 | ü |  |  |
| Richtung | die Richtung, -en | H7 | "Fährt dieser Bus Richtung Bahnhof?" ve anonsta "in Richtung …". | 863 (K1) | P1 | ü |  | ilk parti · sıklık K1 katmanında, çekirdekte yok |
| Theke | die Theke, -n | H1 | "Wurst und Käse gibt's an der Theke" market yönlendirmesi. | listede yok | P2 | t |  |  |
| Liter | der/das Liter, - | H1 | Süt, su ve benzin miktarı için. | 4293 (K2) | P2 | ü |  |  |
| Glas | das Glas, ¨-er | H1 | "Ein Glas Wasser, bitte" lokantada ve davette; Pfand'lı kavanoz için de. | 3840 (K2) | P2 | ü |  |  |
| Alkohol | der Alkohol | H1 | Hafta 2 Glühwein ve hafta 16 Starkbier: "ohne Alkohol" demek için. | 1675 (K1) | P2 | ü |  |  |
| Kleingeld | das Kleingeld | H1 | "Haben Sie es kleiner? — Ich hab kein Kleingeld" kasada sık. | 4538 (K2) | P2 | ü |  |  |
| Leergut | das Leergut | H1 | Pfand şişeleri geri verirken markette "Leergutautomat" yazısı. | listede yok | P2 | t |  |  |
| Frisur | die Frisur, -en | H2 | Hafta 12: Luka'ya ne istediğini anlatmak için. | 3463 (K2) | P2 | ü |  |  |
| Bart | der Bart, ¨-e | H2 | Kuaförde "Den Bart auch?" sorusu. | 2164 (K2) | P2 | ü |  |  |
| Probetraining | das Probetraining, -s | H3 | Hafta 9 deneme antrenmanı WORLD'de geçer. | listede yok | P2 | t |  |  |
| Handtuch | das Handtuch, ¨-er | H3 | Spor salonu kuralı "Bitte ein Handtuch benutzen" ve evde. | 2837 (K2) | P2 | ü |  |  |
| Dusche | die Dusche, -n | H3 | Spor salonu ve ev arızasında ("Die Dusche ist kaputt"). | ~1571 (K1; 'duschen' altında) | P2 | ü |  | duschen da kartsız (sıklık K1) |
| monatlich | sıfat/zarf | H3 | Sözleşme ücreti "monatlich 29 Euro" diye söylenir. | listede yok | P2 | t |  |  |
| Restmüll | der Restmüll | H4 | Çöp ayırmanın ikinci kutusu; apartman duyurusunda yazar. | listede yok | P2 | t |  |  |
| Altpapier | das Altpapier | H4 | Kâğıt çöpü; mavi bidon ve apartman kuralı. | listede yok | P2 | t |  |  |
| tropfen | fiil (hat getropft) | H4 | "Der Wasserhahn tropft" en sık küçük arıza cümlesi; Tropfen kartı yalnız isim (ilaç damlası). | 3171 (K2) | P2 | ü |  | lx:Tropfen yalnız isim (damla); fiil tropfen kartsız |
| verstopft | sıfat | H4 | "Das Waschbecken ist verstopft" ustayı çağırma nedeni. | listede yok | P2 | ü |  |  |
| Reparatur | die Reparatur, -en | H4 | "Die Reparatur kostet…" tamirhane ve ev; reparieren kartının ismi. | listede yok | P2 | t |  |  |
| Hausverwaltung | die Hausverwaltung, -en | H4 | Kira ve arıza mektuplarının göndericisi; Pichler "Rufen Sie die Hausverwaltung an" der. | listede yok | P2 | t |  |  |
| Mieter | der Mieter, - / die Mieterin, -nen | H4 | Hausordnung ve mektuplarda "Liebe Mieterinnen und Mieter" hitabı. | listede yok | P2 | t |  |  |
| Lärm | der Lärm | H4 | r1 "Üst kattaki gürültü": "Der Lärm stört mich". | ~2602 (K2; 'lärmen' altında) | P2 | ü |  |  |
| Treppe | die Treppe, -n | H4 | "Ich habe die Treppe geputzt"; Treppenhaus kartının yanında. | 1741 (K1) | P2 | ü |  |  |
| Aufzug | der Aufzug, ¨-e | H4 | "Der Aufzug ist kaputt" apartman ve muayenehanede. | 3108 (K2) | P2 | ü |  |  |
| Geräusch | das Geräusch, -e | H5 | Hafta 19: "Das Auto macht ein komisches Geräusch". | 1570 (K1) | P2 | ü |  |  |
| Reifen | der Reifen, - | H5 | Kış lastiği değişimi ve tamirhane konuşması. | ~1719 (K1; 'reif' altında) | P2 | ü |  |  |
| Ticket | das Ticket, -s | H7 | Gündelik dilde Fahrkarte'nin yerine çoğu zaman bu söz kullanılır. | 3801 (K2) | P2 | ü |  |  |
| Linie | die Linie, -n | H7 | "Nehmen Sie die Linie 3" otobüs yönlendirmesi. | 2030 (K2) | P2 | t |  |  |
| Automat | der Automat, -en | H7 | Bilet, Pfand ve sigara otomatı: "Am Automaten". | listede yok | P2 | t |  |  |
| Taxi | das Taxi, -s | H7 | Gece ve acil durumda "Können Sie mir ein Taxi rufen?" | 1273 (K1) | P2 | ü |  |  |
| parken | fiil (hat geparkt) | H7 | Parkplatz kartının fiili: "Wo kann ich hier parken?" | 1019 (K1) | P2 | ü |  |  |
| Brötchen | das Brötchen, - | H1 | Bavyera'da Semmel denir; Brötchen tabelada ve kuzeyliden duyulur, tanıma yeter. | listede yok | P3 | t |  |  |
| kontaktlos | sıfat | H1 | Kart ödemesinde "Sie können kontaktlos zahlen" duyulur. | listede yok | P3 | t |  |  |
| Leberkäse | der Leberkäse | H1 | Bavyera fırın ve kasaplarında en sık sıcak atıştırmalık; tabelada okunur. | listede yok | P3 | t |  | bölgesel, Alltag |
| Laufzeit | die Laufzeit, -en | H3 | Spor ve telefon sözleşmesinde süre: "Die Laufzeit ist zwölf Monate". | listede yok | P3 | t |  |  |
| Gelber Sack | der Gelbe Sack, ¨-e (Gelbe Tonne) | H4 | Ambalaj çöpü; bölgeye göre Gelbe Tonne ya da Wertstoffhof — kart yazımında yerel düzen kaynakla. | listede yok | P3 | t |  | belediyeye göre değişir |
| Kostenvoranschlag | der Kostenvoranschlag, ¨-e | H5 | "Können Sie mir einen Kostenvoranschlag machen?" fiyatı önceden almak (hafta 19). | listede yok | P3 | t |  |  |
| Kontoauszug | der Kontoauszug, ¨-e | H6 | Banka ve resmî başvuruda istenen belge. | listede yok | P3 | t |  |  |
| Kontrolle | die Kontrolle, -n | H7 | "Fahrkartenkontrolle, bitte die Fahrscheine" trende duyulur. | 890 (K1) | P3 | t |  |  |
| Deutschlandticket | das Deutschlandticket, -s | H7 | Ulaşımda en sık duyulan bilet adı; ürün adı olduğu için yalnız tanıma. | listede yok | P3 | t |  |  |

### 4.6 İnsanlarla bağ (komşu, dernek, arkadaş)

A2 hedefi (AH-1): **Kendimi ve hafta sonumu anlatırım**. Durumlar:
- **B1** Kendini anlatma
- **B2** Hafta sonunu anlatma
- **B3** Davet, kutlama, buluşma (hafta 2, 4, 6, 21)
- **B4** Komşuluk (Frau Brandl)
- **B5** Bayram ve gelenek sohbeti (WORLD takvimi)

| Lemma | Artikel, çoğul / tür | Durum | Gerekçe | Sıklık | Öncelik | Kullanım | Kritik | Not |
|---|---|---|---|---|---|---|---|---|
| unterhalten | fiil, dönüşlü (sich unterhalten) | B1 | "Wir haben uns lange unterhalten" sohbeti anlatmak ve sohbete katılmak için. | 1250 (K1) | P1 | ü |  | sıklık K1 katmanında, çekirdekte yok |
| Spaziergang | der Spaziergang, ¨-e | B2 | Hafta sonunu anlatmanın en kolay cümlesi: "Ich habe einen Spaziergang gemacht". | 3358 (K2) | P1 | ü |  | spazieren gehen aynı kartta |
| unternehmen | fiil (hat unternommen) | B2 | Pazartesi sorusu "Was hast du am Wochenende unternommen?" AH-1 Bağ A2 hedefinin girişi. | 1134 (K1) | P1 | t |  | ilk parti |
| gemütlich | sıfat | B2 | "Es war gemütlich" hafta sonu ve Advent anlatımının en Almanca sözü; sıklık orta, sohbette her gün. | 3014 (K2) | P1 | ü | evet |  |
| entspannen | fiil, dönüşlü (sich entspannen) | B2 | "Ich habe mich entspannt" hafta sonu cevabının kalıbı. | 1171 (K1) | P1 | ü |  | sıklık K1 katmanında, çekirdekte yok |
| Besuch | der Besuch, -e | B2 | "Ich hatte Besuch" ve "zu Besuch" hafta sonu ve bayram anlatımında sık; besuchen kartının ismi. | ~475 (K1; 'besuchen' altında) | P1 | ü |  | sıklık listesinde 'besuchen' altında |
| mitbringen | fiil, ayrılan (hat mitgebracht) | B3 | Weihnachtsfeier/Wichteln (hafta 4) ve Grillen (hafta 21): "Was soll ich mitbringen?" (WORLD). | 2777 (K2) | P1 | ü |  | ilk parti |
| Prost | ünlem | B3 | Weihnachtsmarkt (hafta 2), Weihnachtsfeier (hafta 4), Silvester (hafta 6): kadeh kaldırmak. | 1844 (K1) | P1 | ü |  | sıklık K1 katmanında, çekirdekte yok |
| vorbeikommen | fiil, ayrılan (ist vorbeigekommen) | B4 | Frau Brandl "Kommen Sie doch mal vorbei!" der (hafta 5); davete cevap vermek için. | 2341 (K2) | P1 | ü |  | ilk parti |
| Tschüss | ünlem | B4 | Gündelik vedanın en sık biçimi; Auf Wiedersehen kartının samimi eşi. | 856 (K1) | P1 | ü |  | sıklık K1 katmanında, çekirdekte yok |
| Rutsch | der Rutsch (Guten Rutsch!) | B5 | Hafta 6 Silvester gerçek görevi "Guten Rutsch!" (WORLD); yalnız bu kalıpta. | listede yok | P1 | ü | evet | ilk parti |
| Heiligabend | der Heiligabend | B5 | Hafta 5: Frau Brandl seni Heiligabend'de çağırır; dükkânların erken kapandığı gün. | listede yok | P1 | t | evet | ilk parti |
| Verwandte | der/die Verwandte, -n | B1 | Bayramı anlatırken "Ich besuche Verwandte" — kişisel ayrıntı vermeden genel söz. | ~1054 (K1; 'verwenden' altında) | P2 | ü |  |  |
| Kino | das Kino, -s | B2 | "Ich war im Kino" hafta sonu anlatımı. | 1749 (K1) | P2 | ü |  | sıklık K1 katmanında, çekirdekte yok |
| Haushalt | der Haushalt, -e | B2 | "Ich habe den Haushalt gemacht" hafta sonunun gerçek cevabı. | listede yok | P2 | ü |  |  |
| Wäsche | die Wäsche | B2 | "Wäsche waschen" ve apartman çamaşırhanesi (Waschmaschine kartı var). | 2619 (K2) | P2 | ü |  |  |
| verreisen | fiil (ist verreist) | B2 | Tatilde ne yapacağını anlatmak (Ostern, Pfingsten). | 4978 (K2) | P2 | ü |  |  |
| Garten | der Garten, ¨ | B3 | Hafta 21 Derya'nın bahçesinde mangal; komşu bahçesi. | ~1457 (K1; 'garen' altında) | P2 | ü |  | sıklık listesinde 'garen' altında |
| grillen | fiil (hat gegrillt) | B3 | Hafta 21 Grillen; yaz hafta sonu sohbeti. | 3660 (K2) | P2 | ü |  |  |
| Kleinigkeit | die Kleinigkeit, -en | B3 | "Ich bring eine Kleinigkeit mit" davete giderken doğal cümle. | 2690 (K2) | P2 | ü |  |  |
| verabreden | fiil, dönüşlü (sich verabreden) | B3 | "Wollen wir uns verabreden?" Ioana ile pratik buluşması. | 2424 (K2) | P2 | ü |  |  |
| anstoßen | fiil, ayrılan (hat angestoßen) | B3 | "Lass uns anstoßen!" kutlamada söylenir. | listede yok | P2 | ü |  |  |
| bedanken | fiil, dönüşlü (sich bedanken) | B4 | Frau Brandl'ın Plätzchen'i için "Ich möchte mich bedanken". | 2795 (K2) | P2 | ü |  |  |
| Feuerwerk | das Feuerwerk, -e | B5 | Silvester sohbeti (hafta 6). | 4536 (K2) | P2 | ü |  |  |
| Neujahr | das Neujahr | B5 | "Frohes neues Jahr" ve 1 Ocak tatili. | listede yok | P2 | t |  |  |
| Nikolaus | der Nikolaus | B5 | 6 Aralık (hafta 2) iş yerinde ve komşuda geçen gelenek. | listede yok | P2 | t |  |  |
| Fasching | der Fasching | B5 | Hafta 11 Fasching; Bavyera'da Karneval yerine bu söz. | listede yok | P2 | ü |  |  |
| Ostern | das Ostern, - (meist ohne Artikel) | B5 | Hafta 18 Ostern; "Was machst du an Ostern?" | listede yok | P2 | ü |  |  |
| Tradition | die Tradition, -en | B5 | Derya geleneği anlatır (hafta 16); Brauch kartının günlük eşi. | 2559 (K2) | P2 | ü |  |  |
| Konzert | das Konzert, -e | B2 | Etkinlik daveti ve ilanlarda. | 2713 (K2) | P3 | t |  |  |
| Stammtisch | der Stammtisch, -e | B4 | Bavyera'da düzenli buluşma masası; davet edilince ne olduğunu anlamak için. | listede yok | P3 | t |  |  |
| Bescherung | die Bescherung | B5 | Heiligabend'de hediye açma anı; Frau Brandl'ın hikâyelerinde geçer. | listede yok | P3 | t |  |  |
| Pfingsten | das Pfingsten | B5 | Hafta 26 uzun hafta sonu. | listede yok | P3 | t |  |  |
| Wachsgießen | das Wachsgießen | B5 | WORLD hafta 6 Silvester geleneği. | listede yok | P3 | t |  |  |

### 4.7 Kulak (hızlı, gürültülü, aksanlı, Bairisch)

A2 hedefi (AH-1): **Anonsu ve sesli mesajı anlarım**. Durumlar:
- **KU1** İstasyon ve tren anonsu (r2)
- **KU2** Kayıtlı mesaj ve sesli mesaj
- **KU3** Radyo: hava ve trafik
- **KU4** Bavyera ağzını tanıma (yalnız kaynaklı)

| Lemma | Artikel, çoğul / tür | Durum | Gerekçe | Sıklık | Öncelik | Kullanım | Kritik | Not |
|---|---|---|---|---|---|---|---|---|
| voraussichtlich | sıfat/zarf | KU1 | "voraussichtlich zehn Minuten später" gecikme anonsunun bilgi taşıyan sözü; seyrek ama her gecikmede. | listede yok | P1 | t | evet |  |
| Vorsicht | die Vorsicht | KU1 | "Vorsicht an der Bahnsteigkante" ve "Vorsicht, glatt!" uyarısı. | 897 (K1) | P1 | t |  | sıklık K1 katmanında, çekirdekte yok |
| Signalton | der Signalton, ¨-e | KU2 | Sesli mesajda "Sprechen Sie nach dem Signalton" — ne zaman konuşacağını söyler. | listede yok | P1 | t |  | ilk parti · Piepton (gündelik) aynı kartta |
| Grüß Gott | selamlaşma (Bairisch / güney Almancası) | KU4 | Fırında, muayenehanede, merdivende her gün ilk duyulan söz (Stadler, Huber, Brandl, Pichler). Kaynak: WORLD §5 (thelocal.de). | — (lehçe) | P1 | t |  | lx:Gott örneklerinde geçer; ayrı tanıma kartı önerilir |
| gell | parçacık (Bairisch) | KU4 | Cümle sonunda "değil mi?"; Frau Brandl'ın sözü. Kaynak: WORLD §5 (thelocal.de). | — (lehçe) | P1 | t |  |  |
| Servus | selamlaşma (Bairisch) | KU4 | Samimi selam ve veda, yalnız du ilişkisinde (iş arkadaşları). Kaynak: WORLD §5 (thelocal.de). | — (lehçe) | P1 | t |  |  |
| Passt scho | ifade (Bairisch) | KU4 | "Tamam, sorun yok"; Tobi'nin sık sözü (WORLD). Kaynak: WORLD §5 (fes.de, abendzeitung-muenchen.de). | — (lehçe) | P1 | t |  | ağız yazımı 'Basst scho' |
| Fahrgast | der Fahrgast, ¨-e | KU1 | Her anons "Liebe Fahrgäste" diye başlar. | listede yok | P2 | t |  |  |
| einfahren | fiil, ayrılan (ist eingefahren) | KU1 | "Der Zug fährt ein" anonsu peronda. | listede yok | P2 | t |  |  |
| entfallen | fiil (ist entfallen) | KU1 | "Der Zug entfällt heute" iptal anonsunun resmî biçimi (r2); ausfallen kartının eşi. | listede yok | P2 | t | evet |  |
| Verzögerung | die Verzögerung, -en | KU1 | Gecikme anonsunda Verspätung'un eşi. | listede yok | P2 | t |  |  |
| Verständnis | das Verständnis | KU1 | "Wir bitten um Ihr Verständnis" her aksaklık anonsunun kapanışı. | 3021 (K2) | P2 | t |  |  |
| Ersatzverkehr | der Ersatzverkehr | KU1 | "Schienenersatzverkehr mit Bussen" anlaşılmazsa yolcu durakta kalır. | listede yok | P2 | t | evet |  |
| wenden | fiil, dönüşlü (sich wenden an), (hat sich gewandt) | KU2 | Muayenehane kaydı "In dringenden Fällen wenden Sie sich an den Bereitschaftsdienst" — tatilde nereye gidileceğini söyler. | 1700 (K1) | P2 | t | evet |  |
| außerhalb | edat | KU2 | "außerhalb unserer Sprechzeiten" kayıtlı anonsun kalıbı. | 1561 (K1) | P2 | t |  |  |
| Umleitung | die Umleitung, -en | KU3 | Otobüs anonsu ve trafik haberi; tabelada da yazar. | listede yok | P2 | t |  |  |
| gesperrt | sıfat (sperren) | KU3 | "Die Straße ist gesperrt" trafik haberi ve tabela. | ~2079 (K2; 'sperren' altında) | P2 | t |  |  |
| Wetterbericht | der Wetterbericht, -e | KU3 | Radyoda ve mola sohbetinde "Laut Wetterbericht…". | listede yok | P2 | t |  |  |
| bewölkt | sıfat | KU3 | Hava durumunun en sık sözü. | listede yok | P2 | t |  |  |
| Glatteis | das Glatteis | KU3 | Kış sabahı radyo uyarısı ve mola sohbeti. | listede yok | P2 | t |  |  |
| Ja mei | ifade (Bairisch) | KU4 | "Ne yapalım, öyle işte"; Frau Brandl'ın iç çekişi. Kaynak: WORLD §5 (muenchenwiki.de, mitvergnuegen.com). | — (lehçe) | P2 | t |  |  |
| Einsatz | der Einsatz, ¨-e | KU1 | "wegen eines Notarzteinsatzes" gecikme gerekçesi anonsu. | 1441 (K1) | P3 | t |  |  |
| Fahrtrichtung | die Fahrtrichtung, -en | KU1 | "Ausstieg in Fahrtrichtung links" anonsu. | listede yok | P3 | t |  |  |
| Gleiswechsel | der Gleiswechsel | KU1 | "Achtung, Gleiswechsel!" peron değişikliği anonsu. | listede yok | P3 | t |  |  |
| Gewitter | das Gewitter, - | KU3 | Yaz hava uyarısı (DWD). | listede yok | P3 | t |  |  |
| Autobahn | die Autobahn, -en | KU3 | Trafik haberinde yol numarasıyla birlikte duyulur. | listede yok | P3 | t |  |  |
| des | tanımlık/zamir (Bairisch = das) | KU4 | Hızlı Bairisch'te "das" yerine duyulur. Kaynak: WORLD §5 (dialekte.schule.bayern.de). Yeni cümle türetilmez. | — (lehçe) | P3 | t |  | yalnız sözcük düzeyinde kaynaklı |
| ned | olumsuzluk (Bairisch = nicht) | KU4 | Hızlı Bairisch'te "nicht" yerine duyulur. Kaynak: WORLD §5 (dialekte.schule.bayern.de). Yeni cümle türetilmez. | — (lehçe) | P3 | t |  | yalnız sözcük düzeyinde kaynaklı |

#### 4.7.1 Bairisch: yalnız tanıma, yalnız kaynaklı

Yukarıdaki KU4 satırları WORLD §5'teki dilbilimci incelemesinden geçmiş kayıtlardır (kaynak URL'leri orada). Bunlardan yeni Bairisch cümle türetilmez; "des" ve "ned" yalnız sözcük düzeyinde kaynaklıdır.

#### 4.7.2 Bairisch: kaynak gerekli (sayıma girmez)

Aşağıdakiler öğrencinin Wendlfing'de (Brandl, Pichler, Stadler, Dult) duyması beklenen kavramlardır; **kaynak bulunmadan kart yazılmaz**. Sol sütundaki yazım yalnız aramayı kolaylaştıran adaydır, doğrulanmamıştır; dilbilimci Bayerisches Wörterbuch / BDO / MaiBaam ile doğrulamalı ya da "uncertain" işaretlemeli.

| Aday (yazım doğrulanmadı) | Hochdeutsch / anlam | Bağlam |
|---|---|---|
| Pfiat di / Pfiat Gott | Tschüss / Auf Wiedersehen | veda; Brandl, Pichler, Stadler |
| Griaß di / Griaß eich | Grüß dich / Grüß euch | samimi selam |
| Brezn | Breze | fırında; Breze kartının Bairisch biçimi |
| a bissl | ein bisschen | tezgâhta ve sohbette |
| fei | vurgu parçacığı | Bairisch'te çok sık; anlamı bağlama bağlı |
| heid | heute | hızlı konuşmada |
| dahoam | daheim / zu Hause | WORLD §5: "daheim" Alltag; Bairisch biçimi ayrıca kaynak ister |
| Schmarrn | Unsinn | "So ein Schmarrn!" |
| Gaudi | Spaß | Dult ve Maibaum sohbeti (hafta 22–23) |
| Spezl | Kumpel, Freund | molada |
| Bua / Madl | Junge / Mädchen | komşu sohbeti |
| i / mia | ich / wir | hızlı Bairisch'te zamirler |
| Mass | ein Liter Bier | Dult, Starkbierzeit (hafta 16, 23) |
| Obatzda | peynir ezmesi (yemek adı) | Biergarten, Dult menüsü |

### 4.8 Okuma ve yazma (haber, ilan, form, mesaj, e-posta)

A2 hedefi (AH-1): **Bildirim, ilan, kısa mesaj**. Durumlar:
- **O1** Tabela ve kapı yazıları
- **O2** İlan ve apartman duyurusu
- **O3** Kısa mesaj, e-posta, kısaltma
- **O4** Form alanları

| Lemma | Artikel, çoğul / tür | Durum | Gerekçe | Sıklık | Öncelik | Kullanım | Kritik | Not |
|---|---|---|---|---|---|---|---|---|
| Öffnungszeiten | die Öffnungszeiten (Pl.) | O1 | Hafta 3 ve 5 gerçek görevleri açılış saatini sormak ve okumak; sıklık listesinde yok. | listede yok | P1 | ü | evet | ilk parti |
| Betriebsferien | die Betriebsferien (Pl.) | O1 | Aralık–Ocak dükkân kapısında "Betriebsferien vom 24.12. bis 6.1." (hafta 5). | listede yok | P1 | t | evet | ilk parti |
| Eingang | der Eingang, ¨-e | O1 | Muayenehane ve dairede "Eingang um die Ecke". | 3140 (K2) | P1 | t |  |  |
| Ausgang | der Ausgang, ¨-e | O1 | Tabela ve istasyonda yol bulma. | 2902 (K2) | P1 | t |  |  |
| drücken | fiil (hat gedrückt) | O1 | Kapı yazısı "Drücken / Ziehen" ve tuş anonsu ("Drücken Sie die 1"). | 904 (K1) | P1 | t |  | sıklık K1 katmanında, çekirdekte yok |
| verboten | sıfat (verbieten) | O1 | "Rauchen verboten", "Parken verboten" tabelaları. | ~1254 (K1; 'verbieten' altında) | P1 | t |  |  |
| Achtung | die Achtung | O1 | Tabela ve anonsların ilk sözü. | 1086 (K1) | P1 | t |  | sıklık K1 katmanında, çekirdekte yok |
| Zettel | der Zettel, - | O2 | Kapıya bırakılan not (Frau Brandl, kurye): "Ich hab Ihnen einen Zettel geschrieben". | ~3359 (K2; 'zetteln' altında) | P1 | ü |  | sıklık listesinde 'zetteln' altında |
| E-Mail | die E-Mail, -s | O3 | "Ich schicke Ihnen eine E-Mail" iş ve resmî yazışmanın kanalı (AH-1 Okuma-yazma). | 4290 (K2) | P1 | ü |  |  |
| LG | Kısaltma (Liebe Grüße) | O3 | Kısa mesajların sonunda her gün görülür. | listede yok | P1 | t |  |  |
| Anschrift | die Anschrift, -en | O4 | Her formda "Anschrift" yazar; Adresse kartının resmî eşi. | listede yok | P1 | t | evet |  |
| Postleitzahl | die Postleitzahl, -en (PLZ) | O4 | Adres söylerken ve form doldururken; telefonda harf harf de istenir. | listede yok | P1 | ü | evet |  |
| Ruhetag | der Ruhetag, -e | O1 | Lokanta kapısında "Montag Ruhetag". | listede yok | P2 | t |  |  |
| Rabatt | der Rabatt, -e | O1 | Mağaza tabelası "20 % Rabatt". | listede yok | P2 | t |  |  |
| reduziert | sıfat | O1 | Etiket ve tabelada indirimli ürün. | ~4358 (K2; 'reduzieren' altında) | P2 | t |  |  |
| Krankheit | die Krankheit, -en | O1 | "Wegen Krankheit geschlossen" kapı notu ve hasta bildirimi. | 1384 (K1) | P2 | t |  | sıklık K1 katmanında, çekirdekte yok |
| Hinweis | der Hinweis, -e | O2 | Apartman ve mağaza duyurusunun başlığı: "Wichtiger Hinweis". | 2274 (K2) | P2 | t |  |  |
| Aushang | der Aushang, ¨-e | O2 | Pichler'in panoya astığı duyuru; "Bitte beachten Sie den Aushang". | listede yok | P2 | t |  |  |
| Anhang | der Anhang, ¨-e | O3 | "Im Anhang finden Sie…" e-posta kalıbı. | listede yok | P2 | t |  |  |
| weiterleiten | fiil, ayrılan (hat weitergeleitet) | O3 | "Ich leite Ihnen die E-Mail weiter" işte sık. | listede yok | P2 | t |  |  |
| Gruppe | die Gruppe, -n | O3 | Mesaj grupları (iş, kurs) — WORLD diegetik kanal. | ~1035 (K1; 'gruppen' altında) | P2 | ü |  | sıklık listesinde 'gruppen' altında |
| Erinnerung | die Erinnerung, -en | O3 | "Terminerinnerung" SMS'i ve Mahnung öncesi "Zahlungserinnerung". | 910 (K1) | P2 | t |  | sıklık K1 katmanında, çekirdekte yok |
| MfG | Kısaltma (Mit freundlichen Grüßen) | O3 | Resmî e-posta kapanışı. | listede yok | P2 | t |  |  |
| z. B. | Kısaltma (zum Beispiel) | O3 | Form ve duyurularda sık. | listede yok | P2 | t |  |  |
| bzw. | Kısaltma (beziehungsweise) | O3 | Resmî metin ve e-postada çok sık; anlamı bilinmezse cümle kopar. | listede yok | P2 | t |  |  |
| Hausnummer | die Hausnummer, -n | O4 | Adres verirken ve kuryeye yol tarif ederken. | listede yok | P2 | ü |  |  |
| Wohnort | der Wohnort, -e | O4 | Form alanı. | listede yok | P2 | t |  |  |
| Familienstand | der Familienstand | O4 | Form alanı; ledig/verheiratet kartlarının sorusu. | listede yok | P2 | t |  |  |
| Geschlecht | das Geschlecht, -er | O4 | Form alanı (männlich/weiblich/divers). | 4854 (K2) | P2 | t |  |  |
| Angabe | die Angabe, -n | O4 | "Angaben zur Person" form başlığı. | listede yok | P2 | t |  |  |
| ankreuzen | fiil, ayrılan (hat angekreuzt) | O4 | "Zutreffendes bitte ankreuzen" form talimatı. | listede yok | P2 | t |  |  |
| usw. | Kısaltma (und so weiter) | O3 | Liste sonlarında. | listede yok | P3 | t |  |  |
| ggf. | Kısaltma (gegebenenfalls) | O4 | Form talimatlarında "ggf. Kopie beilegen". | listede yok | P3 | t |  |  |
| Druckbuchstaben | die Druckbuchstaben (Pl.) | O4 | "Bitte in Druckbuchstaben ausfüllen" talimatı. | listede yok | P3 | t |  |  |
| freiwillig | sıfat | O4 | Formda "freiwillige Angabe" — doldurmak zorunda olmadığını anlamak için. | 1901 (K1) | P3 | t |  |  |

## Ek A. K1 çekirdeğinde olup kartı henüz yazılmamış 45 lemma (bu listeye alınmadı)

`content/v2/curriculum/k1.json` çekirdeğinde var, sözlükte kartı yok. A2 aileleri için çoğu P1/P2 değerinde; K1 hattı yazmazsa bu listeye geri alınmalı.

| Aile | Lemma |
|---|---|
| Telefon | Anrufbeantworter, Durchwahl, Rückruf, Warteschleife |
| Sağlık | Rettungswagen, Arbeitsunfall |
| Resmî işler ve mektuplar | Absender, Empfänger, Briefmarke, zustellen, Packstation, Anzeige |
| İş | Schichtplan, Lohn, Gehaltsabrechnung, Arbeitsvertrag, Probezeit, krankmelden, Vorgesetzte, Bewerbung, Vorstellungsgespräch, Kündigung |
| Gündelik hizmetler | Mietvertrag, Mülltonne, Wasserhahn, Steckdose, Kassenbon, Quittung, Umtausch, umtauschen, Einkaufswagen, Haarschnitt, Friseurin, färben, Mitgliedschaft, Geräte, Umkleide, Vertrag, IBAN, Girokonto, Fahrschein, Bahnsteig, Fahrplan, Abfahrt |
| Kulak | Zugausfall |

## Ek B. Var olan kartlarda anlam denetimi

- **Kapsanmış (kart yeter):** Überweisung (havale + sevk; örneklerde ikisi de), Beschwerde (Beschwerden = sağlık şikâyeti örnekte), abnehmen (telefonu açmak örnekte), Bescheid (resmî karar örnekte), Husten (fiil "hustest" örnekte), Gott ("Grüß Gott" örnekte).
- **Eksik anlam (listede ayrı satır):** trennen (lx:sich_trennen yalnız ilişki; Müll trennen yok), tropfen (lx:Tropfen yalnız isim).

## Ek C. Sıklık listesinde lemmatizer hataları (baş geliştiriciye bilgi)

Aşağıdaki sözcükler `lemmas.json`'da başka lemma altında sayılmış; rank yaklaşık ve çoğu karışık: Bahn → 'bahnen', Besuch → 'besuchen', Betrag → 'betragen', Dusche → 'duschen', Empfang → 'empfangen', Garten → 'garen', Gruppe → 'gruppen', Haut → 'hauen', Knie → 'knien', Lärm → 'lärmen', Obst → 'obsen', Post → 'posten', Reifen → 'reif', Schulter → 'schultern', Spritze → 'spritzen', Steuer → 'steuern', Stock → 'stocken', Stress → 'stressen', Umschlag → 'umschlagen', Verwandte → 'verwenden', Zahn → 'zahnen', Zettel → 'zetteln', besetzt → 'besetzen', geehrt → 'ehren', gesperrt → 'sperren', reduziert → 'reduzieren', verboten → 'verbieten'. Bu durum sıklık tabanlı K1 seçiminde ilgili isimlerin (Post, Garten, Haut, Bahn, Besuch, Stress) düşük görünmesine yol açmış olabilir.

## Açık sorular

1. P1 sınırı: M1 sonrası ilk 8 hafta = hikâye hafta 2–9 diye alındı. Öğrenci başka tarihte başlarsa takvim bölümleri kayar; P1 kümesi takvime göre yeniden süzülmeli mi?
2. Ek A'daki 45 K1 lemması (Fahrplan, Abfahrt, Rückruf, krankmelden, Quittung …) K1 hattında ne zaman yazılacak? İlk partideki 40 ile çakışmasın diye bunlar bu listeye alınmadı.
3. Bileşikler (Frühschicht, Hustensaft, Heizkörper, Öffnungszeiten) ayrı kart mı, ana kartın (Schicht, Husten, Heizung) alt maddesi mi olsun? Şema kararı baş geliştiricide.
4. Kısaltmalar (LG, MfG, z. B., bzw., ggf., usw.) sözlük kartı mı, Okuma Salonu'nda ayrı "kısaltma" biçimi mi?
5. Ürün ve yerel düzen adları (Deutschlandticket, Gelber Sack/Gelbe Tonne, Rundfunkbeitrag) yerel/olgusal kaynak ister; kart yazımında hangi kaynak sınıfı kabul?
6. Bairisch "kaynak gerekli" 14 aday için dilbilimci kaynak taraması ne zaman? Hafta 22–23 (Maibaum, Dult) öncesi gerekli.
