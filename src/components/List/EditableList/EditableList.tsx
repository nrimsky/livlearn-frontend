import { useCallback, useState } from "react";
import ResourceListItem from "../../../types/ResourceListItem";
import AddButton from "../../Button/AddButton";
import BasePopup from "../../Popup/BasePopup";
import AddForm from "../../Form/AddForm";
import DeployForm from "../../Form/DeployForm";
import EditForm from "../../Form/EditForm";
import ResourceList from "../../../types/ResourceList";
import { useHistory } from "react-router-dom";
import ListTitleInput from "./ListTitleInput";
import DropdownMenu from "../../Dropdown/DropdownMenu";
import {
  DotsHorizontalIcon,
  ShareIcon,
  TrashIcon,
  DownloadIcon,
  UploadIcon,
} from "@heroicons/react/solid";
import DropdownMenuItem from "../../Dropdown/DropdownMenuItem";
import { deleteList } from "../../../firebase/FirestoreService";
import ShareForm from "../../Form/ShareForm/ShareForm";
import { DropResult } from "react-beautiful-dnd";
import { saveAs } from "file-saver";
import toCsv from "../../../helpers/toCsv";
import FileUploadPage from "../../Form/FileUploadForm";
import DragDropList from "./DragDropList";
import ShareSettings from "../../../types/ShareSettings";
import Button from "../../Button/Button";
import classNames from "../../../helpers/classNames";

type Props = {
  add: (item: ResourceListItem) => void;
  del: (idx: number) => void;
  edit: (updated: ResourceListItem, idx: number) => void;
  rename: (newTitle: string) => void;
  reorder: (startIndex: number, endIndex: number) => void;
  changeShareSettings: (shareSettings: ShareSettings) => void;
  loadFromFile: (items: ResourceListItem[], name: string) => void;
  rl: ResourceList;
};

type IndexedItem = {
  item: ResourceListItem;
  index: number;
};

const EditableList = ({
  add,
  del,
  edit,
  rename,
  reorder,
  changeShareSettings,
  loadFromFile,
  rl,
}: Props) => {
  const [addOpen, setAddOpen] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [itemEditing, setItemEditing] = useState<IndexedItem | null>(null);
  const [changesMade, setChangesMade] = useState(false);
  const history = useHistory();

  const closeAdd = () => {
    setAddOpen(false);
    setChangesMade(true);
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
      setChangesMade(true);
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
        console.log("There is no collection to delete");
      }
    },
  };

  const downloadAction = {
    name: "Download as CSV",
    action: () => {
      const csv = toCsv(rl);
      const csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(csvData, `${rl.title}.csv`);
    },
  };

  const uploadAction = {
    name: "Upload CSV",
    action: () => {
      setUploadOpen(true);
    },
  };

  const shareAction = {
    name: "Share",
    action: () => setShareOpen(true),
  };

  const openEdit = useCallback((item: ResourceListItem, idx: number) => {
    setItemEditing({ item: item, index: idx });
  }, []);

  const onUpload = useCallback(
    (items: ResourceListItem[], name: string) => {
      loadFromFile(items, name);
      setUploadOpen(false);
      setChangesMade(true);
    },
    [loadFromFile]
  );

  const closeEdit = () => {
    setItemEditing(null);
    setChangesMade(true);
  };

  const renameList = (n: string) => {
    const sub = n.substring(0, 500);
    rename(sub);
    setChangesMade(true);
  };

  return (
    <div className="sm:mx-5 my-5 min-h-full relative">
      <div className="flex flex-row mx-3 sm:mx-0 w-100 relative min-h-full">
        <ListTitleInput value={rl.title} onChange={renameList} />
        <DropdownMenu
          icon={<DotsHorizontalIcon className="h-6 w-6 mt-1" />}
          aria-hidden="true"
          name={"Open user menu"}
        >
          {rl.id && (
            <DropdownMenuItem
              menuAction={shareAction}
              icon={<ShareIcon className="w-4 h-4 mr-2 inline" aria-hidden="true" />}
            />
          )}
          <DropdownMenuItem
            menuAction={uploadAction}
            icon={<UploadIcon className="w-4 h-4 mr-2 inline" aria-hidden="true" />}
          />
          <DropdownMenuItem
            menuAction={downloadAction}
            icon={<DownloadIcon className="w-4 h-4 mr-2 inline" aria-hidden="true" />}
          />
          {rl.id && (
            <DropdownMenuItem
              menuAction={delListAction}
              icon={<TrashIcon className="w-4 h-4 mr-2 inline" aria-hidden="true" />}
            />
          )}
        </DropdownMenu>
      </div>
      <BasePopup
        isOpen={uploadOpen}
        onClickClose={() => setUploadOpen(false)}
        title={"Upload CSV"}
      >
        <FileUploadPage onUpload={onUpload} />
      </BasePopup>
      <BasePopup
        isOpen={shareOpen}
        onClickClose={closeShare}
        title={"Share this collection"}
      >
        <ShareForm
          onClose={closeShare}
          state={rl}
          changeShareSettings={changeShareSettings}
        />
      </BasePopup>
      <BasePopup isOpen={addOpen} onClickClose={closeAdd} title={"Add Item"}>
        <AddForm onClose={closeAdd} onAdd={add} />
      </BasePopup>
      <BasePopup
        isOpen={saveOpen}
        onClickClose={closeSave}
        title={rl.id ? "🚀 Publish Changes" : "🚀 Publish New collection"}
      >
        <DeployForm onClose={closeSave} state={rl} setChangesSaved={() => {setChangesMade(false)}}/>
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
      ) : (
        <p className="text-gray-500 dark:text-gray-400 mx-3 sm:mx-0 min-h-full">
          Use the <span className="font-bold">+</span> button to add new items
        </p>
      )}
        <AddButton onClick={openAdd} className="flex fixed right-6 bottom-6" />
        <Button
          text={rl.id ? "Publish changes" : "Publish new collection"}
          onClick={openSave}
          className={classNames(`${changesMade ? "ring-4 dark:ring-opacity-75 ring-green-500 dark:ring-white" : ""}`, "fixed left-6 bottom-6")}
          color="green"
        />
        

    </div>
  );
};

export default EditableList;
