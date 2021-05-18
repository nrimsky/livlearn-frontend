import React from "react";

export default function Button(props: {
  onClick: () => void;
  color: string;
  text: string;
}) {
  if (props.color === "yellow") {
    return (
      <button
        type="button"
        className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-yellow-900 bg-yellow-100 border border-transparent rounded-md hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
  } else if (props.color === "red") {
    return (
      <button
        type="button"
        className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
  } else {
    return (
      <button
        type="button"
        className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    );
  }
}
