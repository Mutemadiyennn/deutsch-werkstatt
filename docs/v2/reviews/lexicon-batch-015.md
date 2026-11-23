# lexicon-batch-015: dilbilimci incelemesi

- Tarih: 2026-11-23 · İnceleyen: dilbilimci-ajan · Görev: İÇ-K2
- Girdi: `content/v2/registry/lexicon/batch-015.json` (lex taslağı). Düzeltmeler dosyaya doğrudan yazıldı.
- İncelenen kart: **13** (her kartın bütün alanları; 78 örnek, 78 boşluk, 52 eşdizim)
- Düzeltilen kart: **12** · alan düzeyinde düzeltme: **28** (6'sı tek karara bağlı: lx:Gehaltsabrechnung boşluklarına eş anlamlı kabulü)
- Hata oranı: **12/13 kart** (0,92); alan bazında 28. Çoğu küçük; ağır hata yok (yanlış artikel, çoğul, olgu ya da dilbilgisi hatası çıkmadı). Öğrencinin göreceği Almancayı değiştiren düzeltme 3 kartta (lx:Bahnsteig, lx:Abfahrt, lx:Fahrschein).
- Değişmeden geçen kart: **lx:Warteschleife**. lx:Vorgesetzte, lx:Anrufbeantworter, lx:Rückruf, lx:Lohn, lx:Fahrplan ve lx:Zugausfall birer alan aldı.
- `content:validate`: **0 hata**, 147 uyarı (tur öncesiyle aynı sayı; bu partiden yeni uyarı yok).
- `review.status` **draft** kaldı. Gerekçe aşağıda, "Durum alanı" başlığında.

## Hatalar

### Almanca ve doğallık

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Bahnsteig | ö4, b4 (de + tr) | Wo ist der Bahnsteig für Gleis 4? → Wo ist der Bahnsteig für den Zug nach Landshut? | **der Bahnsteig für Gleis 4** söylenmez; insan **Wo ist Gleis 4?** der. Türkçesi de (4. hattın peronu) partinin geri kalanıyla çelişiyordu: lx:Gleis ve lx:Abfahrt ö1 **Gleis** için peron diyor. |
| lx:Abfahrt | ö5 (de + tr) | kauft Derya noch einen Kaffee · bir kahve daha alıyor → kauft Derya noch schnell einen Kaffee · çabucak bir kahve alıyor | **noch einen Kaffee** iki anlama geliyor (bir kahve daha / gitmeden bir kahve). Cümlenin durumu ikincisi; Türkçe çeviri birincisini seçmişti. |
| lx:Fahrschein | ö6 (de + tr) | – Klar, steig ein. → – Klar, das geht. | Soru şoföre değil üçüncü bir kişiye soruluyor (**beim Fahrer**); cevap şoförün ağzından yazılmıştı. |

### Kalıp bağları

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Durchwahl | `pt:was-heisst` → `pt:ja-nein-frage` | Kartta **Was heißt …?** kuran tek cümle yok. ö6 ve b5 (**Hast du die Durchwahl von Herrn Wimmer?**) evet-hayır sorusu. |
| lx:Fahrschein | b4: Ioana kauft einen ___ für den Bus. → Wo kann ich einen ___ kaufen? (Nereden bilet alabilirim?) | Kart `pt:wo-ist` kalıbına bağlı ama örneklerde ve boşluklarda **Wo …?** yoktu. Eski b4, ö5'in kısaltılmış tekrarıydı; yenisi öğrencinin durakta gerçekten soracağı cümle. Cevap tek: **einen** yüzünden **Fahrkarte** ve **Ticket** girmez. |

### Boşluklar (`also_ok`, haksız ret riski)

| Kart | Boşluk | Eklenen | Gerekçe |
|---|---|---|---|
| lx:Gehaltsabrechnung | b1–b6 | `Lohnabrechnung` (b2: `Lohnabrechnungen`) | Saat ücretiyle çalışılan iş yerinde belgenin adı çoğunlukla budur; aynı artikel, aynı Türkçe karşılık. Reddetmek haksız olur. |
| lx:Vorgesetzte | b6 Alle ___ sind heute in einer Besprechung. | `Chefs` | Kartın öteki dört boşluğu **Chef** / **Chefin** kabul ediyor; kart içi tutarlılık. |
| lx:Bahnsteig | b6 Der Bahnhof hat vier ___. | `Gleise` | b3 ve b5 **Gleis** kabul ediyor; lx:Gleis de dört boşlukta **Bahnsteig** kabul ediyor (iki yönlü kural, #102). |
| lx:Abfahrt | b6 `tr` | iki sefer → iki kalkış | Çeviri **sefer** olunca **Züge**, **Busse**, **Fahrten** de doğru cevap oluyordu. |

Boşlukların geri kalanı denetlendi: cevap ya artikel/sıfat ekiyle tekleşiyor (**der**, **einen**, **meinen**, **Ihr**) ya da Türkçe çeviriyle. Bilerek eklenmeyenler: lx:Bahnsteig b1 **auf dem ___ warten** için **Gleis** (rayların üstünde beklemek anlamına gelir); lx:Lohn b5 **Geld** yerinde bırakıldı (zam isterken Almancada en sık söylenen biçim).

### `exp.parcalar`

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Durchwahl | Durch: doğrudan, wahl: numara çevirme → boş | **durch** doğrudan demek değil (o **direkt**). Çip, çok sık bir kelimeye yanlış anlam öğretiyordu. Anlam `anlam_tr` ve `ipucu_tr` içinde zaten açık. Batch-013'teki emsal (lx:Aufenthaltstitel) ile aynı karar. |

### Türkçe ve ipuçları

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Anrufbeantworter | coll 2 `tr` | telesekreterdeki mesaj → telesekreterde bir mesaj | Almancası **eine Nachricht**; belirli değil. |
| lx:Rückruf | ö6 `tr` | Servis aradı mı? … arayan olmadı → Tamirhane aradı mı? … geri arayan olmadı | lx:Werkstatt ve WORLD **tamirhane** diyor; **servis** tek başına belirsiz. Kartın kelimesi (geri arama) çeviride kaybolmuştu. |
| lx:Schichtplan | coll 1 `tr` | vardiya planında yazmak → vardiya planında yazılı olmak | Mastar hâliyle plana bir şey yazmak diye okunuyordu. |
| lx:Lohn b6, lx:Schichtplan b6, lx:Fahrplan b6, lx:Zugausfall b2 | `hint_tr` | … harfi **ö**/**ä** olur → … olur, sona **e** gelir | İpucu çoğulun yarısını söylüyordu (**Lohn** → **Löhne**: hem ünlü değişir hem **e** gelir). Dört ipucu da 13 kelime, sınırın içinde. |

## Denetlenip doğru bulunanlar

- **Artikel ve çoğul (13/13):** der Anrufbeantworter / Anrufbeantworter · die Durchwahl / Durchwahlen · der Rückruf / Rückrufe · die Warteschleife / Warteschleifen · der Lohn / Löhne · die Gehaltsabrechnung / -en · der Schichtplan / Schichtpläne · der Bahnsteig / Bahnsteige · der Fahrplan / Fahrpläne · die Abfahrt / Abfahrten · der Fahrschein / Fahrscheine · der Zugausfall / Zugausfälle.
- **lx:Vorgesetzte (lex'in kararı): doğru.** `de: "Vorgesetzte"`, `art: "der"`, `pl: "Vorgesetzten"` ile arayüz **der Vorgesetzte** ve **die Vorgesetzten** kuruyor; ikisi de doğru. `de: "Vorgesetzter"` olsaydı ekranda **der Vorgesetzter** çıkardı, bu yanlış. Kadın biçimi `ipucu_tr`, coll 2, ö3, ö5, b3 ve ikinci hata notunda var. Çekimler tek tek doğru: mein / Ihr Vorgesetzter · mit meinem / deinem Vorgesetzten · der Vorgesetzte · die neue / eine neue / deine Vorgesetzte · alle Vorgesetzten. Bu sözlükte sıfattan türeyen başka isim kartı yok; karar emsal olur.
- **Hata notları:** hepsi Türkçeden gelen gerçek hatalar (hâl eki yerine edat, artikelsiz isim, **almak** → **nehmen**, ayrı yazım, saat için **in**). Yanlış diye gösterilen biçimlerin hepsi gerçekten yanlış.
- **OD-9:** `exp` alanlarının hepsi tek cümle, terimsiz, sembolsüz; ipuçları ≤ 14 kelime. Geçici olarak `reviewed` yapılıp doğrulayıcı koşuldu: OD-9 metin hatası 0.
- **Katman:** `alltag` örnekleri gerçekten konuşulan biçimler (hab, häng, 'nen, 'n, nee, gekriegt, guck mal). Bairisch ya da güney biçimi yok.
- **Kimlik:** öğrencinin ağzından çıkan satırlarda (lx:Rückruf ö1, lx:Zugausfall ö4 vb.) ad ve cinsiyet yok. Kişisel bilgi, kurs ya da kitap adı yok. Karakterler WORLD ile uyumlu (Wimmer **Sie** diyor, Tobi ve Derya **du**).
- **Olgu:** lx:Lohn ö6 saat ücreti 14 avro, 2026 asgari ücretinin (13,90) üstünde, gerçekçi. lx:Gehaltsabrechnung ö2 (ev için son üç bordro) gerçek uygulama.
- **SOURCES.md, yeni satır:** doğru. 0171 39200 47, Bundesnetzagentur'un kurgu için ayırdığı 0171 39200 00–99 aralığında; aynı numara ve aynı bağlantı 11. satırda (lx:Telefonnummer) zaten incelenmiş hâlde duruyor. Satırdaki dahili numaralar (214, 307, 25, 12) kartlardakilerle birebir aynı. Bağlantı bu turda ağdan yeniden açılmadı.
- **`related`:** lx:zurückrufen, lx:Gehalt, lx:Schicht, lx:Gleis, lx:Ankunft, lx:Fahrkarte, lx:ausfallen, lx:Zug kayıtta var.

## Kalan şüpheler (karar baş geliştiricide)

1. **`level`.** lx:Vorgesetzte ve lx:Lohn bildiğim kadarıyla yaygın sınav kelime listelerinde B1 düzeyinde; lx:Fahrplan ve lx:Fahrschein A1 yazılmış ama lx:Gleis ve lx:Ankunft A2. Listeleri bu turda kaynaktan doğrulamadım, o yüzden dokunmadım. Planlayıcı `level` alanına bakıyorsa bir kez gözden geçirilmeli.
2. **lx:Zugausfall ö1 ve coll 4, Es gibt einen Zugausfall.** Dilbilgisi doğru, ama tekil hâliyle seyrek; insan **Mein Zug fällt aus** der (kartın `ipucu_tr` alanı bunu söylüyor). `pt:es-gibt` ve `pt:deshalb` bağını taşıdığı için bıraktım.
3. **lx:Zugausfall hata notu, Der Zug ist Zugausfall.** Kesin yanlış ama pek kurulmayan bir cümle. Daha gerçek hata **Der Zug ist abgesagt** olurdu (randevudan taşınan **absagen**); o biçim tam yanlış sayılamayacağı için değiştirmedim.
4. **lx:Chef (batch-014) b6 Herr Wimmer ist mein ___.** Aynı Almanca cümle bu partide lx:Vorgesetzte b1'de de var; burada **Chef** kabul ediliyor, orada **Vorgesetzter** kabul edilmiyor. Türkçeler farklı (şefim / amirim) olduğu için doğrulayıcı çakışma uyarısı vermiyor. batch-014 bu görevin dışında; istenirse oraya `also_ok: ["Vorgesetzter"]` eklenir.
5. **lx:Vorgesetzte boşlukları.** Altı boşluğun beşi sıfat çekimi istiyor (**Vorgesetzter** / **Vorgesetzten** / **Vorgesetzte**). Kelimenin doğası bu ve ipuçları kuralı söylüyor, ama A2 başındaki öğrenci için partinin en zor kartı. Okur turunda özellikle bakılmalı.
6. **`freqRank` yok.** 13 kartın hiçbirinde bu alan yok (LEX.md zorunlu sayıyor; doğrulayıcı hata vermiyor, lx:Fahrkarte gibi alan listesi kartlarında da yok). Bilgi olarak.

## Durum alanı

Görev `review.status: "reviewed"` istiyordu ve okur alanı konmamasını söylüyordu. Doğrulayıcı bu ikisini birlikte kabul etmiyor:

```
HATA: content/v2/registry/lexicon/batch-015.json: "reviewed" ama okur kontrolü geçmemiş (OD-9.4)
```

(`content/tools/load.ts` satır 282.) Okur turu yapılmadığı için `okur: "passed"` yazmadım. 0 hata şartını tutmak için alan şu hâlde bırakıldı:

```json
{"status":"draft","by":"dilbilimci-ajan","at":"2026-11-23","notes":"Dilbilimci turu tamam: docs/v2/reviews/lexicon-batch-015.md. Okur (OD-9.4) bekliyor; okur geçince reviewed."}
```

Okur geçince `status: "reviewed"`, `okur: "passed"`, `okur_at` birlikte yazılabilir; dil açısından engel yok.

## Sonuç

**KAPANDI** (dil incelemesi). Bulunan bütün hatalar dosyada düzeltildi; kalan şüphelerin hiçbiri yanlış Almanca ya da yanlış bilgi değil. Parti okur turuna hazır. `reviewed` işareti okur kapısına bağlı olduğu için bu turda konmadı.

## Okur GERİ düzeltmesi (2026-11-23)

Okur raporu: `docs/v2/reviews/okur/lexicon-batch-015.md` (378 alan, 7 GERİ). Yedi alanın hepsi düzeltildi; aynı türden üç ipucu daha bulundu ve düzeltildi. Başka alana dokunulmadı. `review` **draft** kaldı; okur yeniden okumalı.

### Okurun geri döndürdüğü 7 alan

| Alan | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Rückruf `exp.ipucu_tr` | Fiil olarak **zurückrufen** kullanılır, mesela **Ich rufe Sie zurück**. → Sizi geri arayacağım derken **Ich rufe Sie zurück** denir. | Terim (fiil) kalktı; örnek cümle kaldı. |
| lx:Abfahrt `exp.ipucu_tr` | Fiil olarak **abfahren** kullanılır, mesela **Der Zug fährt ab**. → Tren kalkıyor derken **Der Zug fährt ab** denir. | Aynı. |
| lx:Rückruf `forms[4].hint_tr` | Geri arama derken **der Rückruf** denir. → Geri aramayı derken **den Rückruf** denir. | Cümlede boşluğun önünde **den** var; ipucu artık cümledeki biçimi söylüyor. |
| lx:Bahnsteig `forms[2].hint_tr` | Peronda derken **am Bahnsteig** denir. → Peronda derken **am Bahnsteig** de denir, **auf dem Bahnsteig** ile aynı. | İki biçim de doğru ve aynı anlamda; ipucu bunu açıkça söylüyor. |
| lx:Bahnsteig `forms[4].hint_tr` | Peronda derken **am Bahnsteig** denir. → Perondaki bank derken **eine Bank am Bahnsteig** denir. | Aynı Türkçe söz artık iki farklı karşılığa bağlanmıyor. |
| lx:Zugausfall `forms[5].hint_tr` | Bir tren iptali var derken **es gibt einen Zugausfall** denir. → **es gibt** gelince **ein** sözü **einen** olur, **es gibt einen Zugausfall** denir. | **ein** ile **einen** farkının nedeni yazıldı. |
| lx:Vorgesetzte `exp.ipucu_tr` | Kadın amir için **die Vorgesetzte**, birden çok amir için **die Vorgesetzten** denir. → Kadın amir için **die Vorgesetzte** denir. | Tek fikir. Çoğul, kartın başlığında ve altıncı boşluğun ipucunda zaten var. |

### Aynı türden, taramada bulunan 3 alan

78 ipucunun hepsi yeniden tarandı: aynı kartta aynı Türkçe söz farklı biçime bağlanıyor mu, ipucu cümledeki biçimle çelişiyor mu.

| Alan | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Rückruf `forms[2].hint_tr` | Geri arama derken **einen Rückruf** denir. → Bir geri arama rica ederken **um einen Rückruf** denir. | Okurun işaret ettiği çiftin öteki yarısı (geri arama derken → **einen** / **der**). |
| lx:Fahrplan `forms[4].hint_tr` | Tarife derken **der Fahrplan** denir. → Tarifeyi derken **den Fahrplan** denir. | Cümlede **den** var, ipucu **der** diyordu; aynı söz birinci boşlukta **der Fahrplan** ile eşleşiyor. |
| lx:Gehaltsabrechnung `forms[4].hint_tr` | Maaş bordrosu derken **die Gehaltsabrechnung** denir. → Onun maaş bordrosu derken **seine Gehaltsabrechnung** denir. | Cümlede **seine** var, ipucu **die** diyordu. |

Öteki kartlarda aynı Türkçe sözün tekrarlandığı ipuçları (lx:Anrufbeantworter, lx:Durchwahl, lx:Lohn, lx:Schichtplan, lx:Abfahrt, lx:Warteschleife) her seferinde aynı biçimi veriyor ve cümleyle örtüşüyor; dokunulmadı.

`content:validate`: 0 hata, 147 uyarı.
