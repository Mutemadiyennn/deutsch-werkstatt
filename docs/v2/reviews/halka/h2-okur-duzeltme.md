# 2. hafta: okur GERİ satırları, dilbilimci düzeltmesi (OD-9)

Tarih: 2026-11-23 · Düzelten: dilbilimci-ajan · Bağ: İÇ-7, `content/a1-h2`

Kaynak: `docs/v2/reviews/okur/h2-gun-08-11.md` (19 GERİ) ve `docs/v2/reviews/okur/h2-gun-12-14.md` (23 GERİ). Okur raporlarına dokunulmadı.

## Özet

- GERİ satırı: 42. Metni değişen: 41. Karar gereği değişmeyen: 1 (`gr:a1-06:t1 · table.head`, dil noktası tablo başlığındaki yuva işareti serbest).
- GERİ dışı ek dokunuş: 3 satır (aşağıda "Ek" bölümü) ve 15 şıkta "euro" → "avro".
- Almanca metne (de, accepted, script) dokunulmadı. Kabul listeleri değişmedi.
- Ölçüm (`KT="8 9 10 11 12 13 14" kos.sh --tum`): validate 0 hata · dikiş ihlal 0 · kt eksik 0 · kucuk_sozcuk 0 hata.

## Düzeltmeler (yer · önce · sonra)

| # | dosya | yer | önce | sonra |
|---|---|---|---|---|
| 1 | gun-08.json | prova · n3 · seçenek 3 · geri_bildirim_tr | Ekmeği aldın mı, almadın mı? Fiyatı sor ya da tepki ver. | Henüz ödemedin, vedalaşmak için erken. Fiyata tepki ver ya da toplamı sor. |
| 2 | gun-09.json | halkalar[h2] · title_tr | der Kuchen, die Küche | Kek ve mutfak: der Kuchen, die Küche |
| 3 | gun-09.json | prova · kapanis_tr | Fırında ne aldığını söyledin, fiyat sordun ve poşet konusunu hallettin. | Fırında ne istediğini söyledin ve poşet sorusuna cevap verdin. |
| 4 | gun-10.json | halkalar[h1] · title_tr | Telefonda: ararım, başlıyoruz | Sizi arıyorum. Ne zaman başlıyoruz? |
| 5 | gun-10.json | halkalar[h2] · sahne.ortam_tr | Firmada mola. Derya ayağına bakıyor. | Firmada mola. Derya senin ayakkabına bakıyor. |
| 6 | gun-10.json | halkalar[h4] · title_tr | Sağda, solda; ben ısmarlıyorum | Sağda mı, solda mı? Ben ısmarlıyorum! |
| 7 | gun-10.json | sesler[a1] · ana_fikir.opts[0] | Bugün Derya'yı aramanı | Bugün Frau Aksoy'u aramanı |
| 8 | gun-10.json | sesler[a1] · ayrinti[1].q_tr | Derya saat kaça kadar ofiste? | Frau Aksoy saat kaça kadar ofiste? |
| 9 | gun-10.json | sesler[a1] · eylem.opts[0] | Bugün saat beşten önce Derya'yı ara. | Bugün saat beşten önce Frau Aksoy'u ara. |
| 10 | gun-10.json | sesler[a1] · eylem.why_tr | Herr Wimmer Derya'yı bugün aramanı istiyor. Derya beşe kadar ofiste. | Herr Wimmer bugün Frau Aksoy'u aramanı istiyor. Frau Aksoy beşe kadar ofiste. |
| 11 | gun-10.json | prova · kapanis_tr | Telefonda randevunu değiştirdin, yavaş konuşmasını istedin ve kein Termin cevabını anladın. | Pazartesi boş randevu yoktu. Randevunu telefonda salı sabahı sekize aldın. |
| 12 | gun-10.json | gun_sinavi[s5] · why_tr | Hiç derken **kein** dersin: **kein Wort**. | Tek kelime anlamıyorum derken **kein Wort** dersin. |
| 13 | gun-11.json | sesler[a2] · ana_fikir.opts[0] | Yarın otobüse binmiyor, Derya'yla gidiyor; sen de gel | Yarın Derya'nın arabasıyla gidiyor, seni de çağırıyor |
| 14 | gun-11.json | prova · kapanis_tr | Kibarca kaç tane istediğini söyledin, eksik kalınca başka bir şey seçtin ve ödedin. | Kaç tane istediğini kibarca söyledin, sekiz küçük ekmek aldın ve ödedin. |
| 15 | dn-02.json | dn:kucuk-sozcukler · tr (8. cümle) | Bu sözcükler çoğu zaman fiilin hemen arkasına gelir. | Cümledeki yerlerini örneklerden öğren: **Ich komme gleich**. |
| 16 | dn-02.json | dn:kucuk-sozcukler · table doch satırı | hadi, ama (isteği yumuşatır ya da karşı çıkar) | hadi (isteği yumuşatır) |
| 17 | grammar.json | gr:a1-03:t2 · tr (1. cümle) | Bir ismi olumsuz yapmak için **nicht ein** demezsin, **kein** dersin. | Değil ya da yok derken **nicht ein** demezsin, **kein** dersin. |
| 18 | grammar.json | gr:a1-03:t2 · tr (5. cümle) | **der** ve **das** alan isimlerde **kein**, **die** alan isimlerde ve çoklukta **keine** dersin. | **der** ve **das** alan isimlerde **kein** dersin. **die** alan isimlerde ve birden çok şeyde **keine** dersin. |
| 19 | grammar.json | gr:a1-03:t4 · tr (4. cümle) | İki fiilde de **ich** ve **er**, **sie**, **es** biçimi aynıdır. | **möchte** ve **mag**, **ich** ile de **er** ile de aynıdır. |
| 20 | gun-12.json | sesler[a2] · cevapla.why_tr | Saat aralığını **von … bis …** ile söylersin. | Saat aralığını **von acht bis elf** gibi söylersin. |
| 21 | gun-12.json | gun_sinavi[s4] · why_tr | Arkadaşına **du** dersin: **Gehst du …?** | Arkadaşına **du** dersin, soru **Gehst du** ile başlar. |
| 22 | gun-12.json | gun_sinavi[s6] · why_tr | **wir** ile **hätten** dersin: **Wir hätten gern …** | **wir** ile **hätten** dersin: **Wir hätten gern die Rechnung**. |
| 23 | gun-12.json | gun_sinavi[s9] · why_tr | Önce selam ver, sonra **Ich hätte gern …** de. | Önce selam ver, sonra **Ich hätte gern einen Kuchen** de. |
| 24 | gun-13.json | prova · n3 · seçenek 3 · geri_bildirim_tr | Ioana **senin** numaranı soruyor. **Meine Nummer ist …** de. | Ioana **senin** numaranı soruyor. Cevaba **Meine Nummer ist** diye başla. |
| 25 | gun-14.json | sahne · cevapla.why_tr | Fırında **Geben Sie mir bitte …** ya da **Ich hätte gern …** dersin. | Fırında **Geben Sie mir bitte** ya da **Ich hätte gern** ile istersin. |
| 26 | gun-14.json | prova · n2 · seçenek 2 · geri_bildirim_tr | Olur. **Gibt es …?** ile bir şeyin olup olmadığını sorarsın. | Olur. **Gibt es Kuchen?** pasta var mı demek. |
| 27 | gun-14.json | prova · n3 · seçenek 1 · geri_bildirim_tr | Çok iyi. **zu teuer** ve **den Kuchen**: belli bir pasta. | Çok iyi. Belli bir pastayı isterken **den Kuchen** dersin. |
| 28 | gun-14.json | gun_sinavi[s1] · why_tr | Fırında kibar istek: **Geben Sie mir bitte …** | Fırında kibarca isterken **Geben Sie mir bitte** dersin. |
| 29 | gun-14.json | gun_sinavi[s4] · why_tr | Bir şey var mı diye **Gibt es …?** ile sorarsın. | Bir şey var mı diye sorarken **Gibt es** dersin. |
| 30 | gun-14.json | gun_sinavi[s5] · why_tr | Ben de derken **auch** fiilden sonra gelir: **Ich möchte auch …** | Ben de derken **auch** dersin: **Ich möchte auch eine Semmel**. |
| 31 | gun-14.json | gun_sinavi[s11] · why_tr | Önce selam, sonra istek: **einen Kuchen**. Fiyat için **Was kostet …?** | Önce selam ver, sonra pastayı iste. Fiyatı **Was kostet der Kuchen?** diye sor. |
| 32 | hafta-sonu-testi-02.json | t01 · why_tr | **der Kuchen** isterken **einen Kuchen** olur. Birden çok küçük ekmek: **zwei Semmeln**. | **der Kuchen** isterken **einen Kuchen** olur. |
| 33 | hafta-sonu-testi-02.json | t02 · why_tr | **hätten** ikinci yerde durur: **Wir hätten gern** … | **Wir** ile başlarsan hemen arkasından **hätten** gelir: **Wir hätten gern die Rechnung**. |
| 34 | hafta-sonu-testi-02.json | t03 · why_tr | **der Kurs** alan isimde **mein Kurs** dersin. | **der** alan isimde **mein** dersin: **mein Kurs**. |
| 35 | hafta-sonu-testi-02.json | t09 · why_tr | Bir … daha derken **noch ein …** dersin. | Bir ekmek daha derken **noch ein Brot** dersin. |
| 36 | gorulmemis-02.json | g2 · why_tr | Her ismi kendi artikeliyle söyle: **der Kuchen**, **das Brot**. | Pastaya **der Kuchen**, ekmeğe **das Brot** dersin. |
| 37 | gorulmemis-02.json | g3 · why_tr | Önce adını söyle. Sonra **Haben Sie … einen Termin frei?** diye sor. | Önce adını söyle. Sonra **Haben Sie am Samstag einen Termin frei?** diye sor. |
| 38 | gorulmemis-02.json | g6 · why_tr | **deine Karte** sorusuna **meine Karte** ile cevap verirsin. **'ne** konuşmada **eine** demektir. | **deine Karte** sorusuna **meine Karte** ile cevap verirsin. |
| 39 | grammar.json | gr:a1-02:t1 · tr (5. cümle) | **die** alan isimlerde ve birden çok şeyde **meine** ve **deine** dersin: **meine Karte**. | **die** alan isimlerde **meine** ve **deine** dersin: **meine Karte**. Birden çok şeyde de öyledir: **meine Eltern**. |
| 40 | grammar.json | gr:a1-02:t1 · tr (6. cümle) | **Sie** dediğin kişide sizin demek için **Ihr** ya da **Ihre** dersin: **Wie ist Ihre Nummer?** | Sizin derken **Ihr** ya da **Ihre** dersin: **Wie ist Ihre Nummer?** |
| 41 | grammar.json | gr:a1-06:t1 · tr (1. cümle) | Bir şeyi istediğinde, aldığında ya da sende olduğunda yalnızca **der** alan isimler değişir. | Bir şeyi istediğinde, gördüğünde ya da sevdiğinde yalnızca **der** alan isimler değişir. |
| 42 | grammar.json | gr:a1-06:t1 · tr (2. cümle) | **der** yerine **den**, **ein** yerine **einen**, **kein** yerine **keinen** dersin: **Ich hätte gern einen Kuchen**. | **der** yerine **den**, **ein** yerine **einen**, **kein** yerine **keinen** dersin. Örnek: **Ich hätte gern einen Kuchen**. |
| 43 | grammar.json | gr:a1-12:t2 · h_tr | Kibar istek: Ich hätte gern … | Kibar istek: Ich hätte gern einen Termin |

Not: `gr:a1-02:t1.tr` ve `gr:a1-06:t1.tr` okur raporunda birer satırdır, burada ikişer cümle olarak yazıldı (43 kayıt, 41 GERİ satırı).

## Ek (GERİ değil, aynı kökten)

| dosya | yer | önce | sonra | neden |
|---|---|---|---|---|
| gun-10.json | sesler[a1] · cevapla.situation_tr (ek: iki adın bağı) | Derya'yı arıyorsun. Adını söyle, yarın dokuzda randevu olduğunu söyle. | İş arkadaşın Derya Aksoy'u arıyorsun. Adını söyle, yarın dokuzda randevu olduğunu söyle. | K10: Frau Aksoy ile Derya bağı ilk kez burada açıkça kuruluyor (WORLD: Derya Aksoy, iş arkadaşı). Karşı replik Hier ist Derya. |
| grammar.json | gr:a1-02:t1 · h_tr | mein, dein: benim, senin | mein, dein, Ihr: benim, senin, sizin | Ihr ve Ihre yalnız bu derste öğretiliyor (9., 10., 12. günde geçiyor), silinmedi. Başlığa alındı, böylece ders konusunun içinde. |

### euro → avro (15 şık)

| dosya | yer | önce | sonra |
|---|---|---|---|
| gun-12.json | `sahne.bolumler[0].ayrinti[1].opts[0]` | Otuz iki euroluk pastayı | Otuz iki avroluk pastayı |
| gun-12.json | `sahne.bolumler[0].ayrinti[1].opts[1]` | Yirmi euroluk pastayı | Yirmi avroluk pastayı |
| gun-13.json | `sahne.bolumler[0].ayrinti[0].opts[0]` | Yirmi euro | Yirmi avro |
| gun-13.json | `sahne.bolumler[0].ayrinti[0].opts[1]` | On iki euro | On iki avro |
| gun-13.json | `okuma_yazma.sorular[2].opts[1]` | Yirmi euro | Yirmi avro |
| gun-13.json | `okuma_yazma.sorular[2].opts[2]` | On euro | On avro |
| gun-14.json | `sahne.bolumler[0].ayrinti[0].opts[0]` | On iki euro elli | On iki avro elli |
| gun-14.json | `sahne.bolumler[0].ayrinti[0].opts[1]` | Dört euro | Dört avro |
| gun-14.json | `sahne.bolumler[0].ayrinti[0].opts[2]` | Yedi euro seksen | Yedi avro seksen |
| gun-14.json | `sahne.bolumler[0].ayrinti[1].opts[0]` | Yedi euro seksen | Yedi avro seksen |
| gun-14.json | `sahne.bolumler[0].ayrinti[1].opts[1]` | On iki euro elli | On iki avro elli |
| gun-14.json | `sahne.bolumler[0].ayrinti[1].opts[2]` | Dört euro | Dört avro |
| gun-14.json | `okuma_yazma.sorular[2].opts[0]` | On euro | On avro |
| gun-14.json | `okuma_yazma.sorular[2].opts[1]` | On iki euro | On iki avro |
| gun-14.json | `okuma_yazma.sorular[2].opts[2]` | Dört euro | Dört avro |

## Gerekçeler (kök bazında)

- **K10 iki ad:** 10. gün a1 sorularında sesli mesajdaki ad kullanıldı (Frau Aksoy). Bağ, geri arama durumunda verildi (Derya Aksoy).
- **K11 prova kapanışı:** üç kapanış her yolda doğru olan olayı söylüyor. G09: fiyat sorma çıktı. G10: yavaşlatma isteği çıktı, sonuç (salı sekiz) yazıldı. G11: iki yolda da sekiz küçük ekmek alınıyor.
- **K12 terim:** fiil, biçim, çokluk, artikel, "ismi olumsuz yapmak" örnekle değiştirildi.
- **Üç nokta:** açıklama alanlarında somut sözcükle yazıldı. Örnekler maddenin kendi cümlesinden alındı.
- **t02:** "ikinci yer" kuralı kalktı. Yeni açıklama yalnız **Wir** ile başlayan cümleyi anlatıyor, kabul edilen **Die Rechnung hätten wir gern** ile çelişmiyor.
- **G14 s5:** "**auch** fiilden sonra gelir" kuralı kabul listesiyle de çelişiyordu (**Ich hätte gern auch eine Semmel**). Yer kuralı çıkarıldı.
- **dn:kucuk-sozcukler 8. cümle:** "hemen arkasına gelir" genellemesi örneklerin hepsini tutmuyordu (**Haben Sie noch Semmeln?**). Kural yerine örneğe yönlendirildi.
- **Tek fikir:** t01 (çokluk notu), g6 (**'ne** notu, `dn:kisaltma-1` zaten öğretiyor), G14 n3 (**zu teuer** övgüsü) ve doch satırındaki ikinci iş çıkarıldı.
- **gr:a1-06:t1 1. cümle:** aynı ekrandaki örneklere uysun diye görmek ve sevmek eklendi. Sahip olmak 6. cümlede (**haben**) duruyor.

## Kalan şüpheler

1. **Kuchen** 9. günde "kek", 12.–14. günde "pasta" diye çevriliyor. Okur GERİ vermedi, dokunulmadı. Tek karşılık seçilmeli.
2. `gr:a1-03:t2 · table.head` hâlâ "olumlu / olumsuz". Okur GEÇTİ verdi, dokunulmadı.
3. 11. günde "çokluk" beş yerde duruyor (prova n1, yazma kontrolü, s3, s5, s11). Okur o gün için GEÇTİ verdi (dersin başlığı "Birden çok").
4. G09 prova n2 seçenek 3'ün Türkçesi "(yanlış) Kek ne kadar?" seçimden önce görünüyorsa cevabı ele veriyor (okur notu, GERİ değil). Arayüz sorusu.
5. G12 prova n3[0]: adsız ekranda geri bildirim "soyadın" diyor (okur notu, GERİ değil).

## Sonuç

AÇIK: düzeltmeler okurun ikinci okumasını bekliyor (`/tmp/iç7/okur2.md`). Dil açısından açık hata yok. `review.status` değiştirilmedi.
