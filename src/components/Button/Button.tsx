import React from "react";

export default function Button(props: { onClick: () => void; color: string; text: string }) {
  return (
    <button
      type="button"
      className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-${props.color}-900 bg-${props.color}-100 border border-transparent rounded-md hover:bg-${props.color}-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-${props.color}-500`}
      onClick={props.onClick}
    >
      { props.text }
    </button>
  );
}
