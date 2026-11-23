/**
 * Öğrenci modeli (bu fazdaki kapsam): seviye tespiti cevaplarından pasif/aktif güç ve kişisel zayıflık bankası.
 * Pasif (tanıma) ve aktif (üretme) bilgi AYRI tutulur. Anlam sormak ya da "bilmiyorum" demek puan düşürmez;
 * yalnızca eksik olarak kaydedilir.
 * Aralıklı tekrar ve "kalıcı" kuralı (v1: iki ayrı oturumda, ≥3 sa arayla üretim) bir sonraki fazda (öğrenme etkinlikleriyle) eklenecek.
 */
import type { AssessAnswer, LearnerItem } from "@dw/shared";

export function emptyItem(itemId: string, kind: LearnerItem["kind"] = "lexeme"): LearnerItem {
  return { itemId, kind, passive: { s: 0, n: 0, ok: 0 }, active: { s: 0, n: 0, ok: 0, sessions: [] }, durable: false, gaps: [], inBank: false, u: 0 };
}

/** Seviye tespiti maddesinin kimliğinden öğrenme öğesi: as:vp:lx:Termin → lx:Termin */
export function itemIdFromAssess(id: string): string | null {
  const m = /^as:(vp|va):(lx:.+)$/.exec(id);
  return m ? m[2]! : null;
}

/** Tespit cevaplarını öğrenci modeline işler; değişen öğeleri döndürür */
export function applyAssessment(existing: Map<string, LearnerItem>, answers: AssessAnswer[], now = new Date()): LearnerItem[] {
  const changed = new Map<string, LearnerItem>();
  const at = now.toISOString();
  for (const a of answers) {
    const id = itemIdFromAssess(a.itemId);
    if (!id || a.unchecked) continue; // denetlenemeyen cevap boşluk sayılmaz
    const it = changed.get(id) || structuredClone(existing.get(id)) || emptyItem(id);
    const st = a.skill === "vocab_passive" ? it.passive : it.active;
    st.n++; st.last = at;
    if (a.correct) { st.ok++; st.s = Math.min(1, st.s + (a.skill === "vocab_passive" ? 0.4 : 0.3)); }
    else {
      it.gaps.push({ type: a.skill === "vocab_passive" ? "passive" : "active", source: "assess", at });
      it.inBank = true;
    }
    it.u = now.getTime();
    changed.set(id, it);
  }
  return [...changed.values()];
}
