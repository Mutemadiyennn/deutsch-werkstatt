# PM-069 madde 1: öğretilmemiş boşluk temizliği (sözlük)

**Kural (PM-069, 19.11 21:00):** Bir boşluğun cevabı yalnızca iki şeyden biri olabilir:
- kartın kendi kelimesi ya da onun çekimi (çoğul, hâl, fiil çekimi, Partizip, ayrılan fiilin iki parçası, dönüşlü kartta "sich" zamiri);
- kartın `collocations` listesindeki bir öbeğin parçası.

Bu kural, PM-062 döneminde benim yaptığım "dilbilgisel uydu" (artikel, iyelik, edat, Perfekt yardımcı fiili) yorumunun yerini alıyor.

## Sayaç
Sayaç bir betik: `cm/bcheck.py`. İçerik motorunun çalışma aracı, depoda değil. Her boşluğu üç gruptan birine koyuyor:
- **own:** kartın kendi kelimesi;
- **coll:** eşdizim listesindeki bir öbeğin parçası;
- **IHLAL:** ikisi de değil.

Kelimenin kendisini tanırken düzensiz fiil listesine, ünlü değişimine (ablaut), ayrılan ve ayrılmayan öneklere bakıyor.

| | own | coll | IHLAL |
|---|---|---|---|
| Önce (1.164 kart, 6.649 boşluk) | 4.730 | 1.126 | 793 |
| Sonra | 5.668 | 1.099 | 5 |

Sonra kalan 5 IHLAL, betiğin yanlış alarmı. Hepsi kartın kendi kelimesi:
- `mögen#2` ve `möchten` → wollte
- `hoch` → hohen
- `herausfinden` → herausgefunden
- `um … zu` → abzuholen

## Ne yapıldı
- **Boşluk isme taşındı: 633.** Artikel, iyelik ya da kein soran boşluk, kartın ismine kaydırıldı. Örnek: "Ich sehe ___ Mann." → einen olan boşluk, "Ich sehe einen ___ an der Tür." → **Mann** oldu.
  - Cümle ve çeviri aynı kaldı.
  - Dilbilimci her ipucunu yeniden yazdı ve doğallığı denetledi. 3 cümle değişti; 54 boşluğa `also_ok` eklendi (eş anlamlılar: Arzt/Doktor, Pass/Reisepass vb.).
- **Elle yeniden yazıldı: 46.** Bunlar Perfekt yardımcı fiili, başka kelimenin zamiri ya da edat soruyordu.
  - 34'ünde boşluk aynı cümle içinde kartın kelimesine taşındı.
  - 11'inde yeni cümle yazıldı.
  - 1'i yanlış alarmdı (hoch).
  - Eşdizim listesine öbek eklenmedi.
- **Okur:**
  - Taşınan 590 ipucunda 15 GERİ çıktı; sonraki turlarda önce 3, sonra 1, en sonunda 0.
  - Kalan 43 + 46 boşlukta 178 satırda 2 GERİ çıktı; sonraki turda 0.

## Dallara dağılım
- `content/k1-6cumle` (#107): bu PR'ın kapsamındaki 122 kart (M1 ve grup 05–11). Kapsamda kalan IHLAL 3, üçü de betiğin yanlış alarmı (`mögen#2`, `möchten` wollte; `hoch` hohen).
  - Bu kartlar sözlüğün güncel hâlinden kopyalandı. Bu yüzden `content/k1-6cumle-2`'de yapılan aile satırları ve genel ad turlarının o kartlara dokunan değişiklikleri de buraya geldi.
- `content/k1-6cumle-2`: kalan 268 kart (grup 12–20 ve 6 cümle turuna henüz girmemiş K1/K2 kartları).
- Grup 21'in 28 kartı, grubun kendi commit'iyle gelecek.
