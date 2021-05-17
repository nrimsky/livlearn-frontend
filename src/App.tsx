import React, { useReducer, createContext, useState } from "react";
import List from "./components/List/List";
import AddButton from "./components/Button/AddButton";
import ItemData from "./types/ItemData";
import MediaType from "./types/MediaType";
import BasePopup from "./components/Popup/BasePopup";
import AddForm from "./components/Form/AddForm";

const lipsum =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

const defaultData: ItemData = {
  title: "This is a test title hi lemming",
  type: MediaType.OnlineCourse,
  detail: lipsum,
  url: "www.google.com",
};

export type State = {
  title: string;
  data: ItemData[];
};

type Action =
  | { type: "RENAME"; newTitle: string }
  | { type: "EDIT"; index: number; newData: ItemData }
  | { type: "ADD"; newItem: ItemData };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "EDIT":
      return { ...state, data: [...state.data.slice(0, action.index), action.newData, ...state.data.slice(action.index + 1)]};
    case "RENAME":
      return { ...state, title: action.newTitle };
    case "ADD":
      return { ...state, data: [...state.data, action.newItem] };
  }
}

const initialState = { title: "Untitled", data: [defaultData] };

export const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export default function App() {
  const [addOpen, setAddOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  function closeAddDialog() {
    setAddOpen(false);
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <BasePopup 
        isOpen={addOpen}
        onClickClose={closeAddDialog}
        title={"Add"}>
        <AddForm onClose={() => closeAddDialog()}/>
      </BasePopup>
      <List />
      <AddButton
        className="fixed bottom-6 right-6"
        onClick={() => {
          setAddOpen(!addOpen);
        }}
      />
    </AppContext.Provider>
  );
}
