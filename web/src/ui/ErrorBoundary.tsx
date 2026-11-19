/**
 * Hata sınırı (#58 A12): bir ekranda beklenmeyen hata olursa uygulama beyaz ekranda kalmaz.
 * Öğrenci Türkçe bir açıklama, "Tekrar dene" ve "Bugün'e dön" görür; verisi cihazda durur.
 * Hata ayrıntısı yalnızca cihazda saklanır (meta "lastError"); dışarı gönderilmez.
 */
import { Component, type ComponentChildren } from "preact";
import { setMeta } from "../data/db.ts";

export function recordError(where: string, e: unknown) {
  const msg = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
  void setMeta("lastError", { where, msg: msg.slice(0, 300), at: new Date().toISOString() }).catch(() => {});
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
        <h2>Bu ekranda bir sorun çıktı</h2>
        <p>Çalışman kaybolmadı; ilerlemen bu cihazda kayıtlı. Tekrar deneyebilir ya da Bugün ekranına dönebilirsin.</p>
        <div class="row">
          <button class="btn primary grow" data-test="eb-retry" onClick={() => this.setState({ err: null })}>Tekrar dene</button>
          <a class="btn grow" href="#/today" data-test="eb-home" onClick={() => this.setState({ err: null })}>Bugün'e dön</a>
        </div>
      </section>
    );
  }
}
