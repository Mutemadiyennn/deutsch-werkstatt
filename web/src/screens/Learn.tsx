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
      <p class="small muted">Gerçek hayattaki {domains.length} durum, senin öncelik sırana göre. Her durumda önce kelime ve ifadeler, sonra cümle kurma, en sonunda konuşma.</p>
      <ul class="list card">
        {domains.map((d) => {
          const n = visibleScenarios(index.scenarios, Date.now()).filter((s) => s.domain === d.id).length;
          const paused = profile.domains.paused.includes(d.id);
          return (
            <li>
              <a href={`#/learn/${d.id}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }} data-domain={d.id}>
                <span class="grow"><b>{d.title_tr}</b> <span class="muted small">· {d.title_de}</span><br /><span class="small muted">{n ? `${n} senaryo` : "v2 senaryoları hazırlanıyor"} · v1'de {d.legacyUnits.length} ünite{paused ? " · duraklatıldı" : ""}</span></span>
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
                {s.review !== "reviewed" && <span class="chip warn">inceleme bekliyor</span>}
              </a></li>
            ))}
          </ul>
        ) : <p class="small muted">Bu alanın v2 senaryoları bir sonraki içerik fazında yazılacak. O zamana kadar aşağıdaki v1 ünitelerini kullanabilirsin.</p>}
      </section>
      <section class="card">
        <div class="kicker">İlgili v1 kurs üniteleri</div>
        <p class="small muted">v1 uygulamasında açılır (kurs yolu: kelime, kural, dinleme, okuma, oyun, yazma, rol oyunu, sınav).</p>
        <div class="row">{d.legacyUnits.map((u) => <a class="chip" href={`${V1_URL}#kurs`} target="_blank" rel="noopener">{u.toUpperCase()} <Icon name="out" size={14} /></a>)}</div>
      </section>
    </div>
  );
}

