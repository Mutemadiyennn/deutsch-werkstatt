# Okur raporu: lexicon-batch-re8 (OD-9.3)

Girdi: `/home/claude/cm/work/batch-re8.view.jsonl` (11 kart)

Okunan alanlar: `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr[]`

| kart | alan | kendi sözlerimle | karar | neden |
|---|---|---|---|---|
| lx:fünf | hepsi | Beş demek; fiyatta, saatte, sürede kullanılır. | GEÇTİ | |
| lx:vier | hepsi | Dört demek; zu viert dört kişi birlikte. | GEÇTİ | |
| lx:zehn | hepsi | On demek; um zehn saat onda. | GEÇTİ | |
| lx:sechs | hepsi | Altı demek; okunuşu zeks gibi. | GEÇTİ | |
| lx:halb | hepsi | Yarım demek; halb neun sekiz buçuk. | GEÇTİ | |
| lx:acht | hepsi | Sekiz demek; um acht saat sekizde. | GEÇTİ | |
| lx:sieben | hepsi | Yedi demek; um sieben saat yedide. | GEÇTİ | |
| lx:Angebot | hepsi | Mağazadaki indirimli ürün; ustanın fiyatı da teklif. | GEÇTİ | |
| lx:Störung | tr, anlam_tr, ne_zaman_tr, ipucu_tr | Cihaz ya da hat arızası; rahatsızlık da. | GEÇTİ | |
| lx:Störung | mistakes_tr[0] | Üstelik arıza var derken... sandım, sonra döndüm. | GERİ | Anlamadım: cümle başındaki "Hatta" önce "üstelik" diye okunuyor, telefon hattı olduğu tek okumada çıkmıyor. |
| lx:Zahnarzt | hepsi | Diş doktoru; kadınsa Zahnärztin denir. | GEÇTİ | |
| lx:Attest | hepsi | Doktorun sağlık durumu için verdiği belge. | GEÇTİ | |

## Sonuç

- Toplam alan: 63
- GEÇTİ: 62
- GERİ: 1
- GERİ kimlikleri: `lx:Störung` (`mistakes_tr[0]`)

Bu partide GERİ olduğu için dosya "reviewed" sayılamaz (OD-9.4).
