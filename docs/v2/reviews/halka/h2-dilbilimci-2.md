# 2. hafta dilbilimci tam turu, 2. parça: 12.–14. gün

Tarih: 2026-11-23 · İnceleyen: dilbilimci-ajan · Bağ: İÇ-7, dal `content/a1-h2`

Kapsam: `content/v2/m1/gun-12.json`, `gun-13.json`, `gun-14.json`, `hafta-sonu-testi-02.json`, `gorulmemis-02.json`, `dn-02.json` içinde yalnız `dn:kisaltma-1`, `registry/grammar.json` içinde `gr:a1-01:t1`, `gr:a1-02:t1`, `gr:a1-06:t1`, `gr:a1-12:t2`. 8.–11. günün dosyalarına ve `dn:kucuk-sozcukler` girdisine dokunulmadı.

Bakılan: Almanca doğruluk ve söylenirlik, Türkçe çeviri ve açıklamalar (OD-9), dil noktası metinleri ve tabloları, kabul listeleri, dikte kabul biçimi, hafta sonu testinin karışımı, görülmemiş durumlar, `{name}` kuralı ve adsız biçimler (B7), WORLD uyumu.

## Özet

| Dosya | İncelenen öğe | Hata (düzeltildi) | Kabul listesi genişletilen madde |
|---|---:|---:|---:|
| gun-12 | 117 | 5 | 12 |
| gun-13 | 115 | 9 | 9 |
| gun-14 | 120 | 4 | 8 |
| hafta-sonu-testi-02 | 12 | 2 | 6 |
| gorulmemis-02 | 7 | 2 | 3 |
| dn:kisaltma-1 | 1 | 1 | – |
| grammar (4 konu) | 4 | 4 | – |
| **Toplam** | **376** | **27** | **38** |

Hata oranı: 27 / 376 = %7,2 (kabul listesi genişletmeleri ayrı sayıldı; onlarla 65 / 376 = %17).
Öğe sayımı: görev cümlesi, kalıp, sahne satırı, ses satırı, soru, dikte, görsel, prova düğümü ve seçeneği, okuma, sınav maddesi.

Son ölçüm (`KT="12 13 14" kos.sh … --yarim --gun 12 --gun 13 --gun 14`): validate 0 hata (uyarı 148 → 145; üç B7 uyarısı kapandı) · dikiş ihlal 0 · kt eksik 0 · küçük sözcük 0 hata. Bütün hafta (8–14) birlikte koşuldu: aynı sonuç.

## 12. gün

| # | Yer | Önce → sonra | Gerekçe |
|---|---|---|---|
| 1 | h1, `lx:zu#2` „Vier Uhr ist zu spät.“ (tr) | „Saat dört çok geç.“ → „Saat dört fazla geç.“ | Kartın öğrettiği ayrım **zu** fazla, **sehr** çok. Aynı günde öteki cümleler „fazla erken“ diyor. |
| 2 | h1, `lx:so` „… aber nicht so früh.“ (tr) | „ama o kadar erken değil“ → „ama o kadar erken olmasın“ | Türkçesi istek cümlesi değildi. |
| 3 | prova n3, kabul | „Mein Nachname ist {name}, bitte.“ → „Mein Name ist {name}.“ | Ad söylerken sona **bitte** gelmez; söylenmeyen cümle. |
| 4 | prova, kapanış | „saati değiştirdin“ → „saati konuştun“ | Öğrenci „Ja, das geht“ dalını seçerse saat değişmiyor. |
| 5 | B7 adsız biçimler | yok → ses a1 cevapla, prova n1/n1b/n3 (4 seçenek), okuma metni | 15 alanda `{name}` vardı, adsız biçim yoktu (8.–11. gün ve 1. haftada var). Geri bildirimler iki biçime de uyacak şekilde yeniden yazıldı. n3 adsız: „Moment, bitte.“ |

Kabul listesi eklenenler: h1 üç cümle (nicht zu früh, zu teuer, gern schwimmen gehen), ses a1 cevapla, prova n1, sınav s5–s11 (çoğu **gerne** ve yer değiştirme; s8 **Wie geht's Ihnen**; s10 **Gut, und dir?**).

Doğru bulunup bırakılanlar: **Um acht geht.**, **Haben wir … offen** (güneyde gündelik), **Servus** (WORLD §5 kaynaklı, yalnız Tobi ile Derya arasında), **Auf Wiederhören**, Derya'nın siparişi (pazartesi sekiz) 14. günün mesajıyla tutarlı.

## 13. gün

| # | Yer | Önce → sonra | Gerekçe |
|---|---|---|---|
| 1 | okuma metni | „Das erste Mal ist frei.“ → „Das erste Mal kostet nichts.“ | **frei** ücretsiz anlamında yalnız kalıp sözlerde kullanılır (Eintritt frei). Cümle çeviri kokuyordu. Yeni cümle bilinen sözcüklerle. |
| 2 | prova durumu ve n1 | Ioana telefonda arıyor ve numaranı soruyor → Stadtplatz'ta karşılaşma; „Hallo! Na, wie geht's?“ | Arayan kişi numarayı zaten biliyor. Ayrıca WORLD'de Ioana yavaş konuşur; „hızlı konuşuyor“ → „rahat konuşuyor“. |
| 3 | prova n2 | „Du, der Kurs ist am Montag nicht. … Weißt du das?“ → „Du, am Montag ist kein Kurs. … Weißt du das schon?“ | İlk cümle Almancada söylenmez; sesli mesajdaki doğru biçimle eşitlendi. |
| 4 | prova n4, kabul | „Nein, nicht.“ → „Nein, ich komme nicht.“ | Almanca değil. |
| 5 | ses a1 c4 (tr) | „Bunu zaten biliyor musun?“ → „Bunu biliyor muydun?“ | Doğal Türkçe. |
| 6 | h1 „Dieses Mal geh ich schwimmen.“ (tr) | „Bu sefer ben yüzmeye gidiyorum.“ → „Bu sefer yüzmeye gidiyorum.“ | Almancada vurgu yok; **ben** fazlaydı. |
| 7 | yazma örneği | „Das ist mein erstes Mal.“ → „Ich komme zum ersten Mal.“ | **erstes** biçimi öğretilmedi; günün kalıbı **zum ersten Mal**. Eski cümle kabul kalıplarında duruyor, üç kalıp eklendi. |
| 8 | sınav s1, s7 açıklama | „**der Kurs** alan isimde …“ → „**der** alan isimde **mein** dersin: **mein Kurs**.“ (s7 aynı) | Cümle bozuktu. |
| 9 | B7 adsız biçim | okuma metni | 2 alan. |

Kabul listesi eklenenler: „Weißt du meine Nummer?“ için **Hast du …** ve **Kennst du …** (en yaygın söyleyişler; haksız ret riski), „Ich weiß deine Nummer leider nicht.“ ve „Wissen Sie die Adresse …“ için aynı; ses a1 cevapla; sınav s5, s6, s7, s10.

Dil noktası kontrolü: **mein/meine, dein/deine** bütün örneklerde doğru (der Kurs, die Karte, die Nummer). Kısa biçimli her kabul listesinde uzun biçim de var.

## 14. gün

| # | Yer | Önce → sonra | Gerekçe |
|---|---|---|---|
| 1 | prova n2, 3. seçenek „Nein, danke. Das ist alles.“ | uygun, n4'e gider → uygun değil, n2'de kalır | Pasta alınsa da alınmasa da toplam „sieben Euro achtzig“ çıkıyordu. Durum pastayı da istiyor; geri bildirim: „Cümle doğru. Ama bugün pasta da alacaktın.“ |
| 2 | sınav s7 açıklama, yazma kontrol | „çoğulda“, „Çoğulu“ → „Birden çok …“ | 11. günün dersi bu terimi kullanmıyor (OD-9.2 md. 3). |
| 3 | ses a2 cevapla | ilk söyleyiş yalnız „Ich hätte gern heute einen Termin.“ → **… einen Termin für heute**, **… heute gern einen Termin** eklendi | En doğal iki sıra listede yoktu. Açıklama adsız biçime de uyuyor. |
| 4 | B7 adsız biçim | ses a2 cevapla | 1 alan. |

Kabul listesi eklenenler: h1 üç cümle (**Frau Brandl hört nicht mehr so gut**, **Kannst du mir mal … geben?**, **gerne**), sınav s5, s6 (**Ich glaube schon**), s8, s11.

## Hafta sonu testi 02

Karışım: dinleme 4 (t01, t04, t07, t11), kurma 5 (order 2, gap 2, transform 1), konuşma 3 (t06, t09, t12); sıra karışık. Kural karşılanıyor. İstenen sözcüklerin hepsi 1.–14. günde (**Apfel** 4. gün).

| # | Yer | Önce → sonra | Gerekçe |
|---|---|---|---|
| 1 | t02 açıklama | „**gern** hemen arkasından gelir“ → „**hätten** ikinci yerde durur: **Wir hätten gern** …“ | Maddenin kendi kabulü „Die Rechnung hätten wir gern.“ bu kuralı bozuyordu. |
| 2 | t06 kabul | „Guten Tag, Frau Huber! Ich hätte gern einen Termin.“ → adlı biçim | Görev „kendini tanıt“ diyor; adsız cevap kabul ediliyordu. |

Kabul eklenenler: t01, t04, t06, t09, t11, t12.

## Görülmemiş durumlar 02

Yedi durumun hepsi derste geçmeyen yer ya da kişi (gar büfesi, firma mutfağı, kuaför telefonu, şefle hazırlık, kuaförde ödeme, ofiste kart, Noel pazarı standı); hepsi kendi cümlesini kurduruyor. g7 WORLD 2. haftasıyla (Weihnachtsmarkt) örtüşüyor.

| # | Yer | Önce → sonra | Gerekçe |
|---|---|---|---|
| 1 | g4 açıklama | „isim çoğul olur“ → „isim değişir“ | Terim. |
| 2 | g6 durum | „Derya hızlı konuşuyor“ → „Derya'nın acelesi var, kısa biçimlerle konuşuyor“ | WORLD'de Derya'nın hızı doğal. |

Kabul eklenenler: g5 (**Ich möchte zahlen**: kuaförde en doğal söyleyiş), g6, g7.

## dn:kisaltma-1

Metin ve tablo doğru: **hab, komm, geh, geht's, 'n, 'ne** gerçek konuşma biçimleri; „yazarken uzun biçim“ uyarısı yerinde.

| # | Önce → sonra | Gerekçe |
|---|---|---|
| 1 | sütun başlığı „konuşmada (haben, kommen, gehen, es, ein)“ → „konuşmada“ | Parantez öğrenciye anlamsız; ölçümde de işe yaramıyor (başlıksız koşu aynı: eksik 0). |

## grammar.json (4 konu)

| # | Konu | Önce → sonra | Gerekçe |
|---|---|---|---|
| 1 | gr:a1-01:t1 | „Almancada iki siz vardır. Tanımadığın büyüklere …“ → „Almancada da sen ve siz ayrıdır. Tanımadığın yetişkinlere …“ | **du** siz değildir; cümle yanlıştı. |
| 2 | gr:a1-02:t1 | „**Sie** dediğin kişiye **Ihr** ya da **Ihre** dersin“ → „**Sie** dediğin kişide sizin demek için **Ihr** ya da **Ihre** dersin“ | Eski cümle kişiye **Ihr** diye hitap edilir gibi okunuyordu. |
| 3 | gr:a1-12:t2 | „**gern** hep **hätte** sözcüğünün arkasından gelir.“ → „**gern** yerine **gerne** de diyebilirsin, ikisi aynıdır.“ | Kural yanlış: aynı günün cümlesi „Dann hätte ich gern …“. Yeni cümle kabul listelerindeki **gerne** biçimini açıklıyor. |
| 4 | gr:a1-06:t1 tablo | başlık „Nominativ (özne) / Akkusativ (nesne)“, satırlar „eril (der) …“ → „Das ist … / Ich hätte gern …“, „der, die, das, die (birden çok)“ | Metin terimsiz yazılmış ama tablo dört öğretilmemiş terim gösteriyordu (OD-9.2 md. 3). Biçimler (den, einen, keinen) aynı; çerçeve ölçümü değişmedi. |

Öteki değişiklikler (başlıklar, **einen/keinen/den** kuralı, **Was hätten Sie gern?**) doğru.

## Kalan notlar (hata değil; karar baş geliştiricide)

1. `gr:a1-06:t1` tablo satırları ve örnekleri **Film, Zeitung, Buch, Garten** ile; bu hafta öğretilmedi. **Kuchen, Semmel, Brot** ile yenilenirse öğrenci tabloyu tek okumada anlar.
2. Dikte „zor/usta“ maddelerinin bir kısmı satırın yalnız bir cümlesini yazdırıyor (ör. 12. gün v1 d3). Doğrulayıcı buna izin veriyor; oynatıcı bütün satırı çalıyorsa öğrenci fazladan sözcük yazabilir.
3. 12. gün prova n4: **Tschüss** uygun değil sayılıyor. Bavyera'da muayenehaneye de söylenir; öğretim sadeleştirmesi olarak bırakıldı.
4. 14. gün: video (pasta 12,50 ve 4 euro), kapıdaki not (pasta 10 euro, ekmek 3,20) ve provadaki fiyatlar birbirini tutmuyor. Her parça kendi içinde tutarlı.
5. 13. gün: Ioana sesli mesaj bırakıyor (numaran onda), provada numaranı soruyor. Prova yüz yüze yapıldı ama iki parça arasında küçük bir çelişki kalıyor.
6. Hafta sonu testi t06 ve görülmemiş g3'te `{name}` var, adsız biçim yok. Doğrulayıcı bu dosyalara bakmıyor; 1. haftanın testi de böyle.
7. Görülmemiş durum 7 tane (görev 3–5 diyordu, PM her can_do için bir durum istiyor). Dil açısından hepsi kullanılabilir.
8. „Ich hätte gern einen Kurs.“ ve „Sie hätten gern einen Termin.“ (ses a1 c2) doğru ama biraz kitabi; öğretilen sözcüklerle daha doğalı kurulamadı.

## Sonuç

**KAPANDI.** Üç gün dosyasında `review` alanı 1. haftadaki gibi `draft` + `by: dilbilimci-ajan` yazıldı; okur (OD-9) ve örneklem kontrolünden sonra `reviewed` olur.
