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
- **Sözcük → kart:** kartın `de`, `art`, `pl`, `forms[].answer` ve `verb` alanları (`aux` hariç). Bir kartın bütün çekimleri o kart tanıtılınca bilinir sayılır.
  - **ek:** cevaptaki sözcük yalnızca kartın başlığıyla akrabaysa (ilk 3 harfi başlıkta geçiyorsa) o karta eşlenir. Böylece lx:Dienstag'ın "___ Dienstag" boşluğundaki "Letzten" lx:Dienstag'a düşmez. Fiil kartlarında tek sözcüklü cevap akrabalık aranmadan eşlenir (ist, war, ging).
  - **ek:** birden çok kartın cevabında geçen sözcük en çok geçtiği karta eşlenir, eşitlikte hepsine ("ist" lx:sein'e gider, lx:passieren'e değil).
  - **ek:** birden çok karta eşlenen sözcük, adaylardan biri biliniyorsa bilinir sayılır.
  - Eşlenemeyen sözcük tahmin edilmedi, ayrı listelendi (aşağıda `?` ile).
- **ek (kapalı liste, betikte açık):** `card:false` kartlarının `forms` dizininde olmayan artikel, zamir ve iyelik çekimleri (den, dem, mir, dir, ihn, ihnen, meinen …). Bunlar kartta yok; sayaç karttan okuyabilsin diye **şema isteği** aşağıda.
- **Biçimler:**
  - **A:** günün dersi henüz yapılmamış (bugünkü düzen: Bahçe önce).
  - **B:** günün dersi önce yapılmış (Halka'da dil noktası kelime halkasından önce gelirse).
  - **C:** B + sein ve haben şimdiki zaman biçimleri 1. günden çerçeve (öneri, PM kararına).
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
| 1 | 25 | 0 | 10 | 7 | 18 | 43 |
| 2 | 25 | 2 | 8 | 2 | 22 | 46 |
| 3 | 25 | 4 | 15 | 9 | 12 | 35 |
| 4 | 22 | 6 | 14 | 8 | 12 | 29 |
| 5 | 21 | 13 | 19 | 16 | 4 | 11 |
| 6 | 20 | 18 | 20 | 18 | 1 | 3 |
| 7 | 17 | 13 | 17 | 16 | 0 | 2 |
| **top.** | 155 | 56 | 103 | 76 | 69 | 169 |

**B**

| gün | kart | örnek 0 | örnek ≤1 | boşluk 0 | hiç yok | eksik cümle |
|---|---|---|---|---|---|---|
| 1 | 25 | 1 | 17 | 10 | 14 | 38 |
| 2 | 25 | 3 | 14 | 13 | 11 | 32 |
| 3 | 25 | 6 | 17 | 11 | 9 | 32 |
| 4 | 22 | 9 | 18 | 18 | 4 | 15 |
| 5 | 21 | 14 | 19 | 16 | 3 | 10 |
| 6 | 20 | 18 | 20 | 18 | 1 | 3 |
| 7 | 17 | 13 | 17 | 16 | 0 | 0 |
| **top.** | 155 | 64 | 122 | 102 | 42 | 130 |

**C**

| gün | kart | örnek 0 | örnek ≤1 | boşluk 0 | hiç yok | eksik cümle |
|---|---|---|---|---|---|---|
| 1 | 25 | 1 | 21 | 11 | 14 | 37 |
| 2 | 25 | 3 | 16 | 15 | 9 | 30 |
| 3 | 25 | 7 | 20 | 13 | 7 | 25 |
| 4 | 22 | 9 | 18 | 18 | 4 | 14 |
| 5 | 21 | 14 | 20 | 16 | 3 | 10 |
| 6 | 20 | 18 | 20 | 18 | 1 | 3 |
| 7 | 17 | 13 | 17 | 16 | 0 | 0 |
| **top.** | 155 | 65 | 132 | 107 | 38 | 119 |

**D**

| gün | kart | örnek 0 | örnek ≤1 | boşluk 0 | hiç yok | eksik cümle |
|---|---|---|---|---|---|---|
| 1 | 25 | 3 | 22 | 12 | 12 | 34 |
| 2 | 25 | 4 | 21 | 16 | 8 | 28 |
| 3 | 25 | 8 | 20 | 13 | 7 | 23 |
| 4 | 22 | 11 | 19 | 20 | 2 | 10 |
| 5 | 21 | 17 | 21 | 17 | 2 | 7 |
| 6 | 20 | 19 | 20 | 19 | 0 | 1 |
| 7 | 17 | 13 | 17 | 16 | 0 | 0 |
| **top.** | 155 | 75 | 140 | 113 | 31 | 103 |

**Okuma:**
- Kart cümleleri gerçek hayattan yazıldı, kümeye göre değil. 1.–3. günde kartların çoğunun bilinmeyensiz tek bir örneği bile yok.
- Sıra tek başına çözmüyor. D'de (sıra en iyi kurulsa) bile 103 cümle gerekiyor.
- **Sonuç:** 1.–5. günde **ilk karşılaşma cümlesi** yazılmalı. B'ye göre 130 cümle (1.–3. günde 102), D'ye göre 103. 6. ve 7. gün neredeyse hazır.

### Görev cümlesi hiç olmayan kartlar (B)

- **1. gün (14):** Mittwoch, Donnerstag, Samstag, Wochenende, Woche, Tag, heute, gestern, gehen, hallo, danke, ja, Frau, Herr
- **2. gün (11):** Februar, Mai, August, September, Dezember, Jahr, Sommer, Herbst, Winter, haben, offen
- **3. gün (9):** zwei, drei, zehn, elf, fünfzehn, sechzehn, siebzehn, achtzehn, neunzehn
- **4. gün (4):** achtzig, neunzig, Tüte, bar
- **5. gün (3):** Vormittag, Nachmittag, Nacht
- **6. gün (1):** Vorname

### Kart örneklerini en çok tıkayan sözcükler (B)

Kartı olan ama henüz tanıtılmamış sözcükler. Sayı, o sözcüğün tıkadığı örnek cümle sayısıdır:

noch 50, schon 43, wann 37, nur 30, da 26, uhr 25, lange 21, termin 20, bus 19, minuten 19, sind 18, apotheke 16, fährt 15, viele 15, erst 14, wieder 14, viel 14, gleich 14, bin 13, echt 13, zeit 12, wird 12, gut 12, gern 12, dauert 12, leider 11, oft 11, sehr 11, passt 10, bürgerbüro 10.

Bunların çoğu sık kullanılan küçük sözcük: noch, schon, nur, da, erst, wieder, gleich, dann, gern, sehr, oft, leider, echt. Ayrıca wann, Uhr, Termin, sind ve bin. Önerim (PM kararı): bunların bir kısmı 1.–2. güne alınsın ya da çerçeveye girsin (dokununca Türkçe).

## 2. Gün cümleleri (sahne, ses, prova, okuma, sınav, ders)

Bilinen küme: günün bütün kartları ve günün dersi. Görevde sınır 0 bilinmeyen, gösterimde en çok 1. Görev: öğrencinin ürettiği cümle (kabul listesinin ilki, prova seçenekleri, diyalogda öğrenci satırı, boşluklu alıştırma cümlesi). Seçmeli soruların (`pick`) seçenekleri sayılmadı.

| gün | görev ihlal | gösterim ihlal |
|---|---|---|
| 1 | 0 | 6 |
| 2 | 4 | 9 |
| 3 | 0 | 4 |
| 4 | 3 | 6 |
| 5 | 0 | 6 |
| 6 | 1 | 14 |
| 7 | 1 | 11 |
| **top.** | 9 | 56 |

**Görev ihlalleri (hepsi):**

- 2. gün · prova · "Alles Gute zum Geburtstag!" → gute
- 2. gün · prova · "Heute? Alles Gute zum Geburtstag!" → gute
- 2. gün · prova · "Schönes Wochenende!" → schönes
- 2. gün · prova · "Alles Gute zum Geburtstag!" → gute
- 4. gün · prova · "Wie alt bist du?" → bist
- 4. gün · prova · "Neunundsiebzig? Das ist schön!" → schön
- 4. gün · sinav · "Siebzig Cent? Das ist nicht teuer!" → ?cent
- 6. gün · ders.alistirma · "Der Kurs beginnt   1. Dezember." → kurs, beginnt
- 7. gün · prova · "Ich möchte einen Kaffee." → kaffee

**Gösterim ihlallerinin çoğu kalıp:** Grüß Gott, Vielen Dank, Auf Wiederhören, Gute Besserung, Bis dann. Kalıp bir bütün olarak öğretiliyor ama kümede yok. **Öneri (PM kararı):** bilinen kümeye "o güne kadar öğretilmiş kalıplar" eklensin (`patterns.json` ya da dersin `teach` öğesi). Ayrıntılı liste `sonuc.json` → `gun_cumleleri_ihlal` içinde.

## 3. Eşlenemeyen biçimler (tahmin edilmedi)

Kart örneklerinde 222 ayrı sözcük hiçbir kartın `forms` dizinine eşlenmedi. En sık olanlar (cümle sayısı):

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
- **PM kararı istenen:**
  - (1) C biçimi: sein ve haben şimdiki zaman 1. günden çerçeve mi?
  - (2) Kalıplar bilinen kümeye girsin mi?
  - (3) Sık küçük sözcükler (noch, schon, nur, da, dann, gern …) erkene mi alınsın, çerçeveye mi girsin?
  - Kararlar cümle sayısını 130'in altına çeker; karar beklenmeden 1. gün cümleleri en sıkı biçimle yazılıyor.
- **İÇ sıradaki adım:** 1. gün `halkalar` önerisi (PM-078 B) ve 1. günün ilk karşılaşma cümleleri. Yazar → dilbilimci → okur.
