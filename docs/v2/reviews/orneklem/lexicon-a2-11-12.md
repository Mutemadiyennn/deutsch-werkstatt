# Örneklem kontrolü: lexicon a2-11 (157–161. gün) + a2-12 (162–166. gün)

- Ajan: qa (örneklem), 2026-11-23. Dosyalar `draft` (dilbilimci turundan sonra; a2-12'de aynı anda tek alan düzeltmesi sürüyordu, dosya yalnız okundu).
- **Tohum: `20261125`** (`random.Random(20261125)`; sıra: a2-11 forms 10, examples 6, mistakes 3; a2-12 forms 5, examples 4, mistakes 2; `rng.sample` havuzu kart sırası × alan sırası).
- Havuz: a2-11 28 kart, 112 boşluk / 140 örnek / 31 not; a2-12 15 kart, 60 / 75 / 21. Orantı ≈ %64 / %36 → 19 + 11 öğe (15 boşluk, 10 örnek, 5 not).
- Gün denetimi: `a2-kesin.json` `lex_doldurma` (a2-11, a2-12) + `gunler[].kartlar`; dersler gr:a2-14:t3 (hätte/würde, 157), gr:a2-14:t4 (um … zu / damit, 158), dn:relativ-basit (159). Destek sözcükleri A1 partilerinde (Messer, unbedingt, Chefin, Techniker, Kollegin, Wand, Ding, frühstücken …); "an deiner Stelle" lx:Stelle kartında (58. gün); "Lass uns …" kalıbı patterns.json'da. Eşdeğerlik: `web/src/core/esdeger.ts` (büyük/küçük harf ve ümlaut düzeltilir; also_ok dışında eş anlamlı kabul edilmez).
- İpucu notu: `hint_tr` düğmenin arkasında; cevabı söylemesi kusur sayılmadı, yalnız yanlış ipucu GERİ.

## Sonuç
**30 GEÇTİ, 0 GERİ (%0).** Eşik (%2 → 1 öğe) aşılmadı; dosyalar dilbilimciye geri gönderilmez.

| # | Dosya · öğe | Sonuç | Neden |
|---|---|---|---|
| 1 | a2-11 · lx:rund forms[0] "Das ist ein ___ Ding, das man an die Wand hängt." | GEÇTİ | rundes tek cevap ("yuvarlak"); relatif 159'da, kart 161. |
| 2 | a2-11 · lx:Lotto forms[1] "Wenn ich im Lotto gewinnen würde, ___ ich ein großes Haus." | GEÇTİ | hätte tek doğal cevap; 157'nin dil noktası. |
| 3 | a2-11 · lx:Wecker forms[0] "Ich hab den ___ nicht gehört!" | GEÇTİ | tek cevap. |
| 4 | a2-11 · lx:beschreiben forms[1] "Können Sie die Schmerzen ___?" | GEÇTİ | "tarif edebilir misiniz" → beschreiben; erklären başka anlam, haklı olarak yok. |
| 5 | a2-11 · lx:Werkzeug forms[3] "Das ist ein Werkzeug, ___ man zum Reparieren braucht." | GEÇTİ | das tek sık cevap (welches seyrek); 159 noktası. |
| 6 | a2-11 · lx:einatmen forms[3] "Haben Sie Schmerzen, wenn Sie ___?" (also_ok: atmen) | GEÇTİ | atmen doğru ve sık; not ("Einatmen Sie") also_ok ile çelişmiyor. |
| 7 | a2-11 · lx:Weltreise forms[0] "…, würde ich eine ___ machen." | GEÇTİ | "dünya turu" → tek cevap. |
| 8 | a2-11 · lx:ungefähr forms[2] "So ungefähr ___ sieben." (also_ok: gegen) | GEÇTİ | um / gegen ikisi de doğru; not "wie um sieben"i doğru yanlışlıyor. |
| 9 | a2-11 · lx:Ladegerät forms[2] "Passt dein ___ auch für mein Handy?" | GEÇTİ | tek cevap; "passt für" konuşmada yaygın. |
| 10 | a2-11 · lx:Spaziergang forms[3] "Ein Spaziergang ___ dir guttun." | GEÇTİ | "iyi gelirdi" → würde; 157 noktası. |
| 11 | a2-11 · lx:missverstehen ex3 "Ich spreche langsam, damit mich niemand missversteht." | GEÇTİ | doğal; damit 158'de, kart 160. |
| 12 | a2-11 · lx:Rat ex2 "– Was würdest du an meiner Stelle machen? – … – Danke für den Rat!" | GEÇTİ | doğal; "an deiner Stelle" lx:Stelle (58), würde 157. |
| 13 | a2-11 · lx:ähnlich ex2 "– Ist das ein Messer? – So was Ähnliches, aber kleiner." | GEÇTİ | doğal, tarif günü (159) ile uyumlu. |
| 14 | a2-11 · lx:anders ex1 "– Du willst also nicht kommen? – Doch! Das war anders gemeint." | GEÇTİ | doğal; olumsuz soruya "Doch" doğru; 160 konusu. |
| 15 | a2-11 · lx:Haustier ex4 "– Die Kinder wollen unbedingt ein Haustier. – Na ja, und wer geht dann mit dem Hund raus?" | GEÇTİ | doğal; unbedingt A1'de. |
| 16 | a2-11 · lx:ähnlich ex5 "Er heißt Markus oder so ähnlich." | GEÇTİ | doğal konuşma kalıbı. |
| 17 | a2-11 · lx:missverstehen mistakes[0] "missgeverstanden" → "missverstanden" | GEÇTİ | vurgulu miss- yüzünden gerçek ge- hatası; doğrusu doğru. |
| 18 | a2-11 · lx:Plastik mistakes[0] "Plastik Tüte" → "Plastiktüte" | GEÇTİ | Türkçedeki ayrı yazımdan gelen gerçek hata. |
| 19 | a2-11 · lx:einfallen mistakes[1] "Es hat mir eingefallen" → "Es ist mir eingefallen" | GEÇTİ | gerçek yardımcı fiil hatası; doğru. |
| 20 | a2-12 · lx:dazwischenkommen forms[2] "…, weil etwas ___ ist." | GEÇTİ | dazwischengekommen tek parça, tek cevap. |
| 21 | a2-12 · lx:dazwischenkommen forms[1] "Ich komme morgen, wenn nichts ___." | GEÇTİ | dazwischenkommt tek parça, tek cevap. |
| 22 | a2-12 · lx:Kundenkarte forms[3] "Ich habe meine Kundenkarte zu Hause ___." (also_ok: gelassen) | GEÇTİ | vergessen / gelassen doğru. (Takip: "liegen lassen" da sık.) |
| 23 | a2-12 · lx:nüchtern forms[2] "…, weil ich nüchtern sein ___." | GEÇTİ | "gerekiyor" → muss. (Takip: doktor talimatı bağlamında "soll" da doğal.) |
| 24 | a2-12 · lx:anstoßen forms[2] "Am Freitag haben wir im Büro auf eine Kollegin ___." | GEÇTİ | angestoßen tek parça, tek cevap; Türkçe "bir iş arkadaşımızın" ile uyumlu. |
| 25 | a2-12 · lx:anstoßen ex3 "Auf die neue Kollegin! Lasst uns anstoßen!" | GEÇTİ | doğal kadeh sözü; "Lass uns …" kalıbı önceden var. |
| 26 | a2-12 · lx:nüchtern ex3 "– Willst du 'nen Kaffee? – Nee, ich muss nüchtern bleiben. Ich geh gleich zum Arzt." | GEÇTİ | doğal alltag. |
| 27 | a2-12 · lx:Mailbox ex1 "Ich habe Ihnen gestern auf die Mailbox gesprochen." | GEÇTİ | "auf die Mailbox sprechen" yerleşik kullanım. |
| 28 | a2-12 · lx:drucken ex1 "Kann ich hier etwas drucken?" | GEÇTİ | doğal; B1 kartı yok. |
| 29 | a2-12 · lx:drucken mistakes[0] "Ich drücke das Formular" → "Ich drucke das Formular" | GEÇTİ | drücken (139) ile gerçek karışma; doğrusu doğru. |
| 30 | a2-12 · lx:Kundenkarte mistakes[1] "Ich habe nicht eine Kundenkarte" → "keine" | GEÇTİ | Türkçe "yok"tan gelen gerçek nicht/kein hatası; forms[1] ile uyumlu. |

## GERİ listesi
Yok.

## Takip (engel değil)
- #22 `lx:Kundenkarte` forms[3]: istenirse `also_ok`'a "liegen lassen" / "liegengelassen" (sık; öğrencinin yazma olasılığı düşük).
- #23 `lx:nüchtern` forms[2]: istenirse `also_ok: ["soll"]` (doktorun talimatı anlamında doğal; Türkçe "gerekiyor" muss'u gösteriyor).
