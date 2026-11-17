/** İlk kurulum: zorlandığın durumlar → alan önceliği → günlük hedef ve Pomodoro → dinleme ve hedefler → seviye tespiti */
import { useState } from "preact/hooks";
import type { Profile } from "@dw/shared";
import { migrateDomainPriority } from "@dw/shared";
import { useApp, go } from "../state.ts";
import { ACTIVITY_TR } from "../core/planner.ts";

type Struggle = Profile["struggles"][number];
const STRUGGLES: [Struggle, string][] = [
  ["phone", "Telefon görüşmeleri"],
  ["spontaneous", "Hazırlıksız, kendiliğinden konuşmalar"],
  ["fast", "Hızlı konuşulan Almancayı anlamak"],
  ["work", "İş yerindeki konuşmalar"],
  ["bavarian", "Bavyera ağzını anlamak"],
  ["switch_english", "Yanlış anlamaktan korkup İngilizceye geçmek"]
];

/** Zorlanılan durumlara göre alan önceliği (kalan alanlar varsayılan sırada) */
export function derivePriority(struggles: Struggle[]): string[] {
  const first: string[] = [];
  if (struggles.includes("phone")) first.push("telefon");
  if (struggles.includes("work")) first.push("arbeit");
  if (struggles.includes("spontaneous") || struggles.includes("switch_english")) first.push("smalltalk");
  first.push("arzt", "amt");
  // strateji (anlamadığımda ne derim?) her zaman ilk sırada
  return migrateDomainPriority(first);
}

export function Onboarding() {
  const { profile, setProfile, index } = useApp();
  const [step, setStep] = useState(0);
  const [p, setLocal] = useState<Profile>(structuredClone(profile));
  const set = (f: (x: Profile) => void) => setLocal((old) => { const n = structuredClone(old); f(n); return n; });
  const dTitle = (id: string) => index?.domains.find((d) => d.id === id)?.title_tr || id;
  const steps = 5;

  const finish = async (toAssess: boolean) => {
    await setProfile({ ...p, onboardedAt: new Date().toISOString() });
    go(toAssess ? "assess" : "today");
  };

  return (
    <div class="stack">
      <div class="row between"><div class="kicker">Kurulum · {step + 1}/{steps}</div>{step > 0 && <button class="btn ghost sm" onClick={() => setStep(step - 1)}>‹ Geri</button>}</div>
      <div class="progress" aria-hidden="true"><i style={{ width: `${((step + 1) / steps) * 100}%` }} /></div>

      {step === 0 && (
        <section class="stack">
          <h1>Hoş geldin</h1>
          <p>Bu uygulama Almancayı gerçek hayatta konuşabilmen için hazırlandı: telefon, doktor, resmî daire, iş, komşular… Önce kelime ve kalıpları öğrenirsin, sonra cümle kurarsın, en sonunda da hazırlıksız konuşursun.</p>
          <div class="card small">
            <b>Gizlilik.</b> Senden kişisel bilgi istemiyoruz. İlerlemen bu cihazda saklanır. Açıklamalar Türkçe, örnekler ve sesler Almanca.
          </div>
          <button class="btn primary block" onClick={() => setStep(1)}>Başlayalım</button>
        </section>
      )}

      {step === 1 && (
        <section class="stack">
          <h1>Hangi durumlarda zorlanıyorsun?</h1>
          <p class="muted small">Birden fazla seçebilirsin. Planı buna göre sıralayacağız.</p>
          <div role="group" aria-label="Zorlandığın durumlar">
            {STRUGGLES.map(([k, label]) => {
              const on = p.struggles.includes(k);
              return (
                <button class={`opt${on ? " sel" : ""}`} aria-pressed={on} data-struggle={k}
                  onClick={() => set((x) => { x.struggles = on ? x.struggles.filter((s) => s !== k) : [...x.struggles, k]; })}>
                  {on ? "✓ " : ""}{label}
                </button>
              );
            })}
          </div>
          <button class="btn primary block" onClick={() => { set((x) => { x.domains.priority = derivePriority(x.struggles); }); setStep(2); }}>Devam</button>
        </section>
      )}

      {step === 2 && (
        <section class="stack">
          <h1>Öncelik sırası</h1>
          <p class="muted small">Gerçek hayattaki 13 durum. İstersen sırayı değiştir; ilk sıradakilerle başlarız.</p>
          <ol class="list card" style={{ paddingLeft: 0 }}>
            {p.domains.priority.map((d, i) => (
              <li class="row between" key={d}>
                <span class="grow"><b>{i + 1}.</b> {dTitle(d)}</span>
                <button class="iconbtn" aria-label={`${dTitle(d)} yukarı`} disabled={i === 0} onClick={() => set((x) => { const a = x.domains.priority; [a[i - 1], a[i]] = [a[i]!, a[i - 1]!]; })}>↑</button>
                <button class="iconbtn" aria-label={`${dTitle(d)} aşağı`} disabled={i === p.domains.priority.length - 1} onClick={() => set((x) => { const a = x.domains.priority; [a[i + 1], a[i]] = [a[i]!, a[i + 1]!]; })}>↓</button>
              </li>
            ))}
          </ol>
          <button class="btn primary block" onClick={() => setStep(3)}>Devam</button>
        </section>
      )}

      {step === 3 && (
        <section class="stack">
          <h1>Günlük hedef</h1>
          <p class="muted small">Pomodoro düzeni: 25 dakika odak, 5 dakika mola. Yalnızca gerçekten çalıştığın süre sayılır.</p>
          <label class="lbl" for="goal">Günlük odak hedefi</label>
          <select id="goal" class="input" value={p.focus.dailyGoalMin} onChange={(e) => set((x) => { x.focus.dailyGoalMin = Number((e.target as HTMLSelectElement).value); })}>
            {[45, 60, 80, 100, 120, 150].map((g) => <option value={g}>{g} dakika{g === 100 ? " (önerilen: 4 seans)" : ""}</option>)}
          </select>
          <div class="card">
            <div class="kicker">Önerilen 4 seans</div>
            <ol class="small" style={{ margin: 0, paddingLeft: 20 }}>
              {p.focus.sessionPlan.map((acts) => <li>{acts.map((a) => ACTIVITY_TR[a]).join(", ")}</li>)}
            </ol>
            <p class="tiny muted" style={{ marginTop: 8 }}>4. seanstan sonra isteğe bağlı {p.focus.longBreakMin} dakikalık uzun mola. Bunları Profil'den değiştirebilirsin.</p>
          </div>
          <button class="btn primary block" onClick={() => setStep(4)}>Devam</button>
        </section>
      )}

      {step === 4 && (
        <section class="stack">
          <h1>Son ayarlar</h1>
          <label class="lbl">Dinlemeye hangi hızla başlayalım?</label>
          <div class="seg" role="group">
            {(["slow", "normal"] as const).map((s) => (
              <button aria-pressed={p.listening.startSpeed === s} onClick={() => set((x) => { x.listening.startSpeed = s; })}>{s === "slow" ? "Yavaş" : "Normal"}</button>
            ))}
          </div>
          <label class="row" style={{ marginTop: 12 }}>
            <input type="checkbox" checked={p.goals.examB1.enabled} onChange={(e) => set((x) => { x.goals.examB1.enabled = (e.target as HTMLInputElement).checked; })} />
            <span>İleride B1 sınavına da hazırlanmak istiyorum</span>
          </label>
          {p.goals.examB1.enabled && (
            <div>
              <label class="lbl" for="exam">Sınav tarihi (isteğe bağlı)</label>
              <input id="exam" class="input" type="date" value={p.goals.examB1.date || ""} onInput={(e) => set((x) => { x.goals.examB1.date = (e.target as HTMLInputElement).value || undefined; })} />
            </div>
          )}
          <div class="card small">
            <b>Seviye tespiti.</b> Seviyeni varsaymıyoruz: 12–15 dakikalık pratik görevlerle (kelime, dinleme, cümle kurma, konuşma) başlangıç noktanı bulalım. Bilmediğin soruda "Bilmiyorum" demek tamamen normal.
          </div>
          <button class="btn primary block" onClick={() => finish(true)} data-test="start-assess">Seviye tespitine başla</button>
          <button class="btn ghost block" onClick={() => finish(false)}>Sonra yaparım</button>
        </section>
      )}
    </div>
  );
}
