# Okur kontrolü: lexicon-batch-re4 (OD-9.3)

Girdi: `batch-re4.view.jsonl` (5 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Hepsi tek tek okundu.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:mögen#2 | hepsi (6 alan) | Kibarca bir şey isterken söylerim | GEÇTİ | |
| lx:leid | tr, anlam_tr, ne_zaman_tr, parcalar (2), mistakes_tr (2) | Üzgünüm ya da özür dilerim derken | GEÇTİ | |
| lx:leid | ipucu_tr | Büyük harfli başka bir kelime acı demekmiş | GERİ | Ekrandaki ifadeyi değil başka bir kelimeyi anlatıyor. Bu ifadeyi söylerken bana ne yardımı olduğunu anlamadım. |
| lx:selbst | hepsi (5 alan) | İşi başkası değil, kendim yaptım | GEÇTİ | |
| lx:sein#2 | hepsi (5 alan) | Bir erkeğin olan şey için söylenir | GEÇTİ | |
| lx:denn#2 | hepsi (5 alan) | Çünkü demek, daha çok yazıda | GEÇTİ | |

## Sonuç

- Toplam alan: 29
- GEÇTİ: 28
- GERİ: 1
- GERİ kimlikleri: `lx:leid` (ipucu_tr)

Bu partide bir GERİ olduğu için parti "reviewed" sayılamaz (OD-9.4).
