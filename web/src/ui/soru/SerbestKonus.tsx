/**
 * PM-148 [ANA-V] md. 1: serbest sesli konuşma adımı. Durum + görev Türkçe; Almanca ipucu ve hazırlık dinletisi yok.
 * Öğrenci konuşur (her dokunuş bir parça; en az `en_az_cumle` cümle), "Bitirdim" der; sonra hedef listesi (çevrimdışı),
 * çevrimiçiyse öğretmen notu (`feedback_tr`), örnek cevap ve "Bir daha dene".
 * Karar 4: mikrofon yoksa yazılabilir ama adım "konuşuldu" sayılmaz (`onBitti(sesli=false)`).
 */
import { useEffect, useRef, useState } from "preact/hooks";
import { ERROR_TR, type AiOutput, type SerbestKonus } from "@dw/shared";
import { degerlendir, gizle, ornekCoz, type ProfilDegerleri } from "../../core/serbestKonus.ts";
import { ai, aiState, SOFT_WAIT_MS } from "../../services/ai.ts";
import { ApiError } from "../../services/api.ts";
import { speak, sttAvailable } from "../../services/speech.ts";
import { haptic } from "../../services/haptics.ts";
import { useApp } from "../../state.ts";
import { ActionBar, ListenButton, MicButton } from "../kit.tsx";

type Rapor = AiOutput<"feedback_tr">;

export function SerbestKonusAdimi({ k, profil, onBitti }: { k: SerbestKonus; profil: ProfilDegerleri; onBitti: (sesli: boolean) => void }) {
  const { api } = useApp();
  const mik = sttAvailable();
  const [parcalar, setParcalar] = useState<string[]>([]);
  const [yazarak, setYazarak] = useState(!mik);
  const [taslak, setTaslak] = useState("");
  /** en az bir parça yazıyla geldiyse adım konuşma sayılmaz (karar 4) */
  const [yazili, setYazili] = useState(false);
  const [bitti, setBitti] = useState(false);
  const [rapor, setRapor] = useState<Rapor | null>(null);
  const [aiDurum, setAiDurum] = useState<"yok" | "bekliyor" | "yavas" | "hata">("yok");
  const [aiHata, setAiHata] = useState<string | null>(null);
  const istek = useRef(0);
  // karşıdakinin sorusu bir kez kendiliğinden çalar (metni cevaptan sonra görünür)
  useEffect(() => { if (k.soru_de) void speak(k.soru_de, "de", "normal"); }, [k.id]);

  const metin = parcalar.join(" ");
  const sonuc = degerlendir(k, metin);
  const ekle = (t: string, sesli: boolean) => { const x = t.trim(); if (!x) return; setParcalar((p) => [...p, x]); if (!sesli) setYazili(true); };
  const ogretmen = async () => {
    if (!aiState(api).available) { setAiDurum("yok"); return; }
    const no = ++istek.current;
    setAiDurum("bekliyor"); setAiHata(null);
    const t = window.setTimeout(() => { if (istek.current === no) setAiDurum("yavas"); }, SOFT_WAIT_MS);
    try {
      // karar 2: yapay zekâya profil değeri ve ad gitmez; görev ve hedefler içerikten
      const r = await ai(api, "feedback_tr", {
        scene_tr: `${k.durum_tr} ${k.gorev_tr}`.slice(0, 800),
        goals: k.hedefler.map((h) => ({ id: h.id, de: `${h.kaliplar.join(" / ")} (${h.tr})`.slice(0, 200) })),
        transcript: [...(k.soru_de ? [{ r: "partner" as const, de: k.soru_de }] : []), { r: "learner" as const, de: gizle(metin, profil).slice(0, 600) }]
      });
      if (istek.current !== no) return;
      setRapor(r); setAiDurum("yok");
    } catch (e) {
      if (istek.current !== no) return;
      setAiDurum("hata"); setAiHata(e instanceof ApiError ? e.message_tr : ERROR_TR.internal.message_tr);
    } finally { clearTimeout(t); }
  };
  const bitir = () => { setBitti(true); haptic(sonuc.yeter ? "success" : "selection"); void ogretmen(); };
  const yeniden = () => { istek.current++; setParcalar([]); setYazili(false); setTaslak(""); setBitti(false); setRapor(null); setAiDurum("yok"); setYazarak(!mik); };

  if (!bitti) return (
    <section class="stack fade" data-test="akis-serbest">
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Serbest konuşma</div>
        <p class="small muted" style={{ margin: "4px 0 0" }} data-test="serbest-durum">{k.durum_tr}</p>
        <h2 style={{ margin: "6px 0 0" }} data-test="serbest-gorev">{k.gorev_tr}</h2>
        <p class="tiny muted" style={{ margin: "6px 0 0" }}>Hazırlık yok. Bildiğin gibi, en az {k.en_az_cumle} cümle söyle.</p>
      </div>
      {k.soru_de && (
        <div class="row" style={{ justifyContent: "center", alignItems: "center", gap: 10 }} data-test="serbest-soru">
          <span class="small muted">Karşındaki sana bir şey söyledi:</span>
          <ListenButton text={k.soru_de} label="Yine dinle" metinGizli kim={k.konusan} />
        </div>
      )}
      {parcalar.length > 0 && (
        <section class="card stack" style={{ gap: 6 }} data-test="serbest-dokum" aria-live="polite">
          <div class="tiny muted">Söylediklerin</div>
          {parcalar.map((p) => <div lang="de">{p}</div>)}
        </section>
      )}
      {!yazarak && (
        <div class="stack" style={{ alignItems: "center", gap: 8 }}>
          <MicButton wide birincil={!parcalar.length} onText={(t) => ekle(t, true)} label={parcalar.length ? "Bir cümle daha söyle" : "Dokun ve konuş"} />
          <button class="ikincil-eylem" style={{ alignSelf: "center" }} data-test="serbest-yazarak" onClick={() => setYazarak(true)}>Yazarak cevapla</button>
        </div>
      )}
      {yazarak && (
        <div class="stack" style={{ gap: 6 }}>
          {!mik && <p class="tiny muted" style={{ margin: 0 }} data-test="serbest-mik-yok">Mikrofon yok: yazarak cevaplarsın. Yazılan cevap konuşma sayılmaz.</p>}
          <textarea class="input" rows={3} lang="de" autocapitalize="sentences" spellcheck={false} value={taslak} data-test="serbest-yazi" aria-label="Cevabını Almanca yaz"
            onInput={(e) => setTaslak((e.target as HTMLTextAreaElement).value)} />
          <button class="btn" data-test="serbest-ekle" disabled={!taslak.trim()} onClick={() => { ekle(taslak, false); setTaslak(""); }}>Ekle</button>
          {mik && <button class="ikincil-eylem" style={{ alignSelf: "center" }} onClick={() => setYazarak(false)}>Konuşarak cevapla</button>}
        </div>
      )}
      <ActionBar>
        {/* tek birincil eylem: konuşmadan önce mikrofon, sonra "Bitirdim" */}
        <button class={parcalar.length ? "btn primary" : "btn"} style={{ width: "100%" }} data-test="serbest-bitirdim" disabled={!parcalar.length} onClick={bitir}>Bitirdim</button>
      </ActionBar>
    </section>
  );

  const ornek = ornekCoz(k.ornek_de, profil);
  return (
    <section class="stack fade" data-test="akis-serbest-sonuc" data-sesli={yazili ? "0" : "1"} data-hedef={`${sonuc.tamam}/${sonuc.hedefler.length}`}>
      <div>
        <div class="kicker icerik" style={{ color: "var(--accent)" }}>Serbest konuşma</div>
        <h2 style={{ margin: 0 }}>{sonuc.yeter ? `${sonuc.cumle} cümle söyledin` : `${sonuc.cumle} cümle: bir daha dene, en az ${k.en_az_cumle}`}</h2>
        {yazili && <p class="tiny muted" style={{ margin: "4px 0 0" }} data-test="serbest-yazili">Yazarak cevapladın: bugün konuşma sayılmaz.</p>}
      </div>
      <section class="card stack" style={{ gap: 6 }} data-test="serbest-hedefler">
        {sonuc.hedefler.map((h) => (
          <div class="row" style={{ gap: 8, flexWrap: "nowrap", alignItems: "baseline" }} data-tamam={h.tamam ? "1" : "0"}>
            <span aria-hidden="true">{h.tamam ? "✓" : "○"}</span>
            <span class={h.tamam ? "" : "muted"}>{h.tamam ? h.tr : `Bunu da söyleyebilirsin: ${h.tr}`}</span>
          </div>
        ))}
      </section>
      {aiDurum === "bekliyor" && <p class="small muted" style={{ margin: 0 }} data-test="serbest-ai-bekliyor">Öğretmen notu hazırlanıyor…</p>}
      {aiDurum === "yavas" && (
        <div class="stack" style={{ gap: 6 }} data-test="serbest-ai-yavas">
          <p class="small muted" style={{ margin: 0 }}>Biraz uzun sürüyor. Bekleyebilir ya da notsuz devam edebilirsin.</p>
          <button class="ikincil-eylem" style={{ alignSelf: "flex-start" }} onClick={() => void ogretmen()}>Tekrar dene</button>
        </div>
      )}
      {aiDurum === "hata" && (
        <div class="stack" style={{ gap: 6 }} data-test="serbest-ai-hata">
          <p class="small muted" style={{ margin: 0 }}>{aiHata}</p>
          <button class="ikincil-eylem" style={{ alignSelf: "flex-start" }} onClick={() => void ogretmen()}>Tekrar dene</button>
        </div>
      )}
      {rapor && (
        <section class="card stack" style={{ gap: 6 }} data-test="serbest-rapor">
          <div class="tiny muted">Öğretmen notu</div>
          {rapor.summary_tr && <p class="small" style={{ margin: 0 }}>{rapor.summary_tr}</p>}
          {rapor.fixes.map((f) => <div class="small"><span lang="de" class="muted">{f.said}</span> → <b lang="de">{f.better}</b><br /><span class="tiny muted">{f.why_tr}</span></div>)}
        </section>
      )}
      <section class="card stack" style={{ gap: 6 }} data-test="serbest-ornek">
        <div class="tiny muted">Böyle de söylenebilir</div>
        {k.soru_de && <div class="small muted" lang="de">– {k.soru_de}</div>}
        <div class="row" style={{ flexWrap: "nowrap", gap: 10, alignItems: "center" }}>
          <span class="grow"><b lang="de">{ornek}</b><br /><span class="small muted">{k.ornek_tr}</span></span>
          <ListenButton text={ornek.replace(/…/g, "")} small slowToggle={false} />
        </div>
      </section>
      <ActionBar>
        <div class="row" style={{ gap: 8, flexWrap: "nowrap", width: "100%" }}>
          <button class="btn" style={{ flex: 1 }} data-test="serbest-yeniden" onClick={yeniden}>Bir daha dene</button>
          <button class="btn primary" style={{ flex: 1 }} data-test="akis-devam" onClick={() => { istek.current++; onBitti(!yazili); }}>Devam et</button>
        </div>
      </ActionBar>
    </section>
  );
}
