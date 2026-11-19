# Sözlük taslak incelemesi, grup 07

İnceleyen: dilbilimci-ajan · 2026-11-19 · 50 kart (kart verisi, örnekler, eşdizimler, `forms`, açık OD-9 hataları)

## Sayılar
- Geçti: 30
- Düzeltildi: 20
- Kaldı: 0
- Hata oranı: 20 kart / 50 = 0,40. Yama OD-9 lint'inden geçti (sorunlu 0). Yama sözlüğe uygulanmadı.

## Düzeltmeler (önce → sonra, gerekçe)

**Örnek kartın kelimesini kullanmıyordu (ayrılan önekli başka fiil, bileşik ya da türemiş kelime)**
- `lx:heraus`: dört örnek de başka fiildi (**herausgeben**, **herausfinden**, **herauskommen**) ya da **raus** idi. Yeni örnekler kelimenin kendisiyle: `Das Ergebnis ist noch nicht heraus.`, `Heraus mit der Sprache!`, `Aus dem Bauch heraus würde ich Ja sagen.`, `– Wer hat gewonnen? – Das ist noch nicht heraus.` (ö4 katmanı `hd`; konuşmada **raus** denir). Eşdizimler (dört fiil → dört gerçek öbek), 1. hata notu (**herausgeben** → `noch nicht aus` / `noch nicht heraus`) ve `exp.ipucu_tr` (`Raus damit!` → `Raus mit der Sprache!`) buna göre.
- `lx:Liebling`: ö1 `Lieblingsessen`, ö3 `Lieblingslied` → `Der Jüngste ist der Liebling der ganzen Familie.`, `Schlaf gut, mein Liebling!`. Eşdizimler (üç bileşik), iki `forms` maddesi (cevap `Lieblings` kelimenin bir biçimi değildi → `mein`, `der`, `Lieblinge`), hata notu (`Liebling Film` → `meine Liebling` / `mein Liebling`) ve `exp.ipucu_tr` yeniden yazıldı.
- `lx:Weise`: ö2 `Glücklicherweise`, ö3 `Normalerweise` → `Jeder lernt auf seine Weise.`, `Auf die Weise klappt das nie!`. Eşdizimler (`glücklicherweise`, `normalerweise` → `auf andere Weise`, `in gewisser Weise`), 4. `forms` maddesi ve `exp.ipucu_tr`.
- `lx:greifen`: ö1, ö3, ö4 **zugreifen** idi → `Das Kind greift nach der Hand der Mutter.`, `Greif mal in meine Tasche, da ist der Schlüssel.`, `– Wo sind die Taschentücher? – Greif mal ins Handschuhfach.`. Eşdizim (`Greifen Sie zu!` → `in die Tasche greifen`), 4. `forms` maddesi (cevap `zu` → `in`) ve `exp.ipucu_tr`.
- `lx:zählen` ö1: `nachzählen` → `Können Sie das Geld bitte noch einmal zählen?`
- `lx:packen` ö2: `einpacken` → `Hast du die Tasche für morgen gepackt?` (fotoğraf sorgusu yenilendi).
- `lx:wundern` ö3: `Kein Wunder, bei dem Wetter!` (**das Wunder**) → `Mich wundert gar nichts mehr!`; eşdizim `Kein Wunder!` → `sich sehr wundern`.
- `lx:Markt` ö3: `Der Wochenmarkt ist super!` → `Der Markt hier ist super!`
- `lx:Tasche` ö4: `In meiner Jackentasche.` → `In der Tasche von meiner Jacke.`
- `lx:wetten` `forms` 2: `___ du mit?` (**mitwetten**) → `___ du mit mir?`

**Eşdizim listesinde akraba, türemiş ya da bileşik kelime (gerçek öbekle değiştirildi)**
- `lx:wetten` (`die Wette gewinnen`), `lx:Soldat` (`Soldaten`), `lx:schützen` (`geschützt`), `lx:Markt` (`der Supermarkt`, `der Wochenmarkt`, `der Weihnachtsmarkt`), `lx:besitzen` (`der Besitzer`), `lx:Präsident` (`der Bundespräsident`, `die Präsidentin`), `lx:Meister` (`der Meisterbetrieb`), `lx:Tasche` (`die Handtasche`, `die Jackentasche`), `lx:verhaften` (`die Verhaftung`).
- Bu yüzden `exp.ipucu_tr` değişti: `lx:Markt` (**Supermarkt** → Türkçedeki market ile karışmasın), `lx:Präsident` (**Bundespräsident** → **der Präsident von Frankreich**), `lx:Tasche` (**Jackentasche** → **in meiner Tasche**).

**Kart verisi**
- `lx:handeln` `verb.prep`: `um+Akk` eksikti (kartın iki eşdizimi ve bir örneği **um** ile).

**Katman**
- `lx:schnappen` ö1 ve ö2: `hd` → `alltag` (`register` `informal`).

**Açık OD-9 hataları**
- Kartsız iki girdi (`lx:aufs`, `lx:obwohl`): `mistakes_tr` düz tırnak ve terimle (fiil, zarf) yazılmıştı, Türkçe niyet yoktu; yeniden yazıldı. `tr`: `üstüne (auf + das)` → `üstüne` (parantez), `-diği hâlde, rağmen` → `bir şey olduğu hâlde` (ek). `lx:aufs` eşdizim çevirisinde parantez kaldırıldı (`tuvalete (konuşma)` → `tuvalete`), `aufs Dach` eklendi.

Fotoğraf sorguları: `lx:packen` ö2 yeni cümleye göre yazıldı (`ex_img`). `lx:Markt` ö3 ve `lx:Tasche` ö4 sorguları yeni cümleye de uyuyor, dokunulmadı. Değişen öteki örneklerin sorgusu yoktu.

## Kalan şüpheler (düzeltilmedi, karar baş geliştiricide)
- `lx:mitnehmen` ö4 `Zum Hieressen`: yazım tartışmalı (bitişik yazım kurala uygun, tabelalarda `zum hier Essen` de görülür); dokunulmadı.
- `lx:erhalten` ö3 `Hab ich noch nicht erhalten.` `alltag` katmanında: kelime resmî, konuşmada **bekommen** denir (kartın ipucu da böyle söylüyor); telefonda resmî daireyle konuşurken duyulduğu için bırakıldı.
- `lx:Präsident` ö1, ö3, ö4 siyasetçi sahnesi (ad ve parti yok, yalnızca konuşma ve televizyon); bırakıldı.
- `lx:Beziehung` 1. hata notu **mit dem Chef** için "aşk ilişkisini düşündürür" diyor; bu yalnızca `eine Beziehung mit jemandem haben` kalıbında belirgin, not biraz kesin kalıyor.

## Değişen Türkçe alanlar (okur için)
- `tr`: `lx:aufs`, `lx:obwohl`.
- `mistakes_tr`: `lx:aufs`, `lx:obwohl`, `lx:heraus`, `lx:Liebling`.
- `exp.ipucu_tr`: `lx:heraus`, `lx:Liebling`, `lx:Markt`, `lx:Präsident`, `lx:Weise`, `lx:Tasche`, `lx:greifen`.
- `forms` (`tr`, `hint_tr`): `lx:wetten` 2; `lx:Liebling` 1–3; `lx:Weise` 4; `lx:greifen` 4.
- Örnek çevirileri: `lx:heraus` 1–4; `lx:Liebling` 1, 3; `lx:Markt` 3; `lx:zählen` 1; `lx:Weise` 2, 3; `lx:wundern` 3; `lx:packen` 2; `lx:greifen` 1, 3, 4. (`lx:Tasche` 4 çevirisi aynı kaldı.)
- Eşdizim çevirileri: `lx:aufs`, `lx:wetten`, `lx:Soldat`, `lx:schützen`, `lx:heraus`, `lx:Liebling`, `lx:Markt`, `lx:besitzen`, `lx:Präsident`, `lx:Meister`, `lx:Weise`, `lx:Tasche`, `lx:wundern`, `lx:greifen`, `lx:verhaften`.

Sonuç: KAPANDI (50 kartın 50'si onaylanabilir; yama uygulanınca).
