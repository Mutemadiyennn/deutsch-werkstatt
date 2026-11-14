"""Günlük oturum + kurs entegrasyonu + eller serbest + seslendirme temizliği."""
import asyncio, json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True, device_scale_factor=2); pg = await ctx.new_page(); errs=[]
    pg.on("pageerror", lambda e: errs.append(str(e) + " @ " + (e.stack or "")[:400]))
    await pg.add_init_script("localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()})); setInterval(()=>document.querySelectorAll('.celebrate').forEach(x=>x.remove()), 50);")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    await pg.evaluate("S.state.setupDone=true; S.state.theme='dark'; window.__said=[]; say = async (t, l)=>{ window.__said.push([l, t]); await sleep(5); }; 0")
    await pg.evaluate("(async()=>{ await kursIndex(); await kursUnit(kSt().cur); go('plan'); render(); })()"); await pg.wait_for_timeout(600)
    await pg.screenshot(path="/tmp/se_home.png")
    # ttsClean
    cases = ["Ich arbeite - Ben çalışıyorum.", "der/die/das", "heißen → heiße", "(siz) 'Sie' = you", "Wo? – Hier.", "...", " - "]
    for c in cases: print(json.dumps(c, ensure_ascii=False), "→", json.dumps(await pg.evaluate(f"ttsClean({json.dumps(c)})"), ensure_ascii=False))
    # masada oturum
    await pg.evaluate("sessStart('desk'); 0"); await pg.wait_for_timeout(900)
    print("blok1:", await pg.evaluate("S.sess.hist"), "view", await pg.evaluate("S.view"), "step", await pg.evaluate("S.ku && S.ku.node && S.ku.node.id"))
    await pg.screenshot(path="/tmp/se_sess1.png")
    # basamağı bitir (hızlı): node finish
    await pg.evaluate("kuNodeFinish(); 0"); await pg.wait_for_timeout(2200)
    print("blok2:", await pg.evaluate("S.sess.hist"), "node", await pg.evaluate("S.ku && S.ku.node && S.ku.node.id"))
    for i in range(3):
      await pg.evaluate("if(S.ku && S.ku.node) kuNodeFinish(); 0"); await pg.wait_for_timeout(2200)
    print("blok sonrası:", await pg.evaluate("S.sess.hist"), "view", await pg.evaluate("S.view"))
    await pg.screenshot(path="/tmp/se_sess_break.png")
    await pg.evaluate("sessEnd(); 0"); await pg.wait_for_timeout(300)
    # araba
    await pg.evaluate("window.__said=[]; sessStart('car'); 0"); await pg.wait_for_timeout(1500)
    print("araba:", await pg.evaluate("S.sess.hist"), "kaud", await pg.evaluate("S.kaud && S.kaud.items.length"), "said", await pg.evaluate("window.__said.slice(0,4)"))
    await pg.screenshot(path="/tmp/se_car.png")
    await pg.evaluate("sessEnd(); 0")
    print("todayQueue:", await pg.evaluate("todayQueue().q.map(x=>x.key).join(',')"))
    print("HATALAR:", errs[:6] or "yok")
asyncio.run(main())
