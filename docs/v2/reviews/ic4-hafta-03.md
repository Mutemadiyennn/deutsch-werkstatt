# İÇ-4 · A1 3. hafta (15.–21. gün, telefon haftası): dil incelemesi

İnceleyen: dilbilimci-ajan · 2026-11-23 · tek tam tur (PM-089)
Dal: `content/ic4-hafta-03`

## Kapsam
- `content/v2/m1/gun-15.json` … `gun-21.json` (7 dosya)
- `content/v2/m1/hafta-sonu-testi-03.json`, `content/v2/m1/gorulmemis-03.json`
- `content/v2/registry/grammar.json`: 17 kaydın `h_tr`, `tr`, `table.head` alanları
- İncelenen madde: yaklaşık **947** (gün başına 112–147 satır, soru, dikte, prova seçeneği ve sınav maddesi; 12 test maddesi; 4 görülmemiş durum; 17 dilbilgisi kaydı)

## Sonuç özeti
| Sınıf | Bulgu | Düzeltilen |
|---|---:|---:|
| P1 (yanlış ya da çalışmayan) | 15 | 15 |
| P2 (doğallık, çeviri, kabul listesi) | 32 | 32 |
| P3 (tutarlılık, biçim) | 14 | 14 |
| Toplam | 61 | 61 |

Hata oranı: 61 / 947 = **%6,4**.

Denetimler (son durum):
- `kontrol.ts … 15–21`: **0 hata**, `OD9` satırı yok, yeni `K … /gorev` satırı yok.
- `dikis-kos.ts … --gun 15 … 21`: **İhlal: 0**.
- `npm run content:validate`: yalnız beklenen 21 şema hatası (`day ≤ 7`, `dersler` deseni; hat D).
- 17 dilbilgisi kaydı `textIssues` ile denetlendi: 0 ihlal.

## P1 bulguları

### 1. Yarım satır yazdıran dikteler (6 gün, 10 madde)
Dikte `cumle` satırının tamamını çalar, puanlama `accepted[0]` ile birebir karşılaştırır. Satır iki cümleyken yalnız biri kabul ediliyordu. Duyduğunun hepsini yazan öğrenci haksız ret alırdı. `gun-01` aynı durumu satırı bölerek çözüyor (`s7b`); aynı yol uygulandı.

| Gün | Madde | Önce | Sonra |
|---|---|---|---|
| 15 | sahne d3 | `s7` **Ja, ich habe Zeit. Ich komme gern.** | `s7` + `s7b` |
| 17 | sahne d3 | `s6` iki cümle | `s6` + `s6b` |
| 18 | sahne d4 | `s14` iki cümle | `s14` + `s14b`, dikte ve kanıt `s14b` |
| 19 | sahne d3 | `s3` iki cümle | `s3` + `s3b`, dikte `s3b`, kanıt `s3`, `s3b` |
| 19 | sahne d4 | `s14` iki cümle | `s14` + `s14b` |
| 20 | sahne d3 | `s6` iki cümle | `s6` + `s6b`, dikte `s6b` |
| 20 | sahne d4 | `s5` üç cümle | `s5` + `s5b`, dikte `s5b`, kanıt genişledi |
| 21 | sahne d2 | boşluk metni satırın yarısıydı (**Nein, am ___.**) | tam satır, boşluk **fünfzehnte** |
| 21 | sahne d4 | `s15` iki cümle | `s15` + `s15b` |
| 21 | a2 d4 | `c2` iki cümle | `c2` + `c2b` |

### 2. 20. gün okuma: `kanit` bir sıra kaymıştı
Metin **Praxis Dr. Weber.** ile başlıyordu. Okuma bölücüsü noktadan sonra böldüğü için **Dr.** ayrı cümle sayılıyor, üç sorunun kanıtı bir önceki cümleyi gösteriyordu.
- Önce: `Praxis Dr. Weber. Ihr Termin ist jetzt …`
- Sonra: `Guten Tag! Ihr Termin ist jetzt …` Kanıtlar artık doğru cümlelere düşüyor.

### 3. Örnek cevap zorunlu kelimeyi içermiyordu
- 15. gün a2 d5: zorunlu **Vormittag**, örnek **am Nachmittag geschlossen** diyordu. Örnek: `Ich muss kurz warten. Am Freitag ist das Büro nur am Vormittag offen.`
- 21. gün a2 d5: zorunlu **Vater**, örnekte yoktu. Örnek: `Derya fragt: Ist dein Vater krank? Sie ist bis sechs im Büro.`

### 4. 18. gün: salon pazartesi kapalı, randevu pazartesi
Bekleme kaydı **Am Montag ist der Salon geschlossen** diyordu. Aynı günün sahnesi, iki halka sahnesi, okuma metni ve gün sınavı randevuyu pazartesi iki buçuğa veriyordu.
- Kayıt değişti: `Von Montag bis Freitag … da.` ve `Am Sonntag ist der Salon geschlossen.`
- Buna bağlı d2, d3 (banka ve cevap), d5, ikinci ayrıntı sorusu, `eylem` seçenekleri ve gerekçesi güncellendi.

### 5. 20. gün: takvim hatası (2 Ocak 2027 cumartesi)
Tatil kaydı muayenehaneyi **ab dem zweiten Januar** açıyordu. 2 Ocak 2027 cumartesidir; aile hekimi o gün açmaz.
- Sonra: kapalı **bis zum dritten Januar**, açılış **ab dem vierten Januar** (pazartesi).
- Bağlı d1, d2, d4, d5, ayrıntı sorusu, `cevapla` ve `eylem` güncellendi.
- Haftanın öteki tarihleri doğrulandı: 4.12 cuma, 7.12 pazartesi, **10.12 perşembe**, 14.12 pazartesi, 15.12 salı, 16.12 çarşamba, 17.12 perşembe, 22.12 salı, 23.12 çarşamba. Hepsi tutarlı.

### 6. 15. gün prova: çelişkili dal ve bilinemeyen gün
- Cumaya gelemeyeceğini söyleyen dal da **Dann bis Freitag!** ile bitiyordu. Düğüm `n4`: `Gut. Dann bis morgen!`
- Yanlış seçeneğin geri bildirimi yarının perşembe olduğunu söylüyor ama durum bugünü vermiyordu. `durum_tr` başına **Bugün çarşamba.** eklendi.

### 7. 19. gün: **nach Brunnenviertel**
Mahalle adı artikelsiz **nach** almaz. `Der Bus zum Brunnenviertel fährt heute nicht um acht.` Aynı cümlenin d2 ve d4 maddeleri de güncellendi.

### 8. 21. gün: sesli mesaj ile prova çelişiyordu
Mesaj babanın 17 Aralık randevusunu bildiriyor, hemen sonraki prova baba için ilk kez randevu alıyor (**er ist neu hier**) ve 16 Aralık çıkıyordu.
- Mesaj öğrencinin kendi kontrol randevusuna çevrildi: `Sie haben einen Termin am Donnerstag, dem siebzehnten Dezember, um halb elf.`
- `ortam_tr`, ana fikir seçenekleri, d2, d4 ve `eylem` buna göre düzeltildi. Kulak kapısının görevi (gün ve saati yazmak) değişmedi.

### 9. Görülmemiş durum g4: istenen tarih verilmemişti
Bütün kabul cevapları **am fünfzehnten** istiyor, durum yalnız salıyı veriyordu. `durum_tr` sonuna **Salı ayın on beşi.** eklendi; bir kabul cevabı daha eklendi.

### 10–15. Dilbilgisi kayıtları: yasak terim ve yasak işaret
| Kayıt | Alan | Önce | Sonra |
|---|---|---|---|
| gr:a1-12:t3 | `h_tr` | Zaman edatları: um, am, im, von … bis, ab | Zamanı söylemek: um, am, im, von, bis, ab |
| gr:a1-12:t3 | `head[0]` | edat | kelime |
| gr:a1-11:t2 | `head[0]` | edat | kelime |
| gr:a1-04:t2 | `head[1]` | zamir | onun yerine |
| gr:a1-12:t4 | `head` | Welches Datum? (der …) · Wann? (am …) | bugün ayın kaçı? (der) · ne zaman? (am) |
| gr:a1-12:t1 | `h_tr` | Kibar rica: Könnten Sie …? | Kibar rica: Könnten Sie das wiederholen? |
| gr:a1-13:t2 | `h_tr` | … billiger als …, so … wie … | Karşılaştırma: billiger als, so teuer wie |

## P2 bulguları

### Almanca doğallık
| Gün | Önce | Sonra |
|---|---|---|
| 16 | Na, wie geht es, Ioana? | Na, wie geht's, Ioana? (eski biçim kabulde kaldı) |
| 17 | Bitte heute am Nachmittag zurückrufen. | Bitte heute Nachmittag zurückrufen. |
| 18 | Ich gehe heute am Abend zum Kurs. (kabul) | Ich gehe heute Abend zum Kurs. |
| 18 | Schon lange lebt Luka hier. (kabul) | Luka lebt schon sehr lange hier. |
| 18 | Das geht also gut. (okuma) | Das passt also gut. |
| 19 | Nie spricht Basti langsam. (kabul) | Basti spricht wirklich nie langsam. |
| 20 | Kann ich Ihnen etwas helfen? (kabul) | Darf ich Ihnen helfen? |
| 20 | Immer hilft mir Frau Huber. (kabul) | Frau Huber hilft mir wirklich immer. |
| 20 | Eier liebt das Kind. (kabul) | Das Kind liebt Eier wirklich. |
| 20 | Den ersten Mai liebt Tobi! (kabul) | Tobi liebt den ersten Mai sehr. |
| 20 | … essen Sie bitte nichts, kein Ei! | … nichts, auch kein Ei! (eski biçim kabulde kaldı) |

### Kabul listeleri
- 16. gün: **Das Kleid ist für Ioana, bitte.** anlamsızdı → **Das ist das Kleid für Ioana.**
- 16. gün: **Haben Sie auch einen Schrank?** çevirinin anlamını değiştiriyordu → **Haben Sie denn noch einen Schrank?**
- 16. gün prova `n1`: aynı cevap iki kez yazılmıştı; biri silindi.
- 19. gün s8: **nie mehr** çeviride olmayan bir anlam ekliyordu → **Ioana redet nie Englisch.**
- 20. gün prova `n1`: **Bitte rufen Sie zurück, haben Sie gesagt.** doğal değildi; silindi.
- 17. gün prova `n1`: öğrenci kimliği söylemeden memur **Für den Ausweis?** diyordu. İlk cevap **… Ich möchte einen Termin für den Ausweis.** oldu; eski cevaplar kabulde kaldı.

### Türkçe
- 15. gün: **Kısa bir vaktiniz var mı?** → **Biraz vaktiniz var mı?**
- 15. gün s7 gerekçe: **Ağrıyı … arasında söylersin** → **Ağrıyan yeri Mir tut ile weh arasına koyarsın.**
- 15. gün 4. halka sahnesi: sabah iş kapısında **Ich komme mit!** anlamsızdı. Ortam molaya, soru bu akşama çevrildi.
- 16. gün s11 gerekçe ilk cevapla uyuşmuyordu (**Haben Sie** yerine **Ist das Hemd noch da?**).
- 16. gün a1: **heute noch** çevirisi **Bugün içinde** oldu.
- 17. gün: **Durchwahl** bir yerde doğrudan numara, bir yerde dahili numaraydı. Hepsi **dahili numara**.
- 18. gün s5 gerekçe yanlıştı (**Türkçede ikisi de -de alır**; pazartesi günü ek almaz) → **Günden önce am, saatten önce um gelir.**
- 18. gün a1: **Luka birazdan sizinle.** → **… sizinle ilgilenecek.**
- 20. gün: **Bu ceket 40 beden var mı?** → **Bu ceketin 40 bedeni var mı?**
- 20. gün 1. halka sahnesi: öğrenci telefonda adını söylemiyordu. Satıra **hier ist {name}** eklendi.
- 21. gün: **çarşambaya kadar!** → **çarşamba görüşürüz!**
- 21. gün o4: baba Almanca soruyordu; durum Derya'nın sorusuna çevrildi.
- 21. gün a2 d1 sahnedeki d1 ile aynıydı; seçenekler değişti.

### Dilbilgisi kayıtları
- gr:a1-12:t5: **söyle, örneğin … dersin** iki kipi karıştırıyordu → **Sonra ne istediğini kısaca söyle: Ich möchte einen Termin.**
- gr:a1-12:t1: **asıl iş kelimesi** → **asıl fiil** (öteki kayıtlarla aynı söz).
- gr:a1-12:t4: son cümle anlaşılmıyordu → **Yazıda am 1. Mai yazılır, am ersten Mai diye okunur.**
- gr:a1-13:t2: **Neyden daha olduğunu** → **Neyle karşılaştırdığını**.
- gr:a1-13:t3: ilk cümle bozuktu → **En demek için başa am gelir, sıfatın sonuna sten eklenir.**
- gr:a1-04:t3 `h_tr`: **sein + sıfat ve renkler** → **Eşya nasıl? groß, klein ve renkler**.
- Almanca örnekler ve tablolar doğru bulundu (çekimler, **am sechsten Januar** Bavyera tatili, **2. OG**).

## P3 bulguları
- Gölge satırı başkasının adını söyletiyordu (**hier ist Derya Aksoy**, **Sabine Huber**, **Josef Pichler**, **Huber**). 16., 17., 20. günde gölge başka satıra alındı; 19. günde anons selamı yerine saat cümlesi geldi.
- **Bahnhof** 17. ve 21. günde gar, 19. günde istasyon. Hepsi **istasyon** (WORLD ile aynı).
- 20. gün `sahne_tr`: **Frau Huber**, **Frau Brandl** → **Huber Hanım**, **Brandl Hanım**.
- 16. gün prova `n4`: çeviride üç nokta vardı; virgül oldu.
- 19. gün a1 d1: cevap **neun**, soru **Hangi saati duydun?** (saat sekiz buçuk) → **Hangi kelimeyi duydun?**
- 19. gün kapanış: **du**, **er** kalın yapıldı; 1. halka ortamı düzeltildi; s11 gerekçesi sadeleşti.
- 20. gün a2 ana fikir seçeneği: **Yeni açılış saatleri her gün için** → **Her gün için yeni açılış saatleri**.
- Tablo başlıkları: gr:a1-06:t2 ve gr:a1-13:t1 boş ilk sütun → **kişi**, **isim**; gr:a1-05:t3 **ne?** → **ne için?**

## Doğru bulunanlar
- Telefon dili gerçek: **Praxis Dr. Weber, Huber, guten Tag.** · **Einen Moment, ich verbinde.** · **Hier ist der Anrufbeantworter von …** · **Was kann ich für Sie tun?** · **Auf welchen Namen, bitte?** · **Auf Wiederhören / Wiederhören!**
- Heceleme: geleneksel tablo (Anton, Berta, Dora, Kaufmann, Ludwig, Otto, Paula, Samuel, Ypsilon) ve DIN 5009 (Berlin) doğru; ikisi de kabul ediliyor. **Brunnengasse** 12 harf, çift N doğru.
- Bairisch yok. **Grüß Gott** ve **daheim** güney standart Almancasıdır, lehçe değildir.
- Öğrenci adı yalnız `{name}`, hitap `{Herr|Frau}`; `audio_de` içinde yer tutucu yok. Kişisel bilgi, kurs ya da kitap adı yok. İngilizce köprü yok.
- Ana fikir, ayrıntı, `eylem` ve okuma sorularının tek doğru cevabı var; kanıtlar (düzeltmelerden sonra) doğru.
- Üretim maddelerinde `accepted` ≥ 3; yinelenen cevap yok.
- `hafta-sonu-testi-03.json`: 12 madde, karışım kurala uygun, hata bulunmadı.

## Kalan şüpheler (AÇIK, engel değil)
1. `K 16 ders.diyalog/gorev: [?doppel-s]`: `r0:10-buchstabieren` dersinden geliyor, başlangıçta da vardı. Dosya bu görevin kapsamında değil.
2. 21. gün öğrencinin babasını şehre yerleştiriyor (**Mein Vater ist krank**). WORLD öğrenciyi şehre yeni gelmiş biri olarak tanımlıyor, aileden söz etmiyor. Kişisel bilgi değil ama öğrencinin hayatı hakkında varsayım. PM kararı gerekir.
3. 17. gün s11 istemi **Guten Tag, Zentrale.** doğal değil. Doğrusu **Rathaus Wendlfing, guten Tag.** ama **Rathaus** 27. günün kartı; dikiş denetçisi reddetti, eski hâli kaldı.
4. **am Samstag am Vormittag**, **am Montag am Nachmittag**: doğru ama ağır. Gündelik biçim **Samstagvormittag**. Günün dil noktası **am** olduğu için bırakıldı.
5. 16. gün mağaza anonsu **um acht Uhr ist alles geschlossen** ve 17. gün **Frau Schneider möchte einen Rückruf** anlaşılır ama gerçekte **schließen**, **bittet um Rückruf** denir. Kelime tablosu izin vermiyor.
6. 20. gün prova `n3`: öğrenci 10 Aralık'ın iptal olduğunu bildiği hâlde **Auf meiner Karte steht der zehnte** dalı uygun sayılıyor. Mantığı zayıf, dil olarak doğru.
7. 18., 19. gün provalarında yanlış biçimler (**Im Freitag**, **ich fährt**) seçenek olarak gösteriliyor. Bilinçli tercih; okur turunda yanlışın akılda kalıp kalmadığına bakılmalı.
8. 18. gün okumada yeni gösterim satırı `[~passt]`: bilinen **passen** kartının çekimi, görev cümlesi değil.
9. Sözlükte kartı olmayan dört kimlik (Anrufbeantworter, Durchwahl, Rückruf, Warteschleife) lex'i bekliyor.

## KARAR: ONAY
Gerekçe: 61 bulgunun tamamı dosyalarda düzeltildi. İki denetim temiz (0 hata, İhlal: 0), doğrulayıcıda yalnız hat D'nin beklenen şema hataları var. Açık kalan dokuz madde dil hatası değil; ikisi PM kararı (2, 7), biri başka dosya (1), biri lex işi (9). Gün dosyalarının `review` alanı görev gereği `draft` bırakıldı; okur turu ve örneklem kontrolü sırada.

## Fark doğrulaması (23.11)
Kapsam: `git diff 29bfb77 a9b92db` (gün 15–21, `hafta-sonu-testi-03`, `gorulmemis-03`, `grammar.json`). Yalnız turumdan sonraki değişikliklere bakıldı (PM-079 md. 3).

### Bulgular ve düzeltmeler (13)
1. **15. gün a2 d5** (P1, haksız ret): örnek cümle **am Nachmittag geschlossen** oldu, zorunlu kelime de **Nachmittag** yapıldı. Kayıt **nur am Vormittag offen** diyor; duyduğunu aynen yazan öğrenci reddedilirdi (zorunlu kelimelerin hepsi aranıyor). Zorunlu: **warten**, **Nachmittag** → **warten**, **Freitag**. Örnek cümle kaldı (doğru çıkarım, hafta içi tekrar da yok).
2. **17. gün 1. halka kalıbı**: **am Bahnhof** çevirisi **garda** → **istasyonda** (ilk turda bütün dosyalarda **istasyon** yapılmıştı; yeni satır eski sözü geri getirdi).
3. **17. gün s8 `why_tr`**: **Cümlede legen başa, auf en sona gider** yanlış genelleme; ana cevap **Bitte legen Sie nicht auf!** (başta **Bitte**), kabul edilen **Bitte nicht auflegen!** cümlesinde kelime ayrılmıyor → **Legen Sie derken auf en sona gider: Legen Sie nicht auf!**
4. **gr:a1-12:t4**: **erste, zweite, dritte gibi biçimi kullanırsın** bozuk cümle → **Tarihte sayıyı erste, zweite, dritte diye söylersin.**
5. **Halka başlıkları (7)**: kartlar halkalar arasında taşındı, başlıklar eski kaldı. 16. gün h1, h2, h3; 17. gün h1, h2, h3; 18. gün h2 (h1 ile aynı sözü taşıyordu, **vielleicht** artık h1'de) yeni kartları da söyleyecek biçimde güncellendi.
6. **gorulmemis-03 g5, g7**: en yalın doğru cevaplar listede yoktu. g5'e **Am Montag um neun.**, **Am Montag um neun Uhr.**; g7'ye **Am Freitag, dem achtzehnten, um Viertel nach drei?**, **Am Freitag um Viertel nach drei?** eklendi.

### Doğru bulunanlar
- Yeni görülmemiş durumlar g5–g7: istemler doğru ve doğal, kabul listeleri doğru; g6 **sie fährt** açıklaması doğru.
- Yeni kalıp satırları: **Welcher …? – Welche …?**, **Na gut!**, **Auf welchen Namen?**, **Ich möchte …**, **bei Luka – bei uns**, **zum Arzt – zum Kurs**, **unser Kurs – unser Chef**, **Okay! – Okay?**, **jeder – jeden Tag**, **zum Bahnhof**, **bei uns – bei Dr. Weber** doğru.
- Yeni ya da değişen cümleler doğru: **Ich brauche den Ausweis für die Prüfung.** · **Der Mann kommt am Dienstag um neun.** · **Ich finde keinen Termin im Januar.** · **Ist noch ein Patient vor meinem Vater?** · **Mein Vater ist Patient bei Dr. Weber.** · **Der Bus ist schon weg.** · **Morgen komme ich um Viertel nach acht.**
- Prova satırları: **Schneider, guten Tag. Was kann ich für Sie tun?**, **Guten Tag! Was kann ich für Sie tun?** (ilk turdaki 3. şüphe **Guten Tag, Zentrale.** böylece kapandı), **Am Freitag nicht? Können Sie mir morgen Bescheid sagen?** doğru; çevirileri uyumlu.
- `grammar.json`: terimsiz anlatımda anlam bozulmamış (a1-02:t3, t4; a1-04:t3, t4; a1-06:t2; a1-11:t1; a1-12:t1; a1-13:t1, t2, t3). Örnekler değişmedi.
- Gölge satırları başkasının adını söyletmiyor.

### Takip notları (engel değil)
- 19. gün a1 gölgesi yine anons selamına döndü (**Guten Abend am Bahnhof Wendlfing.**); hafta içi tekrar kuralı yüzünden. Yanlış değil, konuşma değeri düşük.
- 15. gün n1b: **Jetzt leider nicht.** cevabından sonra **Gut.** biraz kuru; **Kein Problem** kelime tablosu yüzünden çıktı.
- 16.–17. günlerde halkalar artık ilgisiz kartları birlikte taşıyor (telefon + **schlucken**, giysi + **Milch**). Dil hatası değil; halka kurgusu baş geliştirici ve PM işi.
- Tablo başlıklarında **sıfat** sözü duruyor (gr:a1-04:t3, a1-13:t2, t3); metin terimsiz. Okur karar verir.

Sınama (`sina.sh 3`): kalan HATA 0 · İhlal 0 · öğretilmeden istenen 0 · hafta sonu testi 12/12 · görülmemiş 7/7 · sınanmayan can_do yok.

## KARAR: ONAY
