import { useEffect, useState } from "react";
import {
  getProfile,
} from "../firebase/FirestoreService";
import Profile from "../types/Profile";

export default function useOtherUserProfile(uid: string, onError?: (msg: string) => void) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string|null>(null);
  useEffect(() => {
    getProfile(uid)
      .then((p) => {
        setProfile(p);
      })
      .catch((e) => {
        setError(e.message);
        if (onError) {
          onError(e.message);
        }
      });
  },[uid, onError]);
  return { profile, error };
}
