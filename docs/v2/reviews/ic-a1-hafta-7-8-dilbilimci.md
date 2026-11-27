# [İÇ-A1] 7.–8. hafta dil incelemesi (dilbilimci, PM-148)

Tarih: 2026-11-27 · İncelenen: `git diff origin/main -- content/v2/m1/` (gün 45, 46, 48, 53; hafta-sonu-testi-07, -08)

## Kapsam
Yazarın eklediği ya da değiştirdiği 32 madde incelendi:
- gün 45: kalıp 1, yazma 1
- gün 46: kalıp 3, görev cümlesi 1, prova düğümü 3 (n7, n8, n8b: 5 seçenek, 3 karşı replik), yazma 1
- gün 48: kalıp 2, yazma 1
- gün 53: kalıp 2, prova düğümü 3 (n1c, n1d, n1e: 5 seçenek) ve n2 repliği, yazma 1
- hafta sonu testi 07 ve 08: birer `guided_response` (t13)

## Düzeltilen bulgular (10: P0 0 · P1 2 · P2 8)

| # | Önem | Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|---|---|
| 1 | P1 | test-08 t13 `why_tr` | "**und**dan sonra **ich** tekrar gelmez, fiil hemen gelir" | "**und**dan sonra **ich** gerekmez" | Kural yanlıştı: "Ich bin … und ich bin …" de doğrudur (46/n8 bunu zaten kabul ediyor). Öğrenciye yanlış kural öğretiyordu. |
| 2 | P1 | gün 48 kalıp + `kontrol_tr` | "Geh zum Arzt, denn … – Bleib im Bett, denn …" | "Geh zum Arzt, denn du hast Fieber. – Bleib im Bett, denn du bist krank." · kontrol: "nedenini **denn du hast …** gibi yazdın mı?" | denn'den sonraki sözcük sırası hiç gösterilmemişti. Yazma kalıbı (`___, denn ___.`) sırayı denetlemiyor. Öğrenci kolayca "denn du Fieber hast" yazar. Tam örnek olağan sırayı gösteriyor. |
| 3 | P2 | gün 53 yazma | `zorunlu` ve `kontrol_tr` denn'i denetlemiyordu (görev istiyordu) | `zorunlu` + "denn"; kontrol: "nedenini **denn das Wetter war …** gibi yazdın mı?" | Görev ile denetim uyumsuzdu. DENETİM-A1 P1-2 "en az iki yazma görevinde zorunlu" diyor: 48 ve 53. |
| 4 | P2 | gün 53 n1c | "Freut mich auch! …" / "Ben de memnun oldum!" | "Freut mich! …" / "Memnun oldum!" | n1 ve n1b'deki "Willkommen!" ve "Entschuldigung!…" yollarında öğrenci "freut mich" demiyor, bu yüzden "auch" yersiz kalıyordu. |
| 5 | P2 | gün 53 n1d | "Schön! Ich spreche leider nur Deutsch. Was machst du …? Und welche Sprachen sprichst du?" | "Schön! Was machst du hier in der Firma? Und welche Sprachen sprichst du? Ich spreche leider nur Deutsch." (Türkçesi de aynı sırada) | Kolleginin kendi dilini sorudan önce söylemesi sahnede doğal değildi. Doğal olan: önce sorar, sonra kendini ekler. |
| 6 | P2 | gün 53 n2 | "Schön! Und, wie war dein Wochenende?" / "Güzel! …" | "Toll! Und, wie war dein Wochenende?" / "Ne güzel! …" | n1d de "Schön!" ile açılıyor. Arka arkaya iki "Schön!" geliyordu. "toll" 53'te zaten var (n3). |
| 7 | P2 | gün 46 görev cümlesi (lx:Heimat) | "Memleketim: {ulke}. Orası benim yurdum." | "Geldiğim ülke: {ulke}. Orası benim memleketim." | Önceki çeviri aynı şeyi iki kez söylüyordu ve "yurdum" doğal değil. Yeni çeviri eksiz yuvayı koruyor. |
| 8 | P2 | test-08 t13 `prompt_de` | "Guten Tag! Wer sind Sie? Erzählen Sie bitte." | "Guten Tag! Bitte stellen Sie sich kurz vor." | "Wer sind Sie?" Almanca kulağa sert ve sorgulayıcı geliyor. Bir sınav görevlisi bunu böyle sormaz. Yeni cümle 07'den farklı ve sözcükleri öğretilmiş: kalıp 46, "kurz" 8. gün. |
| 9 | P2 | test-07 t13, test-08 t13, 46/n8, 53/n1d `accepted` | 7 cümlelik tanıtma için 4 dizilim vardı | 07 ve 08'e birer biçim daha: "Ich bin {meslek} von Beruf", "… und ein bisschen Deutsch", "Ich bin {yas}.", "Ich wohne jetzt in …" ve ich'i tekrarlayan und biçimi. 46/n8'e "Ich bin {meslek} von Beruf. Ich bin {aile}.", 53/n1d'ye "Ich arbeite als {meslek}. Ich spreche {diller}." | Haksız ret riski vardı. Gerçek sınavdaki kısa cümleler "von Beruf", "ein bisschen Deutsch" gibi biçimlerle gelir. Kuralın tanımadığı cevap reddedilmiyor, yapay zekâya ya da "kontrol edilemedi"ye düşüyor. Yine de sık biçimler listede olmalı. |
| 10 | P2 | test-07/08 t13 sırası | Listenin 1. maddesiydi | 07'de t07 (dinleme) ile t08 (boşluk) arasında, 08'de t07 (boşluk) ile t08 (dönüştürme) arasında | Test en uzun konuşma göreviyle açılıyordu. Türler karışık gelmeli (FORMAT). Yeni yerde iki konuşma maddesi art arda gelmiyor. |

## Doğru bulunanlar (değişiklik yok)
- **{ulke} öbeği:** her yerde "aus" ile geliyor ("aus der Türkei" dilbilgisel). "Ich komme von {ulke}." çeldiricisi Türkçe konuşanın gerçek hatası (-den → von). Geri bildirimi doğru: "Memleket için **von** değil **aus** dersin".
- **Diğer yuvalar:** "Ich bin {meslek}." artikelsiz. "Ich bin {aile}." ledig, verheiratet ve geschieden ile çalışıyor. "Mein Beruf ist {meslek}." A1'de yaygın, kabul edilebilir.
- **46/n8 çeldiricisi "Sie war verheiratet.":** mantıklı. Öğrenci az önce Brandl Hanım'ın formunu doldurdu, şimdi kendi formu soruluyor. Geri bildirim durumu doğru adlandırıyor. Akış (n5/n6 → n7 "Moment, noch etwas!" → n8 → n8b → n9) iki yoldan da tutarlı.
- **Mektup kalıpları:** "Liebe Frau Brandl, Sie sollen …" (Sie her zaman büyük), "Lieber Tobi, gute Besserung!", "Liebe Derya, am Sonntag …", "Sehr geehrte Damen und Herren, hier ist …". Hitaptan sonra virgül ve küçük harf doğru. Kalıp eşleşmesi noktalamayı yok sayıyor, bu yüzden "Liebe Frau Brandl!" de geçiyor. Bu doğru, eski ama geçerli bir yazım.
- **denn cümleleri:** "denn du hast Fieber", "denn das Wetter war schön". Fiil ikinci yerde, doğru.
- **Sahne:** 53'te yeni iş arkadaşının memleketi duyduktan sonra "Welche Sprachen sprichst du?" diye sorması doğal. 46'da Huber Hanım'ın "Welche Sprachen sprechen Sie? Das ist für Dr. Weber wichtig." demesi de doğal; muayenehaneler anlaşma dilini not eder.
- **Yuvalar:** karşı replikte, `prompt_de`'de ve `audio_de`'de yuva yok. Sabit kişisel bilgi yok. İngilizce yok. Bütün üretim maddelerinde `accepted` ≥ 3.

## Kalan şüpheler (AÇIK, içerik dışında ya da yetkim dışında)
1. **P2, "Viele Grüße, {name}" ve "Mit freundlichen Grüßen, {name}" virgülü (45, 46, 48, 53 `ornek_de`).** DIN 5008'e göre selamdan sonra virgül konmaz, ad alt satıra yazılır. Depo tek satır düzeninde virgülü kullanıyor ("Viele Grüße, Tom"). `Okuma.tsx` örneği `<p>` içinde gösteriyor, satır sonu görünmez. Öneri (baş geliştirici): örnek paragrafına `white-space: pre-line` verilsin, sonra `ornek_de` "Viele Grüße\n{name}" yazılsın. Kabul kalıpları noktalamayı saymıyor, bu yüzden öğrencinin virgülsüz doğru yazımı zaten kabul ediliyor. Engel değil.
2. **P2, 46/n7 "Wie alt sind Sie?"** Muayenehane formu gerçekte doğum tarihi sorar, yaş sormaz. Doğum tarihi için yuva yok. Kendi yaşını söyleme 49. gün testinden önce yalnız burada üretiliyor, bu yüzden bırakıldı.
3. **Kart sözcükleri (sözlük, bana değil):** sınav kartındaki **Alter** ve **Wohnort** sözlükte yok. **Land** yalnız "auf dem Land" (kırsal) anlamıyla 33. günde geçiyor. **Sprachen** yalnız 46 ve 53 kalıplarında görülüyor. t13 durumları bu sözcükleri kalın gösteriyor. Öğrenci kartı tanısın diye kart olarak öğretilmeleri gerekir (DENETİM-A1 §4).
4. **Dünya tutarlılığı (not):** 46/n4'te öğrencinin adresi dünyada Brunnengasse 7. 53/n1c'de ise "Ich wohne in {sehir}" profil şehrini kullanıyor. Bu PM-148'in yuva kararından geliyor, dil hatası değil.

## Denetimler (son koşu)
- `npm run content:validate` → 0 hata, 292 uyarı (önceki gibi 292)
- `dikis-kos.ts` → İhlal: 0
- `hafta-kapisi-kos.ts --hepsi` → Öğretilmeden istenen: 0 · anlaşılmayan karşı soru: 0 · hafta sonu testi %100 (12/12)

## Sonuç
Bu dosyalardaki dil hatalarının hepsi kapandı: **KAPANDI**. Hata oranı: 10/32 ≈ 0,31 (P1 2/32). Açık maddeler 1–3 baş geliştiriciye ve sözlüğe (lex) gider. `review` alanına dokunulmadı (brief).

## 2. tur: okur GERİ'leri (docs/v2/reviews/okur/ic-a1-hafta-7-8.md, 7 madde)
| # | Yer | Düzeltme |
|---|---|---|
| 1 | gun-46 `yazma.gorev_tr` | 19 sözcüklü son cümle üçe bölündü: durum ("Formu e-postayla gönderiyorsun, kime gittiğini bilmiyorsun."), açılış, kapanış. |
| 2 | gun-48 `yazma.gorev_tr` | Dört iş üç kısa cümleye bölündü: "Geçmiş olsun de ve iki öğüt ver. Bir öğüdün nedenini **denn** ile söyle. Onun için ne yapacağını da yaz." |
| 3 | gun-48 `kontrol_tr[1]` | "(du olmadan)" çıkarıldı. Yeni hâli: "Öğütler **Trink**, **Bleib** ile mi başlıyor? Nedende **du** gelir: **denn du hast …**" |
| 4 | gun-48 `kontrol_tr[0]`, `[2]` | Gute Besserung açılışla birlikte denetleniyor: "**Lieber Tobi,** ile başladın mı? **Gute Besserung** yazdın mı?". Üçüncü madde: "**für dich** ile ne yapacağını yazdın mı? Sonda **Viele Grüße** var mı?" Liste 3 maddede kaldı. |
| 5 | test-07 t13 `situation_tr` | "Kartlar:" çoğul yazıldı. Her kart sözcüğünün Türkçesi bir kez veriliyor: Name (ad), Alter (yaş), Land (ülke), Wohnort (oturduğun yer); bir de Sprachen (diller), Beruf (meslek), Hobby (hobi). Her cümle ≤ 14 sözcük. |
| 6 | test-07 t13 `why_tr` | 26 sözcük yerine üç kısa cümle. Yalnız yeni kartların kalıbı eşleniyor: Alter, Land, Wohnort ve Beruf. |
| 7 | test-08 t13 `situation_tr` | 5. maddedeki kart ve Türkçe düzeni burada da uygulandı ("Önünde kartlar var. Kartlar: …"). |

Not: Alter ve Wohnort kartları 1.–2. hafta PR'ında geliyor (bu PR ona yığılı). Cevaplarda kart sözcüğü kullanılmıyor, kural sürüyor.
Denetimler (2. tur): validate 0 hata, 292 uyarı · dikiş İhlal 0 · hafta kapısı: öğretilmeden istenen 0, anlaşılmayan karşı soru 0 · `npx vitest run content/tools`: 18/18 dosya, 230/230 test geçti. Sonuç: KAPANDI.
