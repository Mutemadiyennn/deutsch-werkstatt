#!/bin/bash
# İÇ-4 tam sınama: ana çalışma ağacındaki 15.–28. gün dosyalarını sınama ağacına (/home/claude/dw-sina: şema dalı v2/akis-hepsi +
# a1-kesin #198 + sözlük #206 + dikiş #199 + hafta kapısı #203) kopyalar, üç denetimi koşar. Kullanım: sina.sh <hafta 3|4>
H=$1; A=/home/claude/deutsch-werkstatt; B=/home/claude/dw-sina
cp $A/content/v2/m1/gun-1[5-9].json $A/content/v2/m1/gun-2[0-8].json $A/content/v2/m1/hafta-sonu-testi-0[34].json $A/content/v2/m1/gorulmemis-0[34].json $B/content/v2/m1/ 2>/dev/null
cp $A/content/v2/registry/grammar.json $B/content/v2/registry/grammar.json
cd $B
if [ "$H" = 3 ]; then G="15 16 17 18 19 20 21"; else G="22 23 24 25 26 27 28"; fi
echo "== content:validate (8.–14. gün sözcüklerinden gelen 'bilinmeyen' satırları süzülür: doğrulayıcı K(t)'yi tablodan henüz kurmuyor)"
npm run content:validate 2>&1 | grep "HATA" | grep -E "gun-($(echo $G | tr ' ' '|'))\.json" | python3 $(dirname $0)/valfiltre.py
echo "== dikiş"
node --experimental-strip-types content/tools/dikis-kos.ts $(for g in $G; do printf -- "--gun %s " $g; done) 2>&1 | grep -E "^- |^İhlal|^\| (1[5-9]|2[0-8]) "
echo "== hafta kapısı"
node --experimental-strip-types content/tools/hafta-kapisi-kos.ts --hafta $H 2>&1 | sed -n '/Öğretilmeden istenen/,$p'
