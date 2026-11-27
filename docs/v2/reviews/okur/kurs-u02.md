# Okur raporu: kurs-u02 · 10. hafta (64.–70. gün) ve kart partisi a2-k02

Tarih: 2026-11-27 · okur (OD-9.3) · tek tam tur · taş: M1

## Sonuç

**GERİ (96 madde).** Okunan açıklama: **1630** · GEÇTİ: **1534** · GERİ: **96**. Ek olarak kapsam dışı `hint_tr` alanlarında 6 bulgu (sayıya katılmadı).

| dosya | okunan | GEÇTİ | GERİ | durum |
|---|---|---|---|---|
| `content/v2/m1/dn-10.json` | 78 | 62 | 16 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-64.json` | 208 | 191 | 17 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-65.json` | 199 | 186 | 13 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-66.json` | 230 | 229 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-67.json` | 201 | 199 | 2 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-68.json` | 210 | 192 | 18 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-69.json` | 174 | 167 | 7 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-70.json` | 169 | 163 | 6 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/hafta-sonu-testi-10.json` | 18 | 17 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gorulmemis-10.json` | 16 | 15 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/registry/lexicon/batch-a2-k02.json` | 127 | 113 | 14 | **reviewed sayılamaz** (OD-9.4) |

GERİ nedenleri: `…` sembolü **25** · terim (artikel, ad, çoğul, ek, kök, şimdiki zaman/biçim) **42** · terim **fiil / asıl fiil** **15** · 14 kelimeyi aşan cümle **5** · anlam, belirsizlik, çelişki **9**.

## Kapsam ve yöntem

- Gün dosyaları (`gun-64` … `gun-70`, `hafta-sonu-testi-10`, `gorulmemis-10`): alanlar betikle toplanıp tek tek okundu: `title_tr`, `goal_tr`, `can_do.tr`, `ortam_tr`, `sahne_tr`, `durum_tr`, `situation_tr`, `q_tr`, Türkçe `opts`, `why_tr`, `geri_bildirim_tr`, `kapanis_tr`, `gorev_tr`, `kontrol_tr`, `instr_tr`.
- Sayılmadı ama okundu: kalıp satırlarının, görev cümlelerinin, sahne/ses/prova satırlarının ve okuma metinlerinin Türkçe çevirileri (`tr`, `metin_tr`), dikte şıkları ve Almanca şıklar. Çevirilerde bir satır bozuk çıktı; o satır GERİ olarak sayıya eklendi (`gun-70` h1 sahnesi).
- `dn-10.json`: 8 kaydın her biri için `h_tr`, `tr` (cümle cümle), tablo başlığı (tek satır) ve Türkçe sütun hücreleri. Örnek cümle çevirileri (`ex[].tr`) okundu, sorun yok.
- `batch-a2-k02.json` (21 kart): `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar`, `exp.ipucu_tr`, `mistakes_tr`. Boşluk ipuçları (`forms[].hint_tr`, 66 alan) görevde istenmedi; okundu, bulgular ayrı bölümde, sayıya katılmadı.
- Her soru, şık ve geri bildirim Almanca satırla, doğru cevapla ve `accepted` listesiyle karşılaştırıldı.
- Betikle tarama: `=`, `;` ve tırnak içinde Almanca yok (`dn:10-dtz-ilan` içindeki `'hiçbiri'` Türkçe, geçti). `…` ve 14 kelimeyi aşan cümleler aşağıda.

### Okurken verdiğim kararlar (baş geliştirici değiştirebilir)

1. `…` kalın Almanca kalıbın içinde de GERİ sayıldı (OD-9.2 md. 2; `ic5-hafta-06.md` ile aynı ölçü). Hepsi tek düzeltmeyle çözülür: üç nokta yerine gerçek bir örnek kelime.
2. **artikel**, **ad** (isim anlamında), **çoğul**, **ek**, **kök**, **şimdiki zaman / şimdiki biçim** terim sayıldı. **artikel** m1 gün dosyalarında ve dil noktalarında hiç öğretilmedi; ilk kez bu hafta geçiyor. **çoğul** ve **ek** önceki okur raporlarında da terim sayıldı (`a1-hafta-07.md`, `lexicon-batch-009.md`).
3. **fiil** ve **asıl fiil** ayrı kategori (F, 15 madde). Önceki raporlar ikiye ayrılmış: `gun-45`…`gun-49` turunda GERİ, `ic5-hafta-06.md` turunda görev tanımı gereği bare **fiil** sayılmadı. Bu görevde istisna verilmediği için GERİ yazdım. **asıl fiil** ise ikinci bir dilbilgisi kavramı gerektiriyor; istisna verilse bile kalmalı. Bare **fiil** istisnası geri gelirse düşecek maddeler: F kategorisindeki ve içinde yalnız **fiil** geçenler (`gun-68` o21, `gun-69` o17, `gun-70` a1/kontrol[2]/s7, `hafta-sonu-testi-10` t07).
4. **biçim** tek başına terim sayılmadı (`dn-02` de kullanıyor, örnekle hemen açılıyor).
5. Türkçe metinde **Kursleiterin** (gün 68–69) GERİ sayılmadı: kart 67. günde öğretildi, kişi adı gibi okunuyor. Not aşağıda.
6. İki kısa cümleli `why_tr` alanları, ikisi de ekrandaki cevabı anlatıyorsa geçti (5.–6. hafta ölçüsü). `goal_tr` içinde etkinlik sıralamak geçti.
7. Kart `mistakes_tr` maddelerinde yanlış göstermeyen ama tek fikirli bilgi satırları geçti; iki fikri birleştirenler GERİ.

## Dil noktaları (dn-10): kendi sözlerimle

Soru: bu dil noktası ne öğretiyor, ben ne yapacağım? Yalnız ekrandaki kutuya bakarak.

- **`dn:10-modal-praeteritum`** (Geçmişte: konnte, musste, durfte, wollte): Geçmişte "yapabildim, zorundaydım, izin vardı, istedim" demek için können, müssen, dürfen, wollen kısa hâle girer: üstteki noktalar düşer (wollen'de zaten yok), araya -te- girer, sonra kime göre sonu değişir (du konntest, wir konnten). ich ile er aynı: konnte. İkinci iş sözü cümlenin sonuna gider. Ben ne yapacağım: dün ve eskiden için kann yerine konnte, muss yerine musste diyeceğim, tablodan kişiye göre sonu seçeceğim. **Karar:** GERİ (3 satır, aşağıda)
- **`dn:10-gut-koennen`** (Neyi iyi yapıyorsun: Ich kann gut …): Neyi iyi yaptığımı Ich kann gut kochen diye söylerim; biraz yapıyorsam ein bisschen, iyi değilse nicht so gut. Deneyimimi Ich habe Erfahrung mit ile söylerim. Eskiyle bugünü karşılaştırırken önce konnte, sonra kann. Ne yapacağım: işte ya da görüşmede güçlü yanımı bu kalıplarla söyleyeceğim. **Karar:** GERİ (3 satır, aşağıda)
- **`dn:10-beruf-wunsch`** (Meslek isteği: Ich möchte … werden): Ne olmak istediğimi Ich möchte Koch werden diye söylerim, werden en sonda. Meslekten önce ein yok: Ich bin Fahrer. İş ararken Ich suche eine Stelle als Fahrer. Çocukken istediğimi Als Kind wollte ich ... werden. Ne yapacağım: meslek isteğimi, işimi ve aradığım işi bu kalıplarla söyleyeceğim. **Karar:** GERİ (2 satır, aşağıda)
- **`dn:10-hilfe`** (Yardım istemek, yardım önermek): Yardım isterken Kannst du mir helfen?, yabancıya Können Sie mir bitte helfen? derim. Yardım önerirken Soll ich dir helfen? ya da Kann ich Ihnen helfen?. Önce Hast du kurz Zeit? demek kibar. Ne yapacağım: arkadaşa du, yabancıya Sie ile yardım isteyip önereceğim. **Karar:** GEÇTİ
- **`dn:10-modal-tuzak`** (Dört tuzak: geçmişte doğru biçim): Dört sık yanlış: dün derken kann bırakmak (doğrusu konnte), du ile sonu unutmak (durftest), ihr ile sonu -tet yapmak (konntet), müssen'deki çift s'yi düşürmek (mussten). Ne yapacağım: geçmiş cümlemde bu dört noktayı kontrol edeceğim. **Karar:** GERİ (2 satır, aşağıda)
- **`dn:10-ung`** (-ung ile biten adlar: hep die): Birçok sözün sonuna -ung gelince yeni bir kelime olur (üben, die Übung); bunların hepsi die alır, birden çok için -en gelir. Ne yapacağım: -ung ile biten kelimeye die diyeceğim. (Bunu tablodan ve örnekten anladım; metnin kendisi terimlerle yazılmış.) **Karar:** GERİ (6 satır, aşağıda)
- **`dn:10-ses-o-u`** (Ses: o ile u): o derken ağız yuvarlak ve biraz açık, u derken dudaklar öne, ağız dar. konnte ile musste bu yüzden farklı duyulur. Ne yapacağım: önce dinleyip sonra çiftleri (Koch, Kuchen) arka arkaya söyleyeceğim. **Karar:** GEÇTİ
- **`dn:10-dtz-ilan`** (Sınav görevi: kime hangi ilan?): Sınavda kişileri ve ilanları okuyup her kişiye uyan ilanı bulurum; bir kişiye hiçbiri uymaz. Önce kişinin isteğindeki saat, gün, yer, para sözlerini bulur, ilanda aynısını ararım; her şeyi anlamam gerekmez. Ne yapacağım: tablodaki eşleşmeleri (nur vormittags ile Arbeitszeit gibi) arayacağım. **Karar:** GEÇTİ

Sekiz kaydın sekizini de kendi sözlerimle doğru anlatabildim; üçü GEÇTİ, beşi terim ve `…` yüzünden GERİ. En ağır kayıt `dn:10-ung`: metnin dört cümlesinin dördü de terimle (fiil, ad, ek, çoğul) yazılmış, anlamı yalnız tablodan ve örnekten çıkarabildim.

## GERİ dönenler

Biçim: dosya · yer · metin · kendi sözlerimle · neden · öneri (öneri yalnız fikir verir; düzeltmeyi yazar ya da dilbilimci yapar). Kategori: S sembol, T terim, F fiil/asıl fiil, U uzunluk, A anlam.

1. [S] `gun-64.json` · `.sahne.bolumler[b1].cevapla.why_tr` · «Geçmişteki işini **Früher habe ich … gearbeitet** ile söylersin.» · Kendi sözlerimle: Eski işimi Früher habe ich ile söylerim, üç noktaya bir yer koyarım. · **Neden:** `…` sembolü. · **Öneri:** Geçmişteki işini **Früher habe ich in einer Fabrik gearbeitet** gibi söylersin.
2. [S] `gun-64.json` · `.sesler[m1:64:a2].bolumler[b1].cevapla.why_tr` · «Saati **um sechs Uhr** ile söylersin. **fängt … an** ile başlama saatini verirsin.» · Kendi sözlerimle: Saati um sechs Uhr ile söylerim; bir de fängt ile an arasında bir şey var. · **Neden:** `…` sembolü; iki ayrı bilgi. · **Öneri:** Başlama saatini **fängt um sechs Uhr an** ile söylersin.
3. [S] `gun-64.json` · `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` · «Eski işini **Früher habe ich … gearbeitet** ile söyledin.» · Kendi sözlerimle: Eski işimi Früher habe ich gearbeitet ile söyledim. · **Neden:** `…` sembolü. · **Öneri:** Eski işini **Früher habe ich in einer Fabrik gearbeitet** ile söyledin.
4. [T] `gun-64.json` · `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` · «Mesleği artikelsiz söyledin: **Ich war Koch**.» · Kendi sözlerimle: Mesleği bilmediğim bir şey olmadan söyledim. · **Neden:** Terim: **artikel** (m1'de öğretilmedi). · **Öneri:** Meslekten önce **ein** demedin: **Ich war Koch**.
5. [S] `gun-64.json` · `.prova.dugumler[n1].secenekler[3].geri_bildirim_tr` · «Derya eskiyi soruyor. Geçmiş için **Früher habe ich … gearbeitet** de.» · Kendi sözlerimle: Derya eskiyi soruyor, Früher habe ich gearbeitet demeliyim. · **Neden:** `…` sembolü. · **Öneri:** Derya eskiyi soruyor. **Früher habe ich in einer Fabrik gearbeitet** de.
6. [T] `gun-64.json` · `.prova.dugumler[n2].secenekler[3].geri_bildirim_tr` · «Bu şimdiki zaman. Eskisi için **ich musste** dersin.» · Kendi sözlerimle: Bu bir tür zamanmış; eskisi için ich musste derim. · **Neden:** Terim: **şimdiki zaman**. · **Öneri:** Bu bugün için. Eskisi için **ich musste** dersin.
7. [S] `gun-64.json` · `.prova.dugumler[n4].secenekler[1].geri_bildirim_tr` · «Taşındığını **Ich bin … umgezogen** ile söyledin.» · Kendi sözlerimle: Taşındığımı Ich bin umgezogen ile söyledim. · **Neden:** `…` sembolü. · **Öneri:** Taşındığını **Ich bin nach Wendlfing umgezogen** ile söyledin.
8. [S] `gun-64.json` · `.prova.dugumler[n4].secenekler[2].geri_bildirim_tr` · «**Ich wollte … versuchen**: asıl fiil yine sonda.» · Kendi sözlerimle: Ich wollte ile versuchen; bir şey sonda duruyor. · **Neden:** `…` sembolü; terim: **asıl fiil**. · **Öneri:** **Ich wollte es hier versuchen**: **versuchen** yine sonda.
9. [T] `gun-64.json` · `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` · «Bugünü şimdiki zamanla anlattın: **sind**.» · Kendi sözlerimle: Bugünü bir zamanla anlattım, sind ile. · **Neden:** Terim: **şimdiki zaman**. · **Öneri:** Bugünü **sind** ile anlattın.
10. [S] `gun-64.json` · `.okuma_yazma.sorular[m1:64:o5].why_tr` · «Önce yeri söyle: **Früher habe ich … gearbeitet**. Sonra **Ich musste …** ekle.» · Kendi sözlerimle: Önce yeri Früher habe ich gearbeitet ile, sonra Ich musste ile söylerim. · **Neden:** `…` sembolü (iki yerde). · **Öneri:** Önce yeri söyle: **Früher habe ich im Lager gearbeitet**. Sonra **Ich musste früh aufstehen** ekle.
11. [S] `gun-64.json` · `.okuma_yazma.yazma.kontrol_tr[0]` · «Eski işini **Früher habe ich … gearbeitet** ile yazdın mı?» · Kendi sözlerimle: Eski işimi Früher habe ich gearbeitet ile yazdım mı? · **Neden:** `…` sembolü. · **Öneri:** Eski işini **Früher habe ich** ve **gearbeitet** ile yazdın mı?
12. [T] `gun-64.json` · `.okuma_yazma.yazma.kontrol_tr[2]` · «Bugün için **heute** ile şimdiki zamanı yazdın mı?» · Kendi sözlerimle: Bugünü heute ve bir zamanla yazdım mı? · **Neden:** Terim: **şimdiki zaman**. · **Öneri:** Bugün için **Heute arbeite ich im Lager** gibi bir cümle yazdın mı?
13. [S] `gun-64.json` · `.gun_sinavi.maddeler[m1:64:s4].why_tr` · «**fängt … an**: **an** en sona gider.» · Kendi sözlerimle: fängt ile an arasında bir şey var, an sona gidiyor. · **Neden:** `…` sembolü. · **Öneri:** **fängt** ikinci yerde, **an** en sonda.
14. [T] `gun-64.json` · `.gun_sinavi.maddeler[m1:64:s8].why_tr` · «**als Kellner** ile hangi iş olduğunu söylersin. Artikel yok.» · Kendi sözlerimle: als Kellner ile işimi söylerim; bir de bilmediğim bir şey yok. · **Neden:** Terim: **Artikel**. · **Öneri:** **als Kellner** ile hangi iş olduğunu söylersin. Önünde **ein** yok.
15. [S] `gun-64.json` · `.gun_sinavi.maddeler[m1:64:s9].why_tr` · «Geçmişteki işi **Früher habe ich … gearbeitet** ya da **Früher war ich …** ile söylersin.» · Kendi sözlerimle: Eski işimi iki yoldan biriyle söylerim. · **Neden:** `…` sembolü (iki yerde); cümle 15 kelime. · **Öneri:** Eski işi **Früher habe ich im Lager gearbeitet** gibi söylersin.
16. [T] `gun-64.json` · `.gun_sinavi.maddeler[m1:64:s10].why_tr` · «Kendin için **ich konnte** dersin, sonu ek almaz.» · Kendi sözlerimle: Kendim için ich konnte derim, sonuna bir şey gelmez. · **Neden:** Terim: **ek**. · **Öneri:** Kendin için **ich konnte** dersin, sona harf eklenmez.
17. [S] `gun-64.json` · `.gun_sinavi.maddeler[m1:64:s11].why_tr` · «Önce yer: **Früher habe ich … gearbeitet**. Sonra zorunluluk: **Ich musste …**.» · Kendi sözlerimle: Önce yeri, sonra zorunluluğu söylerim. · **Neden:** `…` sembolü (iki yerde). · **Öneri:** Önce yer: **Früher habe ich im Lager gearbeitet**. Sonra **Ich musste früh aufstehen**.
18. [S] `gun-65.json` · `.goal_tr` · «Şefine neyi iyi yaptığını **Ich kann gut …** ile söylersin. Nasıl çalıştığını **zuverlässig**, **fleißig**, **hilfsbereit** gibi kelimelerle anlatırsın.» · Kendi sözlerimle: Şefe neyi iyi yaptığımı Ich kann gut ile, nasıl çalıştığımı sıfatlarla söylerim. · **Neden:** `…` sembolü. · **Öneri:** **Ich kann gut kochen** gibi gerçek bir örnek.
19. [S] `gun-65.json` · `.sahne.bolumler[b2].cevapla.why_tr` · «Önce **Ich kann gut …**, sonra **Ich bin …** ile nasıl çalıştığını söylersin.» · Kendi sözlerimle: Önce Ich kann gut, sonra Ich bin derim. · **Neden:** `…` sembolü (iki yerde). · **Öneri:** Önce **Ich kann gut kochen**, sonra **Ich bin fleißig** gibi söylersin.
20. [S] `gun-65.json` · `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` · «**Ich kann gut …** ile güçlü yanını söyledin.» · Kendi sözlerimle: Ich kann gut ile güçlü yanımı söyledim. · **Neden:** `…` sembolü. · **Öneri:** **Ich kann gut mit dem Computer arbeiten** ile güçlü yanını söyledin.
21. [S] `gun-65.json` · `.prova.kapanis_tr` · «Şefine güçlü yanlarını söyledin: **Ich kann gut …**, **Ich bin zuverlässig**, **Das schaffe ich**.» · Kendi sözlerimle: Şefe güçlü yanlarımı üç sözle söyledim. · **Neden:** `…` sembolü. · **Öneri:** Şefine güçlü yanlarını söyledin: **Ich kann gut kochen**, **Ich bin zuverlässig**, **Das schaffe ich**.
22. [S] `gun-65.json` · `.okuma_yazma.sorular[m1:65:o5].why_tr` · «Önce **Ich kann gut …**, sonra **Ich bin …** ile kendini tanıtırsın.» · Kendi sözlerimle: Önce Ich kann gut, sonra Ich bin ile kendimi tanıtırım. · **Neden:** `…` sembolü (iki yerde). · **Öneri:** Önce **Ich kann gut kochen**, sonra **Ich bin zuverlässig** gibi.
23. [S] `gun-65.json` · `.okuma_yazma.yazma.kontrol_tr[0]` · «Bir güçlü yanını **Ich kann gut …** ile yazdın mı?» · Kendi sözlerimle: Bir güçlü yanımı Ich kann gut ile yazdım mı? · **Neden:** `…` sembolü. · **Öneri:** Bir güçlü yanını **Ich kann gut** ile yazdın mı?
24. [S] `gun-65.json` · `.okuma_yazma.yazma.kontrol_tr[1]` · «Nasıl biri olduğunu **Ich bin …** ile yazdın mı?» · Kendi sözlerimle: Nasıl biri olduğumu Ich bin ile yazdım mı? · **Neden:** `…` sembolü. · **Öneri:** Nasıl biri olduğunu **Ich bin** ile yazdın mı?
25. [F] `gun-65.json` · `.okuma_yazma.yazma.kontrol_tr[2]` · «Asıl fiil cümlenin sonunda mı: **Ich kann gut kochen**?» · Kendi sözlerimle: Bir şey cümlenin sonunda mı? Örnek Ich kann gut kochen. · **Neden:** Terim: **asıl fiil**. · **Öneri:** **kochen** gibi iş sözü cümlenin sonunda mı: **Ich kann gut kochen**?
26. [S] `gun-65.json` · `.gun_sinavi.maddeler[m1:65:s5].why_tr` · «Nasıl biri olduğunu **Ich bin …** ile söylersin.» · Kendi sözlerimle: Nasıl biri olduğumu Ich bin ile söylerim. · **Neden:** `…` sembolü. · **Öneri:** Nasıl biri olduğunu **Ich bin zuverlässig** gibi söylersin.
27. [S] `gun-65.json` · `.gun_sinavi.maddeler[m1:65:s8].why_tr` · «İyi yapamadığın şey için **Ich kann nicht so gut …** dersin.» · Kendi sözlerimle: İyi yapamadığım şey için Ich kann nicht so gut derim. · **Neden:** `…` sembolü. · **Öneri:** İyi yapamadığın şey için **Ich kann nicht so gut kochen** gibi dersin.
28. [F] `gun-65.json` · `.gun_sinavi.maddeler[m1:65:s9].why_tr` · «**Ich kann gut** ve en sonda asıl fiil: **Ich kann gut kochen**.» · Kendi sözlerimle: Ich kann gut, en sonda bir şey: kochen. · **Neden:** Terim: **asıl fiil**. · **Öneri:** **Ich kann gut** ve en sonda **kochen**.
29. [S] `gun-65.json` · `.gun_sinavi.maddeler[m1:65:s10].why_tr` · «Eskisi **konnte**, bugünü **kann**: **Früher konnte ich …, heute kann ich …**.» · Kendi sözlerimle: Eskisi konnte, bugünü kann. · **Neden:** `…` sembolü (iki yerde). · **Öneri:** **Früher konnte ich nicht gut Deutsch, heute kann ich ein bisschen.**
30. [S] `gun-65.json` · `.gun_sinavi.maddeler[m1:65:s11].why_tr` · «Önce **Ich kann gut …**, sonra **Ich bin …** ya da **Ich arbeite gern im Team**.» · Kendi sözlerimle: Önce Ich kann gut, sonra Ich bin ya da Ich arbeite gern im Team. · **Neden:** `…` sembolü (iki yerde). · **Öneri:** Önce **Ich kann gut kochen**, sonra **Ich arbeite gern im Team**.
31. [F] `gun-66.json` · `.okuma_yazma.sorular[m1:66:o10].why_tr` · «**Ich möchte** derken asıl fiil **arbeiten** en sona gider.» · Kendi sözlerimle: Ich möchte derken bir şey, arbeiten, en sona gider. · **Neden:** Terim: **asıl fiil**. · **Öneri:** **Ich möchte** derken **arbeiten** en sona gider.
32. [F] `gun-67.json` · `.sahne.bolumler[b1].cevapla.why_tr` · «**Ich möchte** derken asıl fiil **machen** en sona gider.» · Kendi sözlerimle: Ich möchte derken bir şey, machen, en sona gider. · **Neden:** Terim: **asıl fiil**. · **Öneri:** **Ich möchte** derken **machen** en sona gider.
33. [A] `gun-67.json` · `.okuma_yazma.sorular[m1:67:o6].why_tr` · «**kann** geçmişte **konnte** olur. Noktalar düşer, araya **te** girer.» · Kendi sözlerimle: kann geçmişte konnte olur. Noktalar düşer diyor ama kann'da nokta yok; anlamadım. · **Neden:** Belirsiz: ekrandaki sözcük **kann**, düşecek nokta yok. · **Öneri:** **kann** geçmişte **konnte** olur. **a** yerine **o**, araya **te** girer.
34. [T] `gun-68.json` · `.goal_tr` · «Akşam kursunda eskiyle ilgili bir alıştırma var. Geçmişi anlatırken en sık yapılan dört yanlışı tanır, doğrusunu söylersin. -ung ile biten adları **die** ile kullanır, **o** ile **u** sesini ayırırsın.» · Kendi sözlerimle: Kursta eski günler alıştırması; dört yanlışı tanırım; -ung ile biten bir şeyleri die ile kullanırım; o ile u'yu ayırırım. · **Neden:** Terim: **ad** (isim anlamında). · **Öneri:** **-ung** ile biten kelimeleri **die** ile kullanır, **o** ile **u** sesini ayırırsın.
35. [T] `gun-68.json` · `.halkalar[m1:68:h2].title_tr` · «-ung ile biten adlar: anlam, fikir, danışma» · Kendi sözlerimle: -ung ile biten bir şeyler: anlam, fikir, danışma. · **Neden:** Terim: **ad**. · **Öneri:** -ung ile biten kelimeler: anlam, fikir, danışma
36. [F] `gun-68.json` · `.sahne.bolumler[b1].cevapla.why_tr` · «Eskiyi **konnte** ile, bugünü **kann** ile söylersin. Asıl fiil en sona gider.» · Kendi sözlerimle: Eskiyi konnte, bugünü kann ile söylerim; bir şey en sona gider. · **Neden:** Terim: **asıl fiil**. · **Öneri:** Eskiyi **konnte**, bugünü **kann** ile söylersin: **Heute kann ich schwimmen.**
37. [A] `gun-68.json` · `.sesler[m1:68:a1].bolumler[b1].cevapla.why_tr` · «Hasta birine **Gute Besserung** dersin. Göstermek **zeigen** olur, **dir** ona demektir.» · Kendi sözlerimle: Hastaya Gute Besserung derim. Göstermek zeigen; dir ona demek. Ama ben Derya'ya sana göstereyim diyorum, kafam karıştı. · **Neden:** Üç bilgi tek kutuda; **dir ona demektir** yanlış okunuyor (Derya'ya konuşuyorsun, **dir** burada sana). · **Öneri:** Hasta birine **Gute Besserung** dersin. **Ich zeige dir** sana gösteririm demek.
38. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o6].why_tr` · «Geçmişte **will** kalmaz. **wollte** olur: noktasız kök, araya **-te-** girer.» · Kendi sözlerimle: Geçmişte will kalmaz, wollte olur; noktasız bir şey, araya -te-. · **Neden:** Terim: **kök**; **noktasız** belirsiz (**will**'de de **wollen**'de de nokta yok). · **Öneri:** Geçmişte **will** kalmaz, **wollte** olur: **woll** ve araya **-te-**.
39. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o9].why_tr` · «**du** ile son **-st** gelir: **du konntest**. Ek unutulmaz.» · Kendi sözlerimle: du ile sona -st gelir: du konntest. Bir şey unutulmaz. · **Neden:** Terim: **ek**. · **Öneri:** **du** ile son **-st** gelir: **du konntest**. Sonu unutma.
40. [F] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o19].why_tr` · «Zorunluluğu **musste**, isteği **wollte** ile söylersin. Asıl fiil en sona gider.» · Kendi sözlerimle: Zorunluluğu musste, isteği wollte ile; bir şey en sona. · **Neden:** Terim: **asıl fiil**. · **Öneri:** Zorunluluğu **musste**, isteği **wollte** ile söylersin: **Ich musste arbeiten.**
41. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o20].q_tr` · «Hangi artikel? ___ Meinung» · Kendi sözlerimle: Hangi ... ? Bilmediğim bir sözcük soruyor; şıklar der, die, das. · **Neden:** Terim: **artikel**. · **Öneri:** **der**, **die** ya da **das**? ___ Meinung
42. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o20].why_tr` · «**-ung** ile biten adlar hep **die** alır.» · Kendi sözlerimle: -ung ile biten bir şeyler die alır. · **Neden:** Terim: **ad**. · **Öneri:** **-ung** ile biten kelimeler hep **die** alır.
43. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o21].q_tr` · «Hangi artikel? ___ Beratung» · Kendi sözlerimle: Hangi ...? (bilmediğim sözcük) · **Neden:** Terim: **artikel**. · **Öneri:** **der**, **die** ya da **das**? ___ Beratung
44. [F] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o21].why_tr` · «**beraten** fiilinden **die Beratung**. **-ung** hep **die**.» · Kendi sözlerimle: beraten bir şeyden die Beratung; -ung hep die. · **Neden:** Terim: **fiil**. · **Öneri:** **beraten** danışmak, **die Beratung** danışma. **-ung** hep **die**.
45. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o22].q_tr` · «Hangi artikel? ___ Weiterbildung» · Kendi sözlerimle: Hangi ...? (bilmediğim sözcük) · **Neden:** Terim: **artikel**. · **Öneri:** **der**, **die** ya da **das**? ___ Weiterbildung
46. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o23].instr_tr` · «Fiilden **-ung** ile ad yap, artikeliyle yaz.» · Kendi sözlerimle: Bir şeyden -ung ile bir şey yap, bir şeyiyle yaz. Ne yapacağımı bilmiyorum. · **Neden:** Üç terim: **fiil**, **ad**, **artikel**. · **Öneri:** **erklären** sözünün sonuna **-ung** ekle, önüne **die** yaz.
47. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o23].why_tr` · «**erklären** fiilinin kökü **erklär**, sonuna **-ung** gelir: **die Erklärung**.» · Kendi sözlerimle: erklären'in bir parçası erklär, sonuna -ung: die Erklärung. · **Neden:** Terimler: **fiil**, **kök**. · **Öneri:** **erklären** sözünden **en** düşer, **-ung** gelir: **die Erklärung**.
48. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o24].instr_tr` · «Fiilden **-ung** ile ad yap, artikeliyle yaz.» · Kendi sözlerimle: Bir şeyden -ung ile bir şey yap, bir şeyiyle yaz. · **Neden:** Üç terim: **fiil**, **ad**, **artikel**. · **Öneri:** **üben** sözünün sonuna **-ung** ekle, önüne **die** yaz.
49. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o24].why_tr` · «**üben** fiilinin kökü **üb**, sonuna **-ung**: **die Übung**.» · Kendi sözlerimle: üben'in bir parçası üb, sonuna -ung: die Übung. · **Neden:** Terimler: **fiil**, **kök**. · **Öneri:** **üben** sözünden **en** düşer, **-ung** gelir: **die Übung**.
50. [T] `gun-68.json` · `.okuma_yazma.sorular[m1:68:o25].why_tr` · «**beraten** fiilinden ad: **die Beratung**.» · Kendi sözlerimle: beraten bir şeyden bir şey: die Beratung. · **Neden:** Terimler: **fiil**, **ad**. · **Öneri:** **beraten** danışmak, **die Beratung** danışma.
51. [F] `gun-68.json` · `.gun_sinavi.maddeler[m1:68:s10].why_tr` · «Çocukluğunu **Als Kind konnte ich** ile anlatırsın. Asıl fiil sonda.» · Kendi sözlerimle: Çocukluğu Als Kind konnte ich ile anlatırım; bir şey sonda. · **Neden:** Terim: **asıl fiil**. · **Öneri:** Çocukluğunu **Als Kind konnte ich** ile anlatırsın: **gut schwimmen** sonda.
52. [U] `gun-69.json` · `.can_do.tr` · «Kısa iş ve kurs ilanlarında bir kişiye uygun olanı bulurum, kendimi ve iş geçmişimi birkaç cümleyle anlatırım.» · Kendi sözlerimle: İlanlarda bir kişiye uyanı bulurum ve kendimi anlatırım. · **Neden:** Cümle 17 kelime; iki ayrı iş. · **Öneri:** İki cümle: **Kısa ilanlarda bir kişiye uygun olanı bulurum.** **Kendimi ve eski işimi anlatırım.**
53. [A] `gun-69.json` · `.prova.durum_tr` · «Kursta danışma saati. Kursleiterin seninle konuşuyor. İşin, ne zaman öğrenebildiğin ve ne istediğin hakkında soru soruyor. Sonunda iş için Almanca kursu hakkında bilgi al: ne zaman başlıyor, sonunda ne var?» · Kendi sözlerimle: Öğretmen işimi, ne zaman öğrenebildiğimi ve ne istediğimi soruyor. Ne zaman öğrenebildiğim ne demek, anlamadım. · **Neden:** Belirsiz: **ne zaman öğrenebildiğin** prova sorularıyla örtüşmüyor (sorular: eskiden ne yaptın, neyi iyi yapabiliyorsun, ne istiyorsun). · **Öneri:** İşini, neyi iyi yapabildiğini ve ne istediğini soruyor.
54. [T] `gun-69.json` · `.prova.dugumler[n2].secenekler[2].geri_bildirim_tr` · «**Früher** ile şimdiki biçim olmaz. **Früher habe ich in einer Fabrik gearbeitet** dersin.» · Kendi sözlerimle: Früher ile bir biçim olmaz; doğrusunu söylüyor. · **Neden:** Terim: **şimdiki biçim**. · **Öneri:** **Früher** ile **arbeite** olmaz. **Früher habe ich in einer Fabrik gearbeitet** dersin.
55. [A] `gun-69.json` · `.okuma_yazma.sorular[m1:69:o7].why_tr` · «**Letzte Woche** geçmiştir. **kann** değil **konnte**: noktalar düşer, **-te-** girer.» · Kendi sözlerimle: kann değil konnte; noktalar düşer diyor ama kann'da nokta yok. · **Neden:** Belirsiz: **kann**'da düşecek nokta yok. · **Öneri:** **Letzte Woche** geçmiştir. **kann** değil **konnte**: **a** yerine **o**, araya **-te-**.
56. [T] `gun-69.json` · `.okuma_yazma.sorular[m1:69:o16].q_tr` · «Hangi artikel? ___ Bewerbung» · Kendi sözlerimle: Hangi ...? (bilmediğim sözcük) · **Neden:** Terim: **artikel**. · **Öneri:** **der**, **die** ya da **das**? ___ Bewerbung
57. [F] `gun-69.json` · `.okuma_yazma.sorular[m1:69:o17].why_tr` · «**erklären** fiilinden **die Erklärung**.» · Kendi sözlerimle: erklären bir şeyden die Erklärung. · **Neden:** Terim: **fiil**. · **Öneri:** **erklären** açıklamak, **die Erklärung** açıklama.
58. [U] `gun-69.json` · `.okuma_yazma.yazma.gorev_tr` · «Pazartesi kursta kendini kısaca tanıtacaksın. Söyleyeceklerini yaz: kimsin, eskiden ne yaptın, ne yapmak zorundaydın, bugün ne yapıyorsun, neyi iyi yaparsın, ne istiyorsun? Altı sekiz cümle.» · Kendi sözlerimle: Kendimi tanıtan altı sekiz cümle yazacağım, altı soruya cevap. · **Neden:** İkinci cümle 17 kelime. · **Öneri:** Soruları ikiye böl: **Kimsin, eskiden ne yaptın, ne yapmak zorundaydın?** **Bugün ne yapıyorsun, neyi iyi yaparsın, ne istiyorsun?**
59. [F] `gun-70.json` · `.sesler[m1:70:a1].bolumler[b1].cevapla.why_tr` · «Zamanı başa koyarsan fiil hemen arkasından gelir: **Am Samstag kann ich**.» · Kendi sözlerimle: Zamanı başa koyarsam bir şey hemen arkasından gelir: Am Samstag kann ich. · **Neden:** Terim: **fiil**. · **Öneri:** Zamanı başa koyarsan **kann** hemen arkasından gelir: **Am Samstag kann ich**.
60. [U] `gun-70.json` · `.prova.durum_tr` · «Deneme süren bitiyor. Wimmer Bey seni odasına çağırdı. Başlangıcını, bugün neyi iyi yaptığını anlat, fazla mesai sorusuna cevap ver ve bir isteğini söyle.» · Kendi sözlerimle: Deneme sürem bitiyor; şef çağırdı; dört şey söyleyeceğim. · **Neden:** Son cümle 15 kelime. · **Öneri:** İki cümle: **Başlangıcını ve bugün neyi iyi yaptığını anlat.** **Fazla mesai sorusuna cevap ver, bir isteğini söyle.**
61. [U] `gun-70.json` · `.prova.kapanis_tr` · «Şefinle deneme süresinin sonunu konuştun. Başlangıcı **konnte** ve **musste** ile, bugünü **kann gut** ile anlattın, fazla mesaiye cevap verdin ve bir eğitim istedin.» · Kendi sözlerimle: Şefle konuştum; başlangıcı konnte, musste ile, bugünü kann gut ile anlattım, mesaiye cevap verdim, eğitim istedim. · **Neden:** İkinci cümle 18 kelime. · **Öneri:** İkiye böl: **Başlangıcı konnte ve musste ile, bugünü kann gut ile anlattın.** **Fazla mesaiye cevap verdin ve bir eğitim istedin.**
62. [F] `gun-70.json` · `.okuma_yazma.yazma.kontrol_tr[2]` · «Zamanla başlayan cümlede fiil ikinci yerde mi? **Am Samstag kann ich**» · Kendi sözlerimle: Zamanla başlayan cümlede bir şey ikinci yerde mi? · **Neden:** Terim: **fiil**. · **Öneri:** Zamanla başlayan cümlede **kann** ikinci yerde mi? **Am Samstag kann ich**
63. [F] `gun-70.json` · `.gun_sinavi.maddeler[m1:70:s7].why_tr` · «Bugün için **kann gut**. Zaman başta olunca fiil ikinci yerde kalır.» · Kendi sözlerimle: Bugün için kann gut; zaman başta olunca bir şey ikinci yerde. · **Neden:** Terim: **fiil**. · **Öneri:** Bugün için **kann gut**. **Heute** başta olunca **kann** ikinci yerde kalır.
64. [A] `gun-70.json` · `.halkalar[m1:70:h1].sahne.satirlar[2].tr` · «Almanca, başarırsın! Çalışkansın ve güvenilirsin.» · Kendi sözlerimle: Almanca... başarırsın? Neden Almanca diyor, anlamadım. · **Neden:** Anlamsız satır. Almancası da tuhaf: **Auf Deutsch, du schaffst das!** (dilbilimciye). · **Öneri:** Almanca satır düzelince: **Başarırsın!**
65. [F] `hafta-sonu-testi-10.json` · `.maddeler[m1:70:t07].why_tr` · «Danışma **die Beratung**, **beraten** fiilinden gelir. **-ung** hep **die**.» · Kendi sözlerimle: Danışma die Beratung; beraten bir şeyden gelir; -ung hep die. · **Neden:** Terim: **fiil**. · **Öneri:** Danışma **die Beratung**, **beraten** danışmak demek. **-ung** hep **die**.
66. [U] `gorulmemis-10.json` · `.durumlar[m1:h10:g7].durum_tr` · «Molada bir iş arkadaşı, kızının yalnız öğleden önce çalışabildiğini ve iş aradığını söylüyor. Stadler fırınının camındaki ilanı biliyorsun: dükkânda yarım gün, pazartesiden cumaya, altıdan on bire, deneyim gerekmiyor. Ona anlat.» · Kendi sözlerimle: İş arkadaşının kızına fırındaki ilanı anlatacağım: yarım gün, hafta içi, altıdan on bire, deneyimsiz. · **Neden:** İkinci cümle 15 kelime. · **Öneri:** **Stadler fırınının camında bir ilan var.** **Dükkânda yarım gün, pazartesiden cumaya, altıdan on bire.** **Deneyim gerekmiyor.**
67. [T] `dn-10.json` · `dn:10-modal-praeteritum · tr#6` · «Üç: kişinin eki gelir: du konntest, wir konnten.» · Kendi sözlerimle: Üç: kişiye göre sona bir şey gelir, du konntest, wir konnten. · **Neden:** Terim: **ek** (kişinin eki). · **Öneri:** Üç: kişiye göre sonu değişir: **du konntest**, **wir konnten**.
68. [T] `dn-10.json` · `dn:10-modal-praeteritum · tr#7` · «ich ile er, sie, es aynıdır ve ek almaz: ich konnte, er konnte.» · Kendi sözlerimle: ich ile er aynı, sonlarına bir şey gelmez. · **Neden:** Terim: **ek**. · **Öneri:** **ich** ile **er, sie, es** aynıdır, sona harf gelmez.
69. [F] `dn-10.json` · `dn:10-modal-praeteritum · tr#8` · «Asıl fiil değişmez, cümlenin en sonuna gider: Ich musste früh aufstehen.» · Kendi sözlerimle: Bir şey değişmez ve en sona gider: aufstehen. · **Neden:** Terim: **asıl fiil**. · **Öneri:** İkinci iş sözü değişmez, en sona gider: **Ich musste früh aufstehen.**
70. [S] `dn-10.json` · `dn:10-gut-koennen · h_tr` · «Neyi iyi yapıyorsun: Ich kann gut …» · Kendi sözlerimle: Neyi iyi yaptığını Ich kann gut ile söylemek. · **Neden:** `…` sembolü. · **Öneri:** Neyi iyi yapıyorsun: Ich kann gut kochen
71. [F] `dn-10.json` · `dn:10-gut-koennen · tr#2` · «Asıl fiil yine en sondadır: Ich kann gut kochen.» · Kendi sözlerimle: Bir şey yine en sonda: kochen. · **Neden:** Terim: **asıl fiil**. · **Öneri:** **kochen** yine en sondadır: **Ich kann gut kochen.**
72. [S] `dn-10.json` · `dn:10-gut-koennen · tr#4` · «Deneyimini söylemek için Ich habe Erfahrung mit … kalıbını kullanırsın.» · Kendi sözlerimle: Deneyimi Ich habe Erfahrung mit ile söylerim. · **Neden:** `…` sembolü. · **Öneri:** Deneyimini **Ich habe Erfahrung mit Kunden** gibi söylersin.
73. [S] `dn-10.json` · `dn:10-beruf-wunsch · h_tr` · «Meslek isteği: Ich möchte … werden» · Kendi sözlerimle: Meslek isteği: Ich möchte ... werden. · **Neden:** `…` sembolü. · **Öneri:** Meslek isteği: Ich möchte Koch werden
74. [T] `dn-10.json` · `dn:10-beruf-wunsch · tr#2` · «Meslek adının önüne artikel gelmez: Ich bin Fahrer.» · Kendi sözlerimle: Meslek adının önüne bilmediğim bir şey gelmez. · **Neden:** Terim: **artikel**. · **Öneri:** Meslekten önce **ein** gelmez: **Ich bin Fahrer.**
75. [T] `dn-10.json` · `dn:10-modal-tuzak · tr#2` · «Bir: geçmişi anlatırken şimdiki biçim kalır.» · Kendi sözlerimle: Bir: geçmişi anlatırken bir biçim kalıyor (örnekten: kann kalıyor). · **Neden:** Terim: **şimdiki biçim**. · **Öneri:** Bir: geçmişi anlatırken **kann** kalır.
76. [T] `dn-10.json` · `dn:10-modal-tuzak · tr#4` · «İki: kişinin eki unutulur.» · Kendi sözlerimle: İki: kişiye göre bir şey unutuluyor. · **Neden:** Terim: **ek** (kişinin eki). · **Öneri:** İki: sondaki **-st** unutulur.
77. [T] `dn-10.json` · `dn:10-ung · h_tr` · «-ung ile biten adlar: hep die» · Kendi sözlerimle: -ung ile biten bir şeyler, hep die. · **Neden:** Terim: **ad**. · **Öneri:** -ung ile biten kelimeler: hep die
78. [T] `dn-10.json` · `dn:10-ung · tr#1` · «Birçok fiilden -ung ekiyle ad yapılır: üben, die Übung.» · Kendi sözlerimle: Bir şeylerden -ung ile bir şey yapılır: üben, die Übung. · **Neden:** Üç terim: **fiil**, **ek**, **ad**. · **Öneri:** Birçok sözün sonuna **-ung** gelir, yeni bir kelime olur: **üben**, **die Übung**.
79. [T] `dn-10.json` · `dn:10-ung · tr#2` · «Bu adların hepsi die alır.» · Kendi sözlerimle: Bunların hepsi die alır. · **Neden:** Terim: **ad**. · **Öneri:** Bu kelimelerin hepsi **die** alır.
80. [T] `dn-10.json` · `dn:10-ung · tr#3` · «Çoğulu -en ile yapılır: die Übung, die Übungen.» · Kendi sözlerimle: Bir hâli -en ile yapılır: Übungen. · **Neden:** Terim: **çoğul**. · **Öneri:** Birden çok için **-en** gelir: **die Übungen**.
81. [T] `dn-10.json` · `dn:10-ung · tr#4` · «Fiili biliyorsan adı da tahmin edebilirsin.» · Kendi sözlerimle: Birini biliyorsan ötekini tahmin edersin. · **Neden:** Terimler: **fiil**, **ad**. · **Öneri:** **üben**'i biliyorsan **die Übung**'u da tahmin edersin.
82. [T] `dn-10.json` · `dn:10-ung · table.head` · «fiil · ad (hep die) · anlamı» · Kendi sözlerimle: Sütunlar: bir şey · bir şey (hep die) · anlamı. · **Neden:** Terimler: **fiil**, **ad**. · **Öneri:** iş sözü · -ung kelimesi (hep die) · anlamı
83. [T] `batch-a2-k02.json` · `lx:Computer · exp.anlam_tr` · «**der Computer** bilgisayardır, çoğulu da **die Computer** olur.» · Kendi sözlerimle: Computer bilgisayar; bir de bir hâli de die Computer oluyor. · **Neden:** İki fikir (anlam + birden çok hâli); terim: **çoğul**. · **Öneri:** **der Computer** bilgisayardır.
84. [T] `batch-a2-k02.json` · `lx:Computer · mistakes_tr[2]` · «Çoğulda sona ek gelmez: **zwei Computers** değil, **zwei Computer**.» · Kendi sözlerimle: Bir hâlde sona bir şey gelmez: zwei Computer. · **Neden:** Terimler: **çoğul**, **ek**. · **Öneri:** İki bilgisayar **zwei Computer** olur, **zwei Computers** değil.
85. [T] `batch-a2-k02.json` · `lx:Koch · mistakes_tr[1]` · «Çoğulda **o** harfi **ö** olur: **der Koch**, **die Köche**. Kadın aşçı **die Köchin**.» · Kendi sözlerimle: Bir hâlde o, ö olur: die Köche. Kadın aşçı die Köchin. · **Neden:** İki fikir; terim: **çoğul**; yanlış değil, bilgi. · **Öneri:** Birden çok aşçı **die Köche** olur, **o** harfi **ö** olur.
86. [T] `batch-a2-k02.json` · `lx:Fahrer · mistakes_tr[2]` · «Kadın şoför **die Fahrerin** olur. Çoğulda sona ek gelmez: **die Fahrer**.» · Kendi sözlerimle: Kadın şoför die Fahrerin; bir hâlde sona bir şey gelmez: die Fahrer. · **Neden:** İki fikir; terimler: **çoğul**, **ek**; ipucu_tr ile aynı bilgi. · **Öneri:** Birden çok şoför **die Fahrer** olur, sonu değişmez.
87. [A] `batch-a2-k02.json` · `lx:Stellenanzeige · mistakes_tr[1]` · «İlana başvurmak derken **zu der Anzeige** yanlış. Doğrusu **sich auf eine Stellenanzeige bewerben**.» · Kendi sözlerimle: İlana başvururken zu der Anzeige yanlış; doğrusu sich auf eine Stellenanzeige bewerben. Yanlış olan tam ne, hangi sözle? · **Neden:** Belirsiz: yanlış biçim yarım (iş sözü yok), doğrusuyla yan yana konamıyor. · **Öneri:** **sich zu der Anzeige bewerben** yanlış. Doğrusu **sich auf die Anzeige bewerben**.
88. [T] `batch-a2-k02.json` · `lx:Teilzeit · mistakes_tr[1]` · «**in der Teilzeit** demeyiz. Artikelsiz söylenir: **in Teilzeit arbeiten**.» · Kendi sözlerimle: in der Teilzeit denmez; bilmediğim bir şey olmadan söylenir. · **Neden:** Terim: **artikel** (artikelsiz). · **Öneri:** **in der Teilzeit** denmez. **in Teilzeit arbeiten** dersin.
89. [T] `batch-a2-k02.json` · `lx:Vollzeit · mistakes_tr[1]` · «**Vollzeit** artikelsiz söylenir: **Ich suche eine Stelle in Vollzeit**.» · Kendi sözlerimle: Vollzeit bilmediğim bir şeysiz söylenir. · **Neden:** Terim: **artikel**; yanlış biçim de gösterilmiyor. · **Öneri:** **in der Vollzeit** denmez. **eine Stelle in Vollzeit** dersin.
90. [T] `batch-a2-k02.json` · `lx:Pflegerin · mistakes_tr[1]` · «Erkek bakıcı **der Pfleger**, kadın bakıcı **die Pflegerin**, çoğulu **die Pflegerinnen** olur.» · Kendi sözlerimle: Erkek bakıcı der Pfleger, kadın die Pflegerin, bir hâli die Pflegerinnen. · **Neden:** İki fikir; terim: **çoğul**; yanlış değil. · **Öneri:** Erkek bakıcı **der Pfleger** olur.
91. [T] `batch-a2-k02.json` · `lx:Weiterbildung · mistakes_tr[0]` · «**-ung**'lu adlar hep **die** alır. Bu yüzden **die Weiterbildung** denir.» · Kendi sözlerimle: -ung ile biten bir şeyler hep die alır. · **Neden:** Terim: **ad**. · **Öneri:** **-ung** ile biten kelimeler hep **die** alır: **die Weiterbildung**.
92. [A] `batch-a2-k02.json` · `lx:Sprachkurs · exp.ipucu_tr` · «Kursa gitmek **einen Sprachkurs machen** diye söylenir.» · Kendi sözlerimle: Kursa gitmek einen Sprachkurs machen. Ama aynı kartın boşluk ipucu kursa gitmek zum Sprachkurs gehen diyor, yanlışlar listesi de Ich gehe zum Sprachkurs doğru diyor. Hangisi? · **Neden:** Çelişki: aynı kartta **kursa gitmek** iki ayrı kalıba bağlanıyor (`forms[2].hint_tr`, `mistakes_tr[1]`). · **Öneri:** Kurs yapmak **einen Sprachkurs machen** diye söylenir.
93. [A] `batch-a2-k02.json` · `lx:Kursleiterin · exp.ipucu_tr` · «Öğretmene adıyla seslenirsin: **Frau Becker**.» · Kendi sözlerimle: Öğretmene adıyla seslenirim: Frau Becker. Kursleiterin kelimesiyle bağı ne? · **Neden:** Kelimenin kendisini değil hitabı anlatıyor; **Kursleiterin** ile bağ kurulmamış; `mistakes_tr[0]` ile aynı bilgi. · **Öneri:** Kursta öğretmenden söz ederken **die Kursleiterin** dersin.
94. [T] `batch-a2-k02.json` · `lx:Beratung · mistakes_tr[0]` · «**-ung**'lu adlar hep **die** alır. Bu yüzden **die Beratung** denir.» · Kendi sözlerimle: -ung ile biten bir şeyler hep die alır. · **Neden:** Terim: **ad**. · **Öneri:** **-ung** ile biten kelimeler hep **die** alır: **die Beratung**.
95. [T] `batch-a2-k02.json` · `lx:Abschluss · mistakes_tr[2]` · «Çoğulda **u** harfi **ü** olur: **die Abschlüsse**.» · Kendi sözlerimle: Bir hâlde u, ü olur: die Abschlüsse. · **Neden:** Terim: **çoğul**. · **Öneri:** Birden çok için **die Abschlüsse** olur, **u** harfi **ü** olur.
96. [A] `batch-a2-k02.json` · `lx:Erfahrung · mistakes_tr[1]` · «**Erfahrung von Küche** yanlış. Doğrusu **Erfahrung in der Küche**, insanlarla **Erfahrung mit Kunden**.» · Kendi sözlerimle: Erfahrung von Küche yanlış; doğrusu in der Küche; insanlarla mit Kunden. İkinci kısım sıkışık. · **Neden:** İki fikir (in ve mit) tek kutuda; **insanlarla** ile **Kunden** (müşteri) eşleşmiyor. · **Öneri:** **Erfahrung von Küche** yanlış. Doğrusu **Erfahrung in der Küche**.

### Kapsam dışı ek bulgular: kart boşluk ipuçları (`hint_tr`)

Sayıya katılmadı; kart `reviewed` olmadan önce bunlara da bakılmalı.

1. `batch-a2-k02.json` · `lx:Koch · forms[1].hint_tr` · «Çoğulu **die Köche** olur.» · Kendi sözlerimle: Bir hâli die Köche. · **Neden:** Terim: **çoğul**. · **Öneri:** Birden çok aşçı **die Köche** olur.
2. `batch-a2-k02.json` · `lx:Teilzeit · forms[2].hint_tr` · «Artikelsiz söylenir: **in Teilzeit**.» · Kendi sözlerimle: Bilmediğim bir şeysiz söylenir: in Teilzeit. · **Neden:** Terim: **artikel**. · **Öneri:** Yarı zamanlı **in Teilzeit** olur.
3. `batch-a2-k02.json` · `lx:Vollzeit · forms[2].hint_tr` · «Artikelsiz söylenir: **in Vollzeit**.» · Kendi sözlerimle: Bilmediğim bir şeysiz söylenir: in Vollzeit. · **Neden:** Terim: **artikel**. · **Öneri:** Tam zamanlı **in Vollzeit** olur.
4. `batch-a2-k02.json` · `lx:Pflegerin · forms[2].hint_tr` · «Çoğulu **die Pflegerinnen** olur.» · Kendi sözlerimle: Bir hâli die Pflegerinnen. · **Neden:** Terim: **çoğul**. · **Öneri:** Birden çok bakıcı **die Pflegerinnen** olur.
5. `batch-a2-k02.json` · `lx:Weiterbildung · forms[2].hint_tr` · «**-ung** ile biten kelime **die** alır: **eine Weiterbildung**.» · Kendi sözlerimle: -ung ile biten kelime die alır: eine Weiterbildung. Boşluğa die mi eine mi? · **Neden:** Belirsiz: ipucu **die** diyor, boşluk **eine** istiyor. · **Öneri:** Bir ek eğitim derken **eine Weiterbildung** dersin.
6. `batch-a2-k02.json` · `lx:Sprachkurs · forms[2].hint_tr` · «Kursa gitmek **zum Sprachkurs gehen** olur.» · Kendi sözlerimle: Kursa gitmek zum Sprachkurs gehen. Kartın ipucu machen diyordu. · **Neden:** Çelişki: `exp.ipucu_tr` ile. · **Öneri:** İpucu düzelince bu satır kalabilir.

## Sayılmayan ama göze çarpanlar (yazar/dilbilimci için bilgi, karar değil)

- **Kursleiterin** Türkçe metinde çevrilmeden geçiyor (`gun-68`, `gun-69`: başlık, ortam, sahne, soru, durum; ses çevirisinde **Kursleiterin hasta.**). 67. gün aynı kişiye **kurs öğretmeni** diyor, `gun-69` a1 çevirisi de **kurs öğretmeniniz**. Yorgun okurda **Kursleiterin'in**, **Kursleiterin'e** takılıyor. Tek dilde birleştirmek iyi olur.
- `gun-70` h1 sahnesi: Almanca satır **Auf Deutsch, du schaffst das!** tuhaf; Türkçesi bu yüzden anlamsız (GERİ 1 madde). Dilbilimciye.
- `dn:10-dtz-ilan` hiçbir ilan uymayınca **hiçbiri** seçilir diyor; `gun-69` şıklarında bu seçenek **keine Anzeige** (Almanca), `gun-66`'da **Hiçbiri**. Öğrenci aynı şeyi iki adla görüyor.
- `dn:10-beruf-wunsch` **als** için yalnız iş ararken diyor; tablo **Ich arbeite als …** da gösteriyor. Okununca anlaşılıyor, geçti.
- `dn:10-hilfe` soru **kann ya da können ile başlar** diyor, örnek **Kannst**. Okununca anlaşılıyor, geçti.
- `gorulmemis-10` g2: durum Pichler Bey'i **apartman görevlisi** diye tanıtıyor, `why_tr` **yaşlı komşu** diyor. Küçük, geçti.
- `gun-69` h1 başlığı **Şefler, okul, ilanlar** diyor; halkadaki kelime **Studium** (üniversite). Küçük, geçti.
- Kart `lx:Praktikum` boşluk cümleleri **machte**, **bekam** kullanıyor; bu hafta öğretilen geçmiş yalnız **konnte, musste, durfte, wollte**. Kapsam dışı, dilbilimciye bilgi.
- `gun-67` s6 `why_tr` kursa gitmeyi **einen Sprachkurs machen** diye veriyor; `accepted` **Ich gehe zum Sprachkurs** da kabul ediyor. Kendi başına anlaşılıyor, geçti; ama kartın çelişkisiyle (GERİ, `lx:Sprachkurs`) birlikte düzeltilmeli.

## Karar

**GERİ (96 madde).** `dn-10.json`, yedi gün dosyasının yedisi, `hafta-sonu-testi-10.json`, `gorulmemis-10.json` ve `batch-a2-k02.json` içinde en az bir GERİ var; bu dosyaların hiçbiri düzeltilip bu maddeler yeniden okunmadan "reviewed" sayılamaz (OD-9.4). 96 maddenin 25'i `…`; 42'si terim (artikel/ad/çoğul/ek/kök/şimdiki zaman), 15'i fiil/asıl fiil. Anlam düzeyindeki 9 madde (A) önce ele alınmalı: `gun-68` a1 (**dir ona**), `gun-67` o6 ve `gun-69` o7 (**kann**'da nokta yok), `gun-69` prova durumu, `gun-70` h1 sahne satırı, kartta `Sprachkurs` çelişkisi, `Stellenanzeige`, `Kursleiterin`, `Erfahrung`.

## Ek: okunan bütün alanlar

GEÇTİ satırlarında kendi sözlerim yazılmadı: anlattığım şey açıklamanın kendisiyle aynıydı. GERİ satırlarındaki kendi sözlerim yukarıda.

### `content/v2/m1/dn-10.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `dn:10-modal-praeteritum · h_tr` | Geçmişte: konnte, musste, durfte, wollte | GEÇTİ |
| 2 | `dn:10-modal-praeteritum · tr#1` | Geçmişi anlatırken können, müssen, dürfen ve wollen çoğunlukla bu kısa biçimle kullanılır. | GEÇTİ |
| 3 | `dn:10-modal-praeteritum · tr#2` | Üç adım var. | GEÇTİ |
| 4 | `dn:10-modal-praeteritum · tr#3` | Bir: noktalar düşer, können konn- olur, müssen muss- olur, dürfen durf- olur. | GEÇTİ |
| 5 | `dn:10-modal-praeteritum · tr#4` | wollen'de nokta yok, woll- olur. | GEÇTİ |
| 6 | `dn:10-modal-praeteritum · tr#5` | İki: araya -te- girer: konnte. | GEÇTİ |
| 7 | `dn:10-modal-praeteritum · tr#6` | Üç: kişinin eki gelir: du konntest, wir konnten. | **GERİ** (Terim: **ek** (kişinin eki)) |
| 8 | `dn:10-modal-praeteritum · tr#7` | ich ile er, sie, es aynıdır ve ek almaz: ich konnte, er konnte. | **GERİ** (Terim: **ek**) |
| 9 | `dn:10-modal-praeteritum · tr#8` | Asıl fiil değişmez, cümlenin en sonuna gider: Ich musste früh aufstehen. | **GERİ** (Terim: **asıl fiil**) |
| 10 | `dn:10-modal-praeteritum · table.head` | kim · können · müssen · dürfen · wollen | GEÇTİ |
| 11 | `dn:10-gut-koennen · h_tr` | Neyi iyi yapıyorsun: Ich kann gut … | **GERİ** (`…` sembolü) |
| 12 | `dn:10-gut-koennen · tr#1` | Neyi iyi yaptığını söylerken kann ile gut birlikte gelir. | GEÇTİ |
| 13 | `dn:10-gut-koennen · tr#2` | Asıl fiil yine en sondadır: Ich kann gut kochen. | **GERİ** (Terim: **asıl fiil**) |
| 14 | `dn:10-gut-koennen · tr#3` | Biraz yapabiliyorsan ein bisschen, iyi yapamıyorsan nicht so gut dersin. | GEÇTİ |
| 15 | `dn:10-gut-koennen · tr#4` | Deneyimini söylemek için Ich habe Erfahrung mit … kalıbını kullanırsın. | **GERİ** (`…` sembolü) |
| 16 | `dn:10-gut-koennen · tr#5` | Eskiyle bugünü karşılaştırmak için önce konnte, sonra kann gelir. | GEÇTİ |
| 17 | `dn:10-gut-koennen · table.head` | söylemek istediğin · Almanca | GEÇTİ |
| 18 | `dn:10-gut-koennen · table.rows[0][0]` | iyi yapıyorum | GEÇTİ |
| 19 | `dn:10-gut-koennen · table.rows[1][0]` | biraz yapabiliyorum | GEÇTİ |
| 20 | `dn:10-gut-koennen · table.rows[2][0]` | iyi yapamıyorum | GEÇTİ |
| 21 | `dn:10-gut-koennen · table.rows[3][0]` | deneyimim var | GEÇTİ |
| 22 | `dn:10-gut-koennen · table.rows[4][0]` | eskiden yapamıyordum, bugün yapabiliyorum | GEÇTİ |
| 23 | `dn:10-beruf-wunsch · h_tr` | Meslek isteği: Ich möchte … werden | **GERİ** (`…` sembolü) |
| 24 | `dn:10-beruf-wunsch · tr#1` | Hangi mesleği istediğini söylerken werden en sona gider: Ich möchte Koch werden. | GEÇTİ |
| 25 | `dn:10-beruf-wunsch · tr#2` | Meslek adının önüne artikel gelmez: Ich bin Fahrer. | **GERİ** (Terim: **artikel**) |
| 26 | `dn:10-beruf-wunsch · tr#3` | Bir işi ya da eğitimi ararken als kullanırsın: Ich suche eine Stelle als Fahrer. | GEÇTİ |
| 27 | `dn:10-beruf-wunsch · tr#4` | Eskiden ne istediğini wollte ile söylersin: Als Kind wollte ich Lehrer werden. | GEÇTİ |
| 28 | `dn:10-beruf-wunsch · table.head` | söylemek istediğin · Almanca | GEÇTİ |
| 29 | `dn:10-beruf-wunsch · table.rows[0][0]` | … olmak istiyorum | GEÇTİ |
| 30 | `dn:10-beruf-wunsch · table.rows[1][0]` | … olarak iş arıyorum | GEÇTİ |
| 31 | `dn:10-beruf-wunsch · table.rows[2][0]` | … olarak çalışıyorum | GEÇTİ |
| 32 | `dn:10-beruf-wunsch · table.rows[3][0]` | … eğitimi yapmak istiyorum | GEÇTİ |
| 33 | `dn:10-beruf-wunsch · table.rows[4][0]` | çocukken … olmak istiyordum | GEÇTİ |
| 34 | `dn:10-hilfe · h_tr` | Yardım istemek, yardım önermek | GEÇTİ |
| 35 | `dn:10-hilfe · tr#1` | Yardım isterken soru kann ya da können ile başlar: Kannst du mir helfen? | GEÇTİ |
| 36 | `dn:10-hilfe · tr#2` | Yabancıya Können Sie mir bitte helfen? dersin. | GEÇTİ |
| 37 | `dn:10-hilfe · tr#3` | Yardım önerirken Soll ich dir helfen? ya da Kann ich Ihnen helfen? dersin. | GEÇTİ |
| 38 | `dn:10-hilfe · tr#4` | Önce kısa bir giriş kibar olur: Hast du kurz Zeit? | GEÇTİ |
| 39 | `dn:10-hilfe · table.head` | yardım istersin · yardım önerirsin | GEÇTİ |
| 40 | `dn:10-modal-tuzak · h_tr` | Dört tuzak: geçmişte doğru biçim | GEÇTİ |
| 41 | `dn:10-modal-tuzak · tr#1` | Bu dört yanlış çok sık yapılır. | GEÇTİ |
| 42 | `dn:10-modal-tuzak · tr#2` | Bir: geçmişi anlatırken şimdiki biçim kalır. | **GERİ** (Terim: **şimdiki biçim**) |
| 43 | `dn:10-modal-tuzak · tr#3` | Gestern kann değil, gestern konnte. | GEÇTİ |
| 44 | `dn:10-modal-tuzak · tr#4` | İki: kişinin eki unutulur. | **GERİ** (Terim: **ek** (kişinin eki)) |
| 45 | `dn:10-modal-tuzak · tr#5` | du durft değil, du durftest. | GEÇTİ |
| 46 | `dn:10-modal-tuzak · tr#6` | Üç: ihr biçimi. | GEÇTİ |
| 47 | `dn:10-modal-tuzak · tr#7` | ihr konntet, sonu -tet. | GEÇTİ |
| 48 | `dn:10-modal-tuzak · tr#8` | Dört: müssen'de çift s kalır. | GEÇTİ |
| 49 | `dn:10-modal-tuzak · tr#9` | musten değil, mussten. | GEÇTİ |
| 50 | `dn:10-modal-tuzak · table.head` | yanlış · doğru | GEÇTİ |
| 51 | `dn:10-ung · h_tr` | -ung ile biten adlar: hep die | **GERİ** (Terim: **ad**) |
| 52 | `dn:10-ung · tr#1` | Birçok fiilden -ung ekiyle ad yapılır: üben, die Übung. | **GERİ** (Üç terim: **fiil**, **ek**, **ad**) |
| 53 | `dn:10-ung · tr#2` | Bu adların hepsi die alır. | **GERİ** (Terim: **ad**) |
| 54 | `dn:10-ung · tr#3` | Çoğulu -en ile yapılır: die Übung, die Übungen. | **GERİ** (Terim: **çoğul**) |
| 55 | `dn:10-ung · tr#4` | Fiili biliyorsan adı da tahmin edebilirsin. | **GERİ** (Terimler: **fiil**, **ad**) |
| 56 | `dn:10-ung · table.head` | fiil · ad (hep die) · anlamı | **GERİ** (Terimler: **fiil**, **ad**) |
| 57 | `dn:10-ung · table.rows[0][2]` | alıştırma | GEÇTİ |
| 58 | `dn:10-ung · table.rows[1][2]` | açıklama | GEÇTİ |
| 59 | `dn:10-ung · table.rows[2][2]` | anlam | GEÇTİ |
| 60 | `dn:10-ung · table.rows[3][2]` | fikir | GEÇTİ |
| 61 | `dn:10-ung · table.rows[4][2]` | danışma | GEÇTİ |
| 62 | `dn:10-ung · table.rows[5][2]` | ev, daire | GEÇTİ |
| 63 | `dn:10-ung · table.rows[6][2]` | iş başvurusu | GEÇTİ |
| 64 | `dn:10-ung · table.rows[7][2]` | mesleki ek eğitim | GEÇTİ |
| 65 | `dn:10-ses-o-u · h_tr` | Ses: o ile u | GEÇTİ |
| 66 | `dn:10-ses-o-u · tr#1` | o derken ağzın yuvarlak ve biraz açık durur. | GEÇTİ |
| 67 | `dn:10-ses-o-u · tr#2` | u derken dudakların daha öne gelir, ağız daha dar olur. | GEÇTİ |
| 68 | `dn:10-ses-o-u · tr#3` | konnte ile musste bu yüzden farklı duyulur. | GEÇTİ |
| 69 | `dn:10-ses-o-u · tr#4` | Önce dinle, sonra iki sözcüğü arka arkaya söyle. | GEÇTİ |
| 70 | `dn:10-ses-o-u · table.head` | o · u | GEÇTİ |
| 71 | `dn:10-dtz-ilan · h_tr` | Sınav görevi: kime hangi ilan? | GEÇTİ |
| 72 | `dn:10-dtz-ilan · tr#1` | Sınavda birkaç kişi ve birkaç ilan okursun. | GEÇTİ |
| 73 | `dn:10-dtz-ilan · tr#2` | Her kişiye uygun ilanı bulursun. | GEÇTİ |
| 74 | `dn:10-dtz-ilan · tr#3` | Bir kişiye hiçbir ilan uymaz, o zaman 'hiçbiri' seçilir. | GEÇTİ |
| 75 | `dn:10-dtz-ilan · tr#4` | Önce kişinin isteğindeki önemli sözcükleri bul: saat, gün, yer, para. | GEÇTİ |
| 76 | `dn:10-dtz-ilan · tr#5` | Sonra ilanda aynı bilgiyi ara. | GEÇTİ |
| 77 | `dn:10-dtz-ilan · tr#6` | Bütün metni anlaman gerekmez. | GEÇTİ |
| 78 | `dn:10-dtz-ilan · table.head` | kişide ara · ilanda ara | GEÇTİ |

### `content/v2/m1/gun-64.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.title_tr` | Eskiden ve bugün: eski işini anlatmak | GEÇTİ |
| 2 | `.goal_tr` | Molada eski işini anlatırsın. Eskiden ne yapmak zorunda olduğunu ve neyi yapamadığını **musste** ve **konnte** ile söylersin. | GEÇTİ |
| 3 | `.can_do.tr` | Eski işimi anlatırım: nerede çalıştım, ne yapmak zorundaydım, neyi yapamıyordum. | GEÇTİ |
| 4 | `.halkalar[m1:64:h1].title_tr` | Eskiden nerede çalıştın? | GEÇTİ |
| 5 | `.halkalar[m1:64:h1].sahne.ortam_tr` | Mahallede, süpermarketin önü. Brandl Hanım binayı gösteriyor. | GEÇTİ |
| 6 | `.halkalar[m1:64:h1].sahne.soru.q_tr` | Eskiden burada ne vardı? | GEÇTİ |
| 7 | `.halkalar[m1:64:h1].sahne.soru.opts[0]` | Bir fabrika | GEÇTİ |
| 8 | `.halkalar[m1:64:h1].sahne.soru.opts[1]` | Bir otel | GEÇTİ |
| 9 | `.halkalar[m1:64:h1].sahne.soru.opts[2]` | Bir okul | GEÇTİ |
| 10 | `.halkalar[m1:64:h2].title_tr` | Garson, aşçı, şoför, vardiya | GEÇTİ |
| 11 | `.halkalar[m1:64:h2].sahne.ortam_tr` | Akşam kursu, ders arası. Ioana kardeşinden söz ediyor. | GEÇTİ |
| 12 | `.halkalar[m1:64:h2].sahne.soru.q_tr` | Ioana'nın kardeşinin vardiyası saat kaçta başlıyor? | GEÇTİ |
| 13 | `.halkalar[m1:64:h2].sahne.soru.opts[0]` | Beşte | GEÇTİ |
| 14 | `.halkalar[m1:64:h2].sahne.soru.opts[1]` | Altıda | GEÇTİ |
| 15 | `.halkalar[m1:64:h2].sahne.soru.opts[2]` | Sekizde | GEÇTİ |
| 16 | `.halkalar[m1:64:h3].title_tr` | O zamanlar: konnte, musste | GEÇTİ |
| 17 | `.halkalar[m1:64:h3].sahne.ortam_tr` | Kuaför Luka'nın koltuğundasın. Luka Almanya'daki ilk yılını anlatıyor. | GEÇTİ |
| 18 | `.halkalar[m1:64:h3].sahne.soru.q_tr` | Luka ilk zamanlarda ne kadar Almanca biliyordu? | GEÇTİ |
| 19 | `.halkalar[m1:64:h3].sahne.soru.opts[0]` | Hiç bilmiyordu | GEÇTİ |
| 20 | `.halkalar[m1:64:h3].sahne.soru.opts[1]` | Çok iyi biliyordu | GEÇTİ |
| 21 | `.halkalar[m1:64:h3].sahne.soru.opts[2]` | Biraz biliyordu | GEÇTİ |
| 22 | `.halkalar[m1:64:h4].title_tr` | Deneyim ve deneme | GEÇTİ |
| 23 | `.halkalar[m1:64:h4].sahne.ortam_tr` | Firmada koridor. Wimmer Bey Tobi'yi durduruyor. | GEÇTİ |
| 24 | `.halkalar[m1:64:h4].sahne.soru.q_tr` | Wimmer Bey cuma günü ne yapmak istiyor? | GEÇTİ |
| 25 | `.halkalar[m1:64:h4].sahne.soru.opts[0]` | Ekiple birlikte yemek yapmak | GEÇTİ |
| 26 | `.halkalar[m1:64:h4].sahne.soru.opts[1]` | Yeni bir aşçı aramak | GEÇTİ |
| 27 | `.halkalar[m1:64:h4].sahne.soru.opts[2]` | Depoyu kapatmak | GEÇTİ |
| 28 | `.sahne.title_tr` | Molada eski işler | GEÇTİ |
| 29 | `.sahne.sahneler[s1].sahne_tr` | Öğle arası, firmanın küçük mutfağı. Tobi kahve dolduruyor, Derya masada oturuyor. Sen de yanlarındasın. | GEÇTİ |
| 30 | `.sahne.sahneler[s2].sahne_tr` | Derya fincanını bırakıyor. | GEÇTİ |
| 31 | `.sahne.sahneler[s3].sahne_tr` | Tobi şaşırıyor. | GEÇTİ |
| 32 | `.sahne.sahneler[s4].sahne_tr` | Derya başını sallıyor. | GEÇTİ |
| 33 | `.sahne.sahneler[s5].sahne_tr` | Derya parmağını dudağına götürüyor. | GEÇTİ |
| 34 | `.sahne.sahneler[s6].sahne_tr` | Tobi kaşlarını kaldırıyor. | GEÇTİ |
| 35 | `.sahne.sahneler[s7].sahne_tr` | Derya omuz silkiyor. | GEÇTİ |
| 36 | `.sahne.sahneler[s8].sahne_tr` | Derya gülümseyip depoyu gösteriyor. | GEÇTİ |
| 37 | `.sahne.sahneler[s9].sahne_tr` | Derya Tobi'ye dönüyor. | GEÇTİ |
| 38 | `.sahne.sahneler[s10].sahne_tr` | Tobi gururla göğsünü gösteriyor. | GEÇTİ |
| 39 | `.sahne.sahneler[s11].sahne_tr` | Tobi iç çekiyor. | GEÇTİ |
| 40 | `.sahne.sahneler[s12].sahne_tr` | Tobi telefonunu havaya kaldırıyor. | GEÇTİ |
| 41 | `.sahne.sahneler[s13].sahne_tr` | Derya gülüyor. | GEÇTİ |
| 42 | `.sahne.sahneler[s14].sahne_tr` | Tobi başını iki yana sallıyor. | GEÇTİ |
| 43 | `.sahne.sahneler[s15].sahne_tr` | Tobi kahvesini kaldırıyor. | GEÇTİ |
| 44 | `.sahne.sahneler[s16].sahne_tr` | Kapı açılıyor. Wimmer Bey elinde bir kâğıtla giriyor. | GEÇTİ |
| 45 | `.sahne.sahneler[s17].sahne_tr` | Wimmer Bey kâğıda bakıyor. | GEÇTİ |
| 46 | `.sahne.sahneler[s18].sahne_tr` | Wimmer Bey herkese tek tek bakıyor. | GEÇTİ |
| 47 | `.sahne.sahneler[s19].sahne_tr` | Tobi ellerini kaldırıyor. | GEÇTİ |
| 48 | `.sahne.sahneler[s20].sahne_tr` | Derya sana bakıyor. | GEÇTİ |
| 49 | `.sahne.bolumler[b1].ana_fikir.q_tr` | Derya ne anlatıyor? | GEÇTİ |
| 50 | `.sahne.bolumler[b1].ana_fikir.opts[0]` | Eskiden bir fabrikada zor bir işte çalıştığını | GEÇTİ |
| 51 | `.sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni bir iş aradığını | GEÇTİ |
| 52 | `.sahne.bolumler[b1].ana_fikir.opts[2]` | Fabrikada şef olduğunu | GEÇTİ |
| 53 | `.sahne.bolumler[b1].ayrinti[0].q_tr` | Derya kaç yıldır bu firmada çalışıyor? | GEÇTİ |
| 54 | `.sahne.bolumler[b1].ayrinti[0].opts[0]` | Sekiz yıldır | GEÇTİ |
| 55 | `.sahne.bolumler[b1].ayrinti[0].opts[1]` | Beş yıldır | GEÇTİ |
| 56 | `.sahne.bolumler[b1].ayrinti[0].opts[2]` | İki yıldır | GEÇTİ |
| 57 | `.sahne.bolumler[b1].ayrinti[1].q_tr` | Derya fabrikada her gün saat kaçta kalkmak zorundaydı? | GEÇTİ |
| 58 | `.sahne.bolumler[b1].ayrinti[1].opts[0]` | Beşte | GEÇTİ |
| 59 | `.sahne.bolumler[b1].ayrinti[1].opts[1]` | Altıda | GEÇTİ |
| 60 | `.sahne.bolumler[b1].ayrinti[1].opts[2]` | Sekizde | GEÇTİ |
| 61 | `.sahne.bolumler[b1].ayrinti[2].q_tr` | Fabrikada işte konuşabiliyorlar mıydı? | GEÇTİ |
| 62 | `.sahne.bolumler[b1].ayrinti[2].opts[0]` | Hayır, konuşmak yasaktı | GEÇTİ |
| 63 | `.sahne.bolumler[b1].ayrinti[2].opts[1]` | Evet, her zaman | GEÇTİ |
| 64 | `.sahne.bolumler[b1].ayrinti[2].opts[2]` | Sadece öğle arasında | GEÇTİ |
| 65 | `.sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 66 | `.sahne.bolumler[b1].dikte[d5].gorev_tr` | Derya eskiden nerede çalıştı, iş nasıldı? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 67 | `.sahne.bolumler[b1].cevapla.situation_tr` | Tobi sana dönüyor. Eskiden nerede çalıştığını söyle. | GEÇTİ |
| 68 | `.sahne.bolumler[b1].cevapla.why_tr` | Geçmişteki işini **Früher habe ich … gearbeitet** ile söylersin. | **GERİ** (`…` sembolü) |
| 69 | `.sahne.bolumler[b2].ana_fikir.q_tr` | Tobi neden aşçılığı bıraktı? | GEÇTİ |
| 70 | `.sahne.bolumler[b2].ana_fikir.opts[0]` | Vardiyalar ağırdı, akşamları ve hafta sonları hep çalışıyordu | GEÇTİ |
| 71 | `.sahne.bolumler[b2].ana_fikir.opts[1]` | Yemek yapmayı hiç sevmedi | GEÇTİ |
| 72 | `.sahne.bolumler[b2].ana_fikir.opts[2]` | Otel kapandı | GEÇTİ |
| 73 | `.sahne.bolumler[b2].ayrinti[0].q_tr` | Tobi otelde kaç yıl çalıştı? | GEÇTİ |
| 74 | `.sahne.bolumler[b2].ayrinti[0].opts[0]` | İki yıl | GEÇTİ |
| 75 | `.sahne.bolumler[b2].ayrinti[0].opts[1]` | Bir yıl | GEÇTİ |
| 76 | `.sahne.bolumler[b2].ayrinti[0].opts[2]` | Sekiz yıl | GEÇTİ |
| 77 | `.sahne.bolumler[b2].ayrinti[1].q_tr` | Mutfakta neye izin yoktu? | GEÇTİ |
| 78 | `.sahne.bolumler[b2].ayrinti[1].opts[0]` | Telefona | GEÇTİ |
| 79 | `.sahne.bolumler[b2].ayrinti[1].opts[1]` | Kahveye | GEÇTİ |
| 80 | `.sahne.bolumler[b2].ayrinti[1].opts[2]` | Müziğe | GEÇTİ |
| 81 | `.sahne.bolumler[b2].ayrinti[2].q_tr` | Tobi hafta sonları boştu. Doğru mu? | GEÇTİ |
| 82 | `.sahne.bolumler[b2].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 83 | `.sahne.bolumler[b2].dikte[d5].gorev_tr` | Tobi'nin eski işi neydi, bugün nerede çalışıyor? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 84 | `.sahne.bolumler[b2].cevapla.situation_tr` | Derya sana soruyor: sen de vardiyalı çalıştın mı? Evet de, gece de çalıştığını söyle. | GEÇTİ |
| 85 | `.sahne.bolumler[b2].cevapla.why_tr` | Gece çalıştığını **in der Nacht** ile söylersin. | GEÇTİ |
| 86 | `.sahne.bolumler[b3].ana_fikir.q_tr` | Wimmer Bey ne istiyor? | GEÇTİ |
| 87 | `.sahne.bolumler[b3].ana_fikir.opts[0]` | Cumartesi depo için bir şoför arıyor | GEÇTİ |
| 88 | `.sahne.bolumler[b3].ana_fikir.opts[1]` | Yeni bir aşçı arıyor | GEÇTİ |
| 89 | `.sahne.bolumler[b3].ana_fikir.opts[2]` | Cumartesi depoyu kapatıyor | GEÇTİ |
| 90 | `.sahne.bolumler[b3].ayrinti[0].q_tr` | Şoför için ne gerekiyor? | GEÇTİ |
| 91 | `.sahne.bolumler[b3].ayrinti[0].opts[0]` | Ehliyet ve şoförlük deneyimi | GEÇTİ |
| 92 | `.sahne.bolumler[b3].ayrinti[0].opts[1]` | Sadece iyi Almanca | GEÇTİ |
| 93 | `.sahne.bolumler[b3].ayrinti[0].opts[2]` | Kendi arabası | GEÇTİ |
| 94 | `.sahne.bolumler[b3].ayrinti[1].q_tr` | Tobi cumartesi neden şoförlük yapamıyor? | GEÇTİ |
| 95 | `.sahne.bolumler[b3].ayrinti[1].opts[0]` | Cumartesi vakti yok | GEÇTİ |
| 96 | `.sahne.bolumler[b3].ayrinti[1].opts[1]` | Ehliyeti yok | GEÇTİ |
| 97 | `.sahne.bolumler[b3].ayrinti[1].opts[2]` | Hasta | GEÇTİ |
| 98 | `.sahne.bolumler[b3].dikte[d1].q_tr` | Hangi günü duydun? | GEÇTİ |
| 99 | `.sahne.bolumler[b3].dikte[d5].gorev_tr` | Wimmer Bey ne istedi? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 100 | `.sahne.bolumler[b3].cevapla.situation_tr` | Wimmer Bey sana bakıyor. Ehliyetin olup olmadığını söyle. Varsa eskiden şoför olarak çalıştığını da ekleyebilirsin. | GEÇTİ |
| 101 | `.sahne.bolumler[b3].cevapla.why_tr` | Kısa cevap yeter: **Ja, ich habe einen Führerschein** ya da **Nein, leider nicht**. | GEÇTİ |
| 102 | `.sesler[m1:64:a1].title_tr` | Ioana'dan sesli mesaj | GEÇTİ |
| 103 | `.sesler[m1:64:a1].ortam_tr` | İşten çıkınca telefonuna bakıyorsun. Kurstan arkadaşın Ioana mesaj bırakmış. | GEÇTİ |
| 104 | `.sesler[m1:64:a1].bolumler[b1].ana_fikir.q_tr` | Ioana neden arıyor? | GEÇTİ |
| 105 | `.sesler[m1:64:a1].bolumler[b1].ana_fikir.opts[0]` | Kurstaki konuşma için seninle çalışmak istiyor | GEÇTİ |
| 106 | `.sesler[m1:64:a1].bolumler[b1].ana_fikir.opts[1]` | Yeni bir iş buldu | GEÇTİ |
| 107 | `.sesler[m1:64:a1].bolumler[b1].ana_fikir.opts[2]` | Kurs iptal oldu | GEÇTİ |
| 108 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[0].q_tr` | Perşembe kursta ne yapacaksınız? | GEÇTİ |
| 109 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[0].opts[0]` | İşinizi anlatacaksınız | GEÇTİ |
| 110 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[0].opts[1]` | Sınava gireceksiniz | GEÇTİ |
| 111 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[0].opts[2]` | Bir otele gideceksiniz | GEÇTİ |
| 112 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[1].q_tr` | Ioana eskiden nerede çalışıyordu? | GEÇTİ |
| 113 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[1].opts[0]` | Bir otelde | GEÇTİ |
| 114 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[1].opts[1]` | Bir fabrikada | GEÇTİ |
| 115 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[1].opts[2]` | Bir firmada şoför olarak | GEÇTİ |
| 116 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[2].q_tr` | Ioana ne zaman buluşmak istiyor? | GEÇTİ |
| 117 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[2].opts[0]` | Çarşamba saat altıda | GEÇTİ |
| 118 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[2].opts[1]` | Perşembe saat altıda | GEÇTİ |
| 119 | `.sesler[m1:64:a1].bolumler[b1].ayrinti[2].opts[2]` | Çarşamba saat yedide | GEÇTİ |
| 120 | `.sesler[m1:64:a1].bolumler[b1].dikte[d1].q_tr` | Hangi günü duydun? | GEÇTİ |
| 121 | `.sesler[m1:64:a1].bolumler[b1].dikte[d5].gorev_tr` | Ioana ne istiyor? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 122 | `.sesler[m1:64:a1].bolumler[b1].cevapla.situation_tr` | Ioana'yı geri arıyorsun. Çarşamba saat altıda geleceğini söyle. | GEÇTİ |
| 123 | `.sesler[m1:64:a1].bolumler[b1].cevapla.why_tr` | Önce adını söyle, sonra günü ve saati: **am Mittwoch um sechs**. | GEÇTİ |
| 124 | `.sesler[m1:64:a1].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 125 | `.sesler[m1:64:a1].eylem.opts[0]` | Ioana'yı ara, çarşamba saat altının uyup uymadığını söyle. | GEÇTİ |
| 126 | `.sesler[m1:64:a1].eylem.opts[1]` | Perşembe kurstan önce Ioana'nın oteline git. | GEÇTİ |
| 127 | `.sesler[m1:64:a1].eylem.opts[2]` | Ioana'ya bir iş bul. | GEÇTİ |
| 128 | `.sesler[m1:64:a1].eylem.why_tr` | Ioana çarşamba saat altı için buluşmak istiyor ve geri aramanı bekliyor. | GEÇTİ |
| 129 | `.sesler[m1:64:a2].title_tr` | Depoda hoparlör duyurusu | GEÇTİ |
| 130 | `.sesler[m1:64:a2].ortam_tr` | Depoda çalışıyorsun. Hoparlörden bir duyuru geliyor. | GEÇTİ |
| 131 | `.sesler[m1:64:a2].bolumler[b1].ana_fikir.q_tr` | Duyuru ne hakkında? | GEÇTİ |
| 132 | `.sesler[m1:64:a2].bolumler[b1].ana_fikir.opts[0]` | Vardiya saati değişiyor ve bir şoför aranıyor | GEÇTİ |
| 133 | `.sesler[m1:64:a2].bolumler[b1].ana_fikir.opts[1]` | Depo kapanıyor | GEÇTİ |
| 134 | `.sesler[m1:64:a2].bolumler[b1].ana_fikir.opts[2]` | Yeni bir şef geliyor | GEÇTİ |
| 135 | `.sesler[m1:64:a2].bolumler[b1].ayrinti[0].q_tr` | Pazartesiden itibaren vardiya saat kaçta başlıyor? | GEÇTİ |
| 136 | `.sesler[m1:64:a2].bolumler[b1].ayrinti[0].opts[0]` | Altıda | GEÇTİ |
| 137 | `.sesler[m1:64:a2].bolumler[b1].ayrinti[0].opts[1]` | Yedide | GEÇTİ |
| 138 | `.sesler[m1:64:a2].bolumler[b1].ayrinti[0].opts[2]` | Beşte | GEÇTİ |
| 139 | `.sesler[m1:64:a2].bolumler[b1].ayrinti[1].q_tr` | Şoförlük deneyimi olan ne yapmalı? | GEÇTİ |
| 140 | `.sesler[m1:64:a2].bolumler[b1].ayrinti[1].opts[0]` | Büroya gelmeli | GEÇTİ |
| 141 | `.sesler[m1:64:a2].bolumler[b1].ayrinti[1].opts[1]` | Depoda beklemeli | GEÇTİ |
| 142 | `.sesler[m1:64:a2].bolumler[b1].ayrinti[1].opts[2]` | Tobi'yi aramalı | GEÇTİ |
| 143 | `.sesler[m1:64:a2].bolumler[b1].dikte[d1].q_tr` | Hangi saati duydun? | GEÇTİ |
| 144 | `.sesler[m1:64:a2].bolumler[b1].dikte[d5].gorev_tr` | Duyuruda ne dendi? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 145 | `.sesler[m1:64:a2].bolumler[b1].cevapla.situation_tr` | Derya duyuruyu duymadı. Pazartesi vardiyanın saat kaçta başladığını söyle. | GEÇTİ |
| 146 | `.sesler[m1:64:a2].bolumler[b1].cevapla.why_tr` | Saati **um sechs Uhr** ile söylersin. **fängt … an** ile başlama saatini verirsin. | **GERİ** (`…` sembolü; iki ayrı bilgi) |
| 147 | `.sesler[m1:64:a2].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 148 | `.sesler[m1:64:a2].eylem.opts[0]` | Pazartesiden itibaren vardiyaya saat altıda gel. | GEÇTİ |
| 149 | `.sesler[m1:64:a2].eylem.opts[1]` | Pazartesi her zamanki gibi yedide gel. | GEÇTİ |
| 150 | `.sesler[m1:64:a2].eylem.opts[2]` | Cumartesi büroya ehliyetinle git. | GEÇTİ |
| 151 | `.sesler[m1:64:a2].eylem.why_tr` | Duyuruya göre vardiya pazartesiden itibaren yedide değil, altıda başlıyor. | GEÇTİ |
| 152 | `.prova.title_tr` | Molada Derya'ya eski işini anlat | GEÇTİ |
| 153 | `.prova.durum_tr` | Öğle arası. Derya sana eski işini soruyor. Nerede çalıştığını, ne yapmak zorunda olduğunu ve o zaman neyi yapamadığını anlat. Kendi hayatına en yakın cevabı seç. | GEÇTİ |
| 154 | `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Eski işini **Früher habe ich … gearbeitet** ile söyledin. | **GERİ** (`…` sembolü) |
| 155 | `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Mesleği artikelsiz söyledin: **Ich war Koch**. | **GERİ** (Terim: **artikel** (m1'de öğretilmedi)) |
| 156 | `.prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | **als Fahrer** ile hangi işi yaptığını söyledin. | GEÇTİ |
| 157 | `.prova.dugumler[n1].secenekler[3].geri_bildirim_tr` | Derya eskiyi soruyor. Geçmiş için **Früher habe ich … gearbeitet** de. | **GERİ** (`…` sembolü) |
| 158 | `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | **Ich musste** ile eskiden zorunda olduğun şeyi söyledin. | GEÇTİ |
| 159 | `.prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | **musste** ve sonda **arbeiten**: doğru sıra. | GEÇTİ |
| 160 | `.prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Geçmişi **waren** ile anlattın. | GEÇTİ |
| 161 | `.prova.dugumler[n2].secenekler[3].geri_bildirim_tr` | Bu şimdiki zaman. Eskisi için **ich musste** dersin. | **GERİ** (Terim: **şimdiki zaman**) |
| 162 | `.prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | **damals konnte ich** ile o zamanki durumunu söyledin. | GEÇTİ |
| 163 | `.prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | **konnte** ve **kein Deutsch**: açık ve doğru. | GEÇTİ |
| 164 | `.prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | **damals** geçmiştir. **kann** değil, **konnte** dersin. | GEÇTİ |
| 165 | `.prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Eski isteğini **Ich wollte** ile söyledin. | GEÇTİ |
| 166 | `.prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Taşındığını **Ich bin … umgezogen** ile söyledin. | **GERİ** (`…` sembolü) |
| 167 | `.prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | **Ich wollte … versuchen**: asıl fiil yine sonda. | **GERİ** (`…` sembolü; terim: **asıl fiil**) |
| 168 | `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Bugünü şimdiki zamanla anlattın: **sind**. | **GERİ** (Terim: **şimdiki zaman**) |
| 169 | `.prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Bugün için **ich muss**, eskisi için **ich musste**: farkı tuttun. | GEÇTİ |
| 170 | `.prova.kapanis_tr` | Eski işini anlattın: geçmişi **ich musste**, **ich konnte** ve **ich wollte** ile söyledin. | GEÇTİ |
| 171 | `.okuma_yazma.title_tr` | Luka'nın iş profili | GEÇTİ |
| 172 | `.okuma_yazma.sorular[m1:64:o1].q_tr` | Bu metin ne? | GEÇTİ |
| 173 | `.okuma_yazma.sorular[m1:64:o1].opts[0]` | Luka kendini ve eski işini anlatıyor | GEÇTİ |
| 174 | `.okuma_yazma.sorular[m1:64:o1].opts[1]` | Bir otelin iş ilanı | GEÇTİ |
| 175 | `.okuma_yazma.sorular[m1:64:o1].opts[2]` | Luka iş arıyor | GEÇTİ |
| 176 | `.okuma_yazma.sorular[m1:64:o2].q_tr` | Luka otelde hangi işleri yaptı? | GEÇTİ |
| 177 | `.okuma_yazma.sorular[m1:64:o2].opts[0]` | Önce garsonluk, sonra mutfakta çalıştı | GEÇTİ |
| 178 | `.okuma_yazma.sorular[m1:64:o2].opts[1]` | Sadece resepsiyonda çalıştı | GEÇTİ |
| 179 | `.okuma_yazma.sorular[m1:64:o2].opts[2]` | Otelin şoförüydü | GEÇTİ |
| 180 | `.okuma_yazma.sorular[m1:64:o3].q_tr` | Luka otelde hep gündüz çalıştı. Doğru mu? | GEÇTİ |
| 181 | `.okuma_yazma.sorular[m1:64:o4].q_tr` | Luka eskiden ne istiyordu? | GEÇTİ |
| 182 | `.okuma_yazma.sorular[m1:64:o4].opts[0]` | Bir dükkânı olsun | GEÇTİ |
| 183 | `.okuma_yazma.sorular[m1:64:o4].opts[1]` | Aşçı olmak | GEÇTİ |
| 184 | `.okuma_yazma.sorular[m1:64:o4].opts[2]` | Başka bir şehre taşınmak | GEÇTİ |
| 185 | `.okuma_yazma.sorular[m1:64:o5].situation_tr` | Luka sana soruyor. Eskiden nerede çalıştığını ve ne yapmak zorunda olduğunu söyle. | GEÇTİ |
| 186 | `.okuma_yazma.sorular[m1:64:o5].why_tr` | Önce yeri söyle: **Früher habe ich … gearbeitet**. Sonra **Ich musste …** ekle. | **GERİ** (`…` sembolü (iki yerde)) |
| 187 | `.okuma_yazma.yazma.gorev_tr` | Kurs için kendi kısa iş profilini yaz. Eskiden nerede çalıştın, ne yapmak zorundaydın, o zaman neyi yapamıyordun, bugün ne yapıyorsun? Dört beş kısa cümle. | GEÇTİ |
| 188 | `.okuma_yazma.yazma.kontrol_tr[0]` | Eski işini **Früher habe ich … gearbeitet** ile yazdın mı? | **GERİ** (`…` sembolü) |
| 189 | `.okuma_yazma.yazma.kontrol_tr[1]` | Geçmiş için **musste** ya da **konnte** kullandın mı? | GEÇTİ |
| 190 | `.okuma_yazma.yazma.kontrol_tr[2]` | Bugün için **heute** ile şimdiki zamanı yazdın mı? | **GERİ** (Terim: **şimdiki zaman**) |
| 191 | `.gun_sinavi.maddeler[m1:64:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 192 | `.gun_sinavi.maddeler[m1:64:s1].why_tr` | **Früher** eskiden demektir. **gearbeitet** sona gelir. | GEÇTİ |
| 193 | `.gun_sinavi.maddeler[m1:64:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 194 | `.gun_sinavi.maddeler[m1:64:s2].why_tr` | **konnte** yazılır, noktalar düşer: **konnte**. | GEÇTİ |
| 195 | `.gun_sinavi.maddeler[m1:64:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 196 | `.gun_sinavi.maddeler[m1:64:s3].why_tr` | **mussten** iki s ile yazılır. | GEÇTİ |
| 197 | `.gun_sinavi.maddeler[m1:64:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 198 | `.gun_sinavi.maddeler[m1:64:s4].why_tr` | **fängt … an**: **an** en sona gider. | **GERİ** (`…` sembolü) |
| 199 | `.gun_sinavi.maddeler[m1:64:s5].why_tr` | **Früher** başa gelince **habe** ikinci sıraya geçer. | GEÇTİ |
| 200 | `.gun_sinavi.maddeler[m1:64:s6].why_tr` | **musste** ikinci sırada, **aufstehen** en sonda. | GEÇTİ |
| 201 | `.gun_sinavi.maddeler[m1:64:s7].why_tr` | Eski istek **wollte** ile söylenir. **werden** en sona gider. | GEÇTİ |
| 202 | `.gun_sinavi.maddeler[m1:64:s8].why_tr` | **als Kellner** ile hangi iş olduğunu söylersin. Artikel yok. | **GERİ** (Terim: **Artikel**) |
| 203 | `.gun_sinavi.maddeler[m1:64:s9].situation_tr` | Derya eskiden ne iş yaptığını soruyor. Kendi eski işini söyle. | GEÇTİ |
| 204 | `.gun_sinavi.maddeler[m1:64:s9].why_tr` | Geçmişteki işi **Früher habe ich … gearbeitet** ya da **Früher war ich …** ile söylersin. | **GERİ** (`…` sembolü (iki yerde); cümle 15 kelime) |
| 205 | `.gun_sinavi.maddeler[m1:64:s10].situation_tr` | Wimmer Bey soruyor. O zamanlar sadece biraz Almanca bildiğini söyle. | GEÇTİ |
| 206 | `.gun_sinavi.maddeler[m1:64:s10].why_tr` | Kendin için **ich konnte** dersin, sonu ek almaz. | **GERİ** (Terim: **ek**) |
| 207 | `.gun_sinavi.maddeler[m1:64:s11].situation_tr` | Kursta iki cümleyle eski işini anlatıyorsun: nerede çalıştın ve ne yapmak zorundaydın? | GEÇTİ |
| 208 | `.gun_sinavi.maddeler[m1:64:s11].why_tr` | Önce yer: **Früher habe ich … gearbeitet**. Sonra zorunluluk: **Ich musste …**. | **GERİ** (`…` sembolü (iki yerde)) |

### `content/v2/m1/gun-65.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.title_tr` | Neyi iyi yaparsın? İşte güçlü yanların | GEÇTİ |
| 2 | `.goal_tr` | Şefine neyi iyi yaptığını **Ich kann gut …** ile söylersin. Nasıl çalıştığını **zuverlässig**, **fleißig**, **hilfsbereit** gibi kelimelerle anlatırsın. | **GERİ** (`…` sembolü) |
| 3 | `.can_do.tr` | Neyi iyi yaptığımı, neyi biraz yaptığımı ve nasıl çalıştığımı söylerim. | GEÇTİ |
| 4 | `.halkalar[m1:65:h1].title_tr` | Bilgisayar, temizlik, usta | GEÇTİ |
| 5 | `.halkalar[m1:65:h1].sahne.ortam_tr` | Firmada, depo bürosu. Tobi ekrana bakıyor. | GEÇTİ |
| 6 | `.halkalar[m1:65:h1].sahne.soru.q_tr` | Neler çalışmıyor? | GEÇTİ |
| 7 | `.halkalar[m1:65:h1].sahne.soru.opts[0]` | Bilgisayar ve depodaki lamba | GEÇTİ |
| 8 | `.halkalar[m1:65:h1].sahne.soru.opts[1]` | Sadece kalorifer | GEÇTİ |
| 9 | `.halkalar[m1:65:h1].sahne.soru.opts[2]` | Telefon | GEÇTİ |
| 10 | `.halkalar[m1:65:h2].title_tr` | Nasıl bir çalışansın? | GEÇTİ |
| 11 | `.halkalar[m1:65:h2].sahne.ortam_tr` | Akşam kursu. Ioana kartları karıştırıyor, sırayla soruyorsunuz. | GEÇTİ |
| 12 | `.halkalar[m1:65:h2].sahne.soru.q_tr` | Ioana kendini nasıl anlatıyor? | GEÇTİ |
| 13 | `.halkalar[m1:65:h2].sahne.soru.opts[0]` | Çalışkan, her akşam ders çalışıyor | GEÇTİ |
| 14 | `.halkalar[m1:65:h2].sahne.soru.opts[1]` | Çok iyi yemek yapıyor | GEÇTİ |
| 15 | `.halkalar[m1:65:h2].sahne.soru.opts[2]` | Hep geç kalıyor | GEÇTİ |
| 16 | `.halkalar[m1:65:h3].title_tr` | Ekip, sabır, yardım | GEÇTİ |
| 17 | `.halkalar[m1:65:h3].sahne.ortam_tr` | Perşembe öğleden sonra, depo. Wimmer Bey bir liste getiriyor. | GEÇTİ |
| 18 | `.halkalar[m1:65:h3].sahne.soru.q_tr` | Derya işi cumaya kadar yetiştirebilecek mi? | GEÇTİ |
| 19 | `.halkalar[m1:65:h3].sahne.soru.opts[0]` | Evet, ekip olarak yetiştirecekler | GEÇTİ |
| 20 | `.halkalar[m1:65:h3].sahne.soru.opts[1]` | Hayır, vakitleri yok | GEÇTİ |
| 21 | `.halkalar[m1:65:h3].sahne.soru.opts[2]` | Bilmiyor | GEÇTİ |
| 22 | `.sahne.title_tr` | Ekip toplantısı: kim neyi iyi yapar? | GEÇTİ |
| 23 | `.sahne.sahneler[s1].sahne_tr` | Sabah, depoda kısa ekip toplantısı. Wimmer Bey'in elinde bir dosya, herkes ayakta. | GEÇTİ |
| 24 | `.sahne.sahneler[s2].sahne_tr` | Wimmer Bey masadaki kutuyu gösteriyor. | GEÇTİ |
| 25 | `.sahne.sahneler[s3].sahne_tr` | Wimmer Bey ekibe bakıyor. | GEÇTİ |
| 26 | `.sahne.sahneler[s4].sahne_tr` | Tobi gülerek elini sallıyor. | GEÇTİ |
| 27 | `.sahne.sahneler[s5].sahne_tr` | Derya omuz silkiyor. | GEÇTİ |
| 28 | `.sahne.sahneler[s6].sahne_tr` | Wimmer Bey dosyaya bir şey yazıyor. | GEÇTİ |
| 29 | `.sahne.sahneler[s7].sahne_tr` | Wimmer Bey Derya'ya dönüyor. | GEÇTİ |
| 30 | `.sahne.sahneler[s8].sahne_tr` | Derya gülümseyip Tobi'ye bakıyor. | GEÇTİ |
| 31 | `.sahne.sahneler[s9].sahne_tr` | Tobi itiraz ediyor. | GEÇTİ |
| 32 | `.sahne.sahneler[s10].sahne_tr` | Derya kahkaha atıyor. | GEÇTİ |
| 33 | `.sahne.sahneler[s11].sahne_tr` | Wimmer Bey sana dönüyor. | GEÇTİ |
| 34 | `.sahne.sahneler[s12].sahne_tr` | Toplantının sonu. Wimmer Bey saatine bakıyor. | GEÇTİ |
| 35 | `.sahne.sahneler[s13].sahne_tr` | Wimmer Bey depo tavanındaki lambayı gösteriyor. | GEÇTİ |
| 36 | `.sahne.sahneler[s14].sahne_tr` | Tobi telefonundaki takvime bakıyor. | GEÇTİ |
| 37 | `.sahne.sahneler[s15].sahne_tr` | Derya elini kaldırıyor. | GEÇTİ |
| 38 | `.sahne.sahneler[s16].sahne_tr` | Wimmer Bey başını sallıyor. | GEÇTİ |
| 39 | `.sahne.sahneler[s17].sahne_tr` | Derya Tobi'ye göz kırpıyor. | GEÇTİ |
| 40 | `.sahne.bolumler[b1].ana_fikir.q_tr` | Toplantı ne hakkında? | GEÇTİ |
| 41 | `.sahne.bolumler[b1].ana_fikir.opts[0]` | Depoya yeni bilgisayar geliyor, kim iyi kullanır | GEÇTİ |
| 42 | `.sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni bir şef geliyor | GEÇTİ |
| 43 | `.sahne.bolumler[b1].ana_fikir.opts[2]` | Depo taşınıyor | GEÇTİ |
| 44 | `.sahne.bolumler[b1].ayrinti[0].q_tr` | Tobi neyi iyi yapıyor? | GEÇTİ |
| 45 | `.sahne.bolumler[b1].ayrinti[0].opts[0]` | Araba kullanmayı | GEÇTİ |
| 46 | `.sahne.bolumler[b1].ayrinti[0].opts[1]` | Bilgisayarla çalışmayı | GEÇTİ |
| 47 | `.sahne.bolumler[b1].ayrinti[0].opts[2]` | Yemek yapmayı | GEÇTİ |
| 48 | `.sahne.bolumler[b1].ayrinti[1].q_tr` | Derya eskiden bilgisayar kullanabiliyor muydu? | GEÇTİ |
| 49 | `.sahne.bolumler[b1].ayrinti[1].opts[0]` | Hayır, ama bugün biraz kullanabiliyor | GEÇTİ |
| 50 | `.sahne.bolumler[b1].ayrinti[1].opts[1]` | Evet, çok iyi | GEÇTİ |
| 51 | `.sahne.bolumler[b1].ayrinti[1].opts[2]` | Hiç kullanmadı, bugün de kullanmıyor | GEÇTİ |
| 52 | `.sahne.bolumler[b1].ayrinti[2].q_tr` | Cuma günü ne yapılacak? | GEÇTİ |
| 53 | `.sahne.bolumler[b1].ayrinti[2].opts[0]` | Herkes birlikte depoyu temizleyecek | GEÇTİ |
| 54 | `.sahne.bolumler[b1].ayrinti[2].opts[1]` | Yeni bilgisayar gelecek | GEÇTİ |
| 55 | `.sahne.bolumler[b1].ayrinti[2].opts[2]` | Ekip yemeğe gidecek | GEÇTİ |
| 56 | `.sahne.bolumler[b1].dikte[d1].q_tr` | Hangi günü duydun? | GEÇTİ |
| 57 | `.sahne.bolumler[b1].dikte[d5].gorev_tr` | Toplantıda ne dendi? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 58 | `.sahne.bolumler[b1].cevapla.situation_tr` | Wimmer Bey soruyor: bilgisayarla iyi çalışabilir misin? Kendi durumunu söyle. | GEÇTİ |
| 59 | `.sahne.bolumler[b1].cevapla.why_tr` | Ne kadar iyi yaptığını **gut**, **ein bisschen** ya da **nicht so gut** ile söylersin. | GEÇTİ |
| 60 | `.sahne.bolumler[b2].ana_fikir.q_tr` | Derya ekibi nasıl anlatıyor? | GEÇTİ |
| 61 | `.sahne.bolumler[b2].ana_fikir.opts[0]` | Herkes güvenilir, Tobi çalışkan ama hep dakik değil | GEÇTİ |
| 62 | `.sahne.bolumler[b2].ana_fikir.opts[1]` | Kimse güvenilir değil | GEÇTİ |
| 63 | `.sahne.bolumler[b2].ana_fikir.opts[2]` | Tobi hiç çalışmıyor | GEÇTİ |
| 64 | `.sahne.bolumler[b2].ayrinti[0].q_tr` | Tobi kendisi için ne diyor? | GEÇTİ |
| 65 | `.sahne.bolumler[b2].ayrinti[0].opts[0]` | Sık sık dakik olduğunu | GEÇTİ |
| 66 | `.sahne.bolumler[b2].ayrinti[0].opts[1]` | Hep geç kaldığını | GEÇTİ |
| 67 | `.sahne.bolumler[b2].ayrinti[0].opts[2]` | Hiç dakik olmadığını | GEÇTİ |
| 68 | `.sahne.bolumler[b2].ayrinti[1].q_tr` | Derya'ya göre Tobi her zaman dakik. Doğru mu? | GEÇTİ |
| 69 | `.sahne.bolumler[b2].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 70 | `.sahne.bolumler[b2].dikte[d5].gorev_tr` | Derya Tobi için ne dedi? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 71 | `.sahne.bolumler[b2].cevapla.situation_tr` | Wimmer Bey sana dönüyor. Neyi iyi yaptığını ve nasıl çalıştığını söyle. Kendi hayatından konuş. | GEÇTİ |
| 72 | `.sahne.bolumler[b2].cevapla.why_tr` | Önce **Ich kann gut …**, sonra **Ich bin …** ile nasıl çalıştığını söylersin. | **GERİ** (`…` sembolü (iki yerde)) |
| 73 | `.sahne.bolumler[b3].ana_fikir.q_tr` | Bugün öğleden sonra ne oluyor? | GEÇTİ |
| 74 | `.sahne.bolumler[b3].ana_fikir.opts[0]` | Bir elektrikçi geliyor, Derya ona yardım edecek | GEÇTİ |
| 75 | `.sahne.bolumler[b3].ana_fikir.opts[1]` | Yeni bilgisayar geliyor | GEÇTİ |
| 76 | `.sahne.bolumler[b3].ana_fikir.opts[2]` | Tobi doktora gidiyor ve bir daha gelmiyor | GEÇTİ |
| 77 | `.sahne.bolumler[b3].ayrinti[0].q_tr` | Depoda ne bozuk? | GEÇTİ |
| 78 | `.sahne.bolumler[b3].ayrinti[0].opts[0]` | Bir lamba | GEÇTİ |
| 79 | `.sahne.bolumler[b3].ayrinti[0].opts[1]` | Bilgisayar | GEÇTİ |
| 80 | `.sahne.bolumler[b3].ayrinti[0].opts[2]` | Kalorifer | GEÇTİ |
| 81 | `.sahne.bolumler[b3].ayrinti[1].q_tr` | Tobi neden yardım edemiyor? | GEÇTİ |
| 82 | `.sahne.bolumler[b3].ayrinti[1].opts[0]` | Saat üçte doktor randevusu var | GEÇTİ |
| 83 | `.sahne.bolumler[b3].ayrinti[1].opts[1]` | Hasta | GEÇTİ |
| 84 | `.sahne.bolumler[b3].ayrinti[1].opts[2]` | İzinli | GEÇTİ |
| 85 | `.sahne.bolumler[b3].ayrinti[2].q_tr` | Derya bugün saat kaça kadar işte? | GEÇTİ |
| 86 | `.sahne.bolumler[b3].ayrinti[2].opts[0]` | Beşe kadar | GEÇTİ |
| 87 | `.sahne.bolumler[b3].ayrinti[2].opts[1]` | Üçe kadar | GEÇTİ |
| 88 | `.sahne.bolumler[b3].ayrinti[2].opts[2]` | Altıya kadar | GEÇTİ |
| 89 | `.sahne.bolumler[b3].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 90 | `.sahne.bolumler[b3].dikte[d5].gorev_tr` | Elektrikçiye kim yardım edecek, Tobi neden edemiyor? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 91 | `.sahne.bolumler[b3].cevapla.situation_tr` | Wimmer Bey sana da soruyor. Yardım edebileceğini ve bugün altıya kadar burada olduğunu söyle. | GEÇTİ |
| 92 | `.sahne.bolumler[b3].cevapla.why_tr` | Yardım teklifini **Ich kann helfen** ile, saati **bis sechs** ile söylersin. | GEÇTİ |
| 93 | `.sesler[m1:65:a1].title_tr` | Şefinden sesli mesaj | GEÇTİ |
| 94 | `.sesler[m1:65:a1].ortam_tr` | Akşam evdesin. Telefonunda Wimmer Bey'den bir mesaj var. | GEÇTİ |
| 95 | `.sesler[m1:65:a1].bolumler[b1].ana_fikir.q_tr` | Wimmer Bey neden arıyor? | GEÇTİ |
| 96 | `.sesler[m1:65:a1].bolumler[b1].ana_fikir.opts[0]` | Yarın erken gelmeni istiyor, bir usta gelecek | GEÇTİ |
| 97 | `.sesler[m1:65:a1].bolumler[b1].ana_fikir.opts[1]` | Yarın gelmemeni istiyor | GEÇTİ |
| 98 | `.sesler[m1:65:a1].bolumler[b1].ana_fikir.opts[2]` | Kaloriferi senin tamir etmeni istiyor | GEÇTİ |
| 99 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[0].q_tr` | Usta ne zaman geliyor? | GEÇTİ |
| 100 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[0].opts[0]` | Yarın saat sekizde | GEÇTİ |
| 101 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[0].opts[1]` | Bugün saat sekizde | GEÇTİ |
| 102 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[0].opts[2]` | Yarın yedi buçukta | GEÇTİ |
| 103 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[1].q_tr` | Ne bozuk? | GEÇTİ |
| 104 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[1].opts[0]` | Kalorifer | GEÇTİ |
| 105 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[1].opts[1]` | Bilgisayar | GEÇTİ |
| 106 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[1].opts[2]` | Lamba | GEÇTİ |
| 107 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[2].q_tr` | Sen saat kaçta orada olmalısın? | GEÇTİ |
| 108 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[2].opts[0]` | Yedi buçukta | GEÇTİ |
| 109 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[2].opts[1]` | Sekizde | GEÇTİ |
| 110 | `.sesler[m1:65:a1].bolumler[b1].ayrinti[2].opts[2]` | Sekiz buçukta | GEÇTİ |
| 111 | `.sesler[m1:65:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 112 | `.sesler[m1:65:a1].bolumler[b1].dikte[d5].gorev_tr` | Wimmer Bey ne istedi? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 113 | `.sesler[m1:65:a1].bolumler[b1].cevapla.situation_tr` | Wimmer Bey'i geri arıyorsun. Yarın yedi buçukta orada olacağını söyle. | GEÇTİ |
| 114 | `.sesler[m1:65:a1].bolumler[b1].cevapla.why_tr` | Saati **um halb acht** ile söylersin. **halb acht** yedi buçuk demektir. | GEÇTİ |
| 115 | `.sesler[m1:65:a1].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 116 | `.sesler[m1:65:a1].eylem.opts[0]` | Yarın saat yedi buçukta depoda ol. | GEÇTİ |
| 117 | `.sesler[m1:65:a1].eylem.opts[1]` | Yarın her zamanki gibi sekizde gel. | GEÇTİ |
| 118 | `.sesler[m1:65:a1].eylem.opts[2]` | Kaloriferi kendin tamir et. | GEÇTİ |
| 119 | `.sesler[m1:65:a1].eylem.why_tr` | Usta sekizde geliyor. Wimmer Bey seni yedi buçukta orada istiyor. | GEÇTİ |
| 120 | `.sesler[m1:65:a2].title_tr` | Ioana'dan yardım isteği | GEÇTİ |
| 121 | `.sesler[m1:65:a2].ortam_tr` | Öğle arasında telefonuna bakıyorsun. Kurstan Ioana mesaj bırakmış. | GEÇTİ |
| 122 | `.sesler[m1:65:a2].bolumler[b1].ana_fikir.q_tr` | Ioana neden arıyor? | GEÇTİ |
| 123 | `.sesler[m1:65:a2].bolumler[b1].ana_fikir.opts[0]` | Bilgisayarı bozuldu, yardım istiyor | GEÇTİ |
| 124 | `.sesler[m1:65:a2].bolumler[b1].ana_fikir.opts[1]` | Kursa gelemiyor | GEÇTİ |
| 125 | `.sesler[m1:65:a2].bolumler[b1].ana_fikir.opts[2]` | Yeni bir bilgisayar aldı | GEÇTİ |
| 126 | `.sesler[m1:65:a2].bolumler[b1].ayrinti[0].q_tr` | Ioana bu akşam ne yapmalı? | GEÇTİ |
| 127 | `.sesler[m1:65:a2].bolumler[b1].ayrinti[0].opts[0]` | Kurs ödevini yazmalı | GEÇTİ |
| 128 | `.sesler[m1:65:a2].bolumler[b1].ayrinti[0].opts[1]` | İşe gitmeli | GEÇTİ |
| 129 | `.sesler[m1:65:a2].bolumler[b1].ayrinti[0].opts[2]` | Bilgisayar almalı | GEÇTİ |
| 130 | `.sesler[m1:65:a2].bolumler[b1].ayrinti[1].q_tr` | Ioana ne zaman yardım istiyor? | GEÇTİ |
| 131 | `.sesler[m1:65:a2].bolumler[b1].ayrinti[1].opts[0]` | Bugün işten sonra | GEÇTİ |
| 132 | `.sesler[m1:65:a2].bolumler[b1].ayrinti[1].opts[1]` | Yarın sabah | GEÇTİ |
| 133 | `.sesler[m1:65:a2].bolumler[b1].ayrinti[1].opts[2]` | Hafta sonu | GEÇTİ |
| 134 | `.sesler[m1:65:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 135 | `.sesler[m1:65:a2].bolumler[b1].dikte[d5].gorev_tr` | Ioana'nın sorunu ne? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 136 | `.sesler[m1:65:a2].bolumler[b1].cevapla.situation_tr` | Ioana'yı geri arıyorsun. Yardım edebileceğini ve işten sonra saat altıda geleceğini söyle. | GEÇTİ |
| 137 | `.sesler[m1:65:a2].bolumler[b1].cevapla.why_tr` | Yardım teklifini **Ich kann helfen** ile, saati **um sechs** ile söylersin. | GEÇTİ |
| 138 | `.sesler[m1:65:a2].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 139 | `.sesler[m1:65:a2].eylem.opts[0]` | Ioana'yı ara, bugün işten sonra yardım edip edemeyeceğini söyle. | GEÇTİ |
| 140 | `.sesler[m1:65:a2].eylem.opts[1]` | Ioana'ya yeni bir bilgisayar al. | GEÇTİ |
| 141 | `.sesler[m1:65:a2].eylem.opts[2]` | Ioana'nın ödevini sen yaz. | GEÇTİ |
| 142 | `.sesler[m1:65:a2].eylem.why_tr` | Ioana bugün işten sonra yardım istiyor ve geri aramanı bekliyor. | GEÇTİ |
| 143 | `.prova.title_tr` | Şefine neyi iyi yaptığını söyle | GEÇTİ |
| 144 | `.prova.durum_tr` | Wimmer Bey seni bürosuna çağırıyor. Depoya yeni bir bilgisayar geldi, bir görev için birini arıyor. Neyi iyi yaptığını, deneyimini ve nasıl çalıştığını söyle. Kendine en yakın cevabı seç. | GEÇTİ |
| 145 | `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Şefin sorusunu aynı kelimelerle cevapladın: **kurz Zeit**. | GEÇTİ |
| 146 | `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Hemen yardıma hazır olduğunu gösterdin. | GEÇTİ |
| 147 | `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | **Ich kann gut …** ile güçlü yanını söyledin. | **GERİ** (`…` sembolü) |
| 148 | `.prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Eskiyi **konnte**, bugünü **geht es** ile ayırdın. | GEÇTİ |
| 149 | `.prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Dürüst oldun ve olumlu bir şey ekledin. | GEÇTİ |
| 150 | `.prova.dugumler[n2].secenekler[3].geri_bildirim_tr` | Wimmer Bey bugünü soruyor. **konnte** eskisi içindir, bugün için **ich kann** de. | GEÇTİ |
| 151 | `.prova.dugumler[n3b].secenekler[0].geri_bildirim_tr` | Kısa bir teşekkür yeter. | GEÇTİ |
| 152 | `.prova.dugumler[n3b].secenekler[1].geri_bildirim_tr` | **Ich versuche es** ile istekli olduğunu gösterdin. | GEÇTİ |
| 153 | `.prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Deneyimini somut söyledin: kaç yıl, nerede. | GEÇTİ |
| 154 | `.prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Eksiğini söyledin, ardından güçlü yanını ekledin. | GEÇTİ |
| 155 | `.prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | **im Team** ve **hilfsbereit**: şefin duymak istediği kelimeler. | GEÇTİ |
| 156 | `.prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Üç güçlü yan saydın. Kısa ve net. | GEÇTİ |
| 157 | `.prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Bu konuşmada olumlu bir şey söyle: **Ich arbeite gern im Team**. | GEÇTİ |
| 158 | `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | **Das schaffe ich** ile söz verdin. | GEÇTİ |
| 159 | `.prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | **Ich versuche es** daha temkinli bir söz. | GEÇTİ |
| 160 | `.prova.dugumler[n5].secenekler[2].geri_bildirim_tr` | Pazartesi henüz gelmedi. Geçmiş değil: **Das schaffe ich** de. | GEÇTİ |
| 161 | `.prova.kapanis_tr` | Şefine güçlü yanlarını söyledin: **Ich kann gut …**, **Ich bin zuverlässig**, **Das schaffe ich**. | **GERİ** (`…` sembolü) |
| 162 | `.okuma_yazma.title_tr` | Firmanın ekip sayfası | GEÇTİ |
| 163 | `.okuma_yazma.sorular[m1:65:o1].q_tr` | Bu sayfa ne? | GEÇTİ |
| 164 | `.okuma_yazma.sorular[m1:65:o1].opts[0]` | Depo ekibini tanıtıyor | GEÇTİ |
| 165 | `.okuma_yazma.sorular[m1:65:o1].opts[1]` | Bir iş ilanı | GEÇTİ |
| 166 | `.okuma_yazma.sorular[m1:65:o1].opts[2]` | Deponun kuralları | GEÇTİ |
| 167 | `.okuma_yazma.sorular[m1:65:o2].q_tr` | Derya nasıl biri? | GEÇTİ |
| 168 | `.okuma_yazma.sorular[m1:65:o2].opts[0]` | Sabırlı, seve seve yardım ediyor | GEÇTİ |
| 169 | `.okuma_yazma.sorular[m1:65:o2].opts[1]` | Sabırsız | GEÇTİ |
| 170 | `.okuma_yazma.sorular[m1:65:o2].opts[2]` | Hep geç kalıyor | GEÇTİ |
| 171 | `.okuma_yazma.sorular[m1:65:o3].q_tr` | Tobi neyi iyi yapıyor? | GEÇTİ |
| 172 | `.okuma_yazma.sorular[m1:65:o3].opts[0]` | Araba kullanmayı | GEÇTİ |
| 173 | `.okuma_yazma.sorular[m1:65:o3].opts[1]` | Bilgisayarla çalışmayı | GEÇTİ |
| 174 | `.okuma_yazma.sorular[m1:65:o3].opts[2]` | Yemek yapmayı | GEÇTİ |
| 175 | `.okuma_yazma.sorular[m1:65:o4].q_tr` | Derya iki yıldır bu firmada. Doğru mu? | GEÇTİ |
| 176 | `.okuma_yazma.sorular[m1:65:o5].situation_tr` | Ekip sayfasına senin satırın da girecek. Wimmer Bey neyi iyi yaptığını ve nasıl biri olduğunu soruyor. | GEÇTİ |
| 177 | `.okuma_yazma.sorular[m1:65:o5].why_tr` | Önce **Ich kann gut …**, sonra **Ich bin …** ile kendini tanıtırsın. | **GERİ** (`…` sembolü (iki yerde)) |
| 178 | `.okuma_yazma.yazma.gorev_tr` | Ekip sayfası için kendi satırını yaz. Neyi iyi yaparsın, neyi biraz yaparsın, nasıl birisin, hangi deneyimin var? Üç dört kısa cümle. | GEÇTİ |
| 179 | `.okuma_yazma.yazma.kontrol_tr[0]` | Bir güçlü yanını **Ich kann gut …** ile yazdın mı? | **GERİ** (`…` sembolü) |
| 180 | `.okuma_yazma.yazma.kontrol_tr[1]` | Nasıl biri olduğunu **Ich bin …** ile yazdın mı? | **GERİ** (`…` sembolü) |
| 181 | `.okuma_yazma.yazma.kontrol_tr[2]` | Asıl fiil cümlenin sonunda mı: **Ich kann gut kochen**? | **GERİ** (Terim: **asıl fiil**) |
| 182 | `.gun_sinavi.maddeler[m1:65:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 183 | `.gun_sinavi.maddeler[m1:65:s1].why_tr` | **kann gut** birlikte gelir, **arbeiten** en sona gider. | GEÇTİ |
| 184 | `.gun_sinavi.maddeler[m1:65:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 185 | `.gun_sinavi.maddeler[m1:65:s2].why_tr` | **der Elektriker** elektrikçidir. | GEÇTİ |
| 186 | `.gun_sinavi.maddeler[m1:65:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 187 | `.gun_sinavi.maddeler[m1:65:s3].why_tr` | **das Team** ile **ein gutes Team** denir. | GEÇTİ |
| 188 | `.gun_sinavi.maddeler[m1:65:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 189 | `.gun_sinavi.maddeler[m1:65:s4].why_tr` | Eskisi için **konnte** yazılır, noktalar düşer. | GEÇTİ |
| 190 | `.gun_sinavi.maddeler[m1:65:s5].why_tr` | Nasıl biri olduğunu **Ich bin …** ile söylersin. | **GERİ** (`…` sembolü) |
| 191 | `.gun_sinavi.maddeler[m1:65:s6].why_tr` | Yetiştirmek **schaffen** olur. Kendin için **ich schaffe**. | GEÇTİ |
| 192 | `.gun_sinavi.maddeler[m1:65:s7].why_tr` | **brauchen** ile **einen Handwerker** gelir. | GEÇTİ |
| 193 | `.gun_sinavi.maddeler[m1:65:s8].why_tr` | İyi yapamadığın şey için **Ich kann nicht so gut …** dersin. | **GERİ** (`…` sembolü) |
| 194 | `.gun_sinavi.maddeler[m1:65:s9].situation_tr` | Derya molada soruyor. Neyi iyi yaptığını söyle. | GEÇTİ |
| 195 | `.gun_sinavi.maddeler[m1:65:s9].why_tr` | **Ich kann gut** ve en sonda asıl fiil: **Ich kann gut kochen**. | **GERİ** (Terim: **asıl fiil**) |
| 196 | `.gun_sinavi.maddeler[m1:65:s10].situation_tr` | Ioana soruyor. Eskiden iyi Almanca bilmediğini, bugün biraz bildiğini söyle. | GEÇTİ |
| 197 | `.gun_sinavi.maddeler[m1:65:s10].why_tr` | Eskisi **konnte**, bugünü **kann**: **Früher konnte ich …, heute kann ich …**. | **GERİ** (`…` sembolü (iki yerde)) |
| 198 | `.gun_sinavi.maddeler[m1:65:s11].situation_tr` | Wimmer Bey'e iki cümleyle neyi iyi yaptığını ve nasıl çalıştığını söyle. | GEÇTİ |
| 199 | `.gun_sinavi.maddeler[m1:65:s11].why_tr` | Önce **Ich kann gut …**, sonra **Ich bin …** ya da **Ich arbeite gern im Team**. | **GERİ** (`…` sembolü (iki yerde)) |

### `content/v2/m1/gun-66.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.title_tr` | İş ilanı ve meslek isteği | GEÇTİ |
| 2 | `.goal_tr` | Ne olmak istediğini **Ich möchte Erzieherin werden** gibi söylersin. Kısa iş ilanlarında saati, günü ve istenen belgeyi bulursun. Bir arkadaşın için fırındaki ilanı sorarsın. | GEÇTİ |
| 3 | `.can_do.tr` | Kısa bir iş ilanını anlar, kimin hangi işi istediğini ve ne zaman çalışabileceğini söylerim. | GEÇTİ |
| 4 | `.halkalar[m1:66:h1].title_tr` | İlandaki sözcükler | GEÇTİ |
| 5 | `.halkalar[m1:66:h1].sahne.ortam_tr` | Cumartesi sabahı Stadler fırınının önü. Ioana vitrindeki kâğıdı gösteriyor. | GEÇTİ |
| 6 | `.halkalar[m1:66:h1].sahne.soru.q_tr` | İş haftada kaç saat? | GEÇTİ |
| 7 | `.halkalar[m1:66:h1].sahne.soru.opts[0]` | Yirmi saat, yarı zamanlı | GEÇTİ |
| 8 | `.halkalar[m1:66:h1].sahne.soru.opts[1]` | Kırk saat, tam zamanlı | GEÇTİ |
| 9 | `.halkalar[m1:66:h1].sahne.soru.opts[2]` | Yalnız hafta sonu | GEÇTİ |
| 10 | `.halkalar[m1:66:h2].title_tr` | Başvuru dosyası | GEÇTİ |
| 11 | `.halkalar[m1:66:h2].sahne.ortam_tr` | Fırında küçük bir masa. Ioana çantasından kâğıtlar çıkarıyor. | GEÇTİ |
| 12 | `.halkalar[m1:66:h2].sahne.soru.q_tr` | Ioana'nın başvuru için neye ihtiyacı var? | GEÇTİ |
| 13 | `.halkalar[m1:66:h2].sahne.soru.opts[0]` | Özgeçmiş ve diploma | GEÇTİ |
| 14 | `.halkalar[m1:66:h2].sahne.soru.opts[1]` | Yalnız bir fotoğraf | GEÇTİ |
| 15 | `.halkalar[m1:66:h2].sahne.soru.opts[2]` | Ehliyet | GEÇTİ |
| 16 | `.halkalar[m1:66:h3].title_tr` | Ne olmak istiyorsun, nerede çalışıyorsun? | GEÇTİ |
| 17 | `.halkalar[m1:66:h3].sahne.ortam_tr` | Fırında kahve içiyorsunuz. Ioana gülümsüyor. | GEÇTİ |
| 18 | `.halkalar[m1:66:h3].sahne.soru.q_tr` | Ioana ne olmak istiyor? | GEÇTİ |
| 19 | `.halkalar[m1:66:h3].sahne.soru.opts[0]` | Anaokulu eğitmeni | GEÇTİ |
| 20 | `.halkalar[m1:66:h3].sahne.soru.opts[1]` | Hasta bakıcı | GEÇTİ |
| 21 | `.halkalar[m1:66:h3].sahne.soru.opts[2]` | Aşçı | GEÇTİ |
| 22 | `.sahne.title_tr` | Ioana'nın iş ilanları | GEÇTİ |
| 23 | `.sahne.sahneler[s1].sahne_tr` | Cumartesi sabahı, Stadler fırınında küçük bir masa. Ioana elinde telefonla oturuyor, sana el sallıyor. | GEÇTİ |
| 24 | `.sahne.sahneler[s2].sahne_tr` | Ioana telefonu masaya koyuyor. | GEÇTİ |
| 25 | `.sahne.sahneler[s3].sahne_tr` | Ioana eski bir fotoğraf gösteriyor: çocuklarla bir oda. | GEÇTİ |
| 26 | `.sahne.sahneler[s4].sahne_tr` | Ioana omuz silkiyor. | GEÇTİ |
| 27 | `.sahne.sahneler[s5].sahne_tr` | Ioana gülüyor. | GEÇTİ |
| 28 | `.sahne.sahneler[s6].sahne_tr` | Ioana kahvesini karıştırıyor. | GEÇTİ |
| 29 | `.sahne.sahneler[s7].sahne_tr` | Ioana kararlı bir yüzle sana bakıyor. | GEÇTİ |
| 30 | `.sahne.sahneler[s8].sahne_tr` | Ioana telefonu sana uzatıyor. Ekranda üç ilan var. | GEÇTİ |
| 31 | `.sahne.sahneler[s9].sahne_tr` | Ioana birinci ilanı gösteriyor. | GEÇTİ |
| 32 | `.sahne.sahneler[s10].sahne_tr` | Ioana başını sallıyor. | GEÇTİ |
| 33 | `.sahne.sahneler[s11].sahne_tr` | Ioana ikinci ilanı gösteriyor, gözleri parlıyor. | GEÇTİ |
| 34 | `.sahne.sahneler[s12].sahne_tr` | Ioana ilanın son satırını okuyor, yüzü düşüyor. | GEÇTİ |
| 35 | `.sahne.sahneler[s13].sahne_tr` | Ioana üçüncü ilanı açıyor. | GEÇTİ |
| 36 | `.sahne.sahneler[s14].sahne_tr` | Ioana düşünüyor, sonra gülümsüyor. | GEÇTİ |
| 37 | `.sahne.sahneler[s15].sahne_tr` | Gerti Stadler kahveleri getiriyor, telefona göz atıyor. | GEÇTİ |
| 38 | `.sahne.sahneler[s16].sahne_tr` | Gerti vitrindeki kâğıdı gösteriyor. | GEÇTİ |
| 39 | `.sahne.sahneler[s17].sahne_tr` | Ioana gözlerini açıyor. | GEÇTİ |
| 40 | `.sahne.sahneler[s18].sahne_tr` | Gerti gülüyor. | GEÇTİ |
| 41 | `.sahne.sahneler[s19].sahne_tr` | Ioana nazikçe gülümsüyor. | GEÇTİ |
| 42 | `.sahne.sahneler[s20].sahne_tr` | Gerti sana dönüyor. | GEÇTİ |
| 43 | `.sahne.bolumler[b1].ana_fikir.q_tr` | Ioana ne anlatıyor? | GEÇTİ |
| 44 | `.sahne.bolumler[b1].ana_fikir.opts[0]` | Eski mesleğine geri dönmek istiyor | GEÇTİ |
| 45 | `.sahne.bolumler[b1].ana_fikir.opts[1]` | Memleketine dönmek istiyor | GEÇTİ |
| 46 | `.sahne.bolumler[b1].ana_fikir.opts[2]` | Fırında çalışmaya başladı | GEÇTİ |
| 47 | `.sahne.bolumler[b1].ayrinti[0].q_tr` | Ioana memleketinde ne iş yapıyordu? | GEÇTİ |
| 48 | `.sahne.bolumler[b1].ayrinti[0].opts[0]` | Anaokulu eğitmeniydi | GEÇTİ |
| 49 | `.sahne.bolumler[b1].ayrinti[0].opts[1]` | Hasta bakıcıydı | GEÇTİ |
| 50 | `.sahne.bolumler[b1].ayrinti[0].opts[2]` | Temizlik yapıyordu | GEÇTİ |
| 51 | `.sahne.bolumler[b1].ayrinti[1].q_tr` | Ioana burada başta neden eğitmen olarak çalışamadı? | GEÇTİ |
| 52 | `.sahne.bolumler[b1].ayrinti[1].opts[0]` | Almancası yeterli değildi | GEÇTİ |
| 53 | `.sahne.bolumler[b1].ayrinti[1].opts[1]` | İş yoktu | GEÇTİ |
| 54 | `.sahne.bolumler[b1].ayrinti[1].opts[2]` | Çocukları sevmiyordu | GEÇTİ |
| 55 | `.sahne.bolumler[b1].ayrinti[2].q_tr` | Ioana neden temizlik yaptı? | GEÇTİ |
| 56 | `.sahne.bolumler[b1].ayrinti[2].opts[0]` | Hızlıca para kazanması gerekiyordu | GEÇTİ |
| 57 | `.sahne.bolumler[b1].ayrinti[2].opts[1]` | Temizliği seviyordu | GEÇTİ |
| 58 | `.sahne.bolumler[b1].ayrinti[2].opts[2]` | Kurs için gerekliydi | GEÇTİ |
| 59 | `.sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 60 | `.sahne.bolumler[b1].dikte[d5].gorev_tr` | Ioana ne istiyor? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 61 | `.sahne.bolumler[b1].cevapla.situation_tr` | Ioana sana soruyor: Çocukken ne olmak istiyordun? **Als Kind wollte ich** ile başla. | GEÇTİ |
| 62 | `.sahne.bolumler[b1].cevapla.why_tr` | Çocukluktaki isteği **wollte** ile söylersin. **werden** en sona gider. | GEÇTİ |
| 63 | `.sahne.bolumler[b2].ana_fikir.q_tr` | Ioana ilanlara bakınca ne düşünüyor? | GEÇTİ |
| 64 | `.sahne.bolumler[b2].ana_fikir.opts[0]` | Önce staj yapıp burada deneyim kazanmak iyi olur | GEÇTİ |
| 65 | `.sahne.bolumler[b2].ana_fikir.opts[1]` | Hastanede tam zamanlı çalışmak istiyor | GEÇTİ |
| 66 | `.sahne.bolumler[b2].ana_fikir.opts[2]` | Hiçbir ilanı beğenmiyor | GEÇTİ |
| 67 | `.sahne.bolumler[b2].ayrinti[0].q_tr` | Ioana neden tam zamanlı çalışamıyor? | GEÇTİ |
| 68 | `.sahne.bolumler[b2].ayrinti[0].opts[0]` | Akşamları kursu var | GEÇTİ |
| 69 | `.sahne.bolumler[b2].ayrinti[0].opts[1]` | Çocuğu var | GEÇTİ |
| 70 | `.sahne.bolumler[b2].ayrinti[0].opts[2]` | Ehliyeti yok | GEÇTİ |
| 71 | `.sahne.bolumler[b2].ayrinti[1].q_tr` | İkinci ilanın sorunu ne? | GEÇTİ |
| 72 | `.sahne.bolumler[b2].ayrinti[1].opts[0]` | Burada deneyim istiyorlar | GEÇTİ |
| 73 | `.sahne.bolumler[b2].ayrinti[1].opts[1]` | Hafta sonu da çalışmak gerekiyor | GEÇTİ |
| 74 | `.sahne.bolumler[b2].ayrinti[1].opts[2]` | Tam zamanlı | GEÇTİ |
| 75 | `.sahne.bolumler[b2].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 76 | `.sahne.bolumler[b2].dikte[d5].gorev_tr` | Üç ilanda ne var? Almanca iki kısa cümleyle yaz. | GEÇTİ |
| 77 | `.sahne.bolumler[b2].cevapla.situation_tr` | Ioana senin fikrini soruyor. Stajın iyi olduğunu söyle: o zaman burada deneyimi olur. | GEÇTİ |
| 78 | `.sahne.bolumler[b2].cevapla.why_tr` | Öneri verirken **Mach das Praktikum!** ya da **Ich finde das Praktikum gut** dersin. | GEÇTİ |
| 79 | `.sahne.bolumler[b3].ana_fikir.q_tr` | Stadler Hanım ne söylüyor? | GEÇTİ |
| 80 | `.sahne.bolumler[b3].ana_fikir.opts[0]` | Fırın da yarı zamanlı birini arıyor | GEÇTİ |
| 81 | `.sahne.bolumler[b3].ana_fikir.opts[1]` | Fırın kapanıyor | GEÇTİ |
| 82 | `.sahne.bolumler[b3].ana_fikir.opts[2]` | Ioana'ya bedava kahve veriyor | GEÇTİ |
| 83 | `.sahne.bolumler[b3].ayrinti[0].q_tr` | Fırındaki iş saat kaçta başlıyor? | GEÇTİ |
| 84 | `.sahne.bolumler[b3].ayrinti[0].opts[0]` | Altıda | GEÇTİ |
| 85 | `.sahne.bolumler[b3].ayrinti[0].opts[1]` | Sekizde | GEÇTİ |
| 86 | `.sahne.bolumler[b3].ayrinti[0].opts[2]` | On birde | GEÇTİ |
| 87 | `.sahne.bolumler[b3].ayrinti[1].q_tr` | Ioana fırındaki işi neden istemiyor? | GEÇTİ |
| 88 | `.sahne.bolumler[b3].ayrinti[1].opts[0]` | Çocuklarla çalışmayı tercih ediyor | GEÇTİ |
| 89 | `.sahne.bolumler[b3].ayrinti[1].opts[1]` | Para az | GEÇTİ |
| 90 | `.sahne.bolumler[b3].ayrinti[1].opts[2]` | Fırın uzak | GEÇTİ |
| 91 | `.sahne.bolumler[b3].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 92 | `.sahne.bolumler[b3].dikte[d5].gorev_tr` | Fırının ilanında ne var? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 93 | `.sahne.bolumler[b3].cevapla.situation_tr` | Stadler Hanım soruyor: Fırın için birini tanıyor musun? Kurs arkadaşın Nina iş arıyor. Onun öğleden önce vakti var. | GEÇTİ |
| 94 | `.sahne.bolumler[b3].cevapla.why_tr` | Bir kadın için **sie sucht** dersin. Saati **am Vormittag** ile söylersin. | GEÇTİ |
| 95 | `.sesler[m1:66:a1].title_tr` | Radyoda iş ilanları | GEÇTİ |
| 96 | `.sesler[m1:66:a1].ortam_tr` | Pazartesi sabahı mutfakta yerel radyo açık. Sunucu kasabanın iş ilanlarını okuyor. | GEÇTİ |
| 97 | `.sesler[m1:66:a1].bolumler[b1].ana_fikir.q_tr` | Radyoda ne duyuyorsun? | GEÇTİ |
| 98 | `.sesler[m1:66:a1].bolumler[b1].ana_fikir.opts[0]` | Wendlfing'deki iş ilanlarını | GEÇTİ |
| 99 | `.sesler[m1:66:a1].bolumler[b1].ana_fikir.opts[1]` | Hava durumunu | GEÇTİ |
| 100 | `.sesler[m1:66:a1].bolumler[b1].ana_fikir.opts[2]` | Kurs ilanlarını | GEÇTİ |
| 101 | `.sesler[m1:66:a1].bolumler[b1].ayrinti[0].q_tr` | Hastane kimi arıyor? | GEÇTİ |
| 102 | `.sesler[m1:66:a1].bolumler[b1].ayrinti[0].opts[0]` | İki bakıcı, tam zamanlı | GEÇTİ |
| 103 | `.sesler[m1:66:a1].bolumler[b1].ayrinti[0].opts[1]` | Bir aşçı, hafta sonu | GEÇTİ |
| 104 | `.sesler[m1:66:a1].bolumler[b1].ayrinti[0].opts[2]` | Bir eğitmen, yarı zamanlı | GEÇTİ |
| 105 | `.sesler[m1:66:a1].bolumler[b1].ayrinti[1].q_tr` | Restoranda deneyimin yoksa ne yapabilirsin? | GEÇTİ |
| 106 | `.sesler[m1:66:a1].bolumler[b1].ayrinti[1].opts[0]` | Staj yapabilirsin | GEÇTİ |
| 107 | `.sesler[m1:66:a1].bolumler[b1].ayrinti[1].opts[1]` | Önce kursa gitmelisin | GEÇTİ |
| 108 | `.sesler[m1:66:a1].bolumler[b1].ayrinti[1].opts[2]` | Hafta içi çalışabilirsin | GEÇTİ |
| 109 | `.sesler[m1:66:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 110 | `.sesler[m1:66:a1].bolumler[b1].dikte[d5].gorev_tr` | Restoran ne arıyor? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 111 | `.sesler[m1:66:a1].bolumler[b1].cevapla.situation_tr` | Derya radyoyu duymamış. Restoranın ne aradığını ona söyle. | GEÇTİ |
| 112 | `.sesler[m1:66:a1].bolumler[b1].cevapla.why_tr` | Aranan kişi için **einen Koch** dersin, çünkü **der Koch** burada **einen** olur. | GEÇTİ |
| 113 | `.sesler[m1:66:a1].eylem.q_tr` | Hastanedeki işi istiyorsun. Ne yapmalısın? | GEÇTİ |
| 114 | `.sesler[m1:66:a1].eylem.opts[0]` | Başvurunu cumaya kadar gönder. | GEÇTİ |
| 115 | `.sesler[m1:66:a1].eylem.opts[1]` | Cumartesi hastaneye git. | GEÇTİ |
| 116 | `.sesler[m1:66:a1].eylem.opts[2]` | Restoranı ara. | GEÇTİ |
| 117 | `.sesler[m1:66:a1].eylem.why_tr` | Başvurular cumaya kadar gönderilmeli. | GEÇTİ |
| 118 | `.sesler[m1:66:a2].title_tr` | Derya'dan sesli mesaj | GEÇTİ |
| 119 | `.sesler[m1:66:a2].ortam_tr` | Cumartesi öğleden sonra telefonuna bakıyorsun. İş arkadaşın Derya mesaj bırakmış. | GEÇTİ |
| 120 | `.sesler[m1:66:a2].bolumler[b1].ana_fikir.q_tr` | Derya neden aradı? | GEÇTİ |
| 121 | `.sesler[m1:66:a2].bolumler[b1].ana_fikir.opts[0]` | Ioana için bir iş haberi var | GEÇTİ |
| 122 | `.sesler[m1:66:a2].bolumler[b1].ana_fikir.opts[1]` | Seni yemeğe çağırıyor | GEÇTİ |
| 123 | `.sesler[m1:66:a2].bolumler[b1].ana_fikir.opts[2]` | İşe geç kalacak | GEÇTİ |
| 124 | `.sesler[m1:66:a2].bolumler[b1].ayrinti[0].q_tr` | Ioana özgeçmişini ne zamana kadar göndermeli? | GEÇTİ |
| 125 | `.sesler[m1:66:a2].bolumler[b1].ayrinti[0].opts[0]` | Çarşambaya kadar | GEÇTİ |
| 126 | `.sesler[m1:66:a2].bolumler[b1].ayrinti[0].opts[1]` | Cumaya kadar | GEÇTİ |
| 127 | `.sesler[m1:66:a2].bolumler[b1].ayrinti[0].opts[2]` | Bu akşama kadar | GEÇTİ |
| 128 | `.sesler[m1:66:a2].bolumler[b1].ayrinti[1].q_tr` | Derya'nın kız kardeşi ne iş yapıyor? | GEÇTİ |
| 129 | `.sesler[m1:66:a2].bolumler[b1].ayrinti[1].opts[0]` | Eğitmen | GEÇTİ |
| 130 | `.sesler[m1:66:a2].bolumler[b1].ayrinti[1].opts[1]` | Bakıcı | GEÇTİ |
| 131 | `.sesler[m1:66:a2].bolumler[b1].ayrinti[1].opts[2]` | Aşçı | GEÇTİ |
| 132 | `.sesler[m1:66:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 133 | `.sesler[m1:66:a2].bolumler[b1].dikte[d5].gorev_tr` | Ioana'ya Derya'nın haberini kısa bir mesajla yaz. | GEÇTİ |
| 134 | `.sesler[m1:66:a2].bolumler[b1].cevapla.situation_tr` | Akşam Derya'yı geri arıyorsun. Mesaj için teşekkür et, numarayı iste. | GEÇTİ |
| 135 | `.sesler[m1:66:a2].bolumler[b1].cevapla.why_tr` | Önce teşekkür et: **Danke für die Nachricht**. Sonra numarayı sor. | GEÇTİ |
| 136 | `.sesler[m1:66:a2].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 137 | `.sesler[m1:66:a2].eylem.opts[0]` | Ioana'ya haber ver, akşam Derya'yı ara. | GEÇTİ |
| 138 | `.sesler[m1:66:a2].eylem.opts[1]` | Derya'nın kız kardeşini hemen ara. | GEÇTİ |
| 139 | `.sesler[m1:66:a2].eylem.opts[2]` | Hiçbir şey, Ioana kendisi arayacak. | GEÇTİ |
| 140 | `.sesler[m1:66:a2].eylem.why_tr` | Derya akşam aranmak istiyor. Ioana'nın da çarşambaya kadar özgeçmiş göndermesi gerek. | GEÇTİ |
| 141 | `.prova.title_tr` | Vitrindeki ilan: Nina için sor | GEÇTİ |
| 142 | `.prova.durum_tr` | Kurs arkadaşın Nina iş arıyor. Yalnız öğleden önce vakti var, dükkân deneyimi yok. Stadler fırınının vitrininde bir ilan görüyorsun. Stadler Hanım'a Nina için sor: saatler, deneyim, gereken belge. | GEÇTİ |
| 143 | `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Kibarca hayır deyip hemen konuya geçtin. | GEÇTİ |
| 144 | `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Siparişini verdin. Şimdi ilanı sormayı unutma. | GEÇTİ |
| 145 | `.prova.dugumler[n1b].secenekler[0].geri_bildirim_tr` | Yerinde bir soru: **noch frei** hâlâ boş demek. | GEÇTİ |
| 146 | `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Kimin için sorduğunu açıkça söyledin. | GEÇTİ |
| 147 | `.prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Bu ilan yarı zamanlı ve sen Nina için soruyorsun. **Für eine Freundin** de. | GEÇTİ |
| 148 | `.prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Saatin uyduğunu söyledin: **am Vormittag**. | GEÇTİ |
| 149 | `.prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Nina'nın öğleden önce vakti var. **am Vormittag** de. | GEÇTİ |
| 150 | `.prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Eksiği dürüstçe söyledin, ardından iyi yanını ekledin. | GEÇTİ |
| 151 | `.prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Nina'nın deneyimi yok. **Nein, leider nicht** de, sonra iyi bir yanını söyle. | GEÇTİ |
| 152 | `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Gereken belgeleri sordun. | GEÇTİ |
| 153 | `.prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Emin olmak için sordun. Bu iyi bir alışkanlık. | GEÇTİ |
| 154 | `.prova.dugumler[n6].secenekler[0].geri_bildirim_tr` | Tarihi **Bis wann?** ile sordun. | GEÇTİ |
| 155 | `.prova.dugumler[n6].secenekler[1].geri_bildirim_tr` | Kısa ve kibar. Tarihi Stadler Hanım kendisi söyleyecek. | GEÇTİ |
| 156 | `.prova.dugumler[n7].secenekler[0].geri_bildirim_tr` | Sohbeti sıcak bir şekilde bitirdin. | GEÇTİ |
| 157 | `.prova.dugumler[n7].secenekler[1].geri_bildirim_tr` | Kibar bir kapanış. | GEÇTİ |
| 158 | `.prova.kapanis_tr` | Bir arkadaşın için iş ilanını sordun. Saatleri, deneyimi ve gereken belgeyi öğrendin. | GEÇTİ |
| 159 | `.okuma_yazma.title_tr` | Dört iş ilanı: kime hangisi? | GEÇTİ |
| 160 | `.okuma_yazma.sorular[m1:66:o1].q_tr` | Hangi ilanda hafta sonu da çalışırsın? | GEÇTİ |
| 161 | `.okuma_yazma.sorular[m1:66:o1].opts[0]` | İlan A | GEÇTİ |
| 162 | `.okuma_yazma.sorular[m1:66:o1].opts[1]` | İlan B | GEÇTİ |
| 163 | `.okuma_yazma.sorular[m1:66:o1].opts[2]` | İlan C | GEÇTİ |
| 164 | `.okuma_yazma.sorular[m1:66:o2].q_tr` | Hangi ilanda deneyim gerekmiyor? | GEÇTİ |
| 165 | `.okuma_yazma.sorular[m1:66:o2].opts[0]` | İlan C | GEÇTİ |
| 166 | `.okuma_yazma.sorular[m1:66:o2].opts[1]` | İlan A | GEÇTİ |
| 167 | `.okuma_yazma.sorular[m1:66:o2].opts[2]` | İlan B | GEÇTİ |
| 168 | `.okuma_yazma.sorular[m1:66:o3].q_tr` | Nina: **Ich habe nur am Vormittag Zeit. Ich möchte gern in einem Laden arbeiten.** Nina'ya hangi ilan uygun? | GEÇTİ |
| 169 | `.okuma_yazma.sorular[m1:66:o3].opts[0]` | İlan A | GEÇTİ |
| 170 | `.okuma_yazma.sorular[m1:66:o3].opts[1]` | İlan B | GEÇTİ |
| 171 | `.okuma_yazma.sorular[m1:66:o3].opts[2]` | İlan C | GEÇTİ |
| 172 | `.okuma_yazma.sorular[m1:66:o3].opts[3]` | İlan D | GEÇTİ |
| 173 | `.okuma_yazma.sorular[m1:66:o3].opts[4]` | Hiçbiri | GEÇTİ |
| 174 | `.okuma_yazma.sorular[m1:66:o3].why_tr` | Fırın dükkân için birini arıyor, iş öğleden önce. | GEÇTİ |
| 175 | `.okuma_yazma.sorular[m1:66:o4].q_tr` | Jonas: **Ich bin jung und habe keine Erfahrung. Ich möchte viel lernen und ein bisschen Geld verdienen.** Jonas'a hangi ilan uygun? | GEÇTİ |
| 176 | `.okuma_yazma.sorular[m1:66:o4].opts[0]` | İlan A | GEÇTİ |
| 177 | `.okuma_yazma.sorular[m1:66:o4].opts[1]` | İlan B | GEÇTİ |
| 178 | `.okuma_yazma.sorular[m1:66:o4].opts[2]` | İlan C | GEÇTİ |
| 179 | `.okuma_yazma.sorular[m1:66:o4].opts[3]` | İlan D | GEÇTİ |
| 180 | `.okuma_yazma.sorular[m1:66:o4].opts[4]` | Hiçbiri | GEÇTİ |
| 181 | `.okuma_yazma.sorular[m1:66:o4].why_tr` | Stajda çok şey öğrenir ve biraz para kazanır. | GEÇTİ |
| 182 | `.okuma_yazma.sorular[m1:66:o5].q_tr` | Elif: **Ich war zehn Jahre Pflegerin in meiner Heimat. Ich möchte Vollzeit arbeiten, auch am Wochenende.** Elif'e hangi ilan uygun? | GEÇTİ |
| 183 | `.okuma_yazma.sorular[m1:66:o5].opts[0]` | İlan A | GEÇTİ |
| 184 | `.okuma_yazma.sorular[m1:66:o5].opts[1]` | İlan B | GEÇTİ |
| 185 | `.okuma_yazma.sorular[m1:66:o5].opts[2]` | İlan C | GEÇTİ |
| 186 | `.okuma_yazma.sorular[m1:66:o5].opts[3]` | İlan D | GEÇTİ |
| 187 | `.okuma_yazma.sorular[m1:66:o5].opts[4]` | Hiçbiri | GEÇTİ |
| 188 | `.okuma_yazma.sorular[m1:66:o5].why_tr` | Hastane deneyimli, tam zamanlı bir bakıcı arıyor. | GEÇTİ |
| 189 | `.okuma_yazma.sorular[m1:66:o6].q_tr` | David: **Ich bin Koch und suche eine Stelle in Vollzeit.** David'e hangi ilan uygun? | GEÇTİ |
| 190 | `.okuma_yazma.sorular[m1:66:o6].opts[0]` | İlan A | GEÇTİ |
| 191 | `.okuma_yazma.sorular[m1:66:o6].opts[1]` | İlan B | GEÇTİ |
| 192 | `.okuma_yazma.sorular[m1:66:o6].opts[2]` | İlan C | GEÇTİ |
| 193 | `.okuma_yazma.sorular[m1:66:o6].opts[3]` | İlan D | GEÇTİ |
| 194 | `.okuma_yazma.sorular[m1:66:o6].opts[4]` | Hiçbiri | GEÇTİ |
| 195 | `.okuma_yazma.sorular[m1:66:o6].why_tr` | Hiçbir ilan aşçı aramıyor. Sınavda da böyle bir kişi olur. | GEÇTİ |
| 196 | `.okuma_yazma.sorular[m1:66:o7].q_tr` | Ioana: **Ich möchte wieder Erzieherin werden. Am Abend habe ich einen Kurs.** Ioana'ya hangi ilan uygun? | GEÇTİ |
| 197 | `.okuma_yazma.sorular[m1:66:o7].opts[0]` | İlan A | GEÇTİ |
| 198 | `.okuma_yazma.sorular[m1:66:o7].opts[1]` | İlan B | GEÇTİ |
| 199 | `.okuma_yazma.sorular[m1:66:o7].opts[2]` | İlan C | GEÇTİ |
| 200 | `.okuma_yazma.sorular[m1:66:o7].opts[3]` | İlan D | GEÇTİ |
| 201 | `.okuma_yazma.sorular[m1:66:o7].opts[4]` | Hiçbiri | GEÇTİ |
| 202 | `.okuma_yazma.sorular[m1:66:o7].why_tr` | Eğitmen ilanı yarı zamanlı ve öğleden önce. Akşam kursuna engel değil. | GEÇTİ |
| 203 | `.okuma_yazma.sorular[m1:66:o8].instr_tr` | Geçmişe çevir. **Früher** ile başla. | GEÇTİ |
| 204 | `.okuma_yazma.sorular[m1:66:o8].why_tr` | **muss** geçmişte **musste** olur. **arbeiten** en sonda kalır. | GEÇTİ |
| 205 | `.okuma_yazma.sorular[m1:66:o9].instr_tr` | Geçmişe çevir. **Als Kind** ile başla. | GEÇTİ |
| 206 | `.okuma_yazma.sorular[m1:66:o9].why_tr` | **will** geçmişte **wollte** olur. Cümle **Als Kind** ile başlayınca **wollte** ikinci yere gelir. | GEÇTİ |
| 207 | `.okuma_yazma.sorular[m1:66:o10].situation_tr` | Ioana soruyor: Sen tam zamanlı mı yarı zamanlı mı çalışmak istersin? Kendin hakkında bir iki cümle söyle. | GEÇTİ |
| 208 | `.okuma_yazma.sorular[m1:66:o10].why_tr` | **Ich möchte** derken asıl fiil **arbeiten** en sona gider. | **GERİ** (Terim: **asıl fiil**) |
| 209 | `.okuma_yazma.yazma.gorev_tr` | İlanlardan birini seç ve kısa bir başvuru mesajı yaz. Hangi ilanı gördün, ne zaman çalışabilirsin, neyi iyi yaparsın? Bilgiyi uydurabilirsin. Sonuna adını yaz. | GEÇTİ |
| 210 | `.okuma_yazma.yazma.kontrol_tr[0]` | Hangi ilanı gördüğünü yazdın mı? | GEÇTİ |
| 211 | `.okuma_yazma.yazma.kontrol_tr[1]` | Ne zaman çalışabileceğini yazdın mı? | GEÇTİ |
| 212 | `.okuma_yazma.yazma.kontrol_tr[2]` | Neyi iyi yaptığını **Ich kann gut** ile yazdın mı? | GEÇTİ |
| 213 | `.gun_sinavi.maddeler[m1:66:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 214 | `.gun_sinavi.maddeler[m1:66:s1].why_tr` | **in Teilzeit** yarı zamanlı demek. | GEÇTİ |
| 215 | `.gun_sinavi.maddeler[m1:66:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 216 | `.gun_sinavi.maddeler[m1:66:s2].why_tr` | **werden** en sona gider. | GEÇTİ |
| 217 | `.gun_sinavi.maddeler[m1:66:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 218 | `.gun_sinavi.maddeler[m1:66:s3].why_tr` | **der Lebenslauf** burada **Ihren Lebenslauf** olur. | GEÇTİ |
| 219 | `.gun_sinavi.maddeler[m1:66:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 220 | `.gun_sinavi.maddeler[m1:66:s4].why_tr` | **musste** iki s ile yazılır. | GEÇTİ |
| 221 | `.gun_sinavi.maddeler[m1:66:s5].why_tr` | Evet ya da hayır sorusunda **Arbeiten Sie** başa gelir. | GEÇTİ |
| 222 | `.gun_sinavi.maddeler[m1:66:s6].why_tr` | Staj yapmak **ein Praktikum machen** olur. **machen** en sona gider. | GEÇTİ |
| 223 | `.gun_sinavi.maddeler[m1:66:s7].why_tr` | Kim diye sorarken **Wer** başa gelir. | GEÇTİ |
| 224 | `.gun_sinavi.maddeler[m1:66:s8].why_tr` | Geçmişteki istek **wollte** olur. Meslek adının önüne **ein** gelmez. | GEÇTİ |
| 225 | `.gun_sinavi.maddeler[m1:66:s9].situation_tr` | Stadler Hanım arkadaşının ne zaman çalışabileceğini soruyor. Yalnız öğleden önce çalışabileceğini söyle. | GEÇTİ |
| 226 | `.gun_sinavi.maddeler[m1:66:s9].why_tr` | **am Vormittag** öğleden önce demek. **arbeiten** en sona gider. | GEÇTİ |
| 227 | `.gun_sinavi.maddeler[m1:66:s10].situation_tr` | Bir iş yerinde soruyorlar. Evet de, ama diplomanın Almanca olmadığını ekle. | GEÇTİ |
| 228 | `.gun_sinavi.maddeler[m1:66:s10].why_tr` | **aber** iki fikri bağlar: evet ama. | GEÇTİ |
| 229 | `.gun_sinavi.maddeler[m1:66:s11].situation_tr` | Bir dükkâna giriyorsun. İlanı sor: iş yarı zamanlı mı, saatler ne? | GEÇTİ |
| 230 | `.gun_sinavi.maddeler[m1:66:s11].why_tr` | Önce konuyu söyle: **eine Frage zur Stellenanzeige**. Sonra soruyu sor. | GEÇTİ |

### `content/v2/m1/gun-67.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.title_tr` | Kurs bilgisi almak, yardım istemek | GEÇTİ |
| 2 | `.goal_tr` | Bir kurs ilanını okur, kurs bürosunu arayıp kaydı, belgeyi ve yeri sorarsın. **Kannst du mir helfen?** ile yardım ister, **Soll ich dir helfen?** ile yardım önerirsin. | GEÇTİ |
| 3 | `.can_do.tr` | Telefonda bir kurs hakkında bilgi sorar, anlamadığımda yardım ister, başkasına yardım öneririm. | GEÇTİ |
| 4 | `.halkalar[m1:67:h1].title_tr` | Kursta | GEÇTİ |
| 5 | `.halkalar[m1:67:h1].sahne.ortam_tr` | Akşam kursunda ara. Ioana yorgun görünüyor. | GEÇTİ |
| 6 | `.halkalar[m1:67:h1].sahne.soru.q_tr` | Ioana dün neden derste değildi? | GEÇTİ |
| 7 | `.halkalar[m1:67:h1].sahne.soru.opts[0]` | Çalışmak zorundaydı | GEÇTİ |
| 8 | `.halkalar[m1:67:h1].sahne.soru.opts[1]` | Hastaydı | GEÇTİ |
| 9 | `.halkalar[m1:67:h1].sahne.soru.opts[2]` | Unuttu | GEÇTİ |
| 10 | `.halkalar[m1:67:h2].title_tr` | Ek eğitim ve diploma | GEÇTİ |
| 11 | `.halkalar[m1:67:h2].sahne.ortam_tr` | İş yerinde mola. Wimmer Bey elinde bir kâğıtla geliyor. | GEÇTİ |
| 12 | `.halkalar[m1:67:h2].sahne.soru.q_tr` | Ek eğitim ne zaman? | GEÇTİ |
| 13 | `.halkalar[m1:67:h2].sahne.soru.opts[0]` | Pazartesi ve çarşamba akşamı | GEÇTİ |
| 14 | `.halkalar[m1:67:h2].sahne.soru.opts[1]` | Cumartesi sabahı | GEÇTİ |
| 15 | `.halkalar[m1:67:h2].sahne.soru.opts[2]` | Her gün öğleden sonra | GEÇTİ |
| 16 | `.halkalar[m1:67:h3].title_tr` | Yardım istemek, yardım önermek | GEÇTİ |
| 17 | `.halkalar[m1:67:h3].sahne.ortam_tr` | Ofiste. Tobi bilgisayarın başında, saçını karıştırıyor. | GEÇTİ |
| 18 | `.halkalar[m1:67:h3].sahne.soru.q_tr` | Tobi neden yardım istiyor? | GEÇTİ |
| 19 | `.halkalar[m1:67:h3].sahne.soru.opts[0]` | Ek eğitim formunu dolduramıyor | GEÇTİ |
| 20 | `.halkalar[m1:67:h3].sahne.soru.opts[1]` | Bilgisayarı bozuldu | GEÇTİ |
| 21 | `.halkalar[m1:67:h3].sahne.soru.opts[2]` | Kursa geç kaldı | GEÇTİ |
| 22 | `.sahne.title_tr` | Firma bir ek eğitim sunuyor | GEÇTİ |
| 23 | `.sahne.sahneler[s1].sahne_tr` | Mola odası. Wimmer Bey elinde kâğıtlarla hızlı hızlı giriyor. | GEÇTİ |
| 24 | `.sahne.sahneler[s2].sahne_tr` | Wimmer Bey kâğıtları masaya koyuyor. | GEÇTİ |
| 25 | `.sahne.sahneler[s3].sahne_tr` | Wimmer Bey iki kâğıdı gösteriyor. | GEÇTİ |
| 26 | `.sahne.sahneler[s4].sahne_tr` | Wimmer Bey takvime bakıyor. | GEÇTİ |
| 27 | `.sahne.sahneler[s5].sahne_tr` | Derya kahvesini bırakıyor. | GEÇTİ |
| 28 | `.sahne.sahneler[s6].sahne_tr` | Wimmer Bey ciddi bir yüzle bakıyor. | GEÇTİ |
| 29 | `.sahne.sahneler[s7].sahne_tr` | Wimmer Bey çıkınca Derya sana dönüyor. | GEÇTİ |
| 30 | `.sahne.sahneler[s8].sahne_tr` | Öğleden sonra ofiste. Tobi bilgisayarın başında, saçını karıştırıyor. | GEÇTİ |
| 31 | `.sahne.sahneler[s9].sahne_tr` | Derya sandalyesini Tobi'ye doğru çeviriyor. | GEÇTİ |
| 32 | `.sahne.sahneler[s10].sahne_tr` | Tobi ekranı gösteriyor. | GEÇTİ |
| 33 | `.sahne.sahneler[s11].sahne_tr` | Derya ayağa kalkıyor. | GEÇTİ |
| 34 | `.sahne.sahneler[s12].sahne_tr` | Derya Tobi'nin yanına oturuyor. | GEÇTİ |
| 35 | `.sahne.sahneler[s13].sahne_tr` | Tobi bir satırı gösteriyor. | GEÇTİ |
| 36 | `.sahne.sahneler[s14].sahne_tr` | Derya sabırla anlatıyor. | GEÇTİ |
| 37 | `.sahne.sahneler[s15].sahne_tr` | Tobi rahatlıyor, gülüyor. | GEÇTİ |
| 38 | `.sahne.sahneler[s16].sahne_tr` | Akşam kursu, ders başlamadan önce. Ioana yanına oturuyor. | GEÇTİ |
| 39 | `.sahne.sahneler[s17].sahne_tr` | Ioana defterini açıyor. | GEÇTİ |
| 40 | `.sahne.sahneler[s18].sahne_tr` | Ioana bir kâğıt parçası gösteriyor. | GEÇTİ |
| 41 | `.sahne.sahneler[s19].sahne_tr` | Ioana yüzünü buruşturuyor. | GEÇTİ |
| 42 | `.sahne.sahneler[s20].sahne_tr` | Ioana ellerini birleştiriyor. | GEÇTİ |
| 43 | `.sahne.bolumler[b1].ana_fikir.q_tr` | Wimmer Bey ne haber veriyor? | GEÇTİ |
| 44 | `.sahne.bolumler[b1].ana_fikir.opts[0]` | Firma iki ek eğitim sunuyor ve parasını ödüyor | GEÇTİ |
| 45 | `.sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni bir şef geliyor | GEÇTİ |
| 46 | `.sahne.bolumler[b1].ana_fikir.opts[2]` | Mola saatleri değişiyor | GEÇTİ |
| 47 | `.sahne.bolumler[b1].ayrinti[0].q_tr` | Dersler hangi günler? | GEÇTİ |
| 48 | `.sahne.bolumler[b1].ayrinti[0].opts[0]` | Pazartesi ve çarşamba | GEÇTİ |
| 49 | `.sahne.bolumler[b1].ayrinti[0].opts[1]` | Hafta sonu | GEÇTİ |
| 50 | `.sahne.bolumler[b1].ayrinti[0].opts[2]` | Her sabah | GEÇTİ |
| 51 | `.sahne.bolumler[b1].ayrinti[1].q_tr` | Wimmer Bey ne istiyor? | GEÇTİ |
| 52 | `.sahne.bolumler[b1].ayrinti[1].opts[0]` | Düzenli gelinmesini | GEÇTİ |
| 53 | `.sahne.bolumler[b1].ayrinti[1].opts[1]` | Sınavın geçilmesini | GEÇTİ |
| 54 | `.sahne.bolumler[b1].ayrinti[1].opts[2]` | Kursu çalışanların ödemesini | GEÇTİ |
| 55 | `.sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 56 | `.sahne.bolumler[b1].dikte[d5].gorev_tr` | Wimmer Bey ne söyledi? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 57 | `.sahne.bolumler[b1].cevapla.situation_tr` | Derya soruyor: Dil kursuna gitmek istiyor musun? Kendin hakkında cevap ver. | GEÇTİ |
| 58 | `.sahne.bolumler[b1].cevapla.why_tr` | **Ich möchte** derken asıl fiil **machen** en sona gider. | **GERİ** (Terim: **asıl fiil**) |
| 59 | `.sahne.bolumler[b2].ana_fikir.q_tr` | Bu bölümde ne oluyor? | GEÇTİ |
| 60 | `.sahne.bolumler[b2].ana_fikir.opts[0]` | Tobi yardım istiyor, Derya ona formu gösteriyor | GEÇTİ |
| 61 | `.sahne.bolumler[b2].ana_fikir.opts[1]` | Derya Tobi'den yardım istiyor | GEÇTİ |
| 62 | `.sahne.bolumler[b2].ana_fikir.opts[2]` | Tobi kursa gitmek istemiyor | GEÇTİ |
| 63 | `.sahne.bolumler[b2].ayrinti[0].q_tr` | Tobi hangi kelimeyi anlamıyor? | GEÇTİ |
| 64 | `.sahne.bolumler[b2].ayrinti[1].q_tr` | Derya'ya göre Abschluss ne demek? | GEÇTİ |
| 65 | `.sahne.bolumler[b2].ayrinti[1].opts[0]` | Okuldan ya da meslek eğitiminden alınan diploma | GEÇTİ |
| 66 | `.sahne.bolumler[b2].ayrinti[1].opts[1]` | Kursun son günü | GEÇTİ |
| 67 | `.sahne.bolumler[b2].ayrinti[1].opts[2]` | Kursun fiyatı | GEÇTİ |
| 68 | `.sahne.bolumler[b2].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 69 | `.sahne.bolumler[b2].dikte[d5].gorev_tr` | Tobi ne istedi, Derya ne yaptı? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 70 | `.sahne.bolumler[b2].cevapla.situation_tr` | Bir iş arkadaşın formu anlamıyor. Ona yardım öner. | GEÇTİ |
| 71 | `.sahne.bolumler[b2].cevapla.why_tr` | Yardım önerirken **Soll ich dir helfen?** dersin. | GEÇTİ |
| 72 | `.sahne.bolumler[b3].ana_fikir.q_tr` | Ioana senden ne istiyor? | GEÇTİ |
| 73 | `.sahne.bolumler[b3].ana_fikir.opts[0]` | Kurs bürosunu onun için aramanı | GEÇTİ |
| 74 | `.sahne.bolumler[b3].ana_fikir.opts[1]` | Başvurusunu yazmanı | GEÇTİ |
| 75 | `.sahne.bolumler[b3].ana_fikir.opts[2]` | Ona ders vermeni | GEÇTİ |
| 76 | `.sahne.bolumler[b3].ayrinti[0].q_tr` | Ioana neden daha çok Almanca istiyor? | GEÇTİ |
| 77 | `.sahne.bolumler[b3].ayrinti[0].opts[0]` | Eğitmenlik işi için | GEÇTİ |
| 78 | `.sahne.bolumler[b3].ayrinti[0].opts[1]` | Bir sınav için | GEÇTİ |
| 79 | `.sahne.bolumler[b3].ayrinti[0].opts[2]` | Tatil için | GEÇTİ |
| 80 | `.sahne.bolumler[b3].ayrinti[1].q_tr` | Numarayı Ioana'ya kim verdi? | GEÇTİ |
| 81 | `.sahne.bolumler[b3].ayrinti[1].opts[0]` | Kurs öğretmeni | GEÇTİ |
| 82 | `.sahne.bolumler[b3].ayrinti[1].opts[1]` | Derya | GEÇTİ |
| 83 | `.sahne.bolumler[b3].ayrinti[1].opts[2]` | Wimmer Bey | GEÇTİ |
| 84 | `.sahne.bolumler[b3].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 85 | `.sahne.bolumler[b3].dikte[d5].gorev_tr` | Ioana ne istiyor? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 86 | `.sahne.bolumler[b3].cevapla.situation_tr` | Ioana yardım istiyor. Kabul et ve ne zaman arayacağını söyle. | GEÇTİ |
| 87 | `.sahne.bolumler[b3].cevapla.why_tr` | **anrufen** iki parçalı: **Ich rufe morgen an**. **an** en sona gider. | GEÇTİ |
| 88 | `.sesler[m1:67:a1].title_tr` | Kurs bürosunun telefon kaydı | GEÇTİ |
| 89 | `.sesler[m1:67:a1].ortam_tr` | Cuma öğleden sonra kurs bürosunu arıyorsun. Kimse açmıyor, bir kayıt çalıyor. | GEÇTİ |
| 90 | `.sesler[m1:67:a1].bolumler[b1].ana_fikir.q_tr` | Bu kayıt ne diyor? | GEÇTİ |
| 91 | `.sesler[m1:67:a1].bolumler[b1].ana_fikir.opts[0]` | Büro şu an kapalı, ne zaman açık olduğunu söylüyor | GEÇTİ |
| 92 | `.sesler[m1:67:a1].bolumler[b1].ana_fikir.opts[1]` | Kurslar iptal edildi | GEÇTİ |
| 93 | `.sesler[m1:67:a1].bolumler[b1].ana_fikir.opts[2]` | Kurslarda yer kalmadı | GEÇTİ |
| 94 | `.sesler[m1:67:a1].bolumler[b1].ayrinti[0].q_tr` | Büro hangi günler açık? | GEÇTİ |
| 95 | `.sesler[m1:67:a1].bolumler[b1].ayrinti[0].opts[0]` | Pazartesiden perşembeye | GEÇTİ |
| 96 | `.sesler[m1:67:a1].bolumler[b1].ayrinti[0].opts[1]` | Her gün | GEÇTİ |
| 97 | `.sesler[m1:67:a1].bolumler[b1].ayrinti[0].opts[2]` | Yalnız cuma | GEÇTİ |
| 98 | `.sesler[m1:67:a1].bolumler[b1].ayrinti[1].q_tr` | Yeni kurslar ne zaman başlıyor? | GEÇTİ |
| 99 | `.sesler[m1:67:a1].bolumler[b1].ayrinti[1].opts[0]` | Martta | GEÇTİ |
| 100 | `.sesler[m1:67:a1].bolumler[b1].ayrinti[1].opts[1]` | Mayısta | GEÇTİ |
| 101 | `.sesler[m1:67:a1].bolumler[b1].ayrinti[1].opts[2]` | Pazartesi | GEÇTİ |
| 102 | `.sesler[m1:67:a1].bolumler[b1].dikte[d1].q_tr` | Hangi günü duydun? | GEÇTİ |
| 103 | `.sesler[m1:67:a1].bolumler[b1].dikte[d5].gorev_tr` | Kayıtta ne dendi? Almanca bir iki kısa cümleyle yaz. | GEÇTİ |
| 104 | `.sesler[m1:67:a1].bolumler[b1].cevapla.situation_tr` | Kayıttan sonra sinyal sesi geliyor. Adını söyle, dil kursuyla ilgili bir sorun olduğunu söyle ve geri aranmak iste. | GEÇTİ |
| 105 | `.sesler[m1:67:a1].bolumler[b1].cevapla.why_tr` | Telefon kaydında önce adını, sonra konuyu söylersin. **zurückrufen** geri aramak demek. | GEÇTİ |
| 106 | `.sesler[m1:67:a1].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 107 | `.sesler[m1:67:a1].eylem.opts[0]` | Adını ve numaranı bırak ya da pazartesi dokuzla on iki arasında tekrar ara. | GEÇTİ |
| 108 | `.sesler[m1:67:a1].eylem.opts[1]` | Cuma günü büroya git. | GEÇTİ |
| 109 | `.sesler[m1:67:a1].eylem.opts[2]` | Mart ayına kadar bekle. | GEÇTİ |
| 110 | `.sesler[m1:67:a1].eylem.why_tr` | Büro cuma kapalı. Ya mesaj bırakırsın ya da görüşme saatinde ararsın. | GEÇTİ |
| 111 | `.sesler[m1:67:a2].title_tr` | Kurs bürosundan sesli mesaj | GEÇTİ |
| 112 | `.sesler[m1:67:a2].ortam_tr` | Pazartesi sabahı telefonunda bir mesaj var. Kurs bürosundaki görevli seni geri aramış. | GEÇTİ |
| 113 | `.sesler[m1:67:a2].bolumler[b1].ana_fikir.q_tr` | Büro neden aradı? | GEÇTİ |
| 114 | `.sesler[m1:67:a2].bolumler[b1].ana_fikir.opts[0]` | Kurs hakkında bilgi veriyor | GEÇTİ |
| 115 | `.sesler[m1:67:a2].bolumler[b1].ana_fikir.opts[1]` | Kursun iptal olduğunu söylüyor | GEÇTİ |
| 116 | `.sesler[m1:67:a2].bolumler[b1].ana_fikir.opts[2]` | Sınav sonucunu bildiriyor | GEÇTİ |
| 117 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[0].q_tr` | Kurs ne zaman başlıyor? | GEÇTİ |
| 118 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[0].opts[0]` | Bir martta | GEÇTİ |
| 119 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[0].opts[1]` | Bir mayısta | GEÇTİ |
| 120 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[0].opts[2]` | Bu pazartesi | GEÇTİ |
| 121 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[1].q_tr` | Dersler hangi günler? | GEÇTİ |
| 122 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[1].opts[0]` | Pazartesi ve çarşamba | GEÇTİ |
| 123 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[1].opts[1]` | Salı ve perşembe | GEÇTİ |
| 124 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[1].opts[2]` | Cumartesi | GEÇTİ |
| 125 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[2].q_tr` | Kursun parasını belki kim öder? | GEÇTİ |
| 126 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[2].opts[0]` | İşverenin | GEÇTİ |
| 127 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[2].opts[1]` | Belediye | GEÇTİ |
| 128 | `.sesler[m1:67:a2].bolumler[b1].ayrinti[2].opts[2]` | Kurs öğretmeni | GEÇTİ |
| 129 | `.sesler[m1:67:a2].bolumler[b1].dikte[d1].q_tr` | Hangi günü duydun? | GEÇTİ |
| 130 | `.sesler[m1:67:a2].bolumler[b1].dikte[d5].gorev_tr` | Kurs hakkında iki bilgi yaz. | GEÇTİ |
| 131 | `.sesler[m1:67:a2].bolumler[b1].cevapla.situation_tr` | Kurs bürosunu geri arıyorsun. Kendini tanıt ve mesaj için teşekkür et. | GEÇTİ |
| 132 | `.sesler[m1:67:a2].bolumler[b1].cevapla.why_tr` | Geri ararken önce adını söyle, sonra **Danke für Ihre Nachricht** de. | GEÇTİ |
| 133 | `.sesler[m1:67:a2].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 134 | `.sesler[m1:67:a2].eylem.opts[0]` | Büroyu geri ara. Kursun parasını belki işverenin öder. | GEÇTİ |
| 135 | `.sesler[m1:67:a2].eylem.opts[1]` | Bir martta doğrudan kursa git. | GEÇTİ |
| 136 | `.sesler[m1:67:a2].eylem.opts[2]` | Hiçbir şey, kayıt tamam. | GEÇTİ |
| 137 | `.sesler[m1:67:a2].eylem.why_tr` | Büro geri aranmak istiyor. Kursun parasını belki işveren öder. | GEÇTİ |
| 138 | `.prova.title_tr` | Kurs bürosunu geri aramak | GEÇTİ |
| 139 | `.prova.durum_tr` | Kurs bürosunun mesajını dinledin ve büroyu geri arıyorsun. Üç şeyi bilmiyorsun. Kayıt ne zamana kadar? Kursun sonunda belge var mı? Ioana için de yer var mı? Anlamazsan tekrar iste. | GEÇTİ |
| 140 | `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Adını söyledin, teşekkür ettin ve konuyu açtın. | GEÇTİ |
| 141 | `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Arayan sensin. Önce adını söyle: **Guten Tag, hier ist** ve adın. | GEÇTİ |
| 142 | `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | İlk eksik bilgiyi sordun: kaydın son günü. | GEÇTİ |
| 143 | `.prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Fiyatı mesajda duydun: 200 avro. Bilmediğin şeyi sor: kayıt ne zamana kadar? | GEÇTİ |
| 144 | `.prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Anlamayınca tekrar istedin. Telefonda bu çok işe yarar. | GEÇTİ |
| 145 | `.prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Tarihi tekrar ettin. Böylece doğru anladığını gösterdin. | GEÇTİ |
| 146 | `.prova.dugumler[n3b].secenekler[0].geri_bildirim_tr` | Bu sefer anladın ve tarihi tekrar ettin. | GEÇTİ |
| 147 | `.prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | İkinci eksik bilgiyi sordun: kursun sonunda belge. | GEÇTİ |
| 148 | `.prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Daha iki sorun var: kursun sonundaki belge ve Ioana'nın yeri. | GEÇTİ |
| 149 | `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Üçüncü bilgiyi Ioana için sordun. | GEÇTİ |
| 150 | `.prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Bilmediğin kelimeyi **Was bedeutet Abschluss?** diye sordun. | GEÇTİ |
| 151 | `.prova.dugumler[n5b].secenekler[0].geri_bildirim_tr` | Anladın ve son sorunu sordun. | GEÇTİ |
| 152 | `.prova.dugumler[n6].secenekler[0].geri_bildirim_tr` | Kibarca yardım istedin: **Können Sie mir bitte helfen?** | GEÇTİ |
| 153 | `.prova.dugumler[n6].secenekler[1].geri_bildirim_tr` | Kısa ve net. Görevli şimdi yardım önerecek. | GEÇTİ |
| 154 | `.prova.dugumler[n7].secenekler[0].geri_bildirim_tr` | Öneriyi kabul ettin ve adresini verdin. | GEÇTİ |
| 155 | `.prova.dugumler[n7].secenekler[1].geri_bildirim_tr` | Kibarca hayır deyip kendi planını söyledin. | GEÇTİ |
| 156 | `.prova.kapanis_tr` | Kurs bürosunu aradın. Kayıt tarihini, kursun sonundaki belgeyi ve arkadaşının yerini öğrendin. Anlamadığında tekrar istedin. | GEÇTİ |
| 157 | `.okuma_yazma.title_tr` | Kurs ilanı ve kursa kısa mesaj | GEÇTİ |
| 158 | `.okuma_yazma.sorular[m1:67:o1].q_tr` | Kurs kaç hafta sürüyor? | GEÇTİ |
| 159 | `.okuma_yazma.sorular[m1:67:o1].opts[0]` | On iki hafta | GEÇTİ |
| 160 | `.okuma_yazma.sorular[m1:67:o1].opts[1]` | Altı hafta | GEÇTİ |
| 161 | `.okuma_yazma.sorular[m1:67:o1].opts[2]` | Bir yıl | GEÇTİ |
| 162 | `.okuma_yazma.sorular[m1:67:o2].q_tr` | Kayıt nerede yapılıyor? | GEÇTİ |
| 163 | `.okuma_yazma.sorular[m1:67:o2].opts[0]` | Büroda, üç numaralı odada | GEÇTİ |
| 164 | `.okuma_yazma.sorular[m1:67:o2].opts[1]` | Kursun ilk gününde | GEÇTİ |
| 165 | `.okuma_yazma.sorular[m1:67:o2].opts[2]` | Telefonla | GEÇTİ |
| 166 | `.okuma_yazma.sorular[m1:67:o3].q_tr` | Doğru mu? **Der Kurs ist am Wochenende.** | GEÇTİ |
| 167 | `.okuma_yazma.sorular[m1:67:o3].why_tr` | Kurs pazartesi ve çarşamba akşamı. | GEÇTİ |
| 168 | `.okuma_yazma.sorular[m1:67:o4].q_tr` | Doğru mu? **Am Ende bekommt man einen Abschluss.** | GEÇTİ |
| 169 | `.okuma_yazma.sorular[m1:67:o4].why_tr` | İlanda sonunda bir sınav ve belge var deniyor. | GEÇTİ |
| 170 | `.okuma_yazma.sorular[m1:67:o5].q_tr` | Doğru mu? **Der Arbeitgeber muss den Kurs bezahlen.** | GEÇTİ |
| 171 | `.okuma_yazma.sorular[m1:67:o5].why_tr` | İlan **vielleicht** diyor: belki öder, zorunlu değil. | GEÇTİ |
| 172 | `.okuma_yazma.sorular[m1:67:o6].instr_tr` | Geçmişe çevir. **Letztes Jahr** ile başla. | GEÇTİ |
| 173 | `.okuma_yazma.sorular[m1:67:o6].why_tr` | **kann** geçmişte **konnte** olur. Noktalar düşer, araya **te** girer. | **GERİ** (Belirsiz: ekrandaki sözcük **kann**, düşecek nokta yok) |
| 174 | `.okuma_yazma.sorular[m1:67:o7].instr_tr` | Geçmişe çevir. | GEÇTİ |
| 175 | `.okuma_yazma.sorular[m1:67:o7].why_tr` | **müssen** geçmişte **mussten** olur. **ss** iki tane kalır. | GEÇTİ |
| 176 | `.okuma_yazma.sorular[m1:67:o8].situation_tr` | Ioana soruyor: Kursun ödevlerini düzenli yapıyor musun? Kendin hakkında bir iki cümle söyle. | GEÇTİ |
| 177 | `.okuma_yazma.sorular[m1:67:o8].why_tr` | **regelmäßig** düzenli demek. Ne zaman yaptığını da ekle. | GEÇTİ |
| 178 | `.okuma_yazma.sorular[m1:67:o9].situation_tr` | İlanda **Anmeldung** kelimesini anlamıyorsun. Ioana'dan yardım iste. | GEÇTİ |
| 179 | `.okuma_yazma.sorular[m1:67:o9].why_tr` | Yardım isterken **Kannst du mir helfen?** dersin. Kelimeyi **Was bedeutet Anmeldung?** diye sorarsın. | GEÇTİ |
| 180 | `.okuma_yazma.yazma.gorev_tr` | Kurs bürosuna kısa bir mesaj yaz. Kendini tanıt, hangi kursu istediğini söyle, iki soru sor ve kibarca yardım iste. | GEÇTİ |
| 181 | `.okuma_yazma.yazma.kontrol_tr[0]` | Kendini tanıttın mı? | GEÇTİ |
| 182 | `.okuma_yazma.yazma.kontrol_tr[1]` | En az iki soru sordun mu? | GEÇTİ |
| 183 | `.okuma_yazma.yazma.kontrol_tr[2]` | Yardımı **Können Sie mir bitte helfen?** gibi kibarca istedin mi? | GEÇTİ |
| 184 | `.gun_sinavi.maddeler[m1:67:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 185 | `.gun_sinavi.maddeler[m1:67:s1].why_tr` | **anfangen** iki parçalı: **an** en sona gider. | GEÇTİ |
| 186 | `.gun_sinavi.maddeler[m1:67:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 187 | `.gun_sinavi.maddeler[m1:67:s2].why_tr` | Yardım isterken soru **Kannst du** ile başlar. | GEÇTİ |
| 188 | `.gun_sinavi.maddeler[m1:67:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 189 | `.gun_sinavi.maddeler[m1:67:s3].why_tr` | **anbieten** iki parçalı: **bietet** ikinci yerde, **an** en sonda. | GEÇTİ |
| 190 | `.gun_sinavi.maddeler[m1:67:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 191 | `.gun_sinavi.maddeler[m1:67:s4].why_tr` | **mussten** iki s ile yazılır. | GEÇTİ |
| 192 | `.gun_sinavi.maddeler[m1:67:s5].why_tr` | Yardım önerirken **Soll ich dir helfen?** dersin. | GEÇTİ |
| 193 | `.gun_sinavi.maddeler[m1:67:s6].why_tr` | Kursa gitmek Almancada **einen Sprachkurs machen** olur. | GEÇTİ |
| 194 | `.gun_sinavi.maddeler[m1:67:s7].why_tr` | Var mı diye sorarken **Gibt es** dersin. **die Möglichkeit** için **eine** gelir. | GEÇTİ |
| 195 | `.gun_sinavi.maddeler[m1:67:s8].why_tr` | Geçmişte **kann** yerine **konnte** gelir. **kommen** en sona gider. | GEÇTİ |
| 196 | `.gun_sinavi.maddeler[m1:67:s9].situation_tr` | Kursta yeni biri kapıda duruyor, büroyu bulamıyor. Yardım öner. | GEÇTİ |
| 197 | `.gun_sinavi.maddeler[m1:67:s9].why_tr` | Tanımadığın birine **Kann ich Ihnen helfen?** dersin. | GEÇTİ |
| 198 | `.gun_sinavi.maddeler[m1:67:s10].situation_tr` | Bir arkadaşın yardım istiyor. Evet de ve ne olduğunu sor. | GEÇTİ |
| 199 | `.gun_sinavi.maddeler[m1:67:s10].why_tr` | Önce evet de, sonra **Was ist los?** diye sor. | GEÇTİ |
| 200 | `.gun_sinavi.maddeler[m1:67:s11].situation_tr` | Kurs bürosunu arıyorsun. Kendini tanıt ve kursun ne zaman başladığını sor. | GEÇTİ |
| 201 | `.gun_sinavi.maddeler[m1:67:s11].why_tr` | Telefonda önce adını söyle. Sonra **Wann fängt der Kurs an?** diye sor. | GEÇTİ |

### `content/v2/m1/gun-68.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.title_tr` | Durak: konnte mi, kann mı? | GEÇTİ |
| 2 | `.goal_tr` | Akşam kursunda eskiyle ilgili bir alıştırma var. Geçmişi anlatırken en sık yapılan dört yanlışı tanır, doğrusunu söylersin. -ung ile biten adları **die** ile kullanır, **o** ile **u** sesini ayırırsın. | **GERİ** (Terim: **ad** (isim anlamında)) |
| 3 | `.can_do.tr` | Geçmişte neyi yapabildiğimi, neyi yapmak zorunda kaldığımı doğru biçimle söylerim. | GEÇTİ |
| 4 | `.halkalar[m1:68:h1].title_tr` | Kursta: alıştırma, açıklama, sabır | GEÇTİ |
| 5 | `.halkalar[m1:68:h1].sahne.ortam_tr` | Akşam kursu, ders başlıyor. Kursleiterin sana soruyor. | GEÇTİ |
| 6 | `.halkalar[m1:68:h1].sahne.soru.q_tr` | Alıştırmayı evde yapabildin mi? | GEÇTİ |
| 7 | `.halkalar[m1:68:h1].sahne.soru.opts[0]` | Evet, açıklama iyiydi | GEÇTİ |
| 8 | `.halkalar[m1:68:h1].sahne.soru.opts[1]` | Hayır, vaktim yoktu | GEÇTİ |
| 9 | `.halkalar[m1:68:h1].sahne.soru.opts[2]` | Alıştırmayı unuttum | GEÇTİ |
| 10 | `.halkalar[m1:68:h2].title_tr` | -ung ile biten adlar: anlam, fikir, danışma | **GERİ** (Terim: **ad**) |
| 11 | `.halkalar[m1:68:h2].sahne.ortam_tr` | İş yerinde öğle arası. Derya kurstaki danışmayı soruyor. | GEÇTİ |
| 12 | `.halkalar[m1:68:h2].sahne.soru.q_tr` | Derya ne soruyor? | GEÇTİ |
| 13 | `.halkalar[m1:68:h2].sahne.soru.opts[0]` | Danışmaya gidip gitmediğini ve senin fikrini | GEÇTİ |
| 14 | `.halkalar[m1:68:h2].sahne.soru.opts[1]` | Kursun kaçta başladığını | GEÇTİ |
| 15 | `.halkalar[m1:68:h2].sahne.soru.opts[2]` | Yeni adresini | GEÇTİ |
| 16 | `.sahne.title_tr` | Kursta: eskiden ve bugün | GEÇTİ |
| 17 | `.sahne.sahneler[s1].sahne_tr` | Akşam kursu. Kursleiterin tahtaya iki sözcük yazıyor: früher ve heute. | GEÇTİ |
| 18 | `.sahne.sahneler[s2].sahne_tr` | Kursleiterin Ioana'ya dönüyor. | GEÇTİ |
| 19 | `.sahne.sahneler[s3].sahne_tr` | Ioana gülümsüyor, babasını anlatıyor. | GEÇTİ |
| 20 | `.sahne.sahneler[s4].sahne_tr` | Ioana eliyle bir pasta çiziyor. | GEÇTİ |
| 21 | `.sahne.sahneler[s5].sahne_tr` | Kursleiterin tahtaya Koch ve Kuchen yazıp ağzını gösteriyor. | GEÇTİ |
| 22 | `.sahne.sahneler[s6].sahne_tr` | Kursleiterin yeniden Ioana'ya bakıyor. | GEÇTİ |
| 23 | `.sahne.sahneler[s7].sahne_tr` | Ioana gururla anahtarlığını gösteriyor. | GEÇTİ |
| 24 | `.sahne.sahneler[s8].sahne_tr` | Kursleiterin defterine bakıyor. | GEÇTİ |
| 25 | `.sahne.sahneler[s9].sahne_tr` | Ioana hızlı cevap veriyor, sonra duruyor. | GEÇTİ |
| 26 | `.sahne.sahneler[s10].sahne_tr` | Kursleiterin tahtaya musste yazıyor. | GEÇTİ |
| 27 | `.sahne.sahneler[s11].sahne_tr` | Ioana gülüyor, cümleyi yeniden söylüyor. | GEÇTİ |
| 28 | `.sahne.sahneler[s12].sahne_tr` | Kursleiterin bütün sınıfa soruyor. | GEÇTİ |
| 29 | `.sahne.sahneler[s13].sahne_tr` | Ioana omuz silkiyor. | GEÇTİ |
| 30 | `.sahne.sahneler[s14].sahne_tr` | Kursleiterin sakin, gülümsüyor. | GEÇTİ |
| 31 | `.sahne.bolumler[b1].ana_fikir.q_tr` | Kursta ne konuşuluyor? | GEÇTİ |
| 32 | `.sahne.bolumler[b1].ana_fikir.opts[0]` | Eskiden neyi yapabildikleri | GEÇTİ |
| 33 | `.sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni bir iş ilanı | GEÇTİ |
| 34 | `.sahne.bolumler[b1].ana_fikir.opts[2]` | Hafta sonu planı | GEÇTİ |
| 35 | `.sahne.bolumler[b1].ayrinti[0].q_tr` | Ioana'nın babası ne iş yapıyordu? | GEÇTİ |
| 36 | `.sahne.bolumler[b1].ayrinti[0].opts[0]` | Aşçıydı | GEÇTİ |
| 37 | `.sahne.bolumler[b1].ayrinti[0].opts[1]` | Şofördü | GEÇTİ |
| 38 | `.sahne.bolumler[b1].ayrinti[0].opts[2]` | Garsondu | GEÇTİ |
| 39 | `.sahne.bolumler[b1].ayrinti[1].q_tr` | Ioana çocukken ne yapabiliyordu? | GEÇTİ |
| 40 | `.sahne.bolumler[b1].ayrinti[1].opts[0]` | Pasta yapabiliyordu | GEÇTİ |
| 41 | `.sahne.bolumler[b1].ayrinti[1].opts[1]` | Araba sürebiliyordu | GEÇTİ |
| 42 | `.sahne.bolumler[b1].ayrinti[1].opts[2]` | Yüzebiliyordu | GEÇTİ |
| 43 | `.sahne.bolumler[b1].ayrinti[2].q_tr` | Ioana eskiden neyi yapamıyordu? | GEÇTİ |
| 44 | `.sahne.bolumler[b1].ayrinti[2].opts[0]` | Araba süremiyordu | GEÇTİ |
| 45 | `.sahne.bolumler[b1].ayrinti[2].opts[1]` | Yemek yapamıyordu | GEÇTİ |
| 46 | `.sahne.bolumler[b1].ayrinti[2].opts[2]` | Okuyamıyordu | GEÇTİ |
| 47 | `.sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 48 | `.sahne.bolumler[b1].dikte[d5].gorev_tr` | Ioana eskiden neyi yapabiliyordu, neyi yapamıyordu? İki kısa cümleyle yaz. | GEÇTİ |
| 49 | `.sahne.bolumler[b1].cevapla.situation_tr` | Kursleiterin sana da soruyor. Eskiden yapamadığın bir şeyi ve bugün yapabildiğini söyle. | GEÇTİ |
| 50 | `.sahne.bolumler[b1].cevapla.why_tr` | Eskiyi **konnte** ile, bugünü **kann** ile söylersin. Asıl fiil en sona gider. | **GERİ** (Terim: **asıl fiil**) |
| 51 | `.sahne.bolumler[b2].ana_fikir.q_tr` | Kursleiterin Ioana'ya ne öğretiyor? | GEÇTİ |
| 52 | `.sahne.bolumler[b2].ana_fikir.opts[0]` | Dün için muss değil musste denir | GEÇTİ |
| 53 | `.sahne.bolumler[b2].ana_fikir.opts[1]` | Yarın kurs yok | GEÇTİ |
| 54 | `.sahne.bolumler[b2].ana_fikir.opts[2]` | Kursun saati değişti | GEÇTİ |
| 55 | `.sahne.bolumler[b2].ayrinti[0].q_tr` | Ioana dün neden kursa gelmedi? | GEÇTİ |
| 56 | `.sahne.bolumler[b2].ayrinti[0].opts[0]` | Uzun çalışmak zorundaydı | GEÇTİ |
| 57 | `.sahne.bolumler[b2].ayrinti[0].opts[1]` | Hastaydı | GEÇTİ |
| 58 | `.sahne.bolumler[b2].ayrinti[0].opts[2]` | Treni gelmedi | GEÇTİ |
| 59 | `.sahne.bolumler[b2].ayrinti[1].q_tr` | Sınıftakilerin hepsi alıştırmayı yapabildi mi? | GEÇTİ |
| 60 | `.sahne.bolumler[b2].ayrinti[1].opts[0]` | Hayır, bazılarının vakti yoktu | GEÇTİ |
| 61 | `.sahne.bolumler[b2].ayrinti[1].opts[1]` | Evet, hepsi yaptı | GEÇTİ |
| 62 | `.sahne.bolumler[b2].ayrinti[1].opts[2]` | Hiç alıştırma yoktu | GEÇTİ |
| 63 | `.sahne.bolumler[b2].ayrinti[2].q_tr` | Pazartesi dersten önce ne var? | GEÇTİ |
| 64 | `.sahne.bolumler[b2].ayrinti[2].opts[0]` | Danışma | GEÇTİ |
| 65 | `.sahne.bolumler[b2].ayrinti[2].opts[1]` | Sınav | GEÇTİ |
| 66 | `.sahne.bolumler[b2].ayrinti[2].opts[2]` | Parti | GEÇTİ |
| 67 | `.sahne.bolumler[b2].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 68 | `.sahne.bolumler[b2].dikte[d5].gorev_tr` | Ioana dün neden gelmedi, pazartesi ne var? İki kısa cümleyle yaz. | GEÇTİ |
| 69 | `.sahne.bolumler[b2].cevapla.situation_tr` | Kursleiterin sana soruyor. Alıştırmayı evde yapamadığını ve nedenini söyle. | GEÇTİ |
| 70 | `.sahne.bolumler[b2].cevapla.why_tr` | Dün oldu, o yüzden **konnte** ve **musste** dersin. **kann** ve **muss** bugün içindir. | GEÇTİ |
| 71 | `.sesler[m1:68:a1].title_tr` | Derya'dan sesli mesaj | GEÇTİ |
| 72 | `.sesler[m1:68:a1].ortam_tr` | Akşam telefonuna bakıyorsun. İş arkadaşın Derya'dan bir sesli mesaj var. | GEÇTİ |
| 73 | `.sesler[m1:68:a1].bolumler[b1].ana_fikir.q_tr` | Derya ne istiyor? | GEÇTİ |
| 74 | `.sesler[m1:68:a1].bolumler[b1].ana_fikir.opts[0]` | Yeni vardiya planını ona göstermeni | GEÇTİ |
| 75 | `.sesler[m1:68:a1].bolumler[b1].ana_fikir.opts[1]` | Onu doktora götürmeni | GEÇTİ |
| 76 | `.sesler[m1:68:a1].bolumler[b1].ana_fikir.opts[2]` | Wimmer Bey'i aramanı | GEÇTİ |
| 77 | `.sesler[m1:68:a1].bolumler[b1].ayrinti[0].q_tr` | Derya dün neden işe gelemedi? | GEÇTİ |
| 78 | `.sesler[m1:68:a1].bolumler[b1].ayrinti[0].opts[0]` | Hastaydı, doktora gitmek zorundaydı | GEÇTİ |
| 79 | `.sesler[m1:68:a1].bolumler[b1].ayrinti[0].opts[1]` | Treni yoktu | GEÇTİ |
| 80 | `.sesler[m1:68:a1].bolumler[b1].ayrinti[0].opts[2]` | Kurstaydı | GEÇTİ |
| 81 | `.sesler[m1:68:a1].bolumler[b1].ayrinti[1].q_tr` | Derya'ya göre ne yeni? | GEÇTİ |
| 82 | `.sesler[m1:68:a1].bolumler[b1].ayrinti[1].opts[0]` | Vardiya planı | GEÇTİ |
| 83 | `.sesler[m1:68:a1].bolumler[b1].ayrinti[1].opts[1]` | Kurs | GEÇTİ |
| 84 | `.sesler[m1:68:a1].bolumler[b1].ayrinti[1].opts[2]` | Depo | GEÇTİ |
| 85 | `.sesler[m1:68:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 86 | `.sesler[m1:68:a1].bolumler[b1].dikte[d5].gorev_tr` | Derya ne istiyor? Bir iki kısa cümleyle yaz. | GEÇTİ |
| 87 | `.sesler[m1:68:a1].bolumler[b1].cevapla.situation_tr` | Derya'yı geri arıyorsun. Geçmiş olsun de ve yarın planı göstereceğini söyle. | GEÇTİ |
| 88 | `.sesler[m1:68:a1].bolumler[b1].cevapla.why_tr` | Hasta birine **Gute Besserung** dersin. Göstermek **zeigen** olur, **dir** ona demektir. | **GERİ** (Üç bilgi tek kutuda; **dir ona demektir** yanlış okunuyor (Derya'ya konuşuyorsun, **dir** burada sana)) |
| 89 | `.sesler[m1:68:a1].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 90 | `.sesler[m1:68:a1].eylem.opts[0]` | Yarın Derya'ya yeni vardiya planını göster. | GEÇTİ |
| 91 | `.sesler[m1:68:a1].eylem.opts[1]` | Derya'yı doktora götür. | GEÇTİ |
| 92 | `.sesler[m1:68:a1].eylem.opts[2]` | Wimmer Bey'e Derya'nın hasta olduğunu söyle. | GEÇTİ |
| 93 | `.sesler[m1:68:a1].eylem.why_tr` | Derya planı yarın kısaca göstermeni istiyor. | GEÇTİ |
| 94 | `.sesler[m1:68:a2].title_tr` | Kurs binasında anons | GEÇTİ |
| 95 | `.sesler[m1:68:a2].ortam_tr` | Kurs binasının girişindesin. Hoparlörden kısa bir anons geliyor. | GEÇTİ |
| 96 | `.sesler[m1:68:a2].bolumler[b1].ana_fikir.q_tr` | Anons ne hakkında? | GEÇTİ |
| 97 | `.sesler[m1:68:a2].bolumler[b1].ana_fikir.opts[0]` | Salı ders yok | GEÇTİ |
| 98 | `.sesler[m1:68:a2].bolumler[b1].ana_fikir.opts[1]` | Kurs ücreti değişti | GEÇTİ |
| 99 | `.sesler[m1:68:a2].bolumler[b1].ana_fikir.opts[2]` | Yeni bir kurs başlıyor | GEÇTİ |
| 100 | `.sesler[m1:68:a2].bolumler[b1].ayrinti[0].q_tr` | Neden ders yok? | GEÇTİ |
| 101 | `.sesler[m1:68:a2].bolumler[b1].ayrinti[0].opts[0]` | Kursleiterin hasta | GEÇTİ |
| 102 | `.sesler[m1:68:a2].bolumler[b1].ayrinti[0].opts[1]` | Bina kapalı | GEÇTİ |
| 103 | `.sesler[m1:68:a2].bolumler[b1].ayrinti[0].opts[2]` | Tatil var | GEÇTİ |
| 104 | `.sesler[m1:68:a2].bolumler[b1].ayrinti[1].q_tr` | Pazartesi ders kaçta? | GEÇTİ |
| 105 | `.sesler[m1:68:a2].bolumler[b1].ayrinti[1].opts[0]` | Saat altıda | GEÇTİ |
| 106 | `.sesler[m1:68:a2].bolumler[b1].ayrinti[1].opts[1]` | Saat beşte | GEÇTİ |
| 107 | `.sesler[m1:68:a2].bolumler[b1].ayrinti[1].opts[2]` | Saat yedide | GEÇTİ |
| 108 | `.sesler[m1:68:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 109 | `.sesler[m1:68:a2].bolumler[b1].dikte[d5].gorev_tr` | Anonsta ne dendi? Bir iki kısa cümleyle yaz. | GEÇTİ |
| 110 | `.sesler[m1:68:a2].bolumler[b1].cevapla.situation_tr` | Ioana salı kursa gelmek istiyor. Ona ders olmadığını ve nedenini söyle. | GEÇTİ |
| 111 | `.sesler[m1:68:a2].bolumler[b1].cevapla.why_tr` | Ders yoksa **kein Unterricht** dersin. Nedeni de kısa söylersin. | GEÇTİ |
| 112 | `.sesler[m1:68:a2].eylem.q_tr` | Salı günü ne yapmalısın? | GEÇTİ |
| 113 | `.sesler[m1:68:a2].eylem.opts[0]` | Ödevi evde yap. | GEÇTİ |
| 114 | `.sesler[m1:68:a2].eylem.opts[1]` | Kursa git. | GEÇTİ |
| 115 | `.sesler[m1:68:a2].eylem.opts[2]` | Büroya git. | GEÇTİ |
| 116 | `.sesler[m1:68:a2].eylem.why_tr` | Salı ders yok. Ödevi evde yapmanı istiyorlar. | GEÇTİ |
| 117 | `.prova.title_tr` | Kurstan sonra Kursleiterin ile | GEÇTİ |
| 118 | `.prova.durum_tr` | Ders bitti. Dün kursa gelemedin ve alıştırmayı evde yapamadın. Kursleiterin'in yanına gidiyorsun. | GEÇTİ |
| 119 | `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Sorunu açıkça söyledin ve kibarca yardım istedin. | GEÇTİ |
| 120 | `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Bir kelimenin anlamını **Was ist die Bedeutung von** ile sordun. | GEÇTİ |
| 121 | `.prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Alıştırmayı yapamadın. Şimdi sorma fırsatın var, kaçırma. | GEÇTİ |
| 122 | `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Dün için **musste** dedin. Tam doğru biçim. | GEÇTİ |
| 123 | `.prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | **war** ve **musste** ile dünü doğru anlattın. | GEÇTİ |
| 124 | `.prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Dün geçmiştir. **muss** değil **musste** dersin: **Ich musste gestern lange arbeiten.** | GEÇTİ |
| 125 | `.prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Kısa ve kibar bir teşekkür. | GEÇTİ |
| 126 | `.prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Anlamadığını söylemek cesaret ister. Kursleiterin bunu sever. | GEÇTİ |
| 127 | `.prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Sabırla açıklayan birine **Danke für Ihre Geduld** demek çok kibar. | GEÇTİ |
| 128 | `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Fikrini söyledin ve neye ihtiyacın olduğunu ekledin. | GEÇTİ |
| 129 | `.prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Eskiyi **konnte**, bugünü **kann** ile karşılaştırdın. | GEÇTİ |
| 130 | `.prova.kapanis_tr` | Kurstan sonra öğretmenle konuştun. Dünü **konnte** ve **musste** ile anlattın, açıklama istedin, teşekkür ettin ve fikrini söyledin. | GEÇTİ |
| 131 | `.okuma_yazma.title_tr` | Kursleiterin'in örnek metni: eskiden ve bugün | GEÇTİ |
| 132 | `.okuma_yazma.sorular[m1:68:o1].q_tr` | Kursleiterin ne anlatıyor? | GEÇTİ |
| 133 | `.okuma_yazma.sorular[m1:68:o1].opts[0]` | Çocukluktaki isteğini ve bugünkü işini | GEÇTİ |
| 134 | `.okuma_yazma.sorular[m1:68:o1].opts[1]` | Son tatilini | GEÇTİ |
| 135 | `.okuma_yazma.sorular[m1:68:o1].opts[2]` | Yeni dairesini | GEÇTİ |
| 136 | `.okuma_yazma.sorular[m1:68:o2].q_tr` | Kursleiterin çocukken ne olmak istiyordu? | GEÇTİ |
| 137 | `.okuma_yazma.sorular[m1:68:o2].opts[0]` | Aşçı | GEÇTİ |
| 138 | `.okuma_yazma.sorular[m1:68:o2].opts[1]` | Doktor | GEÇTİ |
| 139 | `.okuma_yazma.sorular[m1:68:o2].opts[2]` | Şoför | GEÇTİ |
| 140 | `.okuma_yazma.sorular[m1:68:o3].q_tr` | Çocukken neyi yapması yasaktı? | GEÇTİ |
| 141 | `.okuma_yazma.sorular[m1:68:o3].opts[0]` | Mutfağa tek başına girmek | GEÇTİ |
| 142 | `.okuma_yazma.sorular[m1:68:o3].opts[1]` | Dışarı çıkmak | GEÇTİ |
| 143 | `.okuma_yazma.sorular[m1:68:o3].opts[2]` | Uzun konuşmak | GEÇTİ |
| 144 | `.okuma_yazma.sorular[m1:68:o4].q_tr` | Büroda çalışmak neden hoş değildi? | GEÇTİ |
| 145 | `.okuma_yazma.sorular[m1:68:o4].opts[0]` | Hep insanlarla konuşmak istiyordu | GEÇTİ |
| 146 | `.okuma_yazma.sorular[m1:68:o4].opts[1]` | Para azdı | GEÇTİ |
| 147 | `.okuma_yazma.sorular[m1:68:o4].opts[2]` | Büro çok uzaktı | GEÇTİ |
| 148 | `.okuma_yazma.sorular[m1:68:o5].why_tr` | **Gestern** geçmiştir. **kann** değil, **konnte** dersin. | GEÇTİ |
| 149 | `.okuma_yazma.sorular[m1:68:o6].q_tr` | Geçen hafta Tobi yardım etmek istedi. Hangisi doğru? | GEÇTİ |
| 150 | `.okuma_yazma.sorular[m1:68:o6].why_tr` | Geçmişte **will** kalmaz. **wollte** olur: noktasız kök, araya **-te-** girer. | **GERİ** (Terim: **kök**; **noktasız** belirsiz (**will**'de de **wollen**'de de nokta yok)) |
| 151 | `.okuma_yazma.sorular[m1:68:o7].instr_tr` | Cümleyi dün için söyle. **Heute** yerine **Gestern** gelsin. | GEÇTİ |
| 152 | `.okuma_yazma.sorular[m1:68:o7].why_tr` | **muss** geçmişte **musste** olur. Noktalar yok, araya **-te-** girer. | GEÇTİ |
| 153 | `.okuma_yazma.sorular[m1:68:o8].opts[1]` | müssen | GEÇTİ |
| 154 | `.okuma_yazma.sorular[m1:68:o8].why_tr` | **Früher** eskidir. **müssen** değil **mussten**: noktalar düşer, araya **-te-** girer. | GEÇTİ |
| 155 | `.okuma_yazma.sorular[m1:68:o9].why_tr` | **du** ile son **-st** gelir: **du konntest**. Ek unutulmaz. | **GERİ** (Terim: **ek**) |
| 156 | `.okuma_yazma.sorular[m1:68:o10].q_tr` | Hangisi doğru? (Sen işte yemek yiyemezdin.) | GEÇTİ |
| 157 | `.okuma_yazma.sorular[m1:68:o10].why_tr` | **du** için **durftest** dersin. **durft** yarım kalmış biçimdir. | GEÇTİ |
| 158 | `.okuma_yazma.sorular[m1:68:o11].instr_tr` | Tobi'ye söyle: **ich** yerine **du** kullan. | GEÇTİ |
| 159 | `.okuma_yazma.sorular[m1:68:o11].why_tr` | **ich wollte** ama **du wolltest**. **du** ile son hep **-st** olur. | GEÇTİ |
| 160 | `.okuma_yazma.sorular[m1:68:o12].why_tr` | **ihr** ile son **-tet** olur: **ihr musstet**. | GEÇTİ |
| 161 | `.okuma_yazma.sorular[m1:68:o13].q_tr` | Derya ile Tobi'ye soruyorsun: alıştırmayı yapabildiniz mi? | GEÇTİ |
| 162 | `.okuma_yazma.sorular[m1:68:o13].why_tr` | **ihr** ile **konntet** dersin. **-test** du içindir, **-ten** wir içindir. | GEÇTİ |
| 163 | `.okuma_yazma.sorular[m1:68:o14].instr_tr` | **wir** yerine **ihr** kullan. | GEÇTİ |
| 164 | `.okuma_yazma.sorular[m1:68:o14].why_tr` | **wir durften** ama **ihr durftet**. **ihr** ile son **-tet** olur. | GEÇTİ |
| 165 | `.okuma_yazma.sorular[m1:68:o15].q_tr` | Hangisi doğru yazılmış? | GEÇTİ |
| 166 | `.okuma_yazma.sorular[m1:68:o15].why_tr` | **müssen**'deki çift s kalır: **mussten**. Yalnız noktalar düşer. | GEÇTİ |
| 167 | `.okuma_yazma.sorular[m1:68:o16].why_tr` | Çift s kalır, araya **-te-** girer: **musste**. **muste** yanlıştır. | GEÇTİ |
| 168 | `.okuma_yazma.sorular[m1:68:o17].why_tr` | **wir** ile **mussten** dersin. İki s, sonda **-ten**. | GEÇTİ |
| 169 | `.okuma_yazma.sorular[m1:68:o18].instr_tr` | Geçmişte söyle. Ioana ve Luka eskiden çok alıştırma yapmak zorundaydı. | GEÇTİ |
| 170 | `.okuma_yazma.sorular[m1:68:o18].why_tr` | **müssen** geçmişte **mussten** olur. Noktalar düşer, çift s kalır. | GEÇTİ |
| 171 | `.okuma_yazma.sorular[m1:68:o19].situation_tr` | Ioana senin eskini soruyor. Eskiden ne yapmak zorundaydın, ne yapmak istiyordun? İki cümle söyle. | GEÇTİ |
| 172 | `.okuma_yazma.sorular[m1:68:o19].why_tr` | Zorunluluğu **musste**, isteği **wollte** ile söylersin. Asıl fiil en sona gider. | **GERİ** (Terim: **asıl fiil**) |
| 173 | `.okuma_yazma.sorular[m1:68:o20].q_tr` | Hangi artikel? ___ Meinung | **GERİ** (Terim: **artikel**) |
| 174 | `.okuma_yazma.sorular[m1:68:o20].why_tr` | **-ung** ile biten adlar hep **die** alır. | **GERİ** (Terim: **ad**) |
| 175 | `.okuma_yazma.sorular[m1:68:o21].q_tr` | Hangi artikel? ___ Beratung | **GERİ** (Terim: **artikel**) |
| 176 | `.okuma_yazma.sorular[m1:68:o21].why_tr` | **beraten** fiilinden **die Beratung**. **-ung** hep **die**. | **GERİ** (Terim: **fiil**) |
| 177 | `.okuma_yazma.sorular[m1:68:o22].q_tr` | Hangi artikel? ___ Weiterbildung | **GERİ** (Terim: **artikel**) |
| 178 | `.okuma_yazma.sorular[m1:68:o22].why_tr` | Sözcük uzun olsa da sonu **-ung**: **die Weiterbildung**. | GEÇTİ |
| 179 | `.okuma_yazma.sorular[m1:68:o23].instr_tr` | Fiilden **-ung** ile ad yap, artikeliyle yaz. | **GERİ** (Üç terim: **fiil**, **ad**, **artikel**) |
| 180 | `.okuma_yazma.sorular[m1:68:o23].why_tr` | **erklären** fiilinin kökü **erklär**, sonuna **-ung** gelir: **die Erklärung**. | **GERİ** (Terimler: **fiil**, **kök**) |
| 181 | `.okuma_yazma.sorular[m1:68:o24].instr_tr` | Fiilden **-ung** ile ad yap, artikeliyle yaz. | **GERİ** (Üç terim: **fiil**, **ad**, **artikel**) |
| 182 | `.okuma_yazma.sorular[m1:68:o24].why_tr` | **üben** fiilinin kökü **üb**, sonuna **-ung**: **die Übung**. | **GERİ** (Terimler: **fiil**, **kök**) |
| 183 | `.okuma_yazma.sorular[m1:68:o25].why_tr` | **beraten** fiilinden ad: **die Beratung**. | **GERİ** (Terimler: **fiil**, **ad**) |
| 184 | `.okuma_yazma.sorular[m1:68:o26].q_tr` | Hangi sözcükte **u** sesi var? | GEÇTİ |
| 185 | `.okuma_yazma.sorular[m1:68:o26].why_tr` | **Kuchen** u ile, dudaklar öne. **Koch** o ile, ağız daha açık. | GEÇTİ |
| 186 | `.okuma_yazma.sorular[m1:68:o27].q_tr` | Hangi sözcükte **o** sesi var? | GEÇTİ |
| 187 | `.okuma_yazma.sorular[m1:68:o27].why_tr` | **konnte** o ile söylenir. **musste** u ile söylenir. | GEÇTİ |
| 188 | `.okuma_yazma.yazma.gorev_tr` | Kursleiterin'e kısa bir e-posta yaz. Dün neden gelemediğini söyle, alıştırma için bir soru sor ve teşekkür et. | GEÇTİ |
| 189 | `.okuma_yazma.yazma.kontrol_tr[0]` | Dün için **konnte** ve **musste** var mı, **kann** ve **muss** değil? | GEÇTİ |
| 190 | `.okuma_yazma.yazma.kontrol_tr[1]` | **musste** iki s ile mi yazılı? | GEÇTİ |
| 191 | `.okuma_yazma.yazma.kontrol_tr[2]` | Bir soru sordun ve teşekkür ettin mi? | GEÇTİ |
| 192 | `.gun_sinavi.maddeler[m1:68:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 193 | `.gun_sinavi.maddeler[m1:68:s1].why_tr` | **Koch** o ile, **Kuchen** u ile söylenir. | GEÇTİ |
| 194 | `.gun_sinavi.maddeler[m1:68:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 195 | `.gun_sinavi.maddeler[m1:68:s2].why_tr` | **ihr** ile son **-tet**: **musstet**. | GEÇTİ |
| 196 | `.gun_sinavi.maddeler[m1:68:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 197 | `.gun_sinavi.maddeler[m1:68:s3].why_tr` | **die Erklärung** açıklama demektir. **-ung** hep **die**. | GEÇTİ |
| 198 | `.gun_sinavi.maddeler[m1:68:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 199 | `.gun_sinavi.maddeler[m1:68:s4].why_tr` | **konnte** o ile söylenir ve yazılır. | GEÇTİ |
| 200 | `.gun_sinavi.maddeler[m1:68:s5].why_tr` | Dün için **konnte** ve **musste**. **kann** ve **muss** bugün içindir. | GEÇTİ |
| 201 | `.gun_sinavi.maddeler[m1:68:s6].why_tr` | **du** ile **wolltest** dersin. **wollt** eksik kalır. | GEÇTİ |
| 202 | `.gun_sinavi.maddeler[m1:68:s7].instr_tr` | Soruyu iki arkadaşına sor: **du** yerine **ihr**. | GEÇTİ |
| 203 | `.gun_sinavi.maddeler[m1:68:s7].why_tr` | **ihr** ile son **-tet** olur: **konntet**. | GEÇTİ |
| 204 | `.gun_sinavi.maddeler[m1:68:s8].why_tr` | **die Beratung** danışmadır. **für eine Beratung** dersin. | GEÇTİ |
| 205 | `.gun_sinavi.maddeler[m1:68:s9].situation_tr` | Derya ile Tobi otobüs durağından yeni geldi. Uzun beklemek zorunda kaldılar mı, sor. | GEÇTİ |
| 206 | `.gun_sinavi.maddeler[m1:68:s9].why_tr` | İki kişiye **ihr** ile sorarsın: **Musstet ihr lange warten?** | GEÇTİ |
| 207 | `.gun_sinavi.maddeler[m1:68:s10].situation_tr` | Kursleiterin soruyor: çocukken neyi iyi yapabiliyordun? Bir şey söyle. | GEÇTİ |
| 208 | `.gun_sinavi.maddeler[m1:68:s10].why_tr` | Çocukluğunu **Als Kind konnte ich** ile anlatırsın. Asıl fiil sonda. | **GERİ** (Terim: **asıl fiil**) |
| 209 | `.gun_sinavi.maddeler[m1:68:s11].situation_tr` | Kursleiterin dün neden gelmediğini soruyor. Nedenini söyle ve alıştırmayı açıklamasını rica et. | GEÇTİ |
| 210 | `.gun_sinavi.maddeler[m1:68:s11].why_tr` | Nedeni **musste** ile söylersin. Sonra **Können Sie mir das erklären?** diye rica edersin. | GEÇTİ |

### `content/v2/m1/gun-69.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.title_tr` | Kime hangi ilan? Sınav gibi oku | GEÇTİ |
| 2 | `.goal_tr` | Haftanın kelimelerini tekrar edersin. Sınavdaki gibi kısa ilanları okur, her kişiye uygun ilanı bulursun. Danışmada kendini anlatır, sonra kursta yapacağın kısa sunumu yazarsın. | GEÇTİ |
| 3 | `.can_do.tr` | Kısa iş ve kurs ilanlarında bir kişiye uygun olanı bulurum, kendimi ve iş geçmişimi birkaç cümleyle anlatırım. | **GERİ** (Cümle 17 kelime; iki ayrı iş) |
| 4 | `.halkalar[m1:69:h1].title_tr` | Şefler, okul, ilanlar | GEÇTİ |
| 5 | `.halkalar[m1:69:h1].sahne.ortam_tr` | Luka'nın salonu. Saçını kesiyor, kendi ilk işini anlatıyor. | GEÇTİ |
| 6 | `.halkalar[m1:69:h1].sahne.soru.q_tr` | Luka eski şefi için ne diyor? | GEÇTİ |
| 7 | `.halkalar[m1:69:h1].sahne.soru.opts[0]` | Sertti ama ondan çok şey öğrendi | GEÇTİ |
| 8 | `.halkalar[m1:69:h1].sahne.soru.opts[1]` | Hiç konuşmazdı | GEÇTİ |
| 9 | `.halkalar[m1:69:h1].sahne.soru.opts[2]` | Ona yardım etmezdi | GEÇTİ |
| 10 | `.sahne.title_tr` | Kursta: sınav görevi, kime hangi ilan? | GEÇTİ |
| 11 | `.sahne.sahneler[s1].sahne_tr` | Akşam kursu. Kursleiterin tahtaya küçük kâğıtlar asıyor: kişiler ve ilanlar. | GEÇTİ |
| 12 | `.sahne.sahneler[s2].sahne_tr` | Kursleiterin solda kişileri, sağda ilanları gösteriyor. | GEÇTİ |
| 13 | `.sahne.sahneler[s3].sahne_tr` | Kursleiterin ilk kâğıdı okuyor. | GEÇTİ |
| 14 | `.sahne.sahneler[s4].sahne_tr` | Kursleiterin birinci ilanı gösteriyor. | GEÇTİ |
| 15 | `.sahne.sahneler[s5].sahne_tr` | Ioana başını sallıyor. | GEÇTİ |
| 16 | `.sahne.sahneler[s6].sahne_tr` | Kursleiterin ikinci ilanı gösteriyor. | GEÇTİ |
| 17 | `.sahne.sahneler[s7].sahne_tr` | Ioana parmağıyla iki kâğıdı birleştiriyor. | GEÇTİ |
| 18 | `.sahne.sahneler[s8].sahne_tr` | Kursleiterin tahtaya üç sözcük yazıyor: Zeit, Tag, Geld. | GEÇTİ |
| 19 | `.sahne.sahneler[s9].sahne_tr` | Kursleiterin bir kişinin kâğıdını tek başına bırakıyor. | GEÇTİ |
| 20 | `.sahne.sahneler[s10].sahne_tr` | Ioana iç çekiyor. | GEÇTİ |
| 21 | `.sahne.sahneler[s11].sahne_tr` | Kursleiterin gülümsüyor. | GEÇTİ |
| 22 | `.sahne.sahneler[s12].sahne_tr` | Ioana kalemini alıyor. | GEÇTİ |
| 23 | `.sahne.bolumler[b1].ana_fikir.q_tr` | Kursta ne yapıyorlar? | GEÇTİ |
| 24 | `.sahne.bolumler[b1].ana_fikir.opts[0]` | Kişilere uygun ilanı arıyorlar | GEÇTİ |
| 25 | `.sahne.bolumler[b1].ana_fikir.opts[1]` | Bir mektup yazıyorlar | GEÇTİ |
| 26 | `.sahne.bolumler[b1].ana_fikir.opts[2]` | Bir şarkı dinliyorlar | GEÇTİ |
| 27 | `.sahne.bolumler[b1].ayrinti[0].q_tr` | Emil ne zaman çalışabiliyor? | GEÇTİ |
| 28 | `.sahne.bolumler[b1].ayrinti[0].opts[0]` | Yalnız hafta sonu | GEÇTİ |
| 29 | `.sahne.bolumler[b1].ayrinti[0].opts[1]` | Yalnız sabah | GEÇTİ |
| 30 | `.sahne.bolumler[b1].ayrinti[0].opts[2]` | Her gün | GEÇTİ |
| 31 | `.sahne.bolumler[b1].ayrinti[1].q_tr` | İlan A neden uymuyor? | GEÇTİ |
| 32 | `.sahne.bolumler[b1].ayrinti[1].opts[0]` | İş pazartesiden cumaya | GEÇTİ |
| 33 | `.sahne.bolumler[b1].ayrinti[1].opts[1]` | İş çok uzakta | GEÇTİ |
| 34 | `.sahne.bolumler[b1].ayrinti[1].opts[2]` | Para az | GEÇTİ |
| 35 | `.sahne.bolumler[b1].ayrinti[2].q_tr` | Emil'e hangi ilan uyuyor? | GEÇTİ |
| 36 | `.sahne.bolumler[b1].ayrinti[2].opts[0]` | İlan B, depo | GEÇTİ |
| 37 | `.sahne.bolumler[b1].ayrinti[2].opts[1]` | İlan A, garson | GEÇTİ |
| 38 | `.sahne.bolumler[b1].ayrinti[2].opts[2]` | Hiçbiri | GEÇTİ |
| 39 | `.sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 40 | `.sahne.bolumler[b1].dikte[d5].gorev_tr` | Emil'e hangi ilan uyuyor, neden? Bir iki kısa cümleyle yaz. | GEÇTİ |
| 41 | `.sahne.bolumler[b1].cevapla.situation_tr` | Kursleiterin sana soruyor: sen hangi günler ve saatler çalışabiliyorsun? Kısa söyle. | GEÇTİ |
| 42 | `.sahne.bolumler[b1].cevapla.why_tr` | Zamanı **nur vormittags** ya da **von Montag bis Freitag** ile söylersin. İlanlarda tam bunu ararsın. | GEÇTİ |
| 43 | `.sahne.bolumler[b2].ana_fikir.q_tr` | Kursleiterin hangi ipucunu veriyor? | GEÇTİ |
| 44 | `.sahne.bolumler[b2].ana_fikir.opts[0]` | Her şeyi değil, saati, günü ve parayı ara | GEÇTİ |
| 45 | `.sahne.bolumler[b2].ana_fikir.opts[1]` | Her ilanı iki kez oku | GEÇTİ |
| 46 | `.sahne.bolumler[b2].ana_fikir.opts[2]` | Sözlük kullan | GEÇTİ |
| 47 | `.sahne.bolumler[b2].ayrinti[0].q_tr` | Hangi sözcükleri aramalısın? | GEÇTİ |
| 48 | `.sahne.bolumler[b2].ayrinti[0].opts[0]` | Saat, gün ve para | GEÇTİ |
| 49 | `.sahne.bolumler[b2].ayrinti[0].opts[1]` | Ad, adres ve telefon | GEÇTİ |
| 50 | `.sahne.bolumler[b2].ayrinti[0].opts[2]` | Renk ve büyüklük | GEÇTİ |
| 51 | `.sahne.bolumler[b2].ayrinti[1].q_tr` | Sınavda ne olabilir? | GEÇTİ |
| 52 | `.sahne.bolumler[b2].ayrinti[1].opts[0]` | Bir kişiye hiçbir ilan uymayabilir | GEÇTİ |
| 53 | `.sahne.bolumler[b2].ayrinti[1].opts[1]` | İlan hiç olmayabilir | GEÇTİ |
| 54 | `.sahne.bolumler[b2].ayrinti[1].opts[2]` | Kişiler ilanı yazar | GEÇTİ |
| 55 | `.sahne.bolumler[b2].ayrinti[2].q_tr` | Ioana eskiden ne yapmak zorundaydı? | GEÇTİ |
| 56 | `.sahne.bolumler[b2].ayrinti[2].opts[0]` | Hep her şeyi okumak | GEÇTİ |
| 57 | `.sahne.bolumler[b2].ayrinti[2].opts[1]` | Hep erken kalkmak | GEÇTİ |
| 58 | `.sahne.bolumler[b2].ayrinti[2].opts[2]` | Hep yazmak | GEÇTİ |
| 59 | `.sahne.bolumler[b2].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 60 | `.sahne.bolumler[b2].dikte[d5].gorev_tr` | Sınavdaki bu görevde ne yapmalısın? İki kısa cümleyle yaz. | GEÇTİ |
| 61 | `.sahne.bolumler[b2].cevapla.situation_tr` | Kursleiterin senin iş geçmişini soruyor. Eskiden ne iş yaptığını ve ne yapmak zorunda olduğunu iki cümleyle söyle. | GEÇTİ |
| 62 | `.sahne.bolumler[b2].cevapla.why_tr` | İşi **Früher habe ich im Lager gearbeitet** gibi söylersin. Zorunluluk **Ich musste** ile gelir. | GEÇTİ |
| 63 | `.sesler[m1:69:a1].title_tr` | Kursleiterin'den sesli mesaj | GEÇTİ |
| 64 | `.sesler[m1:69:a1].ortam_tr` | Öğle arasında telefonuna bakıyorsun. Kursleiterin bütün sınıfa bir sesli mesaj göndermiş. | GEÇTİ |
| 65 | `.sesler[m1:69:a1].bolumler[b1].ana_fikir.q_tr` | Kursleiterin neden arıyor? | GEÇTİ |
| 66 | `.sesler[m1:69:a1].bolumler[b1].ana_fikir.opts[0]` | Pazartesi dersi için bilgi veriyor | GEÇTİ |
| 67 | `.sesler[m1:69:a1].bolumler[b1].ana_fikir.opts[1]` | Kurs iptal oldu | GEÇTİ |
| 68 | `.sesler[m1:69:a1].bolumler[b1].ana_fikir.opts[2]` | Sınav sonucunu söylüyor | GEÇTİ |
| 69 | `.sesler[m1:69:a1].bolumler[b1].ayrinti[0].q_tr` | Pazartesi ders kaçta başlıyor? | GEÇTİ |
| 70 | `.sesler[m1:69:a1].bolumler[b1].ayrinti[0].opts[0]` | Beş buçukta | GEÇTİ |
| 71 | `.sesler[m1:69:a1].bolumler[b1].ayrinti[0].opts[1]` | Altıda | GEÇTİ |
| 72 | `.sesler[m1:69:a1].bolumler[b1].ayrinti[0].opts[2]` | Altı buçukta | GEÇTİ |
| 73 | `.sesler[m1:69:a1].bolumler[b1].ayrinti[1].q_tr` | Evde ne yapmalısın? | GEÇTİ |
| 74 | `.sesler[m1:69:a1].bolumler[b1].ayrinti[1].opts[0]` | İş ilanlarını okumak | GEÇTİ |
| 75 | `.sesler[m1:69:a1].bolumler[b1].ayrinti[1].opts[1]` | Bir mektup yazmak | GEÇTİ |
| 76 | `.sesler[m1:69:a1].bolumler[b1].ayrinti[1].opts[2]` | Bir kelime listesi ezberlemek | GEÇTİ |
| 77 | `.sesler[m1:69:a1].bolumler[b1].dikte[d1].q_tr` | Hangi saati duydun? | GEÇTİ |
| 78 | `.sesler[m1:69:a1].bolumler[b1].dikte[d5].gorev_tr` | Pazartesi için ne bilmelisin? Bir iki kısa cümleyle yaz. | GEÇTİ |
| 79 | `.sesler[m1:69:a1].bolumler[b1].cevapla.situation_tr` | Ioana mesajı dinlemedi. Pazartesi dersin beş buçukta başladığını söyle. | GEÇTİ |
| 80 | `.sesler[m1:69:a1].bolumler[b1].cevapla.why_tr` | Saati **um halb sechs** ile söylersin. **fängt** ikinci yerde, **an** en sonda. | GEÇTİ |
| 81 | `.sesler[m1:69:a1].eylem.q_tr` | Pazartesi ne yapmalısın? | GEÇTİ |
| 82 | `.sesler[m1:69:a1].eylem.opts[0]` | Beş buçukta kursta ol. | GEÇTİ |
| 83 | `.sesler[m1:69:a1].eylem.opts[1]` | Altıda kursta ol. | GEÇTİ |
| 84 | `.sesler[m1:69:a1].eylem.opts[2]` | Kursa gitme. | GEÇTİ |
| 85 | `.sesler[m1:69:a1].eylem.why_tr` | Ders altıda değil, beş buçukta başlıyor. | GEÇTİ |
| 86 | `.sesler[m1:69:a2].title_tr` | Tobi'den sesli mesaj | GEÇTİ |
| 87 | `.sesler[m1:69:a2].ortam_tr` | Akşam telefonuna bakıyorsun. İş arkadaşın Tobi bir sesli mesaj bırakmış. | GEÇTİ |
| 88 | `.sesler[m1:69:a2].bolumler[b1].ana_fikir.q_tr` | Tobi neden arıyor? | GEÇTİ |
| 89 | `.sesler[m1:69:a2].bolumler[b1].ana_fikir.opts[0]` | Şefle konuşmanın nasıl geçtiğini merak ediyor | GEÇTİ |
| 90 | `.sesler[m1:69:a2].bolumler[b1].ana_fikir.opts[1]` | İşe geç kalacağını söylüyor | GEÇTİ |
| 91 | `.sesler[m1:69:a2].bolumler[b1].ana_fikir.opts[2]` | Seni yemeğe çağırıyor | GEÇTİ |
| 92 | `.sesler[m1:69:a2].bolumler[b1].ayrinti[0].q_tr` | Tobi bugün neden gelemedi? | GEÇTİ |
| 93 | `.sesler[m1:69:a2].bolumler[b1].ayrinti[0].opts[0]` | Dişçiye gitmek zorundaydı | GEÇTİ |
| 94 | `.sesler[m1:69:a2].bolumler[b1].ayrinti[0].opts[1]` | Hastaydı | GEÇTİ |
| 95 | `.sesler[m1:69:a2].bolumler[b1].ayrinti[0].opts[2]` | Kurstaydı | GEÇTİ |
| 96 | `.sesler[m1:69:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 97 | `.sesler[m1:69:a2].bolumler[b1].dikte[d5].gorev_tr` | Tobi ne istiyor? Bir iki kısa cümleyle yaz. | GEÇTİ |
| 98 | `.sesler[m1:69:a2].bolumler[b1].cevapla.situation_tr` | Tobi'yi geri arıyorsun. Şefle, yani Wimmer Bey'le konuşamadığını, onun vakti olmadığını söyle. | GEÇTİ |
| 99 | `.sesler[m1:69:a2].bolumler[b1].cevapla.why_tr` | Bugün olmuş, bitmiş: **Ich konnte nicht** ve **Er hatte keine Zeit** dersin. | GEÇTİ |
| 100 | `.sesler[m1:69:a2].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 101 | `.sesler[m1:69:a2].eylem.opts[0]` | Bu akşam Tobi'yi ara. | GEÇTİ |
| 102 | `.sesler[m1:69:a2].eylem.opts[1]` | Şefi ara. | GEÇTİ |
| 103 | `.sesler[m1:69:a2].eylem.opts[2]` | Dişçiden randevu al. | GEÇTİ |
| 104 | `.sesler[m1:69:a2].eylem.why_tr` | Tobi bu akşam onu aramanı istiyor. | GEÇTİ |
| 105 | `.prova.title_tr` | Danışmada: kendini anlat | GEÇTİ |
| 106 | `.prova.durum_tr` | Kursta danışma saati. Kursleiterin seninle konuşuyor. İşin, ne zaman öğrenebildiğin ve ne istediğin hakkında soru soruyor. Sonunda iş için Almanca kursu hakkında bilgi al: ne zaman başlıyor, sonunda ne var? | **GERİ** (Belirsiz: **ne zaman öğrenebildiğin** prova sorularıyla örtüşmüyor (sorular: eskiden ne yaptın, neyi iyi yapabiliyorsun, ne istiyorsun)) |
| 107 | `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Selam verdin ve neden geldiğini söyledin. | GEÇTİ |
| 108 | `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Kısa ve açık bir başlangıç. | GEÇTİ |
| 109 | `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Eski işini **habe gearbeitet**, zorunluluğu **musste** ile anlattın. | GEÇTİ |
| 110 | `.prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | **Damals konnte ich** ile o zamanki durumunu da ekledin. | GEÇTİ |
| 111 | `.prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | **Früher** ile şimdiki biçim olmaz. **Früher habe ich in einer Fabrik gearbeitet** dersin. | **GERİ** (Terim: **şimdiki biçim**) |
| 112 | `.prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Yeteneğini ve bir özelliğini söyledin. | GEÇTİ |
| 113 | `.prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | **Ich kann gut** ve **Ich habe Erfahrung** ile iki güçlü yanını söyledin. | GEÇTİ |
| 114 | `.prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | İsteğini söyledin ve hemen önemli soruyu sordun. | GEÇTİ |
| 115 | `.prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | **Ich möchte** ile kibar istek, **Gibt es eine Möglichkeit** ile soru. | GEÇTİ |
| 116 | `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Tarihi tekrar edip yeni bir soru sordun. | GEÇTİ |
| 117 | `.prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Kibar bir kapanış. İstersen sınavı da sorabilirdin. | GEÇTİ |
| 118 | `.prova.dugumler[n6].secenekler[0].geri_bildirim_tr` | Haftanın kelimesiyle teşekkür ettin: **die Beratung**. | GEÇTİ |
| 119 | `.prova.kapanis_tr` | Danışmada kendini anlattın: eskiden ne yaptın, neyi iyi yapıyorsun, ne istiyorsun. Kursun ne zaman başladığını ve sonunda sınav olup olmadığını öğrendin. | GEÇTİ |
| 120 | `.okuma_yazma.title_tr` | Sınav gibi: kime hangi ilan? | GEÇTİ |
| 121 | `.okuma_yazma.sorular[m1:69:o1].q_tr` | Bu metinde ne var? | GEÇTİ |
| 122 | `.okuma_yazma.sorular[m1:69:o1].opts[0]` | Beş kişi ve altı ilan | GEÇTİ |
| 123 | `.okuma_yazma.sorular[m1:69:o1].opts[1]` | Bir mektup | GEÇTİ |
| 124 | `.okuma_yazma.sorular[m1:69:o1].opts[2]` | Bir kursun programı | GEÇTİ |
| 125 | `.okuma_yazma.sorular[m1:69:o2].q_tr` | Moritz için hangi ilan? İpucu: önce saatine bak, yalnız öğleden önce. | GEÇTİ |
| 126 | `.okuma_yazma.sorular[m1:69:o2].why_tr` | Moritz yalnız öğleden önce çalışabilir. **B** sabah altıdan on bire kadar. **A** gece. | GEÇTİ |
| 127 | `.okuma_yazma.sorular[m1:69:o3].q_tr` | Lea için hangi ilan? İpucu: deneyim sözcüğünü ara. | GEÇTİ |
| 128 | `.okuma_yazma.sorular[m1:69:o3].why_tr` | Lea'nın deneyimi yok. **E** diyor ki: **auch ohne Erfahrung**. | GEÇTİ |
| 129 | `.okuma_yazma.sorular[m1:69:o4].q_tr` | Julia için hangi ilan? | GEÇTİ |
| 130 | `.okuma_yazma.sorular[m1:69:o4].why_tr` | Julia akşam bir kurs arıyor. **F** akşam altıdan sekize. | GEÇTİ |
| 131 | `.okuma_yazma.sorular[m1:69:o5].q_tr` | David için hangi ilan? | GEÇTİ |
| 132 | `.okuma_yazma.sorular[m1:69:o5].why_tr` | David elektrikçi, tam gün istiyor. **D** tam bunu arıyor. | GEÇTİ |
| 133 | `.okuma_yazma.sorular[m1:69:o6].q_tr` | Jan için hangi ilan? | GEÇTİ |
| 134 | `.okuma_yazma.sorular[m1:69:o6].why_tr` | Jan yalnız hafta sonu çalışmak istiyor. **C** pazartesiden cumaya. Ona hiçbir ilan uymuyor: **keine Anzeige**. | GEÇTİ |
| 135 | `.okuma_yazma.sorular[m1:69:o7].why_tr` | **Letzte Woche** geçmiştir. **kann** değil **konnte**: noktalar düşer, **-te-** girer. | **GERİ** (Belirsiz: **kann**'da düşecek nokta yok) |
| 136 | `.okuma_yazma.sorular[m1:69:o8].why_tr` | **du** ile **musstest**: çift s kalır, sonda **-test**. | GEÇTİ |
| 137 | `.okuma_yazma.sorular[m1:69:o9].q_tr` | Derya ile Tobi'ye: eskiden vardiyalı çalışmak zorundaydınız, değil mi? | GEÇTİ |
| 138 | `.okuma_yazma.sorular[m1:69:o9].why_tr` | **ihr** ile son **-tet**: **musstet**. | GEÇTİ |
| 139 | `.okuma_yazma.sorular[m1:69:o10].instr_tr` | Cümleyi eskiye taşı. Başa **Früher** koy. | GEÇTİ |
| 140 | `.okuma_yazma.sorular[m1:69:o10].why_tr` | **dürfen** geçmişte **durften** olur. **Früher** başa gelince **durften** hemen arkasından gelir. | GEÇTİ |
| 141 | `.okuma_yazma.sorular[m1:69:o11].instr_tr` | Soruyu dün için sor. **Gestern** ekle. | GEÇTİ |
| 142 | `.okuma_yazma.sorular[m1:69:o11].why_tr` | **kannst** geçmişte **konntest** olur. **du** ile son **-st** kalır. | GEÇTİ |
| 143 | `.okuma_yazma.sorular[m1:69:o12].why_tr` | Eskiyi **Früher konnte ich** ile söylersin. **sprechen** en sona gider. | GEÇTİ |
| 144 | `.okuma_yazma.sorular[m1:69:o13].why_tr` | Arkadaş grubuna **ihr** dersin: **Musstet ihr gestern früh gehen?** | GEÇTİ |
| 145 | `.okuma_yazma.sorular[m1:69:o14].q_tr` | Hangisi doğru yazılmış? | GEÇTİ |
| 146 | `.okuma_yazma.sorular[m1:69:o14].why_tr` | **müssen**'in çift s'si geçmişte de kalır: **mussten**. | GEÇTİ |
| 147 | `.okuma_yazma.sorular[m1:69:o15].why_tr` | **ich** ile **wollte**. **will** bugündür, çocukluk geçmiştir. | GEÇTİ |
| 148 | `.okuma_yazma.sorular[m1:69:o16].q_tr` | Hangi artikel? ___ Bewerbung | **GERİ** (Terim: **artikel**) |
| 149 | `.okuma_yazma.sorular[m1:69:o16].why_tr` | Sonu **-ung**: hep **die**. **die Bewerbung**. | GEÇTİ |
| 150 | `.okuma_yazma.sorular[m1:69:o17].why_tr` | **erklären** fiilinden **die Erklärung**. | **GERİ** (Terim: **fiil**) |
| 151 | `.okuma_yazma.sorular[m1:69:o18].q_tr` | Hangi sözcükte **u** sesi var? | GEÇTİ |
| 152 | `.okuma_yazma.sorular[m1:69:o18].why_tr` | **Stunde** u ile, dudaklar öne. **Sohn** o ile. | GEÇTİ |
| 153 | `.okuma_yazma.yazma.gorev_tr` | Pazartesi kursta kendini kısaca tanıtacaksın. Söyleyeceklerini yaz: kimsin, eskiden ne yaptın, ne yapmak zorundaydın, bugün ne yapıyorsun, neyi iyi yaparsın, ne istiyorsun? Altı sekiz cümle. | **GERİ** (İkinci cümle 17 kelime) |
| 154 | `.okuma_yazma.yazma.kontrol_tr[0]` | Eskiyi **Früher** ile, bugünü **Heute** ile anlattın mı? | GEÇTİ |
| 155 | `.okuma_yazma.yazma.kontrol_tr[1]` | En az bir **musste**, **konnte** ya da **durfte** var mı? | GEÇTİ |
| 156 | `.okuma_yazma.yazma.kontrol_tr[2]` | Sonda ne istediğini **Ich möchte** ile yazdın mı? | GEÇTİ |
| 157 | `.gun_sinavi.maddeler[m1:69:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 158 | `.gun_sinavi.maddeler[m1:69:s1].why_tr` | **die Chefin** kadın şeftir. **Geduld** sabırdır. | GEÇTİ |
| 159 | `.gun_sinavi.maddeler[m1:69:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 160 | `.gun_sinavi.maddeler[m1:69:s2].why_tr` | **durften** u ile söylenir ve yazılır. | GEÇTİ |
| 161 | `.gun_sinavi.maddeler[m1:69:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 162 | `.gun_sinavi.maddeler[m1:69:s3].why_tr` | **vormittags** öğleden önce demektir. İlanlarda çok çıkar. | GEÇTİ |
| 163 | `.gun_sinavi.maddeler[m1:69:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 164 | `.gun_sinavi.maddeler[m1:69:s4].why_tr` | **das Studium** üniversite eğitimidir. Olumsuzu **kein Studium**. | GEÇTİ |
| 165 | `.gun_sinavi.maddeler[m1:69:s5].why_tr` | İsteği **wollte** ile söylersin. **machen** en sona gider. | GEÇTİ |
| 166 | `.gun_sinavi.maddeler[m1:69:s6].why_tr` | **ihr** ile son **-tet**: **musstet**. Çift s kalır. | GEÇTİ |
| 167 | `.gun_sinavi.maddeler[m1:69:s7].why_tr` | İlandaki gibi: **nur am Wochenende**. | GEÇTİ |
| 168 | `.gun_sinavi.maddeler[m1:69:s8].why_tr` | Kadın şef **die Chefin**, benimki **meine Chefin**. | GEÇTİ |
| 169 | `.gun_sinavi.maddeler[m1:69:s9].situation_tr` | Ioana danışmayı soruyor. Kursun martta başladığını ve sonunda bir sınav olduğunu söyle. | GEÇTİ |
| 170 | `.gun_sinavi.maddeler[m1:69:s9].why_tr` | Zamanı **im März** ile söylersin. **Am Ende gibt es** sonunda var demektir. | GEÇTİ |
| 171 | `.gun_sinavi.maddeler[m1:69:s10].situation_tr` | Kursta kendini kısaca tanıt: eskiden ne iş yaptın, bugün ne yapıyorsun? | GEÇTİ |
| 172 | `.gun_sinavi.maddeler[m1:69:s10].why_tr` | Eskiyi **Früher habe ich gearbeitet**, bugünü **Heute arbeite ich** ile söylersin. | GEÇTİ |
| 173 | `.gun_sinavi.maddeler[m1:69:s11].situation_tr` | Kurstan Jan yalnız hafta sonu çalışmak istiyor. Okuduğun bütün ilanlar pazartesiden cumaya. Ona uygun bir iş olmadığını söyle. | GEÇTİ |
| 174 | `.gun_sinavi.maddeler[m1:69:s11].why_tr` | Olumsuz cevabı **leider** ile yumuşatırsın. Nedenini de söylersin: **von Montag bis Freitag**. | GEÇTİ |

### `content/v2/m1/gun-70.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.title_tr` | Haftanın sınavı: deneme süresi bitiyor | GEÇTİ |
| 2 | `.goal_tr` | Deneme sürenin sonunda Wimmer Bey seni odasına çağırıyor. Başta neyi yapamadığını, bugün neyi iyi yaptığını, ne istediğini anlatırsın. Fazla mesai sorusuna cevap verir, mesleki eğitim istersin. | GEÇTİ |
| 3 | `.can_do.tr` | Şefime işteki başlangıcımı, bugün neyi iyi yaptığımı ve ne istediğimi anlatırım. | GEÇTİ |
| 4 | `.halkalar[m1:70:h1].title_tr` | İşte: fazla mesai ve deneme süresi | GEÇTİ |
| 5 | `.halkalar[m1:70:h1].sahne.ortam_tr` | Firma Kerschbaum, sabah. Derya dolabın yanında seni görüyor. | GEÇTİ |
| 6 | `.halkalar[m1:70:h1].sahne.soru.q_tr` | Derya sana ne diyor? | GEÇTİ |
| 7 | `.halkalar[m1:70:h1].sahne.soru.opts[0]` | Başarırsın, çalışkan ve güvenilirsin | GEÇTİ |
| 8 | `.halkalar[m1:70:h1].sahne.soru.opts[1]` | Şefe gitme | GEÇTİ |
| 9 | `.halkalar[m1:70:h1].sahne.soru.opts[2]` | Bugün fazla mesai yap | GEÇTİ |
| 10 | `.sahne.title_tr` | Wimmer Bey'in odasında | GEÇTİ |
| 11 | `.sahne.sahneler[s1].sahne_tr` | Firma Kerschbaum, sabah. Wimmer Bey kapıda, elinde bir dosya. Seni çağırıyor. | GEÇTİ |
| 12 | `.sahne.sahneler[s2].sahne_tr` | Wimmer Bey masasına oturuyor, dosyayı açıyor. | GEÇTİ |
| 13 | `.sahne.sahneler[s3].sahne_tr` | Wimmer Bey sakin, hızlı konuşuyor. | GEÇTİ |
| 14 | `.sahne.sahneler[s4].sahne_tr` | Wimmer Bey dosyadan bir sayfa çeviriyor. | GEÇTİ |
| 15 | `.sahne.sahneler[s5].sahne_tr` | Wimmer Bey başını kaldırıp gülümsüyor. | GEÇTİ |
| 16 | `.sahne.sahneler[s6].sahne_tr` | Wimmer Bey dosyayı kapatıyor. | GEÇTİ |
| 17 | `.sahne.sahneler[s7].sahne_tr` | Wimmer Bey takvime bakıyor. | GEÇTİ |
| 18 | `.sahne.sahneler[s8].sahne_tr` | Wimmer Bey sana doğru eğiliyor. | GEÇTİ |
| 19 | `.sahne.sahneler[s9].sahne_tr` | Wimmer Bey bir not kâğıdını gösteriyor. | GEÇTİ |
| 20 | `.sahne.sahneler[s10].sahne_tr` | Wimmer Bey kâğıdı sana uzatıyor. | GEÇTİ |
| 21 | `.sahne.sahneler[s11].sahne_tr` | Wimmer Bey saatine bakıyor, kalkıyor. | GEÇTİ |
| 22 | `.sahne.sahneler[s12].sahne_tr` | Öğle arası. Derya mutfakta seni merakla bekliyor. | GEÇTİ |
| 23 | `.sahne.sahneler[s13].sahne_tr` | Derya yüzündeki gülümsemeyi görüyor, sarılıyor. | GEÇTİ |
| 24 | `.sahne.bolumler[b1].ana_fikir.q_tr` | Wimmer Bey ne söylüyor? | GEÇTİ |
| 25 | `.sahne.bolumler[b1].ana_fikir.opts[0]` | Deneme süresi bitiyor ve firmada kalabilirsin | GEÇTİ |
| 26 | `.sahne.bolumler[b1].ana_fikir.opts[1]` | Başka bir depoya gidiyorsun | GEÇTİ |
| 27 | `.sahne.bolumler[b1].ana_fikir.opts[2]` | Yarın izinlisin | GEÇTİ |
| 28 | `.sahne.bolumler[b1].ayrinti[0].q_tr` | Başta ne zordu? | GEÇTİ |
| 29 | `.sahne.bolumler[b1].ayrinti[0].opts[0]` | Çok şey anlayamamak | GEÇTİ |
| 30 | `.sahne.bolumler[b1].ayrinti[0].opts[1]` | Erken kalkmak | GEÇTİ |
| 31 | `.sahne.bolumler[b1].ayrinti[0].opts[2]` | Araba sürmek | GEÇTİ |
| 32 | `.sahne.bolumler[b1].ayrinti[1].q_tr` | Wimmer Bey seni bugün nasıl buluyor? | GEÇTİ |
| 33 | `.sahne.bolumler[b1].ayrinti[1].opts[0]` | Çalışkan ve güvenilir | GEÇTİ |
| 34 | `.sahne.bolumler[b1].ayrinti[1].opts[1]` | Sabırsız | GEÇTİ |
| 35 | `.sahne.bolumler[b1].ayrinti[1].opts[2]` | Hep geç kalan | GEÇTİ |
| 36 | `.sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 37 | `.sahne.bolumler[b1].dikte[d5].gorev_tr` | Wimmer Bey ne dedi? İki kısa cümleyle yaz. | GEÇTİ |
| 38 | `.sahne.bolumler[b1].cevapla.situation_tr` | Wimmer Bey kalabileceğini söyledi. Teşekkür et ve kalmak istediğini söyle. | GEÇTİ |
| 39 | `.sahne.bolumler[b1].cevapla.why_tr` | Önce teşekkür edersin, sonra **Ich bleibe gern** dersin. **gern** isteğini gösterir. | GEÇTİ |
| 40 | `.sahne.bolumler[b2].ana_fikir.q_tr` | Wimmer Bey neyi soruyor ve öneriyor? | GEÇTİ |
| 41 | `.sahne.bolumler[b2].ana_fikir.opts[0]` | Fazla mesaiyi soruyor, bir kurs öneriyor | GEÇTİ |
| 42 | `.sahne.bolumler[b2].ana_fikir.opts[1]` | Tatil planını soruyor | GEÇTİ |
| 43 | `.sahne.bolumler[b2].ana_fikir.opts[2]` | Yeni adresini soruyor | GEÇTİ |
| 44 | `.sahne.bolumler[b2].ayrinti[0].q_tr` | Aralıkta ne var? | GEÇTİ |
| 45 | `.sahne.bolumler[b2].ayrinti[0].opts[0]` | Depoda çok iş | GEÇTİ |
| 46 | `.sahne.bolumler[b2].ayrinti[0].opts[1]` | Uzun bir tatil | GEÇTİ |
| 47 | `.sahne.bolumler[b2].ayrinti[0].opts[2]` | Bir parti | GEÇTİ |
| 48 | `.sahne.bolumler[b2].ayrinti[1].q_tr` | Bilgisayar kursunu kim ödüyor? | GEÇTİ |
| 49 | `.sahne.bolumler[b2].ayrinti[1].opts[0]` | Firma | GEÇTİ |
| 50 | `.sahne.bolumler[b2].ayrinti[1].opts[1]` | Sen | GEÇTİ |
| 51 | `.sahne.bolumler[b2].ayrinti[1].opts[2]` | Kurs bürosu | GEÇTİ |
| 52 | `.sahne.bolumler[b2].ayrinti[2].q_tr` | Derya neden seviniyor? | GEÇTİ |
| 53 | `.sahne.bolumler[b2].ayrinti[2].opts[0]` | Firmada kalabildiğin için | GEÇTİ |
| 54 | `.sahne.bolumler[b2].ayrinti[2].opts[1]` | Kursa gittiği için | GEÇTİ |
| 55 | `.sahne.bolumler[b2].ayrinti[2].opts[2]` | Tatile çıktığı için | GEÇTİ |
| 56 | `.sahne.bolumler[b2].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 57 | `.sahne.bolumler[b2].dikte[d5].gorev_tr` | Wimmer Bey neyi soruyor, neyi öneriyor? İki kısa cümleyle yaz. | GEÇTİ |
| 58 | `.sahne.bolumler[b2].cevapla.situation_tr` | Wimmer Bey fazla mesai soruyor. Cumartesi yapabileceğini ama akşamları kursun olduğunu söyle. | GEÇTİ |
| 59 | `.sahne.bolumler[b2].cevapla.why_tr` | Önce **Ja, am Samstag kann ich** dersin. Sınırını **aber** ile eklersin. | GEÇTİ |
| 60 | `.sesler[m1:70:a1].title_tr` | Depoda Wimmer Bey'in anonsu | GEÇTİ |
| 61 | `.sesler[m1:70:a1].ortam_tr` | Depodasın. Hoparlörden Wimmer Bey bütün çalışanlara konuşuyor. | GEÇTİ |
| 62 | `.sesler[m1:70:a1].bolumler[b1].ana_fikir.q_tr` | Wimmer Bey ne istiyor? | GEÇTİ |
| 63 | `.sesler[m1:70:a1].bolumler[b1].ana_fikir.opts[0]` | Cumartesi çalışacak kişiler arıyor | GEÇTİ |
| 64 | `.sesler[m1:70:a1].bolumler[b1].ana_fikir.opts[1]` | Yeni bir kurs açıyor | GEÇTİ |
| 65 | `.sesler[m1:70:a1].bolumler[b1].ana_fikir.opts[2]` | Depoyu kapatıyor | GEÇTİ |
| 66 | `.sesler[m1:70:a1].bolumler[b1].ayrinti[0].q_tr` | Ne zamana kadar söylemelisin? | GEÇTİ |
| 67 | `.sesler[m1:70:a1].bolumler[b1].ayrinti[0].opts[0]` | Cumaya kadar | GEÇTİ |
| 68 | `.sesler[m1:70:a1].bolumler[b1].ayrinti[0].opts[1]` | Cumartesiye kadar | GEÇTİ |
| 69 | `.sesler[m1:70:a1].bolumler[b1].ayrinti[0].opts[2]` | Aralığa kadar | GEÇTİ |
| 70 | `.sesler[m1:70:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 71 | `.sesler[m1:70:a1].bolumler[b1].dikte[d5].gorev_tr` | Anonsta ne dendi? Bir iki kısa cümleyle yaz. | GEÇTİ |
| 72 | `.sesler[m1:70:a1].bolumler[b1].cevapla.situation_tr` | Koridorda Wimmer Bey'i görüyorsun. Cumartesi fazla mesai yapabileceğini söyle. | GEÇTİ |
| 73 | `.sesler[m1:70:a1].bolumler[b1].cevapla.why_tr` | Zamanı başa koyarsan fiil hemen arkasından gelir: **Am Samstag kann ich**. | **GERİ** (Terim: **fiil**) |
| 74 | `.sesler[m1:70:a1].eylem.q_tr` | Cumartesi çalışmak istiyorsan ne yapmalısın? | GEÇTİ |
| 75 | `.sesler[m1:70:a1].eylem.opts[0]` | Cumaya kadar Wimmer Bey'e söyle. | GEÇTİ |
| 76 | `.sesler[m1:70:a1].eylem.opts[1]` | Cumartesi sabah depoya git. | GEÇTİ |
| 77 | `.sesler[m1:70:a1].eylem.opts[2]` | Derya'ya bir e-posta yaz. | GEÇTİ |
| 78 | `.sesler[m1:70:a1].eylem.why_tr` | Wimmer Bey cumaya kadar kendisine söylemeni istiyor. | GEÇTİ |
| 79 | `.sesler[m1:70:a2].title_tr` | Ioana'dan sesli mesaj | GEÇTİ |
| 80 | `.sesler[m1:70:a2].ortam_tr` | Akşam telefonuna bakıyorsun. Ioana çok heyecanlı bir mesaj bırakmış. | GEÇTİ |
| 81 | `.sesler[m1:70:a2].bolumler[b1].ana_fikir.q_tr` | Ioana neden arıyor? | GEÇTİ |
| 82 | `.sesler[m1:70:a2].bolumler[b1].ana_fikir.opts[0]` | Anaokulundaki işi aldığını anlatıyor | GEÇTİ |
| 83 | `.sesler[m1:70:a2].bolumler[b1].ana_fikir.opts[1]` | İşini kaybetti | GEÇTİ |
| 84 | `.sesler[m1:70:a2].bolumler[b1].ana_fikir.opts[2]` | Kursa gelemiyor | GEÇTİ |
| 85 | `.sesler[m1:70:a2].bolumler[b1].ayrinti[0].q_tr` | Ioana bugün kaçta başlamak zorundaydı? | GEÇTİ |
| 86 | `.sesler[m1:70:a2].bolumler[b1].ayrinti[0].opts[0]` | Yedide | GEÇTİ |
| 87 | `.sesler[m1:70:a2].bolumler[b1].ayrinti[0].opts[1]` | Sekizde | GEÇTİ |
| 88 | `.sesler[m1:70:a2].bolumler[b1].ayrinti[0].opts[2]` | Onda | GEÇTİ |
| 89 | `.sesler[m1:70:a2].bolumler[b1].ayrinti[1].q_tr` | Ioana pazar günü için ne yapıyor? | GEÇTİ |
| 90 | `.sesler[m1:70:a2].bolumler[b1].ayrinti[1].opts[0]` | Senin için pasta yapıyor | GEÇTİ |
| 91 | `.sesler[m1:70:a2].bolumler[b1].ayrinti[1].opts[1]` | Çalışıyor | GEÇTİ |
| 92 | `.sesler[m1:70:a2].bolumler[b1].ayrinti[1].opts[2]` | Kursa gidiyor | GEÇTİ |
| 93 | `.sesler[m1:70:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 94 | `.sesler[m1:70:a2].bolumler[b1].dikte[d5].gorev_tr` | Ioana'nın haberi ne? Bir iki kısa cümleyle yaz. | GEÇTİ |
| 95 | `.sesler[m1:70:a2].bolumler[b1].cevapla.situation_tr` | Ioana'yı geri arıyorsun. Onu tebrik et ve pazar günü vaktin olduğunu söyle. | GEÇTİ |
| 96 | `.sesler[m1:70:a2].bolumler[b1].cevapla.why_tr` | Güzel bir habere **Herzlichen Glückwunsch** dersin. Zamanı **am Sonntag** ile söylersin. | GEÇTİ |
| 97 | `.sesler[m1:70:a2].eylem.q_tr` | Ne yapmalısın? | GEÇTİ |
| 98 | `.sesler[m1:70:a2].eylem.opts[0]` | Ioana'ya pazar için cevap ver. | GEÇTİ |
| 99 | `.sesler[m1:70:a2].eylem.opts[1]` | Yarın saat yedide anaokuluna git. | GEÇTİ |
| 100 | `.sesler[m1:70:a2].eylem.opts[2]` | Ioana'ya bir pasta getir. | GEÇTİ |
| 101 | `.sesler[m1:70:a2].eylem.why_tr` | Ioana pazar günü vaktin olup olmadığını soruyor. | GEÇTİ |
| 102 | `.prova.title_tr` | Wimmer Bey ile: haftanın son konuşması | GEÇTİ |
| 103 | `.prova.durum_tr` | Deneme süren bitiyor. Wimmer Bey seni odasına çağırdı. Başlangıcını, bugün neyi iyi yaptığını anlat, fazla mesai sorusuna cevap ver ve bir isteğini söyle. | **GERİ** (Son cümle 15 kelime) |
| 104 | `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Başlangıcı dürüstçe **konnte** ile anlattın. | GEÇTİ |
| 105 | `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Zorluğu **musste** ile söyledin ve iş arkadaşlarını övdün. | GEÇTİ |
| 106 | `.prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Başlangıç geçmişte kaldı. **kann** değil **konnte**: **Am Anfang konnte ich nicht viel verstehen.** | GEÇTİ |
| 107 | `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Bugünü **kann gut** ile söyledin, bir de özelliğini ekledin. | GEÇTİ |
| 108 | `.prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Ekip ve deneyim: şefin duymak istediği iki şey. | GEÇTİ |
| 109 | `.prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Açık ve olumlu bir cevap. Günü de söyledin. | GEÇTİ |
| 110 | `.prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Evet dedin ama sınırını da kibarca söyledin. Bu çok iyi. | GEÇTİ |
| 111 | `.prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Şefe yalnız **Nein** sert duyulur. Nedenini söyle ya da başka bir gün öner. | GEÇTİ |
| 112 | `.prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | İsteğini **möchte** ile kibarca söyledin ve imkân sordun. | GEÇTİ |
| 113 | `.prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Somut bir istek ve net bir soru. Çok iyi. | GEÇTİ |
| 114 | `.prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Para sormak olur ama **Ich will** şefe çok sert duyulur. **Ich möchte gern mehr verdienen** daha kibar. | GEÇTİ |
| 115 | `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Sevincini kısa ve sıcak söyledin. | GEÇTİ |
| 116 | `.prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Haftanın kelimesiyle teşekkür ettin: **Geduld**. | GEÇTİ |
| 117 | `.prova.kapanis_tr` | Şefinle deneme süresinin sonunu konuştun. Başlangıcı **konnte** ve **musste** ile, bugünü **kann gut** ile anlattın, fazla mesaiye cevap verdin ve bir eğitim istedin. | **GERİ** (İkinci cümle 18 kelime) |
| 118 | `.okuma_yazma.title_tr` | Wimmer Bey'den e-posta | GEÇTİ |
| 119 | `.okuma_yazma.sorular[m1:70:o1].q_tr` | Wimmer Bey neden yazıyor? | GEÇTİ |
| 120 | `.okuma_yazma.sorular[m1:70:o1].opts[0]` | Aralıktaki iş ve ocaktaki bir kurs için | GEÇTİ |
| 121 | `.okuma_yazma.sorular[m1:70:o1].opts[1]` | Bir parti için | GEÇTİ |
| 122 | `.okuma_yazma.sorular[m1:70:o1].opts[2]` | Yeni bir çalışan için | GEÇTİ |
| 123 | `.okuma_yazma.sorular[m1:70:o2].q_tr` | Fazla mesai için ne alıyorsun? | GEÇTİ |
| 124 | `.okuma_yazma.sorular[m1:70:o2].opts[0]` | Daha çok para | GEÇTİ |
| 125 | `.okuma_yazma.sorular[m1:70:o2].opts[1]` | Bir gün izin | GEÇTİ |
| 126 | `.okuma_yazma.sorular[m1:70:o2].opts[2]` | Hiçbir şey | GEÇTİ |
| 127 | `.okuma_yazma.sorular[m1:70:o3].q_tr` | Deneme süresindeki biri aralıkta neyi yapamaz? | GEÇTİ |
| 128 | `.okuma_yazma.sorular[m1:70:o3].opts[0]` | İzin alamaz | GEÇTİ |
| 129 | `.okuma_yazma.sorular[m1:70:o3].opts[1]` | Fazla mesai yapamaz | GEÇTİ |
| 130 | `.okuma_yazma.sorular[m1:70:o3].opts[2]` | Kursa gidemez | GEÇTİ |
| 131 | `.okuma_yazma.sorular[m1:70:o4].q_tr` | Kursa katılmak istiyorsan ne zamana kadar söylemelisin? | GEÇTİ |
| 132 | `.okuma_yazma.sorular[m1:70:o4].opts[0]` | Cumaya kadar | GEÇTİ |
| 133 | `.okuma_yazma.sorular[m1:70:o4].opts[1]` | Ocağa kadar | GEÇTİ |
| 134 | `.okuma_yazma.sorular[m1:70:o4].opts[2]` | Salıya kadar | GEÇTİ |
| 135 | `.okuma_yazma.sorular[m1:70:o5].situation_tr` | Koridorda Wimmer Bey soruyor. Kursu yapmak istediğini söyle. | GEÇTİ |
| 136 | `.okuma_yazma.sorular[m1:70:o5].why_tr` | İsteğini **Ich möchte** ile söylersin. **machen** en sona gider. | GEÇTİ |
| 137 | `.okuma_yazma.sorular[m1:70:o6].q_tr` | Sınavdaki gibi: Tobi yalnız akşam altıdan sonra vakit bulabiliyor. Bilgisayar kursu ona uyar mı? | GEÇTİ |
| 138 | `.okuma_yazma.sorular[m1:70:o6].opts[0]` | Evet, uyar | GEÇTİ |
| 139 | `.okuma_yazma.sorular[m1:70:o6].opts[1]` | Hayır, kurs 16'dan 18'e kadar | GEÇTİ |
| 140 | `.okuma_yazma.sorular[m1:70:o6].opts[2]` | Metinde bilgi yok | GEÇTİ |
| 141 | `.okuma_yazma.sorular[m1:70:o6].why_tr` | Önce saate bakarsın. Kurs 16'da başlıyor, Tobi 18'den sonra gelebiliyor. Uymuyor. | GEÇTİ |
| 142 | `.okuma_yazma.sorular[m1:70:o7].q_tr` | Sınavdaki gibi: Derya pazartesi ve çarşamba öğleden sonra boş. Ocakta bir kurs istiyor. Bilgisayar kursu ona uyar mı? | GEÇTİ |
| 143 | `.okuma_yazma.sorular[m1:70:o7].opts[0]` | Evet, uyar | GEÇTİ |
| 144 | `.okuma_yazma.sorular[m1:70:o7].opts[1]` | Hayır, kurs cumartesi | GEÇTİ |
| 145 | `.okuma_yazma.sorular[m1:70:o7].opts[2]` | Metinde bilgi yok | GEÇTİ |
| 146 | `.okuma_yazma.sorular[m1:70:o7].why_tr` | Gün ve saat uyuyor: pazartesi ve çarşamba, 16'dan 18'e. Ay da ocak. | GEÇTİ |
| 147 | `.okuma_yazma.yazma.gorev_tr` | Wimmer Bey'e kısa bir cevap yaz. Kursu yapmak istediğini ve cumartesi fazla mesai yapabileceğini söyle. | GEÇTİ |
| 148 | `.okuma_yazma.yazma.kontrol_tr[0]` | Kursu istediğini **Ich möchte** ile yazdın mı? | GEÇTİ |
| 149 | `.okuma_yazma.yazma.kontrol_tr[1]` | **Überstunden** sözcüğü var mı? | GEÇTİ |
| 150 | `.okuma_yazma.yazma.kontrol_tr[2]` | Zamanla başlayan cümlede fiil ikinci yerde mi? **Am Samstag kann ich** | **GERİ** (Terim: **fiil**) |
| 151 | `.gun_sinavi.maddeler[m1:70:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 152 | `.gun_sinavi.maddeler[m1:70:s1].why_tr` | **die Probezeit** yeni işte deneme süresidir. | GEÇTİ |
| 153 | `.gun_sinavi.maddeler[m1:70:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 154 | `.gun_sinavi.maddeler[m1:70:s2].why_tr` | **wir** ile **konnten**, sonda **-ten**. | GEÇTİ |
| 155 | `.gun_sinavi.maddeler[m1:70:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 156 | `.gun_sinavi.maddeler[m1:70:s3].why_tr` | Fazla mesai **Überstunden machen** diye söylenir. | GEÇTİ |
| 157 | `.gun_sinavi.maddeler[m1:70:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 158 | `.gun_sinavi.maddeler[m1:70:s4].why_tr` | **ihr** ile **musstet**: çift s ve sonda **-tet**. | GEÇTİ |
| 159 | `.gun_sinavi.maddeler[m1:70:s5].why_tr` | Bitmek burada **zu Ende sein** olur: **ist bald zu Ende**. | GEÇTİ |
| 160 | `.gun_sinavi.maddeler[m1:70:s6].why_tr` | Başlangıç geçmiştir: **musste**. **fragen** en sona gider. | GEÇTİ |
| 161 | `.gun_sinavi.maddeler[m1:70:s7].why_tr` | Bugün için **kann gut**. Zaman başta olunca fiil ikinci yerde kalır. | **GERİ** (Terim: **fiil**) |
| 162 | `.gun_sinavi.maddeler[m1:70:s8].why_tr` | Kibar istek **Ich möchte**, imkân sormak **Gibt es eine Möglichkeit?** | GEÇTİ |
| 163 | `.gun_sinavi.maddeler[m1:70:s9].situation_tr` | Derya soruyor: şefle konuşma nasıl geçti? Deneme süresinin bittiğini ve kalabileceğini söyle. | GEÇTİ |
| 164 | `.gun_sinavi.maddeler[m1:70:s9].why_tr` | Sonucu kısaca söylersin: **Ich kann bleiben** ya da **Ich darf bleiben**. | GEÇTİ |
| 165 | `.gun_sinavi.maddeler[m1:70:s10].situation_tr` | Wimmer Bey fazla mesai soruyor. Cumartesi yapabileceğini söyle. | GEÇTİ |
| 166 | `.gun_sinavi.maddeler[m1:70:s10].why_tr` | **Am Samstag** başta olunca **kann** hemen arkasından gelir. | GEÇTİ |
| 167 | `.gun_sinavi.maddeler[m1:70:s11].situation_tr` | Haftanın son konuşması. Wimmer Bey başlangıcı soruyor. Başta çok anlayamadığını, bugün ekipte iyi çalıştığını söyle. | GEÇTİ |
| 168 | `.gun_sinavi.maddeler[m1:70:s11].why_tr` | Eskiyi **konnte** ile, bugünü **kann** ile söylersin. İkisi yan yana farkı gösterir. | GEÇTİ |
| 169 | `.halkalar[m1:70:h1].sahne.satirlar[2].tr` | Almanca, başarırsın! Çalışkansın ve güvenilirsin. | **GERİ** (Anlamsız satır. Almancası da tuhaf: **Auf Deutsch, du schaffst das!** (dilbilimciye)) |

### `content/v2/m1/hafta-sonu-testi-10.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.maddeler[m1:70:t01].situation_tr` | Kursa yeni biri geldi ve seni tanımak istiyor. Eskiden bir restoranda çalıştığını, bugün depoda çalıştığını söyle. | GEÇTİ |
| 2 | `.maddeler[m1:70:t01].why_tr` | Eskiyi **Früher habe ich gearbeitet** ile, bugünü **Heute arbeite ich** ile söylersin. | GEÇTİ |
| 3 | `.maddeler[m1:70:t02].why_tr` | Dün geçmiştir: **musste**. Noktalar düşer, çift s kalır, araya **-te-** girer. | GEÇTİ |
| 4 | `.maddeler[m1:70:t03].why_tr` | Yeni işteki deneme süresi **die Probezeit**. İçinde olmak **in der Probezeit sein**. | GEÇTİ |
| 5 | `.maddeler[m1:70:t04].situation_tr` | Haftada yalnız yirmi saat, yalnız öğleden önce çalışıyorsun. Söyle. | GEÇTİ |
| 6 | `.maddeler[m1:70:t04].why_tr` | Yarım gün **in Teilzeit**, tam gün **in Vollzeit** olur. | GEÇTİ |
| 7 | `.maddeler[m1:70:t05].why_tr` | **Früher** başta olunca **konnte** ikinci yere gelir. **schwimmen** en sona gider. | GEÇTİ |
| 8 | `.maddeler[m1:70:t06].situation_tr` | Tobi'nin bilgisayarı çalışmıyor. Sen bilgisayardan anlıyorsun. Ona yardım öner. | GEÇTİ |
| 9 | `.maddeler[m1:70:t06].why_tr` | Yardım önerirken **Soll ich dir helfen?** dersin. Arkadaşa **dir**, yabancıya **Ihnen**. | GEÇTİ |
| 10 | `.maddeler[m1:70:t07].why_tr` | Danışma **die Beratung**, **beraten** fiilinden gelir. **-ung** hep **die**. | **GERİ** (Terim: **fiil**) |
| 11 | `.maddeler[m1:70:t08].instr_tr` | Soruyu iki arkadaşına sor: **du** yerine **ihr**. | GEÇTİ |
| 12 | `.maddeler[m1:70:t08].why_tr` | **ihr** ile son **-tet** olur: **durftet**. **durftest** du içindir. | GEÇTİ |
| 13 | `.maddeler[m1:70:t09].situation_tr` | Danışmada soruyorlar. Aşçı olmak istediğini söyle. | GEÇTİ |
| 14 | `.maddeler[m1:70:t09].why_tr` | **Ich möchte** ile başlarsın, **werden** en sona gider. Meslek adının önünde **ein** yok. | GEÇTİ |
| 15 | `.maddeler[m1:70:t10].why_tr` | Deneyim **die Erfahrung**. **drei Jahre Erfahrung** iş ilanlarında çok çıkar. | GEÇTİ |
| 16 | `.maddeler[m1:70:t11].why_tr` | Rica sorusu **Können Sie** ile başlar. **helfen** en sona gider. | GEÇTİ |
| 17 | `.maddeler[m1:70:t12].situation_tr` | Ioana soruyor. Dün kursa gelemediğini ve uzun çalışmak zorunda kaldığını söyle. | GEÇTİ |
| 18 | `.maddeler[m1:70:t12].why_tr` | Dün için **konnte** ve **musste**. **kann** ve **muss** bugün içindir. | GEÇTİ |

### `content/v2/m1/gorulmemis-10.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `.durumlar[m1:h10:g1].durum_tr` | Luka'nın salonundasın. Saçını keserken buraya gelmeden önce ne iş yaptığını soruyor. Eskiden bir fabrikada çalıştığını ve çoğu zaman gece çalışmak zorunda olduğunu söyle. | GEÇTİ |
| 2 | `.durumlar[m1:h10:g1].why_tr` | İşi **Früher habe ich gearbeitet** ile, zorunluluğu **Ich musste** ile söylersin. | GEÇTİ |
| 3 | `.durumlar[m1:h10:g2].durum_tr` | Apartman görevlisi Pichler Bey'in yeni bir bilgisayarı var ama kuramıyor. Bilgisayarla iyi çalışabildiğini söyle ve yardım öner. | GEÇTİ |
| 4 | `.durumlar[m1:h10:g2].why_tr` | Yeteneğini **Ich kann gut** ile söylersin. Yaşlı komşuya **Ihnen** dersin. | GEÇTİ |
| 5 | `.durumlar[m1:h10:g3].durum_tr` | Spor salonunda Basti kursta ne için çalıştığını soruyor. Depoda iş aradığını ve yarım gün çalışmak istediğini söyle. | GEÇTİ |
| 6 | `.durumlar[m1:h10:g3].why_tr` | İş arayışını **Ich suche eine Stelle** ile söylersin. Yarım gün **in Teilzeit** olur. | GEÇTİ |
| 7 | `.durumlar[m1:h10:g4].durum_tr` | Merdivende Brandl Hanım'ı görüyorsun. Elinde iki ağır çanta var, nefes nefese. Yardım öner. | GEÇTİ |
| 8 | `.durumlar[m1:h10:g4].why_tr` | Yabancıya ya da yaşlı komşuya yardım önerirken **Soll ich Ihnen helfen?** dersin. | GEÇTİ |
| 9 | `.durumlar[m1:h10:g5].durum_tr` | Bürgerbüro'dasın. Mesleki bir eğitim yapmak istiyorsun ama nereye gideceğini bilmiyorsun. Schneider Hanım ne istediğini soruyor. Söyle ve danışma olup olmadığını sor. | GEÇTİ |
| 10 | `.durumlar[m1:h10:g5].why_tr` | İsteğini **Ich möchte** ile söylersin. Var mı diye **Gibt es hier** ile sorarsın. | GEÇTİ |
| 11 | `.durumlar[m1:h10:g6].durum_tr` | Muayenehaneyi arıyorsun. Dün randevun vardı ama gidemedin. Huber Hanım soruyor. Özür dile, gelemediğini ve uzun çalışmak zorunda kaldığını söyle. | GEÇTİ |
| 12 | `.durumlar[m1:h10:g6].why_tr` | Dün için **konnte** ve **musste**. Önce **Entschuldigung** dersin. | GEÇTİ |
| 13 | `.durumlar[m1:h10:g7].durum_tr` | Molada bir iş arkadaşı, kızının yalnız öğleden önce çalışabildiğini ve iş aradığını söylüyor. Stadler fırınının camındaki ilanı biliyorsun: dükkânda yarım gün, pazartesiden cumaya, altıdan on bire, deneyim gerekmiyor. Ona anlat. | **GERİ** (İkinci cümle 15 kelime) |
| 14 | `.durumlar[m1:h10:g7].why_tr` | İlandaki önemli bilgiyi verirsin: kim arıyor, hangi iş, hangi saatler. | GEÇTİ |
| 15 | `.durumlar[m1:h10:g8].durum_tr` | Fırındasın. Stadler Hanım firmadaki yeni işini soruyor. Başta çok şey anlayamadığını, bugün ekipte iyi çalışabildiğini söyle. | GEÇTİ |
| 16 | `.durumlar[m1:h10:g8].why_tr` | Başlangıcı **konnte**, bugünü **kann** ile söylersin. Fark böyle duyulur. | GEÇTİ |

### `content/v2/registry/lexicon/batch-a2-k02.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `lx:Lager · exp.anlam_tr` | **das Lager** malların ve kutuların durduğu büyük oda ya da binadır, yani depo. | GEÇTİ |
| 2 | `lx:Lager · exp.ne_zaman_tr` | İşte, mağazada ya da firmada mallardan söz ederken. | GEÇTİ |
| 3 | `lx:Lager · exp.ipucu_tr` | Depoda derken **im Lager**, depoya derken **ins Lager** dersin. | GEÇTİ |
| 4 | `lx:Lager · mistakes_tr[0]` | Depoda çalışıyorum derken **Ich arbeite in Lager** yanlış. Doğrusu **Ich arbeite im Lager**. | GEÇTİ |
| 5 | `lx:Lager · mistakes_tr[1]` | Depoya götürmek derken **in Lager bringen** yanlış. Doğrusu **ins Lager bringen**. | GEÇTİ |
| 6 | `lx:Computer · exp.anlam_tr` | **der Computer** bilgisayardır, çoğulu da **die Computer** olur. | **GERİ** (İki fikir (anlam + birden çok hâli); terim: **çoğul**) |
| 7 | `lx:Computer · exp.ne_zaman_tr` | İşte, kursta ya da evde bilgisayardan söz ederken. | GEÇTİ |
| 8 | `lx:Computer · exp.ipucu_tr` | Bilgisayarda çalışmak **am Computer arbeiten** diye söylenir. | GEÇTİ |
| 9 | `lx:Computer · mistakes_tr[0]` | Bilgisayarda çalışıyorum derken **Ich arbeite im Computer** yanlış. Doğrusu **Ich arbeite am Computer**. | GEÇTİ |
| 10 | `lx:Computer · mistakes_tr[1]` | Bilgisayarı açmak derken **den Computer öffnen** yanlış. Doğrusu **den Computer anmachen**. | GEÇTİ |
| 11 | `lx:Computer · mistakes_tr[2]` | Çoğulda sona ek gelmez: **zwei Computers** değil, **zwei Computer**. | **GERİ** (Terimler: **çoğul**, **ek**) |
| 12 | `lx:putzen · exp.anlam_tr` | **putzen** bir yeri ya da bir şeyi silip temizlemektir. | GEÇTİ |
| 13 | `lx:putzen · exp.ne_zaman_tr` | Evde, işte ya da temizlik işini anlatırken. | GEÇTİ |
| 14 | `lx:putzen · exp.ipucu_tr` | Dişler için de kullanılır: **Ich putze mir die Zähne**. | GEÇTİ |
| 15 | `lx:putzen · mistakes_tr[0]` | Temizlik yapıyorum derken **Ich mache Putzen** yanlış. Doğrusu **Ich putze**. | GEÇTİ |
| 16 | `lx:putzen · mistakes_tr[1]` | Dişlerimi fırçalıyorum derken **Ich bürste meine Zähne** pek söylenmez. Doğrusu **Ich putze mir die Zähne**. | GEÇTİ |
| 17 | `lx:putzen · mistakes_tr[2]` | Geçmişte **haben** ile söylenir: **Ich habe geputzt**, **Ich bin geputzt** değil. | GEÇTİ |
| 18 | `lx:Koch · exp.anlam_tr` | **der Koch** restoranda ya da mutfakta iş olarak yemek yapan kişidir. | GEÇTİ |
| 19 | `lx:Koch · exp.ne_zaman_tr` | Mesleğini söylerken ya da restorandan söz ederken. | GEÇTİ |
| 20 | `lx:Koch · exp.ipucu_tr` | Mesleği söylerken **ein** yok: **Ich bin Koch**. | GEÇTİ |
| 21 | `lx:Koch · mistakes_tr[0]` | Aşçı olarak çalışıyorum derken **Ich arbeite als ein Koch** yanlış. Doğrusu **Ich arbeite als Koch**. | GEÇTİ |
| 22 | `lx:Koch · mistakes_tr[1]` | Çoğulda **o** harfi **ö** olur: **der Koch**, **die Köche**. Kadın aşçı **die Köchin**. | **GERİ** (İki fikir; terim: **çoğul**; yanlış değil, bilgi) |
| 23 | `lx:Koch · mistakes_tr[2]` | **der Koch** kişidir, **kochen** yemek yapmaktır: **Der Koch kocht**. | GEÇTİ |
| 24 | `lx:Fahrer · exp.anlam_tr` | **der Fahrer** iş olarak araba, otobüs ya da kamyon kullanan kişidir. | GEÇTİ |
| 25 | `lx:Fahrer · exp.ne_zaman_tr` | Mesleği söylerken ya da otobüste, taksiyle giderken. | GEÇTİ |
| 26 | `lx:Fahrer · exp.ipucu_tr` | Kadın şoför için **die Fahrerin** dersin. | GEÇTİ |
| 27 | `lx:Fahrer · mistakes_tr[0]` | Şoförüm derken **Ich bin ein Fahrer** yanlış. Doğrusu **Ich bin Fahrer**. | GEÇTİ |
| 28 | `lx:Fahrer · mistakes_tr[1]` | Ehliyet derken **Fahrerschein** yanlış. Doğrusu **der Führerschein**. | GEÇTİ |
| 29 | `lx:Fahrer · mistakes_tr[2]` | Kadın şoför **die Fahrerin** olur. Çoğulda sona ek gelmez: **die Fahrer**. | **GERİ** (İki fikir; terimler: **çoğul**, **ek**; ipucu_tr ile aynı bilgi) |
| 30 | `lx:Stellenanzeige · exp.anlam_tr` | **die Stellenanzeige** bir firmanın çalışan aradığını yazdığı ilandır. | GEÇTİ |
| 31 | `lx:Stellenanzeige · exp.ne_zaman_tr` | İş ararken, gazetede ya da internette ilan okurken. | GEÇTİ |
| 32 | `lx:Stellenanzeige · exp.parcalar[0]` | die Stelle · iş, kadro | GEÇTİ |
| 33 | `lx:Stellenanzeige · exp.parcalar[1]` | die Anzeige · ilan | GEÇTİ |
| 34 | `lx:Stellenanzeige · exp.ipucu_tr` | Başvurmak için **sich auf eine Stellenanzeige bewerben** dersin. | GEÇTİ |
| 35 | `lx:Stellenanzeige · mistakes_tr[0]` | İş ilanı derken **Arbeitsanzeige** yanlış. Doğrusu **die Stellenanzeige**. | GEÇTİ |
| 36 | `lx:Stellenanzeige · mistakes_tr[1]` | İlana başvurmak derken **zu der Anzeige** yanlış. Doğrusu **sich auf eine Stellenanzeige bewerben**. | **GERİ** (Belirsiz: yanlış biçim yarım (iş sözü yok), doğrusuyla yan yana konamıyor) |
| 37 | `lx:Stellenanzeige · mistakes_tr[2]` | Ortada bir **n** var: **die Stelle** ve **die Anzeige**, birlikte **die Stellenanzeige**. | GEÇTİ |
| 38 | `lx:Teilzeit · exp.anlam_tr` | **die Teilzeit** haftada tam günden daha az saat çalışmaktır. | GEÇTİ |
| 39 | `lx:Teilzeit · exp.ne_zaman_tr` | İş ilanında, iş görüşmesinde ya da çalışma saatini anlatırken. | GEÇTİ |
| 40 | `lx:Teilzeit · exp.parcalar[0]` | der Teil · parça | GEÇTİ |
| 41 | `lx:Teilzeit · exp.parcalar[1]` | die Zeit · zaman | GEÇTİ |
| 42 | `lx:Teilzeit · exp.ipucu_tr` | İki türlü söylenir: **Teilzeit arbeiten** ya da **in Teilzeit arbeiten**. | GEÇTİ |
| 43 | `lx:Teilzeit · mistakes_tr[0]` | Yarım gün çalışıyorum derken **Ich arbeite halbe Tag** yanlış. Doğrusu **Ich arbeite Teilzeit** ya da **Ich arbeite halbtags**. | GEÇTİ |
| 44 | `lx:Teilzeit · mistakes_tr[1]` | **in der Teilzeit** demeyiz. Artikelsiz söylenir: **in Teilzeit arbeiten**. | **GERİ** (Terim: **artikel** (artikelsiz)) |
| 45 | `lx:Vollzeit · exp.anlam_tr` | **die Vollzeit** haftanın her iş günü tam gün çalışmaktır. | GEÇTİ |
| 46 | `lx:Vollzeit · exp.ne_zaman_tr` | İş ararken ya da çalışma saatini söylerken. | GEÇTİ |
| 47 | `lx:Vollzeit · exp.parcalar[0]` | voll · dolu, tam | GEÇTİ |
| 48 | `lx:Vollzeit · exp.parcalar[1]` | die Zeit · zaman | GEÇTİ |
| 49 | `lx:Vollzeit · exp.ipucu_tr` | Tam zamanlı çalışmak **Vollzeit arbeiten** diye söylenir. | GEÇTİ |
| 50 | `lx:Vollzeit · mistakes_tr[0]` | Tam zamanlı çalışıyorum derken **Ich arbeite die ganze Zeit** yanlış. Bu sürekli çalışıyorum demek. Doğrusu **Ich arbeite Vollzeit**. | GEÇTİ |
| 51 | `lx:Vollzeit · mistakes_tr[1]` | **Vollzeit** artikelsiz söylenir: **Ich suche eine Stelle in Vollzeit**. | **GERİ** (Terim: **artikel**; yanlış biçim de gösterilmiyor) |
| 52 | `lx:Arbeitgeber · exp.anlam_tr` | **der Arbeitgeber** seni işe alan ve sana maaş ödeyen firma ya da kişidir. | GEÇTİ |
| 53 | `lx:Arbeitgeber · exp.ne_zaman_tr` | Resmî yazılarda, formlarda ve iş konuşurken. | GEÇTİ |
| 54 | `lx:Arbeitgeber · exp.parcalar[0]` | die Arbeit · iş | GEÇTİ |
| 55 | `lx:Arbeitgeber · exp.parcalar[1]` | geben · vermek | GEÇTİ |
| 56 | `lx:Arbeitgeber · exp.ipucu_tr` | Kelime kelime iş veren demektir. | GEÇTİ |
| 57 | `lx:Arbeitgeber · mistakes_tr[0]` | **der Arbeitgeber** işi veren taraftır. Çalışan kişi **der Arbeitnehmer** olur, karıştırma. | GEÇTİ |
| 58 | `lx:Arbeitgeber · mistakes_tr[1]` | İşverenimle konuştum derken **mit mein Arbeitgeber** yanlış. Doğrusu **mit meinem Arbeitgeber**. | GEÇTİ |
| 59 | `lx:Erzieherin · exp.anlam_tr` | **die Erzieherin** kreşte ya da anaokulunda çocuklara bakan ve onları eğiten kadındır. | GEÇTİ |
| 60 | `lx:Erzieherin · exp.ne_zaman_tr` | Çocuğun kreşi ya da anaokulu hakkında konuşurken. | GEÇTİ |
| 61 | `lx:Erzieherin · exp.ipucu_tr` | Erkek eğitmen için **der Erzieher** dersin. | GEÇTİ |
| 62 | `lx:Erzieherin · mistakes_tr[0]` | Anaokulundaki öğretmen için genelde **Lehrerin** değil, **die Erzieherin** denir. | GEÇTİ |
| 63 | `lx:Erzieherin · mistakes_tr[1]` | Mesleği söylerken **Sie ist eine Erzieherin** yerine **Sie ist Erzieherin** dersin. | GEÇTİ |
| 64 | `lx:Erzieherin · mistakes_tr[2]` | Erkek eğitmen **der Erzieher** olur. | GEÇTİ |
| 65 | `lx:Pflegerin · exp.anlam_tr` | **die Pflegerin** hastalara ya da yaşlılara bakan kadındır. | GEÇTİ |
| 66 | `lx:Pflegerin · exp.ne_zaman_tr` | Hastanede, bakımevinde ya da evde bakım konuşurken. | GEÇTİ |
| 67 | `lx:Pflegerin · exp.ipucu_tr` | Erkek bakıcı için **der Pfleger** dersin. | GEÇTİ |
| 68 | `lx:Pflegerin · mistakes_tr[0]` | Mesleği söylerken **Ich bin eine Pflegerin** yerine **Ich bin Pflegerin** dersin. | GEÇTİ |
| 69 | `lx:Pflegerin · mistakes_tr[1]` | Erkek bakıcı **der Pfleger**, kadın bakıcı **die Pflegerin**, çoğulu **die Pflegerinnen** olur. | **GERİ** (İki fikir; terim: **çoğul**; yanlış değil) |
| 70 | `lx:Handwerker · exp.anlam_tr` | **der Handwerker** evde ya da binada bir şey yapan ya da tamir eden ustadır. | GEÇTİ |
| 71 | `lx:Handwerker · exp.ne_zaman_tr` | Evde bir şey bozulunca ya da ev sahibiyle konuşurken. | GEÇTİ |
| 72 | `lx:Handwerker · exp.ipucu_tr` | Usta çağırmak **einen Handwerker rufen** diye söylenir. | GEÇTİ |
| 73 | `lx:Handwerker · mistakes_tr[0]` | Usta lazım derken **Ich brauche ein Handwerker** yanlış. Doğrusu **Ich brauche einen Handwerker**. | GEÇTİ |
| 74 | `lx:Handwerker · mistakes_tr[1]` | **der Handwerker** genel kelimedir. Ustanın işi belliyse **der Elektriker** gibi meslek adını söylersin. | GEÇTİ |
| 75 | `lx:Weiterbildung · exp.anlam_tr` | **die Weiterbildung** mesleğin varken o işte daha çok şey öğrendiğin eğitimdir. | GEÇTİ |
| 76 | `lx:Weiterbildung · exp.ne_zaman_tr` | İşte, iş görüşmesinde ya da kurs ararken. | GEÇTİ |
| 77 | `lx:Weiterbildung · exp.parcalar[0]` | weiter · ileri, devam | GEÇTİ |
| 78 | `lx:Weiterbildung · exp.parcalar[1]` | die Bildung · eğitim | GEÇTİ |
| 79 | `lx:Weiterbildung · exp.ipucu_tr` | Ek eğitim almak **eine Weiterbildung machen** diye söylenir. | GEÇTİ |
| 80 | `lx:Weiterbildung · mistakes_tr[0]` | **-ung**'lu adlar hep **die** alır. Bu yüzden **die Weiterbildung** denir. | **GERİ** (Terim: **ad**) |
| 81 | `lx:Weiterbildung · mistakes_tr[1]` | Ek eğitim aldım derken **Ich habe Weiterbildung gemacht** yanlış. Doğrusu **Ich habe eine Weiterbildung gemacht**. | GEÇTİ |
| 82 | `lx:Sprachkurs · exp.anlam_tr` | **der Sprachkurs** bir dili bir grupla birlikte öğrendiğin derslerdir, yani dil kursu. | GEÇTİ |
| 83 | `lx:Sprachkurs · exp.ne_zaman_tr` | Kursu anlatırken, kayıt yaptırırken ya da plan yaparken. | GEÇTİ |
| 84 | `lx:Sprachkurs · exp.parcalar[0]` | die Sprache · dil | GEÇTİ |
| 85 | `lx:Sprachkurs · exp.parcalar[1]` | der Kurs · kurs | GEÇTİ |
| 86 | `lx:Sprachkurs · exp.ipucu_tr` | Kursa gitmek **einen Sprachkurs machen** diye söylenir. | **GERİ** (Çelişki: aynı kartta **kursa gitmek** iki ayrı kalıba bağlanıyor (`forms[2].hint_tr`, `mistakes_tr[1]`)) |
| 87 | `lx:Sprachkurs · mistakes_tr[0]` | Türkçede kurs almak denir. Almancada **einen Kurs nehmen** yanlış, doğrusu **einen Sprachkurs machen**. | GEÇTİ |
| 88 | `lx:Sprachkurs · mistakes_tr[1]` | Kursa gidiyorum derken **Ich gehe zu Sprachkurs** yanlış. Doğrusu **Ich gehe zum Sprachkurs**. | GEÇTİ |
| 89 | `lx:Kursleiterin · exp.anlam_tr` | **die Kursleiterin** bir kursta ders veren kadındır. | GEÇTİ |
| 90 | `lx:Kursleiterin · exp.ne_zaman_tr` | Kursta, öğretmenden söz ederken ya da ona haber verirken. | GEÇTİ |
| 91 | `lx:Kursleiterin · exp.parcalar[0]` | der Kurs · kurs | GEÇTİ |
| 92 | `lx:Kursleiterin · exp.parcalar[1]` | leiten · yönetmek | GEÇTİ |
| 93 | `lx:Kursleiterin · exp.ipucu_tr` | Öğretmene adıyla seslenirsin: **Frau Becker**. | **GERİ** (Kelimenin kendisini değil hitabı anlatıyor; **Kursleiterin** ile bağ kurulmamış; `mistakes_tr[0]` ile aynı bilgi) |
| 94 | `lx:Kursleiterin · mistakes_tr[0]` | Hocam der gibi öğretmene **Lehrerin** diye seslenilmez. Adıyla seslenirsin: **Frau Becker, ich habe eine Frage.** | GEÇTİ |
| 95 | `lx:Kursleiterin · mistakes_tr[1]` | Kurs öğretmeni erkekse **der Kursleiter** olur. | GEÇTİ |
| 96 | `lx:Beratung · exp.anlam_tr` | **die Beratung** birinin sana bilgi verip yol gösterdiği görüşmedir. | GEÇTİ |
| 97 | `lx:Beratung · exp.ne_zaman_tr` | Resmî dairede, kurs ya da iş ararken. | GEÇTİ |
| 98 | `lx:Beratung · exp.ipucu_tr` | Danışmaya gitmek **zur Beratung gehen** diye söylenir. | GEÇTİ |
| 99 | `lx:Beratung · mistakes_tr[0]` | **-ung**'lu adlar hep **die** alır. Bu yüzden **die Beratung** denir. | **GERİ** (Terim: **ad**) |
| 100 | `lx:Beratung · mistakes_tr[1]` | Danışmanlık almak derken **Beratung nehmen** yanlış. Doğrusu **eine Beratung bekommen**. | GEÇTİ |
| 101 | `lx:Abschluss · exp.anlam_tr` | **der Abschluss** bir okulu ya da eğitimi bitirdiğini gösteren belgedir. | GEÇTİ |
| 102 | `lx:Abschluss · exp.ne_zaman_tr` | İş başvurusunda, iş görüşmesinde ya da resmî dairede. | GEÇTİ |
| 103 | `lx:Abschluss · exp.ipucu_tr` | Diplomam var derken **Ich habe einen Abschluss** dersin. | GEÇTİ |
| 104 | `lx:Abschluss · mistakes_tr[0]` | Diplomam var derken **Ich habe Abschluss** yanlış. Doğrusu **Ich habe einen Abschluss**. | GEÇTİ |
| 105 | `lx:Abschluss · mistakes_tr[1]` | Her diploma için **Diplom** denmez. Okul ya da eğitim bitirme için genel kelime **der Abschluss**. | GEÇTİ |
| 106 | `lx:Abschluss · mistakes_tr[2]` | Çoğulda **u** harfi **ü** olur: **die Abschlüsse**. | **GERİ** (Terim: **çoğul**) |
| 107 | `lx:Elektriker · exp.anlam_tr` | **der Elektriker** kabloları, ışıkları ve prizleri kuran ya da tamir eden ustadır. | GEÇTİ |
| 108 | `lx:Elektriker · exp.ne_zaman_tr` | Evde ışık ya da elektrik bozulunca, mesleği anlatırken. | GEÇTİ |
| 109 | `lx:Elektriker · exp.ipucu_tr` | Mesleği söylerken **ein** yok: **Ich bin Elektriker**. | GEÇTİ |
| 110 | `lx:Elektriker · mistakes_tr[0]` | Elektrikçi derken **Elektrik** yanlış. **die Elektrik** evdeki elektrik tesisatıdır, usta **der Elektriker** olur. | GEÇTİ |
| 111 | `lx:Elektriker · mistakes_tr[1]` | Mesleği söylerken **Ich bin ein Elektriker** yerine **Ich bin Elektriker** dersin. | GEÇTİ |
| 112 | `lx:Erfahrung · exp.anlam_tr` | Bir işi yaparak zamanla öğrendiğin bilgi ve beceriyi anlatır. | GEÇTİ |
| 113 | `lx:Erfahrung · exp.ne_zaman_tr` | İş görüşmesinde ne bildiğini anlatırken. | GEÇTİ |
| 114 | `lx:Erfahrung · exp.ipucu_tr` | Yılla söylenir: **Ich habe drei Jahre Erfahrung.** | GEÇTİ |
| 115 | `lx:Erfahrung · mistakes_tr[0]` | Deneyim yaşamak derken **eine Erfahrung leben** yanlış. Doğrusu **eine Erfahrung machen.** | GEÇTİ |
| 116 | `lx:Erfahrung · mistakes_tr[1]` | **Erfahrung von Küche** yanlış. Doğrusu **Erfahrung in der Küche**, insanlarla **Erfahrung mit Kunden**. | **GERİ** (İki fikir (in ve mit) tek kutuda; **insanlarla** ile **Kunden** (müşteri) eşleşmiyor) |
| 117 | `lx:Praktikum · exp.anlam_tr` | **das Praktikum** bir işi öğrenmek için kısa süre bir yerde çalışmandır, yani stajdır. | GEÇTİ |
| 118 | `lx:Praktikum · exp.ne_zaman_tr` | İş ararken, okulu ya da meslek eğitimini anlatırken. | GEÇTİ |
| 119 | `lx:Praktikum · exp.ipucu_tr` | Staj yapmak **ein Praktikum machen** diye söylenir. | GEÇTİ |
| 120 | `lx:Praktikum · mistakes_tr[0]` | Staj yaptım derken **Ich habe Praktikum gemacht** yanlış. Doğrusu **Ich habe ein Praktikum gemacht**. | GEÇTİ |
| 121 | `lx:Übung · exp.anlam_tr` | **die Übung** bir şeyi öğrenmek için yaptığın alıştırma ya da pratiktir. | GEÇTİ |
| 122 | `lx:Übung · exp.ne_zaman_tr` | Kursta, sporda ya da bir şey öğrenirken. | GEÇTİ |
| 123 | `lx:Übung · exp.parcalar[0]` | üben · alıştırma yapmak | GEÇTİ |
| 124 | `lx:Übung · exp.parcalar[1]` | -ung · -ma | GEÇTİ |
| 125 | `lx:Übung · exp.ipucu_tr` | Pratik ustalaştırır derken **Übung macht den Meister** dersin. | GEÇTİ |
| 126 | `lx:Übung · mistakes_tr[0]` | Pratik yapıyorum derken **Ich mache Praxis** yanlış. Doğrusu **Ich übe**. | GEÇTİ |
| 127 | `lx:Übung · mistakes_tr[1]` | Alıştırmayı yaptım derken **Ich habe Übung gemacht** yanlış. Doğrusu **Ich habe die Übung gemacht**. | GEÇTİ |


## Fark turu (OD-9.3, 2. tur)

Tarih: 2026-11-27 · okur · yalnız 1. turdaki 96 GERİ madde ve düzeltmenin değiştirdiği satırlar.

Dayanak: dilbilimci raporu `docs/v2/reviews/kurs-u02/dilbilimci.md`, "Okur düzeltme turu" bölümü. Koordinatör kararı: yalnız başına **fiil** GERİ sayılmaz (`ic5-hafta-06` kararı). 1. turdaki 6 madde bu yüzden kapsam dışı: 44, 57, 59, 62, 63, 65. Aynı karar 50 (`gun-68` o25), 78 (`dn:10-ung` 1. cümle) ve 82 (`dn:10-ung` tablo başlığı) için de geçerli. Bu üç satırda artık yalnız **fiil** kalıyor.

Yöntem: her maddenin yeri dosyada yeniden açıldı ve bugünkü metin okundu. Soru, şık, doğru cevap ve `accepted` ile yeniden karşılaştırıldı. Değişen cümlelerin kelimeleri betikle sayıldı; en uzunu 14 kelime. Açıklama alanlarında `…`, `=`, `;` kalmadı.

### Sonuç

**GEÇTİ.** 96 madde: GEÇTİ **90** · kapsam dışı **6** · GERİ **0**.

| dosya | 1. tur GERİ | şimdi GEÇTİ | kapsam dışı | GERİ | durum |
|---|---|---|---|---|---|
| `content/v2/m1/dn-10.json` | 16 | 16 | 0 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/gun-64.json` | 17 | 17 | 0 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/gun-65.json` | 13 | 13 | 0 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/gun-66.json` | 1 | 1 | 0 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/gun-67.json` | 2 | 2 | 0 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/gun-68.json` | 18 | 17 | 1 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/gun-69.json` | 7 | 6 | 1 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/gun-70.json` | 6 | 3 | 3 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/hafta-sonu-testi-10.json` | 1 | 0 | 1 | 0 | okur açısından reviewed olabilir |
| `content/v2/m1/gorulmemis-10.json` | 1 | 1 | 0 | 0 | okur açısından reviewed olabilir |
| `content/v2/registry/lexicon/batch-a2-k02.json` | 14 | 14 | 0 | 0 | okur açısından reviewed olabilir |

### Düzeltmenin değiştirdiği öteki satırlar

Bu satırlar 1. turda GEÇTİ'ydi ya da sayıya girmemişti. Hepsi yeniden okundu, hepsi GEÇTİ:
- Kapsam dışı 6 `hint_tr`: `lx:Koch` forms[1], `lx:Teilzeit` forms[2], `lx:Vollzeit` forms[2], `lx:Pflegerin` forms[2], `lx:Weiterbildung` forms[2], `lx:Sprachkurs` forms[2]. Weiterbildung ipucu artık boşluğun istediği **eine**'yi söylüyor. Sprachkurs ipucu kartın yeni ipucuyla aynı ayrımı yapıyor.
- `lx:putzen` forms[1].hint_tr: «Geçmişte **Ich habe geputzt** dersin.»
- `lx:Kursleiterin` mistakes_tr[0]: hocam ile **Lehrerin!** karşılaştırması iki kısa cümle, tek fikir (öğretmene nasıl seslenilir).
- `lx:Sprachkurs` eşdizim tr «dil kursuna devam etmek» ve `gun-67` s6 `why_tr` «Bir kursa devam etmek **einen Sprachkurs machen** olur.» Kartla aynı ayrım. Çeviri «gidiyorum» dese de anlaşılıyor.
- `gun-66` `metin_tr`: `;` yok, ilanlar düz okunuyor.
- `dn:10-modal-praeteritum`, `dn:10-gut-koennen`, `dn:10-beruf-wunsch`, `dn:10-modal-tuzak`, `dn:10-ung` metinlerinin bütün cümleleri baştan okundu. Hepsi 14 kelime ya da altında, yeni terim yok.
- `gun-68` ve `gun-69` Türkçe alanlarında artık **Kursleiterin** geçmiyor, her yerde **kurs öğretmeni** var. 1. turdaki bilgi notu kapandı.
- `dn:10-ung` 1. cümlede `→` var (`üben → die Übung`). OD-9.2 yasak listesinde yok, `ic5-hafta-06`'da da geçmişti; tek okumada anlaşılıyor.

### Bilgi notları (karar değil, GERİ değil)

1. `gun-64` yazma `kontrol_tr[0]` eski iş için **Früher habe ich im Lager gearbeitet** veriyor. `kontrol_tr[2]` bugün için **Heute arbeite ich im Lager** diyor. Örnek metinde eski iş fabrika, bugünkü iş depo. İkisi de "gibi" örneği ve tek başına anlaşılıyor. Ama yan yana okuyunca "eskiden de depo, bugün de depo" gibi duruyor. Eski iş örneği **in einer Fabrik** olursa örnek metinle de uyuşur.
2. `gun-65` `kontrol_tr[2]` «Öteki fiil en sonda mı?» diyor. Öteki düzeltmeler «**kochen** değişmez, en sona gider» biçimini kullanıyor. Yalnız **fiil** kararı gereği geçti, örnek hemen arkadan geliyor. Biçim birliği için not.
3. Aynı son iki yerde farklı adla geçiyor. `dn:10-modal-tuzak` «sondaki **-est** unutulur» (durft → durftest) diyor. `gun-68` o9 «**du** ile son **-st** gelir» (konnte → konntest) diyor. İkisi de kendi örneğiyle doğru ve anlaşılıyor.
4. `lx:Erfahrung` forms[3].hint_tr hâlâ «İnsanlarla deneyim **Erfahrung mit** olur» diyor; boşluk cümlesi **Kunden** (müşteri). 1. turdaki uyuşmazlık `mistakes_tr`'den kalktı ama bu ipucunda duruyor. `hint_tr` kapsam dışı, sayıya katılmadı.
5. `lx:Pflegerin` `ipucu_tr` ile `mistakes_tr[1]` aynı bilgiyi veriyor: erkek bakıcı **der Pfleger**. İkisi de tek başına anlaşılıyor.

### Madde madde

Numaralar 1. turdaki "GERİ dönenler" listesinin numaralarıdır.

| # | dosya | yer | bugünkü metin | kendi sözlerimle | karar |
|---|---|---|---|---|---|
| 1 | `gun-64.json` | `.sahne.bolumler[b1].cevapla.why_tr` | Geçmişteki işini **Früher habe ich in einer Fabrik gearbeitet** gibi söylersin. | Eski işimi bu örnek cümle gibi söylerim. | GEÇTİ |
| 2 | `gun-64.json` | `.sesler[m1:64:a2].bolumler[b1].cevapla.why_tr` | Başlama saatini **fängt um sechs Uhr an** ile söylersin. | Vardiyanın başlama saatini fängt um sechs Uhr an ile söylerim. | GEÇTİ |
| 3 | `gun-64.json` | `.prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Eski işini **Früher habe ich in einer Fabrik gearbeitet** ile söyledin. | Eski işimi doğru cümleyle söyledim. | GEÇTİ |
| 4 | `gun-64.json` | `.prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Meslekten önce **ein** demedin: **Ich war Koch**. | Meslekten önce ein demedim, doğru. | GEÇTİ |
| 5 | `gun-64.json` | `.prova.dugumler[n1].secenekler[3].geri_bildirim_tr` | Derya eskiyi soruyor. **Früher habe ich in einer Fabrik gearbeitet** de. | Derya eskiyi soruyor, ben bugünü söyledim; bu cümleyi demeliyim. | GEÇTİ |
| 6 | `gun-64.json` | `.prova.dugumler[n2].secenekler[3].geri_bildirim_tr` | **ich muss** bugün içindir. Eskisi için **ich musste** dersin. | ich muss bugün için; eskisi ich musste. | GEÇTİ |
| 7 | `gun-64.json` | `.prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Taşındığını **Ich bin nach Wendlfing umgezogen** ile söyledin. | Taşındığımı bu cümleyle söyledim. | GEÇTİ |
| 8 | `gun-64.json` | `.prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | **Ich wollte es hier versuchen**: **versuchen** değişmez, en sona gider. | versuchen değişmeden en sonda duruyor. | GEÇTİ |
| 9 | `gun-64.json` | `.prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Bugünü **sind** ile anlattın, **waren** ile değil. | Bugünü sind ile anlattım, waren eskisi için. | GEÇTİ |
| 10 | `gun-64.json` | `.okuma_yazma.sorular[m1:64:o5].why_tr` | Önce yeri söyle: **Früher habe ich im Lager gearbeitet**. Sonra **Ich musste früh aufstehen** gibi ekle. | Önce eskiden nerede çalıştığımı, sonra ne yapmak zorunda olduğumu söylerim. | GEÇTİ |
| 11 | `gun-64.json` | `.okuma_yazma.yazma.kontrol_tr[0]` | Eski işini **Früher habe ich im Lager gearbeitet** gibi yazdın mı? | Eski işimi bu örnek gibi yazdım mı? | GEÇTİ |
| 12 | `gun-64.json` | `.okuma_yazma.yazma.kontrol_tr[2]` | Bugünü **Heute arbeite ich im Lager** gibi yazdın mı? | Bugünkü işimi bu örnek gibi yazdım mı? | GEÇTİ |
| 13 | `gun-64.json` | `.gun_sinavi.maddeler[m1:64:s4].why_tr` | **fängt** ikinci yerde, **an** en sonda: **Meine Schicht fängt um sechs Uhr an.** | fängt ikinci sırada, an en sonda. | GEÇTİ |
| 14 | `gun-64.json` | `.gun_sinavi.maddeler[m1:64:s8].why_tr` | **als Kellner** ile hangi iş olduğunu söylersin. Önünde **ein** yok. | als Kellner ile işimi söylerim, önüne ein koymam. | GEÇTİ |
| 15 | `gun-64.json` | `.gun_sinavi.maddeler[m1:64:s9].why_tr` | Eski işini **Früher habe ich im Lager gearbeitet** gibi söylersin. **Früher war ich Koch** da olur. | Eski işimi bu cümleyle söylerim; Früher war ich Koch da olur. | GEÇTİ |
| 16 | `gun-64.json` | `.gun_sinavi.maddeler[m1:64:s10].why_tr` | Kendin için **ich konnte** dersin, **ich konntest** değil. | Kendim için ich konnte, ich konntest değil. | GEÇTİ |
| 17 | `gun-64.json` | `.gun_sinavi.maddeler[m1:64:s11].why_tr` | Önce yer: **Früher habe ich im Lager gearbeitet**. Sonra zorunluluk: **Ich musste früh aufstehen**. | Önce eski iş yerini, sonra zorunluluğu söylerim. | GEÇTİ |
| 18 | `gun-65.json` | `.goal_tr` | Şefine neyi iyi yaptığını **Ich kann gut kochen** gibi söylersin. Nasıl çalıştığını **zuverlässig**, **fleißig**, **hilfsbereit** gibi kelimelerle anlatırsın. | Şefe neyi iyi yaptığımı ve nasıl çalıştığımı söylerim. | GEÇTİ |
| 19 | `gun-65.json` | `.sahne.bolumler[b2].cevapla.why_tr` | Önce **Ich kann gut kochen**, sonra **Ich bin fleißig** gibi söylersin. | Önce neyi iyi yaptığımı, sonra nasıl biri olduğumu söylerim. | GEÇTİ |
| 20 | `gun-65.json` | `.prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | **Ich kann gut mit dem Computer arbeiten** ile güçlü yanını söyledin. | Bu cümleyle güçlü yanımı söyledim. | GEÇTİ |
| 21 | `gun-65.json` | `.prova.kapanis_tr` | Güçlü yanlarını **Ich kann gut**, **Ich bin zuverlässig**, **Das schaffe ich** ile söyledin. | Güçlü yanlarımı bu üç sözle söyledim. | GEÇTİ |
| 22 | `gun-65.json` | `.okuma_yazma.sorular[m1:65:o5].why_tr` | Önce **Ich kann gut kochen**, sonra **Ich bin zuverlässig** gibi kendini tanıtırsın. | Önce neyi iyi yaptığımı, sonra nasıl biri olduğumu söyleyerek tanıtırım. | GEÇTİ |
| 23 | `gun-65.json` | `.okuma_yazma.yazma.kontrol_tr[0]` | Bir güçlü yanını **Ich kann gut kochen** gibi yazdın mı? | Bir güçlü yanımı bu örnek gibi yazdım mı? | GEÇTİ |
| 24 | `gun-65.json` | `.okuma_yazma.yazma.kontrol_tr[1]` | Nasıl biri olduğunu **Ich bin fleißig** gibi yazdın mı? | Nasıl biri olduğumu bu örnek gibi yazdım mı? | GEÇTİ |
| 25 | `gun-65.json` | `.okuma_yazma.yazma.kontrol_tr[2]` | Öteki fiil en sonda mı? **Ich kann gut kochen**: **kochen** sonda. | kann'dan sonraki iş sözü (kochen) en sonda mı? | GEÇTİ |
| 26 | `gun-65.json` | `.gun_sinavi.maddeler[m1:65:s5].why_tr` | Nasıl biri olduğunu **Ich bin zuverlässig** gibi söylersin. | Nasıl biri olduğumu Ich bin zuverlässig gibi söylerim. | GEÇTİ |
| 27 | `gun-65.json` | `.gun_sinavi.maddeler[m1:65:s8].why_tr` | İyi yapamadığın şey için **Ich kann nicht so gut kochen** gibi dersin. | İyi yapamadığımı bu örnek gibi söylerim. | GEÇTİ |
| 28 | `gun-65.json` | `.gun_sinavi.maddeler[m1:65:s9].why_tr` | **Ich kann gut** ve en sonda **kochen**: **Ich kann gut kochen**. | Ich kann gut, en sonda kochen. | GEÇTİ |
| 29 | `gun-65.json` | `.gun_sinavi.maddeler[m1:65:s10].why_tr` | Eskisi **konnte**, bugünü **kann**. **Früher konnte ich nicht gut Deutsch, heute kann ich ein bisschen.** | Eskisi konnte, bugünü kann; örnek cümle bunu gösteriyor. | GEÇTİ |
| 30 | `gun-65.json` | `.gun_sinavi.maddeler[m1:65:s11].why_tr` | Önce **Ich kann gut kochen**, sonra **Ich arbeite gern im Team** gibi. | Önce neyi iyi yaptığımı, sonra nasıl çalıştığımı söylerim. | GEÇTİ |
| 31 | `gun-66.json` | `.okuma_yazma.sorular[m1:66:o10].why_tr` | **Ich möchte** derken **arbeiten** değişmez, en sona gider. | Ich möchte derken arbeiten değişmez, sona gider. | GEÇTİ |
| 32 | `gun-67.json` | `.sahne.bolumler[b1].cevapla.why_tr` | **Ich möchte** derken **machen** değişmez, en sona gider. | Ich möchte derken machen değişmez, sona gider. | GEÇTİ |
| 33 | `gun-67.json` | `.okuma_yazma.sorular[m1:67:o6].why_tr` | **kann** geçmişte **konnte** olur: **a** yerine **o** gelir, araya **te** girer. | kann geçmişte konnte: a yerine o, araya te. | GEÇTİ |
| 34 | `gun-68.json` | `.goal_tr` | Akşam kursunda eskiyle ilgili bir alıştırma var. Geçmişi anlatırken en sık yapılan dört yanlışı tanır, doğrusunu söylersin. **die Übung** gibi -ung ile biten kelimelere **die** dersin. **o** ile **u** sesini ayırırsın. | Kursta dört yanlışı tanırım; -ung ile biten kelimelere die derim; o ile u'yu ayırırım. | GEÇTİ |
| 35 | `gun-68.json` | `.halkalar[m1:68:h2].title_tr` | -ung ile biten kelimeler: anlam, fikir, danışma | -ung ile biten kelimeler: anlam, fikir, danışma. | GEÇTİ |
| 36 | `gun-68.json` | `.sahne.bolumler[b1].cevapla.why_tr` | Eskiyi **konnte**, bugünü **kann** ile söylersin. **schwimmen** değişmez, en sona gider: **Heute kann ich schwimmen.** | Eskisi konnte, bugünü kann; schwimmen sona gider. | GEÇTİ |
| 37 | `gun-68.json` | `.sesler[m1:68:a1].bolumler[b1].cevapla.why_tr` | Hasta birine **Gute Besserung** dersin. **Ich zeige dir** sana gösteririm demek. | Hastaya Gute Besserung derim; Ich zeige dir sana gösteririm demek. | GEÇTİ |
| 38 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o6].why_tr` | Geçmişte **will** kalmaz. **wollen**'den **woll** kalır, araya **-te-** girer: **wollte**. | Geçmişte will olmaz; wollen'den woll kalır, -te- gelir: wollte. | GEÇTİ |
| 39 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o9].why_tr` | **du** ile son **-st** gelir: **du konntest**. **du konnt** yanlış. | du ile sona -st gelir: konntest; konnt yanlış. | GEÇTİ |
| 40 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o19].why_tr` | Zorunluluğu **musste**, isteği **wollte** ile söylersin. **arbeiten** değişmez, en sona gider: **Ich musste viel arbeiten.** | Zorunluluk musste, istek wollte; arbeiten sona gider. | GEÇTİ |
| 41 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o20].q_tr` | **der**, **die** ya da **das**? ___ Meinung | Meinung'un önüne der mi die mi das mı? | GEÇTİ |
| 42 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o20].why_tr` | **die Meinung**, **die Übung**: **-ung** ile bitenler hep **die** alır. | -ung ile bitenler hep die: die Meinung. | GEÇTİ |
| 43 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o21].q_tr` | **der**, **die** ya da **das**? ___ Beratung | Beratung'un önüne der mi die mi das mı? | GEÇTİ |
| 44 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o21].why_tr` | **beraten** fiilinden **die Beratung**. **-ung** hep **die**. | — | kapsam dışı (karar: yalnız **fiil**) |
| 45 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o22].q_tr` | **der**, **die** ya da **das**? ___ Weiterbildung | Weiterbildung'un önüne der mi die mi das mı? | GEÇTİ |
| 46 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o23].instr_tr` | **erklären**: sondaki **en** yerine **-ung** koy, önüne **die** yaz. | erklären'in sonundaki en'i at, -ung koy, önüne die yaz. | GEÇTİ |
| 47 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o23].why_tr` | **erklären**'den **en** düşer, yerine **-ung** gelir: **die Erklärung**. | erklären'den en düşer, -ung gelir: die Erklärung. | GEÇTİ |
| 48 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o24].instr_tr` | **üben**: sondaki **en** yerine **-ung** koy, önüne **die** yaz. | üben'in sonundaki en'i at, -ung koy, önüne die yaz. | GEÇTİ |
| 49 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o24].why_tr` | **üben**'den **en** düşer, yerine **-ung** gelir: **die Übung**. | üben'den en düşer, -ung gelir: die Übung. | GEÇTİ |
| 50 | `gun-68.json` | `.okuma_yazma.sorular[m1:68:o25].why_tr` | **beraten** fiilinden **die Beratung** olur. | beraten'den die Beratung olur. | GEÇTİ |
| 51 | `gun-68.json` | `.gun_sinavi.maddeler[m1:68:s10].why_tr` | Çocukluğunu **Als Kind konnte ich** ile anlatırsın. **Als Kind konnte ich gut schwimmen**: **schwimmen** sonda. | Çocukluğumu Als Kind konnte ich ile anlatırım; schwimmen sonda. | GEÇTİ |
| 52 | `gun-69.json` | `.can_do.tr` | Kısa iş ve kurs ilanlarında bir kişiye uygun olanı bulurum. Kendimi ve iş geçmişimi birkaç cümleyle anlatırım. | İlanlarda kişiye uyanı bulurum. Kendimi ve eski işlerimi anlatırım. | GEÇTİ |
| 53 | `gun-69.json` | `.prova.durum_tr` | Kursta danışma saati. Kurs öğretmeni seninle konuşuyor. Eski işini, neyi iyi yapabildiğini ve ne istediğini soruyor. Sonunda meslek için dil kursu hakkında bilgi al: ne zaman başlıyor, sonunda ne var? | Kurs öğretmeni eski işimi, neyi iyi yaptığımı, ne istediğimi soruyor; sonra kursu sorarım. | GEÇTİ |
| 54 | `gun-69.json` | `.prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | **Früher** ile **arbeite** olmaz. **Früher habe ich in einer Fabrik gearbeitet** dersin. | Früher ile bugünkü arbeite olmaz; doğru cümle bu. | GEÇTİ |
| 55 | `gun-69.json` | `.okuma_yazma.sorular[m1:69:o7].why_tr` | **Letzte Woche** geçmiştir. **kann** değil **konnte**: **a** yerine **o**, araya **-te-** girer. | Geçen hafta geçmiş; kann değil konnte: a yerine o, -te-. | GEÇTİ |
| 56 | `gun-69.json` | `.okuma_yazma.sorular[m1:69:o16].q_tr` | **der**, **die** ya da **das**? ___ Bewerbung | Bewerbung'un önüne der mi die mi das mı? | GEÇTİ |
| 57 | `gun-69.json` | `.okuma_yazma.sorular[m1:69:o17].why_tr` | **erklären** fiilinden **die Erklärung**. | — | kapsam dışı (karar: yalnız **fiil**) |
| 58 | `gun-69.json` | `.okuma_yazma.yazma.gorev_tr` | Pazartesi kursta kendini kısaca tanıtacaksın. Söyleyeceklerini yaz. Kimsin, eskiden ne yaptın, ne yapmak zorundaydın? Bugün ne yapıyorsun, neyi iyi yaparsın, ne istiyorsun? Altı sekiz cümle. | Kendimi tanıtan altı sekiz cümle yazacağım; sorular yol gösteriyor. | GEÇTİ |
| 59 | `gun-70.json` | `.sesler[m1:70:a1].bolumler[b1].cevapla.why_tr` | Zamanı başa koyarsan fiil hemen arkasından gelir: **Am Samstag kann ich**. | — | kapsam dışı (karar: yalnız **fiil**) |
| 60 | `gun-70.json` | `.prova.durum_tr` | Deneme süren bitiyor. Wimmer Bey seni odasına çağırdı. Başlangıcını ve bugün neyi iyi yaptığını anlat. Fazla mesai sorusuna cevap ver, bir isteğini söyle. | Şef çağırdı; başlangıcı ve bugünü anlatacağım, mesaiye cevap verip bir şey isteyeceğim. | GEÇTİ |
| 61 | `gun-70.json` | `.prova.kapanis_tr` | Şefinle deneme süresinin sonunu konuştun. Başlangıcı **konnte** ve **musste** ile, bugünü **kann gut** ile anlattın. Fazla mesaiye cevap verdin ve bir ek eğitim istedin. | Şefle konuştum; eskiyi ve bugünü anlattım, mesaiye cevap verdim, eğitim istedim. | GEÇTİ |
| 62 | `gun-70.json` | `.okuma_yazma.yazma.kontrol_tr[2]` | Zamanla başlayan cümlede fiil ikinci yerde mi? **Am Samstag kann ich** | — | kapsam dışı (karar: yalnız **fiil**) |
| 63 | `gun-70.json` | `.gun_sinavi.maddeler[m1:70:s7].why_tr` | Bugün için **kann gut**. Zaman başta olunca fiil ikinci yerde kalır. | — | kapsam dışı (karar: yalnız **fiil**) |
| 64 | `gun-70.json` | `.halkalar[m1:70:h1].sahne.satirlar[2].tr` | Başarırsın! Çalışkansın ve güvenilirsin. | Derya cesaret veriyor: başarırsın, çalışkansın. | GEÇTİ |
| 65 | `hafta-sonu-testi-10.json` | `.maddeler[m1:70:t07].why_tr` | Danışma **die Beratung**, **beraten** fiilinden gelir. **-ung** hep **die**. | — | kapsam dışı (karar: yalnız **fiil**) |
| 66 | `gorulmemis-10.json` | `.durumlar[m1:h10:g7].durum_tr` | Molada bir iş arkadaşı, kızının yalnız öğleden önce çalışabildiğini ve iş aradığını söylüyor. Stadler fırınının camında bir ilan var. Dükkânda yarım gün, pazartesiden cumaya, altıdan on bire. Deneyim gerekmiyor. Ona anlat. | Arkadaşın kızına fırındaki yarım günlük ilanı anlatacağım. | GEÇTİ |
| 67 | `dn-10.json` | `dn:10-modal-praeteritum · tr (madde Üç)` | Üç: sonu kişiye göre değişir: du konntest, wir konnten. | Kişiye göre sonu değişiyor: konntest, konnten. | GEÇTİ |
| 68 | `dn-10.json` | `dn:10-modal-praeteritum · tr (ich ile er)` | ich ile er, sie, es aynıdır, sonuna bir şey gelmez: ich konnte, er konnte. | ich ile er aynı, sonuna bir şey gelmiyor: konnte. | GEÇTİ |
| 69 | `dn-10.json` | `dn:10-modal-praeteritum · tr (son cümle)` | Ich musste früh aufstehen: aufstehen değişmez, en sona gider. | aufstehen değişmez, en sonda durur. | GEÇTİ |
| 70 | `dn-10.json` | `dn:10-gut-koennen · h_tr` | Neyi iyi yapıyorsun: Ich kann gut kochen | Neyi iyi yaptığını Ich kann gut kochen gibi söylersin. | GEÇTİ |
| 71 | `dn-10.json` | `dn:10-gut-koennen · tr (kochen cümlesi)` | Ich kann gut kochen: kochen değişmez, en sona gider. | kochen değişmez, en sonda. | GEÇTİ |
| 72 | `dn-10.json` | `dn:10-gut-koennen · tr (deneyim)` | Deneyimini Ich habe Erfahrung mit Kunden gibi söylersin. | Deneyimimi Ich habe Erfahrung mit Kunden gibi söylerim. | GEÇTİ |
| 73 | `dn-10.json` | `dn:10-beruf-wunsch · h_tr` | Meslek isteği: Ich möchte Koch werden | Ne olmak istediğimi Ich möchte Koch werden gibi söylerim. | GEÇTİ |
| 74 | `dn-10.json` | `dn:10-beruf-wunsch · tr (ein)` | Meslekten önce ein gelmez: Ich bin Fahrer. | Meslekten önce ein koymam: Ich bin Fahrer. | GEÇTİ |
| 75 | `dn-10.json` | `dn:10-modal-tuzak · tr (Bir)` | Bir: geçmişi anlatırken bugünkü kann kalır. | Birinci yanlış: geçmiş için bugünkü kann'ı kullanmak. | GEÇTİ |
| 76 | `dn-10.json` | `dn:10-modal-tuzak · tr (İki)` | İki: sondaki -est unutulur. | İkinci yanlış: du ile sondaki -est'i unutmak. | GEÇTİ |
| 77 | `dn-10.json` | `dn:10-ung · h_tr` | -ung ile biten kelimeler: hep die | -ung ile biten kelimeler hep die alır. | GEÇTİ |
| 78 | `dn-10.json` | `dn:10-ung · tr#1` | Birçok fiilden yeni bir kelime olur: üben → die Übung. | üben gibi bir sözden die Übung gibi yeni kelime olur. | GEÇTİ |
| 79 | `dn-10.json` | `dn:10-ung · tr#2` | Bu kelimelerin hepsi die alır. | Bunların hepsi die alır. | GEÇTİ |
| 80 | `dn-10.json` | `dn:10-ung · tr#3` | Birden çoksa sona -en gelir: die Übungen. | Birden çoksa sona -en: die Übungen. | GEÇTİ |
| 81 | `dn-10.json` | `dn:10-ung · tr#4` | üben'i biliyorsan die Übung'u da tahmin edersin. | üben'i bilirsem die Übung'u tahmin ederim. | GEÇTİ |
| 82 | `dn-10.json` | `dn:10-ung · table.head` | fiil · -ung kelimesi (hep die) · anlamı | Sütunlar: iş sözü · -ung kelimesi · anlamı. | GEÇTİ |
| 83 | `batch-a2-k02.json` | `lx:Computer · exp.anlam_tr` | **der Computer** bilgisayardır. | der Computer bilgisayar demek. | GEÇTİ |
| 84 | `batch-a2-k02.json` | `lx:Computer · mistakes_tr[2]` | **zwei Computers** yanlış. Doğrusu **zwei Computer**. | İki bilgisayar zwei Computer, sona s gelmez. | GEÇTİ |
| 85 | `batch-a2-k02.json` | `lx:Koch · mistakes_tr[1]` | **die Koche** yanlış. Birden çok aşçı **die Köche** olur. | Birden çok aşçı die Köche, die Koche değil. | GEÇTİ |
| 86 | `batch-a2-k02.json` | `lx:Fahrer · mistakes_tr[2]` | **die Fahrers** yanlış. Birden çok şoför **die Fahrer** olur. | Birden çok şoför die Fahrer, die Fahrers değil. | GEÇTİ |
| 87 | `batch-a2-k02.json` | `lx:Stellenanzeige · mistakes_tr[1]` | **sich zu der Anzeige bewerben** yanlış. Doğrusu **sich auf die Anzeige bewerben**. | İlana başvururken auf die Anzeige denir, zu der Anzeige değil. | GEÇTİ |
| 88 | `batch-a2-k02.json` | `lx:Teilzeit · mistakes_tr[1]` | **in der Teilzeit** yanlış. Doğrusu **in Teilzeit arbeiten**. | in der Teilzeit denmez, in Teilzeit arbeiten denir. | GEÇTİ |
| 89 | `batch-a2-k02.json` | `lx:Vollzeit · mistakes_tr[1]` | **in der Vollzeit** yanlış. Doğrusu **eine Stelle in Vollzeit**. | in der Vollzeit denmez, eine Stelle in Vollzeit denir. | GEÇTİ |
| 90 | `batch-a2-k02.json` | `lx:Pflegerin · mistakes_tr[1]` | Erkek için **die Pflegerin** yanlış. Erkek bakıcı **der Pfleger** olur. | Erkeğe die Pflegerin denmez, der Pfleger denir. | GEÇTİ |
| 91 | `batch-a2-k02.json` | `lx:Weiterbildung · mistakes_tr[0]` | **-ung** ile biten kelimeler hep **die** alır: **die Weiterbildung**. | -ung ile biten kelime die alır: die Weiterbildung. | GEÇTİ |
| 92 | `batch-a2-k02.json` | `lx:Sprachkurs · exp.ipucu_tr` | Kursa devam etmek **einen Sprachkurs machen**, o günkü derse gitmek **zum Sprachkurs gehen** olur. | Kursa devam etmek machen ile, o günkü derse gitmek zum Sprachkurs gehen ile. | GEÇTİ |
| 93 | `batch-a2-k02.json` | `lx:Kursleiterin · exp.ipucu_tr` | Kursta öğretmenden söz ederken **die Kursleiterin** dersin. | Kursta öğretmenden söz ederken die Kursleiterin derim. | GEÇTİ |
| 94 | `batch-a2-k02.json` | `lx:Beratung · mistakes_tr[0]` | **-ung** ile biten kelimeler hep **die** alır: **die Beratung**. | -ung ile biten kelime die alır: die Beratung. | GEÇTİ |
| 95 | `batch-a2-k02.json` | `lx:Abschluss · mistakes_tr[2]` | **die Abschlusse** yanlış. Birden çoksa **u** harfi **ü** olur: **die Abschlüsse**. | Birden çok diploma die Abschlüsse, u ü olur. | GEÇTİ |
| 96 | `batch-a2-k02.json` | `lx:Erfahrung · mistakes_tr[1]` | **Erfahrung von Küche** yanlış. Doğrusu **Erfahrung in der Küche**. | Erfahrung von Küche yanlış, Erfahrung in der Küche doğru. | GEÇTİ |

### Toplam

Okunan madde: **96** · GEÇTİ: **90** · kapsam dışı (yalnız **fiil**): **6** (44, 57, 59, 62, 63, 65) · GERİ: **0**.

GERİ listesi: yok.

**Karar: GEÇTİ.** On bir dosyanın hiçbirinde okur GERİ'si kalmadı. Okur açısından dosyalar "reviewed" yapılabilir (OD-9.4). Bilgi notları dilbilimciye ya da yazara iletilebilir, engel değil.
