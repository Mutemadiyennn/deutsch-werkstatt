# lexicon-b1-04 (b1-04a + b1-04b): dilbilimci incelemesi

- Tarih: 2026-11-23 · İnceleyen: dilbilimci-ajan · Model: Fable 5.2 (`claude-fable-5-2`)
- **Karar: ONAY** (dil ve olgu yönünden, aşağıdaki düzeltmelerle). `review.status` görev gereği `draft`; `reviewed` okur ve örneklemden sonra.
- Girdi: `content/v2/registry/lexicon/batch-b1-04a.json` (24 kart: 34. hafta resmî e-posta) · `batch-b1-04b.json` (26 kart: 32. hafta 2, 34. hafta 9, 35. hafta 15)
- İncelenen kart: **50** (bütün alanlar; 250 örnek, 200 boşluk, 150 eşdizim, 100 hata notu). Tek tam tur.
- Düzeltilen kart: **36** · alan düzeyinde düzeltme: **90** · hata oranı **36/50 kart (0,72)**.
- Ağır sayılanlar (8 kart): doğru Almancayı yanlış gösteren not (lx:Verfügung, lx:sich_erkundigen, lx:informieren), artikeli uymayan kabul (lx:Gehaltsvorstellung, üç boşluk), kartın kendi notuyla çelişen kabul (lx:Verzögerung), Türkçe çeviride tırnak içinde Almanca (lx:höflich, lx:baldig), kartın sözcüğünü anlatmayan not ve ipucu (lx:höflich), yanlış yazım ve yanlış zaman çevirisi (lx:Gewitter).
- Dokunulmayan kartlar (14): lx:weiterhelfen, lx:weiterleiten, lx:Versehen, lx:Geduld, lx:spätestens, lx:verreisen, lx:E-Mail, lx:erwähnen, lx:Erfahrung, lx:flexibel, lx:Unternehmen, lx:motiviert, lx:Herausforderung, lx:Interesse.
- `npm run content:validate` → **0 hata, 156 uyarı** (inceleme öncesi de 156; hiçbiri bu iki partiye ait değil). `tier`, `freqRank`, `level` ve `proposals.json` dosyalarına dokunulmadı.

## A. Düzeltildi

### A-1. Hata notları, ipuçları, karşılıklar

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Verfügung | not 1 | **Ich stehe zu Ihrer Verfügung** yanlış → **Ich stehe Sie zur Verfügung** yanlış. Doğrusu **Ich stehe Ihnen zur Verfügung.** | **zu Ihrer Verfügung stehen** doğru ve yerleşik Almanca; not doğruyu yanlış gösteriyordu. Yeni not Türkçe konuşanın gerçek hatası (**Sie / Ihnen**). |
| lx:sich_erkundigen | not 1 | **mich über den Termin** yanlış → Randevuyu sormak derken **Ich erkundige den Termin** yanlış. Doğrusu **Ich erkundige mich nach dem Termin.** | **sich über etwas erkundigen** de doğru Almanca. Yeni not Türkçedeki "randevuyu sormak" kalıbından gelen hatayı gösteriyor. |
| lx:informieren | not 2 | **von** değil **über** → **über dem Termin** yanlış. Doğrusu **über den Termin informieren**. | **von etwas informieren** seyrek ama doğru. |
| lx:Verzögerung | not 1 | **Der Zug hat eine Verzögerung** denmez → aynı not + Geciken iş için **Verzögerung** denir. | Ayrım açık yazıldı (aşağıda A-4 ile birlikte). |
| lx:verspätet | not 1 | **Ich bin verspätet** Almancada doğal değil → Geç kaldım derken **Ich habe mich verspätet** dersin. **verspätet** daha çok cevap, mektup ve tren için gelir. | **Ich bin etwas verspätet** söylenir; "doğal değil" fazla kesin. |
| lx:höflich | not 2 | **Ich will** kaba durur → Daha kibar derken **mehr höflich** yanlış. Doğrusu **höflicher**: **Schreib es höflicher.** | Eski not başka bir ifadeyi anlatıyordu (okurun geri döndürdüğü tür). Yenisi kartın beşinci örneğindeki biçim. |
| lx:höflich | ipucu | **Könnten Sie** ve **Würden Sie** daha kibar durur → Başına **un** gelince tersi olur: **unhöflich**, yani kaba. | İpucu kartın sözcüğünü anlatmıyordu. |
| lx:Schwäche, lx:teamfähig, lx:Fähigkeit | ipucu | görüşme öğüdü ("bir zayıf yön söyle", "ardından örnek ver", "örnekle anlat") → **Stärken und Schwächen** birlikte sorulur · **Ich bin teamfähig** dedikten sonra bir örnek ekle · **Welche Fähigkeiten haben Sie?** | Tek okumada anlaşılmıyor ya da sözcüğü anlatmıyordu. |
| lx:Gehaltsvorstellung | not 1, not 2, ipucu | **Gehaltswarten** diye bir şey yok · rakamı söylerken brüt mü net mi söyle · Rakamla cevap ver → **Gehalt Vorstellung** ayrı yazılmaz, araya **s** girer · **liegt in 2.800 Euro** yanlış, doğrusu **liegt bei** · Rakamdan sonra **brutto** dersen kesintilerden önceki parayı söylersin. | İlk not uydurma bir hata; öbür ikisi görüşme öğüdü (olgu iddiasına yakın), hata değil. |
| lx:Mühe | not 2 | **mir** unutulmaz → Çok uğraştım derken **Ich habe viel Mühe gegeben** eksik. Doğrusu **Ich habe mir viel Mühe gegeben.** | "unutulmaz" iki türlü okunuyordu. |
| lx:Unannehmlichkeit | not 2 | **Entschuldigen Sie** ile **für** gelmez → **Entschuldigen Sie für die Unannehmlichkeiten** yanlış. Doğrusu ... | Yanlış biçim cümle içinde. |
| lx:Verantwortung | not 2 | **für** gelir (hata göstermiyor) → **die Verantwortung von der Kasse** olmaz. Doğrusu **für die Kasse**. | Türkçedeki "kasanın sorumluluğu" kalıbından gelen hata. |
| lx:Kenntnis | not 2 | hep **Kenntnisse** duyarsın → **eine gute Deutschkenntnis** denmez. Hep **gute Deutschkenntnisse** denir. | Hata gösterir hâle geldi. |
| lx:Unterstützung | not 1 | **für Unterstützung fragen** → **Unterstützung fragen** | **für** İngilizceden gelir; Türkçe konuşan "destek istemek" diye düşünüp edatsız kurar. |
| lx:sich_beziehen | `tr`, eşdizim 1–2 | dayanmak, ilgili olmak · dayanarak yazmak → (bir yazıyla, bir konuşmayla) ilgili olmak, ona istinaden yazmak · istinaden yazmak | **dayanmak** yanlış anlam; örnek çevirileri zaten **istinaden** diyordu. |
| lx:Verfügung | `tr` | hizmet, kullanım (zur Verfügung stehen: hazır olmak) → kullanıma, yardıma hazır olma | Karşılıkta Almanca vardı. |
| lx:hochladen | `tr` | internete koymak, siteye göndermek → (dosyayı siteye) yükleyip göndermek | Doğal fiil **yükle-** geri geldi; denetimin takıldığı sözcük başı (**yüklem**) yok. Bkz. B-2. |
| lx:Ansprechpartner, lx:Mitarbeiter, lx:selbstständig | parçalar | ansprechen: hitap etmek · Arbeiter: çalışan · ständig: sürekli → birine konuşmak · işçi · duran | **ständig** burada "sürekli" değil (kendi ayağı üstünde duran); **Arbeiter** işçi. |

Açıklama alanlarında (karşılık, not, anlam, ne zaman, ipucu, boşluk ipucu, parça) dilbilgisi terimi, `=`, `;`, `…`, tırnak ve 14 kelimeyi aşan cümle yok (makine taraması + elle okuma). Eşdizim çevirilerinde `…` yok.

### A-2. Almanca, dünya, olgu

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Gewitter | ö5 | **kaputt gemacht** → **kaputtgemacht** | Bitişik yazılır. |
| lx:ausdrucken | ö4 | **Nein, auf dem Handy reicht das.** → **Nein, es reicht auf dem Handy.** | Ölçünlü katmanda eğreti söz dizimi. |
| lx:höflich | ö4 | **schreiben Sie lieber „Könnten Sie“ statt „Können Sie“** → **– Ist meine E-Mail so höflich genug? – Ja, sogar sehr höflich. So können Sie sie schicken.** | Türkçe çeviri tırnak içinde Almanca taşıyordu (önceki partide okurun geri döndürdüğü tür). |
| lx:baldig | ö5 | **Klingt „baldige Antwort“ nicht komisch?** → **– Hat die Firma schon geantwortet? – Nee. Ich hab sogar um baldige Antwort gebeten, aber nix.** | Aynı sorun; ayrıca dördüncü örneğin tekrarıydı. |
| lx:Verzögerung | ö3, boşluk 1, boşluk 4 | **Kleine Verzögerung, ich bin in zehn Minuten da.** → **... das Essen ist erst in zehn Minuten fertig.** · boşluk 1: **... die ___ bei Ihrem Antrag.** | Geç kalan insan için kartın kendi notu **Verspätung** diyor; örnek notla çelişiyordu. |
| lx:Gehaltsvorstellung | ö4 | **Ja, etwa 2.600 Euro brutto.** → **Ja, sie steht auch in meiner Bewerbung.** | İkinci maaş rakamı kalktı. Kalan tek rakam için bkz. B-1. |

Fiil biçimleri (16 fiil: şimdiki, geçmiş, **hat / ist**, ayrılan parça, edat, **sich**) ve 23 adın artikel ve çoğulu tek tek denetlendi; hata yok. Rektion doğru: **sich beziehen auf** + Akk, **sich erkundigen nach / bei**, **informieren über** + Akk, **sich bedanken für / bei**, **weiterleiten an** + Akk, **Ihnen zur Verfügung stehen**, **im Voraus**, **Interesse an** + Dat, **Schwäche für**, **während meiner Abwesenheit**. Resmî e-posta kalıpları gerçekten kullanılan biçimde ve doğru kayıtta (**Ich beziehe mich auf Ihre E-Mail vom**, **Für Rückfragen stehe ich Ihnen gern zur Verfügung**, **Vielen Dank im Voraus**, **Ich wäre Ihnen dankbar, wenn**, **Bitte entschuldigen Sie die Unannehmlichkeiten**, **Ich freue mich auf Ihre baldige Antwort**). Sayılan her kalıp en az bir örnekte geçiyor.

### A-3. Türkçe çeviri

| Kart | Alan | Önce → Sonra |
|---|---|---|
| lx:Gewitter | ö4, boşluk 2 | Bu gece ... duydunuz mu → Dün gece (**heute Nacht** + geçmiş) |
| lx:dankbar | ö5 | buna gerçekten çok sevinirim → sana gerçekten minnettar olurum (kartın sözcüğü) |
| lx:dankbar ö4, lx:zurückschreiben ö4 | | bugün → bugün içinde (**heute noch**) |
| lx:betreffen | ö4 | temmuzdan sonraki → temmuzdan itibaren yapılan (**ab Juli**) |
| lx:kontaktieren | ö4 · ö5, boşluk 4 | dokuzdan sonra → dokuzdan itibaren · Kapıcıyla → Apartman görevlisiyle (önceki partilerle aynı) |
| lx:sich_erkundigen | ö2, boşluk 2 | Belediyeye bir kursu sorup bilgi aldım → Belediyeden bir kurs hakkında bilgi aldım |
| lx:informieren | ö4 | Her şey işlenince → İşleminiz biter bitmez (**sobald**) |
| lx:sich_bedanken | ö5 | Müşteri geri döndü mü → Müşteriden haber var mı |
| lx:Zeitpunkt | ö4, boşluk 3 | Bu zaman size uyar mı → Bu saat size uyar mı |
| lx:Verzögerung | ö2, boşluk 2 | Çok sayıda başvuru nedeniyle → Çok sayıda soru geldiği için (**Anfrage** kartı: soru) |
| lx:zurückschreiben | ö2, boşluk 2 | Görevli → Memur hanım (**Sachbearbeiterin** kartıyla aynı) |
| lx:höflich | ö5 | fazla dolaysız → fazla doğrudan |
| lx:hochladen | ö5 | bir ömür sürdü → bitmek bilmedi |
| lx:Abwesenheit | ö1, ö4, boşluk 1 · ö3 · eşdizim 3 | Aksoy Hanım → Frau Aksoy (öbür çevirilerle aynı) · otomatik «yokum» cevabını → otomatik cevabını · otomatik yokum cevabı → yokum diyen otomatik cevap |
| lx:Antwort | boşluk 3 | Cevabınızı bekliyorum → Cevabınızı memnuniyetle bekliyorum (boşluk 4 ile aynı çeviriydi, cümle farklı) |
| lx:Mitarbeiter | ö5 | Çok tatlı biri → Gerçekten iyi biri (üçüncü örnekle aynı) |
| lx:Kenntnis | boşluk 4 | Almancada iyi bilgim var → Almanca bilgim iyi |

Türkçe çevirilerde tırnak içinde Almanca kalmadı. Kalan beş tırnak Türkçe söz aktarıyor (lx:sich_beziehen ö3, lx:baldig ö4, lx:Unannehmlichkeit ö3 ve ö5, lx:teamfähig ö3).

### A-4. Boşluklar (`also_ok`)

200 boşluğun hepsi üç soruyla okundu: cümleye konunca artikel ve çekim uyuyor mu, Türkçe çeviriyle aynı anlamı veriyor mu, kartın ya da komşu kartın notu o sözcüğü ayırıyor mu.

**Çıkarıldı:**

| Kart | Boşluk | Çıkarılan | Gerekçe |
|---|---|---|---|
| lx:Gehaltsvorstellung | 1, 2, 3 | **Gehaltswunsch** | **der** Gehaltswunsch: cümleler **Ihre / Meine / eine Gehaltswunsch** oluyordu. **Gehaltserwartung** kaldı. |
| lx:Verzögerung | 1, 4 | **Verspätung** | Kartın notu iki sözcüğü ayırıyor. Boşluk cümleleri iş gecikmesine çevrildi (başvuru, yemek); bu bağlamda **Verspätung** uymuyor, haksız ret kalmadı. |
| lx:höflich | 1, 4 | **nett**, **nette** | **nette E-Mail** hoş e-posta demek, kibar değil. Boşluk 3'te (**Der Typ am Telefon war nicht sehr ___**) kaldı; **freundlich** dört boşlukta kaldı. |
| lx:formulieren | 4 | **erklären** | açıklamak; çeviri "başka türlü söylemek". |

**Eklendi (doğru ve sık, aynı anlam):** lx:formulieren **ausdrücken** (1, 4), **schreiben** (2; çeviri "yazın") · lx:korrigieren **verbessert**, **verbessern** (2, 3) · lx:Unannehmlichkeit **Störung** (1, 3; **Entschuldigen Sie die Störung** çeviriyle birebir) · lx:Zeitpunkt **Termin** (2) · lx:verspätet **spät** (2) · lx:im_Voraus **vorab** (4) · lx:informieren **erkundigt** (3) · lx:ergänzen **hinzufügen** (4) · lx:Kenntnis **PC-Kenntnisse** (1), **Sprachkenntnisse** (2) · lx:sorgfältig **genau** (3).

**Makine taraması (bir kez, düzeltmelerden sonra).** 200 boşluk, 85 `also_ok` girdisi. Her girdinin her sözcüğü iki partinin bütün `mistakes_tr` notlarında tam sözcük olarak arandı: 52 eşleşme, gerçek çelişki **0**. Eşleşmelerin hepsi sözcük rastlantısı: **zu** (**zu spät**), **im** (**im Urlaub**), **Mail** (**E-Mail** içinde), **Termin** ve **schicke** (başka kartın örnek cümlesi), **erkundigt** (doğru biçim olarak). 85 girdinin hepsi ayrıca cümleye yerleştirilip artikel ve çekim için elle okundu.

**lx:Verzögerung boşluğundaki "Verspätung" kabulü (görevde sorulan):** kaldırıldı, gerekçe yukarıda.

## B. Karar gerekir

1. **Maaş rakamı.** lx:Gehaltsvorstellung'da tek rakam kaldı: **liegt bei 2.800 Euro brutto im Monat** (ö2, boşluk 2 ve 4, not 2). Bir karakterin kendi beklentisi, piyasa iddiası değil; kalıp rakamsız öğretilemiyor. Kalsın mı, yoksa rakamsız cümleye mi çevrilsin (**steht in meiner Bewerbung**)?
2. **OD-9 denetimi "yüklem" terimini "yüklemek" içinde de yakalıyor.** `packages/shared/src/explain.ts` terimden sonra sözcük sınırı aramıyor. Kart şimdilik **yükleyip göndermek** diyor; doğal karşılık **(siteye) yüklemek**. Kod baş geliştiricide.
3. **Sıra.** lx:E-Mail ve lx:Antwort (b1-04b, 34. hafta) haftanın öbür 31 kartından önce gelmeli: b1-04a'nın hemen her örneği **E-Mail** ve **Antwort** kullanıyor. Kart içeriği değişmez, yalnız haftadaki sıra.

## C. Küçük notlar

- **lx:Antwort, lx:E-Mail ile eski kartların uyumu.** lx:antworten (A2) **auf** + neye, **mir** + kime diyor; lx:Antwort **Antwort auf Ihre E-Mail**, **auf eine Antwort warten** diyor: çelişki yok. lx:Rückmeldung boşlukları **Antwort**, lx:Antwort boşlukları **Rückmeldung** kabul ediyor (karşılıklı). **das E-Mail** güneyde duyulur; kart **die** öğretiyor ve öbür biçimi yanlış diye göstermiyor.
- **Üst anlamlı kabuller** (önceki partinin B kararıyla aynı ölçü, hiçbirini kart notu ayırmıyor): **Hilfe** (lx:Unterstützung), **Fehler** (lx:Versehen), **Mail / Nachricht** (lx:E-Mail), **Kollegen / Leute** (lx:Mitarbeiter), **Betrieb** (lx:Unternehmen, yalnız artikelin uyduğu iki boşlukta), **Aufgabe** (lx:Herausforderung), **helfen** (lx:weiterhelfen), **angeben / eintragen** (lx:ergänzen), **freundlich** (lx:höflich). Örneklem **Fehler** ve **angeben** için ters karar verebilir.
- **Kartı olmayan sözcükler** (önceki partilerin ölçüsüyle bırakıldı; hepsi çevirili, çoğu saydam): per, brutto, zeitlich, Englisch, Internet, Computer, nachts, herzlich, zweimal, sammeln, praktisch, besonder-, ungeduldig, sich bewerben, fehlend, freundlich, sauer, Hausnummer, abgeben, mitbringen, Besserung, Angaben. **sich bewerben** 35. haftanın çekirdek fiili; kartı yoksa lex açsın.
- Zayıf ama zararsız notlar (bırakıldı): **Ich bin mich erkundigt / bedankt**, **Verzögerungs**, **Ansprechpartners**, **Mitarbeiters**, **der Gewitter / der Schwäche / der Herausforderung / der Fähigkeit**, **eine E-Mail werfen**. lx:formulieren'in iki notu genel söz dizimi hatası (kartın sözcüğüyle kurulmuş). lx:Ansprechpartner not 2 ve lx:Mitarbeiter not 1 hata göstermiyor, kadın biçimini öğretiyor.
- lx:Unterstützung ve lx:Verantwortung çoğulu `-`: bu anlamda sayılmıyor, bırakıldı.
- Yalnızca Türkçe çeviriyle tek cevaba inen boşluklar kaldı (ör. lx:spätestens dört boşluk, lx:Geduld **Ich hab heute echt keine ___ mehr.**); giren öbür sözcükler çeviriyle çelişiyor.
- Sıra: aynı partideki göndermeler daha önce gelen karta (lx:Abwesenheit → kontaktieren; lx:Schwäche **ungeduldig** → Geduld; lx:Mitarbeiter, lx:Interesse → Unternehmen). Sonraki haftanın kartına gönderme yok.
- WORLD: Derya (iş arkadaşı, **du**), Frau Aksoy (aynı kişi, resmî yazıda), Herr Wimmer (şef), Frau Schneider (Bürgerbüro, **Zimmer 4** kurgu), Herr Pichler (apartman görevlisi, kalorifer) uyumlu. **Herr Kaya** (personel bölümü) WORLD dışı genel ad, çakışma yok. Tobi yok.
- Olgu: iş görüşmesi kartlarında yasa, süre, zorunluluk yok; rakam yalnız B-1'deki. Resmî daire cümleleri genel (**Sie bezahlen erst nach dem Termin**, **ab Juli** bir görevlinin ağzından, kurgu).
- **Nee**, **nix**, **'ne**, **'nem**, **Boah**, **Ups** gündelik biçimler; Bairisch içerik yok. İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı yok. Birinci tekilde sabit cinsiyet yok.

## Sonuç

**Dil incelemesi KAPANDI (ONAY).** Açık kalan üç madde B'de. `reviewed` için okur ve örneklem kapısı bekleniyor; bu turda değişen 24 açıklama alanı (13 not, 5 ipucu, 3 karşılık, 3 parça) okura ilk kez gidiyor.

## B kararları (baş geliştirici, 2026-11-23)

Bu bölüm yukarıdaki B maddelerinin yerine geçer.

1. **Maaş rakamı.** Rakam olmayacak. lx:Gehaltsvorstellung'dan rakam ve **brutto** tamamen çıkarıldı: ö2 ve boşluk 2 **Bitte nennen Sie in Ihrer Bewerbung auch Ihre Gehaltsvorstellung.** · boşluk 4 **Die haben sofort ___ meiner Gehaltsvorstellung gefragt.** (cevap **nach**) · not 2 **meine Gehaltsvorstellung gefragt** eksik, doğrusu **nach meiner Gehaltsvorstellung gefragt**. A-1 ve A-2'deki rakamlı satırlar artık geçersiz.
2. **"yüklemek".** Denetim sorunu ANA'ya bildirilecek. lx:hochladen karşılığı şimdilik **(dosyayı siteye) yükleyip göndermek** olarak kalıyor.
3. **Sıra.** lx:E-Mail ve lx:Antwort'un haftadaki sırası PR'da yazılacak. Kartlara dokunulmadı.

## Okur düzeltmeleri (2026-11-23, okur raporu: `docs/v2/reviews/okur/lexicon-b1-04.md`, 8 GERİ)

Yalnız geri dönen 8 alan değişti (b1-04a 1, b1-04b 7). Okur bu alanları yeniden okumadı.

| Kart | Alan | Sonra | Neyi çözüyor |
|---|---|---|---|
| lx:verspätet | mistakes_tr[0] | Geç kaldım derken **Ich habe verspätet** yanlış, **mich** eksik. Doğrusu **Ich habe mich verspätet.** | Tek fikir; yanlış söz yazıldı, çelişen ikinci cümle kalktı. |
| lx:verreisen | exp.ipucu_tr | Yolculuktaysan, şehir dışındaysan **Ich bin verreist** dersin. | "Evde değilsen" fazla genişti. |
| lx:verreisen | forms[1].hint_tr | Yolculukta, şehir dışında olan **verreist** olur. | Aynı. |
| lx:verreisen | forms[2].hint_tr | Yolculukta, şehir dışında olanlar için **verreist** denir. | Aynı. |
| lx:Mühe | forms[3].hint_tr | **Mühe geben** önüne **mir** gelir: **Ich habe mir Mühe gegeben.** | "Hep birlikte" yanlış okunuyordu; boşluğa gelen **mir** artık anılıyor. |
| lx:Kenntnis | forms[2].hint_tr | Dil bilmek **Sprachkenntnisse haben** ile söylenir. | "Dil bilgisi" gramer diye okunuyordu. |
| lx:teamfähig | mistakes_tr[1] | Ekip çalışmasına yatkınım derken **Ich bin fähig für Team** olmaz. Doğrusu **Ich bin teamfähig.** | Not artık kartın kendi sözcüğünü anlatıyor. |
| lx:Gehaltsvorstellung | exp.ipucu_tr | Görüşmede şöyle sorulur: **Was ist Ihre Gehaltsvorstellung?** | İpucu **brutto** sözcüğünü anlatıyordu. |

Okurun takip notu (lx:verreisen eşdizim 3 çevirisi "seyahatte olmak, evde olmamak") GERİ değildi, dokunulmadı. `npm run content:validate` → **0 hata, 156 uyarı**. `review` iki dosyada `draft`.

## Çakışma silme (2026-11-23)

A2 hattı lx:Geduld, lx:korrigieren ve lx:höflich kartlarını önce yazdı (#210). Üç kart bu partiden silindi: b1-04a 24 → **22** kart (lx:Geduld, lx:höflich), b1-04b 26 → **25** kart (lx:korrigieren). Toplam 47 kart; yerlerine gelecek üç yedek kart `batch-b1-04c.json` içinde ayrı incelenecek.

Kalan 47 kartın notları, ipuçları, boşluk ipuçları ve `also_ok` listeleri üç sözcük için makinede tarandı: gönderme **yok**, düzeltme gerekmedi. Tek geçiş bir örnek cümlede sözcük olarak (lx:Schwäche ö4 **ungeduldig**); sorun değil. Yukarıdaki bölümlerde bu üç karta ait satırlar (A-1, A-2, A-3, A-4, C) artık geçersiz.

## Örneklem düzeltmeleri (2026-11-23, örneklem raporu: `docs/v2/reviews/ornek-lexicon-b1-04.md`, 4 alan GERİ)

Yalnız geri dönen 4 alan değişti (hepsi b1-04b).

| Kart | Alan | Sonra | Neyi çözüyor |
|---|---|---|---|
| lx:Gewitter | forms[0], forms[1], forms[2] | `also_ok`: **Unwetter** | Çeviri "fırtına" diyor, **das Unwetter** artikel ve anlamla uyuyor; lx:Unwetter boşlukları da **Gewitter** kabul ediyor. Kabul artık iki yönlü. Çeviri ve ipucu değişmedi. |
| lx:Kenntnis | mistakes_tr[0] | Türkçede bilgi hem haber hem bildiğin şeydir. Bir dilde, bir işte bildiklerin için **Informationen** değil **Kenntnisse** denir. | Eski not "beceri" diyordu; beceri komşu kart lx:Fähigkeit'ın karşılığı. |

**Unwetter** kartın notlarında yanlış diye geçmiyor (makinede bakıldı). `npm run content:validate` → 0 hata. `review` iki dosyada `draft`.
