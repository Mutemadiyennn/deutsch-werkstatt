# Sözlük taslak incelemesi, grup 08

İnceleyen: dilbilimci-ajan · 2026-11-19 · 44 kart (kart verisi, örnekler, eşdizimler, `forms`, açık OD-9 hataları)

## Sayılar
- Geçti: 26
- Düzeltildi: 18
- Kaldı: 0
- Hata oranı: 18 kart / 44 = 0,41. Yama OD-9 lint'inden geçti (kart 18, sorunlu 0). Yama sözlüğe uygulanmadı; `content:validate` yama uygulanınca baş geliştiricide.

## Düzeltmeler (önce → sonra, gerekçe)

**Kart verisi**
- `lx:ständig`: `pos` `adv` → `adj` (`forms` kelimeyi çekimli kullanıyor: **der ständige Lärm**; `lx:ewig`, `lx:gemeinsam` ile aynı gösterim).

**Örnek kartın kelimesini kullanmıyordu (bileşik, akraba kelime ya da başka fiil)**
- `lx:Dienst` ö1: `Welche Apotheke hat heute Notdienst?` → `Mein Dienst beginnt um sechs Uhr.`
- `lx:Traum` ö2: `Das ist mein Traumjob.` → `Für mich ist ein Traum wahr geworden.`
- `lx:springen` ö2: `Das Auto springt nicht an.` (**anspringen**) → `Der Hund springt über den Zaun.`
- `lx:fort` ö2: `Wir setzen das morgen fort.` (**fortsetzen**) → `Ich muss jetzt leider fort.`; üç `forms` maddesinin üçü de **fortsetzen** idi → `forms` boşaltıldı (zarf kartı, `lx:rum` ve `lx:wozu` gibi).
- `lx:Wache` ö1 ve ö4 (**Polizeiwache**) → `Die Wache ist gleich neben dem Bahnhof.`, `– Wo melde ich den Diebstahl? – Direkt auf der Wache.`; `forms` 1 ve 2 aynı nedenle **Wache** ile yeniden yazıldı.
- `lx:rum` ö4: `Nichts, nur rumgesessen.` → `– Wann kommst du? – So um acht rum.` (dört örneğin üçü **rum** önekli başka fiildi; kelimenin tek başına kullanımı eklendi).
- `lx:schulden` ö2 (`Er hat viele Schulden.`), ö4 (`Was bin ich Ihnen schuldig?`) → `Du schuldest mir noch eine Antwort.`, `– Was schulde ich Ihnen? – Zwölf Euro, bitte.`; ö3 yeni ö4 ile aynı kalmasın diye `Danke, ich schulde dir was!`
- `lx:herum` ö3: `Andersherum, bitte!` → `Irgendwo hier herum muss es sein.`
- `lx:Ehe` ö2: `Ist das Ihr Ehemann?` → `Er hat zwei Kinder aus erster Ehe.`

**Yinelenen örnek**
- `lx:überraschen` ö3 (`Lass dich überraschen!`, ö4'ün ikinci yarısıyla aynı) → `Das überrascht mich jetzt nicht.`
- `lx:wählen` ö1 (`Haben Sie schon gewählt?`, ö4, eşdizim ve `forms` 4 ile aynı) → `Sie können zwischen Suppe und Salat wählen.`

**Eşdizim listesinde akraba, türemiş ya da bileşik kelime**
- `lx:überraschen` (`die Überraschung`), `lx:Dienst` (`der Notdienst`, `der Kundendienst`), `lx:Traum` (`der Traumjob`), `lx:springen` (`Das Auto springt nicht an.`), `lx:fort` (`etwas fortsetzen`), `lx:Polizist` (`die Polizistin`, `die Polizei rufen`), `lx:Wache` (`die Polizeiwache`), `lx:Gefahr` (`Lebensgefahr`; ayrıca `in Gefahr` ile `in Gefahr sein` aynıydı), `lx:rum` (`rumhängen`, `rumsitzen`, `rumstehen`), `lx:schulden` (`die Schulden`, `Schulden haben`, `Was bin ich Ihnen schuldig?`), `lx:Partner` (`die Partnerin`, `der Geschäftspartner`, `der Ehepartner`), `lx:herum` (`andersherum`), `lx:Ehe` (`der Ehemann`, `die Ehefrau`), `lx:wach` (`hellwach`), `lx:besorgen` (`besorgt sein`): gerçek öbeklerle değiştirildi.

**Katman**
- `lx:rum` ö1 ve ö2: `hd` → `alltag` (kelime konuşma dili; `register` `informal`).

**`exp.ipucu_tr` çıkan kelimeyi anlatıyordu**
- `lx:Dienst` (**Kundendienst** → **der öffentliche Dienst**), `lx:Traum` (**mein Traumjob** → **Was ist dein Traum?**), `lx:schulden` (**Was bin ich Ihnen schuldig?** → **Was schulde ich Ihnen?**), `lx:fort` (**fortsetzen** → **weit fort**), `lx:Polizist` (**die Polizistin** → sona **en** gelmesi: **den Polizisten**).

**Açık OD-9 hataları**
- `lx:fürs` (kartsız girdi): `tr` `için (für + das)` → `için` (parantez); `mistakes_tr` terim ve düz tırnakla yazılmıştı, hata da göstermiyordu → Türkçe niyetle başlayan iki gerçek hata.
- `lx:fort` `tr`: `gitmiş, ileri` → `gitmiş, uzakta` (`ileri` yalnızca çıkan **fortsetzen** ile açıklanıyordu).
- `lx:Polizist` 2. hata notu: yanlış cümlede iki fark vardı (`den Polizist` hem ek hem kelime) → `Rufen Sie den Polizisten`, tek fark kelime.
- `lx:schulden` 2. hata notu akraba kelimeyi (**Schulden**) anlatıyordu → kartın fiiliyle: `Ich habe dir zehn Euro Schuld` → `Ich schulde dir zehn Euro.`

Yeni fotoğraf sorguları (`ex_img`): `lx:springen` ö2, `lx:Wache` ö1. `lx:Wache` ö4 sahnesi aynı kaldı. Değişen öteki örneklerde fotoğraf alanı yoktu.

## Değişen Türkçe alanlar (okur için)
- `tr`: `lx:fort`, `lx:fürs`.
- `exp` (yalnızca `ipucu_tr`): `lx:Dienst`, `lx:Traum`, `lx:fort`, `lx:Polizist`, `lx:schulden`.
- `mistakes_tr` (tam liste): `lx:fürs` (ikisi yeni), `lx:Polizist` (2. not), `lx:schulden` (2. not).
- Örnek çevirileri: `lx:überraschen` ö3, `lx:Dienst` ö1, `lx:Traum` ö2, `lx:springen` ö2, `lx:fort` ö2, `lx:Wache` ö1 ve ö4, `lx:rum` ö4, `lx:schulden` ö2, ö3, ö4, `lx:herum` ö3, `lx:wählen` ö1, `lx:Ehe` ö2.
- Eşdizim çevirileri: `lx:überraschen` (2.), `lx:Dienst` (4., 5.), `lx:Traum` (2.), `lx:springen` (2.), `lx:fort` (3.), `lx:Polizist` (3., 4.), `lx:Wache` (1.), `lx:Gefahr` (2., 4.), `lx:rum` (2., 3., 4.), `lx:schulden` (2., 3., 4.), `lx:Partner` (3., 4., 5.), `lx:herum` (2.), `lx:Ehe` (3., 4.), `lx:wach` (4.), `lx:besorgen` (2.).
- `forms`: `lx:Wache` 1. ve 2. madde (cümle, `tr`, `hint_tr`); `lx:fort` boş liste.

## Kalan kartlar
Yok.

## Kalan şüpheler (düzeltilmedi)
- `lx:fürs`: `exp` yok (kartsız girdi); yazılması lex ya da yazarın işi. `lx:aufs` (bu grupta değil) aynı eski biçimde duruyor.
- `lx:fort`: `forms` boş bırakıldı; **fort** ile tek cevaplı cümle kurulamıyor (**weg** her yerde uyar), şemada `also_ok` alanı da yok. `exp.ne_zaman_tr` içindeki "biraz resmîdir" güneyde tam doğru değil (gündelik konuşmada da duyulur) ama kaynak yok, dokunulmadı.
- `lx:rum`: ö1 ve ö3 ile hata notu **rum** önekli fiillerle (**rumhängen**, **rumstehen**) kaldı; kelimenin asıl kullanımı bu, `etrafta` anlamını bunlar taşıyor.
- `lx:Wache`: Bavyera'da tabelada **Polizeiinspektion** yazar; **Wache** anlaşılır ama kuzeyde daha yaygın. Pasif katmanda kalması uygun.
- `lx:Partner` ö3 ve `forms` 4 **Partnerin** ile; aynı kelimenin kadın biçimi sayıldı, kaldı. `lx:Ehe` 2. hata notu **Ehemann** ile karışmayı anlatıyor, kartın kelimesinin yanlış kullanımı olduğu için kaldı.
- `lx:Traum` `Nicht mal im Traum!` → `Rüyamda bile görmem!`: Almancası `asla, aklımdan bile geçmez` demek; Türkçe karşılık birebir, tam oturmuyor. Okurdan geçtiği için dokunulmadı.
- `lx:treiben` ö1 ve ö4 çok yakın (`Treiben Sie (regelmäßig) Sport?`); ö4 cevabı eklediği için kaldı.
- `lx:leiden` `tr` içindeki `katlanmak` yalnızca **nicht leiden können** kalıbında geçerli; açıklama bunu söylüyor, kaldı.
- `lx:Ziel` ö1 `Mein Ziel ist die B1-Prüfung.`: tarih ya da kurum adı yok, genel hedef cümlesi sayıldı.
- `lx:verfolgen` ö2 ve ö3 (polis kovalaması, takip edilme): şiddet sahnesi yok; pasif katmanda.
