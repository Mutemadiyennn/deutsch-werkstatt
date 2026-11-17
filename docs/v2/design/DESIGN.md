# Deutsch Werkstatt 2.0 — TASARIM DİLİ (hedef)

> Sahibi: proje yöneticisi. Hedef görünüm: `TARGET.png` (kaynak: `TARGET.html`). Bu belge EK1 ve EK2'nin üstüne gelir; çelişkide bu belge geçerlidir. Önizlemede Inter, SF Pro yerine geçici olarak kullanıldı; cihazda sistem yazı tipi (SF Pro / SF Pro Rounded) kullanılır.
> Neden: Öğrenci bu ekrana her gün, her ruh hâlinde bakacak. Ekran sakin olmalı ama sıkıcı olmamalı; her gün bir şeyin ilerlediğini görmeli. Görsellik motivasyonun bir parçasıdır.

## 1. Kimlik: Raute
- Bavyera'nın mavi-beyaz eşkenar dörtgeni ürünün tek cesur öğesidir. **Bütün ilerleme Raute ile gösterilir:** seans (4 Raute), aşamadaki ifadeler (12 Raute), şehirde ustalaşılan mekânlar, hikâye bölümleri. Dolu, yarım, boş durumları var.
- İlerleme çubuğu, sayaç metni ("1/36"), segment çubuğu ve kronometre aynı anda gösterilmez. **Ekran başına tek ilerleme göstergesi** (Raute dizisi) + gerekirse tek kısa metin ("6 dk kaldı").
- Desen olarak yalnızca iki yerde ve çok soluk: Bugün ekranının gök şeridi ve gelen arama ekranının zemini (ince çapraz çizgilerden eşkenar dörtgen ağı; dama tahtası değil).

## 2. Renk belirteçleri
| Ad | Değer | Kullanım |
|---|---|---|
| himmel | #1C6FD6 | Ana eylem, seçili durum, Raute dolu |
| himmel-2 | #E3EEFB | Mavi yüzey, boş Raute |
| tinte | #14233B | Metin |
| tinte-2 | #5A6B82 | İkincil metin, Türkçe çeviri |
| papier | #F5F8FC | Zemin (açık tema) |
| brezel | #C27A2C | Ödül, XP, gündelik dil paneli vurgusu |
| wiese | #2F9E6B | Doğru, tamamlandı |
| rot | #D6453D | Yalnızca yıkıcı eylem (aramayı reddet) |
- **Mekân aksanları** (her alan kendi rengiyle tanınır; çeşitlilik hissi verir): Praxis/Apotheke #2BA89A · Bäckerei/Café #C27A2C · Arbeit #4F6683 · Amt #6E5BC7 · Bank/Versicherung #1F8A9E · Wohnung #B5577A · Friseur #9A5BB0 · Fitness #D39A1B · Verkehr #3E7CB1 · Freizeit/Biergarten #2F9E6B. Aksan yalnızca o mekânın sahne illüstrasyonunda, karakter avatarında ve küçük vurgularda kullanılır; ana eylem her zaman himmel.
- Koyu tema eşdeğerleri ayrıca tanımlanır; gelen arama ekranı her zaman koyu.

## 3. Tipografi
- Almanca ifade: SF Pro Rounded, 800, 28–32 px, sola hizalı, `lang="de"` + `hyphens:auto`. Almanca metin ekranın en büyük ve en önemli öğesidir.
- Türkçe çeviri: SF Pro Text, 17 px, tinte-2.
- Gövde 15–16 px, satır yüksekliği 1.45. Büyük harfli etiket yok. Meta bilgiler "A · B · C" diye birleştirilmez; kısa, anlamlı cümle kurulur ("Yaklaşık 9 dakika").

## 4. Yerleşim ve eylem
- Her ekranda **tek ana eylem**, başparmak bölgesinde, tam genişlikte, 56–64 px yüksekliğinde. Konuşma içeren ekranlarda ana eylem **"Sesli söyle"**dir; "Biliyorum, geç" ve "Yazarak" ikincil metin düğmeleridir.
- Sesi dinleme düğmesi büyük ve yuvarlak (60 px); "Yavaş" ayrı ve yazıyla. Emoji yok.
- Gündelik dil (Alltag) ayrı, sıcak renkli bir panelde: "Gündelikte böyle duyarsın" + ifade + tek satır not + küçük dinle düğmesi.
- Aynı aileden ifadeler çip olarak; mevcut olan vurgulu.
- Ekranın altında boş ölü alan bırakılmaz; içerik dikey olarak dengelenir.

## 5. İkonlar ve illüstrasyon
- **Emoji ikon yasak** (🔊, 🐢, 🧠 vb.). Tek bir çizgi ikon seti kullanılır: açık lisanslı (ör. Lucide ISC ya da Phosphor MIT) ya da projeye özgü SVG. Kalınlık ve köşe tutarlı.
- Sahne illüstrasyonları: düz, geometrik, özgün SVG; mekân aksan rengiyle. Gerçek kişi, marka, telifli karakter yok. Karakterler baş harfli avatar ya da sade siluet. Fotoğraf (Pixabay/Pexels) yalnızca kelime kartlarında; sahne kartlarında illüstrasyon.
- Maskot (v1'in "Brezi"si) kalabilir, ama ayarlardan kapatılabilir ve kutlama anlarıyla sınırlıdır.

## 6. Ruh hâli ve zaman
- Bugün ekranının gök şeridi günün saatine göre tonlanır: sabah açık mavi, akşam lacivert-mor, gece koyu. Mevsim içeriklerinde küçük dokunuşlar (Advent'te pencerede ışık gibi), abartısız.
- Kötü gün modunda ekran sadeleşir: tek kart, tek düğme, kısa metin.

## 7. Hareket ve ses
- Hareket ≤ 200 ms, yalnızca eyleme cevap olarak. Tek bir kutlama anı: doğru sesli cümlede Raute dolar + hafif titreşim + kısa ses. Konfeti yalnızca günlük hedefte ve kapatılabilir.
- `prefers-reduced-motion` uyulur.

## 8. Uygulama ve doğrulama
- Bu belgedeki belirteçler `web/src/ui` tasarım sistemine işlenir; ekranlar yalnızca ortak bileşenlerden kurulur.
- Görsel regresyon testinin temel görüntüleri, bu hedefe göre yeniden üretilen ekranlardan alınır.
- Kabul: TARGET.png'deki üç ekran (Bugün, ifade kartı, gelen arama) iPhone 15 boyutunda, açık ve koyu temada, bu belgeye uygun; emoji ikon sayısı 0; ekran başına ilerleme göstergesi 1.
