<!-- Kaynak: proje yöneticisinin FAZ R mesajı, birebir. Not: istenen ad 10-FAZ-R.md idi; 10 numarası H4'e verilmişti (10-H4.md), çakışmamak için 12 kullanıldı (D-071). -->

FAZ R — ÖĞRENME SİSTEMİ VE SÜRÜM PLANI (ekteki LEARNING_SYSTEM.md ile birlikte)

Ekteki LEARNING_SYSTEM.md artık ürünün EN ÜST belgesidir. Öncelik: LEARNING_SYSTEM.md > PEDAGOGY.md > phases/ > BLUEPRINT.md. Her gereksinimin kimliği var (LS-x.y); görevler, PR'lar ve raporlar bu kimliklere atıf yapar.

1. HEMEN (şu anki adımını bitir, sonra)
a) Belgeyi docs/v2/LEARNING_SYSTEM.md olarak ekle (ayrı küçük PR). Bu metni de phases/10-FAZ-R.md olarak kaydet.
b) CLAUDE.md: her oturumun okuma listesinin başına LEARNING_SYSTEM.md, LEARNER.md, WORLD.md ekle.
c) STATUS.md'ye her LS kimliği için durum satırı aç (yapılacak / sürüyor / bitti / ertelendi + gerekçe).

2. ÖNCELİK SIRASI
1) Elindeki PR'ları bitir.
2) Proje yöneticisinin PR #4–#6 incelemesi (daha önce aldıysan tekrar etme, uygulanıyor demektir):
   - P0: 61 kalıbın hiçbiri standartta değil → pilotta kullanılanlardan başlayarak H3 §3'e göre tamamla, dilbilimciden geçir. Kalıplar "reviewed" olmadan yeni senaryo yazılmaz.
   - P1: öğrenci satırlarında sabit ad/cinsiyet yok → {name}, {Patient|Patientin} yer tutucuları; değerler yalnızca cihazdaki profilden.
   - P1: heceleme hem DIN 5009 hem geleneksel biçim.
   - P2: listening[].speeds dolu; üretim maddelerinde accepted[] ≥ 3; İngilizce yalnızca "yanlış arkadaş" uyarısı (DECISIONS.md).
3) H4 a–c (LEARNER.md, WORLD.md, pilotun dünyaya bağlanması).
4) LS-17.0: Advent / Weihnachtsmarkt mini senaryoları (2–3), mevcut oynatıcıyla, 27.11.2026'ya kadar yayında.
5) H3 kontrol noktası raporu (H3 §10 + ÇALIŞMA DÜZENİ tablosu + EK1/EK2 tabloları).
6) R1 (LS-17): görev dökümünü LS kimlikleriyle çıkar, sonra uygula. H4'ün d–h maddeleri ve "gerçek konuşma öncesi/sonrası" özelliği (LS-10.5) R1 ve R2 kapsamına dağıtılmıştır; ayrı faz olarak bekleme.

3. ÇALIŞMA RİTMİ
- H3 kontrol noktası raporunu ver ama DURMA; onay gerektirmeyen işlere devam et. Proje yöneticisi PR'ları GitHub'dan eş zamanlı inceler ve düzeltmeleri mesajla gönderir.
- Yalnızca şu durumlarda dur ve sor: geri alınamaz bir işlem (git geçmişi temizliği gibi), para gerektirebilecek bir karar, ya da LS belgesiyle çelişen bir zorunluluk.
- Durma noktası: R1 kabulü. R1 raporunda LS-16.3 öğrenci simülasyonunun altı maddesinin her biri için geçti/kaldı, bulgular ve ekran görüntüleri olsun.
- Bağlam doluyorsa: STATUS.md'yi güncelle ve raporun sonuna BAŞLANGIÇ metni ekle; proje sahibi yeni sohbet açar.

4. ÖĞRENCİ SİMÜLASYONU (LS-16.3) her sürümde zorunlu ve QA ajanı bilgi kısıtlı oynar: uygulama öğretmediği bir öğeyi üretmesini isterse P0 hata.
