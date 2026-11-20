import { useState } from "preact/hooks";
import { auth, authErrorTr, isNative } from "../services/auth.ts";
import { EskiyeDon, v2AcAcik } from "../ui/EskiyeDon.tsx";

/** Giriş. Web: Google. iPhone uygulaması: e-posta + uygulama şifresi (v1'de belirlenen şifre). */
export function Login() {
  const native = isNative();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const run = async (f: () => Promise<void>) => { setBusy(true); setErr(null); try { await f(); } catch (e) { setErr(authErrorTr(e)); } finally { setBusy(false); } };
  return (
    <main class="app notabs">
      <div class="stack" style={{ marginTop: "8vh" }}>
        <div>
          <div class="kicker">Deutsch Werkstatt</div>
          <h1>Almancayı gerçek hayat için öğren</h1>
          <p class="muted">Devam etmek için hesabınla giriş yap. İlerlemen bu cihazda saklanır; sunucuya yalnızca senin hesabın erişebilir.</p>
        </div>
        {!native && (
          <button class="btn primary block" disabled={busy} onClick={() => run(() => auth.signInGoogle())} data-test="google">Google ile giriş yap</button>
        )}
        <details open={native} class="card">
          <summary class="small"><b>{native ? "E-posta ve uygulama şifresiyle giriş" : "iPhone uygulamasındaki gibi e-posta ve uygulama şifresiyle giriş"}</b></summary>
          <form class="stack" style={{ marginTop: 12 }} onSubmit={(e) => { e.preventDefault(); run(() => auth.signInEmail(email, pw)); }}>
            <div>
              <label class="lbl" for="em">E-posta</label>
              <input id="em" class="input" type="email" autocomplete="username" value={email} onInput={(e) => setEmail((e.target as HTMLInputElement).value)} required />
            </div>
            <div>
              <label class="lbl" for="pw">Uygulama şifresi</label>
              <input id="pw" class="input" type="password" autocomplete="current-password" value={pw} onInput={(e) => setPw((e.target as HTMLInputElement).value)} required />
            </div>
            <button class="btn block" type="submit" disabled={busy}>Giriş yap</button>
          </form>
        </details>
        {err && <div class="fb bad" role="alert">{err}</div>}
        {/* ayar açıkken eski uygulama her açılışta buraya yönlenir: giriş olmazsa da geri dönüş yolu (inceleme #130 B3) */}
        {v2AcAcik() && <EskiyeDon cls="linkbtn" />}
      </div>
    </main>
  );
}
