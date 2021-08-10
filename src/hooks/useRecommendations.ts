import { useCallback, useEffect, useState } from "react";
import { getResources, getTags, Query } from "../api/LivlearnApi";
import { getCurrentUserId } from "../firebase/AuthService";
import { bookmarkResource } from "../firebase/FirestoreService";
import ResourceRec, { Tag } from "../types/ResourceRec";

export default function useRecommendations(
  pageSize?: number,
  onError?: (msg: string) => void
) {
  const [query, setQuery] = useState<Query>({
    tagIds: [],
    level: "AN",
    types: ["AB", "AR", "BL", "BO", "CO", "OT", "PO", "TO", "VI"],
    search: "",
    pageSize: pageSize,
    id: [],
  });
  const [error, setError] = useState<string | null>(null);

  const [recommendedResources, setRecommendedResources] = useState<
    ResourceRec[]
  >([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    getTags()
      .then((tags) => setAllTags(tags))
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (query.pageSize === 0) {
      return;
    }
    getResources(query)
      .then((r) => setRecommendedResources(r))
      .catch((e) => {
        console.error(e);
        setError(e.message);
        if (onError) {
          onError(e.message);
        }
      });
  }, [query, onError]);

  const onSearch = (updated: Query) => {
    setQuery((prev) => {
      return { ...prev, ...updated };
    });
  };

  const onBookmark = useCallback(
    (rId: number) => {
      const uid = getCurrentUserId();
      if (uid === null) {
        return;
      }
      bookmarkResource(rId).catch((e) => {
        console.error(e);
        setError(e.message);
        if (onError) {
          onError(e.message);
        }
      });
    },
    [onError]
  );

  return { query, recommendedResources, onSearch, onBookmark, error, allTags };
}
