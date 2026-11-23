# 2. hafta: bağımsız inceleme 1. tur bulguları, dilbilimci düzeltmesi

Tarih: 2026-11-23 · Düzelten: dilbilimci-ajan · Bağ: İÇ-7, PR #215, `content/a1-h2` · İnceleme yorumu: 7090393746 (baş `0cc9714`)

## Özet

- Kapanan bulgu: P1-1, P1-3, P2-1, P2-2, P2-3, P2-4, P2-5, P2-6. Dokunulmayan (görev gereği): P1-2 şık sırası, P2-7 PR açıklaması, P2-8 `esdeger` anlık görüntüsü, STATUS.
- Değişen dosya: `gun-08` … `gun-14.json`, `gorulmemis-02.json`. Şık sırası ve `ans` hiçbir soruda değişmedi; yalnızca şık metinleri değişti.
- Ölçüm (`KT="8 9 10 11 12 13 14" kos.sh /home/claude/wh2 --tum`, araçlar main `0fc5272`): validate **0 hata** (147 uyarı) · dikiş **İhlal: 0** · kt eksik **0** (7 gün) · kucuk_sozcuk **0 hata** · `content/tools/halka.test.ts` 9/9.
- Türkçesi değişen satırlar okur için: `/tmp/iç7/okur3.md` (128 satır).
- `review.status` değişmedi (draft): okur bu turun Türkçe satırlarını okumadan "reviewed" yazılmaz.

## Düzeltmeler (bulgu · yer · önce → sonra)

### P1-1 · 13. gün `hätte` kalıpta yok
| yer | önce | sonra |
|---|---|---|
| gun-13 · h1 · kaliplar[0].de | Weißt du …? – Wissen Sie …? – Ich weiß … nicht. | … – Ich weiß … nicht. – Ich hätte gern … |
| gun-13 · h1 · kaliplar[0].tr | … bilmiyorum. | … bilmiyorum. – … rica ediyorum. |

Halkada kalıp satırı sayısı 2 kaldı. Validate 2 hata → 0.

### P1-3 · 11. günün noktaları 12. günde (PM-092 md. 1)
| yer | önce | sonra |
|---|---|---|
| gun-12 · h1 · lx:zu#2 (yeni görev cümlesi) | — | Zehn Flaschen? Das ist zu viel. Ich möchte nur zwei Flaschen. (çokluk + möchten) |
| gun-12 · h1 · lx:so (yeni görev cümlesi) | — | Die Semmeln sind heute nicht so warm. (çokluk) |
| gun-12 · h1 · lx:schwimmen | Hallo Basti! Gehst du morgen schwimmen? | Hallo Ioana! Möchtest du morgen schwimmen gehen? (möchten; Basti çıktı, P2-2) |

12. gün halkası 14 → 16 görev cümlesi; her yeni cümlede `accepted` 4–5.

**"Ertesi gün ≥ 2" sayımı (halka görev cümleleri, tek tek sayıldı):**

| geçiş | dil noktası | ertesi gün | cümleler |
|---|---|---|---|
| 8 → 9 | fiyat (gr:a1-03:t5) | 3 | Hier sind fünf Euro … · Was macht das? · Was kostet der Kuchen … |
| 8 → 9 | küçük sözcükler (dn) | 4 | noch zwei Semmeln · nur fünf Minuten · noch viel lernen · Das wird schon |
| 9 → 10 | der/die/das (gr:a1-04:t1) | 10 | Die Firma … · der Termin · Die Tüte · das Wort · Die Küche … |
| 10 → 11 | ein (gr:a1-03:t1) | 2 | Da kommt ein Bus! · Was kostet eine Flasche? |
| 10 → 11 | kein (gr:a1-03:t2) | 2 | wir haben keine Zeit · Ich sehe keine Semmeln mehr |
| 11 → 12 | çokluk (gr:a1-03:t3) | **2** (önce 0) | Zehn Flaschen … zwei Flaschen · Die Semmeln sind heute nicht so warm |
| 11 → 12 | möchten (gr:a1-03:t4) | **3** (önce 1) | Ich möchte nur zwei Flaschen · Möchtest du morgen schwimmen gehen? · Ich möchte am Samstag schwimmen gehen |
| 12 → 13 | hätte (gr:a1-12:t2) | 2 | Ich hätte gern die Rechnung für den Kurs · Ich hätte gern einen Termin |
| 12 → 13 | einen/den/keinen (gr:a1-06:t1) | 2 | … für den Kurs · … einen Termin |
| 12 → 13 | selam Sie/du (gr:a1-01:t1) | 2 | Guten Tag! … · Hallo! Wie geht's? … |
| 13 → 14 | mein/dein (gr:a1-02:t1) | 2 | für meine Familie · Mein Kurs ist auch am Mittwoch |
| 13 → 14 | kısa biçimler (dn:kisaltma-1) | 2 | Ich hab auch keine Zeit · Wie geht's? Ich kann nichts hören! |

"O gün ≥ 6" düzeltmeden sonra korunuyor: 12. gün hätte 6, einen/den/keinen 6, selam 6; 13. gün mein/dein 6, kısa biçim 6.

### P2-1 · 14. gün toplamları
Fiyatlar: Semmel 0,60 · Brot 3,90 · küçük pasta 4,00 · büyük pasta 12,50.

| yer | önce | sonra |
|---|---|---|
| gun-14 · sahne s11 (3 Semmel + Brot + pasta) | Das macht sieben Euro achtzig. | Das macht neun Euro siebzig. (1,80 + 3,90 + 4,00) |
| gun-14 · sahne ayrinti[1] opts[0], ayrinti[0] opts[2] | Yedi avro seksen | Dokuz avro yetmiş |
| gun-14 · sahne dikte d4 `accepted` | … sieben Euro achtzig | … neun Euro siebzig (3 yazım) |
| gun-14 · prova n4 / n4b (2 Semmel + Brot + pasta) | sieben Euro achtzig | neun Euro zehn (1,20 + 3,90 + 4,00); öğrencinin „Hier sind zehn Euro“ cevabı tutuyor |
| gun-14 · prova n3 ve 1. seçenek | zwölf Euro | zwölf Euro fünfzig (sahneyle aynı) |
| gun-14 · okuma notu | Der Kuchen kostet heute nur zehn Euro. | Ein Kuchen kostet heute nur vier Euro. |
| gun-14 · okuma o3 şık metinleri | On avro / On iki avro / Dört avro | Dört avro / On iki avro / On avro (`ans` 0 kaldı) |

Değişmeyen ve tutan: yazma görevi 10 Semmel = 6 avro; sınav s10 ekmek 3,90.

### P2-2 · VilsFit / Basti (WORLD 9. hafta) ve 12.–13. gün iç tutarlılığı
| yer | önce | sonra |
|---|---|---|
| gun-12 · h1 sahne | Gehst du mit Basti schwimmen? – Ja, aber um zehn. Um acht ist zu früh! | Gehst du schwimmen? – Ja, aber um elf. Um zehn ist zu früh! (okuma o5 ile aynı yön; soru şıkkı „On birde“) |
| gun-12 · okuma | Basti und ich gehen morgen um zehn schwimmen. | Derya und ich gehen … (o4 çeldirici „Derya“) |
| gun-12 · characters | … ch:kraus, ch:brandl, ch:wimmer | stadler, aksoy, lechner, huber, popescu |
| gun-13 · place, characters | pl:fitness · kraus, popescu, brandl | pl:marktplatz · popescu |
| gun-13 · h1 başlık, sahne | VilsFit girişi, Basti | Yüzme havuzunun girişi, adsız „ein Mann“ (WORLD kuralı: adsız kişi) |
| gun-13 · sahne v1 (13 satır) | Basti ↔ Ioana, VilsFit | „ein Mann“ ↔ Ioana, havuz; s13 „Bis gleich!“; sorular ve `sahne_tr` adsız |
| gun-13 · a1 `ortam_tr`, a2 başlık/`ortam_tr`/cevapla | Spor salonu, VilsFit, Basti soruyor | Havuz, Ioana soruyor |
| gun-13 · prova n2–n4 | Pazartesi kurs yok (a1'in tekrarı); „Wie ist deine Nummer? Ich hab sie nicht“; „Ich komm am Mittwoch um sieben“ (a1'de vakti yok) | Yeni haber: çarşambaki kurs yedide değil sekizde; „Ist das deine Nummer: …?“ → „Ja, das ist meine Nummer.“; „Um acht hab ich Zeit.“ |
| gun-13 · okuma | Basti'den mesaj, „heute um zehn Kurs“ | Ioana'dan mesaj, „am Samstag um zehn Kurs“ (sahnede kursu yeni öğrenen Ioana sonraki hafta için çağırıyor) |
| gun-13 · sınav s9, s11 `situation_tr` | Basti … / Spor salonunda Basti … | Ioana … / Havuzda bir adam … |
| gun-08 · okuma (Ioana'nın ofisi) | Ioana'dan mesaj: „Ich bin jetzt im Büro.“ | Derya'dan mesaj (metin aynı; Derya ofiste çalışıyor) |
| gun-14 · h1 görev cümlesi (Frau Brandl'ın duyması) | Frau Brandl kann nicht mehr so gut hören. | Die Frau da kann nicht mehr so gut hören. |
| gun-14 · sahne s1 `sahne_tr` | Stadler fırını. | Stadler fırını kalabalık ve gürültülü. (s2 „heute nicht so gut“ gürültüye bağlandı) |

### P2-3 · Randevu hikâyesi ve telefon provası tekrarı
Tek çizgi: çarşamba → cuma 9.30 (8. gün a1) → salı 8.00 (10. gün prova) → salı 10.15 (12. gün a1) → pazartesi saati sorarsın (14. gün a2).

| yer | önce | sonra |
|---|---|---|
| gun-12 · a1 c2, c3 | Sie hätten gern einen Termin. · Am Montag haben wir leider keinen Termin frei. | Sie haben am Dienstag um acht einen Termin. · Um acht geht es leider nicht. |
| gun-12 · a1 `ortam_tr`, ana fikir şık 0, ayrıntı 0 sorusu, dikte d2/d3, d5 örnek, eylem şık 2 | (pazartesi yok) | yeni metne göre; kanıt kimlikleri aynı |
| gun-12 · prova (bütünü) | „Muayenehaneyi arıyorsun: randevu“, Frau Huber | „Kafede: sipariş ve hesap“, adsız garson (`ein Kellner`): Sie/du seçimi → sipariş (hätten gern) → zu heiß → Rechnung → ödeme. Günün can-do'su (hesap) artık provada. |
| gun-14 · a2 `ortam_tr`, cevapla, eylem sorusu | Bugün için randevu iste | Salı günkü randevunun saatini sor: „Wann ist mein Termin am Dienstag?“ (`accepted` 6, adsız 5) |

Telefon + Frau Huber provası 12. günde yok; 10. gün provası kaldı.

### P2-4 · Görülmemiş durumlar (`gorulmemis-02.json`)
| durum | önce | sonra |
|---|---|---|
| g4 (cd:m1:11) | Herr Wimmer, firma: zehn Semmeln und zwei Brote (= 11. gün) | Ioana, akşam kursu: „Du, was brauchen wir für Mittwoch?“ → sechs Flaschen und drei Kuchen |
| g5 (cd:m1:12) | Kuaförde Luka: Rechnung + Karte (= 12. gün s11) | Stadtplatz'ta mağaza, adsız satıcı: „Was kann ich für Sie tun?“ → Ich hätte gern die Hose da. Und eine Rechnung, bitte. |
| g6 (cd:m1:13) | Derya, firma: „Ist das deine Karte?“ (= 13. gün s11) | Luka, Salon Haarwerk: „Du, ich hab hier 'ne Tüte. Ist das deine?“ → Nein, das ist nicht meine Tüte. … |

### P2-5 · 12. gün prova n3 soyadı yuvası
Prova değişti (P2-3); soyadı sorusu ve onaysız „Gut, dann am Montag“ artık yok.

### P2-6 · Doğal olmayan Almanca ve küçük tutarsızlıklar
| yer | önce | sonra |
|---|---|---|
| gun-13 · h1 lx:Kurs | Guten Tag! Ich hätte gern einen Kurs am Samstag. | Guten Tag! Ich hätte gern die Rechnung für den Kurs. (hätte + den; kart sözcüğü cümlede) |
| gun-13 · h1 lx:Mal | Heute ist mein Kurs zum ersten Mal. | Mein Kurs ist heute. Ich komme zum ersten Mal. (mein korunur: o gün 6) |
| gun-13 · sahne s2, d5 örnek, prova n2 yanlış seçenek | Ich hätte gern einen Kurs. | Ich möchte einen Kurs machen. |
| gun-10 · okuma | Wir fangen um sechs an. | Wir gehen um sechs. (soru: „Saat kaçta gidiyorsunuz?“) |
| gun-11 · h1 sahne (Tobi) | Um sieben? Ich stehe um halb sieben auf! | Gut. Ich stehe um fünf auf und frühstücke nicht! (ana sahneyle aynı saat; „Dann frühstücken wir im Büro!“ yerinde) |
| gun-08 · h2 lx:immer | Wie immer drei Euro neunzig? | Wie immer drei Euro siebzig? (prova: „jetzt drei Euro neunzig … nicht mehr drei Euro siebzig“) |
| gun-09 a1 c1, gun-11 prova n1 · „Grüß Gott“ Türkçesi | Merhaba | İyi günler (14. günle aynı) |

## Öğretilmemiş sözcük denetimi
İlk denemede kafe provası „Kaffee“ (6. hafta) ve „Auf Wiedersehen“ (6. hafta) getirdi, dikiş 4 ihlal verdi. Sipariş „einen Kuchen und zwei Semmeln“ oldu, vedalaşma seçeneği çıkarıldı (n5 kapanış düğümü). Son ölçüm ihlal 0.

## Kalan şüpheler
1. **1. hafta ile WORLD:** birleşmiş `gun-05.json` a2 öğrenciyi VilsFit'e sokuyor, `gun-06.json` sahnesinde Basti Tobi'nin arkadaşı olarak görünüyor. WORLD 9. haftayla aynı gerilim 1. haftada duruyor; bu görevin kapsamı dışında, dokunulmadı.
2. **Yüzme havuzu WORLD mekân listesinde yok.** 13. günde adsız yer olarak yalnızca Türkçe sahne tarifinde geçiyor; `place` alanı provanın geçtiği `pl:marktplatz` oldu. Kalıcı mekân istenirse WORLD'e PM eklemeli.
3. **Adsız konuşmacı etiketleri** (`ein Mann`, `ein Kellner`): 5. hafta dosyalarındaki kullanım örnek alındı (`eine Frau`, `der Verkäufer`); ses ataması varsayılan sese düşer.
4. **Kafede „Kuchen“:** içerikte bütün pasta anlamında; dilim sözcüğü öğretilmediği için sipariş „einen Kuchen“ kaldı (12. gün halkasındaki kullanımla aynı).
5. **gun-08 sahne s10** (Ioana: „Ich muss jetzt arbeiten“): ofis demiyor, WORLD ile çelişmiyor; bırakıldı.
6. **„Kuchen“ Türkçesi** 9. ve 11. günde „kek“, 12.–14. günde „pasta“. İnceleme yazmadı; okur turunda birlikte karar verilmeli.
7. Hafta sonu testi t06 ve 8. gün a2 `cevapla` hâlâ Frau Huber'den randevu istiyor (genel alıştırma, hikâye sonucuna bağlı değil).

## Sonuç
İçerik tarafındaki bulgular **KAPANDI**. Açık kalan: P1-2 (şık karıştırma, baş geliştiricinin betiği), okurun 128 satırı okuması, PR açıklaması ve `esdeger`.
