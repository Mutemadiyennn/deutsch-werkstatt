# Deutsch Werkstatt 2.0 — geliştirici notları

v1 (`app/`) olduğu gibi duruyor ve yayında çalışmaya devam ediyor. v2 yanında geliştiriliyor.

| Klasör | Ne |
|---|---|
| `packages/shared` | Ortak sözleşmeler (zod): içerik, kullanıcı verisi, API, yapay zekâ görevleri |
| `content/v2` | İçerik (alanlar, kelime kaydı, kalıplar, dilbilgisi, senaryolar, seviye tespiti havuzu) |
| `content/tools` | v1'den aktarım, doğrulama (0 hata kapısı), derleme |
| `web` | v2 uygulaması (Preact + TypeScript + Vite, IndexedDB) |
| `worker` | Sunucu katmanı (Cloudflare Worker): anahtarlar yalnızca burada |
| `tests/e2e` | Uçtan uca test (Playwright, Python) |

## Komutlar
```bash
npm ci
npm run check                 # tip denetimi + birim testleri + içerik kapısı
npm run content:import        # v1 içeriğini yeniden aktar (deterministik)
npm run content:build         # içerik paketini web/public/content/ altına derle
npm run build -w web          # üretim derlemesi → web/dist
(cd web && npx vite build --mode e2e --outDir dist-e2e) && python3 tests/e2e/v2_core.py
```

## Sunucuyu (Worker) devreye almak — senin yapman gerekenler
Anahtarları yalnızca sen girersin; depoda ve uygulamada bulunmazlar.
1. Ücretsiz Cloudflare hesabı → `cd worker && npx wrangler login`
2. `npx wrangler kv namespace create QUOTA` → çıkan id'yi `worker/wrangler.toml` içindeki `REPLACE_WITH_KV_NAMESPACE_ID` yerine yaz.
3. `npx wrangler secret put GEMINI_KEY` (Google AI Studio anahtarın)
4. `npx wrangler secret put ALLOWED_UIDS` (Firebase Console → Authentication → Users → kendi kullanıcının UID'si)
5. `npx wrangler deploy` → çıkan adresi (`https://deutsch-werkstatt-api.<hesap>.workers.dev`) web derlemesinde `VITE_API_BASE` olarak ver:
   `VITE_API_BASE=https://… npm run build -w web`
6. Kontrol: uygulamada Profil → "Sunucu bağlantısını kontrol et".

Sunucu ayarlanmadan da uygulama çalışır; yalnızca yapay zekâ ile cevap kontrolü devre dışı kalır (kural tabanlı değerlendirme sürer).
