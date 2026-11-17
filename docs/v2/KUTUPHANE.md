# Deutsch Werkstatt — KÜTÜPHANE MİMARİSİ (sonu olmayan, seviyeli, çevrimdışı)

> Sahibi: proje yöneticisi. Tarih: 18.11.2026. LEARNING_SYSTEM.md'nin içerik tarafını tamamlar; çelişkide LEARNING_SYSTEM.md geçerlidir. Kaynak kataloğu ayrı (KAYNAKLAR.md, araştırma sonrası).
> Proje sahibinin isteği: Her gün 100 dakika kullanan biri için içerik **asla bitmemeli, kısır döngüye girmemeli**, seviyeye göre mantıklı ilerlemeli, **aylarca çevrimdışı** da çalışmalı; yapay zekâ bağlıyken konuşmalar seviyeyle birlikte zorlaşmalı; 1. ayın içeriği ile 4. ayınki aynı olmamalı; ağırlık **%70 üretim** (konuşma, yazma) **ve %30 öğrenme** (dilbilgisi, kelime, girdi); cümleler dilbilgisi olarak sağlam kurulmalı; okuma metinleri, ayrıntılı anlama soruları ve "benzer bir metin yaz" görevleri olmalı; her şey askerî bir düzenle, uzman kontrolünden geçerek ilerlemeli.

---

## 1. Üç katmanlı kütüphane

| Katman | Ne | Nasıl üretilir | Çevrimdışı | Sınırı |
|---|---|---|---|---|
| **K1 — Çekirdek müfredat** | Alanlar, senaryolar, kalıplar, gramer omurgası, derin kelime kartları, okuma ve dinleme metinleri | Yazar ajan → dilbilimci → örneklem kontrolü (mevcut hat) | Evet | Elle yazılır; her sürümde büyür |
| **K2 — Üretici alıştırma motoru** | Onaylı kalıp × onaylı doldurma × onaylı kelime biçimleriyle **sonsuz** alıştırma | Kod; yapay zekâ yok | Evet | Yok (birleşim sayısı on binlerce) |
| **K3 — Kişiye özel taze içerik** | Öğrencinin bildiği kelimelerle seviyesine uygun yeni hikâyeler, diyaloglar, okuma metinleri, sohbet konuları | Yapay zekâ + otomatik doğrulayıcı + örneklem incelemesi; **aylık paket** olarak önceden üretilir | Evet (paket indirildikten sonra) | Her ay yenilenir |

**KT-1.1** Öğrencinin gördüğü her şey bu üç katmandan biridir ve hangisinden geldiği kayıtlıdır. K3 içeriği yalnızca doğrulayıcıdan geçerse ve "otomatik onaylı" etiketiyle gösterilir; dilbilimci örneklem incelemesinde hata bulunursa o paket geri çekilir.

### 1.1 K2 — Üretici alıştırma motoru (sonsuzluğun omurgası)
- Her kalıbın her slotu için onaylı doldurmalar ve **o kalıpta gereken çekimli biçim** (artikel ve hâl, fiil çekimi, çoğul) kayıtta hazırdır. Motor cümleyi yalnızca bu hazır parçalarla kurar; böylece ürettiği her cümle **dilbilgisi olarak doğru** olur (yapım gereği doğru).
- Türkçe istem de kalıbın onaylı Türkçe şablonundan kurulur.
- Alıştırma türleri: boşluk değiştirme, dönüştürme (soru/olumsuz/kibar/geçmiş/yan cümle), TR→DE, sıralama, dinle-yaz, dinle-cevap ver, hız turu.
- Kelime kartlarında "her seferinde farklı cümle" (PM-003) bu motorla da beslenir: bir kelimenin onaylı örnekleri tükenirse motor o kelimeyi içeren yeni ve doğru cümle üretir.
- Kabul: 1.000 rastgele üretilmiş cümlede dilbilimci örneklemi hata oranı ≤ %0,5.

### 1.2 K3 — Aylık paket
> **Düzeltme (PM-015):** "Aylık paket" bir **üretim ritmi ölçüsüdür, bekleme süresi değildir.** İçerik üretimi bugün başlar, her gün birleşir ve her yayında cihaza gelir. Çalışma anında dış kaynaktan veri çekilmez; bütün içerik bizimdir. A sınıfı açık kaynaklar (KAYNAKLAR.md) yalnızca derleme anında ve dilbilimci incelemesinden sonra kütüphaneye girer. Aşağıdaki "ay başına hedef" sayıları en az üretim ritmidir.
- Her ayın başında (ve seviye atlanınca) öğrencinin modeline göre bir paket üretilir: bildiği öğeler, zayıf olduğu öğeler, sıradaki alanlar, mevsim, hikâyedeki konum.
- Paket içeriği (ay başına hedef): 30 okuma metni, 40 diyalog, 200 dinleme maddesi, 8 hikâye bölümü (sesli drama), 60 sohbet konusu, 20 yazma görevi.
- **Doğrulayıcı kuralları:** bilinen öğe oranı ≥ %95 (yeni öğeler en fazla %5 ve işaretli); ikinci bir modelle dilbilgisi kontrolü; Bairisch yalnızca kayıttaki kaynaklı ifadelerden; kişisel bilgi yok; tekrar kontrolü (son 90 günün içeriğiyle benzerlik eşiği).
- Paket indirilir ve cihazda saklanır; internet olmadan da bütün ay yeterlidir. Sesler önceden üretilir (ücretsiz kota içinde, parça parça); yetişmezse cihaz sesi yedek.
- Yapay zekâ ya da kota yoksa: K1 + K2 tek başına aylarca ilerlemeye yeter. Uygulama hiçbir zaman "içerik bitti" demez.

## 2. Seviye ağacı ve ilerleme

**KT-2.1** Seviyeler alt basamaklara bölünür: A1.1, A1.2, A2.1, A2.2, B1.1, B1.2, B2.1, B2.2, C1. Her basamağın tanımı:
- "Yapabiliyorum" hedefleri (gerçek görevler)
- Gramer omurgasından o basamağın maddeleri (§4)
- Kelime bandı (aktif ve pasif hedef sayıları, sıklık aralığı)
- Dinleme hız ve aksan basamağı, okuma metin türleri ve uzunluğu
- Yapay zekâ partnerinin zorluk ayarları (§6)

**KT-2.2** Bütün içerik öğesi şu etiketleri taşır: seviye basamağı, alan, gramer maddeleri, kelime bandı, beceri, katman (K1/K2/K3). Planlayıcı içeriği bu etiketlerle ve öğrenci modeliyle seçer. Bu yüzden 1. ayın içeriği ile 4. ayınki kendiliğinden farklıdır.

**KT-2.3** Basamak geçişi süreyle değil kanıtla olur: o basamağın "yapabiliyorum" hedeflerinin ≥ %80'i + gramer maddelerinin ustalık ölçütü + aylık ölçüm.

## 3. %70 üretim / %30 öğrenme

**KT-3.1 Tanım** (odak motorunun etkinlik dökümüyle ölçülür, haftalık):
- **Üretim (%70):** sesli konuşma (kurma merdiveni, diyalog, rol oyunu, gelen arama, mola sohbeti, 4/3/2, hız turu) ≥ %50; yazma (mesaj, e-posta, hikâye, TR→DE yazarak) ≤ %20.
- **Öğrenme (%30):** gramer atölyesi, yeni ifade ve kelime tanıtımı, dinleme ve okuma girdisi.
- Not: Üretim etkinliklerinin çoğu aynı anda dinleme de içerir; girdi açlığı olmaz. Okuma ve dinleme metinleri ayrıca üretimle biter (anlattır, özetlet, benzerini yazdır).

**KT-3.2** Haftalık oran %60–80 bandının dışına çıkarsa planlayıcı ertesi haftayı dengeler; koç bunu haftalık değerlendirmede gösterir.

## 4. Gramer omurgası (%30'un çekirdeği: "cümleler yamuk kurulmasın")

**KT-4.1** Gramer konuşmaya hizmet eder ama sistematik ve eksiksizdir. A1–B2 için iletişim ihtiyacına göre sıralı bir omurga yazılır (her madde: kısa Türkçe anlatım, Türkçeyle karşılaştırma notu, kalıplar, alıştırma, teşhis maddeleri, ustalık ölçütü). Örnek sıra:
- A1: fiil 2. sırada, soru cümleleri, şimdiki zaman çekimi, sein/haben, modal fiiller (können, müssen, möchte), olumsuzluk (nicht/kein), Akkusativ (der → den/einen), ayrılabilen fiiller, saat ve tarih, emir (Sie).
- A2: Perfekt (haben/sein), Dativ (mit, bei, Mir tut … weh, Dativ fiilleri), değişken edatlar (in/auf + Akk/Dat), weil/dass/wenn ile yan cümle, sıfat çekimi (temel), karşılaştırma, dönüşlü fiiller, Präteritum (war/hatte/konnte), würde/hätte/könnte ile kibarlık.
- B1: Konjunktiv II (gerçek dışı), Passiv (temel), relatif cümleler, zu + mastar, obwohl/damit/als/während, Genitiv (yaygın kalıplar), Präteritum anlatı, n-Deklination, iki parçalı bağlaçlar.
- B2: Plusquamperfekt, Passiv ileri, Konjunktiv I (haberlerde dolaylı anlatım), Nominalstil, ileri bağlaçlar, partizip yapılar.

**KT-4.2 Teşhis ve onarım:** Her konuşma ve yazma çıktısı hata sınıflarına ayrılır (LS-10.2). Bir gramer maddesinde hata oranı yükselirse: 3 dk mini ders → K2 motoruyla o maddeye özel 10–20 madde (her seferinde farklı cümle) → 3 gün sonra kontrol → konuşmada doğru kullanılana kadar döngü. Ustalık = üretimde ≥ %90 doğruluk, iki ayrı haftada.

**KT-4.3** Gramer atölyesi sıkıcı ders değildir: her madde bir konuşma ihtiyacıyla açılır ("Doktora dünden beri hasta olduğunu nasıl söylersin?" → seit + Dativ).

## 5. Okuma salonu ve yazma

**KT-5.1 Metin türleri** (seviyeye göre): kısa mesajlar (WhatsApp tarzı), ilanlar ve duyurular (Aushang), menüler, randevu ve hatırlatma mesajları, resmî yazılar (Behördenbrief, sadeleştirilmiş), doktor bilgilendirmesi, kira ve sözleşme kısa bölümleri (bizim yazdığımız), haber (sadeleştirilmiş), blog/forum yazısı, kısa öykü, hikâye dünyasından günlük ve mektuplar, B1 okuma bölümü formatları (format taklidi, özgün metin).

**KT-5.2 Her metinde:** ana fikir sorusu, ayrıntı soruları, çıkarım sorusu, bağlamda kelime sorusu, doğru/yanlış/belirtilmemiş; bilinmeyene dokun → bankaya; sesli okuma (isteğe bağlı) ve gölgeleme; **"Benzerini yaz"**: aynı türde, kendi hayatından ya da hikâye dünyasından kısa bir metin; yapay zekâ D1/D2 sınıfı geri bildirim + örnek çözüm + yeniden yazma.

**KT-5.3 Çeşitlilik:** konu, tür, karakter, ton (komik, ciddi, gündelik), bölge ve mevsim dönüşümlüdür; aynı tür art arda en fazla 2.

## 6. Yapay zekâ ile konuşma seviyeyle büyür

**KT-6.1** Partnerin zorluk ayarları seviye basamağından gelir: konuşma hızı, cümle uzunluğu, kelime bandı, deyim yoğunluğu, sürpriz soru sıklığı, Alltag ve Bairisch oranı, araya girme ve konu değiştirme sıklığı.
**KT-6.2** "Sohbet saati" (serbest konuşma): öğrencinin seviyesinde, hikâye dünyasından bir karakterle; önceki sohbetlerin kısa özetini (yalnızca cihazda) hatırlar ("Geçen hafta dişçiye gidecektin, nasıl geçti?").
**KT-6.3** Her sohbet konuşma sonu raporu ve eksik çıkarımıyla K2/K3'e geri besleme yapar: zorlanılan kalıp ve kelimeler ertesi günün içeriğine girer.

## 7. Gerçek medya köprüsü (yalnızca bağlantı)

**KT-7.1** Telifli medya (dizi, film, DW, Easy German, podcast) kopyalanmaz; bağlantıyla verilir. Değer şu şekilde katılır:
- **Önce:** konusuna ve seviyesine göre bizim kayıtlarımızdan 10–15 öğelik ön öğretim seti (yalnızca bizim içeriğimiz).
- **Sırasında:** "Duyduğum kelime" ile hızlı ekleme.
- **Sonra:** genel anlama görevleri (ne oldu, kim kimdi, en sevdiğin cümle), 4/3/2 ile özetleme, "benzer bir sahne yaz".
**KT-7.2** Seviye bazlı medya listesi (KAYNAKLAR.md'den) her ay güncellenir; bağlantılar yayın öncesi kontrol edilir.

## 8. Açık lisanslı veri ile büyüme

**KT-8.1** Lisansı uygun açık kaynaklar (cümle bankaları, gerçek konuşma kayıtları, sözlük verileri; ayrıntılar KAYNAKLAR.md) içe aktarılır, **atıf ve ShareAlike yükümlülüklerine** uyulur, her öğe dilbilimci örneklemiyle süzülür. Açık veriden gelen cümleler K1/K2'nin örnek havuzunu büyütür; gerçek konuşma kayıtları dinlemede aksan çeşitliliği sağlar.

## 9. Asla bitmeme ve döngüsüzlük

- Planlayıcı kuralları (LS-12.3) + K2 + aylık K3 paketi = içerik bitmez.
- Her ay içerik üretiminin girdisi: öğrencinin bıraktığı yerler, kaçtığı konular, "Duyduğum kelime" kayıtları, zayıf gramer maddeleri, mevsim ve hikâye.
- Hiçbir metin, diyalog ya da senaryo 90 gün içinde aynen tekrar edilmez (tekrar modülündeki öğe tekrarları hariç; onlar da farklı cümleyle gelir).

## 10. Askerî düzen: üretim takvimi ve kapılar

| Dönem | Çekirdek (K1) hedefi | K2 | K3 |
|---|---|---|---|
| R1 | Pilot 11 senaryo, 60 kalıp onaylı, 1.000 K1 kart, A1–A2 gramer omurgası | Motor + 20 kalıp | Yok (R2'de başlar) |
| R2 | +30 senaryo, Okuma salonu ilk 40 metin, hikâye 1–4 | Bütün onaylı kalıplar | İlk aylık paket |
| R3 | +40 senaryo (iş arama dahil), B1 gramer omurgası, okuma 120 metin | Yan cümle ve dönüşüm türleri | Aylık |
| R4 | 21 alanın hepsi, 2.000 K1 + 3.000 K2 kart, okuma 200 metin | Tam | Aylık |
| R5–R8 | B1 sınav formatları, B2 omurgası, 10.000 pasif hedefi, kütüphane öğrenciyle büyür | Tam | Aylık |

Her parti: üret → doğrulayıcı 0 hata → dilbilimci → PM örneklem → birleştir (mevcut hat). Paralel ajan sınırı 3.

## 10.1 İçerik hattı: altı seviye aynı anda (PM-015, PM-018 eki)
- Altı seviye (A1–C2) birlikte ilerler. Kapasite payı: **A2 %40 · A1 %20 · B1 %25 · B2 %10 · C1–C2 %5** (C1–C2: seviye ağacı, gramer omurgası, "yapabiliyorum" listesi, ilk üniteler).
- İçerik hattı kod işini beklemez: en çok 3 ajan kuralı içinde lex, yazar ve dilbilimci (ve okur, OD-9) sürekli çalışır. Şema değişirse taşıma betiği yazılır.
- Günlük hedef (yaklaşık; kaliteden ödün yok): yazar her gün en az 2 ünite parçası (senaryo, diyalog, okuma metni ya da dallanan diyalog grafiği) · lex 150–200 kart · dilbilimci aynı gün inceleme · her hafta en az 3 Haber Odası dersi ve 1 radyo bülteni.
- STATUS.md'de günlük **içerik sayacı**: seviye × tür (kelime, kalıp, senaryo, diyalog grafiği, okuma, dinleme, haber, madde bankası); her hücrede hedef / taslak / onaylı / yayında; ayrıca BY-8 tükenme tahmini.
- Paketler: başlangıç paketi uygulamayla gelir (A1–A2 tam, B1 ilk üniteler, ses dahil). Diğer seviye paketleri çevrimiçiyken bir kez iner ve kalıcı depoya yazılır. Güncellemeler fark paketi olarak gelir.
- Kalite kapısı aynı: yazar → dilbilimci → okur (OD-9) → örneklem; doğrulayıcı 0 hata; OD-7 "öğretmeden isteme" içerik hattına da uygulanır.

## 11. Düzen: tek ana yol + seviyeyle açılan kollar (PM-012, "ahtapot")
- **Ana yol** (Duolingo/Busuu gibi): ünite ünite, seviye seviye açılır; her ünite bir gerçek hayat alanı ve bir gramer omurgası maddesi taşır; ünite bitmeden sonraki açılmaz (kapı yalnızca temel öğelere bağlı, LS-12.2). "Bugün" planını ana yol yönetir.
- **Kollar** ana yoldan beslenir, seviyeyle açılır, her birinin kendi seviyeli yolu vardır ve planlayıcı onları günlük plana dengeli yerleştirir (öğrenci "bonus" olarak da girebilir):
  1. Kulak Salonu (dinleme) 2. Okuma Salonu 3. **Haber Odası** 4. Sohbet Saati (serbest konuşma) 5. Gramer Atölyesi 6. Kelime Bahçesi (kartlar, "Duyduğum kelime") 7. Gerçek Medya (bağlantı + ön öğretim) 8. Hikâye (sesli drama) 9. Gerçek Görevler.
- Kollar hiçbir zaman ana yolun önüne geçmez; ana yolda bir ünite 7 gündür ilerlemiyorsa kollar o ünitenin eksiklerine hizmet eder.

## 12. Yeni içerik türleri ve kaynaklar (telif kurallarına uygun; PM-012)
1. **Haber Odası:** Haftalık 3–5 haber dersi. Gerçek güncel haberlerin **olgularından** yola çıkıp seviyeye göre **bizim yazdığımız** haber metni (olgular telifli değildir; metin özgün olur, kaynak bağlantısı verilir). Akış: başlık tahmini → altyazısız dinle → oku → "Bu haber ne anlatmak istiyor?" (ana fikir, kim/ne/nerede/neden, yazarın tutumu) → bağlamda kelimeler → 4/3/2 ile anlat → "Sen olsan ne düşünürsün?" (fikir bildirme kalıpları) → kendi kısa haber metnini yaz. Seviye arttıkça gerçek haber kaynaklarına (yalnızca bağlantı) geçiş: önce kolay dil haberleri, sonra normal haber.
2. **Açık lisanslı metinler:** Wikinews (CC BY), Wikipedia ve Wikivoyage (CC BY-SA; sadeleştirilmiş, atıflı), Almanya'daki **resmî metinler** (Alman telif yasasında resmî eserler kural olarak korunmaz; hangi metinlerin bu kapsamda olduğu doğrulanır) → Behördenbrief ve form okuma dersleri.
3. **Açık lisanslı videolar:** "Creative Commons" lisanslı Almanca videolar (lisans videoda CC BY olarak işaretliyse transkript atıfla kullanılabilir; her video için lisans doğrulanır ve kaydedilir). Gerçek röportaj, sokak konuşması, vlog → dinleme dersi.
4. **Gerçek konuşma kayıtları:** açık lisanslı konuşma veri setleri (KAYNAKLAR.md) → farklı ses ve aksanlarla dinleme.
5. **Kamu malı sesli kitaplar** (ör. LibriVox Almanca) → B1+ uzun dinleme; dil eski olabilir, yalnızca uygun seçilmişler.
6. **Kendi radyomuz:** hikâye dünyasının haftalık "yerel radyo" bülteni (sesli drama formatında): hava durumu, yerel etkinlikler, duyurular, bir röportaj, bir telefonla bağlanan dinleyici. Gerçek mevsim ve takvimle uyumlu.
7. **Mini oyunlar** (ana yola bağlı, ünitenin kelime ve kalıplarıyla): eşleştirme, hız turu, artikel kulağı, cümle inşa yarışı, "kim söyledi?" (dinleme). Her 3–4 etkinlikte bir.
8. **Haftanın deyimi / günün sözü:** seviyeye uygun, kullanım bağlamıyla, kaynaklı.

Kabul: her kol için seviyeli içerik listesi ve R1–R4'e dağılımı; her dış kaynak için lisans kaydı (KAYNAKLAR.md formatında); telifli metin depoya girmez.
