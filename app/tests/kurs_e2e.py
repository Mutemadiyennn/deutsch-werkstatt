"""Kurs uçtan uca: bir ünitenin bütün basamakları, sınav kapısı, sınav, sıradaki ünitenin açılması.
python3 tests/kurs_e2e.py [dark|light] [unit]"""
import asyncio, json, sys
from playwright.async_api import async_playwright
THEME = sys.argv[1] if len(sys.argv) > 1 else "dark"; UNIT = sys.argv[2] if len(sys.argv) > 2 else "a1-01"
SHOT = f"/tmp/e2e_{THEME}_"
async def answer_drills(pg, k, shots, wrong_at=-1):
  n = 0
  while True:
    st = await pg.evaluate("(()=>{const D=S.ku.D; if(D.finished) return {fin:true, ok:D.ok, n:D.items.length, mode:D.mode}; return {fin:false, it:kuCur(), mode:D.mode};})()")
    if st["fin"]: return st
    it = st["it"]; kind = it["k"]; wrong = n == wrong_at
    if shots and n < 2: await pg.screenshot(path=f"{SHOT}{k}_{n}_{kind}.png")
    if kind in ("gap", "pick", "listen"):
      if kind == "gap": v = [o for o in it["opts"] if o != it["ans"][0]][0] if wrong else it["ans"][0]
      else: v = str((it["ans"] + 1) % 3) if wrong else str(it["ans"])
      await pg.click(f'[data-act=kuPick][data-v="{v}"]')
    elif kind in ("say", "fix"):
      ans = "Keine Ahnung" if wrong else (it["de"] if kind == "say" else it["right"])
      await pg.evaluate(f"window.__heard = {json.dumps(ans)}; 0"); await pg.click("[data-act=kuMic]")
    elif kind == "order":
      await pg.evaluate("render()"); pool = await pg.evaluate("S.ku.D.pool"); used = set()
      toks = await pg.evaluate("kuOrderTokens(kuCur().de, S.ku.u).w")
      for w in toks:
        j = next(i for i, x in enumerate(pool) if x == w and i not in used); used.add(j); await pg.click(f'[data-act=kuChip][data-j="{j}"]')
      await pg.click("[data-act=kuOrderCheck]")
    await pg.wait_for_timeout(60)
    res = await pg.evaluate("S.ku.D.res")
    if st["mode"] != "speed":
      if res and not res["ok"] and not wrong: print("  !! beklenmeyen yanlış:", kind, it.get("de") or it.get("q_tr"), res.get("heard"))
      if shots and n < 2: await pg.screenshot(path=f"{SHOT}{k}_{n}_{kind}_res.png")
      if await pg.query_selector("[data-act=kuAdv]"): await pg.click("[data-act=kuAdv]")
    else:
      await pg.wait_for_timeout(450)
      if n >= 6: await pg.evaluate("S.ku.D.deadline = Date.now() - 1"); await pg.wait_for_timeout(400)
    n += 1
    if n > 120: print("  !! döngü"); return {}
PG=None
async def main():
  global PG
  async with async_playwright() as p:
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, device_scale_factor=2); pg = await ctx.new_page(); errs = []; PG = pg; pg.set_default_timeout(5000)
    pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.add_init_script("localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.add_init_script("setInterval(()=>document.querySelectorAll('.celebrate').forEach(x=>{ window.__celebr=(window.__celebr||0)+1; x.remove(); }), 50);")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    await pg.evaluate(f"""S.state.setupDone=true; S.state.theme='{THEME}'; window.__heard='';
      recognize = async (on)=>{{ if(on) on(window.__heard); await sleep(30); return [window.__heard]; }};
      window.__rpN=0; AI_OFF=false; AI = {{json: async (p)=>{{ await sleep(30);
        if(p.includes('Rollenspiel')){{ window.__rpN++; const n=window.__rpN; const tg=(S.ku.RP.targets||[]).length;
          if(n===1) return {{ok:false, right:'Ich heiße Can.', why_tr:'ich ile fiil -e alır.', hit:[], reply:''}};
          if(n<4) return {{ok:true, hit:[n-2], reply:'Aha! Und weiter?', reply_tr:'Öyle mi? Sonra?'}};
          return {{ok:true, hit:[...Array(tg).keys()], reply:'Auf Wiedersehen!', reply_tr:'Hoşça kal!', end:true}}; }}
        if(p.includes('Sein Text')) return {{corrected:'Ich heiße Can. Ich komme aus der Türkei.', mistakes:[{{wrong:'Ich heißt', right:'Ich heiße', why_tr:'ich ile -e.'}}], praise_tr:'Güzel bir başlangıç.'}};
        if(p.includes('strenger Deutschlehrer')) return {{ok:false}};
        return {{ok:true}}; }}}}; go('plan'); render(); 0""")
    await pg.wait_for_timeout(1200); await pg.screenshot(path=f"{SHOT}home.png")
    await pg.evaluate(f"kuOpenUnit('{UNIT}'); 0"); await pg.wait_for_timeout(800); await pg.screenshot(path=f"{SHOT}path0.png", full_page=True)
    nodes = await pg.evaluate(f"kuNodes(KURS.units['{UNIT}']).map(x=>x.id)")
    print("basamaklar:", nodes)
    for nid in nodes:
      await pg.evaluate(f"kuStartNode('{UNIT}', '{nid}'); 0"); await pg.wait_for_timeout(500)
      for guard in range(60):
        if not await pg.evaluate("!!(S.ku && S.ku.steps)"): break
        k = await pg.evaluate("kuStep().k"); first = guard < 3
        if k == "wintro":
          if first: await pg.screenshot(path=f"{SHOT}{nid}_wintro.png")
          while await pg.evaluate("S.ku && kuStep() && kuStep().k==='wintro'"): await pg.click("[data-act=kuWNext]"); await pg.wait_for_timeout(40)
        elif k in ("drills", "speed", "test"):
          st = await answer_drills(pg, nid + "_" + k, first, wrong_at=2 if (k == "drills" and nid == "g1") else -1)
          await pg.screenshot(path=f"{SHOT}{nid}_{k}_sum.png"); print(f"  {nid}/{k}: {st.get('ok')}/{st.get('n')}")
          if k == "test": break
          await pg.click("[data-act=kuNext]"); await pg.wait_for_timeout(150)
        elif k == "teach":
          if first: await pg.screenshot(path=f"{SHOT}{nid}_teach.png", full_page=True)
          if not await pg.query_selector("[data-act=kuNext]"):
            await pg.screenshot(path=f"{SHOT}DEBUG.png"); print("  !! kuNext yok:", await pg.evaluate("document.querySelector('#view').innerText.slice(0,300)"))
          await pg.click("[data-act=kuNext]"); await pg.wait_for_timeout(80)
        elif k == "dialog":
          await pg.click("[data-act=kuDlgRole]"); await pg.wait_for_timeout(200)
          for i in range(40):
            g = await pg.evaluate("(()=>{const G=S.ku.G, L=S.ku.u.dialog.lines; return {i:G.i, n:L.length, r:(L[G.i]||{}).r, de:(L[G.i]||{}).de}})()")
            if g["i"] >= g["n"]: break
            if g["r"] == "B": await pg.evaluate(f"window.__heard = {json.dumps(g['de'])}; 0"); await pg.click("[data-act=kuDlgMic]"); await pg.wait_for_timeout(80)
            await pg.click("[data-act=kuDlgNext]"); await pg.wait_for_timeout(60)
          await pg.screenshot(path=f"{SHOT}{nid}_dialog_end.png"); await pg.click("[data-act=kuNext]"); await pg.wait_for_timeout(100)
        elif k == "read":
          qs = await pg.evaluate("S.ku.u.read.qs")
          for qi, q in enumerate(qs): await pg.click(f'[data-act=kuReadAns][data-q="{qi}"][data-j="{q["ans"]}"]')
          await pg.screenshot(path=f"{SHOT}{nid}_read.png", full_page=True); await pg.click("[data-act=kuNext]"); await pg.wait_for_timeout(100)
        elif k == "match":
          await pg.screenshot(path=f"{SHOT}{nid}_match.png")
          for r in range(5):
            if await pg.evaluate("S.ku.M.r >= S.ku.M.rounds.length"): break
            m = await pg.evaluate("S.ku.M.rounds[S.ku.M.r].length")
            if r == 0: await pg.click('[data-act=kuMatchTap][data-id="L0"]'); await pg.click('[data-act=kuMatchTap][data-id="R1"]'); await pg.wait_for_timeout(700)
            for i in range(m): await pg.click(f'[data-act=kuMatchTap][data-id="L{i}"]'); await pg.click(f'[data-act=kuMatchTap][data-id="R{i}"]'); await pg.wait_for_timeout(30)
          await pg.screenshot(path=f"{SHOT}{nid}_match_end.png"); await pg.click("[data-act=kuNext]"); await pg.wait_for_timeout(150)
        elif k == "write":
          await pg.fill("#kuWr", "Ich heißt Can. Ich komme aus der Türkei."); await pg.click("[data-act=kuWrCheck]"); await pg.wait_for_timeout(300)
          await pg.screenshot(path=f"{SHOT}{nid}_write.png", full_page=True); await pg.click("[data-act=kuNext]"); await pg.wait_for_timeout(100)
        elif k == "role":
          await pg.click("[data-act=rpGo]"); await pg.wait_for_timeout(200)
          for utt in ["Ich heißt Can.", "Ich heiße Can.", "Ich komme aus der Türkei.", "Ich wohne hier.", "Auf Wiedersehen!"]:
            if await pg.evaluate("S.ku.RP.phase") == "end": break
            await pg.evaluate(f"window.__heard = {json.dumps(utt)}; S.ku.RP.speaking=false; render(); 0"); await pg.click("[data-act=rpMic]"); await pg.wait_for_timeout(250)
          await pg.screenshot(path=f"{SHOT}{nid}_role.png", full_page=True)
          print("  rol:", await pg.evaluate("S.ku.RP.phase"), await pg.evaluate("S.ku.RP.targets.map(t=>t.done).join(',')"))
          await pg.click("[data-act=kuNext]"); await pg.wait_for_timeout(150)
        elif k == "gate":
          await pg.screenshot(path=f"{SHOT}gate1.png")
          print("  kapı: hazır kelime", await pg.evaluate("(S.ku.u.words||[]).filter(w=>kuWLearned(S.ku.u,w)).length"), "/", await pg.evaluate("S.ku.u.words.length"))
          # 3 saat geçmiş gibi yap → ikinci tur
          await pg.evaluate("Object.values(kSt().w).forEach(r=>{ if(r.last) r.last -= 4*3600*1000; }); render(); 0"); await pg.wait_for_timeout(100)
          if await pg.query_selector("[data-act=kuGateDrill]"):
            await pg.click("[data-act=kuGateDrill]"); await pg.wait_for_timeout(200)
            st = await answer_drills(pg, "gate", False); print("  pekiştirme:", st.get("ok"), "/", st.get("n")); await pg.click("[data-act=kuNext]"); await pg.wait_for_timeout(150)
          await pg.screenshot(path=f"{SHOT}gate2.png")
          await pg.click("[data-act=kuTestGo]"); await pg.wait_for_timeout(200)
        else: print("  ?? adım", k); break
      await pg.wait_for_timeout(200)
      if nid != "ex": await pg.screenshot(path=f"{SHOT}path_after_{nid}.png")
    print("ünite:", await pg.evaluate(f"JSON.stringify(kSt().u['{UNIT}'])"), "cur:", await pg.evaluate("kSt().cur"))
    await pg.screenshot(path=f"{SHOT}test_end.png")
    await pg.evaluate("S.ku=null; S.kuU=null; go('kurs'); render(); 0"); await pg.wait_for_timeout(300); await pg.screenshot(path=f"{SHOT}map.png", full_page=True)
    await pg.evaluate("go('plan'); render(); 0"); await pg.wait_for_timeout(800); await pg.screenshot(path=f"{SHOT}home2.png")
    print("scrollWidth", await pg.evaluate("document.documentElement.scrollWidth"))
    print("HATALAR:", errs[:8] or "yok")
async def safe():
  try: await main()
  except Exception as e:
    print("TEST HATASI:", str(e).split("\n")[0]); import traceback; traceback.print_exc(limit=3)
    try:
      await PG.screenshot(path="/tmp/e2e_FAIL.png"); print("STATE:", await PG.evaluate("JSON.stringify({step: S.ku && kuStep(), si: S.ku && S.ku.si, node: S.ku && S.ku.node && S.ku.node.id})")[:400]); print(await PG.evaluate("document.querySelector('#view').innerText.slice(0,300)"))
    except Exception as e2: print(e2)
asyncio.run(safe())
