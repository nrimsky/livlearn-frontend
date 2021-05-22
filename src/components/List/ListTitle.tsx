import React from "react";

type Props = {
  value: string;
};

const ListTitle = ({ value }: Props) => {
  return (
    <p className="mb-4 py-1 px-2 rounded outline-none border border-gray-200 text-sm">
      {value}
    </p>
  );
};

export default ListTitle;
