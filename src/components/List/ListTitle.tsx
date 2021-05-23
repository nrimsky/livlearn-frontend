import React from "react";

type Props = {
  value: string;
};

const ListTitle = ({ value }: Props) => {
  return (
    <p className="mb-4 py-2 px-3 rounded outline-none border border-gray-200">
      {value}
    </p>
  );
};

export default ListTitle;
