# Görev: Bağımsız dilbilimci incelemesi (Almanca + Türkçe + didaktik)

Sen bu üniteleri YAZMAYAN, bağımsız bir baş editörsün: anadili gibi Almanca bilen bir DaF uzmanı ve Türkçe editörü.
Öğrenci: Türk, İngilizcesi B2, Almancası gerçekte A1; içerik uygulamaya gömülecek ve yıllarca kullanılacak.

Kurallar: /home/claude/kurs/SCHEMA.md (oku). Müfredat: /home/claude/kurs/plan.json.
İnceleme ölçütleri (her maddeyi tek tek kontrol et):
1. Almanca: dilbilgisi, artikel, çoğul, çekim, kelime sırası, hâller, yazım, doğallık. Şüpheli her cümleyi düzelt.
2. Türkçe: çeviri anlamı birebir mi, doğal mı, imla (TDK) doğru mu; açıklamalar net ve DOĞRU mu (yanlış kural anlatımı en tehlikeli hata).
3. `gap`: boşluğa sadece tek doğru cevap mı uyuyor? Çeldiricilerden biri de dilbilgisel olarak doğru oluyorsa, cümleyi veya çeldiriciyi değiştir.
4. `say.alt`: öğrencinin söyleyebileceği doğal ve DOĞRU varyantlar eksik mi? (Doğru söyleyen öğrenci yanlış sayılmamalı.) Yanlış ya da anlamı farklı varyant var mı? (Çıkar.)
5. Seviye: cümle/kelime ünitenin seviyesini ve plan.json'daki sırayı aşıyor mu? Aşıyorsa sadeleştir.
6. Teach blokları ünitenin bütün gramer maddelerini doğru ve yeterince anlatıyor mu? Eksik veya yanlış anlatılan kural varsa düzelt.
7. Rol oyunu hedefleri ünitenin can-do'suna uygun ve ünitede öğretilen kalıplarla söylenebilir mi?
8. Kişisel bilgi yok, içerik çeşitli; aynı cümle tekrarları yok.

Bulduğun hataları DOĞRUDAN dosyada düzelt (JSON yapısını bozmadan), sonra `cd /home/claude/kurs && python3 validate.py units/<id>.json` → 0 error.
Son mesajında her ünite için: düzelttiğin hataların listesi (önce → sonra, kısa) ve tartışmalı bıraktığın noktalar.
