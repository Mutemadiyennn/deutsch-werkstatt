"""
B15 1. adım (PM-064 + PM 7016783246-2, 7017526063): karaktere göre ses, "Yavaş" yalnızca hız, Ses ve mikrofon denemesi.
  - sahte iPhone ses listesi (Anna, Helena (Erweitert), Markus, Viktor (Erweitert) + başka dil); okunan her cümlenin sesi,
    hızı ve perdesi kaydedilir
  - Profil → Ses ve mikrofon: kadın/erkek havuzu; "Dinle" ve "Yavaş": aynı ses, aynı perde, hız ≥ %20 düşük
  - karakterlerin sesi: erkek karakter erkek, kadın karakter kadın sesi; yeniden açılışta aynı (sabit)
  - iki konuşanlı kayıt (M1 1. gün, iki kişilik sahne ya da ses): iki farklı ses/perde
  - hız ölçümü (PM 7042161522-1): "Hızı ölç" normal/yavaş süreyi yazar; yavaşlamayan ses uyarısı ve kabuk satırı notu;
    yavaş hızı 0,6/0,5/0,4 seçilir, yeniden açılışta kalır ve "Yavaş" o hızla çalar
  - mikrofon: kullanılan yol yazılı; sahte tanıma "Guten Morgen" → ekranda; izin reddi → Türkçe neden
python3 tests/e2e/v2_ses.py [--browser webkit] [--device "iPhone 15"] [--shots DIR]
"""
import re, json
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow

PORT = 4213
TEMA = arg("--scheme") or "light"
GIF = arg("--gif"); KARELER = []
def kare(pg, n=4):
    if GIF:
        for _ in range(n): KARELER.append(pg.screenshot()); pg.wait_for_timeout(250)

SAHTE = """(() => {
  const V = [["Anna","de-DE"],["Helena (Erweitert)","de-DE"],["Markus","de-DE"],["Viktor (Erweitert)","de-DE"],["Eddy (Deutsch (Deutschland))","de-DE"],["Grandma (Deutsch (Deutschland))","de-DE"],["Samantha","en-US"],["Yelda","tr-TR"]]
    .map(([name, lang]) => ({ name, lang, voiceURI: name, localService: true, default: false }));
  window.__oku = [];
  const ss = { speaking: false, pending: false, paused: false, getVoices: () => V, cancel() {}, addEventListener() {}, removeEventListener() {},
    speak(u) { window.__oku.push({ text: u.text, ses: u.voice ? u.voice.name : null, rate: u.rate, pitch: u.pitch }); u.onstart && u.onstart();
      // __sure: süre hıza bağlı; Viktor iOS'taki gibi hızı yok sayar (PM 7042161522-1)
      const ms = !window.__sure ? 30 : (u.voice && u.voice.name.startsWith('Viktor')) ? 600 : Math.round(600 / u.rate);
      setTimeout(() => u.onend && u.onend(), ms); } };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: ss });
  window.SpeechSynthesisUtterance = function (t) { this.text = t; this.rate = 1; this.pitch = 1; this.voice = null; };
  // sahte mikrofon akışı (seviye göstergesi); window.__gumHata ayarlıysa izin reddi
  navigator.mediaDevices = navigator.mediaDevices || {};
  navigator.mediaDevices.getUserMedia = async () => { if (window.__gumHata) { const e = new Error('Permission denied'); e.name = 'NotAllowedError'; throw e; }
    const ac = new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(); const d = ac.createMediaStreamDestination(); o.connect(d); o.start(); return d.stream; };
  // sahte tanıma: window.__srHata ayarlıysa o hata, yoksa "Guten Morgen"
  window.webkitSpeechRecognition = function () { const r = this;
    r.start = () => setTimeout(() => { if (window.__srHata) { r.onerror && r.onerror({ error: window.__srHata }); r.onend && r.onend(); return; }
      r.onresult && r.onresult({ results: [[{ transcript: "Guten Morgen" }]] }); r.onend && r.onend(); }, 80);
    r.stop = () => {}; };
  window.SpeechRecognition = window.webkitSpeechRecognition;  // yeni Chromium önek olmadan da tanımlar
})()"""

def main():
    shots = arg("--shots")
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p, color_scheme=TEMA); ctx.add_init_script(SAHTE); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.goto(base + "#/profile"); pg.click("[data-test=ses-deneme-ac]"); pg.wait_for_selector("[data-test=ses-deneme]")
        pg.wait_for_selector("[data-test=kabuk-satir]")
        check(pg.inner_text("[data-test=kabuk-satir]") == "Kabuk: yok (tarayıcıda açık)", "tarayıcıda kabuk satırı: kabuk yok")
        kadin = pg.locator("[data-test=havuz-kadin] [data-test=ses]").evaluate_all("(xs) => xs.map((x) => x.dataset.ad)")
        erkek = pg.locator("[data-test=havuz-erkek] [data-test=ses]").evaluate_all("(xs) => xs.map((x) => x.dataset.ad)")
        kare(pg, 8)
        check(kadin == ["Helena (Erweitert)", "Anna"] and erkek == ["Viktor (Erweitert)", "Markus"], f"havuzlar: kadın {kadin}, erkek {erkek}; gelişmiş önce, başka dil yok")
        # Dinle ve Yavaş: aynı ses, aynı perde, hız ≥ %20 düşük
        pg.evaluate("window.__oku = []")
        pg.locator("[data-test=havuz-erkek] [data-test=ses-dinle]").first.click(); pg.wait_for_function("() => window.__oku.length >= 1")
        pg.locator("[data-test=havuz-erkek] [data-test=ses-yavas]").first.click(); pg.wait_for_function("() => window.__oku.length >= 2")
        n, y = pg.evaluate("window.__oku.slice(-2)")
        check(n["ses"] == y["ses"] == "Viktor (Erweitert)" and n["pitch"] == y["pitch"] and y["rate"] <= n["rate"] * 0.8, f"Yavaş yalnızca hız: {n['ses']} {n['rate']}→{y['rate']}, perde {n['pitch']}={y['pitch']}")
        check(y["rate"] <= n["rate"] / 1.5 + 0.01, f"Yavaş hızı normalin en az 1,5 katı süre hedefler ({n['rate']}→{y['rate']})")
        # hız ölçümü (PM 7042161522-1)
        sec = pg.locator("[data-test=yavas-oran] button[aria-pressed=true]").get_attribute("data-oran")
        check(sec == "0.5", f"varsayılan yavaş hızı 0,5 ({sec})")
        # sıfır süreli ses (hiç çalmıyor): ölçülemedi; oran, uyarı ve kayıt yok (PM 7043447488-1)
        pg.evaluate("window.__sure = 0"); pg.click("[data-test=hiz-olc]")
        pg.wait_for_function("() => { const b = document.querySelector('[data-test=hiz-olc]'); return b && !b.disabled && document.querySelectorAll('[data-test=hiz-olculemedi]').length >= 2; }", timeout=15_000)
        check(pg.locator("[data-test=hiz-sonuc]").count() == 0 and pg.locator("[data-test=hiz-uyari]").count() == 0 and pg.locator("[data-test=ses-hiz]").count() == 0
              and pg.evaluate("localStorage.getItem('dw2-ses-hiz') || '{}'") == "{}", "sıfır süreli seste 'ölçülemedi, yeniden dene'; oran, uyarı, kayıt yok")
        pg.evaluate("window.__sure = 1; window.__oku = []"); pg.click("[data-test=hiz-olc]")
        check(pg.locator("[data-test=hiz-sonuc]").count() == 0, "ölçüm sürerken yarım satır yok")
        pg.wait_for_function("() => { const b = document.querySelector('[data-test=hiz-olc]'); return b && !b.disabled && document.querySelectorAll('[data-test=hiz-sonuc]').length >= 2; }", timeout=15_000)
        ara = pg.evaluate("() => { const b = document.querySelector('[data-test=hiz-olc]').getBoundingClientRect(); const r = document.querySelector('[data-test=hiz-sonuc]').getBoundingClientRect(); return Math.round(r.top - b.bottom); }")
        check(ara >= 10, f"sonuç satırları düğmeden ayrık (aralık {ara} px)")
        check(pg.evaluate("window.__oku.length") == 4, f"ölçüm iki sesi normal ve yavaş çaldı ({pg.evaluate('window.__oku.length')} çalma)")
        sonuc = {e["ad"]: e["t"] for e in pg.locator("[data-test=hiz-sonuc]").evaluate_all("(xs) => xs.map((x) => ({ ad: x.dataset.ad, t: x.innerText }))")}
        check(set(sonuc) == {"Helena (Erweitert)", "Viktor (Erweitert)"} and all(re.search(r"Normal \d+,\d sn · Yavaş \d+,\d sn \(×\d,\d\d\)", t) for t in sonuc.values()), f"ölçüm: kadın ve erkek havuzunun ilk sesi, 'Normal x sn · Yavaş y sn' ({list(sonuc.values())})")
        KAT = lambda t: float(re.search(r"×(\d,\d\d)", t).group(1).replace(",", ".")) if re.search(r"×(\d,\d\d)", t) else 0
        check("Normal 0,6 sn" in sonuc.get("Viktor (Erweitert)", "") and KAT(sonuc.get("Helena (Erweitert)", "")) >= 1.6 and 0.85 <= KAT(sonuc.get("Viktor (Erweitert)", "")) < 1.25, f"yavaşlayan ses ≈1,9 kat, yavaşlamayan ≈1,0 kat ölçülüyor ({[KAT(t) for t in sonuc.values()]})")
        uy = pg.inner_text("[data-test=hiz-uyari]") if pg.locator("[data-test=hiz-uyari]").count() else ""
        check(uy.startswith("Bu ses yavaşlamıyor: Viktor") and "Helena" not in uy, f"yalnız yavaşlamayan ses için uyarı ({uy[:60]})")
        check("yavaşlamıyor" in pg.locator("[data-test=havuz-erkek] [data-test=ses]").first.inner_text() and "yavaşlamıyor" not in pg.locator("[data-test=havuz-kadin] [data-test=ses]").first.inner_text(), "ses satırında ölçüm ve 'yavaşlamıyor' işareti")
        satir_hiz = pg.locator("[data-test=havuz-kadin] [data-test=ses-hiz]").first.inner_text()
        check(re.fullmatch(r"normal \d+,\d · yavaş \d+,\d sn", satir_hiz) is not None, f"ses satırında hangisinin ne olduğu yazılı ({satir_hiz})")
        kab = pg.inner_text("[data-test=kabuk-satir]")
        check(re.search(r"yavaş: Helena ×\d,\d\d, Viktor ×\d,\d\d yavaşlamıyor$", kab) is not None, f"kabuk satırına yavaş notu ({kab[-60:]})")
        if shots: pg.locator("[data-test=hiz-olcum]").scroll_into_view_if_needed(); shot(pg, f"s00-hiz-olcum-{TEMA}", full=False)
        no_overflow(pg, "hız ölçümü")
        pg.locator("[data-test=yavas-oran] button[data-oran='0.4']").click(); pg.wait_for_timeout(300)
        pg.reload(); pg.wait_for_selector("[data-test=yavas-oran]")
        check(pg.locator("[data-test=yavas-oran] button[aria-pressed=true]").get_attribute("data-oran") == "0.4", "yavaş hızı seçimi yeniden açılışta kalıyor")
        check(pg.locator("[data-test=hiz-sonuc]").count() == 2, "ölçüm sonuçları yeniden açılışta kalıyor")
        pg.evaluate("window.__sure = 0; window.__oku = []")
        pg.locator("[data-test=havuz-kadin] [data-test=ses-yavas]").first.click(); pg.wait_for_function("() => window.__oku.length >= 1")
        check(pg.evaluate("window.__oku[0].rate") == 0.4, f"'Yavaş' seçilen hızla çalıyor ({pg.evaluate('window.__oku[0].rate')})")
        # karakterler: liste kapalı başlar (PM 7022085356-4); açınca cinsiyete uygun, sabit; satırda teknik dil yok
        pg.wait_for_selector("[data-test=karakter-sesleri]")
        check(not pg.locator("[data-test=karakter-ses]").first.is_visible(), "karakter listesi kapalı başlıyor")
        check(pg.locator("[data-test=karakter-sesleri]").evaluate("(e) => e.compareDocumentPosition(document.querySelector('[data-test=mikrofon-deneme]')) & 2") != 0, "üstte sesler ve mikrofon, karakterler altta")
        hb = pg.locator("[data-test=karakter-ac]").bounding_box()
        check(hb and hb["height"] >= 44, f"'Karakterlerin sesi' başlığı ≥ 44 pt ({hb and round(hb['height'])})")
        if shots: pg.locator("[data-test=karakter-sesleri]").scroll_into_view_if_needed(); shot(pg, f"s00-karakter-kapali-{TEMA}", full=False)
        pg.click("[data-test=karakter-ac]"); pg.wait_for_selector("[data-test=karakter-ses]")
        adlar = pg.locator("[data-test=karakter-ses-ad]").all_inner_texts()
        check(all(re.match(r"^(Kadın|Erkek) sesi: \S|^Bu cihazda uygun ses yok$", x) for x in adlar) and not any(re.search(r"perde|cihaz sesi|Erweitert|\d\.\d", x) for x in adlar), f"karakter satırında yalnızca 'Kadın sesi: …' ({adlar[:3]})")
        cins = pg.locator("[data-test=karakter-ses]").evaluate_all("(xs) => xs.map((x) => [x.dataset.id, x.querySelector('[data-test=karakter-ses-ad]').innerText])")
        dunya = {c["id"]: c["ses"]["cinsiyet"] for c in json.load(open(__file__.rsplit("/", 1)[0] + "/../../content/v2/world/world.json"))["characters"]}
        check(len(cins) == len(dunya) and all(t.startswith({"erkek": "Erkek", "kadin": "Kadın"}[dunya[i]]) for i, t in cins), f"12 satırın hepsinde 'Kadın/Erkek' karakterin cinsiyeti ({len(cins)}/{len(dunya)})")
        ks = {e["id"]: e for e in pg.locator("[data-test=karakter-ses]").evaluate_all("(xs) => xs.map((x) => ({ id: x.dataset.id, ses: x.dataset.ses, pitch: x.dataset.pitch }))")}
        erkekler = [ks[i]["ses"] for i in ("ch:lechner", "ch:weber", "ch:pichler") if i in ks]
        kadinlar = [ks[i]["ses"] for i in ("ch:huber", "ch:stadler", "ch:brandl") if i in ks]
        check(erkekler and all(s in erkek for s in erkekler) and kadinlar and all(s in kadin for s in kadinlar), f"erkek karakter erkek sesi {erkekler}, kadın karakter kadın sesi {kadinlar}")
        check(not any(v["ses"].startswith(("Eddy", "Grandma")) for v in ks.values()), "karakterlere eğlence sesi düşmüyor (daha iyi ses varken)")
        # listedeki ses = "Dinle"nin çaldığı ses (inceleme #117 P1-3)
        satir = pg.locator("[data-test=karakter-ses][data-id='ch:aksoy']")
        pg.evaluate("window.__oku = []"); satir.locator("button").click(); pg.wait_for_function("() => window.__oku.length >= 1")
        calan = pg.evaluate("window.__oku[0]")
        check(calan["ses"] == ks["ch:aksoy"]["ses"] and str(calan["pitch"]) in (ks["ch:aksoy"]["pitch"], ks["ch:aksoy"]["pitch"] + ".0"), f"listede yazan ses çalıyor ({ks['ch:aksoy']['ses']} = {calan['ses']})")
        pg.locator("[data-test=karakter-sesleri]").scroll_into_view_if_needed(); kare(pg, 8)
        no_overflow(pg, "ses denemesi")
        if shots: shot(pg, f"s01-ses-deneme-{TEMA}", full=False)
        pg.reload(); pg.wait_for_selector("[data-test=karakter-sesleri]"); pg.click("[data-test=karakter-ac]"); pg.wait_for_selector("[data-test=karakter-ses]")
        ks2 = {e["id"]: e["ses"] for e in pg.locator("[data-test=karakter-ses]").evaluate_all("(xs) => xs.map((x) => ({ id: x.dataset.id, ses: x.dataset.ses }))")}
        check(all(ks2[k] == v["ses"] for k, v in ks.items()), "yeniden açılışta her karakter aynı ses (sabit)")
        # mikrofon: yol, tanıma, hata
        check(pg.inner_text("[data-test=stt-yol]").strip() == "Bu cihazda: tarayıcı tanıması", "mikrofon: tek satır durum (tarayıcı)")
        check("%" not in pg.inner_text("[data-test=ses-deneme]") and "Yavaş: aynı ses, daha ağır" in pg.inner_text("[data-test=ses-deneme]"), "yavaş: yüzde yok, 'aynı ses, daha ağır'")
        pg.click("[data-test=mic-dene]"); pg.wait_for_selector("[data-test=mic-sonuc], [data-test=mic-hata]")
        pg.locator("[data-test=mikrofon-deneme]").scroll_into_view_if_needed(); kare(pg, 8)
        check("Guten Morgen" in (pg.inner_text("[data-test=mic-sonuc]") if pg.locator("[data-test=mic-sonuc]").count() else ""), "\"Guten Morgen\" söylendi → tanınan metin ekranda")
        pg.evaluate("window.__srHata = 'not-allowed'; window.__gumHata = 1"); pg.click("[data-test=mic-dene]"); pg.wait_for_selector("[data-test=mic-hata]")
        check("izni yok" in pg.inner_text("[data-test=mic-hata]"), "izin reddi: Türkçe neden ve ne yapılacağı")
        pg.evaluate("window.__srHata = 'service-not-allowed'; window.__gumHata = 0"); pg.click("[data-test=mic-dene]"); pg.wait_for_function("() => !!document.querySelector('[data-test=mic-hata]')?.innerText.includes('kullanılamıyor')")
        check(True, "tanıma hizmeti yok: ayrı Türkçe neden")
        if shots: pg.locator("[data-test=mikrofon-deneme]").scroll_into_view_if_needed(); shot(pg, f"s02-mikrofon-{TEMA}", full=False)
        # iki konuşanlı kayıt: M1 1. gün seslerinde konuşan farklıysa ses farklı
        pg.goto(base + "#/m1/1/m1%3A01%3Aa1"); pg.wait_for_selector("[data-test=dinle-bolum]")
        pg.evaluate("window.__oku = []"); pg.click("[data-test=dinle-bolum]"); pg.wait_for_function("() => window.__oku.length >= 1")
        a1 = pg.evaluate("window.__oku[0]")
        pg.goto(base + "#/m1/1/m1%3A01%3Aa2"); pg.reload(); pg.wait_for_selector("[data-test=dinle-bolum]")
        check("a2" in pg.evaluate("location.hash"), "ikinci kayıt açıldı")
        pg.evaluate("window.__oku = []"); pg.click("[data-test=dinle-bolum]"); pg.wait_for_function("() => window.__oku.length >= 1")
        a2 = pg.evaluate("window.__oku[0]")
        check((a1["ses"], a1["pitch"]) != (a2["ses"], a2["pitch"]) and a1["ses"] in kadin and a2["ses"] in erkek, f"kadın anons ({a1['ses']}) ve erkek sesli mesaj ({a2['ses']}) farklı seslerle")
        b.close()
        # kabuk (iPhone uygulaması): tarayıcı arayüzü olsa da önce iPhone'un kendi tanıması (inceleme #117 P1-7)
        b, ctx = launch(p, color_scheme=TEMA); ctx.add_init_script(SAHTE)
        ctx.add_init_script("""window.Capacitor = { isNativePlatform: () => !!window.__kabuk, Plugins: { SpeechRecognition: {
          checkPermissions: async () => ({ speechRecognition: window.__yerelIzin || 'granted' }),
          requestPermissions: async () => ({ speechRecognition: window.__yerelIzin || 'granted' }),
          // __yavasYerel: iOS'taki gibi sonuç yalnızca stop() ile gelir (inceleme #117 2. tur P1-A)
          start: () => window.__yavasYerel ? new Promise((r) => { window.__yerelBitir = () => setTimeout(() => r({ matches: ['Guten Morgen durdurunca'] }), 150); }) : Promise.resolve({ matches: ['Guten Morgen yerel'] }),
          stop: async () => { if (window.__yerelBitir) { const f = window.__yerelBitir; window.__yerelBitir = null; f(); } } } } };""")
        pg = new_page(ctx); login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        pg.evaluate("window.__kabuk = 1")  # giriş web gibi; sonra kabuk (yeniden yükleme yok)
        pg.goto(base + "#/ses"); pg.wait_for_selector("[data-test=mikrofon-deneme]")
        check(pg.inner_text("[data-test=stt-yol]").strip() == "Bu cihazda: iPhone'un kendi tanıması", "kabukta tanıma yolu: iPhone'un kendi tanıması")
        # PM-071 1. adım: kabuk sürümü ve gerçekten bulunan eklentiler (sahte kabukta yalnızca konuşma tanıma var, sürüm bilinmiyor)
        pg.wait_for_selector("[data-test=kabuk-satir]"); ks = pg.inner_text("[data-test=kabuk-satir]")
        check(ks.startswith("Kabuk sürümü bilinmiyor · eklentiler: konuşma tanıma · eksik: ses kaydı"), f"kabuk satırı: bulunan ve eksik eklentiler ({ks[:90]})")
        pg.click("[data-test=mic-dene]"); pg.wait_for_selector("[data-test=mic-sonuc]")
        if shots: pg.locator("[data-test=kabuk-satir]").scroll_into_view_if_needed(); shot(pg, "s-kabuk-satir", full=False)
        check("yerel" in pg.inner_text("[data-test=mic-sonuc]"), "kabukta sonuç yerel eklentiden (tarayıcı arayüzü seçilmedi)")
        pg.evaluate("window.__yavasYerel = 1"); pg.click("[data-test=mic-dene]"); pg.wait_for_selector("[data-test=mic-sonuc], [data-test=mic-hata]", timeout=20_000)
        check(pg.locator("[data-test=mic-sonuc]").count() == 1 and "durdurunca" in pg.inner_text("[data-test=mic-sonuc]"), "süre dolunca durdurma sonucu atılmaz (zaman aşımı hatası yok)")
        pg.evaluate("window.__yavasYerel = 0"); pg.click("[data-test=mic-dene]"); pg.wait_for_timeout(9_500)
        check("yerel" in pg.inner_text("[data-test=mic-sonuc]") and pg.locator("[data-test=mic-hata]").count() == 0, "önceki oturumun zamanlayıcısı sonrakini kesmiyor")
        pg.evaluate("window.__yerelIzin = 'denied'"); pg.click("[data-test=mic-dene]"); pg.wait_for_selector("[data-test=mic-hata]")
        check("izni yok" in pg.inner_text("[data-test=mic-hata]") and pg.locator("[data-test=ayarlari-ac]").count() == 1, "kabukta tanıma izni yok: Türkçe neden + 'Ayarları aç'")
        b.close()
    srv.shutdown()
    if GIF and KARELER:
        import io, os
        from PIL import Image
        im = [Image.open(io.BytesIO(k)).convert("P", palette=Image.ADAPTIVE) for k in KARELER]
        w = 390; im = [x.resize((w, int(x.height * w / x.width))) for x in im]
        im[0].save(GIF, save_all=True, append_images=im[1:], duration=int(10000 / len(im)), loop=0, optimize=True)
        check(os.path.getsize(GIF) > 0, f"GIF yazıldı ({len(im)} kare, ~10 sn)")
    finish()

if __name__ == "__main__":
    main()
