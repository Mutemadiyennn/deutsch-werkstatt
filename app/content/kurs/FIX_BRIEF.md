# Görev: Üretim maddelerinde öğretilmemiş kelimeler + QA içerik bulguları

Sen bağımsız bir DaF editörüsün. Kurallar: /home/claude/kurs/SCHEMA.md. Müfredat: plan.json. Doğrulayıcı: `python3 validate.py units/<id>.json` (0 error şart).

## 1) Öğretilmemiş kelime
Öğrenci `say`, `fix` ve `order` maddelerinde cümleyi KENDİSİ üretir (Türkçeden Almancaya). Cümlede o ana kadar hiç görmediği bir içerik kelimesi varsa üretemez ve haksız yere yanlış sayılır.
Tarama raporu: {RAPOR} — her ünite için "cümle → şüpheli kelimeler". Rapor kaba bir taramadır: çekimli biçimler (spiele, trinkst, gewohnt…), sayılar ve özel isimler (şehirler, kişi adları) genelde SORUN DEĞİLDİR; öğrenci bunları bilir ya da kuralla üretebilir.
Her gerçekten yeni İÇERİK kelimesi için (ör. a1-03 'Bäckerei', 'Banane'; a1-10 'Fenster', 'Augen'): şu ikisinden birini yap —
 a) Kelime ünitenin temasına önemli ölçüde aitse: ünitenin "words" listesine ekle (de, art, pl, tr, t) ve mümkünse bir teach örneğinde de geçir;
 b) Değilse: cümledeki kelimeyi öğrencinin bildiği bir kelimeyle değiştir (Türkçe çeviriyi, alt listesini ve gerekiyorsa why_tr'yi de güncelle).
"words" listesi en fazla 20 kelime olsun.

## 2) QA bulguları (sadece ilgili ünitelerde)
- a1-02 t5 (sayılar): "dikkat: dreißig, sechzig, siebzig" belirsiz. Açıkça yaz: 'sechs → sechzig' ve 'sieben → siebzig' kökü kısalır, 'dreißig' '-ßig' ile biter (dreizig değil).
- a1-03: "Das ist keine Kartoffel, das ist eine Zwiebel." → '…, sondern eine Zwiebel.' daha doğal (alt'a eski biçimi koy). t4 "her zaman Ich möchte" ifadesi "Willst du Milch?" kabulüyle çelişiyor: kuralı yumuşat ('kibar istek için möchte'). Hitap birliği: "göreceksin/göreceğiz" → tek biçim ("göreceksin").
- Bütün ünitelerde: rol oyunu hedeflerinde ve açıklamalarda "Pl" kısaltması → "çoğul". Kelime tr alanında "(yalnız çoğul)" gibi açıklamalar kalabilir ama `pl: "Pl"` kullanan isimlerde tr'nin ilk kısmı kısa ve açık olsun (uygulama ';' ve '(' öncesini soru olarak gösterir).
- Kelime tr alanları: uygulama soru olarak ';' ve '(' öncesini gösterir; bu kısım kısa, net ve cevabı içermeyen bir Türkçe karşılık olmalı (ör. "yaşlı; … yaşında" iyi; "kilo (ama: zwei Kilo Äpfel)" iyi). İlk kısımda Almanca kelime geçmesin.

Senin ünitelerin: {UNITS}
Bitirince her ünite için yaptığın değişikliklerin kısa listesi.
