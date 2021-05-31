import React, { useCallback, useState } from "react";
import ResourceListItem from "../../types/ResourceListItem";
import AddButton from "../Button/AddButton";
import BasePopup from "../Popup/BasePopup";
import AddForm from "../Form/AddForm";
import DeployForm from "../Form/DeployForm";
import EditForm from "../Form/EditForm";
import ResourceList from "../../types/ResourceList";
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
import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "react-beautiful-dnd";
import { LinkIcon, MenuIcon } from "@heroicons/react/outline";
import Icon from "../Icon/Icon";

type Props = {
  add: (item: ResourceListItem) => void;
  del: (idx: number) => void;
  edit: (updated: ResourceListItem, idx: number) => void;
  rename: (newTitle: string) => void;
  reorder: (startIndex: number, endIndex: number) => void;
  changePermissions: (isPublic: boolean) => void;
  rl: ResourceList;
};

type IndexedItem = {
  item: ResourceListItem;
  index: number;
};

const DraggableListItem = React.memo(
  (props: {
    item: ResourceListItem;
    idx: number;
    openEdit: (item: ResourceListItem, idx: number) => void;
    key: string;
  }) => {
    return (
      <Draggable
        draggableId={"draggable=" + props.item.url + props.item.title}
        index={props.idx}
      >
        {(provided) => (
          <li
            className="pl-3 pr-4 py-3 cursor-pointer bg-white hover:bg-green-50 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3 text-sm relative"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              {...provided.dragHandleProps}
              className="absolute right-0 top-0 p-3"
            >
              <MenuIcon className="flex-shrink-0 h-4 w-4 text-gray-400" />
            </div>

            <div
              className="inline-flex"
              onClick={() => props.openEdit(props.item, props.idx)}
            >
              <Icon mediaType={props.item.type} />
              <p className="font-semibold ml-2">{props.item.title}</p>
            </div>
            <p
              className=""
              onClick={() => props.openEdit(props.item, props.idx)}
            >
              {props.item.detail}
            </p>
            <div className="underline text-green-500 hover:text-green-600 truncate mr-10">
              <span>
                <LinkIcon className="h-5 w-4 inline" />
                <a href={props.item.url} className="ml-2 truncate">
                  {props.item.url}
                </a>
              </span>
            </div>
          </li>
        )}
      </Draggable>
    );
  }
);

const DragDropList = (props: {
  onDragEnd: (result: DropResult) => void;
  data: ResourceListItem[];
  openEdit: (item: ResourceListItem, idx: number) => void;
}) => {
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Droppable droppableId={"list"}>
        {(provided) => (
          <ul
            className="sm:rounded border border-gray-200 divide-y divide-gray-200"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.data.map((d, idx) => (
              <DraggableListItem
                item={d}
                idx={idx}
                openEdit={props.openEdit}
                key={"draggable=" + d.url + d.title}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const EditableList = ({
  add,
  del,
  edit,
  rename,
  reorder,
  changePermissions,
  rl,
}: Props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [itemEditing, setItemEditing] = useState<IndexedItem | null>(null);
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
  };

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      if (result.destination.index === result.source.index) {
        return;
      }
      reorder(result.source.index, result.destination.index);
    },
    [reorder]
  );

  const delListAction = {
    name: "Delete",
    action: () => {
      if (rl.id) {
        try {
          deleteList(rl.id);
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

  const openEdit = useCallback((item: ResourceListItem, idx: number) => {
    setItemEditing({ item: item, index: idx });
  }, []);

  const closeEdit = () => {
    setItemEditing(null);
  };

  return (
    <div className="sm:mx-5 my-5">
      <div className="flex flex-row mx-5 sm:mx-0">
        <ListTitleInput value={rl.title} onChange={rename} />
        {rl.id && (
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
      <BasePopup
        isOpen={shareOpen}
        onClickClose={closeShare}
        title={"Share this list"}
      >
        <ShareForm
          onClose={closeShare}
          state={rl}
          changePermissions={changePermissions}
        />
      </BasePopup>
      <BasePopup isOpen={addOpen} onClickClose={closeAdd} title={"Add Item"}>
        <AddForm onClose={closeAdd} onAdd={add} />
      </BasePopup>
      <BasePopup
        isOpen={saveOpen}
        onClickClose={closeSave}
        title={rl.id ? "Publish Changes" : "Publish New List"}
      >
        <DeployForm onClose={closeSave} state={rl} />
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
            onItemChange={(n: ResourceListItem) => {
              return edit(n, itemEditing.index);
            }}
            onItemDelete={() => del(itemEditing.index)}
          />
        </BasePopup>
      )}
      {rl.data.length > 0 ? (
        <DragDropList
          onDragEnd={onDragEnd}
          openEdit={openEdit}
          data={rl.data}
        />
      ) : <p className="text-gray-400">Use the <span className="font-bold">+</span> button to add new items</p>}
      <AddButton className="fixed bottom-6 right-6" onClick={openAdd} />
      <button
        className="fixed bottom-6 left-6 bg-green-50 focus:outline-none rounded py-1 px-2 text-green-500 font-medium text-small border border-green-500"
        onClick={openSave}
      >
        🚀
        <span className="ml-2">
          {rl.id ? "Publish Changes" : "Publish New List"}
        </span>
      </button>
    </div>
  );
};

export default EditableList;
