"""
[DENETİM-TASARIM] akış çekimi (PM-153 md. 2). Kodu değiştirmez: tests/e2e/ogrenci_akis.py'nin bilgi kısıtlı öğrencisini
olduğu gibi yürütür, ekran türü başına ilk iki örneğin (önce: soru, sonra: cevap sonrası) görüntüsünü alır.
Chromium, 390×844 (cihaz yok), akış bayrağı "hepsi", gün kilidi açık, 5 Almanca sesli sahte speechSynthesis.
  cd tests/e2e && python3 ../../docs/v2/qa/tasarim-1/arac/cekim_akis.py <gün> <çıktı klasörü>
"""
import json, os, sys
GUN, OUTD = sys.argv[1], sys.argv[2]
HERE = os.path.dirname(os.path.abspath(__file__))
E2E = os.path.join(HERE, "..", "..", "..", "..", "..", "tests", "e2e")
sys.path.insert(0, os.path.abspath(E2E))
sys.argv = [sys.argv[0], "--browser", "chromium", "--device", "", "--gun", GUN, "--out", os.path.join(OUTD, "kayit"), "--port", str(4400 + int(GUN))]
import common
common.AKIS_TABAN = "try { sessionStorage.setItem('e2e-akis-gunler', '\"hepsi\"'); } catch (e) {}"
common.GUN_KILIDI_TABAN = "try { sessionStorage.setItem('e2e-gun-kilidi', '" + os.environ.get('KILIT', 'acik') + "'); } catch (e) {}"
sys.path.insert(0, HERE)
from ortak import SAHTE_SES, Cekici
import ogrenci_akis as oa

C = Cekici(OUTD, onek=f"g{GUN}")
_launch = oa.launch
def launch(p, **k):
    b, ctx = _launch(p, **k); ctx.add_init_script(SAHTE_SES); return b, ctx
oa.launch = launch

_new_page = oa.new_page
def new_page(ctx, *a, **k):
    pg = _new_page(ctx, *a, **k); C.pg = pg; return pg
oa.new_page = new_page

def sar(f):
    def g(pg, *a, **k):
        pg.wait_for_timeout(450)
        C.tur_cek(pg, "once")
        return f(pg, *a, **k)
    return g
oa.akis_adim = sar(oa.akis_adim); oa.medya_adim = sar(oa.medya_adim); oa.prova_adim = sar(oa.prova_adim); oa.okuma_adim = sar(oa.okuma_adim)

SORU = {"secmeli", "uretim", "bosluk", "yapboz", "eslestir", "resim", "sahne", "dril", "m-soru", "m-dikte", "m-cevapla", "m-cumle", "p-tur", "o-soru", "o-yaz"}
_tikla = oa.tikla
def tikla(pg, sel):
    # 1. gün dışındaki günler: Bugün'ün BAŞLA'sı 1. güne gider; öğrenci istenen günün akışını adresle açar
    if sel == "[data-test=m1-devam]" and GUN != "1":
        pg.goto(pg.url.split("#")[0] + f"#/akis/{GUN}"); pg.wait_for_timeout(800); return
    return _tikla(pg, sel)
oa.tikla = tikla

_kaydet = oa.kaydet
BITTI = {"v": False, "son": False}
def kaydet(tur, govde, **k):
    pg = C.pg
    if pg is not None:
        try:
            if tur == "bugun": C.cek(pg, f"bugun-yolda", sinir=4, anahtar="bugun")
            elif tur in SORU:
                ok = str(k.get("cevap", ""))
                durum = "dogru" if ok in ("dogru", "anladı") else "yanlis-bilmiyorum"
                C.cek(pg, f"{govde}-sonra-{durum}", sinir=1, anahtar=f"{govde}|{durum}")
            elif govde == "akis-bitti": C.cek(pg, "akis-bitti", sinir=1); BITTI["v"] = True
            elif tur == "halka-sonu": C.cek(pg, "halka-sonu", sinir=2, anahtar="halka-sonu")
        except Exception as e: print("   (çekim hatası:", str(e)[:100], ")")
    return _kaydet(tur, govde, **k)
oa.kaydet = kaydet

_metin = oa.metin
def metin(pg, sel="main"):
    # yürüyüş bitince main #/today'e gider ve metin(pg) okur: gün sonrası durumları burada çekilir
    if BITTI["v"] is not None and not BITTI["son"] and oa.DURUM.get("yer") == "bugun" and sel == "main":
        try:
            h = pg.evaluate("location.hash")
            if h.startswith("#/today") and oa.N.get("ekran", 0) > 5 and (BITTI["v"] or os.environ.get("CEK_SON")):
                BITTI["son"] = True
                C.cek(pg, "bugun-gun-sonu", tam=True)
                base = pg.url.split("#")[0]
                for r in ["#/yol", "#/koy", "#/ben", f"#/m1/{GUN}", f"#/rehber/{GUN}", "#/sozluk"]:
                    pg.goto(base + r); pg.wait_for_timeout(1200); C.cek(pg, "sonra-" + r[2:].replace("/", "-"), tam=True)
                pg.goto(base + "#/today"); pg.wait_for_timeout(1200)
        except Exception as e: print("   (son çekim hatası:", str(e)[:100], ")")
    return _metin(pg, sel)
oa.metin = metin

try: oa.main()
except SystemExit: pass
C.yaz()
