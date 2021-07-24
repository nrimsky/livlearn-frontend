import { useCallback, useEffect, useState } from "react";
import { getResources, Query } from "../api/LivlearnApi";
import { getCurrentUserId } from "../firebase/AuthService";
import { bookmarkResource } from "../firebase/FirestoreService";
import ResourceRec from "../types/ResourceRec";

export default function useRecommendations(pageSize?: number) {
  const [query, setQuery] = useState<Query>({
    tagIds: [],
    level: "AN",
    types: ["AB", "AR", "BL", "BO", "CO", "OT", "PO", "TO", "VI"],
    search: "",
    pageSize: pageSize
  });
  const [recommendedResources, setRecommendedResources] = useState<
    ResourceRec[]
  >([]);
  useEffect(() => {
    getResources(query)
      .then((r) => setRecommendedResources(r))
      .catch((e) => console.error(e));
  }, [query]);
  const onSearch = useCallback((query: Query) => {
    setQuery(query);
  }, []);
  const onBookmark = useCallback((rId: number) => {
    const uid = getCurrentUserId();
    if (uid === null) {
      return;
    }
    bookmarkResource(rId).catch((e) => console.error(e));
  }, []);

  return { query, recommendedResources, onSearch, onBookmark };
}
