"""core1500 listesinden kursta olmayan kelimeleri ünitelere (tema + sıklık) dağıtır → plus/<id>.todo.json (ajan girdisi)."""
import json, glob, collections
core = json.load(open('/home/claude/werkstatt/data/core1500.json'))['items']
units = {json.load(open(f))['id']: json.load(open(f)) for f in sorted(glob.glob('units/*.json'))}
ids = list(units)
have = set(w['de'].lower() for u in units.values() for w in u['words'])
TH = {  # tema → aday üniteler (sırayla)
 'people':['a1-01','a1-02','a2-09','a2-13','b1-08'], 'time':['a1-05','a1-14','a2-08','a2-14'], 'home':['a1-04','a2-02','b1-07'],
 'food':['a1-03','a2-03'], 'shop':['a1-13','a1-03','a2-07','b1-06'], 'city':['a1-11','a2-10','a2-11','b1-12'],
 'body':['a1-10','a2-05','b1-03'], 'work':['a1-08','a2-04','b1-05'], 'school':['a1-07','a2-06','b1-04','b1-13'],
 'fest':['a1-14','a2-07','b1-02'], 'office':['a1-09','a1-12','a2-12','b1-11'], 'nature':['a1-06','a2-11','b1-11'],
 'free':['a1-06','a2-08','b1-02','b1-09'], 'feel':['a2-09','b1-01','b1-10','b1-08']}
todo = collections.defaultdict(list)
cand = [x for x in core if x['de'].lower() not in have]
cand.sort(key=lambda x: x['r'])
n = len(cand); cap = {i: 0 for i in ids}
# tema kelimeleri: sıklık sırasına göre tema ünitelerine sırayla, ünite başına sınır 22
rest = []
for x in cand:
  th = x.get('th')
  if th and th in TH:
    pos = min(len(TH[th]) - 1, int(x['r'] / 3000 * len(TH[th])))
    for uid in TH[th][pos:] + TH[th][:pos][::-1]:
      if cap[uid] < 22: todo[uid].append(x); cap[uid] += 1; break
    else: rest.append(x)
  else: rest.append(x)
# temasız (fiil, sıfat, bağlaç…): sıklık sırasıyla ünitelere yay, ünite başına toplam ~30
i = 0
for x in rest:
  for _ in range(len(ids)):
    uid = ids[min(len(ids) - 1, int(i / len(rest) * len(ids)))]
    if cap[uid] < 34: break
    i += 1
  todo[uid].append(x); cap[uid] += 1; i += 1
for uid in ids:
  json.dump({'unit': uid, 'title_tr': units[uid]['title_tr'], 'cands': todo[uid]}, open(f'plus/{uid}.todo.json', 'w'), ensure_ascii=False, indent=1)
print(len(cand), {k: cap[k] for k in ids})
