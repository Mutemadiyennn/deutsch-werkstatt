# lexicon-m2: dilbilimci incelemesi (yeni alanlar, ikinci grup)

- Tarih: 2026-11-19 · İnceleyen: dilbilimci-ajan
- Girdi: `cm/work/batch-m2.view.jsonl` · Yama: `cm/work/batch-m2.dil.json`
- Kapsam: 44 kart, 195 `forms` maddesi, 218 eşdizim, 137 örnek fotoğraf sorgusu. 39 kartta yalnızca yeni alanlar; `lx:Anfang`, `lx:Nummer`, `lx:wohnen`, `lx:zahlen`, `lx:leider` kartlarında bütün alanlar.
- Düzeltilen kart: **14** · alan düzeyinde düzeltme: **20** (14 `forms`, 2 eşdizim, 2 hata notu, 2 örnek). Ayrıca `lx:leider` kartına yeni alanlar yazıldı (düzeltme sayılmadı).
- Hata oranı: **14/44 kart** (0,32); `forms` maddelerinde 14/195 (0,07)
- `lintpatch.ts`: kart 15, sorunlu 0. Yamadaki `forms`, eşdizim ve örnek çevirileri `textIssues` ile ayrıca denetlendi: 0 sorun.
- `content:validate` çalıştırılmadı: yama parti dosyasına uygulanmadı (görev gereği parti dosyasına yazılmadı).

## Ölçüt

`lexicon-m1.md` ile aynı: boşluk, Türkçe çeviriyle birlikte okununca tek cevap vermeli. Fiil ve soru kelimesi kartlarında cevap kartın kendi kelimesidir.

## Hatalar

### `forms`: ikinci doğru cevap

| Kart | Madde | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:zahlen | 1 | Ich ___ heute. [zahle] → Zahlen Sie bar? – Nein, ich ___ mit Karte. [zahle] | **bezahle** de doğru. Yeni cümlede aynı kelime cümlenin öbür yarısında geçiyor. |
| lx:zahlen | 2 | ___ du bar? [Zahlst] → Ich zahle heute, du ___ morgen. [zahlst] | Aynı. |
| lx:zahlen | 3 | Er ___ mit Karte. [zahlt] → Ich zahle bar und er ___ mit Karte. [zahlt] | Aynı. |
| lx:zahlen | 4 | Ich habe schon ___. [gezahlt] → Ich möchte zahlen. – Ihr Kollege hat schon ___. [gezahlt] | **bezahlt** da doğru. |
| lx:heißen | 4 | Was ___ das? [heißt] → Wie ___ das auf Deutsch? [heißt] | **ist**, **bedeutet**, **kostet** de olur. **Wie … das auf Deutsch?** yalnızca **heißt** alır. |
| lx:was | 2 | ___ kostet der Kaffee? [Was] → ___ machst du heute? [Was] | **Wie viel kostet** de doğru (M1'de `lx:wie_viel` için aynı düzeltme yapıldı). |
| lx:passen#2 | 4 | Passt es ___ am Freitag? [Ihnen] → Frau Huber, passt es ___ am Freitag? [Ihnen] | Çevirideki **size** **euch** olarak da okunuyor. |

### `forms`: doğallık ve dünya

| Kart | Madde | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Adresse | 6 | Ich wohne jetzt unter ___ neuen Adresse. [einer] → Mit ___ falschen Adresse kommt das Paket nicht an. [einer] | **unter einer Adresse wohnen** yazışma dili. |
| lx:arbeiten | 5 | Ich arbeite ___ Stadler. [bei] → Ich arbeite ___ Kerschbaum. [bei] | `WORLD.md`: Stadler fırın, öğrencinin iş yeri Firma Kerschbaum. |
| lx:Vorname | 4 | Ich vergesse immer ___ Vornamen. [den] → Der Nachname fehlt. Ich sehe nur ___ Vornamen. [den] | Kimin adı olduğu belli değildi; doğal söyleyiş **seinen Vornamen** olurdu. |
| lx:Hausarzt | 6 | Ich spreche mit ___ Hausarzt. [einem] → Ich habe einen Termin bei ___ neuen Hausarzt. [einem] | Bağlamsız **mit einem Hausarzt** zorlama; doğal olan **mit meinem**. |
| lx:Nachname | 5 | Ich melde mich mit dem ___. → Am Telefon melde ich mich mit dem ___. | Çeviride telefon vardı, Almancada yoktu. |

### `forms`: Türkçe

| Kart | Madde | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:Fieber | 2 | Ateş düştü. → Ateş geçti. | **ist weg** geçti demek; düştü **ist gesunken**. |
| lx:wohnen | 2, 4 | yaşıyorsun, yaşadım → oturuyorsun, oturdum | Kartın karşılığı **oturmak**; **yaşamak** **leben** yazdırır. (Tek düzeltme sayıldı.) |

### Eşdizim

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:Brot | das Vollkornbrot \| tam buğday ekmeği → tam tahıllı ekmek | **Vollkorn** yalnızca buğday değil. |
| lx:Nummer | Nummer ziehen → eine Nummer ziehen; falsche Nummer → die falsche Nummer; + die Hausnummer \| ev numarası | Kalıp artikelsiz söylenmez; kartın ipucu da **eine Nummer ziehen** diyor. Ev numarası kartın anlamında ve fotoğrafında var, eşdizimde yoktu. |

### Hata notları ve örnekler

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:zahlen | mistakes_tr 2 | Sayı anlamında büyük harfle **die Zahl** yazılır… → Parayı sayıyorum derken **Ich zahle das Geld** yanlış. Doğrusu **Ich zähle das Geld**. | Eski not öğrencinin yaptığı bir hatayı anlatmıyordu. Gerçek karışıklık **zahlen** ile **zählen**. |
| lx:arbeiten | mistakes_tr 1 | **Ich arbeite in BMW**… → Kerschbaum firmasında çalışıyorum derken **Ich arbeite in Kerschbaum** yanlış. Doğrusu **Ich arbeite bei Kerschbaum**. | Gerçek şirket adı (`acik.md`, PR #50 P2). Ne denmek istendiği de eklendi. |
| lx:nein | ö2 | Möchten Sie eine Tüte? – Nein, danke. → – Möchten Sie eine Tüte? – Nein, danke. (`dialog: true`) | İki konuşmacı; çeviri de aynı biçime getirildi. |
| lx:wohnen | ö3 çeviri | Hemen köşede oturuyorum. → Hemen şurada, köşeyi dönünce oturuyorum. | **um die Ecke** köşenin kendisi değil; `lx:um` kartındaki karşılıkla aynı oldu. |

## `lx:leider`: yazılan alanlar

- `exp`: mevcut metin doğru, yamada aynen yer alıyor.
- `mistakes_tr`: mevcut kelime sırası notuna ikinci madde eklendi: Üzgünüm derken **Ich bin leider** yanlış. Doğrusu **Es tut mir leid**.
- Eşdizim 2 → 5: **Das geht leider nicht.**, **Ich kann leider nicht kommen.**, **leider keine Zeit**.
- `forms` 3 madde: **Ich habe ___ keine Zeit.** · **Ist Frau Huber da? – Nein, ___ nicht.** · **___ kann ich morgen nicht kommen.**
- Fotoğraf: ö1 `person checking full calendar on phone`, ö2 `office clerk apologizing to customer at counter` (ö4 sorgusu vardı).

## Baştan sona incelenen diğer kartlar

- **lx:Anfang:** artikel, çoğul, eşdizim, örnekler, `exp`, hata notu ve 5 `forms` maddesi doğru. Değişiklik yok.
- **lx:Nummer:** yalnızca eşdizim (yukarıda).
- **lx:wohnen:** fiil biçimleri doğru; `forms` çevirileri ve ö3 çevirisi (yukarıda).
- **lx:zahlen:** fiil biçimleri, eşdizim ve örnekler doğru; `forms` ve ikinci hata notu (yukarıda).

## Görevdeki diğer maddeler

- **Geçmiş biçimler:** bu grupta **haben**, **sein** ya da modal fiil kartı yok. Diğer fiillerde sorulan **habe gezahlt**, **ist gekommen**, **hat geheißen**, **habe verstanden** gibi biçimler konuşmada doğal olanlar.
- **lx:neun, lx:einundzwanzig, lx:Sonntag:** bu grupta değil (M1'de kapandı). `lx:Telefonnummer` örneklerindeki 0171 39200 47 ve 089 99998 307 `SOURCES.md` içindeki kurgusal aralıkta.
- **Fotoğraf sorguları:** aynı kart içinde yinelenen sorgu yok, yanıltıcı bulunan sorgu yok.

## Kalan şüpheler

- **lx:zahlen:** **bezahlen** hiçbir cümlede dilbilgisi açısından dışlanamıyor. Yeni maddelerde tek cevabı sağlayan şey, aynı kelimenin cümlenin öbür yarısında geçmesi. Değerlendirici **bezahle** yazanı yine de yanlış sayacaksa bu kartta eş anlamlı kabulü gerekir (motor kararı).
- Boşlukların çoğu yalnızca Türkçe çeviriyle tek cevaba iniyor (**ein** ile **der**, **eine** ile **die**). M1'deki aynı şüphe sürüyor.
- **lx:heißen** madde 1 ve 3, **lx:verstehen** madde 3: **bin**, **ist**, **spricht** de dilbilgisi açısından olur; çeviri ve kart kelimesi ölçütüyle bırakıldı.
- **lx:sprechen** madde 5 ve `ipucu_tr`: **Frau Weber**. Dünyada Weber aile hekimi (Dr. Thomas Weber). Çelişki değil ama karışabilir; **Frau Huber** daha tutarlı olurdu. Eski alan da aynı adı kullandığı için dokunulmadı.
- **lx:Käse** ö2 çevirisi **Brezel**, **lx:Brot** ö4 çevirisi **Breze**. Eski alan, dokunulmadı.
- **lx:Nummer** ö4: **sagen Sie sie bitte langsam** doğru ama kulağa sert geliyor (**Sie sie**). Bırakıldı.
- **lx:Nummer** ile **lx:Telefonnummer** kartlarının 5. ve 6. `forms` maddeleri neredeyse aynı. Hata değil, yineleme.
- Eşdizim Türkçelerinde `…` işareti 6 kartta `textIssues` uyarısı veriyor (lx:hallo, lx:um, lx:kommen, lx:heißen, lx:sagen, lx:arbeiten). Eski alan, dokunulmadı.

## Sonuç

**KAPANDI** (yama uygulanınca). `review.status` kararı baş geliştiricide.
