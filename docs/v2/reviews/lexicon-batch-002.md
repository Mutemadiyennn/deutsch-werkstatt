# Dilbilimci incelemesi: lexicon batch-002

- İnceleyen: dilbilimci-ajan · Tarih: 2026-11-18
- Girdi: `cm/work/batch-002.view.jsonl` (yazar yaması uygulanmış görünüm)
- Yama: `cm/work/batch-002.dil.json` (parti dosyasına doğrudan yazılmadı)
- İncelenen kart: **100** (her kartın bütün alanları ve 400 örneği)
- Düzeltme: **76 alan, 51 kartta** · Hata oranı: **0,76 düzeltme/kart** (kartların %51'i)
- Denetim: `lintpatch.ts work/batch-002.dil.json` → kart 51, sorunlu 0. `npm run content:validate` çalıştırılmadı, çünkü yama henüz partiye uygulanmadı. Birleştirmeden sonra baş geliştirici çalıştırmalı.
- Sonuç: **AÇIK** (6 kart, aşağıda)

## Hatalar (önce → sonra)

### Almanca

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:zum | ö2 de | Was gibt's zum Essen? → Was gibt es zum Essen? | hd katmanında kısaltma |
| lx:zum | ö3 de | Zum Glück war nichts! → Zum Glück ist nichts passiert! | doğal değil |
| lx:wirklich | ö3 | Wirklich jetzt? → Wirklich? Das glaub ich nicht. | kalıp **Echt jetzt?** biçiminde yaşar, **wirklich** ile yapay |
| lx:weg | ö2 de | Ich bin morgen für eine Woche weg. → Ich bin ab morgen eine Woche weg. | Türkçesi "yarından itibaren" diyordu, Almancası demiyordu |
| lx:Weg | ö3 | Bin unterwegs, bis gleich! → Das ist ein weiter Weg, nimm lieber den Bus. | örnekte kelime yoktu |
| lx:Jahr | ö3 | Wie alt bist du? – Dreißig. → Das ist schon Jahre her! | kelime yoktu, iki konuşmacı vardı ama diyalog işareti yoktu |
| lx:Haus | ö3 de | Ich geh jetzt heim, äh, nach Hause. → Ich geh jetzt nach Hause. | "äh" düzeltmesi öğretici değil, kafa karıştırır |
| lx:erst | ö4 de | ich habe erst angefangen → ich habe gerade erst angefangen | bu anlamda **gerade erst** söylenir |
| lx:leid | ö4 | – Ich kann heute nicht kommen. – Schade! Tut mir leid. → – Ich kann heute leider nicht kommen, tut mir leid. – Schade! | özrü yanlış kişi diliyordu |
| lx:leid | exp.parcalar | tun: vermek → tun: yapmak | yanlış karşılık |
| lx:lieben | ö4 | Natürlich, du Dummkopf! → Natürlich, was für eine Frage! | hakaret içeren örnek, Türkçesi "seni salak" |
| lx:raus | ö1 | Ich gehe kurz raus, frische Luft. → …, frische Luft schnappen. | yarım cümle |
| lx:raus | register | neutral → informal | gündelik biçim, kartın kendi notu da öyle diyor |
| lx:kriegen | register | neutral → informal | gündelik biçim, kartın kendi notu da öyle diyor |
| lx:kriegen | ö1 | Was kriegen Sie? ("Ne kadar tutuyor? / Borcum ne?") → Was kriegen Sie von mir? ("Size borcum ne kadar?") | cümle iki anlamlıydı, çeviri yalnızca birini veriyordu |
| lx:erzählen | ö4 | Was hat der Arzt erzählt? → – Was hast du ihm erzählt? – Nur, dass wir später kommen. | doktor için **gesagt** denir |
| lx:töten | coll | Zeit töten → Bakterien töten | Almancası **die Zeit totschlagen** |
| lx:helfen | coll | Hilfe! → beim Umzug helfen | kalıpta kelime yoktu |
| lx:euer | coll | bei euch → euer Auto | kalıpta kelime yoktu |
| lx:holen | coll | abholen → Hilfe holen | başka bir kelime |

### İçerik politikası (DN-4), kimlik, tekrar

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:töten | ö1 | In dem Film wird ein Polizist getötet. → Das Mittel tötet 99 Prozent der Bakterien. | şiddet |
| lx:töten | ö4 | Wer hat ihn getötet? → – Hast du die Mücke getötet? – Ja, endlich Ruhe! | suç ayrıntısı |
| lx:töten | ö3 + görsel | Der Stress tötet mich noch! → Töte die Spinne nicht, trag sie raus! · görsel kaldırıldı | deyim Almancada **bringt mich noch um** biçiminde |
| lx:hallo | ö1 | Hallo, ich bin Elif. → Hallo, ich bin neu hier. | öğrencinin ağzından sabit ad |
| lx:zwei | ö2 | Nehmen Sie die Tabletten zweimal am Tag. → Der Bus kommt in zwei Minuten. | lx:nehmen ö2 ile aynı cümle, üstelik kelime **zweimal** |
| lx:lieb | ö3 | Ich hab dich lieb! → Sei so lieb und mach das Fenster zu. | lx:lieben ö3 ile aynı cümle |

### Türkçe çeviri

| Kart | Alan | Önce → Sonra |
|---|---|---|
| lx:brauchen | ö1 | Doktordan randevuya ihtiyacım var. → Doktordan bir randevu almam lazım. |
| lx:nehmen | ö2, coll | Hapları … alın / hap almak → için / hap içmek |
| lx:wirklich | ö1 | Bu gerçekten çok nazik. → Gerçekten çok naziksin. |
| lx:reden | ö1 | Kısaca konuşabilir miyiz? → Biraz konuşabilir miyiz? |
| lx:Zeit | ö4, coll | Kısa bir vaktin var mı? → Bir dakikan var mı? · "sürekli, bütün zaman" → "sürekli, hep" |
| lx:damit | ö4 | Evet, şimdi bitti. → Evet, az önce. |
| lx:nun | ö1 | Şimdi ne yapıyoruz? → Şimdi ne yapacağız? |
| lx:lieben | tr, ö3 | "sevmek, çok sevmek" → "sevmek, bayılmak" · "(samimi)" notu çeviriden çıkarıldı |
| lx:na | tr | "eee, hadi bakalım, peki" → "eee, peki" |
| lx:klein | ö4 | Hayır, daha çok küçük. → Hayır, aksine biraz küçük. |
| lx:zur | ö3 | Bir de hızlıca bankaya gitmem lazım. → Bir de bankaya uğramam lazım. |
| lx:versuchen | tr | "denemek, çalışmak" → "denemek, -meye çalışmak" (**arbeiten** ile karışıyordu) |
| lx:dürfen | ö2 | yememelisiniz → yememeniz lazım |
| lx:Morgen | ö3 | "(kısa)" notu çeviriden çıkarıldı |
| lx:jung | ö2 | Kardeşim üç yaş küçük. → Erkek kardeşim benden üç yaş küçük. |
| lx:gleich | ö4 | Onunla aynısından → Onun aldığının aynısından |
| lx:raus | ö3, ö4 | iki seçenekli çeviri teke indi · "Şuradan çıkıp sola." → "Şu ileriden çıkın, sonra sola." |
| lx:Mensch | ö4 | İyi bir insan, açıkçası. → İyi bir insan, gerçekten. |
| lx:stimmen | ö2 | Fatura yanlış. → Hesap yanlış. (sahne lokanta) |
| lx:Recht | tr | "hak, haklı olmak" → "hak, hukuk" (isim kartı) |
| lx:holen | ö1, ö3 | "küçük ekmek alıp geliyorum" → "gidip ekmek alıyorum" · "Kendime bir şey içecek alayım" → "Gidip kendime içecek bir şey daha alayım" |
| lx:mögen | coll | gern mögen: çok sevmek → sevmek, hoşlanmak |
| lx:über | coll | 18'in üstünde → 18 yaşın üstünde |
| lx:Scheiße | coll | "bok yemek, çuvallamak" → "işi batırmak" |

### exp ve mistakes_tr

| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:sicher | ipucu: **Er kommt sicher** herhalde gelir → mutlaka gelir | anlam yanlış |
| lx:sicher | **Ich habe sicher** yanlış → **Ich bin sicher** eminim demek, güvendeyim için **Ich bin in Sicherheit** | uydurma hata, kimse yapmaz |
| lx:morgen | ipucu: "başka kelime gerekmez" → küçük harf yarın, büyük harf sabah | anlaşılmıyordu |
| lx:Morgen | **der Morgen** yanlış → **morgen Morgen** denmez, doğrusu **morgen früh** | gerçek hata bu |
| lx:laufen | ne zaman: "Güneyde çoğunlukla yürümek" → "Günlük konuşmada yürümek anlamında da" | kaynaksız bölge iddiası |
| lx:weg | **Der Bus ist Weg** → **Der Bus ist gegangen** denmez | yazım hatası yerine Türkçeden gelen hata (otobüs gitti) |
| lx:Weg | "Araba yolu için **Weg** deme" → **Ich bin im Weg** yoldayım demek değil | kural kabaydı, yenisi Türkçeden gelen hata (yolda) |
| lx:nehmen | eklendi: **Tabletten trinken** denmez | Türkçeden gelen hata (ilaç içmek) |
| lx:hallo | "Resmî yerde **Hallo** deme" → "fazla samimi kaçabilir, **Guten Tag** daha güvenli" | yasak gibi yazılmıştı, gerçekte çok yerde söylenir |
| lx:genau | **um acht genau** yanlış → **genau** ile **genug** karışmasın | önceki biçim yanlış sayılmaz |
| lx:ab | **Der Zug abfährt um acht** maddesi silindi | **abfahren** kelimesinin notu (OD-9.2 madde 4) |
| lx:Geld | **Geld ziehen** yanlış → gündelik konuşmada duyulur, bankada **Geld abheben** | **Geld ziehen** gerçekten söylenir |
| lx:töten | **Er ist getötet** → **Zeit töten** denmez, doğrusu **die Zeit totschlagen** | Türkçeden gelen hata (vakit öldürmek) |
| lx:selbst | **selbste** → **mein selbst** | uydurma hata, yenisi "kendim" aktarımı (bkz. şüpheler) |
| lx:bekommen | "olmak demek değil" → İngilizcedeki benzer kelime uyarısı eklendi | neden "olmak" sanılacağı anlaşılmıyordu (D-060 izin verir) |
| lx:schnell | **Er fährt schnelle** → **Sei schnell** az duyulur, doğrusu **Beeil dich** | uydurma hata |

### Görsel (kaldırıldı)

| Kart | Sorgu | Gerekçe |
|---|---|---|
| lx:leben ö4 | person living alone in apartment | cevap "hayır, kız arkadaşımla" |
| lx:sicher ö1 | person looking unsure at document | sahneyi getirmez |
| lx:her ö1 | person waving someone over | sahneyi getirmez |
| lx:sterben ö4 | friend comforting grieving person | yas sahnesi, hassas |
| lx:töten ö3 | stressed person at desk | örnek değişti |

## Yazar notlarının doğrulanması

- Yerinde bulunup düzeltilenler: lx:leid, lx:Weg, lx:töten, lx:Jahr ö3, lx:zum ö3, lx:erst ö4, lx:erzählen ö4, lx:helfen, lx:euer, lx:raus ö1, lx:reden ö1, lx:holen ö3, lx:gleich ö4, lx:wirklich ö1, lx:Zeit ö4, lx:lieben, lx:sicher ve lx:her görselleri.
- Doğrulandı, değişmedi: lx:wirklich, lx:stimmen, lx:gerade, lx:ohne, lx:zurück, lx:bis, lx:erst, lx:Recht hataları gerçek öğrenci hatası. lx:zwei (**Zwei Kaffee**) ve lx:Tag (**Guten Tag** vedada) doğru. lx:brauchen ö4 çevirisi iyi. lx:mögen ve lx:suchen notları doğru. lx:Paar görseli ana anlamı veriyor. lx:vielleicht ve lx:gleich görselleri sahneyle örtüşüyor.
- Görünümde artık yok: lx:neu (**von neuem**), lx:genau (**genau lesen**).

## Kalan şüpheler (AÇIK)

1. **lx:leid**: baş biçim **leid (tun)** ve `pos: adv`. Güncel yazım **leidtun**, kelime de bir fiilin parçası. Baş biçimi değiştirmek kimliği ve bağlantıları etkileyebilir, karar baş geliştiricide.
2. **lx:Gott** ve **lx:hallo**: "Güneyde **Grüß Gott**" bilgisi `SOURCES.md` içinde yok. Bilgi doğru, ama kural kaynak istiyor. Önerilen kaynak: Duden, Gott maddesi (https://www.duden.de/rechtschreibung/Gott). Sayfayı açıp okumadım, satırı ekleyen doğrulamalı.
3. **lx:stehen**: "Güney Almanya konuşmasında **ist gestanden**" için de aynı durum. Önerilen kaynak: Duden, stehen maddesi (https://www.duden.de/rechtschreibung/stehen). Aynı çekince geçerli.
4. **Katman etiketi**: lx:na ö1 ve ö2, lx:Scheiße ö1 ve ö2, lx:Gott ö2 `hd` etiketli ama gündelik cümleler. Yama biçimi katmanı değiştirmeye izin vermiyor. Etiket `alltag` olmalı.
5. **lx:mögen#2** (**möchten**): `perfekt: hat gewollt`. Bu **wollen** fiilinin biçimi. Kartın hata notu bunu açıklıyor, ama fiil tablosunda tek başına görünürse yanıltır.
6. **lx:selbst**: yeni hata maddesi (**mein selbst**) benim kurduğum bir aktarım tahmini. Gerçek öğrenci verisiyle doğrulanmadı.

Küçük notlar (açık sayılmaz): lx:Vater ö1 (**Izmir**), lx:Jahr ö2 (**Türkei**) ve lx:her ö4 (**Istanbul**) öğrencinin kökenine gönderme yapıyor. Kişisel bilgi değil, ama üç kartta tekrar ediyor. lx:reden ö3 ile lx:erzählen ö3 aynı kalıbı kullanıyor (**keinen Quatsch**).

## Sonuç

**AÇIK.** 1 ile 5 arasındaki maddeler baş geliştiricinin kararını ya da yama biçiminin dışında bir değişikliği gerektiriyor. Parti `review.status: "draft"` kalmalı.

## Açık maddelerin kapanışı

Tarih: 2026-11-18. Yama: `work/batch-002.fix.json` (5 kart, lintpatch 0 sorun).

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:leid | de, pos | leid (tun), adv → leidtun, verb | Güncel yazım. Kimlik `lx:leid` aynı kaldı. |
| lx:leid | verb | (yok) → tut leid · tat leid · hat leidgetan · haben · separable: leid · case: dat | Fiil alanları dolduruldu. |
| lx:leid | tr | üzgünüm, kusura bakma → üzgün olmak, özür dilemek | Baş biçim artık fiil. Kalıp çevirileri eşdizimlerde duruyor. |
| lx:leid | mistakes_tr | 1 madde → 2 madde (**Es tut mich leid** eklendi) | **mir** yerine **mich** çok sık yapılan gerçek hata. |
| lx:Gott | ö2 katman | hd → alltag | **was darf's sein** kısaltmalı tezgâh konuşması. |
| lx:na | ö1, ö2 katman | hd → alltag | **na** yalnızca konuşmada geçer. |
| lx:na | register | neutral → informal | Aynı gerekçe. |
| lx:mögen#2 | verb.praeteritum | (yok) → wollte | Kart isteme anlamını öğretiyor. Bu anlamda geçmiş **wollen** fiilinden gelir. |
| lx:mögen#2 | verb.perfekt | hat gewollt (değişmedi) | Doğru. **hat gemocht** sevme anlamına gelirdi, bu kartın anlamı değil. |
| lx:mögen#2 | exp.ipucu_tr | (yok) → Geçmişi **wollen** kelimesinden gelir: **wollte**, **hat gewollt**. | Tablo tek başına görünürse yanıltmasın. |
| lx:selbst | mistakes_tr | **mein selbst gemacht** (kurgu) → **mein selbst Auto** yanlış, doğrusu **mein eigenes Auto** + kısa açıklama | Türkçede **kendi** iki işi görür: kendim yaptım ve kendi arabam. Almancada ikincisi **eigen** ister. Hata bu karşıtlıktan doğar. |

### Güney kullanımı: kaynak doğrulaması

Üç ifade de doğrulandı ve kartlarda kaldı. Kaynakları bu turda açıp okudum.

| Bilgi | Kartlar | Kaynak | Kaynakta yazan |
|---|---|---|---|
| **Grüß Gott** güneyde selamdır, dinî anlam taşımaz | lx:Gott, lx:hallo | Duden, Gott maddesi: https://www.duden.de/rechtschreibung/Gott · Goethe-Institut, Sprechstunde dil köşesi: https://www.goethe.de/prj/ger/de/kre/spk/22878868.html | Duden: "österreichisch, sonst landschaftliche Grußformel". Goethe-Institut: selamı söyleyen büyük olasılıkla Güney Almanya ya da Avusturya ile bağlantılıdır, güneyde dinle ilgisi olmayanlar da söyler. |
| **ist gestanden** güneyde söylenir | lx:stehen | Duden, stehen maddesi: https://www.duden.de/rechtschreibung/stehen | "hat / (süddeutsch, österreichisch, schweizerisch:) ist gestanden" |

Not: Duden **Grüß Gott** için "süddeutsch" etiketini kullanmıyor, "landschaftlich" diyor. Güney Almanya bilgisi Goethe-Institut metninden geliyor. Bu iki satırın `content/v2/registry/lexicon/SOURCES.md` dosyasına eklenmesini öneririm (dosya LEX alanında, ben yazmadım).

### Kalan notlar (açık sayılmaz)

- lx:selbst: yeni hata maddesi iki dilin karşılaştırmasına dayanıyor, öğrenci verisiyle sayılmadı. Kurgu değil, ama sıklığı ölçülmedi.
- lx:Gott: `domains` içinde **bairisch** duruyor. **Grüß Gott** Bairisch değil, güney ölçünlü Almancası. Alan etiketi sınıflandırma kararı olduğu için dokunmadım (parti 003, lx:schauen ile aynı durum).
- lx:Scheiße ö1 ve ö2 katmanı (önceki raporda madde 4) bu görevin listesinde yoktu, dokunulmadı.

Sonuç: **KAPANDI**. Görevde sayılan yedi kartta açık madde kalmadı.
