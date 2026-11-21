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
#   4. gh-pages/v2/ klasörünü web/dist ile değiştirir, commit'ler, iter. Her yayın v2-YYYYMMDD-n adını alır (phases/07): ad varsayılan
#      olarak gh-pages commit iletisine yazılır, git etiketi atılmaz (PM 7053100321: vekil etiket itmesini reddediyor);
#      --etiketli: ad ayrıca git etiketi olarak atomik itilir (eski yol).
#   5. Sürüm damgasını (dist/sw-assets.json "build") ve gh-pages commit'ini #12'ye yazar, aynı yoruma
#      "[KAPI-İSTEK] yayın denetimi: beklenen sürüm <damga>" ekler (--yorum-yok ile yalnız ekrana basar).
# Geri alma: scripts/v2-rollback.sh v2-YYYYMMDD-n (etiket ya da gh-pages commit iletisindeki ad) | <gh-pages commit>.
#
# Kullanım: scripts/yayin.sh [--commit <sha>] [--kuru] [--yorum-yok] [--etiketli]
# Çıkış: 0 yayın (ya da kuru) · 1 derleme/itme düştü · 2 kullanım/okuma · 3 KAPI YEŞİL yok ya da son karar KIRMIZI · 4 yayın yapıldı, #12 yazılamadı
# Fark (deploy-v2.yml'den): medya indirilemezse iş akışı uyarıp sürerdi, bu betik durur (eksik videolu yayın olmasın).
#   --kuru       derler ve damgayı söyler; gh-pages'e itmez, etiket atmaz, yorum yazmaz
# Gizlilik: Worker adresi derleme paketine girer (web/.env.production) ama günlüğe/yoruma basılmaz.
set -euo pipefail

DEPO="Mutemadiyennn/deutsch-werkstatt"
COMMIT=""; KURU=0; YORUM=1; ETIKET_AT=0
while [ $# -gt 0 ]; do
  case "$1" in
    --commit) [ -n "${2:-}" ] || { echo "--commit bir değer ister" >&2; exit 2; }; COMMIT="$2"; shift 2;;
    --kuru) KURU=1; shift;;
    --yorum-yok) YORUM=0; shift;;
    --etiketli) ETIKET_AT=1; shift;;
    -h|--help) awk 'NR>1 && /^#/ {sub(/^# ?/,""); print; next} NR>1 {exit}' "$0"; exit 0;;
    *) echo "bilinmeyen seçenek: $1" >&2; exit 2;;
  esac
done

KOK=$(git rev-parse --show-toplevel)
git -C "$KOK" fetch -q origin +refs/heads/main:refs/remotes/origin/main +refs/heads/gh-pages:refs/remotes/origin/gh-pages --tags
[ -z "$COMMIT" ] && COMMIT=$(git -C "$KOK" rev-parse origin/main)
COMMIT=$(git -C "$KOK" rev-parse --verify "$COMMIT^{commit}")
git -C "$KOK" merge-base --is-ancestor "$COMMIT" origin/main || { echo "$COMMIT main'de değil; yalnız main yayınlanır" >&2; exit 2; }
[ "$COMMIT" = "$(git -C "$KOK" rev-parse origin/main)" ] || echo "UYARI: $COMMIT main'in başı değil; daha eski bir sürüm yayınlanacak (sürüm düşürme)." >&2
K7=${COMMIT:0:7}

# ---- 2. KAPI YEŞİL ----
# İlk satır "[KAPI] … <commit-öneki> … — YEŞİL" (öneki ≥ 7 hane, tam belirteç olarak commit'in başı; KIRMIZI geçmiyor),
# yazar depo sahibi hesabı (OWNER; açık depoda başkası "[KAPI]" yazabilir). Aynı commit için EN SON karar esastır:
# sonradan KIRMIZI yazılmışsa YEŞİL geçersizdir.
SINCE=$(date -u -d '-7 days' +%Y-%m-%dT%H:%M:%SZ)
YORUMLAR=$(mktemp /tmp/yayin-yorum-XXXXXX.json)
gh api --paginate "repos/$DEPO/issues/comments?since=$SINCE&per_page=100" --jq '.[] | {u: .html_url, t: .created_at, a: .author_association, b: (.body | split("\n")[0])}' > "$YORUMLAR"
KAPI=$(python3 - "$COMMIT" "$YORUMLAR" <<'PY'
import json, re, sys
sha, yol = sys.argv[1], sys.argv[2]
son = None
for satir in open(yol, encoding="utf-8"):
    y = json.loads(satir)
    if y["a"] != "OWNER" or not y["b"].startswith("[KAPI]"): continue
    # sınanan commit ilk satırdaki İLK hex belirteçtir ("[KAPI] <commit> — …"); sonraki belirteçler (taban vb.) sayılmaz
    bel = re.findall(r"(?<![0-9a-f])[0-9a-f]{7,40}(?![0-9a-f])", y["b"])
    if not bel or not sha.startswith(bel[0]): continue
    karar = "KIRMIZI" if "KIRMIZI" in y["b"] else ("YEŞİL" if re.search(r"—\s*YEŞİL", y["b"]) else None)
    if karar and (son is None or y["t"] >= son[0]): son = (y["t"], karar, y["u"])
print(son[2] if son and son[1] == "YEŞİL" else ("KIRMIZI " + son[2] if son else ""))
PY
)
rm -f "$YORUMLAR"
if [ "${KAPI#KIRMIZI }" != "$KAPI" ]; then echo "KAPI son kararı KIRMIZI: ${KAPI#KIRMIZI }. Yayın yapılmadı." >&2; [ "$KURU" = 1 ] || exit 3; KAPI=""; fi
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
m = re.search(r"release download (\S+)", medya["run"])
if not desen or not m: sys.exit("deploy-v2.yml 'M1 medyası' adımından sürüm adı ya da --pattern okunamadı; yayin.sh güncellenmeli")
etiket = m.group(1)
print(json.dumps({"etiket": etiket, "desen": desen, "derle": derle["run"]}))
PY
ADIMLAR=$(python3 -c "$ADIMLAR_PY") || exit 2
ETIKET=$(python3 -c 'import json,sys;print(json.loads(sys.argv[1])["etiket"])' "$ADIMLAR")
mkdir -p .medya
DESEN=$(mktemp /tmp/yayin-desen-XXXXXX); DERLE=$(mktemp /tmp/yayin-derle-XXXXXX); DLOG="$AGAC.derle.log"
python3 -c 'import json,sys;print("\n".join(json.loads(sys.argv[1])["desen"]))' "$ADIMLAR" > "$DESEN"
gh api "repos/$DEPO/releases/tags/$ETIKET" --jq '.assets[] | "\(.id)\t\(.name)"' | while IFS=$'\t' read -r id ad; do
  while IFS= read -r d; do
    # shellcheck disable=SC2053
    if [[ "$ad" == $d ]]; then gh api -H "Accept: application/octet-stream" "repos/$DEPO/releases/assets/$id" > ".medya/$ad"; break; fi
  done < "$DESEN"
done
rm -f "$DESEN"
echo "medya: $(ls .medya | wc -l) dosya ($ETIKET)"
python3 -c 'import json,sys;print(json.loads(sys.argv[1])["derle"])' "$ADIMLAR" > "$DERLE"
bash --noprofile --norc -e "$DERLE" > "$DLOG" 2>&1 || { rm -f "$DERLE"; echo "derleme düştü: $DLOG" >&2; exit 1; }
rm -f "$DERLE"; echo "derleme günlüğü: $DLOG"
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
D=$(date -u +%Y%m%d); N=1; while git rev-parse -q --verify "refs/tags/v2-$D-$N" >/dev/null || git log -1 --basic-regexp --format=%H --grep="^\[v2-$D-$N\]" origin/gh-pages | grep -q .; do N=$((N+1)); done
AD="v2-$D-$N"; MSG="[$AD] v2 yayın: $K7 (damga $DAMGA)"
git commit -q -m "$MSG"
ONCEKI=$(git rev-parse --short=12 HEAD~1)   # geri alma: önceki gh-pages commit'i
if [ "$ETIKET_AT" = 1 ]; then
  ET="$AD"; git tag -a "$ET" -m "$MSG (kaynak $K7)"
  # atomik: dal ve etiket birlikte gider ya da hiçbiri (yetim etiket geri alma ile yayına girmesin)
  if ! git push -q --atomic origin HEAD:gh-pages "$ET"; then git tag -d "$ET" >/dev/null; echo "itme reddedildi (dal + etiket birlikte); yayın yapılmadı" >&2; exit 1; fi
else
  ET="yok (ad commit iletisinde: $AD)"
  if ! git push -q origin HEAD:gh-pages; then echo "itme reddedildi (gh-pages dalı); yayın yapılmadı" >&2; exit 1; fi
fi
GHC=$(git rev-parse --short=12 HEAD); SAAT=$(date -u +%H:%M)
echo "yayınlandı: gh-pages $GHC · etiket $ET · damga $DAMGA · $SAAT UTC"

# ---- 5. #12 ----
GOVDE="[ANA] $SAAT UTC — **v2 yayını** (\`scripts/yayin.sh\`): kaynak main \`$K7\` (KAPI YEŞİL: $KAPI) → gh-pages \`$GHC\`, etiket \`$ET\`, sürüm damgası \`$DAMGA\` (\`/v2/sw-assets.json\` → \`build\`). Geri alma (önceki yayına): \`scripts/v2-rollback.sh $ONCEKI\`.

[KAPI-İSTEK] yayın denetimi: beklenen sürüm $DAMGA (\`/v2/sw-assets.json\` → \`build\`), gh-pages \`$GHC\`, kaynak \`$K7\`"
if [ "$YORUM" = 1 ]; then
  gh api "repos/$DEPO/issues/12/comments" -f body="$GOVDE" --jq .html_url || { echo "YAYIN YAPILDI ama #12 yorumu yazılamadı; aşağıdaki metni elle yazın:" >&2; printf '%s\n' "$GOVDE" >&2; exit 4; }
else printf '%s\n' "$GOVDE"; fi
