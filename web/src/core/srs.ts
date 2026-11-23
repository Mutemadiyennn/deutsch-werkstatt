/**
 * Çift yol aralıklı tekrar (PEDAGOGY §1-3, §1-4): her öğenin pasif (tanıma) ve aktif (üretme) FSRS kartı ayrı.
 * - Zamanlama: ts-fsrs (MIT).
 * - Ustalık ("kalıcı", v1 kuralı): aktif yolda iki ayrı oturumda, ≥3 saat arayla doğru üretim.
 * - Anlamını sormak / "bilmiyorum" puan cezası değildir: yalnızca eksik olarak kaydedilir, kart "Again" ile erken döner.
 */
import { fsrs, createEmptyCard, generatorParameters, Rating, State, type Card, type Grade } from "ts-fsrs";
import type { FsrsState, LearnerItem } from "@dw/shared";
import { emptyItem } from "./learner.ts";

const F = fsrs(generatorParameters({ enable_fuzz: false, maximum_interval: 365 }));
export const DURABLE_GAP_MS = 3 * 3600_000;

const toState = (c: Card): FsrsState => ({ due: c.due.toISOString(), stability: c.stability, difficulty: c.difficulty, scheduled_days: c.scheduled_days, reps: c.reps, lapses: c.lapses, learning_steps: c.learning_steps, state: c.state, ...(c.last_review ? { last_review: new Date(c.last_review).toISOString() } : {}) });
const toCard = (s: FsrsState): Card => ({ ...s, due: new Date(s.due), last_review: s.last_review ? new Date(s.last_review) : undefined } as unknown as Card);

export type Outcome = "correct" | "hinted" | "wrong" | "skipped";
const RATING: Record<Outcome, Grade> = { correct: Rating.Good, hinted: Rating.Hard, wrong: Rating.Again, skipped: Rating.Again };

export interface Review {
  itemId: string;
  kind?: LearnerItem["kind"];
  path: "passive" | "active";
  outcome: Outcome;
  /** Oturum kimliği (ör. odak seansı); kalıcılık kuralı için */
  session: string;
  source?: "drill" | "tap" | "convo" | "assess" | "sayit";
  ctx?: string;
}

/** Bir değerlendirmeyi öğeye işler (saf fonksiyon; yeni nesne döner) */
export function review(prev: LearnerItem | undefined, r: Review, now = new Date()): LearnerItem {
  const it: LearnerItem = prev ? structuredClone(prev) : emptyItem(r.itemId, r.kind);
  const st = r.path === "passive" ? it.passive : it.active;
  if (!st.fsrs) it.firstAt = { ...it.firstAt, [r.path]: now.toISOString() };
  const card = st.fsrs ? toCard(st.fsrs) : createEmptyCard(now);
  const next = F.next(card, now, RATING[r.outcome]).card;
  st.fsrs = toState(next);
  st.due = st.fsrs.due;
  st.n++; st.last = now.toISOString();
  const ok = r.outcome === "correct" || r.outcome === "hinted";
  if (ok) { st.ok++; st.s = Math.min(1, st.s + (r.outcome === "correct" ? 0.25 : 0.12)); }
  else {
    st.s = Math.max(0, st.s - 0.15);
    it.gaps.push({ type: r.path, source: r.source || "drill", at: now.toISOString(), ...(r.ctx ? { ctx: r.ctx } : {}) });
    it.inBank = true;
  }
  if (r.path === "active" && r.outcome === "correct") {
    const a = it.active;
    if (!a.sessions.includes(r.session)) a.sessions.push(r.session);
    const times = a.sessions.map((s) => Number(s.split("@")[1] || 0)).filter(Boolean).sort((x, y) => x - y);
    if (times.length >= 2 && times[times.length - 1]! - times[0]! >= DURABLE_GAP_MS) it.durable = true;
  }
  // bankadan çıkış: aktif yolda kalıcı olunca ya da son 2 değerlendirme doğruysa
  if (it.inBank && it.durable) it.inBank = false;
  it.u = now.getTime();
  return it;
}

/**
 * B16 "Biliyorum, sına beni" (PM-066 madde 1, 5): yeni kart üretimle (TR→DE, ipucusuz, isimde artikel) kanıtlanınca
 * tanıma basamağını atlar. Aktif yol bu doğru üretimle başlar; pasif yol yüksek başlangıç kararlılığıyla girer (ilk tanıma
 * tekrarı HIZLI_GUN gün sonra). Kart yine tekrar takvimindedir; ilk tekrarında yanlışsa FSRS normal karta düşürür.
 * Eşik `policy.json` gelene kadar burada.
 */
export const HIZLI_GUN = 7;
export function hizliGecis(prev: LearnerItem | undefined, itemId: string, session: string, now = new Date()): LearnerItem {
  const it = review(prev, { itemId, kind: "lexeme", path: "active", outcome: "correct", session, source: "drill", ctx: "sina" }, now);
  const c = createEmptyCard(now);
  c.state = State.Review; c.stability = HIZLI_GUN; c.difficulty = 4; c.scheduled_days = HIZLI_GUN; c.reps = 1; c.last_review = now;
  c.due = new Date(now.getTime() + HIZLI_GUN * 86400_000);
  const fs = toState(c);
  it.passive = { ...it.passive, s: Math.max(it.passive.s, 0.75), n: it.passive.n + 1, ok: it.passive.ok + 1, last: now.toISOString(), due: fs.due, fsrs: fs };
  it.firstAt = { ...it.firstAt, passive: it.firstAt?.passive ?? now.toISOString() };
  return it;
}

/**
 * "A2'den başla" (PM-114 B md. 4): atlanan günün kartı için tanıma yolunun FSRS durumu — Review, kararlılık `gun`, ilk vade
 * `gun` gün sonra (0: şimdi vadeli). Tekrar sayısı 0: öğrencinin kanıtı yoktur, yalnız "biliniyor" varsayımı.
 */
export function biliniyorFsrs(now: Date, gun: number): FsrsState {
  const c = createEmptyCard(now);
  c.state = State.Review; c.stability = Math.max(1, gun); c.difficulty = 5; c.scheduled_days = gun; c.reps = 0;
  c.due = new Date(now.getTime() + gun * 86400_000);
  return toState(c);
}

/** Oturum kimliği: "<seans id>@<başlangıç ms>" (kalıcılık kuralı ≥3 sa arayı buradan ölçer) */
export const sessionKey = (id: string, startedAt: number) => `${id}@${startedAt}`;

export function isDue(it: LearnerItem, path: "passive" | "active", now = new Date()): boolean {
  const s = path === "passive" ? it.passive : it.active;
  return !!s.fsrs && new Date(s.fsrs.due) <= now;
}
