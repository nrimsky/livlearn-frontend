import React from "react";

export default function FilterButton(props: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  console.log("RENDER");
  return (
    <button
      type="button"
      aria-pressed={props.selected}
      onClick={props.onClick}
      className={props.className + " inline-flex mr-1 mb-1"}
    >
      {props.children}
    </button>
  );
}
