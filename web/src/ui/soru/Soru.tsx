/** Bahçe ve Akış ortak soru bileşeni (AKIS AK-7; Garden.tsx'ten taşındı, davranış aynı) */
/**
 * Kelime Bahçesi (PM-049, #54 A13): günlük kelime tekrar turu.
 * Kartlar öğrenciye soru olarak döner; cevap öğrenciden beklenir. Yanlışta doğrusu öğrencinin cevabıyla yan yana
 * gösterilir, kart turun sonunda başka örnek ve başka türle yeniden gelir ve kişisel bankaya girer (srs.review).
 */
import { cumleKaydet } from "../../services/kullanim.ts";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import { XP } from "../../core/gun.ts";
import { review, type Outcome } from "../../core/srs.ts";
import { accepted, availableTypes, collocOf, synonymHit, collocQuestion, formFor, boslukSecimi, esdizimler, gosterilenCogul, isNoun, meaningOptions, ownSentenceCheck, type Yakinlik, sinaKabul, type GardenQ, type QType } from "../../core/garden.ts";
import { ruleVerdict } from "../../core/answer.ts";
import { umlautEksik } from "../../core/esdeger.ts";
import { judgeWord, numberWordHint } from "../../core/grading.ts";
import { speak } from "../../services/speech.ts";
import { haptic } from "../../services/haptics.ts";
import { ActionBar, AnswerField, FeedbackBand, ListenButton, YanlisIci } from "../kit.tsx";
import { Art } from "../components.tsx";
import { Photo } from "../learn.tsx";
import { Rich } from "../rich.tsx";


const E2E = import.meta.env.MODE === "e2e";
/** Soru ekranından tura dönen bilgi: gerçekleşen soru türü (sına düşünce tanıma), sına mı, cevap süresi (öneri için) */
export interface SoruBilgi { tip?: QType; sina?: boolean; ms?: number }
/** `yazim`: kelime doğru, yalnızca ümlaut/ß eksik (PM 7004537514-1): kart "bilmiyor" sayılmaz, turun sonunda bir kez daha sorulur */
export type Result = { ok: boolean; answer?: string; expected?: string; note?: string; yazim?: boolean };

const FOTO_TANITIM = 160, FOTO_KARE = 104, FOTO_PAY = 8;
/** başlık yazı boyu kademesi (0: varsayılan .de-xl); PM 7041856903: 28 → 24 → 21 */
const BASLIK_KADEME = [0, 28, 24, 21] as const;

/** Eşdizimler: en çok 3 açık, kalanı "Daha fazla (n)" (PM 7024150313); açılır kısım boşlukta sorulmaz */
function Esdizimler({ l, test }: { l: Lexeme; test?: string }) {
  const { acik, kapali } = esdizimler(l);
  if (!acik.length) return null;
  const satir = (c: Lexeme["collocations"][number]) => <li><b lang="de">{c.de}</b> <span class="muted">· {c.tr}</span></li>;
  return (
    <div class="small" data-test={test}><span class="muted">Birlikte:</span>
      <ul class="esdizim-liste">{acik.map(satir)}</ul>
      {kapali.length > 0 && <details class="esdizim-daha" data-test="esdizim-daha" onToggle={(e) => { const d = e.currentTarget as HTMLDetailsElement; if (d.open) d.querySelector("li:last-child")?.scrollIntoView({ block: "nearest", behavior: "smooth" }); }}><summary class="ikincil-eylem">Daha fazla ({kapali.length})</summary><ul class="esdizim-liste">{kapali.map(satir)}</ul></details>}
    </div>
  );
}

export function Question({ q, l, all, yakin, gorulen, onDone: bitir, onSina, onCevap, onTanitim, onTanitimBitti }: { q: GardenQ; l: Lexeme; all: Lexeme[]; yakin?: Yakinlik; /** öğrencinin gördüğü kelimeler (PM-069 P0) */ gorulen?: Set<string>; onDone: (r: Result, o: Outcome | null, exi: number, m?: SoruBilgi) => void; onSina?: () => void; onCevap?: () => void; onTanitim?: () => void; /** PM-069 madde 3: tanıtım ayrı; ilk soru sonra gelir */ onTanitimBitti?: (exi: number) => void }) {
  const [intro, setIntro] = useState(!!q.intro);
  // B16: sına sorusu; bilemezse "Sorun değil, birlikte bakalım" → tanıtım ve normal tanıma sorusu (PM-066 madde 1)
  const [sina, setSina] = useState(!!q.sina);
  // PM-069 P0: cevabı öğrenciye gösterilmemiş boşluk sorulmaz; sorulabilir biçim yoksa Türkçeden Almancaya (kartın kendi kelimesi)
  const [tip, setTip] = useState<QType>(() => boslukSecimi(l, q.type, q.ex, gorulen ?? new Set()).tip);
  const basla = useMemo(() => ({ t: Date.now() }), []);
  useEffect(() => { if (!intro) basla.t = Date.now(); }, [intro]);
  // öneri süresi cevap anında ölçülür; cevap kartını okumak süreye girmez (inceleme #113 P1-4)
  const sure = useRef<number | null>(null);
  useEffect(() => { if (!intro) sure.current = null; }, [intro]);
  const onDone = (r: Result, o: Outcome | null, e: number) => bitir(r, o, e, { tip, sina, ms: sure.current ?? Date.now() - basla.t });
  // gerçekleşen soru (sına düşünce tanıma sorusu); aşağıdaki her karar bunu kullanır
  const qe: GardenQ = tip === q.type ? q : { ...q, type: tip };
  const [res, setRes] = useState<Result | null>(null);
  // her soru sayfanın başından açılır: önceki sorudan kalan kaydırma başlığı üst çubuğun altında bırakmasın (inceleme #100 P1-2)
  useEffect(() => { window.scrollTo(0, 0); }, [intro]);
  const [selfCheck, setSelfCheck] = useState<string | null>(null);
  const [ownNote, setOwnNote] = useState(false);
  const [shortNote, setShortNote] = useState(false);
  const [synNote, setSynNote] = useState<string | null>(null);
  const [hinted, setHinted] = useState(false);
  // PM-062: cümle sırası kartın gösterim sayacından gelir; "Başka cümle" havuzdaki sıradakine geçer (ipucu değil, XP etkilenmez)
  const [exi, setExi] = useState(q.ex);
  const [fotoYok, setFotoYok] = useState(false);
  // cümlenin fotoğrafı (cevap kartı); fotoğraf bileşeni yenisi hazır olana kadar eskisini tutar (zıplama yok; inceleme #92 2. tur)
  const ex = l.examples[exi % Math.max(1, l.examples.length)];
  const fotoEx = exi, fotoOrnek = ex;
  const show = (r: Result) => { if (sure.current === null) sure.current = Date.now() - basla.t; onCevap?.(); setRes(r); haptic(r.ok ? "success" : "error"); };
  const next = (o: Outcome | null) => onDone(res || { ok: false }, o, exi);
  const baska = (n: number) => n > 1 ? <button class="ikincil-eylem" data-test="baska-cumle" onClick={() => setExi((x) => x + 1)}>Başka cümle</button> : null;

  // önce duy (PM-049 tanıtım): kelime ekrana gelince bir kez okunur (inceleme #59 P2-8)
  useEffect(() => { if (intro) void speak(isNoun(l) ? `${l.art} ${l.de}` : l.de, "de", "normal"); }, [intro]);
  // PM 7024150313 + #12 7035903811 (D-123): tanıtım kartı görselli en uzun kartta da düğmelere değmeden sığar. Görsel GİZLENMEZ
  // (LS §1 ikili kodlama). Sığmayan kartta düzen bir kez değişir: görsel tam genişlik yerine kelimenin altında sağa yaslı küçük kare
  // olur, metin yanından akar. Karar kart oturunca (2 kare sonra) verilir; "Daha fazla" ya da sonradan gelen düğme kararı
  // değiştirmez. Pencere boyu/yön ya da yazı boyu değişince karar yeniden verilir. Eşdizim sayısı sabit (D-119).
  const kartRef = useRef<HTMLElement>(null);
  const [duzen, setDuzen] = useState<"tam" | "kare">("tam");
  const [olcuTur, setOlcuTur] = useState(0);
  useEffect(() => {
    if (!intro) return;
    const yeniden = () => { setDuzen("tam"); setOlcuTur((n) => n + 1); };
    window.addEventListener("resize", yeniden);
    const ts = typeof MutationObserver !== "undefined" ? new MutationObserver(yeniden) : null;
    ts?.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });
    return () => { window.removeEventListener("resize", yeniden); ts?.disconnect(); };
  }, [intro]);
  useEffect(() => {
    const k = kartRef.current;
    if (!intro || !k || duzen !== "tam") return;
    // görsel ve örnek alanı geç oturabilir: kart boyu değiştikçe (kare kararı verilene kadar) bir sonraki karede ölçülür;
    // gözlemci içinden düzen değiştirmek WebKit'te "ResizeObserver loop" hatası verir (#152 CI)
    let kare = 0;
    const olc = () => {
      // yalnızca bu tanıtımın eylem çubuğu; görünmeyen (0 boyutlu) düğmeler sayılmaz
      const btn = [...(k.closest("[data-test=garden-intro]")?.querySelectorAll<HTMLElement>(".actionbar button") ?? [])].map((x) => x.getBoundingClientRect()).filter((r) => r.height > 0);
      if (!btn.length) return;
      const ust = Math.min(...btn.map((r) => r.top));
      // "Daha fazla" açıksa onun yüksekliği karara girmez
      const daha = k.querySelector<HTMLDetailsElement>("[data-test=esdizim-daha]");
      const ek = daha?.open ? (daha.getBoundingClientRect().height - (daha.querySelector("summary")?.getBoundingClientRect().height ?? 0)) : 0;
      const tas = Math.ceil(k.getBoundingClientRect().bottom - ek + window.scrollY - ust + FOTO_PAY);
      if (tas > 0 && k.querySelector("[data-test=foto]")) setDuzen("kare");
    };
    const sonra = () => { cancelAnimationFrame(kare); kare = requestAnimationFrame(olc); };
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(sonra) : null;
    ro?.observe(k); sonra();
    return () => { ro?.disconnect(); cancelAnimationFrame(kare); };
  }, [intro, duzen, olcuTur]);
  // PM 7041856903: başlık (artikel + kelime) TEK satır, hecelenmez (iki düzende de); sığmazsa yazı boyu kademeli küçülür
  const baslikRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const e = baslikRef.current;
    if (!intro || !e) return;
    const sigdir = () => {
      for (const px of BASLIK_KADEME) { e.style.fontSize = px ? `${px}px` : ""; if (e.scrollWidth <= e.clientWidth + 0.5) break; }
      e.dataset.boy = String(Math.round(parseFloat(getComputedStyle(e).fontSize)));
    };
    sigdir();
    void document.fonts?.ready.then(sigdir);
  }, [intro, duzen, l.id]);
  const col = collocOf(l);
  // PM 7043428377: kare düzende anlam 1. satır, çoğul kendi satırında (ayraç noktası yok, daha soluk); Almanca çoğul bölünmez
  const anlamKare = <div class="kk-anlam"><p style={{ margin: 0 }}><span data-test="intro-tr">{l.tr}</span></p>
    {gosterilenCogul(l) && <p class="small muted cogul-satir" data-test="intro-pl" style={{ margin: 0 }}>Çoğulu: <span lang="de" class="nowrap">{isNoun(l) ? "die " : ""}{gosterilenCogul(l)}</span></p>}</div>;
  const anlam = <p style={{ margin: 0 }}><span data-test="intro-tr">{l.tr}</span>{gosterilenCogul(l) && <span class="small muted cogul-satir" data-test="intro-pl"> · Çoğulu: <span lang="de">{isNoun(l) ? "die " : ""}{gosterilenCogul(l)}</span></span>}</p>;
  if (intro) return (
    <div class="stack fade" data-test="garden-intro" data-lex={l.id}>
      <section class="card stack" ref={kartRef} data-duzen={duzen}><div class="kicker">Yeni kelime</div>
        {/* PM 14:05 Berlin madde 1: tanıtımda kelimenin fotoğrafı (sayaçla döner); cümle görseli yalnızca cümlenin yanında */}
        {/* C: tanıtımda görsel 160 px (örnek alanı en uzun örnek kadar yer tuttuğu için en uzun kart yine düğmelere değmeden sığar) */}
        {duzen === "tam" && <Photo q={l.img} sira={q.ex} yer={[`${l.id}#kart`]} alt={l.tr} enCok={FOTO_TANITIM} />}
        {/* PM 7024150313: görselli en uzun kart da düğmelere değmeden sığar — kelime ile dinle aynı satırda, çoğul anlamın yanında,
            "Başka cümle" cümlenin yanında; eşdizimlerden en çok 3'ü açık */}
        {duzen === "tam" ? <div class="row" style={{ flexWrap: "nowrap", alignItems: "center", gap: 10 }}>
          <div class="de-xl grow kk-baslik" lang="de" style={{ minWidth: 0 }} ref={baslikRef} data-test="kelime-baslik"><Art art={l.art} de={l.de} /></div>
          <ListenButton text={isNoun(l) ? `${l.art} ${l.de}` : l.de} />
        </div>
          // D-123 kare düzeni (PM 7041856903): 1. satır başlık tam genişlikte tek satır; 2. satır solda Dinle + anlam, sağda kare görsel,
          // atıf altta tek satır; örnek cümle yine tam genişlikte (PM 7026866757-1)
          : <>
            <div class="de-xl kk-baslik" lang="de" ref={baslikRef} data-test="kelime-baslik"><Art art={l.art} de={l.de} /></div>
            <div class="kelime-kare" data-test="kelime-kare">
              <div class="kk-sol"><ListenButton text={isNoun(l) ? `${l.art} ${l.de}` : l.de} />{anlamKare}</div>
              <Photo q={l.img} sira={q.ex} yer={[`${l.id}#kart`]} alt={l.tr} enCok={FOTO_KARE} oran="1 / 1" />
            </div>
          </>}
        {duzen === "tam" && anlam}
        {/* PM 7026866757-1: örnek cümle tam genişlikte, hecelenmez; "Başka cümle" Türkçe satırın altında, kendi satırında */}
        {/* PM 7030294523 C: örnek alanı kartın en uzun örneği kadar yer tutar (görünmez yer tutucular aynı hücrede); "Başka cümle"de kart da
            sayfa da zıplamaz. Görünen cümle hep aynı öğe (data-test=intro-ex), yalnızca metni değişir */}
        {ex && <div class="ornek-yigin">
          <p class="small ornek-cumle" data-test="intro-ex" style={{ margin: 0 }}><span lang="de">{ex.de}</span><br /><span class="muted">{ex.tr}</span></p>
          {l.examples.length > 1 && l.examples.map((x) => <p class="small ornek-cumle ornek-yer" aria-hidden="true" style={{ margin: 0 }}><span lang="de">{x.de}</span><br /><span class="muted">{x.tr}</span></p>)}
        </div>}
        {baska(l.examples.length)}
        <Esdizimler l={l} test="intro-colloc" />
      </section>
      <ActionBar>
        {onTanitimBitti ? <button class="btn primary block" data-test="next" onClick={() => onTanitimBitti(exi)}>Tamam</button>
          : <button class="btn primary block" data-test="next" onClick={() => setIntro(false)}>Şimdi sor</button>}
        {/* B16 (PM-066 madde 1): beyan değil kanıt — bu kart turun sonunda üretimle sınanır, sonraki yeni kartlar sınavla açılır */}
        {onSina && <button class="btn block" data-test="sina-beni" onClick={onSina}>Biliyorum, sına beni</button>}
      </ActionBar>
    </div>
  );

  // ipucu ve boşluk cümlesi yalnızca boşluk sorularında (başka türde öğrencinin görmediği cümlenin ipucu çıkmasın; inceleme #85 P1-1)
  const bs = boslukSecimi(l, qe.type, exi, gorulen ?? new Set());
  const fi = bs.fi;
  const form = qe.type === "gap" || qe.type === "sep_perfekt" ? formFor(l, qe.type, fi) : undefined;
  // PM (#59 yorumu): cevaptan sonra, doğru ya da yanlış, kelime cümlesiyle görünür — örnek cümle (dinle), fotoğraf, eşdizim
  const colAfter = collocOf(l);
  const verdict = res && (<>
    <section class="card stack fade" data-test="after-card" data-lex={l.id} data-nex={l.examples.length} ref={(el) => { if (el && !el.dataset.seen) { el.dataset.seen = "1"; requestAnimationFrame(() => el.scrollIntoView({ block: "center", behavior: "smooth" })); } }}>
      <div class="de-lg" lang="de"><Art art={l.art} de={l.de} /> <span class="small muted">· {l.tr}</span></div>
      {gosterilenCogul(l) && <div class="small muted cogul-satir" data-test="after-pl">Çoğulu: <span lang="de">{isNoun(l) ? "die " : ""}{gosterilenCogul(l)}</span></div>}
      <Photo q={fotoOrnek?.img || l.img} sira={fotoEx} yer={[`${l.id}#ornek${fotoEx % Math.max(1, l.examples.length)}`, `${l.id}#kart`]} alt={fotoOrnek?.tr || l.tr} />
      {ex && <div class="row" style={{ flexWrap: "nowrap", alignItems: "flex-start" }}><span class="grow"><span lang="de" data-test="after-ex">{ex.de}</span><br /><span class="small muted">{ex.tr}</span></span><ListenButton text={ex.de} small /></div>}
      {/* boşluk sorusunda cevap ekranındaki cümle sorulan cümlenin örneğidir; başka sorularda beğenilmeyen örnek değiştirilebilir */}
      {!form && baska(l.examples.length)}
      <Esdizimler l={l} />
    </section>
    {/* geri bildirim bandı yüksek: kart bandın altında kalmasın diye kaydırma payı */}
    <div aria-hidden="true" style={{ height: 180 }} />
    <ActionBar>
      {sina ? (res.ok && !hinted
          ? <FeedbackBand kind="ok" title="Bildin!" xp={XP.bilinen}><span lang="de">{res.expected}</span><div class="small">Bu kelime tanıma basamağını atladı; bundan sonra Almancasını hep sen kuracaksın.</div></FeedbackBand>
          : <FeedbackBand kind="info" title="Sorun değil, birlikte bakalım."><div class="fb-dogrusu" lang="de" data-test="fb-dogrusu">{res.expected}</div><div class="small">Şimdi kelimeyi tanıyalım.</div></FeedbackBand>)
        : res.ok ? <FeedbackBand kind="ok" title="Doğru." xp={hinted ? 0 : XP.dogru}>{res.expected && <span lang="de">{res.expected}</span>}</FeedbackBand>
        : <FeedbackBand kind={res.yazim ? "info" : "bad"} title={res.yazim ? "Kelime doğru, yazımı eksik." : "Doğrusu:"}>
            {/* PM-059 madde 1: önce doğrusu; örnek cümle hemen üstteki kartta (dinlenebilir) */}
            <YanlisIci dogrusu={res.expected ?? ""} cevap={res.answer}>{res.note && <div class="small">{res.note}</div>}
              {/* ipucu yanlış cevaptan sonra açıklama olarak (PM 7004537514-2) */}
              {form?.hint_tr && <div class="small" data-test="ipucu-sonra"><Rich text={form.hint_tr} /></div>}</YanlisIci>
          </FeedbackBand>}
      <button class="btn primary block" data-test="next" onClick={() => {
        // sına bilinemediyse: değerlendirme yazılmaz, kelime tanıtılır ve normal tanıma sorusu gelir (cezasız)
        if (sina && !(res.ok && !hinted)) { setSina(false); setTip("listen_meaning"); setRes(null); setHinted(false); setSynNote(null); setIntro(true); onTanitim?.(); return; }
        next(res.ok ? (hinted ? "hinted" : "correct") : res.yazim ? "hinted" : "wrong");
      }}>Devam</button>
    </ActionBar></>
  );

  if (qe.type === "listen_meaning" || qe.type === "article" || qe.type === "colloc") return <ChoiceQ q={qe} l={l} all={all} yakin={yakin} ex={ex} show={show} verdict={verdict} />;

  // ---- aktif: üretim ----
  // #137 P2-1 + inceleme #150 P2: görsel yoksa soru tr_de gibi çizilir (okur onaylı metinler; Türkçe ipucu büyük)
  const prompt = qe.type === "photo_say" ? <><div class="kicker" data-test="foto-soru-baslik">{fotoYok ? "Almanca söyle ya da yaz" : "Fotoğraftaki ne? Artikeliyle söyle ya da yaz"}</div><Photo q={l.img} sira={exi} yer={[`${l.id}#kart`]} onYok={() => setFotoYok(true)} />{fotoYok ? <div class="de-lg">{l.tr}{isNoun(l) ? " (der, die ya da das ile)" : ""}</div> : <p class="small muted">{l.tr}</p>}</>
    : qe.type === "tr_de" && sina ? <><div class="kicker" data-test="sina-soru" {...(E2E ? { "data-cevap": sinaKabul(l)[0] } : {})}>Biliyorum, sına beni · ipucu yok</div><div class="de-lg">{l.tr}{isNoun(l) ? " (der, die ya da das ile)" : ""}</div>{ex?.tr && <p class="small" data-test="sina-baglam">Cümlede: <span class="muted">{ex.tr}</span></p>}<p class="small muted">Almanca yaz ya da söyle. Bilirsen bu kelime ileri basamaklardan devam eder.</p>{!res && <button class="btn ghost" data-test="sina-bilmiyorum" onClick={() => show({ ok: false, expected: sinaKabul(l)[0] })}>Bilmiyorum, tanıt</button>}</>
    : qe.type === "tr_de" ? <><div class="kicker">Almanca söyle ya da yaz</div><div class="de-lg">{l.tr}{isNoun(l) ? " (der, die ya da das ile)" : ""}</div></>
    : qe.type === "gap" || qe.type === "sep_perfekt" ? <><div class="kicker">Boşluğu doldur: boşluğa gelen kelimeyi ya da bütün cümleyi yaz</div><div class="de-lg" lang="de" data-test="gap-cumle">{form?.de}</div>{form?.tr && <p class="small muted">{form.tr}</p>}{form?.hint_tr && !res && <IpucuDugmesi metin={form.hint_tr} onAc={() => setHinted(true)} />}{!res && bs.sorulabilir > 1 && <button class="btn sm ghost" data-test="baska-cumle" onClick={() => setExi(fi + 1)}>Başka cümle</button>}</>
    : <><div class="kicker">Bu kelimeyle kendi cümleni kur</div><div class="de-lg" lang="de"><Art art={l.art} de={l.de} /></div><p class="small muted">{l.tr}{ex ? ` · Örnek: ` : ""}{ex && <span lang="de" data-test="own-ex">{ex.de}</span>}</p>{!selfCheck && baska(l.examples.length)}</>;

  const submit = (a: string, mode: "typed" | "voice") => {
    if (qe.type === "own_sentence") {
      const c = ownSentenceCheck(l, a);
      // kısa cümle yeniden yazdırılır (ceza yok); kelimeyi göremediysek yalnızca not düşer, karar öğrencinin (inceleme #59 P1-1)
      if (c === "short") { setShortNote(true); return; }
      setOwnNote(c === "missing"); setSelfCheck(a); return;
    }
    const acc = accepted(l, qe.type, fi);
    // rakam kuralı yalnızca yazılan cevapta: konuşma tanıma sayıyı rakamla döker (inceleme #59 P1-3)
    const hint = mode === "typed" ? numberWordHint(a) : null;
    if (hint && acc.every((x) => !/\d/.test(x))) { show({ ok: false, answer: a, expected: acc[0], note: hint }); return; }
    // isimde artikel zorunlu ve eksik/yanlış artikel açıklanır (inceleme #59 P2-3)
    // eş anlamlı başka kart (sprechen/reden, Arbeit/Job): yanlış sayılmaz; aranan kelime yeniden istenir (inceleme #59 Y-2)
    const trySyn = () => { if (qe.type !== "tr_de") return false; const syn = synonymHit(l, a, all); if (!syn) return false;
      setSynNote(`„${syn.de}“ başka bir kelime. Burada aranan kelimenin ilk harfi: ${l.de[0]}…`); setHinted(true); return true; };
    // ümlautu/ß'si eksik ama kelime doğru: "yazım" (yanlış sayılmaz, kart geri atılmaz)
    const yazim = mode === "typed" ? acc.map((x) => umlautEksik(x, a)).find(Boolean) : undefined;
    if (yazim) { show({ ok: false, answer: a, expected: acc[0], note: yazim, yazim: true }); return; }
    if ((qe.type === "tr_de" || qe.type === "photo_say") && isNoun(l)) {
      const j = judgeWord(a, l.de, l.art);
      if (!j.ok && trySyn()) return;
      show({ ok: j.ok, answer: a, expected: acc[0], note: j.why_tr }); return;
    }
    const v = ruleVerdict(acc, a);
    if (v.kind !== "correct" && trySyn()) return;
    show({ ok: v.kind === "correct", answer: a, expected: acc[0] });
  };

  if (selfCheck !== null && !res) return (
    <div class="stack fade" data-test="gq-own-check">
      <section class="card stack">{prompt}<div class="de-lg" lang="de">{selfCheck}</div>
        <FeedbackBand kind="info" title="Bu cümleyi uygulama denetleyemez.">
          {ownNote && <div class="small" data-test="own-missing">Uygulama cümlende bu kelimeyi bulamadı. Kelimeyi biraz farklı yazdıysan cümlen yine doğru olabilir. Örnek: gehen yerine gehe.</div>}
          Kelimeyi doğru kullandın mı? Cümleni bir kez yüksek sesle oku.{ex && <> Örnek: <span lang="de">{ex.de}</span></>}</FeedbackBand></section>
      <ActionBar>
        <button class="btn primary block" data-test="own-ok" onClick={() => {
          // #58 B3: gün sonu özetine yalnızca öğrencinin doğru dediği ve kelimesi görünen cümle (inceleme #93 P1-3)
          if (selfCheck && !ownNote) void cumleKaydet(selfCheck, "bahce");
          onDone({ ok: true, answer: selfCheck }, "hinted", exi); }}>Evet, doğru kurdum</button>
        <button class="btn block" data-test="own-unsure" onClick={() => onDone({ ok: true, answer: selfCheck }, null, exi)}>Emin değilim, geç</button>
      </ActionBar>
    </div>
  );

  return (
    <div class="stack fade" data-test={`gq-${qe.type}`} data-lex={l.id} {...(E2E ? { "data-kopru": availableTypes(l, "passive").some((t) => t !== "listen_meaning") ? "1" : "0" } : {})}>
      <section class="card stack">{prompt}{shortNote && <p class="small" data-test="own-short">En az üç kelimelik bir cümle kur.</p>}{synNote && <p class="small" data-test="syn-note">{synNote}</p>}</section>
      {!res && <ActionBar><AnswerField onSubmit={submit} /></ActionBar>}
      {verdict}
    </div>
  );
}

function ChoiceQ({ q, l, all, yakin, ex, show, verdict }: { q: GardenQ; l: Lexeme; all: Lexeme[]; yakin?: Yakinlik; ex?: Lexeme["examples"][number]; show: (r: Result) => void; verdict: preact.ComponentChildren }) {
  const m = useMemo(() => {
    if (q.type === "listen_meaning") { const o = meaningOptions(l, all, Math.random, yakin); return { title: "Dinle: ne demek?", stem: null as string | null, ...o, expected: l.tr }; }
    if (q.type === "article") { const opts = ["der", "die", "das"]; return { title: "der, die, das: hangisi?", stem: l.de, opts, ans: opts.indexOf(l.art!), expected: `${l.art} ${l.de}` }; }
    const c = collocQuestion(l, all);
    // yeterli güvenli çeldirici yoksa anlam sorusuna düşer (tek doğru cevap kuralı)
    if (!c) { const o = meaningOptions(l, all, Math.random, yakin); return { title: "Ne demek?", stem: isNoun(l) ? `${l.art} ${l.de}` : l.de, ...o, expected: l.tr }; }
    return { title: `Tamamla: ${c.tr}`, stem: c.stem, opts: c.opts, ans: c.ans, expected: c.stem.replace("___", c.opts[c.ans]!) };
  }, [q.lexId, q.type]);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => { if (q.type === "listen_meaning") void speak(isNoun(l) ? `${l.art} ${l.de}` : l.de, "de", "normal"); }, []);
  return (
    <div class="stack fade" data-test={`gq-${q.type}`} data-lex={l.id}>
      {/* inceleme #150 P2: .kicker büyük harfe çevrilir; Almanca artikeller Türkçe yerelde "DİE" olmasın diye lang="de" içinde */}
      <section class="card stack"><div class="kicker">{q.type === "article" ? <><span lang="de">der, die, das</span>: hangisi?</> : m.title}</div>
        {q.type === "listen_meaning" ? <div class="row"><ListenButton text={isNoun(l) ? `${l.art} ${l.de}` : l.de} /><span class="small muted">Kelime cevaptan sonra görünür</span></div>
          : <div class="de-lg" lang="de">{m.stem}</div>}
        {picked !== null && q.type !== "colloc" && <div class="de-lg" lang="de"><Art art={l.art} de={l.de} /></div>}
      </section>
      <div role="group">{m.opts.map((o, k) => <button class={`opt${picked === null ? "" : k === m.ans ? " right" : k === picked ? " wrong" : ""}`} disabled={picked !== null} data-opt={k}
        {...(E2E ? { "data-right": k === m.ans ? "1" : undefined } : {})} lang={m.expected === l.tr ? undefined : "de"}
        onClick={() => { setPicked(k); show({ ok: k === m.ans, answer: o, expected: m.expected }); }}>{o}</button>)}</div>
      {verdict}
    </div>
  );
}


/** Boşluk ipucu: soru sırasında kapalı; dokunuşla açılırsa cevap "ipucuyla" sayılır (PM 7004537514-2) */
export function IpucuDugmesi({ metin, onAc }: { metin: string; onAc: () => void }) {
  const [acik, setAcik] = useState(false);
  if (acik) return <p class="small" data-test="ipucu"><Rich text={metin} /></p>;
  return <div><button class="btn ghost sm" data-test="ipucu-ac" onClick={() => { setAcik(true); onAc(); }}>İpucu göster</button><div class="tiny muted">Açarsan bu kart daha sık tekrar gelir.</div></div>;
}
