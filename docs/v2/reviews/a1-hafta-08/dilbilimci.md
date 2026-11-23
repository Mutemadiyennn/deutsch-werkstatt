# A1 8. hafta (50.–54. gün) ve görülmemiş durumlar: dilbilimci incelemesi

Tarih: 2026-11-23 · Tur: 1 (tam tur) · İnceleyen: dilbilimci-ajan
Dosyalar: `content/v2/m1/gun-50.json` … `gun-54.json`, `content/v2/m1/gorulmemis-08.json`

## Kapsam
İncelenen öğe: **514** (gün 50: 103, 51: 104, 52: 99, 53: 100, 54: 104, görülmemiş: 4). Öğe: Almanca satır, soru, dikte maddesi, prova düğümü ya da seçeneği, sınav maddesi, görev. Her öğenin `accepted`, çeviri ve açıklama alanları birlikte okundu.

Gerçek hata: **18** (20 alan). Hata oranı: 18 / 514 = **%3,5**. Ayrıca 3 iyileştirme (hata sayılmadı).

## Düzeltilen hatalar (önce → sonra)

### 50. gün
1. **a1 cevapla, kabul:** `Am Freitag um acht Uhr fünfzehn geht.` → `… geht es.` Özne eksikti.
2. **Prova `durum_tr`:** aynı sesli mesaja a1 cevapla "cuma 8.15 uyuyor" derken prova "cuma sabahı işin var" diyordu. → `Bu kez cuma sabahı işin var, o saat sana uymuyor.` Prova ayrı bir olasılık olarak işaretlendi.
3. **Prova n1:** `Sie sprechen mit Huber.` → `Sie sprechen mit Frau Huber.` Bu kalıpta soyad tek başına söylenmez. Çeviri de uyarlandı.
4. **Prova n2, seçenek çevirisi:** `Sekize çeyrek var mı?` → `Sekize çeyrek kala mı?` Eski çeviri "saat sekize çeyrek var mı" diye anlaşılıyordu.

### 51. gün
5. **a2 (Ioana'nın mesajı), saat çelişkisi:** göl otobüsü 9.25'te geliyor (a1), Ioana ise `halb zehn` (9.30) diyor ve beklemenizi istiyordu; beklerseniz otobüs kaçıyordu. → `Ich bin erst um Viertel nach neun am Bahnhof.` Buna bağlı alanlar: çeviri, ayrıntı şıkları (9.15 / 9.00 / 9.45), dikte d4, d5 örneği, `eylem.why_tr`. d5 `zorunlu` → `Verspätung`, `Bahnhof` (ilk denemede `Viertel nach neun` 5. günle aynı üretim cümlesi sayıldı; değiştirildi).
6. **Yazma `kontrol_tr`:** `**Ich komme … mit**` → `**Ich komme mit**`. OD-9.2: açıklamada üç nokta olmaz.

### 52. gün
7. **Prova n2b:** Basti pazarı öneriyor, öğrenci pazarı kabul ediyor, ama kapanış `Bis Samstag!` ve `bis Samstag um drei!` idi. → n2b: `Schade! Wandern kannst du auch am Sonntag. Am Samstag spielt meine Mannschaft!` Seçenek: `Okay, ich komme mit. Was kostet die Karte?` (4 kabul). Artık iki yol da cumartesiye çıkıyor.
8. **a2 c3:** `… und ich habe zehn Euro.` → `… und ich habe nur zehn Euro.` **nur** olmadan cümle "ama" ile bağlanmıyordu. **nur** günün kalıbında var (`Bei mir nur …`); sınama temiz.
9. **a2 d5 örneği:** `Frau Brandl möchte zwanzig Euro leihen.` → `Frau Brandl braucht zwanzig Euro.` **leihen** tek başına "ödünç vermek" de demek; cümle iki anlamlıydı.
10. **Okuma o4:** kabul `Ja, im Bad ist das Wasser kaputt.` yanlış Almanca (su bozulmaz) → `Im Bad ist etwas kaputt, Herr Pichler.` Durum metni "musluk" diyordu, öğrenci bu kelimeyi bilmiyor → `banyoda bir şey bozuldu`.
11. **Sınav s7, kabul:** `Die Mannschaft spielt heute, ja.` çeviri değil → `Unsere Mannschaft spielt heute.`

### 53. gün
12. **v1 cevapla:** durum "Cumartesi göldeydin" diyordu; gezi pazar günü (51. gün, bu günün sahnesi, a1, prova, s11). → `Pazar göldeydin`; 6 kabul **am Sonntag** ile yeniden yazıldı (prova n2 ile aynı satır olmasın diye sıra ve biçim farklı).
13. **a2 cevapla:** "Cumartesi gecesi evde değildin, göldeydin" aynı çelişki. → gerekçe çıkarıldı: `Cumartesi gecesi evde değildin. Adını söyle ve bunu anlat.` 5 kabulden `Ich war am See` atıldı; son kabule ad eklendi.
14. **Yazma metni, gönderen:** Ioana `Am Sonntag war ich zu Hause` yazıyor ve hafta sonunu soruyordu; oysa pazar günü geziye seninle geldi (51. gün sahne ve a2). → gönderen **Derya** (geziye gelmedi; pazartesi sabahı Tobi'ye de aynı soruyu soruyor). Başlık, soru, görev, örnek uyarlandı; `characters` listesinden `ch:popescu` çıktı.
15. **Prova n2:** `Und du, wie war dein Wochenende?` → `Und, wie war dein Wochenende?` Karşı taraf kendi hafta sonunu anlatmadan "ya sen" diyemez.

### 54. gün
16. **Kalıp ve görev çevirisi (2 alan):** `ayırtabilir misiniz`, `ayırtıyorum` → `ayırabilir misiniz`, `ayırıyorum`. Eczacı ilacı kendisi ayırır; "ayırtmak" başkasına yaptırmaktır. (`Ich möchte ein Zimmer reservieren` → "ayırtmak istiyorum" doğru, dokunulmadı.)
17. **a1 cevapla, kabul:** `Guten Tag! Ich komme morgen um zehn für die Salbe.` → `Guten Tag, hier ist {name}. Ich hole die Salbe morgen um zehn Uhr.` **für die Salbe** burada Almanca değil; ayrıca görev ad istiyor.
18. **a2 cevapla ve d5 örneği (2 alan):** `Ist die Apotheke am Sonntag da?`, `… ist die Apotheke bis dreizehn Uhr da.` → **geöffnet** (37. günde öğretildi). Bir dükkân için **da sein** denmez; kayıttaki `sind wir … da` (kişiler) doğru, dokunulmadı.

## İyileştirmeler (hata değil)
- 54. gün halka: kabul `Die Salbe ist reserviert, für Sie.` → `Für Sie ist die Salbe reserviert.`
- Görülmemiş g1: +1 kabul (`Ich möchte einen Tisch reservieren. Am Samstag, für vier Personen.`).
- Görülmemiş g4: +2 kabul (`Mein Rücken tut weh.`, `Nein, mein Rücken tut weh.`). 54. günün kalıbı; öğrencinin en olası cevabı buydu, haksız ret riski vardı.

## Yazarın açık sorularına cevap
- **Frau Brandl'ın halısı ve düşmesi:** WORLD 8. hafta satırıyla ("düşer, eczaneden ilacını getirmeni ister") ve karakterle (79 yaş, **Sie**, Brunnengasse 7) uyumlu. Halı ipliği tutarlı: salı 9.30 teslim (50) → salı sabahı nakit (52) → düşme "gestern Abend" (54). Bairisch yok. Onay.
- **Adsız roller:** der Verkäufer, die Verkäuferin, der Kellner, die Apothekerin kabul. Tek zayıf yer aşağıda (açık nokta 1).
- **53. günün 5 kalıbı:** kabul. Dördü görevlerde üretiliyor; **nach Hause** yalnız gösterimde (s13). Beş, bir halka için üst sınır; bundan sonraki haftalarda aşılmasın.
- **Dikte satırın bir cümlesi:** birkaç `zor`/`usta` maddesi iki cümlelik satırın tek cümlesini yazdırıyor (ör. 50 d3, d4). `m1check` buna izin veriyor ("satırın kendisi ya da bir cümlesi"); hata sayılmadı.

## Görülmemiş durumlar
- Üç zorunlu durum var: telefonda masa (g1), dükkânda ürün (g2), yeni biriyle tanışma (g3); ek g4.
- Derste geçmiyor: 50.–54. günlerde restoran masası ayırtma, süpermarket, parti, spor salonunda ağrı yok (53. günde yalnız "Boş masa yoktu" çeldiricisi var).
- Kalıplar başka kişi ve yerde öğretilmiş: **reservieren** (54: merhem, otel odası), **Wo ist …?** (51 ve önceki haftalar), **Ich bin / Ich heiße** (53 prova, iş yeri), **Schmerzen im … / tut weh** (54).
- Kelimeler K(54) içinde: Tisch 48, Person 41, Milch 16, Rücken 15, Party 41, schlimm 9.
- Lena: `genel-adlar.md` kimliğiyle çelişen bilgi yok.

## Kurallar
- Kişisel bilgi, kurs ya da kitap adı yok. `{name}` ve `{Herr|Frau}` yalnız öğrenciye ait satırlarda ve ona hitapta; `audio_de` içinde yer tutucu yok.
- Bairisch yok; yalnız kabul listelerinde kaynaklı **Grüß Gott**.
- **Sie/du:** Brandl, Pichler, Wimmer, Huber, Stadler, eczacı, satıcılar **Sie**; Tobi, Derya, Ioana, Basti, Luka, yeni iş arkadaşı, Lena **du**. Tutarlı.
- Aynı cümle taraması (1.–7. gün + 50.–54. gün + görülmemiş; `de`, `prompt_de`, `audio_de`): tekrar yok. Bütün `accepted` ≥ 3, liste içi tekrar yok.
- Harf kodlama (50 s10–s11): geleneksel tablo (Berta, Richard, Anton, Nordpol, Dora, Ludwig), doğru.

## Sınama
Görevdeki benzetim komutu, son düzeltmeden sonra:
- 50.–54. gün: yalnız bilinen halka hatası "3 kart (4–6)" (5 adet). "öğretilmemiş", "bilinmeyen", "accepted" uyarısı 0.
- Dikiş: 50.–54. gün satırları (a) (b) (c) (d) biçim = 0.
- Depodaki `npm run content:validate` ayrıca koşulmadı: şema 8. günden sonrasını henüz kabul etmiyor; benzetim şemayı yamalayarak aynı doğrulayıcıyı koşuyor.

## Kalan açık noktalar (engel değil)
1. **53. gün prova, yeni iş arkadaşı adını söylemiyor.** Öğrenci adını söylüyor, karşı taraf yalnız `Freut mich!` diyor. Gerçekte adını da söyler. Ad vermek WORLD ya da `genel-adlar.md` kararıdır (baş geliştirici); bu yüzden dokunulmadı. Öneri: boş adlar listesinden bir ad, n1'e `Ich bin …`.
2. **54. gün a1 c4 `Bitte bringen Sie das Rezept mit.`** Provada reçete eczaneye zaten gösterildi; ertesi gün yeniden istenmesi mümkün ama sık değil. E-reçetede asıl gereken çoğu zaman sigorta kartıdır; ayrıntı sorusunda o çeldirici olarak duruyor. A1 için kabul edilebilir; hukuki iddia yok.
3. **Doğallık, kart kısıtından:** `Mein Gericht ist kalt` (gündelikte **Essen**), `Ich habe eine Beschwerde` (restoranda resmî kaçar), `ich habe leider nur vier Semmeln` (**nur noch** daha doğal). Hepsi doğru Almanca; karşılıkları küme dışında.
4. **53. gün s15 `Wir haben eine Stunde gewartet`** ile a1'deki 18.20 otobüsü tam örtüşmüyor (tren 18.00). Çelişki değil, soruya bağlı değil.
5. **`review.status` "draft" bırakıldı:** halka hatası (3 kart) ve okur (OD-9) adımı duruyor; durum alanını bu adımlardan sonra içerik motoru günceller.
6. Yazar notlarındaki tablo eski bilgileri taşıyor (53. gün "o gece evde değildin" gerekçesi, Ioana'nın 9.30'u); dosya yazara ait, dokunulmadı.

## Sonuç
Bulunan 18 hatanın hepsi düzeltildi ve sınandı. Dilbilim açısından KAPANDI.

Hata oranı: 18 / 514 = %3,5

KARAR: ONAY

## PM-097 ek (ses kanıtları yalnız önceki günlerin sözcükleriyle; dilbilimci-ajan, 2026-11-23)

Kapsam: `gun-50.json` … `gun-54.json` içindeki 10 ses kaydının 10 `ana_fikir`, 20 `ayrinti` ve 10 `eylem` sorusu (40 soru). Ölçüt: `kanit` cümlesi 49. güne kadarki sözcüklerle anlaşılır mı, değilse soru bağlamdan çözülüyor mu. Günün kartları: 50 Aussicht, Teppich, schüchtern · 51 Ausflug, vorhaben, Verspätung · 52 Mannschaft, Bargeld, wandern · 53 Beschwerde, ausfallen, Trinkgeld · 54 Rente, einpacken, reservieren.

### Düzeltilen (3)
| Yer | Önce | Sonra | Gerekçe |
|---|---|---|---|
| 51 a1 `ana_fikir` | `kanit: [c2]` | `kanit: [c2, c3]` | c2 yalnız **Verspätung** (günün kartı) ile anlaşılıyor. c3 (**Er kommt nicht um neun, er kommt um neun Uhr fünfundzwanzig.**) bilinen sözcüklerle "gecikiyor"u veriyor. |
| 52 a1 `ana_fikir` | çeldiriciler "Cumartesi bir pazar", "Cumartesi bir konser"; `kanit: [c1]` | çeldiriciler "Cumartesi kapalı bir eczane", "Cumartesi geciken bir otobüs"; `kanit: [c1, c2]` | **Mannschaft** günün kartı. **spielt** ve **Die Karte kostet …** bir konseri de anlatabilir; eski çeldiricilerle soru çözülmüyordu. Yeni çeldiriciler **spielt** ve bilet cümlesiyle eleniyor. |
| 53 a1 `eylem` | `kanit: [c1, c2, c3]` | `kanit: [c2, c3]` | Cevap (soldaki duraktan 18.20 otobüsü) c2 ve c3'te. c1'deki **fällt … aus** günün kartı, cevap ona dayanmıyor. |

### Dokunulmayan, günün sözcüğünü içeren kanıtlar (bağlamdan çözülüyor)
- 50 a2 `ana_fikir` c2 (**Aussicht**): "otel reklamı" cevabı **Hotel** ve **Zimmer** ile çıkıyor.
- 51 a1 `ayrinti` c2 ve c4, 51 a2 `ana_fikir` c3 ve `ayrinti` c3 (**Verspätung**): soru gecikmeyi kendisi söylüyor ("kaç dakika gecikmeli?", "gecikiyor mu?"); cevap **fünfundzwanzig Minuten**, **dreißig Minuten**, **keine** ile çıkıyor. 51 a2'de c4 ayrıca bilinen sözcüklerle geç kalmayı veriyor.
- 52 a1 `ayrinti` ve `eylem` c4 (**Bargeld**): **bar** (4. gün) ile **Geld** bilinen iki parça; birleşik sözcük çözülüyor.
- 52 a2 `ayrinti` c3 (**Bargeld**): cevap **ich habe nur zehn Euro** bölümünde.
- 53 a1 `ana_fikir` c1 (**fällt … aus**): c2 (**Bitte nehmen Sie den Bus …**) tek uygun seçeneği veriyor.
- 53 a2 `ana_fikir` c2 (**Beschwerde**): c3 (**die Musik … zu laut**) ve **von den Nachbarn** cevabı veriyor.
- 54 a1 `ayrinti` ve `eylem` c3 (**reserviere**): Türkçedeki "rezerve" ile aynı; cevap **bis Freitag**.
- Geri kalan 26 sorunun kanıtında günün sözcüğü yok (50 a1'deki **zurückrufen** 17. günün kartı).

### Sınama
`sim.sh … 50 gun-5[0-4].json gorulmemis-08.json`: 5 hata, hepsi bilinen `3 kart (4–6)`; 50–54 için "öğretilmemiş", "bilinmeyen", "accepted" uyarısı 0; `dikis.out` 50–54 satırları ihlalsiz.

Sonuç: 3 düzeltme / 40 soru. PM-097 md. 1 açısından KAPANDI.
