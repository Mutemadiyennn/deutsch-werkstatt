# [NÖBET İ-1] A1 onarımı 2. paket dilim 1 (P1-3: tabela, açılış saati, gar anonsu dili): dilbilimci incelemesi

- Dal: `ic-a1/paket-2-tabela` (çalışma ağacı `wt/p2`), karşılaştırma tabanı `ic-a1/hafta-7-8`
- İnceleyen: dilbilimci-ajan · tarih: 2026-11-28
- Kapsam: yalnızca farktaki maddeler. Günlerin geri kalanı bu incelemenin dışında kaldı. Bu yüzden `review.status` değiştirilmedi, hepsi `draft` olarak duruyor.

## İncelenen maddeler: 59

| Gün | Madde | Adet |
|---|---|---|
| 15 | `m1:15:h5` (2 kalıp, 4 görev cümlesi), `m1:15:a2` c3b | 7 |
| 25 | h1/h2 Angebot/Markt (1 kalıp, 4 cümle), `m1:25:a1` c1b ve yeni ayrıntı sorusu | 7 |
| 27 | `m1:27:h3` (2 kalıp, 10 cümle) | 12 |
| 30 | okuma eki, metin_tr, `m1:30:o6`, `o7` | 4 |
| 31 | `m1:31:h4` (2 kalıp, 4 cümle), `m1:31:a2` c1 | 7 |
| 34 | `m1:34:a1` c0 ve soru | 2 |
| 49 | `m1:49:h2` (2 kalıp, 4 cümle), `m1:49:a1` c1, c4b ve soru | 9 |
| 52 | okuma eki, metin_tr, `m1:52:o5` | 3 |
| 53 | `m1:53:a1` c0, c2b, c4 ve soru | 4 |
| 54 | okuma eki, metin_tr, `m1:54:o6` | 3 |
| a1-kesin | sayaç ve `duzeltmeler` kayıtları (yalnızca okundu) | 1 |

## Bulgular: 17 (2 P1, 15 P2, P0 yok). Hepsi düzeltildi.

| # | Öncelik | Dosya | Kimlik | Önce → Sonra | Gerekçe |
|---|---|---|---|---|---|
| 1 | P1 | gun-27 | `m1:27:h3` Öffnungszeiten 2 | **Die Öffnungszeiten sind am Eingang.** (accepted: sind da, am Eingang / Am Eingang sind …) → **Die Öffnungszeiten stehen am Eingang.** (accepted: … stehen hier am Eingang. / Am Eingang stehen die Öffnungszeiten.) | Yazılı bilgi için Almanca **stehen** kullanılır, sözlük örneği de böyle: "Die Öffnungszeiten stehen an der Tür." **sind am Eingang** saatlerin girişte "bulunduğunu" söyler ve doğal değildir. Türkçe "girişte yazıyor" zaten **stehen** demek. |
| 2 | P1 | gun-54 | okuma eki (cümle 6–7) | **Sprechzeiten: Mo–Fr 8–12 Uhr. Am Mittwoch ist die Praxis ab zwölf Uhr geschlossen.** → **Sprechzeiten: Mo–Fr 8–12 Uhr und 14–18 Uhr. Am Mittwoch …** (metin_tr de aynı şekilde) | Metin kendi içinde tutarsızdı. Her gün zaten 12'de kapanıyorsa "çarşamba 12'den sonra kapalı" notu bir şey söylemez ve o6 sorusu anlamsız kalır. Gerçek muayenehane tabelası öğleden sonra saatlerini verir, istisna olarak da "Mittwochnachmittag geschlossen" yazar. Artık o6'nın çeldiricisi ("Evet, akşama kadar açık") diğer günlerle gerçek bir karşıtlık kuruyor. |
| 3 | P2 | gun-15 | `m1:15:h5` Information 1 accepted | **Ich habe eine Information für dich.** → **… für euch.** | Görev Türkçesi "Size bir bilgim var." Türkçede "size" ya resmî hitaptır (Sie) ya çoğuldur (euch). **dich** buna uymuyor. |
| 4 | P2 | gun-15 | `m1:15:h5` Information 2 tr | "Danışma (Information) nerede, lütfen?" → "Danışma nerede, lütfen?" | OD-9.2: çeviri içinde Almanca not olmaz. Sözcüğe dokununca kart zaten açılıyor. |
| 5 | P2 | gun-15 | `m1:15:h5` bitten 1 accepted | **Ich bitte um Entschuldigung.** → **Wir bitten Sie um Entschuldigung.** | "Özür dileriz" çoğuldur, kabul edilen cevap da çoğul olmalı. |
| 6 | P2 | gun-15 | `m1:15:h5` bitten 2 accepted | **Wir bitten um einen Termin.** → **Guten Tag, ich bitte um einen Termin.** | "Rica ediyorum" tekildir. Yeni cevap telefondaki doğal açılışı da kabul ediyor. |
| 7 | P2 | gun-25 | `m1:25:a1` b1 yeni ayrıntı sorusu | "Bu duyuruyu nerede duyuyorsun?" (Pazarda / Fırında / Muayenehanede) → "Anons hangi yerden söz ediyor?" (Pazardan / Fırından / Muayenehaneden) | Eski sorunun cevabı ortam_tr'de yazıyordu ("şehir meydanındasın"), üstelik "meydanda" ile "pazarda" birbirine karışıyordu. Yeni soru doğrudan kanıta (c1b, **auf dem Markt**) bağlı. |
| 8 | P2 | gun-27 | `m1:27:h3` Eingang 2 accepted | **Ich warte am Eingang.** → **Wir warten hier am Eingang.** | "Bekliyoruz" çoğuldur, tekil cevap aynı kişiyi söylemiyor. |
| 9 | P2 | gun-27 | `m1:27:h3` Getränk 2 accepted | **Das Getränk kostet zwei Euro.** → **Ein Getränk kostet hier zwei Euro.** | "Bir içecek" denince belirsiz artikel gerekir. |
| 10 | P2 | gun-30 | okuma metin_tr | "(Tabelada günler kısa yazılır: Mo = Montag, …)" ve "4. reyon (Gang)" → "pazartesi–cuma (Mo–Fr) 7–20, cumartesi (Sa) 7–14 … 4. reyon" ve "Belediye binasının yanındaki" | OD-9.2: çeviri içinde öğretmen notu, `=` ve Almanca açıklama olmaz. Kısaltmanın karşılığı ayraç içinde kaldı. **am Rathaus** sözlükteki "belediye binası" karşılığıyla eşlendi. |
| 11 | P2 | gun-31 | `m1:31:h4` Gleis 1 | **Die Abfahrt ist von Gleis drei.** → **Abfahrt heute von Gleis drei.** (accepted: Heute Abfahrt von Gleis drei. / Die Abfahrt ist heute von Gleis drei.) | DB anonsu ve tabelası bunu ad öbeğiyle söyler: "… Abfahrt heute von Gleis 3". **Die Abfahrt ist von …** dilbilgisi açısından doğru ama doğal değil, bu yüzden ana cümleden çıkarıldı, yalnızca kabul edilen cevaplarda kaldı. İlk denemedeki **Der Zug fährt …** biçimi kapıya takıldı: **Zug** ancak 49. günde öğretiliyor. |
| 12 | P2 | gun-31 | `m1:31:a2` c1 tr | "İki numaralı peron (Gleis): …" → "İki numaralı peron: …" | OD-9.2, gerekçesi #4 ile aynı. |
| 13 | P2 | gun-49 | `m1:49:a1` c4b tr | "… dört numaralı perona (Gleis) giriyor, orada duruyor." → "Tren bugün Wendlfing'de dört numaralı peronda duruyor." | Çeviri dolambaçlıydı ve Almanca not içeriyordu. Almanca cümle (**hält … an Gleis vier**) doğal, olduğu gibi kaldı. |
| 14 | P2 | gun-52 | okuma metin_tr | "(Mieterinnen und Mieter: kadın ve erkek kiracılar)", "(Hausverwaltung: kiracıların yazıştığı yönetim şirketi)" → "Sevgili kiracılar, … Bina yönetiminiz" | OD-9.2: çeviri temiz olmalı. Açıklama gerekiyorsa sözcük kartı veriyor. |
| 15 | P2 | gun-52 | `title_tr` | "Apartman panosunda bir not" → "… iki not" | Metinde artık iki not var, o5 da "ikinci not" diyor. |
| 16 | P2 | gun-53 | `m1:53:a1` yeni ayrıntı sorusu | "Otobüs hangi hat?" → "Otobüs kaç numaralı hat?" | Eski Türkçe soru eksikti ve doğal okunmuyordu. |
| 17 | P2 | gun-54 | okuma metin_tr | "(Patientinnen und Patienten: kadın ve erkek hastalar)", "(Sprechzeiten)" → kaldırıldı, "8–12 ve 14–18" eklendi | OD-9.2 ve #2. |

### Doğru bulunanlar (değiştirilmedi)
- 15 c3b **Eine Information für Sie:** bekleme kaydında doğal bir biçim. 15 **Wir bitten um Entschuldigung.** standart DB kalıbı.
- 25 **im Angebot** / indirimde, **Ist das heute im Angebot?**, **Die Stühle sind im Angebot**, **auf dem Markt** (Dativ yer). c1b **Willkommen auf dem Markt! Heute ist viel im Angebot.** bir bit pazarı anonsu için uygun.
- 27 **hinten links/rechts**, **Wo sind die Getränke?**, **Wie sind die Öffnungszeiten?** doğru. Kabul listesindeki **Was sind die Öffnungszeiten?** konuşmada duyulan bir biçim, kabul edilmesi haksız ret riskini azaltıyor.
- 30 tabela biçimi **Öffnungszeiten: Mo–Fr 7–20 Uhr, Sa 7–14 Uhr** gerçek bir tabelaya uyuyor. o6 (14'e kadar) cümle 6'ya, o7 (4. reyon, arkada solda) cümle 8'e bağlı. Uygulamanın cümle bölücüsü (`web/src/core/okuma.ts`, "Dr." birleşir) ile sayıldı. Çeldiriciler gerçekten yanlış.
- 34 c0 **Achtung, eine Information zur Linie drei und zur Linie fünf.** doğru. Soru c0'a bağlı, çeldiriciler yanlış.
- 49 **Liebe Fahrgäste, unser Zug steht im Moment im Tunnel.** DB'nin gerçek açılışı. **Wir halten in fünf Minuten in Wendlfing.** ve **Halten Sie bitte hier!** doğal. Kabul listesindeki **… in Wendlfing an** biraz zayıf ama yanlış değil, kaldı.
- 52 **Liebe Mieterinnen und Mieter, … gibt es kein Wasser. Ihre Hausverwaltung** gerçek bir duyuru biçimi. o5 cümle 7'ye bağlı.
- 53 c0 **Liebe Fahrgäste, eine Information.**, c2b **Das ist die Linie sieben.**, c4 **Wir bitten um Entschuldigung.** doğru. Dikte c4'e bağlı değil, eski metinden artık kalan yok.
- Kişisel bilgi, sabit öğrenci adı ya da cinsiyeti yok. Bairisch eklenmemiş. Bütün kabul listelerinde en az 3 cevap var.

## Denetim çıktıları (son koşu, ağaç kökü `wt/p2`)
```
npm run content:validate      → … → 0 hata, 337 uyarı
dikis-kos.ts                  → İhlal: 0
hafta-kapisi-kos.ts --hepsi   → 8 haftanın hepsinde "Öğretilmeden istenen: **0** (kesin 0, sınırda 0)" · "Hafta sonu testi: **%100** (12/12)"
```
(Bir ara koşuda #11'in ilk düzeltmesi **Zug** yüzünden "kesin 1" ve validate'te 1 hata verdi. Cümle değiştirildi, sonra üç denetim de temiz geçti.)

## Açık sorular ve takip işleri (bu dilimi engellemiyor)
1. **gun-31 `m1:31:a2` c2 ve c5 (eski metin, farkın dışında):** **Heute ist leider Zugausfall.** ve **Wir entschuldigen uns.** DB'nin dili değil. Gerçek anons şöyle der: **Der Zug fällt heute leider aus.** / **Wir bitten um Entschuldigung.** c2 dikte d3'e ve d5'e bağlı olduğu için bu dilimde dokunulmadı. Ayrı bir takip işi öneriyorum (**ausfallen** 31. günde biliniyor mu, bakılmalı).
2. **Araçtaki cümle bölücüleri farklı:** `hafta-kapisi.ts:53` "Dr. Weber"i iki cümleye bölüyor, uygulama (`okuma.ts`) ise birleştiriyor. Bu yüzden gun-30 ve gun-54'te 5. cümleden sonraki `kanit` indeksleri kapı aracında bir cümle kayıyor. "Kanıtta yeni sözcük" denetimi yanlış cümleye bakıyor. Bu bir araç işi, baş geliştiriciye (#12).
3. **Zug 49. günde, Gleis/Zugausfall 31. günde:** müfredatta sıra garip. Tren sözcüğü peron ve iptal sözcüklerinden sonra geliyor. Bu yüzden gar anonslarında **der Zug** kullanılamıyor (#11). lex ve baş geliştiricinin bilgisine.
4. `review.status`: inceleme yalnızca farkı kapsadığı için günler `draft` kaldı.

## Sonuç: KAPANDI (dilimin farkı için). Hata oranı 17/59 ≈ 0,29 (P1 2/59).

## 2. tur (2026-11-28, yalnız 1. tur düzeltmeleri; fark `356d641f..` → `content`)
İncelenen: 8 değişiklik yeri. Bunlar dört mini sahne (`m1:15:h5`, `m1:27:h3`, `m1:31:h4`, `m1:49:h2`; 15 satır, 4 soru, 12 şık), `m1:15` kart düzeni, `gun-25` c1b, `gun-30` başlığı ve o1, `gun-54` başlığı.

### Düzeltmeler (önce → sonra, gerekçe)
1. **`m1:31:h4` 1. satır (P1, bilinmeyen sözcük):** **Die Abfahrt nach München ist um acht. Und das Gleis?** → **Die Abfahrt ist um acht. Und das Gleis?** (tr: "Kalkış saat sekizde. Peki peron?"). Bilinmeyen sözcük **München**'di: özel ad kümede yok, 31. güne kadar kart olarak da öğretilmedi. Soru da buna göre değişti: "Münih'e kalkış hangi perondan?" → "Tren hangi perondan kalkıyor?" Doğru şık ve çeldiriciler aynı kaldı. 31. gündeki sahne uyarısı 3'ten 2'ye indi; kalan ikisi h2'deki eski **Krankenpflegerin** ve **Koch**.
2. **`m1:49:h2` sahne (P2, durum mantığı):** Brandl Hanım da Wendlfing'de oturuyor, trenin Wendlfing'de durup durmadığını sorması yapay. **Dann warte ich auch.** cümlesi de garip: tren tünelde duruyor, herkes zaten bekliyor. Yeni sahne şöyle: **Warum hält der Zug hier?** / **Ich weiß es nicht. Alle Fahrgäste müssen warten.** / **Und hält er dann in Wendlfing?** / **Ja, er hält in Wendlfing.** İki kart (**halten** ×3, **Fahrgäste**) yerinde ve doğal kullanılıyor. Soru artık Fahrgast satırını ölçüyor: "Şimdi bütün yolcular ne yapmak zorunda?" → Beklemek / Trenden inmek / Bilet almak (ans 0). Eski doğru şık ("Evet, ama şimdi bütün yolcular bekliyor") soru ile cevabı birbirine karıştırıyordu.
3. **`m1:15:h5` sahne (P3, tekrar mantığı):** Öğrenci "bir daha söyler misiniz" diyor, Huber Hanım ise tekrar etmek yerine yeni bilgi (saat) ekliyordu. Saat artık ilk satırda var: **… Ihr Termin ist am Freitag um neun Uhr.** Cevap kısa bir tekrar oldu: **Gern. Am Freitag, um neun Uhr.** (tr: "Tabii. Cuma, saat dokuzda."). Bu, telefonda gerçek tekrar rica akışı. Soru ve şıklar aynı kaldı.

### Doğru bulunanlar
- `m1:15` kart düzeni: **bitten** çıktı, **nochmal** h4'ten h5'e taşındı, h4'te 3 kart kaldı (2–6 sınırı içinde). **nochmal**'ın görev cümleleri ve 3'er kabul cevabı aynen taşınmış. "Telefonda: bilgi ve tekrar rica" başlığı içeriğe uyuyor. Sahnedeki öğrenci satırında ad ya da cinsiyet yok (D-061). Huber Hanım WORLD'deki muayenehane sekreteri, aile hekimi Dr. Weber (H4).
- `m1:27:h3` sahne: **Wo sind die Getränke, bitte?** / **Hinten links. Das Obst ist am Eingang.** / **Und die Öffnungszeiten?** / **Die stehen am Eingang, rechts.** Hepsi doğal market Almancası. Türkçe OD-9'a uyuyor, soru ve çeldiriciler doğru.
- `gun-25` c1b **Heute auf dem Markt: viel im Angebot!** hoparlör ve reklam anonsu üslubuna uyuyor; Türkçesi doğru.
- `gun-30` başlığı ("… ve market tabelası"), satır sonuyla ayrılmış iki metin ve o1 "İlk metin ne?" doğru. `okuma.ts` bölücüsüyle cümle 6 = Öffnungszeiten, 7 = Obst, 8 = Getränke çıkıyor; o6 [6] ve o7 [8] hâlâ doğru cümleye bağlı.
- `gun-54` başlığı "Doktorun notu ve muayenehane duyurusu" iki metne uyuyor. o1 "Bu not ne?" ilk metni soruyor, ikinci metin "not" değil; değişiklik gerekmedi.

### Denetim çıktıları (düzeltmelerden sonra)
```
npm run content:validate      → 0 hata, 337 uyarı (gun-31: "2 sahne satırında 1 bilinmeyen")
dikis-kos.ts                  → İhlal: 0
hafta-kapisi-kos.ts --hepsi   → Öğretilmeden istenen: **0** (kesin 0, sınırda 0) · Hafta sonu testi: **%100** (12/12)
```

### Kalan şüpheler
- 1. turun takip işleri (31. gün c2/c5'teki DB dili, araçlardaki farklı cümle bölücüleri, **Zug**'un geç gelmesi) açık; bu dilimi engellemiyor.

## 2. tur sonucu: KAPANDI. Hata oranı 3/8 ≈ 0,38 (P1 1, P2 1, P3 1).
