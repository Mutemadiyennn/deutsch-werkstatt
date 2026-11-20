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

Sayılar `content/k1-6cumle-2` dalının commit'lerinden ölçüldü (1.164 kart):

| | own | coll | IHLAL |
|---|---|---|---|
| Önce (42d0b5d) | 4.864 | 1.101 | 684 |
| Sonra (c15110a, grup 21 dahil) | 5.668 | 1.099 | 5 |

(İlk sürümdeki "793" sayısı içerik motorunun commit'lenmemiş yerel ağacından alınmıştı; o ağaçta grup 21'in yazar yaması da vardı. e342000'de görülen 50 ihlalin 45'i grup 21 kartlarıydı ve c15110a ile geldi.)

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
- `content/k1-6cumle` (#107): bu PR'ın kapsamındaki 121 kart (dağıtım listesinde 122 vardı; biri değişmeden kaldı) (M1 ve grup 05–11). Kapsamda kalan IHLAL 3, üçü de betiğin yanlış alarmı (`mögen#2`, `möchten` wollte; `hoch` hohen).
  - Bu kartlar sözlüğün güncel hâlinden kopyalandı. Bu yüzden `content/k1-6cumle-2`'de yapılan aile satırları ve genel ad turlarının o kartlara dokunan değişiklikleri de buraya geldi.
- `content/k1-6cumle-2`: kalan 268 kart (grup 12–20 ve 6 cümle turuna henüz girmemiş K1/K2 kartları).
- Grup 21'in 28 kartı, grubun kendi commit'iyle gelecek.

## İnceleme sonrası (#107 3. tur)
- Başka kartla aynı Almanca + aynı Türkçe olup farklı cevap isteyen 3 boşluğa iki yönlü eş anlamlı kabulü eklendi: `lx:Vater` b1 Papa, `lx:Mutter` b2 Mama, `lx:Name` b1 Vorname.

## Küçük kelime boşlukları (öğrenci ajanı B3, PM kararı 20.11 04:20)
- **Yeni kural:** Bahçe'de bir boşluğun cevabı kartın kelimesi ya da eşdizimin içerik kelimesi olur. Eşdizimden gelse bile artikel, edat, iyelik, jeden, bis gibi küçük kelimeler cevap olmaz.
- **M1, bu dal:** 128 boşluk değişti.
  - 121'inde boşluk aynı cümlede kartın kelimesine taşındı. Örnek: "Ich sehe dort eine ___." → Frau.
  - 7 boşluk yeniden kuruldu: brauchen, warten, arbeiten, Montag, passen#2 ×2, Anfang.
  - Dört kartta cümle de yenilendi: Stunde ×2, Sonntag, Datum (inceleme cc56f37 turu P2-4).
  - İnceleme turunda (cc56f37) kalan iki edat boşluğu da kartın kelimesine taşındı: "Es ist ___ vor neun." → Viertel, "Das Büro ist über ___ zu." → Mittag.
  - Eksik eş anlamlılar eklendi: Arzt'ta Doktor, offen'da auf ve geöffnet, Nummer'da Telefonnummer.
  - İpuçlarını dilbilimci yazdı. Okur 135 satır okudu, 5 GERİ verdi; tekrarda 0.
- **Sonuç:** M1 kartlarında küçük kelime soran boşluk kalmadı.
- **Kalan:** M1 dışındaki 779 boşluk `content/k1-6cumle-2` dalında aynı hattan geçti (aşağıda).

### K1, M1 dışı (`content/k1-6cumle-2`)
- **779 boşluk, 396 kart.**
  - 723'ünde boşluk aynı cümlede kartın kelimesine taşındı (dilbilimci iki parti).
  - 56'sı yeniden kuruldu.
  - İpuçlarını ve çevirileri dilbilimci yazdı.
- **Eski `also_ok`:** yalnız artikel ya da iyelik olan seçenekler silindi (artık yanlış cevabı doğru sayarlardı). Dilbilimcinin bulduğu iki eksik eş anlamlı eklendi: Freund → Kumpel, Arzt → Doktor.
- **Okur:**
  - İlk tur: 835 satır, 27 GERİ.
  - Tekrar turlarında GERİ sayısı 25 → 13 → 9 → 12 → 0.
  - Dönenlerin çoğu "kart içinde tek karşılık" ölçütü. Mal artık hep "kez"; Chance "fırsat" ile "şansı yüksek" ayrı; Wahrheit "gerçek", Idiot "salak", Boden "yer", Möglichkeit "imkân", Dienst "nöbet", Verein "dernek", Stelle "iş" ve "yer".
  - Advent artık çevirisiz kalmıyor: "Noel öncesi haftalar", "Noel'den önceki dört pazar gününün ilki". Adventskranz da "mumlu çelenk" oldu.
- **Kişiye göre fiil ipuçları:** "**ich** ile **träume** olur." biçimindeki 458 ipucu (174 kart) mastarı da gösteriyor. Yeni biçim: "**ich** ile söylerken **träumen**, **träume** olur." Biçim değişmiyorsa: "**wir** ile söylerken **haben** aynı kalır."
  - Okur 40 satırlık örneklemi okudu: kalıp geçti, 1 satırda kalın söz cümledekiyle aynı değildi.
  - 458 satırın hepsi bu açıdan tarandı; o tek satır düzeltildi.
- **Denetim:**
  - Sözlükte kural dışı boşluk: 4 (sayacın yanlış alarmı). Küçük kelime soran boşluk: 0.
  - 7.597 ipucunun hepsinde kalın sözde beklenen cevap (ya da bir `also_ok`) geçiyor.
  - Doğrulayıcı 0 hata.
