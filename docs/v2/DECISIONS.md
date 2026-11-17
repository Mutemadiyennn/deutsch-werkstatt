# DECISIONS — kararlar, tarihleri ve gerekçeleri

Biçim: **Kimlik · tarih · karar** — gerekçe. Kaynak: proje sahibi (PS) ya da baş geliştirici (BG). Bir kararın yerine yenisi geçerse eskisi silinmez, "→ yerine geçti: …" diye işaretlenir.

## Ürün ve kapsam
- **D-001 · 2026-11-17 · Yığın: Capacitor kabuğu + TypeScript + Preact + Vite; depo herkese açık kalır (PS, H2).** Mevcut iPhone kabuğu değişmeden kalır; v2, var olan Pages sitesinde `/v2/` altında yayınlanır, v1 kökte kalır.
- **D-002 · 2026-11-17 · Hızlı hat (PS, H2):** v1 Bugün ekranına tek kart ("Yeni: Gerçek hayat dersleri" → `./v2/`). v1 içine geçici oynatıcı yazılmaz.
- **D-003 · 2026-11-17 · Kelime+ dondu; hiçbir yerde faturalandırma açılmaz; Google Cloud TTS kapalı (PS, H2).** Yalnızca ücretsiz katmanlar. Gemini ya da Cloudflare kotası dolarsa işlem durur, para çekilmez.
- **D-004 · 2026-11-17 · B1 sınavı hedeflerden biri; tarih yalnızca cihaz ayarında (PS, H2).** Planın son 6 haftası B1 odaklı. Tarih depoya yazılmaz.
- **D-005 · 2026-11-17 · Kurs ve kitap adı depoda, kodda, testlerde ve prompt'larda geçmez (PS, H2).** v1'deki kişisel içerik T05 ile nötrleştirilecek (liste hazır, onay bekliyor). Git geçmişinin yeniden yazılması için 3 şart: (a) bundle yedeği verildi ✓, (b) T05 onayı, (c) son onay.
- **D-006 · 2026-11-17 · Pomodoro (PS, H2):** 4×25 dk + 5 dk mola; 4. seanstan sonra 20 dk uzun mola, atlanabilir; yalnızca etkin çalışma sayılır; haftalık hedef 5 gün × 100 dk.
- **D-007 · 2026-11-17 · Senaryo kapısı yalnızca temel (essential) öğelere bağlı (PS, H2).**
- **D-008 · 2026-11-17 · H3, H2'nin e ve g görevlerinin ve H2-EK'nin yerine geçer; PEDAGOGY.md bütün içerik ve kod kararlarının dayanağıdır (PS, H3).**

## Arayüz
- **D-010 · 2026-11-17 · Yazı tipi: iOS sistem fontu (-apple-system / SF Pro); v1'in Google yazı tipleri kaldırıldı, tipografi ölçeği (boyut/ağırlık) korundu (BG, EK2 §2).** Gerekçe: EK2 sistem fontunu ister; dış font yüklemek açılış bütçesini (≤2 sn) ve CSP'yi zorlar. EK1 "tipografi ölçeği korunur" der; ölçek korunduğu için çelişki yok, yalnızca yüz değişti.
- **D-011 · 2026-11-17 · v2 renk/kart/düğme dili v1 "Tasarım v3" belirteçlerinden taşındı (BG, EK1).** İlk v2 bej teması v1'den zayıf bulundu ve bırakıldı. Bugün, İlerlemem, mola ve kelime kartı v1 düzeninde (renkli kahraman kartları, istatistik kutuları, ortalanmış büyük kelime) yeniden yapıldı.
- **D-012 · 2026-11-17 · `.fade` geçişi yalnızca opaklık kullanır (BG).** `transform` içeren animasyon, içerideki `position:fixed` eylem çubuğunu kaydırıyordu.
- **D-013 · 2026-11-17 · Almanca metinde sistem seçim menüsü yerine uzun basma = "Bu ne demek?" sayfası (BG, EK2 §2).** Seçim ve sistem menüsü aynı anda açılıp çakışmasın diye Almanca metinde de sistem seçimi kapalı; girişler seçilebilir.
- **D-014 · 2026-11-17 · Yazı boyutu: "Normal" ayarı iOS Dynamic Type'ı izler (`font: -apple-system-body`), diğer ayarlar uygulama içi ölçek (en çok %130); bütün ölçüler rem tabanlı (BG, EK2 §6).**
- **D-015 · 2026-11-17 · Klavye açıkken eylem çubuğu akışa döner (position: static) (BG, EK2 §1).** iOS'ta sabit alt çubuk klavyenin arkasında kalabiliyor; akışta kalan alanı iOS kendisi görünür kaydırır. Gerçek cihazda doğrulanacak.
- **D-016 · 2026-11-17 · Öğrenme ekranındayken mola başlarsa mola kartı ekranı kaplar (v1 davranışı) (BG).**

## Yapay zekâ
- **D-020 · 2026-11-17 · Cevap politikası (PEDAGOGY §7a):** önce kurallar + accepted[]; yalnızca "yakın" cevaplarda equiv_check; yapay zekâ hata verirse "kontrol edilemedi", ceza yok; "Benim cevabım da doğru" her zaman var.
- **D-021 · 2026-11-17 · İstemci devre kesici: art arda 3 hata → 5 dk yapay zekâsız mod; equiv/explain/say_it önbellekli (BG).**
- **D-RP1 · 2026-11-17 · Rol oyunu modeli (PS düzeltmesi; BG'nin aynı gün aldığı "roleplay_turn hızlı katmana" kararının yerine geçer).**
  - roleplay_turn ve feedback_tr varsayılan (güçlü) model katmanında kalır; sunucu bütçesi 20+10 sn, istemci üst sınırı 45 sn (blueprint).
  - 12 sn kuralı bir *seçenek* kuralıdır: 12 sn'de yanıt yoksa "Biraz uzun sürüyor" + Bekle / Tekrar dene / Yapay zekâsız devam. İstek kesilmez; yanıt gelirse kullanılır ("Tekrar dene" ikinci istek açar, önce gelen kullanılır; "Yapay zekâsız devam" seçilince geç yanıt yok sayılır).
  - p95 ≤ 8 sn hedefi yalnızca hızlı görevler içindir (equiv_check, explain_tr, say_it_de; sunucu bütçesi 8+4 sn, istemci 12 sn).
  - Süre ölçümü: istemci görev başına son 200 yanıt süresini cihazda tutar (`latencyStats()` → p50/p95); gerçek değerler ancak Worker anahtarla çalışınca ölçülebilir.
- **D-022 · 2026-11-17 · Anahtarlar yalnızca Cloudflare secret'ında; dağıtım GitHub Actions + şifreli secret (PS, H2).** Geliştirici anahtarı görmez.

## İçerik
- **D-030 · 2026-11-17 · Sıklık kaynağı: FrequencyWords 2018 (de) + simplemma; 5.000 lemma, K1 ≤2000, K2 ≤5000 (BG, H3).** Goethe/telc listeleri yalnızca karşılaştırma referansı; depoya kopyalanmaz.
- **D-031 · 2026-11-17 · LEX: özel adlar, İngilizce sözcükler ve lemmatizer tekrarları atlandı; yanlış kökler doğru kelimeye düzeltildi (BG onayı, LEX raporu).** Kaba sözcükler `register: informal`, yalnızca anlama amaçlı. 809 "ficken" kartı yapılmadı → PS kararı bekliyor.
- **D-032 · 2026-11-17 · Taslak (draft) içerik main'e birleşebilir ve "inceleme bekliyor" etiketiyle yayınlanır; incelenmiş sayılmaz (BG, Çalışma düzeni §7).** İçerik sırası değişmez: yazar → dilbilimci → örneklem kontrolü.

## Süreç ve test
- **D-040 · 2026-11-17 · WebKit kabul ölçütü CI'dadır (PS, Çalışma düzeni §8).** Bu oturumun ortamında WebKit indirilemiyor (cdn.playwright.dev izin listesinde değil). Yerelde Chromium yalnızca hızlı geri bildirim içindir; "bitti" kararı GitHub Actions'taki WebKit (iPhone 15 / iPhone 15 Pro Max profilleri) sonucuna göre verilir.
- **D-041 · 2026-11-17 · Küçük PR'lar, yığınlı dallar (BG, Çalışma düzeni §3).** Her teslim ayrı dal ve ayrı PR; bağımlı olan bir öncekinin üstüne kurulur. Ara katmanlar tek başına yeşil olmayabilir (ör. şema değişikliği eski ekranı kırar, onu yeni oynatıcı düzeltir). Bu yüzden kabul ölçütü **yığının tepesindeki PR'ın CI'ı (WebKit dahil)**dır; yığın tek seferde, commit kimlikleri korunarak (merge commit) main'e alınır, böylece main hiçbir an kırmızı bir ara durumda kalmaz ve alt PR'lar GitHub'da kendiliğinden "birleşti" görünür. Her PR yine ayrı incelenir.
- **D-042 · 2026-11-17 · Ajan modelleri (PS, EK).** dilbilimci ve inceleme → `fable`; lex, yazar, qa → `opus`. Bu ortamın ajan aracı `fable`'ı destekliyor. Fable haftalık payı dolarsa kredi alınmaz; o ajanlar `opus` ile sürer (tanım dosyasındaki model alanı değiştirilir ve buraya not düşülür).
- **D-043 · 2026-11-17 · Yayın etiketleri `v2-YYYYMMDD-n`; geri alma tek komut: `scripts/v2-rollback.sh <etiket>` (BG, Çalışma düzeni §6).**
- **D-044 · 2026-11-17 · v1 2026-11-17a yayınlandı (T04, taşınabilir derleme).** v1 kapısı 17/17 geçti; clocktest'teki `e.target.closest` hata satırları yayındaki 14e'de de aynen var (test belgeye sahte tıklama gönderiyor), gerileme değil.

## Aşama 1–2 yeniden tasarımı
- **D-050 · 2026-11-17 · Aşama 1–2: "önce duy, sonra parçala, sonra hatırla" (PS düzeltmesi; phases/09).** Tek tek kelime kartı + "Anladım" yürüyüşü kaldırılır. Akış: senaryo diyaloğunu dinleme (önce altyazısız, sonra altyazılı) → bilinmeyenler için tek ekranlı tarama (biliyorum / emin değilim / bilmiyorum; "biliyorum" hemen hatırlama maddesiyle doğrulanır; pasif gücü ≥0,6 olan öğeler yalnızca hızlı kontrole girer) → en fazla 8–12 yeni öğe, kart birimi **ifade** (kelime bilgisi kartın içinde küçük, kök ailesi tek kartta) → her 3–4 kartta hatırlama turu (dinle → anlam seç; Türkçe → Almanca söyle/yaz). İşlev kelimeleri ayrı kart olmaz. Süre bütçesi ≤8 dk, ekranın üstünde görünür. Ölçüm: aşama 1–2 süresi, kart başına süre, hatırlama başarısı. Ayrı PR; WebKit testleri buna göre.

## H4 ve proje yöneticisi incelemesi (PR #4–#6)
- **D-060 · 2026-11-17 · İngilizce yalnızca "yanlış arkadaş" uyarısı (PM).** Açıklama dili her zaman Türkçe. İngilizce yalnızca mistakes_tr içinde, kısa bir yanlış-arkadaş uyarısı olarak geçebilir ("also, İngilizcedeki 'also' değildir"). Gerekçe: öğrenci İngilizceye kaçma eğiliminde; uyarı kaçışı önler, köprü kurmaz. K1 kartlarındaki 7 İngilizce benzetme bu ölçütle dilbilimci incelemesinde tek tek kontrol edilir.
- **D-061 · 2026-11-17 · Öğrencinin kimliği yer tutucuyla (PM P1).** Öğrencinin satırlarında sabit ad/cinsiyet yok: `{name}`, `{A|B}` (A = Herr hitabı, B = Frau hitabı). Değerler yalnızca cihaz profilinden; hitap seçilmemişse iki biçim de kabul edilir ve "A/B" gösterilir; ad girilmemişse cevaptaki ad yuvası serbesttir. Yapay zekâya ad gitmez: istemci geçmişte öğrencinin adını `[Name]` ile değiştirir, yalnızca hitap gönderilir.
- **D-062 · 2026-11-17 · Harf kodlama iki biçimde (PM P1).** DIN 5009 (şehir adlı) ve geleneksel (Anton, Berta, Cäsar… / Nordpol, Otto…) birlikte öğretilir; karşı taraf çoğunlukla geleneksel biçimi kullanır; dinlemede ikisi de geçer; öğrencinin cevabında ikisi de kabul.
- **D-063 · 2026-11-17 · Kalıplar P0; kapı (PM).** 61 kalıp H3 §3 standardına getirilir (slot ≥8 doldurma, 2–4 satır Türkçe not, ≥10 örnek hd+alltag, 7 dönüşüm, mistakes_tr) ve dilbilimciden geçer. Önce pilotta kullanılanlar. **Kalıplar "reviewed" olmadan pilotun 02–04 senaryoları ve yeni alanlar yazılmaz / birleştirilmez.** YAZAR'ın daha önce yazdığı 02–04 dosyaları depo dışında beklemede (PR açılmadı); kalıplar ve dünya hazır olunca uyarlanıp incelenir. Doğrulayıcı: incelenmiş senaryonun bütün essentials.patterns'ı reviewed olmalı (hata); taslak senaryoda uyarı.
- **D-064 · 2026-11-17 · Üretim maddelerinde accepted[] ≥3 (PM P2).** build, tr_de, guided_response, transform, listen_and_respond: en az 3 varyant (gap ve pick hariç). Doğrulayıcıda hata.
- **D-065 · 2026-11-17 · Dinleme parçasında hız listesi (PM P2).** `listening[].speeds` (en az 1: yavaş / doğal / hızlı); hazır ses gelene kadar cihaz sesi bu hızlarla çalar. Mevcut `speed` başlangıç hızıdır. Var olan içeriğe baş geliştirici mekanik olarak `speeds = [slow, speed]` ekledi.
- **D-066 · 2026-11-17 · Öğrenci kartı depoda (PS, H4 §1).** `docs/v2/LEARNER.md` kimlik bilgisi içermeyen genel bir profildir (seviye, zorlandığı durumlar, hedef). Proje sahibinin açık talimatıyla "kişisel bilgi yok" kuralının istisnasıdır; ad, yer adı, işveren, tarih yazılmaz.
- **D-067 · 2026-11-17 · H4 zamanlaması.** a–c hemen (LEARNER, WORLD, pilotu dünyaya bağlama), pilot içerik yazımından önce; d–h H3 kontrol noktasından sonra. Kalıplar (D-063) a–c ile paralel yürür.
