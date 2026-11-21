# A9 klip-06 bölüm düzeltmesi (yazar, 21.11)

Dayanak: `docs/v2/reviews/a9-metin-onay.md` (t7, t8 onaylı altyazı). Değişen tek içerik dosyası: `content/v2/m1/video/klip-06.json`. `review.status` "draft" kaldı.

| Yer | Eski | Yeni | Neden |
|---|---|---|---|
| `turlar` t7 `tr` | Son kez nasıl kutladın? | Doğum gününü en son nasıl kutladın? | Altyazıda artık **deinen Geburtstag** var. |
| `turlar` t8 `tr` | Son kutlama ABD'deydi, büyükanne ve büyükbabamın yanında. … | En son ABD'deydim, büyükannemle büyükbabamın yanında. Pasta ve dondurma vardı, tam Amerikan usulü. | Altyazıda **war ich** var. Türkçe kişili oldu, ön öğretimdeki **büyükannemle büyükbabamın yanında** ile aynı. |
| `dikte` d3 `tur` | 7 | 9 | **deinen** 1–6. günlerin dersinde, kartında ve kalıplarında yok (2. gün dersinde yalnızca **dein** geçiyor). Öğretilmemiş kelime dikte cevabı olamaz. **Geburtstag** 2. günün kartı, sorun değil. Sıra kolay (t10), orta (t9), zor (t9), usta (Jan t2), gerçek: kurala uygun. |
| `dikte` d3 `banka` | gefeiert, Mal, du, Wann, letzte, Wie, das, feiern, hast | Freunde, Hast, dabei, Wann, du, Hattest | Cevabın 4 kelimesi ve 2 çeldirici (**Hast**, **Wann**; ikisi de 2. günde öğretildi, seste ayırt edilir). **dein** yok. |
| `dikte` d3 `accepted` | Wie hast du das letzte Mal gefeiert? (+2 yazım) | Hattest du Freunde dabei? · hattest du freunde dabei · Hattest du Freunde dabei | Eskisiyle aynı mantık: noktalı, küçük harf ve noktasız, büyük harf ve noktasız. `accepted[0]` ön öğretim maddesi **Freunde dabei** ile aynı değil. |
| `golge` | [7, {kesit 1, tur 1}] | [9, {kesit 1, tur 1}] | FORMAT'ta gölge için uzunluk kuralı yok. Gölge öğrenciye cümleyi söyletir, t7'de öğretilmemiş **deinen** var. Tur numarası bölünemiyor. t8'de **es gab**, **Kuchen**, **Eis** öğretilmedi, t10 sözlerin ortasında duraksıyor. Kelimelerinin hepsi bilinen ya da ön öğretilen tek Eva turu t9. |
| `bilinmeyen` | 0,077 · eis, gab, kuchen, usa (4/52) | 0,091 · deinen, eis, gab, kuchen, usa (5/55) | +3 kelime: **deinen** (bilinmeyen), **Geburtstag** (bilinen), **ich** (bilinen). Sınır %10'un altında. |
| `review.notes` | — | A9 notu eklendi | Yukarıdaki gerekçeler. |

Değişmeyenler: `basi` (t7, t8), ön öğretim, ayrıntı soruları, d1, d2, d4, d5, cevapla, kanıt, dikte notu.

Kontrol: `npm run content:validate` → 0 hata, 142 uyarı (önceki sayıyla aynı, klip-06 için yeni uyarı yok; doğrulayıcı klip dosyalarını denetlemiyor). `npx vitest run content` → 7 dosya, 51 test geçti.

Açık konular:
- t9'a artık d2, d3, gölge ve cevapla bağlı. #82 2. turu t9'un yükünü azaltmıştı. Okur bakmalı. Başka seçenek: gölgede yalnız Jan'ın 1. turu kalır.
- **hattest** bilinen listede yok, yalnızca **hatte** var. d2'deki gibi dinleyip yazma görevi olarak bırakıldı, d3 de aynı kelimeyi istiyor.
- Bilinmeyen sayımı elle yapıldı, eski oranın 4/52 olduğu varsayıldı. `metin.json` bu çalışma kökünde yok, COERLL sitesine bu oturumdan erişilemedi. `vcheck` ile yeniden ölçülmeli.
