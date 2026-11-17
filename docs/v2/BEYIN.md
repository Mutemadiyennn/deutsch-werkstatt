
> PM belgesi. Ana motor bunu `docs/v2/BEYIN.md` olarak depoya ekler. **Güncellendi 18.11:** bağımsız eleştiri bulguları işlendi.

---

# BEYİN: uygulamanın içindeki çevrimdışı öğretmen

> PM belgesi. Kimlikler `BY-x.y`. OGRETIM_DONGUSU (OD), ICERIK_EVRENI (IE), LEARNING_SYSTEM (LS), KUTUPHANE (KT) bu belgenin **kural kaynağıdır**. BEYİN o kuralları cihazda, internetsiz uygular.
> Proje sahibinin isteği: "Çevrimdışı ama canlı. İnternete bağlı olmayan büyük bir oyun gibi: arkada öğrenciyi ve sistemi takip eden, güçlü ve beslenmiş, mantıklı algoritmalar. PM'in (Claude) uygulamanın içinde küçük bir klonu."

---

## BY-0 İlke ve katmanlar

**Bütün öğretim kararları cihazda, internetsiz, deterministik ve açıklanabilir algoritmalarla verilir.** İnternet yalnızca üç iş için kullanılır:
1. Kendi içerik paketlerimizi güncellemek
2. Eşitleme
3. Bulut yapay zekâsıyla ek serbest sohbet

İnternet kesilince hiçbir öğretim işlevi kaybolmaz.

| Katman | Ne | Nerede | Yoksa ne olur |
|---|---|---|---|
| **0: Kural ve algoritma beyni** | Öğrenci modeli, planlayıcı, değerlendirici, üretici, dünya simülasyonu, geri dönüş, ölçme, öz denetim | Her cihazda, her zaman (TypeScript, `web/src/brain/`) | Olmaması mümkün değil; uygulamanın kendisi |
| **1: Cihaz üstü dil modeli** | Apple'ın cihaz üstü dil modeli (iOS 26+, Apple Intelligence açık; iPhone 15 Pro ve sonrası; **proje sahibinin cihazı iPhone 15 Pro Max, uygun**). Ücretsizdir, çevrimdışı çalışır, bir Capacitor Swift eklentisiyle köprülenir. Görevi **yalnızca sohbet partneridir**: serbest sohbette karşı taraf ve karakter replikleri. **Düzeltici değildir;** düzeltme Katman 0'ın işidir (kesinlik ilkesi) | Cihazda | Katman 0 eksiksiz çalışır; serbest sohbet dallanan diyaloglarla sürer |
| **2: Bulut** | Mevcut Worker. Sağlayıcı kararı açık (BY-0.1) | Çevrimiçiyken | Katman 1, o da yoksa Katman 0 devreye girer |

Katman 1 ve 2'nin her çıktısı öğrenciye gitmeden **Katman 0 denetiminden** geçer: kural tabanlı dil kontrolü, seviye kontrolü, uzunluk ve güvenlik. Bu çıktılar hiçbir zaman öğretim metni (model metin, kart, açıklama) olarak kullanılmaz; yalnızca sohbet repliğidir.

**BY-0.1 Bulut sağlayıcısı (proje sahibi kararı bekleniyor):** Gemini API şartlarına göre AEA'daki kullanıcılara sunulan uygulamalarda yalnızca ücretli hizmet kullanılabilir; öğrenci Almanya'da. Karar verilene kadar:
- Katman 2 **isteğe bağlıdır**. Uygulama onsuz tam çalışır.
- Proje sahibinin cihazı Katman 1'e uygun olduğu için **Katman 1 teknik denemesi R2'ye öne alınır**.
- Alternatif ücretsiz bulut sağlayıcısının (ör. Cloudflare Workers AI ücretsiz payı) şartları ayrıca incelenir.

**Katman 1 teknik denemesinin geçme koşulları:**
- 100 sohbet isteminde dilbilgisi hatalı ya da seviyesi uygunsuz replik oranı ≤ %3 (dilbilimci örneklemiyle ölçülür)
- İlk yanıtın başlama süresi ≤ 1,5 sn
- iOS 26 SDK ile imzasız IPA derlemesinin CI'da çalışması
- Model yokken uygulamanın sorunsuz Katman 0'a düşmesi

---

## BY-1 Öğrenci modeli ("öğrenciyi tanıyan")

Her şey cihazda saklanır ve öğrencinin eşitleme alanına gider. Depoya ve istemlere kişisel bilgi girmez.

1. **Öğe düzeyleri:** Her kelime, ifade, kalıp ve gramer maddesi için K0–K5 (OD-4). Her kanıt olayı tarih, bağlam, görev tipi, yanıt süresi ve kullanılan ipucu ile kaydedilir.
2. **Hafıza modeli:** Öğe başına FSRS kart durumu. **Kişisel parametre eğitimi:** öğrencinin kendi tekrar geçmişinden FSRS parametreleri cihazda haftalık yeniden hesaplanır (ilk 30 gün varsayılan parametreler). "Kendi modelimizi eğitiyoruz" ifadesinin dürüst karşılığı budur: model bu öğrencinin unutma eğrisine uyar.
3. **Beceri tahmini:** Dinleme, okuma, konuşma, yazma, kelime ve gramer için ayrı ayrı. Elo/IRT benzeri basit model: her maddenin bir zorluk değeri vardır, öğrenci yeteneği her yanıttan sonra güncellenir. Bu tahmin uyarlamalı testlerde ve zorluk ayarında (IE-8, başarı bandı) kullanılır.
4. **Hata profili:** Türkçe konuşanlara özgü hata sınıfları (BY-10.4) ve bu öğrencideki sıklıkları, son 30 günlük eğilimle.
5. **Hız profili:** Öğe ve görev tipi başına yanıt süreleri. Akıcılığın ölçüsüdür.
6. **Alışkanlık profili:** Hangi saatlerde hangi bağlam modunu, ne kadar süreyle seçtiği; nerede bıraktığı.
7. **İlgi profili:** Seçilen ilgi alanları (IE-4).
8. **Sıkılma ve yorgunluk sinyalleri:** IE-9.4.

---

## BY-2 Planlayıcı ("bugün ne yapacağımıza karar veren")

Günlük plan bir **puanlama ve kısıt** problemidir. Planlayıcı deterministiktir ve tohumlu rastgelelik kullanır. Aynı girdi aynı planı üretir; bu yüzden test edilebilir.

**Katı kısıtlar** (yalnızca bunlar; her zaman sağlanabilir):
- Hazırlık kontrolü (OD-1)
- Güvenlik: araba modunda ekrana bakma gerektiren etkinlik yok
- Seçilen süre
- Bildirim tavanı (BY-5)

**Esnek hedefler** (öncelik sırasıyla; tam sağlanamazsa en yakın plan):
1. Vadesi gelen tekrarlar (günlük tavan içinde)
2. Ana yol ilerlemesi
3. Üretim payı: **haftalık** ve bağlam moduna göre ağırlıklı, %60–80 bandında (spor ve toplu taşıma modunda konuşma az olabilir)
4. Aynı biçim art arda gelmez
5. Yenilik (IE-9)
6. OD-3 yöntem dağılımı (haftalık)

Planlayıcı hiçbir zaman boş ya da çözümsüz plan üretmez (BY-12 değişmezi).

**Puan fonksiyonu** (ağırlıklar `policy.json`'da):

```
puan(etkinlik) = a·öğrenme_kazancı      (unutulmak üzere olan × önemli öğeler)
               + b·ana_yol_ilerlemesi
               + c·yenilik             (son 14 günde görülmemiş biçim ya da tür)
               + d·zayıf_beceri_desteği
               + e·hikâye_sürekliliği
               − f·tekrar_cezası       (son 14 günde aynı metin)
               − g·yorgunluk_uyumsuzluğu
```

Plan bir **seans yayı** izler:
1. Kolay ısınma
2. Yeni öğrenme
3. Üretim
4. Bir "zor an"
5. Kesin başarılı kapanış
6. Yarına bir merak bırakma (IE-9.6)

Planlayıcı her kararının nedenini kaydeder. "Neden bu?" düğmesi bunu Türkçe tek cümleyle gösterir.

---

## BY-3 Değerlendirici ("çevrimdışı düzelten öğretmen")

İlke: **Kesinlik, kapsamdan önemlidir.** Emin olmadığı hatayı hata diye göstermez. Yanlış düzeltme, düzeltme yapmamaktan daha zararlıdır.

1. **Girdi (BY-3.1):**
   - Konuşma **yerel eklentiyle** metne çevrilir. Sıra:
     1. iOS 26 SpeechAnalyzer/SpeechTranscriber (tamamen cihazda, Almanca destekli; dil modeli ilk kurulumda indirilir)
     2. Yoksa SFSpeechRecognizer, cihaz üstü zorunlu ve beklenen yanıtlar bağlam ipucu olarak verilir
     3. Tarayıcının konuşma tanıma arayüzü yalnızca çevrimiçi son yedektir; WKWebView'da izin sorunu bilinir
   - **Pedagojik sınır:** Konuşma tanıma, öğrencinin artikel, hâl ve ek hatalarını doğru biçime çekebilir. Bu yüzden sesli girdide doğru/yanlış yalnızca **kabul kümesiyle eşleşme** üzerinden verilir. Biçim (morfoloji) hataları yazılı ve dokunmalı maddelerden ölçülür (OD-4 K3 şartı).
   - Yazma girdisi doğrudan alınır.
2. **Katmanlı kontrol:**
   1. Normalleştirme: büyük/küçük harf, noktalama, sayılar, umlaut yazım varyantları
   2. Kabul edilen yanıt kümeleri (en az 3 varyant, mevcut kural)
   3. Kalıp eşleştirici: yuvalı kalıp dilbilgisi, ör. `Ich hätte gern + [Akk-NP]`
   4. Morfoloji çözümleyici: artikel, hâl, sıfat çekimi, fiil çekimi; BY-10.2 tablolarıyla
   5. Türkçe kaynaklı hata dedektörleri (BY-10.4)
   6. Puanlama ölçeği (OD-4.2)
3. **Serbest metin:** Bilinen yapılar kontrol edilir. Bilinmeyen kısım için Katman 1 ya da 2 varsa ona danışılır. Yoksa öğrenciye "Anlaşılıyor; şu kısmı çevrimiçi olunca birlikte kontrol edelim" denir ve kısım kuyruğa alınır. **Uydurma düzeltme yoktur.**
4. **Geri bildirim:** En önemli 1–3 hata, D1/D2/D3 önceliğiyle (LS-10). Türkçe kısa açıklama, doğru biçim, ikinci deneme.

---

## BY-4 Üretici ("içeriği hiç bitirmeyen")

1. **K2 motoru:** Şablon + sözlük + morfoloji. Yapım gereği doğru cümle üretir. Aynı kalıbı farklı kelime, kişi, zaman ve bağlamla kurar. Yanlışta "başka cümle, başka fotoğraf" kuralını uygular.
2. **Durum üreteci:** Yer × kişi × sorun × ruh hâli × zorluk düğmeleri (IE-6). Her bileşen dilbilimci onaylı parçalardan seçilir.
3. **Dallanan diyalog grafikleri** (çevrimdışı rol oyunu):
   - Her düğümde karşı tarafın repliği vardır.
   - Öğrencinin olası **niyetleri** (ör. randevu iste, saat öner, reddet, anlamadım de) tanımlıdır.
   - Her niyetin kabul kümesi ve tetikleyici kalıpları bulunur.
   - Niyet tanıma; anahtar kelime, kalıp eşleştirme ve basit benzerlik puanıyla yapılır.
   - Tanınmayan yanıtta karakter doğal bir onarım cümlesi söyler ("Wie bitte? Meinen Sie …?"). Bu, gerçek hayatın da bir dersidir.
   - Grafikleri yazar ve dilbilimci yazar.
4. **Karakter hafızası:** Cihazda bir olgu tablosu tutulur (ör. "öğrenci perşembe doktora gidecekti", "kedisi var"). Karakterler sonraki sohbette bunu sorar. Olgular yalnızca öğrencinin uygulamada söylediklerinden gelir ve cihazda kalır.

---

## BY-5 Dünya simülasyonu ("canlı köy")

Mevcut hikâye dünyası (12 kalıcı karakter, 26 haftalık hikâye, gerçek takvim) bir **simülasyon** olarak çalışır.

- **Oyun saati gerçek saattir.** Karakterlerin günlük programı vardır: fırıncı sabah fırındadır, iş arkadaşı öğle arasında molada, komşu akşam evde.
- **Olay zamanlayıcısı:** Sesli mesajlar, mektuplar ve komşu notları gerçekçi saatlerde **uygulama içi gelen kutusunda birikir.** Telefona gönderilen bildirim (push) için **katı tavan günde 2'dir** (RQ-P07); araba modunda ve iOS Odak açıkken bildirim gönderilmez. Sürpriz "gelen arama" yalnızca öğrenci açık bir seanstayken gelir; iş başında ya da yolda telefonu çaldırmaz.
- **İlişki göstergesi:** Karakterler öğrenciyi tanıdıkça davranışları değişir. Sie'den du'ya geçiş teklif edilir (IE-1.9), yeni sahneler ve davetler açılır.
- **Seçimlerin sonuçları kalıcıdır:** Hikâye durumu cihazda tutulur.
- **Takvim:** Takvim olayları (IE-3) tarihe göre otomatik gelir.
- **Hava:** Çevrimiçiyken hava durumu önbelleğe alınır; çevrimdışında mevsim ortalaması kullanılır.
- **Yerel radyo bülteni** (IE-2 #20) haftalık olarak dünya durumundan kurulur.

---

## BY-6 Geri dönüş ve yaşam olayları

| Durum | Ne olur |
|---|---|
| 1 gün kaçırma | Hiçbir şey. Seri korunur (haftada 1 dondurma hakkı, IE-7). |
| 2–6 gün ara | **Flashback** (5–10 dk): <br>1. "Bu arada köyde ne oldu?" (60 sn sesli hikâye özeti) <br>2. En çok unutulma riskindeki 10–15 öğenin hızlı geri çağırması <br>3. Kesin başarılı kısa bir görev <br>4. Normal plan <br>Biriken tekrarlar 3–5 güne yayılır; tekrar çığı olmaz. |
| 7–20 gün ara | **3 günlük dönüş rampası:** 1. gün planın %60'ı tekrar, 2. gün %40, 3. gün normal. Kısa bir kontrol yapılır; düşen öğeler bir K düzeyi iner. |
| 21+ gün ara | 10 dakikalık **yeniden yerleştirme kontrolü** yapılır, plan buna göre kurulur. Hikâyede "Uzun zamandır yoktun!" sahnesi gelir. |
| "Hastayım / yorgunum" (tek dokunuş) | 10 dakikalık yumuşak mod: yalnızca dinleme ve tanıma, konuşma yok, seri korunur. Ertesi gün hikâyede bir karakter "Gute Besserung! Geht's dir besser?" der; bu da bir derstir. |
| Yoğun hafta / tatil | Günde 15 dakikalık asgari plan: tekrar ve tek bir üretim. |
| Sınav yaklaşıyor | Sınava 8 hafta kala plan ağırlığı sınav biçimine kayar (BY-7). |

---

## BY-7 Ölçme takvimi

| Ölçme | Ne zaman | Biçim |
|---|---|---|
| **Yerleştirme** | İlk kurulum ve 21+ gün aradan sonra | Uyarlamalı, 10–15 dk, dört beceri |
| **Ünite kapısı** | Her ünite sonu | "Yapabiliyorum" performans görevi (OD-4.2) |
| **Gecikmeli kontrol** | Ünite geçildikten 7 gün sonra | Ayrı etkinlik değil; tekrara ve hikâyeye gömülü (OD-5) |
| **Seviye sınavı provası** | Her alt seviye sonunda | Sınav biçimi: okuma, dinleme, yazma, konuşma bölümleri ve süreleri (biçim referansı KAYNAKLAR §3; sorular tamamen bizim) |
| **Aylık ölçüm** | Her ay aynı gün | Aynı görevler; 60 sn "kendini anlat" kaydı bir ay öncekiyle yan yana (LS-16.1) |
| **Sınav geri sayımı** | Sınav tarihi ayarlarda girilirse (cihazda) | Son 8 haftada haftalık tam deneme |

**Ölçme araçları:**
- Yerleştirme ve seviye provaları için seviye başına **uzman etiketli, sabit kısa formlar** kullanılır (~60 madde, birkaç paralel form). Tek öğrenciyle istatistiksel kalibrasyon (IRT) yapılamayacağı için tam uyarlamalı test yoktur. Yerleştirme basit dallanma ile uyarlanır: iyi gidersen bir üst seviyenin formuna geçilir.
- **Öğrenci modelinde iş bölümü:** Kapılar için tek kaynak K düzeyidir (OD-4). FSRS yalnızca tekrar **zamanlamasını** yapar. Beceri tahmini yalnızca zorluk bandını ayarlar.
- **Ölçme yükü sınırı:** Açık ölçme (yerleştirme, prova, aylık ölçüm) haftalık çalışma süresinin ≤ %8'i.

---

## BY-8 Öz denetim: içerideki PM klonu

Uygulama her gün kendini denetler; ihlalleri kaydeder ve düzeltir.

**Denetlenen kurallar:**
- Hazırlık ihlali: öğretmeden isteme
- Aynı biçimin tekrarı
- 3 gün üst üste başarı bandı dışı
- Bir ekranda bırakma oranının artması
- Bir becerinin 7 gün ihmal edilmesi
- Kalıcı hata sınıfı oluşması

**Düzeltme:** Planlayıcının ağırlıkları politika sınırları içinde otomatik ayarlanır. Sınır dışına çıkmak gerekirse bu durum haftalık rapora yazılır.

**İçerik tükenme tahmini:** Her seviye ve kol için "kalan taze içerik = kaç günlük" hesaplanır. 30 günün altına düşerse öğrenciye görünmeyen bir işaret konur. Bu sayı, öğrencinin elle paylaştığı **haftalık özet**te yer alır (YOL_HARITASI "Haftalık özeti paylaş"); kişisel bilgi içermez. İçerik ekibi o seviyeye öncelik verir.

**Haftalık öğrenci raporu** (tek rapor; LS-10.4'teki haftalık koç özeti de bunun içindedir). Cihazda şablonla, Türkçe üretilir:
- Bu hafta ne öğrendin
- Hangi "yapabiliyorum" açıldı
- Bir ses karşılaştırması
- Gelecek haftanın hedefi

---

## BY-9 Politika dosyası: klonun "beyni"

- Bütün eşikler, ağırlıklar ve kurallar tek bir `web/src/brain/policy.json` dosyasındadır. Her kural kaynak kimliğini taşır (`OD-4`, `IE-9.2`, `LS-12.1`…).
- **Kod kural uydurmaz.** Politikayı okur ve uygular. PM belgeleri böylece makinenin okuyacağı biçime girer. Bu, "Claude'un uygulamanın içindeki klonu" isteğinin mühendislikteki karşılığıdır: PM'in öğretim aklı belgelerde, belgeler politikada, politika algoritmada.
- Politika değişikliği yalnızca test ve simülasyon sonuçlarıyla birlikte yapılır (BY-12).

---

## BY-10 Bilgi bankası: "beslenmiş"

Hepsi cihazda ve çevrimdışıdır; içerik paketleriyle gelir ve güncellenir.

1. **Sözlük:** K1/K2 derin kartlar (fotoğraf, cümle, ses, Türkçe açıklama)
2. **Morfoloji tabloları:** İsim çekimi (cins, çoğul, hâl), fiil çekimi (bütün zamanlar, Partizip II, haben/sein seçimi, ayrılabilir önekler), sıfat çekimi. Açık kaynaklardan türetilir (KAYNAKLAR A sınıfı) ve dilbilimci onaylıdır.
3. **Kalıp bankası** (mevcut standart) ve **diyalog grafikleri**
4. **Türkçe kaynaklı hata bankası (≥ 150 desen):** Her desen için tespit kuralı, Türkçe açıklama, karşılaştırma notu, onarım alıştırması. Örnekler:
   - Fiil ikinci sırada değil
   - Yan cümlede fiil sona gitmemiş
   - Artikel ya da hâl hatası
   - Perfekt'te haben/sein karışıklığı
   - Ayrılabilir önekin ayrılmaması
   - kein/nicht karışıklığı
   - Zaman–tarz–yer sırası
   - Sıfat çekimi
   - Sie/du tutarsızlığı
   - Türkçeden kelimesi kelimesine aktarım
5. **Madde bankası** (BY-7), **kültür kartları** (IE-2 #17), **kabul kümeleri**
6. **Bairisch katmanı:** Yalnızca kaynaklı (KAYNAKLAR §7)

---

## BY-11 Ses: çevrimdışı, ücretsiz

- **Paket sesleri derleme anında üretilir:** CI'da, açık lisanslı ve yerelde çalışan bir Almanca ses sentezi ile (ör. Piper sesleri; **lisans ses bazında kontrol edilir** ve KAYNAKLAR'a yazılır). Her karakterin sabit sesi vardır. Ücretli ses servisi kullanılmaz.
- **Dinamik metin** (K2 motoru, durum üreteci) yerel bir eklentiyle iOS'un kendi ses motorundan (AVSpeechSynthesizer) okunur. Gelişmiş ya da premium Almanca sesler çevrimdışı çalışır. Kurulumda öğrenciye bu seslerin nasıl indirileceği tek ekranla gösterilir. WKWebView'daki tarayıcı ses arayüzüne güvenilmez.
- **Depolama:** Öğrenci modeli ve ses paketleri tarayıcı deposunda değil, **Capacitor Filesystem/SQLite** üzerinde tutulur (iOS tarayıcı deposunun silinme riskine karşı, RQ-P01).
- **Boyut bütçesi:** Ses AAC, 32 kbps, mono (saatte ≈ 14 MB). Başlangıç paketi ≤ 400 MB, seviye paketi ≤ 250 MB, güncelleme fark paketi ≤ 60 MB.
- Açık lisanslı gerçek ses kayıtları (KAYNAKLAR A sınıfı) farklı ses ve aksan çeşitliliği için kullanılır.

---

## BY-12 Kabul ve testler

1. **Uçak modu testi**, iki katmanda:
   - **(a) CI (WebKit):** Ağ tamamen kapalı, yerel eklentiler sahte. Tam bir günlük plan baştan sona yürünür: tekrar, yeni öğrenme, üretim, çevrimdışı rol oyunu, değerlendirme, flashback, ölçme. Hiçbir ekranda "internet gerekli" çıkmaz.
   - **(b) Gerçek cihaz kontrol listesi** (her sürümde, iPhone 15 Pro Max): uçak modu, mikrofon izni (RQ-P02), sesler, kilitli ekranda araba modu 20 dk, 7+ gün sonra verinin durması, düşük disk alanı.
   - **Araba modu** ekranı uyanık tutar ve sesi yerel bir ses kuyruğundan çalar. Bekleme aralıkları dahil önceden hazırlanmış bir çalma listesi kullanılır, çünkü arka plandaki web görünümünde zamanlayıcılar durur.
2. **Simüle öğrenciler** (deterministik, 60 gün): Güçlü, ortalama, zayıf, 5 gün ara veren, 25 gün ara veren, hasta modu kullanan öğrenciler. Aşağıdaki değişmezler kontrol edilir:
   - Öğretmeden isteme 0
   - Art arda aynı biçim 0
   - Tekrar çığı yok (günlük tavan aşılmaz)
   - Başarı bandı ortalaması %75–85
   - Flashback ve rampa doğru tetikleniyor
   - Seviye kapıları kanıtla açılıyor
   - Çözümsüz ya da boş plan 0
   - 60 günde günlük bildirim sayısı ≤ 2
   - Açık ölçme payı ≤ %8
3. **Değerlendirici kesinlik testi:**
   - **Altın set:** Dilbilimci onaylı ≥ 500 doğru ve ≥ 500 hatalı öğrenci cümlesi. Setin ≥ %30'unu hata bankasını **görmemiş** ayrı bir ajan yazar. Konuşma tanımadan geçmiş varyantlar da sete girer.
   - **Hedefler:** Doğru cümleye hata deme oranı ≤ %1. Hatalı cümlelerde tespit oranı ilk sürümde ≥ %70, R3'te ≥ %85.
6. **Gerçek öğrenci ölçütleri** (cihazda tutulur, haftalık özete girer):
   - 7 gün içinde geri dönüş
   - Seans tamamlama ≥ %80
   - Aylık 60 sn kayıtta dakikadaki kelime ve duraklama sayısı
   - Ayda yapılan gerçek görev sayısı
4. **Katman 1 yok yolu:** Katman 1 olmayan cihazda bütün testler geçer.
5. **Performans:** Planlayıcı kararı ≤ 50 ms, değerlendirme ≤ 150 ms (konuşma tanıma hariç). Paket boyutu ve depolama kalıcılığı RQ-P ölçütlerine uyar.

---

## BY-13 Sürüm dağılımı

| Sürüm | BEYİN kapsamı |
|---|---|
| R1 | Öğrenci modeli (K düzeyleri, FSRS), planlayıcı (kısıtlar + puan, seans yayı), hazırlık kontrolü, değerlendirici adım 1–4 ve 6, flashback ve hasta modu, uçak modu testi, `policy.json` |
| R2 | Dallanan diyalog grafikleri (çevrimdışı rol oyunu), karakter hafızası, olay zamanlayıcısı ve gelen kutusu, gömülü gecikmeli kontrol, hata bankası (ilk 80 desen), haftalık rapor, yerel konuşma tanıma ve ses eklentileri, **Katman 1 teknik denemesi** |
| R3 | Katman 1 sohbet partneri (deneme geçerse), dünya simülasyonu tam, kısa form yerleştirme, kişisel FSRS eğitimi, hata bankası 150+ |
| R4–R5 | Seviye sınavı provaları, sınav geri sayımı, öz denetim tam, değerlendirici R3 hedefleri |
