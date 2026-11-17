# Deutsch Werkstatt 2.0 — Faz 1: Depo Denetimi

> **Tarih:** 17.11.2026
> **Depo:** `Mutemadiyennn/deutsch-werkstatt`. İncelenen sürümler: `main` @ `afe2cb8`, `gh-pages` @ `989b300`, ayrıca sen gönderdiğin `dw-v1` kaynak arşivi.
> **Erişim:** Tam. İki dal ve bütün git geçmişi okundu. Firestore kuralları ile Firebase ve Google Cloud konsol ayarları depoda olmadığı için **görülemedi** (§9).
> **Değişiklik:** Depoda hiçbir dosya değiştirilmedi. Testler ayrı bir kopyada çalıştırıldı.
> Bu belge `AUDIT.md`'nin yerini alır. O belgedeki "17 ana ekran" sayısı yanlıştı; doğrusu 32 (§4).
> Bilerek kişisel ayrıntı içermez. Kişisel içeriğin yeri yalnızca satır numarasıyla verilir.

## Özet

- **Uygulama tamamen istemci tarafında çalışıyor.**
  - 10.201 satırlık tek bir HTML dosyası, üstüne 9 modül ekleniyor.
  - GitHub Pages'te yayında; iPhone'da Capacitor kabuğu içinde açılıyor.
  - Kendi sunucusu yok. Veri tarayıcıda (localStorage ve IndexedDB) duruyor ve Firestore'a eşitleniyor.
- **En değerli parçalar:** kurs motoru, 42 ünitelik doğrulanmış içerik, aktif süre ölçen Pomodoro, ses ve mikrofon için yedekli altyapı, 25 betikten oluşan uçtan uca test seti. Hepsi korunmalı.
- **En büyük sorunlar:**
  1. API anahtarları istemcide.
  2. İçerik yazı dilinde ve ders kitabı sırasında: konuşma dili yok, Bavyera ağzı doğrulanmamış.
  3. Eski arayüzde derin teknik borç: 203 boş `catch`, 8 kata varan sarmalama zinciri.
  4. Herkese açık depoda kişisel içerik.
- **Önerilen hedef:** Capacitor'da kalmak. Eski arayüz adım adım TypeScript + Preact ile yeniden yazılır. Ücretsiz Cloudflare Worker anahtarları tutan küçük sunucu katmanı olur. Veri önce cihazda tutulur (IndexedDB), sonra koleksiyon bazında Firestore'a eşitlenir.

---

# BÖLÜM A — Teknik denetim

## 1. Mevcut mimari

```
GitHub main/app/                      GitHub gh-pages/ (yayın)          iPhone
 legacy.html (10.201 satır)  ─┐        index.html (1,08 MB)  ◄──────────  Capacitor kabuğu
 src/js/*.js (9 modül)        ├─build.py─► data/kurs/*.json (43)            (yayındaki URL'yi açar)
 src/css/*.css                │        data/{core1500,lexicon,media}.json
 content/kurs/units/*.json  ──┘        sw.js (çevrimdışı açılış)
                                                │
                              Tarayıcı ─────────┼──► Gemini API (generateContent + Live WebSocket)
                              (anahtarlar       ├──► Google Cloud TTS (isteğe bağlı doğal ses)
                               istemcide)       ├──► Pexels / Pixabay (fotoğraf)
                                                └──► Firebase Auth + Firestore (eşitleme)
```

**Derleme modeli**
- `build.py`, `legacy.html`'in son `<script>` etiketinin önüne modülleri ekler. Sonuç tek bir HTML dosyasıdır.
- Modüller eski fonksiyonları şu desenle sarar: `const _x = x; x = function(){…}`.

**Çalışma modeli**
- Tek bir global durum nesnesi var: `S`.
- `go(view)` + `render()` ile ekran değişir. `VIEWS[ad]()` HTML metni döndürür.
- Tıklamalar `data-act` → `ACT[ad]` ile işlenir.
- Hiçbir framework yok.

## 2. Ön yüz ve sunucu

| | Durum |
|---|---|
| Ön yüz | Saf JavaScript (ES2020+), şablon metinleriyle HTML üretimi. Bileşen yapısı, tip sistemi ve modül paketleyici yok. |
| Sunucu | **Yok.** Bütün dış servislere tarayıcıdan doğrudan gidiliyor. |
| Barındırma | GitHub Pages (statik) |
| Kimlik doğrulama | Firebase Auth, Google ile giriş. İzinli hesap kontrolü istemcide yapılıyor (§9). |

## 3. Framework ve bağımlılıklar

| Bağımlılık | Sürüm / kaynak | Not |
|---|---|---|
| Firebase JS SDK (Auth, Firestore) | 10.12.2 (2024), `gstatic`'ten dinamik `import` | Güncellenmeli. Kilit dosyası yok. |
| Capacitor | `ios-build.yml` içinde her derlemede `npm install` ile **sürüm sabitlenmeden** kuruluyor | Tekrarlanabilir derleme riski |
| Capacitor eklentileri | keyboard, haptics, status-bar, local-notifications, app, badge, share. Yedek olarak speech-recognition (topluluk) ve voice-recorder. | Derleme başarısız olursa yedek eklentiler otomatik çıkarılıyor |
| Test | Python 3, Playwright (Chromium) | `requirements.txt` yok |
| CI | GitHub Actions, Node 20 | |
| Depoda `package.json` | **Yok** | |

## 4. Ekranlar ve işlevler

Toplam 32 ekran var (robot testi 32'sini de dolaşıyor: 244 tıklama, 0 hata).

| Grup | Ekranlar (`VIEWS`) |
|---|---|
| Ana sekmeler | `plan` (Bugün), `seviye` (Seviyem), `more` (Daha fazla) |
| Kurs (v1'in kalbi) | `kurs` (42 ünite, 11 basamaklı yol), `seans` (bağlama göre karışık oturum ve mola) |
| Kelime | `kelime`, `kartei` (Kartlarım), `c1500` (1.500 sık kelime), `lernen` (tekrar) |
| Konuşma | `canli` (Gemini Live), `sprechen`, `senaryo`, `gercek` (gerçek hayat), `denk` (Düşün ve kur), `akici` (Akıcılık 3-2-1) |
| Dinleme ve telaffuz | `ses` (sesli tekrar), `shadow`, `dis` (Yutulan sesler ve Bavyera) |
| Okuma ve yazma | `hikaye`, `schreiben`, `odev` (VHS ödev yardımcısı) |
| Oyun | `spielen` |
| Ölçüm ve sınav | `olcum` (aylık ölçüm), `sinav`, `sinavatolye` (B1 atölyesi) |
| Koç ve plan | `koc`, `rehber`, `hayat` (Hayat hikâyem) |
| Medya | `media`, `medyakut` |
| Sistem | `kurulum`, `kilit` (giriş kapısı) |

Bunlara ek olarak:
- 10 ayrı `Object.assign(ACT, …)` bloğunda yaklaşık 273 tıklama işleyicisi
- 5 seans bağlamı (masa, iş arası, spor, mutfak, araba)
- 24 blok türü (`BLK`)

## 5. Öğrenme içeriği

| | Değer |
|---|---|
| Ünite | 42 (A1 14, A2 14, B1 14). `validate.py`: 0 hata. |
| Kelime | 715 (`de, art, pl, tr, t, img` ve her birine 4 örnek cümle → 2.860 cümle) |
| Dilbilgisi | 202 açıklama bloğu |
| Alıştırma | 1.846 (`say` 510, `gap` 326, `fix` 168, `listen` 160, `pick` 119, `order` 58, ve sınav maddeleri) |
| Diyalog, rol oyunu, konuşma | 416 diyalog satırı, 42 rol oyunu, 121 konuşma görevi |
| Kelime+ | 13 ünitede 567 kelime yazılmış. `plus_check` 11 tekrar hatası veriyor. Yayında değil. |
| Sözlük verisi | `core1500` (1.529 kelime) ve `lexicon`. Kaynak: FrequencyWords ve german-nouns, CC BY-SA 4.0, atıf var. |
| Dış kaynaklar | `media.json`: 52 bağlantı (DW, Goethe vb.). Yalnızca bağlantı, içerik gömülü değil. |
| Bavyera ağzı | `BAIRISCH` listesi (`legacy.html` 1061–1083), 21 madde. **Kaynak ya da doğrulama etiketi yok.** |

**Kalite**
- Bağımsız incelemeden geçmemiş ünitelerden rastgele 30 cümle: 30/30 doğru.
- **Dil katmanı sorunu:** 3.276 cümlede `halt` 0, `eben` 0, `nee` 0, kısaltma 0, `mal` 16 kez geçiyor. İçerik yazı dili.
- Şemada Hochdeutsch / Alltagsdeutsch / Bairisch ayrımı yok.

**13 alanın kapsamı**
- Güçlü: ulaşım, iş, doktor.
- Telefon görüşmelerine ayrılmış bir ünite yok.
- Kuaför neredeyse hiç yok, spor salonu zayıf.

## 6. Veritabanı ve veri yapıları

| Katman | Yapı |
|---|---|
| **localStorage** | Ana kayıt `dw-werkstatt-v2`: tek bir JSON nesnesi `{words, mistakes, writings, state}`. `state` içinde **81 alan** var (en çok kullanılanlar: `vhs`, `srOK`, `freezes`, `days`, `mins`, `daily`, `storyCache`, `denk`, `scen`, `kurs`, `pomo` …). Ayrıca 17 adet `dw-*` anahtarı: API anahtarları, ayarlar, yapay zekâ günlüğü, TTS kullanım sayacı, `dw-ku-*` kurs durumu. |
| **IndexedDB** | `deutsch-werkstatt` v1: `photos` (fotoğraf önbelleği), `pre` (önceden üretilmiş içerik), `data`, `sync-backup` |
| **Firestore** | `users/{uid}/sync/{parça}`. Parçalar: `state`, `mistakes`, `writings`, kelimeler için `w0…wN`, `_meta` (zaman damgası ve özetler), `_keys` / `_keysA` (şifreli anahtarlar). Her parça gzip ile sıkıştırılmış tek bir metin; sınır 900 KB. Çakışma çözümü "son yazan kazanır". |
| **Eski Firestore modu** | `S.mode === "db"`: `DB.collection(...)` ve `app/state`. Eski bir yol; hâlâ kodda. |
| **Kurs içeriği** | Statik JSON (`data/kurs/*.json`) ve `index.json` |

**Değerlendirme**
- Tek bir kullanıcı için basit ve çalışan bir yapı.
- Ama şeması yok, sürümü yok. 81 alanlı tek bir nesne ve "son yazan kazanır" kuralı var.
- v2'nin ihtiyaçlarını taşıyamaz: binlerce öğeyi pasif ve aktif bilgi ayrı izlenerek tutmak, seans kayıtları, konuşma raporları.

## 7. Yapay zekâ entegrasyonları

| | Ayrıntı |
|---|---|
| Sağlayıcı | Yalnızca Google Gemini. Ücretsiz katman, kullanıcının kendi anahtarıyla. |
| Model seçimi | Anahtarla model listesi çekiliyor. En yeni "flash" ya da "flash-lite" otomatik seçiliyor (`gemModels`, 5615). "Hızlı" işlerde lite kullanılıyor, hata olursa diğerine geçiliyor. |
| Çağrılar | `AI.json` ×6, `gemCall` ×5 (sarmalanmış). Canlı sohbet: Live API, WebSocket ×1. |
| Kuyruk | `GEMQ`: aynı anda en fazla 2 istek. Deneme başına 45 sn zaman aşımı; en kötü durum yaklaşık 90 sn. |
| Kullanım yerleri | Rol oyunu partneri, yazma kontrolü, cevap eşdeğerliği (`kuAiEquiv`, 8 sn), canlı düzeltme (`30-livefix`), hikâye ve senaryo üretimi, Koç raporu, eski "Dersler", ses yedeği (Gemini'ye `audio/wav` gönderme) |
| Prompt'lar | Kod içinde dağınık. `profile()` 7 kez sarmalanıyor. Kişisel satırlar ve kitap/kurs adları içeriyor. |
| Sağlamlık | `65-robust.js` açılışta arka plan üretimini kapattı. Dikte ve aylık ölçüm yapay zekâsız çalışıyor. 503 hatası yanlışlıkla "kullanım sınırı" olarak gösteriliyor. |

## 8. Ses ve konuşma

| İşlev | Uygulama |
|---|---|
| Seslendirme (TTS) | `speechSynthesis` (15 kullanım). İsteğe bağlı olarak Google Cloud TTS (doğal ses); aylık 900.000 karakter sınırı **istemcide** sayılıyor (`NEU_CAP`). |
| Seslendirme filtresi | `00-tts-clean.js`: işaretler okunmuyor, karışık dilli satırlar bölünüyor. Kelimeye bitişik tire hâlâ okunuyor. |
| Konuşma tanıma | Üç kademeli yedek: tarayıcı (`webkitSpeechRecognition`) → yerel Capacitor eklentisi → Gemini'ye ses gönderme (`MediaRecorder`, `audio/wav`) |
| Canlı ses | `getUserMedia` ve `AudioWorklet` / `AudioContext` ile Gemini Live'a PCM ses akışı |
| Hız | `playbackRate` ve `rate` ile yavaşlatma var. Önceden üretilmiş, farklı hızlarda kayıt yok. |
| Gerçek ses | Yok. Bütün dinleme malzemesi sentetik. Bavyera ağzı kaydı yok. |
| Pomodoro sesleri | Zil, sesli bağlamlarda "Mola / Pause" duyurusu, ekranın kararmasını engelleme |

## 9. Güvenlik ve API anahtarı yönetimi

| # | Bulgu | Önem |
|---|---|---|
| G1 | Gemini, Pexels, Pixabay ve TTS anahtarları istemcide. Adreslerde `?key=` ile gönderiliyor (Live WebSocket dahil). | **Yüksek** |
| G2 | Anahtarların otomatik eşitlenmesinde şifreleme anahtarı `uid` ve `projectId`'den türetiliyor. İkisi de gizli değil. Asıl koruma Firestore kuralları. | Orta |
| G3 | Firestore kuralları depoda yok. Uygulama kilitli bir şablon öneriyor (6804–6820), ama gerçekten uygulandığı **doğrulanamadı**. Konsoldan kontrol edilmeli. | Orta |
| G4 | Giriş kapısı istemcide yapılıyor (e-postanın SHA-256 özetiyle) ve atlatılabilir. Veriyi Firestore kuralları koruyor. | Düşük |
| G5 | Google Cloud TTS faturalı bir proje gerektiriyor ve aylık sınır **yalnızca istemcide** sayılıyor. Sayaç bozulursa ücret çıkabilir. Bu, "para kesilmesin" kuralı için bir risk. | **Yüksek** |
| G6 | İki dalın git geçmişinde gizli anahtar yok. Bulunan tek değer Firebase web yapılandırması; bu tasarım gereği herkese açık. | ✅ |
| G7 | XSS hijyeni iyi: `esc()` 906 kez kullanılıyor, `innerHTML` 9 kez, `eval` ve `new Function` hiç yok | ✅ |
| P1 | Öğrencinin özel hayatına dayanan içerik herkese açık depoda: `PERSONAS` (1050), `SCEN` (5087, 5113, 6025), `MONO_TOPICS` (4381), `coachAsk` (5492), `liveSys` (7861, 7910), `LIFE_CH` (7656–7830), `profile()` (1333) ve onun eklediği satırlar (3983, 4974), ayrıca testler (`qa_regress.py` vb.). | **Yüksek** |

## 10. Mobil ve iOS hazırlığı

| | Durum |
|---|---|
| Kabuk | Capacitor. Yayındaki URL'yi açıyor; `WKAppBoundDomains`, yalnızca dikey ekran, arka planda ses, ekranın kararmasını engelleme, çevrimdışı hata sayfası. |
| Derleme | GitHub Actions `macos-latest` üzerinde **imzasız IPA**. Elle tetikleniyor. |
| Dağıtım | İmzasız IPA'nın telefona nasıl kurulduğu (Sideloadly, AltStore…) **bilinmiyor**. Ücretsiz Apple hesabıyla kurulan uygulamalar 7 günde bir yeniden imzalanmalı. |
| Safe area | Test ediliyor (`safearea.py`, 59 px). ✅ |
| Çevrimdışı | Service worker: önce ağ (4 sn), olmazsa önbellek. Yapay zekâ ve API çağrıları önbelleğe alınmıyor. |
| App Store | Uzak URL açan bir kabuk App Store incelemesinden büyük olasılıkla geçmez. Kişisel kullanım için sorun değil. |
| Riskler | Topluluk eklentisi kırılırsa sessizce çıkarılıyor. Sürümler sabitlenmemiş, yani her derleme farklı olabilir. |

## 11. Derleme ve yayın süreci

1. `content/kurs/validate.py` (0 hata kapısı) ve `release.txt`
2. `python3 build.py --ver …`: birleştirme, `node --check` sözdizimi kontrolü, içerik indeksi
3. `bash tests/run_all.sh`
4. Görsel kontrol
5. Büyük sürümlerde QA ajanı
6. `--deploy` ile gh-pages çalışma kopyasına yazma, elle commit/push. Kaynak `sync_repo.sh` ile `main/app/`'e kopyalanıyor.
7. Sürüm notu (`90-whatsnew.js`)

**Sorunlar**
- `build.py`, `sync_repo.sh`, test sunucusu ve 3 içerik betiği v1 ortamının mutlak yollarını kullanıyor. Yeni bir kopyada çalışmıyor.
- Kaynak `main`'e kopyalanarak eşitleniyor; tek bir doğruluk kaynağı yok.
- CI testleri çalıştırmıyor.
- **Doğrulama:** Gönderdiğin zip'teki içerik verisi, bu denetimde depodan yaptığım `2026-11-17a` derlemesiyle 43/43 dosyada byte byte aynı. Derleme tekrarlanabilir.

## 12. Testler

| Test | Bu denetimdeki sonuç |
|---|---|
| kurs_e2e (iki tema), session_e2e, robot (iki tema; 32 ekran, 244 tıklama), safearea, widths, mic3test, nativetest, arttest, coretest, livefix_test, qa_regress, vartest | ✅ |
| clocktest (Pomodoro sıfırlanması, molanın 5:00'te bitmesi) | ✅ Kayıttaki hatalar belgelenmiş ve beklenen yapay hatalar |
| smoke_all, voc_test | ❌ **Çalışmadı.** Depoda olmayan `/tmp/voice_test.py` dosyasını arıyorlar. |
| Birim testi | **Yok.** Yalnızca uçtan uca testler var. |
| Ortam | Testler v1'in mutlak yollarına bağlı. Yeniden yazılmış yollarla çalıştırıldı. |

## 13. Kod kalitesi ve teknik borç

| Ölçüt | Değer | Etkisi |
|---|---|---|
| Tek dosya | 10.201 satır, 648 fonksiyon | Değişikliklerin etkisini kestirmek zor |
| Sarmalama zinciri | `todayQueue` ×8, `renderPlan` ×7, `profile` ×7, `renderKelime` ×5, `render` ×4 | Her yeni katman öncekilerin davranışına bağımlı |
| Ekranların yeniden tanımlanması | `VIEWS.plan` 7 kez, `ACT` 10 ayrı blokta | Hangi tanımın geçerli olduğu yükleme sırasına bağlı |
| **Boş `catch {}`** | **203** | Hatalar sessizce yutuluyor. "Menüye atma" ve "boş ekran" hatalarının asıl sebebi bu. |
| Çok uzun satırlar | 146 satır 400 karakterden uzun (en uzunu 1.054) | Okunması ve incelenmesi zor |
| Global ve değişken durum | `S` nesnesi, `state` içinde 81 alan, şema yok | Veri taşıma riski |
| Ölü ya da eski kod | Manuel sayaç (`S.timer`), `S.mode="db"` yolu, arka plan ön-üretimi (`prefetchToday` boşaltılmış) | |
| Tip ve lint | Yok | |
| Olumlu yanlar | Tutarlı `esc()` kullanımı, içerik doğrulayıcı, güçlü uçtan uca testler, modüller arasında net sorumluluk ayrımı (`ARCHITECTURE.md`), Türkçe ve açıklayıcı yorumlar | |

---

# BÖLÜM B — Değerlendirme ve öneriler

## 14. Korunacak özellikler

| Özellik | Neden |
|---|---|
| **Kurs motoru** (`20-kurs.js`): aralıklı tekrar, "kalıcı kelime" kuralı (iki ayrı oturumda, ≥3 saat arayla kendin üret), yanlış yapılan kelimenin başka cümle ve başka fotoğrafla geri gelmesi, kuralların kardeş maddelerle tekrarı, cevap normalleştirme ve yapay zekâ eşdeğerlik kontrolü, "Benim cevabım da doğru" | Pedagojik olarak sağlam ve test edilmiş |
| **İçerik ve kalite hattı:** 42 ünite, 2.860 cümle, `SCHEMA.md`, `validate.py`, `vocabscan.py`, yazar / dilbilimci / editör brief'leri | Doğru içerik; v2 içerik havuzunun temeli |
| **Pomodoro ve aktif süre ölçümü:** 100 dk hedef, 25/5, mola süresinin ayrı tutulması, mola ekranı, zil ve sesli duyurular, boşta kalınca sayacın durması, hedef kutlaması, 14 günlük grafik, seri ve seri dondurucu | Kullanıcının açık isteği. Ölçüm dürüst. |
| Seans bağlamları (masa, spor, mutfak, araba, iş arası) ve "aynı blok art arda gelmez" kuralı | Gerçek kullanım biçimine uygun |
| Gemini Live ile canlı sesli sohbet | v2'nin bağımsız konuşma aşaması için gerekli |
| Konuşma tanımada üç kademeli yedek | Uzun mücadelelerle kazanılmış sağlamlık |
| Seslendirme filtresi, safe area kuralları, çevrimdışı açılış | Kullanıcı kuralları |
| Yapay zekâya bağlı olmayan yedekler (`65-robust`) | Akışın hiç bloklanmaması ilkesi |
| Firestore eşitlemesi, haftalık yedek hatırlatması | Veri güvenliği |
| Uçtan uca testler | Taşıma sırasında güvenlik ağı |
| Capacitor iOS hattı | Ücretsiz ve çalışıyor |

## 15. İyileştirilmesi gerekenler

| Özellik | Gereken iyileştirme |
|---|---|
| Pomodoro | Numaralı seans (x/4), seans kaydı, yarıda kalan seansların kaydı, mola süresinin ayrıca ölçülmesi, isteğe bağlı uzun mola, etkinliğe göre süre dökümü, aylık görünüm |
| Canlı düzeltme (`30-livefix`) | Aşamaya bağlı zamanlama: destekli diyalogda anında, bağımsız konuşmada sonunda Türkçe rapor |
| Rol oyunu | Dört destek düzeyi (cümle başlangıcı → anahtar kelime → Türkçe ipucu → hiç) ve konuşmaya hazırlık hattı |
| Seviyem | Pasif ve aktif bilgi ayrımı; süre ile dil ilerlemesi ayrı panellerde; senaryo tamamlama ölçütü |
| Dinleme | Dört hız düzeyi (yavaş / normal / doğal / hızlı), transkript, gerçek kayıtlar |
| Bavyera ağzı | Her madde için kaynak ve "doğrulandı / belirsiz" etiketi |
| Hata yönetimi | 203 boş `catch` yerine hatayı aynı ekranda gösterip "Tekrar dene" sunan tek bir desen; 503 için ayrı mesaj; toplam bekleme ≤ 60 sn |
| Eşitleme | 81 alanlı tek nesne yerine şemalı, sürümlü ve koleksiyon bazlı eşitleme |
| İçerik | Konuşma dili katmanı, eşdizimler, fiil biçimleri, sık hatalar, telefon / kuaför / spor senaryoları |
| Test altyapısı | Taşınabilir yollar, eksik yardımcı dosyanın yeniden oluşturulması, CI'da testler, birim testleri |

## 16. Değiştirilmesi gerekenler ve gerekçesi

| Mevcut | Yerine | Neden |
|---|---|---|
| `legacy.html` arayüz kabuğu (metinle HTML üretimi, sarmalama zincirleri) | TypeScript + Preact bileşenleri, adım adım | Tip güvenliği, test edilebilirlik, sınırları net dosyalar sayesinde ajanların çakışmadan çalışabilmesi |
| İstemcideki API anahtarları | Cloudflare Worker'da gizli değişken. Canlı sohbet için kısa ömürlü token. | Yeni güvenlik kuralı ve G1/G5 |
| İstemcideki giriş kapısı | Sunucuda Firebase ID token doğrulaması ve `uid` izin listesi | Gerçek erişim kontrolü |
| TTS kullanımının istemcide sayılması | Sunucuda zorunlu aylık sınır | "Para kesilmesin" kuralı |
| Eski yapay zekâ "Dersler"i (30–40 sn bekleme) | Önceden hazırlanmış ve doğrulanmış içerik. Eski bölüm Arşiv'e. | v1 şikâyeti #1 |
| Dört genel basamak (Çırak → Uzman) | Senaryo bazında altı aşama ve ölçülen seviye | Yeni öğretim yöntemi |
| Ünite bazlı "bütün kelimeler kalıcı" kapısı ve Kelime+ ünite basamakları | Senaryonun temel öğelerine bağlı kapı ve kişisel kelime bankası | v2 Bölüm 4: dev liste yok |
| 81 alanlı `state` nesnesi | Tipli ve sürümlü veri modeli (§18) | |
| Ölü manuel sayaç, eski `db` modu | Kaldırılır (**her biri için onay alınır**) | |

---

# BÖLÜM C — Hedef mimari

## 17. Önerilen hedef mimari

```
iPhone ─ Capacitor kabuğu (aynı hat; sürümler sabitlenir; çevrimdışı yedek paket)
   │
   ▼
Web uygulaması v2  (TypeScript + Preact + Vite; GitHub Pages ya da Cloudflare Pages)
 ├─ core/        saf ve test edilebilir mantık (DOM'a bağımlı değil)
 │   ├─ learner/   öğrenci modeli: pasif/aktif güç, aralıklı tekrar, aşama geçişleri, eksik tespiti
 │   ├─ focus/     odak motoru: aktif süre kuralları (clock() taşınır), 4 seanslı Pomodoro, uzun mola
 │   ├─ planner/   "Bugün" yolu: seans → etkinlik → senaryo sırası
 │   └─ grading/   cevap normalleştirme (kuNorm/kuCore taşınır)
 ├─ content/     şema tipleri (JSON Schema'dan üretilir), içerik yükleyici, sürüm kontrolü
 ├─ data/        IndexedDB (Dexie) yerel veritabanı + Firestore eşitleme + v1 verisinden geçiş
 ├─ services/    ai, live, tts, stt, photos, auth. Hepsi Worker üzerinden.
 ├─ features/    vocab, chunks, build, drills, dialogue, roleplay, listening, shadow, focus-ui, progress, bank
 └─ legacy-bridge/  /legacy/ altında eski uygulama; Arşiv'den açılır, verileri okunarak taşınır
   │
   ▼ HTTPS (Firebase ID token)
Cloudflare Worker  (ücretsiz katman; anahtarlar yalnızca burada)
 ├─ kimlik: Firebase JWT doğrulama + uid izin listesi
 ├─ /ai/*   Gemini proxy (prompt şablonları sunucuda, toplam zaman bütçesi, 503/429 ayrımı)
 ├─ /live/token   Gemini Live için kısa ömürlü token
 ├─ /tts    Google TTS proxy + sunucuda zorunlu aylık karakter sınırı (KV)
 └─ /photos Pexels proxy + önbellek (KV)
   │
   ├──► Gemini API      ├──► Google TTS      ├──► Pexels
   └──► Firebase Auth + Firestore (kullanıcı verisi, kurallar depoda versiyonlu)

İçerik deposu: content/v2/**/*.json  →  doğrulayıcılar (Python, mevcut)  +  JSON Schema (TS ile paylaşılır)
Testler: Vitest (core/ birim) + Playwright (mevcut uçtan uca testler, taşınabilir)
```

**Seçimlerin gerekçeleri**
- **Preact:** 3 KB, React ile aynı bileşen modeli, WKWebView'de hızlı. Tek kişilik bir proje ve kısa ömürlü ajanlar için en yaygın ve en kolay devredilebilir model.
- **Veri önce cihazda:** iPhone'da bağlantı koptuğunda da çalışır. Firestore yalnızca eşitleme ve yedek.
- **Worker:** Ücretsiz katman bu kullanıma yeter. Firebase Functions faturalı (Blaze) plan gerektirdiği için elendi.
- **Eski uygulamanın yanında yeni uygulama:** Eski uygulama aynı adreste (`/legacy/`) çalışmaya devam eder ve aynı yerel veriyi kullanır. Her özellik taşındığında eskisi kaldırılır. Kaldırma listesi her seferinde onayına sunulur.

## 18. Önerilen veritabanı yapısı

### 18.1 İçerik (statik, sürümlü JSON; Firestore'da değil)
```ts
Domain    { id, title_tr, title_de, order }                       // 13 alan
Lexeme    { id, de, tr, pos, art?, pl?, verb?: {perfekt, separable, praep?, valency},
            ipa?, audio?, collocations[], patterns[], register: "formal"|"informal"|"neutral",
            related[], mistakes_tr[], examples[]: {de, tr, img?}, img?, legacyKey? }
Chunk     { id, layers: { hd: string, alltag?: string, bair?: {text, status:"verified"|"uncertain", source?} },
            tr, slots?, lexemes[], domain[], register, audio? }
Pattern   { id, frame: "Könnten wir … ?", slots[], grammarNote_tr, examples[], grammarRef? }
Scenario  { id, domain, title_tr, goal_tr, essentials: {lexemes[], chunks[], patterns[]},
            otherSide[]: {de, tr, speed}, dialogue: {lines[], supports: [L0..L3]},
            roleplay: {scene_tr, partner_de, opener_de, targets[]}, listening[] }
AudioAsset{ id, text, speed: "slow"|"normal"|"natural"|"fast", voice, src, license, transcript }
GrammarNote { id, tr, table?, examples[] }   // mevcut 202 `teach` bloğu buraya taşınır
LegacyUnit  // mevcut 42 ünite olduğu gibi; isteğe bağlı B1 yolu
```

### 18.2 Kullanıcı verisi (IndexedDB'de; Firestore'da `users/{uid}/…` altına eşitlenir)
```ts
Profile        { schemaVersion, settings, goals: {dailyFocusMin: 100, weekly}, placement? }
LearnerItem    { itemId, kind: "lexeme"|"chunk"|"pattern",
                 passive: {s, last, due, n}, active: {s, last, due, n, sessions[]},
                 gaps[]: {type: "passive"|"active"|"structure", source: "drill"|"tap"|"convo", at},
                 inBank: boolean }
ScenarioProgress { scenarioId, stage: 1..6, supportLevel: 0..3, attempts[], completedAt? }
Attempt        { id, at, itemIds[], kind, correct, hintUsed, latencyMs, stage }   // aylık özetlenir
FocusDay       { date, goalMin, focusSec, breakSec, longBreakSec, sessions: FocusSession[] }
FocusSession   { n, plannedActivity, startedAt, endedAt, focusSec, breakSecAfter,
                 status: "completed"|"interrupted"|"abandoned", segments[]: {activity, refId, sec} }
ConversationLog{ id, scenarioId, at, durationSec, stage, feedback_tr, gaps[], transcript? }  // ham ses tutulmaz
Assessment     { id, at, type: "placement"|"monthly", scores: {listening{speed→%}, speaking, building, vocabPassive, vocabActive} }
```

**Firestore yerleşimi**
- `users/{uid}/profile`
- `users/{uid}/items/{shard}` (öğeler 50 parçaya bölünür)
- `users/{uid}/scenarios/{id}`
- `users/{uid}/focus/{yyyy-mm}`
- `users/{uid}/convos/{id}`
- `users/{uid}/assess/{id}`
- `users/{uid}/attempts/{yyyy-mm}`

Bu yapı ücretsiz plan sınırlarının çok altında kalır (günde 50 bin okuma, 20 bin yazma).

**v1'den geçiş**
- `dw-werkstatt-v2` ve `dw-ku-*` okunur.
- `kSt().w` → `LearnerItem.active`. Eski "kalıcı" kelimeler kalıcı olarak taşınır.
- `S.state.mins` → `FocusDay.focusSec`. Eski günler "eski kayıt" olarak işaretlenir.
- `mistakes` → kişisel kelime bankası.
- `S.words` (eski kartlar) → kişisel öğeler.
- Geçişten önce otomatik yedek alınır. Geçiş sonucu bir raporla gösterilir.

## 19. Önerilen API (Cloudflare Worker)

| Uç | Girdi | Çıktı | Not |
|---|---|---|---|
| `GET /health` | — | sürüm | |
| `POST /ai/generate` | `{task, vars, tier}` | JSON | `task` sunucudaki prompt şablonunun adı (ör. `roleplay_turn`, `feedback_tr`, `equiv_check`, `gap_extract`). Toplam bütçe ≤ 60 sn. 429 ile 503 ayrı kodlarla döner. |
| `POST /live/token` | `{scenarioId, stage}` | `{token, expiresAt, model}` | Tek kullanımlık. Sistem talimatı token'a kilitlenir. |
| `POST /tts` | `{text, lang, voice, speed}` | ses | Sunucuda aylık karakter sınırı. Sınır aşılırsa 402 ve tarayıcı sesine geçilir. |
| `GET /photos?q=` | sorgu | sonuç listesi | KV önbelleği |
| `POST /stt` (yedek) | ses | metin | Yalnızca tarayıcı ve yerel tanıma başarısız olursa |

Her istekte `Authorization: Bearer <Firebase ID token>` bulunur. Token Google'ın açık anahtarlarıyla doğrulanır ve `uid` izin listesinde olmalıdır. İstek oranı sınırlanır.

Kullanıcı verisi Worker'dan geçmez; Firestore SDK ile doğrudan eşitlenir. Firestore kuralları depoda `firestore.rules` dosyasında tutulur ve testlenir.

---

# BÖLÜM D — Yol haritası, riskler, karmaşıklık

## 20. Geliştirme yol haritası

Karmaşıklık ölçeği: **S** (1–2 çalışma oturumu) · **M** (3–5) · **L** (6–10) · **XL** (10+, paralel ajan gerektirebilir). "Oturum" burada benimle yapılan bir çalışma bloğu demek.

| Faz | Kapsam | Karmaşıklık | Ajan | Kabul ölçütü |
|---|---|---|---|---|
| **1. Denetim** (bu belge) | Bu belge | — | Yok | Senin onayın |
| **2. Ürün sözleşmeleri (kod yok)** | İçerik şeması v2 + JSON Schema + doğrulayıcılar; öğrenci modeli ve aşama geçiş kuralları; Pomodoro durum makinesi; veri modeli ve v1'den geçiş planı; API sözleşmesi; seviye tespit tasarımı; 6 aylık öğrenme planı; 42 ünite → 13 alan eşlemesi; 1 örnek senaryo | M | Yok | Belgeler ve örnek senaryo onaylı. Şema doğrulayıcısı örnek senaryoyu 0 hatayla geçiyor. |
| **3. v1'i sabitleme** | Yolları taşınabilir yap; eksik test dosyasını yeniden oluştur; testleri CI'a ekle; kişisel içeriği nötrleştir (liste onayla); seçilen v1 hatalarını düzelt; `firestore.rules` dosyasını depoya koy | M | Yok | Temiz kopyada 17/17 test yeşil. Taramada kişisel içerik yok. |
| **4. Platform iskeleti** | Vite + TS + Preact kabuğu; Worker (kimlik, `/ai`, `/live/token`, `/tts`, `/photos`); IndexedDB ve eşitleme; v1 verisinden geçiş; **odak motoru** (`clock()` kurallarının taşınması ve `clocktest` eşdeğeri); eski uygulamanın `/legacy/` altında çalışması | L | Yok | İstemcide anahtar yok. Odak motoru birim testleri ve geçiş testi yeşil. iPhone'da açılış sorunsuz. |
| **5. Öğrenme çekirdeği ve seviye tespiti** | Öğrenci modeli, aralıklı tekrar (v1 motorundan taşınır), eksik tespiti, kişisel kelime bankası, "Bugün" planlayıcı, seviye tespit görevleri | L | Yok | Birim testleri; başlangıç raporu çıkıyor |
| **6. Pilot alanlar: Telefon + Doktor/Eczane** | Altı aşamanın tamamı, dört destek düzeyi, rol oyunu, konuşma sonunda Türkçe geri bildirim, dinleme ve shadowing, 4 seanslı Pomodoro düzeni | L | **2:** içerik yazarı, bağımsız dilbilimci (yalnızca içerik dosyalarına yazarlar) | 1 hafta gerçek kullanım ve senin onayın. Teknoloji karar noktası. |
| **7. İçeriğin 11 alana ölçeklenmesi** | Eşdizim, fiil biçimi, sık hata, dil katmanları; Bavyera ağzı yalnızca kaynaklı | XL | **En fazla 3 yazar + 1 dilbilimci**, dalgalar halinde. Her ajan yalnızca kendi alanının dosyalarına yazar. **Başlamadan önce plan ve onay.** | Her alanda doğrulayıcı 0 hata ve inceleme raporu |
| **8. Dinleme ve ilerleme** | Önceden üretilmiş sesler (4 hız, Worker üzerinden TTS), lisanslı gerçek kayıtlar, süre ve dil için ayrı ilerleme panelleri, aylık ölçüm | L | Yok | |
| **9. Eski kodun kaldırılması ve cila** | Taşınan özelliklerin `legacy`'den silinmesi (liste onayla), iOS cilası, isteğe bağlı B1 yolu (42 ünite) | L | 1 QA ajanı (öğrenci personasıyla) | QA raporu kapanmış |

**Paralel ve sıralı işler**
- Faz 2 → 3 → 4 → 5 sıralı.
- Faz 3, Faz 2 onaylanmadan da başlayabilir; birbirlerine bağımlı değiller.
- Faz 6'da içerik yazımı ile kod paralel yürür; dosyalar ayrık olduğu için çakışma olmaz.
- Faz 7 yalnızca Faz 6'da şema ve hat kanıtlandıktan sonra başlar.

**Bütün ajanlar için kurallar**
- Her ajan rapor eder: değişen dosyalar, alınan kararlar, test sonuçları, çözülmemiş sorunlar.
- Entegrasyon ve inceleme yalnızca baş mimar tarafından yapılır.

## 21. Riskler ve bağımlılıklar

| Risk | Olasılık / etki | Önlem |
|---|---|---|
| Gemini ücretsiz katmanının limitleri değişebilir | Orta / Yüksek | İçerik önceden hazırlanmış olduğu için yapay zekâ akışı bloklamaz. Sunucu katmanında kullanım sayacı. |
| Live API ve kısa ömürlü token'lar hâlâ Preview (v1alpha) | Orta / Orta | Sözleşme Worker'da kapsüllenir; yedek olarak metin tabanlı rol oyunu |
| WKWebView'de ses ve mikrofon sorunları | Düşük–Orta / Yüksek | Bugün çalışıyor. Faz 6'da karar noktası; gerekirse Expo yeniden değerlendirilir. |
| İmzasız IPA'nın kurulumu ve 7 günlük imza süresi | Bilinmiyor / Orta | Kurulum yöntemini öğrenmem gerekiyor. Uygulama zaten uzak URL'den geldiği için kabuğu nadiren yeniden kurmak gerekir. |
| Google TTS'in faturalı proje gerektirmesi | Orta / Yüksek | Sunucuda zorunlu sınır, Google Cloud bütçe uyarısı ve kota sınırı. Sınır aşılırsa tarayıcı sesine geçilir. |
| Doğrulanmış Bavyera kaynağı ve ses kaydı bulmak | Yüksek / Orta | "Belirsiz" etiketi; yalnızca lisansı uygun kaynak; uydurma yok |
| İçerik ölçeklenirken kalitenin düşmesi | Orta / Yüksek | Mevcut kalite hattı, bağımsız dilbilimci, doğrulayıcılar |
| v1'den veri taşırken kayıp | Düşük / Yüksek | Otomatik yedek, geçiş testi, geri dönüş yolu |
| Kişisel içeriğin git geçmişinde kalması | Kesin / Orta | Geçmişi yeniden yazmak senin kararın; geri alınamaz |
| Kapsamın büyümesi | Orta / Orta | Faz kapıları ve her fazda onay |
| Ajan kullanım limitleri | Orta / Düşük | Az ajan, ayrık dosyalar, kaldığı yerden devam |

**Bağımlılıklar (senden gereken)**
1. Bekleyen kararlar (§22).
2. Ücretsiz bir Cloudflare hesabı. Anahtarları oraya sen girersin.
3. Firebase konsoluna erişim: kuralları ve yetkili alan adlarını kontrol etmek için.
4. IPA'yı telefona nasıl kurduğun.
5. Depoya yazma izni. Şu an bu oturum depoyu yalnızca okuyabiliyor; Faz 3'ten önce yazma erişimi gerekiyor.

## 22. Onay bekleyen kararlar

| # | Karar | Önerim |
|---|---|---|
| 1 | Depo herkese açık mı kalsın, gizli mi olsun? | Herkese açık kalsın, kişisel içerik temizlensin. Gizli olursa site Cloudflare Pages'e taşınmalı. |
| 2 | Teknoloji | Capacitor + TypeScript + Preact (§17) |
| 3 | IPA kurulum yöntemi ve Apple Developer hesabı | Bilgi gerekiyor |
| 4 | v1 `2026-11-17a` yayınlansın mı? Kelime+ dondurulsun mu? | Yayınlansın; Kelime+ dondurulsun, malzemesi kelime havuzuna girsin |
| 5 | Cloudflare hesabı | Evet |
| 6 | Kişisel içerik git geçmişinden de silinsin mi? (geri alınamaz) | Senin kararın |
| 7 | Ölü manuel sayaç ve eski `db` modu silinsin mi? | Evet |
| 8 | Uzun mola süresi | 20 dk, atlanabilir |
| 9 | Odak süresi aktif çalışmayı mı saysın, duvar saatini mi? | Aktif çalışmayı (bugünkü gibi) |
| 10 | Haftalık hedef | 5 gün × 100 dk |
| 11 | B1 sınav tarihi (15.05.2027) hâlâ geçerli mi? | Bilgi gerekiyor. 6 aylık planın son ayını belirler. |
| 12 | Senaryo kapısı yalnızca temel öğelere mi bağlı olsun? | Evet |
| 13 | VHS kursu sürüyor mu? | Bilgi gerekiyor |
| 14 | v1'in günlük kullanımı aksatan hataları Faz 3'te düzeltilsin mi? | Evet |

**Not:** Bu yol haritasında Faz 1 denetim. Önceki taslaktaki "Faz 0 temizlik", burada Faz 3 (v1'i sabitleme) oldu. Gönderdiğin "aşama 4" fazının kapsamına göre numaraları uyarlarım.
