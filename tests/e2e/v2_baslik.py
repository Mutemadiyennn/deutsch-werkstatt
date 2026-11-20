"""
PM-074 G2 ve md. 2–3: üst çubukta başlık tam görünür (normal yazıda en çok 2, %130'da en çok 3 satır), hiçbir durumda (kaydırınca, %130 yazıda) kesilmez ya da çubuktan
taşmaz; medya dinleme adımında tek birincil düğme + hız anahtarı (B7 korunur); senaryo "Önce duy"da birincil eylem
dinlemek, altyazıya atlama küçük bağlantı, altyazılı dinleme kendiliğinden çalar ve yeniden çalınabilir.
python3 tests/e2e/v2_baslik.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg

PORT = 4217
# her cümle 400 ms süren sahte seslendirme; cancel() çalan cümleyi hemen bitirir (gerçek motor gibi)
YAVAS_SES = """(() => { window.__oku = []; let t = null, u0 = null;
  const ss = { speaking: false, pending: false, paused: false, getVoices: () => [{ name: 'Anna', lang: 'de-DE', voiceURI: 'Anna', localService: true, default: false }],
    addEventListener() {}, removeEventListener() {},
    cancel() { clearTimeout(t); const u = u0; u0 = null; if (u) setTimeout(() => u.onend && u.onend(), 0); },
    speak(u) { window.__oku.push({ text: u.text }); u0 = u; t = setTimeout(() => { u0 = null; u.onend && u.onend(); }, 400); } };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: ss });
  window.SpeechSynthesisUtterance = function (x) { this.text = x; this.rate = 1; this.pitch = 1; this.voice = null; };
})()"""
EKRANLAR = ["#/prova/1", "#/m1/1/m1%3A01%3Aa1", "#/m1/1/m1%3A01%3Aa2", "#/okuma/1", "#/garden/1"]
OLC = """() => { const h = document.querySelector('.pbar h1'), b = h.getBoundingClientRect(), p = h.closest('.pbar').getBoundingClientRect();
  const g = h.parentElement.querySelector('a.iconbtn'), gb = g ? g.getBoundingClientRect() : null;
  return { t: h.innerText, ust: b.top, alt: b.bottom, pAlt: p.bottom, kesik: h.scrollHeight > h.clientHeight + 1, satir: Math.round(b.height / parseFloat(getComputedStyle(h).lineHeight)),
    geriYaninda: !gb || (b.top < gb.bottom && gb.top < b.bottom && gb.right <= b.left) }; }"""


def baslik(pg, h, kip):
    r = pg.evaluate(OLC); en_cok = 3 if kip == "%130 yazı" else 2
    check(r["ust"] >= 0 and r["alt"] <= r["pAlt"] and not r["kesik"] and r["satir"] <= en_cok and r["geriYaninda"],
          f"{h} ({kip}): başlık tam, en çok {en_cok} satır, çubuğun içinde, geri düğmesinin yanında ({r}")


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        for h in EKRANLAR:
            pg.goto(base + h); pg.wait_for_selector(".pbar h1"); pg.wait_for_timeout(300)
            baslik(pg, h, "açılış")
            # mobil WebKit'te fare tekerleği yok (inceleme #128 2. tur P1-A): sayfa betikle kaydırılır
            pg.evaluate("window.scrollTo(0, 700)"); pg.wait_for_timeout(300); baslik(pg, h, "kaydırınca")
            pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')"); pg.wait_for_timeout(200)
            baslik(pg, h, "%130 yazı")
            if shots and h in ("#/garden/1", "#/m1/1/m1%3A01%3Aa1"): shot(pg, "b130-" + h.split("/")[-1][:20].replace("%3A", "-"), full=False)
            pg.evaluate("document.documentElement.style.removeProperty('--ts')")
            if shots: shot(pg, "b-" + h.split("/")[-1][:20].replace("%3A", "-"), full=False)
        # çip yalnızca başlık sığmayınca alt satıra iner (üst çubuk boşuna uzamaz). Yazı tipinden bağımsız denetim: başlığın tek satırlık
        # doğal genişliği (hesaplanan yazı tipiyle ölçülür) + çip + boşluklar satıra sığıyorsa aynı satırda olmalı, sığmıyorsa alt satırda
        # (CI'daki WebKit sistem yazı tipi iPhone'dakinden geniş; "Kelime Bahçesi" orada sığmayabilir — inceleme sonrası, f337f34)
        for h in ["#/garden/1", "#/prova/1", "#/m1/1/m1%3A01%3Aa1"]:
            pg.goto(base + h); pg.wait_for_selector(".pbar h1"); pg.wait_for_timeout(300)
            r = pg.evaluate("""() => { const h = document.querySelector('.pbar h1'), row = h.parentElement, c = row.lastElementChild, g = row.querySelector('a.iconbtn');
                if (c === h) return { cip: false };
                const cs = getComputedStyle(h), cx = document.createElement('canvas').getContext('2d'); cx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
                const gap = parseFloat(getComputedStyle(row).columnGap) || 0, a = h.getBoundingClientRect(), b = c.getBoundingClientRect();
                const gerek = (g ? g.getBoundingClientRect().width + gap : 0) + cx.measureText(h.innerText).width + gap + b.width;
                return { cip: true, sigar: gerek <= row.clientWidth - 1, ayniSatir: a.top < b.bottom && b.top < a.bottom, gerek: Math.round(gerek), satir: row.clientWidth }; }""")
            if r["cip"]: check(r["ayniSatir"] == r["sigar"], f"{h}: çip yalnızca başlık sığmayınca alt satırda ({r})")
        # medya: tek birincil düğme + hız anahtarı; "Önce dinle" yok; dinledikten sonra birincil "Sorulara geç"
        pg.goto(base + "#/m1/1/m1%3A01%3Aa1"); pg.wait_for_selector("[data-test=adim-dinle]")
        n_prim = pg.locator("[data-test=adim-dinle] .btn.primary").count()
        check(n_prim == 1 and "Önce dinle" not in pg.inner_text("body"), f"medya: tek birincil düğme ({n_prim}), 'Önce dinle' yok")
        if pg.locator("[data-test=hiz]").count():
            pg.locator("[data-test=hiz] button", has_text="Normal").click()
            check(pg.locator("[data-test=hiz] button[aria-pressed=true]").inner_text().strip() == "Normal", "medya: hız anahtarı Normal'e geçer")
        # üretim kapısı: dinlemeden "Sorulara geç" görünmez (E2E kısayolu kapalı; inceleme #128 P2-5)
        pg.evaluate("sessionStorage.setItem('e2e-kapi', '1')"); pg.reload(); pg.wait_for_selector("[data-test=dinle-bolum]")
        # PM 7043484263: dinlemeden önce "Sorulara geç" yalnız küçük bağlantı (birincil düğme değil)
        check(pg.locator("[data-test=next].btn").count() == 0 and pg.locator("[data-test=next][data-baglanti]").count() == 1, "medya: dinlemeden 'Sorulara geç' yalnız küçük bağlantı")
        pg.click("[data-test=dinle-bolum]"); pg.wait_for_timeout(400)
        if pg.locator("[data-test=durdur]").count(): pg.click("[data-test=durdur]")
        pg.wait_for_selector("[data-test=dinle-bolum]")
        check("primary" in (pg.get_attribute("[data-test=next]", "class") or "") and "primary" not in (pg.get_attribute("[data-test=dinle-bolum]", "class") or ""),
              "medya: dinledikten sonra birincil 'Sorulara geç', 'Bir daha dinle' ikincil")
        if shots: shot(pg, "b-medya-dinlendi", full=False)
        pg.evaluate("sessionStorage.removeItem('e2e-kapi')")
        # B7 (inceleme #128 P2-1): ilk dinleme yavaşsa dinledikten sonra anahtar Normal'e geçer — her iki hızlı kayıtta
        for h in ["#/m1/1/m1%3A01%3Aa1", "#/m1/1/m1%3A01%3Aa2"]:
            pg.goto(base + h); pg.reload(); pg.wait_for_selector("[data-test=dinle-bolum]")
            if not pg.locator("[data-test=hiz]").count(): continue
            once = pg.locator("[data-test=hiz] button[aria-pressed=true]").inner_text().strip()
            pg.click("[data-test=dinle-bolum]"); pg.wait_for_timeout(300)
            if pg.locator("[data-test=durdur]").count(): pg.click("[data-test=durdur]")
            pg.wait_for_selector("[data-test=dinle-bolum]")
            sonra = pg.locator("[data-test=hiz] button[aria-pressed=true]").inner_text().strip()
            check(sonra == "Normal", f"{h}: ilk dinlemeden sonra hız anahtarı Normal (B7; önce {once}, sonra {sonra})")
        # senaryo "Önce duy"
        pg.goto(base + "#/scenario/sc:telefon:01-arzttermin"); pg.wait_for_selector("[data-test=continue]")
        pg.click("[data-test=continue]"); pg.wait_for_selector("[data-test=stage-intro]")
        prim = pg.locator(".actionbar .btn.primary").first.get_attribute("data-test")
        check(prim == "play-dialogue" and pg.locator(".actionbar .linkbtn[data-test=to-subtitles]").count() == 1, f"senaryo: birincil 'Diyaloğu dinle', altyazıya atlama bağlantı ({prim})")
        if shots: shot(pg, "b-senaryo-dinle", full=False)
        pg.click(".actionbar [data-test=to-subtitles]"); pg.wait_for_selector("[data-test=subtitles]")
        check(pg.locator("[data-test=stage-intro] [data-test=play-dialogue], [data-test=durdur-diyalog]").count() >= 1, "senaryo: altyazılıyken diyalog yeniden çalınabilir (phases/09 md. 1)")
        b.close()
        # senaryo "Durdur": diyalog döngüsü durur; "Durdur" → "Altyazılı dinle" iki oynatmayı üst üste bindirmez (inceleme #128 2. tur P1-B)
        b, ctx = launch(p); ctx.add_init_script(YAVAS_SES); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/scenario/sc:telefon:01-arzttermin"); pg.wait_for_selector("[data-test=continue]")
        pg.click("[data-test=continue]"); pg.wait_for_selector("[data-test=stage-intro]")
        pg.evaluate("window.__oku = []"); pg.click(".actionbar [data-test=play-dialogue]")
        pg.wait_for_function("() => window.__oku.length >= 2"); pg.click("[data-test=durdur-diyalog]")
        n = pg.evaluate("window.__oku.length"); pg.wait_for_timeout(2500)
        check(pg.evaluate("window.__oku.length") == n, f"senaryo: 'Durdur' diyaloğu durduruyor ({n} → {pg.evaluate('window.__oku.length')} cümle)")
        pg.evaluate("window.__oku = []"); pg.click(".actionbar [data-test=to-subtitles]")  # "Altyazılı dinle": baştan çalar
        pg.wait_for_function("() => window.__oku.length >= 2"); pg.click("[data-test=durdur-diyalog]")
        pg.click("[data-test=play-dialogue]")  # hemen yeniden çal
        pg.wait_for_function("() => window.__oku.length >= 5", timeout=15_000); pg.click("[data-test=durdur-diyalog]"); pg.wait_for_timeout(1500)
        # karşılaştırma ilk 10 harfle: altyazıda {name} ve Patient/Patientin biçimi seslendirmeden farklı çözülür
        sira = [x[:10] for x in pg.evaluate("window.__oku.map((x) => x.text)")]
        beklenen = [x[:10] for x in pg.locator("[data-test=subtitles] .de").all_inner_texts()]
        bas = sira.index(beklenen[0], 1) if beklenen and beklenen[0] in sira[1:] else -1
        ilk, ikinci = sira[:bas], sira[bas:] if bas > 0 else []
        check(bas > 0 and ilk == beklenen[:len(ilk)] and len(ikinci) >= 3 and ikinci == beklenen[:len(ikinci)],
              f"senaryo: Durdur → yeniden çal tek döngü, baştan ve sırayla (ilk {len(ilk)}, ikinci {len(ikinci)} cümle; üst üste binme yok)")
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
