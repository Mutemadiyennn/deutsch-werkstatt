# Sözlük partisi a2-09 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 26 kart (A2 tablosu 22. hafta, 150.–153. gün) · dosya: `content/v2/registry/lexicon/batch-a2-09.json`

Gün ataması `a2-kesin.json` (`lex_doldurma` a2-09): 150 Schulzeit–Märchen (7) · 151 Geburt–Vergangenheit (7) · 152 Schulabschluss–Jahrzehnt (6) · 153 Gesundheit–Bestellung (6).

## Sayılar
- Değişmeden geçen: 12 kart
- Düzeltilen: 14 kart, **24 düzeltme** (9'u yalnız `also_ok`)
- Kalan: 0
- Hata oranı: 24 / 26 = 0,92
- `npm run content:validate`: 0 hata, 158 uyarı (bu partiye ait uyarı yok)
- `review`: `draft` (okur bekliyor, alana dokunulmadı)

## Düzeltmeler (önce → sonra, gerekçe)

**Türkçe çeviri ve doğallık**
1. `lx:Heimweh` ö5 ve b3: `Annem her aradığında ağladım.` → `… ağlardım.` **Immer wenn** tekrar eden bir olayı anlatıyor. Türkçede bunun karşılığı "-ardı".
2. `lx:Azubi` ö3: `Yeni gelen çırak, ona bir nasıl yapıldığını göster.` → `Yeni gelen çırak, nasıl yapıldığını ona bir göster.` Eski sözcük sırası bozuktu.
3. `lx:Krankheit` ö1, b4 (çeviri + ipucu): `Hastalıktan beri …` → `Hastalığından beri …`. **Seit der Krankheit** onun hastalığını anlatıyor. Türkçede iyelik eki gerekir.
4. `lx:Übung` ö2, b2 (çeviri + ipucu): `Her gün çalışıyorum` → `Her gün pratik yapıyorum`. "Çalışıyorum" **arbeiten** diye de okunabiliyordu. Öğrenci **üben** ile **arbeiten**'i karıştırabilirdi.

**Boşluk ipuçları (doldurulmuş cümleyle çelişen gerekçe)**
5. `lx:Taschengeld` b4: `Her hafta tekrar olduğu için **Immer wenn** denir.` → `Harçlık her geldiğinde olduğu için …`. B4'ün cümlesinde "her hafta" yok. O söz ö2'de geçiyor.
6. `lx:schneien` b4: `Her kışın tekrar olduğu için …` → `Kar her yağdığında olduğu için …`. Eski ipucunda hem Türkçe ("her kışın") hem gerekçe yanlıştı: tekrar eden şey kışlar değil, kar yağışı.

**Hata notları**
7. `lx:Gesundheit` 1.: `Hapşıran birine **Gesund!** yanlış.` → `Biri hapşırınca **Gesund!** demek yanlış.` Eski cümlede fiil yoktu, yarım kalıyordu.
8. `lx:Heimweh` 2. not eklendi: `Türkiye'yi özlüyorum derken **Ich habe Heimweh nach Türkei** yanlış. Doğrusu **Ich habe Heimweh nach der Türkei**.` Türkçe konuşanın en sık hatası **die Türkei**'de artikeli atlamak. Kartın eşdizimi (**Heimweh nach der Türkei**) de bunu kullanıyor. 1. not (**Ich bin Heimweh**) kaldı.

**`also_ok` (haksız ret riski ve yanlış kabul)**
9. `lx:Jahrzehnt` b1: `also_ok: ["Jahren"]` silindi. **seit Jahren** "yıllardır" demek. Boşluğun Türkçesi "onlarca yıldır". Başka anlamdaki cevap kabul edilmez (BRIF md. 7).
10. `lx:auswandern` b3: + **gegangen** (`Viele … sind nach Deutschland gegangen` çok sık).
11. `lx:Schulabschluss` b3, `lx:Praktikum` b2, `lx:Rentner` b3: + **später**. Aynı haftanın dersi (`gr:a2-13:t5`) bunu **danach** ile birlikte öğretiyor.
12. `lx:Rentner` b1, b4: + **in Rente**. Kartın kendi hata notu **Mein Vater ist in Rente** biçimini "doğru" diye veriyor ama boşlukta kabul edilmiyordu.
13. `lx:Geburt` b2: + **war** (`Nach der Geburt war sie ein Jahr zu Hause`, doğal ve sık).
14. `lx:Neuigkeit` b1: + **Neues** (`Na, gibt's Neues?` gündelik konuşmada en sık soru).

**Katman ve kalıp bağı**
15. `lx:Jahrzehnt` ö5: `layer: "alltag"` → `"hd"`. **vor einem Jahrzehnt** gündelik konuşmada pek söylenmez, orada **vor zehn Jahren** denir. Kartta `alltag` örneği kalıyor (ö3).
16. `lx:Gesundheit` `patterns`: `pt:imperativ-sie` çıkarıldı. Kartta **Sie** ile kurulan emir cümlesi yok, tek emir cümlesi **Bleib gesund!**. Kalan bağlar: `pt:fuer-akk`, `pt:verb-zweite-stelle`.

## Görev sorularına cevap
- **`lx:berühmt` + `also_ok` "bekannt" (lex'in açık notu):** kabul doğru, **bırakıldı**. **Er ist im Fernsehen bekannt geworden** ve **Bayern ist für sein Bier bekannt** doğru ve çok doğal cümleler. **bekannt** sıklık listesinde 681. sırada. Öğrenci bu sözü kartından önce de duymuş olabilir. `also_ok` yalnız cevabı kabul etmek için kullanılıyor (`web/src/core/garden.ts` `accepted()`), ekranda gösterilmiyor. Bu yüzden 200. günün kartını öne çekmiyor. Reddetmek ise haksız ret olurdu.
- **İleri gönderme:** bütün örnekler, boşluklar, `also_ok`, eşdizimler, notların kalın parçaları, `parcalar` ve `related` 150.+ gün kartlarına karşı betikle tarandı. Bulunan eşleşmelerin hepsi yanlış alarm: **gab/gibt** → abgeben (154), **kam** → wiederkommen (155), **machte** → weitermachen (155), **gefahren** → Gefahr (213), **als** → `lx:als#2` (171, karşılaştırma anlamı; zaman anlamı 150. günün kendi dersi). Bu partide werden geleceği, **vorhaben + zu**, **hätte/würde**, **um … zu**, **damit** ve ilgi cümlesi yok. **wurde** (berühmt, Azubi, Rentner) 149. günün tablosunda, **geboren** (Enkel, Geburt) 151. günün kendi dersinde. **später** kartsız, 152. günün dersinde geçiyor.
- **Günün dil noktası:** 150'nin yedi kartının her birinde **als** ya da **(immer) wenn**, 151'in her kartında konuşma Perfekt'i ile yazı Präteritum'u yan yana, 152'nin her kartında **im Jahr / danach / seit / mit 16**, 153'ün kartlarının hepsi -ung/-heit/-keit sözcüğü. "Sonu -heit/-keit olan kelimeler hep **die** ile gelir" notu doğru bir kural.
- **`praeteritum` alanları:** schneite, wanderte aus, entdeckte doğru. aux de doğru: schneien **haben**, auswandern **sein**, entdecken **haben**. Ayrılma (`separable: aus`) doğru.
- **`freqRank`:** 26 kartın hepsi listeyle karşılaştırıldı. Sıra numarası olan 14 kartın sayısı listedeki doğru sözcükten alınmış (Märchen 3052, Geburt 1871, berühmt 1369, Enkel 2974, entdecken 985, Generation 2202, Vergangenheit 1027, Universität 2667, Gesundheit 2211, Krankheit 1384, Kleinigkeit 2690, Neuigkeit 1174, Übung 2741, Bestellung 4426). Kalan 12 sözcük listede yok, bu kartlarda alan da yok. Düzeltme gerekmedi.
- **Kalıp bağları:** her bağ, kartın bir örneğinde yapı olarak geçiyor (kişi farklı olabilir, ör. **Haben Sie Enkel?** → `pt:ich-habe`, **Er war lange krank** → `pt:ich-war`). Bu, önceki partilerin ölçütüyle aynı. Tek istisna Gesundheit'tı (16).
- **WORLD:** kalıcı karakter geçmiyor. **Emre** (Azubi), WORLD'de olmayan sıradan bir ad. Ona geçmiş ya da tarihli olay yüklenmemiş. "Yukarıda oturan emekli" adsız, Brandl (alt kat) ve Pichler ile çelişmiyor. Öğrencinin ağzında sabit ad ya da cinsiyet yok. Birinci tekil cümlelerdeki sözcükler (Azubi, Heimweh, Schulabschluss) cinsiyetsiz. Bairisch yok (**auf'm**, **nee**, **'ne** gündelik Almanca).
- **Olgusal iddia:** yasa, süre ya da zorunluluk yok. **Bayern ist für sein Bier berühmt** genel bir bilgi. **bis 18 Uhr** bir dükkânın kendi sözü. `SOURCES.md`'ye satır gerekmedi.
- **OD-9:** dilbilgisi terimi, üç nokta, Türkçede tırnak, İngilizce köprü yok (betik eşleşmeleri yanlış alarm: "hâlâ", "hâli"). 14 kelimeyi aşan cümle yok. İpuçlarının kalın parçası her boşlukta doldurulmuş cümlede harfi harfine geçiyor (sapma 0). Para **avro**.

## Değişen Türkçe satırlar (okur için, 13)
- `mistakes_tr` (2): `lx:Heimweh` [1] (yeni), `lx:Gesundheit` [0].
- `hint_tr` (4): `lx:schneien` b4, `lx:Taschengeld` b4, `lx:Krankheit` b4, `lx:Übung` b2.
- Örnek çevirileri (4): `lx:Heimweh` ö5, `lx:Azubi` ö3, `lx:Krankheit` ö1, `lx:Übung` ö2.
- Boşluk çevirileri (3): `lx:Heimweh` b3, `lx:Krankheit` b4, `lx:Übung` b2.

## Kalan şüpheler (düzeltilmedi, engel değil)
- `lx:Generation` ö5 **das Rezept geht von Generation zu Generation**: anlaşılır ve kullanılan bir söz. Daha yerleşik biçim **wird … weitergegeben**, ama bu edilgen yapı henüz öğretilmedi. Bırakıldı.
- `lx:Schulzeit` ö4: diyalogda **fuhren wir** var. 151. gün "konuşurken Perfekt" diyor. Ancak 150. günün dersi **Immer wenn … spielten wir** gibi Präteritum örnekleri veriyor. Bırakıldı.
- `tier` K1 / sıklık K2 (Generation, Gesundheit, Universität, Kleinigkeit, Übung, Enkel, Märchen, Bestellung): A2 partilerinin ortak kararı (BRIF), baş geliştiricide.

## Sonuç
Bulunan bütün dil hataları dosyada düzeltildi. Doğrulayıcı 0 hata verdi.

Sonuç: KAPANDI — okur bekliyor

## Fark turu (okur 5 GERİ)

Kaynak: `docs/v2/reviews/okur/lexicon-batch-a2-09.md`. Bu turu a2-10'un dilbilimcisi yaptı (dosya devredildi). Okurun önerileri esas alındı, her alan tek fikir. Yalnız bu 5 alan değişti.

1. `lx:Geburt.mistakes_tr[0]`: yanlış **Wann ist deine Geburt?** → **Wann hast du Geburt?** Doğrusu (**Wann hast du Geburtstag?**) aynı kaldı. Artık tek fark **Geburt** / **Geburtstag**.
2. `lx:Schulabschluss.forms[0].hint_tr`: → `Kadın için okulunu bitirdi derken **ihren Schulabschluss** denir.`
3. `lx:Universität.forms[2].hint_tr`: → `2012 yılında derken **Im Jahr 2012** denir.`
4. `lx:Azubi.examples[2].tr`: → `Yeni gelen çırak. Ona nasıl yapıldığını bir göster.`
5. `lx:Kleinigkeit.forms[3].hint_tr`: → `Yemekte sadece biraz derken **Nur eine Kleinigkeit** denir.`

Denetim: ipucu kalın parçası sapma 0. `npm run content:validate` 0 hata, 158 uyarı. `review` alanına dokunulmadı.

Okurun yeniden okuyacağı alanlar (5): yukarıdaki 1–5.

Sonuç (fark): KAPANDI
