import React, { useState } from "react";
import List from "./List";
import AddButton from "../Button/AddButton";
import BasePopup from "../Popup/BasePopup";
import AddForm from "../Form/AddForm";
import DeployForm from "../Form/DeployForm";

function ListEditor(props: { id: string | null }) {

  const [addOpen, setAddOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);

  function closeAddDialog() {
    setAddOpen(false);
  }

  function closeSaveDialog() {
    setSaveOpen(false);
  }

  return (
    <>
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
        title={props.id ? "Publish Changes" : "Publish New List"}
      >
        <DeployForm id={props.id} onClose={() => closeSaveDialog()} />
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
          {props.id ? "Publish Changes" : "Publish New List"}
        </span>
      </button>
    </>
  );
}

export default ListEditor;
