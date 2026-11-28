"""[DENETİM-TASARIM] ortak çekim yardımcıları: sahte ses, ekran türü tanıma, sınırlı görüntü alma."""
import json, os

# iPhone'daki gibi 5 Almanca ses; her cümle 600 ms "okunur"
SAHTE_SES = """(() => { let t = null, u0 = null;
  const V = ['Anna', 'Helena', 'Markus', 'Petra', 'Yannick'].map((n) => ({ name: n, lang: 'de-DE', voiceURI: 'com.apple.voice.compact.de-DE.' + n, localService: true, default: false }));
  const ss = { speaking: false, pending: false, paused: false, getVoices: () => V, onvoiceschanged: null,
    addEventListener() {}, removeEventListener() {},
    cancel() { clearTimeout(t); const u = u0; u0 = null; ss.speaking = false; if (u) setTimeout(() => u.onend && u.onend(), 0); },
    pause() {}, resume() {},
    speak(u) { u0 = u; ss.speaking = true; setTimeout(() => u.onstart && u.onstart(), 0); t = setTimeout(() => { u0 = null; ss.speaking = false; u.onend && u.onend(); }, 600); } };
  Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: ss });
  window.SpeechSynthesisUtterance = function (x) { this.text = x; this.rate = 1; this.pitch = 1; this.voice = null; this.lang = 'de-DE'; };
})()"""

# ekran türü: önce bilinen gövde işaretleri (öncelik sırasıyla), sonra kap + data-adim
TUR_JS = """() => {
  const H = location.hash.replace(/^#\\/?/, '').split('/')[0] || 'today';
  const L = ['akis-bitti','halka-sonu','akis-durak-gecis','eslestir','eslestir-yok','resim-sec','akis-sahne','akis-dikte','akis-soyle','akis-tr-de','akis-bosluk','akis-yapboz',
    'akis-tanit','akis-kalip','akis-tablo','akis-hatirlatma','akis-dil-oge','akis-gorev','garden-intro','akis-yer-tutucu','medya-bitti'];
  for (const k of L) if (document.querySelector('[data-test="' + k + '"]')) return H + ':' + k;
  const q = document.querySelector('.akis-soru [data-test^=drill-], .akis-soru [data-test^=gq-]');
  if (q) return H + ':' + q.getAttribute('data-test');
  for (const k of ['medya', 'prova', 'okuma', 'ders', 'sinav', 'hafta-testi']) {
    const e = document.querySelector('[data-test="' + k + '"]');
    if (e) { const a = e.getAttribute('data-adim') || e.getAttribute('data-asama') || ''; const d = e.querySelector('[data-test^=drill-], [data-test^=gq-]');
      return H + ':' + k + ':' + a + (d ? ':' + d.getAttribute('data-test') : ''); }
  }
  return H;
}"""

class Cekici:
    def __init__(self, out, onek=""):
        self.out, self.onek, self.pg = out, onek, None
        os.makedirs(out, exist_ok=True)
        self.say, self.n, self.liste = {}, 0, []

    def cek(self, pg, ad, sinir=99, anahtar=None, tam=False, not_=""):
        anahtar = anahtar or ad
        if self.say.get(anahtar, 0) >= sinir: return None
        self.say[anahtar] = self.say.get(anahtar, 0) + 1
        self.n += 1
        dosya = f"{self.onek}-{self.n:03d}-{ad}".replace(":", "_").replace("/", "-")[:90] + ".png"
        pg.wait_for_timeout(250)
        yol = os.path.join(self.out, dosya)
        if tam:
            h = pg.evaluate("Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)")
            if h > 1.15 * 844:
                pg.screenshot(path=yol, full_page=True, mask=[pg.locator("[data-test=uid]")])
            else: tam = False
        if not tam: pg.screenshot(path=yol, mask=[pg.locator("[data-test=uid]")])
        self.liste.append({"dosya": dosya, "ad": ad, "hash": pg.evaluate("location.hash"), "tam": bool(tam), "not": not_})
        print("   📷", dosya)
        return dosya

    def tur_cek(self, pg, evre="once", sinir=2):
        try: t = pg.evaluate(TUR_JS)
        except Exception: return None
        return self.cek(pg, f"{t}-{evre}", sinir=sinir, anahtar=f"{t}|{evre}")

    def yaz(self):
        json.dump(self.liste, open(os.path.join(self.out, "liste.json"), "w"), ensure_ascii=False, indent=1)
