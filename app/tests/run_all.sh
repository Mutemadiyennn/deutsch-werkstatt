#!/bin/bash
# Tüm test kapısı. Kullanım: bash tests/run_all.sh  → /tmp/dw_tests.log
cd "$(dirname "$0")/.." ; bash tests/srv.sh
F="agent-proxy|connect_rejected|Allowed domains|For details|While this command"
for t in "kurs_e2e.py dark" "kurs_e2e.py light" "session_e2e.py" "robot.py dark" "robot.py light" "safearea.py" "widths.py" "smoke_all.py" "clocktest.py" "voc_test.py" "mic3test.py" "nativetest.py" "arttest.py" "coretest.py" "livefix_test.py"; do
  echo "===== $t"; timeout 900 python3 tests/$t 2>&1 | grep -Ev "$F" | tail -12
done
echo "===== BİTTİ"
