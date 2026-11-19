# Sözlük incelemesi: `forms[].also_ok` (35 kart)

İnceleyen: dilbilimci-ajan · 2026-11-19 · 35 kart, 130 boşluk (`answer`, `also_ok`, `tr`, `hint_tr`)

## Sayılar
- Geçti: 12 kart
- Düzeltildi: 23 kart, 40 boşluk (2 boşluk yeniden yazıldı, 2 boşluktan biçim çıkarıldı, 36 boşluğa biçim eklendi)
- Kaldı: 0
- Hata oranı: 23 kart / 35 = 0,66; boşluk bazında 40 / 130 = 0,31.
- Denetim: 130 boşluğun `tr` ve `hint_tr` alanları `textIssues` (OD-9) ile tarandı, sorunlu 0; hepsi tek cümle ve en çok 14 kelime. Yama sözlüğe uygulanmadı; `content:validate` yama uygulanınca baş geliştiricide.
- Yama: `(yerel çalışma dosyası)` (23 kart, tam `forms` listeleri). Üretici betik: `(yerel çalışma dosyası)`.

## Düzeltmeler (önce → sonra, gerekçe)

**Boşluk yeniden yazıldı (cevap tek değildi)**
- `lx:rum` b3: `Ich komme so um acht ___.` → `Das kostet so um die zehn Euro ___.` (`rum`, `herum`). Eski cümleye **vorbei** aynı çeviriyle giriyordu ve anlamı değiştiriyordu (uğramak).
- `lx:rum` b4: `Der Laden ist gleich um die Ecke ___.` → `Wir sitzen alle um den Tisch ___.` (`rum`, `herum`). Eski cümle boşluksuz da tamdı (**links** gibi kelimeler giriyordu); yenisi kartın `etrafta` anlamını gösteriyor.

**`also_ok` içinden çıkarıldı (anlam kayıyor ya da doğal değil)**
- `lx:bereits` b2 `Der Zug ist ___ abgefahren.`: `längst` çıktı. **längst** uzun süre önce demek, **bereits** bunu söylemez.
- `lx:tatsächlich` b3 `___, du hast recht!`: `Echt` çıktı. Tek başına onay olarak bu cümlede söylenmez (soru olarak **Echt?** olur).

**`also_ok` içine eklendi (haksız ret riski)**
- `lx:kriegen` b3: `erwartet` (**ein Baby erwarten**, aynı çeviri).
- `lx:seltsam` b1–b4, `lx:komisch` b1–b3: `sonderbar` ve çekimleri.
- `lx:gucken` b4: `blickt`.
- `lx:erhalten` b1–b3: `kriegen`, `gekriegt`, `kriegt` (b4'te zaten vardı; kart içi tutarlılık).
- `lx:jemals` b1, b2: `schon`, `mal` (**Warst du schon in Italien?** aynı soru).
- `lx:hierher` b3: `hierhin`.
- `lx:völlig` b2, b3: `absolut`. `lx:überhaupt` b1–b3: `absolut` (`lx:absolut` b3 zaten `überhaupt`, `gar` kabul ediyor; iki yön eşitlendi).
- `lx:wenigstens` b2: `Immerhin`.
- `lx:absolut` b1: `ganz`, `total`; b2: `total`.
- `lx:raten` b2: `Rat` (**Rat mal** ve **Rate mal** ikisi de doğru).
- `lx:toll` b1–b3: `prima`, `fantastisch` çekimleri; b2: `herrlichen`.
- `lx:wunderbar` b1: `klasse`, `prima`, `fantastisch`, `ausgezeichnet`, `hervorragend`; b2: `prima`, `fantastischer`.
- `lx:schauen` b4 `Hast du schon ___?`: `nachgeschaut`, `nachgeguckt`, `nachgesehen`.
- `lx:übel` b2 `Ist ___ übel?`: `euch` (çeviri `Mideniz` birden çok kişiye de söylenir).
- `lx:stecken` b2 `Wo ___ du denn?`: `bleibst`.
- `lx:schaffen` b3, b4: `bekommt`, `bekommen` (**den Bus bekommen**).
- `lx:deshalb` b1: `laufe` (**zu Fuß laufen** konuşmada yaygın).
- `lx:darum` b2 `Darum ___ ich zu spät.`: `war` (çeviri `geç kaldım` ikisini de karşılıyor).

## Lex'in tartışmalı bıraktığı biçimler: karar
- `lx:fort` b1 `Ich muss jetzt leider ___.`: `weg`, `los`, `gehen` **kaldı**. Üçü de `gitmem lazım` çevirisinin doğru ve gündelik karşılığı; reddetmek haksız olur.
- `lx:fort` b2 `Mein Schlüssel ist ___!`: `weg`, `verschwunden` **kaldı** (aynı durum, aynı çeviri).
- `lx:heraus` b1 `Das Ergebnis ist noch nicht ___.`: `raus`, `bekannt`, `klar` **kaldı**. Çeviri `belli değil` olduğu sürece ikisi de doğru karşılık. Aşağıdaki açık noktaya bakınız.
- `lx:absolut` b3 `Das geht ___ nicht.`: `überhaupt`, `gar` **kaldı**; karşı yön de eklendi.

## Geçen kartlar (12)
`lx:wozu`, `lx:fort`, `lx:heraus`, `lx:nun`, `lx:empfehlen`, `lx:bestehen`, `lx:rennen`, `lx:überprüfen`, `lx:Kerl`, `lx:schlagen`, `lx:leicht`, `lx:deswegen`.

## Kalan şüpheler (karar baş geliştiricide)
1. **Açık uçlu boşluklar.** Birçok cümle boşluksuz da tam (`Er hat ___ angerufen.`, `Das stimmt ___.`, `Ruf ___ an!`, `Es ist ___ zehn Uhr.`, `Iss ___ etwas!`). Dilbilgisi olarak **nicht**, **gestern**, **bitte** gibi kelimeler de girer; bunları yalnızca Türkçe çeviri eler. `also_ok` bunu çözmez; değerlendiricinin çeviriyi tek ölçüt sayması gerekir. Zarf kartlarında kaçınılmaz, hata sayılmadı.
2. `lx:wozu` b1, b3: **Warum** da dilbilgisi olarak girer ve gündelik anlamı çok yakın. Eklenmedi: kart amacı soran kelimeyi öğretiyor ve çeviri `ne için`. Kartın `tr` alanındaki `niye` bu ayrımı bulandırıyor; istenirse `ne için, ne amaçla` yapılabilir (kart alanı, bu görevin dışında).
3. `lx:heraus` b1: daha keskin bir çeviri `Sonuç henüz çıkmadı.` olurdu; o zaman `klar` çıkar, `da` girer. Örnek 1 aynı cümleyi `belli değil` diye çevirdiği için dokunulmadı (örnekler bu görevin dışında).
4. `lx:hierher` b4 `Setz dich ___!`: en sık söylenen **hin** (`Setz dich hin!`, otur) kabul edilmiyor; çeviri `Buraya otur` olduğu için doğru karar, ama öğrenci ilk seferde takılabilir.
5. `lx:überhaupt` b4 `Wer bist du ___?`: **denn** de girer, anlamı yumuşatır; eklenmedi.
6. Yazım varyantı **kucken** (kuzey Almanya) ve konuşma dili **checken**, **drum**, **packen** hiçbir boşluğa eklenmedi.
7. Önceki turlardan kalan ipuçları cümledeki özneyi değil genel kuralı söylüyor (`lx:raten` b3: cümlede **Der Arzt**, ipucu `**er** ve **sie** ile **rät** olur`; `lx:schauen` b3, `lx:empfehlen` b3 aynı). Yanlış değil, dokunulmadı.

## Sonuç
KAPANDI (yama uygulanıp `content:validate` 0 hata verince). `review` alanı için öneri: `reviewed`, `dilbilimci-ajan`, 2026-11-19.

## İnceleme 1. tur (#102)
- Eş anlamlı kabulü iki yönlü yapıldı (10 boşluk): weg ← fort, bekommen ← kriegt, schon ← bereits, großartig ← toll/super/wunderbar (2), erreichen ← geschafft/erwischt, total ← völlig/ganz/komplett, sehen ← geguckt/geschaut, herum ← rum (2).
- `lx:heraus` also_ok'tan bekannt/klar çıktı. `lx:jemals` ö4 "in Erzurum" → "in den Alpen".
- `lx:übel` "Ist ___ übel?": **euch** önce çıkarıldı, 2. turda geri kondu (çeviri "siz" çoğulu da karşılıyor).
