# Dilbilimci incelemesi: temel ders r0-11 "Sonu kişiye göre değişir: heiße, heißt"

Tarih: 20.11.2026 · İnceleyen: dilbilimci-ajan · Dosya: `content/v2/temel/r0-11-praesens.json` (M1 2. gün, `gun-02.json` `dersler`)

Madde tanımı (R0 raporlarıyla aynı): öğretim öğesi + alıştırma + yerleştirme maddesi + diyalog satırı + dinleme parçası.

## Özet

| İncelenen madde | İçerik düzeltmesi | accepted eksiği (madde) | Toplam düzeltme |
|---|---|---|---|
| 59 (12 öğe + 32 alıştırma + 5 yerleştirme + 8 diyalog satırı + 2 dinleme) | 11 | 9 | 20 |

Hata oranı: 20/59 = 0,34 (accepted eksikleri dahil). Yalnızca içerik: 11/59 = 0,19 (dördü madde dışı üst alan: başlık, hedef, can_do, tablo başlığı).
Almanca dilbilgisi hatası, yanlış `accepted` varyantı, sabit öğrenci adı ya da cinsiyeti, yanıltıcı `parcalar`, İngilizce köprü, kaynaksız Bairisch bulunmadı. Tablo (okur turundan sonra 5 satır × 6 sütun) doğru; **du heißt** doğru. `npm run content:validate`: 0 hata.

## İçerik düzeltmeleri (önce → sonra)

| # | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|
| 1 | `title_tr` | Fiilin sonu kişiye göre değişir | Sonu kişiye göre değişir: heiße, heißt | Okur kuralı: **fiil** terim sayılır; örnekle göster. |
| 2 | `goal_tr` | Ben, sen, o, biz ve siz için doğru biçimi seçip söylemek. | Ben, sen, o, biz ve siz derken kelimenin sonunu doğru söylemek. | "doğru biçim" neyin biçimi olduğunu söylemiyordu. |
| 3 | `can_do.tr` | … ne zaman geldiğimi söyler … | … ne zaman geleceğimi söyler … | **Ich komme morgen** gelecek bir gelişi anlatır. |
| 4 | `a:kommst-du` ipucu | Soru sorarken **Kommst** cümlenin başına gelir. | Bu soruda **Kommst** başa gelir. | Kesin kural gibi okunuyordu; aynı dersteki **Wie heißt du?** ile çelişir. |
| 5 | `d15` why_tr | Soruda **Wohnst** başa gelir. | Bu soruda **Wohnst** başa gelir. | 4 ile aynı. |
| 6 | `table.baslik_tr` | Kim söylüyor? Sonu ona göre: … | Kim yapıyor? Sonu ona göre değişir: … | Sonu belirleyen konuşan değil, işi yapan kişidir (**Frau Brandl wohnt**). |
| 7 | `d01` soru | Birinci günün videosunda Berna adını söylüyor. Hangisini duydun? | Berna tanışırken adını söylüyor. Hangisi doğru? | Klip `gun-01.json`'a bağlı değil (aşağıda açık madde 1); soru videoyu izlememiş öğrenci için de cevaplanabilir olmalı. |
| 8 | diyalog, satır 7–8 | Herr Wimmer kommt morgen. / Er kommt morgen? | Herr Wimmer kommt heute. / Er kommt heute? | WORLD hafta 1: ilk iş günü Herr Wimmer oradadır ve **Sie** der; "yarın geliyor" bununla çelişiyordu. Çeviriler de güncellendi. |
| 9 | `h1` başlık ve ana fikir sorusu | … muayenehaneyi arıyor / neden arıyor? | … muayenehaneye telefon ediyor / neden telefon ediyor? | Okur kuralı: **aramak** çift okunur. |
| 10 | `h2` sorular | Ana fikir cevabı: Çarşamba günü birlikte alıştırma yapmak için · Ayrıntı: bugün kursa geliyor mu? | Ana fikir cevabı: Bugün gelmeyeceğini, çarşamba günü geleceğini söylemek için · Ayrıntı: Ioana kursa ne zaman geliyor? (çarşamba günü) | Eski ana fikir cevabı öğretilmemiş **Wollen wir zusammen üben?** cümlesine dayanıyordu. Yeni cevaplar yalnızca **heute**, **nicht**, **komme**, **am Mittwoch** ile bulunur. Cümle metinde Ioana'nın WORLD sözü olarak kaldı. |
| 11 | `h2` son satır | Tschüss! | Tschüs! | Yazım tutarlılığı: temel ve M1 içeriğinde **Tschüs**. |

## accepted eksikleri (haksız ret riski)

Hepsi ekleme; hiçbir varyant silinmedi, ilk cevaplar değişmedi.

- `d10` (boşluk **Derya ___ aus Wendlfing.**): **ist**. Boşluk yazılarak dolduruluyor ve **Derya ist aus Wendlfing.** aynı anlamda doğru Almanca.
- `d21`: **Wie ist Ihr Name?**
- `d22`: **Wohnst du auch hier?**, **Tobi, wohnst du hier?**
- `d25`: **Tobi, gehst du morgen in die Praxis?**
- `d26`: **Hallo Tobi, ich bin {name}.**, **Hallo, ich bin {name}.**
- `d27`: **Grüß Gott, ja, ich wohne hier.**, **Guten Tag, ja, ich wohne hier.** (öğrenci selama karşılık verirse reddedilmesin)
- `d28`, `p05`: **Ja, ich komme.**
- `d29`: **Ich komme morgen.**, **Nein, ich komme erst morgen.**

## Öğretmeden isteme denetimi

- Bütün üretim maddelerinin ilk cevabı yalnızca şu kaynaklardan: bu dersin öğeleri ve tablosu, 1.–2. gün kartları, r0-01 ve r0-02 öğeleri (**hier**, **am Samstag**, **nicht**, **heute**, **morgen**, **Freitag**). **gehst** yalnızca tabloda öğretiliyor (`d25`); görev tanımı tablo biçimlerini sayıyor.
- **aus** 1.–2. günde yok; bu derste `b:derya-kommt` öğesinin Türkçesiyle ("Derya Wendlfing'li.") veriliyor; `parcalar` okur turunda boşaltıldı. Öğrenciden kendi yeri için **Ich komme aus …** istenmiyor.
- **Mein Name ist {name}.**, **Ich bin {name}.**, **Wie ist Ihr Name?**, **erst**, **auch**: yalnızca `accepted` içinde, hiçbir örnekte ya da ilk cevapta değil. Bu varyantlar kabul listesinde kalmalı (doğru cevap reddedilmesin); uygulama "görülmüş" sayımını `accepted` listesinden değil `teach` ve tablodan yapmalı.
- Dinleme metinlerinde kalan öğretilmemiş kelimeler (**Kurs**, **auch**, **Wollen wir zusammen üben**, **Nur Deutsch**, **Tschüs**, **Grüß Gott**, **Gut**, **das ist**): hiçbir sorunun cevabı bunlara dayanmıyor; hepsi Türkçe satırıyla veriliyor.

## Dünya ve gerçeklik

- Frau Brandl ve Derya **wohnt hier / kommt aus Wendlfing**: WORLD ile örtüşüyor (alt kat komşusu; burada doğup büyümüş). Tobi ilk gün **du** diyor, Frau Huber **Sie** ve kendi açılış cümlesi: örtüşüyor. Ioana'nın **Nur Deutsch!** ve **Wollen wir zusammen üben?** sözleri WORLD'deki sık ifadeleri.
- `h1` muayenehanesi Dr. Weber, sekreter Frau Huber (WORLD §7). Arayan öğrenci değil, tek seferlik hasta.
- **Grüß Gott**: WORLD §5'te kaynaklı; başka Bairisch yok.

## Kalan açık maddeler (baş geliştiriciye)

1. **1. gün klibi bağlı değil.** `content/v2/m1/video/klip-01.json` `durum: "kisa"` ve `gun-01.json`'da `video` alanı yok (doğrulayıcı uyarısı: gerçek insan videosu yok). `a:ich-heisse` öğesindeki "ilk günün videosundaki Berna gibi" sözü klip yayına girerse doğru; girmezse bu yarım cümle silinmeli. `d01` klipten bağımsız hâle getirildi. **Kapandı (inceleme #141 P1-1):** yarım cümle silindi, `ne_zaman_tr` artık "Tanışırken."
2. **Emre Aydın** (`h1`): tek seferlik hasta, Wendlfing'de oturuyor, Dr. Weber'in muayenehanesine telefon ediyor. `GENEL_ADLAR.md` dilbilimcinin yazma yolunda değil; Elif Yılmaz gibi tek satırla eklenmesi önerilir ("yalnızca telefonda kendini tanıtan ses; başka bilgi yazma").
3. `d30` hızı `fast` (Tobi'nin WORLD hızı). A1 ikinci gün için sert olabilir; üç kelimelik soru olduğu için bırakıldı, karar baş geliştiricide.
4. Okur turu bekliyor; girdi: `/home/claude/cm/work/praesens-re.txt` (193 satır).

## Sonuç

Dil hataları: **KAPANDI**. Açık madde 1 ve okur turu kapandı; `review.status` `reviewed`.

## Okur turları
- 1. tur: 193 satır, 11 GERİ (çift okunan "evinin", "bir gün"; tabloda öğretilmemiş "onlar" satırı; iki açıklama cümlesi; görev cümlesi 16 kelime). Düzeltildi: tablo 5 satır, `parcalar` boşaltıldı, açıklamalar "<Türkçe> derken **…** denir." kalıbında.
- 2. tur: 10 satır, 1 GERİ (d06). 3. tur: 1/1 GEÇTİ.
- Ek: d30 hızı `fast` → `normal` (2. gün).

## İnceleme #141, 1. tur sonrası
- P1-2: `d17` kabul listesinden yalnız ad ("{name}.") çıkarıldı; **heiße** üretilmeden geçilmiyor.
- P2-4: tek başına "Ja." artık hiçbir maddede yok (`d27`, `d30`'dan çıkarıldı); amaç fiili söyletmek.
- P2-6: `d16` açıklaması artık dersin konusuna bağlı: "Gidiyorum derken **ich gehe** denir, **ich** ile sonu **-e** olur." (iki dizilim de kabul; okur ilk öneriyi geri çevirdi, ikincisini geçirdi).
- P2-1: `h2` dinlemesinde öğretilmemiş kelimeler azaldı ("Wollen wir zusammen üben? Nur Deutsch!" satırı çıktı; "in den Kurs" ve "auch" kalktı).
- P2-3: `d21` Türkçesi "Adınız ne?" (öğeyle aynı; hatırlama turu "Wie ist Ihr Name?" kabul eder), açıklama "Adınız ne derken **Wie heißen Sie?**, adın ne derken **Wie heißt du?** denir."
- P2-5: `d22`, `d26`, `d29`, `d31` eksik doğru biçimler eklendi.
- P2-7: yeni `d33` boşluğu "Tobi ___ in die Praxis." → geht (er/sie biçimi artık derste çalışılıyor).
- Okur: yeni ve değişen Türkçe satırlar 3 turda okundu (2 GERİ → 1 → 0).
- P2-2: yeni `d34` (Türkçe → Almanca, "Adamın adı Tobi."); hatırlama turu artık "Sein Name ist Tobi.", "Der Mann heißt Tobi." gibi eşdeğerleri kabul ediyor. Açıklaması d33 ile aynı kalıpta, okurdan geçmiş.
