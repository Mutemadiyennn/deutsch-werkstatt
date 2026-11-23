# İÇ-19 — grammar.json İngilizce köprü temizliği (dilbilimci incelemesi)

**Sonuç: DEĞİŞİKLİK → düzeltildi** (ilk turda 4 girdi; okur GERİ'sinden sonra 3 girdi daha, toplam 7; bkz. "Fark (okur GERİ)")

- İncelenen: 23 girdi (`content/v2/registry/grammar.json`, yalnız `tr` alanı), commit ebf1b16 üzerinde, 2026-11-23.
- Denetim: eski/yeni `tr` metinlerindeki tırnaklı parçalar karşılaştırıldı. Düşen parçaların hepsi İngilizce ('through', 'around', 'although', 'both … and', 'neither … nor', 'If I had known …', 'the more …, the better', 'while', 'whereas', 'as long as'). **Almanca hiçbir parça değişmemiş.** `tr` dışında değişen alan yok.
- Kalan İngilizce: 23 girdinin hiçbirinde İngilizce kelime ya da "İngilizce" sözü kalmamış.
- `npm run content:validate` → 0 hata (grammar.json için uyarı yok).

## Sorulan karşılıkların denetimi
| girdi | ifade | karar |
|---|---|---|
| a1-01:t2 | “olmak” fiili; 'Ich bin Tim.' = “Ben Tim'im.” | doğru (özel ad + kesme işareti + ek doğru) |
| a1-02:t5 | 'Ich bin dreißig (Jahre alt).' = “Otuz yaşındayım.” | doğru, doğal |
| a2-12:t3 | (Faturayı ödemeyi unuttum.) | doğru |
| a2-12:t3 | 'zu' mastarın hemen önündedir | doğru; girdideki bütün zu-mastarları (bezahlen, kaufen, arbeiten, lernen, essen, regnen, bestellen) ayrılmayan fiil, çelişki yok. Not aşağıda |
| b1-11:t1 | Türkçedeki “ne kadar … o kadar” yapısıdır | doğru; başlık (h_tr) ve örnek çeviriyle tutarlı |
| b1-02:t4 | Edat cümlenin sonuna kalmaz, zamirin önüne gelir | **düzeltildi** (aşağıda) |
| a2-12:t2 | Dikkat: burada 'wenn' deme | **düzeltildi** (aşağıda) |

## Düzeltmeler (eski → yeni)

1. **gr:a2-12:t2**
   - eski: “Dikkat: burada 'wenn' deme; 'wenn' koşul ya da zaman bildirir …”
   - yeni: “Dikkat: 'ob' yerine 'wenn' deme; 'wenn' koşul ya da zaman bildirir …”
   - gerekçe: “İngilizcedeki *if* yüzünden” silinince “burada” bir şeye bağlanmıyor. Uyarının özü ('ob' ile 'wenn' karışmasın) açıkça yazıldı.

2. **gr:b1-02:t4**
   - eski: “Edat cümlenin sonuna kalmaz, zamirin önüne gelir: 'die Serie, über die alle sprechen'.”
   - yeni: “Edat sona bırakılmaz, ilgi zamiriyle birlikte yan cümlenin başında durur: 'die Serie, über die alle sprechen' (herkesin konuştuğu dizi).”
   - gerekçe: “cümlenin sonuna kalmak” Türkçede aksak (“sonda kalmak / sona bırakılmak” olur). Ayrıca “zamirin önüne gelir” aynı girdinin ilk cümlesini tekrarlıyordu. Yeni cümle eski uyarının özünü koruyor ("edatı sona bırakamazsın"), konumu da söylüyor ve örneğin Türkçesini veriyor.

3. **gr:a2-13:t5**
   - eski: “Yıldan önce 'in' KULLANILMAZ: …”
   - yeni: “Türkçede “1998'de” deriz, ama Almancada yıldan önce 'in' KULLANILMAZ: …”
   - gerekçe: İngilizce gerekçe silinince uyarı nedensiz kalmıştı. Türkçe konuşanın asıl yanlışı bulunma eki “-de”yi 'in' ile karşılamaktır. Uyarının kaynağı artık Türkçeye bağlı.

4. **gr:b1-02:t2**
   - eski: “… özne 'ich'. Almancada ilgi zamiri ASLA düşmez.”
   - yeni: “… özne 'ich'. Türkçede böyle bir zamir yoktur (“dün izlediğim film”), ama Almancada ilgi zamiri ASLA düşmez.”
   - gerekçe: Silinen İngilizce karşılaştırma, uyarının nedenini taşıyordu (zamiri düşürme alışkanlığı). Türkçe konuşan için asıl risk aynıdır: Türkçede ilgi zamiri yoktur. Nedeni Türkçe üzerinden geri kondu.

## Fark (okur GERİ)
Kaynak: `docs/v2/reviews/okur/ic19-kopru.md`, 4 GERİ (a1-09:t1, a2-11:t3, b1-02:t2, b1-12:t2). Okur, yukarıdaki düzeltmelerle eşzamanlı okudu. Yalnızca `tr` değiştirildi; Almanca örnekler aynı. Tek istisna: a1-09:t1'deki parantez içi terim istenerek çıkarıldı. Sonrasında `content:validate` → 0 hata.

5. **gr:a2-11:t3** (obwohl: engel ile sonucun yeri)
   - eski: “Farkı şu: 'weil' bir sebep verir, 'obwohl' ise beklenmeyen bir sonuç: 'Wir gehen spazieren, obwohl es regnet.'”
   - yeni: “Farkı şu: 'weil' bir sebep verir; 'obwohl' ise bir engel, yani normalde ana cümledeki şeyi önleyecek bir durum verir. Beklenmeyen sonuç ana cümlededir: 'Wir gehen spazieren, obwohl es regnet.'”
   - gerekçe: Eski eşleştirme, beklenmeyen sonucun 'obwohl'un arkasına konacağını düşündürüyordu. Doğrusu şu: 'obwohl' cümlesi engeli taşır, sonuç ana cümlededir.

6. **gr:b1-12:t2** (während / solange ayrımı)
   - eski: “Karıştırma: 'während' iki olayın aynı ANDA olduğunu, 'solange' aynı SÜRE boyunca devam ettiğini vurgular; 'bis' ise bir sınıra kadar demektir (b1-04).”
   - yeni: “Karıştırma: 'während' yalnızca iki olayın aynı zamanda olduğunu anlatır; 'solange' ise bir durum sürdükçe öbürünün de süreceğini, yani bir koşulu anlatır: o durum bitince öbürü de biter. 'bis' ise bir sınıra kadar demektir (b1-04).”
   - gerekçe: “aynı anda / aynı süre” okura aynı şey gibi geliyordu. Ayırt edici olan koşul anlamıdır.

7. **gr:a1-09:t1** (açıklanmamış terim)
   - eski: “Asıl fiil mastar hâliyle cümlenin SONUNA gider (Satzklammer): …”
   - yeni: “Asıl fiil mastar hâliyle cümlenin SONUNA gider: …”
   - gerekçe: Terim A1'de açıklanmıyor; cümle onsuz da tam.

8. **gr:b1-02:t2** (4. düzeltmenin üstüne küçük ek)
   - eski: “… ama Almancada ilgi zamiri ASLA düşmez.”
   - yeni: “… ama Almancada ilgi zamiri ASLA atlanmaz.”
   - gerekçe: Okur “düşmez” sözünün ne demek olduğunu tek okumada anlayamadı. Dayanak (Türkçede ilgi zamiri yok) 4. düzeltmede zaten eklenmişti.

Güncel hata oranı: 7 girdi / 23 (b1-02:t2 iki kez dokunuldu, girdi olarak bir kez sayıldı).

## Değiştirilmeden onaylananlar (16)
a1-01:t2, a1-02:t5, a2-10:t1, a2-12:t1, a2-12:t3, b1-01:t1, b1-02:t1, b1-05:t1, b1-06:t3, b1-07:t1, b1-07:t2, b1-08:t4, b1-09:t1, b1-09:t3, b1-11:t1, b1-12:t1. Bu girdilerde silinen İngilizce yalnızca var olan Türkçe karşılığı yineliyordu. Kaybolan bilgi yok. Kalan metin doğal ve A2/B1 okuruna açık.

## Kalan şüpheler / takip (engel değil)
- gr:a2-12:t3: “'zu' mastarın hemen önündedir” cümlesi ayrılabilen fiillerde geçerli değil ('anzurufen', 'aufzuräumen'). Bu girdinin örneklerinde böyle bir fiil yok, çelişki de yok. Kural eski metinde de böyleydi. Ayrılabilen fiil + zu ileride öğretilirken orada açıklanmalı. Takip işidir.

Hata oranı: 7/23 (ilk tur 4, okur GERİ sonrası +3).
