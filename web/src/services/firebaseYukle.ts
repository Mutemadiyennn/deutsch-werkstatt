/**
 * Firebase'in uygulamanın kullandığı parçaları (PM-124 md. 4.2). `auth.ts` bu modülü `import()` ile yükler; adlı içe aktarma
 * paketleyicinin kullanılmayan giriş yollarını (telefon, reCAPTCHA, çok adımlı doğrulama, TOTP …) dışarıda bırakmasını sağlar.
 * Ad alanının tamamını (`import("firebase/auth")`) tutmak hepsini pakete sokuyordu. Davranış aynı.
 */
export { initializeApp, getApps, getApp } from "firebase/app";
export {
  initializeAuth, getAuth, indexedDBLocalPersistence, browserLocalPersistence, browserPopupRedirectResolver,
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signInWithEmailAndPassword, signOut
} from "firebase/auth";
export type { Auth } from "firebase/auth";
