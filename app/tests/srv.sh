#!/bin/sh
curl -s -o /dev/null http://localhost:8765/index.html || (cd /home/claude/werkstatt && setsid nohup python3 -m http.server 8765 >/tmp/srv.log 2>&1 < /dev/null & sleep 1.5)
