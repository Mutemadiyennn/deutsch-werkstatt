#!/usr/bin/env python3
"""ci-v2.yml'den kapı adımlarını çıkarır (kapi.sh kullanır; PM 7046691693 "Actionssız düzen").

Amaç: kapi.sh, ci-v2.yml'in koştuğunu AYNI SIRAYLA koşsun ve iki liste birbirinden kaymasın.
Tek doğruluk kaynağı ci-v2.yml'dir; bu betik yalnız okur.

Çıktı (stdout, her satır sekmeyle ayrılmış):  <iş>\t<ad>\t<komut>
  iş: "check"  — check işinin `run:` adımları (npm ci hariç; kapi.sh onu kendisi koşar)
      "webkit" — webkit işinin "Playwright + WebKit" kurulumundan SONRAKİ `run:` adımları
      "cihaz"  — webkit matrisindeki cihaz adları (kapi.sh "tam" listesini buradan alır; elle kopya yok)
Okunamazsa ya da beklenen adım/matris yoksa çıkış ≠ 0: kapi.sh bunu DÜŞTÜ sayar (sessizce az adım koşulmaz).
Komutlar tek satıra indirilmez; çok satırlı `run:` olduğu gibi base64 ile verilir (bash çözer).
"""
import base64
import pathlib
import sys

import yaml

YOL = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".github/workflows/ci-v2.yml")
ATLA_CHECK = {"npm ci"}
KURULUM_ADI = "Playwright + WebKit"


def adimlar(is_adi):
    belge = yaml.safe_load(YOL.read_text(encoding="utf-8"))
    for i, a in enumerate(belge["jobs"][is_adi]["steps"]):
        if "run" in a:
            yield i, a.get("name") or a["run"].strip().splitlines()[0], a["run"]


def main():
    for _, ad, komut in adimlar("check"):
        if komut.strip() in ATLA_CHECK:
            continue
        print("check", ad, base64.b64encode(komut.encode()).decode(), sep="\t")
    kurulum_gecti = False
    for _, ad, komut in adimlar("webkit"):
        if ad == KURULUM_ADI:
            kurulum_gecti = True
            continue
        if not kurulum_gecti:
            continue
        print("webkit", ad, base64.b64encode(komut.encode()).decode(), sep="\t")
    if not kurulum_gecti:
        sys.exit(f"ci-v2.yml'de '{KURULUM_ADI}' adımı bulunamadı; kapi_adimlar.py güncellenmeli")
    belge = yaml.safe_load(YOL.read_text(encoding="utf-8"))
    cihazlar = belge["jobs"]["webkit"].get("strategy", {}).get("matrix", {}).get("device", [])
    if not cihazlar:
        sys.exit("ci-v2.yml webkit matrisinde cihaz yok")
    for c in cihazlar:
        print("cihaz", c, "", sep="\t")


if __name__ == "__main__":
    main()
