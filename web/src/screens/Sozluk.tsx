/**
 * Sözlük (#58 B1): çevrimdışı Almanca ↔ Türkçe arama. Sonuca dokununca kart açılır (anlam, çoğul/fiil biçimleri,
 * eşdizimler, örnek, Türkçe uyarı); "Duyduğum kelime" olarak kişisel listeye girer, Bahçe kartıysa Bahçe'de öne alınır
 * (LS-7.5). Sözlükte olmayan kelime de "Duyduğum kelime" olarak eklenebilir (anlamı isteğe bağlı).
 * Kart adresle açılır (#/sozluk/<arama>/<kart>): geri hareketi aramaya döner.
 */
import { KALIP_GERI } from "./Kalip.tsx";
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Lexeme, Pattern } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon } from "../services/content.ts";
import { addPersonal, personalWords } from "../data/db.ts";
import { sozlukAra, kisiselAnahtar, tamVar } from "../core/sozlukAra.ts";
import { personalMatch } from "../core/garden.ts";
import { Art, ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { ListenButton } from "../ui/kit.tsx";
import { Rich } from "../ui/rich.tsx";
import { ayracBagla } from "../core/ayrac.ts";

const aramaAdresi = (q: string) => `#/sozluk/${encodeURIComponent(q.trim() || "-")}`;

export function SozlukEkrani({ q: ilk = "", id }: { q?: string; id?: string }) {
  const { toast } = useApp();
  const [lex, setLex] = useState<Lexeme[] | null>(null);
  const [kaliplar, setKaliplar] = useState<Map<string, Pattern>>(new Map());
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState(ilk === "-" ? "" : ilk);
  const [bahce, setBahce] = useState<Set<string>>(new Set());
  const [tr, setTr] = useState("");
  const [benim, setBenim] = useState<{ de: string; tr?: string }[]>([]);
  useEffect(() => {
    loadLexicon().then((x) => { setLex(x.lexemes); setKaliplar(new Map(x.patterns.map((p) => [p.id, p]))); }, (e) => setErr(e instanceof Error ? e.message : "Sözlük yüklenemedi."));
    void personalWords().then((ps) => { setBahce(new Set(ps.map((p) => kisiselAnahtar(p.de)))); setBenim(ps); });
  }, []);
  const sonuc = useMemo(() => (lex ? sozlukAra(q, lex) : []), [q, lex]);
  const sec = id && lex ? lex.find((l) => l.id === id) ?? null : null;
  if (err) return <div class="stack"><TopBar title="Sözlük" back="#/learn" /><ErrorPanel message={err} onRetry={() => location.reload()} /></div>;
  if (!lex) return <div class="stack"><TopBar title="Sözlük" back="#/learn" /><Loading text="Sözlük açılıyor…" /></div>;

  /** Ekler; kart Bahçe'ye giriyorsa öyle söyler, girmiyorsa (kartsız, pasif, sözlükte yok) yalnızca kişisel liste (inceleme #78 P1-4) */
  const ekle = async (de: string, anlam?: string, l?: Lexeme) => {
    await addPersonal({ id: `k3:${de}`, de, tr: anlam || undefined, at: new Date().toISOString(), source: "heard" });
    setBahce(new Set([...bahce, kisiselAnahtar(de)]));
    setBenim([{ de, tr: anlam || undefined }, ...benim.filter((b) => kisiselAnahtar(b.de) !== kisiselAnahtar(de))]);
    toast(l && personalMatch([{ de }], lex).includes(l.id) ? "Bahçe'ye eklendi: tekrarlarda öne alınır" : "Kişisel listene eklendi");
  };

  if (sec) {
    const de = sec.art ? `${sec.art} ${sec.de}` : sec.de;
    const var_ = bahce.has(kisiselAnahtar(sec.de));
    const bahceye = personalMatch([{ de }], lex).includes(sec.id);
    const cogul = sec.pl && !/^[-–—]$/.test(sec.pl.trim()) ? sec.pl : null;
    return (
      <div class="stack">
        <TopBar title="Sözlük" back={aramaAdresi(q)} />
        <section class="card stack fade" data-test="sozluk-kart">
          <div class="row" style={{ flexWrap: "nowrap" }}><div class="de-lg grow" lang="de"><Art art={sec.art} de={sec.head?.de ?? sec.de} /></div><ListenButton text={sec.head?.de ?? de} small /></div>
          <p data-test="sozluk-anlam"><b>{sec.head?.tr ?? sec.tr}</b>{sec.head && <span class="small muted"> · <span lang="de">{de}</span>: {sec.tr}</span>}</p>
          {sec.pos === "noun" && (cogul ? <p class="small">Çoğul: <span lang="de">die {cogul}</span></p> : sec.pl ? <p class="small">Çoğulu yok.</p> : null)}
          {sec.verb && (sec.verb.praesens3 || sec.verb.perfekt) && <p class="small" lang="de">{[sec.verb.praesens3 && `er/sie ${sec.verb.praesens3}`, sec.verb.perfekt && `er/sie ${sec.verb.perfekt}`].filter(Boolean).join(" · ")}</p>}
          {sec.collocations.length > 0 && <div class="small"><div class="kicker">Birlikte kullanılır</div>{sec.collocations.slice(0, 4).map((c) => <div><span lang="de">{c.de}</span> <span class="muted">— {c.tr}</span></div>)}</div>}
          {sec.examples[0] && <div class="small"><div class="kicker">Örnek</div><span lang="de">{sec.examples[0].de}</span><br /><span class="muted">{sec.examples[0].tr}</span></div>}
          {sec.mistakes_tr[0] && <div class="tiny muted"><Rich text={sec.mistakes_tr[0]} /></div>}
          {/* #58 B2: kelimenin kullanıldığı kalıplar → kalıp kartı */}
          {sec.patterns.some((id) => kaliplar.has(id)) && <div class="small" data-test="sozluk-kaliplar"><div class="kicker">Kalıpları</div>
            {sec.patterns.filter((id) => kaliplar.has(id)).map((id) => <a key={id} class="kalip-link" href={`#/kalip/${encodeURIComponent(id)}`}
              onClick={() => { try { sessionStorage.setItem(KALIP_GERI, location.hash); } catch { /* yok */ } }}><span><Rich text={ayracBagla(kaliplar.get(id)!.frame_tr ?? kaliplar.get(id)!.frame)} /></span></a>)}</div>}
          <button class="btn primary block" disabled={var_} data-test="sozluk-ekle" onClick={() => void ekle(de, sec.tr, sec)}>{var_ ? (bahceye ? "Bahçende ✓" : "Listende ✓") : "Duyduğum kelime olarak ekle"}</button>
          <p class="tiny muted" data-test="sozluk-ekle-not">{bahceye ? "Bahçe'de tekrarlarda öne alınır." : "Kişisel listene girer; bu kelimenin Bahçe kartı yok."}</p>
          <a class="btn block" href={aramaAdresi(q)} data-test="sozluk-geri">Aramaya dön</a>
        </section>
      </div>
    );
  }

  const yaz = q.trim();
  const ekleKarti = yaz.length >= 2 && !tamVar(sonuc);
  const eklendi = bahce.has(kisiselAnahtar(yaz));
  return (
    <div class="stack">
      <TopBar title="Sözlük" back="#/learn" />
      <form class="card stack" onSubmit={(e) => e.preventDefault()} role="search">
        <input class="input" type="search" value={q} placeholder="Almanca ya da Türkçe yaz…" aria-label="Sözlükte ara" autoFocus autocomplete="off" autocapitalize="off" spellcheck={false}
          onInput={(e) => setQ((e.target as HTMLInputElement).value)} data-test="sozluk-q" />
        <p class="tiny muted">İnternetsiz çalışır · {lex.length} kelime</p>
      </form>
      {sonuc.length > 0 && <section class="card"><ul class="list" data-test="sozluk-sonuc">{sonuc.map((s) => (
        <li><a class="sozluk-satir" href={`${aramaAdresi(q)}/${encodeURIComponent(s.l.id)}`} data-test="sozluk-satir">
          <span class="sozluk-de" lang="de"><Art art={s.l.art} de={s.l.de} /></span><span class="sozluk-tr small muted">{s.l.tr}</span>
          {bahce.has(kisiselAnahtar(s.l.de)) && <span class="tiny" aria-label="Listende">✓</span>}</a></li>))}</ul></section>}
      {/* PM 7004537514-5: "Duyduğum kelime" olarak eklenen her kelime görünür (kartı olmasa da) */}
      {!yaz && benim.length > 0 && <section class="card" data-test="kelimelerim"><div class="kicker">Kelimelerim · {benim.length}</div>
        <ul class="list">{benim.map((b) => <li class="row" style={{ flexWrap: "nowrap" }}><span class="grow" lang="de">{b.de}</span><span class="small muted">{b.tr || "anlamı yok"}</span></li>)}</ul></section>}
      {ekleKarti && <section class="card stack" data-test="sozluk-yok">
        <p class="small">{sonuc.length ? <>Aradığın tam olarak yok: <b lang="de">{yaz}</b>.</> : <>Sözlükte yok: <b lang="de">{yaz}</b>.</>} Dışarıda duyduysan kişisel listene ekle; anlamını biliyorsan yaz.</p>
        <input class="input" placeholder="Anlamı (isteğe bağlı)" value={tr} onInput={(e) => setTr((e.target as HTMLInputElement).value)} aria-label="Türkçe anlamı" />
        <button class="btn primary block" data-test="sozluk-yok-ekle" disabled={eklendi} onClick={() => { void ekle(yaz, tr.trim()); setTr(""); }}>{eklendi ? "Listende ✓" : "Duyduğum kelime olarak ekle"}</button>
      </section>}
    </div>
  );
}
