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

