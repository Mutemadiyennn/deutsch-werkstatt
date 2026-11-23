# Okur kontrolü: A1 düzey denemesi (OD-9.3)

Girdi: `content/v2/assess/a1-deneme.json` (`assess:a1-deneme:1`).
Okuyan: Türkçe konuşan, Almancası A2 başı, dilbilgisi terimi bilmeyen öğrenci. Akşam, telefondan, ilk kez okuyor.

Okunan alanlar: bölüm `title_tr`, kısım `yonerge_tr`, `q_tr`, Türkçe `opts` (bir sorunun şıkları tek metin sayıldı; okuma kısım 2'deki **a** / **b** şıkları ve Almanca metinler sayılmadı), `gorev_tr`, `noktalar_tr`, `degerlendirme_tr`, `situation_tr`, `why_tr`. `note_tr` ve `puanlama_tr` ayrı bölümde okundu (öğretmen notu olabilirler).

Sözcük sayımı önceki okur raporlarındaki gibi: kalın ya da tırnaklı Almanca sözcükler ve rakamlar sayılır, `…` sayılmaz. Bu sırada dilbilimci dosyada küçük düzeltme yapıyor olabilir; aşağıdaki metinler okuma anındaki hâlidir.

## Sonuç

| | |
|---|---|
| Okunan metin | 110 (dinleme: 34, okuma: 29, yazma: 10, konuşma: 37) |
| GEÇTİ | 84 |
| GERİ | 26 |
| Ayrıca koşullu | 2 (`note_tr`, `puanlama_tr`; öğrenciye görünürse GERİ, sayıma katılmadı) |

Bölüm bölüm GERİ: dinleme 0 · okuma 0 · yazma 4 · konuşma 22.

Dosya durumu (OD-9.4): dosyanın `review.status` alanı **reviewed** yazıyor; okur GERİ'si olduğu için bu hâliyle "reviewed" sayılamaz.

GERİ olan kimlikler:
1. `yazma` `kisimlar[y2].yonerge_tr`
2. `a1y:y2:01` `degerlendirme_tr[0]`
3. `a1y:y2:01` `degerlendirme_tr[1]`
4. `a1y:y2:01` `degerlendirme_tr[2]`
5. `konusma` `kisimlar[k1].degerlendirme_tr[0]`
6. `konusma` `kisimlar[k1].degerlendirme_tr[1]`
7. `a1k:k1:01` `why_tr`
8. `a1k:k1:02` `why_tr`
9. `a1k:k1:03` `situation_tr`
10. `a1k:k1:03` `why_tr`
11. `konusma` `kisimlar[k2].yonerge_tr`
12. `konusma` `kisimlar[k2].degerlendirme_tr[1]`
13. `konusma` `kisimlar[k2].degerlendirme_tr[2]`
14. `a1k:k2:01` `situation_tr`
15. `a1k:k2:01` `why_tr`
16. `a1k:k2:02` `situation_tr`
17. `a1k:k2:03` `situation_tr`
18. `a1k:k2:04` `situation_tr`
19. `a1k:k2:05` `situation_tr`
20. `a1k:k2:05` `why_tr`
21. `a1k:k2:06` `situation_tr`
22. `a1k:k2:06` `why_tr`
23. `konusma` `kisimlar[k3].degerlendirme_tr[1]`
24. `konusma` `kisimlar[k3].degerlendirme_tr[2]`
25. `a1k:k3:01` `situation_tr`
26. `a1k:k3:04` `why_tr`

## GERİ dönenler

Öneri sütunu yalnızca yönü söyler. Metni yazar ya da dilbilimci yazar.

| # | Kimlik · alan | Metin | Kendi sözlerimle | Neden | Öneri (yön) |
|---|---|---|---|---|---|
| 1 | `kisimlar[y2].yonerge_tr` | Kısa bir e-posta yaz. Yaklaşık 30 kelime yeterli. Üç noktanın hepsini yaz; başta selam, sonda kapanış olsun. | Otuz kelimelik e-posta yazacağım. Aşağıdaki üç şeyin hepsini yazacağım, başa selam, sona kapanış koyacağım. | Sembol: noktalı virgül. Üçüncü cümlede iki fikir. Ayrıca "üç nokta" Türkçede **…** işaretinin de adı; ilk okumada "üç noktayı yaz" diye takıldım, aşağıdaki listeyi görünce çözdüm. | İki cümle; "üç nokta" yerine "üç madde" gibi tek anlamlı bir söz. |
| 2 | `a1y:y2:01` `degerlendirme_tr[0]` | Görev (6 puan): her nokta için 2 puan. Nokta yazılmış ve anlaşılıyorsa 2; yazılmış ama tam anlaşılmıyorsa 1; yoksa 0. | Her madde 2 puan. Açıksa 2, yarım anlaşılıyorsa 1, yoksa 0. | Sembol: iki noktalı virgül. Anlamı ikinci okumada çıkardım. | Puan basamakları ayrı kısa cümleler ya da ayrı satırlar olsun. |
| 3 | `a1y:y2:01` `degerlendirme_tr[1]` | Anlaşılırlık (2 puan): Almanca bilen biri mesajı bir kez okuyup anlıyorsa 2; birkaç yerde durup düşünmesi gerekiyorsa 1; çoğu anlaşılmıyorsa 0. Küçük yazım hataları puan düşürmez. | Mesaj kolay anlaşılıyorsa 2, zor anlaşılıyorsa 1, anlaşılmıyorsa 0 puan. Küçük hata sorun değil. | Sembol: iki noktalı virgül. İlk cümle 22 kelime. | 2 ile aynı yön. |
| 4 | `a1y:y2:01` `degerlendirme_tr[2]` | Selam ve kapanış (2 puan): uygun bir selam (ör. 'Sehr geehrte Damen und Herren', 'Guten Tag') 1; uygun bir kapanış (ör. 'Mit freundlichen Grüßen', 'Viele Grüße') ve ad 1. | Selama 1, kapanışa ve ada 1 puan. | Sembol: tırnak içinde Almanca, noktalı virgül. Cümle 23 kelime. Parantezler arasında "1"lerin neye ait olduğunu kaybettim. | Örnekler kalın yazılsın, tırnak ve noktalı virgül çıksın, selam ve kapanış ayrı cümle olsun. |
| 5 | `kisimlar[k1].degerlendirme_tr[0]` | Tanıtma (her kart 1 puan): karttaki her sözcük için anlaşılır bir cümle söylediysen tam puan. Bir ya da iki bilgi eksikse ya da cümle yerine tek sözcük söylediysen yarım puan (0,5). Anlaşılmıyorsa ya da İngilizce konuştuysan 0. | Her sözcüğe bir cümle: tam puan. Eksik ya da tek kelime: yarım. Anlaşılmaz ya da İngilizce: sıfır. | İlk cümle 15, ikinci cümle 16 kelime. Bir kutuda üç puan basamağı. | Cümleler kısalsın; basamaklar ayrı satırlarda (k2 ve k3'teki gibi). |
| 6 | `kisimlar[k1].degerlendirme_tr[1]` | Heceleme (1 puan): bütün harfler doğru ve anlaşılırsa tam puan; 'A wie Anton' gibi ad ya da şehir kodları zorunlu değil, iki türü de kabul. Bir harf yanlışsa ya da görevli bir kez yeniden sormak zorunda kaldıysa yarım puan. Harflerin çoğu yanlışsa 0. | Adımı harf harf söylemek mi? Hece hece mi? Harfler doğruysa tam puan; "şehir kodu" nedir bilmiyorum. | Sembol: noktalı virgül, tırnak içinde Almanca. İlk cümle 22, ikinci 15 kelime. "Heceleme" Türkçede kelimeyi hecelere bölmek demek; burada istenen harf harf söylemek (görev metni k1:03 de "harf harf" diyor). "Şehir kodları" telefon alan kodu gibi okunuyor. | "Harf harf söyleme" gibi görevle aynı söz; "kod" yerine ad ya da şehir adıyla örnek; cümleler bölünsün. |
| 7 | `a1k:k1:01` `why_tr` | '…' yerine kendi bilgini söyle. Bazı ülke adları 'der' ister: 'aus der Türkei', 'aus der Ukraine'. Yaşta 'Jahre alt' sonda gelir. | Bir boşluğun yerine kendi bilgimi söyleyeceğim. Bazı ülkelerde **der** derim. Yaşı söylerken **Jahre alt** sona gelir. | Sembol: tırnak içinde Almanca, tırnak içinde **…**. Bir kutuda üç fikir. "'…' yerine" ekranda görmediğim bir şeyi anlatıyor: örnek cevaplar sınavdan önce gösterilmiyor (`note_tr`). | Tek fikir kalsın; Almanca kalın, tırnaksız; görünmeyen örnek cevaba gönderme olmasın. |
| 8 | `a1k:k1:02` `why_tr` | '…' yerine kendi bilgini söyle. Meslek söylerken 'ein' kullanılmaz: 'Ich bin Fahrer', 'Ich arbeite als Köchin'. | Kendi bilgimi söyleyeceğim. Mesleğimi söylerken **ein** demem: **Ich bin Fahrer**. | Sembol: tırnak içinde Almanca ve **…**. İki fikir. 7 ile aynı gönderme sorunu. | 7 ile aynı yön. |
| 9 | `a1k:k1:03` `situation_tr` | Görevli soyadını harf harf söylemeni istiyor. Kendi soyadını harf harf söyle. (Örnek cevaplar 'Berger' soyadı içindir; senin cevabın kendi soyadınla, ölçüte göre puanlanır.) | Soyadımı harf harf söyleyeceğim. Parantezdekini anlamadım: hangi örnek cevaplar? | Sembol: noktalı virgül, tırnak içinde ad. Parantez öğretmen notu gibi; ekranda görmediğim örnek cevapları ve "ölçüt"ü anlatıyor. | Parantez öğrenciye görünmesin ya da tek basit cümle olsun (ör. kendi soyadını söyle). |
| 10 | `a1k:k1:03` `why_tr` | Harflerin Almanca adlarını söyle: E 'e', I 'i', R 'er'. Anlaşılmazsa 'B wie Berta' (ad) ya da 'B wie Berlin' (şehir) diye ekle; ikisi de doğru. | Harfleri Almanca okuyacağım. Anlaşılmazsa **B wie Berta** gibi bir ad ya da şehirle söyleyeceğim. | Sembol: tırnak içinde Almanca, noktalı virgül. İkinci cümle 15 kelime. İki fikir. | Almanca kalın, tırnaksız; iki ayrı kısa cümle ya da tek fikir. |
| 11 | `kisimlar[k2].yonerge_tr` | Hazırlık yok. Sana bir konu ve bir sözcük kartı verilir. Kart sözcüğüyle partnerine bir soru sor. Partner sana soru sorarsa cevap ver. 'du' ya da 'Sie' ikisi de olur. | Kartta bir kelime var, onunla karşımdakine soru soracağım. O sorarsa cevap vereceğim. **du** da **Sie** de olur. | Sembol: tırnak içinde Almanca ('du', 'Sie'). Not: "partner" Türkçede çoğu zaman eş, sevgili demek; "karşındaki kişi" daha açık. | Almanca kalın, tırnaksız. |
| 12 | `kisimlar[k2].degerlendirme_tr[1]` | Tam puan: kart sözcüğünü kullanan, konuya uyan ve anlaşılan bir soru; ya da soruya uyan, anlaşılan tam bir cevap. | Kelimeyi kullanan, konuya uyan soru ya da düzgün cevap: tam puan. | Sembol: noktalı virgül. 19 kelime. | Soru ve cevap ayrı cümle. |
| 13 | `kisimlar[k2].degerlendirme_tr[2]` | Yarım puan (0,5): anlaşılıyor ama cümle bozuk (ör. sözcükler yanlış sırada) ya da cevap tek sözcük. | Anlaşılıyor ama cümle bozuksa ya da tek kelimeyse yarım puan. | 16 kelime (parantezli kısaltma "ör." ile). k3'teki eşi (13 kelime) GEÇTİ. | Örnek parantezi çıksın ya da cümle bölünsün. |
| 14 | `a1k:k2:01` `situation_tr` | Konu: Yemek ve içmek. Kartta 'Frühstück' (kahvaltı) yazıyor. Partnerine bu sözcükle bir soru sor. | Kartta kahvaltı yazıyor, kahvaltıyla ilgili soru soracağım. | Sembol: tırnak içinde Almanca. Anlamı tek okumada anladım. | **Frühstück** kalın, tırnaksız. |
| 15 | `a1k:k2:01` `why_tr` | Soru sözcüğü ('Was', 'Wann') ya da fiil başa gelir. | Soru kelimesi ya da bilmediğim bir şey başa gelir. | Terim: fiil (önceki okur raporlarında da terim sayıldı). Sembol: tırnak içinde Almanca. | Terimsiz, örnekle (ör. **Was** ya da **Isst** başa gelir); Almanca kalın. |
| 16 | `a1k:k2:02` `situation_tr` | Konu: Yemek ve içmek. Partnerinin kartında 'Bäckerei' (fırın) yazıyor ve sana soru soruyor. Cevap ver. | | Sembol: tırnak içinde Almanca. | 14 ile aynı yön. |
| 17 | `a1k:k2:03` `situation_tr` | Konu: Yemek ve içmek. Kartta 'Restaurant' yazıyor. Partnerine bu sözcükle bir soru sor. | | Sembol: tırnak içinde Almanca. | 14 ile aynı yön. |
| 18 | `a1k:k2:04` `situation_tr` | Konu: Benim günüm. Kartta 'Wochenende' (hafta sonu) yazıyor. Partnerine bu sözcükle bir soru sor. | | Sembol: tırnak içinde Almanca. | 14 ile aynı yön. |
| 19 | `a1k:k2:05` `situation_tr` | Konu: Benim günüm. Partnerinin kartında 'gestern' (dün) yazıyor ve sana soru soruyor. Cevap ver. | | Sembol: tırnak içinde Almanca. | 14 ile aynı yön. |
| 20 | `a1k:k2:05` `why_tr` | Dün için 'habe … gemacht/gekocht' ya da 'war' kullan. | Dün için **habe gemacht** ya da **war** derim. | Sembol: tırnak içinde Almanca, eğik çizgi. "gemacht/gekocht" ilk okumada tek garip kelime gibi göründü. | Almanca kalın, eğik çizgi yerine "ya da". |
| 21 | `a1k:k2:06` `situation_tr` | Konu: Benim günüm. Partnerinin kartında 'aufstehen' (kalkmak) yazıyor ve sana soru soruyor. Cevap ver. | | Sembol: tırnak içinde Almanca. | 14 ile aynı yön. |
| 22 | `a1k:k2:06` `why_tr` | 'auf' cümlenin sonuna gider: 'Ich stehe um sechs Uhr auf.' | **auf** sona gider: **Ich stehe um sechs Uhr auf**. | Sembol: tırnak içinde Almanca. Anlamı tek okumada anladım. | Almanca kalın, tırnaksız. |
| 23 | `kisimlar[k3].degerlendirme_tr[1]` | Rica, tam puan: resme uyan, kibar ('bitte', 'Können Sie …?', 'Ich hätte gern …') ve anlaşılan bir rica. | Resme uyan, kibar, anlaşılır rica tam puan. | Sembol: tırnak içinde Almanca. | Örnekler kalın, tırnaksız. |
| 24 | `kisimlar[k3].degerlendirme_tr[2]` | Cevap, tam puan: ricaya uyan bir kabul ya da kibar bir ret ('Tut mir leid, …'). | Kabul ya da kibar ret tam puan. | Sembol: tırnak içinde Almanca. | 23 ile aynı yön. |
| 25 | `a1k:k3:01` `situation_tr` | Resim: bir telefon ve restoranda iki kişilik bir masa; altında 'Samstag'. Restoranı arıyorsun. Masa ayırt. | Cumartesi için iki kişilik masa ayırtacağım. | Sembol: noktalı virgül, tırnak içinde Almanca. | Noktalı virgül yerine nokta; **Samstag** kalın. |
| 26 | `a1k:k3:04` `why_tr` | Numarayı söylüyorsan '…' yerine rakamları tek tek ya da ikişer ikişer söyle. | Neyin yerine? Rakamları tek tek ya da ikişer söyleyeceğim. | Sembol: tırnak içinde **…**. "'…' yerine" ekranda görmediğim örnek cevabı anlatıyor (7 ile aynı). | Gönderme çıksın: rakamları tek tek ya da ikişer söyle. |

## Dinleme (34 metin, 0 GERİ)

| # | Kimlik | Alan | Metin | Kendi sözlerimle | Karar |
|---|---|---|---|---|---|
| 1 | `dinleme` | `title_tr` | Dinleme | | GEÇTİ |
| 2 | `d1` | `yonerge_tr` | Altı kısa konuşma dinleyeceksin. Her konuşmayı iki kez duyacaksın. Her soru için doğru cevabı seç. | Altı konuşma, ikişer kez; doğru cevabı seçerim. | GEÇTİ |
| 3–4 | `a1d:d1:01` | `q_tr`, `opts` | Adam toplam ne kadar ödüyor? / 0,80 € · 2,60 € · 4,20 € | Adamın ödediği toplam. | GEÇTİ (2) |
| 5–6 | `a1d:d1:02` | `q_tr`, `opts` | Adamın randevusu ne zaman? / Perşembe, saat 10:00 · Cuma, saat 8:30 · Cuma, saat 9:30 | Randevunun günü ve saati. | GEÇTİ (2) |
| 7–8 | `a1d:d1:03` | `q_tr`, `opts` | Monika Hartl hangi katta oturuyor? / 2. katta · 3. katta · 4. katta | Kadının katı. | GEÇTİ (2) |
| 9–10 | `a1d:d1:04` | `q_tr`, `opts` | Adam dün öğleden sonra ne yaptı? / Markete gitti. · Futbol oynadı. · Film izledi. | Öğleden sonra ne yaptı. | GEÇTİ (2) |
| 11–12 | `a1d:d1:05` | `q_tr`, `opts` | Adam tableti nasıl almalı? / Günde üç kez, yemekten önce · … sonra · Günde bir kez, yemekten sonra | Tableti kaç kez, yemekten önce mi sonra mı içecek. | GEÇTİ (2) |
| 13–14 | `a1d:d1:06` | `q_tr`, `opts` | Kadın pirinci nerede bulur? / 3. reyonda, makarnanın yanında · En arkada, solda · Sütün yanında | Pirincin yeri. | GEÇTİ (2) |
| 15 | `d2` | `yonerge_tr` | Dört anons dinleyeceksin. Her anonsu yalnızca bir kez duyacaksın. Cümle doğru mu, yanlış mı? | Dört anons, birer kez; cümle doğru mu yanlış mı seçerim. | GEÇTİ |
| 16–17 | `a1d:d2:01` | `q_tr`, `opts` | 52 numaralı otobüs bugün saat 8:15'te kalkıyor. / Doğru · Yanlış | | GEÇTİ (2) |
| 18–19 | `a1d:d2:02` | `q_tr`, `opts` | Elmanın kilosu bugün 1,99 €. / Doğru · Yanlış | | GEÇTİ (2) |
| 20–21 | `a1d:d2:03` | `q_tr`, `opts` | Muayenehane cuma günü öğleden sonra da açık. / Doğru · Yanlış | | GEÇTİ (2) |
| 22–23 | `a1d:d2:04` | `q_tr`, `opts` | Bergheim treni bugün 5. perondan kalkıyor. / Doğru · Yanlış | | GEÇTİ (2) |
| 24 | `d3` | `yonerge_tr` | Telefonda bırakılmış beş sesli mesaj dinleyeceksin. Her mesajı iki kez duyacaksın. Her soru için doğru cevabı seç. | Beş sesli mesaj, ikişer kez. | GEÇTİ |
| 25–26 | `a1d:d3:01` | `q_tr`, `opts` | Muayenehane yeni randevu için hangi zamanı öneriyor? / Salı, saat 15:15 · Çarşamba, saat 14:45 · Çarşamba, saat 15:15 | Yeni randevunun zamanı. | GEÇTİ (2) |
| 27–28 | `a1d:d3:02` | `q_tr`, `opts` | Pasta ne kadar? / 28,50 € · 82,50 € · 28,15 € | | GEÇTİ (2) |
| 29–30 | `a1d:d3:03` | `q_tr`, `opts` | Cuma günü restoranda saat kaçta boş masa var? / 19:00 · 20:30 · 21:30 | | GEÇTİ (2) |
| 31–32 | `a1d:d3:04` | `q_tr`, `opts` | Apartman görevlisi senden ne istiyor? / Pazartesi saat 8 ile 12 arasında evde olmanı · Kaloriferi kendin kontrol etmeni · Pazartesi saat 12'de onu aramanı | Görevlinin benden istediği. | GEÇTİ (2) |
| 33–34 | `a1d:d3:05` | `q_tr`, `opts` | Jana'nın yeni telefon numarası hangisi? / üç numara | | GEÇTİ (2) |

## Okuma (29 metin, 0 GERİ)

| # | Kimlik | Alan | Metin | Kendi sözlerimle | Karar |
|---|---|---|---|---|---|
| 1 | `okuma` | `title_tr` | Okuma | | GEÇTİ |
| 2 | `o1` | `yonerge_tr` | İki kısa mesaj okuyacaksın. Cümle doğru mu, yanlış mı? | | GEÇTİ |
| 3–4 | `a1o:o1:01` | `q_tr`, `opts` | Lena'nın partisi cumartesi saat yedide başlıyor. / Doğru · Yanlış | | GEÇTİ (2) |
| 5–6 | `a1o:o1:02` | `q_tr`, `opts` | Lena ikinci katta oturuyor. / Doğru · Yanlış | | GEÇTİ (2) |
| 7–8 | `a1o:o1:03` | `q_tr`, `opts` | Stefan Huber dün doktora gitti. / Doğru · Yanlış | | GEÇTİ (2) |
| 9–10 | `a1o:o1:04` | `q_tr`, `opts` | Stefan cuma günü yeniden işe geliyor. / Doğru · Yanlış | | GEÇTİ (2) |
| 11–12 | `a1o:o1:05` | `q_tr`, `opts` | Frau Schäfer yarın saat 10'da Herr Wolf'u aramalı. / Doğru · Yanlış | | GEÇTİ (2) |
| 13 | `o2` | `yonerge_tr` | Beş durum var. Her durumda iki ilan okuyacaksın: a ve b. Duruma uyan ilanı seç. | Her durum için iki ilandan uyanı seçerim. | GEÇTİ |
| 14 | `a1o:o2:01` | `q_tr` | Cumartesi saat 15'te ekmek almak istiyorsun. Hangi fırın açık? | | GEÇTİ |
| 15 | `a1o:o2:02` | `q_tr` | Bugün çarşamba, saat 15:00. Boğazın çok ağrıyor ve bugün bir doktora gitmek istiyorsun. Hangi muayenehaneye gidersin? | Bugün öğleden sonra açık olan doktor. | GEÇTİ |
| 16 | `a1o:o2:03` | `q_tr` | Bir arkadaşın için daire arıyorsun: 3 oda olmalı, kira en fazla 900 €. | | GEÇTİ |
| 17 | `a1o:o2:04` | `q_tr` | Pazar akşamı dört arkadaşınla yemek yemek istiyorsun. Önceden telefonla masa ayırtmak istiyorsun. | Pazar açık, telefonla masa ayrılan yer. | GEÇTİ |
| 18 | `a1o:o2:05` | `q_tr` | Bugün pazar. Öksürüğün var ve eczaneden ilaç almak istiyorsun. Hangi eczaneye gidersin? | Bugün açık eczane. | GEÇTİ |
| 19 | `o3` | `yonerge_tr` | Beş kısa tabela ya da duyuru okuyacaksın. Cümle doğru mu, yanlış mı? | | GEÇTİ |
| 20–21 | `a1o:o3:01` | `q_tr`, `opts` | Bu dükkân cumartesi saat 15'te açık. / Doğru · Yanlış | | GEÇTİ (2) |
| 22–23 | `a1o:o3:02` | `q_tr`, `opts` | Muayenehane yarın sabah saat 8'den itibaren yine açık. / Doğru · Yanlış | | GEÇTİ (2) |
| 24–25 | `a1o:o3:03` | `q_tr`, `opts` | Çarşamba öğleden sonra evlerde su yok. / Doğru · Yanlış | | GEÇTİ (2) |
| 26–27 | `a1o:o3:04` | `q_tr`, `opts` | Mayıs sonuna kadar 7 numaralı hat bu durakta durmuyor. / Doğru · Yanlış | | GEÇTİ (2) |
| 28–29 | `a1o:o3:05` | `q_tr`, `opts` | Ekmekler girişte, sağda. / Doğru · Yanlış | | GEÇTİ (2) |

## Yazma (10 metin, 4 GERİ)

| # | Kimlik | Alan | Metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|---|---|
| 1 | `yazma` | `title_tr` | Yazma | | GEÇTİ | |
| 2 | `y1` | `yonerge_tr` | Maria bugün ilk kez bir aile hekimine gidiyor. Onun hakkındaki metni oku ve muayenehanenin formundaki beş boşluğu Maria için doldur. Kendi bilgilerini yazma. | Maria'nın bilgileriyle formu dolduracağım, kendiminkilerle değil. | GEÇTİ | En uzun cümle 12 kelime. |
| 3 | `y2` | `yonerge_tr` | … Üç noktanın hepsini yaz; başta selam, sonda kapanış olsun. | — | **GERİ** | Yukarıda 1. |
| 4 | `a1y:y2:01` | `gorev_tr` | Perşembe saat 10'da aile hekiminde randevun var ama gidemiyorsun. Muayenehaneye bir e-posta yaz. | Randevuya gidemeyeceğimi e-postayla bildireceğim. | GEÇTİ | |
| 5 | `a1y:y2:01` | `noktalar_tr[0]` | Randevuna gelemeyeceğini yaz. | | GEÇTİ | |
| 6 | `a1y:y2:01` | `noktalar_tr[1]` | Nedenini yaz. | | GEÇTİ | |
| 7 | `a1y:y2:01` | `noktalar_tr[2]` | Yeni bir gün ya da saat iste. | | GEÇTİ | |
| 8 | `a1y:y2:01` | `degerlendirme_tr[0]` | Görev (6 puan): … | — | **GERİ** | Yukarıda 2. |
| 9 | `a1y:y2:01` | `degerlendirme_tr[1]` | Anlaşılırlık (2 puan): … | — | **GERİ** | Yukarıda 3. |
| 10 | `a1y:y2:01` | `degerlendirme_tr[2]` | Selam ve kapanış (2 puan): … | — | **GERİ** | Yukarıda 4. |

## Konuşma (37 metin, 22 GERİ)

| # | Kimlik | Alan | Metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|---|---|
| 1 | `konusma` | `title_tr` | Konuşma | | GEÇTİ | |
| 2 | `k1` | `yonerge_tr` | Hazırlık yok. Kartı görünce hemen konuş. Önce kendini tanıt, sonra görevlinin sorusuna cevap ver. | Hazırlanmadan kendimi tanıtıp soruya cevap vereceğim. | GEÇTİ | |
| 3 | `k1` | `degerlendirme_tr[0]` | Tanıtma (her kart 1 puan): … | — | **GERİ** | Yukarıda 5. |
| 4 | `k1` | `degerlendirme_tr[1]` | Heceleme (1 puan): … | — | **GERİ** | Yukarıda 6. |
| 5 | `a1k:k1:01` | `situation_tr` | Görevli senden kendini tanıtmanı istiyor. Kartta şu sözcükler var: Name, Alter, Land, Wohnort. Her biri için bir cümle söyle. | Adım, yaşım, ülkem, oturduğum yer için birer cümle. | GEÇTİ | Almanca sözcükler tırnaksız. |
| 6 | `a1k:k1:01` | `why_tr` | '…' yerine kendi bilgini söyle. … | — | **GERİ** | Yukarıda 7. |
| 7 | `a1k:k1:02` | `situation_tr` | Tanıtmaya devam et. Kartta şu sözcükler var: Sprachen, Beruf, Hobby. Her biri için bir cümle söyle. | Diller, meslek, hobi için birer cümle. | GEÇTİ | |
| 8 | `a1k:k1:02` | `why_tr` | '…' yerine kendi bilgini söyle. Meslek söylerken 'ein' kullanılmaz: … | — | **GERİ** | Yukarıda 8. |
| 9 | `a1k:k1:03` | `situation_tr` | … (Örnek cevaplar 'Berger' soyadı içindir; …) | — | **GERİ** | Yukarıda 9. |
| 10 | `a1k:k1:03` | `why_tr` | Harflerin Almanca adlarını söyle: E 'e', I 'i', R 'er'. … | — | **GERİ** | Yukarıda 10. |
| 11 | `k2` | `yonerge_tr` | … 'du' ya da 'Sie' ikisi de olur. | — | **GERİ** | Yukarıda 11. |
| 12 | `k2` | `degerlendirme_tr[0]` | Her kart 1 puan. | | GEÇTİ | |
| 13 | `k2` | `degerlendirme_tr[1]` | Tam puan: … ; ya da … | — | **GERİ** | Yukarıda 12. |
| 14 | `k2` | `degerlendirme_tr[2]` | Yarım puan (0,5): … | — | **GERİ** | Yukarıda 13. |
| 15 | `k2` | `degerlendirme_tr[3]` | 0: kart sözcüğü kullanılmadı, konu dışı, anlaşılmıyor ya da İngilizce. | Bunlardan biri varsa sıfır puan. | GEÇTİ | |
| 16 | `a1k:k2:01` | `situation_tr` | … 'Frühstück' (kahvaltı) … | — | **GERİ** | Yukarıda 14. |
| 17 | `a1k:k2:01` | `why_tr` | Soru sözcüğü ('Was', 'Wann') ya da fiil başa gelir. | — | **GERİ** | Yukarıda 15. |
| 18 | `a1k:k2:02` | `situation_tr` | … 'Bäckerei' (fırın) … | — | **GERİ** | Yukarıda 16. |
| 19 | `a1k:k2:03` | `situation_tr` | … 'Restaurant' … | — | **GERİ** | Yukarıda 17. |
| 20 | `a1k:k2:04` | `situation_tr` | … 'Wochenende' (hafta sonu) … | — | **GERİ** | Yukarıda 18. |
| 21 | `a1k:k2:05` | `situation_tr` | … 'gestern' (dün) … | — | **GERİ** | Yukarıda 19. |
| 22 | `a1k:k2:05` | `why_tr` | Dün için 'habe … gemacht/gekocht' ya da 'war' kullan. | — | **GERİ** | Yukarıda 20. |
| 23 | `a1k:k2:06` | `situation_tr` | … 'aufstehen' (kalkmak) … | — | **GERİ** | Yukarıda 21. |
| 24 | `a1k:k2:06` | `why_tr` | 'auf' cümlenin sonuna gider: … | — | **GERİ** | Yukarıda 22. |
| 25 | `k3` | `yonerge_tr` | Hazırlık yok. Kartta bir resim tarif edilir. Resme göre partnerinden kibarca bir şey iste. Partner senden bir şey isterse cevap ver: kabul et ya da kibarca 'hayır' de. | Karttaki resme göre kibarca bir şey isteyeceğim; benden isterse kabul ya da kibar ret. | GEÇTİ | Tırnaktaki söz Türkçe. "Partner" notu 11'deki gibi. |
| 26 | `k3` | `degerlendirme_tr[0]` | Her kart 1 puan. | | GEÇTİ | |
| 27 | `k3` | `degerlendirme_tr[1]` | Rica, tam puan: … ('bitte', 'Können Sie …?', …) … | — | **GERİ** | Yukarıda 23. |
| 28 | `k3` | `degerlendirme_tr[2]` | Cevap, tam puan: … ('Tut mir leid, …'). | — | **GERİ** | Yukarıda 24. |
| 29 | `k3` | `degerlendirme_tr[3]` | Yarım puan (0,5): anlaşılıyor ama cümle bozuk ya da kibarlık sözcüğü hiç yok. | Anlaşılır ama bozuk ya da kibar sözsüzse yarım. | GEÇTİ | 13 kelime. |
| 30 | `k3` | `degerlendirme_tr[4]` | 0: resme ya da ricaya uymuyor, anlaşılmıyor ya da İngilizce. | | GEÇTİ | |
| 31 | `a1k:k3:01` | `situation_tr` | Resim: … iki kişilik bir masa; altında 'Samstag'. … | — | **GERİ** | Yukarıda 25. |
| 32 | `a1k:k3:02` | `situation_tr` | Resim: eczane ve öksüren biri. Eczacıdan öksürük için bir ilaç iste. | | GEÇTİ | |
| 33 | `a1k:k3:03` | `situation_tr` | Resim: bir kol saati. Sokakta birine saati sor. | Sokakta saatin kaç olduğunu soracağım. | GEÇTİ | |
| 34 | `a1k:k3:04` | `situation_tr` | Partnerinin kartında bir telefon resmi var ve senden bir şey istiyor. Cevap ver. | Benden bir şey istiyor (numaramı), cevap vereceğim. | GEÇTİ | |
| 35 | `a1k:k3:04` | `why_tr` | Numarayı söylüyorsan '…' yerine … | — | **GERİ** | Yukarıda 26. |
| 36 | `a1k:k3:05` | `situation_tr` | Partnerinin kartında bir koli resmi var. Komşun olarak senden bir şey istiyor. Cevap ver. | Komşum benden koli ile ilgili bir şey istiyor. | GEÇTİ | |
| 37 | `a1k:k3:06` | `situation_tr` | Partnerinin kartında ekmek resmi var. Senden bir şey istiyor. Cevap ver. | | GEÇTİ | |

Sayım: başlık 1 + k1 (yönerge 1, ölçüt 2, durum 3, ipucu 3) 9 + k2 (yönerge 1, ölçüt 4, durum 6, ipucu 3) 14 + k3 (yönerge 1, ölçüt 5, durum 6, ipucu 1) 13 = 37.

## Öğretmen notu olabilecek alanlar (koşullu, sayıma katılmadı)

Şu an web uygulamasında bu dosyayı gösteren ekran yok; bu iki alanın öğrenciye görünüp görünmeyeceğini bilemedim. Görünürse ikisi de GERİ.

| Alan | Metin (kısa) | Kendi sözlerimle | Karar (görünürse) | Neden |
|---|---|---|---|---|
| `note_tr` | Derslerden bağımsız yazıldı (PM-087 B.2); kaynak yalnız A1 yapabiliyorum listesi … 'kanit': dinlemede ses satırının sırası … 'accepted' listeleri örnek cevaplardır … | Yazarlar için bir not. Bir kısmı bilgisayar alanlarının adları. | **GERİ** | İçeriği öğretmen ve yazar notu: belge numarası, alan adları (**kanit**, **accepted**, **degerlendirme_tr**), madde kimlikleri. Noktalı virgül, tırnak, **…**. Cümleler 14 kelimeden uzun. Öğrenciye gösterilmemeli. |
| `puanlama_tr` | Her bölümün ham puanı 25 üzerinden ölçeklenir (ham puan / en yüksek ham puan × 25). Geçmek için toplam en az 60 ve konuşma bölümünden ayrıca en az 15 puan gerekir; konuşma eksiği başka bölümle kapatılamaz. | Her bölüm 25 puan. Geçmek için 60 puan ve konuşmadan en az 15 puan lazım. Konuşma zayıfsa öbür bölümler kurtarmaz. | **GERİ** | Sembol: `/`, `×`, noktalı virgül. "Ham puan", "ölçeklenir" bana yabancı. İkinci cümle 19 kelime. Geçme kuralı öğrencinin bilmek isteyeceği bir şey; gösterilecekse sade ve kısa cümlelerle. |

## Notlar (karar değil)

- Dinleme ve okuma bölümlerinin soruları ve şıkları çok rahat okunuyor: kısa, tek fikirli, terimsiz. 63 metinde hiç takılmadım.
- Konuşma bölümündeki 22 GERİ'nin 10'u yalnız tırnak içinde Almanca (OD-9.2 md. 2). Bunların çoğunun anlamını tek okumada anladım; geri dönme nedeni sembol. Almancanın kalın yazılmasıyla çoğu kapanır.
- `why_tr` alanlarından üçü (k1:01, k1:02, k3:04) **'…' yerine** diyor. `note_tr`'ye göre örnek cevaplar sınavdan önce gösterilmiyor; öğrenci bu **…**'yı hiç görmüyor. Bu ipuçları sınav sonrasında gösterilecekse de anlamları ekrandaki cevaba bağlı kalıyor.
- "Partner" sözü k2 ve k3'te çok geçiyor. Türkçede çoğu zaman eş ya da sevgili anlamında kullanılıyor. Sınav bağlamında çözülüyor ama "karşındaki kişi" daha açık olur. Uygulamada bu "partner"in kim olduğu (yapay zekâ mı, kayıt mı) metinden anlaşılmıyor.
- k1 ölçütlerinde "Heceleme" sözü, görev metinlerindeki "harf harf söyle" ile çelişiyor (Türkçede heceleme hecelere bölmek).
- Dosyanın `review.status` alanı **reviewed**. OD-9.4'e göre okur GERİ'leri kapanmadan bu durum geçerli sayılmaz.

OKUR: GERİ — 26 madde

---

## 2. tur

Tarih: 2026-11-23. Kapsam: 1. turda GERİ dönen 26 madde, iki koşullu alan (`note_tr`, `puanlama_tr`) ve 1. turda "partner" notu düşülen 4 alan (k3 `yonerge_tr`, k3:04, k3:05, k3:06 `situation_tr`). Yeni tam okuma yapılmadı. Metinler dosyanın okuma anındaki hâlidir. Dosyada "partner" sözü artık hiç geçmiyor; k2:02, k2:05, k2:06 `situation_tr` da "karşındaki kişi" oldu.

### GERİ dönen 26 madde

| # | Kimlik · alan | Yeni metin | Kendi sözlerimle | Karar | Not |
|---|---|---|---|---|---|
| 1 | `kisimlar[y2].yonerge_tr` | Kısa bir e-posta yaz. Yaklaşık 30 kelime yeterli. Aşağıdaki üç maddenin hepsini yaz. Başta bir selam, sonda bir kapanış olsun. | Otuz kelime kadar kısa bir e-posta yazacağım. Aşağıdaki üç şeyin hepsi içinde olacak. Başına selam, sonuna kapanış koyacağım. | GEÇTİ | Noktalı virgül yok, "üç nokta" karışıklığı gitti. |
| 2 | `a1y:y2:01` `degerlendirme_tr[0]` | Görev (6 puan): her madde 2 puan. Madde yazılmış ve anlaşılıyorsa 2 puan. Yazılmış ama tam anlaşılmıyorsa 1 puan. Madde yoksa 0 puan. | Üç maddenin her biri 2 puan. Açık yazdıysam 2, yarım anlaşılıyorsa 1, yazmadıysam 0. | GEÇTİ | Basamaklar ayrı kısa cümleler. |
| 3 | `a1y:y2:01` `degerlendirme_tr[1]` | Anlaşılırlık (2 puan): Almanca bilen biri mesajı bir kez okuyup anlıyorsa 2 puan. Birkaç yerde durup düşünmesi gerekiyorsa 1 puan. Mesajın çoğu anlaşılmıyorsa 0 puan. Küçük yazım hataları puanı düşürmez. | Mesajım bir okumada anlaşılıyorsa 2, zorlanarak anlaşılıyorsa 1, anlaşılmıyorsa 0. Küçük yazım hatası puan kırdırmaz. | GEÇTİ | En uzun cümle 13 kelime. |
| 4 | `a1y:y2:01` `degerlendirme_tr[2]` | Selam ve kapanış (2 puan): uygun bir selam 1 puan. Örnek: **Sehr geehrte Damen und Herren** ya da **Guten Tag**. Uygun bir kapanış ve adın 1 puan. Örnek: **Mit freundlichen Grüßen** ya da **Viele Grüße**. | Başa uygun selam yazarsam 1 puan. Sona uygun kapanış ve adımı yazarsam 1 puan daha. | GEÇTİ | Tırnak ve noktalı virgül yok; hangi "1"in neye ait olduğu artık belli. |
| 5 | `kisimlar[k1].degerlendirme_tr[0]` | Tanıtma (her kart 1 puan): her sözcük için anlaşılır bir cümle söylediysen tam puan. Bir ya da iki bilgi eksikse yarım puan (0,5). Cümle yerine tek sözcük söylediysen de yarım puan. Anlaşılmıyorsa ya da İngilizce konuştuysan 0 puan. | Karttaki her kelime için bir cümle: tam puan. Bir iki bilgi eksik ya da tek kelimeyle cevap: yarım. Anlaşılmaz ya da İngilizce: sıfır. | GEÇTİ | İlk cümle tam 14 kelime (sınırda). |
| 6 | `kisimlar[k1].degerlendirme_tr[1]` | Harf harf söylemek (1 puan): bütün harfler doğru ve anlaşılırsa tam puan. **A wie Anton** gibi bir ad eklemek zorunlu değil. Kişi adı ya da şehir adı eklersen ikisi de doğru. Bir harf yanlışsa yarım puan. Görevli bir kez yeniden sormak zorunda kaldıysa da yarım puan. Harflerin çoğu yanlışsa 0 puan. | Soyadımı harf harf söylerim; hepsi doğruysa tam puan. **Anton** gibi bir ad eklemek şart değil; kişi adı da şehir adı da olur. Bir harf yanlış ya da görevli bir kez yeniden sorduysa yarım, çoğu yanlışsa sıfır. | GEÇTİ | "Heceleme" ve "şehir kodu" gitti; görev metniyle aynı söz. |
| 7 | `a1k:k1:01` `why_tr` | Bazı ülke adlarından önce **der** gelir: **aus der Türkei**, **aus der Ukraine**. | Bazı ülkelerin adından önce **der** söylenir; örneğin **aus der Türkei**. | GEÇTİ | Tek fikir; görünmeyen cevaba gönderme yok. |
| 8 | `a1k:k1:02` `why_tr` | Meslek söylerken **ein** kullanılmaz: **Ich bin Fahrer**, **Ich arbeite als Köchin**. | Mesleğimi söylerken **ein** demem: **Ich bin Fahrer**. | GEÇTİ | |
| 9 | `a1k:k1:03` `situation_tr` | Görevli soyadını harf harf söylemeni istiyor. Kendi soyadını harf harf söyle. | Görevli istiyor, ben de kendi soyadımı harf harf söyleyeceğim. | GEÇTİ | Parantezli öğretmen notu çıktı. |
| 10 | `a1k:k1:03` `why_tr` | Harfleri Almanca söyle: **E** için **e**, **I** için **i**, **R** için **er**. Anlaşılmazsa **B wie Berta** ya da **B wie Berlin** diye ekle. İkisi de doğru. | Harfleri Almanca okuyuşuyla söylerim, **R** harfine **er** derim. Anlaşılmazsa **B wie Berta** gibi bir ad ya da şehirle desteklerim. | GEÇTİ | İki kısa cümle ama aynı iş: harfleri anlaşılır söylemek (1. turdaki yön: "iki ayrı kısa cümle"). Sembol yok, cümleler ≤ 12 kelime. |
| 11 | `kisimlar[k2].yonerge_tr` | Hazırlık yok. Sana bir konu ve bir sözcük kartı verilir. Bu sözcükle karşındaki kişiye bir soru sor. Karşındaki kişi sana soru sorarsa cevap ver. Hem **du** hem **Sie** olur. | Karttaki kelimeyle karşımdakine bir soru soracağım. O bana sorarsa cevap vereceğim. **du** da diyebilirim **Sie** de. | GEÇTİ | Tırnak gitti; "partner" yerine "karşındaki kişi". |
| 12 | `kisimlar[k2].degerlendirme_tr[1]` | Tam puan: kart sözcüğünü kullanan, konuya uyan ve anlaşılan bir soru. Ya da soruya uyan, anlaşılan, tam bir cevap. | Kart kelimesiyle, konuya uygun, anlaşılır bir soru ya da düzgün tam bir cevap: tam puan. | GEÇTİ | |
| 13 | `kisimlar[k2].degerlendirme_tr[2]` | Yarım puan (0,5): anlaşılıyor ama cümle bozuk. Örneğin sözcükler yanlış sırada. Cevap tek sözcükse de yarım puan. | Anlaşılıyor ama cümle bozuksa ya da tek kelimeyle cevap verdiysem yarım puan. | GEÇTİ | |
| 14 | `a1k:k2:01` `situation_tr` | Konu: Yemek ve içmek. Kartta **Frühstück** (kahvaltı) yazıyor. Karşındaki kişiye bu sözcükle bir soru sor. | Kahvaltıyla ilgili karşımdakine bir soru soracağım. | GEÇTİ | |
| 15 | `a1k:k2:01` `why_tr` | Soru **Was**, **Wann** ya da **Frühstückst du** gibi başlar. | Soruma **Was**, **Wann** ya da **Frühstückst du** ile başlayabilirim. | GEÇTİ | "fiil" terimi gitti, örnekle gösteriliyor. |
| 16 | `a1k:k2:02` `situation_tr` | Konu: Yemek ve içmek. Karşındaki kişinin kartında **Bäckerei** (fırın) yazıyor ve sana soru soruyor. Cevap ver. | Karşımdakinin kartında fırın var, bana fırınla ilgili soru soruyor; cevap vereceğim. | GEÇTİ | |
| 17 | `a1k:k2:03` `situation_tr` | Konu: Yemek ve içmek. Kartta **Restaurant** yazıyor. Karşındaki kişiye bu sözcükle bir soru sor. | Restoranla ilgili bir soru soracağım. | GEÇTİ | |
| 18 | `a1k:k2:04` `situation_tr` | Konu: Benim günüm. Kartta **Wochenende** (hafta sonu) yazıyor. Karşındaki kişiye bu sözcükle bir soru sor. | Hafta sonuyla ilgili bir soru soracağım. | GEÇTİ | |
| 19 | `a1k:k2:05` `situation_tr` | Konu: Benim günüm. Karşındaki kişinin kartında **gestern** (dün) yazıyor ve sana soru soruyor. Cevap ver. | Bana dünle ilgili soru soruyor; cevap vereceğim. | GEÇTİ | |
| 20 | `a1k:k2:05` `why_tr` | Dün için **habe gemacht**, **habe gekocht** ya da **war** kullan. | Dünü anlatırken **habe gemacht**, **habe gekocht** ya da **war** derim. | GEÇTİ | Eğik çizgi ve tırnak gitti. Not (karar değil): **…** çıkınca araya söz girdiği bilgisi de çıktı; **Ich habe gekocht** doğru bir cümle olduğu için yanlış öğretmiyor. |
| 21 | `a1k:k2:06` `situation_tr` | Konu: Benim günüm. Karşındaki kişinin kartında **aufstehen** (kalkmak) yazıyor ve sana soru soruyor. Cevap ver. | Bana kaçta kalktığımı soruyor; cevap vereceğim. | GEÇTİ | |
| 22 | `a1k:k2:06` `why_tr` | **auf** sözcüğü cümlenin sonuna gider: **Ich stehe um sechs Uhr auf**. | **auf** en sona gelir: **Ich stehe um sechs Uhr auf**. | GEÇTİ | |
| 23 | `kisimlar[k3].degerlendirme_tr[1]` | Rica, tam puan: resme uyan, kibar ve anlaşılan bir rica. Kibar sözlere örnek: **bitte**, **Können Sie**, **Ich hätte gern**. | Resme uygun, kibar ve anlaşılır bir istek tam puan; **bitte** gibi kibar sözler kullanırım. | GEÇTİ | |
| 24 | `kisimlar[k3].degerlendirme_tr[2]` | Cevap, tam puan: ricaya uyan bir kabul ya da kibar bir ret. Kibar ret örneği: **Tut mir leid**. | İsteği kabul edersem ya da kibarca reddedersem tam puan; ret için **Tut mir leid** derim. | GEÇTİ | |
| 25 | `a1k:k3:01` `situation_tr` | Resim: bir telefon ve restoranda iki kişilik bir masa. Altında **Samstag** yazıyor. Restoranı arıyorsun. Masa ayırt. | Restoranı arayıp cumartesi için iki kişilik masa ayırtacağım. | GEÇTİ | |
| 26 | `a1k:k3:04` `why_tr` | Numaranı söylüyorsan rakamları tek tek ya da ikişer ikişer söyle. | Telefon numaramı rakam rakam ya da ikişer ikişer söylerim. | GEÇTİ | Görünmeyen cevaba gönderme gitti. |

### "Partner" geçen 4 alan

| Kimlik · alan | Yeni metin | Kendi sözlerimle | Karar |
|---|---|---|---|
| `kisimlar[k3].yonerge_tr` | Hazırlık yok. Kartta bir resim tarif edilir. Resme göre karşındaki kişiden kibarca bir şey iste. Karşındaki kişi senden bir şey isterse cevap ver. Kabul et ya da kibarca hayır de. | Resme göre karşımdakinden kibarca bir şey isteyeceğim. O benden isterse kabul edeceğim ya da kibarca hayır diyeceğim. | GEÇTİ |
| `a1k:k3:04` `situation_tr` | Karşındaki kişinin kartında bir telefon resmi var. Senden bir şey istiyor. Cevap ver. | Karşımdaki telefonla ilgili bir şey istiyor (numaram); cevap vereceğim. | GEÇTİ |
| `a1k:k3:05` `situation_tr` | Karşındaki kişinin kartında bir koli resmi var. Komşun olarak senden bir şey istiyor. Cevap ver. | Komşum bir koliyle ilgili benden bir şey istiyor; cevap vereceğim. | GEÇTİ |
| `a1k:k3:06` `situation_tr` | Karşındaki kişinin kartında ekmek resmi var. Senden bir şey istiyor. Cevap ver. | Karşımdaki ekmekle ilgili bir şey istiyor; cevap vereceğim. | GEÇTİ |

### Koşullu alanlar (öğretmen notu olabilir; sayıma katılmadı)

Web uygulamasında bu dosyayı gösteren ekran hâlâ yok (`web/src` içinde `note_tr` ya da `puanlama_tr` okuyan sınav ekranı bulunmadı).

| Alan | Yeni metin (kısa) | Kendi sözlerimle | Karar (görünürse) | Neden |
|---|---|---|---|---|
| `puanlama_tr` | Her bölümde aldığın puan 25 üzerinden hesaplanır. Örneğin bir bölümde puanların yarısını alırsan, sonuç 12,5 puan olur. Geçmek için toplam en az 60 puan gerekir. Konuşma bölümünden ayrıca en az 15 puan gerekir. Konuşmadaki eksik başka bölümle kapatılamaz. | Her bölüm 25 puan üzerinden. Geçmek için toplam 60 ve konuşmadan en az 15 lazım. Konuşma zayıfsa diğer bölümler kurtarmaz. | GEÇTİ | Sembol ve "ham puan" gitti; cümleler ≤ 11 kelime; örnek hesap anlaşılır. |
| `note_tr` | Bu deneme derslerden bağımsız yazıldı (PM-087 B.2). … Dinlemede **kanit** ses satırının sırasıdır. … Konuşmadaki **accepted** listeleri yalnız örnek cevaptır. … Puan **degerlendirme_tr** ölçütüyle verilir. k1:01, k1:02, k1:03 ve k3:04 … | Yazarlara ve uygulamaya not: hangi alan ne demek, örnek cevaplar gösterilmez. | **GERİ** (yalnız görünürse) | Cümleler artık kısa ve sembolsüz; ama içerik hâlâ öğretmen notu: belge numarası, alan adları (**kanit**, **accepted**, **degerlendirme_tr**), madde kimlikleri, "sayım 0'dan başlar". Öğrenciye gösterilmemeli; gösterilmedikçe karar etkilemez. |

### Düzeltmenin getirdiği yeni sorun

Yok. Okuduğum hiçbir yeni metinde tırnak içinde Almanca, noktalı virgül, `=`, `…`, eğik çizgi ya da dilbilgisi terimi kalmadı. 14 kelimeyi aşan cümle yok (en uzunu k1 `degerlendirme_tr[0]` ilk cümlesi, tam 14). Yalnız iki not (karar değil):
- k2:05 `why_tr`: **…** çıkınca **habe** ile **gemacht** arasına söz girebildiği bilgisi de gitti. Yanlış öğretmiyor.
- "Karşındaki kişi"nin uygulamada kim olduğu (yapay zekâ mı, kayıt mı) metinden hâlâ anlaşılmıyor. Bu, açıklamanın değil ekranın işi.

### 2. tur sonucu

| | |
|---|---|
| Yeniden okunan | 30 (26 GERİ + 4 "partner" alanı) |
| GEÇTİ | 30 |
| GERİ | 0 |
| Koşullu | `puanlama_tr` görünürse GEÇTİ · `note_tr` görünürse GERİ (öğrenciye gösterilmemeli) |

OD-9.4: okur GERİ'si kalmadı; `note_tr` öğrenciye gösterilmediği sürece dosya okur kapısından geçer.

OKUR: GEÇTİ
