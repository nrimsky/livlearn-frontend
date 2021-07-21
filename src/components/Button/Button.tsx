import React from "react";
import classNames from "../../helpers/classNames";

export default function Button(props: {
  onClick: () => void;
  color: string;
  text: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex justify-center px-4 py-2  font-medium border border-transparent rounded focus:outline-none",
        props.color === "green"
          ? " text-green-900 bg-green-100 hover:bg-green-200 border-transparent dark:bg-green-600 dark:text-white focus:ring focus:ring-green-200 focus:ring-opacity-50"
          : "",
        props.color === "yellow"
          ? " text-yellow-900 bg-yellow-100 hover:bg-yellow-200 border-transparent dark:bg-yellow-600 dark:text-white focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
          : "",
        props.color === "red"
          ? " text-red-900 bg-red-100 hover:bg-red-200 border-transparent dark:bg-red-600 dark:text-white focus:ring focus:ring-red-200 focus:ring-opacity-50"
          : "",
        props.className ?? ""
      )}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
