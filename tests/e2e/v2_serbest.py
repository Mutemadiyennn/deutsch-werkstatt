"""
PM-148 [ANA-V] md. 1: serbest sesli konuşma adımı (`serbest_konus`), e2e paketinde 2. güne fikstür maddesi (content/tools/fixtures/serbest-konus-e2e.json).
PM-135 ek 14: bayrak kapalı ve açık iki kez koşar.
  - kapalı (varsayılan): 2. günün planında serbest konuşma adımı yok
  - açık (`sessionStorage["e2e-serbest-konus"] = "1"`): gün sonu durağının ilk adımı; durum + görev Türkçe, Almanca ipucu yok, soru metni gizli
  - mikrofonla iki parça → "Bitirdim" → hedefler 2/2, sesli; örnek cevap; "Devam et" → kayıt `konusma:<tarih>` sesli 1, akış ilerler
  - "Bir daha dene" sıfırlar; yazarak cevap → "konuşma sayılmaz", kayıt sesli değil; tek cümle de konuşma sayılmaz
  - yapay zekâ isteğinde söylenen şehir yok ("[…]"); "Bitirdim" sonrası odak sonuç başlığında
  - mikrofonsuz tarayıcı: yazı alanı doğrudan, "Mikrofon yok" notu
  - taşma yok; --shots DIR ile açık/koyu ekran görüntüsü
python3 tests/e2e/v2_serbest.py [--browser webkit] [--device "iPhone 15 Pro Max"] [--scheme dark] [--shots DIR]
"""
import json
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, no_overflow, bekle_kosul

PORT = 4271
GUN = 2
SR = """(() => { window.__srSira = ["ich wohne in Rosenheim", "im Mai habe ich Geburtstag"]; window.__srNo = 0;
  navigator.mediaDevices = navigator.mediaDevices || {};
  navigator.mediaDevices.getUserMedia = async () => { const ac = new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(); const d = ac.createMediaStreamDestination(); o.connect(d); o.start(); return d.stream; };
  window.webkitSpeechRecognition = function () { const r = this; r.start = () => { setTimeout(() => { const t = window.__srSira[window.__srNo++ % window.__srSira.length]; r.onresult && r.onresult({ results: [[{ transcript: t }]] }); r.onend && r.onend(); }, 80); }; r.stop = () => {}; };
  window.SpeechRecognition = window.webkitSpeechRecognition;
  try { localStorage.setItem('dw2-mic-explained', '1'); } catch (e) {} })()"""
MIKSIZ = "(() => { try { delete window.webkitSpeechRecognition; delete window.SpeechRecognition; window.webkitSpeechRecognition = undefined; window.SpeechRecognition = undefined; } catch (e) {} })()"
META = """async (k) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const m = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get(k); t.onsuccess = () => ok(t.result && t.result.value); }); d.close(); return m || null; }"""
GUNSONUNA = """async (gun) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const k = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get('akis:' + gun); t.onsuccess = () => ok(t.result.value); });
  k.durak = k.plan.duraklar.findIndex((x) => x.tur === 'gunsonu'); k.adim = 0;
  await new Promise((ok) => { const t = d.transaction('meta', 'readwrite'); t.objectStore('meta').put({ key: 'akis:' + gun, value: k }); t.oncomplete = ok; }); d.close(); return k.durak; }"""
YEREL_TARIH = "(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })()"

def plan_serbest(pg):
    k = pg.evaluate(META, f"akis:{GUN}")
    return [a for d in k["plan"]["duraklar"] for a in d["adimlar"] if a["tur"] == "serbest_konus"], k

def ac(p, sema, bayrak, mik=True):
    b, ctx = launch(p, color_scheme=sema)
    if bayrak is not None: ctx.add_init_script(f"try {{ sessionStorage.setItem('e2e-serbest-konus', '{bayrak}'); }} catch (e) {{}}")
    ctx.add_init_script(SR if mik else MIKSIZ)
    pg = new_page(ctx)
    # yapay zekâya giden istekler (karar 2: söylenen ad gitmez; inceleme #281 P1-1)
    pg._ai = []
    pg.on("request", lambda r: pg._ai.append(r.post_data or "") if "/v1/ai/" in r.url and r.method == "POST" else None)
    login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
    pg.goto(f"http://127.0.0.1:{PORT}/#/akis/{GUN}"); pg.wait_for_selector("[data-test=akis]", timeout=20000)
    return b, pg

def gunsonu(pg):
    pg.evaluate(GUNSONUNA, GUN); pg.reload(); pg.wait_for_selector("[data-test=akis]", timeout=20000)

def main():
    sema = arg("--scheme") or "light"; shots = arg("--shots")
    srv = serve(PORT)
    with sync_playwright() as p:
        # 1) bayrak kapalı (varsayılan): planda yok
        b, pg = ac(p, sema, None)
        s, _ = plan_serbest(pg)
        check(not s, f"bayrak kapalı: 2. günün planında serbest konuşma yok ({len(s)})")
        b.close()

        # 2) bayrak açık: gün sonunun ilk adımı
        b, pg = ac(p, sema, "1")
        s, k = plan_serbest(pg)
        gs = [d for d in k["plan"]["duraklar"] if d["tur"] == "gunsonu"]
        check(len(s) == 1 and gs and gs[0]["adimlar"][0]["tur"] == "serbest_konus", f"bayrak açık: gün sonu durağının ilk adımı serbest konuşma ({[a['id'] for a in s]})")
        gunsonu(pg)
        check(pg.get_attribute("[data-test=akis]", "data-tur") == "serbest_konus", "gün sonunda serbest konuşma adımı açılıyor")
        pg.wait_for_selector("[data-test=akis-serbest]")
        gorev = pg.inner_text("[data-test=serbest-gorev]"); durum = pg.inner_text("[data-test=serbest-durum]")
        check(gorev.strip() and durum.strip(), f"durum ve görev Türkçe görünüyor ({durum!r} / {gorev!r})")
        govde = pg.inner_text("[data-test=akis-serbest]")
        check("Geburtstag" not in govde and "wohne" not in govde and not pg.locator("[data-test=akis-serbest] [lang=de]").count(),
              "cevaptan önce Almanca ipucu yok: soru metni ve örnek gizli")
        check(pg.is_disabled("[data-test=serbest-bitirdim]"), "konuşmadan 'Bitirdim' kapalı")
        no_overflow(pg, "serbest konuşma (görev)")
        if shots: shot(pg, f"serbest-gorev-{sema}", full=False)
        # iki parça konuş
        pg.click("[data-test=mic]"); bekle_kosul(pg, "() => document.querySelectorAll('[data-test=serbest-dokum] [lang=de]').length >= 1")
        pg.click("[data-test=mic]"); bekle_kosul(pg, "() => document.querySelectorAll('[data-test=serbest-dokum] [lang=de]').length >= 2")
        dokum = pg.locator("[data-test=serbest-dokum] [lang=de]").all_inner_texts()
        check(dokum == ["ich wohne in Rosenheim", "im Mai habe ich Geburtstag"], f"iki konuşma parçası dökümde ({dokum})")
        if shots: shot(pg, f"serbest-dokum-{sema}", full=False)
        pg.click("[data-test=serbest-bitirdim]"); pg.wait_for_selector("[data-test=akis-serbest-sonuc]")
        check(pg.evaluate("document.activeElement && document.activeElement.dataset.test") == "serbest-baslik", "Bitirdim: odak sonuç başlığına taşınır")
        bekle_kosul(pg, "() => !!document.querySelector('[data-test=serbest-rapor], [data-test=serbest-ai-hata]')", timeout=8000)
        giden = [x for x in pg._ai if "feedback_tr" in x]
        check(giden and all("Rosenheim" not in x and "[…]" in x for x in giden), f"yapay zekâya söylenen şehir gitmez, yerine […] ({[x[-160:] for x in giden]})")
        r = pg.locator("[data-test=akis-serbest-sonuc]")
        check(r.get_attribute("data-hedef") == "2/2" and r.get_attribute("data-sesli") == "1", f"hedefler 2/2, sesli ({r.get_attribute('data-hedef')}, {r.get_attribute('data-sesli')})")
        ornek = pg.inner_text("[data-test=serbest-ornek]")
        check("Ich wohne in … . Im Mai" in ornek and "Wann ist Ihr Geburtstag?" in ornek and "{" not in ornek, f"sonuçta soru ve örnek cevap görünür, yer tutucu çıplak değil ({ornek[:80]!r})")
        no_overflow(pg, "serbest konuşma (sonuç)")
        pg.wait_for_timeout(600)
        if shots: shot(pg, f"serbest-sonuc-{sema}", full=False)
        # bir daha dene → sıfır; yazarak → konuşma sayılmaz
        pg.click("[data-test=serbest-yeniden]"); pg.wait_for_selector("[data-test=akis-serbest]")
        check(not pg.locator("[data-test=serbest-dokum]").count(), "'Bir daha dene' dökümü sıfırlar")
        pg.click("[data-test=serbest-yazarak]"); pg.fill("[data-test=serbest-yazi]", "Ich wohne in Rosenheim. Im Mai habe ich Geburtstag."); pg.click("[data-test=serbest-ekle]")
        pg.click("[data-test=serbest-bitirdim]"); pg.wait_for_selector("[data-test=akis-serbest-sonuc]")
        check(r.get_attribute("data-sesli") == "0" and pg.locator("[data-test=serbest-yazili]").count() == 1, "yazarak cevap: 'konuşma sayılmaz' notu")
        adim = pg.get_attribute("[data-test=akis]", "data-adim")
        pg.click("[data-test=akis-devam]")
        bekle_kosul(pg, f"() => document.querySelector('[data-test=akis]')?.dataset.adim !== {json.dumps(adim)}")
        check(pg.get_attribute("[data-test=akis]", "data-tur") != "serbest_konus", "Devam et: akış sonraki adıma geçer")
        tarih = pg.evaluate(YEREL_TARIH)
        bekle_kosul(pg, f"async () => !!(await ({META})('konusma:{tarih}'))")
        kay = pg.evaluate(META, f"konusma:{tarih}")
        check(kay and len(kay["adimlar"]) == 1 and kay["adimlar"][0]["sesli"] is False and kay["adimlar"][0]["gun"] == GUN, f"konuşma kaydı: yazarak geçilen adım sesli sayılmaz ({kay})")
        b.close()

        # 3) tek parça: en az iki cümle olmadan konuşma sayılmaz (inceleme #281 P2-5); iki parça sesli: sayılır
        b, pg = ac(p, sema, "1"); gunsonu(pg); pg.wait_for_selector("[data-test=akis-serbest]")
        pg.click("[data-test=mic]"); bekle_kosul(pg, "() => document.querySelectorAll('[data-test=serbest-dokum] [lang=de]').length >= 1")
        pg.click("[data-test=serbest-bitirdim]"); pg.wait_for_selector("[data-test=akis-serbest-sonuc]")
        check(pg.get_attribute("[data-test=akis-serbest-sonuc]", "data-hedef") == "1/2" and pg.locator("[data-test=serbest-az]").count() == 1,
              "tek parça: 1/2 hedef, 'en az 2 cümle söyleyince konuşma sayılır'")
        pg.click("[data-test=akis-devam]")
        bekle_kosul(pg, f"async () => !!(await ({META})('konusma:{tarih}'))")
        kay = pg.evaluate(META, f"konusma:{tarih}")
        check(kay and kay["adimlar"][0]["sesli"] is False, f"konuşma kaydı: tek cümlelik deneme konuşma sayılmaz ({kay})")
        b.close()
        b, pg = ac(p, sema, "1"); gunsonu(pg); pg.wait_for_selector("[data-test=akis-serbest]")
        pg.click("[data-test=mic]"); bekle_kosul(pg, "() => document.querySelectorAll('[data-test=serbest-dokum] [lang=de]').length >= 1")
        pg.click("[data-test=mic]"); bekle_kosul(pg, "() => document.querySelectorAll('[data-test=serbest-dokum] [lang=de]').length >= 2")
        pg.click("[data-test=serbest-bitirdim]"); pg.wait_for_selector("[data-test=akis-serbest-sonuc]")
        pg.click("[data-test=akis-devam]")
        bekle_kosul(pg, f"async () => ((await ({META})('konusma:{tarih}')) || {{adimlar: []}}).adimlar.some((a) => a.sesli)")
        kay = pg.evaluate(META, f"konusma:{tarih}")
        check(kay and kay["adimlar"][0]["sesli"] is True, f"konuşma kaydı: mikrofonla en az iki cümle → sesli ({kay})")
        b.close()

        # 4) mikrofonsuz tarayıcı
        b, pg = ac(p, sema, "1", mik=False); gunsonu(pg); pg.wait_for_selector("[data-test=akis-serbest]")
        check(pg.locator("[data-test=serbest-mik-yok]").count() == 1 and pg.locator("[data-test=serbest-yazi]").count() == 1 and not pg.locator("[data-test=mic]").count(),
              "mikrofon yok: yazı alanı doğrudan, 'konuşma sayılmaz' notu")
        no_overflow(pg, "serbest konuşma (mikrofonsuz)")
        b.close()
    srv.shutdown(); finish()

if __name__ == "__main__":
    main()
