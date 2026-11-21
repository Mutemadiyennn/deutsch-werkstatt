"""Omurga taslağı denetimi (PM-078 D, Hazır tanımı md. 4).

Kullanım: python3 docs/v2/reviews/omurga/denetim.py [depo_kökü]
Çıktı: bulgu listesi ve özet; hata varsa çıkış kodu 1.
Denetlenen: yapı, 1–7. gün = m1.json = m1/gun-0N.json (dersler, başlık, kart), kimlikler, requires (döngü, sıra,
var olmayan kimlik; A1 ve B1 haftalarında ve birimsiz haftalarda boş değil), isteğe bağlı ders öğretildi sayılmaz,
A2 birimlerinin gramer önkoşulu, kelime birikimi, süre (≤ 700 dk), kulak (2. haftadan sonra kaynak ya da aday "yok" değil),
kol ve mekân kimlikleri, #56 kapsamı (25 madde), seviye kapıları, yapabiliyorum/görev cümlelerinin kısalığı,
öğrenciye görünen alanlar (OD-9.2): kapi_tr ve kulak_kapi_tr var, tek cümle, ≤14 kelime, fiille biter;
hiçbir görünen alanda noktalı virgül, üç nokta, tırnak, dosya adı ve iç söz (kapı, Kulak:, sahne, sürpriz, kademe, kesit,
kaynaklı, prova, 4/3/2) yok.
"""
import glob
import json
import os
import re
import sys

ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../.."))
J = lambda p: json.load(open(os.path.join(ROOT, p), encoding="utf-8"))

om = J("content/v2/curriculum/omurga.json")
m1 = J("content/v2/curriculum/m1.json")
gun_dosya = {d: J(f"content/v2/m1/gun-{d:02d}.json") for d in range(1, 8)}
a2 = J("content/v2/curriculum/a2.json")
k1 = {e["id"] for e in J("content/v2/curriculum/k1.json")["cekirdek"]}
gram = {g["id"] for g in J("content/v2/registry/grammar.json")}
pats = {p["id"] for p in J("content/v2/registry/patterns.json")}
temel = {json.load(open(f, encoding="utf-8"))["id"] for f in glob.glob(os.path.join(ROOT, "content/v2/temel/r0-*.json"))}
klips = {json.load(open(f, encoding="utf-8"))["id"] for f in glob.glob(os.path.join(ROOT, "content/v2/m1/video/klip-*.json"))}
world = J("content/v2/world/world.json")
mekanlar = {p["id"] for p in world["town"]["places"]} | {p["id"] for p in a2.get("diegetic_places", [])}
kollar = set(a2["arms"])
dn_oneri = {d["id"]: d for d in om["dil_noktasi_onerileri"]}
b1u = {u["id"] for u in om["b1_birim_onerileri"]}
a2u = {u["id"]: u for u in a2["units"]}
gr_map = om["a2_gramer_eslemesi"]

hata, uyari, bilgi = [], [], []
H = om["haftalar"]


def kimlik_var(i):
    if i.startswith("r0:"):
        return i in temel
    if i.startswith("gr:"):
        return i in gram
    if i.startswith("dn:"):
        return i in dn_oneri
    if i.startswith("pt:"):
        return i in pats
    return False


# 1. Yapı
if [h["no"] for h in H] != list(range(1, 53)):
    hata.append("haftalar 1..52 sırasında değil")
dil = om["seviye_dilimleri"]
AYLAR = [4, 4, 5, 4, 4, 5, 4, 4, 5, 4, 4, 5]
ay_of = {}
n = 0
for a, k in enumerate(AYLAR, 1):
    for _ in range(k):
        n += 1
        ay_of[n] = a
ALAN = ["no", "ay", "seviye", "tas", "yapabiliyorum_tr", "gorev_tr", "dil_noktalari", "kelime", "durum", "kulak",
        "kol_mekan", "kapi_tr", "kulak_kapi_tr", "requires", "tahmini_dk"]
for h in H:
    for f in ALAN:
        if f not in h:
            hata.append(f"hafta {h['no']}: '{f}' alanı yok")
    no = h["no"]
    bek_sev = "A1" if no <= dil["A1"][1] else "A2" if no <= dil["A2"][1] else "B1"
    bek_tas = "M1" if no == 1 else "M2" if no <= dil["A1"][1] else "M3" if no <= dil["A2"][1] else "M4"
    if h["seviye"] != bek_sev or h["tas"] != bek_tas:
        hata.append(f"hafta {no}: seviye/taş {h['seviye']}/{h['tas']} ≠ {bek_sev}/{bek_tas}")
    if h["ay"] != ay_of[no]:
        hata.append(f"hafta {no}: ay {h['ay']} ≠ {ay_of[no]}")
if dil["M1"] != [1, 1] or dil["A1"][0] != 2 or dil["A1"][1] != 8:
    hata.append("seviye dilimi: hafta 1 = M1, 2–8 = A1 olmalı")

# 2. Günler
G = om["gunler"]
if [g["day"] for g in G] != list(range(1, 57)):
    hata.append("gunler 1..56 sırasında değil")
for g, m in zip(G[:7], m1["gunler"]):
    for f in ("id", "title_tr", "dersler", "can_do"):
        if g.get(f) != m.get(f):
            hata.append(f"gün {g['day']}: '{f}' m1.json ile aynı değil")
    if g["kelime"]["adet"] != len(m["yeni_kartlar"]):
        hata.append(f"gün {g['day']}: kart sayısı m1.json ile aynı değil")
    # gerçek gün dosyası (uygulamanın okuduğu): m1.json eskiyebilir (#141 → inceleme #179 E1)
    d = gun_dosya[g["day"]]
    for f in ("id", "title_tr", "dersler"):
        if g.get(f) != d.get(f):
            hata.append(f"gün {g['day']}: '{f}' m1/gun-{g['day']:02d}.json ile aynı değil")
    if g["kelime"]["adet"] != len(d.get("yeni_kartlar", [])):
        hata.append(f"gün {g['day']}: kart sayısı m1/gun-{g['day']:02d}.json ile aynı değil")
    for f in ("dersler", "yeni_kartlar", "title_tr"):
        if m.get(f) != d.get(f):
            hata.append(f"gün {g['day']}: m1.json '{f}' gun-{g['day']:02d}.json ile aynı değil")
for g in G[7:]:
    for f in ("title_tr", "dersler", "kelime"):
        if f not in g:
            hata.append(f"gün {g['day']}: '{f}' yok")
for no in range(1, 9):
    gl = G[(no - 1) * 7: no * 7]
    ders = [d for g in gl for d in g["dersler"]]
    hd = H[no - 1]["dil_noktalari"]
    if no == 1:
        if not set(ders) <= set(hd):
            hata.append("hafta 1: gün dersleri dil_noktalari içinde değil")
    elif ders != hd:
        hata.append(f"hafta {no}: günlerin dersleri ≠ haftanın dil_noktalari")
    if sum(g["kelime"]["adet"] for g in gl) != H[no - 1]["kelime"]["planlanan_yeni"]:
        hata.append(f"hafta {no}: günlerin kart toplamı ≠ planlanan_yeni")

# 3–5. Kimlikler, tek tanıtım, requires
# İsteğe bağlı ek ders (zorunlu: false) öğretildi sayılmaz: ona dayanan hafta onu kendisi plana almalı.
istege_bagli = {}  # ders → hafta
for e in [m1.get("ek_ders")] + [g.get("ek_ders") for g in G]:
    if e and not e.get("zorunlu", True):
        istege_bagli[e["ders"]] = (e["day"] - 1) // 7 + 1
tanit = {}
for h in H:
    for i in h["dil_noktalari"]:
        if not kimlik_var(i):
            hata.append(f"hafta {h['no']}: dil noktası '{i}' yok")
        if istege_bagli.get(i) == h["no"]:
            uyari.append(f"hafta {h['no']}: '{i}' isteğe bağlı ek ders; öğretildi sayılmadı")
            continue
        if i in tanit:
            hata.append(f"hafta {h['no']}: '{i}' daha önce {tanit[i]}. haftada tanıtıldı")
        tanit.setdefault(i, h["no"])
for d in dn_oneri.values():
    for g in d["gramer"]:
        if g not in gram:
            hata.append(f"{d['id']}: gramer '{g}' yok")
r0k = om.get("gramer_r0_karsiligi", {})
for g, r in r0k.items():
    if g not in gram or r not in tanit:
        hata.append(f"gramer_r0_karsiligi: '{g}' → '{r}' geçersiz")
# aynı konunun ikinci birimdeki kopyası: yeniden tanıtılmaz (döngüsüzlük), ilkine bağlanır
tekrar_k = om.get("gramer_tekrar_karsiligi", {})
for g, r in tekrar_k.items():
    if g not in gram or r not in gram or r not in tanit:
        hata.append(f"gramer_tekrar_karsiligi: '{g}' → '{r}' geçersiz")
    if g in tanit:
        hata.append(f"gramer_tekrar_karsiligi: '{g}' {tanit[g]}. haftada yeniden tanıtılıyor")
    for h in H:
        if g in h["requires"]["dil_noktalari"]:
            hata.append(f"hafta {h['no']}: requires '{g}' yerine '{r}' olmalı")
acik = sorted(g for g in gram if g not in tanit and g not in r0k and g not in tekrar_k)
if acik:
    hata.append(f"grammar.json'da omurgaya girmeyen konu: {acik}")
kullanilmayan = [i for i in dn_oneri if i not in tanit]
if kullanilmayan:
    hata.append(f"önerilen ama hiçbir haftada olmayan dil noktası: {kullanilmayan}")

kenar = {}
for h in H:
    no = h["no"]
    r = h["requires"]
    kenar[no] = r["haftalar"]
    for x in r["haftalar"]:
        if not (1 <= x < no):
            hata.append(f"hafta {no}: requires.haftalar {x} geçersiz (kendisi ya da sonrası)")
    for i in r["dil_noktalari"]:
        if not kimlik_var(i):
            hata.append(f"hafta {no}: requires dil noktası '{i}' yok")
        elif i not in tanit:
            hata.append(f"hafta {no}: requires '{i}' hiçbir haftada tanıtılmıyor")
        elif tanit[i] >= no:
            hata.append(f"hafta {no}: requires '{i}' {tanit[i]}. haftada tanıtılıyor (sonra)")
    if no > 1 and no - 1 not in r["haftalar"]:
        uyari.append(f"hafta {no}: bir önceki haftayı istemiyor")
    # A2 birimlerinin gramer önkoşulu makineyle sınanır (bölüm 6); A1, B1 ve birimsiz haftalarda elle yazılmış liste boş olamaz
    a2_birimli = any(b.startswith("u:a2:") for b in h["durum"]["birimler"])
    if no > 1 and not r["dil_noktalari"] and not a2_birimli:
        hata.append(f"hafta {no} ({h['seviye']}): requires.dil_noktalari boş")

# döngü (DFS)
renk = {}


def dfs(u, yol):
    renk[u] = 1
    for v in kenar.get(u, []):
        if renk.get(v) == 1:
            hata.append(f"döngü: {yol + [v]}")
        elif not renk.get(v):
            dfs(v, yol + [v])
    renk[u] = 2


for u in kenar:
    if not renk.get(u):
        dfs(u, [u])

# 6. Birimler
gorulen_a2, gorulen_b1 = [], []
for h in H:
    no = h["no"]
    eris = set(h["dil_noktalari"]) | set(h["requires"]["dil_noktalari"])
    for b in h["durum"]["birimler"]:
        if b.startswith("u:a2:"):
            if b not in a2u:
                hata.append(f"hafta {no}: A2 birimi '{b}' yok")
                continue
            if h["seviye"] != "A2":
                hata.append(f"hafta {no}: A2 birimi A2 dışında")
            gorulen_a2.append(b)
            for g in a2u[b]["requires"].get("gramer", []):
                m = gr_map.get(g)
                if m is None:
                    hata.append(f"hafta {no}: {b} gramer '{g}' eşlemesiz")
                elif m not in eris:
                    hata.append(f"hafta {no}: {b} '{g}' → '{m}' requires'ta da haftada da yok")
                elif tanit.get(m, 99) > no:
                    hata.append(f"hafta {no}: {b} '{m}' sonra tanıtılıyor")
        elif b.startswith("u:b1:"):
            if b not in b1u:
                hata.append(f"hafta {no}: B1 birimi '{b}' önerilerde yok")
            gorulen_b1.append(b)
        else:
            hata.append(f"hafta {no}: birim '{b}' tanınmıyor")
if sorted(gorulen_a2) != sorted(a2u):
    eksik = sorted(set(a2u) - set(gorulen_a2))
    cift = sorted({b for b in gorulen_a2 if gorulen_a2.count(b) > 1})
    hata.append(f"A2 birimleri: eksik {eksik}, iki kez {cift}")
if sorted(gorulen_b1) != sorted(b1u):
    hata.append(f"B1 birimleri: eksik {sorted(b1u - set(gorulen_b1))}")

# 7. Kelime
onceki = 0
for h in H:
    k = h["kelime"]
    no = h["no"]
    if k["planlanan_yeni"] <= 0:
        hata.append(f"hafta {no}: planlanan_yeni ≤ 0")
    if k["planlanan_yeni"] > 7 * 25:
        hata.append(f"hafta {no}: planlanan_yeni {k['planlanan_yeni']} > 175")
    if k["birikimli"] != onceki + k["planlanan_yeni"]:
        hata.append(f"hafta {no}: birikimli {k['birikimli']} ≠ {onceki} + {k['planlanan_yeni']}")
    if k["birikimli"] <= onceki:
        hata.append(f"hafta {no}: birikimli artmıyor")
    if sum(z["adet"] for z in k["k1_aralik"]) + k["k1_disi"] != k["planlanan_yeni"]:
        hata.append(f"hafta {no}: aralık adetleri + k1_disi ≠ planlanan_yeni")
    onceki = k["birikimli"]
for sev, v in om["seviye_listeleri"].items():
    b = H[v["omurga_hafta"] - 1]["kelime"]["birikimli"]
    bilgi.append(f"{sev} sonu (hafta {v['omurga_hafta']}): birikimli {b} / başvuru ≈{v['basvuru']} ({(b - v['basvuru']) / v['basvuru']:+.0%})")
for c in om["takvim_kolu_kartlari"]:
    if c not in k1:
        hata.append(f"takvim kartı '{c}' K1'de yok")
g8 = G[7]["kelime"].get("kartlar", [])
m1c = {c for g in m1["gunler"] for c in g["yeni_kartlar"]}
for c in g8:
    if c in m1c:
        hata.append(f"gün 8: '{c}' zaten m1.json'da")
    if c not in k1 and c not in ("lx:Euro", "lx:Cent"):
        hata.append(f"gün 8: '{c}' K1'de yok")

# PM 7049695521 F2: hedef günlerin kartları ya o günün dosyasında ya da (halka PR'ı gelene kadar) 8. günde
for k in om.get("pm_kararlari", []):
    for gun, kartlar in k.get("hedef", {}).items():
        d = int(gun)
        if not 1 <= d <= 7:
            hata.append(f"pm_kararlari '{k['karar']}': hedef gün {gun} 1–7 dışında")
            continue
        for c in kartlar:
            if c not in gun_dosya[d].get("yeni_kartlar", []) and c not in g8:
                hata.append(f"pm_kararlari: '{c}' ne {d}. günde ne 8. günde")
            if c in gun_dosya[d].get("yeni_kartlar", []) and c in g8:
                hata.append(f"pm_kararlari: '{c}' hem {d}. günde hem 8. günde (döngü)")

# 8. Süre
for h in H:
    if h["tahmini_dk"] > 700:
        hata.append(f"hafta {h['no']}: tahmini_dk {h['tahmini_dk']} > 700")
    if "sure_dk" in h and sum(h["sure_dk"].values()) != h["tahmini_dk"]:
        hata.append(f"hafta {h['no']}: sure_dk toplamı ≠ tahmini_dk")

# 9. Kulak
for h in H:
    ku = h["kulak"]
    no = h["no"]
    vk = ku["video_kaynak"]
    if vk == "yok" or vk in ([], ""):
        hata.append(f"hafta {no}: video_kaynak 'yok'")
    if isinstance(vk, list):
        for x in vk:
            if x not in klips:
                hata.append(f"hafta {no}: klip '{x}' yok")
    elif vk != "aranacak":
        hata.append(f"hafta {no}: video_kaynak klip kimliği ya da 'aranacak' olmalı")
    aday = str(ku.get("video_aday") or "").strip().lower()
    if no > 2 and aday in ("", "yok", "none", "-"):
        hata.append(f"hafta {no}: video_aday 'yok'")
    elif vk == "aranacak" and aday in ("", "yok", "none", "-"):
        hata.append(f"hafta {no}: video_kaynak 'aranacak' ama video_aday yok")
    if ku["video_adet"] < 1 or ku["dinleme_dk"] <= 0 or ku["durum_adet"] < 1:
        hata.append(f"hafta {no}: kulak sayıları eksik")
    if not str(h.get("kulak_kapi_tr", "")).strip():
        hata.append(f"hafta {no}: kulak_kapi_tr (dinleme sınavı) yok ya da boş")

# 10. Kol ve mekân
for h in H:
    km = h["kol_mekan"]
    for k in km["kollar"]:
        if k not in kollar:
            hata.append(f"hafta {h['no']}: kol '{k}' yok")
    if km["mekan"] is not None and km["mekan"] not in mekanlar:
        hata.append(f"hafta {h['no']}: mekân '{km['mekan']}' yok")

# 11. #56 kapsamı
kapsam = {}
for h in H:
    for m in h.get("kapsam_56", []):
        kapsam.setdefault(m, []).append(h["no"])
eksik = [m for m in range(1, 26) if m not in kapsam]
if eksik:
    hata.append(f"#56 kapsamı: karşılanmayan madde {eksik}")

# 12. Seviye kapıları
kapilar = [h["no"] for h in H if h.get("seviye_kapisi")]
if kapilar != [8, 24, 52] or kapilar != [dil["A1"][1], dil["A2"][1], dil["B1"][1]]:
    hata.append(f"seviye kapıları {kapilar}; her seviyenin son haftası olmalı")
for no in kapilar:
    h = H[no - 1]
    if "üç yeni durum" not in h["kapi_tr"]:
        hata.append(f"hafta {no}: seviye kapısının konuşma satırında 'üç yeni durum' yok")
    if len(h.get("kapi_ek", {}).get("durumlar", [])) != 3:
        hata.append(f"hafta {no}: seviye kapısında kapi_ek.durumlar üç durum değil")
    if h["kelime"]["planlanan_yeni"] > 20:
        hata.append(f"hafta {no}: seviye kapısında yeni kart çok ({h['kelime']['planlanan_yeni']})")

# 13. Kısa Türkçe (OD-9): tek cümle, terim yok
TERIM = ["perfekt", "dativ", "akkusativ", "modal", "artikel", "fiil", "zamir", "präteritum", "passiv", "konjunktiv", "gramer"]
for h in H:
    for f in ("yapabiliyorum_tr", "gorev_tr"):
        t = h[f]
        if len(t) > 90:
            uyari.append(f"hafta {h['no']}: {f} uzun ({len(t)} harf)")
        if t.count(".") != 1 or not t.endswith("."):
            uyari.append(f"hafta {h['no']}: {f} tek cümle değil")
        if any(w in t.lower() for w in TERIM):
            hata.append(f"hafta {h['no']}: {f} terim içeriyor")

# 14. Öğrenciye görünen alanlar (OD-9.2; okur 1. tur)
IC_SOZ = [r"\bkap[ıi]s?[ıi]?\b", r"\bkapıda\b", r"\bKulak:", r"\bsahne", r"\bsürpriz", r"\bkademe", r"\bkesit",
          r"\bkaynaklı\b", r"\bprova", r"4/3/2", r"\.json", r"\bM[1-4]\b"]
YASAK_ISARET = {";": "noktalı virgül", "…": "üç nokta", "\"": "tırnak", "„": "tırnak", "“": "tırnak", "”": "tırnak"}


def gorunen_denetle(yer, t):
    for k, ad in YASAK_ISARET.items():
        if k in t:
            hata.append(f"{yer}: {ad} var")
    if "..." in t:
        hata.append(f"{yer}: üç nokta var")
    for r in IC_SOZ:
        if re.search(r, t):
            hata.append(f"{yer}: iç söz ({r}) var")


FIIL_SONU = ("sın.", "sin.", "sun.", "sün.")
for h in H:
    no = h["no"]
    for f in ("yapabiliyorum_tr", "gorev_tr", "kapi_tr", "kulak_kapi_tr"):
        gorunen_denetle(f"hafta {no}: {f}", h.get(f, ""))
    gorunen_denetle(f"hafta {no}: durum.tr", h["durum"]["tr"])
    gorunen_denetle(f"hafta {no}: kol_mekan.tr", h["kol_mekan"]["tr"])
    for f in ("kapi_tr", "kulak_kapi_tr"):
        t = h.get(f, "")
        if len(t.split()) > 14:
            hata.append(f"hafta {no}: {f} {len(t.split())} kelime (> 14)")
        if t.replace("Dr.", "Dr").count(".") != 1 or not t.endswith("."):
            hata.append(f"hafta {no}: {f} tek cümle değil")
        if not t.endswith(FIIL_SONU):
            uyari.append(f"hafta {no}: {f} 'yaparsın' biçiminde bir fiille bitmiyor")
for g in G:
    t = g["title_tr"]
    gorunen_denetle(f"gün {g['day']}: başlık", t)
    if "/" in t:
        hata.append(f"gün {g['day']}: başlıkta eğik çizgi var")

print("OMURGA DENETİMİ")
print(f"haftalar {len(H)}, günler {len(G)}, dil noktası {len(tanit)} (önerilen {len(dn_oneri)}), A2 birimi {len(set(gorulen_a2))}/{len(a2u)}, B1 birim önerisi {len(set(gorulen_b1))}/{len(b1u)}")
print(f"tahmini_dk en çok {max(h['tahmini_dk'] for h in H)}, en az {min(h['tahmini_dk'] for h in H)}")
print(f"#56 kapsamı: {len(kapsam)}/25 madde")
for b in bilgi:
    print("bilgi:", b)
for u in uyari:
    print("uyarı:", u)
for e in hata:
    print("HATA:", e)
print(f"sonuç: {len(hata)} hata, {len(uyari)} uyarı")
sys.exit(1 if hata else 0)
