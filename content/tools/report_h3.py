"""H3 kontrol noktası ekleri: senaryo madde sayıları, senaryo tam metni (okunur), rastgele 20 derin kart, kalıp listesi.
Çalıştırma: python3 content/tools/report_h3.py [ek dizin (beklemedeki senaryolar)]"""
import json, glob, os, random, sys
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
OUT = os.path.join(ROOT, "docs/v2/reports/h3")
os.makedirs(OUT, exist_ok=True)
extra = sys.argv[1] if len(sys.argv) > 1 else None
files = sorted(glob.glob(os.path.join(ROOT, "content/v2/domains/*/scenarios/*.json")))
held = sorted(glob.glob(os.path.join(extra, "*/scenarios/*.json"))) if extra else []
PROD = {"tr_de", "guided_response", "transform", "listen_and_respond", "gap", "order"}
def counts(d):
    b = len(d["build"]); dr = len(d["drills"]); prod_dr = sum(1 for x in d["drills"] if x["k"] in PROD)
    bl = sum(1 for dl in d["dialogues"] for l in dl["lines"] if l["r"] == "B"); sp = len(d["speaking"])
    return dict(lex=len(d["essentials"]["lexemes"]), ch=len(d["essentials"]["chunks"]), pt=len(d["essentials"]["patterns"]), build=b, drills=dr,
                dia=len(d["dialogues"]), blines=bl, os=len(d["otherSide"]), osa=sum(1 for o in d["otherSide"] if o["layer"] == "alltag"),
                lq=sum(len(l["qs"]) for l in d["listening"]), sp=sp, prod=b + prod_dr + bl + sp, rp=len(d["roleplay"]["goals"]), mis=len(d["missions"]), review=d["review"]["status"])
L = ["# Senaryo başına madde sayıları\n", "| Senaryo | Durum | kelime | ifade | kalıp | cümle kurma | alıştırma | diyalog (B satırı) | karşı taraf (alltag) | dinleme sorusu | konuşma | **üretim** | rol hedefi | görev |", "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|"]
for f, tag in [(f, "depoda") for f in files] + [(f, "beklemede (D-063)") for f in held]:
    d = json.load(open(f)); c = counts(d)
    L.append(f"| `{d['id']}` {d['title_tr']} | {c['review']} · {tag} | {c['lex']} | {c['ch']} | {c['pt']} | {c['build']} | {c['drills']} | {c['dia']} ({c['blines']}) | {c['os']} ({c['osa']}) | {c['lq']} | {c['sp']} | **{c['prod']}** | {c['rp']} | {c['mis']} |")
open(os.path.join(OUT, "senaryo-sayilari.md"), "w").write("\n".join(L) + "\n\nÜretim = cümle kurma + üretim alıştırmaları + diyalogda öğrenci satırları + konuşma görevleri (doğrulayıcının `productionCount` tanımı).\n")
def render(d):
    o = [f"# {d['title_tr']} — {d['title_de']}\n", f"`{d['id']}` · {d['level']} · inceleme: {d['review']['status']}" + (f" · not: {d['review'].get('notes')}" if d['review'].get('notes') else "") + "\n", f"**Hedef:** {d['goal_tr']}\n"]
    o.append("## Temel ifadeler\n| Türkçe | Hochdeutsch | Alltag | Bairisch |\n|---|---|---|---|")
    for c in d["chunks"]:
        bl = c["layers"].get("bair"); o.append(f"| {c['tr']} | {c['layers']['hd']} | {c['layers'].get('alltag') or ''} | {(bl['text'] + ' (' + bl['status'] + ')') if bl else ''} |")
    o.append("\n## Karşı tarafın cümleleri\n| # | Almanca | Türkçe | katman | hız | yutulan |\n|---|---|---|---|---|---|")
    for x in d["otherSide"]: o.append(f"| {x['id']} | {x['de']} | {x['tr']} | {x['layer']} | {x['speed']} | {'; '.join(r['heard'] + ' = ' + r['full'] for r in x.get('reductions') or [])} |")
    o.append("\n## Aşama 3 · Cümle kurma\n| # | Türkçe istem | Kabul edilen |\n|---|---|---|")
    for b in d["build"]: o.append(f"| {b['id']} | {b['prompt_tr']} | {' / '.join(b['accepted'])} |")
    o.append("\n## Aşama 4 · Alıştırmalar\n| # | tür | istem | cevap(lar) |\n|---|---|---|---|")
    for x in d["drills"]:
        k = x["k"]
        if k == "pick": q, a = x["q_tr"], x["opts"][x["ans"]]
        elif k == "gap": q, a = x["de"] + " — " + x["tr"], " / ".join(x["accepted"])
        elif k == "order": q, a = x["tr"], " / ".join(x.get("accepted") or [x["de"]])
        elif k == "transform": q, a = x["instr_tr"] + ": " + x["from_de"], " / ".join(x["accepted"])
        elif k == "guided_response": q, a = x["situation_tr"] + " — „" + x["prompt_de"] + "“", " / ".join(x["accepted"])
        elif k == "listen_and_respond": q, a = (x.get("situation_tr") or "") + " 🔊 „" + x["audio_de"] + "“", " / ".join(x["accepted"])
        else: q, a = x["tr"], " / ".join(x["accepted"])
        o.append(f"| {x['id']} | {k} | {q} | {a} |")
    for dl in d["dialogues"]:
        o.append(f"\n## Diyalog: {dl.get('title_tr', dl['id'])} ({dl['roles']['A']} ↔ {dl['roles']['B']})\n")
        for l in dl["lines"]:
            who = dl["roles"][l["r"]]
            o.append(f"- **{who}:** {l['de']} — _{l['tr']}_" + (f"  \n  ipucu: {l.get('hint_tr')} · kelimeler: {', '.join(l.get('keywords') or [])} · başlangıç: {l.get('starter')} · kabul: {' / '.join(l.get('accepted') or [])}" if l["r"] == "B" else ""))
    o.append("\n## Dinleme")
    for li in d["listening"]:
        o.append(f"\n### {li['title_tr']} ({li['speed']}; hızlar: {', '.join(li.get('speeds') or [])})")
        for s in li["script"]: o.append(f"- {s['r']}: {s['de']}" + (f" — _{s['tr']}_" if s.get("tr") else ""))
        for q in li["qs"]: o.append(f"  - [{q['kind']}] {q['q_tr']} → **{q['opts'][q['ans']]}** (şıklar: {' | '.join(q['opts'])})")
    rp = d["roleplay"]
    o.append(f"\n## Aşama 6 · Rol oyunu\n- Sahne: {rp['scene_tr']}\n- Karşı taraf: {rp['partner_de']}\n- Açılış: „{rp['opener_de']}“\n- Hedefler: " + " · ".join(g['tr'] for g in rp['goals']) + "\n- Düzeyler: " + " · ".join(f"{l['level']}: {l['style_de']} ({l['speed']})" for l in rp['levels']) + "\n- Sürprizler: " + " · ".join(f"„{s['de']}“" for s in rp['surprises']))
    o.append("\n## Konuşma görevleri\n" + "\n".join(f"- {s['task_tr']} — örnek: „{s['model_de']}“" for s in d["speaking"]))
    o.append("\n## Dış görev\n" + "\n".join(f"- {m['task_tr']} · kaçış cümleleri: " + " · ".join(m['escape_de']) for m in d["missions"]))
    o.append("\n## Türkçe hata notları\n" + "\n".join(f"- {m}" for m in d["mistakes_tr"]))
    return "\n".join(o) + "\n"
for sid in ["telefon/scenarios/01-arzttermin.json", "strategie/scenarios/01-nicht-verstanden.json"]:
    d = json.load(open(os.path.join(ROOT, "content/v2/domains", sid)))
    open(os.path.join(OUT, d["id"].replace(":", "_") + ".md"), "w").write(render(d))
cards = []
for f in sorted(glob.glob(os.path.join(ROOT, "content/v2/registry/lexicon/batch-*.json"))): cards += json.load(open(f))["items"]
random.seed(20261117); pick = random.sample(cards, 20)
o = [f"# Rastgele 20 derin kart (tohum 20261117; {len(cards)} kart içinden)\n"]
for c in pick:
    g = c["de"] if not c.get("art") else f"{c['art']} {c['de']}"
    extra2 = (f" · çoğul: {c.get('pl')}" if c.get("pl") else "") + (f" · {c['verb'].get('praesens3', '')} / {c['verb'].get('perfekt', '')}" if c.get("verb") else "")
    o.append(f"## {g} — {c['tr']}\n`{c['id']}` · {c['pos']} · {c.get('level')} · sıra {c.get('freqRank')}{extra2}\n")
    o.append("- Birlikteler: " + " · ".join(f"{x['de']} ({x['tr']})" for x in c.get("collocations", [])))
    o.append("- Kalıplar: " + ", ".join(c.get("patterns", [])))
    for e in c.get("examples", []): o.append(f"- [{e['layer']}{', diyalog' if e.get('dialog') else ''}] {e['de']} — _{e['tr']}_")
    for m in c.get("mistakes_tr", []): o.append(f"- ⚠ {m}")
    o.append("")
open(os.path.join(OUT, "rastgele-20-kart.md"), "w").write("\n".join(o))
pts = json.load(open(os.path.join(ROOT, "content/v2/registry/patterns.json")))
o = [f"# Kalıp listesi ({len(pts)})\n", f"Çekirdek standarda getirilmiş: {sum(1 for p in pts if p.get('core'))} · incelenmiş: {sum(1 for p in pts if (p.get('review') or {}).get('status') == 'reviewed')}\n"]
for p in pts:
    o.append(f"## `{p['id']}` — {p['frame']} ({p.get('level')}, {'çekirdek' if p.get('core') else 'iskelet'}, {(p.get('review') or {}).get('status', 'draft')})\n{p['grammar_tr']}\n")
    for e in p["examples"][:3]: o.append(f"- [{e.get('layer', 'hd')}] {e['de']} — _{e['tr']}_")
    o.append("")
open(os.path.join(OUT, "kalip-listesi.md"), "w").write("\n".join(o))
print("ok", len(files), len(held), len(cards), len(pts))
