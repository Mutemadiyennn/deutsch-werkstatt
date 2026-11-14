
/* ================= KURS: hazır müfredat (A1 → B1) =================
   İçerik uygulamanın içinde (data/kurs/*.json). Dersin akışı yapay zekâya bağlı değil;
   yapay zekâ sadece ünite sonundaki rol oyununda partner olur, o da yoksa hazır diyalogla çevrimdışı oynanır. */
const KURS = {idx:null, units:{}, wait:{}};
function kSt(){ const k = S.state.kurs || (S.state.kurs = {}); k.u = k.u || {}; k.it = k.it || {}; if(!k.cur) k.cur = "a1-01"; if(!k._c1){ k._c1 = 1; for(const id of Object.keys(k.it)) if(id.includes(":w:")) delete k.it[id]; } return k; }
let _kuSaveT = null;
function kuSave(now){ clearTimeout(_kuSaveT); if(now) return Store.saveState(); _kuSaveT = setTimeout(()=>Store.saveState(), 2500); }
async function kursIndex(){
  if(KURS.idx) return KURS.idx;
  if(KURS.wait.idx) return KURS.wait.idx;
  KURS.wait.idx = (async()=>{
    try{ const r = await fetch("data/kurs/index.json?v=" + APP_VER); if(!r.ok) throw 0; KURS.idx = await r.json(); try{ localStorage.setItem("dw-kurs-idx", JSON.stringify(KURS.idx)); }catch(_){} }
    catch(e){ try{ KURS.idx = JSON.parse(localStorage.getItem("dw-kurs-idx") || "null"); }catch(_){} }
    KURS.wait.idx = null; return KURS.idx;
  })();
  return KURS.wait.idx;
}
async function kursUnit(id){
  if(KURS.units[id]) return KURS.units[id];
  try{ const r = await fetch("data/kurs/" + id + ".json?v=" + APP_VER); if(!r.ok) throw 0; const u = await r.json(); KURS.units[id] = u; try{ localStorage.setItem("dw-ku-" + id, JSON.stringify(u)); }catch(_){} return u; }
  catch(e){ const c = localStorage.getItem("dw-ku-" + id); if(c) return (KURS.units[id] = JSON.parse(c)); throw {code:"offline"}; }
}
function kuList(){ return ((KURS.idx || {}).units || []); }
function kuMeta(id){ return kuList().find(x=>x.id === id); }
function kuNextId(id){ const L = kuList(); const i = L.findIndex(x=>x.id === id); return i >= 0 && L[i+1] ? L[i+1].id : null; }
function kuDone(id){ return !!(kSt().u[id] && kSt().u[id].done); }

/* ---------- cevap karşılaştırma ---------- */
const KU_NUM = ["null","eins","zwei","drei","vier","fünf","sechs","sieben","acht","neun","zehn","elf","zwölf","dreizehn","vierzehn","fünfzehn","sechzehn","siebzehn","achtzehn","neunzehn","zwanzig"];
function kuNumWord(n){ n = +n; if(n <= 20) return KU_NUM[n]; const t = ["","","zwanzig","dreißig","vierzig","fünfzig","sechzig","siebzig","achtzig","neunzig"]; if(n < 100){ const e = n % 10, z = Math.floor(n/10); return e ? (e === 1 ? "ein" : KU_NUM[e]) + "und" + t[z] : t[z]; } return String(n); }
function kuNorm(s){
  return String(s||"").toLowerCase().replace(/[’'`´]/g, "").replace(/\b(\d{1,2})\b/g, (m, d)=>kuNumWord(d))
    .replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue").replace(/ß/g,"ss")
    .replace(/[^a-z0-9 ]+/g, " ").replace(/\b(aeh|aehm|hm|ehm)\b/g, " ").replace(/\s+/g, " ").trim();
}
function kuVariants(it){ if(it.k === "say") return [it.de, ...(it.alt||[])]; if(it.k === "fix") return [it.right, ...(it.alt||[])]; if(it.k === "order") return [it.de, ...(it.alt||[])]; return []; }
/* baştaki ünlemler ("Ach so", "Oh", "Toll" …) cevabın özü değildir */
const KU_INTERJ = new Set(["ach","so","oh","aha","toll","super","prima","okay","ok","na","also","ja","schoen"]);
function kuCore(s){ const w = kuNorm(s).split(" "); let i = 0; while(i < w.length - 2 && KU_INTERJ.has(w[i])) i++; return w.slice(i).join(" "); }
function kuJudge(variants, inputs){
  const V = variants.filter(Boolean); const I = (inputs||[]).filter(Boolean);
  for(const i of I){ const ni = kuNorm(i); if(V.some(v=>kuNorm(v) === ni)) return {ok:true, heard:i, best:V.find(v=>kuNorm(v) === ni)}; }
  for(const i of I){ const ci = kuCore(i); const v = V.find(v=>kuCore(v) === ci); if(v) return {ok:true, heard:i, best:v}; }
  let best = null;
  for(const v of V) for(const i of I){ const sc = scoreHeard(v, i); if(!best || sc.score > best.sc.score) best = {v, i, sc}; }
  return {ok:false, heard: best ? best.i : (I[0]||""), best: best ? best.v : V[0], words: best ? best.sc.words : null, score: best ? best.sc.score : 0};
}
/* hazır listede olmayan ama doğru olabilecek cevaplar: sıkı bir öğretmen gibi yapay zekâya sorulur (ders akışını bekletmeden, en fazla 8 sn) */
const KU_EQ = {};
async function kuAiEquiv(target, answer, it){
  if(!aiReady() || !answer) return null; const key = kuNorm(target) + "|" + kuNorm(answer); if(key in KU_EQ) return KU_EQ[key];
  const prompt = `Du bist ein strenger Deutschlehrer. Musterlösung: „${target}“
Antwort des Lerners (evtl. aus Spracherkennung, Satzzeichen und Groß/Klein egal): „${answer}“
${it && it.tr ? "Aufgabe (Türkisch): " + it.tr + "\n" : ""}${it && it.why_tr ? "Geübte Regel: " + it.why_tr + "\n" : ""}Ist die Antwort ein grammatisch VÖLLIG korrekter, natürlicher deutscher Satz mit derselben Bedeutung, der die geübte Struktur ebenfalls korrekt verwendet? Andere Wortstellung, Synonyme und Umgangssprache sind erlaubt; jeder Grammatikfehler (Verbform, Artikel, Fall, Wortstellung) ist NICHT erlaubt.
Antworte NUR mit JSON: {"ok":true}`;
  try{ const r = await Promise.race([AI.json(prompt, {modelTier:"quick"}), sleep(8000).then(()=>null)]); const v = r && typeof r.ok === "boolean" ? r.ok : null; if(v !== null) KU_EQ[key] = v; return v; }catch(e){ return null; }
}
async function kuDecide(it, inputs, extra){
  const D = S.ku && S.ku.D; const j = kuJudge(kuVariants(it), inputs);
  if(j.ok) return kuAnswer(true, {...extra, heard:j.heard});
  const cand = j.heard || inputs[0] || "";
  const sameWords = it.k === "order" && kuNorm(cand).split(" ").sort().join(" ") === kuNorm(it.de).split(" ").sort().join(" ");
  if(D && aiReady() && cand && ((j.score || 0) >= 0.45 || sameWords) && D.mode !== "speed"){
    D.aiChk = true; render(); const ok = await kuAiEquiv(j.best || it.de || it.right, cand, it); if(!S.ku || S.ku.D !== D) return; D.aiChk = false;
    if(ok === true) return kuAnswer(true, {...extra, heard:cand, altOk:true});
  }
  return kuAnswer(false, {...extra, heard:cand, words:j.words});
}
function kuDiffHtml(words){ if(!words) return ""; return words.map(x=>`<span class="ku-w ${x.st}">${esc(x.w)}</span>`).join(" "); }

/* ---------- tekrar (SRS) ---------- */
const KU_IV = [0, 1, 3, 7, 16, 35, 90];
function kuMark(it, ok){
  if(!it || !it._id || it._w) return; const R = kSt().it; const r = R[it._id] || (R[it._id] = {b:0, w:0});
  r.s = dayKey(); r.t = it._u + ":" + it.t;
  if(ok){ r.b = Math.min(6, (r.b||0) + 1); r.d = addDays(dayKey(), KU_IV[r.b]); }
  else { r.b = 0; r.w = (r.w||0) + 1; r.d = addDays(dayKey(), 1); }
  kuSave();
}
function kuDueCount(){ const R = kSt().it, t = dayKey(); return Object.values(R).filter(r=>r.d && r.d <= t).length; }

/* ---------- ünite akışı ---------- */
function kuExpl(t){ return esc(t).replace(/(^|[\s(\/])&#39;([^&]{1,70}?)&#39;(?=[\s.,;:!?)\/]|$)/g, (m, pre, a)=>`${pre}<span class="k-de">${a}</span>`); }
/* ---------- ünite = basamaklar (yol haritası) ---------- */
function kuNodes(u){
  const T = u.teach || []; const n = T.length; const cut = n <= 2 ? n : n === 3 ? 2 : n === 4 ? 2 : 3;
  const W = u.words || []; const h = Math.ceil(W.length / 2);
  const nodes = [
    {id:"w1", ic:"🧠", t:"Kelimeler 1", k:"vocab", words:W.slice(0, h)},
    {id:"g1", ic:"📘", t:(T[0]||{}).h_tr || "Kural", k:"gram", teach:T.slice(0, cut).map((_, i)=>i)},
    {id:"w2", ic:"🧠", t:"Kelimeler 2", k:"vocab", words:W.slice(h), recall:W.slice(0, h)},
    {id:"g2", ic:"📘", t:(T[cut]||{}).h_tr || "Kural 2", k:"gram", teach:T.slice(cut).map((_, i)=>cut + i)},
    {id:"li", ic:"🎧", t:"Dinleme ve diyalog", k:"dialog"},
    {id:"re", ic:"📖", t:"Okuma", k:"read"},
    {id:"ga", ic:"🎮", t:"Oyunlar", k:"games"},
    {id:"wr", ic:"✍️", t:"Yazma", k:"write"},
    {id:"rp", ic:"🎭", t:"Rol oyunu", k:"role"},
    {id:"ex", ic:"🏆", t:"Ünite sınavı", k:"test"}];
  return nodes.filter(x=> x.k === "gram" ? x.teach.length : x.k === "vocab" ? x.words.length : x.k === "dialog" ? u.dialog && (u.dialog.lines||[]).length : x.k === "read" ? u.read && u.read.de : x.k === "write" ? (u.speak||[]).length : x.k === "role" ? !!u.roleplay : true);
}
function kuFmtDay(d){ try{ const [y, m, dd] = String(d).split("-").map(Number); return dd + " " + ["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"][m - 1]; }catch(e){ return ""; } }
function kuRec(id){ const U = kSt().u; return U[id] || (U[id] = {start: dayKey(), nd:{}}); }
function kuNodeDone(id, nid){ const r = kSt().u[id]; return !!(r && r.nd && r.nd[nid]); }
function kuNextNode(u){ const ns = kuNodes(u); return ns.find(x=>!kuNodeDone(u.id, x.id)) || null; }
function kuAllButTest(u){ return kuNodes(u).filter(x=>x.k !== "test").every(x=>kuNodeDone(u.id, x.id)); }
function kuTag(u, list, pre){ return (list||[]).map((it, i)=>({...it, _id: u.id + ":" + pre + i, _u: u.id})); }
function kuTeachIds(u, idx){ return idx.map(i=>(u.teach[i]||{}).id); }

/* kelimeler: Vocabuo mantığı — tanıt → tanı → kendin üret (TR→DE, isimler artikeliyle) */
function kuWFull(w){ return (w.art ? w.art + " " : "") + w.de; }
function kuWKey(u, w){ return u.id + ":w:" + w.de; }
/* soru olarak gösterilecek kısa Türkçe: açıklama, parantez ve ';' sonrası yok (cevap sızmasın) */
function kuTrShort(tr){ let t = String(tr||"").split(/[;(]/)[0].replace(/\s+/g, " ").trim().replace(/[,:\-–]+$/, "").trim(); return t || String(tr||""); }
/* "kuzeyde: das Brötchen" gibi Türkçe notlardaki Almanca eş anlamlılar kabul edilir */
function kuTrAlts(w){ const out = []; const re = /\b(der|die|das)\s+([A-ZÄÖÜ][a-zäöüß]+)/g; let m; while((m = re.exec(String(w.tr||"")))) out.push(m[1] + " " + m[2]); return out.filter(x=>x !== kuWFull(w)); }
function kuSentFor(u, w){
  if(w.t === "x") return null; const re = new RegExp("(^|[^A-Za-zÄÖÜäöüß])(" + w.de.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")(?=[^A-Za-zÄÖÜäöüß]|$)");
  const pool = [...(u.teach||[]).flatMap(t=>t.ex||[]), ...((u.dialog||{}).lines||[])].filter(x=>x.de && x.tr && x.de.split(/\s+/).length <= 12);
  const s = pool.find(x=>re.test(x.de)); if(!s) return null;
  return {g: s.de.replace(re, (m, a)=>a + "___"), de: s.de, tr: s.tr};
}
function kuWordItems(u, words, stage){
  const all = u.words || []; const out = [];
  for(const w of words){
    const key = kuWKey(u, w); const base = {_u:u.id, _w:key, t:"w"};
    const short = kuTrShort(w.tr);
    const others = shuffle(all.filter(x=>x !== w && kuTrShort(x.tr) !== short)).slice(0, 2).map(x=>kuTrShort(x.tr));
    if(stage === "rec"){
      const opts = [short, ...others]; out.push({...base, _id:key + ":l", k:"listen", de:kuWFull(w), opts_tr:opts, ans:0, why_tr: w.t === "n" ? "Artikeliyle birlikte dinle." : ""});
      if(w.t === "n" && w.art){ const o = ["der","die","das"]; out.push({...base, _id:key + ":a", k:"pick", q_tr:`${w.de} (${short}): artikeli hangisi?`, opts:o, ans:o.indexOf(w.art), fixed:true, why_tr:`${w.art} ${w.de}${w.pl === "Pl" ? " · sadece çoğul kullanılır" : w.pl && w.pl !== "-" ? " · çoğulu: die " + w.pl : ""}`}); }
    }
    if(stage === "prod"){
      out.push({...base, _id:key + ":s", k:"say", tr:short, de:kuWFull(w), alt:kuTrAlts(w), word:true, why_tr: w.t === "n" ? "İsimleri hep artikeliyle söyle." : (w.tr !== short ? w.tr : "")});
    }
    if(stage === "ctx"){
      const g = kuSentFor(u, w);
      if(g){ const distract = shuffle(all.filter(x=>x !== w && x.t === w.t && x.de !== w.de && !new RegExp("\\b" + x.de + "\\b").test(g.de))).slice(0, 2).map(x=>x.de);
        if(distract.length === 2) out.push({...base, _id:key + ":g", k:"gap", de:g.g, ans:[w.de], opts:[w.de, ...distract], tr:g.tr, why_tr:`${kuWFull(w)} = ${short}`}); }
    }
  }
  return out;
}
/* kalıcı öğrenme: TR→DE üretimi en az iki AYRI oturumda (aralarında en az 3 saat) doğru olmalı */
const KU_GAP = 3 * 3600 * 1000;
function kuWSt(key){ const W = kSt().w || (kSt().w = {}); return W[key] || (W[key] = {c:0, last:0}); }
function kuWordMark(key, ok){
  const r = kuWSt(key); const now = Date.now();
  if(ok){ if(!r.last || now - r.last >= KU_GAP || r.c === 0){ r.c = Math.min(5, (r.c||0) + 1); r.last = now; } r.d = addDays(dayKey(), [0,1,2,4,8,16][Math.min(5, r.c)]); }
  else { r.c = Math.max(0, (r.c||0) - 1); r.last = r.c ? r.last : 0; r.d = dayKey(); }
  kuSave();
}
function kuWLearned(u, w){ return (kuWSt(kuWKey(u, w)).c || 0) >= 2; }
function kuWReadyAgain(u, w){ const r = kuWSt(kuWKey(u, w)); return !r.last || Date.now() - r.last >= KU_GAP || !r.c; }

function kuPrevItems(u, n){
  /* önceki ünitelerden: en zayıf ve en eski maddeler */
  const L = kuList(); const i = L.findIndex(x=>x.id === u.id); const prev = L.slice(0, Math.max(0, i)).filter(x=>KURS.units[x.id]);
  const R = kSt().it; const out = [];
  for(const m of prev.slice(-3)){ const pu = KURS.units[m.id]; const all = [...kuTag(pu, pu.drills, "d"), ...kuTag(pu, pu.test, "x")].filter(x=>["say","gap","fix","order"].includes(x.k));
    all.sort((a, b)=>((R[a._id]||{}).b||0) - ((R[b._id]||{}).b||0) || String((R[a._id]||{}).s||"").localeCompare(String((R[b._id]||{}).s||"")));
    out.push(...all.slice(0, 6)); }
  return shuffle(out).slice(0, n).map(x=>({...x, old:true}));
}
function kuNodeSteps(u, node){
  const st = [];
  if(node.k === "vocab"){
    if(node.id === "w1"){ const prev = kuPrevItems(u, 5); if(prev.length) st.push({k:"drills", lab:"Isınma: önceki üniteden", items: prev}); }
    const W = node.words;
    for(let i = 0; i < W.length; i += 4){ const ch = W.slice(i, i + 4); st.push({k:"wintro", words:ch}); st.push({k:"drills", lab:"Tanı", items:shuffle(kuWordItems(u, ch, "rec"))}); st.push({k:"drills", lab:"Kendin söyle", items:shuffle(kuWordItems(u, ch, "prod"))}); }
    const mix = [...kuWordItems(u, W, "ctx"), ...kuWordItems(u, shuffle(W.concat(node.recall || [])).slice(0, 10), "prod")];
    st.push({k:"drills", lab:"Hepsi bir arada", items:shuffle(mix)});
  }
  if(node.k === "gram"){ const all = kuTag(u, u.drills, "d"); node.teach.forEach((i, n)=>{ const tid = (u.teach[i]||{}).id; st.push({k:"teach", i}); const its = all.filter(x=>x.t === tid); if(its.length) st.push({k:"drills", lab:"Alıştırma · " + ((u.teach[i]||{}).h_tr || ""), items:its}); }); }
  if(node.k === "dialog") st.push({k:"dialog"});
  if(node.k === "read") st.push({k:"read"});
  if(node.k === "games"){ st.push({k:"match"}); st.push({k:"speed"}); }
  if(node.k === "write") (u.speak||[]).slice(0, 2).forEach((_, i)=>st.push({k:"write", i}));
  if(node.k === "role") st.push({k:"role"});
  if(node.k === "test") st.push({k:"gate"});
  return st;
}
async function kuEnsurePrev(id){ const L = kuList(); const i = L.findIndex(x=>x.id === id); for(const m of L.slice(Math.max(0, i - 3), i)) if(m.ready !== false && kuRec(m.id)) { try{ await kursUnit(m.id); }catch(e){} } }
async function kuOpenUnit(id){ stopAll && stopAll(); S.ku = null; S.kuU = id; go("kurs"); render(); try{ await kursIndex(); await kursUnit(id); }catch(e){} if(S.view === "kurs") render(); window.scrollTo(0,0); }
async function kuStartNode(id, nid){
  stopAll && stopAll();
  S.ku = {id, busy:true}; S.kuU = id; go("kurs"); render();
  try{
    await kursIndex(); const u = await kursUnit(id); await kuEnsurePrev(id);
    const node = kuNodes(u).find(x=>x.id === nid) || kuNextNode(u) || kuNodes(u)[0];
    const steps = kuNodeSteps(u, node); const r0 = kuRec(id); let si0 = r0.ns && r0.ns[node.id] || 0; if(si0 >= steps.length || steps[si0].k === "test") si0 = 0;
    if(si0 && steps[0].lab && /^Isınma/.test(steps[0].lab)) si0 = Math.max(0, si0);
    S.ku = {id, u, node, steps, si:si0, t0: Date.now(), resumed: si0 > 0};
    kSt().cur = id; kuRec(id); kuSave();
    kuEnter();
    const nx = kuNextId(id); if(nx) kursUnit(nx).catch(()=>{});
  }catch(e){ S.ku = {id, err:"Bu ünite yüklenemedi. İnternet bağlantını kontrol edip tekrar dene."}; }
  render(); window.scrollTo(0,0);
}
async function kuStart(id){ await kursIndex(); let u; try{ u = await kursUnit(id); }catch(e){ return kuOpenUnit(id); } const nx = kuNextNode(u); return nx ? kuStartNode(id, nx.id) : kuOpenUnit(id); }
function kuStep(){ const K = S.ku; return K && K.steps ? K.steps[K.si] : null; }
function kuEnter(){
  const K = S.ku, s = kuStep(); if(!s) return;
  K.D = null; K.G = null; K.R = null; K.RP = null; K.M = null; K.Wr = null;
  if(s.k === "drills") K.D = kuDrillRun(s.items, "drill", s.lab);
  if(s.k === "test") K.D = kuDrillRun(s.items, "test", "Ünite sınavı");
  if(s.k === "speed") K.D = kuSpeedRun(K.u, K.node);
  if(s.k === "dialog") K.G = {mode:"listen", i:0};
  if(s.k === "read") K.R = {ans:{}, tr:false};
  if(s.k === "role") K.RP = rpNew(K.u);
  if(s.k === "match") K.M = kuMatchNew(K.u);
  if(s.k === "write") K.Wr = {i:s.i, text:"", phase:"edit"};
  if(s.k === "wintro") K.wi = 0;
  if(K.D && K.D.items.length) setTimeout(()=>kuAuto(), 250);
  if(s.k === "drills" && !s.items.length) return kuGoNext();
  try{ if(K.node && !K.free){ const r = kuRec(K.id); (r.ns = r.ns || {})[K.node.id] = K.si; kuSave(); } }catch(e){}
}
function kuGoNext(){
  const K = S.ku; if(!K) return; stopAll && stopAll();
  if(K.si < K.steps.length - 1){ K.si++; kuEnter(); render(); window.scrollTo(0,0); return; }
  kuNodeFinish();
}
function kuNodeFinish(){
  const K = S.ku; const rec = kuRec(K.id); rec.nd = rec.nd || {};
  const first = !rec.nd[K.node.id]; rec.nd[K.node.id] = dayKey(); if(rec.ns) delete rec.ns[K.node.id];
  const nodes = kuNodes(K.u); const done = nodes.filter(x=>rec.nd[x.id]).length;
  if(first){ addXP(10, "basamak"); sfx("up"); confetti(60); }
  /* sınav dışındaki her şey bitince sıradaki ünite açılır; ünite, sınav geçilince "tamam" olur */
  if(kuAllButTest(K.u)){ const nx = kuNextId(K.id); rec.open = true; if(nx && kSt().cur === K.id && !kuDone(K.id)) {} }
  kuSave(true);
  S.ku = null; S.kuDoneMsg = first ? `${K.node.t} tamamlandı · ${done}/${nodes.length} basamak` : ""; render(); window.scrollTo(0,0);
}

/* ---------- alıştırma motoru (ünite, test ve tekrar için ortak) ---------- */
function kuDrillRun(items, mode, lab){
  return {items, mode, lab, q: items.map((_, i)=>i), pos:0, done:0, first:{}, ok:0, bad:0, combo:0, retries:{}, res:null, typed:false, built:[], live:"", listening:false};
}
function kuCur(){ const D = S.ku && S.ku.D; return D && D.items[D.q[D.pos]]; }
function kuAuto(){ const it = kuCur(); if(it && it.k === "listen" && !(S.ku.D.res)) say(it.de, "de"); }
function kuCapSet(u){ if(u._caps) return u._caps; const set = new Set(); const txt = []; (u.teach||[]).forEach(t=>(t.ex||[]).forEach(e=>txt.push(e.de))); ((u.dialog||{}).lines||[]).forEach(l=>txt.push(l.de)); (u.drills||[]).concat(u.test||[]).forEach(d=>txt.push(d.de || d.right || "")); if(u.read) txt.push(u.read.de);
  for(const t of txt) for(const sent of String(t).split(/[.!?]\s+/)) sent.split(/\s+/).slice(1).forEach(w=>{ const c = w.replace(/[^A-Za-zÄÖÜäöüß]/g, ""); if(/^[A-ZÄÖÜ]/.test(c)) set.add(c); });
  (u.words||[]).forEach(w=>{ if(w.t === "n") set.add(w.de); }); return (u._caps = set); }
function kuOrderTokens(de, u){ let t = String(de).trim(); const end = (t.match(/[.!?…]+$/)||[""])[0]; t = t.slice(0, t.length - end.length);
  const w = t.split(/\s+/).filter(Boolean); if(w.length){ const c = w[0].replace(/[^A-Za-zÄÖÜäöüß]/g, ""); if(!(u && kuCapSet(u).has(c)) && w[0] !== "Sie") w[0] = w[0].charAt(0).toLowerCase() + w[0].slice(1); } return {w, end}; }
function kuShuffleWords(de){ const w = String(de).split(/\s+/).filter(Boolean); let s = shuffle(w.slice()); for(let k = 0; k < 5 && s.join(" ") === w.join(" ") && w.length > 2; k++) s = shuffle(w.slice()); return s; }
function kuAnswer(ok, extra){
  const K = S.ku, D = K.D, it = kuCur(); if(!it || D.res) return;
  const idx = D.q[D.pos]; const firstTry = D.first[idx] === undefined;
  if(firstTry) D.first[idx] = ok;
  if(ok){ D.combo++; if(firstTry){ D.ok++; addXP(D.mode === "test" ? 3 : 2, "kurs"); } sfx(D.combo >= 3 ? "combo" : "ok"); }
  else { D.combo = 0; if(firstTry) D.bad++; sfx("no"); }
  if(it._w){ if(it.k === "say" && firstTry) kuWordMark(it._w, ok); }
  else if(D.mode !== "speed" && (firstTry || D.mode === "test")) kuMark(it, ok);
  D.res = {ok, ...(extra||{})};
  /* yanlışta: aynı kuralı başka bir cümleyle ve bu maddeyi biraz sonra tekrar sor */
  if(!ok && !["test","speed"].includes(D.mode)){
    const r = D.retries[idx] || 0;
    /* aynı kuraldan henüz sorulmamış başka bir cümleyi öne al (tercihen başka tipte) */
    const later = D.q.map((j, p)=>({j, p})).filter(x=>x.p > D.pos + 1 && D.items[x.j] !== it && D.items[x.j].t === it.t && D.first[x.j] === undefined && (it.t !== "w" || D.items[x.j]._w === it._w || true));
    const sib = later.find(x=>D.items[x.j].k !== it.k) || later[0];
    if(sib && it.t !== "w"){ D.q.splice(sib.p, 1); D.q.splice(D.pos + 2, 0, sib.j); }
    if(r < 1){ D.retries[idx] = r + 1; D.q.splice(Math.min(D.q.length, D.pos + 6), 0, idx); }
  }
  if(ok && !firstTry) D.late = (D.late||0) + (D.lateSeen && D.lateSeen[idx] ? 0 : 1), (D.lateSeen = D.lateSeen || {})[idx] = true;
  if(D.mode === "speed"){ render(); setTimeout(()=>{ if(S.ku && S.ku.D === D && D.res) kuAdvance(); }, ok ? 350 : 900); return; }
  const full = kuFull(it); if(full && (ok || it.k !== "say")) setTimeout(()=>{ if(S.ku && S.ku.D === D) say(full, "de"); }, 250);
  render();
}
function kuFull(it){ return it.k === "gap" ? it.de.replace("___", it.ans[0]) : it.k === "say" || it.k === "order" || it.k === "listen" ? it.de : it.k === "fix" ? it.right : ""; }
function kuAdvance(){
  const K = S.ku, D = K.D; if(!D) return; stopAll && stopAll();
  D.pos++; D.res = null; D.typed = false; D.built = []; D.live = ""; D.listening = false; D.chosen = null; D.shuf = null; D.pool = null; D.ord = null; D.aiChk = null;
  if(D.pos >= D.q.length){ kuDrillEnd(); return; }
  render(); setTimeout(()=>kuAuto(), 200);
}
function kuDrillEnd(){
  const K = S.ku, D = K.D; D.finished = true; clearInterval(D.tick);
  const n = D.items.length; const pct = Math.round(D.ok / Math.max(1, n) * 100); D.pct = pct;
  if(D.mode === "test"){
    const rec = kuRec(K.id);
    rec.tests = (rec.tests||0) + 1; rec.best = Math.max(rec.best||0, pct);
    if(pct >= 80){ const first = !rec.done; rec.done = true; if(rec.ns) delete rec.ns.ex; rec.fin = rec.fin || dayKey(); rec.nd = rec.nd || {}; rec.nd.ex = rec.nd.ex || dayKey();
      const nx = kuNextId(K.id); if(nx && kSt().cur === K.id) kSt().cur = nx;
      if(first){ addXP(30, "ünite"); setTimeout(()=>bigCelebrate("Ünite tamamlandı 🎉", `${esc(K.u.title_tr)} · %${pct}. Sıradaki ünite açıldı.`, "party"), 300); }
      try { planDone && planDone("kurs"); } catch(e){}
    }
    const weak = {}; D.items.forEach((it, j)=>{ if(D.first[j] === false && !it.old) weak[it.t] = (weak[it.t]||0) + 1; }); D.weak = Object.keys(weak);
  }
  if(D.mode === "speed"){ const rec = kuRec(K.id); const prev = rec.speed || 0; D.best = Math.max(prev, D.ok); D.newBest = D.ok > prev; rec.speed = D.best; }
  if(D.mode === "review"){ const rv = kSt().rv || (kSt().rv = {}); rv[dayKey()] = (rv[dayKey()]||0) + n; }
  kuSave(true); render(); window.scrollTo(0,0);
}
function kuItemHead(it){
  const lab = {say:["🗣️","Almanca söyle"], gap:["🧩","Boşluğu doldur"], pick:["🎯","Doğru olanı seç"], order:["🔀","Cümleyi kur"], listen:["👂","Dinle ve anlamını seç"], fix:["🛠️","Hatayı düzelt ve söyle"]}[it.k] || ["",""];
  return `<div class="kicker ku-kick"><span>${lab[0]}</span>${lab[1]}</div>`;
}
function kuMicBtn(label){ const D = S.ku.D; return `<button class="btn primary block ku-mic ${D && D.listening ? "live" : ""}" data-act="kuMic">${D && D.listening ? "⏹ Bitti, kontrol et" : "🎤 " + (label || "Söyle")}</button>`; }
function kuItemBody(it){
  const D = S.ku.D, R = D.res;
  const tr = it.tr ? `<p class="ku-tr">${esc(it.tr)}</p>` : "";
  if(it.k === "say") return `${kuItemHead(it)}<div class="ku-prompt">${esc(it.tr)}</div>${D.listening || D.live ? `<div class="ku-live">${esc(D.live || "Dinliyorum…")}</div>` : ""}`;
  if(it.k === "gap"){ const parts = it.de.split("___");
    const fill = R ? `<b class="ku-fill ${R.ok ? "ok" : "bad"}">${esc(D.chosen || it.ans[0])}</b>` : `<span class="ku-blank">&nbsp;</span>`;
    return `${kuItemHead(it)}<div class="ku-sent">${esc(parts[0])}${fill}${esc(parts[1]||"")}</div>${tr}
      <div class="ku-opts">${(D.shuf || (D.shuf = shuffle(it.opts.slice()))).map(o=>`<button class="ku-opt ${R ? (o === it.ans[0] ? "ok" : o === D.chosen ? "bad" : "dim") : ""}" data-act="kuPick" data-v="${esc(o)}" ${R ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>`; }
  if((it.k === "pick" || it.k === "listen") && !D.ord){ const arr = it.k === "pick" ? it.opts : it.opts_tr; const keep = it.fixed || (it.k === "pick" && arr.every(o=>["der","die","das"].includes(o))); D.ord = keep ? arr.map((_, j)=>j) : shuffle(arr.map((_, j)=>j)); }
  if(it.k === "pick") return `${kuItemHead(it)}<div class="ku-q">${esc(it.q_tr)}</div><div class="ku-opts col">${D.ord.map(j=>[it.opts[j], j]).map(([o, j])=>`<button class="ku-opt ${R ? (j === it.ans ? "ok" : String(j) === String(D.chosen) ? "bad" : "dim") : ""}" data-act="kuPick" data-v="${j}" ${R ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>`;
  if(it.k === "listen") return `${kuItemHead(it)}<div class="ku-listen"><button class="ku-big" data-act="sayDe" data-t="${esc(it.de)}" aria-label="Dinle">🔊</button><button class="ku-big slow" data-act="kuSlow" aria-label="Yavaş dinle">🐢</button></div>${R ? `<div class="ku-sent sm">${esc(it.de)}</div>` : ""}<div class="ku-opts col">${D.ord.map(j=>[it.opts_tr[j], j]).map(([o, j])=>`<button class="ku-opt ${R ? (j === it.ans ? "ok" : String(j) === String(D.chosen) ? "bad" : "dim") : ""}" data-act="kuPick" data-v="${j}" ${R ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>`;
  if(it.k === "order"){ if(!D.pool){ const ot = kuOrderTokens(it.de, (S.ku||{}).u); D.end = ot.end; D.pool = kuShuffleWords(ot.w.join(" ")); } const pool = D.pool; const used = new Set(D.built);
    return `${kuItemHead(it)}${tr ? `<div class="ku-prompt sm">${esc(it.tr)}</div>` : ""}<div class="ku-built">${D.built.map((j, n)=>`<button class="ku-chip on" data-act="kuUnchip" data-n="${n}" ${R ? "disabled" : ""}>${esc(pool[j])}</button>`).join("") || `<span class="muted small">Kelimelere sırayla dokun ya da cümleyi söyle</span>`}${D.built.length ? `<span class="ku-end">${esc(D.end||"")}</span>` : ""}</div>
      <div class="ku-pool">${pool.map((w, j)=>`<button class="ku-chip ${used.has(j) ? "used" : ""}" data-act="kuChip" data-j="${j}" ${used.has(j) || R ? "disabled" : ""}>${esc(w)}</button>`).join("")}</div>${D.listening || D.live ? `<div class="ku-live">${esc(D.live || "Dinliyorum…")}</div>` : ""}`; }
  if(it.k === "fix") return `${kuItemHead(it)}<div class="ku-wrong">${esc(it.wrong)}</div><p class="small muted">Bu cümlede bir hata var. Doğrusunu söyle.</p>${D.listening || D.live ? `<div class="ku-live">${esc(D.live || "Dinliyorum…")}</div>` : ""}`;
  return "";
}
function kuFoot(it){
  const D = S.ku.D, R = D.res;
  if(D.aiChk) return `<div class="ku-live">🧑‍🏫 Cevabın kontrol ediliyor…</div>`;
  if(R){
    const full = kuFull(it);
    const heard = R.heard && !R.ok ? `<div class="ku-heard"><span class="muted small">Duyduğum:</span> ${esc(R.heard)}</div>` : "";
    const diff = !R.ok && R.words ? `<div class="ku-diff">${kuDiffHtml(R.words)}</div>` : "";
    return `<div class="ku-res ${R.ok ? "ok" : "bad"}"><div class="ku-res-h">${R.ok ? (D.combo >= 3 ? "🔥 Harika, " + D.combo + " doğru üst üste!" : "✓ Doğru!") : R.skip ? "Doğrusu bu:" : "✗ Tam olmadı"}</div>${R.ok && R.altOk ? `<div class="small">Senin söyleyişin de doğru: „${esc(R.heard)}“. Örnek cevap:</div>` : ""}
      ${full ? `<div class="ku-full"><button class="k-say" data-act="sayDe" data-t="${esc(full)}" aria-label="Dinle">🔊</button><b>${esc(full)}</b></div>` : ""}${diff}${heard}
      ${it.why_tr ? `<p class="ku-why">${esc(it.why_tr)}</p>` : ""}</div>
      ${!R.ok && R.spoken ? `<button class="btn small ghost" data-act="kuOverride">Aslında doğru söyledim</button>` : ""}${!R.ok && it.k === "order" && !R.skip && R.heard ? `<button class="btn small ghost" data-act="kuOverride">Benim sıram da doğru</button>` : ""}
      ${!R.ok && ["say","fix","order"].includes(it.k) && D.mode !== "test" ? `<button class="btn block" data-act="kuRepeat">🎤 Doğrusunu bir kez söyle</button>` : ""}
      ${R.rep ? `<div class="small ${R.rep === "ok" ? "good" : "muted"}">${R.rep === "ok" ? "✓ Güzel, şimdi doğru söyledin." : "Bir daha dene ya da devam et."}</div>` : ""}
      <button class="btn primary block" data-act="kuAdv">Devam →</button>`;
  }
  if(["say","fix"].includes(it.k)){
    if(D.typed) return `<input id="kuIn" class="ku-in" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Almanca yaz…" enterkeyhint="done"><div class="grid2"><button class="btn primary" data-act="kuCheckTyped">Kontrol et</button><button class="btn" data-act="kuTypeOff">🎤 Sesle</button></div><button class="btn small ghost" data-act="kuSkip">Bilmiyorum, göster</button>`;
    return `${kuMicBtn()}<div class="grid2"><button class="btn" data-act="kuTypeOn">⌨️ Yazarak</button><button class="btn ghost" data-act="kuSkip">Bilmiyorum, göster</button></div>`;
  }
  if(it.k === "order") return `<div class="grid2"><button class="btn primary" data-act="kuOrderCheck" ${D.built.length ? "" : "disabled"}>Kontrol et</button>${kuMicBtn().replace("btn primary block", "btn")}</div><button class="btn small ghost" data-act="kuSkip">Bilmiyorum, göster</button>`;
  return `<button class="btn small ghost" data-act="kuSkip">Bilmiyorum, göster</button>`;
}
function kuDrillView(){
  const K = S.ku, D = K.D;
  if(D.finished) return kuDrillSummary();
  const it = kuCur(); const total = D.q.length; const pct = Math.round(D.pos / Math.max(1, total) * 100);
  const title = D.lab || (D.mode === "test" ? "Ünite sınavı" : D.mode === "review" ? "Kurs tekrarı" : "Alıştırma");
  const left = D.mode === "speed" ? Math.max(0, Math.ceil((D.deadline - Date.now())/1000)) : null;
  return `<div class="k-shell ku-shell">
    <div class="k-top"><button class="licon k-x" data-act="kuExit" aria-label="Kapat">✕</button><div class="k-prog ${D.combo >= 3 ? "hot" : ""}"><i style="width:${Math.max(3, pct)}%"></i></div><span class="chip ${left !== null ? "ku-timer" : ""}" id="kuTimer">${left !== null ? "⏱ " + left + " sn" : (D.pos + 1) + "/" + total}</span></div>
    <section class="k-card ku-card ${D.res ? (D.res.ok ? "is-ok" : "is-bad") : ""}"><div class="ku-mode">${esc(title)}${it.old ? ` <span class="ku-old">önceki üniteden</span>` : ""}${D.mode === "speed" ? ` · <b>${D.ok}</b> doğru` : ""}</div>${kuItemBody(it)}</section>
    ${D.mode === "speed" ? "" : `<div class="k-foot">${kuFoot(it)}</div>`}</div>`;
}
function kuDrillSummary(){
  const K = S.ku, D = K.D; const pct = D.pct;
  if(D.mode === "test"){
    const pass = pct >= 80; const nx = kuNextId(K.id); const tnames = (D.weak||[]).map(t=>((K.u.teach||[]).find(x=>x.id === t)||{}).h_tr).filter(Boolean);
    return `<section class="card ku-sum ${pass ? "pass" : "fail"}"><div class="kicker">Ünite sınavı · ${esc(K.u.title_tr)}</div><div class="ku-score">%${pct}</div>
      <p>${pass ? "Geçtin! Bu ünitenin hedefini artık yapabiliyorsun." : "Geçmek için %80 lazım. Zayıf kalan kısımları kısa bir tekrarla güçlendirelim, sonra sınavı yeniden dene."}</p>
      ${tnames.length ? `<p class="small"><b>Zayıf kalan:</b> ${tnames.map(esc).join(" · ")}</p>` : ""}
      ${pass ? (nx ? `<button class="btn primary block" data-act="kuStartId" data-id="${nx}">Sıradaki ünite →</button>` : "") : `${tnames.length ? `<button class="btn primary block" data-act="kuWeak">Zayıf kısımları çalış</button>` : ""}<button class="btn block" data-act="kuRetest">Sınavı yeniden yap</button>`}
      <button class="btn ghost block" data-act="kuBack">Ünite yoluna dön</button></section>`;
  }
  if(D.mode === "review") return `<section class="card ku-sum pass"><div class="kicker">Kurs tekrarı</div><div class="ku-score">${D.ok}/${D.items.length}</div><p>Tekrar bitti. Yanlış yaptıkların başka bir cümleyle yine gelecek.</p><button class="btn primary block" data-act="kuMap">Tamam</button></section>`;
  if(D.mode === "speed") return `<section class="card ku-sum pass"><div class="kicker">⚡ Hızlı tur</div><div class="ku-score">${D.ok}</div><p>${D.newBest ? "Yeni rekor! 🏆" : "Rekorun: " + D.best}</p><button class="btn primary block" data-act="kuNext">Devam →</button><button class="btn block" data-act="kuSpeedAgain">Bir tur daha</button></section>`;
  if(D.after === "test") return `<section class="card ku-sum pass"><div class="kicker">Zayıf kısımlar çalışıldı</div><div class="ku-score">${D.ok}/${D.items.length}</div><p>Şimdi sınavı yeniden dene.</p><button class="btn primary block" data-act="kuRetest">Sınavı yeniden yap</button></section>`;
  const late = D.late || 0; const never = Math.max(0, D.items.length - D.ok - late);
  const msg = D.ok === D.items.length ? "Hepsi ilk denemede doğru! 🔥" : [late ? `${late} madde tekrarında doğru` : "", never ? `${never} madde henüz oturmadı` : ""].filter(Boolean).join(" · ") + ". Bunlar tekrarlarda başka cümlelerle yine gelecek.";
  return `<section class="card ku-sum pass"><div class="kicker">${esc(D.lab || "Alıştırma")} bitti</div><div class="ku-score">${D.ok}/${D.items.length}</div><div class="small muted">ilk denemede doğru</div><p>${msg}</p><button class="btn primary block" data-act="kuNext">Devam →</button></section>`;
}
/* ---------- ünite adımları ---------- */
function kuShell(inner, foot, label){
  const K = S.ku; const n = K.steps.length; const pct = Math.round(K.si / Math.max(1, n - 1) * 100);
  return `<div class="k-shell ku-shell"><div class="k-top"><button class="licon k-x" data-act="kuExit" aria-label="Kapat">✕</button><div class="k-prog"><i style="width:${Math.max(3, pct)}%"></i></div><span class="chip">${esc(label || (K.node ? K.node.ic + " " : "") + (K.si + 1) + "/" + n)}</span></div>
    <section class="k-card ku-card">${inner}</section>${foot ? `<div class="k-foot">${foot}</div>` : ""}</div>`;
}
function kuWintroView(){
  const K = S.ku, s = kuStep(), W = s.words; const w = W[K.wi] || W[0]; const full = kuWFull(w);
  const plOnly = w.pl === "Pl"; const pl = w.pl && w.pl !== "-" && !plOnly ? w.pl : "";
  const ex = kuSentFor(K.u, w); const exFull = ex ? ex.de : ""; const exTr = ex ? ex.tr : "";
  setTimeout(()=>{ if(S.ku === K && kuStep() === s && K._said !== s.words[K.wi]){ K._said = s.words[K.wi]; say(full, "de"); } }, 200);
  const R = K.wres;
  return kuShell(`<div class="ku-mode">🧠 Yeni kelime ${K.wi + 1}/${W.length}</div>
    <div class="ku-wcard ${w.art ? "a-" + w.art : ""}"><div class="ku-wart">${w.art ? esc(w.art) : w.t === "v" ? "fiil" : w.t === "a" ? "sıfat / zarf" : /^(wer|wie|wo|woher|wohin|was|wann|warum|welche?r?s?|wie viel)$/i.test(w.de) ? "soru kelimesi" : /\s/.test(w.de) ? "kalıp" : "kelime"}</div>
      <div class="ku-wde">${esc(w.de)}</div>${pl ? `<div class="ku-wpl">çoğul: die ${esc(pl)}</div>` : plOnly ? `<div class="ku-wpl">sadece çoğul</div>` : ""}
      <div class="ku-wtr">${esc(w.tr)}</div><button class="ku-big" data-act="sayDe" data-t="${esc(full)}" aria-label="Dinle">🔊</button></div>
    ${exFull ? `<div class="k-ex">${kSay(exFull)}<div class="k-ext"><div class="de">${esc(exFull)}</div>${exTr ? `<div class="tr">${esc(exTr)}</div>` : ""}</div></div>` : ""}
    ${R ? `<div class="small ${R === "ok" ? "good" : "muted"}">${R === "ok" ? "✓ Güzel telaffuz." : "Bir daha dinle ve söyle."}</div>` : ""}
    ${K.wlisten ? `<div class="ku-live">Dinliyorum…</div>` : ""}`,
    `<button class="btn ${K.wlisten ? "primary ku-mic live" : ""}" data-act="kuWSay">${K.wlisten ? "⏹ Bitti" : "🎤 Sesli tekrar et"}</button><button class="btn primary block" data-act="kuWNext">${K.wi < W.length - 1 ? "Sonraki kelime →" : "Şimdi tanıyalım →"}</button>`);
}
function kuTeachView(){
  const K = S.ku, s = kuStep(), t = K.u.teach[s.i];
  const tbl = t.table && t.table.rows ? `<div class="tablewrap"><table class="t k-table"><thead><tr>${(t.table.head||[]).map(h=>`<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${t.table.rows.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>` : "";
  const ex = (t.ex||[]); const ti = K.node && K.node.teach ? K.node.teach.indexOf(s.i) : 0; const tn = K.node && K.node.teach ? K.node.teach.length : 1;
  return kuShell(`<div class="ku-mode">📘 Anlatım ${ti + 1}/${tn}</div><h3 class="ku-h3">${esc(t.h_tr)}</h3><p class="ku-expl">${kuExpl(t.tr)}</p>${tbl}
    <div class="row between"><b class="small">Dinle ve yüksek sesle tekrar et</b><button class="btn small" data-act="kuSayAll">${S.kAll ? "⏹ Durdur" : "▶ Hepsini dinle"}</button></div>
    <div class="k-exs">${ex.map(e=>kExRow(e.de, e.tr)).join("")}</div>`, `<button class="btn primary block" data-act="kuNext">Anladım →</button>`);
}
function kuDialogView(){
  const K = S.ku, d = K.u.dialog, G = K.G; const roles = d.roles || {};
  if(G.mode === "listen"){
    return kuShell(`<div class="ku-mode">🎧 Diyalog · ${esc(d.title_tr||"")}</div><p class="small muted">Önce dinle. Sonra rolü sen üstleneceksin: <b>${esc(roles.B||"B")}</b>.</p>
      <div class="ku-dlg">${d.lines.map(l=>`<div class="ku-bub ${l.r === "B" ? "me" : ""}"><small>${esc(roles[l.r]||l.r)}</small><div class="row" style="gap:8px;flex-wrap:nowrap;align-items:flex-start">${kSay(l.de)}<div><div class="de">${esc(l.de)}</div><div class="tr">${esc(l.tr)}</div></div></div></div>`).join("")}</div>`,
      `<button class="btn" data-act="kuDlgAll">${S.kAll ? "⏹ Durdur" : "▶ Hepsini dinle"}</button><button class="btn primary block" data-act="kuDlgRole">🎭 Şimdi sen konuş</button><button class="btn ghost small" data-act="kuNext">Geç</button>`);
  }
  const L = d.lines; const i = G.i;
  if(i >= L.length) return kuShell(`<div class="ku-mode">🎭 Diyalog tamamlandı</div><p>Bütün satırları söyledin${G.ok != null ? ` (${G.ok}/${L.filter(l=>l.r === "B").length} ilk denemede)` : ""}.</p>`, `<button class="btn primary block" data-act="kuNext">Devam →</button><button class="btn block" data-act="kuDlgRole">Bir daha oyna</button>`);
  const l = L[i]; const past = L.slice(0, i);
  const hist = past.map(x=>`<div class="ku-bub ${x.r === "B" ? "me" : ""}"><small>${esc(roles[x.r]||x.r)}</small><div class="de">${esc(x.de)}</div></div>`).join("");
  if(l.r !== "B") return kuShell(`<div class="ku-mode">🎭 Rol: ${esc(roles.B||"B")}</div><div class="ku-dlg">${hist}<div class="ku-bub"><small>${esc(roles[l.r]||l.r)}</small><div class="de">${esc(l.de)}</div><div class="tr">${esc(l.tr)}</div></div></div>`, `<button class="btn primary block" data-act="kuDlgNext">Devam →</button>`);
  const R = G.res;
  return kuShell(`<div class="ku-mode">🎭 Sıra sende · ${esc(roles.B||"B")}</div><div class="ku-dlg">${hist}</div>
    <div class="ku-prompt">${esc(l.tr)}</div>${G.listening || G.live ? `<div class="ku-live">${esc(G.live || "Dinliyorum…")}</div>` : ""}
    ${R ? `<div class="ku-res ${R.ok ? "ok" : "bad"}"><div class="ku-res-h">${R.ok ? "✓ Doğru!" : "Doğrusu:"}</div><div class="ku-full">${kSay(l.de)}<b>${esc(l.de)}</b></div>${!R.ok && R.words ? `<div class="ku-diff">${kuDiffHtml(R.words)}</div>` : ""}</div>` : ""}`,
    R ? `${!R.ok ? `<button class="btn" data-act="kuDlgMic">🎤 Bir daha söyle</button>` : ""}<button class="btn primary block" data-act="kuDlgNext">Devam →</button>`
      : `<button class="btn primary block ku-mic ${G.listening ? "live" : ""}" data-act="kuDlgMic">${G.listening ? "⏹ Bitti, kontrol et" : "🎤 Söyle"}</button><button class="btn ghost small" data-act="kuDlgShow">Bilmiyorum, göster</button>`);
}
function kuReadView(){
  const K = S.ku, r = K.u.read, R = K.R;
  const sents = String(r.de).match(/[^.!?]+[.!?]+["“”]?/g) || [r.de];
  const answered = Object.keys(R.ans).length; const all = answered >= r.qs.length;
  return kuShell(`<div class="ku-mode">📖 Okuma · ${esc(r.title_de||"")}</div>
    <div class="ku-read">${sents.map(s=>`<span class="ku-rs" data-act="sayDe" data-t="${esc(s.trim())}">${esc(s.trim())}</span>`).join(" ")}</div>
    <div class="row"><button class="btn small" data-act="kuReadAll">${S.kAll ? "⏹ Durdur" : "▶ Metni dinle"}</button><button class="btn small ghost" data-act="kuReadTr">${R.tr ? "Çeviriyi gizle" : "Türkçesini göster"}</button></div>
    ${R.tr ? `<p class="small muted">${esc(r.tr)}</p>` : ""}
    <h3 class="ku-h3">Sorular</h3>${r.qs.map((q, qi)=>{ const ord = (R.ord = R.ord || {})[qi] || (R.ord[qi] = shuffle(q.opts.map((_, j)=>j))); return `<div class="ku-rq"><b>${esc(q.q_tr)}</b><div class="ku-opts col">${ord.map(j=>[q.opts[j], j]).map(([o, j])=>{ const a = R.ans[qi]; const st = a == null ? "" : j === q.ans ? "ok" : j === a ? "bad" : "dim"; return `<button class="ku-opt ${st}" data-act="kuReadAns" data-q="${qi}" data-j="${j}" ${a != null ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div></div>`; }).join("")}`,
    `<button class="btn primary block" data-act="kuNext" ${all ? "" : "disabled"}>Devam →</button>`);
}

/* ---------- rol oyunu: ünitenin hedeflerini öğreten kısa sohbet ---------- */
function rpNew(u){ const rp = u.roleplay; return {targets: rp.targets.map(t=>({...t, done:false})), msgs:[], phase:"start", fix:null, fixTries:0, corr:[], offline: !aiReady(), turns:0, live:""}; }
function rpSys(u, P){
  const rp = u.roleplay; const open = P.targets.map((t, i)=>`${i}. ${t.done ? "[ERLEDIGT] " : ""}${t.tr} (z. B. „${t.de}“)`).join("\n");
  return `Du spielst in einem kurzen Rollenspiel für einen türkischen Deutschlerner (Niveau ${u.lvl}).
ROLLE: ${rp.partner_de}
SZENE: ${rp.scene_tr}
LERNZIELE (der Lerner soll jedes Ziel selbst richtig sagen):
${open}
Gelernte Grammatik dieser Einheit: ${(u.teach||[]).map(t=>t.h_tr).join("; ")}
GESPRÄCH BISHER:
${P.msgs.slice(-10).map(m=>(m.who === "p" ? "DU: " : "LERNER: ") + m.de).join("\n")}

Die letzte Äußerung des Lerners (aus Spracherkennung, Satzzeichen und Großschreibung fehlen evtl.): „${P.last}“

Aufgabe:
1. Prüfe NUR echte Fehler (Grammatik, Wortstellung, Verbform, Artikel/Fall, falsches Wort, Englisch/Türkisch statt Deutsch). Ignoriere Satzzeichen, Groß/Klein und offensichtliche Hörfehler der Spracherkennung, wenn der Satz sonst richtig ist.
2. Bei einem echten Fehler: "ok": false, "right": sein Satz korrigiert (so nah wie möglich an seinem Satz, natürlich), "why_tr": kurzer Grund auf Türkisch (max. 12 Wörter, fehlerfreies Türkisch), "reply": "".
3. Wenn der Satz richtig ist: "ok": true, "hit": Liste der Ziel-Nummern, die er mit diesem Satz erfüllt hat, "reply": deine nächste Antwort in deiner Rolle (1-2 kurze, einfache Sätze auf Niveau ${u.lvl}, natürlich wie im echten Leben in Bayern); führe das Gespräch so, dass er ein noch offenes Ziel erfüllen muss (stell eine passende Frage). "reply_tr": Türkische Übersetzung von reply.
4. Wenn danach ALLE Ziele erledigt sind: verabschiede dich freundlich in reply und setze "end": true.
Antworte NUR mit JSON: {"ok":true,"right":"","why_tr":"","hit":[],"reply":"","reply_tr":"","end":false}`;
}
async function rpSayP(de){ const P = S.ku && S.ku.RP; if(!P) return; P.speaking = true; render(); await say(de, "de"); if(S.ku && S.ku.RP === P){ P.speaking = false; render(); } }
async function rpStart(){
  const K = S.ku, P = K.RP, rp = K.u.roleplay;
  P.phase = "talk"; P.msgs.push({who:"p", de: rp.opener_de}); render(); await rpSayP(rp.opener_de);
}
async function rpHeard(text){
  const K = S.ku, P = K.RP; if(!P || !text) return;
  if(P.fix){
    const j = kuJudge([P.fix.right], [text]); const sc = j.ok ? 1 : (j.score || 0);
    P.msgs.push({who:"u", de:text, fixTry:true});
    if(sc >= 0.85){ P.msgs.push({who:"sys", ok:true, de:"✓ Doğru!"}); const right = P.fix.right; P.fix = null; P.fixTries = 0; sfx("ok"); addXP(2, "rol"); await rpSend(right); }
    else { P.fixTries++; sfx("no"); if(P.fixTries >= 2){ const right = P.fix.right; P.fix = null; P.fixTries = 0; P.msgs.push({who:"sys", de:"Sorun değil, devam ediyoruz."}); await rpSend(right); } else { render(); await rpSayP("Noch einmal, bitte: " + P.fix.right); } }
    return;
  }
  P.msgs.push({who:"u", de:text}); await rpSend(text);
}
async function rpSend(text){
  const K = S.ku, P = K.RP, u = K.u; P.last = text; P.turns++;
  if(P.offline){ rpOffline(text); return; }
  P.thinking = true; render();
  let r = null;
  try{ if(!aiReady()) throw {code:"not_granted"}; r = await Promise.race([AI.json(rpSys(u, P), {modelTier:"default"}), sleep(25000).then(()=>{ throw {code:"timeout"}; })]); }
  catch(e){ r = null; }
  if(!S.ku || S.ku.RP !== P) return;
  P.thinking = false;
  if(!r || typeof r !== "object"){ P.offline = true; P.msgs.push({who:"sys", de:"Bağlantı zayıf: hazır diyalogla devam ediyoruz."}); rpOffline(text); return; }
  if(r.ok === false && r.right && kuNorm(r.right) !== kuNorm(text)){
    P.fix = {right: String(r.right), why: String(r.why_tr||""), wrong: text}; P.corr.push({wrong:text, right:String(r.right), rule_tr:String(r.why_tr||""), topic:"Sonstiges"});
    P.msgs.push({who:"fix", de:String(r.right), why:String(r.why_tr||""), wrong:text}); sfx("no"); render();
    await rpSayP("Fast! Richtig ist: " + r.right + " Sag es bitte noch einmal."); return;
  }
  for(const h of (r.hit||[])){ const t = P.targets[+h]; if(t && !t.done){ t.done = true; sfx("combo"); } }
  if(r.reply) P.msgs.push({who:"p", de:String(r.reply), tr:String(r.reply_tr||"")});
  if(r.end || P.targets.every(t=>t.done)){ P.phase = "end"; render(); if(r.reply) await rpSayP(r.reply); rpFinish(); return; }
  render(); if(r.reply) await rpSayP(r.reply);
}
function rpScroll(){ const el = document.querySelector(".rp-chat > :last-child, .ku-dlg > :last-child"); if(el && S.ku && (S.ku.RP || (S.ku.G && S.ku.G.mode === "role"))) el.scrollIntoView({block:"center", behavior:"smooth"}); }
/* yapay zekâ yoksa: ünitenin hazır diyaloğuyla aynı sahne */
function rpOffline(text){
  const K = S.ku, P = K.RP, d = K.u.dialog; const B = d.lines.filter(l=>l.r === "B");
  P.oi = P.oi || 0;
  const want = B[Math.min(P.oi, B.length - 1)];
  if(want){ const j = kuJudge([want.de], [text]); if(!j.ok && (j.score||0) < 0.8){ P.fix = {right: want.de, why:"Hazır diyalogdaki doğru cümle."}; P.msgs.push({who:"fix", de:want.de, why:"", wrong:text}); render(); rpSayP("Sag mal: " + want.de); return; } }
  const idx = d.lines.indexOf(want); P.oi++;
  const nextA = d.lines.slice(idx + 1).find(l=>l.r !== "B");
  P.targets.forEach((t, i)=>{ if(!t.done && i < Math.ceil(P.oi / B.length * P.targets.length)) t.done = true; });
  if(!nextA || P.oi >= B.length){ P.phase = "end"; P.targets.forEach(t=>t.done = true); render(); rpFinish(); return; }
  P.msgs.push({who:"p", de: nextA.de, tr: nextA.tr}); render(); rpSayP(nextA.de);
}
function rpFinish(){ const P = S.ku.RP; P.phase = "end"; if(P.corr.length) addMistakes(P.corr, "kurs-rol"); confetti(70); sfx("up"); addXP(10, "rol"); render(); }
function kuRoleView(){
  const K = S.ku, P = K.RP, rp = K.u.roleplay;
  const tg = `<div class="rp-tg">${P.targets.map(t=>`<span class="${t.done ? "on" : ""}">${t.done ? "✓" : "○"} ${esc(t.tr)}</span>`).join("")}</div>`;
  if(P.phase === "start") return kuShell(`<div class="ku-mode">🎭 Rol oyunu</div><h3 class="ku-h3">${esc(rp.scene_tr)}</h3><p class="small muted">Karşındaki: <b>${esc((rp.partner_de||"").split(",")[0])}</b></p><p>Bu kısa sohbette şunları söyleyeceksin. Her hatanda partnerin doğrusunu söyleyecek ve tekrar ettirecek.</p>${tg}${P.offline ? `<div class="note">Yapay zekâ şu an yok: hazır diyalogla oynanacak.</div>` : ""}`,
    `<button class="btn primary block" data-act="rpGo">▶ Başla</button><button class="btn ghost small" data-act="kuNext">Şimdi değil, geç</button>`);
  const chat = P.msgs.map(m=> m.who === "p" ? `<div class="ku-bub"><small>${esc((rp.partner_de||"").split(",")[0])}</small><div class="row" style="gap:8px;flex-wrap:nowrap;align-items:flex-start">${kSay(m.de)}<div><div class="de">${esc(m.de)}</div>${m.tr ? `<details class="tr"><summary>Türkçesi</summary>${esc(m.tr)}</details>` : ""}</div></div></div>`
    : m.who === "u" ? `<div class="ku-bub me"><small>Sen</small><div class="de">${esc(m.de)}</div></div>`
    : m.who === "fix" ? `<div class="rp-fix"><b>Richtig ist:</b><div class="ku-full">${kSay(m.de)}<b>${esc(m.de)}</b></div>${m.why ? `<p class="small">${esc(m.why)}</p>` : ""}<p class="small muted">Şimdi bu cümleyi söyle.</p></div>`
    : `<div class="rp-sys ${m.ok ? "ok" : ""}">${esc(m.de)}</div>`).join("");
  if(P.phase === "end") return kuShell(`<div class="ku-mode">🎭 Rol oyunu bitti</div>${tg}<p>${P.corr.length ? `${P.corr.length} düzeltme hata defterine eklendi; tekrarlarda karşına çıkacak.` : "Hatasız! 👏"}</p><div class="ku-dlg">${chat}</div>`, `<button class="btn primary block" data-act="kuNext">Devam →</button>`);
  const busy = P.thinking || P.speaking;
  return kuShell(`<div class="ku-mode">🎭 ${esc(rp.scene_tr)}</div>${tg}<div class="ku-dlg rp-chat">${chat}${P.thinking ? `<div class="ku-bub typing"><span></span><span></span><span></span></div>` : ""}</div>${P.listening || P.live ? `<div class="ku-live">${esc(P.live || "Dinliyorum…")}</div>` : ""}`,
    P.typed ? `<input id="rpIn" class="ku-in" autocomplete="off" spellcheck="false" placeholder="Almanca yaz…" enterkeyhint="send"><div class="grid2"><button class="btn primary" data-act="rpSendTyped">Gönder</button><button class="btn" data-act="rpTypeOff">🎤 Sesle</button></div>`
      : `<button class="btn primary block ku-mic ${P.listening ? "live" : ""}" data-act="rpMic" ${busy && !P.listening ? "disabled" : ""}>${P.listening ? "⏹ Bitti, gönder" : busy ? (P.thinking ? "…" : "🔊 dinle") : P.fix ? "🎤 Doğrusunu söyle" : "🎤 Konuş"}</button><div class="grid2"><button class="btn small" data-act="rpTypeOn">⌨️ Yazarak</button><button class="btn small ghost" data-act="rpEnd">Bitir</button></div>`);
}

/* ---------- harita ---------- */
/* ---------- oyunlar: eşleştir + hızlı tur (ünitenin kelimeleriyle) ---------- */
function kuMatchNew(u){
  const W = shuffle((u.words||[]).filter(w=>w.tr)); const rounds = []; for(let i = 0; i < W.length && rounds.length < 3; i += 5){ const r = W.slice(i, i + 5); if(r.length >= 3) rounds.push(r); }
  return {rounds, r:0, sel:null, ok:{}, bad:null, wrong:0, t0:Date.now(), L:null, R:null};
}
function kuMatchView(){
  const K = S.ku; if(!K.M) K.M = kuMatchNew(K.u); const M = K.M;
  if(M.r >= M.rounds.length){ const sec = Math.round((M.t1 - M.t0)/1000); const rec = kuRec(K.id); const best = rec.match || 0; const nb = !best || sec < best; if(nb && !M.saved){ rec.match = sec; M.saved = true; kuSave(); }
    return kuShell(`<div class="ku-mode">🎮 Eşleştir</div><div class="ku-sum pass"><div class="ku-score">${sec} sn</div><p>${M.wrong ? M.wrong + " yanlış eşleştirme" : "Hatasız!"} ${nb ? "· Yeni rekor 🏆" : "· Rekor: " + best + " sn"}</p></div>`, `<button class="btn primary block" data-act="kuNext">Hızlı tura geç →</button><button class="btn block" data-act="kuMatchAgain">Bir daha oyna</button>`); }
  const R = M.rounds[M.r]; if(!M.L){ M.L = shuffle(R.map((w, i)=>i)); M.R = shuffle(R.map((w, i)=>i)); }
  const cell = (side, i) => { const w = R[i]; const id = side + i; const done = M.ok[i]; const sel = M.sel === id; const bad = M.bad && M.bad.includes(id);
    return `<button class="ku-mt ${done ? "done" : ""} ${sel ? "sel" : ""} ${bad ? "bad" : ""} ${side === "L" ? "de" : ""}" data-act="kuMatchTap" data-id="${id}" ${done ? "disabled" : ""}>${esc(side === "L" ? kuWFull(w) : w.tr)}</button>`; };
  return kuShell(`<div class="ku-mode">🎮 Eşleştir · tur ${M.r + 1}/${M.rounds.length}</div><p class="small muted">Almancayı Türkçesiyle eşleştir. Hızlı ol!</p>
    <div class="ku-match"><div>${M.L.map(i=>cell("L", i)).join("")}</div><div>${M.R.map(i=>cell("R", i)).join("")}</div></div>`, "");
}
function kuSpeedRun(u){
  const W = (u.words||[]); const items = [];
  for(const w of shuffle(W)){ const key = kuWKey(u, w);
    if(w.t === "n" && w.art){ const o = ["der","die","das"]; items.push({_id:key + ":sa", _w:key, k:"pick", q_tr:`${w.de}`, opts:o, ans:o.indexOf(w.art), t:"w"}); }
    const others = shuffle(W.filter(x=>x !== w && x.tr !== w.tr)).slice(0, 2).map(x=>x.tr); const opts = shuffle([w.tr, ...others]);
    items.push({_id:key + ":sm", _w:key, k:"pick", q_tr: kuWFull(w), opts, ans:opts.indexOf(w.tr), t:"w"}); }
  const D = kuDrillRun(shuffle(items), "speed", "⚡ Hızlı tur · 60 saniye");
  D.deadline = Date.now() + 60000;
  D.tick = setInterval(()=>{ if(!S.ku || S.ku.D !== D || D.finished){ clearInterval(D.tick); return; } const left = Math.ceil((D.deadline - Date.now())/1000); const el = document.getElementById("kuTimer"); if(el) el.textContent = "⏱ " + Math.max(0, left) + " sn"; if(left <= 0){ clearInterval(D.tick); kuDrillEnd(); } }, 250);
  return D;
}
/* ---------- yazma ---------- */
function kuWriteView(){
  const K = S.ku, Wr = K.Wr, t = K.u.speak[Wr.i]; const n = Math.min(2, K.u.speak.length);
  const head = `<div class="ku-mode">✍️ Yazma ${Wr.i + 1}/${n}</div><div class="ku-prompt sm">${esc(t.tr)}</div>${(t.hint_de||[]).length ? `<div class="ku-hints">${t.hint_de.map(h=>`<span>${esc(h)}</span>`).join("")}</div>` : ""}`;
  if(Wr.phase === "edit") return kuShell(`${head}<textarea id="kuWr" class="ku-in ku-ta" rows="5" placeholder="Almanca yaz… (3-5 cümle)" spellcheck="false" autocapitalize="sentences">${esc(Wr.text||"")}</textarea>`,
    `<button class="btn primary block" data-act="kuWrCheck">Kontrol et</button><button class="btn ghost small" data-act="kuWrShow">Örnek cevabı göster</button>`);
  const r = Wr.res || {};
  const corrected = r.corrected || "";
  return kuShell(`${head}${Wr.text ? `<div class="ku-wr-you"><small>Senin metnin</small><p>${esc(Wr.text)}</p></div>` : ""}
    ${Wr.busy ? thinkingCard("Düzeltiliyor…") : ""}
    ${corrected && kuNorm(corrected) !== kuNorm(Wr.text) ? `<div class="ku-res bad"><div class="ku-res-h">Düzeltilmiş hali</div><div class="ku-full">${kSay(corrected)}<b>${esc(corrected)}</b></div>${(r.mistakes||[]).map(m=>`<div class="small"><s>${esc(m.wrong)}</s> → <b>${esc(m.right)}</b>${m.why_tr ? " · " + esc(m.why_tr) : ""}</div>`).join("")}</div>` : corrected ? `<div class="ku-res ok"><div class="ku-res-h">✓ Hatasız! 👏</div></div>` : ""}
    ${r.praise_tr ? `<p class="small">${esc(r.praise_tr)}</p>` : ""}${Wr.err ? `<div class="note">${esc(Wr.err)}</div>` : ""}
    <div class="ku-res ok" style="opacity:.95"><div class="ku-res-h">Örnek cevap</div><div class="ku-full">${kSay(t.model_de)}<b>${esc(t.model_de)}</b></div></div>`,
    Wr.busy ? "" : `<button class="btn primary block" data-act="kuNext">Devam →</button><button class="btn block" data-act="kuWrAgain">Yeniden yaz</button>`);
}
async function kuWrCheck(){
  const K = S.ku, Wr = K.Wr, t = K.u.speak[Wr.i]; const el = $("#kuWr"); Wr.text = el ? el.value.trim() : Wr.text; if(!Wr.text) return;
  Wr.phase = "res"; Wr.res = null; Wr.err = "";
  if(!aiReady()){ Wr.err = "Yapay zekâ şu an yok: örnek cevapla karşılaştır."; render(); return; }
  Wr.busy = true; render();
  const prompt = `Ein türkischer Deutschlerner (Niveau ${K.u.lvl}) hat diese Aufgabe bekommen: ${t.tr} (Beispiel: „${t.model_de}“).
Sein Text: „${Wr.text}“
Korrigiere NUR echte Fehler, ändere so wenig wie möglich, behalte seinen Inhalt. Antworte NUR mit JSON:
{"corrected":"sein ganzer Text, korrigiert","mistakes":[{"wrong":"falscher Teil","right":"richtig","why_tr":"kurzer Grund auf Türkisch, max. 10 Wörter"}],"praise_tr":"ein kurzer, ehrlicher Satz auf Türkisch"}`;
  let r = null; try{ r = await Promise.race([AI.json(prompt, {modelTier:"default"}), sleep(25000).then(()=>null)]); }catch(e){ r = null; }
  if(!S.ku || S.ku.Wr !== Wr) return;
  Wr.busy = false;
  if(!r || !r.corrected){ Wr.err = "Düzeltme şu an alınamadı; örnek cevapla karşılaştır."; render(); return; }
  Wr.res = r; if((r.mistakes||[]).length){ addMistakes(r.mistakes.map(m=>({wrong:m.wrong, right:m.right, rule_tr:m.why_tr, topic:"Sonstiges"})), "kurs-yazma"); sfx("no"); } else { sfx("ok"); addXP(5, "yazma"); }
  render();
}
/* ---------- sınav kapısı: kelimeler kalıcı öğrenilmeden sınav yok ---------- */
function kuGateView(){
  const K = S.ku, u = K.u; const W = u.words || [];
  const notYet = W.filter(w=>!kuWLearned(u, w)); const ready = notYet.filter(w=>kuWReadyAgain(u, w));
  if(!notYet.length) return kuShell(`<div class="ku-mode">🏆 Ünite sınavı</div><h3 class="ku-h3">Hazırsın</h3><p>Bu ünitenin bütün kelimelerini iki ayrı oturumda kendin söyledin. Sınavda ${(u.test||[]).length} yeni cümle ve önceki ünitelerden birkaç soru var. Geçmek için %80.</p>`,
    `<button class="btn primary block" data-act="kuTestGo">Sınava başla</button>`);
  const waitMin = notYet.length && !ready.length ? Math.ceil(Math.min(...notYet.map(w=>KU_GAP - (Date.now() - (kuWSt(kuWKey(u, w)).last||0)))) / 60000) : 0;
  return kuShell(`<div class="ku-mode">🏆 Ünite sınavı · kapı</div><h3 class="ku-h3">Önce kelimeler kalıcı olmalı</h3>
    <p class="small">Bir kelime, Türkçesinden Almancasını <b>iki ayrı oturumda</b> (arada en az 3 saat) doğru söyleyince kalıcı sayılır. ${W.length - notYet.length}/${W.length} hazır.</p>
    <div class="ku-gw">${notYet.map(w=>{ const c = kuWSt(kuWKey(u, w)).c || 0; return `<span class="${kuWReadyAgain(u, w) ? "" : "wait"}">${esc(kuWFull(w))} <small>${c}/2</small></span>`; }).join("")}</div>
    ${!ready.length ? `<div class="note">Kalan kelimelerin ikinci turu yaklaşık ${waitMin < 60 ? waitMin + " dakika" : Math.round(waitMin/60) + " saat"} sonra açılacak. Bu arada sıradaki ünitenin ilk basamaklarına başlayabilirsin.</div>` : ""}`,
    ready.length ? `<button class="btn primary block" data-act="kuGateDrill">Kelimeleri pekiştir (${ready.length})</button>` : `${kuNextId(u.id) ? `<button class="btn primary block" data-act="kuStartId" data-id="${kuNextId(u.id)}">Sıradaki üniteye başla</button>` : ""}<button class="btn block" data-act="kuBack">Ünite yoluna dön</button>`);
}
/* ---------- ünite yolu (Duolingo/Busuu gibi basamaklar) ---------- */
function kuPathView(id){
  const u = KURS.units[id]; const m = kuMeta(id) || {};
  if(!u) return thinkingCard("Ünite açılıyor…");
  const ns = kuNodes(u); const rec = kSt().u[id] || {}; const nd = rec.nd || {};
  const nextN = ns.find(x=>!nd[x.id]); const doneN = ns.filter(x=>nd[x.id]).length;
  const W = u.words || []; const learned = W.filter(w=>kuWLearned(u, w)).length;
  const msg = S.kuDoneMsg; S.kuDoneMsg = "";
  return `<section class="card ku-hero"><div class="row between"><div class="kicker">${esc(u.lvl)} · Ünite ${kuList().findIndex(x=>x.id === id) + 1}</div><button class="btn small" style="background:rgba(255,255,255,.2);color:#fff;border:0" data-act="kuMap">Harita</button></div>
      <h2>${esc(u.title_tr)}</h2><div class="ku-de-t">${esc(u.title_de)}</div><p class="small">🎯 ${esc(u.goal_tr)}</p>
      <div class="ku-stats"><span>${doneN}/${ns.length} basamak</span><span>🧠 ${learned}/${W.length} kelime kalıcı</span>${rec.done ? `<span>✓ %${rec.best}</span>` : ""}</div>
      ${nextN ? `<button class="btn primary block ku-go" data-act="kuNode" data-u="${esc(id)}" data-n="${nextN.id}">▶ ${esc(nextN.ic + " " + nextN.t)}</button>` : rec.done && kuNextId(id) ? `<button class="btn primary block ku-go" data-act="kuStartId" data-id="${kuNextId(id)}">Sıradaki ünite →</button>` : ""}
    </section>
    ${msg ? `<div class="fb ok">${esc(msg)}</div>` : ""}
    <div class="ku-path">${ns.map((x, i)=>{ const dn = !!nd[x.id]; const cur = nextN && x.id === nextN.id; const locked = !dn && !cur;
      return `<div class="ku-pn ${i % 2 ? "r" : "l"}"><button class="ku-node ${dn ? "done" : ""} ${cur ? "cur" : ""} ${locked ? "lock" : ""} k-${x.k}" data-act="kuNode" data-u="${esc(id)}" data-n="${x.id}" ${locked ? "disabled" : ""} aria-label="${esc(x.t)}"><span>${dn ? "✓" : x.ic}</span></button><div class="ku-pl"><b>${esc(x.t)}</b>${dn ? `<small class="ok">✓ Tamamlandı · ${kuFmtDay(nd[x.id])}</small>` : cur ? `<small class="nx">Sıradaki adım</small>` : `<small>Kilitli</small>`}</div></div>`; }).join("")}</div>`;
}

function renderKurs(){
  const K = S.ku;
  if(K && K.err) return `<section class="card k-errc"><b>Bir aksilik oldu</b><p class="small">${esc(K.err)}</p><button class="btn primary" data-act="kuStartId" data-id="${esc(K.id)}">Tekrar dene</button><button class="btn ghost" data-act="kuMap">Kurs haritası</button></section>`;
  if(K && K.busy) return thinkingCard("Açılıyor…");
  if(K && K.D && (K.D.mode === "review" || ["drills","test","speed"].includes((kuStep()||{}).k))) return kuDrillView();
  if(K && K.steps){ const s = kuStep();
    if(s.k === "wintro") return kuWintroView(); if(s.k === "teach") return kuTeachView(); if(s.k === "match") return kuMatchView();
    if(s.k === "dialog") return kuDialogView(); if(s.k === "read") return kuReadView(); if(s.k === "role") return kuRoleView();
    if(s.k === "write") return kuWriteView(); if(s.k === "gate") return kuGateView(); }
  if(!KURS.idx){ kursIndex().then(()=>{ if(S.view === "kurs") render(); }); return thinkingCard("Kurs yükleniyor…"); }
  if(S.kuU){ if(!KURS.units[S.kuU]) kursUnit(S.kuU).then(()=>{ if(S.view === "kurs") render(); }).catch(()=>{}); return kuPathView(S.kuU); }
  return kuMapView();
}
function kuMapView(){
  const st = kSt(); const L = kuList(); const cur = kuMeta(st.cur) || L[0];
  const doneN = L.filter(x=>kuDone(x.id)).length; const due = kuDueCount() + kuWordsDue().length;
  const lv = {}; L.forEach(x=>{ (lv[x.lvl] = lv[x.lvl] || []).push(x); });
  const open = id => { const r = st.u[id]; return kuDone(id) || id === cur.id || (r && r.nd && Object.keys(r.nd).length) || L.slice(0, L.findIndex(x=>x.id === id)).every(x=>kuDone(x.id) || (st.u[x.id] && st.u[x.id].open)); };
  return `<section class="card ku-hero"><div class="kicker">Kursum · ${doneN}/${L.length} ünite tamamlandı</div>
      <div class="ku-cur"><span class="chip">${esc(cur.lvl)}</span><h2>${esc(cur.title_tr)}</h2><div class="ku-de-t">${esc(cur.title_de)}</div><p class="small">${esc(cur.goal_tr)}</p></div>
      ${cur.ready === false ? `<div class="note">Bu ünitenin içeriği hazırlanıyor.</div>` : `<button class="btn primary block ku-go" data-act="kuUnit" data-id="${esc(cur.id)}">▶ Üniteye git</button>`}
    </section>
    ${due ? `<section class="card ku-rv"><div class="row between"><div><b>🔁 Kurs tekrarı</b><div class="small muted">${due} madde zamanı geldi</div></div><button class="btn primary" data-act="kuReview">Başla</button></div></section>` : ""}
    ${Object.entries(lv).map(([l, us])=>{ const d = us.filter(x=>kuDone(x.id)).length; return `<section class="card ku-lv"><div class="row between"><h3>${esc(l)}</h3><span class="small muted">${d}/${us.length}</span></div><div class="c-bar"><i style="width:${Math.round(d/us.length*100)}%"></i></div>
      <div class="ku-units">${us.map(x=>{ const dn = kuDone(x.id), isCur = x.id === cur.id, r = st.u[x.id] || {}; const op = x.ready !== false && open(x.id); const nd = r.nd ? Object.keys(r.nd).length : 0;
        return `<button class="ku-unit ${dn ? "done" : ""} ${isCur ? "cur" : ""} ${op ? "" : "soon"}" data-act="kuUnit" data-id="${esc(x.id)}" ${op ? "" : "disabled"}><i>${dn ? "✓" : isCur ? "▶" : x.ready === false ? "…" : op ? "○" : "🔒"}</i><span><b>${esc(x.title_tr)}</b><small>${esc(x.title_de)}${dn ? " · %" + (r.best||0) : nd ? " · " + nd + " basamak" : r.open ? " · sınav bekliyor" : ""}</small></span></button>`; }).join("")}</div></section>`; }).join("")}`;
}
function kuWordsDue(){ const W = kSt().w || {}; const t = dayKey(); return Object.entries(W).filter(([, r])=>r.c && r.d && r.d <= t).map(([k])=>k); }
/* tekrar: vadesi gelen kuralları, en son görülmeyen cümleyle sor */
async function kuReviewStart(){
  stopAll && stopAll(); S.ku = {busy:true}; go("kurs"); render();
  const st = kSt(); const t = dayKey(); const due = Object.entries(st.it).filter(([, r])=>r.d && r.d <= t).sort((a, b)=>(a[1].b - b[1].b) || (b[1].w - a[1].w));
  const units = [...new Set(due.map(([id])=>id.split(":")[0]))];
  const items = []; const usedRule = {};
  for(const uid of units){ try{ const u = await kursUnit(uid); const all = [...kuTag(u, u.drills, "d"), ...kuTag(u, u.test, "x")];
    for(const [id, r] of due.filter(([id])=>id.startsWith(uid + ":"))){
      const orig = all.find(x=>x._id === id); if(!orig) continue;
      const rk = uid + ":" + orig.t; usedRule[rk] = (usedRule[rk]||0) + 1; if(usedRule[rk] > 3) continue;
      /* aynı kuraldan, son 5 günde görülmemiş başka bir cümle varsa onu sor */
      const alt = all.filter(x=>x.t === orig.t && x._id !== id && !(st.it[x._id] && st.it[x._id].s && st.it[x._id].s >= addDays(t, -5)) && !items.includes(x));
      const pick = (r.w && alt.length) ? alt[Math.floor(Math.random() * alt.length)] : orig;
      if(!items.includes(pick)) items.push(pick);
      if(pick !== orig){ st.it[id].d = addDays(t, 2); }
      if(items.length >= 14) break; } }catch(e){} if(items.length >= 14) break; }
  /* vadesi gelen kelimeler: Türkçesinden Almancasını kendin söyle */
  for(const key of shuffle(kuWordsDue()).slice(0, 8)){ const uid = key.split(":w:")[0]; try{ const u = await kursUnit(uid); const w = (u.words||[]).find(x=>kuWKey(u, x) === key); if(w) items.push(...kuWordItems(u, [w], "prod")); }catch(e){} }
  if(!items.length){ S.ku = null; toast("Bugün tekrar edilecek madde yok 👍"); go("kurs"); render(); return; }
  S.ku = {review:true, u:{title_tr:"Tekrar"}, D: kuDrillRun(shuffle(items), "review")}; render(); setTimeout(()=>kuAuto(), 250);
}

VIEWS.kurs = () => { setTimeout(rpScroll, 30); return renderKurs(); };
if(typeof VIEW_TITLE === "object") VIEW_TITLE.kurs = "Kurs";

async function kuListen(target, onText){
  /* ortak mikrofon: dokun → dinle, tekrar dokun → bitir */
  if(typeof REC_CUR !== "undefined" && REC_CUR){ try { micFinish(); } catch(e){} return null; }
  stopSpeech && stopSpeech();
  try{ const alts = await recognize(onText); return alts || []; }
  catch(e){ if(e && e.code === "cancel") return null; toast(e && e.code === "no-speech" ? "Ses duyamadım. 🎤'a dokunup tekrar söyle." : "Mikrofon şu an açılamadı. Yazarak da cevap verebilirsin."); return null; }
}
Object.assign(ACT, {
  kursOpen(){ S.ku = null; go("kurs"); render(); },
  kuMap(){ stopAll && stopAll(); S.ku = null; S.kuU = null; go("kurs"); render(); window.scrollTo(0,0); },
  kuBack(){ stopAll && stopAll(); const id = (S.ku && S.ku.id) || S.kuU; S.ku = null; S.kuU = id || null; go("kurs"); render(); window.scrollTo(0,0); },
  kuExit(){ stopAll && stopAll(); const K = S.ku; if(K && K.D) clearInterval(K.D.tick); S.ku = null; S.kuU = (K && K.id) || S.kuU || null; kuSave(true); go("kurs"); render(); window.scrollTo(0,0); },
  kuStartId(b){ kuStart(b.dataset.id); },
  kuUnit(b){ kuOpenUnit(b.dataset.id); },
  kuNode(b){ kuStartNode(b.dataset.u, b.dataset.n); },
  kuWNext(){ const K = S.ku, s = kuStep(); K.wres = null; K._said = null;
    if(K.wi === 0 && !K._wAdded){ K._wAdded = true; }
    if(K.wi < s.words.length - 1){ K.wi++; render(); return; }
    const u = K.u; addWords(s.words.filter(w=>w.t !== "x").map(w=>({de:w.de, artikel:w.art, plural: w.pl === "-" || w.pl === "Pl" ? "" : w.pl, tr:w.tr, note:"Kurs " + u.lvl + ": " + u.title_tr, kind: w.t === "v" ? "verb" : w.t === "n" ? "nomen" : "andere", src:"kurs"})));
    kuGoNext(); },
  async kuWSay(){ const K = S.ku, s = kuStep(); const w = s.words[K.wi]; if(K.wlisten){ try { micFinish(); } catch(e){} return; }
    K.wlisten = true; K.wres = null; render(); const alts = await kuListen(null, ()=>{}); if(S.ku !== K) return; K.wlisten = false;
    if(alts && alts.length){ const j = kuJudge([kuWFull(w), w.de], alts); K.wres = j.ok || (j.score||0) >= 0.75 ? "ok" : "no"; sfx(K.wres === "ok" ? "ok" : "no"); } render(); },
  kuMatchTap(b){ const M = S.ku.M; const id = b.dataset.id; const side = id[0], i = +id.slice(1); M.bad = null;
    if(!M.sel || M.sel[0] === side){ M.sel = id; if(side === "L") say(kuWFull(M.rounds[M.r][i]), "de"); render(); return; }
    const j = +M.sel.slice(1); if(i === j){ M.ok[i] = true; M.sel = null; sfx("ok");
      if(Object.keys(M.ok).length >= M.rounds[M.r].length){ M.r++; M.ok = {}; M.L = null; M.R = null; if(M.r >= M.rounds.length){ M.t1 = Date.now(); addXP(5, "oyun"); confetti(40); } } }
    else { M.wrong++; M.bad = [M.sel, id]; M.sel = null; sfx("no"); setTimeout(()=>{ if(S.ku && S.ku.M === M){ M.bad = null; render(); } }, 600); }
    render(); },
  kuMatchAgain(){ S.ku.M = kuMatchNew(S.ku.u); render(); },
  kuSpeedAgain(){ S.ku.D = kuSpeedRun(S.ku.u); render(); },
  kuWrCheck(){ kuWrCheck(); },
  kuWrShow(){ const Wr = S.ku.Wr; const el = $("#kuWr"); Wr.text = (el && el.value.trim()) || ""; Wr.phase = "res"; Wr.err = ""; render(); },
  kuWrAgain(){ const Wr = S.ku.Wr; Wr.phase = "edit"; Wr.res = null; render(); },
  kuGateDrill(){ const K = S.ku, u = K.u; const ready = (u.words||[]).filter(w=>!kuWLearned(u, w) && kuWReadyAgain(u, w));
    K.steps.splice(K.si, 0, {k:"drills", lab:"Kelime pekiştirme · Türkçesinden söyle", items: shuffle(kuWordItems(u, ready, "prod"))}); kuEnter(); render(); },
  kuTestGo(){ const K = S.ku, u = K.u; const items = shuffle([...kuTag(u, u.test, "x"), ...kuPrevItems(u, 4)]);
    K.steps.splice(K.si + 1, 0, {k:"test", items}); kuGoNext(); },
  kuNext(){ kuGoNext(); },
  kuRetest(){ const K = S.ku, u = K.u; K.D = kuDrillRun(shuffle([...kuTag(u, u.test, "x"), ...kuPrevItems(u, 4)]), "test", "Ünite sınavı"); render(); setTimeout(()=>kuAuto(), 250); },
  kuWeak(){ const K = S.ku; const w = new Set(K.D.weak || []); const items = kuTag(K.u, K.u.drills, "d").filter(x=>w.has(x.t));
    K.D = kuDrillRun(shuffle(items).slice(0, 12), "drill", "Zayıf kısımlar"); K.D.after = "test"; render(); setTimeout(()=>kuAuto(), 250); },
  kuReview(){ kuReviewStart(); },
  kuSayAll(){ if(S.kAll){ S.kAllRun = (S.kAllRun||0) + 1; S.kAll = false; stopSpeech(); render(); return; } const t = S.ku.u.teach[kuStep().i]; kSaySeq((t.ex||[]).map(e=>e.de)); },
  kuDlgAll(){ if(S.kAll){ S.kAllRun = (S.kAllRun||0) + 1; S.kAll = false; stopSpeech(); render(); return; } kSaySeq(S.ku.u.dialog.lines.map(l=>l.de)); },
  kuReadAll(){ if(S.kAll){ S.kAllRun = (S.kAllRun||0) + 1; S.kAll = false; stopSpeech(); render(); return; } const r = S.ku.u.read; kSaySeq(String(r.de).match(/[^.!?]+[.!?]+/g) || [r.de]); },
  kuReadTr(){ S.ku.R.tr = !S.ku.R.tr; render(); },
  kuReadAns(b){ const q = +b.dataset.q, j = +b.dataset.j; const R = S.ku.R; if(R.ans[q] != null) return; R.ans[q] = j; const ok = S.ku.u.read.qs[q].ans === j; sfx(ok ? "ok" : "no"); if(ok) addXP(2, "okuma"); render(); },
  kuSlow(){ const it = kuCur(); if(it) say(it.de, "de", 0.7); },
  kuPick(b){ const D = S.ku.D, it = kuCur(); if(!it || D.res) return; const v = b.dataset.v; D.chosen = v;
    const ok = it.k === "gap" ? it.ans.includes(v) : +v === it.ans; kuAnswer(ok); },
  kuChip(b){ const D = S.ku.D; const j = +b.dataset.j; if(!D.built.includes(j)) D.built.push(j); render(); },
  kuUnchip(b){ const D = S.ku.D; D.built.splice(+b.dataset.n, 1); render(); },
  kuOrderCheck(){ const D = S.ku.D, it = kuCur(); if(D.aiChk) return; let s = D.built.map(j=>D.pool[j]).join(" ") + (D.end || ""); s = s.charAt(0).toUpperCase() + s.slice(1); kuDecide(it, [s], {}); },
  kuTypeOn(){ S.ku.D.typed = true; render(); setTimeout(()=>{ const el = $("#kuIn"); if(el) el.focus(); }, 50); },
  kuTypeOff(){ S.ku.D.typed = false; render(); },
  kuCheckTyped(){ const D = S.ku.D; if(D.aiChk) return; const el = $("#kuIn"); const v = el ? el.value.trim() : ""; if(!v) return; const it = kuCur(); kuDecide(it, [v], {}); },
  kuSkip(){ const D = S.ku.D; D.chosen = null; kuAnswer(false, {skip:true}); },
  async kuMic(){ const K = S.ku, D = K.D, it = kuCur(); if(!it || D.res && !D.repeating) return;
    if(D.listening){ try { micFinish(); } catch(e){} return; }
    D.listening = true; D.live = ""; render();
    const alts = await kuListen(null, t=>{ D.live = t; const el = document.querySelector(".ku-live"); if(el) el.textContent = t; });
    if(S.ku !== K) return; D.listening = false;
    if(!alts || !alts.length){ D.live = ""; render(); return; }
    kuDecide(it, alts, {spoken:true}); },
  kuOverride(){ const D = S.ku.D; const idx = D.q[D.pos]; const it = kuCur(); if(D.first[idx] === false){ D.first[idx] = true; D.ok++; D.bad = Math.max(0, D.bad - 1); if(it._w){ if(it.k === "say") kuWordMark(it._w, true); } else kuMark(it, true); }
    D.q = D.q.filter((x, k)=>k <= D.pos || x !== idx); D.res.ok = true; D.res.over = true; sfx("ok"); render(); },
  async kuRepeat(){ const K = S.ku, D = K.D, it = kuCur(); if(!it || !D.res) return;
    if(D.listening){ try { micFinish(); } catch(e){} return; }
    D.listening = true; render();
    const alts = await kuListen(null, ()=>{}); if(S.ku !== K) return; D.listening = false;
    if(!alts || !alts.length){ render(); return; }
    const j = kuJudge(kuVariants(it), alts); D.res.rep = j.ok || (j.score||0) >= 0.85 ? "ok" : "no"; sfx(D.res.rep === "ok" ? "ok" : "no"); render(); },
  kuAdv(){ kuAdvance(); },
  kuDlgRole(){ stopAll && stopAll(); S.ku.G = {mode:"role", i:0, ok:0}; kuDlgAdvanceA(); },
  kuDlgNext(){ const G = S.ku.G; G.i++; G.res = null; G.live = ""; kuDlgAdvanceA(); },
  kuDlgShow(){ const G = S.ku.G; G.res = {ok:false}; render(); say(S.ku.u.dialog.lines[G.i].de, "de"); },
  async kuDlgMic(){ const K = S.ku, G = K.G; const l = K.u.dialog.lines[G.i]; if(!l) return;
    if(G.listening){ try { micFinish(); } catch(e){} return; }
    const retry = !!G.res; G.res = null; G.listening = true; G.live = ""; render();
    const alts = await kuListen(null, t=>{ G.live = t; const el = document.querySelector(".ku-live"); if(el) el.textContent = t; });
    if(S.ku !== K) return; G.listening = false; if(!alts || !alts.length){ render(); return; }
    let j = kuJudge([l.de], alts); let ok = j.ok;
    if(!ok && aiReady() && (j.score||0) >= 0.45){ G.chk = true; render(); ok = (await kuAiEquiv(l.de, j.heard, {tr:l.tr})) === true; G.chk = false; if(S.ku !== K) return; }
    else if(!ok && !aiReady()) ok = (j.score||0) >= 0.92;
    if(ok && !retry) G.ok++;
    G.res = {ok, words:j.words}; sfx(ok ? "ok" : "no"); if(ok) addXP(2, "diyalog"); render(); if(!ok) say(l.de, "de"); },
  rpGo(){ rpStart(); },
  async rpMic(){ const K = S.ku, P = K.RP; if(!P) return;
    if(P.listening){ try { micFinish(); } catch(e){} return; }
    stopSpeech && stopSpeech(); P.speaking = false; P.listening = true; P.live = ""; render();
    const alts = await kuListen(null, t=>{ P.live = t; const el = document.querySelector(".ku-live"); if(el) el.textContent = t; });
    if(!S.ku || S.ku.RP !== P) return; P.listening = false; P.live = "";
    if(!alts || !alts.length){ render(); return; }
    await rpHeard(alts[0]); },
  rpTypeOn(){ S.ku.RP.typed = true; render(); setTimeout(()=>{ const el = $("#rpIn"); if(el) el.focus(); }, 50); },
  rpTypeOff(){ S.ku.RP.typed = false; render(); },
  rpSendTyped(){ const el = $("#rpIn"); const v = el ? el.value.trim() : ""; if(v) rpHeard(v); },
  rpEnd(){ const P = S.ku.RP; P.phase = "end"; if(P.corr.length) addMistakes(P.corr, "kurs-rol"); render(); }
});
function kuDlgAdvanceA(){
  const K = S.ku, G = K.G, L = K.u.dialog.lines;
  render();
  if(G.i < L.length && L[G.i].r !== "B"){ const l = L[G.i]; say(l.de, "de").then(()=>{ if(S.ku === K && K.G === G && G.i < L.length && L[G.i] === l){ G.i++; kuDlgAdvanceA(); } }); }
}
document.addEventListener("keydown", e => {
  if(e.key !== "Enter") return; const id = e.target && e.target.id;
  if(id === "kuIn"){ e.preventDefault(); ACT.kuCheckTyped(); }
  if(id === "rpIn"){ e.preventDefault(); ACT.rpSendTyped(); }
});
/* giriş noktaları: ana sayfa kartı, Öğren menüsü, Ne çalışalım? */
{
  const _rpK = renderPlan;
  renderPlan = function(){
    const h = _rpK.apply(this, arguments);
    try{
      if(!KURS.idx){ kursIndex().then(()=>{ if(S.view === "plan") render(); }); return h; }
      const st = kSt(); const L = kuList(); const m = kuMeta(st.cur) || L[0]; if(!m) return h;
      const doneN = L.filter(x=>kuDone(x.id)).length; const due = kuDueCount() + kuWordsDue().length;
      const u = KURS.units[m.id]; if(!u && m.ready !== false) kursUnit(m.id).then(()=>{ if(S.view === "plan") render(); }).catch(()=>{});
      const ns = u ? kuNodes(u) : []; const nd = (st.u[m.id] || {}).nd || {}; const nx = ns.find(x=>!nd[x.id]); const dn = ns.filter(x=>nd[x.id]).length;
      const card = `<section class="card ku-hero ku-home"><div class="row between"><div class="kicker">📚 Kursum · ${esc(m.lvl)} · Ünite ${L.indexOf(m) + 1}/${L.length}</div><button class="btn small" style="background:rgba(255,255,255,.2);color:#fff;border:0" data-act="kursOpen">Harita</button></div>
        <h2>${esc(m.title_tr)}</h2><div class="ku-de-t">${esc(m.title_de)}</div>
        ${ns.length ? `<div class="ku-dots">${ns.map(x=>`<i class="${nd[x.id] ? "on" : nx && x.id === nx.id ? "cur" : ""}" title="${esc(x.t)}">${nd[x.id] ? "" : x.ic}</i>`).join("")}</div>` : `<p class="small">${esc(m.goal_tr)}</p>`}
        ${m.ready === false ? `<div class="small">Bu ünite hazırlanıyor.</div>` : `<button class="btn primary block ku-go" data-act="kuStartId" data-id="${esc(m.id)}">${nx ? "▶ " + esc(nx.ic + " " + nx.t) : "▶ Üniteye devam"}</button>`}
        ${due ? `<button class="btn block" style="background:rgba(255,255,255,.18);color:#fff;border:0" data-act="kuReview">🔁 Kurs tekrarı · ${due} madde</button>` : ""}</section>`;
      const j = h.indexOf("</section>"); return j < 0 ? card + h : h.slice(0, j + 10) + card + h.slice(j + 10);
    }catch(e){ return h; }
  };
  VIEWS.plan = () => renderPlan();
  const _rlK = renderLernen;
  renderLernen = function(){
    const h = _rlK.apply(this, arguments);
    if(!h.includes('class="k-tiles"')) return h;
    const tile = `<button class="k-tile" style="--tc:#2563EB" data-act="kursOpen"><i aria-hidden="true">📚</i><b>Kurs A1 → B1</b><span>Hazır üniteler, sırayla</span></button>`;
    return h.replace('<section class="k-tiles">', '<section class="k-tiles">' + tile);
  };
  VIEWS.lernen = () => renderLernen();
}
