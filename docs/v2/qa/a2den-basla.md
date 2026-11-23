# "A2'den başla" (seviye tanıma) — kabul listesi

Görev: PM-114 B (#12 yorum 7103368128), PM-084 seviye tanıma listesi (7087031259); çelişirse PM-114. Taban: #244 (`v2/hafta-sonu-dusuk`) yığını.
Taş: M1 → A2 girişi (YOL_HARITASI §4, PM-114 öncelik). Hedef ekran: `design/TARGET*` yok; sonuç ekranı #244'ün diliyle (PM finali 7103203043).
Rakip: Duolingo'nun "ileri atla" sınavı tek geçer/kalır kilididir; burada sonuç öneridir, zayıf "yapabiliyorum" cümleleri gün gün görünür, karar öğrencinindir.

## Kabul listesi
1. **Tek soru, iki yerde.** İlk kurulumda ayrı adım: "Nereden başlayalım?" → **Baştan (A1)** / **A2'den**. Ayarlar'da (Ben → Ayarlar) aynı soru; seçim sonradan değişir.
2. **A2 içerikte yoksa** "A2'den" seçilemez, yerine tek dürüst satır ("A2'nin günleri hazırlanıyor"). Uydurma gün yok.
3. **Kısa yoklama** (`#/seviye`): A1'in (1.–8. hafta) pakette olan hafta sonu testlerinden, her haftadan 2 madde (biri dinleme, biri yazma; ikisi ayrı günlerden), en çok ≈16 madde, 5–7 dk. Yeni içerik yazılmaz. Maddeler sırayla, ortak `DrillView`; puan (XP) verilmez.
4. **Sonuç ≥ %80** (`policy.json` `seviye.gecme_orani`): "A2'ye hazırsın" + **9. haftadan başla**.
5. **Sonuç < %80**: "geçtin" denmez; zorlanılan "yapabiliyorum" cümleleri gün gün (gün · doğru/toplam · Rehber) + **Bunları tekrar et** (o günlerin gün sınavından kısa tur; yoklama sonucuna döner) + iki seçenek: **Yine de A2'den başla** / **A1'in N. haftasından başla** (N = en erken zayıf hafta). Öğrenci kilitlenmez.
6. **A2'den başlayınca:** 1.–56. gün "atlandı" (kalıcı gün bitişi `m1:gun:` YAZILMAZ); gün kilidi başlangıca uyar (57. gün açık, 58. gün kilitli); açılışta yalnız 9. haftanın dosyaları yüklenir.
7. **Yol:** A1 haftaları tek satır, "atlandı" yazar (tamam değil), dokununca günleri açılır; her gün Rehber'le ve "Gir"le açılabilir (isteyen döner, atlanan gün kilitli değildir). Atlanan haftalar için "test hazır" satırı çıkmaz.
8. **Kelime Bahçesi:** atlanan günlerin kartları "biliniyor" diye girer: tanıma yolunda seyrek tekrar (ilk tekrar `seviye.biliniyor_gun` ± yayılım), kanıt sayaçları sıfır (n/ok/durable/firstAt yazılmaz). Yoklamada yanlış yapılan maddelerin kartları hemen tekrara düşer. Seri, XP ve "yapabiliyorum" noktaları uydurma dolmaz.
9. **K(t):** atlanan gün, 57. günün akışında ve medya süzgecinde bilinen sayılır (kesin tablodan; atlanan günün dosyası yüklenmez).
10. **Geri dönüş:** Ayarlar'dan "Baştan (A1)" → atlanmış işaretler kalkar, 1. gün açılır; hiç dokunulmamış "biliniyor" kartları Bahçe'den çıkar (A1 günlerinde yeniden tanıtılır); öğrencinin gerçek kanıtı ve biten günleri silinmez.
11. **Uçtan uca (fikstürle, `v2_seviye.py`):** A2'den başla → yoklama → 57. gün açılır ve oynanır; düşük sonuç yolu (zayıf liste, tekrar, "A1'in N. haftasından"); Ayarlar'dan geri dönüş. Açık + koyu, iPhone 15 Pro Max görüntüleri.
12. Kapılar: typecheck + birim + doğrulayıcı 0 hata + ilgili e2e (v2_core, v2_yol_hafta, gezgin) yeşil; yerleşim bekçisi; ekranda İngilizce ya da iç ad yok; 390/430 genişlikte taşma yok.
