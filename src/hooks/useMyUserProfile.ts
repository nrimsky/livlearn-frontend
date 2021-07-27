import { useEffect, useState } from "react";
import { getCurrentUserId, onAuthStateChanged } from "../firebase/AuthService";
import {
  createProfileIfNoneExists,
  streamProfile,
} from "../firebase/FirestoreService";
import Profile from "../types/Profile";

export default function useMyUserProfile(onError?: (msg: string) => void) {
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
          createProfileIfNoneExists(uid)
            .then(() => setUid(uid))
            .catch((error) => {
              console.error(error);
              if (onError) {
                onError(error);
              }
            });
        }
      } else {
        setUid(null);
      }
    });
    return () => unregisterAuthObserver();
  }, [onError]);

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
        if (onError) {
          onError(error.message);
        }
      }
    );
    return unsubscribe;
  }, [uid, onError]);

  return { uid, profile };
}
