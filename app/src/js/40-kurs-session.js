/* ===== Günlük oturum kursla çalışır: masada/iş arasında bloklar kurs basamaklarıdır; ellerin serbestken kursun cümleleri sesli çalışılır ===== */
BLK.kurs = {min:10, ai:false, heavy:true, label:"Kurs"};
BLK.kursrv = {min:6, ai:false, heavy:true, label:"Kurs tekrarı"};
BLK.kursses = {min:8, ai:false, label:"Kurs: sesli tekrar"};
BLK.kursgame = {min:4, ai:false, label:"Kurs: oyun arası"};
{
  const _spK = sessPick;
  sessPick = function(){
    const s = S.sess, C = CTXS[s.ctx];
    if(!KURS.idx) { kursIndex(); return _spK.apply(this, arguments); }
    const cur = kuMeta(kSt().cur); const ok = cur && cur.ready !== false;
    if(C.audio){ if(ok && !s.hist.slice(-1).includes("kursses")) return {type:"kursses"}; return _spK.apply(this, arguments); }
    if(!ok) return _spK.apply(this, arguments);
    const nK = s.hist.filter(x=>x === "kurs").length; const last = s.hist[s.hist.length - 1];
    if((kuDueCount() + kuWordsDue().length) >= 5 && !s.hist.includes("kursrv")) return {type:"kursrv"};
    /* her 3 kurs basamağından sonra kısa bir ara: önce günün diğer görevleri (kelime kartları, dış kaynak), yoksa yapay zekâsız hızlı bir oyun */
    if(nK && nK % 3 === 0 && last === "kurs"){
      const remain = C.len ? C.len - s.sec/60 : 99;
      if(!s.hist.includes("kursgame") || nK % 6 === 0) return {type:"kursgame"};
      const must = (typeof sessMust === "function" ? sessMust(remain) : []).filter(b=>b.x && b.x.kind === "external" && !s.hist.includes(b.type));
      if(must.length) return must[0];
      const light = Object.keys(sessLight(remain)).filter(k=>BLK[k] && !BLK[k].ai && k !== "ext");
      const fresh = light.filter(k=>!s.hist.slice(-6).includes(k));
      const pick = (fresh.length ? fresh : light)[Math.floor(Math.random() * (fresh.length || light.length))];
      if(pick) return {type:pick};
    }
    return {type:"kurs"};
  };
  const _srK = sessRun;
  sessRun = function(b){
    if(b && ["kurs","kursrv","kursses","kursgame"].includes(b.type)){
      const s = S.sess; s.cur = b; s.hist.push(b.type); s.blockStart = Date.now();
      if(b.type === "kursrv") kuReviewStart(); else if(b.type === "kursses") kuAudioStart(); else if(b.type === "kursgame") kuGameBreak(); else kuStart(kSt().cur);
      return;
    }
    return _srK.apply(this, arguments);
  };
  /* basamak bitince oturumda sıradakine geç */
  const _nf = kuNodeFinish;
  kuNodeFinish = function(){ const inSess = !!S.sess; const K = S.ku; const lab = K && K.node ? K.node.t : ""; _nf.apply(this, arguments);
    if(inSess && S.sess){ toast("✓ " + esc(lab ? lab + " tamamlandı" : "Basamak tamamlandı"), 1600); setTimeout(()=>{ if(S.sess && !S.ku && !S.brk) sessNext(); }, 1500); } };
  const _de = kuDrillEnd;
  kuDrillEnd = function(){ _de.apply(this, arguments); const D = S.ku && S.ku.D; if(S.sess && D && D.mode === "review"){ setTimeout(()=>{ if(S.sess && S.ku && S.ku.D === D){ S.ku = null; sessNext(); } }, 1800); } };
  const _ex = ACT.kuExit;
  ACT.kuExit = function(){ if(S.sess){ stopAll && stopAll(); const K = S.ku; if(K && K.D) clearInterval(K.D.tick); S.ku = null; kuSave(true); sessNext(); return; } return _ex.apply(this, arguments); };
}

/* ===== Eller serbest kurs: Türkçesi → düşün → Almancası → tekrar et (ekrana bakmadan) ===== */
async function kuAudioStart(){
  await kursIndex(); const L = kuList(); const id = kSt().cur; const i = L.findIndex(x=>x.id === id);
  const ids = L.slice(Math.max(0, i - 2), i + 1).map(x=>x.id).filter(x=>(kuMeta(x)||{}).ready !== false);
  const pool = [];
  for(const uid of ids){ try{ const u = await kursUnit(uid); const started = kuDone(uid) || ((kSt().u[uid]||{}).nd && Object.keys(kSt().u[uid].nd).length);
    if(!started) continue;
    for(const t of (u.teach||[])) for(const e of (t.ex||[])) pool.push({de:e.de, tr:e.tr, u:uid});
    for(const d of (u.drills||[])) if(d.k === "say") pool.push({de:d.de, tr:d.tr, u:uid});
    for(const w of (u.words||[])) if(kuWSt(kuWKey(u, w)).c) pool.push({de:kuWFull(w), tr:kuTrShort(w.tr), u:uid}); }catch(e){} }
  if(!pool.length){ try{ const u = await kursUnit(id); for(const t of (u.teach||[])) for(const e of (t.ex||[])) pool.push({de:e.de, tr:e.tr, u:id}); }catch(e){} }
  const items = shuffle(pool).slice(0, 14);
  S.kaud = {items, i:0, run:(S.kaud && S.kaud.run || 0) + 1, phase:"run"}; go("kurs"); S.ku = {audio:true}; render();
  kuAudioLoop(S.kaud.run);
}
async function kuAudioLoop(run){
  const A = S.kaud; const slow = S.sess && CTXS[S.sess.ctx] && CTXS[S.sess.ctx].slow ? 1.4 : 1;
  const alive = () => S.kaud === A && A.run === run && !A.paused;
  if(!A.introDone){ A.introDone = true; await say("Kurs tekrarı. Türkçesini duyunca Almancasını söyle.", "tr"); }
  while(alive() && A.i < A.items.length){
    const it = A.items[A.i]; A.showDe = false; render();
    await say(it.tr, "tr"); if(!alive()) return;
    await sleep(Math.min(6000, 1800 + it.de.split(/\s+/).length * 450) * slow); if(!alive()) return;
    A.showDe = true; render(); await say(it.de, "de"); if(!alive()) return;
    await sleep(Math.min(5000, 1200 + it.de.split(/\s+/).length * 380) * slow); if(!alive()) return;
    await say(it.de, "de", 0.85); if(!alive()) return;
    await sleep(900);
    A.i++;
  }
  if(alive()){ A.phase = "done"; addXP(8, "sesli kurs"); render(); await say("Gut gemacht!", "de"); if(S.sess && S.kaud === A){ setTimeout(()=>{ if(S.sess && S.kaud === A){ S.kaud = null; S.ku = null; sessNext(); } }, 1200); } }
}
function kuAudioView(){
  const A = S.kaud; if(!A) return "";
  const it = A.items[Math.min(A.i, A.items.length - 1)] || {};
  if(A.phase === "done") return `<section class="card ku-sum pass"><div class="kicker">🎧 Sesli kurs tekrarı</div><div class="ku-score">${A.items.length}</div><p>cümle tekrar edildi.</p><button class="btn primary block" data-act="kuAudEnd">Tamam</button></section>`;
  return `<div class="k-shell ku-shell"><div class="k-top"><button class="licon k-x" data-act="kuAudEnd" aria-label="Kapat">✕</button><div class="k-prog"><i style="width:${Math.max(3, Math.round(A.i / Math.max(1, A.items.length) * 100))}%"></i></div><span class="chip">${A.i + 1}/${A.items.length}</span></div>
    <section class="k-card ku-card ku-aud"><div class="ku-mode">🎧 Eller serbest · Türkçesini duy, Almancasını söyle</div><div class="ku-prompt">${esc(it.tr||"")}</div><div class="ku-sent sm">${A.showDe ? esc(it.de||"") : "<span class=\"muted\">… Almancasını söyle</span>"}</div></section>
    <div class="k-foot"><div class="grid2"><button class="btn" data-act="kuAudPause">${A.paused ? "▶ Devam" : "⏸ Duraklat"}</button><button class="btn" data-act="kuAudSkip">⏭ Geç</button></div></div></div>`;
}
{
  const _rk = renderKurs;
  renderKurs = function(){ if(S.ku && S.ku.audio) return kuAudioView(); return _rk.apply(this, arguments); };
  Object.assign(ACT, {
    kuAudPause(){ const A = S.kaud; if(!A) return; A.paused = !A.paused; if(A.paused){ stopSpeech(); render(); } else { A.run++; render(); kuAudioLoop(A.run); } },
    kuAudSkip(){ const A = S.kaud; if(!A) return; stopSpeech(); A.i++; A.run++; A.paused = false; render(); kuAudioLoop(A.run); },
    kuAudEnd(){ const A = S.kaud; if(A){ A.run++; } stopSpeech(); S.kaud = null; S.ku = null; if(S.sess) sessNext(); else { go("kurs"); render(); } }
  });
}

/* kurs varken 1500 kelimeden günlük yeni kelime sınırı: kurs zaten her ünitede 16 kelime öğretiyor */
{ const _ctK = coreTarget; coreTarget = function(){ const n = _ctK.apply(this, arguments); return KURS.idx ? Math.min(n, 10) : n; }; }

/* ===== Oyun arası: başlanmış ünitelerin kelimeleriyle eşleştir + hızlı tur (yapay zekâsız, 3-4 dk) ===== */
async function kuGameBreak(){
  await kursIndex(); const L = kuList(); const ids = L.filter(x=>x.ready !== false && (kuDone(x.id) || ((kSt().u[x.id]||{}).nd && Object.keys(kSt().u[x.id].nd).length))).map(x=>x.id).slice(-3);
  if(!ids.length) ids.push(kSt().cur);
  const words = []; for(const id of ids){ try{ const u = await kursUnit(id); (u.words||[]).forEach(w=>{ if(kuWSt(kuWKey(u, w)).c || ids.length === 1) words.push({...w, _uid:id}); }); }catch(e){} }
  const pu = {id:"mix", title_tr:"Oyun arası", words: shuffle(words).slice(0, 15)};
  if(pu.words.length < 6){ sessNext(); return; }
  S.ku = {id:"mix", u:pu, free:true, node:{id:"game", ic:"🎮", t:"Oyun arası"}, steps:[{k:"match"},{k:"speed"}], si:0}; S.kuU = kSt().cur; kuEnter(); go("kurs"); render();
}
{
  const _nfG = kuNodeFinish;
  kuNodeFinish = function(){ const K = S.ku; if(K && K.free){ stopAll && stopAll(); S.ku = null; if(S.sess){ toast("✓ Oyun arası bitti", 1200); setTimeout(()=>{ if(S.sess && !S.ku) sessNext(); }, 900); } else { go("kurs"); render(); } return; } return _nfG.apply(this, arguments); };
}
