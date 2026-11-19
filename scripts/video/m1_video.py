"""
M1 gerçek insan videosu hattı (#58 A9, #42 §4). CI'da çalışır (ücretsiz GitHub Actions; anahtar yok, ücretli servis yok).

Her `content/v2/m1/video/klip-NN.json` (durum: hazir | kisa) için:
  1. Kaynak (Deutsch im Blick, COERLL, CC BY 4.0): bölüm RSS'inden klibin mp4 adresi ve insan transkripti. Transkriptin
     yalnızca ALMANCA yarısı alınır (RSS önce Almanca, sonra İngilizce verir), konuşmacı etiketi ("Jan: ") ayrılır.
     İçerik dosyasındaki `turlar[].basi` her turun başıyla doğrulanır; uyuşmazsa klip yayına girmez.
  2. Ses iki ASR ile ölçülür: (1) faster-whisper large-v3-turbo (kelime zamanlı), (2) Almanca wav2vec2 CTC (açgözlü çözüm +
     transkriptin CTC zorunlu hizalaması). Normalleştirme: küçük harf, noktalama yok, sayılar yazıyla, ß=ss, dolgu kelimeleri yok.
  3. Ölçüm (#42 §4.3–4.4): hata yalnızca iki ASR de transkriptle çeliştiğinde sayılır. WER, eksik metin oranı (ASR'nin duyup
     transkriptte olmayan), fazla metin oranı (transkriptte olup seste olmayan), cümle başına WER. Etiket: birebir |
     insan-orneklemi | kisaltilmis.
  4. Cümle zamanları: iki ASR'nin tur başı/sonu zamanları; sapma > 300 ms olan tur `dislanan` olur (yayına girmez).
  5. Kesit: `kesit` turları, `haric` turlar çıkarılarak; ffmpeg ile H.264 (veryfast, CRF 28, ≤ 640×360) + AAC, faststart.
  6. Çıktı:
     - GitHub Releases (`m1-medya` etiketi): klip-NN.mp4, klip-NN.jpg (poster), klip-NN.metin.json (Almanca cümleler ve
       kesite göre zamanlar). Ses ve transkript metni depoya girmez (#42 §4.6).
     - Depo: content/v2/m1/video/klip-NN.olcum.json — yalnızca sayılar, model sürümleri, tarih, varlık adları ve sha256.

Kullanım: python scripts/video/m1_video.py OUT_DIR [klip-02 klip-04 ...]
"""
from __future__ import annotations
import datetime, glob, hashlib, html, json, os, re, subprocess, sys, time, unicodedata, urllib.request, urllib.robotparser
import xml.etree.ElementTree as ET

BASE = "https://coerll.utexas.edu/dib/"
UA = "deutsch-werkstatt-m1-video/1.0 (egitim; CC BY 4.0 atifli)"
KOK = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
VIDEO_DIR = os.path.join(KOK, "content", "v2", "m1", "video")
SAPMA_MS = 300
WHISPER_MODEL = os.environ.get("M1_WHISPER", "large-v3-turbo")
W2V_MODEL = os.environ.get("M1_W2V", "jonatasgrosman/wav2vec2-large-xlsr-53-german")
DOLGU = {"äh", "ähm", "aeh", "aehm", "hm", "hmm", "mhm", "öh", "ähh"}

_rp = None
def _robots():
    global _rp
    if _rp is None:
        _rp = urllib.robotparser.RobotFileParser("https://coerll.utexas.edu/robots.txt")
        try: _rp.read()
        except Exception: _rp = False
    return _rp

def get(url: str) -> bytes:
    rp = _robots()
    if rp and not rp.can_fetch(UA, url): raise RuntimeError(f"robots.txt izin vermiyor: {url}")
    time.sleep(1.0)
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=120) as r:
            return r.read()
    except Exception as e:
        raise RuntimeError(f"{url}: {e}") from e

def fix(s: str) -> str:
    if s and re.search("[ÃÂ]", s):
        try: return s.encode("latin-1").decode("utf-8")
        except Exception: return s
    return s

def rss_bolum(k: int) -> dict[str, dict]:
    """Bölüm RSS'i → dosya adı: {mp4, satirlar}"""
    raw = get(f"{BASE}rss.php?k={k}&a=mp4")
    try: root = ET.fromstring(raw)
    except ET.ParseError:
        t = raw.decode("utf-8", "replace")
        t = re.sub(r"&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)", "&amp;", t)
        t = "".join(ch for ch in t if ch in "\t\n\r" or ord(ch) >= 32)
        root = ET.fromstring(t.encode("utf-8"))
    out = {}
    for it in root.iter("item"):
        mp4 = it.findtext("link") or ""
        d = fix(html.unescape(it.findtext("description") or ""))
        d = re.sub(r"<ul>.*?</ul>", "", d, flags=re.S)
        satirlar = [re.sub(r"<[^>]+>", "", x).strip() for x in re.split(r"<br\s*/?>", d)]
        enc = it.find("enclosure")
        out[mp4.rsplit("/", 1)[-1].rsplit(".", 1)[0]] = {"mp4": mp4, "enc": enc.get("url") if enc is not None else None, "satirlar": [x for x in satirlar if x]}
    return out

ETIKET = re.compile(r"^\s*([^:]{1,40}):\s*(.+)$")
EN = {"the", "and", "is", "are", "i", "you", "what", "where", "when", "my", "in", "of", "to", "have", "do", "did"}
DE = {"der", "die", "das", "und", "ist", "ich", "du", "was", "wo", "wann", "mein", "in", "von", "zu", "habe", "bin", "nicht"}

def almanca_yari(satirlar: list[str]) -> list[dict]:
    """Önce Almanca, sonra İngilizce: konuşmacı dizisi iki yarıda aynıysa ilk yarı; değilse dil sözcükleriyle ayır"""
    t = []
    for s in satirlar:
        m = ETIKET.match(s)
        t.append({"speaker": m.group(1).strip() if m else None, "de": (m.group(2) if m else s).strip()})
    h = len(t) // 2
    if len(t) % 2 == 0 and [x["speaker"] for x in t[:h]] == [x["speaker"] for x in t[h:]]:
        return t[:h]
    def dil(x):
        w = set(re.findall(r"[a-zäöüß']+", x["de"].lower()))
        return len(w & DE) - len(w & EN)
    return [x for x in t if dil(x) >= 0]

def norm_kelimeler(s: str) -> list[str]:
    from num2words import num2words
    s = s.lower().replace("ß", "ss")
    s = re.sub(r"\d+", lambda m: " " + num2words(int(m.group()), lang="de") + " ", s)
    s = unicodedata.normalize("NFC", s)
    w = re.findall(r"[a-zäöü]+", s)
    return [x for x in w if x not in DOLGU]

def basi_uyar(de: str, basi: str) -> bool:
    a, b = norm_kelimeler(de), norm_kelimeler(basi)
    return a[: len(b)] == b

# ---------- ses ----------
def ffmpeg(*args: str):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args], check=True)

def ses_cikar(mp4: str, wav: str):
    ffmpeg("-i", mp4, "-ac", "1", "-ar", "16000", wav)

def whisper_kelimeler(wav: str) -> list[dict]:
    from faster_whisper import WhisperModel
    m = WhisperModel(WHISPER_MODEL, device="cpu", compute_type="int8")
    segs, _ = m.transcribe(wav, language="de", word_timestamps=True, vad_filter=False, beam_size=5, condition_on_previous_text=False)
    out = []
    for s in segs:
        for w in s.words or []:
            for n in norm_kelimeler(w.word): out.append({"w": n, "t0": w.start, "t1": w.end})
    return out

_W2V = None
def w2v():
    global _W2V
    if _W2V is None:
        import torch
        from transformers import Wav2Vec2ForCTC, Wav2Vec2Processor
        p = Wav2Vec2Processor.from_pretrained(W2V_MODEL); m = Wav2Vec2ForCTC.from_pretrained(W2V_MODEL).eval()
        _W2V = (torch, p, m)
    return _W2V

def w2v_emisyon(wav: str):
    import soundfile as sf
    torch, p, m = w2v()
    a, sr = sf.read(wav)
    with torch.inference_mode():
        x = p(a, sampling_rate=sr, return_tensors="pt").input_values
        lp = torch.log_softmax(m(x).logits[0], dim=-1)
    sure = len(a) / sr
    return lp, sure / lp.shape[0]

def w2v_metin(lp) -> list[str]:
    torch, p, _ = w2v()
    ids = torch.argmax(lp, dim=-1)
    return norm_kelimeler(p.decode(ids))

def w2v_hizala(lp, kare: float, turlar: list[list[str]]) -> list[tuple[float, float] | None]:
    """Transkriptin CTC zorunlu hizalaması: her turun ilk ve son harfinin zamanı (hizalanamayan tur None)"""
    import torchaudio.functional as F
    torch, p, _ = w2v()
    voc = p.tokenizer.get_vocab(); sep = voc.get("|")
    hedef, sinir = [], []
    for kel in turlar:
        bas = len(hedef)
        for k, w in enumerate(kel):
            for ch in w:
                if ch in voc: hedef.append(voc[ch])
            if sep is not None and k < len(kel) - 1: hedef.append(sep)
        sinir.append((bas, len(hedef) - 1))
        if sep is not None: hedef.append(sep)
    if not hedef: return [None] * len(turlar)
    ali, _ = F.forced_align(lp.unsqueeze(0), torch.tensor([hedef], dtype=torch.int32), blank=p.tokenizer.pad_token_id)
    ali = ali[0].tolist()
    # her hedef simgenin ilk ve son karesi
    konum, j, onceki = [None] * len(hedef), -1, p.tokenizer.pad_token_id
    for t, tok in enumerate(ali):
        if tok != p.tokenizer.pad_token_id and (tok != onceki or j < 0 or konum[j] is None or konum[j][1] != t - 1):
            j += 1
            if j < len(hedef): konum[j] = [t, t]
        elif tok != p.tokenizer.pad_token_id and j < len(hedef) and konum[j] is not None:
            konum[j][1] = t
        onceki = tok
    out = []
    for b, s in sinir:
        if s < b or konum[b] is None or konum[s] is None: out.append(None); continue
        out.append((konum[b][0] * kare, (konum[s][1] + 1) * kare))
    return out

def whisper_tur_zamanlari(wk: list[dict], turlar: list[list[str]]) -> list[tuple[float, float] | None]:
    """Whisper kelimelerini transkript kelimeleriyle hizalar (difflib); turun eşleşen ilk/son kelimesinin zamanı"""
    import difflib
    ref = [(i, w) for i, kel in enumerate(turlar) for w in kel]
    sm = difflib.SequenceMatcher(a=[w for _, w in ref], b=[x["w"] for x in wk], autojunk=False)
    es = {}
    for a, b, n in sm.get_matching_blocks():
        for k in range(n): es[a + k] = b + k
    out = []
    for i in range(len(turlar)):
        idx = [k for k, (ti, _) in enumerate(ref) if ti == i and k in es]
        out.append((wk[es[idx[0]]]["t0"], wk[es[idx[-1]]]["t1"]) if idx else None)
    return out

def hata_kumeleri(ref: list[str], hyp: list[str]) -> tuple[set[int], set[int], dict[int, int]]:
    """ref'e göre: değiştirilen ref konumları, silinen ref konumları, eklemeler (ref konumu → eklenen kelime sayısı)"""
    import jiwer
    o = jiwer.process_words(" ".join(ref) or "x", " ".join(hyp) or "x")
    deg, sil, ek = set(), set(), {}
    for a in o.alignments[0]:
        if a.type == "substitute": deg.update(range(a.ref_start_idx, a.ref_end_idx))
        if a.type == "delete": sil.update(range(a.ref_start_idx, a.ref_end_idx))
        if a.type == "insert": ek[a.ref_start_idx] = a.hyp_end_idx - a.hyp_start_idx
    return deg, sil, ek

def olc(turlar: list[list[str]], h1: list[str], h2: list[str]) -> dict:
    """#42 §4.3: hata yalnızca iki ASR de transkriptle çeliştiğinde sayılır (Whisper'ın uydurmaları elenir)"""
    import jiwer
    ref = [w for kel in turlar for w in kel]
    d1, s1, i1 = hata_kumeleri(ref, h1); d2, s2, i2 = hata_kumeleri(ref, h2)
    hatali1, hatali2 = d1 | s1, d2 | s2
    ortak = hatali1 & hatali2                                # değiştirilen ya da silinen (ikisinde de)
    ortak_sil = s1 & s2                                      # transkriptte olup seste olmayan
    ortak_ek = {k: min(i1[k], i2[k]) for k in i1.keys() & i2.keys()}   # seste olup transkriptte olmayan
    n_ek = sum(ortak_ek.values())
    wer = (len(ortak) + n_ek) / max(1, len(ref))
    eksik = n_ek / max(1, (len(h1) + len(h2)) / 2)
    fazla = len(ortak_sil) / max(1, len(ref))
    cumle = []
    k = 0
    for kel in turlar:
        idx = set(range(k, k + len(kel))); k += len(kel)
        cumle.append(round((len(idx & ortak) + sum(v for p, v in ortak_ek.items() if p in idx)) / max(1, len(kel)), 3))
    return {"wer": round(wer, 4), "eksik_metin": round(eksik, 4), "fazla_metin": round(fazla, 4),
            "wer_asr1": round(jiwer.wer(" ".join(ref), " ".join(h1) or "x"), 4), "wer_asr2": round(jiwer.wer(" ".join(ref), " ".join(h2) or "x"), 4),
            "cumle_wer": cumle}

def etiket(o: dict, hizasiz_oran: float) -> str:
    if o["wer"] > 0.15 or o["eksik_metin"] > 0.07 or hizasiz_oran > 0.05: return "kisaltilmis"
    if o["wer"] <= 0.08 and o["eksik_metin"] <= 0.03 and all(x <= 0.25 for x in o["cumle_wer"]): return "birebir"
    return "insan-orneklemi"

def sha(p: str) -> str:
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""): h.update(b)
    return h.hexdigest()

def isle(klip_yolu: str, out: str, rss_onbellek: dict) -> dict:
    k = json.load(open(klip_yolu))
    ad = os.path.basename(klip_yolu)[:-5]  # klip-NN
    sonuc = {"klip": ad, "kaynak_klip": k["klip"], "durum": k["durum"], "tarih": datetime.date.today().isoformat(),
             "modeller": {"asr1": f"faster-whisper {WHISPER_MODEL}", "asr2": W2V_MODEL}}
    bolum = int(k["klip"].split("_", 1)[0])
    if bolum not in rss_onbellek: rss_onbellek[bolum] = rss_bolum(bolum)
    item = rss_onbellek[bolum].get(k["klip"])
    if not item: return {**sonuc, "hata": "RSS'te klip yok"}
    de = almanca_yari(item["satirlar"])
    bas, son = k["kesit"]["bas_tur"], k["kesit"]["son_tur"]
    haric = {h["tur"] for h in k.get("haric", [])}
    secili = [n for n in range(bas, son + 1) if n not in haric and 1 <= n <= len(de)]
    # basi doğrulaması
    uyusmaz = [t["tur"] for t in k.get("turlar", []) if t["tur"] in secili and not basi_uyar(de[t["tur"] - 1]["de"], t["basi"])]
    if uyusmaz: return {**sonuc, "hata": f"transkript turları içerikle uyuşmuyor: {uyusmaz}"}
    # indir, ses
    mp4 = os.path.join(out, f"{ad}.kaynak.mp4"); wav = os.path.join(out, f"{ad}.wav")
    # video adresi: RSS bağlantısı, enclosure, https ve www biçimleri (kaynak site adres düzenini değiştirmiş olabilir)
    adaylar = []
    for u in [item.get("enc"), item["mp4"], k.get("video_url")]:
        if not u: continue
        for v in (u, u.replace("http://", "https://"), u.replace("://coerll.", "://www.coerll."), u.replace("http://coerll.", "https://www.coerll.")):
            if v not in adaylar: adaylar.append(v)
    hatalar = []
    for u in adaylar:
        try: open(mp4, "wb").write(get(u)); sonuc["video_adresi"] = u; break
        except Exception as e: hatalar.append(str(e)[:160])
    else:
        return {**sonuc, "hata": "video indirilemedi", "denenen": hatalar}
    ses_cikar(mp4, wav)
    tum = [norm_kelimeler(x["de"]) for x in de]
    # ASR'ler bütün kayıtta; ölçüm seçili turların kelimelerine göre
    wk = whisper_kelimeler(wav)
    lp, kare = w2v_emisyon(wav)
    z1 = whisper_tur_zamanlari(wk, tum)
    z2 = w2v_hizala(lp, kare, tum)
    # seçili turların süresi içindeki ASR kelimeleri
    def aralikta(t0, t1): return [x["w"] for x in wk if x["t0"] >= t0 - 0.2 and x["t1"] <= t1 + 0.2]
    tur_z = []
    dislanan = []
    for n in secili:
        a, b = z1[n - 1], z2[n - 1]
        if not a or not b: dislanan.append({"tur": n, "neden": "hizalanamadı"}); tur_z.append(None); continue
        sapma = max(abs(a[0] - b[0]), abs(a[1] - b[1])) * 1000
        if sapma > SAPMA_MS: dislanan.append({"tur": n, "neden": f"iki ASR zaman sapması {sapma:.0f} ms"})
        tur_z.append({"tur": n, "t0": round(b[0], 3), "t1": round(b[1], 3), "sapma_ms": round(sapma)})
    gecerli = [z for z in tur_z if z]
    if not gecerli: return {**sonuc, "hata": "hiçbir tur hizalanamadı", "dislanan": dislanan}
    # ölçüm yalnızca seçili turların aralıklarında (çıkarılan turların sesi ölçüme girmez)
    import torch
    _, proc, _m = w2v()
    h1, h2k = [], []
    for z in gecerli:
        h1 += aralikta(z["t0"], z["t1"])
        h2k += norm_kelimeler(proc.decode(torch.argmax(lp[max(0, int((z["t0"] - 0.1) / kare)): int((z["t1"] + 0.1) / kare) + 1], dim=-1)))
    o = olc([tum[z["tur"] - 1] for z in gecerli], h1, h2k)
    hizasiz = sum(1 for d in dislanan if d["neden"] == "hizalanamadı") / max(1, len(secili))
    et = etiket(o, hizasiz)
    # kesit: haric turlar varsa parçalar birleştirilir
    parca = []
    for n, z in zip(secili, tur_z):
        if not z: continue
        if parca and n == parca[-1]["son"] + 1: parca[-1].update(son=n, t1=z["t1"])
        else: parca.append({"bas": n, "son": n, "t0": z["t0"], "t1": z["t1"]})
    pay = 0.25
    dosyalar, kayma, cumleler, gecen = [], 0.0, [], 0.0
    for i, pc in enumerate(parca):
        a, b = max(0.0, pc["t0"] - pay), pc["t1"] + pay
        f = os.path.join(out, f"{ad}.p{i}.mp4")
        ffmpeg("-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", mp4, "-vf", "scale='min(640,iw)':-2", "-c:v", "libx264", "-preset", "veryfast",
               "-crf", "28", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", f)
        dosyalar.append(f)
        for n, z in zip(secili, tur_z):
            if z and pc["bas"] <= n <= pc["son"] and not any(d["tur"] == n for d in dislanan):
                cumleler.append({"id": f"t{n}", "tur": n, "speaker": de[n - 1]["speaker"], "de": de[n - 1]["de"],
                                 "t0": round(gecen + z["t0"] - a, 3), "t1": round(gecen + z["t1"] - a, 3)})
        gecen += b - a
    son_mp4 = os.path.join(out, f"{ad}.mp4")
    if len(dosyalar) == 1: os.replace(dosyalar[0], son_mp4)
    else:
        lst = os.path.join(out, f"{ad}.txt"); open(lst, "w").write("".join(f"file '{os.path.basename(x)}'\n" for x in dosyalar))
        ffmpeg("-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", "-movflags", "+faststart", son_mp4)
    poster = os.path.join(out, f"{ad}.jpg")
    ffmpeg("-ss", "1", "-i", son_mp4, "-frames:v", "1", "-q:v", "4", poster)
    metin = os.path.join(out, f"{ad}.metin.json")
    json.dump({"klip": ad, "kaynak_klip": k["klip"], "atif": k.get("atif"), "lisans": k.get("lisans"), "sure_sn": round(gecen, 2), "cumleler": cumleler},
              open(metin, "w"), ensure_ascii=False, indent=1)
    for x in (mp4, wav): os.remove(x)
    return {**sonuc, "etiket": et, "olcum": o, "dislanan": dislanan, "sure_sn": round(gecen, 2),
            "kesit_kaynak_sn": [round(max(0.0, parca[0]["t0"] - pay), 3), round(parca[-1]["t1"] + pay, 3)],
            "tur_zamanlari": [{"tur": z["tur"], "sapma_ms": z["sapma_ms"]} for z in tur_z if z],
            "varliklar": {os.path.basename(x): {"sha256": sha(x), "bayt": os.path.getsize(x)} for x in (son_mp4, poster, metin)}}

def kesif(klip: str):
    """Kaynak sayfada video adresini arar (RSS'teki mp4 adresi 404 veriyor): sayfadaki medya bağlantılarını günlüğe yazar"""
    for u in [f"{BASE}vid.php?f={klip}", f"https://www.coerll.utexas.edu/dib/vid.php?f={klip}", f"{BASE}vidt.php?f={klip}"]:
        try:
            h = get(u).decode("utf-8", "replace")
            linkler = sorted(set(re.findall(r"""(?:src|href|data-src|file|url)\s*[=:]\s*["']([^"']+\.(?:mp4|m4v|webm|m3u8|mov)[^"']*)""", h, re.I)))
            gom = sorted(set(re.findall(r"(https?://[^\s\"'<>]*(?:youtube|youtu\.be|vimeo|kaltura|mediaspace|box\.com|archive\.org)[^\s\"'<>]*)", h, re.I)))
            i = max(h.find("jwplayer("), h.find("jw_player"), 0)
            print("KESIF " + json.dumps({"sayfa": u, "boyut": len(h), "medya": linkler[:10], "gomulu": gom[:10], "jw": re.sub(r"\s+", " ", h[i:i + 2500])}, ensure_ascii=False), flush=True)
        except Exception as e:
            print("KESIF " + json.dumps({"sayfa": u, "hata": str(e)[:200]}, ensure_ascii=False), flush=True)

def main():
    out = sys.argv[1] if len(sys.argv) > 1 else "out"
    if os.environ.get("M1_KESIF"):
        for k in os.environ["M1_KESIF"].split(): kesif(k)
        return
    os.makedirs(out, exist_ok=True)
    secim = set(sys.argv[2:])
    rss: dict = {}
    sonuclar = []
    for f in sorted(glob.glob(os.path.join(VIDEO_DIR, "klip-*.json"))):
        if f.endswith(".olcum.json"): continue
        ad = os.path.basename(f)[:-5]
        k = json.load(open(f))
        if secim and ad not in secim: continue
        if k.get("durum") not in ("hazir", "kisa"): print(f"atlandı {ad}: durum {k.get('durum')}"); continue
        try: r = isle(f, out, rss)
        except Exception as e: r = {"klip": ad, "hata": f"{type(e).__name__}: {e}"}
        sonuclar.append(r)
        print("OLCUM " + json.dumps(r, ensure_ascii=False), flush=True)
        # depoya yalnızca sayılar: metin yok
        json.dump(r, open(os.path.join(VIDEO_DIR, f"{ad}.olcum.json"), "w"), ensure_ascii=False, indent=1)
    print(f"bitti: {len(sonuclar)} klip; birebir {sum(1 for r in sonuclar if r.get('etiket') == 'birebir')}; hata {sum(1 for r in sonuclar if r.get('hata'))}")

if __name__ == "__main__":
    main()
