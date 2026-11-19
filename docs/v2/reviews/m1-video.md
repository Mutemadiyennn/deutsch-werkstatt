# Dil incelemesi: M1 gerçek video dosyaları

- Dosyalar: `content/v2/m1/video/gun-02.json` … `gun-07.json` (gun-01 `bulunamadi`, incelenmedi)
- İnceleyen: dilbilimci-ajan · 2026-11-19
- Transkript denetimi: 6 klibin 6'sı `vidt.php` Almanca sekmesinden okundu (6 çağrı). Sayfa başlığı altısında da dosyadaki klip ve konuşmacıyla aynı. Doğrulanamayan klip yok.
- İncelenen madde: 96 (gün başına ön öğretim, ana fikir, ayrıntı, dikte, gölge, cevapla, ortam, kanıt). Düzeltilen madde: 33. Oran 0,34.
- `npm run content:validate` 0 hata (59 uyarı, hepsi bu dosyaların dışında). Doğrulayıcı video dosyalarını ayrıca denetlemiyor; altı dosya JSON olarak ayrışıyor.
- **Sonuç: AÇIK.** Dosyalardaki dil hataları kapandı. Aşağıdaki açık maddeler baş geliştiricinin kararını bekliyor.

## Gün başına karar

| Gün | Klip | Tur ve `basi` | Sorular klibe uyuyor mu | Özel bilgi | Karar |
|---|---|---|---|---|---|
| 2 | Jan, Studium & Wohnen | 8 tur, hepsi uyuyor | evet (5/5) | yok | düzeltildi, uygun |
| 3 | Adan, Wer bin ich? | 1–8 uyuyor | evet (4/4) | kesit telefon turlarından önce bitiyor | düzeltildi, uygun; kesit kısa (yaklaşık 26 sn) |
| 4 | Eva, Wer bin ich? | 10 tur uyuyor | evet (5/5) | 7–12 hariç: tam gün ve telefon dışarıda; 6. turda yalnızca ay kalıyor | düzeltildi, uygun |
| 5 | Jan, uyku | 2 tur uyuyor | evet (5/5) | yok | düzeltildi, uygun; kesit çok kısa (yaklaşık 15 sn) |
| 6 | Harald, Wer bin ich? | 12 tur uyuyor | evet (5/5) | 9–10 hariç: telefon dışarıda | düzeltildi, uygun |
| 7 | Peter, Wer bin ich? | 10 tur uyuyor | evet (4/4) | 7–10 hariç: telefon dışarıda | düzeltildi, uygun |

## Düzeltmeler

### Gün 2
1. `on_ogretim` **zwar** → **und zwar**, `tam olarak`. Tek başına **zwar** başka anlam taşır; klipte ikili geçiyor. Karşılıkta iki anlam vardı.
2. `on_ogretim` **angekommen** `varmış, gelmiş` → `bir yere gelmiş`. `varmış` iki türlü okunuyor.
3. `on_ogretim` **gelebt** `yaşamış` → `bir yerde yaşamış`.
4. d5 `accepted`: `Das ist im August.` çıkarıldı (geçmiş bir olay için doğal değil). `Er ist im August gekommen.` ve `Jan ist im August gekommen.` eklendi.
5. Dikte: kolay ve orta aynı turdu (4), zor ve usta aynı turdu (7). Şimdi 3, 4, 7, 5. Dördü de kısa, bilinen ya da ön öğretilmiş kelimelerle.
6. `cevapla.accepted`: `Ich wohne hier in Berlin.` eklendi.
7. Yazım: `Amerikaya` → `Amerika'ya` (4 yer), `Berlinde` → `Berlin'de`. Depodaki diğer gün dosyaları kesme işareti kullanıyor.

### Gün 3
1. `on_ogretim` **heißen**: `**heiße** adım` yanlış eşleme. Yeni: `bir adı olmak. **Ich heiße Anna** adım Anna demektir.`
2. `on_ogretim` **aus**: tarif yerine karşılık ve örnek: `bir yerden. **aus München** Münih'ten demektir.`
3. Dikte d4: tur 4 → tur 7. Tur 4 İngilizce yer adı ve Almancalaşmış eyalet adı yazdırıyordu; öğrenci için haksız.
4. d5 `accepted`: `Ungefähr 20 Minuten.` eklendi.
5. `cevapla.accepted`: `Mein Name ist {name}.` eklendi (doğru cevap reddedilmesin).
6. Yazım: `Kaliforniyadaki` → `Kaliforniya'daki`.

### Gün 4
1. `on_ogretim` **heißt**: `adı olmak` yanlış biçim. Yeni: `adın. **Wie heißt du?** adın ne demektir.`
2. Dikte sırası: kolay basamakta uzun bileşik kelimeli tur (14), ortada üç kelimelik tur (1) vardı. Şimdi 1, 5, 14, 16.
3. d5 `accepted`: `Eva ist 24.`, `24 Jahre alt.` eklendi.
4. `cevapla.accepted`: kısa cevaplar eklendi (`30 Jahre alt.`, `Dreißig Jahre alt.`, `30.`, `Dreißig.`).

### Gün 5
1. **aufstehen** hiçbir günde öğretilmiyor, ama ayrıntı 2 ve d5 buna dayanıyordu; d5 örnekleri bu kelimeyi ürettiriyordu. `on_ogretim` içinde **Moment** çıkarıldı, **aufstehen** eklendi (sınır 6). **Moment** bilinmeyen listesine geçti, oran 0 → 0,036.
2. Ayrıntı 4 `why_tr`: artık öğretilmeyen bekleme sözü çıkarıldı.
3. Ayrıntı 2 `why_tr`: `sonraki saatle söylenir` belirsizdi. Yeni: `**halb acht** sekize yarım saat var demektir. Bu yüzden cevap 7.30.`
4. d5 `accepted`: `Halb acht.` eklendi.
5. `cevapla.accepted`: `Ich schlafe 8 Stunden.`, `Ich schlafe ungefähr acht Stunden.`, `Ich schlafe jede Nacht acht Stunden.` eklendi.

### Gün 6
1. `cevapla` gün 3 ile birebir aynıydı (aynı soru, aynı cevap). Soru turu 1 → 3. Öğrenci nereli olduğunu söylüyor: `Ich komme aus Istanbul.` ve üç eşdeğeri. Altıncı günün soru kelimesi konusuna da uyuyor.
2. Ayrıntı 2 `why_tr`: klipteki **um die fünfzig** öğretilmemiş bir söyleyiş. Açıklamaya anlamı eklendi: `elli civarı`.
3. d5 `accepted`: `Er ist aus München.`, `Harald kommt ursprünglich aus München.`, `Aus München.` eklendi.

### Gün 7
1. `ortam_tr` Peter'in nereli olduğunu söylüyordu; ayrıntı 1 tam bunu soruyor. Cevap ortamdan çıkarıldı.
2. **Schweiz** hiçbir günde öğretilmiyor, ama ayrıntı 1 ve d5 (`aus der Schweiz` yazdırıyor) buna dayanıyordu. `on_ogretim` içinde **Farbe** çıkarıldı (**Lieblingsfarbe** zaten var), **die Schweiz** eklendi. **Farbe** bilinmeyen listesine geçti, oran 0,045 → 0,071.
3. d5 `accepted`: `Er ist aus der Schweiz.`, `Peter kommt ursprünglich aus der Schweiz.`, `Aus der Schweiz.` eklendi.
4. Yazım: `Teksasta`, `İsviçrede`, `Viyanada` kesme işaretiyle yazıldı.

## Açık maddeler

1. **Süre:** gün 3 (yaklaşık 26 sn) ve gün 5 (yaklaşık 15 sn) 30 sn alt sınırının altında, `durum: "kisa"`. Gün 5'te kesit uzatılamaz: sonraki iki turda bilinmeyen kelime çok. Gün 3'te sonraki turlar telefon numarası.
2. **Konu uyumu:** gün 4'te fiyat, gün 6'da tarih, gün 7'de randevu klipte yok (yazar `kanit` içinde açıkça yazmış). Gün 4, 6 ve 7 aynı soru dizisinin üç konuşmacısı. Dil hatası değil; içerik çeşitliliği kararı.
3. **Gün 3 d5 `zorunlu`:** yalnızca `Minuten`. Sayı iki biçimde yazılabildiği için (yazıyla, rakamla) tek zorunlu parça olarak eklenemedi. Motor `zorunlu` tek başına yeterli sayıyorsa yanlış sayı da geçer; `accepted` ile birlikte denetlenmeli.
4. **Gün 5 dikte:** iki basamak da tur 1. Bu turda **schlafe** kelimesinin öğretilmemiş bir biçimi geçiyor. Ön öğretim sınırı dolu olduğu için eklenmedi; kolay basamakta kelime gösteriliyorsa sorun yok.
5. **Gün 7 yazım:** kaynak transkript 3. ve 4. turda İsviçre yazımı kullanıyor (çift s). `basi` kaynağa uyduğu için dokunulmadı. Bu turlar dikteye konmamış, doğru. Hizalanan metin ekranda gösterilecekse öğrenci derste öğrendiği yazımdan farklısını görür.
6. **Gün 3 konuşmacı:** Almanca öğrenen biri. Kesitteki turlarda dil hatası yok (hatalı tur kesit dışında). Gölge ve dikte yalnızca soran kişinin turlarında ve kısa turlarda.
7. **Bilinmeyen oranları** yeniden sayılmadı; yalnızca değişen iki günde güncellendi. Gün 6'da 6. ve 14. turlarda listede olmayan birkaç kelime daha var (ülke adının iki biçimi gibi); özel ad sayılırsa oran geçerli.
