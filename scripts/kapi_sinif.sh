#!/usr/bin/env bash
# kapi_sinif.sh — yol süzgeci sınıflandırıcısı (PM-079 md. 5). kapi.sh ve (Actions dönünce) ci-v2.yml AYNI dosyayı çağırır.
# Girdi: stdin'de satır başına bir değişen dosya yolu. Çıktı: docs | icerik | kod
#   docs   : yalnız docs/**, kökteki *.md, .github/pull_request_template.md, .claude/agents/*.md (ajan tanımları: metin)
#   icerik : yalnız content/** (content/tools/** HARİÇ: doğrulayıcı ve derleme kodu) ve docs sınıfı dosyalar
#   kod    : başka her şey (web/, worker/, packages/, tests/, scripts/, .github/, content/tools/, package*.json …)
# Boş girdi → kod (ör. main'in kendisi: tam koşu).
s=docs; n=0
while IFS= read -r f || [ -n "$f" ]; do
  [ -z "$f" ] && continue
  n=$((n+1))
  case "$f" in
    docs/*|.github/pull_request_template.md|.claude/agents/*.md) ;;
    content/tools/*) echo kod; exit 0;;
    content/*) s=icerik;;
    */*) echo kod; exit 0;;
    *.md) ;;
    *) echo kod; exit 0;;
  esac
done
[ "$n" -eq 0 ] && { echo kod; exit 0; }
echo "$s"
