# lexicon-b1-03 (b1-03a + b1-03b): dilbilimci incelemesi

- Tarih: 2026-11-23 · İnceleyen: dilbilimci-ajan · Model: Fable 5.2 (`claude-fable-5-2`)
- **Karar: ONAY** (dil ve olgu yönünden, aşağıdaki düzeltmelerle). `review.status` görev gereği `draft`; `reviewed` okur ve örneklemden sonra.
- Girdi: `content/v2/registry/lexicon/batch-b1-03a.json` (26 kart: 32. hafta 15, 33. hafta 11) · `batch-b1-03b.json` (24 kart: 33. hafta 22, 34. hafta 2)
- İncelenen kart: **50** (bütün alanlar; 250 örnek, 200 boşluk, 158 eşdizim, 98 hata notu). Tek tam tur.
- Düzeltilen kart: **38** · alan düzeyinde düzeltme: **102** · hata oranı **38/50 kart (0,76)**. Üçte biri `also_ok` (37 alan, 16 kart).
- Ağır sayılanlar (9 kart): artikeli uymayan kabul (lx:Empfang), yanlış biçimi kabul (lx:aufpassen), doğru Almancayı yanlış gösteren not (lx:gültig), kendi örneğiyle çelişen not (lx:nachreichen), kabul listesiyle çelişen not (lx:Rückfrage), yanıltıcı not (lx:beachten), yanlış çoğul (lx:Aktenzeichen), doğal olmayan Almanca (lx:besetzt, lx:hiermit).
- Dokunulmayan kartlar (12): lx:Hof, lx:vorbeikommen, lx:leise, lx:Gerücht, lx:Vorwahl, lx:Signalton, lx:Sprachnachricht, lx:angeben, lx:zurückschicken, lx:ablehnen, lx:Widerspruch, lx:Begründung.
- `npm run content:validate` → **0 hata, 154 uyarı** (inceleme öncesi de 154; hiçbiri bu iki partiye ait değil). `tier`, `freqRank`, `level` ve `proposals.json` dosyalarına dokunulmadı.

## A. Düzeltildi

### A-1. Hata notları ve ipuçları

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:gültig | not 2 | **nicht gilt** yanlış → Geçerli bir pasaport derken **ein gültig Pass** eksik. Doğrusu **ein gültiger Pass**. | **Der Pass gilt nicht** doğru Almanca; not doğruyu yanlış gösteriyordu. |
| lx:nachreichen | not 2 | **nachreichen** konuşmada az duyulur → Sonra veririm derken **Ich gebe das nach** yanlış. **nachgeben** pes etmek demektir. Doğrusu **Ich reiche das nach.** | Kartın iki gündelik örneği sözcüğü konuşmada kullanıyor; not kartla çelişiyordu. Dairede de sık duyulur. |
| lx:Rückfrage | not 1 | **Rückfrage** her soru değildir ... **Frage** dersin → Sorunuz olursa derken **wenn Rückfragen** eksik. Doğrusu **bei Rückfragen**. | Dört boşluk **Frage / Fragen** cevabını haklı olarak kabul ediyor; not ikisini ayırıyordu. Ayrım `anlam_tr` içinde duruyor. |
| lx:beachten | not 2 | Konuşurken çoğu zaman **Pass auf!** duyarsın → Tehlikeye dikkat etmek **aufpassen** olur. Kurala ya da süreye dikkat etmek **beachten** olur. | İki fiil birbirinin yerine geçmez; eski not öyle gösteriyordu. |
| lx:Anruf, lx:Rückmeldung | not 2 | **Ich warte für Ihren Anruf** → **Ich warte Ihren Anruf** eksik (Rückmeldung'da aynı) | **für** hatası İngilizceden gelir. Türkçe konuşan **aramanızı** diye düşünüp **auf** sözcüğünü atlar. |
| lx:Gespräch | not 2 | **Er spricht gerade Telefon** ... Doğrusu **im Gespräch** → Görüşmede derken **Sie ist in Gespräch** eksik. Doğrusu **Sie ist im Gespräch.** | Telefonda demenin doğrusu **telefoniert**; not kartın sözcüğüne bağlandı. |
| lx:Empfang | not 2 | Otelde resepsiyon ... karıştırma → Girişteki danışma masasına da **der Empfang** denir: **am Empfang fragen**. Telefonda ise telefonun çekmesidir. | İkinci anlam örnekle verildi; iş yeri ve muayenehane girişini de kapsıyor. |
| lx:Wäsche | not 2 | **Wäschemaschine** yanlış → Çamaşır asmak derken **die Wäsche hängen** eksik. Doğrusu **die Wäsche aufhängen**. | Eski not başka bir sözcüğü anlatıyordu. |
| lx:füttern | not 2 | en doğal söyleyiş **füttern** olur → Kediye yemek veriyorum derken **Ich gebe der Katze Essen** doğal değil. Doğrusu **Ich füttere die Katze.** | Not bir hata göstermiyordu. |
| lx:Original | not 1 | **das richtige Dokument** → Belgenin aslı derken **das echte Dokument** denmez. Doğrusu **das Original**. | Kısaldı; Türkçedeki **asıl, gerçek** düşüncesine bağlandı. |
| lx:Aktenzeichen, lx:Original, lx:Einschreiben | artikel notu | **der Aktenzeichen** yanlış → **Der Aktenzeichen steht oben** yanlış. Doğrusu **Das Aktenzeichen steht oben.** | Önceki örneklemin istediği biçim: yanlış biçim cümle içinde. |
| lx:deutlich | not 2 | **nett** kibar demektir → **nett** hoş ve iyi demektir | **kibar** karşılığı **höflich**. |
| lx:Kopie | not 1 | **Kopya** demek anlaşılmaz → Türkçedeki kopya gibi okunmaz. **die Kopie** sonda uzun **i** ile söylenir. | Abartı kalktı. |
| lx:bellen | ipucu | Kibarca şikâyet ederken **Ihr Hund bellt immer** → Yalnız köpek için söylenir: **Der Hund bellt.** | Cümle kibar değil; ipucu sözcüğü anlatmıyordu. |
| lx:Schnee, lx:glatt, lx:Leitung, lx:abhören, lx:vorlegen | ipucu | nottakinin tekrarı → **viel Schnee** · **glatte Haare** (düz, pürüzsüz) · su ve elektrik hattı · doktorun ciğerleri dinlemesi · **vor** sona gider | Beş ipucu aynı kartın notunu yineliyordu; yerine sözcüğün öğrencinin karşılaşacağı öbür kullanımı yazıldı. |
| lx:Empfang | `tr`, dört boşluk ipucu | (telefonda) çekim · Çekim **der Empfang** olur → (telefonda) çekim, sinyal · Çekmiyor derken **keinen Empfang** denir · Telefonun çekmesi **der Empfang** ile söylenir | **çekim** tek başına film çekimi diye de okunuyor. |

Açıklamalarda dilbilgisi terimi, `=`, `;`, `…`, tırnak ve 14 kelimeyi aşan cümle yok (makine taraması + elle okuma). Eşdizim çevirilerinde `…` yok.

### A-2. Almanca, biçim, dünya

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Aktenzeichen | `pl` | `-` → `Aktenzeichen` | Çoğulu var ve tekille aynı. |
| lx:besetzt | ö4, boşluk 3 | **ist hier noch besetzt?** → **ist hier besetzt?** · boşluk: **Ist hier ___ oder ist der Platz noch frei?** | **noch** yalnız **frei** ile doğal. Yeni boşluk cümlesi **frei** cevabını da eliyor. |
| lx:hiermit | ö1, boşluk 1 | **Hiermit beantrage ich einen neuen Termin.** → **... eine Meldebescheinigung.** | Randevu için **beantragen** denmez (**um einen Termin bitten**). |
| lx:plaudern | ö3 | **Deshalb bin ich spät.** → **Deshalb komm ich so spät.** | İngilizceden kopya söyleyiş. |
| lx:plaudern | `register` | informal → neutral | Sözcük gündelik işaretli değil. |
| lx:bearbeiten | ö4 | **– Das kann ein paar Wochen dauern.** → **– Das kann ich Ihnen leider nicht genau sagen.** | Süre iddiası kalmadı. |
| lx:aufpassen | ö2, boşluk 2 | **Frau Brandl passt ... auf die Kinder von nebenan auf.** → **Eine Nachbarin passt ...** | Karaktere WORLD'de olmayan olay ekleniyordu. |
| lx:Anlage ö3, lx:vollständig ö5 | | **Guck mal**, **guck noch mal** → **Schau mal**, **schau noch mal** | Partinin geri kalanı ve Bavyera gündeliği **schau**. |
| lx:neugierig | kalıplar | `pt:verb-praep` çıkarıldı | **neugierig auf** fiil değil; kalıp hiçbir örnekte geçmiyordu. Öbür 49 kartta sayılan her kalıp bir örnekte geçiyor. |

### A-3. Türkçe çeviri

| Kart | Alan | Önce → Sonra |
|---|---|---|
| lx:plaudern | eşdizim 3, ö2, boşluk 2 | havadan sudan → hava hakkında (**über das Wetter** deyim değil, düz anlam) |
| lx:füttern | ö4, boşluk 3 | günde kaç kez → ne sıklıkla (**Wie oft**; "günde" cevapta) |
| lx:Wäsche | ö4, boşluk 3 | avluya asabilir miyim → avluda asabilir miyim |
| lx:glatt | ö3, boşluk 3 | şurası → şu ileride (**da vorne**) |
| lx:Verständnis | ö2, boşluk 2 | Cevabımın ... geldiği için → Cevabım ... geldiği için |
| lx:rechtzeitig | ö3 | tam zamanında → ucu ucuna zamanında (**gerade noch**) |
| lx:Sachbearbeiter | ö2, ö4, boşluk 3 | Bay Yıldız → Herr Yıldız (öbür çevirilerle aynı) · memurun → memur hanımın (boşluk çevirisiyle aynı) |
| lx:nachreichen | eşdizim 2 | cumaya kadar sonradan vermek → cumaya kadar sonradan teslim etmek |
| lx:vorlegen | `tr` | ibraz etmek, sunmak → göstermek, ibraz etmek |

### A-4. Boşluklar (`also_ok`)

200 boşluğun hepsi üç soruyla okundu: cümleye konunca artikel ve çekim uyuyor mu, Türkçe çeviriyle aynı anlamı veriyor mu, kartın ya da komşu kartın notu o sözcüğü ayırıyor mu.

**Çıkarıldı (yanlış ya da başka anlam):**

| Kart | Boşluk | Çıkarılan | Gerekçe |
|---|---|---|---|
| lx:Empfang | 1, 2 | **Netz** | **das Netz**: cümle **keinen Netz** oluyordu. |
| lx:aufpassen | 3 | **Passt** | Tek kişiye **Passt auf!** yanlış; tam da öğrencinin yapacağı hata. |
| lx:Gespräch | 1, 2 | **Termin**, **Telefonat** | randevu ve telefon görüşmesi; çeviri **görüşme**, **konuşma**. |
| lx:Leitung | 4 | **Nummer** | numara, hat değil. |
| lx:Anlage | 3 | **Unterlagen** | belgeler, ekler değil; ayrı kartı var. |
| lx:vollständig | 4 | **da** | burada, mevcut; eksiksiz değil. |
| lx:nachreichen | 2, 4 | **nachschicken** | göndermek; çeviri **vermek**. Boşluk 3'te (**per Post**) kaldı. |

**Eklendi (doğru ve sık, aynı anlam):**

- lx:erreichbar dört boşluk: **zu erreichen**
- lx:Anfrage dört boşluk: **Frage** (çeviri **soru** diyor; kart notu Antrag'ı ayırıyor, Frage'yi değil)
- lx:klingeln dört boşluk: **läuten** biçimleri (güneyde ölçünlü)
- lx:Gegend dört boşluk: **Nachbarschaft** (lx:Nachbarschaft kartı aynı cümlede **Gegend** kabul ediyor)
- lx:deutlich dört boşluk: **klar**, **klarer**
- lx:abhören boşluk 2, 3: **angehört** · lx:Rasen boşluk 2, 3: **Gras** (**auf dem Gras**) · lx:aufpassen boşluk 1: **achten** · lx:Anruf boşluk 3: **Rückruf** · lx:beilegen boşluk 1: **füge**

**Makine taraması (bir kez, düzeltmelerden sonra).** 200 boşluk, 101 `also_ok` girdisi. Her girdinin her sözcüğü iki partinin bütün `mistakes_tr` notlarında tam sözcük olarak arandı: 23 eşleşme, gerçek çelişki **0**. Aynı karttaki eşleşmeler doğru biçim olarak geçiyor (lx:vorbeikommen **komme**, lx:erreichbar **erreichen**, lx:vorlegen **zeigen**). Öbürleri başka kartın örnek cümlesi (**zu**, **Nachricht**, **gehört**, **fragen**). Ayrıca 101 girdinin hepsi cümleye yerleştirilip artikel ve çekim için elle okundu.

## B. Karar gerekir

1. **Mevsim.** lx:Schnee ve lx:glatt 32. haftada; WORLD takvimiyle bu hafta haziran sonu. Kartlar doğru, hafta ataması bana ait değil. Kışa taşınsın mı, yoksa sözlük kartları takvimden bağımsız mı?
2. **Üst anlamlı cevap ölçütü hâlâ yazılı değil.** Bu partide kabul edilenler: **Nachricht** (lx:Sprachnachricht), **reden / sprechen** (lx:plaudern), **kommen** (lx:vorbeikommen), **Frage** (lx:Rückfrage, lx:Anfrage), **Antwort** (lx:Rückmeldung). Hiçbirini kart notu ayırmıyor. Örneklem **Nachricht** ve **kommen** için ters karar verebilir. LEX.md'ye tek cümle eklenmesi önceki partide de önerilmişti.
3. **Kartı olmayan sözcükler.** Önceki partinin ölçüsüyle bırakıldı (hepsi çevirili, çoğu eşdizimin zorunlu parçası): waschen, aufhängen, mähen, Katze, räumen, Vorsicht, auskennen, einlegen, per, Post, E-Mail, Zettel, sauer, offiziell, abgeben, freundlich, höflich, wegschicken, Cent. **waschen**, **Katze** ve **Post** çok temel; lex kart açsın mı?
4. **lx:Empfang üçüncü anlam.** **den Empfang bestätigen** (teslim aldığını onaylamak) tam 33. haftanın mektup konusu. Kartta yok; ayrı kart (`lx:Empfang#2`) açılsın mı?

## C. Küçük notlar

- **lx:Rasen `freqRank`.** Listedeki satır küçük harfli **rasen** (biçimler **rasen**, **rast**): ad ile fiil aynı satırda sayılmış. Kararım: K2 ve 2855 kalsın. Adın gerçek sırası bu sayıdan iyi olamaz, yani kart her durumda K2; satırın ad adayı da **der Rasen**. Öbür 25 listeli kartın `tier` ve `freqRank` değerleri listeyle aynı; listede olmayan 24 kart K1 ve `freqRank` yok.
- `proposals.json` içinde öneri olarak duranlar (telefon): leise, besetzt, erreichbar, Signalton. Dosyaya dokunulmadı.
- Zayıf ama zararsız notlar (Türkçe konuşana özgü değil, bırakıldı): lx:bellen (**ist gebellt**), lx:plaudern (**sind geplaudert**), lx:Gegend (**gegen**), lx:Gerücht (**Geruch**), lx:Kopie (**Kopies**), lx:Anlage (**Anlages**), lx:rechtzeitig (**in der Zeit**).
- lx:Sachbearbeiter not 1 hata göstermiyor, kadın biçimini öğretiyor; ipucuyla aynı fikir. Frau Schneider WORLD ile uyumlu, bırakıldı.
- lx:Leitung not 1 (**auf der Linie**): Türkçe konuşan **hat** için otobüsten bildiği **Linie** sözcüğüne gider; yerinde.
- Yalnızca Türkçe çeviriyle tek cevaba inen boşluklar kaldı (ör. lx:Hof **im ___**, lx:Gerücht **Das ist nur ein ___.**, lx:Verständnis **Mein Chef hatte zum Glück ___.**, lx:Original **Hast du das ___ dabei?**). Giren öbür sözcükler çeviriyle çelişiyor; önceki partilerle aynı ölçü.
- lx:Begründung boşluk 2'de **Grund** (**ohne Grund abgelehnt**) doğal, ama kartın notu ikisini ayırdığı için eklenmedi.
- Sıra: aynı partideki bütün göndermeler daha önce gelen karta (Hof → bellen, Wäsche; vorbeikommen, besetzt → Leitung; Sprachnachricht → abhören; Aktenzeichen → angeben; Kopie → Original, Anlage, beilegen; vollständig, bearbeiten → ablehnen, beachten; Widerspruch → Begründung, Einschreiben; aufpassen → beachten). Öbür göndermelerin kartı önceki partilerde var (genehmigen, zuständig, widersprechen, Antrag, Bescheid, Frist, Meldebescheinigung, pünktlich).
- WORLD: Brandl (meraklı, geveze, kek getirir), Pichler (apartman görevlisi), Huber (telefonda), Wimmer (erkek şef), Aksoy, Schneider (memur), Wendlfing uyumlu. Herr Yıldız WORLD dışı genel ad. Tobi yok.
- Olgu: daire işlemleri genel (**schriftlich Widerspruch einlegen**, **per Post nachreichen**, **Bis Ende des Monats** bir memurun ağzından). Yasa, süre, rakam yok. Fotokopi fiyatı (**zehn Cent pro Seite**) kurgu.
- **Nee**, **nix**, **'ne**, **ne?** gündelik biçimler; Bairisch içerik yok. İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı yok. Birinci tekilde sabit cinsiyet yok.
- Fiil biçimleri (15 fiil: şimdiki, geçmiş, **hat / ist**, ayrılan parça, edat) ve 26 adın artikel ve çoğulu tek tek denetlendi; tek hata lx:Aktenzeichen çoğuluydu.

## Sonuç

**Dil incelemesi KAPANDI (ONAY).** Açık kalan dört madde B'de. `reviewed` için okur ve örneklem kapısı bekleniyor; bu turda değişen 28 açıklama alanı (16 not, 6 ipucu, 4 boşluk ipucu, 2 `tr`) okura ilk kez gidiyor.

## B kararları (baş geliştirici, 2026-11-23)

Bu bölüm yukarıdaki B maddelerinin yerine geçer.

1. **Mevsim.** lx:Schnee ve lx:glatt kalır; 32. hafta yerine kış haftasının yuvasına gider (yuva değişikliğini baş geliştirici PR'da yazar). İki kartın örnekleri, boşlukları ve notları tarandı: yaz bağlamı yok, kartlarda değişiklik yapılmadı.
2. **Üst anlamlı cevap.** Bu turdaki kararlar geçerli (**Nachricht**, **reden / sprechen**, **kommen**, **Frage**, **Antwort** kabul).
3. **Kartı olmayan sözcükler.** Dokunulmadı.
4. **lx:Empfang üçüncü anlam.** `lx:Empfang#2` şimdilik açılmıyor. **Takip:** **den Empfang bestätigen** (teslim aldığını onaylamak) resmî mektup konusu yeniden ele alınırken kart adayı.

## Okur düzeltmeleri (2026-11-23, okur raporu: `docs/v2/reviews/okur/lexicon-b1-03.md`, 3 GERİ)

Yalnız geri dönen 3 alan değişti (hepsi b1-03b). Okur bu alanları yeniden okumadı.

| Kart | Alan | Sonra | Neyi çözüyor |
|---|---|---|---|
| lx:hiermit | examples[2].tr (lx:hiermit:3) | Doğrudan resmî başvuru cümlesiyle başlıyorum, kulağa çok resmî geliyor, değil mi? | Türkçede tırnak içinde Almanca vardı. |
| lx:vorlegen | examples[4].tr (lx:vorlegen:5) | – Buradaki bu kelime ne demek? – Eh, onu randevuda göstermen lazım. | Türkçede tırnak içinde Almanca vardı. |
| lx:rechtzeitig | exp.ipucu_tr | **gerade noch rechtzeitig** ucu ucuna yetişmek demektir. | İpucu **pünktlich** sözcüğünü anlatıyordu; artık kartın kendi sözcüğünü, kartın üçüncü örneğindeki kullanımla anlatıyor. |

`npm run content:validate` → **0 hata, 154 uyarı**. `review` iki dosyada `draft`.

## Kapanış (2026-11-23)

Okur 2. tur 3/3 GEÇTİ, örneklem 0/86 GEÇTİ (`docs/v2/reviews/ornek-lexicon-b1-03.md`). İki dosyada `review` baş geliştiricinin verdiği biçimde `reviewed`, `okur: passed`.

Örneklemin takip notundan tek düzeltme: lx:leise forms[3] ipucu **Sesin kısık derken** → **Sesin az geliyor derken du bist leise denir.** Aynı boşluğun ve examples[4]'ün çevirisi de **sesin çok az geliyor** oldu. **kısık** Türkçede hastalıktan kısılmış ses diye okunuyordu (**heiser**). Bu üç alan okurdan yeniden geçmedi.

`npm run content:validate` → **0 hata, 154 uyarı**.

## Çakışma silme (2026-11-23)

A2 hattı (İÇ-K2) lx:Gegend, lx:deutlich, lx:neugierig, lx:Hof ve lx:Schnee kartlarını daha önce yazdı; bu beş kart `batch-b1-03a.json` dosyasından silindi (26 → 21 kart). `review` yeniden `draft`.

- Kalan 45 kartın (03a + 03b) notları, ipuçları, boşluk ipuçları, eşdizimleri, cevapları ve `also_ok` listeleri silinen beş sözcük için makinede tarandı: gönderme **yok**. lx:glatt kartında lx:Schnee'ye gönderme yok (anlamdaki "kar" Türkçe).
- Sözcük olarak geçtiği yerler yalnız örnek ve boşluk cümleleri: **im Hof** (lx:bellen ö5, lx:Wäsche ö4 ve boşluk 3). Karar gereği bırakıldı.
- Yukarıdaki bölümlerde bu beş karta ait düzeltme satırları (A-1, A-2, A-4, C) artık dosyada karşılığı olmayan kayıtlardır.

## 03c incelemesi (2026-11-23)

Girdi: `batch-b1-03c.json`, 5 yedek kart (lx:Zaun, lx:Schatten, lx:Straßenfest 32. hafta; lx:knapp, lx:Festnetz 33. hafta). Tek tam tur, aynı ölçütler. **Karar: ONAY** (düzeltmelerle); `review` `draft`. Düzeltilen kart **5/5**, alan **21**.

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Schatten | not 1 | **im Schatten gehen** yanlış → Gölgeye oturmak derken **sich im Schatten setzen** yanlış. Doğrusu **sich in den Schatten setzen**. | **im Schatten gehen** (gölgede yürümek) doğru Almanca; not doğruyu yanlış gösteriyordu. |
| lx:Schatten | not 2 | şemsiyeye **Schatten** denmez, **der Sonnenschirm** → Bol gölge derken **viele Schatten** denmez. Doğrusu **viel Schatten**. | Not başka bir sözcüğü öğretiyordu. |
| lx:Schatten | `freqRank` | yok → 1617 | Sözcük listede (K1, 1617); lex kuralı listedeki sırayı ister. |
| lx:Schatten | ne zaman | oturacağınızı → oturacağını | Kartların hitabı **sen**. |
| lx:Zaun, lx:Schatten | boşluk 1 ipucu | **am Zaun** = çitin yanında (`;` ve `=`) → Çitin yanında derken **am Zaun** denir · Gölgede derken **im Schatten** denir | OD-9.2 sembol yasağı. |
| lx:Zaun | not 1 | ... yanlış: bu, çitin tepesinde ... → Çitin üstünden konuşmak derken **auf dem Zaun reden** yanlış. Doğrusu **über den Zaun reden**. | Tek fikre indi. |
| lx:Zaun | ö1, boşluk 1 | **plaudert** → **redet** | lx:plaudern aynı haftanın kartı; yedek kart ondan önceki yuvaya girebilir. |
| lx:Straßenfest | not 1 | **die Straßenfest** yanlış → **Die Straßenfest war schön** yanlış. Son parça **das Fest** olduğu için **Das Straßenfest war schön** denir. | Yanlış biçim cümle içinde. |
| lx:Straßenfest | boşluk 2 ipucu | **ein** ile **Straßenfest** gelir → Sokak şenliği **das Straßenfest** olur. | İpucu bir şey söylemiyordu. |
| lx:knapp | `tr` | kısa ve öz → kısa ve öz, (vakit) dar | Kart **die Zeit ist knapp** anlamını da öğretiyor. |
| lx:knapp | boşluk 1, 2, 4 | `also_ok`: **bündig** | **kurz und bündig** aynı anlamda yerleşik söyleyiş. |
| lx:Festnetz | ö1, ö3, ö4, boşluk 1, 3 çevirileri | sabit hattan mı → sabit hattınızdan mı · cepten → cebimden | Kartın kendi notu "sabit hattan ara"nın iki anlamlı olduğunu söylüyor; çeviriler tek anlama çekildi. |

- Almanca, artikel ve çoğullar doğru (der Zaun / Zäune, der Schatten / Schatten, das Straßenfest / -feste, das Festnetz). Sayılan her kalıp bir örnekte geçiyor. **30 Grad im Schatten**, **Im Juli** yaz haftasına uygun.
- `also_ok` ↔ `mistakes_tr` makine taraması (03c'nin 12 girdisi, üç partinin bütün notlarına karşı): 4 eşleşme, hepsi lx:Straßenfest notundaki **das Fest** ("son parça" açıklaması), gerçek çelişki **0**. **Gartenzaun** (der) dört cümlede, **Fest** (das) dört cümlede, **fast** bir cümlede artikel ve anlamca uyuyor.
- Birinci tekilde sabit cinsiyet, öğretilmemiş karta gönderme, olgu iddiası, Bairisch, İngilizce köprü yok. Brandl WORLD ile uyumlu (geveze komşu). **aufm**, **hat's**, **Nee** gündelik biçimler.
- Kalan notlar: lx:Zaun ö2 **Zwischen unseren Gärten** konuşana bahçe veriyor; genel cümle, bırakıldı. Kartı olmayan sözcükler çevirili ve bırakıldı (Ball, Baum, Grad, niedrig, organisieren). lx:knapp örneklerindeki **Signalton**, **Anruf**, **Gespräch** 03a'da aynı haftada daha önce gelen kartlar.
- Değişen 9 açıklama alanı (5 not, 3 boşluk ipucu, 1 ne zaman, ayrıca `tr`) ve 03c'nin tamamı okurdan ve örneklemden geçmedi.

`npm run content:validate` → **0 hata, 154 uyarı**.
