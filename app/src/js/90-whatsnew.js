/* ===== Yenilikler: her önemli sürümde bir kez gösterilir ===== */
const WHATSNEW = {id:"2026-11-13-kurs", title:"Yeni: Kurs A1 → B1", items:[
  "📚 Uygulama artık hazır bir kursla ilerliyor: 14 A1 ünitesi hazır, A2 ve B1 sırada. Her ünite kelimeler → kural → dinleme → okuma → oyunlar → yazma → rol oyunu → sınav basamaklarından oluşuyor.",
  "⚡ Dersler önceden yazılmış ve kontrol edilmiş: bekleme yok, hata verip menüye atma yok, internet olmadan da çalışıyor.",
  "🧠 Kelimeler, Türkçesinden Almancasını iki ayrı oturumda kendin söyleyince kalıcı sayılıyor; ünite sınavı ancak o zaman açılıyor.",
  "🎭 Her ünitenin sonunda, seni düzelte düzelte konuşturan kısa bir rol oyunu var.",
  "💬 Canlı sohbette her cümlen arka planda kontrol ediliyor: hatada ekranda kart çıkıyor, partnerin de sesli düzeltip tekrar ettiriyor.",
  "🚗 Eller serbest modda kursun cümleleri çalışılıyor: Türkçesini duy, Almancasını söyle.",
  "🔇 Sesli okumada tire, nokta, eğik çizgi gibi işaretler artık okunmuyor; Almanca ve Türkçe kısımlar kendi sesleriyle okunuyor."]};
{
  const _rpW = renderPlan;
  renderPlan = function(){
    const h = _rpW.apply(this, arguments);
    if((S.state.seenNew || "") === WHATSNEW.id) return h;
    const card = `<section class="card wn-card"><div class="row between"><b>🎉 ${esc(WHATSNEW.title)}</b><button class="licon" data-act="wnClose" aria-label="Kapat">✕</button></div><ul class="wn-list">${WHATSNEW.items.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><button class="btn primary block" data-act="wnClose">Anladım, başlayalım</button></section>`;
    const j = h.indexOf("</section>"); return j < 0 ? card + h : h.slice(0, j + 10) + card + h.slice(j + 10);
  };
  VIEWS.plan = () => renderPlan();
  ACT.wnClose = function(){ S.state.seenNew = WHATSNEW.id; Store.saveState(); render(); };
}
