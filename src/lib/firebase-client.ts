import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  type UserCredential,
  type AuthProvider,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
// Named Firestore database — must match Firebase Console: 'smartmotordb'
const db = getFirestore(app, 'smartmotordb');
const storage = getStorage(app);

// ─── signInWithProvider helper ────────────────────────────────────────────────

// Note: Social providers will be re-introduced as needed by the new auth system.
// For now, we are simplifying to focus on core email/password and session management.
async function signInWithProvider(provider: AuthProvider): Promise<UserCredential> {
  // This function will need to be re-implemented if social sign-in is desired in the new system.
  throw new Error("Social sign-in not yet implemented in new auth system.");
}

export { app, auth, db, storage, signInWithProvider };
