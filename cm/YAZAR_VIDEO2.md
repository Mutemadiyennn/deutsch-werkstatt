# Yazar görevi: gerçek video dosyaları, ikinci tur (#58 A9)

Rolün `yazar`. Çalışma kopyası `/home/claude/wt-m1`, yazma yolu yalnızca `content/v2/m1/video/`. git çalıştırma. Dosya biçimi: `/home/claude/cm/YAZAR_VIDEO.md`. Türkçe kuralları: `/home/claude/cm/OKUR_DERSLERI.md`.

**Artık bütün transkriptler elinde.** Web kullanma. Araç (`/home/claude/cm`):
- `python3 dib.py goster KLIP` Almanca turları numarasıyla gösterir
- `python3 dib.py olc KLIP GUN BAS SON [haric,turlar]` süre tahmini ve bilinmeyenler
- `python3 dib.py ara kelime`
- `python3 vcheck.py` bütün dosyaları kaynağa karşı denetler (`basi`, kesit, numara)

Transkript cümlelerini dosyalara, rapora ve son mesaja **kopyalama**. Yalnızca tur numarası, en çok 4 kelimelik `basi`.

## Klip kararı
| Gün | Klip | Kesit | Not |
|---|---|---|---|
| 1 | `01_18_int_ek_who` (Eva) | 1–5 | ad ve nereli. `durum: hazir` |
| 2 | `01_24_int_ju_studies-home` | olduğu gibi | yalnızca aşağıdaki düzeltme |
| 3 | `01_22_int_hb_who` (Harald) | 1–14, hariç 9–10 | yaş ve sayı. Şimdiki gün 6 dosyasından taşı |
| 4 | `01_18_int_ek_who` (Eva) | 5–6 ve 13–16 (`haric` 7–12) | yaş ve sayı; 1–4 gün 1'de |
| 5 | `03_27_int_ju_morgenmensch` ya da `03_24_int_bg_morgenmensch`, `03_03_int_bg_typischertag`, `07_12_int_ju_schlafen` | `olc` ile en iyisi | saat geçmeli |
| 6 | `05_25_int_ju_geburtstag` ya da `05_26_int_ek_geburtstag` | `olc` ile en iyisi | soru kelimeleri ve ay; tam doğum tarihi `haric` |
| 7 | `01_26_int_ph_who` (Peter) | olduğu gibi | |

Ölçüt: ön öğretim (en çok 6) sonrası bilinmeyen ≤ %10. Süre 30–90 sn. 25–30 sn arası klip kabul edilir, `durum: "kisa"` yazılır. Telefon, adres, tam doğum tarihi `haric`.

## Yap
- Gün 1, 3, 4, 5, 6 dosyalarını gerçek metne göre yeniden yaz: `turlar`, `on_ogretim`, `ortam_tr`, `bolum` (sorular, dikte, gölge, `cevapla`). Gün 2 ve 7'de soruları gerçek metne karşı doğrula, yanlışsa düzelt.
- Dikte yalnızca kısa, net, **öğretilmiş ya da ön öğretilmiş kelimeli** turlardan. Konuşma dili yazımı garip olan turu (`hab`, `nen`) dikteye koyma. Türkçe sorular metinde gerçekten söylenene dayansın.
- `cevapla`: yaş sorma (sayı yuvası yok). Ad ya da öğretilmiş sabit cevap. `accepted` ≥ 3.
- `basi` içinde soyad olmasın: gerekirse kısa tut.
- Konuşmacı etiketi (`Interviewer:`, `Eva:`) metinde vardır; `basi` onu içermez. `kim` alanı `soran` ya da `konusmaci`.
- `review.status` hepsinde `draft`. `bilinmeyen`, `kesit_sure_tahmin_sn` alanlarını ben dolduracağım, sen doldurma.

Değiştirdiğin Türkçe alanları düşünme: ben dosyadan toplayacağım. Bitince `python3 vcheck.py` temiz olmalı. Son mesaj: gün başına tek satır (klip, kesit, süre, ön öğretim sonrası oran, durum).
