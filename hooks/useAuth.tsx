import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, OperationType, handleFirestoreError } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const adminRef = doc(db, 'admins', currentUser.uid);
          const adminSnap = await getDoc(adminRef);
          
          if (adminSnap.exists() && adminSnap.data()?.role === 'admin') {
            setIsAdmin(true);
          } else if (currentUser.email === 'gsbaig@gmail.com') {
            // Bootstrap
            try {
              await setDoc(adminRef, { role: 'admin' });
              setIsAdmin(true);
            } catch (err) {
              handleFirestoreError(err, OperationType.CREATE, 'admins');
            }
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("Error checking admin status", err);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Error signing in', err);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return { user, isAdmin, loading, loginWithGoogle, logout };
}
