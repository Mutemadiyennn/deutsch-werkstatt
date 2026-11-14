import asyncio, json, sys, re
sys.path.insert(0,'/tmp'); from mockai import fill
from playwright.async_api import async_playwright
# iPhone benzeri: üstte 59px, altta 34px güvenli alan
src = open('/home/claude/werkstatt/index.html').read()
src = src.replace('env(safe-area-inset-top)','59px').replace('env(safe-area-inset-bottom)','34px')
open('/home/claude/werkstatt/_sa.html','w').write(src)
JS = """()=>{ const bad=[]; for(const e of document.querySelectorAll('body *')){ const cs=getComputedStyle(e); if(cs.visibility==='hidden'||cs.display==='none') continue; const r=e.getBoundingClientRect(); if(r.width<4||r.height<4) continue; if(r.bottom<=0) continue; if(r.top < 55 && r.bottom > 4 && (e.matches('button,a,.chip,.lcount,.lprog,h1,h2,h3,p,span,b') ) && !e.closest('#micPill,.toast')){ bad.push((e.className||e.tagName).toString().slice(0,30)+'@'+Math.round(r.top)); } } return [...new Set(bad)].slice(0,6); }"""
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, has_touch=True)
    pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)[:150]))
    async def gem(route):
      body = route.request.post_data or ""
      try: t = "".join(x.get("text","") for c in json.loads(body).get("contents",[]) for x in c.get("parts",[]))
      except Exception: t = ""
      await route.fulfill(json={"candidates":[{"content":{"parts":[{"text":json.dumps(fill(t))}]}}]})
    await pg.route("**/generativelanguage.googleapis.com/**", gem)
    await pg.add_init_script("localStorage.setItem('dw-gemini','AIzaTESTKEYxxxxxxxxxxxxxxxxxxxxxxxxxxx'); localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.goto("http://localhost:8765/_sa.html"); await pg.wait_for_timeout(1800)
    await pg.evaluate("S.state.setupDone=true; say=async()=>true; sayMixed=async()=>true; (async()=>{ for(const x of coreNext(8)) await Store.put('words', coreWord(x, {sents:[{de:'Wo ist die Bäckerei?', answer:'Wo', tr:'Fırın nerede?'}]})); })(); 0"); await pg.wait_for_timeout(600)
    res = {}
    for sess in (False, True):
      for v in await pg.evaluate("Object.keys(VIEWS)"):
        await pg.evaluate(f"S.voc=null; S.ex=null; S.denk=null; S.cscan=null; S.kaud=null; S.sess = {'{ctx:\"desk\", sec:600, i:0, list:[], done:[], hist:[]}' if sess else 'null'}; go('{v}'); render(); 0"); await pg.wait_for_timeout(120)
        bad = await pg.evaluate(JS)
        if bad: res[f"{'S' if sess else '-'} {v}"] = bad
      for name, js in [("kurs-path","S.ku=null; kuOpenUnit('a1-01')"), ("kurs-w1","kuStartNode('a1-01','w1')"), ("kurs-g1","kuStartNode('a1-01','g1')"), ("kurs-rp","kuStartNode('a1-01','rp')"), ("kurs-aud","kuAudioStart()"), ("kelime", "go('kelime'); startVocab()"), ("denk","startDenk(false)"), ("ex","startExercise('T',[{kind:'choice',prompt:'Ich ___ müde.',options:['bin','bist'],answer:'bin',tr:'Yorgunum.'}],'lesson','lernen')"), ("c1500","ACT.cScan()")]:
        await pg.evaluate(f"S.voc=null; S.ex=null; S.denk=null; S.cscan=null; S.kaud=null; S.sess = {'{ctx:\"desk\", sec:600, i:0, list:[], done:[], hist:[]}' if sess else 'null'}; {js}; 0"); await pg.wait_for_timeout(1300)
        bad = await pg.evaluate(JS)
        await pg.screenshot(path=f"/tmp/sa_{'S' if sess else 'N'}_{name}.png")
        if bad: res[f"{'S' if sess else '-'} {name}"] = bad
    for k,v in res.items(): print(k, v)
    print("errors", errs[:5])
asyncio.run(main())
