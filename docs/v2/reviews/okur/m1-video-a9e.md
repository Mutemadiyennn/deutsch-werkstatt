# Okur kontrolü (OD-9.3): m1-video-a9e

Girdi: `a9e.txt` (27 satır; video öncesi öğretilen kısa ifadeler, sorular ve bir görev yönergesi). Her satır tek tek okundu.

## GERİ satırları

| alan | kendi sözlerimle | neden |
|---|---|---|
| `video-02.on_ogretim[4].tr` ("vardım, vardın") | "Ben oradaydım, sen oradaydın" mı, yoksa "bir yere ulaştım, ulaştın" mı? Emin olamadım. | İki fikir var: Türkçe kelime tek başına iki ayrı anlama okunuyor. Tek okumada hangisi olduğunu anlamadım. |
| `video-05.on_ogretim[5].tr` ("gecede") | "Gece vakti" mi, yoksa "her gece için şu kadar" mı? Emin olamadım. | İki fikir var: tek kelime "gece içinde" diye de "bir gece başına" diye de okunuyor. |

## Sonuç

- Toplam: 27
- GEÇTİ: 25
- GERİ: 2

GERİ kimlikleri:
- `video-02.on_ogretim[4].tr`
- `video-05.on_ogretim[5].tr`

Not (GEÇTİ, sınırda): `video-01.on_ogretim[3].tr` ve `video-02.on_ogretim[1].tr` ("oturuyorum") ilk anda sandalyede oturmak gibi de okunabiliyor, ama bir yerde yaşamak anlamı hemen akla geldi. `video-06.on_ogretim[1].tr` ("yanında arkadaşlar") Türkçesi biraz tuhaf duruyor ama ne demek istediği anlaşılıyor.

Bu dosyada GERİ olduğu için "reviewed" sayılamaz (OD-9.4).
