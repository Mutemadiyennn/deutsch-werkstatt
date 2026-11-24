# İÇ-20 A2 onarım: dilbilimci fark turu (#226, #229, #219, #220)

Kapsam yalnızca görevde sayılan farklar (tam tur değil). Yazma kalıpları `web/src/core/okuma.ts` mantığıyla (esbuild ile paketlenip) örnek cevap ve öğrencinin yazabileceği doğal varyantlar üzerinde tek tek koşuldu. İncelenen madde: 25 (yazma 14, halka kalıbı 6, prova/sahne/dikte 5). Hata: 18. Hata oranı: 18/25. Çoğu "doğal doğru biçim dışarıda kalıyor" türünde (haksız ret riski): zorunlu sözcük yuvaya düşüyor ya da hiçbir kalıp eşleşmiyor ve `tamam` false oluyor.

Doğrulayıcı dört ağaçta koşuldu. Çıkan HATA'ların hepsi tek ağaçta önceki haftaların sözcükleri görünmediği için çıkan sahte "bilinmeyen sözcük" hataları (schon, noch, sehr, dann…). Değişen yerlere bağlı hata yok. Bütün örnek cevaplar düzeltmeden sonra `tamam: true`.

## #226 (w226): gün 59
- Yeni sabit kalıplar doğru Almanca. Sıra doğru: zorunlu sözcüğü (Termin) sabit tutan kalıp genel `weil ___` kalıbından önce.
- **Hata:** en yaygın söz dizimi "Ich komme heute leider erst um zwölf, weil ich um neun einen Termin beim Arzt habe." hiçbir kalıba uymuyordu (`tamam` false).
  - Düzeltme: `"Ich komme heute leider erst um ___, weil ich um ___ einen Termin beim Arzt habe."` ve `"Ich komme heute leider erst um ___, weil ich einen Termin beim Arzt habe."` eklendi (genel kalıptan önce).

## #229 (w229)
- **64 s1 dikte:** "Die Speisekarte liegt unter der Tasche." doğru ve doğal. why_tr "çantanın altında" doğru. Not: dikte sesi önceden üretiliyorsa yeni metinle yeniden üretilmeli.
- **66:** "Im Bad geht die Steckdose nicht." ve "Heute hat Herr Pichler den Wasserhahn repariert." eşleşmiyordu. Ayrıca "Die Steckdose geht nicht." genel `___ geht nicht.` kalıbına düşüyor ve Steckdose yuvada kalıyordu.
  - Eklendi: `"___ hat Herr Pichler den Wasserhahn repariert."`, `"Die Steckdose geht nicht."`, `"Im Bad geht die Steckdose nicht."`.
- **67:** iki eylemi tek cümlede birleştiren doğal cevap eşleşmiyordu.
  - Eklendi: `"Ich habe den Schlüssel ___ gelegt und den Kaffee ___ gestellt."`.
- **69:** "Ich kann leider am Montag nicht kommen." ve "Ich kann am Montag um neun nicht kommen." genel `Ich kann ___ nicht kommen.` kalıbına düşüyordu. Montag yuvada kaldığı için `tamam` false oluyordu. "Leider kann ich am Montag …" hiç eşleşmiyordu.
  - Eklendi (genel kalıplardan önce): `Ich kann am Montag ___ nicht kommen.` / `Ich kann am Montag nicht kommen.` / `Ich kann leider am Montag (___) nicht kommen.` / `Leider kann ich am Montag (___) nicht kommen.`
  - Ek kalıplar: `weil ich ___ habe.` (59'da öğretilen weil ile virgüllü cümle) ve `Haben Sie am Dienstag ___ frei?` ("… einen Termin frei?").
- **70:** kontrol listesinin istediği "Mittwoch hat nicht gepasst." Mittwoch'u yuvaya düşürüyordu (`tamam` false). "Jetzt habe ich am Freitag um elf einen Termin." eşleşmiyordu.
  - Eklendi: `Mittwoch hat nicht gepasst.`, `Mittwoch ___ hat nicht gepasst.`, `Am Mittwoch hat es nicht gepasst.`, `Jetzt habe ich am Freitag ___ einen Termin.`, `Ich habe jetzt am Freitag ___ einen Termin.`

## #219 (w219)
- **71 h1/h2 kalıpları** ("Sie fühlt sich nicht gut.", "Er bewegt sich viel.") doğru, Türkçeleri doğru, g4/g5'ten önce gösteriliyor. Sorun yok.
- **71 prova n2: hata.** "Möchtest du auch einen Kaffee?" / "Sen de kahve ister misin?" Ioana'nın kahve içtiğini ima ediyor, ama hemen ardından n3'te "Ich trinke am Abend nie Kaffee." diyor. Bu bir çelişki.
  - Düzeltme: `"Möchtest du einen Kaffee?"` / `"Kahve ister misin?"`. Seçenekler değişmedi ve hepsi bu soruya uyuyor.
- **75 h1:** "Er kümmert sich um …" ve "Jeder zahlt selbst." doğru. **Türkçe hatası:** "Herkes kendisi ödüyor." doğal değil.
  - Düzeltme: "Herkes kendi hesabını ödüyor." Hem kalıpta hem prova n2 seçeneğinin tr'sinde değiştirildi (tutarlılık için).
- **Yazma 71:** "Hallo Derya! Ich komme am Donnerstag, wenn ich Zeit habe." ve "Wenn ich Zeit habe, …" eşleşmiyordu. Ayrıca "Ich komme am Donnerstag, wenn …" genel `Ich ___, wenn ich ___.` kalıbına düşüyor ve Donnerstag yuvada kalıyordu.
  - Eklendi (genelden önce): `Ich komme am Donnerstag ___, wenn ich ___.`, `Ich komme am Donnerstag, wenn ich ___.`, `Ich komme am Donnerstag (___).`, `Wenn ich ___, ___.`
  - Sona eklendi: sabit `Hallo Derya!` ve `Hallo!`. Yuvalı `Hallo ___!` bilerek konmadı, çünkü "Hallo, ich komme am Donnerstag." cümlesini yutup Donnerstag'ı yuvaya düşürüyordu.
- **Yazma 76:** "Liebe Frau Brandl, vielen Dank für den Krapfen!" (yuvada 5 sözcük), "Danke!", "Um vier Uhr komme ich vorbei." ve "Ich komme heute um vier vorbei." eşleşmiyordu.
  - Eklendi: `Liebe Frau Brandl, vielen Dank ___!`, `Vielen Dank (___)!`, `Danke (___)!`, `Ich komme ___ um vier (___) vorbei.`, `Um vier (___) komme ich vorbei.`, sonda `Liebe Frau Brandl!`

## #220 (w220)
- **78 h2 kalıbı:** "Was hat sie dir gegeben?" / "Sana ne verdi?" doğru, 1736'daki soruya hazırlık. Sorun yok.
- **79 c2:** "Können Sie Frau Brandl den Schlüssel für den Keller bringen?" doğru ve doğal (Pichler–öğrenci Sie). Kabul cevaplarıyla tam uyumlu: ihn = den Schlüssel, ihr = Frau Brandl. why_tr doğru. Sorun yok.
- **83 h1 Türkçe ek uyumu: hata.** "…'ta evleniyorum" ayların çoğunda yanlış ek veriyor (Haziran'da, Mayıs'ta).
  - Düzeltme: "… ayında evleniyorum. – … ayında evleniyor."
- **83 "Ich frage …" Türkçesi: hata.** "… soruyorum" günün kullanımını karşılamıyor ("Ich frage: Können Sie …?").
  - Düzeltme: "Soruyorum: … – Doktor ne dedi?"
- **83 s14:** "Du kannst das auch so machen!" / "Sen de böyle yapabilirsin!" doğru ve doğal. Sorun yok.
- **Yazma 78–84** (`___` biçimi doğru). Eksik doğal biçimler eklendi:
  - **78:** `Danke für den Schal!` ve `Ich komme am Sonntag ___.` ("Ich komme am Sonntag um drei." eşleşmiyordu).
  - **79:** en doğal öğüt "An deiner Stelle würde ich zur Polizei gehen." Polizei'yi yuvaya düşürüyordu (`tamam` false). Eklendi: `… (___) zur Polizei gehen.` ve `… (___) die Polizei anrufen.`
  - **80:** "Seit Montag habe ich …" eşleşmiyordu. "Ich habe keine Allergien." ve "Ich habe Halsschmerzen seit Montag." `Ich habe ___.` kalıbına düşüp zorunlu sözcüğü yuvaya bırakıyordu. Eklendi: `Ich habe keine Allergien.`, `Nein, ich habe keine Allergie.`, `Seit ___ habe ich ___.`, `Ich habe ___ seit ___.`
  - **81:** "Morgen gehe ich auch zum Arzt." ve görevin birleşik cevabı "Ich gehe morgen zum Arzt und dann nach Hause." eşleşmiyordu. Eklendi: `Ich gehe ___ zum Arzt und dann nach Hause.`, `Morgen gehe ich (___) zum Arzt.`, `Danach gehe ich nach Hause.`
  - **82:** "Guten Tag!", "Bitte schicken Sie mir eine neue Karte." ve "Ich brauche eine neue Karte." eşleşmiyordu. Hepsi eklendi; ayrıca `Können Sie mir eine neue Karte schicken?` ve `Viele Grüße, ___` (Grüße aynı günün metninde).
  - **83:** "Der Arzt sagt, ich soll …" (kontrolün istediği biçim) `Der Arzt sagt, ___.` kalıbına düşüp soll'u yuvaya bırakıyordu ya da uzun hâli hiç eşleşmiyordu. Önüne eklendi: `Der Arzt sagt, ich soll ___ (und ___).` Ayrıca `Ab Dienstag arbeite ich wieder.`, `Ab/Am Dienstag gehe ich wieder ___.`, `Am Dienstag bin ich wieder ___.`
  - **84:** **örnek cevabın kendisi kontrolden geçmiyordu.** "Dr. Weber sagt, es ist nicht ernst." tanınmıyordu. Eklendi: `Dr. Weber sagt, ___.` Ayrıca `Seit ___ bin ich krank(, deshalb war ich ___).`, `Ich habe seit ___ ___.`, `Seit ___ habe ich ___.`, `Deshalb war/habe ich ___.`, `___, deshalb habe ich ___.`, `Am ___ hatte ich ___.` (virgülle bölünen "Am Montag hatte ich Halsschmerzen, deshalb …" için).

## Kalan şüpheler (içerikle kapanmıyor; baş geliştiriciye)
1. **69:** örnek cevabın son cümlesi `{name}` tanınmıyor. `"Vielen Dank! ___"` kalıbı hiçbir zaman eşleşmez, çünkü cümle bölücü "!" işaretinde böler.
   - `tamam` true kalıyor, ama öğrenci imzası "kontrol edemedim" olarak görünür. Yalnız ad içeren satır için kod tarafında bir istisna önerilir.
   - "Viele Grüße" 69'a kadar öğretilmediği için içerikle düzeltilmedi.
2. **76:** zorunlu "vier" rakamla yazılınca ("um 4", "16 Uhr") eksik sayılıyor. Rakam–sözcük eşlemesi kod işi.
3. **Yuvalı selam kalıpları** ("Hallo ___!" 66/67/70/83'te, "Danke ___!") 4 sözcüğe kadar bir cümleyi yutabiliyor; örneğin "Hallo, ich soll viel trinken." soll'u yuvaya düşürür. Bu uç bir durum, değiştirilmedi.
4. **64 dikte:** ses dosyası metinden önceden üretiliyorsa yeniden üretilmeli.
5. **59:** geç kalma mesajının "Danke!" ile bitmesi biraz tuhaf, ama farkın dışında kaldığı için dokunulmadı.

## Değiştirilen dosyalar
- /home/claude/w226/content/v2/m1/gun-59.json
- /home/claude/w229/content/v2/m1/gun-66.json, gun-67.json, gun-69.json, gun-70.json
- /home/claude/w219/content/v2/m1/gun-71.json, gun-75.json, gun-76.json
- /home/claude/w220/content/v2/m1/gun-78.json … gun-84.json (78, 79, 80, 81, 82, 83, 84)

Bütün düzeltmeler yapıldı. Yukarıdaki kalan şüpheler kod ya da medya işi; içerik onayını engellemez. PR'lar ancak bu ağaçlardaki düzeltmelerle birlikte birleşmeli.

Karar: DÜZELTME GEREK
