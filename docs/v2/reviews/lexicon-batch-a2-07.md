# Sözlük partisi a2-07 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 26 derin kart (A2 tablosu 21. hafta, 142.–145. gün) · dosya: `content/v2/registry/lexicon/batch-a2-07.json`

Okunan alanlar: kart verisi, 87 eşdizim, 156 örnek, 104 boşluk (`forms`), 48 hata notu, `exp`, `also_ok`, `patterns`, `related`, `freqRank`.

Gün ataması `a2-kesin.json` (`om:gun:142`–`145`): 142 Reise–Flughafen (6) · 143 Sehenswürdigkeit–sich_lohnen (7) · 144 Frühstück–auschecken (7) · 145 WLAN–Fernseher (6).

## Sayılar
- Geçti (değişiklik yok): 5 kart (`lx:Ausland`, `lx:Tante`, `lx:Flughafen`, `lx:Museum`, `lx:Natur`)
- Düzeltildi: 21 kart, **49 düzeltme** (8'i yalnız `also_ok` eklemesi, 17'si ipucu kalın parçası)
- Kaldı: 0
- Hata oranı: 49 düzeltme / 26 kart = 1,88 (düzeltme alan kart oranı 21/26 = 0,81)
- `npm run content:validate`: 0 hata, 157 uyarı (bu partiye ait uyarı yok)
- `review`: `draft` (okur bekliyor)

## Düzeltmeler (önce → sonra, gerekçe)

**Almanca ve gerçeklik**
1. `lx:Frühstück` ö4: `Ja, das Frühstück ist im Preis inklusive.` → `Ja, das ist im Preis inklusive.` Cevapta **das Frühstück** tekrarı konuşmada doğal değil.
2. `lx:Aufenthalt` ö6: `… ist eine Ferienwohnung billiger.` → `… ist eine Ferienwohnung oft billiger.` (Türkçesi `çoğu zaman daha ucuz`). Kesin genelleme her zaman doğru değil.
3. `lx:WLAN` 1. hata notu: `**Hat es WLAN?** yanlış` → `Ücretsiz internet derken **kostenlos WLAN** yanlış. Doğrusu **kostenloses WLAN**.` **Hat es …?** İsviçre'de ve güneybatıda "var mı" anlamında doğru kullanım (kural 6); Türkçe konuşana özgü de değil. Yeni not eşdizim 3 ve boşluk 2 ile örtüşüyor: Türkçede sıfat sona ek almadığı için gerçek bir hata.

**Günün dil noktası (144. gün, otel ayırtmak `gr:a2-11:t4`)**: üç kartta günün kalıbını kullanan örnek yoktu.
4. `lx:Aufenthalt` ö5: `– Eine Woche, bis Sonntag.` → `– Eine Woche, vom dritten bis zum zehnten Juli.` (`Bir hafta, 3-10 Temmuz arası.`)
5. `lx:Ferienwohnung` ö2: `Haben Sie im August noch …` → `Haben Sie vom ersten bis zum achten August noch …` (`1-8 Ağustos arası hâlâ …`). Boşluk 2 eski cümleyle kaldı.
6. `lx:auschecken` ö6: `Am letzten Tag checken wir um zehn aus.` → `Wir haben für zwei Nächte gebucht und checken am Sonntag um zehn aus.` (`İki gece için yer ayırttık, pazar günü saat onda çıkış yapıyoruz.`)

**Hata notları**
7. `lx:Preis` 2. not: `Fiyat yüksek derken en doğalı **Der Preis ist hoch** dersin. …` → `Fiyatı pahalı derken **Der Preis ist teuer** denmez. Fiyat **hoch** olur: **Der Preis ist hoch**. …` Eski not bir yanlış göstermiyordu. Türkçedeki "fiyatı pahalı" sözü Türkçe konuşanın gerçek hatası.
8. `lx:Lage` 1. not: `Otelin yeri çok iyi derken` → `Otelin yeri iyi derken` (Almanca biçimlerde **sehr** yok).
9. `lx:Dusche` 2. not: `Kısaca **Ich dusche** dersin.` → `Doğrusu **Ich dusche**.` "Kısaca" yanlış biçimi uzun bir doğru biçim gibi gösteriyordu.

**Türkçe çeviri ve açıklama**
10. `lx:enttäuscht` `anlam_tr`: `… hissettiğin duygudur, yani hayal kırıklığı.` → `… beklediğini bulamamış, yani hayal kırıklığına uğramış demektir.` Kelime duygunun adı değil, kişinin hâli.
11. `lx:enttäuscht` eşdizim 3: `biraz hayal kırıklığı içinde` → `biraz hayal kırıklığına uğramış`.
12. `lx:Halbpension` eşdizim 1: `yarım pansiyon` → `yarım pansiyonlu` (**mit**).
13. `lx:Halbpension` ö5 ve boşluk 3: `Oda yarım pansiyon ne kadar?` → `Yarım pansiyonlu oda ne kadar?`
14. `lx:Ferienwohnung` ö3: `otelden çok daha pratik` → `otelden düpedüz daha pratik` (**einfach**; "çok daha" yoktu).
15. `lx:sauber` ö1: `banyo da öyle` → `banyo da temiz değil` (belirsizdi).
16. `lx:Fernseher` ö5 ve boşluk 3: `Hiç, televizyonun karşısında yatıyorum.` → `Hiçbir şey, sadece televizyonun karşısında yatıyorum.` (**nur** çevrilmemişti).
17. `lx:Handtuch` `anlam_tr`: `yıkandıktan sonra kurulandığın havludur` → `elini yüzünü yıkadıktan ya da duştan sonra kurulandığın havludur`.

**Boşluk ipuçları (kalın parça doldurulmuş cümlede harfi harfine geçsin; a2-05 ölçütü)**
18–34. `lx:Reise` b1, b2, b4 · `lx:übernachten` b4 (`Siz için **ihr übernachtet**` → `Birden çok kişiye sorarken **übernachtet ihr**`) · `lx:Flug` b1 · `lx:Sehenswürdigkeit` b3 · `lx:enttäuscht` b1 · `lx:sich_erholen` b1 · `lx:sich_lohnen` b1, b4 · `lx:Ferienwohnung` b1 · `lx:Lage` b1 · `lx:wechseln` b2 · `lx:Handtuch` b4 · `lx:sauber` b2 (`**ein** ile **das Handtuch** önünde **sauberes** olur` → `Temiz bir havlu derken **ein sauberes Handtuch** denir`), b3 · `lx:Fernseher` b2. Kalın parçalar cümledeki biçime çekildi (ör. **die Reise gebucht** → **die Reise** ve sonda **gebucht**). Betikle sınandı: kalan sapma yalnız açıklayıcı **ge-** (übernachten b2, sich_erholen b2) ve büyük-küçük harf.

**`also_ok` eksikleri (haksız ret riski)**
35. `lx:Eintritt` b2: + **umsonst**.
36. `lx:sich_erholen` b2: + **entspannt**; b4: + **entspannen**.
37. `lx:wechseln` b1: + **tauschen**; b2: + **getauscht** (**das Zimmer tauschen** sık).
38. `lx:sauber` b2: + **frisches** (`lx:Handtuch` eşdiziminde **frische Handtücher** = temiz havlular).
39. `lx:WLAN` b1, b2: + **Internet** (artikel aynı: **das**).

**Sıklık**
40. `lx:Preis` `freqRank`: 3983 → **916**. Listede iki satır var: 916 `preis` (biçim **preis**, 10954) ve 3983 `Preis` (biçim yalnız **preise**, 1382). Lemmatize edici tekili küçük harfle ayırmış; kelimenin asıl satırı tekilin sayısını taşıyan 916. İki satır birleşse sıra yine 900'lerde kalır.

## Görev sorularına cevap
- **İleri gönderme:** 146.+ gün kartları (Werktag, Bescheinigung, Postleitzahl, Benachrichtigung, Zusteller, Filiale ve 148.–149. gün fiilleri) betikle ve elle arandı: yok. Parti içinde bir kart sonraki günün kartına dayanmıyor (Museum ö5 **Eintritt**, Dusche ö6 **sauber**, wechseln ö1 **Handtuch** aynı gün). Präteritum yalnız **war/hatte** (`pt:ich-war` ile öğretildi). **Ich hätte gern** ve **Könnten Sie** 144.–145. günün kendi dersinde ve `pt:ich-haette-gern` / `pt:koennten-sie` kalıbı olarak var; 157. günün yapısı değil. **Lohnt es sich, … zu fahren** 136. günde öğretilen **zu** yapısı. **um … zu**, **damit**, **werden** yok.
- **Günün dil noktası:** 142. gün kartlarının hepsinde **nach/in/zu/bei**, 143. gün kartlarının hepsinde **obwohl**, 145. gün kartlarının hepsinde şikâyet cümlesi var. 144. günde eksik üç kart tamamlandı (4–6).
- **Kalıp bağları:** her bağ kartın kendi kelimesinin geçtiği bir cümlede gerçekten var; kaldırılan yok. **Was kostet** `pt:wie-viel-kostet` kalıbının kendi örneği.
- **WORLD:** **Herr Pichler** (`lx:sauber` ö6) apartman görevlisi; merdiven boşluğunu temiz tutması karakterle uyumlu, tarihli olay yok. **Jonas** WORLD karakteri değil, adsız örnek adı. Öğrencinin ağzında sabit ad ya da cinsiyet yok. Bairisch yok; katmanlar `hd` ve `alltag`.
- **OD-9:** terim, üç nokta, İngilizce köprü yok (tarama 0). Para **avro**, kişi **Pichler Bey** biçiminde.
- **Olgusal iddia:** yok; **FeWo** kısaltması, müzede yiyip içme yasağı, çocuklara ücretsiz giriş genel ve yaygın. `SOURCES.md`'ye satır gerekmedi.

## Değişen Türkçe alanlar (okur için, 35 satır)
- `exp.anlam_tr`: `lx:enttäuscht`, `lx:Handtuch`.
- `mistakes_tr`: `lx:Preis` (2.), `lx:Lage` (1.), `lx:WLAN` (1.), `lx:Dusche` (2.).
- `hint_tr`: `lx:Reise` b1, b2, b4; `lx:übernachten` b4; `lx:Flug` b1; `lx:Sehenswürdigkeit` b3; `lx:enttäuscht` b1; `lx:sich_erholen` b1; `lx:sich_lohnen` b1, b4; `lx:Ferienwohnung` b1; `lx:Lage` b1; `lx:wechseln` b2; `lx:Handtuch` b4; `lx:sauber` b2, b3; `lx:Fernseher` b2.
- Örnek ve boşluk çevirileri: `lx:Aufenthalt` ö5, ö6; `lx:Ferienwohnung` ö2, ö3; `lx:auschecken` ö6; `lx:Halbpension` ö5, b3; `lx:sauber` ö1; `lx:Fernseher` ö5, b3.
- Eşdizim çevirileri: `lx:enttäuscht` (3.), `lx:Halbpension` (1.).

## Kalan şüpheler (düzeltilmedi)
- `tier`: Ausland, übernachten, Museum, sich_erholen, Aufenthalt, Handtuch listede K2 (sıra > 2000), kartta K1. Bütün A2 partileri aynı yolu izliyor (LEX.md `tier:"K1"`); karar baş geliştiricide.
- `lx:Preis` eşdizim **im Preis inklusive**: yaygın ama kuralca **im Preis inbegriffen/enthalten**; günün dersi **inklusive** öğrettiği için kaldı.
- `lx:Sehenswürdigkeit` ö3 **hab ich … am Strand gelegen**: Bavyera'da daha sık **bin … gelegen**; ikisi de doğru.
- `lx:sich_lohnen` 2. not **Das ist wert** yanlış; doğru **Das ist es wert** henüz öğretilmediği için nota eklenmedi.
- `lx:Preis` ö4 **Ist das Ihr bester Preis?** doğru; pazarlıkta **Ist das Ihr letzter Preis?** daha kalıplaşmış.

## Sonuç
Dil açısından bulunan bütün hatalar dosyada düzeltildi, doğrulayıcı 0 hata.

Sonuç: KAPANDI — okur bekliyor
