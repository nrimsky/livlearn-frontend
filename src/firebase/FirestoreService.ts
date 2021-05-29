import firebase from "firebase/app";
import "firebase/firestore";
import ResourceList from "../types/ResourceList";
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

export async function saveNewListForUser(
  newList: ResourceList,
  onSuccess: (id: string) => void,
  onError: (message: string) => void
) {
  const userId = getCurrentUserId();
  if (!userId) {
    onError("No signed in user");
  }
  const { id, ...rest } = newList;
  firebase
    .firestore()
    .collection("lists")
    .add({
      ...rest,
      creatorId: userId,
      createdAt: new Date(),
    })
    .then((docRef) => onSuccess(docRef.id))
    .catch(onError);
}

export async function editExitingList(
  itemId: string,
  updated: ResourceList,
  onSuccess: () => void,
  onError: (message: string) => void
): Promise<void> {
  const { id, ...rest } = updated;
  firebase
    .firestore()
    .collection("lists")
    .doc(itemId)
    .set({
      ...rest,
    })
    .then(() => onSuccess())
    .catch(onError);
}

function docToList(
  docSnapshot:
    | firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
    | firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
): ResourceList {
  const docData = docSnapshot.data();
  const id = docSnapshot.id;
  if (docData) {
    return { ...docData, id: id } as ResourceList;
  } else {
    throw Error("No data in document snapshot");
  }
}

export async function getPublicListsFromFirebase(): Promise<ResourceList[]> {
  const listsRef = firebase.firestore().collection("lists");
  const query = listsRef
    .where("isPublic", "==", true)
    .orderBy("createdAt", "desc")
    .limit(10);
  try {
    const snapshot = await query.get();
    return snapshot.docs.map((s) => {
      return docToList(s) as ResourceList;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
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
    .orderBy("createdAt", "desc");
  try {
    const snapshot = await query.get();
    return snapshot.docs.map((s) => {
      return docToList(s);
    });
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
