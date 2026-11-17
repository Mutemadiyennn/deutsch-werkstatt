# H3 KONTROL NOKTASI RAPORU

Tarih: 2026-11-17. Kapsam: H3 §10, H2 kalan maddeleri, EK1 (arayüz çıtası), EK2 (iPhone standardı), çalışma düzeni (9 madde), PM incelemesi P0/P1/P2, Faz R a–c, H4 a–b.
Durma kuralı (D-072) gereği rapordan sonra çalışma **durmuyor**; sıradaki işler en sonda.

Ekler (aynı klasörde, `h3/`):
- `senaryo-sayilari.md`: senaryo başına madde sayıları
- `sc_telefon_01-arzttermin.md`, `sc_strategie_01-nicht-verstanden.md`: senaryoların tam metni
- `rastgele-20-kart.md`: rastgele 20 derin kart (tohum 20261117)
- `kalip-listesi.md`: 61 kalıp; her birinde frame, Türkçe not ve 3 örnek
- `ekran/`: v1 ve v2 yan yana ekran görüntüleri (390×844, açık + koyu, 7 ekran)

---

## 1. H3 teslimleri (§10)

| # | Teslim | Durum | Kanıt |
|---|---|---|---|
| 1 | PEDAGOGY.md + CONTENT_PLAN.md | kısmen | PEDAGOGY ✓ (#4); CONTENT_PLAN yazılmadı |
| 2 | Şema/doğrulayıcı: accepted[], freqRank, tier, reductions, mission, üretim sayısı, kapsam kuralları; PM kuralları (D-063/64/65) | yapıldı | #4, #10. İçerik 0 hata |
| 3 | Sıklık hattı ~5.000 lemma + kapsam raporu | kısmen | 5.000 lemma ✓. B1 referansıyla karşılaştırma yapılmadı: liste PDF'i proje sahibinden bekleniyor ve depoya girmeyecek. Kapsam özeti §5'te |
| 4 | ~60 çekirdek kalıp → dilbilimci | sürüyor | 61/61 standartta (#15, taslak). Dilbilimci incelemesi sürüyor; önce pilotun 14 kalıbı |
| 5 | İlk 1.000 K1 derin kart | kısmen | 800 kart (sıra 1–834), #5, taslak. Parti 009–010 (pilot alan listesi) yapılmadı |
| 6 | 11 pilot senaryo | kısmen | 11'i de yazıldı. 01'ler (3) dil incelemesinden geçti (#6). 02–04 (8) D-063 gereği depo dışında bekliyor |
| 7 | Oynatıcı: aşama 1–6, say_it_de, explain_tr, "Duyduğum kelime", Dinleme salonu 1–2, FSRS çift yol | kısmen | #7, #8. Aşama 1–6 + dinleme ✓; D-050 aşama 1–2 ✓; FSRS çift yol kaydı ✓. Ayrı tekrar ekranı ve Kulak Salonu basamakları yok (R1-12, R1-16) |
| 8 | Yapay zekâ katmanı + altın setler + dayanıklılık | kısmen | Görevler, devre kesici, önbellek, yumuşak bekleme (D-RP1) ve dayanıklılık e2e ✓. Altın setler (equiv ≥200, roleplay ≥30) yok. Gerçek model ölçümü Worker anahtarı gelince |

### 1.1 Senaryo madde sayıları
Tablo: `h3/senaryo-sayilari.md`. Her senaryoda:
- 18–20 kelime, 13–14 ifade, 5–6 kalıp
- 28 cümle kurma, 38–39 alıştırma
- 3 diyalog çeşidi (15–16 öğrenci satırı), 16–20 karşı taraf cümlesi (yarıdan fazlası alltag)
- 7 dinleme sorusu, 4 konuşma görevi, 1 dış görev
- **üretim 84–86** (standart ≥80)

### 1.2 telefon/01 ve strategie/01 tam metni
`h3/sc_telefon_01-arzttermin.md` · `h3/sc_strategie_01-nicht-verstanden.md`

Dilbilimci sonuçları:

| Senaryo | Hata oranı | Eklenen accepted[] varyantı | Sonuç |
|---|---|---|---|
| strategie/01 | %6,2 | 169 | KAPANDI |
| telefon/01 | %7,7 | 177 | KAPANDI |
| arzt/01 | %4,0 | 146 | KAPANDI |

- En sık sorun haksız ret riskiydi: nochmal / noch mal, gern / gerne, hab / habe gibi farklar.
- Raporlar: `docs/v2/reviews/`.
- Kalıp kapısı, kimlik yer tutucuları ve dünya uyarlaması yapılacağı için 01'ler yeniden `draft`. Dil incelemesinin kaydı `review.notes` alanında.

### 1.3 Rastgele 20 derin kart
`h3/rastgele-20-kart.md`

### 1.4 Kalıp listesi
`h3/kalip-listesi.md`. Dilbilimci bitirince yeniden üretilecek.

---

## 2. Yapay zekâ ölçüm tablosu

| Görev | Model katmanı | Sunucu bütçesi | İstemci | Önbellek | YZ yoksa | Test |
|---|---|---|---|---|---|---|
| equiv_check | hızlı (flash-lite önce) | 8 + 4 sn | 12 sn; hata → "kontrol edilemedi", ceza yok | ✓ | kural + accepted[] | birim + e2e |
| explain_tr | hızlı | 8 + 4 sn | 12 sn | ✓ | sakin mesaj | e2e (uzun basma) |
| say_it_de | hızlı | 8 + 4 sn | 12 sn; önce yerel arama | ✓ | yerel kayıt | birim |
| roleplay_turn | **güçlü** (flash önce), D-RP1 | 20 + 10 sn | 45 sn üst sınır; 11,5 sn'de "Biraz uzun sürüyor" + Bekle / Tekrar dene / YZ'siz devam; istek kesilmez | — | senaryo diyaloğuyla rol | e2e: 429, 503, bozuk JSON, ağ kopması, yanıtsız, geç yanıt (Bekle) |
| feedback_tr | güçlü | 20 + 10 sn | 45 sn; aynı yumuşak bekleme | — | öz değerlendirme | e2e |

- **Gizlilik (D-061):** yapay zekâya ad gitmez; ad `[Name]` olarak gider, yalnızca hitap (Herr/Frau) eklenir. e2e 7b bunu doğruluyor.
- **Gerçek süreler (p50/p95):** ölçülemedi. Worker'da anahtar yok, Cloudflare kurulumu proje sahibinde. İstemci her görevin son 200 süresini cihazda tutuyor (`latencyStats()`); Worker kurulunca rapora girecek.
- **Hedefler:** hızlı görevlerde p95 ≤ 8 sn. Rol oyununda öğrenci en geç 12 sn içinde seçenek görür.

## 3. Günlük yapay zekâ çağrı bütçesi

| Kalem | Tahmini günlük üst sınır |
|---|---|
| equiv_check | ≤ 40 (yalnızca kural karar veremeyen "yakın" cevaplar; önbellekli) |
| explain_tr + say_it_de | ≤ 30 (önbellekli; önce yerel) |
| roleplay_turn | ≤ 40 (≈ 3 konuşma × 12 tur) |
| feedback_tr | ≤ 3 |
| **Toplam** | **≈ 110 / gün** |

- Worker kullanıcı sınırı `AI_DAILY_LIMIT = 300`. Kota dolunca para çekilmez; yapay zekâsız devam edilir.
- LS-14.4 (bütçenin %80'inde düşük öncelikli çağrıları erteleme) R1'de.

## 4. Testler ve PR'lar

**Yığın (D-041):** #3 → #4 → #5 → #6 → #7 → #8 → #9 → #10 → #11 → #13 → #14 → #15. Ayrıca #2 (v1, ayrı).

| Ölçüt | Sonuç |
|---|---|
| Birim testleri | 89/89 |
| İçerik | 0 hata |
| Tip denetimi | ✓ |
| WebKit CI (#7) | iPhone 15 ✓, iPhone 16 Pro Max ✓ |
| WebKit CI (#8 ve üstü) | ilk koşuda 2 test kırmızıydı (süre çipi yarışı, uzun basma öykünmesi); düzeltildi, yeniden koşuyor |
| v1 kapısı | 17/17; v1 2026-11-17a yayında |

- **Bağımsız inceleme:**
  - #2–#7 incelendi; #4 ve #7'deki engelleyici bulgular düzeltildi.
  - #8–#14 inceleniyor.
- **/v2/ URL:** https://mutemadiyennn.github.io/deutsch-werkstatt/v2/. Yığın main'e alınınca `deploy-v2.yml` ile yayınlanacak ve `v2-YYYYMMDD-n` olarak etiketlenecek. **Henüz yayında değil.**

## 5. Kapsam özeti
- 800 K1 kartı, sıklık sırasının ilk 834 lemmasını kapsıyor (782 farklı sıra).
- 5.000 lemmanın konuşma dilindeki (altyazı) token kütlesine göre:
  - kartlı lemmalar ≈ %89,4
  - ilk 1.000 lemma ≈ %91,6
  - ilk 2.000 lemma ≈ %95,9
- Bu oranlar 5.000 lemma içindeki paylardır, bütün metin kapsamı değildir.
- Örnek cümlelerde seyrek ya da öğretilmemiş kelime oranı %4,3 (sınır %5).
- B1 referans listesiyle karşılaştırma bekliyor (PDF; depoya girmez).

---

## 6. EK1: arayüz kalite çıtası (v1 ↔ v2, 390×844, açık + koyu)
Görüntüler `h3/ekran/` klasöründe: Bugün, kelime kartı (v2'de ifade kartı), alıştırma, diyalog, rol oyunu, mola, İlerlemem.

| Ekran | İlk karşılaştırma | Şimdi |
|---|---|---|
| Bugün | v2 zayıftı (düz beyaz kartlar) | v1 dili: mavi kahraman kart, halka, rozetler, sıradaki iş kartı. **v2 ≥ v1** |
| Kelime kartı | v2 zayıftı (sola yaslı, küçük) | ortalanmış büyük ifade, büyük yuvarlak ses + yavaş, katmanlar, kelime bilgisi, sesli tekrar. **≥ v1** |
| Alıştırma | eşit | boşluk çizgisi, harf şeridi, başparmak bölgesinde cevap. **≥ v1** |
| Diyalog | v2 zayıftı (rol adı, ses, Türkçe yoktu) | rol adı, satır başına ses, destek düzeyine göre Türkçe. **≈ v1** (v1'deki "hepsini dinle" aşama 1'e taşındı) |
| Rol oyunu | — | sohbet balonları, küçük ses düğmeleri, cevap alanı başparmak bölgesinde. **≥ v1** |
| Mola | v2 zayıftı | ortalanmış büyük sayaç, öneri, Almanca cümle; öğrenme ekranında ekranı kaplar. **= v1** |
| İlerlemem | v2 zayıftı | mor kahraman kart + 4 istatistik kutusu, renk tonlu paneller. **≥ v1** |

Bugün itibarıyla v2'nin v1'den zayıf kaldığı ekran yok.

**Açık konular:**
- Maskot ve konfeti yok. Açılıp kapatılabilir bir ayar olarak R1-17'de gelecek.
- Fotoğraflı kelime kartı yalnızca Worker (Pexels) bağlıyken çalışıyor.

## 7. EK2: iPhone standardı (8 madde)

Ölçümler yerel Chromium'da iPhone 15 profiliyle alındı (`tests/e2e/perf.py`). Gerçek iPhone değerleri, kontrol listesinde proje sahibinden gelecek.

| # | Madde | Durum | Ölçülen / kanıt |
|---|---|---|---|
| 1 | Klavye | **yapıldı** | lang=de, otomatik düzeltme ve büyük harf kapalı, spellcheck=false, autocomplete=off (e2e). ä ö ü ß Ä Ö Ü şeridi imlece ekliyor. visualViewport ile alan görünür (gerçek cihazda doğrulanacak). iOS'un otomatik nokta, boşluk ve akıllı tırnakları notu etkilemiyor (7 birim testi) |
| 2 | iOS davranışı | **yapıldı** | Sistem fontu, dokunma vurgusu kapalı. Dokunma hedefleri ≥44 px (e2e). Genel metin seçimi kapalı; Almanca metinde uzun basma → "Bu ne demek?" (e2e). Yatay taşma yok (her ekran). Güvenli alan değişkenleri var; 59 px özel testi **yok** |
| 3 | Almanca tipografi | **yapıldı** | hyphens:auto. En uzun 50 kelime 320 ve 390 px'te taşmıyor (e2e) |
| 4 | Ses ve mikrofon | **kısmen** | İzinden önce Türkçe açıklama, kayıt göstergesi, bas-konuş ya da dokun-başlat/bitir, arka plana geçince durdurma ✓. Hazır ses dosyası olmadığı için ≤300 ms gecikme ölçülmedi (cihaz sesi) |
| 5 | Performans | **kısmen** | JS 161 KB gzip (sınır 250, CI'da bütçe kontrolü). Etkileşime hazır: ilk açılış 186 ms, sonraki 12 ms (yerel). Kaydırmada 60 fps, en kötü kare 17 ms. Uzun liste sanallaştırması yok (henüz gerek yok). İçerik tembel yükleniyor |
| 6 | Erişilebilirlik | **kısmen** | %130 yazı boyutunda 6 ekranda taşma yok (e2e; kök 22,1 px). Normal ayar iOS Dynamic Type'ı izliyor. Azaltılmış hareket ✓. VoiceOver etiketleri düğmelerde var. WCAG AA kontrast ölçümü yapılmadı |
| 7 | Tasarım sistemi | **yapıldı** | Belirteçler, 4/8 boşluk ızgarası, ortak bileşenler (`ui/kit.tsx`). Haptik: başarı / hata / seçim |
| 8 | Test | **kısmen** | WebKit e2e iPhone 15 + iPhone 16 Pro Max CI'da (#7 yeşil). Görsel regresyon işi var ama **taban görüntü henüz yok**; ilk WebKit çıktısından alınacak. Gerçek iPhone kontrol listesi yazılmadı |

## 8. Çalışma düzeni (9 madde)

| # | Madde | Durum |
|---|---|---|
| 1 | Kalıcı hafıza (phases/, STATUS, DECISIONS) | yapıldı. phases/ 13 metin; EK1/EK2 özetten kuruldu (PM: kalabilir) |
| 2 | CLAUDE.md + `.claude/agents/` (5 tanım, modeller PS'nin istediği gibi) | yapıldı |
| 3 | Küçük ve sık teslim (ayrı dal/PR, CI yeşil → main → /v2/) | kısmen. PR'lar ayrı ve yığınlı; **henüz main'e birleştirme yok** |
| 4 | Bitti tanımı | uygulanıyor; bu rapordaki "kısmen"lerin nedeni bu |
| 5 | Bağımsız inceleme | yapıldı (#2–#7) / sürüyor (#8–#14). İçerik sırası yazar → dilbilimci → örneklem; örneklem kontrolü (qa) henüz yok |
| 6 | Geri alma (etiket + tek komut) | yapıldı (iş akışı + `scripts/v2-rollback.sh`); ilk etiket ilk yayında |
| 7 | Erken gerçek cihaz (inceleme bekliyor etiketiyle /v2/) | yapılmadı. İlk yayın yığın birleşince |
| 8 | WebKit kabul ölçütü | yapıldı (CI) |
| 9 | Oturum düzeni (BAŞLANGIÇ metni) | yapıldı (§12) |

## 9. H2'den kalanlar
- **Tamamlananlar:**
  - a) bundle yedeği
  - b) PR #1 birleşti
  - c) T04 + v1 17a yayında
  - d) T05 listesi (depo dışında). PM-001 kalemleri eklendi.
  - f) Cloudflare telefon adımları. Gemini anahtarında faturalandırma kontrolü eklendi.
- **Eksik:** hızlı hat kartı (v1 17b) yapılmadı (R1-23).
- **Proje sahibinin kararını bekleyenler:**
  - Cloudflare kurulumu
  - B1 referans PDF'i
  - T05 onayı, ardından git geçmişi temizliği (son onayla)
  - LEX: kaba kelime 809 · lx:Deutsch / lx:deutsch birleştirme

## 10. PM incelemesi ve Faz R / H4

| Kalem | Durum |
|---|---|
| P0 kalıplar | 61/61 standartta (#15); dilbilimci incelemesi sürüyor |
| P1 kimlik | Uygulamada ✓ (#10): yer tutucular, hitap, YZ'ye ad gitmiyor. İçerikte 01'lere uygulanması H4-c ile |
| P1 heceleme iki biçim | İçerik işi; H4-c ile |
| P2 speeds, accepted ≥3 | doğrulayıcı ✓, içerik ✓ |
| P2 kalıcı muayenehane | WORLD'de ✓ (Dr. Weber + Sabine Huber); senaryolara bağlama H4-c |
| İngilizce kararı | D-060 ✓ |
| Faz R a–c | ✓ (#11) |
| PM-001 | ✓ v2 (#13). v1 kalıntıları T05'te |
| PM-002 | R1-01'e eklendi |
| H4-a | ✓ (#9) |
| H4-b | ✓ (#14): 12 karakter, 26 hafta, takvim. Dilbilimci: Bairisch ve takvim KAPANDI |
| H4-c | kalıplar incelenince |

## 11. Riskler
1. **Yapay zekâ kapalı:** Worker anahtarı yokken rol oyunu, rapor ve "Bu ne demek?" yapay zekâsız yedekle çalışıyor. Gerçek kalite ve süre ölçülemiyor.
2. **Yığın uzun (12 PR):** birleştirme gecikirse çakışma riski var. Öneri: #3–#8 incelemesi bitince yığının bu kısmı birleştirilip /v2/ yayınlansın (erken gerçek cihaz).
3. **İçerik darboğazı:** kalıp incelemesi (61) → 01 uyarlaması → 02–03 → Advent (27.11) sırası sıkışık. Advent için yalnızca pilotun 14 kalıbı yeterli (D-073).
4. **Yerel WebKit yok:** her WebKit hatası CI turu gerektiriyor; iki öykünme farkı bu yüzden geç yakalandı.
5. **LS-2.1 / PM-002:** ilk açılış ve giriş akışı R1'de baştan değişecek; e2e testleri buna göre yeniden yazılacak.
6. **Bairisch dağarcığı dar:** kaynaklı ifade az. Karakterlerin Bairisch oranları düşürüldü.
7. **Bekleyen 02–04 dosyaları depo dışında:** oturum kapanırsa kaybolabilir (yeniden üretilebilir).

## 12. BAŞLANGIÇ (yeni sohbetin ilk mesajı)
```
Deutsch Werkstatt 2.0 — devam. Depo: Mutemadiyennn/deutsch-werkstatt.
Önce oku: CLAUDE.md → docs/v2/LEARNING_SYSTEM.md → docs/v2/LEARNER.md → docs/v2/WORLD.md → docs/v2/STATUS.md → docs/v2/DECISIONS.md.
PM talimatları: issue #12 ve açık PR'lardaki [PM] yorumları (REST ile oku, her birine ✓/✗ yanıt ver).
Sıradaki iş (STATUS "Sıradaki adım"): kalıp incelemesini (#15) tamamla → H4-c (01'ler: yer tutucular, iki heceleme, dünyaya bağlama, yeniden dilbilimci) → LS-17.0 Advent mini senaryoları (27.11.2026'ya kadar) → yığını incele/birleştir ve /v2/ yayınla → R1 görev dökümü (R1-01…R1-24).
Durma: yalnızca geri alınamaz işlem, para riski ya da LS ile çelişki.
```

## Ek: CLAUDE.md tam metni (rapor anındaki hâli)

````markdown
# Deutsch Werkstatt — çalışma kuralları

## Amaç
Türkçe konuşan bir yetişkinin Almancayı gerçek hayatta (telefon, doktor, iş, resmî daireler, gündelik konuşma, Bavyera ağzını anlama) kullanabilmesi için kişisel bir iPhone uygulaması. Öğretim iletişim odaklıdır: önce duy, sonra parçala, sonra hatırla, en sonda bağımsız konuş. Açıklama dili Türkçe; üç dil katmanı (Hochdeutsch / Alltagsdeutsch / Bairisch). v1 (`app/`, Pages kökü) çalışmaya devam eder; v2 (`web/`, `worker/`, `content/v2/`) `/v2/` altında yayınlanır ve aynı iPhone kabuğundan açılır.

## Her oturumda önce oku
Her ajan ve oturum işe `docs/v2/LEARNER.md`'yi okuyarak başlar. Her kararda tek soru: **"Bu, bu öğrenciyi dışarıda konuşmaya yaklaştırıyor mu, ve yarın uygulamayı yeniden açmak istemesini sağlıyor mu?"**
1. `docs/v2/LEARNING_SYSTEM.md` — **en üst belge** (LS-x.y kimlikleri). Öncelik: LEARNING_SYSTEM > PEDAGOGY > phases/ > BLUEPRINT (D-070)
2. `docs/v2/LEARNER.md` — öğrenci kartı (kimlik bilgisi yok); ürün bir öğretmendir
3. `docs/v2/WORLD.md` — kurgusal şehir, kalıcı karakterler, 26 haftalık hikâye, gerçek takvim
4. `docs/v2/STATUS.md` — görevlerin durumu, son commit, açık sorunlar, sıradaki adım
5. `docs/v2/DECISIONS.md` — alınmış kararlar ve gerekçeleri (yeniden tartışma)
6. `docs/v2/PEDAGOGY.md` — içerik standardı, şema ve doğrulayıcı kuralları
7. `docs/v2/phases/` — proje sahibinin faz metinleri; hatırlamadığın kural buradadır

## Değişmez kurallar
- **Kişisel bilgi yok.** Depoda, kodda, testte, prompt'ta öğrencinin hayatına dair ayrıntı, kurs ya da kitap adı yazılmaz (istisna: kimliksiz `LEARNER.md`, D-066). Öğrencinin adı/cinsiyeti içerikte sabit yazılmaz: `{name}`, `{Herr|Frau}` yer tutucuları; yapay zekâya ad gitmez (D-061). Diğer karakterlerin adları çeşitli.
- **Faturalandırma yok.** Yalnızca ücretsiz katmanlar (Cloudflare Workers/KV, Gemini ücretsiz katmanı). Google Cloud TTS kapalı. Kota dolarsa işlem durur, para çekilmez.
- **Anahtar istemcide ve depoda yok.** Anahtarlar yalnızca Cloudflare secret'ında; dağıtım GitHub Actions + şifreli secret. Geliştirici anahtar görmez. Firebase web yapılandırması (herkese açık) istisnadır.
- **v1'e yalnızca onaylı küçük dokunuşlar.** v1 değişikliği → tam v1 kapısı (`bash app/tests/run_all.sh`, 17/17) → yayın.
- **Bairisch yalnızca kaynaklı.** Kaynak yoksa yazılmaz ya da "uncertain" işaretlenir. Uydurma lehçe yok.
- **Türkçe açıklama, İngilizce köprü yok.** İngilizce yalnızca mistakes_tr içinde kısa "yanlış arkadaş" uyarısı olabilir (D-060).
- **Kalıp kapısı (D-063):** kalıplar "reviewed" olmadan yeni senaryo/alan yazılmaz. Üretim maddelerinde accepted[] ≥3 (D-064).
- **Döngüsüzlük (H4 §4):** bir konu yeni bir şey öğretmedikçe tekrar gelmez; tekrarlar farklı bağlam ve karakterle gelir.
- **WebKit kabul ölçütüdür.** "Bitti" kararı CI'daki WebKit (iPhone 15, iPhone 16 Pro Max) sonucuna göre verilir. Yerelde WebKit kurulamazsa Chromium'a düşülmez; yerel Chromium yalnızca hızlı geri bildirimdir.
- **Bitti tanımı:** kod + birim testleri + WebKit uçtan uca testleri + doğrulayıcı 0 hata + güncel STATUS + PR açıklaması. Biri eksikse "bitti" denmez.
- **Küçük PR.** Her teslim ayrı dal ve ayrı PR; bağımlıysa öncekinin üstüne (yığınlı). PR açıklaması kendi başına anlaşılır: ne değişti, nasıl test edildi, arayüz değiştiyse ekran görüntüleri, bilinen eksikler.
- **Bağımsız inceleme.** Her PR birleşmeden önce işi yazmamış `inceleme` ajanı temiz bağlamla inceler ve PR'a yorum yazar. İçerikte sıra: yazar → dilbilimci → örneklem kontrolü (ayrı ajanlar).
- **En fazla 3 ajan aynı anda.** Ajanlar yalnızca `.claude/agents/` tanımlarıyla başlatılır (lex, yazar, dilbilimci, inceleme, qa).
- **Arayüz çıtası:** v2 hiçbir ekranda v1'den görsel olarak zayıf olamaz (phases/04); iPhone standardı (phases/05).
- **Rol oyunu:** güçlü model; 12 sn'de yanıt yoksa "Biraz uzun sürüyor" + Bekle / Tekrar dene / Yapay zekâsız devam; istek kesilmez (D-RP1).
- **PR'lar LS kimliklerini listeler** (LS-16.4). Her sürümde LS-16.3 öğrenci simülasyonu zorunlu; QA ajanı bilgi kısıtlı oynar (öğretilmeyen öğeyi üretmesi istenirse P0).
- **PM kanalı (D-080):** her anlamlı adımın sonunda ve her birleştirmeden önce issue #12 ve açık PR'lardaki yeni `[PM]` yorumlarını oku (`gh api repos/Mutemadiyennn/deutsch-werkstatt/issues/12/comments`, `issues/<PR>/comments`). Her talimata yanıt: `✓ PM-00x — <commit/PR>` ya da `✗ PM-00x — <gerekçe>`. Beklerken send_later ile 60 dk'da bir #12'yi kontrol et.
- **Sınav tarihi ve kurum adı depoya girmez (D-075, PM-001):** yalnızca cihaz profilinde; testler sahte tarihle.
- **Durma kuralı (D-072):** kontrol noktası raporundan sonra durulmaz. Yalnızca geri alınamaz işlem, para gerektirebilecek karar ya da LS ile çelişen zorunlulukta durup sor. Büyük değişiklik ve git geçmişi yeniden yazımı onayla.

## Komutlar
```sh
# kurulum
npm ci
pip install playwright pillow && python -m playwright install webkit chromium   # e2e için
# test
npm run typecheck && npm test                 # tip + birim (web, worker, shared, içerik)
npm run content:validate                      # içerik doğrulayıcı (0 hata şart); --strict: kalıp kuralları sıkı
# derleme
npm run content:build && npm run build -w web # web/dist
(cd web && npx vite build --mode e2e --outDir dist-e2e)   # e2e sürümü (sahte giriş, sahte sunucu)
# uçtan uca (yerel hızlı geri bildirim; kabul CI'da WebKit)
cd tests/e2e && python v2_core.py && python v2_player.py && python visual.py --out /tmp/visual
#   WebKit + cihaz: --browser webkit --device "iPhone 15"
# v1 kapısı (yalnızca v1 değişince)
bash app/tests/run_all.sh                     # → /tmp/dw_tests.log, 17/17
# yayın
#   v2: main'e birleşince .github/workflows/deploy-v2.yml → gh-pages/v2/ + etiket v2-YYYYMMDD-n
#   v1: cd app && python3 build.py --ver YYYY-MM-DDx --deploy  (DW_GHPAGES=gh-pages çalışma ağacı) → gh-pages'e commit + push
#   Worker: .github/workflows/deploy-worker.yml (secret'lar GitHub'da; adımlar docs/v2/CLOUDFLARE_TELEFON.md)
# geri alma
scripts/v2-rollback.sh v2-YYYYMMDD-n          # ya da: gh workflow run deploy-v2.yml -f rollback_to=v2-YYYYMMDD-n
```

## Klasör sahipliği (kim yazar)
| Yol | Yazan |
|---|---|
| `web/`, `worker/`, `packages/shared/`, `content/tools/`, `.github/`, `scripts/` | baş geliştirici (ana oturum) |
| `docs/v2/STATUS.md`, `DECISIONS.md`, `BLUEPRINT.md`, `CONTENT_PLAN.md` | baş geliştirici |
| `docs/v2/PEDAGOGY.md`, `docs/v2/phases/` | proje sahibinin metni; yalnızca baş geliştirici kopyalar, içerik değiştirilmez |
| `content/v2/registry/lexicon/**` | lex |
| `content/v2/domains/<alan>/**` | yazar (görevde verilen alanlar) |
| görevde verilen içerik dosyaları + `docs/v2/reviews/**` | dilbilimci (yazar o dosyaya artık dokunmaz) |
| `content/v2/registry/patterns.json` | yazar (baş geliştiricinin görevlendirmesiyle) → dilbilimci incelemesi |
| `content/v2/registry/domains.json`, `frequency/` | baş geliştirici |
| `docs/v2/WORLD.md`, `content/v2/world/**` | baş geliştirici (Bairisch kısmını dilbilimci inceler) |
| `docs/v2/LEARNER.md` | proje sahibinin metni |
| `tests/e2e/**`, `docs/v2/qa/**` | qa (ve baş geliştirici) |
| PR yorumları | inceleme (depoya yazmaz) |
| `app/` (v1) | baş geliştirici, yalnızca onaylı küçük dokunuşlar |

Commit ve PR'ı yalnızca baş geliştirici açar; `git add -A` kullanılmaz (ajanlar çalışırken yarım dosya girmesin), yollar tek tek eklenir.
````
