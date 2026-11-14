"""Canlı sohbet yan kanal düzeltmesi: hatalı cümle → kart + partnere düzeltme notu; doğru cümle → hiçbir şey."""
import asyncio, json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); pg = await (await b.new_context(viewport={"width":390,"height":844}, is_mobile=True)).new_page(); errs=[]
    pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.add_init_script("localStorage.setItem('dw-gemini','AIzaTESTKEYxxxxxxxxxxxxxxxxxxxxxxxxxxx'); localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    r = await pg.evaluate("""(async()=>{
      S.state.setupDone = true; S.state.liveCorr = 'normal';
      AI = {json: async (p)=> p.includes('Leute ist sehr langsam') ? {ok:false, right:'Die Leute sind sehr langsam.', why_tr:'Leute çoğul: sind.', major:true} : {ok:true}};
      const sent = []; const L = {pid:Object.keys(PERSONAS)[0], phase:'live', turns:[{who:'m', t:'Wie ist das Leben in Bayern?'}], cur:{u:'',m:''}, ws:{send:x=>sent.push(JSON.parse(x))}, speaking:null, lat:[], secs:0};
      S.live = L; go('canli'); render();
      await liveCheck(L, 'Aber Leute ist sehr langsam'); await liveCheck(L, 'Ich wohne seit drei Jahren hier');
      await sleep(100);
      return {fixes: L.fixes, sent: sent.map(x=>x.realtimeInput && x.realtimeInput.text.slice(0,120)), card: (document.getElementById('lvFix')||{}).innerText || null};
    })()""")
    print(json.dumps(r, ensure_ascii=False, indent=1)); print("errors", errs[:4])
asyncio.run(main())
