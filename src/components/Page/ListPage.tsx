import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getResourceList } from "../../firebase/FirestoreService";
import { getCurrentUserId } from "../../firebase/AuthService";
import EditableList from "../List/EditableList";
import StaticList from "../List/StaticList";
import ItemData from "../../types/ItemData";

type ParamTypes = {
  id: string | undefined;
};

const ListPage = () => {
  const currentUserId = getCurrentUserId();
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [data, setData] = useState<ItemData[]>([]);
  const [creatorId, setCreatorId] = useState(currentUserId);
  const [isPublic, setIsPublic] = useState(false);

  const add = useCallback(
    (item: ItemData) => {
      setData([...data, item]);
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
    (updated: ItemData, idx: number) => {
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
          setData(s.data);
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
            id={id ? id : null}
            rl={{
              creatorId: creatorId,
              isPublic: isPublic,
              data: data,
              title: title,
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
            }}
          />
        ))}
    </>
  );
};

export default ListPage;
