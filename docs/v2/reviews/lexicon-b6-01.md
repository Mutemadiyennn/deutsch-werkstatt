# Dilbilimci incelemesi: #58 B6 grup 01

Tarih: 2026-11-19 · İnceleyen: dilbilimci-ajan · Kart: 75 · Düzeltilen kart: 36 · Düzeltme: 75 · Sonuç: AÇIK (lint ve aşağıdaki açık noktalar baş geliştiricide)

Yama: `b6-01.dil.json`. Sözlüğe dokunulmadı. Lint ve `content:validate` çalıştırılmadı.

## İncelenen kimlikler
Buchstabe, buchstabieren, werden, nehmen, einfach, bringen, kennen, fahren, bekommen, schnell, meinen, ziehen, Familie, Stand, Deutsch, Ohr, Patient, übel, Weihnachten, Lust, Fuß, Kollege, wehtun, mitkommen, üben, schlucken, Einladung, Zahl, Tasse, Husten, absagen, Kerze, zurückgeben, backen, Tablette, aufschreiben, Feierabend, Rathaus, Advent, Adventskranz, Bauch, Bratwurst, Dialekt, Erkältung, Glühwein, Hals, Kinderpunsch, Krankenkasse, Krankschreibung, Mandel, Pfand, Plätzchen, Schnupfen, Senf, Sprechstunde, Versichertenkarte, Weihnachtsfeier, Weihnachtsmarkt, Wichteln, dringend, duzen, ein_bisschen, erkältet, lieber, schwindelig, sich_treffen, siezen, zusagen, stehen#2, Versprechen, Schuh, Firma, unbedingt, schenken, einladen.

## Düzeltmeler (75)

| Tür | Sayı |
|---|---|
| `forms` (cümle, cevap tekliği, çeviri, ipucu) | 37 |
| Örnek çevirisi | 26 |
| `mistakes_tr` | 7 |
| `coll` | 3 |
| Kart `tr` | 2 |
| Fotoğraf sorgusu | 0 |

### forms
- **Cevap tek değildi:** `werden` 3 (**Es ___ schon dunkel**: **ist** de olur → **Es ___ langsam dunkel**). `backen` 2 ve 3 (**backst/bäckst**, **backt/bäckt** ikisi de doğru; tek cevaplı boşlukta sorulmaz → **wir backen**, **will ... backen**). `Weihnachten` 3 (**frohe/schöne** → **Bald ist ___.**). `Stand` 4 (çeviri `yanında` iken **beim** daha uygun düşüyordu → `Tezgâhta buluşuyoruz`).
- **Çeviri cevabı başka yere çekiyordu:** `Dialekt` 2 ve `Kinderpunsch` 2 (`Bu` → **diesen/Dieser**), `Hals` 2 (`Boğazınıza` → **Ihren**), `wehtun` 5 (`Neresi` → `Nereniz`, **Ihnen** için), `Dialekt` 1 (**ein** çeviride yoktu).
- **Zorlama cümle:** `Erkältung` 4 (**oft Erkältungen** → **etwas gegen Erkältung**), `Krankenkasse` 3 (**Ich bin bei der Krankenkasse** tek başına orada çalışıyorum gibi okunur → **bei der Vils-Kasse versichert**).
- **İpucu yanlış ya da çıplak kural:** iki parçalı fiillerde `sage başa` (15 ipucu; **Ich sage ... ab** cümlesinde başta **Ich** var) → `**ich** ile **sage** olur, **ab** sona gider`. `Fuß` 4, `Schuh` 2, `Hals` 2: ipucu asıl fiile bağlandı (**verletzt**, **gesehen**, **an**). `unbedingt` 2: `muss sonrasında gelir` cümleyle çelişiyordu. `mitkommen` 1: `Sen de gel` → `Sen de geliyor musun`.
- **Aynı Almancaya farklı Türkçe:** `mitkommen` 2, `Feierabend` 2, `Erkältung` 2 (`şimdiden daha iyi` → `artık daha iyi`).
- **Çift okunan `pazar`:** `Stand` 5, `Advent` 1 ve 3 (`Advent pazarı` Noel pazarı gibi okunuyordu → `Advent pazar günü`).

### mistakes_tr
- `Buchstabe` 2: harfin okunuşu kartın kelimesini anlatmıyordu → `Beş harf derken **fünf Buchstabe** yanlış`.
- `Krankenkasse` 2: **In welcher Krankenkasse** Almancada kullanılıyor, `yanlış` denemez → **Bei welche** / **Bei welcher**.
- `meinen` 1: doğru biçim söz dizimini de değiştiriyordu, tek fark kaldı (**meinen** → **gemeint**).
- `Deutsch` 1, `wehtun` 1, `Krankschreibung` 1: Türkçe niyet Almancayla örtüşmüyordu. `Advent` 2: `pazar`.

### Kart tr, coll, örnekler
- `werden`: `-ecek` eki → `yapacak olmak`. `einfach`: `sadece` kartın kendi hata notuyla çelişiyordu (**nur**) → `tek yön` (ipucunda karşılığı var).
- `Stand` örnek 1–4, `Rathaus` 4, `sich_treffen` 4: `stant / standın orada` (okur listesindeki çift okunan söz) → `tezgâh`; forms ve eşdizimle aynı karşılık.
- `Familie` 2: parantez kalktı. `Tasse` 1: `rica ediyorum` → `istiyorum`. `Buchstabe` 4, `einfach` 2, `kennen` 1, `ziehen` 1 ve 4, `Patient` 2, `Weihnachten` 2–4, `Krankenkasse` 4, `schenken` 4: kesme işareti kalktı.
- `üben` 1 (çeviri fazla söylüyordu), `zusagen` 4, `schlucken` 4, `wehtun` 1–2, `Feierabend` 2, `Advent` 1: forms ve eşdizimle aynı karşılık.

## Açık noktalar
1. `Familie` örnek 1 `Ailem Türkiye'de yaşıyor.`: kesmesiz doğal biçim yok, bırakıldı. Örnek çevirilerinde kesme yasağı özel adlarda da geçerliyse karar gerekir.
2. `Weihnachten` 2 (**an Weihnachten**): **zu Weihnachten** da doğru Almanca (kuzeyde yaygın). Bavyera kullanımı öğretildiği için bırakıldı; boşluk serbest yazılıyorsa **zu** kabul edilmeli.
3. `backen`: **du/er** biçimleri forms dışında kaldı. Şema birden çok cevap kabul ederse geri eklenebilir.
4. Kart bağlamı olmadan çok açık kalan boşluklar (`Husten` 1, `Schnupfen` 1, `Hals` 4, `erkältet` 1, `Familie` 4 ve fiil kartlarında eş anlamlı fiiller) çeviri ipucuna dayanıyor; kart dışında karışık sorulacaksa haksız ret riski var.
5. **Ich hätte gern** bu grupta `istiyorum` oldu; grup dışı kartlarda `rica ediyorum`, `alayım`, `alabilir miyim` sürüyor.
6. `werden`, `ziehen`, `nehmen` `anlam_tr` içinde `ya da` ile iki anlam, `buchstabieren` `ipucu_tr` içinde `hece`: önceki okur turundan geçtiği için dokunulmadı.
7. `Versprechen` hata notu 2 (**Ich mache mein Versprechen**) Türkçeden doğan bir hata değil; daha iyisi bulunamadı, bırakıldı.
