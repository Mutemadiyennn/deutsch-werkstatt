# Deutsch Werkstatt — TEK YOL HARİTASI

> Sahibi: proje yöneticisi (PM). Tarih: 17.11.2026. Kişisel bilgi içermez.
> Bu belge **sırayı** yönetir: öğrenci hangi hafta neyi yapabilir hale gelir, ürün hangi tarihte neyi sunar, her adım hangi kapılardan geçer. **Ne** yapılacağının ayrıntısı LEARNING_SYSTEM.md (LS), REQUIREMENTS.md (RQ), DESIGN.md ve PEDAGOGY.md'dedir. Ana oturum işi bu haritadaki sırayla seçer; haritada olmayan iş yapılmaz, haritaya ancak PM ekler.

## 0. Tek ilke

**Öğrenci her gün bir adım ileri gider.** "Adım" = dün yapamadığı bir şeyi bugün yapabilmek (yeni bir cümleyi ipucusuz söylemek, bir hızda dinlediğini anlamak, bir gerçek görevi denemek). Bir gün adımsız geçtiyse ürün bunu fark eder ve ertesi günü buna göre kurar. Üç gün üst üste adım yoksa koç planı değiştirir ve PM'ye işaret düşer.

## 1. Altı bakış açısı = altı kapı

Her sürüm ve her önemli PR yayından önce altı kapıdan geçer. Bir kapıdan geçemeyen iş yayınlanmaz.

| Kapı | Soru | Nasıl ölçülür |
|---|---|---|
| **Öğrenci** | Bugün bir adım attım mı, sıkıldım mı, takıldım mı? | Bilgi kısıtlı öğrenci simülasyonu (LS-16.3); bırakma noktaları |
| **Öğretmen** | Önce öğretti mi, sonra mı istedi? Konuşturdu mu? | Kurma merdiveni ve senaryo standardı kontrolü; sesli üretim oranı |
| **Dilbilimci** | Almanca doğru ve doğal mı, gerçekten böyle konuşuluyor mu? | Bağımsız dilbilimci raporu; rastgele örneklem hatası ≤ %2 |
| **Test uzmanı** | Her koşulda çalışıyor mu? | WebKit testleri; mikrofon 50 denemede ≥ 49; internetsiz ve yapay zekâsız gün; hata enjeksiyonu |
| **Tüketici** | Açmak istiyor mu, güzel mi, ödüllendirici mi? | DESIGN.md kabulü; ekran başına tek ilerleme; açılma sıklığı |
| **CEO** | Bu iş öğrenciyi nihai hedefe (günlük hayatta neredeyse ana dil rahatlığı) yaklaştırıyor mu, yoksa oyalıyor mu? | LS-0.2 ölçütleri; "yapabiliyorum" listesindeki artış |

## 2. Öğrencinin yolu ve ürünün yolu (aynı takvim)

Tarihler hedeftir; kayarsa PM yeniden planlar ve öğrenciye açıkça söyler. Bir sürüm kapılardan geçmeden tarih tutturmak için yayınlanmaz.

| Dönem | Öğrenci bu dönemin sonunda… | Ürün o tarihe kadar… | Kapı kanıtı |
|---|---|---|---|
| **Şimdi → R1** | Öğrenci uygulamanın hazır olmasını bekler (kendi tercihi); kursuna devam eder | Birleştirme turu (PM-007) biter, /v2/ yayına çıkar, R1 hazırlanır | Açık PR ≤ 3, /v2/ yayında |
| **27.11.2026** | Weihnachtsmarkt'ta sipariş verebilir | Advent/Weihnachtsmarkt mini senaryoları (LS-17.0) | 3 senaryo, dilbilimci onaylı |
| **R1 "İlk telefon"** — hedef: 1. Aralık haftası | Telefonla randevu alır; anlamadığında kontrolü elinde tutar; arabada ders yapar | LS-17 R1 kapsamı + PM-003…PM-008'in R1 maddeleri + DESIGN.md (Bugün, ifade kartı, gelen arama) | 6 kapının tamamı; ilk 10 dakika ölçütü (LS-2.2) |
| **R2 "Molada konuşan"** — hedef: 20.12.2026 | Molada 2 dk sohbete katılır; hafta sonunu anlatır; Weihnachtsfeier'de küçük sohbet yapar | Mola sohbetleri, smalltalk, Benim cümlelerim, spor + toplu taşıma modu, hikâye 1–4, şehir haritası, haftalık koç, ödev yardımcısı, telefon 03–04, arzt 02–04 | 6 kapı; 4 bağlam modu simülasyonu |
| **R3 "Şehirde"** — hedef: 20.01.2027 | Bürgeramt, banka, ev sahibi, market iadesi; habersiz aramaya cevap verir | einkaufen, bäckerei, amt, bank, wohnung, iş arama/iş görüşmesi; Kulak Salonu 3–4; gelen arama kademe 2–3; gerçek medya köprüsü | 6 kapı; Ay 3 "yapabiliyorum" hedefleri |
| **R4 "Rahat"** — hedef: 01.02.2027 (Fasching'den önce) | Hızlı konuşanı takip eder; Bavyera ifadelerini anlar; 5 dk sohbet eder | Kalan alanlar; Kulak Salonu 5 (kaynaklı Bairisch); aylık konuşma karşılaştırması; Fasching/Starkbierzeit | 6 kapı; 19+ alan yayında |
| **R5 "B1"** — hedef: sınav gününden 6 hafta önce (tarih yalnızca cihaz profilinde; D-075) | B1 sınav formatlarına hazır | B1 yolu (LS-15); medien alanı; v1'in emekliye ayrılması (onaylı liste) | Deneme sınavı sonuçları |
| **Sınav günü** (yalnızca cihaz profilinde) | B1 sınavı | — | — |
| **R6 "Akıcı" (ay 7–12)** | Çok kişili hızlı sohbeti takip eder, tartışır, espri anlar | PM-009 R6 | Gerçek görev kanıtları |
| **R7 "Doğal" (ay 12–24)** | Register geçişleri, uzun anlatı, doğal tepkiler | PM-009 R7 | Aylık kayıt karşılaştırması |
| **R8 "Gerçek dünya"** (R6 ile paralel) | Dizi, film, podcast ile kendi kendine öğrenir | PM-009 R8 | "Duyduğum kelime" akışı |

## 3. Günlük ilerleme güvencesi (ürün içinde, R1'den itibaren)

- Bugün ekranının en üstünde "Bugünün adımı": bugün yapabilir hale geleceğin tek şey (ör. "Randevuyu telefonda ertelemek"). Gün sonunda başarıldıysa Raute dolar.
- Haftalık "yapabiliyorum" hedefi: her hafta en az 1 yeni gerçek hayat becerisi.
- 3 gün üst üste adım yoksa: koç planı sadeleştirir, bir önceki aşamaya döner, başarı bandını (%80–85) yeniden kurar.
- **Haftalık özet paylaşımı:** Öğrencinin ilerleme verisi cihazındadır; PM bunu göremez. Bugün ekranında tek dokunuşla "Haftalık özeti paylaş" (kişisel bilgi içermeyen sayılar: odak dakikası, sesli cümle, yeni kalıcı öğe, gerçek görev, İngilizceye kaçma, takıldığı ekranlar). Öğrenci isterse PM'ye iletir; PM planı buna göre ayarlar.

## 4. İş seçme kuralı (ana oturum için)

1. Önce açık PM talimatları (#12), P0 → P1 → P2.
2. Sonra bu haritadaki bir sonraki sürümün kapsamı, REQUIREMENTS.md'deki o sürüme işaretli maddelerle birlikte.
3. Haritada olmayan iş yapılmaz; gerekiyorsa #12'de PM'ye önerilir.
4. Aynı anda en fazla 3 açık PR; her PR birleşince STATUS.md güncellenir.
