# 1. gün halkaları: dilbilimci incelemesi (PM-078 B ve C)

Dosya: `docs/v2/reviews/halka/gun-01-halkalar.json` · Tarih: 2026-11-20 · İnceleyen: dilbilimci-ajan (yazardan bağımsız)

İncelenen: **74 madde** (50 görev cümlesi, 19 sahne satırı, 5 anlama sorusu) ve 3 `_adsiz` çifti.
Denetim (düzeltmelerden sonra): `halka_kontrol.py` → **0 hata, 0 not**. Düzeltmelerin hiçbiri yeni sözcük getirmedi.
`npm run content:validate` bu dosyayı kapsamıyor (dosya `docs/` altında, şema henüz ANA'da); çalıştırılacak bir şey yok.

## Bulgular ve düzeltmeler

| # | Madde | Sorun | Önce → Sonra |
|---|---|---|---|
| 1 | h4 `lx:übermorgen` görev cümlesi (de) | Aynı cümlenin ilk yarısında **es** var, ikinci yarısında yok. Gün adı özne olabilir (**Donnerstag geht**), ama **übermorgen** zarftır, özne olamaz; dikte ve yapboz cümlesinde tam biçim gerekir. | „Morgen geht es nicht, aber übermorgen geht.“ → „Morgen geht es nicht, aber übermorgen geht es.“ |
| 2 | h5 `lx:ja` görev cümlesi (tr) | Kartın anlamı „evet“. Kartın kendi görev cümlesinde „Tamam“ yazarsa öğrenci Türkçeden Almancaya dönerken başka bir sözcük arar (OD-9 tek anlam). „Evet, pazartesi görüşürüz!“ bir soruya cevap olarak Türkçede doğal. | „Tamam, pazartesi görüşürüz!“ → „Evet, pazartesi görüşürüz!“ |
| 3 | h5 sahne sorusu, 4. seçenek | Tek doğru cevap yoktu: muayenehane hafta sonu kapalıysa „Frau Huber cumartesi çalışmıyor“ da çıkarımla doğru. | „Frau Huber cumartesi çalışmıyor.“ → „Cumartesi günü sen çalışıyorsun.“ |
| 4 | h5 `lx:Praxis` görev cümlesi (tr) | Devrik cümle; ayrıca 1. günün ve sözlüğün kalıbı „Dr. Weber muayenehanesi“. | „Dr. Weber'in muayenehanesi mi orası?“ → „Orası Dr. Weber muayenehanesi mi?“ |
| 5 | h3 `lx:Sonntag` görev cümlesi (tr) | Çeviri Almancada olmayan „o gün“ü ekliyor, **am** karşılıksız kalıyor. | „Peki pazar? O gün olur mu?“ → „Peki pazar günü? Olur mu?“ |
| 6 | h1 `lx:hallo` görev cümlesi; h4 sahne 1. satır (tr ve tr_adsiz) | **Hallo** dosyada üç ayrı karşılıkla geçiyordu (selam, merhaba, alo). Kartın anlamı „merhaba, alo“; 1. günün sahnesinde Ioana'nın **Hallo**'su da „Merhaba“. | „Selam Tobi!“ → „Merhaba Tobi!“ · „Selam {name}! …“ → „Merhaba {name}! …“ · „Selam! …“ → „Merhaba! …“ |
| 7 | h2 `lx:Donnerstag` görev cümlesi; h4 sahne son satır (tr) | **bis** + gün dosya içinde iki biçimde çevrilmişti („perşembeye görüşürüz“ / „perşembe görüşürüz“). 1. günün kendi kalıbı eksiz biçim („pazartesi görüşürüz“, „cumartesi görüşürüz“). | „Perşembeye görüşürüz Tobi!“ → „Perşembe görüşürüz Tobi!“ · „Tamam, cumaya görüşürüz!“ → „Tamam, cuma görüşürüz!“ |

Ağırlık: 1 ve 3 gerçek hata (dilbilgisi; sorunun tek cevabı). 2 kart anlamıyla çelişki. 4–7 doğallık ve tutarlılık.

## Yazarın 5. maddesindeki iki soru

**„Ja, bis Montag!“ çevirisi.** Kartın kendi görev cümlesinde „Evet“ olmalı (bulgu 2). Sahne satırlarında „tamam“ kalabilir: h2 „Donnerstag, ja.“ → „Perşembe, tamam.“ 1. günün provasındaki (n4, n5) çeviriyle aynı; h4 „Ja, bis Freitag!“ → „Tamam, cuma görüşürüz!“ bir onaya verilen karşılık, orada „tamam“ doğru ton. Kart sorgulanırken „evet“, sahnede bağlama göre „tamam“: okur turunda bu ayrım öğrenciyi şaşırtıyorsa sahneler de „Evet“e çekilebilir.

**„Am Sonntag ist alles zu.“ olgusu.** Kalabilir. Gerekçe:
- Hukuki zemin doğru: Bavyera Ladenschlussgesetz'inde pazar ve resmî tatil günleri genel kapanış zamanıdır (BayLadSchlG Art. 2). İstisnalar var: eczane, benzin istasyonu, tren istasyonundaki satış yerleri (Art. 3–4); fırınlar pazar günü üç saat açabilir (Art. 3 Abs. 3). Kaynak: https://www.gesetze-bayern.de/Content/Document/BayLadSchlG/true
- Cümle hukuki bilgi olarak değil, gündelik abartı olarak söyleniyor ve gerçekten böyle söylenir. Türkçesi „her yer kapalı“ aynı abartıyı taşıyor.
- Sözlükte aynı söz zaten var (`lx:Sonntag` boşluk cümlesi „Heute ist Sonntag, alles ist zu.“), ve „Sonntags hat die Bäckerei Stadler bis elf offen.“ örneği üç saatlik fırın istisnasıyla uyumlu. Çelişki yok; istisna ileride bir sahnede işlenebilir.

## Sorun bulunmayan, ama bakılan noktalar

- **Karakterler WORLD'le tutarlı:** Tobi ve Ioana'ya **du**/ön adla, Stadler, Brandl, Huber, Pichler, Wimmer ve Dr. Weber'e soyadıyla hitap; Huber telefonda, Stadler fırında, Brandl komşu, Wimmer iş yerinde. Kimseye WORLD'de olmayan akraba, olay ya da geçmiş eklenmemiş. Bairisch yok.
- **Kimlik:** öğrencinin adı yalnızca `{name}` ile; cinsiyet belirten biçim yok.
- **`_adsiz` biçimleri** (h2, h4, h5) dilbilgisi ve doğallık açısından sorunsuz.
- **Sahne soruları:** h1–h4'te tek doğru cevap var. h4 çıkarım istiyor („öbür gün cuma“ → bugün çarşamba); cevap tek ve **übermorgen**'i gerçekten yokluyor, kalabilir.
- **„Hallo? Frau Huber?“ → „Alo? Huber Hanım?“** telefonda hat kontrolü olarak gerçek ve kartın „alo“ anlamıyla örtüşüyor.
- **„Morgen geht nicht.“** (h4 sahne, öğrenci): **es**'siz biçim 1. günün okuma metninde aynen geçiyor, konuşma dilinde yaygın; sahnede kalabilir.

## Kalan şüpheler (düzeltilmedi; engel değil)

1. **„hier“ yerine „da“.** „Ist Herr Wimmer heute hier?“, „Gestern war Tobi nicht hier.“, „Diese Woche ist Ioana nicht hier.“, „Ioana war vorgestern hier.“ doğru Almanca, ama gündelik konuşmada **da** çok daha sık („Ist Herr Wimmer heute da?“). `da` 1. günün kümesinde yok (betik `lx:da` bilinmeyen sayıyor), bu yüzden dokunulmadı. Öneri (İÇ/ANA): `da` kümeye girdiği gün bu dört cümle **da** ile yenilensin.
2. **Fırın ve komşu selamı.** WORLD'e göre Frau Stadler ve Frau Brandl „Grüß Gott“ der; h1 ve h3 sahnelerinde „Hallo!“ diyorlar. „Grüß Gott“ kümede yok (betik iki bilinmeyen sayıyor). „Hallo!“ gerçek hayatta da duyulur, hata değil; karakter sesi için ileride değiştirilebilir. Aynı sebeple h1'de „Bitte.“ kaldı („Bitte schön.“ daha tipik; `schön` bilinmeyen).
3. **h2 ve h5 telefon sahneleri öğrencinin cümlesiyle başlıyor.** Gerçekte önce muayenehane açar („Praxis Dr. Weber, Huber, guten Tag.“) ve Frau Huber'in neden hemen gün önerdiği metinden anlaşılmıyor. Satırlar tek tek doğru; eksik olan bağlam. Yazarın önerdiği `ortam_tr` alanı (prova'daki `durum_tr` gibi: muayenehane seni aramış, sen geri arıyorsun) bunu çözer. Şema ANA'da.
4. **„Danke, Herr Dr. Weber!“ → „Teşekkürler Doktor Bey!“.** Türkçesi doğal hitap, ama soyadı düşüyor. Görev Türkçeden Almancaya kuruluyorsa öğrenci „Weber“i Türkçeden çıkaramaz. Karar görev türüne bağlı; okur baksın. Seçenek: „Teşekkürler Dr. Weber!“ (o zaman **Herr** karşılıksız kalır).
5. **Hanım/Bey ve Frau/Herr.** Bu dosya sözlüğün yolunu izliyor („Brandl Hanım“, „Pichler Bey“); 1. günün `gun-01.json` çevirileri ise „Frau Brandl“, „Herr Pichler“ yazıyor. İkisi de incelenmiş içerikte var. **Frau** ve **Herr** bu günün kartları olduğu için halkalarda Hanım/Bey anlamlı; ama aynı gün içinde iki yazım öğrencinin önüne geliyor. Tek kural kararı ANA/İÇ'te.
6. **h3 sahnesi:** Frau Brandl günü karıştırıyor. WORLD'deki „her şeyi bilir“ çizgisiyle hafif gerilim var; tek seferlik bir şaşkınlık olarak kabul edilebilir, yinelenirse karakteri unutkan gösterir.
7. **„Am Dienstag? Ja, bitte.“** ve **„Welcher Tag geht?“** doğru ve söylenir; daha doğal biçimleri („Ja, gern.“, „Welcher Tag geht bei Ihnen?“) küme dışı sözcük istiyor.

## Sonuç

Hata oranı: **7 bulgu / 74 madde ≈ %9,5** (etkilenen madde 9; gerçek hata 2, anlam/tutarlılık 5). Hepsi dosyada düzeltildi; betik 0 hata.

**KAPANDI** (dil açısından). Kalan şüpheler küme ve şema kararlarına bağlı, dil hatası değil. Dosyada `review` alanı yok (şema ANA'da), o yüzden durum alanı eklenmedi. Sıradaki: okur (OD-9).

## Okur turundan sonra

Tarih: 2026-11-20 · Yalnızca okur turunda değişen satırlar incelendi (3 Almanca satır, 10 Türkçe satır ya da soru). Denetim: `halka_kontrol.py` → **0 hata, 0 not**. Yeni sözcük eklenmedi.

**Almanca (3 satır): sorun yok.**
- h1 g9 „Danke, Herr Wimmer!“ doğru ve doğal. WORLD: Stefan Wimmer öğrencinin şefi, „Sie“ der; soyadıyla hitap tutarlı. Türkçesi „Teşekkürler Wimmer Bey!“ g10 („Merhaba Pichler Bey!“) ile aynı kalıp.
- h3 g3 „Am Sonntag ist Tobi nicht hier.“ doğru (zaman başta, fiil ikinci sırada). WORLD: Tobi iş arkadaşı, hafta sonu futbol ve dağ; pazar günü ortada olmaması tutarlı, yeni olgu eklemiyor. Türkçesi doğru. (**hier** yerine **da** notu, şüphe 1, bu cümle için de geçerli.)
- h3 sahne 3. satır „Sonntag? Ach ja! Sonntag ist Wochenende.“ doğru ve söylenir; **Ach ja!** hatırlama ünlemi olarak yerinde. Türkçesi „Pazar mı? Ah evet! Pazar hafta sonu.“ birebir. „Am Sonntag ist alles zu.“ sahneden çıktığı için önceki rapordaki olgu sorusu (BayLadSchlG) bu dosyada artık gündemde değil.

**Türkçe: listedeki satırların hepsi doğru ve doğal.** „günü“ **am**'ı görünür kılıyor; yalın gün adı (**Montag?**, **Mittwoch geht nicht**) eksiz kalıyor, ayrım tutarlı. „Bugün cuma, hafta sonu!“ ve „Bugün her şey kapalı.“ Almancayla sözcük sözcük örtüşüyor; **alles** artık dosyanın her yerinde „her şey“. Sorulardaki „Stadler Hanım“, „Huber Hanım“ görev cümlelerinin yazımıyla aynı.

**Bulgu 8 (düzeltildi): aynı Almanca cümle, iki Türkçe.** h2 sahnesi görev cümleleriyle birlikte güncellenmemişti (okurun 2. tur notunda da var).

| Madde | Önce → Sonra |
|---|---|
| h2 sahne 2. satır (tr), „Geht es am Montag?“ | „İyi günler! Pazartesi olur mu?“ → „İyi günler! Pazartesi günü olur mu?“ (g9 „Cuma günü olur mu?“ ile aynı kalıp) |
| h2 sahne 3. satır (tr), „Am Montag geht es nicht. Geht Donnerstag?“ | „Pazartesi olmuyor. Perşembe olur mu?“ → „Pazartesi günü olmuyor. Perşembe olur mu?“ (g1 ile aynı; ikinci cümle **am**'sız, yalın kaldı) |

**Kalan şüpheler (dil hatası değil):**
- h3 g5 ile h3 sahne aynı halkada „cuma, hafta sonu!“ ve „pazar hafta sonu“ diyor (okur N9). İlki sevinç ünlemi, ikisi de doğru Almanca; öğrenciyi durdurursa g5 başka bir günle yeniden yazılabilir.
- Kelime sırası (okur N8): „Am Sonntag ist Tobi nicht hier.“ / „Tobi ist am Sonntag nicht hier.“ ve „Ich gehe am Montag in die Praxis.“ / „Am Montag gehe ich in die Praxis.“ ikisi de doğru. Üretim görevinde iki sıra da kabul edilmeli (D-064); kabul listesi şemayla gelince eklenecek.
- Önceki şüphe 6 (Frau Brandl'ın günü karıştırması) aynen duruyor; yeni 3. satır bunu ağırlaştırmıyor.

Bu turda: 13 satır incelendi, 1 tutarlılık bulgusu (2 sahne satırı), gerçek dil hatası 0.

**KAPANDI.**

## İnceleme #163 sonrası

Tarih: 2026-11-20 · Yalnızca yazarın „İnceleme #163 sonrası“ listesindeki satırlar incelendi: 15 görev cümlesi, 2 sahne satırı, 3 taşınan cümle (20 madde). Denetim: `halka_kontrol.py` → **0 hata, 2 not** (ikisi de „Guten Tag, hier ist {name}.“ kalıbı, h2 ve h5). Yeni sözcük eklenmedi; **das** zamir olarak yok.

| Satır | Karar | Düzeltme |
|---|---|---|
| h1 sahne 2 „Hallo, Frau Stadler! Für Lechner, bitte.“ / Lechner adına, lütfen. | **Düzeltildi (bulgu 9)** | → „Hallo, Frau Stadler! Für Frau Brandl, bitte.“ / „Merhaba Stadler Hanım! Brandl Hanım için, lütfen.“ |
| h1 bitte „Bitte, Tobi!“ / Rica ederim Tobi! | **Düzeltildi (bulgu 10)** | → „Bitte, Tobi.“ / „Rica ederim Tobi.“ |
| h1 bitte „Ja, bitte, Frau Stadler.“ | Doğru | yok |
| h1 ja „Ja, für Ioana.“ / Evet, Ioana için. | Doğru | yok |
| h2 „Am Donnerstag geht es, Frau Huber.“ | Doğru | yok |
| h2 „Gestern war Freitag.“ | Doğru | yok |
| h3 „Gestern war Sonntag, nicht Samstag.“ | Doğru | yok |
| h3 „Und am Sonntag? Geht es?“ | Doğru, şüphe (aşağıda) | yok |
| h3 „Nicht diese Woche, Frau Huber.“ | Doğru | yok |
| h4 „Heute ist Wochenende, Tobi!“ | Doğru | yok |
| h4 „War gestern Dienstag?“ | Doğru | yok |
| h4 „Vorgestern war Donnerstag.“ | Doğru | yok |
| h4 „Heute ist Montag, vorgestern war Samstag.“ | Doğru | yok |
| h5 „Montag geht nicht, Herr Wimmer.“ | Doğru | yok |
| h5 „Hallo? Praxis Dr. Weber?“ | Doğru | yok |
| h5 „Ist die Praxis am Samstag geschlossen?“ | Doğru | yok |
| h4 sahne 3 „Übermorgen ist Freitag. Ja, Freitag geht!“ | Doğru | yok |
| Taşınan: „Danke, Herr Wimmer!“, „Hallo, Herr Pichler!“ (h5), „Ja, danke, Frau Huber.“ (h1) | Doğru | yok |

**Bulgu 9: „Für Lechner, bitte.“** Dilbilgisi doğru. WORLD ile de çelişmiyor: Tobi'nin soyadı Lechner (`ch:lechner`). Ama üç sorun var. (1) Bu bir sipariş cümlesi değil; yalnızca önceden ayrılmış bir siparişi teslim alırken söylenir. Sahnede bunu anlatan bağlam yok (`ortam_tr` alanı henüz şemada değil). (2) Öğrenci Tobi'yi adıyla tanıyor; Lechner soyadı 1. günün içeriğinde hiç geçmiyor. İlk halkanın ilk sahnesinde tanımadığı bir ad görüyor. (3) Türkçesi „Lechner adına“ idi; aynı halkada **für** „için“ diye geçiyor („Ja, für Ioana.“). Çözüm: ad Frau Brandl oldu. Öğrenci onu aynı halkadan tanıyor („Hallo, Frau Brandl!“), cümle **Frau** kartını bir kez daha kullandırıyor, Türkçesi „için“ ile tutarlı. Yaşlı komşunun ekmeğini fırından almak bağlamsız da anlaşılıyor; Frau Stadler „müşterisini tanır“ (WORLD). „Für Frau Brandl, bitte.“ `content/v2/**` içinde tek başına cümle olarak yok.

**Bulgu 10: „Bitte, Tobi!“** Ad ve ünlemle tek başına okununca Almancada önce yalvarma anlamı gelir („Lütfen Tobi, hadi!“), „rica ederim“ değil. Nokta ile cümle sakin bir karşılık olur. Türkçesi anlamı zaten sabitliyor. Kalan şüphe: yapboz ya da dikte bağlamsız gelirse cümle yine iki anlama açık. En temiz biçim iki satırlık bir alışveriş olurdu (teşekkür ve karşılığı); görev cümlesi şeması bunu taşıyorsa ANA karar versin.

**Sorulan öteki satırlar:**
- **„Ja, für Ioana.“** Kısa cevap olarak doğal (soru: „Für Ioana?“). Türkçesi birebir.
- **„Nicht diese Woche, Frau Huber.“** Doğru ve söylenir; **nicht** olumsuzlanan öğenin önünde. Huber'e soyadla hitap WORLD ile tutarlı.
- **„Heute ist Montag, vorgestern war Samstag.“** Takvim doğru (pazartesiden iki gün önce cumartesi). İki ana cümle virgülle bağlanabilir. „Evvelsi gün“ kartın karşılığıyla aynı.
- **„Hallo? Praxis Dr. Weber?“** Hat kötüyken ya da karşı taraf adını söylemeden açınca arayan böyle sorar. Artikelsiz biçim telefon dili; WORLD'deki açılışla („Praxis Dr. Weber, Huber, …“) aynı adlandırma. Türkçesi „Alo? … mi?“ doğru.

**Kalan şüpheler (dil hatası değil):**
- h3 **„Und am Sonntag? Geht es?“** Doğru ve dosyanın öğrettiği **geht es** kalıbıyla tutarlı. Gündelikte burada **Geht das?** ya da **Geht's da?** daha sık; ikisi de yasak ya da küme dışı. Küme açılınca yenilenebilir.
- h1 sahnesinde komşunun ekmeğini almak WORLD'de yazılı bir olay değil; çelişmiyor ama yeni bir küçük ayrıntı. BG uygun görmezse eski cümleye dönülmesin: seçenek „Für Tobi, bitte.“ (öğrencinin bildiği ad).
- Yazarın açık bıraktığı üç madde (iki `accepted` çakışması, **für**'ün ilk geçişi) dil sorunu değil; karar İÇ/ANA'da.

Bu turda: 20 madde, 2 bulgu (hata oranı 2/20 = %10; dilbilgisi hatası 0, doğallık ve anlam 2). İkisi de dosyada düzeltildi.

**KAPANDI.**

## h1 yeni sahne

Tarih: 2026-11-20 · Okur eski sahneyi („Für Frau Brandl, bitte.“, fırın) iki anlamlı bulduğu için BG sahneyi değiştirdi. İncelenen: 3 satır + 1 soru (4 madde). Denetim: `halka_kontrol.py` → **0 hata, 2 not** (ikisi de h2/h5 „hier ist {name}“; h1'de not yok). Dosyada değişiklik yapılmadı.

| Madde | Karar | Düzeltme |
|---|---|---|
| ch:brandl „Hallo! Bitte, für Sie.“ / Merhaba! Buyurun, sizin için. | Doğru | yok |
| ogrenci „Für mich? Danke, Frau Brandl!“ / Benim için mi? Teşekkürler Brandl Hanım! | Doğru | yok |
| ch:brandl „Bitte!“ / Rica ederim! | Doğru | yok |
| Soru „Brandl Hanım ne yapıyor?“ (4 şık, doğru: Sana bir şey veriyor.) | Tek doğru cevap | yok |

- **Almanca:** Bir şey uzatırken **Bitte, für Sie.** gündelik ve doğal (uzun biçimi **Bitte schön**; küme dışı, gerekmiyor). **für** + Akkusativ doğru: **Sie**, **mich**. **Für mich?** şaşkınlık sorusu olarak tam böyle söylenir. Teşekkürden sonra tek başına **Bitte!** burada yalnızca „rica ederim“ okunur; bulgu 10'daki iki anlamlılık (ad + ünlem, bağlamsız) bu satırda yok, çünkü önceki satır teşekkür.
- **Türkçe:** Üç çeviri de doğru ve doğal. **bitte** aynı sahnede iki anlamda geçiyor (buyurun / rica ederim); ikisi de kartın karşılığında var („lütfen, buyurun, rica ederim“), üçüncüsü görev cümlesinde („Ja, bitte, Frau Stadler.“). Halka kartın üç anlamını da göstermiş oluyor.
- **Kimlik:** Öğrencinin satırında ad ya da cinsiyet yok; Brandl'ın **Sie** hitabı cinsiyetsiz. D-061 ile uyumlu.
- **WORLD:** Brandl alt kat komşusu, öğrenciyle **Sie** konuşuyor („Kommen S' rein!“, hafta 24 „haben Sie“), bir şeyler getiriyor („Plätzchen getirir“). Sahne verilen şeyi adlandırmıyor; yeni olay, akraba ya da geçmiş eklemiyor. Eski sahnedeki „komşunun ekmeğini alma“ ayrıntısı da böylece kalktı (önceki bölümdeki şüphe kapandı).
- **Soru:** „Für Sie“ + „Für mich? Danke“ yalnızca „veriyor“ ile bağdaşır. „İstiyor“ çeldiricisi **bitte** = lütfen okumasını, „telefonla arıyor“ **Hallo** = alo okumasını (aynı halkada „Hallo? Frau Huber?“) sınıyor; ikisi de sahnede yanlış. Vedalaşma yok. Tek doğru cevap.

**Kalan şüphe (dil hatası değil, engel değil):** WORLD'de Brandl'ın sık selamı **Grüß Gott!**; 79 yaşında bir Bavyeralının **Sie** dediği komşuya **Hallo** demesi mümkün ve günümüzde yaygın (konuşmasının %40'ı Alltag), ama en tipik selamı değil. h1'de bilinen sözcükler yalnızca hallo, danke, bitte, Frau, ja olduğu için doğru seçim bu; **Grüß Gott** öğretildikten sonra Brandl sahnelerinde o kullanılsın.

Bu turda: 4 madde, 0 bulgu (hata oranı 0/4).

**KAPANDI.**

## 2. sürüm son metin

Tarih: 2026-11-20 · Son metin bir kez, baştan sona okundu (PM-057). İncelenen: **85 madde** (50 görev cümlesi ve her birinin `accepted` listesi, 17 sahne satırı, 5 soru, 5 `ortam_tr`, 6 kalıp, 2 kart açıklaması). Denetim (düzeltmelerden sonra): `halka_kontrol.py` → **0 hata, 0 not**. Yeni sözcük eklenmedi; her düzeltme o halkada zaten geçen sözcüklerle yapıldı. Sözlük dosyalarına dokunulmadı, bu yüzden `content:validate` gerekmedi.

Kabul listesi ölçütü: öğe doğru ve söylenir Almanca olacak, Türkçedeki içeriği eksiksiz taşıyacak (sözcük eklemeyecek, söz edimini düşürmeyecek). Sıra değişimi, **am** / yalın gün adı, gün adı özneyken **geht** / **geht es**, **doch**, **denn** ve ton parçacığı **ja** bu ölçüte uyuyor.

| # | Madde | Sorun | Düzeltme |
|---|---|---|---|
| 11 | h1 `lx:danke` „Danke, Frau Stadler!“ ve h3 `lx:Herr` „Danke, Herr Wimmer!“, `accepted[2]` | „Ja, danke, …“ kabul ediliyordu. Aynı halkada „Ja, danke, Frau Huber.“ ayrı bir görev cümlesi ve Türkçesi „Evet, teşekkürler …“. Aynı Almanca kalıp hem „Teşekkürler“ hem „Evet, teşekkürler“ için doğru sayılıyordu. | „Ja, danke, Frau Stadler!“ → „Danke, danke, Frau Stadler!“ · „Ja, danke, Herr Wimmer!“ → „Danke, danke, Herr Wimmer!“ (yazarın „Bitte, bitte, Tobi.“ kalıbıyla aynı) |
| 12 | h2 `lx:heute` „Heute? Ja, bitte!“ `accepted[1–2]`; h2 `lx:Dienstag` „Am Dienstag? Ja, bitte.“ `accepted[2]` | Üç öğe soruyu düşürüyordu: „Ja, heute, bitte!“ = „Evet, bugün lütfen“, „Bugün mü?“ yok. Türkçedeki yankı sorusu üretilmeden cevap doğru sayılıyordu. | „Ja, heute, bitte!“ → „Heute? Ja, heute, bitte!“ · „Ja, bitte, heute!“ → „Heute? Bitte, ja!“ · „Ja, bitte, am Dienstag.“ → „Am Dienstag? Ja, am Dienstag, bitte.“ |
| 13 | h4 `lx:Sonntag` „Morgen ist Sonntag!“ `accepted[1]` | „Ja, morgen ist Sonntag!“ Türkçede olmayan „Evet“i ekliyor. Burada temiz bir üçüncü biçim var. | → „Sonntag ist morgen!“ (yazarın „Donnerstag war vorgestern.“ öğesiyle aynı tür) |
| 14 | h4 `lx:Sonntag` „Und am Sonntag? Geht es?“ `accepted[1]` | „Geht es am Sonntag?“ **Und**'u („Peki“) düşürüyor ve h3'teki „Geht es am Freitag?“ cümlesinin eşi; iki ayrı Türkçe aynı cevaba gidiyordu. | → „Und geht es am Sonntag?“ |
| 15 | h1 `lx:Frau` „Ja, Frau Huber.“ `accepted[2]` | „Ja, ja, Frau Huber.“ Almancada bıkkın, baştan savan bir ton taşır; **Sie** denen birine model olamaz. | → „Ja, Frau Huber, ja.“ |
| 16 | h1 sahne 2. ve 3. satır (tr) | **für** aynı halkada „için“ („Ja, für Ioana.“ → „Evet, Ioana için.“), sahnede „Tobi'ninki“ idi. Önceki bulgu 9'un aynısı (tek karşılık, OD-9). `ortam_tr` bağlamı artık verdiği için „için“ yeterince açık. | „Tobi'ninki, lütfen.“ → „Tobi için, lütfen.“ · „Evet, Tobi'ninki. Buyurun!“ → „Evet, Tobi için. Buyurun!“ |
| 17 | h2 `lx:nein` „Nein, danke, Tobi.“ (tr) | Kartın kendi görev cümlesinde kart anlamı görünmeli (bulgu 2 ile aynı ilke): **nein** = hayır. | „Yok, sağ ol Tobi.“ → „Hayır, sağ ol Tobi.“ |
| 18 | h2 sahne 3. satır (tr) | Brandl öğrenciye **Sie** der (WORLD); Türkçesi „sen“ biçimindeydi. | „Sağ ol!“ → „Sağ olun!“ |
| 19 | h4 `ortam_tr` | „vardiya“ vardiyalı bir işi ima ediyor; WORLD'de iş yeri ofis (hafta 11) ve vardiya düzeni yok. | „hafta sonu vardiyası konuşuluyor“ → „hafta sonu mesaisi konuşuluyor“ |

Ağırlık: 11–13 gerçek hata (yanlış ya da eksik cevabı kabul eden öğe; 6 öğe, 5 madde). 14–15 kabul listesinde anlam ve ton. 16–19 Türkçe tutarlılık ve WORLD.

**Sorun bulunmayanlar:**
- **Almanca (50 cümle, 17 satır):** dilbilgisi hatası yok. „Wir gehen heute in die Praxis.“, „Gehen Sie morgen in die Praxis, Herr Wimmer?“, „Freitag geht nicht, Herr Pichler.“, „Morgen ist Sonntag!“ doğru ve söylenir. Öğrencinin satırlarında ad ya da cinsiyet yok (D-061).
- **Kalıplar:** „Heute ist …“ → „Bugün …“, „Geht …?“ → „… olur mu?“, „… geht.“ → „… olur.“, „… geht nicht.“ → „… olmuyor.“, „Guten Tag“ → „İyi günler“ doğal. „Gestern war …“ → **„Dün … idi“** kalabilir: **idi** ekin açık biçimi, her Türkçe konuşan anlar ve geçmiş zamanı kalıpta görünür kılar; ünlü uyumlu ek („…ydı/ydi/ydu/ydü“) yuvayla yazılamaz. Örnek cümlelerde kaynaşmış biçim („salı mıydı“, „perşembeydi“) doğru.
- **Sahne soruları:** beşi de tek cevaplı. h5: „übermorgen, am Freitag“ → bugün çarşamba; başka şık tutmuyor. h4: cumartesi açıkça reddediliyor, pazar kabul ediliyor; „İkisi de“ ve „Hiçbiri“ yanlış.
- **WORLD:** Stadler fırında, Brandl alt kat komşusu, Huber Dr. Weber'in sekreteri ve telefonda, Wimmer şef ve **Sie**; Tobi ve Ioana'ya ön adla. Bairisch yok. Yeni akraba, olay ya da geçmiş eklenmemiş.
- **Kart açıklamaları (`lx:Frau`, `lx:Herr`, `exp.ne_zaman_tr`):** „Türkçede Hanım/Bey addan sonra, Almancada Frau/Herr soyadından önce gelir: Huber Hanım, Frau Huber olur.“ Doğru, doğal, İngilizce köprü yok; örnekler halkalardaki yazımla aynı. Değiştirilmedi.

**Kalan şüpheler (düzeltilmedi; engel değil):**
1. **„Ja, …“ ile doldurulan üçüncü öğe (6 öğe).** „Ja, hallo, Tobi!“, „Ja, hallo? Frau Huber?“, „Ja, hallo, Frau Brandl!“, „Ja, hallo, Herr Pichler!“, „Ja, guten Tag, Frau Brandl!“ selamda söylenir (**ja** burada „evet“ değil, söze giriş parçacığı) ve aynı halkada çelişen bir cümle yok; bıraktım. „Ja, bis morgen, Ioana!“ ve „Ja, bis Donnerstag, Tobi!“ ise „Tamam, … görüşürüz“ demek; Türkçede karşılığı yok, ama eldeki sözcüklerle temiz bir üçüncü biçim kurulamıyor. Öğrenci fazladan **Ja** yazarsa yanlış bir şey öğrenmiş olmuyor. Karar İÇ/ANA'da: bu yedi öğe kalsın, ya da hitap cümlelerinde alt sınır 2'ye insin (D-064 ile çelişir).
2. **Soru ile onay sorusu çapraz kabul ediliyor.** „Heute ist Dienstag, ja?“ („…, değil mi?“) için „Ist heute Dienstag?“, „Ist heute Mittwoch?“ („… mı?“) için „Heute ist Mittwoch, ja?“ kabul; h4 ve h5'te de aynı (Samstag, übermorgen, gestern). Önerme aynı, iletişim açısından ikisi de işini görür; Türkçe iki biçimi ayırıyor. Hoşgörü olarak bıraktım. Kart „değil mi“ ekini ayrıca öğretecekse çapraz öğeler çıkarılmalı.
3. **„Tobi, bitte.“** („Rica ederim Tobi.“ için kabul): ad başta olunca rica ya da sitem gibi okunur (bulgu 10). Öğrencinin cevabı olarak yanlış değil; kabul listesi öğrenciye örnek diye gösterilecekse çıkarılsın.
4. **„zur Praxis“** (h5 `lx:gehen`, iki öğe): doğru Almanca ve haksız reddi önlüyor; **zu** 1. günde öğretilmiyor, yazarın „bilinmeyen yok“ beyanı bu iki öğe için tutmuyor. Kabul listesinde zararsız.
5. **Perşembe.** h3 sahnesinde Huber „morgen, am Donnerstag“ öneriyor, h5 sahnesinde „morgen“ (perşembe) muayenehane kapalı. Ayrı haftalar olabilir; yine de aynı günün içinde art arda okununca çelişki gibi duruyor. Seçenek: h5 „übermorgen, am Donnerstag“ olur (bugün salı, kapalı gün çarşamba; cevap „Salı“). İçerik kararı, BG'de.
6. **Selamlar.** Huber arayan taraf olarak „Hallo!“ diyor (h3), Stadler ve Brandl da; WORLD'deki **Grüß Gott** küme dışı. Önceki turlardaki notla aynı.
7. **Kart açıklaması.** Türkçede Hanım/Bey çoğunlukla ön adla (Ayşe Hanım), Almancada Frau/Herr yalnızca soyadıyla söylenir. Cümle sırayı doğru veriyor; „Frau + ön ad olmaz“ uyarısı açık yazılmamış. Türkçe konuşanın tipik hatası bu olduğu için lex bir sonraki turda `mistakes_tr`'ye alabilir.

Hata oranı: **9 bulgu / 85 madde ≈ %10,6** (etkilenen madde 12, değişen satır 13; gerçek hata 3 bulgu, 5 madde). Hepsi dosyada düzeltildi.

**KAPANDI** (dil açısından). Kalan şüpheler küme, alt sınır ve kurgu kararları.

## h3/h5 sahne düzeltmesi

Tarih: 2026-11-20 · Kapsam: baş geliştiricinin 5. şüphe („perşembe“) için değiştirdiği iki sahne. İncelenen: **11 madde** (7 sahne satırı, 2 soru, 2 `ortam_tr`). Denetim (düzeltmeden sonra): `halka_kontrol.py` → **0 hata, 0 not**. Yeni sözcük eklenmedi.

| # | Madde | Sorun | Düzeltme |
|---|---|---|---|
| 20 | h5 sahne 2. satır (tr) | Ara söz („cuma günü“) kapanış virgülü olmadan yazılmıştı; Almancası iki virgüllü („übermorgen, am Freitag, ist …“) ve 1. günün ses kaydındaki aynı yapı iki virgüllü („Bugün, cuma günü, muayenehane kapalı.“). | „Ama öbür gün, cuma günü muayenehane kapalı.“ → „Ama öbür gün, cuma günü, muayenehane kapalı.“ |

**Sorun bulunmayanlar:**
- **Almanca:** yedi satır da doğru ve söylenir. „Geht es morgen, am Donnerstag?“, „Geht Montag?“, „Montag … ja, Montag geht.“, „Ist die Praxis morgen geschlossen?“, „Nein, morgen nicht. Aber übermorgen, am Freitag, ist die Praxis geschlossen.“ (fiil ikinci sırada, ara söz virgülleri yerinde). „Nein, morgen geht nicht.“ konuşma dilindeki kısa biçim (tam biçim „morgen geht es nicht“); h3 kalıbı „… geht nicht.“ ile aynı yuva ve h5 kabul listesinde de „Morgen geht nicht, …“ var, bu yüzden bıraktım. Öğrencinin satırlarında ad ve cinsiyet yok (D-061).
- **Türkçe:** „olur mu / olur / olmuyor“ h3 kalıplarıyla, „Öbür gün mü?“ ve „kapalı“ kart anlamlarıyla aynı. „Randevu hangi güne kalıyor?“ doğal (önerilen gün reddedilip başka güne kaldığı için „kalıyor“ yerinde).
- **Sorular tek cevaplı:** h3: perşembe açıkça reddediliyor, pazartesi kabul edilip „Bis Montag!“ ile kapanıyor; cuma ve cumartesi sahnede hiç geçmiyor. h5: „übermorgen, am Freitag“ → bugün yalnızca çarşamba olabilir; „morgen nicht“ perşembeyi ayrıca dışlıyor.
- **Tutarlılık:** iki sahne aynı güne (çarşamba) oturuyor ve birbirini destekliyor: h3'te Huber perşembeyi öneriyor, h5'te perşembe açık, cuma kapalı. 1. günün ses kaydıyla (`m1:01:a1`: „Heute, am Freitag, ist die Praxis geschlossen. … Danke und bis Montag!“) örtüşüyor: cuma kapalı, pazartesi açık, h3 randevusu pazartesi. 5. şüphe kapandı.

**Kalan şüpheler (düzeltilmedi; engel değil):**
1. 1. günün rol oyununda Huber'le randevu perşembeye (ya da salıya) bağlanıyor, h3 sahnesinde pazartesiye. Halka günün dersini varsaymadığı için çelişki değil, ayrı bir arama olarak okunuyor; ikisi aynı arama diye sunulacaksa günler eşitlenmeli. Karar BG'de.
2. Huber arayan taraf olarak kendini tanıtmadan „Hallo!“ diyor (önceki 6. şüpheyle aynı; küme kısıtı).

Hata oranı: **1 bulgu / 11 madde ≈ %9** (noktalama; dil ya da içerik hatası yok). Dosyada düzeltildi.

**KAPANDI.**
