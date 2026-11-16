import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import {
  BookmarkRecord,
  CertificateRecord,
  FirebaseUserProfile,
  QuizAttemptRecord,
  StudentProgressRecord,
} from '../types';
import {
  ensureUserDocuments,
  subscribeUserBookmarks,
  subscribeUserCertificates,
  subscribeUserProgress,
  subscribeUserQuizAttempts,
} from '../utils/firestoreDataService';

interface AuthContextValue {
  firebaseUser: User | null;
  userProfile: FirebaseUserProfile | null;
  authReady: boolean;
  authError: string | null;
  isSigningIn: boolean;
  isAdmin: boolean;
  progressRecords: StudentProgressRecord[];
  quizAttempts: QuizAttemptRecord[];
  bookmarks: BookmarkRecord[];
  certificates: CertificateRecord[];
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<FirebaseUserProfile | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [progressRecords, setProgressRecords] = useState<StudentProgressRecord[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptRecord[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>([]);
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);

  const loadProfile = async (user: User) => {
    try {
      const profile = await ensureUserDocuments(
        user.uid,
        user.displayName || 'Crafty Scholar',
        user.email || '',
        'en'
      );
      setUserProfile(profile);
      setAuthError(null);
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Unable to load scholar profile.');
    }
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        await loadProfile(user);
      } else {
        setUserProfile(null);
        setProgressRecords([]);
        setQuizAttempts([]);
        setBookmarks([]);
        setCertificates([]);
      }
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Attach real-time Firestore listeners only when authenticated
  useEffect(() => {
    if (!authReady || !firebaseUser) return;

    const unsubProgress = subscribeUserProgress(firebaseUser.uid, setProgressRecords);
    const unsubAttempts = subscribeUserQuizAttempts(firebaseUser.uid, setQuizAttempts);
    const unsubBookmarks = subscribeUserBookmarks(firebaseUser.uid, setBookmarks);
    const unsubCertificates = subscribeUserCertificates(firebaseUser.uid, setCertificates);

    return () => {
      unsubProgress();
      unsubAttempts();
      unsubBookmarks();
      unsubCertificates();
    };
  }, [authReady, firebaseUser]);

  const signInWithGoogle = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign-in was cancelled or blocked.';
      setAuthError(message);
    } finally {
      setIsSigningIn(false);
    }
  };

  const logout = async () => {
    setAuthError(null);
    await signOut(auth);
  };

  const refreshProfile = async () => {
    if (firebaseUser) {
      await loadProfile(firebaseUser);
    }
  };

  const isAdmin =
    userProfile?.role === 'admin' ||
    (firebaseUser?.email?.toLowerCase() === 'chaink2000@gmail.com' &&
      firebaseUser?.emailVerified === true);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        userProfile,
        authReady,
        authError,
        isSigningIn,
        isAdmin,
        progressRecords,
        quizAttempts,
        bookmarks,
        certificates,
        signInWithGoogle,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
