#!/bin/bash
# Kaynağı GitHub deposunun main dalındaki app/ klasörüne eşitler (içerik dahil, sembolik bağlar takip edilir).
set -e
D=/home/claude/wf/app
rm -rf "$D"; mkdir -p "$D"
cp -rL legacy.html build.py sync_repo.sh ARCHITECTURE.md CHANGES_LEGACY.md src tests "$D"/
mkdir -p "$D/content/kurs"
cp -r content/kurs/units content/kurs/plan.json content/kurs/SCHEMA.md content/kurs/AGENT_BRIEF.md content/kurs/REVIEW_BRIEF.md content/kurs/validate.py content/kurs/build_index.py content/kurs/release.txt "$D/content/kurs/"
find "$D" -name '__pycache__' -prune -exec rm -rf {} +
echo "synced → $D"
