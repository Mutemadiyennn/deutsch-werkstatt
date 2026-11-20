"""
Öğrenci ajanı için "kaldığım yerden devam" (PM 7030294523 4b): oturum bitince tarayıcı profili silinir; ajan günlüğündeki
"yarın kaldığım yer" (gün + o günün kaçıncı adımı) bu betikle aynı noktaya getirilir.

Ne tohumlar (yalnız cihazdaki kayıtlar; uygulamanın kendi anahtarlarıyla, services/ilerleme.ts):
  - --gun N'den önceki her gün: Bahçe bitti (m1:bahce:<g>), dersler bitti (ders:<id>), video/sesler bitti (m1:medya:<id>),
    prova ve okuma bitti (m1:prova:<g>, m1:okuma:<g>), gün bitti (m1:gun:<g>); günün yeni kartları tanıtılmış ve cevaplanmış
    (items; son görülme o günün tarihi: bugün − (N − g) gün, vadesi geçmiş → Bahçede tekrar olarak gelir)
  - N. gün: sıradaki --adim K adım (gun.ts sırası: Bahçe → dersler → video/sesler → prova → okuma) bitti sayılır
  - XP: tamamlanan her adım için adım XP'si (xp, xp:adim:<id>), seri için günlere dağıtılır
Sonra Bugün açılır, "sıradaki adım" yazdırılır; --durum DOSYA verilirse IndexedDB dahil tarayıcı durumu kaydedilir
(sonraki betikler `browser.new_context(storage_state=DOSYA)` ile aynı yerden açar).

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


def _kart(kid, zaman, simdi):
    son = _iso(zaman); vade = _iso(min(zaman + timedelta(days=1), simdi - timedelta(minutes=5)))
    return {"itemId": kid, "kind": "lexeme", "passive": {"s": 0.5, "n": 2, "ok": 2, "last": son, "due": vade},
            "active": {"s": 0.3, "n": 1, "ok": 1, "last": son, "due": vade, "sessions": []}, "durable": False, "gaps": [],
            "inBank": True, "u": int(zaman.timestamp() * 1000), "firstAt": {"passive": son, "active": son}}


def tohumla(pg, gun, adim=0, simdi=None):
    """Öğrenciyi `gun`. günün `adim`. adımından sonrasına getirir; tohumlanan adımların listesini döndürür"""
    simdi = simdi or datetime.now(timezone.utc)
    meta, items, yapilan, xp_gunler = [], {}, [], {}
    for g_no in range(1, gun + 1):
        g = gun_dosyasi(g_no)
        if not g: break
        zaman = simdi - timedelta(days=gun - g_no, hours=1)
        a = adimlar(g)
        bitenler = a if g_no < gun else a[:adim]
        for tur, kid in bitenler:
            ts = _iso(zaman); bitti = {"bitti": ts, "ilkBitti": ts}
            if tur == "bahce":
                meta.append({"key": f"m1:bahce:{kid}", "value": ts})
                for k in g.get("yeni_kartlar", []): items.setdefault(k, _kart(k, zaman, simdi))
                xid = f"bahce:{kid}"
            elif tur == "ders":
                meta.append({"key": f"ders:{kid}", "value": {"s": 0, "k": 0, "dogru": 0, "toplam": 0, **bitti}}); xid = f"ders:{kid}"
            elif tur == "medya":
                meta.append({"key": f"m1:medya:{kid}", "value": bitti}); xid = f"medya:{kid}"
            else:
                meta.append({"key": f"m1:{tur}:{kid}", "value": bitti}); xid = f"{tur}:{kid}"
            meta.append({"key": f"xp:adim:{xid}", "value": ts})
            gk = zaman.astimezone().strftime("%Y-%m-%d"); xp_gunler[gk] = xp_gunler.get(gk, 0) + XP_ADIM
            yapilan.append((g_no, tur, kid))
        if g_no < gun: meta.append({"key": f"m1:gun:{g_no}", "value": _iso(zaman)})
    meta.append({"key": "xp", "value": {"toplam": sum(xp_gunler.values()), "gunler": xp_gunler}})
    pg.evaluate(YAZ, ["meta", meta])
    if items: pg.evaluate(YAZ, ["items", list(items.values())])
    return yapilan


SIRADAKI = """() => { const n = document.querySelector('[data-test=next-activity][data-m1]'); if (!n) return ['', ''];
  const a = n.matches('a[href]') ? n : n.querySelector('a[href]'); return [n.textContent || '', a ? a.getAttribute('href') : '']; }"""


def main():
    gun = int(arg("--gun") or 1); adim = int(arg("--adim") or 0)
    srv = serve(PORT); base = f"http://127.0.0.1:{PORT}/"
    with sync_playwright() as p:
        b, ctx = launch(p); pg = new_page(ctx)
        login_onboard(pg, PORT); pg.wait_for_selector("[data-tab=today]")
        yapilan = tohumla(pg, gun, adim)
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
            ctx2 = b.new_context(storage_state=arg("--durum"), viewport=pg.viewport_size); pg2 = new_page(ctx2)
            pg2.goto(base + "#/today"); pg2.wait_for_selector("[data-test=m1-devam]", timeout=15000)
            t2, h2 = pg2.evaluate(SIRADAKI)
            check(h2 == href, f"kaydedilen durumdan açılış aynı adımda ({h2})")
            ctx2.close()
        b.close()
    srv.shutdown()
    finish()


if __name__ == "__main__":
    main()
