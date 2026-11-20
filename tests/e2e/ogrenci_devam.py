"""
Öğrenci ajanı için "kaldığım yerden devam" (PM 7030294523 4b): oturum bitince tarayıcı profili silinir; ajan günlüğündeki
"yarın kaldığım yer" (gün + o günün kaçıncı adımı) bu betikle aynı noktaya getirilir.

Ne tohumlar (yalnız cihazdaki kayıtlar; uygulamanın kendi anahtarları ve biçimleriyle, services/ilerleme.ts, core/medya.ts):
  - --gun N'den önceki her gün: Bahçe bitti (m1:bahce:<g>), dersler bitti (ders:<id>), video/sesler bitti (m1:medya:<id>, MedyaIlerleme),
    prova ve okuma bitti (m1:prova:<g>, m1:okuma:<g>), gün bitti (m1:gun:<g>)
  - kartlar uygulamanın tekrar işleviyle (srs.review, e2e derlemesinde window.__dwTest): tanıtıldığı gün tanıma + üretim doğru,
    sonraki günlerde vadesi gelen yollar doğru ("kusursuz öğrenci"; FSRS takvimi gerçek, banka boş). Yalnız Bahçe kartları (kartMi).
  - N. gün: sıradaki --adim K adım (gun.ts sırası: Bahçe → dersler → video/sesler → prova → okuma) bitti sayılır; Bahçe bittiyse
    görülen kartlar bahce:gorulen:<gün> listesinde (B5)
  - XP: tamamlanan her adım için adım XP'si (xp, xp:adim:<id>), seri için günlere dağıtılır
Tohumlanmayan: kullanım kayıtları (dakika, gün sonu özeti), ders içi konum, yanlış cevaplar.
Sonra Bugün açılır, "sıradaki adım" yazdırılır; --durum DOSYA verilirse IndexedDB dahil tarayıcı durumu kaydedilir
(başka porttaki betik `browser.new_context(storage_state=durum_yukle(DOSYA, PORT))` ile aynı yerden açar; durum kökene bağlıdır).

  python3 tests/e2e/ogrenci_devam.py --gun 3 [--adim 2] [--durum /tmp/ogrenci.json] [--shots DIR] [--browser webkit] [--device "iPhone 15"]
  modül olarak: from ogrenci_devam import tohumla; tohumla(pg, gun=3, adim=2)
"""
import json
from datetime import datetime, timedelta, timezone
from playwright.sync_api import sync_playwright
from common import serve, launch, new_page, login_onboard, check, finish, shot, arg, content_file

PORT = 4231
YAZ = """async ([st, list]) => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
  await new Promise((ok, no) => { const t = d.transaction(st, 'readwrite'); const s = t.objectStore(st); for (const v of list) s.put(v); t.oncomplete = ok; t.onerror = no; }); d.close(); }"""
XP_ADIM = 10  # core/gun.ts XP.adim ile aynı (değişirse yalnızca seri/XP görünümü etkilenir, konum değil)


def _iso(d):
    return d.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")


def gun_dosyasi(n):
    try:
        return content_file(f"m1/gun-{n:02d}.json")
    except FileNotFoundError:
        return None


def adimlar(g):
    """gun.ts gunAdimlari sırası: (anahtar türü, kimlik)"""
    out = [("bahce", g["day"])]
    out += [("ders", d) for d in g.get("dersler", [])]
    if g.get("video"): out.append(("medya", g["video"]["id"]))
    out += [("medya", s["id"]) for s in g.get("sesler", [])]
    if g.get("prova"): out.append(("prova", g["day"]))
    if g.get("okuma_yazma"): out.append(("okuma", g["day"]))
    return out


# kartlar uygulamanın kendi tekrar işleviyle (srs.review, e2e derlemesinde window.__dwTest) üretilir: tanıtıldığı gün tanıma +
# üretim doğru; sonraki her gün vadesi gelen yol doğru cevaplanır ("kusursuz öğrenci"; inceleme #149 P1-1). Vadesi bugün ya da
# önce olan kartlar Bahçede gerçek tekrar olarak gelir; yanlış cevap olmadığı için kart bankaya (Tekrar edilecekler) girmez.
KART_URET = """([plan, simdiIso]) => { const T = window.__dwTest; if (!T) throw new Error('__dwTest yok (e2e derlemesi değil)');
  const simdi = new Date(simdiIso), items = new Map();
  for (const g of plan) {
    const d = new Date(g.zaman);
    for (const id of g.yeni) { if (items.has(id)) continue;
      let it = T.review(undefined, { itemId: id, kind: 'lexeme', path: 'passive', outcome: 'correct', session: 'garden@' + d.getTime(), source: 'drill' }, d);
      const d2 = new Date(d.getTime() + 20 * 60000);
      it = T.review(it, { itemId: id, kind: 'lexeme', path: 'active', outcome: 'correct', session: 'garden@' + d2.getTime(), source: 'drill' }, d2);
      items.set(id, it); }
    // o günün Bahçesi: vadesi gelmiş eski kartlar doğru cevaplanır
    for (const [id, it0] of items) { let it = it0;
      for (const yol of ['passive', 'active']) { const due = it[yol]?.fsrs?.due; if (due && new Date(due) <= d && new Date(it[yol].last) < d)
        it = T.review(it, { itemId: id, kind: 'lexeme', path: yol, outcome: 'correct', session: 'garden@' + d.getTime(), source: 'drill' }, d); }
      items.set(id, it); }
  }
  return [...items.values()]; }"""


def tohumla(pg, gun, adim=0, simdi=None):
    """Öğrenciyi `gun`. günün `adim`. adımından sonrasına getirir; tohumlanan adımların listesini döndürür"""
    simdi = simdi or datetime.now(timezone.utc)
    if not gun_dosyasi(gun): raise SystemExit(f"--gun {gun}: içerikte bu gün yok")
    # günün son adımı da bitmişse sıradaki adım ertesi gündedir: o durumda --gun N+1 --adim 0 kullanılır (inceleme #149 P2-B)
    if adim < 0 or adim >= len(adimlar(gun_dosyasi(gun))): raise SystemExit(f"--adim {adim}: {gun}. günde 0..{len(adimlar(gun_dosyasi(gun))) - 1} olmalı (gün bittiyse --gun {gun + 1} --adim 0)")
    # Bahçeye kart olarak giren kimlikler (kartMi: işlev sözcükleri ve sayılar kart değildir; inceleme #149 P2)
    ISLEV = {"det", "pron", "conj", "prep", "particle", "num"}
    kart = {l["id"] for l in content_file("lexemes.json")["lexemes"] if l.get("card", True) is not False and l.get("pos") not in ISLEV}
    meta, plan, yapilan, xp_gunler = [], [], [], {}
    for g_no in range(1, gun + 1):
        g = gun_dosyasi(g_no)
        if not g: break
        # o günün yerel öğleni (bugünkü gün için şimdiden 5 dk önce): gece yarısına yakın koşuda tarih kaymaz (inceleme #149 P2)
        yerel = (simdi.astimezone() - timedelta(days=gun - g_no)).replace(hour=12, minute=0, second=0, microsecond=0)
        # bugün: öğlen henüz gelmediyse şimdiden 1 saat önce (tanıma + 20 dk sonra üretim de geçmişte kalır; inceleme #149 P2-C)
        zaman = min(yerel, simdi - timedelta(hours=1)).astimezone(timezone.utc) if g_no == gun else yerel.astimezone(timezone.utc)
        a = adimlar(g)
        bitenler = a if g_no < gun else a[:adim]
        for tur, kid in bitenler:
            ts = _iso(zaman); bitti = {"bitti": ts, "ilkBitti": ts}
            if tur == "bahce":
                meta.append({"key": f"m1:bahce:{kid}", "value": ts})
                plan.append({"zaman": ts, "yeni": [k for k in g.get("yeni_kartlar", []) if k in kart]})
                # B5 (D-121): bugünün Bahçesi yapıldıysa görülen kartlar günün listesinde (ders onları yeniden tanıtmaz)
                if g_no == gun:
                    meta.append({"key": f"bahce:gorulen:{zaman.astimezone().strftime('%Y-%m-%d')}", "value": [k for k in g.get("yeni_kartlar", []) if k in kart]})
                xid = f"bahce:{kid}"
            elif tur == "ders":
                meta.append({"key": f"ders:{kid}", "value": {"s": 0, "k": 0, "dogru": 0, "toplam": 0, **bitti}}); xid = f"ders:{kid}"
            elif tur == "medya":
                # MedyaIlerleme biçimi (core/medya.ts): konum + sayaçlar (inceleme #149 P1-2)
                # sesin eylem sorusu da cevaplanmış sayılır (eylem: true; yoksa biten ses açılınca eylem yeniden sorulur; inceleme #149 B-2)
                ses = any(x.get("id") == kid for x in g.get("sesler", []))
                meta.append({"key": f"m1:medya:{kid}", "value": {"b": 0, "s": 0, "k": 0, "dogru": 10, "toplam": 10, "bitti": True, "ilkBitti": True, **({"eylem": True} if ses else {})}}); xid = f"medya:{kid}"
            else:
                meta.append({"key": f"m1:{tur}:{kid}", "value": bitti}); xid = f"{tur}:{kid}"
            meta.append({"key": f"xp:adim:{xid}", "value": ts})
            gk = zaman.astimezone().strftime("%Y-%m-%d"); xp_gunler[gk] = xp_gunler.get(gk, 0) + XP_ADIM
            yapilan.append((g_no, tur, kid))
        if g_no < gun: meta.append({"key": f"m1:gun:{g_no}", "value": _iso(zaman)})
    meta.append({"key": "xp", "value": {"toplam": sum(xp_gunler.values()), "gunler": xp_gunler}})
    pg.evaluate(YAZ, ["meta", meta])
    if plan:
        pg.wait_for_function("() => !!window.__dwTest", timeout=10000)
        items = pg.evaluate(KART_URET, [plan, _iso(simdi)])
        if items: pg.evaluate(YAZ, ["items", items])
    return yapilan


def durum_yukle(dosya, port):
    """Kaydedilen durumu başka bir porttaki sunucu için açar (tarayıcı durumu kökene bağlı; inceleme #149 P1-3).
    Kullanım: ctx = browser.new_context(storage_state=durum_yukle('/tmp/ogrenci.json', PORT))"""
    d = json.load(open(dosya, encoding="utf-8"))
    for o in d.get("origins", []): o["origin"] = f"http://127.0.0.1:{port}"
    return d


SIRADAKI = """() => { const n = document.querySelector('[data-test=next-activity][data-m1]'); if (!n) return ['', ''];
  const a = n.matches('a[href]') ? n : n.querySelector('a[href]'); return [n.textContent || '', a ? a.getAttribute('href') : '']; }"""


def main():
    gun = int(arg("--gun") or 1); adim = int(arg("--adim") or 0)
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        yapilan = tohumla(pg, gun, adim)
        # kart durumu gerçek öğrenci gibi mi: FSRS takvimli, vadesi gelen var (gün ≥ 2), banka boş (yanlış yok)
        kd = pg.evaluate("""async () => { const d = await new Promise((ok) => { const q = indexedDB.open('dw2'); q.onsuccess = () => ok(q.result); });
          const l = await new Promise((ok) => { const g = d.transaction('items').objectStore('items').getAll(); g.onsuccess = () => ok(g.result); }); d.close();
          const now = Date.now(); return { n: l.length, fsrs: l.filter((x) => x.passive?.fsrs && x.active?.fsrs).length,
            vadeli: l.filter((x) => [x.passive, x.active].some((y) => y?.fsrs && new Date(y.fsrs.due).getTime() <= now)).length, banka: l.filter((x) => x.inBank).length }; }""")
        print(f"  · kartlar: {kd['n']} tanıtılmış (bilinen kart listesi öğrenci ajanına bu kadar), vadeli {kd['vadeli']}, bankada {kd['banka']}")
        check(kd["n"] == kd["fsrs"] and kd["banka"] == 0, f"kartlar uygulamanın tekrar takvimiyle ({kd})")
        # bugünün Bahçesi henüz yapılmadıysa vadesi gelen kart var; yapıldıysa bugünkü tekrarlar bitmiştir
        if gun >= 3 and adim == 0: check(kd["vadeli"] > 0, f"{gun}. günde Bahçe öncesi vadesi gelen kart var (gerçek tekrar)")
        pg.goto(base + "#/learn"); pg.goto(base + "#/today"); pg.wait_for_selector("[data-test=m1-devam], [data-tab=today]")
        pg.wait_for_selector("[data-test=m1-devam]", timeout=15000)  # Bugün önce sade düzeni, plan yüklenince günü çizer
        sirada, href = pg.evaluate(SIRADAKI)
        print(f"tohumlanan adım: {len(yapilan)} (son: {yapilan[-1] if yapilan else '-'})")
        print(f"Bugün → sıradaki: {(sirada or '').strip()[:120]!r} ({href})")
        check(f"{gun}. gün" in (sirada or ""), f"sıradaki adım {gun}. günde")
        g = gun_dosyasi(gun)
        if g:
            a = adimlar(g)
            if adim < len(a):
                tur, kid = a[adim]
                from urllib.parse import quote
                bek = {"bahce": f"#/garden/{kid}", "ders": f"#/ders/{quote(str(kid), safe='')}", "medya": f"#/m1/{gun}/{quote(str(kid), safe='')}", "prova": f"#/prova/{kid}", "okuma": f"#/okuma/{kid}"}[tur]
                check(href == bek, f"sıradaki adım {tur} {kid} ({href} = {bek})")
        if arg("--shots"): shot(pg, f"{arg('--shots')}/devam-gun{gun}-adim{adim}")
        if arg("--durum"):
            ctx.storage_state(path=arg("--durum"), indexed_db=True)
            print(f"durum kaydedildi: {arg('--durum')} (new_context(storage_state=…) ile aç)")
            # kaydedilen durumdan yeni bağlam aynı yerden açılıyor mu
            # başka portta (başka e2e betiği gibi) aynı yerden açılır
            PORT2 = PORT + 1; srv2 = serve(PORT2); base2 = f"http://127.0.0.1:{PORT2}/"
            ctx2 = b.new_context(storage_state=durum_yukle(arg("--durum"), PORT2), viewport=pg.viewport_size); pg2 = new_page(ctx2)
            pg2.goto(base2 + "#/today"); pg2.wait_for_selector("[data-test=m1-devam]", timeout=15000)
            t2, h2 = pg2.evaluate(SIRADAKI)
            check(h2 == href, f"kaydedilen durumdan başka portta açılış aynı adımda ({h2})")
            ctx2.close(); srv2.shutdown()
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
