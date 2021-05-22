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
import { useHistory } from "react-router-dom";
import ListTitleInput from "./ListTitleInput";
import DropdownMenu from "../Dropdown/DropdownMenu";
import {
  DotsHorizontalIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import { deleteList } from "../../firebase/FirestoreService";
import ShareForm from "../Form/ShareForm";

type Props = {
  add: (item: ItemData) => void;
  del: (idx: number) => void;
  edit: (updated: ItemData, idx: number) => void;
  rename: (newTitle: string) => void;
  id: string | null;
  rl: ResourceList;
};

type IndexedItem = {
  item: ItemData;
  index: number;
};

const EditableList = ({ add, del, edit, rename, id, rl }: Props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [itemEditing, setItemEditing] = useState<IndexedItem | null>(null);
  const { title, data } = rl;
  const history = useHistory();

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

  const closeShare = () => {
    setShareOpen(false);
  }

  const delListAction = {
    name: "Delete",
    action: () => {
      if (id) {
        try {
          deleteList(id);
          history.push("/u");
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("There is no list to delete");
      }
    },
  };

  const shareAction = {
    name: "Share",
    action: () => setShareOpen(true),
  };

  const openEdit = (item: ItemData, idx: number) => {
    setItemEditing({ item: item, index: idx });
  };

  const closeEdit = () => {
    setItemEditing(null);
  };

  return (
    <div className="sm:mx-5 my-5">
      <div className="flex flex-row mx-5 sm:mx-0">
        <ListTitleInput value={title} onChange={rename} />
        {id && (
          <DropdownMenu
            icon={<DotsHorizontalIcon className="h-6 w-6 mt-1" />}
            aria-hidden="true"
            name={"Open user menu"}
          >
            <DropdownMenuItem
              menuAction={shareAction}
              icon={<ShareIcon className="w-4 h-4 mr-2" aria-hidden="true" />}
            />
            <DropdownMenuItem
              menuAction={delListAction}
              icon={<TrashIcon className="w-4 h-4 mr-2" aria-hidden="true" />}
            />
          </DropdownMenu>
        )}
      </div>
      <BasePopup isOpen={shareOpen} onClickClose={closeShare} title={"Share this list"}>
        <ShareForm />
      </BasePopup>
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
        className="fixed bottom-6 left-6 bg-green-50 focus:outline-none rounded py-1 px-2 text-green-500 font-medium text-small border border-green-500"
        onClick={openSave}
      >
        🚀
        <span className="ml-2">
          {id ? "Publish Changes" : "Publish New List"}
        </span>
      </button>
    </div>
  );
};

export default EditableList;
