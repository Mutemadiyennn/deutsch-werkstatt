# [ÖĞRENCİ] 1. gün, akışla: öğrenci simülasyonu (LS-16.3)

Bayrak PR'ının kabul listesi md. 6 (PM #12 7059008858). Rol: Türkçe konuşan, Almancaya yeni başlayan yetişkin (`docs/v2/LEARNER.md`). Bilgi kısıtlı oynandı.

**Koşunun sınırları (sayıları buna göre oku):**
- Dal `v2/akis-bayrak` `c3f5ee9`. Hazır `web/dist-e2e` kullanıldı, yeniden derlenmedi. WebKit (Playwright 1.65.2, webkit-2388), iPhone 15 profili (görüş alanı 393 × 659), açık tema. Profil adsız, hızlı şerit kapalı (`login_onboard` varsayılanı).
- e2e paketi fikstürlü. 1. günün halkaları (#191) ve dersi (`r0:01-tage`) gerçek. Sesler, prova ve okuma fikstürden geliyor. Sesler gerçek içeriğe çok yakın: iki kaydın dikte maddeleri `content/v2/m1/gun-01.json` ile aynı yapıda. Video "Test klibi" fikstürü (gerçek klip-01 değil). Video bulguları sayılara girmedi, ayrıca yazıldı.
- Derlemede `gun_sinavi` yok. Bu yüzden gün sonunda "kendini dene" 0 madde gösterdi. Gün sonu, 6 kart hatırlatmasıyla geçti. Bu derleme eksiği takılan adım ya da P0 sayılmadı (baş geliştiricinin notu; düzeltildi, derleme sonra yenilenecek).
- Sesi duyamıyorum. Ses, ancak bütün sözcükleri daha önce ekranda görüldüyse "anlaşıldı" sayıldı. Mikrofon yok; "söyle" adımları yazarak oynandı (`akis-soyle` gövdesi hiç çıkmadı).
- Bilgi kuralı mekanik ve hoşgörülü:
  - Bir sözcük herhangi bir ekranda Almanca öğe olarak (`[lang=de]`, `.de-lg`, `.de`) bir kez göründüyse "gösterilmiş" sayıldı. Başarısız bir sorunun geri bildiriminde görünmek de buna dahil.
  - Bu yüzden ses 1'de önce "Bilmiyorum" dediğim sözcükler sonraki basamakta "bilinen" oldu.
  - Sayılar alt sınırdır.
- Süre ölçülmedi, çünkü bot anında cevaplıyor. İki tahmin var (yöntem §2'nin altında).
- Okumadan sonra Bugün'deki BAŞLA ders ekranını açtı (B1). Dersi yürümedim; akışa `#/akis/1` adresiyle doğrudan döndüm. Gerçek öğrenci bu adresi bilmez.
- Koşu tekrarlanabilir. Son iki koşu aynı 268 ekranı ve aynı sonuçları verdi.
- Komut: `python3 tests/e2e/ogrenci_akis.py --tohum ogrenci-gun1 --port 4317 --out /tmp/ogrenci_akis` (varsayılan WebKit + iPhone 15). Tohum yalnız yanlış şık tahmininde kullanılır.

## 1. Özet
- **Takılan adım: 0.** 268 ekranın hiçbirinde ilerleyemediğim, boş açılan, hata paneli, iskelet ya da 1 sn'yi aşan "Yükleniyor…" ekranı çıkmadı. Sayfa hatası 0.
- **Öğretilmeden istenen: 4** (fikstür video hariç). Hepsi günün ilk durağı olan **ses durağında**: halkalar başlamadan dikte merdiveni öğretilmemiş sözcükleri seçtiriyor, yazdırıyor ve kurduruyor (B1 altında P0-1).
- **Akışın kendi adımlarında** (5 halka, 2 dil noktası parçası, gün sonu) cevap istenen 118 adımın 118'inde gereken bütün Almanca daha önce gösterilmişti. Tek istisna bir tanıma sorusu: "Herr", tanıtımından 3 adım önce soruluyor (P1-2).
- **Süre:** ekran tahmini toplam ≈ 99 dk; plan 101 dk. Seans 1 (30 dk) ve seans 2 (32 dk) 27 dk sınırını aşıyor, seans 4 (11 dk) 20 dk'nın altında kalıyor.

## 2. Sayılar

| | Seans 1 | Seans 2 | Seans 3 | Seans 4 | Gün |
|---|---|---|---|---|---|
| Duraklar | ses · halka 1 · halka 2 | video · halka 3 · dil 1 | halka 4 · prova · halka 5 | dil 2 · okuma · gün sonu | 12 durak |
| Yürünen ekran | 84 | 84 | 68 | 31 | 268 (+1 Bugün) |
| Ekran tahmini | 30.3 dk | 32.0 dk (video fikstürü 16.1) | 25.5 dk | 10.7 dk | ≈ 98.6 dk |
| Plan (`tahmini_dk`, `adim_sn`) | 24.2 dk | 25.9 dk | 31.0 dk | 19.8 dk | 100.9 dk |
| (c) Öğretilmeden istenen, üretim/tanıma | 4 (hepsi ses) | 0 (+2 video fikstürü) | 0 | 0 | **4** |
| Anlama sorusu, ses anlaşılmadan | 5 (ses) | 0 (+5 video fikstürü) | 0 | 0 | 5 |
| (t) Takılan adım | 0 | 0 | 0 | 0 | **0** |
| Doğru cevabı reddedilen | 0 | 0 | 0 | 0 | 0 |
| (f) Görselsiz "resimden seç" | 0/1 | — | 0/1 | — | 0/2 (biri 4 fotoğraf, biri 4 emoji) |
| (f) Birebir tekrar eden soru | 0 | 0 | 0 | 1 | 1 (+1 fikstür) |
| (g) Anlamadığım Türkçe | 1 | 1 | 1 | 1 | 4 tür (§3) |

Durak durak (ekran · ekran tahmini · plan):

| Durak | Ekran | Tahmin | Plan |
|---|---|---|---|
| Sesler (2 kayıt) | 36 | 11.7 dk | **4.0 dk** |
| Halka 1 · Selam ve teşekkür | 21 | 8.0 dk | 9.1 dk |
| Halka 2 · Bugün ve hafta başı | 27 | 10.6 dk | 11.1 dk |
| Video (fikstür, 3 bölüm) | 43 | 16.1 dk | 9.0 dk |
| Halka 3 · Olur mu? | 28 | 11.2 dk | 11.7 dk |
| Dil noktası 1 | 13 | 4.8 dk | 5.2 dk |
| Halka 4 · Hafta sonu ve hafta | 28 | 10.3 dk | 11.1 dk |
| Prova | 8 | 3.0 dk | 7.0 dk |
| Halka 5 · Dün, öbür gün, muayenehane | 32 | 12.2 dk | 12.9 dk |
| Dil noktası 2 | 15 | 5.6 dk | 6.5 dk |
| Okuma | 9 | 2.5 dk | 7.0 dk |
| Gün sonu (kendini dene yok, sınırlar) | 7 | 2.7 dk | 6.3 dk |

**Süre yöntemi:** (1) Plan sütunu: `policy.akis.adim_sn` ile planlayıcının `tahmini_dk`'sı. Adımsız durakta (ses, video, prova, okuma) `sabit_dk` ya da video kuralı kullanılır. (2) Ekran tahmini: yürünen her ekran × `EKRAN_SN` tablosu (`tests/e2e/ogrenci_akis.py`). Tablodaki süreler yeni başlayan, Türkçe okuyan ve sesi bir kez dinleyen biri içindir:
- Tanıtım 25 sn, kalıp 30 sn, tablo 40 sn.
- Seçmeli 12 sn, yazarak üretim 25 sn, yapboz 22 sn, boşluk 18 sn, eşleştir 35 sn, sahne 60 sn.
- Medya: dinle 40 sn, metin 45 sn, dikte 25 sn.
- Prova: hazırlık 50 sn, konuşma turu 25 sn.
- Okuma metni 60 sn.

Policy aralığı: seans 20–27 dk, gün 85–105 dk. İki yöntem arasındaki büyük fark adımsız duraklarda. Ses durağı planda 4 dk, ama iki kaydın tam merdiveni 36 ekran sürüyor.

## 3. Bulgular

**B1 · P0-1 · Ses durağı · halkalardan önce öğretilmemiş sözcük yazdırıyor ve kurduruyor.** Gün `#/akis/1` ile ses durağından başlıyor. Durak girişi "Bugünün kısa ses kayıtlarını dinleyeceksin. Yaklaşık 4 dakika." diyor; "Başla" Medya oynatıcısını açıyor. Oynatıcı tam merdiveni oynatıyor: ana fikir, ayrıntı, dikte 1–5, gölge, "Sen ne derdin?". Bu noktada ekranda Bugün'deki "Servus. Merhaba." dışında hiç Almanca görülmemişti.

| Ekran | Adım (ekran metni) | İstenen öğe | Durum |
|---|---|---|---|
| 7 | Ses 1 · "Dikte 1/5 · Hangi kelimeyi duydun?" (Dienstag / Sonntag / Freitag) | Freitag (tanıma) | gösterilmemiş |
| 8 | Ses 1 · "Dikte 2/5 · Boşluğa duyduğun kelimeyi yaz": "Danke und bis ___!" | Montag (yazma) | gösterilmemiş |
| 9 | Ses 1 · "Dikte 3/5 · Duyduğun cümleyi kelimelerden kur" | Heute und am Wochenende ist die Praxis geschlossen. | am, die, geschlossen, heute, ist, Wochenende gösterilmemiş |
| 28 | Ses 2 · "Dikte 4/5 · Duyduğun cümleyi yaz" | Danke und schönes Wochenende! | "schönes" gün boyunca hiçbir ekranda yok |

Gerçek içerikte aynı maddeler var:
- a1 d1 "Freitag", d2 "Montag", d3 "Am Samstag und am Sonntag ist die Praxis geschlossen."
- a2 d4 "Danke und schönes Wochenende!"

Yani bu bulgu fikstürden kaynaklanmıyor. Ayrıca ses 1'in 3 anlama sorusu ve ses 2'nin 2 anlama sorusu (Mittwoch) cevaplanamadı. "Önce duy" için ses başta durabilir. Ama dikte, gölge ve "Sen ne derdin?" halkalardan sonra gelmeli, ya da ses durağı başta yalnız "dinle + ana fikir" olmalı. Bu karar baş geliştiricinin.

**B2 · P1-1 (pilot için engel adayı) · Bugün · okumadan sonra BAŞLA akışa değil 56 adımlık ders ekranına gidiyor.**
- Ekran 260'ta okuma bitti. "Sıradaki adım" Bugün'e götürdü.
- BAŞLA `#/ders/r0%3A01-tage` açtı ("1. gün · Temel ders · Günler", "1 / 56 · Önce dinle").
- Bugün'de akışa giden bağlantı yok. Var olanlar: `#/ders/r0%3A01-tage` "Seans 2 · Ders: Günler" ve `#/garden/1` "Kelime Bahçesi: tekrar et".
- Akışın gün sonu durağına (kabul md. 4'teki "gün sonu") BAŞLA'yı izleyen öğrenci ulaşamıyor.
- Neden: `web/src/core/gun.ts:67` akışa yalnız Bahçe düğümünün bağlantısını veriyor. Bahçe anahtarı 5. halkada yazılınca BAŞLA sıradaki bitmemiş düğüme, yani derse geçiyor.
- Dil noktası iki parçada zaten akışta oynandı. Ders ekranı 1/56'dan başlıyor, bu yüzden aynı maddeler ikinci kez "yeni" diye gelecek. PM'in ayrı PR'a bıraktığı "DersEkrani başlangıç adımı" işi bu bulguya dokunuyor.
- Takılan adım sayılmadı, çünkü ekran açılıyor; ama gün yanlış yere gidiyor.

**B3 · P1-2 · Halka 3 · "Herr" tanıtımdan önce soruluyor.**
- Adım `m1:01:h3:a59`: "Dinle: ne demek?" (salı / bay, bey, beyefendi / çarşamba / cuma).
- Kartın tanıtımı ("Yeni kelime · Danke, Herr Wimmer!") 3 adım sonra, `a62`'de geliyor.
- Planın tamamında tanıtımından önce kullanılan tek kart bu.
- Mekanik kuralda "bilinen" sayıldı, çünkü "Herr" ses 2'nin metninde ("Herr/Frau (adın)") görülmüştü. Anlamı ise hiç gösterilmemişti.

**B4 · P1-3 · Halka 4 · örneksiz kalıp (adsız profil).**
- Ekran 189: "Yeni kalıp · Guten Tag, hier ist ___ . · İyi günler, ben …." Örnek yok.
- Türkçesinde çift nokta var ("ben ….").
- 12 kalıp ekranının 11'i çerçeve başına örnekli. Bu kalıp adsız profilde örneğini kaybediyor.
- PM md. 2: "örneksiz kalıp kalmaz".

**B5 · P2 · (g) Seans etiketi çelişiyor.**
- Ses, video, prova, okuma ve ders ekranlarının üstünde bütün gün "Seans 1/4 · 25 dk" (sonra 24, 23, 22 dk) yazıyor.
- Akış ise halka sonunda "2. seans: 0/3 durak tamam", "4. seans: 0/3 durak tamam" diyor.
- Seans 4'teki okumada üstte "Seans 1/4 · 22 dk" yazıyor. Hangi seanstayım, 22 dk neyin süresi, anlamadım.

**B6 · P2 · (g) "(adın)" akış dışındaki duraklarda sürüyor.** Akış ekranlarında 0. Adımsız duraklarda 6 ekran:
- Ses 2 metni: "Guten Tag, Herr/Frau (adın)."
- Prova: hazırlık ve 3 konuşma ekranı, ör. "Guten Tag, Herr/Frau (adın). Geht Dienstag?"
- Okuma: "Hallo (adın), hier ist Ioana."

**B7 · P2 · Video · ön öğretim "+3" çipi dar bir şeritte.**
- Bölüm 1 "Baştan sona dinle" ekranında çip ilk açılışta eylem çubuğunun altında.
- Sayfa en sona kaydırılınca bu kez yapışkan video alanının altında kalıyor. Yapışkan alan 285 px yüksekliğinde ve altı 425 px'te; eylem çubuğu 529 px'ten başlıyor.
- Playwright'ın otomatik kaydırması dokunamadı. 105 px elle kaydırınca açıldı.
- Ön öğretim kelimeleri (öğrencinin klipten önce görmesi gerekenler) iPhone 15'te ancak yaklaşık 100 px'lik bir şeritte okunuyor. Fikstürün kelimeleri klibe uymuyor ("ursprünglich", "gelebt"); bu bulgu yerleşim için.

**B8 · P2 · Süre tahminleri adımsız duraklarda tutmuyor.**
- Ses: plan 4 dk, yürünen 36 ekran ≈ 12 dk.
- Prova: plan 7 dk, yürünen 8 ekran ≈ 3 dk.
- Okuma: plan 7 dk, yürünen 9 ekran ≈ 2.5 dk; 1. günde yazma kısmı yok.
- Plan kendi içinde de seans 3'te 31 dk gösteriyor (sınır 27).
- Seans 4, gün sonu sınavı gelince uzayacak.

**B9 · P2 · (f) Birebir tekrar.**
- "Geht Freitag?" → "Freitag geht." Dil noktası 1'de (d30, "Derya cuma gününü öneriyor") ve okumanın son sorusunda (o5, "Cuma sana uyuyor. Ioana'ya cevap ver.") aynı istem ve aynı cevap.
- "Welcher Tag ist heute?" gün içinde 3 kez kuruldu: halka 4 yapbozu, dil 2 sıraya koy (d11), 3 adım sonra dil 2 "Almanca yaz" (d23). Sıra-sonra-yaz ilerlemesi olarak kabul edilebilir.
- Fikstür videonun "Sen ne derdin?" sorusu 3 bölümde birebir aynı ("Ioana mikrofonu sana uzatıyor. Bugün perşembe."). Fikstürden kaynaklanıyor.

**B10 · P2 · Tek kelimelik "Almanca yaz" ekranında "Bilmiyorum" yok.**
- `gq-tr_de` 24 ekran. Cümleli üretimde (`akis-tr-de`, boşluk, yapboz) "Bilmiyorum" var; tek kelimede bilmeyen öğrenci bir şey yazmak zorunda.
- Bu koşuda her kelime biliniyordu, o yüzden engel çıkmadı.

**B11 · P2 · (g) Bugün'de akışın adı "Kelime Bahçesi".** "1. gün · Kelime Bahçesi · 19 yeni kelime ve tekrar" yazıyor. Açılan şey halkalar, dil noktası ve sahnelerden oluşan günün tamamı. Ses, video, prova ve okuma bitince "Sıradaki adım" Bugün'e götürüyor; akışa dönmek için her seferinde bir kez daha BAŞLA gerekiyor (4 kez).

**İyi çalışanlar**
- Halkalarda her yeni kelime önce cümlesiyle gösteriliyor, sonra duyuluyor, sonra kuruluyor. 118 cevaplı adımın hepsi gösterilen parçalarla kurulabildi.
- Yapbozda küçük sözcüklerin altında Türkçesi var. Kalıplar örnekleriyle geliyor.
- Eşleştirme 5/5 tamamlandı. Halka sonu dört noktayı adlarıyla (gör, duy, kur, söyle) gösteriyor.
- Prova hazırlığı söyleyeceğim her cümleyi dinletti ve Türkçesini verdi. Üç konuşma turunun üçünü de hazırlıktaki cümlelerle kurdum.
- Dil noktası tablosu (günler ve kısaltmalar) tek ekranda okundu; ilk parçanın hatırlatması ikinci parçanın başında geldi.
- Gün sonu bitince Bugün 2. güne geçti ve "1. gün bitti" kartını gösterdi.

## 4. Gerçek cihazda denenmesi gerekenler
1. Video ön öğretim çiplerinin (B7) iPhone 15'te Safari araç çubuğuyla birlikte görünüp görünmediği. Klavye çubuğu açıkken dikte ekranı.
2. Ses durağının gerçek süresi: iki kayıt, Yavaş ve Normal, 36 ekran (B1, B8).
3. Mikrofonla "söyle" adımları: bu koşuda hiç çıkmadılar.
4. Okuma bittikten sonra BAŞLA'nın nereye gittiği (B2).

## 5. Yeniden koşma
```sh
python3 tests/e2e/ogrenci_akis.py --tohum ogrenci-gun1 --port 4317 --out /tmp/ogrenci_akis
# çıktı: kayit.json (ekran ekran: gereken sözcükler, eksik, cevap), ozet.json, bilinen.json, ekranlar.txt (her ekranın metni)
```

## Ek: baş commit koşusu (ANA, 21.11 — PR #193 inceleme 1. tur P1-3)
`v2/akis-bayrak` `79be188` + e2e fikstürlü paket (1. gün gerçek halkalar ve günün sınavıyla), WebKit iPhone 15, `python3 tests/e2e/ogrenci_akis.py --tohum ogrenci-gun1 --port 4317`.
- Öğretilmeden istenen: **kesin 0**, sınırda 0 (önceki koşu 4: ses durağındaki dikte ve "Sen ne derdin?"; akış günü K(t) süzgeci `dikteSuz`).
- Takılan adım 0 · reddedilen doğru cevap 0 · sayfa hatası 0.
- Seans (ekran tahmini / plan `adim_sn`): 25,3 / 23,9 · 26,4 / 19,1 · 25,5 / 28,7 · 12,2 / 10,5 dk.
- Açık: "der Herr" anlamı tanıtımından önce (P1-2) — bkz. ilk koşu.
