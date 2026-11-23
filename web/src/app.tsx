/** Uygulama kabuğu: giriş kapısı → profil → ilk kurulum (onboarding) → ekranlar */
import { DurumCubugu } from "./ui/durum.tsx";
import { RehberEkrani } from "./screens/Rehber.tsx";
import { GorevlerEkrani } from "./ui/gorev.tsx";
import { usePlan } from "./screens/Yol.tsx";
import { GunKapisi, HaftaTestiEkrani } from "./screens/HaftaTesti.tsx";
import { dondurmaKontrol } from "./services/gorev.ts";
import { probeProvider } from "./services/ai.ts";
import { CallScreen as Call } from "./screens/Call.tsx";
import { M1Gun, MedyaEkrani } from "./screens/Medya.tsx";
import { DersEkrani } from "./screens/Ders.tsx";
import { ProvaEkrani } from "./screens/Prova.tsx";
import { OkumaEkrani } from "./screens/Okuma.tsx";
import { SozlukEkrani } from "./screens/Sozluk.tsx";
import { KalipEkrani } from "./screens/Kalip.tsx";
import { YolEkrani } from "./screens/Yol.tsx";
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Assessment, ContentIndex, Profile } from "@dw/shared";
import { Ctx, LEARNING_ROUTES, parseHash, yeniAdres, type AppCtx, type Route } from "./state.ts";
import { auth, type AuthUser } from "./services/auth.ts";
import { createApi } from "./services/api.ts";
import { SesDeneme } from "./screens/SesDeneme.tsx";
import { loadIndex, within, loadWorld } from "./services/content.ts";
import { getProfile, latestPlacement, saveProfile } from "./data/db.ts";
import { setLearning, startFocus, updateFocusConfig } from "./services/focusRuntime.ts";
import { setBaslangicHizi, setKarakterler, setOgrenciHitap, setYavasOran, yerelSesleriYukle } from "./services/speech.ts";
import { efektAyar, sesKilidiAc, ustUsteSifirla } from "./services/efekt.ts";
import { kullanimIzle } from "./services/kullanim.ts";
import { TabBar, Loading, ErrorPanel } from "./ui/components.tsx";
import { ErrorBoundary, recordError } from "./ui/ErrorBoundary.tsx";
import { ensurePersist } from "./services/storage.ts";
import { Login } from "./screens/Login.tsx";
import { Onboarding } from "./screens/Onboarding.tsx";
import { Today } from "./screens/Today.tsx";
import { Learn, DomainView } from "./screens/Learn.tsx";
import { PlayerHome, PlayerSection } from "./screens/Player.tsx";
import { LongPressExplain } from "./ui/learn.tsx";
import { BreakOverlay, OdakEkrani } from "./screens/Today.tsx";
import { AssessRun, AssessResult } from "./screens/Assess.tsx";
import { Progress } from "./screens/Progress.tsx";
import { Garden } from "./screens/Garden.tsx";
import { ProfileView } from "./screens/Profile.tsx";

const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined) || "";

function applyTheme(p: Profile) {
  const t = p.ui.theme;
  if (t === "auto") document.documentElement.removeAttribute("data-theme"); else document.documentElement.setAttribute("data-theme", t);
  // Normal → iOS sistem metin boyutu (Dynamic Type); diğerleri uygulama içi ölçek (en çok %130)
  const de = document.documentElement;
  de.style.removeProperty("font-size");
  de.style.setProperty("--ts", String(p.ui.textScale));
  de.classList.toggle("dyn", p.ui.textScale === 1);
}

/** Akış ekranı (ve yalnız e2e'deki halka türleri denemesi) ayrı parçada (`import()`): ilk açılış paketine girmez
 *  (5. toplu, JS bütçesi). Servis işçisi parçayı kurulumda önbelleğe alır (sw-assets.json bütün dosyaları sayar);
 *  yüklenemezse sayfa yenilenerek yeniden denenir. */
type AkisModul = typeof import("./screens/Akis.tsx");
let akisModul: Promise<AkisModul> | null = null;
function useModul<T>(yukle: () => Promise<T>): T | null | "hata" {
  const [m, setM] = useState<T | null | "hata">(null);
  useEffect(() => {
    let canli = true;
    yukle().then((x) => { if (canli) setM(x); }, () => { if (canli) setM("hata"); });
    return () => { canli = false; };
  }, []);
  return m;
}
const yuklenemedi = <ErrorPanel message="Ekran yüklenemedi. İnternet bağlantını kontrol edip tekrar dene." onRetry={() => location.reload()} />;
function AkisRota({ day }: { day: number }) {
  const m = useModul(() => (akisModul ??= within(import("./screens/Akis.tsx")).catch((e) => { akisModul = null; throw e; })));
  return m === "hata" ? yuklenemedi : m ? <m.AkisEkrani day={day} /> : <Loading />;
}
/** yalnız e2e: bir dil noktasının durak gövdesi tek başına (`#/__dil-noktasi/<id>`; bütün tabloların telefonda sığdığı denetim) */
function DilNoktasiRota() {
  const m = useModul(() => (akisModul ??= within(import("./screens/Akis.tsx")).catch((e) => { akisModul = null; throw e; })));
  return m === "hata" ? yuklenemedi : m ? <m.DilNoktasiVitrin id={decodeURIComponent(location.hash.slice("#/__dil-noktasi/".length))} /> : <Loading />;
}
function HalkaTurRota() {
  const m = useModul(() => within(import("./screens/HalkaTurDeneme.tsx")));
  return m === "hata" ? yuklenemedi : m ? <m.HalkaTurDeneme /> : <Loading />;
}

export function App() {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setP] = useState<Profile | null>(null);
  // öğrencinin satırları hitaba göre seslendirilir; Profil'de değişince hemen (PM-064, inceleme #117 P1-4)
  useEffect(() => { setOgrenciHitap(profile?.address); }, [profile?.address]);
  const [index, setIndex] = useState<ContentIndex | null>(null);
  const [indexError, setIndexError] = useState<string | null>(null);
  const [placement, setPlacement] = useState<Assessment | undefined>();
  const [route, setRoute] = useState<Route>(parseHash(location.hash));
  const [toastMsg, setToast] = useState<string | null>(null);
  const [authSlow, setAuthSlow] = useState(false);
  const [profileErr, setProfileErr] = useState<string | null>(null);
  // #58 B7: Profil'deki dinleme başlangıç hızı ses servisine
  useEffect(() => { if (profile) setBaslangicHizi(profile.listening.startSpeed); }, [profile?.listening.startSpeed]);
  useEffect(() => { if (profile) setYavasOran(profile.listening.slowRate); }, [profile?.listening.slowRate]);
  // Kabuk 1.5 (PM 7042267632): kabukta iPhone'un kendi sesleri (yoksa web yolu sürer)
  // ses listesi uygulama öne her gelişinde yeniden alınır: arada indirilen ya da silinen ses, eklentinin dizinini kaydırmasın (inceleme #164 P1-1)
  useEffect(() => {
    void yerelSesleriYukle();
    const yenile = () => { if (document.visibilityState === "visible") void yerelSesleriYukle(); };
    document.addEventListener("visibilitychange", yenile);
    return () => document.removeEventListener("visibilitychange", yenile);
  }, []);
  // Şölen 1 (#58 B10): efekt sesleri ve kutlamalar Profil'den
  useEffect(() => { if (profile) efektAyar(profile.ui); }, [profile?.ui.sfx, profile?.ui.celebrations]);

  useEffect(() => {
    // ekran değişince "üst üste" sayacı sıfırlanır (inceleme #87 P2)
    // eski sekme adresi (#/learn, #/progress, #/profile) yenisiyle değişir; geçmişe ikinci kayıt düşmez (PM-084 md. 3.2)
    const duzelt = () => { const y = yeniAdres(location.hash); if (y) history.replaceState(history.state, "", y); };
    const on = () => { duzelt(); ustUsteSifirla(); setRoute(parseHash(location.hash)); };
    duzelt();
    addEventListener("hashchange", on);
    // iOS: efekt sesi için ses bağlamı ilk dokunuşta açılır (inceleme #87 P2)
    // dinleyici kalır: ilk dokunuş etkinleştirme sayılmayabilir (iOS'ta touchend sayılır, pointerdown sayılmaz) ve ses sonradan
    // açılabilir; ses bağlamı çalışınca sesKilidiAc hemen döner (inceleme #87 2. tur)
    const kilit = () => sesKilidiAc();
    addEventListener("pointerdown", kilit, true); addEventListener("touchend", kilit, true);
    // #58 B3: yerel kullanım ölçümü (açılış, adımın bitirildiği ya da bırakıldığı nokta; cihazdan çıkmaz)
    const izBitir = kullanimIzle(() => parseHash(location.hash));
    auth.ready.then(() => { setUser(auth.current()); setAuthReady(true); }).catch(() => setAuthReady(true));
    // inceleme #43 P1-3: giriş durumu 8 sn'de gelmezse öğrenci sonsuz "Yükleniyor"da kalmaz
    const slow = setTimeout(() => setAuthSlow(true), 8000);
    auth.ready.then(() => clearTimeout(slow), () => clearTimeout(slow));
    const off = auth.onChange((u) => setUser(u));
    // beklenmeyen hata yalnızca cihazda kaydedilir (A12; dışarı gönderilmez)
    const onErr = (e: ErrorEvent) => recordError("window", e.error ?? e.message);
    const onRej = (e: PromiseRejectionEvent) => recordError("promise", e.reason);
    addEventListener("error", onErr); addEventListener("unhandledrejection", onRej);
    return () => { izBitir(); removeEventListener("hashchange", on); removeEventListener("pointerdown", kilit, true); removeEventListener("touchend", kilit, true); removeEventListener("error", onErr); removeEventListener("unhandledrejection", onRej); off(); };
  }, []);

  useEffect(() => {
    if (!user) return;
    setProfileErr(null);
    (async () => {
      const p = await getProfile();
      applyTheme(p);
      setP(p);
      // veri güvenliği (A12): kurulum bittiyse tarayıcıdan kalıcı depolama iste (yer darlığında silinmesin)
      if (p.onboardedAt) void ensurePersist();
      setPlacement(await latestPlacement());
      await startFocus(p);
      // seri dondurma açılışta (Bugün açılmasa da; inceleme #108 P2): dün boş kaldıysa ve hak varsa seri korunur, söylenir
      if (p.onboardedAt) void dondurmaKontrol().then((g) => { if (g) toast("Dün çalışamadın; seri dondurma hakkın serini korudu."); });
    })().catch((e) => { recordError("profil", e); setProfileErr("Profilin bu cihazdan okunamadı."); });
    within(loadIndex()).then(setIndex).catch((e) => setIndexError(String(e.message || e)));
    // PM-064: karakterlerin sesi (cinsiyet, sıra) — dünya yoksa cihaz sesiyle tek ses
    void loadWorld().then((w) => { if (w) setKarakterler(w.characters.map((c) => ({ id: c.id, name: c.name, ses: c.ses }))); });
  }, [user?.uid]);

  useEffect(() => { if (route.name !== "section") setLearning(LEARNING_ROUTES.has(route.name), route.name === "assess" ? "assess" : "vocab"); window.scrollTo(0, 0); }, [route]);

  const api = useMemo(() => createApi({ base: API_BASE, token: (f) => auth.idToken(f) }), []);
  useEffect(() => { void probeProvider(api); }, [api]);
  const toast = (m: string) => { setToast(m); setTimeout(() => setToast(null), 2600); };

  if (!authReady) return <main class="app notabs">{authSlow
    ? <ErrorPanel message="Giriş bilgisi şu an doğrulanamadı. İnternet bağlantını kontrol edip tekrar dene." onRetry={() => location.reload()} />
    : <Loading />}</main>;
  if (!user) return <Login />;
  if (!profile) return <main class="app notabs">{profileErr ? <ErrorPanel message={`${profileErr} Verin silinmedi; tekrar dene.`} onRetry={() => location.reload()} /> : <Loading text="Profil yükleniyor…" />}</main>;

  const ctx: AppCtx = {
    user, profile, index, indexError, placement, api, route, toast,
    setProfile: async (p) => { const first = !profile.onboardedAt && !!p.onboardedAt; const v = await saveProfile(p); applyTheme(v); setP(v); updateFocusConfig(v); if (first) void ensurePersist(); },
    refreshPlacement: async () => setPlacement(await latestPlacement())
  };

  let screen;
  if (!profile.onboardedAt || route.name === "onboarding") screen = <Onboarding />;
  else switch (route.name) {
    // Köy ve Ben ekranları gelene kadar sekmeler bugünkü Öğren ve İlerlemem ekranlarını açar (PM-084 md. 3.2)
    case "koy": screen = <Learn />; break;
    case "domain": screen = <DomainView id={route.id} />; break;
    case "scenario": screen = <PlayerHome id={route.id} />; break;
    case "section": screen = <PlayerSection id={route.id} section={route.section} />; break;
    case "ben": screen = <Progress />; break;
    case "profile": screen = <ProfileView />; break;
    case "assess": screen = <AssessRun />; break;
    case "assessResult": screen = <AssessResult id={route.id} />; break;
    case "call": screen = <Call id={route.id} />; break;
    case "garden": screen = route.day ? <GunKapisi key={location.hash} day={route.day}><Garden key={route.day} day={route.day} /></GunKapisi> : <Garden key={0} day={route.day} />; break;
    case "yol": screen = <YolEkrani />; break;
    case "ders": screen = <DersEkrani key={route.id} id={route.id} />; break;
    case "prova": screen = <GunKapisi key={location.hash} day={route.day}><ProvaEkrani key={route.day} day={route.day} /></GunKapisi>; break;
    case "okuma": screen = <GunKapisi key={location.hash} day={route.day}><OkumaEkrani key={route.day} day={route.day} /></GunKapisi>; break;
    case "sozluk": screen = <SozlukEkrani q={route.q} id={route.id} />; break;
    case "ses": screen = <SesDeneme />; break;
    case "kalip": screen = <KalipEkrani key={route.id ?? "-"} id={route.id} />; break;
    case "m1day": screen = <GunKapisi key={location.hash} day={route.day}><M1Gun day={route.day} /></GunKapisi>; break;
    case "rehber": screen = <RehberEkrani day={route.day} />; break;
    case "gorevler": screen = <GorevlerRota />; break;
    case "odak": screen = <OdakEkrani />; break;
    case "akis": screen = <GunKapisi key={location.hash} day={route.day}><AkisRota key={route.day} day={route.day} /></GunKapisi>; break;
    case "hafta": screen = <HaftaTestiEkrani key={route.hafta} hafta={route.hafta} />; break;
    case "m1medya": screen = <GunKapisi key={location.hash} day={route.day}><MedyaEkrani key={`${route.id}:${route.tur ?? ""}`} day={route.day} id={route.id} tur={route.tur} /></GunKapisi>; break;
    // yalnız e2e: AK-10 3. adımın iki türü, ekran (4. adım) gelene kadar (üretimde bu dal ve modül paketten düşer)
    default: screen = import.meta.env.MODE === "e2e" && location.hash === "#/__crash" ? <Crash /> : import.meta.env.MODE === "e2e" && location.hash.startsWith("#/__halka-turleri") ? <HalkaTurRota key={location.hash} /> : import.meta.env.MODE === "e2e" && location.hash.startsWith("#/__dil-noktasi/") ? <DilNoktasiRota key={location.hash} /> : <Today />;
  }
  const tabs = !!profile.onboardedAt && !(import.meta.env.MODE === "e2e" && (location.hash.startsWith("#/__halka-turleri") || location.hash.startsWith("#/__dil-noktasi/"))) && route.name !== "onboarding" && route.name !== "assess" && route.name !== "section" && route.name !== "call" && route.name !== "garden" && route.name !== "m1medya" && route.name !== "akis" && route.name !== "ders" && route.name !== "prova" && route.name !== "okuma" && route.name !== "hafta";
  return (
    <Ctx.Provider value={ctx}>
      <main class={`app${tabs ? "" : " notabs"}`}>{tabs && <DurumCubugu />}<ErrorBoundary resetKey={location.hash}>{screen}</ErrorBoundary></main>
      {tabs && <TabBar route={route} />}
      <LongPressExplain />
      {LEARNING_ROUTES.has(route.name) && <BreakOverlay />}
      {toastMsg && <div class="toast" role="status">{toastMsg}</div>}
    </Ctx.Provider>
  );
}

/** yalnızca e2e: hata sınırını sınamak için bilerek hata veren ekran */
function Crash(): never { throw new Error("e2e: bilerek hata"); }

/** Görevler sayfası günün planıyla (bugün kayıt adımı yoksa dikte/sesli görev seçilmez) */
function GorevlerRota() { const { plan } = usePlan(); return <GorevlerEkrani plan={plan} />; }
