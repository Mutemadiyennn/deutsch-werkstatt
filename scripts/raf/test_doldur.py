"""
D-112 (#58 B12) doldurma hattı — ağsız birim testleri (CI `check` işinde): sahte Pixabay, sahte indirme.
python3 scripts/raf/test_doldur.py
"""
import io, json, os, sys, tempfile, time, unittest, urllib.error
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import doldur  # noqa: E402

def jpeg(renk):
    from PIL import Image
    b = io.BytesIO(); Image.new("RGB", (800, 500), renk).save(b, "JPEG"); return b.getvalue()

class Sahte:
    """Pixabay araması ve dosya indirmesi; `kip`: normal | az | 429 | 400"""
    def __init__(self, kip="normal"): self.kip, self.arama, self.indirme = kip, 0, 0
    def __call__(self, url, tekrar=2):
        if self.kip == "indirme403" and "pixabay.com/api/" not in url: raise urllib.error.HTTPError(url, 403, "Forbidden", {}, None)
        if "pixabay.com/api/" in url:
            self.arama += 1
            if self.kip == "400": raise doldur.KaliciHata("400")
            if self.kip == "429": raise urllib.error.HTTPError(url, 429, "Too Many", {}, None)
            n = 1 if self.kip == "az" else 5
            return json.dumps({"hits": [{"pageURL": f"https://pixabay.example/p/{self.arama}-{i}", "webformatURL": f"https://cdn.example/{self.arama}-{i}.jpg", "user": "yazar"} for i in range(n)]}).encode()
        self.indirme += 1
        return jpeg((self.indirme * 37 % 255, 80, 120))

def kur(n=6):
    d = tempfile.mkdtemp()
    a = os.path.join(d, "adaylar.json")
    json.dump({"sorgular": {f"sorgu {i}": {"yerler": [f"lx:k{i}#ornek0"], "adaylar": []} for i in range(n)}}, open(a, "w"))
    return a, os.path.join(d, "raf")

class Doldur(unittest.TestCase):
    def setUp(self):
        os.environ["PIXABAY_API_KEY"] = "sahte"; doldur.bekle = lambda s: None
    def calistir(self, kip, n=6, argv=(), simdi=None):
        s = Sahte(kip); doldur.get = s
        a, raf = kur(n) if not hasattr(self, "yol") else self.yol
        self.yol = (a, raf)
        return doldur.main([a, raf, *argv], simdi=simdi), s, raf

    def test_normal_kapali_ve_sinir(self):
        kod, s, raf = self.calistir("normal", argv=["--sinir", "4"])
        k = json.load(open(os.path.join(raf, "kayit.json")))["sorgular"]
        self.assertEqual(kod, 0); self.assertEqual(s.arama, 4)
        self.assertTrue(all(len(v["adaylar"]) == 3 and all(x["sinif"] == "kapali" and x["lisans"] == "Pixabay Content License" and "url" not in x for x in v["adaylar"]) for v in k.values()))
        self.assertTrue(os.path.exists(os.path.join(raf, "saglik.txt")))
    def test_az_sonuclu_sorgu_30_gun_aranmaz(self):
        kod, s, raf = self.calistir("az", n=3)
        self.assertEqual(kod, 0); self.assertEqual(s.arama, 3)
        _, s2, _ = self.calistir("az", n=3)
        self.assertEqual(s2.arama, 0, "aynı gün yeniden aranmadı")
        _, s3, _ = self.calistir("az", n=3, simdi=time.time() + 31 * 86400)
        self.assertEqual(s3.arama, 3, "30 gün sonra yeniden aranır")
    def test_400_hemen_durur_kirmizi(self):
        kod, s, raf = self.calistir("400")
        self.assertEqual(kod, 1); self.assertEqual(s.arama, 1)
        self.assertTrue(os.path.exists(os.path.join(raf, "kayit.json")))
    def test_art_arda_hata_durur(self):
        kod, s, _ = self.calistir("429", n=20)
        self.assertEqual(kod, 1); self.assertEqual(s.arama, doldur.ART_ARDA_HATA)
    def test_indirmeler_duserse_kilitlenmez_kirmizi(self):
        kod, s, raf = self.calistir("indirme403", n=10)
        self.assertEqual(kod, 1); self.assertEqual(s.arama, doldur.ART_ARDA_HATA)
        k = json.load(open(os.path.join(raf, "kayit.json")))["sorgular"]
        self.assertTrue(all("arandi" not in v for v in k.values()), "indirme düşen sorgu 30 gün kilitlenmedi")
    def test_anahtar_yoksa_atlar(self):
        os.environ.pop("PIXABAY_API_KEY")
        a, raf = kur(2)
        self.assertEqual(doldur.main([a, raf]), 0); self.assertFalse(os.path.exists(raf))

if __name__ == "__main__":
    unittest.main()
