# Sözlük incelemesi: B6 grup 03

İnceleyen: dilbilimci-ajan · 2026-11-19 · 75 kart (parti 011 ve 012)

## İncelenen kimlikler
Bahnhof, Durst, Ausbildung, Flur, aufräumen, Führerschein, Aussicht, Teppich, schüchtern, Rezept, Ausflug, Amt, Unterschrift, vorhaben, Verspätung, Mannschaft, Bargeld, wandern, Beschwerde, Sofa, Werkstatt, Gemüse, ausfallen, geradeaus, Trinkgeld, Rente, einpacken, reservieren, Banane, Besprechung, Studium, regelmäßig, Supermarkt, Feiertag, Chefin, Hobby, Kollegin, Geschwister, Ausstellung, Freizeit, Mathe, Balkon, Verkäufer, geduldig, arbeitslos, Überstunde, Tomate, Apotheke, Unterkunft, Garantie, Techniker, Freut_mich!, ledig, Fleisch, Bäckerei, Bad, Lampe, Miete, Wand, Wie_spät_ist_es?, Wetter, noch_nicht, Beruf, Formular, Anmeldung, Pass, ausfüllen, Gute_Besserung!, Haltestelle, Kreuzung, Ampel, U-Bahn, Straßenbahn, Fahrkarte, abbiegen.

## Düzeltmeler: 33 kartta 44 düzeltme
Yama: `b6-03.dil.json`. Lint çalıştırılmadı (görev gereği baş geliştirici çalıştırır).

### Almanca ve olgu (3)
- **Rezept** form 4: `nur mit ___ Rezept` → `einem` doğal değil (Almanca burada artikelsiz söyler: **auf Rezept**, **mit Rezept**). Madde `Ohne ___ bekommen Sie das Medikament nicht.` → `Rezept` olarak değişti.
- **Ampel** hata notu: "Almancada ışık için yanmak denmez" iddiası yanlış (**Das Licht brennt** söylenir) ve Türkçe kelime kalın yazılmıştı. Not trafik ışığının rengiyle sınırlandı.
- **Führerschein** form 4: Derya aynı kartın 2. örneğinde ehliyetini on sekiz yaşında almış, formda ise hâlâ kursa gidiyordu. Özne `Mein Sohn` oldu; form 1 çevirisi düzeltildi.

### Çift okunan Türkçe (6)
- **Durst** örnek 2: `herkes çok susuyor` (susmak ile karışıyor) → `çok susamış oluyor`.
- **Gemüse** örnek 1: `Pazarda` → `Semt pazarında`.
- **Geschwister** örnek 2: `yakında oturuyor` (zaman gibi okunuyor) → `yakınlarda`.
- **regelmäßig** eşdizim: `düzenli doktora gitmek` → `düzenli olarak doktora gitmek`.
- **Überstunde** eşdizim: `çok fazla mesai` → `bir sürü fazla mesai`.
- **Mathe** eşdizim: **die Mathelehrerin** → `kadın matematik öğretmeni`.

### Öznesiz çeviri (2)
- **Studium** örnek 1, **arbeitslos** örnek 1: özne `Kadın`, `Adam` olarak yazıldı.

### Aynı Almancaya farklı Türkçe (20)
- **Ausflug** (**einen Ausflug machen** → hep `geziye çıkmak`; form 2, 5, örnek 1, 3).
- **Rente** (**in Rente gehen** → `emekliye ayrılmak`, **in Rente sein** → `emekli olmak`; form 1, hata notu 2, örnek 1).
- **Tomate** örnek 1 (**Ich hätte gern** → `isterim`), örnek 4 (`kaç para` → `ne kadar`).
- **regelmäßig** örnek 4 (**üben** → `alıştırma yapmak`).
- **vorhaben** form 3, **Unterschrift** örnek 2, **Sofa** eşdizim, **geradeaus** form 3 ve örnek 2, **noch_nicht** form 4 ve örnek 3, **Beruf** form 2, **Haltestelle** eşdizim, **Bäckerei** örnek 1, **Fahrkarte** form 3 ve hata notu, **Anmeldung** eşdizim (kesme işareti tutarlılığı).

### Doğallık ve çeviri doğruluğu (12)
- **schüchtern** örnek 3 (`utanmana` → `çekinmene`; kartın hata notu utanmayı ayrı tutuyor).
- **Supermarkt** eşdizim (Almancada olmayan `akşam` çıkarıldı).
- **Feiertag** form 3 ipucu: hangi günlerde söylendiği yazıldı.
- **Gute_Besserung!** form 3 (`Tobi için` → `Tobi'ye`).
- **Techniker** form 4, **Bad** form 4, **Lampe** form 1, **U-Bahn** form 4, **Straßenbahn** form 4, **geradeaus** örnek 3, **Führerschein** form 1, **noch_nicht** form 4 ipucu.

## Lex'in sorduğu kartlar
- **Führerschein**: Almanca doğru; yukarıdaki iki düzeltme dışında sorun yok.
- **Rezept**: iki anlam (`anlam_tr` + `ipucu_tr`) kurala uygun; form 4 değişti.
- **Mathe**: **die**, çoğulsuz ve artikelsiz kullanım doğru; formlar tek cevaplı.
- **noch_nicht**: form 3 (`Ich habe ___ gegessen.`) tek başına tek cevaplı değil; çeviri ve ipucu cevabı belirliyor. Boşluğu daraltmak (`noch ___`) **nichts** cevabını da doğru yapacağı için bırakıldı.
- **Gute_Besserung!**: hata notu doğru ve Türkçe konuşana özgü.
- **Feiertag**: **Schöne Feiertage** için `İyi bayramlar!` uygun karşılık; ipucu netleştirildi.
- **Beschwerde**: iki anlam ve formlar doğru, değişiklik yok.
- **Fotoğraf** (Durst, Besprechung, Ausflug, Wetter): mevcut sorgular yanıltıcı değil. Durst ve Besprechung örneklerine fotoğraf eklenmedi.

## Açık noktalar
1. **`exp` yamanamadı**: yama biçiminde `exp` anahtarı yok. İki kartta `parcalar` kelimenin anlamını vermiyor ve boşaltılmalı: **Trinkgeld** (`içme` + `parası`), **Bahnhof** (`tren` + `avlusu`).
2. **noch_nicht** form 3: iki kelimelik cevap tek boşlukta. Arayüz bunu kabul etmiyorsa madde çıkarılmalı.
3. **Führerschein** form 4: **den** yanında **seinen** ve **einen** de dilbilgisi olarak doğru; ipucu kalıbı (**den Führerschein machen**) veriyor.
4. Birkaç formda cevap yalnızca çeviriyle tekleşiyor (**Beschwerde** form 2 `Ihre`, **Chefin** form 3 `die`, **Wetter** form 3 `diesem`, **Studium** form 3 `dein`). Hata sayılmadı.
5. **Besprechung** hata notu: **in Besprechung** büro dilinde duyulur; A2 için `yanlış` demek kabul edilebilir bulundu.
6. **Garantie** form 2: **in der Garantie** konuşma dilinde yaygın, yazı dilinde **Hat das noch Garantie?** daha olağan. Bırakıldı.
7. Karakter tutarlılığı (Derya, Tobi, Luka, Aksoy Hanım) kurgu dünyası belgesiyle karşılaştırılmadı.

## Sonuç
AÇIK: yama uygulanıp lint geçince ve 1. madde kapanınca KAPANDI sayılabilir.
