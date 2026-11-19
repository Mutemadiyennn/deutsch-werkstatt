"""
v2 senaryo oynatıcısı uçtan uca testi: aşama 1–6 + dinleme, klavye öznitelikleri, uzun basma,
dayanıklılık (429/503/zaman aşımı/bozuk JSON/ağ kopması), uzun kelime taşması (320/390), %130 yazı.
Çalıştırma: python3 tests/e2e/v2_player.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import re, time, json
from playwright.sync_api import sync_playwright
from common import (HELD, check, serve, launch, new_page, shot, no_overflow, login_onboard, content_file, finish, API_CALLS, RP_STATE, default_ai, ERR)

PORT = 4181
SC = "sc:telefon:01-arzttermin"
START = re.compile(r"^(ich|du|er|sie|es|wir|ihr|wie|wo|was|wann|wer|warum|der|die|das|ein|eine|kann|können|könnten|haben|hast|hat|ist|bist|sind|gibt|geht|ja|nein|bitte|dann|also|und|aber|am|um|seit|mir|mein|meine)$", re.I)

def file_of(sid):
    return "scenarios/" + sid.replace(":", "_") + ".json"

def chip_tokens(target):
    t = [re.sub(r"[.,!?;:„“\"]", "", w) for w in target.split()]
    t = [w for w in t if w]
    if t and START.match(t[0]): t[0] = t[0].lower()
    return t

def submit_text(page, text):
    """Yazı alanı ya da kelime çipleri — hangisi görünüyorsa"""
    page.wait_for_selector("[data-test=answer], [data-chip]")
    if page.locator("[data-test=answer]").count():
        page.fill("[data-test=answer]", text)
        page.click("[data-test=submit]")
    else:
        for w in chip_tokens(text):
            page.locator(f'[data-chip="{w}"]:not([disabled])').first.click()
        page.click("[data-test=submit]")
    page.wait_for_selector("[data-test=verdict]")

def pick_text(page, txt):
    opts = page.locator("button.opt[data-opt]")
    for k in range(opts.count()):
        if opts.nth(k).inner_text().strip() == txt.strip():
            opts.nth(k).click(); return True
    opts.first.click(); return False

def open_section(page, k):
    page.goto(f"http://127.0.0.1:{PORT}/#/scenario/{SC}/{k}")
    page.wait_for_selector(".pbar h1")

def done(page):
    page.wait_for_selector("[data-test=section-done]")
    t = page.inner_text("[data-test=section-done]")
    page.click("[data-test=back-to-scenario]")
    page.wait_for_selector("[data-section]")
    return t

def main():
    srv = serve(PORT)
    s = content_file(file_of(SC))
    lx = {x["id"]: x for x in content_file("lexemes.json")["lexemes"]}
    with sync_playwright() as p:
        b, ctx = launch(p)
        page = new_page(ctx)
        print(f"[{p.__class__.__name__}] tarayıcı={b.browser_type.name}")
        login_onboard(page, PORT)
        page.wait_for_selector("[data-tab=today]")

        print("0) senaryo ana sayfası")
        page.goto(f"http://127.0.0.1:{PORT}/#/scenario/{SC}")
        page.wait_for_selector("[data-test=continue]")
        check(page.locator("[data-section]").count() == 7, "7 bölüm (aşama 1–6 + dinleme) listeleniyor")
        check(page.locator("a[data-section]").count() == 1, "yalnızca ilk bölüm açık (sıralı kilit)")
        shot(page, "p00-scenario-home"); no_overflow(page, "senaryo ana sayfası")

        print("1) Aşama 1 · Dinle ve tara (D-050: önce duy → tarama → biliyorum doğrulanır)")
        page.click("[data-test=continue]")
        page.wait_for_selector("[data-test=stage-intro]")
        check(page.locator("[data-test=subtitles]").count() == 0, "ilk dinleme altyazısız")
        try: page.wait_for_selector("[data-test=budget]", timeout=3000); ok = True
        except Exception: ok = False
        check(ok, "süre bütçesi (≤8 dk) üstte görünüyor")
        shot(page, "p01-stage-intro", full=False); no_overflow(page, "aşama 1 giriş")
        page.click("[data-test=to-subtitles]")
        page.wait_for_selector("[data-test=subtitles]")
        check(page.locator("[data-test=subtitles] [lang=de]").count() >= 4, "ikinci dinleme altyazılı (diyalog satırları + Türkçe)")
        page.click("[data-test=to-scan]")
        page.wait_for_selector("[data-test=scan]")
        rows = page.locator(".scanrow")
        nrows = rows.count()
        texts = [rows.nth(k).inner_text().split("\n")[0].strip() for k in range(nrows)]
        FUNC = {"ich", "und", "bitte", "ein", "eine", "der", "die", "das", "nicht", "ja", "nein"}
        check(nrows > 0 and not any(t.lower() in FUNC for t in texts), f"tarama: {nrows} ifade, işlev kelimesi yok")
        check(sum(1 for t in texts if " " in t) >= nrows * 0.6, "tarama birimi ifade (çoğu çok kelimeli)")
        # dokunma hedefleri ≥44 px
        small = page.evaluate("""[...document.querySelectorAll('button, a.btn, a.iconbtn, .opt')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 44); }).map(e => (e.getAttribute('aria-label') || e.innerText || e.className).slice(0, 30))""")
        check(not small, f"dokunma hedefleri ≥44 px ({small[:5]})")
        shot(page, "p01-scan", full=False); no_overflow(page, "tarama")
        rows.nth(0).locator("[data-mark=known]").click(); rows.nth(1).locator("[data-mark=known]").click()
        if nrows > 2: rows.nth(2).locator("[data-mark=unsure]").click()
        page.click("[data-test=rest-unknown]")
        check("doğrula" in page.inner_text("[data-test=scan-done]"), "'biliyorum' denenler doğrulanacak")
        page.click("[data-test=scan-done]")
        page.wait_for_selector("[data-test=meaning-q]"); page.click("button.opt[data-right='1']"); page.click("[data-test=next]")
        page.wait_for_selector("[data-test=meaning-q] button.opt:not([disabled])"); page.click("[data-test=meaning-q] button.opt:not([data-right]) >> nth=0"); page.click("[data-test=next]")
        t = done(page)
        check("ifade öğreneceksin" in t and "0/" not in t and "tekrar açtım" not in t, "aşama 1 bitti: puan yok, yalnızca kaç ifade öğrenileceği (PM-035 §5)")
        check(page.locator("a[data-section=chunks]").count() == 1, "aşama 2 açıldı")

        print("2) Aşama 2 · İfadeler (≤12 yeni öğe, ifade kartı, her 4 kartta hatırlama, 'Anladım' yok)")
        open_section(page, "chunks")
        tr2de = {}
        guard = 0; cards_seen = 0; recall_seen = 0
        while guard < 120:
            guard += 1
            page.wait_for_selector("[data-test=ifade-card], [data-test=meaning-q], [data-test=say-q], [data-test=section-done]")
            if page.locator("[data-test=section-done]").count(): break
            check(page.locator("button:has-text('Anladım')").count() == 0, "pasif 'Anladım' düğmesi yok") if guard == 1 else None
            if page.locator("[data-test=ifade-card]").count():
                de = page.locator("[data-test=ifade-card] .wordpanel .w").inner_text().strip()
                tr = page.locator("[data-test=ifade-card] .wordpanel .tr").inner_text().strip()
                tr2de[tr] = de; cards_seen += 1
                if cards_seen == 1:
                    shot(page, "p02-ifade-card", full=False); no_overflow(page, "ifade kartı")
                    check(page.locator("[data-test=known-skip]").count() == 1, "tanıtım kartında yalnızca 'Biliyorum, geç' seçeneği")
                if cards_seen == 2:
                    page.click("[data-test=known-skip]"); continue
                page.click("[data-test=type-repeat]")
                if cards_seen == 3:  # PM-032: uzak tekrar → yüzde yok, "bir daha dinle" + ilk kelime + 44 pt "Yavaş dinle"
                    page.fill("[data-test=answer]", "Hallo Welt"); page.click("[data-test=submit]")
                    page.wait_for_selector("[data-test=slow-listen]"); page.wait_for_timeout(400)  # açılış animasyonu (pop) bitsin
                    body = page.inner_text("main")
                    check("Bir daha dinle" in body and "%" not in body, "uzak tekrarda yüzde yok, 'Bir daha dinle ve söyle'")
                    h = page.locator("[data-test=slow-listen]").bounding_box()["height"]
                    check(h >= 44, f"'Yavaş dinle' dokunma hedefi ≥44 pt ({h:.0f})")
                    shot(page, "p02b-tekrar-ipucu", full=False)
                page.fill("[data-test=answer]", de); page.click("[data-test=submit]")
                for _ in range(50):  # otomatik geçiş (≈0,7 sn): kart değişene ya da hatırlama gelene kadar
                    page.wait_for_timeout(100)
                    if not page.locator("[data-test=ifade-card]").count() or page.locator("[data-test=ifade-card] .wordpanel .w").inner_text().strip() != de: break
                else: check(False, f"doğru tekrar kartı geçirmedi: {de}")
                continue
            if page.locator("[data-test=meaning-q]").count():
                recall_seen += 1
                if cards_seen != 4 and recall_seen == 1: check(False, f"hatırlama turu 4 karttan sonra gelmeli ({cards_seen})")
                page.click("[data-test=meaning-q] button.opt[data-right='1']"); page.click("[data-test=next]"); continue
            prompt = page.locator("[data-test=say-q] .de-lg").inner_text().strip()
            submit_text(page, tr2de.get(prompt, "x"))
            page.click("[data-test=verdict] [data-test=next]")
        check(0 < cards_seen <= 12, f"yeni öğe sayısı ≤12 ({cards_seen})")
        t = page.inner_text("[data-test=section-done]")
        check("Aşama 1–2 yaklaşık" in t and "kart başına" in t and "hatırlama" in t, f"ölçüm: süre, kart başına süre, hatırlama ({t.splitlines()[-1][:80] if t else ''})")
        page.click("[data-test=back-to-scenario]"); page.wait_for_selector("[data-section]")

        print("3) Aşama 3 · Cümle kurma (yazı + kelime çipleri)")
        open_section(page, "build")
        inp = page.locator("[data-test=answer], [data-chip]").first
        page.wait_for_selector("[data-test=answer], [data-chip]")
        if page.locator("[data-chip]").count():
            shot(page, "p03-build-chips", full=False)
            page.click("text=Yaz / söyle")
        a = page.locator("[data-test=answer]")
        attrs = a.evaluate("e => [e.lang, e.getAttribute('autocorrect'), e.getAttribute('autocapitalize'), e.spellcheck, e.autocomplete]")
        check(attrs == ["de", "off", "off", False, "off"], f"cevap alanı: lang=de, otomatik düzeltme/büyük harf kapalı, yazım denetimi yok ({attrs})")
        check(page.locator(".umlauts button").count() == 7, "ä ö ü ß Ä Ö Ü şeridi")
        page.click(".umlauts button:has-text('ä')")
        check(a.input_value() == "ä", "şerit harfi imlece ekliyor")
        a.fill("")
        for i, it in enumerate(s["build"]):
            ans = it["accepted"][0]
            if i == 0: ans = ans.rstrip("?.!") + ". "  # iOS otomatik nokta + boşluk
            submit_text(page, ans)
            ok = page.locator("[data-test=verdict] .fb.ok").count() == 1
            if not ok: check(False, f"cümle kurma doğru cevap kabul edilmedi: {ans}")
            if i == 0: shot(page, "p03-build-feedback", full=False)
            page.click("[data-test=verdict] [data-test=next]")
        t = done(page)
        check("Bu bölüm tamam" in t, f"cümle kurma tamamlandı ({len(s['build'])} madde)")

        print("4) Aşama 4 · Alıştırma")
        open_section(page, "drills")
        for i, d in enumerate(s["drills"]):
            if d["k"] == "pick":
                page.wait_for_selector("button.opt[data-opt]")
                page.locator(f"button.opt[data-opt='{d['ans']}']").click()
                page.click("[data-test=next]")
                continue
            # adsız profil: öğrenci kendi adını yazar (yer tutucu "{name}" ad değildir; bilinen kelime "Name" ad sayılmaz)
            ans = (d["accepted"][0] if d["k"] != "gap" else d["de"].replace("___", d["accepted"][0])).replace("{name}", "Ayşe")
            if d["k"] == "order" and not d.get("accepted"): ans = d["de"]
            submit_text(page, ans)
            if i == 1: shot(page, "p04-drill", full=False)
            if not page.locator("[data-test=verdict] .fb.ok").count(): check(False, f"alıştırma {d['id']} ({d['k']}) doğru cevap kabul edilmedi")
            page.click("[data-test=verdict] [data-test=next]")
        t = done(page)
        check("Bu bölüm tamam" in t, f"alıştırma tamamlandı ({len(s['drills'])} madde)")

        print("5) Dinleme (altyazısız → soru → transkript)")
        open_section(page, "listening")
        os_tr = {o["tr"] for o in s["otherSide"]}
        guard = 0
        li_i = 0; q_i = 0
        while guard < 200:
            guard += 1
            page.wait_for_selector("button.opt[data-opt]:not([disabled]), [data-test=play-all], [data-test=next], [data-test=section-done]")
            if page.locator("[data-test=section-done]").count(): break
            if page.locator("[data-test=play-all]").count():
                check(not page.locator(".card .de-lg[lang=de]").count(), "dinleme öncesi metin gösterilmiyor")
                page.click("[data-test=to-questions]"); q_i = 0; continue
            if page.locator("button.opt[data-opt]:not([disabled])").count():
                kick = page.locator(".card .kicker").first.text_content()
                if "Karşı taraf" in kick:
                    opts = [page.locator("button.opt[data-opt]").nth(k).inner_text() for k in range(page.locator("button.opt[data-opt]").count())]
                    pick_text(page, next((o for o in opts if o in os_tr), opts[0]))
                else:
                    qq = s["listening"][li_i]["qs"][q_i]
                    page.locator(f"button.opt[data-opt='{qq['ans']}']").click(); q_i += 1
                page.click("[data-test=next]"); continue
            if page.locator("text=Transkript").count():
                page.locator("[data-test=rp-chat], .card .de-lg[lang=de] span").first.click()
                page.wait_for_selector(".toast")
                check("listene eklendi" in page.inner_text(".toast"), "transkriptte kelimeye dokununca kişisel listeye eklendi")
                li_i += 1
            page.click("[data-test=next]")
        done(page)

        print("6) Aşama 5 · Destekli diyalog")
        open_section(page, "dialogue")
        d0 = s["dialogues"][0]
        for k, ln in enumerate(d0["lines"]):
            if ln["r"] == "A":
                page.wait_for_selector("[data-test=next]")
                page.click("[data-test=next]")
            else:
                page.wait_for_selector("[data-test=your-turn]")
                if k <= 2: shot(page, "p05-dialogue", full=False)
                submit_text(page, (ln.get("accepted") or [ln["de"]])[0])
                page.click("[data-test=verdict] [data-test=next]")
        t = done(page)
        check("Bu bölüm tamam" in t, "destekli diyalog tamamlandı")

        print("7) Aşama 6 · Rol oyunu (yapay zekâ ortak, sonunda rapor)")
        open_section(page, "roleplay")
        page.wait_for_selector("[data-test=rp-start]")
        page.click("[data-test=rp-start]")
        page.wait_for_selector("[data-test=rp-chat] .bubble.them")
        for n, say in enumerate(["Guten Tag, ich brauche einen Termin.", "Ja, ich habe die Karte dabei.", "Ja, Dienstag passt gut."]):
            page.fill("[data-test=answer]", say); page.click("[data-test=submit]")
            page.locator("[data-test=rp-chat] .bubble.them").nth(n + 1).wait_for()
        shot(page, "p06-roleplay", full=False)
        rp = [json.loads(c["body"]) for c in API_CALLS if c["url"].endswith("/v1/ai/run") and c["body"] and '"roleplay_turn"' in c["body"]]
        check(len(rp) >= 2, f"rol oyunu sunucuya soruldu ({len(rp)} tur)")
        if rp:
            v = rp[-1]["vars"]
            check(v["history"][-1]["r"] == "learner" and "goals_de" in v and "partner_de" in v, "tur isteğinde geçmiş + hedefler var, prompt metni yok")
        page.click("[data-test=rp-end]")
        page.wait_for_selector("[data-test=rp-report]", timeout=15000)
        page.wait_for_selector("[data-test=rp-report] .big")
        rep = page.inner_text("[data-test=rp-report]")
        check("Ich hätte gern einen Termin." in rep and "Kibar istek" in rep, "rapor: en önemli düzeltmeler Türkçe açıklamalı")
        check("der Vormittag" in rep, "eksik ifade kişisel listeye eklendi")
        shot(page, "p07-roleplay-report")
        page.click("[data-test=back-to-scenario]")
        page.wait_for_selector("[data-section]")
        check(page.locator("[data-section].done").count() == 7, "7/7 bölüm tamam")

        print("7b) öğrenci kimliği (D-061): ad yalnızca cihazda; yapay zekâya '[Name]' + hitap")
        page.goto(f"http://127.0.0.1:{PORT}/#/profile"); page.wait_for_selector("#nm")
        # ad alanı odaktayken doğrudan hitaba dokunulur (iPhone'da alan bırakılmayabilir): ad yine kaydedilmeli
        page.fill("#nm", "Novak"); page.click("[data-address=Frau]")
        # iki kayıt da diske yazılmadan rol oyununa geçilmez: yavaş WebKit koşucusunda 300 ms yetmiyordu (inceleme #68 2. tur)
        page.wait_for_function("() => document.querySelector('[data-address=Frau]')?.getAttribute('aria-pressed') === 'true'")
        page.wait_for_timeout(600); page.reload(); page.wait_for_selector("#nm")
        check(page.input_value("#nm") == "Novak" and page.get_attribute("[data-address=Frau]", "aria-pressed") == "true", "ad ve hitap birlikte kaydedildi (yeniden yüklemeden sonra)")
        n0 = len(API_CALLS)
        open_section(page, "roleplay"); page.wait_for_selector("[data-test=rp-start]"); page.click("[data-test=rp-start]")
        page.fill("[data-test=answer]", "Guten Tag, hier ist Frau Novak."); page.click("[data-test=submit]")
        page.locator("[data-test=rp-chat] .bubble.them").nth(1).wait_for()
        # yavaş cihazda istek baloncuktan sonra kaydedilebilir: rol oyunu isteği gelene kadar bekle (en çok 15 sn)
        for _ in range(60):
            if any(c["url"].endswith("/v1/ai/run") and "roleplay_turn" in (c["body"] or "") for c in API_CALLS[n0:]): break
            page.wait_for_timeout(250)
        bodies = [c["body"] or "" for c in API_CALLS[n0:] if c["url"].endswith("/v1/ai/run")]
        # boş liste "ad yok" sayılmaz; tanı için yakalanan istekler yazılır (inceleme #66 P1-5)
        if not bodies: print("   tanı: 7b'de yapay zekâ isteği yakalanmadı; son istekler:", [c["url"][-40:] for c in API_CALLS[-6:]], "baloncuk:", page.locator("[data-test=rp-chat] .bubble.them").count())
        check(bool(bodies), f"7b: rol oyunu yapay zekâ isteği yakalandı ({len(bodies)})")
        check(bodies and all("Novak" not in b for b in bodies), "yapay zekâ isteklerinde ad yok")
        check(any('"address_de": "Frau"' in b or '"address_de":"Frau"' in b for b in bodies) and any("[Name]" in b for b in bodies), "yapay zekâya yalnızca hitap + [Name] gidiyor")

        print("8) uzun basma = 'Bu ne demek?'")
        open_section(page, "chunks")
        page.wait_for_selector("[data-test=ifade-card] .wordpanel .w, [data-test=say-q], [data-test=meaning-q], [data-test=section-done], .empty")
        if not page.locator("[data-test=ifade-card]").count():
            page.goto(f"http://127.0.0.1:{PORT}/#/scenario/{SC}/listening"); page.wait_for_selector("[data-test=to-questions], button.opt[data-opt]")
        # hedef: dışlanmayan (düğme/seçenek/giriş içinde olmayan), görünür ilk Almanca öğe — JS ile işaretlenir (WebKit'te deterministik)
        desc = ""
        for _ in range(20):
            desc = page.evaluate("""() => { document.querySelectorAll('[data-lp-target]').forEach(e => e.removeAttribute('data-lp-target'));
              const ok = [...document.querySelectorAll('main [lang="de"]')].find(e => !e.closest('input,textarea,button,a,.wchip,.opt,[data-test=lp-sheet]') && e.getBoundingClientRect().height > 0 && (e.innerText||'').trim());
              if (!ok) return ''; ok.setAttribute('data-lp-target', '1'); return ok.tagName + '.' + ok.className + ': ' + ok.innerText.trim().slice(0, 40); }""")
            if desc: break
            page.wait_for_timeout(250)
        el = page.locator("[data-lp-target]")
        # basış noktası görünür alanda olmalı: caretRangeFromPoint yalnızca görünen noktada metin bulur (WebKit iPhone 15 dalgalanması)
        el.scroll_into_view_if_needed(); page.wait_for_timeout(150)
        bb = el.bounding_box()
        # uzun basma: işaretçi olaylarını doğrudan gönder (WebKit dokunmatik öykünmesinde fare olayları güvenilir değil)
        pt = {"clientX": bb["x"] + 10, "clientY": bb["y"] + 10, "bubbles": True, "pointerType": "touch", "isPrimary": True, "pointerId": 7}
        page.evaluate("""() => { window.__lpdbg = []; for (const k of ['pointerdown','pointerup','pointercancel','pointermove','contextmenu']) document.addEventListener(k, (e) => window.__lpdbg.push(k + ':' + (e.target && e.target.tagName) + ':' + Math.round(performance.now())), true); }""")
        el.dispatch_event("pointerdown", pt)
        # PM-013 kök neden: WebKit iPhone 15 öykünmesi basış sırasında farenin eski konumundan (bir düğmenin üstü) pointermove gönderiyordu
        # ve uzun basmayı iptal ediyordu. Aynı durumu her tarayıcıda bilerek üret: başka işaretçinin uzak hareketi basışı bozmamalı.
        page.dispatch_event("body", "pointermove", {"clientX": 5, "clientY": 5, "bubbles": True, "pointerType": "mouse", "isPrimary": True, "pointerId": 1})
        opened = False
        for _ in range(16):
            page.wait_for_timeout(250)
            if page.locator("[data-test=lp-sheet]").count(): opened = True; break
        el.dispatch_event("pointerup", pt)
        dbg = "" if opened else page.evaluate("() => JSON.stringify({ev: window.__lpdbg, url: location.hash, tgt: !!document.querySelector('[data-lp-target]')})")
        check(opened, f"Almanca metne uzun basınca 'Bu ne demek?' sayfası açıldı (hedef: {desc}) {dbg}")
        if page.locator("[data-test=lp-sheet]").count():
            # #58 A11: cevap yapay zekâ beklenmeden cihazdaki sözlükten (ifade, kelime ya da kelime kelime) gelir
            n_lp = len(API_CALLS)
            page.wait_for_selector("[data-test=lp-sheet] [data-test=explain-out] >> nth=-1")
            page.wait_for_function("() => !document.querySelector('[data-test=lp-sheet]').innerText.includes('Sözlük açılıyor')", timeout=10_000)
            yerel = page.locator("[data-test=lp-sheet] [data-test=yerel-cevap], [data-test=lp-sheet] [data-test=yerel-kelimeler]").count()
            ai_lp = [c for c in API_CALLS[n_lp:] if c["url"].endswith("/v1/ai/run") and "explain_tr" in (c["body"] or "")]
            check(yerel > 0 and not ai_lp, f"uzun basma: cihazdaki sözlükten hemen cevap, yapay zekâ isteği yok ({yerel} yerel, {len(ai_lp)} istek; {page.locator('[data-test=lp-sheet]').inner_text()[:120]!r})")
            # parmağın altındaki kelime (basış noktası öğenin sol üstü + 10 px: ilk kelime) ayrıca açıklanıyor (inceleme #76 P1-7)
            ilk_kelime = desc.split(": ", 1)[-1].split()[0].strip(".,!?„“\"") if ": " in desc else ""
            if len(desc.split(": ", 1)[-1].split()) > 1:
                lk = page.locator("[data-test=lp-sheet] [data-test=lp-kelime]")
                check(lk.count() == 1 and ilk_kelime.lower() in lk.inner_text().lower(), f"uzun basma: parmağın altındaki kelime ({ilk_kelime!r}) ayrıca açıklanıyor ({lk.inner_text()[:60] if lk.count() else 'yok'!r})")
            if page.locator("[data-test=lp-sheet] [data-test=explain-ai]").count():
                page.locator("[data-test=lp-sheet] [data-test=explain-ai]").first.click()
                for _ in range(40):
                    ai_lp = [c["body"] or "" for c in API_CALLS[n_lp:] if c["url"].endswith("/v1/ai/run") and "explain_tr" in (c["body"] or "")]
                    if ai_lp: break
                    page.wait_for_timeout(250)
                check(ai_lp and all("Novak" not in b for b in ai_lp), "'Öğretmene sor' isteğinde ad yok (D-061)")
            page.click("[data-test=lp-kapat]")
        sel = page.evaluate("getComputedStyle(document.body).webkitUserSelect || getComputedStyle(document.body).userSelect")
        check(sel == "none", f"genel metin seçimi kapalı ({sel})")
        ctx.close()

        print("9) dayanıklılık: hatada ekranda kal + Türkçe mesaj; gecikmede 12 sn'de 'Biraz uzun sürüyor' (istek kesilmez)")
        for name, resp in [("429 (Worker biçimi)", (429, {"error": {"code": "quota_upstream", "message_tr": "Google'ın ücretsiz kullanım sınırına ulaşıldı. Biraz sonra tekrar dene.", "retryable": True}})),
                           ("503 (çıplak)", (503, {})), ("bozuk JSON (502 çıplak)", (502, {"x": 1})), ("ağ kopması", ("abort", None)),
                           ("yanıt yok", ("hang", None)), ("geç yanıt (Bekle)", ("hold", {"reply_de": "Entschuldigung, die Leitung war schlecht. Wann passt es Ihnen?", "end": False}))]:
            def h(task, v, resp=resp):
                if task in ("roleplay_turn", "equiv_check", "explain_tr", "say_it_de"): return resp
                return default_ai(task, v)
            b2, c2 = launch(p)
            pg = new_page(c2, h)
            login_onboard(pg, PORT)
            pg.wait_for_selector("[data-tab=today]")
            pg.goto(f"http://127.0.0.1:{PORT}/#/scenario/{SC}/roleplay")
            pg.wait_for_selector("[data-test=rp-start]")
            pg.click("[data-test=rp-start]")
            pg.fill("[data-test=answer]", "Guten Tag, ich brauche einen Termin."); t0 = time.time(); pg.click("[data-test=submit]")
            try:
                pg.wait_for_selector("[data-test=rp-offline]", timeout=15000); dt = time.time() - t0
                slow = pg.locator("[data-test=rp-slow]").count() == 1
                msg = pg.inner_text("[data-test=rp-slow]" if slow else "[role=alert]")
                check(dt <= 12.0 and pg.url.endswith("/roleplay"), f"{name}: aynı ekranda {dt:.1f} sn içinde seçenek")
                check(bool(re.search(r"[çğıöşüÇĞİÖŞÜ]", msg)), f"{name}: Türkçe mesaj ({msg.splitlines()[0][:60]!r})")
                if resp[0] in ("hang", "hold"):
                    check(slow and pg.locator("[data-test=rp-wait]").count() == 1 and pg.locator("[data-test=rp-retry]").count() == 1, f"{name}: 'Biraz uzun sürüyor' + Bekle / Tekrar dene / Yapay zekâsız devam")
                if resp[0] == "hold":
                    pg.click("[data-test=rp-wait]")
                    check(pg.locator("[data-test=rp-slow]").count() == 0, f"{name}: Bekle → seçenekler kapandı, istek sürüyor")
                    r, task, out = HELD.pop()
                    r.fulfill(status=200, headers={"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}, body=json.dumps({"task": task, "output": out, "model": "m", "ms": 15000}))
                    pg.locator("[data-test=rp-chat] .bubble.them").nth(1).wait_for(timeout=5000)
                    late = False
                    for _ in range(20):  # metin bir sonraki çizimde gelebilir
                        if "Leitung war schlecht" in (pg.text_content("[data-test=rp-chat]") or ""): late = True; break
                        pg.wait_for_timeout(250)
                    check(late, f"{name}: geç gelen yanıt kullanıldı (görev: {task})")
                else:
                    pg.click("[data-test=rp-offline]")
                    pg.locator("[data-test=rp-chat] .bubble.them").nth(1).wait_for(timeout=5000)
                    check(True, f"{name}: yapay zekâsız devam edildi")
            except Exception as e:
                check(False, f"{name}: seçenek görünmedi ({str(e)[:80]})")
            b2.close()

        print("9b) tasarım kabulü (PM-006/PM-016, TS-4): emoji 0, gösterge ≤1, saniye sayacı yok, ana eylem ≥56 px")
        EMOJI = r"""() => { const t = document.body.innerText; const m = t.match(/\p{Extended_Pictographic}/gu) || []; return m.filter((c) => !"©®™".includes(c)); }"""
        IND = "[data-progress]"  # TS-4: görünür ilerleme göstergeleri data-progress ile işaretlenir
        SECS = r"""() => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const out = [];
            while (w.nextNode()) { const n = w.currentNode, el = n.parentElement; if (!el || !el.offsetParent && getComputedStyle(el).position !== 'fixed') continue;
              if (/\b\d{1,2}:\d{2}\b/.test(n.textContent || '')) out.push(n.textContent.trim().slice(0, 30)); } return out; }"""
        PRIM = r"""() => [...document.querySelectorAll('.btn.primary, .micwide')].filter((b) => b.offsetParent).map((b) => { const r = b.getBoundingClientRect(); return [Math.round(r.height), Math.round(r.bottom), innerHeight]; })"""
        b5, c5 = launch(p); page = new_page(c5); login_onboard(page, PORT); page.wait_for_selector("[data-tab=today]")
        for name, hsh, sel in [("Bugün", "#/today", "[data-test=next-activity]"), ("ifade kartı", f"#/scenario/{SC}/chunks", "[data-test=ifade-card], [data-test=say-q], [data-test=meaning-q], [data-test=section-done], .empty"), ("gelen arama", f"#/call/{SC}", "[data-test=call]")]:
            page.goto(f"http://127.0.0.1:{PORT}/{hsh}"); page.wait_for_selector(sel); page.wait_for_timeout(300)
            em = page.evaluate(EMOJI)
            check(not em, f"{name}: emoji ikon yok ({''.join(em[:5])})")
            ind = page.locator(IND).count()
            check(ind <= 1, f"{name}: ilerleme göstergesi {ind} (≤1)")
            check("**" not in page.evaluate("document.body.innerText"), f"{name}: kalın işaretinin yıldızları ekranda görünmüyor (D-092)")
            if name == "ifade kartı" and page.locator("[data-test=ifade-card]").count():
                check(page.locator("[data-test=exp-chips] span").count() >= 2, "ifade kartı: kelime kelime çipler (OD-9.1 parcalar)")
                if page.locator("[data-test=why-open]").count():
                    page.click("[data-test=why-open]"); page.wait_for_selector("[data-test=why-sheet]")
                    check(page.locator("[data-test=why-sheet] .tip").count() >= 1, "ifade kartı: 'Neden böyle?' alt sayfası, satır başına tek fikir")
                    shot(page, "p09-why-sheet", full=False)
                    page.click("[data-test=why-close]")
            secs = page.evaluate(SECS)
            check(not secs, f"{name}: saniyeli sayaç yok ({secs[:2]})")
            prim = page.evaluate(PRIM)
            check(all(h >= 56 for h, _, _ in prim), f"{name}: ana eylem ≥ 56 px ({[p[0] for p in prim]})")
            if name == "ifade kartı" and prim: check(prim[0][1] > prim[0][2] * 0.6, f"{name}: ana eylem başparmak bölgesinde (alt %40)")
        check(page.locator("[data-test=call-accept]").count() == 1 and page.locator("[data-test=call-later]").count() == 1, "gelen arama: Aç + Sonra")
        page.click("[data-test=call-accept]"); page.wait_for_selector("[data-test=rp-start]")
        check(True, "gelen arama → Aç → rol oyunu")
        b5.close()

        print("9c) LS-17.0 mevsim: 30 Kasım'da Öğren'de 'Mevsimin dersi' (3 mini senaryo), mini senaryo 7 bölümle açılıyor")
        import datetime as _dt
        b6, c6 = launch(p); page = new_page(c6); page.clock.install(time=_dt.datetime(2026, 11, 30, 10, 0)); login_onboard(page, PORT); page.wait_for_selector("[data-tab=today]")
        page.goto(f"http://127.0.0.1:{PORT}/#/learn"); page.wait_for_selector("[data-test=season]")
        n_season = page.locator("[data-test=season] li a").count()
        check(n_season == 3, f"30 Kasım: mevsim kartında 3 mini senaryo ({n_season})")
        page.locator("[data-test=season] li a").first.click(); page.wait_for_selector("[data-section]")
        check(page.locator("[data-section]").count() == 7, "mini senaryo: 7 bölüm")
        shot(page, "p10-mini-scenario", full=False)
        for mid in ["sc:essen:m1-weihnachtsmarkt", "sc:freizeit:m1-gluehwein-einladung", "sc:arbeit:m1-weihnachtsfeier"]:
            for sec in ["words", "chunks", "build", "drills", "listening", "dialogue", "roleplay"]:
                page.goto(f"http://127.0.0.1:{PORT}/#/scenario/{mid}/{sec}"); page.wait_for_selector(".pbar h1"); page.wait_for_timeout(250)
                check(page.locator(".card.err, [role=alert]").count() == 0, f"{mid} · {sec}: hata paneli yok") if sec in ("build", "drills") else None
        page.clock.set_system_time(_dt.datetime(2026, 7, 1, 10, 0)); page.goto(f"http://127.0.0.1:{PORT}/#/learn"); page.wait_for_selector("[data-test=sozluk-ac]")
        check(page.locator("[data-test=season]").count() == 0, "Temmuz'da mevsim kartı yok")
        page.goto(f"http://127.0.0.1:{PORT}/#/today"); page.wait_for_selector("[data-test=next-activity]")
        # PM-044.1: mevsim dersi ana yolda değil, Öğren'de mevsim dışında listelenmiyor
        nxt = page.inner_text("[data-test=next-activity]")
        check(not any(w in nxt for w in ("Weihnacht", "Noel", "Glühwein")), f"Temmuz: Bugün'ün sıradaki dersi mevsim dersi değil ({nxt.splitlines()[0][:60] if nxt else ''})")
        for dom in ("arbeit", "essen", "freizeit"):
            page.goto(f"http://127.0.0.1:{PORT}/#/learn/{dom}"); page.wait_for_selector("main h1, main h2"); page.wait_for_timeout(200)
            t = page.inner_text("main")
            check(not any(w in t for w in ("Weihnacht", "Glühwein")), f"Temmuz: Öğren/{dom} altında mevsim dersi yok")
        b6.close()

        print("10) uzun Almanca kelimeler 320/390 px'te taşmıyor; %130 yazı boyutu")
        allw = sorted({w["de"] for w in lx.values()} | {c["layers"]["hd"] for c in s["chunks"]}, key=lambda x: -max(len(t) for t in x.split()))[:50]
        for width in (320, 390):
            b3, c3 = launch(p, viewport={"width": width, "height": 800})
            pg = new_page(c3)
            pg.goto(f"http://127.0.0.1:{PORT}/")
            pg.wait_for_selector("body")
            over = pg.evaluate("""(ws) => { const host = document.createElement('div'); host.className = 'app'; document.body.appendChild(host);
                const bad = []; for (const w of ws) { const c = document.createElement('div'); c.className = 'card'; c.innerHTML = '<div class=row style="flex-wrap:nowrap"><div class=grow><div lang=de class=de-xl></div></div><span class=listen><button>🔊</button><button class=spd>🐢</button></span></div>';
                  c.querySelector('.de-xl').textContent = w; host.appendChild(c); if (c.scrollWidth > c.clientWidth + 1 || document.documentElement.scrollWidth > innerWidth) bad.push(w); }
                return bad; }""", allw)
            check(not over, f"{width} px: en uzun 50 kelime taşmıyor (taşan: {over[:3]})")
            b3.close()
        b4, c4 = launch(p)
        pg = new_page(c4)
        login_onboard(pg, PORT)
        pg.wait_for_selector("[data-tab=today]")
        pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')")
        for hsh in ["#/today", f"#/scenario/{SC}", f"#/scenario/{SC}/words", f"#/scenario/{SC}/chunks", "#/progress", "#/profile"]:
            pg.goto(f"http://127.0.0.1:{PORT}/{hsh}"); pg.wait_for_timeout(500)
            pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')"); pg.wait_for_timeout(100)
            no_overflow(pg, f"%130 yazı {hsh}")
        fs = pg.evaluate("parseFloat(getComputedStyle(document.documentElement).fontSize)")
        check(abs(fs - 22.1) < 0.2, f"%130'da kök yazı {fs:.1f} px")
        shot(pg, "p08-text130", full=False)
        b4.close()
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
