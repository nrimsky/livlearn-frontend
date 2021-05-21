import firebase from "firebase/app";
import "firebase/auth";

export function onAuthStateChanged(cb: (isLoggedIn: boolean) => void) {
  return firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      cb(true);
    } else {
      cb(false);
    }
  });
}

export function signOut() {
  firebase.auth().signOut();
}

export function getCurrentUserName(): string | null {
  return firebase.auth().currentUser?.displayName ?? null;
}

export function getCurrentUserId(): string | null {
  return firebase.auth().currentUser?.uid ?? null;
}
