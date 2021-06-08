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
    },
    [loadFromFile]
  );

  const closeEdit = () => {
    setItemEditing(null);
  };

  // TODO
  // Stream upvotes
  // Improve upvote process
  // Individual recommendations from editors
  // Search lists and search recommended resources
  // Comments
  // Tags
  // Add more emojis

  return (
    <div className="sm:mx-5 my-5">
      <div className="flex flex-row mx-3 sm:mx-0">
        <ListTitleInput value={rl.title} onChange={rename} />
        <DropdownMenu
          icon={<DotsHorizontalIcon className="h-6 w-6 mt-1" />}
          aria-hidden="true"
          name={"Open user menu"}
        >
          {rl.id && (
            <DropdownMenuItem
              menuAction={shareAction}
              icon={<ShareIcon className="w-4 h-4 mr-2" aria-hidden="true" />}
            />
          )}
          <DropdownMenuItem
            menuAction={uploadAction}
            icon={<UploadIcon className="w-4 h-4 mr-2" aria-hidden="true" />}
          />
          <DropdownMenuItem
            menuAction={downloadAction}
            icon={<DownloadIcon className="w-4 h-4 mr-2" aria-hidden="true" />}
          />
          {rl.id && (
            <DropdownMenuItem
              menuAction={delListAction}
              icon={<TrashIcon className="w-4 h-4 mr-2" aria-hidden="true" />}
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
        title={rl.id ? "Publish Changes" : "Publish New collection"}
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
      ) : (
        <p className="text-gray-500 mx-3 sm:mx-0">
          Use the <span className="font-bold">+</span> button to add new items
        </p>
      )}
      <AddButton
        className="fixed bottom-6 right-6 shadow-xl"
        onClick={openAdd}
      />
      <Button
        text={rl.id ? "Publish changes" : "Publish new collection"}
        onClick={openSave}
        className="fixed bottom-6 left-6 shadow text-sm bg-green-500 text-white"
        color=""
      />
    </div>
  );
};

export default EditableList;
