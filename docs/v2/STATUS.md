# STATUS — Deutsch Werkstatt 2.0

Son güncelleme: 2026-11-17 · Faz: **H3 kontrol noktası → R1** · Ana dal: `main` (`1852bf4`)
Yeni oturum: `CLAUDE.md` → `LEARNING_SYSTEM.md` → `LEARNER.md` → bu dosya → `DECISIONS.md`. "Sıradaki adım"dan devam et.

## Açık PR'lar (yığın, alttan üste; D-041: kabul = tepedeki PR'ın WebKit CI'ı, yığın tek seferde birleşir)
| PR | Dal | Teslim | CI |
|---|---|---|---|
| #2 | `v2/t04` | H2-c: v1 taşınabilir derleme + 17a (yayında), ayrı | ✓ |
| #3 | `v2/calisma-duzeni` | Çalışma düzeni (CLAUDE.md, ajanlar, phases, STATUS, DECISIONS, etiket + geri alma) | ✓ |
| #4 | `v2/h3-1-4` | H3 1–4: PEDAGOGY, şema, doğrulayıcı, sıklık, kalıp iskeleti | ara katman |
| #5 | `v2/h3-5-lex` | H3 5: K1 kartları 001–008 (taslak) | ara katman |
| #6 | `v2/h3-6-pilot01` | H3 6: strategie/telefon/arzt 01 + dilbilimci incelemesi | ara katman |
| #7 | `v2/h3-7-oynatici` | H3 7 + EK1 + EK2 + inceleme düzeltmeleri | ✓ WebKit iPhone 15 + 16 Pro Max |
| #8 | `v2/asama-1-2` | D-050 aşama 1–2 yeniden tasarım | koşuyor |
| #9 | `v2/h4-a-ogrenci` | H4-a: LEARNER.md, CLAUDE.md, PM kararları | — |
| #10 | `v2/pm-kimlik-kurallar` | PM P1/P2: kimlik yer tutucuları, kalıp kapısı, accepted ≥3, hızlar | — |
| #11 | `v2/ls-belge` | Faz R a–c: LEARNING_SYSTEM.md, CLAUDE.md okuma listesi, bu tablo | — |

Bağımsız inceleme (inceleme ajanı) #2–#7'ye yorum yazdı. #4 ve #7 bulguları düzeltildi: PEDAGOGY'deki kurum adı; rol oyunu sınırları, destek düzeyi, "Benim cevabım da doğru", bitir/geç yanıt, ≥44 pt, WebKit yarışı.

## Çalışan ajanlar
- yazar: 61 kalıbı H3 §3 standardına getiriyor (önce pilotun 14 kalıbı) → sonra dilbilimci.

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
