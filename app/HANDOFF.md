# Deutsch-Werkstatt — v1 devir raporu (v2.0 için)

> Tarih: 17 Kasım 2026. Bu belge, v1 üzerinde yapılan bütün işi, kodun nerede ve nasıl çalıştığını, kullanıcının kurallarını ve yarım kalan işleri tek yerde toplar. v2.0'ı yapacak ekip (insan ya da yapay zekâ) önce bunu okumalı.
> Kod: GitHub `Mutemadiyennn/deutsch-werkstatt` (herkese açık). `main` dalı → `app/` (kaynak). `gh-pages` dalı → yayındaki tek dosyalık uygulama. Bu rapor `app/HANDOFF.md` olarak da depoda duruyor.

---

## 1. Ürün ve öğrenci

**Ne:** Almanca öğrenme uygulaması.
- Tek bir HTML dosyası; GitHub Pages'te yayında.
- iPhone'da, yayındaki sayfayı açan bir Capacitor kabuğu içinde çalışıyor.
- Uygulama güncellemesi için IPA'yı yeniden kurmak gerekmiyor; sadece kabuk değişirse gerekiyor.

**Öğrenci:**
- Anadili Türkçe, İngilizcesi B2, Almancası gerçek A1.
- Bavyera'da yaşıyor. Bir dil kursuna gidiyor.
- Hedef: **B1 sınavı** (tarih yalnızca cihazdaki profilde, D-075) ve gerçek hayatta konuşabilmek.
- Günlük kullanım hedefi 60–90 dk.

**Kullanıcının v1'deki şikâyetleri (v2'nin çözmesi gereken asıl sorunlar):**
1. Dersler arasında 30–40 sn bekleme, ardından hata ve menüye atılma. Sebep: her şey anlık yapay zekâ üretimiydi; arka plan ön-üretimi Gemini kuyruğunu (2 eşzamanlı) dolduruyordu.
2. İçerik sürekli aynı eksende dönüyordu (iş / spor / aile). Kullanıcı "kusacaktım" dedi. İçerik Bavyera gündelik hayatına hazırlık olmalı ve çeşitli olmalı.
3. Canlı sohbette karşı taraf hiç düzeltmiyordu.
4. Konular rastgele ilerliyordu ("çorba"). Hazır, sıralı müfredat istiyor.
5. Konuşma, derslerin içinde değil ayrı bir yerdeydi.
6. İlerleme hissetmiyordu.
7. Kelimeleri tek tek değil, **fotoğrafla ve cümle içinde** öğrenmek istiyor. Yanlış yaptığı kelime **başka cümle ve başka fotoğrafla** geri gelmeli ki ezberlemesin, kalıcı öğrensin.
8. "Bütün kelimeler öğretilsin, kelime haznesi eksik kalmasın, eğitim full+full olsun."

**Kullanıcının istediği deneyim:**
- Duolingo/Busuu gibi ünite ünite, level level ilerleyen tek yol.
- Her ünitede konuşma, okuma, yazma, dinleme, oyun, hikâye/diyalog, rol oyunu, kelime kartı, boşluk doldurma ve tam cümle çevirisi bir arada.
- **Sıkı öğretmen:** ünitenin bütün kelimeleri öğretilmeden geçilmez; hata yapılan şey düzeltilip tekrarlatılır.

---

## 2. Değişmez kurallar (kullanıcının açık talimatları)

**Gizlilik**
- "Ben şahsi bilgilerimi paylaşmak istemiyorum." Kodda, prompt'ta, içerikte öğrencinin kişisel hayatına dair hiçbir ayrıntı olmayacak.
- Depo herkese açık. Kullanıcının kararı (15.11.2026): **"Tamamen nötr yap."** Bkz. §8 P0-1.

**Anahtarlar**
- API anahtarları (Gemini, Pexels/Pixabay, TTS) **yalnızca kullanıcının tarayıcısında**, şifreli olarak da kendi Firestore'unda durur.
- Geliştirici de dahil kimse görmemeli ya da erişmemeli. Koda, depoya, loglara asla anahtar girmez.
- legacy.html'deki Firebase web `apiKey`'i tasarım gereği herkese açık; sorun değil.

**Para**
- "Aman dikkat para kesilmesin." Ücretli API, ücretli katman ya da faturalanan hiçbir şey açılmaz.
- Gemini ücretsiz katmanda, kullanıcının kendi anahtarıyla çalışır.

**Giriş**
- Uygulama Google girişi ister ve **yalnızca kullanıcının kendi Google hesabını** kabul eder (Firebase Auth ile beyaz liste).
- Kullanıcının e-postası koda ya da rapora yazılmaz.

**Marka ve telif**
- Duolingo vb. marka varlıkları kopyalanmaz. Maskot özgün: "Brezi" (bir brezel).
- Telifli transkript gömülmez.

**Kaldırma**
- Hiçbir özellik kullanıcıya sorulmadan kaldırılmaz. Kullanıcıya liste halinde sunulur, onay alınır.

**iPhone**
- Üstteki saat/çentik alanı ve alttaki ev çubuğu (safe area) her ekranda korunmalı.
- `tests/safearea.py` 59 px emülasyonla bunu denetliyor.

**Seslendirme**
- Noktalama ve işaretler asla okunmaz. Örnek: "Ich arbeite - Ben çalışıyorum." satırında "eksi" ya da "nokta" okunmaz.
- Karışık Türkçe/Almanca satırlar bölünüp her parça kendi diliyle okunur.

**Görünüm**
- Amatör etiket yok ("tamam" yerine "✓ Tamamlandı · 14 Kas" gibi).
- Her şey uzman bir ekibin elinden çıkmış gibi görünmeli.

**Çalışma tarzı**
- Kalite için tasarruf yapılmaz.
- Kullanım limiti dolunca baştan başlanmaz, kaldığı yerden devam edilir.

---

## 3. Mimari

```
app/
  legacy.html          Kurs öncesi uygulama (tek dosya, ~10.000 satır): giriş, kurulum, senaryolar, sohbet,
                       canlı sohbet (Gemini Live), hikâye, oyunlar, dikte, shadowing, ölçüm, Koç, ayarlar…
                       Kural: sadece küçük düzeltme; her biri CHANGES_LEGACY.md'ye yazılır.
  src/js/NN-*.js       Yeni modüller; build sırasında legacy'nin son </script>'inden önce sırayla eklenir.
                       Desen: const _x = x; x = function(){…}  (eski fonksiyonu sarmalama)
  src/css/NN-*.css     Modül stilleri (son </style>'dan önce)
  content/kurs/        Kurs içeriği (JSON) + şema + doğrulayıcı + üretim brief'leri
  tests/               Playwright uçtan uca testler (python), run_all.sh
  build.py             legacy + modüller → dist/index.html; node sözdizimi kontrolü; içerik indeksi;
                       --deploy ile gh-pages çalışma kopyasına yazar
  sync_repo.sh         kaynağı main/app/'e eşitler
  ARCHITECTURE.md · RELEASE.md · CHANGES_LEGACY.md · HANDOFF.md
.github/workflows/check.yml       app/** push'unda içerik doğrulama + derleme sözdizimi kontrolü
.github/workflows/ios-build.yml   elle tetiklenir; gh-pages'ten imzasız IPA (Capacitor kabuğu)
```

**Çalışma ortamı (v1'de)**
- Kaynak: `/home/claude/dw`
- İçerik: `/home/claude/kurs` (dw/content/kurs bu klasöre sembolik bağ)
- Yerel test sunucusu: `/home/claude/werkstatt`, port 8765, `bash tests/srv.sh`
- gh-pages çalışma kopyası: `/home/claude/deutsch-werkstatt`
- main çalışma kopyası: `/home/claude/wf`

**Çalışma zamanı**
- `S` global durum, `go(view)` + `render()`, `VIEWS[view]()` HTML string döner.
- `ACT[name]` `data-act` tıklamalarını işler.
- Depolama: localStorage + Firestore senkronu.
- Yapay zekâ: `AI.json(prompt, {modelTier:"quick"|default})` → Gemini.
  - Modeller kullanıcının anahtarıyla listelenip seçilir; lite ve tam sürüm arasında yedekleme yapılır.
  - Eşzamanlılık 2 (`GEMQ`). Deneme başına 45 sn zaman aşımı.
- Fotoğraf: `pexelsSearch(q)` / `photoFor(o)`, `hasPhotos()` (anahtar varsa).
- Konuşma tanıma: tarayıcı SR ya da yerel eklenti. Yedek olarak Gemini'ye ses gönderilir.
- TTS: tarayıcı ya da isteğe bağlı doğal ses (üst sınırlı).

**iOS kabuğu (final, kullanıcı 14.11.2026'da yeniden derledi)**
- Capacitor; yayındaki URL'yi yükler, `limitsNavigationsToAppBoundDomains`.
- Eklentiler: keyboard, haptics, status-bar, local-notifications, app, badge, share, speech-recognition (yedek), voice-recorder (yedek).
- Arka planda ses çalabilir, ekran kilitlenmesi engellenebilir, internet yoksa offline sayfası açılır.

---

## 4. Kurs (v1'in yeni kalbi)

### 4.1 İçerik

| | A1 | A2 | B1 | Toplam |
|---|---|---|---|---|
| Ünite | 14 | 14 | 14 | **42** |
| Çekirdek kelime | 235 | 231 | 249 | **715** |
| Kelime başına örnek cümle (`ex`) | 4 | 4 | 4 | **2.860 cümle** |
| Gramer konusu (`teach`) | | | | **202** |
| Alıştırma + sınav maddesi | | | | **1.846** |

- Her ünitede bunlar var:
  - Hedef ("can-do")
  - Gramer anlatımı ve tablolar
  - Kelimeler (artikel, çoğul, Türkçe, fotoğraf sorgusu, 4 örnek cümle)
  - Diyalog
  - Alıştırmalar: say / gap / pick / order / listen / fix
  - Okuma parçası ve soruları
  - Konuşma görevleri
  - Rol oyunu (sahne, partner, açılış, hedef cümleler)
  - Ünite sınavı
- Fotoğraf: somut kelimelerde (715'in 419'u) İngilizce Pexels sorgusu var. Soyut kelimelerde fotoğraf bilerek yok, çünkü rastgele bir stok fotoğraf yanlış öğretir. A1'de oran %72, B1'de %40.
- **Kalite hattı:**
  1. Yazar ajan (`AGENT_BRIEF.md`)
  2. Bağımsız dilbilimci (`REVIEW_BRIEF.md`)
  3. `vocabscan.py`: üretim maddelerinde öğretilmemiş kelime var mı
  4. Editör (`FIX_BRIEF.md`)
  5. `validate.py` 0 hata
  6. `release.txt`
- Örnek cümleler (`EX_BRIEF.md`) de aynı hattan geçti. Bağımsız inceleme durumu:
  - A2: 924 cümle, 34 düzeltme
  - B1 (01–13): 932 cümle, 79 düzeltme
  - A1: a1-01…06 incelendi, **a1-07…14 incelenmedi** (limit)
  - b1-14: yazıldı, incelenmedi
- Şema: `content/kurs/SCHEMA.md` (kurallar 1–12). Almanca parçalar 'tek tırnak', Türkçe “çift tırnak” içinde. `order` maddelerinde `alt` varyantları bulunur.

### 4.2 Motor (`src/js/20-kurs.js`)

**Ünite yolu**

| Basamak | İçerik |
|---|---|
| w1 | Kelimeler 1 |
| g1 | Kural 1 |
| w2 | Kelimeler 2 |
| (p1…) | Kelime+ (ek kelimeler) |
| g2 | Kural 2 |
| li | Dinleme / diyalog |
| re | Okuma |
| ga | Oyunlar: eşleştirme + 60 sn hız |
| wr | Yazma |
| rp | Rol oyunu |
| ex | Ünite sınavı |

- Kaldığı basamak ve adım saklanır (`rec.ns`).
- Önceki üniteden ısınma yapılır.

**Kelime öğretimi**
- Her 4 kelime için: tanıtım kartı (fotoğraf + artikel rengi + örnek) → "Tanı" (dinle + der/die/das) → "Cümlede kullan" (fotoğraflı, boşluklu cümleyi tamamla, bütün cümleyi söyle).
- Sonunda "Hepsi bir arada".

**Çeşitlilik (14–15.11)**
- Her kelimenin cümle havuzu: 4 `ex` + ünite cümleleri.
- Son kullanılan 3 cümle tekrar seçilmez (`kSt().wsr`).
- Fotoğraf her yeni maddede son gösterilenden farklı seçilir (Pexels sonuç listesi, `KU_PHLAST`).
- **Yanlışta:** aynı kelime, aynı tur içinde 4 madde sonra **başka cümle + başka fotoğrafla** geri gelir (en fazla 3 kez), "🔁 Az önce zorlandığın kelime, bu kez başka bir cümlede" notuyla.
- 3 saat sonraki / ertesi günkü tekrar da cümle içinde (`ctxsay`) ve farklı cümleyle yapılır.

**Kalıcılık**
- Kelime "kalıcı" sayılması için: Türkçesinden Almancasını **iki ayrı oturumda, ≥3 saat arayla** kendin üret (`kSt().w[key]={c,last,d}`).
- Yanlış cevap `c`'yi düşürür.
- Ünite sınavı kapısı bütün kelimelerin (Kelime+ dahil) kalıcı olmasını şart koşar. Eksik kelimeler için yalnızca üretim maddelerinden oluşan pekiştirme yapılır.

**Kurallar**
- Aralıklı tekrar (`kSt().it`).
- Yanlışta aynı kuralın kardeş maddesi 2 madde sonraya çekilir, aynı madde 6 madde sonra döner.
- Ünite sınavı: geçme sınırı %80; önceki ünitelerden de soru içerir.

**Cevap değerlendirme**
- `kuNorm` / `kuCore`: noktalama, büyük-küçük harf ve ünlemler yok sayılır.
- Yakın ama farklı cevapta yapay zekâ eşdeğerlik kontrolü (`kuAiEquiv`, katı öğretmen, 8 sn, önbellekli).
- "Benim cevabım da doğru" düğmesi var.
- Seçenekler karıştırılır; sıralama çiplerinde büyük harf ya da noktalama ipucu yok.

**Diğer basamaklar**
- Rol oyunu: partner ünite hedefini bilir, her hatayı düzeltir, tekrar ettirir. Yapay zekâ yoksa diyalogdan çevrimdışı rol yapılır.
- Yazma kontrolü yapılır.
- Diyalogda rol alma: katı değerlendirme + yapay zekâ.

**Oturum entegrasyonu** (`40-kurs-session.js`, `45-kurs-today.js`)
- "Bugün" listesi = kurs basamakları + tekrar.
- Eller serbest kurs (Türkçe duy → Almanca söyle).
- Her 3 blokta bir oyun molası.

**Canlı sohbet düzeltmeni** (`30-livefix.js`)
- Kullanıcının cümlesi bitince yan kanalda hızlı model kontrol eder.
- Gerçek hata varsa, model konuşmayı bitirince sohbete "okunmayacak not" olarak düzeltme gönderilir. Ekranda kart gösterilir, hata defterine yazılır.

**Seslendirme filtresi** (`00-tts-clean.js`)
- Okunmayanlar: oklar, tek başına tireler, parantezler, eğik çizgiler, işaretler.
- Karışık satırlar " - " / ": " yerinden bölünür, her parça kendi diliyle okunur.

**Yapay zekâ bağlamı** (`50-ai-context.js`)
- `profile()` kişisel satırları nötr bir satırla değiştirir.
- "Bugünün konusu" yerine "AKTUELLE KURSEINHEIT" (ünite + gramer + kelimeler) yazar.

**Seviyem** (`60-seviyem.js`, 15.11)
- Ünite x/42, kalıcı ve öğrenilen kelime sayısı, bugünkü tekrarlar.
- B1 tempo hesabı: son 4 haftanın hızı ile gereken hız karşılaştırılır.
- Zayıf kurallar ve tek dokunuşla o kurala özel alıştırma.
- Ünite sonuçları.
- Kurs verisiyle öğretmen raporu (Durdur düğmeli).
- Aylık ölçüm, deneme, rozetler, 14 gün, telaffuz, ses ve ayarlar korundu.

**Sağlamlık** (`65-robust.js`, 15.11)
- Açılışta arka plan üretimi yok (`prefetchToday` boş).
- Bekleme metni gerçekçi ("5–20 sn, en fazla 1 dk") ve Durdur düğmeli.
- Dikte / aylık ölçüm yapay zekâsız, kursun onaylı cümleleriyle çalışır.

### 4.3 Kelime+ (yarım; kullanıcının "full+full" isteği)

**Sorun ve hedef**
- Sınav listeleri birikimli olarak yaklaşık A1 ≈ 650, A2 ≈ 1.300, B1 ≈ 2.400 kelime. Çekirdek 715 kelime yetmez.
- Hedef: her üniteye konusuna uyan ek kelimeler eklemek. Ünite başına A1 22–30, A2 28–36, B1 60–75 kelime. Toplam ≈ 2.400.

**Kaynak ve süreç**
- `data/core1500.json`: sıklığa göre 1.529 kelime; 433'ü çekirdekle ortak.
- `plus_assign.py` adayları ünitelere tema + sıklığa göre dağıtır (`plus/<id>.todo.json`).
- Ajan `PLUS_BRIEF.md`'ye göre seçer, eler (argo/film dili), eksikleri ekler ve her kelimeye 4 cümle yazar.
- Soyut kelimede her cümleye bir sahne fotoğrafı sorgusu (`ex[].img`) eklenir.

**Motor: hazır ve test edildi**
- `u.plus` 12'şerli "Kelime+ n" basamaklarına bölünür ve yola serpiştirilir.
- Sınav kapısı ve sayaçlar `kuAllW(u)` ile ek kelimeleri de sayar.
- Fotoğraf, cümlenin sahnesinden gelir.

**Durum**

| Durum | Üniteler |
|---|---|
| Yazıldı | a1-01…05, a2-01…03, b1-01, 02, 08, 09, 10 (13 ünite, 567 kelime) |
| Yazılmadı | Kalan 29 ünite |

- `plus_check.py` hataları: a2-03 (3), b1-01 (1), b1-08 (6), b1-09 (1). Çoğu üniteler arası tekrar.
- **Yayında değil:** `release_plus.txt` boş. Önce bağımsız dilbilimci incelemesi yapılacak, sonra ünite ünite yayına alınacak.

---

## 5. Yayın durumu

**Yayında: `2026-11-14e`**
- Kurs, fotoğraf + cümle içinde kelime ve önceki bütün düzeltmeler.

**Yerelde hazır, yayında değil: `2026-11-17a`**
- Kelime çeşitlilik motoru
- 2.860 örnek cümle
- Yeni Seviyem
- Sağlamlık modülü
- Canlı sohbet safe-area düzeltmesi
- Kelime+ motoru

Bütün test kapısı yeşil:
- kurs_e2e (iki tema), session_e2e, robot (iki tema), safearea, widths, smoke_all, clocktest, voc_test, mic3test, nativetest, arttest, coretest, livefix_test, qa_regress
- vartest: yeni; çeşitlilik ve Kelime+ testi

Yayınlamak için:
```
python3 build.py --ver 2026-11-17a --deploy
cd /home/claude/deutsch-werkstatt && git add -A && git commit && git push
```
Ardından `90-whatsnew.js` güncellenir.

**Yayın süreci (`RELEASE.md`), atlama yok:**
1. İçerik kapısı
2. Derleme
3. `bash tests/run_all.sh` (bütün testler "hata yok")
4. Görsel kontrol (koyu + açık tema)
5. Büyük sürümde QA ajanı (öğrenci personası)
6. Yayın + `sync_repo.sh` ile kaynak
7. Sürüm notu

---

## 6. Kullanıcının onayladığı kararlar (15.11.2026)

1. **Kişisel içerik → tamamen nötr.** Eski bölümlerdeki karakterler ve senaryolar, öğrencinin özel hayatı yerine Bavyera gündelik hayatının çeşitli, nötr karakterleriyle değişecek: komşu, ev arkadaşı, kurs arkadaşı, Bürgerbüro, Hausarzt, Vermieterin, fırıncı, dernek…
   - PERSONAS / senaryo / LIFE_CH **id'leri aynı kalacak**, çünkü kayıtlı ilerleme bunlara bağlı.
   - "Hayat hikâyem" bölümleri geçmiş varsaymayan genel başlıklara dönüşecek.
   - Ayrıntılı brief var ama kişisel ayrıntılar içerdiği için depoya konmadı.
2. **Kursla çakışan eski bölümler → uzman önerisi (hiçbir şey silinmez):**
   - **Kursa bağla:**
     - Kelime kartları + 1500 kelime + Kartlarım → tek tekrar sistemi
     - Senaryolar, Akıcılık, Shadowing, Dikte, Sesli tekrar → ünitenin konusuna bağlı
     - Oyunlar → kursun kelimeleriyle
     - Sohbet + Canlı sohbet → tek giriş
     - Yaz → ünitenin yazma görevleri
     - Dış kaynaklar + Medya → ünite konusuna göre öneri
   - **Arşive al** ("Daha fazla › Arşiv"): eski yapay zekâ dersleri ("Dersler", 30–40 sn bekleyip hata veren kısım), eski Koç yol haritası, Video.
   - **Seviyesi gelince aç:** Hayat hikâyem (A2 sonu), Bavyera ağzı (A2), B1 atölyesi (B1).
   - Hazırlanan eşleme önerisi (ünite → senaryo id):
     - a1-03 → baecker, kasse
     - a1-09 → amt
     - a1-10 → apotheke, arzttermin, arzt
     - a1-11 → bahn
     - a2-03 → biergarten, reklamation
     - b1-06 → reklamation, hausmeister
     - b1-07 → hausmeister, nachbar
     - …

---

## 7. Bilinen sorunlar

- **Kişisel içerik** hâlâ legacy.html'de ve herkese açık depoda (≈130 satır): PERSONAS, SCEN, hikâye serisi kadrosu, MONO_TOPICS, LIFE_CH, coachAsk, liveSys, `profile()` tabanındaki SPRACHSITUATION / SPRACHKURS satırları.
  - Git geçmişinde de duruyor. Temizlemek için gh-pages / main geçmişinin yeniden yazılması gerekir; bu geri alınamaz bir iş, **kullanıcıya sorulmalı**.
- **Hata akışları** (legacy):
  - "Dersler" hata verince menüye atıyor.
  - `startDict` (Daha fazla › Dikte) yapay zekâ hatasında boş Koç ekranına gidiyor ve hata mesajı "başarılı" renginde görünüyor. Aylık ölçüm diktesi düzeltildi, bu akış henüz düzeltilmedi.
  - Kural: her hata aynı ekranda kalmalı ve "Tekrar dene" düğmesi olmalı.
- **503 mesajı yanıltıcı.** `gemCall` 503'ü 429 gibi "kullanım sınırı" olarak gösteriyor. Ayrı bir "Google sunucusu yoğun (senin sınırın değil)" kodu gerekiyor.
- **Bekleme süresi:** deneme başına 45 sn × 2 model ≈ 90 sn en kötü durum. Toplam bütçe ≤ 60 sn olmalı (ör. 35 + 25).
- **Seslendirme:** kelimeye bitişik tireler ("-ebilmek", "-e") hâlâ okunuyor.
- **Küçük işler:**
  - 5 karakterde boş "Durum:" alanı
  - kurs ödevi dosya girişinin stili
  - Bazı beklemelerde Durdur düğmesi yok
  - Yanlış "Koç" başlıkları
  - Menü sadeleştirme
- **Kurs içeriği:**
  - A1 a1-07…14 ve b1-14 örnek cümleleri bağımsız incelemeden geçmedi.
  - Kelime+ 29 ünitede eksik.
  - Doğal sesli dinleme yok; TTS sentetik. Gerçek konuşmacı sesi için telifsiz kaynak düşünülmeli.

---

## 8. v2.0 için öncelikli iş listesi (önerilen sıra)

**P0 — öğretimin kendisi**
1. **Kişisel içeriği tamamen nötrleştir** (§6-1, §7). Ardından kullanıcıya git geçmişini temizlemeyi sor.
2. **Kelime+'ı bitir.** 29 ünite yazılacak. 13 ünitedeki tekrarlar giderilecek. Bağımsız dilbilimci incelemesi yapılacak. `release_plus.txt` ile ünite ünite yayına alınacak. Hedef toplam ≈ 2.400 kelime; Seviyem bu sayıyı gösteriyor.
3. A1 a1-07…14 ve b1-14 örnek cümlelerinin bağımsız incelemesi.
4. `2026-11-17a`'yı yayınla. Sürüm notu yaz: kelime artık başka cümle ve fotoğrafla gelir, Seviyem yenilendi.

**P1 — onaylanmış birleştirme (§6-2)**
5. Daha fazla menüsünü kurs merkezli yeniden düzenle: Konuş / Kelime ve tekrar / Oku ve dinle / Sınav ve ilerleme / Araçlar / Arşiv. Seviye kilitleri `kSt().cur`'un seviyesinden hesaplanır.
6. Tek tekrar sistemi: eski kelime kartlarının (`S.words`, vDue) ve kullanıcının kendi kartlarının vadesi gelenleri kurs tekrarına katılır.
7. Senaryolar, Shadowing, Dikte, Oyunlar ve Sesli tekrar mevcut ünitenin cümle ve kelimelerini kullanır (`kuSentencePool` hazır).

**P2 — sağlamlık ve cila**
8. §7'deki hata akışları, 503 kodu, toplam zaman aşımı bütçesi, bitişik tire seslendirmesi, küçük işler.
9. Kurs kitabı öğrenildiğinde ünite sırası kitabın bölümleriyle hizalanabilir. Kullanıcıya hangi kitabı kullandıkları sorulacak.

**Mimari öneri (v2 için)**
- legacy.html ~10.000 satırlık tek dosya, sarmalama zinciri derin: `renderMore` 4 kez, `renderSeviye` 3 kez sarmalanıyor.
- v2'de kurs merkezli temiz bir uygulama kabuğu kurulmalı. Eski özellikler tek tek modüle taşınmalı. Taşınan her özellik legacy'den silinmeli.
- Testler (`tests/`) taşıma sırasında güvenlik ağı olarak kalmalı.
- İçerik formatı (`SCHEMA.md`) ve kurs motoru korunmalı; v1'in en sağlam kısmı bunlar.

---

## 9. Ajan / ekip düzeni (v1'de işe yarayan)

| Rol | Görev | Brief |
|---|---|---|
| Yazar | ünite içeriği | AGENT_BRIEF.md |
| Bağımsız dilbilimci | yazara güvenmeden denetler, doğrudan düzeltir | REVIEW_BRIEF.md |
| Editör | vocabscan + QA bulgularını düzeltir | FIX_BRIEF.md |
| Örnek cümle yazarı | kelime başına 4 cümle | EX_BRIEF.md |
| Kelime+ yazarı | ek kelimeler | PLUS_BRIEF.md |
| QA | öğrenci personasıyla bütün ekranları dolaşır; bulgular regresyon testine dönüşür | (görev metni) |

- Ajanlar kullanım limitine takılınca baştan başlatılmaz; kaldığı yerden devam ettirilir.
- Aynı dosyaya iki ajan aynı anda yazmaz. Kelime+ ayrı dosyalara yazıldığı için ünite dosyalarıyla çakışmaz.

---

## 10. Hızlı başlangıç (yeni ortamda)

```bash
git clone https://github.com/Mutemadiyennn/deutsch-werkstatt.git && cd deutsch-werkstatt/app
pip install playwright && playwright install chromium
ln -s "$PWD/content/kurs" /home/claude/kurs   # build.py ve testler bu yolları bekliyor (gerekirse yolları düzelt)
cd content/kurs && python3 validate.py && python3 plus_check.py; cd ../..
python3 build.py --ver 2026-11-17a              # dist/index.html + data/kurs/*
bash tests/srv.sh && bash tests/run_all.sh      # /tmp/dw_tests.log
```

- `build.py` ve testler v1 ortamındaki mutlak yolları (`/home/claude/...`) kullanıyor. Yeni ortamda ilk iş bunları yapılandırılabilir hale getirmek olmalı.
- `data/` (core1500, sözlük, medya listesi) gh-pages dalında duruyor.
