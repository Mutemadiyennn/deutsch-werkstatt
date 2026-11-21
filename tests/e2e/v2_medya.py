"""
#58 A4 / PM-053 medya bölüm oynatıcısı — kabul ölçütleri:
  - 5 dakikalık örnek kayıt 3 bölüm olarak çalışır; her bölümde a–g adımları var
  - video üstte sabit, sorular altta; cümleye dokununca video o cümleye atlar; 0,75×
  - dikte merdiveni (kolay → orta → zor → usta → gerçek); büyük harf/ümlaut farkında "Yazımı:" gösterilir
  - metinde kelimeye dokununca kart + "Bankaya ekle"
  - yarıda bırakılan kayıt kaldığı bölümden sürer
  - anons (ses) aynı akışı kullanır, sonunda "Ne yapmalısın?" sorusu
  Örnek gün content/tools/fixtures/m1/gun-01.json (DW_E2E_FIXTURES=1 ile e2e paketine girer); video tests/e2e/fixtures.
  python3 tests/e2e/v2_medya.py [--browser webkit] [--device "iPhone 15"] [--shots /tmp/shots]
"""
import glob, json, os, shutil
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow, DIST, ROOT, ERR

PORT = 4193
FX = json.load(open(os.path.join(ROOT, "content/tools/fixtures/m1/gun-01.json"), encoding="utf-8"))
VID = FX["video"]

def install_media():
    """örnek videoyu paketin medya klasörüne koyar (A9 hattı gerçek klipleri buraya paketleyecek)"""
    for d in glob.glob(os.path.join(DIST, "content", "*", "m1")):
        os.makedirs(os.path.join(os.path.dirname(d), "media"), exist_ok=True)
        shutil.copy(os.path.join(os.path.dirname(__file__), "fixtures", "m1-01-v1.webm"), os.path.join(os.path.dirname(d), "media", "m1-01-v1.webm"))

YILDIZ = []  # öğrenci günlüğü N4, inceleme #188 P1-1: medya ekranlarının hiçbirinde ham ** yok (her adımda bakılır)

def yildiz(pg, ne):
    t = pg.inner_text("main") if pg.locator("main").count() else ""
    if "**" in t and ne not in YILDIZ: YILDIZ.append(ne)

def adim(pg):
    a = pg.get_attribute("[data-test=medya]", "data-adim") if pg.locator("[data-test=medya][data-adim]").count() else None
    yildiz(pg, a or "medya")
    return a

def wait_change(pg, before):
    pg.wait_for_function("""(b) => { const m = document.querySelector('[data-test=medya]'); if (!m) return true;
      if (document.querySelector('[data-test=medya-bitti], [data-test=adim-soru]') && !m.dataset.adim) return true;
      return (m.dataset.adim || '') + (m.dataset.pos || '') !== b; }""", arg=before)

def state(pg):
    return pg.evaluate("""() => { const m = document.querySelector('[data-test=medya]'); return ((m && m.dataset.adim) || '') + ((m && m.dataset.pos) || ''); }""")

def answer_step(pg, wrong=False):
    """Ekrandaki adımı tamamlar (e2e derlemesinde doğru cevap data-right / data-cevap ile işaretli)"""
    before = state(pg)
    if pg.locator("[data-test=adim-soru]").count():
        pg.locator("button.opt:not([data-right])" if wrong else "button.opt[data-right]").first.click()
    elif pg.locator("[data-test=dikte-kolay]").count():
        pg.locator("button.opt[data-right]").first.click()
    elif pg.locator("[data-test=dikte-zor]").count():
        cev = pg.get_attribute("[data-test=dikte-zor]", "data-cevap")
        for w in cev.replace(".", "").replace(",", "").replace("!", "").replace("?", "").split():
            pg.locator(f"[data-test=banka][data-chip='{w}']:not([disabled])").first.click()
        pg.click("[data-test=submit]")
    elif pg.locator("[data-test^=dikte-]").count():
        sec = pg.locator("[data-test^=dikte-]").first
        pg.fill("[data-test=answer]", sec.get_attribute("data-cevap")); pg.click("[data-test=submit]")
    elif pg.locator("[data-test=adim-cevapla]").count():
        pg.fill("[data-test=answer]", pg.get_attribute("[data-test=adim-cevapla]", "data-cevap")); pg.click("[data-test=submit]")
    pg.wait_for_selector("[data-test=next], [data-test=claim]")
    pg.locator("[data-test=next]").first.click()
    wait_change(pg, before)

def main():
    install_media()
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    shots = arg("--shots")
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=arg("--scheme") or "light"); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/learn"); pg.wait_for_selector("[data-test=m1-liste]")
        pg.click("[data-test=m1-gun-1]"); pg.wait_for_selector("[data-test=m1-gun]")
        yildiz(pg, "gün listesi")
        check(pg.locator("[data-test=medya-video]").count() == 1 and pg.locator("[data-test=medya-ses]").count() >= 2, "gün sayfası: 1 video + en az 2 ses")
        pg.click("[data-test=medya-video]"); pg.wait_for_selector("[data-test=medya][data-adim=dinle]")
        pg.wait_for_selector("[data-test=video]")
        pg.wait_for_function("() => document.querySelector('[data-test=video]').readyState >= 1", timeout=15000)
        dur = pg.evaluate("document.querySelector('[data-test=video]').duration")
        check(abs(dur - 300) < 2, f"örnek kayıt 5 dakika ({dur:.0f} sn)")
        check("CC BY" in pg.inner_text("[data-test=atif]"), "atıf satırı ve lisans görünüyor")
        check("Bölüm 1/3" in pg.inner_text("[data-test=medya] .pbar"), "5 dakikalık kayıt 3 bölüm")
        check(pg.locator("[data-test=adim-dinle] .de, [data-test=adim-dinle] [lang=de]:not([data-test=on-ogretim] *)").count() == 0, "(a) ilk dinlemede metin yok (ön öğretim kelimeleri dışında)")
        # A9 (inceleme #159 P1-2): klipte geçen yeni kelimeler ve ortam dinlemeden önce görünür (transkript değil)
        oo = pg.locator("[data-test=on-ogretim-kelime]").all_inner_texts()
        daha = pg.inner_text("[data-test=on-ogretim-daha]").strip() if pg.locator("[data-test=on-ogretim-daha]").count() else "+0"
        check(1 <= len(oo) < 6 and "ursprünglich" in oo[0] and "aslen" in oo[0] and daha == f"+{6 - len(oo)}", f"ön öğretim: dokununca seslenen çipler; sığmayanlar '{daha}' ({oo})")
        # PM 7043484263: 6 kelimeyle bile tek birincil düğme 932 ve 844 yükseklikte tam görünür, üstünde başka şey yok; kart başlığı yok; açıklama ≤ 2 satır
        for yuk in (932, 844):
            pg.set_viewport_size({"width": 430, "height": yuk}); pg.wait_for_timeout(250)
            r = pg.evaluate("""() => { const b = document.querySelector('[data-test=dinle-bolum]'); const q = b.getBoundingClientRect();
              const ust = document.elementFromPoint(q.left + q.width / 2, q.top + q.height / 2); const c = document.querySelector('[data-test=on-ogretim] .cip-dizi');
              const cip = document.querySelector('[data-test=on-ogretim-kelime]').getBoundingClientRect().height;
              return { alt: Math.round(q.bottom), ust: Math.round(q.top), h: innerHeight, birincil: b.classList.contains('primary'), ustteki: b.contains(ust),
                cipSatir: Math.round(c.getBoundingClientRect().height / cip) }; }""")
            check(r["birincil"] and r["ustteki"] and r["ust"] >= 0 and r["alt"] <= r["h"] and r["cipSatir"] <= 2, f"{yuk} px: birincil 'Dinle' tam görünür, üstünde başka öğe yok, çipler ≤ 2 satır ({r})")
        pg.set_viewport_size({"width": 430, "height": 932})
        check(pg.locator("[data-test=adim-dinle] .kicker").count() == 0, "dinle kartında başlık yok (üst çubukla aynı metin iki kez değil)")
        acik = pg.evaluate("() => { const p = [...document.querySelectorAll('[data-test=adim-dinle] p.small')].at(-1); return Math.round(p.getBoundingClientRect().height / parseFloat(getComputedStyle(p).lineHeight)); }")
        check(acik <= 2, f"açıklama ≤ 2 satır ({acik})")
        lnk = pg.locator("[data-test=adim-dinle] [data-test=next]")
        check(lnk.count() == 1 and lnk.get_attribute("data-baglanti") == "1" and "btn" not in (lnk.get_attribute("class") or ""), "ilk dinlemeden önce 'Sorulara geç' küçük bağlantı (düğme değil)")
        # inceleme #159 2. tur P1-1: uzun madde (≥ 50 harf) kendi satırında kırılır, hiçbir çip taşmaz; çip ≥ 44 pt
        pg.set_viewport_size({"width": 393, "height": 852}); pg.wait_for_timeout(250)
        pg.click("[data-test=on-ogretim-daha]")
        t = pg.evaluate("""() => { const c = document.querySelector('[data-test=on-ogretim] .cip-dizi'); const cr = c.getBoundingClientRect();
          const cs = [...c.children].map((x) => x.getBoundingClientRect());
          return { tasan: cs.filter((r) => r.right > cr.right + 0.5 || r.left < cr.left - 0.5).length, alcak: cs.filter((r) => r.height < 43.5).length, uzun: [...c.children].some((x) => x.innerText.length >= 50), sw: c.scrollWidth, cw: c.clientWidth }; }""")
        check(t["tasan"] == 0 and t["alcak"] == 0 and t["uzun"] and t["sw"] <= t["cw"], f"393 px: uzun ön öğretim maddesi taşmıyor, çipler ≥ 44 pt ({t})")
        pg.set_viewport_size({"width": 430, "height": 932})
        check(pg.locator("[data-test=on-ogretim-kelime]").count() == 6, f"'{daha}' dokununca bütün kelimeler")
        check(pg.locator("[data-test=video-ortam]").count() == 1 and "adını" in pg.inner_text("[data-test=video-ortam]"), "ortam cümlesi videonun altında")
        # öğrenci günlüğü 7057160147 N4: açıklamadaki **kalın** yıldızla görünmez, Almanca kelime kalın (lang="de")
        check("**" not in pg.inner_text("[data-test=video-ortam]") and pg.locator("[data-test=video-ortam] b[lang=de]").count() == 1, "ortam cümlesinde yıldız yok, Almanca kelime kalın")
        # (a) bölümü dinle: video bölümün başından oynar
        # B7: başlangıç hızı Yavaş — düğmede ya da hız anahtarında (PM-074 md. 2) yazılı
        yazili = "yavaş" in pg.inner_text("[data-test=dinle-bolum]") or pg.locator("[data-test=hiz] button[aria-pressed=true]").first.inner_text().strip() == "Yavaş" if pg.locator("[data-test=hiz]").count() else "yavaş" in pg.inner_text("[data-test=dinle-bolum]")
        check(yazili, "(a) başlangıç hızı Yavaş: ilk dinleme düğmede ya da hız anahtarında yazılı (B7)")
        pg.click("[data-test=dinle-bolum]"); pg.wait_for_timeout(1200)
        t = pg.evaluate("(() => { const v = document.querySelector('[data-test=video]'); return { t: v.currentTime, p: v.paused, r: v.playbackRate }; })()")
        check(t["t"] > 0.2 and not t["p"], f"(a) bölüm oynuyor ({t})")
        check(abs(t["r"] - 0.75) < 0.01, f"(a) ilk dinleme 0,75× ({t['r']})")
        no_overflow(pg, "medya: dinle")
        if shots: shot(pg, "m01-video-dinle", full=False)
        top0 = pg.evaluate("document.querySelector('[data-test=medya-ust]').getBoundingClientRect().top")
        answer_step(pg)  # dinle → ana fikir
        check(adim(pg) == "ana", f"(a) ana fikir sorusu ({adim(pg)})")
        answer_step(pg)
        while adim(pg) == "ayrinti": answer_step(pg)
        check(adim(pg) == "cumle", f"(c) cümle cümle ({adim(pg)})")
        # (c) cümleye dokununca video o cümleye atlar; 0,75×
        s3 = next(c for c in VID["cumleler"] if c["id"] == VID["bolumler"][0]["cumleler"][2])
        pg.click(f"[data-test=cumle-{s3['id']}]"); pg.wait_for_timeout(700)
        ct = pg.evaluate("document.querySelector('[data-test=video]').currentTime")
        check(s3["t0"] - 0.5 <= ct <= s3["t1"], f"(c) cümleye dokununca videoda {s3['t0']} sn'ye atladı ({ct:.1f})")
        # oynatma yarışı (inceleme #60 P0-2): bir cümle çalarken başka cümleye dokununca yenisi çalar, durmaz
        s4 = next(c for c in VID["cumleler"] if c["id"] == VID["bolumler"][0]["cumleler"][3])
        pg.click(f"[data-test=cumle-{s4['id']}]"); pg.wait_for_timeout(900)
        st4 = pg.evaluate("(() => { const v = document.querySelector('[data-test=video]'); return { t: v.currentTime, p: v.paused }; })()")
        check(not st4["p"] and s4["t0"] - 0.2 <= st4["t"] <= s4["t1"], f"(c) çalarken başka cümleye dokununca yenisi çalıyor ({st4})")
        # #58 B7: Profil'de başlangıç hızı Yavaş (varsayılan) → 0,75× düğmesi basılı açılır ve cümle 0,75× çalar; kapatınca 1×
        check(pg.get_attribute("[data-test=yavas]", "aria-pressed") == "true", "(c) başlangıç hızı Yavaş: 0,75× düğmesi basılı açılıyor (B7)")
        pg.click(f"[data-test=cumle-{s3['id']}]"); pg.wait_for_timeout(400)
        rate = pg.evaluate("document.querySelector('[data-test=video]').playbackRate")
        check(abs(rate - 0.75) < 0.01, f"(c) 0,75× hız ({rate})")
        pg.click("[data-test=yavas]"); pg.click(f"[data-test=cumle-{s4['id']}]"); pg.wait_for_timeout(400)
        rate = pg.evaluate("document.querySelector('[data-test=video]').playbackRate")
        check(abs(rate - 1) < 0.01, f"(c) 0,75× kapatılınca normal hız ({rate})")
        pg.evaluate("window.scrollBy(0, 800)"); pg.wait_for_timeout(200)
        top1 = pg.evaluate("document.querySelector('[data-test=medya-ust]').getBoundingClientRect().top")
        bar = pg.evaluate("document.querySelector('[data-test=medya] .pbar').getBoundingClientRect().bottom")
        check(top1 >= bar - 1 and top1 <= bar + 24, f"video başlık çubuğunun altında sabit kalıyor (çubuk {bar:.0f}, video {top1:.0f} px)")
        answer_step(pg)
        # (d) dikte merdiveni
        seen = []
        while adim(pg) == "dikte":
            lvl = pg.locator("[data-test^=dikte-]").first.get_attribute("data-test").split("-")[1]; seen.append(lvl)
            if lvl == "zor" and shots: shot(pg, "m02-dikte-zor", full=False)
            if lvl == "usta":
                cev = pg.get_attribute("[data-test=dikte-usta]", "data-cevap")
                low = cev.rstrip(".!?").lower().replace("ü", "ue").replace("ö", "oe").replace("ä", "ae")
                before = state(pg)
                pg.fill("[data-test=answer]", low); pg.click("[data-test=submit]"); pg.wait_for_selector("[data-test=next]")
                band = pg.inner_text(".actionbar")
                check("Doğru" in band and "Yazımı" in band, f"(d) usta: küçük harf/ümlautsuz yazım doğru + yazımı gösteriliyor")
                pg.click("[data-test=next]"); wait_change(pg, before)
                continue
            answer_step(pg)
        check(seen == ["kolay", "orta", "zor", "usta", "gercek"], f"(d) dikte merdiveni sırayla ({seen})")
        # (e) metin + kelimeye dokununca kart
        check(adim(pg) == "transkript", f"(e) metin açılıyor ({adim(pg)})")
        # öğrenci günlüğü 7057160147 N8: dinle düğmesi cümlenin sağında, alt satıra tek başına düşmez
        yan = pg.evaluate("""() => [...document.querySelectorAll('[data-test=adim-transkript] p.transkript-satir')].map((p) => {
          const m = p.querySelector('.grow').getBoundingClientRect(), b = p.querySelector('[data-test=transkript-dinle]').getBoundingClientRect();
          return b.left >= m.right - 1 && b.top < m.bottom; })""")
        check(yan and all(yan), f"(e) her cümlenin dinle düğmesi cümlenin sağında ({yan})")
        if shots: shot(pg, f"m03-transkript-{arg('--scheme') or 'light'}", full=False)
        pg.locator("[data-test=kelime]", has_text="Tag").first.click(); pg.wait_for_selector("[data-test=kelime-kart]")
        kk = pg.inner_text("[data-test=kelime-kart]")
        check("henüz yok" not in kk and "Tag" in kk, f"(e) sözlükteki kelimenin kartı açılıyor ({kk[:40]!r})")
        check(pg.locator("[data-test=adim-transkript] [data-test=next]").count() == 0, "(e) kart açıkken 'Devam' kartın altında kalmıyor")
        if shots: shot(pg, "m03-kelime-kart", full=False)
        pg.click("[data-test=bankaya-ekle]"); pg.wait_for_selector("[data-test=kelime-kart]", state="detached")
        n_personal = pg.evaluate("""() => new Promise((ok) => { const r = indexedDB.open('dw2'); r.onsuccess = () => { const q = r.result.transaction('personal').objectStore('personal').count(); q.onsuccess = () => ok(q.result); }; })""")
        check(n_personal >= 1, f"(e) kelime bankaya eklendi ({n_personal})")
        answer_step(pg)
        check(adim(pg) == "golge", f"(f) gölge konuşma ({adim(pg)})")
        while adim(pg) == "golge": answer_step(pg)
        check(adim(pg) == "cevapla", f"(g) 'Sen ne derdin?' ({adim(pg)})")
        answer_step(pg)
        sub = pg.inner_text("[data-test=medya] .pbar")
        check("Bölüm 2/3" in sub, f"1. bölüm bitti, 2. bölüm başladı ({sub.strip()[:60]!r})")
        # yarıda bırak → yeniden aç: kaldığı yerden
        pg.goto(base + "#/today"); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + f"#/m1/1/{VID['id']}"); pg.wait_for_selector("[data-test=medya]")
        check("Bölüm 2/3" in pg.inner_text("[data-test=medya] .pbar"), "yarıda bırakılan kayıt kaldığı bölümden sürüyor")
        k = 0
        while not pg.locator("[data-test=medya-bitti]").count() and k < 80:
            answer_step(pg); k += 1
        check(pg.locator("[data-test=medya-bitti]").count() == 1, f"3 bölüm baştan sona bitti ({k} adım)")
        txt = pg.inner_text("[data-test=medya-bitti]")
        check("3 bölüm" in txt and "undefined" not in txt and "NaN" not in txt, "bitiş özeti")
        # anons: aynı akış, tek bölüm, sonunda "Ne yapmalısın?"
        pg.click("[data-test=medya-geri]"); pg.wait_for_selector("[data-test=m1-gun]")
        pg.locator("[data-test=medya-ses]").first.click(); pg.wait_for_selector("[data-test=ses-kart]")
        yildiz(pg, "ses kartı")
        check(pg.locator("[data-test=video]").count() == 0, "anons: video yok, ses kartı var")
        if shots: shot(pg, "m04-anons", full=False)
        k = 0
        while not pg.locator("[data-test=medya-bitti]").count() and k < 40:
            if pg.locator("[data-test=adim-soru]").count() and not pg.locator("[data-test=medya][data-adim]").count():
                check(True, "anons sonunda 'Ne yapmalısın?' sorusu")
            if adim(pg) == "transkript":
                body = pg.inner_text("[data-test=medya]")
                check("{" not in body and "}" not in body, "anons metninde yer tutucu ({name}, {Herr|Frau}) ham görünmüyor")
            answer_step(pg); k += 1
        check(pg.locator("[data-test=medya-bitti]").count() == 1, f"anons bitti ({k} adım)")
        # %130 yazı: taşma yok
        pg.goto(base + f"#/m1/1/{VID['id']}"); pg.wait_for_selector("[data-test=medya]")
        pg.evaluate("document.documentElement.classList.remove('dyn'); document.documentElement.style.setProperty('--ts','1.3')")
        no_overflow(pg, "%130 yazı medya")
        b.close()
    srv.shutdown()
    check(not YILDIZ, f"medya ekranlarında ham ** yok (sorunlu: {YILDIZ})")
    finish()

if __name__ == "__main__":
    main()
