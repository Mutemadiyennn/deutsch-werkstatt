#!/usr/bin/env bash
# yayin.sh — v2 web yayını, Actions'sız (PM 7048162182; deploy-v2.yml'nin yaptığının aynısı).
#
# Ne yapar:
#   1. Yayınlanacak commit'i belirler: varsayılan origin/main'in başı (--commit ile başka bir main commit'i; main'in atası olmalı).
#   2. KAPI YEŞİL denetimi: depodaki bir issue/PR yorumunda "[KAPI] <commit> … YEŞİL" (ilk satır; en az 7 hane) yoksa DURUR.
#      Atlama seçeneği yoktur (PM: "yalnız KAPI YEŞİL main için").
#   3. Temiz worktree'de deploy-v2.yml'deki adımları koşar (tek kaynak; adımlar oradan okunur):
#        "M1 medyası" adımının --pattern listesi → Releases m1-medya varlıkları REST ile .medya/'ya (GraphQL bu ortamda kapalı)
#        "Derle" adımının run: metni aynen (npm ci, doğrulayıcı + birim, içerik + web derlemesi)
#   4. gh-pages/v2/ klasörünü web/dist ile değiştirir, commit'ler, deploy-v2.yml'deki gibi v2-YYYYMMDD-n etiketi atar, iter.
#   5. Sürüm damgasını (dist/sw-assets.json "build") ve gh-pages commit'ini #12'ye yazar, aynı yoruma
#      "[KAPI-İSTEK] yayın denetimi: beklenen sürüm <damga>" ekler (--yorum-yok ile yalnız ekrana basar).
# Geri alma: scripts/v2-rollback.sh v2-YYYYMMDD-n (Actions kapalıyken yerel yoldan).
#
# Kullanım: scripts/yayin.sh [--commit <sha>] [--kuru] [--yorum-yok]
#   --kuru       derler ve damgayı söyler; gh-pages'e itmez, etiket atmaz, yorum yazmaz
# Gizlilik: Worker adresi derleme paketine girer (web/.env.production) ama günlüğe/yoruma basılmaz.
set -euo pipefail

DEPO="Mutemadiyennn/deutsch-werkstatt"
COMMIT=""; KURU=0; YORUM=1
while [ $# -gt 0 ]; do
  case "$1" in
    --commit) [ -n "${2:-}" ] || { echo "--commit bir değer ister" >&2; exit 2; }; COMMIT="$2"; shift 2;;
    --kuru) KURU=1; shift;;
    --yorum-yok) YORUM=0; shift;;
    -h|--help) awk 'NR>1 && /^#/ {sub(/^# ?/,""); print; next} NR>1 {exit}' "$0"; exit 0;;
    *) echo "bilinmeyen seçenek: $1" >&2; exit 2;;
  esac
done

KOK=$(git rev-parse --show-toplevel)
git -C "$KOK" fetch -q origin +refs/heads/main:refs/remotes/origin/main +refs/heads/gh-pages:refs/remotes/origin/gh-pages --tags
[ -z "$COMMIT" ] && COMMIT=$(git -C "$KOK" rev-parse origin/main)
COMMIT=$(git -C "$KOK" rev-parse --verify "$COMMIT^{commit}")
git -C "$KOK" merge-base --is-ancestor "$COMMIT" origin/main || { echo "$COMMIT main'de değil; yalnız main yayınlanır" >&2; exit 2; }
K7=${COMMIT:0:7}

# ---- 2. KAPI YEŞİL ----
SINCE=$(date -u -d '-7 days' +%Y-%m-%dT%H:%M:%SZ)
KAPI=$(gh api --paginate "repos/$DEPO/issues/comments?since=$SINCE&per_page=100" \
  --jq ".[] | select(.body | startswith(\"[KAPI]\")) | select((.body | split(\"\n\")[0]) | (contains(\"$K7\") and contains(\"YEŞİL\"))) | .html_url" | head -1)
if [ -z "$KAPI" ]; then
  echo "KAPI YEŞİL yok: $K7 için \"[KAPI] $K7 … YEŞİL\" yorumu bulunamadı. Yayın yapılmadı. (#12'ye \"[KAPI-İSTEK] main $K7\" yazın.)" >&2
  [ "$KURU" = 1 ] || exit 3
  echo "(--kuru: denetim yalnız bildirildi)" >&2
fi
echo "KAPI: ${KAPI:-yok}"

# ---- 3. derleme (deploy-v2.yml tek kaynak) ----
AGAC=$(mktemp -d /tmp/yayin-XXXXXX); GHP=""
temizle() { git -C "$KOK" worktree remove --force "$AGAC" >/dev/null 2>&1 || true; [ -n "$GHP" ] && git -C "$KOK" worktree remove --force "$GHP" >/dev/null 2>&1 || true; }
trap temizle EXIT
git -C "$KOK" worktree add -q --detach "$AGAC" "$COMMIT"
cd "$AGAC"
read -r -d '' ADIMLAR_PY <<'PY' || true
import json, re, sys, yaml
y = yaml.safe_load(open(".github/workflows/deploy-v2.yml", encoding="utf-8"))
adim = {a.get("name", ""): a for a in y["jobs"]["publish"]["steps"]}
medya = next((a for n, a in adim.items() if n.startswith("M1 medyası")), None)
derle = adim.get("Derle")
if not medya or not derle: sys.exit("deploy-v2.yml'de 'M1 medyası' ya da 'Derle' adımı yok; yayin.sh güncellenmeli")
desen = re.findall(r"--pattern '([^']+)'", medya["run"])
etiket = re.search(r"release download (\S+)", medya["run"]).group(1)
print(json.dumps({"etiket": etiket, "desen": desen, "derle": derle["run"]}))
PY
ADIMLAR=$(python3 -c "$ADIMLAR_PY")
ETIKET=$(python3 -c 'import json,sys;print(json.loads(sys.argv[1])["etiket"])' "$ADIMLAR")
mkdir -p .medya
python3 -c 'import json,sys;print("\n".join(json.loads(sys.argv[1])["desen"]))' "$ADIMLAR" > /tmp/yayin-desen.$$
gh api "repos/$DEPO/releases/tags/$ETIKET" --jq '.assets[] | "\(.id)\t\(.name)"' | while IFS=$'\t' read -r id ad; do
  while IFS= read -r d; do
    # shellcheck disable=SC2053
    if [[ "$ad" == $d ]]; then gh api -H "Accept: application/octet-stream" "repos/$DEPO/releases/assets/$id" > ".medya/$ad"; break; fi
  done < /tmp/yayin-desen.$$
done
rm -f /tmp/yayin-desen.$$
echo "medya: $(ls .medya | wc -l) dosya ($ETIKET)"
python3 -c 'import json,sys;print(json.loads(sys.argv[1])["derle"])' "$ADIMLAR" > /tmp/yayin-derle.$$
bash --noprofile --norc -eo pipefail /tmp/yayin-derle.$$ > /tmp/yayin-derle.log 2>&1 || { rm -f /tmp/yayin-derle.$$; echo "derleme düştü: /tmp/yayin-derle.log" >&2; exit 1; }
rm -f /tmp/yayin-derle.$$
DAMGA=$(python3 -c 'import json;print(json.load(open("web/dist/sw-assets.json"))["build"])')
echo "derlendi: kaynak $K7 · sürüm damgası $DAMGA"
[ "$KURU" = 1 ] && { echo "(--kuru: itilmedi)"; exit 0; }

# ---- 4. gh-pages/v2/ ----
GHP=$(mktemp -d /tmp/yayin-ghp-XXXXXX); rmdir "$GHP"
git -C "$KOK" worktree add -q --detach "$GHP" origin/gh-pages
cd "$GHP"
rm -rf v2 && mkdir -p v2 && cp -r "$AGAC/web/dist/." v2/
git add -A v2
if git diff --cached --quiet; then echo "Değişiklik yok; yayın gerekmiyor"; exit 0; fi
MSG="v2 yayın: $K7"
git commit -q -m "$MSG"
D=$(date -u +%Y%m%d); N=1; while git rev-parse -q --verify "refs/tags/v2-$D-$N" >/dev/null; do N=$((N+1)); done
git tag -a "v2-$D-$N" -m "$MSG (kaynak $K7)"
git push -q origin HEAD:gh-pages "v2-$D-$N"
GHC=$(git rev-parse --short HEAD); SAAT=$(date -u +%H:%M)
echo "yayınlandı: gh-pages $GHC · etiket v2-$D-$N · damga $DAMGA · $SAAT UTC"

# ---- 5. #12 ----
GOVDE="[ANA] $SAAT UTC — **v2 yayını** (\`scripts/yayin.sh\`): kaynak main \`$K7\` (KAPI YEŞİL: $KAPI) → gh-pages \`$GHC\`, etiket \`v2-$D-$N\`, sürüm damgası \`$DAMGA\` (\`/v2/sw-assets.json\` → \`build\`). Geri alma: \`scripts/v2-rollback.sh v2-$D-$N\` öncesi etikete.

[KAPI-İSTEK] yayın denetimi: beklenen sürüm $DAMGA (\`/v2/sw-assets.json\` → \`build\`), gh-pages \`$GHC\`, kaynak \`$K7\`"
if [ "$YORUM" = 1 ]; then gh api "repos/$DEPO/issues/12/comments" -f body="$GOVDE" --jq .html_url; else printf '%s\n' "$GOVDE"; fi
