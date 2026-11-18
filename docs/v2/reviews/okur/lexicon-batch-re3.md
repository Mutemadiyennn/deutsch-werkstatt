# Okur raporu: lexicon-batch-re3 (OD-9.3)

Girdi: `batch-re3.view.jsonl` (2 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. İki kartta da `parcalar` boş.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:stehen | hepsi | Ayakta durmak, yazı için de steht | GEÇTİ | |
| lx:sein#2 | tr | onun | GEÇTİ | |
| lx:sein#2 | anlam_tr | Bir şey bir erkeğinse bunu derim | GEÇTİ | |
| lx:sein#2 | ne_zaman_tr | Çocuk için de aynı kelime | GEÇTİ | |
| lx:sein#2 | ipucu_tr | Sonraki kelimeye göre sonu değişiyor | GEÇTİ | |
| lx:sein#2 | mistakes_tr[0] | Anna kadın, onda başka kelime | GEÇTİ | |
| lx:sein#2 | mistakes_tr[1] | mit'ten sonra hep seinem derim | GERİ | anladığım şey gerçek kullanımla örtüşmüyor: aynı kartın ilk örneğinde **mit seiner Familie** yazıyor. Kutuyu okuyunca "mit'ten sonra her zaman seinem" diye anladım, örneği görünce kafam karıştı. |

## Sonuç

- Toplam alan: 10
- GEÇTİ: 9
- GERİ: 1
- GERİ kimlikleri: `lx:sein#2` (mistakes_tr[1])

Bu partide GERİ bulunduğu için dosya "reviewed" sayılamaz (OD-9.4).
