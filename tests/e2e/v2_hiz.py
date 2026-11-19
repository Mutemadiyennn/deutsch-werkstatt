"""
#58 B7 — "Dinlemeye başlangıç hızı" gerçekten etkili:
  - Yavaş (varsayılan): bir cümle ilk kez yavaş çalınır (RATE.slow), tekrarında normal hızda
  - Profil'de Normal seçilince yeni cümle normal hızda; açıklama metni seçime göre değişir
  - "Yavaş" düğmesi her zaman yavaş
Cihaz sesi bir kayıt sahtesiyle değiştirilir (söylenen metin ve hız window.__ses'e yazılır).
  python3 tests/e2e/v2_hiz.py [--browser webkit] [--device "iPhone 15"]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish

PORT = 4197
SAHTE_SES = """(() => {
  window.__ses = [];
  class U { constructor(t) { this.text = t; this.rate = 1; this.lang = ''; this.onend = null; this.onerror = null; } }
  window.SpeechSynthesisUtterance = U;
  const s = { speaking: false, cancel() {}, getVoices: () => [], speak(u) { window.__ses.push({ text: u.text, rate: u.rate, lang: u.lang }); setTimeout(() => u.onend && u.onend(), 30); } };
  Object.defineProperty(window, 'speechSynthesis', { value: s, configurable: true });
})();"""

def son(pg, n=1):
    return pg.evaluate(f"() => window.__ses.slice(-{n})")

def dinle(pg, sec):
    k = len(pg.evaluate("() => window.__ses"))
    pg.locator(sec).first.click()
    pg.wait_for_function("(k) => window.__ses.length > k", arg=k)
    pg.wait_for_timeout(120)
    return son(pg)[0]

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p); ctx.add_init_script(SAHTE_SES); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/profile"); pg.wait_for_selector("[data-test=hiz-aciklama]")
        if "ilk kez yavaş" not in pg.inner_text("[data-test=hiz-aciklama]"):
            pg.locator("button:has-text('Yavaş')").first.click(); pg.wait_for_function("() => document.querySelector('[data-test=hiz-aciklama]').innerText.includes('ilk kez yavaş')")
        check("ilk kez yavaş" in pg.inner_text("[data-test=hiz-aciklama]"), "Profil: Yavaş seçiliyken ne yaptığı yazıyor")
        pg.goto(base + "#/scenario/sc:telefon:01-arzttermin/chunks"); pg.wait_for_selector("[data-test=listen]")
        pg.wait_for_timeout(600)  # ekran açılışında otomatik okuma olabilir: o da "ilk çalma"dır
        a = dinle(pg, "[data-test=listen]")
        dinle(pg, "[data-test=listen]")
        hepsi = [x["rate"] for x in pg.evaluate("() => window.__ses") if x["text"] == a["text"]]
        check(len(hepsi) >= 2 and hepsi[0] < 0.8 and all(r >= 0.9 for r in hepsi[1:]), f"Yavaş: aynı cümle ilk kez yavaş, sonra normal ({hepsi})")
        if pg.locator("[data-test=listen-slow]").count():
            c = dinle(pg, "[data-test=listen-slow]")
            check(c["rate"] < 0.8, f"'Yavaş' düğmesi her zaman yavaş ({c['rate']})")
        pg.goto(base + "#/profile"); pg.wait_for_selector("[data-test=hiz-aciklama]")
        pg.locator("[data-test=hiz-aciklama]").locator("xpath=preceding-sibling::div[1]").locator("button:has-text('Normal')").click()
        pg.wait_for_function("() => !document.querySelector('[data-test=hiz-aciklama]').innerText.includes('ilk kez yavaş')")
        check("normal hızda" in pg.inner_text("[data-test=hiz-aciklama]"), "Profil: Normal seçilince açıklama değişiyor")
        pg.goto(base + "#/scenario/sc:telefon:01-arzttermin/dialogue"); pg.wait_for_selector("[data-test=listen]")
        n0 = len(pg.evaluate("() => window.__ses"))
        d = dinle(pg, "[data-test=listen]")
        check(d["rate"] >= 0.9, f"Normal: yeni cümle ilk çalmada normal hızda ({d['rate']})")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
