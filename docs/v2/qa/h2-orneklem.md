# 2. hafta (gün 8–14) örneklem kontrolü — qa

Hat: yazar → dilbilimci → okur → **örneklem** (bu rapor). Dosyalar yalnız okundu, değiştirilmedi.
Kapsam: `content/v2/m1/gun-08.json` … `gun-14.json`, `hafta-sonu-testi-02.json`, `gorulmemis-02.json`, `dn-02.json` (dal `content/a1-h2`, ağaç `/home/claude/wh2`).

## Seçim (tekrarlanabilir)
- **Tohum: 20261123** (`random.Random(20261123)`, Python 3).
- Havuz: her gün için türlere ayrılmış öğeler — `gorev` (halka görev cümlesi), `kalip`, `anlama` (ana_fikir/ayrinti/eylem/halka sahne sorusu), `dikte`, `golge`, `cevapla`, `prova` (düğüm), `okuma` (okuma soruları + yazma), `sinav` (gun_sinavi maddesi); test havuzu: `hst` (12 madde), `gorulmemis` (7 durum). `gorsel` brief'teki türlerde olmadığı için havuz dışı.
- Yöntem: gün 8→14 sırayla, tür adları sıralanır, `shuffle` edilir, ilk 3 türden birer öğe `choice` ile seçilir (21 öğe); sonra `sample(hst, 5)`, `sample(gorulmemis, 4)` (9 öğe). Toplam 30; her günden 3, testlerden 9.
- Havuz büyüklüğü 1.–7. gün dışı: gün başına 120–140 öğe, toplam ~920 öğe → örneklem ≈ %3,3 (görevin istediği sabit 30 öğe).

## Ölçütler
1 Almanca doğru/doğal, Türkçe doğru · 2 istenen her sözcük o adıma kadar öğretilmiş (1. hafta + tablo `a1-kesin.json` kartları/çerçevesi + o güne kadarki kalıp satırları + sunulmuş `gr:`/`dn:` tabloları) · 3 kabul listesi (≥3, yanlış yok; dikte = aynı metnin yazımları) · 4 soru ↔ kanıt, çeldiriciler açıkça yanlış · 5 kişisel bilgi yok, `{name}` kuralı, ses metninde yer tutucu yok.

## Sonuçlar

| # | Öğe | Yer | Sonuç | Not |
|---|---|---|---|---|
| 1 | gün sınavı dikte "Die Semmeln kommen erst um acht." | gun-08 `m1:08:s1` | TAMAM | erst 8. gün kartı; Semmeln 4. gün; 3 yazım. |
| 2 | kalıp "Alles klar! – Na klar!" | gun-08 `m1:08:h3` kalip[1] | TAMAM | TR doğru. |
| 3 | okuma gist "Ioana sana ne soruyor?" | gun-08 `m1:08:o1` | TAMAM | kanıt [4] = "Hast du heute Abend Zeit?" doğru cümle; Zeit 8. gün kartı; çeldiriciler metinde yok. |
| 4 | gölge c4 "Haben Sie heute Abend Zeit? Um sechs?" | gun-09 `m1:09:a1` b1 | TAMAM | Doğal; TR doğru. |
| 5 | prova n3 "Zwei Euro fünfzig." + 2 seçenek | gun-09 `m1:09:p1` n3 | TAMAM | "dann noch Kuchen" bağlamda (n2 "Und der Kuchen?") anlamlı; kabuller 4'er. Not: kabulde "Das ist aber viel." — aber çerçevesi 12. gün; yalnız kabul, istenmiyor. |
| 6 | gün sınavı dikte "Der Kuchen ist in der Küche." | gun-09 `m1:09:s1` | TAMAM | Kuchen/Küche 9. gün kartı, "in der Küche" 9. gün kalıbı; 3 yazım. |
| 7 | dikte gerçek (özet) | gun-10 `m1:10:a1` b1 d5 | TAMAM | "Ich rufe … an" 10. gün kalıbı; "einen Termin" 5.–7. günlerde; zorunlu Aksoy/Termin sesle tutarlı. |
| 8 | kalıp "Wann fängt … an? – Wir fangen um … an." | gun-10 `m1:10:h1` kalip[1] | TAMAM | Düzensiz fängt kalıpta gösterilmiş; TR doğru. |
| 9 | okuma detail "Herr Wimmer neden gelmiyor?" | gun-10 `m1:10:o3` | TAMAM | kanıt [4] "Herr Wimmer kommt nicht, er hat keine Zeit." doğru; keine 10. gün tablosu (gr:a1-03:t2). |
| 10 | kalıp "Herzlichen Glückwunsch! – … zum Geburtstag!" | gun-11 `m1:11:h3` kalip[0] | TAMAM | TR doğru. |
| 11 | ayrıntı "7 numaralı otobüs kaçta kalkıyor?" | gun-11 `m1:11:a1` b1 ayrinti[0] | TAMAM | kanıt c3 doğru; "sekizde" c4'teki 3 numaralı otobüs: açık yanlış. Bus aynı günün kartı ama ortam_tr'den çözülür (PM-097 md. 1). |
| 12 | cevapla "Und? Kommst du morgen mit?" | gun-11 `m1:11:a2:c1` | TAMAM | 5 kabul, hepsi doğru; "mit" ayrılabilir kullanım 8. gün dn tablosunda ("Komm doch mit!"). |
| 13 | gölge c4 "Am Dienstag um Viertel nach zehn geht es." | gun-12 `m1:12:a1` b1 | TAMAM | TR doğru. |
| 14 | kalıp "Ich hätte gern einen … – Wir hätten gern … – Was hätten Sie gern?" | gun-12 `m1:12:h1` kalip[0] | TAMAM | gr:a1-12:t2 ile tutarlı. |
| 15 | prova n2 "Passt es am Montag um acht?" | gun-12 `m1:12:p1` n2 | TAMAM | zu (12. gün kartı); 2. seçeneğin geri bildirimi durum_tr ("sekiz sana erken") ile tutarlı; uygunsuz seçenek n2'ye döner. |
| 16 | cevapla "Und du? Kommst du mit?" | gun-13 `m1:13:v1:c1` | TAMAM | "ich komm" konuşmada kabul (dn:kisaltma-1). Not: "Ja, um zehn passt." öznesiz, konuşmada kabul edilebilir. |
| 17 | gün sınavı "Ist das deine Karte?" | gun-13 `m1:13:s11` | TAMAM | meine/deine 13. gün tablosunda (gr:a1-02:t1); 5 kabul. |
| 18 | kalıp "Ich hab … – Ich komm … – Ich geh … – Wie geht's?" | gun-13 `m1:13:h1` kalip[1] | TAMAM | Not: "Wie geht's?" 14. gün h1 kalip[1]'de yeniden kalıp satırı (döngüsüzlük; küçük). |
| 19 | tr_de "Bana iki ekmek verin lütfen." | gun-14 `m1:14:s7` | TAMAM | Brote 11. gün (kalıp/yazma, why_tr); "Geben Sie mir" 14. gün kalıbı; 4 kabul. |
| 20 | görev cümlesi (lx:hören) "Wie bitte? Ich kann Sie nicht gut hören." | gun-14 `m1:14:h1` gorev[8] | TAMAM | 4 kabul; TR doğru. |
| 21 | kalıp "Geben Sie mir bitte … – Gibst du mir mal …? – Gibt es …?" | gun-14 `m1:14:h1` kalip[0] | TAMAM | Düzensiz gibst/gibt gösterilmiş. |
| 22 | HST guided "Praxis Dr. Weber, Huber, guten Tag?" | `m1:14:t06` | TAMAM | {name} yalnız kabulde, `accepted_adsiz` var. Not: istem ve ilk kabul 12. gün prova n1 ile birebir (test için kabul edilebilir). |
| 23 | HST gap "Das ist ___ Kurs." | `m1:14:t03` | TAMAM | mein/Mein/mein.; çeldirici dein TR ile açıkça yanlış. |
| 24 | HST transform → "Ich habe keinen Termin." | `m1:14:t05` | TAMAM | keinen 12. gün tablosu (gr:a1-06:t1). |
| 25 | HST gap "Ich hätte gern ___ Apfel." | `m1:14:t10` | TAMAM | einen 12. gün tablosu. |
| 26 | HST guided "Weißt du, wann der Kurs ist?" | `m1:14:t12` | TAMAM | 7 kabul; yan cümle yalnız duyuluyor, istenmiyor. |
| 27 | görülmemiş cd:m1:11 (Wimmer, firma, "Was brauchen wir für morgen?") | `m1:h02:g4` | TAMAM | Not (öneri): beklenen miktar "zehn Semmeln und zwei Brote" 11. günün yazma örneği ve prova durumuyla birebir; aktarımı ölçmek için farklı sayı/ürün daha iyi. |
| 28 | görülmemiş cd:m1:09 (Tobi, firma mutfağı, "wo ist der Kuchen?") | `m1:h02:g2` | **HATA** | Derste kullanılmış durum: 9. gün sahnesi firma mutfağında Tobi + kek (`m1:09:v1` s1–s12), halka görevi "Der Kuchen ist in der Küche, Tobi." (`m1:09:h2`). PM 7087286882: "derste kullanılmayan yeni durum (başka kişi, başka yer)" karşılanmıyor. Ek: Kuchen 9. günde "kek", burada "pasta". |
| 29 | görülmemiş cd:m1:12 (Luka, kuaför, hesap) | `m1:h02:g5` | TAMAM | 12. gün fırın/muayenehane; kuaför ve Petrović yeni. "etwas" 14. gün çerçevesi, test hafta sonunda. Not: "seninle du konuşuyor" yerine "sana du diyor" daha doğal. |
| 30 | görülmemiş cd:m1:14 (Noel pazarı, pasta standı) | `m1:h02:g7` | TAMAM | 6 kabul; "zwei Kuchen" çoğulu doğru (iki bütün pasta, TR ile tutarlı). |

**Hata: 1 / 30 (%3,3).** Görevin eşiği %10 → tam tur gerekmez. (qa tanımındaki %2 eşiği aşıldığı için yalnız `gorulmemis-02.json` dosyasının dilbilimciye geri gönderilmesi önerilir; g2 için yeni yer/kişi, ör. pl:wohnung + ch:brandl.)

## Örneklem dışı gözlemler (sayılmadı)
- `gun-11.json` `m1:11:a2` c3 "Derya fährt mit dem Auto, um halb sieben." — Auto 1.–2. hafta kartı değil (lx:Auto batch-014); c3 `ayrinti[0]` ve `eylem` kanıtı. FORMAT: kanıt cümlesinde bilinmeyen olamaz. Doğrulayıcı yakalamadı.
- Kuchen Türkçesi tutarsız: 9. gün "kek", görülmemiş/HST/14. gün prova "pasta".
- Yinelenen kalıp satırları: "Wie geht es Ihnen?" (8. ve 12. gün), "Wie geht's?" (13. ve 14. gün).
- Doğrulayıcı uyarısı AK-3: görev cümlesinde bilinmeyen > 0 — 8. gün 3/22, 10. gün 2/21, 12. gün 2/23, 13. gün 1/23, 14. gün 2/27.

## Ölçüm (`KT="8 14" /home/claude/araclar/kos.sh /home/claude/wh2 --tum`, ağaç `/home/claude/wolc`)
```
== validate
içerik v2: 20 alan · 1499 kelime (1207 K1, 0 K2; 15 parti) · 61 kalıp · 202 dilbilgisi · 6 senaryo · 2241 seviye tespiti maddesi → 0 hata, 145 uyarı
== dikiş
| 8 | 2 | denetlendi | 0 | 0 | 0 | 0 | 0 |  |
| 9 | 2 | denetlendi | 0 | 0 | 0 | 0 | 0 | 2 adım gösterilmiş kalıpla (eşdizim/ders parçası) geçti |
| 10 | 2 | denetlendi | 0 | 0 | 0 | 0 | 0 |  |
| 11 | 2 | denetlendi | 0 | 0 | 0 | 0 | 0 |  |
| 12 | 2 | denetlendi | 0 | 0 | 0 | 0 | 0 |  |
| 13 | 2 | denetlendi | 0 | 0 | 0 | 0 | 0 |  |
| 14 | 2 | denetlendi | 0 | 0 | 0 | 0 | 0 |  |
İhlal: 0
gün 8: çerçeve 4, eksik 0; durak 7, adım 74, 56 dk, gevşeme 7
→ 0 hata
gün 14: çerçeve 5, eksik 0; durak 5, adım 26, 35 dk, gevşeme 6
→ 0 hata
```
(1.–7. gün satırları da 0 ihlal; kısaltıldı.)
