# lexicon-batch-010: dilbilimci incelemesi

- Tarih: 2026-11-18 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-010.view.jsonl` (yazar yaması uygulanmış) · Yama: `cm/work/batch-010.dil.json`
- İncelenen kart: **100** (her kartın bütün alanları, 400 örnek)
- Düzeltilen kart: **30** · alan düzeyinde düzeltme: **43**
- Hata oranı: **30/100 kart** (0,30). Ağır hata 16 kartta: yanıltıcı hata notu, dünya ile çelişki, yanlış anlam, yanıltıcı çip. Kalan 14 kart hata notu kuralı, Türkçe doğallık ve açıklama.
- `lintpatch.ts`: kart 30, sorunlu 0. Görünümdeki 100 kartın tamamı da aynı denetimden geçti: sorunlu 0.
- `content:validate`: depo dosyasına yazılmadı. Yama geçici bir kopyaya uygulandı: **0 hata**, 96 uyarı. Uyarıların 53'ü kalıp kullanımı, 2+2+2'si senaryo dosyaları, 37'si `proposals.json` kayıtları. Bu partinin kartları yalnızca "kayıtta zaten var; öneri yok sayıldı" uyarısında geçiyor (ör. lx:Pfand, lx:Senf); yamadan kaynaklanan uyarı yok.
- `review.status` `draft` kalır.

## Hatalar

### Almanca, anlam ve dünya

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Bauch | mistakes, ipucu | **Ich habe Bauch weh** yanlış → **Mein Bauch ist weh** yanlış · ipucu: **Ich habe Bauchweh** | **Ich habe Bauchweh** doğru ve yaygın; söylenişi aynı olan cümle yanlış diye öğretiliyordu. Duden: das Bauchweh, umgangssprachlich. |
| lx:vermissen | ö4 | Vermisst du deine Heimat, Derya? → …, Ioana? | WORLD §3: Derya burada doğup büyümüş. Ioana sonradan gelmiş kalıcı karakter. |
| lx:schenken | ö4 | Was schenken wir Rosa? → Was schenken wir Derya? | WORLD'de Rosa, Frau Brandl'dır ve ona **Frau Brandl** denir. Türkçesi de **hediye edelim** oldu. |
| lx:siezen | ö4 | Muss ich dich siezen? → Muss ich Sie siezen? · sen de yeter → sen demen yeter | **dich** ile sorulunca soru kendini boşa çıkarıyor. **sen de yeter** başka anlama gidiyordu. |
| lx:Firma | ö3 | …, ne? → …, oder? | **ne** kuzey ağırlıklı; 009 ile aynı karar. |
| lx:Glühwein | ö4 tr | sert içkili mi, içkisiz mi · İçkisiz → sert içki katkılı mı, katkısız mı · Katkısız | Glühwein zaten alkollü; **içkisiz** yanlış anlam veriyordu. |
| lx:backen | ö4 tr, ö2 tr | anneannemin → büyükannemin · bütün komşular için pişiriyor → bütün komşulara kek kurabiye yapıyor | **Oma** anne tarafını belirtmez. Nesnesiz **pişiriyor** eksik kalıyordu. |
| lx:Senf | exp.anlam | sarı sostur → hardal sosudur | Kartın ö2'sindeki tatlı hardal sarı değildir. |
| lx:Bratwurst | exp.anlam | kalın sosistir → sosistir | İnce Bratwurst da var; **kalın** kelimenin parçası değil. |
| lx:stehen#2 | tr, exp.anlam | dik durmak → durmak · dik durduğunu → bir yerde durduğunu | ö1 park etmiş araba, ö3 trafik. İkisinde de **dik** anlamı yok. |

### `exp.parcalar`

Ölçüt: öğrencinin başka anlamıyla bildiği kelimeye bağlam karşılığı yazılmaz; çip kelimenin kendi anlamını verir.

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:fernsehen | fern: televizyon, sehen: izlemek → fern: uzaktan, sehen: izlemek · ipucu eklendi | **fern** uzak demektir. Yazarın sorduğu çip yanıltıyordu. |
| lx:Hausarzt | Haus: aile, arzt: hekimi → Haus: ev, arzt: doktoru | **Haus** A1 kelimesi, lx:Haus kartında **ev, bina**. |
| lx:unterschreiben | schreiben: imza atmak → schreiben: yazmak · ipucu eklendi | lx:schreiben kartı **yazmak**. **altına yazmak** anlamı da taşıyor. |
| lx:Sprechstunde | Sprech: muayene → Sprech: konuşma | **sprechen** konuşmaktır. |
| lx:Rathaus | Rat: belediye → Rat: meclis | **Rat** belediye demek değildir. |
| lx:gegenüber | gegen: karşı, über: tarafında → boş | **über** tarafında demek değildir; doğru çip okunuşu bozar. 009'daki wie_viel kararı. |

**Değişmeyen:** lx:Krankenkasse **kasse: sigortası** doğru. Duden, Kasse 5.2: Krankenkasse (umgangssprachlich). Kartın ö3'ü de bu anlamda. İpucu eklendi: **die Kasse**.

### `mistakes_tr`

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Pfand | **der Pfand** → **Ich bekomme den Pfand zurück** · yeni: kiralık ev için **die Kaution** | Hata cümle içinde gösterildi. Türkçe **depozito** iki kelimeyi karşılıyor; gerçek bir Türkçe kaynaklı hata. Duden: Kaution, kira güvencesi. |
| lx:Wichteln | **der Wichteln** → **Ich mache bei Wichteln mit** | Öğrencinin gerçekten kuracağı biçim. |
| lx:Versprechen | **Ich tue mein Versprechen** → **Ich gebe dir eine Versprechen** | İlki Türkçeden gelmiyor (**sözümü tutmak**, **halten** ile birebir). |
| lx:fremd | Doğrusu yoktu → **Ich komme aus dem Ausland** | Doğru biçim verilmemişti. Cinsiyetsiz seçildi. |

### Türkçe ve açıklama

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Tasse | ö4 tr | Kupaları almak ister misiniz? → Kupalar sizde kalsın mı? | **behalten** satın almak değil, kalmasıdır. |
| lx:absagen | ö3 tr | Yarınki işi iptal ediyorum → Yarın gelemeyeceğim | Almancada **iş** yok. |
| lx:Hausarzt | ö3 tr | Bir aile hekimine git bence → Aile hekimine bir görün bence | Herhangi bir hekim gibi okunuyordu. |
| lx:unterschreiben | ö1, ö4 tr | buranın altını imzalayın · Şurayı, altını → buraya, en alta imza atın · Buraya, en alta | Doğal değildi. |
| lx:Wichteln | ö1, ö4 | machen wir das Wichteln → kommt das Wichteln · ne demek ki → tam olarak ne demek | Doğallık. |
| lx:Deutsch | ö1 tr | nasıl söylüyoruz → nasıl denir | Doğallık. |
| lx:Termin | ö3 tr | doktordan randevum → doktorda randevum | 009 ile aynı. |
| lx:Husten | ö3 tr | Şöyle berbat → Öyle berbat … ki | Doğallık. |
| lx:Gericht | ö3 tr | Bu nasıl bir yemek ki → … böyle | Doğallık. |
| lx:ankommen | ö4 tr | garda duruyorum → gardayım | Doğallık. |
| lx:Adventskranz | ö1 tr | var mı artık → Şimdiden … var mı | **schon** karşılığı. |
| lx:Glückwunsch | exp.ipucu | yani tebrikler → yani kutlu olsun | Doğum gününde **tebrikler** denmez. |
| lx:siezen | exp.ipucu | **siezen** ile, yani siz diye seslen → önce siz de, buna **siezen** denir | Tek okumada anlaşılmıyordu. |

## Yazarın notlarının doğrulanması

- **Çipler:** fern, Haus, schreiben yanıltıyordu, düzeltildi. kasse doğru, kaldı.
- **der Pfand:** Duden yalnızca **das Pfand** veriyor. de.wiktionary eril kullanımı Avusturya'ya bağlıyor. Almanya konuşması için kaynak bulunamadı; karta "duyulur" notu konmadı.
- **Semmel:** bölge iddiası yok, **Brötchen** ile eş. Doğru.
- **Seviye değişimleri:** değiştirilmedi. lx:sich_treffen A1, lx:treffen A1 ile uyumlu. Diğerleri öğrencinin ihtiyacına göre makul, ama bir seviye listesiyle karşılaştırılmadı.
- **Örtüşen çiftler:** kart içerikleri çelişmiyor; lx:stehen#2 düzeltmesinden sonra lx:stehen ile de uyumlu. lx:bisschen, lx:deutsch, lx:weh kartlarında `exp` yok, karşılaştırma `tr` üzerinden yapıldı.

## SOURCES.md (yeni 6 satır)

| Satır | Sonuç |
|---|---|
| **an Weihnachten** (Duden, an) | Açıldı. "(besonders süddeutsch, schweizerisch) an Ostern, an Weihnachten, an Pfingsten". Doğru. |
| Advent, Adventskranz (wissen.de) | Açıldı. "vier Kerzen, die nach und nach an den vier Adventssonntagen angezündet werden". Doğru. |
| **Pfand geri ödenir** (infranken) | Açıldı. Sayfa bunu **açıkça söylemiyor**: "einen Anreiz schaffen, die Glühweintasse wieder zurückzubringen", "wenn der Pfandbetrag nicht zurückgefordert wird". Kart doğru, kaynak zayıf. Aşağıdaki satır eklenmeli. |
| Kinderpunsch (lecker.de) | Açıldı. "Heiß, fruchtig und alkoholfrei", "nicht nur bei den Kleinen sehr beliebt". Kart ve ipucu doğru. |
| Wichteln (karrierebibel) | Açıldı. "Namen aller Teilnehmer geheim ausgelost", "passende Kleinigkeit". Doğru. |
| **du** teklifi (karrierebibel) | Açıldı. "Hier darf nur der Ranghöhere das Du anbieten". Doğru. |

BM için önerilen satırlar (SOURCES.md dilbilimcinin yazma yolunda değil):

| Bilgi | Kartlar | Kaynak |
|---|---|---|
| Pfand, boş kap için alınan ve geri ödenen para | lx:Pfand, lx:Tasse, lx:Flasche | Duden: "Geldbetrag, der für das Leergut berechnet bzw. erstattet wird": https://www.duden.de/rechtschreibung/Pfand |
| Kaution, kiralık ev için güvence parası | lx:Pfand | https://www.duden.de/rechtschreibung/Kaution |
| **die Kasse**, konuşmada Krankenkasse | lx:Krankenkasse | Duden, Kasse 5.2: https://www.duden.de/rechtschreibung/Kasse |
| **Bauchweh**, konuşma dili | lx:Bauch | https://www.duden.de/synonyme/Bauchweh |

## Kalan şüpheler

1. **SOURCES satırları (BM):** yukarıdaki dört satır eklenene kadar lx:Pfand, lx:Krankenkasse ve lx:Bauch için kaynak kaydı eksik.
2. **Yinelenen kartlar (BM, `acik.md`):** lx:passen#2, lx:stehen#2, lx:sich_treffen, lx:wehtun, lx:ein_bisschen, lx:Deutsch başka kartlarla aynı kelimeyi taşıyor. Kimlik ve bağlantı etkisi olduğu için yamaya konmadı.
3. **lx:Hausarzt çipi:** **ev doktoru** kelimenin harfiyen karşılığı, doğal Türkçesi **aile hekimi**. Doğru anlam `tr` ve `anlam_tr` içinde duruyor.

## Sonuç

**AÇIK.** Dil hataları yamada kapandı. Açık kalan: 1 (SOURCES satırları) ve 2 (yinelenen kartlar); ikisi de BM işi. Yama uygulanıp depoda `content:validate` 0 hata verene kadar `review.status` `draft` kalmalı.
