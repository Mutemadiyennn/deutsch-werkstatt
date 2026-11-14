import asyncio, json, sys, random
sys.path.insert(0,'/tmp'); from mockai import fill
from playwright.async_api import async_playwright
random.seed(int(sys.argv[1]) if len(sys.argv)>1 else 1)
STEPS = int(sys.argv[2]) if len(sys.argv)>2 else 120
SKIP = {"resetAll","wipeAll","logout","syOut","delAll","clearAll","diagClear","importData","importAll","backupCopy","syDelete","gateOut","kbdNext"}
PREF = ["Devam","Sıradaki","Başla","Kontrol","Bitir","Anladım","Tamam","Sonraki","İleri","Next","Doğru","Biliyorum","Öğrendim"]
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch()
    ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, has_touch=True)
    pg = await ctx.new_page(); errs=[]; nai=[0]
    pg.on("pageerror", lambda e: errs.append(str(e)[:220]))
    async def gem(route):
      if "/models" in route.request.url and route.request.method=="GET":
        await route.fulfill(json={"models":[{"name":"models/gemini-3.5-flash","supportedGenerationMethods":["generateContent"]}]}); return
      body = route.request.post_data or ""
      try: t = "".join(x.get("text","") for c in json.loads(body).get("contents",[]) for x in c.get("parts",[]))
      except Exception: t = ""
      nai[0]+=1
      await route.fulfill(json={"candidates":[{"content":{"parts":[{"text":json.dumps(fill(t))}]}}]})
    await pg.route("**/generativelanguage.googleapis.com/**", gem)
    await pg.route("**/texttospeech.googleapis.com/**", lambda r: r.fulfill(status=500, body="x"))
    await pg.add_init_script("localStorage.setItem('dw-gemini','AIzaTESTKEYxxxxxxxxxxxxxxxxxxxxxxxxxxx'); localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()})); window.alert=()=>{}; window.confirm=()=>true; window.prompt=()=>null;")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(2500)
    await pg.evaluate("S.state.setupDone = true; say = async()=>true; sayMixed = async()=>true; 0")
    await pg.evaluate("go('plan'); render(); 0"); await pg.wait_for_timeout(400)
    seen = {}; trail=[]; problems=[]
    for step in range(STEPS):
      st = await pg.evaluate("""()=>{ const v=document.querySelector('#view'); return {view:S.view, sig:(S.view+'|'+(v?v.innerText:'').slice(0,160)), sw:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth, bad:((v?v.innerText:'').match(/undefined|NaN|\\[object Object\\]/g)||[]).slice(0,2)} }""")
      if st['sw']>st['cw']+1: problems.append(("taşma", st['view'], st['sw']))
      if st['bad']: problems.append(("metin", st['view'], st['bad'], trail[-3:]))
      seen[st['sig']] = seen.get(st['sig'],0)+1
      if seen[st['sig']] > 6:
        problems.append(("takıldı", st['view'], st['sig'][:120], trail[-4:])); seen[st['sig']] = 0
        await pg.evaluate("S.sess=null; S.ku=null; S.kuU=null; S.kaud=null; S.ex=null; S.voc=null; S.denk=null; go('plan'); render(); 0"); await pg.wait_for_timeout(300); continue
      btns = await pg.evaluate("""()=>[...document.querySelectorAll('[data-act]')].filter(e=>{ const r=e.getBoundingClientRect(); return r.width>0 && r.height>0 && !e.disabled && e.tagName!=='INPUT' && e.tagName!=='SELECT'; }).map((e,i)=>({i, act:e.dataset.act, t:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,30)}))""")
      btns = [x for x in btns if x['act'] not in SKIP]
      if not btns:
        await pg.evaluate("go('plan'); render(); 0"); await pg.wait_for_timeout(300); continue
      # fill inputs if present
      await pg.evaluate("""()=>{ for(const i of document.querySelectorAll('#view input[type=text], #view textarea, #view input:not([type])')){ if(!i.value) { i.value='Ich gehe heute einkaufen.'; i.dispatchEvent(new Event('input',{bubbles:true})); } } }""")
      snd = lambda a: a.lower().startswith('say') or a.lower().startswith('ksay') or 'listen' in a.lower() or a in ('tts','play','neuPlay')
      if random.random() > 0.05: btns = [x for x in btns if not snd(x['act'])] or btns
      pref = [x for x in btns if any(x['t'].startswith(p) for p in PREF)]
      x = random.choice(pref) if pref and random.random()<0.65 else random.choice(btns)
      trail.append(f"{st['view']}:{x['act']}:{x['t']}")
      e0=len(errs)
      try:
        await pg.evaluate("i=>{ const el=[...document.querySelectorAll('[data-act]')].filter(e=>{ const r=e.getBoundingClientRect(); return r.width>0 && r.height>0 && !e.disabled && e.tagName!=='INPUT' && e.tagName!=='SELECT'; })[i]; el && el.click(); }", x['i'])
      except Exception as e: problems.append(("tık", str(e)[:80]))
      await pg.wait_for_timeout(500)
      if len(errs)>e0: problems.append(("HATA", trail[-1], errs[e0:]))
    print("steps",STEPS,"ai calls",nai[0],"views visited", len({s.split('|')[0] for s in seen}))
    for pr in problems: print(pr)
    await b.close()
asyncio.run(main())
