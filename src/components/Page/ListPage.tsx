import { useHistory, useParams } from "react-router-dom";
import { getResourceList } from "../../firebase/FirestoreService";
import ListEditor from "../List/ListEditor";
import React, { useReducer, createContext, useEffect, useState } from "react";
import ItemData from "../../types/ItemData";
import ResourceList from "../../types/ResourceList";
import { getCurrentUserId } from "../../firebase/AuthService";
import List from "../List/List";

const defaultStart: ResourceList = {
  title: "",
  data: [],
  isPublic: false,
  creatorId: "",
};

type Action =
  | { type: "RENAME"; newTitle: string }
  | { type: "EDIT"; index: number; newData: ItemData }
  | { type: "DELETE"; index: number }
  | { type: "LOAD"; newState: ResourceList }
  | { type: "ADD"; newItem: ItemData };

function reducer(state: ResourceList, action: Action): ResourceList {
  switch (action.type) {
    case "EDIT":
      return {
        ...state,
        data: [
          ...state.data.slice(0, action.index),
          action.newData,
          ...state.data.slice(action.index + 1),
        ],
      };
    case "DELETE":
      return {
        ...state,
        data: [
          ...state.data.slice(0, action.index),
          ...state.data.slice(action.index + 1),
        ],
      };
    case "RENAME":
      return { ...state, title: action.newTitle };
    case "ADD":
      return { ...state, data: [...state.data, action.newItem] };
    case "LOAD":
      return { ...action.newState };
  }
}

export const ListContext = createContext<{
  state: ResourceList;
  dispatch: React.Dispatch<any>;
}>({
  state: defaultStart,
  dispatch: () => null,
});

type ParamTypes = {
  id: string | undefined;
};

export default function ListPage() {
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const [state, dispatch] = useReducer(reducer, defaultStart);
  const [loaded, setLoaded] = useState(false);
  const userId = getCurrentUserId();

  useEffect(() => {
    if (!id) {
      dispatch({ type: "LOAD", newState: defaultStart });
      setLoaded(true);
    } else {
      getResourceList(id)
        .then((s) => {
          dispatch({ type: "LOAD", newState: s });
          setLoaded(true);
        })
        .catch(() => {
          history.replace("/notfound");
        });
    }
  }, [history, id]);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      {loaded &&
        (!id || userId === state.creatorId ? (
          <ListEditor id={id ? id : null} />
        ) : (
          <List />
        ))}
    </ListContext.Provider>
  );
}
