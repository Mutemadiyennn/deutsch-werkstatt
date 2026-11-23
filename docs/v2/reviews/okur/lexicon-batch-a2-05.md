# Okur raporu: lexicon-batch-a2-05 (OD-9.3)

- Girdi: `content/v2/registry/lexicon/batch-a2-05.json`, 26 kart (istasyon anonsu, dolaylı soru, açık mı sorma, denemek ve alışkanlık). Dilbilimci turundan sonraki hâli okundu.
- Okunan alanlar: başlık `tr`, `collocations[].tr`, `mistakes_tr`, `examples[].tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[]`, `exp.ipucu_tr`, `forms[].tr`, `forms[].hint_tr`.
- Toplam **688 alan**. Hepsi tek tek okundu, örneklem yok.
- Okur: yalnız Türkçe bilen, Almancası A2, dilbilgisi terimi bilmeyen öğrenci gözüyle.
- Özellikle bakılanlar (geçen turların geri dönüş türleri):
  - aynı Türkçe sözün kart içinde farklı Almanca biçim vermesi;
  - kişi eşleşmesi;
  - terim;
  - üç nokta;
  - cümleyle örtüşmeyen ipucu;
  - kartın kelimesini içermeyen hata notu;
  - genel kural gibi okunup kartla çelişen ipucu;
  - yanlışla doğru arasında açıklanmayan ikinci fark;
  - 14 kelimeden uzun cümle.
- Tarama sonucu: hiçbir Türkçe alanda **=**, **;**, üç nokta, tırnak ya da dilbilgisi terimi yok. 14 kelimeyi aşan cümle yok.

## GERİ satırları

Yok.

## Kart özeti (her kartın anlamını kendi sözlerimle)

| kart | alan sayısı | GERİ | `anlam_tr`, kendi sözlerimle |
|---|---|---|---|
| `lx:Achtung` | 26 | 0 | Dikkat; önemli bir şeyden önce söylenir. |
| `lx:abfahren` | 28 | 0 | Trenin ya da otobüsün kalkıp gitmesi. |
| `lx:einfahren` | 28 | 0 | Trenin gara, perona girip durması. |
| `lx:Richtung` | 26 | 0 | Giderken tuttuğum yön. |
| `lx:Fahrgast` | 26 | 0 | Otobüste ya da trende giden kişi: yolcu. |
| `lx:Ausstieg` | 25 | 0 | Trenden, otobüsten inmek ve inilen kapı. |
| `lx:Bauarbeiten` | 28 | 0 | Yolda, binada ya da hatta yapılan çalışmalar. |
| `lx:Vorsicht` | 26 | 0 | Bir tehlikeye karşı dikkatli olmak. |
| `lx:Linie` | 26 | 0 | Otobüsün ya da tramvayın numaralı hattı. |
| `lx:Hauptbahnhof` | 28 | 0 | Şehrin en büyük, en önemli garı. |
| `lx:Zentrum` | 26 | 0 | Şehrin ortası, dükkânların ve meydanın olduğu yer. |
| `lx:Öffnungszeiten` | 26 | 0 | Dükkânın ya da dairenin açık olduğu saatler. |
| `lx:aufhaben` | 28 | 0 | Dükkânın, dairenin açık olması. |
| `lx:Notdienst` | 27 | 0 | Eczanenin ya da doktorun gece ve tatilde de açık olması: nöbet. |
| `lx:Mittagspause` | 26 | 0 | Öğle saatlerinde verilen ara. |
| `lx:durchgehend` | 25 | 0 | Ara vermeden, kesintisiz. |
| `lx:Ruhetag` | 27 | 0 | Dükkânın ya da lokantanın her hafta kapalı olduğu gün. |
| `lx:nachschauen` | 26 | 0 | Bir bilgiyi öğrenmek için bakıp kontrol etmek. |
| `lx:unsicher` | 26 | 0 | Bir şeyden emin olmamak ya da kendine güvenmemek. |
| `lx:sparen` | 26 | 0 | Parayı harcamayıp biriktirmek, az kullanmak. |
| `lx:probieren` | 26 | 0 | Bir şeyi denemek ya da yemeğin tadına bakmak. |
| `lx:planen` | 26 | 0 | Bir şeyi önceden düşünüp hazırlamak. |
| `lx:rauchen` | 26 | 0 | Sigara içmek. |
| `lx:Süßigkeit` | 26 | 0 | Şeker, çikolata gibi tatlı atıştırmalıklar. |
| `lx:Gewohnheit` | 26 | 0 | Hep aynı şekilde, düşünmeden yaptığım şey: alışkanlık. |
| `lx:Regenschirm` | 28 | 0 | Yağmurda başımın üstünde tuttuğum şemsiye. |

Bütün alanları tek okumada anladım ve anladığım şey Almancasıyla örtüştü. Karar değiştirmeyen notlar:
- Kartlar arasında: `lx:Achtung.forms[4]` "Dikkat, lütfen buradan binmeyin" için başa **Achtung** koyuyor. `lx:Vorsicht.forms[1]` ise neredeyse aynı Türkçe ("Dikkat, lütfen artık binmeyin") için başa **Vorsicht** koyuyor. `lx:Vorsicht.exp.ipucu_tr` farkı söylüyor (tehlike varsa **Vorsicht**). İki kart yan yana çalışılırsa öğrenci duraksayabilir. Kart içi çelişki değil.
- `lx:Richtung.exp.ipucu_tr` "**nach** gelmez" diyor. Aynı kartta "Landshut'a" için **Nach Landshut** var. İpucu açıkça "Münih yönüne derken" diye sınırlandığı için çelişki saymadım.
- `lx:Kontostand.mistakes_tr[0]` İngilizce **Balance** kelimesini anıyor. Yanlış arkadaş uyarısı olduğu için kurala uygun (D-060). İngilizce bilmeden de anlaşılıyor.
- Türkçe olmayan, kapsam dışı bir gözlem: `lx:abfahren`, `lx:einfahren` ve `lx:aufhaben` iki boşluklu cevaplarında üç nokta var (**fährt … ab** gibi). Önceki partilerde düşülen notla aynı.

## Sayılar

- Toplam: 688
- GEÇTİ: 688
- GERİ: 0

GERİ yok. Okur kapısı (OD-9.3) açısından batch-a2-05 "reviewed" olabilir.
