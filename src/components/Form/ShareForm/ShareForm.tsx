import React, { useRef } from "react";
import ResourceList from "../../../types/ResourceList";
import { ClipboardCopyIcon } from "@heroicons/react/outline";
import { editExitingList } from "../../../firebase/FirestoreService";
import ShareSettings from "../../../types/ShareSettings";
import ChangePermissionsWidget from "./ChangePermissionsWidget";

const ShareForm = (props: {
  state: ResourceList;
  onClose: () => void;
  changeShareSettings: (shareSettings: ShareSettings) => void;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function copyToClipboard(e: React.MouseEvent) {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
    }
  }

  const changePermissionsAndSave = async (newSettings: ShareSettings) => {
    if (!props.state.id) {
      return;
    }
    props.changeShareSettings(newSettings);
    try {
      await editExitingList({ ...props.state, shareSettings: newSettings });
    } catch (error) {
      console.error(error);
    }
  };

  const linkCopy = (
    <div className="inline-flex flex-row w-full mt-2 mb-3 border rounded divide-x divide-gray-200 items-center">
      <textarea
        ref={textAreaRef}
        rows={1}
        readOnly={true}
        value={window.location.href}
        className="flex-1 appearance-none resize-none focus:outline-none block text-gray-500  align-middle py-1 px-2"
      />
      <button
        className="h-full inline-block hover:bg-green-100 focus:outline-none"
        onClick={copyToClipboard}
      >
        <span className="sr-only">Copy to clipboard</span>
        <ClipboardCopyIcon
          className="h-7 w-7 text-gray-500 p-1"
          aria-hidden={true}
        />
      </button>
    </div>
  );

  return (
    <div>
      {props.state.shareSettings !== "PRIVATE" && linkCopy}
      <ChangePermissionsWidget
        shareSettings={props.state.shareSettings}
        onChange={changePermissionsAndSave}
      />
    </div>
  );
};

export default ShareForm;
