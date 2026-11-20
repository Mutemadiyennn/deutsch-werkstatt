# 1. gün halkaları: yazar notu (PM-078 B ve C, İÇ adım 2)

Dosya: `gun-01-halkalar.json`. Kartlar ve sıra değişmedi. 25 kart × 2 = **50 yeni görev cümlesi** ve 5 mini sahne (19 satır, 5 anlama sorusu) yazıldı. *(ilk taslak, artık yok)* Dosyada 20 sahne satırı var (5 × 4).
Denetim: `halka_kontrol.py` → **0 hata, 0 not**. Görev cümlelerinin hepsinde bilinmeyen 0, sahne satırlarının hepsinde de 0 (işaretli sözcük gerekmedi). *(ilk taslak, artık yok)* Sıkılaşan betikle 14 hata çıktı; son durum aşağıda, "İnceleme #163 sonrası".
Ek denetim (betik dışı, elle): 50 cümlenin hiçbiri `content/v2/**` içindeki bir cümleyle (günler, dersler, sözlük örnekleri ve boşluk cümleleri) birebir aynı değil. Halka içinde ve halkalar arasında tekrar yok.

## Halka halka

**h1 Selam ve teşekkür (dersten önce).** En dar küme bu halkada: yalnızca hallo, danke, bitte, Frau, Herr, çerçeve sözcükleri ve adlar var. *(ilk taslak, artık yok)* Şimdi Herr yerine ja var. `ist`, `guten`, `hier` dersten önce bilinmiyor. Bu yüzden cümleler fiilsiz hitap kalıpları: „Hallo? Frau Huber?“ (telefon), „Danke, Frau Stadler!“, „Das, bitte.“ (fırında parmakla göstererek), „Danke, Herr Dr. Weber!“. *(ilk taslak, artık yok)* Gerçek hayatta en çok söylenen biçimler de bunlar. Frau ile Herr aynı yapıda („Hallo, Frau Brandl!“ / „Hallo, Herr Pichler!“), böylece hitap karşıtlığı görünüyor. *(ilk taslak, artık yok)* „Hallo, Herr Pichler!“ h5'e taşındı. Sahne fırında geçiyor. Soru „Ja, bitte?“ sözünün „buyurun, ne istersiniz?“ anlamını yokluyor, çünkü bitte'nin bu kullanımı Türkçe konuşan için en az tahmin edilen anlam.

**h2 Hafta içi.** Dersten sonra `ist`, `war`, `geht`, `guten Tag`, `hier ist` *(ilk taslak, artık yok: betik `hier`'i artık yalnızca „hier ist {name}“ kalıbında bilir, „burada“ anlamında bilmez)*, `welcher`, `bis` ve dersin bütün kart sözcükleri biliniyor. Cümleler randevu pazarlığı ve gün sorma üstüne kurulu: „Am Montag geht es nicht.“, „Montag? Nicht Dienstag?“ (telefonda doğrulama), „Mittwoch geht nicht, aber Donnerstag geht.“. Sahne Frau Huber'le telefonda geçiyor ve perşembede anlaşılıyor. Cuma bilerek seçilmedi: gün 1'in ses kaydı „Heute, am Freitag, ist die Praxis geschlossen.“ diyor.

**h3 Hafta sonu ve hafta.** „Am Sonntag ist alles zu.“ (Almanya'da pazar gerçeği) *(ilk taslak, artık yok)*, „Diese Woche geht es nicht.“, „Welcher Tag geht?“. Sahne merdivende Frau Brandl'la geçiyor: Frau Brandl günü karıştırıyor, sen düzeltiyorsun. Bu, öğrencinin ilk düzeltme cümlesi („Nicht Samstag, Frau Brandl. Heute ist Sonntag.“). Brandl'ın kendi ağzı yok, sahnede Bairisch kullanılmadı.

**h4 Bugün, yarın, dün.** Göreli günler cümlede başka bir günle eşleşiyor: „Vorgestern war Montag.“ *(ilk taslak, artık yok)*, „Ist übermorgen Freitag?“, „Morgen geht es nicht, aber übermorgen geht.“ *(ilk taslak, artık yok; dosyada „… übermorgen geht es.“)*. Sahne Ioana'yla geçiyor. Soru bir çıkarım istiyor: „Öbür gün cuma“ deniyorsa bugün çarşambadır. Bu soru öteki dört sorudan biraz zor. Zor geliyorsa okur turunda düz bir soruya çevrilebilir („Hangi günde anlaşıyorlar?“ → Cuma).

**h5 Muayenehane kapalı mı?** „Ist das die Praxis Dr. Weber?“ *(ilk taslak, artık yok)*, „Geschlossen? Heute?“, „Nein, nicht Montag – Dienstag.“. Sahne Frau Huber'le telefonda geçiyor: cumartesi olmuyor, çünkü hafta sonu kapalı (gün 1'in ses kaydı ve sınavıyla tutarlı); pazartesi olur.

## Zorlandığım yerler ve kararlar

- **„ja“ çift kart.** `ja` hem çerçeve (`card:false`) hem 5. halkada kart. Betik onu her halkada bilinen sayıyor, bu yüzden h1–h4'te de kullandım. Kart olarak ilk kez h5'te soruluyor. Bu doğruysa sorun yok; ANA'nın sayacı aynı kararı vermeli. *(ilk taslak, artık yok)* lx:ja artık h1'de.
- **„nein“ h5'e kadar bilinmiyor.** h1–h4'te „hayır“ demek gerekince „Nicht Samstag …“ ya da „… geht nicht“ kullandım. Kalıp doğal ama 1. günün ilk dört halkasında „Nein“ diyememek tuhaf. Öneri (İÇ'e): `nein` h1'e alınsın; o zaman `bitte` ya da `Herr` gibi bir kartla yer değiştirmesi gerekir. Kartlar sabit olduğu için dokunmadım.
- **„ja“ = „tamam“.** „Ja, bis Montag!“ cümlesini „Tamam, pazartesi görüşürüz!“ diye çevirdim, çünkü burada „Evet“ Türkçede yapay kaçıyor. Okur OD-9 açısından baksın; kartın anlamı „evet“. *(ilk taslak, artık yok)*
- **„Am Sonntag ist alles zu.“** Gündelik bir abartı. Sözlükte „Sonntags hat die Bäckerei Stadler bis elf offen.“ örneği var, yani dünyada her yer kapalı değil. Türkçesi „her yer kapalı“ aynı abartıyı taşıyor. Dilbilimci uygun görmezse „Am Sonntag ist viel zu“ gibi bir biçim bilinmeyen sözcük getiriyor (`viel`). Bu yüzden şimdilik böyle bıraktım. *(ilk taslak, artık yok)*
- **Yinelenen cümleler.** İlk taslakta 6 cümle başka günlerde ya da sözlük örneklerinde zaten vardı („Danke für alles!“, „Übermorgen ist Samstag.“, „Welcher Tag ist morgen?“, „Ich gehe morgen in die Praxis.“, „Ja, danke!“, „Danke, Ioana!“, prova'daki „Ja, Dienstag geht.“). Hepsini yenileriyle değiştirdim.
- **Kapı kendi başına darlaştırıyor.** Dersten önce `ist` olmadığı için h1 fiilsiz kalıyor. Dersten sonra elde yalnızca `ist/war/geht` var: `bin`, `habe`, `gut`, `schön`, `frei`, `Zeit` ve `dann` yok. Bu yüzden h2–h5 cümleleri çoğunlukla „X geht (nicht)“ ve „Heute ist X“ çevresinde dönüyor. Çeşitliliği soru biçimi, doğrulama („X? Nicht Y?“), karşıtlık („…, aber …“) ve hitapla sağlamaya çalıştım. C ölçümündeki öneriler (sein ve haben 1. günden çerçeve; kalıplar kümeye girsin) kabul edilirse 2. halkadan itibaren „Ich habe am Montag frei“ ya da „Schönes Wochenende!“ gibi daha canlı cümleler açılır.
- **Sahnelerde bağlam.** Şemada sahneyi anlatan Türkçe satır (`sahne_tr`) yok. Örneğin h4'te Ioana'nın neden „Geht es morgen?“ diye sorduğu (birlikte pratik) metinde geçmiyor; „üben“ ve „wollen“ birlikte iki bilinmeyen oluyordu. Öneri (ANA'ya): sahneye isteğe bağlı bir `ortam_tr` alanı eklensin (seslerdeki gibi).
- **Ad yer tutucusu.** `{name}` iki öğrenci satırında (h2, h5) ve bir Ioana satırında (h4) var; üçünde de `de_adsiz` ve `tr_adsiz` yazıldı. Görev cümlelerinde `{name}` kullanmadım: dikte ve yapboz için adsız tek biçim daha güvenli.

## Sonraki adım

dilbilimci → okur (OD-9). İnceleme `docs/v2/reviews/` altına yazılır; yazar bu dosyaya artık dokunmaz.

## İnceleme #163 sonrası

Kaynak: inceleme yorumu 7043269264 (4 engelleyici bulgu) + sıkılaşan `olcum.py` (gösterilen biçimler, eşadlı çerçeve, kalıp içi `hier`, `zu`) + kart değişimi (lx:ja h1'e, lx:Herr h5'e) + ek kural ("das" zamir olarak yok). Her kartta `gorev_cumleleri` içinde yine tam 2 cümle. h1'de ist/guten/hier/bis yok.

Görev cümleleri (eski → yeni):

| Halka · kart | Eski | Yeni | Neden |
|---|---|---|---|
| h1 · bitte | „Das, bitte.“ / Şunu lütfen. | „Bitte, Tobi!“ / Rica ederim Tobi! | das zamiri (bulgu 4) |
| h1 · bitte | „Ja, bitte.“ / Evet, lütfen. | „Ja, bitte, Frau Stadler.“ / Evet, lütfen Stadler Hanım. | sahnedeki „Ja, bitte?“ (Buyurun?) ile aynı Almanca, farklı Türkçe (N7); sözlükte aynı örnek var |
| h1 · ja | „Ja, bis Montag!“ / Evet, pazartesi görüşürüz! | „Ja, für Ioana.“ / Evet, Ioana için. | h1'de Montag ve bis bilinmiyor |
| h2 · Donnerstag | „Am Donnerstag? Ja, das geht.“ / Perşembe günü mü? Evet, olur. | „Am Donnerstag geht es, Frau Huber.“ / Perşembe günü olur Huber Hanım. | das zamiri |
| h2 · Freitag | „Heute ist Freitag!“ / Bugün cuma! | „Gestern war Freitag.“ / Dün cumaydı. | dersteki „Heute ist Freitag.“ ile aynı |
| h3 · Sonntag | „Am Sonntag ist Tobi nicht hier.“ / Tobi pazar günü burada değil. | „Gestern war Sonntag, nicht Samstag.“ / Dün pazardı, cumartesi değil. | hier (bulgu 2) |
| h3 · Sonntag | „Und am Sonntag? Geht das?“ / Peki pazar günü? Olur mu? | „Und am Sonntag? Geht es?“ / (Türkçe aynı) | das zamiri |
| h3 · Woche | „Diese Woche ist Ioana nicht hier.“ / Ioana bu hafta burada değil. | „Nicht diese Woche, Frau Huber.“ / Bu hafta değil Huber Hanım. | hier |
| h4 · heute | „Ist Herr Wimmer heute hier?“ / Wimmer Bey bugün burada mı? | „Heute ist Wochenende, Tobi!“ / Bugün hafta sonu Tobi! | hier; Herr artık h5'te |
| h4 · gestern | „Gestern war Tobi nicht hier.“ / Tobi dün burada değildi. | „War gestern Dienstag?“ / Dün salı mıydı? | hier |
| h4 · vorgestern | „Vorgestern war Montag.“ / Evvelsi gün pazartesiydi. | „Vorgestern war Donnerstag.“ / Evvelsi gün perşembeydi. | dersin r0:01:d19 örnek cevabıyla aynı |
| h4 · vorgestern | „Ioana war vorgestern hier.“ / Ioana evvelsi gün buradaydı. | „Heute ist Montag, vorgestern war Samstag.“ / Bugün pazartesi, evvelsi gün cumartesiydi. | hier |
| h5 · gehen | „Gehst du heute zu Dr. Weber?“ / Bugün Dr. Weber'e gidiyor musun? | „Montag geht nicht, Herr Wimmer.“ / Pazartesi olmuyor Wimmer Bey. | gehst ve zu öğretilmedi (bulgu 3) |
| h5 · Praxis | „Ist das die Praxis Dr. Weber?“ / Orası Dr. Weber muayenehanesi mi? | „Hallo? Praxis Dr. Weber?“ / Alo? Dr. Weber muayenehanesi mi? | das zamiri |
| h5 · Praxis | „Ich gehe am Montag in die Praxis.“ / Pazartesi günü muayenehaneye gidiyorum. | „Ist die Praxis am Samstag geschlossen?“ / Muayenehane cumartesi günü kapalı mı? | gehe ve „in die“ öğretilmedi (bulgu 3) |

Taşınan (metin aynı, PM kart değişimiyle): „Danke, Herr Wimmer!“ ve „Hallo, Herr Pichler!“ h1'den h5'e (lx:Herr); „Ja, danke, Frau Huber.“ h5'ten h1'e (lx:ja).

Sahne satırları (eski → yeni):

| Halka · satır | Eski | Yeni | Neden |
|---|---|---|---|
| h1 · 2 (öğrenci) | „Hallo, Frau Stadler! Das, bitte.“ / Merhaba Stadler Hanım! Şunu lütfen. | „Hallo, Frau Stadler! Für Lechner, bitte.“ / Merhaba Stadler Hanım! Lechner adına, lütfen. | das zamiri; Tobi'nin (Lechner) siparişini alıyorsun |
| h4 · 3 (Ioana) | „Übermorgen ist Freitag. Ja, das geht!“ / Öbür gün cuma. Evet, olur! | „Übermorgen ist Freitag. Ja, Freitag geht!“ / Öbür gün cuma. Evet, cuma olur! | das zamiri |

Denetim: `halka_kontrol.py` → **0 hata, 2 not** (iki not da „Guten Tag, hier ist {name}.“ sahne satırlarında, h2 ve h5; kalıp gösterimi). Değişen ve yeni bütün cümleler `content/v2/**` içinde birebir yok; dosya içinde tekrar yok. Sahnede görev cümlesiyle aynı Almanca iki yerde var, Türkçeleri aynı (h2 „Am Montag geht es nicht.“, h4 „Geht es morgen?“).

Açık kalan (dokunmadım):
- „Geht es am Freitag?“ (h2) ve „Ja, Mittwoch geht.“ (h5) derslerin ve gün 1'in `accepted` listelerinde kabul edilen biçim olarak geçiyor (r0:01:d20, d32; m1:01:a2:c1). Örnek cevap (accepted[0]) değiller; değiştirmek gerekirse İÇ karar versin.
- „Heute ist Dienstag, ja?“ (h2): inceleme öneriyordu ("değil mi" iki yapıya gidiyor); artık bilinmeyen yok, değiştirmedim.
- h1'de `für` artık üç yerde (görev „Danke für alles“, „Ja, für Ioana.“, sahne). Çerçeve sözcüğün ilk geçişi üretim olmasın kuralı gelirse „Danke für alles“ gösterime alınabilir.


## 2. sürüm (PM #163 kararları)

Kaynak: PM yorumu 7043400862 ve yanıtımız 7043833545. Gruplar ve kalıplar baş geliştiricinin verdiği gibi (bir kart, ilk kullanıldığı halkanın kartıdır). Günün dersi varsayılmıyor. Her kartta `gorev_cumleleri` içinde yine tam 2 cümle var. 50 cümlenin 41'i aynen kaldı, 9'u değişti.

Denetim: `halka_kontrol.py` → **0 hata, 0 not**. Görev cümlelerinde, `accepted` listelerinin bütün öğelerinde ve sahne satırlarında bilinmeyen sözcük yok (halka bazında ayrı betikle denetlendi). Dosya içinde aynı cümle iki kez geçmiyor. Yeni cümlelerin ve sahne satırlarının hiçbiri `content/v2/**` içinde yok (noktalama ve büyük harf yok sayılarak karşılaştırıldı).

### Değişen görev cümleleri (eski → yeni)

| Halka · kart | Eski | Yeni | Neden |
|---|---|---|---|
| h2 · heute | „Heute geht es nicht.“ | „Heute? Ja, bitte!“ / Bugün mü? Evet, lütfen! | `geht` h3'te geliyor |
| h2 · heute | „Heute ist Wochenende, Tobi!“ | „Danke, heute nicht.“ / Sağ olun, bugün değil. | `Wochenende` h4'te geliyor |
| h2 · Montag | „Am Montag geht es nicht.“ | „Ja, am Montag, Frau Huber.“ / Evet, pazartesi günü Huber Hanım. | `geht` h3'te geliyor |
| h2 · Mittwoch | „Mittwoch geht nicht, aber Donnerstag geht.“ | „Nein, heute ist Mittwoch.“ / Hayır, bugün çarşamba. | `geht` ve `Donnerstag` h3'te geliyor |
| h2 · nein | „Nein, heute geht es nicht.“ | „Nein, danke, Tobi.“ / Yok, sağ ol Tobi. | `geht` h3'te geliyor |
| h3 · Freitag | „Gestern war Freitag.“ | „Freitag geht nicht, Herr Pichler.“ / Cuma olmuyor Pichler Bey. | `gestern` ve `war` h5'te geliyor; yeni cümle h3 kalıbını („… geht nicht.“) kullanıyor |
| h4 · Sonntag | „Gestern war Sonntag, nicht Samstag.“ | „Morgen ist Sonntag!“ / Yarın pazar! | `gestern` ve `war` h5'te geliyor |
| h5 · gehen | „Montag geht nicht, Herr Wimmer.“ | „Wir gehen heute in die Praxis.“ / Bugün muayenehaneye gidiyoruz. | kart artık „gitmek“ anlamında; „olur“ anlamı h3 kalıbında |
| h5 · gehen | „Ja, Mittwoch geht.“ | „Gehen Sie morgen in die Praxis, Herr Wimmer?“ / Yarın muayenehaneye gidiyor musunuz Wimmer Bey? | aynı neden; yalnızca `gehen` biçimi kullanıldı (gehe, geht yok) |

### Kabul listeleri

Her görev cümlesine `accepted` eklendi. Her listede 3 öğe var ve ilk öğe `de`'nin aynısı. Ötekiler:
- doğru başka kelime sıraları: „Heute gehen wir in die Praxis.“, „Herr Pichler, Freitag geht nicht.“;
- doğal eş söyleyişler: „geht“ / „geht es“, „am Montag“ / „Montag“, „Ist heute Dienstag?“ / „Heute ist Dienstag, ja?“, „…, nicht?“ soru eki, „doch“ ve „ja“ küçük sözcükleri, „in die Praxis“ / „zur Praxis“.

Yalnızca noktalama ya da büyük harf farkı olan öğe yok. Adlı cümlelerde ad değişmedi.

### Kalıp çevirileri

- „Heute ist …“ → „Bugün …“, „Geht …?“ → „… olur mu?“, „… geht nicht.“ → „… olmuyor.“, „Guten Tag“ → „İyi günler“: doğal, değişmedi.
- „Gestern war …“: „Dün …“ yerine **„Dün … idi“** oldu. Geçmiş zaman Türkçede de görünsün diye. Örnek cümlelerde ek kaynaşıyor („Dün cumaydı“), kalıpta açık biçim daha anlaşılır.

### Yeni mini sahneler

| Halka | ortam_tr | Satırlar | Soru (doğru cevap) |
|---|---|---|---|
| h1 | Bäckerei Stadler, tezgâhın önü; Tobi'nin siparişini almaya geldin | Stadler: „Hallo! Ja, bitte?“ / Sen: „Hallo, Frau Stadler! Für Tobi, bitte.“ / Stadler: „Ja, für Tobi. Bitte!“ | „Ja, bitte?“ burada ne demek? (Buyurun, ne istersiniz?) |
| h2 | Apartman merdiveni, sabah; alt kattaki komşun Brandl Hanım'la karşılaşıyorsun | Brandl: „Hallo! Heute ist Montag, ja?“ / Sen: „Nein, Frau Brandl. Heute ist Dienstag.“ / Brandl: „Dienstag? Ach ja! Danke!“ | Brandl Hanım bugünü hangi gün sanıyor? (Pazartesi) |
| h3 | Telefon; aile hekimin Dr. Weber'in muayenehanesinden sekreter Huber Hanım arıyor | Huber: „Hallo! Geht es morgen, am Donnerstag?“ / Sen: „Nein, morgen geht nicht. Geht Freitag?“ / Huber: „Freitag … ja, Freitag geht.“ / Sen: „Danke, Frau Huber! Bis Freitag!“ | Randevu hangi güne kalıyor? (Cuma) |
| h4 | İş yerinde, şefin Wimmer Bey'in kapısı; hafta sonu vardiyası konuşuluyor | Wimmer: „Guten Tag! Am Wochenende … geht Samstag?“ / Sen: „Samstag? Nein, Samstag geht nicht, Herr Wimmer.“ / Wimmer: „Und Sonntag?“ / Sen: „Ja, am Sonntag geht es.“ | Bu hafta sonu hangi gün sana uyuyor? (Pazar) |
| h5 | Telefon; Dr. Weber'in muayenehanesini arıyorsun, Huber Hanım açıyor | Sen: „Guten Tag! Geht es morgen?“ / Huber: „Nein, morgen ist die Praxis geschlossen. Aber übermorgen, am Freitag, geht es.“ / Sen: „Übermorgen? Ja, bitte. Danke!“ | Huber Hanım'ın sözlerine göre bugün haftanın hangi günü? (Çarşamba; çıkarım: öbür gün cuma) |

Notlar:
- Beş sorunun metni birbirinden farklı. Sorular sırayla şunları yokluyor: söz edimi (h1), ayrıntı (h2), anlaşma (h3), olumsuzluk (h4), çıkarım (h5).
- Eski sahnelerden h2'deki Brandl düzeltmesi ve h4'teki „öbür gün cuma“ çıkarımı yeni kurala göre uyarlandı. Eski h2 ve h5'teki „Guten Tag, hier ist {name}.“ kalktı, çünkü `hier` kartı 1. günde tanıtılmıyor. Bu yüzden sahnelerde `{name}` de yok.
- h4'ün ilk taslağı („Guten Tag! Geht Samstag? Oder Sonntag?“) 1. günün sınav sesiyle („Guten Tag! Geht Samstag oder Sonntag?“) aynı çıktı. Değiştirildi.
- h5'te muayenehanenin perşembe kapalı olması gerçekçi. Bavyera'da Christi Himmelfahrt ve Fronleichnam perşembeye düşen resmî tatillerdir. Sahne tatil adı vermiyor.

### Açık kalan

- **Olumlu „X geht“.** Betik h3 kalıbındaki `geht`'i tek sözcük olarak biliniyor sayıyor. Bu yüzden olumlu kullanımlar denetimden geçiyor:
  - görev cümlelerinde: „Am Donnerstag geht es“, „Samstag? Ja, Samstag geht!“, „Welcher Tag geht?“, „… übermorgen geht es“;
  - sahnelerde: h3, h4 ve h5'te.

  Kural yalnızca „Geht …?“ ve „… geht nicht.“ kalıplarına izin veriyorsa bunlar kalıp dışında kalır. Öneri: h3'e „… geht.“ kalıbı da eklensin, ya da kalıp „… geht (nicht).“ yazılsın. Bu karar İÇ'in.
- **Noktalamasız eşleşme.** Geçen ve dokunulmayan iki cümle, noktalama yok sayılınca depodaki kabul listelerinde var: „Hallo? Frau Huber?“ (gun-03 ve gun-07'de „Hallo, Frau Huber!“) ve „Geht es am Freitag?“ (r0-01'in `accepted` listesi). İkisi de örnek cevap (accepted[0]) değil, dokunmadım.
- **Frau/Herr açıklaması.** `lx:Frau` ve `lx:Herr` kart açıklamasına eklenecek Hanım/Bey sırası cümlesi lex'in alanında. Bu dosyada yazılmadı.
