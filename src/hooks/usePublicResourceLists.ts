import { useEffect, useState } from "react";
import { streamPublicLists } from "../firebase/FirestoreService";
import ResourceList from "../types/ResourceList";

export default function usePublicResourceLists() {
    const [publicLists, setPublicLists] = useState<ResourceList[]>([]);  
    useEffect(() => {
      const unsubscribe = streamPublicLists(
        (lists) => {
          setPublicLists(lists);
        },
        (error) => {
          console.error(error);
        }
      );
      return unsubscribe;
    }, []);
    return { publicLists };
}