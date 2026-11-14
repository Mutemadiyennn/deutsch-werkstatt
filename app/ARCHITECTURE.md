# Deutsch-Werkstatt — mimari ve çalışma düzeni

## Katmanlar
| Klasör | Ne | Kural |
|---|---|---|
| `legacy.html` | Kurs öncesi uygulama (tek dosya, ~10k satır) | Sadece küçük hata düzeltmeleri; her biri `CHANGES_LEGACY.md`'ye yazılır. Yeni özellik buraya eklenmez. |
| `src/js/NN-*.js` | Yeni modüller (sırayla birleştirilir) | Her dosyanın tek sorumluluğu var. Eski fonksiyonları sarmalarken `const _x = x; x = function(){…}` deseni ve dosya başında açıklama. |
| `src/css/NN-*.css` | Modül stilleri | Tema değişkenleri (`--card`, `--ink`…) kullanılır, sabit renk sadece anlamlı yerlerde. |
| `content/kurs/` | Kurs içeriği (veri) | `SCHEMA.md`'ye uyar; `validate.py` 0 hata olmadan yayına girmez; `release.txt`'te olmayan ünite yayına girmez. |
| `tests/` | Playwright uçtan uca testler | `bash tests/run_all.sh` yayından önce yeşil olmalı. |
| `build.py` | legacy + modüller → `dist/index.html`, içerik indeksi, sözdizimi kontrolü | `python3 build.py --ver YYYY-MM-DDx [--deploy]` |

## Modüller
- `00-tts-clean.js` — seslendirme filtresi (işaretler okunmaz) ve karışık dil satırlarını bölme
- `20-kurs.js` — kurs: veri yükleme, cevap karşılaştırma, SRS, basamaklar (kelimeler/kural/dinleme/okuma/oyunlar/yazma/rol oyunu/sınav), yol haritası
- `30-livefix.js` — canlı sohbette yan kanal düzeltme
- `40-kurs-session.js` — günlük oturumun kursla çalışması, eller serbest kurs
- `45-kurs-today.js` — "Bugün" listesi = kurs; yapay zekâya bağlı eski günlük görevler listeden çıkarıldı
- `50-ai-context.js` — yapay zekâ bağlamı: kişisel ayrıntı yok, odak = ünite
- `90-whatsnew.js` — sürüm notu

## İçerik üretim hattı
1. Yazar ajan (`content/kurs/AGENT_BRIEF.md`) → `units/<id>.json`, `validate.py` 0 hata
2. Bağımsız dilbilimci ajan (`REVIEW_BRIEF.md`) → düzeltmeler, `validate.py` 0 hata
3. Baş geliştirici → `release.txt`'e ekler → `build.py` → testler → yayın

## Öğretim ilkeleri (kurs motoru)
- Önce öğret, sonra sor; her ünitenin can-do hedefi var.
- Kelime "kalıcı" = Türkçesinden Almancasını iki ayrı oturumda (≥3 saat arayla) kendin üret. Sınav kapısı bunu şart koşar.
- Yanlış yapılan kural farklı cümle ve farklı alıştırma tipiyle geri gelir; sınavda önceki ünitelerden sorular vardır.
- Yapay zekâ akışı asla bloklamaz: rol oyunu ve yazma yapay zekâ yoksa hazır içerikle sürer.
