# Dilbilimci fark turu: İÇ-22 (f37405a3), A1 8. hafta

Kapsam: `content/v2/m1/gorulmemis-08.json` → `m1:h08:g1`, `g2`, `g3` (3 madde, 33 accepted). `gun-55.json` ve `gun-56.json` dosyalarında yalnız `sinav_bolumler` eklenmiş; dil denetimi gerekmedi.
Karşılaştırma: `gun-50`…`gun-52` (halkalar, sahne, prova, gun_sinavi).

## Bulgular ve düzeltmeler

| # | madde | önce | sonra | gerekçe |
|---|---|---|---|---|
| 1 | g1 prompt_de | `Restaurant am See, guten Tag! Es geht um den Tisch am Samstag. …` | `Guten Tag, hier ist das Restaurant am See. Es geht um Ihren Tisch am Samstag. …` | Burada arayan restoran. "Restaurant am See, guten Tag!" telefonu açan tarafın kalıbıdır; arayan taraf "hier ist …" der. Masa öğrencinin olduğu için "Ihren Tisch" daha doğal. |
| 2 | g1 accepted | 13 varyant | +3: `Ja, das geht. Also Samstag um halb sieben.` · `Kein Problem. Also Samstag um halb sieben. Danke!` · `Samstag um halb sieben? Ja, das passt. Danke!` | Önce kabul edip sonra saati tekrar eden yaygın sıra listede yoktu. Haksız ret riski vardı. |
| 3 | g2 durum_tr, yer | `Köyün pazarındasın.` / `köyün pazarında meyve tezgâhı` | `Cumartesi pazardasın.` / `pazarda bir meyve tezgâhı` | Wendlfing 18.000 kişilik bir şehir (WORLD.md §1), köy değil. |
| 4 | g2 accepted | 10 varyant | +2: `Gut, dann nehme ich die Äpfel. Zwei Euro fünfzig das Kilo?` · `Dann Äpfel, bitte. Zwei Euro fünfzig?` | Belirli artikelli (öneriye işaret eden) ve kısa sipariş biçimi yaygın; eksikti. |
| 5 | g3 durum_tr | `Komşular cumartesi otobüsle göle gidiyor, seni de çağırıyor.` | `Lena cumartesi komşularla otobüsle göle gidiyor ve seni de çağırıyor.` | Özne uyuşmuyordu: "komşular … çağırıyor". Ayrıca prompt'taki "wir" kelimesinin kimi kastettiği artık açık. |
| 6 | g3 prompt_de | `ich bin Lena, deine Nachbarin.` | `ich bin Lena, deine neue Nachbarin.` | Kendini ilk kez tanıtan biri "neue" der. Durumda da "yeni komşun" yazıyor. |
| 7 | g3 accepted | 10 varyant | +3: `Ja, am Samstag habe ich Zeit. …` · `Gern, ich komme mit! Ich habe aber kein Bargeld dabei. …` · `… Kann ich später zahlen?` | "Zeit haben" ve "kein Bargeld dabei" 52. günde öğretildi (prova n1, s5). Boş olmanın en yaygın söylenişi listede yoktu. "später" 5. günden beri biliniyor. |

## Doğru bulunanlar
- Üç durum kendi can_do'suyla örtüşüyor: g1 yeni saati tekrar edip kabul ediyor (50), g2 başka bir şey seçip fiyatı doğruluyor (51), g3 hafta sonu planını söyleyip nakit sorununa çözüm soruyor (52).
- 50–52. günlerle birebir aynı değiller. g1'de restoran öğrenciyi arıyor; provada ise öğrenci muayenehaneyi arıyordu. g3'te yeni komşu ve göl gezisi var; prova Basti ve maçtı.
- Kalıplar öğretilmiş: Es geht um, Geht … ?, Also … Das geht, Dann nehme ich, nichts vor, kein Bargeld, Kann ich morgen zahlen.
- why_tr cümleleri kısa, terim yok, İngilizce köprü yok. `{name}` yer tutucusu doğru kullanılmış, kişisel bilgi yok.
- accepted sayıları: g1 16, g2 12, g3 13 (hepsi ≥ 3).

## Kalan şüphe (engel değil)
- g2, 51. gün s9'un ("Äpfel habe ich leider nicht mehr" → muz) meyveleri yer değiştirmiş hâline yakın. Fark şu: satıcı öneri yapıyor ve öğrenci fiyatı doğruluyor. Hafta 8'de öğretilmiş meyve sözcükleri yalnız Äpfel ve Bananen. Bu yüzden bağlam başka sözcükle değiştirilemedi.
- g3'te `Kann ich mit Karte zahlen?` bir komşuya sorulunca biraz yapay duruyor. Yine de ödeme yolu soran, dilbilgisi doğru bir soru; reddedilmesi haksız olur. Listede kaldı.

## Doğrulama
- `wtE`: `hafta-kapisi-kos.ts --hafta 8` → **GEÇTİ**, görülmemiş **6/6**, sınanmayan can_do yok, öğretilmeden istenen 0.
- `npm run content:validate` → 0 hata.
- JSON biçimi (2 boşluk, ensure_ascii=False) korundu.

## Sonuç
**DÜZELTİLDİ-ONAY.** 7 bulgu / 3 madde. Diff: 16 ekleme, 8 silme.

## 2. fark turu (inceleme P1-2: g2 51. günle aynı yer ve cevap)

Kapsam: `git diff HEAD`. g2 yeniden yazıldı: istasyon büfesi, kahve bitmiş, su öneriliyor. Ayrıca `gun-51.json` içinde m1:51:v1:c1 ve m1:51:s9 kabul listelerinden birer satır ("Okay, dann nehme ich …") çıkarıldı.

**g2 denetimi**
- Yeni durum 51. günle örtüşmüyor. 51. günde pazar ve fırın vardı, cevaplar meyve ve ekmekti. Burada istasyon büfesi, kahve ve su var. Kaffee (7. ve 53. gün) ve Wasser (51. gün) biliniyor. "Kahve almak istedim ama bitmiş" gerçek hayatta sık yaşanan bir durum. Önceki turdaki "g2 s9'a yakın" şüphesi kapandı.
- `Kaffee habe ich leider nicht mehr.` Kütle adında en doğal söyleyiş "keinen Kaffee mehr". Ama öne alınmış bu biçim konuşmada yaygın ve öğretilen kalıbın aynısı (51. gün: "Käse haben wir leider nicht mehr"). Kabul edildi.
- `Das Wasser kostet einen Euro achtzig.` doğru: miktar ölçüsünde -i hâli (einen). Öğrencinin yankı sorusunda "Einen Euro achtzig?" da "Ein Euro achtzig?" da doğal. Konuşmada en yaygını "eins achtzig". Üçü de listede var.
- Türkçe metin (durum_tr, why_tr) doğru ve kısa; terim yok, İngilizce köprü yok. Durum can_do ile örtüşüyor: öğrenci başka bir şey seçiyor ve fiyatı doğruluyor.

**Düzeltme**

| alan | önce | sonra | gerekçe |
|---|---|---|---|
| g2 accepted | 12 | +3: `Gut, dann nehme ich ein Wasser. Eins achtzig, richtig?` · `Dann nehme ich ein Wasser. Ein Euro achtzig, richtig?` · `Dann ein Wasser, bitte. 1,80 Euro?` | "eins achtzig" yalnız "Hier, bitte" ile bitince kabul ediliyordu; "ein Euro … richtig?" ile tam "Dann nehme ich" birlikte yoktu. Rakamla yazılmış fiyat da yoktu (51. günde rakam varyantları listede). |
| g2 why_tr | … diye tekrar edip doğrularsın. | + `Konuşmada kısaca **eins achtzig** da denir.` | Satıcıdan duyacağı en yaygın biçimi tanıtır; dinlemede işe yarar. |

**gun-51 çıkarmaları:** Çıkarılan iki satır dilbilgisi açısından doğruydu. Değerlendirici bu cümleleri listede olmasalar da doğru sayıyor (koordinatör denedi). Bu yüzden haksız ret riski yok. İki listede de ≥ 3 varyant kalıyor (13 ve 12). Onaylandı.

**Doğrulama:** `wtE` → hafta kapısı **GEÇTİ**, görülmemiş **6/6**, sınanmayan can_do yok, öğretilmeden istenen 0. `content:validate` 0 hata verdi. JSON biçimi korundu.

**Sonuç: DÜZELTİLDİ-ONAY.** 2. turda 2 bulgu / 1 madde (+3 satır, 1 satır değişti).
