# Dilbilimci raporu: #58 B4 kart kuralları, grup 02

Sonuç: KAPANDI (lint ve doğrulayıcı çalıştırılmadı; baş geliştiricide).

## İncelenen kimlikler (50)
lx:Typ, lx:Tür, lx:Unfall, lx:Unterricht, lx:Verein, lx:Verspätung, lx:Wort, lx:abnehmen, lx:anfangen, lx:ankommen, lx:anprobieren, lx:anrufen, lx:arm, lx:aufstehen, lx:ausgeben, lx:auspacken, lx:ausschlafen, lx:aussteigen, lx:bald, lx:bedeuten, lx:bereit, lx:bestellen, lx:bestimmt, lx:billig, lx:dran, lx:draußen, lx:drin, lx:egal, lx:eigentlich, lx:einkaufen, lx:falsch, lx:fast, lx:feiern, lx:fernsehen, lx:frei, lx:frühstücken, lx:gefallen, lx:geradeaus, lx:gesund, lx:gewinnen, lx:geöffnet, lx:gratulieren, lx:heiraten, lx:heiß, lx:hell, lx:hilfsbereit, lx:hoffen, lx:kaputt, lx:kaufen, lx:klingen

## Düzeltmeler: 17 kartta 33 düzeltme
Lex'in B4 yamasındaki `forms`, yeni eşdizimler, değişen hata notları ve fotoğraf sorgularında Almanca hata bulunmadı. Düzeltmelerin tamamı aşağıdaki türlerde.

| Tür | Sayı | Kartlar |
|---|---|---|
| Telefon anlamında aramak → telefon etmek (`tr`, örnek çevirisi, `exp`) | 10 | lx:anrufen (`tr`, örnek 1-4, `exp` anlam ve ne zaman), lx:abnehmen (örnek 3), lx:egal (örnek 2), lx:falsch (örnek 1) |
| İpucu komşu kelimeyi anlatıyordu, kartın kelimesine çevrildi (`exp`) | 6 | lx:anrufen, lx:bedeuten, lx:draußen, lx:egal, lx:heiraten, lx:kaufen |
| Aynı Almancaya farklı Türkçe | 7 | lx:klingen (**Klingt gut!** üç ayrı karşılık: örnek 3, örnek 4, ipucu), lx:bestimmt (**etwas Bestimmtes**: `tr` ve ipucu), lx:Wort örnek 1 (lx:bedeuten örnek 1 ile aynı cümle), lx:gefallen örnek 1 (**Wohnung** daire) |
| Tırnak (OD-9) | 2 | lx:Wort örnek 4 (cümle değişti), lx:bedeuten örnek 4 |
| Eşdizim kartın kelimesini kullanmıyordu ya da kartla çelişiyordu | 3 | lx:fernsehen (**Was kommt im Fernsehen?** çıktı), lx:kaufen (**einkaufen gehen** çıktı), lx:Wort (**mit anderen Worten** hata notundaki **Wörter** kuralıyla çelişiyordu) |
| Çeviri eksik ya da kartın anlamından uzak | 2 | lx:Unfall örnek 3 (**nur** çevrilmemişti), lx:ankommen örnek 3 (orada olurum → varırım) |
| Hata notunda doğru biçim kartın kelimesini içermiyordu | 1 | lx:falsch (**Das stimmt nicht** → **Du liegst falsch**) |
| Parça çipleri anlam vermiyordu | 1 | lx:ausgeben (dışarı + vermek, harcamak çıkmıyor; `parcalar` boşaltıldı) |
| İki yazım farkı açıklanmamıştı | 1 | lx:arm (küçük harf notuna **der Arm** kol eklendi) |

## Açık noktalar
- lx:Typ: `forms` içinde **den Typen**, **einen Typen**, **dem Typen** biçimleri kullanılıyor. Adam anlamında konuşma dilinde yaygın ve kabul edilen biçim; yazı dilinde **den Typ** de doğru. Yanıt denetimi **Typ** yazanı reddediyorsa haksız ret olur (boşluklar tanımlık istediği için şimdilik risk yok).
- Tanımlık boşluklarında (lx:Typ, lx:Unfall, lx:Unterricht, lx:Verein, lx:Verspätung) Almanca cümle tek başına iki tanımlığı da kaldırıyor (**den** ya da **einen**, **die** ya da **meine**); tek doğruyu Türkçe çeviri belirliyor. Çeviri öğrenciye gösterilmiyorsa bu boşluklar belirsiz kalır.
- lx:billig, lx:gesund, lx:kaputt, lx:geradeaus: bazı boşluklara eş ya da karşıt anlamlı kelime de girer (**günstig**, **teuer**, **links**); yine Türkçe çeviri belirliyor.
- lx:anrufen, lx:heiraten: akraba eşdizim (**zurückrufen**, **verheiratet sein**) dört gerçek eşdizimin yanında bırakıldı; lx:heiraten hata notu **verheiratet** biçimine dayanıyor.
- lx:anrufen, lx:anfangen, lx:bedeuten, lx:feiern, lx:gefallen, lx:gewinnen, lx:heiraten, lx:hoffen, lx:kaufen, lx:klingen fiil kartlarında `forms` yok (B4 görevi yalnızca isimleri kapsıyordu).
- Öznesi düşmüş çeviriler (**Er**, **Sie** için adsız Türkçe cümle; lx:Typ örnek 2, lx:heiraten örnek 2, lx:ausgeben ve lx:gratulieren boşlukları) doğal Türkçe olduğu için bırakıldı; okur özne isterse **Adam**, **Kadın** eklenebilir.
- lx:klingen `tr` içindeki **gibi duyulmak** yapay duruyor; kart çevirisi görev dışı olduğu için dokunulmadı.
