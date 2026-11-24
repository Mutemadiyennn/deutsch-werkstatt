# B7 — adsız biçimler (M1 günleri 1–7 ve temel dersler)

Görev: ad yuvası (`{name}`) olan her alanın yanına `<alan>_adsiz` biçimi. Ad girilmemiş profilde uygulama bu biçimi gösterir ve okur (`web/src/core/persona.ts`); kabul listesinde adsız liste asıl listenin önüne eklenir, öğrenci kendi adını yazarsa yine doğru sayılır.

Kapsam: `content/v2/m1/gun-01.json` … `gun-07.json` (55 alan), `content/v2/temel/r0-01`, `r0-04`, `r0-05`, `r0-07`, `r0-09`, `r0-10`, `r0-11` (43 alan). Senaryolar ve `patterns.json` bu partide yok. Durum: taslak (dilbilimci incelemesi bekleniyor).

Uygulanan kurallar:
- Adlı alan değişmedi; yalnız `_adsiz` eklendi, asıl alanın hemen ardına. Dosya biçimi (girinti 1 ya da 2 boşluk, sıra) korundu.
- `{Herr|Frau} {name}` hitabı adsız biçimde tümüyle çıktı ("Danke, {Herr|Frau} {name}." → "Danke!").
- `accepted_adsiz` her yerde ≥3 öğe; nesnede `de` varsa ilk öğe `de_adsiz`. Adlı biçim adsız listeye girmedi.
- Uzun kabul listeleri (gün 5, gün 7, r0-09) adlı listeden türetildi: ad bölümü ("hier ist {name}", "mein Name ist {name}", "ich bin {name}", "{name} hier") cümleden çıktı, selam kaldı ("Grüß Gott, hier ist {name}. Ich möchte einen Termin." → "Grüß Gott. Ich möchte einen Termin."); asıl listedeki adsız öğeler aynen kaldı; tekrarlar atıldı.
- Okuma metinlerinde cümle sayısı değişmedi ("Hallo {name}, hier ist Ioana." → "Hallo, hier ist Ioana."), soruların `kanit` sıraları geçerli kaldı.
- Yazma örneklerinde (`ornek_de_adsiz`) adsız örnek yine `zorunlu` kelimeleri ve bir `accepted_kaliplar` kalıbını içerir ("Hallo Derya! …" → kalıp "Hallo ___!").

## Dosya başına tablo

Uzun listelerde öğe sayısı ve ilk iki öğe gösterildi; tamamı dosyada.

### `content/v2/m1/gun-01.json` (17 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `prova.dugumler[0].secenekler[0].de` | "Guten Tag, hier ist {name}." | "Guten Tag." |
| `prova.dugumler[0].secenekler[0].tr` | "İyi günler, ben {name}." | "İyi günler." |
| `prova.dugumler[0].secenekler[0].accepted` | 9 öğe: "Guten Tag, hier ist {name}.", "Guten Tag, ich bin {name}.", … | 4 öğe: "Guten Tag.", "Grüß Gott.", … |
| `prova.dugumler[0].secenekler[1].de` | "Hallo, hier ist {name}." | "Hallo." |
| `prova.dugumler[0].secenekler[1].tr` | "Merhaba, ben {name}." | "Merhaba." |
| `prova.dugumler[0].secenekler[1].accepted` | 5 öğe: "Hallo, hier ist {name}.", "Hallo, ich bin {name}.", … | "Hallo.", "Hallo, Frau Huber.", "Ja, hallo." |
| `prova.dugumler[1].secenekler[0].de` | "Guten Tag, hier ist {name}." | "Guten Tag." |
| `prova.dugumler[1].secenekler[0].tr` | "İyi günler, ben {name}." | "İyi günler." |
| `prova.dugumler[1].secenekler[0].accepted` | 9 öğe: "Guten Tag, hier ist {name}.", "Guten Tag, ich bin {name}.", … | 4 öğe: "Guten Tag.", "Grüß Gott.", … |
| `prova.dugumler[2].de` | "Guten Tag, {Herr\|Frau} {name}. Geht Dienstag?" | "Guten Tag. Geht Dienstag?" |
| `prova.dugumler[2].tr` | "İyi günler, {Herr\|Frau} {name}. Salı olur mu?" | "İyi günler. Salı olur mu?" |
| `prova.dugumler[4].de` | "Dienstag, ja. Danke, {Herr\|Frau} {name}." | "Dienstag, ja. Danke!" |
| `prova.dugumler[4].tr` | "Salı, tamam. Teşekkürler, {Herr\|Frau} {name}." | "Salı, tamam. Teşekkürler!" |
| `prova.dugumler[5].de` | "Donnerstag, ja. Danke, {Herr\|Frau} {name}." | "Donnerstag, ja. Danke!" |
| `prova.dugumler[5].tr` | "Perşembe, tamam. Teşekkürler, {Herr\|Frau} {name}." | "Perşembe, tamam. Teşekkürler!" |
| `okuma_yazma.metin_de` | "Hallo {name}, hier ist Ioana. Heute ist Dienstag. Morgen geht nicht. Donnerstag geht nicht. Geht Freitag? Danke!" | "Hallo, hier ist Ioana. Heute ist Dienstag. Morgen geht nicht. Donnerstag geht nicht. Geht Freitag? Danke!" |
| `okuma_yazma.metin_tr` | "Merhaba {name}, ben Ioana. Bugün salı. Yarın olmaz. Perşembe olmaz. Cuma olur mu? Teşekkürler!" | "Merhaba, ben Ioana. Bugün salı. Yarın olmaz. Perşembe olmaz. Cuma olur mu? Teşekkürler!" |

### `content/v2/m1/gun-02.json` (9 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `prova.dugumler[0].de` | "Guten Tag, {Herr\|Frau} {name}! Heute ist mein Geburtstag." | "Guten Tag! Heute ist mein Geburtstag." |
| `prova.dugumler[0].tr` | "İyi günler, {Herr\|Frau} {name}! Bugün doğum günüm." | "İyi günler! Bugün doğum günüm." |
| `prova.dugumler[5].de` | "Danke, {Herr\|Frau} {name}! Bis morgen!" | "Danke! Bis morgen!" |
| `prova.dugumler[5].tr` | "Teşekkürler, {Herr\|Frau} {name}! Yarın görüşürüz!" | "Teşekkürler! Yarın görüşürüz!" |
| `prova.dugumler[6].de` | "Bis morgen! Und danke, {Herr\|Frau} {name}!" | "Bis morgen! Und danke!" |
| `prova.dugumler[6].tr` | "Yarın görüşürüz! Teşekkürler, {Herr\|Frau} {name}!" | "Yarın görüşürüz! Teşekkürler!" |
| `okuma_yazma.metin_de` | "Hallo {name}, hier ist Derya. Ich habe Ende Juli Urlaub. Mein Geburtstag ist im März. Bis morgen!" | "Hallo, hier ist Derya. Ich habe Ende Juli Urlaub. Mein Geburtstag ist im März. Bis morgen!" |
| `okuma_yazma.metin_tr` | "Merhaba {name}, ben Derya. Temmuz sonunda iznim var. Doğum günüm martta. Yarın görüşürüz!" | "Merhaba, ben Derya. Temmuz sonunda iznim var. Doğum günüm martta. Yarın görüşürüz!" |
| `okuma_yazma.yazma.ornek_de` | "Hallo Derya, hier ist {name}. Ich habe im August Urlaub. Mein Geburtstag ist im Mai. Bis morgen!" | "Hallo Derya! Ich habe im August Urlaub. Mein Geburtstag ist im Mai. Bis morgen!" |

### `content/v2/m1/gun-03.json` (7 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `prova.dugumler[0].secenekler[0].de` | "Guten Tag, hier ist {name}." | "Guten Tag." |
| `prova.dugumler[0].secenekler[0].tr` | "İyi günler, ben {name}." | "İyi günler." |
| `prova.dugumler[0].secenekler[0].accepted` | 11 öğe: "Guten Tag, hier ist {name}.", "Hallo, hier ist {name}.", … | 4 öğe: "Guten Tag.", "Hallo.", … |
| `prova.dugumler[1].de` | "Guten Tag, {Herr\|Frau} {name}!" | "Guten Tag!" |
| `prova.dugumler[1].tr` | "İyi günler, {Herr\|Frau} {name}!" | "İyi günler!" |
| `prova.dugumler[7].de` | "Bis Montag, {Herr\|Frau} {name}!" | "Bis Montag!" |
| `prova.dugumler[7].tr` | "Pazartesi görüşürüz, {Herr\|Frau} {name}!" | "Pazartesi görüşürüz!" |

### `content/v2/m1/gun-04.json` (7 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `prova.dugumler[0].de` | "Guten Tag, {Herr\|Frau} {name}!" | "Guten Tag!" |
| `prova.dugumler[0].tr` | "İyi günler, {Herr\|Frau} {name}!" | "İyi günler!" |
| `prova.dugumler[6].de` | "Danke! Schönes Wochenende, {Herr\|Frau} {name}!" | "Danke! Schönes Wochenende!" |
| `prova.dugumler[6].tr` | "Teşekkürler! İyi hafta sonları, {Herr\|Frau} {name}!" | "Teşekkürler! İyi hafta sonları!" |
| `okuma_yazma.metin_de` | "Hallo {name}, hier ist Derya. Ein Brot kostet vier Euro. Ein Kilo Äpfel kostet drei Euro. Das ist nicht teuer! Und du?" | "Hallo, hier ist Derya. Ein Brot kostet vier Euro. Ein Kilo Äpfel kostet drei Euro. Das ist nicht teuer! Und du?" |
| `okuma_yazma.metin_tr` | "Merhaba {name}, ben Derya. Bir ekmek dört avro. Bir kilo elma üç avro. Bu pahalı değil! Ya sen?" | "Merhaba, ben Derya. Bir ekmek dört avro. Bir kilo elma üç avro. Bu pahalı değil! Ya sen?" |
| `okuma_yazma.yazma.ornek_de` | "Hallo Derya, hier ist {name}. Ein Brot kostet fünf Euro. Ein Kilo Äpfel kostet vier Euro. Das ist zu teuer!" | "Hallo Derya! Ein Brot kostet fünf Euro. Ein Kilo Äpfel kostet vier Euro. Das ist zu teuer!" |

### `content/v2/m1/gun-05.json` (3 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `prova.dugumler[0].secenekler[0].de` | "Guten Tag, hier ist {name}. Um wie viel Uhr ist mein Termin?" | "Guten Tag. Um wie viel Uhr ist mein Termin?" |
| `prova.dugumler[0].secenekler[0].tr` | "İyi günler, ben {name}. Randevum saat kaçta?" | "İyi günler. Randevum saat kaçta?" |
| `prova.dugumler[0].secenekler[0].accepted` | 20 öğe: "Guten Tag, hier ist {name}. Um wie viel Uhr ist mein Termin?", "Guten Tag, hier ist {name}. Wann ist mein Termin?", … | 10 öğe: "Guten Tag. Um wie viel Uhr ist mein Termin?", "Guten Tag. Wann ist mein Termin?", … |

### `content/v2/m1/gun-06.json` (3 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `sesler[0].bolumler[0].cevapla.accepted` | 8 öğe: "Mein Name ist {name}.", "{name}.", … | 5 öğe: "Hier ist meine Karte.", "Guten Morgen, hier ist meine Karte.", … |
| `okuma_yazma.metin_de` | "Hallo {name}! Mein Geburtstag ist am siebten März. Wann hast du Geburtstag? Derya" | "Hallo! Mein Geburtstag ist am siebten März. Wann hast du Geburtstag? Derya" |
| `okuma_yazma.metin_tr` | "Merhaba {name}! Doğum günüm yedi martta. Senin doğum günün ne zaman? Derya" | "Merhaba! Doğum günüm yedi martta. Senin doğum günün ne zaman? Derya" |

### `content/v2/m1/gun-07.json` (9 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `sahne.bolumler[0].dikte[4].ornek_de` | "Hier ist {name}. Ich möchte einen Termin machen." | "Guten Tag. Ich möchte einen Termin machen. Ist heute noch etwas frei?" |
| `sesler[0].bolumler[0].cevapla.accepted` | 77 öğe: "Guten Tag, hier ist {name}. Ich möchte einen Termin machen.", "Ich möchte einen Termin machen.", … | 42 öğe: "Guten Tag. Ich möchte einen Termin machen.", "Ich möchte einen Termin machen.", … |
| `prova.dugumler[0].secenekler[0].de` | "Guten Tag, hier ist {name}." | "Guten Tag." |
| `prova.dugumler[0].secenekler[0].tr` | "İyi günler, ben {name}." | "İyi günler." |
| `prova.dugumler[0].secenekler[0].accepted` | 12 öğe: "Guten Tag, hier ist {name}.", "Hallo, hier ist {name}.", … | 4 öğe: "Guten Tag.", "Hallo.", … |
| `prova.dugumler[0].secenekler[1].de` | "Guten Tag, hier ist {name}. Ich möchte einen Termin machen." | "Guten Tag. Ich möchte einen Termin machen." |
| `prova.dugumler[0].secenekler[1].tr` | "İyi günler, ben {name}. Randevu almak istiyorum." | "İyi günler. Randevu almak istiyorum." |
| `prova.dugumler[0].secenekler[1].accepted` | 56 öğe: "Guten Tag, hier ist {name}. Ich möchte einen Termin machen.", "Guten Tag, hier ist {name}. Ich möchte einen Termin.", … | 28 öğe: "Guten Tag. Ich möchte einen Termin machen.", "Guten Tag. Ich möchte einen Termin.", … |
| `gun_sinavi.maddeler[10].accepted` | 900 öğe: "Hallo Luka, hier ist {name}. Kann ich am Samstag kommen?", "Hallo Luka, hier ist {name}. Ich kann am Donnerstag nicht kommen. Geht Samstag?", … | 300 öğe: "Hallo Luka. Kann ich am Samstag kommen?", "Hallo Luka. Ich kann am Donnerstag nicht kommen. Geht Samstag?", … |

### `content/v2/temel/r0-01-tage.json` (6 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `teach[10].de` | "Guten Tag, hier ist {name}." | "Guten Tag, hier ist Frau Huber." |
| `teach[10].tr` | "İyi günler, ben {name}." | "İyi günler, ben Frau Huber." |
| `drills[34].tr` | "İyi günler, ben {name}." | "İyi günler, ben Frau Huber." |
| `drills[34].accepted` | 5 öğe: "Guten Tag, hier ist {name}.", "Guten Tag, ich bin {name}.", … | 5 öğe: "Guten Tag, hier ist Frau Huber.", "Guten Tag, hier spricht Frau Huber.", … |
| `dialogue.lines[0].de` | "Hallo {name}! Welcher Tag ist heute?" | "Hallo! Welcher Tag ist heute?" |
| `dialogue.lines[0].tr` | "Selam {name}! Bugün günlerden ne?" | "Selam! Bugün günlerden ne?" |

### `content/v2/temel/r0-04-zahlen-21-100.json` (2 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `dialogue.lines[1].de` | "Ich bin {name}. Was kostet das hier?" | "Ja, ich bin neu. Was kostet das hier?" |
| `dialogue.lines[1].tr` | "Ben {name}. Burası ne kadar?" | "Evet, yeniyim. Burası ne kadar?" |

### `content/v2/temel/r0-05-uhrzeit.json` (2 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `dialogue.lines[1].de` | "Guten Tag, hier ist {name}. Geht Donnerstag?" | "Guten Tag. Geht Donnerstag?" |
| `dialogue.lines[1].tr` | "İyi günler, ben {name}. Perşembe olur mu?" | "İyi günler. Perşembe olur mu?" |

### `content/v2/temel/r0-07-fragewoerter.json` (2 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `dialogue.lines[3].de` | "{name}." | "Guten Tag, Frau Brandl! Ja, ich bin neu hier." |
| `dialogue.lines[3].tr` | "{name}." | "İyi günler, Frau Brandl! Evet, buraya yeni geldim." |

### `content/v2/temel/r0-09-modalverben.json` (4 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `drills[28].accepted` | 77 öğe: "Ich möchte einen Termin machen.", "Ich möchte einen Termin.", … | 49 öğe: "Ich möchte einen Termin machen.", "Ich möchte einen Termin.", … |
| `dialogue.lines[0].de` | "Hallo {name}! Wollen wir heute zusammen üben?" | "Hallo! Wollen wir heute zusammen üben?" |
| `dialogue.lines[0].tr` | "Selam {name}! Bugün birlikte pratik yapalım mı?" | "Selam! Bugün birlikte pratik yapalım mı?" |
| `placement[4].accepted` | 77 öğe: "Ich möchte einen Termin machen.", "Ich möchte einen Termin.", … | 49 öğe: "Ich möchte einen Termin machen.", "Ich möchte einen Termin.", … |

### `content/v2/temel/r0-10-buchstabieren.json` (14 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `teach[0].de` | "Mein Name ist {name}." | "Mein Name ist nicht einfach." |
| `teach[0].tr` | "Benim adım {name}." | "Adım kolay değil." |
| `teach[1].de` | "Mein Vorname ist {name}." | "Wie ist Ihr Vorname?" |
| `teach[1].tr` | "Benim ön adım {name}." | "Ön adınız nedir?" |
| `teach[2].de` | "Mein Nachname ist {name}." | "Wie ist Ihr Nachname?" |
| `teach[2].tr` | "Benim soyadım {name}." | "Soyadınız nedir?" |
| `drills[16].tr` | "Benim adım {name}." | "Adım kolay değil." |
| `drills[16].accepted` | 4 öğe: "Mein Name ist {name}.", "Ich heiße {name}.", … | 4 öğe: "Mein Name ist nicht einfach.", "Mein Name ist nicht leicht.", … |
| `drills[17].tr` | "Benim soyadım {name}." | "Soyadınız nedir?" |
| `drills[17].accepted` | 5 öğe: "Mein Nachname ist {name}.", "Mein Familienname ist {name}.", … | 4 öğe: "Wie ist Ihr Nachname?", "Wie ist Ihr Familienname?", … |
| `dialogue.lines[1].de` | "Mein Name ist {name}." | "Mein Name ist nicht einfach." |
| `dialogue.lines[1].tr` | "Benim adım {name}." | "Adım kolay değil." |
| `dialogue.lines[4].de` | "Danke, {Herr\|Frau} {name}. Und Ihre Adresse?" | "Danke. Und Ihre Adresse?" |
| `dialogue.lines[4].tr` | "Teşekkürler, {Herr\|Frau} {name}. Adresiniz?" | "Teşekkürler. Adresiniz?" |

### `content/v2/temel/r0-11-praesens.json` (13 alan)

| yol | adlı biçim | adsız biçim |
|---|---|---|
| `teach[0].de` | "Ich heiße {name}." | "Hallo, ich heiße Tobi." |
| `teach[0].tr` | "Adım {name}." | "Merhaba, adım Tobi." |
| `drills[4].de` | "Ich ___ {name}." | "Hallo, ich ___ Tobi." |
| `drills[4].tr` | "Adım {name}." | "Merhaba, adım Tobi." |
| `drills[17].tr` | "Adım {name}." | "Senin adın ne?" |
| `drills[17].accepted` | 4 öğe: "Ich heiße {name}.", "Ich heisse {name}.", … | 4 öğe: "Wie heißt du?", "Wie ist dein Name?", … |
| `drills[27].accepted` | 10 öğe: "Ich heiße {name}.", "Hallo Tobi, ich heiße {name}.", … | 5 öğe: "Hallo Tobi! Ich bin neu hier.", "Hallo Tobi, ich bin neu hier.", … |
| `dialogue.lines[1].de` | "Ich heiße {name}." | "Hallo Tobi! Ich bin neu hier." |
| `dialogue.lines[1].tr` | "Adım {name}." | "Merhaba Tobi! Burada yeniyim." |
| `dialogue.lines[2].de` | "Hallo, {name}! Und das ist Derya." | "Schön! Und das ist Derya." |
| `dialogue.lines[2].tr` | "Merhaba {name}! Bu da Derya." | "Ne güzel! Bu da Derya." |
| `listening[1].script[0].de` | "Hallo {name}, hier ist Ioana." | "Hallo, hier ist Ioana." |
| `listening[1].script[0].tr` | "Merhaba {name}, ben Ioana." | "Merhaba, ben Ioana." |

## Yeniden kurulan cümleler (18 nesne)

Ad çıkınca anlamı bozulan ya da kartın öğrettiği parça kaybolan cümleler. Görevin öğrettiği şey (heceleme, kendini tanıtma, fiil çekimi) korunmaya çalışıldı.

| # | dosya · yol | adlı biçim | adsız biçim | gerekçe |
|---|---|---|---|---|
| 1 | gun-06 · `sesler[0].bolumler[0].cevapla.accepted` | "Mein Name ist {name}." (soru: "Wie ist Ihr Name?") | "Hier ist meine Karte." (+4) | Adsız cevap yok. Bankoda adı sorulunca kartını uzatmak gerçek bir hamle; **Karte** 4. günde öğretildi. Soruyu tam karşılamaz, açık soru 2'ye bakın. |
| 2 | gun-07 · `sahne.bolumler[0].dikte[4].ornek_de` | "Hier ist {name}. Ich möchte einen Termin machen." | "Guten Tag. Ich möchte einen Termin machen. Ist heute noch etwas frei?" | `zorunlu` listesinde **ist** var (değiştirilemez). Örnek kendi kontrolünden geçsin diye **ist** başka bir doğal cümlede kaldı. |
| 3 | r0-01 · `teach[10]` | "Guten Tag, hier ist {name}." | "Guten Tag, hier ist Frau Huber." | Kartın parçaları **Guten Tag** + **hier ist** (= ben). "Guten Tag." tek başına **hier ist** parçasını öğretmezdi; WORLD'den Frau Huber telefonda kendini tanıtıyor. |
| 4 | r0-01 · `drills[34]` (tr, accepted) | "İyi günler, ben {name}." | "İyi günler, ben Frau Huber." / "Guten Tag, hier ist Frau Huber." (+4) | 3 ile aynı çerçeve; üretim alıştırması **hier ist** kalıbını sormaya devam eder. |
| 5 | r0-04 · `dialogue.lines[1]` | "Ich bin {name}. Was kostet das hier?" | "Ja, ich bin neu. Was kostet das hier?" | Basti "bist du neu hier?" diye sordu; adsız cevap bu soruya cevap verir. |
| 6 | r0-07 · `dialogue.lines[3]` | "{name}." (soru: "Wie heißen Sie?") | "Guten Tag, Frau Brandl! Ja, ich bin neu hier." | Satırın tamamı addı. Frau Brandl'ın sonraki sözü "Schön!" bu cevaba da uyar. Adı sorusu cevapsız kalır (açık soru 2). |
| 7 | r0-10 · `teach[0]` | "Mein Name ist {name}." | "Mein Name ist nicht einfach." | Kartın parçası **Mein Name ist** korunur; heceleme dersinde gerçek bir giriş cümlesi (yabancı adı olan biri bunu çok söyler). |
| 8 | r0-10 · `teach[1]` | "Mein Vorname ist {name}." | "Wie ist Ihr Vorname?" | Soru biçimi; kartın "Form doldururken sorulur." notuna uyar. `exp.parcalar` "Mein Vorname ist" gösteriyor (açık soru 3). |
| 9 | r0-10 · `teach[2]` | "Mein Nachname ist {name}." | "Wie ist Ihr Nachname?" | Soru biçimi; "Muayenehanede ilk sorulan şeydir." notuna uyar. Parçalar notu 8 ile aynı. |
| 10 | r0-10 · `drills[16]` (tr, accepted) | "Benim adım {name}." | "Adım kolay değil." / "Mein Name ist nicht einfach." (+3) | 7 ile aynı cümle; **Mein Name ist** üretimi korunur. |
| 11 | r0-10 · `drills[17]` (tr, accepted) | "Benim soyadım {name}." | "Soyadınız nedir?" / "Wie ist Ihr Nachname?" (+3) | 9 ile aynı; **Nachname** üretimi korunur. |
| 12 | r0-10 · `dialogue.lines[1]` | "Mein Name ist {name}." | "Mein Name ist nicht einfach." | Sonraki satır "Können Sie das bitte buchstabieren?" bu cevaba daha da iyi oturur; heceleme akışı bozulmaz. |
| 13 | r0-11 · `teach[0]` | "Ich heiße {name}." | "Hallo, ich heiße Tobi." | Kartın ipucu **ich → heiße (-e)** üzerine; soru biçimi bu eki öğretmezdi. Örnek cümle WORLD'den Tobi'nin kendi sözü (diyalogda da söylüyor). |
| 14 | r0-11 · `drills[4]` (de, tr) | "Ich ___ {name}." | "Hallo, ich ___ Tobi." | `accepted` (heiße) değişemez; boşluk yine **heiße** ister. |
| 15 | r0-11 · `drills[17]` (tr, accepted) | "Adım {name}." | "Senin adın ne?" / "Wie heißt du?" (+3) | Soru biçimi; **heißen** çekimi (du heißt) üretilir, öğrenci bunu ertesi gün gerçekten sorar. |
| 16 | r0-11 · `drills[27].accepted` | "Ich heiße {name}." (Tobi: "Wie heißt du?") | "Hallo Tobi! Ich bin neu hier." (+4) | Adsız cevap yok; ilk iş günü durumuna uyan kendini tanıtma. Adı sorusu cevapsız kalır (açık soru 2). |
| 17 | r0-11 · `dialogue.lines[1]` | "Ich heiße {name}." | "Hallo Tobi! Ich bin neu hier." | 16 ile aynı. |
| 18 | r0-11 · `dialogue.lines[2]` | "Hallo, {name}! Und das ist Derya." | "Schön! Und das ist Derya." | 17'deki cevaba uysun diye; Tobi zaten "Hallo" ile başlamıştı. |

## Açık sorular

1. **Değiştirilemeyen kardeş alanlar.** `geri_bildirim_tr`, `situation_tr`, `why_tr`, `gorev_tr`, `exp.*`, `kapanis_tr` ad yuvası taşımadığı için `_adsiz` alamaz (doğrulayıcı: "asıl alanda ad yuvası yok" hatası). Adsız profilde bunlar "adını söyledin / adını söyle" demeye devam eder: gün 1, 3, 5, 7 prova geri bildirimleri ve kapanışları; gün 6 `why_tr` ("yalnızca adını söyle"); gün 7 `gun_sinavi.maddeler[10]` (s11) ve dikte d5 görev metni ("adın ve isteğin"); r0-11 `drills[27]` (r0:11:d26) `situation_tr` ("Adını söyle"). Öneri: ya doğrulayıcı bu alanlarda da `_adsiz`e izin versin (asıl alanda yuva şartı yerine "nesnede yuva var" şartı), ya da uygulama ad gerektiren maddeden önce adı sorsun.
2. **Adı soran soruya adsız cevap yok.** gun-06 c1 ("Wie ist Ihr Name?"), r0-07 diyalog, r0-11 `drills[27]` ve diyalog: adsız biçim gerçek bir hamle (kart uzatmak, "ich bin neu hier") ama soruyu tam cevaplamaz. Kabul listesinde adlı biçimler de durduğu için öğrenci kendi adını yazarsa doğru sayılır; yalnız gösterilen örnek cevap adsızdır. En temiz çözüm uygulamada: bu maddelerde ad yoksa adı sormak.
3. **r0-10 teach[1]/[2] parçaları.** `exp.parcalar` "Mein Vorname ist / Mein Nachname ist" gösteriyor, adsız cümle soru biçiminde. Alternatif: "Mein Vorname ist kurz." gibi cümleler doğal değil; soru biçimi seçildi. Dilbilimci karar versin.
4. **gun-05 n1 çakışması.** Asıl dersin noktası "önce adını söyle"; 2. seçenek ("Hallo Luka, um wie viel Uhr ist mein Termin?", uygun değil) adsız doğru biçimle aynı. Adsız profilde 1. seçenek önce eşleştiği için (`eslestir` ilk kesin eşleşmeyi alır) adsız cevap doğru sayılır ve 2. seçenek erişilmez olur. Bilinçli tercih: ad yokken öğrenciden olmayan bir şey istenmez. Yine de bu düğüm adsız profilde öğretmeyi kaybeder (1. maddeyle aynı çözüm).
5. **gun-07 d5 örneği** "Ist heute noch etwas frei?" cümlesi M1'de öğretilmemiş **frei** (bu anlamda) ve **etwas** içerir; yalnız örnek cevapta, istenmiyor. `zorunlu` listesinden **ist** adsız profilde düşebilirse örnek "Guten Tag. Ich möchte einen Termin machen." olarak kısalır.

## Sayılar

| | alan | nesne |
|---|---|---|
| M1 günleri (gun-01 … gun-07) | 55 (17 + 9 + 7 + 7 + 3 + 3 + 9) | 27 |
| temel dersler (r0-01, 04, 05, 07, 09, 10, 11) | 43 (6 + 2 + 2 + 2 + 4 + 14 + 13) | 23 |
| toplam | **98** | 50 |
| yeniden kurulan (yukarıdaki bölüm) | — | 18 |
| `accepted_adsiz` listeleri | 17 (en kısa 3, en uzun 300: gün 7 s11) | — |

## Doğrulama

```
$ npm run content:validate
… (kapsamdaki 14 dosyada B7 uyarısı yok; kalan B7 uyarıları kapsam dışı:
   domains/arbeit/scenarios/m1-weihnachtsfeier.json, domains/telefon/scenarios/01-arzttermin.json, registry/patterns.json)
içerik v2: 20 alan · 1499 kelime (1207 K1, 0 K2; 15 parti) · 61 kalıp · 202 dilbilgisi · 6 senaryo · 2241 seviye tespiti maddesi → 0 hata, 128 uyarı
   (önce: 0 hata, 142 uyarı; fark = 14 dosyanın B7 uyarısı)

$ npm test
 Test Files  47 passed (47)
      Tests  388 passed (388)
```
