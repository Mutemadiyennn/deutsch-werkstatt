# Deutsch Werkstatt 2.0 — Faz 2: Mimari ve Geliştirme Planı (Blueprint)

> **Tarih:** 17.11.2026 · **Dayanak:** `PHASE1_AUDIT.md`, ana talimatlar, "Yapılandırılmış öğrenme ve Pomodoro" gereksinimi, v1 devir raporu.
> **Durum:** Taslak; onayını bekliyor. Bu belge onaylanmadan büyük uygulama işine başlanmayacak.
> Bu belge depoya `docs/v2/BLUEPRINT.md` olarak konacak. Kişisel ayrıntı içermez.

## 0. Varsayımlar (Faz 1'de onay bekleyen kararlar)

Kararları henüz vermediğin için plan, önerdiğim seçenekler üzerine kuruldu. Hangisini değiştirirsen ilgili bölümü güncellerim.

| # | Varsayım | Etkilediği bölüm |
|---|---|---|
| K1 | Depo herkese açık kalır; kişisel içerik temizlenir | §5, T05 |
| K2 | Capacitor + TypeScript + Preact + Vite | Bütün plan |
| K5 | Ücretsiz bir Cloudflare hesabı açılır (Worker + KV) | §2, §4, §5 |
| K7 | Ölü manuel sayaç ve eski `db` modu silinir | T15 |
| K8–K10 | Uzun mola 20 dk ve atlanabilir · odak süresi yalnızca aktif çalışmayı sayar · haftalık hedef 5 gün × 100 dk | §10, T13 |
| K12 | Bir senaryoya geçmek için yalnızca temel öğeler şart | §8, T17 |
| K14 | v1'in günlük kullanımı aksatan hataları düzeltilir | T06 |
| Açık | B1 sınav tarihi, VHS kursu, IPA kurulum yöntemi, git geçmişinin temizlenmesi | Plan her iki olasılığa göre de çalışacak şekilde tasarlandı. Sınav tarihi ayarlarda tutulan bir alan olacak. |

**Ek gereksinim:** Bu oturum depoyu yalnızca okuyabiliyor. T01'den önce depoya **yazma izni** gerekiyor.

---

## 1. Son uygulama mimarisi

### 1.1 Bileşenler
```
┌──────────────────────────── iPhone (Capacitor kabuğu, ios/) ────────────────────────────┐
│  WKWebView ─► https://<site>/  (v2)            /legacy/ (v1, Arşiv'den)                │
│  Yerel eklentiler: mikrofon, konuşma tanıma (yedek), ses kaydı (yedek), titreşim,      │
│  bildirim, ekranın kararmasını engelleme, arka planda ses                               │
└───────────────────────────────────────┬─────────────────────────────────────────────────┘
                                        │
┌────────────────────────────── Web uygulaması v2 (web/) ─────────────────────────────────┐
│ ui/        Preact bileşenleri, tema, safe area, ortak hata deseni                       │
│ features/  vocab · chunks · build · drills · dialogue · roleplay · listening · shadow   │
│            focus · progress · bank · assess · settings · archive                        │
│ core/      learner · srs · stages · gaps · focus · planner · grading  (DOM'a bağımlı    │
│            değil; birim testli)                                                         │
│ content/   yükleyici, sürüm denetimi, önbellek                                          │
│ data/      Dexie (IndexedDB) depoları · eşitleme kuyruğu · Firestore eşitlemesi ·       │
│            v1 verisinden geçiş                                                          │
│ services/  api (Worker istemcisi) · live · tts · stt · audio · photos · auth            │
└──────────────┬──────────────────────────────────────────────┬───────────────────────────┘
               │ HTTPS + Firebase ID token                    │ Firestore SDK (kurallarla)
┌──────────────▼──────────── Cloudflare Worker (worker/) ┐   ┌▼───────── Firebase ────────┐
│ auth: JWT doğrulama + uid izin listesi                 │   │ Auth (e-posta/şifre, Google)│
│ /ai  görev kaydı + sunucudaki prompt şablonları        │   │ Firestore users/{uid}/…     │
│ /live/token  /tts  /photos  /health                    │   └─────────────────────────────┘
│ KV: kota sayaçları, fotoğraf önbelleği                 │
│ Gizli değişkenler: GEMINI_KEY, PEXELS_KEY, (TTS_KEY)   │
└──────┬───────────────┬──────────────┬──────────────────┘
       ▼               ▼              ▼
   Gemini API     Gemini Live    Pexels           (Google Cloud TTS: varsayılan KAPALI, §7)

content/ (statik ve sürümlü JSON + ses dosyaları) ── derleme ──► site/content/<sürüm>/
```

### 1.2 Depo yerleşimi (tek depo, npm workspaces)
```
/app/                 v1: olduğu gibi kalır. Derleme çıktısı site/legacy/ altına gider. Kaldırma: Faz 9.
/web/                 v2 istemci (Vite + Preact + TS)
/worker/              Cloudflare Worker (TS, wrangler)
/packages/shared/     Ortak sözleşmeler: JSON Schema'lar, TS tipleri, API tipleri, sabitler
/content/v2/          v2 içerik (JSON) + ses manifestleri + doğrulayıcılar
/ios/                 Capacitor projesi (sürümler sabit, depoda tutulur)
/firebase/            firestore.rules, emülatör testleri
/tests/e2e/           v2 Playwright testleri (v1 testleri app/tests/'te kalır)
/docs/v2/             AUDIT, BLUEPRINT, ajan brief'leri, ADR'ler
/.github/workflows/   ci.yml, deploy-web.yml, deploy-worker.yml, ios-build.yml
```

### 1.3 Temel ilkeler
1. **Yapay zekâ akışı asla bloklamaz.** Bütün öğretim içeriği önceden hazırlanmış ve doğrulanmış durumda. Yapay zekâ yalnızca şunlar için kullanılır: rol oyunu, değerlendirme, geri bildirim, eksik tespiti.
2. **Veri önce cihazda.** IndexedDB tek doğruluk kaynağıdır. Firestore eşitleme ve yedek içindir.
3. **Anahtarlar yalnızca Worker'da.** İstemci kodunda ve depoda anahtar bulunmaz.
4. **Mantık ile arayüz ayrı.** `core/` saf TypeScript'tir, Vitest ile test edilir. Ajanlar dosya sınırlarına göre ayrılır.
5. **Eski uygulama kademeli olarak değiştirilir.** v1 `/legacy/` altında çalışmaya devam eder. Her taşınan özellik için kaldırma listesi onayına sunulur.

---

## 2. Ön yüz ve sunucu sorumlulukları

| Sorumluluk | İstemci (web/) | Worker | Firebase |
|---|---|---|---|
| Arayüz, yönlendirme, tema, safe area | ✔ | | |
| Öğrenci modeli, aralıklı tekrar, aşama geçişi, planlayıcı, odak motoru, cevap değerlendirme (kural tabanlı) | ✔ (`core/`) | | |
| İçerik yükleme ve önbellek | ✔ | | |
| Kullanıcı verisinin saklanması | ✔ IndexedDB | | ✔ Firestore (eşitleme) |
| Kimlik doğrulama | Giriş arayüzü | Token doğrulama + izin listesi | Auth |
| Yapay zekâ çağrıları | Görev adı + değişkenler | Prompt şablonu, model seçimi, zaman bütçesi, JSON doğrulama, hata eşleme | |
| Canlı sesli sohbet | WebSocket + ses akışı | Kısa ömürlü token | |
| Seslendirme | Hazır ses dosyası → cihaz sesi | İsteğe bağlı TTS proxy + kota | |
| Konuşma tanıma | Tarayıcı → yerel eklenti | Yedek `/stt` | |
| Fotoğraf | Gösterim + önbellek | Pexels proxy + KV önbellek | |
| Kota ve maliyet koruması | Gösterim | **Zorunlu sınırlar** | |
| Güvenlik kuralları | | | `firestore.rules` |

**Sunucu katmanı yalnızca Worker'dır.** Kendi veritabanı yoktur; yalnızca KV kullanır.
- Ücretsiz plan sınırları: günde 100.000 istek, istek başına 10 ms CPU, KV'de günde 100.000 okuma ve 1.000 yazma.
- Ücretsiz planda sınır aşılırsa ücret kesilmez, işlem hata verir. "Para kesilmesin" kuralıyla uyumlu.
- Bu yüzden KV'ye yazma yalnızca kota sayaçları ve fotoğraf önbelleği için kullanılır.

---

## 3. Veritabanı şeması

### 3.1 Cihazdaki veritabanı (IndexedDB, Dexie) — `dw2` v1

| Tablo | Anahtar ve indeksler | İçerik |
|---|---|---|
| `meta` | `&key` | `schemaVersion`, `deviceId`, `lastSync`, `migratedFromV1` |
| `profile` | `&id` (`"me"`) | §9 |
| `items` | `&itemId, kind, inBank, activeDue, passiveDue, u` | `LearnerItem` |
| `attempts` | `++id, at, *itemIds, scenarioId` | `Attempt`. 90 gün tutulur, sonra aylık özete dönüşür. |
| `attemptMonths` | `&month` | Aylık özetler |
| `scenarios` | `&scenarioId, stage, u` | `ScenarioProgress` |
| `focusDays` | `&date, u` | `FocusDay` (seanslarıyla birlikte) |
| `convos` | `&id, at, scenarioId, u` | `ConversationLog` |
| `assess` | `&id, at, type` | `Assessment` |
| `outbox` | `++seq, coll, docId` | Eşitleme kuyruğu |
| `contentIndex` | `&version` | Yüklenen içerik paketinin özeti |

Ses dosyaları ve fotoğraflar IndexedDB'de değil, **Cache Storage**'da tutulur.

### 3.2 Kayıt tipleri (`packages/shared/src/user.ts`)
```ts
type ISO = string; type Sec = number;
interface Strength { s: number; last?: ISO; due?: ISO; n: number; ok: number; }
interface LearnerItem {
  itemId: string;                        // "lx:verschieben" | "ch:telefon:termin-verschieben" | "pt:koennten-wir"
  kind: "lexeme" | "chunk" | "pattern";
  passive: Strength;                     // tanıma / anlama
  active: Strength & { sessions: ISO[] };// üretim. "Kalıcı" = ≥2 ayrı oturum, ≥3 sa arayla (v1 kuralı)
  durable: boolean;                      // aktif kalıcılık
  gaps: { type: "passive"|"active"|"structure"; source: "drill"|"tap"|"convo"|"assess"; at: ISO; ctx?: string }[];
  inBank: boolean;                       // kişisel kelime bankasında mı
  recentSentences: string[];             // son 3 cümle id'si (v1 çeşitlilik kuralı)
  lastPhoto?: string;                    // aynı fotoğraf art arda gösterilmez (v1)
  u: number;                             // değişiklik zamanı (eşitleme için)
}
interface Attempt { id?: number; at: ISO; itemIds: string[]; scenarioId?: string;
  kind: "recognize"|"produce"|"gap"|"order"|"translate_tr_de"|"translate_de_tr"|"transform"|"dialogue_turn"|"listen_q"|"shadow";
  stage: 1|2|3|4|5|6; correct: boolean; hint: 0|1|2|3; latencyMs?: number; askedMeaning?: boolean; }
interface ScenarioProgress { scenarioId: string; stage: 1|2|3|4|5|6; support: 0|1|2|3;
  prepDone: string[]; runs: { at: ISO; stage: number; support: number; score: number; convoId?: string }[];
  completedIndependentAt?: ISO; u: number; }
interface FocusSegment { activity: Activity; refId?: string; sec: Sec; }
type Activity = "vocab"|"chunks"|"build"|"drills"|"listening"|"pronunciation"|"dialogue"|"roleplay"|"review"|"assess"|"other";
interface FocusSession { id: string; n: number; plannedActivity: Activity; startedAt: ISO; endedAt?: ISO;
  focusSec: Sec; breakSecAfter: Sec; status: "running"|"completed"|"interrupted"|"abandoned";
  interruptions: number; segments: FocusSegment[]; }
interface FocusDay { date: string; goalMin: number; focusSec: Sec; breakSec: Sec; longBreakSec: Sec;
  sessions: FocusSession[]; legacy?: boolean; u: number; }
interface ConversationLog { id: string; at: ISO; scenarioId?: string; mode: "guided"|"independent"|"free";
  durationSec: Sec; turns: number; transcript?: { r: "me"|"ai"; de: string }[];   // ham ses tutulmaz
  feedbackTr: { strengths: string[]; fixes: { said: string; better: string; why_tr: string }[]; nextFocus: string[] };
  gaps: string[]; englishFallbacks: number; u: number; }
interface Assessment { id: string; at: ISO; type: "placement"|"monthly";
  listening: Record<"slow"|"normal"|"natural"|"fast", number>; speaking: Rubric; building: number;
  vocabPassive: number; vocabActive: number; scenarios: Record<string, number>; notesTr: string; }
interface Rubric { task: number; intelligibility: number; fluency: number; accuracy: number; support: number; }
```

### 3.3 Firestore yerleşimi
```
users/{uid}/profile/me
users/{uid}/items/{shard00..shard49}      { items: { [itemId]: LearnerItem } }   // öğe başına birleştirme
users/{uid}/scenarios/{scenarioId}
users/{uid}/focus/{yyyy-mm}               { days: { [date]: FocusDay } }
users/{uid}/convos/{id}
users/{uid}/assess/{id}
users/{uid}/attempts/{yyyy-mm}            aylık özet (ham denemeler eşitlenmez)
users/{uid}/backup/{v1-yyyymmdd}          v1'den geçiş öncesi alınan yedek (gzip)
```

**Eşitleme kuralları**
- Önce `outbox` gönderilir, sonra değişen belgeler alınır.
- Çakışmada **öğe düzeyinde** "son yazan kazanır" geçerlidir (`u` alanına göre). Belgenin tamamı ezilmez.
- Odak seansları `id`'ye göre birleştirilir. Seans id'si cihaz önekiyle üretildiği için iki cihazın kaydı çakışmaz.
- Kayıt büyüklüğü tahmini: yaklaşık 5.000 öğe × ~200 B ≈ 1 MB, 50 parçaya bölünür (parça başına ~20 KB).

**Kurallar (`firebase/firestore.rules`)**
- Yalnızca `request.auth.uid == uid` olan ve izin listesindeki `uid` okuyup yazabilir.
- Belge boyutu ve alan tipleri sınırlanır.
- Kurallar emülatörde test edilir (T03).

### 3.4 v1'den geçiş (T12)

| v1 | v2 |
|---|---|
| `dw-ku-*` / `kSt().w[key] = {c, last, d}` | `LearnerItem.active` (`durable` korunur), `itemId = legacyKey → lx:*` |
| `kSt().it` (kural tekrarı) | `pt:*` öğeleri |
| `S.state.mins[gün]` | `FocusDay.focusSec`, `legacy: true` |
| `S.state.pomo`, `goalOverride`, `freezes`, `frozen` | Profil ve seri bilgisi |
| `S.mistakes` | Kişisel kelime bankası (`inBank = true`, `gaps.source = "drill"`) |
| `S.words` (eski kartlar) | `lx:*` ya da `custom:*` öğeleri |
| Ünite ilerlemesi (`rec.nd`, `done`, `best`) | `legacyProgress` (isteğe bağlı B1 yolu için) |
| API anahtarları (`dw-gemini` vb.) | **Taşınmaz.** Kullanıcıya bir kez Worker'a girmesi söylenir. Sonra istemciden silinir (onayınla). |

**Geçiş akışı**
1. Önce yedek alınır (yerel dosya + `backup/` belgesi).
2. Taşıma yapılır.
3. Sonuç bir raporla gösterilir ("612 kelime taşındı, 87'si kalıcı …").
4. v1 verisi silinmez; `/legacy/` aynı veriyle çalışmaya devam eder.

---

## 4. API sözleşmeleri (Worker)

Ortak kurallar:
- Taban adres: `https://api.<alan>/v1`.
- Başlık: `Authorization: Bearer <Firebase ID token>`.
- Gövde: JSON.
- Hata biçimi: `{ error: { code, message_tr, retryable } }`.

| Kod | Anlam | İstemcinin davranışı |
|---|---|---|
| `unauthenticated` (401) | Token yok ya da geçersiz | Yeniden giriş |
| `forbidden` (403) | `uid` izin listesinde değil | Kilit ekranı |
| `quota_user` (429) | Senin günlük ya da aylık kotan doldu | "Bugünkü yapay zekâ hakkın doldu"; çevrimdışı alternatif |
| `quota_upstream` (429) | Google'ın ücretsiz katman sınırı | Aynı mesaj + tahmini bekleme süresi |
| `upstream_busy` (503) | Google sunucusu yoğun ("senin sınırın değil") | Tekrar dene |
| `timeout` (504) | Toplam bütçe aşıldı | Tekrar dene / alternatif |
| `bad_output` (502) | Model geçersiz JSON döndürdü (bir kez yeniden denendikten sonra) | Tekrar dene |
| `invalid_request` (400) | Şema hatası | Hata kaydı |

### 4.1 Uçlar
```
GET  /v1/health                                  → { version, time }

POST /v1/ai/run
  in : { task: AiTask, vars: object, tier?: "quick"|"default", idempotencyKey?: string }
  out: { task, output: <görevin çıktı şeması>, model, ms }
  Zaman bütçesi: toplam ≤ 45 sn (birincil model 30 sn + yedek 15 sn); "quick" ≤ 12 sn

POST /v1/live/token
  in : { scenarioId?: string, mode: "guided"|"independent"|"free", level: string, voice?: string }
  out: { token, expiresAt, model, wsUrl }
  Token tek kullanımlık ve en fazla 30 dk geçerli. Sistem talimatı ve ayarlar token'a kilitlenir;
  istemci bunları değiştiremez.

POST /v1/tts
  in : { text, lang: "de-DE"|"tr-TR", voice?, speed?: "slow"|"normal"|"natural"|"fast" }
  out: audio/ogg (opus)  |  402 { code: "tts_cap" }
  Varsayılan sağlayıcı Gemini TTS (ücretsiz katman). Google Cloud TTS ancak ayarla açılır ve
  sunucuda zorunlu bir aylık sınırı vardır.

GET  /v1/photos?q=<sorgu>&n=8                    → { photos: [{ id, src, w, h, alt, credit }] }   (KV önbelleği 30 gün)

POST /v1/stt                                     → { text, confidence }   (yalnızca yedek; Gemini ses anlama)

GET  /v1/usage                                   → { ai: {day, limit}, tts: {month, limit}, live: {day, limit} }
```

### 4.2 Yapay zekâ görev kaydı (`packages/shared/src/ai-tasks.ts`)
Her görevin sabit bir girdi ve çıktı şeması vardır. Prompt şablonu Worker'da sürümlü olarak durur (`worker/src/prompts/<task>.v1.ts`).

| Görev | Girdi | Çıktı | Kullanıldığı yer |
|---|---|---|---|
| `equiv_check` | `{expected[], answer, itemIds}` | `{ok, reason_tr}` | Cevap kural tabanlı eşleşmezse (v1 `kuAiEquiv`) |
| `write_check` | `{task_tr, text, targets[]}` | `{fixes[], ok, score}` | Yazma ve dönüşüm alıştırmaları |
| `roleplay_turn` | `{scenarioId, stage, support, history[], targets[]}` | `{reply_de, hint?:{starter, keywords[], tr}, correction?}` | Metinle rol oyunu (Live çalışmazsa) |
| `feedback_tr` | `{transcript[], targets[], stage}` | `ConversationLog.feedbackTr + gaps[] + englishFallbacks` | Konuşma sonu raporu |
| `gap_extract` | `{transcript[], knownItemIds[]}` | `{passive[], active[], structures[]}` | Kişisel kelime bankası |
| `explain_tr` | `{de, context}` | `{tr, note_tr, examples[]}` | Konuşma sırasında "bu ne demek?" |
| `pron_feedback` | `{target_de, audioRef}` | `{score, issues_tr[]}` | Shadowing (isteğe bağlı) |

**İstemci kodunda prompt metni bulunmaz.** Ayrıca hiçbir prompt'a kişisel bilgi girmez; yalnızca öğrenme durumu girer: seviye, senaryo, hedef öğeler, eksikler.

---

## 5. Kimlik doğrulama ve güvenlik

### 5.1 Giriş
- **Web:** Firebase Auth, Google ile giriş (açılır pencere).
- **iPhone (WKWebView):** Google ile giriş web görünümünde çalışmıyor. Bu yüzden v1'deki **e-posta + uygulama şifresi** yöntemi korunur. Şifre bir kez web'de belirlenir.
  - Alternatif: yerel Google girişi eklentisi. Kabuğu yeniden derlemeyi gerektirir; şimdilik ertelendi.
- Oturum Firebase'in kalıcı oturum saklamasıyla korunur.
- Worker'a gönderilen ID token istemci tarafından otomatik yenilenir.

### 5.2 Worker'da doğrulama
- JWT, `RS256` ile ve Google'ın açık anahtarlarıyla (`securetoken@system.gserviceaccount.com` JWK) doğrulanır. Anahtarlar önbelleğe alınır.
- Kontrol edilenler: `iss = https://securetoken.google.com/<projectId>`, `aud = <projectId>`, `exp`, `auth_time`.
- `uid`, gizli değişken `ALLOWED_UIDS`'de olmalıdır. E-posta hiçbir yerde tutulmaz.
- Oran sınırları (KV'de, günlük sayaç): yapay zekâ 400 istek/gün, Live 20 token/gün, TTS 2.000 istek/gün. Değerler ayarlanabilir.
- CORS yalnızca uygulamanın kendi adreslerine izin verir (site, `capacitor://localhost`).

### 5.3 Gizli bilgiler
- `GEMINI_KEY`, `PEXELS_KEY`, isteğe bağlı `GCP_TTS_KEY` ve `ALLOWED_UIDS` yalnızca `wrangler secret` olarak durur.
- Bu değerleri sen girersin; ben ya da ajanlar görmeyiz.
- GitHub'da yalnızca dağıtım token'ları bulunur (`CLOUDFLARE_API_TOKEN`), o da şifrelenmiş Actions secret olarak.
- CI'da anahtar taraması (gitleaks) yapılır. Bir anahtar bulunursa derleme başarısız olur.

### 5.4 İstemci güvenliği
- İçerik Güvenliği Politikası (CSP): `script-src 'self'`, `connect-src` yalnızca Worker, Firebase ve Gemini Live WebSocket.
- Preact, metni varsayılan olarak kaçışlar. `dangerouslySetInnerHTML` lint kuralıyla yasaklanır.
- v1'de API anahtarı kalmaması için tek seferlik temizlik yapılır (onayla).

### 5.5 Gizlilik
- Kod, içerik, testler ve prompt'larda kişisel bilgi bulunmaz. CI'da kişisel içerik taraması yapılır; desen listesi depo dışında, Actions secret olarak tutulur.
- Ham ses kaydı saklanmaz. Shadowing kayıtları yalnızca cihazda geçici olarak tutulur.
- **Bilmen gereken bir durum:** Gemini'nin ücretsiz katmanında, gönderilen içerik Google ürünlerini geliştirmek için kullanılabiliyor. Buna canlı sohbetteki sesin ve yazdığın cümleler de dahil. Önlem olarak prompt'lara kişisel bilgi girmez.

---

## 6. Yapay zekâ entegrasyon mimarisi

```
features/* ─► services/api.ai(task, vars) ─► Worker /ai/run
                                              ├─ prompt şablonu (sürümlü) + sistem talimatı (Türkçe geri bildirim kuralları)
                                              ├─ model seçimi: tier → "flash-lite" | "flash" (listeden en yenisi; önbellekli)
                                              ├─ zaman bütçesi + bir kez yedek modele geçiş
                                              ├─ JSON çıktı şeması doğrulaması (geçersizse bir kez yeniden dene)
                                              └─ hata eşleme (§4) + kullanım sayacı
```

- **Önbellek:** `equiv_check` ve `explain_tr` sonuçları istemcide IndexedDB'de saklanır (girdi özetiyle).
- **Çevrimdışı ya da kota dolduğunda:**
  - Rol oyunu → senaryodaki hazır diyalogla çevrimdışı rol (v1 davranışı).
  - Değerlendirme → yalnızca kural tabanlı.
  - Geri bildirim → "sonra raporla" kuyruğu.

### 6.1 Canlı sohbet (Gemini Live)
1. İstemci `/live/token` ister. Worker senaryoya göre sistem talimatını oluşturur:
   - partnerin rolü
   - hedef öğeler
   - konuşma hızı ve beklenmedik soru oranı
   - düzeltme modu
2. Worker bu talimatı token'a kilitler.
3. İstemci WebSocket'e bağlanır ve sesi `AudioWorklet` ile 16 kHz PCM olarak gönderir. v1'deki ses akışı kodu taşınır.

**Düzeltme modu (v1 ile v2 arasındaki gerilimin çözümü)**

| Aşama | Davranış |
|---|---|
| 5 (destekli) | Hata olunca kısa bir düzeltme gösterilir ve cümle tekrar ettirilir. Mevcut düzeltme modülü (`30-livefix`) burada kullanılır. |
| 6 (bağımsız) | **Araya girilmez.** Konuşma bitince transkript `feedback_tr` ve `gap_extract`'a gönderilir. Türkçe rapor gösterilir, eksikler bankaya eklenir. |

**Diğer davranışlar**
- **"Bu ne demek?" düğmesi:** Konuşmayı duraklatır, `explain_tr` çağrılır, eksik pasif olarak kaydedilir (puan düşmez), konuşma kaldığı yerden devam eder.
- **İngilizceye kaçma:** Transkriptte İngilizce cümle tespit edilir ve sayılır. Raporda Türkçe olarak gösterilir.
- **Zorluk artışı:** Senaryodaki `difficulty` değerleri (hız, beklenmedik soru, deyim yoğunluğu) her başarılı tamamlamada bir basamak artar.

---

## 7. Ses ve konuşma mimarisi

### 7.1 Seslendirme (öncelik sırası)
1. **Hazır ses dosyaları:** İçerikteki her cümle ve ifade için önceden üretilir. Dinleme için 4 hız: yavaş, normal, doğal, hızlı. Opus formatında, ~24 kbps.
   - Üretim: Gemini TTS ile, ücretsiz katman günlük kotası içinde, birkaç günde parça parça. Bir manifest tutulur.
   - Saklama: statik site (`site/audio/<hash>.ogg`), cihazda Cache Storage.
   - Lisans ve ses bilgisi manifestte durur.
2. **Cihaz sesi** (`speechSynthesis`, de-DE): hazır ses yoksa ve yapay zekânın canlı ürettiği metinler için.
3. **İsteğe bağlı bulut TTS** (`/v1/tts`): yalnızca sen ayarlardan açarsan. Google Cloud TTS **faturalandırma açmayı gerektiriyor**, bu yüzden varsayılan olarak kapalı. Açılırsa Worker'da zorunlu aylık sınır olur ve Google Cloud bütçe uyarısı kurulması önerilir.

- **Seslendirme filtresi:** v1'deki `00-tts-clean.js` `services/tts/clean.ts` olarak taşınır ve testleri yazılır. Kelimeye bitişik tire hatası düzeltilir.
- **Hız:** Dinleme alıştırmalarında hız düzeyleri hazır dosyalarla sağlanır; `playbackRate` yalnızca ince ayar için kullanılır.

### 7.2 Konuşma tanıma
Sıra: tarayıcı (`webkitSpeechRecognition`, de-DE) → yerel Capacitor eklentisi (iOS'un cihaz üstü tanıması) → `/v1/stt` yedeği. v1'deki üç kademeli yapı aynen taşınır.

### 7.3 Kayıt, shadowing, telaffuz
- `MediaRecorder` ile yalnızca cihazda kayıt.
- Shadowing: oynat → kaydet → karşılaştır (dalga biçimi + tanınan metin) → isteğe bağlı `pron_feedback`.
- Ses yalnızca kullanıcı isterse gönderilir.

### 7.4 iOS ses oturumu
- Arka planda ses, sessiz modda da çalma, ekranın kararmasını engelleme (v1 ayarları korunur).
- Pomodoro zili ve sesli duyurular aynı ses kanalından çalınır.

### 7.5 Bavyera ağzı sesi
- Yalnızca **lisansı uygun gerçek kayıtlar** kullanılır, ya da açıkça "öğretim amaçlı seslendirme · gerçek ağız değil" etiketiyle sunulur.
- Yapay zekâ ile Bairisch ses ya da metin **üretilmez**.

---

## 8. Öğrenme içeriği şeması

### 8.1 Dosya yerleşimi ve sahiplik
```
content/v2/
  domains.json                         13 alan + öncelik sırası                      (sahibi: baş mimar)
  registry/lexemes.json                bütün kelimeler (tekil kayıt)                 (sahibi: baş mimar)
  registry/patterns.json               cümle kalıpları + Türkçe dilbilgisi notları   (sahibi: baş mimar)
  registry/grammar.json                v1'deki 202 `teach` bloğu (taşınmış)          (sahibi: baş mimar)
  domains/<domain>/scenarios/*.json    senaryolar                                    (sahibi: o alanın yazarı)
  domains/<domain>/chunks.json         alana özgü ifadeler                           (sahibi: o alanın yazarı)
  domains/<domain>/proposals.json      yazarın önerdiği yeni kelime ve kalıplar      (sahibi: o alanın yazarı)
  bavarian/sources.json                doğrulanmış Bavyera kaynakları                (sahibi: dilbilimci)
  legacy/units/*.json                  42 v1 ünitesi (değişmeden; B1 yolu)
  audio/manifest.json                  ses dosyaları (hash, hız, ses, lisans)
  schemas/*.schema.json                packages/shared'den üretilir
  tools/validate.py, vocabscan.py      (v1 araçları genişletilir)
```

**Çakışma kuralı:** Yazarlar yalnızca kendi alan klasörüne yazar. Ortak kayıtlara (`registry/`) yalnızca baş mimar yazar. Yeni kelime ve kalıplar `proposals.json` üzerinden gelir, tekrar kontrolünden geçip birleştirilir.

### 8.2 Kimlikler
- Kelime: `lx:<lemma>[#n]` (ör. `lx:verschieben`, `lx:Bank#2`)
- İfade: `ch:<domain>:<slug>`
- Cümle kalıbı: `pt:<slug>`
- Senaryo: `sc:<domain>:<nn>-<slug>`
- Ses: `au:<sha1-12>`

### 8.3 Tipler (`packages/shared/src/content.ts`, JSON Schema'ya dönüştürülür)
```ts
interface Lexeme { id; de; tr; pos: "noun"|"verb"|"adj"|"adv"|"prep"|"phrase"|"other";
  art?: "der"|"die"|"das"; pl?: string;
  verb?: { praesens3: string; praeteritum?: string; perfekt: string; aux: "haben"|"sein"; separable?: string; reflexive?: boolean; case?: ("akk"|"dat")[]; prep?: string[] };
  ipa?: string; audio?: string; img?: string;                     // img: Pexels sorgusu (yalnızca somut kelimeler, v1 kuralı)
  collocations: { de: string; tr: string }[];                     // "einen Termin verschieben"
  patterns: string[];                                             // pt:* kimlikleri
  register: "neutral"|"formal"|"informal";
  related: string[]; mistakes_tr: string[];
  examples: { id: string; de: string; tr: string; img?: string; layer: "hd"|"alltag" }[];  // ≥4 (v1 kuralı)
  freq?: number; level?: "A1"|"A2"|"B1"; legacyKey?: string; }
interface Chunk { id; tr; lexemes: string[]; pattern?: string; register: "neutral"|"formal"|"informal";
  layers: { hd: string; alltag?: string;
            bair?: { text: string; status: "verified"|"uncertain"; source?: string; note_tr?: string } };
  audio?: Partial<Record<"slow"|"normal"|"natural"|"fast", string>>; mistakes_tr?: string[]; }
interface Pattern { id; frame: string; slots: { name: string; type: string }[]; grammar_tr: string;
  examples: { de: string; tr: string }[]; transforms?: { from: string; to: string; rule_tr: string }[]; grammarRef?: string; }
interface Scenario { id; domain; title_tr; title_de; goal_tr; level: "A1"|"A2"|"B1"; order: number;
  essentials: { lexemes: string[]; chunks: string[]; patterns: string[] };    // senaryo kapısı yalnızca bunlara bağlı
  extras: { lexemes: string[]; chunks: string[] };
  otherSide: { id; de; tr; layer: "hd"|"alltag"|"bair"; speed: "normal"|"natural"|"fast" }[];   // karşı tarafın muhtemel sözleri
  responses: { to: string; options: { de: string; tr: string; register: string }[] }[];         // olası cevaplar
  build: { prompt_tr: string; answer_de: string[]; pattern: string }[];                            // aşama 3
  drills: Drill[];                                                                                  // aşama 4
  dialogue: { title_tr; roles: { A: string; B: string };
              lines: { r: "A"|"B"; de: string; tr: string; starter?: string; keywords?: string[]; hint_tr?: string }[] };  // aşama 5, destek düzeyi 3→0
  roleplay: { scene_tr; partner_de; opener_de; targets: string[]; difficulty: { speed: 1|2|3; surprises: 0|1|2|3; idioms: 0|1|2 } }; // aşama 6
  listening: { id; title_tr; script: { r: string; de: string }[]; speeds: Partial<Record<"slow"|"normal"|"natural"|"fast", string>>;
               qs: { q_tr: string; opts: string[]; ans: number }[]; layer: "hd"|"alltag"|"bair" }[];
  speaking: { task_tr; model_de; hints_de: string[] }[];
  mistakes_tr: string[]; review: string[]; source?: { legacyUnit?: string }; }
type Drill = { id; k: "gap"|"order"|"pick"|"translate_tr_de"|"translate_de_tr"|"transform"|"guided_response"|"listen";
  stage: 3|4; items: string[]; /* tipe özgü alanlar v1 SCHEMA.md'den */ };
```

### 8.4 Doğrulama kuralları (`validate.py` v2 + JSON Schema)
1. Şemaya tam uygunluk, kimliklerin tekilliği, bütün referansların çözülmesi.
2. Aşama 3–6'daki her Almanca üretim maddesi yalnızca senaryonun `essentials`/`extras` öğelerini ya da öğrencinin önceki senaryolarda öğrendiği öğeleri kullanır (v1 `vocabscan` kuralının genişletilmiş hali).
3. Somut kelimelerde fotoğraf sorgusu var; soyut kelimelerde örnek cümlenin sahnesi için sorgu var (v1 kuralı).
4. `bair.status = "verified"` ise `source` zorunlu ve `bavarian/sources.json`'da kayıtlı olmalı. `uncertain` olanlar arayüzde "bölgeye göre değişebilir" etiketiyle gösterilir.
5. Türkçe açıklamalar Türkçe olmalı; İngilizce köprü kurulmaz (v2 dil politikası).
6. Her senaryoda: en az 8 karşı taraf sözü, en az 6 dinleme sorusu, en az 4 hazır ses dosyası, 4 destek düzeyinin hepsi.

### 8.5 Mevcut içeriğin taşınması (T23 ve Faz 7)
- 715 kelime ve 2.860 cümle → `registry/lexemes.json` (`legacyKey` ile). Kalıcı ilerleme kaybolmaz.
- 202 `teach` bloğu → `registry/grammar.json`, kalıplara bağlanır.
- 42 rol oyunu ve 416 diyalog satırı → ilgili alanların senaryolarına başlangıç malzemesi.
- Kelime+ (567) → yazarların `proposals.json` dosyalarına aday olarak verilir.

---

## 9. Kullanıcı profili ve kişiselleştirme

```ts
interface Profile {
  id: "me"; schemaVersion: 1;
  ui: { lang: "tr"; theme: "light"|"dark"|"auto"; sfx: boolean; mascot: boolean; celebrations: boolean; textScale: number };
  teaching: { explainLang: "tr"; englishBridge: false; correctionMode: { guided: "immediate"; independent: "after" } };
  focus: { dailyGoalMin: 100; workMin: 25; breakMin: 5; longBreakMin: 20; longBreakOptional: true;
           sessionPlan: [Activity[], Activity[], Activity[], Activity[]];   // varsayılan: §10.1
           weekly: { days: 5; minPerDay: 100 }; countActiveOnly: true };
  domains: { priority: string[]; paused: string[] };   // varsayılan öncelik: telefon, iş, doktor, resmî daire, …
  listening: { startSpeed: "slow"|"normal"; bavarianExposure: 0|1|2 };
  goals: { examB1?: { enabled: boolean; date?: string }; vhs?: { enabled: boolean; days?: number[] } };
  contexts: { car: boolean; gym: boolean; kitchen: boolean };   // v1 seans bağlamları
  placement?: { at: string; summaryTr: string };
  notifications: { dailyReminder?: string };
}
```

**Kişisel ayrıntı içermez.** İsim isteğe bağlıdır ve eşitlenmez; yalnızca cihazda durur.

**Kişiselleştirme kuralları (`core/planner`)**
1. **Senaryo sırası** = alan önceliği × hazır olma durumu (temel öğelerin bilinme oranı) × seviye. "Çorba" olmaması için bir alan içinde senaryolar sırayla ilerler. Aynı anda en fazla 2 alan açık olur.
2. **Seans içeriği:**
   - Önce kişisel bankadan vadesi gelen öğeler (en fazla 8 dk).
   - Sonra o seansın etkinliğine göre güncel senaryonun aşama görevleri.
3. **Dinleme hızı:** İlk dinlemede anlama oranı %60–80 olan hız seçilir. Oran %85'in üstüne çıkarsa bir hız yukarı, %50'nin altına inerse bir hız aşağı geçilir.
4. **Aşama geçişi** (senaryo bazında):

| Geçiş | Koşul |
|---|---|
| 1→2 | Temel kelimelerin pasif gücü ≥ 0,6 |
| 2→3 | Temel ifadelerin %80'i pasif olarak öğrenilmiş ve %50'si aktif olarak denenmiş |
| 3→4 | Cümle kurmada son 10 denemede ≥ %70 |
| 4→5 | Kontrollü alıştırmada ≥ %80, ipucu ortalaması < 1 |
| 5→6 | Destek düzeyi 1 ya da 0'da diyalog tamamlanmış |
| 6 tamam | Bağımsız rol oyunu rubrik ortalaması ≥ 3/5 ve görev tamamlanmış |

   Geriye dönüş: art arda 2 başarısız denemeden sonra bir aşama geri gidilir ve eksik öğeler hedeflenir.
5. **Senaryo kapısı (K12):** Yalnızca `essentials` öğeleri. Eksik temel öğeler en fazla 8–12'lik gruplar halinde öğretilir.

---

## 10. İlerleme takibi

### 10.1 Odak motoru (Pomodoro v2, `core/focus`)
- **Ölçme kuralları v1 `clock()`'tan aynen taşınır:**
  - Süre yalnızca son 2 dakikada dokunma olduysa ya da ses, mikrofon veya canlı sohbet açıksa sayılır.
  - Menü ekranları sayılmaz.
  - Tek sıçrama en fazla 5 sn.
- **Durum makinesi:**
  ```
  idle → focus(running|paused) → break(5) → focus … → [4. seans bitti] → longBreak(20, isteğe bağlı) → bonus
  ```
- **Yarıda kalma:** 5 dakikadan uzun boşluk seansı `interrupted` olarak işaretler (sessizce sıfırlamaz). "Devam et / yeni seans" seçeneği sunulur. Bugün içinde dönülmezse seans `abandoned` olur.
- **Etkinlik bildirimi:** Her ekran `focus.setActivity(activity, refId)` çağırır. Böylece `segments` dökümü oluşur.
- **Varsayılan seans planı** (değiştirilebilir):
  1. Kelime ve ifade (`vocab`, `chunks`)
  2. Cümle kurma, bağlam içinde dilbilgisi, kontrollü alıştırma (`build`, `drills`)
  3. Dinleme, doğal Almanca, telaffuz (`listening`, `pronunciation`)
  4. Destekli ya da bağımsız konuşma ve tekrar (`dialogue`, `roleplay`, `review`)
- **Korunanlar:** mola ekranı, mola önerileri, zil, sesli duyurular, "Molayı atla", moladan sonra kendiliğinden devam, 100 dk kutlaması, seri ve seri dondurucu.

### 10.2 Ölçütler

| Odak (süre ve düzen) | Tanım |
|---|---|
| Günlük odak dakikası | `FocusDay.focusSec / 60` |
| Tamamlanan seans | `status = completed` sayısı |
| Yarıda kalan / bırakılan seans | `interrupted` / `abandoned` sayısı |
| Haftalık düzen | Hedefi tutturulan gün sayısı / 5 |
| Aylık ilerleme | Ay bazında toplam süre, seans ve etkinlik dağılımı |
| Mola süresi | Ayrı tutulur; odak süresine **eklenmez** |

| Dil kazanımı | Tanım |
|---|---|
| Yeni öğrenilen kelime (pasif) | `passive.s ≥ 0,6` ve ≥ 2 doğru tanıma, ≥ 1 gün arayla |
| Aktif kullanılan kelime | `durable` (v1 kuralı) **ya da** diyalog / rol oyununda ipucusuz doğru kullanım |
| Hatırlanan ifade | ≥ 7 gün sonra aktif olarak doğru hatırlama |
| Cümle kurma | Son 14 günde `build` + `transform` başarı oranı |
| Dinleme anlama | Hız düzeyine göre ilk dinlemede doğru oranı (yavaş / normal / doğal / hızlı) |
| Konuşma | Rubrik (görev, anlaşılırlık, akıcılık, doğruluk, destek) + İngilizceye kaçma sayısı |
| Senaryo tamamlama | Bağımsız aşamanın ipucusuz tamamlanması |
| Zayıf öğenin geri kazanılması | Bankadaki bir öğenin ≥ 7 gün sonra doğru hatırlanması |

**Ekranlar**
- **"Bugün":** 100 dk halkası, seans x/4, kalan odak ya da mola süresi, tamamlanan seanslar, önerilen sıradaki etkinlik, şu an öğrenilen öğeler, tekrar edilecek zayıflıklar.
- **"İlerlemem":** İki ayrı panel (Odak / Dil). Süre hiçbir zaman dil seviyesi gibi gösterilmez.
- **Aylık ölçüm:** Seviye tespitiyle aynı görevler; karşılaştırmalı rapor.

---

## 11. iOS uygulama yapısı

```
ios/
  package.json            @capacitor/* sürümleri sabit (package-lock dahil)
  capacitor.config.ts     server.url = canlı site; errorPath = offline.html; appBoundDomains
  www/                    yedek paket: derlenmiş v2 (çevrimdışı ilk açılış için) + offline.html
  ios/App/…               Xcode projesi (depoda; derleme betikle değil kaynaktan)
  scripts/patch-plist.mjs İzinler: mikrofon, konuşma tanıma, (kamera/fotoğraf: ödev fotoğrafı için)
```

- **Eklentiler** (v1'dekiyle aynı set, sabit sürümlerle): keyboard, haptics, status-bar, local-notifications, app, badge, share, speech-recognition, voice-recorder.
- **Ayarlar** (v1'den korunur): yalnızca dikey ekran, ekranın kararmasını engelleme, `AVAudioSession .playback`, arka planda ses, açık renkli açılış ekranı.
- **Güncelleme modeli:** Kabuk canlı siteyi açar; web güncellemeleri anında gelir. Kabuk yalnızca eklenti ya da ayar değişince yeniden derlenir. Service worker çevrimdışı açılışı sağlar.
- **Giriş:** E-posta + uygulama şifresi (§5.1).
- **Derleme:** `ios-build.yml` (macOS runner) imzasız IPA üretir. Kurulum yöntemini öğrenince imzalama adımı eklenir:
  - ücretsiz Apple hesabı + Sideloadly/AltStore (7 günlük imza), ya da
  - ücretli hesap + TestFlight.
- **Kabul ölçütleri:** iPhone'da safe area, mikrofon izni, canlı sohbet, arka planda zil, çevrimdışı açılış, giriş.

---

## 12. Test ve dağıtım stratejisi

### 12.1 Test katmanları

| Katman | Araç | Kapsam |
|---|---|---|
| Birim | Vitest | `core/*` (öğrenci modeli, aralıklı tekrar, aşama geçişi, odak motoru, cevap değerlendirme, seslendirme filtresi), `data/sync`, `data/migrate`, Worker işleyicileri |
| Sözleşme | Vitest + JSON Schema | İçerik dosyaları, yapay zekâ görev çıktıları (kayıtlı örneklerle), API tipleri |
| Kurallar | Firebase emülatörü | `firestore.rules`: başka `uid`, izin listesi dışı hesap, boyut sınırları |
| Worker | `@cloudflare/vitest-pool-workers` | JWT doğrulama (geçerli/süresi dolmuş/yanlış `aud`), kota, hata eşleme, zaman bütçesi |
| Uçtan uca | Playwright (TS, `tests/e2e`) | Pilot senaryonun altı aşaması, 4 seanslı odak günü (sahte saat), v1'den geçiş, çevrimdışı mod, safe area, genişlik taşması |
| v1 gerilemesi | Mevcut Python Playwright testleri | Faz 9'a kadar her sürümde (`/legacy/`) |
| İçerik | `validate.py` v2, `vocabscan` v2 | 0 hata kapısı |
| Manuel | iPhone kontrol listesi | Her kabuk derlemesinde |
| QA | QA ajanı (öğrenci personası) | Büyük sürümlerde |

Yapay zekâ testlerde gerçek API'ye gitmez. Kayıtlı yanıtlar ve v1'deki `mockai.py` deseni kullanılır.

### 12.2 CI ve dağıtım
- **`ci.yml`** (her push ve PR):
  - lint, typecheck, Vitest
  - içerik doğrulama
  - Worker testleri, kural testleri
  - web derlemesi + Playwright
  - v1 test kapısı
  - gitleaks ve kişisel içerik taraması
- **`deploy-web.yml`** (`main`):
  - `site/` = v2 (`/`) + v1 (`/legacy/`) + `content/<sürüm>/` + `audio/`
  - GitHub Pages'e (ya da Cloudflare Pages'e)
  - `/next/` adresinde önizleme kanalı
- **`deploy-worker.yml`** (`worker/**` değişince): `wrangler deploy`. Önce `staging` ortamı, sonra elle onayla `production`.
- **`ios-build.yml`:** elle tetiklenir.
- **Sürüm süreci** (v1 `RELEASE.md` genişletilir): içerik kapısı → CI yeşil → `/next/`'te görsel kontrol (koyu ve açık tema) → QA (büyük sürümlerde) → yayın → sürüm notu.
- **Geri alma:** Önceki derleme `site/` geçmişinde durur; tek komutla geri dönülür. Worker'da `wrangler rollback`.
- **Veri güvenliği:** Geçiş ya da şema değişikliğinden önce otomatik yedek. Şema sürümü `meta.schemaVersion`'da; ileriye dönük geçiş fonksiyonları testli.

---

## 13. Uygulama görev dökümü

**Sorumlu rolleri**
- **BM:** baş mimar (ben). Sözleşmeler, entegrasyon, inceleme, çekirdek mantık.
- **BE:** Backend (Worker) ajanı.
- **FE:** Frontend ajanı.
- **İY:** içerik yazarı ajanı.
- **DB:** bağımsız dilbilimci ajanı.
- **QA:** QA ajanı.

**Karmaşıklık:** S (1–2 oturum), M (3–5), L (6–10).

**Ajan protokolü** (bütün ajanlar için)
- Her ajan kendi `agent/<görev>` dalında, ayrı bir worktree'de çalışır.
- Yalnızca kendisine verilen yollara yazabilir.
- Sözleşme dosyalarını (`packages/shared/**`) değiştiremez; değişiklik gerekirse önerir, BM uygular.
- Teslim raporu: değişen dosyalar, alınan kararlar, test çıktısı, çözülmemiş sorunlar.
- BM birleştirmeden önce inceler ve bütün testleri çalıştırır.

### Dalga 0 — Sözleşmeler (sıralı, yalnızca BM)

**T01 · Tek depo iskeleti ve araç zinciri** — BM · S
- **Amaç:** npm workspaces, TS yapılandırması, ESLint + Prettier, Vitest, CI'ın ilk sürümü.
- **Bağımlılık:** depoya yazma izni; K2.
- **Etkilenen:** `package.json`, `tsconfig.base.json`, `web/`, `worker/`, `packages/shared/` iskeletleri, `.github/workflows/ci.yml`.
- **Kabul:** Temiz kopyada `npm ci && npm run check` yeşil; v1 dosyalarına dokunulmamış.
- **Test:** CI'ın kendisi.

**T02 · Ortak sözleşmeler** — BM · M
- **Amaç:** §3.2, §8.3 ve §4 tiplerini yazmak; bunlardan JSON Schema üretmek; yapay zekâ görev kaydı; bir örnek senaryo (`sc:telefon:01-termin-vereinbaren`).
- **Bağımlılık:** T01.
- **Etkilenen:** `packages/shared/src/{content,user,api,ai-tasks}.ts`, `content/v2/schemas/`, örnek senaryo.
- **Kabul:** Örnek senaryo şemadan 0 hatayla geçiyor; tipler web ve Worker'da derleniyor.
- **Test:** Şema birim testleri (geçerli ve geçersiz örnekler).

**T03 · Firestore kuralları ve emülatör testleri** — BM · S
- **Amaç:** §3.3 kuralları.
- **Bağımlılık:** T02.
- **Etkilenen:** `firebase/firestore.rules`, `firebase/tests/*`.
- **Kabul:** Başka `uid` ve izin listesi dışı hesap reddediliyor; kurallar konsoldakiyle aynı (sen yayınlarsın).
- **Test:** Emülatör testleri CI'da.

### Dalga A — v1'in sabitlenmesi (BM; Dalga B ile paralel yürüyebilir, dosyalar ayrık)

**T04 · v1 derleme ve testlerinin taşınabilir hale getirilmesi** — BM · S
- **Amaç:** Mutlak yollar yerine ortam değişkenleri ve göreli yollar; `voice_test` yardımcısının yeniden yazılması; Python e2e testlerinin CI'a eklenmesi.
- **Bağımlılık:** T01.
- **Etkilenen:** `app/build.py`, `app/tests/*`, `app/content/kurs/*.py`, `ci.yml`.
- **Kabul:** Temiz kopyada 17/17 test yeşil; `build` çıktısı byte byte değişmemiş.
- **Test:** v1 test kapısı.

**T05 · Kişisel içeriğin nötrleştirilmesi** — BM · M
- **Amaç:** §PHASE1 P1 satırları ve testler. Karakter, senaryo ve LIFE_CH id'leri aynı kalır. Önce silinecek ve değişecek satırların listesi **onayına sunulur**.
- **Bağımlılık:** T04, senin onayın.
- **Etkilenen:** `app/legacy.html` (listelenen satırlar), `app/src/js/50-ai-context.js`, `app/tests/qa_regress.py` vb., `CHANGES_LEGACY.md`.
- **Kabul:** Kişisel içerik taraması temiz; 17/17 test yeşil; kayıtlı ilerleme bozulmamış.
- **Test:** v1 test kapısı + tarama.

**T06 · v1'in kritik hataları** — BM · M
- **Amaç:** Hatada aynı ekranda kalıp "Tekrar dene" gösterme (Dersler, Dikte); 503 ile 429 ayrımı; toplam bekleme ≤ 60 sn; kelimeye bitişik tirenin okunmaması.
- **Bağımlılık:** T04.
- **Etkilenen:** yeni `app/src/js/66-errors.js`, gerekirse `CHANGES_LEGACY.md`.
- **Kabul:** Her hata senaryosu testle yeniden üretiliyor ve düzeliyor.
- **Test:** Yeni `errflow_test.py` + v1 test kapısı.

### Dalga B — Platform (paralel; ayrık klasörler)

**T07 · Worker kimlik katmanı ve iskeleti** — **BE** · M
- **Amaç:** JWT doğrulama, `uid` izin listesi, CORS, `/health`, `/usage`, KV kota sayaçları.
- **Bağımlılık:** T02.
- **Etkilenen:** `worker/src/{index,auth,quota,cors}.ts`, `worker/wrangler.toml`, `worker/test/*`.
- **Kabul:** §5.2'deki bütün durumlar testli; istek başına CPU < 10 ms.
- **Test:** vitest-pool-workers ile JWT örnekleri (geçerli, süresi dolmuş, yanlış `aud`, yanlış `iss`, izin listesi dışı).

**T08 · Worker `/ai/run`** — **BE** · M
- **Amaç:** Görev kaydı, sürümlü prompt şablonları, model seçimi, zaman bütçesi, yedek modele geçiş, JSON doğrulama, hata eşleme.
- **Bağımlılık:** T07, T02 (`ai-tasks.ts`).
- **Etkilenen:** `worker/src/ai/*`, `worker/src/prompts/*`.
- **Kabul:** Her görev kayıtlı örneklerle şemaya uygun çıktı veriyor; 429, 503 ve zaman aşımı doğru kodlara eşleniyor.
- **Test:** Sahte Gemini sunucusuyla birim testleri.

**T09 · Worker `/live/token`, `/tts`, `/photos`, `/stt`** — **BE** · M
- **Amaç:** Kilitli sistem talimatıyla kısa ömürlü token; Gemini TTS proxy'si ve kota; Pexels proxy'si ve önbellek; yedek STT.
- **Bağımlılık:** T07.
- **Etkilenen:** `worker/src/{live,tts,photos,stt}.ts`.
- **Kabul:** Token tek kullanımlık ve süresi doğru; kota aşılınca 402/429; önbellek isabeti testli.
- **Test:** Birim testleri ve sahte üst servisler.

**T10 · Web kabuğu** — **FE** · M
- **Amaç:** Vite + Preact + TS; yönlendirme; tema (v1 CSS değişkenlerinden); safe area; Türkçe metin dosyası; ortak `<ErrorPanel retry>` deseni; ana sekmeler ("Bugün / İlerlemem / Daha fazla / Arşiv").
- **Bağımlılık:** T01.
- **Etkilenen:** `web/src/ui/**`, `web/src/app.tsx`, `web/index.html`.
- **Kabul:** iPhone'da safe area testi (59 px) ve genişlik taşma testi yeşil; koyu ve açık tema; CSP etkin.
- **Test:** Playwright: safearea, widths, tema.

**T11 · Veri katmanı ve eşitleme** — BM · L
- **Amaç:** Dexie şeması (§3.1), depolar, `outbox`, Firestore eşitlemesi (öğe düzeyinde birleştirme), yedek dışa ve içe aktarma.
- **Bağımlılık:** T02, T03.
- **Etkilenen:** `web/src/data/**`.
- **Kabul:** İki cihaz simülasyonunda çakışmalar doğru birleşiyor; çevrimdışı → çevrimiçi geçişte veri kaybı yok.
- **Test:** Vitest (`fake-indexeddb`) + emülatör entegrasyon testi.

**T12 · v1'den veri geçişi** — BM · M
- **Amaç:** §3.4.
- **Bağımlılık:** T11.
- **Etkilenen:** `web/src/data/migrate-v1.ts`, örnek veriler (anonim).
- **Kabul:** Örnek v1 durumundan bütün alanlar taşınıyor; yedek alınıyor; rapor doğru; ikinci kez çalıştırıldığında aynı sonucu veriyor.
- **Test:** Birim testleri + uçtan uca geçiş testi.

**T13 · Odak motoru (Pomodoro v2)** — BM · M
- **Amaç:** §10.1; v1 `clock()` kurallarının taşınması.
- **Bağımlılık:** T02.
- **Etkilenen:** `web/src/core/focus/**`.
- **Kabul:** `clocktest.py`'deki her durumun eşdeğeri geçiyor; 4 seans, uzun mola, yarıda kalma ve etkinlik dökümü testli.
- **Test:** Vitest (sahte saat) + Playwright (tam gün senaryosu, hızlandırılmış saat).

**T14 · İstemci servisleri** — BM · M
- **Amaç:** `api`, `live` (WebSocket + AudioWorklet, v1'den taşınır), `tts` (hazır ses → cihaz sesi → isteğe bağlı bulut; `clean.ts`), `stt` (üç kademe), `photos`, `auth` (web + uygulama şifresi).
- **Bağımlılık:** T07–T09 sözleşmeleri (sahte sunucuyla paralel ilerleyebilir), T10.
- **Etkilenen:** `web/src/services/**`.
- **Kabul:** Seslendirme filtresi v1 test durumlarını ve bitişik tire durumunu geçiyor; konuşma tanımada yedeğe geçiş testli.
- **Test:** Vitest + Playwright (sahte medya akışı).

**T15 · Eski uygulama köprüsü ve web yayını** — BM · S
- **Amaç:** `site/legacy/` derlemesi, Arşiv bağlantısı, `deploy-web.yml`, `/next/` önizlemesi; ölü kodun (K7) temizlenmesi (onayla).
- **Bağımlılık:** T04, T10.
- **Etkilenen:** `.github/workflows/deploy-web.yml`, `app/build.py` (çıktı yolu).
- **Kabul:** v1 `/legacy/`'de bütün testleri geçiyor; v2 `/`'de açılıyor.
- **Test:** v1 test kapısı `/legacy/` adresine karşı.

**T16 · iOS projesinin depoya alınması** — BM · M
- **Amaç:** §11; sabit sürümler, yedek paket, izinler, iş akışının güncellenmesi.
- **Bağımlılık:** T10, T14 (`auth`).
- **Etkilenen:** `ios/**`, `.github/workflows/ios-build.yml`.
- **Kabul:** CI'da IPA üretiliyor; iPhone'da kontrol listesi (§11) tamam.
- **Test:** Derleme + manuel kontrol listesi.

### Dalga C — Öğrenme çekirdeği (sıralı, BM)

**T17 · Öğrenci modeli, aralıklı tekrar, aşama geçişleri** — BM · L
- **Amaç:** Pasif ve aktif güç; v1 motorunun kuralları (kalıcılık, son 3 cümleyi tekrarlamama, farklı fotoğraf, yanlış yapılan öğenin 4 madde sonra başka cümleyle dönmesi, kural kardeş maddeleri); §9 aşama geçiş tablosu.
- **Bağımlılık:** T02, T11.
- **Etkilenen:** `web/src/core/{learner,srs,stages,grading}/**`.
- **Kabul:** v1 `vartest` ve `kurs_e2e` davranışlarının eşdeğeri birim testleriyle kanıtlanmış; geçiş eşikleri yapılandırılabilir.
- **Test:** Vitest (yüksek kapsam hedefi: `core/` ≥ %90).

**T18 · Eksik tespiti ve kişisel kelime bankası** — BM · M
- **Amaç:** Alıştırma olayları, "bu ne demek?" dokunuşu (puan düşmez), konuşma sonrası `gap_extract`, bankanın aralıklı tekrara bağlanması.
- **Bağımlılık:** T17, T08.
- **Etkilenen:** `web/src/core/gaps/**`, `web/src/features/bank/**`.
- **Kabul:** Pasif ve aktif eksik ayrı kaydediliyor; anlam sormak hiçbir puanı düşürmüyor.
- **Test:** Vitest + Playwright.

**T19 · "Bugün" planlayıcı** — BM · M
- **Amaç:** Seans planı → etkinlik → senaryo ve öğeler; §9 kuralları.
- **Bağımlılık:** T13, T17.
- **Etkilenen:** `web/src/core/planner/**`, `web/src/features/focus/**`.
- **Kabul:** Bir senaryo dizisi için deterministik plan; seans etkinliği değiştirilebiliyor.
- **Test:** Vitest (anlık görüntü) + Playwright.

**T20 · Seviye tespiti** — BM · M
- **Amaç:** Pratik görevler (4 hızda dinleme, telefon rol oyunu, cümle kurma, pasif ve aktif kelime örneklemi) ve Türkçe rapor.
- **Bağımlılık:** T14, T17, pilot içerik (T23).
- **Etkilenen:** `web/src/features/assess/**`, `content/v2/assess/*.json`.
- **Kabul:** Rapor bütün ölçütleri dolduruyor; aylık ölçüm aynı görevleri kullanıyor.
- **Test:** Playwright.

**T21 · İlerleme ekranları** — **FE** · M
- **Amaç:** §10.2'deki iki panel, aylık görünüm, "Bugün" bilgileri.
- **Bağımlılık:** T13, T17 (veri arayüzleri).
- **Etkilenen:** `web/src/features/progress/**`.
- **Kabul:** Süre ile dil ayrı; boş durum, eski kayıt ve çok veri durumları doğru görünüyor.
- **Test:** Playwright + görsel kontrol.

### Dalga D — Pilot (Telefon + Doktor/Eczane); içerik ile özellikler paralel

**T22a · Özellikler 1: kelime, ifade, cümle kurma, alıştırma** — **FE** · L
- **Amaç:** Aşama 1–4 ekranları. Fotoğraflı ve cümle içinde kelime; v1'deki 6 alıştırma tipi + çeviri ve dönüşüm; v1 cevap değerlendirme kuralları.
- **Bağımlılık:** T10, T17.
- **Etkilenen:** `web/src/features/{vocab,chunks,build,drills}/**`.
- **Kabul:** Örnek senaryoda aşama 1–4 baştan sona; v1 kuralları (çeşitlilik, artikel rengi, sıralama çiplerinde ipucu yok) testli.
- **Test:** Playwright.

**T22b · Özellikler 2: diyalog, rol oyunu, dinleme, shadowing** — BM · L
- **Amaç:** Aşama 5–6; 4 destek düzeyi; Live ve metinle rol oyunu; konuşma sonu raporu; dinleme (4 hız, transkript, tekrar dinleme, sorular); shadowing.
- **Bağımlılık:** T14, T17, T18.
- **Etkilenen:** `web/src/features/{dialogue,roleplay,listening,shadow}/**`.
- **Kabul:** Bağımsız modda araya girilmiyor, rapor Türkçe; "bu ne demek?" konuşmayı kesip devam ettiriyor.
- **Test:** Playwright (sahte Live).

**T23 · Pilot içerik** — **İY** yazar, **DB** inceler · L
- **Amaç:** Telefon ve Doktor/Eczane alanlarında 4'er senaryo; ilgili kelime ve kalıpların `proposals.json`'u; v1 a1-10 / a1-12 malzemesinin taşınması; Alltagsdeutsch katmanı; Bavyera ağzı yalnızca kaynaklı.
- **Bağımlılık:** T02 (şema), §8 brief'leri.
- **Etkilenen:** `content/v2/domains/{telefon,arzt}/**` (yalnızca bunlar).
- **Kabul:** `validate` 0 hata; dilbilimci raporu kapanmış; senaryo başına §8.4-6 asgari koşulları sağlanmış.
- **Test:** İçerik doğrulayıcı + rastgele 30 cümlelik örneklem incelemesi.

**T24 · Pilot ses dosyaları** — BM · S
- **Amaç:** Pilot içeriğin 4 hızda seslerinin Gemini TTS ile, günlük kota içinde parça parça üretilmesi; manifest.
- **Bağımlılık:** T09, T23.
- **Etkilenen:** `content/v2/audio/**`, `tools/gen-audio.ts`.
- **Kabul:** Bütün pilot cümlelerinin sesi var; manifest doğrulanıyor.
- **Test:** Manifest doğrulayıcı.

**T25 · Pilot QA** — **QA** · S
- **Amaç:** Öğrenci personasıyla bir günlük kullanım (4 seans) ve iPhone kontrol listesi.
- **Bağımlılık:** T19–T24.
- **Etkilenen:** yalnızca rapor; bulgular `tests/e2e/regress/*`'e dönüşür (BM yazar).
- **Kabul:** P0/P1 bulgu kalmamış; 1 hafta gerçek kullanım ve senin onayın; teknoloji karar noktası.
- **Test:** Regresyon testleri.

### Dalga E — Sonraki fazlar (pilot onayından sonra ayrıca planlanacak)
- **T26** · 11 alanın içeriği: en fazla 3 İY + 1 DB, dalgalar halinde. **Ayrı onay gerekir.** · XL
- **T27** · Bavyera ağzı kaynak doğrulaması ve lisanslı kayıtlar: DB + BM · L
- **T28** · Taşınan özelliklerin `legacy`'den kaldırılması: liste onayla · L
- **T29** · İsteğe bağlı B1 yolu (42 ünite, sınav tarihine göre): BM · M

### 13.1 Bağımlılık ve paralellik özeti
```
T01 → T02 → T03
        ├──────────────► T04 → T05 (onay) → T06 → T15
        ├─► [BE] T07 → T08 ─┐
        │          └→ T09 ──┤
        ├─► [FE] T10 ───────┼────────────► T16
        ├─► T11 → T12       │
        ├─► T13             ▼
        └──────────────► T14 → T17 → T18 → T19 → T20
                                   ├─► [FE] T21
                                   ├─► [FE] T22a
                                   └─► T22b
        T02 ──► [İY→DB] T23 → T24 ────────────────► [QA] T25
```

### 13.2 Önerilen ajan planı (onayına tabi)

| Dalga | Paralel çalışanlar | Neden paralel yürüyebilir | Yazma sınırları |
|---|---|---|---|
| B | **BE** (T07–T09) ‖ **FE** (T10) ‖ BM (T11–T14) | Sözleşmeler (T02) önceden sabitlenmiş; klasörler ayrık | BE: yalnızca `worker/**`. FE: yalnızca `web/src/ui/**` ve `web/src/app.tsx`. |
| D | **FE** (T21, T22a) ‖ **İY → DB** (T23) ‖ BM (T22b, T24) | Özellikler ile içerik farklı klasörlerde | İY ve DB: yalnızca `content/v2/domains/{telefon,arzt}/**`. FE: `web/src/features/{progress,vocab,chunks,build,drills}/**`. |
| D sonu | **QA** (T25) | Yalnızca okur ve rapor yazar | Yazma yok |

- Aynı anda en fazla 3 ajan çalışır (BM hariç).
- Diğer bütün görevleri BM sırayla yapar; çünkü ya sözleşmelere bağlılar ya da aynı dosyaları paylaşıyorlar.

---

## 14. Riskler (özet; ayrıntı PHASE1 §21)

| Risk | Önlem |
|---|---|
| Gemini ücretsiz katman kotası ya da Preview özelliklerinin (Live token, TTS) değişmesi | Hazır içerik + çevrimdışı yedekler. Ses dosyaları bir kez üretilip saklanır. |
| WKWebView'de ses ve mikrofon | v1'de çalışıyor; pilot (T25) karar noktası |
| Worker KV yazma sınırı (günde 1.000) | Sayaçlar toplu yazılır; fotoğraf önbelleği yalnızca ilk aramada yazılır |
| Veri geçişinde kayıp | Yedek, tekrar çalıştırılabilir geçiş, `/legacy/` aynı veriyle açık kalır |
| İçerik kalitesi | Mevcut kalite hattı + v2 doğrulayıcıları + bağımsız dilbilimci |
| Kapsamın büyümesi | Dalga kapıları, pilot sonrası yeniden planlama |

## 15. Onaydan sonraki ilk adımlar
1. Depoya yazma izni ve K1–K14 kararları (ya da §0'daki varsayımların onayı).
2. Dalga 0 (T01–T03): yalnızca BM, sıralı. Sonunda sözleşmeleri incelemen için sunarım.
3. Dalga A ve B: B için ajan planını (§13.2) yeniden gösterip onayını aldıktan sonra başlarım.
