#!/usr/bin/env python3
"""m1audit.ts kendi kendini sınar: gerçek gün dosyalarına tek tek hata sokar, denetimin yakaladığını doğrular.
Çalıştırma: python3 /home/claude/cm/m1audit_sinama.py"""
import copy, json, os, shutil, subprocess, sys, tempfile
ROOT = "/home/claude/wt-m1"; SRC = ROOT + "/content/v2/m1"
base = {n: json.load(open(f"{SRC}/gun-0{n}.json", encoding="utf8")) for n in (1, 2)}
V = lambda d: d["video"]; VB = lambda d: d["video"]["bolumler"][0]
A = lambda d, i=0: d["sesler"][i]; AB = lambda d, i=0: d["sesler"][i]["bolumler"][0]
S = lambda d, i: next(s for s in d["video"]["sahneler"] if s["id"] == i)
N = lambda d, i: next(n for n in d["prova"]["dugumler"] if n["id"] == i)
def lv(b, s): return next(x for x in b["dikte"] if x["seviye"] == s)
def f_usta_unknown(D):
    d = D[1]; S(d, "s13")["de"] = "Übermorgen kommt Samstag. Dann Wochenende!"; lv(VB(d), "usta")["accepted"] = ["Übermorgen kommt Samstag.", "übermorgen kommt samstag", "Übermorgen kommt Samstag"]
def f_usta_ornek(D):
    x = lv(VB(D[2]), "usta"); x["cumle"] = "s1"; x["accepted"] = ["Wann hast du Urlaub?", "wann hast du urlaub", "Wann hast du Urlaub"]
def f_tum_metin(D):
    a = A(D[1]); a["script"] = [l for l in a["script"] if l["id"] in ("c2", "c3")]; b = AB(D[1]); b["cumleler"] = ["c2", "c3"]
    lv(b, "zor")["cumle"] = "c3"; lv(b, "usta")["cumle"] = "c2"
def f_kademe(D): VB(D[1])["dikte"].pop(1)
def f_banka(D): x = lv(VB(D[1]), "zor"); x["banka"] = ["Mittwoch", "Gestern", "war"]
def f_celdirici(D): lv(VB(D[1]), "kolay")["opts"][0] = "nicht"
def f_gorev_zorunlu(D): lv(VB(D[1]), "gercek")["zorunlu"][0] = "Sonntag"
def f_gercek_rakam(D): lv(VB(D[1]), "gercek")["ornek_de"] += " Um 8."
def f_golge(D): VB(D[1])["golge"] = ["s99"]
def f_eylem(D): del A(D[1])["eylem"]
def f_satir_id(D): del A(D[1])["script"][0]["id"]
def f_az_cevap(D): VB(D[1])["cevapla"]["accepted"] = ["Heute ist Donnerstag.", "Donnerstag."]
def f_yanlis_gun(D): VB(D[1])["cevapla"]["accepted"].append("Heute ist Freitag.")
def f_olumsuz(D): AB(D[1], 1)["cevapla"]["accepted"].append("Mittwoch geht nicht.")
def f_kendini(D): VB(D[1])["cevapla"]["accepted"][1] = "..."
def f_cakisma(D): o = N(D[1], "n2")["secenekler"]; o[2]["accepted"].append("Dienstag geht.")
def f_sonraki(D): N(D[1], "n2")["secenekler"][0]["sonraki"] = "n99"
def f_yanlis_yok(D): n = N(D[1], "n4"); n["secenekler"] = n["secenekler"][:1]
def f_cok_secenek(D): n = N(D[1], "n1"); n["secenekler"].append(copy.deepcopy(n["secenekler"][0]))
def f_ogrenci_ogretilmemis(D): o = N(D[1], "n2")["secenekler"][0]; o["de"] = "Ja, Dienstag funktioniert."; o["accepted"][0] = "Ja, Dienstag funktioniert."
def f_oran(D): A(D[1])["script"][1]["de"] = "Leider haben wir wegen einer Fortbildung heute keine Sprechstunde."
def f_kanit(D): S(D[1], "s3")["de"] = "Hallo! Welcher Wochentag ist heute?"
def f_esittir(D): VB(D[1])["ana_fikir"]["q_tr"] = "Ioana = kim?"
def f_terim(D): VB(D[1])["cevapla"]["why_tr"] = "Burada fiil ikinci sıradadır."
def f_kalin(D): VB(D[1])["ayrinti"][0]["q_tr"] = "Bugün Montag mı?"
def f_kontrol_say(D): D[2]["okuma_yazma"]["yazma"]["kontrol_tr"].pop()
def f_kontrol_metin(D): D[2]["okuma_yazma"]["yazma"]["kontrol_tr"][0] = "Ay; yazdın mı?"
def f_ornek_kalip(D): D[2]["okuma_yazma"]["yazma"]["ornek_de"] += " Ich gehe heute."
def f_bair(D): S(D[1], "s1")["de"] = "Grüß Gott! Hier ist Ioana."
def f_sabit_ad(D): S(D[1], "s10")["de"] = "Guten Tag, Frau Yilmaz!"
def f_plan(D): D[1]["yeni_kartlar"].remove("lx:gehen")
def f_ek_kart(D): D[1]["yeni_kartlar"][-1] = "lx:Kollege"
def f_gelecek_kart(D): D[1]["yeni_kartlar"][-1] = "lx:wann"
def f_video_tur(D): V(D[2])["tur"] = V(D[1])["tur"]
def f_oy_tur(D): D[2]["okuma_yazma"]["tur"] = "okuma"
def f_sure(D): V(D[1])["sure_sn"] = 30
def f_kapsam(D): VB(D[1])["cumleler"].pop()
def f_alan(D): VB(D[1])["sorular"] = []
def f_konum(D):
    for d in [VB(D[1]), AB(D[1]), AB(D[1], 1)]:
        for q in [d["ana_fikir"], *d["ayrinti"], lv(d, "kolay")]:
            a = q["ans"]; q["opts"][0], q["opts"][a] = q["opts"][a], q["opts"][0]; q["ans"] = 0
    for s in D[1]["sesler"]:
        e = s["eylem"]; a = e["ans"]; e["opts"][0], e["opts"][a] = e["opts"][a], e["opts"][0]; e["ans"] = 0
    for q in D[1]["okuma_yazma"]["sorular"]:
        if "opts" in q: a = q["ans"]; q["opts"][0], q["opts"][a] = q["opts"][a], q["opts"][0]; q["ans"] = 0
CASES = [
 (f_usta_unknown, "öğretilmemiş: kommt"), (f_usta_ornek, "öğretilmemiş: wann"), (f_tum_metin, "metnin tamamı yazdırılıyor"), (f_kademe, "kademeler"),
 (f_banka, "en az 2 çeldirici"), (f_celdirici, "çeldirici cümlede"), (f_gorev_zorunlu, "zorunlu öğe örnekte yok"), (f_gercek_rakam, "öğretilmemiş: um, acht"),
 (f_golge, "golge cümlesi yok"), (f_eylem, "eylem yok"), (f_satir_id, "satır eksik"), (f_az_cevap, "farklı cevap"), (f_yanlis_gun, "ilk cevapta olmayan"),
 (f_olumsuz, "anlamı değişen"), (f_kendini, "boş cevap"), (f_cakisma, "iki seçeneğe de gidiyor"), (f_sonraki, "sonraki düğüm yok"), (f_yanlis_yok, "yanlış ya da kaba seçenek yok"),
 (f_cok_secenek, "seçenek (2–3)"), (f_ogrenci_ogretilmemis, "öğretilmemiş: funktioniert"), (f_oran, "bilinmeyen kelime %"), (f_kanit, "bilinmeyen kelimeye dayanıyor"),
 (f_esittir, "'=' işareti"), (f_terim, 'dilbilgisi terimi "fiil"'), (f_kalin, "kalın yazılmamış"), (f_kontrol_say, "kontrol_tr 3 madde"), (f_kontrol_metin, "';' işareti"),
 (f_ornek_kalip, "hiçbir kalıba uymuyor"), (f_bair, "BAIRISCH"), (f_sabit_ad, "sabit ad"), (f_plan, "plan kartı eksik"), (f_ek_kart, "video ya da seste geçmiyor"),
 (f_gelecek_kart, "günün kartı"), (f_video_tur, "önceki günle aynı tür"), (f_oy_tur, "önceki günle aynı tür"), (f_sure, "sure_sn 30"), (f_kapsam, "bir kez ve sırayla"),
 (f_alan, 'bilinmeyen alan "sorular"'), (f_konum, "aynı konumda yığılıyor"),
]
def run(D, tmp):
    for n, d in D.items(): json.dump(d, open(f"{tmp}/gun-0{n}.json", "w", encoding="utf8"), ensure_ascii=False)
    env = dict(os.environ, M1_DIR=tmp, M1_OUT=tmp + "/out.txt")
    r = subprocess.run(["npx", "tsx", "/home/claude/cm/m1audit.ts"], cwd=ROOT, env=env, capture_output=True, text=True, timeout=120)
    return r.returncode, r.stdout + r.stderr
tmp = tempfile.mkdtemp(prefix="m1sinama"); fail = 0
try:
    rc, out = run(copy.deepcopy(base), tmp)
    print("temel dosyalar:", "temiz" if rc == 0 else "İHLALLİ"); fail += rc != 0
    for fn, want in CASES:
        D = copy.deepcopy(base); fn(D); rc, out = run(D, tmp)
        ok = rc != 0 and want in out
        print(("yakalandı " if ok else "KAÇTI     ") + fn.__name__ + " → " + want)
        if not ok:
            fail += 1; print("\n".join("    " + l for l in out.splitlines() if "İHLAL " in l or "Error" in l or "at " in l[:8])[:800])
finally: shutil.rmtree(tmp, ignore_errors=True)
print(f"sınama: {len(CASES)} hata türü, kaçan {fail}"); sys.exit(1 if fail else 0)
