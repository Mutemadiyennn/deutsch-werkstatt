"""
B16 hızlı şerit (PM-066 madde 1, 2, 4, 5, 6) — "Biliyorum, sına beni":
  - sıfır profil: Bahçe bugünkü akışla açılır (tanıtım kartı); tanıtımda "Biliyorum, sına beni" düğmesi
  - "Biliyorum, sına beni" → sonraki yeni kartlar tek üretim sorusuyla (ipucusuz, artikelli); doğru → "Bildin!" (+4 XP),
    kart tanımayı atlar (pasif ilk tekrar 7 gün sonra); yanlış → "Sorun değil, birlikte bakalım" → tanıtım + tanıma sorusu
  - art arda 3 yeni kart hızlı ve doğru → "Bunları biliyor gibisin. Hepsini sınayayım mı?"
  - seviye tespiti A2: Bahçe hızlı şeritle açılır; tur tanıma sorusu görmeden biter; "Normal akışa dön" seçeneği
python3 tests/e2e/v2_hizli.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4211
OKU = """async ([st, k]) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const v = await new Promise((ok) => { const g = d.transaction(st).objectStore(st).get(k); g.onsuccess = () => ok(g.result ?? null); }); d.close(); return v; }"""
YAZ = """async ([st, v]) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  await new Promise((ok, no) => { const t = d.transaction(st, 'readwrite'); t.objectStore(st).put(v); t.oncomplete = ok; t.onerror = no; }); d.close(); }"""

def yeni_sayfa(p, tema="light"):
    b, ctx = launch(p, color_scheme=tema); pg = new_page(ctx)
    login_onboard(pg, PORT, hizli_serit=None); pg.wait_for_selector("[data-tab=today]")
    return b, pg

def bahce(pg, base):
    pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro], [data-test^=gq-], [data-test=hizli-oneri]")

def sina_cevapla(pg, dogru=True):
    cevap = pg.get_attribute("[data-test=sina-soru]", "data-cevap") if dogru else "xyz falsch"
    pg.fill("[data-test=answer]", cevap); pg.click("[data-test=submit]"); pg.wait_for_selector("[data-test=feedback]")
    return pg.inner_text("[data-test=feedback]")

def main():
    shots = arg("--shots")
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        # 1) sıfır profil: bugünkü akış + düğme; öneri
        b, pg = yeni_sayfa(p); bahce(pg, base)
        check(pg.locator("[data-test=garden-intro]").count() == 1 and pg.get_attribute("[data-test=garden]", "data-hizli") is None, "sıfır profil: Bahçe tanıtım kartıyla açılır (bugünkü akış)")
        check(pg.locator("[data-test=sina-beni]").count() == 1, "tanıtımda 'Biliyorum, sına beni' düğmesi")
        if shots: shot(pg, "h01-tanitim-sina", full=False)
        oneri = False
        for _ in range(6):
            if pg.locator("[data-test=hizli-oneri]").count(): oneri = True; break
            if pg.locator("[data-test=garden-intro]").count(): pg.click("[data-test=garden-intro] [data-test=next]")
            pg.wait_for_selector("[data-test^=gq-]")
            if not pg.locator("button.opt[data-right]").count(): break
            pg.locator("button.opt[data-right]").first.click(); pg.wait_for_selector("[data-test=next]"); pg.click("[data-test=next]")
            pg.wait_for_selector("[data-test=garden-intro], [data-test=hizli-oneri], [data-test=garden-done]")
        check(oneri, "art arda 3 yeni kart hızlı ve doğru → 'Bunları biliyor gibisin' önerisi")
        if oneri:
            if shots: shot(pg, "h02-oneri", full=False)
            pg.click("[data-test=hizli-evet]"); pg.wait_for_selector("[data-test=sina-soru], [data-test=garden-done]")
            check(pg.locator("[data-test=sina-soru]").count() == 1, "öneri kabul: sonraki yeni kart sına sorusuyla açılır")
        b.close()

        # 2) tanıtımda "Biliyorum, sına beni": doğru → Bildin, yanlış → birlikte bakalım
        b, pg = yeni_sayfa(p); bahce(pg, base)
        pg.click("[data-test=sina-beni]"); pg.wait_for_selector("[data-test=sina-soru]")
        check(pg.locator("[data-test=garden-intro]").count() == 0, "düğmeden sonra sonraki yeni kart tanıtımsız: sına sorusu")
        once = (pg.evaluate(OKU, ["meta", "xp"]) or {"value": {"toplam": 0}})["value"]["toplam"]
        t = sina_cevapla(pg, True)
        check("Bildin" in t, f"doğru üretim: 'Bildin!' ({t[:60]!r})")
        lex = pg.get_attribute("[data-test=after-card]", "data-lex")
        pg.click("[data-test=next]")
        pg.wait_for_function(f"async () => ((await ({OKU})(['meta', 'xp'])) || {{ value: {{ toplam: 0 }} }}).value.toplam >= {once + 4}", timeout=5000)
        check(True, "üretimle bilinen kart +4 XP (tanımadan fazla)")
        it = pg.evaluate(OKU, ["items", lex])
        check(it and it["passive"]["fsrs"] and abs(it["passive"]["fsrs"]["stability"] - 7) < 0.01 and it["active"]["ok"] == 1, f"kart tanımayı atladı: pasif kararlılık 7 gün, aktif yol başladı ({lex})")
        pg.wait_for_selector("[data-test=sina-soru], [data-test^=gq-], [data-test=garden-done]")
        if pg.locator("[data-test=sina-soru]").count():
            t = sina_cevapla(pg, False)
            check("Sorun değil" in t, f"yanlış: 'Sorun değil, birlikte bakalım' ({t[:50]!r})")
            if shots: shot(pg, "h03-birlikte-bakalim", full=False)
            pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=garden-intro]")
            pg.click("[data-test=garden-intro] [data-test=next]"); pg.wait_for_selector("[data-test^=gq-]")
            check(pg.locator("[data-test=gq-listen_meaning]").count() == 1, "yanlıştan sonra tanıtım ve normal tanıma sorusu (cezasız)")
        no_overflow(pg, "hızlı şerit")
        b.close()

        # 3) seviye tespiti A2: hızlı şerit varsayılan; tur tanıma sorusu görmeden biter
        b, pg = yeni_sayfa(p)
        pg.evaluate(YAZ, ["assess", {"id": "e2e-a2", "type": "placement", "startedAt": "2026-11-18T10:00:00.000Z", "finishedAt": "2026-11-18T10:30:00.000Z", "overall": "A2", "items": [], "skills": {}}])
        pg.reload(); pg.wait_for_selector("[data-tab=today]"); bahce(pg, base)
        check(pg.get_attribute("[data-test=garden]", "data-hizli") == "tespit" and pg.locator("[data-test=hizli-tespit]").count() == 1, "tespit A2: Bahçe hızlı şeritle açılır ve bunu söyler")
        if shots: shot(pg, "h04-tespit-a2", full=False)
        tanima, sina, k = 0, 0, 0
        while k < 60 and not pg.locator("[data-test=garden-done]").count():
            k += 1
            if pg.locator("[data-test=garden-intro]").count() or pg.locator("[data-test=gq-listen_meaning], [data-test=gq-article], [data-test=gq-colloc]").count(): tanima += 1
            if pg.locator("[data-test=sina-soru]").count(): sina += 1; sina_cevapla(pg, True)
            elif pg.locator("button.opt[data-right]").count(): pg.locator("button.opt[data-right]").first.click()
            elif pg.locator("[data-test=garden-intro]").count(): pg.click("[data-test=garden-intro] [data-test=next]"); continue
            else: break
            pg.wait_for_selector("[data-test=next]"); old = pg.inner_text("[data-test=garden] .pbar"); pg.click("[data-test=next]")
            pg.wait_for_function("(o) => document.querySelector('[data-test=garden-done]') || (document.querySelector('[data-test=garden] .pbar') || {}).innerText !== o", arg=old)
        check(pg.locator("[data-test=garden-done]").count() == 1 and sina >= 3 and tanima == 0, f"A2 profili turu tanıma sorusu görmeden bitirdi ({sina} sına, {tanima} tanıma)")
        # normal akışa dön
        b.close()
        b, pg = yeni_sayfa(p)
        pg.evaluate(YAZ, ["assess", {"id": "e2e-a2", "type": "placement", "startedAt": "2026-11-18T10:00:00.000Z", "finishedAt": "2026-11-18T10:30:00.000Z", "overall": "A2", "items": [], "skills": {}}])
        pg.reload(); pg.wait_for_selector("[data-tab=today]"); bahce(pg, base)
        pg.click("[data-test=hizli-kapat]"); pg.wait_for_selector("[data-test=garden-intro]")
        check(pg.get_attribute("[data-test=garden]", "data-hizli") is None, "'Normal akışa dön': tanıtım kartı geri geldi")
        check(pg.evaluate(OKU, ["meta", "hizliSerit"])["value"] is False, "tercih kaydedildi (bir dahaki açılışta normal akış)")
        b.close()
    srv.shutdown()
    finish()

if __name__ == "__main__":
    main()
