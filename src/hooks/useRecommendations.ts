import { useCallback, useEffect, useState } from "react";
import { getResources, getTags, Query } from "../api/LivlearnApi";
import { getCurrentUserId } from "../firebase/AuthService";
import { bookmarkResource } from "../firebase/FirestoreService";
import ResourceRec, { Level, Tag, Type } from "../types/ResourceRec";

export default function useRecommendations(
  pageSize?: number,
  onError?: (msg: string) => void
) {
  const [query, setQuery] = useState<Query>({
    tagIds: [],
    level: "AN",
    types: [],
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

  const onSearch = useCallback((updated: Query) => {
    setQuery((prev) => {
      return { ...prev, ...updated };
    });
  }, []);

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

  const onClickTag = useCallback(
    (tag: Tag) => {
      setQuery((oldQuery) => {
        const isSelected = oldQuery.tagIds?.includes(tag.id) ?? false;
        if (!isSelected) {
          return { ...oldQuery, tagIds: [...(oldQuery.tagIds ?? []), tag.id] };
        } else {
          return {
            ...oldQuery,
            tagIds: oldQuery.tagIds?.filter((id) => id !== tag.id) ?? [],
          };
        }
      });
    },
    []
  );

  const onClickMediaType = useCallback(
    (type: Type) => {
      setQuery((oldQuery) => {
        const isSelected =
          (oldQuery.types && oldQuery.types.includes(type)) ?? false;
        if (isSelected) {
          return {
            ...oldQuery,
            types: (oldQuery.types ?? []).filter((i) => i !== type),
          };
        } else {
          return { ...oldQuery, types: [...(oldQuery.types ?? []), type] };
        }
      });
    },
    []
  );

  const onClickLevel = useCallback(
    (level: Level) => {
      setQuery((oldQuery) => {
        const isSelected = oldQuery.level === level;
        if (isSelected) {
          return { ...oldQuery, level: "AN" };
        } else {
          return { ...oldQuery, level: level };
        }
      });
    },
    []
  );

  return { query, recommendedResources, onSearch, onBookmark, error, allTags, onClickLevel, onClickMediaType, onClickTag };
}
