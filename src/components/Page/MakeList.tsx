import React, { useReducer, createContext, useState, useEffect } from "react";
import List from "../List/List";
import AddButton from "../Button/AddButton";
import ItemData from "../../types/ItemData";
import MediaType from "../../types/MediaType";
import BasePopup from "../Popup/BasePopup";
import AddForm from "../Form/AddForm";
import DeployForm from "../Form/DeployForm";
import { useLocation, useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";

const default1: ItemData = {
  title: "This is an example link",
  type: MediaType.Blog,
  detail: "Articles and news about Swift development",
  url: "https://www.swiftbysundell.com/",
};

const default2: ItemData = {
  title: "This is another example link",
  type: MediaType.OnlineCourse,
  detail: "Mobile development courses",
  url: "https://www.raywenderlich.com/",
};

export type State = {
  creatorId?: string;
  isPublic: boolean;
  title: string;
  data: ItemData[];
};

type Action =
  | { type: "RENAME"; newTitle: string }
  | { type: "EDIT"; index: number; newData: ItemData }
  | { type: "DELETE"; index: number }
  | { type: "LOAD"; newState: State }
  | { type: "ADD"; newItem: ItemData };

const initialState = { title: "", data: [default1, default2], isPublic: false };

async function getDataFromFirebase(id: string): Promise<State> {
  const docRef = firebase.firestore().collection("lists").doc(id);
  const docSnapShot = await docRef.get();
  if (docSnapShot.exists) {
    return docSnapShot.data() as State;
  } else {
    throw Error("No such document");
  }
}

function reducer(state: State, action: Action): State {
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
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default function MakeList() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    function reset() {
      dispatch({ type: "LOAD", newState: initialState });
    }
    async function getDataWithId(searchedId: string) {
      try {
        const newState = await getDataFromFirebase(searchedId);
        dispatch({ type: "LOAD", newState: newState });
        setId(searchedId);
      } catch (error) {
        console.error(error);
        history.replace({
          search: "",
        });
        reset();
      }
    }
    const searchedId = new URLSearchParams(location.search).get("id");
    if (searchedId) {
      getDataWithId(searchedId);
    } else {
      reset();
    }
  }, [location, history]);

  const [addOpen, setAddOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  function closeAddDialog() {
    setAddOpen(false);
  }

  function closeSaveDialog() {
    setSaveOpen(false);
  }

  return (
    <ListContext.Provider value={{ state, dispatch }}>
      <BasePopup
        isOpen={addOpen}
        onClickClose={closeAddDialog}
        title={"Add Item"}
      >
        <AddForm onClose={() => closeAddDialog()} />
      </BasePopup>
      <BasePopup
        isOpen={saveOpen}
        onClickClose={closeSaveDialog}
        title={id ? "Publish Changes" : "Publish New List"}
      >
        <DeployForm id={id} onClose={() => closeSaveDialog()} />
      </BasePopup>
      <List />
      <AddButton
        className="fixed bottom-6 right-6"
        onClick={() => {
          setAddOpen(!addOpen);
        }}
      />
      <button
        className="fixed bottom-6 left-6 bg-green-50 focus:outline-none rounded p-2 text-green-500 font-medium text-small border border-green-500"
        onClick={() => {
          setSaveOpen(!saveOpen);
        }}
      >
        🚀
        <span className="ml-2">
          {id ? "Publish Changes" : "Publish New List"}
        </span>
      </button>
    </ListContext.Provider>
  );
}
