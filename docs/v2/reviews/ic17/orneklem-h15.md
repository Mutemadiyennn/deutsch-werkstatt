# İÇ-17 · A2 15. hafta — örneklem kontrolü (qa, PM-113 md. 5)

Hat: yazar → dilbilimci → okur → **örneklem**. Önceki raporlar (dilbilimci-h15, okur) yalnız kapı sonucunu karşılaştırmak için açıldı. Her öğe kaynak dosyadan bağımsız denetlendi. İçerik dosyalarına dokunulmadı.
Kapsam: `content/v2/m1/gun-99.json` … `gun-105.json`, `hafta-sonu-testi-15.json`, `gorulmemis-15.json`, `dn-15.json`.

## 1. Seçim yöntemi

Python `random.Random(15)` kullanıldı (**tohum 15**). Her günün havuzu katmanlara ayrıldı ve kimliğe göre sıralandı, sonra `rng.sample` ile çekildi. Kimlik biçimleri şöyle: halka görevi `<halka>:g<sıra>`, dikte `<ses>:<bölüm>:<dN>`, prova seçeneği `<prova>:<düğüm>:o<sıra>`, sınav, test ve görülmemiş maddeleri kendi kimlikleriyle.
Kural: her gün 1 halka görev cümlesi ve 1 gün sınavı maddesi alınır. Üçüncü öğe çift sıradaki günde dikte, tek sıradakinde prova seçeneğidir. Bunun üstüne rastgele günlerden 1 dikte, 1 prova ve 1 halka eklenir (tekrar yok). Hafta testinden 3, görülmemişten 3 öğe çekilir.

| katman | havuz | seçilen |
|---|---:|---:|
| halka görev cümlesi + `accepted` | 95 | 8 |
| dikte (5 basamak) | 70 | 5 |
| prova seçeneği | 72 | 4 |
| gün sınavı maddesi | 77 | 7 |
| hafta testi maddesi | 12 | 3 |
| görülmemiş durum | 7 | 3 |
| **toplam** | **333** | **30 (%9,0)** |

Her günden en az 3 öğe var (99: 3, 100: 4, 101: 3, 102: 3, 103: 3, 104: 3, 105: 5). Test ve görülmemişten 6 öğe var.
Not: qa rolünün alt sınırı "%10 ve en az 20" madde. Görev 30 öğe istediği için 30'da kalındı (%9,0). Bütün dosyalar ayrıca makine denetiminden geçti (§4).

```python
import json, random, sys
K = sys.argv[1] + '/content/v2/m1/'
gun = {}
for n in range(99, 106):
    d = json.load(open(f'{K}gun-{n}.json'))
    p = {'halka': [], 'dikte': [], 'prova': [], 'sinav': []}
    for h in d['halkalar']:
        for i, g in enumerate(h['gorev_cumleleri']):
            p['halka'].append((f"{h['id']}:g{i+1}", g))
    for s in d['sesler']:
        for b in s['bolumler']:
            for x in b.get('dikte', []):
                p['dikte'].append((f"{s['id']}:{b['id']}:{x['id']}", x))
    for dg in d['prova']['dugumler']:
        for j, o in enumerate(dg.get('secenekler', [])):
            p['prova'].append((f"{d['prova']['id']}:{dg['id']}:o{j+1}", o))
    for m in d['gun_sinavi']['maddeler']:
        p['sinav'].append((m['id'], m))
    gun[n] = p
test = [(m['id'], m) for m in json.load(open(f'{K}hafta-sonu-testi-15.json'))['maddeler']]
gor = [(g['id'], g) for g in json.load(open(f'{K}gorulmemis-15.json'))['durumlar']]
rng = random.Random(15)
secim = []
def cek(tur, havuz, k=1):
    for kid, o in rng.sample(sorted(havuz, key=lambda t: t[0]), k):
        secim.append((tur, kid))
for i, n in enumerate(range(99, 106)):
    cek('halka', gun[n]['halka']); cek('sinav', gun[n]['sinav'])
    t = 'dikte' if i % 2 == 0 else 'prova'; cek(t, gun[n][t])
secilen = {s[1] for s in secim}
for tur in ['dikte', 'prova', 'halka']:
    n = rng.choice(range(99, 106))
    cek(tur, [t for t in gun[n][tur] if t[0] not in secilen])
cek('test', test, 3); cek('gorulmemis', gor, 3)
for s in secim: print(*s)
```

## 2. Örneklem tablosu

Her öğede şunlara bakıldı:
- Öğretilmeden isteniyor mu? Sözcük ve çekimli biçim (Partizip dahil) istenmeden önce o hafta bir kalıp satırında gösterilmiş mi (PM-103 md. 3)?
- `accepted` haksız ret ya da yanlış kabul içeriyor mu?
- Almanca doğru ve doğal mı?
- Türkçe açık mı, terim ya da İngilizce var mı?
- `{name}` kuralı uygulanmış mı?
- Karşı tarafın repliğinde ünlem ya da dolgu var mı?
- Cevap tek anlamlı mı?

Sınıflar:
- **OK**: sorun yok.
- **A**: yanlış ya da yanıltıcı.
- **B**: doğal değil ya da tek anlamlı değil (haksız ret riski).
- **C**: küçük.

Öğretim sırası, `a1-kesin.json` (gün 8–56), `a2-kesin.json` (gün 57–98) ve 99–105 günlerinin kart ve kalıp satırları birleştirilerek elle denetlendi (§4).

| # | öğe | sonuç | not |
|---:|---|---|---|
| 1 | `m1:99:h1:g6` Wo kann ich hier Geld abheben? | OK | `abheben` 99:h1 kartı ve kalıbı. "man" biçimli kabul doğru (man A2:60). |
| 2 | `m1:99:s1` (dikte) Ich musste noch Geld abheben. | OK | musste 99:h1 kalıbında. why_tr terimsiz. |
| 3 | `m1:99:a2:b1:d4` (usta) Dann musst du nicht zur Bank gehen, und es kostet nichts. | OK | Lena'nın sesli mesajı. Doğal. Türkçe doğru. Bank 99 kalıbında geçiyor. |
| 4 | `m1:100:h1:g2` Hast du einen Vorsatz für dieses Jahr? | OK | Vorsatz 100:h1 kartı. 3 kabul eş anlamlı. |
| 5 | `m1:100:s11` Hat dein Vorsatz geklappt? → Ich wollte mehr Sport machen. Das hat leider nicht geklappt. | **C** | Almanca doğru, geklappt 100:h2 kalıbında. **F1:** "Sport (machen)" hiçbir kalıp ya da halka satırında gösterilmeden üretimde isteniyor (§3). Ayrıca 5. kabul "Ich wollte **jeden Tag** Sport machen…" durumdaki bilgiyle ("daha çok spor") örtüşmüyor. Bu küçük bir yanlış kabul. |
| 6 | `m1:100:p1:n1b:o1` Jetzt? Aber an Silvester, was wolltest du da? → An Silvester wollte ich mehr Sport machen. | **C** | Akış doğru ("Ich will…" → n1b → wollte). Karşı tarafta dolgu yok. F1. |
| 7 | `m1:101:h1:g1` Darf ich Ihnen Ioana vorstellen? Wir sind zusammen im Kurs. | **C** | Almanca ve 3 kabul doğru. Türkçe "Size Ioana'yı **tanıştırabilir** miyim?" bozuk: "tanıştırmak" fiili "ile" ister. Öneri: "Sizi Ioana'yla tanıştırabilir miyim?" ya da "Size Ioana'yı tanıtabilir miyim?". Aynı kusur 101:h1'in kalıp satırında da var. |
| 8 | `m1:101:s1` (dikte) Das Gymnasium ist direkt neben dem Rathaus. | OK | Gymnasium A2:71, Rathaus A1:27, "direkt neben" 101 kalıbında. Dikte cümlesiyle (Schule) birebir aynı değil. |
| 9 | `m1:101:a1:b1:d3` (zor, banka) Die Schule ist direkt neben dem Rathaus. | OK | Bankada 2 çeldirici var (Bahnhof, der). Okulun telefon bandı gerçekçi. |
| 10 | `m1:102:h2:g6` Als Kind konnte ich überall spielen. | OK | überall 102:h2 kartı. "Als Kind konnte ich …" kalıp satırında. |
| 11 | `m1:102:s4` (dikte) Trotzdem war die Zeit schön. | OK | Kelime sırası açıklaması doğru, terim yok. |
| 12 | `m1:102:p1:n1b:o1` Als Kind? Das war doch früher! → Ja, richtig. Als Kind musste ich früh ins Bett gehen. | OK | "doch" A1:14'te çerçeve. Burada anlam taşıyor (Türkçesi "ama"), dolgu sayılmadı. Düzeltme akışı doğal. |
| 13 | `m1:103:h1:g2` Für das Geschenk fehlen zehn Euro. | OK | Çoğul uyumu (fehlen) doğru. 3 kabul eş anlamlı. |
| 14 | `m1:103:s4` (dikte) Heute ist ein ganz normaler Tag. | OK | "ein ganz normaler Tag" 103 kalıbında gösterilmiş. why_tr "normal sözcüğüne er eklenir" terimsiz. |
| 15 | `m1:103:a2:b1:d3` (zor) Bitte kommen Sie pünktlich. | OK | `c3` iki cümle, dikte yalnız ilkini istiyor. Banka hangi kısmın istendiğini belli ediyor. pünktlich A1:45. |
| 16 | `m1:104:h2:g4` Das Fahrrad sieht komisch aus. | OK | "sieht komisch aus" 104:h2 kalıbında. |
| 17 | `m1:104:s4` (dikte) Früher hat mein Fahrrad neu ausgesehen. | OK | ausgesehen 104:h1 kalıbında. Konuşma diline uygun Perfekt. |
| 18 | `m1:104:p1:n2:o2` Einen Fehler? Was ist passiert? → Zuerst wollte ich fünf Euro überweisen. Danach habe ich gesehen: Das waren fünfzig! | OK | gesehen 104 kalıbında. zuerst/danach 103'te öğretilmiş. Doğal anlatım. |
| 19 | `m1:105:h1:g4` Mit dem Fahrrad ohne Luft fahren? Das ist gefährlich! | **C** | Almanca doğal (konuşma dili). Türkçe "**Havası olmayan** bisikletle" Türkçede yapay duruyor. 104'te aynı anlam "lastiği inik" diye öğretildi. Öneri: "Lastiği inik bisikletle gitmek mi?". |
| 20 | `m1:105:s3` (dikte) Die Straßen sind heute gefährlich. | OK | Straße A1:40. Radyodaki cümleyle birebir aynı değil. |
| 21 | `m1:105:a2:b1:d1` (kolay) gefährlich / schrecklich / komisch | OK | Doğru seçenek cümlede geçiyor, çeldiriciler geçmiyor. Üçü de bu hafta öğretildi. |
| 22 | `m1:100:a1:b1:d4` (usta) Ich wollte jeden Sonntag in die Berge gehen. | OK | Berg A2:92. Tobi'nin mesajıyla tutarlı ("hier sind keine Berge"). |
| 23 | `m1:105:p1:n2:o3` (uygun değil) Was hast du ihm gesagt? → Ich habe gesagt: Ich muss noch Geld abheben. | **B** | Ret hikâye içinde doğru: 99. gün provasında saat 9.12'de "ich musste" denmişti. Ama iki sorun var. (1) `durum_tr` "Herr Wimmer'e **önce** para çekmen **gerektiğini** söyledin" iki türlü okunabiliyor. Bu cümle "çekmeden önce haber verdin" diye de anlaşılabilir. O okumada aktarılan söz "Ich muss noch Geld abheben" olur ve doğru Almancadır. (2) Geri bildirim "Olay geçmişte: muss değil musste" doğrudan aktarmada yanıltıcı bir kural öğretiyor: tırnak içindeki söz, söylendiği andaki zamanı taşır. Öneri: `durum_tr` → "Saat 9.12'de Herr Wimmer'e geç kalma nedenini söyledin: önce para çekmen gerekmişti." `geri_bildirim_tr` → "Herr Wimmer'e bunu geldiğinde söyledin; para çekme işi bitmişti: **musste**." |
| 24 | `m1:105:h1:g3` So ein blöder Tag! | **C** | Kalıp satırının aynısı, Almanca doğru. Türkçe "Ne **berbat** bir gün!" diyor, oysa 104'te "berbat" **schrecklich** diye öğretildi. Türkçeden yola çıkan öğrenci "So ein schrecklicher Tag!" derse reddedilir (kart gösterildiği için risk düşük). Öneri: "Ne can sıkıcı bir gün!" ya da "Ne saçma bir gün!". Kalıp satırındaki Türkçe de aynı. |
| 25 | `m1:105:t04` Und dein Vorsatz für das neue Jahr? Hat das geklappt? | **C** | 5 kabul doğru. Tja 102'de çerçeve olarak öğretildi. F1. |
| 26 | `m1:105:t05` (dönüştür) Wir müssen am Samstag arbeiten. → Wir mussten … | OK | mussten 99 kalıbında. Kabullerde sıra değişkesi de var. |
| 27 | `m1:105:t09` (hızlı) Besprechung um halb neun + Zahlen vom Freitag mitbringen | OK | mitbringen 104 ("Bring nichts mit!") ve 105 ("Ich bringe Kuchen mit.") kalıplarında gösterilmiş. Zahlen ve Besprechung 103'te. 4 kabul aynı iki bilgiyi içeriyor. |
| 28 | `m1:h15:g4` Luka (kuaför): Was wolltest du als Kind werden? | OK | Kişi ve yer bu haftanın derslerinde yok. "reich werden" 103'te, reisen 100'de öğretildi. 6 kabul doğru, Luka'ya "du" uygun (WORLD). "überallhin" yalnız kabulde geçiyor, istenmiyor. |
| 29 | `m1:h15:g2` Basti (spor salonu): Im Januar warst du jeden Tag hier. Und jetzt? | **C** | Almanca doğru, takvim tutarlı (hafta 15 = mart). Kişi ve yer yeni. F1. Ayrıca aktarım zayıf: içerik 100. günün kendisi ("spor kararı tutmadı"). 3. kabul ("Ich wollte im Januar jeden Tag Sport machen, aber das hat nicht geklappt.") `m1:100:s11` 5. kabulünden yalnız "im Januar" ile ayrılıyor. Öneri: kalıp aynı kalsın, istek başka olsun (ör. "jeden Morgen laufen" 100'de var, ama "Fahrrad fahren", "früh aufstehen" daha yeni). |
| 30 | `m1:h15:g5` Gerti Stadler (fırın): Heute so spät? Was war denn los? | **C** | Almanca ve 5 kabul doğru. Karşı tarafta ünlem ya da dolgu yok ("denn" 103 kalıbında). Ama hikâye `m1:104:s11`'in neredeyse aynısı ("önce lastik inikti, sonra otobüs"). 1. kabulün ilk cümlesi derste aynen geçiyor ("Zuerst hatte mein Fahrrad keine Luft."), ikincisi 103 sahnesinde aynen geçiyor ("Danach ist der Bus nicht gekommen."). Aktarım ölçülmüyor, ezber ölçülüyor. Öneri: başka iki neden (ör. "Zuerst war mein Schlüssel weg. Danach …"). |

`{name}` ve kişisel bilgi: örneklemde sabit ad ya da cinsiyet yok. On dosyada `{name}` 4 kez geçiyor, hepsi `m1:105:t11` kabullerinde ve öğrencinin repliğinde. Doğru.
İngilizce köprü: 10 dosyanın bütün `tr`/`*_tr` alanlarında yok (betikle tarandı). Karşı taraf replikleri: örneklemde ünlem ya da dolgu yok.

## 3. Bulgular (tekil)

| kimlik | sınıf | öğeler | özet |
|---|---|---|---|
| F1 | C | #5, #6, #25, #29 | "Sport (machen)" sözlükte ve tabloda yok. 100. günde kalıp ya da halka satırında gösterilmeden sahne cevabında, provada, sınavda, testte ve görülmemişte üretim olarak isteniyor. Türkçedeki "spor" sözcüğüne benzediği için risk düşük. Dilbilimci notu da aynı (dilbilimci-h15 §72). Öneri: 100:h1 kalıp satırına "mehr Sport machen – jeden Tag Sport machen" eklenmeli. Doğrulayıcı uyarırsa sözlüğe `lx:Sport` girmeli (lex). |
| F2 | B | #23 | Prova 105 n2 o3: `durum_tr` iki türlü okunabiliyor ve geri bildirim doğrudan aktarmada yanıltıcı bir zaman kuralı veriyor (öneri tabloda). |
| F3 | C | #7 | Türkçe "Size X'i tanıştırabilir miyim" bozuk (halka ve kalıp satırı). |
| F4 | C | #19 | Türkçe "havası olmayan bisiklet" → "lastiği inik bisiklet". |
| F5 | C | #24 | blöd için Türkçe "berbat" kullanılmış, oysa "berbat" schrecklich için öğretildi (halka ve kalıp satırı). |
| F6 | C | #29, #30 | Görülmemiş g2 ve g5'te kişi ve yer yeni, ama hikâye ve cümleler dersin aynısı. Aktarım ölçülmüyor. |
| F7 | C | #5 | `m1:100:s11` 5. kabul ("jeden Tag") durumla örtüşmüyor (küçük yanlış kabul). |

## 4. Makine denetimi

- `npm run content:validate`: **0 hata**, 178 uyarı. 15. haftanın uyarıları bilinen düzen uyarıları: `yeni_kartlar` < 15 ve gerçek insan videosu yok.
- `hafta-kapisi-kos.ts --hafta 15` **bu çalışma ağacında yeniden üretilemedi.** Depoda yalnız 1., 15. ve 16. haftanın gün dosyaları var (gün 8–98 yok), K(t) eksik kuruluyor:
  - Varsayılan tablo (`a1-kesin`, gün 8–56) ile sonuç KALDI, 15 kesin. Eksik sayılan sözcüklerin hepsi A2 tablosunda daha önce öğretilmiş: früher A2:96, Geldautomat A2:93, Mathe A2:57, Blumenstrauß A2:72, Plan A2:77, wenig A2:69, Überweisung. Yani bunlar yanlış alarm.
  - `--tablo a2-kesin` ile sonuç KALDI, 70 kesin. Bu sefer A1 sözcükleri (Geld, hier, auch …) eksik kalıyor.
  - Dilbilimci tam ağaçta **GEÇTİ** bildirdi (öğretilmeden istenen 0, test %100, görülmemiş 7/7). Bu sonuç burada doğrulanamadı.
  - Örneklemdeki 30 öğenin sözcükleri bu yüzden elle denetlendi: iki tablo (gün ≤ 98) ve 99–105 kalıp satırları birleştirildi (betik: scratchpad `qa-15/bak.py`). Bulunan tek boşluk F1 ("Sport"). "Bank", "neben" ve "mitbringen" sözlükte yok ama bu haftanın kalıp satırlarında istenmeden önce gösterilmiş.
- Dikiş denetçisi (`dikis-kos.ts`) aynı nedenle burada anlamlı sonuç vermiyor: tek tablo okuyor, A1+A2 birleşik değil.
- Görülmemiş `accepted` biçimleri haftanın bütün metinleriyle karşılaştırıldı (küçük harf, noktalama atıldı):
  - Derste aynen geçen tam biçim: **0**.
  - Cümle düzeyinde eşleşme var. "Das hat nicht geklappt.", "Der Bus ist nicht gekommen." gibi kalıp cümleleri beklenen ölçüde. g5'in iki cümlesinin ikisi de derste aynen geçiyor (F6).
- Bütün üretim maddelerinde `accepted` ≥ 3 (10 dosya tarandı, eksik yok).

## 5. Hata sayısı ve oran

| sınıf | öğe sayısı | oran |
|---|---:|---:|
| A (yanlış/yanıltır) | 0 | %0 |
| B (doğal değil / tek anlamlı değil) | 1 (#23) | %3,3 |
| C (küçük) | 8 (#5, #6, #7, #19, #24, #25, #29, #30) | %26,7 |
| A + B | 1 | %3,3 |

A + B oranı %3,3 ile qa rolünün %2 eşiğini aşıyor. Ama görevin geçiş ölçütü A = 0 ve B ≤ 2, bu ölçüt sağlanıyor. C'lerin dördü tek bir kökten (F1) geliyor.

## 6. Öneri (düzeltilecek ve takip)
- **F2 (B, düzeltilmeli):** `gun-105.json` prova `m1:105:p1` için `durum_tr` ve `n2` seçenek 3'ün `geri_bildirim_tr`'si (metin §2 #23'te).
- F1: 100:h1 kalıp satırına "mehr Sport machen" eklenmeli. Sözlük kaydını lex'e sor.
- F3, F5: 101:h1 ve 105:h1'de halka ve kalıp satırının Türkçesi düzeltilmeli. F4: 105:h1 g4'ün Türkçesi düzeltilmeli.
- F6: görülmemiş g2 ve g5 kalıp aynı kalacak şekilde yeni içerikle yeniden kurulmalı, sonra K(t) tam ağaçta yeniden koşulmalı.
- F7: `m1:100:s11` 5. kabulden "jeden Tag" çıkarılmalı ya da "mehr" yazılmalı.
- Hafta kapısı ve dikiş denetimi, gün 8–98 dosyalarının bulunduğu tam ağaçta (KAPI) yeniden koşulmalı.

**SONUÇ: GEÇTİ** (A = 0, B = 1 ≤ 2; düzeltme önerilen: `m1:105:p1` n2 o3 [F2]; takip: F1, F3–F7)

## Düzeltme (baş geliştirici, 23.11)
- F2 (B) `gun-105` prova `durum_tr` ve n2 o3 `geri_bildirim_tr`: rapordaki öneri aynen uygulandı.
- F3, F5 (C): "Sizi Ioana ile tanıştırayım mı?" · blöd için "Ne saçma bir gün!".
- F1, F4, F6, F7: takip (bulunamadı ya da küçük; inceleme turunda bakılır).
