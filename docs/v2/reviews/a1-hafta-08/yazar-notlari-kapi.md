# A1 8. hafta: hafta kapısı bulgularının kapatılması ve hafta sonu testi (yazar)

Araç: hafta kapısı (`content/tools/hafta-kapisi.ts`), 8. hafta. Kalan tek neden "gün dosyası yok: 55, 56". Bu iki gün PM kararını bekliyor.

## 3. Karşı tarafın öğretilmemiş sözcükleri
| yer | önce | sonra |
|---|---|---|
| 52 `prova` n2b | "Schade! Wandern kannst du auch am Sonntag. …" (tr "Yazık! …") | "Ach nein! Wandern kannst du auch am Sonntag. …" (tr "Hay aksi! …") |
| 52 `prova` n4 | "Super! Und danach essen wir zusammen eine Bratwurst." | "Super! Und dann essen wir zusammen eine Bratwurst." (tr aynı) |
| 53 `prova` n4 | "Ich war bei Freunden. Das war lustig." (tr "Arkadaşlarımdaydım. …") | "Ich war bei meiner Familie. Das war lustig." (tr "Ailemin yanındaydım. Çok eğlenceliydi.") |
| 54 sahne b1 `cevapla` | `prompt_de` "Wann nimmt Frau Brandl die Tabletten?" | "Wann soll Frau Brandl die Tabletten nehmen?" + `accepted` sonuna "Sie soll am Morgen und am Abend eine Tablette nehmen." |

Seçenekler ve geri bildirimler yeni cümlelerle uyumlu, değiştirmek gerekmedi. Yeni cümlelerin hiçbiri haftada ikinci kez geçmiyor.

## 4. `gorulmemis-08.json`
`can_do` alanları şöyle bağlandı: g1 → cd:m1:50, g2 → cd:m1:51, g3 → cd:m1:52, g4 → cd:m1:49.

Yeni durumlar (Vils-Apotheke ya da dersteki kişiler yok; bütün `accepted` ve `prompt_de` K(54) içinde):

| durum | can_do | kişi | yer | olay | kalıp |
|---|---|---|---|---|---|
| g5 | cd:m1:53 | kurs öğretmeni (adsız, "die Kursleiterin") | pl:sprachkurs (adı geçmez) | Pazartesi akşamı hafta sonu soruluyor. Cumartesi gezisi iptal oldu, evde kaldın. | … ist ausgefallen. – Ich war … |
| g6 | cd:m1:54 | eczacı (adsız) | istasyonun yanında bir eczane | Öksürük tableti bitmiş, yarın gelecek. Ayırtmasını iste, ne zaman alacağını sor. | Können Sie … reservieren? – Wann soll ich … nehmen? |

- Derste tren, otobüs ve kurs iptal oluyor. Gezinin (Ausflug) iptali derste yok.
- Her iki durumda 12 `accepted` var. En kısa cevaplar `ruleVerdict` ile `correct`.

## 5. `hafta-sonu-testi-08.json` (12 madde)
| madde | tür | can_do |
|---|---|---|
| t01 | listen_and_respond: randevu cumaya, 10.30'a alınıyor | cd:m1:50 |
| t02 | gap: Dann nehme ich … | cd:m1:51 |
| t03 | tr_de: Dann nehme ich ein halbes Kilo Äpfel. | cd:m1:51 |
| t04 | listen_and_respond: Was hast du am Samstag vor? | cd:m1:52 |
| t05 | order: Ich hole am Freitag Bargeld. | cd:m1:52 |
| t06 | guided_response: antrenman iptal oldu, gölde olmak | cd:m1:53 |
| t07 | gap: Stimmt so | cd:m1:53 |
| t08 | transform: Ich habe eine Bratwurst gegessen. | cd:m1:53 |
| t09 | listen_and_respond: damlaları ayırtmak | cd:m1:54 |
| t10 | order: Wann soll ich die Tropfen nehmen? | cd:m1:54 |
| t11 | listen_and_respond: yalnız nakit geçiyor, Bargeld çekmek | cd:m1:52 |
| t12 | guided_response: telefonda Es geht um meinen Termin am Freitag | cd:m1:50 |

- Karışım: 4 dinleme, 5 kurma (2 gap, 2 order, 1 transform), 3 konuşma (1 tr_de, 2 guided_response). Türler karışık sırada.
- Her maddede `accepted` ≥ 3. `gap` maddelerinde doğru cevap `opts` içinde. `order` parçaları ilk cevabın kelimeleri. `audio_de` içinde yer tutucu yok. Bütün cümleler K(54) içinde. 55. ve 56. günlerin tabloda kartı ve dersi yok.
- Aynı cümle taraması: testin hiçbir Almanca cümlesi 50.–54. günlerde birebir geçmiyor.

## Sınama
- `hk.sh 8`: Öğretilmeden istenen 0 · anlaşılmayan karşı soru 0 · hafta sonu testi %100 (12/12) · görülmemiş 6/6 · sınanmayan can_do: yok. Kalan tek neden "gün dosyası yok: 55, 56".
- Benzetim (`a1k-h7.json`, 50–54 + gorulmemis-08): Tek hata bilinen "3 kart (4–6)". "Öğretilmemiş" ya da "bilinmeyen" uyarısı yok (AK-3 sayacında 50.–54. günler 0). Dikişte 50.–54. günlerin satırları ihlalsiz. Toplam ihlal tablodan taslak gelen önceki günlerden geliyor.

## Emin olmadığım noktalar
- t10 (order) parçalarıyla kurulabilen tek doğal cümle var. Üç kabul şartı için yazım farkları ve konuşma dilindeki yankı sorusu "Die Tropfen soll ich wann nehmen?" eklendi. 7. haftanın t10 maddesindeki uygulamayla aynı.
- t07'de "Passt so" da gündelik dilde doğru, bu yüzden şıklara konmadı. Şıklar "Stimmt / Ist / Macht".
