# Sözlük partisi a2-05 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 26 derin kart (A2 tablosu 19. hafta 132.–133. gün, 20. hafta 134.–136. gün) · dosya: `content/v2/registry/lexicon/batch-a2-05.json`

Okunan alanlar: kart verisi, 104 eşdizim, 156 örnek, 130 boşluk (`forms`), 48 hata notu, `exp`, `also_ok`, `patterns`, `related`.

Gün ataması planda yazmıyor (132.–136. günlerin yuvaları "bekleyen"). İleri gönderme denetiminde dosya sırası ve yuva sayıları esas alındı: 132. gün Achtung–Ausstieg (6), 133. gün Bauarbeiten, Vorsicht (2), 134. gün Linie, Hauptbahnhof, Zentrum (3), 135. gün Öffnungszeiten–unsicher (8), 136. gün sparen–Regenschirm (7).

## Sayılar
- Geçti (değişiklik yok): 5 kart (`lx:Richtung`, `lx:Vorsicht`, `lx:Öffnungszeiten`, `lx:Notdienst`, `lx:Mittagspause`)
- Düzeltildi: 21 kart, **42 düzeltme** (9'u yalnızca `also_ok` eklemesi, 5'i yalnızca kalıp bağı)
- Kaldı: 0
- Hata oranı: 21 kart / 26 = 0,81
- `npm run content:validate`: 0 hata, 146 uyarı (taban 146; bu partiye ait uyarı yok). `content:explain-audit`: partide 74 açıklama, aykırı 0 (`docs/v2/reports/aciklama-tarama.md` eski hâline bırakıldı).
- `review`: `draft` (okur bekliyor).

## Düzeltmeler (önce → sonra, gerekçe)

**Almanca ve gerçeklik**
1. `lx:Achtung` eşdizim 4: `Achtung, Kontrolle!` (Dikkat, kontrol var!) → `Achtung, Stufe!` (Dikkat, basamak!). Eski söz bilet kontrolünü haber veren birinin sözü; öğretilecek bir kalıp değil. Yenisi dükkân ve bina girişlerinde gerçekten görülen uyarı yazısı.
2. `lx:Fahrgast` ö3: `Mann, die Fahrgäste da hinten sind echt laut.` → `Na toll, alle Fahrgäste müssen aussteigen. Der Bus ist kaputt.` Gündelik konuşmada arkadaki insanlara **Fahrgäste** denmez, **die Leute** denir. Yeni cümlede kelime yerinde (şoförün söylediğini aktarıyor) ve örneği olmayan **alle Fahrgäste** eşdizimi de örnek kazandı.
3. `lx:Regenschirm` ö5: `Ich habe ihn fast vergessen.` → `Den vergesse ich immer.` Az kalsın olan ama olmayan şey Almancada **Ich hätte ihn fast vergessen** ile söylenir; bu biçim henüz öğretilmedi. Düz geçmişle kurulan cümle ölçünlü değil. Türkçesi birlikte değişti.
4. `lx:nachschauen` eşdizim 4: `Ich schau mal nach.` → `Ich schaue mal nach.` Aynı kartta "Bir bakayım" hata notunda, ipucunda ve 1. boşlukta **Ich schaue mal nach**, eşdizimde **Ich schau mal nach** idi. Aynı Türkçe söz tek Almanca biçim veriyor.

**İleri gönderme**
5. `lx:sparen` ö6, boşluk 4 ve kalıp bağı: `Ich nehme Essen von zu Hause mit, um Geld zu sparen.` → `Ich nehme Essen von zu Hause mit und spare jeden Tag fünf Euro.` **um … zu** 158. günün dil noktası (23. hafta, `gr:a2-14:t4`); 136. günde kullanılamaz. Boşluğun cevabı **spare** oldu, `pt:um-zu` bağı kaldırıldı. 136. günün kendi konusu (**versuchen, … zu**) ö1'de duruyor.
6. `lx:Regenschirm` 2. hata notu: `**Mach Regenschirm auf** … **Mach den Regenschirm auf**` → `Şemsiyem yok derken **Ich habe nicht Regenschirm** yanlış. Doğrusu **Ich habe keinen Regenschirm**.` **aufmachen** sonraki partinin kartı. Yeni not ö3 ile ve `pt:kein` bağıyla örtüşüyor; Türkçe konuşanın gerçek hatası (yok → nicht).

**WORLD**
7. `lx:planen` ö6 ve boşluk 5: `Herr Wimmer plant für Freitag eine kurze Besprechung.` → `Mein Chef plant für Freitag eine kurze Besprechung.` Cümle karaktere günü belli bir olay ekliyordu. Görevdeki ölçüt gereği adsız kişiye çevrildi; Türkçesi ve ipucu birlikte değişti.

**Hata notları ve açıklamalar**
8. `lx:Linie` 2. hata notu: `Hangi hattın gara gittiğini derken **welche Linie fährt zum Bahnhof** yanlış.` → `Soruyu **Wissen Sie** ile açınca **welche Linie fährt zum Bahnhof** yanlış. Doğrusu **welche Linie zum Bahnhof fährt**.` Yanlış denen biçim tek başına doğru bir soru; ne zaman yanlış olduğu yazmıyordu.
9. `lx:Hauptbahnhof` 1. hata notu: `Können Sie mir sagen derken arkasından …` → `**Können Sie mir sagen** dedikten sonra …`. Eski giriş Türkçe okunmuyordu, Almanca söz de kalın değildi.
10. `lx:Hauptbahnhof` 2. hata notu: `Ana garda derken **in Hauptbahnhof** yanlış.` → `Ana gara derken **nach Hauptbahnhof** yanlış. Doğrusu **zum Hauptbahnhof**.` Eski not ö2 ile çelişiyor gibi okunuyordu (**in München Hauptbahnhof** doğru). Yenisi Türkçe konuşanın gerçek hatası (-e hâli → nach).
11. `lx:probieren` 2. hata notu: `**Schau den Geschmack vom Kuchen**` → `**Schau mal den Kuchen** yanlış, pastaya bak demek olur.` Öğrenci **Geschmack** kelimesini bilmiyor, bu yanlışı kuramaz. Kuracağı yanlış "bak" sözünü **schauen** ile çevirmek.
12. `lx:probieren` `ipucu_tr`: `**versuchen** değil, **probieren** dersin.` → `çoğu zaman **probieren** dersin.` Yemek için **versuchen** da söylenir; kural gibi okunan cümle yanlıştı.
13. `lx:planen` 2. hata notu: yanlış biçim `**Was planst du machen**` → `**Was planst du am Wochenende machen**`. Türkçe söz "hafta sonu" diyor, yanlış biçimde yoktu, doğru biçimde vardı.
14. `lx:rauchen` 1. hata notu: `Almancada sigara içilmez` → `Almancada sigara için **trinken** denmez`. Eski cümle Almanya'da sigara içilmez diye okunuyordu.
15. `lx:unsicher` 2. hata notu: `gelip gelmediğinden` → `gelip gelmeyeceğinden`.
16. `lx:Achtung` `ipucu_tr`: `önemli bir değişiklik gelir` → `önemli bir bilgi gelir`. `lx:einfahren` ö1'de **Achtung** değişiklik değil, giren treni haber veriyor.
17. `lx:einfahren` `ipucu_tr`: `Anonsta en çok **Ein Zug fährt ein** cümlesini duyarsın.` → `Anonsta **fährt ein** duyarsan tren şimdi perona giriyor demektir.` "En çok" kanıtsız bir iddia; anonslarda **Es fährt ein** ve **Einfahrt** biçimleri de aynı sıklıkta.
18. `lx:Ausstieg` boşluk 1 ipucu: `Landshut'ta iniş solda derken` → `İniş, gidiş yönüne göre solda derken`. Kalın kısımda **in Fahrtrichtung** vardı, Türkçesinde yoktu.

**Türkçe çeviri**
19. `lx:einfahren` ö3 ve boşluk 4: `tam şimdi giriyor` → `şu an perona giriyor` (ö4 ile aynı karşılık; "tren giriyor" tek başına eksik).
20. `lx:einfahren` ö5 ve boşluk 5: `perona giriyor mu?` → `artık perona giriyor mu?` (**schon**).
21. `lx:Bauarbeiten` ö1 ve boşluk 1: `Çalışmalar yüzünden … otobüsler çalışıyor` → `… otobüsler sefer yapıyor`.
22. `lx:Zentrum` ö1, boşluk 1 ve ipucu: `Merkeze ne kadar uzak olduğunu` → `Merkezin ne kadar uzakta olduğunu`.
23. `lx:durchgehend` ö4: `gün boyu açık` → `arasız açık` (kartın öteki örneklerinde ve boşluklarında **durchgehend geöffnet** "arasız açık").
24. `lx:Ruhetag` ö3, boşluk 5, ipucu ve eşdizim 4: `bugün kapalı gün!` → `bugün kapalı günleriymiş!`; eşdizim `bugün kapalı günü`.
25. `lx:nachschauen` eşdizim 2: `kısaca bakmak` → `hemen bakmak` (ö2 ile aynı).
26. `lx:nachschauen` ö3: `Dur bir dakika, hemen telefondan bakayım.` → `Dur, telefondan çabucak bakayım.` "Hemen" kartta **kurz** karşılığı; burada **schnell** var.
27. `lx:nachschauen` ö4: `Bugün daha otobüs var mı?` → `Bugün başka otobüs var mı?`
28. `lx:Gewohnheit` ö6: `Almanca çalışmaya çalışıyorum` → `Almanca çalışmayı deniyorum`.

**Kalıp bağları (kartın kendi cümlelerinde olmayan kalıp)**
29. `lx:aufhaben`: `pt:haben-sie` kaldırıldı. **Haben Sie am Samstag auf?** fiilin kendi çekimi; kalıp ise **Haben Sie** + nesne.
30. `lx:Ruhetag`: `pt:haben-sie` kaldırıldı (tek **Haben Sie** cümlesinde nesne yok, **Ruhetag** da yok).
31. `lx:probieren`: `pt:imperativ-sie` kaldırıldı (kartta **Sie** ile emir yok; **Probier mal** sen biçimi).
32. `lx:rauchen`: `pt:perfekt-haben` kaldırıldı (geçmiş zaman **aufhören** fiilinde, **rauchen** kartta hiç geçmiş zamanda değil).
33. `lx:Süßigkeit`: `pt:darf-ich` kaldırıldı (**Dürfen die Kinder** bu kalıp değil).

**`also_ok` eksikleri (haksız ret riski)**
34. `lx:Achtung` boşluk 1: + **Vorsicht** (**Vorsicht an Gleis 2** de gerçek anons biçimi).
35. `lx:abfahren` boşluk 3 ve 5: + **losgefahren**.
36. `lx:Fahrgast` boşluk 1, 2, 4, 5: + **Passagiere**; boşluk 3: + **Passagier**, **Reisender**.
37. `lx:Bauarbeiten` boşluk 3: + **Arbeiten**; boşluk 5: + **Baustelle**, **Baustellen**.
38. `lx:aufhaben` boşluk 1 ve 5: + **geöffnet ist**, **auf ist**; boşluk 2: + **ist … offen**, **ist … geöffnet**, **ist … auf**.
39. `lx:Ruhetag` boşluk 2: + **geschlossen**.
40. `lx:nachschauen` boşluk 5: + **nachgucken**, **gucken**.
41. `lx:unsicher` boşluk 3: + **nicht sicher** (1. ve 5. boşlukta zaten vardı).
42. `lx:probieren` boşluk 1 ve 5: + **versuchen**; boşluk 2: + **Versuch**; boşluk 4: + **versuche**.

## Görev sorularına cevap
1. **Boşluklar:** 130 boşluğun hepsi dolduruldu ve okundu; yanlış çekim yok. İki parçalı cevaplar (**fährt … ab**, **fährt … ein**, **hat … auf**, **Haben … auf**) doğru. Eksik `also_ok` yukarıda (34–42). Var olanlar doğru: **Vorsicht/Achtung** karşılıklı, **weggefahren**, **angekommen**, **Reisende**, **Leute**, **Aussteigen**, **Sicherheit**, **Buslinie**, **Bahnhof**, **Stadtzentrum**, **Pause**, **zu**, **geschlossen**, **nachgesehen**, **gefährlich**, **kosten**, **versucht**, **machst**, **Süßes**, **Angewohnheit**, **Schirm**.
2. **OD-9:** terim, üç nokta, yasak sembol yok (tarama 0). 130 ipucunun 134 kalın parçası doldurulmuş cümlede harfi harfine geçiyor (betikle sınandı, sapma 0). Hata notlarında Türkçe kişi Almanca kişiyle eşleşiyor. 48 hata notunun hepsi kartın kendi kelimesini içeriyor. "X derken" çakışması bir yerde vardı (düzeltme 4). Kuralla çelişen ipucu üç yerde vardı (12, 16, 17). Yazım: **avro** doğru, **Brandl Hanım** biçimi doğru.
3. **Anons ve istasyon olguları:** **Achtung an Gleis 2**, **Liebe Fahrgäste**, **Sehr geehrte Fahrgäste**, **Ausstieg in Fahrtrichtung links/rechts**, **Vorsicht bei der Einfahrt**, **wegen Bauarbeiten** ve hat çalışmasında trenin yerine otobüs gerçek ve genel. **Plattling** gerçek bir aktarma istasyonu. **Hbf** kısaltması doğru. **Dükkân olguları:** küçük şehirde öğle arası, **durchgehend geöffnet** (gece gündüz değil, arasız), lokantada **Ruhetag**, eczane kapısında nöbetçi eczanenin yazması, aralıkta cumartesi erken kapanış doğru ve genel.
4. **WORLD:** `Frau Brandl weiß das bestimmt` (`lx:Öffnungszeiten` ö4) olay eklemiyor, karakterin tanımıyla uyumlu; kaldı. Wimmer Bey satırı adsız kişiye çevrildi (düzeltme 7). Tobi yok. Öğrencinin ağzında sabit ad ya da cinsiyet yok. Yer adları: Wendlfing, Landshut, Regensburg, München, Plattling.
5. **Bairisch/sued:** yok. Katmanlar yalnızca `hd` ve `alltag`. **heut**, **grad**, **Nee**, **hab**, **Mist** gündelik konuşma.
6. **İleri gönderme:** iki yerde vardı (5 ve 6). Görevde sayılan 21 kimlik ve planda günü belli 132. günden sonraki kartlar betikle ve elle arandı; başka yok. **zu** (kapalı), **Die Tür geht zu**, **mitnehmen**, **raus** ayrı sözler, yasaklı kartlar değil. Parti içinde sonraki günün kartını kullanan önceki gün kartı yok. 132.–134. gün kartlarında **ob** cümlesi yok; 135. gün kartlarında **versuchen, … zu** yok.
7. **Seviye (yalnız rapor):** **Hauptbahnhof** A1'e yakın (Bahnhof bilen öğrenci için yeni yük yok; yol sorma kalıbıyla birlikte geldiği için 134. günde yerinde). **Fahrgast**, **Ausstieg** dinleme için A2'de gerekli (her anonsta geçiyor), üretim için B1; kartlar zaten tanıma ağırlıklı. **Notdienst** B1'e yakın ama hayati (pazar günü eczane); A2'de kalmalı. **durchgehend** B1'e yakın; kapı yazısı olarak A2'de yerinde, **durchgehend arbeiten** kullanımı B1. **Gewohnheit** B1'e yakın; günün konusu alışkanlık olduğu için yerinde.
8. **Kalıp bağları:** beş bağ kaldırıldı (29–33), biri ileri gönderme olduğu için (5). Kalan bağların hepsi kartın kendi kelimesini içeren bir cümlede geçiyor. İsim kartlarında bağ, önceki partilerdeki gibi kelimenin içinde durduğu cümlenin kalıbı (örnek: `lx:Richtung` → `pt:perfekt-sein`, **in die falsche Richtung gefahren**).

## Değişen Türkçe alanlar (okur için)
- `exp.ipucu_tr`: `lx:Achtung`, `lx:einfahren`, `lx:probieren`.
- `mistakes_tr`: `lx:Linie` (2.), `lx:Hauptbahnhof` (1., 2.), `lx:unsicher` (2.), `lx:probieren` (2.), `lx:planen` (2.), `lx:rauchen` (1.), `lx:Regenschirm` (2.).
- `hint_tr`: `lx:einfahren` b4, b5; `lx:Ausstieg` b1; `lx:Zentrum` b1; `lx:Ruhetag` b5; `lx:sparen` b4; `lx:planen` b5.
- Örnek ve boşluk çevirileri: `lx:einfahren` ö3, ö5, b4, b5; `lx:Fahrgast` ö3; `lx:Bauarbeiten` ö1, b1; `lx:Zentrum` ö1, b1; `lx:durchgehend` ö4; `lx:Ruhetag` ö3, b5; `lx:nachschauen` ö3, ö4; `lx:sparen` ö6, b4; `lx:planen` ö6, b5; `lx:Gewohnheit` ö6; `lx:Regenschirm` ö5.
- Eşdizim çevirileri: `lx:Achtung` (4.), `lx:Ruhetag` (4.), `lx:nachschauen` (2.).

## Kalan şüpheler (düzeltilmedi)
- **-in hâli (Genitiv):** `lx:Öffnungszeiten` (**der Apotheke**, **der Post**, **des Bürgerbüros**) ve `lx:Zentrum` (**das Zentrum der Stadt**) Genitiv içeriyor; ders B1'de (`gr:b1-08`). Kapı yazısında ve gündelik sözde bu biçim hazır kalıp olarak geçiyor, a2-04'te **die Suppe des Tages** de aynı gerekçeyle kalmıştı. Bırakıldı; karar baş geliştiricide.
- `lx:Notdienst` eşdizim **der ärztliche Notdienst**: resmî ad **ärztlicher Bereitschaftsdienst** (116 117). Halk arasında **Notdienst** deniyor, yanlış değil. Senaryoda numara verilecekse resmî ad kullanılmalı.
- `lx:Notdienst` ö5 **wir haben bis morgen früh geöffnet**: nöbetçi eczane gece çoğu zaman zil ve pencereyle hizmet verir. Cümle yanlış değil, bırakıldı.
- `lx:Hauptbahnhof`: 18.000 kişilik Wendlfing'de **Hauptbahnhof** olmaz. Örnekler şehir adı vermiyor ya da Münih'i söylüyor; senaryoda Wendlfing garı için **Bahnhof** kullanılmalı.
- `lx:Mittagspause` ö1 **ob die Praxis eine Mittagspause hat**: doğru; daha gündelik biçim **ob die Praxis über Mittag zu ist**.
- `lx:Süßigkeit` Türkçesi "şekerleme": doğru ama Türkçede "abur cubur" daha sık. "Abur cubur" tuzluyu da kapsadığı için değiştirilmedi.
- `lx:Vorsicht` ö6 **mit großer Vorsicht**: doğru ama yazı dili; konuşmada **sehr vorsichtig**. **vorsichtig** kart olmadığı için bırakıldı.
- Örneklerde geçen **Fahrtrichtung**, **Nachtisch**, **Stufe**, **Passagier** sözlükte kart değil; cümleler bunlarsız da anlaşılıyor.
- Gün ataması varsayım (yukarıda). Baş geliştirici farklı atarsa parti içi sıra yeniden bakılmalı: `lx:Vorsicht` ö5 **Bauarbeiten**, `lx:durchgehend` ö4 **auf haben**, `lx:Hauptbahnhof` ö5 **Linie** kullanıyor.

## Sonuç
Dil açısından bulunan bütün hatalar dosyada düzeltildi, doğrulayıcı 0 hata.

Sonuç: KAPALI — okur bekliyor

## Fark turu (İÇ-K3, 2026-11-23; inceleme #246 P2-1, P2-2)

- P2-1 **-in hâli** (ders B1, `gr:b1-08`) gündelik biçime çevrildi, cevaplar aynı: `lx:Öffnungszeiten` eşdizim **der Apotheke** → **von der Apotheke**; ö4 ve b5 **der Post** → **von der Post** (ö4 `alltag`); ö6 ve b4 **des Bürgerbüros** → **vom Bürgerbüro** (ipuçları da). `lx:Zentrum` eşdizim **das Zentrum der Stadt** "şehrin merkezi" → **das Zentrum von Wendlfing** "Wendlfing'in merkezi" (aynı gerekçe; **Stadtzentrum** zaten `also_ok`'ta). Yukarıdaki "Kalan şüpheler" ilk maddesi böylece kapandı.
- P2-2 `lx:unsicher` 1. hata notu: `Emin değilim derken **Ich bin nicht unsicher** yanlış …` (gerçek hata değil) → `Telefonda kendimden emin değilim derken **Am Telefon bin ich von mir unsicher** yanlış. Türkçedeki **kendimden** Almancaya geçmez. Doğrusu **Am Telefon bin ich unsicher**.` Türkçedeki "kendimden emin" kalıbından gelen gerçek hata; ö2 ile aynı cümle.
- Değişen Türkçe alanlar (okur için): `lx:unsicher.mistakes_tr[0]`, `lx:Zentrum.collocations[3].tr`; `lx:Öffnungszeiten` b4, b5 `hint_tr` (Türkçe aynı, kalın Almanca değişti).
- `npm run content:validate`: 0 hata. Sonuç: KAPANDI — okur bekliyor.
