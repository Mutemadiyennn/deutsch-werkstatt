# Sözlük incelemesi: #58 B6 grup 07

İnceleyen: dilbilimci-ajan. Tarih: 2026-11-19. Yama: `b6-07.dil.json` (lint çalıştırılmadı, baş geliştirici çalıştıracak).

## İncelenen kimlikler (75)

lx:passieren, lx:versuchen, lx:Morgen, lx:richtig, lx:Leute, lx:spielen, lx:jung, lx:gerade, lx:Geld, lx:gleich, lx:Mutter, lx:raus, lx:Mensch, lx:Paar, lx:wieso, lx:lieb, lx:kriegen, lx:erzählen, lx:stimmen, lx:laufen, lx:Recht, lx:suchen, lx:her, lx:holen, lx:natürlich, lx:lange, lx:treffen, lx:stellen, lx:Sache, lx:rufen, lx:dort, lx:weiter, lx:fallen, lx:Ordnung, lx:Problem, lx:vergessen, lx:zeigen, lx:Mädchen, lx:Ding, lx:hin, lx:sorgen, lx:rein, lx:Freund, lx:fühlen, lx:Welt, lx:schaffen, lx:weit, lx:Angst, lx:zusammen, lx:echt, lx:schlafen, lx:Hand, lx:liegen, lx:lang, lx:wahr, lx:Moment, lx:genug, lx:schauen, lx:setzen, lx:sonst, lx:Bruder, lx:Musik, lx:Arbeit, lx:wenig, lx:erinnern, lx:Sohn, lx:sofort, lx:nah, lx:entschuldigen, lx:toll, lx:einmal, lx:passen, lx:letzter, lx:Auge, lx:fertig

## Sonuç

50 kartta yaklaşık 106 düzeltme, 25 kart değişmedi. Almanca dilbilgisi hatası (artikel, çoğul, Perfekt, aux) bulunmadı. Sonuç: AÇIK (aşağıdaki iki nokta baş geliştiricinin kararını bekliyor).

## Düzeltme türleri

| Tür | Sayı |
|---|---|
| `forms` (yeni madde, değişen boşluk, çeviri, ipucu) | 22 |
| `mistakes_tr` | 19 |
| `exp` (tek fikir, eksik anlam, Türkçesi olmayan kalın ifade) | 25 |
| kart `tr` | 8 |
| `coll` çevirisi | 8 |
| örnek çevirisi | 24 |

## İçerik hataları (önce → sonra)

- lx:wahr `mistakes_tr`: tek başına **nicht?** yanlış deniyordu. Bu doğru Almancadır. → **eine wahr Geschichte** / **eine wahre Geschichte**.
- lx:rein `mistakes_tr`: **Komm in!** İngilizce köprüsüydü. → **Komm drinnen!** (içeri ile içeride karışması).
- lx:gerade `mistakes_tr`: **Ich bin essen gerade** İngilizce köprüsüydü. → **Ich gerade esse** (Türkçe söz dizimi).
- lx:Hand `mistakes_tr`: **Meine Hand ist Schmerz** gerçek bir hata değildi. → **Meine Hand ist weh**.
- lx:Hand `forms`: **Mir tut ___ Hand weh** boşluğuna **meine** de giriyordu. → boşluk **Hand** oldu.
- lx:holen `forms`: **Er ___ schnell einen Arzt** boşluğuna **ruft** daha doğal giriyordu. → **Anna ___ die Getränke aus dem Keller**. **ab** maddesinin ipucu **ich/hole** anlatıyordu, **abholen** anlatır oldu.
- lx:Recht `forms`: cevap **recht** idi, **Recht** da doğru yazımdır. → boşluk **haben** oldu, yazım notu `ipucu_tr` içine girdi.
- lx:wenig: hata notu çok az için **sehr wenig** diyor, madde **viel zu wenig** için de çok az diyordu. → **viel zu wenig** gerekenden çok az; **nur wenige Leute** birkaç kişi değil az sayıda kişi.
- lx:rein, lx:echt: aynı kartta **reine**/**reiner** ve **echtes**/**echtem** açıklamasız duruyordu. → ipucu **aus** ile değiştiğini söylüyor.
- lx:Geld `mistakes_tr`: **keine Gelder** → **nicht Geld** (daha gerçek hata).
- lx:stellen `mistakes_tr`: **Ich mache eine Frage** → **Ich frage eine Frage** (soru sormak kalıbından).
- lx:kriegen `coll`: **Besuch kriegen** misafir ağırlamak → misafiri gelmek.

## OD-9 düzeltmeleri

- `anlam_tr` içinde iki ayrı anlam: gerade, gleich, her, Recht, laufen, weit, setzen, sonst, erinnern, sorgen, echt, spielen. İkinci anlam `ipucu_tr` içine taşındı.
- `tr` içinde açıklaması olmayan anlam: richtig, lieb, treffen, Sache, fallen, schauen, nah, toll, einmal, fertig için ipucu eklendi; rein, sonst, richtig, setzen için `tr` daraltıldı.
- Kart çevirisinde ek: versuchen. Çift okunan söz: suchen (`aramak`), `yakında` (suchen örnek 1, nah hata notu).
- Türkçesi olmayan kalın ifade: hin, wahr, echt `ne_zaman_tr`; Moment hata notu.
- Tek ek farkında neden eksikti: Mutter, Sohn, Welt, echt, vergessen, nah, Mensch.
- Aynı Almancaya farklı Türkçe ve belirsiz özne: Leute, jung, Mensch, Paar, kriegen, erzählen, stimmen, laufen, her, lange, zusammen, liegen, Bruder, Welt, gerade.
- Az maddeli kartlara madde eklendi: gerade (2 → 4), dort (2 → 4), rein (2 → 3), wahr (2 → 4), her (3 → 4).

## Lex'in sorularına yanıt

- `lx:Recht`: **recht haben** ve **Recht haben** ikisi de geçerli, önerilen küçük harf. Örnekler küçük harfle kaldı.
- `lx:Moment` açıklaması: doğru (gizli **warten Sie**), Türkçesi eklenerek yeniden yazıldı.
- `lx:einmal` `parcalar`: **ein** + **mal** = bir + kez anlamı veriyor, kalabilir.
- `lx:spielen` örnek 3: **Unser Verein spielt heute, oder?** doğru ve doğal, gerçek kulüp adı yok.
- Fotoğraf sorguları: yanıltıcı olan bulunmadı.

## Açık noktalar

1. Eş anlamlının da girdiği boşluklar yamayla çözülemiyor, çünkü `forms` tek `answer` taşıyor: `lx:kriegen` (bekomme, bekommst, bekommen), `lx:lange` (konuşmada **lang**: **Wie lang muss ich warten?**), `lx:Moment` (**Im Augenblick**), `lx:toll` (**super**), `lx:einmal` (**schon mal**), `lx:gleich`/`lx:sofort` (**Ich komme ___**, **Kommen Sie bitte ___**), `lx:dort` (**da**). Çeviri ve ipucu kartın kelimesine yönlendiriyor; denetleyici tam eşleşme arıyorsa doğru cevap reddedilebilir. Öneri: bu maddelere kabul edilen ikinci cevap alanı.
2. `lx:raus` **Morgen muss ich früh ___**: çeviri erken kalkmak olduğu için **aufstehen** de akla gelir; ipucu **raus** diyor, madde bırakıldı.
3. `lx:liegen` Perfekt **hat gelegen** standarttır; Bavyera'da **ist gelegen** duyulur. Karta not eklenmedi (kaynaklı Bairisch notu gerekir).
