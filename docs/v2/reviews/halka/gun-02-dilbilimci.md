# 2. gün halkaları: dilbilimci incelemesi (PM-078 B)

Dosya: `docs/v2/reviews/halka/gun-02-halkalar.json` · Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan (yazardan bağımsız, son metin bir kez, PM-057)

İncelenen: **80 madde** (50 görev cümlesi ve kabul listeleri, 16 sahne satırı, 5 soru, 9 kalıp).
Denetim (düzeltmelerden sonra): `halka_kontrol.py` → **0 hata, 0 not**; `kucuk_sozcuk.py` → **0 hata**. Yeni sözcük eklenmedi.

## Bulgular ve düzeltmeler

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | h3 `lx:Oktober` görev cümlesi (de) | **Im Oktober** özne olamaz; öznesiz **geht** yalnızca gevşek konuşmada duyulur. 1. günün kararıyla aynı (bulgu 1: gün adı özne olur, zarf ve edatlı öbek olmaz): yapboz ve dikte cümlesinde tam biçim. **es**'siz biçim kabul listesinde kaldı. | „Im Oktober geht, aber nicht am Montag.“ → „Im Oktober geht es, aber nicht am Montag.“ |
| 2 | h4 `lx:Sommer` görev cümlesi (de) | Aynı sorun. | „Im Sommer geht nicht, Herr Wimmer.“ → „Im Sommer geht es nicht, Herr Wimmer.“ (kabul: + „Herr Wimmer, im Sommer geht es nicht.“, „Im Sommer geht nicht, Herr Wimmer.“) |
| 3 | h4 `lx:Herbst` kabul listesi, 2. öğe | Aynı sorun, kabul öğesinde. | „Im Herbst? Im Oktober geht, im November nicht.“ → „Im Herbst? Im Oktober geht es, im November nicht.“ |
| 4 | h5 `lx:Anfang` kabul listesi, 3. öğe | **Ende oder Anfang Juli?** Almancada söylenmez (sıra hep **Anfang – Ende**); doldurma öğesiydi. Yerine gerçekten söylenen kısa biçim kondu. | „Ende oder Anfang Juli?“ → „Anfang Juli oder Ende?“ |
| 5 | h2 kalıbı „Alles Gute zum Geburtstag!“ (tr) | Kalıp yalnızca „günün“ diyordu; aynı halkanın sahnesinde aynı Almanca „gününüz“ diye çevriliyor. Almanca sen/siz ayırmıyor; kalıp ikisini de göstermeli. | „Doğum günün kutlu olsun!“ → „Doğum günün (gününüz) kutlu olsun!“ |

Ağırlık: 1–3 dilbilgisi (aynı tür), 4 doğal olmayan kabul öğesi, 5 Türkçe tutarlılık.

## Yazarın açık soruları: dil açısından görüş

- **„am … – im …“ kalıbı (h1).** Doğru ve yerinde: **am** + gün, **im** + ay ve mevsim. Türkçe konuşanın tipik hatası tam da bu ikisini karıştırmak ve **in Mai** demek. İki not: (a) **am** yalnızca güne ait değil: **am Wochenende** (h3, h5) ve 3. günde **am Anfang** da var. Kalıbın Türkçesi „… günü“ gün adı için doğru; **am Wochenende** 1. günden bütün olarak biliniyor, çelişki yok. (b) **Anfang/Ende** + ay edatsız (**Anfang August**); dosya bunu her yerde doğru kullanıyor, **im Anfang August** gibi bir kabul öğesi yok.
- **„Im August habe ich Urlaub“ sırası (PM sorusu 2).** Öğretilmeli. Bu, gündelik konuşmada **Ich habe im August Urlaub** kadar sık; ayrıca Türkçe cümle zamanla başladığı için („Ağustosta iznim var“) öğrencinin ilk kuracağı sıra bu olur ve **Im August ich habe …** hatası buradan çıkar. Şu an beş görev cümlesinin (2. günde dört, 3. günde bir) kabul listesi bu doğru cevabı reddediyor: **haksız ret riski**. Ben ekleyemedim: betik „habe ich“ dizisini bilinmeyen sayıyor (denendi: `('bicim','habe')` hatası). Öneri: h4 kalıbı „Ich habe … – … habe ich … – Haben Sie …?“ olsun, sonra şu öğeler eklensin: „Im Frühling habe ich Geburtstag.“, „Heute habe ich Geburtstag!“, „Am Montag habe ich Urlaub. …“, „Anfang August habe ich Urlaub.“ (3. gün: „Vierzehn Tage habe ich Urlaub.“ gerekmez).
- **„Im August ist geschlossen.“ ve „Wann ist geschlossen?“** Kalabilir. Öznesiz **ist geschlossen** Almancada kurallı bir yapı (kapı yazılarında ve konuşmada: **Sonntags ist geschlossen**). Soru biçimi tezgâhta doğal; daha da sık duyulan **Wann haben Sie geschlossen?** kümedeki sözcüklerle kurulabiliyor, ama **haben** + **geschlossen** öğrenciye geçmiş zaman gibi görünür; bugün için mevcut biçim daha güvenli.
- **İki selam iki halkada (PM sorusu 1).** Dil açısından sorun yok. **Schönes Wochenende! – Schönen Urlaub!** çifti iyi seçim: **-es/-en** farkını açıklamasız, bütün olarak gösteriyor. „İyi tatiller“ **Urlaub**'un kart anlamı („izin“) ile aynı sözcük değil, ama dilek olarak Türkçede doğrusu bu; „iyi izinler“ de söylenir ve okur isterse o seçilebilir.
- **`und` (PM sorusu 3).** Dil açısından kalıp gerekmez; anlamı tek ve Türkçeyle bire bir. Yalnız dosyada **und** iki Türkçeyle geçiyor: bağlaç „ve“ (h4) ve soru başında „Peki …?“ (h1, h5). İkisi de doğru; kalıp açılırsa „Und …? = Peki …?“ ayrı gösterilmeli.

## Bakılan, sorun bulunmayan noktalar

- **WORLD:** Huber'in doğum günü haziranda (h2 sorusu uyumlu), Luka'nınki kasımda (h3 sahnesi), Brandl'ınki mayısta (halkada tarih verilmiyor), Derya'ya **du** ve ön ad, Luka'ya ön ad + **Sie** (gun-02 ile aynı), Wimmer/Huber/Stadler/Brandl'a soyadı + **Sie**. Muayenehane ocakta kapalı (gun-02 sınavı), fırın ağustosta kapalı (gun-02 anonsu), öğrencinin izni ağustos başında (gun-02 okuması: **Anfang August geht**). Kimseye yeni olgu eklenmemiş. Bairisch yok.
- **Sahne soruları:** beşi de tek cevaplı. h2 (`cikarim: true`) gerçekten çıkarım: ay adı „bugün“ ile birleştirilmeden cevap çıkmıyor (**im Juli. Heute!**); cevap tek. h5'te „Bütün ağustos“ dışındaki üç seçenek metinle çelişiyor.
- **OD-9:** aynı Türkçe iki Almancaya gitmiyor (betikle de bakıldı). **am** + gün olan her satırda „günü“ var, olmayanlarda yok. **im Sommer/Winter** → „yazın/kışın“ doğal Türkçe; kalıbın „-da, -de“ açıklamasıyla çelişmiyor.
- **Kimlik:** öğrencinin adı ve cinsiyeti hiçbir satırda yok.
- **„Bitte, ja.“, „Danke, nein!“** (kabul öğeleri): alışılmış sıra değil ama yanlış değil; 1. günün onaylı dosyasında da var. Kaldı.
- **„Juli oder Juni“** gibi sırası değişmiş kabul öğeleri: anlam aynı, Almancası doğal; kaldı.
- **„Ich habe heute Geburtstag!“** kabul listesinde „Heute ist mein Geburtstag!“: kartın sözcüğünü (haben) atlatıyor, ama Türkçenin („Bugün doğum günüm!“) en düz karşılığı bu; reddetmek haksız olurdu. Kaldı.

## Kalan şüpheler (dil hatası değil)

1. **Öğrencinin doğum günü.** Öğrencinin ağzından dört ayrı bilgi var: mayıs (h2), ağustos (h2), ilkbahar (h4), „temmuz, bugün“ (h2 sahnesi). Alıştırma cümlesi olarak sorun değil; ama sahne öğrenciye sabit bir doğum ayı veriyor. D-061 yalnızca ad ve cinsiyeti yasaklıyor; karar İÇ/ANA'da. Seçenek: sahnede doğum günü Brandl Hanım'ın olsun (WORLD: 2 Mayıs) ve soru „hangi ay“ yine çıkarımla sorulsun.
2. **Günün dosyasıyla çelişki** (yazar da yazmış): gun-02 sahnesinde Luka'nın, provasında Brandl'ın doğum günü „bugün“; WORLD'e göre 11 Kasım ve 2 Mayıs, hafta 23 Kasım'da başlıyor. Halkalar WORLD'e uyuyor; düzeltilecek olan gun-02.
3. **Brandl Hanım'ın „Hallo!“su** (h2 sahnesi): WORLD'e göre „Grüß Gott“ der; sözcük kümede yok. 1. gündeki şüphe 2 ile aynı.
4. **h1 „Einen Monat geschlossen? Im Januar?“** Dil doğru (süre için -i hâli). Bir aile hekimi muayenehanesinin bir ay kapalı olması gerçekte seyrek; olgu gun-02 sınavından geliyor, halkada değiştirilmedi.
5. **„Im Oktober geht, …“** gibi **es**'siz biçimler kabul listelerinde ve sahnelerde duruyor (konuşmada duyulur); yalnızca gösterilen cümle tam biçime çekildi.

## Sonuç

Hata oranı: **5 bulgu / 80 madde ≈ %6,3** (dilbilgisi 3, kabul listesi 1, Türkçe 1). Hepsi dosyada düzeltildi; iki betik 0 hata.

**KAPANDI** (dil açısından). Açık kalan tek dil konusu „… habe ich …“ sırasının kabul edilmemesi: dosyada çözülemiyor, kalıp ve betik kararı gerekiyor (PM sorusu 2). Dosyada `review` alanı yok (şema ANA'da). Sıradaki: okur (OD-9).

## Okur 1. tur sonrası

Kapsam: yalnızca değişen satırlar (yazarın tablosu ve baş geliştiricinin iki değişikliği). **20 madde**: 13 görev cümlesi ve kabul listeleri, h4 kalıbı, h1 ortamı, h2 sahnesi (3 satır + soru), `not`. Tarih: 2026-11-20.

**Bulgu: 0.** Dosyada değişiklik yapmadım. Denetim: `halka_kontrol.py` → 0 hata, 0 not; `kucuk_sozcuk.py` → 0 hata.

Bakılanlar:

- **„Die Praxis ist … geschlossen / offen“** (h2/g9, h5/g8): doğru ve doğal. Öne alınmış biçimler de doğru (**im Januar ist die Praxis geschlossen**, **Von Montag bis Freitag ist die Praxis offen**). h2/g9'da cevap soruyu düzeltiyor (ağustos değil, ocak); anlam açık, olgu WORLD ile aynı.
- **h4 kalıbı „Ich habe … – Im August habe ich …“**: Almancası doğru. Türkçesi „Benim … var – Ağustosta benim … var“ sırayı gösteriyor: cümle zamanla başlayınca **habe** ikinci yerde kalıyor, **ich** arkaya geçiyor. Önceki raporumdaki öneriyle aynı yönde.
- **Eklenen „… habe ich …“ kabul öğeleri** (h4/g2, g9, g10; h5/g3): dördü de doğru. Önceki raporumdaki haksız ret riski kapandı. **Schönes Wochenende! Am Montag habe ich Urlaub.** da doğru.
- **h1/g10 „Welcher Monat? Februar oder März?“**, **h3/g2 „Nicht im August – im September, Frau Stadler.“**, **h4/g6**, **h4/g8**, **h4/g11 „Ihr Urlaub ist im August, Frau Stadler?“**, **h5/g2 „Wann ist Ihr Urlaub, Frau Huber?“**: doğru. Son ikisinde gündelik konuşmada **haben**'li biçim daha sık; ikisi de kabul listesinde duruyor.
- **Kabul listeleri:** değişen satırlarda yanlış Almanca yok. Çıkarılan **ist**'siz kısa biçimler yanlış değildi, ama Türkçe cümlelerde artık özne var; çıkarılmaları haksız ret doğurmuyor.
- **h2 sahnesi:** Brandl Hanım'ın doğum günü mayısta (WORLD: 2 Mayıs). Soru „Bu konuşma hangi ayda geçiyor?“ tek cevaplı ve gerçekten çıkarım: „mayısta“ ile „bugün“ birleşmeden cevap çıkmıyor; sahnede başka ay geçmiyor. Önceki raporumdaki 1. şüphe (öğrenciye sabit doğum ayı) sahne için kapandı.

**„Haben Sie …?“ kalıbının çıkarılması: uygun.** **Sie** biçimi kartta yazan biçimle aynı (**haben**); düzensizlik yok (düzensiz olan **hat** ve **hast**). Fiil + **Sie** sırasını öğrenci „Wie heißen Sie?“, „Wo wohnen Sie?“ ve 3. gün h2'deki „Wohnen Sie in Nummer vier?“ cümlelerinden biliyor; 3. gün h5/g7 bunlardan sonra geliyor. Kalıpta üç söz yerine iki söz kalması okurun takıldığı yeri de kaldırıyor. Tek kayıt: **hat** ilk kez istendiği gün kendi kalıbı gerekir; bu çıkarım oraya taşınmaz.

Kalan şüpheler (hata değil):

1. **„İlkbaharda doğum günüm var.“, „Bugün doğum günüm var!“** (h4/g2, g9). Türkçede düz söyleyiş „Bugün doğum günüm.“; „doğum günüm var“ konuşmada duyulur, yanlış değil, ama Almancanın gölgesi. Bilerek seçilmiş: okur N5'te „var“ olmayınca kalıbı kullanmadığını yazmış. **Geburtstag haben** Almancada asıl söyleyiş olduğu için cümleleri değiştirmedim. Okur 2. turda takılırsa seçenek: iki cümle **Urlaub** ile kurulur („İlkbaharda iznim var.“).
2. **Öğrencinin doğum günü** görev cümlelerinde hâlâ birbirini tutmayan bilgiler var (mayıs, ağustos, ilkbahar, bugün). Alıştırma cümlesi; karar İÇ/ANA'da.
3. **Brandl Hanım'ın „Hallo!“su** ve günün dosyasıyla tarih çelişkisi: önceki rapordaki 2. ve 3. şüpheler aynen duruyor.

Hata oranı: **0 / 20**. Sonuç: **KAPANDI** (dil açısından). Sıradaki: okur 2. tur.
