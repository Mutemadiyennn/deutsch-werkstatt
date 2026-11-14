"""QA raporundaki hataların tekrar etmediğini kontrol eder."""
import asyncio, json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); pg = await (await b.new_context(viewport={"width":390,"height":844}, is_mobile=True)).new_page(); errs=[]
    pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.add_init_script("localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    r = await pg.evaluate("""(async()=>{ S.state.setupDone=true; const out = {};
      out.qfix = [qfix('Das sind Bananen.', 'Bunlar muz.'), qfix('Ist das deine Zeitung?', 'Bu senin gazeten mi'), qfix('Ich war glücklich.', 'Çok mutluydum.')];
      const u = await kursUnit('a1-02'); out.short = (u.words||[]).slice(0,17).map(w=>kuTrShort(w.tr));
      /* şık karıştırma: 30 listen maddesinde doğru şıkkın ilk sırada görünme oranı */
      let first = 0, n = 0; const its = kuWordItems(u, u.words, 'rec').filter(x=>x.k==='listen');
      for(let k=0;k<6;k++) for(const it of its){ S.ku = {id:'a1-02', u, steps:[{k:'drills'}], si:0, D: kuDrillRun([it], 'drill')}; kuItemBody(it); if(S.ku.D.ord[0] === it.ans) first++; n++; }
      out.firstRate = (first/n).toFixed(2);
      out.ttsClean = ttsClean('o (kadın) / onlar');
      out.order = kuOrderTokens('Ist Lena verheiratet?', u);
      /* kelime maddesi kural SRS'ine yazılmaz */
      const w = kuWordItems(u, [u.words[0]], 'prod')[0]; kuMark(w, true); out.phantom = Object.keys(kSt().it).filter(k=>k.includes(':w:')).length;
      out.core = [kuCore('Ach so, sprechen ihr zu Hause Türkisch?'), kuJudge(['Ach so, sprecht ihr zu Hause Türkisch?'], ['sprecht ihr zu Hause Türkisch']).ok, kuJudge(['Ach so, sprecht ihr zu Hause Türkisch?'], ['ach so sprechen ihr zu Hause Türkisch']).ok];
      return out; })()""")
    print(json.dumps(r, ensure_ascii=False, indent=1)); print("errors", errs[:4])
asyncio.run(main())
