# Sözlük taslak incelemesi, grup 04

İnceleyen: dilbilimci-ajan · 2026-11-19 · 50 kart (kart verisi, örnekler, eşdizimler, `forms`, açık OD-9 hataları)

## Sayılar
- Geçti: 27
- Düzeltildi: 23
- Kaldı: 0
- Hata oranı: 23 kart / 50 = 0,46. Yama OD-9 lint'inden geçti (kart 23, sorunlu 0). Yama sözlüğe uygulanmadı.

## Düzeltmeler (önce → sonra, gerekçe)

**Örnek kartın kelimesini kullanmıyordu**
- `lx:normal` ö2: `Normalerweise arbeite ich bis fünf.` → `Heute war ein ganz normaler Tag.` Aynı nedenle `forms` 2 (`Normalerweise`) → `Das sind ganz ___ Preise.` (**normale**); 1. hata notu (**Normalerweise** söz dizimi) → `normal in Kindern` / `normal bei Kindern`.
- `lx:Ehre` ö3, ö4: `Ehrenwort!` (iki kez) → `Was verschafft mir die Ehre?`, `Klar, es ist mir eine Ehre!`; `exp.ipucu_tr` da **Ehrenwort** yerine kartın kalıbını anlatıyor.
- `lx:fassen` ö2, ö3: `Bitte nicht anfassen!`, `Fass mich nicht an!` (**anfassen**) → `Sie fasst das Kind fest an der Hand.`, `Fass dich kurz, ich hab keine Zeit!`; `forms` 3 → `___ dich bitte kurz!`
- `lx:meist` ö2, ö3, ö4: üçü de **meistens** (kendi kartı var) → `Meist bin ich um sechs zu Hause.`, `Das meiste hab ich schon erledigt.`, `Die meisten aus dem Kurs.`

**Eşdizim listesinde akraba, türemiş ya da bileşik kelime**
- `lx:überall` (`überallhin`), `lx:gehören` (`dazugehören`), `lx:normal` (`normalerweise`), `lx:brechen` (`gebrochen`), `lx:Party` (`eine Geburtstagsparty`), `lx:Ehre` (`Ehrenwort!`), `lx:angreifen` (`der Angriff`), `lx:melden` (`sich krankmelden`), `lx:Erde` (`Blumenerde`), `lx:Mord` (`die Mordkommission`), `lx:fassen` (`anfassen`), `lx:meist` (`meistens`): gerçek öbeklerle değiştirildi.

**Şiddet sahnesi**
- `lx:angreifen` ö1, ö4, `forms` 3: sokakta saldırıya uğrama cümleleri → spor ve hayvan bağlamı (`Unsere Mannschaft greift sofort an.`, `Greifen Wespen Menschen an?`, `Der Hund hat niemanden ___.`); eşdizim `von hinten angreifen` → `sofort angreifen`.
- `lx:umbringen` ö1: `In dem Krimi wird ein Mann umgebracht.` → `Diese Kopfschmerzen bringen mich um.`
- `lx:Mord` `forms` 2 ve 4: gerçek olay gibi okunan cümleler (`Er hat einen Mord begangen.`, `In der Stadt gab es zwei Morde.`) kurgu bağlamına alındı (polisiye, kitap).

**Doğallık**
- `lx:ansehen` ö4 ve `forms` 5: `Hast du den Film angesehen?` → `Hast du dir den Film angesehen?` (kart ve öteki örnekler **sich etwas ansehen** öğretiyor).

**Kart verisi**
- `lx:Million` `level`: B1 → A2 (sayı kelimesi).
- `lx:umbringen` `verb`: `reflexive: true` kaldırıldı (geçişli fiil; dönüşlü kullanım öğretilmiyor).

**Katman (`hd` → `alltag`)**
- `register` `informal` olan kartların ö1 ve ö2'si: `lx:Hölle`, `lx:Kumpel`, `lx:cool`, `lx:tja`, `lx:Idiot`, `lx:total`, `lx:umbringen`, `lx:blöd`; ayrıca `lx:völlig` ö2 (`völlig fertig`).

**Açık OD-9 hataları**
- `lx:tja` (kartsız) `mistakes_tr`: kelime anılmadan yazılmış iki not, kelimeyi ve Türkçesini veren iki cümleyle yeniden yazıldı.
- `lx:völlig` ö2 çevirisi: `Tamamen bittim.` → `Tamamen bitkinim.` (eşdizimdeki `tamamen bitkin` ile aynı Almancaya tek karşılık).

Değişen örneklerin hiçbirinde fotoğraf sorgusu yoktu ya da sahne değişmedi (`lx:ansehen` ö4); `ex_img` gerekmedi.

## Değişen Türkçe alanlar (okur için)
- `mistakes_tr` (tam liste): `lx:tja` (ikisi yeni), `lx:normal` (yalnızca 1. not yeni).
- `exp`: `lx:Ehre` (`ipucu_tr`).
- Örnek çevirileri: `lx:normal` ö2, `lx:umbringen` ö1, `lx:völlig` ö2, `lx:Ehre` ö3 ve ö4, `lx:angreifen` ö1 ve ö4, `lx:fassen` ö2 ve ö3, `lx:meist` ö3 ve ö4.
- Eşdizim çevirileri: `lx:überall` (1.), `lx:gehören` (2.), `lx:normal` (3.), `lx:brechen` (2.), `lx:Party` (4.), `lx:Ehre` (3.), `lx:angreifen` (2., 4.), `lx:melden` (2.), `lx:Erde` (2.), `lx:Mord` (2.), `lx:fassen` (2.), `lx:meist` (2.).
- `forms` (`tr`, `hint_tr`): `lx:normal` 2., `lx:angreifen` 3., `lx:Mord` 2. ve 4., `lx:fassen` 3.

## Kalan kartlar
Yok.

## Kalan şüpheler (düzeltilmedi)
- `lx:Mord`: kartın konusu cinayet; kalan örnekler polisiye ve haber dili (`Die Polizei ermittelt wegen Mordes.`). Kartın onaylı partide yer alıp almayacağı baş geliştiricinin kararı.
- `lx:Hölle`: `Fahr zur Hölle!` eşdizim ve `forms` maddesi olarak duruyor; beddua, sahne değil. `Was zur Hölle ist das?` çevirisi `Bu da ne halt?` kaba kaçabilir; okurdan geçtiği için dokunulmadı.
- `lx:tja` kartsız, `exp` yok (önceki gruplarla aynı not).
- `lx:normal` ve `lx:meist`: `exp.ipucu_tr` hâlâ komşu kelimeyi (**normalerweise**, **meistens**) anlatıyor; öğretici, dokunulmadı. `lx:Erde` 2. hata notu **Blumenerde** üzerine; **Erde** ile **Boden** karışmasını gösterdiği için kaldı. `lx:fassen` 2. hata notu **anfassen** karşıtlığı; kaldı. **anfassen** sözlükte yok, eksik kart lex'e not.
- `lx:angreifen`: Bavyera ve Avusturya'da `dokunmak` anlamı da duyulur; kaynak aranmadı, karta yazılmadı.
- `lx:wert`: `den Preis wert` doğru; gündelik dilde `sein Geld wert` daha sık. Değiştirilmedi.
- `lx:Kumpel`: çoğul `Kumpel` standart, örnek ve eşdizimdeki `Kumpels` konuşma dili (örnek katmanı `alltag` yapıldı).
- `lx:Erde` (B1) ve `lx:trotzdem` (A2) düzeyleri kaynak listeyle doğrulanmadı.
- Tanımlık boşluklarında cevap yalnızca Türkçe çeviriyle tekleşiyor (önceki gruplarla aynı kabul).

## Sonuç
KAPANDI (23 kart düzeltildi; değişen Türkçe alanlar okura gitmeli).
