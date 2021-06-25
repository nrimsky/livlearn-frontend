import {
  PencilIcon,
  CheckIcon,
} from "@heroicons/react/outline";
import { useState } from "react";

// Error handling

// "https://source.unsplash.com/4csdTPXTM1A/1600x900"

function ChangeButton(props: { onClick: () => void; className?: string }) {
  return (
    <button
      className={`focus:outline-none focus:ring focus:ring-black dark:focus:ring-white focus:ring-opacity-10 dark:focus:ring-opacity-10 rounded-full h-4 w-4 ${
        props.className ?? ""
      }`}
      onClick={props.onClick}
    >
      <span className="sr-only">Edit section</span>
      <PencilIcon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
    </button>
  );
}

function DoneButton(props: { onClick: () => void; className?: string }) {
  return (
    <button
      className={`focus:outline-none focus:ring focus:ring-black dark:focus:ring-white focus:ring-opacity-10 dark:focus:ring-opacity-10 rounded-full h-5 w-5 mt-1 ${
        props.className ?? ""
      }`}
      onClick={props.onClick}
    >
      <span className="sr-only">Save changes</span>
      <CheckIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
    </button>
  );
}

export default function PInput(props: {
  initial: string;
  onSubmit: (text: string) => void;
  rows: number;
}) {
  const [value, setValue] = useState(props.initial);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="items-end flex flex-col w-full">
      {!isEditing ? (
        <p className="px-2 pb-1">{value}</p>
      ) : (
        <textarea
          className="w-full bg-transparent focus:outline-none focus:ring focus:ring-green-200 rounded focus:ring-opacity-50 p-2 bg-white dark:bg-gray-700 border dark:border-gray-400 border-gray-300"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          rows={props.rows}
        />
      )}
      {isEditing ? (
        <DoneButton
          onClick={() => {
            props.onSubmit(value);
            setIsEditing(false);
          }}
        />
      ) : (
        <ChangeButton onClick={() => setIsEditing(true)} />
      )}
    </div>
  );
}
