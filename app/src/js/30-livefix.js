
/* ===== Canlı sohbet: gerçek düzeltme. Sesli model talimatı unutabildiği için her cümleni ayrı bir metin modeli kontrol eder;
   hata varsa ekranda kart çıkar ve (ayara göre) partnere "şimdi düzelt" notu gönderilir, o da sesli düzeltip tekrar ettirir. ===== */
function liveFixEl(){ let el = document.getElementById("lvFix"); const st = document.querySelector(".lvstage"); if(!st) return null; if(!el){ el = document.createElement("div"); el.id = "lvFix"; el.className = "lvfix"; st.insertBefore(el, st.querySelector(".lvfoot")); } return el; }
function liveFixShow(L){ const el = liveFixEl(); if(!el) return; const f = (L.fixes||[]).slice(-1)[0]; if(!f){ el.innerHTML = ""; return; }
  el.innerHTML = `<div class="lvfix-c"><div class="small"><s>${esc(f.wrong)}</s></div><div class="lvfix-r"><b>✓ ${esc(f.right)}</b><button class="k-say" data-act="sayDe" data-t="${esc(f.right)}" aria-label="Dinle">🔊</button></div>${f.why ? `<div class="small">${esc(f.why)}</div>` : ""}</div>`; el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); }
async function liveCheck(L, text){
  try{
    if(!L || !text || !aiReady() || !liveIsDe(text) || ntok(text).length < 3) return;
    L.chk = (L.chk || 0) + 1; if(L.chk > 2){ L.chk--; return; }
    const prev = ((L.turns.filter(t=>t.who === "m").slice(-1)[0]) || {}).t || "";
    const prompt = `Ein türkischer Deutschlerner (Niveau A1-A2) hat in einem Gespräch gesagt (Spracherkennung, Satzzeichen und Großschreibung fehlen evtl.): „${text}“
Letzte Äußerung des Gesprächspartners davor: „${prev}“
Prüfe nur ECHTE Fehler (Verbform, Wortstellung, Artikel/Fall, falsches oder englisches/türkisches Wort, Satzbau). Ignoriere Satzzeichen, Groß/Klein, Füllwörter und offensichtliche Hörfehler der Spracherkennung. Umgangssprache ist erlaubt.
Antworte NUR mit JSON: {"ok":true,"right":"","why_tr":"","major":false}
- ok=false nur bei echtem Fehler; dann "right" = sein Satz korrigiert, so nah wie möglich am Original; "why_tr" = Grund auf Türkisch, max. 10 Wörter, fehlerfreies Türkisch; "major" = true bei Verbform, Verbposition, Artikel/Fall oder falschem Wort.`;
    const r = await Promise.race([AI.json(prompt, {modelTier:"quick"}), sleep(15000).then(()=>null)]);
    L.chk--;
    if(!r || r.ok !== false || !r.right || S.live !== L) return;
    if(kuNorm(r.right) === kuNorm(text)) return;
    const f = {wrong:text, right:String(r.right), why:String(r.why_tr||""), major:!!r.major};
    (L.fixes = L.fixes || []).push(f); liveFixShow(L); try { sfx("no"); } catch(e){}
    const mode = liveCorr();
    if(mode === "light" || (mode === "normal" && !f.major)) return;
    /* partner konuşuyorsa sözünü bitirmesini bekle, sonra düzeltme notunu gönder */
    for(let k = 0; k < 40 && S.live === L && L.speaking === "model"; k++) await sleep(250);
    if(S.live !== L || L.phase !== "live" || !L.ws) return;
    L.ws.send(JSON.stringify({realtimeInput:{text:`(Hinweis vom Lernsystem, NICHT vorlesen: Der Lerner hat gerade gesagt: „${f.wrong}“. Richtig ist: „${f.right}“. Sag ihm jetzt ZUERST kurz und freundlich: „Kleine Korrektur: ${f.right}“, bitte ihn, den Satz einmal zu wiederholen, warte auf seine Wiederholung, lob kurz und mach dann ganz normal mit dem Gespräch weiter.)`}}));
  }catch(e){ if(L) L.chk = Math.max(0, (L.chk||1) - 1); }
}
{
  const _lv = renderLive;
  renderLive = function(){
    let h = _lv.apply(this, arguments); const L = S.live;
    if(L && L.phase === "live") setTimeout(()=>liveFixShow(L), 0);
    if(L && ["done","fb"].includes(L.phase) && (L.fixes||[]).length && !L._fixSaved){ L._fixSaved = true; addMistakes(L.fixes.map(f=>({wrong:f.wrong, right:f.right, rule_tr:f.why, topic:"Sonstiges"})), "canlı"); }
    if(L && (L.fixes||[]).length && /dk canlı konuştun/.test(h)){
      const box = `<h3>Sohbet sırasında düzeltilenler</h3><div class="stack">${L.fixes.slice(0, 8).map(f=>`<div class="ex"><s class="small">${esc(f.wrong)}</s><div class="row between" style="flex-wrap:nowrap"><b class="de">${esc(f.right)}</b><button class="btn small ghost" data-act="sayDe" data-t="${esc(f.right)}" aria-label="Dinle">🔊</button></div>${f.why ? `<div class="tr">${esc(f.why)}</div>` : ""}</div>`).join("")}</div>`;
      if(h.includes("<h3>Böyle de diyebilirdin</h3>")) h = h.replace("<h3>Böyle de diyebilirdin</h3>", box + "<h3>Böyle de diyebilirdin</h3>");
      else { const i = h.indexOf("<details"); h = i > 0 ? h.slice(0, i) + box + h.slice(i) : h.replace(/<\/section>\s*$/, box + "</section>"); }
    }
    return h;
  };
  VIEWS.canli = () => renderLive();
}
