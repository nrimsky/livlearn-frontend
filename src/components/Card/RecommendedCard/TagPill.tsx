import React from "react";

const TagPill = React.memo((props: { tag: string; key: string }) => {
  return (
    <div className="rounded-full px-2 text-xs inline-flex mr-1 mb-1 font-medium items-center tracking-tight border border-transparent bg-gray-100 text-gray-800 dark:bg-transparent dark:text-green-500 border dark:border-green-500">
      {props.tag}
    </div>
  );
});

export default TagPill;
