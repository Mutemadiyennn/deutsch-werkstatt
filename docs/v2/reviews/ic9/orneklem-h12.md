# İÇ-9 · A2 12. hafta — örneklem kontrolü (qa)

Hat: yazar → dilbilimci → okur → **örneklem**. Önceki raporlar okunmadı; her öğe kaynak dosyadan bağımsız denetlendi. İçerik dosyalarına dokunulmadı.
Kapsam: `content/v2/m1/gun-78.json` … `gun-84.json`, `hafta-sonu-testi-12.json`, `gorulmemis-12.json`, `registry/grammar.json` `gr:a2-07:t1`–`t4`.

## 1. Seçim yöntemi

Python `random.Random(12)`, katmanlı; her katmanın havuzu kimliğe göre sıralanır, sonra `rng.sample` (katmanlar şu sırayla çekilir). Kimlik biçimi: halka görevi `<halka>:g<sıra>`, dikte `<ses>:<bölüm>:<dN>`, gölge `<ses>:<bölüm>:golge:<cN>`, prova seçeneği `<prova>:<düğüm>:o<sıra>`.

| katman | havuz | seçilen |
|---|---:|---:|
| halka görev cümlesi + `accepted` | 88 | 10 |
| dikte / gölge (seslerin bölümleri) | 98 | 5 |
| gün sınavı maddesi | 77 | 5 |
| prova seçeneği | 86 | 4 |
| hafta testi maddesi | 12 | 3 |
| görülmemiş durum | 7 | 3 |
| **toplam** | **368** | **30 (%8,2)** |

Not: qa rolünün alt sınırı "%10 ve en az 20"; görev 30 öğe istediği için 30'da kalındı (%8,2). Makine denetimi bütün dosyaları kapsar (§3).

```python
import json, random, sys
K = sys.argv[1] + '/content/v2/m1/'
havuz = {k: [] for k in ['halka', 'dikte_golge', 'sinav', 'prova', 'test', 'gorulmemis']}
for n in range(78, 85):
    d = json.load(open(f'{K}gun-{n}.json'))
    for h in d['halkalar']:
        for i, g in enumerate(h['gorev_cumleleri']):
            havuz['halka'].append((f"{h['id']}:g{i+1}", g))
    for s in d['sesler']:
        cm = {c['id']: c for c in s['script']}
        for b in s['bolumler']:
            for x in b.get('dikte', []):
                havuz['dikte_golge'].append((f"{s['id']}:{b['id']}:{x['id']}", x))
            for c in b.get('golge', []):
                havuz['dikte_golge'].append((f"{s['id']}:{b['id']}:golge:{c}", cm.get(c, c)))
    for m in d['gun_sinavi']['maddeler']:
        havuz['sinav'].append((m['id'], m))
    for dg in d['prova']['dugumler']:
        for j, o in enumerate(dg.get('secenekler', [])):
            havuz['prova'].append((f"{d['prova']['id']}:{dg['id']}:o{j+1}", o))
for m in json.load(open(f'{K}hafta-sonu-testi-12.json'))['maddeler']:
    havuz['test'].append((m['id'], m))
for g in json.load(open(f'{K}gorulmemis-12.json'))['durumlar']:
    havuz['gorulmemis'].append((g['id'], g))
kota = {'halka': 10, 'dikte_golge': 5, 'sinav': 5, 'prova': 4, 'test': 3, 'gorulmemis': 3}
rng = random.Random(12)
for k in kota:
    for kid, o in rng.sample(sorted(havuz[k], key=lambda t: t[0]), kota[k]):
        print(k, kid)
```

## 2. Örneklem tablosu

Ölçütler: Almanca doğru ve doğal mı (Dativ/Akkusativ, zamir sırası, seit + şimdiki zaman) · her `accepted` doğru ve aynı anlamda mı (≥ 3) · Türkçe doğru mu · tıbbi/acil bilgi doğru ve güvenli mi · istenen sözcük o güne kadar öğretilmiş mi · `{name}`/kişisel bilgi · İngilizce köprü.
Sonuç: **OK** = sorun yok · **A** = yanlış/yanıltır · **B** = doğal değil · **C** = küçük.

| # | öğe | sonuç | not |
|---:|---|---|---|
| 1 | `m1:82:h1:g11` Wendlfing ist ein Ort an der Vils. | OK | 3 kabul doğru; 2. biçim ("…, in Bayern") bilgi ekliyor ama anlamla çelişmiyor. `lx:Ort` 82'de kart. |
| 2 | `m1:80:h1:g1` Seit drei Tagen habe ich Halsschmerzen. | OK | seit + şimdiki zaman doğru; "Üç gündür boğazım ağrıyor" tam karşılık. |
| 3 | `m1:84:h1:g5` Der Rettungswagen kommt in zehn Minuten. | OK | Kabul biçimleri eş anlamlı ("ist … da"). `lx:Rettungswagen` 84:h1'de kart (sözlükte kaydı yok, §3). |
| 4 | `m1:82:h1:g7` Wer hat am Samstag gewonnen? | OK | Perfekt doğru; "das Spiel" eklentisi anlamı korur. |
| 5 | `m1:84:h1:g6` Rufen Sie bitte einen Rettungswagen! | OK | Akkusativ doğru; acil durumda gerçekçi rica. |
| 6 | `m1:80:h1:g8` Mit Rückenschmerzen kann ich nicht gut sitzen. | OK | mit + Dativ (çoğul) doğru; şu anki ağrı için daha doğal "Mit den Rückenschmerzen…" da kabulde. |
| 7 | `m1:79:h1:g1` Die Nummer vom Notruf ist eins, eins, zwei. | OK | 112 doğru (acil çağrı). Daha doğal "Die Notrufnummer ist …" kabulde. vom = von dem (t4). |
| 8 | `m1:81:h1:g11` Kommst du am Freitag zur Feier? | OK | zur = zu der doğru; "Freitag" artikelsiz biçim konuşma dilinde doğal. |
| 9 | `m1:78:h1:g10` Kannst du mir einen Biergarten empfehlen? | OK | mir (Dativ) + einen (Akkusativ) doğru, sıra doğru. |
| 10 | `m1:81:h1:g10` Da ist ein Brot vom Supermarkt drin. | OK | Doğal konuşma; "aus dem Supermarkt", "Da drin ist …" eş anlamlı. |
| 11 | `m1:82:a1:b1:golge:c3` Haben Sie in der Stadt etwas verloren? Eine Tasche, einen Schlüssel, eine Karte? | OK | Akkusativ sayımı doğru; anons için doğal. |
| 12 | `m1:80:a2:b1:d1` (c3: "Ich fahre morgen mit Tobi zur Polizei, wegen dem Fahrrad.") — Hangi adı duydun? | OK | Cevap Tobi doğru. "wegen dem" konuşma dilinde (sesli mesaj) gerçekçi; yalnız dinleme, üretim istenmiyor. |
| 13 | `m1:83:a2:b1:golge:c4` Verstehen Sie etwas nicht? Dann fragen Sie: Können Sie das bitte wiederholen? | OK | Öğrencinin en çok işine yarayacak cümlelerden; Türkçe doğru. |
| 14 | `m1:82:a1:b1:d3` (zor, banka) Die Mannschaft aus Wendlfing hat am Samstag gewonnen: drei zu eins! | OK | Bankada çeldiriciler (Sonntag, verloren) uygun; skor okunuşu doğru. |
| 15 | `m1:84:a1:b1:d5` (gerçek) İki talimatı yaz: bis Mittwoch / am Donnerstag anrufen | OK | Metinle (c2, c3) tutarlı; ilaç talimatı güvenli ("nur noch bis Mittwoch"). |
| 16 | `m1:84:s9` Wie geht es Ihnen jetzt? → Gut, danke. Am Dienstag gehe ich wieder zur Arbeit. | OK | 5 kabul, hepsi eş anlamlı; Frau Brandl ile Sie doğru. |
| 17 | `m1:80:s6` Bir arkadaşımla eczaneye gidiyorum. → Ich gehe mit einer Freundin zur Apotheke. | OK | mit + Dativ, zur doğru; "in die Apotheke" da doğru. |
| 18 | `m1:84:s4` (dikte) Das Rezept gebe ich Ihnen morgen. | OK | Nesne başta, Dativ zamir doğru; why_tr doğru. |
| 19 | `m1:78:s1` (dikte) Frau Brandl schenkt mir einen warmen Schal. | OK | Sıfat çekimi (einen warmen) doğru. |
| 20 | `m1:79:s6` Fotoğraf mı? Onu ona (kadına) gösteriyorum. → Das Foto? Ich zeige es ihr. | OK | Zamir sırası (es önce, ihr sonra) doğru; t2 tablosuyla tutarlı. |
| 21 | `m1:82:p1:n2:o1` Wo genau tut es weh? → Hier, auf der rechten Seite. | OK | Prova durumuyla (boğazın sağ tarafı) tutarlı; "vom Hals" konuşma dilinde doğal. |
| 22 | `m1:81:p1:n2:o2` Waren Sie schon beim Arzt? → Ja, am Mittwoch. Morgen gehe ich noch einmal zum Arzt. | OK | beim/zum ayrımı doğru; hafta takvimiyle (Çar. muayene, Cuma kontrol) tutarlı. |
| 23 | `m1:79:p1:n2:o2` Seit wann haben Sie das Fieber? → (yanlış seçenek) Um neununddreißig. | OK | Çeldirici amaçlı; geri bildirim doğru yönlendiriyor (Seit heute Nachmittag). Senaryo tıbben doğru: gece 39 ateş + kapalı muayenehane → 116117. |
| 24 | `m1:81:p1:n1:o2` Wimmer? → Guten Morgen. Ich kann heute leider nicht kommen, ich bin krank. | OK | Şefe Sie; işe hasta bildirmek için doğal ve kibar. |
| 25 | `m1:84:t04` Eczanede nezleye karşı öneri iste. | OK | 5 kabul doğru (gegen + Akkusativ). Schnupfen A1 tablosunda. |
| 26 | `m1:84:t01` Seit wann haben Sie die Schmerzen? → Seit Samstag habe ich Bauchschmerzen. | OK | seit + şimdiki zaman; Bauchschmerzen 80'de kart. |
| 27 | `m1:84:t10` Kommen Sie heute zur Feier? → Leider nicht, ich bin krank. Deshalb bleibe ich zu Hause. | OK | deshalb + fiil ikinci yerde doğru; deshalb 84'te kart (test haftanın sonunda). |
| 28 | `m1:h12:g7` Praxis'i ara, bir haftadır baş ağrısı, randevu iste (Frau Huber). | **C** | Almanca ve 5 kabul doğru. Ama görülmemiş durum kuralı "başka kişi, başka yer": karşı `ch:huber`, yer `pl:praxis`; ikisi de bu haftanın derslerinde var (Huber 78/80/82/84, Praxis 80/82). Aktarım ölçülmüyor; öneri: başka muayenehane/başka sekreter (ör. Zahnarztpraxis). |
| 29 | `m1:h12:g2` Basti fotoğrafı görmek istiyor → Klar, ich zeige es dir. | **C** | Almanca ve zamir sırası doğru, 5 kabul. Türkçe "Basti telefonundaki fotoğrafı" belirsiz (senin mi onun mu telefonu); prompt_de ("deiner Radtour") çözse de "senin telefonundaki" yazılmalı. |
| 30 | `m1:h12:g1` Fırında kendine iki, Frau Brandl'a bir Semmel. | OK | Geben Sie mir … doğru; Semmel A1'de kart; Bavyera fırınında gerçekçi. |

`{name}` / kişisel bilgi: örneklemde sabit ad ya da cinsiyet yok (79 provasında `{name}` doğru kullanılmış). İngilizce köprü: yok.
Ek okuma (örneklem dışı): `gr:a2-07:t1`–`t4` metinleri, tabloları ve örnekleri doğru; İngilizce yok; t3'te "seit ile wohne dersin, geçmiş biçimi değil" kuralı doğru. Görülmemiş `g5` (eine Ärztin, `pl:praxis`) ve `g6` (Apotheker, `pl:apotheke`) de yer bakımından derstekiyle aynı (kişi farklı); takip için not.

## 3. Hata sayısı ve oran

| sınıf | sayı | oran |
|---|---:|---:|
| A (yanlış/yanıltır) | 0 | %0 |
| B (doğal değil) | 0 | %0 |
| C (küçük) | 2 (#28, #29) | %6,7 |
| A + B | 0 | %0 |

## 4. Makine denetimi

`bash /tmp/claude-0/s/kontrol.sh 12 --tam` (doğrulayıcı tam K(t), taslak 8–77):
- Doğrulayıcı: **5 hata, hepsi bilinen "sözlükte yok"**: `lx:Quittung`, `lx:Umtausch`, `lx:Einkaufswagen` (gun-77), `lx:Rettungswagen`, `lx:Anzeige` (gun-84). Başka hata yok.
- İlgili uyarılar: gun-84'te 3 "öğretilmemiş kelime isteniyor: rettungswagen" (`ses:m1:84:a2` d3, `m1:84:s2`, `m1:84:s8`). Sözcük 84:h1'de kart olarak öğretiliyor; uyarı sözlük kaydı eksikliğinin sonucu, kayıt eklenince düşmeli. Diğer uyarılar (yeni_kartlar 4–6 < hedef 15–25, video yok) bilinen düzen uyarıları.
- Dikiş denetçisi: gün 78–84 her sütunda 0, **İhlal: 0**. (Dikiş hafta testi ve görülmemiş dosyalarını taramıyor; örneklemdeki bu maddelerin sözcükleri elle denetlendi: Schnupfen, Bauchschmerzen, deshalb, Kopfschmerzen, Semmel, Feier öğretilmiş.)

Üretim cümlesi tekrarı (betik: görev cümlesi `de`, dikte `accepted[0]` (> 2 sözcük), gölge cümlesi, uygun prova seçeneği, sınav/test/görülmemiş `accepted[0]`; küçük harf, noktalama atılmış):
- 11. hafta 305 / 12. hafta 304 üretim cümlesi; **11 ↔ 12 ana biçim tekrarı: 0**.
- 11 ↔ 12 herhangi bir kabul biçimi (> 2 sözcük): 1 (`m1:79:s9` kabulünde "Ja, hier bitte." — kalıp ifade, sorun değil).
- 12. hafta içinde: 7 eşleşme, hepsi aynı ses kaydında usta dikte ile gölgenin aynı satırı (ör. `m1:84:a1` d4 + gölge c2). Kalıp gün (gun-29) ve 11. hafta da aynı düzende; kural ihlali sayılmadı.
- Görülmemiş `accepted` biçimlerinden derste geçen: 0.

## 5. Öneri (takip, engel değil)
- #28: `g7`'yi başka kişi ve yerle yeniden kur (kalıp aynı kalsın).
- #29: `g2` `durum_tr`: "Basti senin telefonundaki fotoğrafı görmek istiyor."
- Sözlüğe 5 kayıt (lex) girince gun-84'teki 3 "öğretilmemiş" uyarısı yeniden denetlenmeli.

KARAR: GEÇTİ (A = 0, B = 0; 2 C takip işi)

## 2. tur (yalnız düzeltme ve getirdiği kusur)

Dilbilimci düzeltmeleri: `g2` durum_tr; `g5` (molada Derya), `g6` (spor salonunda Basti), `g7` (telefonda Herr Wimmer) yeniden kuruldu.

**K(t), 84. günün sonu.** Dikiş makinesi (`dikisDenetle`, içinde `bilinmeyenler()`) bu dosyayı okumuyor. Bu yüzden bellekte gun-84'ün halkaları korundu, halka dışı bölümleri boşaltıldı ve `gun_sinavi` yerine 7 durumun `prompt_de`si ile **bütün** `accepted` biçimleri madde olarak kondu (dosyaya yazılmadı; betik: scratchpad `gor-kt.ts`, tablo `/tmp/claude-0/s/tablo.json`, kaynak `/home/claude/h12/content/v2/m1`).
- 7 `prompt_de`: 0 bilinmeyen. 7 `accepted[0]`: 0 bilinmeyen.
- Yan kabul biçimlerinde 2 bilinmeyen var, ikisi de düzeltilmemiş durumlarda: `g1` a4 "davon" (tabloda yok), `g4` a2 "danach" (15. hafta). Bunlar istenen sözcük değil, yalnız kabul ediliyor; engel değil.
- Makinenin doğru çalıştığı da görüldü: aynı koşu bu iki sözcüğü yakaladı.

**Derste aynen geçen öğrenci biçimi:** 0. Betik `accepted` biçimlerini 12. haftanın görev cümlesi, dikte, gölge, prova, gün sınavı ve hafta testiyle karşılaştırdı.

**Almanca ve `accepted`:**

| durum | sonuç | not |
|---|---|---|
| g2 | OK | "Basti senin telefonundaki fotoğrafı…" ile belirsizlik giderilmiş. |
| g5 | OK (dil) · C | Almanca, 5 kabul ve Türkçe doğru; du doğru, seit + şimdiki zaman doğru. Ama Derya (`ch:aksoy`) bu haftanın 7 dersinin hepsinde var, yani "başka kişi" tutmuyor. Öneri: adsız bir iş arkadaşı (ör. "eine Kollegin"). |
| g6 | OK | Basti hiçbir derste yok; yer (`pl:fitness`) yeni. "Mach jetzt zehn Minuten Pause und trink viel Wasser!" doğal; 5 kabul doğru ve aynı anlamda. Doktor talimatını başka bir konuşmacıya aktarma becerisi doğru ölçülüyor. |
| g7 | **GERİ** | Almanca ve 5 kabul doğru (seit + şimdiki zaman, deshalb + fiil 2. yerde, Herr Wimmer'e Sie). Ama düzeltme asıl bulguyu gidermiyor, yeni bir kusur getiriyor. (1) Herr Wimmer'i arayıp hastalık bildirmek 81. günün provasının **aynı kişi ve aynı durumu** (`m1:81:p1` n1: "Guten Morgen, Herr Wimmer. Ich bin noch krank und bleibe heute zu Hause."). Hafta testi `m1:84:t10` da aynı ("Leider nicht, ich bin krank. Deshalb bleibe ich zu Hause."). 3. kabul ("Guten Morgen, Herr Wimmer. … deshalb bleibe ich heute zu Hause.") neredeyse ders cümlesi; aktarım ölçülmüyor. (2) `cd:m1:84` ("Dr. Weber'in sorularına cevap verip şikâyetimi ayrıntılı anlatırım") bir doktor sorusuna yanıt ister; patronun "Was ist los?" sorusu bu beceriyi ölçmüyor. |

**g7 için öneri:** Kalıp ve beceri aynı kalsın, kişi ve yer yeni olsun. Örnek: Pazar günü Bereitschaftspraxis'te nöbetçi doktor (`der Arzt im Bereitschaftsdienst`, adsız) soruyor: "Was fehlt Ihnen, und seit wann?" Beklenen kabul: "Ich habe seit gestern Bauchschmerzen, deshalb bin ich hier." gibi ≥ 3 biçim. Yeniden kurulunca K(t) aynı yöntemle yeniden koşulmalı. Tıbbi güvenlik için: sağ alt karın ağrısı gibi alarm belirtisi yazılmamalı; yazılırsa 112 ya da acil servis yönlendirmesi gerekir.

KARAR: GERİ (g7: kişi ve durum `m1:81:p1` ve `m1:84:t10` ile aynı, `cd:m1:84` ölçülmüyor; öneri yukarıda; g5 C takip)
