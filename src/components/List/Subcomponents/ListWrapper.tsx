import React from "react";

type Props = {
  children: React.ReactNode;
};

const ListWrapper = ({ children }: Props) => {
  return (
    <ul className="sm:rounded border border-gray-200 divide-y divide-gray-200">
      {children}
    </ul>
  );
};

export default ListWrapper;
