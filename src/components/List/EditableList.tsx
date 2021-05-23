import React, { useState } from "react";
import Item from "./Subcomponents/Item";
import ItemData from "../../types/ItemData";
import AddButton from "../Button/AddButton";
import BasePopup from "../Popup/BasePopup";
import AddForm from "../Form/AddForm";
import DeployForm from "../Form/DeployForm";
import EditForm from "../Form/EditForm";
import ResourceList from "../../types/ResourceList";
import ListWrapper from "./Subcomponents/ListWrapper";

type Props = {
  add: (item: ItemData) => void;
  del: (idx: number) => void;
  edit: (updated: ItemData, idx: number) => void;
  id: string | null;
  rl: ResourceList;
};

type IndexedItem = {
  item: ItemData;
  index: number;
};

const EditableList = ({ add, del, edit, id, rl }: Props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [itemEditing, setItemEditing] = useState<IndexedItem | null>(null);
  const { title, data } = rl;

  const closeAdd = () => {
    setAddOpen(false);
  };

  const openAdd = () => {
    setAddOpen(true);
  };

  const closeSave = () => {
    setSaveOpen(false);
  };

  const openSave = () => {
    setSaveOpen(true);
  };

  const openEdit = (item: ItemData, idx: number) => {
    setItemEditing({ item: item, index: idx });
  };

  const closeEdit = () => {
    setItemEditing(null);
  };

  return (
    <>
      <BasePopup isOpen={addOpen} onClickClose={closeAdd} title={"Add Item"}>
        <AddForm onClose={closeAdd} onAdd={add} />
      </BasePopup>
      <BasePopup
        isOpen={saveOpen}
        onClickClose={closeSave}
        title={id ? "Publish Changes" : "Publish New List"}
      >
        <DeployForm
          id={id}
          onClose={closeSave}
          state={{ ...rl, data: data, title: title }}
        />
      </BasePopup>
      {itemEditing && (
        <BasePopup
          isOpen={!!itemEditing}
          onClickClose={closeEdit}
          title={"Edit Item"}
        >
          <EditForm
            onClose={closeEdit}
            initial={itemEditing.item}
            onItemChange={(n: ItemData) => {
              return edit(n, itemEditing.index);
            }}
            onItemDelete={() => del(itemEditing.index)}
          />
        </BasePopup>
      )}
      <ListWrapper>
        {data.map((d, i) => {
          return <Item data={d} key={i} onClick={() => openEdit(d, i)} />;
        })}
      </ListWrapper>
      <AddButton className="fixed bottom-6 right-6" onClick={openAdd} />
      <button
        className="fixed bottom-6 left-6 bg-green-50 focus:outline-none rounded p-2 text-green-500 font-medium text-small border border-green-500"
        onClick={openSave}
      >
        🚀
        <span className="ml-2">
          {id ? "Publish Changes" : "Publish New List"}
        </span>
      </button>
    </>
  );
};

export default EditableList;
