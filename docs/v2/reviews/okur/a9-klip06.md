# Okur — A9 klip-06 bölüm düzeltmesi (21.11)

Dosya: `content/v2/m1/video/klip-06.json`. Değişiklik listesi: `docs/v2/reviews/a9-klip06-bolum.md`. Onaylı Almanca: `docs/v2/reviews/a9-metin-onay.md` 1. satır.

| Öğe | Alan | Açıklama / içerik | Kendi sözlerimle | Karar | Neden |
|---|---|---|---|---|---|
| t7 | `tr` | Doğum gününü en son nasıl kutladın? | Soran Eva'ya son doğum gününü nasıl kutladığını soruyor. | GEÇTİ | 5 kelime, tek fikir. „Wie hast du deinen Geburtstag das letzte Mal gefeiert?“ ile aynı. |
| t8 | `tr` | En son ABD'deydim, büyükannemle büyükbabamın yanında. Pasta ve dondurma vardı, tam Amerikan usulü. | Eva son doğum gününde Amerika'da, dedesiyle ninesinin yanındaymış; pasta ve dondurma yemişler. | GEÇTİ | İki cümle, 5 ve 6 kelime. „war ich in den USA … es gab Kuchen und Eis, ganz typisch amerikanisch“ ile aynı. Ön öğretimdeki „büyükannemle büyükbabamın yanında“ ile aynı söz. |
| d2 → d3 | `dikte` (9. tur) | d2: „___ du Freunde dabei?“ boşluğa **Hattest**. d3: bankadan „Hattest du Freunde dabei?“ | d2'de cümlenin tamamı ekranda, ben yalnız ilk kelimeyi yazıyorum. Hemen sonra d3 aynı cümleyi baştan kurmamı istiyor. | GERİ | Aynı cevap iki görevde isteniyor. d3'ün cevabı, d2'nin ekrandaki cümlesi ile d2'nin cevabının toplamı. d3'ü dinlemeden, bir önceki ekrandan hatırlayarak çözüyorum. Bu yüzden d3 "zor" değil, kopya. |
| d3 | `accepted[0]` ↔ `on_ogretim` „Freunde dabei“ | Hattest du Freunde dabei? | Cevabın ikinci yarısı („Freunde dabei“) ön öğretimdeki kartta aynı sırayla duruyor. | GERİ | Kelimesi kelimesine aynı değil, ama FORMAT'taki örneğin ta kendisi: „Freunde dabei“ sırası karttan okunuyor. Geriye **Hattest** kalıyor, o da d2'nin cevabı. |
| d3 | `banka` | Freunde, Hast, dabei, Wann, du, Hattest | Bu kelimelerle cümle kuruyorum. | GERİ | Cümle tek biçimde kurulmuyor. „Hast du Freunde dabei?“ de doğru bir cümle. „Wann hattest du Freunde dabei?“ de öyle. Doğruyu yalnızca sesteki fark seçtiriyor. Çeldiriciler ses farkını sınamak için konmuşsa bile, kurulan yanlış cümle Almanca olarak doğru olduğu için öğrenci neden yanlış saydığını anlamaz. |
| gölge | `golge` [9, …] | 9. turu tekrar et: „Hattest du Freunde dabei?“ | Aynı soruyu bu kez sesli tekrar ediyorum. | GERİ | Aynı cümle üst üste üçüncü kez geliyor: d2'de yazdım, d3'te kurdum, gölgede söylüyorum. Yorgun bir akşamda bu sıkıcı. Yeni bir şey öğretmiyor (H4 §4'e ters). Gölge cümlesi ön öğretim maddesiyle birebir aynı değil; kural ihlali yok, ama yük fazla. |
| cevapla | `soru_tur` 9 (değişmedi) | Aynı soruya Eva gibi cevap ver; örnek **Leider nein.** | 9. turdaki soruya „maalesef hayır“ diye cevap veriyorum. | GEÇTİ (not) | Kendi başına anlaşılır. Ama aynı soruya bağlı dördüncü görev. Cevabı ayrinti[0] `why_tr` içinde de veriliyor (**Leider nein**). |
| bilinmeyen | `bilinmeyen` | 5/55 = 0,091; **hattest** listede yok | — | GERİ (sayım) | Yazar notuna göre bilinen listede **hattest** yok, yalnız **hatte** var. Kelime biçimine göre sayılıyorsa 6/55 = 0,109, yani %10'un üstü. Sayım biçimi `vcheck` ile netleşmeli. |

Dikte sırası (d1 kolay t10, d2 orta t9, d3 zor t9, d4 usta Jan t2, d5 gerçek): kurala uygun.

## Sonuç
Toplam 8 · GEÇTİ 3 (t7, t8, cevapla) · GERİ 5 (d2→d3 tekrar, d3↔„Freunde dabei“, d3 banka, gölge, bilinmeyen sayımı).
GERİ kimlikleri: `bolum.dikte[d3]` (3 neden), `bolum.golge[0]` (9. tur), `bilinmeyen`.
Dosya "reviewed" sayılamaz (OD-9.4).

## Sonrası (İçerik Motoru)

Geri dönen beş maddenin hepsi d3/gölgenin 9. tura taşınmasından geliyordu; bu taşıma eski tabana yazılmıştı. Güncel main'de 7. tura bağlı dikte ve gölge yok (d3 10. turda, gölge Jan'ın 1. turunda), taşıma atıldı. Bu PR'da klip-06'da kalan değişiklik yalnız t7/t8 Türkçesi (okur: GEÇTİ) ve `bilinmeyen` (0,091). "hattest" sayımı notu (oran biçime göre sayılırsa) değişmeyen eski durum; takip.
