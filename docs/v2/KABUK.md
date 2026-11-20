# KABUK — iPhone kabuğu tasarım notu (PM-071 2. adım)

Durum: **taslak, PM onayı bekliyor.** Bu belgede kod yok. Kabuk 2 tek derleme olarak bu nota göre yapılır (PM-071 3. adım).
Hedef cihaz: **iPhone 15 Pro Max** (A17 Pro; CI matrisinde var). Proje sahibinin sözü: "Telefonun desteklediği her şeyi kullanalım, faydası varsa."

## 0. İlkeler (değişmez)

1. **Tek kod tabanı web uygulamasıdır.** Kabuk bir yetenek katmanıdır, ikinci bir uygulama değildir. Hiçbir ekran `Capacitor`'ı doğrudan çağırmaz. Her yetenek `web/src/services/` altında tek bir arayüzün arkasındadır: kabukta yerel, tarayıcıda web yedeği (bugünkü örnekler: `speech.ts`, `haptics.ts`, `focusRuntime.ts`, `kabuk.ts`).
2. **Sessizce düşmek serbest, sessizce kırılmak yasak.** Cihaz, iOS sürümü, Apple Intelligence ayarı ya da izin uygun değilse uygulama web/sunucu yoluna düşer. Kabukta neyin var olduğu "Ses ve mikrofon" ekranındaki kabuk satırında görünür (1. adım, `kabuk.json`).
3. **Para yok.** Proje sahibi ücretli geliştirici hesabı kullanmıyor. Ücret gerektiren her şey (Apple Developer Program, uzak bildirim için APNs vb.) `[PM-KİLİT]`.
4. **Ölçmeden "kazanç" yazılmaz.** Her satırın "ölçü" sütunu, Kabuk 2 kabulünde gerçek cihazda bakılacak şeydir.

## 1. Kurulum gerçeği: ücretsiz imzalama ne verir, ne vermez

Bugün CI imzasız bir IPA üretiyor (`CODE_SIGNING_ALLOWED=NO`). Telefona kurulurken IPA, proje sahibinin ücretsiz Apple hesabıyla imzalanıyor (kişisel takım). Bunun sonuçları:

- **Kurulum aracı:** proje sahibi IPA'yı GitHub Actions'tan alıp **Impactor (Linux)** ile kuruyor; ücretli Apple Developer hesabı yok ve açılmayacak (`phases/02-H2.md`). Yani yenileme elle yapılıyor ve kabuk nadiren değişmeli.
- **İmza 7 gün geçerli; ücretsiz hesapla aynı anda en çok 3 uygulama.** Yenileme şart: Impactor ile yeniden kurulum gerekiyor. Kaynak: [Engadget](https://www.engadget.com/2315074/how-to-sideload-apps-ios-even-in-united-states/), [XDA](https://www.xda-developers.com/how-to-sideload-apps-on-iphone/).
- **Kişisel takımda uzak bildirim (Push) ve iCloud yok.** Kaynak: [Apple geliştirici forumu, DTS yanıtı](https://developer.apple.com/forums/thread/811929). Uzak bildirime dayanan her şey (sunucudan Canlı Etkinlik güncellemesi, uzak bildirim) kapsam dışı.
- **Kişisel takımın yetenek listesi** Apple'ın "Supported capabilities (iOS)" tablosunun "Apple Developer" sütunudur. Kaynak: [Apple](https://developer.apple.com/help/account/reference/supported-capabilities-ios). Tablonun metin çıktısına göre App Groups ve Background Modes bu sütunda var, Push yok. **Ölçü:** Kabuk 2 derlemesinde her eklenen yetenek için ücretsiz imzalı kurulum denenir.
- **Uygulama eki (widget, Canlı Etkinlik, paylaşım eki) ayrı bir uygulama kimliği ister.** Ücretsiz hesapta kimlik sayısı haftalık sınırlıdır. Ek eklemek kurulumu kırabilir. **Karar önerisi:** Kabuk 2'de en çok **bir** ek (Canlı Etkinlik/widget ortak eki). Paylaşım eki yok.
- **Soru (PM'e):** telefondaki iOS sürümü kaç? Cihaz üstü dil modeli ve yeni konuşma tanıma iOS 26 ister.

## 2. Yetenek tablosu

Sütunlar: **Cihazda** (iPhone 15 Pro Max'te var mı) · **Kazanç** · **Ücretsiz imza** · **Risk** · **Web yedeği** · **Ölçü** (Kabuk 2 kabulünde gerçek cihazda bakılacak).

| # | Yetenek | Cihazda | Kazanç | Ücretsiz imza | Risk | Web yedeği | Ölçü |
|---|---|---|---|---|---|---|---|
| a | **Konuşma tanıma (de-DE, cihaz üstü)**. iOS 26'da SpeechAnalyzer/SpeechTranscriber, eskide SFSpeechRecognizer; kısmi sonuçlar, sessizlik algısı (SpeechDetector) | Var. SpeechTranscriber ilk sürümden Almancayı destekliyor ([addpipe](https://blog.addpipe.com/apple-speechanalyzer-api/)); iOS 26 şart | Web görünümünün mikrofon hatalarından kurtulur; izin bir kez (R1-29); internetsiz çalışır | Özel yetki istemez (yalnızca kullanım açıklaması) | Bugünkü topluluk eklentisi eski API'de; yeni API için kendi küçük Swift eklentimiz gerekir (bakım yükü) | Tarayıcı tanıması → yazarak cevap | 10/10 denemede açılır, izin yeniden sorulmaz; "Guten Morgen" tanınır; uçak modunda tanır |
| b | **Ses kaydı ve ses oturumu**: yerel kaydedici; kayıt↔çalma geçişinde kesilme yok; kulaklık, sessiz tuşu, gelen arama | Var | Gölgeleme ve konuşma provasında güvenilir kayıt; arama gelince uygulama doğru durur | Özel yetki yok | Ses oturumu kategorisinin (`playAndRecord`) seslendirmeyi kısması; dikkatle ayarlanmalı | `MediaRecorder` | Kayıt→çal→kayıt 10 kez kesintisiz; kulaklık takıp çıkarınca ses doğru yere gider; sessiz tuşunda ses çalar |
| c | **Seslendirme (AVSpeechSynthesizer)**: yüklü "Gelişmiş/Premium" Almanca sesleri güvenilir listeleme, karaktere sabit ses, gerçek hız; önceden üretilmiş ses dosyaları (B15 2. adım) için yerel çalıcı | Var | Web görünümünde ses listesi geç ve eksik geliyor; yerelde tam liste, kadın/erkek ayrımı kesin | Özel yetki yok | Yok denecek kadar az | Web Speech API (bugünkü) | Kadın/erkek karakter ayrışır; "Gelişmiş" ses varsa o seçilir; hız 0,75× gerçekten yavaşlar |
| d | **Arka planda dinleme ve kilit ekranı denetimleri** (çal/durdur, 10 sn geri) | Var | Kulak Salonu ekran kilitliyken sürer | Background Modes (audio), kişisel takımda var | Web görünümünde `<audio>` kilitte durabilir; yerel çalıcı gerekir (c ile ortak) | Ekran açık kalır | Ekran kilitliyken 10 dk çalar; kilit ekranında başlık ve denetimler görünür |
| e | **Paket içi uygulama + canlı güncelleme**: kabuk web paketini taşır, yeni sürümü arkadan indirip sonraki açılışta geçer; geri alma korunur | Var | Anında açılış, uçak modunda tam çalışma | Özel yetki yok | **En büyük risk: Google girişi.** Paket içinden açılan sayfa `capacitor://localhost` kökeninde; Firebase web girişi yetkili alan adı ister. Yerel Google girişi eklentisi gerekir. Ayrıca güncelleme mekanizması kendi kodumuz (ücretli bulut güncelleme hizmeti yok) | Bugünkü "canlı siteyi aç" modeli (kabul ölçütüne kadar yerinde kalır) | Açılış ≤ 1,5 sn; uçak modunda bir tam gün; giriş bir kez; kötü paket gelince eski sürüme döner |
| f | **Dosya sistemi medya rafı**: görseller, sesler, klipler uygulama klasöründe; indirme kuyruğu | Var (büyük depolama) | Tarayıcı kotası ve "Safari verisini sil" riski yok | Özel yetki yok | Taşıma: mevcut IndexedDB önbelleği bir kez taşınmalı | IndexedDB/Cache API | Uçak modunda bir günün bütün medyası açılır; 1 GB rafta kota uyarısı yok |
| g | **Yerel bildirim**: günlük hatırlatma, seri tehlikede, "5 dakikalık tekrar hazır"; rozet | Var | Uygulama kapalıyken öğrenciyi geri çağırır (LS-10) | Yerel bildirim özel yetki istemez; uzak bildirim yok (kişisel takım) | Bildirim yorgunluğu; günde en çok 2 | Yok (web'de güvenilir değil) | Ayarlanan saatte gelir; dokununca doğru ekrana açılır; rozet sayısı doğru |
| h | **Dokunsal geri bildirim, ekranı açık tutma, güvenli alan, klavye** (ä ö ü ß satırı) | Var | Doğru/yanlış hissi; ders sırasında ekran kararmaz | Özel yetki yok | Klavye satırı yerel ek ister; önce web içi satır (zaten var mı bakılacak) | `navigator.vibrate` (iOS'ta yok) | Doğru/yanlış/kutlama üç ayrı titreşim; 25 dk derste ekran kararmaz |
| i | **Cihaz üstü dil modeli (Foundation Models köprüsü)**: yalnızca çevrimdışı yedek sohbet (kısa tur), anında ipucu, yazılan cümleye ön geri bildirim, beklerken ilk tepki (PM-070) | Var: A17 Pro'da çalışır, iOS 26 ve Apple Intelligence açık olmalı ([kaynak](https://dev.to/arshtechpro/apples-foundation-models-framework-run-ai-on-device-with-just-a-few-lines-of-swift-lbp)) | Ücretsiz, internetsiz, kota yok | Temel kullanım için özel yetki yok (yalnızca özel ayarlı model eki için var; biz kullanmıyoruz) | Bağlam penceresi küçük (≈4.096 belirteç, girdi + çıktı; [InfoQ](https://infoq.com/news/2026/03/apple-foundation-models-context)) → uzun rol oyunu yok; Almanca kalitesi ölçülmeli | Sunucudaki büyük model; o da yoksa yapay zekâsız mod | PM-070'deki 40 hatalı cümle seti: eşik altındaysa yalnızca ipucu/yedek rolü; ilk tepki ≤ 1 sn |
| j | **Canlı Etkinlik / Dynamic Island** (odak sayacı), **ana ekran widget'ı**, **Kısayollar / Eylem düğmesi** ("5 dakikalık tekrar"), **paylaşım eki** | Var (Dynamic Island, Eylem düğmesi) | Odak seansı kilit ekranında; tek tuşla tekrar | Canlı Etkinlik yerel güncellemeyle çalışır, push gerekmez (Apple: [Live Activities ekibi](https://developer.apple.com/news/?id=qpqf1gru)). Widget ekiyle birlikte **bir ek** gerekir (§1 sınırı). Kısayollar (App Intents) ek istemez. Paylaşım eki: **yapılmaz** (ikinci ek) | Ek, ücretsiz kurulumun kimlik sınırını zorlar | Yok | Odak sayacı kilitte ve adada görünür (geri sayım `Text(timerInterval:)` ile kendiliğinden işler; "mola bitti" durumuna geçiş push olmadan ancak uygulama açıkken ya da yerel bildirimle olur, ölçülecek); Eylem düğmesinden 5 dk tekrar açılır |
| k | **Performans**: açılış, kaydırma, ses gecikmesi; **ProMotion 120 Hz** | Var (120 Hz) | Akıcılık | — | Web görünümü 120 Hz'i her zaman vermez | — | Önce/sonra: soğuk açılış (sn), ses başlama gecikmesi (ms), kaydırmada kare düşmesi. Proje sahibinin ölçeceği kısa liste qa'dan |

## 3. Öneri: Kabuk 2 kapsamı (tek derleme)

**Girer:**
- a (yeni tanıma, iOS 26 + eski API yedeği)
- b ve c (tek yerel ses eklentisi: kayıt + seslendirme + çalıcı)
- d
- f
- g
- h
- i (yalnızca köprü + ölçü; kullanım PM-070 eşiğine bağlı)
- j'den Canlı Etkinlik + Kısayollar (tek ek)
- sürümler sabit, `ios/` depoda, CI her PR'da simülatör derlemesi

**Ayrı karar (PM):** e (paket içi uygulama). Kazancı büyük ama Google girişini yeniden kurmayı gerektiriyor. Önerim: Kabuk 2'de **canlı adres modeli kalır, açılış adresi `/v2/` olur**. Paket içi model Kabuk 3'e ve giriş denemesine bağlanır.

**Girmez:** uzak bildirim, iCloud (kişisel takımda yok), paylaşım eki (ikinci ek), ücretli bulut güncelleme hizmeti.

## 4. Açık sorular (PM'e)

1. Telefondaki iOS sürümü (§1). Kurulum aracı belli: Impactor (Linux).
2. e maddesi: Kabuk 2'de mi, Kabuk 3'te mi (öneri: Kabuk 3)?
3. Bildirim sıklığı üst sınırı: günde en çok 2 (öneri).
