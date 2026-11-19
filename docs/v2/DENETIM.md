
# DENETİM: hatasız, çöpsüz ve verimli çalışan bir sistem

> PM belgesi. Kimlikler `DN-x`. Amaç (proje sahibi): "Bug'lı, takılan, 60 saniye dolmayan, saçma içerik gösteren bir uygulama olmasın. Bağımsız denetleyiciler ve öğrenciler arka planda çalışsın. Ahtapotun beyni PM olsun. Ama verimli olsun: aynı iş tekrar edilmesin, boşuna token harcanmasın."
>
> **Temel ilke:**
> - Ucuz ve kesin olan her kontrol **makineyle**, her PR'da ve ücretsiz yapılır (CI).
> - Yapay zekâ ajanları yalnızca **yargı** gereken yerde, yalnızca **değişen** şeye ve **örneklemle** bakar.
> - PM bunların hepsini toplar, süzer ve ana motora tek kanaldan (#12) iletir.

---

## DN-1 Üç katmanlı denetim

| Katman | Kim | Ne zaman | Maliyet |
|---|---|---|---|
| **1. Makine kapısı** | CI (GitHub Actions, açık depo, ücretsiz) | Her PR'da ve main'de | Token yok |
| **2. Bağımsız ajanlar** | Ana motorun ajanları (inceleme, qa, dilbilimci, okur) + PM'in denetçileri | Değişiklik olduğunda; örneklemle | Düşük, sınırlı |
| **3. PM** | Bu sohbet + zamanlanmış PM turları | Günde 4 tur + haftada 1 "baştan hayal et" turu | Orta |

---

## DN-2 Makine kapısı: CI'da her PR'da zorunlu (ana motor kurar)

1. **Tip + birim + içerik doğrulayıcı.** OD-7, OD-9, MT-4 ve AH-4 kuralları dahil.
2. **WebKit uçtan uca testler** üç cihazda: iPhone 15, iPhone 15 Pro Max, iPhone 16 Pro Max.
3. **Her düğmeye bas (gezgin) testi:**
   - Bir robot uygulamadaki her ekranı açar ve görünen her dokunulabilir öğeye basar.
   - Şunlardan biri olursa **kırmızı**:
     - sayfa hatası
     - boş ekran
     - 2 saniyeden uzun cevapsız kalma
     - sonsuz yükleme
     - taşma
     - ekranda kalan "undefined" ya da "NaN"
   - Ekran sayısı ve basılan öğe sayısı rapora yazılır; bir sonraki çalıştırmada eksilirse uyarı verilir.
4. **Yükleme bütçesi:**
   - Hiçbir yükleme göstergesi 10 saniyeden uzun kalmaz. Kalırsa kullanıcıya bir hata mesajı ve "Tekrar dene" düğmesi gösterilir.
   - İlk açılış ≤ 2 saniye.
   - Ekran geçişi ≤ 300 ms.
5. **Uçak modu:** Ağ tamamen kapalıyken tam bir gün yürünür (BY-12.1a). İnternetsiz, mikrofonsuz ve yapay zekâsız her durum ayrı ayrı test edilir.
6. **Görsel kurallar** (TS-4): emoji 0, ekran başına ≤ 1 gösterge, saniye sayacı yok, ana eylem ≥ 56 px, %130 yazı boyutunda taşma yok.
7. **İçerik politikası testi** (DN-4): örnek akış verisiyle filtrelerin doğru içeriği geçirip yanlışı attığı kontrol edilir.
8. **Video doğrulama:** Transkript ile ses arasındaki kelime hata oranı sınırı (PM-029).
9. **Gerçek cihaz kontrol listesi** (her sürümde, proje sahibinin telefonunda 10 dk): uçak modu, mikrofon, ses, Apple yapay zekâsı var/yok, kilitli ekranda araba modu. Liste kısa ve işaretlenebilir olur.

**Kural:** Kırmızı CI ile birleştirme yok. Kararsız (flaky) test "yeniden çalıştır, geçer" ile geçilmez; kök nedeni düzeltilir.

---

## DN-3 Bağımsız ajanlar: kim, neye, ne kadar bakar

Her ajan yalnızca **son kontrolden bu yana değişen** şeye bakar. Durum, PM'in "Denetim durumu" issue'sunda tutulur: hangi commit ve hangi içerik kimlikleri kontrol edildi. Aynı şey iki kez denetlenmez. Değişiklik yoksa tur bir dakikada biter.

| Ajan | Rolü | Ne zaman | Ne kadar |
|---|---|---|---|
| **Bilgi kısıtlı öğrenci** | Yalnızca uygulamanın öğrettiklerini bilen öğrenci. Uygulamayı baştan oynar; neyi öğrendiğini, nerede sıkıldığını ve neyi anlamadığını yazar | Oynanabilir yeni bir sürümde; haftada en az 1 | Bir oturum (ilk 10 dk + bir ünite) |
| **"Bu ne alaka?" içerik denetçisi** | Yeni içerikten ve akıştan rastgele örnek alır. Her öğe için sorar: seviyeye uygun mu, konusu izinli mi, köye ve ana yola bağlı mı, doğal mı, saçma mı? | İçerik birleştikçe; günde en fazla 1 | 30 öğe örneklemi |
| **Arayüz denetçisi** | Ekran görüntülerini TARGET2, TASARIM ve OD-9 ile karşılaştırır. Türkçe metni öğrencinin gözüyle okur | Arayüz değiştiren her birleştirmeden sonra | Yalnızca değişen ekranlar |
| **Video izleyici** | Videodan anahtar kareler çıkarıp bakar. Transkripti okur, ses ve transkript eşleşmesinin raporunu inceler. Seviye ve konu uygunluğunu değerlendirir | Yeni video kaynağında ve bölümünde | İlk 10 bölüm, sonra %10 örneklem |
| **Kod incelemesi (inceleme)** | Her PR'ı temiz bağlamla inceler (mevcut kural) | Her PR | — |

**Not:** Ajanlar videoyu insan gibi gerçek zamanlı izleyemez. Kareler, transkript ve ses eşleşme ölçümüyle "izler". Bu sınır gizlenmez; şüpheli bölüm reddedilir.

**Bulgu biçimi** (her ajan):

```
kimlik
tür (hata / içerik / arayüz / pedagoji)
öncelik (P0 / P1 / P2)
nerede
ne gördüm
neden önemli
ne yapılmalı
kanıt (ekran görüntüsü dosyası ya da içerik kimliği)
```

PM bu bulguları birleştirir, tekrarları ayıklar ve tek bir PM talimatı olarak gönderir.

---

## DN-4 İçerik politikası: telefona yalnızca kontrollü içerik iner

1. **Yalnızca izin listesindeki kaynaklar.** Açık internet taranmaz. Her kaynak elle onaylanır (PM araştırması + KAYNAKLAR) ve kategorilerle etiketlenir.
2. **Konu izin listesi (beyaz liste):** gündelik yaşam, sağlık, iş ve meslek, alışveriş, ulaşım, ev ve konut, hava ve doğa, yemek, kültür ve gelenekler, yerel etkinlikler, spor (genel), teknoloji (gündelik), eğitim, seyahat, hafif bilim.
3. **Hariç tutulanlar:** siyasi haber ve tartışma, parti ve seçim kampanyası, savaş, terör, şiddet, suç ayrıntısı, felaket ve ölüm ayrıntısı, din tartışması, cinsellik, tık tuzağı.
   - Resmî işlerle ilgili **usul bilgisi** istisnadır. Örneğin "seçim bildirimi mektubu nasıl okunur" gibi bir ders taraf tutmadığı için izinlidir.
4. **Şüphede at:** Konu sınıflandırıcısı emin değilse öğe gösterilmez.
   - Sınıflandırma; kaynağın kategorisi + anahtar kelimeler + (varsa) Katman 1 ile yapılır.
   - Yanlışlıkla geçen öğe "Hata var" düğmesiyle bildirilir (PM-022), kaynak puanı düşer.
   - Puanı düşen kaynak otomatik kapanır.
5. **Seviye kapısı:**
   - Bilinen kelime oranı ≥ %90 ise "uygun".
   - %80–90 ise "biraz zor" diye etiketlenir.
   - < %80 ise **gösterilmez**. Tek istisna: Katman 1 içeriği sadeleştirdiyse sadeleştirilmiş hâli gösterilir.
   - Öğrencinin seviyesinin iki alt seviye üstündeki içerik hiç gelmez. A2 öğrencisine C2 haber gelmez.
6. **Köye bağlılık:**
   - Bizim içeriğimizin her öğesi `place` (köydeki mekân), `characters` ve `unit` (ana yol ünitesi) alanlarını taşır; doğrulayıcı boş bırakılmasına izin vermez.
   - Akıştan gelen gerçek içerik de bir mekânda görünür: haber gazete bayisinde, podcast radyoda, video sinemada.
   - Ana yoldaki ünitenin konusuyla eşleşen öğe öne çıkar. Örneğin doktor ünitesindeysen sağlık haberleri öne gelir.

---

## DN-5 Verimlilik kuralları

1. **Önce makine.** Bir kontrol kurallarla yapılabiliyorsa yapay zekâya sorulmaz.
2. **Yalnızca fark.** Ajanlar son kontrolden sonra değişen commit'e ve içeriğe bakar.
3. **Örneklem.** İçerik ve video denetiminde sabit örneklem boyutu kullanılır. Bir hata bulunursa o partinin tamamı denetlenir.
4. **Erken çıkış.** Zamanlanmış turlar önce "değişiklik var mı?" diye bakar; yoksa tek satır kayıt bırakıp biter.
5. **Tek iş, tek sahip.** Aynı denetimi iki ajan yapmaz. Ana motorun qa ajanı testleri yazar, PM'in denetçileri yargı verir.
6. **Paralellik.** Ana motorda en fazla 3 ajan çalışır. PM tarafında aynı anda en fazla 2 denetçi çalışır.
7. **CI çıktısını yeniden kullan.** PM, CI'ın yüklediği ekran görüntülerini ve raporları indirip kullanır; aynı şeyi yeniden derlemez. Yerelde yalnızca CI'ın kapsamadığı durumlar derlenir.

---

## DN-6 PM döngüsü: ahtapotun beyni

**Günlük 4 tur** (Berlin saatiyle 09:17, 13:17, 17:17, 21:17). Her tur:
1. Ne değişti? (commit'ler, PR'lar, CI, #12 yanıtları)
2. Sıradaki denetçi turunu çalıştır:
   - 09: arayüz
   - 13: içerik
   - 17: öğrenci
   - 21: akış ve video
3. Bulguları birleştir ve PM talimatı yaz.
4. Durum issue'sunu güncelle.

**Tam tur ("baştan hayal et")**: Uygulamanın tamamı, ilk açılıştan itibaren baştan yürünür ve AHTAPOT haritasıyla karşılaştırılır: her kol çalışıyor mu, köye bağlı mı, gün sıkıcı mı, içerik sayacı hedefte mi? Tam tur şu durumlarda **o turda hemen** yapılır:
- son tam turdan bu yana main'e **3 birleştirme** olduysa;
- ya da **büyük bir değişiklik** birleştiyse: gezinme, Bugün, planlayıcı/beyin, oynatıcı, içerik şeması, akış ya da yeni bir kol;
- ya da gün içinde hiç tam tur yapılmadıysa ve o gün herhangi bir değişiklik olduysa: 21 turu tam tur olur.

Hiç değişiklik olmayan günde tam tur yapılmaz; aynı şey yeniden denetlenmez. Pazar günü ayrıca proje sahibine haftalık özet verilir.

**Proje sahibine:** Akşam 20:30 günlük rapor. Kritik bir sorun (P0) çıkarsa hemen bildirilir.


---
_Generated by [Claude Code](https://claude.ai/code)_
