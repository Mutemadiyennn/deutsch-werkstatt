# Okur raporu: İÇ-5 · 5. hafta (29.–35. gün)

Tarih: 2026-11-23 · okur (OD-9.3) · tek tam tur · taş: M1

## Sayılar

- Okunan açıklama: **1216**
- GEÇTİ: **1202**
- GERİ: **14**

| dosya | okunan | GEÇTİ | GERİ | durum |
|---|---|---|---|---|
| `content/v2/m1/gun-29.json` | 166 | 166 | 0 | reviewed olabilir |
| `content/v2/m1/gun-30.json` | 159 | 156 | 3 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-31.json` | 154 | 153 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-32.json` | 155 | 155 | 0 | reviewed olabilir |
| `content/v2/m1/gun-33.json` | 150 | 147 | 3 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-34.json` | 144 | 143 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/gun-35.json` | 142 | 137 | 5 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/m1/hafta-sonu-testi-05.json` | 19 | 19 | 0 | reviewed olabilir |
| `content/v2/m1/gorulmemis-05.json` | 14 | 13 | 1 | **reviewed sayılamaz** (OD-9.4) |
| `content/v2/registry/lexicon/batch-ic5-h5.json` | 93 | 93 | 0 | reviewed olabilir |
| `content/v2/registry/grammar.json` | 20 | 20 | 0 | reviewed olabilir |

## Kapsam ve yöntem

- Alanlar bir betikle JSON'dan toplandı ve tek tek okundu: `title_tr`, `goal_tr`, `can_do.tr`, `ortam_tr`, `sahne_tr`, `durum_tr`, `situation_tr`, `q_tr`, Türkçe `opts`, `why_tr`, `geri_bildirim_tr`, `kapanis_tr`, `gorev_tr`, `kontrol_tr`, `instr_tr`; kartlarda `tr`, `exp.anlam_tr`, `exp.ne_zaman_tr`, `exp.parcalar[].tr`, `exp.ipucu_tr`, `mistakes_tr`, `forms[].hint_tr`; dilbilgisi notlarında 10 kaydın `h_tr` ve `tr` alanı.
- Sayılmadı: dikte şıkları ve test `t03`, `t10` şıkları (Almanca kelime), kalıp kalıpları, sahne/ses satırlarının çevirileri, kart örnek ve eşdizim çevirileri.
- Her soru ve geri bildirim, Almanca satırla ve doğru cevapla karşılaştırıldı.
- Betikle sembol ve uzunluk taraması: `=`, `;`, `…`, tırnak içinde Almanca yok; 14 kelimeyi aşan cümle yok.

### Okurken verdiğim iki karar (baş geliştirici değiştirebilir)

1. **fiil** sözü (24 alanda) tek başına GERİ nedeni sayılmadı. 1. günden beri derslerin başlığında var (`gr:a1-01:t3`, `gr:a1-01:t4`), bu haftanın dersleri de onunla anlatıyor (`gr:a1-05:t4`, `gr:a1-05:t5`). Doğrulayıcının terim listesinde yalnız **ayrılabilen fiil**, **modal fiil**, **yardımcı fiil**, **çekimli** var, bunların hiçbiri bu haftada geçmiyor. Örnekle birlikte okuyunca anladım. Not: daha önceki bir okur raporu (`pm032.md`, `d18`) tek başına **fiil** sözünü GERİ saymıştı. Bu konuda tek bir kural konursa bu 24 alan yeniden bakılmalı.
2. **ikinci yerde** sözü (37 alan) geçti. `gr:a1-05:t5` tablosu **Am Samstag**, **Um 7 Uhr** gibi öbekleri tek yer olarak gösteriyor. Bu yüzden **Frau Brandl kauft …** cümlesinde **kauft** ikinci yerde diye okununca kafam karışmadı.
- İki kısa cümleli `why_tr` alanları, iki cümle de ekrandaki cevabı açıkça anlatıyorsa geçti (önceki okur raporlarıyla aynı ölçü). İkinci cümle yanıltıyorsa ya da anlaşılmıyorsa GERİ döndü.

## GERİ dönenler

Biçim: dosya · alan yolu · metin · kendi sözlerimle · neden · öneri (öneri yalnız fikir verir, düzeltmeyi yazar ya da baş geliştirici yapar).

1. `gun-30.json` · `goal_tr` · «Haftanın planını gün gün söylersin. Cümleye günle başlayınca fiili ikinci yerde tutarsın.» · Kendi sözlerimle: Haftamı gün gün anlatacağım. Bir de günle başlarsam fiil ikinci yerde kalacak. · **Neden:** İki fikir: hedef kutusunda bir de kural var. Kural dersin işi. · **Öneri:** Haftanın planını gün gün söylersin.
2. `gun-30.json` · `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` · «Şefine adıyla seslenme. **Herr Wimmer** de ve **Sie** kullan.» · Kendi sözlerimle: Şefe adıyla seslenmeyeceğim, Herr Wimmer diyeceğim. Sie kullan ne demek, anlamadım. · **Neden:** Ekrandaki ifadeyi anlatmıyor: seçenekte (Ja, was ist los, Stefan?) du yok. Sie kullan neyi düzeltiyor, belli değil. · **Öneri:** Şefine adıyla seslenme. **Herr Wimmer** de.
3. `gun-30.json` · `okuma_yazma.sorular[m1:30:o5].why_tr` · «**auch** de demektir: **Ich komme auch mit dem Bus.**» · Kendi sözlerimle: auch de demek... Tek başına de kelimesine takıldım, ikinci okumada ben de anlamını çıkardım. · **Neden:** Tek okumada anlaşılmıyor: tek başına duran de, Türkçedeki de/da eki olarak okunmuyor. · **Öneri:** **auch** ben de, sen de derken kullanılır.
4. `gun-31.json` · `goal_tr` · «Birine mesleğini sorarsın, nerede çalıştığını söylersin. Garda bilet ve kalkış saatini sorarsın.» · Kendi sözlerimle: Birine mesleğini soracağım. Sonra onun mu benim mi nerede çalıştığımı söyleyeceğim, emin olamadım. · **Neden:** İki türlü okunuyor: nerede çalıştığını kimin işi, belli değil (birine sorduktan hemen sonra geliyor). · **Öneri:** Birine mesleğini sorarsın. Kendi işini de söylersin. Garda bilet ve kalkış saatini sorarsın.
5. `gun-33.json` · `prova.durum_tr` · «Mola. Derya cumartesi kutlamasına seni de çağırıyor. Kabul et ya da kibarca başka bir gün öner.» · Kendi sözlerimle: Derya beni çağırıyor. Ya kabul edeceğim ya da ben başka bir gün önereceğim. · **Neden:** Provadaki şeyi anlatmıyor: hiçbir seçenekte gün öneren sen değilsin. Pazarı Derya öneriyor (n3). Öğrenci olmayan seçeneği arar. · **Öneri:** Mola. Derya cumartesi kutlamasına seni de çağırıyor. Kabul et ya da kibarca hayır de.
6. `gun-33.json` · `prova.kapanis_tr` · «Davete teşekkür ettin, kabul ettin ya da kibarca başka bir gün konuştun.» · Kendi sözlerimle: Teşekkür ettim, kabul ettim. Ya da başka bir gün mü konuştum? · **Neden:** İki türlü okunuyor: başka bir gün konuştun, konuşmayı başka bir gün yaptın gibi okunuyor. · **Öneri:** Davete teşekkür ettin. Ya kabul ettin ya da kibarca hayır dedin.
7. `gun-33.json` · `gun_sinavi.maddeler[m1:33:s7].why_tr` · «**leider** maalesef demek. **kommen** en sona gider.» · Kendi sözlerimle: leider maalesef demek. kommen en sona gidiyor ama cevabın en sonunda arbeiten var. · **Neden:** İki fikir, ikincisi yanıltıyor: cevapta iki parça var. kommen birinci parçanın sonunda, cümlenin en sonunda değil. · **Öneri:** **leider** maalesef demek: **Leider kann ich nicht kommen.**
8. `gun-34.json` · `gun_sinavi.maddeler[m1:34:s5].why_tr` · «Yol sorarken **Wie komme ich zum Rathaus?** dersin. **das Rathaus** ile **zum** olur.» · Kendi sözlerimle: Yol sorarken Wie komme ich zum Rathaus diyorum. İkinci cümlede neyin zum olduğunu anlamadım. · **Neden:** Anlamadım: das Rathaus ile zum olur cümlesinde ne zum oluyor, söylenmiyor. · **Öneri:** Yol sorarken **Wie komme ich zum Rathaus?** dersin.
9. `gun-35.json` · `sesler[m1:35:a2].bolumler[b1].cevapla.situation_tr` · «Tobi'ye cevap ver. Saat uyuyor.» · Kendi sözlerimle: Tobi'ye cevap ver. Saat uyuyor mu? Önce saat uyumuş gibi okudum. · **Neden:** İki türlü okunuyor: uyuyor hem uymak hem uyumak demek. · **Öneri:** Tobi'ye cevap ver. O saat sana uygun.
10. `gun-35.json` · `sesler[m1:35:a2].bolumler[b1].cevapla.why_tr` · «Saat uyuyorsa **Ja, das passt.** ya da **Ja, das geht.** dersin.» · Kendi sözlerimle: Saat uyuyorsa... yine uyumak gibi okudum. Saat uygunsa Ja, das passt diyorum. · **Neden:** İki türlü okunuyor: uyuyorsa hem uyuyorsa (uyku) hem uygunsa demek. · **Öneri:** Saat uygunsa **Ja, das passt.** ya da **Ja, das geht.** dersin.
11. `gun-35.json` · `prova.title_tr` · «Hafta kapısı provası: yarınki planın» · Kendi sözlerimle: Haftanın kapısının provası? Kapı ne demek, bilmiyorum. · **Neden:** Anlamadım: kapı uygulamanın iç sözü, öğrenciye hiç anlatılmadı. · **Öneri:** Haftanın son provası: yarınki planın
12. `gun-35.json` · `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` · «Tobi'ye **Sie** demezsin. Önce kendi planını **du** ile anlat.» · Kendi sözlerimle: Tobi'ye Sie demeyeceğim. Kendi planımı du ile anlatacakmışım; kendi planımda du nasıl olur, anlamadım. · **Neden:** İki fikir, ikincisi yanlış okunuyor: kendi planını du ile anlat diyor. Planı anlatırken ich kullanılır. · **Öneri:** Tobi'ye **Sie** demezsin. Önce kendi planını anlat.
13. `gun-35.json` · `prova.kapanis_tr` · «Yarınki planını önce Tobi'ye samimi, sonra Herr Wimmer'e kibarca anlattın. Haftanın kapısı bu.» · Kendi sözlerimle: Planımı önce Tobi'ye samimi, sonra şefe kibar anlattım. Haftanın kapısı bu: anlamadım. · **Neden:** Anlamadım: Haftanın kapısı bu cümlesi öğrenciye bir şey söylemiyor. · **Öneri:** Yarınki planını önce Tobi'ye samimi, sonra Herr Wimmer'e kibarca anlattın.
14. `gorulmemis-05.json` · `durumlar[m1:h05:g4].why_tr` · «Yabancıya **Sie** dersin. Sıra için **an der zweiten Ampel** kullanırsın.» · Kendi sözlerimle: Yabancıya Sie diyeceğim. Sıra için... kuyruk mu, sıra mı? Kaçıncı ışık demek olduğunu sonra anladım. · **Neden:** İki fikir, ikincisi belirsiz: sıra sözü kuyruk ya da sıra gelmesi gibi okunuyor. · **Öneri:** Kaçıncı ışık olduğunu **an der zweiten Ampel** diye söylersin.

GERİ kimlikleri:

- `gun-30.json`: `goal_tr`, `prova.dugumler[n1].secenekler[2].geri_bildirim_tr`, `okuma_yazma.sorular[m1:30:o5].why_tr`
- `gun-31.json`: `goal_tr`
- `gun-33.json`: `prova.durum_tr`, `prova.kapanis_tr`, `gun_sinavi.maddeler[m1:33:s7].why_tr`
- `gun-34.json`: `gun_sinavi.maddeler[m1:34:s5].why_tr`
- `gun-35.json`: `sesler[m1:35:a2].bolumler[b1].cevapla.situation_tr`, `sesler[m1:35:a2].bolumler[b1].cevapla.why_tr`, `prova.title_tr`, `prova.dugumler[n1].secenekler[2].geri_bildirim_tr`, `prova.kapanis_tr`
- `gorulmemis-05.json`: `durumlar[m1:h05:g4].why_tr`

## Karar

**GERİ DÖNDÜ (14).** GERİ olan altı dosya (`gun-30`, `gun-31`, `gun-33`, `gun-34`, `gun-35`, `gorulmemis-05`) düzeltilip bu maddeler yeniden okunmadan "reviewed" sayılamaz (OD-9.4). `gun-29`, `gun-32`, `hafta-sonu-testi-05`, `batch-ic5-h5` ve 10 dilbilgisi kaydında GERİ yok.

## Ek: okunan bütün alanlar

GEÇTİ satırlarında kendi sözlerim yazılmadı: anlattığım şey açıklamanın kendisiyle aynıydı. GERİ satırlarındaki kendi sözlerim yukarıda.

### `content/v2/m1/gun-29.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `title_tr` | Sabah kalkmak: Ich stehe um sieben auf | GEÇTİ |
| 2 | `goal_tr` | Kaçta kalktığını, işin ve muayene saatinin kaçta başladığını söylersin. | GEÇTİ |
| 3 | `can_do.tr` | Sabah kaçta kalktığımı, işin kaçta başladığını söylerim. | GEÇTİ |
| 4 | `halkalar[m1:29:h1].title_tr` | Pazartesi sabahı evde | GEÇTİ |
| 5 | `halkalar[m1:29:h1].sahne.ortam_tr` | Apartmanın merdiveni, sabah erken. Apartman görevlisi Herr Pichler'le karşılaşıyorsun. | GEÇTİ |
| 6 | `halkalar[m1:29:h1].sahne.soru.q_tr` | Herr Pichler lamba için ne zaman geliyor? | GEÇTİ |
| 7 | `halkalar[m1:29:h1].sahne.soru.opts[0]` | Bu akşam | GEÇTİ |
| 8 | `halkalar[m1:29:h1].sahne.soru.opts[1]` | Yarın sabah | GEÇTİ |
| 9 | `halkalar[m1:29:h1].sahne.soru.opts[2]` | Öğlen | GEÇTİ |
| 10 | `halkalar[m1:29:h1].sahne.soru.opts[3]` | Hafta sonu | GEÇTİ |
| 11 | `halkalar[m1:29:h2].title_tr` | Merdivende: kaçta kalkıyorsunuz? | GEÇTİ |
| 12 | `halkalar[m1:29:h2].sahne.ortam_tr` | Apartmanın kapısı, sabah altıyı çeyrek geçe. Alt kattaki komşun Frau Brandl elinde ekmekle geliyor. | GEÇTİ |
| 13 | `halkalar[m1:29:h2].sahne.soru.q_tr` | Frau Brandl sabah ne yapıyor? | GEÇTİ |
| 14 | `halkalar[m1:29:h2].sahne.soru.opts[0]` | Beşte kalkıp fırından alışveriş yapıyor | GEÇTİ |
| 15 | `halkalar[m1:29:h2].sahne.soru.opts[1]` | Altıda kalkıp işe gidiyor | GEÇTİ |
| 16 | `halkalar[m1:29:h2].sahne.soru.opts[2]` | Yedide kalkıp televizyon izliyor | GEÇTİ |
| 17 | `halkalar[m1:29:h3].title_tr` | Tobi hasta | GEÇTİ |
| 18 | `halkalar[m1:29:h3].sahne.ortam_tr` | Telefon, sabah. Tobi seni arıyor, sesi kısık. | GEÇTİ |
| 19 | `halkalar[m1:29:h3].sahne.soru.q_tr` | Tobi'nin neyi var? | GEÇTİ |
| 20 | `halkalar[m1:29:h3].sahne.soru.opts[0]` | Nezle, ateş ve boğaz ağrısı | GEÇTİ |
| 21 | `halkalar[m1:29:h3].sahne.soru.opts[1]` | Sadece baş ağrısı | GEÇTİ |
| 22 | `halkalar[m1:29:h3].sahne.soru.opts[2]` | Sırt ağrısı | GEÇTİ |
| 23 | `halkalar[m1:29:h3].sahne.soru.opts[3]` | Hiçbir şeyi yok | GEÇTİ |
| 24 | `halkalar[m1:29:h4].title_tr` | Öğlen: ekmek arası sosis | GEÇTİ |
| 25 | `halkalar[m1:29:h4].sahne.ortam_tr` | Öğle arası. Fırının yanındaki küçük sosis büfesi. | GEÇTİ |
| 26 | `halkalar[m1:29:h4].sahne.soru.q_tr` | Sosisi nasıl istiyorsun? | GEÇTİ |
| 27 | `halkalar[m1:29:h4].sahne.soru.opts[0]` | Hardalsız | GEÇTİ |
| 28 | `halkalar[m1:29:h4].sahne.soru.opts[1]` | Hardallı | GEÇTİ |
| 29 | `halkalar[m1:29:h4].sahne.soru.opts[2]` | Ekmeksiz | GEÇTİ |
| 30 | `sahne.title_tr` | Pazartesi sabahı: Tobi nerede? | GEÇTİ |
| 31 | `sahne.sahneler[s1].sahne_tr` | Firmanın giriş kapısı. Derya saatine bakıyor, kaşları kalkıyor. | GEÇTİ |
| 32 | `sahne.sahneler[s2].sahne_tr` | Derya duvardaki büyük saati gösteriyor. | GEÇTİ |
| 33 | `sahne.sahneler[s2b].sahne_tr` | Derya boş kalan dolaba bakıyor. | GEÇTİ |
| 34 | `sahne.sahneler[s3].sahne_tr` | Herr Wimmer elinde dosyalarla hızlı adımlarla geliyor. | GEÇTİ |
| 35 | `sahne.sahneler[s4].sahne_tr` | Derya omuz silkiyor. | GEÇTİ |
| 36 | `sahne.sahneler[s5].sahne_tr` | Herr Wimmer iç çekip saatine bakıyor. | GEÇTİ |
| 37 | `sahne.sahneler[s6].sahne_tr` | Derya'nın telefonu çalıyor. Ekranda Tobi'nin adı var. | GEÇTİ |
| 38 | `sahne.sahneler[s7].sahne_tr` | Tobi yatakta, boynunda kalın bir atkı, sesi kısık. | GEÇTİ |
| 39 | `sahne.sahneler[s8].sahne_tr` | Tobi burnunu siliyor, boğazını tutuyor. | GEÇTİ |
| 40 | `sahne.sahneler[s9].sahne_tr` | Derya üzgün bir yüzle telefonu kulağına bastırıyor. | GEÇTİ |
| 41 | `sahne.sahneler[s10].sahne_tr` | Tobi komodindeki saate bakıyor: yedi yirmi. | GEÇTİ |
| 42 | `sahne.sahneler[s11].sahne_tr` | Tobi yorgun yorgun başını yastığa koyuyor. | GEÇTİ |
| 43 | `sahne.sahneler[s12].sahne_tr` | Derya telefonu kapatıp Herr Wimmer'e dönüyor. | GEÇTİ |
| 44 | `sahne.sahneler[s13].sahne_tr` | Herr Wimmer başını sallıyor, bir şey not ediyor. | GEÇTİ |
| 45 | `sahne.sahneler[s14].sahne_tr` | Derya ellerini iki yana açıyor. | GEÇTİ |
| 46 | `sahne.sahneler[s15].sahne_tr` | Herr Wimmer saatine bakıp ellerini çırpıyor. | GEÇTİ |
| 47 | `sahne.bolumler[b1].ana_fikir.q_tr` | Bu sahnede ne oluyor? | GEÇTİ |
| 48 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Tobi hasta, bugün işe gelmiyor | GEÇTİ |
| 49 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Tobi geç kalıyor ama geliyor | GEÇTİ |
| 50 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Herr Wimmer hasta | GEÇTİ |
| 51 | `sahne.bolumler[b1].ayrinti[0].q_tr` | İş saat kaçta başlıyor? | GEÇTİ |
| 52 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | sekizde | GEÇTİ |
| 53 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | yedide | GEÇTİ |
| 54 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | yedi buçukta | GEÇTİ |
| 55 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Tobi'nin neye ihtiyacı var? | GEÇTİ |
| 56 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | Hastalık raporuna | GEÇTİ |
| 57 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | Yeni bir telefona | GEÇTİ |
| 58 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | Bir randevuya | GEÇTİ |
| 59 | `sahne.bolumler[b1].ayrinti[2].q_tr` | Derya'ya göre Tobi ne zaman dönebilir? | GEÇTİ |
| 60 | `sahne.bolumler[b1].ayrinti[2].opts[0]` | Yarın | GEÇTİ |
| 61 | `sahne.bolumler[b1].ayrinti[2].opts[1]` | Cuma | GEÇTİ |
| 62 | `sahne.bolumler[b1].ayrinti[2].opts[2]` | Belki çarşamba | GEÇTİ |
| 63 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 64 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Sahnede ne olduğunu Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 65 | `sahne.bolumler[b1].cevapla.situation_tr` | Derya sana dönüp soruyor. Sen her gün altıda kalkıyorsun. | GEÇTİ |
| 66 | `sahne.bolumler[b1].cevapla.why_tr` | Fiilin küçük parçası **auf** cümlenin en sonuna gider: **Ich stehe um sechs auf.** | GEÇTİ |
| 67 | `sesler[m1:29:a1].title_tr` | Herr Wimmer'den sesli mesaj | GEÇTİ |
| 68 | `sesler[m1:29:a1].ortam_tr` | Akşam telefonuna bakıyorsun. Şefin Herr Wimmer bir mesaj bırakmış. | GEÇTİ |
| 69 | `sesler[m1:29:a1].bolumler[b1].ana_fikir.q_tr` | Herr Wimmer neden arıyor? | GEÇTİ |
| 70 | `sesler[m1:29:a1].bolumler[b1].ana_fikir.opts[0]` | Yarın iş yok | GEÇTİ |
| 71 | `sesler[m1:29:a1].bolumler[b1].ana_fikir.opts[1]` | Yarın iş daha erken başlıyor | GEÇTİ |
| 72 | `sesler[m1:29:a1].bolumler[b1].ana_fikir.opts[2]` | Yarın toplantı var | GEÇTİ |
| 73 | `sesler[m1:29:a1].bolumler[b1].ayrinti[0].q_tr` | Yarın iş saat kaçta başlıyor? | GEÇTİ |
| 74 | `sesler[m1:29:a1].bolumler[b1].ayrinti[0].opts[0]` | altıda | GEÇTİ |
| 75 | `sesler[m1:29:a1].bolumler[b1].ayrinti[0].opts[1]` | yedide | GEÇTİ |
| 76 | `sesler[m1:29:a1].bolumler[b1].ayrinti[0].opts[2]` | beşte | GEÇTİ |
| 77 | `sesler[m1:29:a1].bolumler[b1].ayrinti[1].q_tr` | Herr Wimmer seni kaçta işte görmek istiyor? | GEÇTİ |
| 78 | `sesler[m1:29:a1].bolumler[b1].ayrinti[1].opts[0]` | altıyı çeyrek geçe | GEÇTİ |
| 79 | `sesler[m1:29:a1].bolumler[b1].ayrinti[1].opts[1]` | altıya çeyrek kala | GEÇTİ |
| 80 | `sesler[m1:29:a1].bolumler[b1].ayrinti[1].opts[2]` | beşte | GEÇTİ |
| 81 | `sesler[m1:29:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 82 | `sesler[m1:29:a1].bolumler[b1].dikte[d5].gorev_tr` | Mesajda ne dendiğini Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 83 | `sesler[m1:29:a1].bolumler[b1].cevapla.situation_tr` | Herr Wimmer'e cevap veriyorsun. Olur diyorsun, beşte kalkacaksın. | GEÇTİ |
| 84 | `sesler[m1:29:a1].bolumler[b1].cevapla.why_tr` | Önce **Ja, das geht** de. Sonra kaçta kalktığını söyle. | GEÇTİ |
| 85 | `sesler[m1:29:a1].eylem.q_tr` | Yarın sabah ne yapmalısın? | GEÇTİ |
| 86 | `sesler[m1:29:a1].eylem.opts[0]` | Her zamanki gibi yedide işte ol. | GEÇTİ |
| 87 | `sesler[m1:29:a1].eylem.opts[1]` | Erken kalk, altıya çeyrek kala işte ol. | GEÇTİ |
| 88 | `sesler[m1:29:a1].eylem.opts[2]` | Tobi'yi alıp birlikte gel. | GEÇTİ |
| 89 | `sesler[m1:29:a1].eylem.why_tr` | Yarın iş altıda başlıyor. Herr Wimmer seni altıya çeyrek kala bekliyor. | GEÇTİ |
| 90 | `sesler[m1:29:a2].title_tr` | Sabah radyosu | GEÇTİ |
| 91 | `sesler[m1:29:a2].ortam_tr` | Sabah kahvaltıda yerel radyo açık. Sunucu kısa bir sağlık notu veriyor. | GEÇTİ |
| 92 | `sesler[m1:29:a2].bolumler[b1].ana_fikir.q_tr` | Radyo ne öneriyor? | GEÇTİ |
| 93 | `sesler[m1:29:a2].bolumler[b1].ana_fikir.opts[0]` | Hastaysan evde kal | GEÇTİ |
| 94 | `sesler[m1:29:a2].bolumler[b1].ana_fikir.opts[1]` | Bugün erken işe git | GEÇTİ |
| 95 | `sesler[m1:29:a2].bolumler[b1].ana_fikir.opts[2]` | Otobüse binme | GEÇTİ |
| 96 | `sesler[m1:29:a2].bolumler[b1].ayrinti[0].q_tr` | Muayene saatleri kaçta başlıyor? | GEÇTİ |
| 97 | `sesler[m1:29:a2].bolumler[b1].ayrinti[0].opts[0]` | altıda | GEÇTİ |
| 98 | `sesler[m1:29:a2].bolumler[b1].ayrinti[0].opts[1]` | sekizde | GEÇTİ |
| 99 | `sesler[m1:29:a2].bolumler[b1].ayrinti[0].opts[2]` | yedide | GEÇTİ |
| 100 | `sesler[m1:29:a2].bolumler[b1].ayrinti[1].q_tr` | Radyoya göre saat kaç? | GEÇTİ |
| 101 | `sesler[m1:29:a2].bolumler[b1].ayrinti[1].opts[0]` | altı | GEÇTİ |
| 102 | `sesler[m1:29:a2].bolumler[b1].ayrinti[1].opts[1]` | yedi | GEÇTİ |
| 103 | `sesler[m1:29:a2].bolumler[b1].ayrinti[1].opts[2]` | sekiz | GEÇTİ |
| 104 | `sesler[m1:29:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 105 | `sesler[m1:29:a2].bolumler[b1].dikte[d5].gorev_tr` | Radyoda ne dendiğini Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 106 | `sesler[m1:29:a2].bolumler[b1].cevapla.situation_tr` | Derya muayene saatini soruyor. Radyoda duydun. | GEÇTİ |
| 107 | `sesler[m1:29:a2].bolumler[b1].cevapla.why_tr` | Saatin önüne **ab** gelirse o saatten itibaren demektir: **ab acht Uhr**. | GEÇTİ |
| 108 | `sesler[m1:29:a2].eylem.q_tr` | Ateşin var. Ne yapmalısın? | GEÇTİ |
| 109 | `sesler[m1:29:a2].eylem.opts[0]` | İşe git, öğlen doktoru ara. | GEÇTİ |
| 110 | `sesler[m1:29:a2].eylem.opts[1]` | Evde kal, sekizden sonra muayenehaneyi ara. | GEÇTİ |
| 111 | `sesler[m1:29:a2].eylem.opts[2]` | Saat altıda muayenehaneye git. | GEÇTİ |
| 112 | `sesler[m1:29:a2].eylem.why_tr` | Radyo ateşi olanlara evde kalmayı söylüyor. Muayene saati sekizde başlıyor. | GEÇTİ |
| 113 | `prova.title_tr` | Tobi akşam arıyor | GEÇTİ |
| 114 | `prova.durum_tr` | Akşam. Hasta olan Tobi seni arıyor. Yarın iş altıda başlıyor, Tobi bunu bilmiyor. | GEÇTİ |
| 115 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Güzel. Hasta arkadaşına önce nasıl olduğunu sordun. | GEÇTİ |
| 116 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Olur. **Und dir?** ile Tobi'ye de sordun. | GEÇTİ |
| 117 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Tobi hasta ve seni arıyor. Önce nasıl olduğunu sor. | GEÇTİ |
| 118 | `prova.dugumler[n1b].secenekler[0].geri_bildirim_tr` | Şimdi oldu. Tobi'nin hâlini sordun. | GEÇTİ |
| 119 | `prova.dugumler[n1b].secenekler[1].geri_bildirim_tr` | Tobi'nin isteği kısa. Bir cümleyle nasıl olduğunu sor. | GEÇTİ |
| 120 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Doğru. Herr Wimmer'in mesajını hatırladın. | GEÇTİ |
| 121 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Kısa ve doğru. **schon** saatin erken olduğunu gösterir. | GEÇTİ |
| 122 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Herr Wimmer'in mesajına göre iş yarın altıda başlıyor. **sechs** de. | GEÇTİ |
| 123 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Çok iyi. **auf** cümlenin en sonunda. | GEÇTİ |
| 124 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Kısa cevap da olur. Soruyu Tobi'ye geri sordun. | GEÇTİ |
| 125 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | İş altıda başlıyor. Yedide kalkarsan geç kalırsın. | GEÇTİ |
| 126 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Harika. **an** yine cümlenin sonunda. | GEÇTİ |
| 127 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Olur. Sabah Tobi'yi aramayı unutma! | GEÇTİ |
| 128 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Yedi çok geç. Tobi dört buçukta aranmak istiyor. | GEÇTİ |
| 129 | `prova.kapanis_tr` | Hasta arkadaşının hâlini sordun, kalkış saatini söyledin ve sabah aramayı kabul ettin. | GEÇTİ |
| 130 | `okuma_yazma.title_tr` | Tobi'den mesaj | GEÇTİ |
| 131 | `okuma_yazma.sorular[m1:29:o1].q_tr` | Tobi neden yazıyor? | GEÇTİ |
| 132 | `okuma_yazma.sorular[m1:29:o1].opts[0]` | Hasta, bugün işe gelemiyor | GEÇTİ |
| 133 | `okuma_yazma.sorular[m1:29:o1].opts[1]` | Seni yemeğe çağırıyor | GEÇTİ |
| 134 | `okuma_yazma.sorular[m1:29:o1].opts[2]` | İşe geç kalıyor | GEÇTİ |
| 135 | `okuma_yazma.sorular[m1:29:o2].q_tr` | Tobi saat kaçta muayeneye gidiyor? | GEÇTİ |
| 136 | `okuma_yazma.sorular[m1:29:o2].opts[0]` | yedide | GEÇTİ |
| 137 | `okuma_yazma.sorular[m1:29:o2].opts[1]` | sekizde | GEÇTİ |
| 138 | `okuma_yazma.sorular[m1:29:o2].opts[2]` | on ikide | GEÇTİ |
| 139 | `okuma_yazma.sorular[m1:29:o3].q_tr` | Tobi'nin neyi var? | GEÇTİ |
| 140 | `okuma_yazma.sorular[m1:29:o3].opts[0]` | Nezle ve boğaz ağrısı | GEÇTİ |
| 141 | `okuma_yazma.sorular[m1:29:o3].opts[1]` | Ateş ve sırt ağrısı | GEÇTİ |
| 142 | `okuma_yazma.sorular[m1:29:o3].opts[2]` | Baş ağrısı | GEÇTİ |
| 143 | `okuma_yazma.sorular[m1:29:o4].q_tr` | Tobi seni ne zaman arıyor? | GEÇTİ |
| 144 | `okuma_yazma.sorular[m1:29:o4].opts[0]` | Yarın sabah | GEÇTİ |
| 145 | `okuma_yazma.sorular[m1:29:o4].opts[1]` | Bu akşam | GEÇTİ |
| 146 | `okuma_yazma.sorular[m1:29:o4].opts[2]` | Öğlen | GEÇTİ |
| 147 | `okuma_yazma.sorular[m1:29:o5].situation_tr` | Tobi'ye kısa bir cevap ver. Bu akşam evdesin. | GEÇTİ |
| 148 | `okuma_yazma.sorular[m1:29:o5].why_tr` | Bu akşam derken **heute Abend** dersin. | GEÇTİ |
| 149 | `gun_sinavi.maddeler[m1:29:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 150 | `gun_sinavi.maddeler[m1:29:s1].why_tr` | Küçük parça **auf** cümlenin en sonunda duruyor. | GEÇTİ |
| 151 | `gun_sinavi.maddeler[m1:29:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 152 | `gun_sinavi.maddeler[m1:29:s2].why_tr` | **kauft** ikinci yerde, **ein** en sonda. | GEÇTİ |
| 153 | `gun_sinavi.maddeler[m1:29:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 154 | `gun_sinavi.maddeler[m1:29:s3].why_tr` | **fängt** ikinci yerde, **an** en sonda. | GEÇTİ |
| 155 | `gun_sinavi.maddeler[m1:29:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 156 | `gun_sinavi.maddeler[m1:29:s4].why_tr` | **mit Senf** hardallı demektir. | GEÇTİ |
| 157 | `gun_sinavi.maddeler[m1:29:s5].why_tr` | Altı buçuk derken **halb sieben** dersin. **auf** en sona gider. | GEÇTİ |
| 158 | `gun_sinavi.maddeler[m1:29:s6].why_tr` | Boğaz ağrısı için **Mein Hals tut weh** dersin. | GEÇTİ |
| 159 | `gun_sinavi.maddeler[m1:29:s7].why_tr` | Saati sorarken **Wie spät ist es?** dersin. | GEÇTİ |
| 160 | `gun_sinavi.maddeler[m1:29:s8].why_tr` | **rufe** ikinci yerde, **an** en sonda. | GEÇTİ |
| 161 | `gun_sinavi.maddeler[m1:29:s9].situation_tr` | Herr Wimmer kaçta kalktığını soruyor. Beşte kalkıyorsun. | GEÇTİ |
| 162 | `gun_sinavi.maddeler[m1:29:s9].why_tr` | Küçük parça **auf** en sonda: **Ich stehe um fünf auf.** | GEÇTİ |
| 163 | `gun_sinavi.maddeler[m1:29:s10].situation_tr` | İş yarın yedide başlıyor. Cevap ver. | GEÇTİ |
| 164 | `gun_sinavi.maddeler[m1:29:s10].why_tr` | **fängt** ikinci yerde, **an** en sonda. | GEÇTİ |
| 165 | `gun_sinavi.maddeler[m1:29:s11].situation_tr` | Tobi molada soruyor. Altıda kalkıyorsun, iş yedide başlıyor. | GEÇTİ |
| 166 | `gun_sinavi.maddeler[m1:29:s11].why_tr` | Önce kalkış saatini, sonra işin başladığı saati söyle. | GEÇTİ |

### `content/v2/m1/gun-30.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `title_tr` | Cümleye zamanla başlamak: Am Montag arbeite ich | GEÇTİ |
| 2 | `goal_tr` | Haftanın planını gün gün söylersin. Cümleye günle başlayınca fiili ikinci yerde tutarsın. | **GERİ** |
| 3 | `can_do.tr` | Haftamın planını gün gün söylerim. | GEÇTİ |
| 4 | `halkalar[m1:30:h1].title_tr` | Tobi geri döndü | GEÇTİ |
| 5 | `halkalar[m1:30:h1].sahne.ortam_tr` | Salı sabahı, firmanın koridoru. Tobi işe geri dönmüş, burnu hâlâ kıpkırmızı. | GEÇTİ |
| 6 | `halkalar[m1:30:h1].sahne.soru.q_tr` | Tobi en sonda ne soruyor? | GEÇTİ |
| 7 | `halkalar[m1:30:h1].sahne.soru.opts[0]` | Ücretin yatıp yatmadığını | GEÇTİ |
| 8 | `halkalar[m1:30:h1].sahne.soru.opts[1]` | Saatin kaç olduğunu | GEÇTİ |
| 9 | `halkalar[m1:30:h1].sahne.soru.opts[2]` | Wimmer Bey'in nerede olduğunu | GEÇTİ |
| 10 | `halkalar[m1:30:h2].title_tr` | Resmî dairede kayıt | GEÇTİ |
| 11 | `halkalar[m1:30:h2].sahne.ortam_tr` | Herr Wimmer'in odası. Gelecek hafta resmî dairede kaydını yaptıracaksın. | GEÇTİ |
| 12 | `halkalar[m1:30:h2].sahne.soru.q_tr` | Salı günü ne yapıyorsun? | GEÇTİ |
| 13 | `halkalar[m1:30:h2].sahne.soru.opts[0]` | Resmî daireye gidiyorum | GEÇTİ |
| 14 | `halkalar[m1:30:h2].sahne.soru.opts[1]` | Çalışıyorum | GEÇTİ |
| 15 | `halkalar[m1:30:h2].sahne.soru.opts[2]` | Doktora gidiyorum | GEÇTİ |
| 16 | `halkalar[m1:30:h3].title_tr` | Pazar günü Münih | GEÇTİ |
| 17 | `halkalar[m1:30:h3].sahne.ortam_tr` | Öğle arası. Tobi hafta sonu planını anlatıyor. | GEÇTİ |
| 18 | `halkalar[m1:30:h3].sahne.soru.q_tr` | Tobi pazar günü nereye gidiyor? | GEÇTİ |
| 19 | `halkalar[m1:30:h3].sahne.soru.opts[0]` | Münih'e | GEÇTİ |
| 20 | `halkalar[m1:30:h3].sahne.soru.opts[1]` | Benzinciye | GEÇTİ |
| 21 | `halkalar[m1:30:h3].sahne.soru.opts[2]` | İşe | GEÇTİ |
| 22 | `sahne.title_tr` | Panoda haftanın planı | GEÇTİ |
| 23 | `sahne.sahneler[s1].sahne_tr` | Sabah, iş yerindeki büyük pano. Herr Wimmer elinde kalemle panonun önünde duruyor. | GEÇTİ |
| 24 | `sahne.sahneler[s2].sahne_tr` | Herr Wimmer panodaki pazartesi ve salı sütunlarını gösteriyor. | GEÇTİ |
| 25 | `sahne.sahneler[s3].sahne_tr` | Kalemi çarşamba sütununa vuruyor. | GEÇTİ |
| 26 | `sahne.sahneler[s4].sahne_tr` | Perşembe sütununda bir anahtar resmi var. | GEÇTİ |
| 27 | `sahne.sahneler[s5].sahne_tr` | Cuma sütununa büyük bir saat çiziyor. | GEÇTİ |
| 28 | `sahne.sahneler[s6].sahne_tr` | Tobi'nin gözleri parlıyor. | GEÇTİ |
| 29 | `sahne.sahneler[s7].sahne_tr` | Herr Wimmer gülümsüyor. | GEÇTİ |
| 30 | `sahne.sahneler[s8].sahne_tr` | Tobi yumruğunu havaya kaldırıyor. | GEÇTİ |
| 31 | `sahne.sahneler[s9].sahne_tr` | Derya elini kaldırıyor. | GEÇTİ |
| 32 | `sahne.sahneler[s10].sahne_tr` | Herr Wimmer panoya küçük bir not ekliyor. | GEÇTİ |
| 33 | `sahne.sahneler[s11].sahne_tr` | Herr Wimmer Tobi'ye dönüyor. Tobi burnunu siliyor. | GEÇTİ |
| 34 | `sahne.sahneler[s12].sahne_tr` | Tobi omuz silkiyor. | GEÇTİ |
| 35 | `sahne.sahneler[s13].sahne_tr` | Herr Wimmer kalemi cebine koyup kapıya yürüyor. | GEÇTİ |
| 36 | `sahne.bolumler[b1].ana_fikir.q_tr` | Herr Wimmer ne anlatıyor? | GEÇTİ |
| 37 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Haftanın çalışma planını | GEÇTİ |
| 38 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni bir makineyi | GEÇTİ |
| 39 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Tatil günlerini | GEÇTİ |
| 40 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Çarşamba iş kaçta başlıyor? | GEÇTİ |
| 41 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | altıda | GEÇTİ |
| 42 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | yedide | GEÇTİ |
| 43 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | sekizde | GEÇTİ |
| 44 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Teknisyen hangi gün geliyor? | GEÇTİ |
| 45 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | salı | GEÇTİ |
| 46 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | perşembe | GEÇTİ |
| 47 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | cuma | GEÇTİ |
| 48 | `sahne.bolumler[b1].ayrinti[2].q_tr` | Cumartesi firma açık mı? | GEÇTİ |
| 49 | `sahne.bolumler[b1].ayrinti[2].opts[0]` | Hayır, kapalı | GEÇTİ |
| 50 | `sahne.bolumler[b1].ayrinti[2].opts[1]` | Evet, sabah açık | GEÇTİ |
| 51 | `sahne.bolumler[b1].ayrinti[2].opts[2]` | Evet, bütün gün açık | GEÇTİ |
| 52 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 53 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Herr Wimmer'in planını Almanca iki kısa cümleyle anlat. Her cümleye bir günle başla. | GEÇTİ |
| 54 | `sahne.bolumler[b1].cevapla.situation_tr` | Tobi soruyor. Cuma öğleden sonra alışveriş yapıyorsun. | GEÇTİ |
| 55 | `sahne.bolumler[b1].cevapla.why_tr` | Günle başlarsan **kaufe** ikinci yerde kalır, **ein** en sona gider. | GEÇTİ |
| 56 | `sesler[m1:30:a1].title_tr` | Firmanın hoparlör duyurusu | GEÇTİ |
| 57 | `sesler[m1:30:a1].ortam_tr` | İş yerinde hoparlörden Herr Wimmer'in sesi geliyor. | GEÇTİ |
| 58 | `sesler[m1:30:a1].bolumler[b1].ana_fikir.q_tr` | Duyuru ne hakkında? | GEÇTİ |
| 59 | `sesler[m1:30:a1].bolumler[b1].ana_fikir.opts[0]` | Perşembe otopark, cuma çalışma saati | GEÇTİ |
| 60 | `sesler[m1:30:a1].bolumler[b1].ana_fikir.opts[1]` | Yeni çalışanlar | GEÇTİ |
| 61 | `sesler[m1:30:a1].bolumler[b1].ana_fikir.opts[2]` | Maaşlar | GEÇTİ |
| 62 | `sesler[m1:30:a1].bolumler[b1].ayrinti[0].q_tr` | Otopark hangi gün kapalı? | GEÇTİ |
| 63 | `sesler[m1:30:a1].bolumler[b1].ayrinti[0].opts[0]` | çarşamba | GEÇTİ |
| 64 | `sesler[m1:30:a1].bolumler[b1].ayrinti[0].opts[1]` | perşembe | GEÇTİ |
| 65 | `sesler[m1:30:a1].bolumler[b1].ayrinti[0].opts[2]` | cuma | GEÇTİ |
| 66 | `sesler[m1:30:a1].bolumler[b1].ayrinti[1].q_tr` | Cuma iş kaçta başlıyor? | GEÇTİ |
| 67 | `sesler[m1:30:a1].bolumler[b1].ayrinti[1].opts[0]` | altıda | GEÇTİ |
| 68 | `sesler[m1:30:a1].bolumler[b1].ayrinti[1].opts[1]` | yedide | GEÇTİ |
| 69 | `sesler[m1:30:a1].bolumler[b1].ayrinti[1].opts[2]` | on ikide | GEÇTİ |
| 70 | `sesler[m1:30:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 71 | `sesler[m1:30:a1].bolumler[b1].dikte[d5].gorev_tr` | Duyuruda ne dendiğini Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 72 | `sesler[m1:30:a1].bolumler[b1].cevapla.situation_tr` | Derya cuma iş kaçta başlıyor diye soruyor. Duyuruda duydun. | GEÇTİ |
| 73 | `sesler[m1:30:a1].bolumler[b1].cevapla.why_tr` | Günle başlarsan **fängt** ikinci yerde, **an** en sonda kalır. | GEÇTİ |
| 74 | `sesler[m1:30:a1].eylem.q_tr` | Perşembe işe nasıl gelmelisin? | GEÇTİ |
| 75 | `sesler[m1:30:a1].eylem.opts[0]` | Arabayla gel, firmanın otoparkına park et. | GEÇTİ |
| 76 | `sesler[m1:30:a1].eylem.opts[1]` | Otobüsle gel. | GEÇTİ |
| 77 | `sesler[m1:30:a1].eylem.opts[2]` | Gelme, evde kal. | GEÇTİ |
| 78 | `sesler[m1:30:a1].eylem.why_tr` | Perşembe otopark kapalı. Herr Wimmer otobüsle gelmeyi rica ediyor. | GEÇTİ |
| 79 | `sesler[m1:30:a2].title_tr` | Ioana'dan sesli mesaj | GEÇTİ |
| 80 | `sesler[m1:30:a2].ortam_tr` | Akşam telefonuna bakıyorsun. Kurstan arkadaşın Ioana mesaj bırakmış. | GEÇTİ |
| 81 | `sesler[m1:30:a2].bolumler[b1].ana_fikir.q_tr` | Ioana neden arıyor? | GEÇTİ |
| 82 | `sesler[m1:30:a2].bolumler[b1].ana_fikir.opts[0]` | Seni pazar günkü Münih gezisine çağırıyor | GEÇTİ |
| 83 | `sesler[m1:30:a2].bolumler[b1].ana_fikir.opts[1]` | Kursun iptal olduğunu söylüyor | GEÇTİ |
| 84 | `sesler[m1:30:a2].bolumler[b1].ana_fikir.opts[2]` | Hasta olduğunu söylüyor | GEÇTİ |
| 85 | `sesler[m1:30:a2].bolumler[b1].ayrinti[0].q_tr` | Münih'e varış saat kaçta? | GEÇTİ |
| 86 | `sesler[m1:30:a2].bolumler[b1].ayrinti[0].opts[0]` | dokuzda | GEÇTİ |
| 87 | `sesler[m1:30:a2].bolumler[b1].ayrinti[0].opts[1]` | onda | GEÇTİ |
| 88 | `sesler[m1:30:a2].bolumler[b1].ayrinti[0].opts[2]` | on birde | GEÇTİ |
| 89 | `sesler[m1:30:a2].bolumler[b1].ayrinti[1].q_tr` | Münih'te neyle gezecekler? | GEÇTİ |
| 90 | `sesler[m1:30:a2].bolumler[b1].ayrinti[1].opts[0]` | Metroyla | GEÇTİ |
| 91 | `sesler[m1:30:a2].bolumler[b1].ayrinti[1].opts[1]` | Otobüsle | GEÇTİ |
| 92 | `sesler[m1:30:a2].bolumler[b1].ayrinti[1].opts[2]` | Yürüyerek | GEÇTİ |
| 93 | `sesler[m1:30:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 94 | `sesler[m1:30:a2].bolumler[b1].dikte[d5].gorev_tr` | Mesajda ne dendiğini Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 95 | `sesler[m1:30:a2].bolumler[b1].cevapla.situation_tr` | Ioana'ya cevap ver. Gelmek istiyorsun, pazar günü vaktin var. | GEÇTİ |
| 96 | `sesler[m1:30:a2].bolumler[b1].cevapla.why_tr` | Günle başlarsan **habe** hemen arkasından gelir: **Am Sonntag habe ich Zeit.** | GEÇTİ |
| 97 | `sesler[m1:30:a2].eylem.q_tr` | Ioana senden ne istiyor? | GEÇTİ |
| 98 | `sesler[m1:30:a2].eylem.opts[0]` | Pazar günü gelip gelmeyeceğini söylemeni | GEÇTİ |
| 99 | `sesler[m1:30:a2].eylem.opts[1]` | Pazartesi onu aramanı | GEÇTİ |
| 100 | `sesler[m1:30:a2].eylem.opts[2]` | Ona Münih'te metro bileti almanı | GEÇTİ |
| 101 | `sesler[m1:30:a2].eylem.why_tr` | Ioana pazar günü Münih'e gidiyor ve sana geliyor musun diye soruyor. | GEÇTİ |
| 102 | `prova.title_tr` | Herr Wimmer haftanı soruyor | GEÇTİ |
| 103 | `prova.durum_tr` | Herr Wimmer gelecek haftanın planını yapıyor. Pazartesi çalışıyorsun, salı kayıt için resmî daireye gidiyorsun. Perşembe otopark kapalı. | GEÇTİ |
| 104 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Kibar ve kısa. Şefine **Herr Wimmer** diye seslendin. | GEÇTİ |
| 105 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Olur. Kısa ve kibar. | GEÇTİ |
| 106 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Şefine adıyla seslenme. **Herr Wimmer** de ve **Sie** kullan. | **GERİ** |
| 107 | `prova.dugumler[n1b].secenekler[0].geri_bildirim_tr` | Şimdi oldu. Özür diledin ve doğru hitap ettin. | GEÇTİ |
| 108 | `prova.dugumler[n1b].secenekler[1].geri_bildirim_tr` | Hâlâ adıyla seslendin. Şefine **Herr Wimmer** de. | GEÇTİ |
| 109 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Çok iyi. Günle başladın ve **arbeite** ikinci yerde kaldı. | GEÇTİ |
| 110 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Doğru. Günle de başlayabilirsin: **Am Montag arbeite ich.** | GEÇTİ |
| 111 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Günle başlarsan fiil ikinci yere gelir: **Am Montag arbeite ich.** | GEÇTİ |
| 112 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Doğru. **Am Dienstag** başta, **habe** ikinci yerde. | GEÇTİ |
| 113 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Güzel. Bir sonraki günü de söyledin. | GEÇTİ |
| 114 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Salı günü kayıt için resmî daireye gidiyorsun. Planını doğru söyle. | GEÇTİ |
| 115 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Doğru. Perşembe otopark kapalı. | GEÇTİ |
| 116 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Kısa ve açık bir cevap. | GEÇTİ |
| 117 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Perşembe iş günü. İşe nasıl geleceğini söyle. | GEÇTİ |
| 118 | `prova.kapanis_tr` | Şefine haftanı gün gün anlattın. Günle başladığında fiil ikinci yerde kaldı. | GEÇTİ |
| 119 | `okuma_yazma.title_tr` | Derya'nın haftalık planı | GEÇTİ |
| 120 | `okuma_yazma.sorular[m1:30:o1].q_tr` | Bu metin ne? | GEÇTİ |
| 121 | `okuma_yazma.sorular[m1:30:o1].opts[0]` | Derya'nın haftalık planı | GEÇTİ |
| 122 | `okuma_yazma.sorular[m1:30:o1].opts[1]` | Bir iş ilanı | GEÇTİ |
| 123 | `okuma_yazma.sorular[m1:30:o1].opts[2]` | Bir doktor mektubu | GEÇTİ |
| 124 | `okuma_yazma.sorular[m1:30:o2].q_tr` | Derya salı günü saat onda nereye gidiyor? | GEÇTİ |
| 125 | `okuma_yazma.sorular[m1:30:o2].opts[0]` | Doktora | GEÇTİ |
| 126 | `okuma_yazma.sorular[m1:30:o2].opts[1]` | Resmî daireye | GEÇTİ |
| 127 | `okuma_yazma.sorular[m1:30:o2].opts[2]` | Benzinciye | GEÇTİ |
| 128 | `okuma_yazma.sorular[m1:30:o3].q_tr` | Derya perşembe neden otobüsle gidiyor? | GEÇTİ |
| 129 | `okuma_yazma.sorular[m1:30:o3].opts[0]` | Arabası bozuk | GEÇTİ |
| 130 | `okuma_yazma.sorular[m1:30:o3].opts[1]` | Otopark kapalı | GEÇTİ |
| 131 | `okuma_yazma.sorular[m1:30:o3].opts[2]` | Hava kötü | GEÇTİ |
| 132 | `okuma_yazma.sorular[m1:30:o4].q_tr` | Derya cuma işten sonra nereye gidiyor? | GEÇTİ |
| 133 | `okuma_yazma.sorular[m1:30:o4].opts[0]` | Münih'e | GEÇTİ |
| 134 | `okuma_yazma.sorular[m1:30:o4].opts[1]` | Benzinciye | GEÇTİ |
| 135 | `okuma_yazma.sorular[m1:30:o4].opts[2]` | Kursa | GEÇTİ |
| 136 | `okuma_yazma.sorular[m1:30:o5].situation_tr` | Derya soruyor. Perşembe sen de otobüsle geliyorsun. | GEÇTİ |
| 137 | `okuma_yazma.sorular[m1:30:o5].why_tr` | **auch** de demektir: **Ich komme auch mit dem Bus.** | **GERİ** |
| 138 | `okuma_yazma.yazma.gorev_tr` | Kendi haftanı üç kısa cümleyle yaz. Her cümleye bir günle başla. | GEÇTİ |
| 139 | `okuma_yazma.yazma.kontrol_tr[0]` | Her cümle bir günle mi başlıyor? Örnek: **Am Montag**. | GEÇTİ |
| 140 | `okuma_yazma.yazma.kontrol_tr[1]` | Fiil ikinci yerde mi? **Am Montag arbeite ich.** | GEÇTİ |
| 141 | `okuma_yazma.yazma.kontrol_tr[2]` | İki parçalı fiilin küçük parçası sonda mı? **Am Freitag kaufe ich ein.** | GEÇTİ |
| 142 | `gun_sinavi.maddeler[m1:30:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 143 | `gun_sinavi.maddeler[m1:30:s1].why_tr` | **Am Dienstag** başta, **gehe** ikinci yerde. | GEÇTİ |
| 144 | `gun_sinavi.maddeler[m1:30:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 145 | `gun_sinavi.maddeler[m1:30:s2].why_tr` | Saatle başlayınca **fängt** ikinci yerde, **an** en sonda. | GEÇTİ |
| 146 | `gun_sinavi.maddeler[m1:30:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 147 | `gun_sinavi.maddeler[m1:30:s3].why_tr` | **zur Tankstelle** benzinciye demektir. | GEÇTİ |
| 148 | `gun_sinavi.maddeler[m1:30:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 149 | `gun_sinavi.maddeler[m1:30:s4].why_tr` | **mein Vorgesetzter** amirim demektir. | GEÇTİ |
| 150 | `gun_sinavi.maddeler[m1:30:s5].why_tr` | Günle başlarsan **arbeite** ikinci yerde, **ich** onun arkasında. | GEÇTİ |
| 151 | `gun_sinavi.maddeler[m1:30:s6].why_tr` | **Am Samstag** başta, **kaufe** ikinci yerde, **ein** en sonda. | GEÇTİ |
| 152 | `gun_sinavi.maddeler[m1:30:s7].why_tr` | **fülle** ikinci yerde, **aus** en sonda. | GEÇTİ |
| 153 | `gun_sinavi.maddeler[m1:30:s8].why_tr` | **Morgen** başta, **rufe** ikinci yerde, **an** en sonda. | GEÇTİ |
| 154 | `gun_sinavi.maddeler[m1:30:s9].situation_tr` | Tobi soruyor. Sen de pazar günü Münih'e gidiyorsun. | GEÇTİ |
| 155 | `gun_sinavi.maddeler[m1:30:s9].why_tr` | **Am Sonntag** başta, **fahre** ikinci yerde. | GEÇTİ |
| 156 | `gun_sinavi.maddeler[m1:30:s10].situation_tr` | Herr Wimmer soruyor. Çarşamba yedide başlıyorsun. | GEÇTİ |
| 157 | `gun_sinavi.maddeler[m1:30:s10].why_tr` | **Am Mittwoch** başta, **fange** ikinci yerde, **an** en sonda. | GEÇTİ |
| 158 | `gun_sinavi.maddeler[m1:30:s11].situation_tr` | Herr Wimmer haftanı soruyor. Pazartesi çalışıyorsun, salı resmî daireye gidiyorsun, cuma alışveriş yapıyorsun. | GEÇTİ |
| 159 | `gun_sinavi.maddeler[m1:30:s11].why_tr` | Her güne yeni bir cümleyle başla. Fiil hep ikinci yerde. | GEÇTİ |

### `content/v2/m1/gun-31.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `title_tr` | Meslek sormak: Was sind Sie von Beruf? | GEÇTİ |
| 2 | `goal_tr` | Birine mesleğini sorarsın, nerede çalıştığını söylersin. Garda bilet ve kalkış saatini sorarsın. | **GERİ** |
| 3 | `can_do.tr` | Birine mesleğini sorar, kendi işimi söylerim. | GEÇTİ |
| 4 | `halkalar[m1:31:h1].title_tr` | Vardiya planı geldi | GEÇTİ |
| 5 | `halkalar[m1:31:h1].sahne.ortam_tr` | Çarşamba sabahı, firmanın panosu. Tobi yeni vardiya planına bakıyor. | GEÇTİ |
| 6 | `halkalar[m1:31:h1].sahne.soru.q_tr` | Vardiya planına göre sen hangi gün izinlisin? | GEÇTİ |
| 7 | `halkalar[m1:31:h1].sahne.soru.opts[0]` | Pazartesi | GEÇTİ |
| 8 | `halkalar[m1:31:h1].sahne.soru.opts[1]` | Salı | GEÇTİ |
| 9 | `halkalar[m1:31:h1].sahne.soru.opts[2]` | Cumartesi | GEÇTİ |
| 10 | `halkalar[m1:31:h2].title_tr` | Mesleğin ne? | GEÇTİ |
| 11 | `halkalar[m1:31:h2].sahne.ortam_tr` | Kantinde öğle yemeği. Derya'yla ailelerinizi konuşuyorsunuz. | GEÇTİ |
| 12 | `halkalar[m1:31:h2].sahne.soru.q_tr` | Derya'nın kız kardeşi ne iş yapıyor? | GEÇTİ |
| 13 | `halkalar[m1:31:h2].sahne.soru.opts[0]` | Hemşire | GEÇTİ |
| 14 | `halkalar[m1:31:h2].sahne.soru.opts[1]` | Aşçı | GEÇTİ |
| 15 | `halkalar[m1:31:h2].sahne.soru.opts[2]` | Doktor | GEÇTİ |
| 16 | `halkalar[m1:31:h2].sahne.soru.opts[3]` | Polis | GEÇTİ |
| 17 | `halkalar[m1:31:h3].title_tr` | Garda: pazar için bilet | GEÇTİ |
| 18 | `halkalar[m1:31:h3].sahne.ortam_tr` | İş çıkışı, Wendlfing garı. Ioana'yla pazar günkü Münih yolculuğu için tarifeye bakıyorsunuz. | GEÇTİ |
| 19 | `halkalar[m1:31:h3].sahne.soru.q_tr` | Pazar günü tren kaçta kalkıyor? | GEÇTİ |
| 20 | `halkalar[m1:31:h3].sahne.soru.opts[0]` | Sekizde | GEÇTİ |
| 21 | `halkalar[m1:31:h3].sahne.soru.opts[1]` | Dokuzda | GEÇTİ |
| 22 | `halkalar[m1:31:h3].sahne.soru.opts[2]` | Onda | GEÇTİ |
| 23 | `sahne.title_tr` | Kantinde yeni iş arkadaşı | GEÇTİ |
| 24 | `sahne.sahneler[s1].sahne_tr` | Firmanın kantini, öğle arası. Derya yanında yeni bir kadınla masaya geliyor. | GEÇTİ |
| 25 | `sahne.sahneler[s2].sahne_tr` | Yeni iş arkadaşı gülümseyip el sallıyor. | GEÇTİ |
| 26 | `sahne.sahneler[s3].sahne_tr` | Tobi hemen ayağa kalkıp elini uzatıyor. | GEÇTİ |
| 27 | `sahne.sahneler[s4].sahne_tr` | Tobi yeniden oturuyor, merakla bakıyor. | GEÇTİ |
| 28 | `sahne.sahneler[s5].sahne_tr` | Yeni iş arkadaşı tepsisini masaya koyuyor. | GEÇTİ |
| 29 | `sahne.sahneler[s6].sahne_tr` | Tobi Derya'yı gösteriyor. | GEÇTİ |
| 30 | `sahne.sahneler[s7].sahne_tr` | Derya başını sallıyor. | GEÇTİ |
| 31 | `sahne.sahneler[s8].sahne_tr` | Yeni iş arkadaşı Tobi'ye dönüyor. | GEÇTİ |
| 32 | `sahne.sahneler[s9].sahne_tr` | Tobi göğsünü kabartıyor, ciddi bir yüz takınıyor. | GEÇTİ |
| 33 | `sahne.sahneler[s10].sahne_tr` | Derya gözlerini deviriyor, gülüyor. | GEÇTİ |
| 34 | `sahne.sahneler[s11].sahne_tr` | Tobi omuz silkip sırıtıyor. | GEÇTİ |
| 35 | `sahne.sahneler[s12].sahne_tr` | Yeni iş arkadaşı etrafa bakıyor. | GEÇTİ |
| 36 | `sahne.sahneler[s13].sahne_tr` | O sırada Herr Wimmer elinde kahveyle hızla geçiyor. | GEÇTİ |
| 37 | `sahne.bolumler[b1].ana_fikir.q_tr` | Sahnede ne oluyor? | GEÇTİ |
| 38 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Derya yeni bir iş arkadaşını tanıştırıyor | GEÇTİ |
| 39 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Tobi işten ayrılıyor | GEÇTİ |
| 40 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Herr Wimmer toplantı yapıyor | GEÇTİ |
| 41 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Yeni iş arkadaşının mesleği ne? | GEÇTİ |
| 42 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | Satış elemanı | GEÇTİ |
| 43 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | Teknisyen | GEÇTİ |
| 44 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | Doktor | GEÇTİ |
| 45 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Yeni iş arkadaşı ne zaman işe başlıyor? | GEÇTİ |
| 46 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | Bugün | GEÇTİ |
| 47 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | Cuma | GEÇTİ |
| 48 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | Pazartesi | GEÇTİ |
| 49 | `sahne.bolumler[b1].ayrinti[2].q_tr` | Tobi aslında ne iş yapıyor? | GEÇTİ |
| 50 | `sahne.bolumler[b1].ayrinti[2].opts[0]` | Satış elemanı | GEÇTİ |
| 51 | `sahne.bolumler[b1].ayrinti[2].opts[1]` | Şef | GEÇTİ |
| 52 | `sahne.bolumler[b1].ayrinti[2].opts[2]` | Teknisyen | GEÇTİ |
| 53 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 54 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Sahnede ne olduğunu Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 55 | `sahne.bolumler[b1].cevapla.situation_tr` | Yeni iş arkadaşı sana da soruyor. Sen de burada, firmada çalışıyorsun. | GEÇTİ |
| 56 | `sahne.bolumler[b1].cevapla.why_tr` | Nerede çalıştığını **Ich arbeite hier in der Firma** diye söylersin. | GEÇTİ |
| 57 | `sesler[m1:31:a1].title_tr` | Yerel radyo: Mesleğiniz ne? | GEÇTİ |
| 58 | `sesler[m1:31:a1].ortam_tr` | Sabah kahvaltıda yerel radyo açık. Muhabir sokakta insanlara mesleklerini soruyor. | GEÇTİ |
| 59 | `sesler[m1:31:a1].bolumler[b1].ana_fikir.q_tr` | Radyo insanlara ne soruyor? | GEÇTİ |
| 60 | `sesler[m1:31:a1].bolumler[b1].ana_fikir.opts[0]` | Yaşlarını | GEÇTİ |
| 61 | `sesler[m1:31:a1].bolumler[b1].ana_fikir.opts[1]` | Mesleklerini | GEÇTİ |
| 62 | `sesler[m1:31:a1].bolumler[b1].ana_fikir.opts[2]` | Nerede oturduklarını | GEÇTİ |
| 63 | `sesler[m1:31:a1].bolumler[b1].ayrinti[0].q_tr` | Gece kim çalışıyor? | GEÇTİ |
| 64 | `sesler[m1:31:a1].bolumler[b1].ayrinti[0].opts[0]` | Hemşire | GEÇTİ |
| 65 | `sesler[m1:31:a1].bolumler[b1].ayrinti[0].opts[1]` | Otobüs şoförü | GEÇTİ |
| 66 | `sesler[m1:31:a1].bolumler[b1].ayrinti[0].opts[2]` | Satış elemanı | GEÇTİ |
| 67 | `sesler[m1:31:a1].bolumler[b1].ayrinti[1].q_tr` | Satış elemanı nerede çalışıyor? | GEÇTİ |
| 68 | `sesler[m1:31:a1].bolumler[b1].ayrinti[1].opts[0]` | Fırında | GEÇTİ |
| 69 | `sesler[m1:31:a1].bolumler[b1].ayrinti[1].opts[1]` | Garda | GEÇTİ |
| 70 | `sesler[m1:31:a1].bolumler[b1].ayrinti[1].opts[2]` | Süpermarkette | GEÇTİ |
| 71 | `sesler[m1:31:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 72 | `sesler[m1:31:a1].bolumler[b1].dikte[d5].gorev_tr` | Radyoda kimlerin konuştuğunu Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 73 | `sesler[m1:31:a1].bolumler[b1].cevapla.situation_tr` | Muhabir sana da soruyor. Bir firmada çalıştığını söyle. | GEÇTİ |
| 74 | `sesler[m1:31:a1].bolumler[b1].cevapla.why_tr` | Mesleğini söylemek istemezsen nerede çalıştığını söyle: **Ich arbeite in einer Firma.** | GEÇTİ |
| 75 | `sesler[m1:31:a1].eylem.q_tr` | Gara gitmek istiyorsun. Radyodaki şoförün sözüne göre ne yapabilirsin? | GEÇTİ |
| 76 | `sesler[m1:31:a1].eylem.opts[0]` | Otobüse bin. | GEÇTİ |
| 77 | `sesler[m1:31:a1].eylem.opts[1]` | Süpermarkete git. | GEÇTİ |
| 78 | `sesler[m1:31:a1].eylem.opts[2]` | Gece hemşireyi ara. | GEÇTİ |
| 79 | `sesler[m1:31:a1].eylem.why_tr` | Otobüs şoförü otobüsüyle gara gittiğini söylüyor. | GEÇTİ |
| 80 | `sesler[m1:31:a2].title_tr` | Garda hoparlör duyurusu | GEÇTİ |
| 81 | `sesler[m1:31:a2].ortam_tr` | Pazar sabahı, Wendlfing garı. Münih'e gideceksin. Hoparlörden bir duyuru geliyor. | GEÇTİ |
| 82 | `sesler[m1:31:a2].bolumler[b1].ana_fikir.q_tr` | Duyuru ne diyor? | GEÇTİ |
| 83 | `sesler[m1:31:a2].bolumler[b1].ana_fikir.opts[0]` | Saat sekizdeki Münih treni bugün yok | GEÇTİ |
| 84 | `sesler[m1:31:a2].bolumler[b1].ana_fikir.opts[1]` | Tren beş dakika gecikiyor | GEÇTİ |
| 85 | `sesler[m1:31:a2].bolumler[b1].ana_fikir.opts[2]` | Peron değişti | GEÇTİ |
| 86 | `sesler[m1:31:a2].bolumler[b1].ayrinti[0].q_tr` | Münih'e bir sonraki kalkış saat kaçta? | GEÇTİ |
| 87 | `sesler[m1:31:a2].bolumler[b1].ayrinti[0].opts[0]` | sekizde | GEÇTİ |
| 88 | `sesler[m1:31:a2].bolumler[b1].ayrinti[0].opts[1]` | dokuzda | GEÇTİ |
| 89 | `sesler[m1:31:a2].bolumler[b1].ayrinti[0].opts[2]` | onda | GEÇTİ |
| 90 | `sesler[m1:31:a2].bolumler[b1].ayrinti[1].q_tr` | Tren hangi perondan kalkacaktı? | GEÇTİ |
| 91 | `sesler[m1:31:a2].bolumler[b1].ayrinti[1].opts[0]` | birden | GEÇTİ |
| 92 | `sesler[m1:31:a2].bolumler[b1].ayrinti[1].opts[1]` | ikiden | GEÇTİ |
| 93 | `sesler[m1:31:a2].bolumler[b1].ayrinti[1].opts[2]` | üçten | GEÇTİ |
| 94 | `sesler[m1:31:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 95 | `sesler[m1:31:a2].bolumler[b1].dikte[d5].gorev_tr` | Duyuruda ne dendiğini Almanca iki kısa cümleyle özetle. | GEÇTİ |
| 96 | `sesler[m1:31:a2].bolumler[b1].cevapla.situation_tr` | Ioana telefonda nerede kaldığını soruyor. Tren iptal, otobüse biniyorsun. | GEÇTİ |
| 97 | `sesler[m1:31:a2].bolumler[b1].cevapla.why_tr` | Önce sorunu söyle: **Zugausfall**. Sonra çözümü: **Ich komme mit dem Bus.** | GEÇTİ |
| 98 | `sesler[m1:31:a2].eylem.q_tr` | Münih'e gitmek istiyorsun. Ne yapabilirsin? | GEÇTİ |
| 99 | `sesler[m1:31:a2].eylem.opts[0]` | Garın önündeki otobüse bin ya da dokuzdaki kalkışı bekle. | GEÇTİ |
| 100 | `sesler[m1:31:a2].eylem.opts[1]` | Saat sekizde peronda bekle. | GEÇTİ |
| 101 | `sesler[m1:31:a2].eylem.opts[2]` | Eve dön, yarın gel. | GEÇTİ |
| 102 | `sesler[m1:31:a2].eylem.why_tr` | Sekiz treni iptal. Garın önünde otobüs var, dokuzda da yeni bir kalkış var. | GEÇTİ |
| 103 | `prova.title_tr` | Kursta meslek oyunu | GEÇTİ |
| 104 | `prova.durum_tr` | Akşam kursu. Ioana'yla meslek oyunu oynuyorsunuz. Ioana bugün polis, sen bugün doktorsun. Önce sen soruyorsun. | GEÇTİ |
| 105 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Çok iyi. Oyunda **Sie** kullandın ve **von Beruf** dedin. | GEÇTİ |
| 106 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Olur. Arkadaşına **du** ile de sorabilirsin. | GEÇTİ |
| 107 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Bu soru kaba duyulabilir. Mesleği sorarken **von Beruf** ekle: **Was sind Sie von Beruf?** | GEÇTİ |
| 108 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Doğru. Meslekten önce **ein** ya da **eine** yok. | GEÇTİ |
| 109 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Harika. Mesleğini ve nerede çalıştığını söyledin. | GEÇTİ |
| 110 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Meslekten önce **ein** ya da **eine** koymazsın. | GEÇTİ |
| 111 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Çok iyi. Yeri açıkça söyledin. | GEÇTİ |
| 112 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Kısa ve doğru bir cevap. | GEÇTİ |
| 113 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Ioana nerede çalıştığını soruyor, günü değil. **in der Praxis** de. | GEÇTİ |
| 114 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Güzel. Nerede ve kimlerle çalıştığını söyledin. | GEÇTİ |
| 115 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Doğru. Nerede çalıştığını açıkça söyledin. | GEÇTİ |
| 116 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Cümle eksik kaldı. **Ich arbeite in einer Firma.** de ya da mesleğini söyle. | GEÇTİ |
| 117 | `prova.kapanis_tr` | Mesleği sordun, oyundaki mesleğini ve gerçek işini söyledin. Meslekten önce **ein** koymadın. | GEÇTİ |
| 118 | `okuma_yazma.title_tr` | Panoda duyuru: firmada yeni | GEÇTİ |
| 119 | `okuma_yazma.sorular[m1:31:o1].q_tr` | Duyuru ne hakkında? | GEÇTİ |
| 120 | `okuma_yazma.sorular[m1:31:o1].opts[0]` | Yeni maaşlar | GEÇTİ |
| 121 | `okuma_yazma.sorular[m1:31:o1].opts[1]` | Firmaya yeni gelen çalışanlar | GEÇTİ |
| 122 | `okuma_yazma.sorular[m1:31:o1].opts[2]` | Tren iptalleri | GEÇTİ |
| 123 | `okuma_yazma.sorular[m1:31:o2].q_tr` | Teknisyen ne zaman başlıyor? | GEÇTİ |
| 124 | `okuma_yazma.sorular[m1:31:o2].opts[0]` | Pazartesi | GEÇTİ |
| 125 | `okuma_yazma.sorular[m1:31:o2].opts[1]` | Çarşamba | GEÇTİ |
| 126 | `okuma_yazma.sorular[m1:31:o2].opts[2]` | Cuma | GEÇTİ |
| 127 | `okuma_yazma.sorular[m1:31:o3].q_tr` | Teknisyen nereli? | GEÇTİ |
| 128 | `okuma_yazma.sorular[m1:31:o3].opts[0]` | Wendlfing | GEÇTİ |
| 129 | `okuma_yazma.sorular[m1:31:o3].opts[1]` | Münih | GEÇTİ |
| 130 | `okuma_yazma.sorular[m1:31:o3].opts[2]` | Duyuruda yazmıyor | GEÇTİ |
| 131 | `okuma_yazma.sorular[m1:31:o4].q_tr` | Vardiya planı nerede? | GEÇTİ |
| 132 | `okuma_yazma.sorular[m1:31:o4].opts[0]` | Kantinde | GEÇTİ |
| 133 | `okuma_yazma.sorular[m1:31:o4].opts[1]` | Ofiste | GEÇTİ |
| 134 | `okuma_yazma.sorular[m1:31:o4].opts[2]` | Panoda | GEÇTİ |
| 135 | `okuma_yazma.sorular[m1:31:o5].situation_tr` | Tobi soruyor. Duyuruya göre aşçı çarşambadan itibaren var. | GEÇTİ |
| 136 | `okuma_yazma.sorular[m1:31:o5].why_tr` | Duyuruda **Ab Mittwoch** yazıyor: çarşambadan itibaren. | GEÇTİ |
| 137 | `gun_sinavi.maddeler[m1:31:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 138 | `gun_sinavi.maddeler[m1:31:s1].why_tr` | Meslekten önce **eine** gelmez. | GEÇTİ |
| 139 | `gun_sinavi.maddeler[m1:31:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 140 | `gun_sinavi.maddeler[m1:31:s2].why_tr` | **Abfahrt** kalkış demektir. | GEÇTİ |
| 141 | `gun_sinavi.maddeler[m1:31:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 142 | `gun_sinavi.maddeler[m1:31:s3].why_tr` | **Am Freitag** başta, **kommt** ikinci yerde. | GEÇTİ |
| 143 | `gun_sinavi.maddeler[m1:31:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 144 | `gun_sinavi.maddeler[m1:31:s4].why_tr` | **Verkäufer** satış elemanı demektir. | GEÇTİ |
| 145 | `gun_sinavi.maddeler[m1:31:s5].why_tr` | Mesleği kibarca sorarken **Was sind Sie von Beruf?** dersin. | GEÇTİ |
| 146 | `gun_sinavi.maddeler[m1:31:s6].why_tr` | Kadın doktor **Ärztin** olur. Önüne **eine** gelmez. | GEÇTİ |
| 147 | `gun_sinavi.maddeler[m1:31:s7].why_tr` | Bilet alırken **Einmal nach München, bitte** dersin. | GEÇTİ |
| 148 | `gun_sinavi.maddeler[m1:31:s8].why_tr` | **als** olarak demektir: **arbeitet als Koch**. | GEÇTİ |
| 149 | `gun_sinavi.maddeler[m1:31:s9].situation_tr` | Tobi, Derya'nın kız kardeşini soruyor. Kız kardeşi hemşire ve gece çalışıyor. | GEÇTİ |
| 150 | `gun_sinavi.maddeler[m1:31:s9].why_tr` | Kadın hemşire **Krankenpflegerin** olur. | GEÇTİ |
| 151 | `gun_sinavi.maddeler[m1:31:s10].situation_tr` | Garda biri soruyor. Münih treni dokuzda kalkıyor. | GEÇTİ |
| 152 | `gun_sinavi.maddeler[m1:31:s10].why_tr` | Saati **um** ile söylersin: **um neun Uhr**. | GEÇTİ |
| 153 | `gun_sinavi.maddeler[m1:31:s11].situation_tr` | Kantinde yeni biri kendini tanıtıyor. Memnun olduğunu söyle, mesleğini sor, sen de firmada çalıştığını söyle. | GEÇTİ |
| 154 | `gun_sinavi.maddeler[m1:31:s11].why_tr` | Önce **Freut mich!** de. Sonra **Was sind Sie von Beruf?** diye sor. | GEÇTİ |

### `content/v2/m1/gun-32.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `title_tr` | Sevdiğini söylemek: gern, lieber | GEÇTİ |
| 2 | `goal_tr` | Kantinde neyi sevdiğini, neyi sevmediğini ve neyi daha çok sevdiğini söylersin. | GEÇTİ |
| 3 | `can_do.tr` | Neyi sevdiğimi, neyi daha çok sevdiğimi söylerim. | GEÇTİ |
| 4 | `halkalar[m1:32:h1].title_tr` | Öğlen ne içiyorsun? | GEÇTİ |
| 5 | `halkalar[m1:32:h1].sahne.ortam_tr` | Kantin, öğlen. Tobi tepsisiyle yanına oturuyor. | GEÇTİ |
| 6 | `halkalar[m1:32:h1].sahne.soru.q_tr` | Tobi neden seviniyor? | GEÇTİ |
| 7 | `halkalar[m1:32:h1].sahne.soru.opts[0]` | Ona daha çok sosis kalıyor | GEÇTİ |
| 8 | `halkalar[m1:32:h1].sahne.soru.opts[1]` | Sebzeyi çok seviyor | GEÇTİ |
| 9 | `halkalar[m1:32:h1].sahne.soru.opts[2]` | Bugün iş erken bitiyor | GEÇTİ |
| 10 | `halkalar[m1:32:h1].sahne.soru.opts[3]` | Kantin bugün kapalı | GEÇTİ |
| 11 | `halkalar[m1:32:h2].title_tr` | Molada sohbet | GEÇTİ |
| 12 | `halkalar[m1:32:h2].sahne.ortam_tr` | Mola, koridor. Derya telefonundaki bir fotoğrafı gösteriyor. | GEÇTİ |
| 13 | `halkalar[m1:32:h2].sahne.soru.q_tr` | Bebek kaç haftalık? | GEÇTİ |
| 14 | `halkalar[m1:32:h2].sahne.soru.opts[0]` | Üç | GEÇTİ |
| 15 | `halkalar[m1:32:h2].sahne.soru.opts[1]` | İki | GEÇTİ |
| 16 | `halkalar[m1:32:h2].sahne.soru.opts[2]` | Sekiz | GEÇTİ |
| 17 | `halkalar[m1:32:h2].sahne.soru.opts[3]` | On üç | GEÇTİ |
| 18 | `halkalar[m1:32:h3].title_tr` | Teşekkür ve yardım | GEÇTİ |
| 19 | `halkalar[m1:32:h3].sahne.ortam_tr` | Öğleden sonra, Herr Wimmer'in odasının kapısı. | GEÇTİ |
| 20 | `halkalar[m1:32:h3].sahne.soru.q_tr` | Herr Wimmer ne istiyor? | GEÇTİ |
| 21 | `halkalar[m1:32:h3].sahne.soru.opts[0]` | Yardım | GEÇTİ |
| 22 | `halkalar[m1:32:h3].sahne.soru.opts[1]` | Bir randevu | GEÇTİ |
| 23 | `halkalar[m1:32:h3].sahne.soru.opts[2]` | Bir şey içmek | GEÇTİ |
| 24 | `halkalar[m1:32:h3].sahne.soru.opts[3]` | Erken çıkmak | GEÇTİ |
| 25 | `sahne.title_tr` | Öğle yemeği: kim ne sever? | GEÇTİ |
| 26 | `sahne.sahneler[s1].sahne_tr` | Derya kantinin kapısında durup Tobi'ye el sallıyor. | GEÇTİ |
| 27 | `sahne.sahneler[s2].sahne_tr` | Tobi koşarak geliyor, tezgâhtaki sosisleri gösteriyor. | GEÇTİ |
| 28 | `sahne.sahneler[s3].sahne_tr` | Derya kaşlarını kaldırıyor. | GEÇTİ |
| 29 | `sahne.sahneler[s4].sahne_tr` | Tobi yüzünü buruşturuyor. | GEÇTİ |
| 30 | `sahne.sahneler[s5].sahne_tr` | Derya tezgâhtaki aşçı kadına dönüyor. | GEÇTİ |
| 31 | `sahne.sahneler[s6].sahne_tr` | Aşçı kadın tabağı uzatıyor. | GEÇTİ |
| 32 | `sahne.sahneler[s7].sahne_tr` | Derya başını sallıyor. | GEÇTİ |
| 33 | `sahne.sahneler[s8].sahne_tr` | Tobi tepsisini alıp boş bir masaya bakıyor. | GEÇTİ |
| 34 | `sahne.sahneler[s9].sahne_tr` | Derya oturuyor, çatalını alıyor. | GEÇTİ |
| 35 | `sahne.sahneler[s10].sahne_tr` | Derya tezgâhı gösteriyor, orada tek bir sosis kalmış. | GEÇTİ |
| 36 | `sahne.sahneler[s11].sahne_tr` | Tobi sevinçle sosisi kendi tabağına alıyor. | GEÇTİ |
| 37 | `sahne.sahneler[s12].sahne_tr` | Derya gülüyor, sebzesini yiyor. | GEÇTİ |
| 38 | `sahne.bolumler[b1].ana_fikir.q_tr` | Bu sahne ne hakkında? | GEÇTİ |
| 39 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Kimin neyi severek yediği | GEÇTİ |
| 40 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Kimin kaçta kalktığı | GEÇTİ |
| 41 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Otobüsün nereden kalktığı | GEÇTİ |
| 42 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Derya neyi daha çok seviyor? | GEÇTİ |
| 43 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | sebzeyi | GEÇTİ |
| 44 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | sosisi | GEÇTİ |
| 45 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | eti | GEÇTİ |
| 46 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Herr Wimmer bugün nerede? | GEÇTİ |
| 47 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | doktorda | GEÇTİ |
| 48 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | kantinde | GEÇTİ |
| 49 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | evde | GEÇTİ |
| 50 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 51 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Sahnede kim neyi seviyor? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 52 | `sahne.bolumler[b1].cevapla.situation_tr` | Derya sana da soruyor. Sosis mi sebze mi? Hangisini daha çok seviyorsan söyle. | GEÇTİ |
| 53 | `sahne.bolumler[b1].cevapla.why_tr` | Daha çok sevdiğin şey için **lieber** kullan. **Ich esse lieber Gemüse.** | GEÇTİ |
| 54 | `sesler[m1:32:a1].title_tr` | Kantinin öğle anonsu | GEÇTİ |
| 55 | `sesler[m1:32:a1].ortam_tr` | İş yerinde hoparlörden kantin anonsu geliyor. | GEÇTİ |
| 56 | `sesler[m1:32:a1].bolumler[b1].ana_fikir.q_tr` | Bu anons ne söylüyor? | GEÇTİ |
| 57 | `sesler[m1:32:a1].bolumler[b1].ana_fikir.opts[0]` | Bugün kantinde ne yemek olduğunu | GEÇTİ |
| 58 | `sesler[m1:32:a1].bolumler[b1].ana_fikir.opts[1]` | Toplantının kaçta olduğunu | GEÇTİ |
| 59 | `sesler[m1:32:a1].bolumler[b1].ana_fikir.opts[2]` | Kantinin kapalı olduğunu | GEÇTİ |
| 60 | `sesler[m1:32:a1].bolumler[b1].ayrinti[0].q_tr` | Sosisin yanında ne var? | GEÇTİ |
| 61 | `sesler[m1:32:a1].bolumler[b1].ayrinti[0].opts[0]` | hardal ve ekmek | GEÇTİ |
| 62 | `sesler[m1:32:a1].bolumler[b1].ayrinti[0].opts[1]` | peynir | GEÇTİ |
| 63 | `sesler[m1:32:a1].bolumler[b1].ayrinti[0].opts[2]` | sebze | GEÇTİ |
| 64 | `sesler[m1:32:a1].bolumler[b1].ayrinti[1].q_tr` | Yemek saat kaçta bitiyor? | GEÇTİ |
| 65 | `sesler[m1:32:a1].bolumler[b1].ayrinti[1].opts[0]` | on iki buçukta | GEÇTİ |
| 66 | `sesler[m1:32:a1].bolumler[b1].ayrinti[1].opts[1]` | birde | GEÇTİ |
| 67 | `sesler[m1:32:a1].bolumler[b1].ayrinti[1].opts[2]` | on ikide | GEÇTİ |
| 68 | `sesler[m1:32:a1].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 69 | `sesler[m1:32:a1].bolumler[b1].dikte[d5].gorev_tr` | Bugün kantinde ne var? Almanca bir iki kısa cümleyle söyle. | GEÇTİ |
| 70 | `sesler[m1:32:a1].bolumler[b1].cevapla.situation_tr` | Tobi anonsu duymadı, sana soruyor. Bugün sosis var. | GEÇTİ |
| 71 | `sesler[m1:32:a1].bolumler[b1].cevapla.why_tr` | Soruda **Was gibt es** var. Cevapta **Heute gibt es** de, sonra yemeği söyle. | GEÇTİ |
| 72 | `sesler[m1:32:a1].eylem.q_tr` | Sosis yemek istiyorsun. Ne yapmalısın? | GEÇTİ |
| 73 | `sesler[m1:32:a1].eylem.opts[0]` | Saat yarımdan önce kantine git. | GEÇTİ |
| 74 | `sesler[m1:32:a1].eylem.opts[1]` | Akşam kantine git. | GEÇTİ |
| 75 | `sesler[m1:32:a1].eylem.opts[2]` | Yarın kantine git. | GEÇTİ |
| 76 | `sesler[m1:32:a1].eylem.why_tr` | Saat yarımda her şey bitiyor. Erken gitmelisin. | GEÇTİ |
| 77 | `sesler[m1:32:a2].title_tr` | Tobi'den sesli mesaj | GEÇTİ |
| 78 | `sesler[m1:32:a2].ortam_tr` | Sabah telefonuna Tobi'den bir mesaj geliyor. | GEÇTİ |
| 79 | `sesler[m1:32:a2].bolumler[b1].ana_fikir.q_tr` | Tobi neden arıyor? | GEÇTİ |
| 80 | `sesler[m1:32:a2].bolumler[b1].ana_fikir.opts[0]` | Senden bir şey rica ediyor | GEÇTİ |
| 81 | `sesler[m1:32:a2].bolumler[b1].ana_fikir.opts[1]` | Seni yemeğe davet ediyor | GEÇTİ |
| 82 | `sesler[m1:32:a2].bolumler[b1].ana_fikir.opts[2]` | İşe gelmeyeceğini söylüyor | GEÇTİ |
| 83 | `sesler[m1:32:a2].bolumler[b1].ayrinti[0].q_tr` | Tobi şimdi nerede? | GEÇTİ |
| 84 | `sesler[m1:32:a2].bolumler[b1].ayrinti[0].opts[0]` | doktorda | GEÇTİ |
| 85 | `sesler[m1:32:a2].bolumler[b1].ayrinti[0].opts[1]` | kantinde | GEÇTİ |
| 86 | `sesler[m1:32:a2].bolumler[b1].ayrinti[0].opts[2]` | evde | GEÇTİ |
| 87 | `sesler[m1:32:a2].bolumler[b1].ayrinti[1].q_tr` | Tobi saat kaçta geri geliyor? | GEÇTİ |
| 88 | `sesler[m1:32:a2].bolumler[b1].ayrinti[1].opts[0]` | on ikide | GEÇTİ |
| 89 | `sesler[m1:32:a2].bolumler[b1].ayrinti[1].opts[1]` | birde | GEÇTİ |
| 90 | `sesler[m1:32:a2].bolumler[b1].ayrinti[1].opts[2]` | üçte | GEÇTİ |
| 91 | `sesler[m1:32:a2].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 92 | `sesler[m1:32:a2].bolumler[b1].dikte[d5].gorev_tr` | Tobi ne istiyor? Almanca bir iki kısa cümleyle söyle. | GEÇTİ |
| 93 | `sesler[m1:32:a2].bolumler[b1].cevapla.situation_tr` | Tobi'ye cevap ver. Sosisi alıyorsun. | GEÇTİ |
| 94 | `sesler[m1:32:a2].bolumler[b1].cevapla.why_tr` | Kısa ve sıcak bir cevap yeter. **Ja, klar!** ya da **Ja, gern!** de. | GEÇTİ |
| 95 | `sesler[m1:32:a2].eylem.q_tr` | Tobi'ye yardım etmek istiyorsun. Ne yapmalısın? | GEÇTİ |
| 96 | `sesler[m1:32:a2].eylem.opts[0]` | Kantinden onun için bir sosis al. | GEÇTİ |
| 97 | `sesler[m1:32:a2].eylem.opts[1]` | Onu doktora götür. | GEÇTİ |
| 98 | `sesler[m1:32:a2].eylem.opts[2]` | Saat on ikide onu ara. | GEÇTİ |
| 99 | `sesler[m1:32:a2].eylem.why_tr` | Tobi doktorda. Senden bir sosis almanı istiyor. | GEÇTİ |
| 100 | `prova.title_tr` | Kantinde Tobi ile | GEÇTİ |
| 101 | `prova.durum_tr` | Öğle arası. Tobi tepsisiyle yanına oturuyor ve ne sevdiğini soruyor. | GEÇTİ |
| 102 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Açık bir cevap. Zamanla başlarsan **Heute esse ich** dersin. | GEÇTİ |
| 103 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Güzel. **gern** fiilden sonra gelir. | GEÇTİ |
| 104 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Tobi içeceği değil, yemeği soruyor. **Ich esse** ile cevap ver. | GEÇTİ |
| 105 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Kısa ve doğal. **sehr gern** çok severim demek. | GEÇTİ |
| 106 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Çok iyi. **lieber** ile daha çok sevdiğini söyledin. | GEÇTİ |
| 107 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Tek başına **Nein!** sert duyulur. **Nein, nicht so gern.** de. | GEÇTİ |
| 108 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Samimi ve kısa. Molada çok duyulur. | GEÇTİ |
| 109 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Kısa bir istek. **bitte** kibar yapar. | GEÇTİ |
| 110 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Tobi ne içeceğini soruyor. Bir içecek söyle ya da **egal** de. | GEÇTİ |
| 111 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Teşekkür ettin ve nazik olduğunu söyledin. Tam yerinde. | GEÇTİ |
| 112 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Kısa ve sıcak. | GEÇTİ |
| 113 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Tek kelime emir gibi duyulur. **Senf, bitte.** ya da **Nein, danke.** de. | GEÇTİ |
| 114 | `prova.kapanis_tr` | Neyi sevdiğini, neyi daha çok sevdiğini söyledin ve teşekkür ettin. | GEÇTİ |
| 115 | `okuma_yazma.title_tr` | Kantinin bu haftaki listesi | GEÇTİ |
| 116 | `okuma_yazma.sorular[m1:32:o1].q_tr` | Bu metin ne? | GEÇTİ |
| 117 | `okuma_yazma.sorular[m1:32:o1].opts[0]` | Kantinin haftalık yemek listesi | GEÇTİ |
| 118 | `okuma_yazma.sorular[m1:32:o1].opts[1]` | Bir davet mesajı | GEÇTİ |
| 119 | `okuma_yazma.sorular[m1:32:o1].opts[2]` | Otobüs saatleri | GEÇTİ |
| 120 | `okuma_yazma.sorular[m1:32:o2].q_tr` | Derya et yemeyi sevmiyor. Hangi gün ona uygun? | GEÇTİ |
| 121 | `okuma_yazma.sorular[m1:32:o2].opts[0]` | çarşamba | GEÇTİ |
| 122 | `okuma_yazma.sorular[m1:32:o2].opts[1]` | salı | GEÇTİ |
| 123 | `okuma_yazma.sorular[m1:32:o2].opts[2]` | pazartesi | GEÇTİ |
| 124 | `okuma_yazma.sorular[m1:32:o3].q_tr` | Tobi'nin sevdiği sosis hangi gün var? | GEÇTİ |
| 125 | `okuma_yazma.sorular[m1:32:o3].opts[0]` | pazartesi | GEÇTİ |
| 126 | `okuma_yazma.sorular[m1:32:o3].opts[1]` | cuma | GEÇTİ |
| 127 | `okuma_yazma.sorular[m1:32:o3].opts[2]` | salı | GEÇTİ |
| 128 | `okuma_yazma.sorular[m1:32:o4].q_tr` | Salı günü kantinde ne var? | GEÇTİ |
| 129 | `okuma_yazma.sorular[m1:32:o4].opts[0]` | sebzeli et | GEÇTİ |
| 130 | `okuma_yazma.sorular[m1:32:o4].opts[1]` | peynirli sebze | GEÇTİ |
| 131 | `okuma_yazma.sorular[m1:32:o4].opts[2]` | elmalı kek | GEÇTİ |
| 132 | `okuma_yazma.sorular[m1:32:o5].situation_tr` | Derya soruyor. Sebzeyi daha çok seviyorsun. | GEÇTİ |
| 133 | `okuma_yazma.sorular[m1:32:o5].why_tr` | Daha çok sevdiğin şeyi **lieber** ile söyle. | GEÇTİ |
| 134 | `okuma_yazma.yazma.gorev_tr` | Derya'ya kısa bir mesaj yaz. Neyi severek yersin, neyi sevmezsin, neyi daha çok seversin? | GEÇTİ |
| 135 | `okuma_yazma.yazma.kontrol_tr[0]` | **gern** fiilden sonra mı geliyor? | GEÇTİ |
| 136 | `okuma_yazma.yazma.kontrol_tr[1]` | Sevmediğin şeyde **nicht gern** var mı? | GEÇTİ |
| 137 | `okuma_yazma.yazma.kontrol_tr[2]` | Daha çok sevdiğin şeyde **lieber** var mı? | GEÇTİ |
| 138 | `gun_sinavi.maddeler[m1:32:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 139 | `gun_sinavi.maddeler[m1:32:s1].why_tr` | **lieber** daha çok severek demek. | GEÇTİ |
| 140 | `gun_sinavi.maddeler[m1:32:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 141 | `gun_sinavi.maddeler[m1:32:s2].why_tr` | **nicht gern** sevmeden demek. | GEÇTİ |
| 142 | `gun_sinavi.maddeler[m1:32:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 143 | `gun_sinavi.maddeler[m1:32:s3].why_tr` | **drei Wochen alt** üç haftalık demek. | GEÇTİ |
| 144 | `gun_sinavi.maddeler[m1:32:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 145 | `gun_sinavi.maddeler[m1:32:s4].why_tr` | **Vielen Dank** çok teşekkürler demek. | GEÇTİ |
| 146 | `gun_sinavi.maddeler[m1:32:s5].why_tr` | Sevmediğin şey için **nicht gern** dersin. | GEÇTİ |
| 147 | `gun_sinavi.maddeler[m1:32:s6].why_tr` | Daha çok sevdiğin şey için **lieber** dersin. | GEÇTİ |
| 148 | `gun_sinavi.maddeler[m1:32:s7].why_tr` | **gern** fiilden sonra gelir: **Ich trinke gern**. | GEÇTİ |
| 149 | `gun_sinavi.maddeler[m1:32:s8].why_tr` | Zamanla başlarsan fiil ikinci yerde kalır: **Heute esse ich**. | GEÇTİ |
| 150 | `gun_sinavi.maddeler[m1:32:s9].situation_tr` | Tobi soruyor. Sosis yemeyi seviyorsun. | GEÇTİ |
| 151 | `gun_sinavi.maddeler[m1:32:s9].why_tr` | Evet de, sonra **gern** ekle. | GEÇTİ |
| 152 | `gun_sinavi.maddeler[m1:32:s10].situation_tr` | Herr Wimmer yardımın için teşekkür ediyor. Kibarca cevap ver. | GEÇTİ |
| 153 | `gun_sinavi.maddeler[m1:32:s10].why_tr` | Teşekküre **Bitte, gern!** diye cevap verirsin. | GEÇTİ |
| 154 | `gun_sinavi.maddeler[m1:32:s11].situation_tr` | Derya soruyor. Neyi severek yersin, neyi daha çok seversin? İki kısa cümle söyle. | GEÇTİ |
| 155 | `gun_sinavi.maddeler[m1:32:s11].why_tr` | İlk cümlede **gern**, ikinci cümlede **lieber** kullan. | GEÇTİ |

### `content/v2/m1/gun-33.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `title_tr` | Doğum gününe davet etmek | GEÇTİ |
| 2 | `goal_tr` | Derya'nın doğum gününü kutlar, davetini kabul eder ya da kibarca reddedersin. | GEÇTİ |
| 3 | `can_do.tr` | Birini davet eder, daveti kabul eder ya da kibarca reddederim. Doğum gününü kutlarım. | GEÇTİ |
| 4 | `halkalar[m1:33:h1].title_tr` | Bugün Derya'nın doğum günü | GEÇTİ |
| 5 | `halkalar[m1:33:h1].sahne.ortam_tr` | Sabah, iş yeri. Derya masasına geliyor, Tobi ile sen onu bekliyorsunuz. | GEÇTİ |
| 6 | `halkalar[m1:33:h1].sahne.soru.q_tr` | Derya'ya ne veriyorsunuz? | GEÇTİ |
| 7 | `halkalar[m1:33:h1].sahne.soru.opts[0]` | Bir kart | GEÇTİ |
| 8 | `halkalar[m1:33:h1].sahne.soru.opts[1]` | Bir pasta | GEÇTİ |
| 9 | `halkalar[m1:33:h1].sahne.soru.opts[2]` | Çiçek | GEÇTİ |
| 10 | `halkalar[m1:33:h1].sahne.soru.opts[3]` | Bir hediye paketi | GEÇTİ |
| 11 | `halkalar[m1:33:h2].title_tr` | Cumartesi kutlama | GEÇTİ |
| 12 | `halkalar[m1:33:h2].sahne.ortam_tr` | Öğle arası. Derya yanına geliyor. | GEÇTİ |
| 13 | `halkalar[m1:33:h2].sahne.soru.q_tr` | Kutlama saat kaçta başlıyor? | GEÇTİ |
| 14 | `halkalar[m1:33:h2].sahne.soru.opts[0]` | Üçte | GEÇTİ |
| 15 | `halkalar[m1:33:h2].sahne.soru.opts[1]` | İkide | GEÇTİ |
| 16 | `halkalar[m1:33:h2].sahne.soru.opts[2]` | Sekizde | GEÇTİ |
| 17 | `halkalar[m1:33:h2].sahne.soru.opts[3]` | Onda | GEÇTİ |
| 18 | `halkalar[m1:33:h3].title_tr` | Kibarca hayır demek | GEÇTİ |
| 19 | `halkalar[m1:33:h3].sahne.ortam_tr` | Mola. Tobi seni cuma günü yüzmeye çağırıyor. | GEÇTİ |
| 20 | `halkalar[m1:33:h3].sahne.soru.q_tr` | Neden gidemiyorsun? | GEÇTİ |
| 21 | `halkalar[m1:33:h3].sahne.soru.opts[0]` | Köyde olacaksın | GEÇTİ |
| 22 | `halkalar[m1:33:h3].sahne.soru.opts[1]` | Çalışıyorsun | GEÇTİ |
| 23 | `halkalar[m1:33:h3].sahne.soru.opts[2]` | Hastasın | GEÇTİ |
| 24 | `halkalar[m1:33:h3].sahne.soru.opts[3]` | Yüzmeyi sevmiyorsun | GEÇTİ |
| 25 | `sahne.title_tr` | Derya'nın daveti | GEÇTİ |
| 26 | `sahne.sahneler[s1].sahne_tr` | Tobi elinde bir pastayla mola odasına giriyor. | GEÇTİ |
| 27 | `sahne.sahneler[s2].sahne_tr` | Derya şaşırıyor, gülümsüyor. | GEÇTİ |
| 28 | `sahne.sahneler[s3].sahne_tr` | Tobi pastayı masaya koyuyor. | GEÇTİ |
| 29 | `sahne.sahneler[s4].sahne_tr` | Derya herkese bakıyor. | GEÇTİ |
| 30 | `sahne.sahneler[s5].sahne_tr` | Tobi hemen elini kaldırıyor. | GEÇTİ |
| 31 | `sahne.sahneler[s6].sahne_tr` | Herr Wimmer kapının önünden geçiyor, Derya ona dönüyor. | GEÇTİ |
| 32 | `sahne.sahneler[s7].sahne_tr` | Herr Wimmer duruyor, Derya'nın elini sıkıyor. | GEÇTİ |
| 33 | `sahne.sahneler[s8].sahne_tr` | Herr Wimmer saatine bakıyor. | GEÇTİ |
| 34 | `sahne.sahneler[s9].sahne_tr` | Derya omuz silkip gülümsüyor. | GEÇTİ |
| 35 | `sahne.sahneler[s10].sahne_tr` | Derya sana dönüyor. | GEÇTİ |
| 36 | `sahne.sahneler[s11].sahne_tr` | Tobi başparmağını kaldırıyor. | GEÇTİ |
| 37 | `sahne.bolumler[b1].ana_fikir.q_tr` | Derya ne yapıyor? | GEÇTİ |
| 38 | `sahne.bolumler[b1].ana_fikir.opts[0]` | İş arkadaşlarını doğum günü kutlamasına çağırıyor | GEÇTİ |
| 39 | `sahne.bolumler[b1].ana_fikir.opts[1]` | İşten ayrılıyor | GEÇTİ |
| 40 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Pasta yapmayı öğretiyor | GEÇTİ |
| 41 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Kim cumartesi gelemiyor? | GEÇTİ |
| 42 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | Herr Wimmer | GEÇTİ |
| 43 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | Tobi | GEÇTİ |
| 44 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | Derya | GEÇTİ |
| 45 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Kutlamada nerede oturuluyor? | GEÇTİ |
| 46 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | dışarıda | GEÇTİ |
| 47 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | kantinde | GEÇTİ |
| 48 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | ofiste | GEÇTİ |
| 49 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi günü duydun? | GEÇTİ |
| 50 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Kim geliyor, kim gelmiyor? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 51 | `sahne.bolumler[b1].cevapla.situation_tr` | Derya sana soruyor. Daveti kabul et. | GEÇTİ |
| 52 | `sahne.bolumler[b1].cevapla.why_tr` | Kabul ederken **Ja, gern!** ya da **Ich komme gern.** dersin. | GEÇTİ |
| 53 | `sesler[m1:33:a1].title_tr` | Derya'dan davet mesajı | GEÇTİ |
| 54 | `sesler[m1:33:a1].ortam_tr` | Akşam telefonuna Derya'dan bir sesli mesaj geliyor. | GEÇTİ |
| 55 | `sesler[m1:33:a1].bolumler[b1].ana_fikir.q_tr` | Derya neden arıyor? | GEÇTİ |
| 56 | `sesler[m1:33:a1].bolumler[b1].ana_fikir.opts[0]` | Seni kutlamasına çağırıyor | GEÇTİ |
| 57 | `sesler[m1:33:a1].bolumler[b1].ana_fikir.opts[1]` | İşe geç kalacağını söylüyor | GEÇTİ |
| 58 | `sesler[m1:33:a1].bolumler[b1].ana_fikir.opts[2]` | Senden yardım istiyor | GEÇTİ |
| 59 | `sesler[m1:33:a1].bolumler[b1].ayrinti[0].q_tr` | Kutlama hangi gün? | GEÇTİ |
| 60 | `sesler[m1:33:a1].bolumler[b1].ayrinti[0].opts[0]` | cumartesi | GEÇTİ |
| 61 | `sesler[m1:33:a1].bolumler[b1].ayrinti[0].opts[1]` | pazar | GEÇTİ |
| 62 | `sesler[m1:33:a1].bolumler[b1].ayrinti[0].opts[2]` | cuma | GEÇTİ |
| 63 | `sesler[m1:33:a1].bolumler[b1].ayrinti[1].q_tr` | Derya nerede oturuyor? | GEÇTİ |
| 64 | `sesler[m1:33:a1].bolumler[b1].ayrinti[1].opts[0]` | garın yakınında | GEÇTİ |
| 65 | `sesler[m1:33:a1].bolumler[b1].ayrinti[1].opts[1]` | köyde | GEÇTİ |
| 66 | `sesler[m1:33:a1].bolumler[b1].ayrinti[1].opts[2]` | iş yerinin yanında | GEÇTİ |
| 67 | `sesler[m1:33:a1].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 68 | `sesler[m1:33:a1].bolumler[b1].dikte[d5].gorev_tr` | Derya ne söylüyor? Almanca bir iki kısa cümleyle söyle. | GEÇTİ |
| 69 | `sesler[m1:33:a1].bolumler[b1].cevapla.situation_tr` | Derya'yı geri arıyorsun. Teşekkür et ve geleceğini söyle. | GEÇTİ |
| 70 | `sesler[m1:33:a1].bolumler[b1].cevapla.why_tr` | Önce teşekkür et: **Danke für die Einladung!** Sonra **Ich komme gern.** de. | GEÇTİ |
| 71 | `sesler[m1:33:a1].eylem.q_tr` | Derya'nın mesajından sonra ne yapmalısın? | GEÇTİ |
| 72 | `sesler[m1:33:a1].eylem.opts[0]` | Derya'yı arayıp cevap ver. | GEÇTİ |
| 73 | `sesler[m1:33:a1].eylem.opts[1]` | Cumartesi saat üçte işe git. | GEÇTİ |
| 74 | `sesler[m1:33:a1].eylem.opts[2]` | Garda Derya'yı bekle. | GEÇTİ |
| 75 | `sesler[m1:33:a1].eylem.why_tr` | Derya yakında aramanı istiyor. | GEÇTİ |
| 76 | `sesler[m1:33:a2].title_tr` | Tobi'den sesli mesaj | GEÇTİ |
| 77 | `sesler[m1:33:a2].ortam_tr` | Aynı akşam Tobi de sana bir mesaj bırakıyor. | GEÇTİ |
| 78 | `sesler[m1:33:a2].bolumler[b1].ana_fikir.q_tr` | Tobi ne öneriyor? | GEÇTİ |
| 79 | `sesler[m1:33:a2].bolumler[b1].ana_fikir.opts[0]` | Birlikte bir hediye almayı | GEÇTİ |
| 80 | `sesler[m1:33:a2].bolumler[b1].ana_fikir.opts[1]` | Birlikte pasta yapmayı | GEÇTİ |
| 81 | `sesler[m1:33:a2].bolumler[b1].ana_fikir.opts[2]` | Kutlamaya gitmemeyi | GEÇTİ |
| 82 | `sesler[m1:33:a2].bolumler[b1].ayrinti[0].q_tr` | Derya neyi çok seviyor? | GEÇTİ |
| 83 | `sesler[m1:33:a2].bolumler[b1].ayrinti[0].opts[0]` | okumayı | GEÇTİ |
| 84 | `sesler[m1:33:a2].bolumler[b1].ayrinti[0].opts[1]` | yüzmeyi | GEÇTİ |
| 85 | `sesler[m1:33:a2].bolumler[b1].ayrinti[0].opts[2]` | pasta yapmayı | GEÇTİ |
| 86 | `sesler[m1:33:a2].bolumler[b1].ayrinti[1].q_tr` | Tobi seni ne zaman görmek istiyor? | GEÇTİ |
| 87 | `sesler[m1:33:a2].bolumler[b1].ayrinti[1].opts[0]` | yarın | GEÇTİ |
| 88 | `sesler[m1:33:a2].bolumler[b1].ayrinti[1].opts[1]` | cumartesi | GEÇTİ |
| 89 | `sesler[m1:33:a2].bolumler[b1].ayrinti[1].opts[2]` | pazar | GEÇTİ |
| 90 | `sesler[m1:33:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 91 | `sesler[m1:33:a2].bolumler[b1].dikte[d5].gorev_tr` | Tobi'nin fikri ne? Almanca bir iki kısa cümleyle söyle. | GEÇTİ |
| 92 | `sesler[m1:33:a2].bolumler[b1].cevapla.situation_tr` | Tobi'nin fikri hoşuna gidiyor. Ona söyle. | GEÇTİ |
| 93 | `sesler[m1:33:a2].bolumler[b1].cevapla.why_tr` | Fikri beğendiğinde **Gute Idee!** dersin. | GEÇTİ |
| 94 | `sesler[m1:33:a2].eylem.q_tr` | Tobi'ye nasıl yardım edebilirsin? | GEÇTİ |
| 95 | `sesler[m1:33:a2].eylem.opts[0]` | Derya için birlikte bir hediye seçebilirsin. | GEÇTİ |
| 96 | `sesler[m1:33:a2].eylem.opts[1]` | Cumartesi Tobi'yi işe götürebilirsin. | GEÇTİ |
| 97 | `sesler[m1:33:a2].eylem.opts[2]` | Derya'ya pasta yapabilirsin. | GEÇTİ |
| 98 | `sesler[m1:33:a2].eylem.why_tr` | Tobi birlikte hediye almayı öneriyor. | GEÇTİ |
| 99 | `prova.title_tr` | Derya seni davet ediyor | GEÇTİ |
| 100 | `prova.durum_tr` | Mola. Derya cumartesi kutlamasına seni de çağırıyor. Kabul et ya da kibarca başka bir gün öner. | **GERİ** |
| 101 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Sıcak bir kabul. **gern** burada seve seve demek. | GEÇTİ |
| 102 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Önce teşekkür ettin, sonra kibarca hayır dedin. Çok iyi. | GEÇTİ |
| 103 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Bu çok sert duyulur. Önce teşekkür et, sonra **leider** ile söyle. | GEÇTİ |
| 104 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Saati tekrar ettin. Böylece yanlış anlama kalmaz. | GEÇTİ |
| 105 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Samimi ve doğal bir cevap. | GEÇTİ |
| 106 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Derya saat üç dedi. **ab drei** üçten itibaren demek. | GEÇTİ |
| 107 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Başka günü kabul ettin. Kibar ve açık. | GEÇTİ |
| 108 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Sebep söyledin ve teşekkür ettin. Böyle bir ret kırıcı olmaz. | GEÇTİ |
| 109 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Tek kelime soğuk duyulur. **Nein, leider nicht.** de ve kısa bir sebep söyle. | GEÇTİ |
| 110 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Teşekkürle kapattın. Tam yerinde. | GEÇTİ |
| 111 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Doğum günü bugün. Yeniden kutlamak çok hoş. | GEÇTİ |
| 112 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Doğum günü Tobi'nin değil, Derya'nın. | GEÇTİ |
| 113 | `prova.kapanis_tr` | Davete teşekkür ettin, kabul ettin ya da kibarca başka bir gün konuştun. | **GERİ** |
| 114 | `okuma_yazma.title_tr` | Derya'nın davet mesajı | GEÇTİ |
| 115 | `okuma_yazma.sorular[m1:33:o1].q_tr` | Derya neden yazıyor? | GEÇTİ |
| 116 | `okuma_yazma.sorular[m1:33:o1].opts[0]` | Arkadaşlarını kutlamaya çağırmak için | GEÇTİ |
| 117 | `okuma_yazma.sorular[m1:33:o1].opts[1]` | İşe gelemeyeceğini söylemek için | GEÇTİ |
| 118 | `okuma_yazma.sorular[m1:33:o1].opts[2]` | Pasta tarifi vermek için | GEÇTİ |
| 119 | `okuma_yazma.sorular[m1:33:o2].q_tr` | Derya'nın doğum günü ne zaman? | GEÇTİ |
| 120 | `okuma_yazma.sorular[m1:33:o2].opts[0]` | bugün | GEÇTİ |
| 121 | `okuma_yazma.sorular[m1:33:o2].opts[1]` | cumartesi | GEÇTİ |
| 122 | `okuma_yazma.sorular[m1:33:o2].opts[2]` | yarın | GEÇTİ |
| 123 | `okuma_yazma.sorular[m1:33:o3].q_tr` | Kutlamada ne var? | GEÇTİ |
| 124 | `okuma_yazma.sorular[m1:33:o3].opts[0]` | pasta | GEÇTİ |
| 125 | `okuma_yazma.sorular[m1:33:o3].opts[1]` | sosis | GEÇTİ |
| 126 | `okuma_yazma.sorular[m1:33:o3].opts[2]` | müzik | GEÇTİ |
| 127 | `okuma_yazma.sorular[m1:33:o4].situation_tr` | Derya'ya cevap ver. Cumartesi çalışman lazım, gelemiyorsun. | GEÇTİ |
| 128 | `okuma_yazma.sorular[m1:33:o4].why_tr` | Önce teşekkür et. Sonra **leider** ile kısa bir sebep söyle. | GEÇTİ |
| 129 | `okuma_yazma.yazma.gorev_tr` | Derya'ya kısa bir cevap yaz. Önce teşekkür et, sonra gelip gelemeyeceğini söyle. | GEÇTİ |
| 130 | `okuma_yazma.yazma.kontrol_tr[0]` | Önce teşekkür ettin mi? | GEÇTİ |
| 131 | `okuma_yazma.yazma.kontrol_tr[1]` | Gelip gelemeyeceğin açık mı? | GEÇTİ |
| 132 | `okuma_yazma.yazma.kontrol_tr[2]` | Gelemiyorsan **leider** ve kısa bir sebep var mı? | GEÇTİ |
| 133 | `gun_sinavi.maddeler[m1:33:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 134 | `gun_sinavi.maddeler[m1:33:s1].why_tr` | Birinin doğum günüyse **hat Geburtstag** dersin. | GEÇTİ |
| 135 | `gun_sinavi.maddeler[m1:33:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 136 | `gun_sinavi.maddeler[m1:33:s2].why_tr` | **Tut mir leid** kusura bakma demek. | GEÇTİ |
| 137 | `gun_sinavi.maddeler[m1:33:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 138 | `gun_sinavi.maddeler[m1:33:s3].why_tr` | **viel Glück** bol şans demek. | GEÇTİ |
| 139 | `gun_sinavi.maddeler[m1:33:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 140 | `gun_sinavi.maddeler[m1:33:s4].why_tr` | **in der Stadt** şehirde demek. | GEÇTİ |
| 141 | `gun_sinavi.maddeler[m1:33:s5].why_tr` | Davet ederken **Hast du am Samstag Zeit?** dersin. | GEÇTİ |
| 142 | `gun_sinavi.maddeler[m1:33:s6].why_tr` | **für** ile neye teşekkür ettiğini söylersin. | GEÇTİ |
| 143 | `gun_sinavi.maddeler[m1:33:s7].why_tr` | **leider** maalesef demek. **kommen** en sona gider. | **GERİ** |
| 144 | `gun_sinavi.maddeler[m1:33:s8].why_tr` | Doğum gününde **Alles Gute zum Geburtstag!** dersin. | GEÇTİ |
| 145 | `gun_sinavi.maddeler[m1:33:s9].situation_tr` | Tobi seni pazar günü çağırıyor. Pazar gelemiyorsun. Kibarca hayır de. | GEÇTİ |
| 146 | `gun_sinavi.maddeler[m1:33:s9].why_tr` | Önce teşekkür et, sonra **leider** ile hayır de. | GEÇTİ |
| 147 | `gun_sinavi.maddeler[m1:33:s10].situation_tr` | Bir iş arkadaşın bugün doğum günü olduğunu söylüyor. Onu kutla. | GEÇTİ |
| 148 | `gun_sinavi.maddeler[m1:33:s10].why_tr` | Doğum gününde **Herzlichen Glückwunsch!** ya da **Alles Gute!** dersin. | GEÇTİ |
| 149 | `gun_sinavi.maddeler[m1:33:s11].situation_tr` | Tobi'yi cumartesi kutlamana çağır. Günü söyle ve gelmek isteyip istemediğini sor. | GEÇTİ |
| 150 | `gun_sinavi.maddeler[m1:33:s11].why_tr` | Günü söyle: **Ich feiere am Samstag.** Sonra sor: **Hast du Lust?** | GEÇTİ |

### `content/v2/m1/gun-34.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `title_tr` | Yol tarif etmek: die zweite Straße links | GEÇTİ |
| 2 | `goal_tr` | Bir yere nasıl gidildiğini sorar, otobüs saatini ve basit bir tarifi anlarsın. | GEÇTİ |
| 3 | `can_do.tr` | Bir yere nasıl gidildiğini sorar, basit bir tarifi anlarım. | GEÇTİ |
| 4 | `halkalar[m1:34:h1].title_tr` | Durağa nasıl giderim? | GEÇTİ |
| 5 | `halkalar[m1:34:h1].sahne.ortam_tr` | Şehir merkezi. Durağı bulamıyorsun, bir kadına soruyorsun. | GEÇTİ |
| 6 | `halkalar[m1:34:h1].sahne.soru.q_tr` | Kadın hangi sokağı söylüyor? | GEÇTİ |
| 7 | `halkalar[m1:34:h1].sahne.soru.opts[0]` | Soldaki ikinci | GEÇTİ |
| 8 | `halkalar[m1:34:h1].sahne.soru.opts[1]` | Sağdaki ikinci | GEÇTİ |
| 9 | `halkalar[m1:34:h1].sahne.soru.opts[2]` | Soldaki ilk | GEÇTİ |
| 10 | `halkalar[m1:34:h1].sahne.soru.opts[3]` | Sağdaki üçüncü | GEÇTİ |
| 11 | `halkalar[m1:34:h2].title_tr` | Otobüste ve yolda | GEÇTİ |
| 12 | `halkalar[m1:34:h2].sahne.ortam_tr` | Otobüs durağı. Otobüs geliyor, şoföre soruyorsun. | GEÇTİ |
| 13 | `halkalar[m1:34:h2].sahne.soru.q_tr` | Kaçıncı durakta inmelisin? | GEÇTİ |
| 14 | `halkalar[m1:34:h2].sahne.soru.opts[0]` | Dördüncü | GEÇTİ |
| 15 | `halkalar[m1:34:h2].sahne.soru.opts[1]` | Üçüncü | GEÇTİ |
| 16 | `halkalar[m1:34:h2].sahne.soru.opts[2]` | İkinci | GEÇTİ |
| 17 | `halkalar[m1:34:h2].sahne.soru.opts[3]` | Birinci | GEÇTİ |
| 18 | `sahne.title_tr` | Derya'nın evine nasıl gidilir? | GEÇTİ |
| 19 | `sahne.sahneler[s1].sahne_tr` | Mola odası. Tobi elinde kahve kupasıyla Derya'ya dönüyor. | GEÇTİ |
| 20 | `sahne.sahneler[s2].sahne_tr` | Derya bir kâğıda küçük bir harita çiziyor. | GEÇTİ |
| 21 | `sahne.sahneler[s3].sahne_tr` | Tobi araba anahtarını sallıyor. | GEÇTİ |
| 22 | `sahne.sahneler[s4].sahne_tr` | Derya başını iki yana sallıyor. | GEÇTİ |
| 23 | `sahne.sahneler[s5].sahne_tr` | Tobi iç çekiyor, anahtarı cebine koyuyor. | GEÇTİ |
| 24 | `sahne.sahneler[s6].sahne_tr` | Derya haritada gardan bir çizgi çekiyor. | GEÇTİ |
| 25 | `sahne.sahneler[s7].sahne_tr` | Derya kalemle düz bir çizgi çiziyor. | GEÇTİ |
| 26 | `sahne.sahneler[s8].sahne_tr` | Derya çizgiyi sola, sonra sağa kıvırıyor. | GEÇTİ |
| 27 | `sahne.sahneler[s9].sahne_tr` | Tobi kâğıdı ters tutuyor, kafası karışık. | GEÇTİ |
| 28 | `sahne.sahneler[s10].sahne_tr` | Derya kâğıdı düzeltiyor. | GEÇTİ |
| 29 | `sahne.sahneler[s11].sahne_tr` | Tobi gülerek sana dönüyor. | GEÇTİ |
| 30 | `sahne.bolumler[b1].ana_fikir.q_tr` | Derya ne anlatıyor? | GEÇTİ |
| 31 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Evine nasıl gidileceğini | GEÇTİ |
| 32 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Otobüsün neden geç kaldığını | GEÇTİ |
| 33 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Neden gelemeyeceğini | GEÇTİ |
| 34 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Gardan sonra nasıl gidiliyor? | GEÇTİ |
| 35 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | yürüyerek | GEÇTİ |
| 36 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | otobüsle | GEÇTİ |
| 37 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | arabayla | GEÇTİ |
| 38 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Trafik ışığında hangi yöne dönülüyor? | GEÇTİ |
| 39 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | sola | GEÇTİ |
| 40 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | sağa | GEÇTİ |
| 41 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | dümdüz | GEÇTİ |
| 42 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 43 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Derya'nın evine nasıl gidiliyor? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 44 | `sahne.bolumler[b1].cevapla.situation_tr` | Tobi yolu unuttu, sana soruyor. Otobüsle gara kadar, sonra yürüyerek. | GEÇTİ |
| 45 | `sahne.bolumler[b1].cevapla.why_tr` | Araç için **mit dem Bus**, yürümek için **zu Fuß** dersin. | GEÇTİ |
| 46 | `sesler[m1:34:a1].title_tr` | Duraktaki otobüs anonsu | GEÇTİ |
| 47 | `sesler[m1:34:a1].ortam_tr` | Şehir merkezindeki otobüs durağındasın. Hoparlörden bir anons geliyor. | GEÇTİ |
| 48 | `sesler[m1:34:a1].bolumler[b1].ana_fikir.q_tr` | Bu anons ne hakkında? | GEÇTİ |
| 49 | `sesler[m1:34:a1].bolumler[b1].ana_fikir.opts[0]` | Otobüslerin kalkış saatleri | GEÇTİ |
| 50 | `sesler[m1:34:a1].bolumler[b1].ana_fikir.opts[1]` | Yeni bir otobüs bileti | GEÇTİ |
| 51 | `sesler[m1:34:a1].bolumler[b1].ana_fikir.opts[2]` | Gardaki bir mağaza | GEÇTİ |
| 52 | `sesler[m1:34:a1].bolumler[b1].ayrinti[0].q_tr` | Üç numaralı otobüs kaçta kalkıyor? | GEÇTİ |
| 53 | `sesler[m1:34:a1].bolumler[b1].ayrinti[0].opts[0]` | 14.10 | GEÇTİ |
| 54 | `sesler[m1:34:a1].bolumler[b1].ayrinti[0].opts[1]` | 14.20 | GEÇTİ |
| 55 | `sesler[m1:34:a1].bolumler[b1].ayrinti[0].opts[2]` | 13.10 | GEÇTİ |
| 56 | `sesler[m1:34:a1].bolumler[b1].ayrinti[1].q_tr` | Beş numaralı otobüs bugün nereye gitmiyor? | GEÇTİ |
| 57 | `sesler[m1:34:a1].bolumler[b1].ayrinti[1].opts[0]` | belediyeye | GEÇTİ |
| 58 | `sesler[m1:34:a1].bolumler[b1].ayrinti[1].opts[1]` | gara | GEÇTİ |
| 59 | `sesler[m1:34:a1].bolumler[b1].ayrinti[1].opts[2]` | eczaneye | GEÇTİ |
| 60 | `sesler[m1:34:a1].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 61 | `sesler[m1:34:a1].bolumler[b1].dikte[d5].gorev_tr` | Hangi otobüs kaçta kalkıyor? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 62 | `sesler[m1:34:a1].bolumler[b1].cevapla.situation_tr` | Tobi anonsu kaçırdı. Üç numaralı otobüsün saatini söyle. | GEÇTİ |
| 63 | `sesler[m1:34:a1].bolumler[b1].cevapla.why_tr` | Saat için **um** kullanırsın: **um vierzehn Uhr zehn**. | GEÇTİ |
| 64 | `sesler[m1:34:a1].eylem.q_tr` | Gara gitmek istiyorsun. Hangi otobüse binmelisin? | GEÇTİ |
| 65 | `sesler[m1:34:a1].eylem.opts[0]` | 14.10'daki üç numaralı otobüse | GEÇTİ |
| 66 | `sesler[m1:34:a1].eylem.opts[1]` | 14.20'deki beş numaralı otobüse | GEÇTİ |
| 67 | `sesler[m1:34:a1].eylem.opts[2]` | 13.10'daki üç numaralı otobüse | GEÇTİ |
| 68 | `sesler[m1:34:a1].eylem.why_tr` | Gara giden otobüs üç numara. Kalkış saati on dört on. | GEÇTİ |
| 69 | `sesler[m1:34:a2].title_tr` | Derya'dan düzeltme | GEÇTİ |
| 70 | `sesler[m1:34:a2].ortam_tr` | Akşam Derya'dan kısa bir sesli mesaj geliyor. | GEÇTİ |
| 71 | `sesler[m1:34:a2].bolumler[b1].ana_fikir.q_tr` | Derya neden arıyor? | GEÇTİ |
| 72 | `sesler[m1:34:a2].bolumler[b1].ana_fikir.opts[0]` | Yol tarifini düzeltiyor | GEÇTİ |
| 73 | `sesler[m1:34:a2].bolumler[b1].ana_fikir.opts[1]` | Kutlamayı iptal ediyor | GEÇTİ |
| 74 | `sesler[m1:34:a2].bolumler[b1].ana_fikir.opts[2]` | Saati değiştiriyor | GEÇTİ |
| 75 | `sesler[m1:34:a2].bolumler[b1].ayrinti[0].q_tr` | Doğru sokak hangisi? | GEÇTİ |
| 76 | `sesler[m1:34:a2].bolumler[b1].ayrinti[0].opts[0]` | sağdaki üçüncü | GEÇTİ |
| 77 | `sesler[m1:34:a2].bolumler[b1].ayrinti[0].opts[1]` | sağdaki ikinci | GEÇTİ |
| 78 | `sesler[m1:34:a2].bolumler[b1].ayrinti[0].opts[2]` | soldaki üçüncü | GEÇTİ |
| 79 | `sesler[m1:34:a2].bolumler[b1].ayrinti[1].q_tr` | Derya'nın evi o sokakta nerede? | GEÇTİ |
| 80 | `sesler[m1:34:a2].bolumler[b1].ayrinti[1].opts[0]` | hemen solda | GEÇTİ |
| 81 | `sesler[m1:34:a2].bolumler[b1].ayrinti[1].opts[1]` | hemen sağda | GEÇTİ |
| 82 | `sesler[m1:34:a2].bolumler[b1].ayrinti[1].opts[2]` | sokağın sonunda | GEÇTİ |
| 83 | `sesler[m1:34:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 84 | `sesler[m1:34:a2].bolumler[b1].dikte[d5].gorev_tr` | Derya neyi düzeltiyor? Almanca bir iki kısa cümleyle söyle. | GEÇTİ |
| 85 | `sesler[m1:34:a2].bolumler[b1].cevapla.situation_tr` | Tobi soruyor. Derya'nın sokağını söyle: sağdaki üçüncü. | GEÇTİ |
| 86 | `sesler[m1:34:a2].bolumler[b1].cevapla.why_tr` | Kaçıncı sokak olduğunu **die dritte Straße** diye söylersin. | GEÇTİ |
| 87 | `sesler[m1:34:a2].eylem.q_tr` | Derya'nın evine gidiyorsun. Ne yapmalısın? | GEÇTİ |
| 88 | `sesler[m1:34:a2].eylem.opts[0]` | Sağdaki üçüncü sokağa gir. | GEÇTİ |
| 89 | `sesler[m1:34:a2].eylem.opts[1]` | Sağdaki ikinci sokağa gir. | GEÇTİ |
| 90 | `sesler[m1:34:a2].eylem.opts[2]` | Soldaki üçüncü sokağa gir. | GEÇTİ |
| 91 | `sesler[m1:34:a2].eylem.why_tr` | Derya ikinci sokağın yanlış olduğunu söylüyor. Doğrusu sağdaki üçüncü. | GEÇTİ |
| 92 | `prova.title_tr` | Sokakta yol sormak | GEÇTİ |
| 93 | `prova.durum_tr` | Şehirdesin ve garı arıyorsun. Kaldırımda bir kadına soruyorsun. | GEÇTİ |
| 94 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | Önce **Entschuldigung**, sonra soru. Kibar ve açık. | GEÇTİ |
| 95 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Tek kelime kaba duyulur. **Entschuldigung, wie komme ich zum Bahnhof?** de. | GEÇTİ |
| 96 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Duyduğunu tekrar ettin ve devamını sordun. Çok iyi. | GEÇTİ |
| 97 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Anlamadığını söylemek doğru. Kadın yavaşça tekrar ediyor. | GEÇTİ |
| 98 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Kadın sol demedi. **geradeaus** dümdüz demek. | GEÇTİ |
| 99 | `prova.dugumler[n2b].secenekler[0].geri_bildirim_tr` | Şimdi anladın ve tekrar ettin. | GEÇTİ |
| 100 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Tarifi tekrar ederek doğruladın. Telefonda da sokakta da çok işe yarar. | GEÇTİ |
| 101 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Güzel bir soru. Yürüyüp yürümeyeceğini anlarsın. | GEÇTİ |
| 102 | `prova.dugumler[n3].secenekler[2].geri_bildirim_tr` | Tersini söyledin. Kavşakta **links**, sonra ikinci sokak **rechts**. | GEÇTİ |
| 103 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Teşekkürle kapattın. | GEÇTİ |
| 104 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Yardım eden birine teşekkür et. **Vielen Dank!** de. | GEÇTİ |
| 105 | `prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | Sıcak bir teşekkür. | GEÇTİ |
| 106 | `prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Kadın saat değil dakika dedi: **fünf Minuten**. | GEÇTİ |
| 107 | `prova.kapanis_tr` | Kibarca yol sordun, tarifi tekrar ederek doğruladın ve teşekkür ettin. | GEÇTİ |
| 108 | `okuma_yazma.title_tr` | Derya'nın yazılı tarifi | GEÇTİ |
| 109 | `okuma_yazma.sorular[m1:34:o1].q_tr` | Bu mesaj ne? | GEÇTİ |
| 110 | `okuma_yazma.sorular[m1:34:o1].opts[0]` | Derya'nın evine giden yol | GEÇTİ |
| 111 | `okuma_yazma.sorular[m1:34:o1].opts[1]` | Bir otobüs bileti | GEÇTİ |
| 112 | `okuma_yazma.sorular[m1:34:o1].opts[2]` | Bir doğum günü kartı | GEÇTİ |
| 113 | `okuma_yazma.sorular[m1:34:o2].q_tr` | Gardan Derya'nın evine nasıl gidiliyor? | GEÇTİ |
| 114 | `okuma_yazma.sorular[m1:34:o2].opts[0]` | yürüyerek | GEÇTİ |
| 115 | `okuma_yazma.sorular[m1:34:o2].opts[1]` | otobüsle | GEÇTİ |
| 116 | `okuma_yazma.sorular[m1:34:o2].opts[2]` | arabayla | GEÇTİ |
| 117 | `okuma_yazma.sorular[m1:34:o3].q_tr` | İlk trafik ışığında hangi yöne gidiyorsun? | GEÇTİ |
| 118 | `okuma_yazma.sorular[m1:34:o3].opts[0]` | sola | GEÇTİ |
| 119 | `okuma_yazma.sorular[m1:34:o3].opts[1]` | sağa | GEÇTİ |
| 120 | `okuma_yazma.sorular[m1:34:o3].opts[2]` | dümdüz | GEÇTİ |
| 121 | `okuma_yazma.sorular[m1:34:o4].situation_tr` | Tobi soruyor: Derya'nın evi gardan uzak mı? Yakın olduğunu söyle. | GEÇTİ |
| 122 | `okuma_yazma.sorular[m1:34:o4].why_tr` | Uzak değil derken **Nein, das ist nah.** dersin. | GEÇTİ |
| 123 | `okuma_yazma.yazma.gorev_tr` | Tobi'ye Derya'nın evine giden yolu kısaca yaz. | GEÇTİ |
| 124 | `okuma_yazma.yazma.kontrol_tr[0]` | Önce nasıl gidileceğini yazdın mı, otobüsle mi yürüyerek mi? | GEÇTİ |
| 125 | `okuma_yazma.yazma.kontrol_tr[1]` | **links** ve **rechts** doğru yerde mi? | GEÇTİ |
| 126 | `okuma_yazma.yazma.kontrol_tr[2]` | Kaçıncı sokak olduğunu **die dritte** gibi yazdın mı? | GEÇTİ |
| 127 | `gun_sinavi.maddeler[m1:34:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 128 | `gun_sinavi.maddeler[m1:34:s1].why_tr` | **um zwei Uhr** saat ikide demek. | GEÇTİ |
| 129 | `gun_sinavi.maddeler[m1:34:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 130 | `gun_sinavi.maddeler[m1:34:s2].why_tr` | **bis zur Kreuzung** kavşağa kadar demek. | GEÇTİ |
| 131 | `gun_sinavi.maddeler[m1:34:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 132 | `gun_sinavi.maddeler[m1:34:s3].why_tr` | **mit der U-Bahn** metroyla demek. | GEÇTİ |
| 133 | `gun_sinavi.maddeler[m1:34:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 134 | `gun_sinavi.maddeler[m1:34:s4].why_tr` | **an der Kreuzung** kavşakta demek. | GEÇTİ |
| 135 | `gun_sinavi.maddeler[m1:34:s5].why_tr` | Yol sorarken **Wie komme ich zum Rathaus?** dersin. **das Rathaus** ile **zum** olur. | **GERİ** |
| 136 | `gun_sinavi.maddeler[m1:34:s6].why_tr` | Yürürken **zu Fuß**, arabayla **mit dem Auto** dersin. | GEÇTİ |
| 137 | `gun_sinavi.maddeler[m1:34:s7].why_tr` | **ab** cümlenin sonuna gider: **Biegen Sie an der Kreuzung rechts ab.** | GEÇTİ |
| 138 | `gun_sinavi.maddeler[m1:34:s8].why_tr` | **weit** uzak, **nah** yakın demek. | GEÇTİ |
| 139 | `gun_sinavi.maddeler[m1:34:s9].situation_tr` | Bir oğlan gara nasıl gidildiğini soruyor. Dümdüz gitmesini, sonra sola dönmesini söyle. | GEÇTİ |
| 140 | `gun_sinavi.maddeler[m1:34:s9].why_tr` | Tarif kısa olabilir: **Geradeaus und dann links.** | GEÇTİ |
| 141 | `gun_sinavi.maddeler[m1:34:s10].situation_tr` | Durakta yaşlı bir kadın soruyor. Tabelada üç numara 14.10 yazıyor. | GEÇTİ |
| 142 | `gun_sinavi.maddeler[m1:34:s10].why_tr` | Saati **um** ile söylersin: **um vierzehn Uhr zehn**. | GEÇTİ |
| 143 | `gun_sinavi.maddeler[m1:34:s11].situation_tr` | Sokaktasın. Birine gara nasıl gidildiğini sor, sonra uzak olup olmadığını sor. | GEÇTİ |
| 144 | `gun_sinavi.maddeler[m1:34:s11].why_tr` | Önce **Entschuldigung**, sonra **Wie komme ich zum Bahnhof?** ve **Ist es weit?** | GEÇTİ |

### `content/v2/m1/gun-35.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `title_tr` | Haftanın sınavı: molada sohbet | GEÇTİ |
| 2 | `goal_tr` | Molada yarınki planını önce Tobi'ye, sonra Herr Wimmer'e anlatırsın. | GEÇTİ |
| 3 | `can_do.tr` | Günümü saat saat anlatırım. | GEÇTİ |
| 4 | `halkalar[m1:35:h1].title_tr` | Molada sohbet | GEÇTİ |
| 5 | `halkalar[m1:35:h1].sahne.ortam_tr` | Cuma, mola. Tobi yanına oturuyor. | GEÇTİ |
| 6 | `halkalar[m1:35:h1].sahne.soru.q_tr` | Tobi ne soruyor? | GEÇTİ |
| 7 | `halkalar[m1:35:h1].sahne.soru.opts[0]` | İşi nasıl bulduğunu | GEÇTİ |
| 8 | `halkalar[m1:35:h1].sahne.soru.opts[1]` | Kaçta kalktığını | GEÇTİ |
| 9 | `halkalar[m1:35:h1].sahne.soru.opts[2]` | Neyi severek yediğini | GEÇTİ |
| 10 | `halkalar[m1:35:h1].sahne.soru.opts[3]` | Nerede oturduğunu | GEÇTİ |
| 11 | `sahne.title_tr` | Cuma molası: yarın ne yapıyorsun? | GEÇTİ |
| 12 | `sahne.sahneler[s1].sahne_tr` | Cuma, mola odası. Derya kahvesini alıp masaya oturuyor. | GEÇTİ |
| 13 | `sahne.sahneler[s2].sahne_tr` | Tobi esneyip geriniyor. | GEÇTİ |
| 14 | `sahne.sahneler[s3].sahne_tr` | Derya kaşlarını kaldırıyor. | GEÇTİ |
| 15 | `sahne.sahneler[s4].sahne_tr` | Tobi göz kırpıyor. | GEÇTİ |
| 16 | `sahne.sahneler[s5].sahne_tr` | Derya gülüyor. | GEÇTİ |
| 17 | `sahne.sahneler[s6].sahne_tr` | Herr Wimmer elinde dosyalarla kapıda görünüyor. | GEÇTİ |
| 18 | `sahne.sahneler[s7].sahne_tr` | Derya başını sallıyor. | GEÇTİ |
| 19 | `sahne.sahneler[s8].sahne_tr` | Herr Wimmer iç çekiyor. | GEÇTİ |
| 20 | `sahne.sahneler[s9].sahne_tr` | Tobi yüzünü buruşturuyor. | GEÇTİ |
| 21 | `sahne.sahneler[s10].sahne_tr` | Herr Wimmer gülümsüyor. | GEÇTİ |
| 22 | `sahne.sahneler[s11].sahne_tr` | Herr Wimmer kapıdan çıkarken el sallıyor. | GEÇTİ |
| 23 | `sahne.sahneler[s12].sahne_tr` | Derya ve Tobi aynı anda cevap veriyor. | GEÇTİ |
| 24 | `sahne.bolumler[b1].ana_fikir.q_tr` | Molada ne konuşuluyor? | GEÇTİ |
| 25 | `sahne.bolumler[b1].ana_fikir.opts[0]` | Hafta sonu planları | GEÇTİ |
| 26 | `sahne.bolumler[b1].ana_fikir.opts[1]` | Yeni vardiya planı | GEÇTİ |
| 27 | `sahne.bolumler[b1].ana_fikir.opts[2]` | Kantinin yemekleri | GEÇTİ |
| 28 | `sahne.bolumler[b1].ayrinti[0].q_tr` | Tobi yarın sabah ne yapıyor? | GEÇTİ |
| 29 | `sahne.bolumler[b1].ayrinti[0].opts[0]` | geç kalkıyor | GEÇTİ |
| 30 | `sahne.bolumler[b1].ayrinti[0].opts[1]` | erken kalkıyor | GEÇTİ |
| 31 | `sahne.bolumler[b1].ayrinti[0].opts[2]` | çalışıyor | GEÇTİ |
| 32 | `sahne.bolumler[b1].ayrinti[1].q_tr` | Kim cumartesi çalışıyor? | GEÇTİ |
| 33 | `sahne.bolumler[b1].ayrinti[1].opts[0]` | Herr Wimmer | GEÇTİ |
| 34 | `sahne.bolumler[b1].ayrinti[1].opts[1]` | Derya | GEÇTİ |
| 35 | `sahne.bolumler[b1].ayrinti[1].opts[2]` | Tobi | GEÇTİ |
| 36 | `sahne.bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 37 | `sahne.bolumler[b1].dikte[d5].gorev_tr` | Yarın kim ne yapıyor? Almanca iki kısa cümleyle söyle. | GEÇTİ |
| 38 | `sahne.bolumler[b1].cevapla.situation_tr` | Derya sana da soruyor. Yarın dokuzda kalkıyorsun, öğleden sonra otobüsle ona gidiyorsun. | GEÇTİ |
| 39 | `sahne.bolumler[b1].cevapla.why_tr` | Saatle başlarsan fiil yine ikinci yerde: **Um neun stehe ich auf.** | GEÇTİ |
| 40 | `sesler[m1:35:a1].title_tr` | Cumartesi sabahı durak anonsu | GEÇTİ |
| 41 | `sesler[m1:35:a1].ortam_tr` | Cumartesi sabahı evinin yakınındaki duraktasın. Hoparlörden yeni bir anons geliyor. | GEÇTİ |
| 42 | `sesler[m1:35:a1].bolumler[b1].ana_fikir.q_tr` | Bu anonsta en önemli bilgi ne? | GEÇTİ |
| 43 | `sesler[m1:35:a1].bolumler[b1].ana_fikir.opts[0]` | Üç numaralı otobüs bugün çalışmıyor | GEÇTİ |
| 44 | `sesler[m1:35:a1].bolumler[b1].ana_fikir.opts[1]` | Bütün otobüsler geç kalıyor | GEÇTİ |
| 45 | `sesler[m1:35:a1].bolumler[b1].ana_fikir.opts[2]` | Durak taşındı | GEÇTİ |
| 46 | `sesler[m1:35:a1].bolumler[b1].ayrinti[0].q_tr` | Gara gitmek için hangi otobüse binmelisin? | GEÇTİ |
| 47 | `sesler[m1:35:a1].bolumler[b1].ayrinti[0].opts[0]` | yedi numara | GEÇTİ |
| 48 | `sesler[m1:35:a1].bolumler[b1].ayrinti[0].opts[1]` | sekiz numara | GEÇTİ |
| 49 | `sesler[m1:35:a1].bolumler[b1].ayrinti[0].opts[2]` | üç numara | GEÇTİ |
| 50 | `sesler[m1:35:a1].bolumler[b1].ayrinti[1].q_tr` | Yedi numaralı otobüs kaçta kalkıyor? | GEÇTİ |
| 51 | `sesler[m1:35:a1].bolumler[b1].ayrinti[1].opts[0]` | 9.30 | GEÇTİ |
| 52 | `sesler[m1:35:a1].bolumler[b1].ayrinti[1].opts[1]` | 9.15 | GEÇTİ |
| 53 | `sesler[m1:35:a1].bolumler[b1].ayrinti[1].opts[2]` | 10.30 | GEÇTİ |
| 54 | `sesler[m1:35:a1].bolumler[b1].dikte[d1].q_tr` | Hangi sayıyı duydun? | GEÇTİ |
| 55 | `sesler[m1:35:a1].bolumler[b1].dikte[d5].gorev_tr` | Tobi anonsu duymadı. Hangi otobüs kaçta kalkıyor? Almanca kısa söyle. | GEÇTİ |
| 56 | `sesler[m1:35:a1].bolumler[b1].cevapla.situation_tr` | Tobi soruyor. Yedi numaranın saatini söyle. | GEÇTİ |
| 57 | `sesler[m1:35:a1].bolumler[b1].cevapla.why_tr` | Saat için **um** dersin: **um halb zehn**. Dokuz buçuk demektir. | GEÇTİ |
| 58 | `sesler[m1:35:a1].eylem.q_tr` | Gara gitmek istiyorsun. Ne yapmalısın? | GEÇTİ |
| 59 | `sesler[m1:35:a1].eylem.opts[0]` | Dokuz buçuktaki yedi numaralı otobüse bin. | GEÇTİ |
| 60 | `sesler[m1:35:a1].eylem.opts[1]` | Üç numaralı otobüsü bekle. | GEÇTİ |
| 61 | `sesler[m1:35:a1].eylem.opts[2]` | Dokuz on beşteki sekiz numaralı otobüse bin. | GEÇTİ |
| 62 | `sesler[m1:35:a1].eylem.why_tr` | Üç numara bugün çalışmıyor. Yedi numara dokuz buçukta kalkıyor. | GEÇTİ |
| 63 | `sesler[m1:35:a2].title_tr` | Tobi'den akşam mesajı | GEÇTİ |
| 64 | `sesler[m1:35:a2].ortam_tr` | Cuma akşamı telefonuna Tobi'den bir mesaj geliyor. | GEÇTİ |
| 65 | `sesler[m1:35:a2].bolumler[b1].ana_fikir.q_tr` | Tobi neden arıyor? | GEÇTİ |
| 66 | `sesler[m1:35:a2].bolumler[b1].ana_fikir.opts[0]` | Yarın için bir buluşma ayarlıyor | GEÇTİ |
| 67 | `sesler[m1:35:a2].bolumler[b1].ana_fikir.opts[1]` | Kutlamaya gelmiyor | GEÇTİ |
| 68 | `sesler[m1:35:a2].bolumler[b1].ana_fikir.opts[2]` | Arabasını satıyor | GEÇTİ |
| 69 | `sesler[m1:35:a2].bolumler[b1].ayrinti[0].q_tr` | Tobi yarın neyle geliyor? | GEÇTİ |
| 70 | `sesler[m1:35:a2].bolumler[b1].ayrinti[0].opts[0]` | otobüsle | GEÇTİ |
| 71 | `sesler[m1:35:a2].bolumler[b1].ayrinti[0].opts[1]` | arabayla | GEÇTİ |
| 72 | `sesler[m1:35:a2].bolumler[b1].ayrinti[0].opts[2]` | yürüyerek | GEÇTİ |
| 73 | `sesler[m1:35:a2].bolumler[b1].ayrinti[1].q_tr` | Nerede buluşuyorsunuz? | GEÇTİ |
| 74 | `sesler[m1:35:a2].bolumler[b1].ayrinti[1].opts[0]` | gardaki durakta | GEÇTİ |
| 75 | `sesler[m1:35:a2].bolumler[b1].ayrinti[1].opts[1]` | Derya'nın evinde | GEÇTİ |
| 76 | `sesler[m1:35:a2].bolumler[b1].ayrinti[1].opts[2]` | iş yerinde | GEÇTİ |
| 77 | `sesler[m1:35:a2].bolumler[b1].dikte[d1].q_tr` | Hangi kelimeyi duydun? | GEÇTİ |
| 78 | `sesler[m1:35:a2].bolumler[b1].dikte[d5].gorev_tr` | Tobi ile nerede ve kaçta buluşuyorsun? Almanca kısa söyle. | GEÇTİ |
| 79 | `sesler[m1:35:a2].bolumler[b1].cevapla.situation_tr` | Tobi'ye cevap ver. Saat uyuyor. | **GERİ** |
| 80 | `sesler[m1:35:a2].bolumler[b1].cevapla.why_tr` | Saat uyuyorsa **Ja, das passt.** ya da **Ja, das geht.** dersin. | **GERİ** |
| 81 | `sesler[m1:35:a2].eylem.q_tr` | Tobi ile buluşmak için ne yapmalısın? | GEÇTİ |
| 82 | `sesler[m1:35:a2].eylem.opts[0]` | Yarın üçü çeyrek geçe gardaki durağa git. | GEÇTİ |
| 83 | `sesler[m1:35:a2].eylem.opts[1]` | Yarın Tobi'yi annesinin evinden al. | GEÇTİ |
| 84 | `sesler[m1:35:a2].eylem.opts[2]` | Yarın Tobi'nin arabasını tamir et. | GEÇTİ |
| 85 | `sesler[m1:35:a2].eylem.why_tr` | Tobi gardaki durakta, üçü çeyrek geçe buluşmak istiyor. | GEÇTİ |
| 86 | `prova.title_tr` | Hafta kapısı provası: yarınki planın | **GERİ** |
| 87 | `prova.durum_tr` | Cuma molası. Önce Tobi yarın ne yaptığını soruyor, ona samimi anlat. Sonra Herr Wimmer geliyor, ona kibarca anlat. | GEÇTİ |
| 88 | `prova.dugumler[n1].secenekler[0].geri_bildirim_tr` | İki cümleyle planını anlattın. **auf** en sonda, çok iyi. | GEÇTİ |
| 89 | `prova.dugumler[n1].secenekler[1].geri_bildirim_tr` | Zamanla başladın, fiil ikinci yerde. **ein** en sonda. | GEÇTİ |
| 90 | `prova.dugumler[n1].secenekler[2].geri_bildirim_tr` | Tobi'ye **Sie** demezsin. Önce kendi planını **du** ile anlat. | **GERİ** |
| 91 | `prova.dugumler[n2].secenekler[0].geri_bildirim_tr` | Saati ve otobüsü söyledin. Açık ve kısa. | GEÇTİ |
| 92 | `prova.dugumler[n2].secenekler[1].geri_bildirim_tr` | Saati söyledin ve Tobi'yi de çağırdın. Çok doğal. | GEÇTİ |
| 93 | `prova.dugumler[n2].secenekler[2].geri_bildirim_tr` | Tobi saati soruyor. **Um halb drei** gibi bir saat söyle. | GEÇTİ |
| 94 | `prova.dugumler[n3].secenekler[0].geri_bildirim_tr` | Samimi bir veda. Tobi'ye tam uygun. | GEÇTİ |
| 95 | `prova.dugumler[n3].secenekler[1].geri_bildirim_tr` | Tobi ile **du** konuşuyorsun. Ona **Tobi** de. | GEÇTİ |
| 96 | `prova.dugumler[n4].secenekler[0].geri_bildirim_tr` | Kibar ve açık. Şefe **Frau Aksoy** demek daha resmî duyulur. | GEÇTİ |
| 97 | `prova.dugumler[n4].secenekler[1].geri_bildirim_tr` | Planını saat saat anlattın. Tam haftanın hedefi. | GEÇTİ |
| 98 | `prova.dugumler[n4].secenekler[2].geri_bildirim_tr` | Şefine **du** demezsin. **Und Sie? Was machen Sie morgen?** dersin. | GEÇTİ |
| 99 | `prova.dugumler[n5].secenekler[0].geri_bildirim_tr` | **stehe** ikinci yerde, **auf** en sonda. Doğru. | GEÇTİ |
| 100 | `prova.dugumler[n5].secenekler[1].geri_bildirim_tr` | Kısa cevap ve bir cümle daha. Çok doğal. | GEÇTİ |
| 101 | `prova.dugumler[n5].secenekler[2].geri_bildirim_tr` | **auf** ayrılır ve en sona gider: **Ich stehe um neun auf.** | GEÇTİ |
| 102 | `prova.dugumler[n6].secenekler[0].geri_bildirim_tr` | Kibar bir kapanış. **Ihnen auch** size de demek. | GEÇTİ |
| 103 | `prova.dugumler[n6].secenekler[1].geri_bildirim_tr` | Kısa ve kibar. Herkese uyar. | GEÇTİ |
| 104 | `prova.dugumler[n6].secenekler[2].geri_bildirim_tr` | Şefine adıyla seslenmezsin. **Herr Wimmer** de. | GEÇTİ |
| 105 | `prova.kapanis_tr` | Yarınki planını önce Tobi'ye samimi, sonra Herr Wimmer'e kibarca anlattın. Haftanın kapısı bu. | **GERİ** |
| 106 | `okuma_yazma.title_tr` | Herr Wimmer'in panodaki notu | GEÇTİ |
| 107 | `okuma_yazma.sorular[m1:35:o1].q_tr` | Bu not ne hakkında? | GEÇTİ |
| 108 | `okuma_yazma.sorular[m1:35:o1].opts[0]` | Pazartesi günü iş yerindeki plan | GEÇTİ |
| 109 | `okuma_yazma.sorular[m1:35:o1].opts[1]` | Derya'nın doğum günü | GEÇTİ |
| 110 | `okuma_yazma.sorular[m1:35:o1].opts[2]` | Otobüs saatleri | GEÇTİ |
| 111 | `okuma_yazma.sorular[m1:35:o2].q_tr` | Pazartesi iş kaçta başlıyor? | GEÇTİ |
| 112 | `okuma_yazma.sorular[m1:35:o2].opts[0]` | yedide | GEÇTİ |
| 113 | `okuma_yazma.sorular[m1:35:o2].opts[1]` | dokuzda | GEÇTİ |
| 114 | `okuma_yazma.sorular[m1:35:o2].opts[2]` | altıda | GEÇTİ |
| 115 | `okuma_yazma.sorular[m1:35:o3].q_tr` | Vardiya planı nerede? | GEÇTİ |
| 116 | `okuma_yazma.sorular[m1:35:o3].opts[0]` | duvarda | GEÇTİ |
| 117 | `okuma_yazma.sorular[m1:35:o3].opts[1]` | kantinde | GEÇTİ |
| 118 | `okuma_yazma.sorular[m1:35:o3].opts[2]` | Herr Wimmer'in masasında | GEÇTİ |
| 119 | `okuma_yazma.sorular[m1:35:o4].situation_tr` | Tobi notu okumadı, soruyor. İşin saat yedide başladığını söyle. | GEÇTİ |
| 120 | `okuma_yazma.sorular[m1:35:o4].why_tr` | **fängt** ikinci yerde, **an** en sonda: **Die Arbeit fängt um sieben Uhr an.** | GEÇTİ |
| 121 | `okuma_yazma.yazma.gorev_tr` | Ioana yarın ne yaptığını soruyor. Planını üç kısa cümleyle yaz. | GEÇTİ |
| 122 | `okuma_yazma.yazma.kontrol_tr[0]` | Kalkış saatini yazdın mı, **auf** en sonda mı? | GEÇTİ |
| 123 | `okuma_yazma.yazma.kontrol_tr[1]` | Zamanla başlayan cümlede fiil ikinci yerde mi? | GEÇTİ |
| 124 | `okuma_yazma.yazma.kontrol_tr[2]` | Üç ayrı zamanı anlattın mı, sabah, öğleden önce ve öğleden sonra? | GEÇTİ |
| 125 | `gun_sinavi.maddeler[m1:35:s1].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 126 | `gun_sinavi.maddeler[m1:35:s1].why_tr` | **auf** cümlenin sonuna gider. | GEÇTİ |
| 127 | `gun_sinavi.maddeler[m1:35:s2].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 128 | `gun_sinavi.maddeler[m1:35:s2].why_tr` | Meslekten önce **ein** gelmez. | GEÇTİ |
| 129 | `gun_sinavi.maddeler[m1:35:s3].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 130 | `gun_sinavi.maddeler[m1:35:s3].why_tr` | **halb zehn** dokuz buçuk demek. | GEÇTİ |
| 131 | `gun_sinavi.maddeler[m1:35:s4].situation_tr` | Duyduğunu yaz. | GEÇTİ |
| 132 | `gun_sinavi.maddeler[m1:35:s4].why_tr` | **Wie gefällt dir** nasıl buluyorsun demek. | GEÇTİ |
| 133 | `gun_sinavi.maddeler[m1:35:s5].why_tr` | Zamanla başlarsan **stehe** ikinci yerde, **auf** en sonda kalır. | GEÇTİ |
| 134 | `gun_sinavi.maddeler[m1:35:s6].why_tr` | Sevmediğin şey için **nicht gern**, daha çok sevdiğin için **lieber**. | GEÇTİ |
| 135 | `gun_sinavi.maddeler[m1:35:s7].why_tr` | Önce **Danke für die Einladung**, sonra **Ich komme gern**. | GEÇTİ |
| 136 | `gun_sinavi.maddeler[m1:35:s8].why_tr` | İlk derken **erste** kullanırsın. **an der** ile **ersten** olur. | GEÇTİ |
| 137 | `gun_sinavi.maddeler[m1:35:s9].situation_tr` | Tobi soruyor. Yarın öğleden sonra otobüsle Derya'ya gidiyorsun. | GEÇTİ |
| 138 | `gun_sinavi.maddeler[m1:35:s9].why_tr` | Zamanla başla, sonra **fahre ich**: **Am Nachmittag fahre ich mit dem Bus zu Derya.** | GEÇTİ |
| 139 | `gun_sinavi.maddeler[m1:35:s10].situation_tr` | Cuma günü iş çıkışında Herr Wimmer iyi hafta sonları diliyor. Kibarca cevap ver. | GEÇTİ |
| 140 | `gun_sinavi.maddeler[m1:35:s10].why_tr` | Şefine **Danke, Ihnen auch!** dersin. Herkese **Danke, gleichfalls!** uyar. | GEÇTİ |
| 141 | `gun_sinavi.maddeler[m1:35:s11].situation_tr` | Herr Wimmer yarınki planını soruyor. Üç kısa cümleyle anlat. Dokuzda kalk, öğleden önce alışveriş yap, öğleden sonra otobüsle git. | GEÇTİ |
| 142 | `gun_sinavi.maddeler[m1:35:s11].why_tr` | Her cümlede fiil ikinci yerde. İki parçalı fiilin küçük parçası en sonda: **kaufe ich ein**. | GEÇTİ |

### `content/v2/m1/hafta-sonu-testi-05.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `maddeler[m1:35:t01].situation_tr` | Komşun soruyor. Yarın saat yedide kalkıyorsun. | GEÇTİ |
| 2 | `maddeler[m1:35:t01].why_tr` | **auf** en sona gider: **Ich stehe um sieben Uhr auf.** | GEÇTİ |
| 3 | `maddeler[m1:35:t02].why_tr` | **stehe** ikinci yerde, **auf** en sonda durur. | GEÇTİ |
| 4 | `maddeler[m1:35:t03].why_tr` | Daha çok sevdiğin şey için **lieber** dersin. | GEÇTİ |
| 5 | `maddeler[m1:35:t04].situation_tr` | Tobi soruyor. Herr Pichler apartman görevlisi. | GEÇTİ |
| 6 | `maddeler[m1:35:t04].why_tr` | Meslekten önce **ein** gelmez: **Er ist Hausmeister.** | GEÇTİ |
| 7 | `maddeler[m1:35:t05].situation_tr` | Derya seni cumartesi kutlamasına çağırıyor. O gün çalışıyorsun. Kibarca hayır de. | GEÇTİ |
| 8 | `maddeler[m1:35:t05].why_tr` | Önce teşekkür et, sonra **leider** ile kısa bir sebep söyle. | GEÇTİ |
| 9 | `maddeler[m1:35:t06].instr_tr` | Cümleye **Am Samstag** ile başla. | GEÇTİ |
| 10 | `maddeler[m1:35:t06].why_tr` | Zamanla başlarsan fiil yine ikinci yerde kalır: **Am Samstag fahre ich**. | GEÇTİ |
| 11 | `maddeler[m1:35:t07].situation_tr` | Durakta bu anonsu duyuyorsun. Tobi soruyor: gara hangi otobüs gidiyor, kaçta? | GEÇTİ |
| 12 | `maddeler[m1:35:t07].why_tr` | Önce otobüsü, sonra saati söyle: **Nummer vier, um acht Uhr zwanzig.** | GEÇTİ |
| 13 | `maddeler[m1:35:t08].why_tr` | **an der** ile sıra sayısı **zweiten** olur. **ab** en sona gider. | GEÇTİ |
| 14 | `maddeler[m1:35:t09].why_tr` | Doğum gününde **Alles Gute zum Geburtstag!** dersin. | GEÇTİ |
| 15 | `maddeler[m1:35:t10].why_tr` | **anfangen** iki parçalıdır: **fängt** ikinci yerde, **an** en sonda. | GEÇTİ |
| 16 | `maddeler[m1:35:t11].situation_tr` | Biri durağı soruyor. Dümdüz gidip ilk trafik ışığında sağa dönecek. | GEÇTİ |
| 17 | `maddeler[m1:35:t11].why_tr` | Önce **geradeaus**, sonra **an der ersten Ampel rechts**. | GEÇTİ |
| 18 | `maddeler[m1:35:t12].situation_tr` | Ioana soruyor: Wendlfing'i nasıl buluyorsun? Çok beğeniyorsun. | GEÇTİ |
| 19 | `maddeler[m1:35:t12].why_tr` | **Wie gefällt dir** sorusuna **gefällt mir** ile cevap verirsin. | GEÇTİ |

### `content/v2/m1/gorulmemis-05.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `durumlar[m1:h05:g1].durum_tr` | Spor salonundasın. Basti yarın kaçta kalktığını soruyor. Yarın altıda kalkıyorsun. | GEÇTİ |
| 2 | `durumlar[m1:h05:g1].why_tr` | **muss** ile **aufstehen** bütün kalır ve sona gider. **muss** yoksa **auf** ayrılır. | GEÇTİ |
| 3 | `durumlar[m1:h05:g2].durum_tr` | Bürgerbüro'da Frau Schneider bir formu dolduruyor ve mesleğini soruyor. Bir firmada, büroda çalışıyorsun. | GEÇTİ |
| 4 | `durumlar[m1:h05:g2].why_tr` | Meslek sorusuna **Ich arbeite** ile başlayıp yeri söyleyebilirsin. | GEÇTİ |
| 5 | `durumlar[m1:h05:g3].durum_tr` | Kuafördesin. Luka seni cumartesi bir kutlamaya çağırıyor. Cumartesi olmuyor. Teşekkür et ve pazar gününü öner. | GEÇTİ |
| 6 | `durumlar[m1:h05:g3].why_tr` | Teşekkür et, **leider** ile hayır de. Sonra **Geht Sonntag?** diye sor. | GEÇTİ |
| 7 | `durumlar[m1:h05:g4].durum_tr` | Gardasın. Bir adam sana eczanenin yolunu soruyor. Dümdüz, sonra ikinci trafik ışığında sola. | GEÇTİ |
| 8 | `durumlar[m1:h05:g4].why_tr` | Yabancıya **Sie** dersin. Sıra için **an der zweiten Ampel** kullanırsın. | **GERİ** |
| 9 | `durumlar[m1:h05:g5].durum_tr` | Apartman merdiveni. Frau Brandl yarınki planını soruyor. Öğleden önce alışveriş, öğleden sonra otobüsle bir iş arkadaşına gidiyorsun. | GEÇTİ |
| 10 | `durumlar[m1:h05:g5].why_tr` | Zamanla başla, fiil ikinci yerde kalsın. **ein** en sona gider: **kaufe ich ein**. | GEÇTİ |
| 11 | `durumlar[m1:h05:g6].durum_tr` | Kuaförde Luka randevu için haftanı soruyor. Pazartesi ve salı çalışıyorsun, perşembe boşsun. | GEÇTİ |
| 12 | `durumlar[m1:h05:g6].why_tr` | Cümleye günle başla. Fiil hemen arkasından gelir. | GEÇTİ |
| 13 | `durumlar[m1:h05:g7].durum_tr` | Spor salonunda Basti seni bir şey içmeye çağırıyor ve ne sevdiğini soruyor. Sütü seversin, sosisi daha çok seversin. | GEÇTİ |
| 14 | `durumlar[m1:h05:g7].why_tr` | Sevdiğin şey için **gern**, daha çok sevdiğin için **lieber** dersin. | GEÇTİ |

### `content/v2/registry/lexicon/batch-ic5-h5.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `lx:Vorgesetzte.tr` | amir | GEÇTİ |
| 2 | `lx:Vorgesetzte.exp.anlam_tr` | **Vorgesetzte** iş yerinde senden sorumlu olan kişidir. | GEÇTİ |
| 3 | `lx:Vorgesetzte.exp.ne_zaman_tr` | İş yerinde, izin ya da vardiya konuşurken. | GEÇTİ |
| 4 | `lx:Vorgesetzte.exp.ipucu_tr` | Konuşmada çoğu zaman **Chef** ya da **Chefin** denir. | GEÇTİ |
| 5 | `lx:Vorgesetzte.exp.parcalar[0] vor` | önüne | GEÇTİ |
| 6 | `lx:Vorgesetzte.exp.parcalar[1] gesetzt` | konmuş | GEÇTİ |
| 7 | `lx:Vorgesetzte.mistakes_tr[0]` | Amirim derken **mein Vorgesetzte** yanlış. Doğrusu **mein Vorgesetzter**. | GEÇTİ |
| 8 | `lx:Vorgesetzte.mistakes_tr[1]` | Önünde **der** varsa **der Vorgesetzte**, **ein** varsa **ein Vorgesetzter** denir. | GEÇTİ |
| 9 | `lx:Vorgesetzte.mistakes_tr[2]` | Kadın amir için **die Vorgesetzte** ve **meine Vorgesetzte** denir. | GEÇTİ |
| 10 | `lx:Vorgesetzte.forms[0].hint_tr` | Amirimle derken **mit meinem Vorgesetzten** denir. | GEÇTİ |
| 11 | `lx:Vorgesetzte.forms[1].hint_tr` | Amirim derken **mein Vorgesetzter** denir. Sonu **-er** olur. | GEÇTİ |
| 12 | `lx:Vorgesetzte.forms[2].hint_tr` | Kadın amir için **meine Vorgesetzte** denir. | GEÇTİ |
| 13 | `lx:Vorgesetzte.forms[3].hint_tr` | Amir derken **der Vorgesetzte** denir. | GEÇTİ |
| 14 | `lx:Lohn.tr` | ücret, maaş | GEÇTİ |
| 15 | `lx:Lohn.exp.anlam_tr` | **Lohn** çalıştığın için aldığın paradır. | GEÇTİ |
| 16 | `lx:Lohn.exp.ne_zaman_tr` | İş yerinde ve maaş günü konuşurken. | GEÇTİ |
| 17 | `lx:Lohn.exp.ipucu_tr` | Saat başına ücrete **Stundenlohn** denir. | GEÇTİ |
| 18 | `lx:Lohn.mistakes_tr[0]` | Türkçede ikisine de maaş denir. İşçi ücretine çoğu zaman **Lohn** denir. Büroda aylık maaşa **Gehalt** denir. | GEÇTİ |
| 19 | `lx:Lohn.mistakes_tr[1]` | Maaşım az derken **Mein Lohn ist wenig** yanlış. Doğrusu **Mein Lohn ist niedrig** ya da **Ich verdiene wenig**. | GEÇTİ |
| 20 | `lx:Lohn.forms[0].hint_tr` | Maaşımı derken **meinen Lohn** denir. | GEÇTİ |
| 21 | `lx:Lohn.forms[1].hint_tr` | Maaş derken **der Lohn** denir. | GEÇTİ |
| 22 | `lx:Lohn.forms[2].hint_tr` | Daha çok maaş derken **mehr Lohn** denir. | GEÇTİ |
| 23 | `lx:Gehaltsabrechnung.tr` | maaş bordrosu | GEÇTİ |
| 24 | `lx:Gehaltsabrechnung.exp.anlam_tr` | **Gehaltsabrechnung** ne kadar maaş aldığını gösteren aylık belgedir. | GEÇTİ |
| 25 | `lx:Gehaltsabrechnung.exp.ne_zaman_tr` | Maaşın yanlış görünürse ya da bir daireye belge verirken. | GEÇTİ |
| 26 | `lx:Gehaltsabrechnung.exp.ipucu_tr` | Konuşmada kısaca **Abrechnung** da denir. | GEÇTİ |
| 27 | `lx:Gehaltsabrechnung.exp.parcalar[0] Gehalts` | maaş | GEÇTİ |
| 28 | `lx:Gehaltsabrechnung.exp.parcalar[1] abrechnung` | hesap dökümü | GEÇTİ |
| 29 | `lx:Gehaltsabrechnung.mistakes_tr[0]` | Bordro derken **das Gehaltsabrechnung** yanlış. Son parça **die Abrechnung** olduğu için **die Gehaltsabrechnung** denir. | GEÇTİ |
| 30 | `lx:Gehaltsabrechnung.forms[0].hint_tr` | Bordro derken **die Gehaltsabrechnung** denir. | GEÇTİ |
| 31 | `lx:Gehaltsabrechnung.forms[1].hint_tr` | Bordroda derken **auf der Gehaltsabrechnung** denir. | GEÇTİ |
| 32 | `lx:Gehaltsabrechnung.forms[2].hint_tr` | Bordromu derken **meine Gehaltsabrechnung** denir. | GEÇTİ |
| 33 | `lx:Schichtplan.tr` | vardiya planı | GEÇTİ |
| 34 | `lx:Schichtplan.exp.anlam_tr` | **Schichtplan** kimin hangi gün ve saatte çalışacağını gösteren listedir. | GEÇTİ |
| 35 | `lx:Schichtplan.exp.ne_zaman_tr` | İş yerinde, izin ya da hafta sonu konuşurken. | GEÇTİ |
| 36 | `lx:Schichtplan.exp.ipucu_tr` | Gece vardiyasına **Nachtschicht** denir. | GEÇTİ |
| 37 | `lx:Schichtplan.exp.parcalar[0] Schicht` | vardiya | GEÇTİ |
| 38 | `lx:Schichtplan.exp.parcalar[1] plan` | plan | GEÇTİ |
| 39 | `lx:Schichtplan.mistakes_tr[0]` | Vardiya planı derken **die Schichtplan** yanlış. Son parça **der Plan** olduğu için **der Schichtplan** denir. | GEÇTİ |
| 40 | `lx:Schichtplan.forms[0].hint_tr` | Vardiya planı derken **der Schichtplan** denir. | GEÇTİ |
| 41 | `lx:Schichtplan.forms[1].hint_tr` | Yeni vardiya planını derken **den neuen Schichtplan** denir. | GEÇTİ |
| 42 | `lx:Schichtplan.forms[2].hint_tr` | Vardiya planına derken **auf den Schichtplan** denir. | GEÇTİ |
| 43 | `lx:Bahnsteig.tr` | peron | GEÇTİ |
| 44 | `lx:Bahnsteig.exp.anlam_tr` | **Bahnsteig** garda trene bindiğin ve indiğin yerdir. | GEÇTİ |
| 45 | `lx:Bahnsteig.exp.ne_zaman_tr` | Garda, treni beklerken ve ararken. | GEÇTİ |
| 46 | `lx:Bahnsteig.exp.ipucu_tr` | Anonslarda peron numarası çoğu zaman **Gleis** ile söylenir. | GEÇTİ |
| 47 | `lx:Bahnsteig.exp.parcalar[0] Bahn` | tren | GEÇTİ |
| 48 | `lx:Bahnsteig.exp.parcalar[1] steig` | biniş yeri | GEÇTİ |
| 49 | `lx:Bahnsteig.mistakes_tr[0]` | Peronda bekliyorum derken **Ich warte im Bahnsteig** yanlış. Doğrusu **Ich warte auf dem Bahnsteig**. | GEÇTİ |
| 50 | `lx:Bahnsteig.forms[0].hint_tr` | Peronda derken **auf dem Bahnsteig** denir. | GEÇTİ |
| 51 | `lx:Bahnsteig.forms[1].hint_tr` | Peron derken **Bahnsteig** denir. Anonsta **Gleis** de duyulur. | GEÇTİ |
| 52 | `lx:Bahnsteig.forms[2].hint_tr` | Peronda derken **auf dem Bahnsteig** denir. | GEÇTİ |
| 53 | `lx:Fahrplan.tr` | sefer tarifesi | GEÇTİ |
| 54 | `lx:Fahrplan.exp.anlam_tr` | **Fahrplan** otobüs ve trenlerin hangi saatte geldiğini gösteren listedir. | GEÇTİ |
| 55 | `lx:Fahrplan.exp.ne_zaman_tr` | Durakta, garda ya da uygulamada saate bakarken. | GEÇTİ |
| 56 | `lx:Fahrplan.exp.ipucu_tr` | Durakta asılı küçük tabloya da **Fahrplan** denir. | GEÇTİ |
| 57 | `lx:Fahrplan.exp.parcalar[0] Fahr` | yolculuk | GEÇTİ |
| 58 | `lx:Fahrplan.exp.parcalar[1] plan` | plan | GEÇTİ |
| 59 | `lx:Fahrplan.mistakes_tr[0]` | Otobüs saatlerine bakayım derken **Uhr** kelimesi kullanılmaz. **Ich schau mal auf den Fahrplan** denir. | GEÇTİ |
| 60 | `lx:Fahrplan.forms[0].hint_tr` | Tarifeye derken **auf den Fahrplan** denir. | GEÇTİ |
| 61 | `lx:Fahrplan.forms[1].hint_tr` | Tarife derken **den Fahrplan** denir. | GEÇTİ |
| 62 | `lx:Fahrplan.forms[2].hint_tr` | Tarifede derken **im Fahrplan** denir. | GEÇTİ |
| 63 | `lx:Abfahrt.tr` | kalkış | GEÇTİ |
| 64 | `lx:Abfahrt.exp.anlam_tr` | **Abfahrt** trenin ya da otobüsün yola çıktığı andır. | GEÇTİ |
| 65 | `lx:Abfahrt.exp.ne_zaman_tr` | Garda, tabelada ve yolculuk planlarken. | GEÇTİ |
| 66 | `lx:Abfahrt.exp.ipucu_tr` | Tren için **Der Zug fährt um acht ab** de denir. | GEÇTİ |
| 67 | `lx:Abfahrt.exp.parcalar[0] ab` | ayrılış | GEÇTİ |
| 68 | `lx:Abfahrt.exp.parcalar[1] Fahrt` | yolculuk | GEÇTİ |
| 69 | `lx:Abfahrt.mistakes_tr[0]` | Tren kalkıyor derken **Der Zug steht auf** yanlış. Doğrusu **Der Zug fährt ab**. | GEÇTİ |
| 70 | `lx:Abfahrt.mistakes_tr[1]` | Türkçedeki kalkmak burada **aufstehen** değildir. Kalkışın adı **die Abfahrt**. | GEÇTİ |
| 71 | `lx:Abfahrt.forms[0].hint_tr` | Kalkış derken **die Abfahrt** denir. | GEÇTİ |
| 72 | `lx:Abfahrt.forms[1].hint_tr` | Kalkıştan önce derken **vor der Abfahrt** denir. | GEÇTİ |
| 73 | `lx:Abfahrt.forms[2].hint_tr` | Kalkışa kadar derken **bis zur Abfahrt** denir. | GEÇTİ |
| 74 | `lx:Fahrschein.tr` | bilet | GEÇTİ |
| 75 | `lx:Fahrschein.exp.anlam_tr` | **Fahrschein** otobüs, tramvay ve trende geçerli bilettir. | GEÇTİ |
| 76 | `lx:Fahrschein.exp.ne_zaman_tr` | Otomatta, otobüste ve bilet kontrolünde. | GEÇTİ |
| 77 | `lx:Fahrschein.exp.ipucu_tr` | Bazı biletler binmeden önce makinede damgalanır, buna **entwerten** denir. | GEÇTİ |
| 78 | `lx:Fahrschein.exp.parcalar[0] Fahr` | yolculuk | GEÇTİ |
| 79 | `lx:Fahrschein.exp.parcalar[1] schein` | belgesi | GEÇTİ |
| 80 | `lx:Fahrschein.mistakes_tr[0]` | Bilet derken **die Fahrschein** yanlış. Doğrusu **der Fahrschein**. Aynı anlamdaki **Fahrkarte** ise **die** alır. | GEÇTİ |
| 81 | `lx:Fahrschein.forms[0].hint_tr` | Bir bilet derken **einen Fahrschein** denir. | GEÇTİ |
| 82 | `lx:Fahrschein.forms[1].hint_tr` | Biletiniz derken **Ihren Fahrschein** denir. | GEÇTİ |
| 83 | `lx:Fahrschein.forms[2].hint_tr` | Biletimi derken **meinen Fahrschein** denir. | GEÇTİ |
| 84 | `lx:Zugausfall.tr` | tren iptali | GEÇTİ |
| 85 | `lx:Zugausfall.exp.anlam_tr` | **Zugausfall** bir tren seferinin iptal olmasıdır. | GEÇTİ |
| 86 | `lx:Zugausfall.exp.ne_zaman_tr` | Garda, anonslarda ve işe geç kalınca. | GEÇTİ |
| 87 | `lx:Zugausfall.exp.ipucu_tr` | Anonsta çoğu zaman **Der Zug fällt heute aus** duyarsın. | GEÇTİ |
| 88 | `lx:Zugausfall.exp.parcalar[0] Zug` | tren | GEÇTİ |
| 89 | `lx:Zugausfall.exp.parcalar[1] ausfall` | iptal | GEÇTİ |
| 90 | `lx:Zugausfall.mistakes_tr[0]` | Tren iptal oldu derken **Der Zug ist abgesagt** denmez. Doğrusu **Der Zug fällt aus**. | GEÇTİ |
| 91 | `lx:Zugausfall.forms[0].hint_tr` | Tren iptali derken **einen Zugausfall** denir. | GEÇTİ |
| 92 | `lx:Zugausfall.forms[1].hint_tr` | Tren iptali derken **einen Zugausfall** denir. | GEÇTİ |
| 93 | `lx:Zugausfall.forms[2].hint_tr` | Tren iptalinde derken **bei einem Zugausfall** denir. | GEÇTİ |

### `content/v2/registry/grammar.json`

| # | alan | açıklama | karar |
|---|---|---|---|
| 1 | `gr:a1-05:t4.h_tr` | İki parçalı fiiller: aufstehen, Ich stehe um sieben auf | GEÇTİ |
| 2 | `gr:a1-05:t4.tr` | Bazı fiillerin başında küçük bir parça vardır: **auf**stehen, **an**fangen, **ein**kaufen, **an**rufen. Cümlede bu parça ayrılır ve cümlenin en sonuna gider. **Ich stehe um sieben auf**. Saat yedide kalkarım. Fiilin geri kalanı yine ikinci yerde durur. **frühstücken** ayrılmaz: **Ich frühstücke um acht**. | GEÇTİ |
| 3 | `gr:a1-05:t5.h_tr` | Cümleye zamanla başlamak: fiil yine ikinci yerde | GEÇTİ |
| 4 | `gr:a1-05:t5.tr` | Almancada düz cümlede fiil hep ikinci yerdedir. Cümleye zamanla başlarsan kişi fiilin arkasına geçer. **Ich arbeite am Montag** cümlesi **Am Montag arbeite ich** olur. **Am Montag ich arbeite** yanlıştır, Türkçe konuşanlar bunu çok yapar. İki parçalı fiilin küçük parçası yine en sonda kalır. | GEÇTİ |
| 5 | `gr:a1-08:t1.h_tr` | Meslekler: der Lehrer, die Lehrerin | GEÇTİ |
| 6 | `gr:a1-08:t1.tr` | Çoğu meslek adının bir erkek, bir kadın biçimi vardır. Kadın biçimi çoğu zaman sona **in** eklenerek yapılır. Kadın biçiminin önünde hep **die** durur: **der Lehrer**, **die Lehrerin**. Bazı kelimelerde a harfi ä, o harfi ö olur: **der Arzt**, **die Ärztin**. Birden çok kadın için sona **innen** gelir: **die Lehrerinnen**. | GEÇTİ |
| 7 | `gr:a1-08:t2.h_tr` | Meslek söylemek: Ich bin Lehrerin | GEÇTİ |
| 8 | `gr:a1-08:t2.tr` | Mesleğini söylerken önüne **ein** ya da **eine** koymazsın. **Ich bin Lehrerin**. Öğretmenim. **Ich arbeite als Koch**. Aşçı olarak çalışıyorum. Mesleği sorarken **Was sind Sie von Beruf**? dersin. Arkadaşına **Was bist du von Beruf**? diye sorarsın. | GEÇTİ |
| 9 | `gr:a1-06:t3.h_tr` | Sevdiğini söylemek: gern, nicht gern, lieber | GEÇTİ |
| 10 | `gr:a1-06:t3.tr` | Bir şeyi yapmayı sevdiğini söylemek için fiilin arkasına **gern** koyarsın. **Ich trinke gern Kaffee**. Kahve içmeyi severim. Sevmiyorsan **nicht gern** dersin. Başka bir şeyi daha çok seviyorsan **lieber** dersin. **Ich trinke lieber Tee**. Çay içmeyi daha çok severim. Konuşmada **gerne** de çok duyarsın. | GEÇTİ |
| 11 | `gr:a1-14:t4.h_tr` | Davet etmek, kabul etmek, kibarca hayır demek | GEÇTİ |
| 12 | `gr:a1-14:t4.tr` | Davet ederken **Hast du am Samstag Zeit**? ya da **Hast du Lust**? dersin. Kabul ederken **Ja, gern**! ya da **Ich komme gern** dersin. Gelemiyorsan önce teşekkür et. Sonra kısa bir sebep söyle. **Danke, aber ich kann leider nicht. Ich muss arbeiten**. | GEÇTİ |
| 13 | `gr:a1-14:t5.h_tr` | Tebrik ve iyi dilek cümleleri | GEÇTİ |
| 14 | `gr:a1-14:t5.tr` | Tebrik cümleleri hep aynı kalır, olduğu gibi öğren. Doğum gününde **Alles Gute zum Geburtstag**! dersin. **Herzlichen Glückwunsch**! de çok duyulur. Noel için **Frohe Weihnachten**!, yeni yıl için **Ein gutes neues Jahr**! dersin. Almanya'da doğum gününü önceden kutlamak uğursuz sayılır. | GEÇTİ |
| 15 | `gr:a1-11:t3.h_tr` | Neyle gidiyorsun? mit dem Bus, mit der S-Bahn | GEÇTİ |
| 16 | `gr:a1-11:t3.tr` | Hangi araçla gittiğini **mit** ile söylersin. **der Bus** burada **mit dem Bus** olur. **die S-Bahn** burada **mit der S-Bahn** olur. Araçla giderken fiil **fahren** olur: **Ich fahre mit dem Bus**. Yürüyorsan **Ich gehe zu Fuß** dersin. | GEÇTİ |
| 17 | `gr:a1-11:t4.h_tr` | Yol sormak ve yol tarif etmek | GEÇTİ |
| 18 | `gr:a1-11:t4.tr` | Yol sorarken önce **Entschuldigung** dersin. Sonra **Wie komme ich zum Bahnhof**? diye sorarsın. **zum** ve **zur** kelimelerini şimdilik yer adıyla birlikte öğren: **zum Bahnhof**, **zur Post**. Tarifte **Gehen Sie geradeaus** gibi cümleler duyarsın. **links** sol, **rechts** sağ demektir. | GEÇTİ |
| 19 | `gr:a1-11:t5.h_tr` | Birinci, ikinci, üçüncü: die erste Straße | GEÇTİ |
| 20 | `gr:a1-11:t5.tr` | Birinci, ikinci gibi sözler çoğu zaman sayıya **te** eklenerek yapılır. **vier** sayısı **vierte**, **fünf** sayısı **fünfte** olur. Dört tanesi farklıdır: **erste**, **dritte**, **siebte**, **achte**. Yirmiden başlayarak **ste** eklenir: **zwanzigste**. Yol tarifinde **die erste Straße links** dersin. Önünde **an der** varsa sona **n** gelir: **an der zweiten Ampel**. | GEÇTİ |
