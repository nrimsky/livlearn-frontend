import React, { useEffect, useState } from "react";
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

  const add = (item: ResourceListItem) => {
    setData([...data, item]);
  };

  const rename = (newTitle: string) => {
    setTitle(newTitle);
  };

  const del = (idx: number) => {
    setData([...data.slice(0, idx), ...data.slice(idx + 1)]);
  };

  const edit = (updated: ResourceListItem, idx: number) => {
    setData([...data.slice(0, idx), updated, ...data.slice(idx + 1)]);
  };

  const reorder = (startIndex: number, endIndex: number) => {
    const result = Array.from(data);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setData(result);
  };

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
          setData(
            s.data.sort((a, b) => {
              return a.index && b.index && a.index < b.index ? -1 : 1;
            })
          );
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
              id: id,
            }}
            rename={rename}
            add={add}
            edit={edit}
            del={del}
            reorder={reorder}
          />
        ) : (
          <StaticList
            resourceList={{
              creatorId: creatorId,
              isPublic: isPublic,
              data: data,
              title: title,
              id: id,
            }}
          />
        ))}
    </>
  );
};

export default ListPage;
