<!-- Kaynak: proje sahibinin "EK 2 — iPHONE ÖN YÜZ UZMANLIK STANDARDI (… işini bölme, bütün v2 ekranlarına uygula)" mesajı.
     DİKKAT: Özgün metin sohbette geldi ve bağlam sıkıştırmasından sonra yalnızca ayrıntılı özeti kaldı. Aşağıdaki kurallar eksiksizdir,
     ifade birebir değildir. Proje sahibi tam metni gönderirse bu dosya onunla değiştirilir. -->

# EK 2 — iPHONE ÖN YÜZ UZMANLIK STANDARDI

İşini bölme; bütün v2 ekranlarına uygula.

1. **Klavye:** lang=de; otomatik düzeltme ve otomatik büyük harf kapalı; spellcheck=false; autocomplete kapalı. ä ö ü ß Ä Ö Ü şeridi. Alan ve düğme visualViewport ile klavyenin üstünde görünür kalır. iOS'un otomatik nokta/boşluk/büyük harf eklemesi notu etkilemez.
2. **iOS davranışı:** -apple-system / SF Pro yazı tipi; dokunma hedefleri ≥44 pt; dokunma vurgusu kapalı; Almanca metin dışında uzun basma menüsü ve metin seçimi yok (Almanca metinde uzun basma = "Bu ne demek?"); kontrollü kaydırma taşması (overscroll); yatay taşma yok; güvenli alan 59 px testi.
3. **Almanca tipografi:** hyphens:auto; 320 ve 390 px'te taşma yok (en uzun 50 kelimeyle test).
4. **Ses ve mikrofon:** izin isteminden önce Türkçe açıklama; görünür kayıt göstergesi; bas-konuş ve dokun-başlat/dokun-bitir; kesintilerin yönetimi; hazır seslerde oynatma gecikmesi ≤300 ms.
5. **Performans:** etkileşime hazır olma ilk açılışta ≤2 sn, sonra ≤1 sn; 60 fps; uzun listelerde sanallaştırma; JS ≤250 KB (gzip); içerik ve fotoğraflar tembel yüklenir.
   > Not (baş geliştirici, PM 7061394696; D-126): "JS ≤250 KB" ilk açılış JS'idir (giriş parçası + statik bağımlıları); toplam JS ≤ 300 KB büyüme bekçisidir.
6. **Erişilebilirlik:** %130'a kadar yazı boyutu; azaltılmış hareket; WCAG AA kontrast; VoiceOver etiketleri.
7. **Tasarım sistemi:** belirteçler (token); 4/8 boşluk ızgarası; yalnızca ortak bileşenler; haptik eşlemesi: başarı / hata / seçim.
8. **Test:** iPhone 15/16 profilleriyle WebKit uçtan uca testleri zorunlu; CI'da görsel regresyon; gerçek iPhone kontrol listesi.

**Rapor:** bu 8 maddenin her biri için "yapıldı / kısmen / yapılmadı" tablosu ve ölçülen değerler (açılış süresi, paket boyutu, fps, WebKit test sonucu).
