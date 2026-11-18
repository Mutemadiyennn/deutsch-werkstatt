# Dilbilimci incelemesi: lexicon batch-001

- Tarih: 2026-11-18 · İnceleyen: dilbilimci-ajan
- Girdi: `batch-001.view.jsonl` (yazar yaması uygulanmış 100 kart) · Yama: `batch-001.dil.json`
- İncelenen kart: **100** (bütün alanlar: de, art, pl, verb, tr, level, register, domains, coll, ex, exp, mistakes_tr, img)
- Düzeltilen kart: **40** · Alan düzeyinde düzeltme: **58**
- Hata oranı: **40/100 kart (0,40)** · 0,58 düzeltme/kart
- Denetim: `lintpatch.ts` → kart 40, sorunlu 0. Yama, parti dosyasının bir kopyasına deneme olarak uygulandı (hatasız). Parti dosyasına yazılmadı; `npm run content:validate` yama birleştirilince çalıştırılmalı.

## Hatalar (önce → sonra)

### Almanca
| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:er | ex3 | Der Zug? Der kommt gleich. → Er hat's mir gestern gesagt. | Örnekte kartın kelimesi (**er**) yoktu |
| lx:ihr#2 | ex3 | Ihre Nummer hab ich nicht. → Ich hab ihre Nummer nicht. | Cümle başındaki büyük **Ihre**, karttaki "büyük harf sizin demektir" notuyla çelişiyordu |
| lx:auch | ex3 | Ja, eh, das auch noch! → Na toll, das auch noch! | "Ja, eh" bölgesel ve yapay; ünlem bu biçimde söylenmez |
| lx:und | ex1 | Ich esse und dann gehe ich. → Ich mache Kaffee und du deckst den Tisch. | Örnek, hata notundaki kuralla (und sonrası sıra değişmez) çelişiyor görünüyordu |
| lx:warum | ex1 | Warum bist du so spät? → Warum kommst du so spät? | hd katmanı için tartışmasız biçim |
| lx:bei | ex3 | Bei mir passt's gut. → Bei mir passt's. | "gut" fazlalık; konuşulan biçim kısa olanı |
| lx:vor | ex3 | Es ist fünf vor zwölf! → Es ist zehn vor acht. | Deyim (son dakika) A1 kartında yanıltıcı; düz saat örneği |
| lx:denn#2 | ex3 | alltag kısaltmalı cümle → Ich gehe jetzt, denn ich muss morgen früh aufstehen. (katman hd) | Bağlaç **denn** gündelik kısaltmalarla söylenmez; katman düzeltildi |
| lx:denn#2 | ex4 | Ich fahre mit dem Bus, denn das Auto ist kaputt. → Nein, ich bleibe hier, denn ich muss noch arbeiten. | Soruyu yineleyen yapay cevap |
| lx:unser | coll | bei uns → unsere Nachbarn | Kalıpta kartın kelimesi yoktu |
| lx:doch | coll tr | Hayır, var! / Öyle! → Hayır, tam tersine! | "Öyle!" yanlış karşılık |
| lx:bitte | ex1 | Noch einmal, bitte. → Die Rechnung, bitte. | lx:noch ex1 ile aynı cümle (döngüsüzlük) |
| lx:etwas | ex4 | Sonst noch etwas? – Nein, danke. → Ist etwas passiert? – Nein, alles gut. | lx:noch ex4 ile aynı diyalog |

### Öğrenci kimliği (ich cümlesinde sabit cinsiyet)
| Kart | Alan | Önce → Sonra |
|---|---|---|
| lx:als | ex1, ex4, mistakes[1] | Ich arbeite als Fahrer / Krankenpfleger / Koch → Mein Bruder / dein Mann / Er |
| lx:werden | ex4 | Was willst du mal werden? – Ärztin → Was will deine Tochter mal werden? |
| lx:ja | ex4 | Sind Sie Frau Kaya? – Ja, das bin ich. → Haben Sie einen Termin? – Ja, um zehn. |
| lx:mein | ex1 | Das ist meine Frau. → Das ist meine Schwester. |
| lx:Mann | ex1 | Mein Mann arbeitet bei der Post. → Annas Mann arbeitet bei der Post. |

Not: sözlük kartlarında `{…|…}` yer tutucusu hiçbir partide kullanılmıyor ve kart ekranında çözüldüğüne dair kod görmedim; bu yüzden cümleler üçüncü kişiye çevrildi.

### Türkçe çeviri
| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:ich | ex2 | kısaca yardım → bir saniye yardım | **kurz** burada süre |
| lx:sein#2 | ex4 | çok tatlı → çok iyi biri | **nett** |
| lx:sie#2 | ex3 | kısa bir vaktiniz → bir dakikanız | doğallık |
| lx:zu#2 | coll, ex1, ex2, ex4 | çok → fazla | Kartın kendi notu **zu** ile **sehr** farkını öğretiyor; çeviriler bunu bozuyordu |
| lx:finden | ex4 | çok pahalı → fazla pahalı | aynı |
| lx:auf | ex4 | İşte. → İş yerinde. | "işte" iki anlamlı |
| lx:alle | ex4 | Senin tarafta → Sende | doğallık |
| lx:kommen | ex3 | gidiyoruz → gidelim | çağrı cümlesi |
| lx:müssen | ex1 | Yarın erken → Yarın sabah | **morgen früh** |
| lx:sehen | ex4 | yarına kadar → yarın görüşürüz | **bis morgen** kelime kelime çevrilmişti |
| lx:da | ex3 | Orada haklısın → Bu konuda haklısın | kelime kelime çeviri |
| lx:geben | ex1 | faturayı → hesabı | lokanta sahnesi (görsel de garson) |
| lx:schon | ex1 | Bitirdin mi bile? → Bitirdin mi? | bozuk Türkçe; kartın notuyla uyum |
| lx:Mal | ex4 | hiç burada bulundun mu → buraya geldin mi | doğallık |
| lx:etwas | ex3 | Sana bir şeyim var → Senin için bir şeyim var | bozuk Türkçe |
| lx:wer | ex3 | Başka pasta isteyen var mı → Kim biraz daha pasta ister | **noch** yanlış bağlanmıştı |
| lx:wieder | ex1, ex4, coll | Yeniden evdeyim / yeniden formdayım / yeniden sağlıklı → Eve döndüm / toparlandım / iyileşmiş | kelime kelime çeviri |
| lx:Mann | ex2 | şefim → müdürüm | **Chef** yanlış arkadaş |
| lx:haben | tr | -si olmak → -im var | anlaşılmaz karşılık |

### exp ve mistakes_tr
| Kart | Önce → Sonra | Gerekçe |
|---|---|---|
| lx:sein#2 anlam_tr | yalnızca erkeğe ait → erkeğe ya da **das** ile söylenen birine | eksik tanım (das Kind → sein) |
| lx:ich m1 | **Komme** yanlış → Türkçede ben çoğu zaman söylenmez. Almancada **ich** söylenir | Konuşmada düşebildiği için "yanlış" demek hatalı; Türkçeye özgü neden yazıldı |
| lx:es m1 | **Regnet** yanlış → Yağmur yağıyor derken **Regnet** yetmez | aynı |
| lx:haben m1 | bağlam eklendi (Arabam var derken) | Hata cümlesi ile doğrusu örtüşmüyordu |
| lx:haben m2 | Ich habe 30 Jahre → Başım ağrıyor derken **Ich habe Kopfschmerzen** | Türkçe konuşana özgü hata değildi |
| lx:alle m2 / lx:ganz m2 | bağlam eklendi (Her gün / Bütün gün derken) | Aynı yanlış (**alle Tag**) iki kartta iki ayrı doğruyla veriliyordu |
| lx:noch m1 | oturmuyorum örneği → Henüz değil / Artık değil | ilgisiz fiil, anlaşılmaz |
| lx:tun m2 | bağlam eklendi | Hata ile doğrusu örtüşmüyordu |
| lx:Mal m2 | **jedes Mals** → **Ich bin erste Mal hier** | uydurma hata; gerçek hata yazıldı |
| lx:um m2 | **halb neun** notu → **um** tam saat, yaklaşık için **gegen** | OD-9.2 madde 4: başka kelimenin notu |
| lx:warum m1 | **Weil ich bin krank** → **Warum** sorusuna cevap **weil** ile başlar | aynı kural |
| lx:lassen m1 | Ich reparieren lasse → Tamir ettiriyorum derken **Ich repariere das Auto** yanlış | uydurma hata; Türkçedeki -tir- ekinden gelen gerçek hata |
| lx:finden m1 | bağlam eklendi (Bana göre iyi derken) | hata Türkçeden geliyor, kaynağı görünür oldu |

## Yazarın notları (doğrulama sonucu)
- lx:sagen (Was sagt das?), lx:machen (Dusche machen): Türkçeden gelen gerçek hatalar, bırakıldı.
- lx:oder ex3 (Ist kalt heute, oder?), lx:zu#2 ex2 (Wir sind zu spät): konuşulan doğru Almanca, bırakıldı.
- lx:der, lx:es, lx:mal, lx:doch, lx:los, lx:um `tr`: kabul edilebilir, değiştirilmedi (yalnızca lx:doch kalıp çevirisi düzeltildi).
- Zayıf denen görseller (lx:so, lx:auch, lx:jetzt, lx:dann, lx:ganz, lx:denken): hepsi cümlenin sahnesini gösteriyor, yanıltıcı değil; kaldırılmadı.
- lx:da ex3, lx:schon ex1, lx:sehen ex4, lx:unser, lx:und, lx:warum, lx:bei, lx:auch, lx:sein#2: doğrulandı ve düzeltildi.

## Dilbilgisi alanları
24 fiilin praesens3, perfekt, aux, case ve prep alanları; iki ismin art ve pl alanları doğru. Seviye ve register alanlarında değişiklik yok. Olgusal ya da hukuki iddia, Bairisch, kurs ya da kitap adı yok.

## Kalan şüpheler
1. **lx:denn#2:** Doğrulayıcı kart başına en az bir alltag örnek istiyor, ama bağlaç **denn** gündelik konuşmada seyrek (yerine **weil**). ex4 alltag olarak bırakıldı; kural bu kart için gevşetilmeli ya da kart yazı ağırlıklı işaretlenmeli. Karar baş geliştiricide.
2. **lx:hier ex2** (Hier ist Murat Demir): sabit adla telefon tanıtımı. Öğrencinin değil genel bir karakterin sözü sayıldı. Sözlük kartlarına yer tutucu desteği gelirse `{name}` yapılmalı.
3. **lx:bei m2:** gerçek şirket adı (Siemens) geçiyor; politika ihlali görmedim, bilgi için.
4. **lx:dass ex4** (hamilelik haberi): DN-4 kapsamında saymadım, gündelik haber.

## Sonuç
**AÇIK** (tek madde: lx:denn#2 alltag katmanı kararı). Diğer 99 kartta bilinen hata kalmadı. `review.status` "draft" kalmalı; madde 1 karara bağlanınca "reviewed" yapılabilir.

## Açık maddelerin kapanışı

Tarih: 2026-11-18. Yama: `work/batch-001.fix.json` (2 kart, lintpatch 0 sorun).

| Kart | Alan | Önce → Sonra | Gerekçe |
|---|---|---|---|
| lx:denn#2 | ö4 (alltag) | – Kommst du mit? – Nein, ich bleibe hier, denn ich muss noch arbeiten. → – Nimm lieber 'ne Jacke mit, denn abends wird's kalt. – Stimmt, danke! | Eski cümle yazı dili kokuyordu. Bağlaç **denn** konuşmada en doğal hâliyle bir öğüdün ya da ricanın gerekçesinde geçer. Önceki turdaki "gündelik kısaltmalarla söylenmez" yargım fazla katıydı, geri alıyorum. |
| lx:denn#2 | exp.ipucu_tr | (yok) → Konuşmada aynı iş için çoğu zaman **weil** duyarsın. | Öğrenci kelimenin konuşmada seyrek olduğunu bilmeli. Doğrulayıcı kuralını gevşetmeye gerek kalmadı. |
| lx:bei | mistakes_tr[1] | **in Siemens** / **bei Siemens** → **in Kerschbaum** / **bei Kerschbaum** | Gerçek şirket adı kalktı. Kerschbaum, WORLD.md içindeki kurgusal iş yeri (`pl:firma`). |

Sonuç: **KAPANDI**. Parti 001 içinde açık kart kalmadı.
