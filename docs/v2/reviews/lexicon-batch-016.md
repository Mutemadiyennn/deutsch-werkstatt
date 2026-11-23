# lexicon-batch-016: dilbilimci incelemesi

- Tarih: 2026-11-23 · İnceleyen: dilbilimci-ajan · Görev: İÇ-K2
- Girdi: `content/v2/registry/lexicon/batch-016.json` (lex ajanı, 32 derin kart). Düzeltmeler dosyaya doğrudan yazıldı.
- İncelenen kart: **32** (her kartın bütün alanları; 192 örnek, 191 boşluk)
- Düzeltilen kart: **23** · alan düzeyinde düzeltme: **71** (24'ü `also_ok` eklemesi)
- Hata oranı: **23/32 kart** (0,72). Yalnız `also_ok` eklenen iki kart (lx:zustellen, lx:Einkaufswagen) sayılmazsa 21/32 (0,66).
- Ağır hata 9 kartta: WORLD ile çelişen ya da WORLD'de olmayan karakter olayı (lx:Kündigung, lx:Arbeitsunfall, lx:Anzeige, lx:Probezeit, lx:Arbeitsvertrag, lx:Rettungswagen, lx:Mietvertrag), gerçeğe uymayan cümle (lx:Kündigung, lx:färben, lx:Geräte), öğrencinin ağzında sabit cinsiyet (lx:Bewerbung, lx:Empfänger).
- Dokunulmayan kart (9): lx:Wasserhahn, lx:Steckdose, lx:Absender, lx:Briefmarke, lx:krankmelden, lx:Umtausch, lx:Girokonto, lx:Haarschnitt, lx:Umkleide.
- `content:validate`: **0 hata**, 147 uyarı (uyarıların hiçbiri bu partiye ait değil).
- `review.status` **`draft`** kaldı. Gerekçe aşağıda, "Kalan şüpheler" 1. madde.

## Hatalar

### WORLD ile çelişen ya da WORLD'de olmayan karakter olayı (İÇ 7013446061)

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Kündigung | ö3, boşluk 4 | Tobi hat die Kündigung gekriegt → **mein Nachbar** hat die Kündigung gekriegt | Kalıcı iş arkadaşı işten çıkarılıyordu. Hikâyeyle çelişir. |
| lx:Arbeitsunfall | ö3 | Tobi hat sich an der Hand verletzt → **Ein Kollege** hat sich an der Hand verletzt | WORLD'de olmayan kaza. |
| lx:Arbeitsunfall | ö5, boşluk 4 | war Derya zwei Wochen krank → war **meine Kollegin** zwei Wochen krank | WORLD'de olmayan kaza ve iki haftalık hastalık. |
| lx:Anzeige | ö2, boşluk 2 | hat Frau Brandl Anzeige erstattet → hat **meine Nachbarin** Anzeige erstattet | Brandl'a WORLD'de olmayan hırsızlık olayı ekleniyordu. |
| lx:Probezeit | ö5, boşluk 3 | bekommt Tobi mehr Geld → bekomme **ich** mehr Geld | Tobi yerleşik çalışan, deneme süresinde değil. |
| lx:Arbeitsvertrag | ö5, boşluk 4 | Derya hat einen neuen Arbeitsvertrag bekommen → **Meine Kollegin** … | Ekibin en deneyimlisine yeni sözleşme olayı ekleniyordu. |
| lx:Rettungswagen | ö5, boşluk 3 | Derya wählt die 112 → **Meine Kollegin** wählt die 112 | WORLD'de olmayan acil durum. |
| lx:Mietvertrag | ö5, boşluk 4 | Herr Pichler hat eine Kopie vom Mietvertrag → **Der Vermieter** … | Pichler apartman görevlisi. Kira sözleşmesinin kopyası ev sahibinde olur. |
| lx:Bewerbung | ö5 | Ioana schickt ihre Bewerbung → **Meine Nachbarin** … | Ioana'nın işi WORLD'de tanımlı değil, iş aradığı da yazmıyor. |
| lx:Vorstellungsgespräch | ö5 | übt Ioana ihre Antworten → übt **meine Freundin** ihre Antworten | Aynı gerekçe. |
| lx:Friseurin | ö5 | Im Salon Haarwerk arbeiten Luka und zwei Friseurinnen → In dem Salon arbeiten ein Friseur und zwei Friseurinnen | Salon Haarwerk'e WORLD'de olmayan iki çalışan ekleniyordu. Yeni cümle iki biçimi yan yana da gösteriyor. |
| lx:Mitgliedschaft | boşluk 6 | Ioana hat zwei …, im Fitnessstudio und im Schwimmbad → Meine Kollegin hat zwei …, im Fitnessstudio und in einem Verein | Ioana'ya ayrıntı ekleniyordu. Ayrıca yüzme havuzunda üyelik olmaz, kart alınır. |

Gündelik, iz bırakmayan satırlar kaldı: Pichler'in çöp bidonu ve musluk işleri, Brandl'ın mektubu ve alışverişi, Tobi'nin paketi, taksisi ve saç kesimi, Derya ve Tobi'nin bir günlük hastalık bildirimi, Ioana'nın ceket ve kazak değişimi, Basti'nin VilsFit üyeliği (WORLD'de zaten müdavim).

### Öğrencinin ağzında sabit cinsiyet (D-061)

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Bewerbung | ö1 | Ich schreibe heute eine Bewerbung als Verkäuferin → **Meine Freundin schreibt** … | Birinci kişi cümlesi öğrenciye kadın meslek adı veriyordu. |
| lx:Bewerbung | boşluk 6 | Ich schreibe eine Bewerbung ___ Fahrer → **Er schreibt** … | Aynı gerekçe, erkek biçimiyle. |
| lx:Empfänger | ö4 | Nein, ich bin der Nachbar, aber ich nehme das Paket → Nein, aber ich nehme das Paket für meinen Nachbarn | Öğrencinin söyleyeceği satırda **der Nachbar** sabitti. Yeni cümle kapıda gerçekten söylenen biçim. |

### Almanca ve gerçeklik

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Kündigung | ö5, boşluk 6 | Für die Kündigung braucht das Fitnessstudio eine Unterschrift → Die Kündigung für das Fitnessstudio schicke ich per E-Mail | 1 Ekim 2016'dan sonra yapılan tüketici sözleşmelerinde şirket imzalı yazı isteyemez, e-posta yeter (Verbraucherzentrale). Eski cümle öğrenciye yanlış bir zorunluluk öğretiyordu. Kira ve iş sözleşmesinde imza hâlâ şart, bu yüzden **eine schriftliche Kündigung** kalıbı kaldı. |
| lx:Kündigung | boşluk 5 | Im Januar gibt es im Fitnessstudio viele … → Die Firma hat diese Woche drei … bekommen | Ocak, salonlara kayıt ayıdır. Cümle gerçeğe ters düşüyordu. |
| lx:färben | ö4 | Möchten Sie die Haare nur schneiden? → Heute nur schneiden? | Eski soru müşterinin saçı kendisinin keseceğini söylüyordu. Kuaförde duyulan biçim kısa sorudur. |
| lx:färben | ö6 | Nee, die ist gefärbt → Nee, die Haare sind gefärbt | **die** saç rengine gidiyordu. Boyanan renk değil, saçtır. |
| lx:färben | boşluk 5 | Die Haare sind nicht echt, sie sind … → Die Haarfarbe ist nicht echt, die Haare sind … | **Die Haare sind nicht echt** peruk demektir. |
| lx:Geräte | ö4 | Nein, ich bin gleich fertig → Ja, aber ich bin gleich fertig | Soru **hâlâ kullanıyor musunuz**. **Nein** ile **birazdan bitiriyorum** çelişiyordu. |
| lx:Probezeit | boşluk 5 | In der … lerne ich alles neu → In der … lerne ich viel Neues | **alles neu lernen** her şeyi baştan öğrenmek demek, cümle tuhaftı. |
| lx:umtauschen | hata notu 2 | Bir şeyi farklı yapmak **ändern**: **Ich ändere den Termin** → Randevu için **verschieben**: **Ich möchte den Termin verschieben** | Randevu için söylenen fiil **verschieben**. |
| lx:IBAN | ö4 | Können Sie die IBAN bitte langsam wiederholen? → … bitte noch mal langsam sagen? | Karta bağlı `pt:noch-mal` kalıbını hiçbir örnek göstermiyordu. Telefonda en çok söylenen biçim de bu. |

### Boşluklar

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Kassenbon | boşluk 6 | Ich brauche den Kassenbon ___. (nicht) → Den ___ brauche ich nicht, danke. (Kassenbon, Bon) | PM-069: **nicht** kartın kelimesi de eşdizim parçası da değil. |
| lx:Mitgliedschaft | boşluk 5 | Ich möchte Mitglied ___. (werden) → Ein Probetraining geht auch ohne ___. (Mitgliedschaft) | PM-069: **werden** eşdizim listesinde yok. **Mitglied werden** hata notunda ve ipucunda duruyor. |
| lx:Vorstellungsgespräch | boşluk 1–5 | `also_ok` yok → `Bewerbungsgespräch`, `Bewerbungsgespräche` | Tam eş anlamlı, aynı artikel, çok yaygın. Haksız ret riski. |
| lx:Einkaufswagen | boşluk 1–6 | `also_ok` yok → `Wagen`; boşluk 5'te ayrıca `Einkaufswägen` | Markette kısaca **Wagen** denir. Duden: çoğul **die Wagen**, güneyde **Wägen**. Öğrenci Bavyera'da bu çoğulu duyar; yalnız kabul edilir, öğretilmez. |
| lx:zustellen | boşluk 2, 3, 4 | `also_ok` yok → `geliefert`, `liefern`, `geliefert` | Türkçe çeviri **teslim etmek**; **liefern** aynı çevirinin doğru karşılığı. |
| lx:Friseurin | boşluk 1–6 | `also_ok` yok → `Frisörin`, `Frisörinnen` | Geçerli yazım varyantı. lx:Friseur kartı da **Frisör** kabul ediyor. |
| lx:umtauschen | boşluk 1, 4 | `also_ok` yok → `tauschen` | **gegen eine größere tauschen** de doğru. |
| lx:Probezeit | boşluk 6 | `also_ok` yok → `meiner` | **in meiner Probezeit** aynı çeviriyle doğru. |
| lx:Vertrag | boşluk 5 | `also_ok` yok → `beenden` | **den Vertrag beenden** aynı çeviriyle doğru. |

### Türkçe ve açıklama

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Mülltonne | exp.ipucu | **die Tonne** da denir → **die Tonne** de denir | Ses uyumu. |
| lx:Rettungswagen | exp.ipucu | **Krankenwagen** da denir → **Krankenwagen** de denir | Ses uyumu. |
| lx:Mülltonne | ö3 tr | hemen bir dışarı çıkarabilir misin → hemen dışarı çıkarabilir misin | **hemen bir** Türkçede yan yana durmuyor. |
| lx:Packstation | ö5 tr | paket otomatına sipariş ediyor → paket otomatına yollatıyor | **Otomata sipariş etmek** Türkçe değil. |
| lx:Packstation | ö6 tr | birazdan giderim → sonra giderim | **nachher** sonra demek. |
| lx:Vorstellungsgespräch | coll 1 tr | iş görüşmesi olmak → iş görüşmesine girmek | İlki Türkçede yarım kalıyor. |
| lx:Vorstellungsgespräch | exp.parcalar | tanıtma, konuşması → tanışma, görüşmesi | **tanıtma konuşması** sunum gibi okunuyor. |
| lx:Quittung | exp.ne_zaman | Taksiden, ustadan ya da iş için harcama yapınca → Takside, ustaya ya da iş için ödeme yapınca | Cümlenin ekleri birbirini tutmuyordu. |
| lx:IBAN | exp.ipucu | Alman hesaplarında **IBAN** her zaman **DE** ile başlar → Almanya'daki hesaplarda **IBAN** hep **DE** ile başlar | Ülke kodu hesabın ülkesine bağlı, sahibinin uyruğuna değil (Bundesbank). |
| lx:IBAN | coll 2 tr | IBAN'ı yazmak → IBAN'ı bildirmek | **angeben** yalnız yazmak değil. |
| lx:Vertrag | ö4 tr | Şurayı, sözleşmenin son sayfasının altını → Şuraya, aşağıya, sözleşmenin son sayfasına | Türkçesi dolaşıktı. |
| lx:Anzeige | coll 3 tr | faili belli olmayan suç duyurusu → kimliği bilinmeyen kişi hakkında suç duyurusu | Belli olmayan duyuru değil, kişi. |
| lx:Anzeige | exp.ne_zaman | Hırsızlıktan ya da kazadan sonra → Hırsızlık ya da başka bir suçtan sonra | Kazada suç duyurusu yapılmaz, polis kazayı kaydeder. |

## Lex kararları: değerlendirme

| Karar | Sonuç |
|---|---|
| lx:Geräte, çoğul kimlik (`art: "die"`) | **Kabul.** lx:Eltern ve lx:Kopfschmerzen ile aynı kodlama. Kart tek alet ile çok alet farkını hata notunda, ipucunda ve boşluk ipuçlarında söylüyor. Not: `related` içindeki lx:Gerät yalnız `lexemes.v1.json` içinde var, derin kartı yok. O kart yazılınca iki kartın örnekleri çakışmamalı. |
| lx:krankmelden, `de: "sich krankmelden"` | **Kabul.** lx:sich_beschweren ile aynı düzen. Fiil biçimleri doğru: **meldet sich krank**, **hat sich krankgemeldet**. |
| lx:Anzeige, polise suç duyurusu | **Kabul.** Alan `notfall`; ilan anlamı ipucunda. Hata notu Türkçe **şikâyet** ile **sich beschweren** karışıklığını doğru yakalıyor. |
| lx:Umtausch, çoğul **Umtausche** | **Doğru.** Duden: **die Umtausche** ve **Umtäusche**. Çoğul boşluğu yok, yerinde. |
| Kurgusal kuaför **Elif** | **Kabul.** WORLD kuralı kalıcı karakterlere ayrıntı eklemeyi yasaklıyor, adlı yan kişiyi değil. Elif hiçbir WORLD mekânına bağlanmıyor. Salon Haarwerk'e bağlayan tek cümle (ö5) düzeltildi. |

## Olgusal iddialar ve SOURCES.md

| İddia | Sonuç | Açılan sayfa |
|---|---|---|
| Acil numara 112, ambulans için de geçerli (lx:Rettungswagen) | Doğrulandı: 112 itfaiye ve kurtarma hizmeti, 110 polis. | [Bundesregierung](https://www.bundesregierung.de/breg-de/aktuelles/notrufnummer-50-jahre-2224394) |
| IBAN ülke koduyla başlar, Almanya'da **DE** (lx:IBAN) | Doğrulandı: Almanya'da 22 hane, ilk iki hane ülke kodu **DE**. SOURCES satırındaki Wikipedia adresi açılamadı (izin isteği yanıtsız kaldı). | [Bundesbank](https://www.bundesbank.de/de/aufgaben/unbarer-zahlungsverkehr/serviceangebot/iban-regeln) |
| **die IBAN**, çoğul **IBANs** | Doğrulandı. | [Duden](https://www.duden.de/rechtschreibung/IBAN) |
| Çoğul **Umtausche** | Doğrulandı. | [Duden](https://www.duden.de/rechtschreibung/Umtausch) |
| Çoğul **Wagen**, güneyde **Wägen** | Doğrulandı. | [Duden](https://www.duden.de/rechtschreibung/Wagen) |
| Spor salonu feshinde imza gerekmez | Doğrulandı; kart buna göre düzeltildi. | [Verbraucherzentrale NRW](https://www.verbraucherzentrale.nrw/wissen/vertraege-reklamation/kundenrechte/kuendigung-per-email-darauf-sollten-sie-achten-13132) |

Deneme süresi için kartta genel bir kural yok: **üç ay** ve **bei uns sechs Monate** yalnız örnek, ikisi de yasal sınırın içinde. Fesih için de kural cümlesi yok. Duden sayfaları ve Bundesregierung ilk denemede izin isteğine takıldı, aynı adresler aramada çıkınca açıldı. Sayfalar getirme aracının özeti ve kısa alıntılarıyla okundu.

SOURCES.md dilbilimcinin yazma yolunda değil. BM için öneri:

| Bilgi | Kartlar | Kaynak |
|---|---|---|
| IBAN ülke koduyla başlar; Almanya'daki hesaplarda **DE**, 22 hane | lx:IBAN | https://www.bundesbank.de/de/aufgaben/unbarer-zahlungsverkehr/serviceangebot/iban-regeln (Wikipedia satırının yerine; "dilbilimci doğrulamalı" notu kalkar) |
| Tüketici sözleşmesi e-postayla feshedilir; kira ve iş sözleşmesinde imza şart | lx:Kündigung | https://www.verbraucherzentrale.nrw/wissen/vertraege-reklamation/kundenrechte/kuendigung-per-email-darauf-sollten-sie-achten-13132 |

## Diğer denetimler

- **Bairisch, güney biçimi:** yok. **Geldbeutel** (lx:Quittung ö6, lx:Anzeige ö4) standart Almancadır, güneyde yaygındır; kaldı. **Einkaufswägen** yalnız `also_ok` içinde.
- **Kişisel bilgi, kurs ya da kitap adı:** yok. **Packstation** bir marka adı ama gündelik dilde tür adı gibi kullanılıyor; kaldı.
- **İngilizce köprü:** yok.
- **OD-9:** `exp` alanları ve ipuçları terimsiz, tek fikirli, sınırların içinde. Doğrulayıcı bu parti için OD-9 uyarısı vermiyor.
- **Fiil biçimleri:** zustellen, sich krankmelden, umtauschen, färben; dördü de doğru. Artikel ve çoğullar: 28 isimde hata yok.

## Kalan şüpheler

1. **`review.status` (BM):** görev `reviewed` yazmamı ve `okur` alanı koymamamı istedi. Doğrulayıcı bu ikisini birlikte kabul etmiyor: `"reviewed" ama okur kontrolü geçmemiş (OD-9.4)` hatası veriyor (denendi, 1 hata). 0 hata şartı ve OD-9.4 için batch-015'teki düzen uygulandı: `status: "draft"`, `by`, `at`, `notes`. Okur geçince `reviewed` + `okur: "passed"` yazılır.
2. **Kalıp bağları (BM ya da lex):** bazı `patterns` bağlarını kartın hiçbir örneği göstermiyor: lx:Mietvertrag `pt:ich-brauche`, lx:Arbeitsunfall `pt:ich-muss`, lx:Anzeige `pt:ich-muss`, lx:Friseurin `pt:ich-finde` (örnekteki **gefunden** başka fiil). Bağlar anlamca kurulabilir (**Ich brauche den Mietvertrag**), bu yüzden dokunulmadı. Bağın örnekle desteklenmesi şartsa dört bağ değişmeli.
3. **Seviye:** `level` bir listeyle karşılaştırılmadı. lx:Vorstellungsgespräch ve lx:Arbeitsunfall A2 için yüksek görünüyor.
4. **Örneklerdeki ek kelimeler:** Mappe, Karton, Wasserkocher, Stecker, Postbote, Kiste, Korb, Probetraining derin kart değil. Her biri tek cümlede, çevirisiyle geçiyor; cümle başına en çok bir tane. Dokunulmadı.
5. **Uygulamada sorulmayan boşluklar:** lx:krankmelden boşluklarının beşi (melde, meldet, krankgemeldet, mich, krank) kartın kendi alanlarıyla `cevapGosterildi` kuralından geçmiyor, çünkü eşdizimlerin hepsi mastar. Başka kartlar bu kelimeleri göstermediyse uygulama bunları sormaz, **krankmelden** boşluğuna düşer. İçerik doğru; karar BM'de.
6. **lx:Wasserhahn boşluk 6:** **Mach den Wasserhahn aus** konuşmada duyulur. Standart değil diye `also_ok` içine alınmadı.

## Sonuç

**AÇIK** (yalnız okur kapısı). Dil, gerçeklik ve WORLD hataları dosyada kapandı; `content:validate` 0 hata. `reviewed` için kalan tek adım okur kontrolü (OD-9.4).
