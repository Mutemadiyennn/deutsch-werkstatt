#!/usr/bin/env python3
"""Halka önerisini PM-078 C kapısıyla denetler (rapor aracı). Kullanım: python3 halka_kontrol.py KÖK oneri.json
Öneri biçimi AKIS AK-5 `halkalar` dizisi; her halkada isteğe bağlı `kaliplar: [{"de": "Heute ist …", "tr": …}]`.
Bilinen küme (PM #163): önceki günlerin kartları ve dersleri + önceki halkaların ve bu halkanın kartları + bu ve önceki
halkaların öğrettiği kalıplar ("…" ve bilinen kartların sözcükleri yuvadır; kalan dizi yalnızca bütün olarak bilinir, tek sözcüklü dizi o sözcüğü öğretir).
Günün dersi varsayılmaz: dersin kelime tanıtımları halkanın içine taşınıyor (#160).
Görev cümlesi: bilinmeyen 0. Sahne satırı: en çok 1. Her kart: en az 2 görev cümlesi (kartın örnek/boşluk cümleleri + öneri)."""
import runpy, io, contextlib, sys, json, glob
if len(sys.argv) < 3: sys.exit(__doc__)
K, P = sys.argv[1], sys.argv[2]
sys.argv = ['x', K]
with contextlib.redirect_stdout(io.StringIO()): M = runpy.run_path(f'{K}/docs/v2/reviews/c-olcum/olcum.py')
o = json.load(open(P, encoding='utf8'))
gun = o['gun']; gunler = {g['day']: g for g in M['gunler']}
onceki_kart, onceki_bicim, onceki_ders = set(), set(), set()
for d in range(1, gun):
    onceki_kart |= set(gunler[d]['yeni_kartlar'])
    for did in gunler[d]['dersler']:
        b, k = M['ders_bicim'](M['dersler'][did]); onceki_bicim |= b; onceki_kart |= k; onceki_ders.add(did)
hata = 0; uyari = 0; gorulen = set(); kalip_tek, kalip_cok = set(), []
def kalip_parca(de, bk):
    """Dersteki gibi: "…" ve bilinen kartların sözcükleri yuvadır ("Heute ist …" → ist; "Guten Tag" → bütün)"""
    yuva = {x for i in bk for x in M['gost'][i]} | {'qqslot'}
    return M['kalip_bol'](M['toks'](de.replace('…', ' QQSLOT ')), yuva)
# önceki günlerin halka kalıpları da bilinir (aynı klasördeki gun-0N-halkalar.json)
import os
for d in range(1, gun):
    pf = os.path.join(os.path.dirname(os.path.abspath(P)), f'gun-{d:02d}-halkalar.json')
    if os.path.exists(pf):
        for hh in json.load(open(pf, encoding='utf8'))['halkalar']:
            for k in hh.get('kaliplar', []):
                a, b = kalip_parca(k['de'], onceki_kart); kalip_tek |= a; kalip_cok += [tuple(x for x in c if x != 'qqslot') for c in b]
# (b) yalnızca önceki günlerin yeni_kartlar kartları sayılır (ders kartları nicht, bis, welcher değil; inceleme #177 E1)
onceki_tok = {x for d in range(1, gun) for i in gunler[d]['yeni_kartlar'] for x in M['gost'][i]}
sorular = []
tum = [c for h in o['halkalar'] for c in h['kartlar']]
if sorted(tum) != sorted(gunler[gun]['yeni_kartlar']): print('HATA: halka kartları yeni_kartlar ile aynı değil'); hata += 1
for h in o['halkalar']:
    bk = onceki_kart | gorulen | set(h['kartlar'])
    for k in h.get('kaliplar', []):
        a, b = kalip_parca(k['de'], bk); kalip_tek |= a; kalip_cok += [tuple(x for x in c if x != 'qqslot') for c in b]
    bb = onceki_bicim | kalip_tek
    bt = onceki_ders
    if not 4 <= len(h['kartlar']) <= 6: print(f"HATA {h['id']}: {len(h['kartlar'])} kart"); hata += 1
    for c in h['kartlar']:
        C = M['cards'][c]; n = 0; liste = []
        for e in C['examples']:
            u, _ = M['bilinmeyen'](e['de'], bk, bb, biten=bt, kaliplar=kalip_cok)
            if not u: n += 1; liste.append(e['de'])
        for f in C['forms']:
            u, _ = M['bilinmeyen'](f['de'].replace('___', ' '), bk, bb, haric=set(M['toks'](f['answer'].replace('…', ' '))), biten=bt, kaliplar=kalip_cok)
            if not u: n += 1; liste.append(f['de'])
        for g in h.get('gorev_cumleleri', []):
            if g['kart'] != c: continue
            u, _ = M['bilinmeyen'](g['de'], bk, bb, biten=bt, kaliplar=kalip_cok)
            if 'accepted' in g:
                if len(g['accepted']) < 3 or g['accepted'][0] != g['de']: print(f"HATA {h['id']} {c} accepted ≥3 ve ilki de olmalı: {g['de']}"); hata += 1
                for a in g['accepted'][1:]:
                    ua, _ = M['bilinmeyen'](a, bk, bb, biten=bt, kaliplar=kalip_cok)
                    if ua: print(f"HATA {h['id']} {c} kabul satırında bilinmeyen {ua}: {a}"); hata += 1
            if u: print(f"HATA {h['id']} {c} görev cümlesi bilinmeyen {u}: {g['de']}"); hata += 1
            elif set(M['toks'](g['de'])) & (M['yuzey'](C) - set(M['toks'](C.get('art', '')))): n += 1; liste.append(g['de'])
            else: print(f"HATA {h['id']} {c}: cümlede kartın kelimesi yok: {g['de']}"); hata += 1
        # bağımlılık sırası (PM-078 C, AK-2): kartın en az bir görev cümlesi, halkada kendisine kadarki kartlarla kurulabilmeli
        kadar = onceki_kart | gorulen | set(h['kartlar'][:h['kartlar'].index(c) + 1])
        ilk = next((g for g in h.get('gorev_cumleleri', []) if g['kart'] == c), None)
        if ilk and M['bilinmeyen'](ilk['de'], kadar, bb, biten=bt, kaliplar=kalip_cok)[0]:
            print(f"HATA {h['id']} {c}: sıra — kartın ilk görev cümlesi halkada sonraki bir karta bağlı: {ilk['de']}"); hata += 1
        durum = 'tamam' if n >= 2 else 'EKSİK'
        if n < 2: hata += 1
        print(f"{h['id']} {c}: {n} görev cümlesi [{durum}] {liste}")
    for s in h.get('sahne', {}).get('satirlar', []):
        u, _ = M['bilinmeyen'](s['de'], bk, bb, biten=bt, kaliplar=kalip_cok)
        if len(u) > 1: print(f"HATA {h['id']} sahne ≥2 bilinmeyen {u}: {s['de']}"); hata += 1
        elif u: print(f"not {h['id']} sahne 1 bilinmeyen (işaretli olmalı) {u}: {s['de']}"); uyari += 1
    # PM 7047720404 (b): önceki günlerin kartları bilerek geri gelir (2. günden itibaren halka başına en az 2 görev cümlesi)
    if gun > 1:
        geri = sum(1 for g in h.get('gorev_cumleleri', []) if set(M['toks'](g['de'])) & onceki_tok)
        if geri < 2: print(f"HATA {h['id']}: önceki günden kart içeren görev cümlesi {geri} (en az 2)"); hata += 1
    q = h.get('sahne', {}).get('soru', {})
    if q.get('q_tr'): sorular.append((q['q_tr'], bool(q.get('cikarim'))))
    gorulen |= set(h['kartlar'])
# PM 7047720404 (a): günde en az bir çıkarım sorusu (soru.cikarim: true), aynı soru metni iki kez yok
if len({q for q, _ in sorular}) != len(sorular): print("HATA: aynı sahne sorusu metni iki kez"); hata += 1
if gun > 1 and not any(c for _, c in sorular): print("HATA: günde çıkarım sorusu yok (soru.cikarim: true)"); hata += 1
# PM 7052062209 İÇ 1 (rapor kipi; eşik policy.json'a girene kadar hata değil): gün toplamında dünün kartlarından ≥4 görev
# cümlesi, 3. günden itibaren daha eski günlerin kartlarından ≥4 görev cümlesi
if gun > 1:
    dun_tok = {x for i in gunler[gun - 1]['yeni_kartlar'] for x in M['gost'][i]}
    eski_tok = {x for d in range(1, gun - 1) for i in gunler[d]['yeni_kartlar'] for x in M['gost'][i]}
    gc = [g['de'] for h in o['halkalar'] for g in h.get('gorev_cumleleri', [])]
    dun = sum(1 for s in gc if set(M['toks'](s)) & dun_tok); eski = sum(1 for s in gc if set(M['toks'](s)) & eski_tok)
    print(f"rapor (b) gün toplamı: dünün kartları {dun} cümle (eşik 4){' ' + 'ALTINDA' if dun < 4 else ''}"
          + (f" · daha eski günler {eski} cümle (eşik 4){' ' + 'ALTINDA' if eski < 4 else ''}" if gun > 2 else ''))
print(f"→ {hata} hata, {uyari} not")
