
> PM belgesi. Ana motor bunu `docs/v2/OGRETIM_DONGUSU.md` olarak depoya ekler. **Güncellendi 18.11:** bağımsız eleştiri bulguları işlendi.

---

# ÖĞRETİM DÖNGÜSÜ VE USTALIK KANITI — "Önce öğret, sonra iste; öğrendiğini kanıtla, sonra aç"

> PM belgesi. Kimlikler `OD-x.y`. PEDAGOGY, LEARNING_SYSTEM (LS-12), BLUEPRINT §9 ve KUTUPHANE (KT-2.3, KT-4.2) ile birlikte okunur. **Öncelik zinciri** (çelişkide yukarıdaki geçerli): AHTAPOT → YOL_HARITASI (takvim) → OGRETIM_DONGUSU (üretim görevleri, kanıt, kapılar) → BEYIN (cihaz içi kararlar) → LEARNING_SYSTEM → KUTUPHANE → ICERIK_EVRENI → TASARIM/DESIGN. PEDAGOGY ilke kaynağıdır; onunla çelişki görülürse PM'e yazılır. **Bütün sayısal eşiklerin tek kaynağı `policy.json`'dur;** belgelerdeki sayılar onun başlangıç değerleridir.
> Proje sahibinin sorusu: "Ona haber okutuyorum, benzerini yazmasını, hikâye anlatmasını istiyorum. Ama bunu ona öğrettim mi? Hangi yöntemleri sürekli tekrarlatmalıyım? Öğrendiğini nasıl anlarım ki sonraki basamak açılsın?"

---

## OD-0 Temel kural

**Hiçbir üretim görevi (konuş, yaz, anlat, benzerini yaz, fikrini söyle), gerektirdiği her şey önceden öğretilip hatırlanır hâle gelmeden öğrenciye verilmez.**

İki seviye birbirinden ayrıdır:
- **Anlama seviyesi** üretimden yüksek olabilir: okuma ve dinleme metninde bilinen kelime oranı ≥ %95 yeterlidir, metin öğrenciyi biraz zorlar.
- **Üretim isteği** yalnızca öğretilmiş ve hatırlanan araçları ister. Haberi okuyabilen öğrenciden "aynı haberi yaz" istenmez. Ondan, o hafta öğretilmiş kalıplarla, iskelet yardımıyla "kendi kısa haberini yaz" istenir.

v1'in temel hatası buydu: öğretilmemiş şeyi istemek. v2'de bu bir **doğrulayıcı hatasıdır** (OD-7).

---

## OD-1 Geriye doğru tasarım: her üretim görevinin gereksinim haritası

Her üretim görevi içerik dosyasında `requires` alanı taşır. Bu alan altı katmandan oluşur:

| Katman | Örnek: "Geçen hafta sonunu 60 saniye anlat" (A2) |
|---|---|
| 1. Kelimeler (aktif) | 30 etkinlik kelimesi (einkaufen, Freunde treffen, spazieren gehen…) |
| 2. Kalıplar | "Am Samstag habe ich … gemacht." / "Danach bin ich … gegangen." / "Es war …" |
| 3. Gramer | Perfekt: haben/sein + en sık 25 fiilin Partizip II'si, cümlede fiilin 2. sırada olması |
| 4. Tür bilgisi | Anlatının yapısı: ne zaman → ne yaptım → sonra → nasıldı |
| 5. Bağlayıcılar | zuerst, dann, danach, später, am Abend, aber, weil |
| 6. Akıcılık ve telaffuz | Partizip vurgusu, "ge-" hecesi, 60 sn içinde en az 6 cümle |

**Hazırlık kontrolü** (her üretim görevinden önce planlayıcı yapar):
- `requires` içindeki her öğe `zorunlu` ya da `destekli` diye işaretlenir. **Zorunlu** öğeler yalnızca çekirdek kalıplar ve gramer maddeleridir (görev başına en fazla 8). Kelimeler ve bağlayıcılar **destekli** sayılır: K2 yeterlidir ya da ekranda plan kartıyla verilir.
- Zorunlu öğelerin hepsi **K3**'te, destekli öğelerin ≥ %80'i **K2**'de ise görev açılır.
- Değilse planlayıcı görevden önce eksik maddeler için kısa bir **köprü dersi** (2–5 dk) koyar.
- Öğrenciye bu bir ceza olarak değil, hazırlık olarak gösterilir: "Bu görevden önce 2 şeyi tazeleyelim."

---

## OD-2 Öğretim döngüsü: her üretim türü için 9 adım

Her **tür** ilk kez öğretilirken bu döngü eksiksiz uygulanır. Türler: anlatı, haber, e-posta, şikâyet, fikir bildirme, tarif etme, telefon konuşması, yorum, rica, ret ve diğerleri. Aynı tür sonradan yeni konularla geldiğinde döngü kısalır: 1, 2, 6, 7, 8 ve 9. adımlar.

| # | Adım | Ne yapılır | Destek |
|---|---|---|---|
| 1 | **Amaç** | "Bunu gerçek hayatta ne zaman yapacaksın?" Kısa bir sahne gösterilir (ör. pazartesi molada iş arkadaşı "Wie war dein Wochenende?" diye soruyor). | — |
| 2 | **Model** | Aynı türden 2–3 örnek dinlenir ve okunur. Farklı karakterler, farklı uzunluklar ve seviye ile seviyenin biraz üstü karışık olur. | Tam |
| 3 | **Fark et** | Yapı renkle işaretlenir: giriş, olay, sonuç. Kalıplar ve gramer biçimleri vurgulanır. Öğrenci kısa sorularla yapıyı kendisi bulur ("Hangi kelime zamanı gösteriyor?"). | Tam |
| 4 | **Parçala ve yeniden kur** | Karışık cümleleri sırala. Boşluk doldur. **Dictogloss:** dinle, anahtar kelimeleri not et, metni yeniden kur, modelle karşılaştır. | Yüksek |
| 5 | **Birlikte kur** | Uygulama iskeleti verir (cümle başlatıcılar ve kelime kartları). Öğrenci her bölümü konuşarak doldurur. Her cümleden sonra anında düzeltme yapılır. | Orta |
| 6 | **Destekli bağımsız** | Yalnızca plan kartları kalır (3–5 anahtar kelime). Öğrenci baştan sona anlatır ya da yazar. | Düşük |
| 7 | **Bağımsız** | Boş sayfa, yeni konu, aynı tür. İsteyen öğrenci ipucu merdivenini kullanabilir. Kullanılan ipucu kaydedilir. | Yok |
| 8 | **Geri bildirim ve ikinci deneme** | En önemli 1–3 hata gösterilir (D1/D2/D3 önceliği, LS-10). Ardından **ikinci deneme zorunludur.** Gelişme yan yana gösterilir (kendi 1. denemen ve 2. denemen). | — |
| 9 | **Aktarım** | En az 3 gün sonra, farklı bir alanda aynı tür. Bu, OD-4'teki K4 ve K5 kanıtını üretir. | Yok |

**Destek azaltma** açık ve ölçülüdür. Her adımda ekranda kalan destek tanımlanır. Son iki denemenin ortalaması ≥ %80 ise bir sonraki adıma geçilir; < %60 ise bir önceki adıma dönülür. (Bütün eşiklerin tek kaynağı `policy.json`'dur, BY-9.)
**İkinci deneme** (adım 8) yalnızca D1/D2 hatası varsa zorunludur; yoksa isteğe bağlıdır.

**%70/%30 ile ilişki:** 2–4. adımlar öğrenme payıdır (%30). 5–9. adımlar üretim payıdır (%70). Döngü olgunlaştıkça 1–4. adımlar kısalır, üretim payı artar.

---

## OD-3 Sürekli tekrar ettirilen çekirdek yöntemler

Hepsi araştırmayla desteklenen yöntemlerdir. Planlayıcı bunları her hafta dengeli dağıtır; her birinin kendi biçim ve oyun kılıfı vardır (ICERIK_EVRENI IE-2).

| Yöntem | Ne | Ne zaman | Neyi güçlendirir |
|---|---|---|---|
| **Geri çağırma** | Bakmadan hatırla (Türkçeden Almancaya, resimden kelimeye, durumdan kalıba) | Her gün; tekrarın ana biçimi | Kalıcı hafıza |
| **Aralıklı tekrar** | FSRS ile; yanlışta başka cümle ve başka fotoğrafla geri gelir | Her gün | Unutmayı geciktirir |
| **Karışık çalışma** | Farklı ünitelerin öğeleri karışık sorulur | Her tekrar oturumu | Doğru kalıbı seçme becerisi |
| **Önce dene** | Öğretmeden önce tahmin et ya da söylemeyi dene, sonra modeli gör | Yeni kalıp girişinde | Dikkat ve kalıcılık |
| **Gölgeleme** | Modelle aynı anda, sonra yarım saniye geriden söyle | Her gün 3–5 dk (araba ve yürüyüş modunda ideal) | Telaffuz, ritim, akıcılık |
| **Kalıp genişletme** | "Ich hätte gern einen Termin." → gün ekle → gerekçe ekle → kibar ret ekle | Kurma merdiveni (LS) | Kalıbı esnek kullanma |
| **İkame alıştırması** | Aynı kalıpta nesne, kişi ve zaman değiştirme (K2 motoru) | Kalıp öğrenildiği hafta, kısa ve hızlı | Otomatikleşme |
| **4/3/2** | Aynı anlatıyı giderek kısalan sürede tekrar et (A2: 90/60/45 sn) | Her anlatı türünde | Akıcılık |
| **Dictogloss ve metin yeniden kurma** | Dinle, not al, yeniden kur, karşılaştır | Her yeni türde | Gramer farkındalığı ve tür bilgisi |
| **Ters çeviri** | Kendi Türkçe cümleni Almancaya çevir, model ile karşılaştır | Haftada 2 | Türkçe düşünce kalıplarını Almancaya taşıma, karşılaştırmalı farkındalık |
| **Soru zinciri** | Bir metin ya da görsel üzerine W-soruları sor ve cevapla | Okuma ve dinleme sonrası | Soru sorma becerisi (gerçek hayatta çok önemli) |
| **Kaydet, dinle, karşılaştır** | Kendi sesini modelle yan yana dinle | Haftada 3 | Kendi hatanı duyma |
| **Öğretmen sensin** | Karakterin hatasını düzelt ve kuralı açıkla | Haftada 2 | Derin kavrama |
| **Hata günlüğü ve hedefli onarım** | Kişisel hata sınıfları için mini ders, 10–20 farklı cümle, 3 gün sonra kontrol (KT-4.2) | Hata eşiği aşılınca | Kalıcı yanlışları söker |
| **Çift kodlama** | Ses + görsel + metin birlikte; kelime fotoğrafla ve cümle içinde | Her yeni kelimede | Hatırlama yolu sayısı |

---

## OD-4 "Öğrendi mi?" — kanıt düzeyleri

Performans ile öğrenme aynı şey değildir. Aynı oturumda doğru yapmak öğrendiğini göstermez. Kanıt ancak **gecikmeli** ve **farklı bağlamda** olursa sayılır.

Her öğe (kelime, ifade, kalıp, gramer maddesi) için öğrenci modeli şu düzeyleri tutar:

| Düzey | Ad | Kanıt (hepsi ölçülür) |
|---|---|---|
| K0 | Görmedi | — |
| K1 | **Tanıyor** | Duyunca ya da görünce anlıyor: tanıma görevlerinde ≥ %90, en az 2 ayrı günde |
| K2 | **Hatırlıyor** | İpucusuz geri çağırıyor (Türkçeden ya da durumdan Almancaya). Doğru, ve yanıt süresi A2'de ≤ 5 sn, B1'de ≤ 3 sn. En az 2 ayrı günde |
| K3 | **Kontrollü üretim** | Kalıbı yeni öğelerle doğru kuruyor (ikame, genişletme, iskeletli üretim). ≥ %85 doğruluk, en az 2 farklı bağlamda; kanıtlardan **en az biri yazılı ya da dokunmalı** madde (konuşma tanıma biçim hatalarını düzeltip gizleyebildiği için, BY-3) |
| K4 | **Serbest üretim** | İstenmeden, serbest konuşmada ya da yazmada kendiliğinden ve doğru kullanıyor. En az 2 ayrı olayda (karakter sohbeti, sesli günlük, rol oyunu) |
| K5 | **Kalıcı** | K4'ten ≥ 7 gün sonra, başka bir haftada yine serbest üretimde doğru kullanıyor; ≥ 21 gün sonra tanıma korunuyor |

Kurallar:
- **Gün kuralı:** Tek oturumdaki başarı hiçbir düzeyi tamamlamaz. Her düzey en az iki farklı günde kanıtlanır. **Örtüşme:** Aynı gün bir düzeyin ikinci günü ve bir üst düzeyin ilk günü sayılabilir. Böylece en hızlı yol: K1 (gün 1–2), K2 (gün 2–3), K3 (gün 3–4).
- **Yanıt süresi** istemin bitişinden öğrencinin sesinin başlamasına kadar ölçülür (konuşma tanımanın sessizlik bekleme süresi hariç).
- **Bağlam kuralı:** K3 ve üstü, en az iki farklı senaryoda ya da alanda kanıtlanır.
- **Geri düşme:** Serbest üretimde bir öğe iki kez yanlış kullanılırsa düzeyi K2'ye düşer ve onarım yoluna girer (KT-4.2). Ceza gibi gösterilmez: "Bunu biraz tazeleyelim."
- **Kendiliğinden kullanım ölçümü:** Karakterin sorusu ya da görevin yönergesi hedef kalıbı **içermiyorsa** ve öğrenci kalıbı doğru kullanırsa bu "istenmeden kullanım" sayılır. Serbest konuşma ve yazma çıktıları kural tabanlı eşleştiriciyle taranır. K4'ün tek kaynağı budur.
- **Önceden bilen öğrenci:** Bir öğeyi zaten bilen öğrenci, kısa bir yerleştirme kontrolüyle doğrudan K2/K3'ten başlar. Bilinen şey tekrar öğretilmez.

### OD-4.2 "Yapabiliyorum" kanıtı (performans görevi + puanlama ölçeği)

Her ünitenin 1–3 "yapabiliyorum" hedefi vardır (ör. "Telefonla doktordan randevu alabiliyorum"). Bunlar bir **performans görevi** ile ölçülür: rol oyunu ya da yazma, ve dört boyut, her biri 0–3 puan.

| Boyut | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| Görev tamamlandı mı | Hayır | Kısmen, çok yardımla | Evet, az yardımla | Evet, yardımsız |
| Anlaşılırlık | Anlaşılmıyor | Zor | Çoğunlukla | Rahat |
| Doğruluk (ünitenin hedef yapıları) | Çoğu yanlış | Yarısı | Çoğu doğru | Hepsi doğru |
| Uygunluk (Sie/du, nezaket, tür) | Uygunsuz | Kısmen | Çoğunlukla | Tam |

**Geçme:** Görev tamamlandı ≥ 2, diğer her boyut ≥ 2. İki farklı senaryoda geçilir; bunlardan biri ≥ 3 gün sonra yapılır. Öğrencinin dışarıda yaptığı **gerçek görev** (LS Gerçek Görevler) en değerli kanıttır; yapıldığında ünite rozetine "gerçek hayatta yapıldı" işareti eklenir.

---

## OD-5 Kapılar — ne zaman ne açılır

| Kapı | Açılma koşulu | Kapanmaz ama… |
|---|---|---|
| **Etkinlik kapısı** (hazırlık) | OD-1 hazırlık kontrolü: gereksinimlerin ≥ %90'ı K3+, geri kalanı K2+ | Koşul sağlanmazsa köprü dersi |
| **Ünite kapısı** | Çekirdek öğelerin ≥ %90'ı K3+ ve ünitenin "yapabiliyorum" görevi geçilmiş (OD-4.2). **K4 kapıyı bloklamaz;** bir "parlatma" hedefidir ve sonraki ünitelerde arka planda izlenir | Koşullar 7 gün içinde sağlanamazsa ünite "arka planda izleniyor" işaretiyle açılır; eksikler onarım kuyruğuna girer. Öğrenci asla kilitli kalmaz |
| **Gecikmeli kontrol** | Ayrı bir sınav değildir: ünite geçildikten 7 gün sonra o ünitenin öğeleri tekrara ve hikâyeye **gömülür** | Düşen öğeler onarım kuyruğuna girer; sonraki ünitelerin hazırlık kontrolünde kırmızı görünür |
| **Seviye kapısı** (A2.1 → A2.2 → B1.1 …) | KT-2.3: "yapabiliyorum" hedeflerinin ≥ %80'i + seviyenin gramer maddeleri ustalıkta (üretimde ≥ %90, iki ayrı haftada) + aylık ölçüm + seviye sınav provası | Seviye atlama bir kutlama sahnesi ve hikâyede yeni bir mekân açar |
| **Kol kapıları** | Her kol (Haber Odası, Okuma Salonu…) kendi seviyesinde ana yolun seviyesini **geçemez**. Anlama içeriği ana yolun en fazla bir alt seviye üstüne çıkabilir | — |

Kapılar **katı ama adil** olur: öğrenci hangi koşulun eksik olduğunu tek cümleyle görür ("Randevu kalıbını bir kez de serbest konuşmada kullan, ünite açılsın") ve oraya tek dokunuşla gider.

---

## OD-6 İki tam örnek: "bunu ona öğrettim mi?" sorusunun cevabı

### OD-6.1 Hedef: "Geçen hafta sonunu anlat" (A2, anlatı türü, Perfekt)

| Gün | Ne olur | Düzey hedefi |
|---|---|---|
| 1 | Pazartesi sabahı bir karakterden sesli mesaj: hafta sonunu anlatıyor (model). Altyazısız dinle, sonra metinli dinle, Partizip'ler vurgulu (fark et). 12 Partizip fotoğraf ve cümleyle kartlara girer. "Önce dene": "Dün ne yaptın?" sorusuna dene, sonra modele bak. | Çekirdek (3 kalıp + Perfekt kuralı + 12 Partizip): K1 1. gün |
| 2 | Tanıma tekrarı (K1 2. gün). Kalıp tablosu: haben mı sein mi? Hatırlama ve ikame alıştırması (K2 1. gün). | K1 tamam, K2 başladı |
| 3 | Hatırlama (K2 2. gün). Kurma merdiveni (K3 1. gün): "Ich habe eingekauft" → "Am Samstag habe ich eingekauft" → "… und danach bin ich nach Hause gegangen." İkinci model (farklı karakter), dictogloss, sıralama. | K2 tamam, K3 başladı |
| 4 | Yazılı ve dokunmalı kurma maddeleri + farklı bağlamda kurma (K3 2. gün). **Hazırlık kontrolü geçer.** Birlikte kur → plan kartlarıyla anlat → gerekirse ikinci deneme → 4/3/2 (90/60/45 sn). | K3 tamam; görev açıldı |
| 5–7 | Karakter sohbeti: karakter hafta sonunu soruyor (istenmeden kullanım ölçülür). Gerçek görev: pazartesi molada iş arkadaşına 2 cümle. | K4 |
| 12 | Gecikmeli kontrol: farklı bir bağlamda ("tatilini anlat") kısa anlatı. | K5 adayı |

### OD-6.2 Hedef: "Haber Odası — kendi kısa haberini yaz" (B1.1, haber türü)

**Gereksinim haritası:**
- **Gramer:** Präteritum (en sık 20 fiil: war, hatte, gab, kam, ging…), basit edilgen ("wurde eröffnet").
- **Tür bilgisi:** başlık; ilk cümlede kim, ne, nerede, ne zaman; sonra neden ve nasıl; en sonda tepkiler.
- **Kalıplar:** "Laut …", "Nach Angaben der Polizei …", "Am Montag kam es zu …"
- **Bağlayıcılar:** außerdem, deshalb, trotzdem.

**Akış:**
- **Hafta boyunca:** Haber Odası'nda en az 6 model haber; her birinde yapı renkli gösterilir ve "Bu haber ne anlatmak istiyor?" sorulur.
- **İlk üretim:** Bir haberin 5 cümlelik özeti, iskeletle.
- **Sonra:** Kendi mahallesinden (hikâye dünyasından) bir olay için plan kartlarıyla haber.
- **En son:** Boş sayfa, yeni olay.

Öğrenci ilk gün hiçbir zaman "bu haberin benzerini yaz" ile karşılaşmaz.

---

## OD-7 Planlayıcı, içerik şeması ve doğrulayıcı için teknik gereksinimler

1. **Şema:** Her üretim etkinliğinde `requires` alanı (OD-1'deki 6 katman, öğe kimlikleriyle). Her anlama etkinliğinde `known_ratio_min` (varsayılan 0,95).
2. **Doğrulayıcı (içerik derlemesinde):**
   - `requires` içindeki her öğe, ana yolda o etkinlikten **önce** öğretilmiş olmalıdır. Değilse hata: "öğretmeden isteme".
   - Üretim etkinliğinin model metinlerinde kullanılan ama `requires`'ta olmayan öğe uyarı verir.
   - Bir türün ilk üretim etkinliği, OD-2 döngüsünün 2–5. adımları olmadan gelirse hata.
3. **Öğrenci modeli:** Öğe başına K0–K5 düzeyi; her kanıt olayı tarih, bağlam (senaryo ya da alan), görev tipi, yanıt süresi ve kullanılan ipucu ile saklanır. Cihazda tutulur, öğrencinin eşitleme alanına gider.
4. **Planlayıcı:** Hazırlık kontrolü (OD-1), köprü dersi ekleme, gecikmeli kontrol zamanlaması (OD-5), destek azaltma kuralları (OD-2), yöntem dağılımı (OD-3).
5. **Birim testleri:**
   - Hazırlık kontrolü sınır değerleri.
   - Geri düşme kuralı.
   - Gün kuralı: tek oturumda düzey tamamlanamaz.
   - Ünite kapısı.
   - Gecikmeli kontrol zamanlaması.
6. **Bilgi kısıtlı öğrenci simülasyonu (kabul):** Yalnızca öğretilenleri bilen simüle öğrenci 30 günlük yolu yürür. Hedefler:
   - "Öğretmeden isteme" ihlali **0**.
   - Köprü dersi gerektiren görev oranı ≤ %10. Daha yüksekse ana yolun sırası bozuktur ve içerik düzeltilir.
   - OD-6.1 örneği planlayıcının **birim testi** olarak yazılır: zamanında okuyan simüle öğrencide anlatı görevi en geç 4. günde açılır.
   - Her ünite kapısı en az bir serbest üretim kanıtıyla açılır.

---

## OD-8 Öğrenci ne görür

- **Görevden önce:** Kısa bir güven satırı: "Bunun için gereken 3 kalıbı biliyorsun." Ekranın tek göstergesi değildir, yalnızca bir cümledir.
- **Kelime ve kalıp haritası** üç basit durumla gösterilir:
  - "Anlıyorum": K1–K2
  - "Söyleyebiliyorum": K3
  - "Kendiliğimden kullanıyorum": K4–K5

  Aylık gelişim bu üç durum arasındaki geçişle gösterilir.
- **Ünite sonu:** Rozet ve hikâyede açılan sahne. Gerçek görev yapıldıysa rozete ek işaret.
- **Kilitli şey neden kilitli:** Tek cümle ve tek dokunuşla eksik olan yere gidiş.
- **Yasak:** Yüzdelerle dolu karne ekranı, ceza dili, aynı ekranda birden fazla ilerleme göstergesi.

---

## OD-9 Türkçe açıklama standardı: "öğrenci tek okumada anlar"

**Neden:** 18.11 denetiminde öğrenciye görünen 323 açıklamanın 125'i (%39) anlaşılmaz bulundu. Örnek:

> "Görüşmenin ilk cümlesi. 'gern' kibarlaştırır. Gündelikte 'Ich bräuchte mal …' çok sık; 'mal' isteği yumuşatır, 'nen' = einen."

Bu açıklama tek kutuya dört ayrı fikir, tırnak işaretleri, eşittir işareti ve noktalı virgül sıkıştırıyor. Proje sahibi bunu okudu ve anlamadı. Açıklamalar öğretmen notu gibi yazılmış, öğrenciye göre yazılmamış.

**OD-9.1 Açıklama serbest metin değildir; yapılandırılmış alanlardır:**

| Alan | Ne | Sınır |
|---|---|---|
| `anlam_tr` | İfadenin doğal Türkçe karşılığı | 1 cümle |
| `ne_zaman_tr` | Ne zaman, kime söylenir | ≤ 12 kelime |
| `parcalar` | Kelime kelime karşılık: her parça ayrı bir çip, Almancası üstte, Türkçesi altta | Parça başına ≤ 3 kelime |
| `ipucu_tr` | İsteğe bağlı tek ipucu; ekranda kapalı durur, "Neden böyle?" dokununca açılır | Tek fikir, ≤ 14 kelime |

Örnek (yukarıdaki açıklamanın doğrusu):
- **anlam:** Bir randevu alabilir miyim?
- **ne zaman:** Telefonda, rahat konuşurken çok duyarsın.
- **parçalar:** Ich → ben · bräuchte → ihtiyacım olurdu · mal → bir (isteği yumuşatır) · 'nen → bir · Termin → randevu
- **ipucu** (kapalı): "Einen" konuşmada kısalıp "'nen" olur.

**OD-9.2 Yazım kuralları:**
1. Bir alan, bir fikir. Cümle başına en çok 14 kelime.
2. Sembol yok: `=`, `;`, `…`, tırnak içinde Almanca. Almanca kelimeler arayüzde **kalın** gösterilir (işaretleme ile), tırnakla değil.
3. Dilbilgisi terimi (Dativ, özne, Partizip…) yalnızca o terim daha önce öğretildiyse (`requires`) kullanılır. O zaman da önce Türkçe adı gelir: "-e hâli (Dativ)". Öğretilmemişse terim kullanılmaz; örnekle gösterilir.
4. Açıklama, ekrandaki ifadenin kendisini anlatır. Başka bir ifadenin notu oraya konmaz.
5. Ekranda varsayılan olarak yalnızca `anlam_tr` ve `parcalar` görünür. Gerisi tek dokunuşla açılır (kaydırmasız ekran, PM-008).

**OD-9.3 Kontrol (üç katman, hepsi zorunlu):**
1. **Doğrulayıcı:** Uzunluk sınırları, yasak semboller, öğretilmemiş terim listesi, boş `anlam_tr` → **hata**.
2. **Okur kontrolü:** Yeni ajan tanımı `okur`. Yalnızca Türkçe bilen, Almancası A2 olan, dilbilgisi terimi bilmeyen bir öğrenciyi taklit eder. Her açıklamayı okur ve "Bu ne demek, kendi sözlerinle söyle" sorusunu cevaplar. Cevabı ifadenin anlamıyla örtüşmezse açıklama **geri döner**. Örneklem değil, **her açıklama**.
3. **Ekran kontrolü:** Açıklama gerçek ekran görüntüsünde, iPhone 15 boyutunda ve %130 yazıda okunur.

**OD-9.4 Hemen yapılacak:** Mevcut 323 açıklamanın hepsi bu biçime çevrilir. Önce sorunlu 125'i. Bu kapı geçilmeden hiçbir içerik "reviewed" sayılmaz.
