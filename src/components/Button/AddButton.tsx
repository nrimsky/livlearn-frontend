import React from "react";
import { PlusIcon } from "@heroicons/react/outline";

export default function AddButton(props: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={
        `bg-gradient-to-b
        from-green-400 dark:from-green-500 
        to-green-500 dark:to-green-600
        focus:ring-green-200        
        justify-center 
        p-2 
        font-medium 
        border border-transparent 
        rounded-full
        focus:outline-none focus:ring-opacity-50 focus:ring 
        shadow-lg
        text-white` +
        props.className
      }
      onClick={props.onClick}
      aria-label="Add a new item"
    >
      <PlusIcon
        className="h-6 w-6 text-white"
        aria-hidden="true"
      />
    </button>
  );
}
