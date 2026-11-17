# Görev: Her kelimeye 4 yeni örnek cümle (fotoğraf + cümle çalışması için)

Uygulama bir kelimeyi her gösterişinde FARKLI bir cümle kullanacak ki öğrenci cümleyi ezberleyemesin, kelimeyi öğrensin.
Bunun için /home/claude/kurs/units/<id>.json içindeki her "words" maddesine bir "ex" alanı ekle:
"ex": [{"de":"Almanca cümle.", "tr":"Türkçe çevirisi.", "form":"cümlede boş bırakılacak tam kelime biçimi"}, … 4 adet]

Kurallar (SCHEMA.md'yi de oku):
1. `form`: kelimenin cümlede geçtiği TAM yazılış (çekimli olabilir: wohne, wohnst, Kinder, alten…). `form` mutlaka `de` içinde birebir geçmeli. İsimlerde artikel `form`'a dahil DEĞİL (yalnız isim: "Brot"). Kalıp kelimelerde (ör. "Freut mich!") `form` kalıbın tamamı ya da ana kelime olabilir.
2. Seviye: SADECE bu ünitenin ve önceki ünitelerin konuları ve kelimeleri + en temel kelimeler. A1'de 3-8 kelimelik kısa, net cümleler; A2'de 5-11; B1'de 6-14.
3. Cümle, kelimenin ANLAMINI bağlamdan anlaşılır kılmalı; boşluğa başka bir kelime de rahatça uyuyorsa cümleyi değiştir.
4. Çeşitlilik: 4 cümle 4 farklı durum, farklı kişiler (ich/du/er/sie/wir/Sie…), farklı yerler (Bavyera'da gündelik hayat). Ünitedeki mevcut cümleleri kopyalama. Öğrencinin kişisel hayatı (iş, spor, eş) YOK.
5. Almanca %100 doğru ve doğal; Türkçe doğal, imla doğru, çeviri birebir anlam.
6. Soyut ya da işlevsel kelimelerde de (auch, wo, obwohl…) 4 cümle yaz.
7. Başka alanlara dokunma. JSON'u indent=1, ensure_ascii=False ile yaz. Her dosyadan sonra: `python3 validate.py units/<id>.json` → 0 error.
8. Bitirince yazdıklarını bir dilbilimci gözüyle baştan oku ve hataları düzelt.
Son mesajında: kaç kelimeye kaç cümle yazdığın ve emin olmadığın örnekler.
