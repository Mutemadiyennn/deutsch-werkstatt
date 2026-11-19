# lexicon-m1: dilbilimci incelemesi (yeni alanlar)

- Tarih: 2026-11-19 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-m1.view.jsonl` · Yama: `cm/work/batch-m1.dil.json`
- Kapsam: yalnızca yeni alanlar. 110 kart, 419 `forms` maddesi, 380 eşdizim, 247 örnek fotoğraf sorgusu.
- Düzeltilen kart: **17** · alan düzeyinde düzeltme: **25** (12 `forms`, 3 eşdizim, 4 fotoğraf sorgusu, 5 Türkçe çeviri, 1 örnek cümle)
- Hata oranı: **17/110 kart** (0,15); `forms` maddelerinde 12/419 (0,03)
- `lintpatch.ts`: kart 17, sorunlu 0. Yamadaki `forms` ve örnek çevirileri `textIssues` ile ayrıca denetlendi: 0 sorun.
- `content:validate` çalıştırılmadı: yama parti dosyasına uygulanmadı (görev gereği parti dosyasına yazılmadı).

## Ölçüt

Boşluk, Türkçe çeviriyle birlikte okununca tek cevap vermeli. Fiil, sayı ve soru kelimesi kartlarında cevap kartın kendi kelimesidir. Aşağıdaki maddelerde Türkçe çeviri de ikinci doğru cevabı elemiyordu.

## Hatalar

### `forms`: ikinci doğru cevap

| Kart | Madde | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Tag | 5 | Ich trinke ___ Tag zwei Liter Wasser. [am] → Guten ___! Ich habe einen Termin. [Tag] | **pro Tag** da doğru ve aynı anlamda. |
| lx:Urlaub | 5 | Ich bin ___ Urlaub. [im] → ___ Urlaub schlafe ich lange. [Im] | **in Urlaub sein** de kullanılır; yeni cümlede yalnızca **im** olur. |
| lx:Kilo | 2 | ___ Kilo kostet drei Euro. [Das] → Ich hätte gern ein ___ Kilo Käse. [halbes] | **Ein Kilo kostet drei Euro** da doğru, çeviri ayırmıyor. |
| lx:Minute | 3 | ___ Minute kostet zehn Cent. [Die] → ___ erste Minute kostet nichts. [Die] | **Eine Minute kostet** da doğru. |
| lx:früh | 2 | Heute ___ war ich beim Arzt. [früh] → Ich komme morgen ___. [früh] | **heute Morgen** da bu sabah demek. |
| lx:wie_viel | 3 | ___ kostet die Fahrkarte? [Wie viel] → ___ Zeit haben wir? [Wie viel] | **Was kostet** da doğru. |

### `forms`: Almanca

| Kart | Madde | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Urlaub | 3 | Ich brauche mal ___ Urlaub. [einen] → Ich wünsche dir ___ schönen Urlaub. [einen] | Doğal söyleyiş artikelsiz: **Ich brauche mal Urlaub**. |
| lx:Urlaub | 4 | Ich nehme ___ Urlaub im Mai. [den] → Ich freue mich auf ___ Urlaub. [den] | **den Urlaub nehmen** doğal değil; **Urlaub nehmen** ya da **meinen Urlaub**. |
| lx:erster | 3 | Heute ist der ___. [erste] → Heute ist der ___ Mai. [erste] | Tek başına ayın biri anlamında büyük yazılır: **der Erste**. Küçük harfli cevap yanlış yazım öğretiyordu. |

### `forms`: Türkçe

| Kart | Madde | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:vierzehn | 1 | İki hafta sonra yine buradayım. → On dört gün sonra yine buradayım. | Çeviri **zwei** yazdırıyor; ipucu da buna göre düzeltildi. |
| lx:übermorgen | 2 | Doktor ancak öbür gün yine burada. → … yine burada olacak. | Yarım cümle. |
| lx:essen | 1 | Pilavı severim. → Pilav yemeyi severim. | **essen** çeviride yoktu. |

### Eşdizim

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Tag | Guten Tag sagen → Schönen Tag noch! | Seyrek kalıp; ayrılırken her gün duyulan söz kartın örneğinde de var. |
| lx:spät | zu spät \| çok geç, geç kalmak → zu spät \| çok geç + zu spät kommen \| geç kalmak | **zu spät** tek başına geç kalmak demek değil. |
| lx:Sonntag | sonntags \| pazarları → pazar günleri | İki türlü okunuyor (gün ve alışveriş). |

### Görevde adı geçen kartlar

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Sonntag | tr | pazar → pazar günü | İki türlü okunuyor. Ö2 ve ö4 çevirisi ile lx:elf ö2 çevirisi de **pazar günü**, **pazar günleri** oldu. |
| lx:einundzwanzig | ö3 | Machen Sie einundzwanzig, bitte. → Neunzehn fünfzig? Machen Sie einundzwanzig, bitte. (çeviri: … üstü kalsın) | Bağlamsız cümle anlaşılmıyordu; hesabı yuvarlama sahnesi eklendi, fotoğraf sorgusu yazıldı. |
| lx:neun | ö2 | değişmedi | 089 99998 214 zaten kurgusal aralıkta: Bundesnetzagentur, München (0)89 99998 000–999 (19.11.2026'da sayfadan doğrulandı). lx:null ö1'deki 0171 de ayrılmış mobil aralığın başı. |

### Fotoğraf sorgusu

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:dreißig ö1, lx:siebzig ö2, lx:achtzig ö4 | speed limit NN road sign → round european speed limit NN sign | Eski sorgu Amerikan tipi levha getirir. |

Aynı kart içinde yinelenen sorgu yok. Saat gösteren sorgular cümledeki saatle örtüşüyor.

## Geçmiş biçimler

Modal fiiller, **haben** ve **sein**: `konnte`, `musste`, `durfte`, `wollte`, `sollte`, `hatte`, `war` soruluyor. **möchten** için `wollte`. Değişiklik gerekmedi.

## Kalan şüpheler

- Boşlukların çoğu yalnızca Türkçe çeviriyle tek cevaba iniyor (**ein** ile **der**, **am** ile **jeden**). Çeviri ekranda boşlukla birlikte görünmüyorsa bu maddeler iki cevaplı olur.
- lx:Wochenende 2. ve 4. madde aynı kalıbı soruyor (**ein schönes Wochenende**). Hata değil, yineleme.
- lx:Stunde 4. madde (**Ich nehme die Stunde um acht.**) doğru ama seyrek; bırakıldı.
- lx:fünfzig ö3: **Fünfzig Cent Pfand** ile şişe iade makinesi sorgusu; tek şişe depozitosu 50 sent değil. Örnek eski alan, dokunulmadı.
- Eşdizim Türkçelerinde `…` işareti 7 kartta `textIssues` uyarısı veriyor (lx:also, lx:wo, lx:wie, lx:können, lx:dürfen, lx:wollen, lx:sollen). Eski alan, dokunulmadı.

## Sonuç

**KAPANDI** (yama uygulanınca). `review.status` kararı baş geliştiricide.
