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
# 1. geçiş: kartın başlık ve çoğul sözcükleri (artikel eşlenmez: "das" her nötr adın kartına düşmesin).
# Bunlar kartın tanıtımda GÖSTERİLEN biçimleridir (gost); kart tanıtılınca bilinen yalnızca bunlardır (garden.ts
# cevapGosterildi ile aynı). Öteki çekimler (gehe, gehst, gute) ancak bir dersin öğrettiği biçimlerle bilinir.
oz = collections.defaultdict(set); gost = collections.defaultdict(set)
# Çok sözcüklü kart başlığı (lx:wie_viel "wie viel") bir kalıptır: tanıtılınca bütün olarak bilinir, sözcükleri tek tek değil
KART_KALIP = {}
for i, c in cards.items():
    bt = toks(c['de'])
    if c.get('card') is not False and len(bt) > 1 and ',' not in c['de']: KART_KALIP[i] = tuple(bt)
    for b in (c['de'], c.get('pl', '')):
        for x in toks(b):
            oz[i].add(x); idx[x].add(i)
            if i not in KART_KALIP: gost[i].add(x)
# 2. geçiş: boşluk cevapları ve fiil çekimleri.
#  - Cevaptaki sözcük yalnızca kartın başlığıyla akrabaysa (ilk 3 harfi başlıkta geçiyorsa; ümlaut yok sayılır) karta
#    eşlenir: lx:Dienstag'ın "___ Dienstag" boşluğundaki "Letzten", "Mitte Juli"deki "Mitte" o karta düşmez.
#  - İstisna: fiil kartlarında tek sözcüklü cevap ve çekim akrabalık aranmadan eşlenir (düzensiz çekim: ist, war, ging).
#  - Bir sözcük birden çok kartın cevabında geçiyorsa en çok geçtiği karta eşlenir, eşitlikte hepsine ("ist" lx:sein'e).
def _n(x): return x.translate(str.maketrans('äöüß', 'aous'))
sayac = collections.defaultdict(collections.Counter)
for i, c in cards.items():
    v = c.get('verb') or {}
    bas = _n(' '.join(toks(c['de'])))
    for a in [f['answer'] for f in c.get('forms', [])] + [x for k, x in v.items() if isinstance(x, str) and k != 'aux']:
        at = toks(a.replace('…', ' '))
        for x in at:
            serbest = c.get('pos') == 'verb' and len(at) == 1
            if not serbest and x not in oz[i] and _n(x)[:3] not in bas: continue
            sayac[x][i] += 1
for x, cnt in sayac.items():
    en = max(cnt.values())
    for i, n in cnt.items():
        if n == en: oz[i].add(x); idx[x].add(i)
def yuzey(c): return oz[c['id']]
oz_bas = {x for i, c in cards.items() for b in (c['de'], c.get('pl', '')) for x in toks(b)}
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
# yer adlarında yalnızca özel ad bölümü ad sayılır: kartı olan cins ad (Bäckerei, Bürgerbüro, Rathaus …) ad değildir
for p in w['town'].get('places', []): adlar |= {t for t in toks(p.get('name', '')) if t not in oz_bas}
import os
ga = f'{K}/docs/v2/reviews/genel-adlar.md'
genel = set()
if os.path.exists(ga):
    for line in open(ga, encoding='utf8'):
        if line.startswith('### '): genel |= set(toks(line[4:]))
adlar |= genel - oz_bas
adlar |= set(toks(w['town']['name'])) - oz_bas | set(toks(w['town'].get('neighbourhood', '')))

dersler = {}
for f in glob.glob(f'{K}/content/v2/temel/r0-*.json'):
    d = json.load(open(f, encoding='utf8')); dersler[d['id']] = d
def _baslik_kart(t):
    """t'yi başlık sözcüğü olarak taşıyan, fiil olmayan gerçek (card:true) kartlar: lx:hier, lx:ja"""
    return {i for i in idx.get(t, ()) if i not in cerceve and cards[i].get('pos') != 'verb' and toks(cards[i]['de']) == [t]}
def ogretir_tek(x):
    """Kalıptan tek başına kalan sözcük ancak fiil biçimi ya da çerçeve sözcüğüyse tek başına öğretilmiş olur
    (ist, war, geht, von); öteki sözcük (guten, wie) yalnızca kalıbın bütünü içinde bilinir (PM #163 karar 2)."""
    a = idx.get(x, set())
    return bool(a) and any(cards[i].get('pos') == 'verb' or i in cerceve for i in a) and not (_baslik_kart(x) - {i for i in a if cards[i].get('pos') == 'verb'})
def kalip_bol(tt, yuva):
    """Kalıbı yuvalardan böler: (tek başına öğretilen sözcükler, bütün olarak bilinen diziler). Tek başına öğretmeyen
    tek sözcük (guten, wie) komşu yuvasıyla birlikte bütün olur: "Guten Tag" → ("guten", "tag")."""
    tek, cok, run, bas = set(), [], [], 0
    tt = list(tt)
    for j, x in enumerate(tt + [None]):
        if x is None or x in yuva:
            if len(run) == 1 and ogretir_tek(run[0]): tek.add(run[0])
            elif len(run) == 1:
                if x is not None and x != 'qqslot': cok.append((run[0], x))
                elif bas > 0 and tt[bas - 1] != 'qqslot': cok.append((tt[bas - 1], run[0]))
            elif run: cok.append(tuple(run))
            run = []; bas = j + 1
        else: run.append(x)
    return tek, cok
def _cekirdek(d):
    """Dersin çok sözcüklü teach öğeleri (PM #163 karar 2): dersin kendi kelimeleri (teach.lexeme başlıkları) yuvadır.
    "Heute ist Montag." → ist; "Guten Tag, hier ist {name}." → ("guten", "tag", "hier", "ist") bütün, ("hier", "ist") bütün."""
    yuva = {x for t in d.get('teach', []) if t.get('lexeme') in cards for x in gost[t['lexeme']]}
    tek, cok = set(), []
    for t in d.get('teach', []):
        tt = toks(t.get('de', ''))
        if len(tt) < 2: continue
        a, b = kalip_bol(tt, yuva); tek |= a; cok += b
    return tek, cok
def ders_bicim(d):
    s, kart = set(), set()
    for t in d.get('teach', []):
        if t.get('lexeme'): kart.add(t['lexeme'])
        tt = toks(t.get('de', ''))
        if len(tt) == 1: s |= set(tt)
    # tek sözcüklü çekirdek o sözcüğü öğretir (ist, war, geht); çok sözcüklü çekirdek yalnızca bütün olarak (DERS_KALIP)
    s |= _cekirdek(d)[0]
    for row in (d.get('table') or {}).get('satirlar', []):
        for j, cell in enumerate(row):
            if j != 1: s |= set(toks(cell))
    return s, kart

DERS_KALIP = {did: _cekirdek(d)[1] for did, d in dersler.items()}
gunler = [json.load(open(f, encoding='utf8')) for f in sorted(glob.glob(f'{K}/content/v2/m1/gun-0*.json'))]

def _kalip_ortusu(tt, biten, ek=(), bil_kart=()):
    """Bilinen kalıplar cümlede aynen (bitişik) geçiyorsa o sözcükler bilinir: biten derslerin çok sözcüklü teach
    kalıpları, tanıtılmış çok sözcüklü kartlar ve ek (ör. halkanın öğrettiği kalıplar). Kalıbın sözcükleri tek tek bilinmez."""
    ort = set()
    for k in [k for did in biten for k in DERS_KALIP.get(did, ())] + [KART_KALIP[i] for i in bil_kart if i in KART_KALIP] + list(ek):
        if True:
            n = len(k)
            for j in range(len(tt) - n + 1):
                if tuple(tt[j:j + n]) == k: ort |= set(range(j, j + n))
    return ort
def bilinmeyen(cumle, bil_kart, bil_bicim, haric=(), c_onerisi=False, biten=(), kaliplar=()):
    out, cok = [], []
    tt = toks(cumle); ort = _kalip_ortusu(tt, biten, kaliplar, bil_kart)
    for j, t in enumerate(tt):
        if j in ort: continue
        if sayi(t, biten): continue
        if c_onerisi and t in SEIN_HABEN: continue
        if t in haric or t.isdigit() or t in adlar or t in bil_bicim: continue
        aday = idx.get(t, set())
        if not aday: out.append(('eslenemedi', t)); continue
        if any(t in gost[i] for i in aday & bil_kart): continue
        # çerçeve sözcüğü: aynı başlıkta henüz tanıtılmamış gerçek kart yoksa bilinir ("ja" lx:ja#2 ile değil lx:ja ile)
        if aday & cerceve and not (_baslik_kart(t) - bil_kart): continue
        if aday & bil_kart: out.append(('bicim', t, sorted(aday & bil_kart))); continue
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
    if m.get('de'):
        # boşluklu cümle cevabıyla doldurulup okunur (kalıp bütün olarak tanınsın: "Wie ___ du?" + heißt)
        de = m['de'].replace('___', m['accepted'][0]) if '___' in m['de'] and m.get('accepted') and len(toks(m['accepted'][0])) <= 2 else m['de']
        r.append((yer, 'gorev' if '___' in m['de'] else 'gosterim', de))
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
                o0 += n == 0; o1 += n <= 1; ornek_bil.append([e['id'], [{'kart': '', 'bicim': '~', 'eslenemedi': '?'}[x[0]] + x[1] for x in u]])
                if ad == 'B':
                    for x in u:
                        if x[0] == 'eslenemedi': sonuc['eslenemeyen'][x[1]] += 1
            for f in c['forms']:
                u, _ = bilinmeyen(f['de'].replace('___', ' '), bk, bb, haric=set(toks(f['answer'].replace('…', ' '))), c_onerisi=ad in 'CD', biten=bt)
                b0 += len(u) == 0; bos_bil.append([{'kart': '', 'bicim': '~', 'eslenemedi': '?'}[x[0]] + x[1] for x in u])
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
        gk.append({'yer': yer, 'tur': tur, 'de': s, 'bilinmeyen': [{'kart': '', 'bicim': '~', 'eslenemedi': '?'}[x[0]] + x[1] for x in u],
                   'ihlal': len(u) > sinir, 'ihlal_C': len(uc) > sinir})
    sonuc['gunler'].append({'gun': g['day'], 'cumleler': gk})
    onceki_kart |= tanitilan; onceki_bicim |= bugun_bicim; onceki_derskart |= bugun_derskart; onceki_ders |= set(g.get('dersler', []))
sonuc['eslenemeyen'] = sonuc['eslenemeyen'].most_common()
json.dump(sonuc, sys.stdout, ensure_ascii=False, indent=1)
