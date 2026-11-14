import asyncio
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); pg = await b.new_page(viewport={"width":390,"height":844}, device_scale_factor=2)
    errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.add_init_script("window.__kb=0; window.__hap=[]; window.Capacitor = {isNativePlatform:()=>true, platform:'ios', Plugins:{Keyboard:{setAccessoryBarVisible:async(o)=>{window.__kb++;}}, LocalNotifications:{getPending:async()=>({notifications:[{id:7101}]}), cancel:async(o)=>{window.__cancel=o;}, checkPermissions:async()=>({display:'prompt'}), requestPermissions:async()=>({display:'granted'}), schedule:async(o)=>{window.__sched=o.notifications.map(n=>[n.id,n.title,String(n.schedule.at).slice(0,21)]);}}, Badge:{set:async(o)=>{window.__badge=o.count;}, clear:async()=>{window.__badge=0;}}, App:{addListener:(n,f)=>{window.__appl=f; return {remove(){}};}}, StatusBar:{setStyle:async(o)=>{window.__sb=o.style;}}, Haptics:{impact:async(o)=>window.__hap.push(o.style), notification:async(o)=>window.__hap.push(o.type)}}};")
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(2500)
    print("NATIVE", await pg.evaluate("NATIVE"), "view", await pg.evaluate("S.view"), "gateOn", await pg.evaluate("gateOn()"))
    await pg.screenshot(path="/tmp/native_lock.png")
    # simulate firebase loaded
    await pg.evaluate("""SY.err=''; SY.app = {}; SY.mods = {au:{signInWithEmailAndPassword: async (a,e,p)=>{ window.__in=[e,p]; throw {code:'auth/invalid-credential'}; }}}; SY.auth={}; render(); 0""")
    await pg.fill("#syEm", "x@example.com"); await pg.fill("#syPw", "geheim1234"); await pg.press("#syPw", "Enter"); await pg.wait_for_timeout(300)
    print("signin called:", await pg.evaluate("window.__in"), "err:", await pg.evaluate("SY.err"))
    await pg.screenshot(path="/tmp/native_lock2.png"); await pg.evaluate("document.documentElement.dataset.theme='dark'; 0"); await pg.screenshot(path="/tmp/lock_v3.png")
    await pg.evaluate("sfx('ok'); sfx('up'); 0"); print("kb calls", await pg.evaluate("window.__kb"), "hap", await pg.evaluate("window.__hap")); await pg.wait_for_timeout(2600); print("sched", await pg.evaluate("window.__sched"), "cancel", await pg.evaluate("window.__cancel"), "sb", await pg.evaluate("window.__sb")); await pg.wait_for_timeout(600); print("badge", await pg.evaluate("window.__badge"), "appListener", await pg.evaluate("typeof window.__appl")); await pg.evaluate("window.__appl({isActive:true}); 0"); print("remindHtml", await pg.evaluate("remindHtml().length>0")); print("errors", errs)
    pg2 = await b.new_page(viewport={"width":390,"height":844})
    await pg2.add_init_script("localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));")
    await pg2.goto("http://localhost:8765/index.html"); await pg2.wait_for_timeout(1500)
    print("web NATIVE", await pg2.evaluate("NATIVE"), await pg2.evaluate("syLoginHtml(false).includes('Google')"))
    await pg2.evaluate("SY.user={email:'a@b.c', uid:'u', providerData:[{providerId:'google.com'}]}; go('kurulum'); render(); 0"); await pg2.wait_for_timeout(300)
    print("apppass shown:", await pg2.evaluate("document.body.innerText.includes('iPhone uygulaması şifresi')"))
    await b.close()
asyncio.run(main())
