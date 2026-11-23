# Sözlük partisi a2-12 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 15 derin kart (A2 tablosu 24. hafta pekiştirme, 162.–166. gün) · dosya: `content/v2/registry/lexicon/batch-a2-12.json`

Gün ataması (`a2-kesin.json` `lex_doldurma` a2-12): 162 dazwischenkommen, Ziffer, Mailbox · 163 untersuchen, nüchtern, krankschreiben · 164 drucken, Ausdruck, Umschlag · 165 Kundenkarte, Reservierung, Rückfahrt · 166 Laune, quatschen, anstoßen.

## Sayılar
- Geçti (değişiklik yok): 4 kart (dazwischenkommen, untersuchen, nüchtern, Umschlag)
- Düzeltildi: 11 kart, **19 düzeltme** (4'ü yalnız `img`, 2'si `freqRank`, 2'si kalıp bağı)
- Kaldı: 0
- Hata oranı: 19 / 15 = 1,27
- `npm run content:validate`: 0 hata, 173 uyarı. Bu partiye ait uyarılar yalnız 7 tane `proposals.json: … kayıtta zaten var` uyarısı (öneri kartları kullanıldığı için bekleniyor).
- `review`: `draft` (okur bekliyor, alana dokunulmadı)

## Düzeltmeler (önce → sonra, gerekçe)

**Almanca, gerçeklik ve kültür**
1. `lx:anstoßen` ö2, eşdizim 3, b2, `ipucu_tr`: **mit Wasser anstoßen** → **mit Saft anstoßen**. Almanya'da suyla kadeh tokuşturmak yaygın bir batıl inanca göre uğursuzluktur. Çok kişi "Mit Wasser stößt man nicht an!" diye uyarır. Alkol içmeyen öğrenciye "sorun değil, suyla tokuştururuz" demeyi öğretmek onu gerçek bir davette zor durumda bırakır. **Saft** 129. günün kartı. Türkçe: ö2 `– Ben bugün sadece meyve suyu içiyorum. – Sorun değil, meyve suyuyla kadeh tokuştururuz.`, eşdizim `meyve suyuyla kadeh tokuşturmak`, b2 `Sorun değil, meyve suyuyla kadeh tokuştururuz.`, ipucu `Alkol içmiyorsan **mit Saft anstoßen** olur.` (İnancın kendisi içeriğe yazılmadı, olgusal iddia eklenmedi.)
2. `lx:krankschreiben` ö5: `… schicke ich die Krankmeldung heute noch an meine Firma.` / `raporu daha bugün şirketime gönderirim` → `Wenn Sie mich krankschreiben, rufe ich heute noch meinen Chef an.` / `Bana rapor verirseniz daha bugün şefimi ararım.` 2023'ten beri yasal sigortalılarda doktor raporu işverene elektronik gidiyor, çalışan kâğıt rapor göndermiyor (eAU). Türkçe "raporu gönderirim" öğrenciye eski ve yanlış bir süreç öğretiyordu. Yeni cümle olgusal iddia taşımıyor. Asıl yapılması gereken (işe haber vermek) de bu.
3. `lx:Kundenkarte` eşdizim 3: `Punkte sammeln` / `puan toplamak` → `eine Kundenkarte bekommen` / `müşteri kartı almak`. Eşdizimde kartın kendi sözcüğü yoktu.

**Kimlik (D-061)**
4. `lx:Reservierung` `ipucu_tr`: `Restorana girince **Wir haben eine Reservierung auf den Namen Wagner** dersin.` → `Restorana girince **Wir haben eine Reservierung auf den Namen** dersin, sonra adını söylersin.` "Sen … Wagner dersin" öğrenciye sabit bir ad veriyordu. Örnek cümle (ö1) ve not yerinde kaldı, orada **wir** başka biri adına da olabilir.
5.–8. `img` (öğrencinin ağzındaki **ich** cümlesinde cinsiyet sabitlenmesin; önceki partilerde böyle bir örnek yok): `lx:Mailbox` ö1, ö2, ö3, ö5 `woman/man …` → `person …`; `lx:drucken` ö1, `lx:Kundenkarte` ö5, `lx:Reservierung` ö4 `woman …` → `person …`.

**Hata notları (`mistakes_tr`)**
9. `lx:Mailbox`: `**Mailbox** sözünü ma-il-boks diye okumak yanlış. Doğrusu meyl-boks.` → `Sesli mesaj bıraktım derken **Ich habe der Mailbox gesprochen** yanlış. Doğrusu **Ich habe auf die Mailbox gesprochen**.` Türkçede "mail" zaten "meyl" diye söyleniyor, eski not Türkçe konuşana özgü bir hata değildi. Yeni not Türkçedeki "-e"nin **der** diye aktarılmasını gösteriyor (`lx:Anrufbeantworter` notunun cep telefonu karşılığı). Tek fark **der** → **auf die**.
10. `lx:quatschen`: `… **Können wir kurz quatschen?** kulağa laubali gelir. Doğrusu **Können wir kurz sprechen?**` → `… fazla laubali kaçar. Daha uygunu **Können wir kurz sprechen?**` Cümle doğru Almanca, yalnız şefe karşı fazla gündelik. "Doğrusu" onu yanlış gibi gösteriyordu (brif md. 6).
11. `lx:Ausdruck` + 2. not: `İki çıktı derken **zwei Ausdrücke** denmez, **Ausdrücke** ifadeler demek. Doğrusu **zwei Ausdrucke**.` Görevdeki istek: `lx:Ausdruck#2` (ifade, 114. gün, çoğulu **Ausdrücke**) ile karışmasın. İki anlamın çoğulu ayrı (Duden). Öğrenci **Ausdrücke**'yi 114. günde gördü.

**Açıklama (`exp.ipucu_tr`)**
12. `lx:Ziffer`: `Numarayı tam duymadıysan …` → `Numaranın sonunu tam duymadıysan **Könnten Sie die letzten Ziffern wiederholen?** diye sorarsın.` Kalın parça yalnız son rakamları soruyor.
13. `lx:Rückfahrt`: `Gidiş dönüş bilet isterken kısaca **hin und zurück** da dersin.` → `… **Hin- und Rückfahrt** ya da kısaca **hin und zurück** dersin.` Not kartın kendi sözcüğünü anlatmıyordu (brif md. 3).
14. `lx:Laune`: `Keyfi yerinde olan biri için **Er hat gute Laune** dersin.` → `Birinin keyfi kaçık görünüyorsa **Hast du schlechte Laune?** diye sorarsın.` "biri" ile **Er** genel kural gibi okunuyordu (kadın için **Sie hat**, a2-10 Karriere sorunu). Yeni not `ne_zaman_tr`'deki "molada birinin keyfini sorarken" durumuna da uyuyor. b2'deki **Ich habe gute Laune** ile aynı cümle olmaktan çıktı.
15. `lx:quatschen`: `Molada duyduğun **Quatsch!** saçmalık demektir, …` → `**Quatsch!** saçmalık demektir, **quatschen** ise laflamak.` **Quatsch!** yalnız molada duyulmaz. Ayrıca doğrulayıcı tek cümle istiyor.

**Kalıp bağı**
16. `lx:Ziffer`: `pt:ich-habe` çıkarıldı. Kartta **Ich habe** + ad yok (ö4 **Sie hat vier Ziffern**). 2 kalıp kaldı.
17. `lx:Reservierung`: `pt:ich-habe` çıkarıldı. Kartta yalnız **wir haben** / **Haben Sie** var, bunlar `pt:haben-sie` ile bağlı. 3 kalıp kaldı.

**Sıklık**
18. `lx:drucken`: `freqRank: 1131` çıkarıldı. Satır `drucken`, ama biçimleri **druck, drucken, gedruckt**. **Druck** (baskı, basınç, **unter Druck**) adı sayıya karışıyor.
19. `lx:quatschen`: `freqRank: 1162` çıkarıldı. Satırın biçimleri **quatsch, quatschen**. Sayının büyük kısmı ünlem **Quatsch!**. a2-11'deki **Rat** (satır `raten`) ve **Form** (satır `formen`) kararıyla aynı ölçüt.

## lex'in açık notlarına cevap
- **also_ok ausdrucken / ausgedruckt (drucken b1, b2, b3):** Kaldı. Doğru ve konuşmada **drucken**'dan daha sık. Ayrıca `lx:Drucker` (65. gün) notu **Ich drucke das aus** biçimini zaten gösteriyor. B1 kartı olmasının sakıncası yok, çünkü also_ok ekranda görünmüyor.
- **also_ok Buchung (Reservierung b3):** Kaldı. **meine Buchung absagen** otel ve tren için doğru ve sık. **buchen** 102. günden beri biliniyor (`lx:buchen`), ad ondan türüyor.
- **also_ok Heimfahrt (Rückfahrt b2, b3):** Kaldı. **Auf der Heimfahrt …** ve **Wie war die Heimfahrt?** doğru ve sık, anlam aynı (eve dönüş).
- **freqRank:** untersuchen 1223, nüchtern 3785, Laune 2733 doğru (tek biçimli ya da çekimli satır, kendi sayısı). Umschlag 3835 doğru sayılır: satır adı `umschlagen` (lemma hatası) ama tek biçimi **umschlag**, sayı adın kendisi. drucken ve quatschen çıkarıldı (18, 19). **Ausdruck** satırı (2751, çoğulu **Ausdrücke**) "ifade" anlamını sayıyor. "Çıktı" kartına eklenmemesi doğru.
- **Olgusal iddia (krankschreiben, nüchtern):** krankschreiben'de rapor süresi kuralı yok. Süreler (**bis Freitag**, **für drei Tage**, **die ganze Woche**) tek bir doktorun sözü. Kâğıt rapor gönderme cümlesi değiştirildi (2). nüchtern'de "kaç saat aç kalınır" yok. ö2'deki **Wasser dürfen Sie trinken** muayenehanenin olağan sözü, kural olarak sunulmuyor. `SOURCES.md`'ye satır gerekmedi.

## Denetim
- **İleri gönderme (betik + elle):** örnek, eşdizim, boşluk, ipucu, not ve also_ok'taki bütün sözcükler kart günleriyle karşılaştırıldı (m1 + a1/a2/b1-kesin). 162 ve sonraki günlerin kartı ya da B1 kartı (Kopie, Anhang) yok. Kartsız olanlar: özel adlar (**Pichler**, **Wimmer**, **Derya**, **Dr. Weber**, **Wagner**, **München**), also_ok'taki bileşik sözler (**Briefumschlag**, **Heimfahrt**, **Buchung**, **ausgedruckt**), hata notundaki **Reservation** ve **geuntersucht**, ipucundaki **Quatsch!** (Türkçesiyle veriliyor), parçalardaki **Druck** (Türkçesiyle). **Oberkörper** 158., **zurückfahren** 149., **vorlesen** 149., **Briefmarke** 142., **mitbringen** 137., **hätte/würde** 157., **um … zu** 158. günde öğretilmiş.
- **Fiil alanları:** dazwischenkommen (kam dazwischen, **ist** dazwischengekommen, dat), untersuchen (untersuchte, hat untersucht, ön ek ayrılmaz), krankschreiben (schrieb krank, hat krankgeschrieben, ayrılır), drucken (druckte, hat gedruckt), quatschen (quatschte, hat gequatscht, mit/über), anstoßen (stößt an, stieß an, hat angestoßen, auf) doğru.
- **Ad alanları:** die Ziffer/Ziffern, die Mailbox/Mailboxen, der Ausdruck/Ausdrucke, der Umschlag/Umschläge, die Kundenkarte/-n, die Reservierung/-en, die Rückfahrt/-en, die Laune/-n doğru.
- **Öneri kartları:** Mailbox, krankschreiben, Ausdruck önerilerle uyumlu (`tr`, `pos`, `art`, `pl`, `verb`, `level`). `domains` genişletilmiş.
- **Kalıp bağları:** kalan bütün bağlar kartın kendi sözcüğünün geçtiği bir örnekte var. `lx:untersuchen` `pt:ich-muss` bağı **Wir müssen Ihr Blut untersuchen** ile kuruluyor, kalıbın çerçevesi (**Ich muss … · Muss ich …? · Sie müssen nicht**) bunu kapsıyor sayıldı.
- **Boşluk ipuçları:** 60 ipucunun bütün kalın parçaları, doldurulmuş cümlede harfi harfine geçiyor (betik: sapma 0). Her boşlukta tek `___` var. Ayrılan fiillerde cevap tek parça (krank, an, angestoßen, krankgeschrieben).
- **WORLD:** aile hekimi Dr. Weber (untersuchen ö5, b4), şef Wimmer Bey (krankschreiben ö4), iş arkadaşı Derya (Laune ö2), apartman görevlisi Pichler Bey (Mailbox ö2) WORLD'e uygun. Tobi yok. Tarihli yeni olay yok.
- **Kimlik:** öğrencinin ağzında sabit ad ya da cinsiyet yok (4–8 sonrası). Bairisch yok. İngilizce köprü yok (yalnız `img`). Kişisel bilgi, kurs ya da kitap adı yok.
- **OD-9:** dilbilgisi terimi taraması 0 (betiğin "ek" alarmları "gerek", "etmek" gibi sözlerde yanlış alarm). Üç nokta, `;`, tırnak yok. Para geçmiyor.

## Değişen Türkçe alanlar (okur için, 14 satır)
- `mistakes_tr` (3): `lx:Mailbox` (1.), `lx:Ausdruck` (2., yeni), `lx:quatschen` (1.).
- `exp.ipucu_tr` (6): `lx:Ziffer`, `lx:Reservierung`, `lx:Rückfahrt`, `lx:Laune`, `lx:quatschen`, `lx:anstoßen`.
- Örnek çevirileri (2): `lx:krankschreiben` ö5, `lx:anstoßen` ö2.
- Eşdizim `tr` (2): `lx:Kundenkarte` 3., `lx:anstoßen` 3.
- Boşluk `tr` (1): `lx:anstoßen` b2.

## Kalan şüpheler (düzeltilmedi)
- `lx:drucken` ö2 ve b3 **Können Sie es mir drucken?**: konuşmada **ausdrucken** daha doğal. **drucken** de doğru ve kartın sözcüğü. b3 **ausdrucken** biçimini kabul ediyor.
- `lx:Rückfahrt` ö5 ve b4 **Auf der Rückfahrt werden wir in München umsteigen.**: plan için gündelik Almanca çoğu zaman şimdiki zamanı kullanır (**steigen wir … um**). **werden** doğru ve 155. günün dersi, bırakıldı.
- `lx:Kundenkarte` b4 also_ok **gelassen** ("evde bıraktım"): anlamı "unuttum"a çok yakın, haksız reti önlüyor. Bırakıldı.
- `lx:untersuchen` ö5 ve b4 `kalbimi muayene etmek istiyor`: Türkçede "kalbime bakmak" daha doğal. Anlam doğru, bırakıldı.
- `lx:anstoßen`: suyla kadeh tokuşturma inancı içeriğe yazılmadı. İstenirse sonraki bir kültür notunda kaynakla verilebilir.
- `tier`: Laune, nüchtern, Umschlag satırları K2. Kartlarda K1 yazıyor. A2 partilerinin ortak yolu bu (İÇ-K3).
- Süreç notu: bu turda yanlışlıkla bir kez salt okunur `git diff --stat` çalıştırıldı (yalnız sayım, ağaçta değişiklik yok).

## Sonuç
Bulunan bütün hatalar dosyada düzeltildi. Doğrulayıcı 0 hata verdi.

Sonuç: KAPANDI, okur bekliyor

## Fark turu (2026-11-23): okurun 1 GERİ satırı
- `lx:anstoßen.mistakes_tr[1]`: `Kadeh kaldırıyoruz derken **Wir anstoßen auf dich** yanlış. Doğrusu **Wir stoßen auf dich an**.` → `Kadeh kaldırıyoruz derken **Wir anstoßen** yanlış. Doğrusu **Wir stoßen an**.` Okurun 2. önerisini uyguladım: Türkçede karşılığı olmayan **auf dich** Almancadan çıktı. Not artık tek fikir anlatıyor (**an** sona gider) ve 1. notla (**für dich** / **auf dich**) aynı cümle olmaktan çıktı. **Wir stoßen an** tek başına doğru ve sık.
- Değişen Türkçe satır: 1 (okur yalnız bunu yeniden okur). `npm run content:validate`: 0 hata. `review`: `draft`.
