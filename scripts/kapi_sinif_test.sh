#!/usr/bin/env bash
# kapi_sinif.sh sınaması: bash scripts/kapi_sinif_test.sh  (0 = geçti)
d=$(cd "$(dirname "$0")" && pwd); h=0
t() { local g; g=$(printf '%s' "$1" | "$d/kapi_sinif.sh"); if [ "$g" = "$2" ]; then echo "✓ $2 ← $(echo "$1" | tr '\n' ' ')"; else echo "✗ beklenen $2, çıkan $g ← $(echo "$1" | tr '\n' ' ')"; h=1; fi; }
t "docs/a.md" docs
t $'CLAUDE.md\ndocs/v2/x.png' docs
t "README.md" docs
t ".github/pull_request_template.md" docs
t $'content/v2/a.json\ndocs/b.md' icerik
t $'.github/pull_request_template.md\ncontent/x.json' icerik
t "content/tools/validate.ts" kod
t $'content/v2/a.json\ncontent/tools/x.ts' kod
t "web/src/a.ts" kod
t "tests/e2e/x.py" kod
t "scripts/kapi.sh" kod
t ".github/workflows/ci-v2.yml" kod
t "package.json" kod
t "app/x.html" kod
t ".claude/agents/inceleme.md" docs
t ".claude/settings.json" kod
t "" kod
exit $h
