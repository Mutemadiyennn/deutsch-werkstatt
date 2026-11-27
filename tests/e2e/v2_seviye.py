"""
A1 seviye tespiti ekranları (PM-115 PR 2b; hedef ekran PM-120 md. 4). e2e fikstürü: `content/tools/fixtures/tespit-e2e`
(çekirdek dört beceri + 1.–8. haftada tarama/derin maddeleri; 5. ve 6. haftada kelime örneği). Üç yol (PM-115 md. 6 a–c):
  A) hepsi doğru → derin bakış yok, bölüm aralarında "oturmuş ✓", yarıda bırak/sürdür (yeniden yükleme) → "A2'ye hazırsın"
     → A2'ye başla → Bugün 57. gün; yapay zekâya hiç istek yok (kural tabanlı); Ben'den rapor yeniden açılır
  B) 3. ve 5. haftanın taraması "Bilmiyorum" → yalnız o iki hafta "biraz daha bakalım" + derin bakış → "tamamlama planı"
     → Planımı gör (PR 3'e kadar ara hâl, PM-124 md. 4.1: zorlanılan cümleler + Rehber + "Bunları tekrar et" + not) → tekrar
     → geri ok listeye; A2 açılmaz
  C) ilk kurulumda gün kilidi (tespit bitmeden gün açılmaz) → hepsi "Bilmiyorum" ("Şimdilik bırak" → Bugün → Sürdür)
     → "A1'i baştan" → A1'e baştan başla → 1. gün
  D) kurulumdan gelen öğrenci bir cevaptan sonra Ayarlar'da elle "Baştan (A1)" → kilit kalkar, Bugün 1. gün
python3 tests/e2e/v2_seviye.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow
from v2_yol_hafta import META

PORT = 4257
API = []


def madde(pg):
    return pg.evaluate("""() => { const m = document.querySelector('[data-test=tespit-madde]');
      return m ? { id: m.dataset.adim, asama: m.dataset.asama, hafta: m.dataset.hafta, beceri: m.dataset.beceri,
        etiket: (document.querySelector('[data-test=tespit-etiket]') || {}).innerText || '' } : null; }""")


def cevapla(pg, kip):
    """Sıradaki maddeyi `kip` ile cevapla: 'dogru' (e2e işaretlerinden) ya da 'bilmiyorum'"""
    if kip == "bilmiyorum":
        pg.click("[data-test=tespit-bilmiyorum]"); return
    # deneme maddesi (seç/form/mesaj) sınav günüyle aynı kartta (`MaddeView`): birincil düğme data-test=next
    sinav = pg.locator("[data-test=sinav-sec], [data-test=sinav-form], [data-test=sinav-mesaj]")
    kart = sinav.first if sinav.count() else pg.locator(".tespit-kart").first
    test = kart.get_attribute("data-test") or ""
    if test == "sinav-mesaj":
        pg.fill("[data-test=yazi]", kart.get_attribute("data-ornek") or "Hallo!")
        pg.click("[data-test=next]"); pg.wait_for_selector("[data-test=tespit-mesaj-puanla]")
        for seg in pg.locator("[data-test=tespit-mesaj-puanla] .seg").all(): seg.locator("button").last.click()
        pg.click("[data-test=tespit-puan-kaydet]"); return
    if test == "sinav-form":
        import json
        for k, v in json.loads(kart.get_attribute("data-ornek") or "{}").items(): pg.fill(f"[data-alan='{k}']", v)
        pg.click("[data-test=next]"); return
    dogru = kart.get_attribute("data-dogru")
    if dogru is not None:
        pg.click(f".tespit-kart button.opt[data-opt='{dogru}']"); pg.click("[data-test=next]" if test == "sinav-sec" else "[data-test=tespit-kontrol]"); return
    cev = (kart.get_attribute("data-cevap") or "").replace("{name}", "Ayşe")
    if test == "tespit-drill-order":
        for w in [x.strip(".,!?;:„“\"") for x in cev.split()]:
            if w: pg.locator(f".tespit-kart .wchip[data-chip='{w}']:not([disabled])").first.click()
        pg.click("[data-test=submit]"); return
    if pg.locator("[data-test=tespit-yazarak]").count(): pg.click("[data-test=tespit-yazarak]")
    pg.fill("[data-test=answer]", cev); pg.click("[data-test=submit]")


def coz(pg, kip_sec, sema, ad, reload_at=None, birak=False):
    """Tespiti rapora kadar çöz. kip_sec(m) → 'dogru' | 'bilmiyorum'. Döner: (maddeler, aralar)"""
    goruldu, aralar, n = [], [], 0
    while n < 200:
        pg.wait_for_selector("[data-test=tespit-madde], [data-test=tespit-ara], [data-test=tespit-rapor]", timeout=20000)
        if pg.locator("[data-test=tespit-rapor]").count(): break
        if pg.locator("[data-test=tespit-ara]").count():
            a = pg.evaluate("() => { const x = document.querySelector('[data-test=tespit-ara]'); return { h: x.dataset.hafta, d: x.dataset.durum, t: x.innerText }; }")
            aralar.append(a)
            if len(aralar) == 1 or (a["d"] == "zayif" and not any(x["d"] == "zayif" for x in aralar[:-1])):
                no_overflow(pg, f"bölüm arası ({a['d']})"); shot(pg, f"tespit-ara-{a['d']}-{sema}", full=False)
            if birak and a["d"] == "zayif":
                # "Şimdilik bırak" → Bugün; davet kartı "Sürdür" ile geri getirir (kilitli öğrencide yol görünmez)
                birak = False
                pg.click("[data-test=tespit-birak]"); pg.wait_for_selector("[data-test=tespit-davet]", timeout=15000)
                check("yarıda" in pg.inner_text("[data-test=tespit-davet]") and pg.locator("[data-test=yol]").count() == 0, "Şimdilik bırak: Bugün'de 'yarıda' kartı, yol gizli (gün kilitli)")
                pg.click("[data-test=tespit-davet-git]"); pg.wait_for_selector("[data-test=tespit-surdur]"); pg.click("[data-test=tespit-surdur]")
                continue
            pg.click("[data-test=tespit-devam]"); continue
        m = madde(pg); goruldu.append(m)
        if n == 1:
            check(m["etiket"].startswith("BÖLÜM 1/9 · DÖRT BECERİ"), f"etiket 'BÖLÜM 1/9 · DÖRT BECERİ' ({m['etiket']})")
            check(pg.locator("[data-test=tespit-bilmiyorum]").count() == 1 and pg.locator("[data-test=ilerleme]").count() == 1, "maddede ilerleme çubuğu ve 'Bilmiyorum'")
        if m["beceri"] == "konusma" and ad == "a" and not any(x["beceri"] == "konusma" for x in goruldu[:-1]):
            no_overflow(pg, "konuşma maddesi"); shot(pg, f"tespit-madde-konusma-{sema}", full=False)
        if m["beceri"] == "kelime" and ad == "a" and not any(x["beceri"] == "kelime" for x in goruldu[:-1]):
            shot(pg, f"tespit-madde-kelime-{sema}", full=False)
        if reload_at is not None and n == reload_at:
            pg.reload(); pg.wait_for_selector("[data-test=tespit-giris]", timeout=20000)
            g = pg.inner_text("[data-test=tespit-giris]")
            check("bölüm bitti" in g and "yaklaşık" in g and "dk kaldı" in g and pg.locator("[data-test=tespit-surdur]").count() == 1, f"yarıda: giriş 'x/y bölüm bitti · ≈ N dk kaldı' + Sürdür ({g.splitlines()[-1] if g else ''})")
            check(pg.locator("[data-test=tespit-bastan]").count() == 0, "cevap verdikten sonra 'Baştan başla' bağlantısı yok")
            no_overflow(pg, "tespit sürdür"); shot(pg, f"tespit-surdur-{sema}", full=False)
            pg.click("[data-test=tespit-surdur]"); pg.wait_for_selector("[data-test=tespit-madde]")
            check(madde(pg)["id"] == m["id"], f"sürdür: aynı madde ({m['id']})")
        once = m["id"]
        cevapla(pg, kip_sec(m)); n += 1
        # sonuç gösterilmez: doğrudan sıradaki madde ya da bölüm arası
        pg.wait_for_function("(id) => { const m = document.querySelector('[data-test=tespit-madde]'); return !m || m.dataset.adim !== id; }", arg=once, timeout=15000)
        check(pg.locator("[data-test=feedback], .fb.ok, .fb.bad").count() == 0, "madde sonrası doğru/yanlış gösterilmez") if n == 1 else None
    pg.wait_for_selector("[data-test=tespit-rapor]", timeout=20000)
    return goruldu, aralar


def rapor(pg):
    return pg.evaluate("""() => { const r = document.querySelector('[data-test=tespit-rapor]');
      return { karar: r.dataset.karar, genel: +r.dataset.genel, metin: r.innerText,
        beceri: [...r.querySelectorAll('[data-test^=beceri-]')].map((x) => [x.dataset.test, x.dataset.oran]),
        hafta: [...r.querySelectorAll('[data-test^=hafta-]')].map((x) => [x.dataset.test, x.dataset.oran]),
        zayif: [...r.querySelectorAll('[data-test=tespit-zayif] li')].map((x) => x.dataset.test),
        birincil: [...document.querySelectorAll('.actionbar .btn.primary, [class*=actionbar] .btn.primary')].map((x) => x.innerText.trim()) }; }""")


def yolgun(pg):
    return pg.evaluate("() => [...document.querySelectorAll('[data-test=yol] section.yolgun')].map((s) => s.dataset.test)")


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    with sync_playwright() as p:
        # ---------- A) hepsi doğru ----------
        print("A) kurulum → tespit (hepsi doğru, yarıda bırak/sürdür) → A2'ye başla")
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        pg.on("request", lambda r: API.append(r.url) if "/v1/ai/" in r.url else None)
        login_onboard(pg, PORT, tespit=True)
        g = pg.inner_text("[data-test=tespit-giris]")
        check("Önce seviyeni görelim" in g and "Bildiğini tekrar ettirmeyelim" in g and "Yarıda bırakabilirsin" in g and "Bilmiyorum" in g, "giriş: başlık, alt metin, üç satır")
        check(pg.locator("[data-test=tespit-basla]").count() == 1 and pg.locator("[data-test=tespit-bastan]").count() == 1, "giriş: birincil 'Başla' + ilk kurulumda 'Baştan başla'")
        check(pg.locator(".btn.primary").count() == 1, "girişte tek birincil düğme")
        no_overflow(pg, "tespit girişi"); shot(pg, f"tespit-giris-{sema}", full=False)
        pg.click("[data-test=tespit-basla]")
        goruldu, aralar = coz(pg, lambda m: "dogru", sema, "a", reload_at=6)
        check(not any(m["asama"] == "derin" for m in goruldu), "hepsi doğru: derin bakış yok")
        check(sorted({m["hafta"] for m in goruldu if m["hafta"]}) == [str(h) for h in range(1, 9)], "sekiz haftanın taraması")
        check(any(m["beceri"] == "kelime" for m in goruldu), "kelime örneği (dinle → anlam) soruldu")
        check([a["h"] for a in aralar] == [str(h) for h in range(1, 9)] and all(a["d"] == "oturmus" and "oturmuş" in a["t"] and "%" not in a["t"] for a in aralar), f"her haftadan sonra 'N. hafta: oturmuş ✓', yüzde yok ({[(a['h'], a['d']) for a in aralar]})")
        r = rapor(pg)
        check(r["karar"] == "a2" and "A2'ye hazırsın." in r["metin"], f"karar: A2'ye hazırsın ({r['karar']})")
        check("Genel %100" in r["metin"], "gerekçe satırı 'Genel %…'")
        check(len(r["beceri"]) == 6 and len(r["hafta"]) == 8, f"altı beceri, sekiz hafta çubuğu ({len(r['beceri'])}, {len(r['hafta'])})")
        check(dict(r["beceri"]).get("beceri-dil") == "" and "ölçülmedi" in r["metin"], "sorulmayan beceri 'ölçülmedi' (%0 değil)")
        check("Yine de" not in r["metin"] and pg.locator("[data-test=tespit-a2]").count() == 1, "tek birincil 'A2'ye başla'; 'yine de geç' yok")
        check(not API, f"yapay zekâya istek yok: kural tabanlı tamamlandı ({len(API)})")
        no_overflow(pg, "seviye raporu (A2)"); shot(pg, f"tespit-rapor-a2-{sema}", full=False); shot(pg, f"tespit-rapor-a2-tam-{sema}", full=True)
        pg.click("[data-test=tespit-kopyala]"); pg.wait_for_selector(".toast", timeout=5000)
        # Ben'den yeniden açılır
        pg.goto(base + "#/ben"); pg.wait_for_selector("[data-test=ben-tespit]", timeout=15000)
        check("Seviye raporun" in pg.inner_text("[data-test=ben-tespit]") and pg.get_attribute("[data-test=ben-tespit]", "href") == "#/seviye/rapor", "Ben: 'Seviye raporun' satırı rapora gider")
        pg.click("[data-test=ben-tespit]"); pg.wait_for_selector("[data-test=tespit-rapor]", timeout=15000)
        pg.goto(base + "#/seviye/plan"); pg.wait_for_function("() => location.hash === '#/seviye/rapor'", timeout=15000)
        pg.wait_for_selector("[data-test=tespit-rapor]", timeout=15000)
        check(pg.locator("[data-test=tespit-plan-ara]").count() == 0, "A2 kararında plan yok: #/seviye/plan rapora yönlenir")
        pg.click("[data-test=tespit-a2]"); pg.wait_for_selector("[data-test=next-activity]", timeout=20000)
        check(yolgun(pg) == ["gun-57"], f"A2'ye başla: Bugün 57. gün ({yolgun(pg)})")
        check((pg.evaluate(META, "seviye:baslangic") or {}).get("gun") == 57, "başlangıç cihazda 57")
        check(pg.locator("[data-test=tespit-davet]").count() == 0, "karar uygulandı: Bugün'de tespit kartı yok")
        pg.goto(base + "#/ben/ayarlar"); pg.wait_for_selector("[data-test=elle-baslangic]", timeout=15000)
        check(pg.locator("[data-test=ayar-baslangic]").count() == 0, "Ayarlar'ın üstünde 'Nereden başlayalım?' kartı yok")
        pg.click("[data-test=elle-baslangic]"); pg.wait_for_selector("[data-test=baslangic-simdi]")
        check("A2'den (9. hafta)" in pg.inner_text("[data-test=baslangic-simdi]"), "dipte sessiz elle değiştirme: 'Şu an: A2'den (9. hafta)'")
        b.close()

        # ---------- B) iki haftada zayıf ----------
        print("B) 3. ve 5. hafta zayıf → derin bakış yalnız orada → tamamlama planı")
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        login_onboard(pg, PORT, tespit=True); pg.click("[data-test=tespit-basla]")
        zayif = {"3", "5"}
        goruldu, aralar = coz(pg, lambda m: "bilmiyorum" if m["asama"] == "tarama" and m["hafta"] in zayif else "dogru", sema, "b")
        check({a["h"] for a in aralar if a["d"] == "zayif"} == zayif and all("biraz daha bakalım" in a["t"] for a in aralar if a["d"] == "zayif"), f"zayıf haftalarda 'biraz daha bakalım (≈ N dk)' ({[(a['h'], a['d']) for a in aralar]})")
        derin = {m["hafta"] for m in goruldu if m["asama"] == "derin"}
        check(derin == zayif, f"derin bakış yalnız zayıf haftalarda ({sorted(derin)})")
        check(any("YAKINDAN" in m["etiket"] for m in goruldu if m["asama"] == "derin"), "derin bölüm etiketi 'N. HAFTA · YAKINDAN'")
        r = rapor(pg)
        check(r["karar"] == "tamamla" and "tamamlama planın var" in r["metin"], f"karar: tamamlama planı ({r['karar']})")
        hw = dict(r["hafta"])
        check(int(hw.get("hafta-3") or 100) < 60 and int(hw.get("hafta-5") or 100) < 60 and hw.get("hafta-1") == "100", f"hafta çubukları: 3. ve 5. hafta < %60, 1. hafta %100 ({r['hafta']})")
        check(pg.locator("[data-test=hafta-3].dusuk").count() == 1 and pg.locator("[data-test=hafta-1].dusuk").count() == 0, "eşiğin altındaki hafta kehribar")
        no_overflow(pg, "seviye raporu (tamamla)"); shot(pg, f"tespit-rapor-tamamla-{sema}", full=False)
        pg.click("[data-test=tespit-zayif] summary")
        check("zayif-15" in r["zayif"] and "zayif-29" in r["zayif"], f"zorlandıkların: 15. ve 29. gün ({r['zayif']})")
        import re
        check(bool(re.search(r"15\. GÜN · \d+/\d+", pg.inner_text("[data-test=tespit-zayif]"))), "#244 dili: 'N. GÜN · d/t'")
        check(pg.locator("[data-test=tespit-plan]").count() == 1 and pg.locator("[data-test=tespit-a2]").count() == 0, "tek birincil 'Planımı gör'; A2 düğmesi yok")
        pg.evaluate("window.scrollTo(0, document.body.scrollHeight)"); shot(pg, f"tespit-rapor-tamamla-alt-{sema}", full=False)
        pg.click("[data-test=tespit-plan]"); pg.wait_for_selector("[data-test=tespit-plan-ara]", timeout=15000)
        check(pg.evaluate("location.hash") == "#/seviye/plan", f"Planımı gör: ara hâl ({pg.evaluate('location.hash')})")
        pl = pg.evaluate("""() => ({ gun: [...document.querySelectorAll('[data-test=zayif-liste] li')].map((x) => x.dataset.gun),
          rehber: [...document.querySelectorAll('[data-test=zayif-liste] .rehber-btn')].map((x) => x.getAttribute('href')),
          not: (document.querySelector('[data-test=plan-not]') || {}).innerText || '',
          birincil: [...document.querySelectorAll('.btn.primary')].map((x) => [x.innerText.trim(), x.getAttribute('href')]) })""")
        check(pl["gun"] == ["15", "29"] and pl["rehber"] == ["#/rehber/15", "#/rehber/29"], f"zorlanılan cümleler + Rehber ({pl['gun']}, {pl['rehber']})")
        check(pl["not"] == "Bu liste planının ilk adımı. Günlere bölünmüş tam plan birkaç gün içinde burada olacak. Planı bitirince A2 açılır.", f"tek satır not ({pl['not']!r})")
        check(pl["birincil"] == [["Bunları tekrar et", "#/seviye/tekrar/15,29"]], f"tek birincil 'Bunları tekrar et' ({pl['birincil']})")
        check(re.search(r"15\. GÜN · \d+/\d+ DOĞRU", pg.inner_text("[data-test=zayif-liste]")) is not None, "#244 dili: 'N. GÜN · d/t DOĞRU'")
        no_overflow(pg, "planın (ara hâl)"); shot(pg, f"tespit-11-plan-ara-{sema}", full=False)
        pg.click("[data-test=zayif-tekrar]"); pg.wait_for_selector("[data-test=hafta-tekrar], [data-test=hafta-tekrar-bos]", timeout=15000)
        check(pg.evaluate("location.hash") == "#/seviye/tekrar/15,29", f"Bunları tekrar et: #244'ün tekrar akışı ({pg.evaluate('location.hash')})")
        check(pg.get_attribute("header.pbar a[aria-label=Geri]", "href") == "#/seviye/plan", "tekrarın geri oku listeye döner")
        pg.click("header.pbar a[aria-label=Geri]"); pg.wait_for_selector("[data-test=tespit-plan-ara]", timeout=15000)
        pg.goto(base + "#/seviye/plan"); pg.wait_for_selector("[data-test=tespit-plan-ara]", timeout=15000)
        check(pg.locator("[data-test=tespit-plan-ara]").count() == 1, "adresle açılan ara plan (yeniden yükleme) aynı listeyi gösterir")
        check(not (pg.evaluate(META, "seviye:baslangic") or {}).get("gun", 1) > 1, "tamamlama kararı A2'yi açmaz (başlangıç değişmedi)")
        b.close()

        # ---------- C) çok düşük → baştan ----------
        print("C) gün kilidi → hepsi Bilmiyorum → A1'e baştan başla")
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        ctx.add_init_script("try { sessionStorage.setItem('e2e-gun-kilidi', 'acik'); } catch (e) {}")
        login_onboard(pg, PORT, tespit=True)
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=gun-kilitli-tespit], [data-test=gun-kilitli]", timeout=20000)
        check(pg.locator("[data-test=gun-kilitli-tespit]").count() == 1, "ilk kurulum: tespit bitmeden gün açılmaz")
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=tespit-davet]", timeout=20000)
        check("Önce seviyeni görelim" in pg.inner_text("[data-test=tespit-davet]"), "Bugün'de tespit kartı")
        pg.click("[data-test=tespit-davet-git]"); pg.wait_for_selector("[data-test=tespit-giris]"); pg.click("[data-test=tespit-basla]")
        goruldu, aralar = coz(pg, lambda m: "bilmiyorum", sema, "c", birak=True)
        check(all(a["d"] == "zayif" for a in aralar) and len(aralar) == 8, "hepsi zayıf")
        r = rapor(pg)
        check(r["karar"] == "bastan" and "A1'i baştan" in r["metin"], f"karar: baştan ({r['karar']})")
        no_overflow(pg, "seviye raporu (baştan)"); shot(pg, f"tespit-rapor-bastan-{sema}", full=False)
        pg.click("[data-test=tespit-bastan-karar]"); pg.wait_for_selector("[data-test=next-activity]", timeout=20000)
        check(yolgun(pg) == ["gun-1"], f"A1'e baştan: Bugün 1. gün ({yolgun(pg)})")
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=gun-kilitli-tespit], [data-test=gun-kilitli], [data-test=garden-intro], [data-test^=gq-], [data-test=garden-empty], [data-test=garden-done], [data-test=hizli-oneri]", timeout=20000)
        check(pg.locator("[data-test=gun-kilitli-tespit]").count() == 0, "karardan sonra gün kilidi kalktı")
        b.close()

        # ---------- D) kurulumdan gelen öğrenci elle başlangıçla kilidi kaldırır (inceleme #264 P1-1) ----------
        print("D) kurulum → bir cevap → Ayarlar'da elle 'Baştan (A1)' → kilit kalkar")
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        ctx.add_init_script("try { sessionStorage.setItem('e2e-gun-kilidi', 'acik'); } catch (e) {}")
        login_onboard(pg, PORT, tespit=True); pg.click("[data-test=tespit-basla]")
        pg.wait_for_selector("[data-test=tespit-madde]"); cevapla(pg, "bilmiyorum")
        pg.wait_for_function("() => document.querySelector('[data-test=tespit-madde]')?.dataset.adim !== 'a1d:d1:01'", timeout=15000)
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=tespit-davet]", timeout=15000)
        check(pg.locator("[data-test=yol]").count() == 0, "kilitli öğrencide Bugün'de yol ve BAŞLA yok, yalnız tespit kartı")
        pg.goto(base + "#/ben/ayarlar"); pg.wait_for_selector("[data-test=elle-baslangic]", timeout=15000)
        pg.click("[data-test=elle-baslangic]"); pg.wait_for_selector("[data-test=baslangic-simdi]")
        check(not pg.locator("[data-test=elle-a1]").is_disabled(), "kilitliyken 'Baştan (A1)' seçilebilir")
        pg.click("[data-test=elle-a1]"); pg.wait_for_timeout(800)
        pg.goto(base + "#/garden/1"); pg.wait_for_selector("[data-test=gun-kilitli-tespit], [data-test=gun-kilitli], [data-test=garden-intro], [data-test^=gq-], [data-test=garden-empty], [data-test=garden-done], [data-test=hizli-oneri]", timeout=20000)
        check(pg.locator("[data-test=gun-kilitli-tespit]").count() == 0, "elle seçimden sonra gün kilidi kalktı")
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=next-activity]", timeout=20000)
        check(pg.locator("[data-test=tespit-davet]").count() == 0 and yolgun(pg) == ["gun-1"], f"Bugün: davet yok, 1. gün ({yolgun(pg)})")
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
