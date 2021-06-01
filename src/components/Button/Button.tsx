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
        "inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus-visible:ring-2",
        props.color === "green"
          ? " text-green-900 bg-green-100 hover:bg-green-200 border-transparent"
          : "",
        props.color === "yellow"
          ? " text-yellow-900 bg-yellow-100 hover:bg-yellow-200 border-transparent"
          : "",
        props.color === "red"
          ? " text-red-900 bg-red-100 hover:bg-red-200 border-transparent"
          : "",
        props.className ?? ""
      )}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}
