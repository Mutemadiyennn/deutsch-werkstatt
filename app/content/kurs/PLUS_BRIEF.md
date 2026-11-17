# Görev: "Kelime+" — her üniteye sınav listesine ulaştıran ek kelimeler

## Neden
Kursun çekirdeğinde 715 kelime var. Sınav seviyeleri birikimli olarak yaklaşık A1 ≈ 650, A2 ≈ 1.300, B1 ≈ 2.400 kelime ister.
Her üniteye, o ünitenin konusuna uyan ek kelimeler ekliyoruz. Uygulama bunları da sıkı öğretmen mantığıyla öğretir:
fotoğraf, cümle içinde söyletme, yanlışta başka bir cümleyle tekrar, 3 saat sonra yine başka cümle.

## Girdi
- `/home/claude/kurs/plus/<id>.todo.json`: o üniteye sıklık + tema ile otomatik atanmış ADAY kelimeler (core1500 listesinden; kaynak film altyazısı sıklığı). Alanlar: de, tr, t (n/v/a/f), art, pl, note, r (sıklık sırası; küçük = sık).
- `/home/claude/kurs/units/<id>.json`: ünitenin kendisi (konu, gramer, çekirdek kelimeler). DOKUNMA, sadece oku.
- `SCHEMA.md` ve `EX_BRIEF.md`: cümle kuralları aynen geçerli.

## Çıktı
`/home/claude/kurs/plus/<id>.json` — bir JSON DİZİSİ (indent=1, ensure_ascii=False):
```
[{"de":"Gabel","art":"die","pl":"Gabeln","tr":"çatal","t":"n","img":"fork on table",
  "ex":[{"de":"Die Gabel liegt neben dem Teller.","tr":"Çatal tabağın yanında duruyor.","form":"Gabel"}, … 4 adet]}, …]
```
- `t`: n (isim), v (fiil), a (sıfat/zarf), x (diğer: bağlaç, edat, zamir, kalıp). Adaylardaki "f" → "x".
- İsimde `art` zorunlu (der/die/das), `pl` çoğul ("-" çoğulu yok, "Pl" sadece çoğul). İsim olmayanlarda `art:""`, `pl:""`.
- `tr`: kısa, net Türkçe karşılık; gerekiyorsa 2. anlam `;` ile. Fiilde gerekiyorsa not: "(+Akk)", "(sich)".
- `img`: kelime FOTOĞRAFLA net gösterilebiliyorsa İngilizce, 2-4 kelimelik Pexels arama sorgusu (somut nesne/eylem: "fork on table", "woman running park"). Soyutsa `""`.
- `ex`: tam 4 cümle {de, tr, form}. Kelime soyutsa (img boş) HER cümleye ayrıca `"img"`: cümlenin SAHNESİNİ gösteren İngilizce sorgu ekle ("Ich vermisse meine Familie." → "family hugging"). Sahne sorgusu kelimenin anlamını destekleyecek şekilde seçilmeli; kişisel/özel bilgi, marka, ünlü kişi YOK.

## Seçim (sen bir dilbilimci + sıkı öğretmensin)
1. Adayları ELE: küfür, argo, film diline özgü sözcükler ("Mistkerl", "verdammt", "Waffe", "töten"…), Bavyera'da günlük hayatta/sınavda işe yaramayanlar, özel isimler, ünitede (ya da çekirdek kelimelerde, hangi ünitede olursa olsun) zaten olanlar. Ayrıca `ich, du, und, nicht` gibi çekirdekte dolaylı öğretilmiş en temel işlev kelimelerini, çekirdek ünitelerde açıkça geçiyorsa alma.
2. Bir aday başka bir ünitene (senin aralığında) çok daha iyi uyuyorsa oraya taşı. Taşıdıklarını son mesajında yaz.
3. EKLE (adaylarda yoksa): Goethe/telc/DTZ sınav düzeyine uygun, ünitenin konusunda mutlaka bilinmesi gereken kelimeleri kendin ekle. Hedef ünite başına toplam (aday + eklenen):
   - A1 üniteleri: 22-30
   - A2 üniteleri: 28-36
   - B1 üniteleri: 60-75 (B1'de adaylar az; ~40 kelimeyi sen ekleyeceksin: B1 sınav listesi düzeyi, konuya göre)
4. Bir kelime TÜM kursta (units/*.json "words" + tüm plus/*.json) yalnızca BİR kez olmalı. `python3 plus_check.py <id>` "dup" hatası verirse kaldır.
5. Seviye ve sıra: sık ve somut olandan seyrek ve soyuta doğru sırala (uygulama bu sırayla 4'erli gruplar halinde öğretir).

## Cümle kuralları (özet; ayrıntı EX_BRIEF.md)
- `form` cümlede birebir geçer; isimde artikel `form`a dahil değil.
- A1: 3-8 kelime; A2: 5-11; B1: 6-14. Sadece seviyeye uygun yapı. Bağlamdan anlam çıkmalı; boşluğa başka kelime de rahatça uyuyorsa cümleyi değiştir.
- 4 cümle = 4 farklı durum/kişi/yer. Öğrencinin kişisel hayatı (iş, spor, eş, çocuk) YOK; genel Bavyera gündelik hayatı.
- Almanca %100 doğru ve doğal; Türkçe doğal, imla kusursuz, anlamı birebir.

## Süreç
- Her ünite dosyasını yazınca: `cd /home/claude/kurs && python3 plus_check.py <id>` → 0 error. Uyarıları da düzelt.
- Tüm ünitelerin bitince yazdıklarını baştan bir dilbilimci gözüyle oku: artikel, çoğul, çekim, Türkçe imla.
- Limit dolarsa kaldığın üniteden devam et; biten dosyaları baştan yazma.
- Son mesaj: ünite başına kelime sayısı, elediğin aday sayısı, eklediğin kelime sayısı, emin olmadıkların.
