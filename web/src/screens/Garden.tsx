/**
 * Kelime Bahçesi (PM-049, #54 A13): günlük kelime tekrar turu.
 * Kartlar öğrenciye soru olarak döner; cevap öğrenciden beklenir. Yanlışta doğrusu öğrencinin cevabıyla yan yana
 * gösterilir, kart turun sonunda başka örnek ve başka türle yeniden gelir ve kişisel bankaya girer (srs.review).
 */
import { gorevSay } from "../services/gorev.ts";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import type { Lexeme, LearnerItem } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadFoto, loadIndex, loadLexicon, loadM1Gun } from "../services/content.ts";
import { gecilenGunler } from "../services/seviye.ts";
import { bahceTamam, xpOku, xpVer } from "../services/ilerleme.ts";
import { Kutlama, Ozet, useOturumXp } from "../ui/solen.tsx";
import { XP, seri, yerelGun } from "../core/gun.ts";
import { bahceGorulenEkle, getMeta, itemsMap, metaPrefix, personalWords, putItems, setMeta } from "../data/db.ts";
import POLICY from "../policy.json" with { type: "json" };
import { hizliGecis, review, sessionKey, type Outcome } from "../core/srs.ts";
import { buildRound, fotoluKartlar, isCard, personalMatch, ertele, tanitildi, gorulenKelimeler, sonrakiExSeen, type Yakinlik, pathOf, requeue, startedToday, m1Hak, DAILY_ACTIVE, DAILY_NEW, HIZLI_SN, ONERI_ART_ARDA, sinaTuru, yarinKartSayisi, yarinMetni, type GardenQ, type QType } from "../core/garden.ts";
import { stopSpeaking } from "../services/speech.ts";
import { ActionBar, ProgressHeader } from "../ui/kit.tsx";
import { ErrorPanel, FocusChip, Loading } from "../ui/components.tsx";
import { Question, type Result, type SoruBilgi } from "../ui/soru/Soru.tsx";

const E2E = import.meta.env.MODE === "e2e";
/** Seviye tespitinde hızlı şeridi varsayılan yapan sonuçlar (PM-066 madde 4) */
const A2_VE_USTU = ["A2", "B1", "B2", "C1", "C2"];


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
      // PM-114 B: atlanan günlerin kartları "biliniyor" diye cihazda; o günlerin dosyaları yüklenmez (A2'nin 57. günü 56 dosya indirmez)
      const atl = day ? (await gecilenGunler((await loadIndex()).m1.map((g) => g.day)).catch(() => null))?.atlanan ?? new Set<number>() : new Set<number>();
      const gunler = day ? await Promise.all(Array.from({ length: day }, (_, k) => (atl.has(k + 1) ? Promise.resolve(null) : loadM1Gun(k + 1).catch(() => null)))) : [];
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
      // B4: "Fotoğraftaki ne?" yalnızca seçilmiş fotoğrafı olan kartta; çevrimdışında yalnız paketteki (yerel yollu) fotoğraflar
      // (dış adres çevrimdışı gelmez; pakettekini servis işçisi önbelleğe alır — inceleme #187 P2-5)
      const fotoTum = await loadFoto();
      const fotoHarita = navigator.onLine === false ? Object.fromEntries(Object.entries(fotoTum).filter(([, f]) => f.src.startsWith("content/"))) : fotoTum;
      fotoluKartlar(new Set(Object.keys(fotoHarita).filter((k) => k.endsWith("#kart")).map((k) => k.slice(0, -"#kart".length))));
      // PM 7030294523 P0: "kendi cümleni kur" yalnızca İlk Hafta bitmiş ve en az bir kalıp bitirilmişse (kartın kararlılığı garden.ts'de)
      const kendiCumle = { ilkHaftaBitti: !!(await getMeta(`m1:gun:${POLICY.own_sentence.ilk_hafta_son_gun}`)), kalipBitti: (await metaPrefix("kalip:bitti:")).length > 0 };
      let round = buildRound(lex, items, pool, { priority: kisisel, newLeft, activeLeft, yeniAyir: Math.min(8, kalan.length), kendiCumle });
      // e2e: belirli kartın tanıtımı (en uzun kart sığıyor mu ölçümü, PM 7024150313); yalnızca e2e derlemesinde
      // e2e-tur: aynı kartın belirli soru türü (tanıtımsız; #137 P2-2 fotoğraflı soru testi)
      if (E2E) { const k = sessionStorage.getItem("e2e-kart"), t = sessionStorage.getItem("e2e-tur") as QType | null; if (k && lex.has(k)) round = [t ? { lexId: k, type: t, ex: 0 } : { lexId: k, type: "listen_meaning", intro: true, ex: 0 }]; }
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
  if (i >= round.length) return <GardenDone day={day} score={score} items={data.items} lex={data.lex} kalan={kalanSayi} again={again} xp={turXp} gorevTur={gorevTur} turKimlik={`tur@${startedAt}`}
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
        // B5: bugün Bahçede görülen kart derste yeniden tanıtılmaz (D-121)
        void bahceGorulenEkle(q.lexId);
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

/** Tanıtım kartında görsel: tam genişlikte en çok 160 px; sığmayan kartta kelimenin altında sağda 104 px kare; düğmeye en az 8 px pay */

/** Tur sonu. M1 gününde günün kartlarından tanıtılmamış kalan varsa ana eylem "Bir tur daha" (Seans 1 henüz bitmedi) */
function GardenDone({ day, score, items, lex, kalan, again, xp, kelimeler, gorevTur, turKimlik }: { day?: number; score: { ok: number; n: number }; items: Map<string, LearnerItem>; lex: Map<string, Lexeme>; kalan: number; again: () => void; xp: number; kelimeler: string[]; gorevTur: { temiz: number; toplam: number }; turKimlik: string }) {
  const devam = !!day && kalan > 0;
  const [seriGun, setSeriGun] = useState<number | undefined>();
  // yalnız Bahçe kartları (ders ve medya öğeleri sayılmaz); `items` tur boyunca güncellenir (öğrenci günlüğü 7057160147 N6)
  const yarin = useMemo(() => yarinKartSayisi(items, lex, new Date()), []);
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
        {devam ? <p data-test="garden-kalan">Bugünün kartlarından <b>{kalan}</b> yeni kelime kaldı.</p> : <p class="small muted" data-test="garden-tomorrow">{yarinMetni(yarin)}</p>}
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
