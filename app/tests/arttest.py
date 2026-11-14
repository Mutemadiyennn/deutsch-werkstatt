import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True); pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.add_init_script("localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    await pg.evaluate("S.state.setupDone=true; S.state.theme='light'; say=async()=>true; S.state.srOK=true; (async()=>{ await Store.put('words', {id:'wplan', de:'Plan', artikel:'der', plural:'Pläne', tr:'plan', kind:'nomen', box:2, reps:2, ivl:2, due:'2026-01-01', intro:'2026-11-01', right:1, wrong:0, sents:[{de:'Was ist der Plan für das Wochenende?', answer:'der Plan', tr:'Hafta sonu için plan nedir?'}]}); })(); 0"); await pg.wait_for_timeout(500)
    for heard, label in [("Was ist Plan für das Wochenende","artikel yok"),("Was ist die Plan für das Wochenende","yanlış artikel"),("Was ist der Plan für das Wochenende","doğru")]:
      await pg.evaluate(f"recognize = async()=>[{repr(heard)}]; useSR = ()=>true; go('kelime'); S.voc=null; startVocab(); 0"); await pg.wait_for_timeout(900)
      await pg.evaluate("S.voc.mode='mic'; S.voc.res=null; S.voc.artAsk=null; render(); 0")
      await pg.evaluate("ACT.vMic(); 0"); await pg.wait_for_timeout(500)
      st = await pg.evaluate("({ask: !!(S.voc && S.voc.artAsk), res: S.voc && S.voc.res && (S.voc.res.ok ? 'ok' : S.voc.res.close ? 'close':'no')})")
      print(label, st)
      if st['ask']:
        await pg.screenshot(path="/tmp/art_ask.png")
        await pg.click("[data-act=vArtPick][data-a=der]"); await pg.wait_for_timeout(300)
        print("  der seçildi →", await pg.evaluate("S.voc.res && (S.voc.res.ok?'ok':'no')"))
    print(errs)
asyncio.run(main())
