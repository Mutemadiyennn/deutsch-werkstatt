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
        check("Bu bölüm tamam" in t or "Yeni öğrenilecek" in t, "aşama 1 bitti; yanlış doğrulanan 'bilmiyorum'a döndü")
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
        check("Aşama 1–2 süresi" in t and "kart başına" in t and "hatırlama" in t, f"ölçüm: süre, kart başına süre, hatırlama ({t.splitlines()[-1][:80] if t else ''})")
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
            ans = d["accepted"][0] if d["k"] != "gap" else d["de"].replace("___", d["accepted"][0])
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
        page.fill("#nm", "Novak"); page.press("#nm", "Tab"); page.click("[data-address=Frau]"); page.wait_for_timeout(300)
        n0 = len(API_CALLS)
        open_section(page, "roleplay"); page.wait_for_selector("[data-test=rp-start]"); page.click("[data-test=rp-start]")
        page.fill("[data-test=answer]", "Guten Tag, hier ist Frau Novak."); page.click("[data-test=submit]")
        page.locator("[data-test=rp-chat] .bubble.them").nth(1).wait_for()
        bodies = [c["body"] or "" for c in API_CALLS[n0:] if c["url"].endswith("/v1/ai/run")]
        check(bodies and all("Novak" not in b for b in bodies), "yapay zekâ isteklerinde ad yok")
        check(any('"address_de": "Frau"' in b or '"address_de":"Frau"' in b for b in bodies) and any("[Name]" in b for b in bodies), "yapay zekâya yalnızca hitap + [Name] gidiyor")

        print("8) uzun basma = 'Bu ne demek?'")
        open_section(page, "chunks")
        page.wait_for_selector("[data-test=ifade-card] .wordpanel .w, [data-test=say-q], [data-test=meaning-q], [data-test=section-done], .empty")
        if not page.locator("[data-test=ifade-card]").count():
            page.goto(f"http://127.0.0.1:{PORT}/#/scenario/{SC}/listening"); page.wait_for_selector("[data-test=to-questions], button.opt[data-opt]")
        el = page.locator("[data-test=ifade-card] .wordpanel .w, .card .de-lg[lang=de]").first
        bb = el.bounding_box()
        # uzun basma: işaretçi olaylarını doğrudan gönder (WebKit dokunmatik öykünmesinde fare olayları güvenilir değil)
        pt = {"clientX": bb["x"] + 10, "clientY": bb["y"] + 10, "bubbles": True, "pointerType": "touch", "isPrimary": True}
        el.dispatch_event("pointerdown", pt); page.wait_for_timeout(1300); el.dispatch_event("pointerup", pt)
        check(page.locator("[data-test=lp-sheet]").count() == 1, "Almanca metne uzun basınca 'Bu ne demek?' sayfası açıldı")
        if page.locator("[data-test=lp-sheet]").count():
            page.click("[data-test=lp-sheet] [data-test=explain]")
            page.wait_for_selector("[data-test=lp-sheet] .fb.info b")
            page.click("[data-test=lp-sheet] >> text=Kapat")
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
                    check("Leitung war schlecht" in pg.inner_text("[data-test=rp-chat]"), f"{name}: geç gelen yanıt kullanıldı")
                else:
                    pg.click("[data-test=rp-offline]")
                    pg.locator("[data-test=rp-chat] .bubble.them").nth(1).wait_for(timeout=5000)
                    check(True, f"{name}: yapay zekâsız devam edildi")
            except Exception as e:
                check(False, f"{name}: seçenek görünmedi ({str(e)[:80]})")
            b2.close()

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
