import asyncio, base64, struct, math
from playwright.async_api import async_playwright
# 1 sn 440 Hz WAV (ses var)
sr=16000; n=sr; data=b''.join(struct.pack('<h', int(8000*math.sin(2*math.pi*440*i/sr))) for i in range(n))
wav=b'RIFF'+struct.pack('<I',36+len(data))+b'WAVEfmt '+struct.pack('<IHHIIHH',16,1,1,sr,sr*2,2,16)+b'data'+struct.pack('<I',len(data))+data
B64=base64.b64encode(wav).decode()
INIT = """
window.__rec = {started:0, stopped:0};
window.Capacitor = { isNativePlatform: ()=>true, getPlatform: ()=>'ios', Plugins: {
  VoiceRecorder: {
    hasAudioRecordingPermission: async()=>({value:true}), requestAudioRecordingPermission: async()=>({value:true}),
    getCurrentStatus: async()=>({status:'NONE'}),
    startRecording: async()=>{ __rec.started++; return {value:true}; },
    stopRecording: async()=>{ __rec.stopped++; return {value:{recordDataBase64:'%s', mimeType:'audio/wav', msDuration:1000}}; }
  } } };
localStorage.setItem('dw-gemini','AIzaTESTKEYxxxxxxxxxxxxxxxxxxxxxxxxxxx');
localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()}));
""" % B64
async def main():
  async with async_playwright() as p:
    b = await p.chromium.launch(); ctx = await b.new_context(viewport={"width":390,"height":844}, is_mobile=True); pg = await ctx.new_page(); errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
    async def gem(route):
      if "/models" in route.request.url and route.request.method=="GET":
        await route.fulfill(json={"models":[{"name":"models/gemini-3.5-flash","supportedGenerationMethods":["generateContent"]}]}); return
      await route.fulfill(json={"candidates":[{"content":{"parts":[{"text":"{\"text\":\"Was ist der Plan für das Wochenende?\"}"}]}}]})
    await pg.route("**/generativelanguage.googleapis.com/**", gem)
    await pg.add_init_script(INIT)
    await pg.goto("http://localhost:8765/index.html"); await pg.wait_for_timeout(1500)
    await pg.evaluate("S.state.setupDone=true; 0")
    print("NATIVE", await pg.evaluate("NATIVE"), "mic3Ok", await pg.evaluate("mic3Ok()"))
    await pg.evaluate("window.__p = recognize(t=>{window.__live=t}); 0"); await pg.wait_for_timeout(600)
    print("pill:", await pg.evaluate("(document.getElementById('micPill')||{}).textContent"))
    await pg.evaluate("micFinish(); 0"); 
    r = await pg.evaluate("window.__p.then(x=>x, e=>'ERR '+JSON.stringify(e))")
    print("result:", r, "rec:", await pg.evaluate("JSON.stringify(__rec)"))
    # iptal
    await pg.evaluate("window.__p2 = recognize(()=>{}); 0"); await pg.wait_for_timeout(400)
    await pg.evaluate("window.micAbortNow(); 0")
    print("cancel:", await pg.evaluate("window.__p2.then(x=>x, e=>'ERR '+JSON.stringify(e))"))
    print(errs)
asyncio.run(main())
