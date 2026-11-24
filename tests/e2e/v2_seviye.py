"""
"A2'den başla" (PM-114 B, PM-084 seviye tanıma). e2e fikstürü: 1., 8., 9. gün + 15. ve 57. gün (9. gün fikstüründen; build.ts),
1. hafta sonu testi (gerçek) + 2. hafta testi (fikstür, 4 madde) → yoklama 2 hafta × 2 madde.
  A) Kurulum "Nereden başlayalım?" → A2'den → kısa yoklama (hepsi doğru) → "A2'ye hazırsın" → 9. haftadan başla:
     57. gün Bugün'de; açılışta yalnız 57. günün dosyası; A1 haftaları "atlandı" (açılır, "Gir"); m1:gun yazılmadı, XP 0;
     atlanan gün kilitli değil; 57. gün akışı ve Bahçe'si açılır (Bahçe A1 kartlarını yeniden tanıtmaz)
  B) Düşük sonuç: 2. haftanın maddeleri yanlış → zayıf cümleler gün gün, "Bunları tekrar et" (8., 9. gün), "A1'in 2. haftasından
     başla" → 8. gün; sonra Ayarlar → A2'den → 1. hafta yanlış → "Yine de A2'den başla": yanlış maddenin kartı hemen tekrarda
  C) Ayarlar'dan geri dönüş: "Baştan (A1)" → 1. gün; dokunulmamış "biliniyor" kartlar çıkar
python3 tests/e2e/v2_seviye.py [--browser webkit] [--device "iPhone 15"] [--scheme dark] [--shots DIR]
"""
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow, HIZLI_KAPAT
from v2_yol_hafta import coz, yanlis, META
from v2_akis import adim_gec

PORT = 4257
ITEMS = """async () => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const v = await new Promise((ok) => { const t = d.transaction('items').objectStore('items').getAll(); t.onsuccess = () => ok(t.result); }); d.close();
  const now = Date.now();
  return { atl: v.filter((x) => x.kaynak === 'atlandi').length, sifir: v.filter((x) => x.kaynak === 'atlandi' && x.passive.n === 0 && x.active.n === 0 && !x.durable && !(x.firstAt && x.firstAt.passive)).length,
    simdi: v.filter((x) => x.kaynak === 'atlandi' && x.passive.fsrs && Date.parse(x.passive.fsrs.due) <= now + 1000).length,
    ilk: Math.min(...v.filter((x) => x.kaynak === 'atlandi' && x.passive.fsrs && Date.parse(x.passive.fsrs.due) > now + 1000).map((x) => Date.parse(x.passive.fsrs.due) - now)) / 86400000 }; }"""
GUNLER = """async () => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const v = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').getAllKeys(); t.onsuccess = () => ok(t.result); }); d.close();
  return v.filter((k) => String(k).startsWith('m1:gun:')); }"""


def yoklama_coz(pg, yanlis_q=()):
    pg.wait_for_selector("[data-test=yoklama-giris]", timeout=20000)
    pg.click("[data-test=yoklama-basla]"); pg.wait_for_selector("[data-test=yoklama]")
    q = 0
    while pg.locator("[data-test=yoklama]").count() and q < 30:
        if q in yanlis_q: yanlis(pg)
        else: coz(pg)
        q += 1; pg.wait_for_selector(f"[data-test=yoklama][data-q='{q}'], [data-test=yoklama-sonuc]", timeout=15000)
    pg.wait_for_selector("[data-test=yoklama-sonuc]", timeout=15000)
    return q


def sonuc(pg):
    return pg.evaluate("""() => { const s = document.querySelector('[data-test=yoklama-sonuc]');
      return s ? { d: +s.dataset.dogru, t: +s.dataset.toplam, g: s.dataset.gecti, e: s.dataset.erken, metin: s.innerText,
        z: [...s.querySelectorAll('[data-test=zayif-liste] li')].map((x) => +x.dataset.gun) } : null; }""")


def yol_durumu(pg):
    return pg.evaluate("""() => { const q = (s) => document.querySelector(s);
      return { h: [...document.querySelectorAll('[data-test=yol] [data-test^=hafta-]')].filter((x) => /^hafta-\\d+$/.test(x.dataset.test)).map((x) => [x.dataset.test, x.dataset.atlandi || '', (x.innerText || '').replace(/\\s+/g, ' ').trim()]),
        simdi: [...document.querySelectorAll('[data-test=yol] section.yolgun')].filter((s) => s.dataset.durum === 'simdi').map((s) => s.dataset.test),
        hazir: document.querySelectorAll('[data-test=hafta-testi-hazir]').length }; }""")


def main():
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    sema = arg("--scheme") or "light"
    with sync_playwright() as p:
        # ---------- A) A2'den başla, yoklama geçti ----------
        print("A) kurulum → A2'den → yoklama → 9. hafta")
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        ctx.add_init_script("try { sessionStorage.setItem('e2e-gun-kilidi', 'acik'); sessionStorage.setItem('e2e-akis-gunler', '\"hepsi\"'); } catch (e) {}")
        pg.goto(base)
        pg.wait_for_selector("text=Almancayı gerçek hayat için öğren")
        pg.click("summary"); pg.fill("#em", "test@example.com"); pg.fill("#pw", "e2e-pass"); pg.click("button[type=submit]")
        pg.wait_for_selector("text=Hoş geldin"); pg.click("text=Başlayalım")
        pg.wait_for_selector("[data-test=ad-tekrar], [data-struggle]")
        if pg.locator("[data-test=ad-gec]").count(): pg.click("[data-test=ad-gec]")
        pg.click("[data-struggle=phone]"); pg.click("text=Devam"); pg.wait_for_selector("text=Öncelik sırası")
        pg.click("text=Devam"); pg.click("text=Devam"); pg.evaluate(HIZLI_KAPAT)
        pg.wait_for_selector("[data-test=kurulum-baslangic]")
        t = pg.inner_text("[data-test=kurulum-baslangic]")
        check("Nereden başlayalım?" in t and "Baştan (A1)" in t and "A2'den" in t, "kurulum: tek soru 'Nereden başlayalım?' + iki seçenek")
        check(not pg.locator("[data-test=baslangic-a2]").is_disabled(), "A2 pakette: 'A2'den' seçilebilir")
        no_overflow(pg, "kurulum başlangıç sorusu"); shot(pg, f"seviye-kurulum-{sema}", full=False)
        pg.click("[data-test=baslangic-a2]"); pg.wait_for_selector("[data-test=yoklama-git]")
        check(pg.locator("[data-test=start-assess]").count() == 0, "A2 seçilince eski seviye tespiti yerine kısa yoklama")
        pg.click("[data-test=yoklama-git]")
        pg.wait_for_selector("[data-test=yoklama-giris]", timeout=20000)
        top = int(pg.get_attribute("[data-test=yoklama-giris]", "data-toplam"))
        check(top == 4, f"yoklama: 2 hafta × 2 madde ({top})")
        check("dakika" in pg.inner_text("[data-test=yoklama-giris]"), "yoklama girişinde süre ve 'karar senin'")
        shot(pg, f"seviye-yoklama-giris-{sema}", full=False)
        pg.click("[data-test=yoklama-basla]"); pg.wait_for_selector("[data-test=yoklama]")
        haftalar = []
        q = 0
        while pg.locator("[data-test=yoklama]").count() and q < 10:
            haftalar.append(pg.get_attribute("[data-test=yoklama]", "data-hafta"))
            if q == 1: shot(pg, f"seviye-yoklama-madde-{sema}", full=False)
            coz(pg); q += 1; pg.wait_for_selector(f"[data-test=yoklama][data-q='{q}'], [data-test=yoklama-sonuc]", timeout=15000)
        pg.wait_for_selector("[data-test=yoklama-sonuc]", timeout=15000)
        check(haftalar == ["1", "1", "2", "2"], f"yoklama haftaları sırayla, haftadan 2 madde ({haftalar})")
        s = sonuc(pg)
        check(bool(s) and s["g"] == "1" and s["d"] == 4 and "A2'ye hazırsın" in s["metin"], f"≥ %80: 'A2'ye hazırsın' ({s and (s['d'], s['t'])})")
        check(pg.inner_text("[data-test=a2-basla]").strip() == "9. haftadan başla", "sonuçta '9. haftadan başla'")
        x0 = pg.evaluate(META, "xp")
        check(not x0 or x0.get("toplam", 0) == 0, f"yoklama XP vermez ({x0})")
        no_overflow(pg, "yoklama sonucu (geçti)"); shot(pg, f"seviye-sonuc-gecti-{sema}", full=False)
        istek = []
        pg.on("request", lambda r: istek.append(r.url.rsplit("/", 1)[-1]) if "/m1/gun-" in r.url else None)
        pg.click("[data-test=a2-basla]"); pg.wait_for_selector("[data-test=next-activity]", timeout=20000)
        bugun = pg.evaluate("() => [...document.querySelectorAll('[data-test=yol] section.yolgun')].map((s) => s.dataset.test)")
        check(bugun == ["gun-57"], f"Bugün: 57. gün ({bugun})")
        bas = pg.evaluate(META, "seviye:baslangic")
        check(bool(bas) and bas.get("gun") == 57, f"başlangıç cihazda 57 ({bas})")
        check(pg.evaluate(GUNLER) == [], "atlanan günler için kalıcı gün bitişi (m1:gun) yazılmadı")
        x1 = pg.evaluate(META, "xp")
        check(not x1 or x1.get("toplam", 0) == 0, f"seri ve XP uydurma dolmadı ({x1})")
        it = pg.evaluate(ITEMS)
        check(it["atl"] > 0 and it["sifir"] == it["atl"], f"A1 kartları 'biliniyor' diye Bahçe'de, kanıt sayaçları sıfır ({it})")
        check(it["simdi"] == 0 and it["ilk"] >= 20, f"yoklamada yanlış yok: hiçbir kart hemen vadeli değil; ilk tekrar ≥ 21 gün ({it})")
        pg.goto(base + "#/yol"); pg.reload(); pg.wait_for_selector("[data-test=yol] [data-test=gun-57]", timeout=20000)
        y = yol_durumu(pg)
        yuk = sorted(set(istek))
        check(yuk == ["gun-57.json"], f"açılışta yalnız 9. haftanın gün dosyası ({yuk})")
        atl = {h: a for h, a, _ in y["h"]}
        check(atl.get("hafta-1") == "1" and atl.get("hafta-2") == "1" and atl.get("hafta-3") == "1", f"A1 haftaları 'atlandı' ({y['h']})")
        check(all("atlandı" in tx and "tamam" not in tx for h, a, tx in y["h"] if a == "1"), "atlanan hafta satırı 'atlandı' der, 'tamam' demez")
        check(y["simdi"] == ["gun-57"] and y["hazir"] == 0, f"9. hafta açık, 57. gün şimdi; atlanan haftalar için 'test hazır' yok ({y})")
        pg.click("[data-test=hafta-1] .hafta-satir-btn")
        g1 = pg.evaluate("() => { const l = document.querySelector('[data-test=hafta-1-gunler] [data-test=gun-1]'); return l ? { d: l.dataset.durum, gir: !!l.querySelector('[data-test=gir-1]'), t: l.innerText } : null; }")
        check(bool(g1) and g1["d"] == "atlandi" and g1["gir"], f"atlanan hafta açılır; gün 'atlandı' + 'Gir' ({g1})")
        no_overflow(pg, "Yol (A2'den)"); shot(pg, f"seviye-yol-atlandi-{sema}", full=False)
        check(pg.get_attribute("[data-test=gir-1]", "href") == "#/akis/1", "'Gir' atlanan günün akışına gider")
        pg.click("[data-test=gir-1]"); pg.wait_for_selector("[data-test=gun-kilitli], [data-test=akis]", timeout=20000)
        check(pg.locator("[data-test=akis]").count() == 1 and pg.locator("[data-test=gun-kilitli]").count() == 0, "atlanan gün kilitli değil, akışı açılır: isteyen döner")
        # halkasız atlanan gün (e2e paketinde halka önerisi olmayan gün; yoksa atlanır): çıkmaz sokak yok (inceleme #245 2. tur P1-1)
        halkasiz = pg.evaluate("""async () => { const v = (await (await fetch('content/current.json')).json()).version;
          for (const g of [2, 3, 4, 5, 6, 7, 8, 9, 15]) { const r = await fetch('content/' + v + '/m1/gun-' + String(g).padStart(2, '0') + '.json'); if (!r.ok) continue; const d = await r.json(); if (!d.halkalar || !d.halkalar.length) return g; } return null; }""")
        if halkasiz:
            pg.goto(base + f"#/akis/{halkasiz}"); pg.wait_for_selector("[data-test=akis-degil], [data-test=gun-kilitli]", timeout=20000)
            check(pg.locator("[data-test=akis-degil]").count() == 1 and all(pg.locator(f"[data-test={x}]").count() == 1 for x in ("degil-bahce", "degil-kayitlar", "degil-rehber", "degil-yol")),
                  f"halkasız atlanan gün ({halkasiz}): Bahçe, kayıtlar, Rehber, Yol'a dön")
            pg.click("[data-test=degil-bahce]"); pg.wait_for_selector("[data-test=garden-intro], [data-test^=gq-], [data-test=garden-done], [data-test=garden-empty], [data-test=hizli-oneri], [data-test=gun-kilitli]", timeout=20000)
            check(pg.locator("[data-test=gun-kilitli]").count() == 0, f"halkasız atlanan günün ({halkasiz}) Bahçe'si açılır")
            pg.wait_for_timeout(500)
            xb = pg.evaluate(META, "xp"); mb = pg.evaluate(META, f"m1:bahce:{halkasiz}")
            check((not xb or xb.get("toplam", 0) == 0) and not mb, f"atlanan günün Bahçe'si adım bitirmez: XP, seri, m1:bahce yazılmadı ({xb}, {mb})")
        else: print("   (e2e paketinde halkasız gün yok; sınama atlandı)")
        pg.goto(base + "#/akis/57"); pg.wait_for_selector("[data-test=akis], [data-test=gun-kilitli]", timeout=20000)
        check(pg.locator("[data-test=akis]").count() == 1, "57. günün akışı açılır")
        # 57. gün oynanır (PM-114 md. 5): ses durağı bitmiş sayılır, sonra akışın adımları geçilir; akış kaydı ilerler
        sesler = pg.evaluate("""async () => { const v = (await (await fetch('content/current.json')).json()).version;
          return (await (await fetch('content/' + v + '/m1/gun-57.json')).json()).sesler.map((x) => x.id); }""")
        pg.evaluate("""async (ks) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
          await new Promise((ok) => { const t = d.transaction('meta', 'readwrite'); for (const k of ks) t.objectStore('meta').put({ key: k, value: { bitti: new Date().toISOString() } }); t.oncomplete = ok; }); d.close(); }""",
          ["m1:medya:" + x + ":1" for x in sesler])
        pg.reload(); pg.wait_for_selector("[data-test=akis]", timeout=20000)
        once = pg.evaluate(META, "akis:57") or {}
        gecilen = 0
        for _ in range(25):
            if pg.locator("[data-test=halka-sonu]").count(): pg.click("[data-test=halka-sonu-devam]"); pg.wait_for_timeout(150); continue
            if pg.locator("[data-test=akis-durak-gecis]").count(): break
            if adim_gec(pg) is None: break
            gecilen += 1
        sonra = pg.evaluate(META, "akis:57") or {}
        check(gecilen >= 5 and len(sonra.get("sonuclar", [])) > len(once.get("sonuclar", [])), f"57. günün akışı oynanır: {gecilen} adım geçildi, kayıt ilerledi ({len(once.get('sonuclar', []))} → {len(sonra.get('sonuclar', []))} sonuç)")
        shot(pg, f"seviye-akis-57-{sema}", full=False)
        pg.goto(base + "#/garden/57"); pg.wait_for_selector("[data-test=garden-intro], [data-test^=gq-], [data-test=garden-done], [data-test=garden-empty], [data-test=hizli-oneri], [data-test=gun-kilitli]", timeout=20000)
        check(pg.locator("[data-test=gun-kilitli]").count() == 0, "57. günün Bahçe'si açılır")
        # fikstürün 57. günü 9. günün kartlarını taşır: hepsi atlanan günden "biliniyor" → Bahçe onları yeniden tanıtmaz (sakin bahçe)
        check(pg.locator("[data-test=garden-empty]").count() == 1 or pg.locator("[data-test=garden-intro]").count() == 1, "57. günün Bahçe'si: tanıtım ya da sakin bahçe")
        shot(pg, f"seviye-bahce-57-{sema}", full=False)
        if pg.locator("[data-test=garden-intro]").count():
            ilk = pg.inner_text("[data-test=garden-intro] .de-xl").strip()
            g1k = pg.evaluate("async () => { const b = (await (await fetch('content/current.json')).json()).version; const i = await (await fetch(`content/${b}/index.json`)).json(); return i.m1.filter((g) => g.day < 57).flatMap((g) => g.kartlar).map((k) => k.replace(/^lx:/, '').split('#')[0]); }")
            check(ilk not in g1k, f"Bahçe A1 kartını yeniden tanıtmıyor (ilk tanıtım '{ilk}')")
        b.close()

        # ---------- B) düşük sonuç ----------
        print("B) düşük sonuç → tekrar → A1'in 2. haftası; sonra Yine de A2")
        b, ctx = launch(p, color_scheme=sema); pg = new_page(ctx)
        ctx.add_init_script("try { sessionStorage.setItem('e2e-gun-kilidi', 'acik'); } catch (e) {}")
        login_onboard(pg, PORT, baslangic="a2")
        yoklama_coz(pg, yanlis_q=(2, 3))
        s = sonuc(pg)
        check(bool(s) and s["g"] == "0" and s["d"] == 2 and "hazırsın" not in s["metin"] and "zorlandın" in s["metin"], f"< %80: 'hazırsın' denmez, zorlanılanlar söylenir ({s and (s['d'], s['t'])})")
        check(s["z"] == [8, 9] and s["e"] == "2", f"zorlanılan 'yapabiliyorum' cümleleri gün gün (8., 9. gün), en erken zayıf hafta 2 ({s['z']}, {s['e']})")
        check("8. GÜN · 0/1 DOĞRU" in s["metin"], "satırda hafta, gün ve doğru/toplam")
        check(pg.inner_text("[data-test=a1-hafta-basla]").strip() == "A1'in 2. haftasından başla" and pg.locator("[data-test=a2-yine]").count() == 1, "iki seçenek: 'Yine de A2'den başla' / 'A1'in 2. haftasından başla'")
        no_overflow(pg, "yoklama sonucu (düşük)"); shot(pg, f"seviye-sonuc-dusuk-{sema}", full=False)
        check(pg.get_attribute("[data-test=zayif-tekrar]", "href") == "#/seviye/tekrar/8,9", "'Bunları tekrar et' zayıf günlere gider")
        pg.click("[data-test=zayif-tekrar]"); pg.wait_for_selector("[data-test=hafta-tekrar]", timeout=15000)
        gun_ = set(); n = 0
        while pg.locator("[data-test=hafta-tekrar]").count() and n < 20:
            gun_.add(pg.get_attribute("[data-test=hafta-tekrar]", "data-gun")); coz(pg); n += 1
            pg.wait_for_selector("[data-test=hafta-tekrar], [data-test=hafta-tekrar-sonuc]", timeout=15000)
        check(sorted(gun_) == ["8", "9"] and 2 <= n <= 8, f"tekrar turu 8. ve 9. günün gün sınavından ({n} madde, {sorted(gun_)})")
        pg.click("[data-test=seviye-sonuca]"); pg.wait_for_selector("[data-test=yoklama-sonuc]", timeout=15000)
        check(sonuc(pg)["z"] == [8, 9], "tekrardan sonra karar ekranı aynı (karar öğrencinin)")
        pg.click("[data-test=a1-hafta-basla]"); pg.wait_for_selector("[data-test=next-activity]", timeout=20000)
        bugun = pg.evaluate("() => [...document.querySelectorAll('[data-test=yol] section.yolgun')].map((s) => s.dataset.test)")
        check(bugun == ["gun-8"] and pg.evaluate(META, "seviye:baslangic").get("gun") == 8, f"A1'in 2. haftasından: Bugün 8. gün ({bugun})")
        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=hafta-1]", timeout=15000)
        y = yol_durumu(pg)
        check(dict((h, a) for h, a, _ in y["h"]).get("hafta-1") == "1" and y["simdi"] == ["gun-8"], f"1. hafta atlandı, 8. gün şimdi ({y})")
        # Ayarlar → A2'den → 1. hafta yanlış → Yine de A2'den başla
        pg.goto(base + "#/ben/ayarlar"); pg.wait_for_selector("[data-test=ayar-baslangic]", timeout=15000)
        check("A1'in 2. haftasından" in pg.inner_text("[data-test=baslangic-simdi]"), "Ayarlar şu anki başlangıcı söyler")
        pg.click("[data-test=baslangic-a2]")
        yoklama_coz(pg, yanlis_q=(0, 1))
        s = sonuc(pg)
        check(s["g"] == "0" and s["e"] == "1" and pg.inner_text("[data-test=a1-hafta-basla]").strip() == "A1'in başından başla", f"1. haftada zorlanınca seçenek 'A1'in başından başla' ({s['e']})")
        pg.click("[data-test=a2-yine]"); pg.wait_for_selector("[data-test=next-activity]", timeout=20000)
        bugun = pg.evaluate("() => [...document.querySelectorAll('[data-test=yol] section.yolgun')].map((s) => s.dataset.test)")
        check(bugun == ["gun-57"], f"'Yine de A2'den başla': Bugün 57. gün ({bugun})")
        it = pg.evaluate(ITEMS)
        check(it["simdi"] >= 1, f"yoklamada yanlış yapılan maddenin kartı hemen tekrarda ({it})")

        # ---------- C) Ayarlar'dan geri dönüş ----------
        print("C) Ayarlar → Baştan (A1)")
        pg.goto(base + "#/ben/ayarlar"); pg.wait_for_selector("[data-test=baslangic-simdi]", timeout=15000)
        check("A2'den (9. hafta)" in pg.inner_text("[data-test=baslangic-simdi]"), "Ayarlar: 'Şu an: A2'den (9. hafta)'")
        pg.click("[data-test=baslangic-a1]"); pg.wait_for_selector("[data-test=baslangic-a1-soru]")
        try: pg.wait_for_selector(".toast", state="detached", timeout=3500)  # önceki adımın bildirimi görüntüye düşmesin
        except Exception: pass
        no_overflow(pg, "Ayarlar başlangıç"); shot(pg, f"seviye-ayarlar-{sema}", full=False)
        pg.click("[data-test=baslangic-a1-onay]"); pg.wait_for_selector("[data-test=next-activity]", timeout=20000)
        bugun = pg.evaluate("() => [...document.querySelectorAll('[data-test=yol] section.yolgun')].map((s) => s.dataset.test)")
        check(bugun == ["gun-1"], f"geri dönüş: Bugün 1. gün ({bugun})")
        it = pg.evaluate(ITEMS)
        check(it["sifir"] == 0, f"dokunulmamış 'biliniyor' kartlar çıktı; A1 gününde yeniden tanıtılır ({it})")
        pg.goto(base + "#/yol"); pg.wait_for_selector("[data-test=yol]", timeout=15000)
        y = yol_durumu(pg)
        check(all(a != "1" for _, a, _ in y["h"]), f"geri dönüşte 'atlandı' işareti kalmadı ({y['h']})")
        pg.goto(base + "#/akis/8"); pg.wait_for_selector("[data-test=akis], [data-test=gun-kilitli]", timeout=20000)
        check(pg.locator("[data-test=gun-kilitli]").count() == 1, "geri dönüşte 8. gün yeniden sıraya girdi (kilitli)")
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
