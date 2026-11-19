# B5 fotoğraf seçimi (M1, #58 B5) ve A10 kısa sorgular

**Kaynak:** `m1-foto` sürümündeki A10 adayları. Çoğu Wikimedia Commons'tan; bir kısmı Flickr ve başka açık havuzlardan, Commons ve Openverse üzerinden geldi.

**Lisans:** yalnızca CC0, kamu malı, CC BY ve CC BY-SA.

**Ölçüt:** PM'in 19.11 kararı.
- Kötü fotoğraf, fotoğrafsız karttan kötüdür.
- Fotoğraf kelimeyi tek bakışta göstermeli.
- Okunur yazı, marka ve filigran olmamalı.
- Eski tarama, çizim, belge ve banknot taraması reddedilir.
- Tanınabilir kişi ancak nötr bağlamda olabilir.
- Yanlış ülke izlenimi (Avrupa dışı trafik, avro olmayan para) reddedilir.
- Soyut anlamda fotoğraf zorlanmaz.

## Yöntem
- Her sorgunun adayları yan yana tek sayfada `qa` ajanına (Opus) gösterildi. Ajan kartın kelimesine ve örnek cümlesine göre karar verdi.
- Seçilenler baş geliştirici tarafından toplu sayfada gözle kontrol edildi.
- Bağımsız inceleme (#91, 1. tur) 15 seçimi daha geri çevirdi: okunur yazı, banknot taraması, yanlış ülke, zayıf temsil. Bunlar `aday: null` yapıldı.

## Sonuç
| | Sayı |
|---|---|
| Yer (toplam `secim.json`) | 308 |
| Fotoğraf seçilen | **40** |
| Reddedilen (`aday: null`, soyut değil) | 220 |
| Soyut ya da sayıya bağlı (fotoğraf yok) | 48 |
| Kısa ikinci sorgu (`kisa-sorgu.json`) | 319 |

**Seçilenlerin lisansı:** CC BY-SA 19, CC BY 12, kamu malı 5, CC0 4.

**Seçilenlerin kaynağı:** Commons 36, Flickr 3, diğer 1.

**Ret nedenleri** (ilk tur, ana nedene göre):
- eski tarama, çizim ya da belge: 106
- okunur yazı, marka ya da filigran: 68
- kelimeyi göstermiyor ya da teknik sorun: 50
- siyasi, askerî, çocuk ya da özel bağlam: 12
- yanlış ülke ya da dönem: 4

İnceleme turunda 15 ret daha eklendi.

## Dosyalar
- **`content/v2/media/foto/secim.json`** (ANA'nın biçimi): anahtar yer kimliğidir (`kart#kart` ya da `kart#ornekN`; birden çok yer virgülle). Değer: `aday` (`adaylar.json` dosya adı ya da `null`) ve `neden_tr`.
- **`content/v2/media/foto/kisa-sorgu.json`** (ANA'nın biçimi): `{ "<uzun sorgu aynen>": "<2–3 kelime>" }`. Adaysız ve reddedilen sorgular içindir; Openverse aramasıyla ANA'nın hattında kullanılır.
  - Yazı isteyen sorgular yazısız nesneye çevrildi: tabela → kapı ya da kepenk, form → masa başı.
  - Kapı numarası ve banknot gibi sayıya ya da tasarım hakkına bağlı sorgular çıkarıldı; o yerler `aday: null`.
  - Saat, takvim ve hız sınırı (`speed limit 30/70/80`) sorgularında seçim sırasında sayının doğruluğu ayrıca denetlenmeli.
  - Aynı kısa sorgu birden çok yere gidiyorsa (`paying cash counter` gibi) seçimde aynı fotoğraf iki yere düşmemeli.
  - İnceleme turunda geri çevrilen 15 yerin bir kısmına da kısa sorgu yazıldı; ikinci turda aday gelir.

## Açık noktalar
- Hedef, somut kelimelerin %85'inde kabul edilmiş fotoğraf; bu kaynakla tutmuyor. Openverse adaylarından sonra B5 ikinci turu yapılacak.
- Doğrulayıcı bu iki dosyayı henüz okumuyor; şema ve denetim ANA'nın A10 hattında.
