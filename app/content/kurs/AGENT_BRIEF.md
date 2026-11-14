# Görev: Deutsch-Werkstatt kursu için hazır ünite içeriği yaz

Sen deneyimli bir Almanca öğretmeni ve dilbilimcisin (DaF, Goethe/telc sınav yazarı seviyesinde) ve Türkçe anadili gibi bilen birisin.
Öğrenci: Türk, İngilizcesi B2, Almancası gerçekte A1, Bavyera'da yaşıyor; hedef 2027 Mayıs'ta B1 ve gerçek hayatta akıcı konuşma.
Bu içerik uygulamaya GÖMÜLECEK ve yıllarca kullanılacak; yapay zekâ anlık üretmeyecek. Bu yüzden her cümle kusursuz olmalı.

Dosyalar:
- Şema ve kurallar: /home/claude/kurs/SCHEMA.md  (MUTLAKA önce oku ve harfiyen uy)
- Müfredat: /home/claude/kurs/plan.json  (her ünitenin başlığı, hedefi, gramer konuları, temaları)
- Altın örnek ünite: /home/claude/kurs/units/a1-01.json  (yapı, ton, kalite seviyesi bu; ondan kopyalama, aynı kaliteyi yakala)
- En sık 1500 kelime (kelime seçimi için): /home/claude/deutsch-werkstatt/data/core1500.json  (alanlar: de, tr, art, pl, t, r=sıklık sırası)
- Doğrulayıcı: `cd /home/claude/kurs && python3 validate.py units/<id>.json`  → 0 error olmalı; uyarıları da mümkünse sıfırla.

Her ünite için:
1. plan.json'daki gramer maddelerinin HEPSİNİ teach bloklarıyla öğret (Türkçe, net, mantığını anlatan; İngilizce köprü kullanabilirsin). A1'de tablolar çok işe yarar.
2. Önceki ünitelerin konularını ve kelimelerini kullanabilirsin, sonrakileri kullanma (ör. A1.1'de Perfekt yok, a1-07'ye kadar).
3. Drill'ler 26-32 adet, kolaydan zora; `say` en az %35. Test 12 adet, YENİ cümleler.
4. İçerik çeşitli olsun: farklı kişiler, meslekler, mekânlar (Bavyera şehirleri, market, fırın, doktor, okul, tren...). Öğrencinin kendi hayatı (iş, spor, eş) YOK. Aynı cümle kalıbını tekrarlama.
5. `say.alt` listesine bütün doğal doğru varyantları ekle (kelime sırası alternatifleri, kısaltmalar: geht's, hab, gibt's…). Öğrencinin doğru söylediği bir cümle yanlış sayılmasın.
6. Okuma metni: A1'de 50-90 kelime, A2'de 90-150, B1'de 150-220.
7. Bitirince her üniteyi baştan sona bir dilbilimci gözüyle tekrar oku: artikel, çoğul, fiil çekimi, kelime sırası, hâller (Akk/Dat), Türkçe çeviri doğruluğu ve Türkçe imla. Hata bulursan düzelt.
8. Doğrulayıcıyı çalıştır, 0 error olana kadar düzelt.

Dosyaları /home/claude/kurs/units/<id>.json olarak yaz (UTF-8, geçerli JSON). Başka dosyaya dokunma.
Son mesajında: yazdığın ünite id'leri, doğrulayıcı sonucu ve emin olamadığın (varsa) cümlelerin listesi.
