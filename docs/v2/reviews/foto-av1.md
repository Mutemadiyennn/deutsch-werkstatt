# Kart fotoğrafı avı, 1. tur: 1.–7. gün (MEDYA, PM 7054194427)

**Hedef:** örnek cümle değil, kartın kendisi. 1.–7. günün **somut** kartlarının ≥ %80'inde fotoğraf olması.
**Lisans:** yalnız CC0, kamu malı, CC BY, CC BY-SA. Bu turda seçilenlerin hepsi CC0.
**Ölçüt:** `foto-b5.md` aynen. Kötü fotoğraf, fotoğrafsız karttan kötüdür.

## Somut kart listesi (36)
Soyut sözcüklere, sayılara, günlere ve aylara fotoğraf zorlanmadı.

| Gün | Kartlar |
|---|---|
| 1 | Frau, Herr, Praxis, geschlossen, gehen, hallo |
| 2 | Frühling, Sommer, Herbst, Winter, Urlaub, Geburtstag, offen |
| 3 | Büro, wohnen |
| 4 | Kilo, Semmel, Tüte, bar, Karte, Brot, Apfel, Käse, zahlen, alt |
| 5 | Uhr, Arzt, Abend, Nacht |
| 7 | essen, Hausarzt, Fieber, sprechen, warten, arbeiten, müde |

6\. gün (soru sözcükleri, ad, adres, tarih) somut kart içermiyor.

## Sonuç
| | Sayı |
|---|---|
| Somut kart | 36 |
| Önceden fotoğraflı (B5) | 8 (Frau, Frühling, Herbst, Winter, Urlaub, Apfel, Käse, Nacht) |
| Bu turda aranan | 28 |
| Bu turda qa'nın seçtiği | 18 |
| Bağımsız incelemede (#182, 1. tur) geri çevrilen | 4: Karte, geschlossen, Kilo, sprechen |
| Bu turda kabul edilen | **14** |
| Fotoğraflı toplam | **22 / 36 = %61** (hedef %80; 7 kart eksik) |
| Fotoğrafsız kalan | 14: Praxis, geschlossen, hallo, offen, wohnen, Semmel, Tüte, Kilo, Karte, zahlen, Fieber, sprechen, warten, müde |

**Kabul edilen 14 kart:**
- **1. gün:** gehen, Herr.
- **2. gün:** Sommer, Geburtstag.
- **3. gün:** Büro.
- **4. gün:** bar, Brot, alt.
- **5. gün:** Uhr, Arzt, Abend.
- **7. gün:** essen, Hausarzt, arbeiten.

**Kaynak:** Openverse; kabul edilenlerin 10'u StockSnap, 4'ü Rawpixel'den. Lisanslar CC0 1.0.
- İnceleme notu: bar fotoğrafı büyük olasılıkla Pixabay'in eski CC0 döneminden StockSnap'e geçmiş; Herr ve arbeiten Burst imzalı.
- Openverse bunları CC0 1.0 olarak veriyor. D-112'deki "Pixabay Content License" sınıfına girmiyorlar. Atıf `acik.json`'da ve `medya` dalındaki `foto/atif.json`'da.

## Yöntem
- **Aday toplama:** kart başına 2–3 İngilizce sorgu, üç tur (uzun sorgu, kısa sorgu, hedefli sorgu). Kart başına en çok 8 aday, yan yana tek sayfada.
- **Süzgeç:**
  - Openverse'te `category=photograph`, lisans `cc0,pdm,by,by-sa`, `mature=false`.
  - Boyutu bilinen adayda kısa kenar ≥ 1000 px.
  - Başlığında harita, tarama, logo, belge, tabela, çizim, resim, müze ya da arşiv geçen aday atıldı.
- **Seçim:** `qa` ajanı (Opus) her sayfayı açıp baktı, kart başına tek aday seçti ya da hiçbirini seçmedi. Çiftlerin karışmaması ayrıca denetlendi:
  - Arzt ve Hausarzt farklı fotoğraf aldı.
  - Praxis'e doktor yüzü konmadı.
  - bar, Karte ve zahlen birbirinden ayrı.
  - alt ve Herr birbirinden ayrı.
- **Kırpma:** kare, ortadan, büyütme yok. Kabul edilen dosyaların hepsi 400 px kare. Asıl dosya sunucuları bu ortamda kapalı olduğundan Openverse'in 600 px küçük resmi kullanıldı (aşağıda "Açık noktalar").
- **Dosyalar:** `medya` dalında `foto/<sha16>.jpg` (main'e birleşmez). Kayıt bu PR'da: `secim.json` ve `acik.json`. `src` adresi `raw.githubusercontent.com/…/medya/foto/…`.

## Ret nedenleri (bu tur, ana nedene göre)
| Neden | Kart (fotoğrafsız kalan) |
|---|---|
| Kelimeyi göstermiyor ya da başka kelimeyle karışıyor | hallo (el sallamak "tschüss" da olur), wohnen (oturma odası "Wohnzimmer" ya da "sitzen" diye okunur), müde ("schlafen" ile karışıyor), Semmel, Tüte, zahlen |
| Okunur yazı, tabela ya da filigran | offen ("THIS DOOR OPENS"), warten (COVID tabelası, filigran) |
| Yanlış ülke izlenimi | Fieber (termometreler °F gösteriyor) |
| Eski fotoğraf ya da gravür | Praxis (19. yüzyıl muayene odası, müze) |
| İncelemede geri çevrilen (okunur yazı ya da marka) | Karte ("Tap / Insert / Swipe Your Card"), geschlossen (kilitte "SECURITY"; ayrıca "kilitli" diye okunuyor), Kilo (kadranda marka adı; gram gösteriyor) |
| İncelemede geri çevrilen (karışır, yanlış ülke) | sprechen (ellerde telefon, "telefonieren" diye okunuyor; Kuzey Amerika sokağı) |

Adaylar düzeyinde de en sık iki ret nedeni okunur yazı ve eski fotoğraf ya da yağlı boya portre oldu. 1. turda Herr'in bütün adayları 19. yüzyıldan kalmaydı. Seçilen adaylar kısa sorgu turlarından geldi.

## Gerçek cihazda bakılacaklar
- **Kare kırpma:** arbeiten'de sol el kısmen kesiliyor.
- **Herr, alt ve Hausarzt yan yana:** Hausarzt'taki doktor da beyaz sakallı; önlük ve muayene masası ayırıyor.
- **İncelemenin P2 notları** (engel değil; daha iyi aday bulunursa değiştirilir):
  - Herr düşünür pozunda.
  - Büro bilgisayar laboratuvarı gibi.
  - essen İngiliz kahvaltısı.
  - Hausarzt'ta klinik ya da bakımevi havası var.
  - Brot soluk; koyu temada bakılmalı.
- **Abend:** gün batımı; gün doğumuyla ayrımı tek fotoğrafta kesin değil.

## Açık noktalar
- **%80 hedefi tutmadı (%61).**
  - Eksik 10 kart için sıra: önce raf (Pixabay; D-112, anahtar yolu #12'de 7054483582), sonra Noto Emoji yedeği (PM-081 B).
  - Emoji haritası için en uygun adaylar: Fieber (🤒/🌡), Tüte (🛍), Karte (💳), Kilo (⚖), hallo (👋); Semmel için 🥯 uygun değil, dilbilimci baksın.
- **Ortam engelleri** (bu oturumun ağı):
  - Wikimedia Commons API'si ve dosya sunucusu bu çıkışa 429 veriyor. `thumb.wikimedia.org` kapalı. Bu yüzden PM'in tarif ettiği Commons "Quality/Featured/Valued" havuzu bu turda **kullanılamadı**.
  - `cdn.stocksnap.io` ve `images.rawpixel.com` kapalı, asıl boyut alınamadı. Seçilenler Openverse'in 600 px küçük resminden.
  - Daha büyük sürüm gerekirse bu iki alan adı ortama eklenir ve dosyalar aynı sayfalardan yeniden indirilir.
- **`src` adresi:** `acik.json`'daki yeni kayıtlar `medya` dalının ham adresine bakıyor.
  - Yayın (`yayin.sh`, #180) `medya` dalını pakete alacaksa bu adresler yayında yerel yola çevrilmeli.
  - Uygulamanın CSP'si `raw.githubusercontent.com`'a izin vermiyorsa da aynı çevirme gerekir.
  - Karar ANA'nın.
- **`acik.py`:** `acik.json` başlığı "Üretilir: scripts/foto/acik.py" diyor, ama betik `medya/foto/atif.json`'u okumuyor. Betik bu hâliyle yeniden koşulursa bu turun 14 kaydı kaybolur. Betik ANA'nın: ya `atif.json`'u okumalı ya da elle eklenen kayıtları korumalı.
