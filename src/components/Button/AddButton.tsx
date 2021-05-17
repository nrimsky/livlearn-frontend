import React from "react";
import { PlusIcon } from "@heroicons/react/outline";


export default function AddButton(props: {className?: string, onClick?: () => void}) {
  return (
    <button className={"bg-green-500 hover:bg-green-600 focus:outline-none rounded-full p-2 "+props.className} onClick={props.onClick}>
      <PlusIcon
        className="flex-shrink-0 h-6 w-6 text-white"
        aria-hidden="true"
      />
    </button>
  );
}
