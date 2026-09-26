import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyBbD0zjkaw9s0oFgub37CS-CYAb0aJGPc0",
  authDomain: "krishi-d3e22.firebaseapp.com",
  databaseURL: "https://krishi-d3e22-default-rtdb.firebaseio.com",
  projectId: "krishi-d3e22",
  storageBucket: "krishi-d3e22.firebasestorage.app",
  messagingSenderId: "781050602095",
  appId: "1:781050602095:web:f32ad51e179a9f4d52239a",
  measurementId: "G-F36KF45JBL"
};

// Initialize Firebase App singleton
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Sign in directly using Google Mail / Account
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null, code: null };
  } catch (error) {
    console.error("Firebase Google Auth error:", error);
    return { user: null, error: error.message, code: error.code };
  }
}

/**
 * Sign in with Email and Password
 */
export async function loginWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null, code: null };
  } catch (error) {
    console.error("Firebase Email Auth error:", error);
    return { user: null, error: error.message, code: error.code };
  }
}

/**
 * Register with Email, Password, and Display Name
 */
export async function registerWithEmail(name, email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (name) {
      await updateProfile(result.user, { displayName: name });
    }
    return { user: result.user, error: null, code: null };
  } catch (error) {
    console.error("Firebase Registration error:", error);
    return { user: null, error: error.message, code: error.code };
  }
}

/**
 * Sign out current farmer
 */
export async function logoutUser() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error("Firebase Logout error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Subscribe to Auth state changes
 */
export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
