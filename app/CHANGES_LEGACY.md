# legacy.html üzerinde yapılan doğrudan düzeltmeler (bilinçli, küçük)
- canlı sohbet: kullanıcı cümlesi tamamlanınca liveCheck() çağrısı (src/js/30-livefix.js)
- "ses ses" ifadeleri düzeltildi (Telaffuz analizi düğmesi, Rosetta notu)
- savePhrase: dar ikon düğmesinde "✓ Eklendi" taşıyordu → "✓"
- fixDeep: nesnede artikel varsa "de" alanındaki tekrar eden artikel silinir (artDedup, src/js/50-ai-context.js) → "der der Kaffee" bitti
