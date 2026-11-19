# Dilbilimci incelemesi: #58 B6 grup 02

İncelenen: 75 kart (parti 010 ve 011). Yama: `b6-02.dil.json`, 49 kart, 69 düzeltme. Hata oranı 69/75 = 0,92.
Lint ve `content:validate` çalıştırılmadı (görev gereği baş geliştirici çalıştırır). Sonuç: **AÇIK** (aşağıdaki açık noktalar ve lint bekliyor).

## İncelenen kimlikler
fremd, vermissen, Gericht, links, kaputt, gesund, ankommen, Hose, rechts, Flasche, Küche, Glückwunsch, Kunde, Aufgabe, aufstehen, warm, Insel, frühstücken, Messer, bestellen, unterschreiben, fernsehen, See, Bus, Restaurant, reparieren, Meer, Gast, studieren, Kurs, schwimmen, scharf, Rechnung, Kuchen, Wunsch, Stuhl, Sprache, Milch, Vorschlag, Hemd, Kleid, Größe, gratulieren, streng, Freundschaft, Jacke, ausgeben, billig, hell, abnehmen, leihen, Mantel, Schrank, empfehlen, lecker, Heimat, aussteigen, umziehen, Ei, Konto, eröffnen, Prüfung, aufwachsen, Tunnel, pünktlich, Training, Ausweis, einkaufen, Kindheit, regnen, Jugend, vorschlagen, Note, Hausaufgabe, Fahrrad.

## Düzeltmeler (tür ve sayı)

**1. İki parçalı fiil ipucu, 10 kart** (grup 01 hatasının tekrarı): `**ich** ile **komme** başa, **an** sona gelir` → `**ich** ile **komme** olur, **an** sona gider`. Başta **Ich** ya da soru kelimesi var, fiil başta değil. Kartlar: ankommen, aufstehen, fernsehen, ausgeben, abnehmen, aussteigen, umziehen, aufwachsen, einkaufen, vorschlagen.

**2. Cevap tek değil ya da doğal olmayan biçim öğretiliyor, 9 kart**
- Hose `Zu ___ Hose` (**der**), Hemd `Zu ___ Hemd` (**dem**), Kleid `Zu ___ Kleid` (**dem**), Rechnung `zu ___ Rechnung` (**der**): gündelik biçim **zur** / **zum**. Cümleler birleşmeyen **mit** ve **auf** ile değişti (`Ich bin mit ___ Hose zufrieden.`, `Auf ___ Rechnung steht ein falscher Betrag.`). Böylece **zu dem** / **zum** ikilemi kalmadı.
- Schrank `in ___ Schrank` (**dem**) → `Die Gläser sind ___ Schrank.` (**im**); ipucundaki `in dem ya da kısaca im` kalktı. Meer, See, Kurs kartlarındaki **im** / **am** / **zum** boşluklarıyla aynı düzen.
- Tunnel `drei ___` (**Tunnel**): **Tunnels** de doğru bir çoğul. Madde `Nach ___ Tunnel sind wir gleich da.` (**dem**) ile değişti. Kartın `pl: Tunnel` alanı doğru, dokunulmadı.
- Sprache `Welche ___ sprechen Sie?`: **Sprache** de girer → `Wie viele ___ sprechen Sie?`.
- Hausaufgabe `Ich mache jetzt meine ___.`: **Hausaufgabe** de girer → `Meine ___ sind fertig.`.
- Messer `mit ___ Messer`: Türkçe `bıçakla` **dem** ile **einem** arasında ayırt etmiyordu → `mit ___ großen Messer`, `büyük bıçakla`.

**3. Çeviri cevabı başka kelimeye çekiyor, 8 madde**
- Aufgabe iki madde ve Sprache: `Bu görev`, `Bu dil` **diese** çağırıyor, cevap **die** / **der** → `Görev`, `Görevde`, `Dil`.
- Heimat `in ___ Heimat` (**die**): `memleketine` **ihre** çağırıyor → `memlekete`.
- Jacke `in ___ Jacke` (**der**): `montun içinde` senin montun diye de okunuyor → `Telefon montta.`
- Kurs `Ich mache einen Kurs`: `kursa gidiyorum` aynı karttaki **zum Kurs** ile karışıyor → `kursa katılıyorum`.
- Note `Welche ___`: `Kaç aldın?` kelimeyi göstermiyor → `Hangi notu aldın?` (örnek 1 ile birlikte).
- Größe: `Bu pantolonun` → `Pantolonun`.

**4. Aynı Almancaya farklı Türkçe, 15 madde**
- Gericht (örnek 2), kaputt (örnek 2), Glückwunsch (örnek 2), Aufgabe (örnek 3), Note (örnek 1): örnek çevirisi aynı cümlenin `forms` çevirisine eşitlendi.
- links: `links neben der Bank` örnekte `solda, bankanın yanında`, eşdizimde `bankanın solunda` → `Eczane bankanın solunda.`
- See: **Am See** → `Göl kenarındaydık`.
- Kuchen: **ein Stück Kuchen** eşdizimde ve örnek 4 içinde `pasta`, maddede `kek` → `kek`.
- Jugend: **die Jugend von heute** → her yerde `bugünün gençleri`.
- Gericht: **empfehlen** bu kartta `önermek`, kendi kartında `tavsiye etmek` → `tavsiye etmek` (madde, eşdizim, örnek 1).
- **Der Chef**: unterschreiben, gratulieren, vorschlagen kartlarında `Şef`, streng kartında `patron` → `Patron`.
- Kleid: **zu teuer** `çok pahalı` → `fazla pahalı` (madde ve örnek 1; öbür kartlarda **zu** hep `fazla`).
- Wunsch örnek 4: **ich hätte gern** `rica ediyorum` → `istiyorum`.

**5. Hata notları, 17 kart**
- Tek harf ya da tek ek farkına neden eklendi: Hose, Küche, Kunde, Aufgabe, Messer, Restaurant (iki not), Kuchen, Vorschlag, Schrank, Heimat, Ei, Kindheit, fernsehen, empfehlen.
- Özne **O** kaldırıldı: fernsehen `O televizyon izliyor` → `Adam televizyon izliyor`; empfehlen `O tavsiye ediyor` → `Garson çorbayı tavsiye ediyor`.
- Gericht: `Bu yemek derken **der Gericht**` (bu = **dieses**) cümle içinde yeniden yazıldı; Türkçe konuşana özgü ikinci not eklendi: `Akşam yemeği derken **Abendgericht** yanlış. Doğrusu **Abendessen**.`
- frühstücken: `bu hazırlıyorum demektir` → `bu kahvaltı hazırlıyorum demektir`.
- scharf: **bitter** için `ilaç gibi acı demektir` açıklaması eklendi.

**6. Çift okunan ya da eksik Türkçe, 9 madde**
- scharf `scharf essen | acı yemek` (acı bir yemek diye de okunur) → `acılı yemek yemek`.
- einkaufen örnek 2: `her cuma pazardan` (gün ve yer) → `semt pazarından`.
- billig `billiger als | daha ucuz` → `bir şeyden daha ucuz`.
- Glückwunsch `doğum günü kutlaması` (parti diye okunur) → `doğum günü tebriği`.
- Sprache `ana dili` → `ana dil`.
- Gast `Brandl Hanım'a konuğuz` → `Brandl Hanım'ın konuğuyuz`.
- Flasche örnek 3: **noch 'ne Flasche** `Bir şişe de` → `Bir şişe daha`.
- leihen örnek 4: **ich leihe dir meinen** `veririm` → `ödünç veririm`.
- Prüfung: `**Ich habe** dedikten sonra` iki ipucunda bir **eine** bir **die** veriyordu; başlarına `Herhangi bir sınav:` ve `Bildiğimiz sınav:` eklendi.

**7. Katman, 1 madde**: ankommen örnek 4 `hd` katmanında **ich steh** → **ich stehe**.

## Lex'in sorduğu kartlar
- **Kleid, Hemd** (ve aynı sorunu taşıyan Hose, Rechnung): cümle değişti, cevap tek (**dem** / **der**).
- **aufwachsen**: Almanca ve seçilen biçimler doğru (**ich** / **du** şimdiki zamanı yerine **Unser Sohn**, **Viele Kinder** ve geçmiş iyi seçim). Yalnız ipucu kalıbı düzeltildi.
- **Tunnel**: çoğul maddesi çıkarıldı (yukarıda).
- **Schrank**: boşluk **im** oldu.
- **Gericht**: biçimler doğru; **ein** / **das** ayrımını Türkçe çeviri yapıyor (`bir yemek` / `yemeği`). Çeviri ve hata notu düzeltildi.

## Açık noktalar
1. **Der Chef → Patron** yalnız bu grupta eşitlendi. Öbür gruplarda `Şef` geçiyorsa sözlük genelinde tek karşılık seçilmeli.
2. **empfehlen**: bu grupta `tavsiye etmek`, **vorschlagen** `önermek`. Öbür gruplarda **empfehlen** için `önermek` varsa aynı eşitleme gerekir.
3. **lecker** örnek 1: `Gerti'nin Brezeleri`. **Brezen** Türkçe okur için çevirisiz kalıyor; sözlük genelindeki karşılık bilinmeden değiştirilmedi.
4. **Training** `Ich gehe ___ Training.` (**zum**): Güney Almanya'da **ins Training** de söylenir. Düşük risk, bırakıldı.
5. **Kunde** `Ich rufe ___ Kunden zurück.` (**den**) ve `Ich helfe ___ Kunden.` (**dem**): **Kunden** çok müşteri diye okunursa **die** / **den** de girer. Ayrımı Türkçedeki `Müşteriyi`, `Müşteriye` yapıyor; bırakıldı.
6. Belirli ve belirsiz biçim maddelerinin çoğunda (`Kannst du ___ Flasche aufmachen?` gibi) ikinci biçim de dilbilgisi olarak girer; ayrımı yalnız Türkçe çeviri yapıyor. Bu, şablonun bilinen sınırı; grup genelinde çeviriler ayrımı doğru veriyor.
7. Kartın kelimesi boşluk olan maddelerde (`Nach der Arbeit bin ich total ___.` → **kaputt**; **müde** de girer) cevap, kartın kelimesi olduğu için kabul edildi.
8. **gesund** `Ich esse jetzt ___.` (**gesünder**): **gesunder** de doğru ama seyrek; bırakıldı.

Fotoğraf sorgularında yanıltıcı olan bulunmadı. Kişisel bilgi, kurs ya da kitap adı, sabit öğrenci cinsiyeti yok (Kunde örnek 1 yer tutuculu).
