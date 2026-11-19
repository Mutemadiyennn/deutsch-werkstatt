/** Profil ve ayarlar: odak/Pomodoro, seans planı, alan önceliği, dinleme, hedefler, görünüm, sunucu durumu, yedek, v1 arşivi */
import { Icon } from "../ui/icons.tsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { Activity, type Profile } from "@dw/shared";
import { useApp } from "../state.ts";
import { auth } from "../services/auth.ts";
import { exportAll } from "../data/db.ts";
import { persistState, type PersistState } from "../services/storage.ts";
import { ACTIVITY_TR, V1_URL } from "../core/planner.ts";
import { ApiError } from "../services/api.ts";
import { aiState, onAiState } from "../services/ai.ts";
import { TopBar } from "../ui/components.tsx";

const ACTS = Activity.options.filter((a) => a !== "assess" && a !== "other");

export function ProfileView() {
  const [persist, setPersist] = useState<PersistState | undefined>();
  useEffect(() => { void persistState().then(setPersist).catch(() => {}); }, []);
  const [, tick] = useState(0);
  useEffect(() => onAiState(() => tick((n) => n + 1)), []); // sağlayıcı yoklaması sonrası yeniden çiz
  const { profile, setProfile, index, api, toast, user } = useApp();
  const [srv, setSrv] = useState<string | null>(null);
  // Art arda iki değişiklik (ör. adı yazıp hemen hitabı seçmek) aynı eski kopyadan yazılırsa ikincisi birincisini siler:
  // ad kaybolur ve yapay zekâya giden metinde ad "[Name]" ile değiştirilemez (D-061; inceleme #66). Kayıtlar sıraya
  // girer ve her biri bir önceki kaydın sonucunun üstüne yazılır.
  const son = useRef<Profile>(profile);
  const sira = useRef<Promise<unknown>>(Promise.resolve());
  useEffect(() => { son.current = profile; }, [profile]);
  const adZaman = useRef<ReturnType<typeof setTimeout>>();
  const adBekleyen = useRef<string | null>(null);
  const adKaydet = (v: string) => { adBekleyen.current = null; const ad = v.trim() || undefined; if (ad !== son.current.displayName) void save((p) => { p.displayName = ad; }); };
  // ekrandan bekleme dolmadan çıkılırsa yazılan ad yine kaydedilir
  useEffect(() => () => { clearTimeout(adZaman.current); if (adBekleyen.current !== null) adKaydet(adBekleyen.current); }, []);
  const save = (f: (p: Profile) => void) => {
    const is = sira.current.then(async () => {
      const n = structuredClone(son.current); f(n);
      try { await setProfile(n); son.current = n; toast("Kaydedildi"); } catch { toast("Geçersiz değer; kaydedilmedi."); }
    });
    sira.current = is.catch(() => {});
    return is;
  };
  const dTitle = (id: string) => index?.domains.find((d) => d.id === id)?.title_tr || id;
  const num = (e: Event) => Number((e.target as HTMLSelectElement).value);

  const checkServer = async () => {
    setSrv("Kontrol ediliyor…");
    try {
      const h = await api.health();
      let line = `Sunucu çalışıyor (sürüm ${h.version}). ${h.provider && h.provider !== "gemini" ? "Yapay zekâ kapalı; dersler cihazda değerlendirilir." : "Yapay zekâ açık."}`;
      try { const u = await api.usage(); line += ` Bugünkü yapay zekâ kullanımı: ${u.ai.used}/${u.ai.limit}.`; } catch (e) { line += ` Hesap erişimi: ${e instanceof ApiError ? e.message_tr : "hata"}`; }
      setSrv(line);
    } catch (e) { setSrv(e instanceof ApiError ? e.message_tr : "Sunucuya ulaşılamadı."); }
  };
  const download = async () => {
    const data = await exportAll();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 1)], { type: "application/json" }));
    a.download = `deutsch-werkstatt-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  };

  return (
    <div class="stack">
      <TopBar title="Profil ve ayarlar" />

      <section class="card">
        <h2>Odak ve Pomodoro</h2>
        <label class="lbl" for="goal">Günlük odak hedefi</label>
        <select id="goal" class="input" value={profile.focus.dailyGoalMin} onChange={(e) => save((p) => { p.focus.dailyGoalMin = num(e); })} data-test="goal">
          {[45, 60, 80, 100, 120, 150].map((g) => <option value={g}>{g} dk</option>)}
        </select>
        <div class="row" style={{ gap: 12 }}>
          <div class="grow"><label class="lbl" for="work">Odak</label><select id="work" class="input" value={profile.focus.workMin} onChange={(e) => save((p) => { p.focus.workMin = num(e); })}>{[20, 25, 30, 45, 50].map((x) => <option value={x}>{x} dk</option>)}</select></div>
          <div class="grow"><label class="lbl" for="brk">Mola</label><select id="brk" class="input" value={profile.focus.breakMin} onChange={(e) => save((p) => { p.focus.breakMin = num(e); })}>{[3, 5, 10].map((x) => <option value={x}>{x} dk</option>)}</select></div>
          <div class="grow"><label class="lbl" for="lbrk">Uzun mola</label><select id="lbrk" class="input" value={profile.focus.longBreakMin} onChange={(e) => save((p) => { p.focus.longBreakMin = num(e); })}>{[15, 20, 30].map((x) => <option value={x}>{x} dk</option>)}</select></div>
        </div>
        <label class="lbl">Seans planı (öneri; istediğin zaman değiştirebilirsin)</label>
        {profile.focus.sessionPlan.map((acts, i) => (
          <div class="row" style={{ marginBottom: 6, flexWrap: "nowrap" }}>
            <span style={{ width: 70 }} class="small"><b>Seans {i + 1}</b></span>
            <select class="input" aria-label={`Seans ${i + 1} etkinliği`} value={acts[0]} onChange={(e) => save((p) => { const v = (e.target as HTMLSelectElement).value as Activity; p.focus.sessionPlan[i] = [v, ...p.focus.sessionPlan[i]!.filter((a) => a !== v)].slice(0, 3); })}>
              {ACTS.map((a) => <option value={a}>{ACTIVITY_TR[a]}</option>)}
            </select>
          </div>
        ))}
        <label class="lbl" for="wk">Haftalık hedef</label>
        <select id="wk" class="input" value={profile.focus.weekly.days} onChange={(e) => save((p) => { p.focus.weekly.days = num(e); p.focus.weekly.minPerDay = p.focus.dailyGoalMin; })}>{[3, 4, 5, 6, 7].map((d) => <option value={d}>Haftada {d} gün × {profile.focus.dailyGoalMin} dk</option>)}</select>
      </section>

      <section class="card">
        <h2>Alan önceliği</h2>
        <ol class="list" style={{ paddingLeft: 0 }}>
          {profile.domains.priority.map((d, i) => {
            const paused = profile.domains.paused.includes(d);
            return (
              <li class="row" style={{ flexWrap: "nowrap" }}>
                <span class="grow small" style={{ opacity: paused ? 0.5 : 1 }}><b>{i + 1}.</b> {dTitle(d)}</span>
                <button class="iconbtn" aria-label={`${dTitle(d)} yukarı`} disabled={i === 0} onClick={() => save((p) => { const a = p.domains.priority; [a[i - 1], a[i]] = [a[i]!, a[i - 1]!]; })}>↑</button>
                <button class="iconbtn" aria-label={paused ? `${dTitle(d)} devam` : `${dTitle(d)} duraklat`} onClick={() => save((p) => { p.domains.paused = paused ? p.domains.paused.filter((x) => x !== d) : [...p.domains.paused, d]; })}>{paused ? <Icon name="play" size={18} /> : <Icon name="pause" size={18} />}</button>
              </li>
            );
          })}
        </ol>
      </section>

      <section class="card">
        <h2>Dinleme ve hedefler</h2>
        <label class="lbl">Dinlemeye başlangıç hızı</label>
        <div class="seg" role="group">{(["slow", "normal"] as const).map((s) => <button aria-pressed={profile.listening.startSpeed === s} onClick={() => save((p) => { p.listening.startSpeed = s; })}>{s === "slow" ? "Yavaş" : "Normal"}</button>)}</div>
        <p class="tiny muted" data-test="hiz-aciklama">{profile.listening.startSpeed === "slow" ? "Her cümle ilk kez yavaş çalınır, tekrarında normal hızda. \"Yavaş\" düğmesi her zaman yavaş çalar." : "Cümleler normal hızda çalınır; \"Yavaş\" düğmesiyle yavaşlatabilirsin."}</p>
        <label class="row" style={{ marginTop: 12 }}><input type="checkbox" checked={profile.goals.examB1.enabled} onChange={(e) => save((p) => { p.goals.examB1.enabled = (e.target as HTMLInputElement).checked; })} /><span>B1 sınavına hazırlık (isteğe bağlı)</span></label>
        {profile.goals.examB1.enabled && <input class="input" type="date" aria-label="Sınav tarihi" value={profile.goals.examB1.date || ""} onChange={(e) => save((p) => { p.goals.examB1.date = (e.target as HTMLInputElement).value || undefined; })} />}
        <p class="small" style={{ marginTop: 12 }}><a href="#/assess">Yeniden ölç (aylık ölçüm)</a></p>
      </section>

      <section class="card">
        <h2>Görünüm</h2>
        <label class="lbl">Tema</label>
        <div class="seg" role="group">{([["auto", "Otomatik"], ["light", "Açık"], ["dark", "Koyu"]] as const).map(([k, l]) => <button aria-pressed={profile.ui.theme === k} onClick={() => save((p) => { p.ui.theme = k; })}>{l}</button>)}</div>
        <label class="lbl" for="ts">Yazı boyutu</label>
        <select id="ts" class="input" value={profile.ui.textScale} onChange={(e) => save((p) => { p.ui.textScale = num(e); })}>{[[0.9, "Küçük"], [1, "Normal"], [1.15, "Büyük"], [1.3, "Çok büyük"]].map(([v, l]) => <option value={v}>{l}</option>)}</select>
        <label class="row" style={{ marginTop: 12 }}><input type="checkbox" checked={profile.ui.sfx} onChange={(e) => save((p) => { p.ui.sfx = (e.target as HTMLInputElement).checked; })} /><span>Mola zili ve sesler</span></label>
        <label class="lbl" for="nm">Adın (isteğe bağlı)</label>
        {/* Ad yazarken kaydedilir (kısa bekleme) ve alan bırakılınca hemen; yalnızca "change" olayına bağlı kalınmaz: iPhone'da
            alan odaktayken hitap düğmesine dokunmak alanı bırakmayabilir ve ad hiç kaydedilmezdi (D-061; #68 inceleme).
            Alan denetimsiz (defaultValue): başka bir ayarın kaydı yazılmakta olan adı eski değere döndürmez. */}
        <input id="nm" class="input" maxLength={40} autoComplete="off" defaultValue={profile.displayName || ""}
          onInput={(e) => { const v = (e.target as HTMLInputElement).value; adBekleyen.current = v; clearTimeout(adZaman.current); adZaman.current = setTimeout(() => adKaydet(v), 350); }}
          onBlur={(e) => { clearTimeout(adZaman.current); adKaydet((e.target as HTMLInputElement).value); }} />
        <label class="lbl">Almancada hitap (isteğe bağlı)</label>
        <div class="seg" role="group" aria-label="Hitap">{([[undefined, "Seçme"], ["Herr", "Herr"], ["Frau", "Frau"]] as const).map(([k, l]) => <button aria-pressed={profile.address === k} onClick={() => save((p) => { p.address = k; })} data-address={k || "none"}>{l}</button>)}</div>
        <p class="tiny muted">Ad ve hitap yalnızca bu cihazda kalır; diyaloglarda senin satırlarına yerleşir. Sunucuya ve yapay zekâya ad gönderilmez, yalnızca hitap gider.</p>
      </section>

      <section class="card">
        <h2>Sunucu ve veriler</h2>
        {aiState(api).available ? <>
          <p class="small muted">Yapay zekâ özellikleri anahtarları güvenle tutan sunucu üzerinden çalışır. Anahtar bu uygulamada bulunmaz.</p>
          <button class="btn sm" onClick={checkServer}>Sunucu bağlantısını kontrol et</button>
        </> : <p class="small muted" data-test="no-server">Bu sürüm internete ve yapay zekâya ihtiyaç duymaz: dersler, cevap değerlendirmesi ve rol oyunu bu cihazda çalışır.</p>}
        {srv && <p class="small" style={{ marginTop: 8 }} data-test="server">{srv}</p>}
        <p class="small" style={{ marginTop: 8 }} data-test="persist">{persist === "persisted" ? "İlerlemen bu cihazda kalıcı olarak saklanıyor. Telefon değiştirmeden önce yedek indir." : persist === "best-effort" ? "İlerlemen bu cihazda saklanıyor; telefonda yer azalırsa tarayıcı silebilir. Ara sıra yedek indir." : "İlerlemen bu cihazda saklanıyor. Ara sıra yedek indir."}</p>
        <div class="row" style={{ marginTop: 12 }}>
          <button class="btn sm" onClick={download}>Yedeği indir (JSON)</button>
          <a class="btn sm" href={V1_URL} target="_blank" rel="noopener">Arşiv: v1 uygulaması <Icon name="out" size={16} /></a>
        </div>
      </section>

      <section class="card">
        <p class="small muted">Giriş yapılan hesap: {user?.email || "Google hesabı"}</p>
        <div class="row">
          <a class="btn sm" href="#/onboarding">Kurulumu yeniden yap</a>
          <button class="btn sm" onClick={() => auth.signOut()}>Çıkış yap</button>
        </div>
      </section>
    </div>
  );
}
