# M1 düzeltme turu — dilbilimci incelemesi (#62, #63 sonrası)

Tarih: 2026-11-19 · inceleyen: dilbilimci-ajan

## 1. Kartlar

Tam incelenen (forms, coll, örnekler, tr, exp, mistakes_tr): `lx:neu`, `lx:Büro`, `lx:offen`, `lx:wieder`, `lx:da`, `lx:brauchen`, `lx:Herr`, `lx:müde`.
Yalnız `mistakes_tr`: `lx:haben`, `lx:sollen`, `lx:heißen`, `lx:machen`, `lx:vor`, `lx:Stunde`, `lx:Minute`, `lx:Abend`.

Sözlük dosyasına dokunulmadı. Yama: `/home/claude/cm/work/batch-m3.dil.json` (10 kart, `lintpatch` temiz).

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
