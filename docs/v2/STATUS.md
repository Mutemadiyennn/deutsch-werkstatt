# STATUS — Deutsch Werkstatt 2.0

**Şu anki taş: M1 İlk Hafta** ([YOL_HARITASI](YOL_HARITASI.md), #56 v1.1). M1'in açık işleri (#56 "Eski talimatların bu yoldaki yeri" + PM-052 A + PM-054 M1):
1. Şema (#55; PM-042 A3/A6, PM-045 §4, PM-047 §2, `forms`/fotoğraf/eşdizim) · 2. Kelime Bahçesi (PM-049; dal `v2/bahce`, kişisel banka tek tabloda, "duyduğum kelime" bağlı) · 3. Video ve ses soru oynatıcısı + dikte merdiveni (PM-050, PM-053) · 4. Ders yolu, XP ve seri; planlayıcı: tamamlanan senaryo yeniden önerilmez, seans 2–4 v1'e gitmez, günlük 12 aktif + 25 pasif (PM-052 A.3) · 5. Yeni Bugün + Pomodoro (PM-047; halka, seans x/4, "Devam et" süreyi başlatır, mola zili ve yerel bildirim PM-054.1) · 6. Konuşma provası; yapay zekâsız tam çalışma (yerel sözlük, dallanan çevrimdışı diyalog, kelime sırası esnekliği, sayı/tarih kabulü; PM-052 A.2) · 7. Yazım düzeltmesi ("Doğru. Yazımı: Arzt", PM-054.2), "Doğru söyledim" (PM-054.3), çevrimdışı DE↔TR sözlük araması (PM-054.4), yazma görevi çevrimdışı kontrolü (PM-054.5) · 8. Kart ve kalıp bilgisi görünür (örnekler, forms, sık hata; PM-052 A.5), fotoğraf bileşeni (A.4) · 9. Çevrimdışı (#43 servis işçisi), veri güvenliği, hata ekranı (PM-039 parçası) · 10. Gün sonu özeti ve yerel kullanım ölçümü (PM-052 A.8), içerik güvenliği süzgeci (A.10), hazırlık atlama kilidi (A.11) · 11. #45 arayüz P0'ları M1 ekranlarında · 12. Mevsim dersi ana yolda değil (✓ #49).

Son güncelleme: 2026-11-19 07:50 UTC · Faz: **R1 hazırlığı** · Ana dal: `main` (`64b5024`) · /v2/ yayında: https://mutemadiyennn.github.io/deutsch-werkstatt/v2/ (etiket `v2-20261117-2`)
Yeni oturum: `CLAUDE.md` (okuma listesi: AHTAPOT → YOL_HARITASI → OGRETIM_DONGUSU → BEYIN → MIMARI → TASARIM …) → bu dosya → `DECISIONS.md`. "Sıradaki adım"dan devam et; hiçbir iş baştan başlatılmaz (PM-007 §4).

## Sıradaki adım (PM-050: "İlk Hafta" dikey dilimi önce; 2026-11-18 23:45 UTC)
**İmza yol haritası:** [`docs/v2/IMZA_YOL_HARITASI.md`](IMZA_YOL_HARITASI.md) — #54'ün her satırı için ekran tarifi ve sıra (PM-048).
1. Birleştirme sırası: #61 (veri). Birleşenler: #60 (02:30), #64 (02:12), #59 (01:57), #43 (01:37), #55 (00:27), #52 (23:05), #48 (23:07), #50 (23:34), #51 (23:54), #49 (23:54).
2. **PM-049 Kelime Bahçesi** (dal `v2/bahce`): sekiz soru türü, FSRS vadesi, yanlışta başka örnek ve fotoğraf, kalıcılık kuralı; `strictNumberWords` oynatıcıya burada bağlanır.
3. PM-050 sırası: video ve ses soru oynatıcısı + dikte → ders yolu ve XP → yeni Bugün + Pomodoro (PM-047) → konuşma provası. Öne alınan mühendislik: çevrimdışı, veri güvenliği, hata sınırı.
4. Sonra: heceleme yuvaları (İçerik Motoru isteği), PM-039.1 (deploy-v2 CI'a bağlı), #45 arayüz P0'ları.

## Birleşenler (2026-11-19)
- #66 M1 A5b ders yolu (06:45) · #67 M1 A6 Bugün + Pomodoro (07:30) · #65 A5a temel ders · #62/#63/#69 İÇ içerik · #71/#72 profil (D-061)

## Birleşenler (2026-11-18)
- #52 gizlilik (23:05) → v1 **2026-11-18c** yayında · #48 46 kalıp (23:07): kayıttaki 61 kalıbın hepsi onaylı.

## Ölçümler (PM-046 A)
- Okur turu ortalaması: PM-032 partisi 5 tur (çip ölçütü tur 4'te eklendi), 46 kalıp 3 tur. Hedef ≤ 1,5. Geri dönen hata türleri (tırnak, noktalı virgül, "aynı durumda" göndermesi, olumsuzluğu kaybeden çip) yazar talimatına eklendi.

## Yarım işler (PM-042 C)
| İş | Dal | Durum |
|---|---|---|
| Konuşma provası, yapay zekâsız (#58 A7) | `v2/prova` | #68 birleşti |
| Kalıp kartı (#58 B2) | `v2/kalip-karti` | PR #94: 2. tur 1 P1 (alt sayfada kişiselleştirme) düzeltildi, odak yönetimi; PM-057 son tur. İÇ iş listesi: 957 dolgunun 381'i (%40) için ne örnek ne anlam var; kart bunu söylüyor (D-110) |
| Şölen 1 (#58 B10, PM-059) | `v2/solen-1` | PR #87: 1. tur 5 P1 + 9 P2 düzeltildi (D-107 sonu); 2. tur bekliyor |
| Doğrulayıcı B4 (#58 B4, #54 D16) | `v2/dogrulayici-b4` | PR #88: 1. tur 5 P1 düzeltildi (D-108); 0 hata, 126 uyarı; İÇ iş listesi: 7 şiddet tanıma kartında kullanım uyarısı, 46/119/167 kart kuralı; 2. tur bekliyor |
| Kapalı medya rafı (#58 B12) | `v2/medya-rafi` | 1. parça PR #98: 1. tur 3 P1 düzeltildi (adres doğrulama, "Fail closed" zorunlu, gerçek Function ile e2e); 2. parça #99 doldurma hattı; sırada fotoğraf yolu, doğrulayıcı; proje sahibinin adımları bekleniyor |
| Bahçe değişen cümle (PM-062, #58 B13) | `v2/bahce-donusum` | #92 birleşti (D-111) |
| Şölen 1 (#58 B10, PM-059) | `v2/solen-1` | #87 birleşti (D-107) |
| Hızlı şerit "Biliyorum, sına beni" (#58 B16, PM-066 1, 2, 4, 5, 6) | `v2/hizli-serit` | PR açıldı (D-116); sırada madde 3 "Günü sınavla geç" (İÇ `gun_sinavi` içeriği, #109 şeması). M2 girdisi (PM-067 2–6): dinle→resmi seç, sesli boşluk, takılan kelime, karışan çiftler (fark kartı), günlük yeni kart sınırı |
| Gün sonu özeti + yerel kullanım ölçümü (#58 B3) | `v2/gun-sonu` | #93 birleşti (D-109) |
| Doğrulayıcı B4 (#58 B4, #54 D16) | `v2/dogrulayici-b4` | #88 birleşti (D-108) |
| Değerlendirme doğruluğu (#58 A11) | `v2/degerlendirme` | PR #76: 1. tur P0 (V2 aşırı kabul) ve P1'ler düzeltildi; kalıcı permütasyon taraması; 2. tur bekliyor (D-104) |
| Heceleme yuvaları (harf yuvalı değerlendirme, ad/soyad) | `v2/degerlendirme` | #76 içinde (D-104 madde 3) |
| Sözlük arama (#58 B1) | `v2/sozluk-ara` | PR açıldı: çevrimdışı DE↔TR, kart, "Duyduğum kelime" olarak Bahçe'ye |
| Dinleme hızı ayarı etkili (#58 B7) | `v2/dinleme-hizi` | PR açıldı: Yavaş seçiliyse her cümle ilk kez yavaş, tekrarında normal; medya 0,75× |
| Çevrimdışı medya (#58 A12 son parça) | `v2/cevrimdisi-medya` | PR #74: medya pakette, servis işçisi ayrı önbellek + 206 aralıklı yanıt, uçak modu e2e; 2. tur bulguları düzeltildi |
| Heceleme yuvaları (harf yuvalı değerlendirme, ad/soyad) | — | tasarım bekliyor |

## İçerik sayacı (PM-015; hedef / taslak / onaylı / yayında) — 2026-11-19
| Seviye | Kelime kartı | Kalıp | Senaryo (tam) | Mini senaryo | Diyalog grafiği | Okuma | Dinleme | Haber | Madde bankası |
|---|---|---|---|---|---|---|---|---|---|
| A1 | — / 505 / 505 / 0 | — / 40 / 40 / 0 | — / 1 / 0 / 0 | — / 1 / 0 / 0 | 0 | 0 | 0 | 0 | seviye tespiti 2241 (tüm seviyeler) |
| A2 | — / 463 / 463 / 0 | — / 10 / 10 / 0 | — / 2 / 0 / 0 | — / 2 / 0 / 0 | 0 | 0 | 0 | 0 | — |
| B1 | — / 192 / 192 / 0 | — / 11 / 11 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
| B2, C1, C2 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | — |
Kalıpların 61'i de onaylı (main, `patterns.json`). Hedef sütunu (günlük: yazar ≥2 ünite parçası, lex 150–200 kart, dilbilimci aynı gün) hat başlayınca günlük doldurulur. BY-8 tükenme tahmini: K2 motoru (R1) gelene kadar hesaplanamaz.
R0 temel paket: 10 ders, 189 öğretim öğesi, 353 alıştırma; main'de (#51). Kelime sayıları `card:false` işlev kelimelerini saymaz.
B4 kart kuralları (#88, #96): parti dosyalarında K1 isim boşluğu, 3+ eşdizim ve somut kelimede örnek başına fotoğraf sorgusu uyarıları 0 (150 kart kapandı). Doğrulayıcının "görselsiz örnek" sayacında kalan 82 kart eski `lexemes.v1.json` kartları; taban 0 / 0 / 82 (ANA, birleştirmede).
B5 fotoğraf seçimi (#91): 308 yerin 40'ına açık lisanslı fotoğraf seçildi, 220'si reddedildi, 48'i soyut; 332 kısa ikinci sorgu A10 hattına verildi. Hedef somut kelimelerin %85'i; Openverse sonrası ikinci tur.
Okur turu (PM-046, hedef ≤1,5): kelime 001–003 5 tur, R0 6 tur, M1 kartları 8 tur (hedef tutmadı). Geri dönen türler (hata notunda Türkçe niyet, çelişen ipucu) yazar ve lex görevine eklendi.
B6 (`forms`, eşdizim, fotoğraf sorgusu; #58): 927 kartın tamamı (#81: 825, #83: 102). Okur turu B6: 13 grupta 32 tur (grup başına 2,5; hedef tutmadı). `forms` alanı boş kalan 17 kart #85'in `also_ok` alanıyla dolduruldu (#102). Sözlükte 1.119 kartta 4.334 boşluk; 47 kartta 126 boşlukta `also_ok` (#102 öncesi 4). Bahçe ipucu artık soru sırasında kapalı (#85).
Sözlüğün tamamı onaylı: taslak partiler 004–008'deki 394 girdi tam incelemeden geçti (Almanca örnekler, eşdizim, kart verisi; 8 grupta 139 kartta düzeltme, kalan 0) ve okurdan geçti. `lx:Million` B1 → A2.

## Açık PR'lar
| PR | Dal | Teslim | İnceleme |
|---|---|---|---|
| #61 | `v2/veri` | #58 A12 kalan: hata sınırı, kalıcı depolama, şema geçişi | ONAY (3. tur, kod); CI yeniden |

### Birleştirme turu (PM-007, 2026-11-17)
- `main`'e birleşti: #2 (T04), #3 (çalışma düzeni), #18 (v2_core bekleme düzeltmesi), #20 (PM tasarım dili), #16 (PM gereksinim kaydı), #19 (yığının tepesi: #4–#17'nin bütün commit'leri, merge commit ile SHA'lar korunarak), #21 (PM yol haritası).
- Kapatıldı (gerekçe PR'da: "#19 ile main'e birleşti"): #4, #5, #6, #7, #8, #9, #10, #11, #13, #14, #15, #17.
- #19 kabulü: check + WebKit iPhone 15 + iPhone 16 Pro Max yeşil (`ecf5fa0`). iPhone 15'teki uzun basma testi hedefi JS ile seçecek şekilde sağlamlaştırıldı.
- /v2/ yayını: deploy-v2 → gh-pages `v2/` (etiketler `v2-20261117-1`, `v2-20261117-2`).

## PM kanalı (D-080)
- Genel talimatlar: issue #12; PR'a özgü: PR altında `[PM]` yorumları. Her anlamlı adımda ve her birleştirmeden önce okunur; her talimata ✓/✗ yanıtı.
- Bekleme gerekirse send_later ile 60 dk'da bir #12 kontrolü.
- Son okuma: 2026-11-17 23:10 UTC.
- PM-001 ✓ (v2; v1 kalıntıları T05'te onay bekliyor) · PM-002 → R1 · PM-003/004/005 ✓ · PM-005.1 ✓ (#16 birleşti) · PM-006 sırada (#20 birleşti) · PM-007 ✓ (birleştirme turu; v1 17b kapıdan sonra yayın) · PM-008 ✓ (RQ-Ş13…Ş32) · PM-009 ✓ (RQ-S28, LS-0.4, LS-17 R6–R8, LS-17.2) · PM-010 ✓ (#21 birleşti, R1-44/45) · PM-011 ✓ (KUTUPHANE.md, YOL §2.1, R1-47…49) · PM-012 ✓ (KUTUPHANE §11–12) · PM-013 → #34 · PM-014 ✓ (4 belge, okuma listesi, R1-50…57, KAYNAKLAR §5.1) · PM-015 ✓ (KUTUPHANE §10.1, içerik sayacı; hat: Advent dilbilimcide) · PM-016 → plan R1-58…60, ilk PR (TS-5.1) hazır · PM-017 → okur tanımı + R1-61, şema PR'ı sırada · PM-018 ✓ (belgelerin güncel hâli alındı) · PM-019 ✓ (R1-62; Worker'da Gemini kapatma ayrı PR) · PM-020 ✓ (METIN_MERDIVENI.md, R1-63) · PM-021 ✓ (R2) · PM-022 ✓ (R1-64) · PM-017 eki ✓ (IFADE_ORNEK.html/png, R1-65).
- Son okuma: 2026-11-18 00:00 UTC.
- Not: YOL_HARITASI.md'deki sınav günü ve ondan türeyen R5 tarihi D-075/PM-001 gereği nötrleştirildi (yalnızca cihaz profilinde); #12'de bildirildi.

## R1 görev dökümü — "İlk telefon" (LS-17 R1; kabul: LS-16.3 simülasyonu ilk hafta senaryosunu baştan sona tamamlar + yapay zekâsız gün geçer)
| # | Görev | LS / kaynak | Durum |
|---|---|---|---|
| R1-01 | İlk ekran "İlk cümlen": doğrudan konuşma, ilk başarı ≤60 sn; giriş zorunlu değil, veri önce cihazda | LS-2.1, LS-2.2, PM-002 | yapılacak |
| R1-02 | Kısa profil tek ekran (ad, hitap, zorlanılan durumlar, günlük süre, bağlam soruları), hepsi isteğe bağlı | LS-2.1 (1:40), D-061 | kısmen (ad+hitap var) |
| R1-03 | Oyun gibi seviye tespiti ≤5 dk (3 hızda dinleme, 5 kurma, mini telefon), atlanabilir, "sınav" kelimesi yok | LS-2.1 (3:00) | yapılacak (mevcut tespit 12–15 dk) |
| R1-04 | 60 sn "kendini anlat" kaydı (yalnızca cihazda), aylık karşılaştırma | LS-2.1 (8:00), LS-16.1, H4 §9 | yapılacak |
| R1-05 | "Nasıl öğreneceksin" 3 kart + bugünün planı, ilk seans hemen | LS-2.1 (9:00–9:30) | yapılacak |
| R1-06 | Giriş/eşitleme önerisi ilk oturumdan sonra; YZ özellikleri girişe kadar YZ'siz yedekle | PM-002, LS-14.2 | yapılacak |
| R1-07 | Pilotta kullanılan kalıplar reviewed | LS-17 R1, D-063 | sürüyor (yazar 61/61 bitti; dilbilimci: pilotun 14'ü kapandı, kalan 47 inceleniyor) |
| R1-08 | İçerik: strateji 01–03, telefon 01–02, arzt 01 — yer tutucular, iki heceleme, dünyaya bağlama, reviewed | LS-2.3, H4-c, PM P1/P2 | sürüyor (01'ler dil incelemesinden geçti; 02–03 beklemede) |
| R1-09 | Kurma merdiveni 10 basamak; basamak 3–5 kalıp verisinden üretilir | LS-6.2 | kısmen |
| R1-10 | Hız turu (4 sn, kişisel rekor; yalnızca doğru üretilmiş öğeler) | LS-6.4 | yapılacak |
| R1-11 | Önce konuşma: mikrofon varsayılan, yazma isteğe bağlı | LS-6.5 | kısmen |
| R1-12 | Kulak Salonu basamak 1–2 + "sonraki cümleyi tahmin et" + sayı/saat/heceleme 2 dk akışı | LS-8.1, 8.2, 8.4 | kısmen (senaryo dinlemesi) |
| R1-13 | Bağlam modları: Masa + **Araba** (ekransız beklemeli hatırlama, sesli komutlar, otomatik ilerleme, güvenlik notu) | LS-5.5 | yapılacak |
| R1-14 | Günlük motor: 4 seans = 4 kol, "Bugün nasılsın?", etkinlik türü değişimi, ≥4 gün şablonu | LS-5.1–5.4 | yapılacak |
| R1-15 | Döngüsüzlük çekirdeği: 14 gün kuralı, aynı tip ≤2 art arda, yenilik oranı ölçümü | LS-12.3, H4-d | yapılacak |
| R1-16 | Tekrar ekranı: FSRS kuyruğu, günlük yük 12 aktif / 25 pasif, 25 dk üstünde otomatik azaltma | LS-7.3, 7.4 | yapılacak |
| R1-17 | Oyunlaştırma: XP tablosu, seri (+dondurucu), günlük 3 küçük hedef, kombo | LS-13.2, 13.5, 13.6, 13.8 | yapılacak |
| R1-18 | Gelen arama kademe 1 (yerel bildirim + tam ekran zil + arama kartı); pilot: Dr. Weber'in muayenehanesinden randevu hatırlatma | LS-9.2, H4-e | yapılacak |
| R1-19 | Gerçek konuşma öncesi (2 dk prova + arama kartı) / sonrası (hatırlananı anlat → koç) + hukuki uyarı | LS-10.5 | yapılacak |
| R1-20 | Kurtarma modu (10 dk; seri bozulmaz; 2 gün açılmazsa öneri) | LS-10.6, H4 §10 | yapılacak |
| R1-21 | Hatadan mini ders (aynı D1/D2 hatası 2 kez → ertesi gün S1'de 3 dk) | LS-10.3 | yapılacak |
| R1-22 | Yerel ölçüm: açılış, tamamlama/bırakma, ekran bazında bırakma noktası, yenilik oranı | LS-16.2 | kısmen (aşama 1–2, rol oyunu süresi) |
| R1-23 | /v2/ yayını + v1 Bugün'e "Yeni: Gerçek hayat dersleri" kartı (v1 17b, tam v1 kapısı) | H2 hızlı hat, PM-007 | sürüyor (/v2/ yayında; v1 17b PR'da) |
| R1-24 | LS-16.3 öğrenci simülasyonu (qa, bilgi kısıtlı): 6 madde, ekran görüntüleriyle | LS-16.3 | yapılacak |
| R1-25 | Kelime çeşitliliği: yanlış öğe ~4 madde sonra başka cümle + başka fotoğrafla (en çok 3 kez), sonraki oturumlarda da farklı; son 3 cümle ve son fotoğraf tekrar etmez; kart yüzleri döner (tanıma / üretme / dinleme); birim + e2e (v1 vartest eşdeğeri) | PM-003, RQ-S10, RQ-Ş07 | yapılacak |
| R1-26 | Fotoğraf: Worker /photos Pixabay → Pexels → fotoğrafsız; PIXABAY_KEY yalnızca Worker'da; kullanım şartları + atıf DECISIONS'a; somut kelime = kelimenin kendisi, soyut = cümlenin sahnesi; düşük güvende fotoğraf yok | PM-003, RQ-S11 | yapılacak |
| R1-27 | YZ dayanıklılığı: Cloudflare Workers AI ikincil sağlayıcı (yalnızca ücretsiz pay aşımında **reddettiği** doğrulanırsa; yalnızca equiv/explain/say_it); sıra kural → Gemini → (Workers AI) → YZ'siz; Profil'de "yapay zekâ durumu" satırı; iki sağlayıcı için dayanıklılık testleri | PM-004, RQ-S19, RQ-S20, LS-14 | yapılacak |
| R1-28 | iOS yerel veri kalıcılığı: gerçek iPhone'da doğrula; eşitleme + haftalık otomatik yedek; veri kaybı testi | RQ-P01, RQ-V23 | yapılacak |
| R1-29 | Mikrofon izninin tekrar sorulması (WKWebView): gerçek iPhone'da doğrula; gerekirse kabukta kalıcı izin | RQ-P02 | yapılacak |
| R1-30 | Premium Almanca ses rehberi (iOS ayarları, isteğe bağlı) + en iyi Almanca sesin otomatik seçimi | RQ-P03, RQ-V27 | yapılacak |
| R1-31 | Konuşma tanıma hatası cezasız: hoşgörülü eşleme, "Doğru söyledim", yazarak yedek | RQ-P04, RQ-V24 | kısmen ("Benim cevabım da doğru" var) |
| R1-32 | Gün sınırı 04:00 Europe/Berlin (seri, günlük hedef, Pomodoro günü) | RQ-P05 | yapılacak |
| R1-33 | Çevrimdışı: bugünün içeriği ve sesleri önceden önbellekte | RQ-P06 | yapılacak |
| R1-34 | Bildirimler: sessiz saatler, günde en çok 2 (hatırlatma + gelen arama) | RQ-P07 | yapılacak |
| R1-35 | Güncelleme yalnızca oturum aralarında uygulanır | RQ-P20 | yapılacak |
| R1-36 | Güvenli alan 59 px testi; seslendirme filtresi (noktalama okunmaz, karışık dilli satır bölünür) testi | RQ-K07, RQ-K08, RQ-V26 | kısmen (ttsClean taşındı) |
| R1-37 | Mikrofon güvenilirliği: 50 denemede ≥49; düğmeden kayda ≤300 ms; ikinci dokunuş iptal; oturum sonunda mikrofon tamamen kapalı; izin sonrası ilk kart çalışır; seviye göstergesi | PM-008 §1, RQ-Ş13 | yapılacak |
| R1-38 | Doğal ses öncelikli: ücretsiz katmanda önceden üretilmiş içerik sesleri (pilot senaryolar), cihaz sesi yedek; "yavaş" ≈0,7×; diyalogda karakter başına ayrı ses. Sağlayıcı yalnızca faturasız doğrulanırsa (PM-004 kuralı) | PM-008 §2/3/8, RQ-Ş14/15/20, LS-8.6 | yapılacak (önce sağlayıcı araştırması, DECISIONS) |
| R1-39 | Geçiş ve gösterim kuralları: doğru cevaptan sonra ses + açıklama bitmeden otomatik geçiş yok; cevap sorudan önce görünmez; duraklat/devam (1–2 sn geri sarma) | PM-008 §5/6/7, RQ-Ş17/18/19 | yapılacak |
| R1-40 | Çalışma ekranı kaydırmasız tek ekran (iPhone 15 + SE) — görsel test | PM-008 §10, RQ-Ş22 | yapılacak |
| R1-41 | DESIGN.md uygulaması (PM-006) + sayaçlar taşmaz (üst sınır/biçim testi) | PM-006, PM-008 §12, RQ-Ş24 | sıradaki |
| R1-42 | Kesintili kullanım: oturum madde düzeyinde kaydedilir, her an bırakılıp kaldığı yerden sürer | PM-008 §20, RQ-Ş32 | kısmen (bölüm düzeyi) |
| R1-43 | (PM-008 §19'un R1 parçası) haftalık özetin paylaşım menüsüyle gönderilmesi → R1-45 ile birlikte | RQ-Ş31 | yapılacak |
| R1-44 | Bugün'ün en üstünde "Bugünün adımı": bugün yapabilir hale gelinecek tek şey; gün sonunda başarıldıysa Raute dolar; 3 gün adımsızsa koç planı sadeleştirir | PM-010 §5, YOL_HARITASI §3 | yapılacak |
| R1-45 | "Haftalık özeti paylaş": tek dokunuşla kişisel bilgi içermeyen sayılar (odak dk, sesli cümle, yeni kalıcı öğe, gerçek görev, İngilizceye kaçma, takılınan ekranlar) iOS paylaşım menüsüyle | PM-010 §5, YOL_HARITASI §3 | yapılacak |
| R1-46 | R1 raporu: altı kapı (öğrenci, öğretmen, dilbilimci, test uzmanı, tüketici, CEO) için ayrı kanıt | PM-010 §3, YOL_HARITASI §1 | yapılacak |
| R1-47 | K2 üretici alıştırma motoru (yapım gereği doğru cümle; 1.000 rastgele cümlede dilbilimci hata ≤ %0,5) | PM-011, KT-1.1 | yapılacak |
| R1-48 | İçerik öğesi etiketleri: seviye / alan / gramer / bant / katman | PM-011 | yapılacak |
| R1-49 | Üretim/öğrenme oranı ölçümü (%70/%30 haftalık esnek hedef) | PM-011, KT-3.1, PM-018 | yapılacak |
| R1-50 | Öğrenci modeli (K0–K5 kanıt düzeyleri, FSRS) + hazırlık kontrolü | PM-014, BY-13, OD | yapılacak |
| R1-51 | `requires` alanı + doğrulayıcı kuralı "öğretmeden isteme" (OD-7) | PM-014, OD | yapılacak |
| R1-52 | Planlayıcı kısıtları (katı: hazırlık, güvenlik, süre, bildirim tavanı; çözümsüz plan 0) + OD-6.1 birim testi + IE-9 kuralları | PM-014, PM-018, BY-13, IE-10 | yapılacak |
| R1-53 | Flashback ve hasta modu | PM-014, BY-13 | yapılacak |
| R1-54 | `policy.json` (bütün eşiklerin tek kaynağı) | PM-014, PM-018 | yapılacak |
| R1-55 | Uçak modu: CI WebKit testi + gerçek cihaz kontrol listesi | PM-014, BY-12, TS-4.5 | yapılacak |
| R1-56 | IE-2'nin 8 öncelikli biçimi canlı: 1 sesli mesaj, 2 gelen arama, 3 posta kutusu, 5 "Haklı mıyım?", 11 kulak oyunları, 13 hız turu, 16 sesli günlük, 17 görünmez kurallar; IE-1 her alt başlıktan ≥2 metin türü | PM-014, IE-10 | yapılacak |
| R1-57 | Değerlendirici adım 1–4 ve 6 (BY) | BY-13 | yapılacak |
| R1-58 | TASARIM TS-5: 1 belirteç/bileşen + emoji/gösterge/saniye temizliği · 2 dört sekme (Bugün, Yol, Köy, Ben) · 3 önce-ses oynatıcı · 4 Köy (Bahçe, Atölye, Kafe), Telefon (sesli mesaj), Posta kutusu (ilk 3 mektup) · 5 mola, flashback, hasta modu, gelen arama kademe 1 | PM-016, TS-5 | 1 hazır (dal), 2–5 yapılacak |
| R1-59 | MIMARI MM-1 katmanları ve MM-4 kuralları CI'da; mevcut kodun taşınması | PM-016, MM | yapılacak |
| R1-60 | CI WebKit matrisine iPhone 15 Pro Max (proje sahibinin cihazı); iPhone 15 küçük ekran kontrolü | PM-016 | yapılacak (tasarım PR'ında) |
| R1-61 | Açıklama standardı OD-9: şema + doğrulayıcı + okur ajanı + 323 açıklamanın çevrimi | PM-017 | sürüyor: şema/doğrulayıcı/arayüz #39; telefon/01 çevrildi; 15 kalıp + 3 Advent okurdan geçti (#40); kalan aykırı 226 (arzt/01, strategie/01, 46 taslak kalıp) |
| R1-62 | Yapay zekâ sağlayıcı sırası (PM-019): Gemini yapılandırmayla kapalı (kod silinmez); Katman 1 cihaz modeli varsayılan sohbet partneri; Katman 2 Cloudflare Workers AI yalnızca şartlar + ücretsiz pay + ücretsiz ret doğrulanırsa (DECISIONS); Profil'de "cihaz → çevrimiçi → yapay zekâsız" | PM-019, BY-0.1 | yapılacak (doğrulama önce) |
| R1-63 | Metin merdiveni: Kolay/Orta/Zor/Acımasız (B2'de Usta), kilitli basamaklar, metin başına 4 Raute, 2–3 hafta sonra üst basamakla dönüş; işaret katmanı (MT-4), 30 soru ailesi (MT-2), asgari görev uyarısı (uzun ≥20, diyalog ≥14, kısa ≥7); posta kutusunda 3 mektup + telefonda 5 sesli mesaj merdiveniyle; Wasserzähler mektubu + 26 görev referans içerik (dilbilimci + okur) | PM-020, MT | yapılacak |
| R1-64 | "Anlamadım" / "Hata var": her ifade kartında, açıklamada, görevde; cihazda kayıt → haftalık özete; "anlamadım" alan açıklama onarılana kadar "Neden böyle?" açık; 2 kez "anlamadım" → otomatik okur kuyruğu; onarım ≤48 saat | PM-022 | yapılacak |
| R1-65 | İfade kartı açıklaması IFADE_ORNEK.png'ye göre: Alltag panelinde çipler + "Aynı anlam" + ne zaman; "Neden böyle?" alt sayfası (kelime başına tek fikir); telefon/01 ilk çevrilen içerik | PM-017 eki | yapılacak (şema PR'ı hazır) |

R2'ye (PM-021): Katman 1 eklentisi model kullanılabilirliğini ve **nedenini** ayırt eder (cihaz uygun değil / Apple Intelligence kapalı / dil uyuşmazlığı / model iniyor), nedene göre tek ekranlık Türkçe rehber gösterir, rehber hiçbir zaman engel değildir ("Şimdi değil" → Katman 0); gerçek cihaz kontrol listesine (BY-12.1b) "dil uyuşmazlığı → rehber" adımı. Cihaz bilgisi depoya/kayda yazılmaz. R2: Haber Odası ve Okuma Salonu metin merdiveniyle (PM-020).

Sonraki sürümlere (PM-014/018): R2 dallanan diyalog grafikleri, karakter hafızası, olay zamanlayıcısı + gelen kutusu, gömülü gecikmeli kontrol, hata bankası (80 desen), haftalık rapor, yerel konuşma tanıma (iOS SpeechAnalyzer → SFSpeechRecognizer; Web API son yedek) ve ses eklentileri (AVSpeechSynthesizer), **Katman 1 teknik denemesi (R2'ye alındı)**, IE-1 her alt başlıktan ≥5 tür, grup sohbeti, meslek paketleri, sınav biçimi seçimi (cihazda) · R3 Katman 1 sohbet partneri (deneme geçerse), dünya simülasyonu, kısa form yerleştirme, kişisel FSRS · R4–R5 seviye sınavı provaları, sınav geri sayımı (cihazda). Paket sesleri CI'da açık lisanslı yerel ses sentezi ile (ses başına lisans); veri Capacitor Filesystem/SQLite; boyut bütçesi. Gemini (Katman 2): AEA şartları kararı proje sahibinde — karar gelene kadar uygulama Katman 2 olmadan tam çalışacak şekilde kurulur, Worker kodu silinmez (PM-018).
| — | Advent / Weihnachtsmarkt mini senaryoları (3), R1'den bağımsız, 27.11.2026'ya kadar | LS-17.0, D-073, YOL_HARITASI §2 | hazır: dilbilimci + okur onaylı, PR #40 (#39'un üstünde) |

R2'ye işlenenler (PM-008): RQ-Ş27 dış kaynak görevleri · RQ-Ş28 evde Almanca · RQ-Ş30 geçmişi anlatma · RQ-Ş31 kart paylaşımı. R3: RQ-Ş29 iş arama/iş görüşmesi alanı (21. alan). R6–R8: PM-009 (LS-17).

### REQUIREMENTS.md → R1 eşlemesi (PM-005.4)
R1 işaretli bütün maddeler yukarıdaki görevlere bağlı. Yer almayanların gerekçesi:
- **A (RQ-S):** S01, S02, S05, S09 R1'de yalnızca ilk dilimle (R1-08, R1-12, R1-18); kalanı R2–R4. S03 mola sohbeti → R2 (kayıtta da R2). S04 → R1-08 (strateji) + R1-22 ölçüm. S06/S07/S14 → içerik standardı ve D-060 (her PR). S08 → R1-09, R1-10, LS-6.3. S10/S11 → R1-25/26. S12/S13 → R1-14 (+ek seans). S15 → R1-15. S16 → R1-13 (araba; spor R2). S17 → R1-17. S18 → R1-19. S19/S20/S21 → R1-27 + değişmez kurallar. S22 → ayar ✓ (yol R5). S24 → EK1/EK2 (her PR). S25 → R1-23, R1-28/29. S26 → R1-24. S27 → R1-04, R1-22.
- **C (RQ-Ş):** Ş01 → yumuşak bekleme + hazır içerik ✓, R1-27. Ş02 → R1-15 + WORLD. Ş03 → R1-21 (LS-10.2). Ş04 → R1-14 (tek Bugün yolu). Ş05 → aşama 5–6 ✓. Ş06 → R1-04, R1-17. Ş07 → R1-25. Ş08 → K1/K2 kartları (sürüyor). Ş09 → partner/gözlemci ✓, altın set (H3-8). Ş10 → ✓ (kural + "kontrol edilemedi" cezasız). Ş11 → R1-27. Ş12 → senaryo standardı + kalıplar (#15).
- **D (RQ-V):** R1'de V01 (Bugün ✓), V04 (araba: R1-13; spor/mutfak R2), V05 (Pomodoro ✓; 14 günlük grafik, seri, dondurucu, 100 dk kutlaması → R1-17), V06 (R1-13), V07 (hız turu R1-10), V11 (R1-09), V24 (R1-31), V25 ✓, V26 (R1-36), V27 (R1-30). Diğerleri R2+ (kayıttaki kararlarıyla): V02 koç R2, V03 B1 yolu R5, V08 "Duyduğum kelime" kısmen ✓, V09 canlı sohbet R2, V10 R1-08 ilk dilim, V12 4/3/2 → **R1'e alınmadı** (LS-17 R1 kapsamında yok; araba modunun akıcılık etkinliği beklemeli hatırlama ile başlar), V13 shadowing kısmen ✓, V14–V16 R2–R4, V17 ödev yardımcısı R2 (PM-005.6), V18 aylık ölçüm R1-04 ilk adım, V19 koç R2, V20 R2, V21 R3, V22 rozet/maskot R1-17 (kapatılabilir), V23 R1-28, V28 arşiv (sahip onayı).
- **E (RQ-P):** P01 R1-28 · P02 R1-29 · P03 R1-30 · P04 R1-31 · P05 R1-32 · P06 R1-33 · P07 R1-34 · P08 R1-04 (+R2 koç) · P09 R1-13 (araba) · P11 R1-12 · P13 R1-19 · P14 R1-20 + R1-17 · P15 otomatik koyu tema ✓, yatmadan önce modu R2 · P16 R1-13 (ekran kapalıyken ses; pil ölçümü gerçek cihazda) · P17 ✓ (EK2 §1) · P20 R1-35. P10, P12, P18 R2; P19 her sürüm (dilbilimci).

## Çalışan ajanlar
- dilbilimci: Advent mini senaryoları (çalışma ağacı `v2/advent-mini`), OD-9 açıklama kuralıyla.
- Durdurulanlar (proje sahibi): kalıp incelemesi (61/61 işaretli, son rapor yok → 47'si onay bekliyor) ve #8–#19 bağımsız incelemesi. Proje sahibi açıkça istemedikçe yeniden başlatılmaz.

## Bekleyenler (depo dışında)
- YAZAR'ın strategie/telefon/arzt 02–04 dosyaları `/home/claude/hold/` altında (D-063: kalıplar incelenene kadar). Oturum kapanırsa kaybolabilir; yeniden üretilebilir.
- T05 listesi (`/home/claude/private/T05_LISTE.md`) proje sahibinin onayını bekliyor.

## LS durum tablosu (yapılacak / sürüyor / bitti / ertelendi)
| LS | Konu | Durum | Not |
|---|---|---|---|
| 0.1–0.3 | Kuzey yıldızı, ölçütler, anti-hedefler | sürüyor | ölçütlerin ölçümü LS-16 ile |
| 2.1 | İlk açılış, ilk 10 dk | yapılacak | R1; bugünkü ilk kurulum form tabanlı (LS-2.1'e aykırı) → yeniden yapılacak |
| 2.2 | İlk başarı ≤60 sn | yapılacak | R1 |
| 2.3 | İlk hafta seti | sürüyor | strateji/telefon/arzt 01 var (taslak); mola sohbeti, hikâye 1, gerçek görev yok |
| 2.4 | İlk hafta sonu ölçütü | yapılacak | R1 simülasyonu |
| 3.1 | 7 bileşen ayrı ölçüm | yapılacak | şu an yalnızca A (dinleme) ve B (kurma) kısmen |
| 4.1–4.2 | Türkçe konuşana özel notlar | sürüyor | mistakes_tr var; ipucu kartları, artikel oyunu, telaffuz yok |
| 5.1 | 4 seans = 4 kol | yapılacak | planlayıcının seans → etkinlik eşlemesi basit |
| 5.2–5.3 | Etkinlik değişimi, 4 gün şablonu | yapılacak | H4 §4 ile |
| 5.4 | "Bugün nasılsın?" seçimi | yapılacak | |
| 5.5 | Bağlam modları | yapılacak | R1: Masa + Araba; R2: spor, toplu taşıma |
| 5.6 | Sesli drama | yapılacak | R2 |
| 5.7 | Kurs senkronu | yapılacak | |
| 6.1 | Birim ifade/kalıp | bitti | D-050 ifade kartları |
| 6.2 | Kurma merdiveni 10 basamak | sürüyor | aşama 3–6 var; basamak 3–5 ve 8 kalıp verisine bağlı (kalıplar yazılıyor) |
| 6.3 | "Almanca nasıl derim?" | sürüyor | yerel + say_it_de var; 3 katmanlı cevap (kalıp + başka sözle) eksik |
| 6.4 | Hız turu | yapılacak | R1 |
| 6.5 | Önce konuşma, yazma isteğe bağlı | sürüyor | mikrofon her alanda; varsayılan hâlâ yazma alanı |
| 6.6 | ≥80 üretim, ≥%50 sesli | sürüyor | ≥80 doğrulayıcıda; %50 sesli kuralı yok |
| 7.1–7.2 | Kelime seçimi, aile, bileşik ayırıcı | sürüyor | aile ✓ (ifade kartı); bileşik ayırıcı yok |
| 7.3 | Pasif/aktif FSRS | bitti | srs.ts; kalıcılık kuralı |
| 7.4 | Günlük yük 12/25, otomatik azaltma | yapılacak | tekrar ekranı yok |
| 7.5 | "Duyduğum kelime" | sürüyor | dokun → listeye ✓; 5 sn ekleme ekranı ve öncelik yok |
| 7.6 | "Şunları anlayabilirsin" | yapılacak | |
| 8.1–8.5 | Kulak Salonu | sürüyor | senaryo dinlemesi var; basamaklı salon, tahmin sorusu, yutulan ses dersleri, sayı/saat akışı yok |
| 9.1 | Destekli → bağımsız | bitti | partner/gözlemci ayrımı, 4 destek düzeyi |
| 9.2 | Gelen arama | yapılacak | R1 kademe 1 |
| 9.3 | Mola sohbeti | yapılacak | R2 |
| 9.4 | 4/3/2 monoloğu | yapılacak | |
| 9.5 | Telaffuz öncelikleri | yapılacak | temel shadowing var |
| 9.6 | Benim cümlelerim | yapılacak | R2 |
| 10.1–10.4 | Koç, düzeltme önceliği, mini ders, haftalık | yapılacak | rapor en çok 3 düzeltme ✓ (feedback_tr) |
| 10.5 | Gerçek konuşma öncesi/sonrası | yapılacak | R1 |
| 10.6 | Kurtarma modu | yapılacak | R1 |
| 11.1–11.3 | Görev merdiveni, telefon maruz kalma, günlük | yapılacak | senaryolarda dış görev (mission) var |
| 12.1 | Başarı bandı %80–85 | sürüyor | %70 kapısı + %50 geri dönüş var; bant ayarı yok |
| 12.2 | Aşama geçişleri | bitti | BLUEPRINT §9 |
| 12.3 | Döngüsüzlük | yapılacak | H4-d |
| 12.4 | Planlayıcı girdileri | yapılacak | |
| 13.1–13.9 | Oyunlaştırma | yapılacak | R1: XP, seri, 3 günlük hedef |
| 14.1–14.2 | YZ içerik uydurmaz; YZ'siz ders | bitti | yapay zekâsız mod her ekranda |
| 14.3 | Gizlilik | bitti | D-061: ad gitmez, yalnızca hitap |
| 14.4 | Kota %80 önceliklendirme | yapılacak | |
| 15.1–15.2 | B1 yolu | ertelendi | R5 |
| 16.1–16.2 | Öğrenme/deneyim ölçütleri | sürüyor | aşama 1–2 süresi ve rol oyunu süresi (p50/p95) ölçülüyor |
| 16.3 | Öğrenci simülasyonu | yapılacak | qa ajanı, her sürümde |
| 16.4 | PR'larda LS kimlikleri | sürüyor | #9'dan itibaren |
| 17.0 | Advent / Weihnachtsmarkt (27.11.2026) | yapılacak | D-073: yalnızca incelenmiş kalıplarla |
| 17.1 | Takvim gerçekçiliği | sürüyor | |

## H3 teslimleri (PEDAGOGY §10)
| # | Teslim | Durum |
|---|---|---|
| 1 | PEDAGOGY / CONTENT_PLAN | PEDAGOGY ✓ · CONTENT_PLAN ✗ |
| 2 | Şema ve doğrulayıcı | ✓ |
| 3 | Sıklık listesi / kapsam raporu | sıklık ✓ · kapsam raporu ✗ (B1 referans PDF'i bekleniyor) |
| 4 | Kalıplar | sürüyor (P0) |
| 5 | K1 kelime | 800/1.000 (taslak) |
| 6 | Pilot senaryolar | 3/11 depoda (taslak), 8'i beklemede |
| 7 | Oynatıcı | kısmen |
| 8 | YZ katmanı | kısmen (altın setler yok) |

## Ölçümler
- JS ≈157 KB gzip (bütçe 250) · birim testleri 88/88 · içerik 0 hata
- WebKit (CI, #7): iPhone 15 ✓, iPhone 16 Pro Max ✓
- Rol oyunu p50/p95: gerçek model yok (Worker anahtarı bekleniyor); istemci ölçümü hazır

## Açık sorular (proje sahibi)
- Cloudflare + secret'lar (adımlar `docs/v2/CLOUDFLARE_TELEFON.md`; Gemini anahtarında faturalandırma kontrolü eklendi)
- B1 referans listesi PDF'i (depoya girmez)
- LEX: kaba kelime 809 · lx:Deutsch/deutsch
- T05 onayı

## Sıradaki adım
1. H4-b: WORLD.md (karakterler, 26 hafta, takvim) → PR.
2. Kalıplar biter bitmez dilbilimci (önce pilotun 14'ü) → H4-c: 01'lere yer tutucu, iki heceleme biçimi, dünyaya bağlama → dilbilimci.
3. LS-17.0 Advent mini senaryoları (2–3), 27.11'e kadar yayında.
4. H3 kontrol noktası raporu (durmadan) → R1 görev dökümü (LS kimlikleriyle) ve uygulama.
