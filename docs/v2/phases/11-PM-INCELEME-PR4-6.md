<!-- Kaynak: proje yöneticisinin PR #4, #5, #6 incelemesi, birebir. -->

PROJE YÖNETİCİSİ İNCELEMESİ — PR #4, #5, #6 (içerik). Karar ve düzeltmeler:

GENEL: telefon/01, strategie/01 ve arzt/01 gerçekçilik ve madde sayısı olarak standardı karşılıyor; rol oyunu partner talimatı v1 sorununu çözüyor; K1 kartları nitelikli. Aşağıdakiler düzeltilmeden pilotun kalan senaryolarına geçilmez.

P0 — KALIPLAR İSKELET (en kritik)
- registry/patterns.json: 61 kalıbın 0'ı standardı karşılıyor. Örnek sayısı 57'sinde 1, 4'ünde 2; slots ve transforms boş; hepsi draft.
- Kalıplar, öğrencinin "kelimeyi biliyorum ama cümle kuramıyorum" sorununun çözüm noktası. H3 §3 standardı aynen uygulanır:
  - slotlar, her slot için ≥8 doldurma
  - 2–4 satır Türkçe not
  - ≥10 örnek (hd + alltag)
  - dönüşümler: soru, olumsuz, kibar, Perfekt; weil, dass, wenn
  - mistakes_tr
- Sıra: önce pilotta kullanılan kalıplar, sonra kalanlar. Dilbilimci inceler. Kalıplar "reviewed" olmadan pilotun 02–04 senaryoları ve yeni alanlar yazılmaz.
- Doğrulayıcıya kural: senaryonun essentials.patterns listesindeki her kalıp "reviewed" olmalı.

P1 — ÖĞRENCİNİN KİMLİĞİ
- Öğrencinin söylediği satırlarda sabit isim ve cinsiyet yok ("hier ist Demir", "(kadın olarak) Patientin" gibi).
- Yer tutucu kullan: {name}, {Patient|Patientin} vb. Değerler yalnızca cihazdaki profilden gelir (ilk kurulumda isteğe bağlı ad ve hitap: Herr/Frau). Depoya, loglara ve yapay zekâya ad gönderilmez; yapay zekâya yalnızca hitap biçimi gider.
- Diğer karakterlerin çeşitli isimleri kalabilir.

P1 — HARF KODLAMA
- Hem DIN 5009 (şehir adlı) hem yaygın geleneksel biçim (Anton, Berta, Cäsar… / Nordpol, Otto…) öğretilir.
- Karşı taraf çoğunlukla geleneksel biçimi kullanır; dinleme maddelerinde ikisi de geçer. Öğrenci istediğini kullanır; ikisi de kabul edilir.

P2 — KÜÇÜK EKSİKLER
- listening[].speeds boş. Hazır ses gelene kadar her parçada cihaz sesi hızı tanımlanır (yavaş / doğal / hızlı). Her parça en az bir hızda zorunlu.
- accepted[]: üretim maddelerinde (build, tr_de, guided_response, transform, listen_and_respond) en az 3 varyant. gap ve pick hariç. Şu an 13 maddede eksik; doğrulayıcı kuralı ekle.
- Dünyaya bağlama (H4 c): telefon ve arzt senaryolarında öğrencinin kendi aile hekimi muayenehanesi ve sekreteri kalıcı karakter olur; farklı muayenehaneler yalnızca çeşitlilik için kalır.

KARAR — İNGİLİZCE
- Açıklama dili her zaman Türkçe.
- İngilizce yalnızca "yanlış arkadaş" uyarısı olarak kullanılabilir ("also, İngilizcedeki also değildir" gibi), çünkü öğrenci İngilizceye kaçma eğiliminde. mistakes_tr içinde, kısa.
- DECISIONS.md'ye yaz.

NOT: phases/04 ve 05 özetten yeniden kurulmuş; kurallar tam, olduğu gibi kalabilir.
