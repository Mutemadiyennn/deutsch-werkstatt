# M1 düzeltme turu — dilbilimci incelemesi (#62, #63 sonrası)

Tarih: 2026-11-19 · inceleyen: dilbilimci-ajan

## 1. Kartlar

Tam incelenen (forms, coll, örnekler, tr, exp, mistakes_tr): `lx:neu`, `lx:Büro`, `lx:offen`, `lx:wieder`, `lx:da`, `lx:brauchen`, `lx:Herr`, `lx:müde`.
Yalnız `mistakes_tr`: `lx:haben`, `lx:sollen`, `lx:heißen`, `lx:machen`, `lx:vor`, `lx:Stunde`, `lx:Minute`, `lx:Abend`.

Sözlük dosyasına dokunulmadı. Yama: depo dışı yama dosyası (10 kart, `lintpatch` temiz).

| Kart | Alan | Önce → sonra | Gerekçe |
|---|---|---|---|
| lx:neu | mistakes_tr[0] | `**ein neu Handy** yanlış…` → `Yeni bir telefon derken **ein neu Handy** yanlış. Doğrusu **ein neues Handy.**` | Türkçe niyet yoktu |
| lx:wieder | mistakes_tr[0] | `Yine anlamında **ie** ile yazılır: **Auf Wiedersehen.**` → `Yine buradayım derken **Ich wieder bin da** yanlış. Doğrusu **Ich bin wieder da.**` | hata göstermiyordu |
| lx:wieder | mistakes_tr[1] | `Eski duruma dönünce **wieder** denir…` → `Yine derken **wider** yazmak yanlış. Doğrusu **ie** ile **wieder.**` | hata göstermiyordu; yazım farkı açık söylendi |
| lx:da | mistakes_tr[0] | `**Ist Herr Weber da?** Bu kişi şu an burada mı demektir.` → `Doktor burada değil derken **Der Arzt ist da nicht** yanlış. Doğrusu **Der Arzt ist nicht da.**` | hata göstermiyordu |
| lx:da | mistakes_tr[1] | başına `Elimden bir şey gelmez derken` eklendi | Türkçe niyet yoktu |
| lx:da | coll | `Ist … da? / … orada mı? … burada mı?` → `Ist Herr Weber da? / Weber Bey burada mı?` | kart çevirisinde üç nokta yasak |
| lx:brauchen | mistakes_tr[0] | başına `Yardıma ihtiyacım var derken` eklendi | Türkçe niyet yoktu |
| lx:Herr | mistakes_tr[0] | başına `Weber Bey'le derken` eklendi | Türkçe niyet yoktu |
| lx:Herr | mistakes_tr[1] | `**Herr Mehmet** yanlış. Soyadıyla söyle…` → `Mehmet Kaya'ya seslenirken **Herr Mehmet** yanlış. Doğrusu soyadıyla **Herr Kaya.**` | Türkçe niyet yoktu |
| lx:Büro | forms[2].hint_tr | `**Wir suchen** dedikten sonra **das Büro**, **ein Büro** olur.` → `**Wir suchen** dedikten sonra **ein Büro** aynen kalır.` | ipucu yanlıştı: **das** → **ein** dönüşümü hâl değişimi değil; **ein Büro** bu konumda değişmez |
| lx:Stunde | mistakes_tr[0] | `**zwei Stunden** iki saat sürer, **zwei Uhr** saat ikidir.` → `İki saat bekliyorum derken **Ich warte zwei Uhr** yanlış. Doğrusu **Ich warte zwei Stunden.**` | hata göstermiyordu |
| lx:Abend | mistakes_tr[0] | `Her akşam için **abends**, bir akşam için **am Abend** dersin.` → `Bu akşam geliyorum derken **Ich komme diese Abend** yanlış. Doğrusu **Ich komme heute Abend.**` | hata göstermiyordu; Türkçe konuşanın tipik hatası |
| lx:Abend | mistakes_tr[1] | `Ayrılırken iyi akşamlar derken` → `İyi akşamlar dilerken` | iki `-ken` üst üste |
| lx:machen | mistakes_tr[0] | `**Dusche machen** … **duschen**` → `**Ich mache Dusche** … **Ich dusche.**` | niyet cümle, örnek mastardı; eşleşmiyordu |
| lx:sollen | mistakes_tr[1] | `Teklifte **Muss ich…**` → `Pencereyi açayım mı derken **Muss ich das Fenster aufmachen?** yanlış. Doğrusu **Soll ich…**` | Türkçe niyet yoktu |

Hatasız bulunanlar: `lx:offen`, `lx:müde`, `lx:haben`, `lx:heißen`, `lx:vor`, `lx:Minute` (Almanca, çeviriler, boşluk doldurmalar ve hata notları doğru).

## 2. Gün dosyaları ve hafta sonu testi

`m1duz.de.txt` içindeki `video/` dışı 84 alan bağlamıyla okundu; testin 12 maddesi tam okundu. `video/` altındaki 10 alan görev gereği incelenmedi.

| Dosya | Alan | Önce → sonra | Gerekçe |
|---|---|---|---|
| gun-01 | sahne.sahneler[s13b].de / .tr | `Das ist Wochenende!` / `Yani hafta sonu!` → `Samstag ist Wochenende!` / `Cumartesi hafta sonu!` | artikelsiz `Das ist Wochenende` doğal değil; yeni cümle yalnız öğretilmiş kelimelerle ve s14 ile aynı kalıpta |
| gun-02 | okuma_yazma.yazma.accepted_kaliplar | + `Mein Urlaub ist im/Anfang/Ende ___.` | aynı günün `cevapla` maddesi `Mein Urlaub ist im Juli.` kabul ediyor; yazmada reddedilirdi |
| test t05 | accepted | + 5 varyant (`Können Sie das bitte noch einmal sagen?`, `Entschuldigung, können Sie das (bitte) wiederholen?`, `Wie bitte? Noch einmal, bitte.`, `Bitte noch einmal.`) | haksız ret riski |
| test t09 | accepted | + 6 varyant `Ja, ich bin neu hier. Ich bin {name}. …` | soru `Sind Sie neu hier?`; en doğal cevap listede yoktu (`neu hier` kartın eşdizimi) |
| test t12 | accepted | + `Der ist im Mai.`, `Im Mai ist der Termin.` | haksız ret riski |

Kalan alanlar doğru, doğal ve A1 için uygun bulundu. Bütün üretim maddelerinde `accepted` ≥ 3; öğrenci satırlarında `{name}` / `{Herr|Frau}` yer tutucuları yerinde.

Değişen Türkçe alan `m1duz.alanlar.txt` sonuna eklendi: `gun-01.sahne.sahneler[s13b].tr`.

Denetim: `m1audit.ts` → İHLAL 0 · `npm run content:validate` → 0 hata (59 uyarı, eskiden beri).

## Açık noktalar

1. `lx:haben.tr` (`-im var`) ve `lx:sollen.tr` (`-meli`) ek içeriyor; kart çevirisinde ek yasak. Bu turda yalnız `mistakes_tr` istendiği için dokunulmadı; LEX turuna aday.
2. `lx:sollen.mistakes_tr[0]`: kurala uyuyor ama gösterilen hata (yardımcı fiilin tümden düşmesi) pek tipik değil; kelime sırası hatası (`ich soll trinken viel Wasser`) daha gerçekçi olurdu. Değiştirilmedi.
3. `lx:offen` düzeyi A2, 2. günde (`u:m1:02`) veriliyor; `bei offenem Fenster` boşluğu ilk hafta için ağır. Doğru olduğundan bırakıldı.
4. gun-03 `prova.n3` `Neu, ja. Wie ist die Nummer?` ve okuma metnindeki `Das Büro ist in Nummer eins.` konuşma dilinde geçerli, ama sade; değiştirilmedi.
5. gun-07 `a1.d3` kelime bankasındaki `hier` ile `Wir sind für Sie hier.` de doğru bir cümle olur. Dikte olduğu için (duyulanı yaz) ret haklı; bırakıldı.
6. `video/` altındaki 10 Almanca alan bu turda incelenmedi.

## Sonuç

Kartlar: 16 kart, 15 düzeltme (10 kartta). Gün ve test: 84 alan + 12 test maddesi, 5 düzeltme. **KAPANDI** (açık noktalar engelleyici değil).

## İkinci tur

Tarih: 2026-11-19 · dilbilimci-ajan · kapsam: yazarın ikinci inceleme düzeltmelerinde değişen 50 Almanca alan (gün 1, 5, 6, 7, hafta sonu testi, video 1, 2, 3, 5, 6, 7).

### 1. Gün dosyaları (9 alan)

Değişen bütün satırlar sahnenin tamamıyla birlikte okundu. Hata bulunmadı, düzeltme yapılmadı.

| Alan | Almanca | Karar |
|---|---|---|
| gun-01 `s15` | `Heute ist Donnerstag. Danke, Frau Brandl!` | doğru, doğal |
| gun-05 `s1` | `Hallo, Ioana! Du bist früh da!` | doğru; `früh` aynı günün kartı |
| gun-05 `s15` | `Es ist zehn nach neun. Danke, Derya!` | doğru |
| gun-06 `s17` | `Nur so! Danke!` | doğru; sahne artık `s3` ile açılıyor, kanıt ve gölge kimlikleri tutarlı |
| gun-06 `a1.c1b` | `Der Arzt kommt heute um neun Uhr.` | doğru; hekim WORLD ile uyumlu (erkek); ana fikir çeldiricisi artık metinle çürütülüyor |
| gun-06 `a1.c3`, `d2`, `d4` | `Dann brauchen wir Vorname, Nachname, Geburtsdatum und Telefonnummer.` | doğru; sayım listesinde artikelsiz kullanım olağan; boşluk ve dikte kabul listesi yeni cümleyle aynı |
| gun-07 `s1` | `Hallo, Ioana! Bist du krank?` | doğru, A1 |

### 2. Hafta sonu testi kabul listeleri

Rastgele 40'ar örnek okundu. Ek olarak iki liste parçalarına ayrılıp **bütün** yapı taşları tek tek denetlendi (örneklemden daha güçlü).

- `t03` (1190 cevap, yinelenen yok): 7 selamlama × 4 tanıtma × bağlama × 17 istek. Özne düşürme (`und möchte …`) yalnızca `ich bin` ve `ich heiße` sonrasında; `hier ist` ve `mein Name ist` sonrasında hep `und ich …`. Dilbilgisi hatası yok.
- `t09` (1734 cevap, yinelenen yok): her cevapta `{name}` ve `Wendlfing` var. Özne düşürme yine yalnızca özne `ich` olan cümlelerden sonra. Kelime sırası hatası yok. Eski 96 cevabın hepsi listede duruyor.
- `t07`: yalnızca `Ja.` çıkarılmış; görev iki bilgi istediği için yerinde.

Çıkarılan kalıp: yok. Not: `t09` içinde 48 cevap `Ich bin {name} und bin aus der Türkei …` biçiminde. Dilbilgisi doğru, yalnızca `bin` iki kez geçtiği için biraz hantal. Öğrenciyi haksız reddetmemek için bırakıldı; örnek cevap olarak gösterilmemeli.

### 3. Video dosyaları (36 ön öğretim maddesi, 4 yeni soru, 1 yeni cevapla)

Altı klibin transkripti okundu; her ön öğretim maddesi, yeni soru, cevap ve tur numarası metne karşı denetlendi.

| Gün | Karar |
|---|---|
| 1 | Ön öğretim doğru. 1 düzeltme (aşağıda). |
| 2 | Ön öğretim doğru. Yeni eyalet sorusu 4. turla uyuşuyor. |
| 3 | Ön öğretim doğru. Sorular uyuşuyor. Bilinmeyen oranı açık nokta (aşağıda). |
| 5 | Ön öğretim doğru. Yeni soru (hesap yapıyor) 2. turla uyuşuyor. `d1` ve `d2` aynı turda (1. tur). |
| 6 | Ön öğretim doğru. Yeni soru (pasta ve dondurma) 8. turla uyuşuyor. |
| 7 | Ön öğretim doğru. Yeni soru 14. turla, yeni `cevapla` 5. turdaki kibar soruyla uyuşuyor; 4 kabul cevabı doğru. |

| Dosya | Alan | Önce → sonra | Gerekçe |
|---|---|---|---|
| video gün 1 | bolum.ayrinti[1].why_tr | `Eva **ich wohne** dedikten sonra …` → `Eva **wohne** dedikten sonra …` | klipte özne söylenmiyor; kalın yazılan söz duyulanla aynı olmalı |

Değişen Türkçe alan `m1duz2.alanlar.txt` sonuna eklendi: `video-01.bolum.ayrinti[1].why_tr`.

### Denetim

`m1audit.ts` → İHLAL 0 · `vcheck.py` → 7 gün `tamam` · `npm run content:validate` → 0 hata (59 uyarı, eskiden beri).

### Açık noktalar

1. **Video gün 3 bilinmeyen oranı %20,5** (`vcheck.py`; ölçüt ≤ %10; bu turdan önce %16,4). Çok kelimeli maddeler tek kalıba indirilince `heißt`, `heiße`, `komme`, `bin` sayım dışı kaldı. Aday havuzundan en iyi altı madde denendi: en düşük oran %17,8. Yalnızca ön öğretimle çözülmüyor. Seçenekler: önceki günlerin video ön öğretimini bilinen saymak (o zaman yaklaşık %15), kesiti kısaltmak (5. ve 6. tur çıkarsa süre 25 sn altına iner) ya da başka klip. Karar baş geliştiricide; dosyaya dokunulmadı.
2. Video dosyalarında yazılı `bilinmeyen.oran` eski: gün 2 (0,053 → 0,088), gün 5 (0,07 → 0,093), gün 6 (0,059 → 0,098), gün 7 (0,086 → 0,10). Hepsi sınırın içinde, gün 7 tam sınırda. Alanları baş geliştirici yeniler.
3. Video gün 5: `d1` ve `d2` aynı turu kullanıyor; gölge listesindeki 3. turda iki soru var. Hata değil, çeşitlilik zayıf.
4. `t09` içindeki `Ich bin {name} und bin aus …` biçimi (48 cevap) kabul listesinde bırakıldı.
5. gun-06 sahnesinde Ioana, birinci günde konuştuğu Herr Pichler'e adını soruyor. Dil açısından doğru; hikâye tutarlılığı baş geliştiricinin kararı.

### Sonuç

İkinci tur: 50 Almanca alan + iki kabul listesi (2924 cevap) + 6 klip. Almanca düzeltme 0, Türkçe düzeltme 1. **KAPANDI**; açık nokta 1 baş geliştirici kararı bekliyor.
