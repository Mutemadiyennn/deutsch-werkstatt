# PM-078 C ölçümü: M1 1.–7. gün, cümle kapısı

Ölçüm: İÇ, 20.11. Betikler `c-olcum/olcum.py` (ölçüm) ve `c-olcum/rapor.py` (bu rapor ve `sonuc.json`); kod değil, rapor aracı, ANA'nın doğrulayıcı sayacına örnek. Halka önerilerinin denetimi `c-olcum/halka_kontrol.py` (aynı küme).

## Kural ve ekler

PM-078 C'deki küme uygulandı; betiğin eklediği ya da yorumladığı her şey aşağıda **ek** diye işaretli.

- **Bilinen küme(t):**
  - o ana kadar tanıtılmış kartlar (`yeni_kartlar` sırası, gün içinde de sıra);
  - biten temel derslerin `teach.de` biçimleri, tablo hücreleri ve `teach.lexeme` kartları;
  - `card:false` çerçeve kartları;
  - WORLD kişi adları;
  - **ek:** WORLD yer adlarının özel ad bölümü (Stadler, Weber; kartı olan Bäckerei, Bürgerbüro, Rathaus ad sayılmaz) ve `genel-adlar.md` başlıklarındaki adlar;
  - **ek:** rakamlar; r0-04 bitince bileşik sayılar, r0-06 bitince sıra sayıları.
- **Sözcük → kart:** kartın `de`, `pl`, `forms[].answer` ve `verb` alanları (`aux` hariç; artikel eşlenmez).
  - **ek (2. sürüm, inceleme #163):** kart tanıtılınca yalnızca tanıtımda **gösterilen** biçimler bilinir: başlık ve çoğul (`garden.ts` `cevapGosterildi` ile aynı). Öteki çekimler (gehe, gehst, gute) bir dersin öğrettiği biçimlerle açılır; raporda `~` ile.
  - **ek:** kapalı eşadlı listesi: "ja" (evet) lx:ja kartı tanıtılınca bilinir; çerçevedeki lx:ja#2 (ya, işte) başka anlam.
  - **ek:** dersin çok sözcüklü kalıbındaki sözcük, kendi kartı (fiil değil) o derste öğretilmiyorsa öğretilmiş sayılmaz ("Guten Tag, hier ist {name}." "hier"i öğretmez). Ama kalıbın kendisi cümlede aynen geçerse sözcükleri bilinir ("Guten Tag, hier ist {name}. Geht Samstag?").
  - **ek:** cevaptaki sözcük yalnızca kartın başlığıyla akrabaysa (ilk 3 harfi başlıkta geçiyorsa) o karta eşlenir. Böylece lx:Dienstag'ın "___ Dienstag" boşluğundaki "Letzten" lx:Dienstag'a düşmez. Fiil kartlarında tek sözcüklü cevap akrabalık aranmadan eşlenir (ist, war, ging).
  - **ek:** birden çok kartın cevabında geçen sözcük en çok geçtiği karta eşlenir, eşitlikte hepsine ("ist" lx:sein'e gider, lx:passieren'e değil).
  - **ek:** birden çok karta eşlenen sözcük, bilinen adaylardan birinde gösterilen biçimse bilinir.
  - Eşlenemeyen sözcük tahmin edilmedi, ayrı listelendi (aşağıda `?` ile).
- **ek (kapalı liste, betikte açık):** `card:false` kartlarının `forms` dizininde olmayan artikel, zamir ve iyelik çekimleri (den, dem, mir, dir, ihn, ihnen, meinen …). Bunlar kartta yok; sayaç karttan okuyabilsin diye **şema isteği** aşağıda.
- **Biçimler:**
  - **A:** günün dersi henüz yapılmamış (bugünkü düzen: Bahçe önce).
  - **B:** günün dersi önce yapılmış (Halka'da dil noktası kelime halkasından önce gelirse).
  - **C:** B + sein ve haben şimdiki zaman biçimleri 1. günden çerçeve. PM bunu reddetti (#163); karşılaştırma için duruyor.
  - **D:** C + günün bütün kartları bilinir. Gün içi sıra en iyi kurulsa bile ulaşılabilecek **üst sınırdır**.

## 1. Kart cümleleri, tanıtıldığı anda

Sütunlar:
- **örnek 0:** 6 örnekten en az biri bilinmeyensiz olan kart.
- **örnek ≤1:** gösterim sınırı (en çok 1 bilinmeyen).
- **boşluk 0:** boşluk cümlelerinden en az biri bilinmeyensiz (cevap hariç).
- **hiç yok:** görev cümlesi (örnek ya da boşluk) bilinmeyensiz hiçbir cümlesi olmayan kart.
- **eksik cümle:** her kartın en az 2 görev cümlesi olması için yazılması gereken cümle (Halka kural 2).

**A**

| gün | kart | örnek 0 | örnek ≤1 | boşluk 0 | hiç yok | eksik cümle |
|---|---|---|---|---|---|---|
| 1 | 25 | 0 | 9 | 7 | 18 | 43 |
| 2 | 25 | 1 | 8 | 2 | 22 | 47 |
| 3 | 25 | 4 | 15 | 7 | 14 | 38 |
| 4 | 22 | 5 | 11 | 7 | 12 | 31 |
| 5 | 21 | 9 | 19 | 16 | 5 | 14 |
| 6 | 20 | 13 | 19 | 16 | 1 | 10 |
| 7 | 17 | 3 | 16 | 15 | 2 | 8 |
| **top.** | 155 | 35 | 97 | 70 | 74 | 191 |

**B**

| gün | kart | örnek 0 | örnek ≤1 | boşluk 0 | hiç yok | eksik cümle |
|---|---|---|---|---|---|---|
| 1 | 25 | 1 | 16 | 9 | 15 | 39 |
| 2 | 25 | 1 | 11 | 9 | 15 | 40 |
| 3 | 25 | 6 | 16 | 9 | 11 | 35 |
| 4 | 22 | 6 | 14 | 12 | 7 | 23 |
| 5 | 21 | 10 | 19 | 16 | 4 | 13 |
| 6 | 20 | 15 | 20 | 16 | 1 | 8 |
| 7 | 17 | 8 | 17 | 16 | 0 | 2 |
| **top.** | 155 | 47 | 113 | 87 | 53 | 160 |

**C**

| gün | kart | örnek 0 | örnek ≤1 | boşluk 0 | hiç yok | eksik cümle |
|---|---|---|---|---|---|---|
| 1 | 25 | 1 | 20 | 10 | 15 | 38 |
| 2 | 25 | 3 | 14 | 12 | 12 | 33 |
| 3 | 25 | 6 | 19 | 11 | 9 | 31 |
| 4 | 22 | 6 | 14 | 13 | 6 | 21 |
| 5 | 21 | 10 | 19 | 16 | 4 | 13 |
| 6 | 20 | 16 | 20 | 16 | 1 | 7 |
| 7 | 17 | 8 | 17 | 16 | 0 | 2 |
| **top.** | 155 | 50 | 123 | 94 | 47 | 145 |

**D**

| gün | kart | örnek 0 | örnek ≤1 | boşluk 0 | hiç yok | eksik cümle |
|---|---|---|---|---|---|---|
| 1 | 25 | 2 | 22 | 11 | 14 | 36 |
| 2 | 25 | 3 | 21 | 13 | 11 | 32 |
| 3 | 25 | 7 | 19 | 11 | 9 | 30 |
| 4 | 22 | 7 | 15 | 16 | 4 | 16 |
| 5 | 21 | 12 | 20 | 16 | 4 | 11 |
| 6 | 20 | 17 | 20 | 16 | 0 | 6 |
| 7 | 17 | 8 | 17 | 16 | 0 | 2 |
| **top.** | 155 | 56 | 134 | 99 | 42 | 133 |

**Okuma:**
- Kart cümleleri gerçek hayattan yazıldı, kümeye göre değil. 1.–3. günde kartların çoğunun bilinmeyensiz tek bir örneği bile yok.
- Sıra tek başına çözmüyor. D'de (sıra en iyi kurulsa) bile 133 cümle gerekiyor.
- **Sonuç:** 1.–5. günde **ilk karşılaşma cümlesi** yazılmalı. B'ye göre 160 cümle (1.–3. günde 114), D'ye göre 133. 6. ve 7. gün neredeyse hazır.

### Görev cümlesi hiç olmayan kartlar (B)

- **1. gün (15):** Mittwoch, Donnerstag, Samstag, Sonntag, Wochenende, Woche, Tag, heute, gestern, gehen, hallo, danke, ja, Frau, Herr
- **2. gün (15):** Februar, März, Mai, Juli, August, September, Dezember, Monat, Jahr, Sommer, Herbst, Winter, haben, offen, wann
- **3. gün (11):** zwei, drei, sieben, zehn, elf, zwölf, fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn
- **4. gün (7):** achtzig, neunzig, kosten, Tüte, bar, Brot, Apfel
- **5. gün (4):** Vormittag, Nachmittag, Abend, Nacht
- **6. gün (1):** Vorname

### Kart örneklerini en çok tıkayan sözcükler (B)

Kartı olan ama henüz tanıtılmamış sözcükler. Sayı, o sözcüğün tıkadığı örnek cümle sayısıdır:

noch 50, schon 43, wann 37, hier 36, zu 33, nur 30, da 26, bin 25, uhr 25, sind 25, mal 22, lange 21, termin 20, bus 19, minuten 19, apotheke 16, was 15, fährt 15, viele 15, erst 14, wieder 14, viel 14, gleich 14, zeit 13, echt 13, wird 12, gut 12, gern 12, dauert 12, leider 11.

Kartı tanıtılmış ama bu biçimi henüz gösterilmemiş sözcükler (`~`; çekim dersi gelince açılır):

hat 26, hast 18, kostet 14, macht 6, passt 6, jahren 5, gehst 4, herrn 4, kann 4, habe 3, neue 3, machst 3, zahle 3, halbe 3, später 3, brauchst 3, kannst 3, neues 2, gekommen 2, gegessen 2, verstanden 2, gesagt 2, spricht 2, arbeitet 2, arbeitest 2, gehe 1, zweit 1, viert 1, neuen 1, gekostet 1.

Bunların çoğu sık kullanılan küçük sözcük: noch, schon, nur, da, erst, wieder, gleich, dann, gern, sehr, oft, leider, echt. Ayrıca wann, Uhr, Termin, sind ve bin. Önerim (PM kararı): bunların bir kısmı 1.–2. güne alınsın ya da çerçeveye girsin (dokununca Türkçe).

## 2. Gün cümleleri (sahne, ses, prova, okuma, sınav, ders)

Bilinen küme: günün bütün kartları ve günün dersi. Görevde sınır 0 bilinmeyen, gösterimde en çok 1. Görev: öğrencinin ürettiği cümle (kabul listesinin ilki, prova seçenekleri, diyalogda öğrenci satırı, boşluklu alıştırma cümlesi). Seçmeli soruların (`pick`) seçenekleri sayılmadı.

| gün | görev ihlal | gösterim ihlal |
|---|---|---|
| 1 | 0 | 6 |
| 2 | 7 | 9 |
| 3 | 1 | 8 |
| 4 | 25 | 11 |
| 5 | 5 | 7 |
| 6 | 4 | 17 |
| 7 | 21 | 16 |
| **top.** | 63 | 74 |

**Görev ihlalleri (hepsi):**

- 2. gün · prova · "Alles Gute zum Geburtstag!" → gute
- 2. gün · prova · "Heute? Alles Gute zum Geburtstag!" → gute
- 2. gün · prova · "Schönes Wochenende!" → schönes
- 2. gün · prova · "Alles Gute zum Geburtstag!" → gute
- 2. gün · sinav · "Derya hat Anfang März Geburtstag." → ~hat
- 2. gün · ders.alistirma · "Frau Brandl ___ hier." → hier
- 2. gün · ders.alistirma · "___ du hier?" → hier
- 3. gün · sinav · "Das neue Büro hat die Nummer achtzehn." → ~neue, ~hat
- 4. gün · prova · "Dreißig Euro? Das ist zu teuer!" → zu
- 4. gün · prova · "Ja, ich zahle bar." → ~zahle
- 4. gün · prova · "Ich zahle mit Karte." → ~zahle
- 4. gün · prova · "Wie alt bist du?" → bist
- 4. gün · prova · "Neunundsiebzig? Das ist schön!" → schön
- 4. gün · sinav · "Das macht einundzwanzig Euro fünfzig." → ~macht
- 4. gün · sinav · "Ein Kilo Käse kostet achtzehn Euro." → ~kostet
- 4. gün · sinav · "Das Brot kostet zwei Euro sechzig." → ~kostet
- 4. gün · sinav · "Nein, nicht mit Karte. Ich zahle bar." → ~zahle
- 4. gün · sinav · "Siebzig Cent? Das ist nicht teuer!" → ?cent
- 4. gün · sinav · "Das Brot kostet drei Euro zwanzig." → ~kostet
- 4. gün · sinav · "Was kostet ein Kilo Äpfel?" → was, ~kostet
- 4. gün · ders.alistirma · "kostet" → ~kostet
- 4. gün · ders.alistirma · "Ich bin ___ Jahre alt." → bin
- 4. gün · ders.alistirma · "Ich wiege achtzig ___." → ?wiege
- 4. gün · ders.alistirma · "Ich bin vierzig Jahre alt." → bin
- 4. gün · ders.alistirma · "Das macht fünfzig Euro." → ~macht
- 4. gün · ders.alistirma · "Ich bin dreißig Jahre alt." → bin
- 4. gün · ders.alistirma · "Ich wiege achtundsiebzig Kilo." → ?wiege
- 4. gün · ders.alistirma · "Ich bin dreißig Jahre alt." → bin
- 4. gün · ders.alistirma · "Ich bin achtundzwanzig Jahre alt." → bin
- 4. gün · ders.alistirma · "Ich wiege vierundsechzig Kilo." → ?wiege
- 4. gün · ders.alistirma · "Ich bin fünfundvierzig Jahre alt." → bin
- 4. gün · ders.alistirma · "Ich bin zweiundfünfzig Jahre alt." → bin
- 4. gün · ders.diyalog · "Ich bin {name}. Was kostet das hier?" → bin, hier
- 5. gün · prova · "Ja, das passt." → ~passt
- 5. gün · prova · "Nein! Zu früh!" → zu
- 5. gün · sinav · "Viertel vor acht passt leider nicht." → ~passt
- 5. gün · sinav · "Das ist leider zu früh." → zu
- 5. gün · sinav · "Das passt leider nicht. Geht halb neun?" → ~passt
- 6. gün · sinav · "Ich brauche Ihre Adresse." → ~brauche
- 6. gün · ders.alistirma · "Der Kurs beginnt ___ 1. Dezember." → kurs, beginnt
- 6. gün · ders.diyalog · "Der siebte August neunzehnhundertneunzig." → ?neunzehnhundertneunzig
- 6. gün · ders.alistirma · "Wie ___ kostet das?" → ~kostet
- 7. gün · prova · "Ich bin krank. Ich möchte einen Termin machen." → krank
- 7. gün · prova · "Ich möchte einen Kaffee." → kaffee
- 7. gün · prova · "Um halb neun kann ich nicht. Geht es am Nachmittag?" → ~kann
- 7. gün · prova · "Also fünfzehn Uhr fünfzehn? Das passt." → ~passt
- 7. gün · sinav · "Ich habe Fieber, ich kann heute nicht kommen." → ~kann
- 7. gün · sinav · "Was sagt der Arzt?" → ~sagt
- 7. gün · sinav · "Kann ich morgen wieder kommen?" → ~kann
- 7. gün · sinav · "Hallo Luka, hier ist {name}. Kann ich am Samstag kommen?" → ~kann
- 7. gün · ders.alistirma · "Ich ___ Hunger." → hunger
- 7. gün · ders.alistirma · "___ du krank?" → krank
- 7. gün · ders.alistirma · "___ ihr fertig?" → fertig
- 7. gün · ders.alistirma · "Am Dienstag habe ich Zeit." → zeit
- 7. gün · ders.alistirma · "Ich habe Hunger." → hunger
- 7. gün · ders.alistirma · "kann" → ~kann
- 7. gün · ders.alistirma · "___ ich hier warten?" → hier
- 7. gün · ders.alistirma · "___ ich morgen anrufen?" → anrufen
- 7. gün · ders.alistirma · "Kannst" → ~kannst
- 7. gün · ders.alistirma · "Ich kann am Dienstag nicht kommen." → ~kann
- 7. gün · ders.alistirma · "Ich kann am Montag kommen." → ~kann
- 7. gün · ders.alistirma · "Wann soll ich anrufen?" → anrufen
- 7. gün · ders.diyalog · "Ich kann heute nicht kommen." → ~kann

**Gösterim ihlallerinin çoğu kalıp:** Grüß Gott, Vielen Dank, Auf Wiederhören, Gute Besserung, Bis dann. Kalıp bir bütün olarak öğretiliyor ama kümede yok. **Öneri (PM kararı):** bilinen kümeye "o güne kadar öğretilmiş kalıplar" eklensin (`patterns.json` ya da dersin `teach` öğesi). Ayrıntılı liste `sonuc.json` → `gun_cumleleri_ihlal` içinde.

## 3. Eşlenemeyen biçimler (tahmin edilmedi)

Kart örneklerinde 223 ayrı sözcük hiçbir kartın `forms` dizinine eşlenmedi. En sık olanlar (cümle sayısı):

s 22, hab 20, euro 12, stock 10, abends 6, komm 6, ungefähr 6, geh 6, kaya 5, glaub 4, post 4, vorne 4, mitte 4, grad 4, fußball 3, brille 3, bäcker 3, schnee 3, monats 3, gib 3, cent 3, fit 3, n 3, hätte 3, parken 3, warst 3, mittwochnachmittag 2, sonntags 2, mach 2, pro 2, sport 2, sorry 2, nee 2, mittags 2, becker 2, zwölften 2, wärmer 2, mietvertrag 2, regen 2, türkei 2.

Üç türlü:
- **Konuşma kısaltması:** hab, komm, geh, glaub, grad, s (geht's), n, nen.
- **Çekim ya da türetme:** abends, sonntags, Mittwochnachmittag, monats, schönes, gute, hohes.
- **Sözlükte kartı olmayan kelime:** Euro, Cent, Stock, Post, Brille, Bäcker, Fußball, Schnee.

Bunlar bilinene dönmeden o cümle hiçbir gün açılmaz.

## 4. İstekler ve sıradaki adım

- **[İÇERİK] şema isteği (ANA):**
  - (a) `card:false` kartlara kapalı `bicimler` listesi (artikel, zamir, iyelik çekimleri), sayaç karttan okusun.
  - (b) Kart örneğine isteğe bağlı `ilk: true` (ilk karşılaşma cümlesi; 6 örnek sınırının dışında ya da içinde, ANA seçer).
  - (c) Konuşma kısaltmaları için `forms` dışında bir eşleme (ör. kartta `kisaltma: ["hab"]`).
- **PM kararları (#163, 7043400862):**
  - (1) sein ve haben çerçeve değil; fiil biçimi kartıyla ya da kalıbıyla gelir.
  - (2) Kalıplar bütün olarak bilinir, sözcükleri tek tek bilinmez (bu raporda uygulandı).
  - (3) Sık küçük sözcükler kart olarak 4.–7. günün boş yuvalarına öne çekilir (omurga taslağı). Euro ve Cent için lex işi önce, 4. güne.
- **İÇ sıradaki adım:** 1. gün `halkalar` önerisi (PM-078 B) ve 1. günün ilk karşılaşma cümleleri. Yazar → dilbilimci → okur.
