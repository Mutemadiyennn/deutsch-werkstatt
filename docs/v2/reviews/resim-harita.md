# Kelime resmi 2. katman: kart → Noto Emoji eşlemesi (PM-081 B)

**Dosya:** `content/v2/media/resim/harita.json` (`surum: 1`, `review` yok; bu belge yazarın gerekçesidir, dilbilimci incelemesi bekler).

**Karar sırası (PM-081 B):**
1. Kartın seçilmiş açık fotoğrafı varsa (`content/v2/media/foto/acik.json`, anahtar `lx:X#kart`) o gösterilir.
2. Fotoğraf yoksa haritadaki Noto Emoji piktogramı gösterilir (Apache 2.0).
3. İkisi de yoksa resim gösterilmez. "Resimden seç" sorusu o kartta önerilmez.

Fotoğraflı kartlar da haritada yer alabilir; yedek olarak dururlar ve `foto_var: true` işaretlidirler.

## Yöntem
- **Kapsam.**
  - 1.–7. günün `yeni_kartlar` listesi: 155 kart.
  - Sözlükteki bütün K1 kartları (`tier: K1`, `card` false değil): 1099 kart. 1.–7. günün kartları bunun içindedir; bu kartlar dışında 944 kart kalır.
  - Her kartta `tr`, `pos` ve gerektiğinde örnek cümleler okundu.
- **Ölçüt.** Resme bakan bir A1 öğrencisi tek bir Almanca sözcüğü düşünmeli ve bu sözcük kartın kendisi olmalı. Soyut sözcükler eşlenmedi: günler, aylar, zarflar, soru sözcükleri, kipler, duygu ve düşünce adları.
- **Sayılar.** Rakam emojisi yalnız 0–10 için kullanıldı: 0️⃣–9️⃣ keycap, 10 için 🔟. `Uhr` için tek bir saat seçildi: 🕰️ (masa saati). 🕐 ailesi "ein Uhr" gibi belirli bir saat okutur, bu yüzden kullanılmadı.
- **Kod biçimi.** Kod, Noto dosya adı düzenine göre yazıldı: küçük harf onaltılık, kod noktaları `_` ile birleşir, FE0F atılır. Örnekler:
  - `emoji_u1f468_200d_2695.svg` → `1f468_200d_2695`
  - `0031_20e3`
  - `2600`
- **Yasak biçimler.** Bayrak ve ten rengi varyantı kullanılmadı; bütün kişi emojileri nötr biçimdedir.
- **Kapsama denetimi.** Bütün kodlar `emoji-datasource` 16.0.0 içindeki Google (Noto) görüntü listesiyle (`has_img_google`) karşılaştırıldı ve 142 kodun 142'si bulundu. En yeni emoji 🪪 Ausweis (Unicode 14.0).
  - Noto deposunun dosya listesi doğrudan okunamadı, çünkü bu oturumda GitHub API erişimi kapalıydı. Açık sorular bölümüne bakın.
- **Tekillik.** Aynı kod da aynı emoji de iki kartta yok; betikle denetlendi.
- **`ad_tr`.** Her kartta kartın `tr` alanıyla birebir aynıdır.

## Sayılar

| Küme | Kart | Emoji eşlenen | Fotoğraflı | Fotoğraflı ve eşlenen | İkisi de yok |
|---|---:|---:|---:|---:|---:|
| 1.–7. gün | 155 | 27 | 8 | 7 | 127 |
| K1 (hepsi, günler dahil) | 1099 | 142 | 8 | 7 | 956 |
| K1, gün kartları dışında | 944 | 115 | 0 | 0 | 829 |

- **Fotoğraflı kartlar** (8): Frau, Frühling, Herbst, Winter, Urlaub, Apfel, Käse, Nacht.
- **Urlaub:** fotoğrafı var ama emoji eşlenmedi. 🧳 `reisen`/`packen`, 🏝️ `Insel` ile karışır.
- **1.–7. günde eşlenenler** (27):
  - Frau, gehen
  - Frühling, Sommer, Herbst, Winter, Geburtstag
  - null–zehn (11 kart)
  - Brot, Apfel, Käse
  - Uhr, Nacht, Arzt
  - essen, Fieber, müde

## Eşlenmeyen somut kartlar ve nedeni

### 1.–7. gün
| Kart | Aday | Neden |
|---|---|---|
| hallo | 👋 | `Wiedersehen` ile karışır; el sallama hem selam hem veda demek |
| danke, bitte | 🙏 | İkisi birbirine karışır |
| ja / nein | 👍 / ❌ | `gut`, `richtig`, `falsch` ile karışır |
| Herr | 👨 | Resim `Mann`'a verildi; "Herr" resimden ayırt edilemez |
| Praxis | — | Uygun emoji yok. 🏥 `Krankenhaus`'a verildi |
| geschlossen, offen | 🔒 / 🔓 | `Schlüssel` ile karışır; kilit "kapalı dükkân" demek değil |
| Woche, Tag, Monat, Jahr, Datum, Termin | 📅 | Hepsi aynı takvim resmine gider |
| Semmel | — | Uygun emoji yok: 🥖 baget, 🥯 simit |
| Tüte | 🛍️ | `Geschenk` ve `einkaufen` ile karışır |
| Kilo | ⚖️ | Terazi emojisi adalet ve hukuk anlamında da kullanılır |
| Karte | — | Çok anlamlı (kart, harita, menü) |
| bar | 💵 | `Geld` ile karışır |
| Büro | 🏢 | `Firma` ile karışır |
| Hausarzt | — | `Arzt` ile aynı resim olurdu |
| Morgen, Abend | 🌅 / 🌆 | İkisi birbirine, ayrıca `Meer` ile karışır |
| Stunde, Minute | — | `Uhr` ile karışır |
| Telefonnummer | — | `Telefon` ile karışır |
| alt | 👴 | "Opa" diye okunur |
| arbeiten | 💼 | Resim çanta gösteriyor |
| sprechen | 🗣️ | `sagen` ve `reden` ile karışır |
| warten | ⏳ | `Zeit` ile karışır |

### K1 (gün dışı)

**Aynı anlam ya da aynı resim:**
| Kart | Neden |
|---|---|
| Doktor, Zahnarzt | Doktor `Arzt` ile aynı resim olurdu; 🦷 "Zahn" diye okunur |
| Wagen | `Auto` ile aynı resim |
| Dame | `Frau` ile aynı resim |
| Vater, Mutter, Eltern, Bruder, Schwester, Sohn, Tochter, Onkel, Papa, Mama | Aile emojileri birbirinden ayırt edilemez; yalnız `Familie` 👪 eşlendi |
| Freund, Freundin, Paar | 👫 / 💑 "Liebe" diye okunur |
| Tier | `Hund` ile karışır |
| Tasse | `Kaffee` ☕ ile karışır |
| Licht, Lampe, Idee | Üçü de 💡 olurdu |
| Tropfen | `Wasser` 💧 ile karışır |
| Erde | `Welt` 🌍 ile karışır |
| Gabel, Restaurant, Gericht | 🍴 ve 🍽️ `essen` ile karışır |
| Mantel | `Jacke` 🧥 ile karışır |
| Pass, Führerschein | `Ausweis` 🪪 ile karışır |
| Bahnhof, Gleis | 🚉 `Zug` ile karışır |
| Arm | 💪 `stark`'a verildi |
| Party, Fest, Feier, feiern, Glückwunsch | Hepsi 🎉 olurdu |
| Weihnachtsmarkt, Weihnachtsfeier, Advent | `Weihnachten` 🎄 ile karışır |
| Erkältung, erkältet | `Schnupfen` 🤧 ile karışır |
| übel | `Übelkeit` 🤢 ile karışır |
| Schwindel, schwindelig | 😵‍💫 iki karta birden gider |
| Patient, Patientin | `krank` 🤒 ile karışır |
| Schmerzmittel | `Tablette` 💊 ile karışır |
| lesen | 📖 `Buch` ile karışır |
| sehen, schauen, gucken, ansehen | 👀 hepsine gider |
| hören | `Ohr` ile karışır |
| anrufen | 📞 `Telefon` ile karışır |
| lieben | ❤️ `Herz` ile karışır |
| traurig | 😢 `weinen` ile karışır |
| laufen | `rennen` 🏃 ve `gehen` 🚶 ile karışır |
| kochen | 🍳 `Ei` ile karışır |
| Supermarkt, Laden, Geschäft | 🏪 `einkaufen` 🛒 ile karışır |
| Glühwein | `Wein` ile karışır |
| Wetter | ⛅ `Sommer` ve `regnen` ile karışır |

**Başka bir sözcük diye okunur:**
| Kart | Aday | Okunan sözcük |
|---|---|---|
| Hemd | 👕 | T-Shirt |
| Gemüse | 🥦 | Brokkoli |
| Kette | ⛓️ | Resim zinciri gösteriyor, kolye değil |
| Flasche | 🍾 | Sekt |
| Kellner | 🤵 | Damat |
| Friseur, Haar | 💇 | Anlam belirsiz |
| schneiden | ✂️ | Schere |
| singen | 🎤 | Mikrofon; ayrıca `Musik` ile karışır |
| Spiel | ⚽ | Fußball |
| Wand | 🧱 | Tuğla |
| Straße | 🛣️ | Otoyol |
| Finger | ☝️ | `eins` ya da "Moment" diye okunur |
| wandern | 🥾 | `Schuh` ile karışır |
| Ankunft | 🛬 | Flughafen |
| Umzug, Lieferung | 🚚 | Kamyon |
| Rezeption | 🛎️ | Zil |
| Picknick | 🧺 | Sepet |
| Durchsage | 📢 | `laut` |
| Kopfschmerzen | 🤕 | "verletzt" diye okunur |

**Latin yazı ya da kısaltma taşıyor:**
| Kart | Aday | Not |
|---|---|---|
| Geldautomat | 🏧 | "ATM" yazısı İngilizce köprü olur |
| Hilfe | 🆘 | "SOS" yazısı |
| Information | ℹ️ | "i" harfi |

**Uygun emoji yok:** Tisch, Schrank, Küche, Apotheke, Bäckerei, Rock, Pullover, Heizung, Waschmaschine, Regal, Teppich, Bauch, Hals, Rücken, Fluss, See, Rathaus, Amt, Behörde, Kasse, Zimmer, Wohnung, Gesicht, Kopf, Bratwurst dışındaki yemek adları (Senf, Mandel, Kinderpunsch), Adventskranz, Versichertenkarte.

**Genel adlar:** Mensch, Person, Leute, Zeit, Bild dışındaki Foto. `Foto` 📷 "Kamera" diye okunur; `Bild` 🖼️ ile karışır.

## Karışma notları (aynı halkaya konmamalı)
Bu çiftlerin her biri tek başına doğru okunur, ama aynı "resimden seç" halkasında birlikte çıkarsa öğrenciyi yanıltır. Uygulama halka kurarken aynı satırdaki kartları birlikte seçenek yapmamalı.

| Kartlar | Neden karışır |
|---|---|
| Fieber 🌡️ / krank 🤒 | İkisinde de termometre var |
| schlafen 😴 / müde 🥱 | İki uykulu yüz |
| lachen 😆 / weinen 😭 | Yüz biçimi benzer, gözler kapalı |
| kalt 🥶 / heiß 🥵 | Yalnız renk farkı var |
| Kind 🧒 / Junge 👦 / Mädchen 👧 / Baby 👶 | Noto'da çocuk yüzleri birbirine yakın |
| Mann 👨 / Junge 👦 | Yetişkin ile çocuk ayrımı küçük boyutta zayıf |
| Frau 👩 / Mädchen 👧 | Yetişkin ile çocuk ayrımı küçük boyutta zayıf |
| Zug 🚆 / Straßenbahn 🚊 / U-Bahn 🚇 | Önden görünüşleri benzer |
| Bus 🚌 / Haltestelle 🚏 | Durak resminde otobüs işareti var |
| Polizist 👮 / Polizei 🚓 | İkisi de "Polizei" diye okunabilir |
| Auto 🚗 / Polizei 🚓 / Krankenwagen 🚑 / Feuerwehr 🚒 | Hepsi araç; rengi ve işareti farklı, ama küçük boyutta zor |
| Feuer 🔥 / Feuerwehr 🚒 / Fieber 🌡️ | Türkçede üçü de "ateş"e bağlanır. Resim ayrımı aslında yardımcı olur, ama aynı halkada çıkmamaları daha iyi |
| Brief ✉️ / Briefkasten 📫 | Mektup ile posta kutusu |
| Paket 📦 / Geschenk 🎁 | `Päckchen` eşlenmedi |
| Meer 🌊 / Strand 🏖️ / Insel 🏝️ | Üçü de deniz kıyısı |
| Geburtstag 🎂 / Kuchen 🍰 / Plätzchen 🍪 | Üçü de tatlı. 🍰 "Torte" diye de okunabilir |
| Telefon ☎️ / Handy 📱 | İkisi de telefon |
| Bankkarte 💳 / Ausweis 🪪 / Fahrkarte 🎫 / Rechnung 🧾 | Dördü de dikdörtgen kart ya da kâğıt |
| Haus 🏠 / Schule 🏫 / Krankenhaus 🏥 / Hotel 🏨 / Stadt 🏙️ | Hepsi bina |
| Wein 🍷 / Bier 🍺 / Milch 🥛 / Kaffee ☕ / Wasser 💧 | İçecekler. Ayrımı iyi, ama içecek halkasında hepsi birlikte çıkmamalı |
| Hand ✋ | "hallo" ya da "stopp" diye okunabilir; `hallo` eşlenmedi |
| Sommer ☀️ / heiß 🥵 | Güneş sıcaklık da çağrıştırır |
| Sommer ☀️ / regnen 🌧️ | Hava durumu simgesi gibi okunabilir |
| einkaufen 🛒 | `Supermarkt` eşlenmedi |
| essen 🍽️ | `Restaurant` ve `Gericht` eşlenmedi |

## En tartışmalı 10 eşleşme (dilbilimciye)
1. **Arzt 👨‍⚕️** (`1f468_200d_2695`): `Doktor` ve `Hausarzt` aynı resmi hak ediyor; yalnız Arzt'a verildi. Kadın sağlık çalışanı (Ärztin, Schwester "hemşire") sözlükte K1 kart olarak yok.
2. **Fieber 🌡️**: termometre "Temperatur" ya da "warm/kalt" diye de okunabilir. Ayrıca `krank` 🤒 ile termometre ortak.
3. **schlafen 😴 / müde 🥱**: iki yüz aynı halkada karışabilir. 😴 "müde" diye de okunabilir.
4. **Sommer ☀️**: öğrenci "Sonne" diyebilir. Sonne kart değil, yani halkada yanlış seçeneğe gitmez, ama "tek sözcük" ölçütü zayıf.
5. **Bratwurst 🌭**: Noto'daki resim ekmek arası sosis; öğrenci "Hotdog" diyebilir.
6. **Kind 🧒**: nötr çocuk yüzü; `Junge` 👦 ve `Mädchen` 👧 ile karışabilir.
7. **Zug 🚆 / Straßenbahn 🚊 / U-Bahn 🚇**: Noto'da önden görünüşler benzer; aynı halkaya konmamalı.
8. **Silvester 🎆**: öğrenci "Feuerwerk" diyebilir. Almanya'da havai fişek ile Silvester çok sıkı bağlı, bu yüzden tutuldu.
9. **Glück 🍀**: öğrenci "Kleeblatt" diyebilir. Kartın Türkçesi "şans, mutluluk"; resim yalnız şans anlamını taşır.
10. **Parkplatz 🅿️**: resim bir "P" harfi. Almanya'daki park tabelasıyla aynı ve İngilizce köprü değil, ama harfli simge.

Ayrıca tartışılabilir:
- **Wasser 💧**: `Tropfen` eşlenmedi.
- **stark 💪**: `Arm` eşlenmedi.
- **Welt 🌍**: `Erde` eşlenmedi.
- **Hochzeit 💒**: kilise kalpli; `heiraten` eşlenmedi.
- **Rechnung 🧾**: kasa fişi; öğrenci "Quittung" diyebilir.
- **Fahrkarte 🎫**: öğrenci "Ticket" diyebilir.
- **Briefkasten 📫**: Amerikan tipi bayraklı posta kutusu.
- **Klingel 🔔**: kapı zili değil, çan; öğrenci "Glocke" diyebilir.
- **Uhr 🕰️**: masa saati.
- **essen 🍽️**: tabak, çatal, bıçak.
- **einkaufen 🛒**: alışveriş arabası.
- **gehen 🚶**: `laufen` eşlenmedi.
- **rennen 🏃**: `laufen` eşlenmedi.

## Açık sorular
- **Noto dosyalarının varlığı.** Kodlar `emoji-datasource` Google listesine göre doğrulandı. Noto deposundaki `svg/` ya da `png/` dosya adlarıyla birebir karşılaştırmayı, depo erişimi olan oturum yapmalı. Kodlar FE0F'siz yazıldı; Noto'nun keycap dosyaları da FE0F'sizdir: `emoji_u0031_20e3`.
- **Halka kuralı.** Karışma notlarındaki grupların uygulamada "aynı halkada seçenek olmaz" kuralına dönüşmesi baş geliştiricinin işidir. Bu dosyada bunun için bir alan yok. İstenirse `grup` alanı eklenebilir.
