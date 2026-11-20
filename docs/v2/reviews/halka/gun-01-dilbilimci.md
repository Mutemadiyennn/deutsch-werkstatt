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
