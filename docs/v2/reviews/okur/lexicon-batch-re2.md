# Okur raporu: lexicon-batch-re2 (OD-9.3)

Girdi: `batch-re2.view.jsonl` (6 kart). Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`. Bütün kartlarda `parcalar` boş.

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:sein#2 | tr | onun | GEÇTİ | |
| lx:sein#2 | anlam_tr | Bir şey bir erkeğinse bunu derim | GEÇTİ | |
| lx:sein#2 | ne_zaman_tr | Çocuk için de aynı kelime | GEÇTİ | |
| lx:sein#2 | ipucu_tr | Sonraki kelimeye göre sonu değişiyor | GEÇTİ | |
| lx:sein#2 | mistakes_tr[0] | Anna kadın, onda başka kelime | GEÇTİ | |
| lx:sein#2 | mistakes_tr[1] | Burada seinem olacakmış, nedenini bilmiyorum | GERİ | anlamadım: neden **seinem** olduğu yazmıyor. İpucu "arkasındaki kelimeye göre değişir" diyor, arkadaki kelime aynı kaldığı hâlde biçim değişmiş, kafam karıştı. |
| lx:stehen | tr | durmak, yazılı olmak, yakışmak | GEÇTİ | |
| lx:stehen | anlam_tr | Ya ayakta durmak ya yazılı olmak | GERİ | iki fikir var: tek kutuda iki ayrı anlam "ya da" ile bağlanmış. Ayrıca arabanın "ayakta" durması bana tuhaf geldi. |
| lx:stehen | ipucu_tr | Durdum derken habe, güneyde bin | GEÇTİ | |
| lx:stehen | mistakes_tr[0] | Burada yazıyor derken steht denir | GEÇTİ | |
| lx:Vater | hepsi | Baba demek, seslenirken Papa | GEÇTİ | |
| lx:richtig | hepsi | Doğru demek, bazen epey demek | GEÇTİ | |
| lx:Mutter | hepsi | Anne demek, seslenirken Mama | GEÇTİ | |
| lx:nett | hepsi | Kibar insan için, teşekkürde söylenir | GEÇTİ | |

## Sonuç

- Toplam alan: 27
- GEÇTİ: 25
- GERİ: 2
- GERİ kimlikleri: `lx:sein#2` (mistakes_tr[1]), `lx:stehen` (anlam_tr)

Bu partide GERİ bulunduğu için dosya "reviewed" sayılamaz (OD-9.4).
