# Dilbilimci görevi: M1 kartlarının yeni alanları

Rolün `.claude/agents/dilbilimci.md`. git çalıştırma. Parti dosyalarına yazma.
- Girdi: `/home/claude/cm/work/batch-m2.view.jsonl` (44 kart)
- Yama: `/home/claude/cm/work/batch-m2.dil.json` (`/home/claude/cm/DIL_GOREV.md` biçimi; ek olarak `"forms": [...]` verilirse alanın tamamı değişir)
- Rapor: `docs/v2/reviews/lexicon-m2.md`

Kartların çoğu daha önce incelendi. **Yalnızca yeni alanlara bak:** `forms`, `coll` listesindeki yeni eşdizimler, örneklerdeki `img` sorguları.

## Kontrol et
1. `forms`: cümle doğru ve doğal mı; `answer` boşluğa gerçekten tek doğru cevap mı; başka doğru cevap varsa cümleyi değiştir. Artikel, hâl ve fiil biçimi doğru mu? `tr` doğal mı? `hint_tr` doğru, terimsiz, tek satır mı?
2. Öğrenci sıfırdan başlıyor: cümleler kısa ve sık kelimelerle olsun.
3. Eşdizimler gerçekten sık ve doğal mı, Türkçesi doğru mu?
4. Fotoğraf sorgusu cümlenin sahnesini getirir mi? Aynı kartta sorgular birbirinden farklı mı? Yanıltıcıysa `null`.
5. `lx:neun` ö2: gerçek olabilecek telefon numarasını kurgusal aralıkla değiştir (`SOURCES.md`, Drama Numbers). `lx:einundzwanzig` ö3 bağlamı. `lx:Sonntag` `tr` alanı iki türlü okunuyor.
6. Geçmiş biçimler: modal fiil, **haben**, **sein** kartlarında doğal biçim soruldu (`konnte`, `hatte`, `war`); `möchten` için `wollte`.

Bitince `cd /home/claude/cm && npx --prefix /home/claude/deutsch-werkstatt tsx lintpatch.ts work/batch-m2.dil.json`. Son mesajında yalnızca düzeltme sayısı, hata oranı, açık maddeler.

## Bu grupta ayrıca
- `lx:Anfang`, `lx:Nummer`, `lx:wohnen`, `lx:zahlen`, `lx:leider` daha önce incelenmedi: **bütün alanlarını** incele (`/home/claude/cm/DIL_GOREV.md` ölçütleri).
- `lx:leider` kartına `exp`, OD-9 `mistakes_tr`, en az 3 eşdizim, 3 `forms` ve görsel sorgusu yaz (5. günde gerekiyor).
- `lx:Karte`, `lx:Vorname`, `lx:Nachname` gibi 5–7. gün kartlarının yeni alanları.
- `lx:zahlen`: **bezahle** ve **zahle** ikisi de doğru olan boşlukları tek cevaplı yap. `lx:heißen` **Was ___ das?** de öyle.
- **Ich wohne jetzt unter einer neuen Adresse.** resmî; **Ich arbeite bei Stadler.** dünya ile çelişiyor mu (`docs/v2/WORLD.md`)?
- `lx:nein` ö2 biçimi: iki konuşmacılıysa `– … – …` ve `dlg`.
