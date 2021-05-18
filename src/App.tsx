import React, { useReducer, createContext, useState } from "react";
import List from "./components/List/List";
import AddButton from "./components/Button/AddButton";
import ItemData from "./types/ItemData";
import MediaType from "./types/MediaType";
import BasePopup from "./components/Popup/BasePopup";
import AddForm from "./components/Form/AddForm";

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
  title: string;
  data: ItemData[];
};

type Action =
  | { type: "RENAME"; newTitle: string }
  | { type: "EDIT"; index: number; newData: ItemData }
  | { type: "DELETE"; index: number }
  | { type: "ADD"; newItem: ItemData };

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
  }
}

const initialState = { title: "", data: [default1, default2] };

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default function App() {
  const [addOpen, setAddOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  var db = firebase.firestore();

  function closeAddDialog() {
    setAddOpen(false);
  }

  function closeSaveDialog() {
    setSaveOpen(false);
  }

  function saveList() {
    db.collection("lists")
      .add({
        ...state
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
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
        title={"Save this list"}
      >
        <div>
          <p>
            Now it's time to deploy your list! Get a unique link to access and
            share your list of learning resources.
          </p>
          <button onClick={saveList}>Go</button>
        </div>
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
        🚀<span className="ml-2">I'm done!</span>
      </button>
    </AppContext.Provider>
  );
}
