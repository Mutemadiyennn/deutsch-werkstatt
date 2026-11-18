# İnceleme: content/v2/registry/patterns.json (kalıp kapısı, D-063)
İnceleyen: dilbilimci-ajan · 2026-11-17 · Durum: **ARA SONUÇ** (pilotun 14 kalıbı KAPANDI; kalan 47 kalıp inceleniyor)

## ARA SONUÇ: pilotun 14 kalıbı — KAPANDI
14 kalıbın hepsi `review: {status:"reviewed", by:"dilbilimci-ajan", at:"2026-11-17"}`. Advent mini senaryoları (D-073) bu 14 kalıbı temel kalıp olarak kullanabilir.
`npm run content:validate` → 0 hata.

Madde = çerçeve + grammar_tr + slot doldurmaları + örnekler + dönüşümler + mistakes_tr satırları.

| Kalıp | Madde | Hata | İyileştirme |
|---|---|---|---|
| pt:geht-es-auch | 41 | 1 | 3 |
| pt:ich-habe | 42 | 1 | 0 |
| pt:ich-moechte | 41 | 0 | 1 |
| pt:ich-verstehe-nicht | 40 | 1 | 2 |
| pt:koennten-sie | 34 | 3 | 2 |
| pt:mir-tut-weh | 50 | 0 | 1 |
| pt:noch-mal | 42 | 3 | 1 |
| pt:passt-ihnen | 40 | 1 | 1 |
| pt:perfekt-haben | 46 | 0 | 1 |
| pt:seit | 40 | 2 | 0 |
| pt:um-uhr | 40 | 1 | 0 |
| pt:was-heisst | 40 | 0 | 3 |
| pt:wenn | 42 | 0 | 0 |
| pt:wuerden-sie | 33 | 2 | 2 |
| **Toplam** | **571** | **15** | **17** |

Hata oranı: 15 / 571 = **%2,6**.

### Pilot grubunda önemli düzeltmeler (önce → sonra)
1. pt:noch-mal, slot "fiil": `anrufen` → `aufschreiben`. Çerçeveye konunca „Können Sie das noch mal anrufen?“ çıkıyordu (yanlış cümle).
2. pt:ich-verstehe-nicht, slot "ne": `alles` → `den letzten Satz`. „Ich habe alles nicht verstanden“ yanlış; doğrusu mistakes_tr'ye eklendi („nicht alles“ / „nichts“).
3. pt:koennten-sie ve pt:wuerden-sie, dönüşüm "perfekt": Türkçe parantezli açıklama → Almanca cümle („Konnten Sie mich gestern erreichen?“, „Haben Sie mich gestern zurückgerufen?“). Açıklama mistakes_tr'ye taşındı. Dönüşüm alanı her zaman Almanca cümle taşımalı (ileride seslendirme ve alıştırma bu alanı okuyacak).
4. pt:koennten-sie ve pt:wuerden-sie, dönüşüm "weil": „Könnten Sie bitte … sprechen, weil ich noch nicht alles verstehe?“ → rica + ayrı gerekçe cümlesi („… ? Ich frage, weil …“). Rica sorusuna weil-cümlesi eklemek dilbilgisel olarak mümkün ama doğal değil.
5. pt:passt-ihnen, çerçeve: `Passt Ihnen / dir + zaman?` → `Passt (es) Ihnen / dir + zaman?`. Slot doldurmaları edatlı („am Montag“, „um halb drei“); bunlarla standart biçim „Passt es Ihnen am Montag?“. grammar_tr'ye kural eklendi.
6. pt:seit, mistakes_tr[0]: „'Ich habe seit zwei Jahren hier gewohnt' başka anlam verir“ → „denmez“ + olumsuzda Perfekt kuralı („Ich habe seit gestern nichts gegessen“). Eski metin kalıbın kendi örneğiyle çelişiyordu.
7. pt:noch-mal, mistakes_tr[1]: „'Wie ist das noch mal?' denmez“ → „da duyulur, 'war' daha yaygın“. İddia yanlıştı.
8. pt:geht-es-auch, slot "başka yol": `nächsten Monat` (zaman) → `ohne Anmeldung`.
9. pt:ich-habe, mistakes_tr[3]: „'Ich habe … gehabt' daha az duyulur“ → „Güney Almanya'da sık duyulur“. Öğrenci Bavyera'da yaşıyor.
10. „Nee“ (pt:geht-es-auch, pt:mir-tut-weh) → „Nein“. „Nee“ kuzey/orta Almanya gündelik biçimi; Bavyera odaklı içerikte nötr biçim seçildi.

Bütün değişikliklerin tam listesi son raporda (aşağıya eklenecek).

## OD-9 çevrimi (15 kalıp) — 2026-11-18
Kapsam: `reviewed` durumundaki 15 kalıbın `grammar_tr` ve `mistakes_tr[]` alanları (pilotun 14'ü + pt:wie-viel-kostet). Örnekler, slotlar, dönüşümler ve çerçeveler değişmedi; kalan 46 kalıba dokunulmadı (betikle karşılaştırıldı).

Kurallar: bir cümle bir fikir, cümle en çok 14 kelime, `grammar_tr` en çok 4 cümle; `=`, `;`, `…` ve tırnak yok; Almanca `**kalın**`; dilbilgisi terimi yok; her `mistakes_tr` maddesi tek yanlış ve doğrusu. Birden fazla fikir taşıyan maddeler bölündü, bu yüzden madde sayısı arttı.

| Kalıp | Açıklama önce | Açıklama sonra (hepsi yeniden yazıldı) |
|---|---|---|
| pt:ich-habe | 5 | 5 |
| pt:ich-moechte | 5 | 5 |
| pt:koennten-sie | 5 | 6 |
| pt:wie-viel-kostet | 4 | 4 |
| pt:passt-ihnen | 4 | 5 |
| pt:geht-es-auch | 5 | 7 |
| pt:um-uhr | 4 | 6 |
| pt:seit | 4 | 6 |
| pt:mir-tut-weh | 5 | 5 |
| pt:perfekt-haben | 5 | 5 |
| pt:was-heisst | 4 | 4 |
| pt:wenn | 5 | 5 |
| pt:wuerden-sie | 5 | 5 |
| pt:noch-mal | 4 | 6 |
| pt:ich-verstehe-nicht | 5 | 6 |
| **Toplam** | **69** | **80** |

Açıklama = 1 `grammar_tr` + `mistakes_tr` maddeleri. 69 açıklamanın 69'u yeniden yazıldı; bölmelerle 80 oldu.

### Önce → sonra (3 örnek)
1. pt:mir-tut-weh `mistakes_tr[0]`
   - Önce: 'Ich tue weh' yanlış (bu 'ben acıtıyorum' demek olur). Ağrıyan şey öznedir, kişi Dativ: 'Mir tut der Kopf weh.'
   - Sonra: `**Ich tue weh** denmez, bu ben acıtıyorum demek olur. Doğrusu **Mir tut der Kopf weh**.`
2. pt:seit `mistakes_tr[2]` (iki maddeye bölündü)
   - Önce: 'seit' Dativ ister: 'seit einem Monat' ('seit ein Monat' değil); çoğulda -n: 'seit zwei Jahren'.
   - Sonra: `**seit ein Monat** denmez. Doğrusu **seit einem Monat**.` ve `**seit zwei Jahre** denmez. Doğrusu **seit zwei Jahren**.`
3. pt:perfekt-haben `grammar_tr`
   - Önce: Konuşmada geçmişi çoğunlukla Perfekt ile anlatırız: 'haben' çekimli hâliyle ikinci sırada, Partizip II cümlenin en sonunda. Zaman, nesne, 'nicht' gibi her şey ikisinin arasına girer: … Partizip çoğunlukla ge-…-t (gemacht) ya da ge-…-en (genommen) olur; be-, ver-, er- ile başlayan fiillerde 'ge-' gelmez (bezahlt, vergessen).
   - Sonra: `Konuşmada geçmişi çoğunlukla **habe** ve **gemacht** gibi iki parçayla anlatırsın. **habe** ikinci sırada, öbür parça en sonda durur: **Ich habe gestern den Arzt angerufen**. Sondaki parça çoğunlukla **gemacht** ya da **genommen** gibi görünür. **be**, **ver**, **er** ile başlayanlarda **ge** gelmez: **bezahlt**, **vergessen**.`

### Sadeleşirken düşen ayrıntılar (anlam değişmedi)
- pt:passt-ihnen: konuşma biçimi "Passt's Ihnen am Montag?" ve "um / in ile başlayan zaman" ayrıntısı `grammar_tr`'den çıktı (4 cümle sınırı). Kural yalnızca **am** örneğiyle veriliyor.
- pt:koennten-sie: "kibar ricanın geçmişi konuşmada da aynı biçimle kurulur" notu terim gerektirdiği için çıktı; **Konnten Sie** ile fark örnekle duruyor.
- pt:wie-viel-kostet: "Euro çoğul eki almaz" `grammar_tr`'den çıktı; `mistakes_tr[1]`'de duruyor.
- pt:geht-es-auch: "gehen geçmişte sein alır" kuralı yanlış ve doğru örnekle verildi (**Es hat nicht gegangen** / **Es ist nicht gegangen**).

### Denetim
- Görevdeki tarama (`["„“”;=…]|Dativ|Akkusativ|özne|nesne|Partizip|çekim`) 15 kalıbın bu iki alanında **0** sonuç veriyor. Daha geniş terim listesiyle (mastar, çoğul, tekil, artikel, fiil, yan cümle, modal, Perfekt …) de 0.
- Kalın işaretler çift; kalın dışındaki cümleler en çok 14 kelime; `grammar_tr` en çok 4 cümle.
- `npm run content:validate` → 0 hata, 59 uyarı. `npx vitest run content/tools` → 10/10.

### Baş geliştiriciye notlar
- **Çerçeveler (`frame`) hâlâ terim taşıyor** ve görev dışıydı: "Ich habe + Akkusativ", "… + mastar (sonda)", "seit + Dativ", "Partizip II (sonda)", "FİİL + özne". Öğrenciye görünüyorsa ayrı bir turda çevrilmeli.
- Slot adları da öyle (ör. pt:wie-viel-kostet: "tekil", "çoğul").
- Advent senaryolarında Almanca kelimeler açıklamalarda düz yazıldı (o turda kalın işaret yoktu). Oynatıcı `**…**` işaretini göstermeye başlayınca üç dosya aynı biçime çekilebilir; istenirse yaparım.
- Bazı açıklamalarda kalın bir soru cümlesinin hemen ardından yeni cümle kalın küçük harfle başlıyor (ör. pt:geht-es-auch `grammar_tr`). Kalın gösterim gelmeden okur kontrolü bunları yanlış bölebilir.

## Okur turu (kalıplar) düzeltmeleri — 2026-11-18
Okur raporu: `docs/v2/reviews/okur/patterns-15.md` (80 açıklamadan 62'si geçti; 15 `grammar_tr` ve 3 `mistakes_tr` geri döndü). D-094 gereği `grammar_tr` artık öğretmen notu; öğrenciye görünen kurallar `kurallar_tr`, görünen çerçeve `frame_tr`. `grammar_tr` ve `frame` olduğu gibi bırakıldı.

### 1. `kurallar_tr` ve `frame_tr` (15 kalıp)
Her `kurallar_tr` öğesi tek fikir, en çok 14 kelime, Almanca kalın, terim ve işaret yok (betikle denetlendi).

| Kalıp | kurallar_tr | frame_tr |
|---|---|---|
| pt:ich-habe | 3 | `**Ich habe** + bir şey` |
| pt:ich-moechte | 4 | `**Ich möchte** + istediğin şey · **Ich möchte** + istediğin iş sonda` |
| pt:koennten-sie | 3 | `**Könnten Sie bitte** + istediğin iş?` |
| pt:wie-viel-kostet | 4 | `**Was kostet** + bir şey? · **Was kosten** + birden fazla şey? · **Was macht das?**` |
| pt:passt-ihnen | 4 | `**Passt Ihnen** + gün ya da saat? · **Das passt mir.**` |
| pt:geht-es-auch | 4 | `**Geht es auch** + başka gün ya da başka yol?` |
| pt:um-uhr | 5 | `**um** + saat · **am** + gün · **halb** + bir sonraki saat` |
| pt:seit | 5 | `**Seit** + ne kadar zaman · **Seit wann?**` |
| pt:mir-tut-weh | 4 | `**Mir tut** + ağrıyan yer + **weh**` |
| pt:perfekt-haben | 4 | `**Ich habe** + ne ya da ne zaman + **gemacht**` |
| pt:was-heisst | 4 | `**Was heißt** + anlamadığın kelime?` |
| pt:wenn | 3 | `**Wenn** + şart, + sonra ne olacağı` |
| pt:wuerden-sie | 4 | `**Würden Sie bitte** + istediğin iş?` |
| pt:noch-mal | 4 | `**noch mal** + tekrarını istediğin şey · **Wie war** + bilgi + **noch mal?**` |
| pt:ich-verstehe-nicht | 4 | `**Das habe ich nicht verstanden.** · **Ich habe** + neyi + **nicht verstanden.**` |
| **Toplam** | **59** | 15 |

pt:seit: "seit'ten sonra einem/einer gelir" kuralı, "seit zwei Jahren" örneğiyle çelişmeyecek biçimde iki öğeye ayrıldı: `Tek ay ya da tek yıl için **einem** gelir: **seit einem Monat**.` ve `Sayı varsa kelime **n** ile biter: **seit zwei Jahren**, **seit drei Tagen**.`

### 2. Geri dönen 3 `mistakes_tr`
| Kimlik | Önce → Sonra |
|---|---|
| pt:geht-es-auch `mistakes_tr[0]` | "…yalnızca konuşmada duyulur. Doğru soru geht ile başlar…" → `Soruyu **Es geht auch am Freitag?** diye kurma. Doğrusu **Geht es auch am Freitag?**` |
| pt:geht-es-auch `mistakes_tr[3]` | `**ob** gelince **geht** sona gider…` → **çıkarıldı**. Kalıbın konusu değil; ob bu kalıpta öğretilmiyor. Kalıpta 5 madde kaldı. |
| pt:seit `mistakes_tr[1]` | "O zamandan beri olmayan şeyi şöyle anlatırsın…" → `Dünden beri bir şey yemediysen **habe** ile söylersin: **Ich habe seit gestern nichts gegessen**.` |

Ek olarak pt:seit `mistakes_tr[0]` başına koşul eklendi, böylece [1] ile çelişki gibi okunmuyor: `Hâlâ süren şey için **Ich habe seit zwei Jahren hier gewohnt** denmez. Doğrusu **Ich wohne seit zwei Jahren hier**.`

### Notlar
- `frame_tr` içinde ayırıcı olarak `+` ve `·` kullanıldı (çerçeve bir formül). OD-9 işaret yasağı bunları da kapsıyorsa ayırıcı değiştirilmeli.
- Yeni alanlar bu dalın şemasında yok; doğrulayıcı sessizce atlıyor. PM-017 birleşince `kurallar_tr` ve `frame_tr` için okur turu gerekir (59 + 15 yeni metin okunmadı).
- Başka kalıplarda da açıklanmadan kullanılan **weil** var (pt:ich-moechte [1], pt:mir-tut-weh [2], pt:perfekt-haben [1]). Okur bunları geçirdi; dokunmadım.
- `npm run content:validate` → 0 hata, 59 uyarı. `npx vitest run content/tools` → 10/10.

## Okur turu 2 (kalıplar) düzeltmeleri — 2026-11-18
Okur ikinci turda 80 maddeden 4'ünü geri çevirdi; dördü ve iki gözlem düzeltildi.

| Kimlik | Önce → Sonra |
|---|---|
| pt:perfekt-haben `frame_tr` | `**Ich habe** + ne ya da ne zaman + **gemacht**` → `**Ich habe** + ne + bitmiş iş, örneğin **gemacht** ya da **gegessen**` |
| pt:noch-mal `kurallar_tr[3]` | "Cümlede sondaki kelimeden hemen önce durur: …" → `Sonda **sagen** varsa **noch mal** ondan önce gelir: **Können Sie das noch mal sagen?**` (artık **Wie war Ihr Name noch mal?** ile çelişmiyor) |
| pt:wuerden-sie `kurallar_tr[3]` | "Günlük hayatta ikisi de olur." → `Günlük hayatta **Würden Sie** de **Könnten Sie** de kibar rica için olur.` |
| pt:ich-moechte `mistakes_tr[1]` | "Tek cümlede möchte sona gitmez … weil gelince sona gider …" → `**Ich einen Termin machen möchte** denmez. Doğrusu **Ich möchte einen Termin machen**.` (weil bölümü çıktı) |
| pt:mir-tut-weh `mistakes_tr[2]` | "weil gelince …" → `**weil** yani çünkü gelince **weh** ile **tut** birleşir: **weil mir der Kopf wehtut**.` |
| pt:perfekt-haben `mistakes_tr[1]` | "weil gelince …" → `**weil** yani çünkü gelince **habe** en sona gider: **weil ich nicht geschlafen habe**.` |
| pt:seit `kurallar_tr[3]` (yeni) | `Bir haftadır demek için **einer** gelir: **seit einer Woche**.` Kalıpta 6 kural oldu. |

weil kararı: pt:ich-moechte'de kaldırıldı (madde onsuz da tam). Öbür ikisinde bilgi gerekli olduğu için anlamı yanında verildi.

`npm run content:validate` → 0 hata. `npx vitest run content/tools` → 10/10.
