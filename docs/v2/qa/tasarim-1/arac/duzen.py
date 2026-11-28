"""[DENETİM-TASARIM] toplu sayfa düzeni: ham görüntülerden hangisinin hangi sayfaya, hangi adla gireceği. → duzen.json
  python3 duzen.py <ham kök> > duzen.json
Etiket: "<kısa ad> [dosya]" — dosya adı ham çekimdeki addır (g1 = 1. gün akışı, g8/g14 = 8./14. gün akışı, s = statik, y = yarıda/koyu, r = rol oyunu).
"""
import json, os, sys
KOK = sys.argv[1]

def f(d, no):
    pre = {"g1": "g1", "g8": "g8", "g14": "g14", "st": "s", "yr": "y", "rl": "r"}[d]
    for x in sorted(os.listdir(os.path.join(KOK, d))):
        if x.startswith(f"{pre}-{no:03d}-"): return f"{d}/{x}"
    raise SystemExit(f"yok: {d} {no}")

def k(d, no, ad, sec=None):
    pre = {"g1": "g1", "g8": "g8", "g14": "g14", "st": "s", "yr": "y", "rl": "r"}[d]
    e = [f(d, no), f"{ad} [{pre}-{no:03d}]"]
    if sec: e.append(sec)
    return e

D = [
  {"ad": "giris-kurulum", "baslik": "Giriş ve kurulum", "kareler": [
    k("st", 1, "Giriş"), k("st", 2, "Giriş: e-posta açık"), k("st", 3, "Kurulum 1/5: hoş geldin"), k("st", 4, "Kurulum: ad (ikinci kez, yine 1/5)"),
    k("st", 5, "Kurulum 2/5: zorluklar"), k("st", 6, "Kurulum 2/5: seçili"), k("st", 7, "Kurulum 3/5: öncelik sırası"), k("st", 8, "Kurulum 4/5: günlük hedef"),
    k("st", 9, "Kurulum 5/5: son ayarlar")]},
  {"ad": "seviye-tespiti", "baslik": "Seviye tespiti", "kareler": [
    k("st", 10, "Tespit girişi"), k("st", 11, "Madde: dinleme"), k("st", 13, "Madde: okuma"), k("st", 15, "Madde: yazma"),
    k("st", 17, "Madde: konuşma"), k("st", 18, "Mikrofon izni sorusu"), k("st", 21, "Madde: konuşma (2. bölüm, izin yine)"), k("st", 23, "Madde: Almanca söyle (yazarak)"),
    k("st", 25, "Madde: kelime"), k("st", 27, "Ara ekran: 1. hafta biraz daha"), k("st", 28, "Bölüm 8/9 · 7. hafta (hep Bilmiyorum)"),
    k("st", 30, "Seviye raporu: boş"), k("st", 31, "Seviye planı: boş (başlık 'raporun')"), k("st", 32, "Bugün: tespit yarıda")]},
  {"ad": "bugun", "baslik": "Bugün (taze, yarıda, gün sonu)", "kareler": [
    k("st", 35, "Bugün taze (ekran)"), k("st", 34, "Bugün taze (tam sayfa)", [2]), k("yr", 2, "Bugün yarıda (akıştan X)"), k("yr", 3, "Bugün yarıda (tam sayfa)", [2]),
    k("st", 137, "Bugün: ses kaydı ✓ sonrası, BAŞLA yerinde"), k("g1", 91, "Akış bitti ekranı"), k("g1", 92, "Bugün: 1. gün bitti (tam sayfa)"),
    k("st", 53, "Günlük görevler"), k("st", 54, "Bugünkü süre")]},
  {"ad": "yol", "baslik": "Yol", "kareler": [
    k("st", 36, "Yol (taze)", [1, 2, 9, 10]), k("g1", 93, "Yol (1. gün bitince)", [1, 2]), k("st", 33, "Yol (tespit yarıda: BAŞLA açık)", [1]),
    k("st", 51, "Rehber · 1. gün", [1, 2]), k("st", 58, "Hafta sonu testi: kilitli"), k("st", 59, "Hafta sonucu: boş ama 'Testi çöz'")]},
  {"ad": "koy", "baslik": "Köy ve dükkânlar", "kareler": [
    k("st", 37, "Köy"), k("st", 38, "Bahçe"), k("st", 39, "Sinema"), k("st", 40, "Radyo"), k("st", 41, "Kütüphane", [1]), k("st", 42, "Pazar meydanı", [1, 2, 4]),
    k("st", 49, "Atölye / Kalıplar", [1, 2]), k("st", 50, "Kalıp ayrıntısı", [1, 2, 4]), k("st", 52, "Günün kayıtları (#/m1/1)"), k("st", 48, "Sözlük (Kelime haritam buraya açılıyor)")]},
  {"ad": "koy-ic", "baslik": "Dükkânların içi", "kareler": [
    k("st", 63, "Bahçe: yeni kelime ('sein', taze öğrenci)"), k("st", 64, "Bahçe: dinle-seç"), k("st", 65, "Bahçe: yanlış cevap sonrası"),
    k("st", 69, "Sinema: Köy dizisi bölümü"), k("st", 71, "Sinema: soru"), k("st", 72, "Sinema: yanlış cevap sonrası"),
    k("st", 81, "Radyo: kayıt girişi"), k("st", 92, "Kütüphane → ders: Önce dinle"), k("st", 93, "Kütüphane → ders: yeni kelimeler"),
    k("st", 96, "Ders dril: artikelli söyle (Bilmiyorum yok)"), k("st", 97, "Pazar → senaryo (A2)", [1, 2]), k("st", 99, "Senaryo: Dinle ve tara oynatıcı")]},
  {"ad": "ben", "baslik": "Ben ve alt sayfalar", "kareler": [
    k("st", 43, "Ben (taze)", [1, 2]), k("g1", 95, "Ben (1. gün bitince)", [1]), k("st", 44, "Ben: Tanılama açık", [2]),
    k("st", 45, "Çalışma düzenim"), k("st", 46, "Profil ve ayarlar", [1, 2, 3, 4, 5, 6]), k("st", 47, "Ayarlar/raf bağlantısı (en üste açılıyor)", [1]),
    k("st", 55, "Ses ve mikrofon", [1, 2])]},
  {"ad": "akis-ses", "baslik": "Akış: durak geçişi ve ses durağı", "kareler": [
    k("g1", 1, "Bugün: BAŞLA (Kelime Bahçesi üstünde)"), k("g1", 2, "Durak geçişi: Sesler"), k("g1", 3, "Ses: baştan sona dinle"), k("g1", 4, "Ses: ana fikir sorusu"),
    k("g1", 5, "Ses: yanlış cevap sonrası"), k("g1", 6, "Ses: ayrıntı sorusu"), k("g1", 8, "Ses: cümle cümle"), k("g1", 10, "Ses: metin ve kelimeler"),
    k("g1", 11, "Ses: eylem sorusu"), k("g1", 12, "Ses: doğru cevap sonrası"), k("g1", 13, "Ses: bitti (4 soruda 1 doğru)")]},
  {"ad": "akis-halka", "baslik": "Akış: halka adımları (1. gün)", "kareler": [
    k("g1", 21, "Tanıtım (Anladım)"), k("g1", 22, "Dinle-seç"), k("g1", 23, "Dinle-seç: doğru sonrası (kaymış)"), k("g1", 25, "Resimden seç"), k("g1", 26, "Resimden seç: doğru"),
    k("g1", 27, "Yapboz: cümleyi kur"), k("g1", 28, "Yapboz: doğru"), k("g1", 31, "Boşluk"), k("g1", 32, "Boşluk: doğru"), k("g1", 33, "Yeni kalıp"),
    k("g1", 35, "Eşleştir"), k("g1", 36, "Eşleştir: hepsi doğru"), k("g1", 37, "Sahne (önce)"), k("g1", 38, "Sahne: metin açık, soru altta kalıyor"),
    k("g1", 39, "Halka sonu"), k("g1", 40, "Bahçe tanıtımı (Tamam)"), k("g1", 41, "Almanca söyle ya da yaz"), k("g1", 42, "Almanca söyle: doğru sonrası")]},
  {"ad": "akis-dilnoktasi", "baslik": "Akış: dil noktası durağı ve dril türleri", "kareler": [
    k("g8", 42, "Dil noktası: fiyat sormak (8. gün)"), k("g8", 43, "Dil noktası: noch, schon… (8. gün)"), k("g1", 71, "Dil noktası: tablo"), k("g1", 70, "Hatırla"),
    k("g1", 45, "Dril: boşluk (Bilmiyorum yok)"), k("g1", 52, "Dril: yönlendirmeli cevap"), k("g1", 54, "Dril: dinle ve cevap ver"), k("g1", 56, "Dril: seç"),
    k("g1", 59, "Dril: sıraya koy"), k("g1", 61, "Dril: Almanca söyle (yazı kutusu)"), k("g1", 64, "Dril: dönüştür"), k("g1", 53, "Yeni kalıp 'Bis ___!' (boşluklu öğretme)"),
    k("g8", 26, "Tamamla (eşdizim)"), k("g8", 27, "Tamamla: doğru sonrası"), k("g8", 30, "der/die/das"), k("g8", 31, "der/die/das: doğru sonrası"), k("g1", 73, "Bugünün görevi")]},
  {"ad": "akis-uretim", "baslik": "Akış: dikte, gölge, prova, okuma-yazma", "kareler": [
    k("g1", 74, "Dikte (aslında seçmeli)"), k("g1", 76, "Dikte: doğru"), k("g1", 77, "Dikte 2/2: boşluk"), k("g1", 78, "Gölge konuşma"),
    k("g1", 80, "Prova: hazırlık"), k("g1", 81, "Prova: konuşma"), k("g1", 82, "Prova: konuşma sürüyor"), k("g1", 84, "Prova: konuşma sonu"), k("g1", 85, "Prova bitti"),
    k("g1", 86, "Okuma: metin"), k("g1", 87, "Okuma: soru"), k("g1", 89, "Okuma: cevap ver (Bilmiyorum yok)"), k("g1", 90, "Okuma bitti"),
    k("g14", 49, "Yazma görevi"), k("g14", 50, "Yazma: denetim sonrası"), k("g14", 51, "Örnek cevap"), k("g14", 53, "Kontrol listesi"), k("g14", 55, "Okuma bitti (yazma görevi)")]},
  {"ad": "sinavlar", "baslik": "Gün sınavı, hafta testi, deneme, aylık ölçüm", "kareler": [
    k("st", 134, "Akış 14 (açılmamış gün): boş kart"), k("st", 135, "#/sinav/14: 'sınav günü değil'"), k("st", 139, "Hafta sonu testi: kilitli"),
    k("st", 143, "A1 deneme girişi (55. gün)"), k("st", 145, "Deneme: dinleme maddesi"), k("st", 146, "Aylık ölçüm: ikinci 'Seviye tespiti'"),
    k("st", 148, "Aylık ölçüm: cevap sonrası (soru yok)"), k("st", 61, "Tespit sonucu boş (#/assess/result)")]},
  {"ad": "senaryo-rol", "baslik": "Senaryo ve rol oyunu", "kareler": [
    k("st", 152, "Alan: Telefon görüşmeleri"), k("st", 153, "Senaryo ana", [1, 2]), k("st", 154, "1/6 Dinle ve tara"), k("st", 155, "2/6 İfadeler"),
    k("st", 156, "3/6 Cümle kur"), k("st", 157, "4/6 Alıştırma"), k("st", 158, "Dinleme"), k("st", 159, "5/6 Diyalog (seçici taşıyor)"),
    k("st", 160, "6/6 Rol oyunu girişi"), k("st", 161, "Gelen arama"), k("rl", 1, "Rol oyunu: açılış"), k("rl", 2, "Rol oyunu: cevap sonrası"),
    k("rl", 4, "Rol oyunu: sunucu hatası"), k("rl", 6, "Rol oyunu: 12 sn yanıt yok")]},
  {"ad": "hata-bos", "baslik": "Hata, boş ve çevrimdışı durumlar, bildirimler", "kareler": [
    k("st", 162, "Çökme sınırı"), k("st", 163, "Olmayan ders (çıkışsız)"), k("st", 164, "Olmayan kayıt (çıkışsız)"), k("st", 165, "Olmayan gün (çıkışsız)"),
    k("st", 166, "Çevrimdışı: ders"), k("st", 167, "Çevrimdışı: günün kayıtları"), k("st", 169, "Çevrimdışı: akış 3 (boş kart)"), k("st", 170, "Bildirim arama ekranının düğmelerinde"),
    k("st", 57, "Boş: seviye planı"), k("st", 60, "Kelime Bahçesi (Köy'den)")]},
  {"ad": "koyu", "baslik": "Koyu tema (karşılaştırma)", "kareler": [
    k("yr", 4, "Koyu: Bugün"), k("yr", 5, "Koyu: Yol"), k("yr", 6, "Koyu: Köy"), k("yr", 7, "Koyu: Ben"), k("yr", 8, "Koyu: durak geçişi")]},
]
json.dump(D, sys.stdout, ensure_ascii=False, indent=1)
