"""
B16 hızlı şerit (PM-066 madde 1, 2, 4, 5, 6) — "Biliyorum, sına beni":
  - sıfır profil: Bahçe bugünkü akışla açılır (tanıtım kartı); tanıtımda "Biliyorum, sına beni" düğmesi
  - "Biliyorum, sına beni" → sonraki yeni kartlar tek üretim sorusuyla (ipucusuz, artikelli); doğru → "Bildin!" (+4 XP),
    kart tanımayı atlar (pasif ilk tekrar 7 gün sonra); yanlış → "Sorun değil, birlikte bakalım" → tanıtım + tanıma sorusu
  - art arda 3 yeni kart hızlı ve doğru → "Bunları biliyor gibisin. Hepsini sınayayım mı?"
  - seviye tespiti A2: Bahçe hızlı şeritle açılır; tur tanıma sorusu görmeden biter; "Normal akışa dön" seçeneği
python3 tests/e2e/v2_hizli.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import io, os
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow, tanitim_gec

PORT = 4211
OKU = """async ([st, k]) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const v = await new Promise((ok) => { const g = d.transaction(st).objectStore(st).get(k); g.onsuccess = () => ok(g.result ?? null); }); d.close(); return v; }"""
YAZ = """async ([st, v]) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  await new Promise((ok, no) => { const t = d.transaction(st, 'readwrite'); t.objectStore(st).put(v); t.oncomplete = ok; t.onerror = no; }); d.close(); }"""

TEMA = arg("--scheme") or "light"
GIF = arg("--gif"); KARELER = []
def kare(pg, n=4):
    """--gif: 10 sn'lik kayıt için n kare (250 ms arayla)"""
    if GIF:
        for _ in range(n): KARELER.append(pg.screenshot()); pg.wait_for_timeout(250)

def yeni_sayfa(p, tema=TEMA):
    b, ctx = launch(p, color_scheme=tema); pg = new_page(ctx)
    login_onboard(pg, PORT, hizli_serit=None); pg.wait_for_selector("[data-tab=today]")
    return b, pg

def bahce(pg, base):
    pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=garden-intro], [data-test^=gq-], [data-test=hizli-oneri]")

def sina_cevapla(pg, dogru=True):
    cevap = pg.get_attribute("[data-test=sina-soru]", "data-cevap") if dogru else "xyz falsch"
    pg.fill("[data-test=answer]", cevap); pg.click("[data-test=submit]"); pg.wait_for_selector("[data-test=feedback]")
    return pg.inner_text("[data-test=feedback]")

BUGUN = "() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }"

def oneriye_kadar(pg, okuma=300):
    """yeni kartlarda ilk tanıma sorusunu hızlı ve doğru cevapla; öneri gelirse True"""
    for _ in range(14):
        if pg.locator("[data-test=hizli-oneri]").count(): return True
        if pg.locator("[data-test=garden-done]").count(): return False
        # PM-069 madde 3: tanıtımdan sonra ilk soru iki öğe sonra gelir
        if pg.locator("[data-test=garden-intro]").count(): tanitim_gec(pg); continue
        pg.wait_for_selector("[data-test^=gq-]")
        if not pg.locator("button.opt[data-right]").count(): return False
        pg.locator("button.opt[data-right]").first.click(); pg.wait_for_selector("[data-test=next]")
        pg.wait_for_timeout(okuma)  # cevap kartını okumak öneri süresine girmez (inceleme #113 P1-4)
        old = pg.inner_text("[data-test=garden] .pbar"); pg.click("[data-test=next]")
        pg.wait_for_function("(o) => document.querySelector('[data-test=garden-done]') || document.querySelector('[data-test=hizli-oneri]') || (document.querySelector('[data-test=garden] .pbar') || {}).innerText !== o", arg=old)
    return pg.locator("[data-test=hizli-oneri]").count() > 0

def main():
    shots = arg("--shots")
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        # 1) sıfır profil: bugünkü akış + düğme; öneri
        b, pg = yeni_sayfa(p); bahce(pg, base)
        check(pg.locator("[data-test=garden-intro]").count() == 1 and pg.get_attribute("[data-test=garden]", "data-hizli") is None, "sıfır profil: Bahçe tanıtım kartıyla açılır (bugünkü akış)")
        check(pg.locator("[data-test=sina-beni]").count() == 1, "tanıtımda 'Biliyorum, sına beni' düğmesi")
        if shots: shot(pg, f"h01-tanitim-sina-{TEMA}", full=False)
        oneri = oneriye_kadar(pg, okuma=9000)  # her cevap kartında 9 sn okuma: süre cevap anında ölçülür
        check(oneri, "art arda 3 yeni kart hızlı ve doğru (cevap kartını 9 sn okumak süreye girmedi) → 'Bunları biliyor gibisin' önerisi")
        if oneri:
            if shots: shot(pg, f"h02-oneri-{TEMA}", full=False)
            pg.click("[data-test=hizli-evet]"); pg.wait_for_selector("[data-test=sina-soru], [data-test=garden-done]")
            check(pg.locator("[data-test=sina-soru]").count() == 1, "öneri kabul: sonraki yeni kart sına sorusuyla açılır")
            gun = pg.evaluate(BUGUN)
            check((pg.evaluate(OKU, ["meta", "hizliGun"]) or {}).get("value") == gun and (pg.evaluate(OKU, ["meta", "hizliSerit"]) or {}).get("value") is not True,
                  "seçim yalnızca bugün için (hizliGun); kalıcı hızlı şerit yazılmadı (inceleme #113 P1-1)")
            check(pg.locator("[data-test=hizli-ogrenci] [data-test=hizli-kapat]").count() == 1, "öğrencinin seçtiği hızlı şeritte de 'Normal akışa dön' görünür")
            bb = pg.locator("[data-test=hizli-kapat]").bounding_box()
            check(bb and bb["height"] >= 44, f"'Normal akışa dön' dokunma hedefi ≥ 44 pt ({bb and round(bb['height'])})")
        b.close()

        # 1b) "Hayır, böyle devam" bugün için kaydedilir: yeni turda öneri yeniden gelmez (inceleme #113 P1-3)
        b, pg = yeni_sayfa(p); bahce(pg, base)
        if oneriye_kadar(pg):
            pg.click("[data-test=hizli-hayir]"); pg.wait_for_selector("[data-test=garden-intro], [data-test^=gq-], [data-test=garden-done]")
            check((pg.evaluate(OKU, ["meta", "hizliOneriRed"]) or {}).get("value") == pg.evaluate(BUGUN), "'Hayır, böyle devam' bugün için kaydedildi")
            bahce(pg, base); pg.reload(); pg.wait_for_selector("[data-test=garden-intro], [data-test^=gq-], [data-test=garden-done]")
            check(not oneriye_kadar(pg), "yeni turda öneri yeniden gelmedi")
        else:
            check(False, "1b: öneri tetiklenemedi")
        b.close()

        # 2) tanıtımda "Biliyorum, sına beni": doğru → Bildin, yanlış → birlikte bakalım
        b, pg = yeni_sayfa(p); bahce(pg, base); kare(pg, 8)
        basilan = pg.inner_text("[data-test=garden-intro] .de-xl"); tr_basilan = pg.locator("[data-test=garden-intro] p").first.inner_text()
        pg.click("[data-test=sina-beni]"); pg.wait_for_selector("[data-test=sina-soru]"); kare(pg, 6)
        soru = pg.inner_text("[data-test=gq-tr_de] .de-lg") if pg.locator("[data-test=gq-tr_de] .de-lg").count() else pg.inner_text("main")
        check(tr_basilan in soru, f"basılan kart = sorulan kart ({basilan!r} → {soru[:40]!r}; PM 7018403441-1)")
        check(pg.locator("[data-test=garden-intro]").count() == 0, "düğmeden sonra tanıtımsız: sına sorusu")
        once = (pg.evaluate(OKU, ["meta", "xp"]) or {"value": {"toplam": 0}})["value"]["toplam"]
        t = sina_cevapla(pg, True); kare(pg, 8)
        check("Bildin" in t, f"doğru üretim: 'Bildin!' ({t[:60]!r})")
        lex = pg.get_attribute("[data-test=after-card]", "data-lex")
        pg.click("[data-test=next]")
        pg.wait_for_function(f"async () => ((await ({OKU})(['meta', 'xp'])) || {{ value: {{ toplam: 0 }} }}).value.toplam >= {once + 4}", timeout=5000)
        check(True, "üretimle bilinen kart +4 XP (tanımadan fazla)")
        it = pg.evaluate(OKU, ["items", lex])
        check(it and it["passive"]["fsrs"] and abs(it["passive"]["fsrs"]["stability"] - 7) < 0.01 and it["active"]["ok"] == 1, f"kart tanımayı atladı: pasif kararlılık 7 gün, aktif yol başladı ({lex})")
        pg.wait_for_selector("[data-test=sina-soru], [data-test^=gq-], [data-test=garden-done]")
        if pg.locator("[data-test=sina-soru]").count():
            # "Bilmiyorum, tanıt": uydurma yazmadan çıkış (inceleme #113 P1-2)
            pg.click("[data-test=sina-bilmiyorum]"); pg.wait_for_selector("[data-test=feedback]"); t = pg.inner_text("[data-test=feedback]")
            check("Sorun değil" in t, f"yanlış: 'Sorun değil, birlikte bakalım' ({t[:50]!r})"); kare(pg, 8)
            if shots: shot(pg, f"h03-birlikte-bakalim-{TEMA}", full=False)
            pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=garden-intro]")
            check("birlikte öğreniyoruz" in pg.inner_text("[data-test=hizli-bant-metin]"), "tanıtım sırasında bant kipi söylüyor (PM 7018403441-2)")
            pg.click("[data-test=garden-intro] [data-test=next]"); pg.wait_for_selector("[data-test^=gq-]")
            check(pg.locator("[data-test=gq-listen_meaning]").count() == 1, "yanlıştan sonra tanıtım ve normal tanıma sorusu (cezasız)")
        no_overflow(pg, "hızlı şerit")
        b.close()

        # 3) seviye tespiti A2: hızlı şerit varsayılan; tur tanıma sorusu görmeden biter
        b, pg = yeni_sayfa(p)
        pg.evaluate(YAZ, ["assess", {"id": "e2e-a2", "type": "placement", "startedAt": "2026-11-18T10:00:00.000Z", "finishedAt": "2026-11-18T10:30:00.000Z", "overall": "A2", "items": [], "skills": {}}])
        pg.reload(); pg.wait_for_selector("[data-tab=today]"); bahce(pg, base)
        check(pg.get_attribute("[data-test=garden]", "data-hizli") == "tespit" and pg.locator("[data-test=hizli-tespit]").count() == 1, "tespit A2: Bahçe hızlı şeritle açılır ve bunu söyler")
        if shots: shot(pg, f"h04-tespit-a2-{TEMA}", full=False)
        tanima, sina, k = 0, 0, 0
        while k < 60 and not pg.locator("[data-test=garden-done]").count():
            k += 1
            if pg.locator("[data-test=garden-intro]").count() or pg.locator("[data-test=gq-listen_meaning], [data-test=gq-article], [data-test=gq-colloc]").count(): tanima += 1
            if pg.locator("[data-test=sina-soru]").count(): sina += 1; sina_cevapla(pg, True)
            elif pg.locator("button.opt[data-right]").count(): pg.locator("button.opt[data-right]").first.click()
            elif pg.locator("[data-test=garden-intro]").count(): tanitim_gec(pg); continue
            else: break
            pg.wait_for_selector("[data-test=next]"); old = pg.inner_text("[data-test=garden] .pbar"); pg.click("[data-test=next]")
            pg.wait_for_function("(o) => document.querySelector('[data-test=garden-done]') || (document.querySelector('[data-test=garden] .pbar') || {}).innerText !== o", arg=old)
        check(pg.locator("[data-test=garden-done]").count() == 1 and sina >= 3 and tanima == 0, f"A2 profili turu tanıma sorusu görmeden bitirdi ({sina} sına, {tanima} tanıma)")
        # A2 varsayılanı yalnızca İlk Hafta günlerinde: serbest Bahçe normal akış (inceleme #113 P1-2)
        pg.goto(base + "#/garden"); pg.wait_for_selector("[data-test=garden-intro], [data-test^=gq-], [data-test=garden-done], [data-test=garden-empty]")
        check(pg.locator("[data-test=garden]").count() == 0 or pg.get_attribute("[data-test=garden]", "data-hizli") is None, "A2: serbest Bahçe hızlı şeritle açılmaz")
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
    if GIF and KARELER:
        from PIL import Image
        im = [Image.open(io.BytesIO(k)).convert("P", palette=Image.ADAPTIVE) for k in KARELER]
        w = 390; im = [x.resize((w, int(x.height * w / x.width))) for x in im]
        im[0].save(GIF, save_all=True, append_images=im[1:], duration=int(10000 / len(im)), loop=0, optimize=True)
        check(os.path.getsize(GIF) > 0, f"GIF yazıldı ({len(im)} kare, ~10 sn)")
    finish()

if __name__ == "__main__":
    main()
