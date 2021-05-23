import React, { useEffect, useState, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getResourceList } from "../../firebase/FirestoreService";
import { getCurrentUserId } from "../../firebase/AuthService";
import EditableList from "../List/EditableList";
import StaticList from "../List/StaticList";
import ItemData from "../../types/ItemData";
import ListTitleInput from "../List/ListTitleInput";
import ListTitle from "../List/ListTitle";
import DropdownMenu from "../Dropdown/DropdownMenu";
import { DotsHorizontalIcon } from "@heroicons/react/outline";

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

  console.log("render list page");

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
          <div className="m-5">
            <div className="flex flex-row">
              <ListTitleInput value={title} onChange={rename} />
              <DropdownMenu
                icon={<DotsHorizontalIcon className="h-6 w-6 mt-2" />}
                aria-hidden="true"
                menuActions={[]}
                name={"Open user menu"}
              />
            </div>
            <EditableList
              id={id ? id : null}
              rl={{
                creatorId: creatorId,
                isPublic: isPublic,
                data: data,
                title: title,
              }}
              add={add}
              edit={edit}
              del={del}
            />
          </div>
        ) : (
          <div className="m-5">
            <ListTitle value={title} />
            <StaticList
              resourceList={{
                creatorId: creatorId,
                isPublic: isPublic,
                data: data,
                title: title,
              }}
            />
          </div>
        ))}
    </>
  );
};

export default ListPage;
