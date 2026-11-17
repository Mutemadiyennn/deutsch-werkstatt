# Deutsch Werkstatt 2.0 — ÖĞRENME SİSTEMİ (ana belge)

> Sahibi: proje yöneticisi (CEO). Tarih: 17.11.2026. Sürüm: 1.0
> Bu belge ürünün **en üst belgesidir.** Öğrencinin deneyimi, öğretim yöntemi, günlük akış, bağlam modları, oyunlaştırma, ölçüm ve sürüm sırası buradan yönetilir.
> Öncelik sırası: **LEARNING_SYSTEM.md > PEDAGOGY.md > phases/ > BLUEPRINT.md.** İçerik şeması ve doğrulayıcı kuralları için PEDAGOGY.md geçerlidir; deneyim, sıra ve davranış konusunda çelişki varsa bu belge geçerlidir.
> Kişisel bilgi içermez. Öğrencinin profili: docs/v2/LEARNER.md.
> Her gereksinimin bir kimliği vardır (ör. **LS-4.3**). Görevler, PR'lar ve denetim raporları bu kimliklere atıf yapar.

---

## 0. Kuzey yıldızı

**LS-0.1 Tek cümlelik amaç:** Öğrenci 6 ayın sonunda telefonu açıp randevu alabilsin, molada iş arkadaşlarıyla sohbete katılabilsin, doktora derdini anlatabilsin, resmî dairede işini çözebilsin; takıldığında İngilizceye kaçmadan "Wie bitte? Etwas langsamer, bitte." diyerek konuşmayı sürdürebilsin.

**LS-0.2 Başarı ölçütleri (hepsi ölçülür):**

| Ölçüt | Hedef |
|---|---|
| Uygulamayı kendi isteğiyle açma | Haftada ≥ 5 gün (1. ayda ve 3. ayda aynı) |
| Bugün kendi kurduğu cümle | Gün başına ≥ 40 (1. haftadan sonra) |
| Gerçek hayat görevi | Haftada ≥ 2 (2. aydan itibaren) |
| İngilizceye kaçma (simülasyon + bildirilen) | Her ay bir önceki aydan az |
| Konuşma hızı (aylık 60 sn kaydı, dakikadaki kelime) | Her ay artar |
| "Yapabiliyorum" listesi | Ay 2: 6 durum · Ay 4: 14 · Ay 6: 24 |

**LS-0.4 Nihai hedef (PM-009, RQ-S28):** Uygulama sayesinde günlük hayatta Almancayı **neredeyse ana dil rahatlığıyla** konuşmak. 6 ay ve B1 yolun ilk büyük durağıdır, sonu değildir; ürün B1'den sonra da öğrenciyle büyür (§17 R6–R8). "Bitti" denmez: kütüphane hiçbir zaman tamam değildir (LS-17.2).

**LS-0.3 Anti-hedefler (asla):**
- Gramer kitabına dönüşmek. Uzun kural listeleri, bağlamsız tablolar.
- Kısır döngü: aynı konu, aynı ritim, aynı alıştırma.
- Öğrenciyi "bakma"ya mahkûm etmek. Her ekran ya dinletir ya söyletir ya kurdurur.
- Yapay zekâ hata verdi diye dersin durması.
- Ekranda zaman geçirtmeyi başarı saymak.
- Çocuksu, abartılı, sahte motivasyon.

---

## 1. Öğrenme bilimi → ürün kararları

Her ilke bir ya da daha fazla ürün özelliğine dönüşür. Özelliği olmayan ilke yazılmaz.

| İlke | Ne der | Üründe karşılığı |
|---|---|---|
| **Dört kol dengesi** (Nation) | Verimli dil programında süre aşağı yukarı eşit dört kola bölünür: anlamlı girdi, anlamlı çıktı, dile odaklı çalışma, akıcılık. | Günün 4 seansı bu dört kola göre kurulur (LS-5.1). Akıcılık kolu ayrıca ölçülür; v1'de neredeyse hiç yoktu. |
| **Hatırlama etkisi** | Hatırlamaya çalışmak, tekrar okumaktan çok daha kalıcıdır. | "Anladım" düğmesi yok. Her tanıtımı 1 dakika içinde bir hatırlama maddesi izler (LS-6.2). |
| **Aralıklı tekrar** | Unutmanın eşiğinde yapılan tekrar en verimlisidir. | FSRS; pasif ve aktif için ayrı vade (LS-7.3). |
| **Karışık çalışma** (interleaving) | Konuları karıştırmak, blok blok çalışmaktan daha iyi kalıcılık verir. | Tekrarlar farklı senaryo ve karakterlerden karışık gelir (LS-12.3). |
| **Anlaşılır girdi** | Bilinen kelime oranı yüksek, biraz zorlayıcı girdi edinimi besler. | Dinleme ve hikâye metinlerinde bilinen öğe oranı ≥ %95 hedeflenir (LS-8.2). |
| **Zorlanmış çıktı** | Konuşmaya çalışırken öğrenci boşluğunu fark eder. | Her senaryoda ≥ 80 üretim maddesi; "Almanca nasıl derim?" (LS-6.3). |
| **Kalıp dil** (formulaic language) | Akıcı konuşmanın büyük kısmı hazır kalıplardan oluşur. | Öğretim birimi kelime değil ifade ve kalıptır (LS-6.1). |
| **Beceri edinimi** (bilgi → işlem → otomatiklik) | Kuralı bilmek ile otomatik kullanmak ayrı aşamalardır; otomatiklik çok sayıda hızlı tekrarla gelir. | Hız turları (LS-6.4), 4/3/2 monoloğu (LS-9.4), tekrarlanan görev. |
| **Üretme etkisi** | Kendi ürettiğin şeyi daha iyi hatırlarsın. | Öğrencinin kendi cümleleri (LS-9.6), kendi hayatından örnekler. |
| **İkili kodlama** | Görsel + söz birlikte daha kalıcıdır. | Somut kelimelerde fotoğraf; sahneli örnek cümle (v1 kuralı). |
| **Duygusal filtre ve kaygı** | Kaygı öğrenmeyi ve konuşmayı bloke eder. | Kademeli maruz kalma (LS-11.2), "hata yapmak öğrenmektir" mesajı, cezasız "Bu ne demek?". |
| **Öz yeterlik** | "Yapabilirim" inancı en güçlü motivasyon kaynağıdır ve başarı deneyimiyle oluşur. | İlk 3 dakikada ilk başarı (LS-2.2); "Yapabiliyorum" listesi; gerçek görevler. |
| **Öz belirleme** (özerklik, yeterlik, bağlılık) | İnsan seçebildiğinde, ilerlediğini gördüğünde ve bir şeye bağlı hissettiğinde devam eder. | Günün seçimi (LS-5.4), ilerleme görünürlüğü, kalıcı karakterler ve hikâye (H4). |
| **Alışkanlık** | Sabit tetikleyici + küçük başlangıç + ödül. | Günlük hatırlatma, 2 dakikalık "hemen başla" girişi, kurtarma modu (LS-10.6). |
| **İstenen zorluk** | Biraz zorlanmak öğrenmeyi artırır; çok zorlanmak bıraktırır. | Başarı bandı %80–85'te tutulur (LS-12.1). |

---

## 2. Öğrenci yolculuğu

### 2.1 İlk açılış: ilk 10 dakika (birebir senaryo)

**LS-2.1 Kural:** İlk açılışta form, sınav ya da uzun açıklama YOK. İlk ekran öğrenciyi konuşturur.

| Süre | Ekran | Ne olur |
|---|---|---|
| 0:00 | Karşılama | Tek cümle, Türkçe: "Burada Almancayı okuyarak değil, konuşarak öğreneceksin. Başlayalım." Tek düğme: "Başla". |
| 0:20 | **İlk cümlen** | Bir ses: „Grüß Gott! Ich hätte gern einen Termin." Türkçesi altında. "Şimdi sen söyle." Mikrofon. Konuşma tanıma hoşgörülüdür; anlaşılır her deneme başarıdır. |
| 0:50 | İlk başarı | Titreşim + kısa ses + "Bu cümleyle bir muayenehaneden randevu isteyebilirsin." İlk XP. |
| 1:00 | İkinci cümle | „Entschuldigung, wie bitte? Etwas langsamer, bitte." "Bu cümle seni her konuşmada kurtarır." |
| 1:40 | Kısa profil (tek ekran, hepsi isteğe bağlı) | Ad (yalnızca cihazda) · hitap (Herr/Frau, cümlelerde kullanılır) · "En çok hangi durumlarda zorlanıyorsun?" (3 seçim) · günlük süre (varsayılan 100 dk) · "Araba kullanıyor musun? Spora gidiyor musun? Toplu taşıma?" (bağlam modları için). |
| 3:00 | **Oyun gibi seviye tespiti** (≤ 5 dk) | 3 hızda kısa dinleme, 5 kurma maddesi, 1 mini telefon simülasyonu. "Sınav" kelimesi kullanılmaz; sonuçlar puan değil, "buradan başlıyoruz" olarak gösterilir. Atlanabilir. |
| 8:00 | **Kendini anlat** (60 sn, isteğe bağlı) | "Kendini Almanca anlatmayı dene; bilmediğin yerde Türkçe söyle." Kayıt yalnızca cihazda. Bir ay sonra aynı görevle karşılaştırılacak. |
| 9:00 | Nasıl öğreneceksin (3 kart, 30 sn) | ① Anlamak ve konuşmak ayrı kaslar; biz konuşma kasını çalıştıracağız. ② Hata yapmak öğrenmenin kendisi; hiçbir hata cezalandırılmaz. ③ Günde 100 dakika + dışarıda 1 cümle. |
| 9:30 | Bugünün planı | Bugün için kısa bir plan; ilk seans hemen başlar. |

**LS-2.2 Ölçüt:** İlk başarı en geç 60. saniyede gelir. İlk 10 dakikada öğrenci en az 5 cümleyi kendi sesiyle söylemiş olur.

### 2.2 İlk hafta: hayatta kalma seti

**LS-2.3 İlk hafta içeriği (sırayla):**
1. Strateji 01–03: anlamadım deme, tekrar ettirme, yavaşlatma, başka sözle anlatma, zaman kazanma, anladığını doğrulama. **Bunlar her şeyden önce gelir**, çünkü bilmediği kelime öğrenciyi durdurmamalı.
2. Kendini tanıtma ve "Benim cümlelerim"in ilk 15 cümlesi: ad, nereden, ne iş, ne zamandır burada, Almanca öğreniyorum.
3. Telefon 01 (randevu almak).
4. İlk mola sohbeti (Pausengespräch 01–03).
5. Hikâyenin 1. bölümü (dinleme bölümü olarak).
6. Gün 5–7: **ilk gerçek görev**, düşük riskli: fırında "Ich hätte gern…" ile sipariş vermek ya da bir dükkânı arayıp açılış saatini sormak.

**LS-2.4 İlk hafta sonu ölçütü:** Öğrenci strateji cümlelerini ipucusuz söyleyebiliyor, kendini 30 saniye tanıtabiliyor, bir gerçek görevi denemiş.

### 2.3 Altı ay: aşamalar

| Dönem | Odak | "Yapabiliyorum" hedefleri (örnek) |
|---|---|---|
| Ay 1 | Hayatta kalma + telefon korkusunu kırma | Anlamadığını söylemek · kendini tanıtmak · telefonla randevu almak · fırında/markette sipariş ve soru |
| Ay 2 | Günlük işler + iş yerinde ilk sohbetler | Randevu ertelemek · eczane · molada 2 dk sohbet · hafta sonunu anlatmak |
| Ay 3 | Resmî işler + sorun anlatmak | Bürgerbüro/Amt · banka · ev sahibine arıza bildirmek · şikâyet etmek |
| Ay 4 | Hızlı Almanca + Bavyera kulağı | Hızlı konuşanı takip etmek · yaygın Bavyera ifadelerini anlamak · telefonda habersiz aramayı karşılamak |
| Ay 5 | Spontane sohbet ve fikir söylemek | Molada 5 dk sohbet · fikir söylemek, katılmamak · plan yapmak, davet |
| Ay 6 | Bağımsızlık + B1 hazırlığı başlangıcı | Beklenmedik durumları çözmek · B1 konuşma bölümü formatları |
| Sınav tarihine kadar (tarih yalnızca cihaz ayarında, PM-001) | Son 6 hafta B1 ağırlıklı | Sınav formatları, yazma görevleri, deneme sınavları (LS-15) |

---

## 3. "Konuşabilmek" neyden oluşur (beceri modeli)

**LS-3.1** Konuşabilmek tek bir beceri değil, yedi bileşendir. Her biri ayrı çalıştırılır ve ayrı ölçülür:

| Bileşen | Nasıl çalıştırılır | Nasıl ölçülür |
|---|---|---|
| A. Anlamak (hız, ağız) | Kulak Salonu (LS-8) | Hıza göre ilk dinlemede anlama oranı |
| B. Cümle üretimi | Kurma merdiveni (LS-6) | Kurma başarısı, ipucu kullanımı |
| C. Kelimeye erişim | Kelime motoru (LS-7), hız turları | Aktif kalıcı öğe sayısı, cevap süresi |
| D. Otomatiklik ve akıcılık | Hız turları, 4/3/2, tekrarlanan görev | Cevap süresi, dakikadaki kelime, duraksama sayısı |
| E. Anlaşılır telaffuz | Telaffuz öncelikleri (LS-9.5), shadowing | Konuşma tanımanın anlama oranı, öz değerlendirme |
| F. Etkileşim stratejileri | Strateji senaryoları, her senaryonun hazırlık kartı | Simülasyonda strateji kullanımı, İngilizceye kaçma sayısı |
| G. Cesaret ve kültür | Kademeli maruz kalma, gerçek görevler, kültür notları | Gerçek görev sayısı, gelen aramaya cevap verme |

---

## 4. Türkçe konuşan öğrenciye özel öğretim (karşıtsal notlar)

**LS-4.1 Avantajlar (öğrenciye söylenir, cesaret verir):**
- **ü ve ö** Türkçede de var. Birçok öğrencinin zorlandığı sesler sana tanıdık.
- **Yan cümlede fiil sonda** (weil, dass, wenn): Türkçede de fiil sonda. "…, weil ich krank **bin**" Türkçenin mantığına yakın.
- **Sie / du** ayrımı Türkçedeki **siz / sen** ile aynı mantıkta.
- Almanca okunduğu gibi yazılan bir dile yakın; Türkçe okuma alışkanlığı işe yarar. Kısa eşleme kartı: ei = "ay", eu/äu = "oy", ie = uzun "i", sch = "ş", ch = (Türkçede yok, ayrıca çalışılır), z = "ts", w = "v", v = çoğunlukla "f".
- Türkçede Almancadan gelen birkaç kelime var (şalter ← Schalter, otoban ← Autobahn, fön ← Föhn). İngilizce de birçok kelimede köprü olur (Haus, Hand, Wasser, Telefon) ama açıklama dili hep Türkçedir; İngilizce yalnızca "yanlış arkadaş" uyarısında geçer.

**LS-4.2 Tipik zorluklar ve öğretim kararları:**

| Zorluk | Öğretim kararı |
|---|---|
| Artikel (Türkçede yok) | Kural ezberi yok. ① Her isim artikeliyle ve kalıp içinde öğretilir ("einen Termin machen"). ② Renk: der mavi, die kırmızı, das yeşil (v1 kuralı). ③ Yüksek getirili 10 ipucu kartı: -ung/-heit/-keit/-ion → die; -chen/-lein → das; -er ile biten kişiler çoğunlukla der; günler, aylar, mevsimler → der… ④ "Artikel kulağı" mini oyunu. ⑤ **Konuşmada artikel hatası anlamı bozmuyorsa düzeltme önceliği düşüktür** (LS-10.2). |
| Akkusativ / Dativ | Tablo yerine "değişen tek şey" kuralı: `haben`/`brauchen`/`möchte` sonrası yalnızca der → einen/den. Dativ yalnızca kalıplarla: "Mir tut … weh", "mit dem Bus", "beim Arzt". |
| Ana cümlede fiil 2. sırada | Türkçede fiil sonda olduğu için en sık hata. Kalıp şablonları fiili hep 2. kutuda gösterir; dönüşüm alıştırmalarında "Morgen **habe** ich…" gibi zaman başa alınır. |
| Ayrılabilen fiiller (anrufen → ich rufe … an) | "Sandviç" görseli: fiilin başı sona gider. Telefon alanında erken (anrufen, zurückrufen). |
| Perfekt (haben/sein) | "Hareket ve değişim → sein" tek kuralı + en sık 20 fiil kalıp halinde. |
| Seslerde boğum: "Straße" → "Şıtraße", "Stadt" → "İştat" (Türkçede ünsüz kümesine ünlü ekleme) | Telaffuz önceliği (LS-9.5): ünsüz kümeleri, kelime sonunda sertleşme (Tag → "tak"), ch sesi, uzun-kısa ünlü (Staat/Stadt), r. |
| "halb zehn" = 9:30 | Saat alıştırmalarında ayrı tuzak kartı; dinlemede bilinçli olarak sık kullanılır. |

---

## 5. Günlük motor

### 5.1 Dört seans = dört kol

**LS-5.1** Varsayılan gün (100 dk = 4 × 25 dk; v1 süre ölçümü korunur):

| Seans | Kol | İçerik |
|---|---|---|
| S1 | Dile odaklı çalışma | Vadesi gelen tekrarlar (≤ 10 dk) + yeni ifadeler (aşama 1–2) + hatadan mini ders (koçtan, ≤ 3 dk) |
| S2 | Anlamlı çıktı + **akıcılık** | Kurma merdiveni (aşama 3–4) + **hız turu** (LS-6.4) |
| S3 | Anlamlı girdi | Kulak Salonu + hikâye bölümü + shadowing |
| S4 | Anlamlı çıktı + akıcılık | Destekli/bağımsız diyalog, gelen arama ya da mola sohbeti, 4/3/2 monoloğu, gerçek görev hazırlığı |

**LS-5.2** Her 5–7 dakikada etkinlik türü değişir. Aynı alıştırma tipi art arda en fazla 2 kez.

**LS-5.3** En az 4 gün şablonu dönüşümlü kullanılır (ör. "telefon günü", "hikâye günü", "mola günü", "şehir günü"); şablonlar dört kol dengesini korur ama ritmi değiştirir.

**LS-5.4 Seçim:** Günün başında tek dokunuşlu soru: "Bugün nasılsın?" → Enerjik (normal gün) · Az zamanım var (25 dk yoğun) · Yorgunum (kurtarma modu, LS-10.6) · Sadece dinlemek istiyorum. Ayrıca "Neredesin?" (LS-5.5).

### 5.2 Bağlam modları

**LS-5.5** Öğrenci her seansta bulunduğu yeri tek dokunuşla seçer; uygulama günün saatine göre öneri yapar (ör. hafta içi 07:30 → "Araba?"). Her mod kendi etkinlik havuzunu kullanır; hepsi Pomodoro'ya ve öğrenci modeline sayılır.

| Mod | Ekran | Ses / mikrofon | Etkinlikler | Kurallar |
|---|---|---|---|---|
| **Masa** | Tam | Tam | Her şey | Varsayılan |
| **Araba** | **YOK** (bakmak gerekmez) | Dinle + konuş | **Beklemeli hatırlama** (Türkçe istem → 4 sn sessizlik → öğrenci Almancasını söyler → doğrusu çalınır → öğrenci tekrar eder), hikâye bölümü, telefon diyaloğunda rol, 4/3/2 monoloğu | Sürüşten önce tek dokunuşla başlar; otomatik ilerler; sesli komutlar ("tekrar", "devam", "yavaş"; Almanca "nochmal, weiter, langsamer"); yazma, okuma, dokunma gerektiren hiçbir şey yok. Konuşma tanıma gürültüde puanlamaz, yalnızca kayda alır. Güvenlik notu ilk kullanımda gösterilir. |
| **Spor salonu** | Büyük düğmeler, tek el | Kulaklık; **konuşma yok** | Hikâye bölümü (sesli drama), dinleme-anlama (set aralarında büyük düğmeyle cevap), tanıma tekrarları, sessiz shadowing (dudak) | Set arası mikro blok 45–90 sn; "set bitti" düğmesiyle ilerler. |
| **Toplu taşıma** | Tam | Kulaklık; **sesli konuşma yok** | Okuma, dokunma, yazma, dinleme, kurma maddelerini yazarak | "Fısıltı modu" isteğe bağlı. |
| **Yürüyüş** | Yok ya da az | Dinle + konuş | 4/3/2 monoloğu, beklemeli hatırlama, hikâye | Araba moduna benzer, daha esnek. |
| **Ev işi / mutfak** | Yok | Dinle + konuş | Beklemeli hatırlama, diyalog rolü, hikâye | Eller serbest; sesli komutlar. |
| **İş molası (5–15 dk)** | Tam | Duruma göre | Mola sohbeti, hızlı tekrar, tek hız turu | Mola bitince otomatik kapanış. |
| **Yatmadan önce** | Kısık | Dinle | Hikâye, hafif tekrar | Yeni öğe yok. |

**LS-5.6** Hikâyenin her bölümü (H4 dünyası) **çok sesli sesli drama** olarak da üretilir. Her karakterin kendine özgü sesi (önce hazır doğal ses, yedek cihaz sesi; LS-8.6) ve konuşma hızı vardır. Araba ve spor salonunda ana içerik budur.

### 5.3 Kurs senkronu

**LS-5.7** Ayarlardan "bu hafta kursta işlenen konu" (uygulamanın kendi listesinden) seçilirse, S2'deki dönüşümler ve kurma maddeleri o konuya ağırlık verir; koç o hafta bu konuyu konuşmalarda fark edip ödüllendirir. Kurs ve kitap adı hiçbir yerde geçmez.

---

## 6. Kurma motoru: "kelimeyi biliyorum ama cümle kuramıyorum" sorununun çözümü

**LS-6.1 Öğretim birimi:** ifade (chunk) ve kalıp (pattern). Kelime her zaman bir ifadenin içinde gelir. İsimler artikeliyle ve kullanıldığı hâlde gelir ("einen Termin").

**LS-6.2 Kurma merdiveni** (her kalıp için; adımlar performansa göre atlanır ya da tekrarlanır):

| Basamak | Öğrenci ne yapar | Örnek ("Ich kann leider nicht ___.") |
|---|---|---|
| 1. Duy | Kalıbı bağlam içinde duyar | Sekreter diyaloğunda geçer |
| 2. Tekrar et | Sesli tekrar | „Ich kann leider nicht kommen." |
| 3. Boşluk değiştir | Aynı kalıp, farklı fiil | … nicht **arbeiten** / nicht **warten** / nicht **so früh** |
| 4. Dönüştür | Soru, olumsuz, kibar, geçmiş | „Kann ich **morgen** kommen?" · „Ich **konnte** nicht kommen." |
| 5. Birleştir | İki kalıbı bağla | „Ich kann nicht kommen, **weil** ich krank bin." |
| 6. Türkçeden kur | TR → DE, önce yazarak sonra konuşarak | "Cuma gelemiyorum." → „Ich kann am Freitag nicht kommen." |
| 7. Duruma cevap ver | Karşı tarafın cümlesine cevap | „Passt Ihnen Freitag?" → „Freitag kann ich leider nicht." |
| 8. Hızlı söyle | Hız turunda 4 sn içinde | (LS-6.4) |
| 9. Diyalogda kullan | Destek düzeyi 3 → 0 | (aşama 5) |
| 10. Serbest kullan | Rol oyunu, gerçek görev | (aşama 6) |

**LS-6.3 "Almanca nasıl derim?"** (TR → DE) her konuşma ve kurma ekranında. Önce yerel kayıtta aranır; bulunamazsa yapay zekâ (say_it_de). Cevap üç katmandır: en basit söyleyiş · kullanılacak kalıp · "kelimeyi bilmiyorsan böyle anlat" (başka sözle). Puan düşmez; öğe aktif eksik olarak bankaya girer.

**LS-6.4 Hız turu (otomatiklik):** 60–90 saniyelik turlar. Türkçe istem gelir, öğrenci **4 saniye içinde sesli** söyler; doğrusu hemen çalınır. Yalnızca daha önce doğru üretilmiş öğelerle yapılır (yeni öğe yok). Hedef: düşünmeden söylemek. Süre **ekranda saniye olarak gösterilmez** (PM-008 §4, RQ-Ş16): kazanım Raute dolmasıyla ve "düşünmeden söyledin" gibi nitel geri bildirimle gösterilir; süre ölçümü yalnızca uyarlama için arka planda tutulur.

**LS-6.5 Yazarak ve konuşarak:** Her üretim maddesi önce konuşma ile istenir (mikrofon hazır); yazma isteğe bağlı ve sessiz modlarda zorunlu. Konuşma tanıma hoşgörülüdür: anlam doğruysa kabul; eşik ve kabul edilen varyantlar accepted[] + kural tabanlı normalizasyon (PEDAGOGY §7).

**LS-6.6 Senaryo başına asgari üretim** PEDAGOGY §5 geçerli (≥ 80 üretim maddesi). Ek kural: üretim maddelerinin ≥ %50'si sesli konuşmayla yapılabilir olmalı.

---

## 7. Kelime motoru

**LS-7.1 Seçim:** PEDAGOGY §2 (altyazı sıklığı + 20 alanın ihtiyaç listeleri + kişisel kelimeler). Öğrenci neyi neden öğrendiğini görür: "Bu kelime Almanca konuşmada en sık 300 kelime arasında" ya da "Doktorda mutlaka duyacağın kelime".

**LS-7.2 Aile ve kök:** Aynı kök ve aynı durumdaki kelimeler tek kartta (Termin → machen / verschieben / absagen / bestätigen). **Bileşik kelime ayırıcı:** uzun kelimeye dokununca parçalarına ayrılır (Kranken·versicherungs·karte = hasta · sigorta · kart).

**LS-7.3 İki yol:** Pasif (tanıma) ve aktif (üretme) ayrı FSRS vadesiyle. "Kalıcı" = iki ayrı oturumda, ≥ 3 saat arayla doğru üretim (v1 kuralı).

**LS-7.4 Günlük yük:** ~12 yeni aktif + ~25 yeni pasif. Tekrar süresi 25 dk'yı aşarsa yeni öğe otomatik azalır. Yorgunluk algılanırsa (cevap süreleri ve hata oranı artıyor) mola önerilir.

**LS-7.5 "Duyduğum kelime":** Dışarıda ya da dizide duyduğu kelimeyi öğrenci 5 saniyede ekler (yaz ya da söyle; Türkçe anlam isteğe bağlı). Uygulama kartı tamamlar, ertesi gün tekrar listesine koyar. Bu kelimeler en yüksek önceliği alır: öğrencinin hayatından geliyorlar.

**LS-7.6 Altı ay hesabı:** Bu tempoyla 6 ayda ~1.800 aktif ve ~4.500 pasif öğe (PEDAGOGY §0). Uygulama bunu "kelime sayısı" olarak değil, "artık şunları anlayabilirsin" diye somut gösterir (ör. "Bu dinleme metninin %92'sini biliyorsun").

---

## 8. Kulak Salonu (dinleme motoru)

**LS-8.1 Beş basamak:** yavaş Hochdeutsch → normal Hochdeutsch → doğal Alltag → hızlı Alltag (yutulan sesler) → Bairisch (yalnızca lisanslı gerçek kayıt ya da açık etiketli öğretim seslendirmesi). Öğrenci ilk dinlemede %60–80 anladığı basamakta tutulur; %85 üstü bir basamak yukarı, %50 altı bir basamak aşağı.

**LS-8.2 Her dinleme parçasında sıra:** altyazısız dinle → ana fikir sorusu → **sonraki cümleyi tahmin et** (konuşmanın akışını kestirmeyi öğretir) → ayrıntı soruları → transkript → bilinmeyene dokun, bankaya ekle → shadowing → isteğe bağlı dikte.

**LS-8.3 Yutulan sesler mikro dersleri:** "hab ich", "haste", "isses", "gibt's", "'nen", "ham wa", "nö", "joa" … Duyduğunu yaz → tam biçimi gör → hızlı ve yavaş karşılaştır.

**LS-8.4 Sayı, tarih, saat, isim:** Telefonun en zor kısmı. Ayrı ve sürekli bir mini akış: hızlı söylenen doğum tarihleri, telefon numaraları, saatler (halb, Viertel), heceleme (DIN 5009 + geleneksel). Her gün 2 dakika.

**LS-8.5 Gerçek medya köprüsü:** Seviyeye göre etiketli bağlantı listesi (yalnızca bağlantı). Ay 3'ten itibaren haftada bir "gerçek medya görevi": kısa bir sokak röportajı ya da dizi sahnesi; önce o videonun sık kelimeleri ön öğretilir, sonra izlenir, sonra 3 soru.

**LS-8.6 Ses kaynağı (PM-008 §2–3, §8; RQ-Ş14, Ş15, Ş20):** İçerik sesleri **doğal ses öncelikli**: önceden üretilmiş doğal ses dosyaları (yalnızca ücretsiz katman, faturasız; kaynak ve şartlar DECISIONS'a). Cihaz sesi yalnızca yedektir. "Yavaş" ≈ 0,7× gerçekten yavaşlatır. Diyalog ve hikâyede her karakterin ayrı sesi vardır. Duraklat/devam her yerde çalışır; devamda 1–2 sn geri sarılır (RQ-Ş19).

---

## 9. Konuşma motoru

**LS-9.1 Destekli → bağımsız:** PEDAGOGY ve phases/ kuralları. Partner hiçbir zaman öğretmenlik yapmaz; anlaşılır her cevaba doğal tepki verir; öğrenci iki kez takılırsa sadeleşir.

**LS-9.2 Gelen arama simülasyonu:** H4 §5 (kademeli maruz kalma). Ek: arama ekranında "Arama kartı" (o konuşmanın 5–6 cümlesi) kademe 1–2'de görünür, kademe 3'te gizlidir.

**LS-9.3 Mola sohbeti:** H4 §6. Her sohbet 3–5 dk; öğrenci en az 3 kez söz alır; karakterler öğrencinin önceki günlerde söylediklerini hatırlar ("Und, wie war dein Wochenende?").

**LS-9.4 4/3/2 monoloğu (akıcılık):** Aynı konuda önce 4, sonra 3, sonra 2 dakika (başlangıçta 60/45/30 sn) konuşmak. Konular: kendini anlat, işini anlat, hafta sonun, bir sorunu anlat. Her turda hız ve duraksama ölçülür. Araba ve yürüyüş modunda ana akıcılık etkinliği.

**LS-9.5 Telaffuz öncelikleri** (anlaşılırlığa etkiye göre): ① ünsüz kümeleri (Str-, Schw-, -nst) · ② ch (ich/ach) · ③ uzun-kısa ünlü (Staat/Stadt, Miete/Mitte) · ④ kelime sonunda sertleşme · ⑤ -er / -e sonlarının yutulması · ⑥ r. Her biri için minimal çiftler, shadowing ve isteğe bağlı yapay zekâ geri bildirimi. "Aksansız konuşma" hedef değildir; hedef anlaşılır olmaktır.

**LS-9.6 Benim cümlelerim:** H4 §7. Ek: öğrencinin kendi cümleleri hız turlarına ve mola sohbetlerine düzenli girer, çünkü en sık söyleyeceği cümleler bunlardır.

---

## 10. Öğretmen (koç) davranışı

**LS-10.1 Kişilik:** Tek ve tutarlı, Türkçe konuşan bir öğretmen. Sıcak, dürüst, kısa konuşur, abartmaz, çocuksu değil. Kurgusal bir adı olabilir (gerçek bir kişi değil).

**LS-10.2 Düzeltme önceliği** (her hata bu üç sınıftan birine girer):

| Sınıf | Ne | Ne zaman düzeltilir |
|---|---|---|
| D1 | Anlamı bozan ya da yanlış anlaşılmaya yol açan | Destekli modda hemen; bağımsız modda konuşma sonunda ilk sırada |
| D2 | Sık ve kalıcılaşma riski olan (fiil 2. sırada, yan cümlede fiil sonda, en sık 100 ismin artikeli, haben/sein) | Destekli modda hemen; bağımsız modda raporda |
| D3 | İnce ayar | Yalnızca öğrenci isterse ya da çok sık tekrarlanırsa |

Bağımsız konuşma sonrası raporda en fazla 3 düzeltme. Önce iyi yapılan 1 şey söylenir.

**LS-10.3 Hatadan mini ders:** Aynı D1/D2 hatası 2 kez görülürse ertesi gün S1'de 3 dakikalık mini ders + 5 hedefli madde.

**LS-10.4 Haftalık değerlendirme (5 dk):** Bu hafta neyi başardın (verilerle) · en sık 3 hata · gelecek haftanın gerçek hayat hedefi · bir önceki haftayla kıyas.

**LS-10.5 Gerçek konuşma öncesi ve sonrası** (öğrencinin dışarıda yaptığı her konuşma için):
- **Önce (2 dk):** "Birini arayacağım / bir yere gideceğim" → amaç seçilir ya da söylenir → gereken 5–6 cümle ve karşı tarafın muhtemel soruları → bir sesli prova → konuşma sırasında açık kalabilen "arama kartı" (hoparlör/kulaklık için).
- **Sonra (1–2 dk, en iyisi ilk 10 dakikada):** "Az önce konuştum" → öğrenci aklında kalanı Türkçe ya da karışık anlatır (yazarak ya da sesle) → koç: söylediklerinin doğrusu ve daha doğal hâli, karşı tarafın muhtemelen ne dediği, olası cevaplar → hatalı ve eksik öğeler bankaya → istenirse aynı konuşmanın hemen uygulamada yeniden oynanması.
- Aynı yapı iş yerindeki sohbetler için de çalışır ("Molada şunu söylemek istedim ama diyemedim").
- **Hukuki uyarı (uygulamada gösterilir):** Karşı tarafın izni olmadan telefon görüşmesi kaydedilmez; değerlendirme öğrencinin hatırladıklarına dayanır.
- Öğretilen ek cümleler: „Kann man das so sagen?" · „Korrigier mich ruhig, wenn ich Fehler mache."

**LS-10.6 Kurtarma modu:** H4 §10. Ek: üst üste 2 gün açılmazsa ertesi gün yalnızca 10 dakikalık kurtarma önerilir; suçlayıcı dil yok.

---

## 11. Gerçek hayat köprüsü

**LS-11.1 Görev merdiveni:** Her alan için kolaydan zora sıralı gerçek görevler. Her görevin hazırlığı (LS-10.5) ve değerlendirmesi var. En yüksek XP gerçek görevlere verilir (LS-13.2).

**LS-11.2 Telefon korkusu için kademeli maruz kalma (gerçek hayat):**
1. Bir firmanın otomatik telefon menüsünü dinlemek (konuşma yok)
2. Otomatik bir hatta tuşlama yapıp mesaj dinlemek
3. Bir dükkânı arayıp yalnızca açılış saatini sormak
4. Bir randevu almak
5. Bir randevuyu ertelemek
6. Bir sorunu anlatmak ya da şikâyet etmek
7. Beklenmedik bir aramaya cevap vermek

Bir sonraki basamak, öncekinde gerçek görev ve en az 2 simülasyon tamamlanınca açılır. Öğrenci basamakları kendi hızında yürür; zorlama yok.

**LS-11.3 "Dışarıda başardıklarım" günlüğü:** Her gerçek görev bir cümleyle kaydedilir. Bu, ilerlemenin en önemli kanıtıdır ve İlerlemem ekranının en üstünde durur.

---

## 12. Uyarlama

**LS-12.1 Başarı bandı:** Hedef doğru oranı %80–85. Üstündeyse zorluk artar (destek azalır, hız artar, yeni öğe eklenir); altındaysa düşer (destek artar, önceki aşamaya dönülür, eksik kalıp hedeflenir).

**LS-12.2 Aşama geçişleri:** BLUEPRINT §9 tablosu.

**LS-12.3 Döngüsüzlük:** H4 §4. Tekrarlar farklı bağlamda ve karakterde; son 14 günde görülen senaryo ya da diyalog tekrar gelmez (tekrar modülü hariç); oturumun ≥ %60'ı yeni öğe ya da yeni bağlam.

**LS-12.4 Planlayıcı girdileri:** bugünün tarihi (mevsim), seçilen bağlam modu, enerji seçimi, kurs senkronu, vadesi gelen tekrarlar, hikâyedeki konum, açık gerçek görevler, son 7 günün bırakma noktaları.

---

## 13. Oyunlaştırma ve motivasyon

**LS-13.1 İlke:** Ödül anlamlı eylemi ödüllendirir. Ekranda zaman geçirmek ödüllendirilmez. Sosyal sıralama yok; tek rakip öğrencinin dünkü hâli.

**LS-13.2 XP tablosu (başlangıç değerleri, ayarlanabilir):**

| Eylem | XP |
|---|---|
| Tanıma maddesi doğru | 1 |
| Yazarak kurulan doğru cümle | 3 |
| **Sesli kurulan doğru cümle** | 5 |
| Hız turunda 4 sn içinde doğru | 6 |
| Dinleme sorusu doğru | 2 |
| Senaryo aşaması tamamlama | 20 |
| Gelen arama simülasyonu | 30 |
| Gerçek konuşma öncesi ya da sonrası değerlendirme | 30 |
| **Gerçek hayat görevi** | **100** |

**LS-13.3 Seviyeler "yapabiliyorum" adlarıyla:** "Telefonu açan", "Randevu alan", "Molada konuşan", "Derdini anlatan", "Amt'ta işini çözen", "Bavyeralıyı anlayan"… Seviye atlama, XP'den değil ilgili "yapabiliyorum" ölçütlerinin tamamlanmasından gelir; XP yalnızca ara ilerlemeyi gösterir.

**LS-13.4 Şehir haritası:** H4 dünyasındaki kurgusal şehrin haritası. Her mekân (muayenehane, fırın, Bürgerbüro, spor salonu, iş yeri…) ilgili alan ustalaştıkça ışıklanır. Öğrenci "şehrin kaçta kaçında rahat konuşabildiğini" görür.

**LS-13.5 Günlük üç küçük hedef:** ör. "10 cümleyi sesli kur", "1 hikâye bölümü dinle", "Molada 1 soru sor (simülasyon)". Hepsi 100 dakikanın içinde doğal olarak tamamlanabilir.

**LS-13.6 Seri:** Günlük hedefin en az kurtarma modu kadarı (10 dk) seriyi korur. Seri dondurucu v1'deki gibi. Seri kaybı suçlayıcı dille gösterilmez.

**LS-13.7 Değişken ödüller:** Haftada bir sürpriz: bonus hikâye sahnesi, yeni bir karakterin sesli mesajı, kaynaklı bir Bavyera ifadesi kartı. Sabit değil, sürpriz zamanlı.

**LS-13.8 Kombo:** Art arda doğru sesli cümlelerde küçük artan ses ve titreşim. 5'te bir küçük kutlama. Konfeti ve maskot ayarlardan kapatılabilir.

**LS-13.9 Haftanın "büyük görevi":** Her hafta bir gerçek hayat görevi "büyük görev" olarak öne çıkar; tamamlanınca hikâyede özel bir sahne açılır (ör. komşu seni Weihnachtsmarkt'a davet eder).

---

## 14. Yapay zekâ politikası (özet)

**LS-14.1** Öğretim içeriği önceden hazırlanır ve denetlenir; yapay zekâ içerik uydurmaz. Yapay zekânın görevleri: rol oyunu partneri, konuşma sonu rapor, eksik çıkarma, "Bu ne demek?", "Almanca nasıl derim?", gerçek konuşma değerlendirmesi, yazma kontrolü.

**LS-14.2** Hiçbir ders yapay zekâya bağlı değildir. Yapay zekâ yoksa: rol oyunu hazır diyalogla, değerlendirme kural tabanlı, rapor "sonra" kuyruğunda. Bu durum ekranda sakin bir dille belirtilir.

**LS-14.3** Gizlilik: yapay zekâya kişisel bilgi gitmez; "Benim cümlelerim" yalnızca onayla ve yalnızca öğrencinin yazdığı cümle. Gemini ücretsiz katman uyarısı ilk kullanımda.

**LS-14.4** Kota: Günlük çağrı bütçesi hesaplanır; bütçenin %80'inde düşük öncelikli çağrılar (ör. yazma kontrolü) ertesi güne kalır, rol oyunu ve konuşma değerlendirmesi korunur.

---

## 15. B1 hazırlık yolu

**LS-15.1** Sınav tarihi ayarlarda. Sınava 6 hafta kala günlük planın %40'ı sınav formatlarına ayrılır: konuşma bölümü (kendini tanıtma, konu sunumu, birlikte plan yapma), dinleme ve okuma formatları, yazma görevleri (e-posta). Deneme sınavları haftada bir.

**LS-15.2** Sınava kadar olan dönemde de konuşma becerileri B1 konuşma bölümüyle örtüşecek şekilde çalışılır (fikir söyleme, plan yapma); ayrı bir "sınav dili" öğretilmez.

---

## 16. Ölçüm ve kalite

**LS-16.1 Öğrenme ölçütleri:** PEDAGOGY §0 ve §10.2 + bu belgenin LS-0.2 tablosu. Aylık ölçüm aynı görevlerle yapılır; 60 sn "kendini anlat" kaydının bir ay öncekiyle yan yana dinletilmesi dahil.

**LS-16.2 Deneyim ölçütleri (yerel):** günlük açılış, oturum tamamlama, ekran bazında bırakma noktası, yenilik oranı, hız turu süreleri, gelen aramaya cevap verme. Bir ekranda bırakma oranı yüksekse "sıkıcı içerik" işareti → STATUS.md.

**LS-16.3 Öğrenci simülasyonu ile denetim (her sürümde):** QA ajanı LEARNER.md'deki öğrenciyi **bilgi kısıtlı** olarak oynar: yalnızca öğrenci modelinde "bilinen" işaretli öğeleri kullanabilir. Uygulama öğretmediği bir kelimeyi üretmesini isterse bu P0 hatadır. Ayrıca her sürümde:
- yapay zekâ bağlantısı yokken baştan sona bir gün,
- araba modunda ekrana hiç dokunmadan bir seans,
- spor salonu modunda konuşmadan bir seans,
- ilk açılışın ilk 10 dakikası (LS-2.1) saniye saniye,
- bir gelen arama simülasyonu,
- bir gerçek konuşma sonrası değerlendirme.
Rapor: her biri için geçti / kaldı, bulgular ve ekran görüntüleri.

**LS-16.4 Proje yöneticisi denetimi:** Proje yöneticisi her sürümü GitHub'dan çekip aynı simülasyonu bağımsız olarak yapar. Bu yüzden her PR açıklaması ilgili LS kimliklerini listeler.

---

## 17. Sürüm planı

Her sürüm kendi başına kullanılabilir ve /v2/'de yayınlanır. Her sürümün kabulü: LS-16.3 öğrenci simülasyonu geçti + proje yöneticisi denetimi.

| Sürüm | Ad | Kapsam | Kabul ölçütü |
|---|---|---|---|
| **R1** | İlk telefon | İlk açılış (LS-2.1) · strateji 01–03 · telefon 01–02 · arzt 01 · kurma merdiveni + hız turu · Kulak Salonu 1–2. basamak + sayı/saat akışı · Masa ve **Araba** modu · XP, seri, 3 günlük hedef · gelen arama kademe 1 · gerçek konuşma öncesi/sonrası (LS-10.5) · 60 sn kaydı · kurtarma modu · kalıpların pilotta kullanılanları "reviewed" | Öğrenci simülasyonu ilk hafta senaryosunu (LS-2.3) baştan sona tamamlıyor; yapay zekâsız gün geçiyor |
| **R2** | Molada konuşan | Mola sohbeti 01–10 · smalltalk alanı · Benim cümlelerim · **Spor salonu** ve **toplu taşıma** modu · hikâye bölüm 1–4 (sesli drama) · şehir haritası · haftalık koç değerlendirmesi · telefon 03–04 · arzt 02–04 | Mevsim içeriği zamanında; 4 bağlam modu simülasyonu geçiyor |
| **R3** | Şehirde | einkaufen · bäckerei/café · amt · bank · wohnung · Kulak Salonu 3–4 · gelen arama kademe 2–3 · gerçek medya köprüsü | Ay 3 "yapabiliyorum" hedefleri için içerik tam |
| **R4** | Rahat | friseur · fitness · verkehr · post · werkstatt · notfall · freizeit · gefühle · Kulak Salonu 5 (kaynaklı Bairisch) · aylık konuşma karşılaştırması · Silvester/Fasching/Starkbierzeit içerikleri | 20 alanın 19'u yayında |
| **R5** | B1 ve ötesi | medien · B1 yolu (LS-15) · v1'in emekliye ayrılması (liste onayla) | Sınav tarihine 6 hafta kala B1 yolu açık |
| **R6** | Akıcı günlük konuşma (≈ B2, ay 7–12) | Hızlı, kesintili, çok kişili konuşmaları takip · mizah, ironi, deyimler · tartışma, ikna, şikâyet, pazarlık · telefonda her durum · Bairisch'i rahat anlama · pasif 7.000+, aktif 3.000+ | Gerçek görev kanıtları (yalnızca puan değil) |
| **R7** | Doğallık (≈ C1 konuşma, ay 12–24) | Konuşma dolguları ve doğal tepkiler (na ja, sag mal, weißt du, ach komm) · register geçişleri (resmî ↔ samimi ↔ bölgesel) · uzun anlatı (anılar, hayat hikâyesi) · hızlı espri ve laf sokma anlama · prosodi ve tonlama · pasif 10.000+ | Aylık 60 sn kayıt karşılaştırması |
| **R8** | Gerçek dünya dalışı (R6 ile paralel) | Dizi/film/podcast/haber ile kapsamlı dinleme planı (yalnızca bağlantı + ön öğretim + sonrası tekrar) · "Duyduğum kelime" akışı merkezde · haftalık serbest sohbet saatleri (yapay zekâ partneriyle) · gerçek görev merdiveninin sonuna kadar | "Duyduğum kelime" akışı ve gerçek görevler |

R6–R8 için şimdilik yalnızca hedefler vardır (PM-009); ayrıntılı döküm R5'ten sonra. Sıra ve tarih: YOL_HARITASI.md §2.

**LS-17.0 Mevsim istisnası:** 1. Advent 29.11.2026'da; Weihnachtsmärkte genelde Kasım'ın son haftasında açılır. Bu yüzden **Advent / Weihnachtsmarkt mini senaryoları (2–3 adet) R1'den bağımsız, yalnızca içerik olarak, mevcut oynatıcıyla 27.11.2026'ya kadar yayınlanır.** Kapsam küçük tutulur: fırında/stantta sipariş, Glühwein, fiyat sorma, iş yerindeki Weihnachtsfeier daveti.

**LS-17.2 Büyüyen müfredat (PM-009 §3–4):** Kütüphane hiçbir zaman "tamam" değildir. Öğrencinin bıraktığı yerler, kaçtığı konular ve "Duyduğum kelime" kayıtları her ay yeni içerik üretiminin girdisidir. Aylık 60 sn kayıt ve "yapabiliyorum" listesi R6–R8 boyunca sürer; her seviye geçişi gerçek dünya kanıtıyla (gerçek görev) doğrulanır.

**LS-17.1 Takvim gerçekçiliği:** R1 öncelikli ve küçük tutulur ki öğrenci en kısa sürede kullanmaya başlasın. Sonraki sürümler öğrenci kullanırken arkadan gelir. Mevsim içerikleri (Advent, Silvester, Fasching…) ilgili tarihten en az 1 hafta önce yayında olur.

---

## 18. Bu belgenin bakımı

- Değişiklik yalnızca proje yöneticisinin onayıyla yapılır; DECISIONS.md'ye yazılır.
- Her LS kimliği için STATUS.md'de durum tutulur: yapılacak / sürüyor / bitti / ertelendi (gerekçeyle).
