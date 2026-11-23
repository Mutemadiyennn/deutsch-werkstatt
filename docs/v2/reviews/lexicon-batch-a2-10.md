# Sözlük partisi a2-10 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 19 derin kart (A2 tablosu 22.–23. hafta, 154.–156. gün) · dosya: `content/v2/registry/lexicon/batch-a2-10.json`

Gün ataması (`a2-kesin.json` `lex_doldurma` a2-10): 154 Verlängerung, abgeben (2) · 155 wiederkommen–Temperatur (9) · 156 sich_vornehmen–Anfänger (8).

## Sayılar
- Geçti (değişiklik yok): 8 kart (Verlängerung, wiederkommen, nachher, weitermachen, Temperatur, verbessern, Niveau, Fortschritt)
- Düzeltildi: 11 kart, **17 düzeltme** (3'ü yalnız `also_ok`, 1'i `freqRank`)
- Kaldı: 0
- Hata oranı: 17 / 19 = 0,89
- `npm run content:validate`: 0 hata, 158 uyarı. Bu partiye ait tek uyarı `arzt/proposals.json: lx:wiederkommen kayıtta zaten var`. Bu, öneri kartı kullanıldığı için beklenen uyarı.
- `review`: `draft` (okur bekliyor, alana dokunulmadı)

## Düzeltmeler (önce → sonra, gerekçe)

**Hata notları (`mistakes_tr`)**
1. `lx:Wettervorhersage`: `Televizyondaki hava durumu için **der Wetterzustand** denmez …` → `Hava tahmini derken **das Wetter** gibi **das Wettervorhersage** yanlış. Son parça belirler, doğrusu **die Wettervorhersage**.` **Zustand** kartlı değil, A2 öğrencisi **Wetterzustand**'ı kendiliğinden kuramaz, yani hata gerçek değil. Türkçe konuşanın gerçek hatası, bildiği **das Wetter**'den yola çıkıp yanlış artikel seçmek.
2. `lx:Erfolg` 1.: `**Viele Erfolge!** denmez. Doğrusu **Viel Erfolg!**` → `**Viele Erfolge!** pek duyulmaz. Herkesin dediği **Viel Erfolg!**` **viele Erfolge** doğru Almanca (ör. **weiterhin viele Erfolge** yazılı dilekte geçer). Doğru biçim yanlış diye gösterilmemeli (brif md. 6). Türkçedeki "Başarılar"dan gelen sapma yine gösteriliyor.
3. `lx:abgeben` 2.: `Teslim almak **abgeben** değildir. … **abgeholt** dersin.` → `Paketi teslim aldım derken **Ich habe das Paket abgegeben** yanlış, bu paketi verdim demek. Doğrusu **Ich habe das Paket abgeholt**.` Yanlış biçim artık açıkça gösteriliyor (a2-08 md. 14 ölçütü).
4. `lx:Karriere`: `Türkçedeki kariyer gibi **Karier** yanlış` → `Türkçedeki kariyer gibi tek r ile **Kariere** yazmak yanlış. Doğrusu iki r ile **Karriere**.` Gerçek yazım hatası tek r (**Kariere**). **Karier** biçimine kimse varmaz.
5. `lx:Anfänger`: `Almancada yeni başlayanım derken **Ich bin neu in Deutsch** yanlış` → `Almancada yeniyim derken … denmez.` Hatanın kaynağı "-da yeniyim" sözü, Türkçe giriş buna göre düzeltildi. **neu in Deutsch** dilbilgisi hatası değil, alışılmış söz değil. Bu yüzden "yanlış" yerine "denmez" yazıldı.

**Açıklama (`exp`)**
6. `lx:Erfolg` `ipucu_tr`: `Birine iyi dilek olarak kısa ve sık **Viel Erfolg!** dersin.` → `Birine başarı dilerken kısaca **Viel Erfolg!** dersin.` "kısa ve sık" tek okumada anlaşılmıyordu.
7. `lx:abgeben` `parcalar`: **ab** → `elden` yerine `uzağa, -den`. "elden" tek başına anlamsız. Yeni karşılık `lx:abfahren` (a2-05) ile aynı.

**Türkçe çeviri**
8. `lx:Hoffnung` ö4: `Yeniden iyileşecek mi?` → `İyileşecek mi?` **wieder gesund werden** "iyileşmek" demek. "Yeniden" ikinci kez iyileşme gibi okunuyordu.
9. `lx:sich_vornehmen` ö5: `Daha çok birlikte yemek yapmaya niyetliyiz.` → `Daha sık birlikte yemek yapmaya karar veriyoruz.` "daha çok birlikte" Türkçede doğal değil. Kartın anlamı **karar vermek**.
10. `lx:beibringen` ö2: `Sana bu kadar iyi Almancayı kim öğretti?` → `Sana Almancayı bu kadar iyi kim öğretti?` (sözcük sırası)
11. `lx:Anfänger` eşdizim 2, ö2, b2 (`tr` + `hint_tr`): `daha acemi` → `henüz acemi`. "daha acemi" "daha da acemi" diye de okunabiliyor. **noch** burada "henüz" demek. b2 ipucu: `Henüz acemi derken **noch Anfänger** denir.` (Bu madde 4 Türkçe alan değiştirdi.)

**`also_ok` eksikleri (haksız ret riski)**
12. `lx:irgendwann` b4: + **einmal** (`Wirst du einmal ein Haus kaufen?` doğru, `lx:einmal` 31. gün).
13. `lx:Sonne` b2: + **durch** (`Die Sonne kommt durch` çok sık).
14. `lx:Wolke` b3: + **Wolken** (`Keine Wolken, nur Sonne!` en az o kadar sık).

**Sıklık**
15. `lx:Erfolg` `freqRank: 1105` silindi. Liste satırı `erfolgen` lemması, biçimleri **erfolg** ve **erfolgt** birlikte sayıyor. Adın kendi sayısı ayrılamıyor (brif: yoksa alan yok).
- `lx:Sonne` `freqRank: 961` **bırakıldı**. Satırın lemma adı yanlış (`sonnen`) ama tek biçimi **sonne**, yani sayı adın kendi tekilinin sayısı. Brifteki "tekilin sayısını taşıyan satır" kuralına uyuyor.

## Görev sorularına cevap
- **İleri gönderme (betik + elle):** örnek, eşdizim, boşluk, ipucu ve notlardaki bütün sözcükler kart günleriyle karşılaştırıldı. 157.+ gün kartı yok. Betiğin bulduğu eşleşmeler yanlış alarm: **gibt → aufgeben**, **Fest → fest**. **das Fest** 89. gün. Kartsız olanlar özel ad, bileşik ya da yalnız yanlış biçimde geçen sözcükler: **Hamburg**, **Kochkurs**, **Wetterzustand** (kaldırıldı), **entwickeln**, **Feuer**, **Karier**. **Keine Sorge** kalıplarda var. 154. günde **werden** geleceği ve **vorhaben … zu** yok, 155. günde **vorhaben … zu** yok. **hätte/würde**, **um … zu**, **damit**, ilgi cümlesi de yok. **Könnten Sie** (`pt:koennten-sie`) önceden öğretilmiş kalıp. **zu** + mastar 136. günden, **als** 150. günden.
- **Günün dil noktası:** 155. günün 9 kartının her birinde **werden** + mastar var (wiederkommen ö2, irgendwann ö1, nachher ö1, Hoffnung ö2, weitermachen ö1, Wettervorhersage ö2, Sonne ö1, Wolke ö2, Temperatur ö1). 156. günün 8 kartının her birinde **vorhaben/planen/versprechen/sich vornehmen … zu** var. 154. gün (haftanın sınavı, e-posta) iki kartta da ek süre e-postasının cümleleri var: **Leider war ich … Deshalb bitte ich Sie um …**, **weil ich krank war**.
- **Fiil alanları:** abgeben (gab ab, hat abgegeben), wiederkommen (kam wieder, **ist** wiedergekommen), weitermachen (machte weiter, hat weitergemacht), sich vornehmen (nahm sich vor, hat sich vorgenommen, **mir** + akk), verbessern (verbesserte, hat verbessert), beibringen (brachte bei, hat beigebracht, dat + akk) doğru. Öneri kartı `lx:wiederkommen` (`arzt/proposals.json`): `tr`, `pos`, `level`, `verb` aynı, `domains` genişletilmiş.
- **Hata notlarının gerçekliği (lex'in sorusu):** **Viele Erfolge!** Türkçe "Başarılar"dan gelen gerçek bir sapma, ama doğru Almanca. Not yumuşatıldı (2). **Wetterzustand** gerçek bir hata değildi, değiştirildi (1). Diğerleri Türkçe konuşana özgü: **für** (için), **Die Sonne öffnet** (güneş açıyor), **Ich habe Feuer** (ateşim var), **viele Wolke**, **Fortschritt gemacht** (Türkçede tekil), **in Niveau A2** (-de), **mein Deutsch entwickeln** (geliştirmek), **Ein Tag** (bir gün).
- **Kalıp bağları:** 19 kartın her bağı, kartın kendi sözcüğünün geçtiği bir cümlede gerçekten var. **trennbar** bağı Karriere'de ve Anfänger'de **vorhaben** (ö4, ö3) üzerinden sağlanıyor. Kaldırılan bağ yok.
- **Boşluk ipuçları:** 76 ipucunun bütün kalın parçaları, doldurulmuş cümlede harfi harfine geçiyor (betik: sapma 0). Her boşlukta tek `___` var.
- **WORLD:** **beim Hausmeister** (apartman görevlisi) WORLD'deki Pichler ile uyumlu. Kalıcı karakter adı yok, tarihli yeni olay yok. Öğrencinin ağzında sabit ad ya da cinsiyet yok (Anfänger notu iki biçimi birlikte veriyor). Bairisch yok.
- **Olgusal iddia:** süre, yasa ya da rakam iddiası yok. `SOURCES.md`'ye satır gerekmedi.
- **OD-9:** terim taraması 0 (iki eşleşme "hâlâ" ve "hâle" sözcüklerinden, yanlış alarm). İngilizce köprü, üç nokta, `;` ve tırnak yok. Kişi ve para geçmiyor.

## Değişen Türkçe alanlar (okur için, 14 satır)
- `mistakes_tr` (5): `lx:abgeben` (2.), `lx:Wettervorhersage` (1.), `lx:Erfolg` (1.), `lx:Karriere` (1.), `lx:Anfänger` (1.).
- `exp` (2): `lx:Erfolg` `ipucu_tr`, `lx:abgeben` `parcalar[0].tr`.
- Örnek çevirileri (4): `lx:Hoffnung` ö4, `lx:sich_vornehmen` ö5, `lx:beibringen` ö2, `lx:Anfänger` ö2.
- Eşdizim çevirisi (1): `lx:Anfänger` (2.).
- Boşluk (2): `lx:Anfänger` b2 `tr` ve `hint_tr`.

## Kalan şüpheler (düzeltilmedi)
- `lx:Fortschritt` `parcalar`'da **Schritt** var. `lx:Schritt` 218. günün kartı. Parça, Türkçe karşılığıyla birlikte veriliyor ve öğrenciden üretim istemiyor, bu yüzden bırakıldı.
- `lx:Erfolg` 2. not, **Er war Erfolg** → **Er hatte Erfolg**: Türkçedeki "başarılı" yalnız **Erfolg** biliniyorsa bu hataya götürebilir, ama sınırda. Doğal ikinci doğru biçim **Er war erfolgreich** kartlı değil.
- `lx:Niveau` b1/b3 `also_ok` **Level**: Almancada **das Level** gündelik dilde kullanılıyor, kabul edilmesi haksız reti önlüyor. İngilizceden gelme olduğu için baş geliştirici isterse çıkarabilir.
- `pt:als-wenn-zeit` kaydında `level: "B1"` yazıyor, ama **als** A2'de (150. gün) öğretiliyor. Kayıt meselesi (abgeben ö5).
- `tier`: 6 kartın sıklık satırı K2 (wiederkommen, Wolke, verbessern, Fortschritt, Temperatur, Anfänger), 5 kartın satırı yok (Verlängerung, Wettervorhersage, sich_vornehmen, Niveau, artık Erfolg). Kartlarda K1 yazıyor. A2 partilerinin ortak yolu bu (İÇ-K3).

## Sonuç
Bulunan bütün hatalar dosyada düzeltildi. Doğrulayıcı 0 hata verdi.

Sonuç: KAPANDI — okur bekliyor

## Fark turu (okur 10 GERİ + örneklem 1 öneri)

Kaynak: `docs/v2/reviews/okur/lexicon-batch-a2-10.md` ve örneklem önerisi (Verlängerung). Okurun önerileri esas alındı, her alan tek fikir. Yalnız bu 11 alan değişti.

1. `lx:irgendwann.exp.ne_zaman_tr`: → `Bir planını ya da hayalini, tarih vermeden anlatırken.`
2. `lx:Wettervorhersage.mistakes_tr[0]`: kural cümlesi kaldırıldı → `Hava tahmini derken **das Wettervorhersage** yanlış. Doğrusu **die Wettervorhersage**.`
3. `lx:Sonne.forms[3].hint_tr`: → `Bol güneşimiz olacak derken **werden wir** ve sonda **haben** gelir.`
4. `lx:Temperatur.forms[1].hint_tr`: → `Dünden beri ateşiniz var mı derken **Haben Sie seit gestern Temperatur** denir.`
5. `lx:sich_vornehmen.forms[1].hint_tr`: → `Karar verdim derken **Ich habe mir vorgenommen** denir.`
6. `lx:Niveau.mistakes_tr[0]`: yanlış **Ich bin in Niveau A2** → **Ich bin in dem Niveau A2**. Artık tek fark **in** / **auf**. Doğru biçim **auf dem Niveau A2** kaldı, çünkü ö1 ve b2 aynı biçimi kullanıyor. **auf Niveau B1** (ö2, b4) de doğru.
7. `lx:beibringen.forms[3].hint_tr`: → `Öğreteceğine söz verdi derken sonda **beizubringen** gelir.`
8. `lx:Karriere.exp.ipucu_tr`: → `Kariyer yapmak derken çoğu zaman **eine** olmadan **Karriere machen** dersin.` Okurun önerisindeki "önüne **eine** gelmez" kesin bir kural gibi okunuyordu, oysa sıfatla **eine große Karriere machen** doğru. Bu yüzden "çoğu zaman" yazıldı.
9. `lx:Karriere.forms[2].hint_tr`: → `Onun (erkek) kariyeri için derken **Für seine Karriere** denir.`
10. `lx:Karriere.forms[3].hint_tr`: → `Kadın için kariyerinin başında derken **Am Anfang ihrer Karriere** denir.`
11. `lx:Verlängerung.forms[3].also_ok`: + **Fristverlängerung** (örneklem).

Denetim: ipucu kalın parçası sapma 0. `npm run content:validate` 0 hata, 158 uyarı. `review` alanına dokunulmadı.

Okurun yeniden okuyacağı alanlar (10): yukarıdaki 1–10.

Sonuç (fark): KAPANDI
