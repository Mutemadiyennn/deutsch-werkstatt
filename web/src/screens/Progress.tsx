/** İlerlemem: iki ayrı panel. Süre (odak düzeni) ≠ dil kazanımı; süre hiçbir zaman seviye gibi gösterilmez. */
import { useEffect, useState } from "preact/hooks";
import type { Assessment, FocusDay } from "@dw/shared";
import { useApp } from "../state.ts";
import { focusRange, itemStats, db } from "../data/db.ts";
import { localDate } from "../core/focus.ts";
import { ACTIVITY_TR } from "../core/planner.ts";
import { SKILL_TR } from "../core/assess.ts";
import { TopBar, useFocusTick } from "../ui/components.tsx";

const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const DOW = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

export function Progress() {
  const { profile, placement } = useApp();
  const e = useFocusTick();
  const [days, setDays] = useState<FocusDay[]>([]);
  const [stats, setStats] = useState<Awaited<ReturnType<typeof itemStats>> | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const today = new Date();
  const monday = addDays(today, -((today.getDay() + 6) % 7));
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  useEffect(() => {
    (async () => {
      const from = localDate(Math.min(monday.getTime(), monthStart.getTime()));
      setDays(await focusRange(from, localDate(today.getTime())));
      setStats(await itemStats());
      setAssessments((await db.assess.toArray()).filter((a) => a.finishedAt).sort((a, b) => (a.finishedAt! < b.finishedAt! ? -1 : 1)));
    })();
  }, []);

  // bugünün canlı verisi motordan
  const byDate = new Map(days.map((d) => [d.date, d]));
  if (e) byDate.set(e.day.date, e.day);
  const goal = profile.focus.dailyGoalMin;
  const week = Array.from({ length: 7 }, (_, i) => { const k = localDate(addDays(monday, i).getTime()); const d = byDate.get(k); return { k, min: d ? Math.floor(d.focusSec / 60) : 0 }; });
  const weekHit = week.filter((w) => w.min >= profile.focus.weekly.minPerDay).length;
  const maxBar = Math.max(Math.round(profile.focus.weekly.minPerDay * 1.25), ...week.map((w) => w.min));
  const month = [...byDate.values()].filter((d) => d.date >= localDate(monthStart.getTime()));
  const monthMin = Math.floor(month.reduce((s, d) => s + d.focusSec, 0) / 60);
  const sAll = month.flatMap((d) => d.sessions);
  const cnt = (st: string) => sAll.filter((s) => s.status === st).length;
  const todayDay = e?.day;
  const seg = new Map<string, number>();
  for (const s of todayDay?.sessions || []) for (const g of s.segments) seg.set(g.activity, (seg.get(g.activity) || 0) + g.sec);

  return (
    <div class="stack">
      <TopBar title="İlerlemem" />

      <section class="card stack" data-test="panel-focus">
        <div><div class="kicker">Panel 1 · Çalışma düzeni (süre)</div><p class="tiny muted">Ne kadar düzenli çalıştığını gösterir; dil seviyeni değil.</p></div>
        <div class="row between"><span>Bugün</span><b>{todayDay ? Math.floor(todayDay.focusSec / 60) : 0} / {goal} dk · {e?.completedCount || 0}/4 seans</b></div>
        <div class="row between small muted"><span>Bugünkü mola</span><span>{Math.round(((todayDay?.breakSec || 0) + (todayDay?.longBreakSec || 0)) / 60)} dk (odak süresine eklenmez)</span></div>
        {seg.size > 0 && <div class="small">Bugün: {[...seg.entries()].map(([a, s]) => `${ACTIVITY_TR[a as keyof typeof ACTIVITY_TR]} ${Math.round(s / 60)} dk`).join(" · ")}</div>}
        <div>
          <div class="row between small"><b>Bu hafta</b><span>{weekHit}/{profile.focus.weekly.days} gün hedefte ({profile.focus.weekly.minPerDay} dk)</span></div>
          <div class="bars" aria-label="Haftalık odak dakikaları">
            <div class="goal" style={{ bottom: `${(profile.focus.weekly.minPerDay / maxBar) * 100}%` }} />
            {week.map((w) => <div class={`b${w.min >= profile.focus.weekly.minPerDay ? " hit" : ""}`} style={{ height: `${(w.min / maxBar) * 100}%` }} title={`${w.k}: ${w.min} dk`} />)}
          </div>
          <div class="barlbl">{week.map((w, i) => <span>{DOW[i]}<br />{w.min}</span>)}</div>
        </div>
        <div class="row between small"><span>Bu ay</span><span>{monthMin} dk · {cnt("completed")} seans tamamlandı · {cnt("interrupted") + cnt("abandoned")} yarıda kaldı</span></div>
      </section>

      <section class="card stack" data-test="panel-language">
        <div><div class="kicker">Panel 2 · Dil kazanımı</div><p class="tiny muted">Ne öğrendiğini ve kullanabildiğini gösterir.</p></div>
        {placement ? (
          <>
            <div class="row between"><span>Tahmini başlangıç seviyesi</span><b>{placement.overall === "below-A1" ? "A1 öncesi" : placement.overall}</b></div>
            {placement.results?.map((r) => <div class="lvl small"><span class="muted">{SKILL_TR[r.skill]}</span><div class="progress"><i style={{ width: `${r.total ? (r.correct / r.total) * 100 : 0}%` }} /></div><span>{r.correct}/{r.total}</span></div>)}
            {assessments.length > 1 && <p class="small">Ölçüm sayısı: {assessments.length} · ilk: {assessments[0]!.overall} → son: {assessments.at(-1)!.overall}</p>}
          </>
        ) : <p class="small muted">Henüz seviye tespiti yok. <a href="#/assess">Şimdi yap</a></p>}
        {stats && (
          <div class="small">
            <div class="row between"><span>Tanıdığın kelimeler (pasif)</span><b>{stats.passiveKnown}</b></div>
            <div class="row between"><span>Kendin üretebildiğin kelimeler (aktif)</span><b>{stats.activeKnown}</b></div>
            <div class="row between"><span>Kalıcı kelimeler (iki ayrı oturumda üretilmiş)</span><b>{stats.durable}</b></div>
            <div class="row between"><span>Tekrar listende</span><b>{stats.bank}</b></div>
            <div class="row between"><span>Tamamlanan gerçek hayat senaryoları</span><b>0</b></div>
          </div>
        )}
        <p class="tiny muted">Cümle kurma, dinleme ve konuşma ölçütleri, senaryo alıştırmalarıyla (sonraki faz) birlikte burada izlenecek. Şimdilik kaynakları seviye tespiti.</p>
      </section>
    </div>
  );
}
