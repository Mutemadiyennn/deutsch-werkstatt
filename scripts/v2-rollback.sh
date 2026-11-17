#!/bin/sh
# v2'yi belirtilen yayın etiketine geri alır (gh-pages/v2/). Kullanım: scripts/v2-rollback.sh v2-20261117-1
# GitHub CLI varsa iş akışını tetikler; yoksa aynı işlemi yerelde yapar.
set -e
TAG="$1"; [ -n "$TAG" ] || { echo "Kullanım: $0 v2-YYYYMMDD-n"; exit 2; }
if command -v gh >/dev/null 2>&1; then gh workflow run deploy-v2.yml -f rollback_to="$TAG"; echo "Geri alma iş akışı başlatıldı: $TAG"; exit 0; fi
git fetch origin gh-pages --tags
D=$(mktemp -d); git worktree add "$D" origin/gh-pages
cd "$D"; rm -rf v2; git checkout "$TAG" -- v2; git add -A v2
git commit -m "v2 geri alındı → $TAG"; git push origin HEAD:gh-pages
cd - >/dev/null; git worktree remove "$D"
