# lexicon-batch-012: dilbilimci incelemesi

- Tarih: 2026-11-18 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-012.view.jsonl` (yazar yaması uygulanmış) · Yama: `cm/work/batch-012.dil.json`
- İncelenen kart: **100** (her kartın bütün alanları, 400 örnek)
- Düzeltilen kart: **36** · alan düzeyinde düzeltme: **49**
- Hata oranı: **36/100 kart** (0,36)
- Ağır hata 19 kartta: doğru cümleyi yanlış gösteren ya da Türkçeden gelmeyen hata notu (lx:Käse, lx:Beruf, lx:Heizung, lx:Waschmaschine, lx:geöffnet, lx:Regal, lx:Müll, lx:Abitur, lx:Fitnessstudio), yanlış ya da eksik bilgi (lx:Rock, lx:Miete, lx:Apotheke, lx:Käse çoğulu), kusurlu cümle (lx:Hunger), öğrenciye iş yazan satır (lx:Beruf, lx:Kellner), yanıltıcı çip (lx:auspacken, lx:losfahren, lx:sich_verstehen, lx:sich_trennen, lx:Hausordnung).
- `lintpatch.ts`: kart 36, sorunlu 0.
- `check.ts` (yama uygulanmış geçici kopya): kart 100, sorunlu 0.
- `content:validate` (aynı geçici kopya): **0 hata**, 101 uyarı. Depodaki parti dosyasına yazılmadı.
- `review.status` `draft` kalır.

## Hatalar

### Almanca, anlam ve dünya

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Käse | pl | - → Käse | Duden çekim tablosu: çoğul **die Käse**. Yazarın notu doğru çıktı. |
| lx:Beruf | ö4 | Ich bin {Techniker\|Technikerin}. → Was sind Sie von Beruf, Frau Stadler? – Ich bin Bäckerin. | Yer tutucu satırı öğrencinin satırı yapıyor ve ona meslek veriyordu. WORLD §2: öğrencinin işi genel kalır. Frau Stadler WORLD §3 fırıncısı. |
| lx:Kellner | ö2 | Am Wochenende arbeite ich als {Kellner\|Kellnerin}. → Mein Nachbar arbeitet am Wochenende als Kellner. | Aynı gerekçe. |
| lx:Hunger | ö1 | …nichts gegessen und großen Hunger → Seit heute Morgen habe ich nichts gegessen, ich habe großen Hunger. | Tek **habe** iki ayrı görevde kullanılmıştı, cümle kusurlu. |
| lx:sich_bewegen | ö1 | jeden Tag mehr bewegen → jeden Tag etwas bewegen | **jeden Tag mehr** her gün bir öncekinden fazla diye okunuyordu. Türkçesi de güncellendi. |
| lx:abbiegen | ö3 | …, ne? → …, oder? | **ne** kuzey ağırlıklı (009, 010, 011 kararı). |
| lx:Überstunde | ö4 | am Ende vom Monat → am Monatsende | Örnek `hd` katmanında; **vom Monat** gündelik kalıyordu. |
| lx:Rock | exp.anlam | belden aşağı giyilen giysidir → belden aşağı giyilen, paçası olmayan giysidir | Eski tanım pantolona da uyuyordu. |
| lx:Miete | exp.ipucu | Isıtma giderleri dahil kira → Isınma ve diğer yan giderler dahil kira | Duden: Warmmiete, ısıtma **ve diğer** yan giderleri kapsar. |
| lx:Apotheke | exp.ipucu | **Apotheke im Notdienst** → **Notdienstapotheke** | aponet ve Apotheken Umschau bu biçimi kullanıyor; eski ifade aponet sayfasında geçmiyor. |
| lx:Straßenbahn | exp.ipucu | Konuşmada kısaca **Tram** de denir → Güneyde kısaca **Tram** da denir | Duden: süddeutsch. **de** ses uyumuna da aykırıydı. |
| lx:Wand | exp.ipucu | dış duvara **Mauer** → tek başına duran duvara **Mauer** | Evin dış duvarı da **Wand** olabilir (**Außenwand**). |
| lx:warten_(auf) | exp.anlam | birinin gelmesini → birinin ya da bir şeyin gelmesini | ö1 otobüs bekliyor. |

### `mistakes_tr`

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:geöffnet | **Sind Sie heute geöffnet?** yanlış → **Die Bäckerei ist öffnet** yanlış | Kartın ö2'si **ist … geöffnet** kuruyor. Yanlış olduğunu gösteren kaynak yok. |
| lx:Regal | **Das Buch ist auf dem Regal** → **Ich stelle das Buch im Regal** | İlki rafın üstünde anlamında doğru. Yenisi kesin yanlış, doğrusu **ins Regal**. |
| lx:Käse | **Ich mag den Käse** → **Ich kaufe ein Käse** | İlki doğru bir cümle. |
| lx:Heizung | **Die Heizung arbeitet nicht** çıkarıldı | Duden, arbeiten 5: **in Betrieb sein**, örnek **die Maschine arbeitet**. Yanlış denemez. |
| lx:Waschmaschine | **Ich öffne die Waschmaschine** → **Wäschemaschine** | İlki kapağı açmak için doğru, **çalıştırıyorum** ile de bağı yoktu. Yenisi **Wäsche** kelimesinden gelen gerçek hata. |
| lx:Müll | **Ich mache den Müll raus** → **Ich werfe das Müll** | İlkinin yanlış olduğu doğrulanamadı ve Türkçeden gelmiyor. Yenisi **çöpe atmak** kalıbından. |
| lx:Beruf | **Er ist ein Koch von Beruf** → **Was bist du Beruf?** | Yeni hata kesin yanlış ve **von** noktasını gösteriyor. |
| lx:Abitur | **Ich nehme Abitur** → **Ich habe das Abitur beendet** | Türkçe **liseyi bitirdim** kalıbından gelen hata. |
| lx:Fitnessstudio | Spor yapıyorum → Spor salonuna gidiyorum · **Ich mache Fitnessstudio** → **Ich gehe zu Fitnessstudio** | Türkçe cümle ile verilen doğru Almanca örtüşmüyordu. |
| lx:Verein | **Ich bin ein Verein** → **Ich bin in einen Verein** | Öğrencinin gerçekten kuracağı biçim. |
| lx:Speisekarte | **Menü** açıklaması eklendi | Duden: birkaç çeşitten oluşan yemek. Hata notu böylece gerekçeli. |
| lx:ausfüllen | **Ich habe ausgefüllen** → **Ich habe das Formular ausgefüllen** | Doğru biçim nesnesiz yarım kalıyordu. |
| lx:anprobieren | **Ich habe angeprobiert** → **Ich habe die Jacke angeprobiert** | Aynı gerekçe. |
| lx:sich_freuen_(auf/über) | bekliyorum → dört gözle bekliyorum | **warten** ile karışmasın. |
| lx:sich_trennen | **Ich habe mich aus meinem Freund** → **Sie hat sich aus ihrem Freund** | Öğrencinin ağzından özel hayat ve cinsiyet varsayımı kalktı. Kartın ö2'si ile aynı. |

### `exp.parcalar`

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:auspacken | aus: içinden, packen: çıkarmak → boş | lx:packen **paketlemek**. **çıkarmak** kelimenin anlamı değil. |
| lx:losfahren | los: yola, fahren: çıkmak → boş | lx:los **hadi**, lx:fahren **gitmek**. Doğru çipler anlamı vermiyor. |
| lx:sich_verstehen | sich: birbiriyle, verstehen: anlaşmak → sich: birbirini, verstehen: anlamak | lx:verstehen **anlamak**; okunuş anlamı veriyor. |
| lx:sich_trennen | sich: birbirinden, trennen: ayrılmak → sich: kendini, trennen: ayırmak | lx:Müll kartındaki **den Müll trennen** de **ayırmak**. |
| lx:Hausordnung | Haus: apartman → Haus: bina | lx:Haus **ev, bina** (010 kararı). |

### Türkçe, açıklama ve görsel

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Speisekarte | exp.ipucu | **die Karte** da → **die Karte** de | Ses uyumu. |
| lx:Heizung | exp.ne_zaman | görevlisini ararken → görevlisine telefon ederken | **ararken** iki türlü okunuyordu (011 kararı). |
| lx:ledig | exp.ne_zaman | formlarda ve dairede → formlarda ve resmî dairelerde | **daire** ev gibi okunuyordu. |
| lx:Wie_spät_ist_es? | ö4 tr | Birazdan → Neredeyse | **Gleich halb neun** saatin neredeyse geldiğini söyler. |
| lx:Wie_spät_ist_es? | coll | Senin orada → Orada | Doğallık. |
| lx:Gute_Besserung! | coll | iyileşmeye devam → iyileşmen devam etsin | Doğallık. |
| lx:Formular | ö4 tr | Nereyi imzalamam · Formun altını → Nereye imza atacağım · Formun en altına | Doğallık (010 lx:unterschreiben ile aynı). |
| lx:Wand | ö1 tr | Koridorda duvarda → Koridordaki duvarda | Doğallık. |
| lx:Kellner | ö1 tr | getiriyor → getirir | **gleich** ile doğal zaman. |
| lx:anprobieren, lx:Kantine | ö4 tr | memnuniyetle → isterim · Olur | **gern** bu kadar resmî değil (011 kararı). |
| lx:sympathisch | ö1 tr | Yeni doktoru → Yeni doktor hanım bana | **ist mir sympathisch** yapısına ve **Ärztin** kelimesine uygun. |
| lx:Abitur | img | graduation ceremony → students taking written exam | Kart sınavı anlatıyor; kep törenleri Almanya sahnesi değil. |

## Yazarın notları: doğrulama

| Not | Sonuç |
|---|---|
| **sich freuen**, **sich ärgern**, **sich interessieren**, **warten auf** sadeleşmesi | Doğru. Çift kart konusu aşağıda. |
| {Techniker\|Technikerin}, {Kellner\|Kellnerin} sözlükte çözülmeyebilir | Kısmen doğru. `personalizeDeep` yalnızca senaryoya uygulanıyor; `web/src` içinde sözlük örneklerini gösteren kod yok, yani bugün ekranda görünmüyor. İki satır başka gerekçeyle (WORLD §2) cinsiyetsiz kuruldu. |
| lx:Brauch, SOURCES satırı | Var (Maibaum satırı). `cal:maibaum` ile örtüşüyor. |
| lx:Speisekarte, **Das Menü, bitte** | Kaldı, kaynak bulundu. |
| lx:geöffnet, **Sind Sie heute geöffnet?** | Çıkarıldı. |
| lx:Regal, **auf dem Regal** | Çıkarıldı; yazarın şüphesi doğru. |
| lx:Miete, Warmmiete | Eksikti, düzeltildi. |
| lx:Apotheke, Notdienst | İfade değişti. |
| lx:Käse çoğulu | Düzeltildi. |

**Bilerek değiştirilmeyenler:** lx:abbiegen **ab: başka yola** ve lx:umsteigen **um: başka araca**, 010 ve 011'deki **an: bir yere**, **um: başka yere** çipleriyle aynı biçimde. lx:Schwimmbad **bad: havuzu** kelimenin kendi anlamlarından biri. lx:Gymnasium ve lx:Wetter hata notları anlam yanlışı olarak gerçek: **Ich gehe ins Gymnasium** spor salonu demek değildir, **Die Luft ist schön** hava durumu söylemez. **Der Basti**, **die Ioana**, **Die Derya** `alltag` katmanında kaldı (011 kararı).

## SOURCES.md için önerilen satırlar

SOURCES.md dilbilimcinin yazma yolunda değil, BM ekler:

| Bilgi | Kartlar | Kaynak |
|---|---|---|
| **Notdienstapotheke**, nöbetçi eczane | lx:Apotheke | https://aponet.de/apotheke/notdienstsuche |
| **Warmmiete**, ısınma ve diğer yan giderler dahil kira | lx:Miete | Duden: "Miete einschließlich Heiz- und sonstige Nebenkosten": https://www.duden.de/rechtschreibung/Warmmiete |
| **Menü**, birkaç çeşitten oluşan yemek | lx:Speisekarte | Duden: https://www.duden.de/rechtschreibung/Menue |
| **Tram**, güneyde Straßenbahn | lx:Straßenbahn | Duden: https://www.duden.de/rechtschreibung/Tram_Straszenbahn |

## Doğrulamada açılan diğer kaynaklar

- Käse, çoğul: https://www.duden.de/deklination/substantive/Kaese
- arbeiten, 5. anlam: https://www.duden.de/rechtschreibung/arbeiten
- Notdienst kullanımı: https://www.apotheken-umschau.de/einfache-sprache/wegweiser-gesundheitssystem/apotheken-980461.html

## Kalan şüpheler

1. **Çift kart (BM kararı, `acik.md` listesine eklenmeli):** lx:sich_freuen_(auf/über) ile lx:freuen, lx:sich_fühlen ile lx:fühlen, lx:sich_interessieren_(für) ile lx:interessieren, lx:sich_bewegen ile lx:bewegen, lx:warten_(auf) ile lx:warten. İçerikleri çelişmiyor. Kimlik ve bağlantı etkisi olduğu için yamaya konmadı.
2. **SOURCES satırları (BM):** yukarıdaki dört satır eklenene kadar kaynak kaydı eksik.
3. **Yer tutucu (BM):** 010 ve 013 partilerinde sözlük örneğinde `{Patient|Patientin}` ve `{Kunde|Kundin}` var. Örnekleri gösterecek ekran ya da ses hattı `showText` ve `speakText` kullanmazsa süslü parantez öğrenciye çıkar.
4. **Seviye:** `level` değerleri bir seviye listesiyle karşılaştırılmadı, değiştirilmedi. lx:Garantie ve lx:Techniker A1 için yüksek görünüyor.

## Sonuç

**AÇIK.** Dil hataları yamada kapandı. Açık kalan: 1 (çift kart) ve 2 (SOURCES satırları); ikisi de BM işi. Yama uygulanıp depoda `content:validate` 0 hata verene kadar `review.status` `draft` kalmalı.
