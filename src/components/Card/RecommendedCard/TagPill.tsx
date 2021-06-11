import React from "react";

const TagPill = React.memo((props: { tag: string; key: string }) => {
  return (
    <div className="rounded-full px-2 text-xs bg-gray-100 text-green-900 inline-flex mr-1 mb-1 font-medium items-center">
      {props.tag}
    </div>
  );
});

export default TagPill;
