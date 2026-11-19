# Sözlük taslak incelemesi, grup 03

İnceleyen: dilbilimci-ajan · 2026-11-19 · 50 kart (kart verisi, örnekler, eşdizimler, `forms`, açık OD-9 hataları)

## Sayılar
- Geçti: 30
- Düzeltildi: 20
- Kaldı: 0
- Hata oranı: 20 kart / 50 = 0,40. Yama OD-9 lint'inden geçti (sorunlu 0). Yama sözlüğe uygulanmadı.

## Düzeltmeler (önce → sonra, gerekçe)

**Örnek kartın kelimesini kullanmıyordu (başka kelime ya da yalnızca bileşik)**
- `lx:öffnen` ö3: `Mach mal auf, ich bin's!` → `Die Datei lässt sich nicht öffnen.` (**aufmachen** örneğiydi).
- `lx:verletzen` ö3: `Hast du dir wehgetan?` → `Hast du dich verletzt?`
- `lx:reisen` ö2, ö3: `Wie war die Reise?`, `Gute Reise!` → `Wir reisen im Sommer nach Spanien.`, `Ich reise am liebsten mit dem Zug.` (örnekler **die Reise** kelimesini gösteriyordu).
- `lx:steigen` ö1, ö3, ö4: `Wo muss ich aussteigen?`, `Steig ein!`, `Muss ich umsteigen?` → `Die Temperaturen steigen morgen auf 30 Grad.`, `Steig ins Auto, wir fahren!`, `Ich steige lieber aufs Fahrrad.` (dört örneğin üçü başka fiildi; **aussteigen** ve **umsteigen** kendi kartına sahip). Aynı nedenle 2. hata notu (**aussteigen**) → `Die Preise haben gestiegen` / `sind gestiegen`; `forms` 2 ve 3 (`Wo ___ ich aus?`, `___ du hier ein?`) → `Ich ___ nie auf eine Leiter.`, `___ du gern auf Berge?`
- `lx:laden` ö2: `Laden Sie die App herunter.` → `Wir laden die Koffer ins Auto.` (**herunterladen**; yeni örnek ikinci anlamı da gösteriyor).
- `lx:hängen` ö3: `Das hängt davon ab.` → `Häng die Jacke einfach über den Stuhl.` (**abhängen**).
- `lx:bauen` ö2: `Wir bauen das Regal zusammen.` → `Wir bauen das Regal selbst.` (**zusammenbauen**).
- `lx:schwarz` ö3: `Schwarzfahren wird teuer!` → `Der Toast ist ja ganz schwarz!`
- `lx:Dame` ö3: `Die Damentoilette ist oben.` → `Die Dame vor mir hat ewig gebraucht.`
- `lx:Foto` ö2: `... brauchen Sie ein Passfoto.` → `Das Foto für den Ausweis muss aktuell sein.`

**Eşdizim listesinde akraba ya da türemiş kelime**
- `lx:reisen` (`die Reise`, `Gute Reise!`), `lx:steigen` (`einsteigen`, `aussteigen`, `Bitte einsteigen!`), `lx:laden` (`herunterladen`), `lx:hängen` (`Wäsche aufhängen`, `Das hängt davon ab.`), `lx:bauen` (`ein Regal zusammenbauen`), `lx:schwarz` (`schwarzfahren`), `lx:Dame` (`die Damentoilette`), `lx:Buch` (`das Kochbuch`, `in der Buchhandlung`), `lx:Foto` (`ein Passfoto`): gerçek öbeklerle değiştirildi.

**Yazım**
- `lx:hierher` ö1 ve iki eşdizim: `hierher gekommen`, `hierher kommen` → ayrı yazım yanlış (doğrusu bitişik **hierherkommen**, **hierhergekommen**). Kartın kelimesi ayrı durduğu cümlelerle değiştirildi: `Der Bus fährt nicht bis hierher.`, `Setz dich hierher!`, `auf dem Weg hierher`.

**Doğallık**
- `lx:Menge` ö2: `In der Stadt war eine große Menge Leute.` → `Die Menge reicht für vier Personen.` (doğal değil; yeni örnek `miktar` anlamını gösteriyor).

**Gerçek kişi**
- `lx:König` ö4 ve eşdizim: `König Ludwig der Zweite`, `König Ludwig` → `Ein bayerischer König.`, `der König und die Königin`.

**Katman**
- `lx:Arsch`, `lx:irgendwas`, `lx:klappen`, `lx:Papa` ö1 ve ö2: `hd` → `alltag` (kelimeler konuşma dili; `register` `informal`).

**Açık OD-9 hataları**
- Kartsız üç girdi (`lx:außer`, `lx:irgendwas`, `lx:sondern`): `mistakes_tr` terim (Dativ, kelime sırası) ve düz tırnakla yazılmıştı; yeniden yazıldı.
- `lx:sondern` `tr`: `bilakis, (değil) … -dir` → `aksine, değil de` (ek, parantez, üç nokta); eşdizimler üç noktalı kalıptan somut öbeğe çevrildi; ö2 çevirisinde özne `O` → `Adam`.
- `lx:Papa` ö4 çevirisi: `babaannem` → `büyükannem` (**Oma** iki tarafı da kapsar).

Değişen örneklerin fotoğraf sorguları yeni cümleye göre yazıldı (`ex_img`); sahnesi değişmeyenler (`lx:verletzen` ö3, `lx:steigen` ö3, `lx:bauen` ö2, `lx:Foto` ö2, `lx:König` ö4) eski sorguyla kaldı.

## Değişen Türkçe alanlar (okur için)
- `tr`: `lx:sondern`.
- `mistakes_tr` (tam liste): `lx:außer`, `lx:irgendwas`, `lx:sondern`, `lx:steigen` (yalnızca 2. not yeni).
- Örnek çevirileri: `lx:König` ö4, `lx:Papa` ö4, `lx:sondern` ö2, `lx:öffnen` ö3, `lx:verletzen` ö3, `lx:Dame` ö3, `lx:Menge` ö2, `lx:hierher` ö1, `lx:reisen` ö2 ve ö3, `lx:bauen` ö2, `lx:schwarz` ö3, `lx:steigen` ö1, ö3, ö4, `lx:laden` ö2, `lx:hängen` ö3, `lx:Foto` ö2.
- Eşdizim çevirileri: `lx:König` (2.), `lx:sondern` (ikisi), `lx:Dame` (2.), `lx:hierher` (3., 4.), `lx:reisen` (1., 2.), `lx:bauen` (3.), `lx:schwarz` (2.), `lx:steigen` (3., 4., 6.), `lx:laden` (2.), `lx:hängen` (3., 4.), `lx:Buch` (2., 5.), `lx:Foto` (2.).
- `forms`: `lx:steigen` 2. ve 3. madde (cümle ve `tr`).

## Kalan kartlar
Yok.

## Kalan şüpheler (düzeltilmedi)
- Kartsız üç girdide `exp` yok; yazılması lex ya da yazarın işi (grup 02 ile aynı not).
- `lx:reisen`, `lx:Buch`, `lx:Foto`, `lx:Dame`, `lx:öffnen`: `exp.ipucu_tr` hâlâ komşu kelimeyi anlatıyor (**Gute Reise**, **das Kochbuch**, **das Passfoto**, **Damen**, **aufmachen**). Öğretici ve okurdan geçti; dokunulmadı.
- `lx:laden` 2. hata notu **einladen** üzerine; kartın kelimesiyle gerçek karışma olduğu için kaldı.
- `lx:steigen`: kartsız **einsteigen** sözlükte yok (**aussteigen**, **umsteigen** var); eksik kart lex'e not.
- `lx:hängen`: `hat gehangen` standart; Bavyera'da `ist gehangen` da duyulur, karta yazılmadı (kaynak yok).
- `lx:verletzen` ö2 ile ö4'ün ilk cümlesi aynı (`Ist jemand verletzt?`); hata değil, tekrar.
- `lx:außer` düzeyi B1; A2 daha uygun olabilir, kaynak listeyle doğrulanmadı.
- Tanımlık boşluklarında cevap yalnızca Türkçe çeviriyle tekleşiyor (önceki gruplarla aynı kabul).

## Sonuç
KAPANDI (20 kart düzeltildi; değişen Türkçe alanlar okura gitmeli).
