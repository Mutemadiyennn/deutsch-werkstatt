"""
T-0 (eski K-00c; PM-153 md. 1 satır 1–3, PM-132, #274): ses ve dokunma.
  - sahte "kutudan çıkmış iPhone" ses listesi: tek gerçek Almanca ses (Anna) + eğlence sesleri; liste sayfa açıldıktan
    400 ms sonra gelir (geç yüklenen sesler). Okunan her cümlenin metni, sesi ve perdesi kaydedilir.
  - akış sahnesi ("Apartman merdiveni": Brandl / Sen / Brandl): "Sen" Brandl'dan farklı SESLE; Brandl'ın iki satırı aynı ses ve
    perde; dinlerken konuşanın adı ekranda; dökümdeki tek satır düğmeleri diziyle aynı eşlemeyi kullanır; tek sesle okuyan düğme yok
  - Köy dizisi (`m1:04:v1`, üç kadın konuşan, tek gerçek kadın sesi): sahne boyunca her konuşana tek (ses, perde), iki konuşan aynı (ses, perde) almaz;
    çalan cümlenin konuşanı adıyla ekranda; Tanılama "Son sahne" bu oynatıcıdan dolar; metin adımında satır başında ad
  - dokunma: sayfada `touch-action: manipulation` (çift dokunma yakınlaşması kapalı, iki parmak açık); girişlerin yazısı ≥ 16 px
    (iOS odakta otomatik yakınlaşmaz); dokunmatik bağlamda çift dokunuştan sonra ölçek 1
python3 tests/e2e/v2_ses_sahne.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
import json
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
from v2_akis import adim_gec
from v2_medya import answer_step

PORT = 4261
TEMA = arg("--scheme") or "light"

SAHTE = """(() => {
  const V = ["Anna", "Eddy (Deutsch (Deutschland))", "Flo (Deutsch (Deutschland))", "Grandma (Deutsch (Deutschland))", "Grandpa (Deutsch (Deutschland))",
    "Reed (Deutsch (Deutschland))", "Rocko (Deutsch (Deutschland))", "Sandy (Deutsch (Deutschland))", "Shelley (Deutsch (Deutschland))"]
    .map((name) => ({ name, lang: "de-DE", voiceURI: name, localService: true, default: false }));
  const t0 = Date.now();
  window.__oku = []; window.__rozet = [];
  const ss = { speaking: false, pending: false, paused: false, getVoices: () => (window.__sesYok || Date.now() - t0 < 400 ? [] : V), cancel() {}, addEventListener() {}, removeEventListener() {},
    speak(u) { window.__oku.push({ text: u.text, ses: u.voice ? u.voice.name : null, pitch: u.pitch, rate: u.rate });
      // çalan satırın konuşan rozeti (ekrandaki ad) cümle başlarken kaydedilir
      const i = window.__rozet.length; window.__rozet.push(null);
      setTimeout(() => { const r = document.querySelector('[data-test=konusan]'); window.__rozet[i] = r ? [r.dataset.kim || '', r.innerText.trim()] : null; }, 40);
      u.onstart && u.onstart(); setTimeout(() => u.onend && u.onend(), 80); } };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: ss });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; this.rate = 1; this.pitch = 1; this.voice = null; };
})()"""

def sahne_bul(pg):
    """1. günün akışında ilk sahne adımına kadar ilerler (adım geçme yardımcısı v2_akis'ten)"""
    for _ in range(120):
        if pg.locator("[data-test=akis-sahne]").count(): return True
        if pg.locator("[data-test=akis-durak-gecis]").count() or pg.locator("[data-test=akis-durak-gec]").count():
            if pg.locator("[data-test=akis-durak-gec]").count(): pg.click("[data-test=akis-durak-gec]"); pg.wait_for_timeout(200); continue
        if pg.locator("[data-test=halka-sonu]").count(): pg.click("[data-test=halka-sonu-devam]"); pg.wait_for_timeout(150); continue
        if adim_gec(pg) is None: return False
    return False

def main():
    shots = arg("--shots")
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=TEMA); ctx.add_init_script(SAHTE); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")

        # --- dokunma (PM-153 md. 1 satır 1) ---
        ta = pg.evaluate("() => ['html', 'body', '.app', 'button', '[data-tab=today]'].map((s) => { const e = document.querySelector(s); return e ? getComputedStyle(e).touchAction : null; })")
        check(all(x in ("manipulation", None) for x in ta) and ta[0] == "manipulation" and ta[1] == "manipulation", f"çift dokunma yakınlaşması kapalı: touch-action manipulation ({ta})")
        pg.goto(base + "#/sozluk"); pg.wait_for_selector("input", timeout=15000)
        fs = pg.evaluate("() => [...document.querySelectorAll('input, textarea, select')].map((e) => parseFloat(getComputedStyle(e).fontSize))")
        check(fs and min(fs) >= 16, f"girişlerin yazısı ≥ 16 px: odakta otomatik yakınlaşma yok ({fs})")
        if ctx.pages and pg.evaluate("'ontouchstart' in window || navigator.maxTouchPoints > 0"):
            pg.touchscreen.tap(200, 300); pg.wait_for_timeout(60); pg.touchscreen.tap(200, 300); pg.wait_for_timeout(400)
            sc = pg.evaluate("window.visualViewport ? visualViewport.scale : 1")
            check(abs(sc - 1) < 1e-6, f"çift dokunuştan sonra ölçek 1 ({sc})")

        # --- akış sahnesi: "Sen" ile karşıdaki farklı ses (PM-153 md. 1 satır 2). Hitap Frau: kutudan çıkmış iPhone'da tek gerçek
        # kadın sesi (Anna) karşıdakinde; eski kod öğrenciye de Anna'yı (%2 perde farkıyla) veriyordu ---
        pg.goto(base + "#/profile"); pg.wait_for_selector("#nm"); pg.click("[data-address=Frau]")
        pg.wait_for_function("() => document.querySelector('[data-address=Frau]')?.getAttribute('aria-pressed') === 'true'"); pg.wait_for_timeout(600)
        pg.goto(base + "#/akis/1"); pg.wait_for_selector("[data-test=akis]", timeout=20000)
        check(sahne_bul(pg), "1. günün akışında sahne adımı bulundu")
        if pg.locator("[data-test=akis-sahne]").count():
            metin = pg.inner_text("[data-test=akis-sahne]")
            check("Sahneyi dinle" not in metin and pg.locator("[data-test=akis-sahne] [aria-label^='Sahneyi dinle']").count() == 0, "sahnede bütün satırları tek sesle okuyan düğme yok")
            # sesler sahne başında henüz yok (geç yüklenen liste): 400 ms sonra gelir; sahne onları beklemeli
            pg.evaluate("window.__oku = []; window.__rozet = []; window.__sesYok = true; setTimeout(() => { window.__sesYok = false; }, 400)"); pg.click("[data-test=sahne-dinle]")
            pg.wait_for_function("() => !document.querySelector('[data-test=sahne-dinle][disabled]') && window.__oku.length >= 2", timeout=15000); pg.wait_for_timeout(100)
            o = pg.evaluate("window.__oku"); rz = pg.evaluate("window.__rozet")
            kimler = [r[0] if r else "" for r in rz[:len(o)]]
            sesi = {}
            for k, x in zip(kimler, o): sesi.setdefault(k, set()).add((x["ses"], x["pitch"]))
            check("ogrenci" in sesi and len(sesi) >= 2, f"sahnede öğrenci ve karşıdaki konuşuyor ({kimler})")
            check(all(len(v) == 1 for v in sesi.values()), f"aynı konuşanın satırları aynı ses ve perde ({ {k: sorted(v) for k, v in sesi.items()} })")
            sen_ses = {s for s, _ in sesi.get("ogrenci", set())}
            karsi_ses = {s for k, v in sesi.items() if k != "ogrenci" for s, _ in v}
            check(bool(sen_ses) and not (sen_ses & karsi_ses), f"\"Sen\" karşıdakinden farklı SESLE (Sen {sen_ses}, karşı {karsi_ses})")
            check(all(x["ses"] for x in o), "sesler geç gelse de sahne gelen seslerle çaldı (varsayılan sese düşmedi)")
            check(all(r and r[1] and "ch:" not in r[1] and (r[1] == "Sen") == (r[0] == "ogrenci") for r in rz[:len(o)]), f"dinlerken konuşanın adı ekranda ({rz[:len(o)]})")
            if shots: shot(pg, f"t0-akis-sahne-{TEMA}", full=False)
            pg.wait_for_selector("[data-test=sahne-metin]")
            satir = pg.locator("[data-test=sahne-metin] [data-test=listen]")
            tek = []
            for i in range(satir.count()):
                pg.evaluate("window.__oku = []"); satir.nth(i).click(); pg.wait_for_function("() => window.__oku.length >= 1", timeout=5000)
                x = pg.evaluate("window.__oku[0]"); tek.append((x["ses"], x["pitch"]))
            check(tek == [(y["ses"], y["pitch"]) for y in o], f"dökümde tek satır düğmeleri diziyle aynı eşleme ({tek})")

        # --- Köy dizisi (4. gün: üç kadın konuşan; kutudan çıkmış iPhone'da tek kadın sesi), sabit eşleme, ad ekranda, Tanılama (K-00c md. 1, 2, 5) ---
        pg.goto(base + "#/m1/4/m1%3A04%3Av1"); pg.reload(); pg.wait_for_selector("[data-test=dinle-bolum]", timeout=20000)
        pg.evaluate("window.__oku = []; window.__rozet = []; localStorage.removeItem('dw2-tani'); window.__sesYok = true; setTimeout(() => { window.__sesYok = false; }, 400)")
        pg.click("[data-test=dinle-bolum]")
        pg.wait_for_function("() => window.__oku.length >= 4", timeout=15000)
        pg.wait_for_function("() => !document.querySelector('[data-test=durdur]')", timeout=30000)
        o = pg.evaluate("window.__oku"); rz = pg.evaluate("window.__rozet")
        check(all(x["ses"] for x in o), f"Köy dizisinin bütün cümleleri gelen seslerle ({len(o)} cümle)")
        es = {}
        for x, r in zip(o, rz):
            if r: es.setdefault(r[0], set()).add((x["ses"], x["pitch"]))
        check(len(es) >= 2 and all(len(v) == 1 for v in es.values()), f"sahne boyunca her konuşana tek (ses, perde) ({ {k: sorted(v) for k, v in es.items()} })")
        tum = [next(iter(v)) for v in es.values()]
        check(len(set(tum)) == len(tum), f"iki konuşan aynı (ses, perde) almıyor ({tum})")
        check(all(r and r[1] for r in rz), f"çalan her cümlede konuşanın adı ekranda ({[r[1] if r else None for r in rz][:6]})")
        tani = json.loads(pg.evaluate("localStorage.getItem('dw2-tani') || '{}'"))
        check(all(k in (tani.get("sahne") or "") for k in es.keys()), f"Tanılama 'Son sahne' Köy dizisinden doldu ({(tani.get('sahne') or '')[:120]})")
        no_overflow(pg, "Köy dizisi")
        if shots:
            pg.click("[data-test=dinle-bolum]"); pg.wait_for_function("() => { const r = document.querySelector('[data-test=konusan]'); return r && r.innerText.trim(); }", timeout=5000)
            shot(pg, f"t0-koy-dizi-dinle-{TEMA}", full=False)
            pg.wait_for_function("() => !document.querySelector('[data-test=durdur]')", timeout=30000)
        # metin adımı: satır başında ad (dökümde kim konuşuyor)
        for _ in range(40):
            if pg.locator("[data-test=adim-transkript]").count() or pg.locator("[data-test=medya-bitti]").count(): break
            if pg.locator("[data-test=adim-dinle], [data-test=adim-cumle]").count(): pg.locator("[data-test=next]:visible").first.click(); pg.wait_for_timeout(250); continue
            try: answer_step(pg)
            except Exception as e: print("   (adım geçilemedi:", str(e)[:80], ")"); break
        if pg.locator("[data-test=adim-transkript]").count():
            n = pg.locator("[data-test=adim-transkript] .transkript-satir").count(); a = pg.locator("[data-test=adim-transkript] [data-test=konusan-ad]").count()
            ham = pg.inner_text("[data-test=adim-transkript]")
            check(n > 0 and a == n and "ch:" not in ham, f"metin adımında her satırın başında konuşanın adı ({a}/{n}), ham kimlik yok")
            if shots: shot(pg, f"t0-koy-dizi-metin-{TEMA}", full=False)
        else:
            print("   (metin adımına ulaşılamadı; satır başı adı birim testlerinde)")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
