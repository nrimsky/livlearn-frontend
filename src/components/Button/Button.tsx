import React from "react";
import classNames from "../../helpers/classNames";

export default function Button(props: {
  onClick: () => void;
  color: string;
  text?: string;
  content?: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={classNames(
        props.color === "green"
          ? `text-green-900 
          bg-green-100 
          hover:bg-green-200 
          dark:from-green-500 
          dark:to-green-600
          focus:ring-green-200`
          : "",
        props.color === "yellow"
          ? `text-yellow-900 
        bg-yellow-100 
        hover:bg-yellow-200 
        dark:from-yellow-500 
        dark:to-yellow-600
        focus:ring-yellow-200`
          : "",
        props.color === "red"
          ? `text-red-900 
        bg-red-100 
        hover:bg-red-200 
        dark:from-red-500 
        dark:to-red-600
        focus:ring-red-200`
          : "",
        `flex 
        justify-center 
        px-4 py-2 
        font-medium 
        border border-transparent 
        rounded 
        focus:outline-none focus:ring-opacity-50 focus:ring dark:text-white 
        bg-gradient-to-b`,
        props.className ?? ""
      )}
      onClick={props.onClick}
    >
      {props.text ? props.text : props.content}
    </button>
  );
}
