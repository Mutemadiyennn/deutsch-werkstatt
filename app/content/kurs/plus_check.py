"""Kelime+ dosyalarını (plus/<id>.json) ünite + global tekrar açısından denetler. python3 plus_check.py [id…]"""
import json, glob, sys, re, subprocess, os
units = {json.load(open(f))['id']: json.load(open(f)) for f in sorted(glob.glob('units/*.json'))}
seen = {}
for uid, u in units.items():
  for w in u['words']: seen.setdefault(w['de'].lower(), uid)
errs = 0
for f in sorted(glob.glob('plus/*.json')):
  if f.endswith('.todo.json'): continue
  uid = os.path.basename(f)[:-5]
  try: P = json.load(open(f))
  except Exception as e: print(uid, "JSON ERROR", e); errs += 1; continue
  if sys.argv[1:] and uid not in sys.argv[1:]: 
    for w in P: seen.setdefault(w['de'].lower(), uid)
    continue
  u = dict(units[uid]); u['plus'] = P
  e, wn = [], []
  import validate
  validate.check(u, e, wn)
  for w in P:
    k = w['de'].lower()
    if k in seen and seen[k] != uid: e.append(f"dup: {w['de']} already in {seen[k]}")
    seen.setdefault(k, uid)
  e = [x for x in e if 'plus' in x or 'word ex' in x or 'dup:' in x or 'TR typo' in x or 'bad art' in x or 'article in' in x]
  wn = [x for x in wn if 'plus' in x or 'word ex' in x]
  print(f"{uid}: {len(P)} words, {sum(len(w.get('ex',[])) for w in P)} sentences, {len(e)} errors, {len(wn)} warnings")
  for x in e[:30]: print("  E", x)
  for x in wn[:10]: print("  W", x)
  errs += len(e)
sys.exit(1 if errs else 0)
