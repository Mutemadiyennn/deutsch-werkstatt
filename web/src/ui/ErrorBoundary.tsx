/**
 * Hata sınırı (#58 A12): bir ekranda beklenmeyen hata olursa uygulama beyaz ekranda kalmaz.
 * Öğrenci Türkçe bir açıklama, "Tekrar dene" ve "Bugün'e dön" görür; verisi cihazda durur.
 * Hata ayrıntısı yalnızca cihazda saklanır (meta "lastError"); dışarı gönderilmez.
 */
import { Component, type ComponentChildren } from "preact";
import { getMeta, setMeta } from "../data/db.ts";
import { EskiyeDon } from "./EskiyeDon.tsx";

/**
 * Son 5 hata cihazda tutulur (meta "lastError" en sonuncusu, "errors" son 5). NOT: mesaj öğrencinin cevabından parça
 * içerebilir; ileride "hata raporu gönder" eklenirse bu alan olduğu gibi gönderilmez (gizlilik).
 */
/** odak hata başlığına bir kez taşınır (yeniden çizimde odak çalınmaz) */
const focusOnce = (el: HTMLElement | null) => { if (el && !el.dataset.f) { el.dataset.f = "1"; el.focus(); } };

export function recordError(where: string, e: unknown) {
  const msg = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
  const rec = { where, msg: msg.slice(0, 300), at: new Date().toISOString() };
  void (async () => {
    await setMeta("lastError", rec);
    const list = (await getMeta<typeof rec[]>("errors")) ?? [];
    await setMeta("errors", [...list, rec].slice(-5));
  })().catch(() => {});
}

export class ErrorBoundary extends Component<{ children: ComponentChildren; resetKey?: string }, { err: unknown }> {
  override state = { err: null as unknown };
  static override getDerivedStateFromError(err: unknown) { return { err }; }
  override componentDidCatch(err: unknown) { recordError(location.hash || "/", err); }
  override componentDidUpdate(prev: { resetKey?: string }) { if (prev.resetKey !== this.props.resetKey && this.state.err) this.setState({ err: null }); }
  override render() {
    if (!this.state.err) return this.props.children;
    return (
      <section class="card stack" role="alert" data-test="error-boundary">
        <h2 tabIndex={-1} ref={focusOnce}>Bu ekranda bir sorun çıktı</h2>
        <p>Çalışman kaybolmadı; ilerlemen bu cihazda kayıtlı. Tekrar deneyebilir ya da Bugün ekranına dönebilirsin.</p>
        <div class="row">
          <button class="btn primary grow" data-test="eb-retry" onClick={() => this.setState({ err: null })}>Tekrar dene</button>
          <a class="btn grow" href="#/today" data-test="eb-home" onClick={() => this.setState({ err: null })}>Bugün'e dön</a>
        </div>
      </section>
    );
  }
}

/** En dış sınır: sekme çubuğu, mola katmanı ya da uygulamanın kendisi çökerse beyaz ekran yerine sade bir sayfa (inceleme #61 P2-6) */
export class RootBoundary extends Component<{ children: ComponentChildren }, { err: unknown }> {
  override state = { err: null as unknown };
  static override getDerivedStateFromError(err: unknown) { return { err }; }
  override componentDidCatch(err: unknown) { recordError("kök", err); }
  override render() {
    if (!this.state.err) return this.props.children;
    return (
      <main class="app notabs"><section class="card stack" role="alert" data-test="root-error">
        <h2 tabIndex={-1} ref={focusOnce}>Uygulamada bir sorun çıktı</h2>
        <p>İlerlemen bu cihazda kayıtlı. Uygulamayı yeniden açmak çoğu zaman yeter.</p>
        <button class="btn primary block" onClick={() => location.reload()}>Uygulamayı yeniden aç</button>
        {/* yeni uygulama açılmıyorsa eski uygulamaya dönüş (inceleme #130 B3) */}
        <EskiyeDon cls="linkbtn" />
      </section></main>
    );
  }
}
