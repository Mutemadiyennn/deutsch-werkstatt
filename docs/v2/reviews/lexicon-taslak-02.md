# Sözlük taslak incelemesi, grup 02

İncelenen: 50 kart (tam inceleme: kart verisi, örnekler, eşdizimler, `forms`, açık OD-9 hataları).
Sonuç: 38 geçti, 12 düzeltildi, 0 kaldı. Hata oranı 12/50 = 0,24. Yama OD-9 lint'inden geçti (sorunlu 0).

## Düzeltmeler (önce → sonra, gerekçe)

**Örnek kartın kelimesini kullanmıyordu**
- `lx:zwischen` ö3: `Bleibt unter uns, ne?` → `Zwischen uns ist alles gut, oder?` (örnekte **zwischen** yoktu).
- `lx:Blut` ö2: `Die Wunde blutet stark.` → `Ich kann kein Blut sehen.` (örnek **bluten** fiilini gösteriyordu).
- `lx:solcher` ö2, ö3: `Ich habe so etwas noch nie gesehen.`, `So 'n Quatsch!` → `Bei solchem Wetter bleibe ich zu Hause.`, `Solche Sachen passieren halt.`
- `lx:Wiedersehen` ö2: `Auf Wiederhören, Frau Wagner.` → `Auf Wiedersehen, Frau Wagner, bis nächste Woche!`; eşdizimde `Auf Wiederhören!` → `Auf Wiedersehen, bis morgen!` (fark hata notunda ve ipucunda zaten anlatılıyor).
- `lx:Teil` ö2: `Das Ersatzteil kommt morgen.` → `Der erste Teil der Prüfung ist schriftlich.` (kart **der Teil**; dört örnekten ikisi **das** ile geliyordu. ö3 **das Teil** ipucuyla birlikte kaldı).
- `lx:falls` eşdizim: `für den Fall, dass …` → `falls möglich`.

**Doğallık ve sahne**
- `lx:schießen` ö4: `unser Stürmer hat geschossen` → `unser Stürmer hat das Tor geschossen` (nesnesiz hâli gol attı anlamını vermiyor).
- `lx:schießen` ö2 ve `forms[3]`: `Die Polizei hat nicht geschossen.` → ö2 `Er hat aus zwanzig Metern aufs Tor geschossen.`, form `Wer hat das Tor ___?` (silahlı sahne; şiddet sahnesi kuralı). ö2 fotoğraf sorgusu yeni cümleye göre değişti.

**Katman**
- `lx:drauf`, `lx:Zeug`, `lx:bloß` ö1 ve ö2: `hd` → `alltag` (kelimeler konuşma dili; onaylı partilerdeki `informal` kartlarla aynı düzen).

**Açık OD-9 hataları (kartsız altı girdinin eski biçimli alanları)**
- `lx:zwischen`, `lx:während`, `lx:solcher`, `lx:bloß`, `lx:falls`, `lx:derselbe`: `mistakes_tr` terimle (Dativ, Akkusativ, Genitiv, tekil, çoğul, bağlaç, fiil) ve düz tırnakla yazılmıştı; Türkçe niyetle başlayan biçimde yeniden yazıldı.
- `tr` içinde ek ve parantez: `lx:während` (`-ken`), `lx:falls` (`…-irse diye`), `lx:derselbe` (`(kendisi)`), `lx:bloß` (`(vurgu) sakın, bari`); `lx:bloß` eşdizim çevirisi `sakın … -me` → `Sakın ha!`.

## Değişen Türkçe alanlar (okur için)
- `tr`: `lx:während`, `lx:bloß`, `lx:falls`, `lx:derselbe`.
- `mistakes_tr` (tam liste): `lx:zwischen`, `lx:während`, `lx:solcher`, `lx:bloß`, `lx:falls`, `lx:derselbe`.
- Örnek çevirileri: `lx:zwischen` ö3, `lx:schießen` ö2 ve ö4, `lx:Blut` ö2, `lx:solcher` ö2 ve ö3, `lx:Wiedersehen` ö2, `lx:Teil` ö2.
- Eşdizim çevirileri: `lx:Wiedersehen` (2. öbek), `lx:bloß` (1. öbek), `lx:falls` (2. öbek).
- `forms`: `lx:schießen` 4. madde (`tr` ve cümle).

## Kalan şüpheler (düzeltilmedi)
- Kartsız altı girdide `exp` boş (`null`). Onaylı partilerdeki kartsız girdilerde `exp` dolu; yazılması lex ya da yazarın işi.
- `lx:funktionieren` düzeyi A1; A2 daha uygun olabilir, kaynak listeyle doğrulanmadı.
- `lx:Eltern` ve `lx:besuchen`: **meine Eltern** bir yerde `annemler`, bir yerde `annemle babam`. İkisi de doğru Türkçe; okur geçirdiği için dokunulmadı.
- `lx:leicht` `forms[0]` (`Die Aufgabe ist ___.`): **einfach** da doğru cevap; sözlükte `also_ok` hiç kullanılmadığı için eklenmedi.
- `lx:vertrauen` (`das Vertrauen`), `lx:Blut` (`Blutdruck`), `lx:Wein` (`Rotwein / Weißwein`): eşdizim listesinde öbek değil türemiş kelime var; sözlük genelindeki alışkanlık olduğu için bırakıldı.
- `lx:kämpfen` ö2 `Wir kämpfen für bessere Löhne.`: iş hayatı cümlesi, siyaset sayılmadı.

## Sonuç
KAPANDI (12 kart düzeltildi; değişen Türkçe alanlar okura gitmeli).
