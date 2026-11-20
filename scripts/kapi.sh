#!/usr/bin/env bash
# kapi.sh — Actions'sız sınama kapısı (PM 7046691693 "Actionssız düzen", kesin hâli PM 7047288255; PM-079 md. 4–5).
#
# Ne yapar: ci-v2.yml'in koştuğunu AYNI SIRAYLA koşar (adımlar ci-v2.yml'den okunur; scripts/kapi_adimlar.py):
#   npm ci → tip → birim → içerik kapısı → (raf testleri, anahtar taraması) → derleme + e2e derlemesi + bütçe
#   → Worker paketleme → WebKit uçtan uca (iPhone 15, iPhone 15 Pro Max, iPhone 16 Pro Max) → yerleşim bekçisi.
# Yol süzgeci (PM-079 md. 5) içeride: değişen dosyalara göre
#   docs    (yalnız docs/, kökteki *.md, PR şablonu, ajan tanımları) → tip + içerik kapısı
#   icerik  (yalnız content/, content/tools HARİÇ)       → içerik kapısı + içerik testleri + tek cihaz duman (iPhone 15, v2_core)
#   kod     (web/, worker/, packages/, tests/, scripts/, .github/, content/tools/ ya da başka her şey) → tam
# Kural: kabul koşusunu işi yazan değil KAPI oturumu koşar (temiz worktree; PR'a "[KAPI] <commit> — YEŞİL/KIRMIZI";
#   CLAUDE.md "WebKit kabul ölçütüdür"). Motorlar aynı betiği yerelde öz-denetim için koşabilir; WebKit yoksa sonuç ENGEL olur.
# Chromium'a düşülmez: WebKit açılamıyorsa sonuç "ENGEL"dir, "geçti" değildir.
#
# Kullanım:
#   scripts/kapi.sh [--ref <dal|commit>] [--taban origin/main] [--sinif docs|icerik|kod] [--cihaz "iPhone 15"]... [--out <klasör>]
#     --ref    verilirse o commit için /tmp altında AYRI, temiz bir çalışma ağacı açılır (önerilen; bitince kaldırılır)
#              verilmezse içinde bulunulan ağaç kullanılır; ağaç kirliyse (izlenen dosyada değişiklik) betik durur
#     --taban  değişen dosyalar bu tabana göre bulunur (varsayılan origin/main)
#     --sinif  süzgeci elle zorlar (yalnız daha GENİŞ sınıf seçilebilir: docs < icerik < kod)
#     --cihaz  cihaz listesini daraltır; üç cihazın biri eksikse özet "KISMİ" der ve "bitti" sayılmaz
# Çıktı: <out>/ozet.md (PR'a / [KAPI] yorumuna yapıştırılacak kısa tablo), <out>/ozet.json, <out>/gunluk/NN-*.log
# Çıkış kodu: 0 = hepsi geçti · 1 = en az bir adım düştü · 3 = düşen yok ama ENGEL/KISMİ var · 2 = kullanım hatası
#
# Gizlilik: günlükler /tmp'de kalır; ozet.md'ye yalnız adım adı, süre, sonuç ve düşen testlerin adları girer.
# Betik hiçbir iş akışını tetiklemez, hiçbir yere itmez, hiçbir yere yayın yapmaz.
set -uo pipefail
# Betik koşarken kendi dosyası değişirse bash yarıda bozulur: önce kendini ve yardımcılarını geçici klasöre kopyalayıp oradan koşar.
if [ -z "${KAPI_KOPYA:-}" ]; then
  _k=$(mktemp -d /tmp/kapi-betik-XXXXXX); _d=$(cd "$(dirname "$0")" && pwd)
  cp "$_d/kapi.sh" "$_d/kapi_adimlar.py" "$_d/kapi_sinif.sh" "$_k/" || exit 2
  KAPI_KOPYA="$_k" KAPI_KOK_YOL="$PWD" exec bash "$_k/kapi.sh" "$@"
fi
cd "${KAPI_KOK_YOL:-.}" || exit 2
trap 'rm -rf "$KAPI_KOPYA"' EXIT

TABAN="origin/main"; REF=""; SINIF_ZORLA=""; OUT=""; CIHAZLAR=()
deger() { [ -n "${2:-}" ] && [ "${2#--}" = "$2" ] || { echo "$1 bir değer ister" >&2; exit 2; }; }
while [ $# -gt 0 ]; do
  case "$1" in
    --ref|--taban|--sinif|--cihaz|--out) deger "$1" "${2:-}";;
  esac
  case "$1" in
    --ref) REF="$2"; shift 2;;
    --taban) TABAN="$2"; shift 2;;
    --sinif) SINIF_ZORLA="$2"; shift 2;;
    --cihaz) CIHAZLAR+=("$2"); shift 2;;
    --out) OUT="$2"; shift 2;;
    -h|--help) awk 'NR>1 && /^#/ {sub(/^# ?/,""); print; next} NR>1 {exit}' "$KAPI_KOPYA/kapi.sh"; exit 0;;
    *) echo "bilinmeyen seçenek: $1" >&2; exit 2;;
  esac
done

KOK=$(git rev-parse --show-toplevel 2>/dev/null) || { echo "git deposu içinde çalıştırın" >&2; exit 2; }
BETIK_DIZIN=$(cd "$(dirname "$0")" && pwd)
ACILAN_AGAC=""
if [ -n "$REF" ]; then
  SHA=$(git -C "$KOK" rev-parse --verify "$REF^{commit}") || { echo "ref bulunamadı: $REF" >&2; exit 2; }
  ACILAN_AGAC="/tmp/kapi-agac-${SHA:0:12}-$$"
  git -C "$KOK" worktree add -q --detach "$ACILAN_AGAC" "$SHA" || exit 2
  AGAC="$ACILAN_AGAC"
  trap 'git -C "$KOK" worktree remove --force "$ACILAN_AGAC" >/dev/null 2>&1; rm -rf "$KAPI_KOPYA"' EXIT
else
  AGAC="$KOK"
  if [ -n "$(git -C "$AGAC" status --porcelain --untracked-files=no)" ]; then
    echo "çalışma ağacı kirli (izlenen dosyada commit'lenmemiş değişiklik). Kapı temiz kopyada koşar: --ref kullanın." >&2
    exit 2
  fi
fi
cd "$AGAC" || exit 2
SHA=$(git rev-parse HEAD)
YER=$([ -n "$ACILAN_AGAC" ] && echo "temiz worktree" || echo "yerinde (temiz ağaç)")
BASLA=$(date -u +%s)
OUT=${OUT:-/tmp/kapi/${SHA:0:12}-$(date -u +%Y%m%d-%H%M%S)}
mkdir -p "$OUT/gunluk"
export GITHUB_STEP_SUMMARY="$OUT/gunluk/adim-ozeti.txt"; : > "$GITHUB_STEP_SUMMARY"
export CI=true   # Actions'taki gibi: CI'ya özgü iddialar (ör. v2_foto gerçek fotoğraf) kapıda da koşar

# ---- ci-v2.yml'den adımlar ve cihaz matrisi (tek kaynak; okunamazsa DÜŞTÜ) ----
ADIMLAR="$OUT/gunluk/adimlar.tsv"
ADIM_HATA=""
python3 "$BETIK_DIZIN/kapi_adimlar.py" "$AGAC/.github/workflows/ci-v2.yml" >"$ADIMLAR" 2>"$OUT/gunluk/adimlar.err" || ADIM_HATA=$(tail -n 1 "$OUT/gunluk/adimlar.err")
N_CHECK=$(awk -F'\t' '$1=="check"' "$ADIMLAR" | wc -l); N_WEBKIT=$(awk -F'\t' '$1=="webkit"' "$ADIMLAR" | wc -l)
mapfile -t TUM_CIHAZLAR < <(awk -F'\t' '$1=="cihaz"{print $2}' "$ADIMLAR")
[ -z "$ADIM_HATA" ] && { [ "$N_CHECK" -eq 0 ] || [ "$N_WEBKIT" -eq 0 ] || [ ${#TUM_CIHAZLAR[@]} -eq 0 ]; } && ADIM_HATA="adım listesi boş (check $N_CHECK, webkit $N_WEBKIT, cihaz ${#TUM_CIHAZLAR[@]})"
if [ ${#CIHAZLAR[@]} -eq 0 ]; then CIHAZLAR=("${TUM_CIHAZLAR[@]}")
else
  mapfile -t CIHAZLAR < <(printf '%s\n' "${CIHAZLAR[@]}" | awk '!g[$0]++')
  for c in "${CIHAZLAR[@]}"; do printf '%s\n' "${TUM_CIHAZLAR[@]}" | grep -qxF "$c" || { echo "--cihaz '$c' ci-v2.yml matrisinde yok (${TUM_CIHAZLAR[*]})" >&2; exit 2; }; done
fi

# ---- yol süzgeci ----
if git rev-parse --verify -q "$TABAN" >/dev/null; then
  MB=$(git merge-base HEAD "$TABAN")
  DEGISEN=$(git -c core.quotepath=false diff --no-renames --name-only "$MB" HEAD)
else
  echo "taban bulunamadı ($TABAN); tam koşu" >&2; DEGISEN="__taban_yok__"
fi
SINIF=$(printf '%s\n' "$DEGISEN" | grep -v "^__taban_yok__$" | "$BETIK_DIZIN/kapi_sinif.sh")
derece() { case "$1" in docs) echo 0;; icerik) echo 1;; kod) echo 2;; *) echo -1;; esac; }
if [ -n "$SINIF_ZORLA" ]; then
  [ "$(derece "$SINIF_ZORLA")" -lt 0 ] && { echo "--sinif: docs|icerik|kod" >&2; exit 2; }
  if [ "$(derece "$SINIF_ZORLA")" -lt "$(derece "$SINIF")" ]; then
    echo "--sinif $SINIF_ZORLA, süzgecin bulduğu '$SINIF' sınıfından dar; daraltılamaz" >&2; exit 2
  fi
  SINIF="$SINIF_ZORLA"
fi
[ "$SINIF" = icerik ] && CIHAZLAR=("iPhone 15")

# ---- adım koşucusu ----
N=0; DUSEN=0; ENGEL=0
SATIRLAR=()      # "ad|süre|sonuç|not"
kos() {          # kos <ad> <komut> [cihaz]
  local ad="$1" komut="$2" cihaz="${3:-}" log bas sure sonuc not=""
  N=$((N+1)); log="$OUT/gunluk/$(printf %02d $N)-$(echo "$ad${cihaz:+-$cihaz}" | tr -cs 'A-Za-z0-9' '-' | cut -c1-60).log"
  bas=$(date +%s)
  printf '▶ %s%s\n' "$ad" "${cihaz:+ [$cihaz]}"
  if ( cd "$AGAC" || exit 1
       if [ -n "$cihaz" ]; then export E2E_BROWSER=webkit E2E_DEVICE="$cihaz"; fi
       bash --noprofile --norc -eo pipefail -c "$komut" ) </dev/null >"$log" 2>&1; then
    sonuc="geçti"
  else
    sonuc="DÜŞTÜ"; DUSEN=$((DUSEN+1))
    # düşen testlerin adları (vitest FAIL satırları, Python e2e iddia/hata satırları); en çok 6
    not=$(grep -E '^ *(FAIL|×|✗) |AssertionError|^(HATA|FAIL)[: ]|Error:' "$log" | sed -E 's/\x1b\[[0-9;]*m//g; s/^ +//' | cut -c1-140 | awk '!g[$0]++' | head -6 | paste -sd ';' -)
    [ -z "$not" ] && not=$(tail -n 2 "$log" | sed -E 's/\x1b\[[0-9;]*m//g' | cut -c1-140 | paste -sd ';' -)
  fi
  sure=$(( $(date +%s) - bas ))
  printf '  %s (%ss)\n' "$sonuc" "$sure"
  SATIRLAR+=("$ad${cihaz:+ · $cihaz}|$sure|$sonuc|${not//|/\/}")
}
engel() { N=$((N+1)); ENGEL=$((ENGEL+1)); SATIRLAR+=("$1|0|ENGEL|$2"); printf '▶ %s\n  ENGEL: %s\n' "$1" "$2"; }
atla()  { SATIRLAR+=("$1|0|atlandı|$2"); }

webkit_hazir() {
  python3 - <<'PY' >/dev/null 2>&1
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    p.webkit.launch().close()
PY
}

# ---- koşu ----
kos "npm ci" "npm ci --no-audit --no-fund"
if [ -n "$ADIM_HATA" ]; then N=$((N+1)); DUSEN=$((DUSEN+1)); SATIRLAR+=("ci-v2.yml adımları okunamadı|0|DÜŞTÜ|${ADIM_HATA//|/\/}"); printf '▶ ci-v2.yml adımları\n  DÜŞTÜ: %s\n' "$ADIM_HATA"; fi

if [ "$SINIF" = docs ]; then
  kos "Tip denetimi" "npm run typecheck"
  kos "İçerik kapısı (0 hata)" "npm run content:validate"
  atla "Birim, derleme, WebKit" "yol süzgeci: yalnız docs"
elif [ "$SINIF" = icerik ]; then
  kos "İçerik kapısı (0 hata)" "npm run content:validate"
  kos "İçerik testleri" "npx vitest run content/"
  kos "e2e derlemesi" "DW_E2E_FIXTURES=1 npm run content:build && (cd web && npx vite build --mode e2e --outDir dist-e2e)"
else
  k=0
  while IFS=$'\t' read -r is ad b64; do
    [ "$is" = check ] || continue
    k=$((k+1)); kos "$ad" "$(printf %s "$b64" | base64 -d)"
  done < "$ADIMLAR"
  [ "$k" -eq "$N_CHECK" ] || { N=$((N+1)); DUSEN=$((DUSEN+1)); SATIRLAR+=("check adım sayısı|0|DÜŞTÜ|$k / $N_CHECK koştu"); }
  [ -x scripts/kapi_sinif_test.sh ] && kos "Kapı sınıflandırıcı sınaması" "bash scripts/kapi_sinif_test.sh"
fi

if [ "$SINIF" != docs ]; then
  if ! webkit_hazir; then
    printf '▶ WebKit kurulu değil; tek kurulum denemesi\n'
    timeout 600 python3 -m playwright install webkit >"$OUT/gunluk/webkit-kurulum.log" 2>&1 || true
  fi
  if ! webkit_hazir; then
    engel "WebKit uçtan uca" "WebKit açılamadı (kurulum: gunluk/webkit-kurulum.log). Chromium'a düşülmez."
  elif [ "$SINIF" = icerik ]; then
    kos "Duman: çekirdek akış" "cd tests/e2e && python3 v2_core.py" "iPhone 15"
  else
    WK=$(awk -F'\t' '$1=="webkit"' "$ADIMLAR")
    for c in "${CIHAZLAR[@]}"; do
      # Actions'ta her cihaz ayrı makinede: ortak /tmp yolları her cihazdan önce boşaltılır, sonra kanıt <out>'a kopyalanır
      rm -rf /tmp/shots /tmp/visual; mkdir -p /tmp/shots
      k=0
      while IFS=$'\t' read -r is ad b64; do
        komut=$(printf %s "$b64" | base64 -d)
        komut=${komut//'${{ matrix.device }}'/$c}
        k=$((k+1)); kos "$ad" "$komut" "$c"
      done <<< "$WK"
      [ "$k" -eq "$N_WEBKIT" ] || { N=$((N+1)); DUSEN=$((DUSEN+1)); SATIRLAR+=("webkit adım sayısı · $c|0|DÜŞTÜ|$k / $N_WEBKIT koştu"); }
      # yerleşim bekçisi (PM-079 md. 4): ci-v2.yml'e henüz girmediyse burada ayrıca koşar
      if [ -f tests/e2e/yerlesim_bekcisi.py ] && ! grep -q yerlesim_bekcisi .github/workflows/ci-v2.yml; then
        kos "Yerleşim bekçisi (PM-079 md. 4)" "cd tests/e2e && python3 yerlesim_bekcisi.py" "$c"
      fi
      kanit="$OUT/kanit/$(echo "$c" | tr ' ' '-')"; mkdir -p "$kanit"
      cp -r /tmp/shots "$kanit/" 2>/dev/null || true; cp -r /tmp/visual "$kanit/" 2>/dev/null || true
    done
    [ -f tests/e2e/yerlesim_bekcisi.py ] || atla "Yerleşim bekçisi (PM-079 md. 4)" "depoda henüz yok"
  fi
fi

# ---- özet ----
SURE=$(( $(date -u +%s) - BASLA ))
EKSIK=""
if [ "$SINIF" = kod ] && [ "$(printf '%s\n' "${CIHAZLAR[@]}" | sort)" != "$(printf '%s\n' "${TUM_CIHAZLAR[@]}" | sort -u)" ]; then EKSIK="KISMİ (cihaz listesi matristen dar)"; fi
if [ $DUSEN -gt 0 ]; then SONUC="DÜŞTÜ ($DUSEN adım)"; KOD=1
elif [ $ENGEL -gt 0 ]; then SONUC="ENGEL${EKSIK:+ / $EKSIK}"; KOD=3
elif [ -n "$EKSIK" ]; then SONUC="$EKSIK"; KOD=3
else SONUC="GEÇTİ"; KOD=0; fi
SURUM="node $(node -v 2>/dev/null | tr -d v) · python $(python3 -c 'import platform;print(platform.python_version())') · playwright $(python3 -c 'import importlib.metadata as m;print(m.version("playwright"))' 2>/dev/null || echo yok)"
{
  echo "**Kapı (\`scripts/kapi.sh\`)** · commit \`${SHA:0:12}\` · taban \`$TABAN\` · süzgeç: **$SINIF** · cihaz: $([ "$SINIF" = docs ] && echo "—" || echo "${CIHAZLAR[*]}") · süre $((SURE/60)) dk $((SURE%60)) sn · sonuç: **$SONUC**"
  echo
  echo "<sub>$YER · $SURUM · CI'dan fark: Actions PR'da birleştirme commit'ini, kapı baş commit'i sınar</sub>"
  echo
  echo "| # | adım | süre | sonuç | not |"
  echo "|---|---|---|---|---|"
  i=0
  for s in "${SATIRLAR[@]}"; do
    i=$((i+1)); IFS='|' read -r a d r n <<< "$s"
    echo "| $i | $a | ${d} sn | $r | ${n} |"
  done
} > "$OUT/ozet.md"
python3 - "$OUT/ozet.json" "$SHA" "$TABAN" "$SINIF" "$SURE" "$SONUC" "${SATIRLAR[@]}" <<'PY'
import json, sys
yol, sha, taban, sinif, sure, sonuc, *satir = sys.argv[1:]
adimlar = []
for s in satir:
    a, d, r, n = (s.split("|", 3) + ["", "", "", ""])[:4]
    adimlar.append({"adim": a, "sure_sn": int(d or 0), "sonuc": r, "not": n})
json.dump({"commit": sha, "taban": taban, "sinif": sinif, "sure_sn": int(sure), "sonuc": sonuc, "adimlar": adimlar},
          open(yol, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
PY
echo
cat "$OUT/ozet.md"
echo
echo "özet: $OUT/ozet.md · $OUT/ozet.json · günlükler: $OUT/gunluk/"
exit $KOD
