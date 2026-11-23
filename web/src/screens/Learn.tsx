/** Alan sayfası (v2 senaryoları + ilgili v1 üniteleri) → senaryo çalışma sayfası. Alan listesi Köy'de: Pazar meydanı (screens/Koy.tsx). */
import { Icon } from "../ui/icons.tsx";
import { useApp } from "../state.ts";
import { V1_URL } from "../core/planner.ts";
import { visibleScenarios } from "../core/season.ts";
import { ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { ayrac } from "../core/ayrac.ts";

export function DomainView({ id }: { id: string }) {
  const { index } = useApp();
  if (!index) return <Loading />;
  const d = index.domains.find((x) => x.id === id);
  if (!d) return <ErrorPanel message="Bu alan bulunamadı." />;
  const sc = visibleScenarios(index.scenarios, Date.now()).filter((s) => s.domain === id).sort((a, b) => a.order - b.order);
  return (
    <div class="stack">
      <TopBar title={d.title_tr} back="#/koy/pazar" />
      <p class="small">{d.desc_tr}</p>
      <section class="card">
        <div class="kicker">Senaryolar</div>
        {sc.length ? (
          <ul class="list">
            {sc.map((s) => (
              <li><a href={`#/scenario/${encodeURIComponent(s.id)}`} class="row" style={{ textDecoration: "none", color: "inherit", flexWrap: "nowrap" }}>
                <span class="grow"><b>{s.title_tr}</b><br /><span class="small muted">{ayrac(s.title_de, s.level)}</span></span>
                {s.review !== "reviewed" && <span class="chip">deneme dersi</span>}
              </a></li>
            ))}
          </ul>
        ) : <p class="small muted">Bu alanın dersleri yakında gelecek. O zamana kadar aşağıdaki eski ünitelere bakabilirsin.</p>}
      </section>
      <section class="card">
        <div class="kicker">Eski uygulamadaki üniteler</div>
        <p class="small muted">Eski uygulamada açılır.</p>
        <div class="row">{d.legacyUnits.map((u) => <a class="chip" href={`${V1_URL}?v1#kurs`} target="_blank" rel="noopener">{u.toUpperCase()} <Icon name="out" size={14} /></a>)}</div>
      </section>
    </div>
  );
}

