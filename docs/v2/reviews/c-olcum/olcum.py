#!/usr/bin/env python3
"""PM-078 C ölçümü (İÇ, rapor için; doğrulayıcı değildir). Kullanım: python3 olcum.py [KÖK] > sonuc.json

Bilinen küme(t) = o ana kadar tanıtılmış kartlar ∪ biten temel derslerin öğrettiği biçimler (teach.de, tablo hücreleri,
teach.lexeme kartları) ∪ çerçeve kelimeleri (card:false kartlar) ∪ WORLD kişi ve yer adları ∪ rakamlar.
Kelime → kart eşlemesi: kartın de, art, pl, forms[].answer, verb alanları (küçük harf). Eşlenemeyen sözcük tahmin edilmez,
listelenir. Birden çok karta eşlenen sözcük, adaylardan biri biliniyorsa bilinir sayılır (çok anlamlılar ayrıca sayılır).
Sayım üç biçimde: A = günün dersi henüz yapılmamış (Bahçe önce), B = günün dersi önce yapılmış,
C = B + sein/haben şimdiki zaman biçimleri 1. günden çerçeve (öneri), D = C + günün bütün kartları (sıra en iyi
kurulsa ulaşılabilecek üst sınır). Genel adlar (genel-adlar.md başlıkları) ad sayılır.
"""
import json, glob, re, sys, collections
K = sys.argv[1] if len(sys.argv) > 1 else '.'
L = "A-Za-zÄÖÜäöüßıİşŞğĞçÇéè"
TOK = re.compile(rf"[{L}]+(?:-[{L}]+)*|\d+")
def toks(s):
    s = re.sub(r"\{[^}]*\}", " ", s or "")
    return [t.lower() for t in TOK.findall(s)]

cards = {}
for f in sorted(glob.glob(f'{K}/content/v2/registry/lexicon/batch-*.json')):
    for c in json.load(open(f, encoding='utf8'))['items']: cards[c['id']] = c
idx = collections.defaultdict(set)
# 1. geçiş: kartın başlık, artikel ve çoğul sözcükleri
oz = collections.defaultdict(set)
for i, c in cards.items():
    for b in (c['de'], c.get('art', ''), c.get('pl', '')):
        for x in toks(b): oz[i].add(x); idx[x].add(i)
# 2. geçiş: boşluk cevapları ve fiil çekimleri. Bir sözcük birden çok kartın cevabında geçiyorsa en çok geçtiği karta
# eşlenir (eşitlikte hepsine): "ist" lx:sein'e, "letzten" lx:letzter'e gider, lx:passieren / lx:Dienstag'a değil.
sayac = collections.defaultdict(collections.Counter)
for i, c in cards.items():
    v = c.get('verb') or {}
    for a in [f['answer'] for f in c.get('forms', [])] + [x for k, x in v.items() if isinstance(x, str) and k != 'aux']:
        for x in toks(a.replace('…', ' ')): sayac[x][i] += 1
for x, cnt in sayac.items():
    en = max(cnt.values())
    for i, n in cnt.items():
        if n == en: oz[i].add(x); idx[x].add(i)
def yuzey(c): return oz[c['id']]
cerceve = {i for i, c in cards.items() if c.get('card') is False}
# card:false kartların forms dizininde olmayan çekimleri (artikel, zamir, iyelik). Kartta yok; burada açıkça yazıldı,
# ANA'nın sayacı bunları karttan okumalı (öneri: card:false kartlara `bicimler` alanı). Tahmin değil, kapalı liste.
CERCEVE_CEKIM = {
 'lx:der': 'der die das den dem des', 'lx:ein': 'ein eine einen einem einer eines',
 'lx:kein': 'kein keine keinen keinem keiner keines', 'lx:ich': 'ich mich mir', 'lx:du': 'du dich dir',
 'lx:er': 'er ihn ihm', 'lx:sie': 'sie ihr ihnen', 'lx:es': 'es', 'lx:wir': 'wir uns', 'lx:ihr': 'ihr euch',
 'lx:mein': 'mein meine meinen meinem meiner meines', 'lx:dein': 'dein deine deinen deinem deiner deines',
 'lx:sein#2': 'sein seine seinen seinem seiner seines', 'lx:ihr#2': 'ihr ihre ihren ihrem ihrer ihres Ihr Ihre Ihren Ihrem Ihrer',
 'lx:unser': 'unser unsere unseren unserem unserer', 'lx:euer': 'euer eure euren eurem eurer'}
for i, ws in CERCEVE_CEKIM.items():
    if i in cards and i in cerceve:
        for t in ws.lower().split(): idx[t].add(i)
# Bileşik sayılar (r0:04 kuralı: birler + und + onlar) ve sıra sayıları (r0:06: -te/-ste/-ten/-sten). Ders bitince bilinir.
BIR = 'ein zwei drei vier fünf sechs sieben acht neun'.split()
ON = 'zwanzig dreißig vierzig fünfzig sechzig siebzig achtzig neunzig'.split()
BILESIK = re.compile(rf"^({'|'.join(BIR)})und({'|'.join(ON)})$")
TABAN = set('null eins zwei zwo drei vier fünf sechs sieben acht neun zehn elf zwölf dreizehn vierzehn fünfzehn sechzehn siebzehn achtzehn neunzehn zwanzig'.split()) | set(ON) | {'hundert', 'einhundert'}
def sayi(t, biten):
    if 'r0:04-zahlen-21-100' in biten and (BILESIK.match(t) or t in ON or t in ('hundert', 'einhundert')): return True
    if 'r0:06-datum' in biten:
        for ek in ('sten', 'ste', 'ten', 'te', 'stem', 'tem', 'ster', 'ter'):
            if t.endswith(ek):
                k = t[:-len(ek)]
                if k in TABAN or BILESIK.match(k) or k in ('ers', 'drit', 'sieb', 'ach', 'zwanzig', 'dreißig') or k + 'en' in TABAN: return True
    return False
# Öneri C: sein ve haben şimdiki zaman biçimleri 1. günden çerçeve (PM kararına sunulur)
SEIN_HABEN = set('bin bist ist sind seid habe hab hast hat haben habt'.split())

w = json.load(open(f'{K}/content/v2/world/world.json', encoding='utf8'))
adlar = set()
for ch in w.get('characters', []):
    for k in ('name', 'short', 'first', 'last', 'de'):
        if isinstance(ch.get(k), str): adlar |= set(toks(ch[k]))
for p in w['town'].get('places', []): adlar |= set(toks(p.get('name', '')))
import os
ga = f'{K}/docs/v2/reviews/genel-adlar.md'
genel = set()
if os.path.exists(ga):
    for line in open(ga, encoding='utf8'):
        if line.startswith('### '): genel |= set(toks(line[4:]))
adlar |= genel
adlar |= set(toks(w['town']['name'])) | set(toks(w['town'].get('neighbourhood', '')))

dersler = {}
for f in glob.glob(f'{K}/content/v2/temel/r0-*.json'):
    d = json.load(open(f, encoding='utf8')); dersler[d['id']] = d
def ders_bicim(d):
    s, kart = set(), set()
    for t in d.get('teach', []):
        s |= set(toks(t.get('de', '')));
        if t.get('lexeme'): kart.add(t['lexeme'])
    for row in (d.get('table') or {}).get('satirlar', []):
        for j, cell in enumerate(row):
            if j != 1: s |= set(toks(cell))
    return s, kart

gunler = [json.load(open(f, encoding='utf8')) for f in sorted(glob.glob(f'{K}/content/v2/m1/gun-0*.json'))]

def bilinmeyen(cumle, bil_kart, bil_bicim, haric=(), c_onerisi=False, biten=()):
    out, cok = [], []
    for t in toks(cumle):
        if sayi(t, biten): continue
        if c_onerisi and t in SEIN_HABEN: continue
        if t in haric or t.isdigit() or t in adlar or t in bil_bicim: continue
        aday = idx.get(t, set())
        if not aday: out.append(('eslenemedi', t)); continue
        if aday & (bil_kart | cerceve):
            if len(aday) > 1 and not aday <= (bil_kart | cerceve): cok.append(t)
            continue
        out.append(('kart', t, sorted(aday)))
    return out, cok

def gun_cumleleri(g):
    """(yer, tür, cümle): tür 'gorev' (öğrenci üretir) ya da 'gosterim' (okur/dinler)."""
    r = []
    for s in (g.get('sahne') or {}).get('sahneler', []): r.append(('sahne', 'gosterim', s.get('de', '')))
    for a in g.get('sesler', []):
        for c in a.get('script', []): r.append(('ses', 'gosterim', c.get('de', '')))
    p = g.get('prova') or {}
    for n in p.get('dugumler', []):
        r.append(('prova', 'gosterim', n.get('de', '')))
        for s in n.get('secenekler', []): r.append(('prova', 'gorev', s.get('de', '')))
    o = g.get('okuma_yazma') or {}
    for k in ('metin_de',):
        if o.get(k): r.append(('okuma', 'gosterim', o[k]))
    for m in (g.get('gun_sinavi') or {}).get('maddeler', []): r += madde(m, 'sinav')
    return r
def madde(m, yer):
    r = []
    if m.get('audio_de'): r.append((yer, 'gosterim', m['audio_de']))
    if m.get('de'): r.append((yer, 'gosterim', m['de']))
    if m.get('accepted'): r.append((yer, 'gorev', m['accepted'][0]))
    return r
def ders_cumleleri(d):
    r = []
    for t in d.get('teach', []): r.append(('ders.teach', 'gosterim', t.get('de', '')))
    for m in d.get('drills', []): r += madde(m, 'ders.alistirma')
    for l in (d.get('dialogue') or {}).get('lines', []): r.append(('ders.diyalog', 'gorev' if l.get('speaker') == 'ogrenci' else 'gosterim', l.get('de', '')))
    for h in d.get('listening', []):
        for c in h.get('script', []): r.append(('ders.dinleme', 'gosterim', c.get('de', '')))
    return r

sonuc = {'kartlar': [], 'gunler': [], 'eslenemeyen': collections.Counter()}
onceki_kart, onceki_bicim, onceki_derskart, onceki_ders = set(), set(), set(), set()
for g in gunler:
    bugun_bicim, bugun_derskart = set(), set()
    for did in g.get('dersler', []):
        b, k = ders_bicim(dersler[did]); bugun_bicim |= b; bugun_derskart |= k
    tanitilan = set()
    for cid in g['yeni_kartlar']:
        c = cards.get(cid)
        if not c: sonuc['kartlar'].append({'gun': g['day'], 'kart': cid, 'yok': True}); continue
        tanitilan.add(cid)
        kayit = {'gun': g['day'], 'kart': cid, 'ornek': len(c['examples']), 'bosluk': len(c['forms'])}
        hepsi = onceki_ders | set(g.get('dersler', []))
        for ad, bk, bb, bt in (('A', onceki_kart | onceki_derskart | tanitilan, onceki_bicim, onceki_ders),
                           ('B', onceki_kart | onceki_derskart | bugun_derskart | tanitilan, onceki_bicim | bugun_bicim, hepsi),
                           ('C', onceki_kart | onceki_derskart | bugun_derskart | tanitilan, onceki_bicim | bugun_bicim, hepsi),
                           ('D', onceki_kart | onceki_derskart | bugun_derskart | set(g['yeni_kartlar']), onceki_bicim | bugun_bicim, hepsi)):
            o0 = o1 = b0 = 0; ornek_bil = []; bos_bil = []
            for e in c['examples']:
                u, _ = bilinmeyen(e['de'], bk, bb, c_onerisi=ad in 'CD', biten=bt); n = len(u)
                o0 += n == 0; o1 += n <= 1; ornek_bil.append([e['id'], [x[1] if x[0] == 'kart' else '?' + x[1] for x in u]])
                if ad == 'B':
                    for x in u:
                        if x[0] == 'eslenemedi': sonuc['eslenemeyen'][x[1]] += 1
            for f in c['forms']:
                u, _ = bilinmeyen(f['de'].replace('___', ' '), bk, bb, haric=set(toks(f['answer'].replace('…', ' '))), c_onerisi=ad in 'CD', biten=bt)
                b0 += len(u) == 0; bos_bil.append([x[1] if x[0] == 'kart' else '?' + x[1] for x in u])
            kayit[ad] = {'ornek_0': o0, 'ornek_le1': o1, 'bosluk_0': b0, 'ornek_bilinmeyen': ornek_bil, 'bosluk_bilinmeyen': bos_bil}
        sonuc['kartlar'].append(kayit)
    bk = onceki_kart | onceki_derskart | bugun_derskart | tanitilan; bb = onceki_bicim | bugun_bicim
    cs = gun_cumleleri(g) + [x for did in g.get('dersler', []) for x in ders_cumleleri(dersler[did])]
    gk = []
    for yer, tur, s in cs:
        if not s: continue
        bt = onceki_ders | set(g.get('dersler', []))
        u, _ = bilinmeyen(s, bk, bb, biten=bt); uc, _ = bilinmeyen(s, bk, bb, c_onerisi=True, biten=bt)
        sinir = 0 if tur == 'gorev' else 1
        gk.append({'yer': yer, 'tur': tur, 'de': s, 'bilinmeyen': [x[1] if x[0] == 'kart' else '?' + x[1] for x in u],
                   'ihlal': len(u) > sinir, 'ihlal_C': len(uc) > sinir})
    sonuc['gunler'].append({'gun': g['day'], 'cumleler': gk})
    onceki_kart |= tanitilan; onceki_bicim |= bugun_bicim; onceki_derskart |= bugun_derskart; onceki_ders |= set(g.get('dersler', []))
sonuc['eslenemeyen'] = sonuc['eslenemeyen'].most_common()
json.dump(sonuc, sys.stdout, ensure_ascii=False, indent=1)
