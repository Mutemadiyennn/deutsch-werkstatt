"""
#58 B10 — Şölen 1 (PM-059) kabul ölçütleri:
  - cevap anı: doğruda onay işareti + ton ("dogru"), XP uçuşu; 3 üst üste rozeti; yanlışta mercan bant + sakin ton ("yanlis")
  - "Devam" cevaptan sonra ≤ 400 ms içinde basılabilir (animasyon cevabı geciktirmez, üstünü örtmez)
  - ilerleme: üstte dolan çubuk (sayı yalnızca ekran okuyucuda), soru ilerledikçe dolar
  - Bugün: mücevherli XP sayacı, günlük hedef çubuğu, filizli seri ve 7 günlük noktalar; düz "0 XP" bağlantısı yok
  - tur sonu: kutlama + özet (doğru, XP, kelime çipleri)
  - Profil'de efekt sesleri kapalıysa ton çalmaz; hareket azaltmada animasyon yok, içerik aynı
  python3 tests/e2e/v2_solen.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4199

def ders_ac(pg, base):
    pg.goto(base + "#/learn"); pg.wait_for_selector("[data-test=temel-ders]")
    pg.locator("[data-test=temel-ders]").first.click(); pg.wait_for_selector("[data-test=ders]")

def ders_ilerle_kurmaya(pg):
    """Kurma adımına (yazılı cevaplı alıştırma) kadar ilerler: dinleme, tanıtım, tablo, seçmeli"""
    for _ in range(80):
        if pg.locator("[data-test=drill-tr_de], [data-test=drill-gap], [data-test=drill-transform], [data-test=drill-guided_response]").count(): return True
        if pg.locator("[data-test=altyazi]").count(): pg.click("[data-test=altyazi]"); pg.wait_for_selector("[data-test=diyalog-metin]")
        if pg.locator("[data-test=drill-pick]").count(): pg.locator("button.opt[data-right]").first.click()
        elif pg.locator("[data-test=drill-order]").count():
            cev = pg.get_attribute("[data-test=drill-order]", "data-cevap")
            for w in [x.strip(".,!?;:„“\"") for x in cev.split()]:
                if w: pg.locator(f"[data-test=drill-order] .wchip[data-chip='{w}']:not([disabled])").first.click()
            pg.click("[data-test=submit]")
        elif pg.locator("[data-test=ders-dinleme]").count():
            pg.click("[data-test=dinle]")
            while pg.locator("[data-test=ders-dinleme] button.opt").count() and not pg.locator("[data-test=dinleme-metin]").count():
                pg.locator("button.opt[data-right]").first.click(); pg.click("[data-test=next]")
        pg.wait_for_selector("[data-test=next], [data-test=claim]")
        pg.locator("[data-test=next]").first.click(); pg.wait_for_timeout(120)
    return False

def yazili(pg, dogru=True):
    """Ekrandaki yazılı alıştırmayı cevaplar; cevaptan 'Devam'ın basılabilir olmasına kadar geçen süreyi döner (ms)"""
    sec = pg.locator("[data-test^=drill-]").first
    cev = (sec.get_attribute("data-cevap") or "").replace("{name}", "Ayşe")
    pg.fill("[data-test=answer]", cev if dogru else "xyz falsch")
    ms = pg.evaluate("""() => new Promise((res) => { const t0 = performance.now(); document.querySelector('[data-test=submit]').click();
      const bak = () => { const b = document.querySelector('[data-test=next]'); if (b && !b.disabled) { const r = b.getBoundingClientRect();
        const ust = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); if (ust && (ust === b || b.contains(ust))) return res(performance.now() - t0); }
        if (performance.now() - t0 > 3000) return res(9999); requestAnimationFrame(bak); }; bak(); })""")
    return ms

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        for tema in ("light", "dark"):
            b, ctx = launch(p, color_scheme=tema); pg = new_page(ctx)
            login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
            ders_ac(pg, base)
            check(pg.locator("[data-test=ilerleme]").count() == 1, f"[{tema}] üstte dolan ilerleme çubuğu var")
            check(ders_ilerle_kurmaya(pg), f"[{tema}] yazılı alıştırmaya gelindi")
            w0 = pg.evaluate("parseFloat(getComputedStyle(document.querySelector('[data-test=ilerleme] i')).width)")
            sureler, ust = [], 0
            for k in range(3):
                pg.wait_for_selector("[data-test^=drill-] [data-test=answer]")
                sureler.append(yazili(pg, True))
                if k == 0:
                    check(pg.locator(".fb.ok .fb-isaret").count() == 1, f"[{tema}] doğruda yaylanan onay işareti")
                    if shots and tema == "light": shot(pg, f"s01-dogru-{tema}", full=False)
                if pg.locator("[data-test=ustuste]").count(): ust = max(ust, int(pg.inner_text("[data-test=ustuste]").split()[0]))
                pg.click("[data-test=next]"); pg.wait_for_timeout(150)
                if not pg.locator("[data-test^=drill-] [data-test=answer]").count(): ders_ilerle_kurmaya(pg)
            check(ust >= 3, f"[{tema}] üç doğru üst üste rozeti ({ust})")
            check(max(sureler) <= 400, f"[{tema}] 'Devam' cevaptan sonra ≤ 400 ms basılabilir ({[round(x) for x in sureler]} ms)")
            pg.wait_for_selector("[data-test^=drill-] [data-test=answer]")
            sure_y = yazili(pg, False)
            check(pg.locator(".fb.bad").count() == 1 and pg.locator("[data-test=ustuste]").count() == 0, f"[{tema}] yanlışta mercan bant, rozet sıfırlandı")
            check(sure_y <= 400, f"[{tema}] yanlışta da 'Devam' ≤ 400 ms ({round(sure_y)} ms)")
            renk = pg.evaluate("getComputedStyle(document.querySelector('.fb.bad')).backgroundColor")
            if shots: shot(pg, f"s02-yanlis-{tema}", full=False)
            ef = pg.evaluate("window.__efekt || []")
            check("dogru:ses" in ef and "yanlis:ses" in ef, f"[{tema}] doğru ve yanlış tonu çalındı ({ef[-4:]}); yanlış bant {renk}")
            pg.click("[data-test=next]"); pg.wait_for_timeout(200)
            w1 = pg.evaluate("parseFloat(getComputedStyle(document.querySelector('[data-test=ilerleme] i')).width)")
            check(w1 > w0, f"[{tema}] ilerleme çubuğu doldu ({w0:.0f} → {w1:.0f} px)")
            # XP: Bugün göstergesi
            pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=xp-seri]")
            pg.wait_for_function("() => Number(document.querySelector('[data-test=xp-toplam]').innerText) > 0", timeout=5000)
            check(pg.locator("[data-test=gun-noktalari] .nokta").count() == 7 and pg.locator(".xpseri .mucevher").count() >= 1, f"[{tema}] Bugün: mücevherli XP sayacı ve 7 günlük noktalar")
            check("0 XP" not in pg.inner_text("[data-test=yol-link]"), f"[{tema}] düz XP bağlantısı kalktı")
            no_overflow(pg, f"[{tema}] Bugün XP/seri")
            if shots: shot(pg, f"s03-bugun-{tema}", full=False)
            # tur sonu kutlaması (Bahçe): seçmeliler doğru, yazılılar 'emin değilim'/yanlış
            pg.click("[data-test=garden-start]"); pg.wait_for_selector("[data-test=garden]")
            ucus = False
            for _ in range(40):
                if pg.locator("[data-test=garden-done]").count(): break
                if pg.locator("[data-test=garden-intro]").count(): pg.click("[data-test=next]"); pg.wait_for_selector("[data-test^=gq-]")
                if pg.locator("button.opt").count(): pg.locator("button.opt[data-right]").first.click()
                else:
                    pg.fill("[data-test=answer]", "xyz falsch"); pg.click("[data-test=submit]")
                    if pg.locator("[data-test=gq-own-check]").count(): pg.click("[data-test=own-unsure]"); pg.wait_for_timeout(200); continue
                pg.wait_for_selector("[data-test=next]")
                ucus = ucus or pg.locator("[data-test=xp-ucus]").count() > 0
                old = pg.inner_text("[data-test=garden] .pbar")
                pg.click("[data-test=next]")
                pg.wait_for_function("(o) => document.querySelector('[data-test=garden-done]') || (document.querySelector('[data-test=garden] .pbar')||{}).innerText !== o", arg=old)
            check(ucus, f"[{tema}] doğru cevapta '+XP' uçuşu görüldü")
            check(pg.locator("[data-test=garden-done] [data-test=kutlama]").count() == 1 and pg.locator("[data-test=ozet]").count() == 1, f"[{tema}] tur sonunda kutlama ve özet")
            check("+" in pg.inner_text("[data-test=ozet-xp]"), f"[{tema}] özette kazanılan XP ({pg.inner_text('[data-test=ozet-xp]')!r})")
            no_overflow(pg, f"[{tema}] tur sonu")
            if shots: pg.wait_for_timeout(300); shot(pg, f"s04-tur-sonu-{tema}", full=False)
            if tema == "light":
                # efekt sesleri kapalı → ton çalmaz
                pg.goto(base + "#/profile"); pg.wait_for_selector("text=Efekt sesleri")
                pg.locator("label:has-text('Efekt sesleri') input").uncheck(); pg.wait_for_timeout(300)
                ders_ac(pg, base); ders_ilerle_kurmaya(pg); pg.evaluate("window.__efekt = []")
                yazili(pg, True)
                ef = pg.evaluate("window.__efekt || []")
                check(ef and all(x.endswith(":sessiz") for x in ef), f"efekt sesleri kapalıyken ton çalmıyor ({ef})")
            b.close()
        # hareket azaltma: animasyon yok, içerik aynı
        b, ctx = launch(p); pg = new_page(ctx); pg.emulate_media(reduced_motion="reduce")
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        ders_ac(pg, base); ders_ilerle_kurmaya(pg); yazili(pg, True)
        an = pg.evaluate("[getComputedStyle(document.querySelector('.fb.ok')).animationName, getComputedStyle(document.querySelector('.fb-isaret')).animationName]")
        check(all(a == "none" for a in an) and pg.locator(".fb.ok .fb-isaret").count() == 1, f"hareket azaltmada animasyon yok, onay işareti yine var ({an})")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
