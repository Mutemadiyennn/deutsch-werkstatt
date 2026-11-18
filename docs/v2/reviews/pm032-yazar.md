# PM-032 / PM-035 — yazar teslim raporu (2026-11-18)

Kapsam: `telefon/01-arzttermin`, `essen/m1-weihnachtsmarkt`, `freizeit/m1-gluehwein-einladung`, `arbeit/m1-weihnachtsfeier` (PM-032) ve `strategie/01-nicht-verstanden` (PM-035 b). Sıradaki adım: dilbilimci, sonra okur (değişen her açıklama aşağıda kimlikle listelendi).

## 1. Ölçüt sonuçları

| Dosya | Öğretmeden isteme, `--strict` (önce → sonra) | OD-9 tarama (aykırı) | Temel kelime / ifade / kalıp | build / alıştırma |
|---|---|---|---|---|
| telefon/01-arzttermin | 39 → **0** | 0 | 20 / 15 / 6 | 28 / 39 |
| essen/m1-weihnachtsmarkt | 16 → **0** | 0 | 11 / 9 / 4 | 16 / 20 |
| freizeit/m1-gluehwein-einladung | 16 → **0** | 0 | 9 / 10 / 4 | 17 / 20 |
| arbeit/m1-weihnachtsfeier | 12 → **0** | 0 | 11 / 9 / 4 | 16 / 22 |
| strategie/01-nicht-verstanden | 24 → **0** | 43 → **0** | 20 / 14 / 5 | 28 / 38 |

- `npm run content:validate` → **0 hata** (61 uyarı; bu beş dosyada yalnızca "inceleme bekliyor (draft)").
- `npm run content:validate -- --strict` → bu beş dosyada öğretmeden isteme **0**. Kalan strict hataları başka dosyalarda (arzt/01) ve kalıp alan sayısı kuralında.
- `npm run content:explain-audit` → beş dosyanın hepsinde 0 aykırı. Not: araç `docs/v2/reports/aciklama-tarama.md` dosyasını yeniden yazdı.
- `npm test` → 102/102 geçti.
- Doğrulayıcının denetlediği build ve drill maddelerine ek olarak, bir yardımcı betikle (teach.ts'nin aynı kuralı) diyaloglardaki öğrenci satırlarını (`de`), konuşma modellerini, rol oyunu hedeflerini ve dış görev kaçış cümlelerini de taradım. Beş dosyada da kalan tek öğretilmemiş öğe freizeit `responses` o14'teki "Kinderpunsch" (bkz. §6). `responses` alanı arayüzde kullanılmıyor.

## 2. Eklenen temel öğeler (ve neden)

| Dosya | Eklenen | Neden |
|---|---|---|
| telefon | **ch:telefon:mein-name** (yeni ifade: `Grüß Gott, mein Name ist {name}.` / Alltag `Grüß Gott, {name} hier.`, exp + alltag_exp) | Aramanın ilk cümlesi. "grüß Gott" ve kendini tanıtma öğretilmeden isteniyordu (d27, diyaloglar). Öğrenci adı yalnızca yer tutucuyla. |
| telefon | ch:telefon:halb-zehn → `Am Donnerstag um halb zehn.` (gün eklendi) | Donnerstag 6 maddede gerekiyordu. Kalıp pt:um-uhr'daki "am + gün" artık ifade kartında görünüyor. |
| telefon | ch:telefon:buchstabiere Alltag → `Ich buchstabier mal: K wie Kaufmann, A wie Anton …` | D-062: iki tablo aynı kartta (Hochdeutsch DIN 5009:2022, Alltag eski isimli). |
| essen | lx:zwei, lx:bar, lx:zahlen; ch:essen:pfand-zurueck, ch:essen:stimmt-so (ek → temel) | Üç kişilik sipariş, yalnızca nakit alan stant, depozito ve bahşiş gerçek durumlar ve maddeler bunları istiyordu. |
| essen | ch:essen:mit-karte Alltag → `Nehmen S' auch Karte?` | Bulgu 2: satıcının "bringen S' / kriegen S' / Wollen S'" kısaltmaları soruluyordu ama hiçbir yerde gösterilmemişti. Artık önce bu kartın alltag_exp çipinde açıklanıyor (**Nehmen S'** → **Nehmen Sie**). |
| freizeit | lx:noch; ch:freizeit:kommst-du-mit, ch:freizeit:bis-gleich (ek → temel) | Daveti yapma ve vedalaşma; "Nein, noch nicht." cevabı. |
| arbeit | lx:bleiben, lx:hier; ch:arbeit:namen-gezogen (ek → temel) | "Ich bleibe hier." Noel'de bu öğrenci için en gerçek cevap. Wichteln'in çekirdek cümlesi de buydu ve pt:perfekt-haben'in tek somut ifadesi. |
| strategie | lx:zu#2, lx:Zahl (ek → temel) | "Das war mir zu schnell." ve "Die Zahl habe ich nicht verstanden." Bu iki strateji cümlesi 13/30 karışıklığının yerini aldı. |

Kayıtta zaten olan kelimeleri kullandım, yeni kelime önerisi gerekmedi. phases/09'daki "en fazla 8–12 yeni öğe" kuralı, doğrulayıcının izin verdiği aralıkla çelişiyor (§6/5). Bu yüzden ekleme yerine çoğunlukla sadeleştirmeyi seçtim.

## 3. Çıkarılan ya da yeniden kurulan maddeler

**telefon/01**
- build: b02 (Dr. Weber → Alltag `Ich bräuchte mal 'nen Termin.`), b03 (yer tutucu), b04 (`Nein, ich war noch nicht bei Ihnen.`), b06 (privat → `Gesetzlich, AOK.`), b10, b11 (Viertel vor elf → `Haben Sie am Donnerstag etwas frei?`), b12 (Viertel nach elf → `Geht es auch am Vormittag?`), b13 (`Das passt mir leider nicht.`), b15 (Fieber/Halsschmerzen → `Ich brauche einen Termin. Es ist dringend.`), b18 (Uhrzeit → `Könnten Sie das bitte wiederholen?`), b19, b20 (yalnızca öğretilmiş K/A kodları, iki tablo), b21 (muss mitbringen → `Geht klar, danke.`), b23 (`In Ordnung, Donnerstag um halb zehn.`), b24 (zu spät → `Geht es auch früher? Es ist dringend.`), b25 (dann rufe ich … an → Alltag `Es ist leider dringend – geht heute noch was?`), b26 (ohne Termin → `Entschuldigung, wie war das nochmal? Um halb zehn?`), b28 (Akutsprechstunde → kapanış cümlesi).
- drills: d03, d04 (gap → pick: Viertel nach elf yalnızca anlama), d05 (privat → versichert), d10 ve d11 (yeni sıralama), d15 (→ Alltag dönüşümü `Geht klar, danke.`), d17 (accepted[0] = kartta gösterilen `Geht's auch eher?`), d19 (Viertel → Könnten Sie), d20, d21 (TK → AOK), d22 (belirti → aciliyet), d23, d25 (Demir → K/A), d26 (accepted[0] `In Ordnung, vielen Dank.`), d27, d28 (kartın örnek tarihi), d29, d30 (Dienstag halb neun → Donnerstag halb zehn), d32 (accepted[0] `In Ordnung, vielen Dank.`), d33 (wann → tekrar iste), d34, d35, d36 (→ `Grüß Gott, mein Name ist {name}.`), d37, d38.
- Diyaloglar v1–v3: öğrenci satırları öğretilmiş öğelerle yeniden kuruldu. Belirti, kelime kelime harf kodlama ve "Chef Bescheid sagen" çıkarıldı. v1'de saat Mittwoch halb vier → Donnerstag halb zehn. v3'te sekreter ikinci kez yavaş konuşuyor.
- Karşı taraf: o10 `Wenn's akut ist,` çıkarıldı. Dinleme h2: `Kommen S'` → `Kommen Sie`, `rufen S'` → `rufen Sie` (S' telefon/01'de gösterilmiyor). Rol oyunu düzey 3 stili: "Kommen S'" → "geht's".
- speaking 1–4, responses (o03, o08, o09, o12), rol oyunu targets (+ `Grüß Gott, mein Name ist {name}.`), görev kaçış cümlesi `Moment, ich schreibe mit.` çıkarıldı. goal_tr: "şikâyet" → "neden arıyorsunuz".

**essen/m1**: b06 (gebrannten → `Was kosten die Mandeln?`), b08 ve d14 (+ Nehmen S'), b11 ve d12 (`Kostet die Tasse Pfand?`), b14 (behalten → Alltag `Ich bring die Tasse zurück.`), b15 (Senf → `Einmal Bratwurst, bitte.`), b16 (wie viel war → `Entschuldigung, was heißt Pfand?`), d05 (`Ich zahle ___.`), d11, d18 (Wo ist der Stand nebenan → `Entschuldigung, was heißt das?`). Diyaloglar v1–v3 (behalten/drei Euro dalı çıkarıldı, yerine Pfand zurück), responses (o04, o07, o12), speaking 1–2, kaçış cümleleri, rol oyunu düzey 2 stili.

**freizeit/m1**: b08 (sechs Uhr → `Passt dir halb sechs?`), b09 (wenn-cümlesi → `Ja, gern! Wann und wo treffen wir uns?`), b11 (noch nie getrunken → `Ich habe Plätzchen gegessen.`), b13 (Einladung → Alltag `Klar, bin dabei!`), b14 (erster Advent → `Heute kann ich leider nicht. Geht's auch morgen?`), b15 (gebacken → `Hast du schon Plätzchen gemacht?`), d05 (`Ich komme ___.` mit), d08, d13, d15, d16, d17, d18. Diyaloglar: v1 (also, selbst gebacken, Kerze anzünden ve Prost satırı çıkarıldı), v2 (hätte Zeit ve Einladung çıkarıldı). responses o04/o08/o14, speaking 1–2, kaçış cümleleri.

**arbeit/m1**: b05 (wo → Alltag `Ich hab schon gezogen.`), b07 (ab halb sieben → Alltag `Danke, ich bin dabei!`), b08 (tarih → `Ich bleibe hier. Und du?`), b11 (→ `Hast du schon einen Namen gezogen?`), d08, d11, d16 (darf kosten → Alltag `Da kann ich leider nicht.`). Diyaloglar: v1 (natürlich, alles klar, eigentlich, frage ich ihn), v2 (keiner weiß von wem, trage mich ein, klingt super), v3 (Essen ist super; ayrıca "Schöne Feiertage" ve "seit fünf Minuten" satırları çıkarıldı). responses o02/o03/o06, speaking 1–2, kaçış cümleleri.

**strategie/01** (PM-035 b): b08, b09 (dieses → das Wort), b10 ve b13 (prompt), b17 (sehr → zu), b19 (man → Alltag `Schreiben Sie's mir kurz auf?`), b21 (bis/ab → `Haben Sie „Montag“ gesagt?`), b22 (letzten Teil → `Entschuldigung, das Wort kenne ich nicht.`), b23 (dreizehn/dreißig → `Die Zahl habe ich nicht verstanden. Könnten Sie mir das bitte aufschreiben?`), b24 (Moment → `Nochmal, bitte?`), b25 (kannst → Alltag), b27 (klar → `Danke, jetzt verstehe ich.`), b28 ve d03 ve d18 (Frist → Kaution), d12 (man → einfacher sagen), d16 (du → Würden Sie), d17 (instr: "Perfekt" terimi çıkarıldı), d24–d26, d28–d30, d32, d34 (wenn → `Ein bisschen langsamer, bitte. Ich lerne noch Deutsch.`), d35, d37 (Englisch → `Nein, lieber auf Deutsch, bitte.`). Diyaloglar v1–v3 yeniden kuruldu (Kundenkarte, Tasche, sayılar, Formular, Geduld çıkarıldı). speaking 2–4, responses o08/o11/o14.

## 4. Yer tutucu düzeltmeleri (D-061)

- telefon: ch:telefon:schon-patient hd `Patientin` → `{Patient|Patientin}` (ve exp.ne_zaman_tr). Etkilenen maddeler: b03, d20 (prompt + accepted), d35, responses o03, karşı taraf o03, v1 A2 `Sind Sie schon {Patient|Patientin} bei uns?`.
- telefon diyaloglarında öğrenci adları `Demir` (v1), `Okafor` (v2) ve `Novak` (v3) → `{name}`. speaking[0] model_de'deki `Demir` → `{name}`.
- telefon: d25 "Soyadın Demir", b19 "Adını (Kaya)" ve b20 "Adını (Berg)" kaldırıldı. Harf kodlama artık açıkça "alıştırma: K ve A" olarak soruluyor.
- Advent dosyalarında sabit ad ya da cinsiyet yoktu (arbeit zaten `{name}` kullanıyordu). strategie'de de yok.
- Dinleme metinlerindeki "Patient/Patientin" konuşmacıları ve Petrović başka arayanlar, öğrenci değil. Değiştirilmedi.

## 5. Okur için: değişen ya da yeni açıklamalar (kimlik)

**telefon/01**
- ch:telefon:mein-name.exp, .alltag_exp (yeni, bütün alanlar)
- ch:telefon:schon-patient.exp.ne_zaman_tr, .alltag_exp.ipucu_tr
- ch:telefon:geht-frueher.alltag_exp.parcalar, .alltag_exp.ipucu_tr ('s kısaltması)
- ch:telefon:wie-war-das.exp.ipucu_tr (İngilizceye atıf kaldırıldı)
- ch:telefon:passt-mir.exp.ipucu_tr
- ch:telefon:buchstabiere.alltag_exp (bütün alanlar)
- ch:telefon:halb-zehn.exp.anlam_tr, .exp.parcalar, .alltag_exp.anlam_tr, .alltag_exp.parcalar; tr
- drills: d04.why_tr, d05.why_tr, d10.why_tr, d11.why_tr

**essen/m1**
- ch:essen:einen-gluehwein.alltag_exp (yeni), ch:essen:mit-karte.alltag_exp (yeni), ch:essen:tasse-zurueck.alltag_exp (yeni), ch:essen:pfand-zurueck.exp + .alltag_exp (yeni), ch:essen:stimmt-so.exp + .alltag_exp (yeni)
- d05.why_tr

**freizeit/m1**
- ch:freizeit:bin-dabei.alltag_exp, ch:freizeit:heute-nicht.alltag_exp, ch:freizeit:geht-auch-morgen.alltag_exp, ch:freizeit:kommst-du-mit.exp + .alltag_exp, ch:freizeit:bis-gleich.exp (hepsi yeni)
- d05.why_tr, d08.why_tr

**arbeit/m1**
- ch:arbeit:komme-gern.alltag_exp, ch:arbeit:muss-absagen.alltag_exp, ch:arbeit:namen-gezogen.exp + .alltag_exp (hepsi yeni)
- d08.why_tr

**strategie/01**
- 14 temel ifadenin hepsinde exp + alltag_exp yeni. use_tr kaldırıldı. tr değişenler: was-heisst (`Pardon, Kaution ne demek?`), was-meinen (`Kaminkehrer derken neyi kastediyorsunuz?`), nur-verstanden (`Sadece Montag'ı anladım.`) (PM-035 a)
- Yeniden yazılan chunk mistakes_tr: nicht-verstanden[0], wie-bitte[0], aufschreiben[0]
- Yeniden yazılan senaryo mistakes_tr: [0]–[5]
- why_tr: d01, d07, d12, d35, d38
- ch:strategie:dialekt.exp.ipucu_tr S' kısaltmasını açıklıyor (o04 ve d25'teki `Haben S'` için)

## 6. Açık sorular / baş geliştiriciye

1. **Kendi adını harf harf söyleme:** İçerik, öğrencinin adının harflerini bilemez. Bu yüzden alıştırmalar yalnızca öğretilmiş K/A kodlarını istiyor. Öneri: cihazdaki addan DIN 5009 tablosuyla otomatik bir madde üretilsin (web).
2. **Doğum tarihi:** ifade kartında örnek tarih sabit (12.03.1988). Öğrencinin kendi tarihini söyleyebilmesi için sıra sayıları ve ay adları gerekiyor. Bunun için bir köprü dersi lazım.
3. **Yer tutucuların seslendirilmesi:** `personalizeDeep` bütün metinlere `showText` uyguluyor. Profilde hitap ya da ad yoksa cihaz sesi "Patient/Patientin" ya da "(adın)" diye okuyabilir. Ses yolunda `speakText` kullanılmalı (web).
4. **Stage12:** ifadenin Alltag katmanı varsa Hochdeutsch çipleri gösterilmiyor (yalnızca alltag_exp çipleri). teach.ts ise exp.parcalar'ı da sayıyor. Çipler ifadenin kendi kelimeleri olduğu için sonuç değişmiyor, ama bilinmesinde yarar var.
5. **phases/09 "en fazla 8–12 yeni öğe" ile doğrulayıcı aralıkları** (tam senaryo: 12–20 kelime + 8–15 ifade) çelişiyor. telefon/01'de 35 temel öğe var. Karar baş geliştiricide.
6. **Belirti cümleleri** (Halsschmerzen, Fieber) telefon/01 üretiminden çıkarıldı. WORLD hafta 3 boğaz ağrısıyla başlıyor. arzt/01 telefon/01'den önce geliyorsa `requires: ["sc:arzt:01-beschwerden"]` eklenebilir (sıra kararı).
7. **`Nehmen S' auch Karte?`** (essen Alltag) güney Almancası gündelik biçimi. Bu turda ek kaynak doğrulayamadım; dilbilimci bakmalı. Kaynak notu essen/SOURCES.md'de güncellendi.
8. **Advent dosyaları** içerik değiştiği için `review.status: "draft"` yapıldı ve `okur`/`okur_at` alanları kaldırıldı. Önceki inceleme notu korundu.
9. freizeit `responses` o14'te "Kinderpunsch" freizeit'ta öğretilmiyor. Alan arayüzde kullanılmadığı için bırakıldı.
10. Dış görev `escape_de` listeleri o senaryoda öğretilmiş cümlelerle sınırlandı. Örneğin "Etwas langsamer, bitte." yalnızca telefon ve strategie'de var.
