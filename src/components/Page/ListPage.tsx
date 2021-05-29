import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getResourceList } from "../../firebase/FirestoreService";
import { getCurrentUserId } from "../../firebase/AuthService";
import EditableList from "../List/EditableList";
import StaticList from "../List/StaticList";
import ResourceListItem from "../../types/ResourceListItem";

type ParamTypes = {
  id: string | undefined;
};

const ListPage = () => {
  const currentUserId = getCurrentUserId();
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState<ResourceListItem[]>([]);
  const [creatorId, setCreatorId] = useState(currentUserId);
  const [isPublic, setIsPublic] = useState(false);

  const add = useCallback(
    (item: ResourceListItem) => {
      const newItem = {...item, index: data.length};
      setData([...data, newItem]);
    },
    [data, setData]
  );

  const rename = useCallback(
    (newTitle: string) => {
      setTitle(newTitle);
    },
    [setTitle]
  );

  const del = useCallback(
    (idx: number) => {
      setData([...data.slice(0, idx), ...data.slice(idx + 1)]);
    },
    [data, setData]
  );

  const edit = useCallback(
    (updated: ResourceListItem, idx: number) => {
      setData([...data.slice(0, idx), updated, ...data.slice(idx + 1)]);
    },
    [data, setData]
  );

  useEffect(() => {
    if (!id) {
      setTitle("");
      setData([]);
      setCreatorId(currentUserId);
      setIsPublic(false);
      setLoaded(true);
    } else {
      getResourceList(id)
        .then((s) => {
          setTitle(s.title);
          setData(s.data.sort((a,b)=>{return (a.index && b.index && (a.index < b.index)) ? -1: 1}));
          setCreatorId(s.creatorId);
          setIsPublic(s.isPublic);
          setLoaded(true);
        })
        .catch(() => {
          history.replace("/notfound");
        });
    }
  }, [history, id, currentUserId]);

  return (
    <>
      {loaded &&
        (currentUserId === creatorId ? (
          <EditableList
            rl={{
              creatorId: creatorId,
              isPublic: isPublic,
              data: data,
              title: title,
              id: id
            }}
            rename={rename}
            add={add}
            edit={edit}
            del={del}
          />
        ) : (
          <StaticList
            resourceList={{
              creatorId: creatorId,
              isPublic: isPublic,
              data: data,
              title: title,
              id: id
            }}
          />
        ))}
    </>
  );
};

export default ListPage;
