# 5. gün halkaları: dilbilimci incelemesi (PM-078 B)

Dosya: `docs/v2/reviews/halka/gun-05-halkalar.json` · Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan (yazardan bağımsız, son metin bir kez, PM-080)

İncelenen: **82 madde** (50 görev cümlesi ve kabul listeleri, 17 sahne satırı, 5 soru, 10 kalıp).
Denetim (düzeltmelerden sonra; 4. günün son hâli bilinen sayılarak): `halka_kontrol.py` → **0 hata, 0 not**; `kucuk_sozcuk.py` → **0 hata**. Yeni sözcük eklenmedi.

## Bulgular ve düzeltmeler

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | h4 `lx:passen#2` 1. cümle, kabul listesi | Haksız ret: **am Montag** bu cümlede tam doğru; WORLD'de Huber Hanım'ın kendi sözü de böyle („Passt's Ihnen am Dienstag?“). 1. günden **am** + gün öğrenen kişi ilk bunu yazar. Gösterilen cümle değişmedi. | kabul: + „Passt Ihnen am Montag um acht?“ |
| 2 | h2 `lx:Viertel` 2. cümle, kabul listesi | Türkçesi „kala / geçe“; aynı halkada „geçe“ **um Viertel nach** ile karşılanıyor (`lx:also` 1. cümle). Öğrenci Türkçeye bakıp **um** yazarsa doğru cevabı reddedilirdi. | kabul: + „Um Viertel vor acht? Nein, um Viertel nach acht!“ |
| 3 | h2 1. kalıp (tr) | Açıklama eksik kalıyordu: „bir sonraki saati söyler: on“ neden „yarım“ dendiğini göstermiyor. Türkçede hazır bir karşılık var. | „(Almanca bir sonraki saati söyler: on)“ → „(Almanca gelecek saati söyler: ona yarım saat var)“ |
| 4 | h5 sahne, 3. satır (tr) | Fazla anlam: Almancada „olur mu“ yok; aynı yapı h2'de „… geçe mi“ ile çevrilmiş. | „Memnuniyetle. Onu çeyrek geçe olur mu?“ → „Memnuniyetle. Onu çeyrek geçe mi?“ |
| 5 | h1 ve h3 sahne ortamı (tr) | Türkçe doğallık (iki satır, aynı tür). | h1 „İş saat kaçta bitiyor, o biliyor.“ → „İşin kaçta bittiğini o biliyor.“ · h3 „… seninle kısa bir görüşme saati arıyor.“ → „… seninle kısa bir görüşme için uygun saat arıyor.“ |

Ağırlık: 1–2 kabul listesinde eksik doğru varyant, 3 açıklama, 4 anlam eşitliği, 5 Türkçe doğallık. Almanca dilbilgisi hatası yok.

## Yazarın açık soruları: dil açısından görüş

- **„am Mittag“ (soru 2).** Doğru ve doğal; kaçınmaya gerek yok. Ayrım şu: **am Mittag** tek bir günün öğlesi, **mittags** her gün (çalışma saati levhasında bu yazar), **über Mittag** öğle arası boyunca. Görev cümlelerindeki **heute Mittag** ve **Bis Mittag!** de doğru. Öğrenci kalıptan **am Mittag** çıkarırsa doğru cümle kurmuş olur. **mittags** kümeye girdiğinde yalnız anlama için (levha okuma) gösterilmesi yeter.
- **Luka „Sie“, Ioana „du“ (soru 3).** Kuaförde ön ad + **Sie** gerçek ve yaygın; ayrıntı 4. gün raporunda. Bu dosyada Ioana, Derya ve Tobi'ye zamirsiz hitap ediliyor, **du**/**Sie** hatası yok. WORLD'e Luka için bir satır gerek.
- **„halb zehn“ Türkçesi.** „dokuz buçuk“ doğru ve tek karşılık olmalı; yanında „saat dokuz otuz“ da doğru. En iyi köprü Türkçenin kendi deyişi: „ona yarım saat var“ (bulgu 3). İngilizce „half ten“ benzetmesi yapılmamalı; zaten yok.
- **Uhr / Stunde / Uhrzeit.** Yazarın ayrımı doğru ve Türkçe sırayla görünüyor: „saat dört“ = **vier Uhr** (kaç olduğu), „dört saat“ = **vier Stunden** (süre), „saati“ = **die Uhrzeit** (bir işin vakti). Lex isteği 1'e katılıyorum: `lx:Uhrzeit` Türkçesi „saat (bir işin vakti)“ olmalı; „zaman“ eklenmesin, **Zeit** ile karışır. Lex isteği 2 (`nach`, `vor` için „geçe“, „kala“) da yerinde.
- **`kommen` iki günde (soru 1).** Dil konusu değil. h5'teki biçimler (**ich komme**, **kommt**) doğru.

## Bakılan, sorun bulunmayan noktalar

- **Saat dili:** **Wie spät ist es?**, **Es ist … Uhr**, **um halb zehn**, **Viertel nach / vor**, **sieben Uhr dreißig**, **elf Uhr fünfzehn**: hepsi doğru. **Uhr**'suz biçim yalnız tam saatlerde (3. gün görüşüyle aynı).
- **Günün bölümleri:** **am Vormittag / Nachmittag / Abend**, **in der Nacht**, **heute Abend**, **heute Nacht**, **morgen früh** doğru. Günün bölümü adları büyük harfle (**heute Vormittag**): doğru yazım.
- **Randevu dili:** **Passt Ihnen …?**, **… passt leider nicht**, **Die Uhrzeit passt mir**, **Dann bis Donnerstag!**, **Ja, gern!**, **… ist wieder da** telefonda aynen duyulur.
- **Saat mantığı:** 16:00 + iki saat = 18:00 (h1); pazartesi 8, salı 15:15, perşembe 16:00 ve 10:15 muayenehane saatlerinin içinde; çarşamba 8–12 = dört saat; „heute Mittag geschlossen“ uyuyor.
- **Sorular:** beşi de tek cevaplı. h1, h2, h5 gerçekten çıkarım (h2'de „neun Uhr dreißig“ Almanca metinde hiç geçmiyor).
- **WORLD:** Huber telefonda, Dr. Weber erkek (**der Arzt**), Wimmer **Sie**, Tobi iş yerinde. Yeni olgu yok. Bairisch yok. İngilizce köprü yok.
- **Kimlik:** Tobi'nin satırında `{name}`; öğrencinin adı ve cinsiyeti sabit değil.
- **Türkçe:** „öğlen“, „Daha saat erken“, „Artık geç oldu“, „Saat çoktan dokuz buçuk olmuş“ doğal; **also** = „yani“ ve „peki“ kartla aynı.

## Kalan şüpheler

1. **Betiğin reddettiği iki doğru varyant** (ekleyemedim, **haksız ret riski açık**): „Wie viel Uhr ist es, Derya?“ (h1; **Wie spät ist es?** kadar sık, `lx:Uhr` kartında da var; betik `wie viel`i bilinmeyen sayıyor) ve „Um acht bin ich da.“ (h5; 4. günün „Heute zahle ich!“ kalıbını öğrenen bunu kurar; betik `bin`i yalnız „ich bin“ dizisinde biliyor). PM/betik kararı.
2. **Bavyera'da çeyrekler.** Altbayern'de 9:45 için **dreiviertel zehn** çok duyulur (9:15 için **viertel zehn** daha seyrek). Öğrenci bunu sokakta duyacak; **halb zehn** ile aynı mantık. Öneri: üretim değil, yalnız anlama; kaynakla birlikte ileriki bir güne (PM).
3. **„am Dienstag am Nachmittag“** (h3): doğru, ama iki **am** ağır; doğalı **am Dienstagnachmittag** (küme dışı birleşik). Kümeye girince yenilenebilir.
4. **„zu spät / zu früh“ = „çok geç / çok erken“:** 4. gün raporundaki 2. şüphe burada da geçerli (**zu** = „fazla“ önerisi).
5. **„… wieder da“ = „yine burada“** telefonda soran kişinin ağzında („Ist Dr. Weber am Donnerstag wieder da?“) Türkçede „orada“ beklenir. Kalıpla tek karşılık korunsun diye değiştirmedim; okur baksın.
6. **„Bis Mittag, Tobi!“:** vedalaşma olarak söylenir; tek başına „öğlene kadar“ da demek. **Bis heute Mittag** kabul listesinde, yeterli.
7. **„Derya, wie spät?“**, **„Die Praxis ist nur vier Stunden offen, am Mittwoch.“** (kabul öğeleri): yanlış değil, seyrek.

## Sonuç

Hata oranı: **5 bulgu / 82 madde ≈ %6,1** (kabul listesi 2, açıklama 1, anlam eşitliği 1, Türkçe doğallık 1). Hepsi dosyada düzeltildi; iki betik 0 hata.

**KAPANDI** (dil açısından). Açık kalan tek risk 1. şüphe (betiğin reddettiği iki doğru varyant). Dosyada `review` alanı yok (şema ANA'da). Sıradaki: okur (OD-9).
