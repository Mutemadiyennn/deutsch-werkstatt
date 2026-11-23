# Gün 5–7 halkaları: adsız biçimler ve bir kabul listesi — dilbilimci incelemesi

Tarih: 2026-11-22 · İnceleyen: dilbilimci-ajan · Bağ: İÇ-3, PM-084 hat C, PR #197 (örneklem dönüşü)

Kapsam: yalnız 6 madde (5 adsız biçim taslağı + 1 kabul listesi). Dosyalar: `content/v2/m1/gun-05.json`, `gun-06.json`, `gun-07.json` ve eşleri `docs/v2/reviews/halka/gun-0N-halkalar.json`. Dosyaların geri kalanına dokunulmadı; dosya düzeyindeki `review` alanı değişmedi (bu bir tam dosya incelemesi değil).

Her maddede bakılan: Almanca (doğruluk, söylenirlik), Türkçe, adsız hâlin adlı hâlle aynı işi görmesi (sahnenin öteki satırları ve sorusuyla birlikte okundu), kabul listeleri, öğretilmemiş sözcük (`kt.ts`).

## Kararlar

| # | Madde | Karar | Değişiklik |
|---|---|---|---|
| 1 | gun-05 · m1:05:h1 sahne satırı 0 (Tobi) | Doğru | yok |
| 2 | gun-06 · m1:06:h2 görev cümlesi `lx:heißen` | Doğru | yok |
| 3 | gun-06 · m1:06:h3 sahne satırı 0 (Tobi) | Doğru; Türkçe (adlı ve adsız) olduğu gibi kalıyor | yok |
| 4 | gun-07 · m1:07:h1 görev cümlesi `lx:sein` | Cümleler doğru; kabul listelerinde en yaygın biçim eksikti | kabul +1 (adlı), +1 (adsız) |
| 5 | gun-07 · m1:07:h2 sahne satırı 1 (öğrenci, telefon) | Doğru | yok |
| 6 | gun-06 · m1:06:h5 `lx:warum` kabul listesi | Kalan 3 satır doğru, silme yerinde; 5 doğru varyant eksikti | kabul +5 |

Bulgu: 2 (ikisi de P3, eksik doğru varyant: haksız ret riski). Yanlış Almanca, yanlış Türkçe, bozuk birleşim, `{name}` kalıntısı yok.

## Madde madde

### 1. m1:05:h1 sahne, Tobi: „Wie spät ist es?“ / „Saat kaç?“
Almanca ve Türkçe doğru. Hitap çıkınca cümle eksilmiyor; öğrencinin cevabı („Es ist vier Uhr.“) ve soru (iş kaçta bitiyor: 18:00) ada bağlı değil. Satır halkanın kalıbıyla aynı metne iniyor, ama sahne satırı gösterilen bir görev cümlesi değil; sorun yok.

### 2. m1:06:h2 `lx:heißen`: „Und Sie? Wie heißen Sie?“ / „Ya siz? Sizin adınız ne?“
- Almanca doğru ve söylenir (kendi adı sorulan kişinin karşı sorusu). Kartın sözcüğü (**heißen**) var; `kt.ts` TAMAM.
- Adlı cümlenin işi iki parçaydı: kendini tanıt + karşıya sor. Adsız hâl ikinci parçayı ve „karşıya dönme“ hamlesini (**Und Sie?**) koruyor; **ich heiße** biçimi düşüyor, ama aynı kartın ikinci cümlesi („Mein Arzt heißt Dr. Weber.“) ve 5. günün dersi bunu taşıyor.
- Türkçe doğal. „Ya siz? Adınız ne?“ de olurdu; **sizin** vurgusu adlı Türkçeyle („Sizin adınız ne?“) aynı kaldığı için bırakıldı.
- Tek başına „Wie heißen Sie?“ gösterilen cümle olarak halkanın kalıbını yinelerdi (ayrıca gun-06 satır 826 ve r0-07, r0-11'de gösterilen cümle); taslaktaki seçim doğru.
- `accepted_adsiz` (3 öğe): üçü de doğru. Üçüncü öğe („Wie heißen Sie?“) „Ya siz?“ girişini düşürüyor, sorunun kendisini taşıyor; adlı listedeki „Ich heiße {name}. Und Sie?“ ile aynı hoşgörü düzeyi. „Und Sie, wie heißen Sie?“ uygulamanın `norm()` kuralıyla ilk öğeye eşit, ayrıca yazmaya gerek yok.

### 3. m1:06:h3 sahne, Tobi: „Wohin gehst du? Es ist noch früh!“ / „Nereye gidiyorsun? Daha saat erken!“
- Almanca doğru; ad çıkınca virgül de çıkmış, kalıntı yok. Öğrencinin cevabı („Zum Arzt. …“) ve soru değişmiyor.
- Türkçe: **„Daha saat erken!“ kalıyor** (adlı ve adsız). Gerekçe:
  1. Konuşma Türkçesinde yerleşik söyleyiş („Daha saat erken, nereye?“); yanlış ya da yapay değil.
  2. Örneklemin önerdiği „Daha erken!“ tek başına iki anlamlı: „hâlâ erken“ ve karşılaştırmalı „daha erken (bir saatte)“. Bağlamsız kısa satırda ikinci okuma gerçek bir risk; **saat** bunu kapatıyor.
  3. Aynı Almanca cümle 5. günde görev cümlesi olarak „Es ist noch früh, Tobi.“ → „Daha saat erken Tobi.“ diye çevrilmiş. Öğrenci 6. günde aynı Almancayı farklı Türkçeyle görmemeli.

### 4. m1:07:h1 `lx:sein`: „Meine Adresse ist Brunnengasse sieben.“ / „Adresim Brunnengasse yedi.“
- Almanca ve Türkçe doğru. **sein** biçimi var (**ist**); `kt.ts` TAMAM. Haftanın başka hiçbir gösterilen görev cümlesiyle aynı değil (gun-07 provasında yalnız kabul öğesi olarak geçiyor, satır 1803; gun-06 satır 656 „Die Adresse? Brunnengasse sieben.“ farklı cümle).
- Adlı cümle **bin** + **ist** gösteriyordu; adsız hâlde yalnız **ist** kalıyor. Kabul edilebilir: aynı halkada „Ich bin am Abend oft müde.“ ve kartın ikinci cümlesi „Sind Sie heute da …?“ var, üç biçim de halkada duruyor. **bin**'i korumak için denenen „Ich bin neu hier. …“ `kt.ts`'ten geçmiyor (**hier** bu halkada bilinmiyor), bu yüzden önerilmedi.
- **Bulgu (P3):** iki kabul listesinde de en yaygın biçim yoktu: „Ich wohne in der Brunnengasse sieben.“ Bu cümle haftanın kendi gösterilen cümlesi (gun-03 satır 1785, gun-07 satır 1791); listede yalnız daha seyrek olan „…, in Nummer sieben.“ biçimi vardı. Öğrenci 3. günde öğrendiği cümleyi yazınca reddedilirdi.

Önce → sonra:

```
accepted         + "Ich bin {name}. Ich wohne in der Brunnengasse sieben."
accepted_adsiz   + "Ich wohne in der Brunnengasse sieben."
```

Adlı listeye de eklendi, çünkü adsız listenin kabul ettiği biçimin adlı eşi reddedilmemeli.

### 5. m1:07:h2 sahne, öğrenci: „Guten Tag. Ich habe Fieber und ich möchte einen Termin.“ / „İyi günler. Ateşim var ve bir randevu istiyorum.“
- Almanca ve Türkçe doğru. Huber'in „Guten Tag, Praxis Dr. Weber!“ satırına selamla karşılık vermek telefonda en doğal açılış; b7'nin yerleşik çözümüyle aynı („Guten Tag, hier ist {name}.“ → „Guten Tag.“).
- Akış bozulmuyor: Huber'in cevabı („Fieber? Dann kommen Sie heute bis elf.“) ve soru ada bağlı değil.
- Adsız satırda bilinmeyen sözcük 0 (adlı satırda **hier** işaretli tek bilinmeyen).

### 6. m1:06:h5 `lx:warum`: „Warum geht es am Montag nicht?“ kabul listesi
- **Silme yerinde.** „Warum geht am Montag nicht?“ öznesiz: **am Montag** edatlı öbek, özne olamaz. Ayrıca bu tam olarak Türkçe konuşanın beklenen hatası (Türkçede özne düşer, Almancada **es** düşmez); kabul etmek hatayı onaylamak olurdu.
- **Kalan üç satır doğru.** „Warum geht Montag nicht?“ dahil: yalın gün adı özne olur („Montag geht nicht.“, „Geht Montag?“ 1. günün gösterilen cümleleri), bu yüzden **es** gerekmez. Fark edatta: **Montag** özne olabilir, **am Montag** olamaz.
- **Bulgu (P3):** 5 doğru ve söylenir varyant eksikti.

Önce → sonra:

```
önce (3):  "Warum geht es am Montag nicht?", "Warum geht Montag nicht?", "Am Montag geht es nicht? Warum?"
sonra (8): + "Warum geht's am Montag nicht?"        konuşmada en sık biçim; norm() kesme işaretini atınca „gehts“ kalır, „geht es“ ile eşleşmez. Aynı dosyada örneği var (satır 2082 „Warum geht's nicht?“)
           + "Warum geht es Montag nicht?"          yalın gün adı zaman belirteci olarak (am'sız)
           + "Warum geht das am Montag nicht?"      es yerine das; aynı dosyada örneği var (satır 2083)
           + "Warum geht es denn am Montag nicht?"  ton parçacığı denn; dosyanın öteki listeleriyle aynı çizgi
           + "Warum geht es nicht am Montag?"       doğru; vurgu güne kayar (5. günde „Es geht nicht am Vormittag.“ kabul ediliyor)
```

Eklenmeyenler: „Wieso …“ (kartın sözcüğü **warum**; **wieso** öğretilmedi), „Warum nicht am Montag?“ (**geht** düşüyor, Türkçedeki „olmuyor“u taşımıyor).

## Kalan şüpheler (kapsam dışı, dokunulmadı)

1. **Öznesiz „geht“ haftanın başka kabul listelerinde duruyor.** Bu maddede silinen satırla aynı yapı (edatlı öbek ya da zarf + öznesiz **geht**) şu kabul öğelerinde kabul ediliyor:
   - `gun-02.json` satır 635: „Im Sommer geht nicht, Herr Wimmer.“ (2. günün incelemesinde bilerek bırakılmış: `gun-02-dilbilimci.md` bulgu 1–2, „es'siz biçim kabul listesinde kaldı“)
   - `gun-05.json` satır 439: „Am Vormittag geht nicht.“
   - `gun-05.json` satır 1938–1958 arası 6 öğe: „… Geht um Viertel nach vier?“
   - `gun-05.json` satır 812: „Heute geht nicht? Dann morgen früh.“ (zarf; 1. günde „Morgen geht nicht.“ gösterilen satır olarak bile var, bu yüzden en savunulabilir olanı)

   Hafta içinde tek ölçüt olmalı. Önerim 6. maddedeki kararın (edatlı öbekle **es** zorunlu) ilk üç satıra da uygulanması; „Heute/Morgen geht nicht“ ayrı tutulabilir (zarf gündelik konuşmada özne gibi davranıyor ve 1. günde böyle öğretiliyor). Karar İÇ'in; bu dosyalar bu görevin kapsamında değildi.
2. **„Name“ ile kurulan cevaplar (madde 2).** „Und Sie? Wie ist Ihr Name?“ Türkçenin doğru bir karşılığı, ama **Name** 6. günün 2. halkasında henüz bilinmiyor (`kt.ts`: name) ve kartın sözcüğünü kullanmıyor; „yeni kelime ekleme“ kısıtı gereği eklenmedi. **Name**'i başka yerden bilen öğrenci reddedilir; adlı listede de aynı boşluk var („Mein Name ist {name}. …“ yok).
3. **Madde 5, adlı satır.** „Hier ist {name}. …“ Huber'in selamına selamsız cevap veriyor; yanlış değil, telefonda duyulur, ama adsız hâl bu açıdan daha kibar. Haftanın provası „Guten Tag, hier ist {name}.“ öğretiyor. Örneklem bunu işaretlemedi; hata saymadım, değiştirmedim.
4. Öneri dosyalarındaki `sahne.soru.cikarim: true` alanı gün dosyalarında yok (gun-05: h1, h2, h5; gun-06: h1, h4, h5; gun-07: h3, h4). Bu görevden önce de böyleydi, dil konusu değil; „iki dosya eşit kalmalı“ ölçütü açısından bilginize.

## Doğrulama

Rapordaki satır numaraları düzeltmelerden sonraki dosyalara göredir.

```
$ npm run content:validate 2>&1 | grep "HATA\|→ "
içerik v2: 20 alan · 1499 kelime (1207 K1, 0 K2; 15 parti) · 61 kalıp · 202 dilbilgisi · 6 senaryo · 2241 seviye tespiti maddesi → 0 hata, 131 uyarı

$ node --experimental-transform-types docs/v2/reviews/c-olcum/kt.ts "$PWD" cumle 6 2 "Und Sie? Wie heißen Sie?"
TAMAM ← Und Sie? Wie heißen Sie?
$ … cumle 7 1 "Meine Adresse ist Brunnengasse sieben."
TAMAM ← Meine Adresse ist Brunnengasse sieben.
$ … cumle 6 5 "Warum geht es am Montag nicht?"
TAMAM ← Warum geht es am Montag nicht?
(sahne satırları: cumle 5 1 "Wie spät ist es?", cumle 6 3 "Wohin gehst du? Es ist noch früh!", cumle 7 2 "Guten Tag. Ich habe Fieber und ich möchte einen Termin." → üçü de TAMAM)

$ npx vitest run content packages/shared/src/adsiz
 Test Files  11 passed (11)   Tests  79 passed (79)
```

Betik denetimi (üç görev cümlesi, adlı ve adsız): kartın sözcüğü gösterilen cümlede var; listenin ilk öğesi = gösterilen cümle; `norm()` sonrası liste içi tekrar 0; adsız alanlarda `{name}` kalıntısı 0; kabul listeleri ≥ 3 (D-064). Gün dosyası ile öneri dosyasının `halkalar` bölümü üç günde de eşit (`cikarim` alanı hariç, bkz. şüphe 4). `gun-05.json` ve `gun-05-halkalar.json` değişmedi.

## Ek tur (2026-11-23): gun-02 · m1:02:h4 `lx:haben`, „Im August habe ich Geburtstag.“

#196 incelemesinin (P2-3) ardından değişen tek cümle. Almanca doğru ve söylenir; Türkçe („Ağustosta doğum günüm var.“) doğal ve halkanın kalıbındaki **var** karşılığını koruyor (kardeşleri „İlkbaharda / Bugün doğum günüm var“ ile aynı çizgi). Dört kabul öğesi doğru. Cümle haftada ve r0-02'de başka hiçbir gösterilen cümleyle aynı değil; `kt.ts cumle 2 4` TAMAM, çerçeve örneği iki kipte de bu cümle.

- **Düzeltme (P3, eksik varyant):** kabul listesine „Ich habe Geburtstag im August.“ eklendi (4 → 5). Günün dersi aynı sırayı kabul ediyor (r0-02: „Ich habe Geburtstag im Februar.“), aynı halkadaki kardeş cümle de („Ich habe Urlaub am Montag. …“); burada reddedilmesi tutarsız olurdu. Kardeş „Im Frühling habe ich Geburtstag.“ listesinde aynı öğe yok; kapsam dışı olduğu için dokunulmadı, aynı ekleme önerilir.
- **„Heute habe ich Geburtstag!“ ile:** aynı metin değil, dilbilgisi çakışması yok. `lx:haben`'in üç cümlesinden ikisi artık „… habe ich Geburtstag“ ile bitiyor (halkada „Im Frühling …“ ile üç); çeşitlilik biraz azaldı, hata değil.
- **h2 „Mein Geburtstag ist im August, nicht im Mai.“ ile:** aynı olgu, yeni fiille (sein → haben); yineleme değil, yeni yapı öğretiyor. Kalan gözlem (bu değişiklikten önce de vardı): günün içinde „ben“in doğum günü iki ayrı ayda geçiyor (h2 „Mein Geburtstag? Im Mai.“, h4 „Im Frühling habe ich Geburtstag.“, yazma örneği „Mein Geburtstag ist im Mai.“ ↔ h2 ve h4'te ağustos). Görev cümleleri bağımsız alıştırma olduğu için hata sayılmadı.

Doğrulama: `npm run content:validate` → 0 hata, 131 uyarı; gün ve öneri dosyasının `halkalar` bölümü eşit (`cikarim` hariç). Sonuç: **KAPANDI**.

## Sonuç

6 madde incelendi, 2 bulgu (P3), ikisi de düzeltildi; hata oranı 2/6. Görev cümlesi ve sahne satırı metinleri (`de`, `tr`, `de_adsiz`, `tr_adsiz`) değişmedi, yalnız kabul listeleri genişledi.

**KAPANDI** (6 madde). Kapsam dışı tek açık konu: şüphe 1 (öznesiz „geht“ için hafta genelinde tek ölçüt), İÇ'in kararı.
