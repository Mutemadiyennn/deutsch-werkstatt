# lexicon-batch-013: dilbilimci incelemesi

- Tarih: 2026-11-18 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-013.view.jsonl` (yazar yaması uygulanmış) · Yama: `cm/work/batch-013.dil.json`
- İncelenen kart: **100** (her kartın bütün alanları, 400 örnek)
- Düzeltilen kart: **39** · alan düzeyinde düzeltme: **69**
- Hata oranı: **39/100 kart** (0,39)
- Ağır hata 19 kartta: yanlış ya da eksik olgu (lx:Jobcenter, lx:Aufenthaltstitel, lx:Meldebescheinigung, lx:Bereitschaftsdienst, lx:verlängern, lx:Krankmeldung), yanlış çoğul (lx:Durchfall, lx:Blutdruck, lx:Übelkeit, lx:Silvester), doğru cümleyi yanlış gösteren hata notu (lx:Berg, lx:Rezeption, lx:Schwindel, lx:Schimmel, lx:Dolmetscher), öğrenciye sabit soyadı ya da cinsiyet veren satır (lx:Familienname, lx:Patientin), yanıltıcı çip (lx:Kindergarten, lx:Aufenthaltstitel, lx:Hausmeister).
- `lintpatch.ts`: kart 39, sorunlu 0.
- `check.ts` (yama uygulanmış geçici kopya): kart 100, sorunlu 0.
- `content:validate` (aynı geçici kopya): **0 hata**, 101 uyarı. Depodaki parti dosyasına yazılmadı.
- `review.status` `draft` kalır.

## Hatalar

### Olgusal bilgi

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Bereitschaftsdienst | exp.ne_zaman | Akşam ve hafta sonu doktor gerekince → Muayenehane kapalıyken, durum acil ama hayati değilse | Hizmet hayati tehlikesi olmayan hastalar içindir. Eski metin ağır durumda da 116 117 aratabilirdi. |
| lx:Bereitschaftsdienst | exp.ipucu | **116 117** ararsın → Numarası **116 117**, hayati tehlikede ise **112** ararsın | KV Baden-Württemberg ve gesund.bund.de: hayati tehlikede 112. |
| lx:Jobcenter | tr | iş arayanlara bakan daire → iş ve geçim desteği dairesi | Jobcenter, geçimini sağlayamayan çalışabilir kişilerin temel güvencesini yürütür. Her iş arayanın dairesi değildir. |
| lx:Jobcenter | exp.anlam, exp.ne_zaman | İş arayanların gittiği resmî daire · İş ararken → Geçimini sağlayamayan iş arayanlara destek veren resmî daire · Geçim desteği başvurusunda ve ondan mektup gelince | Aynı gerekçe (betanet). |
| lx:Aufenthaltstitel | exp.ipucu | Konuşmada **Aufenthaltserlaubnis** da duyarsın → Türlerinden biri **Aufenthaltserlaubnis**, yani süreli oturma izni | § 4 AufenthG: Aufenthaltstitel üst addır. § 7: Aufenthaltserlaubnis süreli bir türdür. İkisi eş anlamlı değil. |
| lx:Meldebescheinigung | exp.ne_zaman | Banka ve resmî işlerde → Banka ya da bir şirket adresini belgelemeni isteyince | Resmî portal: belgeyi şirketler ister, kamu daireleri çoğunlukla istemez. |
| lx:verlängern | ö1, coll 1, mistakes_tr, görsel | **Pass verlängern** → **Aufenthaltserlaubnis verlängern**, hata notu **Vertrag** ile | Süresi dolan pasaport uzatılmaz, yenisi alınır. § 8 AufenthG oturma izninin uzatılmasını düzenler. |
| lx:Krankmeldung | coll 2, coll 3 | die Krankmeldung abgeben · eine Krankmeldung vom Arzt → eine Krankmeldung an den Chef · sich krankmelden | § 5 Abs. 1a EntgFG: yasal sigortalı, işverene doktor belgesi sunmakla yükümlü değil. Kalıp eski kâğıt düzenini öğretiyordu. |

### Almanca ve çoğul

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Durchfall | pl | - → Durchfälle | Duden çekim tablosu. Yazarın notu doğrulanmadı. |
| lx:Blutdruck | pl | - → Blutdrücke | Duden çekim tablosu (**Blutdrucke** de var). Yazarın notu doğrulanmadı. |
| lx:Übelkeit | pl | - → Übelkeiten | Duden çekim tablosu. |
| lx:Silvester | pl | - → Silvester | Duden: çoğul **die Silvester**. |
| lx:Familienname | ö4 | – Yılmaz, mit Ypsilon am Anfang. → – Moment, ich buchstabiere ihn Ihnen. | Öğrencinin söyleyebileceği satırda sabit soyadı vardı (D-061). |
| lx:Geburtsort | ö4 | Wendlfing, hier in Bayern. → Landshut. | Wendlfing'deki görevliye **hier in Bayern** denmez. |
| lx:Notruf | ö3 | Ruf den Notruf, schnell! → Schnell, ruf den Notruf an! | Kartın hata notundaki **anrufen** ile aynı biçim. |
| lx:um_…_zu | ö3 | frische Luft zu kriegen → frische Luft zu schnappen | Kalıp **frische Luft schnappen**. |

### `mistakes_tr`

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Berg | **Wir fahren zu den Bergen** → **Wir fahren nach Berge** | İlki dil bilgisi olarak doğru. Yenisi kesin yanlış. |
| lx:Rezeption | **in der Rezeption** → **Ich frage in Rezeption** | **in der Rezeption** doğru olabilir. Yenisi kesin yanlış. |
| lx:Schwindel | **Mein Kopf dreht sich** → **Ich bin schwindelig** | İlki Almancada söylenebilir. Yenisi, **Mir ist schwindelig** yerine kurulan gerçek hata. |
| lx:Schimmel | **In der Wand ist Schimmel** → **Im Bad gibt Schimmel** | İlki duvarın içinde anlamında doğru. Yenisi **var** kalıbından gelen gerçek hata. |
| lx:Dolmetscher | **Übersetzer** yanlış → **Ich brauche Dolmetscher** yanlış | Yazarın şüphesi doğru: kartın ö4'ü **übersetzen** kullanıyor. Fark ipucuna taşındı. |
| lx:Patientin | **Ich bin Patientin** → **Meine Mutter ist Patientin** | Öğrencinin ağzından sabit cinsiyet kalktı. |
| lx:Allergie | Fındığa → Fındık fıstığa | **Nüsse** yalnız fındık değildir, kartın kalıbıyla da uyumlu. |
| lx:geboren | **Ich habe geboren** → **Ich habe hier geboren**, doğrusu **Ich bin hier geboren** | Doğru biçim tek başına yarım kalıyordu. |
| lx:Jobcenter | Bu daireye → Jobcenter dairesine | Hangi daire olduğu belirsizdi. |

### `exp.parcalar`

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Kindergarten | Kinder: çocuk, garten: bahçesi → boş | **çocuk bahçesi** Türkçede oyun alanıdır, anaokulu değil. |
| lx:Feuerwehr | Feuer: yangın, wehr: savunması → boş | **yangın savunması** itfaiye anlamını vermiyor. |
| lx:Hausmeister | Haus: bina, meister: ustası → boş | **bina ustası** inşaat ustası gibi okunuyor. |
| lx:Lebenslauf | Lebens: hayat, lauf: akışı → boş | **hayat akışı** özgeçmiş anlamını vermiyor. |
| lx:Aufenthaltstitel | Aufenthalts: oturma, titel: izni → boş | **Titel** izin demek değil; çip yanlış kelime öğretiyordu. |

### Türkçe, açıklama ve görsel

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Halsschmerzen, lx:Kopfschmerzen, lx:Bauchschmerzen, lx:Rückenschmerzen | exp.ipucu | **… weh** da dersin → **… weh** diyebilirsin | Ses uyumu. |
| lx:Übelkeit | exp.ipucu | **Mir ist schlecht** da dersin → **Mir ist schlecht** diyebilirsin, yani midem bulanıyor | Ses uyumu. |
| lx:Familienname | exp.ipucu | **Nachname** da → **Nachname** de | Ses uyumu. |
| lx:Dolmetscher | exp.ipucu | Kadın tercüman notu → Yazılı metni çeviren kişiye ise **Übersetzer** denir | wissen.de ve Duden: **Dolmetscher** sözlü çevirir. Öğrenciye daha gerekli fark. |
| lx:Keine_Sorge! | exp.ne_zaman | **du** ve **Sie** ile → sen ya da siz diye konuştuğun fark etmez | Kalın ifade Türkçesiz kalıyordu. |
| lx:Übelkeit | ö3 tr | Çok kötüyüm, mide bulantım geçmiyor → Midem çok bulanıyor, bir türlü geçmiyor | **Mir ist schlecht** burada bulantıdır. |
| lx:Bankkarte | coll 2, ö3 tr | iptal ettirmek → bloke ettirmek | **sperren** kartı kapatır, iptal etmek değildir. |
| lx:Vorsatz | coll 1 | iyi niyetler → güzel kararlar | **iyi niyet** başka anlamdadır. |
| lx:kündigen | coll 2, ö2 tr | ev sözleşmesi → kira sözleşmesi | Doğal terim. |
| lx:Lieferung | ö2 tr | 50 avrodan sonra → 50 avro ve üzeri siparişte | **ab 50 Euro** tutarı söyler, zamanı değil. |
| lx:Lieferung | ö3 tr | ciddi misin → şaka gibi | Cümlede hitap edilen kişi yok. |
| lx:Behörde | ö1, ö2, ö4 tr, coll 3 | daire → resmî daire | **daire** ev gibi okunuyordu (012 kararı). |
| lx:Jobcenter | coll 1-3 | bu daire → Jobcenter dairesi | Kalıp tek başına okununca anlaşılmıyordu. |
| lx:Wartenummer | coll 3 | mit der Wartenummer warten → die Wartenummer erscheint | İlki doğal bir kalıp değil. |
| lx:Allergie | görsel | ö1 → ö2 | Çiçek fotoğrafı penisilin cümlesindeydi. |
| lx:Keine_Sorge! | görsel | ö1 → ö2 | Teselli fotoğrafı paket cümlesindeydi. |
| lx:sich_beschweren | görsel | ö1 → ö2 | Tezgâh fotoğrafı komşu cümlesindeydi. |
| lx:auflegen | görsel | ö1 → ö2 | Kapatma fotoğrafı **kapatmayın** cümlesindeydi. |
| lx:Übelkeit | görsel | ö1 → ö2 | Kanepedeki hasta, eczane sorusuna uymuyordu. |
| lx:Durchfall | görsel | ö1 → ö2 | Eczane rafı, ilaç soran cümleye uyuyor. |

## SOURCES.md yeni satırları: doğrulama

| Satır | Sonuç | Açılan sayfa |
|---|---|---|
| 110 polis, 112 itfaiye ve ambulans | Doğrulandı | [Bundesregierung](https://www.bundesregierung.de/breg-de/aktuelles/notrufnummer-50-jahre-2224394) · [München](https://stadt.muenchen.de/infos/notruf.html) |
| 116 117, muayene saatleri dışında nöbetçi doktor | Doğrulandı. Sayfa hizmetin hayati tehlikesi olmayanlar için olduğunu da söylüyor; kart buna göre düzeltildi. | [KV Baden-Württemberg](https://www.kvbawue.de/kvbw/aktuelles/news-artikel/verbesserter-service-bei-zentraler-rufnummer-116117) |
| Hastalık işverene gecikmeden bildirilir | Doğrulandı (§ 5 Abs. 1 Satz 1). Abs. 1a yüzünden lx:Krankmeldung kalıpları değişti. | [buzer](https://www.buzer.de/5_EntgFG.htm) |
| Kaution ve Pfand | Doğrulandı | [Kaution](https://www.duden.de/rechtschreibung/Kaution) · [Pfand](https://www.duden.de/rechtschreibung/Pfand) |
| **die Kasse**, konuşmada Krankenkasse | Doğrulandı (5.2, umgangssprachlich) | [Kasse](https://www.duden.de/rechtschreibung/Kasse) |
| Silvester 31 Aralık | Doğrulandı. Satır yalnız WORLD gösteriyor, Duden eklenmeli. | [Duden](https://www.duden.de/rechtschreibung/Silvester_Tag) |

Bundesregierung, München, KV Baden-Württemberg ve buzer ilk denemede izin listesine takıldı. Aynı adresler aramada çıkınca açıldı. Sayfalar getirme aracının özeti ve kısa alıntılarıyla okundu.

## Yazarın notları: doğrulama

| Not | Sonuç |
|---|---|
| lx:Tropfen, **der** ve çoğul **Tropfen** | Doğru, değişmedi. |
| Durchfall ve Blutdruck çoğulu **-** | Yanlış, düzeltildi. Aynı sorun lx:Übelkeit ve lx:Silvester kartında da vardı. lx:Schimmel (küf anlamında çoğul yok) ve lx:Schwindel **-** kaldı. |
| Kaynaksız tanımlar | Beşi de açıldı. Ausländerbehörde ve Bürgerbüro doğru. Aufenthaltstitel, Meldebescheinigung ve Jobcenter düzeltildi. |
| lx:Diebstahl, DN-4 | Sorun yok: yalnız eşyanın çalındığını bildiriyor, suç ayrıntısı yok. |
| Bereitschafts\|dienst, Warte\|nummer | Kaldı: **nöbet hizmeti** ve **bekleme numarası** anlamı veriyor. lx:Dienst kartında **nöbet** anlamı da var. |
| Feuer\|wehr, Aufenthalts\|titel | Boşaltıldı. |
| Dolmetscher, Übersetzer notu | Yazar haklı, hata notu değişti. |

## SOURCES.md için önerilen satırlar

SOURCES.md dilbilimcinin yazma yolunda değil, BM ekler:

| Bilgi | Kartlar | Kaynak |
|---|---|---|
| 116 117 hayati tehlike dışındaki durumlar içindir, hayati tehlikede 112 | lx:Bereitschaftsdienst | https://www.kvbawue.de/buerger/notfallpraxen/116-117/ · https://gesund.bund.de/notfallnummern |
| Ausländerbehörde, oturma ve pasaport hukuku işlerine bakar | lx:Ausländerbehörde | § 71 AufenthG: https://www.gesetze-im-internet.de/aufenthg_2004/__71.html |
| Aufenthaltstitel üst addır, Aufenthaltserlaubnis süreli türüdür ve uzatılabilir | lx:Aufenthaltstitel, lx:verlängern | § 4: https://www.gesetze-im-internet.de/aufenthg_2004/__4.html · § 7: https://www.gesetze-im-internet.de/aufenthg_2004/__7.html · § 8: https://www.gesetze-im-internet.de/aufenthg_2004/__8.html |
| Bürgerbüro, adres kaydı ve Meldebescheinigung işlerine bakar | lx:Bürgerbüro, lx:Meldebescheinigung | https://stadt.muenchen.de/service/info/hauptabteilung-ii-buergerangelegenheiten/1063480/ · https://stadt.muenchen.de/service/info/hauptabteilung-ii-buergerangelegenheiten-buergerbuero-ruppertstrasse/1063580/ · https://stuttgart.de/buergerbueros/ |
| Meldebescheinigung adresi kanıtlar, çoğunlukla şirketler ister | lx:Meldebescheinigung | https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115009001000/herausgeber/BE-L100108_120702/region/11 |
| Jobcenter, geçimini sağlayamayan çalışabilir kişilere bakar | lx:Jobcenter | https://www.betanet.de/jobcenter.html |
| Dolmetscher sözlü, Übersetzer yazılı çevirir | lx:Dolmetscher | https://www.duden.de/rechtschreibung/Dolmetscher · https://wissen.de/artikel/dolmetscher-in-oder-uebersetzer-in |
| Silvester, 31 Aralık | lx:Silvester | https://www.duden.de/rechtschreibung/Silvester_Tag |

## Doğrulamada açılan diğer kaynaklar

- Çoğullar: https://www.duden.de/deklination/substantive/Durchfall · https://www.duden.de/deklination/substantive/Blutdruck · https://www.duden.de/deklination/substantive/Uebelkeit · https://www.duden.de/rechtschreibung/Schimmel · https://www.duden.de/deklination/substantive/Schwindel
- Süresi dolan pasaport uzatılmaz (ikincil kaynak; bilgi karta yazılmadı, yalnız pasaport örneği çıkarıldı): https://www.bussgeldkatalog.org/reisepass-abgelaufen/

## Kalan şüpheler

1. **SOURCES satırları (BM):** yukarıdaki satırlar eklenene kadar lx:Bereitschaftsdienst, lx:Ausländerbehörde, lx:Aufenthaltstitel, lx:verlängern, lx:Bürgerbüro, lx:Meldebescheinigung, lx:Jobcenter, lx:Dolmetscher ve lx:Silvester için kaynak kaydı eksik.
2. **Yer tutucu (BM):** lx:Patientin ö4 ve lx:Nachbarin ö1 yer tutucu içeriyor. `showText` yalnızca `Player.tsx` içinde kullanılıyor. Sözlük örneklerini gösterecek ekran bunu kullanmazsa süslü parantez öğrenciye çıkar (012 raporundaki konu).
3. **Seviye (BM):** `level` değerleri bir seviye listesiyle karşılaştırılmadı, değiştirilmedi. v1'de B1 olan 9 kartın A2 yapılması doğrulanmadı. lx:Aufenthaltstitel ve lx:Nebenwirkung A2 için yüksek görünüyor.

## Sonuç

**AÇIK.** Dil ve olgu hataları yamada kapandı. Açık kalan üç madde BM işidir. Yama uygulanıp depoda `content:validate` 0 hata verene ve SOURCES satırları eklenene kadar `review.status` `draft` kalmalı.
