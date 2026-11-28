# İÇ-21 A1 seviye tespiti havuzu: dilbilimci incelemesi, 1. tam tur

Dosya: `content/v2/assess/a1-seviye-tespiti.json`. İncelenen madde: **446** (439 kaynak bağı + 7 `yeni`), 8 hafta. Her maddenin bütün `accepted` listesi, kaynak metni ve etiketi tek tek okundu.

Uygulanan ilke (etiket doğruluğu):
- **Dikte ("Duyduğunu yaz.") ve can_do.** Dikte, duyduğunu yazmayı ölçer; "söylerim / sorarım" diye biten bir can_do cümlesini yapmaz. İçinde "anlarım" geçmeyen can_do etiketleri diktelerden kaldırıldı. Dil noktası etiketleri yerinde kaldı. "anlar" içeren can_do'lar (cd:08, 34, 40, 44, 45) dokunulmadan kaldı.
- **Dil noktası, cevapta gerçekten gerekmiyorsa** (kaynak cümlede hazır veriliyorsa, ya da cevap onsuz da doğru sayılıyorsa ve madde zaten onu ölçmüyorsa) silindi. Maddenin odağı dil noktasıysa ve `accepted[0]` onu kullanıyorsa etiket kaldı. Yalnız kısa bir varyantın dil noktasını atlaması etiketi düşürmedi; bunlar §(e)'de listelendi.

## (a) Düzeltmeler

### Etiket: dikteden can_do kaldırıldı (9 madde)
| kimlik | önce → sonra | gerekçe |
|---|---|---|
| m1:01:s2 | cd:m1:01 + r0:01-tage → r0:01-tage | Dikte; selam verip günü söylemiyor. |
| m1:04:s1 | cd:m1:04 + r0:04 → r0:04 | Dikte; fiyat sormuyor (görevdeki örneğin aynısı). |
| m1:09:s2 | cd:m1:09 + gr:a1-04:t1 → gr:a1-04:t1 | Dikte; bir şey almıyor. |
| m1:19:s1 | cd:m1:19 + gr:a1-02:t4 → gr:a1-02:t4 | Dikte; başkasının ne yaptığını kendisi söylemiyor. |
| m1:22:s1 | cd:m1:22 → gr:a1-11:t1 | Dikte; soru sorup cevap vermiyor. Etiketsiz kalmasın diye, apaçık geçen **in der Küche** (gr:a1-11:t1, aynı hafta) eklendi. |
| m1:26:s1 | cd:m1:26 + gr:a1-13:t3 + gr:a1-04:t5 → gr:a1-13:t3 + gr:a1-04:t5 | Dikte; ilan karşılaştırmıyor. |
| m1:29:s1 | cd:m1:29 + gr:a1-05:t4 → gr:a1-05:t4 | Dikte. |
| m1:35:s2 | cd:m1:31 + gr:a1-08:t2 → gr:a1-08:t2 | Dikte; meslek sormuyor. |
| m1:35:s1 | cd:m1:35 + gr:a1-05:t4 → gr:a1-05:t4 | Dikte; günü anlatmıyor. |

### Etiket: dil noktası / can_do düzeltmesi (10 madde)
| kimlik | önce → sonra | gerekçe |
|---|---|---|
| m1:12:s9 | − gr:a1-01:t1 | Durum selam istemiyor; "Einen Kuchen, bitte." kabul. Sie/du seçimi ölçülmüyor. |
| m1:21:t08 | gr:a1-05:t3 → cd:m1:15 | "Nein, leider nicht." kabul, zaman ifadesi gerekmiyor. Madde evet-hayır sorusuna kısa cevap ölçüyor (cd:m1:15, aynı hafta). |
| m1:21:s10 | − gr:a1-12:t4 | Durum tarihi tekrar etmeyi istemiyor; "Ja, das geht." / "Ja, das passt." kabul. Sıra sayısı gerekmiyor. |
| m1:h03:g2 | − r0:10-buchstabieren | Cevaplar ("{name}. Gern, ich buchstabiere langsam.") harf harf hecelemiyor; heceleme ölçülmüyor. cd:m1:16 kaldı. |
| m1:28:s10 | cd:m1:28 → cd:m1:27 | "Es ist hinter dem Haus." bisikletin yerini söylüyor: "eşyaların yerini … söylerim" (cd:27); evini/oturduğu yeri anlatmıyor (cd:28). |
| m1:35:t06 | − gr:a1-11:t3 | Dönüştürme; **mit dem Bus** kaynak cümlede hazır, yalnız kelime sırası ölçülüyor. |
| m1:30:s3 | − gr:a1-11:t3 | "Am Freitag fahre ich zur Tankstelle." cümlesinde taşıt yok (mit dem …); etiket yanlış. |
| m1:42:t08 | gr:a1-14:t3 → gr:a1-08:t3 | Sıralamada **Im Jahr 1965** hazır parça; yıl okunuşu ölçülmüyor. **war** gerekiyor. |
| m1:49:t06 | − gr:a1-14:t2 | Dönüştürme; **für den Rücken** kaynak cümlede hazır, yalnız will → möchte ölçülüyor. |
| tespit:a1:m007 | − gr:a1-08:t4 | Cevap yalnız yıl (2022); **seit**'i anlamak gerekmiyor, yönerge "ne zamandan beri"yi zaten veriyor. |

### `yeni` maddeler (7)
Almanca yedisinde de doğru ve doğal. Kullandıkları dil, haftasına kadarki gün metinlerinde var (taranarak denetlendi: Käse, Praxis Dr. Weber, hier ist, passt, Hausarzt, Waschmaschine, funktioniert; yıl okunuşu gr:a1-14:t3 tablosunda). `{name}` yalnız cevapta. `why_tr` Türkçe ve kısa; İngilizce köprü, terim ya da "…" yok.
| kimlik | düzeltme |
|---|---|
| m001 | `accepted` +5: Grüß Gott / mein Name ist / {name} hier / Hallo, ich bin / … vorbeikommen (telefonda sık söylenen biçimler). |
| m002 | `accepted` +5: "Samstag geht leider nicht. Geht Sonntag …", "Nein, leider nicht. …", "Am Samstag geht es leider nicht. Geht es am Sonntag …", "Leider nicht. Geht es am Sonntag …", "… elf Uhr dreißig?" |
| m003 | `accepted` +3: "…, oder?", "Sind das vierundzwanzig Euro?" |
| m004 | `accepted` +2: "Heute ist mein Hausarzt nicht hier.", "… nicht in der Praxis." |
| m005 | `accepted` +2: "Die Waschmaschine geht nicht.", "… funktioniert nicht." |
| m006 | `accepted` +2: cümlenin tamamını rakamla yazan (Im Jahr 1980 war …, 1980 war …). |
| m007 | `accepted` +2: "Seit zweitausendzweiundzwanzig", "Ich wohne seit 2022 in Wendlfing."; `why_tr`: "2000'den sonra yıl tausend ile okunur" → "2000'den başlayarak yıllar **zweitausend** ile okunur" (2000 de dahil, doğru biçim). |

Beceri alanları 446 maddenin hepsinde türle uyumlu: dikte → dinleme; cevap isteyen listen_and_respond ve guided_response → konusma; can_do taşıyan tr_de/order/transform → yazma; yalnız dil noktası taşıyanlar → dil. Beceri düzeltmesi gerekmedi.

## (b) Kaynakta gördüklerim (düzeltilmedi)
1. `m1/gun-37.json` m1:37:s6 "Kartla ödedim." için **"Ich habe mit Karte gezahlt."** ve "… mit der Karte gezahlt." `accepted`'da yok. **zahlen** 2. haftadan beri öğretiliyor ("Kann ich mit Karte zahlen?"), öğrenci büyük olasılıkla bunu yazar; haksız ret. Öneri: ikisini de ekle.
2. `m1/hafta-sonu-testi-06.json` m1:42:t12 "Eskiden burada bir okul vardı." için **"Früher gab es hier eine Schule."** yok. En yaygın doğru çeviri. Öneri: ekle (dil noktası war olsa da cevap doğru).
3. `m1/gun-36.json` m1:36:s6 "Pazar günü bir film izledim." için **"… einen Film angeschaut / geschaut"** yok. Bavyera'da günlük konuşmada çok yaygın. Öneri: ekle.
4. `m1/gun-38.json` m1:38:s5 "Tramvayla gittim." için **"Ich bin mit der Tram gefahren."** yok. Münih çevresinde Straßenbahn'dan daha sık söylenir. Öneri: ekle (dn:kelime-ailesi-1'i ölçmez, kabul yeter).
5. `m1/gun-10.json` m1:10:s9 (davete hayır) için **"Danke, aber heute kann ich leider nicht."** yok. Öneri: ekle.
6. `m1/gun-38.json` m1:38:s10 ve `m1/gorulmemis-06.json` m1:h06:g3 için **"Mit dem Rad."** yok. Günlük konuşmada sık. Öneri: ekle.
7. `temel/r0-02-monate.json` r0:02:d15 "Doğum günüm ekimde." için "Ich habe Geburtstag im Oktober." yok (küçük).
8. `m1/gorulmemis-08.json` m1:h08:g1: kendi can_do'su cd:m1:50 ("randevu saati değişince yeni saati sorar"), durum ise restoranda masa ayırtmak. Örtüşmüyor; kural 5 gereği havuzda değiştirilemedi. Öneri: durumun can_do'su gözden geçirilsin.
9. `m1/gorulmemis-08.json` m1:h08:g2: can_do cd:m1:51 ("bitmişse başka şey seçer, fiyat sorar"), cevap "Wo ist die Milch?". Örtüşmüyor; öneri aynı.
10. `m1/gorulmemis-05.json` m1:h05:g4: can_do cd:m1:34 "yol sorar, tarifi **anlarım**", durumda ise öğrenci tarif **veriyor**. Hafif uyumsuzluk.
11. `m1/gun-09.json` m1:09:s6 ("Kek mi, ekmek mi?"): "Kuchen oder Brot?" artikelsiz kabul; madde der/das ölçüyor ama artikelsiz cevap da geçiyor. Doğru Almanca, reddedilmemeli. Öneri: yönergeye "der/das ile" eklensin.

## (c) Sayılar
- İncelenen: 446 madde (7 yeni). Çıkarılan madde: **0**. Eklenen kaynak madde: 0 (kapsam düşmedi).
- Silinen etiket: **19** (dikteden can_do 9; dil noktası 9; can_do 1: m1:28:s10'daki cd:28).
- Eklenen etiket: **4** (m1:22:s1 gr:a1-11:t1, m1:21:t08 cd:m1:15, m1:28:s10 cd:m1:27, m1:42:t08 gr:a1-08:t3).
- Etiket hatası olan madde: **19 / 446 (%4,3)**. `yeni` maddelerde `accepted` ve `why_tr` iyileştirmesi: 7.
- Kaynak bulgusu: **11**.
- `npm run content:validate` → seviye tespiti havuzu 446 madde, **0 hata** (uyarı yalnız 2 muaf dil noktası). Döküm yenilendi: `havuz-dokum.md`.

## (d) Kalan şüpheler (engel değil)
- **gr:a1-04:t5 "Ev ilanı okumak"** bir okuma becerisi: kısaltmaları tanımak (Zi., NK, Kaltmiete). Havuzda yalnız kelime düzeyinde ölçülüyor (m1:26:s9 "120 Euro.", m1:26:s10 Balkon, iki dikte). Bu maddelerde başarısızlık, ilan okumayla ilgisiz bir nedene bağlanabilir. Karar baş geliştiricinin: bu dil noktası muaf mı edilecek, okuma çekirdeğine mi bağlanacak?
- **Atlatma varyantları.** Şu maddelerde etiket doğru, ama kısa bir `accepted` varyantı dil noktasını hiç kullanmadan geçiyor; bu da başarıyı biraz şişirir: m1:09:s10, m1:10:s9, m1:13:s5, m1:13:s10, m1:22:s5, m1:22:s9, m1:46:s10 ("In der Tasche."), m1:48:s10 ("Ja, das passt."), m1:21:s9 (saati tekrar ederek doğrulayan cevap Könnten'i atlıyor). Rapor yanlış "zayıf" demez, en çok fazla iyimser olur.
- `review.status` "draft" bırakıldı: sıradaki adım okur (OD-9) ve örneklem kontrolü. Yukarıdaki gr:a1-04:t5 kararı da açık.

SONUÇ: ONAY
