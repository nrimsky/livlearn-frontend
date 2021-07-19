import { useEffect, useState } from "react";
import { getAllListsForUser } from "../firebase/FirestoreService";
import ResourceList from "../types/ResourceList";

export default function useMyResourceLists() {
    const [myLists, setMyLists] = useState<ResourceList[]>([]);
    useEffect(() => {
      getAllListsForUser().then((lists) => {
        setMyLists(lists);
      });
    }, []);
    return { myLists };
}