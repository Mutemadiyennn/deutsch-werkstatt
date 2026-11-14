import asyncio, datetime
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={"width":390,"height":844}); pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.clock.install(time=datetime.datetime(2026,11,10,9,0,0))
    await pg.add_init_script("localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.goto("http://localhost:8765/index.html"); await pg.clock.run_for(3000)
    await pg.evaluate("S.state.setupDone=true; S.state.mins={}; S.state.pomo={day:dayKey(),work:0}; 0")
    async def secs(): return await pg.evaluate("Math.round((S.state.mins||{})[dayKey()]||0)")
    async def pw(): return await pg.evaluate("Math.round(pomo().work)")
    async def touch(): await pg.evaluate("document.dispatchEvent(new Event('click'))")
    R = []
    # 1) öğrenme ekranı + dokunma: 60 sn say
    await pg.evaluate("go('lernen'); render(); 0"); await touch()
    for k in range(6): await pg.clock.run_for(10000); await touch()
    R.append(("öğrenirken 60 sn", await secs()))
    # 2) dokunmadan 3 dk: ilk 2 dk sayar, sonra durur
    a = await secs(); await pg.clock.run_for(180000); R.append(("dokunmadan 3 dk (≈120 beklenir)", await secs()-a))
    # 3) ana ekran: saymaz
    await pg.evaluate("go('plan'); render(); 0"); await touch(); a = await secs(); await pg.clock.run_for(60000); R.append(("ana ekranda 60 sn (0 beklenir)", await secs()-a))
    # 4) canlı sohbet dokunmadan 4 dk: hepsini sayar
    await pg.evaluate("S.live={phase:'live', turns:[]}; go('canli'); 0"); a = await secs(); await pg.clock.run_for(240000); R.append(("canlı sohbet 4 dk dokunmadan (240)", await secs()-a)); await pg.evaluate("S.live=null; 0")
    # 5) seans duraklatıldı: saymaz
    await pg.evaluate("S.sess={ctx:'desk', sec:0, i:0, list:[], done:[], hist:[]}; go('lernen'); render(); S.sess.paused={view:'lernen', at:Date.now()}; 0"); await touch(); a = await secs()
    for k in range(6): await pg.clock.run_for(10000); await touch()
    R.append(("duraklatılmış 60 sn (0)", await secs()-a))
    # 6) pomodoro: 5+ dk sayılmayınca sıfırlanır
    await pg.evaluate("S.sess.paused=null; pomo().work = 1200; 0"); R.append(("pomodoro önce", await pw()))
    await pg.evaluate("go('plan'); render(); 0"); await pg.clock.run_for(330000); R.append(("5,5 dk boşta sonra pomodoro (0)", await pw()))
    # 7) mola geri sayımı tam 5 dk sonra biter
    await pg.evaluate("go('lernen'); render(); startBreak(); 0"); await pg.clock.run_for(299000); R.append(("mola 4:59'da sürüyor mu", await pg.evaluate("!!S.brk")))
    await pg.clock.run_for(2500); R.append(("mola 5:01'de bitti mi", await pg.evaluate("!S.brk")))
    # 8) arka planda (gizli) saymaz: zaman sıçraması en fazla 5 sn
    await touch(); a = await secs(); await pg.evaluate("CLK.last = Date.now() - 600000; 0"); await pg.clock.run_for(1000); R.append(("uzun boşluktan sonra en fazla 5 sn", await secs()-a))
    for r in R: print(r)
    print("errors", errs)
asyncio.run(main())
