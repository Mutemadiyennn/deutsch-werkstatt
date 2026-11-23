# lexicon-b1-04 örneklem kontrolü (b1-04a + b1-04b)

- Tarih: 2026-11-23 · Denetleyen: qa-ajan (Opus 5.5) · Sıra: yazar → dilbilimci (`lexicon-b1-04.md`, ONAY + B kararları + okur düzeltmeleri) → okur (`okur/lexicon-b1-04.md`, 2. tur 14/14 GEÇTİ) → **örneklem**
- Girdi: `content/v2/registry/lexicon/batch-b1-04a.json` (24 kart) · `batch-b1-04b.json` (26 kart). İki dosya da `review.status: draft`. B kararları (maaş rakamı kalktı) ve okur düzeltmeleri işlenmiş hâli okundu.
- **Karar: DİLBİLİMCİYE GERİ.** Hata 2/85 = **%2,35** (eşik %2). Geri dönen yalnız iki kart: lx:Gewitter (forms[0]–[2]) ve lx:Kenntnis (mistakes_tr[0]). Öbür 48 kart için ek iş yok.

## Yöntem

Madde, kart alanı düzeyinde sayıldı. İki dosyada toplam 739 madde var:

| tür | evren | oran | örneklem |
|---|---|---|---|
| örnek cümle + çeviri (`examples[]`) | 250 | %10 | 25 |
| eşdizim (`collocations[]`) | 150 | %10 | 15 |
| boşluk (`forms[]`: cümle, cevap, `also_ok`, çeviri, ipucu) | 200 | **%15** | 30 |
| hata notu (`mistakes_tr[]`) | 100 | %10 | 10 |
| ad: `art` + `pl` + `tr` | 23 | %10 | 3 |
| fiil: `verb` biçimleri, rektion + `tr` | 16 | %10 | 2 |
| **toplam** | **739** | | **85 (%11,5)** |

- **Tohum: `20261128`.** Liste iki dosyada sırayla kuruldu: önce a, sonra b; kart sırası, alan içi dizin sırası. Tek bir `random.Random(20261128)` sırasıyla `ex, coll, form, mis, noun, verb` için `rng.sample(range(len(evren)), ceil(evren × oran))` çağrıldı, seçilen dizinler sıralandı (Python 3, standart `random`). Betik QA çalışma alanında, depoya girmedi. Yöntem b1-03 örneklemiyle aynı; boşluk katmanı yine %15.
- Örneklem 47 madde a dosyasından, 38 madde b dosyasından.
- Kart türleri: 23 ad, 16 fiil, 9 sıfat, 2 zarf (dilbilimci raporuyla aynı).

Her maddede bakılanlar:
1. Almanca doğru ve doğal mı, katmanına (hd / alltag) uyuyor mu? Resmî e-posta kalıbı gerçekten kullanılan biçimde mi?
2. Türkçe çeviri ve açıklama doğru mu?
3. Boşluk için iki yön:
   - **(a)** Türkçe çeviri yanındayken doğru ve sık bir cevap reddediliyor mu? Komşu kartı olan eş anlamlılar kayıtta arandı (lx:Unwetter, lx:Verspätung, lx:Termin, lx:Hilfe, lx:Fehler, lx:allein, lx:reisen, lx:Bescheid, lx:schicken). İpucu düğmenin arkasında (`Soru.tsx`, `IpucuDugmesi`), ekranda yalnız Almanca cümle ve Türkçe çeviri var; yön (a) buna göre okundu.
   - **(b)** `also_ok` yanlış ya da başka anlamlı bir cevabı kabul ettiriyor mu? Kartın ya da komşu kartın hata notuyla çelişiyor mu? Cümleye konunca artikel ve çekim uyuyor mu?
4. Açıklamada dilbilgisi terimi, İngilizce köprü, kişisel bilgi, kurs ya da kitap adı, öğrenci adı, rakam ya da olgu iddiası var mı?
5. Not, kartın kendi doğru öğrettiği bir biçimi ya da komşu kartın öğrettiği eşlemeyi yanlış gösteriyor mu?

## Madde listesi

Kısaltmalar: D = doğru · H = hata.

| # | dosya | kart | alan | sonuç | not |
|---|---|---|---|---|---|
| 1 | a | lx:sich_beziehen | examples[3] | D | **Auf die vom 3. Mai** doğal kısa cevap |
| 2 | a | lx:sich_erkundigen | examples[4] | D | takip notu 1 |
| 3 | a | lx:dankbar | examples[4] | D | **da wär ich dir echt dankbar** alltag'a uygun |
| 4 | a | lx:weiterhelfen | examples[4] | D | Derya WORLD ile uyumlu (**du**) |
| 5 | a | lx:weiterleiten | examples[3] | D | |
| 6 | a | lx:Zeitpunkt | examples[4] | D | |
| 7 | a | lx:Verfügung | examples[1] | D | |
| 8 | a | lx:Verfügung | examples[2] | D | |
| 9 | a | lx:Ansprechpartner | examples[4] | D | Herr Pichler WORLD'deki apartman görevlisi, kalorifer işi uyumlu |
| 10 | a | lx:kontaktieren | examples[0] | D | |
| 11 | a | lx:ergänzen | examples[2] | D | |
| 12 | b | lx:Gewitter | examples[3] | D | **heute Nacht** + geçmiş → "Dün gece" doğru |
| 13 | b | lx:verreisen | examples[1] | D | "Ben yokken" serbest ama doğru çeviri; boşluk 2'deki **weg / im Urlaub** kabulüyle tutarlı |
| 14 | b | lx:korrigieren | examples[0] | D | |
| 15 | b | lx:baldig | examples[3] | D | **Ich freue mich auf Ihre baldige Antwort** gerçek kapanış kalıbı |
| 16 | b | lx:baldig | examples[4] | D | **um baldige Antwort bitten** yerleşik |
| 17 | b | lx:Erfahrung | examples[3] | D | |
| 18 | b | lx:Verantwortung | examples[2] | D | |
| 19 | b | lx:flexibel | examples[0] | D | |
| 20 | b | lx:Unternehmen | examples[4] | D | **so 'nem** alltag'a uygun |
| 21 | b | lx:teamfähig | examples[1] | D | ilan dili gerçek |
| 22 | b | lx:Gehaltsvorstellung | examples[1] | D | rakamsız (B kararı 1) |
| 23 | b | lx:Fähigkeit | examples[3] | D | |
| 24 | b | lx:sorgfältig | examples[4] | D | |
| 25 | b | lx:Interesse | examples[1] | D | **Vielen Dank für Ihr Interesse an unserem Unternehmen** gerçek kalıp |
| 26 | a | lx:informieren | collocations[2] | D | |
| 27 | a | lx:sich_bedanken | collocations[1] | D | |
| 28 | a | lx:ausdrucken | collocations[1] | D | |
| 29 | a | lx:Verzögerung | collocations[0] | D | |
| 30 | a | lx:spätestens | collocations[1] | D | |
| 31 | a | lx:Ansprechpartner | collocations[0] | D | |
| 32 | a | lx:Ansprechpartner | collocations[1] | D | |
| 33 | a | lx:höflich | collocations[2] | D | |
| 34 | b | lx:korrigieren | collocations[1] | D | |
| 35 | b | lx:korrigieren | collocations[2] | D | |
| 36 | b | lx:Mühe | collocations[2] | D | |
| 37 | b | lx:Erfahrung | collocations[0] | D | |
| 38 | b | lx:Erfahrung | collocations[2] | D | |
| 39 | b | lx:Schwäche | collocations[0] | D | |
| 40 | b | lx:Gehaltsvorstellung | collocations[0] | D | |
| 41 | a | lx:sich_beziehen | forms[1] | D | |
| 42 | a | lx:betreffen | forms[3] | D | |
| 43 | a | lx:informieren | forms[3] | D | **Bescheid gesagt** (kartı var) **ihm** ister, **ihn** ile elenir |
| 44 | a | lx:dankbar | forms[2] | D | |
| 45 | a | lx:weiterhelfen | forms[1] | D | **helfen** yerinde |
| 46 | a | lx:weiterhelfen | forms[2] | D | **bringt ... weiter** **mich** ister, **mir** ile elenir |
| 47 | a | lx:Unterstützung | forms[0] | D | **Hilfe** artikel ve anlamca uyuyor |
| 48 | a | lx:sich_bedanken | forms[1] | D | |
| 49 | a | lx:weiterleiten | forms[0] | D | takip notu 2 |
| 50 | a | lx:Zeitpunkt | forms[2] | D | **Passt Ihnen dieser Termin?** sık ve doğru; kartın notları **Termin**'i ayırmıyor |
| 51 | a | lx:verspätet | forms[0] | D | **meine späte Antwort** doğru |
| 52 | a | lx:Versehen | forms[1] | D | **Fehler**: dilbilimcinin sorusu. Kalsın: üst anlam, cümle doğal, kartın notu ayırmıyor (b1-03 B kararı 2 ölçüsü) |
| 53 | a | lx:Verzögerung | forms[0] | D | **Verspätung**'un çıkması kartın notuyla tutarlı; başvuru bağlamında uymuyor |
| 54 | a | lx:Verzögerung | forms[1] | D | |
| 55 | a | lx:Verzögerung | forms[2] | D | |
| 56 | a | lx:spätestens | forms[2] | D | |
| 57 | a | lx:zurückschreiben | forms[0] | D | |
| 58 | a | lx:Ansprechpartner | forms[3] | D | |
| 59 | a | lx:ergänzen | forms[0] | D | **hinzufügen** yerinde |
| 60 | a | lx:ergänzen | forms[3] | D | **angeben / eintragen**: dilbilimcinin sorusu. Kalsın: örnek 5'teki "Bir şey unuttum mu?" bağlamında üçü de doğal ve aynı işi görüyor |
| 61 | b | lx:Gewitter | forms[0] | **H** | bkz. Hata 1 |
| 62 | b | lx:verreisen | forms[0] | D | yalın **reisen** hedefsiz eksik durur (**Wir reisen ... nach Spanien**); dışarıda kalması doğru |
| 63 | b | lx:Mühe | forms[0] | D | |
| 64 | b | lx:baldig | forms[1] | D | **schnelle** yerinde |
| 65 | b | lx:Erfahrung | forms[0] | D | **Berufserfahrung** yerinde |
| 66 | b | lx:flexibel | forms[0] | D | |
| 67 | b | lx:Mitarbeiter | forms[0] | D | **neue Kollegen** iş ilanında sık |
| 68 | b | lx:selbstständig | forms[0] | D | **allein** (kartı var) çeviriye uyar gibi, ama kartın notu (mistakes_tr[1]) ikisini açıkça ayırıyor; tutarlı. **selbständig** yazımı yerinde |
| 69 | b | lx:teamfähig | forms[3] | D | |
| 70 | b | lx:Interesse | forms[0] | D | |
| 71 | a | lx:sich_erkundigen | mistakes_tr[1] | D | |
| 72 | a | lx:ausdrucken | mistakes_tr[1] | D | "çıktı almak" aktarımı yerinde |
| 73 | a | lx:Verzögerung | mistakes_tr[1] | D | |
| 74 | a | lx:Ansprechpartner | mistakes_tr[0] | D | kartta **des Ansprechpartners** geçmiyor, çelişki yok |
| 75 | a | lx:formulieren | mistakes_tr[0] | D | |
| 76 | b | lx:Gewitter | mistakes_tr[0] | D | not doğru; sorun boşluk çevirilerinde (Hata 1) |
| 77 | b | lx:E-Mail | mistakes_tr[0] | D | "mail atmak" aktarımı yerinde |
| 78 | b | lx:Erfahrung | mistakes_tr[1] | D | |
| 79 | b | lx:flexibel | mistakes_tr[1] | D | |
| 80 | b | lx:Kenntnis | mistakes_tr[0] | **H** | bkz. Hata 2 |
| 81 | a | lx:Verzögerung | art/pl | D | die, Verzögerungen |
| 82 | a | lx:Ansprechpartner | art/pl | D | der, Ansprechpartner |
| 83 | b | lx:Mitarbeiter | art/pl | D | der, Mitarbeiter |
| 84 | a | lx:weiterleiten | verb | D | leitet weiter · leitete weiter · hat weitergeleitet · ayrılan **weiter** · Akk + Dat · **an** + Akk |
| 85 | b | lx:hochladen | verb | D | lädt hoch · lud hoch · hat hochgeladen · ayrılan **hoch** · Akk. Karşılık B kararı 2'deki geçici hâl |

## Hatalar

### Hata 1: lx:Gewitter forms[0] (yön a, eksik doğru cevap)

- Cümle: **Heute Abend soll es ein ___ geben.** · çeviri: "Bu akşam fırtına olacakmış." · cevap **Gewitter**, `also_ok` yok.
- Kayıtta lx:Unwetter var (`batch-b1-01a.json`, `reviewed`): karşılığı "fırtına, şiddetli kötü hava", artikeli **das**. **Heute Abend soll es ein Unwetter geben.** doğru, hava tahmininde sık ve çeviriye birebir uyuyor. Ekranda yalnız "fırtına" yazıyor; "gök gürültülü" ipucu düğmenin arkasında.
- Ters yönde tutarsızlık da var: lx:Unwetter'in dört boşluğu "Fırtına ..." çevirisiyle **Gewitter**'i kabul ediyor, lx:Gewitter ise **Unwetter**'i reddediyor.
- Öneri (dilbilimci seçsin): ya üç boşluğun çevirisi "gök gürültülü fırtına" / "şimşekli fırtına" olsun (kartı çalıştırır, kart notunun ayrımıyla da uyuşur), ya da forms[0]–[2]'ye `also_ok: Unwetter` eklensin.

### Hata 2: lx:Kenntnis mistakes_tr[0] (Türkçe yanlış, komşu kartla çelişen eşleme)

- Not: "Türkçede bilgi hem haber hem beceridir. Beceri için **Informationen** değil **Kenntnisse** denir."
- Türkçede **bilgi** beceri demek değil; kartın kendi karşılığı da "(bir dildeki, bir işteki) bilgi".
- Aynı hafta (35, iş görüşmesi) lx:Fähigkeit "beceri, yetenek" karşılığıyla geliyor; dört boşluğunun çevirisi "beceri" diyor ve **Kenntnisse** kabul etmiyor. Not, öğrenciye "beceri = Kenntnisse" kuralı veriyor; ertesi kart "beceri = Fähigkeiten" öğretiyor.
- Öneri: "Türkçede bilgi hem haber hem bildiğin şeydir. Bir dilde, bir işte bildiklerin için **Informationen** değil **Kenntnisse** denir." (İki cümle de 14 kelimenin altında.)

## Örneklem dışında aynı türden olanlar

Oran eşiği aştığı için iki dosyanın tamamı iki hata türü için tarandı.

| tür | kart | alan | not |
|---|---|---|---|
| Hata 1 (komşu kartlı eş anlamlı reddi) | lx:Gewitter | forms[1] | **Haben Sie das ___ heute Nacht gehört?** · "Dün gece fırtınayı duydunuz mu?" · **das Unwetter** artikel ve çeviriyle uyuyor |
| Hata 1 | lx:Gewitter | forms[2] | **Das ___ letzte Nacht war echt laut!** · "Dün geceki fırtına ..." · aynı |
| Hata 2 (Türkçe karşılığı komşu kartla çelişen not) | yok | | "beceri" ve "Türkçede ..." diye başlayan bütün açıklamalar okundu: lx:Erfahrung ve lx:Kenntnis `anlam_tr` ("bilgi ve beceri") doğru; lx:hochladen, lx:Unannehmlichkeit, lx:sorgfältig, lx:betreffen, lx:ergänzen, lx:Herausforderung, lx:Gewitter notlarındaki Türkçe iddiaları doğru |

Tarama yöntemi (Hata 1): 23 adın kendi sözcüğünü soran her boşluğu için kayıttaki aynı artikelli bütün ad kartları, karşılıklarındaki sözcük boşluğun çevirisinde geçiyor mu diye arandı. 31 eşleşmenin 28'i rastlantı (çevirideki "dakika", "sabah", "mutfak" gibi). Kalan üç gerçek aday: lx:Gewitter forms[0]–[2] → lx:Unwetter (yukarıda) ve lx:Verzögerung forms[0], [2], [3] → lx:Verspätung. İkincisi hata değil: kartın notu iki sözcüğü ayırıyor, cümleler iş gecikmesine çevrilmiş.

## Makine taraması: `also_ok` ile aynı kartın `mistakes_tr`'si

200 boşluk, 85 `also_ok` girdisi (dilbilimcinin sayısıyla aynı). Her girdinin her sözcüğü aynı kartın hata notlarında tam sözcük olarak arandı (küçük harf, Python `re`).

- **6 eşleşme, gerçek çelişki 0.** Hepsi lx:E-Mail'de **Mail** girdisinin **E-Mail** içinde bulunması (tire sözcük sınırı sayıldı); notlar **eine E-Mail werfen** ve **mit E-Mail**'i yanlış gösteriyor, **Mail**'i değil.
- Ek tarama: her notun "yanlış / denmez / eksik / doğal değil / olmaz / gelmez / durmaz" dediği cümledeki kalın dizeler aynı kartın örneklerinde, eşdizimlerinde, doldurulmuş boşluklarında ve `also_ok` ile doldurulmuş boşluklarında arandı. 75 eşleşmenin hepsi notun doğru kısmı (**mich**, **zur Verfügung**, **auf**, **baldig** gibi) ya da tek harf (**e**, **ge**); kartın kendi öğrettiği biçimi yanlış gösteren not yok.
- Açıklama alanları (karşılık, anlam, ne zaman, ipucu, parçalar, notlar, boşluk ipuçları) iki dosyada makineyle tarandı: dilbilgisi terimi, İngilizce sözcük, kurs ya da kitap adı, `{name}`, rakam. Tek eşleşme yanlış pozitif (lx:Geduld "beklettiğinde" içinde "klett"). Öğrencinin ağzında sabit cinsiyet yok; iş görüşmesi kartlarında rakam ya da yasa iddiası kalmadı.
- `npm run content:validate` → 0 hata, 156 uyarı; uyarıların hiçbiri b1-04 dosyalarına ait değil.

## Takip notları (orana katılmadı, engel değil)

1. lx:sich_erkundigen examples[4]: **– Weißt du, ob der Kurs noch Plätze hat? – Nee, aber ich erkundige mich morgen.** → "– ... biliyor musun? – Yok, ama yarın sorup öğrenirim." **Nee** burada "bilmiyorum" demek; "Yok" önce "yer yok" diye okunabilir. Öneri: "– Bilmiyorum, ama yarın sorup öğrenirim."
2. lx:weiterleiten forms[0]: **Ich ___ Ihre Anfrage an die zuständige Kollegin weiter.** Büro yazışmasında **gebe ... weiter** ve **schicke ... weiter** da sık ve doğru. **weitergeben / weiterschicken** kartı yok; b1-03'teki **Geschäftszeichen** ölçüsüyle eklenmesi şart değil.
3. lx:baldig forms[0]–[1]: iş yazışmasında **zeitnahe Rückmeldung** de çok sık. Kartı yok; bilgi için.

## Karar

- Oran **2/85 = %2,35 > %2** → **DİLBİLİMCİYE GERİ** (örneklem katmanı). Eşik bir maddeyle aşıldı.
- Geri dönen alanlar: lx:Gewitter forms[0], forms[1], forms[2] (çeviri ya da `also_ok`) · lx:Kenntnis mistakes_tr[0]. Değişen iki açıklama/çeviri alanı okura kısa doğrulama için gider; ardından bu örneklem yalnız bu dört alanı yeniden okur.
- Dilbilimcinin iki sorusu karara bağlandı: lx:Versehen **Fehler** ve lx:ergänzen **angeben / eintragen** kalsın.
- Önceki partilerin GERİ nedenlerinden "başka anlamlı ya da artikeli uymayan kabul" ve "kartın kendi öğrettiğiyle çelişen not" bu örneklemde görülmedi. "Eksik doğru cevap" bir kez görüldü (Hata 1, komşu kart lx:Unwetter).
