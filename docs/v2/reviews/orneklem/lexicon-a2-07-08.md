# Örneklem kontrolü: lexicon a2-07 (142–145. gün) + a2-08 (146–149. gün)

- Ajan: qa (örneklem), 2026-11-23. Dosyalar `draft` (dilbilimci turundan sonra).
- **Tohum: `20261123`** (`random.Random(20261123)`; sıra: a2-07 forms 8, examples 5, mistakes 3; a2-08 forms 7, examples 5, mistakes 2; `rng.sample` havuzu kart sırası × alan sırası).
- Havuz: a2-07 104 boşluk / 156 örnek / 48 not; a2-08 96 / 126 / 38. Örneklem 30 öğe (15 boşluk, 10 örnek, 5 not).
- Gün denetimi: `a1-kesin.json` + `a2-kesin.json` `kartlar` (kartın ilk günü), `grammar.json` dersleri. Eşdeğerlik: `web/src/core/esdeger.ts` (küçük/büyük harf farkı yok; also_ok dışında eş anlamlı kabul edilmez).
- İpucu notu: `hint_tr` düğmenin arkasında, açılınca XP 0 (Soru.tsx `IpucuDugmesi`, `hinted`); cevabı söylemesi tasarım gereği, kusur sayılmadı. Yalnız yanlış ipucu GERİ sayılır.

## Sonuç
**29 GEÇTİ, 1 GERİ (%3,3).** Eşik 1 öğe; aşılmadı. Tek GERİ düzeltme önerisiyle aşağıda (dosyanın tamamı geri gönderilmez, dilbilimci farkına tek satır).

| # | Dosya · öğe | Sonuç | Neden |
|---|---|---|---|
| 1 | a2-07 · lx:sauber forms[0] "Das Zimmer ist nicht ___." | GEÇTİ | "temiz" → tek cevap sauber. |
| 2 | a2-07 · lx:Aufenthalt forms[1] "Wie lange dauert Ihr ___?" | GEÇTİ | "kalacaksınız" → Aufenthalt; Urlaub/Besuch Türkçeye uymuyor. |
| 3 | a2-07 · lx:WLAN forms[3] "Im Zug gibt es leider ___ WLAN." | GEÇTİ | tek cevap kein (das WLAN). |
| 4 | a2-07 · lx:Ferienwohnung forms[3] "Die ___ kostet achtzig Euro pro Nacht." | GEÇTİ | "tatil evi" tek cevap. |
| 5 | a2-07 · lx:Flughafen forms[0] "… zum ___?" | GEÇTİ | tek cevap; am besten 26. gün. |
| 6 | a2-07 · lx:Flughafen forms[2] "Am ___ haben wir zwei Stunden gewartet." | GEÇTİ | tek cevap. |
| 7 | a2-07 · lx:Lage forms[3] "…, aber die ___ war top." | GEÇTİ | tek cevap. Küçük not: "top" kartlı değil, Türkçe satır ("süperdi") anlamı veriyor. |
| 8 | a2-07 · lx:Tante forms[3] "Meine ___ wohnt in der Türkei." | GEÇTİ | "teyzem" → Tante tek cevap. |
| 9 | a2-07 · lx:Handtuch ex1 "Könnten Sie bitte die Handtücher wechseln?" | GEÇTİ | Könnten Sie 17. gün (gr:a1-12:t1); wechseln aynı günün önceki kartı; 145 dersinin cümlesi. |
| 10 | a2-07 · lx:Preis ex1 "Wie hoch ist der Preis pro Nacht?" | GEÇTİ | hoch 70. gün; doğal. |
| 11 | a2-07 · lx:Preis ex4 "– Ist das Ihr bester Preis? – … einen besseren Preis machen." | GEÇTİ | Komparativ 25, Superlativ 26, sıfat sonu 144 (günün noktası); sıfat önünde "besten" 122'de örnekte var. Doğal pazarlık dili. |
| 12 | a2-07 · lx:Museum ex6 "Im Museum darf man nicht essen und trinken." | GEÇTİ | genel kural cümlesi, olgusal iddia değil. |
| 13 | a2-07 · lx:Ausland ex2 "Jonas lebt seit drei Jahren im Ausland." | GEÇTİ | leben 18; ad önceki partilerde de var. |
| 14 | a2-07 · lx:wechseln mistakes[1] "Wir sind das Zimmer gewechselt" → haben | GEÇTİ | gerçek hata (oda değiştirmeyi hareket sanıp sein); nesneli kullanımda doğru. |
| 15 | a2-07 · lx:Tante mistakes[0] "nach meiner Tante" → zu meiner Tante | GEÇTİ | 142 dersinin tipik hatası; doğru. |
| 16 | a2-07 · lx:übernachten mistakes[0] "Wir sind bei Freunden übernachtet" → haben | GEÇTİ | gerçek hata; doğru. |
| 17 | a2-08 · lx:gründen forms[2] "Zwei Freunde ___ zusammen ein Café." | GEÇTİ | "kurdu" + tek boşluk → gründeten; 148 noktası. |
| 18 | a2-08 · lx:zurückfahren forms[3] "Ende August fahre ich ___." | GEÇTİ | "dönüyorum" → zurück; tek parça cevap (brif md. 11). |
| 19 | a2-08 · lx:Zeitung forms[2] "Wo ist die ___ von heute?" | GEÇTİ | tek cevap. |
| 20 | a2-08 · lx:hinfallen forms[1] "… ___ er auf dem Eis hin." | GEÇTİ | fiel; kart ve düzensiz Präteritum aynı gün (149). |
| 21 | a2-08 · lx:Zusteller forms[2] "Wann kommt ___ Zusteller normalerweise?" | GEÇTİ | "Kargocu" (iyeliksiz) → der. Küçük not: "unser" de doğal ama Türkçe satır iyelik vermiyor; normalerweise kartlı değil. |
| 22 | a2-08 · lx:vergehen forms[2] "Die zwei Wochen sind so schnell ___." (also_ok: vorbeigegangen) | **GERİ** | Başka doğru ve sık cevap eksik: **vorbei** ("Die zwei Wochen sind so schnell vorbei", lx:vorbei 76. gün). also_ok zaten başka fiili (vorbeigegangen) kabul ediyor; vorbei yazan öğrenci yanlış alır. **Öneri:** `"also_ok": ["vorbeigegangen", "vorbei"]`. |
| 23 | a2-08 · lx:Postleitzahl forms[2] "Ich habe die falsche ___ geschrieben." (also_ok: PLZ) | GEÇTİ | PLZ doğru kısaltma; küçük harf eşdeğer. |
| 24 | a2-08 · lx:Anschrift ex5 "– Ist der Brief zurückgekommen? – Ja, obwohl die Anschrift richtig war." | GEÇTİ | obwohl 143, zurückkommen 111, Brief 141; doğal. |
| 25 | a2-08 · lx:Zeitung ex2 "Mein Vater suchte damals in der Zeitung eine Wohnung." | GEÇTİ | düzenli Präteritum 148 (günün noktası); damals 106. |
| 26 | a2-08 · lx:Bauernhof ex1 "Mein Opa arbeitete jeden Tag auf dem Bauernhof." | GEÇTİ | Opa aynı günün önceki kartı; 148 noktası. |
| 27 | a2-08 · lx:einschlafen ex1 "Ich kann abends nicht einschlafen." | GEÇTİ | doğal, öğretilmiş sözcükler. |
| 28 | a2-08 · lx:täglich ex5 "– Ist das Café auch sonntags offen? – Ja, das hat täglich auf." | GEÇTİ | aufhaben 135, Café 120, offen önceki; konuşma dili doğal. |
| 29 | a2-08 · lx:Postleitzahl mistakes[0] "Was ist Ihr Postleitzahl?" → Ihre | GEÇTİ | Türkçede cinsiyet yok; gerçek hata, doğru. |
| 30 | a2-08 · lx:Postleitzahl mistakes[1] "Postkode" → die Postleitzahl / PLZ | GEÇTİ | "posta kodu"ndan birebir çeviri; gerçek hata; PLZ also_ok ile çelişmiyor. |

## GERİ listesi
- `content/v2/registry/lexicon/batch-a2-08.json` · `lx:vergehen` · `forms[2]`: also_ok'ta sık doğru cevap **vorbei** eksik → `also_ok` listesine `"vorbei"` ekle.

## Takip (engel değil)
- #7 `top`, #21 `normalerweise`: boşluk cümlesinde kartsız sözcük; Türkçe satır anlamı veriyor. Dilbilimci farkında istenirse "sehr gut" / cümleden çıkarma.
