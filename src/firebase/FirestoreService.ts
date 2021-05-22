import firebase from "firebase/app";
import "firebase/firestore";
import ResourceList from "../types/ResourceList";
import Entity from "../types/Entity";
import { getCurrentUserId } from "./AuthService";

export async function getResourceList(id: string): Promise<ResourceList> {
  const docRef = firebase.firestore().collection("lists").doc(id);
  const docSnapShot = await docRef.get();
  if (docSnapShot.exists) {
    return docSnapShot.data() as ResourceList;
  } else {
    throw Error("No such document");
  }
}

export async function saveNewListForUser(
  newList: ResourceList,
  isPublic: boolean,
  onSuccess: (id: string) => void,
  onError: (message: string) => void
) {
  const userId = getCurrentUserId();
  if (!userId) {
    onError("No signed in user");
  }
  firebase
    .firestore()
    .collection("lists")
    .add({
      ...newList,
      creatorId: userId,
      isPublic: isPublic,
    })
    .then((docRef) => onSuccess(docRef.id))
    .catch(onError);
}

export async function editExitingList(
  id: string,
  updated: ResourceList,
  onSuccess: () => void,
  onError: (message: string) => void
): Promise<void> {
  firebase
    .firestore()
    .collection("lists")
    .doc(id)
    .set({
      ...updated,
    })
    .then(() => onSuccess())
    .catch(onError);
}

function docToList(
  docSnapshot: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
): Entity<ResourceList> {
  const docData = docSnapshot.data();
  const id = docSnapshot.id;
  return {
    creatorId: docData.creatorId,
    isPublic: docData.isPublic,
    title: docData.title,
    data: docData.data,
    id: id,
  };
}

export async function getPublicListsFromFirebase(): Promise<
  Entity<ResourceList>[]
> {
  const listsRef = firebase.firestore().collection("lists");
  const query = listsRef.where("isPublic", "==", true);
  try {
    const snapshot = await query.get();
    return snapshot.docs.map((s) => {
      return docToList(s) as Entity<ResourceList>;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllListsForUser(): Promise<Entity<ResourceList>[]> {
  const userId = getCurrentUserId();
  if (!userId) {
    console.error("No logged in user");
    return [];
  }
  const listsRef = firebase.firestore().collection("lists");
  const query = listsRef.where("creatorId", "==", userId);
  try {
    const snapshot = await query.get();
    return snapshot.docs.map((s) => {
      return docToList(s) as Entity<ResourceList>;
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