import React, { useRef } from "react";
import ResourceList from "../../types/ResourceList";
import { ClipboardCopyIcon } from "@heroicons/react/outline";

const ShareForm = (props: { state: ResourceList; onClose: () => void }) => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  function copyToClipboard(e: React.MouseEvent) {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand("copy");
    }
  }

  return (
    <div className="w-full">
      {props.state.isPublic ? (
        <p>Your list is currently readable to anyone with the link</p>
      ) : (
        <p>Your list is currently private</p>
      )}
      {props.state.isPublic && (
        <div className="inline-flex flex-row w-full mt-2 border rounded divide-x divide-gray-200 items-center">
          <textarea
            ref={textAreaRef}
            rows={1}
            readOnly={true}
            value={window.location.href}
            className="flex-1 appearance-none resize-none focus:outline-none block text-gray-500 text-sm align-middle py-1 px-2"
          />
          <button className="h-full inline-block hover:bg-green-100 focus:outline-none" onClick={copyToClipboard}>
            <span className="sr-only">Copy to clipboard</span>
            <ClipboardCopyIcon
              className="h-7 w-7 text-gray-600 p-1"
              aria-hidden={true}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareForm;
