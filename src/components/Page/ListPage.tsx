import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getResourceList } from "../../firebase/FirestoreService";
import { getCurrentUserId } from "../../firebase/AuthService";
import EditableList from "../List/EditableList/EditableList";
import StaticList from "../List/StaticList";
import ResourceListItem from "../../types/ResourceListItem";
import ShareSettings from "../../types/ShareSettings";

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
  const [shareSettings, setShareSettings] = useState<ShareSettings>("HOMEPAGE");

  const add = useCallback((item: ResourceListItem) => {
    setData((d) => [...d, item]);
  }, []);

  const rename = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const del = useCallback((idx: number) => {
    setData((d) => [...d.slice(0, idx), ...d.slice(idx + 1)]);
  }, []);

  const edit = useCallback((updated: ResourceListItem, idx: number) => {
    setData((d) => [...d.slice(0, idx), updated, ...d.slice(idx + 1)]);
  }, []);

  const changeShareSettings = useCallback((shareSettings: ShareSettings) => {
    setShareSettings(shareSettings);
  }, []);

  const loadFromFile = useCallback(
    (items: ResourceListItem[], name: string) => {
      setTitle(name);
      setData(items);
    },
    []
  );

  const reorder = useCallback((startIndex: number, endIndex: number) => {
    setData((d) => {
      const result = Array.from(d);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  useEffect(() => {
    if (!id) {
      setTitle("");
      setData([]);
      setCreatorId(currentUserId);
      setShareSettings("HOMEPAGE");
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
          setShareSettings(s.shareSettings);
          setLoaded(true);
        })
        .catch(() => {
          history.replace("/notfound");
        });
    }
  }, [history, id, currentUserId]);

  return (
    <div className="w-full max-w-screen-2xl mx-auto">
      {loaded &&
        (currentUserId === creatorId ? (
          <EditableList
            rl={{
              creatorId: creatorId,
              shareSettings: shareSettings,
              data: data,
              title: title,
              id: id,
            }}
            loadFromFile={loadFromFile}
            changeShareSettings={changeShareSettings}
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
              shareSettings: shareSettings,
              data: data,
              title: title,
              id: id,
            }}
          />
        ))}
    </div>
  );
};

export default ListPage;
