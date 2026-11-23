# İÇ-16 · A2 14. hafta (gün 92–98) · örneklem kontrolü

Tarih: 2026-11-23 · inceleyen: qa-ajan (bağımsız; dilbilimci ve okur turlarından sonra) · PM-113 md. 5.
Dal: `content/a2-hafta-14` (çalışma ağacı, dilbilimci okur farkını işledikten sonra). İçerik dosyalarına dokunulmadı.
Dosyalar: `content/v2/m1/gun-92.json` … `gun-98.json`, `dn-14.json`, `hafta-sonu-testi-14.json`, `gorulmemis-14.json`, `content/v2/registry/grammar.json` `gr:a2-05:t1`–`t4`.
Okunan raporlar: `docs/v2/reviews/ic16/dilbilimci-h14.md`, `docs/v2/reviews/okur/ic16-h14.md`. Biçim örneği: `docs/v2/reviews/ic16/orneklem-h13.md`.

## Sonuç: **GERİ** (A 1 · B 2 · C 7)

Örneklemde hata oranı (A+B) **3/30 = %10**. C ile birlikte 10/30. Eşik %2. A bulgusu var, bu yüzden sonuç GERİ.
Önerilen bütün düzeltmeler bir kopyada denendi: validate 0 hata, dikiş 0, hafta kapısı GEÇTİ, yazma 7/7 `tamam`, verdict koşuları beklendiği gibi (aşağıda "Düzeltme denemesi").

## Yöntem

- **Havuz:** 629 öğe. 13 tür: halka görev cümlesi, halka sahne sorusu, anlama (ana fikir ve ayrıntı), dikte basamağı, "Sen ne derdin?", eylem, görsel, prova seçeneği, okuma sorusu, yazma, gün sınavı maddesi, hafta testi maddesi, görülmemiş durum.
- **Seçim betiği:** 13. haftanın `sec.py`'si, aralık 92–98 ve 14. hafta dosyalarına çevrildi (oturum karalama alanı `orn14/sec.py`). `random.Random(2026112314)`. **Tohum: 2026112314.**
  1. Her gün dosyasından 3 öğe. Gün içinde karıştırılmış sırada önce örneklemde henüz olmayan tür, sonra o günde olmayan tür alınır.
  2. Test ve görülmemiş dosyalarından karıştırılıp ilk 3'er öğe.
  3. Kalan havuzdan karıştırılıp ilk 3 öğe.
  Sonuç: 13 türün hepsi örneklemde. Gün başına en az 3, test 3, görülmemiş 3.
- **Her öğede beş soru** (bilgi kısıtlı öğrenci gibi):
  (1) İstenen sözcük ve biçim o ana kadar gösterilmiş mi? Kaynak: haftanın kalıpları, kartlar, ders, birleşik tablo (`nerede.py`).
  (2) Doğru cevap `accepted`'da mı? Makul doğru cevap reddediliyor mu, yanlış cevap kabul ediliyor mu?
  (3) Almanca ve Türkçe doğru mu?
  (4) `ans` doğru şıkkı, `kanit` doğru cümleyi gösteriyor mu?
  (5) Görülmemiş durum derste geçmeyen bir bağlam mı?
- **Araçlar:** uygulamanın kendi değerlendiricisi `web/src/core/answer.ts` `ruleVerdict` (her üretim öğesinde 2–5 aday cevap), `okuma.ts` `yazmaKontrol`, `medya.ts` `eksikZorunlu`.
- **Sınıflar:** A öğretilmeden isteme ya da yanlış anahtar (doğru cevap reddedilir, yanlış şık doğru sayılır). B yanlış cevap kabul edilir ya da anlam ve tutarlılık hatası. C küçük.

## Araç denetimi (`denet.sh 14 wt14`)

- `content:validate`: **0 hata**, 205 uyarı.
- Dikiş 92–98: bütün sütunlar 0, **İhlal: 0**.
- Hafta kapısı **GEÇTİ**: öğretilmeden istenen 0 (kesin 0, sınırda 0), anlaşılmayan karşı soru 0, test %100 (12/12), görülmemiş 7/7. "Anlama: kanıtta yeni" 43 (engel değil).
- **Yazma görevleri** (`yzkontrol.ts wt14 92 98`, `yazmaKontrol(ornek_de)`): **7/7 `tamam: true`**. 13. haftadaki A1 türü hata yok. Tek iz: 95'te örnek cevabın bir cümlesi tanınmıyor (C3).

```
92 TAMAM {"eksik":[],"kalipli":3,"toplam":3,"taninmayan":[],"tamam":true}
93 TAMAM {"eksik":[],"kalipli":3,"toplam":3,"taninmayan":[],"tamam":true}
94 TAMAM {"eksik":[],"kalipli":4,"toplam":4,"taninmayan":[],"tamam":true}
95 TAMAM {"eksik":[],"kalipli":3,"toplam":4,"taninmayan":["Bring bitte den Pass und den Nachweis von der Krankenkasse mit."],"tamam":true}
96 TAMAM {"eksik":[],"kalipli":4,"toplam":4,"taninmayan":[],"tamam":true}
97 TAMAM {"eksik":[],"kalipli":4,"toplam":4,"taninmayan":[],"tamam":true}
98 TAMAM {"eksik":[],"kalipli":4,"toplam":4,"taninmayan":[],"tamam":true}
```

Araç A1, B1, B2'yi yakalamıyor: kapı yazım varyantını değerlendiriciyle denemiyor, sahneler arası saat tutarlılığına bakmıyor, görevdeki "şunu kullan" yönergesini `accepted` ile karşılaştırmıyor.

## Örneklem (30 öğe)

| # | dosya · yer | tür | (1) öğretildi | (2) anahtar | (3) dil | (4) ans/kanıt | sonuç |
|---:|---|---|---|---|---|---|---|
| 1 | 92 · `sahne.bolumler[b2].ana_fikir` | anlama | – | – | doğru | ans 0, s8 + s10 (yeni iş, cumartesi taşınma) | ✓ |
| 2 | 92 · `prova.dugumler[n2b].secenekler[0]` | prova | **ich ärgere mich** (h1 kalıbı), **zu klein** (h1) | 4 biçim, düzeltmesiz kısa biçim de var | doğru | – | ✓ |
| 3 | 92 · `sahne.bolumler[b2].dikte[d5]` | dikte gerçek | **Tobi zieht nach Hamburg.**, **Wir freuen uns für ihn.** (h2) | zorunlu **freuen uns** görevde söylenmiyor | doğru | – | **C1** |
| 4 | 93 · `halkalar[h2].gorev_cumleleri[2]` | halka görev | **Um fünf treffen wir uns** (h2), **erledigen** kartı, **nach der Arbeit** (h1 sahnesi) | 3 biçim | doğru | – | ✓ (K1) |
| 5 | 93 · `sesler[a1].eylem` | eylem | **von neun bis siebzehn Uhr**, **geöffnet** | – | doğru | ans 0, c5 | **B1** (saat tutarsızlığı) |
| 6 | 93 · `gun_sinavi.maddeler[s10]` | sınav dinle-cevapla | **Ich fühle mich gestresst** (h2), **müde** (7), **bisschen** (33) | 5 biçim; „Gut, aber ein bisschen müde." `ask_ai` | doğru | – | ✓ |
| 7 | 94 · `okuma_yazma.sorular[o4]` | okuma sorusu | – | – | doğru | ans 0, kanıt 8 = „Unterlagen: Pass und Bestätigung vom Vermieter." | ✓ |
| 8 | 94 · `gorsel[g1]` | görsel | **Behörde** kartı | – | – | resmî bina ayırt edilebilir | ✓ |
| 9 | 94 · `sahne.bolumler[b2].cevapla` | Sen ne derdin? | **Ich interessiere mich für Musik.** (h2) | **`why_tr`'nin örnek cümlesi kabulde yok** | doğru | – | **C2** |
| 10 | 95 · `halkalar[h2].sahne.soru` | halka sorusu | – | – | doğru | ans 0 (iş, Elbe, daire) | ✓ |
| 11 | 95 · `okuma_yazma.yazma` | yazma | **darauf gewartet** (h1), **Nachweis**, **Bring bitte … mit** (94) | `tamam: true`, ama örneğin 2. cümlesi tanınmıyor | doğru | – | **C3** |
| 12 | 95 · `gun_sinavi.maddeler[s10]` | sınav dinle-cevapla | **Wofür?** (t4), **Kuchen** (9), **Feier** (81) | 5 biçim | doğru | – | ✓ |
| 13 | 96 · `sesler[a1].b1.dikte[d1]` | dikte kolay | **Ummeldung** (dn-14) | – | doğru | ans 0, c3 | ✓ |
| 14 | 96 · `sahne.bolumler[b2].cevapla` | Sen ne derdin? | **sich ummelden**, **umgezogen** (h1, dn-14) | 5 biçim | doğru | – | ✓ |
| 15 | 96 · `gun_sinavi.maddeler[s10]` | sınav dinle-cevapla | **sondern** kartı (96), **Ich bleibe hier** (h1) | **görev „sondern kullan" diyor, 5 kabulün 3'ünde sondern yok**; 1 kabul ve `why_tr` paralel değil | **kusurlu** | – | **B2** |
| 16 | 97 · `sahne.bolumler[b1].ayrinti[2]` | anlama | – | – | doğru | ans 0 „İki", s6 „also noch zwei Nummern"; „Bir" de savunulabilir | **C4** |
| 17 | 97 · `sesler[a1].eylem` | eylem | – | – | doğru | ans 0, c4 (43 → Platz vier) + c5 (kimliği eline al) | ✓ |
| 18 | 97 · `okuma_yazma.sorular[o3]` | okuma sorusu | – | – | doğru | ans 0, kanıt 1 „am Donnerstag bis achtzehn Uhr" | ✓ |
| 19 | 98 · `sesler[a1].b1.cevapla` | Sen ne derdin? | **zuerst** (97), **Dame** kartı, aktarma **Ihren → meinen** (98 s10) | 5 biçim | doğru | – | ✓ (K1) |
| 20 | 98 · `halkalar[h1].gorev_cumleleri[0]` | halka görev | **Er hat sich an der Hand verletzt.**, **beim Umzug** (h1) | 3 biçim | doğru | – | ✓ (K1) |
| 21 | 98 · `sahne.bolumler[b1].ana_fikir` | anlama | – | – | doğru | ans 0, s1 + s4 + s6 | ✓ |
| 22 | test `t08` | boşluk | t3 **sich freuen auf** | `auf` | doğru | – | **C5** (test pazar günü, kahve de pazar) |
| 23 | test `t06` | dönüştürme | **nicht ab, sondern an** (96 h1) | **tam yan cümleli birleştirme kabulde yok** | doğru | – | **C6** |
| 24 | test `t02` | sıralama | t4 **Worauf freust du dich?** | 3 biçim | doğru | – | ✓ |
| 25 | görülmemiş `g1` | durum | t3 **sich freuen über / sich ärgern über** | 4 biçim | doğru | – | ✓ Spor salonu ve Basti yeni bağlam. Ders örnekleri Nachricht, Müll, Mahnung. |
| 26 | görülmemiş `g6` | durum | **zu Platz …**, **auf dem Bildschirm** (97) | **kalıbın kendisi („Gehen Sie bitte zu Platz zwei.") kabulde yok** | doğru | – | **C7** · Postane ve yaşlı kadına yardım yeni bağlam. |
| 27 | görülmemiş `g7` | durum | **Was kann ich jetzt machen?**, **Kann ich … wieder kommen?** (98 h1) | **„Kann ich morgen wiederkommen?" `wrong`** | yazım: **wiederkommen** bitişik | – | **A1** · Kütüphane yeni bağlam. |
| 28 | 93 · `halkalar[h2].gorev_cumleleri[3]` | halka görev | **Ich habe alles erledigt.** (h2), **ich fühle mich** (h2) | 3 biçim | doğru | – | ✓ |
| 29 | 95 · `prova.dugumler[n2].secenekler[1]` | prova | **Wofür?** (t4), **Für den Termin** | 4 biçim | doğru | – | ✓ |
| 30 | 95 · `halkalar[h1].gorev_cumleleri[4]` | halka görev | **seinen Aufenthaltstitel verlängern** (h1) | 3 biçim | doğru | – | ✓ |

## A · öğretilmeden isteme ya da yanlış anahtar (1)

**A1 · `gorulmemis-14` `durumlar[m1:h14:g7]` · Standart yazım „wiederkommen" değerlendiricide `wrong`.**

İçerik „Kann ich … wieder kommen?" diye ayrı yazıyor (98 h1 kalıbı, 98 prova `n3` seçenek 1, g7 `accepted[1]` ve `kalip`). „Geri gelmek" anlamında Duden yazımı bitişik: **wiederkommen**. Depodaki sözlük de böyle yazıyor: `registry/lexicon/batch-002.json` „Können Sie morgen wiederkommen?", `batch-b1-01b.json` „Wann soll ich wiederkommen?".

Koşu (`ruleVerdict(g7.accepted, …)`):

```
wrong     | Kann ich morgen wiederkommen?
ask_ai    | Kann ich morgen wieder kommen?
```

Öğrenci doğru yazımla cevap verirse kesin "yanlış" görüyor. Bu, haftanın transfer sınavında doğru cevabın reddi. 98 prova `n3`'te de aynı yazım `ask_ai` (çevrimdışı "kontrol edilemedi").

**Öneri:**
- 98 `halkalar[m1:98:h1].kaliplar` („Was kann ich jetzt machen? – …"): „Kann ich heute Nachmittag wiederkommen?"
- 98 `prova.dugumler[n3].secenekler[1]`: `de` „Kann ich heute Nachmittag wiederkommen?". `accepted`: „Kann ich heute Nachmittag wiederkommen?", „Gut. Kann ich heute Nachmittag wiederkommen?", „Kann ich heute Nachmittag noch einmal kommen?", „Kann ich am Nachmittag wiederkommen?", „Kann ich heute Nachmittag wieder kommen?" (ayrı yazım hoşgörü için kalır).
- g7 `accepted[1]`: „Eine Meldebescheinigung habe ich leider nicht hier. Kann ich morgen wiederkommen?". Eklenecek: „Kann ich morgen wiederkommen?" ve hoşgörü için „Eine Meldebescheinigung habe ich leider nicht hier. Kann ich morgen wieder kommen?".
- g7 `kalip`: „Was kann ich jetzt machen? – Kann ich … wiederkommen?"

## B · yanlış cevap kabul ediliyor ya da tutarlılık hatası (2)

**B1 · gun-93 · `sesler[m1:93:a1]` c5 ve `eylem` · Banka 17'de kapanıyor, ama öğrenci ile Tobi saat beşte bankada işlem yapıyor.**

- c5: „… von neun bis siebzehn Uhr geöffnet." Eylem bunu öğretiyor: "Banka … dokuzdan on yediye kadar açık."
- Aynı günde: h2 `ortam_tr` "Saat beş, Stadtplatz'daki bankanın önü", sahne s1 "bankanın önü, saat beş", s7 "İçeride, gişenin önü", havale formu dolduruluyor. Prova n2'de Tobi „Ich arbeite bis fünf." diyor. Yazma örneği „wir treffen uns morgen um fünf am Geldautomaten. Wir machen die Überweisung zusammen."
- Eylemi yeni çözmüş öğrenci, beşte kapanan bankada gişe işlemi görüyor.

**Öneri:** Kapanış saati 18 olsun (buluşma saati, prova ve yazma değişmez):
- c5 `de`: „Unsere Bank am Stadtplatz ist von Montag bis Freitag von neun bis achtzehn Uhr geöffnet." `tr`: "Stadtplatz'daki bankamız pazartesiden cumaya dokuzdan on sekize kadar açık."
- `bolumler[b1].dikte[d2].de`: „… von neun bis achtzehn Uhr ___."
- `eylem.why_tr`: "Banka pazartesiden cumaya dokuzdan on sekize kadar açık. Saat on dokuzda kapalı."

**B2 · gun-96 · `gun_sinavi.maddeler[m1:96:s10]` · Görev „sondern kullan" diyor, kabullerin çoğunda sondern yok.**

- `situation_tr`: "Hamburg'a değil, burada kaldığını söyle. **sondern** kullan."
- `accepted[0]` „Nein, nicht nach Hamburg. Ich bleibe hier.", `[3]` „Nein, ich bleibe hier in Wendlfing.", `[4]` „Nein, ich ziehe nicht um. Ich bleibe hier." sondern'siz, `correct / exact` sayılıyor.
- `accepted[2]` „Nein! Nicht nach Hamburg, sondern ich bleibe in Wendlfing." ve `why_tr` „**nicht nach Hamburg, sondern hier**" paralel değil: yön (nach Hamburg) ile yer (hier) karşılaştırılıyor. Öğrenci bu kalıbı örnek alırsa „Ich ziehe nicht nach Hamburg, sondern hier." gibi bozuk cümle kurar.

**Öneri:**
- `accepted`: „Nein, ich ziehe nicht nach Hamburg, sondern bleibe hier.", „Nein, ich ziehe nicht nach Hamburg, sondern ich bleibe hier.", „Nein, ich ziehe nicht nach Hamburg, sondern ich bleibe in Wendlfing.", „Nein, ich ziehe nicht um, sondern bleibe hier.", „Nein! Ich ziehe nicht nach Hamburg, sondern bleibe in Wendlfing."
- `why_tr`: "Hayır deyip **sondern** ile düzeltirsin. Örnek: **Ich ziehe nicht nach Hamburg, sondern bleibe hier.**"
- Bir başka yol: "**sondern** kullan" yönergesi kalkar, `accepted` olduğu gibi kalır, yalnız `[2]` ve `why_tr` düzelir.

## C · küçük (7)

**C1 · gun-92 · `sahne.bolumler[b2].dikte[d5]` (gerçek):** `zorunlu` „freuen uns" ama görev sevinmekten söz etmiyor. Öğrenci „Tobi hat eine neue Stelle in Hamburg." yazınca "Şu kelimeleri de kullanmayı dene: freuen uns" görüyor.
Öneri `gorev_tr`: "Tobi'nin haberini ve buna sevindiğinizi Almanca iki kısa cümleyle anlat."

**C2 · gun-94 · `sahne.bolumler[b2].cevapla` (`m1:94:v1:c2`):** `why_tr`'nin örnek cümlesi „Ich interessiere mich für Musik." kabulde yok, `ask_ai` (çevrimdışı sayılmaz).
Öneri: `accepted`'a „Ich interessiere mich für Musik." ekle.

**C3 · gun-95 · `okuma_yazma.yazma`:** „Bring bitte ___ mit." yuvası en çok 4 sözcük. Örnekteki „den Pass und den Nachweis von der Krankenkasse" 7 sözcük, cümle "kontrol edemedim"e düşüyor. Kontrol listesi en az iki belge istediği için bu yuva hemen hiç tutmuyor („Bring bitte deinen Pass, ein Foto und den Arbeitsvertrag mit." da tanınmıyor).
Öneri:
- `ornek_de` 2. cümle: „Bring bitte den Pass und den Nachweis mit."
- `accepted_kaliplar`: `["Hallo Karim, dein Termin ist am ___.", "Hallo Karim!", "Dein Termin ist am ___.", "Bring bitte ___ mit.", "Bring bitte ___ und ___ mit.", "Du hast lange darauf gewartet.", "Viel Glück!"]`

**C4 · gun-97 · `sahne.bolumler[b1].ayrinti[2]`:** "Ioana'dan önce kaç numara var?" Ekranda 45, Ioana 47. Arada yalnız 46 var, „Bir" de savunulabilir. Kanıt cümlesi „also noch zwei Nummern".
Öneri: `q_tr` "Ioana ekranda 45'i görünce ne diyor?", `opts` ["İki numara daha var", "Bir numara daha var", "Beş numara daha var"], `ans` 0.

**C5 · `hafta-sonu-testi-14` `t08`:** Test 98. günde (pazar). Kahve de pazar saat on birde (98 sahne s1). Test anında kahve geçmiş olabilir, „über" de savunulur. `why_tr` "Pazar henüz gelmedi" diyor.
Öneri: `de` „Karim freut sich ___ den Termin am Donnerstag.", `tr` "Karim perşembe günkü randevuyu dört gözle bekliyor.", `why_tr` "Randevu henüz gelmedi, o yüzden **sich freuen auf**." (95 prova n1 „Freust du dich darauf?" ile tutarlı. Randevu 04.03.2027 perşembe.)

**C6 · `hafta-sonu-testi-14` `t06`:** „Ioana meldet sich nicht ab, sondern sie meldet sich um." ve „…, sondern meldet sich um." doğru birleştirmeler, `ask_ai`. Testte çevrimdışı puan almıyor.
Öneri: ikisini `accepted`'a ekle.

**C7 · `gorulmemis-14` `g6`:** Kalıbın kendisi „Gehen Sie bitte zu Platz zwei." kabulde yok, `ask_ai`.
Öneri: `accepted`'a „Gehen Sie bitte zu Platz zwei." ve „Sie sind dran. Gehen Sie bitte zu Platz zwei." ekle (**dran** 97 h1 kalıbında).

## Düzeltme denemesi (karalama kopyası; çalışma ağacına dokunulmadı)

Bütün A, B ve C önerileri `orn14/fix.py` ile wt14'ün bir kopyasına uygulandı. JSON biçimi korunuyor, ham fark yalnız değişen satırlar.

- `content:validate` 0 hata, 205 uyarı (önceki gibi). Dikiş 92–98 **İhlal: 0** (**wiederkommen**, **achtzehn**, **Karim … Termin am Donnerstag** ihlal vermiyor). Hafta kapısı **GEÇTİ** (12/12, 7/7).
- `yazmaKontrol(ornek_de)` 92–98: 7/7 `tamam`. 95: `kalipli 4/4`, `taninmayan` boş. Üç belgeli öğrenci cümlesi de tanınıyor.
- `ruleVerdict` önce ve sonra:

```
g7   „Kann ich morgen wiederkommen?"                                wrong  → correct
98 n3 „Kann ich heute Nachmittag wiederkommen?"                     ask_ai → correct
g6   „Gehen Sie bitte zu Platz zwei."                               ask_ai → correct
96 s10 „Nein, ich ziehe nicht nach Hamburg, sondern ich bleibe hier" ask_ai → correct
96 s10 „Nein, ich bleibe hier." (sondern'siz)                         ask_ai (yapay zekâya gider; artık kesin doğru değil)
t06  „…, sondern sie meldet sich um." / „…, sondern meldet sich um."  ask_ai → correct
94 c2 „Ich interessiere mich für Musik."                            ask_ai → correct
```

Baş oturum `python3 -I orn14/fix.py <wt14>` ile aynı değişikliği uygulayabilir (karalama alanında).

## Örneklem dışı gözlemler (oran hesabına girmedi)

- 93 prova `n2` seçenek 1 `geri_bildirim_tr`: "Saatle başladın: **Um halb sechs treffen wir uns** — **treffen** yine ikinci yerde." Uzun tire okurun OD-9 süzgecinden geçmiş. Öneri: "Saatle başladın: **Um halb sechs treffen wir uns.** **treffen** yine ikinci yerde."
- 96 sahne s6 `tr` hâlâ "Görüşmeye devam!". Dilbilimci aynı cümlenin kalıp `tr`'sini "İletişimde kalalım!" yaptı (C listesi), diyalog çevirisi eski kaldı.
- 93 s10 „Gut, aber ein bisschen müde." ve 98 a1 „Zuerst braucht sie meinen Ausweis." `ask_ai`. Yakın biçimler kabulde var, sayılmadı (K1).

## Kod gözlemi (içerik hatası sayılmadı)

**K1 · `web/src/core/answer.ts` `ruleVerdict`:** Kabuldeki cümlenin zarf başa alınmış (devrik) ya da geri alınmış biçimini sıra varyantı saymıyor. Örnekler:
- „Wir treffen uns nach der Arbeit und erledigen das." (kabulde: „Nach der Arbeit treffen wir uns und erledigen das.")
- „Zuerst braucht sie meinen Ausweis." (kabulde: „Sie braucht zuerst meinen Ausweis.")
- „Beim Umzug hat Tobi sich an der Hand verletzt." (kabulde: „Tobi hat sich beim Umzug an der Hand verletzt.")

Hepsi `ask_ai`, çevrimdışı "kontrol edilemedi". Bu hafta t2 tam olarak bu sırayı öğretiyor („Um fünf treffen wir uns.").

**K2 · aynı yerde:** Bitişik ve ayrı fiil yazımı („wiederkommen" / „wieder kommen") eşdeğer sayılmıyor. A1'deki kesin `wrong` buradan geliyor. Öneri: `esdegerBul`'a boşluksuz karşılaştırma eklensin, ayrı yazım "yazım notu" ile doğru sayılsın (baş geliştirici).

## Gerçek cihazda denenmesi gerekenler

- Görülmemiş g7 (iPhone 15 Pro Max, WebKit, uçak modu): „Kann ich morgen wiederkommen?" yaz. Bugün kırmızı "yanlış" çıkıyor. Düzeltmeden sonra yeşil çıkmalı.
- 98 prova n3: aynı cümleyi sesle söyle. Konuşma tanıma büyük olasılıkla bitişik yazar („wiederkommen"), bugün çevrimdışı "kontrol edilemedi" oluyor.
- 95 yazma: örnek cevabı yaz. "Bunları kontrol edemedim" satırı çıkmamalı.
- 93: eylemden sonra sahneye geç. Saat 18 düzeltmesinden sonra ses (c5) yeni saatle okunmalı (TTS anlık, ses dosyası yok).

## Düzeltme (baş oturum İÇ-16)
qa'nın denenmiş önerileri (`orn14/fix.py`) aynen uygulandı: A1 `wiederkommen` bitişik (g7, 98 h1 kalıbı, 98 prova n3; ayrı yazım hoşgörü biçimi olarak kabulde), B1 93 bankanın kapanış saati 18, B2 96 `s10` kabulleri ve `why_tr` `sondern`lı; C1–C7 de. Sonra: validate 0 hata, dikiş 0, hafta kapısı GEÇTİ, `yazmaKontrol(ornek_de)` 7/7. Sonuç: **GEÇTİ** (düzeltme sonrası A0 B0).
