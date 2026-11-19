/**
 * Giriş. Web: Google ile giriş (açılır pencere). iPhone uygulaması (WKWebView): Google girişi web görünümünde
 * çalışmadığı için v1'deki gibi e-posta + uygulama şifresi.
 * Firebase web yapılandırması gizli değildir (tasarım gereği herkese açık; v1 legacy.html FB_DEFAULT ile aynı proje).
 * Erişim kontrolü sunucuda yapılır: Worker uid izin listesi + Firestore kuralları.
 * e2e test derlemesinde (mode=e2e) Firebase yüklenmez; sabit bir test kullanıcısı kullanılır.
 */
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDU2GSwCowKMKWBOvTZdKQjCtxLsQFTlDg",
  authDomain: "deutsch-sync.firebaseapp.com",
  projectId: "deutsch-sync",
  storageBucket: "deutsch-sync.firebasestorage.app",
  messagingSenderId: "595639793001",
  appId: "1:595639793001:web:1da15f7299e7759537b9f8"
};

export interface AuthUser { uid: string; email?: string | null }
export interface AuthAdapter {
  ready: Promise<void>;
  current(): AuthUser | null;
  onChange(cb: (u: AuthUser | null) => void): () => void;
  signInGoogle(): Promise<void>;
  signInEmail(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  idToken(force?: boolean): Promise<string | null>;
}

export const isNative = () => !!(globalThis as any).Capacitor?.isNativePlatform?.();

/** Firebase hata kodlarının Türkçe karşılığı (v1 syErrMsg/syNativeMsg ile aynı) */
export function authErrorTr(e: unknown): string {
  const c = String((e as any)?.code || (e as any)?.message || e);
  if (/popup-blocked/.test(c)) return "Tarayıcı açılır pencereyi engelledi. Tekrar \"Google ile giriş yap\"a bas.";
  if (/popup-closed|cancelled-popup/.test(c)) return "Giriş penceresi kapatıldı.";
  if (/unauthorized-domain/.test(c)) return "Bu adres Firebase'de yetkili değil (Authentication → Settings → Authorized domains).";
  if (/invalid-credential|wrong-password|user-not-found|invalid-email|invalid-login/.test(c)) return "E-posta ya da uygulama şifresi yanlış.";
  if (/too-many-requests/.test(c)) return "Çok fazla deneme; birkaç dakika bekle.";
  if (/network-request-failed/.test(c)) return "İnternet bağlantısı yok gibi görünüyor.";
  // bilinmeyen hata: gerçek kod ekranda (PM 7017351856; sessiz başarısızlık yok)
  return `Giriş yapılamadı. Tekrar dene. (kod: ${c.slice(0, 60)})`;
}

class FirebaseAuth implements AuthAdapter {
  private user: AuthUser | null = null;
  private subs = new Set<(u: AuthUser | null) => void>();
  private mod: typeof import("firebase/auth") | null = null;
  private auth: import("firebase/auth").Auth | null = null;
  ready: Promise<void>;
  constructor() {
    this.ready = (async () => {
      const [{ initializeApp, getApps, getApp }, au] = await Promise.all([import("firebase/app"), import("firebase/auth")]);
      const app = getApps().length ? getApp() : initializeApp(FIREBASE_CONFIG);
      let auth: import("firebase/auth").Auth;
      // popupRedirectResolver şart (web): initializeAuth onu kendiliğinden eklemez, yoksa signInWithPopup her tarayıcıda hemen
      // hata verir. Kabukta verilmez: Google düğmesi orada yok, çözümleyici açılışı ağa bağlardı (inceleme #114 P1-1)
      try { auth = au.initializeAuth(app, { persistence: [au.indexedDBLocalPersistence, au.browserLocalPersistence], ...(isNative() ? {} : { popupRedirectResolver: au.browserPopupRedirectResolver }) }); } catch { auth = au.getAuth(app); }
      this.mod = au; this.auth = auth;
      await new Promise<void>((res) => {
        let first = true;
        au.onAuthStateChanged(auth, (u) => {
          this.user = u ? { uid: u.uid, email: u.email } : null;
          this.subs.forEach((f) => f(this.user));
          if (first) { first = false; res(); }
        });
      });
    })();
  }
  current() { return this.user; }
  onChange(cb: (u: AuthUser | null) => void) { this.subs.add(cb); return () => this.subs.delete(cb); }
  async signInGoogle() {
    await this.ready; const p = new this.mod!.GoogleAuthProvider(); p.setCustomParameters({ prompt: "select_account" });
    // açılır pencere engellenirse ya da bu ortamda desteklenmezse aynı sekmede yönlendirmeyle giriş
    try { await this.mod!.signInWithPopup(this.auth!, p); }
    catch (e) { if (/popup-blocked|operation-not-supported/.test(String((e as any)?.code))) await this.mod!.signInWithRedirect(this.auth!, p); else throw e; }
  }
  async signInEmail(email: string, pw: string) { await this.ready; await this.mod!.signInWithEmailAndPassword(this.auth!, email.trim(), pw); }
  async signOut() { await this.ready; await this.mod!.signOut(this.auth!); }
  async idToken(force = false) { await this.ready; return this.auth!.currentUser ? this.auth!.currentUser.getIdToken(force) : null; }
}

/** Yalnızca e2e test derlemesi: ağ yok, sabit kullanıcı */
class TestAuth implements AuthAdapter {
  private user: AuthUser | null = null;
  private subs = new Set<(u: AuthUser | null) => void>();
  ready = Promise.resolve();
  constructor() { try { if (localStorage.getItem("dw2-e2e-auth") === "in") this.user = { uid: "e2e-user" }; } catch {} }
  current() { return this.user; }
  onChange(cb: (u: AuthUser | null) => void) { this.subs.add(cb); return () => this.subs.delete(cb); }
  private set(u: AuthUser | null) { this.user = u; try { localStorage.setItem("dw2-e2e-auth", u ? "in" : "out"); } catch {} this.subs.forEach((f) => f(u)); }
  async signInGoogle() { this.set({ uid: "e2e-user" }); }
  async signInEmail(email: string, pw: string) { if (pw !== "e2e-pass") throw { code: "auth/invalid-credential" }; this.set({ uid: "e2e-user", email }); }
  async signOut() { this.set(null); }
  async idToken() { return this.user ? "e2e-token" : null; }
}

export const auth: AuthAdapter = import.meta.env.MODE === "e2e" ? new TestAuth() : new FirebaseAuth();
