"""
LS-16.3 öğrenci simülasyonu, akış günü (bayrak PR'ının kabul listesi md. 6, PM #12 7059008858).
Bilgi kısıtlı öğrenci: Bugün'den başlar, `#/akis/<gün>`ü gün sonuna kadar yürür (halkalar, dil noktası, adımsız duraklar:
ses, video, prova, okuma; gün sonu). Adımsız durakta "Başla"ya basar, var olan ekranı (Medya, Prova, Okuma) bitirir,
"Sıradaki adım" ile akışa döner (PM-133; Bugün'e düşerse BAŞLA ile akışa geri girer).

Bilgi kuralı (mekanik, tekrarlanabilir):
  - "Gösterilmiş" sözcük: ekranda görünen Almanca öğe ([lang=de], .de-lg, .de-xl, .de) içindeki her sözcük. Kaynağı ayrıca yazılır:
    "ogretim" (tanıtım, kalıp, tablo, metin, geri bildirim, hazırlık) ya da "gorunum" (yalnız taş, şık, boşluk bağlamı).
  - Bir cevap ancak gereken bütün Almanca sözcükler BU EKRANDAN ÖNCE gösterilmişse verilir. Kabul listesinde gösterilmiş sözcüklerle
    kurulabilen bir seçenek varsa o yazılır. Yoksa "Bilmiyorum" (yoksa yanlış cevap) ve kayıt: "öğretilmeden istenen".
    Eksik sözcüğün gösterilmiş bir sözcükle ≥ 4 harflik ortak başı varsa "sınırda (çekim)", yoksa "kesin".
  - Ses duyulmaz. Dinleme sorusu, sesin (ya da kanıt cümlesinin) bütün sözcükleri gösterilmişse "anlaşıldı" sayılır.
  - Ekranda Türkçesiyle birlikte duran Almanca (sahne metni, okuma metni, prova) anlama sorusunu engellemez; bilinmeyen sözcükleri
    "çevirili yeni" diye yazılır (P0 değil).
  - Özel adlar (dünya karakterleri, genel adlar, ek liste ADLAR) ve {name} bilinir sayılır.
Süre: (1) planın tahmini (policy.akis.adim_sn; adımsız durakta planın tahmini_dk), (2) yürünen ekran × EKRAN_SN tablosu.

  python3 tests/e2e/ogrenci_akis.py [--gun 1] [--tohum ogrenci-gun1] [--port 4317] [--out DIR]
                                    [--browser webkit] [--device "iPhone 15"]   (varsayılan: WebKit + iPhone 15)
Çıktı: DIR/kayit.json (ekran ekran), DIR/ozet.json, DIR/ekranlar.txt (her ekranın metni; Türkçe açıklama incelemesi için)
"""
import json, os, random, re, sys, time

if "--browser" not in sys.argv: sys.argv += ["--browser", "webkit"]
if "--device" not in sys.argv: sys.argv += ["--device", "iPhone 15"]

from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, arg, content_file, ERR, IPTAL, BROWSER, DEVICE

PORT = int(arg("--port") or 4317)
GUN = int(arg("--gun") or 1)
TOHUM = arg("--tohum") or "ogrenci-gun1"
OUT = arg("--out") or "/tmp/ogrenci_akis"
RNG = random.Random(TOHUM)  # yalnız tahmin edilen yanlış şıkkın seçimi
AD = "Ayşe"  # prova/okuma kabul listesindeki {name} yalnız bu koşuda (profil adsız; ad depoya girmez)

# ---------------------------------------------------------------- içerik
POLICY = json.load(open(os.path.join(os.path.dirname(__file__), "..", "..", "web", "src", "policy.json"), encoding="utf-8"))["akis"]
GUN_J = content_file(f"m1/gun-{GUN:02d}.json")
LEXJ = content_file("lexemes.json")
LEX = {l["id"]: l for l in (LEXJ["lexemes"] if isinstance(LEXJ, dict) else LEXJ)}
DERSLER = {}
for did in GUN_J.get("dersler", []):
    try: DERSLER[did] = content_file("temel/" + did.replace(":", "_") + ".json")
    except FileNotFoundError: pass
WORLD = content_file("world/world.json")
ADLAR = {"tobi", "dr", "weber", "{name}", AD.lower()}
for c in WORLD.get("characters", []):
    for t in re.split(r"[\s.]+", c.get("name", "")): ADLAR.add(t.lower())
for t in content_file("genel-adlar.json"): ADLAR.add(t.lower())

PUNCT = re.compile(r"[.,!?;:„“”\"'’»«()\[\]…–—/*]+")
def toks(s):
    return [t for t in PUNCT.sub(" ", (s or "").replace("{name}", " {name} ")).lower().split() if t and not t.isdigit() and t != "___" and t != "____"]

LEX_DE = set()
for l in LEX.values():
    LEX_DE.update(toks(l["de"]))
    for f in l.get("forms", []) or []: LEX_DE.update(toks(f.get("answer", "")))

# cümle → kabul listesi (halka görev cümleleri, kart örnekleri)
CUMLE_ACC = {}
for h in GUN_J.get("halkalar", []):
    for g in h.get("gorev_cumleleri", []): CUMLE_ACC.setdefault(g["de"], g.get("accepted") or [g["de"]])
for l in LEX.values():
    for e in l.get("examples", []) or []:
        if e.get("accepted"): CUMLE_ACC.setdefault(e["de"], e["accepted"])
# dril havuzu (ders + okuma): accepted[0] ya da soru metniyle bulunur
DRILLER = []
for d in DERSLER.values(): DRILLER += d.get("drills", [])
DRILLER += (GUN_J.get("okuma_yazma") or {}).get("sorular", [])

def medya_bul(mid):
    if GUN_J.get("video") and GUN_J["video"]["id"] == mid: return GUN_J["video"]
    for s in GUN_J.get("sesler", []):
        if s["id"] == mid: return s
    return None

def medya_cumleler(m):
    return {c["id"]: c for c in (m.get("cumleler") or m.get("script") or [])}

# ---------------------------------------------------------------- bilgi durumu
BILINEN = {}   # sözcük → {"ekran": n, "kaynak": "ogretim"|"gorunum"}
KAYIT = []     # ekran kayıtları
EKRANLAR = []  # ekran metinleri
YUKLEME = []   # "Yükleniyor…" süreleri (≥ 1 sn)
YOL_DISI = []  # akış bitmeden Bugün'ün BAŞLA'sının akış dışına gittiği anlar
N = {"ekran": 0}
DURUM = {"durak": None, "seans": None, "yer": "bugun"}
PLAN = {}

YERDE = {}     # sözcük → {"akis": ilk ekran, "dis": ilk ekran}: akışın kendi ekranında mı, ses/video/prova/okuma ekranında mı görüldü

def ekle(tokenler, kaynak):
    sinif = "akis" if DURUM["yer"] in ("akis", "bugun") else "dis"
    for t in tokenler:
        YERDE.setdefault(t, {}).setdefault(sinif, N["ekran"])
        b = BILINEN.get(t)
        if b is None: BILINEN[t] = {"ekran": N["ekran"], "kaynak": kaynak}
        elif b["kaynak"] == "gorunum" and kaynak == "ogretim": b["kaynak"] = "ogretim"

YAKALA = """() => { const o = []; for (const e of document.querySelectorAll('[lang=de], .de-lg, .de-xl, .de')) {
  if (e.tagName === 'INPUT' || e.closest('[hidden]')) continue; const r = e.getBoundingClientRect(); if (!r.width && !r.height) continue;
  o.push({ t: e.innerText || '', tas: !!e.closest('.wchip, button.opt, [data-test=banka], .resim-secenek, [data-test=yapboz-taslar], .esles-hucre') }); } return o; }"""

def yakala(pg, kaynak="ogretim"):
    """ekrandaki Almancayı bilinenlere ekler; taş/şık içindekiler 'gorunum'"""
    try: o = pg.evaluate(YAKALA)
    except Exception: return set()
    s = set()
    for x in o:
        tk = toks(x["t"]); s.update(tk)
        ekle(tk, "gorunum" if x["tas"] else kaynak)
    return s

def eksik_bul(gerekli, ek=()):
    """gerekli sözcüklerden bu ekrandan önce gösterilmemiş olanlar; (kesin, sınırda) listeleri"""
    kes, sin = [], []
    for t in gerekli:
        if t in ADLAR or t in BILINEN or t in ek: continue
        if any(len(os.path.commonprefix([t, k])) >= 4 for k in BILINEN): sin.append(t)
        else: kes.append(t)
    return kes, sin

def sec_alt(alts, ek=()):
    """kabul listesinden gösterilmiş sözcüklerle kurulabilen ilk seçenek; yoksa en az eksikli"""
    best = None
    for a in alts:
        kes, sin = eksik_bul(toks(a), ek)
        if not kes and not sin: return a, [], []
        if best is None or len(kes) + len(sin) < len(best[1]) + len(best[2]): best = (a, kes, sin)
    return best if best else ("", [], [])

def gorunum_yalniz(gerekli):
    return [t for t in gerekli if t in BILINEN and BILINEN[t]["kaynak"] == "gorunum" and t not in ADLAR]

# ---------------------------------------------------------------- yardımcılar
SIG = "() => location.hash + '|' + ((document.querySelector('main') || document.body).innerText || '')"
def imza(pg):
    try: return pg.evaluate(SIG)
    except Exception: return ""

def bekle(pg, kosul, sn=8.0, adim=120):
    son = time.time() + sn
    while time.time() < son:
        try:
            if kosul(): return True
        except Exception: pass
        pg.wait_for_timeout(adim)
    return False

def var(pg, sel):
    try: return pg.locator(sel).count() > 0
    except Exception: return False

def tikla(pg, sel):
    pg.locator(sel).first.click(timeout=6000)

def metin(pg, sel="main"):
    try: return pg.inner_text(sel) if var(pg, sel) else ""
    except Exception: return ""

ARADA = """(sel) => { const e = document.querySelector(sel); const u = document.querySelector('[data-test=medya-ust]'); const a = document.querySelector('.actionbar');
  const r = e.getBoundingClientRect(); const ust = u ? u.getBoundingClientRect().bottom : 0; const alt = a ? a.getBoundingClientRect().top : innerHeight;
  return { top: r.top, h: r.height, x: r.left + r.width / 2, ust, alt }; }"""

def tikla_arada(pg, sel):
    """yapışkan üst alan (video) ile eylem çubuğu arasında kalan dar şeritte dokunuş: öğrenci gibi kaydırır, sonra dokunur.
    Kayıt: otomatik kaydırma başarısızsa notlara (öğe yapışkan alanların altında kalıyor)"""
    try: pg.locator(sel).first.click(timeout=1500); return True
    except Exception: pass
    for _ in range(12):
        g = pg.evaluate(ARADA, sel)
        if g["top"] >= g["ust"] and g["top"] + g["h"] <= g["alt"]:
            pg.mouse.click(g["x"], g["top"] + g["h"] / 2); pg.wait_for_timeout(300); return "kaydirarak"
        hedef = (g["ust"] + g["alt"]) / 2 - g["h"] / 2
        pg.evaluate("(d) => window.scrollBy(0, d)", g["top"] - hedef); pg.wait_for_timeout(150)
    return False

def yaz_gonder(pg, kap, deger):
    pg.locator(f"{kap} [data-test=answer]").first.fill(deger)
    pg.locator(f"{kap} [data-test=submit]").first.click(timeout=6000)

EKRAN_SN = {  # yürünen ekran başına makul saniye (yeni başlayan, Türkçe okuyor, sesi bir kez dinliyor)
    "tanit": 25, "kalip": 30, "tablo": 40, "hatirlatma": 15, "dil-oge": 20, "gorev": 15, "durak-gecis": 5, "halka-sonu": 10,
    "secmeli": 12, "uretim": 25, "bosluk": 18, "yapboz": 22, "eslestir": 35, "resim": 14, "sahne": 60, "dril": 22,
    "m-dinle": 40, "m-soru": 12, "m-cumle": 30, "m-dikte": 25, "m-transkript": 45, "m-golge": 12, "m-cevapla": 25, "m-bitti": 5,
    "p-hazirlik": 50, "p-tur": 25, "p-rapor": 20, "o-metin": 60, "o-soru": 15, "o-yaz": 90, "o-bitti": 5, "bugun": 5, "diger": 10,
}

def kaydet(tur, govde, **k):
    r = {"n": N["ekran"], "yer": DURUM["yer"], "durak": DURUM["durak"], "seans": DURUM["seans"], "tur": tur, "govde": govde, **k}
    r["sn"] = EKRAN_SN.get(tur, 10)
    if DURUM["yer"] == "akis" and r.get("gerekli"):
        # akış üretiminde gereken sözcük akışın kendi ekranlarında henüz görülmemiş, yalnız ses/video/prova/okumada görülmüşse
        r["yalniz_dis"] = sorted({t for t in r["gerekli"] if t not in ADLAR and "dis" in YERDE.get(t, {}) and YERDE[t].get("akis", 10**9) >= N["ekran"]})
    KAYIT.append(r)
    isaret = ""
    if r.get("kesin") or r.get("sinirda"): isaret = f"  !! eksik kesin={r.get('kesin')} sınırda={r.get('sinirda')}"
    print(f"[{r['n']:4d}] s{r['seans']} {str(r['durak'])[:22]:22s} {tur:12s} {govde:18s} {r.get('cevap', ''):10s} {str(r.get('gerekli', ''))[:60]}{isaret}")
    return r

def ekran_not(pg):
    m = metin(pg)
    EKRANLAR.append(f"--- [{N['ekran']}] {DURUM['yer']} {DURUM['durak']} {imza(pg).split('|')[0]}\n{m}")
    notlar = []
    if "**" in m: notlar.append("ham **")
    if "(adın)" in m: notlar.append("(adın)")
    if re.search(r"\{[a-z|A-Z]+\}", m): notlar.append("çıplak yer tutucu")
    if var(pg, "[role=alert].err, .card.err"): notlar.append("HATA PANELİ: " + metin(pg, "[role=alert]")[:120])
    if var(pg, "[data-test=akis-yer-tutucu]"): notlar.append("iskelet (akis-yer-tutucu)")
    if len(m.strip()) < 15: notlar.append("boş ekran")
    return notlar

# ---------------------------------------------------------------- akış adımları
def plan_adim(aid):
    for d in PLAN.get("duraklar", []):
        for a in d["adimlar"]:
            if a["id"] == aid: return d, a
    return None, None

def durak_bilgi(did):
    for d in PLAN.get("duraklar", []):
        if d["id"] == did: return d
    return None

def sonra_devam(pg, sel="[data-test=akis-devam]"):
    bekle(pg, lambda: var(pg, sel), 6)
    yakala(pg, "ogretim")
    tikla(pg, sel)

def dril(pg, kap, notlar, tur_adi="dril"):
    """DrillView (ders maddesi, okuma sorusu): gereken Almanca + kabul listesi içerikten"""
    sec = pg.locator(f"{kap} [data-test^=drill-]").first
    k = (sec.get_attribute("data-test") or "drill-").replace("drill-", "")
    cev = sec.get_attribute("data-cevap") or ""
    h3 = metin(pg, f"{kap} [data-test^=drill-] h3") if k == "pick" else ""
    d = None
    for x in DRILLER:
        if k == "pick" and x.get("k", x.get("kind")) in ("pick", "gist", "detail") and PUNCT.sub("", x.get("q_tr", "").replace("**", "")).strip() == PUNCT.sub("", h3).strip(): d = x; break
        if k != "pick" and (x.get("accepted") or [None])[0] == cev: d = x; break
    onceki = set(BILINEN)
    gorunen = yakala(pg, "gorunum")
    if k == "pick":
        kalin = toks(" ".join(pg.locator(f"{kap} [data-test^=drill-] h3 b").all_inner_texts()))
        sag = pg.locator(f"{kap} button.opt[data-right]").first.inner_text()
        gerekli = list(kalin) + ([*toks(sag)] if toks(sag) and all(t in LEX_DE or t in ADLAR for t in toks(sag)) else [])
        BILINEN_ONCE = {t: BILINEN[t] for t in BILINEN if t in onceki}
        kes, sin = [], []
        for t in gerekli:
            if t in ADLAR or t in BILINEN_ONCE: continue
            (sin if any(len(os.path.commonprefix([t, q])) >= 4 for q in BILINEN_ONCE) else kes).append(t)
        yumusak = []
        if d and d.get("kanit") is not None and DURUM["yer"] == "okuma":
            cumleler = re.split(r"(?<=[.!?])\s+", GUN_J["okuma_yazma"]["metin_de"])
            for i in d["kanit"]:
                if i < len(cumleler): yumusak += [t for t in toks(cumleler[i]) if t not in ADLAR and t not in BILINEN_ONCE]
        bil = not kes and not sin
        if bil: tikla(pg, f"{kap} button.opt[data-right]")
        else:
            yanlis = pg.locator(f"{kap} button.opt:not([data-right])")
            yanlis.nth(RNG.randrange(yanlis.count())).click()
        bekle(pg, lambda: var(pg, f"{kap} [data-test=next]"), 6); yakala(pg, "ogretim"); tikla(pg, f"{kap} [data-test=next]")
        return kaydet(tur_adi, "drill-pick", cevap="dogru" if bil else "bilmiyorum", gerekli=gerekli, kesin=kes, sinirda=sin, cevirili_yeni=sorted(set(yumusak)), soru=h3[:90], notlar=notlar)
    alts = (d or {}).get("accepted") or ([cev] if cev else [])
    anla = []
    if d:
        anla = toks(d.get("from_de", "") + " " + d.get("prompt_de", "") + " " + d.get("audio_de", ""))
    # anlama: istem Almancası bu ekrandan önce gösterilmiş olmalı (dinle-cevapla'da ses; ekranda yok)
    kes0, sin0 = [], []
    for t in anla:
        if t in ADLAR or t in onceki: continue
        (sin0 if any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki) else kes0).append(t)
    if k == "gap":
        alt, kes, sin = sec_alt([a for a in alts], ())
        kes = [t for t in kes if t not in onceki] if False else [t for t in toks(alt) if t not in onceki and t not in ADLAR and not any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki)]
        sin = [t for t in toks(alt) if t not in onceki and t not in ADLAR and t not in kes]
    else:
        # üretim: önceden gösterilen + istemde görünen (from_de/prompt_de) sözcükler
        best = None
        for a in alts:
            ks = [t for t in toks(a) if t not in onceki and t not in ADLAR and t not in anla]
            kk = [t for t in ks if not any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki)]
            ss = [t for t in ks if t not in kk]
            if best is None or len(ks) < len(best[1]) + len(best[2]): best = (a, kk, ss)
            if not ks: break
        alt, kes, sin = best if best else ("", [], [])
    kes = sorted(set(kes + kes0)); sin = sorted(set(sin + sin0))
    bil = not kes and not sin and alt
    if k == "order":
        if bil:
            for w in toks(alt):
                cips = pg.locator(f"{kap} button.wchip[data-chip]:not([disabled])")
                hit = None
                for i in range(cips.count()):
                    if (cips.nth(i).get_attribute("data-chip") or "").lower().strip(".,!?") == w: hit = i; break
                if hit is None: bil = False; break
                cips.nth(hit).click()
        if not bil:
            while var(pg, f"{kap} button.wchip[data-chip]:not([disabled])"): pg.locator(f"{kap} button.wchip[data-chip]:not([disabled])").first.click()
        tikla(pg, f"{kap} [data-test=submit]")
    else:
        yaz_gonder(pg, kap, alt.replace("{name}", AD) if bil else "bilmiyorum")
    bekle(pg, lambda: var(pg, f"{kap} [data-test=next]"), 6)
    sonuc = metin(pg, f"{kap} .feedback, {kap} [data-test=feedback]")[:80]
    yakala(pg, "ogretim"); tikla(pg, f"{kap} [data-test=next]")
    return kaydet(tur_adi, "drill-" + k, cevap="dogru" if bil else "bilmiyorum", gerekli=toks(alt) + anla, kesin=kes, sinirda=sin, yazilan=alt if bil else "", geri=sonuc, notlar=notlar)

def akis_adim(pg):
    pg.wait_for_timeout(380)  # çift dokunuş koruması (ekran açıldıktan sonraki 350 ms)
    # Adım kimliği ekran yerleştikten SONRA okunur ve iki okuma aynı olana kadar beklenir: "Devam"dan hemen sonra okunan kimlik
    # önceki adımınki olabiliyordu (Chromium'da yarış: önceki adımın cümlesi yeni adımın boşluğuna yazılıp "reddedildi" sayılıyordu)
    oku = lambda: pg.evaluate("() => { const e = document.querySelector('[data-test=akis]'); return e ? [e.getAttribute('data-adim'), e.getAttribute('data-durak')] : null; }")
    kim = oku()
    for _ in range(8):
        pg.wait_for_timeout(120); y = oku()
        if y == kim: break
        kim = y
    if not kim: return None
    a_id, did = kim
    d, a = plan_adim(a_id)
    d = d or durak_bilgi(did)
    DURUM.update(yer="akis", durak=did, seans=(d or {}).get("seans"))
    notlar = ekran_not(pg)
    ptur = (a or {}).get("tur")
    ek = {"adim": a_id, "plan_tur": ptur, "plan_sn": (a or {}).get("sn"), "notlar": notlar}
    lx = [LEX[k] for k in (a or {}).get("kartlar", []) if k in LEX]
    if var(pg, "[data-test=akis-durak-gecis]"):
        yakala(pg)
        dc = metin(pg, "[data-test=durak-cumle]")
        if var(pg, "[data-test=akis-durak-basla]"):
            hedef = pg.get_attribute("[data-test=akis-durak-basla]", "data-hedef") or pg.get_attribute("[data-test=akis-durak-basla]", "href")
            r = kaydet("durak-gecis", "akis-durak-gecis", cevap="basla", hedef=hedef, durak_cumle=dc, **ek)
            tikla(pg, "[data-test=akis-durak-basla]")
        else:
            r = kaydet("durak-gecis", "akis-durak-gecis", cevap="devam", durak_cumle=dc, **ek); tikla(pg, "[data-test=akis-devam]")
        return r
    for g, t in (("akis-tanit", "tanit"), ("akis-kalip", "kalip"), ("akis-tablo", "tablo"), ("akis-hatirlatma", "hatirlatma"), ("akis-dil-oge", "dil-oge"), ("akis-gorev", "gorev")):
        if var(pg, f"[data-test={g}]"):
            if g == "akis-tanit":
                for i in range(pg.locator("[data-test=tanit-isaret]").count()):
                    pg.locator("[data-test=tanit-isaret]").nth(i).click(); pg.wait_for_timeout(100); yakala(pg)
            if g == "akis-tablo":
                for i in range(pg.locator("[data-test=akis-tablo-sec] button").count()):
                    pg.locator("[data-test=akis-tablo-sec] button").nth(i).click(); pg.wait_for_timeout(80); yakala(pg)
            yeni = yakala(pg, "ogretim")
            ozel = {}
            if g == "akis-gorev": ozel["gorev"] = metin(pg, "[data-test=akis-gorev] h2")
            if g == "akis-tanit": ozel["cumle"] = metin(pg, "[data-test=tanit-cumle]"); ozel["isaretli"] = pg.locator("[data-test=tanit-isaret]").count()
            if g == "akis-kalip": ozel["cerceve"] = pg.locator("[data-test=kalip-cerceve]").count(); ozel["ornek"] = pg.locator("[data-test=kalip-ornek]").count()
            r = kaydet(t, g, cevap="okudu", **ozel, **ek)
            tikla(pg, "[data-test=akis-devam]"); return r
    if var(pg, "[data-test=garden-intro]"):
        yakala(pg, "ogretim"); r = kaydet("tanit", "garden-intro", cevap="okudu", **ek); tikla(pg, "[data-test=garden-intro] [data-test=next]"); return r
    if var(pg, "[data-test=eslestir]"):
        onceki = set(BILINEN); yakala(pg, "gorunum")
        sol = pg.locator("[data-test=esles-sol]"); kartlar = []
        for i in range(sol.count()):
            kartlar.append((sol.nth(i).get_attribute("data-kart"), sol.nth(i).inner_text()))
        gerekli, kes, sin, bilinen = [], [], [], []
        for kid, de in kartlar:
            tk = toks(de); gerekli += tk
            kk = [t for t in tk if t not in onceki and t not in ADLAR]
            if not kk: bilinen.append(kid)
            else:
                for t in kk: (sin if any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki) else kes).append(t)
        for kid in bilinen:
            pg.click(f"[data-test=esles-sol][data-kart='{kid}']"); pg.wait_for_timeout(80)
            pg.click(f"[data-test=esles-sag][data-kart='{kid}']"); pg.wait_for_timeout(150)
        if var(pg, "[data-test=esles-goster]"): tikla(pg, "[data-test=esles-goster]")
        bekle(pg, lambda: var(pg, "[data-test=esles-devam]"), 5); yakala(pg, "ogretim")
        r = kaydet("eslestir", "eslestir", cevap="dogru" if not kes and not sin else f"{len(bilinen)}/{len(kartlar)}", gerekli=gerekli, kesin=kes, sinirda=sin, **ek)
        tikla(pg, "[data-test=esles-devam]"); return r
    if var(pg, "[data-test=eslestir-yok]"):
        r = kaydet("eslestir", "eslestir-yok", cevap="yok", **ek); tikla(pg, "[data-test=esles-devam]"); return r
    if var(pg, "[data-test=resim-sec]"):
        kid = pg.get_attribute("[data-test=resim-sec]", "data-kart"); l = LEX.get(kid, {})
        bekle(pg, lambda: pg.locator("[data-test=resim-secenek]:not([disabled])").count() == 4, 8)
        gorsel = pg.evaluate("() => { const i = [...document.querySelectorAll('[data-test=resim-secenek] img')]; return { n: i.length, yuklu: i.filter((x) => x.complete && x.naturalWidth > 0).length, emoji: i.filter((x) => x.classList.contains('emoji')).length }; }")
        gerekli = toks(l.get("de", "")); kes, sin = eksik_bul(gerekli)
        bil = not kes and not sin
        if bil and pg.locator("[data-test=resim-secenek][data-right]:not([disabled])").count():
            tikla(pg, "[data-test=resim-secenek][data-right]"); tikla(pg, "[data-test=resim-kontrol]")
        else: tikla(pg, "[data-test=resim-bilmiyorum]")
        bekle(pg, lambda: var(pg, "[data-test=resim-devam]"), 5); yakala(pg, "ogretim")
        r = kaydet("resim", "resim-sec", cevap="dogru" if bil else "bilmiyorum", gerekli=gerekli, kesin=kes, sinirda=sin, gorsel=gorsel, **ek)
        tikla(pg, "[data-test=resim-devam]"); return r
    if var(pg, "[data-test=akis-sahne]"):
        onceki = set(BILINEN)
        if var(pg, "[data-test=sahne-metni-ac]"): tikla(pg, "[data-test=sahne-metni-ac]")
        bekle(pg, lambda: var(pg, "[data-test=sahne-metin]"), 5)
        satir = " ".join(pg.locator("[data-test=sahne-metin] b[lang=de]").all_inner_texts())
        yeni = sorted({t for t in toks(satir) if t not in onceki and t not in ADLAR})
        yakala(pg, "ogretim")
        tikla(pg, "[data-test=sahne-soru] button.opt[data-right]"); tikla(pg, "[data-test=sahne-kontrol]")
        r = kaydet("sahne", "akis-sahne", cevap="dogru", cevirili_yeni=yeni, soru=metin(pg, "[data-test=sahne-soru] h2"), **ek)
        sonra_devam(pg); return r
    if var(pg, "[data-test=akis-tr-de], [data-test=akis-soyle], [data-test=akis-dikte]"):
        g = "akis-dikte" if var(pg, "[data-test=akis-dikte]") else "akis-soyle" if var(pg, "[data-test=akis-soyle]") else "akis-tr-de"
        istem = metin(pg, f"[data-test={g}] h2")
        cumle = (a or {}).get("cumle") or ""
        alts = CUMLE_ACC.get(cumle, [cumle])
        if g == "akis-dikte": alt, kes, sin = cumle, *eksik_bul(toks(cumle))
        else: alt, kes, sin = sec_alt(alts)
        bil = not kes and not sin and alt
        if var(pg, "[data-test=akis-yazarak]"): tikla(pg, "[data-test=akis-yazarak]")
        if bil: yaz_gonder(pg, f"[data-test={g}]", alt.replace("{name}", AD))
        else: tikla(pg, "[data-test=akis-bilmiyorum]")
        bekle(pg, lambda: var(pg, "[data-test=akis-sonuc]"), 5)
        dogru = pg.get_attribute("[data-test=akis-sonuc]", "data-dogru")
        r = kaydet("uretim", g, cevap=("dogru" if dogru == "1" else "REDDEDİLDİ") if bil else "bilmiyorum", istem=istem, gerekli=toks(alt), yazilan=alt if bil else "", kesin=kes, sinirda=sin, gorunum_yalniz=gorunum_yalniz(toks(alt)), **ek)
        sonra_devam(pg); return r
    if var(pg, "[data-test=akis-bosluk]"):
        cumle = (a or {}).get("cumle") or ""
        gor = metin(pg, "[data-test=akis-bosluk] .de-lg")
        onceki = set(BILINEN); yakala(pg, "gorunum")
        bt = toks(cumle); gt = toks(gor.replace("____", " "))
        bos = [t for t in bt if t not in gt] or bt[:1]
        dogru_kelime = next((w for w in re.split(r"\s+", cumle) if PUNCT.sub("", w).lower() == bos[0]), bos[0])
        dogru_kelime = PUNCT.sub("", dogru_kelime)
        # iki parçalı fiil (DENETİM-A1 P1-1): iki boşluk, iki kelime cümledeki sırayla
        if gor.count("____") > 1:
            m = re.fullmatch("(.+?)".join(re.escape(x) for x in gor.split("____")), cumle.strip())
            if m: dogru_kelime = " ".join(x.strip() for x in m.groups())
        kes, sin = [], []
        for t in bos:
            if t in ADLAR or t in onceki: continue
            (sin if any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki) else kes).append(t)
        baglam_yeni = sorted({t for t in gt if t not in onceki and t not in ADLAR})
        bil = not kes and not sin
        if bil: yaz_gonder(pg, "[data-test=akis-bosluk]", dogru_kelime)
        else: tikla(pg, "[data-test=akis-bilmiyorum]")
        bekle(pg, lambda: var(pg, "[data-test=akis-sonuc]"), 5)
        dogru = pg.get_attribute("[data-test=akis-sonuc]", "data-dogru")
        r = kaydet("bosluk", "akis-bosluk", cevap=("dogru" if dogru == "1" else "REDDEDİLDİ") if bil else "bilmiyorum", gerekli=bos, kesin=kes, sinirda=sin, baglam_yeni=baglam_yeni, istem=gor, **ek)
        sonra_devam(pg); return r
    if var(pg, "[data-test=akis-yapboz]"):
        cumle = (a or {}).get("cumle") or ""
        onceki = set(BILINEN)
        # taşın altındaki Türkçe ipucu: o sözcük bu ekranda anlamıyla öğretilmiş sayılır
        ipucu = pg.evaluate("() => [...document.querySelectorAll('[data-test=yapboz-tas]')].map((b) => [b.querySelector('[lang=de]').innerText, (b.querySelector('.tiny') || {}).innerText || ''])")
        ipuculu = {toks(x[0])[0] for x in ipucu if x[1] and toks(x[0])}
        yakala(pg, "gorunum")
        for t in ipuculu: ekle([t], "ogretim")
        gerekli = toks(cumle)
        kes, sin = [], []
        for t in gerekli:
            if t in ADLAR or t in onceki or t in ipuculu: continue
            (sin if any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki) else kes).append(t)
        bil = not kes and not sin
        if bil:
            for w in re.sub(r"[.,!?;:„“\"»«]", " ", cumle).split():
                taslar = pg.locator("[data-test=yapboz-tas]:not([disabled])"); hit = None
                for i in range(taslar.count()):
                    if taslar.nth(i).locator("[lang=de]").inner_text() == w: hit = i; break
                if hit is None: bil = False; break
                taslar.nth(hit).click()
            if bil: tikla(pg, "[data-test=akis-kontrol]")
        if not bil:
            if var(pg, "[data-test=akis-bilmiyorum]"): tikla(pg, "[data-test=akis-bilmiyorum]")
        bekle(pg, lambda: var(pg, "[data-test=akis-sonuc]"), 5)
        dogru = pg.get_attribute("[data-test=akis-sonuc]", "data-dogru")
        r = kaydet("yapboz", "akis-yapboz", cevap=("dogru" if dogru == "1" else "REDDEDİLDİ") if bil else "bilmiyorum", istem=metin(pg, "[data-test=akis-yapboz] h2"), gerekli=gerekli, kesin=kes, sinirda=sin, ipuculu=sorted(ipuculu), gorunum_yalniz=gorunum_yalniz(gerekli), **ek)
        sonra_devam(pg); return r
    if var(pg, ".akis-soru [data-test^=drill-]"):
        return dril(pg, ".akis-soru", notlar, "dril")
    if var(pg, ".akis-soru [data-test^=gq-]"):
        gq = pg.get_attribute(".akis-soru [data-test^=gq-]", "data-test")
        l = lx[0] if lx else {}
        de = (f"{l.get('art')} {l['de']}" if l.get("pos") == "noun" and l.get("art") else l.get("de", ""))
        gerekli = toks(de); kes, sin = eksik_bul(gerekli)
        bil = not kes and not sin
        if gq in ("gq-listen_meaning", "gq-article", "gq-colloc"):
            if bil: tikla(pg, ".akis-soru button.opt[data-right]")
            else:
                yanlis = pg.locator(".akis-soru button.opt:not([data-right])"); yanlis.nth(RNG.randrange(yanlis.count())).click()
            tur = "secmeli"
        else:
            if var(pg, ".akis-soru [data-test=akis-yazarak]"): tikla(pg, ".akis-soru [data-test=akis-yazarak]")
            yaz_gonder(pg, ".akis-soru", de if bil else "bilmiyorum"); tur = "uretim"
        bekle(pg, lambda: var(pg, ".akis-soru [data-test=next]"), 5)
        ok = var(pg, ".akis-soru .feedback.ok, .akis-soru [data-test=feedback].ok") or "Doğru" in metin(pg, ".akis-soru .actionbar")
        istem = metin(pg, ".akis-soru .card .de-lg") or metin(pg, ".akis-soru .kicker")
        yakala(pg, "ogretim")
        r = kaydet(tur, gq, cevap=("dogru" if ok else "REDDEDİLDİ") if bil else "bilmiyorum", istem=istem[:60], gerekli=gerekli, kesin=kes, sinirda=sin, yazilan=de if bil and tur == "uretim" else "", **ek)
        tikla(pg, ".akis-soru [data-test=next]"); return r
    if var(pg, "[data-test=akis-yer-tutucu]"):
        r = kaydet("diger", "akis-yer-tutucu", cevap="iskelet", **ek); tikla(pg, "[data-test=akis-devam]"); return r
    # tanınmayan gövde: tek birincil düğme
    r = kaydet("diger", "BILINMEYEN", cevap="?", metin=metin(pg, "[data-test=akis]")[:200], **ek)
    b = pg.locator("[data-test=akis] .actionbar .btn.primary").first
    if b.count() and b.is_enabled(): b.click()
    return r

# ---------------------------------------------------------------- medya
def medya_adim(pg):
    # #/m1/<gün>/<kayıt>[/1|/2]: akışta ses turu eki (PM-097 md. 1) kimlik değildir (inceleme #207 P1-3)
    h = pg.evaluate("location.hash"); p_ = h.split("/"); p_ = p_[:-1] if len(p_) > 3 and p_[-1] in ("1", "2") else p_
    mid = __import__("urllib.parse").parse.unquote(p_[-1])
    m = medya_bul(mid)
    DURUM["yer"] = "medya:" + mid
    pg.wait_for_timeout(300)
    notlar = ekran_not(pg)
    if var(pg, "[data-test=medya-bitti]"):
        r = kaydet("m-bitti", "medya-bitti", cevap="-", notlar=notlar); tikla(pg, "[data-test=medya-sonraki]"); return r
    adim = pg.get_attribute("[data-test=medya]", "data-adim") or ""
    pos = (pg.get_attribute("[data-test=medya]", "data-pos") or "0.0.0").split(".")
    b_i, k_i = int(pos[0]), int(pos[2])
    bol = m["bolumler"][b_i] if m else {}
    cs = medya_cumleler(m) if m else {}
    bcs = [cs[c] for c in bol.get("cumleler", []) if c in cs]
    ek = {"medya": mid, "adim_m": adim, "pos": ".".join(pos), "notlar": notlar}
    if adim == "dinle":
        yakala(pg, "ogretim")  # ön öğretim çipleri
        if var(pg, "[data-test=on-ogretim-daha]"):
            t = tikla_arada(pg, "[data-test=on-ogretim-daha]")
            if not t: notlar.append("ön öğretim '+n' çipine dokunulamadı")
            elif t == "kaydirarak": notlar.append("ön öğretim '+n' çipi yapışkan video ile eylem çubuğu arasında; otomatik kaydırmayla dokunulamadı, elle kaydırarak açıldı")
            yakala(pg, "ogretim")
        gerekli = sorted({t for c in bcs for t in toks(c["de"])})
        kes, sin = eksik_bul(gerekli)
        r = kaydet("m-dinle", "adim-dinle", cevap="anladı" if not kes and not sin else "anlamadı", gerekli=gerekli, kesin=kes, sinirda=sin, anlama=True, sesli_cumle=len(bcs), **ek)
        tikla(pg, "[data-test=next]"); return r
    if adim in ("ana", "ayrinti") and var(pg, "[data-test=adim-soru]"):
        q = bol.get("ana_fikir") if adim == "ana" else (bol.get("ayrinti") or [{}])[k_i]
        kanit = [cs[c]["de"] for c in (q or {}).get("kanit", []) if c in cs] or [c["de"] for c in bcs]
        gerekli = sorted({t for c in kanit for t in toks(c)}); kes, sin = eksik_bul(gerekli)
        bil = not kes and not sin
        if bil: tikla(pg, "[data-test=adim-soru] button.opt[data-right]")
        else:
            y = pg.locator("[data-test=adim-soru] button.opt:not([data-right])"); y.nth(RNG.randrange(y.count())).click()
        bekle(pg, lambda: var(pg, "[data-test=adim-soru] [data-test=next]"), 5); yakala(pg, "ogretim")
        r = kaydet("m-soru", "adim-soru", cevap="dogru" if bil else "bilmiyorum", soru=metin(pg, "[data-test=adim-soru] h3"), gerekli=gerekli, kesin=kes, sinirda=sin, anlama=True, **ek)
        tikla(pg, "[data-test=adim-soru] [data-test=next]"); return r
    if adim == "cumle":
        r = kaydet("m-cumle", "adim-cumle", cevap="dinledi", **ek); tikla(pg, "[data-test=adim-cumle] [data-test=next]"); return r
    if adim == "transkript":
        yakala(pg, "ogretim"); r = kaydet("m-transkript", "adim-transkript", cevap="okudu", **ek); tikla(pg, "[data-test=adim-transkript] [data-test=next]"); return r
    if adim == "golge":
        yakala(pg, "ogretim"); r = kaydet("m-golge", "adim-golge", cevap="tekrarladı", cumle=metin(pg, "[data-test=adim-golge] .de-lg"), **ek); tikla(pg, "[data-test=adim-golge] [data-test=next]"); return r
    if adim == "dikte":
        dk = (bol.get("dikte") or [{}])[k_i]; sev = dk.get("seviye")
        kap = f"[data-test=dikte-{sev}]"
        onceki = set(BILINEN); yakala(pg, "gorunum")
        c = cs.get(dk.get("cumle"), {}); ornek_yeni = None
        if sev == "kolay":
            dogru = dk["opts"][dk["ans"]]; gerekli = toks(dogru)
            kes, sin = [], []
            for t in gerekli:
                if t in ADLAR or t in onceki: continue
                (sin if any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki) else kes).append(t)
            bil = not kes and not sin
            if bil: tikla(pg, f"{kap} button.opt[data-right]")
            else:
                y = pg.locator(f"{kap} button.opt:not([data-right])"); y.nth(RNG.randrange(y.count())).click()
            alt = dogru
        else:
            if sev == "gercek":
                # serbest yazım: zorunlu sözcükler gerekli; örnek cevabın öteki sözcükleri yalnız not (örnek_yeni)
                gerekli = toks(" ".join(dk.get("zorunlu", []))); alt = dk.get("ornek_de", "")
                ornek_yeni = sorted({t for t in toks(alt) if t not in onceki and t not in ADLAR})
            else:
                alts = dk.get("accepted", []); alt = alts[0] if alts else ""; gerekli = toks(alt)
            kes, sin = [], []
            for t in gerekli:
                if t in ADLAR or t in onceki: continue
                (sin if any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki) else kes).append(t)
            kes, sin = sorted(set(kes)), sorted(set(sin))
            bil = not kes and not sin
            if sev == "zor":
                if bil:
                    for w in toks(alt):
                        bk = pg.locator(f"{kap} [data-test=banka]:not([disabled])"); hit = None
                        for i in range(bk.count()):
                            if (bk.nth(i).get_attribute("data-chip") or "").lower() == w: hit = i; break
                        if hit is None: break
                        bk.nth(hit).click()
                else:
                    while var(pg, f"{kap} [data-test=banka]:not([disabled])"): pg.locator(f"{kap} [data-test=banka]:not([disabled])").first.click()
                tikla(pg, f"{kap} [data-test=submit]")
            else:
                yaz_gonder(pg, kap, alt.replace("{name}", AD) if bil else "bilmiyorum")
        bekle(pg, lambda: var(pg, f"{kap} [data-test=next]"), 5); yakala(pg, "ogretim")
        r = kaydet("m-dikte", f"dikte-{sev}", cevap="dogru" if bil else "bilmiyorum", gerekli=gerekli, kesin=kes, sinirda=sin, ses=c.get("de", ""), ornek_yeni=ornek_yeni if sev == "gercek" else None, **ek)
        tikla(pg, f"{kap} [data-test=next]"); return r
    if adim == "cevapla" and var(pg, "[data-test=adim-cevapla]"):
        d = bol.get("cevapla") or {}
        onceki = set(BILINEN); yakala(pg, "gorunum")
        anla = toks(d.get("prompt_de", "") + " " + d.get("audio_de", ""))
        best = None
        for a_ in d.get("accepted", []):
            ks = [t for t in toks(a_) if t not in onceki and t not in ADLAR and t not in anla]
            if best is None or len(ks) < len(best[1]): best = (a_, ks)
            if not ks: break
        alt, ks = best if best else ("", [])
        ks = sorted(set(ks + [t for t in anla if t not in onceki and t not in ADLAR]))
        kes = [t for t in ks if not any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki)]; sin = [t for t in ks if t not in kes]
        bil = not ks and alt
        yaz_gonder(pg, "[data-test=adim-cevapla]", alt.replace("{name}", AD) if bil else "bilmiyorum")
        bekle(pg, lambda: var(pg, "[data-test=adim-cevapla] [data-test=next]"), 5); yakala(pg, "ogretim")
        r = kaydet("m-cevapla", "adim-cevapla", cevap="dogru" if bil else "bilmiyorum", durum=d.get("situation_tr") or d.get("tr"), gerekli=toks(alt) + anla, kesin=kes, sinirda=sin, **ek)
        tikla(pg, "[data-test=adim-cevapla] [data-test=next]"); return r
    # eylem sorusu ya da tanınmayan
    if var(pg, "[data-test=adim-soru]"):
        tikla(pg, "[data-test=adim-soru] button.opt[data-right]"); bekle(pg, lambda: var(pg, "[data-test=adim-soru] [data-test=next]"), 5); yakala(pg)
        r = kaydet("m-soru", "adim-soru(eylem)", cevap="dogru", soru=metin(pg, "[data-test=adim-soru] h3"), **ek); tikla(pg, "[data-test=adim-soru] [data-test=next]"); return r
    r = kaydet("diger", "medya:" + adim, cevap="?", metin=metin(pg)[:200], **ek)
    if var(pg, "[data-test=next]"): tikla(pg, "[data-test=next]")
    return r

# ---------------------------------------------------------------- prova
def prova_adim(pg):
    DURUM["yer"] = "prova"
    pg.wait_for_timeout(300)
    notlar = ekran_not(pg)
    P = GUN_J["prova"]
    if var(pg, "[data-test=prova-rapor]"):
        yakala(pg); r = kaydet("p-rapor", "prova-rapor", cevap="okudu", rapor=metin(pg, "[data-test=prova-rapor]")[:300], notlar=notlar)
        tikla(pg, "[data-test=prova-sonraki]" if var(pg, "[data-test=prova-sonraki]") else "[data-test=prova-rapor] a.btn.primary, [data-test=prova-rapor] .btn.primary"); return r
    if var(pg, "[data-test=prova-hazirlik]"):
        yakala(pg, "ogretim")
        for i in range(pg.locator("[data-test=hazirlik-dinle]").count()): pg.locator("[data-test=hazirlik-dinle]").nth(i).click(); pg.wait_for_timeout(150)
        acik = bekle(pg, lambda: pg.locator("[data-test=prova-basla]").is_enabled(), 60)
        r = kaydet("p-hazirlik", "prova-hazirlik", cevap="dinledi" if acik else "KİLİTLİ", cumle=pg.locator("[data-test=hazirlik-cumle]").count(), notlar=notlar)
        tikla(pg, "[data-test=prova-basla]"); return r
    if var(pg, "[data-test=prova-bitir]"):
        r = kaydet("p-tur", "prova-bitir", cevap="-", notlar=notlar); tikla(pg, "[data-test=prova-bitir]"); return r
    if var(pg, "[data-test=prova-konusma]"):
        bekle(pg, lambda: var(pg, "[data-test=prova-konusma] [data-test=answer]"), 5)
        onceki = set(BILINEN); yakala(pg, "gorunum")
        son = pg.locator("[data-test=prova-chat] [data-kim=karsi]").last.inner_text().strip()
        st = set(toks(son.split("\n")[0]))
        dug = max(P["dugumler"], key=lambda x: len(st & set(toks(x["de"]))) - 0.01 * len(set(toks(x["de"])) - st))
        anla = toks(son.split("\n")[0]); anla_eksik = [t for t in anla if t not in onceki and t not in ADLAR]
        best = None
        for s in (dug or {}).get("secenekler", []):
            if not s.get("uygun"): continue
            for a_ in s.get("accepted") or [s["de"]]:
                ks = [t for t in toks(a_) if t not in onceki and t not in ADLAR]
                if best is None or len(ks) < len(best[1]): best = (a_, ks)
        alt, ks = best if best else ("", [])
        kes = [t for t in ks if not any(len(os.path.commonprefix([t, q])) >= 4 for q in onceki)]; sin = [t for t in ks if t not in kes]
        bil = not ks and alt
        pg.locator("[data-test=prova-konusma] ~ * [data-test=answer], .actionbar [data-test=answer]").first.fill(alt.replace("{name}", AD) if bil else "Bilmiyorum")
        pg.locator(".actionbar [data-test=submit]").first.click()
        bekle(pg, lambda: var(pg, "[data-test=next]") or var(pg, "[data-test=dogrusuyla-gec]") or var(pg, "[data-test=tekrar]"), 5)
        geri = metin(pg, ".actionbar")[:160]
        yakala(pg, "ogretim")
        if var(pg, "[data-test=next]"): sonuc = "dogru"; tikla(pg, "[data-test=next]")
        elif var(pg, "[data-test=dogru-soyledim]") and bil: sonuc = "beyan"; tikla(pg, "[data-test=dogru-soyledim]")
        elif var(pg, "[data-test=dogrusuyla-gec]"): sonuc = "bilmiyorum" if not bil else "REDDEDİLDİ"; tikla(pg, "[data-test=dogrusuyla-gec]")
        else: sonuc = "?"; tikla(pg, "[data-test=tekrar]")
        return kaydet("p-tur", "prova-konusma", cevap=sonuc, karsi=son[:80], yazilan=alt if bil else "", gerekli=toks(alt), kesin=kes, sinirda=sin, cevirili_yeni=anla_eksik, geri=geri, notlar=notlar)
    r = kaydet("diger", "prova:?", cevap="?", metin=metin(pg)[:200], notlar=notlar)
    b = pg.locator(".actionbar .btn.primary").first
    if b.count() and b.is_enabled(): b.click()
    return r

# ---------------------------------------------------------------- okuma
def okuma_adim(pg):
    DURUM["yer"] = "okuma"
    pg.wait_for_timeout(300)
    notlar = ekran_not(pg)
    if var(pg, "[data-test=okuma-bitti]"):
        r = kaydet("o-bitti", "okuma-bitti", cevap="-", notlar=notlar)
        tikla(pg, "[data-test=okuma-sonraki]" if var(pg, "[data-test=okuma-sonraki]") else "[data-test=okuma-bitti] a.btn.primary"); return r
    if var(pg, "[data-test=okuma-metin]") and var(pg, "[data-test=okuma-metin] [data-test=next], [data-test=next]"):
        if var(pg, "[data-test=metin-tr-ac]"): tikla(pg, "[data-test=metin-tr-ac]"); pg.wait_for_timeout(100)
        onceki = set(BILINEN); yakala(pg, "ogretim")
        mt = GUN_J["okuma_yazma"]["metin_de"]
        yeni = sorted({t for t in toks(mt) if t not in onceki and t not in ADLAR})
        r = kaydet("o-metin", "okuma-metin", cevap="okudu", cevirili_yeni=yeni, notlar=notlar)
        tikla(pg, "[data-test=next]"); return r
    if var(pg, "[data-test=okuma] [data-test^=drill-]"):
        return dril(pg, "[data-test=okuma]", notlar, "o-soru")
    if var(pg, "[data-test=okuma-yaz]"):
        ornek = pg.get_attribute("[data-test=okuma-yaz]", "data-ornek") or ""
        kes, sin = eksik_bul(toks(ornek)); bil = not kes and not sin
        pg.fill("[data-test=yazi]", ornek.replace("(adın)", AD) if bil else "Hallo.")
        tikla(pg, "[data-test=yazi-kontrol-et]")
        r = kaydet("o-yaz", "okuma-yaz", cevap="dogru" if bil else "bilmiyorum", gerekli=toks(ornek), kesin=kes, sinirda=sin, notlar=notlar)
        if var(pg, "[data-test=next]"): tikla(pg, "[data-test=next]")
        return r
    if var(pg, "[data-test=okuma-ornek]"):
        yakala(pg); r = kaydet("o-soru", "okuma-ornek", cevap="okudu", notlar=notlar); tikla(pg, "[data-test=next]"); return r
    if var(pg, "[data-test=okuma-kontrol]"):
        for i in range(pg.locator("[data-test=kontrol-madde]").count()): pg.locator("[data-test=kontrol-madde]").nth(i).check()
        r = kaydet("o-soru", "okuma-kontrol", cevap="-", notlar=notlar); tikla(pg, "[data-test=okuma-bitir]"); return r
    r = kaydet("diger", "okuma:?", cevap="?", metin=metin(pg)[:200], notlar=notlar)
    if var(pg, "[data-test=next]"): tikla(pg, "[data-test=next]")
    return r

# ---------------------------------------------------------------- ana döngü
PLAN_OKU = """async (g) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  const m = await new Promise((ok) => { const t = d.transaction('meta').objectStore('meta').get('akis:' + g); t.onsuccess = () => ok(t.result && t.result.value); }); d.close(); return m; }"""

def main():
    os.makedirs(OUT, exist_ok=True)
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    takilan, bitti, tur_sayac = [], False, 0
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        DURUM["yer"] = "bugun"; pg.wait_for_timeout(800)
        yakala(pg, "ogretim")  # Bugün'de görünen Almanca (selam satırı)
        bugun_ilk = metin(pg)
        ardisik_takilma, son_imza = 0, None
        for adim_no in range(1500):
            N["ekran"] = adim_no
            once = imza(pg)
            KOK = "[data-test=akis-bitti], [data-test=halka-sonu], [data-test=akis], [data-test=medya], [data-test=medya-bitti], [data-test=prova], [data-test=okuma], [data-test=m1-devam], [data-test=ders]"
            if not var(pg, KOK):
                t0 = time.time(); bekle(pg, lambda: var(pg, KOK), 25, 100); sure = round(time.time() - t0, 1)
                if sure >= 1.0: YUKLEME.append({"n": adim_no, "hash": pg.evaluate("location.hash"), "sn": sure, "yer": DURUM["yer"]}); print(f"   (yükleniyor {sure} sn: {pg.evaluate('location.hash')})")
                once = imza(pg)
            if not PLAN and var(pg, "[data-test=akis]"):
                PLAN.update((pg.evaluate(PLAN_OKU, GUN) or {}).get("plan", {}))
            try:
                if var(pg, "[data-test=akis-bitti]"):
                    kaydet("diger", "akis-bitti", cevap="-", metin=metin(pg)[:200]); bitti = True; break
                elif var(pg, "[data-test=halka-sonu]"):
                    DURUM["yer"] = "akis"; ekran_not(pg); yakala(pg)
                    kaydet("halka-sonu", "halka-sonu", cevap="devam", ozet=metin(pg, "[data-test=halka-sonu]")[:300]); tikla(pg, "[data-test=halka-sonu-devam]")
                elif var(pg, "[data-test=akis]"): akis_adim(pg)
                elif var(pg, "[data-test=medya], [data-test=medya-bitti]"): medya_adim(pg)
                elif var(pg, "[data-test=prova]"): prova_adim(pg)
                elif var(pg, "[data-test=okuma]"): okuma_adim(pg)
                elif var(pg, "[data-test=m1-devam]") or var(pg, "[data-tab=today]") and "#/today" in pg.evaluate("location.hash") + "#/today":
                    # Bugün'ün yolu plan yüklenince çizilir: geçişten hemen sonra BAŞLA henüz yokken "BAŞLA yok" denmesin (Chromium'da yarış)
                    if not var(pg, "[data-test=m1-devam]"): bekle(pg, lambda: var(pg, "[data-test=m1-devam], [data-test=hafta-bitti]"), 10, 100)
                    DURUM.update(yer="bugun"); ekran_not(pg)
                    if var(pg, "[data-test=m1-devam]"):
                        href = pg.get_attribute("[data-test=m1-devam]", "href")
                        kaydet("bugun", "m1-devam", cevap="BAŞLA", hedef=href)
                        if PLAN and href != f"#/akis/{GUN}" and not var(pg, "[data-test=akis-bitti]"):
                            # akış bitmeden BAŞLA başka ekrana gidiyor: Bugün'deki bağlantılar yazılır, öğrenci akışa doğrudan döner
                            linkler = pg.evaluate("() => [...document.querySelectorAll('main a[href^=\\'#/\\']')].map((a) => [a.getAttribute('href'), (a.innerText || a.getAttribute('aria-label') || '').replace(/\\n/g, ' ').slice(0, 50)])")
                            YOL_DISI.append({"n": adim_no, "basla": href, "linkler": linkler, "bugun": metin(pg)[:500]})
                            print(f"   ! BAŞLA akış yerine {href}; akışa #/akis/{GUN} ile dönülüyor")
                            pg.goto(base + f"#/akis/{GUN}")
                        else:
                            tikla(pg, "[data-test=m1-devam]")
                    else:
                        kaydet("bugun", "bugun", cevap="BAŞLA yok", metin=metin(pg)[:300]); break
                elif var(pg, "[data-test=ders]"):
                    kaydet("diger", "ders", cevap="yol dışı", hash=pg.evaluate("location.hash"), metin=metin(pg)[:200])
                    pg.goto(base + f"#/akis/{GUN}")
                else:
                    if bekle(pg, lambda: var(pg, KOK), 3): continue
                    kaydet("diger", "?", cevap="?", hash=pg.evaluate("location.hash"), metin=metin(pg)[:200])
                    takilan.append({"n": adim_no, "ne": "tanınmayan ekran", "hash": pg.evaluate("location.hash"), "metin": metin(pg)[:200]})
                    pg.goto(base + f"#/akis/{GUN}")
            except Exception as e:
                if var(pg, "[data-test=akis-bitti]") or imza(pg) != once:
                    print("   (geçiş sırasında istisna, ekran ilerlemiş:", str(e)[:80], ")"); continue  # betiğin yarışı: adım geçmiş
                takilan.append({"n": adim_no, "ne": f"istisna: {str(e)[:200]}", "hash": pg.evaluate("location.hash"), "metin": metin(pg)[:200]})
                print("   ✗ istisna:", str(e)[:200])
            if not bekle(pg, lambda: imza(pg) != once, 8):
                ardisik_takilma += 1
                takilan.append({"n": adim_no, "ne": "ekran değişmedi", "hash": pg.evaluate("location.hash"), "metin": metin(pg)[:300]})
                print("   ✗ ekran değişmedi:", metin(pg)[:120].replace("\n", " | "))
                b2 = pg.locator(".actionbar .btn.primary:not([disabled])").first
                if b2.count(): b2.click()
                if ardisik_takilma >= 3: break
            else: ardisik_takilma = 0
        son = {}
        DURUM["yer"] = "bugun"
        pg.goto(base + "#/today"); pg.wait_for_timeout(1200)
        son["bugun_sonra"] = metin(pg)[:600]
        son["akis_kayit"] = pg.evaluate(PLAN_OKU, GUN)
        b.close()
    srv.shutdown()
    # ---------------- özet
    seans = {}
    for r in KAYIT:
        s = r.get("seans") or 0
        z = seans.setdefault(s, {"ekran": 0, "ekran_sn": 0, "plan_sn": 0})
        z["ekran"] += 1; z["ekran_sn"] += r["sn"]
        if r.get("plan_sn") and r.get("tur") not in ("durak-gecis",): z["plan_sn"] += r["plan_sn"]
    for d in PLAN.get("duraklar", []):
        if not d["adimlar"]: seans.setdefault(d.get("seans") or 0, {"ekran": 0, "ekran_sn": 0, "plan_sn": 0})["plan_sn"] += round(d["tahmini_dk"] * 60)
    eksikli = [r for r in KAYIT if r.get("kesin") or r.get("sinirda")]
    ozet = {
        "tohum": TOHUM, "gun": GUN, "tarayici": BROWSER, "cihaz": DEVICE, "port": PORT, "bitti": bitti, "ekran": len(KAYIT),
        "ogretilmeden_istenen_kesin": [r for r in eksikli if r.get("kesin") and not r.get("anlama")],
        "ogretilmeden_istenen_sinirda": [r for r in eksikli if not r.get("kesin") and not r.get("anlama")],
        "anlama_eksik": [r for r in eksikli if r.get("anlama")],
        "takilan": takilan, "seans": seans, "bilinen_sayisi": len(BILINEN),
        "reddedilen": [r for r in KAYIT if r.get("cevap") == "REDDEDİLDİ"],
        "notlu": [r for r in KAYIT if r.get("notlar")], "yalniz_dis": [r for r in KAYIT if r.get("yalniz_dis")], "iptal_istek": len(IPTAL), "sayfa_hatasi": ERR, **son,
        "bugun_ilk": bugun_ilk[:400], "yukleme": YUKLEME, "yol_disi": YOL_DISI,
    }
    json.dump(KAYIT, open(os.path.join(OUT, "kayit.json"), "w"), ensure_ascii=False, indent=1)
    json.dump(ozet, open(os.path.join(OUT, "ozet.json"), "w"), ensure_ascii=False, indent=1)
    json.dump(BILINEN, open(os.path.join(OUT, "bilinen.json"), "w"), ensure_ascii=False, indent=0)
    open(os.path.join(OUT, "ekranlar.txt"), "w").write("\n".join(EKRANLAR))
    print("\n==== ÖZET ====")
    print(f"tohum {TOHUM} · {BROWSER} {DEVICE} · gün {GUN} · {len(KAYIT)} ekran · akış bitti: {bitti}")
    print(f"öğretilmeden istenen: kesin {len(ozet['ogretilmeden_istenen_kesin'])}, sınırda {len(ozet['ogretilmeden_istenen_sinirda'])}; anlama eksik {len(ozet['anlama_eksik'])}")
    print(f"yükleniyor ≥1 sn: {[(y['hash'], y['sn']) for y in YUKLEME]}")
    print(f"takılan: {len(takilan)}; reddedilen doğru cevap: {len(ozet['reddedilen'])}; sayfa hatası: {len(ERR)}")
    durak = {}
    for r in KAYIT:
        z = durak.setdefault(r.get("durak") or "bugun", {"seans": r.get("seans"), "ekran": 0, "sn": 0})
        z["ekran"] += 1; z["sn"] += r["sn"]
    for did, z in durak.items():
        pdk = (durak_bilgi(did) or {}).get("tahmini_dk", 0)
        print(f"  {did:24s} seans {z['seans']} · {z['ekran']:3d} ekran · ekran tahmini {z['sn'] / 60:5.1f} dk · plan {pdk:5.1f} dk")
    ozet["durak"] = durak
    json.dump(ozet, open(os.path.join(OUT, "ozet.json"), "w"), ensure_ascii=False, indent=1)
    print(f"akış üretiminde yalnız ses/video/prova/okumadan bilinen sözcük: {[(r['n'], r['yalniz_dis']) for r in ozet['yalniz_dis']]}")
    for s, z in sorted(seans.items()):
        print(f"seans {s}: {z['ekran']} ekran · ekran tahmini {z['ekran_sn'] / 60:.1f} dk · plan (adim_sn) {z['plan_sn'] / 60:.1f} dk")
    sys.exit(0)

if __name__ == "__main__":
    main()
