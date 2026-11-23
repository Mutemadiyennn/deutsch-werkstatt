# Örneklem kontrolü: A1 8. hafta (50.–54. gün ve görülmemiş durumlar)

Tarih: 2026-11-23 · Yapan: qa-ajan · Hat: yazar → dilbilimci (ONAY, 18 düzeltme) → okur (8 GERİ, düzeltildi) → **örneklem**
Dosyalar: `content/v2/m1/gun-50.json` … `gun-54.json`, `content/v2/m1/gorulmemis-08.json` (dal `content/a1-hafta-08`)

## Yöntem

**Evren:** 343 madde. Madde: bir görev cümlesi, bir dikte basamağı, bir anlama sorusu (`ana_fikir`, `ayrinti`, `eylem`, halka sahne sorusu, okuma sorusu), bir `cevapla` (sahne, ses, okuma o4), bir prova seçeneği, bir gün sınavı maddesi, bir görsel ya da bir görülmemiş durum.
Dağılım: anlama 76 · dikte 75 · prova 57 · sınav 55 · görev 38 · görsel 20 · cevapla 18 · görülmemiş 4.

**Seçim (tekrarlanabilir):** Python `random.Random(20261123)`. Her gün için sırayla görev, dikte, anlama, cevapla, prova, sınav türlerinin her birinden 1 madde (`rnd.choice`), ardından o günün kalanından 1 madde daha; en sonda görülmemiş durumlardan 2 madde (`rnd.sample`). Madde listesi dosya içindeki sırayla kurulur (halkalar → sahne bölümleri → sesler → görsel → prova → okuma → sınav).
**Örneklem: 37 madde** (evrenin %10,8'i). Her gün 7 madde, görülmemiş 2. Türler: görev 6 · dikte 7 · anlama 6 · cevapla 5 · prova 6 · sınav 5 · görülmemiş 2. Görsel türüne tohum denk gelmedi.

**Her madde için denetim:** Almancanın doğruluğu ve doğallığı · Türkçenin doğruluğu ve OD-9'a uygunluğu (terim yok, İngilizce yok) · `ans` ve `kanit` (cümle kimliği; okumada 0'dan başlayan sıra, FORMAT.md) · `accepted` içindeki her cevap doğru mu ve görevi karşılıyor mu · doğal bir doğru cevap eksik mi · o güne kadar öğretilmemiş bir şey isteniyor mu.
Haksız ret riski yapay zekâsız ölçütle sınandı: `web/src/core/answer.ts` `ruleVerdict` (Node 22, `--experimental-strip-types`, `{name}` yerine sahte ad). `ask_ai` sonucu yapay zekâsız kipte "kontrol edilemedi" olur ve D-097'ye göre doğru sayılmaz.

## Sınama (benzetim)

`SIM=/tmp/claude-0/sim8q OUT=/tmp/claude-0/s8q REPO=/home/claude/dw-h08 /tmp/claude-0/s/sim.sh /tmp/claude-0/s/a1k-h7.json 50 gun-5[0-4].json gorulmemis-08.json`

- `içerik v2: … → 5 hata, 276 uyarı`. 5 hatanın hepsi bilinen tür: `m1:50:h1` … `m1:54:h1`: `3 kart (4–6)`.
- 50.–54. gün için "öğretilmemiş" ve "bilinmeyen" uyarısı 0. AK-3 sayacı: `50. gün 0/24, 51. gün 0/23, 52. gün 0/21, 53. gün 0/21, 54. gün 0/23`.
- Dosyalarda kalan uyarılar: `yeni_kartlar: 3 kart (hedef 15–25)`, `gerçek insan videosu yok (PM-055)`, B7 `_adsiz` yuvası (aynı tür 1. günde de var). Bu örneklemin kapsamı dışında.
- `dikis.out`: 50–54 satırları `0 | 0 | 0 | 0 | 0`, ihlal yok.

## Genel taramalar (bütün dosyalar)

- **Kişisel bilgi, kurs ya da kitap adı:** yok (telc, Goethe, DTZ, VHS, Integrationskurs ve yaygın ders kitabı adları tarandı). Öğrenci satırlarında `{name}` ve `{Herr|Frau}` kullanılmış.
- **Bairisch:** yok. Yalnız kabul listelerinde kaynaklı **Grüß Gott** (51, 54) ve gündelik **Nee** (52, Hochdeutsch gündelik) var. **Semmel** bölgesel standart, lehçe sayılmaz.
- **İngilizce:** öğrencinin gördüğü alanlarda yok. Yalnız görsel üretim tarifleri (`dogru_img`, `celdirici_img`) İngilizce; öğrenci görmez.
- **Aynı Almanca cümle iki kez:** `de`, `prompt_de`, `audio_de`, `ornek_de` ve `metin_de` alanlarında tam dize tekrarı yok, ne hafta içinde ne 1.–7. günle. Cümle düzeyinde (≥4 kelime) ortak parçalar var ama hepsi aynı gün içinde ve kasıtlı: `ornek_de` dinlenen cümleyi özetliyor, `prompt_de` sahnedeki satırı tekrarlıyor, prova dalları aynı satırda birleşiyor (ör. `Es geht um meinen Termin`, `Was kostet die Karte?`). İki gün arasında yalnız selam parçası `Guten Tag, Frau Brandl` ortak (50 s1 ve 54 s2, ikisi de daha uzun satırın içinde). Hata sayılmadı.

## Seçilen maddeler ve sonuçlar

| # | Dosya · yol | Tür | Sonuç | Not |
|---|---|---|---|---|
| 1 | gun-50 · `halkalar[m1:50:h1].gorev_cumleleri[6]` (Sie müssen nicht schüchtern sein.) | görev | GEÇTİ | Üç kabul de doğru; `Seien Sie nicht schüchtern` anlamca yakın. |
| 2 | gun-50 · `sesler[m1:50:a1].b1.dikte[d5]` | dikte (gerçek) | GEÇTİ | Örnek mesajla aynı; zorunlu Donnerstag, Freitag yerinde. |
| 3 | gun-50 · `okuma_yazma.sorular[m1:50:o3]` | anlama | GEÇTİ | `ans` Dokuzda; `kanit` [3] = `Kannst du ihr um neun das Büro zeigen?` |
| 4 | gun-50 · `okuma_yazma.sorular[m1:50:o4]` | cevapla | **HATA** | Aşağıda H1. |
| 5 | gun-50 · `prova.n1.secenekler[2]` (Freitag geht nicht!) | prova | GEÇTİ | Uygunsuz seçenek; geri bildirim doğru ve terimsiz. |
| 6 | gun-50 · `gun_sinavi[m1:50:s3]` (Ich rufe morgen um zehn zurück.) | sınav | GEÇTİ | `why_tr` terimsiz. |
| 7 | gun-50 · `okuma_yazma.sorular[m1:50:o2]` | anlama | GEÇTİ | `kanit` [2] = `Sie ist neu und ein bisschen schüchtern.` |
| 8 | gun-51 · `halkalar[m1:51:h1].gorev_cumleleri[8]` (Hat der Zug Verspätung?) | görev | GEÇTİ | |
| 9 | gun-51 · `sahne.b1.dikte[d2]` (Zwanzig Euro? Das ist ___!) | dikte (orta) | GEÇTİ | s9 ile aynı. |
| 10 | gun-51 · `sesler[m1:51:a1].eylem` | anlama | GEÇTİ | 9.25 c3 ile uyumlu; `kanit` [c2, c3] doğru. |
| 11 | gun-51 · `sesler[m1:51:a1].b1.cevapla` | cevapla | GEÇTİ | 6 kabul doğru. İyileştirme: `Der Bus kommt erst um neun Uhr fünfundzwanzig.` `ask_ai` çıkıyor. |
| 12 | gun-51 · `prova.n2.secenekler[2]` (Nein, sechs Semmeln!) | prova | GEÇTİ | |
| 13 | gun-51 · `gun_sinavi[m1:51:s3]` (Der Bus nach Wendlfing hat Verspätung.) | sınav | GEÇTİ | |
| 14 | gun-51 · `halkalar[m1:51:h1].gorev_cumleleri[1]` (Der Ausflug kostet zwanzig Euro.) | görev | GEÇTİ | |
| 15 | gun-52 · `halkalar[m1:52:h1].gorev_cumleleri[5]` (Wir wandern zum See.) | görev | GEÇTİ | |
| 16 | gun-52 · `sahne.b1.dikte[d2]` (Ich habe kein ___.) | dikte (orta) | GEÇTİ | |
| 17 | gun-52 · `sahne.b1.ayrinti[1]` | anlama | GEÇTİ | `kanit` [s11, s12] doğru. |
| 18 | gun-52 · `okuma_yazma.sorular[m1:52:o4]` | cevapla | GEÇTİ | Not: `Ja, das Bad ist kaputt.` gevşek ama gündelikte duyulur. |
| 19 | gun-52 · `prova.n2.secenekler[2]` (Nein.) | prova | GEÇTİ | |
| 20 | gun-52 · `gun_sinavi[m1:52:s2]` (Wir wollen am Samstag wandern.) | sınav | GEÇTİ | Okurun düzelttiği `why_tr` tek anlamlı. |
| 21 | gun-52 · `prova.n2b.secenekler[0]` | prova | GEÇTİ | Dilbilimcinin 7. düzeltmesi tutarlı: iki yol da cumartesiye çıkıyor. |
| 22 | gun-53 · `halkalar[m1:53:h1].gorev_cumleleri[6]` (Das Trinkgeld ist für Sie.) | görev | GEÇTİ | Not: biraz kitabi; gerçekte `Das ist für Sie` ya da `Stimmt so`. Doğru Almanca. |
| 23 | gun-53 · `sahne.b1.dikte[d1]` | dikte (kolay) | GEÇTİ | s11 `drei`. |
| 24 | gun-53 · `sahne.b1.ayrinti[2]` | anlama | GEÇTİ | `kanit` [s14] doğru. |
| 25 | gun-53 · `sesler[m1:53:a1].b1.cevapla` | cevapla | **HATA** | Aşağıda H2. |
| 26 | gun-53 · `prova.n3.secenekler[0]` | prova | GEÇTİ | |
| 27 | gun-53 · `gun_sinavi[m1:53:s11]` | sınav | GEÇTİ | Gezi pazar; 51. gün ve a1 ile tutarlı. İyileştirme: `Am Sonntag war ich am See. Der Zug ist ausgefallen.` `ask_ai`. |
| 28 | gun-53 · `sesler[m1:53:a1].b1.dikte[d3]` | dikte (zor) | GEÇTİ | Banka çeldiricileri (rechts, Zug) uygun. |
| 29 | gun-54 · `halkalar[m1:54:h1].gorev_cumleleri[0]` (Meine Nachbarin ist in Rente.) | görev | GEÇTİ | |
| 30 | gun-54 · `sahne.b1.dikte[d1]` | dikte (kolay) | GEÇTİ | s6 `gestern`. |
| 31 | gun-54 · `sesler[m1:54:a1].eylem` | anlama | GEÇTİ | `kanit` [c3, c4] doğru. |
| 32 | gun-54 · `sahne.b1.cevapla` | cevapla | GEÇTİ | Not: "tabletleri ne zaman alacak" eczanede "satın almak" diye de okunabilir; "doktorun söylediğini aktar" bağlamı açıyor. |
| 33 | gun-54 · `prova.n4.secenekler[0]` | prova | GEÇTİ | Kısa söyleyiş prova eşleştirmesinde en yakın seçeneğe gidiyor. |
| 34 | gun-54 · `gun_sinavi[m1:54:s10]` | sınav | GEÇTİ | Dr. Weber erkek (WORLD), `Herr Doktor` doğru. İyileştirme: `Ich habe seit gestern Schmerzen.` `ask_ai`. |
| 35 | gun-54 · `sesler[m1:54:a2].b1.dikte[d3]` | dikte (zor) | GEÇTİ | |
| 36 | gorulmemis-08 · `durumlar[m1:h08:g2]` | görülmemiş | **HATA** | Aşağıda H3. |
| 37 | gorulmemis-08 · `durumlar[m1:h08:g3]` | görülmemiş | **HATA** | Aşağıda H4. |

## Hatalar

### H1 · gun-50 · `okuma_yazma.sorular[m1:50:o4].accepted` (Derya'ya cevap)
- **Ne:** 6 kabulden 3'ünde özne yok: `Ja, um neun geht.` (**accepted[0]**: akışta model cümle olarak gösterilir), `Klar, um neun Uhr geht.`, `Kein Problem, um neun geht.` **um neun** özne olamaz; **es** gerekir. Dilbilimci aynı günün a1 `cevapla`sında aynı kusuru düzeltti (`Am Freitag um acht Uhr fünfzehn geht.` → `… geht es.`, 1. madde). Ayrıca doğru biçim reddediliyor: `Ja, um neun geht es.` ve `Ja, um neun geht's.` → `ask_ai`.
- **Öneri:** `Ja, um neun geht es.` (accepted[0]), `Klar, neun Uhr geht.`, `Kein Problem, um neun geht es.`, `Ja, um neun geht's.` `why_tr`: `Saati tekrar et ve **geht es** ile onayla.` (Aynı kalıp başka yerde yok. `Montag um halb fünf geht.` ve `Freitag um Viertel nach acht geht.` doğru, çünkü özne gün.)

### H2 · gun-53 · `sesler[m1:53:a1].bolumler[b1].cevapla.accepted[3]`
- **Ne:** `Der Zug fällt aus, wir müssen den Bus nehmen.` Görev açıkça "trenin iptal olduğunu **ve otobüsün saatini** söyle" diyor, `why_tr` de "sonra otobüs saatini söylersin" diyor. Bu kabulde saat yok ama tam eşleşmeyle "doğru" sayılıyor. Haksız kabul: öğrenci eksik cevabın tamam olduğunu öğreniyor.
- **Öneri:** `Der Zug fällt aus. Wir müssen den Bus um achtzehn Uhr zwanzig nehmen.` Ayrıca `Der Zug fällt aus. Der Bus fährt um achtzehn Uhr zwanzig.` eklensin; şu an `ask_ai`.

### H3 · gorulmemis-08 · `durumlar[m1:h08:g2].accepted` (süpermarkette süt)
- **Ne:** `why_tr`'nin kendi model cümlesi `Wo ist die Milch?` yapay zekâsız kabul edilmiyor (`ask_ai`), çünkü bütün kabullerde ek kelime var. `pt:wo-ist` kalıbı tam bu durum için `Mağazada ürün ararken **Wo finde ich die Milch?** çok doğaldır.` diyor; **finden** ve **suchen** 54. güne kadar bilinen kartlar. Yine de `Wo finde ich die Milch?`, `Entschuldigung, wo finde ich die Milch?` ve `Ich suche die Milch.` → `ask_ai`. Bu, haftanın aktarım ölçümü. Yapay zekâsız kipte doğru cevap D-097 gereği doğru sayılmıyor (haksız ret riski).
- **Öneri:** `Wo ist die Milch?`, `Wo finde ich die Milch?`, `Entschuldigung, wo finde ich die Milch?` eklensin. Not: `Ja, danke. Haben Sie Milch? Wo ist sie?` içindeki `Ja, danke` yardım teklifine biraz garip düşüyor (`Ja, gern` / `Ja, bitte`). Hata sayılmadı.

### H4 · gorulmemis-08 · `durumlar[m1:h08:g3].accepted` (partide tanışma)
- **Ne:** `why_tr` "önce **Ich bin** ile adını söyler, sonra **Freut mich!** dersin" diyor. Bu tarifin kendisi (`Ich bin {name}. Freut mich!`) ve en olası söyleyiş (`Hallo! Ich bin {name}. Freut mich!`) yapay zekâsız kabul edilmiyor (`ask_ai`). Listedeki `Ich bin` kabullerinin hepsinde **Lena** var ya da cümle başka bir şeyle bitiyor. Aynı biçimin **heiße**'li hâli (`Hallo, ich heiße {name}. Freut mich!`) ise kabul ediliyor; tutarsız.
- **Öneri:** `Hallo! Ich bin {name}. Freut mich!` ve `Ich bin {name}. Freut mich!` eklensin. İsteğe bağlı: `Hallo, ich bin {name}.`

## Hata sayılmayan notlar (iyileştirme)
- 51 a1 cevapla: `Der Bus kommt erst um neun Uhr fünfundzwanzig.` (`ask_ai`).
- 53 s11: `Am Sonntag war ich am See. Der Zug ist ausgefallen.` (`ask_ai`; listede **Ich war**'lı sırası ve **Aber**'li hâli var).
- 54 s10: `Ich habe seit gestern Schmerzen.` (`ask_ai`; listede `Ich habe die Schmerzen seit gestern.` var, daha az doğal).
- 52 o4: `Ja, das Bad ist kaputt.` gevşek ama anlaşılır.
- 53 halka: `Das Trinkgeld ist für Sie.` doğru ama kitabi.
- 54 v1 cevapla ve prova n4: eczanede "tableti almak" iki anlama gelebilir (okur aynı konuyu `goal_tr` ve `can_do` için GERİ çevirmişti). Burada bağlam anlamı açıyor.

## Oran ve karar

Hata: **4 / 37 = %10,8** (eşik %2). Yalnız dilbilgisi ve haksız kabul sayılsa (H1, H2) bile 2 / 37 = %5,4; karar değişmez.
Hata türü: kabul listeleri. Üçü doğru cevabın reddi ya da yanlış cevabın kabulü (H1, H3, H4), biri görevi karşılamayan cevabın kabulü (H2). Almanca satırlar, Türkçe metinler, `ans`/`kanit` ve dikte merdivenlerinde örneklemde hata çıkmadı.

**Öneri: dilbilimciye geri.** Odak: bütün `cevapla`, sınav `guided_response` ve görülmemiş `accepted` listelerinin taranması. Ölçüt: (a) model cümle (`accepted[0]` ve `why_tr`'de verilen biçim) dilbilgisi açısından doğru mu; (b) `why_tr`'nin tarif ettiği en kısa doğru cevap `ruleVerdict` ile `correct` çıkıyor mu; (c) her kabul görevin istediği bilgiyi taşıyor mu. Bu tarama yapay zekâsız ölçütle birkaç dakikada makineyle yapılabilir; komut bu raporun yöntem bölümünde.

ÖRNEKLEM: GERİ — 4/37
