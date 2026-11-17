# STATUS — Deutsch Werkstatt 2.0

Son güncelleme: 2026-11-17 · Faz: **H3** (kontrol noktasına doğru) · Ana dal: `main` (`1852bf4`, Faz 3 birleşti)

Yeni oturum: önce `CLAUDE.md`, sonra bu dosya, `DECISIONS.md`, `PEDAGOGY.md`, `phases/`. "Sıradaki adım" bölümünden devam et.

## Açık PR'lar (yığın: alttan üste sırayla birleşir, D-041)
| Dal | Teslim | Durum |
|---|---|---|
| `v2/t04` | H2-c: v1 taşınabilir derleme + 2026-11-17a (yayında) | PR açık, ayrı (v1) |
| `v2/calisma-duzeni` | Çalışma düzeni: CLAUDE.md, ajan tanımları, phases/, STATUS, DECISIONS, yayın etiketi + geri alma | yığının altı |
| `v2/h3-1-4` | H3 1–4: PEDAGOGY, şema v2.1 + doğrulayıcı, sıklık hattı (5.000 lemma), 61 kalıp iskeleti | yığın |
| `v2/h3-5-lex` | H3 5: derin kartlar parti 001–008 (800 K1, taslak) | yığın; dilbilimci incelemesi bekliyor |
| `v2/h3-6-pilot01` | H3 6 (ilk dilim): strategie/01, telefon/01, arzt/01 taslakları + alan önerileri | yığın; dilbilimci bekliyor |
| `v2/h3-7-oynatici` | H3 7 + EK1 + EK2: oynatıcı (aşama 1–6 + dinleme), yapay zekâ katmanı, rol oyunu yumuşak bekleme, v1 görünüm dili, WebKit CI + görsel regresyon | yığın; kabul = WebKit CI |
| `v2/asama-1-2` | D-050: aşama 1–2 yeniden tasarım + küçük arayüz düzeltmeleri | yapılacak |

## H3 teslimleri (PEDAGOGY §10)
| # | Teslim | Durum | Not |
|---|---|---|---|
| 1 | PEDAGOGY.md + CONTENT_PLAN.md | kısmen | PEDAGOGY ✓; CONTENT_PLAN yazılmadı |
| 2 | Şema/doğrulayıcı (accepted[], freqRank, tier, reductions, mission, üretim sayısı, kapsam kuralları) | yapıldı | 0 hata |
| 3 | Sıklık hattı ~5.000 lemma + kapsam raporu | kısmen | lemmalar ✓; B1 referans karşılaştırması için PDF proje sahibinden bekleniyor (depoya girmez) |
| 4 | ~60 çekirdek kalıp → dilbilimci | kısmen | 61 iskelet (`core:false`, draft); tamamlanıp dilbilimciye verilecek |
| 5 | İlk 1.000 K1 derin kart | kısmen | 800 kart (001–008) ✓ taslak; 009–010 pilot listesi LEX'e verilecek; "ficken" kararı PS'de |
| 6 | 11 pilot senaryo | kısmen | YAZAR çalışıyor: 9 dosya yazıldı (strategie 01–03, telefon 01–03, arzt 01–03); telefon/04, arzt/04 kaldı; hiçbiri dilbilimciden geçmedi |
| 7 | Oynatıcı | kısmen | aşama 1–6 + dinleme + say_it/explain + "Duyduğum kelime" (dokun → listeye) ✓; FSRS çift yol kayıt ✓; tekrar ekranı ve Dinleme salonu 1–2 basamak ayrı ekran olarak yok; aşama 1–2 D-050'ye göre yeniden yapılacak |
| 8 | Yapay zekâ katmanı + altın setler + dayanıklılık | kısmen | görevler + devre kesici + önbellek + yumuşak bekleme ✓; dayanıklılık e2e ✓ (429/503/bozuk/ağ/yanıtsız/geç yanıt); altın setler (equiv ≥200, roleplay ≥30) yok; gerçek model ölçümü Worker kurulunca |

## H2 görevleri
- a) bundle yedeği ✓ (verildi) · b) PR #1 birleşti ✓ · c) T04 ✓, v1 2026-11-17a yayında (gh-pages `514224b`) · d) T05 listesi ✓ (depo dışında, onay bekliyor) · f) Cloudflare telefon adımları ✓ (`docs/v2/CLOUDFLARE_TELEFON.md`; proje sahibi yapacak)
- Hızlı hat: v1 Bugün'e "Yeni: Gerçek hayat dersleri" kartı **yapılmadı** (v1 17b sürümü, tam v1 kapısıyla) · `/v2/` yayını: deploy iş akışı hazır, ilk yayın yığın birleşince

## Ölçümler (yerel Chromium; kabul değeri CI WebKit'ten alınacak)
- JS paketi: ≈160 KB gzip (bütçe 250) · birim testleri: 83/83 · içerik: 0 hata
- e2e (Chromium, iPhone 15 profili): v2_core ✓, v2_player ✓ (dayanıklılık: hata → ≤0,1 sn seçenek; yanıtsız/geç yanıt → 12,4 sn'de "Biraz uzun sürüyor"; geç yanıt kullanıldı)
- WebKit: **henüz koşmadı** (yerelde indirilemiyor; CI'da `webkit` işi)
- Rol oyunu süresi p50/p95: gerçek model yok → ölçülemedi (istemci ölçüm altyapısı hazır)

## Açık sorunlar / proje sahibine sorular
- Cloudflare hesabı + secret'lar (adımlar hazır) — yapay zekâ bunlar olmadan kapalı
- B1 kelime listesi PDF'i (yalnızca kapsam karşılaştırması için; depoya girmez)
- LEX: "ficken" kartı (çıkar / yalnızca pasif); lx:Deutsch ↔ lx:deutsch birleştirme
- T05 nötrleştirme onayı; ardından git geçmişi (son onayla)
- `app/HANDOFF.md` depoda kişisel satır içeriyor → T05 kapsamına eklendi
- EK1/EK2 metinleri özetten yeniden kuruldu (phases/04–05); tam metin gönderilirse değiştirilir

## Sıradaki adım
1. Yığını it (push), PR'ları aç, CI'da WebKit sonucunu al; `inceleme` ajanını PR'lara çalıştır.
2. `v2/asama-1-2`: D-050 akışı (dinle → tarama ızgarası → ≤12 ifade kartı → 3–4 kartta bir hatırlama; süre bütçesi üstte) + küçük düzeltmeler; WebKit testleri buna göre.
3. YAZAR bitince: dilbilimci (pilot senaryolar + parti 001–008), sonra örneklem kontrolü (qa).
4. Kalıpları çekirdek standarda tamamla → dilbilimci. CONTENT_PLAN.md. Altın setler.
5. Kontrol noktası raporu (H3 + EK1 + EK2 + çalışma düzeni 9 madde + BAŞLANGIÇ metni) ve DUR.
