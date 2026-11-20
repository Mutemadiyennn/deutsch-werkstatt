# 1. gün halkaları: yazar notu (PM-078 B ve C, İÇ adım 2)

Dosya: `gun-01-halkalar.json`. Kartlar ve sıra değişmedi. 25 kart × 2 = **50 yeni görev cümlesi** ve 5 mini sahne (19 satır, 5 anlama sorusu) yazıldı.
Denetim: `halka_kontrol.py` → **0 hata, 0 not**. Görev cümlelerinin hepsinde bilinmeyen 0, sahne satırlarının hepsinde de 0 (işaretli sözcük gerekmedi).
Ek denetim (betik dışı, elle): 50 cümlenin hiçbiri `content/v2/**` içindeki bir cümleyle (günler, dersler, sözlük örnekleri ve boşluk cümleleri) birebir aynı değil. Halka içinde ve halkalar arasında tekrar yok.

## Halka halka

**h1 Selam ve teşekkür (dersten önce).** En dar küme bu halkada: yalnızca hallo, danke, bitte, Frau, Herr, çerçeve sözcükleri ve adlar var. `ist`, `guten`, `hier` dersten önce bilinmiyor. Bu yüzden cümleler fiilsiz hitap kalıpları: „Hallo? Frau Huber?“ (telefon), „Danke, Frau Stadler!“, „Das, bitte.“ (fırında parmakla göstererek), „Danke, Herr Dr. Weber!“. Gerçek hayatta en çok söylenen biçimler de bunlar. Frau ile Herr aynı yapıda („Hallo, Frau Brandl!“ / „Hallo, Herr Pichler!“), böylece hitap karşıtlığı görünüyor. Sahne fırında geçiyor. Soru „Ja, bitte?“ sözünün „buyurun, ne istersiniz?“ anlamını yokluyor, çünkü bitte'nin bu kullanımı Türkçe konuşan için en az tahmin edilen anlam.

**h2 Hafta içi.** Dersten sonra `ist`, `war`, `geht`, `guten Tag`, `hier ist`, `welcher`, `bis` ve dersin bütün kart sözcükleri biliniyor. Cümleler randevu pazarlığı ve gün sorma üstüne kurulu: „Am Montag geht es nicht.“, „Montag? Nicht Dienstag?“ (telefonda doğrulama), „Mittwoch geht nicht, aber Donnerstag geht.“. Sahne Frau Huber'le telefonda geçiyor ve perşembede anlaşılıyor. Cuma bilerek seçilmedi: gün 1'in ses kaydı „Heute, am Freitag, ist die Praxis geschlossen.“ diyor.

**h3 Hafta sonu ve hafta.** „Am Sonntag ist alles zu.“ (Almanya'da pazar gerçeği), „Diese Woche geht es nicht.“, „Welcher Tag geht?“. Sahne merdivende Frau Brandl'la geçiyor: Frau Brandl günü karıştırıyor, sen düzeltiyorsun. Bu, öğrencinin ilk düzeltme cümlesi („Nicht Samstag, Frau Brandl. Heute ist Sonntag.“). Brandl'ın kendi ağzı yok, sahnede Bairisch kullanılmadı.

**h4 Bugün, yarın, dün.** Göreli günler cümlede başka bir günle eşleşiyor: „Vorgestern war Montag.“, „Ist übermorgen Freitag?“, „Morgen geht es nicht, aber übermorgen geht.“. Sahne Ioana'yla geçiyor. Soru bir çıkarım istiyor: „Öbür gün cuma“ deniyorsa bugün çarşambadır. Bu soru öteki dört sorudan biraz zor. Zor geliyorsa okur turunda düz bir soruya çevrilebilir („Hangi günde anlaşıyorlar?“ → Cuma).

**h5 Muayenehane kapalı mı?** „Ist das die Praxis Dr. Weber?“, „Geschlossen? Heute?“, „Nein, nicht Montag – Dienstag.“. Sahne Frau Huber'le telefonda geçiyor: cumartesi olmuyor, çünkü hafta sonu kapalı (gün 1'in ses kaydı ve sınavıyla tutarlı); pazartesi olur.

## Zorlandığım yerler ve kararlar

- **„ja“ çift kart.** `ja` hem çerçeve (`card:false`) hem 5. halkada kart. Betik onu her halkada bilinen sayıyor, bu yüzden h1–h4'te de kullandım. Kart olarak ilk kez h5'te soruluyor. Bu doğruysa sorun yok; ANA'nın sayacı aynı kararı vermeli.
- **„nein“ h5'e kadar bilinmiyor.** h1–h4'te „hayır“ demek gerekince „Nicht Samstag …“ ya da „… geht nicht“ kullandım. Kalıp doğal ama 1. günün ilk dört halkasında „Nein“ diyememek tuhaf. Öneri (İÇ'e): `nein` h1'e alınsın; o zaman `bitte` ya da `Herr` gibi bir kartla yer değiştirmesi gerekir. Kartlar sabit olduğu için dokunmadım.
- **„ja“ = „tamam“.** „Ja, bis Montag!“ cümlesini „Tamam, pazartesi görüşürüz!“ diye çevirdim, çünkü burada „Evet“ Türkçede yapay kaçıyor. Okur OD-9 açısından baksın; kartın anlamı „evet“.
- **„Am Sonntag ist alles zu.“** Gündelik bir abartı. Sözlükte „Sonntags hat die Bäckerei Stadler bis elf offen.“ örneği var, yani dünyada her yer kapalı değil. Türkçesi „her yer kapalı“ aynı abartıyı taşıyor. Dilbilimci uygun görmezse „Am Sonntag ist viel zu“ gibi bir biçim bilinmeyen sözcük getiriyor (`viel`). Bu yüzden şimdilik böyle bıraktım.
- **Yinelenen cümleler.** İlk taslakta 6 cümle başka günlerde ya da sözlük örneklerinde zaten vardı („Danke für alles!“, „Übermorgen ist Samstag.“, „Welcher Tag ist morgen?“, „Ich gehe morgen in die Praxis.“, „Ja, danke!“, „Danke, Ioana!“, prova'daki „Ja, Dienstag geht.“). Hepsini yenileriyle değiştirdim.
- **Kapı kendi başına darlaştırıyor.** Dersten önce `ist` olmadığı için h1 fiilsiz kalıyor. Dersten sonra elde yalnızca `ist/war/geht` var: `bin`, `habe`, `gut`, `schön`, `frei`, `Zeit` ve `dann` yok. Bu yüzden h2–h5 cümleleri çoğunlukla „X geht (nicht)“ ve „Heute ist X“ çevresinde dönüyor. Çeşitliliği soru biçimi, doğrulama („X? Nicht Y?“), karşıtlık („…, aber …“) ve hitapla sağlamaya çalıştım. C ölçümündeki öneriler (sein ve haben 1. günden çerçeve; kalıplar kümeye girsin) kabul edilirse 2. halkadan itibaren „Ich habe am Montag frei“ ya da „Schönes Wochenende!“ gibi daha canlı cümleler açılır.
- **Sahnelerde bağlam.** Şemada sahneyi anlatan Türkçe satır (`sahne_tr`) yok. Örneğin h4'te Ioana'nın neden „Geht es morgen?“ diye sorduğu (birlikte pratik) metinde geçmiyor; „üben“ ve „wollen“ birlikte iki bilinmeyen oluyordu. Öneri (ANA'ya): sahneye isteğe bağlı bir `ortam_tr` alanı eklensin (seslerdeki gibi).
- **Ad yer tutucusu.** `{name}` iki öğrenci satırında (h2, h5) ve bir Ioana satırında (h4) var; üçünde de `de_adsiz` ve `tr_adsiz` yazıldı. Görev cümlelerinde `{name}` kullanmadım: dikte ve yapboz için adsız tek biçim daha güvenli.

## Sonraki adım

dilbilimci → okur (OD-9). İnceleme `docs/v2/reviews/` altına yazılır; yazar bu dosyaya artık dokunmaz.
