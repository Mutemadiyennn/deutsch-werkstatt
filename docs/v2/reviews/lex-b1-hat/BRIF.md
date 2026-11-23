# İÇ-L hattı: lex brifi ve denetim betiği (devir için)

Her lex/dilbilimci ajanına verilen brif aşağıda. Denetim betiği en altta (`python3 kontrol.py Sözcük …`; sözlük, A1/A2/B1 tabloları ve öbür hatların `lex-a2-*`, `k1-sozluk-*`, `lex-b1-*` dallarını tarar; tablo JSON'larını betiğin yanına koy: a1.json = origin/content/a1-kesin a1-kesin.json, a2.json/b1.json/k1.json = #202 dalındaki curriculum dosyaları).

# İÇ-L lex brifi (B1 sözlük partileri) — her lex ajanı önce bunu okur

Görev kaynağı: PM #12 yorum 7088563328 md. 2. B1 planındaki (b1-kesin.json) kimliksiz "lex bekleyen" yuvalar için yeni derin kart. git komutu çalıştırma. Yalnız sana verilen çalışma ağacında ve yalnız sana verilen dosyaya yaz.

## Önce oku
docs/v2/LEARNER.md · CLAUDE.md "Değişmez kurallar" · docs/v2/PEDAGOGY.md §2 · docs/v2/agents/COMMON.md · docs/v2/agents/LEX.md · content/tools/load.ts kuralları · docs/v2/WORLD.md (o haftalarda hangi karakterler var; ör. Tobi 14. haftada taşınır) · biçim örneği: content/v2/registry/lexicon/batch-b1-02b.json'dan 3–4 kart (onaylı, okur ve örneklemden geçmiş).

## Sözcük seçimi
- B1, öğrencinin o haftanın gerçek durumunda gerçekten işine yarayan sözcük (işlev sözcüğü yok).
- Önce content/v2/registry/frequency/lemmas.json K2 sözcüklerinden konuya uyanlar (liste gürültülü: yanlış lemma, özel ad, İngilizce, kaba söz alma). Listede olmayan gerçek alan sözcüğü de olur: o zaman tier "K1", freqRank yok (doğrulayıcı K2'de freqRank ister). Listede olan: tier listeninki, freqRank listeninki.
- Her adayı denetle, yalnız "yeni" olanı al: `python3 /tmp/claude-0/-home-claude-deutsch-werkstatt/e9d7af2d-d97d-57af-a597-5c4dd347031f/scratchpad/kontrol.py Sözcük1 Sözcük2 ...`
- Ayrıca çalışma ağacındaki bütün `batch-b1-*.json` ve `batch-a2-*.json` kimliklerini seçme; eş anlamlısı zaten kartlıysa alma. `content/v2/domains/*/proposals.json`'da öneri olarak duranları raporda yaz.

## Kart standardı (dosya: {"batch":"<ad>","review":{"status":"draft"},"items":[...]})
id `lx:<sözcük>` (adlar büyük harf) · de · tr (kısa, OD-9) · pos · adda art+pl · fiilde verb{praesens3, perfekt, aux, praeteritum, gerekirse prep} · collocations ≥3 · patterns ≥1 (yalnız patterns.json kimlikleri; sayılan kalıp en az bir örnekte gerçekten geçsin) · register · mistakes_tr ≥1 (Türkçe konuşana özgü) · examples ≥5 (kısa; ≥1 alltag, ≥2 iki konuşmacılı diyalog; Türkçesiyle; A2 sonuna kadar öğretilmiş sözcüklerle) · level "B1" · domains (registry/domains.json) · exp {anlam_tr, ne_zaman_tr, parcalar, ipucu_tr} · forms (4 boşluk).

## Önceki partilerde dilbilimci / okur / örneklemin geri döndürdükleri — TEKRARLAMA
1. Türkçe açıklamada dilbilgisi terimi YOK (çoğul, tekil, isim, fiil, ek, artikel, hâl, "sein ile kurulur" …): örnekle anlat.
2. Eşdizim çevirisinde "…" yer tutucusu yok; somut kısa sözcük.
3. anlam_tr ve notlar tek okumada anlaşılır; not kartın KENDİ sözcüğünü anlatır (başka ifadeyi değil).
4. Birinci tekil cümlede sabit cinsiyet yok (öğrenci kadın da erkek de olabilir).
5. Henüz öğretilmemiş (sonraki haftanın) karta gönderme yok; aynı partideki karta gönderme yalnız o kart daha önce geliyorsa.
6. Doğru Almancayı yanlış diye gösteren not yok; not kartın kendi öğrettiği doğru biçimle çelişmez.
7. forms boşlukları: Türkçesi yanındayken başka doğru ve sık cevap varsa `also_ok`'a ekle; başka anlamlı ya da yanlış cevap (ör. "streiten" ≠ "diskutieren", "braten" ≠ "grillen", "Rechnung" ≠ "Abrechnung") also_ok'a GİRMEZ; artikel uymayan ad (das Personalbüro → "zur") girmez; also_ok'taki hiçbir sözcük kartın mistakes_tr'sinde yanlış diye gösterilmez.
8. Olgusal iddia (yasa, süre, zorunluluk, rakam) yazma; genel kal.
9. Bairisch yok; İngilizce köprü yok; kişisel bilgi, kurs/kitap adı, öğrenci adı yok; karakter adları çeşitli ve WORLD'e uygun.

## Bitince
Çalışma ağacında `npm run content:validate` → kendi dosyanda 0 hata. Teslim KISA (en çok 10 satır): hafta → kimlik listesi, atlanan adaylar tek satır, validate son satırı, çözülmemiş sorun.

## kontrol.py
```python
# kullanım: python3 kontrol.py lemma1 lemma2 ...  → var olan / atanmış kimlikleri işaretler
import json,glob,sys,subprocess,os
os.chdir('/home/claude/deutsch-werkstatt')
ids=set()
for f in glob.glob('content/v2/registry/lexicon/batch-*.json'):
    for c in json.load(open(f))['items']: ids.add(c['id'].lower())
for f in ['content/v2/registry/lexemes.v1.json','content/v2/registry/lexemes.v2.json']:
    for c in json.load(open(f)):
        if isinstance(c,dict) and 'id' in c: ids.add(c['id'].lower())
assigned=set()
def walk(o):
    if isinstance(o,str) and o.startswith('lx:'): assigned.add(o.lower())
    elif isinstance(o,dict): [walk(v) for v in o.values()]
    elif isinstance(o,list): [walk(v) for v in o]
for f in [*[os.path.join(os.path.dirname(os.path.abspath(__file__)),n) for n in ('a1.json','a2.json','b1.json','k1.json')]]: walk(json.load(open(f)))
# öbür hatların itilmiş dalları (İÇ-K2: lex-a2-*, k1-sozluk-*; İÇ-L: lex-b1-*)
subprocess.run(['git','fetch','-q','origin','+refs/heads/content/*:refs/remotes/origin/content/*'],stderr=subprocess.DEVNULL)
dal={}
for ref in subprocess.check_output(['git','branch','-r']).decode().split():
    if not any(k in ref for k in ('lex-a2','k1-sozluk','lex-b1')): continue
    for pth in subprocess.check_output(['git','ls-tree','--name-only',ref,'content/v2/registry/lexicon/']).decode().split():
        if pth.endswith('.json'):
            try:
                for c in json.loads(subprocess.check_output(['git','show',ref+':'+pth],stderr=subprocess.DEVNULL))['items']: dal.setdefault(c['id'].lower(),ref.split('/')[-1]+':'+pth.split('/')[-1])
            except Exception: pass
for w in sys.argv[1:]:
    i=('lx:'+w if not w.startswith('lx:') else w).lower()
    tag='SÖZLÜKTE VAR' if i in ids else ('TABLODA ATANMIŞ' if i in assigned else ('BAŞKA DALDA VAR '+dal[i] if i in dal else 'yeni'))
    print(w, tag)
```
