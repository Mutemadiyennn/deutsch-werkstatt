/**
 * Kelime Bahçesi (PM-049, #54 A13): günlük kelime tekrar turu.
 * Kartlar öğrenciye soru olarak döner; cevap öğrenciden beklenir. Yanlışta doğrusu öğrencinin cevabıyla yan yana
 * gösterilir, kart turun sonunda başka örnek ve başka türle yeniden gelir ve kişisel bankaya girer (srs.review).
 */
import { gorevSay } from "../services/gorev.ts";
import { cumleKaydet } from "../services/kullanim.ts";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { Lexeme, LearnerItem } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadFoto, loadLexicon, loadM1Gun } from "../services/content.ts";
import { bahceTamam, xpOku, xpVer } from "../services/ilerleme.ts";
import { Kutlama, Ozet, useOturumXp } from "../ui/solen.tsx";
import { XP, seri, yerelGun } from "../core/gun.ts";
import { getMeta, itemsMap, metaPrefix, personalWords, putItems, setMeta } from "../data/db.ts";
import POLICY from "../policy.json" with { type: "json" };
import { hizliGecis, review, sessionKey, type Outcome } from "../core/srs.ts";
import { accepted, availableTypes, buildRound, isCard, personalMatch, collocOf, synonymHit, collocQuestion, formFor, boslukSecimi, ertele, esdizimler, gosterilenCogul, tanitildi, gorulenKelimeler, havuz, isNoun, sonrakiExSeen, meaningOptions, ownSentenceCheck, type Yakinlik, pathOf, requeue, startedToday, m1Hak, DAILY_ACTIVE, DAILY_NEW, HIZLI_SN, ONERI_ART_ARDA, sinaKabul, sinaTuru, type GardenQ, type QType } from "../core/garden.ts";
import { ruleVerdict } from "../core/answer.ts";
import { umlautEksik } from "../core/esdeger.ts";
import { judgeWord, numberWordHint } from "../core/grading.ts";
import { isDue } from "../core/srs.ts";
import { speak, stopSpeaking } from "../services/speech.ts";
import { haptic } from "../services/haptics.ts";
import { ActionBar, AnswerField, FeedbackBand, ListenButton, ProgressHeader, YanlisIci } from "../ui/kit.tsx";
import { Art, ErrorPanel, FocusChip, Loading } from "../ui/components.tsx";
import { Photo } from "../ui/learn.tsx";
import { Rich } from "../ui/rich.tsx";

const E2E = import.meta.env.MODE === "e2e";
/** Soru ekranından tura dönen bilgi: gerçekleşen soru türü (sına düşünce tanıma), sına mı, cevap süresi (öneri için) */
interface SoruBilgi { tip?: QType; sina?: boolean; ms?: number }
/** Seviye tespitinde hızlı şeridi varsayılan yapan sonuçlar (PM-066 madde 4) */
const A2_VE_USTU = ["A2", "B1", "B2", "C1", "C2"];

/** `yazim`: kelime doğru, yalnızca ümlaut/ß eksik (PM 7004537514-1): kart "bilmiyor" sayılmaz, turun sonunda bir kez daha sorulur */
type Result = { ok: boolean; answer?: string; expected?: string; note?: string; yazim?: boolean };

/**
 * `day`: M1 gününün Seans 1'i (#58 A5b). Havuz: önce önceki günlerin tanıtılmamış kartları, sonra günün kartları, sonra K1.
 * Seans 1'in bitişi tur sayısına değil kanıta bağlı (inceleme #66 P1-3): bu kartların hepsi tanıtılınca (cihazda kaydı
 * olunca) işaretlenir; kalan varsa tur sonunda "Bir tur daha" sunulur ve Bugün yine Seans 1'i gösterir. Günün kartları
 * takvim gününün yeni kart sınırına takılmaz (M1 günü birimdir). İşaret son cevapta yazılır, ekranın boyanmasına bağlı değil.
 */
export function Garden({ day }: { day?: number } = {}) {
  const [tur, setTur] = useState(0);
  return <GardenTur key={tur} day={day} again={() => setTur((x) => x + 1)} />;
}

function GardenTur({ day, again }: { day?: number; again: () => void }) {
  const [data, setData] = useState<{ lex: Map<string, Lexeme>; all: Lexeme[]; items: Map<string, LearnerItem>; round: GardenQ[]; capped: boolean; gunKartlari: string[]; yakin: Yakinlik } | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [i, setI] = useState(0);
  const [score, setScore] = useState({ ok: 0, n: 0 });
  // görev "2 turda %90+": yalnızca ipucusuz doğru sayılır, "Emin değilim, geç" de paydada (inceleme #108 P1-1)
  const [gorevTur, setGorevTur] = useState({ temiz: 0, toplam: 0 });
  // B16 hızlı şerit (PM-066): yeni kartlar "Biliyorum, sına beni" üretim sorusuyla açılır; kaynak: öğrenci ya da seviye tespiti
  const { placement } = useApp();
  const [hizli, setHizli] = useState<null | "ogrenci" | "tespit">(null);
  const [oneri, setOneri] = useState<"yok" | "goster" | "reddedildi">("yok");
  const [oneriSayac, setOneriSayac] = useState(0);
  // bu soru cevaplandı mı ("Normal akışa dön" cevaplanmış sına sorusunu bozmasın; 2. tur P2-C)
  const [cevapVar, setCevapVar] = useState(false);
  // sına bilinemedi, kelime şimdi tanıtılıyor: bant bunu söyler (PM 7018403441-2)
  const [tanitimda, setTanitimda] = useState(false);
  useEffect(() => { setTanitimda(false); }, [i]);
  // seçilmiş fotoğraf haritası tur başında bir kez (soru değişirken beklenmez; inceleme #121 P1-5)
  useEffect(() => { void loadFoto(); }, []);
  const turXp = useOturumXp();
  const startedAt = useMemo(() => Date.now(), []);
  // çift dokunuş bir sonraki tanıtımı atlatmaz (inceleme #126 P1-3); kanca erken dönüşlerden önce
  const ertelendi = useRef(-1);
  // ekran açıldıktan sonraki ilk 350 ms'deki "Tamam" sayılmaz: çift dokunuşun ikincisi yeni tanıtımı atlatmasın (inceleme #126 2. tur P1-B)
  const acildi = useRef(0);
  useEffect(() => { acildi.current = performance.now(); }, [i]);

  useEffect(() => {
    (async () => {
      const { lexemes } = await loadLexicon();
      const lex = new Map(lexemes.map((l) => [l.id, l]));
      const items = await itemsMap(lexemes.map((l) => l.id));
      // yeni kart sırası: önce M1 gününün yeni kartları (A5b), sonra K1 derin kartlar sıklık sırasıyla
      const k1 = lexemes.filter((l) => l.tier === "K1" && isCard(l)).sort((a, b) => (a.freqRank ?? 9e9) - (b.freqRank ?? 9e9)).map((l) => l.id);
      const gunler = day ? await Promise.all(Array.from({ length: day }, (_, k) => loadM1Gun(k + 1).catch(() => null))) : [];
      const gunKartlari = [...new Set(gunler.flatMap((g) => g?.yeni_kartlar ?? []))].filter((id) => lex.has(id) && isCard(lex.get(id)!));
      const kalan = gunKartlari.filter((id) => !items.has(id));
      const pool = [...kalan, ...k1.filter((id) => !kalan.includes(id))];
      // duyduğun ve "nasıl derim" diye sorduğun kelimeler öncelikli (kişisel banka, #58 A3, LS-7.5)
      const priority = personalMatch(await personalWords(), lexemes);
      const t = startedToday(items.values());
      // M1 gününde günün kartları takvim sınırına takılmaz; kişisel kelimeler (duyduğum, nasıl derim) yalnızca takvim hakkı
      // kalmışsa ve günün kartlarının yerini almadan gelir (inceleme #66 2. tur P1-A)
      const takvim = Math.max(0, DAILY_NEW - t.passive);
      const hak = m1Hak(takvim, kalan.length, priority.length);
      const kisisel = !day || hak.kisiselIzin ? priority : [];
      const newLeft = day ? hak.newLeft : takvim, activeLeft = DAILY_ACTIVE - t.active;
      // PM 7030294523 P0: "kendi cümleni kur" yalnızca İlk Hafta bitmiş ve en az bir kalıp bitirilmişse (kartın kararlılığı garden.ts'de)
      const kendiCumle = { ilkHaftaBitti: !!(await getMeta(`m1:gun:${POLICY.own_sentence.ilk_hafta_son_gun}`)), kalipBitti: (await metaPrefix("kalip:bitti:")).length > 0 };
      let round = buildRound(lex, items, pool, { priority: kisisel, newLeft, activeLeft, yeniAyir: Math.min(8, kalan.length), kendiCumle });
      // e2e: belirli kartın tanıtımı (en uzun kart sığıyor mu ölçümü, PM 7024150313); yalnızca e2e derlemesinde
      if (E2E) { const k = sessionStorage.getItem("e2e-kart"); if (k && lex.has(k)) round = [{ lexId: k, type: "listen_meaning", intro: true, ex: 0 }]; }
      // B16 kapsamı (PM-066; inceleme #113 P1-1/2/3): öğrencinin "sına beni"si o günün kalan kartları için (`hizliGun`);
      // seviye tespiti A2 ve üstüyse yalnızca İlk Hafta günlerinde varsayılan; "normal akış" seçimi kalıcı (`hizliSerit` = false)
      const bugun = yerelGun(new Date());
      const kapali = (await getMeta<boolean>("hizliSerit")) === false;
      const ogrenciBugun = (await getMeta<string>("hizliGun")) === bugun;
      const a2 = !!placement && A2_VE_USTU.includes(placement.overall ?? "") && !!day && day <= 7;
      // öğrencinin bugünkü açık seçimi kalıcı "normal akış"ı da geçer (inceleme #113 2. tur P2-B)
      if (ogrenciBugun || (!kapali && a2)) { round = sinaTuru(round); setHizli(ogrenciBugun ? "ogrenci" : "tespit"); }
      // normal akış seçildiyse ya da bugün öneri reddedildiyse kendiliğinden öneri de gelmez (tercih saygısı)
      if (kapali || (await getMeta<string>("hizliOneriRed")) === bugun) setOneri("reddedildi");
      // boş tur: günün kartları zaten tanıtıldıysa Seans 1 burada tamamlanır (ekran efektine bırakılmaz)
      if (day && !round.length && !kalan.length) await bahceTamam(day);
      // çeldirici yakınlığı: turun ve günün kartları, öğrencinin tanıdıkları (PM 7011722598 madde 5)
      const yakin: Yakinlik = { tur: new Set([...round.map((q) => q.lexId), ...gunKartlari]), bilinen: new Set(items.keys()) };
      setData({ lex, all: lexemes, items, round, capped: newLeft <= 0, gunKartlari, yakin });
    })().catch((e) => setErr(String(e?.message || e)));
    return () => stopSpeaking();
  }, []);

  if (err) return <ErrorPanel message={err} onRetry={() => location.reload()} />;
  if (!data) return <Loading />;
  const { round } = data;
  const kalanSayi = data.gunKartlari.filter((id) => !data.items.has(id)).length;
  if (!round.length) return <GardenEmpty day={day} capped={data.capped} />;
  if (i >= round.length) return <GardenDone day={day} score={score} items={data.items} kalan={kalanSayi} again={again} xp={turXp} gorevTur={gorevTur} turKimlik={`tur@${startedAt}`}
    kelimeler={[...new Set(round.filter((q) => q.intro || q.sina).map((q) => { const l = data.lex.get(q.lexId); return l ? (l.art ? `${l.art} ${l.de}` : l.de) : ""; }).filter(Boolean))]} />;
  const q = round[i]!;
  const l = data.lex.get(q.lexId)!;

  const finish = async (r: Result, outcome: Outcome | null, exi = q.ex, m: SoruBilgi = {}) => {
    const tip = m.tip ?? q.type;
    const sinaBildi = !!q.sina && m.sina !== false && outcome === "correct";
    if (busy) return; // "Devam"a çift dokunuş aynı değerlendirmeyi iki kez yazmaz (inceleme #59 P2-2)
    setBusy(true);
    try {
      const once = data.items.get(q.lexId);
      if (!outcome && once) {
        // "Emin değilim, geç" de cümleyi gösterdi: sonraki oturum başka cümleyle açılır (inceleme #92 P2)
        const next = { ...once, exSeen: sonrakiExSeen(once, exi) };
        await putItems([next]); data.items.set(q.lexId, next);
      }
      if (outcome) {
        // B16: üretimle kanıtlanan yeni kart tanıma basamağını atlar (yüksek başlangıç kararlılığı); öteki her şey normal
        const next = sinaBildi ? hizliGecis(data.items.get(q.lexId), q.lexId, sessionKey("garden", startedAt))
          : review(data.items.get(q.lexId), { itemId: q.lexId, kind: "lexeme", path: pathOf(tip), outcome, session: sessionKey("garden", startedAt), source: "drill", ctx: tip });
        next.lastQ = tip;
        if ((tip === "article" || tip === "colloc") && outcome === "correct") next.kopru = true;
        // PM-062: sonraki oturum gösterilen cümlenin ardından başlar (aynı cümleyle art arda açılmaz)
        next.exSeen = sonrakiExSeen(next, exi);
        await putItems([next]);
        data.items.set(q.lexId, next);
      }
    } catch { setBusy(false); setErr("Cevabın kaydedilemedi. Tekrar dene."); return; }
    setBusy(false);
    // "Emin değilim, geç" sayılmaz: ne doğru ne soru (özet tutarlı, inceleme #59 P2-1)
    if (outcome) setScore((s) => ({ ok: s.ok + (r.ok ? 1 : 0), n: s.n + 1 }));
    setGorevTur((g) => ({ temiz: g.temiz + (outcome === "correct" ? 1 : 0), toplam: g.toplam + 1 }));
    // XP yalnızca ipucusuz doğruda (ipucu cevabı gösteriyor; D-102, inceleme #85 P2-2); uçuş da 0 (inceleme #87 2. tur)
    if (outcome === "correct") { void xpVer(sinaBildi ? XP.bilinen : XP.dogru); void gorevSay("bahceIpucusuz", q.lexId); }  // B11b: ipucusuz doğru, kart başına günde bir kez
    // B16 kendiliğinden öneri: art arda 3 yeni kart ilk tanıma sorusunda hızlı ve doğru (PM-066 madde 2)
    if ((q.intro || q.ilkSoru) && !hizli && oneri === "yok") {
      const n = outcome === "correct" && tip === "listen_meaning" && (m.ms ?? 1e9) <= HIZLI_SN * 1000 ? oneriSayac + 1 : 0;
      setOneriSayac(n);
      if (n >= ONERI_ART_ARDA && round.slice(i + 1).some((x) => x.intro && !x.retry)) setOneri("goster");
    }
    // tekrar, en son gösterilen cümlenin ardından ("Başka cümle"ye basıldıysa o cümleden sonra; inceleme #92 P1-1)
    const r2 = !r.ok && outcome ? requeue(round, { ...q, type: tip, sina: false, ex: exi }, l, Math.random, data.items.get(q.lexId)) : round;
    // son cevap: günün bütün kartları tanıtıldıysa Seans 1 şimdi işaretlenir (inceleme #66 P1-1)
    if (day && i + 1 >= r2.length && data.gunKartlari.every((id) => data.items.has(id))) { try { await bahceTamam(day); } catch { /* bir sonraki açılışta yeniden denenir */ } }
    setData({ ...data, round: r2 });
    setI(i + 1);
  };

  // ilerleme soru sayar (tanıtım ekranı soru değil); ertelenecek ilk sorular baştan sayılır (PM-069 madde 3)
  const soruMu = (x: GardenQ) => !x.intro || !!x.retry || !!x.sina;
  const ilerleme = { n: round.slice(0, i).filter(soruMu).length, toplam: round.filter(soruMu).length + round.slice(i).filter((x) => !soruMu(x)).length };
  // PM-069 madde 3: tanıtım bitti, ilk soru en az 2 öğe sonra (değerlendirme yok, kayıt yok)
  const tanitimBitti = (exi: number) => { if (ertelendi.current >= i || performance.now() - acildi.current < 350) return; ertelendi.current = i; acildi.current = performance.now(); setData({ ...data, round: ertele(round, i, exi) }); setI(i + 1); };
  // öğrencinin seçimi yalnızca bugünün kalan yeni kartları için (inceleme #113 P1-1)
  const hizliAc = async (bas: number, kaynak: "ogrenci") => { setHizli(kaynak); setOneri("yok"); await setMeta("hizliGun", yerelGun(new Date())); return sinaTuru(round, bas); };
  // tanıtım kartında "Biliyorum, sına beni": düğmeye basılan kartın KENDİSİ hemen sınanır, sonraki yeni kartlar sınavla açılır (PM 7018403441-1)
  const tanitimdaSina = async () => {
    const r2 = await hizliAc(i + 1, "ogrenci");
    setData({ ...data, round: r2.map((x, k) => (k === i ? { lexId: q.lexId, type: "tr_de" as const, sina: true, ex: q.ex } : x)) });
  };
  const normaleDon = async () => {
    // varsayılan (tespit) kalıcı kapanır, öğrencinin bugünkü seçimi geri alınır; ikisi birlikteyse de tek basış yeter (2. tur P2-A)
    await setMeta("hizliSerit", false);
    await setMeta("hizliGun", ""); await setMeta("hizliOneriRed", yerelGun(new Date()));
    setHizli(null); setOneri("reddedildi");
    setData({ ...data, round: round.map((x, k) => ((k > i || (k === i && !cevapVar)) && x.sina ? { ...x, sina: false, intro: true, type: "listen_meaning" as const } : x)) });
  };
  if (oneri === "goster") return (
    <div class="stack" data-test="garden">
      <ProgressHeader title="Kelime Bahçesi" back="#/today" right={<FocusChip />} ilerleme={ilerleme} />
      <section class="card stack fade" data-test="hizli-oneri">
        <h2>Bunları biliyor gibisin.</h2>
        <p>Son üç kelimeyi hızlı ve doğru bildin. Kalan yeni kelimeleri tek tek sınayayım mı? Bildiğini Almanca yazarak (ya da söyleyerek) kanıtlarsın; bilemediğinde normal tanıtım gelir.</p>
      </section>
      <ActionBar>
        <button class="btn primary block" data-test="hizli-evet" onClick={async () => { const r2 = await hizliAc(i, "ogrenci"); setData({ ...data, round: r2 }); }}>Evet, sına beni</button>
        <button class="btn block" data-test="hizli-hayir" onClick={() => { setOneri("reddedildi"); void setMeta("hizliOneriRed", yerelGun(new Date())); }}>Hayır, böyle devam</button>
      </ActionBar>
    </div>
  );
  return (
    <div class="stack" data-test="garden" data-hizli={hizli ?? undefined} {...(E2E ? { "data-i": i } : {})}>
      <ProgressHeader title="Kelime Bahçesi" back="#/today" right={<FocusChip />} ilerleme={ilerleme} />
      {/* hızlı şerit açıkken çıkış her soruda görünür (inceleme #113 P1-1); açıklama yalnızca ilk soruda */}
      {hizli && <div class="small bilgi-bant" data-test={hizli === "tespit" ? "hizli-tespit" : "hizli-ogrenci"}>
        <span class="grow" data-test="hizli-bant-metin">{tanitimda ? "Bu kelimeyi birlikte öğreniyoruz; sınama sıradaki yeni kelimede sürüyor." : i === 0 && hizli === "tespit" ? "İlk haftayı senin hızında geçelim: bildiğin kelimeyi Almanca yazarak kanıtla, geç." : "Bugünün yeni kelimelerini sınıyoruz."}</span>
        <button class="linkbtn" data-test="hizli-kapat" onClick={() => void normaleDon()}>Normal akışa dön</button></div>}
      <Question key={`${i}:${q.lexId}:${q.type}:${q.sina ? 1 : 0}`} q={q} l={l} all={data.all} yakin={data.yakin} gorulen={gorulenKelimeler(data.lex, [...data.items.values()].filter(tanitildi).map((x) => x.itemId))} onDone={(...a) => { setCevapVar(false); return finish(...a); }} onCevap={() => setCevapVar(true)} onTanitim={() => setTanitimda(true)} onSina={q.intro && !q.retry && !hizli ? () => void tanitimdaSina() : undefined} onTanitimBitti={q.intro && !q.sina && !q.retry ? tanitimBitti : undefined} />
    </div>
  );
}

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

function Question({ q, l, all, yakin, gorulen, onDone: bitir, onSina, onCevap, onTanitim, onTanitimBitti }: { q: GardenQ; l: Lexeme; all: Lexeme[]; yakin?: Yakinlik; /** öğrencinin gördüğü kelimeler (PM-069 P0) */ gorulen?: Set<string>; onDone: (r: Result, o: Outcome | null, exi: number, m?: SoruBilgi) => void; onSina?: () => void; onCevap?: () => void; onTanitim?: () => void; /** PM-069 madde 3: tanıtım ayrı; ilk soru sonra gelir */ onTanitimBitti?: (exi: number) => void }) {
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
  // cümlenin fotoğrafı (cevap kartı); fotoğraf bileşeni yenisi hazır olana kadar eskisini tutar (zıplama yok; inceleme #92 2. tur)
  const ex = l.examples[exi % Math.max(1, l.examples.length)];
  const fotoEx = exi, fotoOrnek = ex;
  const show = (r: Result) => { if (sure.current === null) sure.current = Date.now() - basla.t; onCevap?.(); setRes(r); haptic(r.ok ? "success" : "error"); };
  const next = (o: Outcome | null) => onDone(res || { ok: false }, o, exi);
  const baska = (n: number) => n > 1 ? <button class="ikincil-eylem" data-test="baska-cumle" onClick={() => setExi((x) => x + 1)}>Başka cümle</button> : null;

  // önce duy (PM-049 tanıtım): kelime ekrana gelince bir kez okunur (inceleme #59 P2-8)
  useEffect(() => { if (intro) void speak(isNoun(l) ? `${l.art} ${l.de}` : l.de, "de", "normal"); }, [intro]);
  const col = collocOf(l);
  if (intro) return (
    <div class="stack fade" data-test="garden-intro" data-lex={l.id}>
      <section class="card stack"><div class="kicker">Yeni kelime</div>
        {/* PM 14:05 Berlin madde 1: tanıtımda kelimenin fotoğrafı (sayaçla döner); cümle görseli yalnızca cümlenin yanında */}
        <Photo q={l.img} sira={q.ex} yer={[`${l.id}#kart`]} alt={l.tr} />
        {/* PM 7024150313: görselli en uzun kart da düğmelere değmeden sığar — kelime ile dinle aynı satırda, çoğul anlamın yanında,
            "Başka cümle" cümlenin yanında; eşdizimlerden en çok 3'ü açık */}
        <div class="row" style={{ flexWrap: "nowrap", alignItems: "center", gap: 10 }}>
          <div class="de-xl grow" lang="de" style={{ minWidth: 0 }}><Art art={l.art} de={l.de} /></div>
          <ListenButton text={isNoun(l) ? `${l.art} ${l.de}` : l.de} />
        </div>
        <p style={{ margin: 0 }}><span data-test="intro-tr">{l.tr}</span>{gosterilenCogul(l) && <span class="small muted cogul-satir" data-test="intro-pl"> · Çoğulu: <span lang="de">{isNoun(l) ? "die " : ""}{gosterilenCogul(l)}</span></span>}</p>
        {/* PM 7026866757-1: örnek cümle tam genişlikte, hecelenmez; "Başka cümle" Türkçe satırın altında, kendi satırında */}
        {ex && <p class="small ornek-cumle" data-test="intro-ex" style={{ margin: 0 }}><span lang="de">{ex.de}</span><br /><span class="muted">{ex.tr}</span></p>}
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
  const prompt = qe.type === "photo_say" ? <><div class="kicker">Fotoğraftaki ne? Artikeliyle söyle ya da yaz</div><Photo q={l.img} sira={exi} /><p class="small muted">{l.tr}</p></>
    : qe.type === "tr_de" && sina ? <><div class="kicker" data-test="sina-soru" {...(E2E ? { "data-cevap": sinaKabul(l)[0] } : {})}>Biliyorum, sına beni · ipucu yok</div><div class="de-lg">{l.tr}{isNoun(l) ? " (artikeliyle)" : ""}</div>{ex?.tr && <p class="small" data-test="sina-baglam">Cümlede: <span class="muted">{ex.tr}</span></p>}<p class="small muted">Almanca yaz ya da söyle. Bilirsen bu kelime ileri basamaklardan devam eder.</p>{!res && <button class="btn ghost" data-test="sina-bilmiyorum" onClick={() => show({ ok: false, expected: sinaKabul(l)[0] })}>Bilmiyorum, tanıt</button>}</>
    : qe.type === "tr_de" ? <><div class="kicker">Almanca söyle ya da yaz</div><div class="de-lg">{l.tr}{isNoun(l) ? " (artikeliyle)" : ""}</div></>
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
        <FeedbackBand kind="info" title="Bunu kendim kontrol edemem.">
          {ownNote && <div class="small" data-test="own-missing">Cümlende bu kelimeyi göremedim. Çekimli hâlini kullandıysan doğru olabilir.</div>}
          Cümlen kelimeyi doğru kullanıyor mu? Bir kez yüksek sesle oku.{ex && <> Örnek: <span lang="de">{ex.de}</span></>}</FeedbackBand></section>
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
    if (q.type === "article") { const opts = ["der", "die", "das"]; return { title: "Hangi artikel?", stem: l.de, opts, ans: opts.indexOf(l.art!), expected: `${l.art} ${l.de}` }; }
    const c = collocQuestion(l, all);
    // yeterli güvenli çeldirici yoksa anlam sorusuna düşer (tek doğru cevap kuralı)
    if (!c) { const o = meaningOptions(l, all, Math.random, yakin); return { title: "Ne demek?", stem: isNoun(l) ? `${l.art} ${l.de}` : l.de, ...o, expected: l.tr }; }
    return { title: `Tamamla: ${c.tr}`, stem: c.stem, opts: c.opts, ans: c.ans, expected: c.stem.replace("___", c.opts[c.ans]!) };
  }, [q.lexId, q.type]);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => { if (q.type === "listen_meaning") void speak(isNoun(l) ? `${l.art} ${l.de}` : l.de, "de", "normal"); }, []);
  return (
    <div class="stack fade" data-test={`gq-${q.type}`} data-lex={l.id}>
      <section class="card stack"><div class="kicker">{m.title}</div>
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

/** Tur sonu: yarın kaç kart dönecek (somut "sırada ne var") */
function tomorrow(items: Map<string, LearnerItem>): string {
  const t = new Date(Date.now() + 24 * 3600_000);
  let n = 0;
  for (const it of items.values()) if (isDue(it, "passive", t) || isDue(it, "active", t)) n++;
  return n ? `Yarın ${n} kart seni bekliyor.` : "Yarın yeni kartlar gelecek.";
}

/** Tur sonu. M1 gününde günün kartlarından tanıtılmamış kalan varsa ana eylem "Bir tur daha" (Seans 1 henüz bitmedi) */
function GardenDone({ day, score, items, kalan, again, xp, kelimeler, gorevTur, turKimlik }: { day?: number; score: { ok: number; n: number }; items: Map<string, LearnerItem>; kalan: number; again: () => void; xp: number; kelimeler: string[]; gorevTur: { temiz: number; toplam: number }; turKimlik: string }) {
  const devam = !!day && kalan > 0;
  const [seriGun, setSeriGun] = useState<number | undefined>();
  // tur sonu sayfanın başından açılır: son cevap kartının kaydırması "Tur bitti" ve halkayı ekran dışında bırakmasın (inceleme #100 2. tur)
  // önceki cevap kartının yumuşak kaydırması sürüyor olabilir: hemen ve bir kare sonra başa
  useEffect(() => {
    window.scrollTo(0, 0); requestAnimationFrame(() => window.scrollTo(0, 0));
    void xpOku().then((x) => setSeriGun(seri(x)));
    // B11b günlük görev: en az 5 soruluk tur %90 ve üstü
    if (gorevTur.toplam >= 5 && gorevTur.temiz / gorevTur.toplam >= 0.9) void gorevSay("tur90", turKimlik);
  }, []);
  return (
    <div class="stack"><ProgressHeader title="Kelime Bahçesi" back="#/today" ilerleme={{ n: 1, toplam: 1 }} />
      <section class="card stack" data-test="garden-done"><Kutlama><div class="kicker">Tur bitti</div></Kutlama>
        <Ozet dogru={score.ok} toplam={score.n} xp={xp} seriGun={seriGun} kelimeler={kelimeler} />
        {/* PM 7030294523 B9: metin gerçeği söyler — yanlışlar aynı turun sonunda bir kez daha sorulur (requeue), sonra aralıklı tekrar */}
        {score.ok < score.n && <p class="small" data-test="tur-yanlis-not">Yanlış yaptıkların bu turun sonunda bir kez daha geldi; sonra aralıklarla yine karşına çıkacak.</p>}
        {devam ? <p data-test="garden-kalan">Bugünün kartlarından <b>{kalan}</b> yeni kelime kaldı.</p> : <p class="small muted" data-test="garden-tomorrow">{tomorrow(items)}</p>}
        {devam ? <ActionBar><button class="btn primary block" data-test="garden-again" onClick={again}>Bir tur daha</button></ActionBar>
          : <a class="btn primary block" href="#/today" data-test="garden-back">{day ? "Sıradaki adıma geç" : "Bugün'e dön"}</a>}</section></div>
  );
}

/** Soru yoksa (günün kartları tanıtılmışsa Seans 1 yüklemede işaretlendi) */
function GardenEmpty({ day, capped }: { day?: number; capped: boolean }) {
  return (
    <div class="stack"><ProgressHeader title="Kelime Bahçesi" back="#/today" />
      <section class="card stack" data-test="garden-empty"><h2>Bugün bahçe sakin</h2>
        <p>{capped ? "Bugünkü yeni kartların bitti ve vadesi gelen kart yok. Yarın yeni kartlar ve tekrarlar seni bekliyor." : "Şu an vadesi gelen kart yok. Yeni kart da kalmadı."}</p>
        <a class="btn primary block" href="#/today">{day ? "Sıradaki adıma geç" : "Bugün'e dön"}</a></section></div>
  );
}

/** Boşluk ipucu: soru sırasında kapalı; dokunuşla açılırsa cevap "ipucuyla" sayılır (PM 7004537514-2) */
function IpucuDugmesi({ metin, onAc }: { metin: string; onAc: () => void }) {
  const [acik, setAcik] = useState(false);
  if (acik) return <p class="small" data-test="ipucu"><Rich text={metin} /></p>;
  return <div><button class="btn ghost sm" data-test="ipucu-ac" onClick={() => { setAcik(true); onAc(); }}>İpucu göster</button><div class="tiny muted">Açarsan bu kart daha sık tekrar gelir.</div></div>;
}
