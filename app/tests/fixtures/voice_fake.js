/* Test yardımcısı (smoke_all, voc_test): ses ve konuşma tanıma taklidi + giriş kapısı.
   v1 ortamında /tmp/voice_test.py içindeydi ve depoda yoktu; burada yeniden yazıldı.
   - speechSynthesis.speak → window.__spoken'a {t, l} kaydı, kısa süre sonra onend
   - webkitSpeechRecognition → window.__heard (varsayılan "") metnini döndürür */
(() => {
  try { localStorage.setItem('dw-gate', JSON.stringify({h:'2a4fd738768c5609c205edf6dcd7dd72c2da1add10f40b3d013ffa70660e0135', t:Date.now()})); } catch (e) {}
  window.__spoken = [];
  window.__heard = "";
  class FakeUtterance { constructor(t){ this.text = String(t == null ? "" : t); this.lang = ""; this.rate = 1; this.pitch = 1; this.volume = 1; this.voice = null; this.onstart = null; this.onend = null; this.onerror = null; this.onboundary = null; } addEventListener(ev, f){ this["on" + ev] = f; } }
  const voices = [{ lang: "de-DE", name: "Test Deutsch", localService: true, default: true, voiceURI: "test-de" }, { lang: "tr-TR", name: "Test Türkçe", localService: true, default: false, voiceURI: "test-tr" }];
  const synth = {
    speaking: false, pending: false, paused: false, onvoiceschanged: null,
    getVoices: () => voices,
    speak(u){ window.__spoken.push({ t: u.text, l: u.lang }); synth.speaking = true; setTimeout(() => { try { u.onstart && u.onstart({}); } catch (e) {} setTimeout(() => { synth.speaking = false; try { u.onend && u.onend({}); } catch (e) {} }, 5); }, 1); },
    cancel(){ synth.speaking = false; }, pause(){}, resume(){},
    addEventListener(){}, removeEventListener(){}
  };
  Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
  window.SpeechSynthesisUtterance = FakeUtterance;
  class FakeRec { constructor(){ this.lang = "de-DE"; this.continuous = false; this.interimResults = false; this.maxAlternatives = 1; }
    start(){ setTimeout(() => { this.onstart && this.onstart({}); const t = window.__heard || ""; if (t) { const alt = { transcript: t, confidence: 0.9 }; const res = [alt]; res.isFinal = true; res.length = 1; const results = [res]; results.length = 1; this.onresult && this.onresult({ results, resultIndex: 0 }); } this.onend && this.onend({}); }, 10); }
    stop(){ this.onend && this.onend({}); } abort(){ this.onend && this.onend({}); } addEventListener(ev, f){ this["on" + ev] = f; } }
  window.SpeechRecognition = window.webkitSpeechRecognition = FakeRec;
})();
