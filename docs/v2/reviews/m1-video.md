# Dil incelemesi: M1 gerçek video dosyaları (ikinci tur)

- Dosyalar: `content/v2/m1/video/gun-01.json` … `gun-07.json` (yedisi de yeniden yazılmış hâliyle)
- İnceleyen: dilbilimci-ajan · 2026-11-19
- Kaynak denetimi: yedi dosyanın altı klibi `dib.py goster` ile okundu (web kullanılmadı). Her soru, cevap, `tur`, `basi`, dikte ve gölge turu metne karşı tek tek denetlendi.
- `vcheck.py`: yedi dosya `tamam`. Tur göndermelerinin hepsi kesit içinde, hiçbiri `haric` turda değil.
- İncelenen madde: 118. Düzeltilen madde: 19. Oran 0,16.
- `review.status` yedisinde de `draft` bırakıldı (onay baş geliştiricide).
- **Sonuç: dil hataları KAPANDI.** Aşağıda iki karar baş geliştiriciyi bekliyor (gün 6 süresi, gün 7 yazımı).

## Gün başına karar

| Gün | Klip, kesit | Sorular metne uyuyor mu | Dikte | Özel bilgi | Karar |
|---|---|---|---|---|---|
| 1 | Eva, 1–5 | evet (5/5) | 1, 3: kısa, ön öğretilmiş | yok | düzeltildi, uygun |
| 2 | Jan, 1–8 | evet (5/5) | 1, 3, 7: uygun | yok | düzeltildi, uygun |
| 3 | Harald, 1–14 | evet (5/5) | 12, 13, 3: uygun | 9–10 hariç, telefon dışarıda | düzeltildi, uygun |
| 4 | Eva, 5–16 | evet (5/5) | 15, 5, 13, 16: uygun | 7–12 hariç. 6. turda yalnızca ay var | düzeltildi, uygun |
| 5 | Jan, 1–4 | evet (5/5) | 3, 1: uygun | yok | düzeltildi, uygun (`kisa`, 27 sn) |
| 6 | Eva, 3–10 | evet (5/5) | 3, 9, 7: düzeltmeyle uygun | 4. turda yalnızca ay var | düzeltildi, süre kararı açık (24 sn) |
| 7 | Peter, 1–14 | evet (4/4) | 12, 1, 5, 11: uygun | 7–10 hariç, telefon dışarıda | düzeltildi, uygun |

## Düzeltmeler

### Gün 1
1. `cevapla.ornek_de` öğretilmemiş kalıptı: `Mein Name ist {name}.` Birinci gün sonunda ne **mein** ne **Name** ne **bin** biliniyor. Örnek artık ön öğretilen kalıpla: `Ich heiße {name}.` Öbür üç cevap `accepted` içinde kaldı.
2. `cevapla.why_tr`: **Ich bin** için `ben demektir` yanlıştı, öğretilmemiş iki kalıbı da anlatıyordu. Yalnızca öğretilen kalıbı ve çıplak ad cevabını anlatıyor.
3. `on_ogretim` **du heißt** → **ich heiße Eva, du heißt Eva** (`adım Eva, adın Eva`). Cevap kalıbı böylece önceden öğretiliyor, eşleme de tam.
4. `ortam_tr`: `Kesit` → `Konuşma`.
5. d5 `accepted`: **jetzt** içeren iki doğru cümle eklendi.

### Gün 2
1. d5 `accepted`: ön öğretilen **angekommen** ile iki cümle eklendi. Önceden yalnızca **gekommen** kabul ediliyordu.
2. `cevapla.why_tr`: ayraç içi çeviri yerine düz cümle.
3. Ayrıntı 2 `why_tr`: Almanca söz ve anlamı eklendi (**im August**).
4. `golge`: tek tur vardı, 3. tur eklendi.

### Gün 3
1. `on_ogretim` **ich heiße, du heißt** için `adım, adın` eşlemesi yanlıştı. Gün 1 ile aynı biçime çekildi.
2. Ayrıntı soruları konuşma sırasına dizildi (4, 8, 12, 14).
3. d5 `accepted`: `So um die fünfzig.`, `Er ist fünfzig.` eklendi.
4. `cevapla.accepted`: **ursprünglich** içeren cümle eklendi.

### Gün 4
1. `cevapla.accepted`: `Das ist Blau.` eklendi. Başka hata yok.

### Gün 5
1. Ayrıntı 4 `why_tr`: **okay** için `sorun yok` karşılığı soruya uymuyordu. Açıklama artık **ja** üzerinden.
2. d5 `gorev_tr`: `zorunlu` **halb acht** istiyor, ama görev bunu söylemiyordu. Dakikayla yazılan doğru cevap haksız yere reddedilirdi. Görev artık Jan'ın söyleyişini istiyor.
3. `cevapla.accepted`: tam cümleli dört cevap eklendi.

### Gün 6
1. Dikte 9. turda **hattest** ne öğretilmiş ne ön öğretilmişti. `on_ogretim` öğesi **du hattest, Freunde dabei** oldu (öğe sayısı 6, değişmedi).
2. d5 ve `cevapla` `accepted`: **Geburtstag ist im** kalıbıyla doğru cevaplar eklendi.

### Gün 7
1. Ayrıntı 1 ve 3 `why_tr`: yalnızca Türkçe sonuç yazıyordu. Almanca söz ve anlamı eklendi.
2. `cevapla.why_tr`: üç kalıp anlamsız sıralanıyordu. Yeniden yazıldı.
3. d5 `accepted`: **ursprünglich** içeren iki cevap eklendi.

## Açık kararlar ve doğrulanamayanlar

1. **Gün 6 süresi 24 sn**, 25 sn sınırının altında. 5. tur kesite alınırsa tahmin 26 sn, bilinmeyen oranı yaklaşık 0,07 olur. O zaman bir soru cevapsız kalır, çünkü 6. tur içki yüzünden dışarıda. Dil açısından ikisi de olur, karar baş geliştiricide.
2. **Gün 7, 3. ve 4. tur İsviçre yazımıyla** (çift s). Dikteye girmiyorlar. Ama `golge` ve `cevapla.soru_tur` 3. turu gösteriyor, metin ekranda bu yazımla görünecek. Öneri: gösterimde standart yazıma çevirmek ya da kısa bir not. `vcheck` bu iki kelimeyi bilinmeyen sayıyor, gerçek oran yaklaşık 0,06.
3. **Gün 1 ve gün 7 `cevapla` aynı işi istiyor** (adını söyle). Bağlam farklı (senli ve sizli soru), bu yüzden bırakıldı.
4. **Gün 4 d5** sayıyı harfle istiyor. Bu sayı kelime listesine altıncı günde giriyor, ama dördüncü günün kuralıyla kurulabiliyor. Bırakıldı.
5. Süreler `vcheck` tahminidir (kelime oranı). Gerçek kesit süresi videodan ölçülmedi. Ses kalitesi ve söyleyişin netliği dinlenerek doğrulanmadı, yalnızca yazıdan denetlendi.
6. `dikte_notu` alanı şemada yok. Öğrenciye gösterilecekse ayraç içi çeviriler düzeltilmeli.
