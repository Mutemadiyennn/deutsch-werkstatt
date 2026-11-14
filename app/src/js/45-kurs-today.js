/* ===== Bugün = kurs. Eski haftalık plan, yapay zekâya anlık yazdırılan ders/senaryo/hikâye görevleri günlük listeden çıkarıldı
   (yavaş, tekrar eden ve hata verip menüye atan kısım buydu). Hepsi "Daha fazla" altında isteğe bağlı durmaya devam eder. ===== */
const KU_KEEP = new Set(["vocab", "external", "real", "vhspost", "mock", "exam"]);
function kuDay(){ const k = kSt(); const d = k.day || (k.day = {}); return d[dayKey()] || (d[dayKey()] = {n:0}); }
{
  const _nfD = kuNodeFinish;
  kuNodeFinish = function(){ try { kuDay().n++; } catch(e){} return _nfD.apply(this, arguments); };
  const _deD = kuDrillEnd;
  kuDrillEnd = function(){ const D = S.ku && S.ku.D; const r = _deD.apply(this, arguments); try { if(D && D.mode === "review") kuDay().rv = true; } catch(e){} return r; };
  const _tq = todayQueue;
  todayQueue = function(){
    const R = _tq.apply(this, arguments);
    if(!KURS.idx){ kursIndex().then(()=>{ if(S.view === "plan") render(); }); return R; }
    const m = kuMeta(kSt().cur); if(!m || m.ready === false) return R;
    const u = KURS.units[m.id]; if(!u) kursUnit(m.id).then(()=>{ if(S.view === "plan") render(); }).catch(()=>{});
    const nx = u ? kuNextNode(u) : null; const dd = kuDay(); const due = kuDueCount() + kuWordsDue().length;
    const q = [{key:"kurs", kind:"kurs", title: dd.n >= 3 ? `Kurs · bugün ${dd.n} basamak tamamlandı · sıradaki: ${nx ? nx.t : m.title_tr}` : `Kurs · ${m.title_tr}${nx ? " · " + nx.ic + " " + nx.t : ""}${dd.n ? " (" + dd.n + "/3)" : ""}`, min:40, done: dd.n >= 3}];
    if(due || dd.rv) q.push({key:"kursrv", kind:"kursrv", title:`Kurs tekrarı${due ? " · " + due + " madde" : ""}`, min:8, done: !!dd.rv && !due});
    for(const x of R.q) if(KU_KEEP.has(x.kind)) q.push(x);
    q.push({key:"canli", kind:"canli", title:"Canlı sohbet: öğrendiklerinle 10 dk konuş", min:10, extra:true, done: !!(daily().live || daily().canli)});
    return {...R, q};
  };
  const _tg = taskGo;
  taskGo = function(key){
    if(key === "kurs"){ kuStart(kSt().cur); return; }
    if(key === "kursrv"){ kuReviewStart(); return; }
    if(key === "canli"){ go("canli"); render(); return; }
    return _tg.apply(this, arguments);
  };
  const _rpT = renderPlan;
  renderPlan = function(){
    let h = _rpT.apply(this, arguments);
    const m = KURS.idx && kuMeta(kSt().cur);
    if(m) h = h.replace(/<div class="h3sub">[\s\S]*?<\/div>/, `<div class="h3sub">${esc(m.lvl)} · ${esc(m.title_tr)}</div>`);
    return h;
  };
  VIEWS.plan = () => renderPlan();
}
