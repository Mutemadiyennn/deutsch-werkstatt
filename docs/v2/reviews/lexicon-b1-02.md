# lexicon-b1-02 (b1-02a + b1-02b): dilbilimci incelemesi

- Tarih: 2026-11-23 · İnceleyen: dilbilimci-ajan · Model: Fable 5.2 (`claude-fable-5-2`)
- **Karar: ONAY** (dil ve olgu yönünden, aşağıdaki düzeltmelerle). `review.status` görev gereği `draft`; `reviewed` okurdan sonra.
- Girdi: `content/v2/registry/lexicon/batch-b1-02a.json` (24 kart, 28–30. hafta) · `batch-b1-02b.json` (26 kart, 30–32. hafta) · `SOURCES.md` içindeki Warmmiete ve Brückentag satırları
- İncelenen kart: **50** (bütün alanlar; 250 örnek, 200 boşluk). Tek tam tur.
- Düzeltilen kart: **44** · alan düzeyinde düzeltme: **104** · hata oranı **44/50 kart (0,88)**. Oranın büyük kısmı okurun geri döndürdüğü türden (Türkçe açıklamada terim, 26 alan) ve kalıp listesinden (16 kart) geliyor.
- Ağır sayılanlar (7 kart): doğru Almancayı yanlış gösteren not (lx:Vertretung), sıra sorunu olan not ve örnekler (lx:Spätschicht, lx:zuständig, lx:Abrechnung, lx:gießen), doğal olmayan Almanca (lx:Spätschicht ö5), dünyayla çelişen satır (lx:absprechen, lx:Garten).
- Dokunulmayan kartlar: lx:Lösung, lx:Brückentag, lx:eintragen, lx:Warmmiete, lx:fällig, lx:ausleihen.
- `npm run content:validate` → **0 hata, 150 uyarı** (inceleme öncesi de 150; hiçbiri bu iki partiye ait değil). `tier`, `freqRank`, `level` ve `proposals.json` dosyalarına dokunulmadı.

## A. Düzeltildi

### A-1. Türkçe açıklamada dilbilgisi terimi (okur türü; 26 alan, 19 kart)

Eşdizim çevirilerinde `…` yok; açıklamalarda `=`, `;`, tırnak ve 14 kelimeyi aşan cümle yok. Tek okumada anlaşılmayan `anlam_tr` bulunmadı; biri netleştirildi (A-4, lx:Resturlaub).

| Tür | Kartlar | Önce → Sonra |
|---|---|---|
| **fiil** (boşluk ipucu, 8 alan) | lx:mitteilen, lx:klären (2), lx:tauschen, lx:einspringen, lx:freinehmen, lx:genehmigen, lx:abbauen | **können** ile fiil sonda tam hâliyle durur: **klären** → **können** ile birlikte **klären** sona gelir |
| **fiil** (ipucu) | lx:Nachtschicht | ... fiil hemen arkadan gelir → ... hemen **schlafe** gelir, sonra **ich** |
| **çoğul, tekil** | lx:Befund (not, ipucu), lx:Anliegen, lx:Sperrmüll, lx:Arbeitszeit (2 ipucu), lx:Urlaubstag (2 ipucu) | Çoğul tekille aynıdır → Birden çok konu için de **die Anliegen** denir |
| **isim, fiil** | lx:Absage, lx:zuständig | İsim olan ... Fiil olan ... → **die Absage** büyük harfle, **absagen** küçük harfle yazılır |
| **artikel** | lx:Warteliste, lx:Kundennummer, lx:Urlaubstag, lx:Frühschicht (ipucu, boşluk), lx:Spätschicht, lx:Nachtschicht | Artikeli son parça verir → Son parça **die Nummer** olduğu için **die Kundennummer** denir · artikel kullanılmaz → araya **die** girmez |

**artikel** incelenmiş partilerin (012, 013, 014) hiçbir açıklamasında geçmiyor; aynı ölçü tutuldu. lx:Zuschlag kartındaki **ek ödeme** dilbilgisi terimi değil, bırakıldı.

### A-2. Hata notları (`mistakes_tr`)

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Vertretung | **Wer macht Vertretung?** eksik → Yerine bakan kişi erkek de olsa **die Vertretung** denir | İlk cümle doğru ve yaygın Almanca; not doğruyu yanlış gösteriyordu. |
| lx:Spätschicht | Gece vardiyası **Nachtschicht** olur → **Spätschicht** gece boyu sürmez, öğleden sonra başlar, akşam biter | lx:Nachtschicht bir sonraki kart; öğretilmemiş karta gönderme kalktı. |
| lx:Nachtschicht | **Nachtschicht beginnt um zehn** eksik → Gece vardiyası derken **Spätschicht** denmez | Karşılaştırma iki kartın da öğretilmiş olduğu yere taşındı; eski not lx:Frühschicht'teki notun kopyasıydı. |
| lx:abbuchen | (ek) Bankamatikten parayı sen çekersen **abheben**, firma alırsa **abbuchen** | Türkçede ikisi de **para çekmek**; asıl karışan çift bu. lx:abheben A2'de var. |
| lx:Personalabteilung | **Personal** kişisel demek değildir → İngilizcedeki personal ile karıştırma | **Kişisel** yanlışı Türkçeden değil İngilizceden gelir; D-060'ın izin verdiği kısa uyarı olarak adı kondu. |
| lx:Zuschlag | **mehr Lohn** → **mehr Gehalt** | **Lohn** kartı yok, lx:Gehalt var. |
| lx:absprechen | verdiyseniz → verdiysen | Kartların hitabı **sen**. |
| lx:Warteliste, lx:Absage, lx:Befund, lx:Anliegen, lx:Sperrmüll | A-1'deki terim düzeltmeleri | |

### A-3. Almanca, sıra, dünya

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Spätschicht | ö5 | **Ja, ich hab erst Spätschicht.** → **Ja, ich hab morgen Spätschicht.** | Saat belirtmeden **erst** burada doğal değil. |
| lx:zuständig | ö5, boşluk 4 | **Sperrmüll** geçen iki cümle → **Wen frag ich wegen der Rechnung?** · **Wer ist hier für Termine ___?** | lx:Sperrmüll aynı haftada daha sonra geliyor. |
| lx:Abrechnung | ö5 | **Ja, wir müssen nachzahlen.** → **Ja, die ist dieses Jahr ziemlich hoch.** | lx:Nachzahlung bir sonraki kart. |
| lx:gießen | ö3, boşluk 3 | **Bei der Hitze gieß ich ...** → **Wenn es so heiß ist, gieß ich ...** | lx:Hitze aynı haftada daha sonra geliyor. |
| lx:Abteilung | ö3 | ... **echt anstrengend** → ... **und keiner kann mir helfen** | **anstrengend** kartı yok (lex notu). |
| lx:Urlaubsantrag | ö3 | **Sonst wird's knapp.** → **Sonst wird's zu spät.** | **knapp** kartı yok (lex notu). |
| lx:tauschen | ö4 | ... **wenn Sie beide einverstanden sind** → ... **wenn das für Sie beide in Ordnung ist** | **einverstanden** kartı yok. |
| lx:auszahlen | eşdizim 2, ö1, boşluk 1 | **mit dem Lohn** → **mit dem Gehalt** | **Lohn** kartı yok. |
| lx:absprechen | ö1, boşluk 1 | **mit meiner Chefin** → **mit meinem Chef** | Birinci tekilde konuşan öğrencinin şefi WORLD'de Herr Wimmer. |
| lx:Garten | ö1, boşluk 1 | **Herr Huber arbeitet ...** → **Mein Nachbar arbeitet ...** | Huber WORLD'de sekreterin soyadı; karakterlere yeni akraba eklenmez. |
| lx:gießen | boşluk 4 | **Frau Novak** → **Frau Nowak** | lx:Nachtschicht'teki yazımla aynı kişi adı tek biçimde. |
| lx:Heizkosten ö2, lx:Strom ö1 | katman | `hd` → `alltag` | **in der Miete drin** gündelik biçim. |
| lx:Abteilung | ipucu | **-ung** ... **die** alır → neredeyse hep **die** alır | Önceki partideki düzeltmeyle aynı (istisnalar var). |
| lx:Arbeitszeit | ipucu | **halb fünf** dört buçuk demektir → Çoğu zaman birden çok saat için söylenir | İpucu başka bir ifadeyi anlatıyordu (OD-9.2 md. 4). |

### A-4. Türkçe çeviri ve karşılık

| Kart | Alan | Önce → Sonra |
|---|---|---|
| lx:mitteilen | ö1, ö3, ö4, ö5, boşluk 1, 3 | bildiriyoruz, bildiriyorlar → bildireceğiz, bildirecekler, bildirirler (gelecek anlamı) |
| lx:Guthaben | ö2, ö4 | havale ediyoruz → havale edeceğiz |
| lx:Personalabteilung | `tr` | personel bölümü → personel bölümü, insan kaynakları |
| lx:Resturlaub | anlam | Bu yıl henüz kullanmadığın ... → Henüz kullanmadığın, elinde kalan ... (eşdizim **vom letzten Jahr** ile çelişiyordu) |
| lx:Absage | ö4 | Belki daha erken ... → Acaba yine de daha erken ... (**doch** çevrilmemişti) |
| lx:Warteliste | ö4 | yazabilirim → isterseniz ... yazayım (**gern**) |
| lx:Urlaubsantrag | ö2, boşluk 2 | teslim ediyorsun → vereceksin |
| lx:Zuschlag | ö5 | vardiyasına kalıyor musun → vardiyasını sen mi yapıyorsun |
| lx:Nachbarschaft | ö3, ö4, boşluk 3 | Burada mahallede herkes herkesi ... · Buralarda mahallede ... → Bu mahallede herkes birbirini ... · Bu mahallede ... |
| lx:gießen | ö1, boşluk 1 | Tatildeyken → Ben tatildeyken (kimin tatili belirsizdi) |
| lx:Rücksicht | ö4 | Bebeğimiz uyudu → Bebeğimiz çoktan uyudu |

### A-5. Boşluklar

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Absage | **Heute gab es zwei ___.** → **..., deshalb sind morgen Termine frei.** | Boşluğa her şey giriyordu. |
| lx:Spätschicht | **Ich arbeite lieber ___.** → **..., dann kann ich morgens länger schlafen.** | Aynı sorun. |
| lx:tauschen | **Tobi ___ gern mit dir.** → **Tobi ___ gern die Schicht mit dir.** | **arbeitet**, **spricht** daha doğal giriyordu. |
| lx:Befund | **Wann ist der ___ da?** → **Wann ist der ___ von der Untersuchung da?** | **Arzt** daha doğal giriyordu. |
| lx:Betrag | **Die ___ sind dieses Jahr höher.** → **Die ___ auf den Rechnungen sind ...** | **Preise**, **Kosten** giriyordu. |
| lx:Mieterhöhung | **Wir haben eine ___ bekommen.** → **Wir haben vom Vermieter eine ___ bekommen.** | Bağlam eklendi. |
| lx:Befund | iki boşluğa `also_ok`: **Ergebnisse** | **alle Ergebnisse mitbringen** aynı ölçüde doğru. |
| lx:Nachbarschaft | boşluk 3'e `also_ok`: **Gegend** | Öbür üç boşlukta kabul ediliyordu. |
| lx:Nachzahlung | ipucu: İki kez → Birden çok fark ödemesi | Öbür kartlarla aynı anlatım. |

### A-6. Kalıp listesi örnekle örtüşmüyordu (16 kart)

Kartta sayılan kalıp hiçbir örnekte ya da boşlukta geçmiyordu. Mümkün olan yerde cümle kalıba çekildi, olmayan yerde kalıp çıkarıldı ya da doğrusu yazıldı.

- Cümle kalıba çekildi: lx:Warteliste, lx:mitteilen, lx:einspringen, lx:Abrechnung (**Können Sie** → **Könnten Sie**; `pt:koennten-sie`) · lx:Abrechnung, lx:Mieterhöhung (**Ich habe eine Frage** → **Ich hätte eine Frage**; `pt:ich-haette-eine-frage`) · lx:Nachzahlung (**– Die Heizkosten sind gestiegen.** → **– Weil der Winter sehr kalt war.**; `pt:weil`, ayrıca lx:Heizkosten daha sonraki kart).
- Kalıp değişti: lx:klären (`koennten-sie` → `ich-muss`) · lx:Betrag (`koennten-sie` → `imperativ-sie`) · lx:grillen (`sollen-wir` → `passiv`) · lx:Hitze (`zu-adj` → `lieber`) · lx:Verbrauch (`dass`, `weil` → `verb-zweite-stelle`).
- Kalıp çıkarıldı: lx:stempeln (`bevor-nachdem`) · lx:Personalabteilung (`mit-dativ`) · lx:Heizkosten (`weil`) · lx:nebenan (`w-frage`) · lx:Nachbarschaft (`ich-finde`).

### A-7. Kaynaklar (`SOURCES.md`)

- **Brückentag**: Duden sayfası açıldı. Tanım: iki çalışılmayan gün (örneğin resmî tatil ile hafta sonu) arasında kalan, izin günü olarak kullanılmaya elverişli tek iş günü; **der**, **die Brückentage**. Kartın anlamı, artikeli, çoğulu ve "resmî tatil değildir" notu kaynakla örtüşüyor. Satırdaki "doğrulanamadı" notu kalktı, tanım alıntısı ve doğrulama tarihi yazıldı.
- **Warmmiete**: Duden sayfası açıldı; satırdaki alıntı, **die** ve **die Warmmieten** doğru. Doğrulama tarihi eklendi.
- İki alıntı sayfayı okuyan otomatik araç üzerinden alındı; harfi harfine karşılaştırma elle yapılmadı.

## B. Karar gerekir

1. **Tobi 28–30. haftada iş arkadaşı.** WORLD notuna göre Tobi 14. haftada taşınır ve yalnızca 26. haftada sesli mesajla görünür. Bu partide beş kartta (lx:Vertretung, lx:Abteilung, lx:tauschen, lx:einspringen, lx:freinehmen) hâlâ aynı iş yerinde. b1-01a'da da 14 kez geçiyor; tek başıma değiştirmedim. Ad değişsin mi, yoksa B1 kartları hikâyeden bağımsız mı sayılıyor?
2. **Kalıp listesi kuralı yazılı değil.** A-6'daki ölçüt (sayılan her kalıp en az bir örnekte ya da boşlukta geçer) LEX.md'de ve doğrulayıcıda yok; lex 50 kartın 16'sında tutturamadı. Kural LEX.md'ye eklensin mi?
3. **Kartı olmayan sözcükler.** Örneklerde kartı bulunmayan sözcükler kaldı: Vertrag, Mieter, Bewerbung, Leiter, Hammer, Tabelle, Zeile, einziehen, aushalten, streiten, lüften, sparen, Internet, Stress, Liste, Kalender, Blume, Stock. Hepsi çevirili ve çoğu cümlenin zorunlu parçası. Lex kart açsın mı, yoksa bu düzey serbest mi?
4. **`level`.** lx:Garten ve lx:Strom için B1 yüksek (ikisi de çok temel sözcük). Görev `tier` ve `freqRank` için "değiştirme" diyor, `level` için demiyor; yine de dokunmadım.
5. **lx:fällig ö4.** **– Wann ist die Kaution fällig? – Bevor Sie einziehen.** Ev sahibinin ağzından gerçekçi bir cevap, yasa ya da rakam yok; ama depozitonun ödeme zamanı hukuken düzenlenmiş bir konu ve kaynak açılmadı. Cümle bırakıldı; istenirse **die erste Miete** ile değiştirilebilir.

## C. Küçük notlar

- Zayıf ama zararsız hata notları (Türkçe konuşana özgü değil, bırakıldı): lx:klären (**Das ist klärt**), lx:genehmigen (**Es ist genehmigen**), lx:tauschen (**ist getauscht**), lx:Brückentag (**Brücke** tek başına), lx:fällig (**zufällig** kartı yok).
- lx:Anliegen ipucu arkadaşlar arasında pek kullanılmadığını söylüyor, iki gündelik örnek yine de kullanıyor. İkisi de resmî bir aramadan söz ediyor; bırakıldı.
- Yalnızca Türkçe çeviriyle tek cevaba inen boşluklar kaldı (lx:stempeln **Er ___ jeden Morgen um sechs.**, lx:grillen **Am Samstag ___ wir im Garten.**, lx:Sperrmüll **Der alte Schrank ist ___.**, lx:Zuschlag, lx:Absage boşluk 4). Önceki partideki ölçüyle aynı.
- lx:Garten eşdizimi **den Garten gießen** bir sonraki kartın fiilini içeriyor; çevirisi yanında, bırakıldı.
- lx:Abteilung ö5 (**Tobi ... sitzt im Büro**) ve vardiya cümleleri iş yerine WORLD'de olmayan ayrıntı ekliyor (iş içeriği WORLD'de genel kalır). B-1 ile birlikte düşünülmeli.
- lx:Frühschicht notu **Die Frühschicht beginnt** ister, ipucu **Ich habe Frühschicht** derken **die** girmediğini söyler. İkisi de doğru; okur birlikte okuyunca takılabilir.
- **in der Arbeit**, **Passt**, **heut früh**, **nix**, **Nee** güney ve gündelik biçimler; Bairisch içerik yok. Kişisel bilgi, kurs ya da kitap adı, öğrenci adı yok. Birinci tekilde sabit cinsiyet yok. İngilizce yalnızca lx:Personalabteilung notunda (D-060).
- İş ve kira cümleleri genel: ek ödeme **steht im Vertrag**, fazla mesai **abbauen oder auszahlen lassen**, elektrik **extra**, yan gider dökümü yılda bir. Yasa ya da rakam yok.
- 02a tek boşluk girintili, 02b iki boşluk girintili ve satır sonlu; dosyalar kendi biçimleriyle yazıldı.

## Sonuç

**Dil incelemesi KAPANDI (ONAY).** Açık kalan beş madde B'de; `reviewed` için okur kapısı bekleniyor.

## B kararları (baş geliştirici, 2026-11-23) ve uygulanması

Bu bölüm yukarıdaki B maddelerinin yerine geçer. Uygulamadan sonra `npm run content:validate` → **0 hata, 150 uyarı**.

1. **Tobi (EVET, değiştirildi).** İki partide **Tobi** ve **Lechner** artık geçmiyor. WORLD'e göre o haftalarda iş yerinde olan Derya Aksoy ya da adsız iş arkadaşı kullanıldı: lx:Vertretung ö3 (**für Derya**) · lx:Abteilung ö5 (**der Neue**) · lx:tauschen ö2, boşluk 2 (**mit einem Kollegen**), boşluk 4 ve ipucu (**Derya**) · lx:einspringen ö1, boşluk 1 (**für Frau Aksoy**), boşluk 4 (**für Derya**) · lx:freinehmen ö2, boşluk 2 (**Mein Kollege**) · lx:Nachtschicht ö4 (**Herr Lechner** → **Herr Bauer**, WORLD dışı genel ad). Üçüncü kişiler olduğu için öğrencinin cinsiyeti sabitlenmiyor. b1-01a'daki 14 Tobi bu görevin dışında, duruyor.
2. **Kalıp ölçütü (takip).** "Kartta sayılan her kalıp en az bir örnekte ya da boşlukta geçer" ölçütü LEX.md'de ve doğrulayıcıda yok; bu partide 16 kartta elle düzeltildi. LEX.md'ye eklenmesi baş geliştiricinin takip işi; dosyaya dokunulmadı.
3. **Kartı olmayan sözcükler (kart açılmadı).**
   - Değiştirildi: Bewerbung (lx:Absage ö5 → **bekommst du die Wohnung?**) · Vertrag (lx:Zuschlag ö4 → **Ja, bei uns schon.**) · Tabelle (lx:eintragen ö4 → **in dieses Formular**) · Zeile (lx:Abrechnung ö4 → **was genau meinen Sie?**) · lüften (lx:Heizkosten ö4 → **Machen Sie die Fenster nur kurz auf.**) · Mieter (lx:Verbrauch ö4, boşluk 3; lx:Garten ö4 → **alle im Haus**, **jeder im Haus**) · einziehen (lx:nebenan ö4, boşluk 3 → **wer jetzt nebenan wohnt**) · streiten (lx:nebenan ö5 → **die sind schon wieder laut**). Daha önce: anstrengend, knapp, einverstanden, Lohn (A-3).
   - Bırakıldı (cümlenin ya da eşdizimin zorunlu parçası, hepsi çevirili): Leiter, Hammer (lx:ausleihen) · aushalten (lx:Hitze eşdizimi) · sparen (lx:Heizkosten, lx:Strom eşdizimi) · Stress (lx:abbauen eşdizimi) · Internet (lx:Kundennummer) · Liste, Kalender (lx:eintragen, lx:Warteliste) · Blume (lx:gießen) · Stock, Post, tagsüber, doppelt, Wahnsinn, Betrug, zufällig, genießen, mieten (tek tek örnek ve notlarda).
4. **`level`.** Dokunulmadı (lx:Garten, lx:Strom B1 olarak duruyor).
5. **lx:fällig ö4, boşluk 2.** **– Wann ist die Kaution fällig? – Bevor Sie einziehen.** → **– Wann ist die Rechnung fällig? – Das steht unten auf der Rechnung.** Olgu iddiası kalmadı. Örnek artık **bevor** içermediği için `pt:bevor-nachdem` karttan çıkarıldı.

C'deki "lx:Abteilung ö5 (Tobi ...)" notu bu değişiklikle kapandı.
