/**
 * "A2'den başla" (PM-114 B; PM-084 seviye tanıma listesi).
 *  - `BaslangicSecimi`: tek soru "Nereden başlayalım?" (ilk kurulum ve Ayarlar). "A2'den" yalnız A2 günleri paketteyse.
 *  - `SeviyeYoklama` (`#/seviye`): A1 hafta sonu testlerinden kısa yoklama (≈16 madde, 5–7 dk); yeni içerik yok, XP yok.
 *  - `SeviyeSonuc` (`#/seviye/sonuc`): #244'ün diliyle. ≥ %80 "A2'ye hazırsın" + 9. haftadan başla; altında zorlanılan
 *    "yapabiliyorum" cümleleri gün gün + "Bunları tekrar et" + "Yine de A2'den başla" / "A1'in N. haftasından başla". Kilit yok.
 */
import { useEffect, useState } from "preact/hooks";
import type { Drill } from "@dw/shared";
import { go, useApp } from "../state.ts";
import { a2Var, enErkenZayif, gecti, haftaBasi, SEVIYE, yoklamaDk, yoklamaSec, yoklamaZayif, type YoklamaMadde } from "../core/seviye.ts";
import { haftaOf } from "../core/gun.ts";
import { personalizeDeep } from "../core/persona.ts";
import { baslangicOku, baslangicYaz, yoklamaSonOku, yoklamaSonYaz, yoklamaTestleri, type YoklamaSon } from "../services/seviye.ts";
import { DrillView, type DrillSonuc } from "../ui/drill.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { ActionBar, ProgressHeader } from "../ui/kit.tsx";

const BASLIK = "Kısa yoklama";
const a2Hafta = haftaOf(SEVIYE.a2_ilk_gun);

/** Başlangıç cümlesi: "Baştan (A1)", "A2'den (9. hafta)", "A1'in 3. haftasından" */
export const baslangicAdi = (gun: number) => (gun <= 1 ? "Baştan (A1)" : gun >= SEVIYE.a2_ilk_gun ? `A2'den (${a2Hafta}. hafta)` : `A1'in ${haftaOf(gun)}. haftasından`);

/** Yoklamanın maddeleri (paketteki A1 hafta sonu testlerinden; her açılışta aynı seçim) */
function useYoklama() {
  const { index, profile } = useApp();
  const [v, setV] = useState<YoklamaMadde[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!index) return;
    setErr(null);
    yoklamaTestleri(index).then((t) => setV(yoklamaSec(t).map((m) => ({ ...m, d: personalizeDeep(m.d, { name: profile.displayName, address: profile.address }) }))))
      .catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, n]);
  return { maddeler: v, err, yenile: () => setN((x) => x + 1) };
}

/** Başlangıcı uygula ve Bugün'e dön (yanlış maddelerin kartları hemen tekrara düşer) */
function useBasla() {
  const { index, toast } = useApp();
  const [mesgul, setMesgul] = useState(false);
  const basla = async (gun: number, yanlis: readonly Drill[] = []) => {
    if (!index || mesgul) return;
    setMesgul(true);
    try { await baslangicYaz(gun, index, yanlis); toast(gun <= 1 ? "1. günden başlıyorsun" : `${haftaOf(gun)}. haftadan başlıyorsun`); go("today"); }
    catch { toast("Kaydedilemedi; tekrar dene."); setMesgul(false); }
  };
  return { basla, mesgul };
}

/**
 * "Nereden başlayalım?" — ilk kurulumda (`onSec` adımı ilerletir) ve Ayarlar'da (seçim hemen uygulanır; "A2'den" yoklamaya gider).
 * Ayarlar'da "Baştan (A1)" tek onayla: atlanan işaretler kalkar, bitirdiğin günler kalır.
 */
export function BaslangicSecimi({ kurulum, secili, onSec }: { kurulum?: boolean; secili?: "a1" | "a2"; onSec?: (x: "a1" | "a2") => void }) {
  const { index } = useApp();
  const [bas, setBas] = useState<number | null>(kurulum ? 1 : null);
  const [onay, setOnay] = useState(false);
  const { basla, mesgul } = useBasla();
  useEffect(() => { if (!kurulum) void baslangicOku().then(setBas).catch(() => setBas(1)); }, []);
  const a2 = !!index && a2Var(index.m1.map((g) => g.day));
  const simdi = kurulum ? secili : bas === null ? undefined : bas >= SEVIYE.a2_ilk_gun ? "a2" : "a1";
  const sec = (x: "a1" | "a2") => {
    if (kurulum) return onSec?.(x);
    if (x === "a2") return go("seviye");
    if ((bas ?? 1) > 1) setOnay(true);
  };
  return (
    <div class="stack baslangic" data-test="baslangic-secimi" style={{ gap: 8 }}>
      {!kurulum && bas !== null && <p class="small muted" data-test="baslangic-simdi" style={{ margin: 0 }}>Şu an: <b>{baslangicAdi(bas)}</b></p>}
      <button class={`opt baslangic-opt${simdi === "a1" ? " sel" : ""}`} aria-pressed={simdi === "a1"} data-test="baslangic-a1" onClick={() => sec("a1")}>
        <span class="baslangic-ic"><b>Baştan (A1)</b><span class="small muted">1. günden başlarsın: kendini tanıtma, sayılar, randevu…</span></span>
      </button>
      <button class={`opt baslangic-opt${simdi === "a2" ? " sel" : ""}`} aria-pressed={simdi === "a2"} data-test="baslangic-a2" disabled={!a2} onClick={() => sec("a2")}>
        <span class="baslangic-ic"><b>A2'den</b><span class="small muted">{a2 ? `Önce 5–7 dakikalık kısa bir yoklama; sonra ${a2Hafta}. haftadan başlarsın.` : "A2'nin günleri hazırlanıyor; hazır olunca buradan seçebilirsin."}</span></span>
      </button>
      {onay && (
        <section class="card stack" data-test="baslangic-a1-soru" style={{ gap: 8 }}>
          <p style={{ margin: 0 }}>Baştan başlarsan 1. gün açılır. Bitirdiğin günler ve kelimelerin kalır; atlanan günleri sırayla yaparsın.</p>
          <div class="row" style={{ gap: 8 }}>
            <button class="btn primary sm" data-test="baslangic-a1-onay" disabled={mesgul} onClick={() => void basla(1)}>Baştan başla</button>
            <button class="btn ghost sm" onClick={() => setOnay(false)}>Vazgeç</button>
          </div>
        </section>
      )}
    </div>
  );
}

export function SeviyeYoklama() {
  const { index } = useApp();
  const { maddeler, err, yenile } = useYoklama();
  const [basladi, setBasladi] = useState(false);
  const [q, setQ] = useState(0);
  const [dogru, setDogru] = useState(0);
  const [yanlis, setYanlis] = useState<string[]>([]);
  const [bitti, setBitti] = useState(false);
  const { basla, mesgul } = useBasla();
  if (err) return <div class="stack"><ProgressHeader title={BASLIK} back="#/today" /><ErrorPanel message={err} onRetry={yenile} /></div>;
  // son cevaptan sonra sonuç yazılırken eski soru ekranda kalmaz
  if (!maddeler || !index || bitti) return <Loading />;
  const a2 = a2Var(index.m1.map((g) => g.day));
  if (!maddeler.length) return (
    <div class="stack" data-test="yoklama-yok">
      <ProgressHeader title={BASLIK} back="#/today" />
      <section class="card stack"><h2>Yoklama henüz hazır değil</h2><p>A1 haftalarının testleri hazırlanıyor. İstersen yoklamasız da başlayabilirsin; karar senin.</p></section>
      <ActionBar><div class="stack">
        {a2 && <button class="btn primary block" data-test="a2-yine" disabled={mesgul} onClick={() => void basla(SEVIYE.a2_ilk_gun)}>A2'den başla</button>}
        <a class="btn block" href="#/today" data-test="bugune-don">Bugüne dön</a></div></ActionBar>
    </div>
  );
  const toplam = maddeler.length;
  const haftalar = new Set(maddeler.map((m) => m.hafta)).size;
  if (!basladi) return (
    <div class="stack" data-test="yoklama-giris" data-toplam={toplam}>
      <ProgressHeader title={BASLIK} back="#/today" />
      <section class="card stack">
        <h2>Nereden başlayacağını birlikte bulalım</h2>
        <p>A1'in {haftalar} haftasından {toplam} soru: dinleme ve yazma karışık. Yaklaşık {yoklamaDk(toplam)} dakika.</p>
        <p class="small muted">Bilmediğinde "Bilmiyorum" de; puan yok. Sonuç yalnız bir öneri, karar senin.</p>
      </section>
      <ActionBar><button class="btn primary block" data-test="yoklama-basla" onClick={() => { setBasladi(true); window.scrollTo(0, 0); }}>Başla</button></ActionBar>
    </div>
  );
  const m = maddeler[q]!;
  const sonra = (r: DrillSonuc) => {
    const y = r === "wrong" ? [...yanlis, m.d.id] : yanlis;
    const d = dogru + (r === "wrong" ? 0 : 1);
    setYanlis(y); setDogru(d); window.scrollTo(0, 0);
    if (q + 1 >= toplam) { setBitti(true); void yoklamaSonYaz({ dogru: d, toplam, yanlis: y, maddeler: maddeler.map((x) => x.d.id) }).then(() => go("seviye/sonuc")); }
    else setQ(q + 1);
  };
  return (
    <div class="stack" data-test="yoklama" data-q={q} data-hafta={m.hafta}>
      <ProgressHeader title={BASLIK} back="#/today" ilerleme={{ n: q, toplam }} />
      <DrillView key={`${m.hafta}:${m.d.id}`} d={m.d} sira={`${q + 1}/${toplam}`} onDone={sonra} />
    </div>
  );
}

/** Sonuç: #244'ün diliyle; öğrenci kilitlenmez, iki seçenek her zaman ekranda */
export function SeviyeSonuc() {
  const { index } = useApp();
  const { maddeler, err, yenile } = useYoklama();
  const [son, setSon] = useState<YoklamaSon | null | "yok">(null);
  const { basla, mesgul } = useBasla();
  useEffect(() => { void yoklamaSonOku().then((x) => setSon(x ?? "yok")).catch(() => setSon("yok")); }, []);
  if (err) return <div class="stack"><ProgressHeader title={BASLIK} back="#/today" /><ErrorPanel message={err} onRetry={yenile} /></div>;
  if (!son || !maddeler || !index) return <Loading />;
  if (son === "yok") return (
    <div class="stack" data-test="yoklama-sonuc-yok">
      <ProgressHeader title={BASLIK} back="#/today" />
      <section class="card stack"><h2>Henüz sonuç yok</h2><p>Kısa yoklamayı henüz çözmedin.</p><a class="btn sm" href="#/seviye" data-test="yoklama-coz">Yoklamayı çöz</a></section>
    </div>
  );
  // sonuç yalnız bu yoklamanın maddeleriyle (paket değiştiyse eşleşmeyen madde zayıf listeye girmez)
  const bu = maddeler.filter((x) => son.maddeler.includes(x.d.id));
  const yanlis = new Set(son.yanlis);
  const ok = gecti(son.dogru, son.toplam);
  const zayif = ok ? [] : yoklamaZayif(bu, yanlis);
  const erken = ok ? null : enErkenZayif(bu, yanlis);
  const a1Gun = haftaBasi(erken ?? 1);
  const yanlisDrill = bu.filter((x) => yanlis.has(x.d.id)).map((x) => x.d);
  const a2 = a2Var(index.m1.map((g) => g.day));
  return (
    <div class="stack" data-test="yoklama-sonuc" data-dogru={son.dogru} data-toplam={son.toplam} data-gecti={ok ? "1" : "0"} data-erken={erken ?? ""}>
      <ProgressHeader title={BASLIK} back="#/today" ilerleme={{ n: son.toplam, toplam: son.toplam }} />
      <section class="card stack">
        <h2>{son.dogru}/{son.toplam} doğru</h2>
        {ok
          ? <p>A2'ye hazırsın. A1'in öğrettiklerini kullanabiliyorsun.</p>
          : zayif.length
            ? <p>A1'in bazı yerleri henüz tam oturmadı. Şunları yaparken zorlandın:</p>
            : <p>A1'in bazı yerleri henüz tam oturmadı. İstersen önce o haftanın günlerinden başla; karar senin.</p>}
        {zayif.length > 0 && <ol class="zayif-liste" data-test="zayif-liste">{zayif.map((z) => (
          <li class="row" data-test={`zayif-${z.gun}`} data-gun={z.gun}>
            <a class="grow zayif-cumle" href={`#/seviye/tekrar/${z.gun}`} data-test={`zayif-tekrar-${z.gun}`} aria-label={`${z.gun}. günü tekrar et: ${z.tr}`}>
              <span class="tiny muted">{haftaOf(z.gun)}. HAFTA · {z.gun}. GÜN · {z.dogru}/{z.toplam} DOĞRU</span>
              <span class="zayif-tr">{z.tr}</span>
            </a>
            <a class="rehber-btn" href={`#/rehber/${z.gun}`} aria-label={`${z.gun}. günün rehberi`}>Rehber</a>
          </li>))}</ol>}
        {!ok && <p class="small muted">Nereden başlayacağına sen karar verirsin; sonra Ayarlar'dan değiştirebilirsin.</p>}
      </section>
      <ActionBar>
        {ok
          ? <div class="stack">
              <button class="btn primary block" data-test="a2-basla" disabled={mesgul || !a2} onClick={() => void basla(SEVIYE.a2_ilk_gun, yanlisDrill)}>{a2Hafta}. haftadan başla</button>
              <a class="btn block" href="#/today" data-test="bugune-don">Bugüne dön</a></div>
          : <div class="stack">
              {zayif.length > 0 && <a class="btn primary block" href={`#/seviye/tekrar/${zayif.map((z) => z.gun).join(",")}`} data-test="zayif-tekrar">Bunları tekrar et</a>}
              <button class={`btn block${zayif.length ? "" : " primary"}`} data-test="a1-hafta-basla" disabled={mesgul} onClick={() => void basla(a1Gun, yanlisDrill)}>{a1Gun <= 1 ? "A1'in başından başla" : `A1'in ${haftaOf(a1Gun)}. haftasından başla`}</button>
              {a2 && <button class="btn ghost block" data-test="a2-yine" disabled={mesgul} onClick={() => void basla(SEVIYE.a2_ilk_gun, yanlisDrill)}>Yine de A2'den başla</button>}
            </div>}
      </ActionBar>
    </div>
  );
}
