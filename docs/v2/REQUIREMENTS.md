# Deutsch Werkstatt 2.0 — GEREKSİNİM KAYDI

> Sahibi: proje yöneticisi (PM). Tarih: 17.11.2026. Kişisel bilgi içermez.
> Amaç: Proje sahibinin bugüne kadar söylediği **hiçbir istek**, v1'in **hiçbir özelliği ya da kuralı** ve PM'nin **öngördüğü hiçbir risk** sessizce kaybolmasın.
> Kural: Her PR açıklaması karşıladığı RQ kimliklerini listeler. PM her denetimde bu kayıtla karşılaştırır. Bir maddeyi kaldırmak ya da ertelemek yalnızca PM kararıyla olur ve DECISIONS.md'ye yazılır.
> Durum sütunu: `?` henüz denetlenmedi · `✓` karşılandı (kanıt bağlantısıyla) · `~` kısmen · `✗` eksik · `→Rn` o sürüme planlı.

---

## A. Proje sahibinin istekleri

| Kimlik | İstek (sahibin kendi ifadesine yakın) | Karşılığı | Sürüm | Durum |
|---|---|---|---|---|
| RQ-S01 | Dışarıda rahat, korkusuzca konuşmak; doktorda derdini, memura işini, markette ürün sorusunu, berberde isteğini, spor salonunda "kaç setin kaldı" sorusunu anlatabilmek | LS-0.1, LS-2.3, alan haritası | R1–R4 | ? |
| RQ-S02 | Telefon açmaktan korkmamak; aranınca açabilmek | LS-9.2, LS-11.2 | R1–R3 | ? |
| RQ-S03 | İş yerinde molada sohbete katılmak, sadece dinleyen olmamak | LS-9.3, H4 §6 | R2 | ? |
| RQ-S04 | İngilizceye kaçma alışkanlığını kırmak | LS-0.2, strateji alanı, ölçüm | R1+ | ? |
| RQ-S05 | Hızlı konuşmayı ve Bavyera ağzını anlamak | LS-8 | R1–R4 | ? |
| RQ-S06 | Hochdeutsch + günlük dil + Bairisch birlikte | PEDAGOGY §1-12 | R1+ | ? |
| RQ-S07 | Gramerden ve işe yaramayan kelime ezberinden bıkmışlık: gramer yalnızca konuşmaya hizmet etsin | LS-0.3, LS-4.2, PEDAGOGY ilke 8 | R1+ | ? |
| RQ-S08 | "Kelimeyi bilmiyorsam, cümle kuramıyorsam nasıl konuşacağım?" → yöntem | LS-6 (kurma merdiveni), LS-6.3 | R1 | ? |
| RQ-S09 | Günlük hayatta karşılaşılacak kelimelerin tamamına hazırlık; 500–600 kelime yetersiz | LS-7, PEDAGOGY §2 (5.000 lemma) | R1–R4 | ? |
| RQ-S10 | Kelimeler fotoğrafla ve cümle içinde; yanlış yapılan kelime **başka cümle ve başka fotoğrafla** geri gelsin | PM-003, LS-7 | R1 | ✗ (v2'de yok) |
| RQ-S11 | Pixabay anahtarı var; fotoğraflar Pixabay'dan da gelebilsin | PM-003 | R1 | kısmen (MEDYA aracı `/v1/pixabay`, PR #189) |
| RQ-S12 | Pomodoro: 25/5, günlük 100 dk hedef, v1'deki takip korunsun | LS-5.1, H3, AUDIT §11 | R1 | ~ |
| RQ-S13 | Günde 2–3 saat çalışabilme (100 dk varsayılan + ek seans) | LS-5.1 | R1 | ? |
| RQ-S14 | Açıklama dili Türkçe; İngilizce öğretim dili değil | PEDAGOGY, D-kararı (yanlış arkadaş istisnası) | R1+ | ? |
| RQ-S15 | Uygulama kısır döngüye girmesin, sıkmasın; v1 iki günde bırakıldı | LS-12.3, H4 §4, LS-16.2 | R1+ | ? |
| RQ-S16 | Arabada yalnızca dinleyip konuşabilme; sporda yalnızca dinleyebilme | LS-5.5 | R1 (araba), R2 (spor) | ? |
| RQ-S17 | Oyun gibi, dopamin veren ilerleme (XP, seviye) ama işe yarar | LS-13 | R1–R2 | ? |
| RQ-S18 | Telefonda yaptığı hataların doğrusunu öğrenebilmek | LS-10.5 | R1 | ? |
| RQ-S19 | Öğretim kalitesi 1 numara; 2 numara: hatasız, API hatasız, ücretsiz çalışan uygulama | LS-14, PM-004 | Her sürüm | ? |
| RQ-S20 | Ücretsiz Gemini en verimli şekilde; ücretsiz alternatif varsa o da | PM-004 | R1 | ? |
| RQ-S21 | Hiçbir şeye para ödenmesin | K-03 | Her sürüm | ? |
| RQ-S22 | B1 sınavı hedeflerden biri (tarih yalnızca ayarlarda) | LS-15, PM-001 | R5 (+ayar R1) | ? |
| RQ-S23 | Yetişkin dil kursuyla paralel gitmek (kursta işlenen konu) | LS-5.7 | R2 | ? |
| RQ-S24 | Arayüz v1'den geri gitmesin, daha uzman olsun | EK1, EK2 | Her sürüm | ~ |
| RQ-S25 | iPhone'da çalışsın; bilgisayar yalnızca kurulum için açılsın | Capacitor + CI | R1 | ~ |
| RQ-S26 | Öğrenci gibi test edilsin: robot değil, gerçekten öğrenmeye çalışan biri | LS-16.3, PM_PLAYBOOK | Her sürüm | ? |
| RQ-S27 | Altı ay sonra korkusuzca konuşabilmek: sonuç ölçülsün | LS-0.2, LS-16.1 | R1+ | ? |
| RQ-S28 | Nihai hedef: günlük hayatta neredeyse ana dil rahatlığı; uygulama B1'den sonra da öğrenciyle büyür (PM-009) | LS-0.4, LS-17 R6–R8, YOL_HARITASI §2 | R1+ (R6–R8) | ? |

## B. v1'in değişmez kuralları (HANDOFF §2)

| Kimlik | Kural | Durum |
|---|---|---|
| RQ-K01 | Kişisel bilgi kodda, prompt'ta, içerikte, testte yok; depo herkese açık | ? |
| RQ-K02 | Anahtarlar kimsenin göremeyeceği yerde (v2: yalnızca Worker gizli değişkeni); koda, depoya, loglara asla girmez | ? |
| RQ-K03 | Para kesilmez: ücretli API, ücretli katman, faturalandırma yok | ? |
| RQ-K04 | Yalnızca sahibin hesabı erişebilir (v2: Worker uid izin listesi + Firestore kuralları) | ? |
| RQ-K05 | Marka ve telif: başka uygulamaların varlıkları kopyalanmaz; maskot özgün; telifli transkript gömülmez | ? |
| RQ-K06 | Hiçbir özellik sahibe sorulmadan kaldırılmaz; liste halinde sunulur | ? |
| RQ-K07 | Safe area her ekranda (59 px testi) | ? |
| RQ-K08 | Seslendirme noktalama ve işaret okumaz; karışık dilli satır bölünüp her parça kendi diliyle okunur | ? |
| RQ-K09 | Amatör etiket yok; uzman elinden çıkmış görünüm | ? |
| RQ-K10 | Kalite için tasarruf yok; limit dolunca kaldığı yerden devam | ? |

## C. v1'de sahibin şikâyetleri (v2 bunları tekrarlamamalı)

| Kimlik | Şikâyet | v2 karşılığı | Durum |
|---|---|---|---|
| RQ-Ş01 | Dersler arasında 30–40 sn bekleme, sonra hata ve menüye atılma | Hazır içerik; yapay zekâ bloklamaz; hata aynı ekranda | ? |
| RQ-Ş02 | İçerik hep aynı eksende (iş/spor/aile); "kusacaktım" | LS-12.3, H4 dünya + takvim | ? |
| RQ-Ş03 | Canlı sohbette karşı taraf hiç düzeltmiyordu | Destekli modda anında, bağımsızda sonda (LS-10.2) | ? |
| RQ-Ş04 | Konular rastgele ("çorba"); sıralı yol istiyor | Tek "Bugün" yolu, alan içinde sıralı senaryolar | ? |
| RQ-Ş05 | Konuşma derslerin içinde değil ayrı yerdeydi | Her senaryonun aşama 5–6'sı konuşma | ? |
| RQ-Ş06 | İlerleme hissetmiyordu | LS-11.3, LS-13.3–13.4, 60 sn kayıt karşılaştırması | ? |
| RQ-Ş07 | Kelimeyi fotoğrafla ve cümle içinde öğrenmek; yanlışta başka cümle + başka fotoğraf | PM-003 | ✗ |
| RQ-Ş08 | "Bütün kelimeler öğretilsin, kelime haznesi eksik kalmasın" | PEDAGOGY §2, 5.000 lemma | ? |
| RQ-Ş09 | Rol oyununda partner kendi kalıplarını zorla söyletiyordu | Partner/gözlemci ayrımı (H3 §7b) | ~ (talimatta var, altın set bekleniyor) |
| RQ-Ş10 | "Benimki doğru mu?" sorgusu hata dönüyordu | Kural tabanlı önce, devre kesici, "kontrol edilemedi" cezasız | ? |
| RQ-Ş11 | Uygulama çok hatalıydı (AI iletişimi) | PM-004, dayanıklılık testleri | ? |
| RQ-Ş12 | İçerik basit ve yetersizdi, "insanı beslemiyor" | Senaryo standardı, derin kartlar, kalıplar | ~ |

**PM-008 eki — v1 geliştirme sürecinden dersler** (R sütunu: planlandığı sürüm ve STATUS görevi)

| Kimlik | Ders | v2 karşılığı ve kabul | Sürüm · görev | Durum |
|---|---|---|---|---|
| RQ-Ş13 | Mikrofon güvenilirliği: bir çalışıp bir çalışmaması, ilk kelimenin kesilmesi (~1 sn geç açılma), izinden sonraki ilk kartın çalışmaması, seviye göstergesinin oynamaması, iOS mikrofon göstergesinin açık kalması | Gerçek iPhone'da art arda 50 sesli cevapta ≥49 başarı; düğmeden kayda ≤300 ms; "dinliyorum"a tekrar dokunuş = iptal; oturum bitince mikrofon tamamen kapanır | R1 · R1-37 | ✗ |
| RQ-Ş14 | Robotik ses öğrenmeyi bozuyordu; doğal ses çok beğenildi | İçerik sesleri önceden üretilmiş doğal ses (yalnızca ücretsiz katman, faturasız); cihaz sesi yalnızca yedek. LS-7/LS-8'de "doğal ses öncelikli" | R1 (pilot senaryolar) → R2 · R1-38 | ✗ |
| RQ-Ş15 | "Yavaş" gerçekten yavaşlatmalı | ≈0,7× (hazır seste oynatma hızı, cihaz seste rate); birim + e2e testi | R1 · R1-38 | ~ (cihaz seste hız var) |
| RQ-Ş16 | Cevap süresi saniye olarak gösterilmez | Hız turunda süre görünmez; kazanım Raute dolması + nitel geri bildirim ("düşünmeden söyledin") | R1 · R1-10 | ? |
| RQ-Ş17 | Doğru cevaptan sonra erken otomatik geçiş | Geçiş öğrencinin dokunuşuyla ya da ses bitince kısa beklemeyle; ses ve açıklama okunmadan geçilmez | R1 · R1-39 | ~ |
| RQ-Ş18 | Cevap sorulmadan önce gösteriliyordu (artikel) | Hiçbir maddede cevap, sorudan önce ekranda/seste yok; e2e kontrolü | R1 · R1-39 | ? |
| RQ-Ş19 | Her yerde duraklat/devam | Duraklatınca ses ve hikâye gerçekten durur; devamda 1–2 sn geri sarar | R1 (ses) → R2 (hikâye) · R1-39 | ✗ |
| RQ-Ş20 | Diyalog ve hikâyede her karakter farklı ses | WORLD karakterlerine ses ataması; hazır seste ve cihaz seste ayrı ses | R1 (diyalog) → R2 (hikâye) · R1-38 | ✗ |
| RQ-Ş21 | Değerlendirme iki yönde doğru: doğru cevap yanlış sayılmaz, yanlış cevap doğru sayılmaz | Altın setlere iki yönlü örnekler (ör. birleşik yazılmış yanlış biçim) | R1 · R1-31 | ~ |
| RQ-Ş22 | Çalışma ekranı kaydırmasız tek ekrana sığar | iPhone 15 ve SE boyutunda kaydırma yok; görsel test | R1 · R1-40 | ? |
| RQ-Ş23 | Üst çubuk ve güvenli alan taşması tekrar tekrar geldi | Her ekranda görsel regresyon testi zorunlu (CI, iki cihaz) | R1 · R1-36 | ~ (visual.py var, taban yok) |
| RQ-Ş24 | Görsel: soğuk, resmî değil; canlı, renkli, motive edici, dağınık değil; ödül sayaçları taşmaz ("109/60") | DESIGN.md (PM-006); sayaç üst sınır/biçim testi | R1 · R1-41 | ✗ |
| RQ-Ş25 | İçerik öğrencinin hayatından 2–3 konunun etrafında dönmemeli | LS-12.3 döngüsüzlük + WORLD çeşitliliği | R1 · R1-15 | ? |
| RQ-Ş26 | Dersten hemen sonra kısa rol oyunu: partner rolünü bilir, dersin ifadelerini kullandırır, destekli modda düzeltip tekrar ettirir | Aşama 5 (destekli diyalog) + aşama 6 kısa sürüm | R1 · mevcut (aşama 5–6) | ~ |
| RQ-Ş27 | Dış kaynak görevleri (seviyeye uygun dizi/kanal/podcast, bağlantıyla); yapılınca kayda geçer | LS-8.5'e ek: görev kartı + bağlantı + "yaptım" kaydı | R2 | ✗ |
| RQ-Ş28 | Evde Almanca: evde Almanca konuşan bir aile üyesiyle günde kısa, yapılandırılmış "yalnızca Almanca" görevi (konu kartı + 5 kalıp) | Profilde isteğe bağlı; kişisel bilgi depoya girmez | R2 | ✗ |
| RQ-Ş29 | İş arama ve iş görüşmesi alanı (Bewerbung, Vorstellungsgespräch, mesleğini anlatma) | Alan haritasına 21. alan | R3 | ✗ |
| RQ-Ş30 | Geçmişi anlatma (anılar, başından geçenler; Perfekt/Präteritum anlatı) | "Benim cümlelerim" ve 4/3/2 monoloğuna konu | R2 | ✗ |
| RQ-Ş31 | Paylaş düğmesi: kart ya da günlük ilerleme iOS paylaşım menüsüyle | Web Share API; kişisel bilgi yok | R2 (düşük öncelik); haftalık özet R1-43 | ✗ |
| RQ-Ş32 | Gün içinde kesintili kullanım (kısa boşluklar, set araları, araba) | Oturum her an bırakılır, kaldığı yerden sürer (madde düzeyinde kayıt) | R1 · R1-42 | ~ (bölüm düzeyinde) |

## D. v1 özellik envanteri ve v2 kararı

Hiçbir satır sessizce düşmez. Karar: **TAŞI** (v2'de karşılığı olacak) · **BİRLEŞ** (başka bir v2 özelliğinin içine girer) · **ARŞİV** (sahibin onayıyla, /legacy'de kalır).

| Kimlik | v1 özelliği | Karar | v2 karşılığı |
|---|---|---|---|
| RQ-V01 | Bugün ekranı, 100 dk halkası, üst çubuk (mola sayacı) | TAŞI | Bugün (LS-5) |
| RQ-V02 | Seviyem: ünite x/42, kalıcı kelime, zayıf kurallar + tek dokunuşla alıştırma, öğretmen raporu, B1 tempo hesabı | TAŞI | İlerlemem + koç (LS-10.4, LS-15) |
| RQ-V03 | Kurs: 42 ünite, 11 basamaklı yol, ünite sınavı | BİRLEŞ | İçerik kütüphanesi + isteğe bağlı B1 yolu (R5) |
| RQ-V04 | Seans motoru: 5 bağlam (masa, iş arası, spor, mutfak, araba), karışık bloklar, aynı blok art arda gelmez | TAŞI | Bağlam modları (LS-5.5) |
| RQ-V05 | Pomodoro: aktif süre ölçümü, mola ekranı, zil, sesli duyuru, "molayı atla", 14 günlük grafik, seri, seri dondurucu, 100 dk kutlaması | TAŞI | LS-5.1, LS-13.6 |
| RQ-V06 | Eller serbest kurs (Türkçe duy → Almanca söyle) | TAŞI | Beklemeli hatırlama, araba modu (LS-5.5) |
| RQ-V07 | Her 3 blokta oyun molası; oyunlar (eşleştirme, 60 sn hız) | BİRLEŞ | Hız turu (LS-6.4), çeşitlilik |
| RQ-V08 | Kelime kartları, Kartlarım (kendi kartları), 1.500 sık kelime | BİRLEŞ | Kelime motoru, "Duyduğum kelime" (LS-7.5) |
| RQ-V09 | Canlı sohbet (Gemini Live), yan kanalda düzeltme | TAŞI | Konuşma motoru (LS-9), düzeltme politikası (LS-10.2) |
| RQ-V10 | Senaryolar, "Gerçek hayat" görevleri | TAŞI | Alan senaryoları, gerçek görevler (LS-11) |
| RQ-V11 | Düşün ve kur | BİRLEŞ | Kurma merdiveni (LS-6.2) |
| RQ-V12 | Akıcılık 3-2-1 | TAŞI | 4/3/2 monoloğu (LS-9.4) |
| RQ-V13 | Sesli tekrar, shadowing | TAŞI | Kulak Salonu, telaffuz (LS-8, LS-9.5) |
| RQ-V14 | Yutulan sesler ve Bavyera (dis) | TAŞI | LS-8.3, Bairisch basamağı (kaynaklı) |
| RQ-V15 | Hikâye | TAŞI | H4 dünyası, sesli drama (LS-5.6) |
| RQ-V16 | Yaz (yazma görevleri) | BİRLEŞ | Kurma maddeleri + B1 yazma (LS-15) |
| RQ-V17 | **Ödev yardımcısı** (kurs ödevi) | TAŞI | Kurs senkronu altında "ödev yardımcısı": öğrenci ödevini yazar/fotoğraflar, koç açıklar ama cevabı hazır vermez (R2) |
| RQ-V18 | Aylık ölçüm, dikte, deneme sınavı, B1 atölyesi | TAŞI | LS-16.1, LS-8.2, LS-15 |
| RQ-V19 | Koç, rehber | TAŞI | Öğretmen (LS-10) |
| RQ-V20 | Hayat hikâyem | BİRLEŞ | Benim cümlelerim (LS-9.6) |
| RQ-V21 | Medya, dış kaynaklar | TAŞI | Gerçek medya köprüsü (LS-8.5) |
| RQ-V22 | Rozetler, maskot "Brezi", konfeti | TAŞI | LS-13 (kapatılabilir) |
| RQ-V23 | Haftalık yedek hatırlatması, Firestore eşitleme | TAŞI | Veri katmanı + yedek dışa aktarma |
| RQ-V24 | Konuşma tanımada 3 kademe yedek | TAŞI | BLUEPRINT §7.2 |
| RQ-V25 | "Benim cevabım da doğru" | TAŞI | PEDAGOGY §7a |
| RQ-V26 | Seslendirme filtresi | TAŞI | services/tts/clean.ts |
| RQ-V27 | Doğal ses (Google TTS, istemci sayaçlı) | DEĞİŞTİ | Google Cloud TTS kapalı kalır (para riski). PM-008/RQ-Ş14: içerik sesleri önceden üretilmiş **doğal ses öncelikli** (yalnızca ücretsiz katman); cihaz sesi yedek |
| RQ-V28 | Eski yapay zekâ "Dersler", eski Koç yol haritası, Video | ARŞİV | /legacy (sahip onayıyla) |

## E. PM öngörüleri (öğrenci bunları söylemeden önce)

| Kimlik | Risk ya da ihtiyaç | Yapılacak | Sürüm |
|---|---|---|---|
| RQ-P01 | iOS'ta web içeriğinin yerel verisi (IndexedDB) belirli koşullarda silinebilir | Gerçek iPhone'da doğrula; eşitleme + haftalık otomatik yedek; veri kaybı testi | R1 |
| RQ-P02 | Mikrofon izni WKWebView'da her açılışta yeniden sorulabilir | Gerçek iPhone'da doğrula; gerekiyorsa kabukta kalıcı izin yönetimi | R1 |
| RQ-P03 | Cihaz sesinin kalitesi düşük olabilir | İlk kurulumda isteğe bağlı rehber: iOS ayarlarından ücretsiz "gelişmiş/premium" Almanca sesi indirme; uygulama en iyi Almanca sesi otomatik seçer | R1 |
| RQ-P04 | Konuşma tanıma aksanı yanlış duyup öğrenciyi haksız yere "yanlış" sayabilir | Hoşgörülü eşleme; "Doğru söyledim" düğmesi; yazarak yedek; tanıma hatası öğrencinin puanını düşürmez | R1 |
| RQ-P05 | Gün sınırı gece yarısı olursa geç çalışan öğrenci seriyi kaybeder | Gün Europe/Berlin saatiyle 04:00'te başlar | R1 |
| RQ-P06 | Sinyal yok (bodrum, tren) | Bugünün içeriği ve sesleri önceden önbelleğe; çevrimdışı tam çalışır | R1 |
| RQ-P07 | Bildirim yorgunluğu | Sessiz saatler; günde en fazla 2 bildirim (hatırlatma + gelen arama) | R1 |
| RQ-P08 | İlk 2–3 haftadaki motivasyon düşüşü ve A2 "duvarı" | Koç mesajları, görünür kazanımlar, 60 sn kayıt karşılaştırması (2. hafta mini karşılaştırma) | R1–R2 |
| RQ-P09 | Spor salonu ve arabada gürültü | Bu modlarda konuşma puanlanmaz, yalnızca kaydedilir; dinleme sesi kısılabilir | R1–R2 |
| RQ-P10 | İş yerinde du/Sie belirsizliği (Bavyera'da meslektaşlar arası du yaygın) | Mola sohbetlerinde geçiş öğretilir: "Wir können uns duzen." | R2 |
| RQ-P11 | Sayılar, tarihler, saatler, heceleme telefonda en zor kısım | Günlük 2 dk sayı/saat akışı (LS-8.4) | R1 |
| RQ-P12 | Sınav kaydı genelde sınavdan haftalar önce kapanır | Sınav tarihi ayarlıysa ~10 hafta kala kayıt hatırlatması | R2 |
| RQ-P13 | Gerçek görevde başkasını kaydetme riski | Hukuki uyarı; değerlendirme hatırlamaya dayanır (LS-10.5) | R1 |
| RQ-P14 | Seri kaygısı (streak anxiety) bırakmaya yol açabilir | Kurtarma modu seriyi korur; dondurucu; suçlayıcı dil yok | R1 |
| RQ-P15 | Gece yorgun gözle kullanım | Koyu tema otomatik; yatmadan önce modu (LS-5.5) | R1 |
| RQ-P16 | Pil ve arka planda ses | Araba ve spor modunda ekran kapalıyken ses sürer; pil tüketimi ölçülür | R1–R2 |
| RQ-P17 | Telefonun kendi klavye düzeltmesi Almanca cevabı bozar | EK2 §1 | R1 |
| RQ-P18 | Öğrencinin gerçek hayatta duyduğu ama yazılışını bilmediği kelime | "Duyduğum kelime"de sesli ekleme + "yaklaşık yazılış" kabul, uygulama doğru kelimeyi önerir | R2 |
| RQ-P19 | Yapay zekânın ürettiği Almanca bazen doğal olmayabilir | Yapay zekâ çıktısı öğretim içeriğine dönüşmeden önce dilbilimci incelemesi; canlı çıktılarda yalnızca partner rolü | Her sürüm |
| RQ-P20 | Uygulama güncellemesi sırasında ders yarıda kalabilir | Güncelleme yalnızca oturum aralarında uygulanır | R1 |
