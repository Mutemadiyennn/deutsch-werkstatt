# Sözlük partisi a2-04 incelemesi (tam tur)

İnceleyen: dilbilimci-ajan · 2026-11-23 · 20 derin kart (A2 tablosu 19. hafta, 129.–131. gün) · dosya: `content/v2/registry/lexicon/batch-a2-04.json`

Okunan alanlar: kart verisi, 80 eşdizim, 120 örnek, 101 boşluk (`forms`), 29 hata notu, `exp`, `also_ok`, `patterns`, `related`.

## Sayılar
- Geçti (değişiklik yok): 5 kart (`lx:Suppe`, `lx:Getränk`, `lx:Regen`, `lx:Wind`, `lx:Gepäck`)
- Düzeltildi: 15 kart, **25 düzeltme** (5'i yalnızca `also_ok` eklemesi)
- Kaldı: 0
- Hata oranı: 15 kart / 20 = 0,75 (15 kartın hepsinde `also_ok` dışında en az bir içerik düzeltmesi var)
- `npm run content:validate`: 0 hata, 146 uyarı (taban 146; bu partiye ait uyarı yok). `content:explain-audit`: partide 49 açıklama, aykırı 0 (`docs/v2/reports/aciklama-tarama.md` eski hâline bırakıldı).
- `review`: `draft` (okur bekliyor).

## Düzeltmeler (önce → sonra, gerekçe)

**Almanca**
1. `lx:Kontrolle` ö1 ve boşluk 1: `Im Zug gibt es heute eine Kontrolle.` → `Im Zug gibt es oft eine Kontrolle.` Kontrolün o gün olacağı önceden bilinmez; cümle gerçek hayatta söylenmez. Türkçesi ve ipucu birlikte değişti.
2. `lx:Ticket` ö5: `ich hab es auf dem Handy` → `ich habe es auf dem Handy`. Katman `hd`, karşıdaki kişi **Sie** diyor; kısaltılmış biçim partinin öteki `hd` satırlarıyla tutmuyordu.
3. `lx:Bahn` eşdizim: `mit der S-Bahn` (banliyö treniyle) → `die Bahn nehmen` (trene binmek). Bileşik kelime eşdizim sayılmıyor (taslak-08 ölçütü); ayrıca 18.000 kişilik şehirde banliyö treni yok. **S-Bahn** `also_ok` içinde kaldı.

**Hata notları ve açıklamalar**
4. `lx:Saft` hata notu: `Fruchtwasser yanlış, o anne karnındaki sudur` → `Meyve suyu derken **Obstwasser** yanlış. Türkçedeki su burada **Wasser** olmaz. Doğrusu **Saft**.` Gerekçe aşağıda (lex sorusu 3).
5. `lx:Tee` 2. hata notu: `Bizim bildiğimiz çay **schwarzer Tee** olur.` → `Bizim bildiğimiz çayın adı **schwarzer Tee**.` Not kaldı, yalnızca son cümle netleşti (lex sorusu 2).
6. `lx:Nebel` hata notu: `**Nebel** kelimesi **der** ile gelir.` → `**bei** gelince **dicht** sonuna **em** alır.` Eski cümle yanlış biçimi (**dichter**) haklı gösteriyor gibi okunuyordu; yeni cümle ne değiştiğini söylüyor.
7. `lx:Grad` 2. hata notu: `Sayıdan sonra da **Grad** kalır` → `Sayıdan sonra **Grad** değişmez`.
8. `lx:Grad` `ne_zaman_tr`: `Hava durumunda, ateşte ya da fırında sıcaklık söylerken.` → `Havanın, ateşinin ya da fırının kaç derece olduğunu söylerken.` "ateşte ya da fırında" yan yana gelince ateş hastalık değil, ocak ateşi diye okunuyordu.
9. `lx:Fahrt` hata notu: `Türkçedeki gibi çok yolculuk denmez.` → `Almancada burada tek yolculuk söylenir.` Eski cümle ne dediği anlaşılmadan okunuyordu; şimdi `ipucu_tr` ile aynı şeyi söylüyor.
10. `lx:Sitzplatz` `parcalar`: **Sitz** → `oturak` → `oturma`. "Oturak" Türkçede tabure ve lazımlık demek.

**Aynı Türkçe söz, kart içinde tek karşılık**
11. `lx:Obst`: `ein Stück Obst` eşdizimde, ö2'de ve boşluk 2'de "bir parça meyve", hata notunda ve `ipucu_tr` içinde "bir meyve" idi. Dördü de "bir meyve" oldu (eşdizim, ö2, boşluk 2 çevirisi ve ipucu). "Bir parça meyve" Türkçede meyvenin bir dilimi diye anlaşılıyor; Almancası bir tane meyve demek.

**Türkçe çeviri**
12. `lx:frisch` ö5: `Evet, bu bu sabahın.` → `Evet, buradaki bu sabah çıktı.`
13. `lx:sauer` eşdizim `sauer werden`: `kızmak` → `kızmak, (süt) ekşimek`. Aynı kartın ö2'si **ist sauer geworden** biçimini "ekşimiş" diye veriyor.
14. `lx:Tee` ö2, boşluk 3 ve ipucu: `Kışın çok yeşil çay içerim.` → `Kışın bol bol yeşil çay içerim.` "Çok yeşil çay" rengi çok yeşil diye de okunuyordu.
15. `lx:Tee` ö3, boşluk 4 ve ipucu: `Hemen ikimize bir çay yapayım.` → `Hemen bize bir çay yapayım.` Almancada **uns** var, iki kişi olduğu yazmıyor.
16. `lx:Schnee` ö3: `her yer kar dolu` → `her yer karla kaplı` ("dolu" ayrıca yağan dolu demek).
17. `lx:Schnee` ö4: `Sizde kar var mı?` → `Sizde şimdiden kar var mı?` (**schon**).
18. `lx:Nebel` ö4: `Neredeyse hiç` → `Neredeyse hiçbir şey` (**Fast nichts**).
19. `lx:Koffer` ö5: `Evet, memnuniyetle` → `Evet, sevinirim`. "Memnuniyetle" yardım edenin sözüdür; burada yardım kabul ediliyor.
20. `lx:einsteigen` ö4: `Garda tabii` → `Gardan tabii` (soru "nereden bindin").

**`also_ok` eksikleri (haksız ret riski)**
21. `lx:sauer` boşluk 3: + **wütend** (**wütend auf mich** doğru).
22. `lx:sauer` boşluk 5: + **wütend**.
23. `lx:Nebel` boşluk 4: + **Nebels** (**Wegen Nebels** yazı dilinin biçimi; yazan öğrenci haklı).
24. `lx:Fahrt` boşluk 1: + **Reise** (öteki dört boşlukta zaten kabul ediliyordu).
25. `lx:Kontrolle` boşluk 1: + **Fahrkartenkontrolle**, **Ticketkontrolle**.

## Görev sorularına cevap
1. **Artikelsiz sıfat çekimleri ve boşluk cevapları:** 101 boşluğun hepsi tek tek çekildi, yanlış çekim yok. Artikelsiz biçimler doğru: **frisches Brot**, **frisches Obst**, **frische Luft**, **frische Milch**, **frischer Saft**, **Saure Äpfel**, **heiße Suppe**, **Kalte Getränke**, **viel grünen Tee**, **bei starkem Regen**, **bei starkem Wind**, **bei dichtem Nebel**, **mit leichtem Gepäck**. Artikelli olanlar da doğru: **Einen schwarzen Tee**, **einen kleinen Koffer**, **Nach einer langen Fahrt**, **mein liebstes Getränk**. `also_ok` eksikleri yukarıda (21–25). Var olanlar doğru: **schlecht**, **böse**, **Teesorten**, **S-Bahn**, **Zugfahrt**, **Reise**, **Karten**, **Platz**, **Plätze**. `lx:Ticket` boşluklarına **Fahrkarte** eklenmedi: dördünde de artikel tutmuyor (**das**, **ein**, **mein**, **Ihr**).
2. **OD-9:** terim, üç nokta, yasak sembol yok (tarama 0). 101 ipucunun kalın kısmı doldurulmuş cümlede harfi harfine geçiyor (betikle sınandı, sapma 0). Türkçe kişi Almanca kişiyle her hata notunda ve ipucunda eşleşiyor. 29 hata notunun hepsi kartın kendi kelimesini içeriyor. "X derken" çakışması bir yerde vardı (`lx:Obst`, düzeltme 11).
3. **Lex'in açık soruları:**
   - `lx:Wind` **Draußen ist viel Wind**: doğru ve gündelik konuşmada duyulan bir cümle (**Heute ist viel Wind** ile aynı kalıp). Bırakıldı. Daha deyimsel karşılıklar **windig** ya da **weht** ister; ikisi de kart değil.
   - `lx:Tee` 2. hata notu: kural içinde sayıldı, kaldı. Türkçe konuşana özgü gerçek bir tuzak: yalnızca **Tee** diyen öğrenci soruyla karşılaşır ya da meyve çayı alır. Olgu doğru, kartın kelimesini içeriyor, ö5 ile destekleniyor.
   - `lx:Saft` **Fruchtwasser**: uygun bulunmadı, çıkarıldı. Öğrencinin bu hatayı yapabilmesi için **Frucht** kelimesini bilmesi gerekir; bilmiyor. Bildiği iki kelimeden kuracağı yanlış **Obstwasser** (meyve + su; **Obst** aynı partide). Not ayrıca meyve suyu kartına tıbbi bir kelime taşıyordu.
4. **WORLD:** `Bei Frau Stadler gibt es jeden Morgen frisches Brot` karaktere olay eklemiyor; fırıncının fırınında her sabah taze ekmek olması WORLD'deki tanımın kendisi. Bırakıldı. Tobi yok, başka karakter adı yok. Öğrencinin ağzında sabit ad ya da cinsiyet yok. Yer adları genel ve doğru: **Vils** ırmak olarak (**über der Vils**), **Landshut**, **Regensburg**, **München** gerçek şehirler. Süreler: Münih'e trenle yaklaşık bir saat (`lx:Bahn` ö6, `lx:Fahrt` ö1) iki kartta aynı ve Aşağı Bavyera'da bir şehir için akla yatkın (Landshut–Münih bölge treniyle 45–55 dakika). WORLD'de buna aykırı bir süre yazmıyor.
5. **Bairisch/sued:** yok. Katmanlar yalnızca `hd` ve `alltag`. **heut**, **Rad**, **Nee**, **guck mal** gündelik konuşma; depoda yerleşik biçimler (guck 52, Nee 75 kez).
6. **Hafta içi ileri gönderme:** yok. Anons kelimeleri (**Durchsage**, **Gleis**, **Ankunft**) hiçbir kartta geçmiyor. **Bitte einsteigen!** fiilin kendi kalıbı. **Verspätung**, **umsteigen**, **reservieren**, **packen**, **aufhören** önceki partilerde kart.

## Değişen Türkçe alanlar (okur için)
- `exp`: `lx:Grad` (`ne_zaman_tr`), `lx:Sitzplatz` (`parcalar` 1. çip).
- `mistakes_tr`: `lx:Tee` (2.), `lx:Saft` (1.), `lx:Nebel` (1.), `lx:Grad` (2.), `lx:Fahrt` (1.).
- `hint_tr`: `lx:Tee` b3, b4; `lx:Obst` b2; `lx:Kontrolle` b1.
- Örnek ve boşluk çevirileri: `lx:frisch` ö5; `lx:Tee` ö2, ö3, b3, b4; `lx:Obst` ö2, b2; `lx:Schnee` ö3, ö4; `lx:Nebel` ö4; `lx:Koffer` ö5; `lx:einsteigen` ö4; `lx:Kontrolle` ö1, b1.
- Eşdizim çevirileri: `lx:sauer` (4.), `lx:Obst` (3.), `lx:Bahn` (4.).

## Kalan şüpheler (düzeltilmedi)
- `lx:Schnee` hata notunun doğru biçimi **Es schneit**; **schneien** sözlükte kart değil. Hedef söz bu olduğu için bırakıldı; kart yazılırsa `related` alanına eklenebilir.
- `lx:Tee` boşluk 6 `zwanzig Tees`: çeşit anlamında doğru ama **zwanzig verschiedene Tees** daha doğal olurdu; **verschieden** kart olmadığı için dokunulmadı (**Teesorten** kabul ediliyor).
- `lx:Suppe` `die Suppe des Tages`: mönüde çoğunlukla **Tagessuppe** yazar. Bileşik ölçütü yüzünden iki kelimeli biçim bırakıldı; söylenince doğru ve anlaşılır.
- `lx:Koffer` 2. hata notu (`zwei Koffers`) ve `lx:Grad` 2. hata notu (`dreißig Grade`) Türkçe konuşana özgü olmaktan çok genel öğrenci hatası. Yanlış değil, bırakıldı.
- Örneklerde geçen **Glas**, **Zucker**, **Taxi**, **Konzert** sözlükte kart değil (bu partiden bağımsız eksik); cümleler bunlarsız da anlaşılıyor.

## Sonuç
Dil açısından bulunan bütün hatalar dosyada düzeltildi, doğrulayıcı 0 hata. Açık soru yok.

Sonuç: KAPALI — okur bekliyor

## Kapanış (İÇ-K2, 2026-11-23)

Okur GEÇTİ (docs/v2/reviews/okur/lexicon-batch-a2-04.md); parti `reviewed`, `okur: passed`. **Sonuç: KAPALI.**
