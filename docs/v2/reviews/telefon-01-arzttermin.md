# İnceleme: telefon/01-arzttermin.json
İnceleyen: dilbilimci-ajan · 2026-11-17 · Sonuç: **KAPANDI** (`review.status = reviewed`)

## Sayılar
- İncelenen madde: **183** (14 parça, 17 karşı taraf cümlesi, 8 cevap seçeneği, 28 build, 39 drill, 33 diyalog satırı, 12 rol oyunu öğesi, 21 dinleme satırı/sorusu, 4 konuşma, 1 görev, 6 mistakes_tr)
- Dil/doğallık/tutarlılık hatası: **14** → oran **%7,7**
- accepted[] eksikliği: 66 üretim maddesinin **48**'inde yaygın doğru varyant eksikti; 177 varyant eklendi (216 → 393)
- Doğru şıkkın konumu: 8 maddenin 8'inde 0. sıradaydı; yeniden dağıtıldı

## H2 gerçeklik listesi (docs/v2/agents/YAZAR.md) — eksiksiz karşılanıyor
| Madde | Durum | Yer |
|---|---|---|
| Açılışta hızlı söylenen sekreter adı; bunun isim olduğunu yakalama | var | o01, d27, v1/v3 açılışı, h1 4. soru, mistakes_tr[2] |
| Bekleme anonsu | var | o02 |
| "Sind Sie schon Patient bei uns?" | var | o03, o04, d20, d29 |
| Doğum tarihi (hızlı tarih/sayı) | var | o05, parça geburtsdatum, b07, d28, h1 ("Dritter Elfter fünfundneunzig") |
| "gesetzlich oder privat?" / "Welche Krankenkasse?" | var | o06, o07 ("Welche Kasse?" — gerçek kısa biçim; Türkçe açıklamaya "Kasse = Krankenkasse" eklendi), d05, d21, d31 |
| "Worum geht's denn?" | var | o08, d22, v1, v2 |
| Engel: üç hafta sonra | var | o09, d23, v1 |
| Engel: Akutsprechstunde, randevusuz | var | o10, d33, v2, h2 |
| Engel: yarın sabah sekizde tekrar ara | var | o11, d26, v3, h2 |
| Krankschreibung/AU; hukuki ayrıntı yalnızca kaynakla | var | parça krankschreibung, b22, v3. Hukuki iddia yok; sekreterin "işverene bugün haber verin" sözü § 5 Abs. 1 EntgFG ile uyumlu (SOURCES.md) |
| halb zehn = 9:30 (mistakes_tr) ve Viertel nach/vor | var | parça halb-zehn, d03, d04, d18, d19, d30, d39, mistakes_tr[0–1] |
| Kapanış: "Passt's Ihnen?", "Geht klar.", "Wiederhören!" | var | o12, o17, parça geht-klar, wiederhoeren |
| Hayatta kalma cümleleri: "Wie war das nochmal?", "Etwas langsamer, bitte.", "Ich buchstabiere: …" | var | üç parça, b16–b20, görev kaçış cümleleri |
| Buchstabiertafel yeni + eski | var, **doğrulandı** | b19, b20, d25, v3, konuşma 3. Kullanılan bütün kod kelimeleri (Aachen, Berlin, Düsseldorf, Essen, Goslar, Ingelheim, Köln, München, Nürnberg, Offenbach, Rostock, Völklingen, Ypsilon; Anton, Berta, Dora, Emil, Gustav, Ida, Kaufmann, Martha, Nordpol, Otto, Richard, Viktor) 17.11.2026'da https://en.wikipedia.org/wiki/DIN_5009 tablosuyla (2022 ve 1983 sütunları) karşılaştırıldı; hepsi doğru |
| otherSide ≥12, yarısı alltag, speed | var | 17 cümle, 11'i alltag, hepsinde speed |
| listening ≥6 soru, ilk soru gist | var | 7 soru |
| Bairisch yalnızca kaynaklıysa verified | uygun | Tek Bairisch girdi "Pfiat Eana!" zaten `uncertain`; "verified" iddia yok |
| Kişisel bilgi yok, adlar çeşitli | uygun | Demir, Okafor, Novak, Petrović, Huber, Lang, Meier; tarihler örnek |

## Hatalar (önce → sonra)
1–3. "Wie war das nochmal?" Türkçesi: "Nasıldı tekrar?" → "Nasıl demiştiniz?" (parça `wie-war-das.tr`, `b16.prompt_tr`, `v2` 4. B satırı tr). Birebir çeviri; Türkçede söylenmez.
4. `ch:telefon:wie-war-das.lexemes`: `lx:wiederholen` → `lx:nochmal` (cümlede wiederholen yok).
5. `ch:telefon:passt-mir.mistakes_tr`: "('Das passt ich' yanlış)" → "('Das passt mich' yanlış)". Türkçe konuşanın gerçek hatası Akkusativ kullanmaktır; "passt ich" kimsenin yapmadığı bir hata.
6–7. "Sind Sie schon Patient(in) bei uns?" Türkçesi: "Zaten (bizim) hastamız mısınız?" → "Bizim hastamız mısınız? (daha önce kaydınız var mı)" (`o03`, `v1` 3. satır).
8–11. "halb" açıklaması: "onun yarısı" → "ona yarım saat kala / ona yarım saat var" (`d03.why_tr`, `d18.why_tr`, `d39.why_tr`, `mistakes_tr[0]`). "Onun yarısı" hem "10'un yarısı = 5" hem "o'nun yarısı" diye okunuyor; açıklama yanıltıcıydı.
12. `d06.why_tr`: "'Das geht' de doğru olurdu ama 'mir' ile kalıp 'Das passt mir'dır." → "'mir' ile kalıp 'Das passt mir'dir. 'Das geht.' de 'olur' demektir ama 'Das geht mir gut' denmez." (ünlü uyumu hatası + boşluğa "geht" yazılabileceği izlenimi).
13. `listening h1` 2. satır reductions: heard "hab ich" → "hab" (cümlede "ich hab" geçiyor; duyulan biçim metinle uyuşmuyordu).
14. `listening h2` 2. satır: "ich hab hohes Fieber" için eksik reduction eklendi (hab → habe).

Küçük iyileştirmeler (hata sayılmadı): `o07.tr`'ye "Kasse = Krankenkasse" notu; parça krankschreibung'da "gelber Schein" için "(eski sarı kâğıt formdan kalma ad)".

## accepted[] eklemeleri (özet)
- En riskli eksikler: "gern/gerne" ayrımı (b01, b02, d27); doğum tarihinde "Ich bin am … geboren", "Der 12. März 1988.", yılın yazıyla/rakamla biçimleri (b07, d28); d21'de parçanın gündelik biçimi "Gesetzlich, TK." yoktu; d26 ve b25'te "morgen früh um acht nochmal/noch mal/wieder" birleşimleri; d34'te "Donnerstag Vormittag" ayrı yazımı; d20'de yalın "Ja."; d24'te "Passt." / "Ja, das passt mir."
- Kabul edilen ama dar tutulanlar: b11/d19'da "dreiviertel elf" (güney/doğu) kalıyor; b03'te "Patient" (erkek biçimi) kalıyor.

## Kalan şüpheler
- Yok. Gözlem (hata değil): `ch:telefon:geht-frueher.lexemes` = `lx:Termin` cümlede geçmiyor ama bağlam kelimesi olarak kabul edilebilir; dokunulmadı.

## Yöntem
- Dosyanın tamamı okundu (parça, karşı taraf cümlesi, cevap seçeneği, build, drill, diyalog satırı, rol oyunu, dinleme, konuşma, görev, mistakes_tr).
- accepted[] değerlendirmesi `web/src/core/grading.ts` kurallarına göre yapıldı: büyük/küçük harf, noktalama, tırnak, kesme işareti ve ümlaut yazımı yok sayılıyor; ama "nochmal / noch mal / noch einmal", "gern / gerne", "habe / hab", "Dr. / Doktor", dört haneli yılın rakamla/yazıyla yazımı ve kelime sırası ayrı varyant ister. Yapay zekâ yoksa listede olmayan doğru cevap "yanlış" sayılır; bu yüzden yaygın varyantlar eklendi. Kanonik (ilk) varyantlar korunmuştur (b13/arzt hariç, aşağıda).
- Çoktan seçmeli maddelerde (dinleme soruları, pick) doğru şık her zaman 0. sıradaydı ve oynatıcı bu şıkları karıştırmıyor (`web/src/screens/Player.tsx`, drill "pick" ve dinleme soruları `opts` dizisini olduğu gibi basıyor). Şıkların sırası dosyada değiştirildi; `ans` buna göre güncellendi (yeni dağılım: 1,2,0,1,2,0,1,0).
- Her düzeltme turundan sonra `npm run content:validate` → 0 hata; `npm test` → 83/83.

## Başka dosyada bulgular (düzeltilmedi)
- `content/v2/registry/lexemes.v1.json` `lx:buchstabieren`: level "B1" → A1/A2 olmalı (A2 senaryosunun temel kelimesi). `lx:dringend` "B1": senaryoda A2 temel kelime; seviye gözden geçirilmeli.
- `content/v2/registry/lexemes.v2.json` `lx:leider`: pos "other"; `lexicon/batch-006.json`'da "adv". Aynı kimlik iki farklı pos.
- `lx:halb`, `lx:frei`, `lx:Name`, `lx:Uhr`, `lx:anrufen`, `lx:langsam`, `lx:sprechen` hem `lexemes.v1/v2` hem sözlük partilerinde çift kayıtlı; Türkçe karşılıklar farklı (ör. `lx:frei`: "boş, müsait" / "boş, müsait; serbest; ücretsiz"). Hangisinin geçerli olduğu belirlenmeli.
- `content/v2/domains/telefon/SOURCES.md`: eski tablo "isimli biçim" diye anılıyor; Kaufmann, Nordpol, Ypsilon isim değil (bilgi notu; içerikte sorun yaratmıyor).
- `web/src/screens/Player.tsx`: şıklar karıştırılmıyor (bkz. Yöntem); telefon/02–04'te bütün `ans` = 0.
