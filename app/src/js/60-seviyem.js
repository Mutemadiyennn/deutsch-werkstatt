/* ================= Seviyem: kurs verisiyle (QA2 P0) =================
   Eski "hazırlık yüzdesi", gramer yolu ve basamak kartları kursla çelişiyordu.
   Bu ekran artık kursun gerçek verisini gösterir: ünite ilerlemesi, kalıcı kelimeler,
   zayıf kurallar (tek dokunuşla tekrar), B1 tempo hesabı ve kurs verisiyle öğretmen raporu.
   Aylık ölçüm, deneme sınavı, rozetler, 14 gün, telaffuz, ses ve ayarlar aynen korunur. */
function svKurs(){
  const st = kSt(); const L = kuList(); const t = dayKey();
  const done = L.filter(x=>kuDone(x.id));
  const cur = kuMeta(st.cur) || L.find(x=>!kuDone(x.id)) || L[0] || {};
  const W = Object.values(st.w || {});
  const perm = W.filter(r=>(r.c||0) >= 2).length, learning = W.filter(r=>(r.c||0) === 1).length;
  const totalW = L.reduce((a, x)=>a + (x.nw || 0), 0);
  const dueW = kuWordsDue().length, dueR = kuDueCount();
  /* tempo: son 28 günde biten üniteler */
  const since = addDays(t, -28); const recent = done.filter(x=>((st.u[x.id]||{}).fin || "") >= since).length;
  const firstStart = Object.values(st.u).map(r=>r.start).filter(Boolean).sort()[0];
  const activeDays = firstStart ? Math.max(1, Math.min(28, Math.round((new Date(t) - new Date(firstStart)) / 86400000) + 1)) : 0;
  const perWeek = activeDays ? recent / activeDays * 7 : 0;
  const left = L.length - done.length; const dx = daysToExam();
  const needWeek = dx && dx > 0 ? left / (dx / 7) : null;
  /* zayıf kurallar: şu an yanlışta duran maddeler, kural bazında */
  const G = {};
  for(const [id, r] of Object.entries(st.it || {})){ if(!r.t) continue; const g = G[r.t] || (G[r.t] = {key:r.t, bad:0, w:0, n:0}); g.n++; g.w += r.w || 0; if(!r.b && r.w) g.bad++; }
  const weak = Object.values(G).filter(g=>g.bad || g.w >= 3).sort((a, b)=>(b.bad - a.bad) || (b.w - a.w)).slice(0, 6);
  return {st, L, done, cur, perm, learning, totalW, dueW, dueR, perWeek, left, dx, needWeek, weak};
}
function svRuleName(key){
  const [uid, tid] = key.split(":"); const u = KURS.units[uid];
  if(!u){ kursUnit(uid).then(()=>{ if(S.view === "seviye") render(); }).catch(()=>{}); return {t:"…", u:uid}; }
  const tc = (u.teach || []).find(x=>x.id === tid); return {t: tc ? tc.h_tr : tid, u: u.title_tr};
}
function svHero(K){
  const pct = K.L.length ? Math.round(K.done.length / K.L.length * 100) : 0;
  const pace = K.perWeek ? `Son 4 haftadaki hızın: haftada <b>${K.perWeek.toFixed(1).replace(".", ",")}</b> ünite.` : "Henüz biten ünite yok; ilk ünite bitince hızını hesaplayacağım.";
  const need = K.needWeek === null ? "" : K.left ? ` B1 sınavına (${K.dx} gün) yetişmek için haftada <b>${K.needWeek.toFixed(1).replace(".", ",")}</b> ünite gerekiyor${K.perWeek ? (K.perWeek >= K.needWeek ? " — <b>tempon yetiyor</b> 👍" : " — <b>biraz hızlanmalısın</b>") : ""}.` : " Bütün üniteler bitti, sınava hazırsın.";
  return `<section class="card svhero">
    <div class="kicker">Seviyem · ${esc(kuFmtDay(dayKey()))}</div>
    <div class="big">${esc(K.cur.lvl || "A1")} · ${esc(K.cur.title_tr || "")}</div>
    <div class="progress" aria-hidden="true"><i style="width:${pct}%"></i></div>
    <div class="statrow"><div><b>${K.done.length}/${K.L.length}</b><span>ünite</span></div><div><b>${K.perm}</b><span>kalıcı kelime</span></div><div><b>${K.learning}</b><span>öğreniliyor</span></div><div><b>${K.dueW + K.dueR}</b><span>bugün tekrar</span></div></div>
    <p class="small">${pace}${need}</p>
    ${K.dueW + K.dueR ? `<button class="btn primary block" data-act="kuReview">Tekrarları şimdi yap (${K.dueW + K.dueR})</button>` : ""}
  </section>`;
}
function svUnits(K){
  if(!K.done.length) return `<section class="card svc sv-blue"><h3><span class="svi" aria-hidden="true">📘</span>Ünite sonuçları</h3><p class="small muted">Ünite sınavlarını geçtikçe sonuçların burada listelenir. Geçme sınırı %80.</p></section>`;
  return `<section class="card svc sv-blue"><h3><span class="svi" aria-hidden="true">📘</span>Ünite sonuçları</h3><div class="list">${K.done.slice().reverse().map(x=>{ const r = K.st.u[x.id] || {};
    return `<div class="li"><div class="main"><div class="row between"><b>${esc(x.title_tr)}</b><span class="chip ${r.best >= 90 ? "good" : ""}">%${r.best || 0}</span></div><div class="small muted">${esc(x.lvl)} · ${r.fin ? kuFmtDay(r.fin) : ""}${r.tests > 1 ? " · " + r.tests + " deneme" : ""}</div></div></div>`; }).join("")}</div></section>`;
}
function svWeak(K){
  const body = K.weak.length ? `<div class="list">${K.weak.map(g=>{ const nm = svRuleName(g.key);
      return `<div class="li"><div class="main"><b>${esc(nm.t)}</b><div class="small muted">${esc(nm.u)} · ${g.bad ? g.bad + " cümle hâlâ yanlışta" : g.w + " kez yanlış yapıldı"}</div></div><button class="btn small" data-act="svRule" data-k="${esc(g.key)}">Tekrar et</button></div>`; }).join("")}</div>`
    : `<p class="small muted">Şu an takıldığın bir kural yok. Bir kuralda tekrar tekrar yanlış yaparsan burada çıkar; tek dokunuşla o kurala özel alıştırma açılır.</p>`;
  return `<section class="card svc sv-orange"><h3><span class="svi" aria-hidden="true">🎯</span>Zayıf kurallar</h3>${body}</section>`;
}
function svWords(K){
  const tot = K.totalW ? ` / ${K.totalW}` : "";
  return `<section class="card svc sv-green"><h3><span class="svi" aria-hidden="true">🧠</span>Kelimeler</h3>
    <div class="grid2"><div><div class="big">${K.perm}${tot}</div><div class="small muted">kalıcı (iki ayrı oturumda kendin söyledin)</div></div><div><div class="big">${K.learning}</div><div class="small muted">öğreniliyor</div></div></div>
    <p class="small muted">Sınav listeleri yaklaşık: A1 ≈ 650, A2 ≈ 1.300, B1 ≈ 2.400 kelime (birikimli). Kurs, ek kelimelerle (Kelime+) bu hedeflere göre ilerler.${K.dueW ? ` Bugün tekrarı gelen kelime: <b>${K.dueW}</b>.` : ""}</p></section>`;
}
function svReport(){
  const rep = S.state.report;
  return `<section class="card svc sv-pink">
    <div class="row between"><h3><span class="svi" aria-hidden="true">🧑‍🏫</span>Öğretmen raporu</h3>${rep && rep.date ? `<span class="small muted">${esc(kuFmtDay(rep.date))}</span>` : ""}</div>
    ${S.repBusy ? `<div class="thinking"><span class="spin" aria-hidden="true"></span><span>Kurs verilerin okunuyor… (genelde 15–40 sn)</span></div><button class="btn small" data-act="stopAI">Durdur</button>` : ""}
    ${S.repErr ? `<div class="fb no">${esc(S.repErr)}</div>` : ""}
    ${rep && !S.repBusy ? `<p><b>${esc(rep.level_tr || "")}</b></p><p class="clamp4">${esc(rep.summary_tr || "")}</p>
      <details class="more3"><summary>Raporun tamamı</summary><div class="stack" style="margin-top:10px"><p>${esc(rep.summary_tr || "")}</p>
      ${(rep.strengths || []).length ? `<h3>Güçlü yanların</h3><ul class="rule">${rep.strengths.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      ${(rep.patterns || []).length ? `<h3>Tekrar eden hataların ve nedeni</h3><div class="stack">${rep.patterns.map(p=>`<div class="ex"><b>${esc(p.title_tr)}</b><div class="small">${esc(p.explain_tr)}</div>${p.example_wrong ? `<div><span class="strike">${esc(p.example_wrong)}</span> → <span class="fixed">${esc(p.example_right)}</span></div>` : ""}</div>`).join("")}</div>` : ""}
      ${(rep.focus_tr || []).length ? `<h3>Bu hafta odak</h3><ol class="rule">${rep.focus_tr.map(x=>`<li>${esc(x)}</li>`).join("")}</ol>` : ""}
      ${rep.b1_tr ? `<h3>B1'e mesafe</h3><p>${esc(rep.b1_tr)}</p>` : ""}</div></details>` : ""}
    ${!rep && !S.repBusy ? `<p class="small muted">Kurs sonuçlarına, zayıf kurallarına, kelimelerine ve hata defterine bakıp dürüst bir değerlendirme yazarım.</p>` : ""}
    ${S.repBusy ? "" : `<button class="btn ${rep ? "" : "primary"}" data-act="reportGen" ${aiReady() ? "" : "disabled"}>${rep ? "Raporu güncelle" : (S.repErr ? "Tekrar dene" : "Raporumu hazırla")}</button>`}
  </section>`;
}
/* eski çıktıdan korunan kartlar (başlığına göre) */
const SV_KEEP = ["Aylık ölçüm", "Dış ölçüm", "Rozetler", "Son 14 gün", "Telaffuz", "Ses", "Ayarlar", "Kontrol zamanı"];
const SV_DROP = ["svhero", "Gramer yolu", "Basamağın", "Öğretmen raporu", "Konu konu", "Kelimeler", "Önce bunu sağlamlaştıralım"];
{
  const _rsOld = renderSeviye;
  renderSeviye = function(){
    if(!KURS.idx){ kursIndex().then(()=>{ if(S.view === "seviye") render(); }).catch(()=>{}); return thinkingCard("Kurs verilerin yükleniyor…"); }
    let old = ""; try{ old = _rsOld(); }catch(e){ old = ""; }
    const parts = old.split(/(?=<section\b)/).filter(p=>p.startsWith("<section"));
    const title = p => (p.replace(/<span class="svi"[^>]*>[^<]*<\/span>/g, "").match(/<(?:h3|div class="kicker"|summary)[^>]*>([^<]+)/) || [, ""])[1].trim();
    const keep = {}; for(const p of parts){ if(/svhero/.test(p.slice(0, 80))) continue; const t = title(p); if(SV_DROP.some(k=>t.startsWith(k))) continue; const k = SV_KEEP.find(k=>t.startsWith(k)); if(k) (keep[k] = keep[k] || []).push(p); else if(/data-act="checkStart"|renderVoice|id="themeSel"/.test(p)) (keep._x = keep._x || []).push(p); }
    const K = svKurs(); const g = k => (keep[k] || []).join("");
    return svHero(K) + svWeak(K) + svWords(K) + svUnits(K) + svReport() + g("Kontrol zamanı") + g("Aylık ölçüm") + g("Dış ölçüm") + g("Rozetler") + g("Son 14 gün") + g("Telaffuz") + g("Ses") + (keep._x || []).join("") + g("Ayarlar");
  };
  VIEWS.seviye = () => renderSeviye();
}
/* öğretmen raporu: kurs verisiyle */
reportGen = async function(){
  S.repBusy = true; S.repErr = ""; render();
  const K = svKurs();
  const units = K.done.map(x=>({einheit:x.title_de, niveau:x.lvl, test_prozent:(K.st.u[x.id]||{}).best || 0, versuche:(K.st.u[x.id]||{}).tests || 1}));
  const weak = K.weak.map(g=>{ const nm = svRuleName(g.key); return {regel:nm.t, einheit:nm.u, noch_falsch:g.bad, fehler_gesamt:g.w}; });
  const mist = (S.mistakes || []).filter(m=>!m.mastered).sort((a, b)=>(b.count||1) - (a.count||1)).slice(0, 15).map(m=>({falsch:m.wrong, richtig:m.right, mal:m.count||1}));
  const days = Object.entries(S.state.days || {}).sort().slice(-14).map(([d, x])=>[d, (x && x.n) || 0]);
  try{
    const r = await askJSON(`Du bist ein erfahrener, ehrlicher Deutschlehrer. ${profile()}
KURSDATEN DES LERNERS (echte Daten, nichts erfinden):
Aktuelle Einheit: ${K.cur.lvl} "${K.cur.title_de || ""}". Bestandene Einheiten (${K.done.length}/${K.L.length}): ${JSON.stringify(units)}
Schwache Grammatikregeln: ${JSON.stringify(weak)}
Wörter: ${K.perm} dauerhaft gelernt, ${K.learning} im Lernen, ${K.dueW} heute fällig.
Tempo: ${K.perWeek.toFixed(1)} Einheiten/Woche; nötig bis zur B1-Prüfung: ${K.needWeek === null ? "unbekannt" : K.needWeek.toFixed(1)} Einheiten/Woche (${K.dx} Tage).
Offene Fehler: ${JSON.stringify(mist)}
Aktive Tage (Datum, Aktivitäten): ${JSON.stringify(days)}
AUFGABE: Schreib einen ehrlichen, motivierenden Lernbericht auf Türkisch, passend zu seinem Niveau. Erkläre bei wiederkehrenden Fehlern WARUM er sie macht (oft türkische Satzlogik oder englische Gewohnheiten). Wenn es noch wenige Daten gibt, sag das ehrlich und gib trotzdem 3 konkrete Schritte.
Antworte NUR mit JSON: {"level_tr":"1 Satz: wo steht er realistisch","summary_tr":"3-4 Sätze","strengths":["…"],"patterns":[{"title_tr":"…","explain_tr":"warum und wie man richtig denkt","example_wrong":"…","example_right":"…"}],"focus_tr":["3 konkrete Fokuspunkte für diese Woche"],"b1_tr":"2 Sätze: Abstand zu B1 und Tempo"}
Max 3 patterns.`);
    S.state.report = {...r, date: dayKey()}; Store.saveState();
  }catch(err){ S.repErr = (err && err.name === "AbortError") ? "Durduruldu." : aiMsg(err); }
  S.repBusy = false; render();
};
ACT.svRule = async function(el){
  const key = el && el.dataset ? el.dataset.k : ""; const [uid, tid] = String(key).split(":"); if(!uid) return;
  stopAll && stopAll(); S.ku = {busy:true}; go("kurs"); render();
  try{ const u = await kursUnit(uid); const tc = (u.teach || []).find(x=>x.id === tid);
    const items = shuffle(kuTag(u, u.drills, "d").filter(x=>x.t === tid)).slice(0, 10);
    if(!items.length) throw 0;
    S.ku = {review:true, u:{title_tr:"Zayıf kural · " + (tc ? tc.h_tr : "")}, D: kuDrillRun(items, "review", tc ? tc.h_tr : "")};
    render(); setTimeout(()=>kuAuto(), 250);
  }catch(e){ S.ku = null; toast("Bu kuralın alıştırması açılamadı."); go("seviye"); render(); }
};
