# Sözlük taslak incelemesi, grup 06

İnceleyen: dilbilimci-ajan · 2026-11-19 · 50 kart (kart verisi, örnekler, eşdizimler, `forms`, açık OD-9 hataları)

## Sayılar
- Geçti: 31
- Düzeltildi: 19
- Kaldı: 0
- Hata oranı: 19 kart / 50 = 0,38. Yama OD-9 lint'inden geçti (kart 19, sorunlu 0). Yama sözlüğe uygulanmadı.

## Düzeltmeler (önce → sonra, gerekçe)

**Kart verisi (`verb`)**
- `lx:beeilen`: `beeilt`, `hat beeilt`, `beeilte` → `beeilt sich`, `hat sich beeilt`, `beeilte sich`. Fiil yalnızca **sich** ile kullanılır; `lx:kümmern` ile aynı gösterim.
- `lx:irren`: `irrt`, `hat geirrt`, `irrte` → `irrt sich`, `hat sich geirrt`, `irrte sich` (kart yalnızca `yanılmak` anlamını veriyor).

**Örnek kartın kelimesini kullanmıyordu (bileşik ya da başka kelime)**
- `lx:Handy` ö2: `Wie ist Ihre Handynummer?` → `Bitte schalten Sie Ihr Handy aus.`
- `lx:Tier` ö1: `Haben Sie Haustiere?` → `Im Zoo gibt es viele Tiere.`; `forms` 4 (`Haben Sie ___?` / `Haustiere`) → `Das Kind spielt gern mit ___.` / `Tieren`.
- `lx:küssen` ö3: `Küsschen!` → `Sie küsst ihr Baby auf die Stirn.`
- `lx:heilig` ö1 ve ö4: `Am Heiligabend ...`, `Arbeitest du am Heiligabend?` → `Für viele Menschen ist dieser Ort heilig.`, `– Darf ich dein Fahrrad nehmen? – Nein, mein Fahrrad ist mir heilig!`; `forms` 2 (`Am ___ feiern wir zusammen.` / `Heiligabend`) → `Das sind ___ Orte.` / `heilige`.
- `lx:stoppen` ö3 ve ö4: `Stopp, das reicht!`, `Nein, stopp!` → `Ich stoppe mal die Zeit.`, `– Läuft der Film noch? – Nein, ich hab ihn kurz gestoppt.` (dört örneğin üçü ünlem **Stopp** idi; ö2 kaldı).

**Eşdizim listesinde akraba, türemiş ya da bileşik kelime**
- `lx:weiß` (`Weißwein`), `lx:Handy` (`Handynummer`), `lx:Tier` (`Haustier`), `lx:Boden` (`der Fußboden`), `lx:Mörder` (`die Mörderin`), `lx:Anwalt` (`die Anwältin`), `lx:berichten` (`der Bericht`), `lx:küssen` (`der Kuss`, `Küsschen!`), `lx:heilig` (`Heiligabend`), `lx:stoppen` (`Stopp, das reicht!`): gerçek öbeklerle değiştirildi.

**Doğallık**
- `lx:berichten` ö4: `– Was gibt's Neues? – Das berichte ich dir später.` → `– Wie war der Termin beim Kunden? – Gut. Ich berichte morgen im Team.` (arkadaş sohbetinde **erzählen** denir; **berichten** iş bağlamına taşındı).

**`forms`**
- `lx:Mund` 2. madde: boşluk `Mund`, ipucu ise **im** birleşmesini anlatıyordu → boşluk `im` (`Ich habe eine Wunde ___ Mund.`).

**Katman**
- `lx:Boss`, `lx:Arschloch`, `lx:erwischen`, `lx:selber` ö1 ve ö2: `hd` → `alltag` (kelimeler konuşma dili; `register` `informal`).

**Açık OD-9 hataları**
- Kartsız üç girdi (`lx:solange`, `lx:irgendein`, `lx:selber`): `mistakes_tr` terim (fiil, çekilir) ve düz tırnakla yazılmıştı, hata da göstermiyordu; Türkçe niyetle başlayan gerçek hatalarla yeniden yazıldı.
- `lx:solange` `tr`: `-dığı sürece` → `sürece, olduğu sürece` (ek).
- `lx:selber` `tr`: `kendisi (konuşma dili)` → `kendi, kendisi` (parantez).
- `lx:weiß` 2. hata notu: son cümle ikinci bir bilgi ekliyordu (**Ich weiß**) → farkın yerini söyleyen tek cümle.

Yeni fotoğraf sorguları (`ex_img`): `lx:Handy` ö2, `lx:Tier` ö1, `lx:küssen` ö3. Değişen öteki örneklerde fotoğraf alanı yoktu.

## Değişen Türkçe alanlar (okur için)
- `tr`: `lx:solange`, `lx:selber`.
- `mistakes_tr` (tam liste): `lx:solange`, `lx:irgendein`, `lx:selber`, `lx:weiß` (yalnızca 2. not).
- Örnek çevirileri: `lx:Handy` ö2, `lx:Tier` ö1, `lx:berichten` ö4, `lx:küssen` ö3, `lx:heilig` ö1 ve ö4, `lx:stoppen` ö3 ve ö4.
- Eşdizim çevirileri: `lx:weiß` (1.), `lx:Handy` (2.), `lx:Tier` (1.), `lx:Mörder` (4.), `lx:Boden` (3.), `lx:berichten` (1.), `lx:küssen` (2., 4.), `lx:heilig` (1.), `lx:stoppen` (4.), `lx:Anwalt` (2.).
- `forms`: `lx:Tier` 4. madde, `lx:heilig` 2. madde (cümle, `tr`, `hint_tr`); `lx:Mund` 2. maddede yalnızca boşluğun yeri değişti.

## Kalan kartlar
Yok.

## Kalan şüpheler (düzeltilmedi)
- Kartsız üç girdide (`lx:solange`, `lx:irgendein`, `lx:selber`) `exp` yok; yazılması lex ya da yazarın işi (önceki gruplarla aynı not).
- `lx:Handy`, `lx:Tier`, `lx:weiß`, `lx:heilig`, `lx:Anwalt`, `lx:Mörder`: `exp.ipucu_tr` komşu kelimeyi anlatıyor (**Handynummer**, **Haustier**, **Weißwein**, **Heiligabend**, **die Anwältin**, **die Mörderin**). Öğretici ve okurdan geçti; dokunulmadı. `lx:Anwalt` `forms` 4 (`Anwältin`) aynı nedenle kaldı.
- `lx:Information` ö3 ve bir eşdizim kısa biçim **Info** ile; aynı kelimenin gündelik biçimi sayıldı (`alltag`), kaldı.
- `lx:Schluss` ö1 ve ö4 (`Schluss haben`): konuşma dilinde geçerli, ama iş bitişi için **Feierabend** daha yaygın; kaldı.
- `lx:entscheiden`, `lx:fürchten`, `lx:verändern`, `lx:aufhalten`: `reflexive` işaretli ama `perfekt` **sich** içermiyor; bu fiillerin **sich** siz kullanımı da olduğu için değiştirilmedi. Sözlükte gösterim iki türlü (`hat verletzt` / `hat sich gekümmert`); tek kural baş geliştiricinin kararı.
- `lx:Mörder`, `lx:Arschloch`: konu gereği sert kelimeler; örnekler polisiye ve film çerçevesinde, şiddet sahnesi yok. Pasif katmanda kalmaları uygun.
