"""
B5 (PM 7030294523, döngüsüzlük H4 §4): Bahçede bugün görülen kelime derste yeniden tanıtılmaz.
  - bugün cevaplanmış üç kart (Montag, Dienstag, Mittwoch) tohumlanır; "Günler" dersi açılır
  - tanıtımda bu kartlar yok; not "Bahçede bugün gördüğün 3 kelime …" görünür
  - hatırlama turunda bu kelimeler sorulmaz; tanıtımın sonunda her biri EN ÇOK BİR kez, cümle içinde seçmeli boşlukla gelir
  - yarıda yeniden açılan ders aynı konumdan ve aynı planla sürer
  - karşılaştırma: tohumsuz profilde ders eskisi gibi (not yok, Montag tanıtılır, Bahçe turu yok)
  python3 tests/e2e/v2_ders_bahce.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots] [--scheme dark]
"""
from datetime import datetime, timezone
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
from v2_ders import step, state, wait_change

PORT = 4229
DERS = "#/ders/r0%3A01-tage"
GORULEN = ["Montag", "Dienstag", "Mittwoch"]
YAZ = """async ([st, v]) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  await new Promise((ok, no) => { const t = d.transaction(st, 'readwrite'); t.objectStore(st).put(v); t.oncomplete = ok; t.onerror = no; }); d.close(); }"""

def kart(de, simdi):
    return {"itemId": f"lx:{de}", "kind": "lexeme", "passive": {"s": 0.4, "n": 1, "ok": 1, "last": simdi},
            "active": {"s": 0.2, "n": 1, "ok": 1, "last": simdi, "sessions": []}, "durable": False, "gaps": [], "inBank": True,
            "u": 1, "lastQ": "tr_de", "firstAt": {"passive": simdi}}

def tanitim_boyunca(pg, shots, etiket):
    """Tanıtım adımı bitene kadar ilerler; tanıtılan kelimeler, hatırlama istemleri ve Bahçe soruları toplanır"""
    tanit, hatirla, bahce = [], [], []
    for _ in range(80):
        m = pg.locator("[data-test=ders]")
        if not m.count() or m.get_attribute("data-adim") != "tanit": break
        if pg.locator("[data-test=ders-tanit]").count():
            tanit += [t.strip() for t in pg.locator("[data-test=teach] .de-lg").all_inner_texts()]
        elif pg.locator("[data-test=ders-bahce]").count():
            if shots and not bahce: shot(pg, f"{shots}/b5-bahce-{etiket}")
            no_overflow(pg, "Bahçe turu sorusu")
            cumle = pg.inner_text("[data-test=ders-bahce] .de-lg"); dogru = pg.inner_text("[data-test=ders-bahce] button.opt[data-right]")
            bahce.append((cumle, dogru.strip()))
            before = state(pg) + str(len(bahce))
            pg.click("[data-test=ders-bahce] button.opt[data-right]")
            pg.wait_for_selector("[data-test=ders-bahce] [data-test=next]")
            pg.click("[data-test=ders-bahce] [data-test=next]")
            pg.wait_for_function("""(n) => { const b = document.querySelector('[data-test=ders-bahce]'); return !b || +b.dataset.q >= n; }""", arg=len(bahce))
            continue
        elif pg.locator("[data-test=ders-hatirla]").count():
            hatirla.append(pg.inner_text("[data-test=ders-hatirla]"))
        step(pg)
    return tanit, hatirla, bahce

def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        # 1) bugün Bahçede üç kart görülmüş
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        simdi = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")
        for de in GORULEN: pg.evaluate(YAZ, ["items", kart(de, simdi)])
        pg.goto(base + DERS); pg.wait_for_selector("[data-test=ders-diyalog]")
        step(pg)  # diyalog → tanıtım (plan ilerlemeyle birlikte saklanır)
        pg.wait_for_selector("[data-test=ders-tanit]")
        not_ = pg.locator("[data-test=ders-bahce-not]")
        check(not_.count() == 1 and "3 kelime" in not_.inner_text(), f"tanıtımda Bahçe notu ({not_.inner_text() if not_.count() else 'yok'})")
        if shots: shot(pg, f"{shots}/b5-tanit")
        # yarıda kapat-aç: aynı konum, aynı plan
        once = pg.get_attribute("[data-test=ders]", "data-pos")
        ilk = pg.locator("[data-test=teach] .de-lg").first.inner_text().strip()
        pg.reload(); pg.wait_for_selector("[data-test=ders-tanit]")
        check(pg.get_attribute("[data-test=ders]", "data-pos") == once and pg.locator("[data-test=teach] .de-lg").first.inner_text().strip() == ilk,
              f"yeniden açılışta aynı konum ve aynı ilk kart ({once}, {ilk})")
        tanit, hatirla, bahce = tanitim_boyunca(pg, shots, "a")
        check(not any(t.split()[-1] == g for t in tanit for g in GORULEN), f"bugün görülen kartlar tanıtılmadı (tanıtılan: {tanit[:6]}…)")
        check(len(tanit) == 23 - 3, f"kalan 20 kart tanıtıldı ({len(tanit)})")
        # hatırlama: her tanıtılan kart için iki soru (anlam + yaz); bugün görülenler sorulmaz → 20 × 2
        check(len(hatirla) == 2 * len(tanit), f"hatırlama turu yalnızca tanıtılan kartları sordu ({len(hatirla)} soru, {len(tanit)} kart)")
        cevaplar = [d for _, d in bahce]
        check(1 <= len(bahce) <= 3 and len(set(cevaplar)) == len(cevaplar) and all(c in GORULEN for c in cevaplar),
              f"Bahçe turu: her kelime en çok bir kez, yalnızca bugün görülenler ({cevaplar})")
        check(all(len(c.split()) >= 3 for c, _ in bahce), f"Bahçe soruları cümle içinde ({[c for c, _ in bahce]})")
        check(pg.get_attribute("[data-test=ders]", "data-adim") != "tanit", "tanıtımdan sonra ders sürüyor")
        ctx.close(); b.close()

        # 2) karşılaştırma: tohumsuz profil
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + DERS); pg.wait_for_selector("[data-test=ders-diyalog]")
        step(pg); pg.wait_for_selector("[data-test=ders-tanit]")
        check(pg.locator("[data-test=ders-bahce-not]").count() == 0, "tohumsuz: Bahçe notu yok")
        tanit, _, bahce = tanitim_boyunca(pg, None, "b")
        check(any(t.split()[-1] == "Montag" for t in tanit) and len(tanit) == 23 and not bahce, f"tohumsuz: 23 kart tanıtıldı, Bahçe turu yok ({len(tanit)}, {len(bahce)})")
        ctx.close(); b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
