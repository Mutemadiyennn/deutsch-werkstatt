# 1.–2. hafta (1.–14. gün): İÇ-15 dilbilimci FARK turu

Tarih: 2026-11-23 · Yazan: dilbilimci-ajan · Bağ: İÇ-15, PR #196, #197, #215 · Ağaç: `/home/claude/bt`
Kapsam: yalnız `git diff 1253c79c 687efd01` (yazar kaydı: `h1-h2-ic15-yazar.md`) ve bu değişikliğin yan etkileri. Tam tur değil.
İncelenen madde: 26 (yazar tablosundaki 14 + 12 değişiklik).

## Bulgular
| # | yer | sorun | düzeltme |
|---|---|---|---|
| 1 | gun-14 · m1:14:h1 · kaliplar[1] | Gösterim `Ich denke, am Sonntag ist die Praxis zu.` "kapalı" anlamını taşıyor. Bu anlam lx:zu kartının öğrettiğiyle örtüşmüyor: kart edat (`pos: prep`). Eşdizimleri (`zum Arzt gehen`, `zu Hause`), örneği (`zu Freunden`) ve hataları (`zu der Arzt`, `nach Anna`) hep yön bildiriyor. "kapalı" yalnız kartın `tr` alanında ek olarak duruyor. Üstelik aynı anlam 2. günde zaten gösterilmişti (`Die Praxis ist im Januar zu.`). | `Kommst du heute zu mir?` · tr `Bugün bana gelir misin?` Bu edat anlamı, yalnız bilinen sözcüklerle kuruldu: `kommen`, `heute` ve 5. günde gösterilen `mir`. Aynı günün sahnesine de bağlanıyor (`Heute kommt ein Gast!`). 1.–56. günde aynı cümle yok. |
| 2 | gun-11 · m1:11:h2 · kaliplar[0].tr | `İyi günler! (güneyde en sık duyulan selam)`: "güneyde" belirsiz (neyin güneyi?). Sonraki günlerin karşılığıyla da tutmuyor (23.–27. gün: `Merhaba! (Bavyera'da sık)`). | `Merhaba! (Bavyera'da en yaygın selam) – …` Kaynak WORLD §5 (thelocal.de, "Grüß Gott": Bavyera'nın olağan selamı). Bairisch iddiası kaynaklı, yeni iddia eklenmedi. |
| 3 | gorulmemis-02 · m1:h02:g3 · prompt_de | `Petrović, hallo?`: sondaki soru tonu, hat kötüymüş ya da arayan duyulmuyormuş gibi okunuyor. İşyerinde telefonu soyadıyla açan biri genelde selamla bitirir. | `Petrović, guten Tag!` Durum metni (`Telefonu kendisi açıyor.`) ve accepted[] uyumlu kaldı (`Hallo/Guten Tag, hier ist {name} …`). |
| 4 | gun-10 · m1:10:v1:c1 · prompt_de + situation_tr | (a) Yazar soruyu kısaltınca soru 13. gün c1'in sorusuyla birebir aynı oldu (`Und du? Kommst du mit?`), bu bir tekrar. (b) Yeni `situation_tr` Almanca sorunun Türkçesini veriyordu (`sen de geliyor musun?`). Bu, dinleyip anlama işini boşa çıkarıyor. İki noktadan sonra gelen tam cümle de küçük harfle başlıyordu. | prompt `Und du? Kommst du heute Abend mit?`: s1'deki `heute Abend` ile bağlı, bütün sözcükleri bilinen sözcükler. situation_tr `Tobi sana dönüyor, seni de çağırıyor. Kabul et ve teşekkür et.` accepted[] (5) ve why_tr değişmeden uyumlu. |
| 5 | gun-06 · m1:06:h1 · kaliplar[1] | Satır beş seçeneğe çıkmıştı (yazarın açık noktası 1). `Am zweiten Mai …` cümlesi, `am zweiten …` seçeneğini tekrarlıyordu. | `am ersten Mai – am zweiten … – am dritten … – Am vierten Mai habe ich einen Termin.` · tr `bir mayısta – ayın ikisinde – üçünde – Dört mayısta randevum var.` Satır dört seçeneğe indi, 1–4 sırası ve `einen` gösterimi korundu. |

## Sorunsuz bulunanlar (değişmedi)
- gun-02 h1 `der März – im März` (tr `mart – martta`) ve gun-02 h4 `… hat im August Urlaub.` (`… ağustosta izinli.`): doğru ve doğal. `hat`, 2. gün s6/s9'dan ve 3. gün s1'den önce, aynı haftada gösteriliyor.
- gun-05 h4 `… passt mir.`, gun-08 h1/h2/h3 (`im Büro`, `… und ein Brot`, `Gut, aber müde.`), gun-09 h2/h3 (`von mir`, `seine Familie`), gun-11 h1 (`Der Bus fährt um …` / `Otobüs saat …ta kalkıyor.`), gun-11 h3 (`Das ist für dich.`), gun-12 h1 (`Woher kommen Sie? – Aus …` / `Nerelisiniz? – …'den.`): Almancaları doğru ve günlük dilde gerçekten kullanılıyor. Türkçeleri kısa, terim yok, İngilizce yok.
- gun-09 h4 beş seçenek (`… – Seit wann? – Seit gestern.`): bu beş seçenek tek ve tutarlı bir doktor konuşması. Bölünmesi gerekmiyor, kart sözcükleri (`schlimm`) içinde kalıyor.
- gun-10 h1 `… ruft an.`: kullanım yeri `Herr Wimmer ruft an.` (s7, d4). gun-10 n3: `Moment` çıkınca söz doğal kaldı, seçeneklerle uyumlu.
- gun-11 n2 `Möchten Sie dann ein Brot?`: `dann` (eksik ekmeğin yerine) seçeneklerle ve geri bildirimle (`Eksik kalanı ekmekle tamamladın.`) `auch`'tan daha iyi uyuşuyor.
- gun-12 n1b `Gut, danke. Und was hätten Sie gern?`: öğrencinin yanlış `du` sorusuna verilen doğal bir cevap. Seçenekler ve geri bildirim tutarlı.
- gun-13 h1 `Dieses Mal geh ich …` (`Bu sefer … gidiyorum.`): doğru. Konuşmada `Diesmal` daha sık, ama `dieses Mal` de doğal ve lx:dieser'i gösteriyor.
- dn-02 `etwas · bir şey · Noch etwas?` ve `nichts · hiçbir şey · Danke, nichts mehr.`: doğru. Örnekler soru-cevap çifti oluşturuyor.
- Dikiş (d): 1.–56. günde yinelenen bir üretim cümlesi yok. `Zwei Semmeln und ein Brot, bitte.` (8. gün kalıbı) 4. ve 14. günde de geçiyor, ama kalıp satırı (d)'nin kapsamında değil, sorun sayılmadı.

## Okur için değişen Türkçe alanlar (yazarınkine EK)
| dosya | madde | alan |
|---|---|---|
| gun-06.json | m1:06:h1 | kaliplar[1].tr |
| gun-10.json | m1:10:v1:c1 | situation_tr |
| gun-11.json | m1:11:h2 | kaliplar[0].tr |
| gun-14.json | m1:14:h1 | kaliplar[1].tr |

## Ölçü (`bash /home/claude/olc.sh 2`, son koşu)
- 2. hafta kapısı **GEÇTİ**: öğretilmeden 0 (kesin 0, sınırda 0) · karşı soru 0 · test %100 (12/12) · görülmemiş 7/7
- Dikiş: 1.–14. gün 0 (kalan 2 ihlal 55. ve 56. günde, bilinen)
- H1BICIM satırı yok · "H2:" kapsam satırı yok (lx:zu yeni kalıpla örtülü)
- validate: 1.–14. gün 0 HATA (toplam 7 HATA, 50.–56. gün, bilinen) · uyarı 278 (değişmedi)
- Bilgi için 1. hafta kapısı: 24 (yazarın değeri, değişmedi)

## Kalan şüpheler
1. Sözlük kaynaklı (yazma yetkim yok): lx:zu kartının `tr` alanı `-e, -a, kapalı`. Edat kartına "kapalı" anlamı karışmış. Bu anlam ayrı bir kart olmalı ya da tr'den çıkarılmalı (lex'e).
2. `Grüß Gott` karşılığı ürün içinde iki biçimde: 11. gün `Merhaba! (Bavyera'da en yaygın selam)`, 23.–27. gün `Merhaba! (Bavyera'da sık)`. Sonraki günlere yetkim yok. Birleştirmek için öneri: `Bavyera'da en yaygın selam`.
3. Dosyaların `review` alanına dokunulmadı (görev yalnız fark turuydu).

Hata oranı: 5 bulgu / 26 madde = 0,19.

Karar: **DÜZELTİLDİ-ONAY**
