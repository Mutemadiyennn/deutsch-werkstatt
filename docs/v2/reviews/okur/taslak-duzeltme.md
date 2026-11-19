# Okur raporu: tas-fix2re (kelime kartlarında değişen Türkçe alanlar)

Girdi: `(yerel çalışma dosyası)` (30 satır, hepsi okundu).

## GERİ satırları

| alan | kendi sözlerimle | neden |
|---|---|---|
| `lx:Präsident.forms[3].tr` — "Kadın derneğin başkanı." | İlk okuyuşta "kadın derneğinin başkanı" diye anladım. Sonra "o kadın, derneğin başkanı" olabileceğini düşündüm. Hangisi olduğundan emin değilim. | İki okuma var; tek okumada anlamadım. |

## Karar dışı not (GEÇTİ, ama öğrenci gözüyle takıldığım yerler)

- `lx:Präsident.forms[1].hint_tr`: "Ich habe dedikten sonra der, den olur" diye anladım. Boşluğu doldurabiliyorum. Ama bunu her "Ich habe" cümlesinde geçerli bir kural sanarım; doğru olup olmadığına dilbilimci baksın.
- `lx:Präsident.forms[0].hint_tr`: "Bildiğimiz başkan" sözünü "sıradan başkan" diye de okudum. Cevabı yine buluyorum.

## Sayılar

- Toplam: 30
- GEÇTİ: 29
- GERİ: 1 — `lx:Präsident.forms[3].tr`

Tek GERİ olduğu için bu paket "reviewed" sayılamaz (OD-9.4).
