import json, re
def fill(t):
    m = re.search(r'Antworte NUR mit JSON[^:{]*:\s*(\{.*\})', t, re.S)
    if not m: return {}
    s = m.group(1)
    # balance braces
    depth=0; end=None
    for i,ch in enumerate(s):
        if ch=='{': depth+=1
        elif ch=='}':
            depth-=1
            if depth==0: end=i+1; break
    s = s[:end] if end else s
    s = re.sub(r'\$\{[^}]*\}', 'x', s)
    s = re.sub(r':\s*0-100', ': 70', s)
    s = re.sub(r':\s*(\d+)-(\d+)', r': \1', s)
    s = s.replace('true|false','true').replace('…','Ich gehe heute einkaufen.')
    s = re.sub(r'"([a-z]+)\|[^"]*"', r'"\1"', s)
    try: return json.loads(s)
    except Exception:
        s2 = re.sub(r',\s*([}\]])', r'\1', s)
        try: return json.loads(s2)
        except Exception: return {}
