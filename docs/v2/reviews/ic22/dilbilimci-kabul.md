# Dilbilimci: kabul takibi (İÇ-21 dilbilimci-1 (b) md. 1–6)

Çalışma ağacı: `wtK` (dal `content/a1-kabul-takip`), commit'lenmemiş fark.
İncelenen madde sayısı 7: m1:10:s9, m1:36:s6, m1:37:s6, m1:38:s5, m1:38:s10, m1:h06:g3, m1:42:t12. Ayrıca `a1-seviye-tespiti.json` içindeki 2 etiket değişikliği.

## Eklenen varyantlar
| madde | varyant | karar |
|---|---|---|
| m1:10:s9 | `Danke, aber heute kann ich leider nicht.` | Doğru ve doğal. Kibarca geri çevirmenin en yaygın biçimi. |
| m1:36:s6 | `… einen Film angeschaut` (2) · `Am Sonntag habe ich einen Film geschaut.` | Doğru. Güneyde "einen Film (an)schauen" "sehen"den daha yaygın. Bavyera için bilhassa gerekli. |
| m1:37:s6 | `Ich habe mit (der) Karte gezahlt.` | Doğru. Konuşmada "zahlen" ile "bezahlen" eşit yaygın. |
| m1:38:s5 | `Ich bin mit der Tram gefahren.` | Doğru. Güney Almanya'da (MVG dahil) "Tram" resmî ve günlük söz. |
| m1:38:s10 | `Mit dem Rad.` · `Ich bin mit dem Rad gekommen.` | Doğru. "Rad" günlük konuşmada "Fahrrad"dan sık. |
| m1:h06:g3 | `Nein, mit dem Rad.` · `Nein, ich bin mit dem Rad gekommen.` | Doğru. |
| m1:42:t12 | `Früher gab es hier eine Schule.` | Doğru ve doğal. "Eskiden … vardı"nın en sık karşılığı. |

## Etiket denetimi (P1-1: etiket ancak bütün varyantlar yapıyı içeriyorsa kalır)
- **m1:36:s6, gr:a1-07:t2 (haben + sonda geçmiş biçimi) ve gr:a1-07:t4 (iki parça cümleyi sarar):** Yeni varyantların hepsinde `habe … angeschaut/geschaut` var. Etiketler geçerli.
- **m1:37:s6, gr:a1-07:t3 (fiilin geçmiş biçimi):** `gezahlt` da bu dil noktasının örneği (ge + t). Etiket geçerli. Not: why_tr "bezahlen'e ge gelmez" diyor. "gezahlt" yazan öğrenciye bu açıklama yanlış değil, ek bilgi olur. Değiştirmedim.
- **m1:38:s5, gr:a2-01:t1 (bin gefahren):** Tram varyantında da `bin … gefahren` var. Etiket geçerli. `dn:kelime-ailesi-1` (birleşik isim) etiketinin çıkarılması doğru, çünkü "Tram" birleşik isim değil.
- **m1:42:t12, gr:a1-08:t3 ('war'):** "gab es" varyantı 'war' kullanmıyor ve maddenin can_do'su yok. Havuzdan çıkarılması doğru.
- **m1:38:s10, m1:h06:g3, m1:10:s9:** `dil_noktasi` yok, etkilenmiyor.
- Başka atlayan varyant aradım, bulamadım.

## Düzeltme: eksik simetrik varyant (3 satır)
| madde | eklenen | gerekçe |
|---|---|---|
| m1:36:s6 | `Ich habe am Sonntag einen Film geschaut.` | "geschaut" yalnız öne alınmış sırada vardı. Özneyle başlayan sırası eksikti. |
| m1:38:s10 | `Ich bin mit dem Rad gefahren.` | Listede "mit dem Fahrrad gefahren" vardı; "Rad" ile karşılığı eksikti. |
| m1:h06:g3 | `Nein, ich bin mit dem Rad gefahren.` | Aynı gerekçe. |

## Doğrulama
- Hafta kapısı, 2. hafta → GEÇTİ (görülmemiş 7/7). 6. hafta → GEÇTİ (görülmemiş 7/7). Öğretilmeden istenen 0, hafta sonu testi %100.
- `content:validate` → 4 HATA, hepsi `a1-seviye-tespiti.json` dosyasının kök alanlarında (id deseni, gecme, puanlama_tr, bolumler). Aynı 4 hata HEAD içeriğinde de çıkıyor, yani bu farktan gelmiyor. Bu birleşik ağaçta seviye tespiti dosyası ile şema birbirine uymuyor. Baş geliştiricinin bakması gerekiyor.
- `wtK` içinde node_modules yok. Kapı ve doğrulayıcı geçici bir node_modules bağıyla koşuldu, bağ sonra silindi.

## Sonuç
**DÜZELTİLDİ-ONAY** (içerik). 10 madde/etiket denetlendi. Dil hatası çıkmadı; 3 eksik varyant eklendi. Açık nokta içerik dışında: doğrulayıcıdaki 4 HATA HEAD'de de var.
