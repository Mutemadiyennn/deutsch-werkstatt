# Dil incelemesi: B5 profil turu, temel dersler gün 1–3

Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan · Dal: `content/ders-profil-01`
Dosyalar: `content/v2/temel/r0-01-tage.json`, `r0-02-monate.json`, `r0-03-zahlen-0-20.json`

## Ne incelendi
Yalnızca türü değişen ve yeni eklenen 32 madde (`git diff` ile):
- r0-01 (10): d15–d19, d21, d36–d39
- r0-02 (13): d16, d18–d20, d22, d32–d34, d35–d39
- r0-03 (9): d02, d04, d16, d18–d20, d36–d38

Bakılanlar: Almancanın doğruluğu ve doğallığı, `audio_de` gerçekliği, `accepted` eksikleri ve yanlışları, rakam/kelime kabulü ve `strictNumberWords`, Türkçe alanlarda OD-9, WORLD uyumu, yer tutucular, o güne kadar öğretilmiş kelime sınırı, telefon numaraları.

Değerlendirici notu (`web/src/core/grading.ts`): `norm()` 1–2 haneli rakamı kelimeye çevirir, noktalama ve büyük harfi yok sayar; baştaki **Ja** özden düşer, **Nein** düşmez. Bu yüzden **Nein, …** biçimleri ayrı yazılmalıdır; üç ve daha çok haneli rakam dizileri (087 452) olduğu gibi karşılaştırılır.

## İçerik hataları (önce → sonra)

| Madde | Önce | Sonra | Gerekçe |
|---|---|---|---|
| r0-01 d16 | ses **Was ist morgen für ein Tag?** | **Welcher Tag ist morgen?** | **was … für ein** birinci gün öğretilmedi; öğretilen soru kalıbı **Welcher Tag ist …?** |
| r0-01 d36 | durum sonu "Cumayı sor."; `why_tr` içinde ":" | "Cuma olur mu diye sor."; "Cuma olur mu diye sorarken **Geht Freitag?** denir." | Belirsiz yönerge (okur hata türü); OD-9 sembol kuralı |
| r0-01 d36 | 8 kabul | 80 kabul | İki cümleli cevapta haksız ret riski yüksekti: **Nein, Donnerstag passt nicht. Geht Freitag?**, **Das geht leider nicht. …**, **Geht's am Freitag?**, **Leider nicht. …** yoktu |
| r0-01 d39 | **Diese Woche geht nicht.** ("Bu hafta olmaz.") | **Die Woche geht von Montag bis Sonntag.** ("Hafta pazartesiden pazar gününe kadar sürer."); ikinci dizilim **Von Montag bis Sonntag geht die Woche.**; `why_tr` "Burada **geht**, sürer demektir." | **diese** öğretilmedi. Yeni cümle yalnızca dersin `teach` kelimeleriyle kurulu; **Woche** cümle içinde kalıyor. "pazara kadar" çift okunduğu için "pazar gününe kadar" |
| r0-02 d20 | ses **Wir haben November, oder?** | **Haben wir November?** | **oder** öğretilmedi; soru yalnızca **haben** ve ay adıyla kurulabiliyor |
| r0-02 d37 | durum "Frau Huber'in telefon kaydı." | "Muayenehanenin telesekreterinde Frau Huber konuşuyor." | "telefon kaydı" belirsizdi (kayıt mı, görüşme mi) |
| r0-02 d38 | **Dieses ___ habe ich im Juli Urlaub.** seçenekler Monat/Jahr/Winter | **Das ___ geht von Januar bis Dezember.** ("Yıl ocaktan aralığa kadar sürer."), seçenekler Monat/Jahr/Wochenende; `why_tr` "Yıl derken **das Jahr** denir." | **dieses** öğretilmedi. **Jahr** cümle içinde kalıyor |
| r0-03 d37 | durum "sıfır bir yedi bir, üç dokuz iki"; `why_tr` içinde ":" | "Senin numaran 0171 392."; "Yalnızca yanlış olan son üç rakamı yeniden söylemen yeter." | Rakam dizisi yazıyla zor okunuyordu; OD-9 sembol kuralı |

## `accepted` eklemeleri (haksız ret riski)
Yanlış kabul bulunmadı; hiçbir kabul silinmedi.
- r0-01 d15 **Heute ist es Dienstag.** · d16 **Morgen ist es Donnerstag.** · d17 **Nein, es war Samstag.**, **Nein, gestern war es Samstag.**, **Nein, wir hatten gestern Samstag.**, **Samstag.** · d18 **Übermorgen ist es Sonntag.** · d19 **Es war Montag.**, **Vorgestern war es Montag.** · d21 **Nein, das geht nicht.**, **Nein, das passt nicht.**, **Nein, leider nicht.**, **Mittwoch passt leider nicht.** ve **Nein, am Mittwoch …** biçimleri (10 ek) · d37 **Montag geht es.**, **Ja, Montag geht es.**
- r0-02 d16 **Ich habe Geburtstag im Februar.** · d19 **Ja, ich habe Urlaub im Herbst.** · d20 dört **Nein, … jetzt …** biçimi · d22 **Ja, das passt.**, **Ja, Anfang März geht es.**, **Ja, Anfang März geht's.** · d35 **Deryas Geburtstag ist im März.**, **Sie hat im März Geburtstag.**, **Dein Geburtstag ist im März.**, **Du hast im März Geburtstag.** · d36 **Es ist Sommer.**, **Im Juni ist es Sommer.**, **Im Juni haben wir Sommer.** (d34 ile aynı küme) · d37 **Sie ist Anfang Januar offen.**, **Ab Anfang Januar.**, **… wieder offen.** (iki dizilim)
- r0-03 d02 **In Büro sechzehn.**, **Bitte in Büro sechzehn.**, **Nummer sechzehn.** · d04 **Nummer siebzehn, bitte.**, **Die Nummer siebzehn.** · d18 **Ich habe die Nummer zwölf.**, **Wohnung zwölf.**, **Ich habe Wohnung zwölf.**, **Wohnung Nummer zwölf.** · d20 **In der Brunnengasse dreizehn.** (d29 ile tutarlı) · d36 **Die Nummer ist 087 452.** ve bitişik/kelimeli biçimleri · d37 **Meine Nummer ist …** biçimleri, **0171 392**, **392** · d38 **Die Nummer ist 0160 883.**, **Seine Nummer ist 0160 883.**, kelimeli tam cümle

## Değişmeden geçenler
- r0-01 d38 (**Am Wochenende ist die Praxis geschlossen.**): doğru ve doğal; **Praxis**, **geschlossen** 1. günün kartları.
- r0-02 d18, d32, d33, d39; r0-03 d16, d19: sorun yok.
- `strictNumberWords`: d16 ve d19'da (rakamı kelimeyle yaz) `true` doğru yerde. d02, d04, d36, d38'de `false`; rakam ve kelime birlikte kabul ediliyor, tutarlı. d37'de alan yok, rakam kabul ediliyor.
- Hitap: Wimmer, Huber, Schneider, Pichler **Sie**; Ioana, Derya, Tobi **du**. WORLD'e uygun.
- WORLD: Derya'nın doğum günü martta (d35), Frau Huber'inki haziranda (d36). Kayıtla örtüşüyor. Yeni akraba ya da geçmiş yok.
- Telefon numaraları: 087 452, 0171 392, 0160 883. Gerçek bir numara olamayacak kadar kısa; 0171 ve 0160 gerçek cep ön ekleri olduğu için kulağa gerçekçi geliyor.
- Öğrenci satırlarında sabit ad ya da cinsiyet yok.

## Kalan şüpheler (düzeltilmedi, karar baş geliştiricide)
1. **r0-01 d18** `prompt_de` **Und übermorgen?**: **und** 1. gün kartı değil. Bırakıldı: durum cümlesi soruyu Türkçe veriyor, dersin kendi diyaloğunda **und** geçiyor, öğrenci üretmiyor; tek öğretilmiş karşılığı (**Welcher Tag ist übermorgen?**) d34'ün sesiyle birebir aynı olurdu.
2. **r0-03 d18** ses **Welche Wohnung haben Sie?**: **Wohnung** kart değil (yalnızca **wohnen**). Bırakıldı: aynı cümle dersin diyaloğunda Herr Pichler'den geçiyor ve durum cümlesi anlamı veriyor. Not: Almanya'da daire numarası yaygın değildir (çoğu evde kat ve zil adı kullanılır); büyük kiralık binalarda vardır. Diyalog bunu zaten kuruyor.
3. **r0-02 d34** ses **Welche Jahreszeit ist im Juli?**: **Jahreszeit** kart değil. Ses eski maddeden; yazarın yeni durum cümlesi ("Temmuz hangi mevsimde?") anlamı veriyor. PM sınırı gereği var olan cümleye dokunulmadı.
4. **r0-03 d02** **Bitte in Büro sechzehn.**: dilbilgisi doğru; resmî dairede **Zimmer sechzehn** daha sık duyulur. **Zimmer** öğretilmediği, **Büro** 3. günün kartı olduğu için bırakıldı.
5. **r0-02 d37**: gerçek telesekreterde **wieder geöffnet** denir; öğretilmiş kelimeyle **offen** kaldı. Kabul edilebilir sadeleştirme.
6. **Öğrencinin doğum günü** maddeden maddeye değişiyor (d16 şubat, d29 mart, d32 haziran). Eski cümlelerden geliyor; kişisel bilgi değil, rol. Rahatsız ederse tek aya indirilebilir.
7. **r0-01 d36** kabul listesi 80 satır. Değerlendirici tam eşleşme aradığı için iki cümleli cevapta başka yol yok; listeyi kısaltmak isteyen, maddeyi tek cümleli iki maddeye bölmeli.
8. **Döngüsüzlük**: r0-01 d37 (Geht Montag? → Montag geht.) d30 ve d32 ile aynı kalıp, yalnızca karakter farklı (Herr Wimmer). Profil hedefi gereği eklendiği için bırakıldı.

## Sonuç
- İncelenen 32 madde; içerik hatası 7 maddede (0,22 hata/madde); 17 maddede daha yalnızca `accepted` genişletildi.
- `npm run content:validate`: 0 hata (122 uyarının hiçbiri bu üç dosyadan değil).
- `review`: üç dosyada "reviewed" kaldı, tarih 2026-11-20, nota bu rapor eklendi.
- **KAPANDI** (yukarıdaki şüpheler engel değil; 1–3 için karar baş geliştiricide). Sıradaki: okur (OD-9) turu.
