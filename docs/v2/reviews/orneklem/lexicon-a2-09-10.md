# Örneklem kontrolü: lexicon a2-09 (150–153. gün) + a2-10 (154–156. gün)

- Ajan: qa (örneklem), 2026-11-23. Dosyalar `draft` (dilbilimci turundan sonra).
- **Tohum: `20261124`** (`random.Random(20261124)`; sıra: a2-09 forms 9, examples 6, mistakes 3; a2-10 forms 6, examples 4, mistakes 2; `rng.sample` havuzu kart sırası × alan sırası).
- Havuz: a2-09 26 kart, 104 boşluk / 131 örnek / 34 not; a2-10 19 kart, 76 / 95 / 30. Orantı ≈ %58 / %42 → 18 + 12 öğe (15 boşluk, 10 örnek, 5 not).
- Gün denetimi: `a2-kesin.json` `lex_doldurma` (a2-09, a2-10) + `gunler[].kartlar`, `grammar.json` dersleri (a2-12:t4 "Es ist …, … zu" 137; a2-13:t2 düzensiz Präteritum tablosu 149: kam, blieb, zog, wurde; a2-14:t1 werden 155; a2-14:t2 vorhaben + zu 156). Eşdeğerlik: `web/src/core/esdeger.ts` (büyük/küçük harf ve ümlaut düzeltilir; also_ok dışında eş anlamlı kabul edilmez).
- İpucu notu: `hint_tr` düğmenin arkasında (açılınca XP 0); cevabı söylemesi kusur sayılmadı, yalnız yanlış ipucu GERİ.

## Sonuç
**30 GEÇTİ, 0 GERİ (%0).** Eşik (%2 → 1 öğe) aşılmadı; dosyalar dilbilimciye geri gönderilmez.

| # | Dosya · öğe | Sonuç | Neden |
|---|---|---|---|
| 1 | a2-09 · lx:Schlitten forms[2] "Wir sind gestern Schlitten ___." | GEÇTİ | "kızak kaydık" → tek cevap gefahren; sein doğru. |
| 2 | a2-09 · lx:Krankheit forms[2] "Hatten Sie schon mal eine schwere ___?" | GEÇTİ | "ağır bir hastalık" → tek cevap; doğal anamnez sorusu. |
| 3 | a2-09 · lx:Schulzeit forms[0] "In meiner ___ hatte ich viele Freunde." | GEÇTİ | "okul yıllarımda" → Schulzeit; Kindheit/Jugend Türkçeye uymuyor. |
| 4 | a2-09 · lx:Heimweh forms[1] "Hast du noch ___?" | GEÇTİ | tek cevap. |
| 5 | a2-09 · lx:Bestellung forms[1] "Ich habe gestern ___, aber die Bestellung …" | GEÇTİ | bestellt tek cevap (bestellen 43. gün). |
| 6 | a2-09 · lx:Kleinigkeit forms[0] "Ich habe nur eine ___ gegessen." | GEÇTİ | "bir şeyler atıştırdım" → tek cevap. |
| 7 | a2-09 · lx:Taschengeld forms[1] "Als Kind bekam ich jede Woche zwei Euro ___." | GEÇTİ | tek cevap; bekam bekommen kartında (149 sonrası). |
| 8 | a2-09 · lx:Jahrzehnt forms[1] "Im Jahr 1990 kam er nach Bayern und blieb drei ___." | GEÇTİ | "otuz yıl" + "drei" → Jahrzehnte tek cevap; kam/blieb 149, "im Jahr" 152 (günün noktası). |
| 9 | a2-09 · lx:Schulabschluss forms[3] "Ohne ___ ist es echt schwer, einen Job zu finden." (also_ok: Abschluss) | GEÇTİ | Abschluss doğru ve sık; Ausbildung/Zeugnis başka anlam, haklı olarak yok. "Es ist schwer, … zu" 137. gün. |
| 10 | a2-09 · lx:Übung ex5 "– Wie hast du so gut Deutsch gelernt? – Mit viel Übung und vielen Fehlern!" | GEÇTİ | doğal; Fehler 39. |
| 11 | a2-09 · lx:berühmt ex1 "Später zog sie nach Berlin und wurde dort berühmt." | GEÇTİ | zog, wurde 149 tablosunda; 151 noktası (yazı geçmişi). |
| 12 | a2-09 · lx:Kleinigkeit ex2 "Das Geschenk ist klein, nur eine Kleinigkeit." | GEÇTİ | doğal; Geschenk 15, klein 20. |
| 13 | a2-09 · lx:Krankheit ex3 "Ach, nur 'ne kleine Erkältung, keine schlimme Krankheit." | GEÇTİ | alltag doğal; Erkältung 29, schlimm 9. |
| 14 | a2-09 · lx:Generation ex3 "Die junge Generation? Die schaut nur noch aufs Handy!" | GEÇTİ | doğal; "nur noch" = "artık sadece" doğru çevrilmiş. |
| 15 | a2-09 · lx:schneien ex4 "– Kommst du mit dem Auto? – Nee, es hat die ganze Nacht geschneit, ich nehm den Bus." | GEÇTİ | doğal konuşma; Perfekt konuşmada (151 ile uyumlu). |
| 16 | a2-09 · lx:Schulzeit mistakes[0] "In meiner Schulzeit ich hatte …" → "hatte ich" | GEÇTİ | Türkçe konuşanın gerçek sıralama hatası; doğrusu doğru. |
| 17 | a2-09 · lx:Spielplatz mistakes[0] "im Spielplatz" → "auf dem Spielplatz" | GEÇTİ | gerçek hata ("parkta" → in); doğru. |
| 18 | a2-09 · lx:Geburt mistakes[0] "Wann ist deine Geburt?" → "Wann hast du Geburtstag?" | GEÇTİ | Geburt/Geburtstag karışması gerçek; doğru biçim doğru. |
| 19 | a2-10 · lx:Fortschritt forms[1] "In drei Monaten habe ich große Fortschritte ___." | GEÇTİ | gemacht tek cevap. |
| 20 | a2-10 · lx:Wolke forms[1] "Siehst du die dunklen ___?" | GEÇTİ | tek cevap; dunkel 122. |
| 21 | a2-10 · lx:Verlängerung forms[3] "Ohne ___ schaffe ich das nicht." | GEÇTİ | "ek süre" → Verlängerung; schaffen 68. (Takip: e-posta bağlamında "Fristverlängerung" da doğru, nadir; engel değil.) |
| 22 | a2-10 · lx:Karriere forms[1] "Willst du ___ machen?" | GEÇTİ | tek cevap. |
| 23 | a2-10 · lx:sich_vornehmen forms[1] "Ich habe ___ vorgenommen, jeden Tag spazieren zu gehen." | GEÇTİ | mir tek cevap; 156 kartı, zu yapısı aynı gün. |
| 24 | a2-10 · lx:Sonne forms[0] "Wir sitzen draußen in der ___." | GEÇTİ | tek cevap; draußen/sitzen 33. |
| 25 | a2-10 · lx:abgeben ex5 "Als ich ankam, gab ich zuerst die Unterlagen ab." | GEÇTİ | als 150, ankommen 43, Unterlagen 94; gab 149 tablosunda yok ama kartın verb alanı (gab ab) öğretiyor, "es gab" önceden geçti. |
| 26 | a2-10 · lx:Niveau ex3 "– Ist der Kurs nicht zu schwer für dich? – Nee, das Niveau passt genau." | GEÇTİ | doğal; passen 31. |
| 27 | a2-10 · lx:weitermachen ex3 "– Soll ich aufhören? – Nein, mach weiter, das ist super!" | GEÇTİ | doğal; aufhören 90. |
| 28 | a2-10 · lx:Erfolg ex3 "– Morgen habe ich die Prüfung. – Viel Erfolg! Du schaffst das." | GEÇTİ | doğal; werden kullanılmamış. |
| 29 | a2-10 · lx:wiederkommen mistakes[1] "Er hat wiedergekommen" → "Er ist wiedergekommen" | GEÇTİ | gerçek yardımcı fiil hatası; doğru. |
| 30 | a2-10 · lx:Sonne mistakes[0] "Die Sonne öffnet" → "Die Sonne kommt raus" | GEÇTİ | "açmak"tan birebir çeviri; gerçek hata; forms[1] also_ok (heraus, durch) ile çelişmiyor. |

## GERİ listesi
Yok.

## Takip (engel değil)
- #21 `lx:Verlängerung` forms[3]: istenirse `also_ok: ["Fristverlängerung"]` (doğru bileşik; öğrenci için seyrek).
