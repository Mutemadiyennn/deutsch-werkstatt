/**
 * Yalnız e2e derlemesi (app.tsx MODE === "e2e"): AKIS soru türlerinin önizlemesi (AK-10 3. adım). Durak oynatıcısı (4. adım)
 * gelene kadar yeni türler bu yolla WebKit'te sınanır. #/akis-soru/resim/<hedef>,<s2>,<s3>,<s4> · #/akis-soru/eslestir/<id>,…
 */
import { useEffect, useState } from "preact/hooks";
import type { Lexeme } from "@dw/shared";
import { loadLexicon } from "../services/content.ts";
import { ResimdenSec } from "../ui/soru/ResimdenSec.tsx";
import { Eslestir } from "../ui/soru/Eslestir.tsx";

export function AkisSoruOnizleme({ tur, ids }: { tur: string; ids: string[] }) {
  const [lex, setLex] = useState<Map<string, Lexeme> | null>(null);
  const [sonuc, setSonuc] = useState<string | null>(null);
  useEffect(() => { void loadLexicon().then((x) => setLex(new Map(x.lexemes.map((l) => [l.id, l])))); }, []);
  if (!lex) return null;
  const ls = ids.map((i) => lex.get(i)).filter((x): x is Lexeme => !!x);
  if (sonuc !== null) return <p data-test="akis-soru-sonuc">{sonuc}</p>;
  if (tur === "resim" && ls.length === 4) {
    const ex = ls[0]!.examples[0];
    return <div class="stack" style={{ padding: 16 }}><ResimdenSec hedef={ls[0]!} secenekler={[ls[2]!, ls[0]!, ls[3]!, ls[1]!]} cumle={ex && { de: ex.de, tr: ex.tr }} onBitti={(ok) => setSonuc(ok ? "dogru" : "yanlis")} /></div>;
  }
  if (tur === "eslestir") return <div class="stack" style={{ padding: 16 }}><Eslestir ciftler={ls.map((l) => ({ id: l.id, de: l.art ? `${l.art} ${l.de}` : l.de, tr: l.tr }))} tohum="e2e" onBitti={(y) => setSonuc(`yanlis:${y.sort().join(",")}`)} /></div>;
  return <p data-test="akis-soru-sonuc">bilinmeyen tür</p>;
}
