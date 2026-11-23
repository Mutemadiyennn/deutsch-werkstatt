# 4. hafta ara kaydı: çalışma ağacı 3. hafta dalında kalırken 4. hafta dalına commit (geçici index)
set -e
cd /home/claude/deutsch-werkstatt
MSG="$1"
B=refs/heads/content/ic4-hafta-04
if git rev-parse -q --verify $B >/dev/null; then BASE=$(git rev-parse $B); PARENTS="-p $BASE"; else BASE=$(git rev-parse HEAD); PARENTS="-p $BASE"; fi
export GIT_INDEX_FILE=$(mktemp -u /tmp/claude-0/-home-claude-deutsch-werkstatt/c32ea372-27f1-575c-a158-6ad066f8dca6/scratchpad/idx.XXXX)
git read-tree $BASE
# 3. hafta dalındaki son hâli de al (yığın)
if [ "$BASE" != "$(git rev-parse HEAD)" ] && ! git merge-base --is-ancestor HEAD $BASE; then git read-tree $(git rev-parse HEAD); PARENTS="$PARENTS -p HEAD"; fi
git update-index --add content/v2/m1/gun-2[2-8].json content/v2/m1/hafta-sonu-testi-04.json content/v2/m1/gorulmemis-04.json $(ls docs/v2/reviews/ic4-hafta-04.md docs/v2/reviews/okur/ic4-hafta-04.md docs/v2/qa/orneklem-ic4-hafta-04.md 2>/dev/null)
T=$(git write-tree)
C=$(printf '%s\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_016gishGshuuFcJER7boPnf7\n' "$MSG" | git commit-tree $T $PARENTS)
git update-ref $B $C
rm -f $GIT_INDEX_FILE
git push -q origin $B:$B
echo "hafta-04 $C"
