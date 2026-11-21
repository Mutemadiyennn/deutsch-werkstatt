#!/bin/sh
# v2'yi belirtilen yayın etiketine geri alır (gh-pages/v2/). Kullanım: scripts/v2-rollback.sh v2-20261117-1
# Varsayılan yerel yol (Actions bu depoda kapalı; PM 7048162182). DW_GERI_AL_ACTIONS=1 ise deploy-v2.yml iş akışını tetikler.
set -e
TAG="$1"; [ -n "$TAG" ] || { echo "Kullanım: $0 v2-YYYYMMDD-n"; exit 2; }
case "$TAG" in v2-[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]-[0-9]*) ;; *) echo "Etiket biçimi v2-YYYYMMDD-n olmalı: $TAG"; exit 2;; esac
if [ "${DW_GERI_AL_ACTIONS:-0}" = 1 ] && command -v gh >/dev/null 2>&1; then gh workflow run deploy-v2.yml -f rollback_to="$TAG"; echo "Geri alma iş akışı başlatıldı: $TAG"; exit 0; fi
git fetch origin +refs/heads/gh-pages:refs/remotes/origin/gh-pages --tags
git rev-parse -q --verify "refs/tags/$TAG" >/dev/null || { echo "Etiket yok: $TAG"; exit 1; }
D=$(mktemp -d); rmdir "$D"; git worktree add -q --detach "$D" origin/gh-pages
trap 'git worktree remove --force "$D" >/dev/null 2>&1 || true' EXIT
cd "$D"; rm -rf v2; git checkout "$TAG" -- v2; git add -A v2
if git diff --cached --quiet; then echo "gh-pages/v2 zaten $TAG ile aynı; değişiklik yok"; exit 0; fi
git commit -q -m "v2 geri alındı → $TAG"; git push -q origin HEAD:gh-pages
echo "geri alındı → $TAG (gh-pages $(git rev-parse --short HEAD)); #12'ye yazın ve \"[KAPI-İSTEK] yayın denetimi\" isteyin"
