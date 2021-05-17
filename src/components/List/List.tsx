import React from "react";

type Props = {
  title: string;
};

const List: React.FC<Props> = ({ title, children }) => (
  <div className="m-5">
    <p className="text-3xl mb-4">{ title }</p>
    <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
      {children}
    </ul>
  </div>
);

export default List;