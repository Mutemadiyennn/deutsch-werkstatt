"""
PM-049 / #58 A3 Kelime Bahçesi — 10 kartlık bir tur baştan sona (kabul ölçütü).
  - Bugün → "Tekrar et" → tur: yeni kart tanıtımı → soru; doğru/yanlış geri bildirimi eylem çubuğunda
  - "Duyduğum kelime" (kişisel banka) sözlükte varsa ilk yeni kart olur
  - yanlış cevapta doğrusu öğrencinin cevabıyla yan yana; kart turun sonunda yeniden gelir (tur uzar)
  - tur sonu özeti → Bugün'e dönüş; ikinci tur yeni kartlar ve tanıtılmış kartlarla kurulur
  python3 tests/e2e/v2_garden.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow, tanitim_gec

PORT = 4191
AFTER = []  # cevaptan sonraki kart: (kelime, örnek cümle, örnek sayısı)

def note_after(pg):
    if pg.locator("[data-test=after-card]").count():
        c = pg.locator("[data-test=after-card]").first
        AFTER.append((c.get_attribute("data-lex"), pg.inner_text("[data-test=after-ex]") if pg.locator("[data-test=after-ex]").count() else "", int(c.get_attribute("data-nex") or 0)))

def answer_current(pg, wrong=False):
    """Ekrandaki soruyu cevaplar; seçmelide doğru şık e2e derlemesinde data-right ile işaretli"""
    if pg.locator("[data-test=garden-intro]").count():
        tanitim_gec(pg); return  # PM-069 madde 3: ilk soru sonra gelir
    if pg.locator("button.opt").count():
        sel = "button.opt:not([data-right])" if wrong else "button.opt[data-right]"
        pg.locator(sel).first.click()
    else:
        pg.fill("[data-test=answer]", "xyz falsch" if wrong else "Ich habe heute keine Zeit."); pg.click("[data-test=submit]")
        if pg.locator("[data-test=gq-own-check]").count():
            old = pg.inner_text("[data-test=garden] .pbar"); pg.click("[data-test=own-ok]")
            pg.wait_for_function("""(old) => document.querySelector('[data-test=garden-done]') || (document.querySelector('[data-test=garden] .pbar')||{}).innerText !== old""", arg=old); return
    pg.wait_for_selector("[data-test=next]")
    note_after(pg)
    advance(pg)

def advance(pg):
    """Devam'a basar ve yeni soru (ya da tur sonu) ekrana gelene kadar bekler"""
    old = pg.inner_text("[data-test=garden] .pbar") if pg.locator("[data-test=garden] .pbar").count() else ""
    pg.click("[data-test=next]")
    pg.wait_for_function("""(old) => document.querySelector('[data-test=garden-done]') ||
      ((document.querySelector('[data-test=garden] .pbar')||{}).innerText !== old)""", arg=old)

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.wait_for_selector("[data-test=garden-start]")
        check(pg.locator("[data-test=garden-start]").count() == 1, "Bugün: yolun sonunda 'Tekrar' düğümü (Bahçe girişi; ana eylem sıradaki düğüm)")
        # "Duyduğum kelime" ve "Tekrar edilecekler" Öğren'de (PM 7015070303-E)
        pg.goto(base + "#/learn"); pg.wait_for_selector("[data-test=heard]")
        # kişisel banka (#58 A3, LS-7.5): "Duyduğum kelime" kutusundan eklenen kelime turda öncelikli yeni kart olur
        pg.click("[data-test=heard]"); pg.fill("[data-test=heard-de]", "die Daten"); pg.click("form >> text=Ekle")
        pg.wait_for_selector("[data-test=heard]")
        pg.click("[data-test=tekrar-bahce]"); pg.wait_for_selector("[data-test=garden]")
        sub = pg.inner_text("[data-test=garden] .pbar")
        total = int(sub.split("/")[-1].strip().split()[0]) if "/" in sub else 0
        check(8 <= total <= 12, f"tur 8–12 soru ({total})")
        no_overflow(pg, "Bahçe ilk soru")
        if shots: shot(pg, "g01-tanitim", full=False)
        intros, types = [], []
        def note():
            if pg.locator("[data-test=garden-intro]").count(): intros.append(pg.inner_text("[data-test=garden-intro] .de-xl"))
            t = pg.locator("[data-test^=gq-]").first.get_attribute("data-test") if pg.locator("[data-test^=gq-]").count() else None
            if t: types.append(t)
        # 1. soru yanlış: doğrusu ve öğrencinin cevabı yan yana, tur bir soru uzar
        note()
        while pg.locator("[data-test=garden-intro]").count():
            tanitim_gec(pg); note()
        if pg.locator("button.opt").count(): pg.locator("button.opt:not([data-right])").first.click()
        else: pg.fill("[data-test=answer]", "xyz falsch"); pg.click("[data-test=submit]")
        if pg.locator("[data-test=gq-own-check]").count():
            old = pg.inner_text("[data-test=garden] .pbar"); pg.click("[data-test=own-unsure]")  # kendi cümlesi: ceza yok, yanlış sayılmaz
            pg.wait_for_function("""(old) => document.querySelector('[data-test=garden-done]') || (document.querySelector('[data-test=garden] .pbar')||{}).innerText !== old""", arg=old)
        else:
            pg.wait_for_selector("[data-test=next]")
            band = pg.inner_text(".actionbar")
            check("Doğrusu" in band and "Senin cevabın" in band, "yanlışta doğrusu öğrencinin cevabıyla yan yana")
            # PM #59: cevaptan sonra kelime örnek cümlesiyle görünür (tek kelime ekranı değil)
            check(pg.locator("[data-test=after-card] [data-test=after-ex]").count() == 1, "cevaptan sonra örnek cümle görünüyor")
            note_after(pg)
            pg.wait_for_timeout(700)
            if shots: shot(pg, "g02-yanlis", full=False)
            advance(pg)
            sub2 = pg.inner_text("[data-test=garden] .pbar")
            check(sub2.strip().endswith(str(total + 1)), f"yanlış kart turun sonuna eklendi ({sub2.strip()})")
        n = 1
        while not pg.locator("[data-test=garden-done]").count() and n < 25:
            note(); answer_current(pg); n += 1
        # yanlış cevaplanan kart tur sonunda başka örnek cümleyle geri geldi (PM #59 madde 2)
        if AFTER:
            lx0, ex0, nex0 = AFTER[0]
            again = [a for a in AFTER[1:] if a[0] == lx0]
            check(bool(again) and (nex0 < 2 or again[-1][1] != ex0), f"yanlış kart başka örnekle geri geldi ({lx0}: {ex0[:30]!r} → {(again[-1][1] if again else '')[:30]!r})")
        check(any("Daten" in x for x in intros), f"duyduğum kelime (die Daten) bu turda tanıtıldı ({intros[:4]})")
        check(pg.locator("[data-test=garden-done]").count() == 1, f"tur baştan sona bitti ({n} soru)")
        txt = pg.inner_text("[data-test=garden-done]")
        check("doğru" in txt and "undefined" not in txt and "NaN" not in txt, "tur sonu özeti")
        # M1 günündeyken (Bugün'deki giriş günün Bahçesi'ni açar) günün kartlarından kalan varsa "Bir tur daha" (inceleme #66 P1-3)
        check(pg.locator("[data-test=garden-tomorrow]").count() == 1 or (pg.locator("[data-test=garden-kalan]").count() == 1 and pg.locator("[data-test=garden-again]").count() == 1),
              "tur sonunda yarın ne geleceği ya da günün kalan kartları yazıyor")
        if shots: shot(pg, "g03-tur-sonu", full=False)
        # ikinci tur: ilk turda doğru bilinen yeni kartlar artık ÜRETİM sorusuyla gelir (inceleme #59 P0-2)
        if pg.locator("[data-test=garden-again]").count():
            pg.click("[data-test=garden-again]")
        else:
            pg.click("[data-test=garden-back]"); pg.wait_for_selector("[data-tab=today]")
            pg.click("[data-test=garden-start]")
        pg.wait_for_selector("[data-test=garden], [data-test=garden-empty]")
        check(pg.locator(".card.err, [role=alert]").count() == 0, "ikinci tur hatasız açılıyor")
        ACTIVE = ("gq-tr_de", "gq-photo_say", "gq-gap", "gq-sep_perfekt", "gq-own_sentence")
        types2 = []; gaps = []; sonra = []; acildi = False; trde_bakildi = False
        k = 0
        while pg.locator("[data-test=garden]").count() and not pg.locator("[data-test=garden-done]").count() and k < 25:
            t = pg.locator("[data-test^=gq-]").first.get_attribute("data-test") if pg.locator("[data-test^=gq-]").count() else "intro"
            types2.append(t)
            if t in ACTIVE and shots and not any(x in ACTIVE for x in types2[:-1]):
                shot(pg, "g04-uretim", full=False)
            pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')")
            no_overflow(pg, f"%130 yazı Bahçe {t}")
            if t in ("gq-gap", "gq-sep_perfekt"):
                # ipucu soru sırasında kapalı, düğmeyle açılır (PM 7004537514-2); kart metninde ipucu ya da cevap yok
                kart = pg.inner_text(f"[data-test={t}]")
                cev = (pg.get_attribute("[data-test=garden]", "data-cevap") or "") if pg.locator("[data-test=garden][data-cevap]").count() else ""
                gaps.append(pg.locator("[data-test=ipucu-ac]").count() == 1 and pg.locator("[data-test=ipucu]").count() == 0 and (not cev or cev not in kart))
                if not acildi:
                    pg.click("[data-test=ipucu-ac]"); acildi = pg.locator("[data-test=ipucu]").count() == 1 and pg.locator("[data-test=ipucu-ac]").count() == 0
                # yanlış cevaptan sonra ipucu açıklama olarak, cevaptan sonra ipucu düğmesi yok
                answer_current_wrong_check = True
                pg.fill("[data-test=answer]", "xyz falsch"); pg.click("[data-test=submit]"); pg.wait_for_selector("[data-test=next]")
                sonra.append(pg.locator("[data-test=ipucu-sonra]").count() == 1 and pg.locator("[data-test=ipucu-ac]").count() == 0)
                advance(pg); k += 1; continue
            if t == "gq-tr_de" and not trde_bakildi:
                pg.fill("[data-test=answer]", "xyz falsch"); pg.click("[data-test=submit]"); pg.wait_for_selector("[data-test=next]")
                trde_bakildi = True; check(pg.locator("[data-test=ipucu-sonra]").count() == 0, "tr_de yanlışından sonra boşluk ipucu çıkmıyor (inceleme #85 P1-1)")
                advance(pg); k += 1; continue
            answer_current(pg); k += 1
        check(any(t in ACTIVE for t in types2), f"ikinci turda üretim sorusu var ({sorted(set(types2))})")
        check(len(gaps) > 0 and all(gaps), f"boşluk sorusunda ipucu soru sırasında kapalı, düğme var, cevap kartta yok ({len(gaps)} soru)")
        check(acildi, "İpucu göster'e dokununca ipucu açılıyor, düğme kalkıyor")
        check(len(sonra) > 0 and all(sonra), f"yanlış cevaptan sonra ipucu açıklama olarak görünüyor, ipucu düğmesi yok ({len(sonra)})")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
