# B5 fotoğraf seçimi (M1, #58 B5) ve A10 kısa sorgular

Kaynak: `m1-foto` sürümündeki A10 adayları (Wikimedia Commons; yalnızca CC0, kamu malı, CC BY, CC BY-SA). Ölçüt: PM'in 19.11 kararı. Kötü fotoğraf, fotoğrafsız karttan kötüdür; fotoğraf kelimeyi tek bakışta gösterir. Okunur yazı, marka ve filigran olmaz. Eski tarama, çizim ve belge reddedilir. Tanınabilir kişi ancak nötr bağlamda olur; soyut anlamda fotoğraf zorlanmaz.

## Yöntem
- Her sorgunun adayları yan yana tek sayfada `qa` ajanına (Opus) gösterildi. Ajan kartın kelimesine ve örnek cümlesine göre karar verdi; iki ajan sorguları yarı yarıya böldü.
- Seçilen 55 fotoğraf ayrıca baş geliştirici tarafından toplu sayfada gözle kontrol edildi.

## Sonuç
| | Sayı |
|---|---|
| Sorgu (toplam) | 425 |
| Adayı olan | 296 |
| Fotoğraf seçilen | **55** |
| Reddedilen (`aday: null`) | 241 |
| Adayı olmayan | 129 |
| Kısa ikinci sorgu yazılan | 117 |
| Soyut (fotoğraf yok) | 12 |

**Ret nedenleri** (241; ana nedene göre):
- eski tarama, çizim ya da belge: 106
- okunur yazı, marka ya da filigran: 68
- kelimeyi göstermiyor ya da teknik sorun: 50
- siyasi, askerî, çocuk ya da özel bağlam: 12
- yanlış ülke ya da dönem: 4
- soyut: 1

**Seçilenlerin lisansı:** CC BY-SA 27, CC BY 16, kamu malı 6, CC0 6.

## Dosyalar
- `content/v2/media/foto/secim.json`: anahtar A10'daki yer kimliği (`kart#ornekN`; birden çok yer virgülle). Değer: `sorgu`, `aday` (Releases dosya adı ya da `null`), `neden_tr`.
- `content/v2/media/foto/kisa-sorgu.json`: adaysız sorgular için 2–3 kelimelik İngilizce ikinci sorgu (`sorgu`, `eski`) ya da `soyut: true`. Openverse aramasıyla (PM kararı) ANA'nın hattında kullanılır. Reddedilen 241 sorgu için kısa sorgu sonraki adım.

## Açık noktalar
- Hedef (somut kelimelerin %85'inde kabul edilmiş fotoğraf) bu kaynakla tutmuyor. Openverse adaylarından sonra yeniden ölçülecek.
- `lx:passen#2#ornek1` satırında A10 bağlamındaki `tr` kartla uyuşmuyor ("bedenine olmak"); sorgu kartın şimdiki örneğine göre yazıldı.
