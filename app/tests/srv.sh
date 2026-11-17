#!/bin/sh
# Yerel test sunucusu (port 8765). Kök: DW_SITE (varsayılan app/.site; build.py doldurur)
SITE="${DW_SITE:-$(cd "$(dirname "$0")/.." && pwd)/.site}"
curl -s -o /dev/null http://localhost:8765/index.html || (cd "$SITE" && setsid nohup python3 -m http.server 8765 >/tmp/srv.log 2>&1 < /dev/null & sleep 1.5)
