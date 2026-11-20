/**
 * "Bugün" planlayıcı (bu fazdaki kapsam): sıradaki etkinliğin önerisi.
 * Kural: önce seviye tespiti; sonra Pomodoro seans planındaki etkinlik → öncelikli alandaki ilk uygun senaryo.
 * v2'de henüz ekranı olmayan etkinlikler (alıştırma, dinleme, rol oyunu) için açıkça v1'deki karşılığı önerilir;
 * bu bir yer tutucu değil, çalışan v1 özelliğine yönlendirmedir ve ekranda öyle etiketlenir.
 */
import type { Activity, ContentIndex, Profile } from "@dw/shared";

export const V1_URL = "https://mutemadiyennn.github.io/deutsch-werkstatt/";
export const ACTIVITY_TR: Record<Activity, string> = {
  vocab: "Kelime", chunks: "İfadeler", build: "Cümle kurma", drills: "Kontrollü alıştırma", listening: "Dinleme",
  pronunciation: "Telaffuz", dialogue: "Destekli diyalog", roleplay: "Konuşma (rol oyunu)", review: "Tekrar", assess: "Seviye tespiti", other: "Serbest"
};

export type Recommendation =
  | { kind: "assess"; title_tr: string; why_tr: string }
  | { kind: "scenario"; activity: Activity; scenarioId: string; title_tr: string; why_tr: string; draft: boolean }
  | { kind: "v1"; activity: Activity; url: string; title_tr: string; why_tr: string }
  | { kind: "none"; title_tr: string; why_tr: string };

/** v1'de karşılığı olan bölümler (çalışan özellikler) */
const V1_TARGET: Partial<Record<Activity, { hash: string; tr: string }>> = {
  build: { hash: "#kurs", tr: "Eski uygulama: kursundaki kural ve alıştırma basamakları" },
  drills: { hash: "#kurs", tr: "Eski uygulama: kursundaki alıştırmalar" },
  listening: { hash: "#shadow", tr: "Eski uygulama: Shadowing ve dinleme" },
  pronunciation: { hash: "#shadow", tr: "Eski uygulama: Shadowing ve telaffuz" },
  dialogue: { hash: "#kurs", tr: "Eski uygulama: kursundaki diyalog ve rol oyunu" },
  roleplay: { hash: "#canli", tr: "Eski uygulama: Canlı sohbet" },
  review: { hash: "#kurs", tr: "Eski uygulama: kurs tekrarı" }
};

export function recommend(o: { profile: Profile; index: ContentIndex | null; hasPlacement: boolean; sessionN: number }): Recommendation {
  if (!o.hasPlacement) return { kind: "assess", title_tr: "Seviye tespiti (12–15 dk)", why_tr: "Planı senin gerçek seviyene göre kurabilmek için önce kısa, pratik bir tespit yapalım." };
  const plan = o.profile.focus.sessionPlan[(o.sessionN - 1) % 4] || ["vocab"];
  const activity = plan[0]!;
  if (activity === "vocab" || activity === "chunks") {
    const order = o.profile.domains.priority.filter((d) => !o.profile.domains.paused.includes(d));
    for (const d of order) {
      // PM-044.1: mevsim dersi (`season`) ana yola hiç girmez; yalnızca Bugün'deki mevsim kartından açılır
      const sc = (o.index?.scenarios || []).filter((s) => s.domain === d && !s.season).sort((a, b) => a.order - b.order)[0];
      if (sc) return { kind: "scenario", activity, scenarioId: sc.id, title_tr: sc.title_tr, why_tr: `Seans ${o.sessionN}: ${ACTIVITY_TR[activity]}. Öncelikli alanından senaryonun kelime ve ifadelerini çalış.`, draft: sc.review !== "reviewed" };
    }
    return { kind: "none", title_tr: "Bu alanların dersleri yakında", why_tr: "Öncelik listendeki alanların dersleri hazırlanıyor." };
  }
  const t = V1_TARGET[activity];
  if (t) return { kind: "v1", activity, url: V1_URL + "?v1" + t.hash, title_tr: t.tr, why_tr: `Seans ${o.sessionN}: ${ACTIVITY_TR[activity]}. Bu etkinlik için şimdilik eski uygulamadaki karşılığını kullan.` };
  return { kind: "none", title_tr: ACTIVITY_TR[activity], why_tr: "" };
}
