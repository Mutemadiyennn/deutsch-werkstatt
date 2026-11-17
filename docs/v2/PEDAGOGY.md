<!-- Kaynak: kullanıcının H3 talimatı (17.11.2026), metin olduğu gibi. Bütün içerik ve kod kararları bu belgeye dayanır. -->
FAZ H3 — ÖĞRETİM MOTORU VE İÇERİK FABRİKASI (uzman tasarım)

Bu faz H2'nin içerik ve oynatıcı görevlerinin (e, g) ve H2-EK'nin yerine geçer ve onları genişletir. H2'nin a, b, c, d ve f görevleri geçerli. Bu belgeyi önce docs/v2/PEDAGOGY.md olarak depoya koy. Bütün içerik ve kod kararları buna dayanır.

0. HEDEF VE GERÇEKÇİ HESAP
Hedef: Öğrenci doktorda, resmî dairede, bankada, işte, evde, sokakta, fırında ve dizi/filmde karşılaşacağı gündelik Almancaya hazırlıklı olsun; günlük konuşma diline hâkim olsun. 500–600 kelime yetersiz.
Dayanak (konuşma dili kapsama araştırmaları; çoğu İngilizce verisiyle, Almancada büyüklük sırası benzer):
- ~2.000–3.000 sözcük ailesi gündelik konuşmanın büyük kısmını kapsar.
- Dizi/filmi rahat anlamak için ~6.000–7.000 gerekir.
Zaman bütçesi: Günde 100 dk odak (4×25) + dil kursu. 6 ayda yaklaşık 150 çalışma günü.
Sayısal hedefler (hepsi ölçülür ve İlerlemem'de görünür):
- Aktif kelime + ifade (söyleyebildiği): Ay 2: 600 · Ay 4: 1.200 · Ay 6: 1.800 · Ay 12: 3.000
- Pasif lemma (anladığı): Ay 2: 1.500 · Ay 4: 3.000 · Ay 6: 4.500 · Ay 12: 7.000
- Doğal hızdaki senaryo diyaloğunu ilk dinlemede anlama: Ay 2 %60 · Ay 4 %80 · Ay 6 %90
- Hızlı Alltag dinleme: Ay 4 %50 · Ay 6 %70 · Ay 12 %85
- Gerçek medya (sokak röportajı): Ay 6'da ana fikir, Ay 12'de ayrıntı
Günlük yük: ~12 yeni aktif öğe + ~25 yeni pasif öğe. Tekrarlar en fazla 25 dk. Tekrar yükü bunu aşarsa planlayıcı yeni öğe sayısını otomatik düşürür.
Dürüstlük kuralı: 6 ayda film tam anlaşılmaz. Gündelik işler ve sohbet hedeflenir. Bavyera ağzı kısmen anlaşılır. Uygulama hiçbir yerde bundan fazlasını vaat etmez.

1. ÖĞRETİM İLKELERİ (her özellik bunlara uyar)
1) İhtiyaç × sıklık: Öğretilen her şey ya çok sık kullanılır (altyazı sıklığı) ya da bir alanda mutlaka gereklidir (alan listeleri). Rastgele kelime yok.
2) Kelime tek başına öğretilmez: her kelime en az bir ifade ya da kalıp içinde öğretilir. Konuşma kalıplardan kurulur.
3) Anlamak ile söylemek ayrıdır: Pasif yol geniş ve hızlı (tanıma, dinleme), aktif yol dar ve derin (üretim). Her öğenin iki ayrı gücü vardır.
4) Hatırlama, okumaktan güçlüdür: Her öğe öğrencinin kendi üretimiyle çalışılır (TR→DE, boşluk, dinle-cevap ver).
   - Tekrarlar FSRS ile zamanlanır (ts-fsrs, MIT lisanslı).
   - v1'in "kalıcı" kuralı (iki ayrı oturumda, ≥3 saat arayla doğru üretim) ustalık tanımı olarak kalır.
5) Anlaşılır girdi: Dinleme seviyenin biraz üstünde olur. Bilinen kelime oranı ≥%95 olan metinler önce gelir; planlayıcı bu oranı hesaplar.
6) Zorlanmış çıktı ve akıcılık: Her kalıp şu merdivenle çalışılır: dinle → tekrar et → boşluğu değiştir → dönüştür → TR→DE → diyalog → serbest. Akıcılık için 4/3/2 tekniği (v1'deki Akıcılık 3-2-1 korunur) ve shadowing.
7) Etkileşim stratejileri açıkça öğretilir: anlamadım demek, tekrar ettirmek, yavaşlatmak, başka sözle anlatmak, zaman kazanmak, anladığını kontrol etmek.
8) Dilbilgisi yalnızca kalıbı kurmaya yettiği kadar öğretilir: Türkçe, 2–4 satır. Türkçe konuşanların tipik hataları hedeflenir: fiilin ikinci sırada olması, yan cümlede fiilin sonda olması, artikel ve hâl, ayrılabilen fiil, Perfekt'te haben/sein, "halb zehn" = 9:30.
9) Geri bildirim: Destekli modda anında ve kısa. Bağımsız modda araya girilmez, sonunda en önemli 3 hata verilir. Anlamı doğru olan her cevap kabul edilir.
10) Gerçek hayata taşıma: Her gün bir dış görev verilir, sonucu kaydedilir.
11) Birikim: Temel kalıplar ve sık kelimeler bütün alanlarda tekrar eder. Hiçbir alan sıfırdan başlamaz.
12) Üç katman: Hochdeutsch / Alltagsdeutsch / Bairisch. Bairisch yalnızca kaynaklıysa "verified", değilse "uncertain". Uydurma yok.

2. KELİME DAĞARCIĞI SİSTEMİ (sözlük fabrikası)
Kaynaklar:
- Sıklık: FrequencyWords (OpenSubtitles, CC BY-SA 4.0; zaten kullanılıyor; altyazı konuşma diline en yakın kaynak). İlk ~12.000 kelime biçimi lemmatize edilir (spaCy de ya da simplemma) → ~5.000 lemma. Özel adlar, ünlemler ve sayılar ayrılır.
- Alan listeleri: 20 alan için ihtiyaç listeleri (§4).
- Kapsama kontrolü: Goethe/telc A1–B1 kelime listeleri yalnızca kontrol referansıdır; içerikleri depoya kopyalanmaz. Raporda B1 listesinde olup bizde olmayanlar gösterilir.
- v1'in 715 kelimesi ve Kelime+'ın 567 adayı birleştirilir (legacyKey korunur).
Katmanlar:
- K1 (ilk 2.000 sıklık + bütün alanların temel kelimeleri): tam derin kart
- K2 (2.001–5.000): hafif kart
- K3 (kişisel): öğrencinin dışarıda duyup eklediği kelimeler ("Duyduğum kelime" ile hızlı ekleme)
Derin kartta (K1) zorunlu alanlar:
- de, tr (bağlamdaki en sık anlam; çok anlamlıysa ayrı kayıt #n), pos
- isimde artikel ve çoğul; fiilde praesens3, perfekt, aux, separable, reflexive, hâl/edat
- en az 2 collocation, en az 1 kalıp bağlantısı, register
- en az 1 mistakes_tr (Türkçe konuşana özgü)
- en az 4 örnek: en az 1'i alltag, en az 1'i diyalog içinde
- img sorgusu yalnızca somut kelimelerde (v1 kuralı)
- freqRank, domains[]
Hafif kart (K2): de, tr, pos, artikel/çoğul ya da perfekt, 2 örnek (en az 1'i alltag), 1 collocation, freqRank.
Kalite:
- K1'in tamamı bağımsız dilbilimci incelemesinden geçer.
- K2'de %10 rastgele örneklem incelenir; hata oranı %2'yi aşarsa partinin tamamı yeniden incelenir.
- validate.py: zorunlu alanlar, tekillik. vocabscan genişletilir: örnek cümlelerde öğretilmemiş ve daha seyrek kelime oranı ≤%5.
Ses: Varsayılan cihaz sesi. Diyalog ve dinleme metinleri için ücretsiz kota içinde önceden üretilmiş ses.

3. KALIPLAR VE İFADELER
- Temel kalıplar: ~60 (A1–A2 ~40, B1 ~20). Her kalıpta:
  - frame ve slotlar (her slot için en az 8 doldurma)
  - 2–4 satır Türkçe not
  - en az 10 örnek (hd + alltag)
  - dönüşümler: soru, olumsuz, kibar, Perfekt; weil, dass ve wenn ile bağlama
  - mistakes_tr
- İfade (chunk) hedefi ~1.500 (alan başına 50–100).
- Alltag işaretleri seti: halt, eben, mal, doch, ja, schon, gell, passt, geht klar, na ja, ach so, genau, echt?, Moment mal, Quatsch… Her biri işleviyle anlatılır: ne zaman, ne anlamda, hangi tonla.
- Doğrulayıcı kuralı: her temel kalıp en az 3 farklı alanda tekrar eder (pilotta en az 2).

4. ALAN HARİTASI (20 alan, öncelik sırasıyla)
1 strateji (anlamadım, tekrar, başka sözle anlatma, zaman kazanma)
2 telefon
3 arzt + apotheke
4 arbeit (iş, mola sohbeti, şefle konuşma, hastalık bildirimi)
5 smalltalk (tanışma, hava, hafta sonu, futbol, yemek, fikir söyleme)
6 einkaufen (market, ürün sorma, iade)
7 bäckerei / metzgerei / café / restaurant
8 amt (Bürgeramt, Ausländerbehörde, formlar, randevu)
9 bank + versicherung
10 wohnung (ev sahibi, Hausmeister, arıza, komşu)
11 friseur
12 fitness + sport
13 verkehr (tren, otobüs, araba, polis kontrolü)
14 post + paket
15 werkstatt + handwerker
16 notfall (112, kaza, kayıp)
17 freizeit + freunde (davet, plan yapma, parti)
18 gefühle + meinung (duygu, şikâyet, tartışma, özür)
19 medien (dizi/film/haber dili, sokak röportajı)
20 bairisch (anlama odaklı, kaynaklı)
Alan başına ~6 senaryo (toplam ~120), toplam ~600 dinleme diyaloğu.

5. SENARYO STANDARDI (doğrulayıcı kuralı)
- essentials: 12–20 kelime, 8–15 ifade, 3–6 kalıp (çoğu temel kalıplardan)
- Aşama 3 (cümle kurma): en az 25 madde
- Aşama 4 (kontrollü alıştırma): en az 35 madde; türler: gap, order, transform, guided_response, listen_and_respond, tr→de
- Aşama 5 (destekli diyalog): en az 3 diyalog çeşidi, her biri 4 destek düzeyinde. Karşı taraf farklı tepki verir; öğrenci ezber metne değil, değişen duruma cevap vermeyi öğrenir.
- Aşama 6 (rol oyunu): 3 zorluk düzeyi + sürpriz listesi
- otherSide: en az 12 cümle, en az yarısı alltag, her birinde speed alanı
- listening: en az 6 soru, ilk dinleme altyazısız
- speaking: en az 3 görev
- mission (dış görev): en az 1
- Üretim: senaryo boyunca en az 80 üretim maddesi
- Her üretim maddesinde accepted[]: en az 3 kabul edilebilir varyant (kelime sırası alternatifleri dahil)
- Gerçeklik testi: "Bunu yarın gerçekten duyar/söyler miyim?" Hayırsa çıkar.

6. DİNLEME SALONU
5 basamak:
1) yavaş Hochdeutsch
2) normal Hochdeutsch
3) doğal Alltag
4) hızlı Alltag: yutulan sesler (hab ich, haste, isses, gibt's, 'nen…)
5) Bairisch: yalnızca lisanslı gerçek kayıt, ya da "öğretim amaçlı seslendirme · gerçek ağız değil" etiketiyle
Her parçada sıra:
- önce altyazısız dinle
- ana fikir sorusu, sonra ayrıntı soruları
- transkript
- bilinmeyen kelimeye dokununca bankaya ekle
- shadowing
- dikte (v1'den)
Yutulan sesler için ayrı mikro alıştırma: duyduğunu yaz → tam biçimi gör.
Gerçek medya:
- Yalnızca bağlantı verilir; gömme ve indirme yok.
- Seviyeye göre etiketli liste: ör. DW Nicos Weg, Easy German sokak röportajları, Bavyera yapımı diziler ve BR içerikleri. Bağlantılar yayından önce doğrulanır.
- İzlerken "Duyduğum kelime" ile hızlı ekleme yapılır.

7. YAPAY ZEKÂ KATMANI: v1 hatalarının kesin çözümü
v1'deki sorunlar:
- Rol oyununda partner öğrenciye kendi kalıplarını zorla söyletiyordu.
- "Benim cevabım doğru mu?" sorgusu hata dönüyordu.
- Yapay zekâ ile iletişim kırılgandı.
Tasarım kuralları:
a) Değerlendirme önce yapay zekâsız yapılır:
   - normalizasyon (v1 kuNorm/kuCore) + içerikteki accepted[] + lemma ve kelime sırası esnekliği
   - Yapay zekâ (equiv_check) yalnızca bunlar karar veremezse çağrılır.
   - Yapay zekâ hata verirse cevap "kontrol edilemedi" olarak işaretlenir; öğrenci cezalandırılmaz.
   - "Benim cevabım da doğru" her zaman vardır ve kaydedilir. Kayıtlar içerik iyileştirme kuyruğuna girer ve onaylananlar accepted[]'e eklenir.
b) Rol oyununda iki ayrı rol:
   - PARTNER yalnızca karakter olarak konuşur. Asla öğretmenlik yapmaz, asla belirli bir cümleyi söyletmez. Hedef ifadeler fırsattır, şart değildir. Anlamı anlaşılır her cevaba doğal tepki verir. Öğrenci iki kez takılırsa kendini sadeleştirir: daha yavaş, daha basit kelimeler, evet/hayır sorusu.
   - GÖZLEMCİ konuşma bittikten sonra çalışır: feedback_tr + gap_extract.
   - Destekli modda ipuçlarını yapay zekâ değil, uygulama içerikten gösterir.
c) Ölçülen şey görevin başarılmasıdır, hedef cümleyle eşleşme değil (ör. randevu alındı mı, saat doğru anlaşıldı mı).
d) Bütün çağrılarda:
   - yapılandırılmış çıktı (JSON şeması, responseSchema) ve şema doğrulaması; bozuksa bir kez onarım denemesi
   - zaman bütçesi ve yedek model
   - devre kesici: art arda 3 hata → 5 dk yapay zekâsız mod
   - blueprint §4'teki hata kodları
   - Hiçbir hata ekranı terk ettirmez. Her hatada aynı ekranda "Tekrar dene" ve "yapay zekâsız devam et" seçenekleri.
e) Kota bütçesi: Gemini ücretsiz katman sınırlarına göre günlük çağrı bütçesi hesaplanır ve raporlanır. equiv, explain ve say_it için önbellek zorunlu.
f) "Bunu Almanca nasıl derim?" (TR→DE) düğmesi, aşama 5–6'da ve serbest konuşmada:
   - say_it_de görevi: {tr, scenarioId, level} → {de_simple, chunk?, pattern?, paraphrase_de?}
   - Önce yerel arama yapılır (registry'deki Türkçe karşılıklar). Yapay zekâ yalnızca bulunamazsa çağrılır.
   - Puan düşmez. Öğe aktif eksik olarak bankaya girer. Konuşma kaldığı yerden devam eder.
   - "Bu ne demek?" (DE→TR) ayrı bir düğme olarak kalır.
g) Prompt'lar sürümlüdür ve altın setlerden geçmeden yayına girmez.
Kabul ölçütleri (ölçülür ve raporlanır):
- equiv_check altın seti: en az 200 gerçekçi öğrenci cevabı (doğru varyantlar, küçük hatalar, anlam hatası, İngilizce/Türkçe karışık), insan etiketli. Uyum ≥%95, haksız ret ≤%3.
- Rol oyunu altın seti: en az 30 konuşma betiği (hedef dışı ama geçerli cevaplar, İngilizceye kaçma, sessizlik, ağır hatalar, konu dışı soru). Kurallar + yapay zekâ hakem ile ölçülür:
  - bağımsız modda zorla söyletme: %0
  - Almanca dışı cevap: ≤%2
  - A2'de partner cevabı en fazla 2 cümle
  - karakter dışına çıkma: %0
  - gerektiğinde sadeleştirme: ≥%90
- Dayanıklılık: 429, 503, zaman aşımı, bozuk JSON ve ağ kesintisinin her birinde ekranda kalma %100, Türkçe açıklama, en geç 12 sn içinde seçenek.
- Gecikme: hızlı görevlerde p95 ≤ 8 sn.
- CI: Her push'ta kayıtlı yanıtlarla çalışır. Gerçek modelle değerlendirme takımı elle tetiklenen ayrı bir iştir (Worker staging üzerinden); sonuç tablosu raporda yer alır.

8. GÜNLÜK MOTOR (Bugün = 4 seans)
- S1 Kelime ve ifade: vadesi gelen tekrarlar (FSRS) + 12 yeni aktif + 25 yeni pasif öğe (yük yüksekse otomatik azalır)
- S2 Kalıp ve cümle kurma: güncel senaryonun aşama 3–4'ü; hedef en az 40 kendi cümlesi
- S3 Dinleme salonu: seviyeye uygun hız, yutulan ses mikro alıştırmaları, shadowing
- S4 Konuşma: aşama 5–6 + dış görev hazırlığı (hazırlık kartında kalıplar ve 5 kaçış cümlesi)
- Gün sonu: dış görevin sonucu, "Bugün kendi kurduğun cümle", "yeni anladığın kelime", "İngilizceye kaçma sayısı"
- Kurs ayarı: "bu hafta kursta işlenen dilbilgisi konusu" seçilirse S2'deki dönüşümler o konuya ağırlık verir. Kurs ve kitap adı hiçbir yerde geçmez.
- Ölçüm:
  - başlangıç seviye tespiti (mevcut)
  - aylık ölçüm, aynı görevlerle
  - "can-do" listesi: telefonla randevu, molada 5 dk sohbet, Bürgeramt'ta işlem, bankada soru, berberde tarif, markette ürün sorma, dizi sahnesinin ana fikri… Öğrenci kendisi işaretler, uygulama içi kanıt yanında gösterilir.
- Üretim başarısızsa aşama geri gider ve eksik kalıp hedeflenir (blueprint §9 geri dönüş kuralı).

9. ÜRETİM HATTI VE AJANLAR
Roller ve yazma sınırları:
- BM (baş mimar): şema, doğrulayıcılar, kalıplar, yapay zekâ katmanı, entegrasyon
- LEX ajanı: yalnızca content/v2/registry/lexicon/**, 100'erlik partiler halinde
- YAZAR ajanı: yalnızca content/v2/domains/<alan>/**
- DİLBİLİMCİ ajanı: yazara güvenmeden inceler; inceleme raporu + düzeltme
- QA ajanı: öğrenci personasıyla uçtan uca kullanım; bulgular regresyon testine dönüşür
Kurallar:
- Aynı anda en fazla 3 ajan çalışır.
- Her parti şu sırayla ilerler: üret → validate 0 hata → dilbilimci → BM örneklem incelemesi → birleştir.
- Ajanın limiti dolarsa baştan başlatılmaz, kaldığı yerden devam ettirilir.
Bu fazda onaylı ajanlar: 1 LEX, 1 YAZAR, 1 DİLBİLİMCİ.

10. BU FAZIN TESLİMLERİ (sırayla)
1) docs/v2/PEDAGOGY.md (bu belge) ve docs/v2/CONTENT_PLAN.md (alan × senaryo × kelime hedefleri tablosu)
2) Şema ve doğrulayıcı güncellemeleri: accepted[], freqRank, tier, reductions, mission, üretim sayımı, kapsama kuralları
3) Sıklık hattı: ~5.000 lemmalık liste, katmanlama, kapsama raporu (B1 referansına göre eksikler; referans listesi depoya kopyalanmaz)
4) Temel kalıplar (~60) → dilbilimci incelemesi
5) K1'in ilk 1.000 kelimesinin derin kartı (sıklık sırasıyla + pilot alanların temel kelimeleri)
6) Pilot senaryolar tam standartta: strateji 01–03, telefon 01–04, arzt 01–04 (konuları H2'de tanımlı; telefon/01 H2'deki gerçeklik kontrol listesiyle yeniden yazılır)
7) Oynatıcı: aşama 1–6, say_it_de, explain_tr, "Duyduğum kelime", Dinleme salonunun ilk iki basamağı, FSRS ile çift yol (pasif/aktif)
8) Yapay zekâ katmanı + altın setler + dayanıklılık testleri

KONTROL NOKTASI: aşağıdaki raporu ver ve DUR.
- Madde sayıları tablosu. Her senaryo için: kelime, ifade, kalıp, build, drills, diyalog çeşidi, otherSide, listening ve üretim sayısı
- telefon/01 ve strateji/01'in tam metni
- Rastgele seçilmiş 20 derin kelime kartı
- Kalıp listesinin tamamı (frame + Türkçe not + 3 örnek)
- Yapay zekâ ölçüm tablosu: equiv uyumu, haksız ret, zorla söyletme, Almanca dışı cevap, dayanıklılık, gecikme
- Kapsama raporunun özeti ve günlük yapay zekâ çağrı bütçesi
- Test sonuçları, commit/PR bağlantıları, yayın adresi (/v2/)
- Riskler
Kalan 17 alanın seri üretimi bir sonraki fazdır ve kontrol noktası onaylanmadan başlamaz. Kullanım limitimi koru.