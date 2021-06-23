import firebase from "firebase/app";
import "firebase/firestore";
import Profile from "../types/Profile";
import ResourceList from "../types/ResourceList";
import ResourceListItem from "../types/ResourceListItem";
import { getCurrentUserId } from "./AuthService";

export async function getResourceList(id: string): Promise<ResourceList> {
  const docRef = firebase.firestore().collection("lists").doc(id);
  const docSnapShot = await docRef.get();
  if (docSnapShot.exists) {
    return docToList(docSnapShot);
  } else {
    throw Error("No such document");
  }
}

export async function upvoteResourceList(rl: ResourceList, userId: string) {
  if (!rl.id) {
    return;
  }
  await firebase
    .firestore()
    .collection("lists")
    .doc(rl.id)
    .update({ upvotes: [...rl.upvotes, userId] });
}

export async function downvoteResourceList(rl: ResourceList, userId: string) {
  if (!rl.id) {
    return;
  }
  await firebase
    .firestore()
    .collection("lists")
    .doc(rl.id)
    .update({ upvotes: rl.upvotes.filter((u) => u !== userId) });
}

export async function saveNewListForUser(
  newList: ResourceList
): Promise<string> {
  const userId = getCurrentUserId();
  if (!userId) {
    throw Error("No signed in user");
  }
  const { id, data, ...rest } = newList;
  const dataWithIndices = data.map((item, idx) => {
    return { ...item, index: idx };
  });
  const docref = await firebase
    .firestore()
    .collection("lists")
    .add({
      ...rest,
      data: dataWithIndices,
      creatorId: userId,
      lastChanged: new Date(),
    });
  return docref.id;
}

export async function bookmarkResource(rId: number): Promise<void> {
  const userId = getCurrentUserId();
  if (!userId) {
    throw Error("No signed in user");
  }
  const doc = firebase.firestore().collection("profiles").doc(userId);
  const profile = await doc.get();
  if (profile.exists && profile.data()?.bookmarks) {
    if (profile.data()?.bookmarks.includes(rId)) {
      await doc.update({
        bookmarks: firebase.firestore.FieldValue.arrayRemove(rId),
      });
    } else {
      await doc.update({
        bookmarks: firebase.firestore.FieldValue.arrayUnion(rId),
      });
    }
  } else {
    doc.set({ bookmarks: rId }, { merge: true });
  }
}

export async function editExitingList(updated: ResourceList): Promise<void> {
  const { id, data, ...rest } = updated;
  if (!id) {
    throw Error("Item has no id");
  }
  const dataWithIndices = data.map((item, idx) => {
    return { ...item, index: idx };
  });
  await firebase
    .firestore()
    .collection("lists")
    .doc(id)
    .set({
      ...rest,
      lastChanged: new Date(),
      data: dataWithIndices,
    });
}

function docToList(
  docSnapshot:
    | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
): ResourceList {
  const docData = docSnapshot.data();
  const id = docSnapshot.id;
  if (docData) {
    return {
      ...docData,
      upvotes: docData.upvotes ?? [],
      id: id,
      shareSettings: docData.shareSettings ?? "ONLYLINK",
      data: docData.data.sort((a: ResourceListItem, b: ResourceListItem) => {
        return a.index && b.index && a.index < b.index ? -1 : 1;
      }),
    } as ResourceList;
  } else {
    throw Error("No data in document snapshot");
  }
}

// export async function getPublicListsFromFirebase(): Promise<ResourceList[]> {
//   const listsRef = firebase.firestore().collection("lists");
//   const query = listsRef
//     .where("shareSettings", "==", "HOMEPAGE")
//     .orderBy("lastChanged", "desc")
//     .limit(10);
//   try {
//     const snapshot = await query.get();
//     return snapshot.docs.map(docToList);
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

export function streamPublicLists(
  onRlRecieved: (rls: ResourceList[]) => void,
  onError: (error: Error) => void
): () => void {
  const listsRef = firebase.firestore().collection("lists");
  const query = listsRef
    .where("shareSettings", "==", "HOMEPAGE")
    .orderBy("lastChanged", "desc")
    .limit(10);
  return query.onSnapshot({
    next: (querySnapshot) => {
      const updatedData = querySnapshot.docs.map(docToList);
      onRlRecieved(updatedData);
    },
    error: (error) => {
      onError(error);
    },
  });
}

export async function getAllListsForUser(): Promise<ResourceList[]> {
  const userId = getCurrentUserId();
  if (!userId) {
    console.error("No logged in user");
    return [];
  }
  const listsRef = firebase.firestore().collection("lists");
  const query = listsRef
    .where("creatorId", "==", userId)
    .orderBy("lastChanged", "desc");
  try {
    const snapshot = await query.get();
    return snapshot.docs.map(docToList);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function deleteList(id: string) {
  try {
    firebase.firestore().collection("lists").doc(id).delete();
  } catch (error) {
    throw Error(`Delete unsuccessful - error: ${error}`);
  }
}

export function streamProfile(
  uid: string,
  onProfileRecieved: (profile: Profile) => void,
  onError: (error: Error) => void
): () => void {
  const listsRef = firebase.firestore().collection("profiles").doc(uid);
  return listsRef.onSnapshot({
    next: (querySnapshot) => {
      const updatedData = querySnapshot.data()?.bookmarks
        ? (querySnapshot.data()?.bookmarks as number[])
        : [];
      onProfileRecieved({ bookmarks: updatedData });
    },
    error: (error) => {
      onError(error);
    },
  });
}
