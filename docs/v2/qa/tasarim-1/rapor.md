# [DENETİM-TASARIM] Bütün ekranların dökümü ve puanı (PM-153 md. 2)

28.11.2026, 00:29–00:58 UTC (kutu 2 sa 15 dk). Denetçi bu ürünün hiçbir PR'ını yazmadı. Kod ve içerik değiştirilmedi.
Toplu sayfalar: `T01…T37-*.jpg` (her karede `[ham dosya]` etiketi). Aşağıda **[T07.2]** = 7. toplu sayfanın 2. karesi.

## Nasıl çektim

- **Sürüm:** main `0f1d224`. `npm run content:build` **fikstürsüz** (gerçek içerik paketi `3ab5c5307e68`: 56 gün, 1771 kelime, 2241 tespit maddesi), `vite build --mode e2e` (yalnız sahte giriş ve sahte sunucu için). PM-153 yayındaki `v2-20261127-5`'i diyor; görevim main'i istedi. Arada fark varsa main daha yenidir.
- **Tarayıcı:** Playwright Chromium, 390×844, dokunmatik, açık tema (karşılaştırma için 5 koyu ekran). Akış bayrağı üretimdeki gibi `"hepsi"`. 1. gün için gün kilidi açık; 8./14. gün adresle açıldı.
- **Öğrenci:** 1., 8. ve 14. gün `tests/e2e/ogrenci_akis.py`'nin bilgi kısıtlı öğrencisiyle baştan sona yüründü. Her ekran türünden ilk iki örnek çekildi, soru öncesi ve cevap sonrası. Öteki ekranlar `common.py` yardımcılarıyla açıldı. Seviye tespiti, rol oyunu ve hata durumları için ayrı öğrenciler kullanıldı.
- **Ses:** 5 Almanca sesli sahte `speechSynthesis` (iPhone'daki gibi). Görselde ses yolu yalnız düğme durumu olarak görünür.
- **Araçlar:** `arac/` klasöründe. `cekim_*.py` çeker, `duzen.py` toplu sayfaya neyin gireceğini seçer, `toplu.py` birleştirir. 341 ham görüntüden 172 kare seçildi.
- **Bakış:** 37 toplu sayfanın hepsini tek tek açıp baktım. Ayrıca ham görüntülerin önizleme sayfalarını da açtım. Bu rapordaki her sav bir kareye dayanır. Otomatik sav yok.
- **Uyarı (çekim yapıntısı):** Tam sayfa görüntülerde sabit sekme çubuğu sayfanın ortasında çizilebilir. "Üst üste binme" kusurlarını yalnız ekran boyu görüntülerden yazdım.

## Puan ölçütü (0–2, PM-153 md. 2.3)

| | Ölçüt | 2 | 1 | 0 |
|---|---|---|---|---|
| E | tek birincil eylem | bir dolu düğme, yeri sabit | iki eylem yarışıyor ya da yeri değişiyor | birincil eylem yok, belirsiz ya da iki dolu düğme |
| Y | yoğunluk | dengeli | yarıdan fazlası boş ya da kalabalık | ekranın ≥ %65'i boş ya da metin duvarı |
| T | tutarlılık (başlık, X/geri, düğme, kart) | ortak kalıp | bir öğe ayrık | kendi kalıbı |
| O | okunabilirlik | ≥ 15 px, kontrast iyi | küçük ya da soluk öğe var | ana içerik zor okunuyor |
| Ş | taşma / üst üste binme | yok | küçük ya da kaydırınca | içerik ya da eylem örtülüyor |
| D | dokunma hedefi | ≥ 44 px | küçük ikincil hedef | ana hedef küçük |
| G | durum geri bildirimi | ne olduğu ve sırada ne olduğu açık | eksik | yok ya da yanlış |
| K | kimlik (karakter, mekân, görsel) | sahne ya da karakter var | yalnız ad ya da ikon | düz kart |
| M | Türkçe metin (sade, teknik değil) | sade | bir teknik ya da tutarsız terim | birden çok teknik terim ya da iç dil |

## Ekran puanları (18 üzerinden)

| # | Ekran | Sayfa | E | Y | T | O | Ş | D | G | K | M | Top. |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Giriş | T01.1–2 | 2 | 1 | 1 | 2 | 2 | 2 | 2 | 0 | 1 | 13 |
| 2 | Kurulum: hoş geldin | T01.3 | 2 | 1 | 1 | 2 | 2 | 2 | 2 | 0 | 1 | 13 |
| 3 | Kurulum: ad (ikinci kez) | T01.4 | 2 | 1 | 0 | 2 | 2 | 2 | 0 | 0 | 2 | 11 |
| 4 | Kurulum: zorluklar | T01.5–6 | 2 | 2 | 1 | 2 | 2 | 2 | 1 | 0 | 2 | 14 |
| 5 | Kurulum: öncelik sırası | T02.1–2 | 1 | 0 | 1 | 2 | 2 | 1 | 1 | 0 | 2 | 10 |
| 6 | Kurulum: günlük hedef | T02.3 | 2 | 1 | 1 | 2 | 2 | 2 | 1 | 0 | 0 | 11 |
| 7 | Kurulum: son ayarlar | T02.4 | 2 | 1 | 0 | 2 | 2 | 0 | 1 | 0 | 1 | 9 |
| 8 | Tespit girişi | T03.1 | 2 | 1 | 2 | 2 | 1 | 2 | 2 | 0 | 2 | 14 |
| 9 | Tespit maddesi (dinle/oku/yaz/kelime) | T03.2–4, T04.2–3 | 2 | 1 | 1 | 2 | 2 | 2 | 1 | 0 | 2 | 13 |
| 10 | Tespit: konuşma + mikrofon izni | T03.5–6, T04.1, T04.5 | 1 | 1 | 1 | 2 | 1 | 2 | 0 | 0 | 1 | 9 |
| 11 | Tespit: ara ekran, boş rapor/plan | T04.4, T04.6, T05.1 | 2 | 0 | 1 | 2 | 2 | 2 | 0 | 0 | 1 | 10 |
| 12 | Bugün (taze) | T06.1–2, T19.1 | 1 | 0 | 1 | 1 | 0 | 2 | 1 | 1 | 1 | 8 |
| 13 | Bugün (yarıda) | T06.3–5 | 1 | 0 | 1 | 1 | 0 | 2 | 0 | 1 | 1 | 7 |
| 14 | Bugün (gün sonu) | T07.1–3 | 1 | 0 | 1 | 1 | 0 | 2 | 1 | 1 | 0 | 7 |
| 15 | Bugün (tespit yarıda) | T05.2 | 2 | 0 | 0 | 2 | 2 | 2 | 1 | 0 | 2 | 11 |
| 16 | Akış bitti | T06.6 | 2 | 0 | 1 | 2 | 2 | 2 | 0 | 0 | 1 | 10 |
| 17 | Günlük görevler / Bugünkü süre | T07.4–5 | 1 | 1 | 1 | 2 | 2 | 2 | 1 | 0 | 1 | 11 |
| 18 | Yol | T08, T09.1 | 1 | 0 | 0 | 1 | 0 | 2 | 1 | 1 | 1 | 7 |
| 19 | Rehber | T09.2–3 | 1 | 1 | 1 | 2 | 1 | 2 | 1 | 0 | 2 | 11 |
| 20 | Hafta sonu testi (kilitli) / sonucu | T09.4–5, T30.3 | 1 | 0 | 1 | 2 | 2 | 2 | 0 | 0 | 1 | 9 |
| 21 | Köy | T10.1 | 2 | 2 | 2 | 1 | 2 | 2 | 1 | 1 | 2 | 15 |
| 22 | Bahçe / Sinema / Radyo (mekân) | T10.2–4 | 1 | 0 | 1 | 2 | 2 | 2 | 1 | 0 | 1 | 10 |
| 23 | Kütüphane | T10.5 | 2 | 1 | 2 | 2 | 0 | 2 | 1 | 0 | 2 | 12 |
| 24 | Pazar meydanı | T10.6, T11.1–2 | 1 | 0 | 1 | 2 | 0 | 1 | 0 | 1 | 0 | 6 |
| 25 | Atölye / Kalıplar | T11.3–4 | 1 | 0 | 1 | 1 | 1 | 2 | 1 | 0 | 0 | 7 |
| 26 | Kalıp ayrıntısı | T11.5–6, T12.1 | 1 | 0 | 1 | 2 | 2 | 2 | 1 | 0 | 1 | 10 |
| 27 | Günün kayıtları | T12.2 | 2 | 1 | 1 | 2 | 1 | 2 | 1 | 0 | 2 | 12 |
| 28 | Sözlük ("Kelime haritam") | T12.3 | 2 | 0 | 1 | 2 | 2 | 2 | 0 | 0 | 2 | 11 |
| 29 | Kelime Bahçesi oynatıcısı | T13.1–3, T36.4 | 1 | 1 | 0 | 2 | 1 | 2 | 2 | 0 | 2 | 11 |
| 30 | Ses/Sinema kaydı oynatıcısı | T19.3–T20.5, T13.4–6, T14.1 | 2 | 1 | 1 | 2 | 1 | 2 | 1 | 0 | 2 | 12 |
| 31 | Ders | T14.2–4 | 0 | 0 | 0 | 2 | 2 | 2 | 1 | 0 | 1 | 8 |
| 32 | Senaryo ana sayfası | T14.5–6, T32.2–3 | 1 | 1 | 1 | 2 | 0 | 2 | 1 | 1 | 1 | 10 |
| 33 | Senaryo: Dinle ve tara | T15.1, T32.4 | 2 | 0 | 1 | 2 | 2 | 2 | 1 | 0 | 2 | 12 |
| 34 | Senaryo: İfadeler / Cümle kur / Alıştırma / Diyalog | T32.5–6, T33.1–3 | 1 | 1 | 1 | 2 | 0 | 2 | 1 | 1 | 1 | 10 |
| 35 | Rol oyunu (normal, hata, gecikme) | T33.4, T33.6, T34 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 0 | 2 | 13 |
| 36 | Gelen arama | T33.5, T36.2 | 2 | 2 | 2 | 2 | 0 | 2 | 2 | 2 | 2 | 16 |
| 37 | Ben | T16.1–4 | 1 | 1 | 1 | 2 | 0 | 2 | 0 | 0 | 1 | 8 |
| 38 | Çalışma düzenim | T16.5 | 1 | 1 | 0 | 2 | 2 | 2 | 1 | 0 | 0 | 9 |
| 39 | Profil ve ayarlar | T16.6, T17 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 0 | 0 | 6 |
| 40 | Ses ve mikrofon | T18 | 1 | 1 | 1 | 2 | 0 | 2 | 1 | 0 | 0 | 8 |
| 41 | Akış: durak geçişi | T19.2 | 2 | 0 | 1 | 2 | 2 | 2 | 1 | 0 | 2 | 12 |
| 42 | Akış: tanıtım / yeni kalıp | T21.1, T22.4, T23.4, T25.6 | 2 | 0 | 1 | 2 | 2 | 2 | 1 | 0 | 2 | 12 |
| 43 | Akış: halka soruları | T21.2–T22.6 | 2 | 1 | 1 | 2 | 1 | 2 | 2 | 1 | 2 | 14 |
| 44 | Akış: sahne | T23.1–2 | 2 | 1 | 2 | 2 | 0 | 2 | 1 | 0 | 2 | 12 |
| 45 | Akış: halka sonu | T23.3 | 2 | 1 | 2 | 1 | 2 | 2 | 2 | 0 | 1 | 13 |
| 46 | Akış: Almanca söyle ya da yaz | T23.5–6 | 2 | 0 | 1 | 2 | 2 | 2 | 2 | 0 | 2 | 13 |
| 47 | Dil noktası: açıklama | T24.1–2 | 2 | 0 | 1 | 0 | 1 | 2 | 1 | 0 | 1 | 8 |
| 48 | Dil noktası: tablo / hatırla | T24.3–4 | 2 | 1 | 2 | 2 | 2 | 2 | 1 | 0 | 2 | 14 |
| 49 | Dil noktası dril ekranları | T24.5–6, T25.1–5 | 1 | 0 | 0 | 1 | 2 | 2 | 0 | 0 | 1 | 7 |
| 50 | Tamamla / der-die-das | T26.1–4 | 2 | 0 | 1 | 2 | 1 | 2 | 2 | 0 | 2 | 12 |
| 51 | Bugünün görevi | T26.5 | 2 | 0 | 1 | 2 | 2 | 2 | 0 | 0 | 2 | 11 |
| 52 | Dikte / gölge konuşma | T27.1–4 | 1 | 1 | 1 | 2 | 2 | 2 | 2 | 0 | 1 | 12 |
| 53 | Prova | T27.5–6, T28.1–3 | 1 | 1 | 1 | 2 | 2 | 2 | 1 | 0 | 2 | 12 |
| 54 | Okuma ve yazma | T28.4–6, T29 | 2 | 1 | 1 | 2 | 2 | 1 | 2 | 0 | 2 | 13 |
| 55 | Sınav / hafta testi / deneme / aylık ölçüm | T30, T31 | 2 | 0 | 0 | 2 | 2 | 2 | 0 | 0 | 1 | 9 |
| 56 | Hata / boş / çevrimdışı | T35, T36.1, T36.3 | 1 | 0 | 0 | 2 | 2 | 2 | 0 | 0 | 1 | 8 |

**Sütun ortalamaları (56 ekran):** E 1,5 · Y 0,6 · T 0,9 · O 1,8 · Ş 1,4 · D 1,9 · G 1,0 · K 0,2 · M 1,3.
En zayıf üç ölçüt: **kimlik (0,2)**, **yoğunluk (0,6)**, **tutarlılık (0,9)**. 56 ekranın 2'sinde karakter ya da sahne görseli var: gelen arama [T33.5] ve senaryo İfadeler çizimi [T32.5].

## Ekran başına kusurlar

P0 = öğrenciyi durduruyor · P1 = her gün görülür, anlamı bozar ya da güveni kırar · P2 = biçim, tutarlılık.
**P0: görselde 0.** Hiçbir ekranda öğrenci çıkışsız kalmadı. Tek istisna doğrudan adresle açılan hata ekranlarıdır (aşağıda P1, 56. madde).

### Giriş ve kurulum (T01–T02)
- **P1** Ad boş geçilince aynı soru ikinci kez soruluyor ("Sana nasıl hitap edelim?"). Sayaç yine "KURULUM · 1/5" gösteriyor; ilerleme çubuğu ilerlemiyor [T01.3 → T01.4].
- **P1** Günlük hedefin varsayılanı "100 dakika (önerilen: 4 seans)". Altında "Pomodoro düzeni", "Kontrollü alıştırma", "Destekli diyalog" yazıyor [T02.3]. İlk açılışta yeni başlayana 100 dk ve teknik dil gösteriliyor.
- **P2** Giriş: "iPhone uygulamasındaki gibi e-posta ve uygulama şifresiyle giriş" anlaşılmaz. Ham ▶ açılır kutu var. Görsel kimlik yok [T01.1–2].
- **P2** Seçili zorluk kartında ✓ yazının üstüne ayrı satır olarak ekleniyor, kart yüksekliği değişiyor [T01.6]. "‹ Geri" sağ üstte; uygulamanın geri kalanında geri solda.
- **P2** Öncelik sırası 20 satır × 2 ok = 40 düğme. İlk satırın ↑'su ve son satırın ↓'su da etkin görünüyor. "Devam" iki ekran aşağıda [T02.1–2].
- **P2** "İleride B1 sınavına da hazırlanmak istiyorum" onay kutusu biçimsiz ve yaklaşık 14 px. Etiketle hizasız [T02.4]. "Seçme | Herr | Frau": "Seçme" bir eylem gibi okunuyor [T01.3].

### Seviye tespiti (T03–T05)
- **P1** Mikrofon izni sorusu, "Şimdi değil" dendikten sonra **her konuşma maddesinde yeniden** çıkıyor [T03.6 → T04.1 → T04.5]. Soru kartı ekranın yarısını kaplıyor; "Tamam, izin ver" iki satıra kırılıyor.
- **P1** Hep "Bilmiyorum" diyen öğrenci bırakılmıyor. 70 ekranda "Bölüm 8/9 · 7. hafta" konuşma maddesine geldi: 7 satır Türkçe senaryo ve B1'e yakın Almanca [T04.5]. Giriş "yaklaşık 27 dakika" diyor [T03.1].
- **P1** Tespit yarıda bırakılınca Bugün'de **yalnız** "Seviye tespitin yarıda · Sürdür" kartı kalıyor; ekranın %80'i boş, ders yolu yok [T05.2]. Yol ise aynı anda 1. günün BAŞLA'sını gösteriyor [T09.1]. İki sekme farklı şey söylüyor.
- **P2** İlerleme çubuğu ince ve renksiz; 20 maddede yaklaşık %10 doluyor [T03.3–T04.3]. "Bölüm 1/9" ile "1. hafta" iki ayrı sayaç.
- **P2** "Bilmiyorum" burada beyaz tam genişlik düğme. Akışta mavi metin bağlantısı, Bahçe'de "Bilmiyorum, göster", dril ekranlarında hiç yok (bkz. 49).
- **P2** "Seviye planı" boş durumunun başlığı "Seviye raporun". Rapor ile aynı kart [T05.1, T04.6].

### Bugün (T06, T07, T19.1)
- **P1** BAŞLA "Kelime Bahçesi" düğümünün üstünde duruyor ama dokununca "Sesler" açılıyor [T19.1 → T19.2]. Ses kaydı ✓ olduktan sonra da BAŞLA yerinden kıpırdamıyor [T06.5] (PM-153 #5'in ekranı).
- **P1** En alttaki düğüm ve etiketi sekme çubuğunun arkasından görünüyor: "Herr Pichler'den sesli mesaj" [T06.1, T06.3, T06.5, T37.1]. Bildirim baloncukları ("1. günden başlıyorsun", "Kaldığın yerden sürer.") yolun ortasına, düğümün üstüne düşüyor [T06.1, T06.3] (PM-153 #6).
- **P1** Bugün yarıda: yolda hiçbir işaret yok. Düğümde ilerleme halkası ya da "devam" etiketi yok; ekran tazesiyle aynı [T06.3]. Öğrenci nerede kaldığını göremiyor.
- **P1** Gün sonu: 2. günün yolu ve BAŞLA hemen açılıyor. "1. gün bitti" özeti (kurduğu cümle, yeni kelimeler) **iki ekran aşağıda**, 2. günün yolunun altında kalıyor [T07.1–3]. Günün ödül anı görünmüyor.
- **P2** Üstte üç hap, görev çubuğu (3 yazısız ikon + sandık) ve yeşil kart üst üste. BAŞLA'dan önce 5 ayrı öğe [T06.1]. "0/3 görev" gün bitince de 0/3 [T07.1].
- **P2** Düğüm etiketinde dilbilgisi dili: "Sonu kişiye göre değişir: heiße, heißt" [T07.1]. Düğüm adı "Ders": içerik yok.
- **P2** "Gün sonu" yıldızından sonra bir "Tekrar" düğümü daha var; gün sonu son adım değil [T06.2].

### Akış bitti, görevler, süre (T06.6, T07.4–5)
- **P1** "Bugünün durakları bitti" ekranı neredeyse boş: sayı yok, kazanılan şey yok, kutlama yok. "Bugün ekranında görürsün" diyor [T06.6]. Ödül anı başka ekrana erteleniyor.
- **P2** Görevlerde sandık simgesi 3 kez; "?" düğmesi tek başına. "Bugünkü süre"de "Sırada seans 1/4 · 25 dk" ve "Bugünkü hedefe 100 dk" yazıyor; ekranın %70'i boş [T07.4–5].

### Yol, Rehber, hafta testi (T08–T09)
- **P1** Yol, Bugün'ün aynı bileşeni: aynı yeşil kart, aynı düğümler, aynı BAŞLA [T08.1 ve T06.1]. İki sekme aynı şeyi gösteriyor. Yol'un kendi işi (haftalar, kilit, nerede olduğum) 10 ekran boyu aşağıda kalıyor.
- **P2** Kilitli günler aynı soluk 8 düğüm desenini tekrar ediyor. 2.–8. hafta satırları aynı cümle: "7 gün · önceki hafta bitince açılır" [T08.4]. En sonda yalnız bir "Tekrar" düğümü var.
- **P2** Rehber'de 25 satırın her birinde dolu mavi hoparlör düğmesi var: 25 birincil renkli düğme [T09.2–3]. Bu alt sayfada üst stat hapları var, Günün kayıtları alt sayfasında yok [T12.2].
- **P2** "Henüz sonuç yok · Testi çöz" düğmesi test kilitliyken teste çağırıyor [T09.5]. "Bugüne dön" yazımı başka yerde "Bugün'e dön" [T06.6, T35.1].

### Köy ve dükkânlar (T10–T15)
- **P1** Köy döşemesi güçlü (ızgara, renkli ikonlar) [T10.1]. Ama içeri girilince **her mekân aynı düz liste**: resim, karakter, mekân sesi yok [T10.2–4]. Sinema bir kartla ekranın %75'i boş. Köy'ün vaadi ile içi kopuk.
- **P1** Pazar meydanı 1. gün öğrencisine turuncu "Mevsimin dersi · Weihnachtsmarkt" ve **A2** senaryolar gösteriyor [T10.6, T14.5]. 20 alandan 15'i "Dersler yakında" ama hepsi ›'li, dokunulabilir görünüyor [T11.1]. Dipte teknik satır: "İçerik: 1771 kelime · 202 dilbilgisi notu · 6 ders · sürüm 3ab5c5307e68" [T11.2].
- **P1** Kelime Bahçesi, Köy'den açan taze öğrenciye ilk yeni kelime olarak **"sein"** veriyor (1. gün "hallo" ile başlıyor) [T13.1, T36.4].
- **P2** Bahçe mekânında ana eylem "Kelime Bahçesi: tekrar et" beyaz ikincil düğme gibi; "+ Duyduğum kelime" hap [T10.2].
- **P2** Kalıplar: 8 ekran boyu tek düz liste; gruplama, arama, seviye ayrımı yok. Satır yazısı kart kenarına yapışık (iç boşluk yok), › kart dışına taşıyor. Formül dili ağır: "Haben, Ist ya da Kann gibi kelime + kişi + gerisi?" [T11.3–4]. Günün kayıtlarında da aynı iç boşluk kusuru var [T12.2].
- **P2** Kalıp ayrıntısı: her örnekte çift "hoparlör | Yavaş" düğmesi, 20'den fazla dolu mavi düğme. "GÜNLÜK" etiketi kimi satırda yanda, kimi satırda altta [T11.6].
- **P2** Kütüphane'de son satır sekme çubuğunun arkasından okunuyor [T10.5].

### Ben ve alt sayfalar (T16–T18)
- **P1** "Ne kazandım" başlığı altında 1. gün bittikten sonra da bütün yapabilirlik satırları ○○○, yani hiçbir şey dolmamış [T16.3]. "Ne kazandım" diyen ekran hiçbir kazanç göstermiyor.
- **P1** "Kelime haritam" satırı Sözlük'e açılıyor: yalnız boş arama kutusu, öğrenilen kelimeler ya da harita yok; ekranın %85'i boş [T12.3].
- **P2** Teknik içerik öğrencinin önünde: "Fotoğraf rafı bağlı değil → bağla" [T16.1]. Tanılamada "Kabuk: yok (tarayıcıda açık) · Ses yolu: web · Almanca sesler (5): Anna…" [T16.4]. Ses ve mikrofonda "Hızı ölç", "Kabuk: yok"; bu sonuncusu "Söyle" düğmesinin altına sıkışıp kesiliyor [T18.2]. Ham ▶ açılır kutular var: Tanılama, "Karakterlerin sesi · 12".
- **P2** Çalışma düzenim: mor degrade kahraman kartı, başka hiçbir ekranda olmayan görsel dil. "Panel 1 · süre", "Panel 2", "Pasif = tanıma; aktif = kendin üretme. Kalıcı: en az 3 saat arayla…" teknik dil. "Şimdi yap" altı çizili düz bağlantı [T16.5].
- **P2** Ayarlar 6 ekran boyu. Seans planı etiketleri dar: "Seans / 1" iki satıra kırılıyor. Alan önceliğindeki "aşağı" ikonu iki dikey çubuk, duraklat simgesi gibi (DENETİM-1 #17 sürüyor). Onay kutuları biçimsiz ve etiketin üstünde ayrı satırda. "Kurulumu yeniden yap" / "Çıkış yap" küçük çip düğmeler yan yana [T16.6, T17.1–4].
- **P2** "#/ben/ayarlar/raf" (Ben'deki bağlantı) ayarların **en üstüne** açılıyor; raf bölümü 5. ekran boyunda [T17.6].

### Akış: durak geçişi ve ses durağı (T19–T20)
- **P1** Ses kaydı oynatıcısında başlık 3 kez yazılıyor: üst çubuk, telefon kartı, bölüm satırı. Ekranın yaklaşık %25'ini kaplıyor ve her adımda tekrar ediyor [T19.3–T20.5]. "Seans 1/4 · 25 dk" hapı, durağın "Yaklaşık 4 dakika" cümlesiyle çelişiyor [T19.2].
- **P1** "Bitti · 4 soruda 1 doğru." tek satır; övgü, özet ya da "ne anladın" yok, ekranın %70'i boş [T20.5]. Bilgi kısıtlı öğrenci ilk durakta 1/4 görüyor (DENETİM-1 #8).
- **P2** Durak geçişi: ekranın %70'i boş, anlamsız mavi elmas ikon, karakter ya da mekân yok [T19.2].
- **P2** "Cümle cümle dinle": satırlar "1. cümle … 4. cümle" diye içeriksiz. "0,75×" dolu mavi, birincil düğme gibi [T20.1]. Metin ve kelimeler ekranında Türkçe satırlar çok açık satır aralıklı ve "Devam"ın altına kesiliyor [T20.2].

### Akış: halka (T21–T23)
- **P1** Sahne: "Metni göster"den sonra soru ve şıklar "Devam" / "Kontrol et" çubuğunun altında kalıyor; 2. şık yarım, 3.–4. görünmüyor [T23.2] (DENETİM-1 #10 sürüyor). Sahnede mekân ya da karakter görseli yok, yalnız bir cümle betimleme [T23.1].
- **P1** Cevap sonrası ekran kayıyor: üst çubuk (X, ilerleme) ekrandan çıkıyor, Almanca başlık yarım kesiliyor [T21.3, T26.2, T26.4, T13.3]. Kelime ayrıntısı, birliktelikler ve geri bildirim aynı ekranda.
- **P2** Aynı tür tanıtım düğmesi üç adla geçiyor: "Anladım" [T21.1], "Tamam" [T23.4], "Devam et" [T24.4]. Cevap sonrası düğmesi de iki adla: "Devam" [T21.3] / "Devam et" [T21.5]. İkincil bağlantılar "Yeniden dinle" [T21.4] / "Dinle" [T21.6] / "Bir daha dinle" [T19.4].
- **P2** "N üst üste" rozeti iki renkte (yeşil [T22.1], kahverengi [T22.3]). "+2 XP" bazı doğrularda var, bazılarında yok.
- **P2** "Kontrol et" yapbozda altta, boşlukta içerikte [T21.6, T22.2]. Yapbozun cevap alanı kesik çizgi, neredeyse görünmez [T21.6].
- **P2** Tanıtım ve yeni kalıp ekranlarında ekranın %55–65'i boş; tek örnek var [T21.1, T22.4, T23.4].
- **P2** Halka sonu: "söyle" sütunu bütün satırlarda boş. Boş nokta açık gri, neredeyse görünmüyor [T23.3]. Konuşma payı (PM-148) burada görünür.
- **P2** "Neden bu?" bütün akış ekranlarında sağ üstte mavi bağlantı olarak X ile yarışıyor; ne açtığı belli değil.

### Dil noktası durağı ve dril ekranları (T24–T26)
- **P1** Dil noktası açıklaması metin duvarı: 10–12 satır yoğun paragraf, satır içinde kalın Almanca. Bir durakta 7 sözcük (noch, schon, nur, erst, gleich, mehr, doch). Başlık gövdeye boşluksuz yapışık. Tablo "Anladım" çubuğunun altına kesiliyor [T24.1–2].
- **P1** Dil noktası drilleri (DrillView) akışın kendi soru ekranlarından **ayrı bir tasarım**. Üretim maddelerinde **"Bilmiyorum" yok**; yalnız soluk "Kontrol et" var [T24.5–6, T25.1, T25.4–5]. Ders drilinde de yok [T14.4]. Bilmeyen öğrenci ancak rastgele bir şey yazarak geçebiliyor; çekimde öğrenci burada takıldı.
- **P1** "Almanca söyle" etiketi var ama arayüz "Almanca yaz…" kutusu ve küçük ikincil mikrofon [T25.4]. Konuşma görevi yazma ekranı gibi görünüyor (PM-153 #7, PM-148).
- **P2** Aynı iş, iki ad, iki düzen: "Sıraya koy" (Kontrol içerikte) [T25.3] ile "Cümleyi kur" (Kontrol altta) [T21.6]. "Seç" maddesinde şıklar ekranın altında, soru ile şıklar arasında %50 boşluk [T25.2]. Tamamla ve der/die/das maddelerinde de aynı boşluk [T26.1, T26.3].
- **P2** "Dönüştür: Heute ist Montag." Ne yazılacağı belirsiz [T25.5] (DENETİM-1 #11 sürüyor). "Yeni kalıp · Bis ___!" öğretme kartı boşluklu çerçevesiyle alıştırma gibi görünüyor [T25.6].
- **P2** Bugünün görevi "yüksek sesle söyle" diyor ama mikrofon yok. Tek düğme "Tamam"; görevin sonra nerede izleneceği belirsiz [T26.5].

### Dikte, gölge, prova, okuma-yazma (T27–T29)
- **P1** Prova "Konuşma" adımı bir konuşma görevi. Ama birincil düğme "Gönder", mikrofon yazı kutusunun yanında küçük ikincil ikon [T27.6, T28.1]. Karşı tarafın balonunda konuşan adı yok.
- **P2** Dikte 1/2 başlığı "Duyduğunu yaz" ama ekran seçmeli ("Hangi kelimeyi duydun?") [T27.1].
- **P2** Prova hazırlığında birincil düğme soluk: "Önce dinle (8 cümle kaldı)". Bozuk gibi duruyor; öğrenci 8 hoparlöre tek tek dokunmak zorunda [T27.5]. Hoparlör burada açık mavi kare: üçüncü bir biçim.
- **P2** Üç ayrı "bitti" kartı var: "Bitti · Baştan çalış" [T20.5], "Prova bitti · Bir daha prova et" (iki satıra kırılıyor, düğme boyları farklı) [T28.3], "Okuma bitti · Baştan" [T29.1]. Görev yazmayken başlık "Okuma bitti" [T29.6].
- **P2** Okuma oynatıcısında başlık ve seans hapı aynı satırda; ses ve prova oynatıcısında hap ikinci satırda. Üç oynatıcı, üç üst çubuk [T28.4, T27.5]. "Ioana'dan mesaj" düz metin olarak görünüyor; mesaj balonu ya da telefon görünümü yok [T28.4].
- **P2** Kontrol listesinde biçimsiz yerel onay kutuları var (yaklaşık 14 px dokunma hedefi). Yazma görevinde "Bilmiyorum" yok [T29.2, T29.5]. Okumanın "Cevap ver" maddesinde de yok [T28.6].

### Sınavlar (T30–T31)
- **P1** 14. günün adı "Haftanın sınavı" ama `#/sinav/14` başlığı "14. gün · Deneme sınavı", gövdesi "Bu gün sınav günü değil" [T30.2]. Akışta da sınav durağı görünmedi (14. gün: ses → halka → prova → okuma). Gün sınavını görsel olarak doğrulayamadım.
- **P1** İki ayrı "Seviye tespiti" var. Kurulumdaki: 27 dk, 9 bölüm [T03.1]. Ayarlar → "Yeniden ölç (aylık ölçüm)": 42 soru, 12–15 dk [T30.6]. Aynı ad, iki farklı test. Aylık ölçümde cevaptan sonra soru kayboluyor, yalnız "Sorun değil. Doğrusu: Geçmiş olsun!" kalıyor [T31.1].
- **P2** Açılmamış ya da çevrimdışı gün akışı başlıksız, içeriksiz bir "Sıradaki adım" kartı ve "Devam et" gösteriyor [T30.1, T36.1].
- **P2** Boş sonuç durumu üç ayrı metin ve düzende: "Henüz rapor yok" [T04.6], "Henüz sonuç yok" [T09.5], "Tamamlanmış bir tespit bulunamadı. · Tespiti başlat" [T31.2].

### Senaryo ve rol oyunu (T32–T34)
- **P1** Diyalog: "Destek düzeyi" seçicisinde sözcükler hece ortasından bölünüyor: "Cüml/e başı", "Keli/mele/r", "Dest/eksiz" [T33.3].
- **P2** Senaryo ana sayfası: "Başla: Dinle ve tara" eylem çubuğu 4. aşamanın üstüne biniyor [T32.2]. Kaçış cümlelerinin ses düğmeleri satırlarla hizasız [T32.3]. Alan sayfasında öğrenciye anlamsız "Eski uygulamadaki üniteler: A1-12 ↗ B1-10 ↗" var [T32.1].
- **P2** "Dinle ve tara" oynatıcısında soluk "Çalıyor…" ve ekranın %75'i boş; dalga, ilerleme ya da konuşan yok [T15.1]. Bu oynatıcının üst çubuğu ("1/6 · Dinle ve tara · 8 dk kaldı") başka bir düzen.
- **P2** İfadeler: "mein Name ist (adın)." yer tutucu düz yazı olarak görünüyor [T32.5].
- **İyi:** Gelen arama ekranı ürünün en güçlü ekranı [T33.5]. Rol oyunu hata ve gecikme durumları (Bekle / Tekrar dene / Yapay zekâsız devam) D-RP1'e uygun ve anlaşılır [T34.2–3].
- **P2** Girişten sonraki "1. günden başlıyorsun" bildirimi gelen aramanın "Sonra/Aç" düğmelerinin **üstüne** biniyor [T36.2].

### Hata, boş, çevrimdışı (T35–T36)
- **P1** Olmayan ders, kayıt ya da gün: kırmızı çerçeveli kart. Üst çubuk yok, X/geri yok, sekme çubuğu yok. Tek düğme "Tekrar dene" aynı olmayan şeyi yeniden deniyor [T35.2–4]. Ana ekrana eklenmiş uygulamada tarayıcı geri düğmesi yok: **çıkışsız ekran**. Yalnız doğrudan adresle açılıyor, bu yüzden P0 değil.
- **P2** Çevrimdışında hiçbir ekranda "çevrimdışısın" göstergesi yok. Yüklü içerik açılıyor (iyi) [T35.5–6]. Açılmamış gün boş kart gösteriyor [T36.1].
- **İyi:** Çökme sınırı açık ve iki çıkışlı [T35.1].

### Koyu tema (T37)
- **P2** Genel olarak tutarlı. Düğüm etiketleri (Günler, Sandık) lacivert üstünde koyu gri, düşük kontrast. Sekme çubuğunun arkasından "Kelime haritam" ve düğüm etiketi okunuyor [T37.1, T37.4].

## Ekranlar arası ilk on tasarım sorunu

1. **Altı ayrı üst çubuk.** Sekme kökü: stat hapları + büyük başlık [T06.1, T10.1]. Alt sayfa: ‹ + başlık, kimisinde hap var kimisinde yok [T07.4, T12.2]. Akış: X + ilerleme + "Neden bu?" [T21.1]. Oynatıcılar: X + başlık + "Seans" hapı + bölüm satırı; ses/prova/okuma/ders/Bahçe'de beş farklı yerleşim [T19.3, T27.5, T28.4, T14.3, T13.1]. Senaryo: X + "1/6 · …" + bölüt çubuğu [T32.4]. Hata ekranları: çubuk yok [T35.2]. Öğrenci her ekranda nerede olduğunu ve nasıl çıkacağını yeniden öğreniyor.
2. **Aynı soru, üç tasarım.** Akış halkası [T21–T23], dil noktası DrillView [T24.5–T25.5], Bahçe/ders/senaryo [T13.2, T14.4, T33.1]. Kontrol et kimi zaman içerikte, kimi zaman altta, kimi zaman hiç yok. Bilmiyorum bağlantı, beyaz düğme ya da yok. İlerleme düğmesi beş adla: Devam / Devam et / Anladım / Tamam / Sıradaki adım.
3. **"Bilmiyorum" her üretim maddesinde yok** [T24.5–6, T25.1, T25.4–5, T14.4, T28.6, T29.2]. Bilgi kısıtlı öğrenci yalnız rastgele yazarak geçebiliyor. Tespit girişinin "tahmin sonucu bozar" ilkesiyle [T03.1] çelişiyor.
4. **Konuşma görsel olarak ikinci sınıf.** "Almanca söyle", prova ve rol oyununda birincil eylem "Gönder" ya da "Kontrol et"; mikrofon yazı kutusunun yanında 40 px'lik ikincil ikon [T25.4, T27.6, T33.6]. Mikrofon birincil olan yalnız 3 ekran var: "Dokun ve konuş" [T23.5], gölge [T27.4], İfadeler [T32.5]. Halka sonunda "söyle" sütunu hep boş [T23.3]. PM-153 #7 / PM-148'in tasarım tarafı.
5. **Kimlik yok.** 56 ekranın 54'ünde karakter, mekân ya da görsel yok. Köy döşemesi [T10.1] ve gelen arama [T33.5] ne vaat ediyorsa içerisi düz liste ve düz kart [T10.2–4, T19.2, T23.1]. Sahnede konuşanlar yalnız ad olarak görünüyor; avatar ya da renk yok [T23.2], prova balonlarında ad bile yok [T28.2].
6. **Boşluk ve yoğunluk dengesizliği.** Soru ekranlarının çoğunda ekranın %50–75'i boş: içerik üstte, şıklar ya da eylem en altta [T21.2, T25.2, T26.1, T26.3]. Öte yandan metin duvarı [T24.1–2], 6–10 ekran boyu listeler var: Yol, Ayarlar, Kalıplar [T08, T17, T11.3].
7. **Sabit çubukların arkası ve bildirimler.** Sekme çubuğunun arkasından içerik okunuyor: Bugün, Yol, Ben, Kütüphane, Pazar, ses ayarları; açık ve koyu temada [T06.1, T10.5, T16.1, T18.1, T37.1]. Bildirimler düğümlerin ve gelen arama düğmelerinin üstüne düşüyor [T06.1, T06.3, T36.2]. Sahne sorusu eylem çubuğunun altında kalıyor [T23.2]. Senaryo eylem çubuğu aşama kartına biniyor [T32.2].
8. **Cevap sonrası düzen kayıyor ve tutarsız.** Doğru cevapta sayfa kayıyor, üst çubuk gidiyor [T21.3, T26.2, T26.4]. Geri bildirim bir yerde yeşil kutu + XP + rozet [T23.6], bir yerde yalnız çerçeve rengi [T13.6], bir yerde soru kaybolmuş tek satır [T31.1]. Yanlışta "neden" açıklaması yok, doğruda var [T19.5 / T20.4].
9. **Sayı ve sayaç çelişkileri.** "Seans 1/4 · 25 dk" hapı her oynatıcıda var. Buna karşı akışta "3. seans", durakta "Yaklaşık 4 dakika", kurulumda "100 dakika", "0/100 dk", "0/3 görev" (gün bitince de 0) [T19.2–3, T02.3, T07.1]. İki tespit: 27 dk ve 12–15 dk [T03.1, T30.6]. Ses durağında "4 soruda 1 doğru" [T20.5]. Ekranlar öğrenciye birbirini tutmayan sayılar veriyor.
10. **İç dil ve teknik dil öğrenciye sızıyor.** "Kabuk: yok", "Ses yolu: web", sürüm karması, "Panel 1/2", "Pomodoro", "Kontrollü alıştırma", "Hızı ölç", "A1-12 ↗", "Eski uygulamada açılır", "Fotoğraf rafı bağlı değil" [T16.4, T18.2, T11.2, T16.5, T02.3, T32.1, T16.1]. Düğüm etiketinde dilbilgisi terimi: "Sonu kişiye göre değişir" [T07.1].

Aynı düzeyde ama ilk ona girmeyenler:
- **Bugün = Yol.** İki sekme aynı bileşen [T06.1, T08.1].
- **"Kazanım" gösterilmiyor.** Akış bitti boş [T06.6]. Ben ○○○ [T16.3]. Gün özeti iki ekran aşağıda [T07.2].

## "Tek bileşenle çözülür" önerileri

| Bileşen | Neyi çözer | Nerede |
|---|---|---|
| **`UstCubuk`** (sol: X ya da ‹ · orta: başlık tek satır · sağ: tek durum hapı ya da "Neden bu?", ikisi değil · altında isteğe bağlı ilerleme) | Sorun 1. Oynatıcılarda üçlü başlık [T19.3]. Hata ekranlarında çıkış yok [T35.2]. Seans hapı / ilerleme çakışması | Bütün tam ekranlar: akış, ses, prova, okuma, ders, Bahçe, senaryo, sınav, tespit, hata |
| **`SoruIskeleti`** (yönerge · soru · içerik · sabit alt: birincil eylem + her zaman "Bilmiyorum") | Sorun 2, 3, 6. Kontrol'ün yeri; Bilmiyorum'un yokluğu; şıkların ekranın dibine düşmesi | Akış halkası, DrillView, Bahçe, ders, senaryo, okuma soruları, tespit |
| **`CevapSonrasiKarti`** (alttan açılan sabit panel: doğru/yanlış · doğru cevap · tek cümle neden · ses · tek "Devam"; sayfa kaymaz) | Sorun 8. Kayan üst çubuk [T21.3]; soru kaybolması [T31.1]; yanlışta neden yok [T19.5] | Bütün soru türleri |
| **`SesDugmesi`** (tek biçim: hoparlör + uzun basınca/ikinci dokunuşta yavaş; satır içi ve büyük boy) | En az 6 ses düğmesi biçimi: tek mavi kare [T21.1], mavi+Yavaş çift [T21.2], açık mavi kare [T27.5], ▶ Dinle + 0,75× [T27.1], Dinle/Yavaş beyaz-mavi [T14.2], ▶ satır içi [T20.2]. Rehber ve kalıpta 20'den fazla dolu mavi düğme [T09.2, T11.6] | Her yer |
| **`KonusCubugu`** (birincil büyük mikrofon · ikincil "Yazarak cevapla" · "Bilmiyorum") | Sorun 4. Konuşma görevlerinde "Gönder"in birincil olması | Almanca söyle, prova, rol oyunu, gölge, görev |
| **`KonusanBalonu`** (avatar/renk + ad + Almanca + Türkçe + ses; "Sen" her zaman sağda ve ayrı renkte) | Sorun 5. Sahne/prova/diyalogda kim kim (PM-153 #3) [T23.2, T28.2, T33.3] | Sahne, prova, ders "Önce dinle", senaryo diyalog, rol oyunu |
| **`BitisKarti`** (başlık · 1–3 somut kazanç: kurduğun cümle, yeni kelimeler, doğru sayısı · tek "Sıradaki adım") | Üç ayrı bitti kartı [T20.5, T28.3, T29.1], boş "akış bitti" [T06.6], gün özetinin gömülmesi [T07.2] | Ses, prova, okuma, halka sonu, akış bitti, gün sonu |
| **`BosDurum`** (ikon · tek cümle neden · tek eylem · her zaman UstCubuk ile) | Üç boş-sonuç metni [T04.6, T09.5, T31.2], başlıksız "Sıradaki adım" [T30.1], çıkışsız hata [T35.2–4], çevrimdışı göstergesi yok | Rapor, plan, test sonucu, kilitli test, olmayan içerik, çevrimdışı |
| **`AltGuvenliAlan`** (sayfa altına sekme çubuğu + safe-area kadar boşluk; `Bildirim` sekme çubuğunun hemen üstünde, eylem düğmelerini örtmeyen tek yer) | Sorun 7 [T06.1, T10.5, T36.2] | Sekme kökleri, gelen arama |
| **`MekanBasligi`** (mekân görseli + karakter + bir cümle) | Sorun 5'in Köy tarafı [T10.2–4, T19.2] | Köy mekânları, durak geçişi, sahne |

## Ulaşılamayan ya da doğrulanamayan ekranlar

1. **Hafta sonu testinin içi ve dolu sonucu:** 7 gün bitmeden kilitli [T09.4, T30.3].
2. **Gün sınavı (haftanın sınavı):** `#/sinav/14` "sınav günü değil" diyor [T30.2]. 14. günün akışında sınav durağı yoktu.
3. **Dolu seviye raporu ve planı:** tespit 70 ekranda bitmedi [T04.5].
4. **A1 denemesinin maddeleri:** 1. maddeden ileri gidemedim, "Devam" kaydı dinlemeden açılmıyor [T30.5]. Bölüm sonucu da görülmedi.
5. **Rol oyunu sonu (Türkçe rapor) ve "Bu ne demek?" / "Almanca nasıl derim?" açılırları.**
6. **"Neden bu?" açılırı, "Mola ver" ekranı, hızlı şerit önerisi** (çekimde kapalıydı), **gün kilidi ekranı** (GunKapisi), **kilitli döşemeye dokunma sonucu** (Kafe/Tiyatro/Gazete).
7. **Seviye tekrarı / hafta tekrarı** (`#/seviye/tekrar`, `#/hafta/N/tekrar`), **Bahçe tekrar günleri** (tarih ilerlemedi).
8. **Video oynatıcı ve Sinema'da görüntü:** yerel pakette `.medya` yok; Sinema bölümleri ses şablonuyla açıldı [T13.4].
9. **Gerçek mikrofon ve konuşma tanıma**, **kabuk (iPhone uygulaması)**: PM-153 #1 (çift dokunma yakınlaşması, girişte otomatik yakınlaşma) Chromium'da sınanamaz. #2 (aynı ses) görsel değil.
10. **WebKit ve gerçek cihaz yazı tipleri:** bu döküm Chromium'da. Satır kırılmaları iPhone'da farklı olabilir.
11. **Günlük hatırlatma ve push bildirimi.**

## PM-153 bildirimlerinin görseldeki karşılığı

- **#5 doğrulandı:** ses kaydı ✓ sonrası BAŞLA hâlâ Kelime Bahçesi'nde [T06.5].
- **#6 doğrulandı:** sekme çubuğu arkası ve bildirim içeriğin üstünde [T06.1, T06.3, T37.1].
- **#7'nin tasarım tarafı:** yukarıda Sorun 4.
- **#3'ün tasarım tarafı:** `KonusanBalonu` yok.
- **#1, #2:** bu ortamda görülemez (bkz. ulaşılamayanlar 9).

## Önceki DENETİM-1 bulgularının durumu (görsel)

- Kapanmış görünenler:
  - #2: sahnede ham kimlik yerine artık adlar var [T23.2].
  - #12: resimden seç fotoğrafları var [T21.4].
- Sürenler:
  - #10: sahne sorusu eylem çubuğunun altında [T23.2].
  - #11: "Dönüştür" belirsiz [T25.5].
  - #13: iki seans sayacı.
  - #15: sekme çubuğu arkası.
  - #16: Pazar seviyesiz [T10.6].
  - #17: teknik raf satırı, "aşağı" ikonu [T16.1, T17.1].
