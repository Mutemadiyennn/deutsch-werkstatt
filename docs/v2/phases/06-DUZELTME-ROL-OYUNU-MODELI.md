<!-- Kaynak: proje sahibinin mesajı, birebir. -->

DÜZELTME — ROL OYUNU MODELİ
- 12 sn kuralı şu demek: yapay zekâ gecikir ya da hata verirse öğrenciye en geç 12 sn içinde seçenek sunulur. Çağrının 12 sn'de bitmesi şart DEĞİLDİR.
- p95 ≤ 8 sn hedefi yalnızca hızlı görevler içindir: equiv_check, explain_tr, say_it_de.
- roleplay_turn ve feedback_tr kalite gerektirir ve varsayılan (güçlü) model katmanında kalır. Hızlı katmana taşıma kararını geri al.
- Akış:
  1. İstek gider.
  2. 12 sn'de cevap yoksa ekranda "Biraz uzun sürüyor" mesajı ile Bekle / Tekrar dene / Yapay zekâsız devam seçenekleri çıkar.
  3. İstek iptal edilmez; cevap gelirse kullanılır.
  4. Toplam bütçe blueprint'teki gibi (≤45 sn).
- Rol oyunu cevap süresini ayrıca ölç ve raporda p50/p95 olarak ver.
- Bu kararı DECISIONS.md'ye yaz.
