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
    return { ...docData, id: id } as ResourceList;
  } else {
    throw Error("No data in document snapshot");
  }
}

export async function getPublicListsFromFirebase(): Promise<ResourceList[]> {
  const listsRef = firebase.firestore().collection("lists");
  const query = listsRef
    .where("isPublic", "==", true)
    .orderBy("lastChanged", "desc")
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
    .orderBy("lastChanged", "desc");
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
