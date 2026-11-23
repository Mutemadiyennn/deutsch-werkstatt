# Sözlük partisi a2-03 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 30 derin kart (A2 tablosu 18. hafta 124.–126. gün, 19. hafta 127.–128. gün) · dosya: `content/v2/registry/lexicon/batch-a2-03.json`

Okunan alanlar: kart verisi, 120 eşdizim, 180 örnek, 150 boşluk (`forms`), `exp`, `mistakes_tr`, `also_ok`, `patterns`, `related`.

## Sayılar
- Geçti (değişiklik yok): 15 kart (`lx:Ehemann`, `lx:sich_unterhalten`, `lx:föhnen`, `lx:Bart`, `lx:Spiegel`, `lx:Park`, `lx:Wald`, `lx:Altstadt`, `lx:Hof`, `lx:Runde`, `lx:Kirche`, `lx:Ecke`, `lx:Eingang`, `lx:Hauptstraße`, `lx:Kino`)
- Düzeltildi: 15 kart, 24 düzeltme (7'si yalnızca `also_ok` eklemesi; 1'i baş geliştirici kararıyla ek tur)
- Kaldı: 0
- Hata oranı: 15 kart / 30 = 0,50 (içerik hatası olan kart: 13 / 30 = 0,43; `lx:Gebäude` ve `lx:zufrieden` kartlarında yalnızca `also_ok`)
- `npm run content:validate`: 0 hata, 146 uyarı (taban 146; bu partiye ait uyarı yok). `content:explain-audit`: partide 70 açıklama, aykırı 0 (`docs/v2/reports/aciklama-tarama.md` eski hâline bırakıldı).
- `review`: `draft` (okur bekliyor).

## Düzeltmeler (önce → sonra, gerekçe)

**Almanca ve gerçeklik**
- `lx:Brücke` ö2 ve b3: `Gegenüber der Brücke gibt es ein kleines Café.` → `Neben der Brücke gibt es ein kleines Café.` Köprünün "karşısı" olmaz; cümle yol tarifinde söylenmez. Türkçesi ve ipucu birlikte değişti.
- `lx:Zentimeter` ö5: `– Wie lang soll es bleiben? – Schneiden Sie bitte nur einen Zentimeter.` → `– Wie viel soll ich schneiden? – …` Soru ne kadar kalacağını soruyor, cevap ne kadar kesileceğini söylüyordu.
- `lx:waschen` ö5: `da hab ich Zeit` → `da habe ich Zeit` (örnek `hd` katmanında; kısaltma Alltag biçimi).

**"X derken" aynı Türkçe söz, iki Almanca biçim (OD-9)**
- `lx:waschen` ö2: `Ich wasche meine Haare jeden zweiten Tag.` → `Ich wasche mir jeden zweiten Tag die Haare.` İpucu "Saçımı … derken **mir die Haare** dersin" diyor; aynı kartta "saçımı" bir de **meine Haare** oluyordu.
- `lx:Frisur` ö5 ve b4: "Nasıl bir saç modeli istersiniz?" → "Hangi saç modelini istersiniz?"; ipucu "Hangi saç modeli derken **Welche Frisur**". **Welche** "hangi" demek; "nasıl bir" **Was für eine** olur.

**İpucu cümledeki biçimi göstermiyordu (OD-9)**
- `lx:geschieden` `ipucu_tr`: "**haben** değil, **sein** gelir: **Ich bin geschieden**" → "**habe** değil, **bin** gelir". Cümlede görünen biçim **bin**.
- `lx:spazieren_gehen` `ipucu_tr`: "**sein** gelir: **Wir sind** …" → "**sind** gelir".
- `lx:vorbeigehen` `ipucu_tr`: "**vor** değil, **an** gelir: **am Rathaus vorbei**" → "**vor dem** değil, **am** gelir".
- `lx:Post` b2 `hint_tr`: b1 ile aynı cümleydi, boşluğun sorduğu şeyi söylemiyordu → "**zur Post** denir, **zu Post** değil."

**Hata notları (Türkçe konuşana özgülük)**
- `lx:waschen`: 3. not eklendi: "Yıkanıyorum derken **Ich wasche** yanlış. Doğrusu **Ich wasche mich**." Türkçede yıkanmak tek kelime; **mich** unutulur. Öteki iki not (**gewascht**, **wascht**) her öğrencinin yaptığı gerçek hatalar, kaldı.
- `lx:Baum` 2. not: "Ağaçlar derken **die Baums**" → "Çok ağaç derken **viele Baum** yanlış. Doğrusu **viele Bäume**." Türkçede sayı sözünden sonra çoğul eki gelmez; gerçek hata bu. **Baums** Türkçe konuşanın kuracağı biçim değil.
- `lx:Liebe` 1. not: yanlış biçim `Liebe in erstem Blick` → `Liebe im ersten Blick` (Türkçedeki **-te** ekinden gelen gerçek hata; eski biçim ayrıca çekim hatası da taşıyordu, not tek şeyi göstermeli).

**Hafta içi ileri gönderme**
- `lx:joggen` ö6 ve b4: `Am Sonntag bin ich zwei Runden um den See gejoggt.` → `Am Sonntag bin ich durch den Wald gejoggt.` **Runde** aynı partide `joggen`'den sonra gelen kart; cevap cümlesi öğrenciye henüz gösterilmemiş kelimeye dayanıyordu. Yeni cümle kartın eşdizimi (**durch den Wald joggen**), **Wald** daha önce.

**Türkçe çeviri**
- `lx:Kontakt` ö4: "şimdi idare ediyor" → "şimdi idare eder" (**jetzt geht's**; öznesiz "idare ediyor" yarım kalıyordu).
- `lx:sich_verabreden` ö5: "Stadtplatz'ta" → "Meydanda" (önceki partilerde ve bu partide `lx:Altstadt` ö1'de **Stadtplatz** hep "meydan").
- `lx:Post` ö1, b1, b2: "Hemen bir postaneye uğramam lazım." → "Hemen postaneye de uğramam lazım." (**noch**; "bir postaneye" herhangi bir postane gibi okunuyordu).

**`also_ok` eksikleri (haksız ret riski)**
- `lx:sich_verabreden` b4: **treffen** (**Ioana und ich treffen uns oft zum Üben** aynı anlamda doğru).
- `lx:zufrieden` b1, b5: **glücklich** (**mit … sehr glücklich** doğru Almanca; a2-02'de **höflich** / **freundlich** için uygulanan ölçü).
- `lx:Gebäude` b1, b2, b3: **Haus** (b4 ve b5'te zaten vardı; beş boşlukta da **Haus** doğru).
- `lx:spazieren_gehen` b4: **raus**, **Gassi** (**mit dem Hund raus** / **Gassi gehen**; Türkçesi "köpeği gezdireyim").

**Ek tur (baş geliştirici kararı, 2026-11-23)**
- Sıkı WORLD okuması: `lx:Liebe` ö6 ve b4 `Frau Brandl macht ihre Plätzchen mit viel Liebe.` → `Meine Nachbarin macht ihre Plätzchen mit viel Liebe.` (Türkçesi "Komşum kurabiyelerini büyük bir sevgiyle yapıyor."). `lx:föhnen` b5 için istenen `also_ok` **Föhnen** eklenmedi: doğrulayıcı "cevabın kendisini tekrar ediyor" uyarısı verdi (146 → 147); cevap karşılaştırması büyük/küçük harfe duyarsız, ek gereksiz.
- Okur dönüşü: `lx:vorbeigehen` `ipucu_tr` "**vor dem** değil, **am** gelir" kural gibi okunuyordu, kartın öteki alanları **an der** veriyor → "Önünden geçmek derken **vor** değil **an** gelir: **am Kino vorbei**, **an der Kirche vorbei**." (iki örnek de kartta geçiyor; düzeltme sayısı değişmedi, aynı alanın ikinci hâli).

## Görev sorularına cevap
1. **Boşluklar:** 150 boşluğun hepsi tek tek çekildi; yanlış cevap yok (`wäscht`, `wäschst`, `unterhält`, `Unter den Baum`, `gegenüber der`, `am Kino`, `ins Kino`, `zur Post` dahil). Eksik eş cevaplar yukarıda. Aynı cümleden iki boşluk (ör. `lx:Zentimeter` b1 ve b2) farklı kelimeyi soruyor; çakışma yok.
2. **OD-9:** terim, üç nokta, yasak sembol yok (tarama 0). "X derken" çakışması iki kartta, biçimi göstermeyen ipucu dört kartta vardı; düzeltildi. Türkçe kişi ile Almanca kişi her ipucunda ve her hata notunda eşleşiyor. Her hata notu kartın kendi kelimesini içeriyor.
3. **WORLD:** adlı satırlar WORLD ile örtüşüyor; tek sıkı okuma düzeltmesi `lx:Liebe` ö6 (ek tur). Luka (`lx:Frisur`, `lx:waschen`, `lx:föhnen`, `lx:Bart`, `lx:Spiegel`): yalnızca kuaför işi (yıkar, fönler, sakal keser, ayna tutar); yeni olay ya da özellik yok. Ioana: kurstan arkadaş, birlikte pratik (**zum Üben**), `lx:spazieren_gehen` ö5 Vils kıyısında yürüyüş 18. haftanın Osterspaziergang'ı ile uyumlu. Derya: molada sohbet. Bäckerei Stadler: **gleich um die Ecke** (WORLD: Brunnenviertel'in köşesi) ve her gün önünden geçmek. Tobi yok. Öğrencinin ağzında sabit ad ya da cinsiyet yok. Sara, Murat, Jana, Lisa, Jan, Frau Kaya WORLD karakteri değil, adlı öğrenci değil.
4. **Bairisch/sued:** yok. Katmanlar yalnızca `hd` ve `alltag`, `register` hep `neutral`. **passt schon**, **heut früh** Alltag biçimi, lehçe değil.
5. **Hafta içi ileri gönderme:** a2-04'ün 20 kelimesi (frisch … Kontrolle) metin taramasıyla arandı; hiçbiri geçmiyor (**Bahnhof** eski kart, **Bahn** değil). Parti içinde tek ileri gönderme `lx:joggen` → **Runden** idi; düzeltildi. Kalan parti içi göndermeler hep daha önceki karta: `lx:zufrieden` → Frisur, `lx:Gebäude` ve `lx:spazieren_gehen` → Altstadt, `lx:Eingang` → Hof, Ecke, `lx:Post` → Ecke, Kirche, `lx:vorbeigehen` → Kirche, Post, Kino. Önceki partilerde hiç geçmemiş kelime taraması: kart kelimeleri ve çekimleri dışında yalnızca kişi adları ve **Büros**, **hundertmal**, **fünfunddreißig**.
6. **joggen aux:** `aux: haben/sein`, `perfekt: ist gejoggt` doğru (sözlükler ikisini de verir; yön bildiren cümlede **sein**). Kartta **habe gejoggt** yanlış diyen not yok; örnek ve boşluk yönlü cümlede **bin … gejoggt**. `haben/sein` değeri parti 003 ve 007'de de var. **Post:** iki anlam (postane, gelen posta) `tr`, `anlam_tr`, eşdizim ve örneklerde ayrı ayrı gösteriliyor; `pl: -` doğru. **waschen:** yukarıda.

## Değişen Türkçe alanlar (okur için)
- `exp.ipucu_tr`: `lx:geschieden`, `lx:spazieren_gehen`, `lx:vorbeigehen`.
- `mistakes_tr`: `lx:Liebe` (1.), `lx:waschen` (3., yeni), `lx:Baum` (2.).
- `hint_tr`: `lx:Frisur` b4, `lx:Brücke` b3, `lx:Post` b2.
- Örnek ve boşluk çevirileri: `lx:Liebe` ö6, b4, `lx:Kontakt` ö4, `lx:sich_verabreden` ö5, `lx:Frisur` ö5, b4, `lx:Zentimeter` ö5, `lx:joggen` ö6, b4, `lx:Brücke` ö2, b3, `lx:Post` ö1, b1, b2.

## Kalan şüpheler (düzeltilmedi)
- Gün dağılımı depoda yok; 127. ve 128. gün arasındaki sınır görevdeki kimlik sırasından çıkarıldı. Parti içi göndermeler bu sıraya göre hep geriye bakıyor. Sıra tablodan farklıysa 5. maddedeki liste yeniden bakılmalı.
- `lx:sich_verabreden`: **verabredet sein** → "sözü olmak" ("sözüm var"). Türkçede anlaşılır ama "randevum var" kadar yaygın değil; okur anlamazsa "biriyle buluşacağım" denebilir.
- `lx:Liebe` **aus Liebe heiraten** → "aşk için evlenmek": daha doğal Türkçe "severek evlenmek"; hata notu (**für Liebe**) "için" sözüne dayandığı için bırakıldı.
- `lx:Kirche` ö4 `Am Sonntag ist die Kirche immer total voll.`: dil doğru; olgu olarak abartılı, zararsız.

## Sonuç
Düzeltme sayısı: 24. Dil açısından bulunan bütün hatalar dosyada düzeltildi, doğrulayıcı 0 hata. Parti `draft` kalıyor.

Sonuç: KAPALI — okur bekliyor
