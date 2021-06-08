import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getResourceList } from "../../firebase/FirestoreService";
import { getCurrentUserId } from "../../firebase/AuthService";
import EditableList from "../List/EditableList/EditableList";
import StaticList from "../List/StaticList";
import ResourceListItem from "../../types/ResourceListItem";
import ShareSettings from "../../types/ShareSettings";
import ResourceList from "../../types/ResourceList";

type ParamTypes = {
  id: string | undefined;
};

const ListPage = () => {
  const currentUserId = getCurrentUserId();
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const [loaded, setLoaded] = useState(false);

  const [rl, setRl] = useState<ResourceList>({
    upvotes: [],
    title: "Untitled",
    data: [],
    creatorId: currentUserId,
    shareSettings: "HOMEPAGE",
    id: id,
  });

  const add = useCallback((item: ResourceListItem) => {
    setRl((d) => {
      return {
        ...d,
        data: [...d.data, item],
      };
    });
  }, []);

  const rename = useCallback((newTitle: string) => {
    setRl((d) => {
      return {
        ...d,
        title: newTitle,
      };
    });
  }, []);

  const del = useCallback((idx: number) => {
    setRl((d) => {
      return {
        ...d,
        data: [...d.data.slice(0, idx), ...d.data.slice(idx + 1)],
      };
    });
  }, []);

  const edit = useCallback((updated: ResourceListItem, idx: number) => {
    setRl((d) => {
      return {
        ...d,
        data: [...d.data.slice(0, idx), updated, ...d.data.slice(idx + 1)],
      };
    });
  }, []);

  const changeShareSettings = useCallback((shareSettings: ShareSettings) => {
    setRl((d) => {
      return {
        ...d,
        shareSettings: shareSettings,
      };
    });
  }, []);

  const loadFromFile = useCallback(
    (items: ResourceListItem[], name: string) => {
      setRl((d) => {
        return {
          ...d,
          title: name,
          data: items,
        };
      });
    },
    []
  );

  const reorder = useCallback((startIndex: number, endIndex: number) => {
    setRl((d) => {
      const result = Array.from(d.data);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return {
        ...d,
        data: result,
      };
    });
  }, []);

  useEffect(() => {
    if (!id) {
      setRl({
        upvotes: [],
        title: "Untitled",
        data: [],
        creatorId: currentUserId,
        shareSettings: "HOMEPAGE",
        id: id,
      });
      setLoaded(true);
    } else {
      getResourceList(id)
        .then((s) => {
          setRl(s);
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
        (currentUserId === rl.creatorId ? (
          <EditableList
            rl={rl}
            loadFromFile={loadFromFile}
            changeShareSettings={changeShareSettings}
            rename={rename}
            add={add}
            edit={edit}
            del={del}
            reorder={reorder}
          />
        ) : (
          <StaticList resourceList={rl} />
        ))}
    </div>
  );
};

export default ListPage;
