import React from "react";

export default function LLTextArea(
  props: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >
) {
  return (
    <textarea
      {...{
        ...props,
        className: `
        resize-y overflow-hidden 
        appearance-none 
        border border-gray-300 dark:border-gray-500 
        placeholder-gray-400 placeholder-opacity-60
        rounded 
        w-full 
        py-2 px-3 
        text-gray-900 dark:text-white 
        leading-tight 
        focus:outline-none focus:ring focus:ring-green-200
        bg-white dark:bg-gray-800`,
      }}
    />
  );
}
