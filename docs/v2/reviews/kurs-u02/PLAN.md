# Kurs Ü2 (A2, 10. hafta, gün 64–70): "Çalışmak ve öğrenmek" — yazım planı [İÇ-K]

Dayanak: PM-143 (#12, 7220412998), ölçü PM-145 md. 1 (7221956335; PM-144 md. 3 GERİ ALINDI), PM-139/140/141 (konu, biçim kataloğu), PM-113 (yazım tarifi).

## KESİN SINIR
Kursun ders kitabının metnine, alıştırmasına, görseline BAKILMAZ, ARANMAZ, alıntılanmaz. Web araması yok. Bütün cümleler, diyaloglar, metinler, ilanlar özgün. Kişiler bizim Köy'ümüzün kalıcı karakterleri (`content/v2/world/world.json`): ch:wimmer (şef), ch:aksoy (Derya), ch:lechner (Tobi), ch:popescu (Ioana, kurs arkadaşı), ch:stadler (fırın), ch:petrovic (kuaför), ch:kraus, ch:pichler, ch:schneider, ch:brandl, ch:huber. Yeni yan karakter gerekirse yalnız adıyla, kimliksiz (ör. kurs danışmanı "Frau Albers"), çeşitli adlar. Öğrenci: `{name}`, `{Herr|Frau}` yer tutucuları; `audio_de` içinde yer tutucu yok.

## Biçim
`content/v2/m1/FORMAT.md` + örnek A2 öncesi son hafta günleri `content/v2/m1/gun-43.json … gun-49.json` (halka biçimi; 8. gün ve sonrası `halkalar` zorunlu), dil noktası dosyası `content/v2/m1/dn-10.json` (HAZIR, baş geliştirici yazdı; değiştirme, eksik görürsen raporla), şema `packages/shared/src/m1.ts` (`Gun`, `Halka`) ve `packages/shared/src/content.ts` (`Drill`). Şemada olmayan alan HATADIR (ör. `tur_bekliyor` gün dosyasına yazılmaz; raporuna yaz).

## Bağımsızlık (PM-143 md. 1)
Ünite kendi başına açılır: yalnız A1 (1.–56. gün; `curriculum/a1-kesin.json`) ve bu haftanın kendi tanıttıklarına dayanır. Eski A2 tablosunun 9. hafta kartlarına (Besprechung, Studium, Hausordnung …) dayanma; burada kullanılacaksa aşağıdaki listede var.

## Hafta düzeni (PM-143 md. 1; PM-140 iskeleti; PM-145 md. 1 ölçüsü)
- Gün ≈ 60–100 dk malzeme (A1 haftaları boyunda, DOLU). Her günün İLK parçası (halka 1–2 + dil noktası + sahnenin ilk bölümü) ≈ 20–25 dk kendi içinde tamam bir çekirdek: anla + fark et + bir üretim. Sonrası "devam": alıştır, üret, konuş.
- 1.–4. gün = dört bölüm: anla → fark et → alıştır → kendin üret. Her gün EN AZ İKİ konuşma görevi (biri rol/prova = `prova`, biri kendin hakkında = `guided_response`/söyle görevi) ve BİR yazma üretimi (`okuma_yazma.yazma` ya da yazma görevi).
- 5. gün = dil bilgisi durağı + ses + sınıfla/tablo/dönüştür. 6. gün = pekiştirme (sözcük, yazım, DTZ biçimli görev: örnekle öğret → ipuçları → sınavdaki gibi) + UZUN üretim (kısa sunum / e-posta). 7. gün = hafta sonu testi.
- Modal Präteritum: fark et (64'te metinden) → tablo (`dn:10-modal-praeteritum`) → **5. ve 6. günde toplam en az 30 özgün madde** (çekim, iki seçenekten seç, dönüştür: şimdi → eskiden, kendi geçmişin) + Türkçe hata açıklaması ("noktalar düşer, araya -te- girer; ich/er aynı"). 5. günde dört tuzağın HER BİRİNE en az 3 madde: (1) Präteritum yerine şimdiki zaman (willst/müssen/kann), (2) kişi eki eksik (durft, wollt), (3) ihr biçimi (konntet), (4) çift s (mussten).
- -ung'lu adlar (`dn:10-ung`): fiil → ad, hep die.
- Ses o/u (`dn:10-ses-o-u`): dinle-seç + söyle (var olan türlerle: `pick` + `golge`/söyle).
- Yeni adım türleri (doğru/yanlış dinleme, sınıfla, ilan eşleştir, bilgi boşluğu rolü, ritim, en küçük çift…) YOK: görevi var olan en yakın türle yaz (doğru/yanlış → `pick` iki seçenek "stimmt / stimmt nicht"; ilan eşleştir → `pick` her kişi için, seçeneklerde "keine Anzeige"; bilgi boşluğu telefon → `prova`). Hangi görevi hangi türle yazdığını raporuna "tur_bekliyor" listesi olarak yaz.
- Metin görünümleri: iş profili (kişi kendini anlatır), kurs ilanı, kısa iş ilanları (kişiye uygun ilan; biri eşleşmez), sesli mesaj / telefonla bilgi sorma.

## Gün → kartlar → dersler (tablo bunu sabitler; `yeni_kartlar` birleşimi = bu liste, gün ±2)
| gün | rol | yeni_kartlar | dersler |
|---|---|---|---|
| 64 | A "Früher und heute": geçmişte ne yaptın, iş deneyimi (iş profili okuma) | lx:Erfahrung, lx:Stelle, lx:Fabrik, lx:Lager, lx:Schicht, lx:Kellner, lx:Koch, lx:Fahrer, lx:damals, lx:früher, lx:versuchen | dn:10-modal-praeteritum |
| 65 | B "Was kannst du gut?": yetkinlik, neyi iyi yaparsın | lx:Computer, lx:putzen, lx:Elektriker, lx:Handwerker, lx:Team, lx:fleißig, lx:zuverlässig, lx:geduldig, lx:hilfsbereit, lx:höflich, lx:schaffen | dn:10-gut-koennen |
| 66 | C meslek ve eğitim isteği + iş ilanı anlama | lx:Stellenanzeige, lx:Teilzeit, lx:Vollzeit, lx:Arbeitgeber, lx:Bewerbung, lx:Lebenslauf, lx:Zeugnis, lx:Praktikum, lx:Erzieherin, lx:Pflegerin, lx:verdienen | dn:10-beruf-wunsch |
| 67 | D kurs/ek eğitim bilgisi alma (telefon, sesli mesaj, kurs ilanı) + yardım iste/öner | lx:Weiterbildung, lx:Sprachkurs, lx:Kursleiterin, lx:Abschluss, lx:Unterricht, lx:Möglichkeit, lx:anbieten, lx:bitten, lx:regelmäßig | dn:10-hilfe |
| 68 | 5. gün: dil bilgisi durağı (tuzaklar, -ung) + ses o/u | lx:Erklärung, lx:Bedeutung, lx:Meinung, lx:Übung, lx:Beratung, lx:Geduld | dn:10-modal-tuzak, dn:10-ung, dn:10-ses-o-u |
| 69 | 6. gün: pekiştirme + DTZ okuma (kişiye uygun ilan) + uzun üretim (e-posta: kursa bilgi isteme ya da kısa iş profili) | lx:Chefin, lx:Überstunde, lx:Probezeit, lx:Studium | dn:10-dtz-ilan |
| 70 | 7. gün: hafta sonu testi (`hafta-sonu-testi-10.json`) + `gorulmemis-10.json` | — | — |

Kart kayıtları: `content/v2/registry/lexicon/` (yeni parti `batch-a2-k02.json` 21 kart). Yeni dil noktasına halkada ≥ 6 görev (`dersten_sonra: true`) + ertesi gün ≥ 2. Halka 2–6 kart; her kartın ≥ 2 görev cümlesi. Üretim maddelerinde accepted ≥ 3. "Önceki hafta göstermiştir" varsayımı yok: kullanılan her çekimli biçim, düzensiz fiil ve Partizip bu hafta istenmeden önce gösterilir (kalıp satırı, dil noktası tablosu). Karşı tarafın repliğinde ünlem/dolgu (ah, oh, na, äh) yok. Türkçe açıklama OD-9 (`docs/v2/OGRETIM_DONGUSU.md`), İngilizce köprü yok.

## Kapılar (yazar kendi dosyaları için)
`npm run content:validate` (0 hata; kendi dosyandaki uyarıları azalt) · `node --experimental-strip-types content/tools/dikis-kos.ts --yarim --gun N` (kendi günlerinde ihlal 0) · hafta kapısı `node --experimental-strip-types content/tools/hafta-kapisi-kos.ts --hafta 10` (öğretilmeden istenen 0). Komutların tam bayraklarını dosya başlarından oku. Tablonun 10. hafta satırları baş geliştirici tarafından bu plana göre güncelleniyor; tablo hatası görürsen raporla, tabloya dokunma.
