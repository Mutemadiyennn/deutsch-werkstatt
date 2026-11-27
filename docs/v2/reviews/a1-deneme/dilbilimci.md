# Dilbilimci incelemesi — `content/v2/assess/a1-deneme.json`

Tarih: 2026-11-22 · İnceleyen: dilbilimci-ajan · Tur: tek tur (PM-087 B.2) · Kaynak: yalnız A1 "yapabiliyorum" listesi; ders dosyaları okunmadı.

## Kapsam

47 madde incelendi: dinleme 15 (6 + 4 + 5), okuma 15 (5 + 5 + 5), yazma 2 (form 5 alan + mesaj), konuşma 15 (3 + 6 + 6).
Değişiklik yapılan madde: 27 (bunların 4'ü yalnız ortak okuma metni değiştiği için). Gerçek hata sayılan bulgu: 13 → hata oranı 13/47 = 0,28. Kalanı düzey sadeleştirmesi ve doğallık.

Makine denetimi (düzeltmeden sonra): her bölümde ham puan 15; bütün `kanit` sıraları geçerli ve doğru cümleyi gösteriyor; bütün `accepted` listeleri ≥ 3 ve tekrarsız; `npm run content:validate` → 0 hata.

## 1. Sınav geçerliği (hata)

| Madde | Önce | Sonra | Gerekçe |
|---|---|---|---|
| o1:01 (mesaj-1 metni) | "Am Samstag habe ich Geburtstag! Ich mache eine kleine Party …" · kanit [1, 3] | "Ich habe Geburtstag! Am Samstag mache ich eine kleine Party …" · kanit [2, 3] | Metin partinin gününü söylemiyordu, yalnız doğum gününü; "Doğru" cevabı çıkarıma dayanıyordu. Şimdi gün ve saat açıkça yazıyor. |
| o2 anahtar dağılımı | cevaplar b, b, b, a, b | b, a, b, a, a | Beş maddenin dördü "b" idi; okumadan "b" diyen 4/5 alıyordu. o2:02 ve o2:05'te ilanların sırası değişti, `ans` ve `kanit` güncellendi. |
| o2:05 | Löwen-Apotheke ilanında pazar yok | "… Sonntag geschlossen." eklendi | Yanlış seçeneğin neden yanlış olduğu metinde açık olmalı. |
| d3:04 | kanit [2, 3] | kanit [1, 2, 3] | Doğru şık "Pazartesi" diyor; gün 1. satırda. |
| d3:02 | "Sie können sie ab neun Uhr abholen." | "Sie können sie am Samstag ab neun Uhr abholen." | Hangi gün olduğu belirsizdi. |
| y2 `zorunlu` | "nicht kommen\|kann nicht\|leider nicht\|absagen" | + "komme nicht", "geht nicht", "keine Zeit", "verschieben" | "Ich komme am Donnerstag nicht." ya da "Ich habe keine Zeit." gibi doğru cümleler haksız reddediliyordu. Selama "Guten Morgen", kapanışa ss/ue yazımları (Grüsse, Gruss, Gruesse) eklendi. |
| k3:02 ↔ d1:05 | konuşma: baş ağrısı için ilaç iste | konuşma: öksürük için ilaç iste (5 örnek cevap) | Dinleme d1:05 aynı cümleyi ("Ich brauche etwas gegen Kopfschmerzen") hazır veriyordu; konuşma maddesi ezberden çözülüyordu. |
| k3:01 ↔ d3:03 | Restaurant Olivo, dört kişi | Restaurant Adria, iki kişi (5 örnek cevap) | Aynı restoran ve aynı "Tisch für vier Personen" dinlemede geçiyordu. |
| k3:03 | prompt_de "Ja, bitte?" | "Bild: Uhr" | Sokakta ilk konuşan öğrenci; karşı tarafın önce "Ja, bitte?" demesi mantıksız. Kabul listesine dolaylı soru da eklendi. |

## 2. Almanca: düzey ve doğallık

| Madde | Önce | Sonra | Gerekçe |
|---|---|---|---|
| d1:02 | "Haben Sie am Freitag Zeit?" | "Geht es am Freitag?" | Muayenehaneye böyle sorulmaz; kısa ve doğal biçim. |
| d1:06 | "Reis ist in Gang drei" | "Der Reis ist in Gang drei" | Artikelsiz biçim doğal değil. |
| d2:03 | "… während der Sprechzeiten an." | "… am Vormittag an." | während + Genitiv A1 üstü. |
| d2:04 | "Information zum Regionalzug nach Bergheim" | "Achtung, eine Information zum Zug nach Bergheim" | Regionalzug gereksiz. **Gleis kaldı**: A1 temel sözcüğü, anonsun kendisi. |
| d3:04 | "Wenn das nicht geht, rufen Sie …" | "Geht das nicht? Dann rufen Sie …" | Yan cümle A1 üstü. Soru "Kapıcı" → "Apartman görevlisi". |
| d3:05 | "Hi, hier ist Jana." | "Hallo, hier ist Jana." | İngilizce selam gereksiz. |
| o1:03–05 (mesaj-2) | "Ich habe eine Grippe" | "Ich bin krank" | Daha sık ve daha basit; cevaplar buna dayanmıyor. |
| o2:02 | "Praxis Okafor, Allgemeinmedizin." | "Praxis Okafor, Hausärztin." | A1 üstü sözcük kalktı. |
| o3:02 | "Ab morgen, 8 Uhr, sind wir …" | "Morgen ab 8 Uhr sind wir …" | Doğal sıra. |
| o3:03 | "Wir arbeiten an den Leitungen im Keller." | "Wir müssen im Keller etwas reparieren." | Leitungen A1 üstü. |
| k3:05 | "Können Sie morgen bitte mein Paket annehmen? Ich bin nicht zu Hause." | "Morgen kommt ein Paket für mich, aber ich bin nicht zu Hause. Können Sie es bitte annehmen?" | **annehmen kaldı** (gerçek hayatta duyulan tek doğal sözcük), ama anlam artık önceki cümleden ve resimden çıkıyor. Bir örnek cevap eklendi. |

Bilerek bırakılanlar: **Notdienst** (o2:05) gerçek tabela sözcüğü; cevap "Heute, Sonntag" ve "Geöffnet" ile bulunuyor. Roggenbrot, Fleischtheke, Hähnchen, Stadtrand, warm, absagen: cevap bunlara dayanmıyor.

## 3. Metinde geçmeyen "tuzak" şıklar

Hepsi kaldı; gerçek A1 sınavı ölçüsünde adil:
- d1:02 "halb neun" → 9:30: A1'in temel saat tuzağı; doğru cevap açıkça söyleniyor.
- d1:03 "3. kat": öteki iki şık metinden; üçüncüsü zararsız dolgu.
- d3:02 28,50 / 82,50 / 28,15 ve d3:05 numara şıkları: sayı çevirme (achtundzwanzig ↔ zweiundachtzig, fünfzig ↔ fünfzehn, zwölf ↔ einundzwanzig) tam ölçülen beceri; mesaj iki kez dinleniyor.

## 4. Kabul listeleri

- Form: telefon (+3 yazım), sokak (+2), meslek (+1), şikâyet (+4: "Ich habe Halsschmerzen.", "Halsweh" …) genişletildi.
- k1:03: yönergeye "senin cevabın kendi soyadınla, ölçüte göre puanlanır" eklendi; kodlar doğrulandı (Berta/Emil/Richard/Gustav ve Berlin/Essen/Rostock/Goslar).
- `note_tr`: konuşmadaki `accepted` listelerinin örnek olduğu, önceden gösterilmediği ve k1:01, k1:02, k1:03, k3:04'ün ölçütle puanlandığı yazıldı.

## 5. Türkçe

- k2:02, k2:05, k2:06, k3:05: "Partnerin kartı …" → "Partnerinin kartında … yazıyor" (iyelik hatası); kart sözcüğünün Türkçesi eklendi.
- o3:04: "7 numaralı otobüs" → "7 numaralı hat" (metin araç türünü söylemiyor).
- d3:02: "Pasta kaç para?" → "Pasta ne kadar?".
- İngilizce köprü yok; dilbilgisi terimi yok.

## 6. Düzen ve kurallar

- Dört bölüm resmî A1 düzeninde: dinleme 3 kısım 15 madde (2 / 1 / 2 dinleme), okuma 3 kısım 15 madde, yazma form 5 alan + ~30 kelimelik mesaj (3 nokta), konuşma 3 kısım, `hazirliksiz: true`, konu kartla o anda veriliyor. Geçme: toplam ≥ 0,6 ve konuşma ≥ 0,6; `puanlama_tr` bununla tutarlı.
- Kişisel bilgi, gerçek kurum, kurs/kitap adı, sınav tarihi yok. Ses ve okuma metinlerinde yer tutucu yok; `{name}` yalnız öğrencinin kendi satırlarında. Bavyera ağzı yok.

## Kalan açık noktalar (içerik hatası değil; baş geliştiriciye)

1. Doğrulayıcı bu dosyayı yüklemiyor (`load.ts` yalnız `assess/bank.json` okuyor); "0 hata" bu dosyanın şemasını sınamıyor. Sayım, `kanit` ve `accepted` denetimini elle koştum.
2. `zorunlu` alanını "\|" ile ayrılmış düz alt dizgi olarak varsaydım (düzenli ifade işareti kullanmadım); puanlayıcı yazılınca doğrulanmalı.
3. Konuşmadaki `accepted` listeleri cevaptan önce ekranda gösterilirse "hazırlıksız" bozulur; bu arayüz kararıdır.
4. `familienname` kabul listesi yalnız büyük/küçük harf farkı içeriyor (bir soyadının başka doğru yazımı yok); puanlayıcı harf büyüklüğünü zaten yok sayıyorsa liste biçimsel olarak ≥ 3'tür.
5. o2:01 ve o3:01 aynı durumu soruyor (cumartesi saat 15, açık mı); geçerli ama tekrarlı, sonraki sürümde biri değiştirilebilir.

## Sonuç

KAPANDI. `review.status` → "reviewed".

KARAR: ONAY
