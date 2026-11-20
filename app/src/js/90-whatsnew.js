/* ===== Yenilikler: her önemli sürümde bir kez gösterilir ===== */
const WHATSNEW = {id:"2026-11-20a", title:"Yenilikler", items:[
  "🆕 Yeni uygulama (2.0) hazır: Bugün, Seviyem ve Daha fazla ekranlarının en üstündeki satırdan açılır. Kurulum ekranından \"Her açılışta yeni uygulamayı aç\" seçilebilir; buradaki ilerlemen olduğu gibi kalır.",
  "🗣️ Gerçek hayat dersleri: telefon, doktor, resmî daire; önce dinle, sonra konuş.",
  "🔁 Yanlış yaptığın kelime aynı turda başka bir cümle ve başka bir fotoğrafla geri geliyor: ezber değil, kalıcı öğrenme.",
  "📝 Her kelimenin 4 örnek cümlesi var; tekrarlarda hep farklı bir cümle görürsün.",
  "📈 Seviyem yenilendi: ünite ilerlemesi, kalıcı kelimeler, zayıf kurallar ve tek dokunuşla o kurala özel alıştırma.",
  "🛟 Daha sağlam: açılışta arka planda üretim yok; dikte ve aylık ölçüm yapay zekâ olmadan da çalışıyor.",
  "📱 Canlı sohbette iPhone'un üst alanıyla çakışma giderildi."]};
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
