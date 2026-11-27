/**
 * A1 seviye tespiti ekranları (PM-115 PR 2b; hedef ekran PM-120 md. 4 tel kafes tarifi). Motor `core/tespit.ts`, depo `services/tespit.ts`.
 *  - `TespitEkrani` (`#/seviye`): (a) giriş / sürdür, (b) madde + "Bilmiyorum", (c) bölüm arası. Madde sonrası doğru/yanlış
 *    gösterilmez (#247 gibi); her cevap anında cihaza yazılır.
 *  - `TespitRaporu` (`#/seviye/rapor`): karar kartı, beceriler, haftalar, zayıf listeler, "Raporu kopyala", karara göre tek birincil.
 *  - `TespitPlanAra` (`#/seviye/plan`, PM-124 md. 4.1): "Planımı gör"ün PR 3'e kadarki hâli; zorlanılan cümleler (Rehber +
 *    "Bunları tekrar et", #244'ün tekrar akışı) ve tek satır not. A2 kapalı kalır.
 *  Bugün davet kartı, Ben durumu ve Ayarlar'daki elle değiştirme `ui/tespitDurum.tsx`. Ekranlar sınav günüyle birlikte ayrı
 *  parçada (`app.tsx` `SeviyeRota`, PM-124 md. 4.2); deneme kartı `ui/denemeMadde.tsx` sınav günüyle ortak.
 * Değerlendirme kural tabanlı (`drillVerdict`); denetlenemeyen cevapta yapay zekâ ikinci göz; sağlayıcı yoksa kural sonucu,
 * yapay zekâ düşerse madde sayılmaz (Assess #249 kuralı). "Bilmiyorum" yanlış sayılır.
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { DenemeMadde, Drill, Lexeme, TespitBeceri, TespitPaket } from "@dw/shared";
import { mesajOlcutleri } from "@dw/shared";
import { go, useApp } from "../state.ts";
import { a2Var, SEVIYE } from "../core/seviye.ts";
import { BECERILER, bolumler, bolumSayaci, haftaDerinDk, haftaDurumu, raporMetni, tahminiDk, tespitDegerlendir, tespitPlani, tespitRaporu, TESPIT, type Adim, type Cevaplar, type Karar, type Sonuc, type TespitRaporu as Rapor } from "../core/tespit.ts";
import { formPuani, olcutSecenekleri } from "../core/deneme.ts";
import { haftaOf } from "../core/gun.ts";
import { personalizeDeep } from "../core/persona.ts";
import { loadLexicon, loadTespit } from "../services/content.ts";
import { cevapYaz, kararUygula, raporKaydet, tamamlaNotEt, tespitOku, type TespitKayit } from "../services/tespit.ts";
import { ai, aiState } from "../services/ai.ts";
import { sttAvailable } from "../services/speech.ts";
import { setLearning } from "../services/focusRuntime.ts";
import { DrillIstem, drillVerdict, KICKER, OrderChips } from "../ui/drill.tsx";
import { MaddeView } from "../ui/denemeMadde.tsx";
import { ErrorPanel, Loading } from "../ui/components.tsx";
import { ActionBar, AnswerField, ListenButton, MicButton, ProgressHeader } from "../ui/kit.tsx";
import { Rich } from "../ui/rich.tsx";

const E2E = import.meta.env.MODE === "e2e";
const BASLIK = "Seviye tespiti";
export const BECERI_TR: Record<TespitBeceri, string> = { dinleme: "Dinleme", okuma: "Okuma", yazma: "Yazma", konusma: "Konuşma", kelime: "Kelime", dil: "Dil noktaları" };
const KARAR_TR: Record<Karar, string> = { a2: "A2'ye hazırsın.", tamamla: "A2'den önce bir tamamlama planın var.", bastan: "A1'i baştan, hızlı geçişle öneriyorum." };
const yuzde = (o: number) => `%${Math.round(o * 100)}`;

/** Paket + cihazdaki kayıt */
function useTespit() {
  const { index } = useApp();
  const [v, setV] = useState<{ paket: TespitPaket | null; kayit: TespitKayit } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!index) return;
    setErr(null);
    Promise.all([loadTespit(), tespitOku()]).then(([paket, kayit]) => setV({ paket, kayit })).catch((e) => setErr(String(e?.message || e)));
  }, [index?.version, n]);
  return { v, setV, err, yenile: () => setN((x) => x + 1) };
}
const cevapMap = (k: TespitKayit): Map<string, Sonuc> => new Map(Object.entries(k.cevaplar));

/* ---------- (a) giriş, (b) madde, (c) bölüm arası ---------- */
export function TespitEkrani() {
  const { index, toast } = useApp();
  const { v, setV, err, yenile } = useTespit();
  const [gorunum, setGorunum] = useState<"giris" | "madde" | { hafta: number; durum: "oturmus" | "zayif"; dk: number }>("giris");
  const [mesgul, setMesgul] = useState(false);
  const [raporHata, setRaporHata] = useState(false);
  const [raporDeneme, setRaporDeneme] = useState(0);
  // plan bitti: rapor bir kez yazılır, sonra rapor ekranı (render içinde durum değişmez); son haftanın bölüm arası önce görünür
  const ara = typeof gorunum === "object";
  const bitti = !!v?.paket && (!!v.kayit.rapor || tespitPlani(v.paket, cevapMap(v.kayit)).asama === "bitti");
  // Odak sayacı (PM-127 md. 2.3–2.4): giriş ekranı öğrenme değil. Kurulumdan buraya gelen dokunuş seansı başlatmasın,
  // taze cihazda "Baştan başla" sonrası Odak "Sırada seans 1/4" kalsın; madde ve bölüm arası öğrenme sayılır.
  useEffect(() => { setLearning(gorunum !== "giris", "vocab"); }, [gorunum]);
  useEffect(() => () => setLearning(false), []);
  useEffect(() => {
    if (!bitti || !v?.paket || ara) return;
    if (v.kayit.rapor) { go("seviye/rapor"); return; }
    void raporKaydet(tespitRaporu(v.paket, cevapMap(v.kayit))).then(() => go("seviye/rapor"), () => setRaporHata(true));
  }, [bitti, ara, raporDeneme]);
  if (raporHata) return <div class="stack"><ProgressHeader title={BASLIK} back="#/today" /><ErrorPanel message="Raporun kaydedilemedi. Cevapların cihazda duruyor. Tekrar dene." onRetry={() => { setRaporHata(false); setRaporDeneme((x) => x + 1); }} /></div>;
  if (err) return <div class="stack"><ProgressHeader title={BASLIK} back="#/today" /><ErrorPanel message={err} onRetry={yenile} /></div>;
  if (!v || !index) return <Loading />;
  if (!v.paket) return (
    <div class="stack" data-test="tespit-yok">
      <ProgressHeader title={BASLIK} back="#/today" />
      <section class="card stack"><h2>Seviye tespiti hazırlanıyor</h2><p>Soruları hazır olunca burada çözebilirsin. O zamana kadar günlerine devam et.</p></section>
      <ActionBar><a class="btn primary block" href="#/today" data-test="bugune-don">Bugüne dön</a></ActionBar>
    </div>
  );
  const paket = v.paket, kayit = v.kayit;
  const c = cevapMap(kayit);
  const plan = tespitPlani(paket, c);
  if (bitti && !ara) return <Loading />;
  const sayac = bolumSayaci(plan, c);
  const bas = bolumler(plan);
  const yanit = c.size > 0;

  if (gorunum === "giris") {
    const t = tahminiDk(paket);
    const ilkKurulum = !!kayit.kurulum && !yanit && !kayit.uygulandi;
    return (
      <div class="stack" data-test="tespit-giris" data-bitti={sayac.bitti} data-toplam={sayac.toplam}>
        <ProgressHeader title={BASLIK} back="#/today" />
        <section class="card stack tespit-giris">
          <h2>Önce seviyeni görelim</h2>
          <p class="muted" style={{ margin: 0 }}>A1'in sekiz haftasından sorular. Bildiğini tekrar ettirmeyelim; eksik varsa tam yerini bulalım.</p>
          {yanit
            ? <p class="tespit-kalan" data-test="tespit-kalan"><b>{sayac.bitti}/{sayac.toplam} bölüm bitti</b> · yaklaşık {Math.max(1, plan.kalanDk)} dk kaldı</p>
            : <ul class="tespit-maddeler">
                <li>Yaklaşık {Math.max(1, t.tarama)} dakika. Zorlandığın hafta olursa biraz uzar.</li>
                <li>Yarıda bırakabilirsin, kaldığın yerden sürer</li>
                <li>Bilmediğinde "Bilmiyorum" de; tahmin sonucu bozar</li>
              </ul>}
        </section>
        <ActionBar><div class="stack" style={{ gap: 6 }}>
          <button class="btn primary block" data-test={yanit ? "tespit-surdur" : "tespit-basla"} onClick={() => { setGorunum("madde"); window.scrollTo(0, 0); }}>{yanit ? "Sürdür" : "Başla"}</button>
          {ilkKurulum && <div class="tespit-orta"><button class="ikincil-eylem" data-test="tespit-bastan" disabled={mesgul}
            onClick={() => { setMesgul(true); void kararUygula("bastan", index).then(() => { toast("1. günden başlıyorsun"); go("today"); }, () => { setMesgul(false); toast("Kaydedilemedi; tekrar dene."); }); }}>Almancaya yeni başlıyorum → Baştan başla</button></div>}
        </div></ActionBar>
      </div>
    );
  }

  if (typeof gorunum === "object") {
    const g = gorunum;
    return (
      <div class="stack" data-test="tespit-ara" data-hafta={g.hafta} data-durum={g.durum}>
        <ProgressHeader title={BASLIK} back="#/today" ilerleme={{ n: plan.adimlar.filter((a) => c.has(a.id)).length, toplam: plan.adimlar.length }} />
        <section class={`card stack tespit-ara ${g.durum}`}>
          {g.durum === "oturmus"
            ? <h2>{g.hafta}. hafta: oturmuş <span aria-hidden="true">✓</span></h2>
            : <h2>{g.hafta}. hafta: biraz daha bakalım (yaklaşık {g.dk} dk)</h2>}
          {g.durum === "zayif" && <p class="small muted" style={{ margin: 0 }}>Bütün haftalar bitince bu haftadan birkaç soru daha gelecek.</p>}
        </section>
        <ActionBar><div class="stack" style={{ gap: 6 }}>
          <button class="btn primary block" data-test="tespit-devam" onClick={() => { setGorunum("madde"); window.scrollTo(0, 0); }}>Devam</button>
          {g.durum === "zayif" && <div class="tespit-orta"><a class="ikincil-eylem" href="#/today" data-test="tespit-birak">Şimdilik bırak</a></div>}
        </div></ActionBar>
      </div>
    );
  }

  const a = plan.siradaki!;
  const bi = bas.findIndex((b) => b.adimlar.includes(a));
  const b = bas[bi]!;
  const etiket = b.tur === "cekirdek" ? "DÖRT BECERİ" : `${b.hafta}. HAFTA${b.tur === "derin" ? " · YAKINDAN" : ""}`;
  const cevapla = async (s: Sonuc) => {
    try {
      const k = await cevapYaz(a.id, s);
      const yeni = cevapMap(k);
      setV({ paket, kayit: k });
      window.scrollTo(0, 0);
      // haftanın taraması bitti: bölüm arası (yüzde yok)
      if (b.tur === "tarama" && b.adimlar.every((x) => yeni.has(x.id)) && b.hafta !== null) {
        const d = haftaDurumu(paket, b.hafta, yeni);
        if (d !== "eksik") setGorunum({ hafta: b.hafta, durum: d, dk: haftaDerinDk(paket, b.hafta) });
      }
    } catch { toast("Cevap kaydedilemedi; tekrar dene."); }
  };
  return (
    <div class="stack" data-test="tespit-madde" data-adim={a.id} data-asama={a.asama} data-beceri={a.beceri} data-hafta={a.hafta ?? ""}>
      <ProgressHeader title={BASLIK} back="#/today" ilerleme={{ n: plan.adimlar.filter((x) => c.has(x.id)).length, toplam: plan.adimlar.length }} />
      <div class="tiny muted tespit-etiket" data-test="tespit-etiket">BÖLÜM {bi + 1}/{bas.length} · {etiket}</div>
      <MaddeKarti key={a.id} a={a} paket={paket} onCevap={cevapla} />
    </div>
  );
}

/* ---------- madde kartları ---------- */
/** Kural kararı + yapay zekâ ikinci göz (`tespitDegerlendir`, saf ve sınanmış; istem, kabul ve cevap redact edilir) */
function useDegerlendir() {
  const { api, profile } = useApp();
  const persona = { name: profile.displayName, address: profile.address };
  return (d: Drill, cevap: string, typed: boolean, istem: string): Promise<Sonuc> =>
    tespitDegerlendir(drillVerdict(d, cevap, typed).kind, { istem, kabul: "accepted" in d ? d.accepted : [], cevap }, aiState(api), (v) => ai(api, "equiv_check", v), persona);
}
const ACIK = TESPIT.acik_uclu_dogru;

function Bilmiyorum({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  return <button class="btn block tespit-bilmiyorum" data-test="tespit-bilmiyorum" disabled={disabled} onClick={onClick}>Bilmiyorum</button>;
}

function MaddeKarti({ a, paket, onCevap }: { a: Adim; paket: TespitPaket; onCevap: (s: Sonuc) => void }) {
  const { profile } = useApp();
  if (a.kart) return <KelimeKarti a={a} paket={paket} onCevap={onCevap} />;
  const m = personalizeDeep(a.madde!.madde, { name: profile.displayName, address: profile.address }) as Record<string, unknown>;
  if (a.madde!.kaynak === "deneme") return <DenemeKarti m={m as unknown as DenemeMadde} onCevap={onCevap} />;
  // görülmemiş durum = yönlendirilmiş cevap (karşıdakinin sorusu, Türkçe durum)
  const d: Drill = a.madde!.tur === "durum"
    ? { id: a.id, k: "guided_response", situation_tr: String(m.durum_tr ?? ""), prompt_de: String(m.prompt_de ?? ""), accepted: (m.accepted as string[]) ?? [] }
    : (m as unknown as Drill);
  return <DrillKarti d={d} konusma={a.beceri === "konusma"} onCevap={onCevap} />;
}

/** Drill maddesi: seç, sırala ya da yaz/söyle; sonuç gösterilmez */
function DrillKarti({ d, konusma, onCevap }: { d: Drill; konusma: boolean; onCevap: (s: Sonuc) => void }) {
  const degerlendir = useDegerlendir();
  const [sec, setSec] = useState<number | null>(null);
  const [bekle, setBekle] = useState(false);
  const mikrofon = konusma && sttAvailable() && (d.k === "guided_response" || d.k === "listen_and_respond" || d.k === "tr_de");
  const [yazarak, setYazarak] = useState(!mikrofon);
  const istem = d.k === "pick" ? d.q_tr : d.k === "transform" ? d.instr_tr : d.k === "guided_response" ? d.situation_tr : d.k === "listen_and_respond" ? d.situation_tr ?? "" : d.tr;
  const gonder = async (cevap: string, typed: boolean) => { if (bekle) return; setBekle(true); onCevap(await degerlendir(d, cevap, typed, istem)); };
  const kicker = konusma ? "Konuş" : KICKER[d.k];
  return (
    <section class="card stack fade tespit-kart" data-test={`tespit-drill-${d.k}`} {...(E2E && d.k !== "pick" ? { "data-cevap": d.accepted[0] } : {})} {...(E2E && d.k === "pick" ? { "data-dogru": d.ans } : {})}>
      <div class="kicker">{kicker}</div>
      {d.k === "pick" ? <h3 style={{ margin: 0 }}><Rich text={d.q_tr} /></h3> : <DrillIstem d={d} />}
      {d.k === "pick" && <div role="radiogroup" aria-label="Cevap seçenekleri">{d.opts.map((o, k) => (
        <button class={`opt${sec === k ? " sel" : ""}`} role="radio" aria-checked={sec === k} data-opt={k} onClick={() => setSec(k)}>{o}</button>))}</div>}
      {bekle && <p class="small muted" data-test="tespit-denetleniyor" style={{ margin: 0 }}>Cevabın değerlendiriliyor…</p>}
      <ActionBar><div class="stack" style={{ gap: 8 }}>
        {d.k === "pick" && <button class="btn primary block" data-test="tespit-kontrol" disabled={sec === null || bekle} onClick={() => sec !== null && onCevap(sec === d.ans ? "dogru" : "yanlis")}>Kontrol et</button>}
        {d.k === "order" && <OrderChips target={d.accepted[0]!} given={d.de} onSubmit={(x) => void gonder(x, true)} />}
        {d.k !== "pick" && d.k !== "order" && (yazarak
          ? <AnswerField voice={false} disabled={bekle} onSubmit={(x) => void gonder(x, true)} />
          : <div class="stack" style={{ gap: 8 }}>
              <MicButton wide disabled={bekle} onText={(x) => void gonder(x, false)} label="Dokun ve konuş" />
              <div class="tespit-orta"><button class="ikincil-eylem" data-test="tespit-yazarak" onClick={() => setYazarak(true)}>Yazarak cevapla</button></div>
            </div>)}
        <Bilmiyorum disabled={bekle} onClick={() => onCevap("bilmiyorum")} />
      </div></ActionBar>
    </section>
  );
}

/** Deneme maddesi (dört beceri çekirdeği): seç/form/mesaj sınav günüyle aynı kart (`MaddeView`); mesaj öz-puanlanır, konuşma Drill */
function DenemeKarti({ m, onCevap }: { m: DenemeMadde; onCevap: (s: Sonuc) => void }) {
  const [yazi, setYazi] = useState<string | null>(null);
  const [olcut, setOlcut] = useState<Record<number, number>>({});
  const bil = <Bilmiyorum onClick={() => onCevap("bilmiyorum")} />;
  if (m.k === "pick" || m.k === "form" || (m.k === "mesaj" && yazi === null)) return (
    <div class="tespit-kart">
      <MaddeView m={m} kisim={{ dinleme_sayisi: 2 }} kontrol="Kontrol et" ek={bil} onDone={(c: unknown) => {
        if (m.k === "pick") onCevap(c === m.ans ? "dogru" : "yanlis");
        else if (m.k === "form") onCevap(formPuani(m, c as Record<string, string>) / (m.alanlar.reduce((s, x) => s + x.puan, 0) || 1) >= ACIK ? "dogru" : "yanlis");
        else { setYazi(String(c)); window.scrollTo(0, 0); }
      }} />
    </div>
  );
  if (m.k === "mesaj") {
    const ol = mesajOlcutleri({ degerlendirme_tr: m.degerlendirme_tr ?? [] });
    const toplam = ol.reduce((s, o) => s + o.puan, 0) || 1;
    const eksik = ol.some((_, i) => olcut[i] === undefined);
    return (
      <section class="card stack fade tespit-kart" data-test="tespit-mesaj-puanla">
        <div class="kicker">Kendin puanla</div>
        <p class="small" style={{ margin: 0 }}>Uygulama mesajı tam puanlayamaz. Mesajını aşağıdaki örnekle karşılaştır. Her satır için puanını seç. Örnek tek doğru değildir.</p>
        <div class="small">Senin mesajın:</div>
        <div class="sinav-metin selectable" lang="de" style={{ whiteSpace: "pre-wrap" }}>{yazi}</div>
        <div class="small">Örnek mesaj:</div>
        <div class="sinav-metin selectable" lang="de">{m.ornek_de}</div>
        {ol.map((o, i) => (
          <div class="stack" style={{ gap: 6 }}>
            <div class="small"><b>{o.ad} ({o.puan} puan):</b> <Rich text={o.tr} /></div>
            <div class="seg tespit-seg" role="group" aria-label={`${o.ad} puanı`}>{olcutSecenekleri(o.puan).map((p) => (
              <button aria-pressed={olcut[i] === p} data-test={`olcut-${i}-${p}`} onClick={() => setOlcut({ ...olcut, [i]: p })}>{p}</button>))}</div>
          </div>))}
        <ActionBar><button class="btn primary block" data-test="tespit-puan-kaydet" disabled={eksik}
          onClick={() => onCevap(ol.reduce((s, _, i) => s + (olcut[i] ?? 0), 0) / toplam >= ACIK ? "dogru" : "yanlis")}>{eksik ? "Her ölçüte puan seç" : "Puanı kaydet"}</button></ActionBar>
      </section>
    );
  }
  // konuşma: yönlendirilmiş cevap ya da dinle ve cevap ver (Drill olarak değerlendirilir)
  const d: Drill = m.k === "guided_response" ? { id: m.id, k: m.k, situation_tr: m.situation_tr, prompt_de: m.prompt_de, accepted: m.accepted }
    : { id: m.id, k: "listen_and_respond", audio_de: m.audio_de, speed: m.speed, situation_tr: m.situation_tr, accepted: m.accepted };
  return <DrillKarti d={d} konusma onCevap={onCevap} />;
}

/** Kelime örneği: dinle → anlam (haftanın kartlarından üç çeldirici, kararlı sıra) */
function KelimeKarti({ a, paket, onCevap }: { a: Adim; paket: TespitPaket; onCevap: (s: Sonuc) => void }) {
  const [lex, setLex] = useState<Map<string, Lexeme> | null>(null);
  const [lexHata, setLexHata] = useState<string | null>(null);
  const [n, setN] = useState(0);
  const [sec, setSec] = useState<number | null>(null);
  // sözlük yüklenemezse madde "sayılmadı" yazılmaz: hata ve yeniden dene (yalnız sözlükte olmayan kart sayılmaz)
  useEffect(() => { setLexHata(null); void loadLexicon().then((x) => setLex(new Map(x.lexemes.map((l) => [l.id, l])))).catch((e) => setLexHata(String(e?.message || e))); }, [n]);
  const secenek = useMemo(() => {
    if (!lex) return null;
    const l = lex.get(a.kart!);
    if (!l) return null;
    const haftaKart = paket.haftalar.find((h) => h.hafta === a.hafta)?.kartlar ?? [];
    const havuz = [...haftaKart, ...paket.haftalar.flatMap((h) => h.kartlar)];
    const celdirici: string[] = [];
    // kararlı: kartın kimliğine göre döndürülmüş sıradan, anlamı farklı ilk üç kart
    const kay = [...a.kart!].reduce((s, ch) => (s * 31 + ch.charCodeAt(0)) >>> 0, 7) % Math.max(1, havuz.length);
    for (const id of [...havuz.slice(kay), ...havuz.slice(0, kay)]) {
      const x = lex.get(id); if (!x || id === a.kart || x.tr === l.tr || celdirici.includes(x.tr)) continue;
      celdirici.push(x.tr); if (celdirici.length === 3) break;
    }
    const tum = [l.tr, ...celdirici];
    const yer = kay % tum.length;
    const opts = [...tum.slice(1, 1 + yer), l.tr, ...tum.slice(1 + yer)];
    return { de: `${l.art ? `${l.art} ` : ""}${l.de}`, opts, ans: opts.indexOf(l.tr) };
  }, [lex, a.kart]);
  // sözlükte olmayan kart ölçülemez: sayılmaz, sıradakine geçilir
  useEffect(() => { if (lex && !secenek) onCevap("sayilmadi"); }, [lex, secenek]);
  if (lexHata) return <ErrorPanel message={lexHata} onRetry={() => setN((x) => x + 1)} />;
  if (!secenek) return <Loading />;
  return (
    <section class="card stack fade tespit-kart" data-test="tespit-kelime" {...(E2E ? { "data-dogru": secenek.ans } : {})}>
      <div class="kicker">Kelime · dinle ve anlamını seç</div>
      <div class="row" style={{ justifyContent: "center" }}><ListenButton text={secenek.de} label="Kelimeyi dinle" metinGizli /></div>
      <div role="radiogroup" aria-label="Anlamı">{secenek.opts.map((o, k) => (
        <button class={`opt${sec === k ? " sel" : ""}`} role="radio" aria-checked={sec === k} data-opt={k} onClick={() => setSec(k)}>{o}</button>))}</div>
      <ActionBar><div class="stack" style={{ gap: 8 }}>
        <button class="btn primary block" data-test="tespit-kontrol" disabled={sec === null} onClick={() => sec !== null && onCevap(sec === secenek.ans ? "dogru" : "yanlis")}>Kontrol et</button>
        <Bilmiyorum onClick={() => onCevap("bilmiyorum")} />
      </div></ActionBar>
    </section>
  );
}

/* ---------- (d) Seviye raporun ---------- */
function Cubuk({ ad, o, esik, test }: { ad: string; o: { dogru: number; toplam: number; oran: number | null }; esik: number; test: string }) {
  const dusuk = o.oran !== null && o.oran < esik - 1e-9;
  return (
    <div class={`tespit-cubuk${dusuk ? " dusuk" : ""}${o.oran === null ? " olculmedi" : ""}`} data-test={test} data-oran={o.oran === null ? "" : Math.round(o.oran * 100)}>
      <div class="row between small"><span>{ad}</span><span class="tiny muted">{o.oran === null ? "ölçülmedi" : <><b>{yuzde(o.oran)}</b> · {o.dogru}/{o.toplam}</>}</span></div>
      <div class="tespit-cubuk-yol" aria-hidden="true"><i style={{ width: `${Math.round((o.oran ?? 0) * 100)}%` }} /></div>
    </div>
  );
}

/** Kararın tek satır gerekçesi: "Genel %84 · konuşma %72 · en zayıf hafta %65" */
function gerekce(r: Rapor): string {
  const s = [`Genel ${yuzde(r.genel)}`];
  if (r.beceri.konusma.oran !== null) s.push(`konuşma ${yuzde(r.beceri.konusma.oran)}`);
  const h = r.hafta.filter((x) => x.oran.oran !== null).sort((a, b) => a.oran.oran! - b.oran.oran!)[0];
  if (h) s.push(`en zayıf hafta ${yuzde(h.oran.oran!)}`);
  const olcum = r.nedenler.filter((n) => n.tur === "olcum").length;
  if (olcum) s.push(`${olcum} hafta ölçülemedi`);
  return s.join(" · ");
}

export function TespitRaporu() {
  const { index, toast } = useApp();
  const { v, err, yenile } = useTespit();
  const [mesgul, setMesgul] = useState(false);
  if (err) return <div class="stack"><ProgressHeader title="Seviye raporun" back="#/ben" /><ErrorPanel message={err} onRetry={yenile} /></div>;
  if (!v || !index) return <Loading />;
  const r = v.kayit.rapor;
  if (!r || !r.karar) return (
    <div class="stack" data-test="tespit-rapor-yok">
      <ProgressHeader title="Seviye raporun" back="#/ben" />
      <section class="card stack"><h2>Henüz rapor yok</h2><p>Seviye tespitini bitirince raporun burada durur.</p></section>
      <ActionBar><a class="btn primary block" href="#/seviye" data-test="tespit-git">{Object.keys(v.kayit.cevaplar).length ? "Seviye tespitini sürdür" : "Seviye tespitine başla"}</a></ActionBar>
    </div>
  );
  const K = TESPIT.karar;
  const a2 = a2Var(index.m1.map((g) => g.day));
  const yanlisDrill = (): Drill[] => {
    if (!v.paket) return [];
    const bul = new Map([...v.paket.maddeler, ...v.paket.cekirdek].map((m) => [m.id, m]));
    return Object.entries(v.kayit.cevaplar).filter(([, s]) => s === "yanlis" || s === "bilmiyorum")
      .map(([id]) => bul.get(id)).filter((m) => !!m && m.kaynak !== "deneme" && m.tur !== "durum").map((m) => m!.madde as unknown as Drill);
  };
  const uygula = async (k: "a2" | "bastan") => {
    if (mesgul) return; setMesgul(true);
    try { const g = await kararUygula(k, index, yanlisDrill()); toast(g <= 1 ? "1. günden başlıyorsun" : `${haftaOf(g)}. haftadan başlıyorsun`); go("today"); }
    catch { setMesgul(false); toast("Kaydedilemedi; tekrar dene."); }
  };
  const planGunleri = [...new Set(r.zayifCanDo.map((z) => z.gun))];
  const kopyala = async () => {
    const t = raporMetni(r, { beceri: BECERI_TR, karar: KARAR_TR });
    try { await navigator.clipboard.writeText(t); toast("Rapor kopyalandı"); } catch { toast("Kopyalanamadı; metni seçip kopyalayabilirsin."); }
  };
  return (
    <div class="stack tespit-rapor" data-test="tespit-rapor" data-karar={r.karar} data-genel={Math.round(r.genel * 100)}>
      <ProgressHeader title="Seviye raporun" back="#/ben" />
      <section class={`card stack tespit-karar ${r.karar}`} data-test="tespit-karar">
        <h2 style={{ margin: 0 }}>{r.karar === "tamamla" && planGunleri.length ? `A2'den önce ${planGunleri.length} günlük bir tamamlama planın var.` : KARAR_TR[r.karar]}</h2>
        <p class="small muted" style={{ margin: 0 }} data-test="tespit-gerekce">{gerekce(r)}</p>
      </section>
      <section class="card stack" data-test="tespit-beceriler" style={{ gap: 10 }}>
        <h3 style={{ margin: 0 }}>Beceriler</h3>
        {BECERILER.map((b) => <Cubuk ad={BECERI_TR[b]} o={r.beceri[b]} esik={K.a2_beceri_min} test={`beceri-${b}`} />)}
      </section>
      <section class="card stack" data-test="tespit-haftalar" style={{ gap: 8 }}>
        <h3 style={{ margin: 0 }}>Haftalar</h3>
        {r.hafta.map((h) => <Cubuk ad={`${h.hafta}. hafta`} o={h.oran} esik={K.a2_hafta_min} test={`hafta-${h.hafta}`} />)}
      </section>
      <details class="card tespit-acilir" data-test="tespit-zayif">
        <summary><b>Zorlandıkların ({r.zayifCanDo.length})</b></summary>
        {r.zayifCanDo.length ? <ol class="zayif-liste">{r.zayifCanDo.map((z) => (
          <li class="row" data-test={`zayif-${z.gun}`}>
            <span class="grow zayif-cumle"><span class="tiny muted">{z.gun}. GÜN · {z.dogru}/{z.toplam}</span><span class="zayif-tr">{z.tr}</span></span>
            <a class="rehber-btn" href={`#/rehber/${z.gun}`} aria-label={`${z.gun}. günün rehberi`}>Rehber</a>
          </li>))}</ol> : <p class="small muted">Zorlandığın bir şey çıkmadı.</p>}
      </details>
      <details class="card tespit-acilir" data-test="tespit-dil">
        <summary><b>Dil noktaları ({r.zayifDilNoktasi.length})</b></summary>
        {r.zayifDilNoktasi.length ? <ul class="small">{r.zayifDilNoktasi.map((z) => <li>{z.ad_tr || "Dil noktası"} <span class="muted">· {z.hafta}. hafta · {z.dogru}/{z.toplam}</span></li>)}</ul> : <p class="small muted">Zorlandığın dil noktası yok.</p>}
      </details>
      <p class="small tespit-kelime-satir" data-test="tespit-bilinmeyen">Bilmediğin kelimeler: <b>{r.bilinmeyenKelime.length}</b>{r.bilinmeyenKelime.length > 0 && (r.karar === "bastan" ? " · günlerinde öğreneceksin" : <> → <a href="#/garden">Kelime Bahçesi'nde</a></>)}</p>
      <div class="tespit-orta"><button class="ikincil-eylem" data-test="tespit-kopyala" onClick={() => void kopyala()}>Raporu kopyala</button></div>
      <ActionBar>
        {r.karar === "a2"
          ? <div class="stack" style={{ gap: 6 }}>
              <button class="btn primary block" data-test="tespit-a2" disabled={mesgul || !a2} onClick={() => void uygula("a2")}>A2'ye başla</button>
              {!a2 && <p class="tiny muted" style={{ margin: 0, textAlign: "center" }} data-test="a2-hazirlaniyor">A2'nin günleri hazırlanıyor; hazır olunca buradan başlarsın.</p>}
            </div>
          : r.karar === "bastan"
            ? <button class="btn primary block" data-test="tespit-bastan-karar" disabled={mesgul} onClick={() => void uygula("bastan")}>A1'e baştan başla</button>
            : <button class="btn primary block" data-test="tespit-plan" disabled={mesgul}
                onClick={() => { setMesgul(true); void tamamlaNotEt().then(() => go("seviye/plan"), () => { setMesgul(false); toast("Kaydedilemedi; tekrar dene."); }); }}>Planımı gör</button>}
      </ActionBar>
    </div>
  );
}

/* ---------- (e) "Planımı gör" ara hâli (PM-124 md. 4.1; PR 3'ün plan ekranına kadar) ---------- */
export function TespitPlanAra() {
  const { v, err, yenile } = useTespit();
  // karar "tamamla" değilse plan yok: rapor ekranı (rapor yoksa onun "Henüz rapor yok" hâli) kendi kararını gösterir
  const yonlen = !!v && v.kayit.rapor?.karar !== "tamamla";
  useEffect(() => { if (yonlen) location.replace("#/seviye/rapor"); }, [yonlen]);
  if (err) return <div class="stack"><ProgressHeader title="Planın" back="#/seviye/rapor" /><ErrorPanel message={err} onRetry={yenile} /></div>;
  if (!v) return <Loading />;
  const r = v.kayit.rapor;
  if (!r || r.karar !== "tamamla") return <Loading />;
  const gunler = [...new Set(r.zayifCanDo.map((z) => z.gun))];
  return (
    <div class="stack" data-test="tespit-plan-ara">
      <ProgressHeader title="Planın" back="#/seviye/rapor" />
      <section class="card stack">
        {gunler.length > 0 && <>
          <p style={{ margin: 0 }}>Seviye tespitinde şunları yaparken zorlandın:</p>
          <ol class="zayif-liste" data-test="zayif-liste">{r.zayifCanDo.map((z) => (
            <li class="row" data-test={`zayif-${z.gun}`} data-gun={z.gun}>
              <a class="grow zayif-cumle" href={`#/seviye/tekrar/${z.gun}`} data-test={`zayif-tekrar-${z.gun}`} aria-label={`${z.gun}. günü tekrar et: ${z.tr}`}>
                <span class="tiny muted">{z.gun}. GÜN · {z.dogru}/{z.toplam} DOĞRU</span>
                <span class="zayif-tr">{z.tr}</span>
              </a>
              <a class="rehber-btn" href={`#/rehber/${z.gun}`} aria-label={`${z.gun}. günün rehberi`}>Rehber</a>
            </li>))}</ol>
        </>}
        <p class="small muted" style={{ margin: 0 }} data-test="plan-not">Bu liste planının ilk adımı. Günlere bölünmüş tam plan birkaç gün içinde burada olacak. Planı bitirince A2 açılır.</p>
      </section>
      <ActionBar>
        {gunler.length > 0
          ? <div class="stack"><a class="btn primary block" href={`#/seviye/tekrar/${gunler.join(",")}`} data-test="zayif-tekrar">Bunları tekrar et</a>
              <a class="btn block" href="#/today" data-test="bugune-don">Bugüne dön</a></div>
          : <a class="btn primary block" href="#/today" data-test="bugune-don">Bugüne dön</a>}
      </ActionBar>
    </div>
  );
}
