# İmza yol haritası (PM-048)

FINAL imza listesindeki (#54) her satırın ekran tarifi ve sırası bu belgede. Bir satırın İMZALI sayılması için #54'teki dört kanıt gerekir: WebKit görüntüleri, e2e ve erişilebilirlik testi, uzman hükmü, öğrenci simülasyonu. İMZALI işaretini yalnızca PM koyar.

Öncelik zinciri: **phases/ > AHTAPOT > YOL_HARITASI > OGRETIM_DONGUSU > BEYIN > LEARNING_SYSTEM > TASARIM** (PM-047). Bir tarif phases/ ile çelişirse phases/ kazanır.

Her PR açıklaması ilerlettiği satırları yazar, ör. `İmza: A4, D14`.

## Dalga sırası

Her dalga bir öncekinin üstüne kurulur. Dalga içindeki sıra, satırların listelendiği sıradır.

| Dalga | Ne zaman | Amaç |
|---|---|---|
| **0** | şimdi (açık PR'lar, PM-039, PM-042 P0'ları) | Temel sağlam: veri kaybı yok, hata öğrenciyi ekrandan atmaz, çevrimdışı, gizlilik, CI kapıları |
| **1** | R1 "İlk telefon" (LS-17 R1) | Bir günün tamamı: giriş, ilk 10 dakika, Bugün ve Pomodoro, ders oynatıcısı, geri bildirim, mola, rol oyunu |
| **2** | R1'den hemen sonra | Yol ve Ben: ilerlemeyi görmek, kendi defterin, ayarlar |
| **3** | TS-5 adım 2 (4 sekme: Bugün, Yol, Köy, Ben) | Köy: mekânlar, kelime bahçesi, atölye, gerçek görevler, telefon |
| **4** | Kütüphane dağıtımı (PM-045 §2) gelince | Medya: radyo, podcast, kütüphane, gazete, sinema, tiyatro, posta |
| **5** | iOS kabuğu (PM-038) ile paralel | Kabuk ve yerel yetenekler: ikon, ses, konuşma tanıma, cihaz üstü yapay zekâ, güncelleme |

## A. Ekranlar

| # | Dalga | Ekran tarifi (TASARIM, phases/04–05; kısa) | Bağlı iş |
|---|---|---|---|
| A1 | 5 | İkon (Raute + Brezel turuncusu), açılış ekranı 1 sn altı; kabuğun çevrimdışı sayfası Türkçe ve "Tekrar dene" ile | PM-038 |
| A2 | 1 | Giriş: tek düğme (Apple/Google), ne saklandığını söyleyen tek cümle; hata ve çevrimdışı hâli | — |
| A3 | 1 | İlk 10 dakika: ilk cümle dinlenir ve söylenir; yerleştirme oyun kılığında ve en fazla 8 dk; "kendini anlat" (ad, hitap); köye ilk adım. Ad ve hitap yer tutucuyla (D-061) | PM-022, R0 |
| A4 | 1 | Bugün: gök şeridi saate göre (sabah, gündüz, akşam, gece). 100 dakika halkası, 4 seans işareti, "Seans x/4 · N dk kaldı", sıradaki ders kartı ve "Devam et" (süre kendiliğinden başlar). İlk gün ve "gün bitti" hâlleri (PM-047 §1) | #43 yükleme sınırı, D14 |
| A5 | 3 | Flashback ("Sen yokken köyde…": 3 kısa olay, dinleme) ve hasta modu (yalnızca dinleme, süre baskısı yok) | BEYIN |
| A6 | 2 | Yol: seviyenin üniteleri dikey yol olarak (kilitli, açık, bitti). Ünite sayfası: senaryolar, kalıplar, "yapabiliyorum" hedefleri | şema `unit` (D-098) |
| A7 | 3 | Köy haritası: çizim; kilitli ve açık mekânlar, yeni içerik ışığı; mekâna dokununca oradaki etkinlikler | WORLD, `place` |
| A8 | 4 | Radyo (Kulak Salonu): kulak oyunları, ses manzaraları, kısa bülten; hız seçimi | D5, B7 |
| A9 | 4 | Kütüphane: okuma rafı, hikâye kitaplığı, Grimm yeniden anlatımları; metin merdiveni seçimi | B5, B10 |
| A10 | 4 | Gazete bayisi: kısa haberler, "bu haberde ne anlatılıyor?" sorusu | B11 |
| A11 | 3 | Kafe: karakterle serbest konuşma; çevrimdışı dallanan diyalog, yapay zekâ varsa serbest | D4 |
| A12 | 3 | Atölye: dilbilgisi köprü dersleri, hata onarımı, der/die/das, çoğul ve hâl antrenörleri | B13, B17 |
| A13 | 3 | Bahçe: kelime tekrarı (FSRS), "duyduğum kelime" girişi, fotoğraflı kart (birim ifade, PM-047 §2) | D1 |
| A14 | 4 | Sinema: video oynatıcı; ön öğretim, izle, sorular; transkript isteğe bağlı | B8, B9, PM-031 |
| A15 | 4 | Tiyatro: sesli drama, dedektif dizisi, kendi yolunu seç | B10 |
| A16 | 3 | Pazar meydanı: gerçek dünya görevi; "prova et", "yaptım", "anlatayım" | senaryo `missions` |
| A17 | 3 | Spor salonu: hız turu, cümle kurma yarışı, sayı ve saat yakalama | R0 |
| A18 | 3 | Telefon: sesli mesajlar, akış gönderileri, mesaj grupları | B11 |
| A19 | 3 | Gelen arama (sürpriz, seans dışında değil) ve aramadan sonra değerlendirme | mevcut `#/call` |
| A20 | 4 | Posta kutusu: mektup, metin merdiveni (Kolay → Usta), form doldurma | B5, B11 |
| A21 | 1 | Ders oynatıcısı: altı aşama ve her alıştırma türü; başlık tek satır (Raute + "Seans 2/4 · 14 dk", PM-047 §1) | #49 |
| A22 | 1 | Geri bildirimin üç kademesi: her cevapta (eylem çubuğunda, görünür), etkinlik sonunda, ünite ya da seviye kapısında | #49 |
| A23 | 1 | Mola ekranı: kalan mola süresi, zil ve titreşim; 4. seanstan sonra isteğe bağlı uzun mola (PM-047 §1) | D14 |
| A24 | 1 | Rol oyunu: bekleme, 12 sn seçenekleri (Bekle / Tekrar dene / Yapay zekâsız devam), hata hâli; çevrimdışı hâl (#43) | D4 |
| A25 | 1 | Konuşma sonu raporu: önce iyi yapılan bir şey, sonra en fazla 3 düzeltme | D4 |
| A26 | 3 | "Şunu söylemek istedim": Türkçe ya da yarım Almanca → doğrusu → bankaya ekle | D4 |
| A27 | 1 | "Bu ne demek?" (uzun basma, #34) ve "Bunu Almanca nasıl derim?" | mevcut |
| A28 | 4 | Araba modu (ekrana bakmadan, büyük düğmeler, yalnızca ses), spor modu (yalnızca dinleme), uyku öncesi dinleme | D5 |
| A29 | 2 | Seviye kontrolü, ara kontrol, seviye sınavı provası (biçim tanıtımı; tarih yalnızca cihazda) | B15 |
| A30 | 2 | Ben: "yapabiliyorum" listesi ve kanıtlar, sesli günlük, kelime haritası; günlük ve haftalık dakika, seri (dil ölçütlerinden ayrı, PM-047 §1) | D14 |
| A31 | 2 | Kişisel kelime defteri: pasif ve aktif ayrı; arama, ses | D1 |
| A32 | 2 | Cep kartları ve "Yarın randevum var" hazırlığı (senaryodan 5 cümle, sesli) | senaryolar |
| A33 | 4 | Telaffuz atölyesi: kelime vurgusu, en küçük çiftler, gölge konuşma | B14, D3 |
| A34 | 4 | Podcast ve dinleme oynatıcısı: yavaş, normal, doğal, hızlı, Bairisch; transkript | B7, D5 |
| A35 | 4 | Canlı akış okuyucu (cihaz üstü RSS) ve "kendi metnini getir" | — |
| A36 | 4 | "Bütün kütüphaneyi indir": ilerleme, kesinti, kaldığı yerden devam, sha256 doğrulama, disk dolu hâli | D8 |
| A37 | 1 | "Anlamadım / Hata var": tek dokunuşla bildirim; içerik kuyruğuna gider | PM-022 |
| A38 | 2 | Ayarlar: hesap, Pomodoro (süreler), tema, arayüz dili kademesi, ses ve hız, bildirimler | D14 |
| A39 | 2 | Ayarlar: erişilebilirlik, yedekle ve geri yükle, v1'den veri taşıma, indirilen içerik yönetimi | D6 |
| A40 | 2 | Ayarlar: gizlilik, lisanslar ve atıflar (CC BY), hakkında, sürüm | D12 |
| A41 | 0 | Hata sınırı: hiçbir hata öğrenciyi ekrandan atmaz; "Tekrar dene" ve "Yedeği dışa aktar" | PM-039.2 |
| A42 | 1 | Bildirimler (günde en fazla 2) ve mevsim kartı (yalnızca mevsiminde, PM-044.1) | #49 |

## B. İçerik (İçerik Motoru; sıra İçerik Motoru planında)

| # | Dalga | Not |
|---|---|---|
| B1 | 1 | R0 temel paket (#51) |
| B2 | 1–5 | Kelime kartı: partiler 001–003 (#50), sonra K1 sırası; birim ifade (PM-047 §2) |
| B3 | 1–3 | Kalıp: 61 onaylı, kalanlar ünite sırasıyla |
| B4 | 1–3 | Senaryo: 8 aile; önce R1 ilk hafta |
| B5 | 4 | Merdivenli metin |
| B6 | 4 | Diyalog, insan sesi |
| B7 | 4 | Dinleme klibi, 5 kademe |
| B8 | 4 | Kendi kısa videolarımız |
| B9 | 4 | Deutsch im Blick (PM-031) |
| B10 | 4 | Hikâyeler, dedektif dizisi |
| B11 | 3–4 | Mektup, sesli mesaj, akış, grup, form |
| B12 | 3 | Kültür kartları, mizah, günün bilgisi |
| B13 | 3 | Türkçe konuşana özgü hata bankası |
| B14 | 4 | Telaffuz |
| B15 | 2 | Ölçme bankası |
| B16 | 1–4 | Bairisch (kaynaklı) ve `sued` |
| B17 | 3 | Dilbilgisi köprü dersleri |
| B18 | 1 | Mevsim ve takvim (Advent yayında, #49) |

## C. Duyular matrisi

İçerik Motoru sorumlu (PM-048 §3). Hücre sayımı "[İÇERİK] gün özeti"nde. Ana motorun payı her biçimin oynatıcısı:

| Beceri | Oynatıcı |
|---|---|
| Dinleme | A8, A34 |
| Okuma | A9, A10, A20 |
| Yazma | A20 ve hikâye yazma (anlamlılık değerlendirmesi D4) |
| Konuşma | A11, A24, A26 |
| Öğrenme | A12, A13, A21 |
| Görsel ve video | A14 |

## D. Sistemler

| # | Dalga | İş |
|---|---|---|
| D1 | 1 | Planlayıcı, FSRS, kapılar, döngüsüzlük, öğretmeden isteme yok (#49 kuralı), flashback ve hasta modu (A5) |
| D2 | 0 | Cevap değerlendirme (#49, D-097); haksız ret ≤ %3 ölçümü öğrenci simülasyonunda |
| D3 | 5 | Konuşma tanıma zinciri (kabuk) |
| D4 | 5 | Cihaz üstü model, çevrimiçi yedek, altın setler, 12 sn kuralı |
| D5 | 4 | Ses: insan kaydı, Piper, AVSpeech; çalma ≤ 300 ms |
| D6 | 0 | Veri: persist(), yedek, karantina, şema geçişi, v1'den taşıma (PM-039.4) |
| D7 | 0 | Çevrimdışı: servis işçisi (#43), IPA içinde paket (PM-038) |
| D8 | 4 | Kütüphane dağıtımı (Releases, PM-045 §2) |
| D9 | 5 | Uygulama içi güncelleme |
| D10 | 5 | iOS kabuğu (PM-038) |
| D11 | 0–1 | Performans: ilk açılış ≤ 2 sn, geçiş ≤ 300 ms (#43), JS ≤ 250 KB, 60 fps |
| D12 | 0 | Güvenlik ve gizlilik: #52 birleşti; B11 gizlilik taraması PM-039 |
| D13 | 0 | CI kapıları: WebKit 3 cihaz, görsel regresyon, DN-2 (#43), doğrulayıcı |
| D14 | 1 | Pomodoro (PM-047 §1): 4 × 25, molalar, odak ve mola ayrı, etkinlik dökümü |
