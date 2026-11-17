/** Uygulama kabuğu: giriş kapısı → profil → ilk kurulum (onboarding) → ekranlar */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Assessment, ContentIndex, Profile } from "@dw/shared";
import { Ctx, LEARNING_ROUTES, parseHash, type AppCtx, type Route } from "./state.ts";
import { auth, type AuthUser } from "./services/auth.ts";
import { createApi } from "./services/api.ts";
import { loadIndex } from "./services/content.ts";
import { getProfile, latestPlacement, saveProfile } from "./data/db.ts";
import { setLearning, startFocus, updateFocusConfig } from "./services/focusRuntime.ts";
import { TabBar, Loading } from "./ui/components.tsx";
import { Login } from "./screens/Login.tsx";
import { Onboarding } from "./screens/Onboarding.tsx";
import { Today } from "./screens/Today.tsx";
import { Learn, DomainView, ScenarioView } from "./screens/Learn.tsx";
import { AssessRun, AssessResult } from "./screens/Assess.tsx";
import { Progress } from "./screens/Progress.tsx";
import { ProfileView } from "./screens/Profile.tsx";

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) || "";

function applyTheme(p: Profile) {
  const t = p.ui.theme;
  if (t === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", t);
  document.documentElement.style.fontSize = `${Math.round(16 * p.ui.textScale)}px`;
}

export function App() {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setP] = useState<Profile | null>(null);
  const [index, setIndex] = useState<ContentIndex | null>(null);
  const [indexError, setIndexError] = useState<string | null>(null);
  const [placement, setPlacement] = useState<Assessment | undefined>();
  const [route, setRoute] = useState<Route>(parseHash(location.hash));
  const [toastMsg, setToast] = useState<string | null>(null);

  useEffect(() => {
    const on = () => setRoute(parseHash(location.hash));
    addEventListener("hashchange", on);
    auth.ready.then(() => { setUser(auth.current()); setAuthReady(true); }).catch(() => setAuthReady(true));
    const off = auth.onChange((u) => setUser(u));
    return () => { removeEventListener("hashchange", on); off(); };
  }, []);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const p = await getProfile();
      applyTheme(p);
      setP(p);
      setPlacement(await latestPlacement());
      await startFocus(p);
    })();
    loadIndex().then(setIndex).catch((e) => setIndexError(String(e.message || e)));
  }, [user?.uid]);

  useEffect(() => { setLearning(LEARNING_ROUTES.has(route.name), route.name === "assess" ? "assess" : "vocab", route.name === "scenario" ? route.id : undefined); window.scrollTo(0, 0); }, [route]);

  const api = useMemo(() => createApi({ base: API_BASE, token: (f) => auth.idToken(f) }), []);
  const toast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2600); };

  if (!authReady) return <main class="app notabs"><Loading /></main>;
  if (!user) return <Login />;
  if (!profile) return <main class="app notabs"><Loading text="Profil yükleniyor…" /></main>;

  const ctx: AppCtx = {
    user, profile, index, indexError, placement, api, route, toast,
    setProfile: async (p) => { const v = await saveProfile(p); applyTheme(v); setP(v); updateFocusConfig(v); },
    refreshPlacement: async () => setPlacement(await latestPlacement())
  };

  let screen;
  if (!profile.onboardedAt || route.name === "onboarding") screen = <Onboarding />;
  else switch (route.name) {
    case "learn": screen = <Learn />; break;
    case "domain": screen = <DomainView id={route.id} />; break;
    case "scenario": screen = <ScenarioView id={route.id} />; break;
    case "progress": screen = <Progress />; break;
    case "profile": screen = <ProfileView />; break;
    case "assess": screen = <AssessRun />; break;
    case "assessResult": screen = <AssessResult id={route.id} />; break;
    default: screen = <Today />;
  }
  const tabs = !!profile.onboardedAt && route.name !== "onboarding" && route.name !== "assess";
  return (
    <Ctx.Provider value={ctx}>
      <main class={`app${tabs ? "" : " notabs"}`}>{screen}</main>
      {tabs && <TabBar route={route} />}
      {toastMsg && <div class="toast" role="status">{toastMsg}</div>}
    </Ctx.Provider>
  );
}
