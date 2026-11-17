/* ================= Sağlamlık (QA2 P0) =================
   1) Uygulama açılışında arka planda hikâye/çizim/kelime üretimi YOK: bu istekler Gemini'nin
      2'li kuyruğunu dolduruyor, kullanıcının gerçek isteği 30-40 sn bekliyordu. Kurs yapay zekâya bağlı değil.
   2) Bekleme metni gerçek süreyle uyumlu ve her beklemede "Durdur" var.
   3) Aylık ölçüm diktesi yapay zekâ olmadan, kursun kendi (dilbilimci onaylı) cümleleriyle çalışır; hiçbir zaman boş kalmaz. */
prefetchToday = async function(){ /* bilinçli olarak boş: içerik ihtiyaç anında üretilir */ };
thinkingCard = function(txt){
  return `<section class="card"><div class="thinking"><span class="spin" aria-hidden="true"></span><span>${esc(txt)} Genelde 5–20 saniye; en fazla 1 dakika.</span></div><button class="btn small" data-act="stopAI">Durdur</button></section>`;
};
async function kuSentencePool(n, minW, maxW){
  const out = []; try{ await kursIndex(); }catch(e){}
  const st = kSt(); const L = kuList();
  const ids = L.filter(x=>st.u[x.id]).map(x=>x.id); if(!ids.length && L[0]) ids.push(L[0].id);
  for(const id of ids.slice(-6)){ try{ const u = await kursUnit(id);
    for(const w of kuAllW(u)) for(const x of (w.ex || [])) out.push(x.de);
    for(const l of ((u.dialog || {}).lines || [])) out.push(l.de);
    for(const t of (u.teach || [])) for(const e of (t.ex || [])) out.push(e.de);
  }catch(e){} }
  const ok = [...new Set(out)].filter(s=>{ const k = String(s).split(/\s+/).length; return k >= minW && k <= maxW && !/[_…]/.test(s); });
  return shuffle(ok).slice(0, n);
}
checkDict = async function(){
  const C = S.check; if(!C) return; C.phase = "busy"; render();
  let sents = await kuSentencePool(10, 4, 12);
  if(sents.length < 6) sents = sents.concat([...S.words.filter(w=>w.kind === "satz").map(w=>w.de), ...S.mistakes.map(m=>m.right)].filter(Boolean)).slice(0, 10);
  if(sents.length < 4){ C.phase = "intro"; C.err = "Dikte için henüz yeterli cümle yok. Kursta ilk üniteyi bitirince ölçüm açılır."; render(); return; }
  const rates = [0.9,0.9,0.9,0.9,1.05,1.05,1.05,1.2,1.2,1.2].map(r=>Math.min(r, stage().dictMax + 0.1));
  C.phase = "dict"; startExercise("Ölçüm 1/3: dikte", sents.map((s, i)=>({kind:"dict", audio:s, rate:rates[i], answer:s, prompt:"", explain:"", topic:"Rechtschreibung"})), "check", "olcum");
};
{
  const _ro = renderOlcum;
  renderOlcum = function(){ const C = S.check; const h = _ro(); return C && C.err && C.phase === "intro" ? `<div class="fb no">${esc(C.err)}</div>` + h : h; };
  VIEWS.olcum = () => renderOlcum();
}
