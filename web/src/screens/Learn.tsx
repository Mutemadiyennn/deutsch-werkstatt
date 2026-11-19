/** Öğren: 20 alan → alan sayfası (v2 senaryoları + ilgili v1 üniteleri) → senaryo çalışma sayfası */
import { Icon } from "../ui/icons.tsx";
import { useApp } from "../state.ts";
import { V1_URL } from "../core/planner.ts";
import { visibleScenarios } from "../core/season.ts";
import { ErrorPanel, Loading, TopBar } from "../ui/components.tsx";

export function Learn() {
  const { index, indexError, profile } = useApp();
  if (indexError) return <ErrorPanel message={indexError} onRetry={() => location.reload()} />;
  if (!index) return <Loading />;
  const order = profile.domains.priority;
  const domains = index.domains.slice().sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  return (
    <div class="stack">
      <TopBar title="Öğren" />
      {index.temel.length > 0 && (
        <section class="card" data-test="temel-liste">
          <div class="kicker">Temel dersler</div>
          <ul class="list">{index.temel.map((t) => (
            <li><a href={`#/ders/${encodeURIComponent(t.id)}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }} data-test="temel-ders">
              <span class="grow"><b>{t.title_tr}</b> <span class="small muted">· {t.title_de}</span></span><span aria-hidden="true">›</span></a></li>))}</ul>
        </section>
      )}
      {index.m1.length > 0 && (
        <section class="card" data-test="m1-liste">
          <div class="kicker">İlk Hafta</div>
          <ul class="list">{index.m1.map((g) => (
            <li><a href={`#/m1/${g.day}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }} data-test={`m1-gun-${g.day}`}>
              <span class="grow"><b>{g.day}. gün</b> <span class="small muted">· {g.title_tr}</span></span><span aria-hidden="true">›</span></a></li>))}</ul>
        </section>
      )}
      <p class="small muted">Gerçek hayattaki {domains.length} durum, senin öncelik sırana göre. Her durumda önce kelime ve ifadeler, sonra cümle kurma, en sonunda konuşma.</p>
      <ul class="list card">
        {domains.map((d) => {
          const n = visibleScenarios(index.scenarios, Date.now()).filter((s) => s.domain === d.id).length;
          const paused = profile.domains.paused.includes(d.id);
          return (
            <li>
              <a href={`#/learn/${d.id}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }} data-domain={d.id}>
                <span class="grow"><b>{d.title_tr}</b> <span class="muted small">· {d.title_de}</span><br /><span class="small muted">{n ? `${n} ders` : "Dersler yakında"}{paused ? " · duraklatıldı" : ""}</span></span>
                <span aria-hidden="true">›</span>
              </a>
            </li>
          );
        })}
      </ul>
      <p class="tiny muted">İçerik: {index.counts.lexemes} kelime · {index.counts.grammar} dilbilgisi notu · {visibleScenarios(index.scenarios, Date.now()).length} ders · sürüm {index.version}</p>
    </div>
  );
}

export function DomainView({ id }: { id: string }) {
  const { index } = useApp();
  if (!index) return <Loading />;
  const d = index.domains.find((x) => x.id === id);
  if (!d) return <ErrorPanel message="Bu alan bulunamadı." />;
  const sc = visibleScenarios(index.scenarios, Date.now()).filter((s) => s.domain === id).sort((a, b) => a.order - b.order);
  return (
    <div class="stack">
      <TopBar title={d.title_tr} back="#/learn" />
      <p class="small">{d.desc_tr}</p>
      <section class="card">
        <div class="kicker">Senaryolar</div>
        {sc.length ? (
          <ul class="list">
            {sc.map((s) => (
              <li><a href={`#/scenario/${encodeURIComponent(s.id)}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }}>
                <span class="grow"><b>{s.title_tr}</b><br /><span class="small muted">{s.title_de} · {s.level}</span></span>
                {s.review !== "reviewed" && <span class="chip">deneme dersi</span>}
              </a></li>
            ))}
          </ul>
        ) : <p class="small muted">Bu alanın dersleri yakında gelecek. O zamana kadar aşağıdaki eski ünitelere bakabilirsin.</p>}
      </section>
      <section class="card">
        <div class="kicker">Eski uygulamadaki üniteler</div>
        <p class="small muted">Eski uygulamada açılır.</p>
        <div class="row">{d.legacyUnits.map((u) => <a class="chip" href={`${V1_URL}#kurs`} target="_blank" rel="noopener">{u.toUpperCase()} <Icon name="out" size={14} /></a>)}</div>
      </section>
    </div>
  );
}

