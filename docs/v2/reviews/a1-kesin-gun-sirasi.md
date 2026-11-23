# a1-kesin.json — gün sırası denetimi (dilbilimci)

Dosya: `content/v2/curriculum/a1-kesin.json` (dal `content/a1-kesin`), 8.–56. gün, 531 kart; 1.–7. gün (164 kart) öğretilmiş sayıldı. Tarih: 2026-11-22. Dosya değiştirilmedi.
Makinece okunur öneriler: `docs/v2/reviews/a1-kesin-gun-sirasi.json`.

## Bakılan şey

Tek soru: bir kart, kendisinden önce öğrenilmesi gereken başka bir karttan önce mi geliyor? Bakılan türler: bileşik sözcük parçasından önce, türemiş sözcük kökünden önce, ön ekli fiil yalın fiilden önce, dişil biçim eril biçimden önce, `#2` kartı `#1` kartından önce, kalıp ifadesi parçasından önce.

Yöntem: bütün tablo elle okundu; ayrıca "bir kartın adı daha geç gelen başka bir kartın adını içeriyor mu" taraması betikle koşuldu (ses değişimli türetmeler, ör. Größe/groß, elle arandı). Aynı gün içindeki ön koşullar yazılmadı. Kartların anlamına yalnız şüpheli yerlerde bakıldı (gerade, stehen, weh, passen).

Sayılmayanlar (zevk meselesi ya da saydam olmayan türetme): Entschuldigung → entschuldigen (hazır söz olarak önce öğrenilir), lange → lang, Deutsch → deutsch, lieben → lieb, Geschwister → Schwester, Stand → stehen, möchten → mögen, ayrılabilir ön ekin edat kartı (aufstehen → auf, anrufen → an), verstehen → stehen, Supermarkt → super.

## A — ön koşul aynı haftada, daha geç günde (düzeltilebilir): 9

| # | Bağımlı kart (gün) | Ön koşul (gün) | Hafta | Öneri: taşınan → gün | Karşılık → gün |
|---|---|---|---|---|---|
| 1 | fernsehen (11) | sehen (13) | 2 | sehen → 11 | Kurs → 13 |
| 2 | zurückrufen (17) | zurück (20) | 3 | zurück → 17 | Ei → 20 |
| 3 | Hausaufgabe (17) | Haus (20) | 3 | Haus → 17 | regnen → 20 |
| 4 | Größe (16) | groß (20) | 3 | Größe → 20 | na → 16 |
| 5 | arbeitslos (23) | Arbeit (28) | 4 | Arbeit → 23 | Garantie → 28 |
| 6 | geradeaus (22) | gerade (24) | 4 | geradeaus → 24 | Mensch → 22 |
| 7 | Krankschreibung (29) | schreiben (32) | 5 | schreiben → 29 | Wand → 32 |
| 8 | Straßenbahn (36) | Straße (40) | 6 | Straßenbahn → 40 | Foto → 36 |
| 9 | Vorschlag (44) | vorschlagen (45) | 7 | Vorschlag → 45 | Durst → 44 |

Seçim gerekçeleri:
- 2: zurückrufen 20. güne taşınsaydı aynı gündeki Rückruf kökünden önce kalırdı; bu yüzden ön koşul öne alındı.
- 4: groß ve klein aynı günde kalsın diye bağımlı kart (Größe) taşındı.
- 5: en zayıf bulgu; arbeiten 7. günde biliniyor, ama bileşiğin parçası olan isim 28. günde. Takas ucuz olduğu için önerildi.
- 6: gerade kartının anlamı "şu anda, az önce, düz"; "düz" anlamı geradeaus'un parçası.
- 8: 40. günün konusu "iki kelimeden bir kelime"; Straßenbahn o güne örnek olarak da uyar.
- Taşınan ve karşılık kartların hiçbiri günün başındaki ders/başlık kartı değil (K1 sırasına göre yerleşmiş kartlar; k1.json sıra numaralarıyla bakıldı).

Çapraz kontrol (betikle, bir kez): 9 takas birlikte uygulandı; gün başına kart adedi değişmedi, hiçbir kart hafta değiştirmedi, 18 kartın hepsi farklı, 9 ihlalin 9'u kapandı ve tablodaki 107 ön koşul çiftinde yeni ihlal doğmadı.

## B — ön koşul daha sonraki haftada (yalnız not): 14 çift, 11 kart

| Kart (gün, hafta) | Ön koşul (gün, hafta) | Not |
|---|---|---|
| Glückwunsch (11, h2) | Glück (33, h5) | bileşik |
| Glückwunsch (11, h2) | Wunsch (44, h7) | bileşik |
| aufstehen (11, h2) | stehen#2 (36, h6) | "ayakta durmak" anlamı #2 kartında; stehen#1 (20. gün) "yazılı olmak, yakışmak" |
| unterschreiben (11, h2) | schreiben (32, h5) | ön ekli fiil |
| wehtun (15, h3) | weh (43, h7) | weh kartı "weh (tun)"; iki kart neredeyse aynı (çift kart şüphesi) |
| Hausaufgabe (17, h3) | Aufgabe (43, h7) | bileşik; Haus için A-3 |
| aufschreiben (22, h4) | schreiben (32, h5) | ön ekli fiil |
| Vermieter (24, h4) | Miete (29, h5) | türemiş |
| Erkältung (29, h5) | kalt (48, h7) | zayıf |
| erkältet (36, h6) | kalt (48, h7) | zayıf |
| Ankunft (30, h5) | ankommen (43, h7) | türemiş isim |
| Parkplatz (30, h5) | Platz (39, h6) | bileşik |
| Zugausfall (31, h5) | Zug (49, h7) | bileşik |
| Zugausfall (31, h5) | ausfallen (53, h8) | türemiş parça |

### 1.–7. gün kartları (sabit; tablo dışı, yalnız bilgi): 8

Bağımlı kart ilk haftada öğretilmiş, parçası tabloda sonra geliyor. JSON'da ayrı anahtar: `ilk_hafta_notu` (B ile aynı biçim).

| Kart (gün) | Ön koşul (gün) |
|---|---|
| passen#2 (5) | passen (31) — `#2`, `#1`'den 26 gün önce |
| Hausarzt (7) | Haus (20; A-3 ile 17) |
| Telefonnummer (6) | Telefon (39) |
| Vorname, Nachname (6) | Name (16) |
| einundzwanzig (4) | und (12) |
| Uhrzeit (5) | Zeit (8) |
| wie_viel (6) | viel (8) |

## C — ön koşul tabloda ve 1.–7. günde hiç yok (yalnız not): 44 çift

Sözlükte (lexicon batch dosyaları) kartı olan kökler:
- rufen ← anrufen (10), zurückrufen (17)
- steigen ← aussteigen (17), umsteigen (37)
- legen ← auflegen (17) · wählen ← Durchwahl (17) · antworten ← Anrufbeantworter (17)
- verkaufen ← Verkäufer (23) · freuen ← Freut_mich! (23) · stören ← Störung (24) · Meister ← Hausmeister (24)
- Markt ← Supermarkt (27) · Kasse ← Krankenkasse (29)
- Stelle ← Tankstelle (30), Haltestelle (34) · halten ← Haltestelle (34)
- Schicht ← Schichtplan (31) · Plan ← Schichtplan (31), Fahrplan (31)
- sich ← sich_treffen (43) · heiraten ← verheiratet (46) · Wagen ← Krankenwagen (46) · Blut ← Blutdruck (46) · melden ← Krankmeldung (46)
- fallen ← ausfallen (53) · packen ← einpacken (54)

Sözlükte de kartı olmayan kökler:
- Bahn ← Bahnhof (17), U-Bahn (30), Bahnsteig (31), Straßenbahn (36)
- Frühstück ← frühstücken (11) · Rad ← Fahrrad (17) · neben ← Nebenkosten (26) · Wurst ← Bratwurst (29)
- anmelden ← Anmeldung (30) · besser ← Gute_Besserung! (30) · parken ← Parkplatz (30) · tanken ← Tankstelle (30)
- waschen, Maschine ← Waschmaschine (37) · probieren ← anprobieren (37) · wachsen ← aufwachsen (45)
- Zahn ← Zahnarzt (46) · Aufnahme ← Notaufnahme (46)

## Soru dışı, yolda görülenler (karar baş oturumda)

- Gün başlığında geçen sözcüğün kartı başka haftada: Schlüssel (başlık 22, kart 47), weiß (23 / 47), Kaffee (12 / 41), gekocht → kochen (36 / 49), Straße (34 / 40; A-8'den etkilenmez), lieber (32 / 43), neben (27 / tabloda yok).
- Tablodaki 13 kimliğin lexicon kaydı bulunamadı (`batch-*.json`): Anrufbeantworter, Durchwahl, Rückruf, Warteschleife, Vorgesetzte, Lohn, Gehaltsabrechnung, Schichtplan, Bahnsteig, Fahrplan, Abfahrt, Fahrschein, Zugausfall.

## Sonuç

A: 9 (hepsi aynı hafta içi takasla kapanır) · B: 14 çift (11 kart) + ilk haftadan 8 not · C: 44 çift.
Durum: AÇIK — A takasları baş oturumun betiğiyle (`duzeltmeler` alanı) uygulanınca gün sırası bulguları kapanır; B ve C hafta sınırı ya da tablo kapsamı nedeniyle not olarak kalır. Hata oranı (A): 9 / 531 kart = %1,7.
