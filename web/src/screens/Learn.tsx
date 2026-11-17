/** Öğren: 13 alan → alan sayfası (v2 senaryoları + ilgili v1 üniteleri) → senaryo çalışma sayfası */
import { useEffect, useState } from "preact/hooks";
import type { Lexeme, Pattern, Scenario } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon, loadScenario } from "../services/content.ts";
import { V1_URL } from "../core/planner.ts";
import { Art, ErrorPanel, FocusChip, Loading, SpeakBtn, TopBar } from "../ui/components.tsx";

export function Learn() {
  const { index, indexError, profile } = useApp();
  if (indexError) return <ErrorPanel message={indexError} onRetry={() => location.reload()} />;
  if (!index) return <Loading />;
  const order = profile.domains.priority;
  const domains = index.domains.slice().sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  return (
    <div class="stack">
      <TopBar title="Öğren" />
      <p class="small muted">Gerçek hayattaki 13 durum, senin öncelik sırana göre. Her durumda önce kelime ve ifadeler, sonra cümle kurma, en sonunda konuşma.</p>
      <ul class="list card">
        {domains.map((d) => {
          const n = index.scenarios.filter((s) => s.domain === d.id).length;
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
      <p class="tiny muted">İçerik: {index.counts.lexemes} kelime · {index.counts.grammar} dilbilgisi notu · {index.counts.scenarios} senaryo · sürüm {index.version}</p>
    </div>
  );
}

export function DomainView({ id }: { id: string }) {
  const { index } = useApp();
  if (!index) return <Loading />;
  const d = index.domains.find((x) => x.id === id);
  if (!d) return <ErrorPanel message="Bu alan bulunamadı." />;
  const sc = index.scenarios.filter((s) => s.domain === id).sort((a, b) => a.order - b.order);
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
        <div class="row">{d.legacyUnits.map((u) => <a class="chip" href={`${V1_URL}#kurs`} target="_blank" rel="noopener">{u.toUpperCase()} ↗</a>)}</div>
      </section>
    </div>
  );
}

const LAYER_TR = { hd: "Hochdeutsch", alltag: "Gündelik", bair: "Bairisch" } as const;

export function ScenarioView({ id }: { id: string }) {
  const [s, setS] = useState<Scenario | null>(null);
  const [lx, setLx] = useState<{ lexemes: Map<string, Lexeme>; patterns: Map<string, Pattern> } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [showTr, setShowTr] = useState(true);
  const load = () => {
    setErr(null);
    Promise.all([loadScenario(id), loadLexicon()])
      .then(([sc, l]) => { setS(sc); setLx({ lexemes: new Map(l.lexemes.map((x) => [x.id, x])), patterns: new Map(l.patterns.map((x) => [x.id, x])) }); })
      .catch((e) => setErr(String(e.message || e)));
  };
  useEffect(load, [id]);
  if (err) return <div class="stack"><TopBar title="Senaryo" back="#/learn" /><ErrorPanel message={err} onRetry={load} /></div>;
  if (!s || !lx) return <Loading />;
  const chunks = s.chunks.filter((c) => s.essentials.chunks.includes(c.id));
  const extraChunks = s.chunks.filter((c) => !s.essentials.chunks.includes(c.id));
  return (
    <div class="stack">
      <TopBar title={s.title_tr} back={`#/learn/${s.domain}`}><FocusChip /></TopBar>
      {s.review.status !== "reviewed" && <div class="fb warn small">Bu senaryo bağımsız dilbilimci incelemesini bekliyor. Kontrol edilmiş içerik etiketsiz gösterilir.</div>}
      <section class="card">
        <div class="kicker">Hedef · {s.level}</div>
        <p>{s.goal_tr}</p>
        <p class="tiny muted">Çalışma sayfası: kelime ve ifadeleri dinle ve oku. Alıştırmalar, destekli diyalog ve konuşma bir sonraki fazda bu senaryoya eklenecek.</p>
      </section>

      <section class="card" data-test="chunks">
        <div class="row between"><h2>Temel ifadeler</h2><button class="btn sm ghost" onClick={() => setShowTr(!showTr)}>{showTr ? "Türkçeyi gizle" : "Türkçeyi göster"}</button></div>
        <ul class="list">
          {[...chunks, ...extraChunks].map((c) => (
            <li class="stack" style={{ gap: 4 }}>
              {(["hd", "alltag"] as const).map((k) => c.layers[k] ? (
                <div class="layer"><span class="k">{LAYER_TR[k]}</span><span class="row" style={{ flexWrap: "nowrap" }}><span class="grow de">{c.layers[k]}</span><SpeakBtn text={c.layers[k]!} /></span></div>
              ) : null)}
              {c.layers.bair && <div class="layer"><span class="k">Bairisch</span><span><span class="de">{c.layers.bair.text}</span> {c.layers.bair.status === "uncertain" && <span class="chip warn">bölgeye göre değişebilir</span>}{c.layers.bair.source && <span class="tiny muted"> · kaynak: {c.layers.bair.source}</span>}</span></div>}
              {showTr && <div class="small muted">{c.tr}</div>}
              {c.mistakes_tr.map((m) => <div class="tiny">⚠ {m}</div>)}
            </li>
          ))}
        </ul>
        <p class="tiny muted">Bairisch katmanı yalnızca doğrulanmış kaynak olduğunda gösterilir; uydurma ağız formu kullanılmaz.</p>
      </section>

      <section class="card">
        <h2>Kelimeler</h2>
        <ul class="list">
          {s.essentials.lexemes.map((lid) => { const l = lx.lexemes.get(lid); if (!l) return null; const ex = l.examples[0]; return (
            <li>
              <div class="row" style={{ flexWrap: "nowrap" }}><span class="grow"><Art art={l.art} de={l.de} />{l.pl && l.pl !== "-" && <span class="small muted"> · çoğul: {l.pl}</span>}{l.verb?.perfekt && <span class="small muted"> · {l.verb.perfekt}</span>}</span><SpeakBtn text={l.de} /></div>
              {showTr && <div class="small muted">{l.tr}</div>}
              {l.collocations.slice(0, 2).map((c) => <div class="small">• <span class="de">{c.de}</span>{showTr && <span class="muted"> — {c.tr}</span>}</div>)}
              {ex && <div class="small row" style={{ flexWrap: "nowrap" }}><span class="grow">„{ex.de}“{showTr && <span class="muted"> {ex.tr}</span>}</span><SpeakBtn text={ex.de} /></div>}
              {l.mistakes_tr.map((m) => <div class="tiny">⚠ {m}</div>)}
            </li>); })}
        </ul>
      </section>

      <section class="card">
        <h2>Cümle kalıpları</h2>
        {s.essentials.patterns.map((pid) => { const p = lx.patterns.get(pid); return p ? (
          <div style={{ marginBottom: 12 }}>
            <div class="de">{p.frame}</div>
            <p class="small">{p.grammar_tr}</p>
            {p.examples.map((e) => <div class="small row" style={{ flexWrap: "nowrap" }}><span class="grow">„{e.de}“{showTr && <span class="muted"> {e.tr}</span>}</span><SpeakBtn text={e.de} /></div>)}
          </div>) : null; })}
      </section>

      <section class="card">
        <h2>Karşı taraf ne diyebilir?</h2>
        <ul class="list">
          {s.otherSide.map((o) => {
            const resp = s.responses.find((r) => r.to === o.id);
            return (
              <li>
                <div class="row" style={{ flexWrap: "nowrap" }}><span class="grow de">{o.de}</span>{o.layer === "alltag" && <span class="chip">gündelik</span>}<SpeakBtn text={o.de} speed="natural" /></div>
                {showTr && <div class="small muted">{o.tr}</div>}
                {resp && <div class="small" style={{ marginTop: 4 }}>Cevap verebilirsin: {resp.options.map((x, i) => <span>{i ? " · " : ""}<span class="de">{x.de}</span></span>)}</div>}
              </li>
            );
          })}
        </ul>
      </section>

      <section class="card">
        <h2>Örnek diyalog</h2>
        <p class="small muted">{s.dialogue.title_tr} · {s.dialogue.roles.A} / {s.dialogue.roles.B}</p>
        <ul class="list">
          {s.dialogue.lines.map((l) => (
            <li class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}>
              <b style={{ width: 28 }}>{l.r === "A" ? "A" : "Sen"}</b>
              <span class="grow"><span class="de">{l.de}</span>{showTr && <><br /><span class="small muted">{l.tr}</span></>}</span>
              <SpeakBtn text={l.de} />
            </li>
          ))}
        </ul>
      </section>

      {s.mistakes_tr.length > 0 && (
        <section class="card"><h2>Sık yapılan hatalar</h2><ul class="small" style={{ margin: 0, paddingLeft: 18 }}>{s.mistakes_tr.map((m) => <li>{m}</li>)}</ul></section>
      )}
      <p class="tiny muted center">Sesler cihaz sesidir. Doğal hızlarda hazır ses dosyaları sonraki fazda eklenecek.</p>
    </div>
  );
}
