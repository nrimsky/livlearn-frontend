import React from "react";

export default function LLInput(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) {
  return (
    <input
      {...{
        ...props,
        className: `
        appearance-none 
        border border-gray-300 dark:border-gray-500 
        rounded 
        w-full 
        py-2 px-3 
        placeholder-gray-400 placeholder-opacity-60
        text-gray-900 dark:text-white 
        leading-tight 
        focus:outline-none focus:ring focus:ring-green-200
        dark:bg-gray-800 ${props.className}`,
      }}
    />
  );
}
