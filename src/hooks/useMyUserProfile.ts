import { useEffect, useState } from "react";
import { getCurrentUserId, onAuthStateChanged } from "../firebase/AuthService";
import {
  createProfileIfNoneExists,
  streamProfile,
} from "../firebase/FirestoreService";
import Profile from "../types/Profile";

export default function useMyUserProfile() {
  const [uid, setUid] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const uid = getCurrentUserId();
    setUid(uid);
  }, []);

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged((l) => {
      if (l) {
        const uid = getCurrentUserId();
        if (uid) {
          createProfileIfNoneExists(uid).then(() => setUid(uid));
        }
      } else {
        setUid(null);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  useEffect(() => {
    if (uid === null) {
      setProfile(null);
      return;
    }
    const unsubscribe = streamProfile(
      uid,
      (p) => {
        setProfile(p);
      },
      (error) => {
        console.error(error);
      }
    );
    return unsubscribe;
  }, [uid]);
  
  return { uid, profile };
}
