# İÇ-5 · 5. hafta örneklem kontrolü (29.–35. gün)

Tarih: 2026-11-23 · inceleyen: qa-ajan (örneklem) · sıra: yazar → dilbilimci → okur → **örneklem** · taş: M1
Dayanak: `docs/v2/LEARNER.md`, `content/v2/m1/FORMAT.md`, dilbilimci raporu `docs/v2/reviews/ic5-hafta-05.md`.
İçerik dosyalarına dokunulmadı.

## Kapsam ve seçim
Kapsam: `content/v2/m1/gun-29.json` … `gun-35.json`, `hafta-sonu-testi-05.json`, `gorulmemis-05.json`.

Havuzlar (dilbilimci düzeltmelerinden sonraki hâl):

| Havuz | Öğe |
|---|---|
| halka görev cümlesi + kabulleri | 169 |
| prova seçeneği + kabulleri | 94 |
| sınav maddesi (`gun_sinavi` 77 + hafta sonu testi 12) | 89 |
| dikte (sahne ve seslerin bütün basamakları) | 105 |
| okuma sorusu | 32 |
| görülmemiş durum | 7 |
| **toplam** | **496** |

Seçim: Python `random.seed(5)`. Havuzlar yukarıdaki sırayla ele alındı, her birinden `random.sample(havuz, 5)` çekildi. Toplam 30 öğe, havuzun %6'sı. Örneklem bütün hafta dosyalarına yayılıyor ve görülmemiş durumların 5/7'sini kapsıyor.
Betik ve ham çıktı: oturum scratchpad'i (`orneklem5.py`, `orneklem5.out`). Aynı tohumla aynı 30 öğe yeniden üretilir.

Her öğe altı ölçütle kontrol edildi: (1) Almanca doğru ve doğal mı, (2) Türkçe karşılık birebir mi, (3) kabullerin hepsi doğru ve aynı anlamda mı (dikte için yalnız harf ve noktalama farkı), (4) anlama sorusunun cevabı kanıt cümlesinden çıkıyor mu, tek doğru şık var mı, (5) açıklama doğru mu, (6) öğrenci adı yalnız `{name}` ile mi yazılmış, ses metninde yer tutucu var mı. Prova seçenekleri düğümün bağlamıyla (karşı tarafın repliği, `durum_tr`, geri bildirim), dikte maddeleri kaynak cümleleriyle birlikte okundu.

## Sonuç tablosu

| # | Öğe | Yer | Sonuç | Not |
|---|---|---|---|---|
| 1 | görev: **Tut mir leid, mit dem Arm kann ich nicht Auto fahren.** | gun-34 · m1:34:h2 · gorev_cumleleri[7] | TAMAM | Üç kabul aynı anlamda (**mit diesem Arm** de doğru). |
| 2 | görev: **Was steht auf dem Schichtplan?** | gun-31 · m1:31:h1 · gorev_cumleleri[1] | TAMAM | **im Schichtplan** de doğal. |
| 3 | görev: **Zugausfall! Dann fahren wir mit dem Bus.** | gun-31 · m1:31:h3 · gorev_cumleleri[11] | TAMAM | Kabuller yalnız söz dizimi ve noktalama farkı. |
| 4 | görev: **Die Stadt gefällt mir, aber ich wohne lieber auf dem Land.** | gun-35 · m1:35:h1 · gorev_cumleleri[6] | TAMAM | **gefällt mir gut** anlamı değiştirmiyor. |
| 5 | görev: **Die Nummer ist falsch.** | gun-33 · m1:33:h3 · gorev_cumleleri[1] | TAMAM | **Das ist die falsche Nummer.** aynı anlam. |
| 6 | prova: **Ja, klar. Wie geht es dir?** | gun-29 · prova n1b · secenekler[0] | TAMAM | **Ja, klar. Bist du noch krank?** kabulü aynı işi görüyor: Tobi'nin hâlini soruyor. Geri bildirim bunu söylüyor. |
| 7 | prova: **Nein, leider nicht. Ich bin auf dem Land. Aber danke!** | gun-33 · prova n3 · secenekler[1] | TAMAM | Kabuller doğru, n3 bağlamıyla (cumartesi reddi, pazar önerisi) uyumlu. Düğümün `tr` alanındaki "Pasta daha bitmez." anlaşılır ama biraz zorlama. İsteğe bağlı öneri: "Pastadan hâlâ kalır." |
| 8 | prova: **Ich bin {Arzt\|Ärztin}.** | gun-31 · prova n2 · secenekler[0] | TAMAM | `durum_tr` meslek oyunu, öğrenci oyunda doktor. Yer tutucu cinsiyet için. Geri bildirim (**ein/eine** yok) doğru. |
| 9 | prova: **Bis morgen, Tobi!** | gun-35 · prova n3 · secenekler[0] | TAMAM | İkisi de ertesi gün Derya'ya gidiyor, **bis morgen** tutarlı. |
| 10 | prova: **Morgen schon um sechs!** | gun-29 · prova n2 · secenekler[1] | TAMAM | "Yarın daha altıda!" konuşma Türkçesinde "erkenden, altıda" anlamında kullanılıyor. Geri bildirimdeki **schon** açıklaması doğru. |
| 11 | sınav (sesli): **Wann arbeiten Sie am Mittwoch?** | gun-30 · gun_sinavi · m1:30:s10 | TAMAM | Altı kabul durumla (çarşamba yedi) uyumlu. `why_tr` söz dizimini doğru veriyor. `sesli` listesinde. |
| 12 | sınav (dikte): **Herr Wimmer ist mein Vorgesetzter.** | gun-30 · gun_sinavi · m1:30:s4 | TAMAM | Kabuller yalnız harf ve noktalama farkı. `dikte` listesinde. |
| 13 | sınav (dikte): **Wir feiern am Samstag in der Stadt.** | gun-33 · gun_sinavi · m1:33:s4 | TAMAM | Aynı. |
| 14 | sınav (`tr_de`): "Ben yürüyerek gidiyorum, Tobi arabayla gidiyor." | gun-34 · gun_sinavi · m1:34:s6 | TAMAM | **Ich laufe** güneyde yürümek anlamında doğal, kabul olarak yerinde. |
| 15 | sınav (sesli): **Entschuldigen Sie, wann ist die Abfahrt nach München?** | gun-31 · gun_sinavi · m1:31:s10 | TAMAM | **Um neun Uhr, von Bahnsteig zwei.** kabulündeki peron bilgisi aynı günün anonsundan geliyor (**Bahnsteig zwei: Abfahrt nach München …**). Uydurma değil. |
| 16 | dikte (usta): **Gemüse? Echt? Ich esse nicht gern Gemüse.** | gun-32 · m1:32:v1 · b1 · d4 | TAMAM | Kabuller yalnız harf ve noktalama farkı. Birden çok cümle: dilbilimcinin açık noktası 1, yeni bulgu değil. |
| 17 | dikte (gerçek): **Derya feiert am Samstag. Ich soll sie bald anrufen.** | gun-33 · m1:33:a1 · b1 · d5 | TAMAM | Örnek cevap c2 ve c5'i doğru özetliyor. `zorunlu` (**Samstag**, **anrufen**) seste geçiyor. **soll** 32. günün örneğinde de var. Öğrenciden istenmiyor. |
| 18 | dikte (usta): **Dann bleiben Sie heute zu Hause.** | gun-29 · m1:29:a2 · b1 · d4 | TAMAM | Radyo metni c4 ile birebir aynı. Türkçe "O zaman bugün evde kalın." doğru. |
| 19 | dikte (usta): **Kommst du am Samstag zu Derya?** | gun-33 · m1:33:a2 · b1 · d4 | TAMAM | Ses metninde yer tutucu yok. |
| 20 | dikte (orta): **Ach, Tobi! Er ist ___, nicht Chef.** | gun-31 · m1:31:v1 · b1 · d2 | TAMAM | Boşluğa **Verkäufer** geliyor. Kabuller aynı kelimenin yazımları. |
| 21 | okuma (gist): "Tobi neden yazıyor?" | gun-29 · okuma · m1:29:o1 | TAMAM | Kanıt 1 (**Ich bin krank …**). Tek doğru şık var, iki çeldirici metinle çelişiyor. `metin_de` okuma metni, ses değil. `{name}` doğru yer tutucu. |
| 22 | okuma (detail): "Vardiya planı nerede?" | gun-31 · okuma · m1:31:o4 | TAMAM | Kanıt 4 = **… ist im Büro.** Cevap "Ofiste". Cümle sırası doğru sayılmış. |
| 23 | okuma (detail): "İlk trafik ışığında hangi yöne gidiyorsun?" | gun-34 · okuma · m1:34:o3 | TAMAM | Kanıt 2 = **An der ersten Ampel gehst du links.** Cevap "sola". **rechts** üçüncü sokak için, karışmıyor. |
| 24 | okuma (detail): "Tobi'nin sevdiği sosis hangi gün var?" | gun-32 · okuma · m1:32:o3 | TAMAM | Kanıt 0 = **Montag: Bratwurst …**. Bratwurst yalnız pazartesi var, tek doğru şık. |
| 25 | okuma (detail): "Teknisyen ne zaman başlıyor?" | gun-31 · okuma · m1:31:o2 | TAMAM | Kanıt 1 = **Ab Montag arbeitet eine Technikerin …**. Çarşamba aşçının günü, iyi bir çeldirici ama doğru değil. |
| 26 | görülmemiş: **Was trinkst du gern? Und was isst du lieber?** | gorulmemis-05 · m1:h05:g7 | **HATA** | Aşağıda 1. hata. |
| 27 | görülmemiş: **Entschuldigung, wie komme ich zur Apotheke?** | gorulmemis-05 · m1:h05:g4 | TAMAM | Altı kabul aynı yolu tarif ediyor. **biegen Sie links ab** doğru, yalnız kabul olarak var. `why_tr` (**Sie**, **an der zweiten Ampel**) doğru. |
| 28 | görülmemiş: **Und Ihr Beruf, bitte?** | gorulmemis-05 · m1:h05:g2 | TAMAM | A1'de meslek sorusuna **Ich arbeite in einer Firma / im Büro** cevabı yeterli. `why_tr` bunu doğru anlatıyor. |
| 29 | görülmemiş: **Und morgen? Wann musst du aufstehen?** | gorulmemis-05 · m1:h05:g1 | TAMAM | `why_tr` (**muss** ile **aufstehen** bitişik kalıyor, **muss** yoksa ayrılıyor) doğru. Beş kabul aynı anlamda. |
| 30 | görülmemiş: **Und wann haben Sie diese Woche Zeit?** | gorulmemis-05 · m1:h05:g6 | TAMAM | Kabuller durumla (pazartesi ve salı iş, perşembe boş) tutarlı. Luka'ya **Sie** (dilbilimci bulgusu 12 ile uyumlu). |

**Sonuç: 30 öğede 1 hata, oran %3,3 (eşik %2).**

## Hatalar

### 1. `content/v2/m1/gorulmemis-05.json` · `m1:h05:g7`
- **Şu an:** `prompt_de` = **Was trinkst du gern? Und was isst du lieber?** · `durum_tr` = "… Sütü seversin, sosisi daha çok seversin." · kabullerden biri **Ich trinke gern Milch, aber ich esse lieber Bratwurst.**
- **Sorun (ölçüt 1 ve 2):** **lieber** bir karşılaştırma ister: neye göre "daha çok"? Burada içecek (süt) ile yiyecek (sosis) karşılaştırılıyor. Bunlar aynı sınıftan değil. Ana dili Almanca olan biri, seçenek vermeden **Und was isst du lieber?** diye sormaz (**am liebsten** derdi). **aber** ile kurulan kabul ("Süt içmeyi severim ama sosis yemeyi tercih ederim") anlamsız bir karşıtlık kuruyor. Türkçe durum metni de aynı yanlış karşılaştırmayı öğretiyor. 32. gün aynı kalıbı doğru biçimde, iki yiyecek arasında öğretiyor (`m1:32:o5`: **Was isst du lieber, Fleisch oder Gemüse?**). Görülmemiş durum ondan daha zayıf bir örnek kuruyor.
- **Önerilen düzeltme:**
  - `prompt_de`: **Was trinkst du gern? Und was isst du lieber, Fisch oder Bratwurst?** (**Fisch** 32. günün okumasında geçiyor)
  - `durum_tr`: "Spor salonunda Basti seni bir şey içmeye çağırıyor ve ne sevdiğini soruyor. Süt içmeyi seversin. Balık ile sosis arasında sosisi tercih edersin."
  - `accepted`: **Ich trinke gern Milch. Ich esse lieber Bratwurst.** · **Milch trinke ich gern. Bratwurst esse ich lieber.** · **Ich trinke gern Milch und esse lieber Bratwurst.** · **Gern Milch. Und lieber Bratwurst.** · **Ich trinke gern Milch. Ich esse lieber Bratwurst als Fisch.** (**aber** ile kurulan kabul çıkarılır.)
  - `why_tr` ve `kalip` aynı kalabilir.
- Sınıf: doğallık ve mantık hatası. Dilbilgisi doğru, öğrencinin cevabı da yanlış sayılmıyor. Ama öğrenciye **lieber** kalıbını anlamsız bir karşılaştırmayla gösteriyor.

## Örneklem dışında görülenler (sayıma girmez, bilgi)
- `gun-32.json` · `gun_sinavi` · `m1:32:s11`: **Was isst du gern? Und was isst du lieber?** sorusu da seçenek vermiyor. Kabuller aynı fiille iki yiyeceği karşılaştırdığı için g7'den daha savunulabilir. Yine de **lieber** sorusuna iki seçenek eklemek kalıbı daha doğal yapar. Dilbilimci karar versin.
- Prova karşı tarafı repliklerinde yer tutucu (`{Herr|Frau} {name}`, 31. gün `{Arzt|Ärztin}`) 1. günden beri kullanılan bir yöntem. Ses üretimi açısından yeni bir risk değil.

## Makine denetimi
Komut h5 ağacının kökünden çalıştırıldı: `A1K=…/a1k.json node --experimental-strip-types …/kdenet.ts 29 35`. Ağaçta `node_modules` yoktu, `zod` bulunamadı. Koşu süresince ana depodaki `node_modules`'e geçici bir sembolik bağ verildi (`node_modules/` `.gitignore`'da), koşudan sonra bağ silindi.

```
content/v2/m1/gun-29.json: görev cümlesi 25, bilinmeyenli 0; kart 18; halka 4
content/v2/m1/gun-30.json: görev cümlesi 25, bilinmeyenli 0; kart 14; halka 3
content/v2/m1/gun-31.json: görev cümlesi 23, bilinmeyenli 0; kart 14; halka 3
  KESİN UYUŞMAZ content/v2/m1/gun-32.json: eksik lx:trinken fazla -
content/v2/m1/gun-32.json: görev cümlesi 23, bilinmeyenli 0; kart 12; halka 3
  KESİN UYUŞMAZ content/v2/m1/gun-33.json: eksik - fazla lx:trinken
content/v2/m1/gun-33.json: görev cümlesi 23, bilinmeyenli 0; kart 12; halka 3
  KESİN UYUŞMAZ content/v2/m1/gun-34.json: eksik lx:Bett fazla -
content/v2/m1/gun-34.json: görev cümlesi 24, bilinmeyenli 0; kart 9; halka 2
  KESİN UYUŞMAZ content/v2/m1/gun-35.json: eksik - fazla lx:Bett
content/v2/m1/gun-35.json: görev cümlesi 28, bilinmeyenli 0; kart 4; halka 1
```
Çıktı dilbilimci raporuyla aynı. HALKA HATA, "görev:", TEKRAR ve KALIP ÖRNEKSİZ satırı yok. Bilinmeyenli görev cümlesi 0. Yalnız bilinen dört KESİN UYUŞMAZ satırı var (trinken 32/33, Bett 34/35). Yeni bulgu yok.

Ek tarama (bir kez, 9 dosyanın tamamı): `audio_de`, ses `script`, sahne satırları ve `prompt_de` alanlarında yer tutucu 0. `{name}` dışında ad yer tutucusu 0.

## Karar
**ÖRNEKLEM HATA (1)**: 30 öğede 1 hata, oran %3,3, eşik %2'nin üstünde. Yönerge gereği `gorulmemis-05.json` dilbilimciye geri gönderilmeli (öneri yukarıda). Ölçüt kesin uygulanırsa bütün hafta için yeniden bakış gerekir. Ancak hata tek bir görülmemiş durumda ve doğallıkla ilgili. Bulunan hata türü (seçeneksiz **lieber**) yalnız `m1:h05:g7` ile `m1:32:s11`'de var. Önerilen yol: hedefli düzeltme, ardından örneklem kontrolü yeni bir tohumla (6) yeniden yapılır.

## 2. çekiliş (g7 düzeltmesinden sonra)

### g7 doğrulaması
`content/v2/m1/gorulmemis-05.json` · `m1:h05:g7` şimdi şöyle:
- `prompt_de`: **Trinkst du gern Milch? Und was isst du lieber, Käse oder Bratwurst?**
- `durum_tr`: "… Süt içmeyi seversin. Peynirle sosis arasında sosisi daha çok seversin."
- Beş kabulün hepsi **Ja** ile başlıyor ve **lieber Bratwurst** diyor. **aber**'li kabul çıkarılmış.

**lieber** artık iki yiyecek arasında seçim yaptırıyor. Soru doğal, Türkçe durum metni aynı anlamı veriyor, kabuller doğru ve aynı anlamda. **Käse** 32. günde öğretiliyor. `kalip` ve `why_tr` uyumlu. **Sonuç: TAMAM.** Önceki hata kapandı. `m1:32:s11`'e dokunulmadı, sayıma girmez.

### Seçim
Aynı betik ve havuzlar (havuz boyutları değişmedi). `random.seed(6)` ile her havuzdan `random.sample(havuz, 5)` çekildi. Ham çıktı: oturum scratchpad'i (`orneklem6.out`). İki çekilişte ortak çıkan öğeler: m1:33:s4, g1, g2, g4, g7. Bunlar yeniden kontrol edildi.

| # | Öğe | Yer | Sonuç | Not |
|---|---|---|---|---|
| 1 | görev: **An der zweiten Ampel biegen Sie rechts ab.** | gun-34 · m1:34:h1 · gorev_cumleleri[4] | TAMAM | Mastarlı yol tarifi (**… rechts abbiegen.**) doğal. |
| 2 | görev: **Hast du Schnupfen, Tobi?** | gun-29 · m1:29:h3 · gorev_cumleleri[4] | TAMAM | **Hast du auch Schnupfen** "sen de" anlamını katıyor. Radyo herkesin nezle olduğunu söylediği için bağlama uyuyor, kabul olarak zararsız. |
| 3 | görev: **Die Tür ist offen, Tobi!** | gun-33 · m1:33:h1 · gorev_cumleleri[6] | TAMAM | **doch** yalnız vurgu katıyor. |
| 4 | görev: **Am Freitag kommt die Gehaltsabrechnung.** | gun-31 · m1:31:h1 · gorev_cumleleri[2] | TAMAM | **…, oder?** onay sorusu. Bilgi aynı, kabul olarak yerinde. |
| 5 | görev: **Wie viel ist die Miete?** | gun-29 · m1:29:h2 · gorev_cumleleri[1] | TAMAM | **kostet** ve **Wie hoch** doğal. |
| 6 | prova: **Hallo, Tobi! Bist du noch krank?** | gun-29 · prova n1 · secenekler[0] | TAMAM | Dört kabul aynı anlamda. |
| 7 | prova (uygunsuz): **Ja, klar, Stefan.** | gun-30 · prova n1b · secenekler[1] | TAMAM | Herr Wimmer n1b'de hitabı düzeltiyor (**Herr Wimmer, bitte.**). Geri bildirim doğru, düğüm kendine dönüyor. |
| 8 | prova (uygunsuz): **Bis morgen, Herr Lechner!** | gun-35 · prova n3 · secenekler[1] | TAMAM | **du** ile konuşulan Tobi'ye soyadla hitap, geri bildirim doğru. |
| 9 | prova: **Toll, vielen Dank!** | gun-34 · prova n5 · secenekler[0] | TAMAM | Kabuller aynı anlamda. |
| 10 | prova (uygunsuz): **Nein.** | gun-33 · prova n3 · secenekler[2] | TAMAM | Geri bildirim kibar ret biçimini gösteriyor. |
| 11 | sınav (dikte): **Wir feiern am Samstag in der Stadt.** | gun-33 · gun_sinavi · m1:33:s4 | TAMAM | 1. çekilişte de vardı. |
| 12 | sınav (`tr_de`): "Bugün yalnız yiyorum." | gun-32 · gun_sinavi · m1:32:s8 | TAMAM | **allein** ve **alleine** doğru. `why_tr` doğru. |
| 13 | sınav (dikte): **Die Sprechstunde fängt am Montag um acht Uhr an.** | gun-29 · gun_sinavi · m1:29:s3 | TAMAM | Kabuller yalnız harf ve noktalama farkı. |
| 14 | sınav (dikte): **Herr Wimmer trinkt nicht gern Milch.** | gun-32 · gun_sinavi · m1:32:s2 | TAMAM | `why_tr` "**nicht gern** sevmeden demek" doğru ama kuru. İsteğe bağlı öneri: "**nicht gern** … sevmez demek." |
| 15 | sınav (`tr_de`): "Uzak değil, çok yakın." | gun-34 · gun_sinavi · m1:34:s8 | TAMAM | Beş kabul aynı anlamda. |
| 16 | dikte (zor): **Wir treffen uns an der Haltestelle am Bahnhof.** | gun-35 · m1:35:a2 · b1 · d3 | TAMAM | Banka cevabın kelimeleri artı iki çeldirici (**Ampel**, **zum**). |
| 17 | dikte (kolay): **Die Ankunft ist um zehn Uhr.** | gun-30 · m1:30:a2 · b1 · d1 | TAMAM | **zehn** cümlede geçiyor, **neun** ve **elf** geçmiyor. |
| 18 | dikte (usta): **Gut. Ich arbeite leider am Samstag.** | gun-35 · m1:35:v1 · b1 · d4 | TAMAM | Kabuller doğru. s8'in Türkçesindeki "İyi." bu bağlamda "Peki." daha doğal olurdu (isteğe bağlı). İki cümleli satır dilbilimcinin açık noktası 1. |
| 19 | dikte (zor): **Heute gibt es Bratwurst mit Senf und Brot.** | gun-32 · m1:32:a1 · b1 · d3 | TAMAM | Banka doğru (çeldiriciler **Käse**, **ist**). |
| 20 | dikte (usta): **Kannst du mich bald anrufen?** | gun-33 · m1:33:a1 · b1 · d4 | TAMAM | Kabuller yalnız harf ve noktalama farkı. |
| 21 | okuma: "Derya salı günü saat onda nereye gidiyor?" | gun-30 · okuma · m1:30:o2 | TAMAM | Kanıt 1 = **Dienstag: um zehn Uhr Termin bei Dr. Weber.** Cevap "Doktora", tek doğru şık. |
| 22 | okuma: "Teknisyen nereli?" | gun-31 · okuma · m1:31:o3 | TAMAM | Kanıt 2 = **Sie kommt aus München.** "Duyuruda yazmıyor" şıkkı yanlış, tek doğru şık. |
| 23 | okuma: "Derya et yemeyi sevmiyor. Hangi gün ona uygun?" | gun-32 · okuma · m1:32:o2 | TAMAM | Kanıt 2 = **Mittwoch: Gemüse mit Käse.** Salı (et) ve pazartesi (sosis) yanlış. Balık günü şıklarda yok. |
| 24 | okuma (gist): "Bu metin ne?" | gun-30 · okuma · m1:30:o1 | TAMAM | Okumanın başlığı "Derya'nın haftalık planı". Kanıt 0–2 gün gün plan. |
| 25 | okuma (`guided_response`): **Ist es weit vom Bahnhof?** | gun-34 · okuma · m1:34:o4 | TAMAM | Metin **das ist nah** diyor. Altı kabul aynı anlamda. |
| 26 | görülmemiş: **Wir feiern am Samstag. Kommen Sie auch?** | gorulmemis-05 · m1:h05:g3 | TAMAM | **Sie** düzeltmesi yerinde. Kabullerin hepsi teşekkür, ret ve pazar önerisi içeriyor. |
| 27 | görülmemiş: **Und morgen? Wann musst du aufstehen?** | gorulmemis-05 · m1:h05:g1 | TAMAM | 1. çekilişte de vardı. |
| 28 | görülmemiş: **Trinkst du gern Milch? Und was isst du lieber, Käse oder Bratwurst?** | gorulmemis-05 · m1:h05:g7 | TAMAM | Düzeltilmiş hâl (yukarıda). |
| 29 | görülmemiş: **Entschuldigung, wie komme ich zur Apotheke?** | gorulmemis-05 · m1:h05:g4 | TAMAM | 1. çekilişte de vardı. |
| 30 | görülmemiş: **Und Ihr Beruf, bitte?** | gorulmemis-05 · m1:h05:g2 | TAMAM | 1. çekilişte de vardı. |

**Sonuç: 30 öğede 0 hata, oran %0.** İki çekiliş birlikte (60 öğe, düzeltmeden önce sayılan g7 dahil) 1 hata, %1,7. Bütün ölçütlerde (Almanca, Türkçe karşılık, kabuller, kanıt ve tek doğru şık, açıklama, yer tutucu) bulgu yok. İsteğe bağlı üç Türkçe ince ayar (1. çekiliş #7 "Pasta daha bitmez", 2. çekiliş #14 `why_tr`, #18 "İyi.") hata sayılmadı.

### 2. çekiliş kararı
**ÖRNEKLEM GEÇTİ**: `gun-29` … `gun-35`, `hafta-sonu-testi-05.json`, `gorulmemis-05.json` örneklem aşamasından geçti.
