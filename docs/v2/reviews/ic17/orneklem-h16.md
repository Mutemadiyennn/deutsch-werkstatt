# İÇ-17 · A2 16. hafta — örneklem kontrolü (qa)

Hat: yazar → dilbilimci → okur → **örneklem** (PM-113 md. 5). Her öğe kaynak dosyadan bağımsız denetlendi. Dilbilimci raporu yalnızca hafta kapısı komutunu bulmak için açıldı, bulguları kontrol listesi olarak kullanılmadı. İçerik dosyalarına dokunulmadı.
Kapsam: `content/v2/m1/gun-106.json` … `gun-112.json`, `hafta-sonu-testi-16.json`, `gorulmemis-16.json`.

## 1. Seçim yöntemi

Python `random.Random(16)` (**tohum 16**), katmanlı seçim. Havuzlar kimliğe göre sıralanır, katmanlar aşağıdaki sırayla çekilir:
1. Her gün için 3 öğe: bir halka görev cümlesi, bir dikte ya da prova düğümü (`rng.choice` yazı tura atar), bir gün sınavı maddesi. Toplam 21.
2. Hafta testinden 3, görülmemiş durumlardan 3 öğe (`rng.sample`).
3. Bütün gün havuzundan, daha önce seçilmemiş öğeler arasından 3 ek öğe.

Kimlik biçimi şöyle: halka görevi `<halka>:g<sıra>`, dikte `<sahne|ses>:<bölüm>:<dN>`, prova düğümü `<prova>:<düğüm>` (düğümün bütün seçenekleri ve `accepted` listeleri birlikte denetlendi).

| katman | havuz | seçilen |
|---|---:|---:|
| halka görev cümlesi + `accepted` | 91 | 10 |
| dikte (sahne ve ses bölümleri) | 140 | 7 |
| prova düğümü | 34 | 2 |
| gün sınavı maddesi | 77 | 7 |
| hafta testi maddesi | 12 | 3 |
| görülmemiş durum | 7 | 3 |
| **toplam** | **361** | **30 (%8,3)** |

Her günden en az 3 öğe seçildi; 107, 109 ve 111. günlerden 4'er öğe çıktı. Test ve görülmemişten 6 öğe var. qa rolünün alt sınırı "%10 ve en az 20" öğedir; görev 30 öğe istediği için 30'da kalındı. Makine denetimi bütün dosyaları kapsıyor (§4).

```python
import json, random, sys
K = sys.argv[1] + '/content/v2/m1/'
gun = {}
for n in range(106, 113):
    d = json.load(open(f'{K}gun-{n}.json'))
    h = {'halka': [], 'dikte': [], 'prova': [], 'sinav': []}
    for hl in d['halkalar']:
        for i, g in enumerate(hl['gorev_cumleleri']):
            h['halka'].append(f"{hl['id']}:g{i+1}")
    for b in d['sahne']['bolumler']:
        for x in b.get('dikte', []):
            h['dikte'].append(f"{d['sahne']['id']}:{b['id']}:{x['id']}")
    for s in d['sesler']:
        for b in s['bolumler']:
            for x in b.get('dikte', []):
                h['dikte'].append(f"{s['id']}:{b['id']}:{x['id']}")
    for dg in d['prova']['dugumler']:
        h['prova'].append(f"{d['prova']['id']}:{dg['id']}")
    for m in d['gun_sinavi']['maddeler']:
        h['sinav'].append(m['id'])
    gun[n] = h
test = [m['id'] for m in json.load(open(f'{K}hafta-sonu-testi-16.json'))['maddeler']]
gor = [g['id'] for g in json.load(open(f'{K}gorulmemis-16.json'))['durumlar']]
rng = random.Random(16)
secim = []
for n in range(106, 113):
    h = gun[n]
    secim.append(('halka', rng.choice(sorted(h['halka']))))
    k = rng.choice(['dikte', 'prova'])
    secim.append((k, rng.choice(sorted(h[k]))))
    secim.append(('sinav', rng.choice(sorted(h['sinav']))))
for x in rng.sample(sorted(test), 3): secim.append(('test', x))
for x in rng.sample(sorted(gor), 3): secim.append(('gorulmemis', x))
tum = sorted({(k, x) for n in gun for k in gun[n] for x in gun[n][k]} - set(secim))
for t in rng.sample(tum, 3): secim.append(t)
```

## 2. Ölçütler

- **Öğretilmeden isteme (PM-103 md. 3, "kendi haftanda göster"):** Öğrenciden istenen her çekimli biçim, düzensiz biçim ve Partizip, istendiği yerden önce 16. haftanın kalıp satırlarında gösterilmiş olmalı. Halka görevi için kendi halkasının ya da daha önceki bir halkanın kalıpları sayılır; halka dışı adımlar için o günün bütün halkaları sayılır. 15. haftada gösterilmiş olmak yeterli değildir. Sözcüğün kendisi (kart) için kesin tablo (A1+A2) esas alındı. Bu ölçüt örnek cevaplara (`ornek_de`) ve yanlış seçeneklere de uygulandı; bunlar istenmediği için oradaki eksik en fazla C sayılır.
- `accepted`: haksız ret, yanlış kabul, ≥ 3 biçim.
- Almanca doğru ve doğal mı; Türkçe açık mı (terim yok, İngilizce yok).
- `{name}`: öğrencinin adı sabit yazılmamış olmalı. Karşı tarafın repliğinde ünlem ya da dolgu olmamalı. Cevap tek anlamlı olmalı.

Sonuç sınıfları: **OK** = sorun yok · **A** = yanlış ya da öğrenciyi yanıltır, öğretilmeden isteme · **B** = doğal değil ya da tutarsız · **C** = küçük.

## 3. Örneklem tablosu

| # | öğe | sonuç | not |
|---:|---|---|---|
| 1 | `m1:106:h2:g2` Wir würden gern wandern, das Wetter ist wunderbar. | OK | `wir würden` aynı halkanın kalıbında (106 h2) gösterilmiş. `wandern` 8. haftada öğretilmiş. 3 kabul doğru. |
| 2 | `m1:106:p1:n4` (Pichler, son düğüm) Gut. Und bitte gehen Sie heute im Treppenhaus langsam. Gute Nacht. | OK | Replikte ünlem ya da dolgu yok, Sie doğru. Akşam karanlık merdiven için "langsam" anlaşılır. Öğrenciden cevap istenmiyor. |
| 3 | `m1:106:s3` (dikte) Mir geht es genauso. | OK | Bu cümle 106 h2 kalıbında aynen var. `why_tr` ("tek kelime yazılır") doğru. |
| 4 | `m1:107:h2:g6` Hast du gemerkt? Herr Wimmer war heute besonders nett. | **C** | `gemerkt` 107 h2 kalıbında, `war` 106 h1 kalıbında gösterilmiş; kabuller doğru. Ama nesnesiz "Hast du gemerkt?" konuşmada eksik duruyor. Kalıp satırı "Hast du das gemerkt?" diyor ve bu biçim kabulde 2. sırada var. Öneri: ana biçim "Hast du das gemerkt? …" olsun, kalıpla aynı. |
| 5 | `m1:107:v1:b1:d5` (gerçek) Toplantıdaki iki bilgiyi yaz; zorunlu: Kunde, pünktlich | **C** | Görev kalıplarla kurulabiliyor ("Am Freitag kommt ein wichtiger Kunde. Bitte kommen Sie pünktlich."). Ama `ornek_de` "Wir **sollen** pünktlich kommen." diyor. `wir sollen` 16. haftada ilk kez 109 h2'de gösteriliyor ("Sollen wir …?"); 107'ye kadar yalnız `soll` (106) var. Öneri: "Wir müssen pünktlich kommen." ya da "Bitte kommen Sie pünktlich." |
| 6 | `m1:107:s1` (dikte) Entschuldigung, störe ich? | OK | "Störe ich?" 107 h1 kalıbında var. `why_tr` terimsiz ve doğru. |
| 7 | `m1:108:h1:g7` Kannst du mich morgen zur Arbeit mitnehmen? | OK | "Kannst du mich mitnehmen?" 108 h1 kalıbında var. "mit zur Arbeit nehmen" kabulü doğal konuşma biçimi. Türkçe doğru. |
| 8 | `m1:108:p1:n2` Wo genau? Und seit wann? → 3 seçenek | **C** | İki uygun seçenek ve kabulleri doğru ("verliert … Wasser", "seit heute Morgen", "auf dem ganzen Boden" kalıplarda var). Yanlış seçenek "Gestern habe ich die Waschmaschine **benutzt**." `accepted` listesiyle konuşulabiliyor, ama `benutzt` 16. haftanın hiçbir kalıbında yok. İstenmediği için C. Öneri: kalıpta gösterilmiş bir Partizip kullanılsın (ör. "Gestern habe ich mit dem Vermieter gesprochen."). |
| 9 | `m1:108:s9` Seit wann verliert die Waschmaschine Wasser? | OK | 5 kabul doğru ve aynı anlamda. Yalnız "Seit heute Morgen." kabulü soruya tam cevap olduğu için haklı. |
| 10 | `m1:109:h1:g4` Wir treffen uns um Punkt zwölf in der Kantine. | OK | "um Punkt zwölf" 109 h1 kalıbında var. Kabuller doğru, Türkçe ("Tam saat on ikide") doğru. |
| 11 | `m1:109:a2:b1:d5` (gerçek) Lena'nın mesajı; zorunlu: Bäckerei, Bus | OK | Metinle (c2, c4, c5) tutarlı. Görev kalıplarla kurulabiliyor. Örnek cevaptaki biçimler (treffen, komme) temel biçimler. |
| 12 | `m1:109:s3` (dikte) Verzeihung, ist hier frei? | OK | 109 h2 kalıbında aynen var. `why_tr` doğru. |
| 13 | `m1:110:h1:g6` Ich kaufe mein Gemüse auf dem Markt. | OK | "auf dem Markt" 110 h1 kalıbında var. 3. kabul ("Obst und Gemüse") bilgi ekliyor ama anlamla çelişmiyor. "pazardan" belirsiz değil. |
| 14 | `m1:110:v1:b2:d5` (gerçek) Basti'nin daveti; zorunlu: neun, Fitnessstudio | **C** | Görev kalıplarla kurulabiliyor ("Wollen wir um neun ins Fitnessstudio gehen?"). `Fitnessstudio` 10. haftada öğretilmiş. Ama `ornek_de` "Basti **will** morgen …" diyor; `will` 16. haftanın kalıplarında yok, yalnız "Wollen wir" var. Öneri: "Basti möchte morgen um neun ins Fitnessstudio gehen." ya da doğrudan alıntı. |
| 15 | `m1:110:s3` (dikte) Sei nicht traurig, vielleicht ein anderes Mal. | OK | İki parça da 110 h2 kalıbında var. `why_tr` doğru. |
| 16 | `m1:111:h1:g1` Ich packe eine Jacke und Wasser in die Tasche. | OK | "Ich packe …" ve "in die Tasche" 111 h1 kalıbında var. Doğal, Türkçe doğru. |
| 17 | `m1:111:v1:b2:d5` (gerçek) Polisin söyledikleri; zorunlu: Bus, halb elf | **C** | Görev kalıplarla kurulabiliyor ("Der Bus um zehn ist voll. Es gibt auch einen Bus um halb elf."). Ama `ornek_de` "Der Bus **fährt** hinter dem Rathaus." diyor. `fährt` düzensiz biçim ve 16. haftanın kalıplarında yok (107'de yalnız "Fahr / Fahren Sie" var). Öneri: kalıba "Der Bus fährt …" eklensin ya da örnek "Der Bus ist hinter dem Rathaus." olsun. |
| 18 | `m1:111:s3` (dikte) Wann kommst du zurück? | OK | 111 h1 kalıbında aynen var. `why_tr` terimsiz. |
| 19 | `m1:112:h1:g1` Einen Augenblick, bitte, ich bin gleich da. | OK | İki parça da 112 h1 kalıbında var. Türkçe doğru. |
| 20 | `m1:112:v1:b2:d5` (gerçek) Derya'nın cevabı; zorunlu: leider, Sonntag | OK | Örnek cevap metinle (s7, s8) tutarlı. `sie hätte` 107 h2 tablosunda gösterilmiş. |
| 21 | `m1:112:s9` Basti: Heute um drei Training im Park. Kommst du mit? | OK | 5 kabulün hepsinde ret, neden ve başka gün var. Biçimler 112 h1 kalıbında ("müde vom Fest", "Wie wäre es mit Mittwoch?", "Ich würde lieber …"). Replikte dolgu yok. |
| 22 | `m1:112:t11` Treffen wir uns am Samstag um drei im Café am Stadtplatz? → ne zaman, nerede | OK | Kabuller doğru. 3. kabulde "am Stadtplatz" düşüyor; hoşgörülebilir. 112 sahnesiyle (Derya ikiye kadar çalışıyor, üçte boş) tutarlı. |
| 23 | `m1:112:t01` Was würdest du am Wochenende gern machen? | OK | `würdest` 106 h2'de gösterilmiş. `ausschlafen` 12. haftada öğretilmiş. 4 kabul doğru. |
| 24 | `m1:112:t08` Grüß Gott! Was darf's sein? → alkolsüz bir şey iste | **C** | 6 kabul doğru. `alkoholfrei` tabloda yok ama yalnız kabulde geçiyor, istenmiyor. Ama `why_tr` "İstemediğin: **kein Bier**" diyor, oysa önerilen cevabın kendisi "ein Bier ohne Alkohol". Durum metni "Starkbier istemiyorsun" diyor. Öneri: "İstemediğin: **kein Starkbier**" (111 h2 kalıbı "Ich möchte kein Starkbier."). |
| 25 | `m1:h16:g4` Kursleiterin: Wie wollen wir am Montag üben? → pazara gitmeyi öner | **C** | Almanca ve 5 kabul doğru; kişi (Kursleiterin) ve yer (`pl:sprachkurs`) yeni; `cd:m1:109` ölçülüyor. Ama Türkçe "Pazartesi … **Pazara** gidip" yan yana geliyor. Dilbilimci 112'de bu karışıklık yüzünden "pazar yeri" yazdırmıştı. Ayrıca akşam kursu ile 112'de verilen bilgi ("Der Markt ist am Vormittag") uyuşmuyor. Öneri: "pazar yerine gidip", "Pazartesi öğleden önce". |
| 26 | `m1:h16:g5` Huber: Passt es Ihnen am Dienstag um acht? → ret + perşembe | OK | Huber ve `pl:praxis` 16. haftanın derslerinde yok, kişi bu hafta için yeni. 5 kabul doğru (leider, neden, başka gün). Derste aynen geçen biçim yok. |
| 27 | `m1:h16:g3` Basti: Nach dem Training tut mir alles weh. → tavsiye | **C** | Almanca doğru; `solltest` 108 h2'de gösterilmiş; 5 kabul doğru. Ama Basti (`ch:kraus`) 110, 111 ve 112. günlerin derslerinde var, yani "başka kişi" şartı tutmuyor (12. hafta g5 emsali). Öneri: adsız biri, ör. spor salonunda "ein Kollege" ya da "eine Freundin aus dem Kurs". |
| 28 | `m1:111:v1:b2:d3` (zor, banka) Und vorsichtig, auf dem Boden ist Bier! | OK | Bankadaki çeldiriciler (Wasser, nicht) uygun. `vorsichtig` 107'de, `Boden` 108'de kart. |
| 29 | `m1:107:h1:g7` Sei vorsichtig, der Kaffee ist heiß! | OK | "Sei vorsichtig!" 107 h1 kalıbında var. "Vorsicht, …" kabulü eş anlamlı. |
| 30 | `m1:109:h2:g1` Wollen wir nach der Arbeit ins Geschäft gehen? | **B** | Dil bilgisi doğru, ama doğal değil ve Bavyera'da yanıltıcı. Güney Almanya konuşma dilinde "ins Geschäft gehen" = **işe gitmek** (Duden: Geschäft "Arbeitsstätte", ugs.). Bu yüzden "nach der Arbeit ins Geschäft gehen" kulağa çelişkili geliyor. Belirli bir dükkân da anılmıyor ("hangi dükkân?"). Kalıp satırı (`ins Geschäft gehen – dükkâna gitmek`) bu anlamı hiç anmıyor; öğrenci iş arkadaşından "Ich muss ins Geschäft" duyduğunda yanlış anlar. 3. kabul ("Nach der Arbeit, wollen wir …?") yazıda dizilişi bozuk. Öneri: "Wollen wir nach der Arbeit einkaufen gehen?" ya da "… in das neue Geschäft am Stadtplatz gehen?". Kalıp `tr`'ye bir not eklensin: "Bavyera'da 'ins Geschäft' işe gitmek de demektir". |

`{name}`: örneklemde öğrenci adı sabit yazılmamış. Dosyalarda `{name}` 106'da 21, 108'de 11 yerde geçiyor; hepsi öğrenci repliğinde. Test ve görülmemiş dosyalarında hiç geçmiyor. İngilizce köprü: örneklemde yok.

## 4. Hata sayısı ve oran

| sınıf | sayı | öğeler | oran |
|---|---:|---|---:|
| A (yanlış/yanıltır, öğretilmeden isteme) | 0 | — | %0 |
| B (doğal değil) | 1 | #30 | %3,3 |
| C (küçük) | 8 | #4, #5, #8, #14, #17, #24, #25, #27 | %26,7 |
| A + B | 1 | | %3,3 |

Öğretilmeden isteme: örneklemde **0**. Gösterilmemiş biçim yalnız örnek cevaplarda (`sollen`, `will`, `fährt`) ve bir yanlış seçenekte (`benutzt`) çıktı; dördü de C. Bunların ortak düzeltmesi tek kural: `ornek_de` ve yanlış seçenekler de "kendi haftanda göster" kuralına uysun.

## 5. Makine denetimi

- **Hafta kapısı**: `hafta-kapisi-kos.ts --hafta 16 --tablo …/a1a2-kesin.json` (scratchpad'deki birleşik A1+A2 tablosu) → **GEÇTİ**. Öğretilmeden istenen 0, anlaşılmayan karşı soru 0, hafta testi %100 (12/12), görülmemiş 7/7. Anlama sorusunun kanıtında 2 yeni sözcük var (109), engel değil.
- **Dikiş**: `dikis-kos.ts --tablo …/a1a2-kesin.json --gun 106…112` → **İhlal: 0**.
- **Önemli (baş geliştiriciye, içerik bulgusu değil):** `ci-v2.yml` hafta kapısını `--tablo` vermeden koşuyor (`hafta-kapisi-kos.ts --hepsi`). Varsayılan tablo `curriculum/a1-kesin.json`. Bu tabloyla 16. hafta **KALDI** (14 kesin: Fitnessstudio, schließen, Plan, ändern, rein, Bürgerbüro …). 15. hafta da KALDI (15 kesin). A2 tablosu varsayılan tabloya katılmadan ya da CI'a `--tablo` verilmeden bu dal KAPI'da kırmızı çıkar. Dikiş de varsayılan tabloyla 16. haftanın kartlarını "fazla (tabloda yok)" diye raporluyor.
- **Karşı taraf ünlem ve dolgu taraması** (bütün hafta, karşı tarafın `de`/`audio_de`/`prompt_de` satırları): yalnız 106 sahnesinde Ioana'nın "Alles okay?" ve "Okay, kein Problem." satırları çıktı (s8, s13 ve s8'in d2 diktesi). "Alles okay?" bir soru. s13'teki "Okay" söylem parçacığı; örneklem dışı, sayılmadı, dilbilimci bakabilir.
- Örneklem dışı not: 109'daki Lena mesajında (c3) "Vorher bin ich noch im Geschäft" de aynı "Geschäft = iş yeri" belirsizliğini taşıyor (#30 ile birlikte düzeltilebilir).

## 6. Düzeltilecekler

- **B (engel değil, B ≤ 2):** #30 `m1:109:h2:g1`. Görev cümlesi ve 3. kabul değişmeli; 109 h2 kalıp `tr`'sine Bavyera notu eklenmeli.
- **C (takip):** #4 `m1:107:h2:g6` ana biçim · #5 `m1:107:v1:b1:d5` `ornek_de` · #8 `m1:108:p1:n2` 3. seçenek · #14 `m1:110:v1:b2:d5` `ornek_de` · #17 `m1:111:v1:b2:d5` `ornek_de` · #24 `m1:112:t08` `why_tr` · #25 `m1:h16:g4` `durum_tr` · #27 `m1:h16:g3` kişi.
- Baş geliştirici: CI hafta kapısının tablo kaynağı (§5).

**SONUÇ: GEÇTİ** (A = 0, B = 1: `m1:109:h2:g1`; 8 C takip işi)

## Düzeltme (baş geliştirici, 23.11)
- B `m1:109:h2:g1`: "Wollen wir nach der Arbeit in das Geschäft da drüben gehen?" (Geschäft açıkça dükkân; kabuller düzgün sırada). C bulguları takip.
