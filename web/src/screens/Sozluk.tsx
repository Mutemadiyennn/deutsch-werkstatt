/**
 * Sözlük (#58 B1): çevrimdışı Almanca ↔ Türkçe arama. Sonuca dokununca kart açılır (anlam, çoğul/fiil biçimleri,
 * eşdizimler, örnek, Türkçe uyarı); "Duyduğum kelime" olarak Bahçe'ye girer (LS-7.5: kişisel kelimeler öncelikli).
 * Sözlükte olmayan kelime de "Duyduğum kelime" olarak eklenebilir (anlamı isteğe bağlı).
 */
import { useEffect, useMemo, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import { useApp } from "../state.ts";
import { loadLexicon } from "../services/content.ts";
import { addPersonal, personalWords } from "../data/db.ts";
import { sozlukAra, kisiselAnahtar } from "../core/sozlukAra.ts";
import { Art, ErrorPanel, Loading, TopBar } from "../ui/components.tsx";
import { ListenButton } from "../ui/kit.tsx";

export function SozlukEkrani({ q: ilk = "" }: { q?: string }) {
  const { toast } = useApp();
  const [lex, setLex] = useState<Lexeme[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [q, setQ] = useState(ilk);
  const [sec, setSec] = useState<Lexeme | null>(null);
  const [bahce, setBahce] = useState<Set<string>>(new Set());
  const [tr, setTr] = useState("");
  useEffect(() => {
    loadLexicon().then((x) => setLex(x.lexemes), (e) => setErr(e instanceof Error ? e.message : "Sözlük yüklenemedi."));
    void personalWords().then((ps) => setBahce(new Set(ps.map((p) => kisiselAnahtar(p.de)))));
  }, []);
  const sonuc = useMemo(() => (lex ? sozlukAra(q, lex) : []), [q, lex]);
  if (err) return <div class="stack"><TopBar title="Sözlük" back="#/learn" /><ErrorPanel message={err} onRetry={() => location.reload()} /></div>;
  if (!lex) return <div class="stack"><TopBar title="Sözlük" back="#/learn" /><Loading text="Sözlük açılıyor…" /></div>;

  const ekle = async (de: string, anlam?: string) => {
    const k = kisiselAnahtar(de);
    await addPersonal({ id: `k3:${de}`, de, tr: anlam || undefined, at: new Date().toISOString(), source: "heard" });
    setBahce(new Set([...bahce, k])); toast("Duyduğum kelime olarak Bahçe'ye eklendi");
  };

  if (sec) {
    const de = sec.art ? `${sec.art} ${sec.de}` : sec.de;
    const var_ = bahce.has(kisiselAnahtar(sec.de));
    return (
      <div class="stack">
        <TopBar title="Sözlük" back="#/learn" />
        <section class="card stack fade" data-test="sozluk-kart">
          <div class="row" style={{ flexWrap: "nowrap" }}><div class="de-lg grow" lang="de"><Art art={sec.art} de={sec.head?.de ?? sec.de} /></div><ListenButton text={sec.head?.de ?? de} small /></div>
          <p data-test="sozluk-anlam"><b>{sec.head?.tr ?? sec.tr}</b>{sec.head && <span class="small muted"> · <span lang="de">{de}</span>: {sec.tr}</span>}</p>
          {sec.pl && <p class="small">Çoğul: <span lang="de">die {sec.pl}</span></p>}
          {sec.verb && (sec.verb.praesens3 || sec.verb.perfekt) && <p class="small" lang="de">{[sec.verb.praesens3 && `er/sie ${sec.verb.praesens3}`, sec.verb.perfekt && `er/sie ${sec.verb.perfekt}`].filter(Boolean).join(" · ")}</p>}
          {sec.collocations.length > 0 && <div class="small"><div class="kicker">Birlikte kullanılır</div>{sec.collocations.slice(0, 4).map((c) => <div><span lang="de">{c.de}</span> <span class="muted">— {c.tr}</span></div>)}</div>}
          {sec.examples[0] && <div class="small"><div class="kicker">Örnek</div><span lang="de">{sec.examples[0].de}</span><br /><span class="muted">{sec.examples[0].tr}</span></div>}
          {sec.mistakes_tr[0] && <p class="tiny muted">{sec.mistakes_tr[0]}</p>}
          <div class="row">
            <button class="btn primary grow" disabled={var_} data-test="sozluk-ekle" onClick={() => void ekle(de, sec.tr)}>{var_ ? "Bahçende ✓" : "Duyduğum kelime: Bahçe'ye ekle"}</button>
            <button class="btn grow" data-test="sozluk-geri" onClick={() => setSec(null)}>Aramaya dön</button>
          </div>
        </section>
      </div>
    );
  }

  const bos = q.trim().length >= 2 && !sonuc.length;
  return (
    <div class="stack">
      <TopBar title="Sözlük" back="#/learn" />
      <form class="card stack" onSubmit={(e) => e.preventDefault()} role="search">
        <input class="input" type="search" value={q} placeholder="Almanca ya da Türkçe yaz…" aria-label="Sözlükte ara" autoFocus autocomplete="off" autocapitalize="off" spellcheck={false}
          onInput={(e) => setQ((e.target as HTMLInputElement).value)} data-test="sozluk-q" />
        <p class="tiny muted">İnternetsiz çalışır · {lex.length} kelime</p>
      </form>
      {sonuc.length > 0 && <ul class="list card" data-test="sozluk-sonuc">{sonuc.map((s) => (
        <li><button class="row sozluk-satir" style={{ flexWrap: "nowrap", textAlign: "left" }} data-test="sozluk-satir" onClick={() => setSec(s.l)}>
          <span class="grow" lang="de"><Art art={s.l.art} de={s.l.de} /></span><span class="small muted">{s.l.tr}</span>
          {bahce.has(kisiselAnahtar(s.l.de)) && <span class="tiny" aria-label="Bahçende">✓</span>}</button></li>))}</ul>}
      {bos && <section class="card stack" data-test="sozluk-yok">
        <p class="small">Sözlükte yok: <b lang="de">{q.trim()}</b>. Dışarıda duyduysan ekle; anlamını biliyorsan yaz. Ertesi gün Bahçe'de karşına çıkar.</p>
        <input class="input" placeholder="Anlamı (isteğe bağlı)" value={tr} onInput={(e) => setTr((e.target as HTMLInputElement).value)} aria-label="Türkçe anlamı" />
        <button class="btn primary" data-test="sozluk-yok-ekle" disabled={bahce.has(kisiselAnahtar(q))} onClick={() => { void ekle(q.trim(), tr.trim()); setTr(""); }}>{bahce.has(kisiselAnahtar(q)) ? "Bahçende ✓" : "Duyduğum kelime olarak ekle"}</button>
      </section>}
    </div>
  );
}
