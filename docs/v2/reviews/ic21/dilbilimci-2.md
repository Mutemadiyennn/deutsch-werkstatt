# İÇ-21 A1 seviye tespiti havuzu: dilbilimci, fark turu (2. tur)

Yalnız 1. turdan sonra gelen değişikliklere baktım: gr:a1-04:t5 muafiyeti, okuma çekirdeği ve okur geri dönüşü (`okur-1.md`) üzerine yeniden yazılan 7 `why_tr` ile m002'nin `situation_tr`'si.

## Bakılanlar
- **Muafiyet, gr:a1-04:t5.** Bu dil noktası ilan kısaltmalarını (Zi., Kü., Blk., NK, Kaltmiete/Warmmiete) öğretiyor, yani bir okuma becerisi. Muaf saymak doğru. Etiket m1:26:s1, s2, s9 ve s10'dan silinmiş. Her maddede başka bir etiket kalıyor (gr:a1-13:t3, gr:a1-04:t4, cd:m1:26), boş madde yok. Bu, 1. turdaki kalan şüpheyi kapatıyor.
- **Okuma çekirdeği.** a1o:o2:03 gerçekten bir ilan maddesi: iki daire ilanı arasından "3 oda, en fazla 900 €" koşulunu karşılayanı seçmek. a1o:o3:04 bir durak duyurusu. İkisi de okuma bölümünden.
- **why_tr (7 madde).** Almancası ve Türkçesi doğru, sade. "halb zwölf: on ikiye yarım saat var" doğru. "neunzehn + hundert + achtzig = 1980" doğru. "waschen'in sonu düşer, wasch kalır" doğru. Hausarzt = Haus + Arzt doğru. m007'deki "2000'den sonra yıl tausend ile okunur" ifadesi grammar.json'daki ders cümlesiyle aynı; kabul edilebilir. İngilizce köprü, terim ve "…" yok.

## Düzeltmeler (2)
1. **gr:a1-04:t5, neden_tr.**
   - Önce: "… (kısaltmalar, ilan düzeni). … okuma çekirdeğindeki ilan maddesi (a1o:o2:03) ölçer."
   - Sonra: "Ev ilanı okumak bir okuma becerisidir: ilanın düzeni, oda sayısı, kira, kısaltmalar. Üretim maddesiyle ölçülmez. Okuma çekirdeğindeki ilan maddesi (a1o:o2:03) ilanı okumayı ölçer; kısaltmalar (Zi., NK) o maddede yok."
   - Gerekçe: a1o:o2:03'ün ilanları kısaltmasız yazılmış ("2-Zimmer-Wohnung", "Miete: 750 Euro warm"). Eski gerekçe kısaltmaların da bu maddede ölçüldüğünü ima ediyordu; bu doğru değil. Yeni metin neyin ölçüldüğünü dürüstçe söylüyor.
2. **tespit:a1:m002, situation_tr.**
   - Önce: "Cumartesinin olmadığını söyle."
   - Sonra: "Cumartesinin sana uymadığını söyle."
   - Gerekçe: "cumartesinin olmadığı" Türkçede "cumartesi diye bir gün yok" gibi okunuyor. Kastedilen, cumartesinin uymaması; bu Almancadaki "Samstag geht nicht" ile de örtüşüyor.

## Açık kalanlar (takip, engel değil)
- Kısaltmaları gerçekten ölçen bir okuma maddesi (Zi./NK) şimdilik yok. Çekirdeğe ya da denemeye böyle bir madde eklemek ayrı bir iş.
- 1. turdaki kaynak bulguları (dilbilimci-1.md §b) olduğu gibi duruyor.

## Doğrulama
`npm run content:validate` → seviye tespiti havuzu 446 madde, **0 hata**. Uyarı yalnız 3 muaf dil noktası (dn:sesli-kurma, dn:kaydet-dinle, gr:a1-04:t5). Okunur döküm yenilendi.

SONUÇ: ONAY
