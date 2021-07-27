import { useEffect, useState } from "react";
import { getAllListsForUser } from "../firebase/FirestoreService";
import ResourceList from "../types/ResourceList";

export default function useMyResourceLists(onError?: (msg: string) => void) {
  const [myLists, setMyLists] = useState<ResourceList[]>([]);
  useEffect(() => {
    getAllListsForUser()
      .then((lists) => {
        setMyLists(lists);
      })
      .catch((error) => {
        console.error(error);
        if (onError) {
          onError(error.message);
        }
      });
  }, [onError]);
  return { myLists };
}
