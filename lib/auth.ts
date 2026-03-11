import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
  type User,
  signOut as firebaseSignOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { getFirebaseAuth, isFirebaseConfigured } from './firebase';

export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

function mapFirebaseUser(user: User): AuthUser {
  return {
    uid: user.uid,
    displayName: user.displayName || null,
    email: user.email || null,
    photoURL: user.photoURL || null,
  };
}

/** Detect mobile for redirect flow (popups often blocked on mobile) */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

export async function signInWithGoogle(): Promise<AuthUser | null> {
  const auth = getFirebaseAuth();
  if (!auth) {
    // Demo mode - return a mock user when Firebase is not configured
    return {
      uid: 'demo-user-google',
      displayName: 'Google User',
      email: 'user@gmail.com',
      photoURL: 'https://lh3.googleusercontent.com/a/default-user'
    };
  }
  if (isMobileDevice()) {
    await signInWithRedirect(auth, new GoogleAuthProvider());
    return null; // User will be redirected, result handled by getRedirectResult
  }
  const result = await signInWithPopup(auth, new GoogleAuthProvider());
  return mapFirebaseUser(result.user);
}

export async function signInWithFacebook(): Promise<AuthUser | null> {
  const auth = getFirebaseAuth();
  if (!auth) {
    // Demo mode - return a mock user when Firebase is not configured
    return {
      uid: 'demo-user-facebook',
      displayName: 'Facebook User',
      email: 'user@facebook.com',
      photoURL: 'https://graph.facebook.com/default-user/picture'
    };
  }
  if (isMobileDevice()) {
    await signInWithRedirect(auth, new FacebookAuthProvider());
    return null; // User will be redirected, result handled by getRedirectResult
  }
  const result = await signInWithPopup(auth, new FacebookAuthProvider());
  return mapFirebaseUser(result.user);
}

/** Call on LoginScreen mount to handle return from OAuth redirect */
export async function handleRedirectResult(): Promise<AuthUser | null> {
  const auth = getFirebaseAuth();
  if (!auth) return null;
  try {
    const result = await getRedirectResult(auth);
    if (result?.user) return mapFirebaseUser(result.user);
  } catch (err) {
    console.error('Redirect result error:', err);
  }
  return null;
}

export async function signOut(): Promise<void> {
  const auth = getFirebaseAuth();
  if (auth) await firebaseSignOut(auth);
}

export function isAuthAvailable(): boolean {
  // Demo mode enabled - always return true for mock authentication
  return true;
}

export async function changeUserPassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
  const auth = getFirebaseAuth();
  if (!auth || !auth.currentUser) {
    return { success: false, error: 'No authenticated user' };
  }

  try {
    const user = auth.currentUser;
    
    // Reauthenticate the user first (required for sensitive operations)
    if (user.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
    }
    
    // Update the password
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error: any) {
    let errorMessage = 'Failed to update password';
    
    switch (error.code) {
      case 'auth/wrong-password':
        errorMessage = 'Current password is incorrect';
        break;
      case 'auth/weak-password':
        errorMessage = 'New password is too weak (minimum 6 characters)';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Please try again later';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email address';
        break;
      default:
        errorMessage = error.message || 'An error occurred';
    }
    
    return { success: false, error: errorMessage };
  }
}
