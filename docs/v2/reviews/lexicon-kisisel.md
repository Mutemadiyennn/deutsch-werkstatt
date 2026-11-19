# Dil incelemesi: öğrenciyi bir ülkeye, şehre ya da memlekete bağlayan cümleler (PR #95 P1-2)

Kural: CLAUDE.md "kişisel bilgi yok". Öğrenci (ich, mein, wir ya da adı belirsiz konuşan) bir ülkeye, şehre, memlekete, uyruğa ya da ana dile bağlanmaz. Karakterlerin kendi bilgileri ve üçüncü tekil genel cümleler serbest.

## Sayılar
- Taranan: 14 partinin bütün örnek, boşluk ve eşdizimlerinde Türkei / Istanbul / Izmir / Ankara / Heimat / türkisch geçen 67 satır.
- Değişen: 35 satır + liste dışı 1 (`lx:Staatsangehörigkeit` b1). 1 satır başka bir turda zaten değişmişti (`lx:Familie` ö1).
- Kalan: 31 satır.
  - 9'u karakter cümlesi (Derya, Herr Wimmer, Ioana, Luka).
  - 5'i üçüncü tekil ya da genel cümle.
  - 10'u öznesiz eşdizim (`aus der Türkei`, `türkisch kochen` …).
  - 3'ü nesnenin kökeni (kek, yemek, halı).
  - 4'ü tercih cümlesi ("Ich koche manchmal türkisch"; köken bildirmez).
- Ek: aynı türden 7 hata notu ve 2 açıklama (`lx:aus`, `von`, `woher`, `fliegen`, `früher`, `Staatsangehörigkeit`, `Geburtsort`, `Meer`, `woher`) yeni cümlelere uyduruldu. `lx:damals` ö4 ("2015, damals war ich zwanzig") Ioana'ya verildi.

## Okur
88 satır: 9 GERİ ("işte" çift okuma, Heimat vatan/memleket, uyruk/vatandaşlık, hata notunda Türkçe niyet eksik). Düzeltildi; tekrar kontrolde 12/12 GEÇTİ.

## Açık (PM'e)
- Öğrenciyi bir Alman şehrine bağlayan cümleler ("Ich wohne in München", "Vorher habe ich in Köln gewohnt") değiştirilmedi; gerçek hayatı ima etmiyorlar.
- Göç öncülü cümleleri ("Als ich nach Deutschland kam, konnte ich kein Deutsch") uygulamanın öncülü sayıldı.

## 2. tur (inceleme #95)
- `lx:damals` ö4 Luka'ya verildi (Ioana'nın yaşı ve kurs geçmişi WORLD ile çelişiyordu): "2008, damals war ich zweiundzwanzig".
- Bu dalda eski hâliyle kalan `lx:Familie` ö1, `lx:Vater` ö1, `lx:her` ö4, `lx:Jahr` ö1–ö2 çalışma sözlüğündeki düzeltilmiş hâllerine getirildi (karakter ya da genel cümle).
- `lx:Welt` ö2 virgül, `lx:Heimat` b4 ipucu "memleket", `lx:woher` ikinci hata notu woher/wohin karışıklığı, `lx:ich` ö1 "Ich habe heute keine Zeit." ("Ich komme gleich" `lx:gleich` kartıyla aynıydı ve "hemen" çevirisi o kartın hata notuyla çelişiyordu).
- Not: `lx:hilfsbereit` hata notu bu dalda değil, yığının üstündeki ipucu PR'ında düzeltildi.
- Okur: 10 satır, GERİ 0.
