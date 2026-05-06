import { useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '../config/firebase';
import { User } from '../types';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const { user, setUser, setLoading } = useAuthStore();
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      
      if (fbUser) {
        const userData: User = {
          uid: fbUser.uid,
          email: fbUser.email || '',
          displayName: fbUser.displayName || undefined,
          photoURL: fbUser.photoURL || undefined,
          createdAt: fbUser.metadata.creationTime 
            ? new Date(fbUser.metadata.creationTime) 
            : new Date(),
          updatedAt: fbUser.metadata.lastSignInTime 
            ? new Date(fbUser.metadata.lastSignInTime) 
            : new Date(),
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  return { user, firebaseUser };
};
